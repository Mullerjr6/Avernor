import { declaresCombatAction, parsePlayerInput } from './playerInput.js'

const names = { elara: 'ELARA', 'rainha-aelwen': 'AELWEN', 'mercenario-orc': 'MERCENÁRIO' }

const sceneVoices = {
  'confronto-na-clareira': [
    'A intervenção de Sirius alcançou primeiro o mercenário que guardava a trilha. Ele moveu o pé para fora da lama, buscando terreno firme, enquanto o captor junto à elfa ajustava a lâmina sem feri-la. O terceiro olhou para as copas, como se ainda esperasse encontrar nelas o corvo que acabara de desaparecer.',
    'A chuva engrossou sobre as folhas largas e tornou visível a distância entre os três homens: próximos o bastante para cumprir o contrato, distantes demais para protegerem uns aos outros sem abandonar a prisioneira. A clareira oferecia essa falha a quem soubesse usá-la.',
    'Nenhum brasão respondeu por eles. Havia apenas couro molhado, ferro meteórico, três respirações desiguais e uma mulher presa que acompanhava cada mudança de atenção. O próximo instante pertenceria à estratégia declarada por Sirius.',
  ],
  'negociacao-na-clareira': [
    'O mercenário ouviu sem a impaciência teatral de um salteador. Seus olhos foram até a saída oriental antes de voltarem a Sirius; sobreviver ao contrato começava a disputar espaço com cumpri-lo.',
    'A resposta dividiu os captores. O homem da adaga queria encerrar a conversa, mas o que segurava Elara afrouxou involuntariamente a mão quando percebeu que talvez tivesse recebido menos informações que os companheiros.',
    'Elara encontrou no desacordo uma respiração de vantagem. Seus dedos alcançaram o nó inferior, e o fio prateado escondido sob a manga respondeu com um brilho tão breve que poderia ser confundido com chuva.',
  ],
  'combate-na-clareira': [
    'A ação declarada encontrou uma clareira cheia de limites. O captor mais próximo reagiu; os outros precisaram escolher entre proteger a fuga, manter Elara presa e enfrentar o desconhecido sem a formação que o pagamento fingira comprar.',
    'Raízes molhadas desviaram passos, e o tecido de ferro meteórico caiu meio palmo para o lado da adaga rúnica. Elara viu a abertura, mas ainda havia uma lâmina entre seus pulsos e a liberdade.',
    'O confronto chegou ao ponto em que força sem precisão cobraria o preço da pessoa que pretendia proteger. Elara preparou o próprio movimento, esperando apenas que a atenção dos captores se partisse uma última vez.',
  ],
  'clareira-depois-do-grito': [
    'Elara sustentou o olhar, ainda equilibrando gratidão e cautela. As poucas palavras de Sirius não apagavam a violência da clareira, mas mudavam a forma como ela media o desconhecido diante de si.',
    'O tremor nos pulsos de Elara reapareceu e foi contido quando ela fechou os dedos ao redor da bainha. Ela ouviu até o fim antes de responder, como se a ordem das palavras pudesse revelar uma intenção que a magia não mostrava.',
    'Um galho quebrou longe demais para ser ameaça imediata e perto o bastante para encerrar qualquer ilusão de segurança. Elara lançou um olhar à mata oriental e devolveu a atenção a Sirius com urgência renovada.',
  ],
  'vestigios-do-contrato': [
    'Elara aproximou a folha que protegia a cera da luz cinzenta. Em vez de converter suspeita em acusação, separou em voz baixa aquilo que tinham visto daquilo que apenas temiam.',
    'A jovem percorreu com a ponta da adaga a distância entre as pegadas, sem tocar o vestígio. Sua resposta nasceu menos da certeza do que do cuidado de não oferecer ao verdadeiro mandante um inimigo conveniente.',
    'Do leste vieram dois assobios curtos. Elara dobrou a folha sobre a cera e se levantou; a conversa havia produzido tudo que a clareira podia oferecer sem novas testemunhas.',
  ],
  'estrada-das-samambaias': [
    'Elara caminhou alguns passos em silêncio, permitindo que a resposta de Sirius existisse sem ser imediatamente julgada. O cavalo moveu as orelhas entre as duas vozes, e a estrada avançou sob uma chuva cada vez mais leve.',
    'Ao mencionar o corvo, Elara observou por um instante as copas. Sua curiosidade não era fascínio vazio: procurava o limite entre dom, risco e aquilo que Sirius preferia conservar só para si.',
    'A tensão deixou de ser apenas cautela e ganhou a forma mais difícil de uma confiança em construção. Elara não ofereceu promessa; ofereceu uma verdade pequena o bastante para ser escolhida.',
  ],
  'caminho-das-arvores-ausentes': [
    'As folhas transparentes mantiveram sombras depois que o vento cessou. Elara respondeu sem tratar o fenômeno como confirmação de destino, e essa recusa em transformar mistério em certeza tornou sua voz mais firme.',
    'O nome do pacto pareceu alterar o espaço entre os dois, não a floresta. Elara respirou antes de continuar, consciente de que conhecimento parcial podia ferir tanto quanto uma mentira bem construída.',
    'Os sinos distantes de Lethariel atravessaram a passagem impossível. Elara voltou-se para a luz comum que surgia adiante e trouxe a conversa para o que ambos teriam de dizer quando fossem ouvidos por outros.',
  ],
  'portas-de-lethariel': [
    'Elara releu o relato com a atenção de quem sabia que uma frase preservada podia se tornar proteção ou arma. Ela distinguiu o que vira, o que Sirius revelara e o que nenhum dos dois tinha direito de afirmar.',
    'Um escriba aguardava sem interromper. Elara manteve os mercenários como indivíduos contratados e recusou a facilidade política de converter três culpados na culpa de um povo inteiro.',
    'A resposta da rainha chegou em madeira marcada, ainda úmida de seiva. Elara percebeu a tensão nos guardiões antes de ler e ergueu os olhos para Sirius: a conversa deixaria de pertencer apenas aos dois.',
  ],
  'audiencia-da-seiva-clara': [
    'Aelwen recebeu a fala de Sirius sem baixar os olhos; Elara, ao lado, reagiu primeiro com uma respiração presa. A mesma frase alcançara nelas memórias diferentes, e nenhuma tentou falar pela outra.',
    'Elara discordou antes que a tia concluísse, não por desrespeito, mas porque reconheceu o instante em que cautela política começava a parecer silêncio. Aelwen aceitou a interrupção e reformulou a resposta com precisão deliberada.',
    'Quando o pacto foi nomeado, a rainha pousou a mão sobre a metade de prata sem aproximá-la do medalhão de Sirius. Elara percebeu o limite e não o defendeu; exigiu apenas que Aelwen o assumisse como escolha.',
  ],
  'conversa-sem-elara': [
    'Aelwen permaneceu em silêncio tempo suficiente para separar lembrança de obrigação política. Sem Elara na câmara, sua resposta perdeu a ternura familiar e ganhou a franqueza cuidadosa de uma soberana diante do filho de um antigo aliado.',
    'A rainha não se ofendeu com o confronto. Ajustou a metade da folha sobre a mesa e nomeou o próprio limite, recusando-se a disfarçar segredo como ignorância ou a converter proteção passada em autoridade sobre Sirius.',
    'Aelwen fechou o medalhão na palma sem uni-lo à outra metade. Em vez de oferecer uma revelação que não podia cumprir, apresentou um próximo passo verificável: o arquivo de marcadores e as cópias que talvez tivessem escapado ao lacre.',
  ],
  'retorno-de-elara': [
    'Elara entrou no meio da resposta e ouviu o restante antes de contestar. Aelwen permitiu a interrupção; a investigação começava justamente na diferença entre a urgência da herdeira e a responsabilidade da rainha.',
    'As duas reagiram à fala de Sirius por caminhos opostos. Elara procurou a consequência humana; Aelwen, a prova que sobreviveria a um conselho hostil. A tensão entre ambas ampliou a pergunta em vez de encerrá-la.',
    'A primeira luz atravessou a galeria. Aelwen permaneceu junto aos registros, enquanto Elara ajustou a bainha da adaga e transformou as últimas palavras de Sirius numa memória que levaria para fora do palácio.',
  ],
  'caminho-das-folhas-baixas': [
    'Elara reconheceu na fala de Sirius uma lembrança que já não pertencia apenas à clareira. A forma como ela respondeu carregava a confiança e as reservas acumuladas, sem repetir mecanicamente o que ambos haviam dito antes.',
    'A Casa das Folhas Baixas apareceu entre raízes curvadas. Elara diminuiu o passo e voltou a conversa para o risco imediato, preservando o que Sirius dissera como contexto, não como ordem.',
    'O arquivo permanecia adiante e a estrada já continha mais vozes do que no começo. A resposta de Elara não encerrou o arco; deixou uma pergunta humana aberta e espaço estruturado para a próxima cena da investigação.',
  ],
}

