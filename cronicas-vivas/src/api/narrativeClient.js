import { canonicalContext } from '../data/knowledge.js'
import { localReply } from '../engine/localNarrator.js'

const endpoint = import.meta.env.VITE_NARRATIVE_API_URL?.trim()

function hasValidNarrative(reply, participants) {
  if (!reply || typeof reply.narration !== 'string' || !reply.narration.trim()) return false
  if (!Array.isArray(reply.dialogue) || !reply.dialogue.length) return false
  return reply.dialogue.every(({ speakerId, text }) => participants.includes(speakerId) && typeof text === 'string' && text.trim())
}

export async function requestNarrativeReply({ text, state, scene }) {
  if (!endpoint) return localReply({ text, state, scene })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60_000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        chapterId: state.chapterId,
        sceneId: scene.id,
        beat: state.beat,
        playerText: text,
        directorContext: {
          title: scene.title,
          location: scene.location,
          objective: scene.objective,
          participants: scene.participants,
          beats: scene.beats,
          allowedSignals: scene.allowedSignals,
          constraints: scene.constraints,
        },
        state: {
          flags: state.flags,
          inventory: state.inventory,
          relationships: state.relationships,
          discovered: state.discovered,
          completedBeats: state.completedBeats,
          storyMemories: state.storyMemories,
          playerActions: state.playerActions,
          memoryState: state.memoryState,
          recentHistory: state.recentHistory,
          summary: state.summary,
        },
        context: scene.participants.map((characterId) => canonicalContext(characterId, state.discovered)),
      }),
    })
    if (!response.ok) throw new Error(`Narrative API returned ${response.status}`)
    const reply = await response.json()
    if (!hasValidNarrative(reply, scene.participants)) throw new Error('Invalid narrative response')
    return { ...reply, source: 'workers-ai' }
  } catch (error) {
    console.warn('Narrador remoto indisponível; usando o Diretor canônico local.', error)
    return { ...localReply({ text, state, scene }), fallback: true }
  } finally {
    clearTimeout(timeout)
  }
}
