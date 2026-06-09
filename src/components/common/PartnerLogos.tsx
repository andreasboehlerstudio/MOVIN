import React from 'react';

export default function PartnerLogos() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
      {/* Category: Sport */}
      <div className="flex flex-col items-center text-center">
        <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-8">Sport-Kooperationen</h4>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
          
          {/* EHC Freiburg */}
          <a 
            href="https://www.ehcf.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="EHC Freiburg Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-ehc-freiburg.png" 
                alt="EHC Freiburg" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-secondary tracking-widest uppercase transition-colors duration-300">EHC Freiburg</span>
          </a>

          {/* Red Sparrows */}
          <a 
            href="https://red-sparrows-freiburg.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Red Sparrows Freiburg Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-red-sparrows.png" 
                alt="Red Sparrows" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#e11d48] tracking-widest uppercase transition-colors duration-300">Red Sparrows</span>
          </a>

          {/* Sacristans */}
          <a 
            href="https://www.sacristans.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Sacristans Freiburg Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-sacristans.png" 
                alt="Sacristans" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#b45309] tracking-widest uppercase transition-colors duration-300">Sacristans</span>
          </a>

        </div>
      </div>

      {/* Category: Training */}
      <div className="flex flex-col items-center text-center">
        <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-8">Training & BGM</h4>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">

          {/* Wellhub */}
          <a 
            href="https://egym-wellpass.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Wellhub Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-wellhub.png" 
                alt="Wellhub" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#0f766e] tracking-widest uppercase transition-colors duration-300">Wellhub (Wellpass)</span>
          </a>

          {/* Hansefit */}
          <a 
            href="https://hansefit.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Hansefit Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-hansefit.png" 
                alt="Hansefit" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#1d4ed8] tracking-widest uppercase transition-colors duration-300">Hansefit</span>
          </a>

          {/* Urban Sports Club */}
          <a 
            href="https://urbansportsclub.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Urban Sports Club Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-urban-sports-club.png" 
                alt="Urban Sports" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#15803d] tracking-widest uppercase transition-colors duration-300">Urban Sports</span>
          </a>

        </div>
      </div>

      {/* Category: Physiotherapie */}
      <div className="flex flex-col items-center text-center">
        <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-8">Kliniken & Partner</h4>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">

          {/* Artemed Lorettoberg */}
          <a 
            href="https://www.artemed-freiburg.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Artemed Lorettoberg Freiburg Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-artemed.jpg" 
                alt="Artemed" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#1e3a8a] tracking-widest uppercase transition-colors duration-300">Artemed</span>
          </a>

          {/* Motherson */}
          <a 
            href="https://www.motherson.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105"
            aria-label="Motherson Website"
          >
            <div className="w-24 h-16 flex items-center justify-center">
              <img 
                src="/images/partner-logos/logo-motherson.png" 
                alt="Motherson" 
                className="max-h-12 max-w-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-dark/50 group-hover:text-[#ea580c] tracking-widest uppercase transition-colors duration-300">Motherson</span>
          </a>

        </div>
      </div>
    </div>
  );
}
