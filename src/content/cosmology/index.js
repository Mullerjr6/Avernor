import { record } from '../schema.js'
import {
  applyArchiveDossiers, cosmologyArchiveDossiers, portalArchiveDossiers, worldArchiveDossiers,
  returnedArchiveDossiers, necromancyArchiveDossiers, endTimesArchiveDossiers, narKhalionArchiveDossiers,
} from '../editorial/archiveDossiers.js'

const cosmologyRecords = [
  record({ id: 'o-veu', name: 'O Véu', subtitle: 'A fronteira que não é um muro', summary: 'Limite instável entre vivos, mortos, sonhos, memórias, espaços incompletos e outros mundos.', description: 'O Véu surgiu, segundo a Canção do Primeiro Céu, quando a realidade foi rompida em sete fragmentos. Estudos verificam apenas seus efeitos: perda de continuidade, repetição de lugares e memórias que se comportam como matéria. Não é uma estrada nem uma fonte segura de poder.', category: 'Estrutura cosmológica', status: 'Observado indiretamente', truthStatus: 'witnessed', relations: [{ label: 'Fraturas do Véu', to: '/portais' }, { label: 'Canção do Primeiro Céu', to: '/mitologia/cancao-do-primeiro-ceu' }] }),
  record({ id: 'eco-primeiro-ceu', name: 'O Eco do Primeiro Céu', subtitle: 'O nome religioso da mana', summary: 'Interpretação de que a mana é o fragmento invisível da memória primordial.', description: 'Bruxos usam o termo para lembrar que a magia não lhes pertence. Naturalistas registram mana por seus efeitos, mas não confirmam sua origem mitológica. A hereditariedade permanece exclusiva a Kayler, Nimbus e Rivs.', category: 'Princípio arcano', status: 'Interpretação tradicional', truthStatus: 'disputed', relations: [{ label: 'Doutrina das Três Correntes', to: '/mitologia/doutrina-tres-correntes' }] }),
]

export const cosmology = applyArchiveDossiers(cosmologyRecords, cosmologyArchiveDossiers)

const portalRecords = [
  record({ id: 'fraturas-do-veu', name: 'Fraturas do Véu', subtitle: 'Passagens que cobram passagem', summary: 'Portais raros, perigosos e instáveis, criados por rupturas extremas; jamais servem como transporte cotidiano.', description: 'Podem assumir forma de arco, água, sombra, espelho, runa, tempestade, caminho ou floresta deslocada. Alguns só permitem entrada; outros alteram tempo ou memória. Surgem após magia extrema, batalhas, sacrifícios, morte de criaturas antigas, juramentos quebrados ou alinhamentos celestes.', category: 'Fenômeno limiar', status: 'Raro', truthStatus: 'witnessed', limitations: ['Destino incerto', 'Preço físico ou memorial', 'Instabilidade temporal', 'Possível passagem de mão única'], relations: [{ label: 'O Véu', to: '/cosmologia/o-veu' }, { label: 'Vigias do Limiar', to: '/faccoes/vigias-do-limiar' }] }),
  record({ id: 'espelho-de-sal', name: 'Espelho de Sal', subtitle: 'A fratura que devolve outra idade', summary: 'Lâmina de água imóvel no Deserto de Zharak que reflete o observador anos mais velho ou mais jovem.', description: 'Duas pessoas atravessaram e retornaram com lembranças incompatíveis. O local é cercado por marcos, não por muralhas: aproximar-se sem escriba e testemunha é proibido pelas cidades de poço.', category: 'Fratura registrada', status: 'Selada por vigilância', location: 'Deserto de Zharak', truthStatus: 'witnessed', relations: [{ label: 'Cartógrafos do Impossível', to: '/faccoes/cartografos-do-impossivel' }] }),
  record({ id: 'caminho-das-arvores-ausentes', name: 'Caminho das Árvores Ausentes', subtitle: 'Uma trilha que não pertence à estação', summary: 'Passagem de Sylvaris cuja vegetação muda para espécies nunca catalogadas em Avernor.', description: 'O caminho aparece apenas depois de certas tempestades violetas. Guardiões recolhem folhas e memórias antes de fechar o acesso. Alguns acreditam que leva a Elyra; outros, a uma versão futura da própria floresta.', category: 'Fratura registrada', status: 'Intermitente', location: 'Floresta Antiga', truthStatus: 'disputed', relations: [{ label: 'Elyra', to: '/outros-mundos/elyra' }, { label: 'Sylvaris', to: '/reinos/sylvaris' }] }),
]

