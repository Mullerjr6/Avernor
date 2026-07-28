import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import TruthBadge from '../components/TruthBadge'
import { searchIndex } from '../data/catalogs'
import { normalizeText, searchableText, uniqueValues } from '../utils/text'

const filterDefinitions = [
  ['collectionLabel', 'Acervo'], ['category', 'Categoria'], ['region', 'Região'],
  ['era', 'Era'], ['race', 'Povo'], ['status', 'Estado'], ['lineage', 'Linhagem'],
  ['house', 'Casa'], ['relationType', 'Relação'], ['war', 'Guerra'], ['period', 'Período'],
  ['kingdom', 'Reino'], ['character', 'Personagem'], ['sourceType', 'Tipo de fonte'],
  ['sourceReliability', 'Confiabilidade'],
]
const pageSize = 36

function includesFilter(item, key, selected) {
  if (!selected) return true
  const value = item[key]
  if (Array.isArray(value)) return value.some((entry) => String(entry) === selected)
  return String(value ?? '') === selected
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('pagina')) || 1)
  const selectedFilters = Object.fromEntries(filterDefinitions.map(([key]) => [key, params.get(key) ?? '']))

  const filtered = useMemo(() => {
    const tokens = normalizeText(query.trim()).split(/\s+/).filter(Boolean)
    return searchIndex.filter((item) => {
      if (tokens.length && !tokens.every((token) => searchableText(item).includes(token))) return false
      return filterDefinitions.every(([key]) => includesFilter(item, key, selectedFilters[key]))
    })
  }, [query, selectedFilters])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pages)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function setParam(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'pagina') next.delete('pagina')
    setParams(next, { replace: true })
  }

  function clearFilters() {
    setParams(query ? { q: query } : {}, { replace: true })
  }

  return (
    <>
      <SEO title="Busca no Arquivo" description="Consulte pessoas, linhagens, reinos, guerras, fontes, rotas e lugares do Arquivo de Avernor." />
      <div className="page-masthead search-page-masthead">
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: 'Busca' }]} />
          <SectionTitle kicker="Índice remissivo" title="Busca em todo o Arquivo" description="A consulta cruza apenas conhecimento publicável e permite reduzir o acervo por procedência, época, território e confiabilidade." as="h1" />
        </div>
      </div>
      <section className="content-section archive-search-page">
        <form className="archive-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="archive-search-query">Termo de busca</label>
          <div><input id="archive-search-query" type="search" value={query} onChange={(event) => setParam('q', event.target.value)} placeholder="Nome, título, batalha, cidade, rota…" autoComplete="off" /><span aria-hidden="true">⌕</span></div>
        </form>
        <div className="archive-filter-layout">
          <aside className="archive-search-filters" aria-label="Filtros da busca">
            <header><h2>Refinar consulta</h2><button type="button" onClick={clearFilters}>Limpar</button></header>
            {filterDefinitions.map(([key, label]) => {
              const values = uniqueValues(searchIndex, key)
              if (!values.length) return null
              return <label key={key}>{label}<select value={selectedFilters[key]} onChange={(event) => setParam(key, event.target.value)}><option value="">Todos</option>{values.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            })}
          </aside>
          <div className="archive-search-results">
            <header aria-live="polite"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'registro encontrado' : 'registros encontrados'}</p>{query && <span>Consulta: “{query}”</span>}</header>
            {visible.length ? <div className="search-record-list">{visible.map((item) => <article key={`${item.href}-${item.id}`}>
              <div><span className="kicker">{item.collectionLabel}{item.category ? ` · ${item.category}` : ''}</span><TruthBadge status={item.truthStatus} compact /></div>
              <h2><Link to={item.href}>{item.name}</Link></h2>
              {item.subtitle && <p className="search-record-subtitle">{item.subtitle}</p>}
              <p>{item.summary ?? item.description ?? 'Registro indexado sem resumo público.'}</p>
              <Link className="text-link" to={item.href}>Consultar registro <span>→</span></Link>
            </article>)}</div> : <EmptyState title="Nenhum registro corresponde à consulta." description="Altere o termo ou remova um dos filtros para ampliar o índice." actionLabel="Limpar filtros" onAction={clearFilters} />}
            {pages > 1 && <nav className="search-pagination" aria-label="Páginas dos resultados">
              <button type="button" disabled={currentPage <= 1} onClick={() => setParam('pagina', currentPage - 1)}>← Anterior</button>
              <span>Página {currentPage} de {pages}</span>
              <button type="button" disabled={currentPage >= pages} onClick={() => setParam('pagina', currentPage + 1)}>Próxima →</button>
            </nav>}
          </div>
        </div>
      </section>
    </>
  )
}
