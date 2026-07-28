import { Link } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import ImageWithFallback from '../components/ImageWithFallback'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { religions } from '../content'
import { truthStatuses } from '../content/taxonomies'

const cultures = [
  { name: 'Sylvaris', text: 'Memória coletiva, manejo cuidadoso da floresta e autoridade dividida entre coroa e círculos de ofício.' },
  { name: 'Kar-Dûm', text: 'Responsabilidade material: toda escavação responde por água, ar, estrutura, trabalho e reparo.' },
  { name: 'Winterfeld', text: 'Abrigo e juramento são valores inseparáveis; estoques públicos importam tanto quanto feitos militares.' },
  { name: 'Montanhas Cinzentas', text: 'Títulos representam dever temporário. Fortalezas cooperam durante crises sem entregar autonomia permanente.' },
]

export default function AboutPage() {
  return (
    <>
      <SEO title="Sobre o Arquivo" description="Princípios editoriais, cânone, povos, religiões e método da enciclopédia de Avernor." />
      <div className="page-masthead about-masthead">
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: 'Sobre' }]} />
          <SectionTitle kicker="Arquivo Real de Sylvaris" title="Uma enciclopédia que distingue memória de propaganda" description="O Arquivo reúne documentos, tradição oral e observação naturalista sem tratar toda versão como fato." as="h1" />
        </div>
      </div>
      <section className="content-section prose-page">
        <div className="prose-lede"><span className="kicker">Missão editorial</span><h2>Preservar as contradições sem criar incoerência.</h2><p>Quando fontes divergem, o registro informa a divergência. Quando um mapa contradiz o cânone, ele permanece disponível como carta histórica ou alternativa. A magia verdadeira pertence apenas às linhagens Kayler, Nimbus e Rivs; runas, ofícios e religiões não alteram essa regra.</p></div>
        <div className="principles-grid">
          <article><span>01</span><h3>Geografia tem efeito</h3><p>Clima, rios e relevo definem economia, arquitetura, alimentação e guerra.</p></article>
          <article><span>02</span><h3>Poder tem limite</h3><p>Magias, artefatos e cargos exigem custo, condição ou responsabilidade.</p></article>
          <article><span>03</span><h3>Povos não são blocos</h3><p>Reinos e culturas possuem disputas internas, trabalho cotidiano e escolhas individuais.</p></article>
        </div>
        <section className="about-section archive-method-section">
          <SectionTitle kicker="Método do Arquivo" title="Todo fato informa a força de sua fonte" description="O selo de cada dossiê diferencia evidência convergente, testemunho, disputa, tradição, profecia e acesso restrito." />
          <div className="truth-ledger">{Object.entries(truthStatuses).map(([code, truth]) => <article key={code}><span className={`truth-swatch truth-${truth.tone}`} aria-hidden="true" /><div><h3>{truth.label}</h3><p>{truth.description}</p></div></article>)}</div>
          <p className="archive-boundary-note"><strong>Limite editorial:</strong> o acervo público registra a existência de lacunas sem publicar notas reservadas do autor. “Desconhecido”, “perdido”, “contestado”, “não registrado” e “rumor” não são preenchimentos: são estados históricos verificáveis do registro.</p>
        </section>
        <section id="religioes" className="about-section"><SectionTitle kicker="Crenças e deveres" title="Religiões de Avernor" description="Tradições espirituais produzem instituições concretas; nenhuma concede magia hereditária." /><div className="text-card-grid religion-card-grid">{religions.map((religion) => <article key={religion.id}>{religion.thumbnail && <div className="religion-card-media"><ImageWithFallback src={religion.thumbnail} alt={`Ilustração de ${religion.name}`} fallback="default" /></div>}<div className="religion-card-copy"><span className="kicker">{religion.category}</span><h3>{religion.name}</h3><p>{religion.description}</p></div></article>)}</div><Link className="button button-secondary about-catalog-link" to="/religioes">Consultar o acervo religioso completo</Link></section>
        <section className="about-section"><SectionTitle kicker="Povos e culturas" title="Identidades moldadas pelo lugar" /><div className="text-card-grid">{cultures.map((culture) => <article key={culture.name}><h3>{culture.name}</h3><p>{culture.text}</p></article>)}</div></section>
        <section className="language-note"><div><span className="kicker">Idiomas</span><h2>Uma língua comum, muitas fronteiras</h2></div><p>O avérico de comércio conecta as grandes rotas, mas sotaques e vocabulários variam. O élfico silvano registra relações ecológicas com grande precisão; o khardun anão combina palavras para documentar materiais e responsabilidade; fortalezas Bellatrix usam cifras derivadas de inventários.</p></section>
        <section className="archive-cta"><h2>Comece pelo que deixou marcas no presente.</h2><div><Link className="button button-primary" to="/cronologia">Abrir cronologia</Link><Link className="button button-secondary" to="/biblioteca">Visitar biblioteca</Link></div></section>
      </section>
    </>
  )
}
