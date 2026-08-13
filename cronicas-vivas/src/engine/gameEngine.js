import { chapter, firstSceneId } from './chapterZero.js'

export const SAVE_KEY = 'avernor-cronicas-vivas-save-v2'
export const ALLOWED_INVENTORY = new Set(['Carta cifrada de Normus', 'Medalhão da Folha Partida', 'Fulgarion'])

export function createInitialState() {
  const firstScene = chapter.scenes[firstSceneId]
  return {
    version: 2,
    chapterId: chapter.id,
    sceneId: firstSceneId,
    history: [],
    flags: { ...(firstScene.flags ?? {}) },
    inventory: [...new Set(['Carta cifrada de Normus', 'Medalhão da Folha Partida', 'Fulgarion', ...(firstScene.inventory ?? [])])],
    relationships: { elara: 0, aelwen: 0 },
    discovered: [...new Set(['sirius-kayler', 'floresta-antiga', ...(firstScene.discover ?? [])])],
    freeReplies: {},
    visited: [firstSceneId],
    turns: 0,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

const unique = (items) => [...new Set(items)]

function applyEffects(state, effects = []) {
  const relationships = { ...state.relationships }
  for (const effect of effects) {
    if (effect.type === 'relationship_delta') relationships[effect.target] = (relationships[effect.target] ?? 0) + effect.value
  }
  return { ...state, relationships }
}

function enterScene(state, scene) {
  return {
    ...state,
    sceneId: scene.id,
    flags: { ...state.flags, ...(scene.flags ?? {}) },
    inventory: unique([...state.inventory, ...(scene.inventory ?? [])]),
    discovered: unique([...state.discovered, ...(scene.discover ?? [])]),
    visited: unique([...(state.visited ?? []), scene.id]),
    turns: state.turns + 1,
    updatedAt: new Date().toISOString(),
  }
}

function meetsRequirements(state, requires) {
  if (!requires) return true
  if (requires.flags && !Object.entries(requires.flags).every(([key, value]) => state.flags[key] === value)) return false
  if (requires.anyFlags && !requires.anyFlags.some((key) => Boolean(state.flags[key]))) return false
  if (requires.minRelationships && !Object.entries(requires.minRelationships).every(([key, value]) => (state.relationships[key] ?? 0) >= value)) return false
  return true
}

export function choicesForScene(state, scene = chapter.scenes[state.sceneId]) {
  return (scene?.choices ?? []).filter((choice) => meetsRequirements(state, choice.requires))
}

export function choose(state, choiceId) {
  const scene = chapter.scenes[state.sceneId]
  const choice = choicesForScene(state, scene).find((item) => item.id === choiceId)
  if (!choice) return state
  let next = applyEffects(state, choice.effects)
  next = { ...next, flags: { ...next.flags, ...(choice.flags ?? {}) } }
  next = { ...next, history: [...next.history, { sceneId: scene.id, choiceId, label: choice.label }] }
  return enterScene(next, chapter.scenes[choice.target])
}

export function addFreeReply(state, reply) {
  const sceneReplies = Array.isArray(state.freeReplies[state.sceneId]) ? state.freeReplies[state.sceneId] : []
  return {
    ...state,
    freeReplies: { ...state.freeReplies, [state.sceneId]: [...sceneReplies, reply].slice(-8) },
    turns: state.turns + 1,
    updatedAt: new Date().toISOString(),
  }
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (saved?.version === 2 && chapter.scenes[saved.sceneId]) {
      return {
        ...saved,
        inventory: unique((saved.inventory ?? []).filter((item) => ALLOWED_INVENTORY.has(item))),
        discovered: unique((saved.discovered ?? []).filter((id) => typeof id === 'string')),
        visited: unique((saved.visited ?? [saved.sceneId]).filter((id) => chapter.scenes[id])),
        freeReplies: saved.freeReplies ?? {},
      }
    }
  } catch {
    // Um save inválido nunca deve impedir o início de uma nova crônica.
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
  if (state.flags.chapterComplete) return 100
  return Math.min(94, 5 + Math.max(0, (state.visited?.length ?? 1) - 1) * 5)
}
