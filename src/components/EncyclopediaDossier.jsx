const fieldLabels = {
  overview: 'Visão geral', narrativeRole: 'Papel narrativo', motivations: 'Motivações', innerConflict: 'Conflito interno', relationshipDynamics: 'Dinâmicas de relação', disputedAbilities: 'Capacidades contestadas', relatedContent: 'Conteúdo relacionado',
  formerNames: 'Nomes antigos', aliases: 'Apelidos', titles: 'Títulos', epithets: 'Epítetos', birthDate: 'Nascimento', apparentAge: 'Idade aparente', birthPlace: 'Local de nascimento', currentLocation: 'Localização atual',
  personality: 'Personalidade', qualities: 'Qualidades', flaws: 'Defeitos', fears: 'Medos', desires: 'Desejos', objectives: 'Objetivos', values: 'Valores', moralLimits: 'Limites morais', beliefs: 'Crenças', speech: 'Maneira de falar', habits: 'Hábitos',
  attire: 'Vestimentas', weapons: 'Armas', equipment: 'Equipamentos', relics: 'Relíquias', abilities: 'Habilidades', powers: 'Poderes', limitations: 'Limitações', weaknesses: 'Fraquezas', knowledge: 'Conhecimento', physicalCondition: 'Condição física', emotionalCondition: 'Condição emocional',
  family: 'Familiares', allies: 'Aliados', enemies: 'Inimigos', warParticipation: 'Guerras', eraParticipation: 'Eras históricas', politicalPosition: 'Posição política', publicReputation: 'Reputação pública', culturalViews: 'Visão de outros povos', knownDestiny: 'Destino conhecido', legacy: 'Legado', publicSecrets: 'Informações públicas sensíveis', historicalSources: 'Fontes históricas', disputedClaims: 'Informações contestadas',
  foundation: 'Fundação', climate: 'Clima', geography: 'Geografia', population: 'População', government: 'Governo', succession: 'Sucessão', economy: 'Economia', religion: 'Religião', architecture: 'Arquitetura', culture: 'Cultura', customs: 'Costumes', festivals: 'Festividades', cuisine: 'Culinária', alliesPolitical: 'Aliados políticos', rivalsPolitical: 'Rivais', importantCharacters: 'Pessoas importantes', relevantPlaces: 'Locais relevantes', currentSituation: 'Situação atual', rumors: 'Rumores', narrativeImportance: 'Importância narrativa',
  background: 'Antecedentes', trigger: 'Estopim', commanders: 'Comandantes', armies: 'Exércitos', alliances: 'Alianças', strategies: 'Estratégias', mainBattles: 'Batalhas principais', losses: 'Perdas', territorialChanges: 'Mudanças territoriais', politicalImpact: 'Impacto político', economicImpact: 'Impacto econômico', culturalImpact: 'Impacto cultural', historicalAccounts: 'Relatos históricos', secretEventsStatus: 'Acontecimentos secretos',
  beginning: 'Início', startingEvent: 'Marco inicial', politicalContext: 'Contexto político', peoplesSituation: 'Situação dos povos', magicSituation: 'Situação da magia', rulers: 'Governantes', discoveries: 'Descobertas', migrations: 'Migrações', crises: 'Crises', religiousChanges: 'Mudanças religiosas', culturalChanges: 'Mudanças culturais', naturalEvents: 'Acontecimentos naturais', historicalFigures: 'Personagens históricos', endingEvent: 'Encerramento', transition: 'Transição para a era seguinte',
  originMyth: 'Mito de origem', creationView: 'Visão da criação', deathView: 'Visão da morte', magicView: 'Visão da magia', symbols: 'Símbolos', rituals: 'Ritos', sacredDates: 'Datas sagradas', clergy: 'Oficiantes', sacredPlaces: 'Locais sagrados', ancientTexts: 'Textos antigos', heresies: 'Heresias', regionalDifferences: 'Diferenças regionais', contradictions: 'Contradições', modernInterpretations: 'Interpretações modernas', possiblyTrue: 'Possivelmente verdadeiro', unconfirmed: 'Não confirmado',
  ancientNames: 'Nomes antigos', creator: 'Criador', materials: 'Materiais', inscriptions: 'Inscrições', costs: 'Custos', formerBearers: 'Antigos portadores', currentBearer: 'Portador atual', activation: 'Formas de ativação', destruction: 'Formas de destruição', risks: 'Riscos',
  knowledgeStatus: 'Circulação do conhecimento', knownBy: 'Conhecido por', sourceReliability: 'Confiabilidade das fontes', archiveGaps: 'Lacunas do arquivo', unknownFacts: 'Informações desconhecidas', evidence: 'Evidências preservadas', interpretations: 'Interpretações registradas', oralTraditions: 'Tradições orais', custodians: 'Custódios do registro', preservation: 'Estado de preservação',
}

