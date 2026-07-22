# Validação do cânone

O projeto usa três verificações complementares:

- `npm run validate:content`: IDs, slugs, rotas, relações e integridade geral dos catálogos;
- `npm run validate:genealogies`: pessoas, árvores, datas, relações de sangue/ofício/custódia, dinastias e sucessões;
- `npm run validate:editorial`: profundidade de todos os domínios, repetição, texto de preenchimento, taxonomia de conhecimento e isolamento de conteúdo autoral.

`npm run build` confirma integração do bundle. Toda mudança editorial deve executar as quatro verificações antes da entrega.

## Sigilo

O validador editorial percorre objetos públicos e fontes sob `src`. Ele rejeita chaves reservadas como `secrets` e `authorSecrets`, importações ou referências a `docs/autor/` e a redação pública que revelava o mecanismo reservado das Cinco Relíquias. `knowledgeStatus: secret` descreve apenas o limite público; a resposta não acompanha o registro.

## Profundidade e repetição

Os catálogos antes tratados como cartões agora exigem proveniência, conhecimento público, lacuna, leitura cultural, fontes, disputa, importância narrativa, orientação de imagem e quatro seções. Descrições idênticas, similaridade excessiva e frases longas repetidas em massa falham a validação.

## Revisão humana

Automação não decide cânone. Compare sempre com `LORE-CANONICA.md`, `DECISOES-CRIATIVAS.md` e os registros já consolidados. Se duas fontes públicas divergem, classifique a alegação; não escolha silenciosamente uma versão. Conteúdo reservado é auditado separadamente pelo autor.

