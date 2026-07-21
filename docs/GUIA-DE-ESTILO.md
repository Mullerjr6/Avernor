# Guia de estilo visual

## Direção

O site combina arquivo real, cartografia antiga e fantasia épica sóbria. A interface deve parecer editorial e cinematográfica, nunca um painel administrativo genérico.

## Paleta

- Fundo profundo: `#090b10` e `#11151d`.
- Superfícies: carvão azulado translúcido.
- Ouro envelhecido: `#c7a45a`.
- Marfim de texto: `#f1eadc`.
- Cinzas de apoio: `#aaa79f`.
- Violeta: reservado ao legado Kayler e a interações pontuais.
- Carmesim: perigo, guerra ou rebelião; nunca como cor dominante de todo o site.

## Tipografia e composição

Títulos usam uma família serifada clássica disponível no sistema; texto e controles usam sans-serif. Escalas devem responder ao viewport com `clamp()`. Misture áreas de alta atmosfera com blocos densos e legíveis. O conteúdo nunca depende de texto sobre uma imagem sem camada de contraste.

## Componentes

- Cards têm imagem 4:5, metadados curtos, título, resumo e indicação clara de abertura.
- Botões primários usam ouro; ações secundárias usam contorno.
- Tags informam estado ou categoria, não decoram.
- Imagens devem ter `alt` contextual; elementos puramente ornamentais ficam ocultos da árvore acessível.

## Acessibilidade

Foco sempre visível, alvos confortáveis, contraste AA, navegação por teclado, link de salto e respeito a `prefers-reduced-motion`. Não use apenas cor para transmitir estado. Teste obrigatoriamente 320 px, 768 px e desktop.

## Sistema de tokens

Os tokens fundamentais ficam em `src/styles.css`; a camada de refinamento fica em `src/styles/refinement.css`. Novas páginas devem consumir esses valores antes de criar medidas ou cores locais.

- Espaçamento: `--space-1` a `--space-6`, todos fluidos com `clamp()`.
- Largura editorial: `--container: 1500px`.
- Superfícies: `--surface-glass` para vidro escuro e `--surface-ink` para painéis densos.
- Profundidade: `--shadow`, `--shadow-lift` e `--shadow-deep`.
- Bordas: `--radius-xs`, `--radius-sm` e `--radius-md`; o universo visual evita cartões excessivamente arredondados.
- Movimento: `--ease-cinematic`, `--transition-fast` e `--transition-medium`.

## Temas por acervo

Cada coleção recebe `theme`, `glyph`, `accent` e, quando pertinente, `mastheadImage` em `src/data/catalogs.js`. A identidade deve ser percebida pela composição, não apenas pela troca de cor.

- `chronicle`: anais, mapas históricos e ritmo de códice.
- `kingdom` e `city`: cartografia, coordenadas e leitura territorial.
- `heraldry`: brasões, simetria e moldura de linhagem.
- `portrait`: enquadramento vertical, rosto preservado e linguagem de dossiê.
- `bestiary`: caderno de campo, taxonomia e sinais de ameaça.
- `war`: contraste de cinza e carmesim contido.
- `artifact`: apresentação de objeto catalogado.
- `legend`: névoa, violeta apagado e incerteza documental.
- `library`: estante, capa e índice editorial.

Os acentos individuais e pontos focais de reinos, casas e criaturas ficam centralizados em `src/data/visuals.js`. Personagens mantêm seus pontos focais no próprio registro, porque card e hero podem exigir cortes diferentes.

## Hierarquia e composição

- Mastheads usam breadcrumb, kicker, título, descrição curta, glifo d'água e imagem histórica opcional.
- Páginas detalhadas funcionam como dossiês: imagem ou placeholder, identificação, resumo, metadados primários, ações, ficha lateral e registros relacionados.
- Cards carregam índice, estado, categoria e chamada de abertura. Retratos, brasões, criaturas, territórios e livros recebem tratamentos de imagem distintos.
- Divisores ornamentais aparecem apenas em mudanças editoriais importantes; não devem separar cada bloco.
- Texturas são discretas e implementadas em CSS para não competir com a arte.

## Interação e movimento

Hover deve comunicar possibilidade de ação com elevação curta, mudança de borda ou deslocamento mínimo. A transição de rota e o movimento lento do hero usam apenas opacidade e transformação. Em `prefers-reduced-motion: reduce`, animação, paralaxe aparente e rolagem suave são removidos.

Busca, tabs, lightbox, menu móvel e atlas precisam continuar operáveis por teclado. Estados ativos combinam cor, borda, posição e semântica ARIA.

## Breakpoints de referência

A camada responsiva cobre 1180, 1024, 900, 768, 650, 480, 375 e 320 px. Eles indicam mudanças reais de composição: navegação vira painel móvel, colunas se empilham, controles do atlas reorganizam e metadados passam a fluxo vertical. Evite criar novos breakpoints sem confirmar uma quebra de conteúdo.

## Sistemas genealógicos

Árvores usam linhas sólidas para descendência, tracejadas para companheirismo, ouro reforçado para caminho calculado e moldura tracejada para lacunas. O estado nunca depende apenas de cor. A visão gráfica fica contida em um viewport arrastável; a visão textual é obrigatória e preserva a mesma ordem de leitura. Controles se empilham em telas estreitas e nenhum canvas define a largura da página.

Badges de verdade documental combinam texto, forma e cor. “Documentado”, “Testemunhado”, “Contestado”, “Lendário”, “Profético” e “Restrito” devem conservar contraste e explicação por `title`.
