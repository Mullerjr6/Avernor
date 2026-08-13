import { canonById } from '../data/knowledge.js'

const normalized = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR')

const topics = [
  {
    words: ['aelwen corvo', 'tia corvo', 'rainha corvo'],
    match: (question) => question.includes('corvo') && ['aelwen', 'tia', 'rainha'].some((word) => question.includes(word)),
    reply: () => 'Elara estreita os olhos, procurando na memória algo que não esteja contaminado por suposição. “Não sei se Aelwen conhecia especificamente sua forma de corvo. Ela sabia que Normus dominava práticas Kayler que nunca entraram nos arquivos públicos, mas nunca falou das suas formas.” Elara faz uma pausa. “Se minha tia previu que um corvo me encontraria, ocultou isso de mim. Se não previu, então o contratante da clareira talvez soubesse mais sobre você do que a própria rainha. As duas possibilidades me preocupam, e nenhuma está confirmada.”',
  },
  {
    words: ['pacto', 'promessa', 'normus', 'descendentes'],
    reply: ({ state }) => state.flags.medallionShown
      ? '“A outra metade do medalhão está com Aelwen. Sei que ela e Normus fizeram um pacto ligado a nós, mas não conheço as cláusulas completas. E não vou fingir que conheço.” Elara observa o metal antes de continuar. “Se houver ali uma ordem sobre nossas vidas, ela encontrará duas recusas. Se houver uma proteção, ainda teremos o direito de examinar o preço.”'
      : '“Sei que Normus e Aelwen fizeram uma promessa ligada aos descendentes de suas casas. Não conheço as palavras completas.” Elara sustenta o olhar de Sirius. “Minha tia chama o silêncio de prudência. Eu o chamo de uma decisão tomada sem nós. Não aceitarei transformar suspeita em certeza, mas também não aceitarei obedecer ao que ainda não pude ler.”',
  },
  {
    words: ['aelwen', 'rainha', 'sua tia', 'tua tia'],
    reply: () => '“Aelwen é minha tia, minha rainha e a pessoa que me ensinou a desconfiar de poder sem limites. Isso não significa que concordo com seus segredos.” Elara aperta os lábios por um instante. “Ela amava Normus como amigo e aliado; nisso os registros são claros. O que guardou depois da morte dele permanece reservado. Posso conduzi-lo até ela. Não posso prometer que gostaremos do que ouviremos.”',
  },
  {
    words: ['orcs', 'orc', 'mercenario', 'arvak', 'presas quebradas'],
    reply: ({ state }) => state.flags.orcBloodshed
      ? '“Aquele guerreiro pode ter se chamado Arvak. Os outros eram mercenários sem marcas de clã, não representantes de todos os orcs.” Elara olha para as próprias mãos. “Ele participou de minha captura e teria usado a lâmina. Também morreu por uma escolha nossa. Se contarmos apenas a primeira parte, fabricamos absolvição. Se contarmos apenas a segunda, fabricamos condenação. Precisamos carregar ambas.”'
      : '“Eles rasparam as marcas de clã e aceitaram um contrato sem nome. Isso os torna responsáveis pelo que fizeram, não torna Vul’Gar responsável por eles.” Elara recolhe um fio de prata partido. “O líder sabia costumes de dívida de estrada. Se o poupamos, essa escolha pode retornar como aviso ou nova ameaça. Ainda não sabemos qual. Misericórdia abre uma possibilidade; não oferece garantia.”',
  },
  {
    words: ['captura', 'prenderam', 'grito', 'indefesa', 'medo'],
    reply: () => 'Elara demora antes de responder. “Eu deixei uma pista falsa para encontrar quem removia meus marcadores. Achei que observariam de longe. Quando o ferro meteórico impediu o salto da adaga, percebi que alguém conhecia um registro de treino que deveria estar fechado.” Ela inspira devagar. “Gritei quando me atingiram. Tive medo de morrer sem que ninguém soubesse por quê. Você ouviu. Ainda estou aprendendo o que fazer com a gratidão e a raiva de ter precisado ser salva.”',
  },
  {
    words: ['corvo', 'transforma', 'metamorfose', 'penas'],
    reply: () => '“Seus olhos continuaram violetas na forma de corvo. Foi assim que soube que não era uma ilusão comum.” Elara inclina a cabeça, imitando sem perceber a curiosidade da ave. “Os bestiários élficos descrevem metamorfose do Eco, mas quase todos são fragmentários e misturam testemunho com perseguição. Não sei quanto tempo consegue permanecer assim, o que acontece com sua mente ou qual preço paga. Prefiro que você me conte a permitir que um arquivo decida por você.”',
  },
  {
    words: ['adaga', 'passo velado', 'teleporte', 'salto'],
    reply: () => '“A Adaga do Passo Velado dobra uma distância curta até um ponto que eu veja ou tenha marcado. Não atravessa ferro meteórico, não corrige um pouso ruim e retira calor do meu corpo.” Elara aquece os dedos contra a bainha. “Três saltos rápidos podem me deixar inconsciente. Os mercenários sabiam disso. Essa é a parte que importa: alguém fora da oficina ou da corte teve acesso aos limites exatos.”',
  },
  {
    words: ['fulgarion', 'espada', 'raio', 'tempestade', 'magia'],
    reply: ({ state }) => state.flags.sharedWeakness
      ? '“Você já me disse que a tempestade cobra de seus nervos. Vi o tremor em sua mão.” Elara não olha para Fulgarion, mas para Sirius. “Poder que apresenta uma conta ainda pode ser perigoso; poder que finge não ter custo é pior. Se lutarmos juntos outra vez, preciso saber quando seus dedos deixam de responder. Você precisará saber quando a adaga tiver levado meu último calor seguro.”'
      : '“Fulgarion conduz sua magia; não a cria. Reconheci os canais da lâmina pelas descrições de arquivo.” Elara observa a bainha marcada por reparos. “O que o registro não diz é quanto cada descarga lhe custa. Vi sua mão tremer depois da clareira. Se espera que eu lute ao seu lado, essa limitação não pode permanecer segredo até o momento em que falhar.”',
  },
  {
    words: ['namidia', 'sua mae', 'minha mae', 'mae'],
    reply: () => '“Os arquivos de Sylvaris falam pouco demais sobre Namídia Bellatrix. Dizem que organizou rotas, cifras e depósitos enquanto outros recebiam canções por batalhas.” A voz de Elara perde parte da dureza. “Aelwen pronuncia o nome dela com culpa, não apenas luto. Não sei o motivo. Sei que sua mãe desejava viver e criar você; reduzi-la ao sacrifício final seria roubá-la uma segunda vez.”',
  },
  {
    words: ['seu pai', 'teu pai', 'caelir', 'familia', 'irmas'],
    reply: () => '“Meu pai, Caelir, morreu quando eu ainda aprendia a distinguir dever de obediência. Tenho duas irmãs mais velhas, Lyssara e Maeriel. Os Círculos me escolheram como herdeira apesar delas.” Elara toca o fio de prata no pulso. “Nós nos amamos. Isso não impede que a sucessão nos fira, especialmente quando conselheiros tentam transformar diferenças em facções. Ser família não nos livra da política; apenas torna cada consequência mais pessoal.”',
  },
  {
    words: ['confiar', 'confianca', 'mentira', 'verdade', 'segredo'],
    reply: ({ state }) => {
      const bond = state.relationships.elara ?? 0
      if (bond >= 3) return '“Confio no que vi: você veio ao ouvir meu grito, aceitou dividir decisões e não tentou usar o resgate como corrente.” Elara deixa a frase respirar. “Não confio ainda em todos os seus silêncios, assim como você não deveria confiar em todos os meus vínculos com a coroa. Isso não diminui o que construímos. Torna a confiança uma prática, não um prêmio.”'
      if (bond < 0) return '“Você salvou minha vida, mas confiança não nasce automaticamente de uma dívida.” Elara fala sem hostilidade. “Há partes do seu nome que esconde, decisões que tomou sozinho e perguntas que evita. Posso caminhar ao seu lado enquanto observo. Se deseja mais que isso, não me peça fé. Dê-me escolhas verificáveis.”'
      return '“Ainda estamos medindo um ao outro.” Elara guarda a adaga devagar. “Eu lhe disse quem sou e o que não sei. Você mostrou poder e, em alguns momentos, limite. Confiança não será uma declaração feita nesta estrada. Será o que fizermos quando a próxima vantagem permitir que um decida pelo outro.”'
    },
  },
  {
    words: ['lethariel', 'sylvaris', 'reino elfico', 'cidade', 'fronteira'],
    reply: () => '“Sylvaris não separa reino e floresta. Os Círculos governam memória, ofícios e passagens; Aelwen governa com eles, não acima deles. Lethariel cresce entre raízes, margens e plataformas vivas.” Elara aponta para onde o caminho parece desaparecer. “Você não receberá acesso automático por carregar um medalhão. Também não será entregue à rainha como prisioneiro por minha ordem. Eu o conduzirei até uma escolha informada. É o máximo que posso prometer com honestidade.”',
  },
  {
    words: ['contrato', 'mandante', 'mascara', 'sete raizes', 'quem pagou'],
    reply: ({ state }) => state.flags.maskedIntermediaryKnown
      ? '“O intermediário usava máscara de madeira, altura humana, voz alterada e luvas com cheiro de remédio élfico. Isso é testemunho do mercenário ferido, não fato confirmado.” Elara enumera cada detalhe como se o registrasse. “Sabia que o corvo viria e que eu o levaria à rainha. Pode ser alguém da corte, alguém com acesso a um informante ou alguém plantando exatamente essa suspeita.”'
      : '“O contratante continua desconhecido. A cera, as moedas e a escrita foram escolhidas para apontar a vários reinos ao mesmo tempo.” Elara franze a testa. “Sabemos apenas que conhecia meus marcadores, a limitação da adaga e a passagem. Qualquer nome além disso seria rumor. Não entregarei um inocente à nossa necessidade de ter um culpado.”',
  },
  {
    words: ['gosta', 'sentimento', 'nos dois', 'destino', 'casamento', 'romance'],
    reply: () => 'Elara sustenta o olhar de Sirius por mais tempo do que pretendia. “Nenhum pacto decide meus sentimentos. Nenhuma profecia transforma duas pessoas em dívida uma da outra.” Ela então permite um sorriso breve. “Tenho curiosidade sobre você. Respeito algumas escolhas e ainda estou irritada com outras. Se isso se tornar amizade, amor, rivalidade ou apenas uma estrada compartilhada, será porque continuamos escolhendo — não porque nossos mortos escreveram antes.”',
  },
]

export function localReply({ text, state, scene }) {
  const question = normalized(text)
  const match = topics.find(({ words, match: customMatch }) => customMatch?.(question) || words.some((word) => question.includes(word)))
  if (match) return { speaker: 'ELARA', dialogue: match.reply({ state, scene }), emotion: 'earnest', source: 'local-canon' }

  const place = canonById[state.flags.reachedSylvaris ? 'lethariel' : 'floresta-antiga']
  return {
    speaker: 'ELARA',
    dialogue: `Elara considera a pergunta antes de responder. “Não tenho uma resposta segura sobre isso. O que sei vem do que testemunhamos em ${place.name} e dos registros aos quais tive acesso. Posso oferecer uma suspeita, se você a quiser como suspeita; não vou transformá-la em verdade apenas para preencher o silêncio.” Ela volta os olhos para Sirius. “Pergunte de outro modo, ou diga o que você acredita. Uma conversa não precisa fingir certeza para continuar.”`,
    emotion: 'uncertain',
    source: 'local-canon',
  }
}
