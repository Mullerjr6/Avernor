const person = (id, name, born, died, status, people, extra = {}) => ({ id, name, born, died, status, people, ...extra })
const relation = (from, to, type = 'parent', status = 'documented', note = '') => ({ from, to, type, status, note })

export const genealogyPeople = [
  person('tarian-kayler', 'Tarian Kayler', 472, 581, 'morto', 'Humano — bruxo', { house: 'Kayler' }),
  person('selene-kayler', 'Selene Kayler', 501, 620, 'morta', 'Humana — bruxa', { house: 'Kayler' }),
  person('normus-kayler', 'Normus Kayler', 552, 704, 'morto', 'Humano — bruxo', { house: 'Kayler', profile: '/personagens/normus-kayler' }),
  person('namidia-bellatrix', 'Namídia Bellatrix', 668, 704, 'morta', 'Humana', { house: 'Bellatrix', profile: '/personagens/namidia-bellatrix' }),
  person('sirius-kayler', 'Sirius Kayler', 704, null, 'vivo', 'Humano — bruxo', { house: 'Kayler', profile: '/personagens/sirius-kayler' }),

  person('orena-bellatrix', 'Orena Bellatrix', 604, 681, 'morta', 'Humana', { house: 'Bellatrix' }),
  person('marek-bellatrix', 'Marek Bellatrix', 636, 716, 'morto', 'Humano', { house: 'Bellatrix' }),
  person('daria-ven', 'Daria Ven', 641, 719, 'morta', 'Humana'),
  person('tomas-bellatrix', 'Tomás Bellatrix', 674, 735, 'morto', 'Humano', { house: 'Bellatrix' }),
  person('lena-bellatrix', 'Lena Bellatrix', 701, 775, 'morta', 'Humana', { house: 'Bellatrix' }),

  person('saelwen', 'Saelwen da Primeira Copa', 188, 804, 'morta', 'Elfa', { house: 'Casa Real de Sylvaris' }),
  person('aelwen', 'Aelwen de Sylvaris', 468, null, 'viva', 'Elfa', { house: 'Casa Real de Sylvaris', profile: '/personagens/rainha-aelwen' }),
  person('caelir', 'Caelir de Sylvaris', 502, 1198, 'morto', 'Elfo', { house: 'Casa Real de Sylvaris' }),
  person('thalien', 'Thalien do Lago Claro', 883, null, 'viva', 'Elfa'),
  person('lyssara', 'Lyssara de Sylvaris', 1168, null, 'viva', 'Elfa', { house: 'Casa Real de Sylvaris' }),
  person('maeriel', 'Maeriel de Sylvaris', 1174, null, 'viva', 'Elfa', { house: 'Casa Real de Sylvaris' }),
  person('elara', 'Elara de Sylvaris', 1185, null, 'viva', 'Elfa', { house: 'Casa Real de Sylvaris', profile: '/personagens/elara' }),

  person('edric-averen', 'Edric Averen', -61, 0, 'morto', 'Humano', { house: 'Averen' }),
  person('mirela-averen', 'Mirela Averen', -58, 9, 'morta', 'Humana', { house: 'Averen' }),
  person('aldren-averen', 'Aldren Averen', -36, 47, 'morto', 'Humano', { house: 'Averen' }),
  person('kaelor-averen', 'Kaelor Averen', -31, 52, 'morto', 'Humano', { house: 'Averen' }),
  person('theron-averen', 'Theron Averen', -24, 61, 'morto', 'Humano', { house: 'Averen' }),
  person('elia-aldren', 'Elia Averen', -8, 70, 'morta', 'Humana', { house: 'Averen' }),
  person('cassian-kaelor', 'Cassian Averen', -4, 78, 'morto', 'Humano', { house: 'Averen' }),
  person('marcellus-veyron', 'Marcellus Veyron', 54, 158, 'morto', 'Humano', { house: 'Veyron' }),

  person('tiber-veyron', 'Tiber Veyron', 18, 103, 'morto', 'Humano', { house: 'Veyron' }),
  person('alessa-veyron', 'Alessa Veyron', 23, 111, 'morta', 'Humana', { house: 'Veyron' }),
  person('octavia-veyron', 'Octavia Veyron', 83, 164, 'morta', 'Humana', { house: 'Veyron' }),
  person('lucan-veyron', 'Lucan Veyron', 87, 151, 'morto', 'Humano', { house: 'Veyron' }),
  person('sabine-veyron', 'Sabine Veyron', 112, 181, 'morta', 'Humana', { house: 'Veyron' }),

  person('halvard-i', 'Halvard I', 142, 219, 'morto', 'Humano', { house: 'Casa do Lobo' }),
  person('astrid-halvard', 'Astrid de Winterfeld', 176, 257, 'morta', 'Humana', { house: 'Casa do Lobo' }),
  person('eirik-iii', 'Eirik III', 1048, 1128, 'morto', 'Humano', { house: 'Casa do Lobo' }),
  person('sigrid-eirik', 'Sigrid Eiriksdottir', 1081, 1162, 'morta', 'Humana', { house: 'Casa do Lobo' }),
  person('runa-winterfeld', 'Runa de Winterfeld', 1120, null, 'viva', 'Humana', { house: 'Casa do Lobo' }),

  person('arden-i', 'Arden I', 137, 207, 'morto', 'Humano', { house: 'Arden' }),
  person('leon-arden', 'Leon Arden', 171, 239, 'morto', 'Humano', { house: 'Arden' }),
  person('cassia-arden', 'Cassia Arden', 1090, 1160, 'morta', 'Humana', { house: 'Arden' }),
  person('roderic-arden', 'Roderic Arden', 1122, null, 'vivo', 'Humano', { house: 'Arden' }),
  person('ilyra-arden', 'Ilyra Arden', 1176, null, 'viva', 'Humana', { house: 'Arden', profile: '/personagens/ilyra-arden' }),

  person('corvin-i', 'Corvin I', 145, 221, 'morto', 'Humano', { house: 'Corven' }),
  person('maela-corven', 'Maela Corven', 175, 246, 'morta', 'Humana', { house: 'Corven' }),
  person('darian-corven', 'Darian Corven', 1101, 1175, 'morto', 'Humano', { house: 'Corven' }),
  person('vera-corven', 'Vera Corven', 1134, null, 'viva', 'Humana', { house: 'Corven' }),
  person('cassor-corven', 'Cassor Corven', 1170, null, 'vivo', 'Humano', { house: 'Corven' }),

  person('elmer-i', 'Elmer I', 139, 215, 'morto', 'Humano', { house: 'Maré Alta' }),
  person('nerissa-elmer', 'Nerissa Elmer', 173, 254, 'morta', 'Humana', { house: 'Maré Alta' }),
  person('maeron-elmer', 'Maeron Elmer', 1097, 1171, 'morto', 'Humano', { house: 'Maré Alta' }),
  person('selka-elmer', 'Selka Elmer', 1131, null, 'viva', 'Humana', { house: 'Maré Alta' }),
  person('taris-elmer', 'Taris Elmer', 1162, null, 'vivo', 'Humano', { house: 'Maré Alta' }),

  person('cassian-nimbus', 'Cassian Nimbus', 401, 642, 'morto', 'Humano — bruxo', { house: 'Nimbus' }),
  person('varel-nimbus', 'Varel Nimbus', 487, 679, 'morto', 'Humano — bruxo', { house: 'Nimbus' }),
  person('sarya-nimbus', 'Sarya Nimbus', 575, 688, 'morta', 'Humana — bruxa', { house: 'Nimbus' }),
  person('maelis-rivs', 'Maelis Rivs', 501, null, 'desaparecida', 'Humana — bruxa', { house: 'Rivs' }),
  person('naira-rivs', 'Naira Rivs', 421, 601, 'morta', 'Humana — bruxa', { house: 'Rivs' }),
  person('oriel-rivs', 'Oriel Rivs', 574, null, 'desaparecido', 'Humano — bruxo', { house: 'Rivs' }),

  person('gharon-gron', 'Gharon Gron', 1090, 1164, 'morto', 'Orc', { house: 'Clã Gron' }),
  person('mavra-gron', 'Mavra Gron', 1101, null, 'viva', 'Orc', { house: 'Clã Gron' }),
  person('kharza-gron', 'Kharza Gron', 1164, null, 'viva', 'Orc', { house: 'Clã Gron', profile: '/personagens/kharza-gron' }),
  person('torvak-tor', 'Torvak Tor', 1099, 1174, 'morto', 'Orc', { house: 'Clã Tor' }),
  person('gorvak-tor', 'Gorvak Tor', 1153, null, 'vivo', 'Orc', { house: 'Clã Tor', profile: '/personagens/gorvak-tor' }),

  person('orun-pedra', 'Orun da Pedra Medida', 302, 411, 'morto', 'Anão', { house: 'Sangue da Nona Bigorna' }),
  person('dhorin-orun', 'Dhorin Orun', 349, 458, 'morto', 'Anão', { house: 'Sangue da Nona Bigorna' }),
  person('brunna-dhorin', 'Brunna Dhorin', 1100, null, 'viva', 'Anã', { house: 'Sangue da Nona Bigorna' }),
  person('keld-brunna', 'Keld Brunna', 1150, null, 'vivo', 'Anão', { house: 'Sangue da Nona Bigorna' }),

  person('hroth-pilar', 'Hroth do Pilar Norte', 680, 1010, 'morto', 'Gigante', { house: 'Canto do Pilar' }),
  person('yrsa-hroth', 'Yrsa Hroth', 821, 1148, 'morta', 'Gigante', { house: 'Canto do Pilar' }),
  person('mahr-yrsa', 'Mahr Yrsa', 1005, null, 'vivo', 'Gigante', { house: 'Canto do Pilar' }),
]

