# Workinabox — Website

The public marketing website for **Workinabox** (Gos & co ApS) — an agentic system that
runs vertical work: software, ops, marketing, sales.

Built with React + Vite + TypeScript. The visual identity (the `workshop` palette, the
`engineering` type system, the `toolboxAlt` logo mark) comes from the Claude Design
handoff in the `assets/visual-identity` bundle.

## Stack

- **React 19** + **Vite 7** + **TypeScript** (SWC for JSX)
- **react-router-dom** — language-prefixed routing (`/:lang/*`)
- **Redux Toolkit** — UI/auth state
- **i18next** — internationalization (en / da / fr / es; English is authoritative)
- Vanilla CSS with design tokens as CSS custom properties

## Develop

```bash
npm install
npm run dev        # start the dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Internationalization

Routes are prefixed with a language code (`/en/`, `/da/`, …). The bare `/` redirects to
the detected language. Copy lives in `src/i18n/locales/*.json` — `en.json` is the source
of truth; `da/fr/es` are seeded from it and translated over time.

## Release

CI builds on every push / PR to `main`. Tagging `v*` (e.g. `v0.1.0`) runs the release
workflow, which creates a GitHub Release and attaches `wiab-website-v<version>-dist.tar.gz`
plus its `.sha256` checksum.
