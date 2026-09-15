# Oficina Office — Primeiros Passos no Pacote Office

Simulador educativo de Word, Excel e PowerPoint, sem precisar instalar nada.

## Como abrir

Basta abrir `index.html` diretamente no navegador (duplo clique) ou, melhor
ainda, servir a pasta com qualquer servidor estático simples, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Isso evita eventuais bloqueios de `file://` em alguns navegadores.

## Estrutura de pastas

```
oficina-office/
├── index.html          # marcação e conteúdo das telas
├── css/
│   └── styles.css      # estilos personalizados (o Tailwind vem via CDN no index.html)
└── js/
    ├── data-state.js    # estado global do usuário + banco de emblemas/glossário
    ├── nav.js           # navegação entre abas (Início, Word, Excel, PowerPoint)
    ├── theme.js         # modo claro/escuro
    ├── gamification.js  # XP, níveis e emblemas
    ├── word.js          # laboratório do Word
    ├── formula-engine.js# motor de fórmulas do Excel (SOMA, MÉDIA, SE...)
    ├── excel.js         # laboratório do Excel
    ├── ppt.js           # laboratório do PowerPoint
    ├── shortcuts.js      # atalhos de teclado (Ctrl+N, Ctrl+I, Ctrl+M...)
    └── main.js           # inicialização da aplicação
```

Os arquivos JS são carregados via `<script src>` simples (sem bundler/build
step), na ordem em que aparecem no `index.html`. Isso é suficiente porque
cada módulo é um objeto global independente (`AppState`, `WordModule`,
`ExcelModule` etc.) — não há `import`/`export`.

## Publicação no GitHub Pages

Este repositório inclui o workflow `.github/workflows/deploy-pages.yml`, que
publica automaticamente o site no GitHub Pages quando houver push na branch
`main` ou `master`.

Para ativar:

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **Source: GitHub Actions**.
3. Faça merge desta branch na branch padrão (`main` ou `master`).

Depois do workflow executar, o site ficará disponível na URL de Pages do
repositório.

## Sem servidor? Sem problema

Não há backend nem banco de dados: o progresso do usuário é salvo no
`localStorage` do próprio navegador.
