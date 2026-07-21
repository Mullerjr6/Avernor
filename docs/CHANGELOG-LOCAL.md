# Changelog local

## 2026-07-21 — expansão enciclopédica, genealogias e cosmologia

- Adicionados status de verdade documental e campos narrativos estruturados.
- Criados povos, mitologias, religiões humanas, Fraturas, outros mundos, Retornados, necromancia, profecias, fim dos tempos, Relíquias, Nar-Khalion, Celestiais, Lanças e dez facções.
- Implementadas 14 genealogias públicas com 68 pessoas, 7 dinastias e 5 sucessões.
- Criada árvore interativa com zoom, pan, filtros, recolhimento, caminho de parentesco, teclado, painel lateral e modo textual responsivo.
- Adicionadas rotas especializadas e 16 novos catálogos pesquisáveis.
- Adicionada a rota contextual `/reinos/:slug/sucessao` e comparadores acessíveis de crenças e relatos.
- Separada a árvore em primitivas reutilizáveis para nós, relações, controles, legenda, linhagem, dinastia e sucessão.
- Aprofundados Sirius, Normus, Namídia, Elara, Aelwen, os sete territórios, cinco eras e cinco guerras.
- Criada e integrada a arte da Guerra dos Tronos, elevando a biblioteca para 55 masters gerados e 140 WebPs responsivos.
- Criados documentos públicos de genealogias/dinastias/sucessões e documentos reservados em `docs/autor/`.
- Alinhados os quatro nomes canônicos de documentação solicitados, com atalhos antigos preservados.
- Adicionado validador contra ciclos, datas impossíveis, referências inexistentes e sucessões contraditórias.
- Nenhum commit, push ou publicação realizado.

## 2026-07-21 — produção e integração do acervo visual

### Produção

- Criados 54 novos masters com o gerador de imagens integrado, cobrindo toda a antiga fila de artefatos, biblioteca, cidades, bestiário, eras, casas, lendas, locais, religiões e guerras.
- Preservada a direção canônica: magia hereditária limitada às três linhagens, dragões tratados como fauna rara, lendas visualmente ambíguas, religiões sem milagres e conflitos centrados também em logística e impacto civil.
- Criada uma alternativa adicional para a Guerra da Cinza Branca, preservada separadamente como `guerra-da-cinza-branca-alt-01.png`.

### Tratamento e integração

- Criadas 17 versões `-enhanced` dos retratos, mapas e cena de jornada existentes, sem sobrescrever nenhum master original.
- Normalizados os 54 novos PNGs em alta resolução: 2560×1440 para paisagens, 2048×2560 para pranchas verticais e 2048×3072 para capas.
- Geradas 138 variantes WebP responsivas de card, detalhe, mapa e jornada.
- Adicionados `src/content/imageManifest.js` e defaults no schema para ligar automaticamente os registros às artes finais.
- Galeria expandida para incluir o acervo completo; tradições religiosas passaram a exibir suas artes na página institucional.
- Documentado o pipeline reproduzível em `scripts/finalize-image-library.mjs` e ampliado `scripts/optimize-images.mjs`.

### Preservação

- Masters gerados pelo recurso integrado permanecem preservados também no diretório de origem do Codex.
- Nenhum original existente foi apagado ou sobrescrito; nenhuma publicação, commit ou push foi realizado.

## 2026-07-21 — refinamento visual premium

### Sistema visual

- Adicionada uma camada CSS editorial em `src/styles/refinement.css`, com textura, profundidade, molduras, tokens de transição, composição temática e breakpoints até 320 px.
- Criado `src/data/visuals.js` para centralizar acentos e pontos focais de entidades.
- Catálogos passaram a declarar tema, glifo, acento e imagem de masthead quando existe fonte coerente no acervo.
- Cards agora distinguem retrato, território, heráldica, bestiário e biblioteca por enquadramento e hierarquia, mantendo o mesmo contrato de conteúdo.

### Páginas e componentes

- Home recebeu cantos de moldura, indicação de continuidade e o tríptico “O legado que cerca Sirius” com Normus, Namídia e Elara.
- Coleções ganharam mastheads cinematográficos, índice de resultados, filtros temáticos e estado vazio reutilizável.
- Detalhes foram convertidos em dossiês com metadados primários, acento individual, ficha editorial e enquadramento controlado para artes e placeholders.
- Cronologia ganhou linha de progresso e semântica completa de tabs/tabpanels.
- Atlas ganhou pan limitado, zoom com estados desabilitados, teclado, legenda, contagem, coordenadas e estado vazio.
- Galeria ganhou numeração, categorias e lightbox editorial navegável por setas e Escape.
- Menu móvel recebeu scrim e fechamento por Escape; a busca global recebeu seleção ativa, setas, Enter e associação ARIA.
- 404, rodapé, botões e retorno ao topo foram harmonizados com o novo sistema.

