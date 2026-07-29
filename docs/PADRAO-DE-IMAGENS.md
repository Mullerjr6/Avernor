# Padrão de imagens por registro

Este documento complementa `GUIA-DE-IMAGENS.md`. A imagem deve documentar o registro, não preencher espaço com arte aleatória.

## Conjuntos desejados

- Personagens: retrato, corpo inteiro, vestes cotidianas e de guerra, armas, símbolos, cenas históricas e familiares.
- Reinos e cidades: vista geral, mapa local, brasão, arquitetura, governo, muralhas, mercado, bairros, porto, estradas e ruínas próximas.
- Guerras e eras: mapa de campanha, comandantes, tropas, estandartes, batalhas, fortalezas, documentos e paisagem antes/depois.
- Casas e linhagens: brasão, lema, sede, árvore, membros, objetos familiares, retratos e lugares associados.
- Relíquias: objeto completo, materiais, inscrições, portadores documentados, representações antigas e estado atual.

## Imagem ausente

Quando a arte ainda não existir, mantenha a interface funcional com placeholder temático e registre a pendência em `IMAGENS-PENDENTES.md`. Forneça `visualDescription` ou `imageBrief` e um prompt separado. Um fallback heráldico informa cultura e ramo; nunca deve ser apresentado como retrato autêntico de alguém cuja aparência é desconhecida.

Não invente traços físicos para preencher retrato. Uma fonte hostil, tardia ou simbólica deve ser identificada na legenda. Mapas históricos recebem data e não podem aparecer como carta atual.

## Pranchas compartilhadas

Registros sem representação individual podem receber uma prancha `thematic` ou `regional`, desde que `imageAlt` descreva a proveniência e a interface não a apresente como retrato canônico. Pranchas temáticas documentam um conjunto de povos, crenças, facções ou fenômenos; pranchas regionais documentam a paisagem comum de topônimos transcritos do Atlas.

Os masters dessas coleções ficam em `artwork-masters/assets/images/archive-plates/` e `artwork-masters/assets/images/atlas-plates/`. O vínculo entre registro e prancha é centralizado por `recordImageAliases` em `src/content/imageManifest.js`. `scripts/validate-content.mjs` impede registros públicos sem as duas variantes responsivas e impede pranchas compartilhadas sem descrição visual.

## Artes individuais de lore

Locais, lendas e documentos novos com composição própria usam `lore-locations/`, `lore-legends/` e `lore-books/`. Paisagens e cenas documentais são mestres 16:9 de 1672 × 941; capas são mestres 2:3 de 1024 × 1536. O pipeline publica 720 × 405 e 1600 × 900 para paisagens, ou 640 × 960 e 960 × 1440 para capas.

Uma arte individual documenta somente o que a ficha pública sustenta. Relatos contestados devem permanecer visualmente ambíguos; tradições conhecidas por determinado povo não podem ser apropriadas por outra cultura; documentos reservam área de título, mas não recebem texto gerado no bitmap.

## Integração

Todo PNG mestre pertence a `artwork-masters/assets/images/`, diretório de preservação situado fora de `public/`. Somente derivados WebP otimizados podem ser publicados em `public/assets/images/`; os registros continuam referenciando esses derivados por caminhos públicos iniciados em `/assets/images/`. Nunca copie um PNG mestre para `public/`.

Preserve o mestre, gere as variantes WebP pelo pipeline do projeto, informe texto alternativo contextual, ajuste focos por dado e verifique card, detalhe e telas estreitas. Execute a auditoria de assets antes de marcar uma imagem como aprovada.
