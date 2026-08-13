# Personagens Vivos

Personagens Vivos é o chat textual interpretativo da enciclopédia. Em todas as conversas, o jogador interpreta Sirius Kayler e a IA controla exclusivamente o personagem selecionado. O MVP habilita Elara e Rainha Aelwen como interlocutoras; Sirius permanece no sistema como identidade canônica fixa do jogador e não pode conversar consigo mesmo.

## Limites do MVP

- O cânone vem exclusivamente dos registros públicos exportados de `src/content/`.
- `docs/autor/` não é importado, indexado nem enviado ao modelo.
- Perfis de IA complementam o cânone com política de conhecimento e comportamento; não repetem a ficha editorial.
- Memórias, histórico e relacionamento representam cada vínculo personagem ↔ Sirius, são salvos isoladamente por personagem em `localStorage` e nunca alteram o cânone.
- Não há embeddings, banco vetorial, imagem, voz ou vídeo.
- Sem endpoint configurado, um respondente local restrito ao cânone mantém o fluxo funcional. Em produção, o Worker usa Cloudflare Workers AI com o modelo Qwen3 30B.

## Arquitetura

O navegador usa `CharacterEngine` para registrar falas e ações declaradas pelo jogador para Sirius, extrair memórias e aplicar alterações relacionais limitadas. A UI depende do adapter `chatRepository`, permitindo trocar `localStorage` por persistência remota sem reescrever os componentes.

O Worker atende `POST /api/character-chat` e chama `env.AI.run()` pelo binding nativo do Cloudflare Workers AI. O modelo padrão é `@cf/qwen/qwen3-30b-a3b-fp8`, configurável por `AI_MODEL`; nenhuma `OPENAI_API_KEY`, chave de provedor ou chamada direta do navegador é necessária.

A identidade do jogador é imposta no servidor como Sirius Kayler; campos como `playerId`, `playerName`, `identity` ou `role` enviados pelo cliente não são usados para defini-la. O servidor ignora tentativas do cliente de fornecer cânone, monta um recorte de Sirius limitado pela política de conhecimento do interlocutor, seleciona até seis outros registros permitidos, limita tamanhos e separa contexto canônico de conteúdo não confiável. A resposta usa JSON Schema, passa por parsing defensivo e é reconstruída somente com campos permitidos. Uma proteção adicional rejeita fala ou narração que controle Sirius.

O relacionamento continua multidimensional (`affinity`, `trust`, `respect`, `romance` e `tension`). O modelo apenas sugere deltas; o servidor limita cada eixo por turno, respeita a proibição de romance de cada perfil e recalcula `relationshipStage`. Memórias usam importância, recência, tópicos, resumo e mensagens recentes, sempre isoladas por personagem.

Os dois modos preservam papéis diferentes:

- **Crônicas Vivas:** Sirius participa de uma narrativa estruturada, com cenas, escolhas e consequências do motor do jogo.
- **Personagens Vivos:** Sirius conversa livremente com um personagem do universo; a IA nunca escreve pensamentos, falas, sentimentos, decisões ou ações por ele.

O endpoint `POST /api/narrative` permanece independente na sua lógica, mas usa o mesmo binding Workers AI para que o Worker inteiro não dependa mais da OpenAI.

## Configuração

1. O arquivo `cronicas-vivas/wrangler.jsonc` declara `ai.binding = "AI"` e `AI_MODEL = "@cf/qwen/qwen3-30b-a3b-fp8"`.
2. Ajuste `ALLOWED_ORIGINS` para os domínios reais da enciclopédia e de Crônicas Vivas.
3. Para desenvolvimento, execute `npx wrangler@latest dev --config cronicas-vivas/wrangler.jsonc --port 8789` a partir da raiz. O binding usa a conta autenticada no Wrangler e pode consumir a cota do Workers AI.
4. Copie `.env.example` para `.env.local` e defina `VITE_CHARACTER_CHAT_API_URL=http://127.0.0.1:8789/api/character-chat`.
5. Gere o build da enciclopédia após definir a variável de ambiente.

Nunca coloque chave de provedor em variáveis `VITE_*`: variáveis Vite são expostas no navegador. O binding `env.AI` existe somente no Worker.

Teste direto do endpoint:

```bash
curl -X POST http://127.0.0.1:8789/api/character-chat \
  -H "Content-Type: application/json" \
  -d '{"characterId":"elara","userId":"teste-local","conversationId":"teste-elara-sirius","message":"Diga claramente quem está diante de você.","state":{"relationship":{"affinity":0,"trust":0,"respect":0,"romance":0,"tension":0},"summary":"","memories":[],"recentMessages":[]}}'
```

O navegador chama somente o Worker. Timeout, indisponibilidade do binding, erro de rede ou saída inválida acionam o fallback canônico local. Respostas remotas usam `source: "workers-ai"`; recuperações locais usam `source: "local-fallback"`.

## Privacidade e fronteira canônica

`docs/autor/` é proibido em prompts, memórias, contexto, frontend e bundle. O Worker importa apenas a exportação pública de `src/content/`, e `npm run validate:privacy` rejeita referências ou chaves reservadas em `src/`. Logs contêm apenas identificadores operacionais, modelo, duração e códigos de erro sanitizados; não registram prompts, mensagens ou segredos.

## Persistência futura

Cloudflare D1 é a evolução recomendada porque o backend já executa em Cloudflare Worker, reduzindo serviços, credenciais e latência operacional. Ele pode armazenar usuários, conversas, memórias e cotas junto ao endpoint atual. A desvantagem é maior acoplamento ao ecossistema Cloudflare e a necessidade de desenhar migrações e autenticação.

Supabase oferece autenticação pronta, painel e PostgreSQL mais flexível, mas adiciona outro provedor, políticas RLS e tráfego entre Worker e Supabase. É uma alternativa melhor apenas se o projeto escolher deliberadamente o Supabase Auth ou precisar de recursos relacionais que superem a simplicidade do D1.

O MVP não escolhe banco antes dessa decisão. Para produção aberta ao público ainda são necessários autenticação, rate limiting por usuário/IP, cotas, retenção de dados e uma política de privacidade. CORS limita origens de navegador, mas não autentica usuários.

## Validação

Execute:

```bash
npm run validate:character-chat
npm run vivas:validate
npm run vivas:build
npm run validate
npm run lint
npm run build
```

O validador específico cobre as duas interlocutoras, Sirius como identidade fixa não conversável, recusa de troca de identidade, ausência de controle sobre Sirius, material reservado, falsos fatos canônicos, proteção do pacto, isolamento da memória e limites relacionais.
