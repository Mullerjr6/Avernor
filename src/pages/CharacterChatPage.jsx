import { useCallback, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import CharacterChat from '../components/character-chat/CharacterChat'
import ImageWithFallback from '../components/ImageWithFallback'
import SEO from '../components/SEO'
import { createCharacterConversation, addCharacterTurn, addUserTurn } from '../ai/characterEngine.js'
import { createLocalChatRepository } from '../ai/chatRepository.js'
import { requestCharacterReply } from '../ai/chatService.js'
import { getCharacterProfile, isCharacterChatEnabled } from '../ai/characters/characterProfiles.js'
import { getCanonicalCharacter } from '../ai/knowledgeService.js'

const relationshipLabels = {
  stranger: 'Primeiro contato', acquaintance: 'Conhecidos', ally: 'Aliados', friend: 'Amizade',
  close_friend: 'Confiança profunda', romantic_interest: 'Interesse afetivo', partner: 'Vínculo escolhido',
  rival: 'Rivalidade', enemy: 'Hostilidade',
}

const axisLabels = { affinity: 'Afinidade', trust: 'Confiança', respect: 'Respeito', romance: 'Afeto', tension: 'Tensão' }

function newConversation(character, profile, userId) {
  return createCharacterConversation({
    characterId: character.id,
    userId,
    conversationId: `${character.id}-${Date.now().toString(36)}`,
    greeting: profile.greeting,
  })
}

export default function CharacterChatPage() {
  const { slug } = useParams()
  const character = getCanonicalCharacter(slug)
  const profile = getCharacterProfile(slug)
  const repository = useMemo(() => createLocalChatRepository(), [])
  const userId = useMemo(() => repository.getUserId(), [repository])
  const [conversation, setConversation] = useState(() => (
    character && profile
      ? repository.load(userId, character.id) ?? newConversation(character, profile, userId)
      : null
  ))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [failedTurn, setFailedTurn] = useState(null)

  const completeTurn = useCallback(async (pendingConversation, message) => {
    setBusy(true)
    setError('')
    try {
      const reply = await requestCharacterReply({ characterId: character.id, message, conversation: pendingConversation })
      const completed = addCharacterTurn(pendingConversation, reply)
      setConversation(completed)
      repository.save(completed)
      setFailedTurn(null)
    } catch (requestError) {
      console.error('Falha ao registrar resposta do personagem.', requestError)
      setFailedTurn({ conversation: pendingConversation, message })
      setError('response_failed')
    } finally {
      setBusy(false)
    }
  }, [character, repository])

  if (!character || !profile || !isCharacterChatEnabled(slug)) {
    return <Navigate to="/404" replace state={{ requested: `/personagens/${slug}/conversar` }} />
  }

  function handleSend(message) {
    const pending = addUserTurn(conversation, message)
    setConversation(pending)
    repository.save(pending)
    completeTurn(pending, message)
  }

  function handleReset() {
    const shouldReset = window.confirm(`Apagar apenas a conversa local com ${character.name} e começar novamente?`)
    if (!shouldReset) return
    repository.remove(userId, character.id)
    const fresh = newConversation(character, profile, userId)
    repository.save(fresh)
    setConversation(fresh)
    setFailedTurn(null)
    setError('')
  }

  const visibleAxes = Object.entries(conversation.relationship)
    .filter(([axis]) => axisLabels[axis] && (axis !== 'romance' || profile.relationshipPolicy.romance))

  return (
    <div className="character-chat-page" style={{ '--character-accent': character.accent }}>
      <SEO
        title={`Conversar com ${character.name}`}
        description={`Conversa interpretativa de Sirius Kayler com ${character.name}, baseada nos registros públicos de Avernor.`}
        image={character.image || character.thumbnail}
      />
      <div className="character-chat-backdrop" aria-hidden="true" style={{ backgroundImage: `url(${character.image || character.thumbnail})` }} />
      <div className="character-chat-layout">
        <aside className="character-chat-identity">
          <Link className="character-chat-back" to={`/personagens/${character.slug}`}>← Voltar ao registro</Link>
          <div className="character-chat-portrait">
            <ImageWithFallback src={character.image || character.thumbnail} alt={`Retrato de ${character.name}`} fallback="characters" loading="eager" fetchPriority="high" />
          </div>
          <div className="character-chat-identity-copy">
            <span className="kicker">Personagem vivo</span>
            <h1>{character.name}</h1>
            <p>{character.subtitle}</p>
          </div>

          <section className="character-chat-relationship" aria-labelledby="relationship-title">
            <header>
              <span id="relationship-title">Vínculo atual</span>
              <strong>{relationshipLabels[conversation.relationship.relationshipStage] ?? conversation.relationship.relationshipStage}</strong>
            </header>
            <div className="relationship-axes">
              {visibleAxes.map(([axis, value]) => (
                <div key={axis} className={`relationship-axis relationship-axis-${axis}`}>
                  <span>{axisLabels[axis]}</span><small>{value}</small>
                  <i aria-hidden="true"><b style={{ width: `${value}%` }} /></i>
                </div>
              ))}
            </div>
          </section>

          <div className="character-chat-notice">
            <strong>Conversa não canônica</strong>
            <p>Você interpreta Sirius Kayler; a IA controla apenas {character.name}. Esta audiência e suas memórias não alteram a história oficial.</p>
          </div>
          <button className="character-chat-reset" type="button" onClick={handleReset}>Recomeçar esta conversa</button>
        </aside>

        <CharacterChat
          character={character}
          conversation={conversation}
          busy={busy}
          error={error}
          onSend={handleSend}
          onRetry={() => failedTurn && completeTurn(failedTurn.conversation, failedTurn.message)}
        />
      </div>
    </div>
  )
}
