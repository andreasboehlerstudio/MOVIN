import { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Dumbbell, 
  Smartphone, 
  Activity, 
  ArrowRight, 
  Phone, 
  Mail,
  Slash
} from 'lucide-react';
import SEO from '../components/seo/SEO';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: any;
  items: FAQItem[];
}

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<string | null>('health-insurance-0');

  const faqCategories: FAQCategory[] = [
    {
      id: 'health-insurance',
      title: 'Rezepte & Krankenkasse',
      icon: ShieldCheck,
      items: [
        {
          question: "Brauche ich ein Rezept für eine physiotherapeutische Behandlung?",
          answer: "Ja, für alle Behandlungen, die über gesetzliche oder private Krankenkassen abgerechnet werden sollen, ist eine ärztliche Verordnung (Rezept) gesetzlich vorgeschrieben. Als Selbstzahler oder Privatversicherter mit Heilpraktiker-Zusatzversicherung kannst du jedoch auch ohne ärztliches Rezept zu uns kommen. In diesem Fall erfolgt die Behandlung im Rahmen des „sektoralen Heilpraktikers für Physiotherapie“."
        },
        {
          question: "Wie lange ist ein physiotherapeutisches Rezept gültig?",
          answer: "Rezepte der gesetzlichen Krankenkassen (GKV) müssen innerhalb von 28 Tagen nach dem Ausstellungsdatum begonnen werden. Trägt die Verordnung einen besonderen Vermerk wie „dringlicher Behandlungsbedarf“, verkürzt sich diese Frist in der Regel auf 14 Tage. Sollte es dir nicht möglich sein, innerhalb dieser Frist zu starten, kontaktiere uns bitte umgehend, damit wir mit deinem Arzt eine Rezeptänderung absprechen können."
        },
        {
          question: "Muss ich eine gesetzliche Zuzahlung leisten?",
          answer: "Gesetzlich Versicherte sind laut Gesetzgeber verpflichtet, eine Zuzahlung pro Rezept zu leisten, es sei denn, es liegt eine gültige Befreiungsbescheinigung der Krankenkasse vor. Die Zuzahlung setzt sich zusammen aus einer Pauschale von 10,00 € pro Verordnung plus 10 % des tatsächlichen Behandlungswertes. Diese Gebühr ziehen wir im Namen der Krankenkasse beim ersten Termin ein."
        },
        {
          question: "Können Privatpatienten und Selbstzahler bei euch behandelt werden?",
          answer: "Ganz klar: Ja! Wir heißen Privatversicherte, Beihilfeberechtigte und Selbstzahler an all unseren Standorten herzlich willkommen. Privatpatienten erhalten von uns nach Abschluss der Behandlungsserie eine detaillierte Rechnung basierend auf unserer Honorarvereinbarung (angelehnt an die Gebührenordnung für Therapeuten), die sie bei ihrer Versicherung oder Beihilfestelle zur Erstattung einreichen können."
        },
        {
          question: "Was mache ich, wenn mein Rezept fehlerhaft ausgefüllt ist?",
          answer: "Die Heilmittel-Richtlinien der Krankenkassen sind sehr streng. Kleinste Fehler (z.B. falsche Diagnose-Abkürzungen oder fehlende Kreuze) können dazu führen, dass die Kasse das Rezept ablehnt. Sollten wir bei der Prüfung einen Fehler feststellen, bereiten wir alle notwendigen Korrekturinfos für dich vor. Du musst das Rezept dann lediglich kurz von deiner Arztpraxis abstempeln und gegenzeichnen lassen."
        }
      ]
    },
    {
      id: 'appointments',
      title: 'Termine & Organisation',
      icon: Calendar,
      items: [
        {
          question: "Was muss ich zu meinem ersten Termin bei MOVIN mitbringen?",
          answer: "Bitte bringe deine ärztliche Verordnung (dein Rezept), deine Krankenversicherungskarte (bei gesetzlich Versicherten), ein großes Handtuch (Dusch- oder Saunahandtuch) sowie bequeme, sportliche Kleidung mit. Falls vorhanden, sind auch aktuelle Arztberichte, MRT- oder Röntgenbilder sowie OP-Berichte äußerst hilfreich für unsere Befundung."
        },
        {
          question: "Bis wann muss ich einen Termin absagen, wenn ich verhindert bin?",
          answer: "Wir arbeiten nach einem reinen Bestellsystem, um dir lange Wartezeiten zu ersparen und volle Behandlungszeit zu garantieren. Solltest du einen Termin nicht wahrnehmen können, sage diesen bitte mindestens 24 Stunden vorher ab (telefonisch, per E-Mail oder ganz unkompliziert direkt im Chat unserer MOVIN App). Nicht oder zu spät abgesagte Termine müssen wir andernfalls leider privat als Ausfallgebühr in Rechnung stellen."
        },
        {
          question: "Wie genau funktioniert eure 48-Stunden-Termingarantie?",
          answer: "Für akute Fälle (z.B. Hexenschuss, frische Sportverletzungen oder direkt nach einer Operation) haben wir an unseren Standortern spezielle Akut-Slots reserviert. Wenn du als Neupatient mit dringendem Bedarf zu uns kommst, garantieren wir dir einen Behandlungstermin innerhalb von 48 Stunden. Bitte melde dich dafür am besten telefonisch oder reiche dein Rezept direkt online mit dem Hinweis „Akutfall“ ein."
        },
        {
          question: "Bietet MOVIN auch Hausbesuche an?",
          answer: "Ja, wir führen auch qualifizierte Hausbesuche durch. Voraussetzung hierfür ist, dass der behandelnde Arzt auf dem Rezept das Feld „Hausbesuch“ angekreuzt hat und sich deine Adresse im logistischen Einzugsgebiet einer unserer Praxen in Freiburg bzw. Rust befindet. Da die Kapazitäten für Hausbesuche begrenzt sind, empfehlen wir hier eine besonders frühzeitige Anmeldung."
        },
        {
          question: "Wie stimme ich am besten Folgetermine ab?",
          answer: "Um therapeutische Kontinuität und somit den besten Heilungserfolg zu garantieren, vereinbaren wir bevorzugt schon beim ersten Termin die gesamte Behandlungsserie. Du kannst deine Termine direkt vor Ort am Empfang, digital über unsere App im Chat mit unserem Team oder – für klassische Standortbuchungen – auch über Doctolib bzw. per Telefon reservieren."
        }
      ]
    },
    {
      id: 'training',
      title: 'Training & Prävention',
      icon: Dumbbell,
      items: [
        {
          question: "Was unterscheidet Krankengymnastik am Gerät (KGG) von normalem Fitnesstraining?",
          answer: "Die KGG ist eine aktive Sporttherapie an medizinischen Trainingsgeräten, die von Ärzten verordnet werden kann. Das Training findet bei uns in sehr kleinen Gruppen (maximal 3 Patienten pro Therapeut) unter ständiger biomechanischer Überwachung statt. Wir analysieren deine Bewegungsachsen präzise und passen die Widerstände exakt an deine individuellen Gewebeheilungsprozesse an."
        },
        {
          question: "Kann ich auch ohne ärztliches Rezept bei euch trainieren?",
          answer: "Ja, sehr gerne! Nach deiner physiotherapeutischen Behandlung oder zur präventiven Gesundheitsförderung kannst du unsere hochmodernen Trainingsflächen nutzen. Wir bieten maßgeschneiderte Selbstzahler-Trainingskarten und monatliche Mitgliedschaften an. Zudem kooperieren wir mit führenden Firmenfitness-Netzwerken wie Hansefit, Wellhub (ehemals Gympass) und dem Urban Sports Club."
        },
        {
          question: "Was ist das T-RENA Nachsorgeprogramm der Rentenversicherung?",
          answer: "T-RENA steht für „Trainingstherapeutische Rehabilitationsnachsorge“. Es handelt sich um ein gerätegestütztes gesundheitliches Aufbautraining, das vollständig von der Deutschen Rentenversicherung (DRV) finanziert wird, wenn du zuvor eine stationäre oder ambulante Reha absolviert hast. Das Programm umfasst in der Regel 26 Einheiten und soll innerhalb von 4-6 Wochen nach Reha-Ende beginnen."
        },
        {
          question: "Wie unterstützen mich Senso Pro und Skill Court im Training?",
          answer: "Diese Trainingssysteme bringen Neuroathletik und Tiefenstabilität zusammen: Der Schweizer Senso Pro fordert deine Ganzkörperkoordination auf instabilen Standriemen unter kognitiver Video-Anleitung heraus – extrem gelenkschonend und stärkend. Der Skill Court kombiniert visuelle Reize auf einem Screen mit Sensor-Bodenplatten, um Reaktionszeiten, visuelle Wahrnehmung sowie Schnelligkeit für Kopf und Beine gleichermaßen zu schulen."
        },
        {
          question: "Gibt es einen verpflichtenden Eingangscheckup beim Training?",
          answer: "Ja, die Gesundheit steht bei uns an oberster Stelle. Bevor du das erste Mal selbstständig oder im Rahmen von Hansefit bei uns an die Geräte gehst, führen wir einen standardisierten physiotherapeutischen Eingangscheckup durch. Wir testen deine Beweglichkeit, dokumentieren Vorverletzungen und erstellen deinen maßgeschneiderten, digitalen Trainingsplan."
        }
      ]
    },
    {
      id: 'digital-app',
      title: 'MOVIN App & Digitales',
      icon: Smartphone,
      items: [
        {
          question: "Wie lade ich mein Rezept in der MOVIN App hoch?",
          answer: "Nachdem du die kostenfreie MOVIN App im Google Play Store oder Apple App Store heruntergeladen hast, navigierst du einfach zum Reiter „Rezepte“. Klicke auf „Rezept hochladen“, fotografiere deine ärztliche Verordnung mit der Smartphone-Kamera ab (achte auf gute Lesbarkeit) oder wähle ein digitales PDF aus. Unser Service-Team erhält das Dokument verschlüsselt und sicher."
        },
        {
          question: "Wie läuft die Terminvergabe ab, wenn ich die App nutze?",
          answer: "Nachdem du dein Rezept hochgeladen hast, gleicht unser Patientenservice deine Verordnung mit den Profilen passender Fachtherapeuten ab. Du erhältst innerhalb kurzer Zeit direkt in der App konkrete Terminvorschläge auf dein Smartphone gesendet. Diese kannst du mit einem einfachen Fingertippen bestätigen oder ablehnen, um alternative Zeiten anzufordern."
        },
        {
          question: "Warum ist es sinnvoll, den Anamnesebogen vorab digital auszufüllen?",
          answer: "Durch das Ausfüllen unseres Anamnesebogens von zu Hause aus sparst du wertvolle Behandlungszeit vor Ort. Anstatt am ersten Tag Formulare im Wartezimmer auszufüllen, fließen deine Angaben (Symptome, Krankenhistorie, Schmerzzonen) direkt gesichert in unsere Praxissoftware ein. Dein Therapeut kann sich so bereits vor deiner Ankunft optimal auf dich vorbereiten."
        },
        {
          question: "Welche Features bietet die MOVIN App zusätzlich zu Terminen?",
          answer: "Unsere App ist dein tägliche Gesundheitsbegleiter. Sie enthält: 1) Individuelle, von deinem Therapeuten freigeschaltete Video-Übungspläne für zu Hause. 2) Ein digitales Schmerztagebuch, um deinen Heilungsverlauf objektiv zu tracken. 3) Einen geschützten Dokumentensafe für Befunde. 4) Eine Medikamenten-Übersicht sowie 5) Direct Chat mit unserer Praxis."
        },
        {
          question: "Ist die Nutzung der MOVIN App mit Kosten verbunden?",
          answer: "Nein, der Download und die vollumfängliche Nutzung der MOVIN App sind für alle Patientinnen und Patienten unserer Therapiezentren absolut kostenlos. Wir betrachten die App als integralen Servicebestandteil, um maximale Transparenz, reibungsfreie Kommunikation und eine wissenschaftlich optimale Trainingsbetreuung im Alltag zu sichern."
        }
      ]
    },
    {
      id: 'therapy-methods',
      title: 'Behandlungen & Methoden',
      icon: Activity,
      items: [
        {
          question: "Welche klassischen Heilmittel und Therapien bietet MOVIN an?",
          answer: "Unser hochqualifiziertes Team deckt alle Facetten der modernen Physiotherapie ab. Dazu gehören: Krankengymnastik (KG), Manuelle Therapie (MT), Manuelle Lymphdrainage (MLD), Krankengymnastik am Gerät (KGG), CMD-Kiefergelenkstherapie, Sportphysiotherapie, neurologische Behandlungen (KG-ZNS, z. B. nach Bobath/PNF) sowie Physikalische Therapie (Wärme, Kälte, Elektrotherapie)."
        },
        {
          question: "Werde ich immer von derselben Therapeutin oder demselben Therapeuten behandelt?",
          answer: "Ja, eine feste therapeutische Bezugsperson ist ein zentraler Eckpfeiler unseres Behandlungskonzepts. Auf diese Weise baut sich Vertrauen auf, und die therapeutischen Fortschritte können präzise fortlaufend beurteilt werden. Bei Urlauben, Fortbildungen oder krankheitsbedingten Ausfällen stimmen wir geplante Vertretungen immer im Vorfeld eng mit dir ab."
        },
        {
          question: "Wie lange dauert eine physiotherapeutische Behandlungseinheit?",
          answer: "Die Behandlungszeit hängt von dem Heilmittel ab, das dein Arzt verordnet hat. Die Regelfahrzeiten der gesetzlichen Kassen für klassische Krankengymnastik (KG) liegen meist zwischen 15 und 25 Minuten (bei MOVIN planen wir die Slots optimal, inklusive Dokumentation und Vorbereitung). Krankengymnastik am Gerät (KGG) dauert regulär volle 60 Minuten."
        },
        {
          question: "Werden Präventionskurse von meiner gesetzlichen Krankenkasse bezuschusst?",
          answer: "Ja! Wir bieten zertifizierte Präventionskurse an (z. B. Wirbelsäulengymnastik, Rückenschule, Functional Training), die nach § 20 SGB V von der Zentralen Prüfstelle Prävention (ZPP) zugelassen sind. Die gesetzlichen Krankenkassen erstatten nach erfolgreicher Kursteilnahme (mindestens 80 % Anwesenheit) zwischen 75 % und 100 % der Kursgebühren."
        },
        {
          question: "Was unterscheidet das MOVIN-Konzept von anderen Praxen?",
          answer: "Wir brechen mit dem veralteten Klischee staubiger Massagepraxen. Bei uns trifft exzellente orthopädische Hands-on-Therapie auf modernste sportwissenschaftliche Trainingsgeräte, sensorische 3D-Gelenk- und Bewegungsanalysen sowie modernste KI-gestützte Behandlungsbegleitung. Wir arbeiten evidenzbasiert, digital optimiert und immer hochgradig persönlich."
        }
      ]
    }
  ];

  // Gebe alle FAQs flach aus, wenn nach Begriffen gesucht wird
  const allFaqsWithCat = useMemo(() => {
    const list: { catId: string; question: string; answer: string; globalIndex: string }[] = [];
    faqCategories.forEach(cat => {
      cat.items.forEach((item, index) => {
        list.push({
          catId: cat.id,
          question: item.question,
          answer: item.answer,
          globalIndex: `${cat.id}-${index}`
        });
      });
    });
    return list;
  }, []);

  // Filterung basierend auf Suche und Kategorie
  const filteredFaqs = useMemo(() => {
    let result = allFaqsWithCat;
    
    if (activeCategory !== 'all') {
      result = result.filter(faq => faq.catId === activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(faq => 
        faq.question.toLowerCase().includes(q) || 
        faq.answer.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery, allFaqsWithCat]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqsWithCat.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="FAQ | Häufige Fragen & Antworten | MOVIN Freiburg"
        description="Finde Antworten auf alle Fragen rund um Rezepte, Krankenkassen, Termine, Gerätetraining, KGG, T-RENA und die digitale MOVIN-App."
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-secondary relative py-20 md:py-28 overflow-hidden text-white border-b border-secondary-dark font-sans">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(0,178,186,0.3),transparent_70%)" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-widest text-xs mb-4">
            <HelpCircle className="w-5 h-5 animate-bounce" /> Alles auf einen Blick
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gradient-teal-mint tracking-tight">
            Hilfe- & FAQ-Zentrum
          </h1>
          <p className="text-lg md:text-xl text-blue-tint/90 font-light max-w-2xl mx-auto leading-relaxed">
            Hast du Fragen zu deinem Rezept, dem Trainingsstart oder unserer App? Suche direkt nach Begriffen oder filtere nach Kategorien.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Wonach suchst du? (z.B. Rezept, Hansefit, Absagen...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-secondary placeholder-dark/40 pl-12 pr-6 py-4.5 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-primary shadow-lg transition-all outline-none"
              />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-dark/50 hover:text-dark font-bold bg-light px-2 py-1 rounded-md"
              >
                Leeren
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main FAQ Layout */}
      <section className="section-padding bg-white font-sans">
        <div className="container-custom">
          
          {/* Categories Selector Tabs */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-2.5 pb-4 border-b border-border/80">
              <button
                onClick={() => { setActiveCategory('all'); setOpenIndex(null); }}
                className={`px-5 py-3 rounded-full text-xs font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeCategory === 'all' 
                    ? 'bg-secondary text-white shadow-md shadow-secondary/15' 
                    : 'bg-light text-secondary hover:bg-border/40 border border-border/55'
                }`}
              >
                <HelpCircle className="w-4 h-4" /> Alle Themen ({allFaqsWithCat.length})
              </button>
              
              {faqCategories.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setOpenIndex(`${cat.id}-0`); }}
                    className={`px-5 py-3 rounded-full text-xs font-bold tracking-wide transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'bg-secondary text-white shadow-md shadow-secondary/15' 
                        : 'bg-light text-secondary hover:bg-border/40 border border-border/55'
                    }`}
                  >
                    <IconComp className="w-4 h-4" /> {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
            
            {/* Left Sidebar Info Card */}
            <div className="lg:col-span-4 bg-light rounded-[2rem] p-8 border border-border/70 sticky top-24">
              <h3 className="text-xl font-bold text-secondary mb-4">Häufige Themen</h3>
              <p className="text-xs text-dark/75 leading-relaxed mb-6">
                Wir möchten deinen Besuch bei uns so unkompliziert wie möglich gestalten. Wähle eine Kategorie, um die 5 am häufigsten gestellten Fragen und ausführliche Antworten anzuzeigen.
              </p>

              <div className="space-y-4 border-t border-border pt-6 mb-6">
                <div className="flex items-center gap-3 text-xs text-dark/65 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>25 Meticulous Answers</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-dark/65 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>5 Dedicated Categories</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-dark/65 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Search across all questions</span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-center">
                <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-1">Einfaches Onboarding</p>
                <p className="text-[11px] text-secondary font-medium leading-relaxed">
                  Nutze unsere MOVIN App zur direkten Rezeptprüfung und Terminplanung.
                </p>
              </div>
            </div>

            {/* Right FAQ Accordion Block */}
            <div className="lg:col-span-8">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-16 bg-light rounded-3xl border border-border border-dashed">
                  <HelpCircle className="w-12 h-12 text-dark/30 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-secondary mb-2">Keine Suchergebnisse gefunden</h4>
                  <p className="text-sm text-dark/60 max-w-md mx-auto">
                    Wir konnten zu "{searchQuery}" leider keine passende Frage finden. Bitte passe deinen Suchbegriff an oder wähle alle Themen aus.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                    className="btn-primary mt-6 text-xs px-5 py-2.5"
                  >
                    Suche zurücksetzen
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => {
                    const isOpen = openIndex === faq.globalIndex;
                    return (
                      <div 
                        key={faq.globalIndex} 
                        className={`card-base transition-all duration-300 rounded-3xl overflow-hidden ${
                          isOpen 
                            ? 'border-primary/50 shadow-md bg-gradient-to-br from-white to-primary/2' 
                            : 'hover:border-border/80 bg-white'
                        }`}
                      >
                        <button
                          className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary outline-none"
                          onClick={() => setOpenIndex(isOpen ? null : faq.globalIndex)}
                          aria-expanded={isOpen}
                        >
                          <span className="text-base font-bold text-secondary pr-8 leading-snug">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-primary shrink-0 transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-dark/30 shrink-0 transition-transform duration-300" />
                          )}
                        </button>
                        
                        <div 
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                          } overflow-hidden`}
                        >
                          <div className="px-6 pb-6 pt-2 text-sm text-dark/80 leading-relaxed border-t border-border/40 mt-1">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Still have questions? Block */}
              <div className="mt-12 text-center bg-light p-8 md:p-10 rounded-[2.5rem] border border-border/80">
                <h3 className="text-2xl font-black text-secondary mb-3">Deine Frage war nicht dabei?</h3>
                <p className="text-dark/70 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                  Kein Problem! Kontaktiere uns direkt per Mail, Telefon oder über unsere MOVIN App. Unser Empfangsteam klärt alle Anliegen schnellstmöglich für dich.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="tel:+497617073366" className="btn-primary text-xs px-6 py-3.5 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Lorettoberg anrufen (0761 / 70 73 366)
                  </a>
                  <a href="mailto:info@movin-freiburg.de" className="btn-outline text-xs px-6 py-3.5 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> E-Mail schreiben
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

