# Portfólio · Iury Sousa

Portfólio pessoal de **Iury Sousa**, desenvolvedor de software full-stack. O site é uma
"programação de TV": cada seção é um canal, o televisor do topo tem um seletor que navega
entre eles e existe um canal escondido (digite **1** e **3**, ou gire o seletor até o 13).

## Stack

- [Vue 3](https://vuejs.org/) com `<script setup>` + TypeScript
- [Vite](https://vite.dev/) para desenvolvimento e build
- ESLint (flat config) + Prettier
- Sem dependências de runtime além do Vue; efeitos em Canvas 2D e CSS puro

## Estrutura

```
src/
├── App.vue                  # composição da página
├── main.ts                  # bootstrap + diretiva v-tune
├── assets/styles/           # tokens, base e animações globais
├── components/
│   ├── layout/              # cabeçalho e rodapé
│   ├── sections/            # uma seção (canal) por componente
│   ├── tv/                  # televisor CRT e seletor de canais
│   ├── cases/               # reportagens (casos) e ilustrações
│   ├── game/                # canal 13: minijogo de sintonia PID
│   └── ui/                  # botões, chips, tarja de programa
├── composables/             # relógio, seção ativa, linha do tempo, atalhos
├── data/                    # todo o conteúdo do portfólio (textos, cargos, stack)
├── directives/              # v-tune (título entra em sintonia)
├── lib/                     # lógica sem Vue: renderizador da TV, simulação PID, chiado
├── stores/                  # estado global da "transmissão"
└── types/                   # tipos do conteúdo
```

Para atualizar textos, experiências ou projetos, edite apenas os arquivos em `src/data/`.

## Scripts

```bash
npm install
npm run dev         # servidor local em http://localhost:5173
npm run build       # checagem de tipos + build de produção em dist/
npm run preview     # serve o build localmente
npm run lint        # ESLint
npm run format      # Prettier
```

## Deploy no Netlify

O repositório já traz o `netlify.toml` (build `npm run build`, pasta `dist`, Node 22,
cabeçalhos de segurança e cache). Basta:

1. No Netlify, **Add new site → Import an existing project** e escolher este repositório.
2. Manter as configurações detectadas e clicar em **Deploy**.

Alternativa sem Git: rodar `npm run build` e arrastar a pasta `dist/` em
[app.netlify.com/drop](https://app.netlify.com/drop).
