import { Link } from 'react-router';
import { 
  Brain, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Info, 
  Lock, 
  HeartHandshake, 
  ChevronRight 
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function DigitalKi() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "KI-gestützte Physiotherapie bei MOVIN",
    "description": "Bei MOVIN vereinen wir führende therapeutische Expertise mit datengestützter Effizienz. Entdecken Sie unsere Leitlinien und Anwendungen für KI-gestützte Physiotherapie in Freiburg.",
    "url": "https://movin-freiburg.de/digital/ki-physiotherapie/"
  };

  return (
    <>
      <SEO 
        title="KI-gestützte Physiotherapie Freiburg | Zukunft der Bewegung | MOVIN"
        description="Bei MOVIN vereinen wir führende therapeutische Expertise mit datengestützter Effizienz. Erfahren Sie alles über unsere KI-Leitlinien, Anwendungen und maximalen Datenschutz."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ki/ki-physiotherapie-hero-ki-generiert-nano-banana-2.webp" 
            alt="Therapeutische Bewegungseinheit bei MOVIN mit digitaler Unterstützung" 
            className="w-full h-full object-cover opacity-[0.48]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-secondary/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(0,178,186,0.26),transparent_34%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/35 to-transparent" />
        </div>

        <span className="absolute bottom-6 right-6 z-10 rounded-full border border-white/35 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm backdrop-blur-sm">
          KI-generiert
        </span>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Brain className="w-5 h-5 animate-pulse" /> Innovativ bewegt
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient-teal-mint tracking-tight">
            KI-gestützte Physiotherapie
          </h1>
          <p className="text-xl md:text-2xl text-blue-tint/90 font-light max-w-3xl mx-auto leading-relaxed">
            Bei MOVIN vereinen wir führende therapeutische Expertise mit datengestützter Effizienz.
          </p>
        </div>
      </section>

      {/* Leitidee & Mission */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Vision</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                Innovativ bewegt in die Zukunft der Physiotherapie
              </h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-6">
                Bei MOViN vereinen wir führende therapeutische Expertise mit datengestützter Effizienz. Unser Ziel: Unsere Therapeut*innen durch den Einsatz von Künstlicher Intelligenz (KI) zu entlasten und Ihnen als Patient*innen eine individuellere, effektivere Behandlung zu ermöglichen.
              </p>
              
              <div className="p-6 bg-light rounded-2xl border-l-[4px] border-primary mb-6">
                <p className="text-sm italic text-secondary font-medium">
                  „Im Zeitalter moderner Technologie: Vier Ohren, ein Herz und die Unterstützung von KI – für Ihre Gesundheit.“
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl transform translate-x-4 translate-y-4" />
              <div className="relative z-10 bg-secondary rounded-3xl p-8 md:p-10 text-white shadow-xl border border-secondary-light/20">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Fokus Mensch</h3>
                <p className="text-blue-tint/80 text-sm leading-relaxed mb-6">
                  Die KI ist unser Assistent – nicht unser Entscheidungsträger. Sie entlastet unsere Expert*innen von Routineaufgaben, damit sie sich vollständig auf Ihre Behandlung konzentrieren können.
                </p>
                <div className="space-y-3.5 border-t border-white/10 pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/95">KI assistiert, Therapeut*innen entscheiden</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/95">Weniger Routineaufgaben im Praxisalltag</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/95">Mehr Zeit für Ihre Behandlung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leitlinien für KI */}
      <section className="section-padding bg-light border-y border-border">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Unsere Leitlinien</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Unsere Leitlinien für KI</h2>
            <p className="text-lg text-dark/70">
              Künstliche Intelligenz unterstützt unsere Arbeit dort, wo sie Qualität, Transparenz und Zeit für die Behandlung verbessern kann.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HeartHandshake,
                title: 'Fokus Mensch',
                desc: 'Die KI ist unser Assistent – nicht unser Entscheidungsträger. Sie entlastet unsere Expert*innen von Routineaufgaben, damit sie sich vollständig auf Ihre Behandlung konzentrieren können.'
              },
              {
                icon: Cpu,
                title: 'Qualität durch Analyse',
                desc: 'Unsere KI analysiert Anamnese- und Ergebnisbögen, Anamnesegespräche, Tagesdokumentationen und Therapieergebnisse, um Muster zu erkennen und die Behandlungsqualität stetig zu verbessern.'
              },
              {
                icon: Database,
                title: 'Effizienzgewinn',
                desc: 'KI optimiert Arbeitsprozesse und unterstützt uns dabei, administrative Aufgaben zu reduzieren und mehr Zeit für Sie zu haben.'
              },
              {
                icon: ShieldCheck,
                title: 'Transparenz und Verantwortung',
                desc: 'Datenschutz und Vertraulichkeit stehen bei uns an erster Stelle. Der Einsatz von KI erfolgt immer transparent und gesetzeskonform.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-border/85 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                <p className="text-sm text-dark/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wie KI bei MOVIN eingesetzt wird */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Einsatz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Wie KI bei MOViN eingesetzt wird</h2>
            <p className="text-lg text-dark/70">
              Der Einsatz von KI unterstützt Information, Therapie sowie Verwaltung und Prozessoptimierung im Praxisalltag.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1. Information */}
            <div className="card-base p-8 relative flex flex-col justify-between border border-border/80 hover:border-primary/20 transition-all duration-300">
              <div>
                <span className="text-xs font-bold text-primary/70 tracking-widest uppercase mb-1 block">Bereich 1</span>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Information</h3>
                </div>
                <p className="text-dark/80 text-sm leading-relaxed mb-6">
                  KI analysiert die in unserer App zur Verfügung gestellten Daten und fasst diese treiberorientiert im Sinne des bio-psycho-sozialen Ansatzes zusammen.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Daten aus der MOVIN App strukturiert zusammenfassen
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Treiberorientierte Einordnung von Beschwerden und Red Flags
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Ganzheitlicher bio-psycho-sozialer Ansatz
                  </li>
                </ul>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <span className="text-xs text-dark/50 italic">Beschwerdetreiber und Red Flags sichtbar machen</span>
              </div>
            </div>

            {/* 2. Therapie */}
            <div className="card-base p-8 relative flex flex-col justify-between border-2 border-primary/40 bg-gradient-to-b from-white to-primary/5 shadow-md">
              <div className="absolute top-5 right-6 sm:right-8 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Therapie-Vorteil
              </div>
              <div>
                <span className="text-xs font-bold text-primary/70 tracking-widest uppercase mb-1 block">Bereich 2</span>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Therapie</h3>
                </div>
                <p className="text-dark/80 text-sm leading-relaxed mb-6">
                  Unsere KI hilft dabei, Erstgespräch, Befundung und Tagesdokumentation zusammenzufassen. So können wir den Fokus ohne störendes Mitschreiben auf Sie als Patient*innen legen.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Erstgespräch übersichtlich zusammenfassen
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Befundung und Tagesdokumentation unterstützen
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Mehr Aufmerksamkeit im direkten Patient*innenkontakt
                  </li>
                </ul>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <span className="text-xs text-secondary font-bold flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-primary" /> Fokus ohne störendes Mitschreiben
                </span>
              </div>
            </div>

            {/* 3. Verwaltung & Prozessoptimierung */}
            <div className="card-base p-8 relative flex flex-col justify-between border border-border/80 hover:border-primary/20 transition-all duration-300">
              <div>
                <span className="text-xs font-bold text-primary/70 tracking-widest uppercase mb-1 block">Bereich 3</span>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-default/10 flex items-center justify-center text-orange-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Verwaltung und Prozessoptimierung</h3>
                </div>
                <p className="text-dark/80 text-sm leading-relaxed mb-6">
                  Von der Terminplanung bis zur Dokumentation – KI entlastet unsere Mitarbeiter*innen von administrativen Aufgaben und schafft Raum für das Wesentliche: Ihre Gesundheit.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Terminplanung effizienter unterstützen
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Dokumentation und Abläufe vereinfachen
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Mehr Raum für das Wesentliche schaffen
                  </li>
                </ul>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <span className="text-xs text-dark/50 italic">Prozesse entlasten, Therapiezeit sichern</span>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-light rounded-[2rem] p-5 md:p-8 border border-border/80">
            <div className="lg:col-span-7">
              <figure>
                <img
                  src="/images/ki/ki-physiotherapie-symbolbild-nano-banana-2.webp"
                  alt="KI-generiertes Symbolbild für therapeutische Begleitung mit digitaler Analyse"
                  className="w-full aspect-video object-cover rounded-[1.5rem] shadow-lg"
                />
                <figcaption className="mt-3 text-xs text-dark/50 italic">
                  KI-generiertes Symbolbild.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-5">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Mensch und Technologie</span>
              <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                KI begleitet leise im Hintergrund.
              </h3>
              <p className="text-dark/75 text-sm md:text-base leading-relaxed mb-6">
                Das Motiv greift die zentralen Gedanken der bisherigen KI-Seite neu auf: Zukunft, Fokus Mensch und Datenschutz. Die therapeutische Entscheidung bleibt persönlich, während digitale Analyse Informationen strukturiert und Abläufe entlastet.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 text-sm text-dark/75">
                  <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Therapeutische Beziehung bleibt sichtbar</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-dark/75">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Daten werden geschützt und transparent genutzt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fokus Mensch Video */}
      <section className="section-padding bg-light border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Fokus Mensch</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                KI unterstützt. Therapeut*innen entscheiden.
              </h2>
              <p className="text-dark/75 text-base leading-relaxed mb-6">
                Das Video zeigt den Kern unseres Ansatzes: Moderne Technologie wird dort eingesetzt, wo sie unsere therapeutische Arbeit entlastet und die Behandlung transparenter macht. Die persönliche Betreuung bleibt dabei immer der Mittelpunkt.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/termin/" className="btn-primary justify-center">
                  Termin vereinbaren
                </Link>
                <Link to="/kontakt/" className="btn-outline justify-center">
                  Fragen zur KI stellen
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] overflow-hidden bg-secondary shadow-xl border border-border/70">
                <video
                  src="/videos/ki/fokus-mensch-optimized.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover block"
                  aria-label="MOVIN KI-Physiotherapie Video"
                >
                  Ihr Browser unterstützt das Video-Element nicht.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Datenschutz & Verantwortung */}
      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,178,186,0.1),transparent_50%)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/3">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary mb-6 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Datenschutz & Verantwortung</h2>
                <p className="text-blue-tint/80 text-sm leading-relaxed">
                  Datenschutz hat bei MOViN oberste Priorität.
                </p>
              </div>

              <div className="w-full md:w-2/3 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-primary-light">DSGVO & Patientendaten</h3>
                <p className="text-sm text-blue-tint/90 leading-relaxed mb-6">
                  Datenschutz hat bei MOViN oberste Priorität. Personenbezogene Gesundheitsdaten werden nur zweckgebunden, transparent und mit Einwilligung verarbeitet. KI unterstützt unsere Dokumentation und Auswertung, trifft aber keine automatisierten Therapieentscheidungen. Die Verarbeitung erfolgt nach DSGVO, mit geeigneten technischen und organisatorischen Schutzmaßnahmen und ausschließlich über Anbieter mit Serverstandorten in Deutschland oder der EU.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Strenge Anforderungen der DSGVO</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Database className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Server in Deutschland oder der EU</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Nur zweckgebunden und mit Einwilligung</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Lock className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Keine automatisierten Therapieentscheidungen</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <a
                    href="/docs/ki/einwilligung-in-den-datenschutz.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline border-white/30 text-white hover:bg-white hover:text-secondary text-sm px-5 py-3 justify-center max-w-full whitespace-normal text-center"
                  >
                    Datenschutzerklärung
                  </a>
                  <a
                    href="/docs/ki/aushang-patienteninformation-zum-datenschutz.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline border-white/30 text-white hover:bg-white hover:text-secondary text-sm px-5 py-3 justify-center max-w-full whitespace-normal text-center"
                  >
                    Patienteninformation anfragen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-light text-center border-t border-border">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">Innovativ bewegt in die Zukunft der Physiotherapie</h2>
          <p className="text-dark/70 text-lg mb-10 leading-relaxed">
            Unsere Therapeut*innen bleiben im Mittelpunkt. KI unterstützt dort, wo sie Prozesse entlastet, Informationen bündelt und mehr Zeit für Ihre Behandlung schafft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/termin/" className="btn-cta-cheetah text-base px-8 py-4 w-full sm:w-auto rounded-full">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Termin online vereinbaren
              </span>
            </Link>
            <Link to="/kontakt" className="btn-outline text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
              Frage zu KI stellen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
