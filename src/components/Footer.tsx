import { useTranslation } from 'react-i18next';

import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="web-footer">
      <span className="footer-tag">{t('footer.tagline')}</span>
      <span className="footer-copy">{t('footer.copyright')}</span>
    </footer>
  );
};

export default Footer;
