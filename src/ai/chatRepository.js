const STORAGE_VERSION = 2
const USER_KEY = 'avernor-personagens-vivos-user-v1'
const conversationKey = (userId, characterId) => `avernor-personagens-vivos-v2:${userId}:${characterId}`

function generatedId(prefix) {
  const random = Math.random().toString(36).slice(2, 10)
  return `${prefix}-${Date.now().toString(36)}-${random}`
}

export function createLocalChatRepository(storage = globalThis.localStorage) {
  if (!storage) throw new Error('Armazenamento local indisponível.')
  return {
    getUserId() {
      const existing = storage.getItem(USER_KEY)
      if (existing) return existing
      const userId = generatedId('anon')
      storage.setItem(USER_KEY, userId)
      return userId
    },
    load(userId, characterId) {
      try {
        const parsed = JSON.parse(storage.getItem(conversationKey(userId, characterId)))
        return parsed?.version === STORAGE_VERSION && parsed.characterId === characterId ? parsed : null
      } catch {
        return null
      }
    },
    save(conversation) {
      storage.setItem(conversationKey(conversation.userId, conversation.characterId), JSON.stringify({ ...conversation, version: STORAGE_VERSION }))
    },
    remove(userId, characterId) {
      storage.removeItem(conversationKey(userId, characterId))
    },
  }
}

export { STORAGE_VERSION }
