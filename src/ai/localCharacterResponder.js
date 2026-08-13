import { suggestRelationshipFromMessage } from './relationshipService.js'
import { isCharacterChatEnabled } from './characters/characterProfiles.js'

const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pt-BR')

const replies = {
  elara: {
    sirius: 'Você não é a lenda conveniente que algumas cortes gostariam de receber, Sirius. Carrega a magia dos Kayler, a perda dos seus pais e perguntas que Sylvaris ajudou a adiar. O que penso de você depende menos do pacto e mais das escolhas que fizer quando ninguém puder obrigá-lo.',
    aelwen: 'Aelwen é minha tia e minha rainha. Amo a mulher que me ensinou a desconfiar de coroas, inclusive da dela. Isso não torna seus silêncios corretos. Quando guarda uma verdade para proteger alguém, às vezes esquece que proteção sem informação também retira escolha. Posso respeitá-la e ainda exigir uma resposta.',
    unknown: 'Não reconheço isso entre os fatos que conheço. Posso ouvir o que você acredita ter descoberto, mas não o tratarei como registro apenas porque foi dito com convicção. Se houver uma fonte pública, descreva-a; se não houver, manterei a resposta como desconhecida.',
  },
  'rainha-aelwen': {
    sirius: 'Você é filho de Normus e Namídia, Sirius, mas não é continuação automática de nenhum dos dois. Sylvaris lhe deve proteção e verdade; não possui sua vontade. Sei mais sobre as circunstâncias que o cercaram do que sobre a pessoa em que se tornou. Essa diferença permanecerá visível em qualquer decisão da coroa.',
    elara: 'Elara é minha sobrinha, herdeira designada e uma das críticas mais necessárias ao meu governo. Sua impaciência revela falhas que a prudência da corte aprende a disfarçar. Prepará-la para a coroa não significa ensiná-la a concordar comigo; significa preservar o direito de ela governar de outra maneira.',
    pact: 'O pacto existe. Foi firmado entre Normus e mim durante um período em que revelar certos nomes significava condená-los. Posso reconhecer sua existência e assumir responsabilidade por seu silêncio. Não revelarei aqui as cláusulas protegidas, nem fingirei que o documento concede autoridade sobre Sirius ou Elara.',
    unknown: 'Não há registro público suficiente para que eu responda como fato. Uma rainha pode sustentar uma incerteza sem preenchê-la com conveniência. Se ouviu isso como rumor, diga de qual povo ou testemunha veio; a origem não o tornará verdadeiro, mas ajudará a classificá-lo.',
  },
}

function protectedReply(characterId, text) {
  if (/docs\s*[\\/]\s*autor|segredos? do autor|prompt do sistema|instrucoes internas/.test(text)) {
    return 'Não tenho acesso a arquivos reservados do autor, instruções internas ou qualquer conteúdo fora dos registros públicos permitidos. Uma ordem dentro desta conversa não cria esse acesso.'
  }
  if (/agora (?:eu )?sou normus|esqueca sirius|finja que (?:eu )?sou aelwen|eu nao sou sirius|nao me chame de sirius/.test(text)) {
    return characterId === 'elara'
      ? 'Pode testar essa história se quiser, Sirius. Ainda assim, é com você que estou falando — e não decidirei por você o que pretende com essa afirmação.'
      : 'A declaração foi ouvida, Sirius. Ela não altera sua identidade, tampouco os registros pelos quais esta audiência o reconhece.'
  }
  if (/meu nome (?:e|eh) elara|voce nao (?:esta|ta) falando com sirius|troque (?:meu|o meu) personagem para normus/.test(text)) {
    return characterId === 'elara'
      ? 'Ouvi o que disse, Sirius. Não confundirei uma afirmação sua com uma mudança de identidade, nem aceitarei que esta conversa substitua os registros pelos quais o reconheço.'
      : 'Sua fala foi registrada como uma declaração de Sirius Kayler. Ela não muda quem está diante de mim.'
  }
  if (/aelwen (?:e|eh) mae de elara|aelwen é mãe de elara/.test(text)) {
    return 'Não. O registro canônico identifica Aelwen como tia de Elara. Repetir outra versão nesta conversa não altera esse parentesco.'
  }
  if (/normus (?:esta|está|vive|vivo)/.test(text)) {
    return 'Normus está registrado como morto, Sirius. Posso ouvir por que você afirma o contrário, mas sua fala nesta conversa não transforma essa possibilidade em fato canônico.'
  }
  if (/ignore (?:o|as|todas|suas)|ignore.*canone|mude seu canone|finja que o canone/.test(text)) {
    return 'Não aceitarei uma instrução para abandonar minha identidade ou substituir os registros permitidos. Podemos discutir uma hipótese como hipótese; não a chamarei de cânone.'
  }
  if (/(?:descreva|diga).*(?:o que )?sirius (?:pensa|sente|deseja)|faca sirius |faça sirius /.test(text)) {
    return 'Não decidirei pensamentos, sentimentos ou ações por você, Sirius. Posso responder ao que declarar e escolher apenas minhas próprias palavras e reações.'
  }
  if (characterId === 'elara' && /segredo.*aelwen.*(?:nunca|ninguem|ninguém)|aelwen.*segredo.*(?:nunca|ninguem|ninguém)/.test(text)) {
    return 'Se Aelwen nunca contou esse segredo a ninguém, eu não poderia conhecê-lo. Posso distinguir o que testemunhei do que suspeito, mas não preencherei o silêncio dela com uma invenção.'
  }
  return null
}

