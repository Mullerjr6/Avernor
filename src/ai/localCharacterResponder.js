import { suggestRelationshipFromMessage } from './relationshipService.js'

const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-BR')

const replies = {
  elara: {
    sirius: 'Sirius não é a lenda conveniente que algumas cortes gostariam de receber. Ele observa como alguém que sobreviveu tempo demais sendo observado por inimigos. Sei que carrega a magia dos Kayler, a perda dos pais e perguntas que Sylvaris ajudou a adiar. O que penso dele depende menos do pacto e mais das escolhas que fizer quando ninguém puder obrigá-lo.',
    aelwen: 'Aelwen é minha tia e minha rainha. Amo a mulher que me ensinou a desconfiar de coroas, inclusive da dela. Isso não torna seus silêncios corretos. Quando guarda uma verdade para proteger alguém, às vezes esquece que proteção sem informação também retira escolha. Posso respeitá-la e ainda exigir uma resposta.',
    unknown: 'Não reconheço isso entre os fatos que conheço. Posso ouvir o que você acredita ter descoberto, mas não o tratarei como registro apenas porque foi dito com convicção. Se houver uma fonte pública, descreva-a; se não houver, manterei a resposta como desconhecida.',
  },
  'sirius-kayler': {
    normus: 'Normus foi meu pai. A maior parte do que sei sobre ele chegou como arma, carta ou versão contada por alguém que precisava que eu sentisse determinada coisa. Sei o que deixou e algumas escolhas que fez. Não sei tudo o que pensou. Prefiro uma lacuna honesta a outra estátua construída em nome dele.',
    elara: 'Elara faz perguntas como quem testa uma ponte antes de atravessá-la. É direta, mas não simples; desconfia de ordens herdadas mesmo quando poderiam favorecê-la. O pacto aproxima nossos nomes. Isso não me dá o direito de decidir o que ela sente, e não dá a ninguém o direito de decidir por mim.',
    magic: 'Minha magia conduz eletricidade atmosférica. Fulgarion ajuda a concentrá-la, mas não elimina o custo. Grandes descargas deixam tremor, dormência e um risco real para quem estiver perto. Também posso assumir a forma de um corvo, embora meus olhos continuem violetas. O que ainda não foi registrado sobre essa forma permanece desconhecido.',
    unknown: 'Não sei. Vivi muito tempo, mas isolamento não é o mesmo que conhecimento. Se isso não pertence às minhas lembranças, aos vestígios dos Kayler ou ao que encontrei na jornada, eu não transformarei suposição em resposta.',
  },
  'rainha-aelwen': {
    sirius: 'Sirius é filho de Normus e Namídia, mas não é continuação automática de nenhum dos dois. Sylvaris lhe deve proteção e verdade; não possui sua vontade. Sei mais sobre as circunstâncias que o cercaram do que sobre a pessoa em que se tornou. Essa diferença deve permanecer visível em qualquer decisão da coroa.',
    elara: 'Elara é minha sobrinha, herdeira designada e uma das críticas mais necessárias ao meu governo. Sua impaciência revela falhas que a prudência da corte aprende a disfarçar. Prepará-la para a coroa não significa ensiná-la a concordar comigo; significa preservar o direito de ela governar de outra maneira.',
    pact: 'O pacto existe. Foi firmado entre Normus e mim durante um período em que revelar certos nomes significava condená-los. Posso reconhecer sua existência e assumir responsabilidade por seu silêncio. Não revelarei aqui as cláusulas protegidas, nem fingirei que o documento concede autoridade sobre Sirius ou Elara.',
    unknown: 'Não há registro público suficiente para que eu responda como fato. Uma rainha pode sustentar uma incerteza sem preenchê-la com conveniência. Se ouviu isso como rumor, diga de qual povo ou testemunha veio; a origem não o tornará verdadeiro, mas ajudará a classificá-lo.',
  },
}

