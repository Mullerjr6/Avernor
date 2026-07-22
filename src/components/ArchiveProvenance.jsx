import { canonStatuses, truthFor } from '../content/taxonomies'

const knowledgeLabels = {
  public: 'Conhecimento público',
  documented: 'Conhecimento documentado',
  unknown: 'Desconhecido',
  lost: 'Registro perdido',
  disputed: 'Conhecimento contestado',
  secret: 'Registro restrito',
  unrecorded: 'Não registrado',
  authorOnly: 'Conhecido apenas pelo autor',
  rumor: 'Baseado em rumor',
  peopleOnly: 'Conhecido por um povo específico',
  'people-only': 'Conhecido por um povo específico',
  pública: 'Conhecimento público',
  secreta: 'Registro restrito',
  'baseada em rumor': 'Baseado em rumor',
  'não registrada': 'Não registrado',
  'conhecida apenas por determinado povo': 'Conhecido por um povo específico',
}

function textFromSource(source) {
  if (typeof source === 'string') return source
  return source?.label ?? source?.title ?? source?.name ?? source?.source ?? source?.description ?? ''
}

export default function ArchiveProvenance({ item }) {
  const truth = truthFor(item.truthStatus)
  const knowledgeCode = item.knowledgeStatus ?? 'public'
  const sources = [...(item.references ?? []), ...(item.historicalSources ?? [])]
    .map(textFromSource)
    .filter(Boolean)
    .filter((source, index, values) => values.indexOf(source) === index)
  const gaps = [
    ...(item.archiveGaps ?? []),
    ...(item.unknownFacts ?? []),
    ...(item.unconfirmed ?? []),
  ]

  return (
    <aside id="fontes-e-lacunas" className="archive-provenance" aria-labelledby="archive-provenance-title">
      <header>
        <span aria-hidden="true">A.R.</span>
        <div>
          <p>Controle do registro</p>
          <h2 id="archive-provenance-title">Autoridade, fontes e lacunas</h2>
        </div>
      </header>
      <dl className="archive-provenance-grid">
        <div><dt>Estatuto histórico</dt><dd>{truth.label}</dd></div>
        <div><dt>Estatuto canônico</dt><dd>{canonStatuses[item.canonStatus] ?? canonStatuses.canon}</dd></div>
        <div><dt>Circulação</dt><dd>{knowledgeLabels[knowledgeCode] ?? item.knowledgeStatus ?? knowledgeLabels.public}</dd></div>
        <div><dt>Confiabilidade</dt><dd>{item.sourceReliability ?? item.reliability ?? truth.description}</dd></div>
      </dl>
      {item.knownBy && <p className="archive-known-by"><strong>Conhecido por:</strong> {Array.isArray(item.knownBy) ? item.knownBy.join(', ') : item.knownBy}</p>}
      {sources.length > 0 && <div className="archive-source-list"><h3>Fontes públicas citadas</h3><ul>{sources.slice(0, 8).map((source) => <li key={source}>{source}</li>)}</ul></div>}
      {gaps.length > 0 && <div className="archive-gap-list"><h3>Lacunas declaradas</h3><ul>{gaps.map((gap) => <li key={typeof gap === 'string' ? gap : JSON.stringify(gap)}>{typeof gap === 'string' ? gap : gap.label ?? gap.description ?? gap.note}</li>)}</ul></div>}
      <p className="archive-provenance-note">Ausência de registro não equivale a inexistência. Rumores e versões culturais permanecem identificados como tais.</p>
    </aside>
  )
}
