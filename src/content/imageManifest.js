const imageGroups = {
  backgrounds: ['caca-bruxas', 'era-coroas', 'era-magia', 'grande-guerra', 'queda-coroa'],
  cities: ['fortaleza-do-veu', 'porto-de-eldemar', 'porto-verde', 'ravencastle', 'thur-kar', 'valoris', 'winterheim'],
  bestiary: ['alcarion', 'cervo-do-nevoeiro', 'grifo-das-alturas', 'hidra-dos-pantanos', 'kraken-de-eldemar', 'lobo-de-vidro', 'mhazir', 'vigia-de-pedra', 'vyrasul'],
  gallery: ['arquivo-submerso', 'batalha-das-aguas-negras', 'guerra-da-cinza-branca', 'guerra-dos-tres-herdeiros', 'guerra-dos-tronos', 'guerra-dos-tuneis-vazios', 'noite-das-doze-adagas', 'pacto-dos-descendentes', 'sinos-do-mar-de-cinzas'],
  locations: ['arquipelago-das-brumas', 'deserto-de-zharak', 'mar-das-estrelas', 'mar-interior', 'terras-sombrias'],
  artifacts: ['adaga-do-passo-velado', 'carta-de-normus', 'espada-da-trovoada', 'martelo-de-orun', 'medalhao-da-folha-partida'],
  houses: ['arden', 'bellatrix', 'kayler', 'nimbus', 'rivs'],
  religions: ['caminho-das-raizes', 'culto-da-brasa-comum', 'juramento-do-horizonte', 'nove-ecos'],
  books: ['a-carta-e-a-tempestade', 'atlas-das-sete-rotas', 'caderno-de-namidia', 'cronicas-perdidas-de-sylvaris', 'o-ultimo-bruxo', 'tratado-das-linhagens'],
}

export const imageManifest = Object.fromEntries(
  Object.entries(imageGroups).flatMap(([directory, ids]) => ids.map((id) => [
    id,
    {
      image: `/assets/images/${directory}/${id}-page.webp`,
      thumbnail: `/assets/images/${directory}/${id}-card.webp`,
    },
  ])),
)

export function imagesFor(id) {
  return imageManifest[id] ?? {}
}