const npcSpeech = {
  elara: {
    'negociacao-na-clareira': [
      'Eles conheciam minha rota, não meu nome. Isso significa que foram pagos por uma posição e uma hora, não por uma história completa. Se pretende mantê-los falando, pergunte o que lhes prometeram quando chegassem à fronteira; um caminho de fuga vale mais para eles do que outra ameaça.',
      'O homem atrás de mim apertou a corda quando o outro mencionou pagamento. Não receberam as mesmas instruções. Continue separando aquilo que cada um acredita saber; eu preciso de duas respirações em que nenhum deles esteja olhando para minhas mãos.',
      'Agora. O nó cedeu e minha adaga está a um passo. Não escolha por mim o que farei com ela, mas faça com que o homem da trilha precise olhar para você quando eu me mover.',
    ],
    'combate-na-clareira': [
      'Não use o centro da clareira. As raízes conduzem a descarga até onde estou presa. Force o homem da adaga para a pedra branca; ali o solo é seco e os outros dois terão de quebrar a formação para alcançá-lo.',
      'O ferro está soltando da bainha. Mais uma abertura e consigo alcançar a runa, mas o captor atrás de mim ainda usa meu corpo como cobertura. Não tente adivinhar meu salto; crie distância e eu escolherei onde reaparecer.',
      'A mão dele abriu. Minha adaga voltou a responder e eu tenho um destino seguro à vista. Mantenha a atenção dos outros longe da pedra branca por uma respiração — a próxima escolha será minha.',
    ],
    'clareira-depois-do-grito': [
      'Não vou transformar o resgate numa dívida, mas também não vou fingir que ele não diz nada sobre você. Eu estava contando respirações quando vi um corvo cair entre três lâminas e escolher precisão em vez de espetáculo. Diga o que deseja que eu saiba agora; o restante pode continuar desconhecido até que exista confiança para outra pergunta.',
      'Meu nome é Elara. Isso é verdade suficiente para este instante. Eu estava examinando uma rota que deveria permanecer segura e encontrei homens que conheciam meus passos melhor do que deveriam. Se continuarmos conversando, prefiro que cada resposta seja oferecida, não arrancada.',
      'Os três fugiram para leste e não podemos presumir que estejam sozinhos. Ainda assim, partir sem olhar os vestígios seria entregar ao mandante a vantagem que ele comprou. Podemos falar enquanto examinamos a clareira, desde que nenhuma pergunta seja confundida com obrigação.',
    ],
    'vestigios-do-contrato': [
      'Temos vestígios, não um rosto. A cera sem selo pode ter vindo de qualquer corte; as moedas misturadas parecem feitas para nos empurrar contra o inimigo errado. Posso dizer que alguém conhecia minha rota. Qualquer coisa além disso seria medo vestido de prova, e já houve gente suficiente lucrando com esse tipo de erro.',
      'Eles rasparam marcas de clã, misturaram moedas e trouxeram ferro meteórico para conter minha adaga. Isso exige preparo, mas não identifica um reino. Minha rota devia ser conhecida por poucas pessoas; é aí que a investigação começa, mesmo que a resposta me desagrade.',
      'Levarei a cera, as medidas das pegadas e a posição das moedas. Não levarei uma acusação pronta. Em Lethariel, alguém tentará preencher o vazio com conveniência política; quero chegar antes que uma suspeita repetida muitas vezes passe a ser chamada de prova.',
    ],
    'estrada-das-samambaias': [
      'Eu consigo caminhar ao lado de uma pergunta sem exigir que ela seja respondida inteira. O que não consigo é esquecer que você já seguia para Sylvaris com um símbolo da minha Casa. Se quiser preservar parte da história, diga onde termina o que posso perguntar. Um limite honesto vale mais que uma versão confortável.',
      'A forma de corvo não me assusta pelo que é, mas pelo que os outros farão quando souberem. Cortes transformam raridade em presságio, arma ou direito de posse. Se pretende entrar em Sylvaris, precisa decidir não o que é capaz de esconder, mas a quem escolhe contar.',
      'Lethariel não recebe viajantes como uma cidade humana recebe. A floresta observa antes dos guardas, e os guardas escutam antes de abrir caminho. Posso conduzi-lo até minha tia, mas não posso prometer qual lembrança o nome Kayler despertará no conselho.',
    ],
    'caminho-das-arvores-ausentes': [
      'Este caminho oferece imagens antes de oferecer contexto. É assim que rumores e profecias ruins começam. Sobre o pacto, sei que existe e que Aelwen guardou uma parte dele com Normus; não conheço todas as cláusulas. Se alguém disser que ele decide o que devemos sentir ou escolher, essa pessoa sabe mais do que eu — ou mente melhor.',
      'Minha tia chama isto de memória territorial; outros chamam de vontade da floresta. Eu só afirmo o que testemunhei: o caminho reage a nomes, perdas e promessas, mas nunca explicou por quê. O sentido dessas imagens continua contestado até entre os Círculos.',
      'Quando atravessarmos, haverá gente pronta para interpretar cada silêncio nosso. Direi que você me resgatou, que os atacantes eram mercenários e que o mandante permanece desconhecido. O que disser sobre Normus, o medalhão ou sua magia continuará pertencendo a você.',
    ],
    'portas-de-lethariel': [
      'Registrarei os três atacantes como mercenários orcs sem clã confirmado. Também registrarei que o mandante não foi identificado. Se a corte quiser uma conclusão mais útil politicamente, terá de produzi-la sem usar minha voz. Quanto à sua forma de corvo, pertence ao seu relato decidir o que se torna público.',
      'O escriba precisa de fatos que outra testemunha possa conferir. Direi onde estavam as cordas, como minha adaga foi isolada e para que lado fugiram. Não escreverei que três indivíduos representam um povo, nem que moedas misturadas provam quem pagou por elas.',
      'Aelwen aceitou recebê-lo antes do conselho. Isso significa que reconheceu o medalhão ou o nome de seu pai, talvez ambos; não significa que tenha decidido confiar. Dentro do palácio, pergunte quando uma resposta for incompleta. Minha tia respeita precisão, mesmo quando ela a constrange.',
    ],
    'audiencia-da-seiva-clara': [
      'Não quero gratidão usada como cortina. Sirius precisa ouvir o que você sabe, tia, e também precisa saber quando está diante de um segredo que você escolheu manter. Depois disso, ele poderá responder ao limite real, não a uma desculpa inventada para poupá-lo.',
      'O pacto não pode ser explicado como se Sirius e eu fôssemos cláusulas herdadas. Se nossos nomes aparecem nele, queremos saber por quê, quem consentiu e o que ainda pode ser recusado. Proteger uma escolha exige primeiro permitir que ela exista.',
      'Eu ouvi o que Aelwen pode provar e o que decidiu guardar. Agora quero separar o perigo atual do juramento antigo: alguém copiou meus marcadores de rota. Se o pacto for a razão, encontraremos evidência; se não for, não o usaremos para explicar todo inimigo.',
    ],
    'retorno-de-elara': [
      'Não pretendo entrar no arquivo procurando um culpado que já escolhemos. Quero descobrir quem podia copiar os marcadores, quando a cópia teria sido feita e quem ganhou com o meu desaparecimento. E quero levar conosco o modo como contamos a clareira: fatos primeiro, suspeitas nomeadas como suspeitas.',
      'Os registros da Casa das Folhas Baixas anotam entrada, cópia e correção em camadas diferentes de tinta. Se uma rota foi alterada, talvez descubramos quando; se uma página desapareceu, o espaço deixado por ela ainda pode indicar quem precisava do silêncio.',
      'Partiremos sem comitiva ostensiva. Guardas demais avisariam quem quer que tenha tocado o arquivo, e guardas de menos repetiriam o erro da clareira. Aelwen nos dará duas sentinelas que manterão distância; o restante dependerá da atenção, não do título.',
    ],
    'caminho-das-folhas-baixas': [
      'Eu me lembro do que você disse antes, inclusive do que evitou dizer. Não uso isso como prova sobre Avernor, apenas como parte da pessoa que aprendi a reconhecer. Quando abrirmos aquele arquivo, diga se perceber que minha pressa está transformando hipótese em certeza. Eu farei o mesmo por você.',
      'A casa adiante preserva rotas usadas por refugiados durante a Caça às Bruxas. Isso pode explicar o interesse nos marcadores e também por que alguém preferiu roubar uma cópia a solicitar acesso. Nenhuma dessas possibilidades está provada; ambas merecem cuidado.',
      'Depois da clareira, eu teria chamado isto apenas de investigação. Agora sei que também procuramos o ponto em que a história de Normus encontra os passos dos mercenários. Se não houver ligação, aceitaremos a ausência. Se houver, precisaremos decidir quem pode ouvi-la sem transformá-la em arma.',
    ],
  },
  'mercenario-orc': {
    'confronto-na-clareira': [
      'Você viu três armas e uma prisioneira; não viu o contrato. Pode falar, recuar ou descobrir quanto vale essa distância sem a espada que deixou junto ao cavalo. Mas não espere que entreguemos nosso único meio de sair vivos apenas porque surgiu das penas com olhos de tempestade.',
      'Não confunda nossa cautela com indecisão. Fomos pagos para cruzar a fronteira com ela respirando, e isso ainda é possível. O que não estava no acordo era enfrentar um metamórfico. Diga o que veio buscar antes que meus companheiros decidam que a resposta está nas suas mãos.',
      'A chuva está apagando rastros e nossa paciência junto com eles. Se existe uma proposta, torne-a concreta. Se existe um ataque, assuma-o. Permanecer entre os dois só aumenta a chance de alguém nesta clareira cometer um erro irreversível.',
    ],
    'negociacao-na-clareira': [
      'Quer termos? Recebemos metade antes de entrar e receberíamos o restante numa passagem a leste. O intermediário ocultou rosto, voz e selo. Não posso vender um nome que nunca me deram. Posso negociar a mulher, a rota de saída e o silêncio sobre quem decidiu ouvir antes de atacar.',
      'Meu companheiro acredita que o pagamento nos espera. Eu acredito que a trilha já pode estar fechada e que fomos contratados também para carregar a culpa. Se quer que eu solte a elfa, ofereça uma saída que os outros dois consigam aceitar sem me atravessarem pelas costas.',
      'Chega. Levaremos nossas armas e nenhum juramento seu. A elfa fica, o ferro fica e cada lado conserva uma razão para não transformar esta manhã em três cadáveres. Se houver perseguição antes da trilha oriental, o acordo termina.',
    ],
    'combate-na-clareira': [
      'Sem espada e cercado por raízes vivas. Talvez seja poderoso; isso não o torna imune ao espaço entre um raio e a pessoa que pretende salvar. Dê outro passo sem calcular esse intervalo e todos perderemos aquilo que viemos buscar.',
      'Ele está tentando separar a formação. Fechem a trilha, tirem a adaga do alcance dela e não ofereçam ao raio uma linha única. Nosso pagamento não vale morrer, mas fugir agora vale menos se deixarmos uma testemunha armada atrás de nós.',
      'Recuem para leste. O contrato acabou no instante em que perdemos o controle da prisioneira. Quem pagou por isto pode cobrar de homens vivos — se tiver coragem de mostrar o rosto.',
    ],
  },
  'rainha-aelwen': {
    'audiencia-da-seiva-clara': [
      'Eu reconheço Sirius Kayler, o medalhão que carrega e a responsabilidade que assumi diante de Normus. Não reconheço autoridade para decidir seus sentimentos, seus passos ou o uso que fará da herança. Posso preservar um pacto e ainda admitir que preservá-lo possui custos. Pergunte; quando eu não puder responder, direi que estou guardando, não que desconheço.',
      'Elara está correta ao distinguir proteção de consentimento. Normus pediu abrigo para uma criança perseguida, não obediência de um homem adulto. O pacto registra deveres meus e de minha Casa; não concede a Sylvaris domínio sobre Sirius nem converte gratidão em aliança.',
      'Há uma parte que posso abrir diante de ambos e outra que envolve testemunhos ainda protegidos pelos Círculos. Não chamarei a segunda de perdida. Ela existe, está sob guarda e permanece secreta até que as pessoas alcançadas por ela possam ser ouvidas.',
    ],
    'conversa-sem-elara': [
      'Normus foi meu aliado e meu amigo, mas amizade com o pai não me concede posse sobre o filho. O pacto existe. Seu teor integral permanece protegido porque envolve vontades além da minha. Posso oferecer registros verificáveis, a metade do medalhão e meu testemunho. Não oferecerei uma certeza fabricada apenas para tornar esta audiência mais fácil.',
      'Durante a Caça, esconder um nome podia salvar uma vida; depois dela, o mesmo silêncio passou a impedir escolhas. Essa é a dívida que reconheço. Não lhe peço perdão antecipado, Sirius. Ofereço acesso ao que posso provar e responsabilidade pelo que decidi ocultar.',
      'O arquivo de marcadores pode mostrar se o ataque pertence ao presente ou se alguém está procurando caminhos usados no tempo de Normus. Essa distinção importa. Um pacto antigo não deve ser usado como resposta automática para todo perigo novo.',
    ],
    'retorno-de-elara': [
      'Vocês irão como testemunhas autorizadas. Elara conhece os protocolos; Sirius oferece uma perspectiva que ainda não foi moldada pela corte. Nenhum de vocês está autorizado a acusar, apreender ou prometer em nome de Sylvaris. Tragam cópias, divergências e silêncios. Às vezes, o que falta num arquivo identifica melhor uma mão do que aquilo que ela deixou.',
      'Duas sentinelas acompanharão a distância necessária para proteger sem conduzir. Se encontrarem resistência, preservem o registro antes de perseguir alguém. Uma página recuperada pode valer mais do que um suspeito acuado e pronto para repetir o nome de quem o pagou.',
      'O conselho saberá apenas que a herdeira revisa uma rota comprometida. A ligação com Normus e o medalhão permanece secreta por enquanto, não por vergonha, mas porque ainda não sabemos se pertence ao ataque. Voltem com fatos suficientes para mudar essa decisão ou confirmá-la.',
    ],
  },
}

