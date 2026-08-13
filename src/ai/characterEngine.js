import { getCharacterProfile, PLAYER_CHARACTER_ID } from './characters/characterProfiles.js'
import { summarizeConversation, updateConversationMemories } from './memoryService.js'
import { applyRelationshipSuggestion, createRelationship } from './relationshipService.js'
import { assertCharacterDoesNotControlPlayer, sanitizeCharacterAction } from './outputGuard.js'

const messageId = (role, turn) => `${role}-${Date.now().toString(36)}-${turn}-${Math.random().toString(36).slice(2, 7)}`

export function createCharacterConversation({ characterId, userId, conversationId, greeting }) {
  const createdAt = new Date().toISOString()
  return {
    version: 2,
    characterId,
    playerCharacterId: PLAYER_CHARACTER_ID,
    userId,
    conversationId,
    messages: greeting ? [{ id: messageId('assistant', 0), role: 'assistant', text: greeting, action: '', emotion: 'attentive', createdAt, source: 'profile' }] : [],
    summary: '',
    playerMemory: [],
    characterMemory: [],
    relationshipMemory: [],
    relationship: createRelationship(),
    turns: 0,
    createdAt,
    updatedAt: createdAt,
  }
}

export function addUserTurn(conversation, message) {
  const text = String(message).trim()
  if (!text || text.length > 1200) throw new Error('A mensagem deve conter entre 1 e 1.200 caracteres.')
  const createdAt = new Date().toISOString()
  const memories = updateConversationMemories(conversation, text, conversation.characterId, createdAt)
  return {
    ...conversation,
    ...memories,
    messages: [...conversation.messages, { id: messageId('user', conversation.turns + 1), role: 'user', text, createdAt }],
    turns: conversation.turns + 1,
    updatedAt: createdAt,
  }
}

export function addCharacterTurn(conversation, reply) {
  const profile = getCharacterProfile(conversation.characterId)
  if (!profile) throw new Error('Perfil de personagem ausente.')
  const createdAt = new Date().toISOString()
  assertCharacterDoesNotControlPlayer(reply.message)
  const relationship = applyRelationshipSuggestion(conversation.relationship, reply.relationshipSuggestion, profile.relationshipPolicy)
  const messages = [...conversation.messages, {
    id: messageId('assistant', conversation.turns),
    role: 'assistant',
    text: String(reply.message).trim(),
    action: sanitizeCharacterAction(reply.action),
    emotion: reply.emotion ?? 'attentive',
    source: reply.source ?? 'unknown',
    createdAt,
  }]
  return {
    ...conversation,
    relationship,
    messages,
    summary: summarizeConversation(messages, conversation.summary),
    updatedAt: createdAt,
  }
}
