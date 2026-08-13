import { useEffect, useRef } from 'react'
import ChatComposer from './ChatComposer'
import ChatMessage from './ChatMessage'

export default function CharacterChat({ character, conversation, busy, error, onSend, onRetry }) {
  const historyRef = useRef(null)

  useEffect(() => {
    const history = historyRef.current
    if (history) history.scrollTo({ top: history.scrollHeight, behavior: conversation.messages.length > 1 ? 'smooth' : 'auto' })
  }, [busy, conversation.messages.length])

  return (
    <section className="character-chat-panel" aria-labelledby="conversation-title">
      <header className="character-chat-panel-header">
        <div>
          <span className="kicker">Conversa preservada</span>
          <h2 id="conversation-title">Audiência com {character.name}</h2>
        </div>
        <span className="character-chat-live"><i aria-hidden="true" /> Presente</span>
      </header>

      <div ref={historyRef} className="character-chat-history" role="log" aria-live="polite" aria-relevant="additions" aria-busy={busy}>
        {conversation.messages.length === 0 && (
          <div className="character-chat-empty">
            <span aria-hidden="true">✦</span>
            <p>{character.name} aguarda a primeira palavra de Sirius.</p>
          </div>
        )}
        {conversation.messages.map((message) => <ChatMessage key={message.id} message={message} characterName={character.name} />)}
        {busy && (
          <div className="character-chat-thinking" role="status">
            <span /><span /><span />
            <p>{character.name} considera o que foi dito…</p>
          </div>
        )}
        {error && (
          <div className="character-chat-error" role="alert">
            <p>Esta resposta não pôde ser registrada. Sua mensagem continua preservada.</p>
            <button type="button" onClick={onRetry}>Tentar novamente</button>
          </div>
        )}
      </div>

      <ChatComposer disabled={busy} onSend={onSend} />
    </section>
  )
}
