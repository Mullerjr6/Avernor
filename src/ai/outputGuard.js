const playerAgencyPattern = /\bSirius\s+(?:sente|sentiu|pensa|pensou|decide|decidiu|aceita|aceitou|recusa|recusou|diz|disse|responde|respondeu|faz|fez|deseja|desejou|percebe|percebeu|abaixa|abaixou|ergue|ergueu|sorri|sorriu|caminha|caminhou|toca|tocou|segura|segurou|concorda|concordou)\b/iu

export function containsPlayerControl(value) {
  return playerAgencyPattern.test(String(value ?? ''))
}

export function sanitizeCharacterAction(action) {
  const text = String(action ?? '').trim()
  return containsPlayerControl(text) ? '' : text
}

export function assertCharacterDoesNotControlPlayer(message) {
  if (containsPlayerControl(message)) throw new Error('A resposta tentou controlar Sirius.')
}
