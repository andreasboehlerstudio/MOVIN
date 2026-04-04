import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function LeistungenHub() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const categories = ['Alle', 'Physiotherapie', 'Spezialisierung', 'Prävention'];

  const leistungen = [
    { 
      title: 'Krankengymnastik', 
      desc: 'Individuelle Bewegungstherapie zur Wiederherstellung der Mobilität und Kraft.', 
      path: '/leistungen/krankengymnastik/',
      category: 'Physiotherapie',
      area: 'Ganzkörper'
    },
    { 
      title: 'Manuelle Therapie', 
      desc: 'Spezielle Handgrifftechniken zur Schmerzlinderung und Mobilisation von Gelenken.', 
      path: '/leistungen/manuelle-therapie/',
      category: 'Physiotherapie',
      area: 'Gelenke'
    },
    { 
      title: 'Sportphysiotherapie', 
      desc: 'Betreuung von Athleten für optimale Leistung, Prävention und schnelle Reha.', 
      path: '/leistungen/sportphysiotherapie/',
      category: 'Spezialisierung',
      area: 'Sport'
    },
    { 
      title: 'Rücken-Therapie', 
      desc: 'Gezielte Behandlung von Wirbelsäulenbeschwerden, Bandscheibenvorfällen und Haltungsschäden.', 
      path: '/leistungen/ruecken-therapie/',
      category: 'Spezialisierung',
      area: 'Rücken'
    },
    { 
      title: 'Knie- & Schulter-Therapie', 
      desc: 'Spezialisierte Rehabilitation nach Verletzungen, Überlastungen oder Operationen.', 
      path: '/leistungen/knie-schulter-therapie/',
      category: 'Spezialisierung',
      area: 'Extremitäten'
    },
    { 
      title: 'Lymphdrainage', 
      desc: 'Sanfte Massage zur Entstauung von geschwollenem Gewebe nach OPs oder Traumata.', 
      path: '/leistungen/lymphdrainage/',
      category: 'Physiotherapie',
      area: 'Ganzkörper'
    },
    { 
      title: 'Prävention & Gesundheitsförderung', 
      desc: 'Proaktive Maßnahmen und Kurse, um Beschwerden vorzubeugen und fit zu bleiben.', 
      path: '/leistungen/praevention-gesundheitsfoerderung/',
      category: 'Prävention',
      area: 'Prävention'
    },
  ];

  const filteredLeistungen = useMemo(() => {
    if (selectedCategory === 'Alle') return leistungen;
    return leistungen.filter(l => l.category === selectedCategory);
  }, [selectedCategory]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Leistungen | MOVIN Physiotherapie Freiburg",
    "description": "Umfassende physiotherapeutische Leistungen in Freiburg und Rust. Krankengymnastik, Manuelle Therapie, Sportphysio und mehr.",
    "url": "https://movin-freiburg.de/leistungen/"
  };

  return (
    <>
      <SEO 
        title="Physiotherapeutische Leistungen Freiburg"
        description="Von Krankengymnastik bis Sportphysiotherapie: Entdecke das umfassende Leistungsangebot der MOVIN Physiotherapie in Freiburg und Rust."
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient-teal-mint">Unsere Leistungen</h1>
          <p className="text-xl text-dark/80 leading-relaxed">
            Wir bieten ein breites Spektrum an evidenzbasierten Therapieformen. Unser Ziel ist es, nicht nur Symptome zu behandeln, sondern die Ursache zu finden und deine Gesundheit nachhaltig zu fördern.
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
                          <Activity className="w-7 h-7" />
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
      <section className="py-20 bg-secondary text-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Unsicher, welche Therapie die richtige ist?</h2>
          <p className="text-blue-tint/80 text-lg mb-10">
            Lass uns gemeinsam herausfinden, was dir am besten hilft. Vereinbare einen Ersttermin für eine ausführliche Anamnese.
          </p>
          <Link to="/termin/" className="btn-primary text-lg px-8 py-4">
            Ersttermin vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
