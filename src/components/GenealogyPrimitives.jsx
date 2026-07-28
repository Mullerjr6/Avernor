import { forwardRef } from 'react'
import { Link } from 'react-router'
import ImageWithFallback from './ImageWithFallback'
import TruthBadge from './TruthBadge'

const relationshipLabels = {
  parent: 'Descendência documentada',
  adopted: 'Adoção',
  illegitimate: 'Descendência não reconhecida',
  partner: 'Casamento ou união',
  'political-marriage': 'Casamento político',
  unofficial: 'União não oficial',
  'annulled-union': 'União anulada',
  guardian: 'Tutela',
  oath: 'Juramento',
  spiritual: 'Parentesco espiritual',
  contested: 'Vínculo contestado',
  unconfirmed: 'Parentesco não confirmado',
  office: 'Transmissão de ofício',
  'master-apprentice': 'Mestre e aprendiz',
  succession: 'Sucessão sem parentesco',
  'broken-branch': 'Ramo interrompido ou perdido',
  custody: 'Transmissão de custódia',
}

export const FamilyTree = forwardRef(function FamilyTree({ name, children, ...props }, ref) {
  return <div ref={ref} className="genealogy-viewport" role="tree" aria-label={`Árvore genealógica: ${name}`} tabIndex="0" {...props}>{children}</div>
})

export function HeraldicPortrait({ person, symbol, image, compact = false }) {
  const contextualGroup = person.branch || person.house || person.people
  const label = person.portraitFallback && !person.portraitFallback.startsWith('heraldic-') ? person.portraitFallback : `Selo heráldico contextual de ${contextualGroup}; retrato individual não preservado`
  if (image) return <ImageWithFallback className="genealogy-portrait-image" src={image} alt={`Retrato de arquivo de ${person.name}`} fallback="character" />
  return <div className={`genealogy-heraldic-portrait ${compact ? 'is-compact' : ''}`} role="img" aria-label={label} title={label}>
    <span aria-hidden="true">{symbol || person.name.slice(0, 1)}</span>
    <small>{person.branch || person.house || person.people}</small>
  </div>
}

export function FamilyTreeNode({ person, generation, lifeState, successionRole, selected, highlighted, hasChildren, collapsed, onSelect, onKeyDown, onToggle, textMode = false, buttonRef, portrait, symbol, tabIndex = -1 }) {
  const roleClass = successionRole?.includes('herdeiro') ? 'heir' : successionRole === 'governante' ? 'ruler' : successionRole === 'pretendente' ? 'pretender' : successionRole === 'excluído' ? 'excluded' : 'member'
  const knowledge = person.knowledgeStatus || person.truthStatus || 'documented'
  const expanded = hasChildren ? !collapsed : undefined
  return <article className={`genealogy-node life-${lifeState} role-${roleClass} knowledge-${knowledge} ${highlighted ? 'is-path' : ''} ${selected ? 'is-selected' : ''}`} role={textMode ? 'listitem' : 'none'}>
    <button ref={buttonRef} role={textMode ? undefined : 'treeitem'} aria-level={textMode ? undefined : generation + 1} aria-selected={textMode ? undefined : selected} aria-expanded={textMode ? undefined : expanded} tabIndex={textMode ? 0 : tabIndex} type="button" className="genealogy-node-main" onClick={onSelect} onKeyDown={onKeyDown}>
      <HeraldicPortrait person={person} symbol={symbol} image={portrait} compact />
      <span className="genealogy-node-copy">
        <small className="genealogy-node-eyebrow">Geração {generation + 1}{successionRole ? ` · ${successionRole}` : ''}</small>
        <strong>{person.name}</strong>
        <small className="genealogy-node-title">{person.title || person.titles?.[0] || person.role || 'Papel não registrado'}</small>
        <small className="genealogy-node-life">{person.life}</small>
      </span>
      <span className="genealogy-node-status"><i className={`genealogy-life-dot is-${lifeState}`} aria-hidden="true" />{person.status}</span>
      {person.summary && <span className="genealogy-node-summary">{person.summary}</span>}
    </button>
    <div className="genealogy-node-actions">
      {hasChildren && <button type="button" onClick={onToggle} aria-expanded={!collapsed}>{collapsed ? 'Expandir ramo' : 'Recolher ramo'}</button>}
      {person.profile && <Link to={person.profile}>Perfil completo</Link>}
    </div>
  </article>
}

