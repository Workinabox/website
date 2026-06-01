import { useTranslation } from 'react-i18next';

import Brand from './Brand';
import NavLinks from './NavLinks';
import LangSwitch from './LangSwitch';
import Button from './Button';
import './Topbar.css';

const Topbar = () => {
  const { t } = useTranslation();
  return (
    <header className="web-nav">
      <div className="nav-left">
        <Brand />
        <NavLinks />
      </div>
      <div className="nav-right">
        <LangSwitch />
        <Button variant="ghost" small>
          {t('actions.signIn')}
        </Button>
        <Button variant="primary" small>
          {t('actions.requestAccess')}
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
