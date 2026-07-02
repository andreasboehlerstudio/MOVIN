import { Link } from 'react-router';
import { Hospital, Stethoscope, Users, CheckCircle2, Calendar } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function StationaereVersorgung() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Stationäre Physiotherapie | MOVIN",
    "description": "Stationäre physiotherapeutische Versorgung im Artemed / Loretto Krankenhaus Freiburg. Nahtlose Betreuung von der OP bis zur Reha.",
    "url": "https://movin-freiburg.de/stationaere-versorgung/"
  };

  return (
    <>
      <SEO 
        title="Stationäre Physiotherapie | Loretto Krankenhaus | MOVIN"
        description="Stationäre physiotherapeutische Versorgung im Artemed / Loretto Krankenhaus Freiburg. Nahtlose Betreuung von der OP bis zur Reha durch das MOVIN Team."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/standorte/lorettoberg/lorettoberg-main.webp" 
            alt="Physiotherapie im Krankenhaus" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Hospital className="w-4 h-4" /> Klinikversorgung
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">Stationäre Versorgung</h1>
          <p className="text-xl text-blue-tint/90">
            Wir betreuen Patienten direkt am Krankenbett im Artemed / Loretto Krankenhaus Freiburg.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Nahtlose Betreuung</h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-6">
                Die MOVIN (Therapiezentrum Lorettoberg GmbH) ist stolzer Partner des Artemed / Loretto Krankenhauses in Freiburg. Unser spezialisiertes Team übernimmt die physiotherapeutische Versorgung der stationären Patienten.
              </p>
              <p className="text-lg text-dark/80 leading-relaxed mb-8">
                Der große Vorteil für Sie: Wenn Sie nach einem operativen Eingriff entlassen wirst, können Sie Ihre ambulante Rehabilitation nahtlos bei uns in der Praxis am Lorettoberg fortsetzen. Ihre Therapeuten kennen Ihre Vorgeschichte bereits.
              </p>
              
              <h3 className="text-2xl font-bold text-secondary mb-4">Unsere Schwerpunkte in der Klinik:</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Orthopädie & Unfallchirurgie (z.B. nach Gelenkersatz)',
                  'Frühmobilisation nach Operationen',
                  'Atemtherapie',
                  'Lymphdrainage nach chirurgischen Eingriffen',
                  'Ganganalyse und Hilfsmittelberatung'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-dark/80">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4" />
              <img 
                src="/images/standorte/lorettoberg/lorettoberg-behandlungsraum-20260622.webp" 
                alt="Loretto Krankenhaus Freiburg" 
                className="relative z-10 rounded-3xl shadow-xl object-cover h-[500px] w-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Team/Partner Info */}
      <section className="section-padding bg-light">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Enge Zusammenarbeit mit Ärzten</h2>
          <p className="text-lg text-dark/80 leading-relaxed mb-10">
            Durch die tägliche Präsenz auf den Stationen stehen unsere Therapeuten im ständigen Austausch mit dem ärztlichen und pflegerischen Personal. Dies garantiert eine optimale, interdisziplinäre Patientenversorgung.
          </p>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-border inline-block text-left">
            <h4 className="font-bold text-secondary mb-2">Artemed / Loretto Krankenhaus</h4>
            <p className="text-dark/70 mb-4">Mercystraße 6-14, 79100 Freiburg</p>
            <a href="https://www.loretto-krankenhaus.de/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              Zur Website des Krankenhauses &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 cta-footer-gradient text-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ambulante Reha nach dem Klinikaufenthalt?</h2>
          <p className="text-blue-tint/80 text-lg mb-10">
            Sichern Sie sich frühzeitig Ihre Termine für die Zeit nach der Entlassung in unserer Praxis am Lorettoberg (direkt neben der Klinik).
          </p>
          <Link to="/termin/" className="btn-cta-cheetah text-lg px-8 py-4 rounded-full">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Termine vereinbaren
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
