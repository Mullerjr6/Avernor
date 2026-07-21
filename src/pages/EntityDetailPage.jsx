import { Link, Navigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EncyclopediaDossier from '../components/EncyclopediaDossier'
import ImageWithFallback from '../components/ImageWithFallback'
import OrnamentalDivider from '../components/OrnamentalDivider'
import SEO from '../components/SEO'
import ShareButton from '../components/ShareButton'
import TruthBadge from '../components/TruthBadge'
import { catalogs } from '../data/catalogs'
import { visualFor } from '../data/visuals'

const factLabels = {
  status: 'Status', period: 'Período', era: 'Era', origin: 'Origem', location: 'Localização', kingdom: 'Reino',
  race: 'Povo ou raça', lineage: 'Linhagem', capital: 'Capital', symbol: 'Símbolo', government: 'Governo', economy: 'Economia',
  population: 'População', threat: 'Ameaça', habitat: 'Habitat', outcome: 'Resultado', traits: 'Traços', motto: 'Lema', leadership: 'Liderança', age: 'Idade',
  birthDate: 'Nascimento', apparentAge: 'Idade aparente', birthPlace: 'Local de nascimento', currentLocation: 'Localização atual',
  foundation: 'Fundação', climate: 'Clima', geography: 'Geografia', succession: 'Sucessão', religion: 'Religião',
}

export default function EntityDetailPage({ catalogKey }) {
  const { slug } = useParams()
  const catalog = catalogs[catalogKey]
  const item = catalog.items.find((entry) => entry.slug === slug)
  if (!item) return <Navigate to="/404" replace state={{ requested: `${catalog.path}/${slug}` }} />

  const facts = Object.entries(factLabels).filter(([key]) => item[key])
  const heroFacts = facts.filter(([key]) => ['status', 'period', 'currentLocation', 'location', 'kingdom', 'threat'].includes(key)).slice(0, 3)
  const hasImage = Boolean(item.image || item.thumbnail)
  const visual = visualFor(item)
  const listSections = [
    ['members', 'Membros conhecidos'], ['belligerents', 'Participantes'],
    ['methods', 'Métodos'], ['events', 'Acontecimentos'],
    ['causes', 'Causas'], ['phases', 'Fases'], ['consequences', 'Consequências'], ['civilianImpact', 'Impacto civil'],
    ['demographics', 'Povos e demografia'], ['laws', 'Leis e instituições'], ['military', 'Defesa'], ['internalConflicts', 'Conflitos internos'], ['dailyLife', 'Vida cotidiana'],
    ['inheritance', 'Herança e sinais'], ['vows', 'Juramentos'], ['survival', 'Sobrevivência da linhagem'], ['rivalries', 'Rivalidades'],
    ['curiosities', 'Notas dos cronistas'],
  ].filter(([key]) => item[key]?.length)

  return (
    <article className={`detail-page detail-page-${catalog.theme} ${hasImage ? 'has-hero-image' : 'has-placeholder-hero'}`} style={{ '--entity-accent': visual.accent || catalog.accent }}>
      <SEO title={item.name} description={item.summary} image={item.image || item.thumbnail} />
      <header className="detail-hero">
        <div className="detail-hero-media">
          <ImageWithFallback
            src={item.image || item.thumbnail}
            alt={hasImage ? `Ilustração de ${item.name}` : `Representação provisória de ${item.name}`}
            fallback={catalog.placeholder}
            loading="eager"
            fetchPriority="high"
            objectPosition={visual.heroPosition || item.objectPosition}
          />
        </div>
        <div className="detail-hero-shade" aria-hidden="true" />
        <div className="detail-hero-engraving" aria-hidden="true"><span>{catalog.glyph}</span></div>
        <div className="content-section detail-hero-content">
          <Breadcrumbs items={[{ label: catalog.label, to: catalog.path }, { label: item.name }]} />
          <div className="detail-identity">
            <div className="detail-classification"><span className="kicker">{item.category}</span><TruthBadge status={item.truthStatus} /></div>
            <h1>{item.name}</h1>
            <p className="detail-subtitle">{item.subtitle}</p>
            <OrnamentalDivider />
            <p className="detail-summary">{item.summary}</p>
            {heroFacts.length > 0 && <dl className="detail-hero-facts">{heroFacts.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>)}</dl>}
            <div className="detail-actions"><ShareButton title={`${item.name} — Crônicas de Avernor`} /><Link className="button button-ghost" to={catalog.path}>Voltar ao arquivo</Link></div>
          </div>
        </div>
      </header>

      <div className="content-section detail-layout">
        <aside className="detail-facts" aria-label="Ficha do registro">
          <span className="detail-facts-volume" aria-hidden="true">{catalog.glyph} · {item.id.slice(0, 3).toUpperCase()}</span>
          <h2>Ficha do arquivo</h2>
          <dl>
            {facts.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>)}
          </dl>
          <p className="archive-date">Atualizado em {new Intl.DateTimeFormat('pt-BR').format(new Date(`${item.updatedAt}T12:00:00`))}</p>
        </aside>

        <div className="detail-content">
          <section>
            <span className="section-number">I · Registro primário</span><h2>Registro</h2>
            <p className="dropcap">{item.description}</p>
          </section>
          {item.appearance && <section><span className="section-number">II</span><h2>Aparência documentada</h2><p>{item.appearance}</p></section>}
          <EncyclopediaDossier item={item} />
          {item.sections?.map((section, index) => <section key={section.title}><span className="section-number">{String(index + 2).padStart(2, '0')}</span><h2>{section.title}</h2>{section.body && <p>{section.body}</p>}{section.items?.length > 0 && <ul className="record-list">{section.items.map((value) => <li key={value}>{value}</li>)}</ul>}</section>)}
          {listSections.map(([key, label], index) => (
            <section key={key}>
              <span className="section-number">{String(index + (item.appearance ? 3 : 2)).padStart(2, '0')}</span><h2>{label}</h2>
              <ul className="record-list">{item[key].map((value) => <li key={value}>{value}</li>)}</ul>
            </section>
          ))}
          {item.quotes?.length > 0 && <blockquote className="record-quote">“{item.quotes[0]}”</blockquote>}
          {item.genealogyId && <section className="lineage-callout"><span className="section-number">⌘</span><h2>Parentesco documentado</h2><p>A árvore pública preserva relações confirmadas e mostra lacunas sem revelar segredos do autor.</p><Link className="button button-secondary" to={`/genealogias/${item.genealogyId}`}>Abrir genealogia</Link></section>}
          {item.relations?.length > 0 && (
            <section className="related-section">
              <span className="section-number">↗</span><h2>Registros relacionados</h2>
              <div className="related-links">{item.relations.map((relation) => <Link key={`${relation.to}-${relation.label}`} to={relation.to}>{relation.label}<span>→</span></Link>)}</div>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}
