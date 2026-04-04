import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, ClipboardList } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function Termin() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Termin buchen | MOVIN Physiotherapie",
    "description": "Buche jetzt deinen Termin bei MOVIN Physiotherapie in Freiburg oder Rust. 48h Termingarantie für Neupatienten mit akuten Schmerzen.",
    "url": "https://movin-freiburg.de/termin/"
  };

  return (
    <>
      <SEO 
        title="Termin buchen | MOVIN Physiotherapie Freiburg & Rust"
        description="Buche jetzt deinen Termin bei MOVIN Physiotherapie in Freiburg oder Rust. Nutze unsere 48h Termingarantie für Neupatienten mit akuten Schmerzen."
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Calendar className="w-4 h-4" /> Terminvereinbarung
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gradient-teal-mint">Buche deinen Termin</h1>
          <p className="text-xl text-dark/80 leading-relaxed">
            Wähle deinen bevorzugten Standort und buche deinen Termin bequem online oder telefonisch.
          </p>
        </div>
      </section>

      {/* Booking Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          
          {/* 48h Guarantee Banner */}
          <div className="max-w-4xl mx-auto bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-2">48h Termingarantie</h3>
              <p className="text-dark/80">
                Du hast akute Schmerzen? Wir garantieren Neupatienten einen Ersttermin innerhalb von 48 Stunden an einem unserer drei Standorte. Bitte rufe uns hierfür direkt an!
              </p>
            </div>
            <a href="tel:+497617073366" className="btn-primary shrink-0 md:ml-auto">
              Jetzt anrufen
            </a>
          </div>

          {/* App Booking Highlight */}
          <div className="max-w-4xl mx-auto bg-mint/20 border border-mint/40 rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Termine bequem per App buchen</h3>
              <p className="text-dark/80">
                Keine Warteschleifen mehr am Telefon: Buche, verschiebe oder storniere deine Physiotherapie-Termine rund um die Uhr direkt über dein Smartphone in der MOVIN App.
              </p>
            </div>
            <Link to="/digital/movin-app/" className="btn-primary shrink-0 md:ml-auto flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              Zur App
            </Link>
          </div>

          {/* Anamnesebogen Highlight */}
          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/10">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-secondary">Digitaler Anamnesebogen</h3>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">Jederzeit</span>
              </div>
              <p className="text-dark/80">
                Sparen Sie Zeit bei Ihrem ersten Termin und füllen Sie unseren Anamnesebogen bereits vorab digital aus – ganz bequem von zu Hause und zu jeder Zeit.
              </p>
            </div>
            <Link to="/digital/anamnesebogen/" className="btn-primary shrink-0 md:ml-auto">
              Bogen ausfüllen
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lorettoberg */}
            <div className="card-base p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Lorettoberg</h3>
              <p className="text-dark/60 mb-6">Mercystrasse 14, 79100 Freiburg</p>
              
              <div className="mt-auto flex flex-col gap-4">
                <a href="https://www.doctolib.de" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  Online buchen
                </a>
                <a href="tel:+497617073366" className="btn-outline w-full justify-center">
                  +49 761 707 33 66
                </a>
              </div>
            </div>

            {/* Mooswald */}
            <div className="card-base p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Mooswald</h3>
              <p className="text-dark/60 mb-6">Wirthstraße 9, 79110 Freiburg</p>
              
              <div className="mt-auto flex flex-col gap-4">
                <a href="https://www.doctolib.de" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  Online buchen
                </a>
                <a href="tel:+497617073377" className="btn-outline w-full justify-center">
                  +49 761 707 33 77
                </a>
              </div>
            </div>

            {/* Rust */}
            <div className="card-base p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Europa-Park</h3>
              <p className="text-dark/60 mb-6">Peter-Thumb-Str. 8, 77977 Rust</p>
              
              <div className="mt-auto flex flex-col gap-4">
                <a href="https://www.doctolib.de" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  Online buchen
                </a>
                <a href="tel:+497617073377" className="btn-outline w-full justify-center">
                  +49 761 707 33 77
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-dark/70 mb-4">
              Du bist dir unsicher, welche Behandlung die richtige für dich ist?
            </p>
            <Link to="/kontakt/" className="flex items-center justify-center gap-2 text-primary font-medium hover:underline">
              Schreib uns eine Nachricht <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
