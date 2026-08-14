import { updateConversationMemories } from '../../../src/ai/memoryService.js'
import { getCharacterProfile } from '../../../src/ai/characters/characterProfiles.js'
import { applyRelationshipSuggestion, createRelationship, sanitizeRelationship } from '../../../src/ai/relationshipService.js'
import { FIRST_SCENE_ID, STORY_VERSION, story } from './chapterZero.js'
import { declaresCombatAction, parsePlayerInput } from './playerInput.js'

export const SAVE_KEY = 'avernor-cronicas-vivas-save-v4'
export const ALLOWED_INVENTORY = new Set(['Carta cifrada de Normus', 'Medalhão da Folha Partida', 'Fulgarion'])
const MAX_HISTORY = 180
const MAX_RECENT_HISTORY = 32
const MAX_STORY_MEMORIES = 40
const MAX_PLAYER_ACTIONS = 60

const unique = (items) => [...new Set(items)]
const now = () => new Date().toISOString()
const safeText = (value, maximum = 1800) => String(value ?? '').trim().slice(0, maximum)

function relationshipMap(value = {}) {
  return {
    elara: sanitizeRelationship(value.elara ?? createRelationship()),
    'rainha-aelwen': sanitizeRelationship(value['rainha-aelwen'] ?? createRelationship()),
    'mercenario-orc': sanitizeRelationship(value['mercenario-orc'] ?? createRelationship()),
  }
}

function openingEntries(scene) {
  return [{
    id: `${scene.id}-divider`,
    type: 'scene-divider',
    speaker: scene.chapterNumber,
    text: scene.title,
    sceneId: scene.id,
    chapterId: scene.chapterId,
  }, ...scene.opening.map((entry, index) => ({
    ...entry,
    id: `${scene.id}-opening-${index}`,
    sceneId: scene.id,
    chapterId: scene.chapterId,
  }))]
}

function codexProgress(discovered, visitedScenes, flags) {
  return {
    records: discovered.length,
    scenes: visitedScenes.length,
    facts: Object.values(flags).filter(Boolean).length,
  }
}

export function createInitialState() {
  const firstScene = story.scenes[FIRST_SCENE_ID]
  const discovered = unique(['sirius-kayler', 'floresta-antiga', ...firstScene.discoverOnEnter])
  const flags = { clearingFound: true, rescueComplete: false, mastermindUnknown: true }
  return {
    version: STORY_VERSION,
    chapterId: firstScene.chapterId,
    sceneId: firstScene.id,
    beat: 0,
    completedBeats: [],
    sceneTurns: 0,
    totalTurns: 0,
    flags,
    inventory: ['Carta cifrada de Normus', 'Medalhão da Folha Partida', 'Fulgarion'],
    relationships: relationshipMap(),
    memoryState: { playerMemory: [], characterMemory: [], relationshipMemory: [] },
    playerActions: [],
    storyMemories: [{
      id: 'memory-clearing-arrival', type: 'witnessed', sourceCharacterId: 'mercenario-orc', importance: 4,
      summary: 'Sirius chegou em forma de corvo à clareira onde três mercenários orcs mantinham uma elfa prisioneira; a forma da intervenção ainda não havia sido escolhida.',
    }],
    discovered,
    presentNpcIds: [...firstScene.participants],
    visitedScenes: [firstScene.id],
    completedScenes: [],
    storyHistory: openingEntries(firstScene),
    recentHistory: [],
    summary: 'Sirius seguia para Sylvaris quando ouviu um grito, assumiu a forma de corvo e encontrou uma elfa presa por três mercenários orcs. Ele pousou diante dos captores. A forma da intervenção pertence ao jogador; o mandante permanece desconhecido.',
    recentEffects: [],
    codexProgress: codexProgress(discovered, [firstScene.id], flags),
    startedAt: now(),
    updatedAt: now(),
  }
}

