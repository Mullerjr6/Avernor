import { record } from '../schema.js'
import { applyArchiveDossiers, celestialArchiveDossiers, lanceArchiveDossiers } from '../editorial/archiveDossiers.js'

const celestialData = [
  ['aureon', 'Aureon', 'Lei', 'solvaris', 'Solvaris', 'Lança do Julgamento', 'A lei sem misericórdia torna-se apenas uma máquina de culpa.'],
  ['myriel', 'Myriel', 'Memória', 'elythra', 'Elythra', 'Lança dos Nomes', 'O que deve ser lembrado quando toda memória também pode ferir?'],
  ['kaeloran', 'Kaeloran', 'Guerra', 'vharun', 'Vharun', 'Lança da Última Batalha', 'O fim de uma guerra pode exigir que alguém se recuse a vencê-la.'],
  ['selenya', 'Selenya', 'Misericórdia', 'ishmeriel', 'Ishmeriel', 'Lança da Misericórdia', 'Misericórdia imposta pode negar justiça às vítimas.'],
  ['tharos', 'Tharos', 'Tempestade', 'raekhar', 'Raekhar', 'Lança dos Sete Céus', 'A tempestade transforma e destrói sem reconhecer títulos.'],
  ['nerathiel', 'Nerathiel', 'Morte', 'mor-aeth', 'Mor-Aeth', 'Lança do Último Fôlego', 'A morte encerra posse, mas não apaga consequência.'],
  ['oryndar', 'Oryndar', 'Limiar', 'veyrion', 'Veyrion', 'Lança do Limiar', 'Toda fronteira protege algo e aprisiona outra coisa.'],
]

const celestialRecords = celestialData.map(([id, name, domain, lanceId, lance, lanceTitle, conflict]) => record({
  id, name, subtitle: `Celestial de ${domain}`, summary: `Figura associada a ${domain.toLowerCase()} em textos anteriores à Coroa Una; sua natureza — pessoa, povo, função ou metáfora — permanece incerta.`,
  description: `${conflict} Relatos não provam divindade nem presença física. Igrejas e facções usam o nome de ${name} para interpretações conflitantes.`,
  category: 'Celestial', status: 'Natureza incerta', truthStatus: 'legendary', relations: [{ label: `${lance} — ${lanceTitle}`, to: `/lancas/${lanceId}` }],
}))

export const celestials = applyArchiveDossiers(celestialRecords, celestialArchiveDossiers)

const lanceRecords = celestialData.map(([celestialId, celestial, domain, id, name, title]) => record({
  id, name, subtitle: title, summary: `Arma atribuída a ${celestial}, ligada ao domínio de ${domain.toLowerCase()}.`,
  description: `Nenhuma lança foi autenticada em sua forma completa. Fragmentos e cópias podem ser artefatos antigos, propaganda ou objetos tocados pelo Véu. O Arquivo separa a tradição da alegação material.`,
  category: 'Lança celestial', status: 'Não autenticada', truthStatus: 'legendary', relations: [{ label: celestial, to: `/celestiais/${celestialId}` }],
}))

export const lances = applyArchiveDossiers(lanceRecords, lanceArchiveDossiers)
