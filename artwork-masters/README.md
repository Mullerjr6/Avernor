# Mestres visuais de Avernor

Esta pasta preserva os PNGs sem perda usados para produzir a biblioteca visual. Ela fica deliberadamente fora de `public/`: o Vite copia todo arquivo público para a distribuição, e os 90 mestres acrescentariam aproximadamente 503 MB a cada build sem serem consumidos pelo navegador.

- Mestres: `artwork-masters/assets/images/<domínio>/<slug>.png`
- Derivados publicados: `public/assets/images/<domínio>/<slug>-card.webp` e `-page.webp`
- Mapas publicados: variantes `-preview.webp` e `-large.webp`
- Regeneração: `npm run optimize:images`
- Auditoria: `npm run audit:images`

Não edite um WebP como fonte. Atualize ou acrescente o mestre, execute a otimização e confira visualmente os derivados. O mapa canônico mantém seu mestre nesta pasta, mas somente a versão WebP otimizada é servida pelo Atlas.