const openingIntentResponses = {
  identityAndCondition: 'Se prefere guardar o nome, guardarei a pergunta. Quanto a mim: consigo caminhar. Meus pulsos estão feridos e o ferro deles drenou calor da adaga, mas não preciso que finja que isso não existe nem que decida por mim o que sou capaz de fazer. Pode me chamar de Elara; eu o chamarei de viajante até que escolha outra coisa.',
  identityRefusal: 'Ninguém atravessa três lâminas por uma desconhecida e continua sendo ninguém. Mas não preciso arrancar um nome de quem acabou de me devolver a liberdade. Até que escolha outro, vou chamá-lo de viajante — e julgá-lo pelo que fizer depois desta clareira, não pelo título que recusou.',
  reasonAway: 'Eu estava inspecionando uma antiga rota de refugiados nas margens de Sylvaris. Alguns marcadores de passagem foram removidos, e uma comitiva anunciaria minha posição antes que eu descobrisse quem os tocou. Vim com discrição e encontrei uma emboscada preparada para minha adaga. Estar longe de casa foi escolha minha; ser encontrada por aqueles três, não.',
  elaraIdentity: 'Elara. Sou de Lethariel e respondo perante os Círculos da Memória de Sylvaris. Meu título pode esperar; nesta clareira ele atrairia mais perigo do que respeito. Por enquanto, basta saber que a rota que eu examinava deveria ser secreta e que alguém pagou para conhecê-la.',
  attackers: 'Não reconheci nenhum dos três. As marcas de clã foram raspadas, as moedas pertencem a reinos diferentes e eles sabiam usar ferro meteórico contra minha adaga. Isso prova preparação, não autoria. Quem os contratou permanece desconhecido, e culpar um povo inteiro só ajudaria o verdadeiro mandante.',
  condition: 'Consigo caminhar, embora meus pulsos discordem. A adaga consome calor quando abro um passo e o ferro deles tornou o último salto pior. Preciso de alguns minutos, não de tutela. Se quiser ajudar, veja se deixaram cera, ordens ou pegadas que a chuva ainda não levou.',
  ravenMagic: 'Vi sombra tornar-se pena e pena tornar-se homem, mas não conheço o nome desse dom. Em Sylvaris, raridade costuma atrair interpretações antes de compreensão. Não vou anunciá-lo. Ainda assim, preciso saber se a transformação deixa algum rastro que seus perseguidores possam reconhecer.',
  destination: 'Sylvaris fica além das trilhas orientais, mas a entrada segura mudou depois da remoção dos marcadores. Posso conduzi-lo a Lethariel quando terminarmos aqui. Antes disso, precisamos descobrir se aqueles mercenários conheciam apenas minha rota ou também esperavam alguém vindo pela estrada.',
  help: 'Ajude-me a preservar o que a chuva ainda não apagou. Não persiga os três sozinho e não toque nas moedas antes que eu registre a posição delas. Depois, se ainda pretende seguir para Sylvaris, viajaremos pela rota que eles não parecem conhecer.',
}

