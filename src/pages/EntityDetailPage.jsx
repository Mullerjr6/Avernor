import { Link, Navigate, useParams } from 'react-router'
import ArchiveProvenance from '../components/ArchiveProvenance'
import Breadcrumbs from '../components/Breadcrumbs'
import EncyclopediaDossier, { FieldValue } from '../components/EncyclopediaDossier'
import ImageWithFallback from '../components/ImageWithFallback'
import OrnamentalDivider from '../components/OrnamentalDivider'
import PrimaryRecord from '../components/PrimaryRecord'
import RecordTableOfContents from '../components/RecordTableOfContents'
import RecordGallery from '../components/RecordGallery'
import SEO from '../components/SEO'
import ShareButton from '../components/ShareButton'
import TruthBadge from '../components/TruthBadge'
import { catalogs } from '../data/catalogs'
import { canonicalAtlasPoints } from '../data/canonicalMap'
import { visualFor } from '../data/visuals'
import { toAnchor } from '../utils/text'
import { isCharacterChatEnabled } from '../ai/characters/characterProfiles.js'

const factLabels = {
  status: 'Status', period: 'Período', era: 'Era', origin: 'Origem', location: 'Localização', kingdom: 'Reino',
  race: 'Povo ou raça', lineage: 'Linhagem', capital: 'Capital', symbol: 'Símbolo', government: 'Governo', economy: 'Economia',
  population: 'População', threat: 'Ameaça', habitat: 'Habitat', outcome: 'Resultado', traits: 'Traços', motto: 'Lema', leadership: 'Liderança', age: 'Idade',
  birthDate: 'Nascimento', apparentAge: 'Idade aparente', birthPlace: 'Local de nascimento', currentLocation: 'Localização atual',
  foundation: 'Fundação', climate: 'Clima', geography: 'Geografia', succession: 'Sucessão', religion: 'Religião',
}

function RecordListEntry({ value }) {
  if (value && typeof value === 'object') return <FieldValue value={value} />
  return value
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
  const itemIndex = catalog.items.indexOf(item)
  const previousItem = catalog.items[itemIndex - 1]
  const nextItem = catalog.items[itemIndex + 1]
  const recordRoute = `${catalog.path}/${item.slug}`
  const canTalk = catalogKey === 'personagens' && isCharacterChatEnabled(item.id)
  const atlasEntries = canonicalAtlasPoints.filter((point) => point.href === recordRoute || point.relatedRecords?.includes(recordRoute))
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
            alt={item.imageAlt || (hasImage ? `Ilustração de ${item.name}` : `Representação provisória de ${item.name}`)}
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
            {item.imageScope === 'thematic' && <p className="detail-visual-note">Prancha temática preservada pelo Arquivo; não constitui retrato individual canônico.</p>}
            {item.imageScope === 'regional' && <p className="detail-visual-note">Prancha regional baseada no testemunho cartográfico do Atlas oficial.</p>}
            <h1>{item.name}</h1>
            <p className="detail-subtitle">{item.subtitle}</p>
            <OrnamentalDivider />
            <p className="detail-summary">{item.summary}</p>
            {heroFacts.length > 0 && <dl className="detail-hero-facts">{heroFacts.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>)}</dl>}
            <div className="detail-actions">
              {canTalk && <Link className="button button-primary" to={`/personagens/${item.slug}/conversar`}>Conversar com {item.name}</Link>}
              <ShareButton title={`${item.name} — Crônicas de Avernor`} />
              <Link className="button button-ghost" to={catalog.path}>Voltar ao arquivo</Link>
            </div>
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
          <RecordTableOfContents item={item} listSections={listSections} hasAtlasEntry={atlasEntries.length > 0} />
        </aside>

        <div className="detail-content">
          <PrimaryRecord item={item} catalogKey={catalogKey} />
          <ArchiveProvenance item={item} />
          {item.appearance && <section id="aparencia"><span className="section-number">II</span><h2>Aparência documentada</h2><p>{item.appearance}</p></section>}
          <EncyclopediaDossier item={item} />
          <RecordGallery items={item.gallery} recordName={item.name} fallback={catalog.placeholder} />
          {item.sections?.map((section, index) => <section id={`secao-${toAnchor(section.title)}`} key={section.title}><span className="section-number">{String(index + 2).padStart(2, '0')}</span><h2>{section.title}</h2>{section.body && <p>{section.body}</p>}{section.items?.length > 0 && <ul className="record-list">{section.items.map((value, valueIndex) => <li key={typeof value === 'string' ? value : `${section.title}-${valueIndex}`}><RecordListEntry value={value} /></li>)}</ul>}</section>)}
          {listSections.map(([key, label], index) => (
            <section id={`lista-${key}`} key={key}>
              <span className="section-number">{String(index + (item.appearance ? 3 : 2)).padStart(2, '0')}</span><h2>{label}</h2>
              <ul className="record-list">{item[key].map((value, valueIndex) => <li key={typeof value === 'string' ? value : `${key}-${valueIndex}`}><RecordListEntry value={value} /></li>)}</ul>
            </section>
          ))}
          {item.quotes?.length > 0 && <blockquote className="record-quote">“{item.quotes[0]}”</blockquote>}
          {item.genealogyId && <section id="parentesco" className="lineage-callout"><span className="section-number">⌘</span><h2>Parentesco documentado</h2><p>A árvore pública preserva relações confirmadas e mostra lacunas sem revelar segredos do autor.</p><Link className="button button-secondary" to={`/genealogias/${item.genealogyId}`}>Abrir genealogia</Link></section>}
          {atlasEntries.length > 0 && <section id="posicao-no-atlas" className="atlas-record-callout"><span className="section-number">⌖</span><h2>Posição no Atlas oficial</h2><p>{atlasEntries.length === 1 ? 'Este registro possui uma posição pública na edição cartográfica de 1204 d.C.' : `Este registro se relaciona a ${atlasEntries.length} posições públicas na edição cartográfica de 1204 d.C.`}</p><div>{atlasEntries.map((point) => <Link key={point.id} to={`/atlas?ponto=${point.id}`}><strong>{point.name}</strong><small>{point.type} · {point.regionName}</small><span aria-hidden="true">→</span></Link>)}</div></section>}
          {item.relations?.length > 0 && (
            <section id="registros-relacionados" className="related-section">
              <span className="section-number">↗</span><h2>Registros relacionados</h2>
              <div className="related-links">{item.relations.map((relation) => <Link key={`${relation.to}-${relation.label}`} to={relation.to}>{relation.label}<span>→</span></Link>)}</div>
            </section>
          )}
          <nav className="record-pagination" aria-label={`Navegar pelos registros de ${catalog.label}`}>
            {previousItem ? <Link to={`${catalog.path}/${previousItem.slug}`}><small>Registro anterior</small><strong>← {previousItem.name}</strong></Link> : <span />}
            {nextItem && <Link to={`${catalog.path}/${nextItem.slug}`}><small>Próximo registro</small><strong>{nextItem.name} →</strong></Link>}
          </nav>
        </div>
      </div>
    </article>
  )
}
