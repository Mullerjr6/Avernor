const entityVisuals = {
  winterfeld: { accent: '#91b8c8', thumbnailPosition: '34% 15%', heroPosition: '34% 15%' },
  sylvaris: { accent: '#89a66a', thumbnailPosition: '54% center', heroPosition: '58% center' },
  'kar-dum': { accent: '#a87a50', thumbnailPosition: '52% 46%', heroPosition: '52% 46%' },
  valoria: { accent: '#c39d4f', thumbnailPosition: '52% 63%', heroPosition: '52% 63%' },
  ravenhold: { accent: '#9a6e70', thumbnailPosition: '70% 48%', heroPosition: '70% 48%' },
  eldemar: { accent: '#5f91a6', thumbnailPosition: '40% 82%', heroPosition: '40% 82%' },
  'montanhas-cinzentas': { accent: '#8e7772', thumbnailPosition: '66% 20%', heroPosition: '66% 20%' },
  kayler: { accent: '#9d7ad1' },
  nimbus: { accent: '#a86169' },
  rivs: { accent: '#6f9eb5' },
  bellatrix: { accent: '#a65650' },
  arden: { accent: '#c39d4f' },
  vyrasul: { accent: '#a6cfdf' },
  alcarion: { accent: '#5d9b8f' },
  mhazir: { accent: '#b5784e' },
}

export function visualFor(item) {
  return {
    ...entityVisuals[item.id],
    accent: item.accent || entityVisuals[item.id]?.accent,
    thumbnailPosition: item.thumbnailPosition || entityVisuals[item.id]?.thumbnailPosition,
    heroPosition: item.heroPosition || entityVisuals[item.id]?.heroPosition,
  }
}

