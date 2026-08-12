# Changelog local

## 2026-08-12 — recuperação de versão e estabilidade do Arquivo

- Corrigida a falha recorrente causada por páginas antigas que tentavam carregar módulos removidos após uma nova publicação.
- As rotas carregadas sob demanda agora reconhecem erros de versão e fazem uma única atualização automática com revalidação.
- Adicionada política de cache do Cloudflare Pages: documentos nunca ficam obsoletos e módulos com hash permanecem imutáveis.
- O fallback foi separado por natureza: rotas públicas continuam abrindo a aplicação, enquanto recursos inexistentes sob `/assets/` retornam 404 verdadeiro e nunca são confundidos com módulos JavaScript.
- A tela de falha ganhou atualização segura, retorno ao início e código diagnóstico para erros reais de conteúdo.

## 2026-08-12 — registros primários em volumes

- Substituído o parágrafo isolado de abertura por um registro em volumes, com estrutura específica para personagens, territórios, sociedades, guerras e eras, objetos, crenças, criaturas e documentos.
- Os 201 verbetes únicos dos 27 catálogos agora apresentam no mínimo 5 volumes e 15 entradas temáticas antes das fichas especializadas; personagens mais documentados ultrapassam 35 entradas.
- Acrescentados comentários arquivísticos sobre identidade, escopo, presente, relações, força documental e lacunas, sempre derivados dos campos canônicos existentes.
- Locais sustentados apenas pelo Atlas passaram a explicar paisagem, circulação, autoridade e escala humana sem inventar população, governo ou acontecimento ausente.
- Dinastias, sucessões e as 19 genealogias receberam leitura documental expandida em suas páginas próprias.
- Criado um teste de profundidade que rejeita regressões abaixo do novo mínimo editorial.
- Atualizada a apresentação responsiva dos registros para leitura longa em desktop e celular.
- Lint, validações de genealogia, Atlas, conteúdo, profundidade editorial, privacidade, imagens e build executados sem erro.

## 2026-07-29 — acabamento visual e doze novos dossiês ilustrados

- Adicionados 6 locais de uso cotidiano e institucional: Farol das Sete Marés, Mosteiro da Brasa Tardia, Arquivo de Pedra, Jardim das Pontes Silenciosas, Mercado dos Três Ventos e Torre da Chuva Negra.
- Adicionadas 3 lendas com evidência e limite documental explícitos: A Barca sem Remador, O Sino sob a Geleira e A Nona Porta.
- Adicionados 3 documentos completos: Livro dos Caminhos Fechados, Registro das Águas Partilhadas e Códice dos Estandartes Baixos.
- O total visível passou de 199 para 211 registros nos 27 catálogos; todos continuam ligados a outros verbetes e possuem imagem e thumbnail.
- Produzidas 12 artes individuais e 24 derivados responsivos. A biblioteca passou a 81 assets integrados, 116 PNGs mestres preservados e 192 WebPs publicados.
- Criada `src/styles/polish.css` como camada final não destrutiva para navegação, cards, filtros, mastheads, dossiês, galeria, rodapé e telas estreitas.
- Atualizadas as métricas da página inicial para apresentar o total real de registros e genealogias públicas.
- Validações editoriais, de privacidade, conteúdo e imagens executadas sem erro nesta etapa.

## 2026-07-29 — topônimos do raster e cobertura visual integral

- Transcritos 27 topônimos legíveis do raster oficial em 27 novos verbetes geográficos e marcadores normalizados.
- Adicionada a região pública das Ilhas do Nevoeiro sem atribuição de soberania não documentada.
- Mantidas como contestadas a Fortaleza Esquecida e a grafia cartográfica do Salão dos Forgemantes.
- Criadas 9 pranchas regionais para os novos locais e 5 pranchas temáticas para os registros sem representação individual.
- Completada a cobertura de imagem e thumbnail dos 199 registros visíveis nos 27 catálogos; pranchas compartilhadas recebem legenda de proveniência e não são tratadas como retratos canônicos.
- Biblioteca ampliada para 69 assets integrados, 104 PNGs mestres preservados e 168 WebPs publicados.
- `validate:content` passou a recusar registro público sem imagem responsiva completa ou prancha compartilhada sem texto alternativo.
- Não foram inventadas rotas ou distâncias apenas por proximidade visual no mapa.

## 2026-07-22 — arquivo público ampliado e contenção canônica

- Removidas do bundle público todas as chaves `secrets` e a revelação do mecanismo reservado das Cinco Relíquias.
- Corrigidos pacto Kayler, metamorfose contestada de Sirius, morte de Normus, ausência de capital permanente nas Montanhas Cinzentas, designação de Elara em 1203, arsenal de Sirius, retratos canônicos e limites da Adaga do Passo Velado.
- Ampliadas as genealogias para 19 árvores e 140 pessoas, com Gron/Tor separados, lacunas multisseculares explícitas e relações distintas de sangue, adoção, tutela, ofício e custódia.
- Aprofundados criaturas, livros, lendas, cosmologia, portais, mundos, Retornados, necromancia, fins dos tempos, Nar-Khalion, profecias, relíquias, Celestiais, Lanças, dinastias e sucessões por dossiês documentais não repetitivos.
- Criada taxonomia pública para informação desconhecida, perdida, contestada, secreta, não registrada, baseada em rumor ou conhecida por um povo.
- `validate:editorial` passou a cobrir 334 registros em 30 conjuntos e a detectar regressão de profundidade, repetição, preenchimento e exposição autoral.
- Criados os padrões documentais solicitados e inventário de 132 retratos genealógicos pendentes; nenhum bitmap novo foi gerado.

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
