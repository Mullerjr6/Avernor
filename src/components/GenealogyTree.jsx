import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { characters } from '../content/characters'
import { genealogyPeopleById } from '../content/genealogies'
import { successions } from '../content/succession'
import ImageWithFallback from './ImageWithFallback'
import {
  FamilyRelationshipEdge,
  FamilyTree,
  FamilyTreeControls,
  FamilyTreeNode,
  GenealogyStatusBadge,
  GenealogyTextView,
  HiddenRelativePlaceholder,
  KinshipPath,
  RelationshipLegend,
} from './GenealogyPrimitives'

const formatYear = (year) => year == null ? 'presente' : year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`

function generationsFor(tree) {
  const generations = Object.fromEntries(tree.memberIds.map((id) => [id, 0]))
  const parentEdges = tree.relations.filter(({ type }) => ['parent', 'adopted', 'illegitimate'].includes(type))
  for (let pass = 0; pass < tree.memberIds.length; pass += 1) {
    let changed = false
    for (const edge of parentEdges) {
      const next = generations[edge.from] + 1
      if (next > generations[edge.to]) { generations[edge.to] = next; changed = true }
    }
    if (!changed) break
  }
  return generations
}

const lifeStateFor = ({ status = '' }) => {
  const normalized = status.toLocaleLowerCase('pt-BR')
  if (normalized.includes('desaparec')) return 'missing'
  if (normalized.includes('mort')) return 'dead'
  if (normalized.includes('viv')) return 'living'
  return 'unknown'
}

const profileByPath = Object.fromEntries(characters.map((character) => [`/personagens/${character.slug}`, character]))

function kinshipPath(tree, start, end) {
  if (!start || !end) return []
  const graph = new Map(tree.memberIds.map((id) => [id, []]))
  tree.relations.forEach(({ from, to }) => { graph.get(from)?.push(to); graph.get(to)?.push(from) })
  const queue = [[start]]
  const seen = new Set([start])
  while (queue.length) {
    const path = queue.shift()
    const current = path.at(-1)
    if (current === end) return path
    for (const next of graph.get(current) ?? []) if (!seen.has(next)) { seen.add(next); queue.push([...path, next]) }
  }
  return []
}

export default function GenealogyTree({ tree }) {
  const generations = useMemo(() => generationsFor(tree), [tree])
  const maxGeneration = Math.max(...Object.values(generations), 0)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 24, y: 24 })
  const [collapsed, setCollapsed] = useState(new Set())
  const [selectedId, setSelectedId] = useState(tree.memberIds[0])
  const [generationFilter, setGenerationFilter] = useState('all')
  const [lifeFilter, setLifeFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [focusMode, setFocusMode] = useState('all')
  const [locateId, setLocateId] = useState(tree.memberIds[0])
  const [showSuccession, setShowSuccession] = useState(false)
  const [mode, setMode] = useState('visual')
  const [pathStart, setPathStart] = useState('')
  const [pathEnd, setPathEnd] = useState('')
  const viewportRef = useRef(null)
  const drag = useRef(null)
  const nodeRefs = useRef(new Map())

  const children = useMemo(() => {
    const value = new Map(tree.memberIds.map((id) => [id, []]))
    tree.relations.filter(({ type }) => ['parent', 'adopted', 'illegitimate'].includes(type)).forEach(({ from, to }) => value.get(from)?.push(to))
    return value
  }, [tree])

  const parents = useMemo(() => {
    const value = new Map(tree.memberIds.map((id) => [id, []]))
    tree.relations.filter(({ type }) => ['parent', 'adopted', 'illegitimate'].includes(type)).forEach(({ from, to }) => value.get(to)?.push(from))
    return value
  }, [tree])

  const succession = useMemo(() => successions.find((entry) => entry.genealogyId === tree.id), [tree.id])
  const successionRoles = useMemo(() => {
    const value = new Map()
    if (succession?.current) value.set(succession.current.personId, 'governante')
    succession?.order.forEach(({ personId, rank }) => value.set(personId, `${rank}º herdeiro`))
    succession?.pretenders.forEach(({ personId }) => value.set(personId, 'pretendente'))
    succession?.excluded.forEach(({ personId }) => value.set(personId, 'excluído'))
    return value
  }, [succession])

  const hidden = new Set()
  function hideDescendants(id) {
    for (const child of children.get(id) ?? []) { hidden.add(child); hideDescendants(child) }
  }
  collapsed.forEach(hideDescendants)

  const relatedFocus = new Set([selectedId])
  function collect(map, id) {
    for (const relative of map.get(id) ?? []) if (!relatedFocus.has(relative)) { relatedFocus.add(relative); collect(map, relative) }
  }
  if (focusMode === 'ancestors') collect(parents, selectedId)
  if (focusMode === 'descendants') collect(children, selectedId)

  const visibleIds = tree.memberIds.filter((id) => {
    const person = genealogyPeopleById[id]
    const role = successionRoles.get(id)
    const roleMatches = roleFilter === 'all' || (roleFilter === 'heirs' && role?.includes('herdeiro')) || role === roleFilter
    const focusMatches = focusMode === 'all' || relatedFocus.has(id)
    return !hidden.has(id) && focusMatches && roleMatches && (generationFilter === 'all' || generations[id] === Number(generationFilter)) && (lifeFilter === 'all' || lifeStateFor(person) === lifeFilter)
  })
  const visibleSet = new Set(visibleIds)
  const path = kinshipPath(tree, pathStart, pathEnd)
  const pathSet = new Set(path)

  const byGeneration = new Map()
  tree.memberIds.forEach((id) => {
    const generation = generations[id]
    if (!byGeneration.has(generation)) byGeneration.set(generation, [])
    byGeneration.get(generation).push(id)
  })
  const positions = new Map()
  byGeneration.forEach((ids, generation) => ids.forEach((id, index) => positions.set(id, { x: index * 250 + 40, y: generation * 180 + 54 })))
  const canvasWidth = Math.max(700, ...[...byGeneration.values()].map((ids) => ids.length * 250 + 80))
  const canvasHeight = Math.max(520, (maxGeneration + 1) * 180 + 120)
  const selected = genealogyPeopleById[selectedId]
  const selectedProfile = selected.profile ? profileByPath[selected.profile] : null
  const selectedParents = parents.get(selectedId) ?? []
  const selectedChildren = children.get(selectedId) ?? []
  const selectedPartners = tree.relations.filter(({ type, from, to }) => type === 'partner' && (from === selectedId || to === selectedId)).map(({ from, to }) => from === selectedId ? to : from)
  const selectedSiblings = [...new Set(selectedParents.flatMap((parentId) => children.get(parentId) ?? []).filter((id) => id !== selectedId))]

  function toggleCollapse(id) {
    setCollapsed((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next })
  }

  function focusSibling(event, id) {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()
    const index = visibleIds.indexOf(id)
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1
    const next = visibleIds[(index + direction + visibleIds.length) % visibleIds.length]
    nodeRefs.current.get(next)?.focus()
  }

  function centerSelected() {
    const viewport = viewportRef.current
    const point = positions.get(selectedId)
    if (!viewport || !point) return setPan({ x: 24, y: 24 })
    setPan({ x: viewport.clientWidth / 2 - (point.x + 105) * zoom, y: viewport.clientHeight / 2 - (point.y + 45) * zoom })
  }

  function locateMember() {
    setSelectedId(locateId)
    setGenerationFilter('all')
    setLifeFilter('all')
    setRoleFilter('all')
    setFocusMode('all')
    const viewport = viewportRef.current
    const point = positions.get(locateId)
    if (viewport && point) setPan({ x: viewport.clientWidth / 2 - (point.x + 105) * zoom, y: viewport.clientHeight / 2 - (point.y + 48) * zoom })
    nodeRefs.current.get(locateId)?.focus()
  }

  const nodeCard = (id, textMode = false) => {
    const person = genealogyPeopleById[id]
    const hasChildren = (children.get(id)?.length ?? 0) > 0
    const profile = person.profile ? profileByPath[person.profile] : null
    return <FamilyTreeNode key={id} person={{ ...person, title: profile?.subtitle, life: `${formatYear(person.born)} — ${formatYear(person.died)}` }} generation={generations[id]} lifeState={lifeStateFor(person)} successionRole={showSuccession ? successionRoles.get(id) : null} selected={selectedId === id} highlighted={pathSet.has(id) || (focusMode !== 'all' && relatedFocus.has(id))} hasChildren={hasChildren} collapsed={collapsed.has(id)} textMode={textMode} onSelect={() => setSelectedId(id)} onToggle={() => toggleCollapse(id)} onKeyDown={(event) => focusSibling(event, id)} buttonRef={(element) => { if (element) nodeRefs.current.set(id, element) }} />
  }

  const namesFor = (ids) => ids.length ? ids.map((id) => genealogyPeopleById[id]?.name).join(', ') : 'Não registrado'

  return <div className={`genealogy-workbench genealogy-theme-${tree.theme}`}>
    <header className="genealogy-identity"><span aria-hidden="true">{tree.symbol}</span><div><strong>{tree.name}</strong><small>{tree.subtitle}</small></div><em>Arquivo público · {tree.memberIds.length} membros</em></header>
    <FamilyTreeControls>
      <div className="genealogy-control-group"><button type="button" onClick={() => setZoom(Math.max(.6, zoom - .1))} disabled={zoom <= .6}>−</button><output>{Math.round(zoom * 100)}%</output><button type="button" onClick={() => setZoom(Math.min(1.5, zoom + .1))} disabled={zoom >= 1.5}>+</button><button type="button" onClick={centerSelected}>Centralizar</button><button type="button" onClick={() => { setZoom(1); setPan({ x: 24, y: 24 }) }}>Redefinir</button></div>
      <label><span>Geração</span><select value={generationFilter} onChange={(event) => setGenerationFilter(event.target.value)}><option value="all">Todas</option>{Array.from({ length: maxGeneration + 1 }, (_, index) => <option key={index} value={index}>{index + 1}</option>)}</select></label>
      <label><span>Condição</span><select value={lifeFilter} onChange={(event) => setLifeFilter(event.target.value)}><option value="all">Todos</option><option value="living">Vivos</option><option value="dead">Mortos</option><option value="missing">Desaparecidos</option><option value="unknown">Destino desconhecido</option></select></label>
      <label><span>Sucessão</span><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="all">Todos</option><option value="heirs">Herdeiros</option><option value="pretendente">Pretendentes</option><option value="excluído">Excluídos</option><option value="secret" disabled>Linhagens secretas — autor</option></select></label>
      <label><span>Arquivo</span><select value="public" aria-label="Camada de visibilidade"><option value="public">Árvore pública</option><option value="author" disabled>Árvore do autor — reservada</option></select></label>
      <div className="genealogy-view-toggle" aria-label="Modo de leitura"><button type="button" className={mode === 'visual' ? 'active' : ''} onClick={() => setMode('visual')}>Árvore</button><button type="button" className={mode === 'text' ? 'active' : ''} onClick={() => setMode('text')}>Texto</button></div>
      <div className="genealogy-focus-controls" aria-label="Destaques"><button type="button" className={focusMode === 'ancestors' ? 'active' : ''} onClick={() => setFocusMode(focusMode === 'ancestors' ? 'all' : 'ancestors')}>Ancestrais</button><button type="button" className={focusMode === 'descendants' ? 'active' : ''} onClick={() => setFocusMode(focusMode === 'descendants' ? 'all' : 'descendants')}>Descendentes</button><button type="button" className={showSuccession ? 'active' : ''} onClick={() => setShowSuccession(!showSuccession)} disabled={!succession}>Linha sucessória</button></div>
      <div className="genealogy-locator"><label><span>Localizar membro</span><select value={locateId} onChange={(event) => setLocateId(event.target.value)}>{tree.memberIds.map((id) => <option key={id} value={id}>{genealogyPeopleById[id].name}</option>)}</select></label><button type="button" onClick={locateMember}>Localizar</button></div>
    </FamilyTreeControls>

    <KinshipPath><strong>Caminho de parentesco</strong><label><span>De</span><select value={pathStart} onChange={(event) => setPathStart(event.target.value)}><option value="">Selecione</option>{tree.memberIds.map((id) => <option key={id} value={id}>{genealogyPeopleById[id].name}</option>)}</select></label><label><span>Até</span><select value={pathEnd} onChange={(event) => setPathEnd(event.target.value)}><option value="">Selecione</option>{tree.memberIds.map((id) => <option key={id} value={id}>{genealogyPeopleById[id].name}</option>)}</select></label>{pathStart && pathEnd && <span aria-live="polite">{path.length ? path.map((id) => genealogyPeopleById[id].name).join(' → ') : 'Sem vínculo público conhecido'}</span>}</KinshipPath>

    {mode === 'visual' ? <div className="genealogy-visual-layout">
      <FamilyTree ref={viewportRef} name={tree.name} onPointerDown={(event) => { if (event.target.closest('button, a, select')) return; event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, pan } }} onPointerMove={(event) => { if (drag.current) setPan({ x: drag.current.pan.x + event.clientX - drag.current.x, y: drag.current.pan.y + event.clientY - drag.current.y }) }} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}>
        <div className="genealogy-canvas" style={{ width: canvasWidth, height: canvasHeight, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} aria-hidden="true">{tree.relations.filter(({ from, to }) => visibleSet.has(from) && visibleSet.has(to)).map((edge) => <FamilyRelationshipEdge key={`${edge.from}-${edge.to}-${edge.type}`} edge={edge} from={positions.get(edge.from)} to={positions.get(edge.to)} highlighted={(pathSet.has(edge.from) && pathSet.has(edge.to)) || (focusMode !== 'all' && relatedFocus.has(edge.from) && relatedFocus.has(edge.to))} />)}</svg>
          {visibleIds.map((id) => { const point = positions.get(id); return <div key={id} className="genealogy-node-position" style={{ left: point.x, top: point.y }}>{nodeCard(id)}</div> })}
          {['kayler', 'rivs', 'nimbus'].includes(tree.id) && <HiddenRelativePlaceholder style={{ left: canvasWidth - 270, top: canvasHeight - 70 }} />}
        </div>
      </FamilyTree>
      <aside className="genealogy-detail" aria-live="polite">
        {selectedProfile && <figure><ImageWithFallback src={selectedProfile.thumbnail || selectedProfile.image} alt={`Retrato de ${selected.name}`} fallback="character" /><figcaption>Retrato do arquivo</figcaption></figure>}
        <GenealogyStatusBadge status={tree.truthStatus} /><span>Geração {generations[selectedId] + 1}</span><h2>{selected.name}</h2>{selectedProfile?.subtitle && <p className="genealogy-detail-title">{selectedProfile.subtitle}</p>}<p>{formatYear(selected.born)} — {formatYear(selected.died)}</p>
        <dl><div><dt>Status</dt><dd>{selected.status}</dd></div><div><dt>Povo</dt><dd>{selected.people}</dd></div>{selected.house && <div><dt>Casa ou clã</dt><dd>{selected.house}</dd></div>}<div><dt>Pais</dt><dd>{namesFor(selectedParents)}</dd></div><div><dt>Filhos</dt><dd>{namesFor(selectedChildren)}</dd></div><div><dt>Cônjuges ou uniões</dt><dd>{namesFor(selectedPartners)}</dd></div><div><dt>Irmãos</dt><dd>{namesFor(selectedSiblings)}</dd></div><div><dt>Sucessão</dt><dd>{successionRoles.get(selectedId) ?? 'Sem posição pública'}</dd></div></dl>
        <p className="genealogy-detail-summary">{selectedProfile?.summary ?? `O arquivo preserva nome, datas e vínculos de ${selected.name}; biografia completa não registrada.`}</p>
        {selected.profile && <Link className="button button-secondary" to={selected.profile}>Abrir perfil completo</Link>}
        {succession && <Link className="text-link" to={`/sucessoes/${succession.slug}`}>Consultar sucessão de {succession.realm}</Link>}
      </aside>
    </div> : <GenealogyTextView>{visibleIds.map((id) => nodeCard(id, true))}</GenealogyTextView>}

    <RelationshipLegend />
  </div>
}
