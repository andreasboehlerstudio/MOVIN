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
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="KI-gestützte Physiotherapie und Bewegungsanalyse" 
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />
        </div>
        
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
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Unsere Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                Zukunft der Physiotherapie aktiv gestalten
              </h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-6">
                Physiotherapie befindet sich im Wandel. Unser Ziel ist es, unsere Therapeut:innen durch den Einsatz von Künstlicher Intelligenz (KI) gezielt zu entlasten und Ihnen als Patient:in eine noch individuellere, effektivere und transparentere Behandlung zu ermöglichen.
              </p>
              <p className="text-base text-dark/70 mb-8 leading-relaxed">
                KI dient uns hierbei als präzises Hilfsmittel, um motorische Muster, Dysbalancen und Therapieverschreibungen zu optimieren. Das bedeutet: Bessere Ergebnisse durch evidenzbasierte Analysen, ohne den persönlichen und menschlichen Bezug zu verlieren.
              </p>
              
              <div className="p-6 bg-light rounded-2xl border-l-[4px] border-primary mb-6">
                <p className="text-sm italic text-secondary font-medium">
                  "Die KI soll und kann den Menschen nie ersetzen. Aber ein Team, das KI-Werkzeuge zielführend und fachgerecht einsetzt, wird stets eine überlegene Qualität in der Betreuung und Analytik bieten."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl transform translate-x-4 translate-y-4" />
              <div className="relative z-10 bg-secondary rounded-3xl p-8 md:p-10 text-white shadow-xl border border-secondary-light/20">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Mensch + Technologie</h3>
                <p className="text-blue-tint/80 text-sm leading-relaxed mb-6">
                  Technologischer Vorsprung wird bei uns mit menschlicher Zuwendung kombiniert. Jedes Ergebnis und jede Empfehlung wird von ausgebildeten Therapeut:innen überprüft und gemeinsam mit Ihnen umgesetzt.
                </p>
                <div className="space-y-3.5 border-t border-white/10 pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/95">Therapeutische Letztentscheidung & Expertise</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/95">Sinnvolle Entlastung von reiner Administration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/95">Gesteigerte Zeit für aktive Hands-on Behandlungen</span>
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
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Unsere Werte</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Leitlinien für KI bei MOVIN</h2>
            <p className="text-lg text-dark/70">
              Ein verantwortungsvoller Umgang mit modernen Technologien zeichnet uns aus. Diese Prinzipien leiten uns bei jedem digitalen Prozess:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HeartHandshake,
                title: 'Mensch im Mittelpunkt',
                desc: 'Die KI dient ausschließlich als Assistenzsystem. Den Kern der Behandlung bildet stets die empathische therapeutische Betreuung.'
              },
              {
                icon: ShieldCheck,
                title: 'Absoluter Datenschutz',
                desc: 'Datenminimierung und verschlüsselte, DSGVO-konforme Übermittlungen schützen Ihre Privatsphäre zu jedem Zeitpunkt.'
              },
              {
                icon: Cpu,
                title: 'Geprüfte Qualität',
                desc: 'Wir setzen ausschließlich softwareseitig zertifizierte Medizinprodukte ein, die den höchsten Standards entsprechen.'
              },
              {
                icon: Info,
                title: 'Volle Transparenz',
                desc: 'Wir erklären Ihnen genau, welche Hilfsmittel wir nutzen und warum. Es gibt keine unklaren Blackbox-Entscheidungen.'
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
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Praktischer Nutzen</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Wie KI bei uns eingesetzt wird</h2>
            <p className="text-lg text-dark/70">
              Der Nutzen von Künstlicher Intelligenz erstreckt sich über drei wesentliche Teilbereiche unseres Praxis- und Therapiealltags:
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
                  Aufbereitung und Bereitstellung medizinischen Wissens. Unsere Systeme unterstützen Therapeuten dabei, wissenschaftliche Studien, evidenzbasierte Behandlungspfade und anatomische Zusammenhänge in Sekundenschnelle zu recherchieren.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Rechercheunterstützung nach neuesten Evidenzen
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Kopplung von Bewegungsmustern mit Sportwissenschaft
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Individuell zugeschnittenes Patient:innen-Wissen
                  </li>
                </ul>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <span className="text-xs text-dark/50 italic">Unterstützt Wissensaufbereitung</span>
              </div>
            </div>

            {/* 2. Therapie */}
            <div className="card-base p-8 relative flex flex-col justify-between border-2 border-primary/40 bg-gradient-to-b from-white to-primary/5 shadow-md">
              <div className="absolute -top-3.5 left-8 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Therapie-Vorteil
              </div>
              <div>
                <span className="text-xs font-bold text-primary/70 tracking-widest uppercase mb-1 block mt-2">Bereich 2</span>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Therapie</h3>
                </div>
                <p className="text-dark/80 text-sm leading-relaxed mb-6">
                  KI-gesteuerte Analysen und Trainingsbegleitungen. Mithilfe modernster Kamerasensoren messen wir in Gelenkwinkeln Ihre Bewegung im Raum. KI hilft dabei, Dysbalancen, Limits und Abweichungen im Vergleich zu Standardmustern millimetegenau zu erfassen.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    3D-Gelenkwinkel- & Belastungsanalyse in Echtzeit
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Objektive Fortschrittsüberwachung & Berichterstellung
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Personalisierte Trainingsplangeschwindigkeit & -tiefe
                  </li>
                </ul>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <span className="text-xs text-secondary font-bold flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-primary" /> Medizinisch validiert
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
                  <h3 className="text-2xl font-bold text-secondary">Prozessoptimierung</h3>
                </div>
                <p className="text-dark/80 text-sm leading-relaxed mb-6">
                  Vereinfachung von Administration und Bürokratie. Wir nutzen smarte Algorithmen zur effizienten Organisation des digitalen Anamnesebogens und zur optimalen Ablaufplanung in unseren Freiburger Studios.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Digitaler, bequemer Anamnese-Import
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Schnelle, reibungslose Dokumentation & Terminierung
                  </li>
                  <li className="flex items-start gap-3.5 text-xs text-dark/75">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Therapeut:innen haben mehr Zeit für Sie
                  </li>
                </ul>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <span className="text-xs text-dark/50 italic">Weniger Administration, mehr Therapie</span>
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
                  Gesundheitsdaten gehören zu den am stärksten schützenswerten Informationen. Es ist unsere absolute Verantwortung, diese im Einklang mit der DSGVO bestmöglich zu sichern.
                </p>
              </div>

              <div className="w-full md:w-2/3 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-primary-light">Sicherer DSGVO-Vertrag & Handhabung</h3>
                <p className="text-sm text-blue-tint/90 leading-relaxed mb-6">
                  Bei der Nutzung jeder Software schließen wir umfassende Verträge zur Auftragsverarbeitung (AVV) ab. Wir stellen zudem sicher, dass alle Daten server- und datenbankseitig verschlüsselt in deutschen bzw. europäischen Rechenzentren (nach EU-Standards) verwaltet werden.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Streng DSGVO-konform</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Database className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Hosting in Deutschland (EU)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Anonymisierung als Standard</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Lock className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-xs text-white/95">Verschlüsselte Verbindungen</span>
                  </div>
                </div>

                <p className="text-xs text-blue-tint/60 leading-relaxed">
                  Über die genauen Datenströme informieren wir Sie gerne bei Ihrem Ersttermin oder in unserer ausführlichen Datenschutzerklärung. Ihr Einverständnis ist zu jedem Zeitpunkt Voraussetzung.
                </p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">Möchten Sie die Therapie der Zukunft erleben?</h2>
          <p className="text-dark/70 text-lg mb-10 leading-relaxed">
            Nutzen Sie modernste Bewegungsanalysen und maßgeschneiderte Programme für Ihre dauerhafte Fitness und Schmerzfreiheit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/termin/" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Termin online vereinbaren
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
