# Crônicas de Avernor

Enciclopédia web oficial do universo de fantasia criado por Júnior Maia Müller. O projeto organiza a história, os territórios, as personagens, o bestiário, os artefatos e a biblioteca de Avernor em uma experiência editorial cinematográfica, responsiva e acessível.

## Executar localmente

Requisitos: Node.js 24 LTS e npm.

```bash
npm install
npm run dev
```

O Vite exibirá o endereço local. Para validar uma versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

Para recriar as variantes WebP responsivas sem alterar os PNGs originais:

```bash
npm run optimize:images
```

## Rotas principais

Além das rotas editoriais originais, a aplicação inclui `/genealogias`, `/dinastias`, `/sucessoes`, `/povos`, `/mitologia`, `/religioes`, `/cosmologia`, `/portais`, `/outros-mundos`, `/retornados`, `/profecias`, `/fim-dos-tempos`, `/necromancia`, `/reliquias`, `/nar-khalion`, `/celestiais`, `/lancas` e `/faccoes`. Coleções possuem detalhes em `/:slug`; genealogias também se relacionam a `/personagens/:slug/genealogia` e `/casas/:slug/linhagem`, enquanto reinos com sucessão documentada oferecem `/reinos/:slug/sucessao`.

Os acervos possuem busca, filtros persistidos na URL, cards e páginas detalhadas em `/:slug`. Religiões, mitologias e profecias possuem comparação lado a lado. A busca global cruza todos os catálogos. O atlas oferece zoom, arraste, filtros e pontos interativos.

## Estrutura editorial

- `src/content/`: fonte canônica estruturada por domínio.
- `src/data/`: índices, configuração de catálogos, atlas e galeria.
- `src/pages/`: páginas de rota.
- `src/components/`: componentes reutilizáveis e acessíveis.
- `public/assets/images/`: originais, variantes otimizadas e placeholders.
- `docs/`: cânone, arquitetura, decisões, guias e roadmap.

Antes de adicionar lore, leia `docs/LORE-CANONICA.md` e `docs/GUIA-DE-CONTEUDO.md`. Novos nomes ou fatos interpretativos devem ser registrados em `docs/DECISOES-CRIATIVAS.md`.

Genealogias públicas são descritas em `docs/GENEALOGIAS-E-LINHAGENS.md` e validadas por `npm run validate:genealogies`. Conteúdo reservado ao autor fica em `docs/autor/` e nunca deve ser importado pela aplicação.

Os dossiês enciclopédicos profundos ficam em arquivos `dossiers.js` por domínio e são combinados aos registros-base sem duplicar slugs. Personagens, lugares, povos, casas, facções, guerras, eras, crenças, artefatos e relíquias possuem contratos editoriais próprios. Relações internas são completadas de forma bidirecional no índice canônico.

## Qualidade

O projeto usa ESLint, lazy loading por página e da busca global, imagens WebP responsivas, fallbacks visuais e metadados dinâmicos. Execute `npm run validate` para verificar genealogias, rotas, reciprocidade das relações, profundidade editorial e biblioteca visual; depois rode `npm run lint` e `npm run build`. Não há serviço externo obrigatório em tempo de execução.