const openingIntentNarration = {
  identityAndCondition: 'Elara reconheceu as duas partes da resposta: o limite imposto ao nome e a preocupação dirigida aos ferimentos. A adaga baixou um pouco mais. Ela avaliou os próprios pulsos antes de responder, sem usar a dor para invadir o silêncio que Sirius escolhera manter.',
  identityRefusal: 'A recusa não soou como apresentação, e Elara teve o cuidado de não tratá-la como uma. A ponta da adaga desceu mais um dedo, não por confiança completa, mas em reconhecimento ao limite que Sirius acabara de impor.',
  reasonAway: 'A pergunta alcançou uma preocupação que Elara já carregava antes da emboscada. Seus olhos seguiram por um instante a trilha oriental; quando voltou a encará-lo, a cautela tinha cedido lugar à precisão de quem decidira explicar a própria escolha.',
  elaraIdentity: 'Elara hesitou apenas no espaço entre oferecer um nome e entregar uma posição política. A floresta ainda podia esconder ouvidos, e o título que carregava explicaria demais a qualidade da emboscada.',
  attackers: 'Ao voltar a atenção para os fugitivos, Elara se agachou perto da marca deixada por uma joelheira no barro. A raiva estava presente, mas não recebeu permissão para ocupar o lugar da prova.',
  condition: 'Elara avaliou os próprios pulsos antes de responder. Não escondeu a dor nem permitiu que ela fosse confundida com incapacidade; havia nessa distinção uma disciplina aprendida muito antes da clareira.',
  ravenMagic: 'As penas que ainda se desfaziam junto aos ombros de Sirius atraíram novamente o olhar de Elara. A curiosidade apareceu sem apagar o cálculo político: certos prodígios eram perigosos sobretudo depois de serem narrados por testemunhas erradas.',
  destination: 'A menção ao reino élfico alterou a postura de Elara. Pela primeira vez desde o resgate, ela examinou não apenas o homem diante dela, mas a estrada pela qual ele chegara e o destino que ambos agora compartilhavam.',
  help: 'O pedido ou a oferta deslocou a conversa da identidade para a urgência. Elara guardou parte da lâmina e percorreu a clareira com os olhos, escolhendo tarefas que preservariam indícios sem transformar gratidão em comando.',
}

