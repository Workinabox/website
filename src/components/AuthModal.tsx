import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';

import { auth, googleProvider } from '../config/firebase';
import { useAppDispatch, useAppSelector } from '../store';
import { closeAuthModal } from '../store/slices/ui';
import Button from './Button';
import './AuthModal.css';

// Sign-in only. Email/password users are provisioned in the Firebase console for now;
// there is no public sign-up until "Request access" is built.
const AuthModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.authModalOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setError(null);
      setBusy(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeAuthModal());
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dispatch]);

  if (!open) return null;

  const close = () => dispatch(closeAuthModal());

  const guard = (): boolean => {
    if (!auth) {
      setError(t('auth.unavailable'));
      return false;
    }
    return true;
  };

  // Surface the real Firebase reason instead of a blanket "wrong password".
  // Most "I'm sure my password is right" cases are actually one of:
  //  - provider disabled in the console, or
  //  - the account only has a Google credential (no password set).
  const describeAuthError = (err: unknown): string => {
    const code = (err as { code?: string })?.code ?? '';
    console.error('[auth] sign-in failed:', code || err, err);
    switch (code) {
      case AuthErrorCodes.OPERATION_NOT_ALLOWED: // 'auth/operation-not-allowed'
        return t('auth.errorProviderDisabled');
      case AuthErrorCodes.USER_DELETED: // 'auth/user-not-found'
        return t('auth.errorNoAccount');
      case AuthErrorCodes.INVALID_PASSWORD: // 'auth/wrong-password'
      case 'auth/invalid-credential': // modern merged code (wrong password OR Google-only account)
        return t('auth.errorEmail');
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER: // 'auth/too-many-requests'
        return t('auth.errorTooMany');
      default:
        return `${t('auth.errorEmail')} (${code || 'unknown'})`;
    }
  };

  const handleGoogle = async () => {
    if (!guard() || !auth) return;
    setBusy(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      close();
    } catch (err) {
      console.error(
        '[auth] Google sign-in failed:',
        (err as { code?: string })?.code,
        err,
      );
      setError(t('auth.errorGoogle'));
    } finally {
      setBusy(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guard() || !auth) return;
    setBusy(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      close();
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="auth-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={close}
    >
      <div className="auth-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button
          className="auth-close"
          type="button"
          aria-label={t('auth.close')}
          onClick={close}
        >
          ×
        </button>
        <h2 className="auth-title">{t('auth.title')}</h2>

        <Button
          variant="ghost"
          className="auth-google"
          onClick={handleGoogle}
          disabled={busy}
        >
          {t('auth.google')}
        </Button>

        <div className="auth-divider">
          <span>{t('auth.or')}</span>
        </div>

        <form className="auth-form" onSubmit={handleEmail}>
          <label>
            {t('auth.email')}
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            {t('auth.password')}
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <Button variant="primary" type="submit" disabled={busy}>
            {t('auth.signIn')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
