import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, Check, X, ChevronRight, Info } from 'lucide-react';
import { useCookieConsent, CookieCategory } from './CookieContext';
import { Link } from 'react-router';

export const CookieConsent: React.FC = () => {
  const { consent, hasResponded, acceptAll, declineAll, updateConsent } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [tempConsent, setTempConsent] = useState(consent);

  useEffect(() => {
    const openSettings = () => {
      setTempConsent(consent);
      setShowSettings(true);
    };

    window.addEventListener('movin:open-cookie-settings', openSettings);

    return () => {
      window.removeEventListener('movin:open-cookie-settings', openSettings);
    };
  }, [consent]);

  if (hasResponded && !showSettings) return null;

  const handleToggle = (category: CookieCategory) => {
    if (category === 'necessary') return; // Cannot toggle necessary
    setTempConsent(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSave = () => {
    updateConsent(tempConsent);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setShowSettings(false);
  };

  const handleDeclineAll = () => {
    declineAll();
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-end justify-center p-4 md:p-8">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl border border-border max-w-2xl w-full pointer-events-auto overflow-hidden"
        >
          {!showSettings ? (
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary mb-2">Datenschutz-Einstellungen</h2>
                  <p className="text-dark/70 text-sm leading-relaxed">
                    Wir nutzen Cookies und ähnliche Technologien, um unsere Webseite optimal zu gestalten und fortlaufend zu verbessern. 
                    Einige sind technisch notwendig, andere helfen uns, Ihr Nutzererlebnis zu verbessern (z.B. Spotify-Embeds, Instagram-Feeds). 
                    Sie können entscheiden, welche Kategorien Sie zulassen möchten.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-full font-bold transition-colors"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 bg-light text-secondary hover:bg-border px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Einstellungen
                </button>
                <button
                  onClick={handleDeclineAll}
                  className="flex-1 bg-transparent border border-border text-dark/70 hover:bg-light px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Alle ablehnen
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/datenschutz/" className="text-xs text-primary hover:underline">Datenschutzerklärung</Link>
                <span className="mx-2 text-dark/30">•</span>
                <Link to="/impressum/" className="text-xs text-primary hover:underline">Impressum</Link>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-secondary">Cookie-Einstellungen</h2>
                <button onClick={() => setShowSettings(false)} className="text-dark/50 hover:text-dark">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <CookieOption
                  title="Technisch notwendig"
                  description="Diese Cookies sind für den Betrieb der Seite zwingend erforderlich und können nicht deaktiviert werden."
                  checked={true}
                  disabled={true}
                  onToggle={() => {}}
                />
                <CookieOption
                  title="Funktional"
                  description="Ermöglicht erweiterte Funktionen wie Sprachauswahl oder Chat-Support."
                  checked={tempConsent.functional}
                  onToggle={() => handleToggle('functional')}
                />
                <CookieOption
                  title="Analyse & Statistik"
                  description="Erlaubt Google Analytics, damit wir verstehen, wie Besucher die Website nutzen und die Seite verbessern koennen."
                  checked={tempConsent.analytics}
                  onToggle={() => handleToggle('analytics')}
                />
                <CookieOption
                  title="Externe Medien & Marketing"
                  description="Ermöglicht Inhalte von Drittanbietern sowie Google Ads zur Werbe- und Conversion-Messung."
                  checked={tempConsent.marketing}
                  onToggle={() => handleToggle('marketing')}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDeclineAll}
                  className="flex-1 bg-light text-secondary hover:bg-border px-6 py-3 rounded-full font-bold transition-colors"
                >
                  Alle ablehnen
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-full font-bold transition-colors"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-secondary text-white hover:bg-secondary/90 px-6 py-3 rounded-full font-bold transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CookieOption: React.FC<{
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}> = ({ title, description, checked, disabled, onToggle }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-light transition-colors">
    <div className="flex-grow">
      <h3 className="font-bold text-secondary text-sm mb-1">{title}</h3>
      <p className="text-xs text-dark/70 leading-relaxed">{description}</p>
    </div>
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? 'bg-primary' : 'bg-dark/20'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);
