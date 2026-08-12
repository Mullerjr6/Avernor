import { Link, Navigate, useParams } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import ArchiveProvenance from '../components/ArchiveProvenance'
import PrimaryRecord from '../components/PrimaryRecord'
import { SuccessionOrder, SuccessionPanel as SuccessionPanelFrame } from '../components/GenealogyPrimitives'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { genealogyPeopleById } from '../content/genealogies'
import { successions } from '../content/succession'

function SuccessionPanel({ succession }) {
  const currentPerson = succession.current ? genealogyPeopleById[succession.current.personId] : null
  const claimList = (claims, empty) => claims.length ? <ul>{claims.map((candidate) => <li key={candidate.personId}><strong>{genealogyPeopleById[candidate.personId]?.name ?? candidate.personId}</strong> — {candidate.status}. {candidate.reason}</li>)}</ul> : <p>{empty}</p>
  return <SuccessionPanelFrame id={succession.id}>
    <header><span className="kicker">{succession.realm}</span><h2>{succession.name}</h2><p>{succession.rule}</p><div className="current-ruler"><span>Governante atual</span><strong>{currentPerson?.name ?? succession.currentRulerLabel ?? 'Não registrado'}</strong>{succession.current?.reason && <p>{succession.current.reason}</p>}</div></header>
    <div className="detail-content succession-record-content"><PrimaryRecord item={{ ...succession, category: 'Ordem sucessória', summary: succession.rule, relations: [{ label: 'Genealogia relacionada', to: `/genealogias/${succession.genealogyId}` }], importantCharacters: succession.claims.map(({ personId }) => genealogyPeopleById[personId]?.name).filter(Boolean), currentSituation: succession.current?.reason ?? succession.currentRulerLabel }} catalogKey="sucessoes" /><ArchiveProvenance item={succession} /></div>
    <div className="succession-derived"><h3>Ordem calculada</h3><SuccessionOrder>{succession.order.map((candidate) => { const person = genealogyPeopleById[candidate.personId]; return <li key={candidate.personId}><span>{candidate.rank}</span><div><strong>{person.name}</strong><small>{candidate.status}</small><p>{candidate.reason}</p></div></li> })}</SuccessionOrder>{succession.order.length === 0 && <p className="succession-empty">Nenhum herdeiro direto confirmado.</p>}</div>
    <section className="succession-claims"><div><h3>Pretendentes</h3>{claimList(succession.pretenders, 'Nenhum pretendente público ativo.')}</div><div><h3>Excluídos</h3>{claimList(succession.excluded, 'Nenhuma exclusão nominal publicada.')}</div><div><h3>Casamentos relevantes</h3><ul>{succession.marriages.map((entry) => <li key={entry}>{entry}</li>)}</ul></div><div><h3>Crises possíveis</h3><ul>{succession.possibleCrises.map((entry) => <li key={entry}>{entry}</li>)}</ul></div></section>
    {succession.disputes.length > 0 && <aside><h3>Pontos contestados</h3><ul>{succession.disputes.map((entry) => <li key={entry}>{entry}</li>)}</ul><p>{succession.secretClaimsStatus}</p></aside>}
    <footer><Link className="button button-secondary" to={`/genealogias/${succession.genealogyId}`}>Ver árvore relacionada</Link></footer>
  </SuccessionPanelFrame>
}

export default function SuccessionsPage({ realmMode = false }) {
  const { slug } = useParams()
  const selected = slug ? successions.find((entry) => entry.slug === slug) : null
  if (slug && !selected) return <Navigate to="/404" replace />
  const visible = selected ? [selected] : successions
  const crumbs = realmMode && selected
    ? [{ label: 'Reinos', to: '/reinos' }, { label: selected.realm, to: `/reinos/${selected.slug}` }, { label: 'Sucessão' }]
    : [{ label: 'Sucessões', to: selected ? '/sucessoes' : undefined }, ...(selected ? [{ label: selected.name }] : [])]
  return <><SEO title={selected?.name ?? 'Sucessões'} description="Ordens sucessórias, regras e disputas políticas de Avernor." /><div className="page-masthead succession-masthead"><div className="content-section page-masthead-inner"><Breadcrumbs items={crumbs} /><SectionTitle kicker="Quem governa depois" title={selected?.name ?? 'Linhas de sucessão'} description="Sangue é apenas uma parte: conselhos, juramentos, ofício e dívidas públicas decidem legitimidade." as="h1" /></div></div><section className="content-section succession-grid">{visible.map((succession) => <SuccessionPanel key={succession.id} succession={succession} />)}</section></>
}
