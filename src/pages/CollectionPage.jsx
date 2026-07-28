import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import ContentComparator from '../components/ContentComparator'
import EmptyState from '../components/EmptyState'
import EntityCard from '../components/EntityCard'
import FilterBar from '../components/FilterBar'
import ImageWithFallback from '../components/ImageWithFallback'
import OrnamentalDivider from '../components/OrnamentalDivider'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { catalogs } from '../data/catalogs'
import { normalizeText, searchableText } from '../utils/text'

export default function CollectionPage({ catalogKey }) {
  const catalog = catalogs[catalogKey]
  const [params, setParams] = useSearchParams()
  const query = params.get('busca') ?? ''
  const filterValues = Object.fromEntries(catalog.filters.map((key) => [key, params.get(key) ?? '']))

  const filtered = useMemo(() => {
    const normalized = normalizeText(query.trim())
    return catalog.items.filter((item) => {
      if (normalized && !searchableText(item).includes(normalized)) return false
      return catalog.filters.every((key) => !filterValues[key] || item[key] === filterValues[key])
    })
  }, [catalog, query, filterValues])

  function updateParam(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <div className={`catalog-page catalog-page-${catalog.theme}`} style={{ '--catalog-accent': catalog.accent }}>
      <SEO title={catalog.title} description={catalog.description} />
      <div className={`page-masthead catalog-masthead ${catalog.mastheadImage ? 'has-masthead-image' : ''}`}>
        {catalog.mastheadImage && <div className="catalog-masthead-media"><ImageWithFallback src={catalog.mastheadImage} alt="" loading="eager" fetchPriority="high" fallback={catalog.placeholder} /></div>}
        <div className="catalog-masthead-shade" aria-hidden="true" />
        <span className="catalog-watermark" aria-hidden="true">{catalog.glyph}</span>
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: catalog.label }]} />
          <SectionTitle kicker={catalog.kicker} title={catalog.title} description={catalog.description} as="h1" />
          <div className="catalog-ledger" aria-label="Informações do volume">
            <span>Volume {catalog.glyph}</span>
            <span>{String(catalog.items.length).padStart(2, '0')} registros</span>
            <span>Arquivo revisado</span>
          </div>
        </div>
      </div>
      <section className={`content-section collection-section collection-${catalogKey}`}>
        <FilterBar
          items={catalog.items}
          filters={catalog.filters}
          query={query}
          values={filterValues}
          onQueryChange={(value) => updateParam('busca', value)}
          onFilterChange={updateParam}
          onClear={() => setParams({}, { replace: true })}
        />
        <ContentComparator catalogKey={catalogKey} catalog={catalog} items={filtered} />
        <div className="collection-results-heading" aria-live="polite">
          <span>Lâminas consultáveis</span>
          <OrnamentalDivider />
          <p><strong>{String(filtered.length).padStart(2, '0')}</strong> {filtered.length === 1 ? 'registro encontrado' : 'registros encontrados'}</p>
        </div>
        {filtered.length ? (
          <div className={`entity-grid entity-grid-three entity-grid-${catalog.theme}`}>
            {filtered.map((item, index) => <EntityCard key={item.id} item={item} to={`${catalog.path}/${item.slug}`} placeholder={catalog.placeholder} tone={catalog.theme} index={index + 1} />)}
          </div>
        ) : (
          <EmptyState title="Nenhum registro atravessou estes filtros." description="Tente outro termo ou remova as seleções para consultar o arquivo completo." actionLabel="Limpar filtros" onAction={() => setParams({}, { replace: true })} />
        )}
      </section>
    </div>
  )
}
