import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

// Guarded init: a build without Firebase config (e.g. a bare local build) must not crash.
// When config is missing, `auth` is null and all auth callers no-op.
const isConfigured = Boolean(config.apiKey && config.authDomain && config.projectId);

export const app: FirebaseApp | null = isConfigured ? initializeApp(config) : null;
export const auth: Auth | null = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();

if (!isConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] No VITE_FIREBASE_* config found — auth is disabled. Copy .env.example to .env.local.'
  );
}
