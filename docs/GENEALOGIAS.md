# Genealogias públicas

Documento mantido como atalho de compatibilidade. A versão canônica está em [GENEALOGIAS-E-LINHAGENS.md](GENEALOGIAS-E-LINHAGENS.md).

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

A página `/genealogias/:slug` oferece zoom, arraste, centralização, recolhimento de descendentes, filtros por geração e status, caminho entre duas pessoas, painel de detalhe, links de perfil, teclado, legenda e modo textual. Em telas estreitas, o painel é empilhado e a árvore continua contida no viewport.

## Validação

Execute `npm run validate:genealogies`. O script bloqueia IDs duplicados, pessoas inexistentes, autorrelações, ciclos, idade parental inferior a 12 anos, nascimento posterior à morte parental, sucessores fora da árvore e posições sucessórias repetidas.