function normalize(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function containsAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase))
}

function openingIntent(text) {
  const value = normalize(text)
  const refusesIdentity = containsAny(value, ['nao sou ninguem', 'sou ninguem', 'meu nome nao importa', 'nao importa quem sou', 'prefiro nao dizer meu nome'])
  const asksCondition = containsAny(value, ['esta bem', 'esta ferida', 'machucada', 'ferimentos', 'consegue andar', 'precisa de ajuda'])
  if (refusesIdentity && asksCondition) return 'identityAndCondition'
  if (refusesIdentity) return 'identityRefusal'
  if (containsAny(value, ['longe de casa', 'faz aqui', 'fazendo aqui', 'por aqui', 'fora de casa', 'saiu de casa', 'veio ate aqui', 'porque veio', 'por que veio'])) return 'reasonAway'
  if (containsAny(value, ['quem e voce', 'qual seu nome', 'como se chama', 'quem voce e'])) return 'elaraIdentity'
  if (containsAny(value, ['quem eram', 'quem sao eles', 'quem eram eles', 'orcs', 'atacantes', 'mercenarios', 'mandante', 'pagou por isso'])) return 'attackers'
  if (asksCondition) return 'condition'
  if (containsAny(value, ['corvo', 'transformacao', 'transformar', 'magia', 'raio', 'poder'])) return 'ravenMagic'
  if (containsAny(value, ['sylvaris', 'lethariel', 'reino elfico', 'para onde', 'onde fica', 'caminho'])) return 'destination'
  if (containsAny(value, ['posso ajudar', 'vou ajudar', 'o que fazemos', 'que faremos', 'vamos sair', 'vamos investigar', 'como posso'])) return 'help'
  return ''
}

