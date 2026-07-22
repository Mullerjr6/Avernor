import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { characters } from '../content/characters'
import { genealogyPeopleById } from '../content/genealogies'
import { successions } from '../content/succession'
import {
  FamilyRelationshipEdge,
  FamilyTree,
  FamilyTreeControls,
  FamilyTreeNode,
  GenealogyMiniMap,
  GenealogyStatusBadge,
  GenealogyTextView,
  HeraldicPortrait,
  KinshipPath,
  RelationshipLegend,
} from './GenealogyPrimitives'
import '../styles/genealogy.css'

const NODE_WIDTH = 264
const NODE_HEIGHT = 176
const NODE_GAP = 44
const COUPLE_GAP = 24
const GENERATION_GAP = 116
const CANVAS_PADDING = 88
const MIN_ZOOM = .42
const MAX_ZOOM = 1.9
const generationalRelations = new Set(['parent', 'adopted', 'illegitimate', 'office', 'custody'])
const sameLevelRelations = new Set(['partner', 'unofficial'])

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value))
const formatYear = (year) => year == null ? 'não registrado' : year < 0 ? `${Math.abs(year)} a.C.` : year === 0 ? 'Ano 0' : `${year} d.C.`
const formatConfidence = (confidence) => ({ high: 'alta', medium: 'média', low: 'baixa', unknown: 'desconhecida' }[confidence] || confidence || 'não indicada')
const formatKnowledge = (status) => ({ public: 'público', documented: 'documentado', unknown: 'desconhecido', lost: 'perdido', disputed: 'contestado', secret: 'secreto', unrecorded: 'não registrado', rumor: 'baseado em rumor', 'people-only': 'conhecido apenas pelo povo indicado' }[status] || status || 'documentado')

function formatLifespan(person) {
  const start = person.born == null ? 'nascimento não registrado' : formatYear(person.born)
  if (person.died != null) return `${start} — ${formatYear(person.died)}`
  const status = String(person.status || '').toLocaleLowerCase('pt-BR')
  return `${start} — ${status.includes('viv') ? 'presente' : 'destino não registrado'}`
}

function generationsFor(tree) {
  const generations = Object.fromEntries(tree.memberIds.map((id) => [id, 0]))
  for (let pass = 0; pass < tree.memberIds.length * 2; pass += 1) {
    let changed = false
    for (const edge of tree.relations) {
      if (!(edge.from in generations) || !(edge.to in generations)) continue
      if (generationalRelations.has(edge.type)) {
        const next = generations[edge.from] + 1
        if (next > generations[edge.to]) { generations[edge.to] = next; changed = true }
      } else if (sameLevelRelations.has(edge.type)) {
        const next = Math.max(generations[edge.from], generations[edge.to])
        if (generations[edge.from] !== next) { generations[edge.from] = next; changed = true }
        if (generations[edge.to] !== next) { generations[edge.to] = next; changed = true }
      }
    }
    if (!changed) break
  }
  return generations
}

