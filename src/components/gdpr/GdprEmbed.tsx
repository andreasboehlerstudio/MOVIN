import React from 'react';
import { useCookieConsent, CookieCategory } from './CookieContext';
import { Shield, Lock, ExternalLink } from 'lucide-react';

interface GdprEmbedProps {
  category: CookieCategory;
  children: React.ReactNode;
  provider: string;
  placeholder?: React.ReactNode;
}

export const GdprEmbed: React.FC<GdprEmbedProps> = ({ category, children, provider, placeholder }) => {
  const { consent, updateConsent } = useCookieConsent();

  const isAllowed = consent[category];

  if (isAllowed) {
    return <>{children}</>;
  }

  const handleEnable = () => {
    updateConsent({ [category]: true });
  };

  if (placeholder) {
    return <>{placeholder}</>;
  }

  return (
    <div className="relative w-full aspect-video bg-light rounded-2xl border border-border flex flex-col items-center justify-center p-8 text-center overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50" />
      
      <div className="relative z-10 max-w-sm">
        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
          <Lock className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-secondary mb-3">
          Inhalt von {provider} blockiert
        </h3>
        
        <p className="text-dark/70 text-sm mb-8 leading-relaxed">
          Um diesen Inhalt zu sehen, musst du die Kategorie <strong>"{category === 'marketing' ? 'Externe Medien' : category}"</strong> in den Cookie-Einstellungen aktivieren.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEnable}
            className="bg-primary text-white hover:bg-primary-hover px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Inhalt laden
          </button>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(provider)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-border text-secondary hover:bg-light px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Auf {provider} ansehen
          </a>
        </div>
      </div>
    </div>
  );
};
