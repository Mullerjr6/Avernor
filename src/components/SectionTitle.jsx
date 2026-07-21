export default function SectionTitle({ kicker, title, description, align = 'left', as = 'h2' }) {
  return (
    <header className={`section-title section-title-${align}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      {as === 'h1' ? <h1>{title}</h1> : <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </header>
  )
}
