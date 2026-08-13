import { canonicalContext } from '../data/knowledge.js'
import { localReply } from '../engine/localNarrator.js'

const endpoint = import.meta.env.VITE_NARRATIVE_API_URL?.trim()

export async function requestNarrativeReply({ text, state, scene, interpretation }) {
  if (!endpoint) return localReply({ text, state, scene, interpretation })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20_000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        chapterId: state.chapterId,
        sceneId: scene.id,
        sceneContext: {
          title: scene.title,
          location: scene.location,
          passage: scene.passage,
          consequence: state.pendingConsequence,
        },
        playerText: text,
        state: {
          flags: state.flags,
          inventory: state.inventory,
          relationships: state.relationships,
          discovered: state.discovered,
          recentConversation: (state.freeReplies[scene.id] ?? []).slice(-6),
          dialogueMemory: (state.dialogueMemory ?? []).slice(-12),
        },
        interpretation,
        context: canonicalContext('elara', state.discovered),
      }),
    })
    if (!response.ok) throw new Error(`Narrative API returned ${response.status}`)
    const reply = await response.json()
    if (!reply?.dialogue || !reply?.narration || reply.speaker !== 'ELARA') throw new Error('Invalid narrative response')
    return { ...reply, understoodLabel: interpretation.understoodLabel, source: 'openai' }
  } catch (error) {
    console.warn('Narrador remoto indisponível; usando o motor canônico local.', error)
    return { ...localReply({ text, state, scene, interpretation }), fallback: true }
  } finally {
    clearTimeout(timeout)
  }
}
