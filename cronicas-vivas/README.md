# Crônicas Vivas

Primeiro capítulo jogável da visual novel interativa de Avernor. A aplicação é separada da enciclopédia, mas seu pacote canônico é gerado diretamente de `src/content/`.

## Capítulo Zero — O Grito na Floresta

Sirius parte a cavalo para Sylvaris, ouve o grito de Elara e assume a forma de corvo para encontrá-la presa por três mercenários orcs. O capítulo possui 55 cenas, conversas livres persistentes e cinco desfechos. Cada percurso atravessa entre 25 e 32 cenas, além das conversas opcionais. Furtividade, negociação, misericórdia, violência, confiança e sigilo alteram o caminho até a fronteira élfica e a forma como Sirius será recebido.

## Executar sem IA remota

```bash
npm run vivas:dev
```

O Capítulo Zero funciona integralmente com o narrador canônico local e salva o progresso no navegador. Depois de encontrar Elara, a caixa **Conversa livre** aceita perguntas e falas escritas pelo jogador. O interpretador local reconhece assuntos canônicos, tom emocional, perguntas de continuação e referências à conversa anterior; as respostas incluem narração, reação corporal, pensamentos de Elara e um fecho que devolve a conversa ao enredo. Falas relevantes também permanecem na memória do Códice.

## Ativar respostas livres com Cloudflare Workers AI

1. Autentique o Wrangler na conta Cloudflare que executará o binding Workers AI.
2. Execute o Worker a partir da raiz; nenhuma chave de modelo é necessária:

```bash
npx wrangler@latest dev --config cronicas-vivas/wrangler.jsonc --port 8789
```

3. Copie `cronicas-vivas/.env.example` para `cronicas-vivas/.env`.
4. Execute `npm run vivas:dev`.

O Worker usa o binding `env.AI` e, por padrão, o modelo `@cf/qwen/qwen3-30b-a3b-fp8`. Se o endpoint ou o Workers AI estiver indisponível, a interface retorna automaticamente ao narrador local. Com o Worker ativo, a IA recebe a cena atual, a consequência da última escolha, o histórico recente e apenas os registros canônicos liberados. Ela pode compreender formulações mais abertas, mas não tem autoridade para modificar inventário, relações ou cânone.

## Qualidade

```bash
npm run vivas:validate
npm run vivas:build
```

O validador recusa cenas inalcançáveis, escolhas quebradas, consequências narrativas rasas, descobertas sem registro canônico, efeitos de estado fora da lista permitida e regressões na interpretação da conversa livre.