function isQuestionLike(text) {
  const raw = String(text ?? '').trim()
  const value = normalize(raw)
  return /\?\s*$/u.test(raw) || /^(oq|o que|por que|porque|quem|onde|aonde|como|quando|qual|quais|quanto|quantos|sera que|voce sabe)\b/u.test(value)
}

function declaresAttack(text) {
  return declaresCombatAction(text)
}

function dialogueFor(scene, index, intent) {
  const respondingParticipants = scene.id === 'confronto-na-clareira' ? ['mercenario-orc'] : scene.participants
  return respondingParticipants.map((speakerId) => {
    const variants = npcSpeech[speakerId]?.[scene.id]
    const contextual = scene.id === 'clareira-depois-do-grito' && speakerId === 'elara' ? openingIntentResponses[intent] : ''
    const actionBySpeaker = {
      elara: 'Elara contém o primeiro impulso de responder e observa o rosto de Sirius antes de escolher as palavras.',
      aelwen: 'Aelwen sustenta o silêncio por um instante, atento ao que a pergunta revela além de seu sentido imediato.',
      'mercenario-orc': 'O mercenário consulta os companheiros com um movimento breve dos olhos; a resposta não pertence inteiramente a nenhum dos três.',
    }
    return {
      speakerId,
      speaker: names[speakerId],
      text: contextual || variants?.[Math.min(index, variants.length - 1)] || 'Não tenho uma resposta completa. Posso dizer apenas o que testemunhei e separar isso do que ainda permanece desconhecido.',
      action: index === 1 && !contextual ? actionBySpeaker[speakerId] : '',
      emotion: index === 0 ? 'guarded' : index === 1 ? 'reflective' : 'firm',
    }
  })
}

