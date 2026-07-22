# Segredos geográficos — arquivo reservado

> Documento de autor. Não importar em código público, Atlas, busca, SEO ou dados de Crônicas Vivas antes da revelação narrativa.

O mapa normativo público está documentado em `docs/ATLAS-CANONICO-DE-AVERNOR.md` e implementado em `src/data/canonicalMap.js`. Este arquivo existe para futuras localizações, rotas ou estados cuja própria existência precise permanecer reservada.

## Estado atual

Não há coordenadas geográficas secretas definidas neste passe. Caminhos secretos, esconderijos e alterações de campanha permanecem **não registrados** até decisão explícita do autor. Essa ausência não deve ser preenchida com topônimos inventados.

## Modelo para futura entrada

- ID interno:
- classificação: secreta | conhecida por personagem | conhecida por facção | conhecida por povo;
- motivo da restrição:
- ponto ou região pública de referência:
- fato canônico reservado:
- condição de revelação:
- registros públicos a atualizar após revelação:
- impacto em rota, distância ou campanha:

Coordenadas canônicas nunca são alteradas por estado de campanha. Quando uma informação for revelada, ela deve migrar para a fonte pública única e passar por `npm run validate:atlas`.

