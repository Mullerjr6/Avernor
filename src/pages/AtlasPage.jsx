import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ImageWithFallback from '../components/ImageWithFallback'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import {
  atlasLayers,
  atlasRegions,
  atlasRoutes,
  canonicalAtlasPoints,
  canonicalMap,
  findAtlasRoute,
  historicalMaps,
  politicalEntities,
  politicalRelations,
  routeGeometry,
} from '../data/atlas'
import { normalizeText } from '../utils/text'
import '../styles/atlas.css'

const layerById = Object.fromEntries(atlasLayers.map((layer) => [layer.id, layer]))
const pointById = Object.fromEntries(canonicalAtlasPoints.map((point) => [point.id, point]))
const routeById = Object.fromEntries(atlasRoutes.map((route) => [route.id, route]))
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value))
const precisionLabels = {
  confirmed: 'posição conferida',
  regional: 'setor regional',
  approximate: 'posição aproximada',
}
const typeLabels = {
  capital: 'Capital', fortaleza: 'Fortaleza', porto: 'Porto', regiao: 'Região', mar: 'Mar', arquipelago: 'Arquipélago',
  deserto: 'Deserto', floresta: 'Floresta', rota: 'Rota', ruina: 'Ruína', local: 'Marco local', criatura: 'Criatura',
  batalha: 'Conflito', fratura: 'Fratura', reliquia: 'Relíquia',
}

function pointsText(points) {
  return points.map(([x, y]) => `${x},${y}`).join(' ')
}

function routeDuration(route) {
  return `${route.durationDays.min}–${route.durationDays.max} dias`
}

function AtlasPointPanel({ point, onLocate }) {
  if (!point) return null
  const layer = layerById[point.layer]
  return (
    <aside className="canonical-atlas-panel" aria-live="polite">
      {point.image && (
        <figure>
          <ImageWithFallback src={point.image} alt={`Registro visual relacionado a ${point.name}`} fallback={point.type === 'criatura' ? 'creature' : 'location'} />
          <figcaption>{precisionLabels[point.coordinatePrecision]}</figcaption>
        </figure>
      )}
      <span className="kicker">{layer.label} · {typeLabels[point.type] ?? point.type}</span>
      <h2>{point.name}</h2>
      <p className="canonical-atlas-panel-summary">{point.summary}</p>
      <p>{point.description}</p>
      <dl className="canonical-atlas-facts">
        <div><dt>Região</dt><dd>{point.regionName}</dd></div>
        <div><dt>Controle</dt><dd>{point.politicalControl}</dd></div>
        <div><dt>Referência</dt><dd>{point.referenceDate}</dd></div>
        <div><dt>Precisão</dt><dd>{precisionLabels[point.coordinatePrecision]}</dd></div>
        <div><dt>Clima</dt><dd>{point.climate}</dd></div>
        <div><dt>Terreno</dt><dd>{point.terrain}</dd></div>
        <div><dt>População</dt><dd>{point.population}</dd></div>
        <div><dt>Estado</dt><dd>{point.status}</dd></div>
        <div><dt>Perigo</dt><dd>{point.danger}</dd></div>
        <div><dt>Coordenada normalizada</dt><dd>{point.x.toFixed(1)} · {point.y.toFixed(1)}</dd></div>
      </dl>
      <div className="canonical-atlas-panel-actions">
        <button type="button" className="button button-ghost" onClick={() => onLocate(point)}>Centralizar</button>
        {point.href && <Link className="button button-primary" to={point.href}>Abrir registro</Link>}
      </div>
      {(point.relatedCharacters.length > 0 || point.relatedWars.length > 0) && (
        <div className="canonical-atlas-related">
          <h3>Relações públicas</h3>
          {point.relatedCharacters.length > 0 && <p><strong>Personagens:</strong> {point.relatedCharacters.join(', ')}</p>}
          {point.relatedWars.length > 0 && <p><strong>Conflitos:</strong> {point.relatedWars.join(', ')}</p>}
        </div>
      )}
    </aside>
  )
}

