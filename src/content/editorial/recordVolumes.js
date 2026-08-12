const fieldLabels = {
  overview: 'Síntese do arquivo', archivalOverview: 'Leitura preservada', narrativeRole: 'Papel na narrativa', narrativeImportance: 'Importância histórica e narrativa',
  appearance: 'Aparência documentada', personality: 'Temperamento', motivations: 'Motivações', innerConflict: 'Conflito íntimo', relationshipDynamics: 'Dinâmicas de relação',
  qualities: 'Qualidades reconhecidas', flaws: 'Falhas e contradições', fears: 'Temores', desires: 'Desejos', objectives: 'Objetivos', values: 'Valores', moralLimits: 'Limites morais', beliefs: 'Crenças pessoais',
  speech: 'Voz e maneira de falar', habits: 'Hábitos observados', attire: 'Vestimentas', weapons: 'Armas', equipment: 'Equipamentos', relics: 'Relíquias associadas',
  abilities: 'Habilidades', powers: 'Poderes documentados', disputedAbilities: 'Capacidades contestadas', limitations: 'Limites', weaknesses: 'Vulnerabilidades', knowledge: 'Conhecimentos',
  physicalCondition: 'Condição física', emotionalCondition: 'Condição emocional', family: 'Família', allies: 'Aliados', enemies: 'Adversários', warParticipation: 'Participação em guerras',
  eraParticipation: 'Participação histórica', politicalPosition: 'Posição política', publicReputation: 'Reputação pública', culturalViews: 'Leituras de outros povos', knownDestiny: 'Destino conhecido', legacy: 'Legado',
  foundation: 'Fundação e origem', climate: 'Clima', geography: 'Geografia', population: 'População', government: 'Governo', succession: 'Sucessão', economy: 'Economia', religion: 'Religião',
  architecture: 'Arquitetura', culture: 'Cultura', customs: 'Costumes', festivals: 'Festas e calendários', cuisine: 'Alimentação e mesa', dailyLife: 'Vida cotidiana', demographics: 'Povos e demografia', laws: 'Leis e instituições',
  military: 'Defesa e forças armadas', internalConflicts: 'Conflitos internos', alliesPolitical: 'Alianças políticas', rivalsPolitical: 'Rivalidades políticas', importantCharacters: 'Pessoas decisivas', relevantPlaces: 'Locais relacionados',
  currentSituation: 'Situação em 1204 d.C.', rumors: 'Rumores em circulação', background: 'Antecedentes', trigger: 'Estopim', belligerents: 'Participantes', commanders: 'Comandantes', armies: 'Forças mobilizadas',
  alliances: 'Alianças', strategies: 'Estratégias', mainBattles: 'Batalhas e episódios', losses: 'Perdas registradas', civilianImpact: 'Experiência civil', consequences: 'Consequências', territorialChanges: 'Mudanças territoriais',
  politicalImpact: 'Impacto político', economicImpact: 'Impacto econômico', culturalImpact: 'Impacto cultural', historicalAccounts: 'Relatos históricos', beginning: 'Início', startingEvent: 'Marco inicial', politicalContext: 'Contexto político',
  peoplesSituation: 'Condição dos povos', magicSituation: 'Condição da magia', rulers: 'Governantes', discoveries: 'Descobertas', migrations: 'Migrações', crises: 'Crises', religiousChanges: 'Mudanças religiosas',
  culturalChanges: 'Mudanças culturais', naturalEvents: 'Acontecimentos naturais', historicalFigures: 'Figuras históricas', endingEvent: 'Encerramento', transition: 'Transição', originMyth: 'Relato de origem', creationView: 'Visão da criação',
  deathView: 'Visão da morte', magicView: 'Visão da magia', symbols: 'Símbolos', rituals: 'Ritos', sacredDates: 'Datas sagradas', clergy: 'Oficiantes', sacredPlaces: 'Lugares sagrados', ancientTexts: 'Textos antigos',
  heresies: 'Heresias e dissidências', regionalDifferences: 'Diferenças regionais', contradictions: 'Contradições internas', modernInterpretations: 'Interpretações atuais', possiblyTrue: 'Possivelmente verdadeiro', unconfirmed: 'Não confirmado',
  ancientNames: 'Nomes antigos', creator: 'Autoria ou criação', materials: 'Materiais', inscriptions: 'Inscrições', costs: 'Custos de uso', formerBearers: 'Portadores anteriores', currentBearer: 'Custódia atual', activation: 'Ativação',
  destruction: 'Formas de destruição', risks: 'Riscos', events: 'Ocorrências registradas', methods: 'Métodos', survival: 'Sobrevivência', inheritance: 'Herança', vows: 'Juramentos', rivalries: 'Rivalidades', traits: 'Traços reconhecidos',
  habitat: 'Habitat', threat: 'Grau de ameaça', publicKnowledge: 'Conhecimento público', knowledgeGaps: 'Lacunas documentais', culturalReadings: 'Leituras culturais', provenance: 'Proveniência do registro', evidence: 'Evidências',
  interpretations: 'Interpretações', oralTraditions: 'Tradições orais', custodians: 'Custódios', preservation: 'Preservação', historicalSources: 'Fontes históricas', disputedClaims: 'Versões contestadas', publicSecrets: 'Informações públicas sensíveis',
  sections: 'Cadernos documentais', biography: 'Percurso registrado', detailedTimeline: 'Cronologia', curiosities: 'Notas dos cronistas', quotes: 'Vozes preservadas', references: 'Referências',
}

