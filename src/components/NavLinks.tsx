import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './NavLinks.css';

const NavLinks = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <nav className="nav-links" aria-label="Primary">
      <NavLink to={`/${lang}/product`}>{t('nav.product')}</NavLink>
      <NavLink to={`/${lang}/the-box`}>{t('nav.theBox')}</NavLink>
      <NavLink to={`/${lang}/docs`}>{t('nav.docs')}</NavLink>
      <NavLink to={`/${lang}/pricing`}>{t('nav.pricing')}</NavLink>
      <NavLink to={`/${lang}/company`}>{t('nav.company')}</NavLink>
    </nav>
  );
};

export default NavLinks;