function afterNarrationFor(scene, index) {
  const sceneSpecific = {
    'confronto-na-clareira': [
      'A chuva escorreu pela mão do captor e alcançou o punho da faca. Ele precisou ajustar a pressão; por um segundo, a elfa ganhou espaço para mover dois dedos contra o nó. A fala de Sirius não a libertara, mas já havia alterado o que cada um podia arriscar.',
      'Um dos mercenários procurou a trilha com os olhos, outro mediu a distância até Sirius. A aparente unidade entre eles começava a revelar três medos diferentes, e a prisioneira acompanhava cada fissura sem desperdiçar movimento.',
      'A clareira chegara ao ponto em que hesitar também seria uma escolha. O próximo gesto decidiria se o intervalo conquistado pela palavra terminaria em passagem, armadilha ou sangue.',
    ],
    'negociacao-na-clareira': [
      'Elara aproveitou a atenção desviada e girou o pulso dentro da corda molhada. O nó cedeu apenas a largura de uma unha. Sirius viu; os mercenários, ocupados em calcular o preço da própria retirada, não.',
      'A proposta não trouxe confiança, mas distribuiu a dúvida. O homem da trilha queria partir, o da adaga queria receber outra vez, e o captor começava a suspeitar que nenhuma soma compraria uma saída limpa daquela mata.',
      'Quando a resposta terminou, já não havia um único acordo possível, mas três vontades conflitantes sob a mesma armadura sem brasão. Era a brecha de que Elara precisava.',
    ],
    'combate-na-clareira': [
      'O impacto não encerrou a luta; reorganizou-a. Lama, raízes e a posição da refém passaram a importar tanto quanto força, e cada guerreiro precisou escolher entre proteger o contrato e proteger a própria garganta.',
      'Elara acompanhou o ritmo do confronto com os pulsos presos, guardando energia para o instante em que uma abertura fosse real. Sirius percebeu que vencer depressa seria menos importante do que impedir uma lâmina desesperada.',
      'A última formação dos mercenários rompeu-se. Restava transformar vantagem em libertação antes que o medo tornasse qualquer um deles imprevisível.',
    ],
  }

  return sceneSpecific[scene.id]?.[index] || [
    'A resposta não encerrou o assunto. Mudou, porém, a maneira como os presentes passaram a ocupar o mesmo silêncio.',
    'O que fora dito permaneceu entre eles como contexto para a pergunta seguinte, e não como uma frase destinada a ser repetida.',
    'A conversa produzira movimento suficiente para que o mundo ao redor voltasse a exigir atenção. O próximo lugar não apagaria o que fora dito ali.',
  ][index]
}

