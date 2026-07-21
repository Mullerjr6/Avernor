import { record } from '../schema.js'
import { peopleDossiers } from './dossiers.js'

const peopleRecords = [
  record({
    id: 'humanos', name: 'Humanos de Avernor', subtitle: 'Muitos reinos, nenhuma essência única',
    summary: 'Povo majoritário e politicamente fragmentado, capaz de construir instrumentos arcanos, mas incapaz de produzir magia verdadeira sem sangue das três linhagens.',
    description: 'Os humanos descendem das populações reunidas pela antiga Coroa Una. A fragmentação criou calendários locais, sotaques, leis e interesses incompatíveis. Ferramentas rúnicas, engenharia e religião ampliam suas capacidades, mas não concedem magia: apenas descendentes Kayler, Nimbus ou Rivs nascem bruxos.',
    category: 'Povo mortal', status: 'Numeroso', location: 'Todo o continente', truthStatus: 'documented',
    beliefs: ['Brasa Comum nos reinos centrais', 'Chama sem Coroa nas fortalezas rebeldes', 'Juramento do Horizonte nos portos'],
    abilities: ['Adaptação institucional', 'Engenharia e escrita disseminadas', 'Grandes redes agrícolas e comerciais'],
    limitations: ['Não possuem dom racial mágico', 'Divisões políticas recorrentes', 'Memória histórica vulnerável à propaganda'],
    curiosities: ['“Humano” descreve um povo, não uma cultura única.'],
    relations: [{ label: 'Culto da Brasa Comum', to: '/religioes/culto-da-brasa-comum' }, { label: 'As Cinco Eras', to: '/historia' }],
  }),
  record({
    id: 'elfos', name: 'Elfos de Sylvaris', subtitle: 'A floresta também participa',
    summary: 'Povo longevo cuja memória coletiva, política e religião reconhecem a Floresta Antiga como agente vivo, nunca como propriedade.',
    description: 'Elfos percebem padrões de crescimento, água e comportamento animal com precisão cultivada por gerações. A Vontade da Floresta não é feitiço individual: é a soma de relações ecológicas, memórias rituais e respostas do território. A coroa depende dos Círculos da Memória e não pode ordenar exploração irrestrita.',
    category: 'Povo antigo', status: 'Protegido por Sylvaris', location: 'Floresta Antiga', truthStatus: 'documented',
    beliefs: ['Caminho das Raízes', 'A memória exige reciprocidade', 'Nomes de mortos permanecem ligados a lugares cuidados'],
    abilities: ['Longevidade', 'Leitura ecológica refinada', 'Arco, manejo e memória ritual'],
    limitations: ['Não possuem magia verdadeira por natureza', 'Decisões coletivas podem ser lentas', 'Distância da floresta reduz referências sensoriais'],
    relations: [{ label: 'Sylvaris', to: '/reinos/sylvaris' }, { label: 'Elara', to: '/personagens/elara' }],
  }),
  record({
    id: 'orcs', name: 'Orcs de Vul’Gar', subtitle: 'Clãs unidos pela Brasa',
    summary: 'Povo de cidades, clãs e rotas orientais que entende identidade como fogo compartilhado e responsabilidade recíproca.',
    description: 'A Brasa do Clã é um vínculo social mantido por lareiras comunais, testemunhos e obrigações. Não controla mentes nem produz magia. Clãs podem divergir, misturar-se ou expulsar chefes que quebram o abrigo comum. Vul’Gar designa uma região cultural; não uma horda ou vontade única.',
    category: 'Povo mortal', status: 'Confederações autônomas', location: 'Vul’Gar e fronteira oriental', truthStatus: 'documented',
    beliefs: ['Brasa do Clã', 'O nome adulto deve ser confirmado por serviço', 'Água compartilhada suspende vinganças'],
    abilities: ['Resistência física', 'Logística em terras áridas', 'Diplomacia interclânica'],
    limitations: ['Não possuem magia verdadeira', 'Acordos dependem dos clãs signatários', 'Estereótipos humanos sabotam tratados'],
    relations: [{ label: 'Kharza Gron', to: '/personagens/kharza-gron' }, { label: 'Facções de Avernor', to: '/faccoes' }],
  }),
  record({
    id: 'anoes', name: 'Anões de Kar-Dûm', subtitle: 'Escutar antes de romper a pedra',
    summary: 'Povo subterrâneo organizado por salões de sangue, ofício e responsabilidade material.',
    description: 'A Escuta da Pedra combina acústica, observação de fraturas e memória profissional. Estrangeiros a confundem com magia, mas nenhum anão conjura por herança racial. Parentesco de ofício pode ser tão vinculante quanto sangue, embora apenas o sangue determine algumas sucessões domésticas.',
    category: 'Povo antigo', status: 'Confederação soberana', location: 'Kar-Dûm', truthStatus: 'documented',
    beliefs: ['Os Nove Ecos', 'Toda abertura cria uma dívida', 'Uma obra sem registro é uma obra sem responsável'],
    abilities: ['Engenharia subterrânea', 'Audição treinada para estruturas', 'Metalurgia e hidráulica'],
    limitations: ['Não possuem magia verdadeira', 'Superfície aberta desorienta alguns habitantes', 'Disputas entre sangue e ofício atrasam decisões'],
    relations: [{ label: 'Kar-Dûm', to: '/reinos/kar-dum' }, { label: 'Os Nove Ecos', to: '/religioes/nove-ecos' }],
  }),
  record({
    id: 'gigantes', name: 'Gigantes das Montanhas', subtitle: 'A memória carregada pelo relevo',
    summary: 'Comunidades raras do norte que preservam tratados por cantos associados a vales, geleiras e passos.',
    description: 'A chamada Memória da Montanha é um sistema oral e espacial: cada trecho de um pacto é cantado no lugar que o testemunhou. Gigantes percebem vibrações de avalanche e mudança de gelo antes da maioria dos povos, uma adaptação natural transformada em tradição sagrada.',
    category: 'Povo antigo', status: 'Comunidades dispersas', location: 'Extremo norte', truthStatus: 'witnessed',
    beliefs: ['Montanhas lembram consequências', 'Mover um marco sem testemunhas é roubar memória', 'Abrigo cria parentesco temporário'],
    abilities: ['Força e longevidade', 'Leitura de gelo e avalanche', 'Memória oral territorial'],
    limitations: ['Não possuem magia verdadeira', 'Baixa natalidade', 'Calor prolongado causa exaustão rápida'],
    relations: [{ label: 'Winterfeld', to: '/reinos/winterfeld' }, { label: 'Vyrasul', to: '/criaturas/vyrasul' }],
  }),
  record({
    id: 'dragoes', name: 'Dragões conhecidos', subtitle: 'Instinto, território e memória',
    summary: 'Exatamente três criaturas naturais conhecidas: Vyrasul, Alcarion e Mhazir; não formam povo político, reino ou civilização.',
    description: 'Dragões acumulam memória instintiva de rotas, presas e ameaças. Sua inteligência permite escolha e reconhecimento, mas não linguagem estatal, culto organizado ou governo. Não há ovos autenticados nem evidência de outros indivíduos; ausência de prova não autoriza ampliar o número canônico.',
    category: 'Fauna lendária', status: 'Três indivíduos conhecidos', location: 'Habitats separados', truthStatus: 'documented',
    abilities: ['Voo', 'Memória territorial longa', 'Adaptações naturais individuais'],
    limitations: ['Não produzem sociedade política', 'São vulneráveis durante recuperação de grandes esforços', 'Reprodução desconhecida'],
    relations: [{ label: 'Vyrasul', to: '/criaturas/vyrasul' }, { label: 'Alcarion', to: '/criaturas/alcarion' }, { label: 'Mhazir', to: '/criaturas/mhazir' }],
  }),
]

export const peoples = peopleRecords.map((people) => ({ ...people, ...peopleDossiers[people.id] }))
