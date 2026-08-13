export const DEFAULT_AI_MODEL = '@cf/qwen/qwen3-30b-a3b-fp8'

export class WorkersAiError extends Error {
  constructor(code, message, cause) {
    super(message, cause ? { cause } : undefined)
    this.name = 'WorkersAiError'
    this.code = code
  }
}

export function configuredAiModel(env) {
  return String(env?.AI_MODEL ?? DEFAULT_AI_MODEL).trim() || DEFAULT_AI_MODEL
}

function stripModelFormatting(value) {
  return String(value ?? '')
    .replace(/<think>[\s\S]*?<\/think>/giu, '')
    .replace(/^```(?:json)?\s*/iu, '')
    .replace(/\s*```$/u, '')
    .trim()
}

function parseJsonText(value) {
  const text = stripModelFormatting(value)
  if (!text) throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'Resposta vazia do modelo.')
  try {
    return JSON.parse(text)
  } catch {
    const firstBrace = text.indexOf('{')
    const lastBrace = text.lastIndexOf('}')
    if (firstBrace < 0 || lastBrace <= firstBrace) {
      throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'Resposta do modelo não contém JSON recuperável.')
    }
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1))
    } catch (cause) {
      throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'JSON retornado pelo modelo é inválido.', cause)
    }
  }
}

export function extractWorkersAiObject(payload) {
  if (payload?.response && typeof payload.response === 'object' && !Array.isArray(payload.response)) return payload.response
  if (typeof payload?.response === 'string') return parseJsonText(payload.response)
  const choiceContent = payload?.choices?.[0]?.message?.content
  if (choiceContent && typeof choiceContent === 'object' && !Array.isArray(choiceContent)) return choiceContent
  if (typeof choiceContent === 'string') return parseJsonText(choiceContent)
  if (typeof payload === 'string') return parseJsonText(payload)
  throw new WorkersAiError('INVALID_MODEL_OUTPUT', 'Formato de resposta do Workers AI não reconhecido.')
}

export async function runWorkersAiStructured({ env, messages, schema, maxTokens = 700, temperature = 0.6 }) {
  if (!env?.AI || typeof env.AI.run !== 'function') {
    throw new WorkersAiError('AI_BINDING_MISSING', 'Binding env.AI indisponível.')
  }
  const model = configuredAiModel(env)
  try {
    const payload = await env.AI.run(model, {
      messages,
      stream: false,
      temperature,
      max_tokens: maxTokens,
      response_format: {
        type: 'json_schema',
        json_schema: schema,
      },
    })
    return { data: extractWorkersAiObject(payload), model }
  } catch (error) {
    if (error instanceof WorkersAiError) throw error
    throw new WorkersAiError('WORKERS_AI_ERROR', 'Falha na inferência do Workers AI.', error)
  }
}

export function sanitizedError(error) {
  const code = error?.code ?? 'WORKERS_AI_ERROR'
  const message = String(error?.message ?? 'Falha desconhecida.').replace(/[\r\n\t]+/g, ' ').slice(0, 180)
  return { code, message }
}
