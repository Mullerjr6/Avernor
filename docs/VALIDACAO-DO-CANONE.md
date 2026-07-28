# Validação do cânone

O projeto usa seis verificações complementares:

- `npm run validate:content`: IDs, slugs, rotas, relações, local atual único, portadores de Relíquias e participação cronológica em guerras;
- `npm run validate:genealogies`: pessoas, árvores, ciclos, datas, expectativa de vida por povo, relações de sangue/ofício/custódia, dinastias e sucessões;
- `npm run validate:atlas`: autoridade cartográfica, coordenadas, pertencimento aos polígonos regionais, existência de personagens/Casas/conflitos/registros relacionados, coerência dos terminais fluviais e marítimos, perfis de viagem e isolamento do estado de campanha;
- `npm run validate:editorial`: profundidade de todos os domínios, repetição, texto de preenchimento, taxonomia de conhecimento e isolamento de conteúdo autoral.
- `npm run validate:privacy`: campos permitidos na busca e ausência de chaves reservadas no bundle público;
- `npm run audit:images`: referências, mestres preservados fora de `public/` e variantes WebP publicadas.

`npm test` executa a cadeia completa; `npm run build` confirma a integração do bundle. Toda mudança editorial deve executar ambos antes da entrega.

## Sigilo

O validador editorial percorre objetos públicos e fontes sob `src`. Ele rejeita chaves reservadas como `secrets` e `authorSecrets`, importações ou referências a `docs/autor/` e redações públicas já identificadas como exposição semântica de fatos reservados — inclusive critérios privados de sucessão e o mecanismo das Cinco Relíquias. `knowledgeStatus: secret` descreve apenas o limite público; a resposta não acompanha o registro. Parafraseamentos novos ainda exigem revisão humana.

## Profundidade e repetição

Os catálogos antes tratados como cartões agora exigem proveniência, conhecimento público, lacuna, leitura cultural, fontes, disputa, importância narrativa, orientação de imagem e quatro seções. Descrições idênticas, similaridade excessiva e frases longas repetidas em massa falham a validação.

## Revisão humana

Automação não decide cânone. Compare sempre com `LORE-CANONICA.md`, `DECISOES-CRIATIVAS.md` e os registros já consolidados. Se duas fontes públicas divergem, classifique a alegação; não escolha silenciosamente uma versão. Conteúdo reservado é auditado separadamente pelo autor.

Limites raciais são tetos editoriais de plausibilidade, não novas leis metafísicas. Um registro pode excedê-los somente com `longevityJustification` pública e coerente; datas desconhecidas devem permanecer não registradas em vez de serem ajustadas silenciosamente.
