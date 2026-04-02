import { Link } from 'react-router-dom';
import { Brain, Activity, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function DigitalKi() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "KI-Physiotherapie bei MOVIN",
    "description": "Erlebe die Zukunft der Physiotherapie in Freiburg. KI-gestützte Bewegungsanalyse für präzise Diagnostik und schnellere Heilung.",
    "url": "https://movin-freiburg.de/digital/ki-physiotherapie/"
  };

  return (
    <>
      <SEO 
        title="KI-Physiotherapie Freiburg | Modernste Diagnostik | MOVIN"
        description="Erlebe die Zukunft der Physiotherapie in Freiburg. KI-gestützte Bewegungsanalyse für präzise Diagnostik und schnellere Heilung. Jetzt Termin vereinbaren!"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="KI-gestützte Bewegungsanalyse" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Brain className="w-4 h-4" /> Innovation
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">KI-Physiotherapie</h1>
          <p className="text-xl text-blue-tint/90">
            Präziser, schneller, wirksamer. Wir nutzen modernste Künstliche Intelligenz für deine Bewegungsanalyse und Therapieplanung.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Die Zukunft der Rehabilitation</h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-6">
                Bei MOVIN verlassen wir uns nicht nur auf unsere Erfahrung und unsere Hände. Wir kombinieren klassische Physiotherapie mit modernster, KI-gestützter Technologie.
              </p>
              <p className="text-lg text-dark/80 leading-relaxed mb-8">
                Mithilfe von Kamerasensoren und Künstlicher Intelligenz analysieren wir deine Bewegungsmuster in Echtzeit. Die KI erkennt Asymmetrien, Fehlbelastungen und muskuläre Dysbalancen, die für das menschliche Auge oft unsichtbar bleiben.
              </p>
              
              <h3 className="text-2xl font-bold text-secondary mb-4">Deine Vorteile:</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Objektive und präzise Diagnostik',
                  'Sichtbare Fortschritte durch Vorher-Nachher-Vergleiche',
                  'Individuellere Trainingspläne basierend auf Daten',
                  'Schnellere Rückkehr in den Sport (Return-to-Sport)',
                  'Prävention von Folgeverletzungen'
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
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
                alt="Therapeut wertet Daten am Tablet aus" 
                className="relative z-10 rounded-3xl shadow-xl object-cover h-[500px] w-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Wie funktioniert das?</h2>
            <p className="text-lg text-dark/80">
              Die KI-Analyse ist nahtlos in deinen Behandlungsablauf integriert und dauert nur wenige Minuten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-border -translate-y-1/2 z-0" />

            {[
              { step: '01', title: 'Bewegungsanalyse', desc: 'Du führst spezifische Bewegungen (z.B. Kniebeugen, Sprünge) vor einer 3D-Kamera aus.' },
              { step: '02', title: 'KI-Auswertung', desc: 'Die Software analysiert Gelenkwinkel, Belastung und Symmetrie in Echtzeit.' },
              { step: '03', title: 'Therapieplan', desc: 'Basierend auf den objektiven Daten erstellen wir deinen maßgeschneiderten Trainingsplan.' },
            ].map((item, i) => (
              <div key={i} className="card-base p-8 relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-primary/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                <p className="text-dark/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/termin/" className="btn-primary text-lg px-8 py-4">
              Jetzt Termin für KI-Analyse buchen
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Erlebe die Therapie der Zukunft</h2>
          <p className="text-blue-tint/80 text-lg mb-10">
            Kombiniere therapeutische Expertise mit modernster KI-Technologie für deinen optimalen Behandlungserfolg.
          </p>
          <Link to="/termin/" className="btn-primary text-lg px-8 py-4">
            <Calendar className="w-5 h-5 mr-2" />
            Termin vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