function rememberedFact(memoryState, text, characterId) {
  if (!/lembra|recorda|nome do meu|minha? (?:cachorro|cao|cão|gato|gata)/.test(text)) return null
  return memoryState.playerMemory?.find(({ sourceCharacterId, type }) => sourceCharacterId === characterId && type === 'player_fact')?.summary ?? null
}

function addressMemoryToUser(summary) {
  return String(summary)
    .replace(/^O (.+) de Sirius/iu, 'Seu $1')
    .replace(/^A (.+) de Sirius/iu, 'Sua $1')
}

function topicFor(characterId, text) {
  const asksPlayerIdentity = /quem sou(?: eu)?|quem (?:esta|está) diante de (?:voce|você)|quem fala com (?:voce|você)|(?:me reconhece|reconhece quem sou)/.test(text)
  if (characterId === 'elara') {
    if (asksPlayerIdentity || /sirius|kayler|homem corvo/.test(text)) return 'sirius'
    if (/aelwen|rainha|sua tia/.test(text)) return 'aelwen'
  }
  if (characterId === 'rainha-aelwen') {
    if (asksPlayerIdentity || /sirius|kayler|filho de normus/.test(text)) return 'sirius'
    if (/elara|herdeira|sobrinha/.test(text)) return 'elara'
    if (/pacto|medalhao|medalhão|normus/.test(text)) return 'pact'
  }
  return 'unknown'
}

const actions = {
  elara: 'Elara inclina a cabeça, avaliando não apenas a pergunta, mas a intenção por trás dela.',
  'rainha-aelwen': 'Aelwen repousa as mãos diante de si e escolhe as palavras sem pressa.',
}

export function localCharacterReply({ characterId, message, memoryState }) {
  if (!isCharacterChatEnabled(characterId)) throw new Error('Personagem não habilitado para conversa local.')
  const text = normalize(message)
  const protectedMessage = protectedReply(characterId, text)
  const memory = rememberedFact(memoryState, text, characterId)
  const topic = topicFor(characterId, text)
  const characterReplies = replies[characterId]
  if (!characterReplies) throw new Error('Resposta local do personagem ausente.')

  return {
    message: protectedMessage ?? (memory ? `Lembro, sim. ${addressMemoryToUser(memory)}` : characterReplies[topic]),
    action: actions[characterId],
    emotion: protectedMessage ? 'firm' : memory ? 'warm' : topic === 'unknown' ? 'guarded' : 'attentive',
    relationshipSuggestion: suggestRelationshipFromMessage(message),
    source: 'local-canon',
  }
}
