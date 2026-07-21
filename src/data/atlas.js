// Coordinates were visually checked against avernor-map-atlas.png (1536×1024).
// They are percentages so markers remain aligned at every responsive size.
export const atlasPoints = [
  { id: 'winterfeld', label: 'Winterfeld', type: 'Reino', x: 34, y: 15, href: '/reinos/winterfeld', region: 'Norte', note: 'Reino das neves e passagem para o Mar Glacial.' },
  { id: 'montanhas-cinzentas', label: 'Montanhas Cinzentas', type: 'Território', x: 66, y: 14, href: '/reinos/montanhas-cinzentas', region: 'Nordeste', note: 'Confederação rebelde e lar da Fortaleza do Véu.' },
  { id: 'lethariel', label: 'Lethariel', type: 'Capital', x: 26, y: 50, href: '/cidades/lethariel', region: 'Sylvaris', note: 'Capital élfica entre raízes e plataformas vivas.' },
  { id: 'valoris', label: 'Valóris', type: 'Capital', x: 52, y: 38, href: '/cidades/valoris', region: 'Valoria', note: 'Mercado central dos campos dourados.' },
  { id: 'ravencastle', label: 'Ravencastle', type: 'Capital', x: 70, y: 45, href: '/cidades/ravencastle', region: 'Ravenhold', note: 'Capital militar formada por anéis defensivos.' },
  { id: 'thur-kar', label: 'Thur-Kar', type: 'Capital', x: 52, y: 63, href: '/cidades/thur-kar', region: 'Kar-Dûm', note: 'Encontro subterrâneo dos Nove Salões.' },
  { id: 'porto-de-eldemar', label: 'Porto de Eldemar', type: 'Porto', x: 39, y: 82, href: '/cidades/porto-de-eldemar', region: 'Eldemar', note: 'Docas profundas e pontes móveis.' },
  { id: 'porto-verde', label: 'Porto Verde', type: 'Porto', x: 17, y: 62, href: '/cidades/porto-verde', region: 'Sylvaris', note: 'Entreposto controlado na costa ocidental.' },
  { id: 'vyrasul', label: 'Último avistamento de Vyrasul', type: 'Criatura', x: 25, y: 8, href: '/criaturas/vyrasul', region: 'Winterfeld', note: 'Rota de voo registrada nas geleiras.' },
]

export const atlasRelations = [
  { from: 'Winterfeld', to: 'Valoria', status: 'Comércio necessário', detail: 'Ferro e peles por grãos.' },
  { from: 'Sylvaris', to: 'Eldemar', status: 'Tratado cauteloso', detail: 'Madeira caída para estaleiros.' },
  { from: 'Valoria', to: 'Kar-Dûm', status: 'Interdependência', detail: 'Alimentos por ferramentas e engenharia.' },
  { from: 'Ravenhold', to: 'Montanhas Cinzentas', status: 'Fronteira tensa', detail: 'Disputa sobre refugiados e passagens.' },
]