function sanitizeDialogue(reply, scene) {
  const allowed = new Set(scene.participants)
  return (Array.isArray(reply.dialogue) ? reply.dialogue : [])
    .filter(({ speakerId, text }) => allowed.has(speakerId) && safeText(text))
    .slice(0, scene.multiNpc ? 4 : 2)
    .map(({ speakerId, speaker, text, action, emotion }) => {
      const displayName = speakerId === 'rainha-aelwen' ? 'AELWEN' : speakerId === 'mercenario-orc' ? 'MERCENÁRIO' : 'ELARA'
      const candidateAction = safeText(action, 320)
      const meaningfulAction = candidateAction.length >= 18 && candidateAction.toLocaleLowerCase('pt-BR') !== displayName.toLocaleLowerCase('pt-BR') ? candidateAction : ''
      return {
        speakerId,
        speaker: safeText(speaker, 60) || displayName,
        text: safeText(text),
        action: meaningfulAction,
        emotion: safeText(emotion, 32),
      }
    })
}

function sanitizeSignals(reply, scene) {
  const allowed = new Set(scene.allowedSignals)
  return unique((Array.isArray(reply.storySignals) ? reply.storySignals : []).filter((signal) => allowed.has(signal))).slice(0, 3)
}

function fallbackSignal(state, scene, signals, source) {
  if (signals.length) return signals
  if (source !== 'local-canon') return []
  const pending = scene.beats.filter(({ signal }) => !state.completedBeats.includes(`${scene.id}:${signal}`))
  return pending[0] ? [pending[0].signal] : []
}

function applyRelationships(current, suggestions, scene) {
  const next = relationshipMap(current)
  for (const item of Array.isArray(suggestions) ? suggestions : []) {
    if (!scene.participants.includes(item.characterId)) continue
    const profile = getCharacterProfile(item.characterId)
    if (!profile) continue
    next[item.characterId] = applyRelationshipSuggestion(next[item.characterId], item.delta, profile.relationshipPolicy)
  }
  return next
}

function applyMemories(state, reply, playerText, scene) {
  let memoryState = state.memoryState
  for (const characterId of scene.participants) memoryState = updateConversationMemories(memoryState, playerText, characterId)

  const present = new Set(scene.participants)
  const accepted = (Array.isArray(reply.memorySuggestions) ? reply.memorySuggestions : [])
    .filter(({ characterId, summary }) => present.has(characterId) && safeText(summary))
    .slice(0, 4)
    .map(({ characterId, type, summary, importance }, index) => ({
      id: `story-memory-${state.totalTurns + 1}-${index}-${characterId}`,
      type: safeText(type, 40) || 'conversation',
      sourceCharacterId: characterId,
      summary: safeText(summary, 320),
      importance: Math.min(5, Math.max(1, Number(importance) || 2)),
    }))
  const keys = new Set()
  const storyMemories = [...state.storyMemories, ...accepted].filter((memory) => {
    const key = `${memory.sourceCharacterId}:${memory.type}:${memory.summary.toLocaleLowerCase('pt-BR')}`
    if (keys.has(key)) return false
    keys.add(key)
    return true
  }).slice(-MAX_STORY_MEMORIES)
  return { memoryState, storyMemories }
}

function historyFromTurn(state, reply, playerText, scene, dialogue) {
  const turnId = `turn-${state.totalTurns + 1}`
  const playerInput = parsePlayerInput(playerText)
  const playerEntries = [
    ...(playerInput.speech ? [{ id: `${turnId}-sirius`, type: 'player', speaker: 'SIRIUS', text: playerInput.speech, sceneId: scene.id, chapterId: scene.chapterId }] : []),
    ...playerInput.actions.map((action, index) => ({
      id: `${turnId}-sirius-action-${index}`,
      type: 'player-action',
      speaker: 'SIRIUS',
      text: action,
      sceneId: scene.id,
      chapterId: scene.chapterId,
    })),
  ]
  const entries = [
    ...playerEntries,
    { id: `${turnId}-narration`, type: 'narration', speaker: 'NARRADOR', text: safeText(reply.narration), sceneId: scene.id, chapterId: scene.chapterId },
    ...dialogue.flatMap((item, index) => [
      ...(item.action ? [{ id: `${turnId}-action-${index}`, type: 'narration', speaker: 'NARRADOR', text: item.action, sceneId: scene.id, chapterId: scene.chapterId }] : []),
      { id: `${turnId}-dialogue-${index}`, type: 'dialogue', ...item, sceneId: scene.id, chapterId: scene.chapterId },
    ]),
    ...(safeText(reply.afterNarration) ? [{ id: `${turnId}-after`, type: 'narration', speaker: 'NARRADOR', text: safeText(reply.afterNarration), sceneId: scene.id, chapterId: scene.chapterId }] : []),
  ].filter(({ text }) => text)

  const recent = entries.map(({ type, speaker, speakerId, text, sceneId }) => ({ type, speaker, speakerId, text, sceneId }))
  return {
    storyHistory: [...state.storyHistory, ...entries].slice(-MAX_HISTORY),
    recentHistory: [...state.recentHistory, ...recent].slice(-MAX_RECENT_HISTORY),
  }
}

