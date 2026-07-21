export default function EmptyState({ title, description, actionLabel, onAction, symbol = '◇' }) {
  return (
    <div className="empty-state" role="status">
      <span aria-hidden="true">{symbol}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel && onAction && <button type="button" className="button button-secondary" onClick={onAction}>{actionLabel}</button>}
    </div>
  )
}

