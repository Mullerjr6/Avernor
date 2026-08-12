import { Link, Navigate, useParams } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import ArchiveProvenance from '../components/ArchiveProvenance'
import PrimaryRecord from '../components/PrimaryRecord'
import { DynastyProfile, LineageTimeline } from '../components/GenealogyPrimitives'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import TruthBadge from '../components/TruthBadge'
import { dynasties } from '../content/dynasties'

export default function DynastiesPage() {
  const { slug } = useParams()
  const selected = slug ? dynasties.find((entry) => entry.slug === slug) : null
  if (slug && !selected) return <Navigate to="/404" replace />
  if (selected) return <><SEO title={selected.name} description={selected.summary} /><div className="page-masthead dynasty-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={[{ label: 'Dinastias', to: '/dinastias' }, { label: selected.name }]} /><SectionTitle kicker={`${selected.realm} · ${selected.period}`} title={selected.name} description={selected.summary} as="h1" /></div></div><DynastyProfile><TruthBadge status={selected.truthStatus} /><div className="detail-content dynasty-record-content"><PrimaryRecord item={{ ...selected, category: 'Dinastia', relations: [{ label: 'Genealogia relacionada', to: `/genealogias/${selected.genealogyId}` }] }} catalogKey="dinastias" /><ArchiveProvenance item={selected} /></div><section><h2>Regra de legitimidade</h2><p>{selected.rule}</p></section><section><h2>Momentos de ruptura</h2><LineageTimeline events={selected.turningPoints} /></section><div className="dynasty-actions"><Link className="button button-primary" to={`/genealogias/${selected.genealogyId}`}>Abrir genealogia</Link><Link className="button button-secondary" to="/sucessoes">Comparar sucessões</Link></div></DynastyProfile></>
  return <><SEO title="Dinastias" description="Dinastias, regras de legitimidade e rupturas políticas de Avernor." /><div className="page-masthead dynasty-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={[{ label: 'Dinastias' }]} /><SectionTitle kicker="Coroas e legitimidade" title="Dinastias de Avernor" description="Linhas de governo conectadas a guerras, conselhos e regras que limitam o sangue." as="h1" /></div></div><section className="content-section dynasty-grid">{dynasties.map((dynasty) => <article key={dynasty.id}><span className="kicker">{dynasty.realm} · {dynasty.period}</span><h2>{dynasty.name}</h2><p>{dynasty.summary}</p><strong>{dynasty.status}</strong><Link className="text-link" to={`/dinastias/${dynasty.slug}`}>Consultar dinastia <span>→</span></Link></article>)}</section></>
}
