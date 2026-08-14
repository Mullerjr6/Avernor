const QUOTED_ACTION = /"([^"\r\n]+)"|“([^”\r\n]+)”|«([^»\r\n]+)»/gu

const clean = (value, maximum = 900) => String(value ?? '')
  .replace(/\s+/gu, ' ')
  .trim()
  .slice(0, maximum)

export function parsePlayerInput(value) {
  const raw = clean(value)
  const actions = []
  const speechParts = []
  let cursor = 0

  for (const match of raw.matchAll(QUOTED_ACTION)) {
    const before = clean(raw.slice(cursor, match.index))
    if (before) speechParts.push(before)
    const action = clean(match[1] ?? match[2] ?? match[3], 600)
    if (action) actions.push(action)
    cursor = match.index + match[0].length
  }

  const remainder = clean(raw.slice(cursor))
  if (remainder) speechParts.push(remainder)

  return {
    raw,
    speech: clean(speechParts.join(' ')),
    actions: actions.slice(0, 4),
    hasActions: actions.length > 0,
  }
}

export function narrativeInput(value) {
  const parsed = typeof value === 'string' ? parsePlayerInput(value) : value
  const sections = []
  if (parsed.speech) sections.push(`[FALA DECLARADA POR SIRIUS]\n${parsed.speech}`)
  parsed.actions.forEach((action, index) => sections.push(`[AÇÃO ${index + 1} DECLARADA POR SIRIUS]\n${action}`))
  return sections.join('\n\n') || parsed.raw
}

export function declaresCombatAction(value) {
  const parsed = typeof value === 'string' ? parsePlayerInput(value) : value
  const declaredText = parsed.hasActions ? parsed.actions.join(' ') : parsed.raw
  const normalized = String(declaredText ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLocaleLowerCase('pt-BR')

  return /\b(ataco|atacar|avanco|avancar|golpeio|golpear|derrubo|derrubar|conjuro|conjurar|disparo|disparar|descarrego|descarregar|salto contra|saltar contra|parto para cima|partir para cima|uso (?:um |o )?raio|usar (?:um |o )?raio|lanco (?:um |o )?raio|lancar (?:um |o )?raio)\b/u.test(normalized)
}