const plans = {
  character: [
    ['Caderno da pessoa', ['overview', 'appearance', 'personality', 'speech', 'habits']],
    ['Formação, desejo e escolha', ['biography', 'motivations', 'desires', 'objectives', 'values', 'moralLimits', 'innerConflict']],
    ['Sangue, amizade e oposição', ['family', 'relationshipDynamics', 'allies', 'enemies', 'publicReputation', 'culturalViews']],
    ['Poder, instrumento e preço', ['abilities', 'powers', 'disputedAbilities', 'weapons', 'equipment', 'relics', 'limitations', 'weaknesses']],
    ['Presença na história', ['warParticipation', 'eraParticipation', 'politicalPosition', 'currentLocation', 'physicalCondition', 'emotionalCondition']],
    ['Destino, memória e controvérsia', ['knownDestiny', 'legacy', 'historicalSources', 'disputedClaims', 'publicSecrets']],
  ],
  territory: [
    ['Terra, clima e fronteira', ['foundation', 'climate', 'geography', 'population', 'demographics']],
    ['Forma construída e circulação', ['architecture', 'relevantPlaces', 'economy', 'laws', 'government']],
    ['Casa, mesa e calendário', ['culture', 'dailyLife', 'customs', 'festivals', 'cuisine', 'religion']],
    ['Poder, defesa e vizinhança', ['succession', 'military', 'alliesPolitical', 'rivalsPolitical', 'importantCharacters']],
    ['Tensões do presente', ['internalConflicts', 'currentSituation', 'rumors', 'narrativeImportance']],
    ['Memória do território', ['biography', 'historicalSources', 'events', 'curiosities', 'disputedClaims']],
  ],
  society: [
    ['Origem e identidade coletiva', ['foundation', 'originMyth', 'traits', 'geography', 'publicReputation']],
    ['Governo, sangue e juramento', ['government', 'succession', 'inheritance', 'vows', 'leadership', 'importantCharacters']],
    ['Vida material e costumes', ['architecture', 'attire', 'economy', 'culture', 'customs', 'festivals', 'cuisine', 'dailyLife']],
    ['Fé, poder e limites', ['religion', 'beliefs', 'abilities', 'limitations', 'military', 'methods', 'moralLimits']],
    ['Alianças e fraturas', ['alliesPolitical', 'rivalsPolitical', 'rivalries', 'internalConflicts', 'disputedClaims']],
    ['Condição atual e memória', ['currentSituation', 'rumors', 'narrativeImportance', 'biography', 'historicalSources']],
  ],
  history: [
    ['Antes da ruptura', ['beginning', 'background', 'politicalContext', 'peoplesSituation', 'magicSituation', 'startingEvent', 'trigger']],
    ['Forças e decisões', ['belligerents', 'commanders', 'armies', 'alliances', 'objectives', 'strategies']],
    ['Experiência do acontecimento', ['mainBattles', 'events', 'phases', 'civilianImpact', 'losses', 'crises', 'migrations']],
    ['O mundo depois', ['consequences', 'territorialChanges', 'politicalImpact', 'economicImpact', 'culturalImpact', 'religiousChanges', 'culturalChanges']],
    ['Cronologia e transição', ['detailedTimeline', 'naturalEvents', 'discoveries', 'historicalFigures', 'endingEvent', 'transition']],
    ['Memória em disputa', ['historicalAccounts', 'legacy', 'disputedClaims', 'quotes', 'curiosities']],
  ],
  material: [
    ['Matéria e feitura', ['ancientNames', 'creator', 'materials', 'appearance', 'inscriptions']],
    ['Cadeia de custódia', ['formerBearers', 'currentBearer', 'provenance', 'historicalSources']],
    ['Uso conhecido', ['powers', 'abilities', 'activation', 'events', 'methods']],
    ['Limite, custo e perigo', ['limitations', 'costs', 'risks', 'weaknesses', 'destruction']],
    ['Marca deixada no mundo', ['politicalImpact', 'culturalImpact', 'narrativeImportance', 'legacy', 'culturalReadings']],
    ['Rumor, lacuna e controvérsia', ['rumors', 'knowledgeGaps', 'disputedClaims', 'unconfirmed', 'possiblyTrue']],
  ],
  belief: [
    ['Núcleo da tradição', ['archivalOverview', 'originMyth', 'creationView', 'publicKnowledge', 'overview']],
    ['O mundo, a morte e a magia', ['deathView', 'magicView', 'possiblyTrue', 'limitations', 'powers']],
    ['Rito, símbolo e lugar', ['symbols', 'rituals', 'sacredDates', 'clergy', 'sacredPlaces', 'ancientTexts']],
    ['Difusão e diferença', ['regionalDifferences', 'modernInterpretations', 'culturalReadings', 'oralTraditions', 'politicalImpact']],
    ['Contradição e perigo', ['heresies', 'contradictions', 'risks', 'costs', 'disputedClaims']],
    ['Prova, lacuna e consequência', ['evidence', 'provenance', 'historicalSources', 'knowledgeGaps', 'unconfirmed', 'narrativeImportance']],
  ],
  creature: [
    ['Identificação e natureza', ['archivalOverview', 'traits', 'appearance', 'race', 'publicKnowledge']],
    ['Habitat e comportamento', ['habitat', 'geography', 'climate', 'culture', 'habits']],
    ['Capacidade e ameaça', ['abilities', 'powers', 'threat', 'methods', 'limitations', 'weaknesses']],
    ['Encontros documentados', ['events', 'detailedTimeline', 'sections', 'historicalSources']],
    ['Convivência e leitura cultural', ['culturalReadings', 'rumors', 'curiosities', 'narrativeImportance']],
    ['Limites do conhecimento', ['knowledgeGaps', 'disputedClaims', 'unconfirmed', 'provenance']],
  ],
  library: [
    ['O volume e sua matéria', ['archivalOverview', 'appearance', 'materials', 'inscriptions', 'preservation']],
    ['Autoria, cópia e proveniência', ['creator', 'provenance', 'custodians', 'formerBearers', 'currentBearer']],
    ['Conteúdo preservado', ['publicKnowledge', 'sections', 'quotes', 'events']],
    ['Circulação e influência', ['culturalReadings', 'politicalImpact', 'culturalImpact', 'modernInterpretations']],
    ['Uso, leitura e risco', ['activation', 'methods', 'costs', 'risks', 'limitations']],
    ['Lacunas e disputas', ['knowledgeGaps', 'historicalSources', 'disputedClaims', 'unconfirmed', 'narrativeImportance']],
  ],
}

