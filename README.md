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

## Hosting & auth (Firebase)

The site is hosted on **Firebase Hosting** with **Firebase Authentication** (Google +
email/password). Local dev reads config from a gitignored `.env.local` — copy
[.env.example](.env.example) and fill it in.

### Pre-launch gate

Until launch, the live domain shows a **Coming soon** holding page to the public; an
email allowlist can sign in and preview the real site on the same domain.

- `VITE_LAUNCHED` — `false` (default) keeps the gate on; `true` makes the site fully
  public.
- `VITE_PREVIEW_ALLOWLIST` — comma-separated emails allowed to preview while gated.

> ⚠️ This is a **client-side** gate on a static SPA: it hides the UI from casual
> visitors but is **not** a security boundary — the JS bundle is downloadable. Don't put
> anything secret behind it; that needs server-side checks (Firestore rules / Functions).

### First-time setup (Firebase console)

1. Create a Firebase project. **Authentication → Sign-in method →** enable **Google** and
   **Email/Password**. (Email/password users are provisioned in the console for now —
   there's no public sign-up yet.)
2. **Project settings → General → Your apps →** register a Web app; put the config into
   repo **Secrets** (`VITE_FIREBASE_*`) and your local `.env.local`. (A Firebase web API
   key isn't a true secret — it ships in the client bundle — but we keep it in Secrets to
   stay out of the repo, avoid secret-scanner flags, and mask it in CI logs. The real
   protection is GCP key restrictions + Auth authorized domains, see below.)
3. Set [.firebaserc](.firebaserc) `projects.default` to your project id (or `firebase use`).
4. Generate a CI service account: **Project settings → Service accounts → Generate new
   private key**; store the JSON as the GitHub **secret** `FIREBASE_SERVICE_ACCOUNT`, and
   set the GitHub **variable** `FIREBASE_PROJECT_ID` (project id is not secret; the deploy
   action needs it).
5. Set GitHub **secret** `VITE_PREVIEW_ALLOWLIST=<your emails>` and GitHub **variable**
   `VITE_LAUNCHED=false`.
6. **Restrict the web API key** (since it ships in the bundle): GCP Console → APIs &
   Services → Credentials → your browser key → **Application restrictions → HTTP
   referrers** → add your domain(s).
7. **Custom domain:** Hosting → Add custom domain → add the records it shows at your DNS
   provider. Then add the domain under **Auth → Settings → Authorized domains** (Google
   sign-in fails otherwise).

### Going live

Set the GitHub variable `VITE_LAUNCHED=true` and push a new `v*` tag — CD rebuilds and
redeploys with the gate off.

## CI / CD

- **CI** ([.github/workflows/ci.yml](.github/workflows/ci.yml)) — builds on every push /
  PR to `main`.
- **Preview** ([.github/workflows/firebase-preview.yml](.github/workflows/firebase-preview.yml))
  — every PR deploys to a private, expiring Firebase preview channel (built gate-off so
  reviewers see the full site); the URL is posted to the PR.
- **Release** ([.github/workflows/release.yml](.github/workflows/release.yml)) — tagging
  `v*` (e.g. `v0.1.0`) creates a GitHub Release with
  `wiab-website-v<version>-dist.tar.gz` + `.sha256`, **and deploys to the Firebase live
  channel**. The footer shows the tag version.
