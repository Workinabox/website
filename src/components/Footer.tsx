import { useTranslation } from 'react-i18next';

import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="web-footer">
      <span className="footer-tag">{t('footer.tagline')}</span>
      <div className="footer-right">
        <span className="footer-version">v{__APP_VERSION__}</span>
        <span className="footer-copy">{t('footer.copyright')}</span>
      </div>
    </footer>
  );
};

export default Footer;
