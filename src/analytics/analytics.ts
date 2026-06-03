// Google Analytics (GA4) with consent gating.
// GA is never loaded until the visitor accepts the cookie banner. All exports
// no-op when VITE_GA_MEASUREMENT_ID is unset, so dev without an ID is harmless.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CONSENT_KEY = 'ga-consent';

type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

export const getConsent = (): Consent | null => {
  const value = localStorage.getItem(CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
};

export const setConsent = (value: Consent): void => {
  localStorage.setItem(CONSENT_KEY, value);
};

export const loadGA = (): void => {
  if (loaded || !GA_ID) return;
  loaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the raw arguments object from dataLayer.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
};

export const trackPageView = (path: string): void => {
  if (!loaded || !GA_ID) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
