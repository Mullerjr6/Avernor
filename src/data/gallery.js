import { artifacts, books, cities, creatures, eras, houses, legends, locations, religions, wars } from '../content'

const curatedItems = [
  { src: '/assets/images/characters/sirius-kayler-page.webp', thumb: '/assets/images/characters/sirius-kayler-card.webp', title: 'Sirius Kayler', kind: 'Retrato oficial', alt: 'Sirius Kayler, homem de pele morena, cabelos brancos trançados e olhos violetas, em armadura escura' },
  { src: '/assets/images/characters/normus-kayler-v2-page.webp', thumb: '/assets/images/characters/normus-kayler-v2-card.webp', title: 'Normus Kayler', kind: 'Retrato histórico', alt: 'Normus Kayler, bruxo maduro de cabelos brancos, conjurando raios diante de uma tempestade' },
  { src: '/assets/images/characters/namidia-bellatrix-v2-page.webp', thumb: '/assets/images/characters/namidia-bellatrix-v2-card.webp', title: 'Namídia Bellatrix', kind: 'Retrato histórico', alt: 'Namídia Bellatrix em armadura prática e manto vermelho nas Montanhas Cinzentas' },
  { src: '/assets/images/characters/elara-page.webp', thumb: '/assets/images/characters/elara-card.webp', title: 'Elara', kind: 'Retrato oficial', alt: 'Elara, jovem elfa loira de olhos dourados, agachada na floresta com uma adaga rúnica' },
  { src: '/assets/images/characters/rainha-sylvaris-page.webp', thumb: '/assets/images/characters/rainha-sylvaris-card.webp', title: 'Rainha Aelwen', kind: 'Retrato régio', alt: 'Rainha élfica Aelwen em trajes verdes e dourados no salão de Sylvaris' },
  { src: '/assets/images/characters/guerreira-ruiva-page.webp', thumb: '/assets/images/characters/guerreira-ruiva-card.webp', title: 'Ilyra Arden', kind: 'Retrato oficial', alt: 'Ilyra Arden, guerreira ruiva com espada em uma floresta' },
  { src: '/assets/images/characters/guerreira-orc-page.webp', thumb: '/assets/images/characters/guerreira-orc-card.webp', title: 'Kharza Gron', kind: 'Retrato oficial', alt: 'Kharza Gron, guerreira orc em armadura de campanha' },
  { src: '/assets/images/characters/guerreiro-orc-page.webp', thumb: '/assets/images/characters/guerreiro-orc-card.webp', title: 'Gorvak Tor', kind: 'Retrato oficial', alt: 'Gorvak Tor, guerreiro orc em armadura de campanha' },
  { src: '/assets/images/locations/jornada-floresta-antiga-banner.webp', thumb: '/assets/images/locations/jornada-floresta-antiga-card.webp', title: 'Jornada pela Floresta Antiga', kind: 'Cena de jornada', alt: 'Sirius, Elara e Ilyra atravessam a Floresta Antiga a cavalo' },
  { src: '/assets/images/maps/avernor-map-atlas-large.webp', thumb: '/assets/images/maps/avernor-map-atlas-preview.webp', title: 'Mapa Oficial Canônico de Avernor', kind: 'Carta normativa · edição 1204 d.C.', authority: 'oficial', note: 'Única base geográfica normativa do Atlas. Marcadores digitais corrigem topônimos divergentes gravados na ilustração.', alt: 'Mapa oficial ilustrado do continente de Avernor na edição de 1204 d.C.' },
  { src: '/assets/images/maps/avernor-map-historical-large.webp', thumb: '/assets/images/maps/avernor-map-historical-preview.webp', title: 'Carta histórica atribuída a 1024 d.C.', kind: 'Documento histórico · não normativo', authority: 'histórica', note: 'Preservada como testemunho cartográfico de sua época; fronteiras e nomes não controlam o cânone atual.', alt: 'Carta histórica ilustrada de Avernor com reinos e rotas antigas' },
  { src: '/assets/images/maps/avernor-map-parchment-large.webp', thumb: '/assets/images/maps/avernor-map-parchment-preview.webp', title: 'Estudo das coroas em pergaminho', kind: 'Carta contestada', authority: 'contestada', note: 'Atribuição e precisão territorial contestadas pelo Arquivo Real.', alt: 'Mapa alternativo de Avernor em pergaminho escuro' },
  { src: '/assets/images/maps/avernor-map-main-large.webp', thumb: '/assets/images/maps/avernor-map-main-preview.webp', title: 'Carta apócrifa de Aeldria', kind: 'Documento divergente', authority: 'apócrifa', note: 'Mantida para comparação historiográfica. Seus topônimos e sua geografia não descrevem o Avernor canônico.', alt: 'Carta apócrifa com geografia divergente da cartografia oficial de Avernor' },
  { src: '/assets/images/maps/avernor-map-regions-large.webp', thumb: '/assets/images/maps/avernor-map-regions-preview.webp', title: 'Carta regional de proveniência incerta', kind: 'Documento contestado', authority: 'contestada', note: 'Inclui entidades políticas incompatíveis com os registros consolidados e não deve ser lida como fonte normativa.', alt: 'Mapa regional contestado do continente de Avernor' },
  { src: '/assets/images/maps/avernor-map-alt-01-large.webp', thumb: '/assets/images/maps/avernor-map-alt-01-preview.webp', title: 'Esboço cartográfico alternativo', kind: 'Estudo não normativo', authority: 'alternativa', note: 'Exercício visual preservado no acervo, sem autoridade sobre fronteiras, distâncias ou topônimos.', alt: 'Mapa alternativo ilustrado do continente de Avernor' },
]

const collections = [
  ['Crônica histórica', eras],
  ['Cidade e fortaleza', cities],
  ['Brasão de casa', houses],
  ['Prancha do bestiário', creatures],
  ['Memória de guerra', wars],
  ['Artefato preservado', artifacts],
  ['Lenda documentada', legends],
  ['Paisagem geográfica', locations],
  ['Tradição cultural', religions],
  ['Capa da biblioteca', books],
]

const archiveItems = collections.flatMap(([kind, items]) => items
  .filter((item) => item.image || item.thumbnail)
  .map((item) => ({
    src: item.image || item.thumbnail,
    thumb: item.thumbnail || item.image,
    title: item.name,
    kind,
    alt: `Ilustração de ${item.name}`,
  })))

export const galleryItems = [...curatedItems, ...archiveItems]
  .filter((item, index, items) => items.findIndex((candidate) => candidate.src === item.src) === index)
