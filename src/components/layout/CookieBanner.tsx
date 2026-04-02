import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('movin_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('movin_cookie_consent', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('movin_cookie_consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6"
        >
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-secondary mb-2">Wir verwenden Cookies</h3>
              <p className="text-sm text-dark/70">
                Um unsere Webseite für dich optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Weitere Informationen erhältst du in unserer <a href="/datenschutz/" className="text-primary hover:underline">Datenschutzerklärung</a>.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={declineCookies}
                className="text-sm font-medium text-dark/60 hover:text-secondary transition-colors"
              >
                Nur essenzielle
              </button>
              <button 
                onClick={acceptCookies}
                className="btn-primary py-2 px-6 text-sm"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
