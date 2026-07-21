export const truthStatuses = {
  documented: { label: 'Documentado', description: 'Confirmado por fontes convergentes do Arquivo.', tone: 'documented' },
  witnessed: { label: 'Testemunhado', description: 'Registrado por testemunhas confiáveis, sem prova material completa.', tone: 'witnessed' },
  disputed: { label: 'Contestado', description: 'Fontes relevantes apresentam versões incompatíveis.', tone: 'disputed' },
  legendary: { label: 'Lendário', description: 'Preservado por tradição, sem confirmação histórica suficiente.', tone: 'legendary' },
  prophetic: { label: 'Profético', description: 'Texto de interpretação aberta sobre acontecimentos possíveis.', tone: 'prophetic' },
  redacted: { label: 'Restrito', description: 'O registro público foi deliberadamente limitado.', tone: 'redacted' },
}

export const canonStatuses = {
  canon: 'Cânone consolidado',
  expanded: 'Expansão editorial',
  provisional: 'Nome ou detalhe provisório',
}

export function truthFor(status = 'documented') {
  return truthStatuses[status] ?? truthStatuses.documented
}