### Imagens

- Nenhum master existente foi sobrescrito e nenhuma imagem raster nova foi necessária nesta etapa.
- Cortes de personagens e reinos foram calibrados por `object-position`; placeholders permanecem contidos e claramente identificados como provisórios.
- As imagens existentes foram reutilizadas apenas em papéis compatíveis: retratos, jornada, mapas históricos e atlas canônico.
- A fila de 54 artes pendentes continua integralmente coberta por 54 briefings individuais e placeholders editoriais.

### Validação

- Busca por teclado, menu móvel, timeline, atlas, filtros vazios e lightbox conferidos em Chromium real.
- Smoke test em 28 rotas representativas: títulos corretos, fallback 404 correto e 0 imagens quebradas após carregamento lazy.
- Viewports de 320, 375, 768 e 1440 px conferidos; 0 overflow horizontal nos pontos medidos.
- Console do navegador: 0 erros e 0 avisos na rodada final de interface.
- `npm install`, `npm run lint` e `npm run build` executados ao final desta etapa.
- Nenhum commit, push ou publicação realizado.

## 2026-07-21 — reconstrução editorial

### Adicionado

- Arquitetura React/Vite completa, roteamento e carregamento assíncrono.
- Home cinematográfica, 12 acervos, detalhes por slug, cronologia, atlas, galeria e página institucional.
- Busca global com relevância, filtros na URL, breadcrumbs, compartilhamento, 404 e limite de erro.
- Conteúdo estruturado para eras, reinos, cidades, casas, personagens, criaturas, guerras, artefatos, lendas, religiões, locais e livros.
- Atlas com zoom, arraste, filtros, coordenadas verificadas e painéis relacionados.
- Placeholders SVG e 30 variantes WebP responsivas.
- Novas representações visuais para Normus Kayler e Namidia Bellatrix, preservando os originais.
- Metadados SEO, Open Graph, acessibilidade, redução de movimento e estilos de impressão.
- Documentação técnica, canônica, editorial e visual.

### Corrigido

- Separação visual entre Sirius e Normus.
- Identidade humana de Namidia restaurada.
- Remoção de implicações de império/reino dos dragões na lore ativa.
- Menus e links deixaram de ser meramente decorativos.
- Imagens pesadas passaram a ter variantes otimizadas sem perda dos originais.

### Validação

- `npm install`: 0 vulnerabilidades reportadas.
- `npm run lint`: aprovado.
- `npm run build`: aprovado.
- QA em Chromium: home, busca, detalhe, filtro com URL, atlas, galeria/lightbox, navegação móvel e 320 px.
- Nenhum commit, push ou publicação realizado.

### Dependências instaladas

- Aplicação: React, React DOM e React Router DOM.
- Build: Vite e plugin React.
- Qualidade: ESLint, regras React Hooks/Refresh e globals.
- Mídia: Sharp, usado somente pelo pipeline local de otimização.
- As versões exatas e reproduzíveis estão registradas em `package-lock.json`.
# 2026-07-21 — aprofundamento integral de registros e genealogias

## Conteúdo e dados

- Expandidos os contratos editoriais e aprofundados 87 dossiês centrais de personagens, reinos, cidades, locais, povos, casas, facções, guerras, eras, mitologias, religiões, artefatos e relíquias.
- Biografias, linhas do tempo, psicologia, política, cultura, impactos de guerra, doutrinas e riscos passaram a ser pesquisáveis sem expor material do autor.
- Relações internas agora são completadas de modo bidirecional e validadas; os 27 catálogos não possuem registros isolados.
- Cinco sucessões passaram a ser derivadas de reivindicações ordenadas, separando governante, sucessores, pretendentes e excluídos.

## Genealogias e interface

- As 14 árvores ganharam fluxo geracional literal, ligações diferenciadas, identidades visuais próprias, filtros, busca, destaque de ascendência/descendência, caminho familiar, zoom, arraste, modo textual e painel detalhado.
- A visualização reservada permanece indisponível no bundle público; segredos existentes foram organizados em `docs/autor/REGISTROS-RESTRITOS.json`.
- Criado `EncyclopediaDossier` para renderizar capítulos, cronologias e blocos especializados sem duplicar páginas.

## Qualidade

- Criado o validador de profundidade editorial e ampliados os validadores de genealogia e conteúdo.
- A busca global foi separada do pacote inicial por carregamento assíncrono.
- Nenhum commit, push ou publicação realizado.
