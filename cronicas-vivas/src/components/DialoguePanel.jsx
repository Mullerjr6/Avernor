import { useState } from 'react'

function StoryEntry({ entry }) {
  if (entry.type === 'player') {
    return <div className="story-entry player-entry"><span>SIRIUS</span><p>{entry.text}</p></div>
  }
  if (entry.type === 'dialogue') {
    return (
      <div className={`story-entry npc-entry npc-${entry.speakerId}`}>
        <span>{entry.speaker}</span>
        <p>{entry.text}</p>
      </div>
    )
  }
  return (
    <div className={`story-entry narrator-entry ${entry.type === 'transition' ? 'is-transition' : ''}`}>
      <span>NARRADOR</span>
      <p>{entry.text}</p>
    </div>
  )
}

export default function DialoguePanel({ scene, history, busy, onDialogue }) {
  const [draft, setDraft] = useState('')

  function submit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || busy) return
    onDialogue(text)
    setDraft('')
  }

  return (
    <section className="dialogue-shell">
      <div className="dialogue-ornament" aria-hidden="true"><span />◆<span /></div>
      <header className="dialogue-header">
        <div>
          <span className="speaker">{scene.chapterNumber}</span>
          <h2>{scene.title}</h2>
        </div>
        <span className="scene-kind">CONTO INTERATIVO</span>
      </header>

      <div className="story-history" aria-live="polite" aria-label="História em curso">
        {history.map((entry) => <StoryEntry key={entry.id} entry={entry} />)}
        {busy && (
          <div className="narrative-thinking" role="status">
            <i /><i /><i />
            <span>As vozes da cena procuram a resposta certa…</span>
          </div>
        )}
      </div>

      <form className="free-dialogue" onSubmit={submit}>
        <label htmlFor="sirius-dialogue">Sirius</label>
        <div>
          <textarea
            id="sirius-dialogue"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Escreva as palavras de Sirius..."
            maxLength={900}
            rows={3}
            disabled={busy}
          />
          <button type="submit" disabled={busy || !draft.trim()}>{busy ? 'OUVINDO…' : 'DIZER'}</button>
        </div>
        <small>{draft.length}/900 · você controla apenas o que Sirius diz</small>
      </form>
    </section>
  )
}
