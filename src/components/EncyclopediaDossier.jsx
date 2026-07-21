const fieldLabels = {
  formerNames: 'Nomes antigos', aliases: 'Apelidos', titles: 'Títulos', epithets: 'Epítetos', birthDate: 'Nascimento', apparentAge: 'Idade aparente', birthPlace: 'Local de nascimento', currentLocation: 'Localização atual',
  personality: 'Personalidade', qualities: 'Qualidades', flaws: 'Defeitos', fears: 'Medos', desires: 'Desejos', objectives: 'Objetivos', values: 'Valores', moralLimits: 'Limites morais', beliefs: 'Crenças', speech: 'Maneira de falar', habits: 'Hábitos',
  attire: 'Vestimentas', weapons: 'Armas', equipment: 'Equipamentos', relics: 'Relíquias', abilities: 'Habilidades', powers: 'Poderes', limitations: 'Limitações', weaknesses: 'Fraquezas', knowledge: 'Conhecimento', physicalCondition: 'Condição física', emotionalCondition: 'Condição emocional',
  family: 'Familiares', allies: 'Aliados', enemies: 'Inimigos', warParticipation: 'Guerras', eraParticipation: 'Eras históricas', politicalPosition: 'Posição política', publicReputation: 'Reputação pública', culturalViews: 'Visão de outros povos', knownDestiny: 'Destino conhecido', legacy: 'Legado', publicSecrets: 'Informações públicas sensíveis', historicalSources: 'Fontes históricas', disputedClaims: 'Informações contestadas',
  foundation: 'Fundação', climate: 'Clima', geography: 'Geografia', population: 'População', government: 'Governo', succession: 'Sucessão', economy: 'Economia', religion: 'Religião', architecture: 'Arquitetura', culture: 'Cultura', customs: 'Costumes', festivals: 'Festividades', cuisine: 'Culinária', alliesPolitical: 'Aliados políticos', rivalsPolitical: 'Rivais', importantCharacters: 'Pessoas importantes', relevantPlaces: 'Locais relevantes', currentSituation: 'Situação atual', rumors: 'Rumores', narrativeImportance: 'Importância narrativa',
  background: 'Antecedentes', trigger: 'Estopim', commanders: 'Comandantes', armies: 'Exércitos', alliances: 'Alianças', strategies: 'Estratégias', mainBattles: 'Batalhas principais', losses: 'Perdas', territorialChanges: 'Mudanças territoriais', politicalImpact: 'Impacto político', economicImpact: 'Impacto econômico', culturalImpact: 'Impacto cultural', historicalAccounts: 'Relatos históricos', secretEventsStatus: 'Acontecimentos secretos',
  beginning: 'Início', startingEvent: 'Marco inicial', politicalContext: 'Contexto político', peoplesSituation: 'Situação dos povos', magicSituation: 'Situação da magia', rulers: 'Governantes', discoveries: 'Descobertas', migrations: 'Migrações', crises: 'Crises', religiousChanges: 'Mudanças religiosas', culturalChanges: 'Mudanças culturais', naturalEvents: 'Acontecimentos naturais', historicalFigures: 'Personagens históricos', endingEvent: 'Encerramento', transition: 'Transição para a era seguinte',
  originMyth: 'Mito de origem', creationView: 'Visão da criação', deathView: 'Visão da morte', magicView: 'Visão da magia', symbols: 'Símbolos', rituals: 'Ritos', sacredDates: 'Datas sagradas', clergy: 'Oficiantes', sacredPlaces: 'Locais sagrados', ancientTexts: 'Textos antigos', heresies: 'Heresias', regionalDifferences: 'Diferenças regionais', contradictions: 'Contradições', modernInterpretations: 'Interpretações modernas', possiblyTrue: 'Possivelmente verdadeiro', unconfirmed: 'Não confirmado',
  ancientNames: 'Nomes antigos', creator: 'Criador', materials: 'Materiais', inscriptions: 'Inscrições', costs: 'Custos', formerBearers: 'Antigos portadores', currentBearer: 'Portador atual', activation: 'Formas de ativação', destruction: 'Formas de destruição', risks: 'Riscos',
}

