import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Filter,
  Hand,
  Dumbbell,
  Droplet,
  Briefcase,
  Trophy,
  UserCheck,
  HeartPulse,
  Brain,
  Target,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function LeistungenHub() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const categories = ['Alle', 'Physiotherapie', 'Spezialisierung', 'Prävention', 'Betriebe'];

  const leistungen = [
    { 
      title: 'Krankengymnastik', 
      desc: 'Aktive und passive Behandlungsform zur Wiederherstellung der Beweglichkeit und Kraft.', 
      path: '/leistungen/krankengymnastik/',
      category: 'Physiotherapie',
      area: 'Ganzkörper',
      icon: Activity
    },
    { 
      title: 'Manuelle Therapie', 
      desc: 'Spezialisierter Ansatz zur Behandlung von Funktionsstörungen des Bewegungssystems.', 
      path: '/leistungen/manuelle-therapie/',
      category: 'Physiotherapie',
      area: 'Gelenke',
      icon: Hand
    },
    { 
      title: 'Krankengymnastik am Gerät', 
      desc: 'Medizinische Trainingsgeräte zur Verbesserung von Kraft, Ausdauer und Koordination.', 
      path: '/leistungen/krankengymnastik-am-geraet/',
      category: 'Physiotherapie',
      area: 'Ganzkörper',
      icon: Dumbbell
    },
    { 
      title: 'Manuelle Lymphdrainage', 
      desc: 'Sanfte Entstauungstherapie zur Förderung des Abtransports von Gewebeflüssigkeit.', 
      path: '/leistungen/lymphdrainage/',
      category: 'Physiotherapie',
      area: 'Gewebe',
      icon: Droplet
    },
    { 
      title: 'Betriebliche Gesundheitsförderung', 
      desc: 'Maßgeschneiderte Gesundheitslösungen für Ihr Unternehmen und Ihre Mitarbeiter.', 
      path: '/leistungen/betriebliche-gesundheitsfoerderung/',
      category: 'Betriebe',
      area: 'B2B',
      icon: Briefcase
    },
    { 
      title: 'Sportphysiotherapie', 
      desc: 'Zielgerichtete Betreuung von Sportler*innen zur Leistungsoptimierung, Verletzungsprävention und spezifischen Rehabilitation.', 
      path: '/leistungen/sportphysiotherapie/',
      category: 'Spezialisierung',
      area: 'Sport',
      icon: Trophy
    },
    { 
      title: 'Personal Training', 
      desc: 'Hochqualifiziertes Training auf Selbstzahlerbasis für eine nachhaltige Gesundheit.', 
      path: '/leistungen/personal-training/',
      category: 'Prävention',
      area: 'Fitness',
      icon: UserCheck
    },
    { 
      title: 'Medizinisches Training (MTT)', 
      desc: 'Zielgerichtetes, gerätegestütztes Training zur Rehabilitation und Prävention.', 
      path: '/leistungen/mtt-training/',
      category: 'Prävention',
      area: 'Training',
      icon: HeartPulse
    },
    { 
      title: 'Skillcourt Training', 
      desc: 'Innovatives videomotorisches Training, das Kognition mit Bewegung verknüpft.', 
      path: '/leistungen/skillcourt/',
      category: 'Prävention',
      area: 'Kognition',
      icon: Brain
    },
    { 
      title: 'SensoPro Training', 
      desc: 'Koordinationskonzept zur Stabilisierung und zum Training der Tiefenmuskulatur.', 
      path: '/leistungen/sensopro/',
      category: 'Prävention',
      area: 'Koordination',
      icon: Target
    },
    { 
      title: 'EAP - Physiotherapie (Privat)', 
      desc: 'Erweiterte Ambulante Physiotherapie als intensivierte Form der Rehabilitation.', 
      path: '/leistungen/eap-privat/',
      category: 'Spezialisierung',
      area: 'Intensiv',
      icon: ShieldCheck
    },
  ];

  const filteredLeistungen = useMemo(() => {
    if (selectedCategory === 'Alle') return leistungen;
    return leistungen.filter(l => l.category === selectedCategory);
  }, [selectedCategory]);

  const baseUrl = 'https://movin-freiburg.de';
  const canonicalUrl = `${baseUrl}/leistungen/`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonicalUrl}#leistungen`,
      "name": "Physiotherapeutische Leistungen bei MOVIN",
      "description": "Umfassende physiotherapeutische Leistungen in Freiburg und Rust. Krankengymnastik, Manuelle Therapie, Sportphysiotherapie, medizinisches Training und Prävention.",
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": leistungen.map((leistung, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": leistung.title,
          "url": `${baseUrl}${leistung.path}`
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
          "item": `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Leistungen",
          "item": canonicalUrl
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Physiotherapeutische Leistungen Freiburg"
        description="Von Krankengymnastik bis Sportphysiotherapie: Entdecken Sie das umfassende Leistungsangebot der MOVIN Physiotherapie in Freiburg und Rust."
        canonical={canonicalUrl}
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient-teal-mint">Unsere Leistungen</h1>
          <p className="text-xl text-dark/80 leading-relaxed">
            Wir bieten ein breites Spektrum an physiotherapeutischen Therapieformen.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter UI */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 text-dark/60 font-medium mr-4">
              <Filter className="w-5 h-5" />
              <span>Filtern nach:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                      : 'bg-light text-dark/70 hover:bg-mint hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredLeistungen.map((leistung) => (
                <motion.div
                  key={leistung.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={leistung.path} className="card-base group hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <leistung.icon className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">
                          {leistung.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-secondary group-hover:text-primary transition-colors">{leistung.title}</h2>
                      <p className="text-dark/70 mb-8 flex-grow">{leistung.desc}</p>
                      
                      <ul className="flex flex-col gap-2 mb-8">
                        <li className="flex items-center gap-2 text-sm text-dark/60"><CheckCircle2 className="w-4 h-4 text-primary" /> {leistung.area}</li>
                        <li className="flex items-center gap-2 text-sm text-dark/60"><CheckCircle2 className="w-4 h-4 text-primary" /> Evidenzbasierte Methoden</li>
                      </ul>

                      <div className="mt-auto pt-6 border-t border-border flex items-center justify-between text-primary font-semibold">
                        <span>Details ansehen</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 cta-footer-gradient text-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-sm">Unsicher, welche Therapie die richtige ist?</h2>
          <p className="text-white/85 text-lg mb-10">
            Lassen Sie uns gemeinsam herausfinden, was Ihnen am besten hilft. Vereinbaren Sie einen Ersttermin für eine ausführliche Anamnese.
          </p>
          <Link to="/termin/" className="btn-cta-cheetah text-lg px-8 py-4 rounded-full">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ersttermin vereinbaren
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
