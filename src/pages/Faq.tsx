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
  Slash,
  Award,
  MapPin,
  Cpu,
  CheckCircle2
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
  const [openIndex, setOpenIndex] = useState<string | null>('why-movin-0');

  const faqCategories: FAQCategory[] = [
    {
      id: 'why-movin',
      title: 'Warum MOVIN?',
      icon: Award,
      items: [
        {
          question: "Warum gilt MOVIN als eine der besten Adressen für Physiotherapie in Freiburg?",
          answer: "Weil wir die perfekte Symbiose aus wissenschaftlich fundierter Hands-off-Therapie und zukunftsweisender Digitalisierung geschaffen haben. Bei uns sind Sie keine Nummer in einer sterilen Massenabfertigung. Unsere Therapeuten arbeiten evidenzbasiert und nutzen parallel in Gemeinschaft mit Ihnen unsere MOVIN App zur Analyse der Kontextfaktoren. Das macht uns zu einer der modernsten und innovativsten Praxen in der Region Freiburg."
        },
        {
          question: "Was bedeutet „Hands-on“ und „Hands-off“ im Therapiekonzept von MOVIN?",
          answer: "Ein perfekter Behandlungserfolg braucht beides:\n\nHands-on: Bedeutet manuelle Arbeit des Therapeuten (z. B. Manuelle Therapie, Schmerzlinderung, Anamnese, Mobilisation), um Schmerzen zu lindern und Blockaden zu lösen.\n\nHands-off: Sobald die Akutphase vorbei ist, bringen wir Sie in die Eigenaktivität. Auf unseren modernen Trainingsflächen lernen Sie, Ihren Körper langfristig selbst zu stabilisieren und zu stärken, damit die Schmerzen nicht wiederkehren."
        },
        {
          question: "Wie digital und innovativ arbeitet MOVIN im Praxisalltag?",
          answer: "Wir nutzen die Digitalisierung und KI, um Ihnen den Aufenthalt so angenehm wie möglich zu machen. Das beginnt bei der papierlosen, digitalen Dokumentation und geht über unsere eigene MOVIN-App, mit der Sie Ihre Trainingspläne per Videoanleitung, Schmerztagebuch u.v.m. jederzeit auf dem Smartphone haben. Darüber hinaus setzen wir an unseren Standorten in Freiburg und Rust auf softwaregestützte Trainings- und Diagnosesysteme, die Ihre Fortschritte datenbasiert messbar machen."
        }
      ]
    },
    {
      id: 'location',
      title: 'Erreichbarkeit & Orte',
      icon: MapPin,
      items: [
        {
          question: "An welchen Standorten in Freiburg und Umgebung finde ich MOVIN?",
          answer: "Wir sind strategisch so aufgestellt, dass Sie uns aus ganz Freiburg und der Region optimal erreichen können:\n\n- Freiburg-Wiehre (Lorettoberg): Unsere etablierte, traditionsreiche Praxis mit über 28 Jahren Erfahrung in einer der schönsten Ecken Freiburgs.\n- Freiburg-West (Mooswald): Das innovative Highlight – Deutschlands erste „Boutique Physiotherapie“ in modernem Ambiente.\n- Rust (am Europa-Park): Unsere Physiotherapie-Praxis mit Adrenalin, in Kooperation mit dem Europa-Park."
        },
        {
          question: "Wie erreiche ich die MOVIN Praxen in Freiburg und gibt es Parkplätze?",
          answer: "Standort Lorettoberg (Wiehre): Perfekt erreichbar zu Fuß, mit dem Fahrrad oder dem ÖPNV (Straßenbahnlinie 2, Haltestelle Lorettostraße). Parkplätze befinden sich in den umliegenden Straßen (Wohngebiet/Parkraumbewirtschaftung), oder als Garage.\n\nStandort Mooswald (Freiburg-West): Ideal für Autofahrer. Wir bieten Ihnen kostenfreie, praxiseigene Kundenparkplätze direkt am Gebäude, sodass Sie völlig stressfrei ankommen können, sowie eine Garage mit kleinen Unkosten.\n\nStandort Rust: Optimal erreichbar über die Autobahn A5, mit separaten Parkmöglichkeiten direkt vor Ort am Bell-Rock Hotel."
        },
        {
          question: "Bietet MOVIN an den Freiburger Standorten Umkleiden und Duschmöglichkeiten?",
          answer: "Ja, am Standort Lorettoberg und Mooswald stehen Ihnen moderne, saubere Umkleidekabinen und gepflegte Duschmöglichkeiten kostenfrei zur Verfügung. Sie können Ihr Training oder Ihre Therapie also problemlos vor der Arbeit, in der Mittagspause oder direkt vor einem privaten Termin in Freiburg in Ihren Tag einbauen."
        },
        {
          question: "Wo kann ich die MOVIN-App für mein Training und die Therapie herunterladen?",
          answer: "Unsere App ist komplett kostenlos und steht im Apple App Store (für iOS) sowie im Google Play Store (für Android) unter dem Suchbegriff „Movin innovativ bewegt“ zum Download bereit. Die App verbindet Sie direkt mit Ihren Therapeut*innen und Ihren persönlichen Trainingsdaten."
        },
        {
          question: "Wie sind die Öffnungszeiten der MOVIN Standorte?",
          answer: "Lorettoberg:\nMontag bis Donnerstag 7:30 bis 20:00 Uhr\nFreitag 8:00 bis 16:00 Uhr\n\nMooswald:\nMontag bis Donnerstag 8:00 bis 20:00 Uhr\nFreitag 8:00 bis 16:00 Uhr\n\nEuropa-Park Rust:\nMittwoch 8:00 bis 16:30 Uhr\nDonnerstag 10:00 bis 18:30 Uhr\nFreitag 8:00 bis 16:00 Uhr"
        },
        {
          question: "Kann ich bei MOVIN in Rust auch als externer Patient behandelt werden?",
          answer: "Der Standort Europa-Park Rust ist in erster Linie auf die Mitarbeitenden des Europa-Park sowie umliegende Betriebe ausgerichtet. Aufgrund der besonderen Öffnungszeiten und begrenzten Kapazitäten empfehlen wir externen Patientinnen und Patienten, vorab telefonisch bei uns anzufragen, ob ein Termin möglich ist."
        }
      ]
    },
    {
      id: 'billing',
      title: 'Rezepte & Zuzahlung',
      icon: ShieldCheck,
      items: [
        {
          question: "Muss ich für meine Physiotherapie in Freiburg eine gesetzliche Zuzahlung leisten?",
          answer: "Ja, der Gesetzgeber schreibt für gesetzlich versicherte Patienten eine Zuzahlung vor (sofern keine offizielle Befreiung vorliegt). Die Staffelung ist gesetzlich wie folgt geregelt:\n\n- Aktuell: Die Zuzahlung beträgt 10 % des reinen Rezeptwertes plus eine Pauschale von 10 Euro pro Verordnung.\n- Ab dem Jahr 2027: Aufgrund gesetzlicher Neuregelungen steigt diese gesetzliche Zuzahlung auf 20 % des Rezeptwertes plus 10 Euro pauschal pro Verordnung.\n\nHinweis: Wir ziehen diesen Betrag zu Beginn Ihrer Behandlungsserie in der Praxis ein. (Ausnahme Blankoverordnung)"
        },
        {
          question: "Kann ich auch als Privatpatient oder Selbstzahler zu MOVIN kommen?",
          answer: "Selbstverständlich. Wir behandeln Privatpatienten aller Kassen sowie Beihilfeversicherte. Sie brauchen in Deutschland allerdings für Physiotherapie immer eine Heilmittelverordnung. Als Selbstzahler bieten wir Ihnen Angebote im Bereich Personal Training, Gerätetraining, Functional Training, Skillcourt Training und Senso Pro an."
        },
        {
          question: "Brauche ich für die Physiotherapie zwingend ein ärztliches Rezept?",
          answer: "Ja. Wenn die Behandlung über die gesetzliche oder private Krankenkasse abgerechnet werden soll, ist ein ärztliches Rezept (vom Hausarzt, Orthopäden, Zahnarzt etc.) zwingend erforderlich. Dieses sollte bei Kassenpatienten idealerweise nicht älter als 28 Tage sein."
        },
        {
          question: "Was passiert, wenn ich ein Rezept von einem Freiburger Arzt habe – wie schnell bekomme ich einen Termin?",
          answer: "Wir bemühen uns stets um eine zeitnahe Terminvergabe, besonders bei akuten Beschwerden oder nach Operationen. Da Rezepte innerhalb von 28 Tagen nach Ausstellung angetreten werden müssen, empfehlen wir Ihnen, sich sofort nach dem Arztbesuch telefonisch, per E-Mail oder über unsere digitalen Kanäle bei uns zu melden. Wir haben für unsere Standorte in Freiburg eine 48 Stunden Termingarantie."
        },
        {
          question: "Werden die Kosten für die Physiotherapie von den Krankenkassen voll übernommen?",
          answer: "Bei gesetzlich Versicherten übernehmen die Kassen die Kosten bis auf die gesetzlich vorgeschriebene Zuzahlung. Bei Privatpatienten richtet sich die Erstattung nach Ihrem individuellen Versicherungstarif. Wir händigen Ihnen vorab eine transparente Honorarvereinbarung aus, die Sie bei Ihrer Versicherung einreichen können."
        }
      ]
    },
    {
      id: 'training',
      title: 'Training & Firmenfitness',
      icon: Dumbbell,
      items: [
        {
          question: "Kann ich bei MOVIN in Freiburg auch ohne Rezept eigenständig trainieren?",
          answer: "Ja, und genau das empfehlen wir unseren Patienten, um den Therapieerfolg langfristig zu sichern. Sie können unsere medizinischen Trainingsflächen völlig unabhängig von Rezepten nutzen. Wir bieten Ihnen dabei maximale Flexibilität ohne Knebelverträge: Sie können wählen zwischen flexiblen Abokarten oder bequemen, monatlich kündbaren Monatsabonnements."
        },
        {
          question: "Unterstützt MOVIN Firmenfitness-Anbieter wie Hansefit oder Urban Sports Club?",
          answer: "Ja, absolut! Freiburg ist eine absolute Hansefit-Hochburg. Als Mitglied von Hansefit oder dem Urban Sports Club können Sie an unseren Standorten (Lorettoberg und Mooswald) unkompliziert per QR-Code einchecken und unsere erstklassigen Trainingsflächen für Ihr medizinisches Gerätetraining nutzen."
        },
        {
          question: "Was kostet eine Mitgliedschaft oder eine Zehnerkarte bei MOVIN?",
          answer: "Eine 10er-Karte liegt aktuell bei 100 Euro. Es gibt für jeden individuelle Möglichkeiten, kommen Sie einfach für ein unverbindliches Beratungsgespräch vorbei – wir finden den optimalen Tarif für Ihre Ziele."
        }
      ]
    },
    {
      id: 'general',
      title: 'Allgemeine Fachfragen',
      icon: HelpCircle,
      items: [
        {
          question: "Was ist der Unterschied zwischen Physiotherapie und Krankengymnastik?",
          answer: "Im heutigen Sprachgebrauch werden die Begriffe meist synonym verwendet. Historisch gesehen war die Krankengymnastik eher auf aktive Bewegungsübungen beschränkt. Die moderne Physiotherapie hingegen ist der Oberbegriff und umfasst das gesamte Spektrum: aktive Übungen (Krankengymnastik), passive Techniken (Manuelle Therapie, Massage, Lymphdrainage) sowie physikalische Therapien (Wärme, Kälte)."
        },
        {
          question: "Was ist Krankengymnastik am Gerät (KGG) und für wen ist sie geeignet?",
          answer: "Krankengymnastik am Gerät ist eine verordnungsfähige, aktive Therapieform. Unter ständiger Anleitung unserer spezialisierten Therapeuten trainieren Sie an medizinischen Kraft- und Zugapparaten. Sie ist ideal bei Kraftdefiziten und Schmerzen, sowie zur Prävention geeignet. Das betrifft über 80 Prozent unserer Patient*innen."
        },
        {
          question: "Was muss ich zu meinem ersten Physiotherapie-Termin bei MOVIN mitbringen?",
          answer: "Bringen Sie bitte Ihre ärztliche Verordnung (das Rezept), eventuell vorhandene ärztliche Befunde oder MRT-/Röntgenbilder (laden Sie diese in unserer App hoch), ein großes Handtuch sowie bequeme Sportkleidung und saubere Sportschuhe mit. Denken Sie an die Duschmöglichkeiten und Umkleiden."
        },
        {
          question: "Wie lange dauert eine Physiotherapie-Sitzung in der Regel?",
          answer: "Die Regelbehandlungszeit für eine normale Krankengymnastik oder Manuelle Therapie ist von den Krankenkassen streng getaktet und liegt meist zwischen 15 und 20 Minuten (inklusive Dokumentation und Auskleiden). Bei der Krankengymnastik am Gerät (KGG) dauert eine Sitzung in der Regel 60 Minuten. Bei MOVIN nehmen wir uns jedoch immer die maximal mögliche Zeit für Sie und kombinieren die Therapien bei Bedarf sinnvoll mit anschließenden Eigenübungen."
        },
        {
          question: "Was passiert, wenn ich einen Termin absagen muss?",
          answer: "Wir führen unsere Praxen nach einem strikten Bestellsystem, um Wartezeiten für Sie zu vermeiden. Sollten Sie einen Termin einmal nicht wahrnehmen können, sagen Sie diesen bitte mindestens 24 Stunden vorher telefonisch oder per E-Mail aus. Nicht rechtzeitig abgesagte Termine müssen wir Ihnen leider privat in Rechnung stellen, da wir den Zeitraum exklusiv für Sie reserviert haben."
        },
        {
          question: "Behandelt MOVIN auch Kinder und Jugendliche?",
          answer: "Ja, auf Anfrage behandeln wir auch Kinder und Jugendliche. Bitte kontaktieren Sie uns vorab telefonisch oder per Mail, damit wir prüfen können, ob wir Ihrem Kind die passende Betreuung anbieten können."
        },
        {
          question: "Bietet MOVIN auch Hausbesuche an?",
          answer: "Hausbesuche sind bei MOVIN in Ausnahmefällen und nach individueller Absprache möglich. Bitte wenden Sie sich hierfür direkt an unser Empfangsteam, damit wir Ihre Anfrage prüfen können."
        }
      ]
    },
    {
      id: 'innovation',
      title: 'Innovation & Tech',
      icon: Cpu,
      items: [
        {
          question: "Was versteht man unter dem „Boutique Physiotherapie“-Konzept im MOVIN Mooswald?",
          answer: "Unser Boutique-Konzept im Freiburger Westen ist einzigartig. Es bricht mit dem Image einer klassischen, sterilen Praxis. Im MOVIN Mooswald erwartet Sie ein stylisches Wohlfühl-Ambiente mit modernem Charakter, extrem begrenzte Mitgliederzahlen auf den Trainingsflächen für maximale Privatsphäre, modernste Diagnostikverfahren und Therapeuten, die voll und ganz auf Ihre individuelle Betreuung fokussiert sind. Premium-Therapie ohne Hektik."
        },
        {
          question: "Was ist der Skillcourt (Standort Mooswald) und wie hilft er mir?",
          answer: "Der Skillcourt ist ein absolutes Highlight unserer technologiegestützten Therapie. Er kombiniert visuelle, kognitive und motorische Reize zu einem sogenannten vikomotorischen Training. Während Sie sich auf einer speziellen Sensormatte bewegen, müssen Sie über einen großen Bildschirm Denk- und Reaktionsaufgaben lösen. Das kurbelt das Gehirn an, verbessert die Nerven-Muskel-Verbindung und ist die modernste Form der Therapie nach Sportverletzungen (z. B. Kreuzbandriss), zur Sturzprophylaxe im Alter oder zur Performance-Steigerung."
        },
        {
          question: "Was ist der Senso Pro (Standort Lorettoberg) und welche Vorteile bietet er?",
          answer: "Der Senso Pro ist das weltweit führende Trainingsgerät für Koordination und Gelenkstabilität. Auf zwei freischwingenden Standbändern stehen Sie unter einer funktionellen, aber extrem gelenkschonenden Belastung. Über einen Bildschirm werden Ihnen Video-Übungen vorgegeben. Es schult Ihre Tiefenmuskulatur, Ihr Gleichgewicht und Ihre Reaktionsschnelligkeit – perfekt als Ergänzung zur klassischen Physiotherapie bei Rücken-, Knie- oder Hüftbeschwerden. Zudem können wir auf dem Senso Pro nun auch Kraft- und Koordinationstests durchführen und Sie so optimal begleiten."
        },
        {
          question: "Welche Beschwerdebilder werden bei MOVIN primär behandelt?",
          answer: "Wir behandeln das gesamte Spektrum orthopädischer, traumatologischer und chirurgischer Beschwerden. Dazu gehören z. B. akute und chronische Rückenschmerzen (Bandscheibenvorfälle, Hexenschuss), traumatische Sportverletzungen (Kreuzbandrisse, Muskelverletzungen), Arthrose, Haltungsschäden, muskuläre Dysbalancen, Kraftdefizite, Funktionseinschränkungen, Schmerzen allgemein sowie die Rehabilitation nach Frakturen, Verletzungen oder postoperativen Eingriffen. Die gesamte Breite also der therapeutischen Versorgung."
        },
        {
          question: "Bietet MOVIN auch präventive Leistungen und Kurse an?",
          answer: "Ja! Unser Ziel ist es, dass Sie erst gar keine Schmerzen bekommen oder nach einer erfolgreichen Therapie langfristig stabil bleiben. Neben dem freien Training über Abos oder Hansefit bieten wir regelmäßige, gezielte Präventionsberatungen und technologiegestützte Screenings an, um Schwachstellen in Ihrem Bewegungsapparat aufzudecken, bevor sie Probleme verursachen."
        }
      ]
    },
    {
      id: 'prescription-match',
      title: 'direkt-Match Rezepte',
      icon: CheckCircle2,
      items: [
        {
          question: "Ich habe ein Rezept für Manuelle Therapie (MT), Krankengymnastik (KG) oder Gerätegestützte Krankengymnastik (KGG) – bin ich bei MOVIN in Freiburg richtig?",
          answer: "Ja, absolut. MOVIN deckt das gesamte Spektrum der klassischen und erweiterten physiotherapeutischen Kassenleistungen ab. Unsere Therapeuten besitzen alle notwendigen Zusatzqualifikationen und staatlich anerkannten Zertifikate. Sie können jedes dieser Rezepte an unseren Standorten in Freiburg (Wiehre & Mooswald) sowie in Rust einlösen."
        },
        {
          question: "Wo in Freiburg kann ich ein Rezept für Manuelle Lymphdrainage (MLD) einlösen?",
          answer: "Wenn Ihnen Ihr Arzt eine Manuelle Lymphdrainage (z. B. nach einer Operation, Sportverletzung oder bei primären/sekundären Lymphödemen) verordnet hat, sind Sie bei MOVIN in besten Händen. Sie können auch auf Selbstzahlerbasis unseren Lymphstim selbstständig nutzen, für Lymphdrainage, Regeneration nach dem Sport oder nach anderen Aktivitäten."
        },
        {
          question: "Welcher MOVIN Standort in Freiburg eignet sich am besten für Krankengymnastik am Gerät (KGG)?",
          answer: "An allen drei Standorten sind Sie bei uns bestens versorgt und können mit vielen Trainingsmöglichkeiten arbeiten und auch Ihre Reha von Tag 1 bis zum letzten Tag (Return To) optimal verbringen."
        },
        {
          question: "Setzt MOVIN Freiburg bereits die neue „Blankoverordnung“ um?",
          answer: "Ja! Als moderne und zukunftsorientierte Physiotherapie-Praxis sind wir bestens auf das System der Blankoverordnung vorbereitet. Bei einer Blankoverordnung stellt Ihnen Ihr Arzt zwar das Rezept aus, überlässt uns als Experten jedoch die Entscheidung, welche Heilmittel, wie viele Termine und welche Frequenz für Ihren maximalen Heilungserfolg am sinnvollsten sind. Wir übernehmen hierbei die komplette Steuerung Ihrer Therapie, immer im Bereich der Plausibilität."
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

  const renderFaqAnswer = (faq: { question: string; answer: string }) => {
    if (faq.question === "Wie sind die Öffnungszeiten der MOVIN Standorte?") {
      const locations = [
        {
          name: 'Lorettoberg',
          hours: ['Montag bis Donnerstag: 7:30 bis 20:00 Uhr', 'Freitag: 8:00 bis 16:00 Uhr']
        },
        {
          name: 'Mooswald',
          hours: ['Montag bis Donnerstag: 8:00 bis 20:00 Uhr', 'Freitag: 8:00 bis 16:00 Uhr']
        },
        {
          name: 'Europa-Park Rust',
          hours: ['Mittwoch: 8:00 bis 16:30 Uhr', 'Donnerstag: 10:00 bis 18:30 Uhr', 'Freitag: 8:00 bis 16:00 Uhr']
        }
      ];

      return (
        <div className="space-y-5">
          {locations.map((location) => (
            <div key={location.name} className="rounded-2xl bg-white/70 border border-border/70 p-4">
              <p className="font-black text-secondary mb-2">{location.name}</p>
              <div className="space-y-1.5">
                {location.hours.map((hour) => (
                  <p key={hour} className="text-dark/80">{hour}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="whitespace-pre-line">{faq.answer}</p>;
  };

  return (
    <>
      <SEO 
        title="FAQ | Häufige Fragen & Antworten | MOVIN Freiburg"
        description="Finden Sie Antworten auf alle Fragen rund um Rezepte, Krankenkassen, Termine, Gerätetraining, KGG, T-RENA und die digitale MOVIN-App."
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
            Haben Sie Fragen zu Ihrem Rezept, dem Trainingsstart oder unserer App? Suchen Sie direkt nach Begriffen oder filtern Sie nach Kategorien.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Wonach suchen Sie? (z.B. Rezept, Hansefit, Absagen...)" 
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto items-start">
            
            {/* Left Sidebar Info Card */}
            <div className="lg:col-span-4 bg-light rounded-[2rem] p-8 border border-border/70 sticky top-24">
              <h3 className="text-xl font-bold text-secondary mb-4">Häufige Themen</h3>
              <p className="text-xs text-dark/75 leading-relaxed mb-6">
                Wir möchten Ihren Besuch bei uns so unkompliziert wie möglich gestalten. Wählen Sie eine Kategorie, um die häufigsten Fragen und ausführliche Antworten anzuzeigen.
              </p>

              <div className="space-y-4 border-t border-border pt-6 mb-6">
                <div className="flex items-center gap-3 text-xs text-dark/65 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>29 praxisrelevante Antworten</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-dark/65 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>7 thematische Kategorien</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-dark/65 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Präzise Volltextsuche</span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-center">
                <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-1">Einfaches Onboarding</p>
                <p className="text-[11px] text-secondary font-medium leading-relaxed">
                  Nutzen Sie unsere MOVIN App zur direkten Rezeptprüfung und Terminplanung.
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
                    Wir konnten zu "{searchQuery}" leider keine passende Frage finden. Bitte passen Sie Ihren Suchbegriff an oder wählen Sie alle Themen aus.
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
                            {renderFaqAnswer(faq)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Still have questions? Block */}
              <div className="mt-12 text-center bg-light p-8 md:p-10 rounded-[2.5rem] border border-border/80">
                <h3 className="text-2xl font-black text-secondary mb-3">Ihre Frage war nicht dabei?</h3>
                <p className="text-dark/70 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                  Kein Problem! Kontaktieren Sie uns direkt per Mail, Telefon oder über unsere MOVIN App. Unser Empfangsteam klärt alle Anliegen schnellstmöglich für Sie.
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

