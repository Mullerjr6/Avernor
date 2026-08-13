export const CHAPTER_ID = 'capitulo-zero-o-grito-na-floresta'

const makeScene = ({ passage, choices = [], ...scene }) => ({
  ...scene,
  passage,
  text: passage.map(({ speaker, text }) => speaker === 'NARRADOR' ? text : `${speaker}: ${text}`).join('\n\n'),
  choices,
})

export const scenes = {
  departure: makeScene({
    id: 'departure', stage: 'forestRide', location: 'Estrada da Floresta Antiga', speaker: 'NARRADOR',
    title: 'A estrada sob as folhas', mood: 'quiet', discover: ['sirius-kayler', 'floresta-antiga'],
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius subiu no cavalo enquanto a manhã ainda era apenas uma claridade cinzenta entre as copas. Conferiu as correias, embainhou Fulgarion e tomou a estrada na direção do reino élfico. Não levava estandarte nem escolta — apenas a carta de Normus, o Medalhão da Folha Partida e perguntas acumuladas durante séculos.' },
      { speaker: 'NARRADOR', text: 'A Floresta Antiga conhecia o peso de seus passos. Galhos se inclinavam longe da trilha, raízes emergiam onde antes havia chão e a neblina apagava o caminho percorrido. Ainda assim, o cavalo avançava. Sirius aprendera que aquela mata não impedia toda passagem; ela examinava a intenção de quem insistia em atravessá-la.' },
      { speaker: 'NARRADOR', text: 'Então veio o grito. Feminino, breve e cortado no meio — não o chamado de alguém perdido, mas o som involuntário de quem tivera o ar arrancado dos pulmões. O cavalo empinou. Sirius desceu antes que os ecos morressem, prendeu as rédeas a um tronco baixo e tocou o pescoço do animal para acalmá-lo.' },
      { speaker: 'SIRIUS', text: 'Fique. Se eu não voltar antes do segundo trovão, procure a estrada de pedra.' },
      { speaker: 'NARRADOR', text: 'O corpo dele se desfez numa corrente de sombra e penas. Um corvo de olhos violetas ganhou altura entre os ramos e voou na direção da voz. Fulgarion permaneceu junto à sela; o céu carregado seria sua única arma.' },
    ],
    inventory: ['Carta cifrada de Normus', 'Medalhão da Folha Partida', 'Fulgarion'],
    flags: { leftShelter: true, ravenFormRevealed: true },
    choices: [
      { id: 'follow-scream', label: 'Seguir a voz por entre as copas', target: 'raven-sight' },
    ],
  }),

  'raven-sight': makeScene({
    id: 'raven-sight', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'Três guerreiros e uma prisioneira', mood: 'alert', portrait: 'orc',
    passage: [
      { speaker: 'NARRADOR', text: 'A mata se abriu abaixo dele. No centro da clareira, três orcs guerreiros cercavam uma jovem elfa. Um mantinha os braços dela presos às costas; outro recolhia fios de prata arrancados das raízes; o terceiro apontava uma lâmina larga para o lugar onde o pescoço encontrava o ombro.' },
      { speaker: 'NARRADOR', text: 'A garota estava sem arco e sem adaga. Havia barro nos joelhos, sangue no canto da boca e uma tranquilidade estranha no modo como observava cada adversário. Indefesa não significava vencida: o calcanhar direito procurava apoio, e seus olhos dourados contavam respirações.' },
      { speaker: 'NARRADOR', text: 'Os três usavam armaduras de campanhas diferentes e tinham raspado os sinais de clã. Aquilo importava. Não eram uma patrulha de Vul’Gar nem representantes de um povo; eram espadas contratadas que desejavam ocultar a quem respondiam.' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Mostre o caminho verdadeiro, elfa. A pessoa que pagou não precisa de você inteira. Precisa apenas que a floresta pare de mentir.' },
      { speaker: 'ELARA', text: 'Então ela pagou pouco. A floresta mente melhor quando está zangada.' },
    ],
    flags: { foundElara: true },
    choices: [
      { id: 'observe', label: 'Permanecer como corvo e ouvir o contratante', target: 'overhear', flags: { patientRescue: true } },
      { id: 'silent-release', label: 'Descer pelas sombras e alcançar as amarras', target: 'shadow-rescue', flags: { rescueApproach: 'shadow' } },
      { id: 'parley', label: 'Retomar a forma humana e exigir uma negociação', target: 'parley', flags: { rescueApproach: 'parley' } },
      { id: 'storm', label: 'Convocar a tempestade antes que a lâmina desça', target: 'storm-descent', flags: { rescueApproach: 'storm' } },
    ],
  }),

  overhear: makeScene({
    id: 'overhear', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'Palavras compradas', mood: 'guarded', portrait: 'orc',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius pousou num carvalho morto e se tornou imóvel. O orc mais alto retirou de uma bolsa um pedaço de couro marcado por carvão: uma árvore dividida em sete raízes, a terceira cortada. Não era brasão conhecido. O pagamento viera em moedas de diferentes reinos, deliberadamente misturadas.' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'O contrato dizia: encontre a guardiã dos fios de prata, tome o mapa vivo e deixe os olhos dela capazes de reconhecer uma porta. Não dizia princesa. Não dizia sentinela.' },
      { speaker: 'ORC DA CICATRIZ CLARA', text: 'Também não dizia que a mata engoliria dois dias de caminho. Pegamos a garota e saímos. Quem contratou que venha arrancar segredo de árvore.' },
      { speaker: 'ELARA', text: 'Se pretendem discutir o contrato até o anoitecer, afrouxem a corda. Minhas mãos estão ficando dormentes e eu gostaria de aplaudir a competência de vocês.' },
      { speaker: 'NARRADOR', text: 'O sarcasmo lhe rendeu um golpe curto, mas também fez o captor mudar a posição da mão. A abertura duraria uma respiração. Sirius podia transformá-la em fuga, rendição ou morte.' },
    ],
    flags: { heardContract: true },
    choices: [
      { id: 'free-now', label: 'Usar a abertura para romper as amarras', target: 'shadow-rescue', flags: { rescueApproach: 'shadow' } },
      { id: 'speak-from-trees', label: 'Falar sem revelar onde está', target: 'parley', flags: { rescueApproach: 'parley', knowsContract: true } },
      { id: 'controlled-thunder', label: 'Separá-los com um trovão controlado', target: 'storm-descent', flags: { rescueApproach: 'storm', knowsContract: true } },
    ],
  }),

  'shadow-rescue': makeScene({
    id: 'shadow-rescue', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'Asas entre lâminas', mood: 'urgent', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O corvo mergulhou atrás da prisioneira. Garras tocaram a corda, sombra tornou-se mão e Sirius recuperou a forma humana ajoelhado entre raízes. Um fio de eletricidade correu por seus dedos e queimou apenas o nó. As amarras cederam antes que os orcs compreendessem o que tinham visto.' },
      { speaker: 'ELARA', text: 'Minha adaga. À esquerda, junto da pedra branca.' },
      { speaker: 'SIRIUS', text: 'Consegue alcançá-la?' },
      { speaker: 'ELARA', text: 'Se você me der duas respirações.' },
      { speaker: 'NARRADOR', text: 'O primeiro guerreiro atacou. Sirius desviou sem espada, usando o antebraço para empurrar o punho da lâmina. Elara rolou por baixo de uma segunda investida. Restava decidir que tipo de salvamento aquela clareira testemunharia.' },
    ],
    flags: { bondsBroken: true },
    choices: [
      { id: 'give-elara-opening', label: 'Criar a abertura e deixar Elara recuperar a adaga', target: 'elara-counter', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'force-surrender', label: 'Imobilizar o líder e exigir que os outros se rendam', target: 'captive', flags: { choseRestraint: true } },
      { id: 'drive-away', label: 'Usar relâmpagos no chão para expulsá-los', target: 'rout', flags: { usedStorm: true } },
    ],
  }),

  parley: makeScene({
    id: 'parley', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'SIRIUS',
    title: 'Um homem no lugar do corvo', mood: 'guarded', portrait: 'orc',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius pousou entre a prisioneira e a mata. Penas recolheram-se em sombra; quando terminou de se erguer, era novamente um homem desarmado diante de três lâminas. Os orcs recuaram um passo. A elfa não. Ela o observou como se a transformação fosse apenas mais uma pergunta que precisaria ser feita depois.' },
      { speaker: 'SIRIUS', text: 'Soltem-na. Digam quanto receberam e saiam com o dinheiro, as armas e a vida.' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Você deixou sua espada na estrada, homem-corvo. Negocia com o quê?' },
      { speaker: 'SIRIUS', text: 'Com a certeza de que percebi a tempestade antes de vocês.' },
      { speaker: 'NARRADOR', text: 'O céu respondeu com um rumor distante. Não era ainda uma ameaça cumprida. Sirius podia apelar ao contrato, ao medo ou ao pouco de honra que sobrevivia em mercenários cansados.' },
    ],
    flags: { elaraSawTransformation: true },
    choices: [
      { id: 'name-false-contract', label: 'Mostrar que o contrato ocultou riscos e identidades', target: 'mercy', requires: { flags: { heardContract: true } }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'offer-exit', label: 'Oferecer uma retirada sem perseguição', target: 'mercy', flags: { negotiatedRelease: true } },
      { id: 'threaten', label: 'Fazer o raio atingir a pedra aos pés do líder', target: 'rout', flags: { usedStorm: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'seize-leader', label: 'Atacar quando o captor olhar para o céu', target: 'captive', flags: { choseRestraint: true } },
    ],
  }),

  'storm-descent': makeScene({
    id: 'storm-descent', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'O céu dentro da clareira', mood: 'urgent', portrait: 'sirius',
    passage: [
      { speaker: 'NARRADOR', text: 'O corvo abriu as asas e o ar respondeu. Nuvens que viajavam acima das copas comprimiram-se até que a clareira perdeu a cor. Sirius retomou a forma humana durante a queda, um joelho no barro, a mão direita aberta contra o chão.' },
      { speaker: 'NARRADOR', text: 'O primeiro raio atingiu uma raiz vazia. Terra e casca explodiram entre Elara e a lâmina que a ameaçava. Os três orcs perderam a formação; um caiu, outro ergueu o machado contra um inimigo que ainda não compreendia. A jovem elfa virou o rosto para proteger os olhos, mas não gritou novamente.' },
      { speaker: 'ELARA', text: 'Se pretende me salvar, Kayler desconhecido, tente deixar a floresta viva.' },
      { speaker: 'SIRIUS', text: 'Ainda não sabe quem eu sou.' },
      { speaker: 'ELARA', text: 'Não. Mas a árvore sabe o que um raio custa.' },
    ],
    flags: { elaraSawTransformation: true, usedStorm: true },
    choices: [
      { id: 'ground-charge', label: 'Conduzir a descarga pelas armas e forçar a rendição', target: 'captive', flags: { stormControlled: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'wall-lightning', label: 'Erguer uma parede de relâmpagos e expulsá-los', target: 'rout', flags: { forestScorched: true } },
      { id: 'lethal-strike', label: 'Atingir o captor antes que ele use Elara como escudo', target: 'blood-price', flags: { choseLethalForce: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
  }),

  'elara-counter': makeScene({
    id: 'elara-counter', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Duas respirações', mood: 'resolute', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius interceptou o machado com uma descarga curta, suficiente para paralisar dedos sem parar um coração. Elara usou a primeira respiração para alcançar a pedra branca. Na segunda, sua mão fechou-se sobre a Adaga do Passo Velado.' },
      { speaker: 'NARRADOR', text: 'Ela desapareceu num lampejo prateado e reapareceu atrás do arqueiro. O cabo da adaga atingiu a base do crânio. Antes que ele caísse, Elara já havia chutado a lâmina do terceiro guerreiro para longe.' },
      { speaker: 'ELARA', text: 'Acabou. Peguem o companheiro e saiam da minha floresta.' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Não é sua floresta enquanto alguém puder comprar o caminho.' },
      { speaker: 'ELARA', text: 'Então descubra quanto custa ser enterrado por uma árvore.' },
    ],
    flags: { elaraRecoveredDagger: true },
    choices: [
      { id: 'support-mercy', label: 'Sustentar a ordem de Elara e deixá-los partir', target: 'mercy', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'question-leader', label: 'Impedir a fuga até saber quem pagou', target: 'captive', flags: { choseRestraint: true } },
      { id: 'mark-fleeing', label: 'Deixá-los fugir, mas marcar o líder com magia', target: 'rout', flags: { markedOrcLeader: true } },
    ],
  }),

  mercy: makeScene({
    id: 'mercy', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'A dívida de uma vida poupada', mood: 'quiet', portrait: 'orc',
    passage: [
      { speaker: 'NARRADOR', text: 'Os orcs reuniram armas e orgulho ferido. O líder hesitou diante de Sirius, depois cortou do próprio bracelete uma conta de osso escuro e a deixou sobre uma pedra. Não era gratidão. Era o reconhecimento de uma dívida segundo um costume conhecido em algumas companhias de estrada de Vul’Gar.' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'A pessoa do contrato não deu nome. Usava luvas, falava élfico sem ser elfa e sabia onde os fios de prata seriam colocados. A conta compra uma resposta, homem-corvo. Apenas uma.' },
      { speaker: 'ELARA', text: 'E se nos encontrarmos outra vez?' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Então descobriremos se a resposta vale mais que o segundo pagamento.' },
      { speaker: 'NARRADOR', text: 'Eles desapareceram pela borda oriental. Elara esperou o último ruído morrer antes de recolher a conta. Seus dedos tremiam — raiva, frio ou o esforço de continuar em pé.' },
    ],
    flags: { orcsSpared: true, orcDebt: true },
    choices: [
      { id: 'ask-if-hurt-soft', label: 'Perguntar se Elara consegue respirar sem dor', target: 'first-words-soft', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'watch-departure', label: 'Manter os olhos na mata até ter certeza de que partiram', target: 'first-words-soft' },
    ],
  }),

  captive: makeScene({
    id: 'captive', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'A pergunta e o limite', mood: 'guarded', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O líder terminou de joelhos, o próprio cinto prendendo-lhe os pulsos. Os outros recuaram para além do alcance de Sirius. Elara recuperou a adaga, mas não a encostou na garganta do prisioneiro. Em vez disso, pegou o pedaço de couro do contrato.' },
      { speaker: 'ELARA', text: 'Quem descreveu meus marcadores?' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Uma voz atrás de um véu. Pagamento na estalagem do Carvalho Oco. Não vi rosto, selo ou mão descoberta. Isso é tudo que sei.' },
      { speaker: 'SIRIUS', text: 'E por que aceitar um contrato sem nome?' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Pela mesma razão que homens seguem reis que nunca viram: fome suficiente faz um desconhecido parecer autoridade.' },
      { speaker: 'NARRADOR', text: 'A resposta não o absolvia, mas tornava impossível fingir que a clareira continha apenas monstros e vítimas. Elara olhou para Sirius, entregando-lhe a decisão final sobre o homem que ele havia dominado.' },
    ],
    flags: { orcsCaptured: true, knowsContract: true },
    choices: [
      { id: 'release-after-answer', label: 'Libertá-lo depois da resposta', target: 'mercy', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'send-with-warning', label: 'Marcar o contrato e ordenar que leve um aviso ao mandante', target: 'rout', flags: { sentWarning: true } },
      { id: 'hand-to-elara', label: 'Entregar a decisão a Elara', target: 'mercy', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
    ],
  }),

  rout: makeScene({
    id: 'rout', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'Pegadas que não terminam', mood: 'alert', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Os três guerreiros recuaram sob o trovão e desapareceram entre samambaias esmagadas. Nenhum corpo ficou na clareira, mas a retirada não era rendição. Um deles recolheu o couro do contrato; outro assobiou duas vezes antes de sumir, sinal para alguém que podia estar longe demais para ser visto.' },
      { speaker: 'ELARA', text: 'Eles vão contar que um homem se transformou em corvo e fez o céu obedecer.' },
      { speaker: 'SIRIUS', text: 'Se eu os perseguisse, você continuaria amarrada.' },
      { speaker: 'ELARA', text: 'Não estou condenando a escolha. Estou nomeando o preço. Nesta floresta, o que escapa leva uma história consigo.' },
      { speaker: 'NARRADOR', text: 'Ela cortou a última volta de corda e massageou os pulsos. Entre os dois nasceu uma pausa que ainda não era confiança nem hostilidade: era a medida cuidadosa de quem acabara de sobreviver ao mesmo perigo por razões diferentes.' },
    ],
    flags: { orcsEscaped: true },
    choices: [
      { id: 'accept-price', label: 'Admitir que a perseguição agora é inevitável', target: 'first-words-tense', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'defend-choice', label: 'Responder que salvá-la importava mais que o sigilo', target: 'first-words-tense' },
      { id: 'dismiss-warning', label: 'Dizer que eles não sobreviverão a uma segunda tempestade', target: 'first-words-tense', effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
  }),

  'blood-price': makeScene({
    id: 'blood-price', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'O preço mais rápido', mood: 'somber', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O raio atravessou a lâmina erguida e lançou o captor para trás. Ele não voltou a se mover. Os outros dois fugiram sem recolher o corpo. Durante alguns instantes, restaram apenas o cheiro de metal queimado, folhas em brasa e a respiração difícil de Elara.' },
      { speaker: 'NARRADOR', text: 'Sirius apagou o fogo com terra úmida. A morte evitara que a espada descesse, mas não podia ser desfeita nem transformada em gesto limpo. A floresta guardaria a cicatriz; os sobreviventes guardariam o nome que inventassem para ele.' },
      { speaker: 'ELARA', text: 'Ele teria me ferido.' },
      { speaker: 'SIRIUS', text: 'Eu sei.' },
      { speaker: 'ELARA', text: 'Isso explica o que você fez. Não decide sozinho o que faremos com essa morte.' },
      { speaker: 'NARRADOR', text: 'Ela recuperou a adaga e fechou os olhos por uma breve oração élfica. Não ofereceu absolvição, tampouco acusação. Exigiu algo mais difícil: responsabilidade.' },
    ],
    flags: { orcBloodshed: true, forestScorched: true, orcsEscaped: true },
    choices: [
      { id: 'name-dead', label: 'Procurar no morto um nome para registrar', target: 'first-words-blood', flags: { honoredDead: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'justify-death', label: 'Afirmar que não havia outra escolha', target: 'first-words-blood', effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'accept-accounting', label: 'Prometer responder pela morte diante das sentinelas', target: 'first-words-blood', flags: { acceptedJudgment: true } },
    ],
  }),

  'first-words-soft': makeScene({
    id: 'first-words-soft', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Depois do perigo', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Consigo respirar. O ombro vai reclamar por alguns dias, e meu orgulho por mais tempo.' },
      { speaker: 'SIRIUS', text: 'O orgulho não estava amarrado.' },
      { speaker: 'ELARA', text: 'Foi exatamente por isso que apanhou mais.' },
      { speaker: 'NARRADOR', text: 'Um sorriso quase surgiu no rosto dela, mas morreu ao encontrar os olhos violetas de Sirius. Elara olhou para as penas negras que ainda se desfaziam no barro e depois para as marcas elétricas na raiz.' },
      { speaker: 'ELARA', text: 'Você não estava seguindo aqueles mercenários. Veio por causa do grito. Isso responde uma pergunta. Cria muitas outras.' },
    ],
    flags: { metElara: true },
    choices: [
      { id: 'invite-questions', label: '“Faça a primeira pergunta.”', target: 'names', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'ask-her-name', label: '“Comece me dizendo quem você é.”', target: 'names' },
    ],
  }),

  'first-words-tense': makeScene({
    id: 'first-words-tense', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Uma salvação não é confiança', mood: 'guarded', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Obrigada por ter vindo. Não confunda isso com a decisão de segui-lo.' },
      { speaker: 'SIRIUS', text: 'Eu não pedi que me seguisse.' },
      { speaker: 'ELARA', text: 'Não. Apenas apareceu sem espada, virou homem diante de três guerreiros e chamou uma tempestade. Homens comuns costumam oferecer um nome antes de exigir tranquilidade.' },
      { speaker: 'NARRADOR', text: 'Ela recuperou a adaga, verificou as runas e a guardou. O gesto não era ameaça; era a reconstrução deliberada de limites depois de ter sido privada deles.' },
      { speaker: 'ELARA', text: 'Meu nome é Elara. Esta é a parte em que você decide se sua verdade começa no nome ou depois dele.' },
    ],
    flags: { metElara: true },
    choices: [
      { id: 'answer-name', label: 'Responder sem desviar', target: 'names' },
      { id: 'question-before-name', label: 'Perguntar por que os orcs a queriam', target: 'names', effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
  }),

  'first-words-blood': makeScene({
    id: 'first-words-blood', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Nomes para os vivos e os mortos', mood: 'somber', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Na bolsa do morto havia apenas rações, moedas misturadas e uma tira de couro gravada com o nome “Arvak”. Se era nome de nascimento, de estrada ou tomado de outro homem, permanecia desconhecido. Sirius colocou a tira sobre o peito do guerreiro.' },
      { speaker: 'ELARA', text: 'Não esperava que procurasse o nome dele.' },
      { speaker: 'SIRIUS', text: 'Uma morte sem nome é fácil demais de usar.' },
      { speaker: 'ELARA', text: 'Nesse ponto concordamos. Eu sou Elara. Ele pode ter sido Arvak. E você é o homem que decidiu qual de nós respiraria. Preciso saber como chamá-lo antes de atravessarmos a próxima decisão.' },
      { speaker: 'NARRADOR', text: 'A exigência não continha medo. Continha o peso de uma testemunha que se recusava a permitir que o salvador desaparecesse atrás do próprio poder.' },
    ],
    flags: { metElara: true },
    choices: [
      { id: 'give-name-blood', label: 'Dizer a verdade sobre seu nome', target: 'names', flags: { readyToReveal: true } },
      { id: 'withhold-blood', label: 'Manter o nome em silêncio por enquanto', target: 'names', flags: { reluctantToReveal: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
  }),

  names: makeScene({
    id: 'names', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'O nome que sobreviveu', mood: 'earnest', portrait: 'sirius',
    passage: [
      { speaker: 'NARRADOR', text: 'Durante quinhentos anos, dizer “Kayler” significara oferecer aos outros uma arma, uma recompensa ou um motivo para fugir. O nome permanecia verdadeiro; o mundo ao redor dele é que o transformara em risco.' },
      { speaker: 'ELARA', text: 'Não preciso de seus títulos. Preciso saber se haverá outra surpresa antes de escolhermos uma estrada.' },
      { speaker: 'SIRIUS', text: 'Há sempre outra surpresa quando alguém pergunta por um homem que viveu tempo demais.' },
      { speaker: 'ELARA', text: 'Então me dê uma verdade de cada vez. Eu farei o mesmo.' },
      { speaker: 'NARRADOR', text: 'A clareira aguardou. O primeiro vínculo entre eles não seria determinado pelo pacto, pela coroa nem pela dívida de um resgate, mas pela medida de verdade que cada um aceitaria entregar.' },
    ],
    discover: ['elara'],
    choices: [
      { id: 'true-name', label: '“Sirius Kayler.”', target: 'truth-name', flags: { identityRevealed: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'traveler-name', label: '“Apenas Sirius. Um viajante.”', target: 'guarded-name', flags: { identityHidden: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'trade-truths', label: '“Uma verdade minha por uma sua.”', target: 'exchanged-name', flags: { bargainedTruth: true } },
    ],
  }),

  'truth-name': makeScene({
    id: 'truth-name', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'O herdeiro que não devia existir', mood: 'memory', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Kayler…' },
      { speaker: 'NARRADOR', text: 'Ela não recuou, mas toda a sua atenção mudou. O nome encontrou histórias de infância, relatórios fechados e silêncios da tia. Por um instante, Elara deixou de olhar para o homem que a salvara e viu o peso de uma lenda proibida.' },
      { speaker: 'SIRIUS', text: 'Se esse nome muda sua dívida, esqueça que a possui.' },
      { speaker: 'ELARA', text: 'Ele muda perguntas, não o que aconteceu aqui. Você veio quando gritei antes de saber quem eu era. Eu fui salva por Sirius, não pela Casa Kayler.' },
      { speaker: 'ELARA', text: 'Mas minha tia pronunciou esse sobrenome uma vez, quando acreditava que eu dormia. Se você está indo para Sylvaris, nós dois estamos caminhando para o mesmo segredo por lados diferentes.' },
    ],
    flags: { pactMentioned: true },
    choices: [
      { id: 'ask-aelwen', label: 'Perguntar o que Aelwen disse sobre os Kayler', target: 'wounds' },
      { id: 'separate-debt', label: 'Insistir que o resgate não cria obrigação', target: 'wounds', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'ask-her-identity', label: 'Perguntar por que uma patrulheira chama a rainha de tia', target: 'wounds' },
    ],
    freeInput: true,
  }),

  'guarded-name': makeScene({
    id: 'guarded-name', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Metade de um nome', mood: 'guarded', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Um viajante que se transforma em corvo, conduz relâmpagos sem lâmina e cavalga para um reino que se esconde dele.' },
      { speaker: 'SIRIUS', text: 'Você pediu um nome. Eu lhe dei um.' },
      { speaker: 'ELARA', text: 'Deu a parte que eu já tinha ouvido. Não vou arrancar o restante. Também não fingirei que ausência de mentira é o mesmo que confiança.' },
      { speaker: 'NARRADOR', text: 'Ela disse isso sem agressividade. Sirius conhecia ameaças, interrogatórios e bajulação; a precisão de Elara era mais difícil de afastar porque não exigia submissão, apenas reconhecia a distância que ele escolhera manter.' },
      { speaker: 'ELARA', text: 'Podemos seguir juntos até a próxima bifurcação. Depois disso, decidimos outra vez.' },
    ],
    choices: [
      { id: 'accept-distance', label: 'Aceitar os limites sem acrescentar outra mentira', target: 'wounds', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'remain-silent', label: 'Responder apenas com silêncio', target: 'wounds', flags: { silenceChosen: true } },
    ],
    freeInput: true,
  }),

  'exchanged-name': makeScene({
    id: 'exchanged-name', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Uma verdade por vez', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Aceito. Minha verdade: não sou apenas uma sentinela. Sou sobrinha de Aelwen e herdeira designada de Sylvaris. Detesto a segunda parte quando é usada para tornar a primeira invisível.' },
      { speaker: 'SIRIUS', text: 'Sirius Kayler. Filho de Normus. Detesto quando a segunda parte tenta decidir a primeira.' },
      { speaker: 'NARRADOR', text: 'Elara soltou uma risada pequena, surpreendida apesar da dor. A semelhança não apagava séculos, coroas ou o sangue na clareira, mas oferecia um lugar comum onde nenhum dos dois era apenas aquilo que herdara.' },
      { speaker: 'ELARA', text: 'Parece que nossos mortos tinham gosto por deixar obrigações mal explicadas.' },
      { speaker: 'SIRIUS', text: 'Os meus deixaram uma carta. Isso não tornou a explicação melhor.' },
    ],
    flags: { identityRevealed: true, elaraStatusKnown: true, pactMentioned: true },
    effects: [],
    choices: [
      { id: 'acknowledge-similarity', label: 'Admitir que possuem mais em comum do que esperava', target: 'wounds', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'return-to-danger', label: 'Lembrar que o mandante dos orcs continua livre', target: 'wounds' },
    ],
    freeInput: true,
  }),

  wounds: makeScene({
    id: 'wounds', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'Aquilo que o corpo registra', mood: 'quiet', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Quando a urgência cedeu, os ferimentos apareceram. A corda abrira a pele dos pulsos de Elara; uma pancada escurecia sua têmpora e o ombro esquerdo não subia por inteiro. Sirius tinha um corte na palma e a dormência familiar nos dedos depois da eletricidade.' },
      { speaker: 'ELARA', text: 'Antes que diga que não é nada: essa frase é sempre dita por quem pretende sangrar sobre o caminho inteiro.' },
      { speaker: 'SIRIUS', text: 'Eu ia perguntar se seu ombro está deslocado.' },
      { speaker: 'ELARA', text: 'Não está. E eu ia perguntar se o tremor em sua mão é preço da transformação ou do raio.' },
      { speaker: 'NARRADOR', text: 'Cuidar dos ferimentos permitiria proximidade; ignorá-los preservaria distância e risco. Nenhuma escolha era apenas prática depois de terem começado a ler um ao outro.' },
    ],
    choices: [
      { id: 'offer-cloak', label: 'Buscar o cavalo e oferecer o manto e os curativos', target: 'evidence', flags: { caredForElara: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'let-her-treat', label: 'Permitir que Elara trate primeiro sua mão', target: 'evidence', flags: { acceptedCare: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'keep-distance', label: 'Cuidar dos próprios ferimentos e manter distância', target: 'evidence', flags: { keptDistance: true } },
    ],
    freeInput: true,
  }),

  evidence: makeScene({
    id: 'evidence', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'NARRADOR',
    title: 'O que a violência deixou', mood: 'guarded', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O cavalo respondeu ao assobio de Sirius e surgiu entre as árvores com Fulgarion ainda presa à sela. Elara tocou o punho da espada apenas com os olhos. Depois se ajoelhou junto ao lugar onde fora mantida e recolheu um fio de prata partido, duas moedas e uma lasca de cera sem selo.' },
      { speaker: 'ELARA', text: 'Meus marcadores foram removidos durante três noites. Hoje deixei um falso para descobrir quem os seguia. Esperava um observador. Encontrei três mercenários.' },
      { speaker: 'SIRIUS', text: 'Você se ofereceu como isca.' },
      { speaker: 'ELARA', text: 'Ofereci uma pista. Subestimei a distância entre a patrulha e a clareira. Pode anotar “arrogância” no relatório, se chegarmos vivos ao reino.' },
      { speaker: 'NARRADOR', text: 'O fragmento de contrato podia revelar uma rota; a adaga roubada podia explicar como Elara fora dominada; as pegadas dos fugitivos ainda podiam ser seguidas. Escolher qual vestígio preservar mudaria o caminho seguinte.' },
    ],
    choices: [
      { id: 'study-contract', label: 'Examinar o contrato e a cera sem selo', target: 'contract-fragment', flags: { contractKept: true } },
      { id: 'ask-dagger', label: 'Perguntar como tomaram a Adaga do Passo Velado', target: 'dagger-story' },
      { id: 'leave-before-return', label: 'Abandonar a clareira antes que chegue reforço', target: 'road-decision', flags: { leftEvidence: true } },
    ],
  }),

  'contract-fragment': makeScene({
    id: 'contract-fragment', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'Um mandante sem rosto', mood: 'memory', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'A cera continha pó de casca branca, usado em arquivos humanos para impedir mofo. A tira de couro fora preparada no leste, mas escrita com abreviações de estrada usadas em Valoria e Ravenhold. Alguém reunira materiais de origens diferentes para fabricar incerteza.' },
      { speaker: 'SIRIUS', text: 'Quem fez isso queria que cada reino pudesse culpar o vizinho.' },
      { speaker: 'ELARA', text: 'Ou queria que gastássemos tempo escolhendo um culpado conveniente. O contratante é desconhecido. O que sabemos é menor e mais útil: conhece meus fios, sabe que existe uma passagem e tem acesso a intermediários fora de Sylvaris.' },
      { speaker: 'NARRADOR', text: 'Sirius guardou o fragmento na carta de Normus, separando os dois documentos por tecido. Não havia resposta, apenas uma prova de que o ataque fora planejado e uma direção provável para futuras perguntas.' },
    ],
    flags: { knowsContract: true, contractKept: true },
    choices: [
      { id: 'preserve-evidence', label: 'Preservar a prova para os Círculos de Sylvaris', target: 'road-decision', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'keep-personally', label: 'Manter o fragmento sob sua própria guarda', target: 'road-decision', flags: { withheldEvidence: true } },
    ],
  }),

  'dagger-story': makeScene({
    id: 'dagger-story', stage: 'orcClearing', location: 'Clareira sem nome', speaker: 'ELARA',
    title: 'O passo interrompido', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Eles espalharam pó de ferro meteórico entre as árvores. A adaga não atravessa esse metal. Tentei saltar mesmo assim e reapareci a menos de um passo, sem calor suficiente nas mãos para segurá-la.' },
      { speaker: 'SIRIUS', text: 'Sabiam exatamente qual limite explorar.' },
      { speaker: 'ELARA', text: 'Sim. Isso me assusta mais que as lâminas. As limitações da adaga estão em registros de treino fechados. Alguém leu um arquivo da corte ou ouviu quem o leu.' },
      { speaker: 'NARRADOR', text: 'Ela envolveu a mão no tecido aquecedor da bainha. Admitir o erro custava-lhe mais que descrever o ataque. Sirius reconheceu naquele desconforto uma fraqueza semelhante à sua: ambos haviam aprendido a parecer autossuficientes para impedir que outros transformassem cuidado em controle.' },
    ],
    flags: { knowsDaggerLimits: true, courtLeakSuspected: true },
    choices: [
      { id: 'share-magic-cost', label: 'Contar o preço que a magia de tempestade cobra de seus nervos', target: 'road-decision', flags: { sharedWeakness: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'focus-leak', label: 'Concentrar a conversa no possível vazamento da corte', target: 'road-decision' },
    ],
    freeInput: true,
  }),

  'road-decision': makeScene({
    id: 'road-decision', stage: 'forestRide', location: 'Margens de Sylvaris', speaker: 'ELARA',
    title: 'Dois viajantes para o mesmo reino', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Deixaram a clareira quando a luz começou a inclinar-se. Elara caminhava ao lado do cavalo, recusando a sela até que o próprio corpo lhe mostrou o preço dessa teimosia. Sirius diminuiu o passo sem comentar. Por algum tempo, falaram apenas para indicar raízes e terreno instável.' },
      { speaker: 'ELARA', text: 'Você já seguia para o reino élfico antes de me ouvir. Por quê?' },
      { speaker: 'SIRIUS', text: 'Meu pai deixou um medalhão de Sylvaris e uma carta que responde menos do que promete.' },
      { speaker: 'ELARA', text: 'Normus Kayler foi amigo de minha tia. Essa frase existe nos arquivos públicos. O motivo de ela fechar a porta toda vez que pergunto pertence aos registros secretos.' },
      { speaker: 'NARRADOR', text: 'Sirius podia mostrar o medalhão, falar dos pais ou reduzir a viagem a uma necessidade de passagem. A estrada era a mesma; a companhia que chegaria ao fim dela não seria.' },
    ],
    discover: ['medalhao-da-folha-partida'],
    choices: [
      { id: 'show-medallion', label: 'Mostrar o Medalhão da Folha Partida', target: 'pact-road', flags: { medallionShown: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'speak-parents', label: 'Contar o que sabe sobre Normus e Namídia', target: 'family-road', flags: { spokeOfParents: true } },
      { id: 'ask-only-passage', label: 'Dizer que busca apenas passagem e respostas da rainha', target: 'guarded-road', flags: { keptPurposeNarrow: true } },
    ],
    freeInput: true,
  }),

  'pact-road': makeScene({
    id: 'pact-road', stage: 'hiddenPath', location: 'Caminho das Árvores Ausentes', speaker: 'ELARA',
    title: 'A folha partida', mood: 'wonder', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Quando Elara viu o medalhão, parou tão depressa que o cavalo avançou sozinho por dois passos. Não tentou pegá-lo. Aproximou a mão até sentir o calor da prata e recuou como quem reconhece uma porta que nunca esperou encontrar aberta.' },
      { speaker: 'ELARA', text: 'Minha tia guarda a outra metade. Vi o contorno dela num estojo, mas não a inscrição. Os Círculos chamam isso de Sinal das Duas Metades.' },
      { speaker: 'SIRIUS', text: 'Meu pai chamou de uma promessa que eu teria o direito de recusar.' },
      { speaker: 'ELARA', text: 'Então ele sabia algo que muitas coroas esquecem. Um pacto sobre descendentes não pode ser um comando aos descendentes.' },
      { speaker: 'NARRADOR', text: 'A resposta de Elara não soou ensaiada. Pela primeira vez desde o grito, Sirius percebeu que ela talvez temesse o mesmo segredo — não por acreditar que fosse falso, mas por suspeitar que fosse verdadeiro demais.' },
    ],
    discover: ['caminho-das-arvores-ausentes'], flags: { pactMentioned: true },
    choices: [
      { id: 'promise-choice', label: 'Afirmar que nenhum pacto decidirá por eles', target: 'shared-road-1', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'ask-if-she-knew', label: 'Perguntar há quanto tempo ela sabia de sua existência', target: 'shared-road-1' },
      { id: 'fear-marriage', label: 'Perguntar se o pacto exige uma união entre as casas', target: 'shared-road-1', flags: { marriageRumorRaised: true } },
    ],
    freeInput: true,
  }),

  'family-road': makeScene({
    id: 'family-road', stage: 'hiddenPath', location: 'Caminho das Árvores Ausentes', speaker: 'NARRADOR',
    title: 'Os pais que caminham conosco', mood: 'memory', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius falou sem transformar os pais em lenda. Contou que conhecia Normus por uma espada reparada, uma carta incompleta e histórias que discordavam umas das outras. De Namídia possuía menos: cifras, uma fivela e a certeza de que ela desejara viver, não apenas morrer por ele.' },
      { speaker: 'ELARA', text: 'Arquivos élficos falam muito sobre o último combate de seu pai. Quase nada sobre sua mãe. Isso costuma acontecer quando uma mulher sem magia constrói a estrada por onde a lenda escapa.' },
      { speaker: 'SIRIUS', text: 'Você diz isso como se a conhecesse.' },
      { speaker: 'ELARA', text: 'Conheço o tipo de silêncio. Minha tia fala de Normus com saudade. Quando menciono Namídia, fala com culpa.' },
      { speaker: 'NARRADOR', text: 'O caminho pareceu estreitar ao redor deles. Não havia consolação suficiente para cinco séculos, mas Elara não ofereceu frases vazias. Caminhou ao lado dele, permitindo que a memória fosse companhia e não interrogatório.' },
    ],
    discover: ['caminho-das-arvores-ausentes'],
    choices: [
      { id: 'thank-listening', label: 'Agradecer por ela não transformar seus pais em heróis simples', target: 'shared-road-1', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'ask-her-father', label: 'Perguntar sobre o pai de Elara', target: 'shared-road-1', flags: { askedElaraFamily: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'close-memory', label: 'Encerrar o assunto antes que diga demais', target: 'shared-road-1' },
    ],
    freeInput: true,
  }),

  'guarded-road': makeScene({
    id: 'guarded-road', stage: 'hiddenPath', location: 'Caminho das Árvores Ausentes', speaker: 'ELARA',
    title: 'Termos de passagem', mood: 'guarded', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Posso conduzi-lo até a fronteira interna. Não posso prometer entrada sem dizer às sentinelas quem atravessa.' },
      { speaker: 'SIRIUS', text: 'E se eu não quiser que diga?' },
      { speaker: 'ELARA', text: 'Então chegaremos como duas pessoas que sobreviveram juntas e discordam sobre o que essa sobrevivência permite. Não vou traí-lo. Também não vou mentir à floresta em seu nome.' },
      { speaker: 'NARRADOR', text: 'A franqueza abriu uma distância honesta. Sirius podia respeitar o limite, tentar negociá-lo ou tratar Elara como mais uma porta controlada por uma coroa. Cada leitura conduziria à mesma mata, mas não ao mesmo destino.' },
    ],
    discover: ['caminho-das-arvores-ausentes'],
    choices: [
      { id: 'accept-terms', label: 'Aceitar que Elara não mentirá por ele', target: 'shared-road-1', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'negotiate-terms', label: 'Pedir que ela revele apenas o que testemunhou', target: 'shared-road-1', flags: { testimonyOnly: true } },
      { id: 'resent-crown', label: 'Acusá-la de falar como a coroa que diz questionar', target: 'shared-road-1', effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
    freeInput: true,
  }),

  'shared-road-1': makeScene({
    id: 'shared-road-1', stage: 'forestRide', location: 'Estrada das Samambaias Altas', speaker: 'NARRADOR',
    title: 'Lugar para dois na sela', mood: 'quiet', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O ombro de Elara piorou quando o terreno começou a subir. Ela recusou o cavalo duas vezes; na terceira, Sirius parou o animal no meio da trilha e esperou sem repetir a oferta. A ausência de insistência tornou a teimosia mais difícil de sustentar.' },
      { speaker: 'ELARA', text: 'Se eu aceitar, não significa que estou incapaz de caminhar.' },
      { speaker: 'SIRIUS', text: 'Significa que o cavalo possui quatro pernas e nós temos uma estrada longa.' },
      { speaker: 'NARRADOR', text: 'Elara montou atrás dele com um cuidado que tentava não tocar em nenhum ferimento. Quando o cavalo avançou, porém, uma raiz obrigou-a a segurar a lateral da armadura de Sirius. Ela retirou a mão depressa demais, como se proximidade pudesse ser confundida com dívida.' },
      { speaker: 'ELARA', text: 'Ele tem nome?' },
      { speaker: 'SIRIUS', text: 'Nimbo. Antes que pergunte: foi ele quem escolheu. Ignorou todos os outros.' },
      { speaker: 'ELARA', text: 'Finalmente alguém nesta viagem com bom senso suficiente para recusar o nome que herdou.' },
      { speaker: 'NARRADOR', text: 'Foi a primeira brincadeira que não nasceu do medo. Pequena, mas importante: por alguns passos, nenhum deles precisou representar o último Kayler ou a futura rainha.' },
    ],
    choices: [
      { id: 'share-horse-story', label: 'Contar como Nimbo o escolheu', target: 'shared-road-2', flags: { sharedHorseStory: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'tease-princess', label: 'Perguntar se princesas élficas sempre discutem com cavalos', target: 'shared-road-2', flags: { firstTeasing: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'keep-riding', label: 'Deixar que o silêncio confortável permaneça', target: 'shared-road-2', flags: { comfortableSilence: true } },
    ],
    freeInput: true,
  }),

  'shared-road-2': makeScene({
    id: 'shared-road-2', stage: 'forestRide', location: 'Estrada das Samambaias Altas', speaker: 'ELARA',
    title: 'A pergunta sobre as penas', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Preciso perguntar sobre o corvo. Não por arquivo ou defesa. Porque vi você deixar de ser homem e ainda reconheci seus olhos.' },
      { speaker: 'SIRIUS', text: 'A forma não é ilusão. Meus ossos, peso e sentidos mudam. Fulgarion não vem comigo, por isso ficou na sela.' },
      { speaker: 'ELARA', text: 'E sua mente?' },
      { speaker: 'SIRIUS', text: 'Continua minha. Mas o mundo fica cheio de movimento, vento e coisas brilhantes. Permanecer muito tempo torna pensamentos humanos… distantes.' },
      { speaker: 'NARRADOR', text: 'Ele nunca explicara a transformação a outra pessoa. Na solidão, limites eram hábitos; ditos em voz alta, tornavam-se vulnerabilidades. Elara não demonstrou fascínio infantil nem repulsa. Fez o que fazia com uma rota perigosa: procurou a borda segura.' },
      { speaker: 'ELARA', text: 'Se um dia não conseguir voltar, como devo ajudá-lo?' },
      { speaker: 'SIRIUS', text: 'Diga meu nome inteiro. Coloque o medalhão onde eu possa vê-lo. E não tente me prender.' },
      { speaker: 'ELARA', text: 'A última parte parece importante para tudo, não apenas para o corvo.' },
    ],
    flags: { ravenLimitsDiscussed: true },
    choices: [
      { id: 'trust-raven-protocol', label: 'Confiar a Elara todo o protocolo de retorno', target: 'shared-road-3', flags: { ravenProtocolShared: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'minimize-raven-risk', label: 'Dizer que nunca perdeu o controle da forma', target: 'shared-road-3', flags: { ravenRiskMinimized: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'ask-dagger-protocol', label: 'Pedir o mesmo tipo de instrução sobre a adaga', target: 'shared-road-3', flags: { mutualSafetyProtocol: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
    ],
    freeInput: true,
  }),

  'shared-road-3': makeScene({
    id: 'shared-road-3', stage: 'forestRide', location: 'Passagem dos Troncos Gêmeos', speaker: 'NARRADOR',
    title: 'Quinhentos anos em uma frase', mood: 'memory', portrait: 'sirius',
    passage: [
      { speaker: 'ELARA', text: 'Quando disse que viveu tempo demais, quanto tempo quis dizer?' },
      { speaker: 'SIRIUS', text: 'Nasci em 704.' },
      { speaker: 'NARRADOR', text: 'Elara ficou em silêncio. Não porque duvidasse dos números, mas porque tentou reorganizar o homem à sua frente dentro deles. Sirius era mais velho que cidades humanas, tratados e túmulos que ela estudara. Ainda assim, não conhecera os pais, não assistira a uma corte e nunca tivera alguém a quem contar o protocolo do corvo.' },
      { speaker: 'ELARA', text: 'Eu tenho dezenove anos. Os humanos diriam dezenove também, embora os calendários élficos contem outras coisas. Você é mais velho que minha tia esperava que qualquer Kayler pudesse sobreviver.' },
      { speaker: 'SIRIUS', text: 'Sobreviver muito não é o mesmo que viver muito.' },
      { speaker: 'ELARA', text: 'Quantas pessoas conheceu nesse tempo?' },
      { speaker: 'SIRIUS', text: 'Poucas. O suficiente para aprender que despedidas ficam mais fáceis de prever e não ficam mais fáceis de suportar.' },
      { speaker: 'NARRADOR', text: 'A diferença de idade não desapareceu. Tornou-se uma realidade que ambos precisariam tratar sem transformar Sirius em sábio infalível ou Elara em criança.' },
    ],
    flags: { ageRevealed: true },
    choices: [
      { id: 'admit-loneliness', label: 'Admitir que o isolamento também foi medo de novas perdas', target: 'shared-road-4', flags: { lonelinessAdmitted: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'claim-self-sufficient', label: 'Afirmar que aprendeu a não precisar de ninguém', target: 'shared-road-4', flags: { selfSufficiencyClaimed: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'ask-her-age-feeling', label: 'Perguntar se Elara se sente jovem demais para a coroa', target: 'shared-road-4', flags: { askedAboutYouth: true } },
    ],
    freeInput: true,
  }),

  'shared-road-4': makeScene({
    id: 'shared-road-4', stage: 'hiddenPath', location: 'Passagem dos Troncos Gêmeos', speaker: 'ELARA',
    title: 'A coroa antes da cabeça', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Sinto-me jovem demais quando alguém usa minha idade para encerrar uma discussão. Sinto-me velha demais quando esperam que eu sorria enquanto decidem minha vida.' },
      { speaker: 'SIRIUS', text: 'Por que os Círculos escolheram você e não suas irmãs?' },
      { speaker: 'ELARA', text: 'A resposta pública fala de escuta, conhecimento das margens e disposição para rever o isolamento. As atas completas são reservadas. Lyssara acredita que fui escolhida porque Aelwen precisava de uma herdeira ligada ao pacto. Maeriel acredita que os Círculos temem a popularidade dela entre os guardas.' },
      { speaker: 'SIRIUS', text: 'E no que você acredita?' },
      { speaker: 'ELARA', text: 'Que fui escolhida por razões boas misturadas a razões que ninguém deseja confessar. Instituições raramente possuem uma única intenção.' },
      { speaker: 'NARRADOR', text: 'Elara falava das irmãs sem desprezo. A sucessão não apagara afeto; tornara cada gesto suscetível a interpretação política. Sirius percebeu que revelar o pacto poderia não apenas explicar a escolha dela, mas romper uma família que ainda tentava permanecer inteira.' },
      { speaker: 'ELARA', text: 'Se o medalhão disser que devo governar, isso não provará que sou capaz. Se disser que não devo, também não provará o contrário.' },
    ],
    flags: { successionDiscussed: true },
    choices: [
      { id: 'support-without-deciding', label: 'Apoiar o direito dela de decidir sem afirmar qual decisão tomar', target: 'shared-road-5', flags: { supportedElaraAutonomy: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'warn-against-crown', label: 'Dizer que toda coroa termina usando quem a veste', target: 'shared-road-5', flags: { warnedAgainstCrown: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'ask-sisters', label: 'Perguntar o que ela deseja preservar com as irmãs', target: 'shared-road-5', flags: { askedAboutSisters: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
    ],
    freeInput: true,
  }),

  'shared-road-5': makeScene({
    id: 'shared-road-5', stage: 'camp', location: 'Riacho da Pedra Azul', speaker: 'NARRADOR',
    title: 'Água, pão e limites', mood: 'quiet', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Pararam junto a um riacho tão claro que as pedras pareciam suspensas. Sirius ofereceu pão escuro e carne seca. Elara retirou da bolsa frutos verdes que tinham gosto de mel apenas depois da segunda mordida. Dividir alimento tornou a conversa menos solene e, por isso, mais honesta.' },
      { speaker: 'ELARA', text: 'Você sempre come como se alguém pudesse atacar antes da próxima mastigada?' },
      { speaker: 'SIRIUS', text: 'Durante algum tempo, alguém podia.' },
      { speaker: 'ELARA', text: 'Durante quinhentos anos?' },
      { speaker: 'SIRIUS', text: 'Há hábitos que sobrevivem ao perigo porque não receberam notícia de que ele terminou.' },
      { speaker: 'NARRADOR', text: 'Elara diminuiu o próprio ritmo, não para imitá-lo, mas para retirar pressa do momento. Depois lavou o sangue seco do pulso. Sirius percebeu a marca da corda e desviou os olhos para não transformá-la novamente em objeto de observação.' },
      { speaker: 'ELARA', text: 'Pode olhar. O ferimento existe mesmo quando você tenta me devolver privacidade.' },
      { speaker: 'SIRIUS', text: 'Não queria lembrar você da clareira.' },
      { speaker: 'ELARA', text: 'Lembrar não é o problema. O problema seria deixar aquele lugar decidir todas as conversas que teremos depois.' },
    ],
    choices: [
      { id: 'ask-permission-wound', label: 'Pedir permissão antes de trocar a faixa do pulso', target: 'shared-road-6', flags: { tendedWoundWithConsent: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'share-food-memory', label: 'Contar uma lembrança antiga ligada ao pão de viagem', target: 'shared-road-6', flags: { sharedSmallMemory: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'keep-practical', label: 'Limitar a parada a comida, água e inspeção da trilha', target: 'shared-road-6', flags: { practicalDistance: true } },
    ],
    freeInput: true,
  }),

  'shared-road-6': makeScene({
    id: 'shared-road-6', stage: 'camp', location: 'Riacho da Pedra Azul', speaker: 'ELARA',
    title: 'Por que seguir um grito?', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Preciso saber uma coisa que não está em sua carta. Por que veio quando ouviu meu grito?' },
      { speaker: 'SIRIUS', text: 'Porque alguém precisava de ajuda.' },
      { speaker: 'ELARA', text: 'Essa é a resposta correta. Não perguntei pela resposta correta.' },
      { speaker: 'NARRADOR', text: 'Sirius contemplou a água. Durante a perseguição, muitos gritos tinham sido armadilhas. Outros haviam sido verdadeiros, e ignorá-los nunca os tornara menos reais. Cada vez que seguia um chamado, arriscava revelar a existência que os pais morreram para ocultar.' },
      { speaker: 'SIRIUS', text: 'Minha mãe morreu mantendo perseguidores longe de uma criança que não podia pedir ajuda. Meu pai morreu para que eu tivesse escolhas. Se escuto alguém e decido que meu sigilo vale mais que a vida dela, transformo a sobrevivência que me deram em desculpa.' },
      { speaker: 'ELARA', text: 'Então não veio porque esperava recompensa, destino ou princesa.' },
      { speaker: 'SIRIUS', text: 'Quando cheguei, você era uma desconhecida com uma lâmina no pescoço.' },
      { speaker: 'ELARA', text: 'Talvez essa seja a primeira coisa sobre nós que o pacto nunca poderá reivindicar.' },
      { speaker: 'NARRADOR', text: 'A gratidão de Elara deixou de ser dívida naquele instante. Tornou-se reconhecimento: ele fizera uma escolha antes de qualquer nome, e ela agora podia escolher o que fazer com essa verdade.' },
    ],
    flags: { rescueMotiveShared: true },
    choices: [
      { id: 'reject-debt', label: 'Dizer que ela não lhe deve nada pelo resgate', target: 'shared-road-7', flags: { rescueDebtRejected: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'ask-her-choice', label: 'Perguntar o que ela teria feito ao ouvir o grito dele', target: 'shared-road-7', flags: { reciprocityAsked: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'avoid-motive', label: 'Encerrar o assunto antes que a memória dos pais avance', target: 'shared-road-7', flags: { parentsMemoryClosed: true } },
    ],
    freeInput: true,
  }),

  'shared-road-7': makeScene({
    id: 'shared-road-7', stage: 'forestRide', location: 'Alameda da Chuva Baixa', speaker: 'NARRADOR',
    title: 'A primeira discordância sem armas', mood: 'guarded', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Uma chuva fina começou quando retomaram a marcha. Elara insistiu que deveriam avisar imediatamente os Círculos sobre o vazamento da adaga. Sirius argumentou que um aviso aberto permitiria ao traidor destruir provas. Foi a primeira discordância entre eles que não ocorria diante de um inimigo.' },
      { speaker: 'ELARA', text: 'Se eu escolher sozinha quais sentinelas merecem saber, repito o sigilo de Aelwen e chamo de necessidade.' },
      { speaker: 'SIRIUS', text: 'Se contar a todos antes de conhecer o traidor, oferece a ele o relatório do próprio ataque.' },
      { speaker: 'ELARA', text: 'Então precisamos de um limite verificável. Três guardiões de círculos diferentes, registro lacrado e nenhuma acusação nominal.' },
      { speaker: 'SIRIUS', text: 'E uma cópia fora do palácio.' },
      { speaker: 'ELARA', text: 'Com quem?' },
      { speaker: 'SIRIUS', text: 'Com alguém que nenhum de nós controla.' },
      { speaker: 'NARRADOR', text: 'A solução não surgiu de concordância, mas do modo como discordaram. Elara recusou segredo absoluto; Sirius recusou exposição imprudente. Entre ambos nasceu um método que nenhum teria escolhido sozinho.' },
    ],
    flags: { firstPoliticalDisagreement: true },
    choices: [
      { id: 'accept-three-guardians', label: 'Aceitar os três guardiões e sugerir uma cópia com os barqueiros', target: 'shared-road-8', flags: { evidenceProtocolAgreed: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'insist-personal-custody', label: 'Insistir que apenas Sirius guarde a prova', target: 'shared-road-8', flags: { evidenceControlDemanded: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
      { id: 'defer-decision', label: 'Adiar a decisão até conhecer os guardiões', target: 'shared-road-8', flags: { evidenceDecisionDeferred: true } },
    ],
    freeInput: true,
  }),

  'shared-road-8': makeScene({
    id: 'shared-road-8', stage: 'hiddenPath', location: 'Bifurcação das Sete Raízes', speaker: 'ELARA',
    title: 'Companhia por escolha', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'As sete raízes surgiram quando a chuva parou. Antes de explicar as rotas, Elara ficou diante de Sirius. A lama, o ombro ferido e o cansaço haviam retirado dela qualquer aparência de retrato cortesão. O que restava era uma mulher decidindo se confiaria a outro viajante o caminho de casa.' },
      { speaker: 'ELARA', text: 'Na clareira, você decidiu entrar no perigo por mim. Desde então, cada um de nós teve oportunidades de transformar o outro em obrigação. Ainda não fizemos isso.' },
      { speaker: 'SIRIUS', text: 'Ainda?' },
      { speaker: 'ELARA', text: 'Confiança não é uma conquista permanente. É uma escolha repetida. Quero que venha comigo até Sylvaris, não porque o medalhão manda, nem porque me salvou. Quero continuar esta conversa onde as respostas existem.' },
      { speaker: 'SIRIUS', text: 'E se as respostas nos colocarem em lados opostos?' },
      { speaker: 'ELARA', text: 'Então teremos chegado lá sabendo discordar sem fingir que o outro deixou de ser pessoa.' },
      { speaker: 'NARRADOR', text: 'Sirius passara séculos confundindo liberdade com ausência de vínculos. Elara oferecia outro significado: um vínculo podia ser escolhido, revisto e até recusado sem se tornar prisão. Aceitar companhia não entregaria seu destino; apenas permitiria que alguém o testemunhasse.' },
    ],
    flags: { companionshipOffered: true },
    choices: [
      { id: 'accept-companionship', label: 'Aceitar a companhia pelos motivos que construíram juntos', target: 'route-choice', flags: { companionshipAccepted: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'accept-until-border', label: 'Aceitar apenas até a fronteira e escolher novamente lá', target: 'route-choice', flags: { companionshipConditional: true } },
      { id: 'keep-independent', label: 'Dizer que seguirão a mesma estrada, mas não juntos', target: 'route-choice', flags: { companionshipRefused: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
    freeInput: true,
  }),

  'route-choice': makeScene({
    id: 'route-choice', stage: 'hiddenPath', location: 'Bifurcação das Sete Raízes', speaker: 'NARRADOR',
    title: 'A primeira decisão compartilhada', mood: 'alert', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Ao anoitecer, alcançaram uma árvore cujas raízes formavam sete corredores. Elara identificou três rotas possíveis. O Caminho das Árvores Ausentes era rápido e protegido, mas alguém vinha removendo seus marcadores. Uma trilha oriental seguia as pegadas dos orcs. A terceira levava a um abrigo antigo onde poderiam descansar e ler a carta.' },
      { speaker: 'ELARA', text: 'Se escolhermos o caminho oculto, chegaremos antes do amanhecer, mas encontraremos quem mexeu nas marcas. Se seguirmos os mercenários, talvez descubramos o intermediário e talvez percamos a vantagem. Se pararmos, recuperamos forças e entregamos horas a quem nos caça.' },
      { speaker: 'SIRIUS', text: 'Qual você escolheria sem mim?' },
      { speaker: 'ELARA', text: 'O caminho oculto. É exatamente por isso que devemos discutir. Minhas escolhas me colocaram naquela clareira.' },
    ],
    choices: [
      { id: 'hidden-route', label: 'Confiar no Caminho das Árvores Ausentes', target: 'hidden-road', flags: { route: 'hidden' } },
      { id: 'track-orcs', label: 'Seguir os rastros dos mercenários', target: 'orc-trail', flags: { route: 'orcs' }, requires: { anyFlags: ['orcsSpared', 'orcsEscaped', 'orcsCaptured'] } },
      { id: 'make-camp', label: 'Buscar o abrigo antigo e conversar antes de seguir', target: 'night-camp', flags: { route: 'camp' } },
    ],
  }),

  'hidden-road': makeScene({
    id: 'hidden-road', stage: 'hiddenPath', location: 'Caminho das Árvores Ausentes', speaker: 'NARRADOR',
    title: 'Onde a floresta retira o mundo', mood: 'wonder', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Elara tocou três raízes numa ordem que Sirius não conseguiu repetir. O corredor central se abriu sem que árvore alguma se movesse: o restante da floresta simplesmente deixou de ocupar o lugar. Sons externos desapareceram. O ar ganhou cheiro de chuva antiga.' },
      { speaker: 'ELARA', text: 'Não é um atalho. Este caminho impede a mata de alongar a distância. Saia dele sem marca e pode caminhar uma semana para voltar ao mesmo ponto.' },
      { speaker: 'SIRIUS', text: 'Foi assim que meu esconderijo permaneceu oculto?' },
      { speaker: 'ELARA', text: 'Não sei. E quando não sei, prefiro não vestir uma suspeita com roupas de certeza.' },
      { speaker: 'NARRADOR', text: 'A frase lembrava a disciplina dos antigos arquivos. Sirius percebeu que confiava nela um pouco mais por aquilo que se recusava a inventar.' },
    ],
    choices: [
      { id: 'walk-beside', label: 'Caminhar ao lado de Elara e perguntar sobre Sylvaris', target: 'hidden-dialogue', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'guard-rear', label: 'Proteger a retaguarda enquanto ela guia', target: 'hidden-dialogue', flags: { guardedElara: true } },
    ],
    freeInput: true,
  }),

  'hidden-dialogue': makeScene({
    id: 'hidden-dialogue', stage: 'hiddenPath', location: 'Caminho das Árvores Ausentes', speaker: 'ELARA',
    title: 'A herdeira sem corte', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Sylvaris não é uma cidade cercada por floresta. A floresta é parte da lei, da memória e da fronteira. Minha tia governa, mas não pode ordenar que uma árvore viva seja cortada nem abrir uma rota que os Círculos fecharam.' },
      { speaker: 'SIRIUS', text: 'E você herdará esses limites.' },
      { speaker: 'ELARA', text: 'Se aceitar a coroa. Fui escolhida pelos Círculos, não pelo nascimento. Minhas irmãs são mais velhas. Parte da corte acredita que o pacto Kayler influenciou a escolha.' },
      { speaker: 'SIRIUS', text: 'Então minha existência já interfere em sua vida antes de nos conhecermos.' },
      { speaker: 'ELARA', text: 'Interfere na política. O que fará na minha vida ainda depende de nós.' },
      { speaker: 'NARRADOR', text: 'A resposta ficou entre eles com intimidade suficiente para ser perigosa. Nenhum romance estava prometido, nenhum destino escrito; havia apenas duas pessoas descobrindo onde terminavam as decisões dos mortos.' },
    ],
    choices: [
      { id: 'respect-choice', label: 'Dizer que apoiará o direito dela de recusar a coroa', target: 'old-oak', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'question-circles', label: 'Perguntar por que os Círculos a escolheram', target: 'old-oak' },
      { id: 'avoid-future', label: 'Evitar qualquer promessa sobre o futuro', target: 'old-oak' },
    ],
    freeInput: true,
  }),

  'old-oak': makeScene({
    id: 'old-oak', stage: 'hiddenPath', location: 'Carvalho da Vigília', speaker: 'NARRADOR',
    title: 'A marca removida', mood: 'urgent', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'No centro do caminho, Elara ergueu o punho. Um fio de prata deveria ligar duas raízes; restava apenas a perfuração onde fora preso. No barro, uma bota humana sobrepunha-se a pegadas élficas e orcs. Alguém esperava que a captura falhasse ou pretendia confirmar o resultado.' },
      { speaker: 'ELARA', text: 'A clareira não era o fim. Era uma pergunta feita com três lâminas. Isto é a testemunha esperando a resposta.' },
      { speaker: 'SIRIUS', text: 'Está perto?' },
      { speaker: 'ELARA', text: 'Perto o bastante para ter ouvido o trovão. Longe o bastante para acreditar que ainda não o percebemos.' },
      { speaker: 'NARRADOR', text: 'Eles podiam montar uma falsa trilha, acelerar até a fronteira ou deixar uma mensagem para o observador. A decisão definiria quem chegaria primeiro a Sylvaris: os viajantes ou a história sobre eles.' },
    ],
    flags: { humanWatcherKnown: true },
    choices: [
      { id: 'false-trail', label: 'Criar uma trilha falsa usando a forma de corvo', target: 'dawn', flags: { pursuitDelayed: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'race-border', label: 'Acelerar para avisar as sentinelas', target: 'dawn', flags: { rushedToBorder: true } },
      { id: 'leave-message', label: 'Deixar no carvalho a conta de dívida dos orcs', target: 'dawn', flags: { challengedWatcher: true }, requires: { flags: { orcDebt: true } } },
    ],
  }),

  'night-camp': makeScene({
    id: 'night-camp', stage: 'camp', location: 'Abrigo da Pedra Inclinada', speaker: 'NARRADOR',
    title: 'Fogo pequeno, perguntas antigas', mood: 'quiet', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O abrigo era uma pedra inclinada sobre raízes secas, antigo ponto de descanso de mensageiros. Sirius acendeu um fogo pequeno demais para ser visto acima das samambaias. Elara protestou apenas até receber uma caneca aquecida; depois envolveu o metal com ambas as mãos.' },
      { speaker: 'ELARA', text: 'Passei anos treinando para não precisar ser resgatada.' },
      { speaker: 'SIRIUS', text: 'Hoje precisou. Amanhã posso precisar de você.' },
      { speaker: 'ELARA', text: 'Essa é uma maneira irritantemente sensata de impedir minha vergonha.' },
      { speaker: 'NARRADOR', text: 'Sem a urgência da marcha, as diferenças ficaram mais visíveis. Sirius carregava o silêncio de séculos; Elara, a impaciência de alguém a quem entregaram um futuro antes das explicações. O fogo permitia que falassem como duas pessoas, não como herdeiros.' },
    ],
    choices: [
      { id: 'ask-capture-fear', label: 'Perguntar o que ela pensou enquanto estava presa', target: 'camp-dialogue', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'speak-isolation', label: 'Contar como o isolamento alterou sua relação com o medo', target: 'camp-dialogue', flags: { sharedIsolation: true } },
      { id: 'open-letter', label: 'Retirar a carta de Normus', target: 'letter-night', flags: { letterOpened: true } },
    ],
    freeInput: true,
  }),

  'camp-dialogue': makeScene({
    id: 'camp-dialogue', stage: 'camp', location: 'Abrigo da Pedra Inclinada', speaker: 'ELARA',
    title: 'O medo depois da coragem', mood: 'earnest', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'Enquanto estava presa, contei possibilidades. A patrulha me encontraria. A adaga voltaria a aquecer. Um dos três cometeria um erro. Continuei contando porque admitir medo parecia dar a eles outra corda.' },
      { speaker: 'SIRIUS', text: 'E quando ouviu o corvo?' },
      { speaker: 'ELARA', text: 'Pensei que fosse apenas um corvo. Depois pensei que estava alucinando. Quando você virou homem, decidi adiar a compreensão até não haver uma espada no meu pescoço.' },
      { speaker: 'SIRIUS', text: 'Foi uma boa ordem de prioridades.' },
      { speaker: 'ELARA', text: 'Agora posso admitir: tive medo de morrer sem que ninguém soubesse por quê. Não da morte apenas. De virar uma frase conveniente no discurso de outra pessoa.' },
      { speaker: 'NARRADOR', text: 'Sirius compreendia esse medo. Durante séculos, ele próprio fora uma ausência usada por reis, cultos e caçadores. Dizer isso aproximaria os dois; guardar a percepção manteria intacta a defesa que o preservara.' },
    ],
    choices: [
      { id: 'share-erasure', label: 'Dizer que também teme ser transformado em símbolo', target: 'letter-night', flags: { sharedFear: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'promise-witness', label: 'Prometer que contará o que realmente aconteceu na clareira', target: 'letter-night', flags: { promisedWitness: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'guard-feelings', label: 'Guardar a compreensão e vigiar a mata', target: 'letter-night' },
    ],
    freeInput: true,
  }),

  'letter-night': makeScene({
    id: 'letter-night', stage: 'camp', location: 'Abrigo da Pedra Inclinada', speaker: 'NORMUS · CARTA',
    title: 'Uma voz preservada em papel', mood: 'memory', portrait: 'sirius',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius rompeu o selo sem entregar a carta. Leu os trechos abertos em voz baixa, escolhendo quais palavras atravessariam o fogo até Elara.' },
      { speaker: 'NORMUS · CARTA', text: 'Se chegou o dia em que lês estas linhas, então meu silêncio já te feriu mais do que meus inimigos poderiam. Leva a lâmina, mas não herdes minhas decisões sem julgá-las.' },
      { speaker: 'ELARA', text: 'Minha tia usa palavras diferentes para cometer o mesmo erro. Chama o silêncio de tempo concedido.' },
      { speaker: 'SIRIUS', text: 'Meu pai chamou de proteção.' },
      { speaker: 'ELARA', text: 'Talvez ambos tenham protegido nossas vidas e ferido nossa capacidade de escolhê-las. As duas coisas podem ser verdade.' },
      { speaker: 'NARRADOR', text: 'As linhas finais permaneciam cifradas em inventários Bellatrix. Próximo ao medalhão, porém, uma marca surgiu: sete raízes, a terceira cortada — o mesmo sinal do contrato dos orcs. A coincidência não provava autoria. Provava que o inimigo conhecia uma linguagem ligada ao passado de Normus.' },
    ],
    discover: ['carta-de-normus'], flags: { letterOpened: true, sharedLetter: true, symbolMatched: true },
    choices: [
      { id: 'trust-letter', label: 'Permitir que Elara examine apenas a marca revelada', target: 'dawn', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'close-letter', label: 'Fechar a carta antes que ela se aproxime', target: 'dawn', flags: { protectedLetter: true } },
      { id: 'ask-aelwen-symbol', label: 'Perguntar se Aelwen usa o sinal das sete raízes', target: 'dawn', flags: { questionedAelwen: true } },
    ],
    freeInput: true,
  }),

  'orc-trail': makeScene({
    id: 'orc-trail', stage: 'orcTrail', location: 'Trilha Oriental', speaker: 'NARRADOR',
    title: 'Atrás dos que sobreviveram', mood: 'alert', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'As pegadas orientais eram fáceis demais. Os mercenários queriam velocidade ou desejavam ser seguidos. Elara identificou sangue de um ferimento leve, casca raspada por escudo e pequenas pedras brancas deixadas em intervalos regulares.' },
      { speaker: 'ELARA', text: 'Marcas de estrada orcs. Não pertencem a um clã específico. Dizem apenas “passagem usada, perigo atrás”.' },
      { speaker: 'SIRIUS', text: 'Estão avisando os próprios companheiros ou nos avisando?' },
      { speaker: 'ELARA', text: 'Desconhecido. A misericórdia pode ter comprado honestidade, medo ou uma emboscada melhor.' },
      { speaker: 'NARRADOR', text: 'A trilha conduzia a um posto de caça abandonado. Havia luz dentro e vozes que não pertenciam aos três guerreiros. Segui-las poderia revelar o intermediário, mas cada minuto afastava Sirius das fronteiras de Sylvaris.' },
    ],
    choices: [
      { id: 'raven-scout-post', label: 'Reconhecer o posto novamente em forma de corvo', target: 'ruined-post', flags: { scoutedAsRaven: true } },
      { id: 'approach-together', label: 'Aproximar-se ao lado de Elara, sem esconder poder', target: 'ruined-post', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'abandon-trail', label: 'Abandonar a perseguição e retomar o norte', target: 'dawn', flags: { abandonedOrcTrail: true } },
    ],
  }),

  'ruined-post': makeScene({
    id: 'ruined-post', stage: 'orcTrail', location: 'Posto do Carvalho Oco', speaker: 'NARRADOR',
    title: 'O intermediário chegou primeiro', mood: 'urgent', portrait: 'orc',
    passage: [
      { speaker: 'NARRADOR', text: 'O posto estava vazio quando chegaram. A luz vinha de uma lanterna presa a um fio, preparada para parecer carregada por alguém. Sobre a mesa havia quatro tigelas ainda úmidas, cinza de papel queimado e um mapa no qual Sylvaris fora desenhada como um espaço branco.' },
      { speaker: 'ELARA', text: 'Quatro pessoas comeram. Três eram os mercenários. A quarta queimou os documentos e saiu para o norte.' },
      { speaker: 'SIRIUS', text: 'Em direção ao reino.' },
      { speaker: 'ELARA', text: 'Ou em direção a quem acredita que chegaremos ao reino.' },
      { speaker: 'NARRADOR', text: 'Sob uma tigela, Sirius encontrou outra marca de sete raízes. No fundo do posto, ouviu-se um gemido. O orc da cicatriz clara estava ferido e abandonado pelos demais — ou colocado ali como armadilha.' },
    ],
    flags: { foundRuinedPost: true, intermediaryAhead: true },
    choices: [
      { id: 'help-orc', label: 'Ajudar o ferido antes de interrogá-lo', target: 'vark-return', flags: { aidedOrc: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'question-orc', label: 'Exigir primeiro a identidade da quarta pessoa', target: 'vark-return', flags: { questionedWoundedOrc: true } },
      { id: 'suspect-trap', label: 'Recusar a isca e partir imediatamente', target: 'dawn', flags: { avoidedPossibleTrap: true } },
    ],
  }),

  'vark-return': makeScene({
    id: 'vark-return', stage: 'orcTrail', location: 'Posto do Carvalho Oco', speaker: 'ORC FERIDO',
    title: 'A resposta comprada', mood: 'somber', portrait: 'orc',
    passage: [
      { speaker: 'ORC FERIDO', text: 'A quarta pessoa usava máscara de madeira e sabia que falharíamos. Disse que o corvo viria. Disse que a elfa o levaria à rainha.' },
      { speaker: 'SIRIUS', text: 'Homem ou mulher?' },
      { speaker: 'ORC FERIDO', text: 'Voz alterada. Altura humana. Cheiro de remédio élfico nas luvas. Mais que isso seria mentira.' },
      { speaker: 'ELARA', text: 'Por que seus companheiros o deixaram?' },
      { speaker: 'ORC FERIDO', text: 'Porque o intermediário pagou a segunda metade para quem seguisse ao norte. Eu disse que uma dívida de vida vinha antes. Eles discordaram.' },
      { speaker: 'NARRADOR', text: 'Se a história fosse verdadeira, a misericórdia na clareira já mudara o equilíbrio. Se fosse falsa, o orc conhecia exatamente qual virtude usar contra eles. Sirius precisava decidir se transformaria a dívida em aliança ou encerraria o vínculo ali.' },
    ],
    flags: { maskedIntermediaryKnown: true },
    choices: [
      { id: 'accept-warning', label: 'Aceitar o aviso e indicar uma rota segura para o ferido', target: 'dawn', flags: { orcAlliancePossible: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'take-token', label: 'Cobrar a resposta prometida e manter a conta de dívida', target: 'dawn', flags: { debtCollected: true } },
      { id: 'bind-for-patrol', label: 'Deixá-lo contido para uma patrulha élfica', target: 'dawn', flags: { orcDetained: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
    freeInput: true,
  }),

  dawn: makeScene({
    id: 'dawn', stage: 'ridge', location: 'Crista das Folhas Pálidas', speaker: 'NARRADOR',
    title: 'O que permaneceu até a manhã', mood: 'quiet', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Quando a madrugada clareou, Sirius e Elara alcançaram uma crista de onde as primeiras luzes de Sylvaris apareciam entre árvores monumentais. Lethariel ainda não podia ser vista, mas sua presença mudava o ar: pontes vivas rangiam longe, sinos de madeira respondiam ao vento e a água corria em canais que não existiam nos mapas humanos.' },
      { speaker: 'ELARA', text: 'Depois daquela linha de árvores, cada sentinela saberá que chegamos. Algumas verão um sobrevivente. Outras verão o poder que matou exércitos há cinco séculos.' },
      { speaker: 'SIRIUS', text: 'E você? O que vê?' },
      { speaker: 'ELARA', text: 'Vejo o homem que ouviu um grito e veio. Também vejo tudo que escolheu depois. Confiança não apaga nenhuma dessas partes.' },
      { speaker: 'NARRADOR', text: 'A resposta dependia da jornada: podia conter calor nascente, respeito cauteloso ou uma distância que o resgate não vencera. Antes da fronteira, ainda havia tempo para definir como contariam a história da clareira.' },
    ],
    choices: [
      { id: 'tell-together', label: 'Propor que contem juntos toda a verdade', target: 'ridge-consequence', flags: { sharedTestimony: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'let-elara-speak', label: 'Confiar a Elara o primeiro relato às sentinelas', target: 'ridge-consequence', flags: { elaraLeadsTestimony: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'control-story', label: 'Exigir que a forma de corvo permaneça secreta', target: 'ridge-consequence', flags: { ravenSecretDemanded: true }, effects: [{ type: 'relationship_delta', target: 'elara', value: -1 }] },
    ],
    freeInput: true,
  }),

  'ridge-consequence': makeScene({
    id: 'ridge-consequence', stage: 'ridge', location: 'Crista das Folhas Pálidas', speaker: 'NARRADOR',
    title: 'Aquilo que veio atrás', mood: 'alert', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Um assobio atravessou o vale. Depois outro. Elara reconheceu os sinais dos mercenários e os chamados curtos das sentinelas élficas. O encontro na clareira havia alcançado a fronteira antes deles — como dívida, perseguição ou sangue.' },
      { speaker: 'ELARA', text: 'A partir daqui, nossas escolhas deixam de ser privadas.' },
      { speaker: 'SIRIUS', text: 'Nunca foram. Apenas demoramos a encontrar as testemunhas.' },
      { speaker: 'NARRADOR', text: 'Havia caminhos para responder ao passado imediato. Uma conta de dívida podia convocar um inimigo poupado. A cicatriz do raio exigia confissão. Pegadas de fugitivos permitiam preparar uma emboscada. Ou podiam atravessar a fronteira sem buscar controle sobre todas as consequências.' },
    ],
    choices: [
      { id: 'call-debt', label: 'Usar a conta de osso e convocar a dívida orc', target: 'bridge-warning', requires: { flags: { orcDebt: true } } },
      { id: 'confess-blood', label: 'Contar a Elara que aceitará julgamento pela morte', target: 'forest-test', requires: { flags: { orcBloodshed: true } } },
      { id: 'prepare-pursuers', label: 'Preparar uma armadilha não letal para os perseguidores', target: 'storm-pursuit', requires: { flags: { orcsEscaped: true } } },
      { id: 'cross-now', label: 'Atravessar a fronteira sem outro desvio', target: 'border' },
    ],
  }),

  'bridge-warning': makeScene({
    id: 'bridge-warning', stage: 'ridge', location: 'Ponte da Primeira Folha', speaker: 'NARRADOR',
    title: 'Misericórdia que retorna', mood: 'resolute', portrait: 'orc',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius quebrou a conta de osso. O estalo pareceu pequeno demais para atravessar o vale, mas uma figura surgiu no extremo inferior da ponte: o líder das presas quebradas, desarmado e sozinho.' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'A resposta devida: há dois arqueiros humanos atrás de vocês e uma sentinela élfica vendida à pessoa da máscara. Não sei o nome. Sei a posição.' },
      { speaker: 'ELARA', text: 'Por que acreditaríamos?' },
      { speaker: 'ORC DE PRESAS QUEBRADAS', text: 'Porque a dívida termina quando a verdade é testada, não quando é aceita.' },
      { speaker: 'NARRADOR', text: 'A indicação permitiu que Elara encontrasse um fio de sinalização adulterado. As sentinelas leais fecharam a passagem atrás dos perseguidores. Um ato de misericórdia não transformara o mercenário em amigo, mas produzira uma possibilidade que a morte teria encerrado.' },
    ],
    flags: { orcDebtFulfilled: true, traitorWarning: true },
    choices: [
      { id: 'honor-debt-end', label: 'Reconhecer publicamente que o aviso veio do orc', target: 'border', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'hide-source', label: 'Ocultar a fonte para proteger a informação', target: 'border', flags: { orcSourceHidden: true } },
    ],
  }),

  'forest-test': makeScene({
    id: 'forest-test', stage: 'ridge', location: 'Ponte da Primeira Folha', speaker: 'ELARA',
    title: 'Responder pelo trovão', mood: 'somber', portrait: 'elara',
    passage: [
      { speaker: 'ELARA', text: 'As sentinelas verão a raiz queimada e encontrarão o corpo. Se eu disser apenas que você me salvou, estarei usando a verdade para esconder outra verdade.' },
      { speaker: 'SIRIUS', text: 'Diga que eu o matei. Diga também onde estava a lâmina.' },
      { speaker: 'ELARA', text: 'Direi tudo. E ficarei ao seu lado enquanto perguntarem. Responsabilidade não é abandono.' },
      { speaker: 'NARRADOR', text: 'A promessa não garantia perdão. Garantia que Sirius entraria em Sylvaris como alguém disposto a ser testemunhado, não como lenda acima da lei. Para um homem que passara séculos fugindo de tribunais construídos para condená-lo, aquela escolha era quase outra forma de coragem.' },
    ],
    flags: { judgmentForthcoming: true, elaraWillTestify: true },
    choices: [
      { id: 'accept-elara-beside', label: 'Aceitar que Elara permaneça ao seu lado', target: 'border', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'face-alone', label: 'Pedir que ela não arrisque a posição por ele', target: 'border', flags: { facesJudgmentAlone: true } },
    ],
    freeInput: true,
  }),

  'storm-pursuit': makeScene({
    id: 'storm-pursuit', stage: 'ridge', location: 'Desfiladeiro das Folhas Pálidas', speaker: 'NARRADOR',
    title: 'A história que os fugitivos levaram', mood: 'urgent', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'Elara estendeu fios de prata entre pedras, não como lâminas, mas como sinos. Sirius tomou a forma de corvo e pousou acima do desfiladeiro. Dois mercenários orcs surgiram primeiro; atrás deles vinham arqueiros humanos sem brasão. Os fugitivos não eram reforços — eram perseguidos pela mesma pessoa que os contratara.' },
      { speaker: 'ORC DA CICATRIZ CLARA', text: 'O contrato mudou. Agora pagam por todos que viram o homem-corvo.' },
      { speaker: 'ELARA', text: 'Então parem de correr para dentro da minha fronteira e ajudem a fechar a passagem.' },
      { speaker: 'NARRADOR', text: 'Por uma única luta, antigos captores, antiga prisioneira e o estranho que alterara seus destinos formaram a mesma defesa. A armadilha derrubou os arqueiros sem matá-los. Quando as sentinelas élficas chegaram, encontraram uma verdade impossível de reduzir a povos inimigos e heróis simples.' },
    ],
    flags: { pursuersCaptured: true, temporaryOrcAlliance: true },
    choices: [
      { id: 'testify-for-orcs', label: 'Testemunhar que os orcs ajudaram na defesa', target: 'border', effects: [{ type: 'relationship_delta', target: 'elara', value: 1 }] },
      { id: 'secure-humans', label: 'Concentrar-se em identificar os arqueiros humanos', target: 'border', flags: { humanAgentsPrioritized: true } },
    ],
  }),

  border: makeScene({
    id: 'border', stage: 'lethariel', location: 'Portão Vivo de Sylvaris', speaker: 'NARRADOR',
    title: 'A forma da chegada', mood: 'wonder', portrait: 'elara',
    passage: [
      { speaker: 'NARRADOR', text: 'O Portão Vivo não possuía folhas ou dobradiças. Duas árvores antigas afastaram lentamente os galhos quando Elara colocou a mão sobre a casca. Além delas, lanternas verdes marcavam a estrada para Lethariel. Arcos élficos acompanhavam Sirius de plataformas invisíveis.' },
      { speaker: 'SENTINELA', text: 'Princesa Elara. O conselho recebeu aviso de invasão, trovão e sangue. Quem pede entrada ao seu lado?' },
      { speaker: 'NARRADOR', text: 'A resposta pertencia a Elara, mas fora construída por cada decisão desde a clareira. Ela podia apresentá-lo como aliado, testemunha, acusado ou apenas viajante sob proteção temporária. Sirius também podia escolher não atravessar.' },
      { speaker: 'ELARA', text: 'Antes que eu responda por você, Sirius, responda por si. Não ao pacto. Não à rainha. A mim: de que maneira deseja entrar?' },
    ],
    discover: ['lethariel'], flags: { reachedSylvaris: true },
    choices: [
      { id: 'enter-as-trusted', label: 'Entrar ao lado de Elara e aceitar sua apresentação', target: 'ending-trust', requires: { minRelationships: { elara: 3 } } },
      { id: 'enter-with-orc-truth', label: 'Entrar como testemunha da dívida e da conspiração', target: 'ending-mercy', requires: { anyFlags: ['orcDebtFulfilled', 'temporaryOrcAlliance', 'orcAlliancePossible'] } },
      { id: 'enter-for-judgment', label: 'Entregar Fulgarion e responder pela morte na clareira', target: 'ending-tribunal', requires: { flags: { orcBloodshed: true } } },
      { id: 'refuse-name', label: 'Permanecer fora do portão sem revelar o sobrenome', target: 'ending-solitary', requires: { flags: { identityHidden: true } } },
      { id: 'enter-cautiously', label: 'Pedir passagem como Sirius, sem títulos ou promessas', target: 'ending-cautious' },
    ],
    freeInput: true,
  }),

  'ending-trust': makeScene({
    id: 'ending-trust', stage: 'lethariel', location: 'Estrada de Lethariel', speaker: 'ELARA',
    title: 'Dois nomes diante da floresta', mood: 'wonder', portrait: 'elara', ending: true,
    endingLabel: 'Desfecho: Confiança Nascente',
    passage: [
      { speaker: 'ELARA', text: 'Este é Sirius Kayler. Veio a Sylvaris por escolha própria. Salvou minha vida, dividiu riscos e não pediu que eu escondesse o preço de suas decisões. Ele entra como meu aliado e como testemunha, não como propriedade do pacto.' },
      { speaker: 'NARRADOR', text: 'Os arcos não baixaram imediatamente, mas o portão continuou aberto. Sirius atravessou ao lado dela. Pela primeira vez, o nome Kayler entrou em Sylvaris sem pertencer a Normus.' },
      { speaker: 'SIRIUS', text: 'Quando encontrarmos Aelwen, você fará a primeira pergunta.' },
      { speaker: 'ELARA', text: 'Não. Faremos perguntas diferentes. Quero descobrir se ela consegue responder às duas.' },
      { speaker: 'NARRADOR', text: 'À frente, Lethariel acendeu suas luzes entre raízes e estrelas. Atrás deles, um grito, três mercenários e uma escolha de misericórdia ou força já haviam alterado a história que chegaria ao conselho. O encontro terminava; a relação começava.' },
    ],
    flags: { chapterComplete: true, ending: 'trust' },
  }),

  'ending-mercy': makeScene({
    id: 'ending-mercy', stage: 'lethariel', location: 'Estrada de Lethariel', speaker: 'NARRADOR',
    title: 'A verdade que nenhum povo possui sozinho', mood: 'resolute', portrait: 'elara', ending: true,
    endingLabel: 'Desfecho: A Dívida Retorna',
    passage: [
      { speaker: 'ELARA', text: 'Este é Sirius Kayler. A pessoa que nos caça tentou usar orcs sem clã, agentes humanos e um segredo élfico para fabricar inimigos convenientes. Um dos mercenários poupados impediu que a mentira chegasse inteira até nós.' },
      { speaker: 'NARRADOR', text: 'A conta de osso foi registrada ao lado do fragmento do contrato. Pela primeira vez, a conspiração possuía testemunhos vindos de lados que deveriam ter se odiado. O mandante continuava desconhecido, mas já não controlava sozinho a narrativa.' },
      { speaker: 'SIRIUS', text: 'Poupar uma vida não a torna aliada.' },
      { speaker: 'ELARA', text: 'Não. Apenas mantém aberta a possibilidade de que ela escolha algo diferente depois.' },
      { speaker: 'NARRADOR', text: 'Eles seguiram para Lethariel sob guarda, carregando uma aliança improvável e incompleta. O futuro seria mais perigoso por conter mais vozes — e mais verdadeiro pela mesma razão.' },
    ],
    flags: { chapterComplete: true, ending: 'mercy' },
  }),

  'ending-tribunal': makeScene({
    id: 'ending-tribunal', stage: 'lethariel', location: 'Pátio das Testemunhas', speaker: 'NARRADOR',
    title: 'O homem diante do trovão', mood: 'solemn', portrait: 'sirius', ending: true,
    endingLabel: 'Desfecho: Responsabilidade',
    passage: [
      { speaker: 'NARRADOR', text: 'Sirius retirou Fulgarion da cintura e a entregou pela bainha. As sentinelas receberam a espada como quem segura uma tempestade adormecida. Elara relatou o grito, a lâmina no pescoço, o raio e o nome encontrado no morto. Não retirou nenhuma parte para protegê-lo.' },
      { speaker: 'ELARA', text: 'Ele salvou minha vida. Também matou Arvak. Peço que ambas as verdades sejam julgadas juntas.' },
      { speaker: 'SIRIUS', text: 'E se decidirem que uma apaga a outra?' },
      { speaker: 'ELARA', text: 'Então Sylvaris terá falhado antes de você.' },
      { speaker: 'NARRADOR', text: 'Sirius entrou não como convidado, mas como alguém que escolhera responder pelo poder que possuía. Elara caminhou ao lado dele até o Pátio das Testemunhas. A confiança entre ambos não nascera do perdão; nascera da recusa em abandonar a verdade quando ela se tornou difícil.' },
    ],
    flags: { chapterComplete: true, ending: 'tribunal' },
  }),

  'ending-solitary': makeScene({
    id: 'ending-solitary', stage: 'ridge', location: 'Fronteira de Sylvaris', speaker: 'NARRADOR',
    title: 'A estrada que permanece do lado de fora', mood: 'somber', portrait: 'elara', ending: true,
    endingLabel: 'Desfecho: O Nome Guardado',
    passage: [
      { speaker: 'SIRIUS', text: 'Ainda não entrarei como Kayler. Se o nome é o preço, ficarei deste lado.' },
      { speaker: 'ELARA', text: 'Não vou denunciá-lo. Também não chamarei medo de liberdade apenas porque foi você quem o escolheu.' },
      { speaker: 'NARRADOR', text: 'Ela atravessou sozinha para chamar Aelwen. O portão fechou-se entre os dois, deixando uma fresta de luz verde. Sirius podia partir antes que a rainha chegasse ou esperar como homem sem sobrenome.' },
      { speaker: 'NARRADOR', text: 'O grito na clareira fizera seus caminhos se encontrarem, mas não obrigava que permanecessem unidos. Elara levaria a memória de um salvador que ainda não confiava nela. Sirius conservaria o segredo e o custo de ter recusado a primeira porta.' },
      { speaker: 'ELARA', text: 'Espere por mim até o nascer da lua. Depois disso, a escolha volta a ser sua.' },
    ],
    flags: { chapterComplete: true, ending: 'solitary' },
  }),

  'ending-cautious': makeScene({
    id: 'ending-cautious', stage: 'lethariel', location: 'Portão Vivo de Sylvaris', speaker: 'ELARA',
    title: 'Uma passagem, não uma promessa', mood: 'quiet', portrait: 'elara', ending: true,
    endingLabel: 'Desfecho: Aliança Cautelosa',
    passage: [
      { speaker: 'SIRIUS', text: 'Entro como Sirius. Não como herdeiro de uma dívida, arma de uma coroa ou resposta para um pacto.' },
      { speaker: 'ELARA', text: 'Então apresento Sirius, viajante que me ouviu quando a floresta não conseguiu chamar ninguém mais. O restante ele contará quando escolher.' },
      { speaker: 'NARRADOR', text: 'As sentinelas abriram espaço suficiente para uma pessoa e um cavalo. Elara passou primeiro, depois esperou do outro lado. Não estendeu a mão; compreendia que naquele instante companhia significava oferecer presença sem transformar ajuda em condução.' },
      { speaker: 'SIRIUS', text: 'Você sempre discute cada palavra dessa maneira?' },
      { speaker: 'ELARA', text: 'Apenas as que podem virar correntes.' },
      { speaker: 'NARRADOR', text: 'Sirius cruzou o portão. Eles chegavam a Lethariel sem confiança completa e sem destino decidido, mas com algo que nenhum pacto antigo poderia fabricar: uma razão própria para continuar a conversa.' },
    ],
    flags: { chapterComplete: true, ending: 'cautious' },
  }),
}

export const firstSceneId = 'departure'

export const chapter = {
  id: CHAPTER_ID,
  number: 'CAPÍTULO ZERO',
  title: 'O Grito na Floresta',
  subtitle: 'O primeiro encontro de Sirius e Elara',
  scenes,
  firstSceneId,
}
