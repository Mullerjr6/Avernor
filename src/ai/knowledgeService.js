import { artifacts, characters, cities, kingdoms, locations, portals, relics } from '../content/index.js'
import { getCharacterProfile, KNOWLEDGE_STATUSES } from './characters/characterProfiles.js'

const publicRecords = [...characters, ...artifacts, ...cities, ...kingdoms, ...locations, ...portals, ...relics]
const publicRecordIndex = new Map(publicRecords.map((record) => [record.id, record]))
const publicFields = [
  'id', 'slug', 'name', 'subtitle', 'summary', 'description', 'category', 'status', 'origin', 'location',
  'period', 'kingdom', 'race', 'lineage', 'personality', 'speech', 'objectives', 'desires', 'fears', 'flaws',
  'qualities', 'values', 'moralLimits', 'beliefs', 'habits', 'weaknesses', 'powers', 'abilities', 'limitations',
  'knowledge', 'publicSecrets', 'relations', 'family', 'politicalPosition', 'publicReputation', 'culturalViews',
  'emotionalCondition', 'knownDestiny', 'truthStatus', 'canonStatus', 'spoilerLevel', 'image', 'thumbnail', 'accent',
]

const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-BR')

function compactPublicRecord(record) {
  if (!record) return null
  return Object.fromEntries(publicFields.flatMap((field) => {
    const value = record[field]
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return []
    return [[field, value]]
  }))
}

export function getCanonicalCharacter(characterId) {
  const record = publicRecordIndex.get(characterId)
  return record && characters.some(({ id }) => id === characterId) ? record : null
}

export function buildCharacterKnowledge(characterId, recordIndex = publicRecordIndex) {
  const profile = getCharacterProfile(characterId)
  const character = recordIndex.get(characterId)
  if (!profile || !character) return null

  const records = profile.knowledgePolicy.flatMap(({ status, ids, note }) => {
    if (!KNOWLEDGE_STATUSES.has(status)) throw new Error(`Estado de conhecimento inválido: ${status}`)
    return ids.map((id) => ({ status, note, record: compactPublicRecord(recordIndex.get(id)) })).filter(({ record }) => record)
  })

  return {
    character: compactPublicRecord(character),
    profile,
    records,
    protectedKnowledge: [...profile.protectedKnowledge],
  }
}

export function relevantKnowledge(knowledgeContext, message, limit = 6) {
  if (!knowledgeContext) return []
  const terms = new Set(normalize(message).split(/\s+/).filter((term) => term.length > 3))
  return knowledgeContext.records
    .map((entry, index) => {
      const haystack = normalize(JSON.stringify(entry.record))
      const relevance = [...terms].reduce((score, term) => score + (haystack.includes(term) ? 2 : 0), 0)
      const identityBoost = entry.record.id === knowledgeContext.character.id ? 4 : 0
      return { ...entry, score: relevance + identityBoost - index / 100 }
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ score: _score, ...entry }) => entry)
}

export function createRecordIndex(records) {
  return new Map(records.map((record) => [record.id, record]))
}