function applySignalEffects(state, scene, signals) {
  let flags = { ...state.flags }
  let discovered = [...state.discovered]
  for (const signal of signals) {
    flags = { ...flags, ...(scene.flagsBySignal[signal] ?? {}) }
    discovered = unique([...discovered, ...(scene.discoverBySignal[signal] ?? [])])
  }
  discovered = unique([...discovered, ...scene.discoverOnEnter])
  return { flags, discovered }
}

function resolvedTransition(scene, sceneTurns, signals) {
  if (!scene.transition) return null
  const branch = scene.transition.branches?.find(({ signal }) => signals.includes(signal))
  if (branch?.target && branch.target !== scene.id && sceneTurns >= (branch.minTurns ?? scene.minTurns)) return branch
  if (sceneTurns < scene.minTurns) return null
  if (scene.transition.target && scene.transition.target !== scene.id && signals.includes(scene.transition.signal)) return scene.transition
  return null
}

function transitionToNext(state, scene, route) {
  const nextScene = story.scenes[route.target]
  if (!nextScene) return state
  const transitionEntry = {
    id: `transition-${scene.id}-${state.totalTurns}`,
    type: 'transition', speaker: 'NARRADOR', text: route.narration,
    sceneId: scene.id, chapterId: scene.chapterId,
  }
  const storyHistory = [...state.storyHistory, transitionEntry, ...openingEntries(nextScene)].slice(-MAX_HISTORY)
  const visitedScenes = unique([...state.visitedScenes, nextScene.id])
  const completedScenes = unique([...state.completedScenes, scene.id])
  const discovered = unique([...state.discovered, ...nextScene.discoverOnEnter])
  const summary = `${state.summary} ${scene.title}: ${scene.objective}`.slice(-3200)
  return {
    ...state,
    chapterId: nextScene.chapterId,
    sceneId: nextScene.id,
    beat: 0,
    sceneTurns: 0,
    presentNpcIds: [...nextScene.participants],
    visitedScenes,
    completedScenes,
    discovered,
    storyHistory,
    recentHistory: [],
    summary,
    codexProgress: codexProgress(discovered, visitedScenes, state.flags),
  }
}

