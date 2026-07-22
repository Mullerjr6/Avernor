# Genealogias e linhagens públicas

O site publica 19 árvores e 140 registros pessoais em `src/content/genealogies/`. Esta camada contém apenas conhecimento que estudiosos, governos e personagens podem consultar. Segredos autorais ficam em `docs/autor/` e nunca são importados pelo código da aplicação.

## Árvores

- Kayler e Bellatrix;
- Casa Real de Sylvaris;
- Averen e Veyron;
- dinastias de Winterfeld, Valoria, Ravenhold e Eldemar;
- Nimbus e Rivs;
- clãs orcs Gron e Tor, separados para não tratar povos orcs como uma unidade;
- Sangue da Nona Bigorna e Cadeia de Ofício dos Nove Ecos, em Kar-Dûm;
- Canto do Pilar Norte, conforme memória conhecida pelo povo gigante;
- Casa Cívica das Sete Pontes, sem transformá-la em dinastia soberana;
- linhas institucionais de custódia da Fortaleza do Véu e de Aelysar.

Uma lacuna não autoriza inventar uma pessoa. Os vazios multisseculares de Winterfeld, Valoria, Ravenhold, Eldemar e da Nona Bigorna aparecem como nós documentais `lost` ou `unrecorded`. Esses nós declaram a perda de uma sequência de nomes; não fingem representar um ancestral individual. Relações redigidas explicam a fonte e o limite da inferência.

Cada ficha possui `role`, `summary`, `historicalRole`, `branch`, `period`, `source`, `confidence`, `knowledgeStatus`, `truthStatus`, `titles`, `tags`, `visualDescription` e `portrait` ou `portraitFallback`. Estados aceitos no conteúdo público incluem `documented`, `unknown`, `lost`, `disputed`, `unrecorded`, `rumor` e `people-only`; `author-only` é proibido dentro de `src`.

## Interação e acessibilidade

A página `/genealogias/:slug` organiza gerações de cima para baixo, agrupa uniões e diferencia descendência, adoção, tutela, ofício, custódia e contestação. Oferece zoom por `Ctrl` + roda e botões, arraste, gesto de pinça, enquadramento geral, minimapa clicável, tela cheia, filtros por período, papel, ramo, geração, condição, estado documental e posição sucessória. Focos rápidos localizam fundador, governante, herdeiro ou pessoa escolhida; também há destaque de parentes diretos, ancestrais, descendentes e linha principal, caminho entre duas pessoas, painel documental, links de perfil/sucessão, legenda e modo textual. As setas percorrem parentes de forma hierárquica. Em telas estreitas, controles e painel são empilhados e a árvore permanece dentro do viewport.

Cada uma das 19 árvores possui identidade própria — tempestade, brasa, floresta viva, realeza, disciplina militar, inverno, colheita, corvo, maré, correntes Nimbus e Rivs, brasa Gron, estrada Tor, forja, montanha, ponte ou custódia — sem alterar o significado estrutural das conexões. Estados de vida e conhecimento são visuais e textuais; sangue, adoção, tutela, casamento, ofício, custódia e vínculo contestado têm traços distintos.

O site público não oferece nem carrega uma camada autoral. Não existe dado restrito escondido nos controles da árvore: a interface informa que a visão do autor não faz parte do bundle.

## Validação

Execute `npm run validate:genealogies`. Além das verificações cronológicas e referenciais, o script exige ao menos 18 árvores, 120 pessoas, cinco membros por árvore, conectividade, metadados editoriais completos, retrato ou fallback heráldico, enums válidos e distinção real entre parentesco, ofício e custódia.
