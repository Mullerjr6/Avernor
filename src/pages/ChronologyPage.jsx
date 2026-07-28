import { useState } from 'react'
import { Link } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import OrnamentalDivider from '../components/OrnamentalDivider'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { eras } from '../content'

export default function ChronologyPage() {
  const [selectedId, setSelectedId] = useState(eras.at(-1).id)
  const selected = eras.find((era) => era.id === selectedId)
  const selectedIndex = eras.findIndex((era) => era.id === selectedId)

  return (
    <>
      <SEO title="Cronologia" description="Linha do tempo interativa das cinco eras históricas de Avernor." />
      <div className="page-masthead timeline-masthead">
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: 'Cronologia' }]} />
          <SectionTitle kicker="Setecentos anos de memória" title="Linha do tempo de Avernor" description="Selecione uma era para acompanhar os acontecimentos que ainda moldam o presente." as="h1" />
        </div>
      </div>
      <section className="content-section timeline-page">
        <div className="timeline-track" role="tablist" aria-label="Eras de Avernor" style={{ '--timeline-progress': `${(selectedIndex / (eras.length - 1)) * 84 + 8}%` }}>
          {eras.map((era, index) => (
            <button key={era.id} id={`era-tab-${era.id}`} type="button" role="tab" aria-selected={selectedId === era.id} aria-controls="era-panel" className={selectedId === era.id ? 'active' : ''} onClick={() => setSelectedId(era.id)}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{era.period}</strong><small>{era.name.replace(/^.+—\s*/, '')}</small>
            </button>
          ))}
        </div>
        <article id="era-panel" className="timeline-panel" role="tabpanel" aria-labelledby={`era-tab-${selected.id}`}>
          <div><span className="kicker">{selected.period}</span><h2>{selected.name}</h2><OrnamentalDivider /><p className="timeline-lede">{selected.summary}</p><p>{selected.description}</p><Link className="text-link" to={`/historia/${selected.slug}`}>Consultar registro completo <span>→</span></Link></div>
          <aside><span className="timeline-entry-count">Era {String(selectedIndex + 1).padStart(2, '0')} / {String(eras.length).padStart(2, '0')}</span><h3>Acontecimentos centrais</h3><ol>{selected.events.map((event) => <li key={event}>{event}</li>)}</ol><blockquote>“{selected.quotes[0]}”</blockquote></aside>
        </article>
      </section>
    </>
  )
}
