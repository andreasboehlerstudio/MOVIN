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
    "name": "Training, Bewegung und Nachhaltigkeit bei MOVIN",
    "description": "Medizinische Trainingstherapie, Senso Pro, Skill Court, Return to Work, Sport und Competition sowie T-RENA Nachsorge bei MOVIN Freiburg.",
    "url": "https://movin-freiburg.de/training/"
  };

  const advantages = [
    {
      title: 'Medizinische Trainingsqualität',
      desc: 'Training bei MOVIN ist kein klassisches Fitnessstudio-Angebot, sondern therapeutisch geplant, medizinisch eingeordnet und sauber eingeführt.'
    },
    {
      title: 'Selbstständig trainieren, Betreuung buchen',
      desc: 'Nach einer Einweisung können Sie eigenständig trainieren. Zusätzliche Betreuung oder Re-Checks lassen sich flexibel dazu buchen.'
    },
    {
      title: 'Nachhaltigkeit im Fokus',
      desc: 'Wir helfen Ihnen, von kurzfristiger Beschwerdelinderung in langfristige Belastbarkeit, Eigenverantwortung und Bewegungssicherheit zu kommen.'
    },
    {
      title: 'Rezept, Selbstzahler oder Kostenerstattung',
      desc: 'Je nach Angebot trainieren Sie auf Rezept, als Selbstzahler, über Firmenfitness, nach DRV-Vorgaben oder über zertifizierte Präventionskurse.'
    }
  ];

  const offerings = [
    {
      id: 'mtt-kgg',
      title: 'Medizinische Trainingstherapie',
      tag: 'MTT, KGG & Selbstzahlertraining',
      icon: Dumbbell,
      desc: 'Trainieren Sie mit medizinisch zugelassenen Geräten und der Vielfalt eines funktionellen Trainingsbereichs. Neben klassischem Kraftaufbau an Geräten arbeiten wir mit Eigenkörpertraining, TRX, Speed Track, Cubewand, Langhanteln, Kettlebells, Kletterwand, Jumps, Plyobox, Balance-Elementen und BlazePod-Training.',
      highlights: [
        'Als KGG auf Rezept oder als Selbstzahlerbereich nutzbar',
        'Abgrenzung zum Fitnessstudio durch medizinisch-therapeutische Trainingsqualität',
        'Einstieg mit Einweisung, danach selbstständiges Training möglich',
        'Betreuung, Anpassung und Re-Checks flexibel buchbar'
      ],
      image: '/images/standorte/mooswald/mooswald-gallery-3.jpg',
      imageAlt: 'Medizinische Trainingstherapie an Geräten bei MOVIN',
      infoTitle: 'Der Einstieg',
      info: 'Wir starten mit einer Einweisung, prüfen Belastbarkeit und Trainingsziele und geben Ihnen danach einen klaren Plan für das eigenständige Training.',
      badge: 'Medizinisch statt beliebig'
    },
    {
      id: 'senso-pro',
      title: 'Senso Pro Training',
      tag: 'Koordination, Reha & Alltagssicherheit',
      icon: Activity,
      desc: 'Die SensoPro Luna ist ein vielseitiges Koordinationstraining für Fitness, Physiotherapie, Reha und Spitzensport. Videobasierte Übungen in verschiedenen Levels verbinden Gleichgewicht, Stabilität, aktive Regeneration und alltagsrelevante Belastbarkeit.',
      highlights: [
        'Als Selbstzahlertraining möglich',
        'Einstieg mit Einweisung, danach selbstständiges Training möglich',
        'Für Jung und Alt, von Reha bis Spitzensport',
        'Ganzheitliches, wissenschaftlich fundiertes Koordinationstraining'
      ],
      image: '/images/standorte/mooswald/mooswald-gallery-2.jpg',
      imageAlt: 'Trainingsbereich bei MOVIN Freiburg Mooswald',
      infoTitle: 'SensoPro passt sich an',
      info: 'Ob Warm-up, Hauptteil, Cool-down, hochintensives Training oder aktive Regeneration: Die Intensität wird über Levels und Übungsauswahl gesteuert.',
      badge: 'Videobasiert & levelbasiert'
    },
    {
      id: 'skill-court',
      title: 'Skill Court Training',
      tag: 'Kopf, Reaktion & Beweglichkeit',
      icon: Brain,
      desc: 'Auf dem Skill Court trainieren Sie Wahrnehmung, Reaktion, Handlungsschnelligkeit, Beschleunigen, Abbremsen und Richtungswechsel. Aktuell stehen zahlreiche Tests und Übungen in verschiedenen Levels zur Verfügung; das System erstellt daraus individuelle Trainingsprofile.',
      highlights: [
        'Als Selbstzahlertraining möglich',
        'Schnelligkeit beginnt im Kopf: kognitive und motorische Reize kombiniert',
        '§20-Präventionskurs online kaufen und 8 Wochen absolvieren',
        '80-100 % Kostenerstattung durch die Krankenkasse, danach 3 Monate kostenlos weiter trainieren'
      ],
      image: '/images/standorte/mooswald/mooswald-gallery-5.jpg',
      imageAlt: 'Therapeutische Einweisung und Trainingsplanung bei MOVIN',
      infoTitle: 'Besonderheit §20',
      info: 'Der Präventionsweg ist besonders attraktiv: Kurs buchen, acht Wochen Training absolvieren, Erstattung bei der Krankenkasse einreichen und anschließend drei Monate kostenlos weiter trainieren.',
      badge: '§20 möglich'
    },
    {
      id: 'return-to-sport',
      title: 'Return to Work / Sport / Competition',
      tag: 'Sichere Rückführung nach Belastungspause',
      icon: Target,
      desc: 'Mit individuellen Testungen sichern wir die Rückkehr in Arbeit, Sport oder Wettkampf ab. Beweglichkeit, Muskelkraft, Reaktionskraft, Sprungkraft und Ausdauer werden strukturiert geprüft und verständlich ausgewertet.',
      highlights: [
        'Return to Work: alltags- und berufsspezifische Belastbarkeit prüfen',
        'Return to Sport: sportliche Leistungsfähigkeit nach Verletzung oder Pause absichern',
        'Return to Competition: umfangreichere Testung für hohe sportliche Anforderungen',
        'Zertifikat und Auswertung als Entscheidungshilfe für den nächsten Schritt'
      ],
      image: '/images/standorte/mooswald/mooswald-gallery-6.jpg',
      imageAlt: 'Therapeutisch begleitetes Training bei MOVIN',
      infoTitle: 'Drei Stufen, passender Aufwand',
      info: 'Je nach Ziel unterscheiden sich Testumfang und Zeitaufwand. Return to Sport orientiert sich an der bestehenden Analyse von ca. 75 Minuten; Work und Competition werden passend zum Belastungsprofil geplant.',
      badge: 'Work, Sport, Competition'
    },
    {
      id: 't-rena',
      title: 'Deutsche Rentenversicherung',
      tag: 'T-RENA Reha-Nachsorge',
      icon: Award,
      desc: 'Die trainingstherapeutische Nachsorge ermöglicht Ihnen, nach dem Fachkonzept der Deutschen Rentenversicherung bei MOVIN weiter zu trainieren. Wir übertragen unsere therapeutische Qualität auf die gesetzlichen Vorgaben und begleiten Sie positiv auf Ihrem Genesungsweg.',
      highlights: [
        'Training auf Basis gesetzlicher DRV-Vorgaben',
        '1 Einweisung plus 39 Trainingseinheiten über das gesamte Jahr',
        'Individueller Trainingsplan auf Basis Ihres Reha-Ziels',
        'Betreuung in Präsenzzeiten durch unser physiotherapeutisches Team'
      ],
      image: '/images/standorte/mooswald/mooswald-gallery-4.jpg',
      imageAlt: 'Beratung und Einweisung für Training bei MOVIN',
      infoTitle: 'Nachsorge mit Struktur',
      info: 'Wir entwickeln mit Ihnen den Trainingsplan und begleiten die Umsetzung im Rahmen des DRV-Konzepts.',
      badge: '1 + 39 Einheiten'
    }
  ];

  return (
    <>
      <SEO 
        title="Training & Bewegung Freiburg | MTT, Senso Pro, Skill Court | MOVIN"
        description="Medizinisches Training in Freiburg: MTT, Senso Pro, Skill Court, Return to Work/Sport/Competition und T-RENA Nachsorge mit therapeutischer Qualität."
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
            Wir bieten Ihnen in Freiburg eine große Vielfalt medizinischer Trainingsmöglichkeiten. Damit setzen wir uns nicht nur räumlich, sondern vor allem qualitativ von konventionellen Fitnessstudios ab.
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
                Der Ursprung des heutigen Functional Trainings liegt in der Physiotherapie. Bei MOVIN verbinden wir orthopädisch fundiertes medizinisches Training mit moderner Trainingsfläche, digitaler Analyse und Technologien aus Reha und Spitzensport. 
              </p>
              <p className="text-dark/70 text-sm leading-relaxed mb-8">
                „Gesundheit ist kein Geschenk – sondern eine lebenslange Aufgabe.“ Dieses Kneipp-Zitat leitet uns. Wir begleiten Sie mit Herz, Fachwissen und einem Trainingsweg, der zu Ihrer Belastbarkeit passt.
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
              Ob auf Rezept, als Selbstzahlerleistung, über Präventionskurs, Firmenfitness oder Deutsche Rentenversicherung: Wir stimmen Ihr Training auf Ziel, Belastbarkeit und Alltag ab.
            </p>
          </div>

          <div className="space-y-12">
            {offerings.map((offering, index) => {
              const IconComp = offering.icon;

              return (
                <div 
                  key={offering.id}
                  id={offering.id}
                  className={`bg-white rounded-[2.5rem] border border-border/80 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                    
                    {/* Content & Highlights */}
                    <div className="lg:col-span-5">
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

                    {/* Visual & Quick Info */}
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-secondary min-h-[360px]">
                        <img
                          src={offering.image}
                          alt={offering.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/15 to-transparent" />
                        <div className="absolute left-6 top-6 inline-flex items-center gap-1.5 bg-white/95 text-secondary text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> {offering.badge}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                          <div className="max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/70">
                            <h4 className="text-lg font-bold text-secondary mb-2">{offering.infoTitle}</h4>
                            <p className="text-xs text-dark/75 leading-relaxed mb-4">
                              {offering.info}
                            </p>
                            <div className="flex flex-wrap gap-4 items-center justify-between border-t border-border/70 pt-4">
                              <span className="text-xs text-secondary/65 font-medium">Training bei MOVIN Freiburg.</span>
                              <Link 
                                to="/termin/" 
                                className="text-xs font-bold text-primary flex items-center gap-1 transition-colors hover:text-primary-dark"
                              >
                                Einstieg buchen <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
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
            <Link to="/termin/" className="btn-cta-cheetah text-base px-8 py-4 w-full sm:w-auto rounded-full">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Beratungstermin vereinbaren
              </span>
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