const dossierGroups = [
  ['Papel, motivações e tensões', ['overview', 'narrativeRole', 'motivations', 'innerConflict', 'relationshipDynamics', 'disputedAbilities', 'relatedContent']],
  ['Identidade e trajetória', ['formerNames', 'aliases', 'titles', 'epithets', 'birthDate', 'apparentAge', 'birthPlace', 'currentLocation']],
  ['Temperamento e escolhas', ['personality', 'qualities', 'flaws', 'fears', 'desires', 'objectives', 'values', 'moralLimits', 'beliefs', 'speech', 'habits']],
  ['Capacidades e condição', ['attire', 'weapons', 'equipment', 'relics', 'abilities', 'powers', 'limitations', 'weaknesses', 'knowledge', 'physicalCondition', 'emotionalCondition']],
  ['Relações, posição e memória', ['family', 'allies', 'enemies', 'warParticipation', 'eraParticipation', 'politicalPosition', 'publicReputation', 'culturalViews', 'knownDestiny', 'legacy', 'publicSecrets', 'historicalSources', 'disputedClaims']],
  ['Território e sociedade', ['foundation', 'climate', 'geography', 'population', 'government', 'succession', 'economy', 'religion', 'architecture', 'culture', 'customs', 'festivals', 'cuisine', 'alliesPolitical', 'rivalsPolitical', 'importantCharacters', 'relevantPlaces', 'currentSituation', 'rumors', 'narrativeImportance']],
  ['Anatomia do conflito', ['background', 'trigger', 'commanders', 'armies', 'alliances', 'strategies', 'mainBattles', 'losses', 'territorialChanges', 'politicalImpact', 'economicImpact', 'culturalImpact', 'historicalAccounts', 'secretEventsStatus']],
  ['Retrato da era', ['beginning', 'startingEvent', 'politicalContext', 'peoplesSituation', 'magicSituation', 'rulers', 'discoveries', 'migrations', 'crises', 'religiousChanges', 'culturalChanges', 'naturalEvents', 'historicalFigures', 'endingEvent', 'transition']],
  ['Doutrina e prática', ['originMyth', 'creationView', 'deathView', 'magicView', 'symbols', 'rituals', 'sacredDates', 'clergy', 'sacredPlaces', 'ancientTexts', 'heresies', 'regionalDifferences', 'contradictions', 'modernInterpretations', 'possiblyTrue', 'unconfirmed']],
  ['Construção, uso e risco', ['ancientNames', 'creator', 'materials', 'inscriptions', 'costs', 'formerBearers', 'currentBearer', 'activation', 'destruction', 'risks']],
  ['Autoridade e transmissão do registro', ['knowledgeStatus', 'knownBy', 'sourceReliability', 'archiveGaps', 'unknownFacts', 'evidence', 'interpretations', 'oralTraditions', 'custodians', 'preservation']],
]

const hasValue = (value) => Array.isArray(value) ? value.length > 0 : Boolean(value)

const claimStatusLabels = {
  unknown: 'Desconhecida', lost: 'Perdida', disputed: 'Contestada', secret: 'Secreta',
  unrecorded: 'Não registrada', authorOnly: 'Conhecida apenas pelo autor', rumor: 'Baseada em rumor',
  peopleOnly: 'Conhecida apenas por determinado povo', documented: 'Documentada', witnessed: 'Testemunhada',
}

function StructuredValue({ value }) {
  const primary = value.label ?? value.name ?? value.title ?? value.claim ?? value.event ?? value.value
  const detail = value.description ?? value.body ?? value.note ?? value.context
  const status = value.knowledgeStatus ?? value.truthStatus ?? value.statusCode
  const source = value.source ?? value.recordedBy
  if (primary || detail) return <div className="structured-claim">
    {primary && <strong>{primary}</strong>}
    {status && <small className={`claim-status claim-${status}`}>{claimStatusLabels[status] ?? status}</small>}
    {detail && <p>{detail}</p>}
    {source && <cite>Fonte: {source}</cite>}
  </div>
  return <dl className="nested-record">{Object.entries(value).filter(([, entry]) => hasValue(entry)).map(([key, entry]) => <div key={key}><dt>{fieldLabels[key] ?? key}</dt><dd><FieldValue value={entry} /></dd></div>)}</dl>
}

export function FieldValue({ value }) {
  if (Array.isArray(value)) return <ul>{value.map((entry, index) => <li key={typeof entry === 'string' ? entry : `${entry.id ?? entry.label ?? entry.name ?? 'entry'}-${index}`}>{typeof entry === 'object' && entry !== null ? <StructuredValue value={entry} /> : String(entry)}</li>)}</ul>
  if (value && typeof value === 'object') return <StructuredValue value={value} />
  return <p>{String(value)}</p>
}

export default function EncyclopediaDossier({ item }) {
  const groups = dossierGroups.map(([title, fields]) => [title, fields.filter((field) => hasValue(item[field]))]).filter(([, fields]) => fields.length)
  return <>
    {item.biography?.length > 0 && <section id="biografia-e-percurso" className="narrative-chapters"><span className="section-number">✦</span><h2>{item.biographyTitle ?? 'Biografia e percurso'}</h2>{item.biography.map((chapter) => <article key={chapter.title}><header><h3>{chapter.title}</h3>{chapter.period && <span>{chapter.period}</span>}</header><p>{chapter.body}</p></article>)}</section>}
    {item.detailedTimeline?.length > 0 && <section id="linha-do-tempo" className="record-timeline"><span className="section-number">⌛</span><h2>Linha do tempo documentada</h2><ol>{item.detailedTimeline.map((entry) => <li key={`${entry.date ?? entry.year}-${entry.title ?? entry.event}`}><time>{entry.date ?? entry.year ?? 'Data não registrada'}</time><div><strong>{entry.title ?? entry.event}</strong>{entry.description && <p>{entry.description}</p>}</div></li>)}</ol></section>}
    {groups.map(([title, fields]) => <section className="dossier-group" key={title}><span className="section-number">◆</span><h2>{title}</h2><dl>{fields.map((field) => <div key={field}><dt>{fieldLabels[field]}</dt><dd><FieldValue value={item[field]} /></dd></div>)}</dl></section>)}
  </>
}