const treeIdentity = {
  kayler: { theme: 'storm', symbol: 'ϟ' }, bellatrix: { theme: 'ember', symbol: '♜' }, 'real-sylvaris': { theme: 'living', symbol: '❧' },
  averen: { theme: 'royal', symbol: '♛' }, veyron: { theme: 'military', symbol: '⚔' }, winterfeld: { theme: 'winter', symbol: '✦' },
  valoria: { theme: 'harvest', symbol: '♜' }, ravenhold: { theme: 'raven', symbol: '◆' }, eldemar: { theme: 'tide', symbol: '≋' },
  nimbus: { theme: 'nimbus', symbol: 'ϟ' }, rivs: { theme: 'river', symbol: '≈' }, 'clas-orcs': { theme: 'tribal', symbol: 'ᚱ' },
  'sangue-da-nona-bigorna': { theme: 'forge', symbol: '⚒' }, 'canto-do-pilar': { theme: 'mountain', symbol: '▲' },
}

const tree = (id, name, subtitle, memberIds, relations, extra = {}) => ({ id, slug: id, name, subtitle, memberIds, relations, truthStatus: 'documented', ...(treeIdentity[id] ?? { theme: 'archive', symbol: '◇' }), ...extra })

export const genealogies = [
  tree('kayler', 'Linhagem Kayler', 'A tempestade preservada em cinco gerações públicas', ['tarian-kayler', 'selene-kayler', 'normus-kayler', 'namidia-bellatrix', 'sirius-kayler'], [relation('tarian-kayler', 'selene-kayler'), relation('selene-kayler', 'normus-kayler'), relation('normus-kayler', 'sirius-kayler'), relation('namidia-bellatrix', 'sirius-kayler'), relation('normus-kayler', 'namidia-bellatrix', 'partner')], { house: 'Kayler', summary: 'O registro público termina em Sirius; qualquer ramo sobrevivente permanece hipótese ou segredo autoral.' }),
  tree('bellatrix', 'Casa Bellatrix', 'Guardiões eleitos da Fortaleza do Véu', ['orena-bellatrix', 'marek-bellatrix', 'daria-ven', 'namidia-bellatrix', 'tomas-bellatrix', 'lena-bellatrix', 'sirius-kayler'], [relation('orena-bellatrix', 'marek-bellatrix'), relation('marek-bellatrix', 'namidia-bellatrix'), relation('marek-bellatrix', 'tomas-bellatrix'), relation('daria-ven', 'namidia-bellatrix'), relation('daria-ven', 'tomas-bellatrix'), relation('tomas-bellatrix', 'lena-bellatrix'), relation('namidia-bellatrix', 'sirius-kayler')], { house: 'Bellatrix', summary: 'Sangue e função política são separados: o título de guardião depende da confiança dos vigias.' }),
  tree('real-sylvaris', 'Casa Real de Sylvaris', 'A rainha, sua irmã e as três princesas', ['saelwen', 'aelwen', 'caelir', 'thalien', 'lyssara', 'maeriel', 'elara'], [relation('saelwen', 'aelwen'), relation('saelwen', 'caelir'), relation('caelir', 'lyssara'), relation('caelir', 'maeriel'), relation('caelir', 'elara'), relation('thalien', 'lyssara'), relation('thalien', 'maeriel'), relation('thalien', 'elara'), relation('caelir', 'thalien', 'partner')], { house: 'Casa Real de Sylvaris', summary: 'Elara é a caçula das três princesas e futura herdeira por escolha dos Círculos, não por simples primogenitura.' }),
  tree('averen', 'Dinastia Averen', 'A casa cuja sucessão iniciou a Grande Guerra', ['edric-averen', 'mirela-averen', 'aldren-averen', 'kaelor-averen', 'theron-averen', 'elia-aldren', 'cassian-kaelor'], [relation('edric-averen', 'aldren-averen'), relation('edric-averen', 'kaelor-averen'), relation('edric-averen', 'theron-averen'), relation('mirela-averen', 'aldren-averen'), relation('mirela-averen', 'kaelor-averen'), relation('mirela-averen', 'theron-averen'), relation('aldren-averen', 'elia-aldren'), relation('kaelor-averen', 'cassian-kaelor')], { house: 'Averen', summary: 'Edric morreu sem sucessor declarado; nenhum filho possuía primazia aceita pelas Doze Legiões.' }),
  tree('veyron', 'Dinastia Veyron', 'A reunificação encerrada por doze adagas', ['tiber-veyron', 'alessa-veyron', 'marcellus-veyron', 'octavia-veyron', 'lucan-veyron', 'sabine-veyron'], [relation('tiber-veyron', 'marcellus-veyron'), relation('alessa-veyron', 'marcellus-veyron'), relation('marcellus-veyron', 'octavia-veyron'), relation('marcellus-veyron', 'lucan-veyron'), relation('octavia-veyron', 'sabine-veyron')], { house: 'Veyron', summary: 'A descendência perdeu direito continental após o regicídio, mas continuou a alimentar pretensões regionais.' }),
  tree('winterfeld', 'Dinastia de Winterfeld', 'A Casa do Lobo e o pacto dos jarls', ['halvard-i', 'astrid-halvard', 'eirik-iii', 'sigrid-eirik', 'runa-winterfeld'], [relation('halvard-i', 'astrid-halvard'), relation('eirik-iii', 'sigrid-eirik'), relation('sigrid-eirik', 'runa-winterfeld')], { summary: 'A linha histórica possui lacunas documentadas; o Conselho dos Jarls pode afastar um herdeiro incapaz de manter abrigo.' }),
  tree('valoria', 'Dinastia de Valoria', 'A Casa Arden entre coroa e celeiros', ['arden-i', 'leon-arden', 'cassia-arden', 'roderic-arden', 'ilyra-arden'], [relation('arden-i', 'leon-arden'), relation('cassia-arden', 'roderic-arden'), relation('roderic-arden', 'ilyra-arden')], { summary: 'Os pactos agrários podem suspender a sucessão até que dívidas de colheita sejam reparadas.' }),
  tree('ravenhold', 'Dinastia de Ravenhold', 'A Casa Corven e o Senado de Estandartes', ['corvin-i', 'maela-corven', 'darian-corven', 'vera-corven', 'cassor-corven'], [relation('corvin-i', 'maela-corven'), relation('darian-corven', 'vera-corven'), relation('vera-corven', 'cassor-corven')], { summary: 'A coroa depende de confirmação militar e civil; isso converte generais em árbitros perigosos.' }),
  tree('eldemar', 'Dinastia de Eldemar', 'A Casa da Maré Alta e o Conselho das Marés', ['elmer-i', 'nerissa-elmer', 'maeron-elmer', 'selka-elmer', 'taris-elmer'], [relation('elmer-i', 'nerissa-elmer'), relation('maeron-elmer', 'selka-elmer'), relation('selka-elmer', 'taris-elmer')], { summary: 'O Conselho pode escolher outro ramo quando o herdeiro não conquista licença de navegação.' }),
  tree('nimbus', 'Linhagem Nimbus', 'A corrente escarlate interrompida', ['cassian-nimbus', 'varel-nimbus', 'sarya-nimbus'], [relation('cassian-nimbus', 'varel-nimbus'), relation('varel-nimbus', 'sarya-nimbus')], { summary: 'Registros públicos indicam destruição em combate; sobreviventes não são confirmados.' }),
  tree('rivs', 'Linhagem Rivs', 'Os nomes evacuados com os arquivos', ['naira-rivs', 'maelis-rivs', 'oriel-rivs'], [relation('naira-rivs', 'maelis-rivs'), relation('maelis-rivs', 'oriel-rivs')], { summary: 'O desaparecimento preserva possibilidade, não prova, de continuidade.' }),
  tree('clas-orcs', 'Clãs Gron e Tor', 'Parentesco, nome adulto e vínculo de brasa', ['gharon-gron', 'mavra-gron', 'kharza-gron', 'torvak-tor', 'gorvak-tor'], [relation('gharon-gron', 'kharza-gron'), relation('mavra-gron', 'kharza-gron'), relation('gharon-gron', 'mavra-gron', 'partner'), relation('torvak-tor', 'gorvak-tor')], { summary: 'Clã não é apenas sangue; este diagrama mostra somente parentesco biológico publicamente confirmado.' }),
  tree('sangue-da-nona-bigorna', 'Sangue da Nona Bigorna', 'A família de Orun e seus vínculos de ofício', ['orun-pedra', 'dhorin-orun', 'brunna-dhorin', 'keld-brunna'], [relation('orun-pedra', 'dhorin-orun'), relation('brunna-dhorin', 'keld-brunna')], { summary: 'Lacunas não são preenchidas por mestres de ofício: adoção profissional e descendência permanecem categorias distintas.' }),
  tree('canto-do-pilar', 'Canto do Pilar Norte', 'Uma genealogia preservada em montanhas', ['hroth-pilar', 'yrsa-hroth', 'mahr-yrsa'], [relation('hroth-pilar', 'yrsa-hroth'), relation('yrsa-hroth', 'mahr-yrsa')], { summary: 'Cada geração é recitada no vale associado ao nascimento e confirmada por duas comunidades.' }),
]

export const genealogyPeopleById = Object.fromEntries(genealogyPeople.map((entry) => [entry.id, entry]))
