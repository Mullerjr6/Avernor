import { record } from '../schema.js'
import { mythologyDossiers } from '../beliefs/dossiers.js'

const mythologyRecords = [
  record({
    id: 'cancao-do-primeiro-ceu', name: 'A Canção do Primeiro Céu', subtitle: 'Sete nomes contra a Vastidão Silenciosa',
    summary: 'Mito compartilhado segundo o qual sete nomes romperam o Primeiro Céu e originaram pedra, mar, fogo, vento, vida, morte e memória.',
    description: 'Antes de terra, tempo, luz ou morte havia a Vastidão Silenciosa. Uma voz desconhecida pronunciou sete nomes; o sétimo fragmento permaneceu invisível no mundo como mana, o Eco do Primeiro Céu. A ruptura também criou o Véu. Povos discordam sobre a voz, sua intenção e a possibilidade de um oitavo fragmento; nenhuma versão é verdade absoluta.',
    category: 'Mito cosmogônico', status: 'Múltiplas versões', truthStatus: 'legendary',
    events: ['Ruptura do Primeiro Céu', 'Nascimento dos sete fragmentos', 'Formação do Véu'],
    disputedClaims: ['Criação voluntária, guerra ou sacrifício', 'Existência de um oitavo fragmento'],
    relations: [{ label: 'O Véu', to: '/cosmologia/o-veu' }, { label: 'A Primeira Tempestade', to: '/mitologia/primeira-tempestade' }],
  }),
  record({
    id: 'primeira-tempestade', name: 'A Primeira Tempestade', subtitle: 'Sete noites sob um céu violeta',
    summary: 'Todas as culturas preservam uma versão da tempestade em que raios não queimaram, águas brilharam e três mortais teriam sido marcados pela mana.',
    description: 'Durante sete noites o céu permaneceu violeta, ruínas surgiram e animais nasceram alterados. A tradição dos bruxos identifica três mortais marcados como ancestrais de Kayler, Nimbus e Rivs. Cronistas aceitam a convergência do fenômeno, mas não a genealogia literal nem uma explicação única.',
    category: 'Mito de origem', status: 'Núcleo convergente', truthStatus: 'disputed',
    events: ['Céu violeta', 'Raios sem fogo', 'Águas luminosas', 'Marca dos três mortais'],
    relations: [{ label: 'Casa Kayler', to: '/casas/kayler' }, { label: 'Doutrina das Três Correntes', to: '/mitologia/doutrina-tres-correntes' }],
  }),
  record({
    id: 'doutrina-tres-correntes', name: 'Doutrina das Três Correntes', subtitle: 'A responsabilidade dos sangues tocados',
    summary: 'Filosofia religiosa das três linhagens bruxas: Celeste para Kayler, Escarlate para Nimbus e Profunda para Rivs.',
    description: 'A Corrente Celeste reúne céu, liberdade, transformação e equilíbrio; a Escarlate, vontade, disciplina, proteção e domínio do medo; a Profunda, água, memória, cura e continuidade. Seu Juramento Arcano estabelece: “Nenhum sangue tocado pelo Primeiro Céu deverá sentar-se acima dos povos.” O juramento explica a recusa de Normus em aceitar uma coroa.',
    category: 'Filosofia dos bruxos', status: 'Fragmentada', truthStatus: 'documented',
    beliefs: ['Poder de sangue não concede direito de governo', 'Mana é herança e responsabilidade', 'Mortos retornam ao Eco, não à posse dos vivos'],
    events: ['Iniciação diante de três recipientes', 'Vigília funerária sem trono', 'Renovação pública do Juramento Arcano'],
    relations: [{ label: 'Normus Kayler', to: '/personagens/normus-kayler' }, { label: 'Era da Magia', to: '/historia/era-magia' }],
  }),
  record({
    id: 'metamorfose-do-eco', name: 'Metamorfose do Eco', subtitle: 'A forma animal que também transforma quem a assume',
    summary: 'Alegação contestada de que certos integrantes das três linhagens assumiriam uma ou duas formas animais ligadas à própria essência.',
    description: 'Cantos tardios descrevem transformação mediante treino e mana, com roupas e armas deixadas no ponto de partida, olhos violetas e marcas brancas. Nenhum protocolo verificável, corpo transformado ou testemunho contemporâneo autenticado sobreviveu. Permanência longa, instinto animal e dificuldade de retorno pertencem às versões folclóricas, não a uma capacidade confirmada. Relatos sobre uma forma de corvo de Sirius são classificados como rumor.',
    category: 'Tradição arcana contestada', status: 'Não confirmada', truthStatus: 'disputed', knowledgeStatus: 'rumor',
    limitations: ['No máximo uma ou duas formas', 'Consumo crescente de mana', 'Risco de absorção de instintos', 'Retorno difícil após uso excessivo'],
    relations: [{ label: 'As três Casas', to: '/casas' }, { label: 'Doutrina das Três Correntes', to: '/mitologia/doutrina-tres-correntes' }],
  }),
  record({
    id: 'credo-cicatriz-vermelha', name: 'Credo da Cicatriz Vermelha', subtitle: 'O céu ferido por Khar-Ul',
    summary: 'Mitologia orc sobre a ferida primordial da qual caíram sangue, dentes, lágrimas, cinzas e sopro.',
    description: 'Khar-Ul, o Primeiro Ferido, abre o céu. Maara-Ghesh guarda as brasas, Vokhar caça na fumaça e Zhur-Kaan testemunha juramentos. Nomes adultos são recebidos diante do fogo comunal; mortos são enviados ao Acampamento Além do Horizonte Vermelho. Regiões de poço valorizam Maara-Ghesh, enquanto guardiões de estrada invocam Zhur-Kaan.',
    category: 'Mitologia orc', status: 'Praticada', truthStatus: 'legendary',
    events: ['Cerimônia do Nome de Brasa', 'Funeral da Última Fumaça', 'Festival das Cicatrizes Contadas'],
    relations: [{ label: 'Orcs de Vul’Gar', to: '/povos/orcs' }],
  }),
  record({
    id: 'memoria-primeira-raiz', name: 'Memória da Primeira Raiz', subtitle: 'O sonho de Ilyndra',
    summary: 'Tradição élfica em que uma raiz atravessa terra, água, sonhos, tempo e memória, ligando os mortos à Copa Silenciosa.',
    description: 'Ilyndra não cria o mundo; desperta-o de um sonho sem estação. Mortos tornam-se Folhas de Memória lembradas em jardins vivos. Guardiões discutem se a proteção concedida a Normus foi reciprocidade legítima ou risco imposto à floresta. O medalhão do pacto é valioso como testemunho, não como fonte de poder.',
    category: 'Mitologia élfica', status: 'Praticada', truthStatus: 'legendary',
    events: ['Jardins memoriais', 'Casamento das Duas Sombras', 'Vigília da Copa Silenciosa'],
    relations: [{ label: 'Caminho das Raízes', to: '/religioes/caminho-das-raizes' }, { label: 'Rainha Aelwen', to: '/personagens/rainha-aelwen' }],
  }),
  record({
    id: 'sete-golpes-primeira-forja', name: 'Os Sete Golpes da Primeira Forja', subtitle: 'A obra de Dorh-Mael',
    summary: 'Mito anão em que sete golpes originam montanhas, metais, fogo, águas subterrâneas, vida, memória e destino.',
    description: 'Para os anões, trabalho é oração, qualidade é honra e obras preservam parte de quem as fez. Sacerdotes-ferreiros não concedem magia: verificam medidas, nomes e responsabilidade. Reformistas defendem que o oitavo golpe é cada inovação; tradicionalistas temem que essa leitura banalize a origem.',
    category: 'Mitologia anã', status: 'Praticada', truthStatus: 'legendary',
    events: ['Batida dos Sete Metais', 'Funeral da Ferramenta Nomeada', 'Festival do Oitavo Golpe'],
    relations: [{ label: 'Kar-Dûm', to: '/reinos/kar-dum' }, { label: 'Os Nove Ecos', to: '/religioes/nove-ecos' }],
  }),
  record({
    id: 'pilares-adormecidos', name: 'Os Pilares Adormecidos', subtitle: 'As montanhas como ancestrais',
    summary: 'Crença dos gigantes de que montanhas são ancestrais adormecidos e avalanches podem ser movimentos de memória.',
    description: 'Círculos de pedra marcam locais onde cantos devem ser retomados por cada geração. A profecia do Grande Despertar possui duas leituras: destruição física das montanhas ou momento em que todos os tratados esquecidos cobrarão cumprimento. A segunda leitura orienta a diplomacia com Winterfeld.',
    category: 'Crença dos gigantes', status: 'Tradição oral', truthStatus: 'legendary',
    events: ['Canto dos Passos Antigos', 'Círculo do Degelo', 'Vigília do Grande Despertar'],
    relations: [{ label: 'Gigantes das Montanhas', to: '/povos/gigantes' }, { label: 'Fim dos Tempos', to: '/fim-dos-tempos' }],
  }),
]

export const mythologies = mythologyRecords.map((mythology) => ({ ...mythology, ...mythologyDossiers[mythology.id] }))
