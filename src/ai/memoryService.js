const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-BR')

function memoryId(characterId, type, summary, now) {
  const seed = `${characterId}:${type}:${summary}:${now}`
  const hash = [...seed].reduce((value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0, 2166136261)
  return `mem-${hash.toString(36)}`
}

function candidate(type, summary, topics, importance, sourceText) {
  return { type, summary, topics, importance, sourceText }
}

export function extractUserMemoryCandidates(message) {
  const text = String(message).trim()
  const candidates = []
  const namedThing = text.match(/\b(meu|minha)\s+(cachorro|cão|cao|gata|gato|irmã|irma|irmão|irmao|filha|filho|amiga|amigo)\s+se\s+chama\s+([\p{L}][\p{L}'-]{1,40})/iu)
  if (namedThing) {
    const [, , relation, name] = namedThing
    candidates.push(candidate('user_fact', `O ${relation.toLocaleLowerCase('pt-BR')} do usuário se chama ${name}.`, [relation, name], 5, text))
  }

  const preference = text.match(/\beu\s+(?:gosto|adoro)\s+d[ea]\s+([^.!?]{2,80})/iu)
  if (preference) candidates.push(candidate('preference', `O usuário gosta de ${preference[1].trim()}.`, ['preferência', ...preference[1].split(/\s+/).slice(0, 4)], 3, text))

  const fear = text.match(/\b(?:tenho medo de|eu temo)\s+([^.!?]{2,100})/iu)
  if (fear) candidates.push(candidate('vulnerability', `O usuário teme ${fear[1].trim()}.`, ['medo', ...fear[1].split(/\s+/).slice(0, 4)], 4, text))
  return candidates
}

function uniqueMemories(memories, maximum) {
  const seen = new Set()
  return memories.filter(({ type, summary, sourceCharacterId }) => {
    const key = `${sourceCharacterId}:${type}:${normalize(summary)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(-maximum)
}

export function updateConversationMemories(memoryState, message, characterId, now = new Date().toISOString()) {
  const userCandidates = extractUserMemoryCandidates(message)
  const created = userCandidates.map((entry) => ({
    ...entry,
    id: memoryId(characterId, entry.type, entry.summary, now),
    sourceCharacterId: characterId,
    createdAt: now,
    lastRecalledAt: null,
  }))
  const characterCreated = created.map((entry) => ({
    ...entry,
    id: `${entry.id}-character`,
    type: 'character_memory',
    summary: `O personagem ouviu do usuário: ${entry.summary}`,
  }))

  const relationshipEvents = []
  const normalized = normalize(message)
  if (/desculp|perdao|sinto muito/.test(normalized)) relationshipEvents.push(candidate('repair', 'O usuário ofereceu um pedido de desculpas.', ['desculpa', 'confiança'], 4, message))
  if (/vou matar|cale a boca|odeio|mentiros/.test(normalized)) relationshipEvents.push(candidate('conflict', 'A conversa registrou hostilidade direta do usuário.', ['hostilidade', 'tensão'], 5, message))
  const relationshipCreated = relationshipEvents.map((entry) => ({
    ...entry,
    id: memoryId(characterId, entry.type, entry.summary, now),
    sourceCharacterId: characterId,
    createdAt: now,
    lastRecalledAt: null,
  }))

  return {
    userMemory: uniqueMemories([...(memoryState.userMemory ?? []), ...created], 80),
    characterMemory: uniqueMemories([...(memoryState.characterMemory ?? []), ...characterCreated], 80),
    relationshipMemory: uniqueMemories([...(memoryState.relationshipMemory ?? []), ...relationshipCreated], 60),
  }
}

export function selectRelevantMemories(memoryState, message, characterId, limit = 8) {
  const terms = new Set(normalize(message).split(/\s+/).filter((term) => term.length > 2))
  const memories = [
    ...(memoryState.userMemory ?? []),
    ...(memoryState.characterMemory ?? []),
    ...(memoryState.relationshipMemory ?? []),
  ].filter(({ sourceCharacterId }) => sourceCharacterId === characterId)

  return memories
    .map((memory, index) => {
      const haystack = normalize(`${memory.summary} ${(memory.topics ?? []).join(' ')}`)
      const overlap = [...terms].reduce((score, term) => score + (haystack.includes(term) ? 2 : 0), 0)
      return { ...memory, relevance: overlap + (memory.importance ?? 1) + index / 1000 }
    })
    .sort((left, right) => right.relevance - left.relevance)
    .slice(0, limit)
    .map(({ relevance: _relevance, sourceText: _sourceText, ...memory }) => memory)
}

export function summarizeConversation(messages, existingSummary = '') {
  if (messages.length <= 30) return existingSummary
  const older = messages.slice(0, -24).slice(-12)
  const fragments = older.map(({ role, text }) => `${role === 'user' ? 'Usuário' : 'Personagem'}: ${String(text).slice(0, 180)}`)
  return [existingSummary, ...fragments].filter(Boolean).join(' | ').slice(-2400)
}
