# Genealogias públicas

Documento mantido como atalho de compatibilidade. A versão canônica está em [GENEALOGIAS-E-LINHAGENS.md](GENEALOGIAS-E-LINHAGENS.md).

O site publica 19 árvores e 140 registros pessoais em `src/content/genealogies/`. Esta camada contém apenas conhecimento que estudiosos, governos e personagens podem consultar. Segredos autorais ficam em `docs/autor/` e nunca são importados pelo código da aplicação.

## Árvores

- Kayler e Bellatrix;
- Casa Real de Sylvaris;
- Averen e Veyron;
- dinastias de Winterfeld, Valoria, Ravenhold e Eldemar;
- Nimbus e Rivs;
- clãs orcs Gron e Tor em árvores independentes;
- Sangue da Nona Bigorna e Cadeia de Ofício dos Nove Ecos, em Kar-Dûm;
- Canto do Pilar Norte, conforme a tradição conhecida pelos gigantes;
- Casa Cívica das Sete Pontes;
- linhas institucionais de custódia da Fortaleza do Véu e de Aelysar.

Uma lacuna não autoriza inventar uma pessoa. Ramos perdidos aparecem como nós documentais claramente classificados `lost` ou `unrecorded`, acompanhados de fonte, período e confiança. Eles representam a falta do registro, não um ancestral individual conhecido. Parentesco de sangue, adoção de brasa, tutela, companheirismo, transmissão de ofício e custódia possuem significados distintos.

Cada ficha pública registra papel, resumo, função histórica, ramo, período, fonte, confiança, estado do conhecimento, títulos, etiquetas, descrição visual e retrato ou selo heráldico contextual. `unknown`, `lost`, `disputed`, `unrecorded`, `rumor` e `people-only` nunca são apresentados como fatos documentados.

## Interação e acessibilidade

A página `/genealogias/:slug` oferece zoom por `Ctrl` + roda e botões, arraste, gesto de pinça, enquadramento geral, minimapa, tela cheia, recolhimento de ramos e filtros por período, papel, ramo, geração, condição, estado documental e sucessão. Há focos rápidos em fundador, governante, herdeiro ou qualquer pessoa, caminho de parentesco, painel documental completo, legenda e modo textual. As setas percorrem a mesma geração, ascendentes e descendentes. Em telas estreitas, o painel é empilhado e a árvore permanece contida no viewport.

## Validação

Execute `npm run validate:genealogies`. O script exige ao menos 18 árvores e 120 pessoas, fichas completas, cinco membros por árvore, conectividade, retrato ou selo, taxonomias válidas e relações diferenciadas; também bloqueia IDs duplicados, pessoas inexistentes, autorrelações, ciclos, datas impossíveis, reivindicações sucessórias inconsistentes e conteúdo reservado no índice público.
