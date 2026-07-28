import { Link } from 'react-router'

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Trilha de navegação">
      <ol>
        <li><Link to="/">Início</Link></li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} aria-current={index === items.length - 1 ? 'page' : undefined}>
            {item.to && index !== items.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