const domainByCatalog = {
  personagens: 'character', reinos: 'territory', cidades: 'territory', locais: 'territory', casas: 'society', povos: 'society', faccoes: 'society',
  historia: 'history', guerras: 'history', artefatos: 'material', reliquias: 'material', lancas: 'material', biblioteca: 'library',
  criaturas: 'creature', bestiario: 'creature', retornados: 'creature',
  mitologia: 'belief', religioes: 'belief', cosmologia: 'belief', portais: 'belief', mundos: 'belief', profecias: 'belief',
  fimDosTempos: 'belief', necromancia: 'belief', narKhalion: 'belief', celestiais: 'belief', lendas: 'belief',
  dinastias: 'society', sucessoes: 'society',
  genealogias: 'society',
}

const ignoredFallbackFields = new Set([
  'id', 'slug', 'name', 'subtitle', 'summary', 'description', 'image', 'thumbnail', 'gallery', 'imageScope', 'imageAlt', 'category', 'status', 'origin', 'location', 'period', 'era', 'kingdom', 'race', 'lineage',
  'relations', 'truthStatus', 'canonStatus', 'spoilerLevel', 'accent', 'thumbnailPosition', 'heroPosition', 'objectPosition', 'createdAt', 'updatedAt', 'tags', 'imageBrief', 'confidence', 'knowledgeStatus', 'sourceReliability',
])