export function applyNarrativeTurn(state, reply, playerText) {
  const scene = story.scenes[state.sceneId]
  if (!scene || !safeText(playerText, 900)) return state
  const dialogue = sanitizeDialogue(reply, scene)
  let signals = sanitizeSignals(reply, scene)
  if (declaresCombatAction(playerText) && scene.id === 'negociacao-na-clareira') signals = ['negociacao_rompida_por_ataque']
  if (declaresCombatAction(playerText) && scene.id === 'confronto-na-clareira') signals = ['confronto_iniciado', 'abordagem_combativa']
  signals = fallbackSignal(state, scene, signals, reply.source)
  const completedBeats = unique([...state.completedBeats, ...signals.map((signal) => `${scene.id}:${signal}`)])
  const { flags, discovered } = applySignalEffects(state, scene, signals)
  const relationships = applyRelationships(state.relationships, reply.relationshipSuggestions, scene)
  const memories = applyMemories(state, reply, playerText, scene)
  let { storyMemories } = memories
  const memoryState = memories.memoryState
  const rescueSignal = signals.find((signal) => ['elara_libertada_por_dialogo', 'elara_libertada_por_combate'].includes(signal))
  if (rescueSignal && !storyMemories.some(({ id }) => id === 'memory-rescue-opening')) {
    const path = rescueSignal === 'elara_libertada_por_dialogo' ? 'por uma abordagem de diálogo e pressão' : 'durante um confronto direto'
    storyMemories = [...storyMemories, {
      id: 'memory-rescue-opening', type: 'witnessed', sourceCharacterId: 'elara', importance: 5,
      summary: `Elara viu Sirius assumir a forma de corvo e conquistar sua liberdade ${path} diante de três mercenários orcs na Floresta Antiga.`,
    }].slice(-MAX_STORY_MEMORIES)
  }
  const { storyHistory, recentHistory } = historyFromTurn(state, reply, playerText, scene, dialogue)
  const declaredActions = parsePlayerInput(playerText).actions.map((text, index) => ({
    id: `player-action-${state.totalTurns + 1}-${index}`,
    text,
    sceneId: scene.id,
    chapterId: scene.chapterId,
    turn: state.totalTurns + 1,
    status: 'declared',
  }))
  const playerActions = [...(state.playerActions ?? []), ...declaredActions].slice(-MAX_PLAYER_ACTIONS)
  const sceneTurns = state.sceneTurns + 1
  const recentEffects = (Array.isArray(reply.sceneEffects) ? reply.sceneEffects : [])
    .filter(({ type, value }) => ['ambience', 'tension', 'clue', 'presence'].includes(type) && safeText(value))
    .slice(0, 4)
    .map(({ type, value }) => ({ type, value: safeText(value, 180) }))

  let next = {
    ...state,
    beat: Math.min(scene.beats.length, completedBeats.filter((key) => key.startsWith(`${scene.id}:`)).length),
    completedBeats,
    sceneTurns,
    totalTurns: state.totalTurns + 1,
    flags,
    discovered,
    relationships,
    memoryState,
    playerActions,
    storyMemories,
    storyHistory,
    recentHistory,
    recentEffects,
    codexProgress: codexProgress(discovered, state.visitedScenes, flags),
    updatedAt: now(),
  }
  const route = resolvedTransition(scene, sceneTurns, signals)
  if (route) next = transitionToNext(next, scene, route)
  return next
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (saved?.version === STORY_VERSION && story.scenes[saved.sceneId]) {
      const scene = story.scenes[saved.sceneId]
      const discovered = unique((saved.discovered ?? []).filter((id) => typeof id === 'string'))
      const visitedScenes = unique((saved.visitedScenes ?? [scene.id]).filter((id) => story.scenes[id]))
      const flags = saved.flags && typeof saved.flags === 'object' ? saved.flags : {}
      return {
        ...createInitialState(),
        ...saved,
        chapterId: scene.chapterId,
        inventory: unique((saved.inventory ?? []).filter((item) => ALLOWED_INVENTORY.has(item))),
        relationships: relationshipMap(saved.relationships),
        discovered,
        visitedScenes,
        presentNpcIds: [...scene.participants],
        storyHistory: Array.isArray(saved.storyHistory) ? saved.storyHistory.slice(-MAX_HISTORY) : openingEntries(scene),
        recentHistory: Array.isArray(saved.recentHistory) ? saved.recentHistory.slice(-MAX_RECENT_HISTORY) : [],
        storyMemories: Array.isArray(saved.storyMemories) ? saved.storyMemories.slice(-MAX_STORY_MEMORIES) : [],
        playerActions: Array.isArray(saved.playerActions) ? saved.playerActions.slice(-MAX_PLAYER_ACTIONS) : [],
        codexProgress: codexProgress(discovered, visitedScenes, flags),
      }
    }
  } catch {
    // Um save inválido nunca impede o início de uma nova crônica.
  }
  return createInitialState()
}

export function persistState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state))
}

export function resetState() {
  localStorage.removeItem(SAVE_KEY)
  return createInitialState()
}

export function progressFor(state) {
  const chapter = story.chapters.find(({ id }) => id === state.chapterId)
  if (!chapter) return 0
  const completed = chapter.sceneIds.filter((id) => state.completedScenes.includes(id)).length
  const currentWeight = chapter.sceneIds.includes(state.sceneId) ? Math.min(.85, state.sceneTurns / Math.max(1, story.scenes[state.sceneId].maxTurns)) : 0
  return Math.min(99, Math.round(((completed + currentWeight) / chapter.sceneIds.length) * 100))
}

export function currentScene(state) {
  return story.scenes[state.sceneId]
}
