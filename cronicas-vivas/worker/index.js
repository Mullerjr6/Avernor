import { handleCharacterChat } from './characterChat.js'
import { handleNarrative } from './narrative.js'

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') ?? ''
  const allowed = (env.ALLOWED_ORIGINS ?? 'http://localhost:4174').split(',').map((item) => item.trim())
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  }
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env)
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    const url = new URL(request.url)
    if (request.method === 'POST' && url.pathname === '/api/character-chat') return handleCharacterChat(request, env, cors)
    if (request.method === 'POST' && url.pathname === '/api/narrative') return handleNarrative(request, env, cors)
    return Response.json({ error: 'Rota não encontrada.' }, { status: 404, headers: cors })
  },
}
