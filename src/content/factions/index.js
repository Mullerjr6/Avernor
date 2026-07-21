import { record } from '../schema.js'
import { factionDossiers } from './dossiers.js'

const factionData = [
  ['vigias-do-limiar', 'Vigias do Limiar', 'Uma chave diante de uma linha partida', 'Lys Arven', 'Observar, isolar e registrar Fraturas antes que coroas as convertam em armas.', 'postos móveis junto a anomalias', 'Consideram Sirius um risco que merece escolha e vigilância, não prisão.'],
  ['cartografos-do-impossivel', 'Cartógrafos do Impossível', 'Compasso com agulha quebrada', 'Mestre Orel Daan', 'Mapear lugares que alteram distância, tempo ou memória sem fingir precisão inexistente.', 'Arquivo das Margens, Eldemar', 'Querem que Sirius descreva a Porta da Tempestade de Fulgarion.'],
  ['peregrinos-sem-sombra', 'Peregrinos sem Sombra', 'Sandálias sob um sol vazio', 'A Voz de Elyra', 'Retornar a Elyra e abandonar identidades consideradas sombras impostas.', 'acampamentos itinerantes', 'Veem os olhos violetas de Sirius como sinal de uma luz aprisionada.'],
  ['seladores', 'Seladores', 'Sete pontos costurados em círculo', 'Conselho sem rosto', 'Fechar toda Fratura, mesmo que pessoas ou memórias permaneçam do outro lado.', 'criptas técnicas de Kar-Dûm', 'Pretendem usar Fulgarion como selo, com ou sem consentimento.'],
  ['abertos', 'Abertos', 'Porta sem parede', 'Sereth Vaul', 'Abrir passagens controladas e distribuir o conhecimento além das coroas.', 'células urbanas', 'Desejam convencer Sirius de que isolamento apenas preserva privilégios.'],
  ['filhos-setimo-silencio', 'Filhos do Sétimo Silêncio', 'Boca coberta por sete linhas', 'Nenhum líder público', 'Impedir que o sétimo nome seja novamente pronunciado, apagando textos e testemunhas.', 'desconhecida', 'Acreditam que o sangue Kayler é uma palavra viva que precisa calar.'],
  ['coletores-de-nomes', 'Coletores de Nomes', 'Livro preso por corrente', 'Curadora Maev Or', 'Preservar nomes verdadeiros para libertar Retornados, embora parte da ordem os negocie.', 'Casa dos Registros, Valória', 'Oferecem informações sobre Namídia em troca do nome ritual de Sirius.'],
  ['ordem-ultima-brasa', 'Ordem da Última Brasa', 'Brasa em duas mãos', 'Irmã Hilda Venn', 'Manter abrigo, comida e rotas civis durante eventos do Véu.', 'templos-cozinha de Winterfeld e Valoria', 'Protegem Sirius como pessoa perseguida, mas recusam culto ao seu poder.'],
  ['pastores-dos-mortos', 'Pastores dos Mortos', 'Cajado diante de lápide nomeada', 'Tovan Mirel', 'Identificar Retornados, restaurar nomes e resolver juramentos antes de usar força.', 'necrópoles e estradas antigas', 'Pedem a Sirius proteção em travessias, sem exigir que pratique necromancia.'],
  ['corte-de-cinza', 'Corte de Cinza', 'Coroa dissolvida em fuligem', 'A Regente Velada', 'Abrir Morvath e governar pela posse de memórias queimadas.', 'salões ocultos de Ravenhold', 'Deseja transformar Sirius na chave pública de um plano que não controla.'],
]

export const factions = factionData.map(([id, name, symbol, leader, objective, base, sirius]) => record({
  id, name, subtitle: symbol, summary: objective, description: `${objective} A liderança registrada é ${leader}; a estrutura combina um núcleo dirigente e agentes locais, mas disputas sobre meios e autoridade atravessam cada grupo.`,
  category: 'Facção transregional', status: 'Ativa', symbol, leadership: leader, location: base, truthStatus: 'documented',
  objectives: [objective], methods: ['Informação e recrutamento', 'Alianças circunstanciais', 'Operações coerentes com a própria ideologia'],
  disputedClaims: [`Relação com Sirius: ${sirius}`], relations: [{ label: 'Sirius Kayler', to: '/personagens/sirius-kayler' }],
  ...factionDossiers[id],
}))