function layoutFor(tree, generations) {
  const indexById = new Map(tree.memberIds.map((id, index) => [id, index]))
  const byGeneration = new Map()
  tree.memberIds.forEach((id) => {
    const generation = generations[id] || 0
    if (!byGeneration.has(generation)) byGeneration.set(generation, [])
    byGeneration.get(generation).push(id)
  })

  const positions = new Map()
  const rows = []
  const sortedGenerations = [...byGeneration.keys()].sort((a, b) => a - b)
  for (const generation of sortedGenerations) {
    const ids = byGeneration.get(generation)
    const parent = new Map(ids.map((id) => [id, id]))
    const find = (id) => parent.get(id) === id ? id : find(parent.get(id))
    const unite = (a, b) => { const rootA = find(a); const rootB = find(b); if (rootA !== rootB) parent.set(rootB, rootA) }
    tree.relations.filter((edge) => sameLevelRelations.has(edge.type) && ids.includes(edge.from) && ids.includes(edge.to)).forEach((edge) => unite(edge.from, edge.to))
    const grouped = new Map()
    ids.forEach((id) => { const root = find(id); if (!grouped.has(root)) grouped.set(root, []); grouped.get(root).push(id) })

    const units = [...grouped.values()].map((members) => {
      members.sort((a, b) => (genealogyPeopleById[a]?.born ?? Number.MAX_SAFE_INTEGER) - (genealogyPeopleById[b]?.born ?? Number.MAX_SAFE_INTEGER) || indexById.get(a) - indexById.get(b))
      const ancestors = tree.relations.filter((edge) => generationalRelations.has(edge.type) && members.includes(edge.to)).map((edge) => positions.get(edge.from)).filter(Boolean)
      const desired = ancestors.length ? ancestors.reduce((sum, point) => sum + point.x + NODE_WIDTH / 2, 0) / ancestors.length : Number.POSITIVE_INFINITY
      const branch = genealogyPeopleById[members[0]]?.branch || ''
      const born = Math.min(...members.map((id) => genealogyPeopleById[id]?.born ?? Number.MAX_SAFE_INTEGER))
      return { members, desired, branch, born, width: members.length * NODE_WIDTH + Math.max(0, members.length - 1) * COUPLE_GAP }
    })
    units.sort((a, b) => {
      if (Number.isFinite(a.desired) || Number.isFinite(b.desired)) return a.desired - b.desired
      return a.branch.localeCompare(b.branch, 'pt-BR') || a.born - b.born
    })

    const rowWidth = units.reduce((total, unit) => total + unit.width, 0) + Math.max(0, units.length - 1) * NODE_GAP
    let x = 0
    const y = CANVAS_PADDING + generation * (NODE_HEIGHT + GENERATION_GAP)
    units.forEach((unit) => {
      unit.members.forEach((id, memberIndex) => positions.set(id, { x: x + memberIndex * (NODE_WIDTH + COUPLE_GAP), y }))
      x += unit.width + NODE_GAP
    })
    rows.push({ generation, ids, rowWidth })
  }

  const widest = Math.max(0, ...rows.map(({ rowWidth }) => rowWidth))
  const canvasWidth = Math.max(1240, widest + CANVAS_PADDING * 2)
  rows.forEach(({ ids, rowWidth }) => {
    const offset = (canvasWidth - rowWidth) / 2
    ids.forEach((id) => { const point = positions.get(id); positions.set(id, { ...point, x: point.x + offset }) })
  })
  const maxGeneration = Math.max(...Object.values(generations), 0)
  const canvasHeight = Math.max(760, CANVAS_PADDING * 2 + (maxGeneration + 1) * NODE_HEIGHT + maxGeneration * GENERATION_GAP)
  return { positions, canvasWidth, canvasHeight, maxGeneration, byGeneration }
}

