/// <reference types="vite/client" />

// Injected at build time by vite.config.js (`define`).
// Tracks the release tag scheme, e.g. "0.1.0" for tag v0.1.0.
declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  // Firebase web app config (public). See .env.example.
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;

  // Pre-launch gate.
  readonly VITE_LAUNCHED?: string;
  readonly VITE_PREVIEW_ALLOWLIST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
