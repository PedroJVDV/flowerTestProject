# Pixel Flower Bloom 🌹

Site em React com uma flor pixel art central que, ao clique, dispara um efeito bloom com emojis de flores, reproduz um som "plop" via Web Audio API e transforma o fundo em um mar de ondas vermelhas românticas.

## Funcionalidades

- Flor pixel art vermelha com folhas verdes e caule preto no centro da tela
- Clique único para:
  - esconder a flor original
  - explodir emojis (🌹, 🌺, 🌸, 💐, ✿) em várias direções
  - tocar um som "plop" suave
- Fundo inicial preto e transição para vermelho com animação fluida de ondas
- Layout limpo e responsivo

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Deploy (GitHub Pages)

- O deploy está configurado em `/tmp/workspace/PedroJVDV/flowerTestProject/.github/workflows/deploy-pages.yml`
- A cada push na branch `main`, o GitHub Actions publica automaticamente no Pages
- URL esperada do site: `https://pedrojvdv.github.io/flowerTestProject/`

### Ativar no GitHub

1. No repositório, abra **Settings > Pages**
2. Em **Build and deployment**, selecione **Source: GitHub Actions**
3. Faça push na `main` (ou rode manualmente o workflow)
