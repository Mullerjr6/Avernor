import { sanitizeRelationship } from '../../src/ai/relationshipService.js'

const safeString = (value, maximum) => String(value ?? '').trim().slice(0, maximum)

export function sanitizeCharacterChatState(state = {}, characterId) {
  const memories = Array.isArray(state.memories) ? state.memories
    .filter((memory) => memory?.sourceCharacterId === characterId)
    .slice(0, 10)
    .map((memory) => ({
      type: safeString(memory.type, 40),
      summary: safeString(memory.summary, 280),
      topics: Array.isArray(memory.topics) ? memory.topics.slice(0, 8).map((topic) => safeString(topic, 40)) : [],
      importance: Math.min(5, Math.max(1, Number(memory.importance) || 1)),
      sourceCharacterId: characterId,
    })) : []
  const recentMessages = Array.isArray(state.recentMessages) ? state.recentMessages.slice(-20).map(({ role, text, action }) => ({
    role: role === 'assistant' ? 'assistant' : 'user',
    text: safeString(text, role === 'assistant' ? 1800 : 1200),
    action: role === 'assistant' ? safeString(action, 300) : '',
  })) : []
  return {
    relationship: sanitizeRelationship(state.relationship),
    summary: safeString(state.summary, 2400),
    memories,
    recentMessages,
  }
}
