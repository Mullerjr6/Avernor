export default function OrnamentalDivider({ label = '' }) {
  return (
    <div className="ornamental-divider" aria-hidden="true">
      <span />
      <i>✦</i>
      {label && <em>{label}</em>}
      <i>✦</i>
      <span />
    </div>
  )
}

