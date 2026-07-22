import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import TruthBadge from '../components/TruthBadge'
import { genealogies, genealogyPeopleById } from '../content/genealogies'

export default function GenealogiesPage() {
  const peopleCount = new Set(genealogies.flatMap(({ memberIds }) => memberIds)).size
  return <>
    <SEO title="Genealogias" description="Árvores públicas e validadas de Avernor, separadas dos segredos do autor." />
    <div className="page-masthead genealogy-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={[{ label: 'Genealogias' }]} /><SectionTitle kicker="Sangue, adoção, ofício e custódia" title="Genealogias de Avernor" description={`${genealogies.length} árvores públicas reúnem ${peopleCount} pessoas, com lacunas documentais visíveis e nenhum segredo autoral carregado pelo site.`} as="h1" /></div></div>
    <section className="content-section genealogy-index"><div className="genealogy-intro-note"><strong>Como ler</strong><p>Ausência de um nome não prova ausência de descendência. Gerações perdidas, vínculos contestados e trechos não registrados aparecem como parte da história documental; identidades reservadas ao autor nunca são carregadas pela árvore pública.</p></div><div className="genealogy-index-grid">{genealogies.map((tree) => {
      const branches = new Set(tree.memberIds.map((id) => genealogyPeopleById[id]?.branch).filter(Boolean)).size
      return <article key={tree.id}><TruthBadge status={tree.truthStatus} compact /><span>{String(tree.memberIds.length).padStart(2, '0')} pessoas{branches ? ` · ${branches} ramos` : ''}</span><h2>{tree.name}</h2><p className="genealogy-index-subtitle">{tree.subtitle}</p><p>{tree.summary}</p><Link className="text-link" to={`/genealogias/${tree.slug}`}>Abrir árvore <span>→</span></Link></article>
    })}</div></section>
  </>
}
