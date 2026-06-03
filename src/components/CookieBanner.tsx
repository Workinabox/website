import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getConsent, setConsent, loadGA, trackPageView } from '../analytics/analytics';
import './CookieBanner.css';

const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => getConsent() === null);

  if (!visible) return null;

  const accept = () => {
    setConsent('granted');
    loadGA();
    trackPageView(window.location.pathname);
    setVisible(false);
  };

  const reject = () => {
    setConsent('denied');
    setVisible(false);
  };

  return (
    <div className="cookie" role="dialog" aria-label={t('cookies.message')}>
      <p className="cookie-message">{t('cookies.message')}</p>
      <div className="cookie-actions">
        <button type="button" className="cookie-reject" onClick={reject}>
          {t('cookies.reject')}
        </button>
        <button type="button" className="cookie-accept" onClick={accept}>
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
