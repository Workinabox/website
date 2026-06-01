import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LogoMark from '../components/LogoMark';
import { useAppDispatch } from '../store';
import { openAuthModal } from '../store/slices/ui';
import './ComingSoon.css';

const ComingSoon = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
    document.title = t('comingSoon.title');
  }, [t, i18n.resolvedLanguage, i18n.language]);

  return (
    <main className="coming-soon">
      <div className="coming-soon-inner">
        <LogoMark className="coming-soon-mark" onInk strokeWidth={2.4} />
        <div className="coming-soon-wordmark">
          Workin<span className="a">a</span>box
        </div>
        <h1>{t('comingSoon.headline')}</h1>
        <p className="coming-soon-sub">{t('comingSoon.subtitle')}</p>
        <button
          type="button"
          className="coming-soon-preview"
          onClick={() => dispatch(openAuthModal())}
        >
          {t('comingSoon.previewLink')}
        </button>
      </div>
    </main>
  );
};

export default ComingSoon;
