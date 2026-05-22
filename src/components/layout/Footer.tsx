import { Link } from 'react-router';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Logo from '../common/Logo';
import { getYearsOfExperience } from '../../data/companyInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const years = getYearsOfExperience();

  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Social */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex flex-col">
              <Logo className="h-12 w-auto" variant="white" />
            </Link>
            <p className="text-blue-tint/80 text-sm leading-relaxed max-w-xs">
              Salutogenese – Hilfe zur Selbsthilfe. Deine innovative Physiotherapiepraxis mit {years}+ Jahren Erfahrung in Freiburg und Rust.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://www.instagram.com/movinfreiburg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
                title="MOVIN Freiburg auf Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/movinfreiburg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
                title="MOVIN Freiburg auf Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@movin.freiburg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
                title="MOVIN Freiburg auf TikTok"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Standorte */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading text-xl font-bold text-white">Standorte</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/standorte/physiotherapie-freiburg-lorettoberg/" className="group flex items-start gap-3 text-blue-tint/80 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-white group-hover:text-primary transition-colors">Lorettoberg</span>
                    <span className="text-sm">Mercystrasse 14<br/>79100 Freiburg</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/standorte/physiotherapie-freiburg-mooswald/" className="group flex items-start gap-3 text-blue-tint/80 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-white group-hover:text-primary transition-colors">Mooswald</span>
                    <span className="text-sm">Wirthstraße 9<br/>79110 Freiburg</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/standorte/physiotherapie-europa-park-rust/" className="group flex items-start gap-3 text-blue-tint/80 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-white group-hover:text-primary transition-colors">Europa-Park</span>
                    <span className="text-sm">Peter-Thumb-Str. 8<br/>77977 Rust</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Leistungen */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading text-xl font-bold text-white">Leistungen</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/leistungen/krankengymnastik/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Krankengymnastik</Link></li>
              <li><Link to="/leistungen/manuelle-therapie/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Manuelle Therapie</Link></li>
              <li><Link to="/leistungen/sportphysiotherapie/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Sportphysiotherapie</Link></li>
              <li><Link to="/leistungen/ruecken-therapie/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Rücken-Therapie</Link></li>
              <li><Link to="/leistungen/knie-schulter-therapie/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Knie- & Schulter</Link></li>
              <li><Link to="/leistungen/lymphdrainage/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Lymphdrainage</Link></li>
              <li><Link to="/leistungen/betriebliche-gesundheitsfoerderung/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Betriebliche Gesundheitsförderung (BGF)</Link></li>
              <li><Link to="/leistungen/" className="text-primary hover:text-white transition-colors text-sm font-medium mt-2 inline-block">Alle Leistungen ansehen &rarr;</Link></li>
            </ul>
          </div>

          {/* Col 4: Info & Legal */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading text-xl font-bold text-white">Kontakt & Info</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:+497617073366" className="flex items-center gap-3 text-blue-tint/80 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+49 761 707 33 66</span>
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@movin-freiburg.de" className="flex items-center gap-3 text-blue-tint/80 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>kontakt@movin-freiburg.de</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/karriere/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Karriere & Jobs</Link>
              <Link to="/faq/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">FAQ</Link>
              <Link to="/kontakt/" className="text-blue-tint/80 hover:text-primary transition-colors text-sm">Kontakt</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-tint/60 text-sm">
            &copy; {currentYear} Therapiezentrum Lorettoberg GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum/" className="text-blue-tint/60 hover:text-white transition-colors text-sm">Impressum</Link>
            <Link to="/datenschutz/" className="text-blue-tint/60 hover:text-white transition-colors text-sm">Datenschutz</Link>
            <button 
              onClick={() => {
                localStorage.removeItem('movin_cookie_consent');
                window.location.reload();
              }}
              className="text-blue-tint/60 hover:text-white transition-colors text-sm"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