export const portals = applyArchiveDossiers(portalRecords, portalArchiveDossiers)

const worldRecords = [
  record({ id: 'elyra', name: 'Elyra', subtitle: 'Mundo da Luz Imóvel', summary: 'Lugar sem noite observável, onde sombras permanecem mesmo após seus objetos se moverem.', description: 'Fragmentos retornados de Elyra perdem cor quando expostos ao luar de Avernor. Peregrinos descrevem cidades claras sem habitantes visíveis. Não se sabe se a luz preserva, aprisiona ou apenas registra.', category: 'Outro mundo', status: 'Acesso não controlado', truthStatus: 'witnessed', curiosities: ['Relatos divergem sobre a passagem do tempo.'] }),
  record({ id: 'morvath', name: 'Morvath', subtitle: 'Terra das Cinzas Vivas', summary: 'Planície onde cinzas se agrupam ao redor de nomes falados e preservam calor sem fogo.', description: 'A cinza reage a memória e luto. Amostras em Avernor tornam-se inertes depois de sete dias, mas podem apagar uma palavra de documentos próximos. A Corte de Cinza busca rotas permanentes para o lugar.', category: 'Outro mundo', status: 'Hostil', truthStatus: 'witnessed', relations: [{ label: 'Corte de Cinza', to: '/faccoes/corte-de-cinza' }] }),
  record({ id: 'naelor', name: 'Naelor', subtitle: 'Mar sem Margens', summary: 'Oceano sem costa conhecida onde estrelas aparecem sob a quilha.', description: 'Retornados trazem sal que não se dissolve e medo de céu aberto. Cartógrafos não concordam se Naelor é um mundo, uma camada do Mar das Estrelas ou o interior de uma Fratura.', category: 'Outro mundo', status: 'Não cartografado', truthStatus: 'disputed', relations: [{ label: 'Mar das Estrelas', to: '/locais/mar-das-estrelas' }] }),
  record({ id: 'varakh', name: 'Varakh', subtitle: 'Mundo da Guerra Inacabada', summary: 'Campos e fortificações que repetem os preparativos de uma batalha cujo inimigo nunca chega.', description: 'Armas encontradas ali carregam marcas de povos desconhecidos, mas se desfazem ao cruzar o Véu. Alguns Juramentados afirmam ter servido décadas em Varakh durante uma única noite de Avernor.', category: 'Outro mundo', status: 'Temporalmente instável', truthStatus: 'witnessed', relations: [{ label: 'Juramentados', to: '/retornados/juramentados' }] }),
  record({ id: 'fenda-sem-nome', name: 'A Fenda sem Nome', subtitle: 'O espaço que recusa descrição', summary: 'Ausência entre mundos relacionada a Nar-Khalion e a registros que apagam o próprio título.', description: 'Toda descrição prolongada perde palavras diferentes a cada cópia. O Arquivo conserva apenas características negativas: não é escuridão, vazio ou morte. A relação com o Prisioneiro permanece fora do conteúdo público.', category: 'Anomalia cosmológica', status: 'Restrito', truthStatus: 'redacted', spoilerLevel: 'public' }),
]

export const worlds = applyArchiveDossiers(worldRecords, worldArchiveDossiers)

const returnedTypes = [
  ['vazios', 'Vazios', 'Corpos retornados com respostas automáticas e quase nenhuma memória pessoal.', 'Identidade residual'],
  ['lembrantes', 'Lembrantes', 'Retornados que preservam uma única memória e organizam toda ação ao redor dela.', 'Memória fixa'],
  ['juramentados', 'Juramentados', 'Mortos mantidos por promessa incompleta; podem cessar quando o juramento é cumprido.', 'Vínculo de juramento'],
  ['coroados-de-cinza', 'Coroados de Cinza', 'Retornados capazes de impor fragmentos de lembrança sobre grupos próximos.', 'Risco coletivo'],
  ['desvelados', 'Desvelados', 'Pessoas que retornaram por uma Fratura e percebem limites invisíveis do Véu.', 'Percepção limiar'],
  ['ecoantes', 'Ecoantes', 'Presenças sem corpo estável que repetem vozes, gestos e caminhos.', 'Eco memorial'],
  ['devorados', 'Devorados', 'Retornados cuja identidade foi substituída por algo atraído durante a ruptura.', 'Ameaça extrema'],
]

