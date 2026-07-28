import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import TruthBadge from './TruthBadge'

const comparisonModes = {
  religioes: { title: 'Comparador de crenças', field: 'beliefs', empty: 'Princípios não registrados' },
  mitologia: { title: 'Comparador de relatos', field: 'beliefs', empty: 'Elementos do relato não registrados' },
  profecias: { title: 'Comparador de relatos', field: 'disputedClaims', empty: 'Contestação não registrada' },
}

export default function ContentComparator({ catalogKey, catalog, items }) {
  const config = comparisonModes[catalogKey]
  const eligible = useMemo(() => items.length > 1 ? items : catalog.items, [catalog.items, items])
  const [leftId, setLeftId] = useState(eligible[0]?.id ?? '')
  const [rightId, setRightId] = useState(eligible[1]?.id ?? eligible[0]?.id ?? '')

  if (!config || eligible.length < 2) return null
  const left = eligible.find(({ id }) => id === leftId) ?? eligible[0]
  const right = eligible.find(({ id }) => id === rightId) ?? eligible[1]

  const panel = (item) => {
    const points = item[config.field]?.length ? item[config.field] : [config.empty]
    return <article className="comparison-panel" key={item.id}>
      <header><TruthBadge status={item.truthStatus} compact /><span>{item.category}</span><h3>{item.name}</h3><p>{item.summary}</p></header>
      <dl><div><dt>Origem</dt><dd>{item.origin || 'Não documentada'}</dd></div><div><dt>Situação</dt><dd>{item.status}</dd></div></dl>
      <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
      <Link className="text-link" to={`${catalog.path}/${item.slug}`}>Abrir registro completo</Link>
    </article>
  }

  return <section className="content-comparator" aria-labelledby={`${catalogKey}-comparator-title`}>
    <div className="comparison-heading"><div><span className="kicker">Leitura lado a lado</span><h2 id={`${catalogKey}-comparator-title`}>{config.title}</h2></div><p>Compare a classificação documental, a origem e os pontos centrais sem transformar crença em fato histórico.</p></div>
    <div className="comparison-selectors">
      <label><span>Primeiro registro</span><select value={left.id} onChange={(event) => setLeftId(event.target.value)}>{eligible.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label><span>Segundo registro</span><select value={right.id} onChange={(event) => setRightId(event.target.value)}>{eligible.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
    </div>
    <div className="comparison-grid">{panel(left)}{panel(right)}</div>
  </section>
}
