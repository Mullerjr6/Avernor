import { useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ImageWithFallback from '../components/ImageWithFallback'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { assets } from '../data/assets'
import { atlasPoints, atlasRelations } from '../data/atlas'
import { normalizeText } from '../utils/text'

export default function AtlasPage() {
  const [params, setParams] = useSearchParams()
  const initial = atlasPoints.find((point) => point.id === params.get('ponto')) ?? atlasPoints[0]
  const [selected, setSelected] = useState(initial)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const drag = useRef(null)
  const viewportRef = useRef(null)

  const filtered = useMemo(() => {
    const normalized = normalizeText(query)
    return atlasPoints.filter((point) => (!type || point.type === type) && (!normalized || normalizeText(`${point.label} ${point.region} ${point.note}`).includes(normalized)))
  }, [query, type])

  function choose(point) {
    setSelected(point)
    setParams({ ponto: point.id }, { replace: true })
  }

  function constrainPan(next, activeZoom = zoom) {
    const viewport = viewportRef.current
    if (!viewport || activeZoom <= 1) return { x: 0, y: 0 }
    const minX = viewport.clientWidth * (1 - activeZoom)
    const minY = viewport.clientHeight * (1 - activeZoom)
    return { x: Math.min(0, Math.max(minX, next.x)), y: Math.min(0, Math.max(minY, next.y)) }
  }

  function changeZoom(next) {
    const safeZoom = Math.min(2.5, Math.max(1, next))
    setZoom(safeZoom)
    setPan((current) => constrainPan(current, safeZoom))
  }

  function pointerDown(event) {
    if (event.target.closest('button')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
  }

  function pointerMove(event) {
    if (!drag.current) return
    setPan(constrainPan({ x: drag.current.panX + event.clientX - drag.current.x, y: drag.current.panY + event.clientY - drag.current.y }))
  }

  function moveWithKeyboard(event) {
    if (zoom <= 1 || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
    event.preventDefault()
    const step = event.shiftKey ? 90 : 35
    const delta = {
      ArrowLeft: { x: step, y: 0 }, ArrowRight: { x: -step, y: 0 },
      ArrowUp: { x: 0, y: step }, ArrowDown: { x: 0, y: -step },
    }[event.key]
    setPan((current) => constrainPan({ x: current.x + delta.x, y: current.y + delta.y }))
  }

  return (
    <>
      <SEO title="Atlas interativo" description="Mapa interativo de Avernor com cidades, reinos, rotas e relações políticas." image={assets.maps.atlas} />
      <div className="page-masthead atlas-masthead">
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: 'Atlas' }]} />
          <SectionTitle kicker="Cartografia do Arquivo" title="Atlas interativo de Avernor" description="Amplie, arraste e selecione os marcos conferidos sobre a carta contemporânea." as="h1" />
        </div>
      </div>
      <section className="content-section atlas-page">
        <div className="atlas-toolbar">
          <label><span>Buscar lugar</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cidade, reino ou região" /></label>
          <label><span>Tipo de marco</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="">Todos</option><option>Reino</option><option>Território</option><option>Capital</option><option>Porto</option><option>Criatura</option></select></label>
          <div className="zoom-controls" aria-label="Controles de zoom">
            <button type="button" onClick={() => changeZoom(zoom - 0.25)} aria-label="Diminuir zoom" disabled={zoom === 1}>−</button>
            <output aria-live="polite">{Math.round(zoom * 100)}%</output>
            <button type="button" onClick={() => changeZoom(zoom + 0.25)} aria-label="Aumentar zoom" disabled={zoom === 2.5}>+</button>
            <button type="button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }} disabled={zoom === 1}>Redefinir</button>
          </div>
        </div>

        <div className="atlas-statusbar">
          <div className="atlas-legend" aria-label="Legenda do mapa"><span><i className="legend-reino" />Reino</span><span><i className="legend-capital" />Capital</span><span><i className="legend-criatura" />Criatura</span></div>
          <p aria-live="polite"><strong>{filtered.length}</strong> de {atlasPoints.length} marcos visíveis · use Ctrl + rolagem para ampliar</p>
        </div>

        <div className="atlas-layout">
          <div
            ref={viewportRef}
            className={`atlas-viewport ${zoom > 1 ? 'is-zoomed' : ''}`}
            tabIndex="0"
            role="region"
            aria-label="Carta interativa de Avernor. Quando ampliada, use as setas para deslocar o mapa."
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={() => { drag.current = null }}
            onPointerCancel={() => { drag.current = null }}
            onKeyDown={moveWithKeyboard}
            onWheel={(event) => { if (event.ctrlKey) { event.preventDefault(); changeZoom(zoom + (event.deltaY < 0 ? 0.2 : -0.2)) } }}
          >
            <div className="atlas-canvas" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, '--atlas-zoom': zoom }}>
              <ImageWithFallback src={assets.maps.atlas} alt="Mapa político contemporâneo de Avernor" fallback="location" loading="eager" />
              {filtered.map((point) => (
                <button key={point.id} type="button" className={`atlas-marker marker-${point.type.toLowerCase()} ${selected.id === point.id ? 'active' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} onClick={() => choose(point)} aria-label={`${point.type}: ${point.label}`}>
                  <span aria-hidden="true" />
                  <strong>{point.label}</strong>
                </button>
              ))}
              {!filtered.length && <div className="atlas-empty"><span aria-hidden="true">⌖</span><strong>Nenhum marco encontrado</strong><small>Revise a busca ou o tipo selecionado.</small></div>}
            </div>
          </div>

          <aside className="atlas-panel" aria-live="polite">
            <span className="kicker">{selected.type} · {selected.region}</span>
            <h2>{selected.label}</h2>
            <p>{selected.note}</p>
            <dl className="atlas-selection-meta"><div><dt>Coordenadas do arquivo</dt><dd>{Math.round(selected.x)} · {Math.round(selected.y)}</dd></div><div><dt>Classificação</dt><dd>{selected.type}</dd></div></dl>
            <Link className="button button-primary" to={selected.href}>Abrir registro</Link>
            <div className="atlas-relations">
              <h3>Relações políticas registradas</h3>
              {atlasRelations.map((relation) => <div key={`${relation.from}-${relation.to}`}><strong>{relation.from} ↔ {relation.to}</strong><span>{relation.status}</span><p>{relation.detail}</p></div>)}
            </div>
          </aside>
        </div>
        <p className="map-note"><strong>Nota cartográfica:</strong> os marcadores foram conferidos sobre esta versão do mapa. Cartas alternativas na galeria contêm nomes e fronteiras divergentes e são tratadas como documentos históricos não canônicos.</p>
      </section>
    </>
  )
}
