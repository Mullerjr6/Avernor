# Genealogias e linhagens públicas

O site publica 14 árvores e 68 pessoas em `src/content/genealogies/`. Esta camada contém apenas conhecimento que estudiosos, governos e personagens podem consultar. Segredos autorais ficam em `docs/autor/` e nunca são importados pelo código da aplicação.

## Árvores

- Kayler e Bellatrix;
- Casa Real de Sylvaris;
- Averen e Veyron;
- dinastias de Winterfeld, Valoria, Ravenhold e Eldemar;
- Nimbus e Rivs;
- clãs orcs Gron e Tor;
- Sangue da Nona Bigorna, em Kar-Dûm;
- Canto do Pilar Norte, dos gigantes.

Uma lacuna não autoriza inventar uma pessoa. Ramos perdidos aparecem como desconhecidos ou não confirmados. Parentesco de ofício, adoção, tutela, companheirismo e descendência possuem significados distintos.

## Interação e acessibilidade

A página `/genealogias/:slug` organiza gerações de cima para baixo, liga pais e filhos verticalmente e parceiros horizontalmente. Oferece zoom, arraste, centralização, filtros por geração, estado de vida e posição sucessória, busca de pessoa, destaque de ancestrais e descendentes, caminho entre duas pessoas, painel de detalhe, links de perfil/sucessão, legenda e modo textual. Em telas estreitas, controles e painel são empilhados e a árvore permanece dentro do viewport.

Cada uma das 14 árvores possui identidade própria — tempestade, brasa, floresta viva, realeza, disciplina militar, inverno, colheita, corvo, maré, corrente Nimbus, água Rivs, clã, forja ou montanha — sem alterar o significado estrutural das conexões. Estados `vivo`, `morto`, `desaparecido` e `desconhecido` são visuais e textuais; adoção, tutela, casamento e vínculo contestado têm traços distintos.

O seletor de conteúdo secreto permanece desabilitado no site público. Não existe dado restrito escondido no JavaScript: a interface apenas informa que a visão do autor não faz parte do bundle.

## Validação

Execute `npm run validate:genealogies`. O script bloqueia IDs duplicados, relações inválidas ou recíprocas duplicadas, autorrelações, ciclos, mais de dois pais biológicos, raízes sem origem marcada, datas e idades parentais impossíveis, estado de vida incompatível, eventos fora da vida conhecida, guerras fora de suas eras e posições sucessórias descontínuas.