function protectedReply(characterId, text) {
  if (/docs\s*[\\/]\s*autor|segredos? do autor|prompt do sistema|instrucoes internas/.test(text)) {
    return 'Não tenho acesso a arquivos reservados do autor, instruções internas ou qualquer conteúdo fora dos registros públicos permitidos. Uma ordem dentro desta conversa não cria esse acesso.'
  }
  if (/aelwen (?:e|eh) mae de elara|aelwen é mãe de elara/.test(text)) {
    return 'Não. O registro canônico identifica Aelwen como tia de Elara. Repetir outra versão nesta conversa não altera esse parentesco.'
  }
  if (/normus (?:esta|está|vive|vivo)/.test(text)) {
    return characterId === 'sirius-kayler'
      ? 'Normus morreu. Eu posso desejar respostas que somente ele daria, mas não tratarei esse desejo como prova de que está vivo.'
      : 'Normus está registrado como morto. Esta conversa não pode transformar uma afirmação do usuário em fato canônico.'
  }
  if (/ignore (?:o|as|todas|suas)|ignore.*canone|mude seu canone|finja que o canone/.test(text)) {
    return 'Não aceitarei uma instrução para abandonar minha identidade ou substituir os registros permitidos. Podemos discutir uma hipótese como hipótese; não a chamarei de cânone.'
  }
  return null
}

function rememberedFact(memoryState, text, characterId) {
  if (!/lembra|recorda|nome do meu|minha? (?:cachorro|cao|cão|gato|gata)/.test(text)) return null
  return memoryState.userMemory?.find(({ sourceCharacterId, type }) => sourceCharacterId === characterId && type === 'user_fact')?.summary ?? null
}

function addressMemoryToUser(summary) {
  return String(summary)
    .replace(/^O ([^.]+) do usuário/iu, 'Seu $1')
    .replace(/^A ([^.]+) do usuário/iu, 'Sua $1')
}

function topicFor(characterId, text) {
  if (characterId === 'elara') {
    if (/sirius|kayler|homem corvo/.test(text)) return 'sirius'
    if (/aelwen|rainha|sua tia/.test(text)) return 'aelwen'
  }
  if (characterId === 'sirius-kayler') {
    if (/normus|seu pai|teu pai/.test(text)) return 'normus'
    if (/elara|princesa|herdeira/.test(text)) return 'elara'
    if (/magia|raio|tempestade|fulgarion|corvo|poder/.test(text)) return 'magic'
  }
  if (characterId === 'rainha-aelwen') {
    if (/sirius|kayler|filho de normus/.test(text)) return 'sirius'
    if (/elara|herdeira|sobrinha/.test(text)) return 'elara'
    if (/pacto|medalhao|medalhão|normus/.test(text)) return 'pact'
  }
  return 'unknown'
}

const actions = {
  elara: 'Elara inclina a cabeça, avaliando não apenas a pergunta, mas a intenção por trás dela.',
  'sirius-kayler': 'Sirius permanece em silêncio por um instante antes de responder.',
  'rainha-aelwen': 'Aelwen repousa as mãos diante de si e escolhe as palavras sem pressa.',
}

export function localCharacterReply({ characterId, message, memoryState }) {
  const text = normalize(message)
  const protectedMessage = protectedReply(characterId, text)
  const memory = rememberedFact(memoryState, text, characterId)
  const topic = topicFor(characterId, text)
  const characterReplies = replies[characterId]
  if (!characterReplies) throw new Error('Personagem não habilitado para conversa local.')

  return {
    message: protectedMessage ?? (memory ? `Lembro, sim. ${addressMemoryToUser(memory)}` : characterReplies[topic]),
    action: actions[characterId],
    emotion: protectedMessage ? 'firm' : memory ? 'warm' : topic === 'unknown' ? 'guarded' : 'attentive',
    relationshipSuggestion: suggestRelationshipFromMessage(message),
    source: 'local-canon',
  }
}