const returnedRelations = {
  vazios: [{ label: 'Pastores dos Mortos', to: '/faccoes/pastores-dos-mortos' }],
  lembrantes: [{ label: 'Coletores de Nomes', to: '/faccoes/coletores-de-nomes' }],
  juramentados: [{ label: 'Varakh', to: '/outros-mundos/varakh' }],
  'coroados-de-cinza': [{ label: 'Corte de Cinza', to: '/faccoes/corte-de-cinza' }],
  desvelados: [{ label: 'Fraturas do Véu', to: '/portais/fraturas-do-veu' }],
  ecoantes: [{ label: 'Escuta Ancestral', to: '/necromancia/escuta-ancestral' }],
  devorados: [{ label: 'O Prisioneiro sem Nome', to: '/nar-khalion/prisioneiro-sem-nome' }],
}

const returnedRecords = [
  ...returnedTypes.map(([id, name, summary, category]) => record({ id, name, subtitle: category, summary, description: `${summary} A maioria dos mortos não retorna. Destruir o corpo nem sempre liberta a presença, e cada caso exige investigação de nome, memória, motivo e juramento.`, category, status: 'Categoria documentada', truthStatus: 'witnessed', limitations: ['Memórias degradam', 'Identidade pode fragmentar', 'Libertação depende da causa do retorno'], relations: returnedRelations[id] })),
  record({ id: 'marcha-dos-sem-nome', name: 'A Marcha dos Sem-Nome', subtitle: 'Quando as famílias apagaram nomes para deter os mortos', summary: 'Evento em que centenas de Retornados caminharam para o oeste até ouvirem seus nomes verdadeiros.', description: 'Autoridades removeram nomes de lápides por medo, agravando a marcha. Pastores dos Mortos e parentes restauraram os registros em praça pública. O episódio criou o direito funerário segundo o qual apagar um nome é agressão à família e risco coletivo.', category: 'Evento histórico', status: 'Encerrado', period: 'Ano 742', truthStatus: 'documented', relations: [{ label: 'Pastores dos Mortos', to: '/faccoes/pastores-dos-mortos' }] }),
]

export const returned = applyArchiveDossiers(returnedRecords, returnedArchiveDossiers)

const necromancyRecords = [
  record({ id: 'necromancia', name: 'Necromancia', subtitle: 'Manipular não é restaurar', summary: 'Práticas que interferem em corpos, ecos, memória, juramentos, fragmentos de alma e energia do Véu.', description: 'Toda necromancia cobra perda de memória, vida, identidade ou estabilidade do Véu. Comunicação ancestral consentida não é automaticamente necromancia: a distinção está em convocar ou prender, ouvir ou forçar, recordar ou fabricar.', category: 'Prática proibida', status: 'Criminalizada na maioria dos reinos', truthStatus: 'documented', limitations: ['Perda de memória', 'Redução da vida', 'Contaminação', 'Atração de entidades', 'Fragmentação da identidade', 'Enfraquecimento do Véu'] }),
  record({ id: 'costura-de-eco', name: 'Costura de Eco', subtitle: 'Uma memória presa a um corpo', summary: 'Técnica que ancora uma lembrança alheia em matéria morta, confundindo testemunho com identidade.', description: 'Usada para interrogar restos, ela produz respostas contaminadas pelas expectativas do praticante. Tribunais rejeitam qualquer prova obtida por Costura de Eco.', category: 'Técnica necromântica', status: 'Proibida', truthStatus: 'documented', relations: [{ label: 'Necromancia', to: '/necromancia/necromancia' }] }),
  record({ id: 'escuta-ancestral', name: 'Escuta Ancestral', subtitle: 'Memória ritual sem coerção', summary: 'Práticas culturais de ouvir histórias preservadas por fogo, pedra, canto ou objetos sem aprisionar mortos.', description: 'A Escuta reconhece que uma comunidade interpreta memória; não afirma trazer uma pessoa integral de volta. Orcs, anões, elfos e gigantes mantêm protocolos distintos. Coerção, sacrifício e impedimento de partida transformam o rito em abuso.', category: 'Prática memorial', status: 'Permitida com limites', truthStatus: 'documented', relations: [{ label: 'Anões de Kar-Dûm', to: '/povos/anoes' }] }),
]

