const QUOTED_ACTION = /"([^"\r\n]+)"|“([^”\r\n]+)”|«([^»\r\n]+)»/gu

const clean = (value, maximum = 900) => String(value ?? '')
  .replace(/\s+/gu, ' ')
  .trim()
  .slice(0, maximum)

const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/gu, '')
  .toLocaleLowerCase('pt-BR')

const OFFENSIVE_ACTION = /\b(ataco|ataca|atacar|avanco|avanca|avancar|golpeio|golpeia|golpear|derrubo|derruba|derrubar|conjuro|conjura|conjurar|disparo|dispara|disparar|descarrego|descarrega|descarregar|salto contra|salta contra|saltar contra|parto para cima|parte para cima|partir para cima|lanco (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|lanca (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|lancar (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|jogo (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|joga (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|jogar (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|invoco (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|invoca (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|invocar (?:um |uma |o |a )?(?:raio|feitico|magia|encantamento|descarga|maldicao)|arremesso (?:uma |a )?(?:arma|pedra|lamina)|arremessa (?:uma |a )?(?:arma|pedra|lamina)|arremessar (?:uma |a )?(?:arma|pedra|lamina))\b/u

const isOffensiveAction = (value) => OFFENSIVE_ACTION.test(normalize(value))

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

  const speech = clean(speechParts.join(' '))
  if (!actions.length && isOffensiveAction(raw)) {
    return {
      raw,
      speech: '',
      actions: [raw],
      hasActions: true,
      inferredAction: true,
    }
  }

  return {
    raw,
    speech,
    actions: actions.slice(0, 4),
    hasActions: actions.length > 0,
    inferredAction: false,
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
  return isOffensiveAction(declaredText)
}
