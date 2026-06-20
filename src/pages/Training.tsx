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
  Heart,
  PlayCircle,
  Monitor,
  Eye,
  Repeat2
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';
import { GdprEmbed } from '../components/gdpr/GdprEmbed';

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
      image: '/images/standorte/mooswald/mooswald-gallery-3.webp',
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
      image: '/images/training/sensopro-training.webp',
      imageAlt: 'Senso Pro Koordinationstraining mit freischwingender Standfläche',
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
      image: '/images/training/skillcourt-training-optimized.webp',
      imageAlt: 'Skillcourt Dual-Task Training mit Bodenraster und Bildschirm',
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
      image: '/images/standorte/mooswald/mooswald-gallery-6.webp',
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
      image: '/images/training/t-rena-ki-symbolbild.webp',
      imageAlt: 'Ältere Person beim therapeutisch begleiteten Reha-Nachsorge-Training',
      imageCaption: 'KI-generiertes Symbolbild',
      infoTitle: 'Nachsorge mit Struktur',
      info: 'Wir entwickeln mit Ihnen den Trainingsplan und begleiten die Umsetzung im Rahmen des DRV-Konzepts.',
      badge: '1 + 39 Einheiten',
      logoOverlay: 'drv'
    }
  ];

  const priceNotes = [
    {
      icon: Milestone,
      title: 'Flexible Abokarten',
      desc: 'Für selbstständiges Training stehen Abokarten und flexible Modelle ohne langfristige Bindung zur Verfügung.'
    },
    {
      icon: Zap,
      title: 'Shop in der MOVIN App',
      desc: 'Abokarten und ausgewählte Trainingsangebote können über den App-Shop reserviert oder bezahlt werden.'
    },
    {
      icon: Heart,
      title: 'Passender Einstieg',
      desc: 'Vor dem ersten Training planen wir Einweisung, Zielsetzung und Tarif passend zu Rezept, Selbstzahlertraining oder Firmenfitness.'
    }
  ];

  const skillcourtVideoUrl = 'https://www.youtube.com/embed/Uq0wtadfhiY?rel=0';
  const skillcourtFlow = [
    {
      icon: Monitor,
      title: 'Reiz sehen',
      desc: 'Aufgaben und Lichtsignale geben den Impuls.',
      color: 'bg-primary text-white',
      ring: 'border-primary/25'
    },
    {
      icon: Eye,
      title: 'Wahrnehmen',
      desc: 'Augen und Aufmerksamkeit erfassen die Situation.',
      color: 'bg-mint text-secondary',
      ring: 'border-primary/15'
    },
    {
      icon: Brain,
      title: 'Verarbeiten',
      desc: 'Das Gehirn verknüpft Reiz, Entscheidung und Bewegung.',
      color: 'bg-secondary text-white',
      ring: 'border-secondary/20'
    },
    {
      icon: Activity,
      title: 'Reagieren',
      desc: 'Der Körper setzt die passende Bewegung direkt um.',
      color: 'bg-primary text-white',
      ring: 'border-primary/25'
    },
    {
      icon: Repeat2,
      title: 'Feedback',
      desc: 'Tests und Trainingsprofile machen Fortschritt sichtbar.',
      color: 'bg-mint text-secondary',
      ring: 'border-primary/15'
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
            src="/images/training/sensopro-training.webp" 
            alt="Patienten beim medizinischen Training an Hightech-Geräten" 
            decoding="async"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-secondary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/50" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary-light font-semibold uppercase tracking-wider text-sm mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
            <Dumbbell className="w-5 h-5" /> Training bei MOVIN
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gradient-teal-mint tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
            Bewegung & Nachhaltigkeit
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)]">
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
                      <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-secondary aspect-[16/10] min-h-[300px]">
                          <img
                            src={offering.image}
                            alt={offering.imageAlt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 bg-white text-secondary text-xs px-3 py-1.5 rounded-full font-bold shadow-md ring-1 ring-secondary/10">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> {offering.badge}
                          </div>
                          {offering.logoOverlay === 'drv' && (
                            <div className="absolute left-5 bottom-5 max-w-[calc(100%-2.5rem)] rounded-2xl bg-white/95 px-4 py-3 shadow-lg border border-white/80">
                              <div className="flex flex-col gap-2">
                                <img
                                  src="/images/logos/deutsche-rentenversicherung-logo.svg"
                                  alt="Deutsche Rentenversicherung"
                                  className="h-8 w-auto max-w-[220px]"
                                  loading="lazy"
                                />
                                <p className="text-[11px] font-semibold text-dark/60">
                                  T-RENA Reha-Nachsorge
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        {'imageCaption' in offering && offering.imageCaption && (
                          <p className="text-[11px] text-dark/45 italic text-right -mt-1">
                            {offering.imageCaption}
                          </p>
                        )}

                        <div className="rounded-2xl border border-border/80 bg-light p-5 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-secondary mb-2">{offering.infoTitle}</h4>
                              <p className="text-xs text-dark/75 leading-relaxed">
                                {offering.info}
                              </p>
                            </div>
                            <Link
                              to="/termin/"
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-primary shrink-0"
                            >
                              Einstieg buchen <ChevronRight className="w-4 h-4" />
                            </Link>
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

      {/* Skillcourt Video & Funktionsgrafik */}
      <section className="section-padding bg-white border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> Skillcourt im Detail
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Mehr als Geh(h)irn-Training
              </h2>
              <p className="text-dark/75 text-sm leading-relaxed mb-6">
                Das Skillcourt-Training verbindet Bewegung mit visuellen und kognitiven Aufgaben. So werden Wahrnehmung, Reaktion, Handlungsschnelligkeit und Richtungswechsel nicht isoliert, sondern in realistischen Belastungssituationen trainiert.
              </p>
              <div className="relative">
                <div className="absolute left-7 top-10 bottom-10 w-px bg-gradient-to-b from-primary via-secondary/25 to-primary/40" />
                <div className="space-y-4">
                  {skillcourtFlow.map((step) => {
                    const StepIcon = step.icon;

                    return (
                      <div key={step.title} className="relative flex gap-4">
                        <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm ${step.color}`}>
                          <StepIcon className="w-6 h-6" />
                        </div>
                        <div className={`flex-1 rounded-2xl border ${step.ring} bg-white px-5 py-4 shadow-sm`}>
                          <h3 className="text-base font-bold text-secondary mb-1">{step.title}</h3>
                          <p className="text-xs leading-relaxed text-dark/70">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-secondary shadow-xl">
                <GdprEmbed category="marketing" provider="YouTube">
                  <iframe
                    src={skillcourtVideoUrl}
                    title="Skillcourt Training Video"
                    className="w-full aspect-video border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </GdprEmbed>
              </div>
              <div className="mt-5 flex justify-start sm:justify-end">
                <a
                  href="https://www.youtube.com/watch?v=Uq0wtadfhiY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-primary"
                >
                  Auf YouTube ansehen <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preise & Abokarten */}
      <section className="section-padding bg-white border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Preise & Abokarten</span>
              <h2 className="text-3xl font-bold text-secondary mb-4">Training flexibel weiterführen</h2>
              <p className="text-sm text-dark/75 leading-relaxed">
                Wer nach der Therapie oder unabhängig vom Rezept weiter trainieren möchte, kann bei MOVIN flexible Abokarten und Monatsmodelle nutzen. Die konkrete Auswahl stimmen wir beim Einstieg auf Ziel, Belastbarkeit und Standort ab.
              </p>
              <a
                href="/docs/training/preisliste-juni-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-primary"
              >
                Preisliste Juni 2025 öffnen <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {priceNotes.map((item) => {
                const IconComp = item.icon;

                return (
                  <div key={item.title} className="rounded-2xl border border-border/80 bg-light p-6">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-secondary mb-2">{item.title}</h3>
                    <p className="text-xs text-dark/75 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Partner & Firmennetzwerk */}
      <section className="section-padding bg-light border-t border-border">
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
      <section className="py-20 cta-footer-gradient text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,178,186,0.15),transparent_40%)] pointer-events-none" />
        <div className="container-custom max-w-3xl relative z-10">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.35)]">Machen Sie Ihre Gesundheit zur Priorität</h2>
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