export function localReply({ text, state, scene }) {
  const index = Math.min(2, state.sceneTurns)
  const beat = scene.beats[Math.min(index, scene.beats.length - 1)]
  const question = isQuestionLike(text)
  const intent = scene.id === 'clareira-depois-do-grito' ? openingIntent(text) : ''
  const combatDeclared = ['confronto-na-clareira', 'negociacao-na-clareira'].includes(scene.id) && declaresAttack(text)
  const negotiationBroken = scene.id === 'negociacao-na-clareira' && combatDeclared
  const declaredAction = parsePlayerInput(text).actions.join(' ')
  const lightningDeclared = /\b(raio|relampago|eletric|trovao)\b/u.test(normalize(declaredAction || text))
  const narration = combatDeclared
    ? lightningDeclared
      ? 'A descarga partiu de Sirius na direção que ele declarara. O clarão arrancou sombras das raízes e obrigou os três captores a reagir; o raio fora lançado, mas alcançar o alvo e decidir o que o impacto causaria ainda pertenciam às distâncias, às defesas e ao instante seguinte.'
      : 'Sirius rompeu a distância segundo a ofensiva que declarara. O movimento obrigou os três captores a abandonar a ameaça ensaiada e reagir; o ataque já pertencia à cena, mas seu resultado ainda dependeria das posições, das defesas e do instante seguinte.'
    : declaredAction
      ? 'A ação que Sirius escolhera deixou de ser hipótese e passou a pertencer à cena. Os presentes reagiram ao gesto realmente executado; qualquer efeito sobre eles, porém, ainda dependeria da distância, da resistência e das condições daquele instante.'
      : openingIntentNarration[intent] || sceneVoices[scene.id]?.[index] || 'A intervenção de Sirius alterou o equilíbrio da cena. Quem estava presente reagiu primeiro ao significado concreto, sem transformar suas palavras numa abstração conveniente.'
  const dialogue = combatDeclared
    ? [{
        speakerId: 'mercenario-orc',
        speaker: names['mercenario-orc'],
        text: 'Fechem o flanco e mantenham a prisioneira atrás da lâmina! Se ele quiser tirá-la daqui, terá de atravessar os três — e fazê-lo sem acertar a mulher que veio salvar.',
        action: 'O captor puxa Elara para trás, enquanto os outros dois abandonam a ameaça ensaiada e procuram terreno firme.',
        emotion: 'alarmed',
      }]
    : dialogueFor(scene, index, intent)
  const afterNarration = combatDeclared
    ? `${lightningDeclared ? 'O raio lançado' : 'A ofensiva'} não resolveu o confronto; revelou sua geometria. Elara baixou o centro do corpo para não ser usada como escudo, o homem da trilha avançou cedo demais e o portador da adaga hesitou entre preservar o prêmio e sobreviver. Pela primeira vez, os três já não agiam como se tivessem o controle.`
    : afterNarrationFor(scene, index)
  return {
    narration,
    dialogue,
    afterNarration,
    sceneEffects: [{ type: negotiationBroken ? 'tension' : index === 2 ? 'presence' : 'ambience', value: negotiationBroken ? 'A ação ofensiva encerrou os termos e converteu a clareira em combate.' : index === 2 ? 'A cena se aproxima de uma transição orgânica.' : 'O ambiente acompanha a tensão sem decidir por Sirius.' }],
    relationshipSuggestions: scene.participants.map((characterId) => ({ characterId, delta: negotiationBroken ? { affinity: 0, trust: -1, respect: 0, romance: 0, tension: 2 } : { affinity: 0, trust: question ? 1 : 0, respect: 1, romance: 0, tension: 0 } })),
    memorySuggestions: scene.participants.map((characterId) => ({
      characterId,
      type: negotiationBroken ? 'conflict' : 'conversation',
      summary: negotiationBroken ? `${names[characterId]} testemunhou Sirius encerrar a negociação com uma ação ofensiva declarada durante “${scene.title}”.` : `${names[characterId]} recordou a intervenção de Sirius durante “${scene.title}” como parte da relação, não como fato canônico.`,
      importance: negotiationBroken ? 4 : index === 2 ? 3 : 2,
    })),
    storySignals: scene.id === 'confronto-na-clareira'
      ? ['confronto_iniciado', combatDeclared ? 'abordagem_combativa' : 'abordagem_dialogo']
      : negotiationBroken
        ? ['negociacao_rompida_por_ataque']
      : beat ? [beat.signal] : [],
    source: 'local-canon',
  }
}
