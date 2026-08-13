import forest from '../../../public/assets/images/locations/jornada-floresta-antiga-banner.webp'
import hiddenPath from '../../../public/assets/images/atlas-plates/caminho-das-arvores-ausentes-page.webp'
import lethariel from '../../../public/assets/images/atlas-plates/lethariel-page.webp'
import palace from '../../../public/assets/images/atlas-plates/palacio-da-seiva-clara-page.webp'
import sirius from '../../../public/assets/images/characters/sirius-kayler-page.webp'
import elara from '../../../public/assets/images/characters/elara-page.webp'
import aelwen from '../../../public/assets/images/characters/rainha-sylvaris-page.webp'
import orc from '../../../public/assets/images/characters/guerreiro-orc-page.webp'

export const backgrounds = {
  forestRide: { src: forest, alt: 'Sirius atravessa a cavalo a estrada úmida da Floresta Antiga' },
  orcClearing: { src: forest, alt: 'Clareira cercada por árvores antigas onde Elara foi capturada' },
  clearing: { src: forest, alt: 'Clareira úmida na Floresta Antiga durante uma manhã nublada' },
  hiddenPath: { src: hiddenPath, alt: 'Caminho impossível entre árvores ausentes na Floresta Antiga' },
  camp: { src: hiddenPath, alt: 'Abrigo discreto sob raízes e pedra na Floresta Antiga durante a noite' },
  orcTrail: { src: forest, alt: 'Trilha oriental usada por mercenários dentro da Floresta Antiga' },
  ridge: { src: hiddenPath, alt: 'Crista de folhas pálidas diante da fronteira viva de Sylvaris' },
  lethariel: { src: lethariel, alt: 'Lethariel erguida entre raízes, plataformas vivas e luz filtrada' },
  palace: { src: palace, alt: 'Palácio da Seiva Clara entre árvores antigas de Sylvaris' },
}

export const portraits = {
  sirius: { src: sirius, alt: 'Sirius Kayler', focus: '50% 18%' },
  elara: { src: elara, alt: 'Elara', focus: '50% 18%' },
  aelwen: { src: aelwen, alt: 'Rainha Aelwen', focus: '50% 16%' },
  orc: { src: orc, alt: 'Guerreiro orc mercenário na clareira', focus: '50% 17%' },
}
