import { truthFor } from '../content/taxonomies'

export default function TruthBadge({ status, compact = false }) {
  const truth = truthFor(status)
  return <span className={`truth-badge truth-${truth.tone} ${compact ? 'truth-compact' : ''}`} title={truth.description}>{truth.label}</span>
}
