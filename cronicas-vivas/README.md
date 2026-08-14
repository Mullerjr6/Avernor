# Crônicas Vivas

Conto interativo contínuo de Avernor. O jogador é sempre **Sirius Kayler** e escreve exclusivamente as palavras dele. O Narrador conduz ambiente, ritmo e transições; Elara, Aelwen e os futuros personagens entram e saem conforme a cena estruturada.

## História atual

O Capítulo Zero começa com Sirius a cavalo, a caminho de Sylvaris. Depois de ouvir um grito na Floresta Antiga, ele assume a forma de corvo, encontra uma jovem elfa presa por três mercenários orcs e pousa diante dos captores. O resgate não acontece numa passagem automática: a primeira intervenção livre do jogador abre uma rota de negociação ou de combate, com cenas, riscos, fatos e memórias diferentes. Elara participa da própria libertação. A filiação dos mercenários não é confirmada e o mandante permanece desconhecido.

A primeira entrada livre acontece antes do resgate, no instante em que a clareira espera a decisão de Sirius. Depois das consequências da abordagem escolhida, a jornada atravessa os vestígios da clareira, a estrada florestal, o Caminho das Árvores Ausentes, Lethariel e uma audiência com Aelwen. Há cenas com múltiplos NPCs, uma conversa sem Elara e a abertura do Capítulo Um.

## Fala e ação na entrada livre

Texto fora de aspas é interpretado como fala de Sirius. Um trecho entre aspas retas, curvas ou angulares é uma ação declarada pelo jogador e passa a integrar a continuidade salva da crônica:

```text
Foi escolha de vocês. "Sirius ergue a mão e lança um raio contra o captor."
```

Nesse exemplo, `Foi escolha de vocês.` é fala e o trecho entre aspas é ação. O gesto controlado por Sirius torna-se canônico na jornada; acerto, dano, morte, persuasão e demais efeitos sobre terceiros continuam sendo resolvidos pelo narrador conforme a cena e o cânone.

Uma ação ofensiva declarada durante uma negociação rompe os termos imediatamente. A fala que antecede as aspas ainda é registrada como a última advertência de Sirius, mas os adversários reagem ao ataque e o Diretor conduz a crônica para a cena de combate, sem repetir propostas como se a ação não tivesse acontecido.

Comandos ofensivos inequívocos também são reconhecidos sem aspas — por exemplo, `Sirius joga um feitiço nos orcs`. Nesse caso, a entrada inteira é registrada como ação, não como uma fala em terceira pessoa. Expressões não ofensivas semelhantes, como `Sirius lança um olhar para Elara`, permanecem sem efeito de combate.

## Arquitetura narrativa

- `src/engine/chapterZero.js`: fonte estruturada de capítulos, cenas, locais, participantes, objetivos, batidas, sinais permitidos, restrições e transições.
- `src/engine/storyDirector.js`: única autoridade para aplicar progresso, fatos, relações, memórias, entrada e saída de personagens e persistência.
- `worker/narrative.js`: narrador remoto multi-NPC. Recebe contexto confiável montado no servidor e devolve narração, falas de NPCs e sugestões limitadas.
- `src/engine/localNarrator.js`: continuidade canônica quando o Worker estiver indisponível.
- `src/ai/`: perfis, políticas de conhecimento, memória, relações e proteções compartilhadas com Personagens Vivos.

O modelo nunca controla o estado diretamente. Participantes, sinais narrativos, efeitos, memórias e mudanças relacionais são filtrados e limitados antes de chegar ao Diretor. A entrada do jogador e o histórico são tratados como conteúdo não confiável e não alteram a identidade fixa de Sirius nem liberam material reservado ao autor.

## Executar sem IA remota

```bash
npm run vivas:dev
```

O Diretor local mantém a história funcional e salva automaticamente capítulo, cena, batidas, fatos, relações, memórias, elenco presente, histórico, resumo, Códice e progresso no `localStorage`.

## Executar com Cloudflare Workers AI

1. Autentique o Wrangler na conta Cloudflare.
2. Inicie o Worker a partir da raiz:

```bash
npx wrangler@latest dev --config cronicas-vivas/wrangler.jsonc --port 8789
```

3. Copie `cronicas-vivas/.env.example` para `cronicas-vivas/.env`.
4. Em outro terminal, execute `npm run vivas:dev`.

O Worker usa exclusivamente o binding `env.AI` e o modelo `@cf/qwen/qwen3-30b-a3b-fp8`. Não é necessária chave de provedor pago. Se a inferência falhar, a interface usa automaticamente o Diretor local.

## Qualidade

```bash
npm run vivas:validate
npm run vivas:build
npx wrangler@latest deploy --dry-run --config cronicas-vivas/wrangler.jsonc --outdir cronicas-vivas/output/worker-new-dry-run
```

As validações cobrem a abertura canônica, ausência de falas prontas para Sirius, cenas multi-NPC, cena sem Elara, progressão por vários turnos, memória entre cenas, consulta de informação, defesa contra troca de identidade e acesso a conteúdo do autor, persistência e integridade do grafo narrativo.
