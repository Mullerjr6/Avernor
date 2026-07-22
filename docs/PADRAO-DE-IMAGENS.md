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

## Integração

Todo PNG mestre pertence a `artwork-masters/assets/images/`, diretório de preservação situado fora de `public/`. Somente derivados WebP otimizados podem ser publicados em `public/assets/images/`; os registros continuam referenciando esses derivados por caminhos públicos iniciados em `/assets/images/`. Nunca copie um PNG mestre para `public/`.

Preserve o mestre, gere as variantes WebP pelo pipeline do projeto, informe texto alternativo contextual, ajuste focos por dado e verifique card, detalhe e telas estreitas. Execute a auditoria de assets antes de marcar uma imagem como aprovada.
