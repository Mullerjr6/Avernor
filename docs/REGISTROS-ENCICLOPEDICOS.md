# Registros enciclopédicos

O Arquivo público de Avernor é formado pelos catálogos exportados por `src/content/index.js`. Um registro não é apenas um cartão: deve explicar o que é conhecido, por qual fonte, o que foi perdido, quem contesta a versão e por que a entidade importa para o mundo.

Na revisão de 29 de julho de 2026, os 27 catálogos apresentam 211 registros navegáveis. A cobertura editorial inclui 39 locais, 7 lendas e 9 documentos de biblioteca; relações recíprocas e variantes responsivas de imagem são obrigatórias para todas as entradas públicas.

## Estrutura mínima

Todo registro possui ID e slug estáveis, nome, resumo, descrição, categoria, estado, relações e classificação da verdade. Os domínios documentais — criaturas, livros, lendas, cosmologia, portais, mundos, Retornados, necromancia, fins dos tempos, Nar-Khalion, profecias, relíquias, Celestiais, Lanças, dinastias e sucessões — também exigem:

- `archivalOverview` e `provenance`;
- `publicKnowledge` e `knowledgeGaps`;
- `culturalReadings` e `disputedClaims`;
- `historicalSources`;
- `narrativeImportance`;
- `imageBrief`;
- `knowledgeStatus` e `confidence`;
- quatro seções editoriais distintas.

Use `knowledgeStatus` para acesso e lacuna: `documented`, `unknown`, `lost`, `disputed`, `secret`, `unrecorded`, `rumor` ou `people-only`. Use `truthStatus` para qualidade da evidência: `documented`, `witnessed`, `disputed`, `legendary`, `prophetic` ou `redacted`.

## Inclusão por domínio

- Personagem: crie o perfil em `src/content/characters/`, vincule a pessoa genealógica e preencha o padrão de perfis.
- Ancestral: adicione a pessoa e a relação em `src/content/genealogies/`; uma lacuna perdida deve permanecer um nó documental, não receber nome inventado.
- Casa: registre cultura, governo interno, sucessão, membros, reputação, conflitos e genealogia associada.
- Cidade: registre fundação, território, clima, governo, bairros, economia, cultura, conflitos, lugares relevantes e relações.
- Guerra: siga `PADRAO-DE-GUERRAS-E-ERAS.md` e transforme batalhas centrais em marcos verificáveis.

Depois de qualquer inclusão execute `npm run validate:content`, `npm run validate:editorial` e, se houver parentesco, `npm run validate:genealogies`.

## Conteúdo reservado

Arquivos sob `docs/autor/` nunca são importados por `src`, copiados para resumos, busca, SEO ou campos aparentemente ocultos. O registro público pode afirmar que algo é secreto ou desconhecido, mas não carregar a resposta. A existência de um seletor de interface não autoriza enviar conteúdo reservado ao navegador.
