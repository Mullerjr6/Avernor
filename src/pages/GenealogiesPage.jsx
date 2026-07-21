import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import TruthBadge from '../components/TruthBadge'
import { genealogies } from '../content/genealogies'

export default function GenealogiesPage() {
  return <>
    <SEO title="Genealogias" description="Árvores públicas e validadas de Avernor, separadas dos segredos do autor." />
    <div className="page-masthead genealogy-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={[{ label: 'Genealogias' }]} /><SectionTitle kicker="Sangue, adoção e juramento" title="Genealogias de Avernor" description="Quatorze árvores públicas com relações documentadas, lacunas visíveis e nenhum segredo autoral no bundle do site." as="h1" /></div></div>
    <section className="content-section genealogy-index"><div className="genealogy-intro-note"><strong>Como ler</strong><p>Ausência de um nome não prova ausência de descendência. Relações contestadas ou secretas permanecem fora da árvore pública até possuírem versão editorial autorizada.</p></div><div className="genealogy-index-grid">{genealogies.map((tree) => <article key={tree.id}><TruthBadge status={tree.truthStatus} compact /><span>{String(tree.memberIds.length).padStart(2, '0')} pessoas</span><h2>{tree.name}</h2><p className="genealogy-index-subtitle">{tree.subtitle}</p><p>{tree.summary}</p><Link className="text-link" to={`/genealogias/${tree.slug}`}>Abrir árvore <span>→</span></Link></article>)}</div></section>
  </>
}
