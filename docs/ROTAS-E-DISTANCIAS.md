# Rotas e Distâncias

## Registro de trechos

Distâncias e durações são aproximações do Arquivo para viagem organizada em condições normais. A distância acompanha o percurso praticável — estrada, vale, rio ou corredor marítimo — e não a linha reta entre marcadores.

| Trecho | Terminais | Modo | Distância | Duração | Estado em 1204 d.C. |
|---|---|---|---:|---:|---|
| Estrada do Norte | Winterheim → Valóris | Terrestre | 820 km | 20–27 dias | Aberta |
| Passagem dos Vigias | Fortaleza do Véu → Ravencastle | Terrestre | 540 km | 13–18 dias | Aberta |
| Estrada dos Estandartes | Valóris → Ravencastle | Terrestre | 460 km | 10–14 dias | Aberta |
| Rota das Nove Bigornas | Valóris → Thur-Kar | Mista | 380 km | 9–13 dias | Aberta |
| Caminho das Margens | Valóris → Lethariel | Mista | 610 km | 15–22 dias | Aberta |
| Rota Verde | Lethariel → Porto Verde | Fluvial | 260 km | 4–7 dias | Aberta |
| Rota da Madeira Caída | Porto Verde → Porto de Eldemar | Marítima | 640 km | 5–9 dias | Aberta |
| Rota da Forja e do Mar | Thur-Kar → Porto de Eldemar | Terrestre | 480 km | 11–16 dias | Aberta |
| Rota das Brumas | Porto de Eldemar → Arquipélago das Brumas | Marítima | 390 km | 3–6 dias | Aberta |
| Rota do Mar das Estrelas | Porto de Eldemar → Mar das Estrelas | Marítima | 520 km | 4–8 dias | Aberta |
| Estrada de Cinza | Ravencastle → Vul’Gar | Terrestre | 520 km | 12–17 dias | Aberta |
| Rota dos Poços | Vul’Gar → Deserto de Zharak | Terrestre | 420 km | 10–15 dias | Aberta |
| Cordão Sanitário Oriental | Ravencastle → Terras Sombrias | Terrestre | 360 km | 9–14 dias | Restrita a expedições autorizadas |
| Corredor do Mar Interior | Valóris → Mar Interior | Fluvial | 280 km | 4–7 dias | Aberta |
| Canal das Margens | Mar Interior → Porto Verde | Fluvial | 450 km | 6–10 dias | Aberta |

## Cálculo de viagem

`findAtlasRoute(startId, endId, metric)` trata cada trecho como uma ligação nos dois sentidos e encontra o menor percurso documentado. Há duas métricas:

- `distance`: soma os quilômetros e minimiza a distância total;
- `time`: usa a média entre os limites mínimo e máximo de cada trecho.

Depois de escolher o percurso, o resultado informa a soma total de quilômetros e a soma dos intervalos de duração. O cálculo não adiciona automaticamente espera de fronteira, cerco, escolta, mudança de maré, doença, degelo ou bloqueio de campanha.

O estimador também não transforma Fraturas em atalhos. Espelho de Sal e Caminho das Árvores Ausentes são setores de vigilância, não arestas da malha pública.

## Perigos e estados

O campo `danger` descreve o risco normal conhecido do trecho. `status` informa sua disponibilidade de referência. Eventos transitórios das Crônicas Vivas são aplicados por `liveChroniclesAtlas.js`: uma campanha pode marcar a rota como vigiada, bloqueada ou destruída e adicionar dias de atraso, mas o adapter proíbe mudar terminais, geometria ou distância canônica.

A malha atual é contínua entre todos os terminais registrados. Isso permite calcular percursos transcontinentais, mas não afirma livre passagem política. Por exemplo, uma rota tecnicamente contínua pode exigir autorização em Sylvaris, guia em Kar-Dûm ou equipe sanitária nas Terras Sombrias.

## Inclusão de um trecho

Uma nova rota deve ter dois pontos públicos existentes, modo, distância positiva, intervalo de dias, perigo, condição sazonal, estado e descrição. Pontos intermediários (`via`) usam as mesmas coordenadas normalizadas 0–100 e servem apenas para desenhar a geometria do percurso.

Rotas secretas, saídas de evacuação e caminhos conhecidos apenas por um povo não devem ser incluídos na malha pública. Registre a classificação editorial apropriada fora do conjunto entregue ao navegador.
