import React, { createContext, useContext, useState, useEffect } from 'react';

export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsentState {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  consent: CookieConsentState;
  hasResponded: boolean;
  updateConsent: (newConsent: Partial<CookieConsentState>) => void;
  acceptAll: () => void;
  declineAll: () => void;
  resetConsent: () => void;
}

const DEFAULT_CONSENT: CookieConsentState = {
  necessary: true, // Always true
  functional: false,
  analytics: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsentState>(DEFAULT_CONSENT);
  const [hasResponded, setHasResponded] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      try {
        setConsent(JSON.parse(savedConsent));
        setHasResponded(true);
      } catch (e) {
        console.error('Failed to parse cookie consent', e);
      }
    }
  }, []);

  const updateConsent = (newConsent: Partial<CookieConsentState>) => {
    const updated = { ...consent, ...newConsent, necessary: true };
    setConsent(updated);
    setHasResponded(true);
    localStorage.setItem('cookie-consent', JSON.stringify(updated));
  };

  const acceptAll = () => {
    const updated = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setConsent(updated);
    setHasResponded(true);
    localStorage.setItem('cookie-consent', JSON.stringify(updated));
  };

  const declineAll = () => {
    const updated = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setConsent(updated);
    setHasResponded(true);
    localStorage.setItem('cookie-consent', JSON.stringify(updated));
  };

  const resetConsent = () => {
    setConsent(DEFAULT_CONSENT);
    setHasResponded(false);
    localStorage.removeItem('cookie-consent');
  };

  return (
    <CookieContext.Provider value={{ consent, hasResponded, updateConsent, acceptAll, declineAll, resetConsent }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};
