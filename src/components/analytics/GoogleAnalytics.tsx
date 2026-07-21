import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useCookieConsent } from '../gdpr/CookieContext';

const GA_MEASUREMENT_ID = 'G-V6PKV5XVJL';
const GA_SCRIPT_ID = 'movin-google-analytics';
const GA_INITIALIZED_FLAG = '__movinGoogleAnalyticsInitialized';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __movinGoogleAnalyticsInitialized?: boolean;
  }
}

function deleteCookie(name: string) {
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname.split('.').slice(-2).join('.')}`];

  domains.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
  });
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

function removeAnalyticsCookies() {
  deleteCookie('_ga');

  document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name.startsWith('_ga_'))
    .forEach(deleteCookie);
}

function ensureGoogleAnalyticsLoaded() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    // gtag.js recognizes its command queue by the native Arguments object.
    window.dataLayer?.push(arguments);
  };

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  if (!window[GA_INITIALIZED_FLAG]) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
    window[GA_INITIALIZED_FLAG] = true;
  }
}

export default function GoogleAnalytics() {
  const { consent, hasResponded } = useCookieConsent();
  const location = useLocation();
  const analyticsAllowed = hasResponded && consent.analytics;

  useEffect(() => {
    if (!analyticsAllowed) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      removeAnalyticsCookies();
      return;
    }

    ensureGoogleAnalyticsLoaded();
  }, [analyticsAllowed]);

  useEffect(() => {
    if (!analyticsAllowed || !window.gtag) return;

    const timer = window.setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        send_to: GA_MEASUREMENT_ID,
        page_path: `${location.pathname}${location.search}${location.hash}`,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [analyticsAllowed, location.pathname, location.search, location.hash]);

  return null;
}