export const hasRecordValue = (value) => {
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === 'object') return Object.keys(value).length > 0
  return value !== undefined && value !== null && String(value).trim() !== ''
}

function fieldValueText(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return fieldValueText(value[0])
  if (!value || typeof value !== 'object') return ''
  return value.body ?? value.description ?? value.note ?? value.summary ?? value.label ?? value.name ?? value.title ?? value.event ?? ''
}

function compactLead(item, entries) {
  const candidate = entries.map(({ value }) => fieldValueText(value)).find((value) => value.length >= 70)
  if (!candidate) return ''
  const clean = candidate.replace(/\s+/g, ' ').trim()
  return clean.length > 310 ? `${clean.slice(0, 307).replace(/[,;:]?\s+\S*$/, '')}…` : clean
}

function uniqueEntries(entries) {
  const seen = new Set()
  return entries.filter(({ value }) => {
    const signature = JSON.stringify(value)
    if (seen.has(signature)) return false
    seen.add(signature)
    return true
  })
}

function firstText(...values) {
  for (const value of values) {
    const text = fieldValueText(value)
    if (text) return text
  }
  return ''
}

function sentence(text, limit = 250) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= limit) return clean
  return `${clean.slice(0, limit - 1).replace(/[,;:]?\s+\S*$/, '')}…`
}

function claim(field, label, description, knowledgeStatus = 'documented') {
  return { field, label, value: { label, description, knowledgeStatus } }
}

function documentaryStatus(item) {
  if (['rumor', 'disputed', 'lost', 'unknown', 'unrecorded', 'secret', 'people-only'].includes(item.knowledgeStatus)) return item.knowledgeStatus
  if (item.truthStatus === 'disputed') return 'disputed'
  if (item.truthStatus === 'legendary' || item.truthStatus === 'prophetic') return 'rumor'
  if (item.truthStatus === 'redacted') return 'secret'
  return 'documented'
}