function JourneyPlanner({ start, end, metric, onStart, onEnd, onMetric, result }) {
  const endpointIds = useMemo(() => [...new Set(atlasRoutes.flatMap((route) => [route.from, route.to]))], [])
  const segments = result?.routeIds.map((id) => routeById[id]) ?? []

  return (
    <section className="canonical-atlas-journey" aria-labelledby="atlas-journey-title">
      <div>
        <span className="kicker">Rotas públicas · estimativa</span>
        <h2 id="atlas-journey-title">Calculador de viagem</h2>
        <p>Escolhe o menor percurso documentado; clima, fronteiras e campanha podem alterar o resultado.</p>
      </div>
      <div className="canonical-atlas-journey-form">
        <label><span>Partida</span><select value={start} onChange={(event) => onStart(event.target.value)}>{endpointIds.map((id) => <option key={id} value={id}>{pointById[id].name}</option>)}</select></label>
        <button type="button" className="canonical-atlas-swap" onClick={() => { onStart(end); onEnd(start) }} aria-label="Trocar partida e destino">⇄</button>
        <label><span>Destino</span><select value={end} onChange={(event) => onEnd(event.target.value)}>{endpointIds.map((id) => <option key={id} value={id}>{pointById[id].name}</option>)}</select></label>
        <label><span>Prioridade</span><select value={metric} onChange={(event) => onMetric(event.target.value)}><option value="distance">Menor distância</option><option value="time">Menor tempo médio</option></select></label>
      </div>
      <output className="canonical-atlas-journey-result" aria-live="polite">
        {result ? (
          <>
            <strong>{result.distanceKm.toLocaleString('pt-BR')} km · {result.durationDays.min}–{result.durationDays.max} dias</strong>
            <span>{result.pointIds.map((id) => pointById[id].name).join(' → ')}</span>
            {segments.length > 0 && <small>{segments.map((route) => `${route.name} (${route.mode})`).join(' · ')}</small>}
          </>
        ) : <strong>Não existe ligação pública contínua entre os pontos escolhidos.</strong>}
      </output>
    </section>
  )
}

