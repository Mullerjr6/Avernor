# Personagens Vivos

Personagens Vivos é o chat textual interpretativo da enciclopédia. Em todas as conversas, o jogador interpreta Sirius Kayler e a IA controla exclusivamente o personagem selecionado. O MVP habilita Elara e Rainha Aelwen como interlocutoras; Sirius permanece no sistema como identidade canônica fixa do jogador e não pode conversar consigo mesmo.

## Limites do MVP

- O cânone vem exclusivamente dos registros públicos exportados de `src/content/`.
- `docs/autor/` não é importado, indexado nem enviado ao modelo.
- Perfis de IA complementam o cânone com política de conhecimento e comportamento; não repetem a ficha editorial.
- Memórias, histórico e relacionamento representam cada vínculo personagem ↔ Sirius, são salvos isoladamente por personagem em `localStorage` e nunca alteram o cânone.
- Não há embeddings, banco vetorial, imagem, voz ou vídeo.
- Sem endpoint configurado, um respondente local restrito ao cânone mantém o fluxo funcional. Em produção, o Worker usa a API da OpenAI.

## Arquitetura

O navegador usa `CharacterEngine` para registrar falas e ações declaradas pelo jogador para Sirius, extrair memórias e aplicar alterações relacionais limitadas. A UI depende do adapter `chatRepository`, permitindo trocar `localStorage` por persistência remota sem reescrever os componentes.

O Worker atende `POST /api/character-chat`. A identidade do jogador é imposta no servidor como Sirius Kayler; nenhum campo enviado pelo cliente pode substituí-la. O servidor ignora tentativas do cliente de fornecer cânone, monta um recorte de Sirius limitado pela política de conhecimento do interlocutor, seleciona até seis outros registros permitidos, limita tamanhos e separa contexto canônico de conteúdo não confiável. A resposta estruturada permite somente fala e ação do personagem selecionado, e uma proteção adicional rejeita tentativas de controlar Sirius. A sugestão relacional do modelo é limitada novamente pelo motor antes de voltar ao navegador. A chave `OPENAI_API_KEY` existe somente como secret do Worker.

Os dois modos preservam papéis diferentes:

- **Crônicas Vivas:** Sirius participa de uma narrativa estruturada, com cenas, escolhas e consequências do motor do jogo.
- **Personagens Vivos:** Sirius conversa livremente com um personagem do universo; a IA nunca escreve pensamentos, falas, sentimentos, decisões ou ações por ele.

O endpoint antigo `POST /api/narrative` permanece independente.

## Configuração

1. Configure `OPENAI_API_KEY` como secret do Worker.
2. Ajuste `ALLOWED_ORIGINS` para os domínios reais da enciclopédia e de Crônicas Vivas.
3. Publique o Worker de `cronicas-vivas/wrangler.jsonc`.
4. Copie `.env.example` para `.env.local` e defina `VITE_CHARACTER_CHAT_API_URL` com a URL completa terminada em `/api/character-chat`.
5. Gere o build da enciclopédia após definir a variável de ambiente.

Nunca crie uma variável `VITE_OPENAI_API_KEY`: variáveis Vite são expostas no navegador.

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