export function FamilyRelationshipEdge({ edge, from, to, highlighted, nodeWidth = 264, nodeHeight = 176 }) {
  if (!from || !to) return null
  const horizontal = ['partner', 'political-marriage', 'unofficial', 'annulled-union', 'spiritual', 'oath', 'contested', 'unconfirmed'].includes(edge.type) && Math.abs(from.y - to.y) < nodeHeight
  let d
  if (horizontal) {
    const leftToRight = from.x <= to.x
    const x1 = leftToRight ? from.x + nodeWidth : from.x
    const x2 = leftToRight ? to.x : to.x + nodeWidth
    const y = Math.min(from.y, to.y) + nodeHeight * .46
    d = `M ${x1} ${y} H ${x2}`
  } else {
    const x1 = from.x + nodeWidth / 2
    const y1 = from.y + nodeHeight
    const x2 = to.x + nodeWidth / 2
    const y2 = to.y
    const middle = y1 + Math.max(24, (y2 - y1) / 2)
    d = `M ${x1} ${y1} V ${middle} H ${x2} V ${y2}`
  }
  const label = relationshipLabels[edge.type] || edge.type
  return <path d={d} className={`genealogy-edge edge-${edge.type} edge-${edge.status} ${highlighted ? 'is-path' : ''}`} aria-label={label} />
}

export function FamilyTreeControls({ children }) {
  return <div className="genealogy-controls" aria-label="Controles da genealogia">{children}</div>
}

export function GenealogyMiniMap({ positions, edges, canvasWidth, canvasHeight, visibleSet, viewport, pan, zoom, onNavigate }) {
  const viewWidth = viewport.width / zoom
  const viewHeight = viewport.height / zoom
  const viewX = Math.max(0, -pan.x / zoom)
  const viewY = Math.max(0, -pan.y / zoom)
  return <button type="button" className="genealogy-minimap" aria-label="Minimapa da árvore; clique para navegar" onClick={(event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const keyboardActivation = event.detail === 0
    onNavigate(keyboardActivation ? canvasWidth / 2 : ((event.clientX - bounds.left) / bounds.width) * canvasWidth, keyboardActivation ? canvasHeight / 2 : ((event.clientY - bounds.top) / bounds.height) * canvasHeight)
  }}>
    <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} preserveAspectRatio="none" aria-hidden="true">
      {edges.filter(({ from, to }) => visibleSet.has(from) && visibleSet.has(to)).map((edge) => {
        const a = positions.get(edge.from); const b = positions.get(edge.to)
        if (!a || !b) return null
        return <line key={`${edge.from}-${edge.to}-${edge.type}`} x1={a.x + 132} y1={a.y + 88} x2={b.x + 132} y2={b.y + 88} className={`mini-edge edge-${edge.type}`} />
      })}
      {[...visibleSet].map((id) => { const point = positions.get(id); return point ? <rect key={id} x={point.x} y={point.y} width="264" height="176" rx="8" /> : null })}
      <rect className="genealogy-minimap-window" x={viewX} y={viewY} width={viewWidth} height={viewHeight} />
    </svg>
  </button>
}

export function RelationshipLegend() {
  return <div className="genealogy-legend" aria-label="Legenda genealógica">
    <strong>Relações</strong>
    <span><i className="legend-parent" />Descendência</span><span><i className="legend-broken" />Ramo interrompido</span><span><i className="legend-adopted" />Adoção</span><span><i className="legend-partner" />União</span><span><i className="legend-political" />Casamento político</span><span><i className="legend-office" />Ofício/sucessão</span><span><i className="legend-apprentice" />Mestre–aprendiz</span><span><i className="legend-custody" />Custódia</span><span><i className="legend-guardian" />Tutela/juramento</span><span><i className="legend-disputed" />Contestado/não confirmado</span><span><i className="legend-path" />Caminho calculado</span>
    <strong>Registro</strong>
    <span><b className="legend-life living" />Vivo</span><span><b className="legend-life dead" />Morto</span><span><b className="legend-life missing" />Desaparecido</span><span><b className="legend-life unknown" />Desconhecido/perdido</span>
  </div>
}

export function KinshipPath({ children }) {
  return <div className="kinship-finder">{children}</div>
}

export function LineageTimeline({ events }) {
  return <ol className="lineage-timeline">{events.map((event) => <li key={event}>{event}</li>)}</ol>
}

export function DynastyProfile({ children }) {
  return <article className="content-section dynasty-profile">{children}</article>
}

export function SuccessionPanel({ id, children }) {
  return <article className="succession-panel" id={id}>{children}</article>
}

export function SuccessionOrder({ children }) {
  return <ol className="succession-order">{children}</ol>
}

export function GenealogyTextView({ children, resultCount }) {
  return <section className="genealogy-text-view" aria-label="Versão textual da genealogia"><p className="genealogy-text-count">{resultCount} {resultCount === 1 ? 'registro visível' : 'registros visíveis'}. Cada cartão informa geração, papel, datas, ramo e condição documental.</p><div role="list">{children}</div></section>
}

export function GenealogyStatusBadge({ status }) {
  return <TruthBadge status={status} />
}

export function HiddenRelativePlaceholder({ style, children }) {
  return <div className="genealogy-hidden-node" style={style}>{children ?? 'Ramo sem confirmação no arquivo público'}</div>
}

export function DisputedLineageNotice({ children }) {
  return <aside className="genealogy-disclaimer"><strong>Conhecimento público:</strong> {children}</aside>
}
