import { Navigate, useParams } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import ArchiveProvenance from '../components/ArchiveProvenance'
import GenealogyTree from '../components/GenealogyTree'
import PrimaryRecord from '../components/PrimaryRecord'
import { DisputedLineageNotice } from '../components/GenealogyPrimitives'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { genealogies, genealogyPeopleById } from '../content/genealogies'

export default function GenealogyDetailPage({ fixedTree }) {
  const { slug } = useParams()
  const tree = fixedTree ?? genealogies.find((entry) => entry.slug === slug)
  if (!tree) return <Navigate to="/404" replace />
  const members = tree.memberIds.map((id) => genealogyPeopleById[id]).filter(Boolean)
  const sources = [...new Set(members.map(({ source }) => source).filter(Boolean))]
  const uncertainRelations = tree.relations.filter(({ status }) => status && status !== 'documented')
  const knownYears = members.flatMap(({ born, died }) => [born, died]).filter(Number.isFinite)
  const period = knownYears.length ? `${Math.min(...knownYears)}–${Math.max(...knownYears)} d.C.` : 'Datação não registrada'
  const archiveItem = {
    ...tree,
    category: 'Árvore genealógica',
    description: `${tree.summary} A árvore reúne ${members.length} pessoas e ${tree.relations.length} vínculos públicos, mantendo incertezas visíveis sem completar ramos por conjectura.`,
    period,
    lineage: tree.house,
    importantCharacters: members.map(({ name, role }) => `${name} — ${role}`),
    historicalSources: sources,
    publicKnowledge: [tree.scope],
    knowledgeGaps: uncertainRelations.length ? uncertainRelations.map(({ note, status }) => note || `Vínculo classificado como ${status}.`) : ['Ramos não sustentados por fonte pública permanecem desconhecidos e não são desenhados.'],
    inheritance: members.map(({ name, historicalRole }) => `${name}: ${historicalRole}`),
    currentSituation: 'O diagrama representa o estado público do arquivo em 1204 d.C.; parentescos reservados e hipóteses do autor não integram esta edição.',
    relations: [],
    sourceReliability: `${sources.length} testemunhos familiares ou documentais reunidos; a confiança permanece individualizada em cada pessoa.`,
  }
  return <>
    <SEO title={tree.name} description={tree.summary} />
    <div className="page-masthead genealogy-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={[{ label: 'Genealogias', to: '/genealogias' }, { label: tree.name }]} /><SectionTitle kicker="Árvore pública validada" title={tree.name} description={tree.summary} as="h1" /></div></div>
    <section className="content-section genealogy-page"><DisputedLineageNotice>Esta visualização não carrega segredos do autor. Ramos desconhecidos permanecem indicados sem identidades inventadas; dados reservados e relações sem versão editorial pública não entram no bundle.</DisputedLineageNotice><div className="detail-content genealogy-record-content"><PrimaryRecord item={archiveItem} catalogKey="genealogias" /><ArchiveProvenance item={archiveItem} /></div><GenealogyTree key={tree.id} tree={tree} /></section>
  </>
}
