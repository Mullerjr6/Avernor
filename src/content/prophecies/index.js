import { record } from '../schema.js'
import { applyArchiveDossiers, prophecyArchiveDossiers } from '../editorial/archiveDossiers.js'

const propheciesData = [
  ['ultimo-violeta', 'Último Violeta', '“Quando o último violeta fechar os olhos, a tempestade escolherá entre nome e céu.”', 'Pode indicar Sirius, o fim das linhagens ou apenas um crepúsculo raro.'],
  ['coroa-vazia', 'Coroa Vazia', '“Uma coroa sem cabeça reunirá reis que não sabem ajoelhar.”', 'Usada tanto por monarquistas da Coroa Una quanto por republicanos.'],
  ['arvore-sem-sombra', 'Árvore sem Sombra', '“A raiz esquecerá o chão quando nenhuma folha produzir sombra.”', 'Sylvaris lê como crise de memória; madeireiros, como autorização de expansão.'],
  ['tres-feras-aladas', 'Três Feras Aladas', '“Três asas contarão uma ausência; só uma pousará diante do gelo.”', 'Frequentemente associada aos três dragões, embora o texto não os nomeie.'],
  ['ultima-forja', 'Última Forja', '“O martelo derradeiro não fará arma, mas decidirá o que pode permanecer inteiro.”', 'Kar-Dûm disputa se a profecia exige selar ou abrir as profundezas.'],
  ['cicatriz-aberta', 'Cicatriz Aberta', '“A ferida do céu voltará a sangrar por mãos que chamam medo de prudência.”', 'Clãs orcs a relacionam a juramentos quebrados e à perseguição.'],
  ['mar-acima', 'Mar Acima', '“Quando o mar navegar sobre as estrelas, a margem pedirá um nome.”', 'Eldemar teme inundação; os Cartógrafos veem uma passagem para Naelor.'],
  ['chama-sem-coroa', 'Chama sem Coroa', '“A chama sem coroa guardará a criança que reis decidiram esquecer.”', 'A tradição Bellatrix aplica o verso a Sirius, mas cópias anteriores falam em crianças no plural.'],
  ['sete-silencios-profecia', 'Sete Silêncios', '“Sete nomes foram ditos; sete silêncios podem desfazê-los.”', 'Não se sabe se são mortes, línguas perdidas, votos ou Celestiais.'],
  ['cinco-reliquias', 'Profecia das Cinco Relíquias', '“Cinco testemunhos buscarão uma porta que nenhum escriba consegue nomear.”', 'O verso sobrevive em cópias incompletas. Não se sabe se “testemunhos” significa pessoas, objetos, povos ou decisões, nem qual porta é mencionada.'],
  ['porta-sem-fechadura', 'Porta sem Fechadura', '“A porta que não se fecha só abre para quem deixou o próprio nome do outro lado.”', 'Pode ser uma Fratura, Nar-Khalion ou metáfora para o retorno dos mortos.'],
]

const prophecyRecords = propheciesData.map(([id, name, quote, interpretation]) => record({
  id, name, subtitle: 'Texto de interpretação disputada', summary: quote, description: `${interpretation} Existem traduções adulteradas e versões promovidas por facções; nenhuma leitura é confirmada pelo Arquivo.`,
  category: 'Profecia central', status: 'Em circulação', truthStatus: 'prophetic', quotes: [quote.replace(/[“”]/g, '')],
  disputedClaims: [interpretation], relations: [{ label: 'Fim dos Tempos', to: '/fim-dos-tempos' }],
}))

export const prophecies = applyArchiveDossiers(prophecyRecords, prophecyArchiveDossiers)
