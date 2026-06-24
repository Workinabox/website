import { useEffect, useRef, useState, type ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  type SupportedLanguage,
} from '../i18n';
import './LangSwitch.css';

const FlagDanish = () => (
  <svg viewBox="0 0 18 12" aria-hidden="true">
    <rect width="18" height="12" fill="#c8102e" />
    <rect x="0" y="5" width="18" height="2" fill="#fff" />
    <rect x="6" y="0" width="2" height="12" fill="#fff" />
  </svg>
);

const FlagEnglish = () => (
  <svg viewBox="0 0 18 12" aria-hidden="true">
    <rect width="18" height="12" fill="#012169" />
    <path d="M0 0 L18 12 M18 0 L0 12" stroke="#fff" strokeWidth="2" />
    <path d="M0 0 L18 12 M18 0 L0 12" stroke="#c8102e" strokeWidth="1" />
    <rect x="0" y="5" width="18" height="2" fill="#fff" />
    <rect x="8" y="0" width="2" height="12" fill="#fff" />
    <rect x="0" y="5.5" width="18" height="1" fill="#c8102e" />
    <rect x="8.5" y="0" width="1" height="12" fill="#c8102e" />
  </svg>
);

const FlagFrench = () => (
  <svg viewBox="0 0 18 12" aria-hidden="true">
    <rect x="0" width="6" height="12" fill="#0055a4" />
    <rect x="6" width="6" height="12" fill="#fff" />
    <rect x="12" width="6" height="12" fill="#ef4135" />
  </svg>
);

const FlagSpanish = () => (
  <svg viewBox="0 0 18 12" aria-hidden="true">
    <rect width="18" height="12" fill="#aa151b" />
    <rect y="3" width="18" height="6" fill="#f1bf00" />
  </svg>
);

const FLAGS: Record<SupportedLanguage, () => ReactElement> = {
  da: FlagDanish,
  en: FlagEnglish,
  fr: FlagFrench,
  es: FlagSpanish,
};

const LangSwitch = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const current: SupportedLanguage = isSupportedLanguage(resolved)
    ? resolved
    : 'en';
  const CurrentFlag = FLAGS[current];

  const switchTo = (lang: SupportedLanguage) => {
    if (lang === current) return;
    const rest = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    navigate(
      `/${lang}${rest === '/' ? '/' : rest}${location.search}${location.hash}`,
    );
  };

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="lang" ref={wrapperRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t(`lang.${current}`)}
        onClick={() => setOpen((v) => !v)}
      >
        <CurrentFlag />
        <span className="lang-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const Flag = FLAGS[lang];
            const isActive = lang === current;
            const label = t(`lang.${lang}`);
            return (
              <li key={lang} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`lang-option${isActive ? ' active' : ''}`}
                  onClick={() => {
                    switchTo(lang);
                    setOpen(false);
                  }}
                >
                  <Flag />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LangSwitch;