const lifeStateFor = (person = {}) => {
  const normalized = `${person.status || ''} ${person.knowledgeStatus || ''}`.toLocaleLowerCase('pt-BR')
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

function imageForPerson(person) {
  if (person?.portrait) return person.portrait
  const profile = person?.profile ? profileByPath[person.profile] : null
  return profile?.thumbnail || profile?.image || null
}

export default function GenealogyTree({ tree }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPersonId = searchParams.get('pessoa')
  const initialPersonId = tree.memberIds.includes(requestedPersonId) ? requestedPersonId : tree.memberIds[0]
  const generations = useMemo(() => generationsFor(tree), [tree])
  const layout = useMemo(() => layoutFor(tree, generations), [tree, generations])
  const { positions, canvasWidth, canvasHeight, maxGeneration } = layout
  const [zoom, setZoom] = useState(.82)
  const [pan, setPan] = useState({ x: 24, y: 24 })
  const [collapsed, setCollapsed] = useState(new Set())
  const [selectedId, setSelectedId] = useState(initialPersonId)
  const [generationFilter, setGenerationFilter] = useState('all')
  const [lifeFilter, setLifeFilter] = useState('all')
  const [successionFilter, setSuccessionFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [branchFilter, setBranchFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [knowledgeFilter, setKnowledgeFilter] = useState('all')
  const [focusMode, setFocusMode] = useState('all')
  const [locateId, setLocateId] = useState(initialPersonId)
  const [showSuccession, setShowSuccession] = useState(false)
  const [mode, setMode] = useState('visual')
  const [pathStart, setPathStart] = useState('')
  const [pathEnd, setPathEnd] = useState('')
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const workbenchRef = useRef(null)
  const viewportRef = useRef(null)
  const pointers = useRef(new Map())
  const drag = useRef(null)
  const pinch = useRef(null)
  const nodeRefs = useRef(new Map())
  const initialFit = useRef(false)
  const panRef = useRef(pan)
  const zoomRef = useRef(zoom)

  const updatePan = useCallback((next) => { panRef.current = next; setPan(next) }, [])
  const updateZoom = useCallback((next) => { zoomRef.current = next; setZoom(next) }, [])
  const updateSelectedMember = useCallback((id, syncUrl = true) => {
    if (!tree.memberIds.includes(id)) return
    setSelectedId(id)
    setLocateId(id)
    if (syncUrl) setSearchParams((current) => { const next = new URLSearchParams(current); next.set('pessoa', id); return next }, { replace: true })
  }, [setSearchParams, tree.memberIds])
  useEffect(() => { panRef.current = pan }, [pan])
  useEffect(() => { zoomRef.current = zoom }, [zoom])

  const children = useMemo(() => {
    const value = new Map(tree.memberIds.map((id) => [id, []]))
    tree.relations.filter(({ type }) => generationalRelations.has(type)).forEach(({ from, to }) => value.get(from)?.push(to))
    return value
  }, [tree])

  const parents = useMemo(() => {
    const value = new Map(tree.memberIds.map((id) => [id, []]))
    tree.relations.filter(({ type }) => generationalRelations.has(type)).forEach(({ from, to }) => value.get(to)?.push(from))
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

  const roots = useMemo(() => tree.memberIds.filter((id) => !(parents.get(id)?.length)), [tree.memberIds, parents])
  const founderId = tree.founderId || [...roots].sort((a, b) => (genealogyPeopleById[a]?.born ?? Number.MAX_SAFE_INTEGER) - (genealogyPeopleById[b]?.born ?? Number.MAX_SAFE_INTEGER))[0]
  const rulerId = succession?.current?.personId
  const heirId = succession?.order?.[0]?.personId

  const filterOptions = useMemo(() => {
    const people = tree.memberIds.map((id) => genealogyPeopleById[id]).filter(Boolean)
    const values = (key) => [...new Set(people.flatMap((person) => Array.isArray(person[key]) ? person[key] : [person[key]]).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), 'pt-BR'))
    return { periods: values('period'), branches: values('branch'), roles: values('role'), knowledge: values('knowledgeStatus') }
  }, [tree.memberIds])

  const hidden = useMemo(() => {
    const value = new Set()
    function hideDescendants(id) { for (const child of children.get(id) ?? []) if (!value.has(child)) { value.add(child); hideDescendants(child) } }
    collapsed.forEach(hideDescendants)
    return value
  }, [collapsed, children])

  const mainLinePath = useMemo(() => kinshipPath(tree, founderId, rulerId || heirId || tree.memberIds.at(-1)), [founderId, heirId, rulerId, tree])
  const relatedFocus = useMemo(() => {
    const value = new Set([selectedId])
    function collect(map, id) { for (const relative of map.get(id) ?? []) if (!value.has(relative)) { value.add(relative); collect(map, relative) } }
    if (focusMode === 'ancestors') collect(parents, selectedId)
    if (focusMode === 'descendants') collect(children, selectedId)
    if (focusMode === 'direct') {
      for (const id of [...(parents.get(selectedId) || []), ...(children.get(selectedId) || [])]) value.add(id)
      tree.relations.filter(({ from, to }) => from === selectedId || to === selectedId).forEach(({ from, to }) => value.add(from === selectedId ? to : from))
      for (const parentId of parents.get(selectedId) || []) for (const sibling of children.get(parentId) || []) value.add(sibling)
    }
    if (focusMode === 'mainline') mainLinePath.forEach((id) => value.add(id))
    return value
  }, [children, focusMode, mainLinePath, parents, selectedId, tree.relations])

  const visibleIds = tree.memberIds.filter((id) => {
    const person = genealogyPeopleById[id]
    if (!person) return false
    const successionRole = successionRoles.get(id)
    const successionMatches = successionFilter === 'all' || (successionFilter === 'heirs' && successionRole?.includes('herdeiro')) || successionRole === successionFilter
    const roleMatches = roleFilter === 'all' || person.role === roleFilter || person.titles?.includes(roleFilter) || person.tags?.includes(roleFilter)
    return !hidden.has(id)
      && (focusMode === 'all' || relatedFocus.has(id))
      && successionMatches
      && roleMatches
      && (generationFilter === 'all' || generations[id] === Number(generationFilter))
      && (lifeFilter === 'all' || lifeStateFor(person) === lifeFilter)
      && (periodFilter === 'all' || person.period === periodFilter)
      && (branchFilter === 'all' || person.branch === branchFilter)
      && (knowledgeFilter === 'all' || person.knowledgeStatus === knowledgeFilter)
  })
  const visibleSet = new Set(visibleIds)
  const path = kinshipPath(tree, pathStart, pathEnd)
  const pathSet = new Set(path)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(([entry]) => setViewportSize({ width: entry.contentRect.width, height: entry.contentRect.height }))
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [mode])

  const fitTree = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const nextZoom = clamp(Math.min((viewport.clientWidth - 36) / canvasWidth, (viewport.clientHeight - 36) / canvasHeight), MIN_ZOOM, 1)
    updateZoom(nextZoom)
    updatePan({ x: (viewport.clientWidth - canvasWidth * nextZoom) / 2, y: Math.max(18, (viewport.clientHeight - canvasHeight * nextZoom) / 2) })
  }, [canvasHeight, canvasWidth, updatePan, updateZoom])

  useEffect(() => {
    if (mode !== 'visual' || !viewportSize.width || initialFit.current) return
    initialFit.current = true
    const responsiveZoom = window.innerWidth < 620 ? .72 : .82
    const immersiveZoom = tree.memberIds.length <= 7 ? Math.min(.9, responsiveZoom + .06) : responsiveZoom
    updateZoom(immersiveZoom)
    const requestedPoint = tree.memberIds.includes(requestedPersonId) ? positions.get(requestedPersonId) : null
    updatePan(requestedPoint
      ? { x: viewportSize.width / 2 - (requestedPoint.x + NODE_WIDTH / 2) * immersiveZoom, y: viewportSize.height / 2 - (requestedPoint.y + NODE_HEIGHT / 2) * immersiveZoom }
      : { x: (viewportSize.width - canvasWidth * immersiveZoom) / 2, y: 24 })
  }, [canvasWidth, mode, positions, requestedPersonId, tree.memberIds, updatePan, updateZoom, viewportSize.height, viewportSize.width])

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(document.fullscreenElement === workbenchRef.current)
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => document.removeEventListener('fullscreenchange', onFullscreen)
  }, [])

  function toggleCollapse(id) {
    setCollapsed((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next })
  }

  function centerOn(id, requestedZoom = zoomRef.current) {
    const viewport = viewportRef.current
    const point = positions.get(id)
    if (!viewport || !point) return
    const nextZoom = clamp(requestedZoom, MIN_ZOOM, MAX_ZOOM)
    updateZoom(nextZoom)
    updatePan({ x: viewport.clientWidth / 2 - (point.x + NODE_WIDTH / 2) * nextZoom, y: viewport.clientHeight / 2 - (point.y + NODE_HEIGHT / 2) * nextZoom })
  }

  function selectAndFocus(id) {
    if (!id) return
    setGenerationFilter('all'); setLifeFilter('all'); setSuccessionFilter('all'); setPeriodFilter('all'); setBranchFilter('all'); setRoleFilter('all'); setKnowledgeFilter('all'); setFocusMode('all')
    setCollapsed(new Set())
    updateSelectedMember(id)
    requestAnimationFrame(() => { centerOn(id, Math.max(.72, zoomRef.current)); nodeRefs.current.get(id)?.focus() })
  }

  function focusByKeyboard(event, id) {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const current = positions.get(id)
    let candidates = []
    if (event.key === 'ArrowUp') candidates = (parents.get(id) || []).filter((candidate) => visibleSet.has(candidate))
    if (event.key === 'ArrowDown') candidates = (children.get(id) || []).filter((candidate) => visibleSet.has(candidate))
    if (!candidates.length) {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) candidates = visibleIds.filter((candidate) => generations[candidate] === generations[id] && candidate !== id)
      else {
        const targetGeneration = generations[id] + (event.key === 'ArrowDown' ? 1 : -1)
        candidates = visibleIds.filter((candidate) => generations[candidate] === targetGeneration)
      }
    }
    candidates.sort((a, b) => positions.get(a).x - positions.get(b).x)
    let next
    if (event.key === 'Home') next = candidates[0]
    else if (event.key === 'End') next = candidates.at(-1)
    else if (event.key === 'ArrowLeft') next = [...candidates].reverse().find((candidate) => positions.get(candidate).x < current.x) || candidates.at(-1)
    else if (event.key === 'ArrowRight') next = candidates.find((candidate) => positions.get(candidate).x > current.x) || candidates[0]
    else next = candidates.sort((a, b) => Math.abs(positions.get(a).x - current.x) - Math.abs(positions.get(b).x - current.x))[0]
    if (next) { updateSelectedMember(next); nodeRefs.current.get(next)?.focus() }
  }

  const changeZoom = useCallback((delta, anchor) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const oldZoom = zoomRef.current
    const nextZoom = clamp(oldZoom + delta, MIN_ZOOM, MAX_ZOOM)
    const point = anchor || { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2 }
    const worldX = (point.x - panRef.current.x) / oldZoom
    const worldY = (point.y - panRef.current.y) / oldZoom
    updateZoom(nextZoom)
    updatePan({ x: point.x - worldX * nextZoom, y: point.y - worldY * nextZoom })
  }, [updatePan, updateZoom])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || mode !== 'visual') return undefined
    const onWheelZoom = (event) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const bounds = viewport.getBoundingClientRect()
      changeZoom(event.deltaY > 0 ? -.09 : .09, { x: event.clientX - bounds.left, y: event.clientY - bounds.top })
    }
    viewport.addEventListener('wheel', onWheelZoom, { passive: false })
    return () => viewport.removeEventListener('wheel', onWheelZoom)
  }, [changeZoom, mode])

  function onPointerDown(event) {
    if (event.target.closest('button, a, select, input')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.current.size === 1) drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, pan: panRef.current }
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const bounds = event.currentTarget.getBoundingClientRect()
      const center = { x: (a.x + b.x) / 2 - bounds.left, y: (a.y + b.y) / 2 - bounds.top }
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: zoomRef.current, worldX: (center.x - panRef.current.x) / zoomRef.current, worldY: (center.y - panRef.current.y) / zoomRef.current }
      drag.current = null
    }
  }

  function onPointerMove(event) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const bounds = event.currentTarget.getBoundingClientRect()
      const center = { x: (a.x + b.x) / 2 - bounds.left, y: (a.y + b.y) / 2 - bounds.top }
      const nextZoom = clamp(pinch.current.zoom * (Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, pinch.current.distance)), MIN_ZOOM, MAX_ZOOM)
      updateZoom(nextZoom)
      updatePan({ x: center.x - pinch.current.worldX * nextZoom, y: center.y - pinch.current.worldY * nextZoom })
    } else if (drag.current?.id === event.pointerId) updatePan({ x: drag.current.pan.x + event.clientX - drag.current.x, y: drag.current.pan.y + event.clientY - drag.current.y })
  }

  function onPointerEnd(event) {
    pointers.current.delete(event.pointerId)
    pinch.current = null
    const remaining = [...pointers.current.entries()][0]
    drag.current = remaining ? { id: remaining[0], x: remaining[1].x, y: remaining[1].y, pan: panRef.current } : null
  }

  async function toggleFullscreen() {
    if (!document.fullscreenEnabled || !workbenchRef.current) return
    if (document.fullscreenElement === workbenchRef.current) await document.exitFullscreen()
    else await workbenchRef.current.requestFullscreen()
  }

  const selected = genealogyPeopleById[selectedId] || genealogyPeopleById[tree.memberIds[0]]
  const selectedProfile = selected?.profile ? profileByPath[selected.profile] : null
  const selectedParents = parents.get(selectedId) ?? []
  const selectedChildren = children.get(selectedId) ?? []
  const relationsForSelected = tree.relations.filter(({ from, to }) => from === selectedId || to === selectedId)
  const selectedPartners = relationsForSelected.filter(({ type }) => ['partner', 'unofficial'].includes(type)).map(({ from, to }) => from === selectedId ? to : from)
  const selectedSiblings = [...new Set(selectedParents.flatMap((parentId) => children.get(parentId) ?? []).filter((id) => id !== selectedId))]
  const selectedOffices = relationsForSelected.filter(({ type }) => ['office', 'custody', 'guardian', 'oath'].includes(type)).map(({ from, to, type }) => ({ id: from === selectedId ? to : from, type }))
  const namesFor = (ids) => ids.length ? ids.map((id) => genealogyPeopleById[id]?.name).filter(Boolean).join(', ') : 'Não registrado'

  const nodeCard = (id, textMode = false) => {
    const person = genealogyPeopleById[id]
    if (!person) return null
    const hasChildren = (children.get(id)?.length ?? 0) > 0
    const profile = person.profile ? profileByPath[person.profile] : null
    return <FamilyTreeNode key={id} person={{ ...person, title: profile?.subtitle, summary: profile?.summary || person.summary, life: formatLifespan(person) }} generation={generations[id]} lifeState={lifeStateFor(person)} successionRole={showSuccession ? successionRoles.get(id) : null} selected={selectedId === id} highlighted={pathSet.has(id) || (focusMode !== 'all' && relatedFocus.has(id))} hasChildren={hasChildren} collapsed={collapsed.has(id)} textMode={textMode} portrait={imageForPerson(person)} symbol={tree.symbol} tabIndex={selectedId === id ? 0 : -1} onSelect={() => updateSelectedMember(id)} onToggle={() => toggleCollapse(id)} onKeyDown={(event) => focusByKeyboard(event, id)} buttonRef={(element) => { if (element) nodeRefs.current.set(id, element) }} />
  }

  return <div ref={workbenchRef} className={`genealogy-workbench genealogy-theme-${tree.theme} ${isFullscreen ? 'is-fullscreen' : ''}`}>
    <header className="genealogy-identity"><span aria-hidden="true">{tree.symbol}</span><div><strong>{tree.name}</strong><small>{tree.subtitle}</small></div><em>Arquivo público · {tree.memberIds.length} membros · {maxGeneration + 1} gerações documentais</em></header>
    <FamilyTreeControls>
      <div className="genealogy-control-group" aria-label="Escala e enquadramento"><button type="button" onClick={() => changeZoom(-.12)} disabled={zoom <= MIN_ZOOM}>−</button><output aria-label="Escala atual">{Math.round(zoom * 100)}%</output><button type="button" onClick={() => changeZoom(.12)} disabled={zoom >= MAX_ZOOM}>+</button><button type="button" onClick={() => centerOn(selectedId)}>Centralizar</button><button type="button" onClick={fitTree}>Ver tudo</button></div>
      <label><span>Período</span><select value={periodFilter} onChange={(event) => setPeriodFilter(event.target.value)}><option value="all">Todos</option>{filterOptions.periods.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Papel</span><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="all">Todos</option>{filterOptions.roles.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Ramo</span><select value={branchFilter} onChange={(event) => setBranchFilter(event.target.value)}><option value="all">Todos</option>{filterOptions.branches.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Geração</span><select value={generationFilter} onChange={(event) => setGenerationFilter(event.target.value)}><option value="all">Todas</option>{Array.from({ length: maxGeneration + 1 }, (_, index) => <option key={index} value={index}>{index + 1}</option>)}</select></label>
      <label><span>Condição</span><select value={lifeFilter} onChange={(event) => setLifeFilter(event.target.value)}><option value="all">Todas</option><option value="living">Vivos</option><option value="dead">Mortos</option><option value="missing">Desaparecidos</option><option value="unknown">Desconhecido/perdido</option></select></label>
      <label><span>Estado do registro</span><select value={knowledgeFilter} onChange={(event) => setKnowledgeFilter(event.target.value)}><option value="all">Todos</option>{filterOptions.knowledge.map((value) => <option key={value} value={value}>{formatKnowledge(value)}</option>)}</select></label>
      <label><span>Sucessão</span><select value={successionFilter} onChange={(event) => setSuccessionFilter(event.target.value)}><option value="all">Todos</option><option value="heirs">Herdeiros</option><option value="pretendente">Pretendentes</option><option value="excluído">Excluídos</option></select></label>
      <div className="genealogy-view-toggle" aria-label="Modo de leitura"><button type="button" className={mode === 'visual' ? 'active' : ''} aria-pressed={mode === 'visual'} onClick={() => setMode('visual')}>Árvore</button><button type="button" className={mode === 'text' ? 'active' : ''} aria-pressed={mode === 'text'} onClick={() => setMode('text')}>Texto</button><button type="button" aria-pressed={isFullscreen} onClick={toggleFullscreen} disabled={!document.fullscreenEnabled}>{isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}</button></div>
      <div className="genealogy-focus-controls" aria-label="Focos rápidos"><button type="button" onClick={() => selectAndFocus(founderId)} disabled={!founderId}>Fundador</button><button type="button" onClick={() => selectAndFocus(rulerId)} disabled={!rulerId}>Governante</button><button type="button" onClick={() => selectAndFocus(heirId)} disabled={!heirId}>Herdeiro</button><button type="button" className={focusMode === 'direct' ? 'active' : ''} aria-pressed={focusMode === 'direct'} onClick={() => setFocusMode(focusMode === 'direct' ? 'all' : 'direct')}>Parentes diretos</button><button type="button" className={focusMode === 'ancestors' ? 'active' : ''} aria-pressed={focusMode === 'ancestors'} onClick={() => setFocusMode(focusMode === 'ancestors' ? 'all' : 'ancestors')}>Ancestrais</button><button type="button" className={focusMode === 'descendants' ? 'active' : ''} aria-pressed={focusMode === 'descendants'} onClick={() => setFocusMode(focusMode === 'descendants' ? 'all' : 'descendants')}>Descendentes</button><button type="button" className={focusMode === 'mainline' ? 'active' : ''} aria-pressed={focusMode === 'mainline'} onClick={() => setFocusMode(focusMode === 'mainline' ? 'all' : 'mainline')} disabled={mainLinePath.length < 2}>Linha principal</button><button type="button" className={showSuccession ? 'active' : ''} aria-pressed={showSuccession} onClick={() => setShowSuccession(!showSuccession)} disabled={!succession}>Linha sucessória</button></div>
      <div className="genealogy-locator"><label><span>Foco em pessoa</span><select value={locateId} onChange={(event) => setLocateId(event.target.value)}>{tree.memberIds.map((id) => <option key={id} value={id}>{genealogyPeopleById[id]?.name}</option>)}</select></label><button type="button" onClick={() => selectAndFocus(locateId)}>Localizar</button></div>
    </FamilyTreeControls>

    <KinshipPath><strong>Caminho de parentesco</strong><label><span>De</span><select value={pathStart} onChange={(event) => setPathStart(event.target.value)}><option value="">Selecione</option>{tree.memberIds.map((id) => <option key={id} value={id}>{genealogyPeopleById[id]?.name}</option>)}</select></label><label><span>Até</span><select value={pathEnd} onChange={(event) => setPathEnd(event.target.value)}><option value="">Selecione</option>{tree.memberIds.map((id) => <option key={id} value={id}>{genealogyPeopleById[id]?.name}</option>)}</select></label>{pathStart && pathEnd && <span aria-live="polite">{path.length ? path.map((id) => genealogyPeopleById[id]?.name).join(' → ') : 'Sem vínculo público conhecido'}</span>}</KinshipPath>

    {mode === 'visual' ? <div className="genealogy-visual-layout">
      <FamilyTree ref={viewportRef} name={tree.name} aria-describedby={`genealogy-help-${tree.id}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}>
        <p id={`genealogy-help-${tree.id}`} className="visually-hidden">Arraste para percorrer. Use Control mais a roda do mouse, os botões de escala ou gesto de pinça para ampliar. Nos cartões, use setas esquerda e direita para a mesma geração, cima para ascendentes e baixo para descendentes.</p>
        <div className="genealogy-canvas" style={{ width: canvasWidth, height: canvasHeight, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, '--genealogy-zoom': zoom }}>
          <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} aria-hidden="true">{tree.relations.filter(({ from, to }) => visibleSet.has(from) && visibleSet.has(to)).map((edge, index) => <FamilyRelationshipEdge key={`${edge.from}-${edge.to}-${edge.type}-${index}`} edge={edge} from={positions.get(edge.from)} to={positions.get(edge.to)} nodeWidth={NODE_WIDTH} nodeHeight={NODE_HEIGHT} highlighted={(pathSet.has(edge.from) && pathSet.has(edge.to)) || (focusMode !== 'all' && relatedFocus.has(edge.from) && relatedFocus.has(edge.to))} />)}</svg>
          {visibleIds.map((id) => { const point = positions.get(id); return point ? <div key={id} className="genealogy-node-position" style={{ left: point.x, top: point.y, width: NODE_WIDTH, minHeight: NODE_HEIGHT }}>{nodeCard(id)}</div> : null })}
        </div>
        {!visibleIds.length && <div className="genealogy-empty"><span aria-hidden="true">◇</span><strong>Nenhum registro corresponde aos filtros.</strong><button type="button" onClick={() => { setGenerationFilter('all'); setLifeFilter('all'); setSuccessionFilter('all'); setPeriodFilter('all'); setBranchFilter('all'); setRoleFilter('all'); setKnowledgeFilter('all'); setFocusMode('all') }}>Limpar filtros</button></div>}
        <GenealogyMiniMap positions={positions} edges={tree.relations} canvasWidth={canvasWidth} canvasHeight={canvasHeight} visibleSet={visibleSet} viewport={viewportSize} pan={pan} zoom={zoom} onNavigate={(x, y) => updatePan({ x: viewportSize.width / 2 - x * zoomRef.current, y: viewportSize.height / 2 - y * zoomRef.current })} />
        <div className="genealogy-gesture-hint" aria-hidden="true">Arrastar · pinça ou Ctrl+roda para zoom · setas entre parentes</div>
      </FamilyTree>
      <aside className="genealogy-detail" aria-live="polite">
        <div className="genealogy-detail-portrait"><HeraldicPortrait person={selected} symbol={tree.symbol} image={imageForPerson(selected)} /></div>
        <div className="genealogy-detail-heading"><div className="genealogy-detail-badges"><GenealogyStatusBadge status={selected.truthStatus || tree.truthStatus} /><span>{formatKnowledge(selected.knowledgeStatus)}</span></div><span>Geração {generations[selectedId] + 1}</span><h2>{selected.name}</h2><p className="genealogy-detail-title">{selectedProfile?.subtitle || selected.titles?.join(' · ') || selected.role}</p><p>{formatLifespan(selected)}</p></div>
        <p className="genealogy-detail-summary">{selectedProfile?.summary || selected.summary || `O arquivo preserva nome, datas e vínculos de ${selected.name}; a biografia integral não foi registrada.`}</p>
        <dl>
          <div><dt>Papel</dt><dd>{selected.role || 'Não registrado'}</dd></div><div><dt>Ramo</dt><dd>{selected.branch || selected.house || 'Não registrado'}</dd></div><div><dt>Período</dt><dd>{selected.period || 'Não registrado'}</dd></div><div><dt>Condição</dt><dd>{selected.status}</dd></div><div><dt>Povo</dt><dd>{selected.people}</dd></div><div><dt>Estado do conhecimento</dt><dd>{formatKnowledge(selected.knowledgeStatus)}</dd></div><div><dt>Fonte</dt><dd>{selected.source || 'Não registrada'}</dd></div><div><dt>Confiabilidade</dt><dd>{formatConfidence(selected.confidence)}</dd></div><div><dt>Pais ou predecessores</dt><dd>{namesFor(selectedParents)}</dd></div><div><dt>Filhos ou sucessores</dt><dd>{namesFor(selectedChildren)}</dd></div><div><dt>Cônjuges ou uniões</dt><dd>{namesFor(selectedPartners)}</dd></div><div><dt>Irmãos</dt><dd>{namesFor(selectedSiblings)}</dd></div><div><dt>Ofício, custódia ou juramento</dt><dd>{selectedOffices.length ? selectedOffices.map(({ id, type }) => `${genealogyPeopleById[id]?.name} (${type})`).join(', ') : 'Não registrado'}</dd></div><div><dt>Sucessão</dt><dd>{successionRoles.get(selectedId) ?? 'Sem posição pública'}</dd></div>
        </dl>
        {selected.historicalRole && <section><h3>Papel histórico</h3><p>{selected.historicalRole}</p></section>}
        {selected.visualDescription && <section><h3>Descrição visual de arquivo</h3><p>{selected.visualDescription}</p></section>}
        {!!selected.tags?.length && <ul className="genealogy-detail-tags" aria-label="Marcadores">{selected.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
        {selected.profile && <Link className="button button-secondary" to={selected.profile}>Abrir perfil completo</Link>}
        {succession && <Link className="text-link" to={`/sucessoes/${succession.slug}`}>Consultar sucessão de {succession.realm}</Link>}
      </aside>
    </div> : <GenealogyTextView resultCount={visibleIds.length}>{visibleIds.map((id) => nodeCard(id, true))}</GenealogyTextView>}

    <RelationshipLegend />
  </div>
}
