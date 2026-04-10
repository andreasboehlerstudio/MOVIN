import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function Karriere() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Physiotherapeut (m/w/d)",
    "description": "Wir suchen engagierte Physiotherapeuten für unsere Standorte in Freiburg und Rust. Werde Teil eines innovativen Teams!",
    "identifier": {
      "@type": "PropertyValue",
      "name": "MOVIN",
      "value": "physio-2026"
    },
    "datePosted": "2026-03-01",
    "validThrough": "2026-12-31",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "MOVIN Physiotherapie",
      "sameAs": "https://movin-freiburg.de",
      "logo": "https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_RGB_gradient.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mercystrasse 14",
        "addressLocality": "Freiburg",
        "postalCode": "79100",
        "addressCountry": "DE"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Physiotherapeut Jobs Freiburg | Karriere bei MOVIN"
        description="Werde Teil des MOVIN Teams in Freiburg oder Rust. Wir bieten Top-Gehalt, modernste Ausstattung (KI-Therapie) und ein tolles Arbeitsklima. Jetzt bewerben!"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" 
            alt="Team Meeting" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Briefcase className="w-4 h-4" /> Karriere
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">Werde Teil unseres Teams</h1>
          <p className="text-xl text-blue-tint/90">
            Wir suchen leidenschaftliche Therapeuten, die mit uns die Physiotherapie von morgen gestalten wollen.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Warum MOVIN?</h2>
            <p className="text-lg text-dark/80">
              Bei uns stehst du als Therapeut im Mittelpunkt. Wir bieten dir ein Umfeld, in dem du dich fachlich und persönlich weiterentwickeln kannst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Überdurchschnittliches Gehalt', desc: 'Faire Bezahlung plus attraktive Boni und Zuschüsse.' },
              { title: 'Modernste Ausstattung', desc: 'Arbeite mit KI-gestützter Diagnostik und unserer eigenen MOVIN App.' },
              { title: 'Fortbildungsbudget', desc: 'Wir übernehmen die Kosten für deine fachliche Weiterbildung.' },
              { title: 'Flexible Arbeitszeiten', desc: 'Gestalte deinen Dienstplan passend zu deinem Leben (Voll- oder Teilzeit).' },
              { title: 'Urban Sports Club', desc: 'Kostenlose Mitgliedschaft für deine eigene Fitness.' },
              { title: 'Top Team-Events', desc: 'Regelmäßige Ausflüge, Sommerfeste und Weihnachtsfeiern.' },
            ].map((benefit, i) => (
              <div key={i} className="card-base p-8 hover:border-primary/30 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-secondary mb-3">{benefit.title}</h3>
                <p className="text-dark/70">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">Offene Stellen</h2>
          
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {[
              { title: 'Physiotherapeut (m/w/d)', type: 'Vollzeit / Teilzeit', location: 'Freiburg (Lorettoberg / Mooswald)' },
              { title: 'Sportphysiotherapeut (m/w/d)', type: 'Vollzeit', location: 'Europa-Park Rust' },
              { title: 'Masseur / Med. Bademeister (m/w/d)', type: 'Teilzeit', location: 'Freiburg' },
            ].map((job, i) => (
              <div key={i} className="card-base p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="text-2xl font-bold text-secondary mb-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-dark/60">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
                </div>
                <Link to="/kontakt/" className="btn-outline shrink-0">
                  Jetzt bewerben
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto bg-light p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-secondary mb-4">Nichts Passendes dabei?</h3>
            <p className="text-dark/70 mb-6">
              Wir sind immer auf der Suche nach Talenten. Sende uns einfach deine Initiativbewerbung!
            </p>
            <Link to="/kontakt/" className="flex items-center justify-center gap-2 text-primary font-medium hover:underline">
              Initiativbewerbung senden <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