const dossierGroups = [
  ['Identidade e trajetória', ['formerNames', 'aliases', 'titles', 'epithets', 'birthDate', 'apparentAge', 'birthPlace', 'currentLocation']],
  ['Temperamento e escolhas', ['personality', 'qualities', 'flaws', 'fears', 'desires', 'objectives', 'values', 'moralLimits', 'beliefs', 'speech', 'habits']],
  ['Capacidades e condição', ['attire', 'weapons', 'equipment', 'relics', 'abilities', 'powers', 'limitations', 'weaknesses', 'knowledge', 'physicalCondition', 'emotionalCondition']],
  ['Relações, posição e memória', ['family', 'allies', 'enemies', 'warParticipation', 'eraParticipation', 'politicalPosition', 'publicReputation', 'culturalViews', 'knownDestiny', 'legacy', 'publicSecrets', 'historicalSources', 'disputedClaims']],
  ['Território e sociedade', ['foundation', 'climate', 'geography', 'population', 'government', 'succession', 'economy', 'religion', 'architecture', 'culture', 'customs', 'festivals', 'cuisine', 'alliesPolitical', 'rivalsPolitical', 'importantCharacters', 'relevantPlaces', 'currentSituation', 'rumors', 'narrativeImportance']],
  ['Anatomia do conflito', ['background', 'trigger', 'commanders', 'armies', 'alliances', 'strategies', 'mainBattles', 'losses', 'territorialChanges', 'politicalImpact', 'economicImpact', 'culturalImpact', 'historicalAccounts', 'secretEventsStatus']],
  ['Retrato da era', ['beginning', 'startingEvent', 'politicalContext', 'peoplesSituation', 'magicSituation', 'rulers', 'discoveries', 'migrations', 'crises', 'religiousChanges', 'culturalChanges', 'naturalEvents', 'historicalFigures', 'endingEvent', 'transition']],
  ['Doutrina e prática', ['originMyth', 'creationView', 'deathView', 'magicView', 'symbols', 'rituals', 'sacredDates', 'clergy', 'sacredPlaces', 'ancientTexts', 'heresies', 'regionalDifferences', 'contradictions', 'modernInterpretations', 'possiblyTrue', 'unconfirmed']],
  ['Construção, uso e risco', ['ancientNames', 'creator', 'materials', 'inscriptions', 'costs', 'formerBearers', 'currentBearer', 'activation', 'destruction', 'risks']],
]

const hasValue = (value) => Array.isArray(value) ? value.length > 0 : Boolean(value)

function FieldValue({ value }) {
  if (Array.isArray(value)) return <ul>{value.map((entry) => <li key={typeof entry === 'string' ? entry : JSON.stringify(entry)}>{typeof entry === 'string' ? entry : entry.label ?? entry.name ?? JSON.stringify(entry)}</li>)}</ul>
  return <p>{value}</p>
}

export default function EncyclopediaDossier({ item }) {
  const groups = dossierGroups.map(([title, fields]) => [title, fields.filter((field) => hasValue(item[field]))]).filter(([, fields]) => fields.length)
  return <>
    {item.biography?.length > 0 && <section className="narrative-chapters"><span className="section-number">✦</span><h2>{item.biographyTitle ?? 'Biografia e percurso'}</h2>{item.biography.map((chapter) => <article key={chapter.title}><header><h3>{chapter.title}</h3>{chapter.period && <span>{chapter.period}</span>}</header><p>{chapter.body}</p></article>)}</section>}
    {item.detailedTimeline?.length > 0 && <section className="record-timeline"><span className="section-number">⌛</span><h2>Linha do tempo documentada</h2><ol>{item.detailedTimeline.map((entry) => <li key={`${entry.date ?? entry.year}-${entry.title ?? entry.event}`}><time>{entry.date ?? entry.year ?? 'Data não registrada'}</time><div><strong>{entry.title ?? entry.event}</strong>{entry.description && <p>{entry.description}</p>}</div></li>)}</ol></section>}
    {groups.map(([title, fields]) => <section className="dossier-group" key={title}><span className="section-number">◆</span><h2>{title}</h2><dl>{fields.map((field) => <div key={field}><dt>{fieldLabels[field]}</dt><dd><FieldValue value={item[field]} /></dd></div>)}</dl></section>)}
  </>
}
