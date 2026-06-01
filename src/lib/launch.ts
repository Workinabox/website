/*
 * Pre-launch gate flags (build-time, via VITE_* env — see .env.example).
 *
 * NOTE: this is a client-side gate on a static SPA. It hides the UI from casual
 * visitors but is NOT a security boundary — the JS bundle is downloadable. Anything
 * truly secret must live behind server-side checks, not here.
 */

/** When true, the site is fully public and the gate is bypassed. */
export const LAUNCHED = import.meta.env.VITE_LAUNCHED === 'true';

/** Emails allowed to preview the real site while LAUNCHED is false. */
export const previewAllowlist: string[] = (import.meta.env.VITE_PREVIEW_ALLOWLIST ?? '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

/** True if the given email may preview the site during pre-launch. */
export const isPreviewer = (email?: string | null): boolean =>
  !!email && previewAllowlist.includes(email.toLowerCase());
