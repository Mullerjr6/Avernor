# Guia de imagens

## Regras de uso

- Preserve sempre o PNG original; a interface deve consumir WebP otimizado quando disponível.
- Retratos usam proporção 4:5, mínimo de 1000 px de largura e fundo com informação ambiental discreta.
- Locais, guerras, eras e mapas usam 16:9 ou 3:2, mínimo de 1600 px.
- Capas usam 2:3 e precisam reservar área segura para tipografia aplicada depois; não gere letras na própria imagem.
- Artefatos e criaturas usam 4:5, com objeto ou anatomia legíveis em miniatura.
- Brasões devem ter versão quadrada ou 4:5, composição central e fundo simples.
- Todo asset publicado recebe `alt` contextual, nunca uma repetição do nome do arquivo.
- Caminhos públicos começam por `/assets/images/`; caminhos locais do Windows nunca entram no código.

## Pipeline

1. Produza e aprove o master PNG.
2. Salve no diretório sem sobrescrever um original existente.
3. Atualize `scripts/optimize-images.mjs` quando a categoria exigir novo preset.
4. Execute `npm run optimize:images`.
5. Aponte `image` para a variante de detalhe e `thumbnail` para a variante de card.
6. Teste o card, a página detalhada e o fallback de erro.

## Coerência visual

Direção principal: pintura conceitual de fantasia sombria, realismo estilizado, materiais táteis, luz cinematográfica e paleta regional. Evite brilho digital genérico, excesso de partículas, anatomia impossível, iconografia moderna e texto gerado. O mundo deve parecer vivido: desgaste, clima, logística e escala importam.

Magia visível deve estar associada apenas a Kayler, Nimbus ou Rivs. Ritos religiosos não produzem feitiços. Dragões são animais raros e inteligentes, sem vestes, coroas, arquitetura ou hierarquia política. Orcs são povos, não monstros genéricos.

## Assets revisados

- `normus-kayler-v2.png`: nova leitura aprovada tecnicamente; separa o rosto de Normus do de Sirius.
- `namidia-bellatrix-v2.png`: nova leitura humana, parda, rebelde e sem magia.
- `avernor-map-atlas.png`: carta oficial para coordenadas do atlas.
- Mapas alternativos permanecem na galeria como estudos; não definem o cânone geopolítico.

Os briefings individuais ficam em `docs/image-prompts/`. A fila completa e seu destino estão em `IMAGENS-PENDENTES.md`.

## Enquadramento na interface

- `thumbnailPosition` controla o foco no card; `heroPosition` controla o foco no detalhe. Nunca ajuste um corte sensível apenas com seletores CSS por posição no grid.
- Personagens preservam olhos e silhueta; o hero pode deslocar o rosto para liberar uma área segura para título e metadados.
- Mapas usados como fundo recebem gradiente, vinheta e baixa saturação. A carta do atlas permanece legível e não recebe desfoque decorativo.
- Placeholders SVG devem aparecer inteiros (`contain`) no detalhe e podem preencher cards com baixa opacidade. A moldura precisa deixar claro que o registro está documentado, embora a arte final esteja pendente.
- Imagens de coleção servem como contexto atmosférico. Elas não substituem a imagem específica de uma entidade e não devem sugerir que um mapa é o retrato oficial de uma cidade ou criatura.

## Molduras e camadas

As molduras são componentes da interface: cantos editoriais, filetes, numeração e legendas ficam em HTML/CSS, nunca gravados no bitmap. Isso mantém acessibilidade, responsividade e reuso. Gradientes sempre protegem contraste; a imagem original não deve ser escurecida ou sobrescrita no disco.

## Integração de uma arte final

1. Preserve o placeholder e o briefing até a aprovação da nova arte.
2. Adicione um master com nome novo, sem substituir uma fonte existente.
3. Gere as variantes WebP e confira seus tamanhos.
4. Atualize `image`, `thumbnail`, `alt`, `thumbnailPosition` e `heroPosition` no registro.
5. Confira card, masthead/detalhe, busca, galeria quando aplicável, 320 px e 768 px.
6. Só então marque `Imagem adicionada`, `Imagem revisada` e `Imagem aprovada` em `IMAGENS-PENDENTES.md`.

## Revisão visual de 2026-07-21

O acervo recebeu 54 novos masters pelo gerador de imagens integrado: artefatos, capas, cidades, bestiário, eras, casas, lendas, locais, religiões e guerras. Cada master foi normalizado em sRGB e alta resolução, preservado em PNG e publicado em variantes WebP de card e detalhe.

Os 17 mestres antigos também foram melhorados sem sobrescrita: dez retratos, seis mapas e a jornada pela Floresta Antiga possuem versões `-enhanced`. Retratos preservam identidade e enquadramento; mapas receberam apenas ampliação e nitidez determinísticas para não alterar rótulos, fronteiras ou geografia.

O vínculo entre conteúdo e arte é centralizado por `src/content/imageManifest.js`. O pipeline reproduzível está em `scripts/finalize-image-library.mjs` e `scripts/optimize-images.mjs`.

### Expansão enciclopédica

`gallery/guerra-dos-tronos.png` foi criado como master adicional pelo gerador integrado, inspecionado e publicado em `-card.webp` e `-page.webp`. A composição diferencia forças humanas, anãs, élficas e clãs orcs, reserva a magia visível ao bruxo e não introduz dragões ou texto gerado.
