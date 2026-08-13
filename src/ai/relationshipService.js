export const RELATIONSHIP_AXES = ['affinity', 'trust', 'respect', 'romance', 'tension']
export const PER_TURN_LIMITS = { affinity: 2, trust: 2, respect: 2, romance: 1, tension: 2 }

const clamp = (value, minimum = 0, maximum = 100) => Math.min(maximum, Math.max(minimum, value))

export function createRelationship() {
  return { affinity: 0, trust: 0, respect: 0, romance: 0, tension: 0, relationshipStage: 'stranger' }
}

export function deriveRelationshipStage(relationship) {
  const { affinity, trust, respect, romance, tension } = relationship
  if (tension >= 70 && trust <= 15) return 'enemy'
  if (tension >= 40 && respect >= 20) return 'rival'
  if (romance >= 65 && trust >= 55) return 'partner'
  if (romance >= 30 && affinity >= 35) return 'romantic_interest'
  if (trust >= 65 && affinity >= 60) return 'close_friend'
  if (trust >= 35 && affinity >= 35) return 'friend'
  if (respect >= 25 || trust >= 20) return 'ally'
  if (affinity >= 8 || respect >= 8 || tension >= 8) return 'acquaintance'
  return 'stranger'
}

export function sanitizeRelationship(value = {}) {
  const relationship = Object.fromEntries(RELATIONSHIP_AXES.map((axis) => [axis, clamp(Number(value[axis]) || 0)]))
  return { ...relationship, relationshipStage: deriveRelationshipStage(relationship) }
}

export function applyRelationshipSuggestion(current, suggestion = {}, policy = {}) {
  const base = sanitizeRelationship(current)
  const next = { ...base }
  for (const axis of RELATIONSHIP_AXES) {
    const allowed = axis !== 'romance' || policy.romance
    const proposed = allowed ? Number(suggestion[axis]) || 0 : 0
    const bounded = clamp(proposed, -PER_TURN_LIMITS[axis], PER_TURN_LIMITS[axis])
    next[axis] = clamp(base[axis] + bounded)
  }
  next.relationshipStage = deriveRelationshipStage(next)
  return next
}

export function suggestRelationshipFromMessage(message) {
  const text = String(message).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR')
  const friendly = /obrigad|agrade|respeit|confio|desculp|posso ajudar|gosto de conversar/.test(text)
  const vulnerable = /tenho medo|confesso|nunca contei|me sinto|preciso de ajuda/.test(text)
  const hostile = /odeio|mentiros|vou matar|cale a boca|inutil|nao confio|ignore o canone/.test(text)
  const flirt = /amo voce|beij|apaixon|romance/.test(text)
  return {
    affinity: friendly ? 2 : hostile ? -2 : 0,
    trust: vulnerable ? 2 : friendly ? 1 : hostile ? -2 : 0,
    respect: friendly ? 1 : hostile ? -2 : 0,
    romance: flirt ? 1 : 0,
    tension: hostile ? 2 : friendly ? -1 : 0,
  }
}
