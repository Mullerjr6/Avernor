import { useState } from 'react'

export default function DialoguePanel({ scene, replies, choices, consequence, canFreeTalk, busy, onChoice, onFreeText }) {
  const [draft, setDraft] = useState('')

  function submit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || busy) return
    onFreeText(text)
    setDraft('')
  }

  return (
    <section className="dialogue-shell" aria-live="polite">
      <div className="dialogue-ornament" aria-hidden="true"><span />◆<span /></div>
      <header className="dialogue-header">
        <div>
          <span className="speaker">{scene.speaker}</span>
          <h2>{scene.title}</h2>
        </div>
        <span className="scene-kind">CONTO INTERATIVO</span>
      </header>

      {consequence && (
        <aside className="choice-consequence">
          <span>CONSEQUÊNCIA DA ESCOLHA</span>
          <strong>{consequence.choiceLabel}</strong>
          <p>{consequence.narration}</p>
        </aside>
      )}

      <div className="story-passage">
        {scene.passage.map((line, index) => (
          <div key={`${line.speaker}-${index}`} className={line.speaker === 'NARRADOR' ? 'story-line is-narrator' : 'story-line is-dialogue'}>
            {line.speaker !== 'NARRADOR' && <span>{line.speaker}</span>}
            <p>{line.text}</p>
          </div>
        ))}
      </div>

      {replies.length > 0 && (
        <div className="conversation-log" aria-label="Conversa livre desta cena">
          <p className="conversation-title">CONVERSA EM CURSO</p>
          {replies.map((reply, index) => (
            <div className="conversation-exchange" key={`${reply.playerText}-${index}`}>
              <div className="player-line"><span>SIRIUS</span><p>{reply.playerText}</p></div>
              {reply.narration && <div className="reply-narration"><span>NARRADOR</span><p>{reply.narration}</p></div>}
              <div className="elara-line">
                <div>
                  <span>ELARA</span>
                  {reply.understoodLabel && <small>ENTENDEU: {reply.understoodLabel}</small>}
                  {reply.source && <small>{reply.source === 'openai' ? 'IA CANÔNICA' : 'CÂNONE LOCAL'}</small>}
                </div>
                <p>{reply.dialogue}</p>
              </div>
              {reply.afterthought && <div className="reply-afterthought"><p>{reply.afterthought}</p></div>}
            </div>
          ))}
        </div>
      )}

      {canFreeTalk && (
        <form className="free-dialogue" onSubmit={submit}>
          <label htmlFor="player-dialogue">Fale livremente com Elara — ela lembrará do que for dito</label>
          <div>
            <textarea
              id="player-dialogue"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Pergunte, confronte, confesse ou responda com suas palavras..."
              maxLength={900}
              rows={3}
              disabled={busy}
            />
            <button type="submit" disabled={busy || !draft.trim()}>{busy ? 'Elara está pensando…' : 'Dizer'}</button>
          </div>
          <small>{draft.length}/900 · perguntas encadeadas usam as conversas anteriores</small>
        </form>
      )}

      <div className="choices" aria-label="Escolhas disponíveis">
        {choices.map((choice, index) => (
          <button key={choice.id} type="button" onClick={() => onChoice(choice.id)} disabled={busy}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {choice.label}
          </button>
        ))}
      </div>
    </section>
  )
}
