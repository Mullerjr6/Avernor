import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import TruthBadge from './TruthBadge'

export const FamilyTree = forwardRef(function FamilyTree({ name, children, ...props }, ref) {
  return <div ref={ref} className="genealogy-viewport" role="tree" aria-label={`Árvore: ${name}`} tabIndex="0" {...props}>{children}</div>
})

export function FamilyTreeNode({ person, generation, lifeState, successionRole, selected, highlighted, hasChildren, collapsed, onSelect, onKeyDown, onToggle, textMode = false, buttonRef }) {
  const roleClass = successionRole?.includes('herdeiro') ? 'heir' : successionRole === 'governante' ? 'ruler' : successionRole === 'pretendente' ? 'pretender' : successionRole === 'excluído' ? 'excluded' : 'member'
  return <article className={`genealogy-node life-${lifeState} role-${roleClass} ${highlighted ? 'is-path' : ''} ${selected ? 'is-selected' : ''}`} role={textMode ? 'listitem' : 'treeitem'} aria-level={generation + 1}>
    <button ref={buttonRef} type="button" className="genealogy-node-main" onClick={onSelect} onKeyDown={onKeyDown}>
      <span>Geração {generation + 1}{successionRole ? ` · ${successionRole}` : ''}</span><strong>{person.name}</strong>{person.title && <small className="genealogy-node-title">{person.title}</small>}<small>{person.life}</small><em>{person.status} · {person.people}</em>
    </button>
    <div className="genealogy-node-actions">
      {hasChildren && <button type="button" onClick={onToggle} aria-expanded={!collapsed}>{collapsed ? 'Expandir ramo' : 'Recolher ramo'}</button>}
      {person.profile && <Link to={person.profile}>Perfil</Link>}
    </div>
  </article>
}

export function FamilyRelationshipEdge({ edge, from, to, highlighted }) {
  const points = edge.type === 'partner'
    ? { x1: from.x + 210, y1: from.y + 48, x2: to.x, y2: to.y + 48 }
    : { x1: from.x + 105, y1: from.y + 96, x2: to.x + 105, y2: to.y }
  return <line {...points} className={`edge-${edge.type} edge-${edge.status} ${highlighted ? 'is-path' : ''}`} />
}

export function FamilyTreeControls({ children }) {
  return <div className="genealogy-controls" aria-label="Controles da genealogia">{children}</div>
}

export function RelationshipLegend() {
  return <div className="genealogy-legend"><strong>Relações</strong><span><i className="legend-parent" />Descendência</span><span><i className="legend-adopted" />Adoção</span><span><i className="legend-partner" />Casamento ou união</span><span><i className="legend-guardian" />Tutela ou juramento</span><span><i className="legend-disputed" />Contestado</span><span><i className="legend-path" />Caminho calculado</span><span><i className="legend-hidden" />Desconhecido ou reservado</span><strong>Condição</strong><span><b className="legend-life living" />Vivo</span><span><b className="legend-life dead" />Morto</span><span><b className="legend-life missing" />Desaparecido</span><span><b className="legend-life unknown" />Destino desconhecido</span></div>
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

export function GenealogyTextView({ children }) {
  return <div className="genealogy-text-view" role="list">{children}</div>
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
