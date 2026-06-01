import type { ReactNode } from 'react';

import { LAUNCHED, isPreviewer } from '../lib/launch';
import { useAppSelector } from '../store';
import ComingSoon from '../pages/ComingSoon';

/**
 * Decides whether to show the real site or the pre-launch holding page.
 * - LAUNCHED            → always show the site.
 * - pre-launch + allowed sign-in → show the site (preview).
 * - pre-launch + anyone else     → show ComingSoon.
 * While auth is resolving, render nothing (the dark body) to avoid a gate flash.
 */
const LaunchGate = ({ children }: { children: ReactNode }) => {
  const { user, initialized } = useAppSelector((s) => s.auth);

  if (LAUNCHED) return <>{children}</>;
  if (!initialized) return null;
  if (user && isPreviewer(user.email)) return <>{children}</>;
  return <ComingSoon />;
};

export default LaunchGate;
