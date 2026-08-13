import { useState } from 'react'

const MESSAGE_LIMIT = 1200

export default function ChatComposer({ disabled, onSend }) {
  const [value, setValue] = useState('')
  const canSend = value.trim().length > 0 && !disabled

  function submit(event) {
    event?.preventDefault()
    if (!canSend) return
    onSend(value.trim())
    setValue('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form className="character-chat-composer" onSubmit={submit}>
      <label htmlFor="character-message">Escreva com suas próprias palavras</label>
      <div className="character-chat-input-frame">
        <textarea
          id="character-message"
          value={value}
          maxLength={MESSAGE_LIMIT}
          rows="3"
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte, responda ou confie uma lembrança ao personagem…"
        />
        <div className="character-chat-composer-footer">
          <small>{value.length}/{MESSAGE_LIMIT} · Enter envia · Shift + Enter quebra a linha</small>
          <button className="button character-chat-send" type="submit" disabled={!canSend}>
            {disabled ? 'Aguardando…' : 'Enviar mensagem'}
          </button>
        </div>
      </div>
    </form>
  )
}
