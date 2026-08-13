const normalize = (text) => text
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-BR')
  .replace(/[^a-z0-9\s']/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const intentCatalog = [
  { id: 'pact', label: 'o pacto e a liberdade dos descendentes', strongTerms: ['pacto', 'medalhao'], terms: ['promessa', 'descendente', 'obrigacao', 'casamento', 'destino'] },
  { id: 'aelwen', label: 'Aelwen e os segredos da rainha', strongTerms: ['aelwen'], terms: ['rainha', 'sua tia', 'tua tia', 'tia'] },
  { id: 'raven', label: 'a forma de corvo de Sirius', strongTerms: ['corvo', 'metamorfose'], terms: ['penas', 'asa', 'transform*', 'forma animal'] },
  { id: 'capture', label: 'a captura e o medo de Elara', terms: ['captura', 'capturada', 'prenderam', 'amarrada', 'grito', 'gritou', 'indefesa', 'medo', 'clareira'] },
  { id: 'orcs', label: 'os mercenários orcs e suas escolhas', terms: ['orc', 'orcs', 'mercenario', 'mercenarios', 'arvak', 'presas quebradas', 'poupar', 'matar'] },
  { id: 'conspiracy', label: 'o contratante desconhecido', terms: ['contrato', 'contratante', 'mandante', 'mascara', 'sete raizes', 'quem pagou', 'traidor', 'traicao', 'emboscada'] },
  { id: 'dagger', label: 'a Adaga do Passo Velado', terms: ['adaga', 'passo velado', 'teleporte', 'teletransporte', 'salto', 'ferro meteorico'] },
  { id: 'storm', label: 'Fulgarion e a tempestade Kayler', terms: ['fulgarion', 'espada', 'raio', 'tempestade', 'trovao', 'magia', 'poder'] },
  { id: 'namidia', label: 'Namídia e a memória de Sirius', terms: ['namidia', 'minha mae', 'sua mae', 'tua mae', 'bellatrix'] },
  { id: 'normus', label: 'Normus e a herança de Sirius', terms: ['normus', 'meu pai', 'seu pai', 'teu pai', 'carta'] },
  { id: 'elaraFamily', label: 'a família e a sucessão de Elara', terms: ['caelir', 'lyssara', 'maeriel', 'irmas', 'familia', 'herdeira', 'sucessao', 'coroa'] },
  { id: 'trust', label: 'a confiança entre Sirius e Elara', strongTerms: ['confi*', 'confianca'], terms: ['mentira', 'verdade', 'segredo', 'acreditar', 'sincera', 'sincero'] },
  { id: 'relationship', label: 'os sentimentos entre Sirius e Elara', strongTerms: ['amor', 'amar', 'romance'], terms: ['gosta', 'sentimento', 'beijo', 'nos dois', 'entre nos', 'juntos', 'amizade'] },
  { id: 'sylvaris', label: 'Sylvaris e a chegada ao reino élfico', terms: ['sylvaris', 'lethariel', 'reino elfico', 'cidade', 'fronteira', 'elfos', 'sentinelas'] },
  { id: 'age', label: 'a idade e o isolamento de Sirius', strongTerms: ['quinhentos', '500', 'idade', 'anos', 'seculos'], terms: ['velho', 'jovem', 'isolamento', 'sozinho', 'solidao'] },
  { id: 'choice', label: 'o direito de escolher o próprio caminho', terms: ['escolha', 'escolher', 'liberdade', 'decidir', 'decisao', 'autonomia', 'obrigar'] },
]

const toneCatalog = [
  { id: 'apology', terms: ['desculpa', 'desculpe', 'perdao', 'me perdoe', 'sinto muito'], delta: 1, memory: 'Sirius ofereceu um pedido de desculpas sem exigir perdão.' },
  { id: 'gratitude', terms: ['obrigado', 'agradeco', 'grato', 'gratidão'], delta: 1, memory: 'Sirius expressou gratidão diretamente a Elara.' },
  { id: 'vulnerability', terms: ['tenho medo', 'eu temo', 'me assusta', 'estou com medo', 'me sinto', 'nunca contei', 'confesso'], delta: 1, memory: 'Sirius permitiu que Elara visse uma vulnerabilidade pessoal.' },
  { id: 'care', terms: ['voce esta bem', 'esta ferida', 'posso ajudar', 'quero ajudar', 'se cuide', 'preocupado com voce'], delta: 1, memory: 'Sirius demonstrou preocupação com o estado de Elara.' },
  { id: 'respect', terms: ['eu respeito', 'confio em voce', 'acredito em voce', 'a escolha e sua', 'voce decide'], delta: 1, memory: 'Sirius reconheceu a autonomia de Elara em suas próprias palavras.' },
  { id: 'threat', terms: ['vou matar', 'eu mato', 'vai morrer', 'te obrigo', 'cale a boca', 'nao me desafie', 'destruirei'], delta: -1, memory: 'Sirius usou ameaça ou coerção durante a conversa.' },
  { id: 'accusation', terms: ['voce mente', 'mentirosa', 'culpa sua', 'nao confio em voce', 'traidora', 'voce me usou'], delta: -1, memory: 'Sirius acusou Elara diretamente e aumentou a tensão entre ambos.' },
]

function scoreEntry(text, tokens, entry) {
  const termScore = (term, weight) => {
    if (term.includes(' ')) return text.includes(term) ? weight : 0
    if (term.endsWith('*')) {
      const prefix = term.slice(0, -1)
      return [...tokens].some((token) => token.startsWith(prefix)) ? weight : 0
    }
    return tokens.has(term) ? weight : 0
  }
  return (entry.strongTerms ?? []).reduce((score, term) => score + termScore(term, 6), 0)
    + entry.terms.reduce((score, term) => score + termScore(term, term.includes(' ') ? 4 : 2), 0)
}

export function interpretPlayerDialogue(text, state, scene) {
  const normalized = normalize(text)
  const tokens = new Set(normalized.split(' ').filter(Boolean))
  const scoredIntents = intentCatalog
    .map((intent) => ({ ...intent, score: scoreEntry(normalized, tokens, intent) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  let intents = scoredIntents.slice(0, 2)
  const recentTurn = state.dialogueMemory?.at(-1)
  const recentIntent = recentTurn?.intent
  const isContinuation = /^(e |mas |entao |por que|porque|como assim|continue|e se|isso |ela |ele )/.test(normalized)
  if (!intents.length && isContinuation && recentIntent) {
    const pronounPointsToPerson = /\bela\b|\bdela\b/.test(normalized)
    const contextualIntent = pronounPointsToPerson && [recentTurn.intent, recentTurn.secondaryIntent].includes('aelwen')
      ? 'aelwen'
      : recentIntent
    const continued = intentCatalog.find(({ id }) => id === contextualIntent)
    if (continued) intents = [{ ...continued, score: 1 }]
  }

  const tone = toneCatalog
    .map((entry) => ({ ...entry, score: scoreEntry(normalized, tokens, entry) }))
    .sort((a, b) => b.score - a.score)[0]
  const effectiveTone = tone?.score > 0 ? tone : null
  const isQuestion = String(text).includes('?') || /^(quem|como|quando|onde|porque|por que|qual|o que|voce sabe|me diga)/.test(normalized)
  const isDeclaration = /^(eu |meu |minha |quero |nao quero|vou |prometo|acredito)/.test(normalized)

  const primary = intents[0] ?? { id: isContinuation && recentIntent ? recentIntent : 'open', label: 'o que Sirius decidiu expressar' }
  const secondary = intents[1] ?? null
  const memory = effectiveTone?.memory
    ?? (isDeclaration ? `Sirius falou de forma pessoal sobre ${primary.label}.` : null)

  return {
    normalized,
    intent: primary.id,
    secondaryIntent: secondary?.id ?? null,
    understoodLabel: secondary ? `${primary.label} e ${secondary.label}` : primary.label,
    tone: effectiveTone?.id ?? (isQuestion ? 'question' : isDeclaration ? 'personal' : 'neutral'),
    relationshipDelta: effectiveTone?.delta ?? 0,
    memory,
    isQuestion,
    sceneId: scene.id,
  }
}

export function intentLabel(intentId) {
  return intentCatalog.find(({ id }) => id === intentId)?.label ?? 'a conversa atual'
}
