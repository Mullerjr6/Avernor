import { uniqueValues } from '../utils/text'

const labels = {
  category: 'Categoria', status: 'Status', location: 'Região', period: 'Período', era: 'Era',
  kingdom: 'Reino', race: 'Povo ou raça', lineage: 'Linhagem', threat: 'Nível de ameaça', origin: 'Origem',
}

export default function FilterBar({ items, filters, query, values, onQueryChange, onFilterChange, onClear }) {
  const available = filters
    .map((key) => ({ key, values: uniqueValues(items, key) }))
    .filter((filter) => filter.values.length > 1)

  const active = query || Object.values(values).some(Boolean)

  return (
    <div className="filter-panel" aria-label="Filtros do acervo">
      <label className="search-field">
        <span>Pesquisar neste arquivo</span>
        <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Digite um nome, local ou acontecimento" />
      </label>
      <div className="filter-selects">
        {available.map(({ key, values: options }) => (
          <label key={key}>
            <span>{labels[key] ?? key}</span>
            <select value={values[key] ?? ''} onChange={(event) => onFilterChange(key, event.target.value)}>
              <option value="">Todos</option>
              {options.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        ))}
      </div>
      {active && <button type="button" className="filter-clear" onClick={onClear}>Limpar filtros</button>}
    </div>
  )
}

