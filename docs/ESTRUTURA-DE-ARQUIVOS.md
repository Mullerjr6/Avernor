# Estrutura de arquivos

```text
avernor-site/
├── docs/                   documentação editorial e técnica
│   ├── autor/              genealogias e segredos que nunca entram no site público
│   └── image-prompts/      um briefing por imagem prioritária
├── public/assets/images/   imagens públicas, variantes e placeholders
├── scripts/                automações locais, como otimização de imagens
├── src/
│   ├── components/         UI reutilizável
│   ├── content/            registros canônicos, cosmologia, genealogias e sucessões
│   ├── data/               configuração de catálogos, busca, atlas e galeria
│   ├── pages/              páginas carregadas por rota
│   ├── styles/             camadas visuais adicionais por sistema
│   ├── utils/              funções de texto
│   ├── App.jsx             roteamento e carregamento assíncrono
│   ├── main.jsx            ponto de entrada e limite de erro
│   └── styles.css          sistema visual global e responsivo
├── index.html              metadados base
├── eslint.config.js        regras estáticas
└── package.json            scripts e dependências
```

Cada diretório de `src/content/` exporta uma coleção normalizada. Os domínios aprofundados mantêm o registro-base no `index.js` e os campos longos em `dossiers.js`. `src/content/schema.js` aplica os campos comuns. `src/data/catalogs.js` converte as coleções em páginas navegáveis, completa relações recíprocas e monta o índice público, sem duplicar slugs.

`src/styles/expansion.css` contém os sistemas de dossiê, verdade documental, árvore genealógica, dinastias e sucessões. `scripts/validate-genealogies.mjs`, `scripts/validate-content.mjs` e `scripts/validate-editorial-depth.mjs` são as barreiras de integridade relacional, navegacional e editorial. `docs/autor/REGISTROS-RESTRITOS.json` estrutura bastidores apenas para uso local do autor e não entra na aplicação.
