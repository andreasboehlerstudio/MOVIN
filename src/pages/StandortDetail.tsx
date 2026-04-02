import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';

export default function StandortDetail() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "MOVIN Physiotherapie Lorettoberg",
    "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80",
    "@id": "https://movin-freiburg.de/standorte/physiotherapie-freiburg-lorettoberg/",
    "url": "https://movin-freiburg.de/standorte/physiotherapie-freiburg-lorettoberg/",
    "telephone": "+497617073366",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mercystrasse 14",
      "addressLocality": "Freiburg",
      "postalCode": "79100",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.9833,
      "longitude": 7.8333
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Physiotherapie Freiburg Lorettoberg"
        description="Ihre MOVIN Physiotherapiepraxis am Lorettoberg in Freiburg. Modernste Ausstattung, erfahrene Therapeuten und 48h Termingarantie."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000" 
            alt="Praxis Lorettoberg" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16">
          <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <MapPin className="w-4 h-4" /> Standort
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">Physiotherapie Lorettoberg</h1>
          <p className="text-xl text-blue-tint/90 max-w-2xl">
            Unsere Boutique-Praxis im Herzen von Freiburg bietet dir modernste Therapie in einer entspannten Wohlfühlatmosphäre.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col: Info */}
            <div className="lg:col-span-7 flex flex-col gap-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">Willkommen am Lorettoberg</h2>
                <p className="text-lg text-dark/80 leading-relaxed mb-6">
                  In unserer Praxis am Lorettoberg verbinden wir 20 Jahre Erfahrung mit innovativen Therapieansätzen. Unser spezialisiertes Team aus Physiotherapeuten und Sportwissenschaftlern erarbeitet mit dir individuelle Lösungen für deine Beschwerden.
                </p>
                <p className="text-lg text-dark/80 leading-relaxed mb-8">
                  Dank unserer modernen Ausstattung, inklusive KI-gestützter Bewegungsanalyse und der MOVIN App, begleiten wir dich optimal auf deinem Weg zur Genesung.
                </p>
                
                <h3 className="text-xl font-bold text-secondary mb-4">Highlights am Standort:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Barrierefreier Zugang', 'Kostenlose Parkplätze', 'Klimatisierte Räume', 'Modernster Trainingsbereich', 'KGG (Krankengymnastik am Gerät)', 'Stoßwellentherapie'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark/70">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Preview */}
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8">Dein Team vor Ort</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-light overflow-hidden mb-4 border-2 border-primary/20">
                        <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Therapeut" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-secondary">Max Mustermann</h4>
                      <p className="text-sm text-dark/60">Physiotherapeut</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Contact Card */}
            <div className="lg:col-span-5">
              <div className="card-base p-8 sticky top-32 border-t-4 border-t-primary shadow-2xl">
                <h3 className="text-2xl font-bold text-secondary mb-8">Kontakt & Termin</h3>
                
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Adresse</h4>
                      <p className="text-dark/70">Mercystrasse 14<br/>79100 Freiburg im Breisgau</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Telefon</h4>
                      <a href="tel:+497617073366" className="text-primary hover:underline">+49 761 707 33 66</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">E-Mail</h4>
                      <a href="mailto:lorettoberg@movin-freiburg.de" className="text-primary hover:underline">lorettoberg@movin-freiburg.de</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Öffnungszeiten</h4>
                      <table className="text-sm text-dark/70 w-full">
                        <tbody>
                          <tr><td className="py-1 pr-4">Mo - Fr</td><td className="py-1">08:00 - 19:00 Uhr</td></tr>
                          <tr><td className="py-1 pr-4">Samstag</td><td className="py-1">Nach Vereinbarung</td></tr>
                          <tr><td className="py-1 pr-4">Sonntag</td><td className="py-1">Geschlossen</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <Link to="/termin/" className="btn-primary w-full justify-center text-lg py-4 shadow-lg shadow-primary/20">
                  <Calendar className="w-5 h-5 mr-2" />
                  Termin online buchen
                </Link>
                <p className="text-center text-sm text-dark/50 mt-4">48h Termingarantie für Neupatienten</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] w-full bg-light relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2669.839841838618!2d7.838411315648831!3d47.98144997921199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b6c00000000%3A0x0!2sMercystra%C3%9Fe%2014%2C%2079100%20Freiburg%20im%20Breisgau!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps MOVIN Lorettoberg"
          className="absolute inset-0"
        ></iframe>
      </section>
    </>
  );
}
