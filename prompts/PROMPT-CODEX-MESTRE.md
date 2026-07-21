# Prompt mestre para o Codex — Crônicas de Avernor

Você está trabalhando diretamente no projeto aberto no VS Code chamado **Crônicas de Avernor**. Analise todos os arquivos antes de editar. Implemente as mudanças diretamente no projeto, sem apenas explicar ou devolver trechos soltos.

## Objetivo
Transformar o projeto em uma enciclopédia digital de fantasia original, cinematográfica, responsiva, acessível e expansível, com páginas de história, eras, reinos, casas, personagens, bestiário, atlas e biblioteca.

## Regras obrigatórias
1. Preserve toda a lore existente. Não renomeie personagens, reinos, casas, eventos ou relações sem autorização explícita.
2. Normus Kayler é um **bruxo**, nunca um homem comum. Ele é o maior bruxo da história, pai de Sirius e Cavaleiro de Honra de Sylvaris.
3. Apenas três famílias de bruxos ancestrais existiram: Kayler, Nimbus e Rivs. Todos possuem cabelos brancos e olhos violetas.
4. Sirius Kayler é filho de Normus Kayler e Namídia Bellatrix e é o último bruxo conhecido.
5. Use português brasileiro em toda a interface e conteúdo.
6. Não copie nomes, textos, brasões ou elementos protegidos de outras franquias. Avernor deve permanecer original.
7. Não remova funcionalidades existentes. Refatore somente quando houver ganho real e valide após a mudança.
8. Nunca use caminhos absolutos do computador. Imagens devem usar `/assets/...`.
9. Reutilize componentes. Evite duplicação de JSX e CSS.
10. O site deve funcionar em 320 px, celular, tablet e desktop.
11. Garanta navegação por teclado, foco visível, textos alternativos e contraste adequado.
12. Não faça commit nem push. Ao finalizar, informe os arquivos alterados e os testes executados.

## Estrutura de mídia
- Mapas: `public/assets/images/maps`
- Personagens: `public/assets/images/characters`
- Locais: `public/assets/images/locations`
- Criaturas: `public/assets/images/creatures`
- UI, texturas e brasões: `public/assets/images/ui`
- Música: `public/assets/audio/music`
- Efeitos: `public/assets/audio/sfx`
- Ícones: `public/assets/icons`

Consulte `src/data/assets.js` para os caminhos centralizados e `docs/ESTRUTURA-DE-ARQUIVOS.md` antes de criar novos arquivos.

## Direção visual
- Fantasia medieval sombria e elegante.
- Aparência de manuscrito/arquivo real de Avernor, sem prejudicar a leitura.
- Fundo carvão, painéis escuros, ouro envelhecido, detalhes em marfim.
- Tipografia de títulos solene e texto confortável.
- Animações discretas, suaves e respeitando `prefers-reduced-motion`.
- Evite excesso de efeitos, brilho, partículas ou animações pesadas.

## Arquitetura desejada
Evolua gradualmente para:
- React + Vite.
- React Router para rotas reais e URLs compartilháveis.
- Dados separados da apresentação.
- Páginas de detalhe por `slug`.
- Busca global.
- Filtros por categoria, era, raça, região e status.
- Componentes de `Hero`, `Card`, `Gallery`, `Timeline`, `Breadcrumbs`, `Search`, `Modal` e `EmptyState`.
- Conteúdo longo em Markdown ou estrutura equivalente, sem banco de dados nesta fase.

## Primeira missão ao receber este prompt
1. Execute uma auditoria do projeto.
2. Corrija erros de build, imports, acessibilidade e responsividade.
3. Integre corretamente as imagens já disponíveis.
4. Separe `App.jsx` em páginas e componentes sem quebrar o visual.
5. Adicione React Router e crie rotas:
   - `/`
   - `/historia`
   - `/historia/:slug`
   - `/reinos`
   - `/reinos/:slug`
   - `/casas`
   - `/casas/:slug`
   - `/personagens`
   - `/personagens/:slug`
   - `/bestiario`
   - `/bestiario/:slug`
   - `/atlas`
6. Crie páginas de detalhes utilizando os dados existentes.
7. Faça o atlas usar a imagem oficial, pontos clicáveis e painel de região.
8. Adicione uma página 404 coerente com o tema.
9. Execute `npm install`, `npm run build` e, se disponível, lint/testes.
10. Corrija todos os erros encontrados antes de encerrar.

## Critérios de aceite
- Build concluído sem erros.
- Nenhum link ou botão sem função.
- Nenhuma imagem quebrada.
- Nenhum overflow horizontal em 320 px.
- Rotas acessíveis por URL direta.
- Conteúdo existente preservado.
- Código organizado, legível e sem duplicações evidentes.

Comece agora. Não peça confirmação para decisões técnicas reversíveis. Faça suposições conservadoras, preserve o conteúdo e documente tudo que foi alterado.
