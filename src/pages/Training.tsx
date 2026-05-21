import { Link } from 'react-router';
import { 
  Dumbbell, 
  Target, 
  Activity, 
  CheckCircle2, 
  Brain, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  Milestone, 
  Heart 
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function Training() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Medizinisches Training und Prävention bei MOVIN",
    "description": "Erleben Sie die Vielfalt unseres Trainingsangebots in Freiburg: Medizinische Trainingstherapie (MTT), Senso Pro, Skill Court, Return to Sport Analysen und T-RENA Nachsorge.",
    "url": "https://movin-freiburg.de/training/"
  };

  const advantages = [
    {
      title: 'Therapeutische Betreuung',
      desc: 'Alle Trainingsprogramme werden von ausgebildeten Physiotherapeut:innen begleitet und optimiert.'
    },
    {
      title: 'Modernste Geräte & Technologie',
      desc: 'Wir setzen auf innovative Systeme wie den Skill Court und Senso Pro, um Ihr Training auf das nächste Level zu bringen.'
    },
    {
      title: 'Nachhaltigkeit im Fokus',
      desc: 'Wir helfen Ihnen, von der passiven Schmerzlinderung in die aktive, langfristige Schmerzfreiheit überzugehen.'
    },
    {
      title: 'Zertifizierter Gesundheitspartner',
      desc: 'Zulassung für Krankengymnastik am Gerät (KGG), T-RENA (Deutsche Rentenversicherung) sowie diverse Betriebliche Gesundheitsförderungen.'
    }
  ];

  const offerings = [
    {
      id: 'mtt-kgg',
      title: 'Medizinische Trainingstherapie (MTT) & KGG',
      tag: 'Klassische Sporttherapie',
      icon: Dumbbell,
      desc: 'Die Krankengymnastik am Gerät (KGG) ist eine aktive Trainingstherapie, die von Ärzt:innen auf Rezept verschrieben werden kann. In Kleingruppen unter therapeutischer Anleitung verbessern wir gezielt Kraft, Ausdauer, Beweglichkeit und Koordination.',
      highlights: [
        'Auf Kassen- & Privatrezept abrechenbar',
        'Kleinstgruppen mit maximal 3 Personen pro Therapeut',
        'Gezielter Muskelaufbau nach Verletzungen & OPs',
        'Individuell angepasste gerätegestützte Übungen'
      ],
      color: 'border-primary/20 bg-primary/2'
    },
    {
      id: 'senso-pro',
      title: 'Senso Pro Training',
      tag: 'Koordinations-Sensation',
      icon: Activity,
      desc: 'Das innovative Koordinations- und Gleichgewichtstraining aus der Schweiz. Senso Pro kombiniert Stabilisierungsübungen auf federnden Riemen mit kognitiven Video-Vorgaben und elastischen Seilzügen. Perfekt für Sturzprophylaxe, Rehabilitation und Profisportler:innen.',
      highlights: [
        'Erhöht die neuronale Steuerung und Gelenkstabilität',
        'Spielerisches und hocheffizientes Ganzkörpertraining',
        'Schonend für Gelenke, intensiv für die tiefe Muskulatur',
        'Eigene Trainingskurse für jedes Alter und Leistungslevel'
      ],
      color: 'border-[#00b2ba]/20 bg-[#00b2ba]/2'
    },
    {
      id: 'skill-court',
      title: 'Skill Court Training',
      tag: 'Gehirn- & Schnelligkeitstraining',
      icon: Brain,
      desc: 'Der Skill Court vereint körperliches Training mit visuell-kognitiven Aufgaben. Durch sensorische Laufplatten und einen interaktiven Screen trainiert man Schnelligkeit, Reaktion und visuelle Wahrnehmung. Ideal zur Prävention von Demenz, nach Schlaganfällen oder zur kognitiven Leistungssteigerung im Sport.',
      highlights: [
        'Schnelligkeitstraining für Kopf und Beine zeitgleich',
        'Wissenschaftlich fundiertes Neuroathletik-Konzept',
        'Verbessert Reaktionszeiten und die Raumwahrnehmung',
        'Beliebt im Profifußball und zur neurologischen Rehabilitation'
      ],
      color: 'border-blue-default/20 bg-blue-default/2'
    },
    {
      id: 'return-to-sport',
      title: 'Return to Sport (RTS) Analysen',
      tag: 'Sicher zurück in den Sport',
      icon: Target,
      desc: 'Nach orthopädischen Eingriffen (z.B. Kreuzbandriss, Meniskusnaht, Sprunggelenksverletzungen) entscheiden klinische Tests über die Freigabe zur sportlichen Belastung. Unsere zertifizierten RTS-Analyserezepte und Testbatterien geben Ihnen und Ihren Ärzt:innen absolute Sicherheit beim Wiedereinstieg.',
      highlights: [
        'Standardisierte, wissenschaftlich evaluierte Testbatterien',
        'Kraft-, Stabilitäts- und Sprunganalyse im Seitenvergleich',
        'Zertifikaterstellung und detaillierter Ergebnisbericht',
        'Minimiert das Risiko von Wiederverletzungen signifikant'
      ],
      color: 'border-secondary/20 bg-secondary/2'
    },
    {
      id: 't-rena',
      title: 'T-RENA (Deutsche Rentenversicherung)',
      tag: 'Geförderte Reha-Nachsorge',
      icon: Award,
      desc: 'Die Trainingstherapeutische Rehabilitationsnachsorge (T-RENA) ist ein gerätegestütztes Nachsorgeprogramm der Rentenversicherung. Nach einer medizinischen Rehabilitation hilft es Ihnen, die erzielten Behandlungserfolge nachhaltig in den Alltag zu überführen – und das vollkommen kostenfrei für Sie.',
      highlights: [
        'Komplette Kostenübernahme durch die DRV',
        '26 Trainingseinheiten (meist verlängerbar auf 52)',
        'Einstieg innerhalb von 4 bis maximal 6 Wochen nach Entlassung',
        'Inhaltsstarkes, gerätegestütztes Ausdauer- und Krafttraining'
      ],
      color: 'border-[#0a0f4d]/20 bg-[#0a0f4d]/2'
    }
  ];

  return (
    <>
      <SEO 
        title="Training & Prävention Freiburg | Senso Pro, Skill Court, T-RENA | MOVIN"
        description="Medizinisches Kraft- und Koordinationstraining in Freiburg. Entdecken Sie unser exklusives Angebot: MTT, KGG, Senso Pro, Skill Court, RTS-Diagnostik und T-RENA."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
            alt="Patienten beim medizinischen Training an Hightech-Geraeten" 
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Dumbbell className="w-5 h-5" /> Training bei MOVIN
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient-teal-mint tracking-tight">
            Bewegung & Nachhaltigkeit
          </h1>
          <p className="text-xl md:text-2xl text-blue-tint/90 max-w-3xl mx-auto font-light leading-relaxed">
            Wir bieten Ihnen an beiden Standorten in Freiburg eine große Vielfältigkeit an Trainingsmöglichkeiten. Damit setzen wir uns räumlich und qualitativ von konventionellen Fitnessstudios ab.
          </p>
        </div>
      </section>

      {/* Ihre Vorteile bei MOVIN */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Ihr Mehrwert</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                Warum Training bei MOVIN Freiburg?
              </h2>
              <p className="text-dark/80 text-base leading-relaxed mb-6">
                Der Ursprung des heutigen „Functional Training“ liegt in den Bereichen der Physiotherapie. Mit unserem ganzheitlichen Ansatz verbinden wir orthopädisch fundiertes medizinisches Training mit innovativer Spitzensport-Technologie. 
              </p>
              <p className="text-dark/70 text-sm leading-relaxed mb-8">
                „Gesundheit ist kein Geschenk – sondern eine lebenslange Aufgabe.“ Dieses Kneipp-Zitat leitet uns. Wir begleiten Sie mit Herz und Verstand auf Ihrem Trainingspfad.
              </p>
              
              <div className="border border-border rounded-3xl p-6 bg-light text-center">
                <p className="text-xs text-dark/60 font-semibold mb-2">PARTNERSCHAFTEN & NETZWERK</p>
                <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-secondary">
                  <span className="bg-white px-3 py-1.5 rounded-full border border-border shadow-xs">Hansefit</span>
                  <span className="bg-white px-3 py-1.5 rounded-full border border-border shadow-xs">Urban Sports Club (USC)</span>
                  <span className="bg-white px-3 py-1.5 rounded-full border border-border shadow-xs">Wellhub (Gympass)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((adv, idx) => (
                <div key={idx} className="bg-light p-6 rounded-3xl border border-border/60 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{adv.title}</h3>
                  <p className="text-xs text-dark/75 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unser Trainingsangebot */}
      <section className="section-padding bg-light border-t border-border">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Moderne Vielfalt</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Unser vielseitiges Trainingsangebot</h2>
            <p className="text-lg text-dark/85">
              Ob auf Rezept, vollgefördert durch den Staat oder als Selbstzahlerleistung – wir stimmen Ihr Training exakt auf Ihren Bewegungsapparat ab.
            </p>
          </div>

          <div className="space-y-12">
            {offerings.map((offering, index) => {
              const IconComp = offering.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={offering.id}
                  id={offering.id}
                  className={`bg-white rounded-[2.5rem] border border-border/80 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                    
                    {/* Visual & Highlights */}
                    <div className={`lg:col-span-5 order-2 lg:order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <span className="text-xs font-bold text-primary tracking-widest uppercase block mb-1">{offering.tag}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 flex items-center gap-2.5">
                        <IconComp className="w-7 h-7 text-primary" /> {offering.title}
                      </h3>
                      <p className="text-dark/80 text-sm leading-relaxed mb-6">
                        {offering.desc}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-border">
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Ihre Vorteile im Detail:</h4>
                        {offering.highlights.map((hlt, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#00b2ba] shrink-0 mt-0.5" />
                            <span className="text-xs text-dark/80 leading-tight">{hlt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Descriptive Image Spacer / Quick Info Card */}
                    <div className={`lg:col-span-7 order-1 lg:order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'} bg-light rounded-[2rem] p-8 border border-border/60 relative overflow-hidden h-full flex flex-col justify-between`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-12 -translate-y-12 shrink-0 pointer-events-none" />
                      
                      <div>
                        <div className="inline-flex items-center gap-1.5 bg-secondary text-white text-xs px-3 py-1 rounded-full font-bold mb-6">
                          <ShieldCheck className="w-3.5 h-3.5" /> Geprüfte Qualität
                        </div>
                        <h4 className="text-xl font-bold text-secondary mb-3">Wie startet Ihr Einstieg bei uns?</h4>
                        <p className="text-xs text-dark/70 leading-relaxed mb-6">
                          Jeder Trainingsweg beginnt mit einem eingehenden Eingangscheckup. Wir prüfen Ihre Gelenkstellungen, Schmerzpunkte und Vorerkrankungen und stellen so sicher, dass Sie absolut schmerzlindernd und zielorientiert trainieren können.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center justify-between border-t border-border/60 pt-6">
                        <span className="text-xs text-secondary/65 font-medium">Behandlung an beiden Praxisstandorten möglich.</span>
                        <Link 
                          to="/termin/" 
                          className="text-xs font-bold text-primary flex items-center gap-1 group-hover:text-primary-dark transition-colors"
                        >
                          Einstieg buchen <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner & Firmennetzwerk */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Firmenfitness & Kooperationen</span>
          <h2 className="text-3xl font-bold text-secondary mb-6">Trainieren über Ihren Arbeitgeber</h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto mb-10">
            Wir unterstützen betriebliches Gesundheitsmanagement. Wenn Sie Mitglied bei einem unserer Partnernetzwerke sind, können Sie unser freies medizinisches Training nutzen.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-85 mb-10">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-secondary tracking-tight">Hansefit</span>
              <span className="text-[10px] text-dark/50 uppercase font-bold tracking-widest">Premium Partner</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#111111] tracking-tight">Urban Sports Club</span>
              <span className="text-[10px] text-dark/50 uppercase font-bold tracking-widest">Studio-Inhaber</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-teal-600 tracking-tight">Wellhub</span>
              <span className="text-[10px] text-dark/50 uppercase font-bold tracking-widest">(ehem. Gympass)</span>
            </div>
          </div>
          
          <div className="max-w-xl mx-auto text-xs text-dark/60 leading-relaxed pt-4 border-t border-border">
            Bitte bringen Sie zu Ihrem ersten Training Ihre jeweilige App oder Ihren Mitgliedsausweis mit. Ein vorheriger Eingangscheckup ist aus therapeutischer Sicht zwingend erforderlich, um ein verletzungsfreies Training zu gewährleisten.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,178,186,0.15),transparent_40%)] pointer-events-none" />
        <div className="container-custom max-w-3xl relative z-10">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">Machen Sie Ihre Gesundheit zur Priorität</h2>
          <p className="text-blue-tint/90 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Ganz gleich, ob Sie auf Rezept (KGG), über die Rentenversicherung (T-RENA) oder im Rahmen von Firmenfitness trainieren möchten – wir haben das richtige Angebot für Sie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/termin/" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Beratungstermin vereinbaren
            </Link>
            <Link to="/leistungen" className="text-white/80 hover:text-white font-bold text-sm underline underline-offset-4 tracking-wide w-full sm:w-auto">
              Zur Leistungsübersicht
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