function TextAtlas({ points, onSelect }) {
  return (
    <section className="canonical-atlas-text" aria-labelledby="atlas-text-title">
      <div className="canonical-atlas-text-heading">
        <span className="kicker">Alternativa acessível</span>
        <h2 id="atlas-text-title">Atlas em modo textual</h2>
        <p>{canonicalMap.accessibleDescription}</p>
      </div>
      <ol>
        {points.map((point) => (
          <li key={point.id}>
            <article>
              <span>{layerById[point.layer].label} · {typeLabels[point.type] ?? point.type}</span>
              <h3>{point.name}</h3>
              <p>{point.summary}</p>
              <dl><div><dt>Região</dt><dd>{point.regionName}</dd></div><div><dt>Controle</dt><dd>{point.kingdom}</dd></div><div><dt>Precisão</dt><dd>{precisionLabels[point.coordinatePrecision]}</dd></div></dl>
              <div><button type="button" className="text-link" onClick={() => onSelect(point)}>Selecionar no mapa</button>{point.href && <Link className="text-link" to={point.href}>Abrir registro</Link>}</div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function AtlasPage() {
  const [params, setParams] = useSearchParams()
  const initialRoute = routeById[params.get('rota')]
  const initialPoint = pointById[params.get('ponto')] ?? pointById[initialRoute?.from] ?? canonicalAtlasPoints.find((point) => point.id === 'valoris')
  const [selectedId, setSelectedId] = useState(initialPoint.id)
  const [query, setQuery] = useState('')
  const [layerFilter, setLayerFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [kingdomFilter, setKingdomFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [routeMode, setRouteMode] = useState('')
  const [showRegions, setShowRegions] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [viewMode, setViewMode] = useState('map')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewportSize, setViewportSize] = useState({ width: 1, height: 1, stageWidth: 1, stageHeight: 1 })
  const [journeyStart, setJourneyStart] = useState(initialRoute?.from ?? 'winterheim')
  const [journeyEnd, setJourneyEnd] = useState(initialRoute?.to ?? 'porto-de-eldemar')
  const [journeyMetric, setJourneyMetric] = useState('distance')
  const [focusedRouteId, setFocusedRouteId] = useState(initialRoute?.id ?? '')
  const workbenchRef = useRef(null)
  const viewportRef = useRef(null)
  const stageRef = useRef(null)
  const pointersRef = useRef(new Map())
  const gestureRef = useRef(null)
  const zoomRef = useRef(zoom)
  const panRef = useRef(pan)

  useEffect(() => { zoomRef.current = zoom }, [zoom])
  useEffect(() => { panRef.current = pan }, [pan])

  const measureViewport = useCallback(() => {
    const viewport = viewportRef.current
    const stage = stageRef.current
    if (!viewport || !stage) return
    setViewportSize({ width: viewport.clientWidth, height: viewport.clientHeight, stageWidth: stage.offsetWidth, stageHeight: stage.offsetHeight })
  }, [])

  useEffect(() => {
    measureViewport()
    const observer = new ResizeObserver(measureViewport)
    if (viewportRef.current) observer.observe(viewportRef.current)
    if (stageRef.current) observer.observe(stageRef.current)
    return () => observer.disconnect()
  }, [measureViewport, viewMode])

  useEffect(() => {
    const update = () => { setIsFullscreen(document.fullscreenElement === workbenchRef.current); requestAnimationFrame(measureViewport) }
    document.addEventListener('fullscreenchange', update)
    return () => document.removeEventListener('fullscreenchange', update)
  }, [measureViewport])

  const constrainPan = useCallback((next, activeZoom = zoomRef.current) => {
    const viewport = viewportRef.current
    const stage = stageRef.current
    if (!viewport || !stage) return next
    const overflowX = Math.max(0, (stage.offsetWidth * activeZoom - viewport.clientWidth) / 2)
    const overflowY = Math.max(0, (stage.offsetHeight * activeZoom - viewport.clientHeight) / 2)
    return { x: clamp(next.x, -overflowX, overflowX), y: clamp(next.y, -overflowY, overflowY) }
  }, [])

  const changeZoom = useCallback((next) => {
    const safe = clamp(next, 1, 4)
    setZoom(safe)
    setPan((current) => constrainPan(current, safe))
  }, [constrainPan])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const centerPoint = useCallback((point) => {
    const stage = stageRef.current
    if (!stage) return
    const activeZoom = Math.max(zoomRef.current, 1.7)
    const next = {
      x: ((50 - point.x) / 100) * stage.offsetWidth * activeZoom,
      y: ((50 - point.y) / 100) * stage.offsetHeight * activeZoom,
    }
    setZoom(activeZoom)
    setPan(constrainPan(next, activeZoom))
  }, [constrainPan])

  const selectPoint = useCallback((point, locate = false) => {
    setSelectedId(point.id)
    const next = new URLSearchParams(params)
    next.set('ponto', point.id)
    setParams(next, { replace: true })
    if (locate) {
      setViewMode('map')
      requestAnimationFrame(() => centerPoint(point))
    }
  }, [centerPoint, params, setParams])

  const filteredPoints = useMemo(() => {
    const normalized = normalizeText(query)
    return canonicalAtlasPoints.filter((point) => {
      const searchable = normalizeText(`${point.name} ${point.summary} ${point.regionName} ${point.kingdom} ${point.type} ${layerById[point.layer].label}`)
      return (!normalized || searchable.includes(normalized))
        && (!layerFilter || point.layer === layerFilter)
        && (!regionFilter || point.regionId === regionFilter)
        && (!kingdomFilter || point.kingdomId === kingdomFilter)
        && (!typeFilter || point.type === typeFilter)
    })
  }, [kingdomFilter, layerFilter, query, regionFilter, typeFilter])

  const visibleRegions = useMemo(() => atlasRegions.filter((region) => !regionFilter || region.id === regionFilter), [regionFilter])
  const journey = useMemo(() => findAtlasRoute(journeyStart, journeyEnd, journeyMetric), [journeyEnd, journeyMetric, journeyStart])
  const journeyRouteIds = useMemo(() => new Set([...(journey?.routeIds ?? []), ...(focusedRouteId ? [focusedRouteId] : [])]), [focusedRouteId, journey])
  const visibleRoutes = useMemo(() => showRoutes ? atlasRoutes.filter((route) => !routeMode || route.mode === routeMode) : [], [routeMode, showRoutes])
  const selected = pointById[selectedId]

  const minimapRect = useMemo(() => {
    const contentWidth = viewportSize.stageWidth * zoom
    const contentHeight = viewportSize.stageHeight * zoom
    const width = clamp((viewportSize.width / contentWidth) * 100, 4, 100)
    const height = clamp((viewportSize.height / contentHeight) * 100, 4, 100)
    return {
      left: clamp(50 - width / 2 - (pan.x / contentWidth) * 100, 0, 100 - width),
      top: clamp(50 - height / 2 - (pan.y / contentHeight) * 100, 0, 100 - height),
      width,
      height,
    }
  }, [pan, viewportSize, zoom])

  function resetFilters() {
    setQuery('')
    setLayerFilter('')
    setRegionFilter('')
    setKingdomFilter('')
    setTypeFilter('')
    setRouteMode('')
  }

  function pointerDistance(points) {
    const [first, second] = [...points.values()]
    return Math.hypot(second.x - first.x, second.y - first.y)
  }

  function pointerCenter(points) {
    const [first, second] = [...points.values()]
    return { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
  }

  function pointerDown(event) {
    if (event.target.closest('button, a, select, input')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointersRef.current.size === 1) {
      gestureRef.current = { kind: 'pan', pointerId: event.pointerId, x: event.clientX, y: event.clientY, pan: panRef.current }
    } else if (pointersRef.current.size === 2) {
      gestureRef.current = { kind: 'pinch', distance: pointerDistance(pointersRef.current), center: pointerCenter(pointersRef.current), zoom: zoomRef.current, pan: panRef.current }
    }
  }

  function pointerMove(event) {
    if (!pointersRef.current.has(event.pointerId)) return
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const gesture = gestureRef.current
    if (!gesture) return
    if (pointersRef.current.size >= 2 && gesture.kind === 'pinch') {
      const currentCenter = pointerCenter(pointersRef.current)
      const nextZoom = clamp(gesture.zoom * (pointerDistance(pointersRef.current) / Math.max(gesture.distance, 1)), 1, 4)
      const nextPan = constrainPan({ x: gesture.pan.x + currentCenter.x - gesture.center.x, y: gesture.pan.y + currentCenter.y - gesture.center.y }, nextZoom)
      setZoom(nextZoom)
      setPan(nextPan)
      return
    }
    if (pointersRef.current.size === 1 && gesture.kind === 'pan' && gesture.pointerId === event.pointerId) {
      setPan(constrainPan({ x: gesture.pan.x + event.clientX - gesture.x, y: gesture.pan.y + event.clientY - gesture.y }))
    }
  }

  function pointerUp(event) {
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size === 1) {
      const [pointerId, point] = [...pointersRef.current.entries()][0]
      gestureRef.current = { kind: 'pan', pointerId, x: point.x, y: point.y, pan: panRef.current }
    } else if (pointersRef.current.size === 0) gestureRef.current = null
  }

  function mapKeyDown(event) {
    if (['+', '='].includes(event.key)) { event.preventDefault(); changeZoom(zoomRef.current + .25); return }
    if (event.key === '-') { event.preventDefault(); changeZoom(zoomRef.current - .25); return }
    if (event.key === 'Home') { event.preventDefault(); resetView(); return }
    if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); return }
    const deltas = { ArrowLeft: [45, 0], ArrowRight: [-45, 0], ArrowUp: [0, 45], ArrowDown: [0, -45] }
    if (deltas[event.key]) {
      event.preventDefault()
      const multiplier = event.shiftKey ? 2 : 1
      setPan((current) => constrainPan({ x: current.x + deltas[event.key][0] * multiplier, y: current.y + deltas[event.key][1] * multiplier }))
    }
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await workbenchRef.current?.requestFullscreen?.()
    else await document.exitFullscreen?.()
  }

  function minimapMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = clamp(((event.clientX - bounds.left) / bounds.width) * 100, 0, 100)
    const y = clamp(((event.clientY - bounds.top) / bounds.height) * 100, 0, 100)
    setPan(constrainPan({
      x: ((50 - x) / 100) * viewportSize.stageWidth * zoom,
      y: ((50 - y) / 100) * viewportSize.stageHeight * zoom,
    }))
  }

  return (
    <>
      <SEO title="Atlas canônico de Avernor" description={canonicalMap.description} image={canonicalMap.preview} />
      <div className="page-masthead atlas-masthead">
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: 'Atlas' }]} />
          <SectionTitle kicker="Cartografia oficial · 1204 d.C." title="Atlas canônico de Avernor" description="Uma única geografia pública para reinos, viagens, guerras e as futuras Crônicas Vivas." as="h1" />
        </div>
      </div>

      <main className="content-section canonical-atlas-page">
        <section className="canonical-atlas-authority" aria-labelledby="atlas-authority-title">
          <div><span aria-hidden="true">✦</span><div><strong id="atlas-authority-title">Mapa Oficial Canônico de Avernor</strong><small>{canonicalMap.referenceDate} · coordenadas normalizadas</small></div></div>
          <p>{canonicalMap.authority.scope} Dados e overlays prevalecem sobre rótulos gravados no raster preservado.</p>
          <details><summary>Correções e limites editoriais</summary><ul>{canonicalMap.editorialCorrections.map((note) => <li key={note}>{note}</li>)}</ul><p>{canonicalMap.publicScope}</p></details>
        </section>

        <section className="canonical-atlas-controls" aria-label="Busca e filtros do Atlas">
          <label className="canonical-atlas-search"><span>Buscar no Atlas</span><input type="search" list="atlas-suggestions" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Lugar, reino, rota ou criatura" /><datalist id="atlas-suggestions">{canonicalAtlasPoints.map((point) => <option key={point.id} value={point.name} />)}</datalist></label>
          <label><span>Camada</span><select value={layerFilter} onChange={(event) => setLayerFilter(event.target.value)}><option value="">Todas</option>{atlasLayers.map((layer) => <option key={layer.id} value={layer.id}>{layer.label}</option>)}</select></label>
          <label><span>Região</span><select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}><option value="">Todas</option>{atlasRegions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}</select></label>
          <label><span>Reino ou controle</span><select value={kingdomFilter} onChange={(event) => setKingdomFilter(event.target.value)}><option value="">Todos</option>{politicalEntities.map((entity) => <option key={entity.id} value={entity.id}>{entity.name}</option>)}</select></label>
          <label><span>Tipo</span><select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="">Todos</option>{[...new Set(canonicalAtlasPoints.map((point) => point.type))].sort().map((type) => <option key={type} value={type}>{typeLabels[type] ?? type}</option>)}</select></label>
          <label><span>Tipo de rota</span><select value={routeMode} onChange={(event) => setRouteMode(event.target.value)}><option value="">Todas</option>{[...new Set(atlasRoutes.map((route) => route.mode))].sort().map((mode) => <option key={mode} value={mode}>{mode}</option>)}</select></label>
          <div className="canonical-atlas-toggle-group" aria-label="Camadas visuais">
            <button type="button" className={showRegions ? 'active' : ''} aria-pressed={showRegions} onClick={() => setShowRegions((value) => !value)}>Fronteiras</button>
            <button type="button" className={showRoutes ? 'active' : ''} aria-pressed={showRoutes} onClick={() => setShowRoutes((value) => !value)}>Rotas</button>
          </div>
          <div className="canonical-atlas-view-toggle" aria-label="Modo de visualização">
            <button type="button" className={viewMode === 'map' ? 'active' : ''} aria-pressed={viewMode === 'map'} onClick={() => setViewMode('map')}>Mapa</button>
            <button type="button" className={viewMode === 'text' ? 'active' : ''} aria-pressed={viewMode === 'text'} onClick={() => setViewMode('text')}>Texto</button>
          </div>
          <button type="button" className="canonical-atlas-reset-filters" onClick={resetFilters}>Limpar filtros</button>
        </section>

        <div className="canonical-atlas-status" role="status">
          <p><strong>{filteredPoints.length}</strong> de {canonicalAtlasPoints.length} pontos públicos · <strong>{visibleRoutes.length}</strong> de {atlasRoutes.length} trechos</p>
          <div>{atlasLayers.map((layer) => <span key={layer.id}><i style={{ '--legend-color': layer.color }} />{layer.label}</span>)}</div>
        </div>

        <JourneyPlanner
          start={journeyStart}
          end={journeyEnd}
          metric={journeyMetric}
          onStart={(id) => { setJourneyStart(id); setFocusedRouteId('') }}
          onEnd={(id) => { setJourneyEnd(id); setFocusedRouteId('') }}
          onMetric={setJourneyMetric}
          result={journey}
        />

        {viewMode === 'text' ? <TextAtlas points={filteredPoints} onSelect={(point) => selectPoint(point, true)} /> : (
          <section ref={workbenchRef} className={`canonical-atlas-workbench ${isFullscreen ? 'is-fullscreen' : ''}`}>
            <div className="canonical-atlas-map-column">
              <div className="canonical-atlas-map-tools" aria-label="Controles de navegação do mapa">
                <button type="button" onClick={() => changeZoom(zoom - .25)} disabled={zoom <= 1} aria-label="Diminuir zoom">−</button>
                <output aria-live="polite">{Math.round(zoom * 100)}%</output>
                <button type="button" onClick={() => changeZoom(zoom + .25)} disabled={zoom >= 4} aria-label="Aumentar zoom">+</button>
                <button type="button" onClick={resetView}>Centralizar mapa</button>
                <button type="button" onClick={() => centerPoint(selected)}>Localizar seleção</button>
                <button type="button" onClick={toggleFullscreen} aria-pressed={isFullscreen}>{isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}</button>
              </div>

              <div
                ref={viewportRef}
                className={`canonical-atlas-viewport ${zoom > 1 ? 'is-zoomed' : ''}`}
                role="region"
                tabIndex="0"
                aria-label="Mapa oficial interativo de Avernor. Use setas para mover, mais e menos para ampliar, Home para redefinir e F para tela cheia."
                aria-describedby="canonical-atlas-description"
                onPointerDown={pointerDown}
                onPointerMove={pointerMove}
                onPointerUp={pointerUp}
                onPointerCancel={pointerUp}
                onKeyDown={mapKeyDown}
                onWheel={(event) => { if (event.ctrlKey || event.metaKey) { event.preventDefault(); changeZoom(zoomRef.current + (event.deltaY < 0 ? .2 : -.2)) } }}
              >
                <p id="canonical-atlas-description" className="sr-only">{canonicalMap.accessibleDescription}</p>
                <div className="canonical-atlas-stage" ref={stageRef} style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`, '--map-zoom': zoom }}>
                  <ImageWithFallback src={canonicalMap.image} alt={canonicalMap.accessibleDescription} fallback="location" loading="eager" fetchPriority="high" draggable="false" />
                  {showRegions && (
                    <svg className="canonical-atlas-regions" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      {visibleRegions.map((region) => <polygon key={region.id} points={pointsText(region.polygon)} style={{ '--region-color': region.color }} />)}
                    </svg>
                  )}
                  {visibleRoutes.length > 0 && (
                    <svg className="canonical-atlas-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      {visibleRoutes.map((route) => <polyline key={route.id} points={pointsText(routeGeometry(route))} className={`route-${route.mode} ${journeyRouteIds.has(route.id) ? 'is-journey' : ''}`} />)}
                    </svg>
                  )}
                  {filteredPoints.map((point) => (
                    <button
                      key={point.id}
                      type="button"
                      className={`canonical-atlas-marker marker-${point.type} layer-${point.layer} ${selectedId === point.id ? 'is-selected' : ''} ${zoom >= 1.65 ? 'show-label' : ''} ${point.y >= 75 ? 'label-above' : ''} ${point.x <= 15 ? 'label-right' : ''} ${point.x >= 85 ? 'label-left' : ''}`}
                      style={{ left: `${point.x}%`, top: `${point.y}%`, '--marker-color': layerById[point.layer].color }}
                      onClick={() => selectPoint(point)}
                      onDoubleClick={() => centerPoint(point)}
                      aria-label={`${typeLabels[point.type] ?? point.type}: ${point.name}. ${precisionLabels[point.coordinatePrecision]}`}
                    >
                      <i aria-hidden="true" />
                      <strong>{point.label}</strong>
                    </button>
                  ))}
                  {filteredPoints.length === 0 && <div className="canonical-atlas-empty"><strong>Nenhum ponto encontrado</strong><span>Revise a busca ou limpe os filtros.</span></div>}
                </div>

                <button type="button" className="canonical-atlas-minimap" onClick={minimapMove} aria-label="Minimapa: clique para reposicionar a carta">
                  <img src={canonicalMap.preview} alt="" />
                  <span style={{ left: `${minimapRect.left}%`, top: `${minimapRect.top}%`, width: `${minimapRect.width}%`, height: `${minimapRect.height}%` }} />
                </button>
                <div className="canonical-atlas-compass" aria-hidden="true"><b>N</b><span>✦</span><small>S</small></div>
                <p className="canonical-atlas-gesture-hint">Arraste · gesto de pinça · Ctrl + rolagem · setas</p>
              </div>
            </div>
            <AtlasPointPanel point={selected} onLocate={centerPoint} />
          </section>
        )}

        <section className="canonical-atlas-route-register" aria-labelledby="route-register-title">
          <div><span className="kicker">Trechos documentados</span><h2 id="route-register-title">Registro de rotas e distâncias</h2><p>Distâncias são aproximações cartográficas; durações representam viagem organizada em condições normais.</p></div>
          <div className="canonical-atlas-route-grid">
            {atlasRoutes.map((route) => (
              <article key={route.id} className={journeyRouteIds.has(route.id) ? 'is-journey' : ''}>
                <span>{route.mode} · {route.status}</span><h3>{route.name}</h3>
                <p>{pointById[route.from].name} → {pointById[route.to].name}</p>
                <strong>{route.distanceKm.toLocaleString('pt-BR')} km · {routeDuration(route)}</strong>
                <small>{route.description} Risco: {route.danger}.</small>
              </article>
            ))}
          </div>
        </section>

        <section className="canonical-atlas-relations" aria-labelledby="atlas-relations-title">
          <div><span className="kicker">Leitura política</span><h2 id="atlas-relations-title">Relações que atravessam o mapa</h2></div>
          <div>{politicalRelations.map((relation) => <article key={`${relation.from}-${relation.to}`}><strong>{relation.from} ↔ {relation.to}</strong><span>{relation.status}</span><p>{relation.detail}</p></article>)}</div>
        </section>

        <section className="canonical-atlas-historical" aria-labelledby="historical-maps-title">
          <div className="canonical-atlas-historical-heading"><span className="kicker">Coleção comparada</span><h2 id="historical-maps-title">Mapas históricos, contestados e apócrifos</h2><p>Nenhum documento abaixo controla marcadores, distâncias ou fronteiras atuais.</p></div>
          <div>{historicalMaps.map((map) => (
            <article key={map.id}>
              <figure><ImageWithFallback src={map.preview} alt={`${map.title}: ${map.warning}`} fallback="location" /></figure>
              <span>{map.classification} · {map.period}</span><h3>{map.title}</h3><p>{map.warning}</p><small>{map.authority} · {map.producedBy}</small>
            </article>
          ))}</div>
        </section>
      </main>
    </>
  )
}
