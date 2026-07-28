# Arquitetura

## Visão geral

A aplicação é uma SPA React 19 construída com Vite. O roteamento usa React Router e cada página de alto nível é carregada sob demanda. Não existe backend: o conteúdo editorial é versionado como módulos JavaScript e pode ser migrado posteriormente para um CMS sem alterar o contrato visual.

## Fluxo de dados

1. `src/content/schema.js` define o formato comum dos registros.
2. Os módulos de `src/content/*/index.js` declaram a lore de cada domínio.
3. `src/data/catalogs.js` associa coleção, rota, filtros, texto e tema editorial.
4. `src/data/visuals.js` centraliza acentos e pontos focais compartilhados.
5. `CollectionPage` e `EntityDetailPage` renderizam páginas genéricas.
6. `GlobalSearch` carrega sob demanda um índice unificado, pesquisa recursivamente os campos públicos e ordena resultados por relevância.
7. `GenealogyTree` renderiza parentesco público com uma visão gráfica e outra textual.
8. `src/data/catalogs.js` resolve relações recíprocas para os 27 catálogos canônicos e expõe um índice de relações.
9. Os validadores de genealogia, Atlas, conteúdo, profundidade editorial, privacidade pública e imagens verificam integridade antes do build.

Campos comuns: `id`, `slug`, `name`, `title`, `subtitle`, `summary`, `description`, `image`, `thumbnail`, `thumbnailPosition`, `heroPosition`, `accent`, `gallery`, `category`, `status`, `origin`, `location`, `period`, `era`, `kingdom`, `race`, `lineage`, `relations`, `events`, `curiosities`, `quotes`, `references`, `createdAt` e `updatedAt`.

Campos editoriais adicionais: `truthStatus`, `canonStatus`, `spoilerLevel`, `objectives`, `fears`, `flaws`, `beliefs`, `equipment`, `timeline`, `rumors`, `disputedClaims` e `genealogyId`. A taxonomia de verdade vive em `src/content/taxonomies.js`.

O contrato também aceita biografia em capítulos, cronologia detalhada, psicologia, família, estado físico/emocional, estrutura territorial, cultura, anatomia de guerras, retrato de eras, doutrina religiosa e ciclo de uso de itens. Campos desconhecidos ficam vazios ou recebem uma indicação explícita; nunca são completados silenciosamente com fatos reservados.

## Módulos especializados

- `src/content/genealogies/`: pessoas, relações e árvores públicas.
- `src/content/dynasties/` e `src/content/succession/`: legitimidade política e ordens atuais.
- `src/content/cosmology/`: Véu, Fraturas, mundos, Retornados, necromancia, escatologia e Nar-Khalion.
- `src/content/peoples/`, `mythologies/`, `prophecies/`, `relics/`, `celestials/` e `factions/`: expansão enciclopédica.
- `docs/autor/`: bastidores deliberadamente excluídos do bundle Vite.
- `src/content/*/dossiers.js`: aprofundamento editorial mesclado ao registro-base de cada domínio.

## Decisões técnicas

- URLs legíveis e filtros em query string permitem compartilhar estados do acervo.
- `ImageWithFallback` fornece `srcset`, carregamento progressivo e placeholder por categoria.
- As páginas usam `SEO` para título, descrição e Open Graph dinâmicos.
- `ErrorBoundary`, página 404 e estados vazios evitam telas quebradas.
- O atlas usa coordenadas percentuais sobre a carta verificada; assim os marcadores continuam alinhados em diferentes larguras.
- O lightbox da galeria usa o elemento nativo `dialog`, com retorno de foco fornecido pelo navegador.
- CSS inclui foco visível, contraste alto, redução de movimento, impressão e breakpoints até 320 px.
- `src/styles.css` contém a base e os tokens; `src/styles/refinement.css` contém a camada visual temática, importada depois da base.
- `src/styles/expansion.css` concentra dossiês, sucessões e as 15 identidades visuais reutilizadas pelas 19 árvores genealógicas.

## Imagens

Os 90 PNGs originais são preservados em `artwork-masters/`, fora de `public/`. `npm run optimize:images` gera variantes WebP para cards, detalhes, banners e mapas com Sharp. O script é idempotente e não modifica a arte-fonte.

## Limites atuais

- O conteúdo é local e não possui painel administrativo.
- Busca e filtros rodam no cliente; a busca foi isolada em um chunk assíncrono para não ampliar o pacote inicial.
- Sitemap depende da definição do domínio de produção.
- Testes automatizados de unidade/E2E ainda não integram o repositório; a validação atual combina lint, build e QA real no navegador.
