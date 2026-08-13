import { localCharacterReply } from './localCharacterResponder.js'
import { selectRelevantMemories } from './memoryService.js'

const endpoint = import.meta.env.VITE_CHARACTER_CHAT_API_URL?.trim()

function localFallback(characterId, message, conversation, fallback = false) {
  return {
    ...localCharacterReply({ characterId, message, memoryState: conversation }),
    fallback,
    source: fallback ? 'local-fallback' : 'local-canon',
  }
}

export async function requestCharacterReply({ characterId, message, conversation }) {
  if (!endpoint) return localFallback(characterId, message, conversation)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60_000)
  try {
    const memories = selectRelevantMemories(conversation, message, characterId)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        characterId,
        userId: conversation.userId,
        conversationId: conversation.conversationId,
        message,
        state: {
          relationship: conversation.relationship,
          summary: conversation.summary,
          memories,
          recentMessages: conversation.messages.slice(-24).map(({ role, text, action }) => ({ role, text, action })),
        },
      }),
    })
    if (!response.ok) throw new Error(`Character chat API returned ${response.status}`)
    const reply = await response.json()
    if (!reply?.message || typeof reply.message !== 'string') throw new Error('Resposta de personagem inválida.')
    return { ...reply, source: 'workers-ai' }
  } catch (error) {
    console.warn('Personagem remoto indisponível; usando resposta canônica local.', error)
    return localFallback(characterId, message, conversation, true)
  } finally {
    clearTimeout(timeout)
  }
}
