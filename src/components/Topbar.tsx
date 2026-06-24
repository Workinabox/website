import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';

import Brand from './Brand';
import NavLinks from './NavLinks';
import LangSwitch from './LangSwitch';
import Button from './Button';
import { auth } from '../config/firebase';
import { useAppDispatch, useAppSelector } from '../store';
import { openAuthModal } from '../store/slices/ui';
import './Topbar.css';

const Topbar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const handleSignOut = () => {
    if (auth) void signOut(auth);
  };

  return (
    <header className="web-nav">
      <div className="nav-left">
        <Brand />
        <NavLinks />
      </div>
      <div className="nav-right">
        <LangSwitch />
        {user ? (
          <>
            <span className="nav-account">
              {user.displayName ?? user.email}
            </span>
            <Button variant="ghost" small onClick={handleSignOut}>
              {t('auth.signOut')}
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            small
            onClick={() => dispatch(openAuthModal())}
          >
            {t('actions.signIn')}
          </Button>
        )}
        {/* Request access is deferred — no handler until there's something to request. */}
        <Button variant="primary" small>
          {t('actions.requestAccess')}
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
