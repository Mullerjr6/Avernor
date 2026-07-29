# Pontos do Atlas

## Contrato de dados

Cada ponto público em `canonicalAtlasPoints` possui um identificador estável e informação suficiente para leitura sem abrir outra página.

| Campo | Finalidade |
|---|---|
| `id` e `slug` | Identidade permanente para URL, relações e futuros estados de campanha |
| `name` e `label` | Nome completo e rótulo exibido sobre o mapa |
| `type` e `layer` | Natureza do ponto e camada editorial |
| `regionId` e `kingdomId` | Relações geográfica e política validadas |
| `x` e `y` | Coordenadas percentuais de 0 a 100 |
| `coordinatePrecision` | `confirmed`, `regional` ou `approximate` |
| `truthStatus` | Qualidade pública da evidência, sem revelar reserva editorial |
| `summary` e `description` | Síntese e contexto canônico |
| `climate`, `terrain`, `politicalControl` | Contexto herdado ou especializado da região |
| `population`, `status`, `danger` | Estado consultável em 1204 d.C. |
| `relatedCharacters`, `relatedWars`, `relatedRecords` | Relações públicas com outros registros |
| `visibility` e `referenceDate` | Limite de publicação e recorte temporal |

## Inventário público

Coordenadas são apresentadas como `x, y` e servem ao alinhamento do overlay 3:2.

### Norte e nordeste

| Ponto | Tipo | Região | Coordenada | Precisão |
|---|---|---|---:|---|
| Geleiras de Winterfeld | Região natural | Winterfeld | 32, 10 | Conferida |
| Winterheim | Capital | Winterfeld | 39, 22 | Conferida |
| Último registro de Vyrasul | Criatura | Winterfeld | 27, 7 | Regional |
| Montanhas Cinzentas | Confederação | Montanhas Cinzentas | 65, 13 | Conferida |
| Fortaleza do Véu | Fortaleza | Montanhas Cinzentas | 57, 23 | Conferida |
| Último registro de Mhazir | Criatura | Montanhas Cinzentas | 70, 17 | Aproximada |

### Oeste e centro

| Ponto | Tipo | Região | Coordenada | Precisão |
|---|---|---|---:|---|
| Floresta Antiga | Floresta | Sylvaris | 25, 41 | Conferida |
| Lethariel | Capital | Sylvaris | 25, 58 | Conferida |
| Palácio da Seiva Clara | Marco local | Sylvaris | 26.7, 61 | Conferida |
| Porto Verde | Porto | Sylvaris | 14, 59 | Conferida |
| Caminho das Árvores Ausentes | Fratura | Sylvaris | 21, 47 | Regional |
| Valoria | Reino | Valoria | 53, 34 | Conferida |
| Valóris | Capital | Valoria | 52, 42 | Conferida |
| Sete Pontes | Marco local | Valoria | 57, 47 | Conferida |
| Mar Interior | Mar interior | Mar Interior | 45, 52 | Conferida |
| Ruínas Rivs | Ruína | Mar Interior | 42, 55 | Regional |
| Setor do Arquivo Submerso | Ruína pesquisada | Mar Interior | 47, 57 | Aproximada |

### Centro-leste e cordilheira

| Ponto | Tipo | Região | Coordenada | Precisão |
|---|---|---|---:|---|
| Ravenhold | Reino | Ravenhold | 71, 43 | Conferida |
| Ravencastle | Capital | Ravenhold | 71, 52 | Conferida |
| Senado de Estandartes | Marco local | Ravenhold | 69.5, 49.5 | Conferida |
| Estrada de Cinza | Rota | Ravenhold | 79, 59 | Regional |
| Kar-Dûm | Confederação | Kar-Dûm | 51, 61 | Conferida |
| Thur-Kar | Capital | Kar-Dûm | 51, 67 | Conferida |
| Ponte das Nove Bigornas | Marco local | Kar-Dûm | 54, 70 | Conferida |
| Setor dos Túneis Vazios | Conflito | Kar-Dûm | 46, 69 | Regional |
| Martelo de Orun | Relíquia | Kar-Dûm | 49, 66 | Regional |

### Costa e sul

| Ponto | Tipo | Região | Coordenada | Precisão |
|---|---|---|---:|---|
| Eldemar | Reino | Costa de Eldemar | 38, 79 | Conferida |
| Porto de Eldemar | Capital | Costa de Eldemar | 38.5, 85 | Conferida |
| Docas Fundas | Porto | Costa de Eldemar | 42, 87 | Conferida |
| Batalha das Águas Negras | Conflito | Costa de Eldemar | 31, 82 | Regional |
| Arquipélago das Brumas | Arquipélago | Brumas | 18, 88 | Conferida |
| Último registro de Alcarion | Criatura | Brumas | 27, 93 | Aproximada |
| Mar das Estrelas | Mar | Mar das Estrelas | 55, 91 | Conferida |
| Avistamentos do Kraken de Eldemar | Criatura | Mar das Estrelas | 68, 91 | Regional |

### Oriente e sudeste

| Ponto | Tipo | Região | Coordenada | Precisão |
|---|---|---|---:|---|
| Vul’Gar | Região cultural | Vul’Gar | 84, 64 | Conferida |
| Terras Sombrias | Região interdita | Terras Sombrias | 87, 44 | Conferida |
| Deserto de Zharak | Deserto | Zharak | 79, 83 | Conferida |
| Espelho de Sal | Fratura | Zharak | 82, 88 | Regional |
| Habitat do Lobo de Vidro | Criatura | Zharak | 87, 82 | Regional |

## Topônimos transcritos do raster oficial em 2026-07-29

| Região | Registros incorporados |
|---|---|
| Winterfeld | Fortaleza Gélida; Passagem da Geada |
| Montanhas Cinzentas | Acampamento da Liberdade; Pico da Vigia; A Fortaleza Esquecida |
| Ilhas do Nevoeiro | Ilhas do Nevoeiro |
| Sylvaris | Clarifonte; Enaril; Narin’falas; Vale das Estrelas |
| Valoria | Campo Belo; Ponte Dourada |
| Ravenhold e Terras Sombrias | Muralha de Pedra; Campo de Treinamento; Rio Torrente; Fortaleza Solar; Necrópole de Valthor |
| Kar-Dûm | Portão de Karak; Salão dos Forgemantes; Minas de Ferro |
| Arquipélago das Brumas | Ancoradouro dos Piratas |
| Vul’Gar | Cidade de Gron; Fortaleza Kring; Acampamento dos Clãs |
| Zharak | Porto da Serpente; Oásis Perdido; Cidade da Areia |

Todos possuem verbete em `/locais/:slug`, imagem regional responsiva e ligação direta para o marcador. “A Fortaleza Esquecida” e a grafia “Salão dos Forgemantes” permanecem contestadas; não foram normalizadas por conjectura. Nenhuma nova rota ou distância foi criada somente a partir da proximidade visual entre símbolos.

## Inclusão e revisão

Um novo ponto precisa ser público, relevante na escala do Atlas e compatível com a região que o contém. Se a fonte confirmar somente uma área, deve-se usar `regional`; se depender de testemunho incompleto, `approximate`. Nunca se aumenta a precisão apenas para melhorar a composição visual.

O validador recusa IDs duplicados, referências inexistentes, coordenadas fora dos limites regionais, campos reservados, imagens ausentes e datas diferentes de 1204 d.C. Execute `node scripts/validate-atlas.mjs` depois de qualquer alteração.
