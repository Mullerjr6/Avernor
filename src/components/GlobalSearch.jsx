import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchIndex } from '../data/catalogs'
import { normalizeText, searchableText } from '../utils/text'

export default function GlobalSearch({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const blurTimer = useRef()
  const results = useMemo(() => {
    const normalized = normalizeText(query.trim())
    if (normalized.length < 2) return []
    return searchIndex
      .filter((item) => searchableText(item).includes(normalized))
      .map((item) => {
        const name = normalizeText(item.name)
        const score = name === normalized ? 0 : name.startsWith(normalized) ? 1 : name.includes(normalized) ? 2 : 3
        return { item, score }
      })
      .sort((a, b) => a.score - b.score || a.item.name.localeCompare(b.item.name, 'pt-BR'))
      .map(({ item }) => item)
      .slice(0, 7)
  }, [query])

  function goToResult(item) {
    if (!item) return
    navigate(item.href)
    setQuery('')
    setFocused(false)
    setActiveIndex(0)
    onNavigate?.()
  }

  function submit(event) {
    event.preventDefault()
    goToResult(results[activeIndex] || results[0])
  }

  function handleKeyDown(event) {
    if (!results.length) {
      if (event.key === 'Escape') setFocused(false)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((current) => (current + direction + results.length) % results.length)
    }
    if (event.key === 'Escape') {
      setFocused(false)
      setActiveIndex(0)
    }
  }

  return (
    <form className="global-search" role="search" onSubmit={submit} onFocus={() => setFocused(true)} onBlur={() => {
      blurTimer.current = window.setTimeout(() => setFocused(false), 120)
    }}>
      <label htmlFor="global-search-input" className="sr-only">Pesquisar em todo o arquivo</label>
      <span className="search-glyph" aria-hidden="true">⌕</span>
      <input
        id="global-search-input"
        type="search"
        value={query}
        onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
        onKeyDown={handleKeyDown}
        placeholder="Buscar no arquivo…"
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls="global-search-results"
        aria-expanded={focused && query.trim().length >= 2}
        aria-activedescendant={results[activeIndex] ? `search-result-${activeIndex}` : undefined}
      />
      {query && <button type="button" className="search-clear" aria-label="Limpar busca" onClick={() => { setQuery(''); setActiveIndex(0) }}>×</button>}
      {focused && query.trim().length >= 2 && (
        <div id="global-search-results" className="search-suggestions" role="listbox" aria-label="Sugestões de busca" onMouseDown={() => window.clearTimeout(blurTimer.current)}>
          {results.length ? results.map((item, index) => (
            <Link
              id={`search-result-${index}`}
              key={`${item.href}-${item.id}`}
              to={item.href}
              role="option"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? 'active' : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => { setQuery(''); setFocused(false); setActiveIndex(0); onNavigate?.() }}
            >
              <span>{item.name}</span><small>{item.collectionLabel}<b aria-hidden="true">↗</b></small>
            </Link>
          )) : <p>Nenhum registro corresponde a “{query}”.</p>}
        </div>
      )}
    </form>
  )
}
