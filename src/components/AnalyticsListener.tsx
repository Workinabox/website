import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getConsent, loadGA, trackPageView } from '../analytics/analytics';

/**
 * Drives Google Analytics independently of the launch gate. Renders nothing.
 * Lives above LaunchGate so both ComingSoon and the real site are tracked.
 * - On mount: load GA for returning visitors who already accepted consent.
 * - On every route change: send a page_view (no-ops until GA is loaded).
 */
const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    if (getConsent() === 'granted') loadGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default AnalyticsListener;
