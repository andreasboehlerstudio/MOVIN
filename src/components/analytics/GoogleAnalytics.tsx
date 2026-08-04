import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useCookieConsent } from '../gdpr/CookieContext';

const GA_MEASUREMENT_ID = 'G-V6PKV5XVJL';
const GOOGLE_ADS_ID = 'AW-702733253';
const GOOGLE_TAG_SCRIPT_ID = 'movin-google-tag';
const GOOGLE_TAG_INITIALIZED_FLAG = '__movinGoogleTagInitialized';
const GA_INITIALIZED_FLAG = '__movinGoogleAnalyticsInitialized';
const ADS_INITIALIZED_FLAG = '__movinGoogleAdsInitialized';
const CONSENT_DEFAULTS_FLAG = '__movinGoogleConsentDefaultsSet';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __movinGoogleTagInitialized?: boolean;
    __movinGoogleAnalyticsInitialized?: boolean;
    __movinGoogleAdsInitialized?: boolean;
    __movinGoogleConsentDefaultsSet?: boolean;
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

function removeAdvertisingCookies() {
  document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name.startsWith('_gcl_') || name.startsWith('_gac_'))
    .forEach(deleteCookie);
}

function ensureGoogleTagQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    // gtag.js recognizes its command queue by the native Arguments object.
    window.dataLayer?.push(arguments);
  };

  if (!window[CONSENT_DEFAULTS_FLAG]) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('set', 'ads_data_redaction', true);
    window[CONSENT_DEFAULTS_FLAG] = true;
  }
}

function ensureGoogleTagLoaded(tagId: string) {
  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    document.head.appendChild(script);
  }

  if (!window[GOOGLE_TAG_INITIALIZED_FLAG]) {
    window.gtag?.('js', new Date());
    window[GOOGLE_TAG_INITIALIZED_FLAG] = true;
  }
}

function initializeGoogleAnalytics() {
  if (!window[GA_INITIALIZED_FLAG]) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
    window[GA_INITIALIZED_FLAG] = true;
  }
}

function initializeGoogleAds() {
  if (!window[ADS_INITIALIZED_FLAG]) {
    window.gtag?.('config', GOOGLE_ADS_ID);
    window[ADS_INITIALIZED_FLAG] = true;
  }
}

export default function GoogleAnalytics() {
  const { consent, hasResponded } = useCookieConsent();
  const location = useLocation();
  const analyticsAllowed = hasResponded && consent.analytics;
  const marketingAllowed = hasResponded && consent.marketing;

  useEffect(() => {
    ensureGoogleTagQueue();

    window.gtag?.('consent', 'update', {
      analytics_storage: analyticsAllowed ? 'granted' : 'denied',
      ad_storage: marketingAllowed ? 'granted' : 'denied',
      ad_user_data: marketingAllowed ? 'granted' : 'denied',
      ad_personalization: marketingAllowed ? 'granted' : 'denied',
    });
    window.gtag?.('set', 'ads_data_redaction', !marketingAllowed);

    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = !analyticsAllowed;
    (window as unknown as Record<string, unknown>)[`ga-disable-${GOOGLE_ADS_ID}`] = !marketingAllowed;

    if (!analyticsAllowed) {
      removeAnalyticsCookies();
    }

    if (!marketingAllowed) {
      removeAdvertisingCookies();
    }

    if (!analyticsAllowed && !marketingAllowed) return;

    ensureGoogleTagLoaded(analyticsAllowed ? GA_MEASUREMENT_ID : GOOGLE_ADS_ID);
    if (analyticsAllowed) initializeGoogleAnalytics();
    if (marketingAllowed) initializeGoogleAds();
  }, [analyticsAllowed, marketingAllowed]);

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
