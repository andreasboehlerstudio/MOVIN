import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SCRIPT_ID = 'movin-cloudflare-turnstile';
const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const DEVELOPMENT_SITE_KEY = '1x00000000000000000000AA';

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: 'light';
  size: 'flexible';
  appearance: 'interaction-only';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existing ?? document.createElement('script');

    const handleLoad = () => resolve();
    const handleError = () => reject(new Error('Turnstile konnte nicht geladen werden.'));

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existing) {
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return scriptPromise;
}

type TurnstileWidgetProps = {
  action: 'contact' | 'career' | 'anamnese';
  onTokenChange: (token: string) => void;
};

export default function TurnstileWidget({ action, onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const configuredSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();
    const siteKey = configuredSiteKey || (import.meta.env.DEV ? DEVELOPMENT_SITE_KEY : '');

    onTokenChange('');
    setLoadError(false);

    if (!siteKey) {
      setLoadError(true);
      return undefined;
    }

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: 'light',
          size: 'flexible',
          appearance: 'interaction-only',
          callback: (token) => onTokenChange(token),
          'expired-callback': () => onTokenChange(''),
          'error-callback': () => {
            onTokenChange('');
            setLoadError(true);
          },
        });
      })
      .catch(() => setLoadError(true));

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, onTokenChange]);

  return (
    <div className="min-h-2 w-full" aria-live="polite">
      <div ref={containerRef} className="w-full" />
      {loadError && (
        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Die Sicherheitsprüfung konnte nicht geladen werden. Bitte prüfen Sie Ihre Verbindung und laden Sie die Seite neu.
        </p>
      )}
    </div>
  );
}
