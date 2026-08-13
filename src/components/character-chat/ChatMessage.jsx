const emotionLabels = {
  attentive: 'atento',
  guarded: 'reservado',
  warm: 'acolhedor',
  amused: 'divertido',
  concerned: 'preocupado',
  firm: 'firme',
  reflective: 'reflexivo',
}

export default function ChatMessage({ message, characterName }) {
  const fromCharacter = message.role === 'assistant'
  return (
    <article className={`character-chat-message ${fromCharacter ? 'is-character' : 'is-reader'}`}>
      <header>
        <span>{fromCharacter ? characterName : 'Você'}</span>
        {fromCharacter && message.emotion && <small>{emotionLabels[message.emotion] ?? message.emotion}</small>}
      </header>
      {message.action && <p className="character-chat-action">{message.action}</p>}
      <div className="character-chat-prose">
        {message.text.split(/\n{2,}/).map((paragraph, index) => <p key={`${message.id}-${index}`}>{paragraph}</p>)}
      </div>
    </article>
  )
}
