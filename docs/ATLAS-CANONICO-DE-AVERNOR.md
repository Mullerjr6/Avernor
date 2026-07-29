# Atlas Canônico de Avernor

## Autoridade cartográfica

O **Mapa Oficial Canônico de Avernor** representa a geografia pública conhecida em **1204 d.C.** Ele é a única carta com autoridade sobre coordenadas, regiões, assentamentos e rotas exibidos pelo site. Seu identificador estável é `mapa-oficial-avernor-1204`.

A fonte estruturada está em `src/data/canonicalMap.js`. `src/data/atlas.js` existe apenas como ponto de exportação compatível. Componentes não devem manter cópias próprias de pontos, fronteiras ou distâncias.

Ordem de precedência:

1. dados estruturados e correções editoriais de `canonicalMap.js`;
2. registros canônicos públicos das entidades relacionadas;
3. imagem raster oficial preservada como base visual;
4. cartas históricas, contestadas e apócrifas, apenas para comparação.

O raster mestre de preservação é `artwork-masters/assets/images/maps/avernor-map-atlas.png`, fora do bundle público. A página utiliza a derivação otimizada `public/assets/images/maps/avernor-map-atlas-large.webp` e mantém a proporção **3:2**. Rótulos gravados na imagem nunca substituem os overlays estruturados.

## Correções públicas consolidadas

- **Lethariel** é a capital canônica de Sylvaris. “Aeloria”, gravada no raster-base, é um erro cartográfico preservado apenas como testemunho material.
- **Vul’Gar** é uma região cultural de clãs e cidades autônomas, não um reino unificado.
- As **Terras Sombrias** são interditadas por peste, contaminação de minas e instabilidade física. Relatos de mortos-vivos não são autenticados.
- Marcadores de criaturas, Fraturas e ruínas podem indicar setor ou faixa de busca. Eles não revelam covis, entradas variáveis ou posição instantânea.

## Modelo público

O Atlas contém:

- 14 regiões geográficas ou político-geográficas;
- 66 pontos públicos com identidade estável;
- 8 camadas editoriais;
- 15 trechos de viagem documentados;
- 5 cartas comparadas sem autoridade atual;
- relações políticas que explicam os principais fluxos territoriais.

Dos 66 pontos, 27 foram transcritos diretamente dos topônimos legíveis no raster oficial. Esses verbetes usam precisão `regional`, `truthStatus: witnessed` e `sourceStatus: Testemunho cartográfico do raster oficial`. A carta comprova nome, símbolo e posição relativa; fundação, população, governo e condição atual continuam explicitamente não registrados quando nenhuma fonte textual independente os define.

As **Ilhas do Nevoeiro** formam a décima quarta região. Elas não foram atribuídas a reino algum: o mapa confirma o arquipélago, mas não registra soberania, portos reconhecidos ou povo dominante.

As coordenadas são percentuais normalizadas: `(0, 0)` corresponde ao canto noroeste e `(100, 100)` ao canto sudeste. Esse sistema desacopla o conteúdo da resolução da imagem e permite alinhar SVG, marcadores, rotas e minimapa.

Há três graus de precisão:

- `confirmed`: posição conferida na escala continental;
- `regional`: setor público, sem ponto exato;
- `approximate`: aproximação baseada em testemunho, lenda ou pesquisa incompleta.

Todos os pontos entregues pelo front têm `visibility: public`. Rotas de refúgio, enseadas de evacuação, câmaras reservadas, covis e conhecimento exclusivo do autor não pertencem a esse conjunto.

## Camadas

| Identificador | Uso |
|---|---|
| `politica` | Reinos, confederações, regiões culturais e controle público |
| `assentamentos` | Capitais, fortalezas, portos, distritos e ruínas registradas |
| `geografia` | Mares, florestas, montanhas, desertos e regiões naturais |
| `rotas` | Estradas e corredores públicos |
| `conflitos` | Campos e frentes históricas de posição publicável |
| `criaturas` | Habitats ou últimos registros, nunca domínio político |
| `fraturas` | Setores públicos associados ao Véu |
| `reliquias` | Relíquias cuja região já é pública |

## Experiência da página

`src/pages/AtlasPage.jsx` apresenta busca, filtros por camada, região, controle político, tipo de ponto e modo de rota. O mapa permite zoom de 100% a 400%, arrasto, gesto de pinça, `Ctrl` + rolagem, setas, minimapa e tela cheia. `Home` redefine a vista e `F` alterna a tela cheia.

O modo textual contém os mesmos resultados dos filtros e é a alternativa principal para leitores de tela, navegação sem gesto e telas em que a densidade visual do mapa não seja conveniente.

O calculador usa a menor malha pública por distância ou tempo médio. O resultado soma apenas trechos registrados e não presume clima perfeito, passagem diplomática ou segurança de campanha.

## Manutenção

Para incluir conteúdo cartográfico:

1. confirmar que o fato é público em 1204 d.C.;
2. reutilizar uma região e uma entidade política existentes, ou documentar a nova antes do ponto;
3. criar um `id` e `slug` estáveis, sem depender do nome de exibição;
4. atribuir coordenada 0–100 e grau de precisão honesto;
5. preencher clima, terreno, estado, população, controle, perigo, resumo e descrição;
6. adicionar relações e rota apenas quando houver base pública coerente;
7. executar `node scripts/validate-atlas.mjs` e `npm run build`.

IDs do Atlas são contratos para as **Crônicas Vivas**. `src/data/liveChroniclesAtlas.js` é o adapter separado de campanha: ele referencia IDs canônicos, aplica estados transitórios, bloqueios e atrasos, mas recusa alterações de coordenadas, regiões, terminais, geometrias e distâncias. Assim, uma campanha pode ocupar Winterheim ou bloquear a Estrada do Norte sem reescrever o registro-base de 1204 d.C.
