import { useState } from 'react'
import { parsePlayerInput } from '../engine/playerInput.js'

function StoryEntry({ entry }) {
  if (entry.type === 'scene-divider') {
    return (
      <div className="story-scene-divider">
        <span>{entry.speaker}</span>
        <strong>{entry.text}</strong>
      </div>
    )
  }
  if (entry.type === 'player') {
    return <article className="story-entry player-entry"><span>SIRIUS — FALA</span><p>{entry.text}</p></article>
  }
  if (entry.type === 'player-action') {
    return <article className="story-entry player-action-entry"><span>AÇÃO DE SIRIUS</span><p>{entry.text}</p></article>
  }
  if (entry.type === 'dialogue') {
    return (
      <article className={`story-entry npc-entry npc-${entry.speakerId}`}>
        <header><span>{entry.speaker}</span><i aria-hidden="true" /></header>
        <blockquote>{entry.text}</blockquote>
      </article>
    )
  }
  return (
    <article className={`story-entry narrator-entry ${entry.type === 'transition' ? 'is-transition' : ''}`}>
      <span>NARRADOR</span>
      <p>{entry.text}</p>
    </article>
  )
}

export default function DialoguePanel({ scene, history, busy, onDialogue }) {
  const [draft, setDraft] = useState('')
  const parsedDraft = parsePlayerInput(draft)

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

      <div className={`scene-direction ${scene.decisionScene ? 'is-decision' : ''}`}>
        <span>{scene.decisionScene ? 'A DECISÃO É SUA' : 'A CENA PERMANECE ABERTA'}</span>
        <p>{scene.decisionScene ? 'Escreva livremente como Sirius intervém. A história reconhecerá palavra, estratégia, magia ou confronto sem oferecer botões de destino.' : scene.objective}</p>
      </div>

      <div className="story-history" aria-live="polite" aria-label="História em curso">
        {history.map((entry) => <StoryEntry key={entry.id} entry={entry} />)}
        {busy && (
          <div className="narrative-thinking" role="status">
            <i /><i /><i />
            <span>A floresta, as testemunhas e as consequências respondem…</span>
          </div>
        )}
      </div>

      <form className="free-dialogue" onSubmit={submit}>
        <label htmlFor="sirius-dialogue"><span>Sirius</span><small>fala, intenção ou ação</small></label>
        <div>
          <textarea
            id="sirius-dialogue"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Escreva o que Sirius diz, tenta ou decide fazer..."
            maxLength={900}
            rows={3}
            disabled={busy}
          />
          <button type="submit" disabled={busy || !draft.trim()}>{busy ? 'NARRANDO…' : 'INTERVIR'}</button>
        </div>
        <div className={`action-syntax ${parsedDraft.hasActions ? 'is-detected' : ''}`} aria-live="polite">
          <span>{parsedDraft.hasActions ? `${parsedDraft.actions.length} AÇÃO${parsedDraft.actions.length > 1 ? 'ÕES' : ''} RECONHECIDA${parsedDraft.actions.length > 1 ? 'S' : ''}` : 'ASPAS DEFINEM UMA AÇÃO'}</span>
          <p>{parsedDraft.hasActions ? parsedDraft.actions.join(' · ') : 'Exemplo: "Sirius ergue a mão e invoca um raio"'}</p>
        </div>
        <small>{draft.length}/900 · ações entre aspas entram no cânone desta crônica; consequências continuam com o narrador</small>
      </form>
    </section>
  )
}
