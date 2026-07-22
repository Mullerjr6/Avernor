import { Link } from 'react-router-dom'
import EntityCard from '../components/EntityCard'
import ImageWithFallback from '../components/ImageWithFallback'
import OrnamentalDivider from '../components/OrnamentalDivider'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { characters, kingdoms, books, genealogies } from '../content'
import { assets } from '../data/assets'

export default function HomePage() {
  const sirius = characters.find((item) => item.id === 'sirius-kayler')
  const normus = characters.find((item) => item.id === 'normus-kayler')
  const namidia = characters.find((item) => item.id === 'namidia-bellatrix')
  const elara = characters.find((item) => item.id === 'elara')
  const sylvaris = kingdoms.find((item) => item.id === 'sylvaris')
  const legacyFigures = [normus, namidia, elara]

  return (
    <>
      <SEO image={assets.locations.ancientForestJourney} />
      <section className="home-hero">
        <ImageWithFallback className="home-hero-image" src={assets.locations.ancientForestJourney} alt="" loading="eager" fetchPriority="high" fallback="location" objectPosition="54% center" />
        <div className="home-hero-vignette" aria-hidden="true" />
        <span className="home-hero-corner home-hero-corner-left" aria-hidden="true" />
        <span className="home-hero-corner home-hero-corner-right" aria-hidden="true" />
        <div className="home-hero-content">
          <span className="kicker">O arquivo oficial do continente</span>
          <h1>As Crônicas<br /><em>de Avernor</em></h1>
          <p>Reinos ergueram muralhas. Bruxos mudaram guerras. Um filho herdou a última tempestade — e um pacto capaz de alterar o destino do continente.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/biblioteca/o-ultimo-bruxo">Começar a saga</Link>
            <Link className="button button-secondary" to="/atlas">Explorar o atlas</Link>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>Arquivo</span><strong>V</strong><small>Era atual</small></div>
        <a className="hero-scroll-cue" href="#arquivo-vivo"><span aria-hidden="true" />Explorar o arquivo</a>
      </section>

      <section id="arquivo-vivo" className="archive-intro content-section">
        <SectionTitle kicker="Enciclopédia viva" title="Todo registro deixa uma consequência" description="Avernor é documentado como um mundo habitado: clima altera economia, decisões antigas permanecem nas estradas e nenhum poder existe sem custo." align="center" />
        <dl className="archive-metrics">
          <div><dt>05</dt><dd>Eras documentadas</dd></div>
          <div><dt>07</dt><dd>Reinos e territórios</dd></div>
          <div><dt>03</dt><dd>Dragões conhecidos</dd></div>
          <div><dt>03</dt><dd>Linhagens bruxas</dd></div>
        </dl>
        <OrnamentalDivider label="Arquivo Real de Sylvaris" />
      </section>

      <section className="saga-feature">
        <div className="saga-portrait">
          <ImageWithFallback src={sirius.image} alt="Sirius Kayler com cabelos brancos trançados, olhos violetas e armadura escura" fallback="character" />
        </div>
        <div className="saga-copy">
          <span className="kicker">A saga de Sirius Kayler</span>
          <h2>O último bruxo conhecido não é uma arma à espera de um rei.</h2>
          <p>{sirius.description}</p>
          <ul className="feature-list">
            <li><span>01</span> Uma carta cifrada pelo pai</li>
            <li><span>02</span> Uma espada que conduz tempestades</li>
            <li><span>03</span> Um pacto élfico que exige escolha</li>
          </ul>
          <Link className="text-link" to="/personagens/sirius-kayler">Ler o registro completo <span>→</span></Link>
        </div>
      </section>

      <section className="legacy-section content-section">
        <div className="legacy-heading">
          <SectionTitle kicker="Sangue, juramento e escolha" title="O legado que cerca Sirius" description="Três vidas definem a herança que o último bruxo precisa aceitar, recusar ou transformar." />
          <p>Retratos preservados pelo Arquivo · Era das Coroas à Era atual</p>
        </div>
        <div className="legacy-portraits">
          {legacyFigures.map((figure, index) => (
            <Link key={figure.id} className={`legacy-portrait legacy-portrait-${index + 1}`} to={`/personagens/${figure.slug}`} style={{ '--entity-accent': figure.accent }}>
              <ImageWithFallback src={figure.image} alt={`Retrato oficial de ${figure.name}`} fallback="character" objectPosition={figure.thumbnailPosition || figure.objectPosition} />
              <span className="legacy-portrait-frame" aria-hidden="true" />
              <span className="legacy-portrait-index" aria-hidden="true">0{index + 1}</span>
              <div><small>{figure.category}</small><h3>{figure.name}</h3><p>{figure.subtitle}</p><b>Consultar dossiê →</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionTitle kicker="Portas de entrada" title="Explore o continente" description="Cada arquivo se conecta a pessoas, lugares e acontecimentos relacionados." />
        <div className="portal-grid portal-grid-expanded">
          <Link className="portal-card portal-history" to="/cronologia"><span>01</span><h2>Cinco eras</h2><p>Da ruptura da Coroa Una à Caça às Bruxas.</p></Link>
          <Link className="portal-card portal-map" to="/reinos"><span>02</span><h2>Sete territórios</h2><p>Fronteiras definidas por recursos, medo e alianças.</p></Link>
          <Link className="portal-card portal-lineage" to="/casas"><span>03</span><h2>Três linhagens</h2><p>Kayler, Nimbus e Rivs: magia verdadeira no sangue.</p></Link>
          <Link className="portal-card portal-bestiary" to="/bestiario"><span>04</span><h2>Bestiário</h2><p>Habitat, comportamento, ameaça e evidências.</p></Link>
          <Link className="portal-card portal-lineage" to="/genealogias"><span>05</span><h2>Genealogias</h2><p>{genealogies.length} árvores públicas, com ramos, lacunas documentais, dinastias e sucessões validadas.</p></Link>
          <Link className="portal-card portal-history" to="/cosmologia"><span>06</span><h2>Além do Véu</h2><p>Fraturas, mundos, Retornados, Relíquias e profecias.</p></Link>
        </div>
      </section>

      <section className="featured-records content-section">
        <SectionTitle kicker="Registros essenciais" title="No centro das crônicas" />
        <div className="entity-grid entity-grid-three">
          <EntityCard item={elara} to="/personagens/elara" placeholder="character" tone="portrait" index={1} />
          <EntityCard item={sylvaris} to="/reinos/sylvaris" placeholder="location" tone="kingdom" index={2} />
          <EntityCard item={books[0]} to="/biblioteca/o-ultimo-bruxo" placeholder="book" tone="library" index={3} />
        </div>
      </section>

      <section className="home-atlas-callout">
        <ImageWithFallback src={assets.maps.official} alt="Mapa oficial canônico do continente de Avernor, edição de 1204 d.C." fallback="location" />
        <div>
          <span className="kicker">Cartografia verificada</span>
          <h2>Do gelo de Winterfeld aos portos de Eldemar</h2>
          <p>Amplie o mapa, arraste a carta e consulte pontos posicionados sobre cidades e regiões reais da ilustração.</p>
          <Link className="button button-primary" to="/atlas">Abrir atlas interativo</Link>
        </div>
      </section>

      <figure className="quote-band">
        <blockquote>“O mundo chamou de monstros aqueles que antes chamava de heróis.”</blockquote>
        <figcaption>— Crônicas Perdidas de Sylvaris</figcaption>
      </figure>
    </>
  )
}
