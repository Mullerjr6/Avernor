import { assertCharacterDoesNotControlPlayer, sanitizeCharacterAction } from '../../src/ai/outputGuard.js'
import { WorkersAiError } from './workersAi.js'

export const CHARACTER_EMOTIONS = new Set(['attentive', 'guarded', 'warm', 'amused', 'sad', 'firm', 'curious', 'tense', 'reflective'])
export const CHARACTER_RELATIONSHIP_AXES = ['affinity', 'trust', 'respect', 'romance', 'tension']

export function validateCharacterModelResponse(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'Resposta estruturada ausente.')
  }
  if (typeof value.message !== 'string') throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'Fala do personagem possui tipo inválido.')
  const message = value.message.trim().slice(0, 1800)
  if (!message) throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'Fala do personagem ausente.')
  assertCharacterDoesNotControlPlayer(message)
  const suggestion = value.relationshipSuggestion && typeof value.relationshipSuggestion === 'object' && !Array.isArray(value.relationshipSuggestion)
    ? value.relationshipSuggestion
    : {}
  const relationshipSuggestion = Object.fromEntries(CHARACTER_RELATIONSHIP_AXES.map((axis) => {
    const proposed = suggestion[axis]
    return [axis, typeof proposed === 'number' && Number.isFinite(proposed) ? proposed : 0]
  }))
  return {
    message,
    action: sanitizeCharacterAction(typeof value.action === 'string' ? value.action.trim().slice(0, 300) : ''),
    emotion: typeof value.emotion === 'string' && CHARACTER_EMOTIONS.has(value.emotion) ? value.emotion : 'attentive',
    relationshipSuggestion,
  }
}