function buildEditorialNotes(item, catalogKey, domain) {
  const place = firstText(item.currentLocation, item.location, item.kingdom, item.origin) || 'posição não registrada'
  const time = firstText(item.period, item.era, item.birthDate, item.foundation) || 'datação não registrada'
  const status = documentaryStatus(item)
  const relationNames = (item.relations ?? []).map(({ label }) => label).filter(Boolean)
  const sources = [...(item.references ?? []), ...(item.historicalSources ?? [])]
  const gaps = [...(item.knowledgeGaps ?? []), ...(item.archiveGaps ?? []), ...(item.unknownFacts ?? []), ...(item.unconfirmed ?? []), ...(item.disputedClaims ?? [])]
  const shared = [
    claim('editorial-identity', 'Identidade arquivística', `${item.name} integra o arquivo como ${item.category || 'registro enciclopédico'}, associado a ${place} e a ${time}. A classificação organiza a consulta; não amplia por si só aquilo que as fontes permitem afirmar.`, status),
    claim('editorial-scope', 'Escopo desta leitura', `O núcleo confirmado é: ${sentence(item.summary || item.description, 290)} O restante do dossiê separa observação, interpretação, rumor e silêncio documental para não converter hipótese em fato.`, status),
    claim('editorial-present', 'Pergunta do presente', item.currentSituation ? sentence(item.currentSituation, 310) : `A condição precisa de ${item.name} em 1204 d.C. não foi registrada de maneira suficiente. O Arquivo preserva essa ausência como dado histórico, em vez de preenchê-la por conjectura.`, item.currentSituation ? status : 'unrecorded'),
    claim('editorial-network', 'Rede de consequências', relationNames.length ? `${item.name} não deve ser lido isoladamente. O índice o conecta a ${relationNames.slice(0, 5).join(', ')}${relationNames.length > 5 ? ' e outros registros' : ''}; essas relações indicam onde decisões, memórias ou deslocamentos reaparecem no acervo.` : `Nenhuma cadeia adicional de relações foi preservada além deste verbete; conexões futuras permanecem não registradas.`, relationNames.length ? 'documented' : 'unrecorded'),
    claim('editorial-source', 'Força documental', sources.length ? `A leitura pública reúne ${sources.length} ${sources.length === 1 ? 'fonte citada' : 'fontes citadas'} e as confronta com o estatuto “${item.truthStatus || 'documentado'}”. Concordância entre fontes aumenta a confiança, mas não elimina diferenças de perspectiva.` : `Não há lista autônoma de fontes anexada a este registro. Sua base atual depende do testemunho já indicado no verbete e deve permanecer limitada a esse alcance.`, sources.length ? 'documented' : 'unrecorded'),
    claim('editorial-gap', 'Lacuna principal', gaps.length ? sentence(gaps[0], 310) : `Nenhuma lacuna nominal foi preservada separadamente, mas datas, agentes ou desfechos ausentes continuam desconhecidos até que uma fonte pública os sustente.`, gaps.length ? status : 'unknown'),
  ]

  const domainNotes = {
    character: [
      claim('editorial-character-agency', 'Agência e escolha', item.objectives?.length ? `${item.name} age em torno de ${sentence(item.objectives[0], 240)}. O registro considera objetivo e decisão separadamente: desejar algo não prova que a pessoa aceitará qualquer meio para obtê-lo.` : `Os objetivos imediatos de ${item.name} não estão plenamente registrados; escolhas observáveis têm mais peso que intenções atribuídas por aliados ou inimigos.`, item.objectives?.length ? 'documented' : 'unknown'),
      claim('editorial-character-tension', 'Tensão decisiva', firstText(item.innerConflict, item.emotionalCondition, item.fears) ? sentence(firstText(item.innerConflict, item.emotionalCondition, item.fears), 310) : `A tensão íntima permanece não registrada. O Arquivo não transforma silêncio emocional em ausência de conflito.`, firstText(item.innerConflict, item.emotionalCondition, item.fears) ? status : 'unrecorded'),
      claim('editorial-character-cost', 'Limite do poder', firstText(item.limitations, item.weaknesses) ? `Nenhuma capacidade é lida sem seu preço: ${sentence(firstText(item.limitations, item.weaknesses), 280)}` : `O custo específico de suas capacidades não foi documentado neste registro; alegações de poder ilimitado devem ser recusadas.`, firstText(item.limitations, item.weaknesses) ? 'documented' : 'unknown'),
      claim('editorial-character-memory', 'Imagem deixada aos outros', firstText(item.publicReputation, item.culturalViews, item.legacy) ? sentence(firstText(item.publicReputation, item.culturalViews, item.legacy), 310) : `A reputação varia conforme testemunha, povo e interesse político; não existe avaliação pública única preservada.`, firstText(item.publicReputation, item.culturalViews, item.legacy) ? status : 'disputed'),
    ],
    territory: [
      claim('editorial-terrain', 'Leitura da paisagem', firstText(item.geography, item.climate) ? `A paisagem condiciona acesso, abrigo e autoridade: ${sentence(firstText(item.geography, item.climate), 285)} O Arquivo evita tratar relevo como simples decoração.` : `Relevo e clima locais não foram descritos fora da classificação cartográfica; qualquer detalhe adicional permanece desconhecido.`, firstText(item.geography, item.climate) ? 'documented' : 'unknown'),
      claim('editorial-circulation', 'Circulação e abastecimento', firstText(item.economy, item.relevantPlaces, item.dailyLife) ? sentence(firstText(item.economy, item.relevantPlaces, item.dailyLife), 310) : `Rotas de suprimento, mercados, pousos e ritmos de trabalho não foram registrados. A existência do topônimo não autoriza presumir prosperidade, abandono ou autossuficiência.`, firstText(item.economy, item.relevantPlaces, item.dailyLife) ? status : 'unrecorded'),
      claim('editorial-authority', 'Autoridade e fronteira', firstText(item.government, item.kingdom, item.status) ? `${item.name} é relacionado a ${place}; contudo, posição no mapa, jurisdição efetiva e presença administrativa são fatos distintos. ${sentence(firstText(item.government, item.status), 210)}` : `A autoridade exercida sobre este lugar é desconhecida ou contestada.`, firstText(item.government, item.kingdom) ? status : 'unknown'),
      claim('editorial-inhabitants', 'Escala humana', firstText(item.population, item.culture, item.customs) ? sentence(firstText(item.population, item.culture, item.customs), 300) : `Moradores, viajantes, trabalhadores e práticas cotidianas não receberam registro independente. O verbete conserva o lugar sem inventar uma população para ocupá-lo.`, firstText(item.population, item.culture, item.customs) ? status : 'unrecorded'),
    ],
    society: [
      claim('editorial-society-rule', 'O que sustenta a autoridade', firstText(item.government, item.succession, item.leadership) ? sentence(firstText(item.government, item.succession, item.leadership), 310) : `A forma de decisão interna não está suficientemente registrada; títulos ou sangue não devem ser tomados como prova automática de autoridade.`, firstText(item.government, item.succession, item.leadership) ? status : 'unknown'),
      claim('editorial-society-life', 'A vida além das elites', firstText(item.dailyLife, item.customs, item.culture, item.cuisine) ? sentence(firstText(item.dailyLife, item.customs, item.culture, item.cuisine), 310) : `Trabalho, cuidado, alimentação e transmissão de ofícios permanecem pouco documentados. A identidade coletiva não se reduz a governantes ou guerreiros.`, firstText(item.dailyLife, item.customs, item.culture, item.cuisine) ? status : 'unrecorded'),
      claim('editorial-society-conflict', 'Divergência interna', firstText(item.internalConflicts, item.rivalsPolitical, item.disputedClaims) ? sentence(firstText(item.internalConflicts, item.rivalsPolitical, item.disputedClaims), 310) : `Nenhuma sociedade age como uma única voz; as divergências internas específicas ainda não foram registradas neste verbete.`, firstText(item.internalConflicts, item.rivalsPolitical, item.disputedClaims) ? 'disputed' : 'unrecorded'),
      claim('editorial-society-boundary', 'Limite da generalização', `Os traços atribuídos a ${item.name} descrevem práticas registradas, não destinos biológicos nem unanimidade. Diferenças de região, geração e posição social devem permanecer possíveis.`),
    ],
    history: [
      claim('editorial-history-cause', 'Causa não é destino', firstText(item.background, item.trigger, item.startingEvent) ? sentence(firstText(item.background, item.trigger, item.startingEvent), 310) : `O ponto de partida é conhecido apenas de forma parcial; narrativas posteriores podem confundir justificativa política com causa histórica.`, firstText(item.background, item.trigger, item.startingEvent) ? status : 'disputed'),
      claim('editorial-history-civil', 'A experiência fora dos comandos', firstText(item.civilianImpact, item.losses, item.migrations, item.peoplesSituation) ? sentence(firstText(item.civilianImpact, item.losses, item.migrations, item.peoplesSituation), 310) : `A documentação preserva melhor decisões de comando que fome, deslocamento, luto e reconstrução. Essa assimetria é uma lacuna, não sinal de ausência de impacto civil.`, firstText(item.civilianImpact, item.losses, item.migrations, item.peoplesSituation) ? status : 'lost'),
      claim('editorial-history-after', 'Consequência duradoura', firstText(item.consequences, item.politicalImpact, item.culturalImpact, item.transition) ? sentence(firstText(item.consequences, item.politicalImpact, item.culturalImpact, item.transition), 310) : `As consequências de longo prazo ainda não foram separadas de relatos comemorativos ou acusatórios.`, firstText(item.consequences, item.politicalImpact, item.culturalImpact, item.transition) ? status : 'disputed'),
      claim('editorial-history-memory', 'Quem controla a memória', firstText(item.historicalAccounts, item.disputedClaims, item.legacy) ? sentence(firstText(item.historicalAccounts, item.disputedClaims, item.legacy), 310) : `Não há uma memória única deste acontecimento; arquivos oficiais, tradição oral e perdas familiares podem preservar ênfases incompatíveis.`, firstText(item.historicalAccounts, item.disputedClaims, item.legacy) ? 'disputed' : 'unrecorded'),
    ],
    material: [
      claim('editorial-material-object', 'Objeto e atribuição', firstText(item.creator, item.materials, item.inscriptions) ? sentence(firstText(item.creator, item.materials, item.inscriptions), 310) : `Autoria, matéria ou inscrições não são conhecidas de modo completo. Sem cadeia de prova, semelhança visual não autentica uma peça.`, firstText(item.creator, item.materials, item.inscriptions) ? status : 'unknown'),
      claim('editorial-material-custody', 'Posse não é legitimidade', firstText(item.currentBearer, item.formerBearers) ? `A cadeia conhecida registra ${sentence(firstText(item.currentBearer, item.formerBearers), 270)}. Portar, guardar ou conquistar o objeto não prova direito moral sobre seu uso.` : `A custódia atual é desconhecida; rumores de posse não devem ser tratados como localização.`, firstText(item.currentBearer, item.formerBearers) ? status : 'unknown'),
      claim('editorial-material-price', 'Todo uso deixa um preço', firstText(item.costs, item.risks, item.limitations) ? sentence(firstText(item.costs, item.risks, item.limitations), 310) : `O preço integral não foi registrado. O Arquivo rejeita versões em que o objeto produz efeito ilimitado, reversível e sem consequência.`, firstText(item.costs, item.risks, item.limitations) ? status : 'unknown'),
      claim('editorial-material-trace', 'Vestígio verificável', firstText(item.events, item.evidence, item.historicalSources) ? sentence(firstText(item.events, item.evidence, item.historicalSources), 310) : `Nenhum vestígio independente adicional consta do verbete; atribuições posteriores permanecem contestadas.`, firstText(item.events, item.evidence, item.historicalSources) ? status : 'disputed'),
    ],
    belief: [
      claim('editorial-belief-function', 'O que esta tradição procura explicar', `${item.name} organiza perguntas sobre ${sentence(item.summary || item.description, 255)} A função cultural do relato pode ser histórica mesmo quando sua leitura literal continua contestada.`, status),
      claim('editorial-belief-practice', 'Da narrativa à prática', firstText(item.rituals, item.symbols, item.modernInterpretations, item.culturalReadings) ? sentence(firstText(item.rituals, item.symbols, item.modernInterpretations, item.culturalReadings), 310) : `Ritos, símbolos e usos comunitários específicos não foram preservados neste verbete; não devem ser deduzidos apenas do título.`, firstText(item.rituals, item.symbols, item.modernInterpretations, item.culturalReadings) ? status : 'unrecorded'),
      claim('editorial-belief-literal', 'Limite entre crença e prova', `O Arquivo registra que pessoas e povos atribuem sentido a ${item.name}; isso não converte interpretação religiosa, profética ou cosmológica em mecanismo comprovado do mundo.`, item.truthStatus === 'witnessed' ? 'documented' : 'disputed'),
      claim('editorial-belief-danger', 'Uso político da interpretação', firstText(item.politicalImpact, item.risks, item.heresies, item.disputedClaims) ? sentence(firstText(item.politicalImpact, item.risks, item.heresies, item.disputedClaims), 310) : `Nenhum uso político específico foi preservado, mas versões absolutas podem silenciar povos, testemunhas ou dissidências; essa possibilidade não deve ser confundida com fato consumado.`, firstText(item.politicalImpact, item.risks, item.heresies, item.disputedClaims) ? 'disputed' : 'unrecorded'),
    ],
    creature: [
      claim('editorial-creature-observation', 'Observação antes do medo', firstText(item.habitat, item.habits, item.sections) ? sentence(firstText(item.habitat, item.habits, item.sections), 310) : `Comportamento e habitat não foram observados de forma contínua. O grau de ameaça não substitui descrição naturalista.`, firstText(item.habitat, item.habits, item.sections) ? status : 'unknown'),
      claim('editorial-creature-risk', 'Risco situado', firstText(item.threat, item.powers, item.limitations) ? sentence(firstText(item.threat, item.powers, item.limitations), 300) : `Não há medida comparável de risco. Encontros isolados não autorizam atribuir hostilidade constante à espécie ou categoria.`, firstText(item.threat, item.powers, item.limitations) ? status : 'unknown'),
      claim('editorial-creature-encounter', 'Encontro e testemunho', firstText(item.events, item.detailedTimeline, item.historicalSources) ? sentence(firstText(item.events, item.detailedTimeline, item.historicalSources), 310) : `Relatos de encontro carecem de cronologia ou fonte independente; permanecem desconhecidos ou baseados em rumor.`, firstText(item.events, item.detailedTimeline, item.historicalSources) ? status : 'rumor'),
      claim('editorial-creature-culture', 'O monstro de cada narrador', firstText(item.culturalReadings, item.rumors, item.disputedClaims) ? sentence(firstText(item.culturalReadings, item.rumors, item.disputedClaims), 310) : `A forma como diferentes povos nomeiam esta criatura ainda não foi registrada. Nomear não basta para conhecer anatomia, intenção ou origem.`, firstText(item.culturalReadings, item.rumors, item.disputedClaims) ? 'disputed' : 'unrecorded'),
    ],
    library: [
      claim('editorial-library-form', 'O objeto livro', firstText(item.materials, item.preservation, item.imageBrief) ? sentence(firstText(item.materials, item.preservation, item.imageBrief), 310) : `Suporte, encadernação, estado físico e número de cópias não estão integralmente registrados. Conteúdo semelhante não comprova que dois exemplares sejam a mesma testemunha.`, firstText(item.materials, item.preservation, item.imageBrief) ? status : 'unrecorded'),
      claim('editorial-library-copy', 'Cópia, edição e autoridade', firstText(item.provenance, item.creator, item.custodians) ? sentence(firstText(item.provenance, item.creator, item.custodians), 310) : `Autoria e cadeia de cópias não são completas. O Arquivo distingue voz do autor, intervenção de copista e comentário posterior sempre que possível.`, firstText(item.provenance, item.creator, item.custodians) ? status : 'lost'),
      claim('editorial-library-reader', 'Leitores e consequências', firstText(item.culturalReadings, item.politicalImpact, item.narrativeImportance) ? sentence(firstText(item.culturalReadings, item.politicalImpact, item.narrativeImportance), 310) : `Os públicos, usos e efeitos deste volume não foram documentados de maneira suficiente.`, firstText(item.culturalReadings, item.politicalImpact, item.narrativeImportance) ? status : 'unrecorded'),
      claim('editorial-library-silence', 'O que a página não preserva', gaps.length ? sentence(gaps[0], 310) : `Ausências, rasuras e versões não localizadas permanecem abertas; nenhuma edição pública deve fingir completude.`, gaps.length ? status : 'lost'),
    ],
  }
  return [...shared, ...(domainNotes[domain] ?? [])]
}

