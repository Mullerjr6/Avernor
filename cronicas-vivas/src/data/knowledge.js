import canon from '../generated/canon.json'

export const canonById = Object.fromEntries(canon.records.map((record) => [record.id, record]))

export const knowledgeRules = {
  'sirius-kayler': {
    voice: 'Reservado, observador e direto. Evita grandiloquência e não trata sobrevivência como triunfo.',
    knows: ['sirius-kayler', 'floresta-antiga', 'carta-de-normus', 'medalhao-da-folha-partida'],
    withholds: ['O conteúdo integral da carta de Normus ainda não foi decifrado.'],
  },
  elara: {
    voice: 'Precisa, impaciente com evasivas e consciente de que juramentos herdados precisam ser escolhidos.',
    knows: ['elara', 'rainha-aelwen', 'floresta-antiga', 'caminho-das-arvores-ausentes', 'lethariel', 'sirius-kayler'],
    withholds: [
      'Aelwen ordenou que Sirius fosse conduzido vivo a Lethariel.',
      'Elara sabe que existe um pacto entre Aelwen e Normus, mas não conhece todas as cláusulas.',
    ],
  },
  'rainha-aelwen': {
    voice: 'Serena, deliberada e política. Separa amizade, dever, consentimento e tutela.',
    knows: ['rainha-aelwen', 'elara', 'sirius-kayler', 'floresta-antiga', 'lethariel', 'carta-de-normus', 'medalhao-da-folha-partida'],
    withholds: ['O teor completo do pacto com Normus é reservado até que Sirius escolha ouvi-lo.'],
  },
}

export function recordsKnownBy(characterId, discoveredIds = []) {
  const allowed = new Set([...(knowledgeRules[characterId]?.knows ?? []), ...discoveredIds])
  return [...allowed].map((id) => canonById[id]).filter(Boolean)
}

export function canonicalContext(characterId, discoveredIds = []) {
  const rule = knowledgeRules[characterId]
  return {
    character: canonById[characterId],
    voice: rule?.voice ?? '',
    knownRecords: recordsKnownBy(characterId, discoveredIds).map(({ id, name, summary, description, limitations, truthStatus }) => ({
      id, name, summary, description, limitations, truthStatus,
    })),
    protectedKnowledge: rule?.withholds ?? [],
  }
}

export { canon }
