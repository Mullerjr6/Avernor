const names = { elara: 'ELARA', 'rainha-aelwen': 'AELWEN' }

const sceneVoices = {
  'clareira-depois-do-grito': [
    'Elara sustentou o olhar, ainda equilibrando gratidão e cautela. A pergunta de Sirius não apagava a violência da clareira, mas mudava a forma como ela media o desconhecido diante de si.',
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
    'clareira-depois-do-grito': 'Não vou transformar o resgate numa dívida, mas também não vou fingir que ele não diz nada sobre você. Eu estava contando respirações quando vi um corvo cair entre três lâminas e escolher precisão em vez de espetáculo. Diga o que deseja que eu saiba agora; o restante pode continuar desconhecido até que exista confiança para outra pergunta.',
    'vestigios-do-contrato': 'Temos vestígios, não um rosto. A cera sem selo pode ter vindo de qualquer corte; as moedas misturadas parecem feitas para nos empurrar contra o inimigo errado. Posso dizer que alguém conhecia minha rota. Qualquer coisa além disso seria medo vestido de prova, e já houve gente suficiente lucrando com esse tipo de erro.',
    'estrada-das-samambaias': 'Eu consigo caminhar ao lado de uma pergunta sem exigir que ela seja respondida inteira. O que não consigo é esquecer que você já seguia para Sylvaris com um símbolo da minha Casa. Se quiser preservar parte da história, diga onde termina o que posso perguntar. Um limite honesto vale mais que uma versão confortável.',
    'caminho-das-arvores-ausentes': 'Este caminho oferece imagens antes de oferecer contexto. É assim que rumores e profecias ruins começam. Sobre o pacto, sei que existe e que Aelwen guardou uma parte dele com Normus; não conheço todas as cláusulas. Se alguém disser que ele decide o que devemos sentir ou escolher, essa pessoa sabe mais do que eu — ou mente melhor.',
    'portas-de-lethariel': 'Registrarei os três atacantes como mercenários orcs sem clã confirmado. Também registrarei que o mandante não foi identificado. Se a corte quiser uma conclusão mais útil politicamente, terá de produzi-la sem usar minha voz. Quanto à sua forma de corvo, pertence ao seu relato decidir o que se torna público.',
    'audiencia-da-seiva-clara': 'Não quero gratidão usada como cortina. Sirius precisa ouvir o que você sabe, tia, e também precisa saber quando está diante de um segredo que você escolheu manter. Depois disso, ele poderá responder ao limite real, não a uma desculpa inventada para poupá-lo.',
    'retorno-de-elara': 'Não pretendo entrar no arquivo procurando um culpado que já escolhemos. Quero descobrir quem podia copiar os marcadores, quando a cópia teria sido feita e quem ganhou com o meu desaparecimento. E quero levar conosco o modo como contamos a clareira: fatos primeiro, suspeitas nomeadas como suspeitas.',
    'caminho-das-folhas-baixas': 'Eu me lembro do que você disse antes, inclusive do que evitou dizer. Não uso isso como prova sobre Avernor, apenas como parte da pessoa que aprendi a reconhecer. Quando abrirmos aquele arquivo, diga se perceber que minha pressa está transformando hipótese em certeza. Eu farei o mesmo por você.',
  },
  'rainha-aelwen': {
    'audiencia-da-seiva-clara': 'Eu reconheço Sirius Kayler, o medalhão que carrega e a responsabilidade que assumi diante de Normus. Não reconheço autoridade para decidir seus sentimentos, seus passos ou o uso que fará da herança. Posso preservar um pacto e ainda admitir que preservá-lo possui custos. Pergunte; quando eu não puder responder, direi que estou guardando, não que desconheço.',
    'conversa-sem-elara': 'Normus foi meu aliado e meu amigo, mas amizade com o pai não me concede posse sobre o filho. O pacto existe. Seu teor integral permanece protegido porque envolve vontades além da minha. Posso oferecer registros verificáveis, a metade do medalhão e meu testemunho. Não oferecerei uma certeza fabricada apenas para tornar esta audiência mais fácil.',
    'retorno-de-elara': 'Vocês irão como testemunhas autorizadas. Elara conhece os protocolos; Sirius oferece uma perspectiva que ainda não foi moldada pela corte. Nenhum de vocês está autorizado a acusar, apreender ou prometer em nome de Sylvaris. Tragam cópias, divergências e silêncios. Às vezes, o que falta num arquivo identifica melhor uma mão do que aquilo que ela deixou.',
  },
}

function dialogueFor(scene, index) {
  return scene.participants.map((speakerId) => ({
    speakerId,
    speaker: names[speakerId],
    text: npcSpeech[speakerId]?.[scene.id] ?? 'Não tenho uma resposta completa. Posso dizer apenas o que testemunhei e separar isso do que ainda permanece desconhecido.',
    action: index === 1 ? `${names[speakerId] === 'AELWEN' ? 'Aelwen' : 'Elara'} deixa o silêncio permanecer por um instante antes de continuar.` : '',
    emotion: index === 0 ? 'guarded' : index === 1 ? 'reflective' : 'firm',
  }))
}

export function localReply({ text, state, scene }) {
  const index = Math.min(2, state.sceneTurns)
  const beat = scene.beats[Math.min(index, scene.beats.length - 1)]
  const isQuestion = /\?\s*$/u.test(String(text).trim())
  const narration = sceneVoices[scene.id]?.[index] ?? 'A fala de Sirius alterou o silêncio da cena. Quem estava presente reagiu ao significado antes de procurar uma resposta segura.'
  const dialogue = dialogueFor(scene, index).map((entry) => ({
    ...entry,
    text: `${isQuestion ? 'A pergunta merece uma resposta direta. ' : ''}${entry.text}`,
  }))
  return {
    narration,
    dialogue,
    afterNarration: index === 2
      ? 'A conversa havia produzido movimento suficiente para que o mundo ao redor voltasse a exigir atenção. O próximo lugar não apagaria o que fora dito ali.'
      : 'Nenhuma conclusão fechou o assunto. A resposta criou espaço para a fala seguinte e deixou uma mudança perceptível entre os presentes.',
    sceneEffects: [{ type: index === 2 ? 'presence' : 'ambience', value: index === 2 ? 'A cena se aproxima de uma transição orgânica.' : 'O ambiente acompanha a tensão sem decidir por Sirius.' }],
    relationshipSuggestions: scene.participants.map((characterId) => ({
      characterId,
      delta: { affinity: 0, trust: isQuestion ? 1 : 0, respect: 1, romance: 0, tension: 0 },
    })),
    memorySuggestions: scene.participants.map((characterId) => ({
      characterId,
      type: 'conversation',
      summary: `${names[characterId] === 'AELWEN' ? 'Aelwen' : 'Elara'} recordou a fala de Sirius durante “${scene.title}” como parte da relação, não como fato canônico.`,
      importance: index === 2 ? 3 : 2,
    })),
    storySignals: beat ? [beat.signal] : [],
    source: 'local-canon',
  }
}