export function buildRecordVolumes(item, catalogKey) {
  const domain = domainByCatalog[catalogKey] ?? 'belief'
  const consumed = new Set()
  const volumes = plans[domain].map(([title, fields]) => {
    const entries = uniqueEntries(fields
      .filter((field) => hasRecordValue(item[field]))
      .map((field) => ({ field, label: fieldLabels[field] ?? field, value: item[field] })))
      .slice(0, 5)
    entries.forEach(({ field }) => consumed.add(field))
    return { title, entries, lead: compactLead(item, entries) }
  }).filter(({ entries }) => entries.length > 0)

  const fallback = Object.entries(item)
    .filter(([field, value]) => !ignoredFallbackFields.has(field) && !consumed.has(field) && hasRecordValue(value))
    .map(([field, value]) => ({ field, label: fieldLabels[field] ?? field, value }))

  let supplement = 1
  while (volumes.length < 5 && fallback.length) {
    const entries = fallback.splice(0, 4)
    volumes.push({ title: `Caderno complementar ${supplement}`, entries, lead: compactLead(item, entries) })
    supplement += 1
  }


  const notes = buildEditorialNotes(item, catalogKey, domain)
  while (volumes.length < 5) volumes.push({ title: `Caderno complementar ${supplement++}`, entries: [], lead: '' })
  notes.forEach((note, index) => volumes[index % volumes.length].entries.push(note))

  const spare = fallback.filter(({ field }) => !volumes.some(({ entries }) => entries.some((entry) => entry.field === field)))
  let cursor = 0
  while (volumes.reduce((total, volume) => total + volume.entries.length, 0) < 15 && spare.length) {
    volumes[cursor % volumes.length].entries.push(spare.shift())
    cursor += 1
  }

  return volumes.map((volume, index) => ({ ...volume, lead: volume.lead || compactLead(item, volume.entries), number: index + 1 }))
}

export function recordDepth(item, catalogKey) {
  const volumes = buildRecordVolumes(item, catalogKey)
  return {
    volumes: volumes.length,
    entries: volumes.reduce((total, volume) => total + volume.entries.length, 0),
    sources: [...(item.references ?? []), ...(item.historicalSources ?? [])].length,
    relations: item.relations?.length ?? 0,
  }
}
