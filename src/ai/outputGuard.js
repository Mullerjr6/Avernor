const playerAgencyPattern = /\bSirius\s+(?:se\s+)?(?:sente|sentiu|pensa|pensou|decide|decidiu|aceita|aceitou|recusa|recusou|diz|disse|responde|respondeu|faz|fez|deseja|desejou|percebe|percebeu|abaixa|abaixou|ergue|ergueu|sorri|sorriu|caminha|caminhou|aproxima|aproximou|afasta|afastou|toca|tocou|segura|segurou|beija|beijou|ajoelha|ajoelhou|concorda|concordou|lembra|lembrou|teme|temeu|quer|quis)\b/iu

export function containsPlayerControl(value) {
  return playerAgencyPattern.test(String(value ?? ''))
}

export function sanitizeCharacterAction(action) {
  const text = String(action ?? '').trim()
  return containsPlayerControl(text) ? '' : text
}

export function assertCharacterDoesNotControlPlayer(message) {
  if (containsPlayerControl(message)) {
    const error = new Error('A resposta tentou controlar Sirius.')
    error.code = 'INVALID_MODEL_OUTPUT'
    throw error
  }
}