export const necromancy = applyArchiveDossiers(necromancyRecords, necromancyArchiveDossiers)

const endings = [
  ['segunda-ruptura', 'Segunda Ruptura', 'O Véu voltará a partir-se onde as cinco Relíquias se encontrarem.'],
  ['noite-sem-estrelas', 'Noite sem Estrelas', 'Os céus perderão orientação antes da abertura da Porta sem Fechadura.'],
  ['ultimo-inverno', 'Último Inverno', 'Winterfeld lê o fim como frio que nenhum abrigo consegue compartilhar.'],
  ['despertar-dos-pilares', 'Despertar dos Pilares', 'Gigantes esperam que montanhas cobrem todos os tratados esquecidos.'],
  ['grande-marcha', 'Grande Marcha', 'Pastores temem que todos os mortos privados de nome retornem juntos.'],
  ['queda-primeira-raiz', 'Queda da Primeira Raiz', 'Sylvaris debate se a queda é morte da floresta ou fim da memória comum.'],
  ['ultimo-golpe', 'Último Golpe', 'Anões preveem a obra final que selará ou romperá o mundo.'],
  ['sete-silencios', 'Sete Silêncios', 'Cada povo perderá uma linguagem essencial antes do silêncio completo.'],
  ['mundo-esquecera-nome', 'O Dia em que o Mundo Esquecerá seu Nome', 'A interpretação mais temida: realidade sem memória de si mesma.'],
]

const endTimeRecords = endings.map(([id, name, summary]) => record({ id, name, subtitle: 'Uma leitura do fim', summary, description: summary, category: 'Escatologia', status: 'Interpretação', truthStatus: 'prophetic', relations: [{ label: 'Profecias centrais', to: '/profecias' }] }))

export const endTimes = applyArchiveDossiers(endTimeRecords, endTimesArchiveDossiers)

const narKhalionRecords = [
  record({ id: 'nar-khalion', name: 'Nar-Khalion', subtitle: 'O Cárcere além do Sétimo Céu', summary: 'Prisão entre o mundo físico, o Véu, a Fenda sem Nome e um espaço fora do tempo; nenhuma fuga interna é conhecida.', description: 'Nenhuma porta abre por dentro. Teletransporte retorna à cela, morte não liberta, mapas falham, nomes perdem poder e cada tentativa fortalece os selos. Nem dragões ou Relíquias permitem fuga interna. O único risco aceito é uma abertura deliberada pelo lado de fora.', category: 'Prisão cosmológica', status: 'Localização inacessível', truthStatus: 'redacted', limitations: ['Morte não liberta', 'Memórias de fuga são apagadas', 'Mapas falham', 'Tentativas fortalecem os selos'], relations: [{ label: 'A Fenda sem Nome', to: '/outros-mundos/fenda-sem-nome' }, { label: 'Profecia das Cinco Relíquias', to: '/profecias/cinco-reliquias' }] }),
  record({ id: 'prisioneiro-sem-nome', name: 'O Prisioneiro sem Nome', subtitle: 'Registro público incompleto', summary: 'Uma presença imortal em Nar-Khalion, capaz de alcançar sonhos e conhecer futuros possíveis.', description: 'O Arquivo confirma apenas que a entidade deseja a reunião das Relíquias e pode contaminar interpretações proféticas. Motivo, origem e identidade foram suprimidos do registro público. Tratá-la como simples voz confiável ou vilão absoluto serve aos objetivos dela.', category: 'Entidade restrita', status: 'Contido', truthStatus: 'redacted', spoilerLevel: 'public', relations: [{ label: 'Nar-Khalion', to: '/nar-khalion/nar-khalion' }, { label: 'Profecias centrais', to: '/profecias' }] }),
]

export const narKhalion = applyArchiveDossiers(narKhalionRecords, narKhalionArchiveDossiers)
