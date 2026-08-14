export const STORY_VERSION = 3
export const FIRST_SCENE_ID = 'clareira-depois-do-grito'

const line = (speaker, text, speakerId = null) => ({
  type: speaker === 'NARRADOR' ? 'narration' : 'dialogue',
  speaker,
  speakerId,
  text,
})

const scene = (definition) => ({
  minTurns: 2,
  maxTurns: 3,
  constraints: [],
  discoverOnEnter: [],
  discoverBySignal: {},
  flagsBySignal: {},
  ...definition,
  allowedSignals: definition.beats.map(({ signal }) => signal),
})

export const scenes = {
  'clareira-depois-do-grito': scene({
    id: 'clareira-depois-do-grito',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'orcClearing', location: 'Clareira sem nome — Floresta Antiga', mood: 'alert',
    title: 'O grito entre as folhas', participants: ['elara'], portraits: ['elara'],
    objective: 'Transformar o resgate em um primeiro entendimento sem apagar o perigo que ainda cerca a clareira.',
    opening: [
      line('NARRADOR', 'Sirius subiu em seu cavalo enquanto a manhã ainda era uma claridade cinzenta sob as copas. Embainhou Fulgarion, conferiu a carta de Normus e o Medalhão da Folha Partida e tomou a estrada na direção do reino élfico. Não levava estandarte nem escolta. A Floresta Antiga fechava-se atrás dele como um arquivo que recusasse leitores apressados.'),
      line('NARRADOR', 'O grito feminino veio quando a chuva começou: breve, sufocado no meio e próximo o bastante para assustar o cavalo. Sirius desmontou, prendeu as rédeas a um tronco baixo e se desfez numa corrente de sombra e penas. Na forma de corvo, seguiu a voz até uma clareira onde três guerreiros orcs mantinham uma jovem elfa imobilizada. As armaduras não compartilhavam brasão, os sinais de clã tinham sido raspados e as moedas caídas no barro vinham de reinos diferentes. Eram mercenários tentando esconder a origem do pagamento, não representantes de um povo.'),
      line('NARRADOR', 'O corvo mergulhou. Sombra tornou-se mão atrás da prisioneira; uma descarga precisa queimou o nó sem tocar a pele. A elfa ganhou duas respirações, recuperou junto a uma pedra branca a Adaga do Passo Velado e desapareceu num lampejo prateado. Reapareceu atrás do captor. Sirius conduziu o trovão pelo chão, longe das raízes vivas, e os três atacantes recuaram levando um companheiro atordoado. Fugiram para leste com o nome do mandante ainda oculto.'),
      line('NARRADOR', 'Quando o último ruído morreu, a jovem que Sirius conheceria como Elara manteve a adaga baixa, mas não guardada. Sangue marcava o canto de sua boca; os pulsos traziam o relevo das cordas. Ela olhou primeiro para as penas negras dissolvendo-se nos ombros de Sirius, depois para os olhos violetas que permaneciam humanos em ambas as formas. Alívio e suspeita dividiram o mesmo fôlego.'),
      line('ELARA', 'Eu vi o corvo tornar-se homem. Também vi você escolher onde o raio cairia. Antes que eu decida qual dessas coisas me assusta mais: quem é você?', 'elara'),
    ],
    beats: [
      { id: 'primeiras-palavras', signal: 'primeiras_palavras', description: 'Elara mede a voz e as intenções de Sirius.' },
      { id: 'nome-e-limites', signal: 'identidade_tratada', description: 'O nome, a condição de viajante e os limites do resgate são tratados.' },
      { id: 'perigo-permanece', signal: 'perigo_reconhecido', description: 'Ambos reconhecem que os mercenários e o mandante continuam sendo uma ameaça.' },
    ],
    transition: { target: 'vestigios-do-contrato', signal: 'perigo_reconhecido', narration: 'A conversa não encerrou o perigo; deu-lhe contornos. Elara guardou a adaga apenas o suficiente para se ajoelhar junto às marcas deixadas pelos mercenários.' },
    discoverOnEnter: ['sirius-kayler', 'elara', 'floresta-antiga', 'adaga-do-passo-velado'],
    discoverBySignal: { identidade_tratada: ['sirius-kayler'], perigo_reconhecido: ['sylvaris'] },
    flagsBySignal: { primeiras_palavras: { metElara: true }, identidade_tratada: { identityDiscussed: true }, perigo_reconhecido: { mastermindUnknown: true } },
    constraints: ['Elara testemunhou a transformação em corvo.', 'Os três atacantes eram mercenários orcs sem filiação confirmada.', 'O mandante é desconhecido.', 'O resgate já aconteceu antes da primeira fala livre do jogador.'],
  }),

  'vestigios-do-contrato': scene({
    id: 'vestigios-do-contrato',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'clearing', location: 'Clareira sem nome — borda oriental', mood: 'guarded',
    title: 'O que a fuga deixou', participants: ['elara'], portraits: ['elara'],
    objective: 'Examinar os vestígios sem transformar suspeita em certeza e decidir como levar o aviso a Sylvaris.',
    opening: [
      line('NARRADOR', 'No barro havia uma conta de osso escuro, um fio de prata arrancado de uma raiz marcadora e cera sem selo. Nada identificava uma Casa. A mistura parecia deliberada: objetos verdadeiros organizados para produzir uma mentira convincente.'),
      line('ELARA', 'Eles sabiam onde eu recolheria os fios e em qual manhã a patrulha estaria longe. Isso não prova que a ordem veio de Sylvaris. Prova apenas que alguém ouviu informações que não deveriam ter cruzado a fronteira.', 'elara'),
      line('NARRADOR', 'Ela envolveu a cera numa folha larga sem tocá-la diretamente. O gesto era cuidadoso, treinado, mas Sirius percebeu o tremor que surgia sempre que as cordas roçavam a lembrança de seus pulsos.'),
    ],
    beats: [
      { id: 'prova-incompleta', signal: 'prova_incompleta', description: 'A diferença entre indício, rumor e prova é estabelecida.' },
      { id: 'mandante-sem-rosto', signal: 'mandante_sem_rosto', description: 'A identidade de quem pagou permanece corretamente desconhecida.' },
      { id: 'partida-necessaria', signal: 'partida_para_sylvaris', description: 'A necessidade de sair da clareira e avisar Sylvaris se torna imediata.' },
    ],
    transition: { target: 'estrada-das-samambaias', signal: 'partida_para_sylvaris', narration: 'O vento virou e trouxe dois assobios da mata oriental. Elara apagou as marcas mais óbvias, recolheu a prova e indicou uma trilha estreita. Permanecer seria oferecer aos perseguidores um segundo cerco.' },
    discoverBySignal: { prova_incompleta: ['medalhao-da-folha-partida'], partida_para_sylvaris: ['caminho-das-arvores-ausentes'] },
    flagsBySignal: { prova_incompleta: { contractTraceFound: true }, mandante_sem_rosto: { mastermindUnknown: true }, partida_para_sylvaris: { leftClearing: true } },
    constraints: ['A cera não tem selo autenticável.', 'A origem do vazamento é desconhecida.', 'Nenhum povo ou reino pode ser acusado sem prova.'],
  }),

  'estrada-das-samambaias': scene({
    id: 'estrada-das-samambaias',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'forestRide', location: 'Estrada das Samambaias Altas', mood: 'quiet',
    title: 'Duas histórias na mesma estrada', participants: ['elara'], portraits: ['elara'],
    objective: 'Permitir que a conversa revele caráter, memória e desconfiança enquanto a jornada avança.',
    opening: [
      line('NARRADOR', 'O cavalo aceitou Elara com uma desconfiança menos elaborada que a de sua dona. Ela preferiu caminhar ao lado da sela. A chuva reduziu-se a gotas espaçadas, e a Floresta Antiga abriu uma passagem que não existia quando Sirius chegara.'),
      line('ELARA', 'Você seguia para Sylvaris antes de ouvir meu grito. Carrega um medalhão que meus guardiões reconheceriam e uma carta que evita mostrar. Posso respeitar seu silêncio, Sirius, mas não fingirei que ele não viaja conosco.', 'elara'),
      line('NARRADOR', 'Não havia acusação simples na voz dela. Havia curiosidade, receio e a disciplina de quem fora ensinada a distinguir uma pessoa do símbolo que outros tentariam fazer dela.'),
    ],
    beats: [
      { id: 'motivo-da-viagem', signal: 'motivo_discutido', description: 'O propósito da ida de Sirius a Sylvaris é abordado sem forçar revelações privadas.' },
      { id: 'corvo-e-preco', signal: 'forma_do_corvo_discutida', description: 'Elara reage ao que testemunhou e aos limites conhecidos da magia.' },
      { id: 'confianca-em-movimento', signal: 'confianca_em_movimento', description: 'A relação ganha uma memória própria, positiva ou tensa.' },
    ],
    transition: { target: 'caminho-das-arvores-ausentes', signal: 'confianca_em_movimento', narration: 'À frente, a trilha terminou diante de duas árvores que cresciam uma para longe da outra. Elara tocou a casca de ambas; o espaço vazio entre os troncos respondeu com folhas de uma estação impossível.' },
    discoverBySignal: { motivo_discutido: ['carta-de-normus', 'medalhao-da-folha-partida'], forma_do_corvo_discutida: ['sirius-kayler'] },
    flagsBySignal: { motivo_discutido: { sylvarisPurposeDiscussed: true }, forma_do_corvo_discutida: { ravenFormDiscussed: true }, confianca_em_movimento: { roadBondFormed: true } },
    constraints: ['Elara não conhece pensamentos privados de Sirius.', 'A carta de Normus é parcialmente decifrada.', 'A transformação em corvo pertence a Sirius e cobra controle.'],
  }),

  'caminho-das-arvores-ausentes': scene({
    id: 'caminho-das-arvores-ausentes',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'hiddenPath', location: 'Caminho das Árvores Ausentes', mood: 'wonder',
    title: 'A trilha que não pertence à estação', participants: ['elara'], portraits: ['elara'],
    objective: 'Atravessar a passagem instável, aprofundar o diálogo e preparar a entrada política em Lethariel.',
    opening: [
      line('NARRADOR', 'Do outro lado dos troncos, árvores de folhas transparentes ocupavam lugares que a mata comum jurava vazios. Sombras permaneciam no chão depois que seus galhos se moviam. Elara avançou devagar, recolhendo uma folha caída e uma lembrança em voz baixa, como exigia o protocolo dos guardiões.'),
      line('ELARA', 'Alguns chamam isto de estrada para Elyra. Outros dizem que vemos apenas uma versão futura da nossa própria floresta. O registro correto é menos confortável: contestado. Se o caminho tentar mostrar algo que pareça uma certeza, não confie na facilidade.', 'elara'),
      line('NARRADOR', 'A advertência servia à trilha e aos dois viajantes. Entre raízes que não pertenciam a mapa algum, falar sobre destino era perigoso porque qualquer coincidência podia vestir-se de profecia.'),
    ],
    beats: [
      { id: 'natureza-do-caminho', signal: 'caminho_compreendido', description: 'O caráter contestado e instável da passagem é respeitado.' },
      { id: 'pacto-sem-destino', signal: 'pacto_mencionado', description: 'A existência parcial do pacto pode emergir, sem revelar cláusulas protegidas.' },
      { id: 'limiar-da-cidade', signal: 'lethariel_proxima', description: 'A conversa se volta à chegada e ao testemunho que será dado.' },
    ],
    transition: { target: 'portas-de-lethariel', signal: 'lethariel_proxima', narration: 'O caminho devolveu os dois à estação correta sem aviso. A luz mudou, as árvores impossíveis desapareceram e sinos de madeira viva anunciaram que Lethariel estava próxima.' },
    discoverOnEnter: ['caminho-das-arvores-ausentes'],
    discoverBySignal: { caminho_compreendido: ['elyra'], pacto_mencionado: ['pacto-dos-descendentes'], lethariel_proxima: ['lethariel'] },
    flagsBySignal: { caminho_compreendido: { crossedHiddenPath: true }, pacto_mencionado: { pactExistenceRaised: true }, lethariel_proxima: { borderReached: true } },
    constraints: ['A natureza e o destino do caminho são contestados.', 'Elara conhece a existência do pacto, não suas cláusulas integrais.', 'Coincidência não prova profecia.'],
  }),

  'portas-de-lethariel': scene({
    id: 'portas-de-lethariel',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'lethariel', location: 'Lethariel — Arco da Primeira Raiz', mood: 'guarded',
    title: 'A cidade escuta primeiro', participants: ['elara'], portraits: ['elara'],
    objective: 'Converter o relato da clareira em testemunho político antes da audiência com Aelwen.',
    opening: [
      line('NARRADOR', 'Lethariel não surgiu de uma muralha, mas de camadas: pontes suspensas, plataformas moldadas sem corte e habitações abertas entre raízes vastas. Guardiões mantiveram distância quando reconheceram Elara ferida. Nenhum deles apontou arma para Sirius; nenhum deixou de observar Fulgarion.'),
      line('ELARA', 'Aqui, meu primeiro relato será preservado antes que a corte o torne conveniente. Direi que três mercenários orcs me capturaram, que a filiação deles não foi confirmada, que você me encontrou na forma de corvo e que o mandante continua desconhecido.', 'elara'),
      line('NARRADOR', 'Ela ofereceu a Sirius uma pausa para contestar, acrescentar ou limitar o que pertencia apenas a ele. Era a primeira vez desde a clareira que lhe dava poder sobre o registro sem entregar-lhe poder sobre a memória dela.'),
    ],
    beats: [
      { id: 'testemunho-partilhado', signal: 'testemunho_alinhado', description: 'Os limites do testemunho público são negociados.' },
      { id: 'registro-sem-preconceito', signal: 'mercenarios_sem_culpa_coletiva', description: 'O ataque é registrado sem culpa coletiva contra orcs.' },
      { id: 'audiencia-convocada', signal: 'audiencia_convocada', description: 'A audiência com Aelwen se torna a próxima cena necessária.' },
    ],
    transition: { target: 'audiencia-da-seiva-clara', signal: 'audiencia_convocada', narration: 'O escriba da porta selou duas cópias do relato. Uma seguiu para os guardiões; a outra, para o Palácio da Seiva Clara. Antes que a cera esfriasse, a resposta da rainha chegou: ambos seriam recebidos.' },
    discoverOnEnter: ['lethariel', 'sylvaris'],
    discoverBySignal: { testemunho_alinhado: ['rainha-aelwen'], mercenarios_sem_culpa_coletiva: ['orcs'] },
    flagsBySignal: { testemunho_alinhado: { sharedTestimony: true }, mercenarios_sem_culpa_coletiva: { rejectedCollectiveBlame: true }, audiencia_convocada: { audienceCalled: true } },
    constraints: ['O testemunho não pode atribuir mandante sem prova.', 'Elara narra apenas o que presenciou.', 'Sirius controla o que revela sobre si.'],
  }),

  'audiencia-da-seiva-clara': scene({
    id: 'audiencia-da-seiva-clara',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'palace', location: 'Palácio da Seiva Clara — Câmara de Audiência', mood: 'resolute',
    title: 'Duas vozes diante da coroa', participants: ['elara', 'rainha-aelwen'], portraits: ['elara', 'rainha-aelwen'], multiNpc: true,
    objective: 'Introduzir Aelwen, confrontar o peso político do resgate e separar o pacto das escolhas presentes.',
    opening: [
      line('NARRADOR', 'A Câmara de Audiência guardava silêncio sem exigir submissão. Aelwen esperava diante de uma mesa baixa onde já repousava a cópia selada do relato. Quando Elara entrou, a rainha abandonou por um instante a postura pública; os olhos percorreram os pulsos feridos da sobrinha e só depois voltaram a Sirius.'),
      line('AELWEN', 'Sirius Kayler. Eu esperava sua chegada, não as circunstâncias. Agradeço o que fez por Elara. Essa gratidão não comprará suas respostas nem apagará as perguntas que trouxe.', 'rainha-aelwen'),
      line('ELARA', 'E não comprará meu silêncio sobre a falha que permitiu a emboscada. Alguém conhecia meus marcadores e a escala da patrulha.', 'elara'),
      line('NARRADOR', 'Tia e sobrinha não discordavam sobre o perigo; discordavam sobre a velocidade com que uma verdade deveria ser exposta. Pela primeira vez, Sirius estava no centro de uma conversa que não existia apenas para responder a ele.'),
    ],
    beats: [
      { id: 'aelwen-e-sirius', signal: 'aelwen_reconhece_sirius', description: 'Aelwen reconhece a identidade e a herança de Sirius sem conhecer sua intimidade.' },
      { id: 'vozes-em-conflito', signal: 'elara_e_aelwen_reagem', description: 'Elara e Aelwen reagem de modos distintos à fala de Sirius.' },
      { id: 'pacto-protegido', signal: 'pacto_permanece_protegido', description: 'A existência do pacto é reconhecida; seu teor integral permanece secreto.' },
    ],
    transition: { target: 'conversa-sem-elara', signal: 'pacto_permanece_protegido', narration: 'Uma curadora aguardava havia tempo demais à porta. Elara resistiu, depois cedeu ao olhar da tia. Guardou a adaga e deixou a câmara para que os pulsos fossem tratados, não sem avisar que retornaria antes de qualquer juramento.' },
    discoverOnEnter: ['rainha-aelwen', 'lethariel'],
    discoverBySignal: { aelwen_reconhece_sirius: ['normus-kayler'], pacto_permanece_protegido: ['pacto-dos-descendentes'] },
    flagsBySignal: { aelwen_reconhece_sirius: { aelwenMet: true }, elara_e_aelwen_reagem: { multiNpcConversation: true }, pacto_permanece_protegido: { pactProtected: true } },
    constraints: ['Aelwen conhece parte da história política de Sirius, não seus pensamentos.', 'Elara e Aelwen mantêm vozes e interesses próprios.', 'O teor integral do pacto é secreto.'],
  }),

  'conversa-sem-elara': scene({
    id: 'conversa-sem-elara',
    chapterId: 'capitulo-zero-o-grito-na-floresta', chapterNumber: 'CAPÍTULO ZERO',
    stage: 'palace', location: 'Palácio da Seiva Clara — Câmara de Audiência', mood: 'quiet',
    title: 'O que a rainha pode dizer', participants: ['rainha-aelwen'], portraits: ['rainha-aelwen'],
    objective: 'Sustentar uma cena inteira sem Elara, aprofundando a relação política entre Sirius e Aelwen.',
    opening: [
      line('NARRADOR', 'Sem Elara, o silêncio mudou de natureza. Aelwen fechou o relato da emboscada e colocou sobre a mesa a metade élfica de uma folha de prata. Ela não a aproximou do medalhão de Sirius. A distância era uma forma de consentimento.'),
      line('AELWEN', 'Normus pediu que eu protegesse possibilidades, não que decidisse a vida do filho dele. Posso confirmar que o pacto existe e que sua vinda a Sylvaris foi prevista como risco. Não posso entregar todas as cláusulas enquanto elas envolverem pessoas que ainda não consentiram.', 'rainha-aelwen'),
      line('NARRADOR', 'A resposta continha verdade e recusa em proporções deliberadas. A rainha não fingia ignorância; assumia que guardava algo e oferecia a Sirius a oportunidade de julgar esse limite.'),
    ],
    beats: [
      { id: 'normus-e-aelwen', signal: 'normus_discutido', description: 'A relação histórica entre Normus e Aelwen é tratada apenas dentro do registro permitido.' },
      { id: 'limite-politico', signal: 'limite_da_rainha_testado', description: 'Sirius pode questionar, confrontar ou aceitar o limite sem resposta pré-fabricada.' },
      { id: 'proxima-investigacao', signal: 'investigacao_proposta', description: 'A emboscada se conecta ao próximo objetivo concreto da jornada.' },
    ],
    transition: { target: 'retorno-de-elara', signal: 'investigacao_proposta', narration: 'Passos firmes atravessaram a galeria. A porta abriu antes que a rainha chamasse, e Elara retornou com os pulsos enfaixados e a impaciência inteiramente preservada.' },
    discoverBySignal: { normus_discutido: ['normus-kayler', 'carta-de-normus'], limite_da_rainha_testado: ['pacto-dos-descendentes'] },
    flagsBySignal: { normus_discutido: { normusAelwenDiscussed: true }, limite_da_rainha_testado: { queenBoundaryTested: true }, investigacao_proposta: { investigationProposed: true } },
    constraints: ['Elara não está presente e não pode falar nesta cena.', 'Aelwen não revela o teor integral do pacto.', 'Aelwen não sabe o conteúdo privado da carta ou os pensamentos de Sirius.'],
  }),

  'retorno-de-elara': scene({
    id: 'retorno-de-elara',
    chapterId: 'capitulo-um-raizes-sem-selo', chapterNumber: 'CAPÍTULO UM',
    stage: 'palace', location: 'Palácio da Seiva Clara — Galeria das Memórias', mood: 'wonder',
    title: 'Raízes sem selo', participants: ['elara', 'rainha-aelwen'], portraits: ['elara', 'rainha-aelwen'], multiNpc: true,
    objective: 'Iniciar o arco seguinte: investigar o vazamento sem encerrar a convivência nem reduzir a história a uma conversa fixa.',
    opening: [
      line('ELARA', 'A curadora mandou repousar. Decidi interpretar “repouso” como “não correr dentro do palácio”. Se há uma investigação, eu participo.', 'elara'),
      line('AELWEN', 'Há um arquivo de marcadores na Casa das Folhas Baixas. O lacre não foi rompido, mas uma cópia pode ter sido feita antes do fechamento. Vocês irão ao amanhecer. Como testemunhas, não como acusadores.', 'rainha-aelwen'),
      line('NARRADOR', 'O novo capítulo não começou com uma estrada escolhida num menu, mas com três vontades em tensão. Aelwen precisava proteger o reino. Elara precisava impedir que proteção se tornasse silêncio. Sirius ainda precisava descobrir por que sua própria chegada parecia escrita nas margens de um ataque que ninguém admitia compreender.'),
    ],
    beats: [
      { id: 'papel-de-cada-um', signal: 'papeis_definidos', description: 'Cada participante afirma seu papel na investigação.' },
      { id: 'memoria-da-clareira', signal: 'clareira_recordada', description: 'A memória do resgate influencia a conversa sem repetir a cena.' },
      { id: 'amanhecer', signal: 'partida_ao_amanhecer', description: 'A história se prepara para deixar o palácio e abrir novas cenas.' },
    ],
    transition: { target: 'caminho-das-folhas-baixas', signal: 'partida_ao_amanhecer', narration: 'Quando a primeira luz tocou a copa, Aelwen permaneceu no palácio. Elara e Sirius atravessaram os portões de Lethariel levando o relato selado, a cera sem marca e perguntas que agora pertenciam a mais de uma cena.' },
    discoverOnEnter: ['pacto-dos-descendentes'],
    discoverBySignal: { papeis_definidos: ['sylvaris'], clareira_recordada: ['floresta-antiga'] },
    flagsBySignal: { papeis_definidos: { investigationRolesDefined: true }, clareira_recordada: { rescueRememberedAcrossScenes: true }, partida_ao_amanhecer: { chapterOneJourneyStarted: true } },
    constraints: ['Aelwen permanece no palácio ao fim da cena.', 'A investigação começa por documentos e testemunhos, não por acusação.', 'Memórias anteriores devem influenciar reações quando relevantes.'],
  }),

  'caminho-das-folhas-baixas': scene({
    id: 'caminho-das-folhas-baixas',
    chapterId: 'capitulo-um-raizes-sem-selo', chapterNumber: 'CAPÍTULO UM',
    stage: 'hiddenPath', location: 'Caminho das Folhas Baixas — Sylvaris', mood: 'alert',
    title: 'O arquivo além da cidade', participants: ['elara'], portraits: ['elara'],
    objective: 'Levar a jornada para um novo cenário e transformar memórias, relações e pistas em continuidade narrativa.',
    opening: [
      line('NARRADOR', 'Aelwen ficou para trás. A estrada descia entre raízes largas até uma região onde a copa quase tocava o chão. Elara caminhava com a mão ferida junto ao corpo, economizando movimento, mas recusava qualquer passo que parecesse fuga.'),
      line('ELARA', 'Ontem eu era uma desconhecida presa numa clareira. Hoje dividimos um testemunho e uma ordem que nenhum de nós recebeu em silêncio. Não sei se isso nos torna aliados. Sei apenas que quero ouvir de você o que não deve se perder quando encontrarmos o arquivo.', 'elara'),
      line('NARRADOR', 'Ao longe, entre folhas baixas, uma construção de madeira viva guardava o próximo conjunto de vozes. A história seguia aberta: cada fala de Sirius podia alterar confiança, tensão, memória e o modo como os fatos seriam abordados, sem oferecer-lhe uma lista de destinos prontos.'),
    ],
    beats: [
      { id: 'legado-da-conversa', signal: 'memoria_retomada', description: 'Uma memória relevante de cenas anteriores é retomada organicamente.' },
      { id: 'arquivo-avistado', signal: 'arquivo_avistado', description: 'O novo local e seu risco imediato entram na narrativa.' },
      { id: 'continuidade-aberta', signal: 'historia_continua', description: 'O arco permanece pronto para novas cenas sem retornar a um diálogo estático.' },
    ],
    transition: { target: 'caminho-das-folhas-baixas', signal: 'historia_continua', narration: 'A Casa das Folhas Baixas aguardava além da próxima curva. As consequências já registradas seguiriam com eles quando novas cenas fossem acrescentadas ao arco.' },
    discoverOnEnter: ['sylvaris'],
    flagsBySignal: { memoria_retomada: { crossSceneMemoryUsed: true }, arquivo_avistado: { archiveSighted: true }, historia_continua: { currentArcOpen: true } },
    constraints: ['Aelwen não está presente.', 'A cena deve retomar memórias relevantes sem reproduzir falas antigas literalmente.', 'O arco continua aberto para expansão estruturada.'],
  }),
}

export const story = {
  version: STORY_VERSION,
  title: 'Crônicas Vivas',
  firstSceneId: FIRST_SCENE_ID,
  scenes,
  chapters: [
    { id: 'capitulo-zero-o-grito-na-floresta', number: 'CAPÍTULO ZERO', title: 'O Grito na Floresta', sceneIds: Object.values(scenes).filter(({ chapterId }) => chapterId === 'capitulo-zero-o-grito-na-floresta').map(({ id }) => id) },
    { id: 'capitulo-um-raizes-sem-selo', number: 'CAPÍTULO UM', title: 'Raízes sem Selo', sceneIds: Object.values(scenes).filter(({ chapterId }) => chapterId === 'capitulo-um-raizes-sem-selo').map(({ id }) => id) },
  ],
}

export const chapter = story
export const firstSceneId = FIRST_SCENE_ID
