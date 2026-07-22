import { Navigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import GenealogyTree from '../components/GenealogyTree'
import { DisputedLineageNotice } from '../components/GenealogyPrimitives'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { genealogies } from '../content/genealogies'

export default function GenealogyDetailPage({ fixedTree }) {
  const { slug } = useParams()
  const tree = fixedTree ?? genealogies.find((entry) => entry.slug === slug)
  if (!tree) return <Navigate to="/404" replace />
  return <>
    <SEO title={tree.name} description={tree.summary} />
    <div className="page-masthead genealogy-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={[{ label: 'Genealogias', to: '/genealogias' }, { label: tree.name }]} /><SectionTitle kicker="Árvore pública validada" title={tree.name} description={tree.summary} as="h1" /></div></div>
    <section className="content-section genealogy-page"><DisputedLineageNotice>Esta visualização não carrega segredos do autor. Ramos desconhecidos permanecem indicados sem identidades inventadas; dados reservados e relações sem versão editorial pública não entram no bundle.</DisputedLineageNotice><GenealogyTree key={tree.id} tree={tree} /></section>
  </>
}
