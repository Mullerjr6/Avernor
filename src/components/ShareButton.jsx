import { useState } from 'react'

export default function ShareButton({ title }) {
  const [message, setMessage] = useState('')

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href })
        setMessage('Compartilhado')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setMessage('Link copiado')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setMessage('Não foi possível copiar')
    }
    window.setTimeout(() => setMessage(''), 2400)
  }

  return <button type="button" className="share-button" onClick={share}>{message || 'Compartilhar registro'}</button>
}

