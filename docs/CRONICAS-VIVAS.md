# Crônicas Vivas

O Capítulo Zero, **O Grito na Floresta**, começa com Sirius a cavalo rumo a Sylvaris. O grito de Elara leva à forma de corvo, à clareira dos três mercenários e à primeira grande decisão. O encontro não é uma introdução curta: resgate, investigação, acampamento, perseguição, conversas pessoais e consequências na fronteira formam cinco desfechos possíveis.

## Responsabilidades

- A enciclopédia em `src/content/` é a fonte oficial do cânone.
- `cronicas-vivas/scripts/export-canon.mjs` seleciona e normaliza os registros autorizados para cada capítulo.
- O motor em `cronicas-vivas/src/engine/` controla cenas, inventário, relações, conhecimento, escolhas e finais.
- O narrador local ou remoto redige falas, mas não altera estado.
- O frontend apresenta cenários, personagens, diálogo, escolhas, Códice e save.

## Segurança canônica

Consequências são descritas por tipos permitidos e aplicadas somente pelo motor. O validador rejeita tipos desconhecidos, variações excessivas de relação, itens não autorizados, alvos inexistentes e registros ausentes da exportação.

O Worker constrói o contexto a partir do pacote canônico gerado no servidor. O texto do jogador é marcado como entrada não confiável e não pode substituir instruções, identidade, formato ou fatos. A resposta remota contém somente `speaker`, `dialogue` e `emotion` em JSON Schema estrito.

## Persistência

O protótipo usa `localStorage` versionado para permitir jogo imediato e retomada no mesmo aparelho. Uma fase posterior migrará campanhas autenticadas para D1 sem mudar o contrato público do motor.

## Próximas expansões

1. Persistência D1 vinculada a usuário e múltiplos saves.
2. Publicação independente da aplicação e do Worker.
3. Retratos por emoção e trilha sonora licenciada ou original.
4. Testes narrativos com um conjunto maior de perguntas livres.
5. Capítulo Um com missão, conflito e consequências transportadas do Capítulo Zero.
