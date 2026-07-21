# Guia de conteúdo

## Adicionar um registro

1. Escolha o domínio em `src/content/`.
2. Crie o registro com `record({...})` e um `slug` único, minúsculo e estável.
3. Preencha resumo curto, descrição factual, período/local e relações navegáveis.
4. Quando não houver arte aprovada, deixe `image` vazio: o site selecionará um placeholder coerente.
5. Inclua o registro na exportação da coleção e execute lint/build.

## Profundidade mínima por domínio

- Personagens: biografia em capítulos, linha do tempo, aparência, psicologia, voz, objetivos, limites, relações, estado atual, legado e fontes.
- Territórios e povos: origem, geografia, governo, crenças, cultura material, conflitos, situação atual, rumores identificados e relevância narrativa.
- Guerras e eras: causalidade, marcos datados, participantes, estratégias, perdas, consequências e fontes contraditórias.
- Crenças: mito de origem, criação, morte, magia, símbolos, ritos, calendário, oficiantes, textos, dissidências e interpretações regionais.
- Artefatos e relíquias: criador, material, aparência, poderes, custos, limites, portadores, ativação, destruição, riscos e versões disputadas.

`npm run validate:editorial` aplica esse piso aos registros centrais. O validador não mede qualidade literária, mas impede que uma ficha profunda regrida para um cartão superficial.

## Tom editorial

Escreva como um arquivo histórico acessível: linguagem atmosférica, frases concretas e hierarquia clara. Diferencie fato documentado, versão disputada e lenda. Evite superlativos vazios e poderes sem custo.

## Regras obrigatórias

- Não atribuir magia fora de Kayler, Nimbus ou Rivs.
- Não criar instituições de ensino mágico.
- Não transformar dragões em sociedade política.
- Não romantizar Normus e a Rainha de Sylvaris.
- Não revelar o pacto secreto por completo.
- Não trocar povo, aparência ou vínculos de personagem para acomodar uma imagem.
- Não duplicar fatos contraditórios em módulos diferentes; relações devem apontar para a fonte principal.
- Não usar “desconhecido” como convite para invenção. Registre a lacuna e a fonte que não sobreviveu.
- Nunca importar arquivos de `docs/autor/` em qualquer arquivo sob `src/`.

## Relações

Use `relations` no formato `{ label, to }`, sempre com uma rota interna válida. Prefira ligar causa e consequência, pessoa e território, guerra e era ou artefato e portador. Não adicione links decorativos. `src/data/catalogs.js` gera a volta quando apenas um lado declarar a relação; `npm run validate:content` exige rota válida, reciprocidade final e ausência de registros isolados.

## Datas e status

Mantenha `createdAt` e `updatedAt` em ISO (`AAAA-MM-DD`). Status devem ser descritivos e curtos, como `Viva`, `Encerrada`, `Perdido` ou `Em desenvolvimento`.

## Verdade documental e spoilers

Use `truthStatus`: `documented`, `witnessed`, `disputed`, `legendary`, `prophetic` ou `redacted`. O status informa a qualidade da fonte; não mede importância. `redacted` pode indicar que o Arquivo limita a versão pública, mas jamais deve carregar o segredo no próprio JavaScript.

Genealogias públicas ficam em `src/content/genealogies/`; parentescos verdadeiros ainda não revelados ficam somente em `docs/autor/GENEALOGIAS-SECRETAS.md`. Depois de qualquer alteração, execute `npm run validate:genealogies`.
