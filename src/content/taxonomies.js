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

export const knowledgeStatuses = {
  public: { label: 'Pública', description: 'Informação disponível sem restrição no Arquivo.', tone: 'documented' },
  documented: { label: 'Documentada', description: 'Afirmação sustentada por fonte pública identificada.', tone: 'documented' },
  unknown: { label: 'Desconhecida', description: 'As fontes não permitem formular uma resposta responsável.', tone: 'unknown' },
  lost: { label: 'Perdida', description: 'Há indício de que o registro existiu, mas o conteúdo não sobreviveu.', tone: 'lost' },
  disputed: { label: 'Contestada', description: 'Fontes ou intérpretes relevantes sustentam versões incompatíveis.', tone: 'disputed' },
  secret: { label: 'Secreta', description: 'A existência pode ser pública, mas o conteúdo está fora do acesso comum.', tone: 'redacted' },
  unrecorded: { label: 'Não registrada', description: 'Nenhuma fonte conhecida documentou a informação.', tone: 'unknown' },
  rumor: { label: 'Baseada em rumor', description: 'Circula oralmente ou por cópias sem autenticação suficiente.', tone: 'legendary' },
  'people-only': { label: 'Conhecida apenas por determinado povo', description: 'Preservada por uma comunidade que controla sua transmissão e tradução.', tone: 'witnessed' },
}

export function truthFor(status = 'documented') {
  return truthStatuses[status] ?? truthStatuses.documented
}

export function knowledgeFor(status = 'public') {
  return knowledgeStatuses[status] ?? knowledgeStatuses.public
}
