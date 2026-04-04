import { Link } from 'react-router-dom';
import { Smartphone, Brain, ArrowRight, CheckCircle2, Activity, Zap, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/seo/SEO';

export default function DigitalHub() {
  const digitalServices = [
    {
      title: 'MOVIN App',
      slug: 'movin-app',
      icon: Smartphone,
      description: 'Deine Therapie für die Hosentasche. Die MOVIN App ist dein täglicher Begleiter auf dem Weg zur Genesung. Sie verbindet dich direkt mit deinem Therapeuten und bietet dir maßgeschneiderte Unterstützung, wann immer du sie brauchst.',
      features: [
        'Personalisierte Video-Trainingspläne',
        'Echtzeit-Chat mit deinem Therapeuten',
        'Digitales Schmerztagebuch & Tracking',
        'Einfache Terminübersicht & Buchung',
        'Anamnese-Fragebögen vorab ausfüllen',
        'Alle Befunde & Rezepte digital dabei'
      ],
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
      color: 'teal'
    },
    {
      title: 'KI-Physiotherapie',
      slug: 'ki-physiotherapie',
      icon: Brain,
      description: 'Präziser, schneller, wirksamer. Durch den Einsatz modernster Künstlicher Intelligenz und 3D-Kamerasensoren heben wir die Diagnostik auf ein neues Level. Erlebe eine Analyse, die über das menschliche Auge hinausgeht und uns hilft, die Ursachen deiner Beschwerden noch exakter zu identifizieren.',
      features: [
        'KI-gestützte Bewegungsanalyse in Echtzeit',
        'Objektive Messung von Gelenkwinkeln',
        'Erkennung muskulärer Dysbalancen',
        'Datenbasierte Erfolgskontrolle',
        'Präzise Vorher-Nachher-Vergleiche',
        'Optimierte Return-to-Sport Diagnostik'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      color: 'mint'
    },
    {
      title: 'KI Symptomcheck',
      slug: 'ki-symptomcheck',
      icon: Activity,
      description: 'Erhalte eine erste Einschätzung deiner Beschwerden in Sekundenschnelle. Unser KI-gestützter Symptomcheck analysiert deine Angaben und gibt dir wertvolle Orientierungshilfen sowie Empfehlungen für die nächsten Schritte.',
      features: [
        'Schnelle Ersteinschätzung',
        'KI-gestützte Ursachenanalyse',
        'Empfehlungen für nächste Schritte',
        'Erkennung von Warnsignalen (Red Flags)',
        'Diskret und jederzeit verfügbar',
        'Vorbereitung für das Therapeutengespräch'
      ],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      color: 'teal'
    },
    {
      title: 'Digitaler Anamnesebogen',
      slug: 'anamnesebogen',
      icon: ClipboardList,
      description: 'Spare Zeit und bereite dich optimal auf deinen ersten Termin vor. Fülle unseren digitalen Anamnesebogen bequem von zu Hause aus aus – ganz flexibel und zu jeder Zeit. Deine Daten werden sicher an uns übermittelt.',
      features: [
        'Bequem von zu Hause ausfüllen',
        'Sichere digitale Übermittlung',
        'Zeitersparnis beim ersten Termin',
        'Detaillierte Erfassung deiner Beschwerden',
        'PDF-Download für deine Unterlagen',
        'Optimale Vorbereitung für den Therapeuten'
      ],
      image: 'https://images.unsplash.com/photo-1505751172107-5739a00723a5?auto=format&fit=crop&q=80&w=800',
      color: 'blue'
    }
  ];

  return (
    <>
      <SEO 
        title="Digital Health | Physiotherapie der Zukunft | MOVIN"
        description="Entdecke die digitale Welt von MOVIN. Mit unserer App und KI-gestützter Physiotherapie begleiten wir dich modern und effektiv auf deinem Weg zur Genesung."
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
            alt="Digital Health Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-primary text-sm font-heading font-bold uppercase tracking-widest mb-6"
          >
            <Zap className="w-4 h-4" /> Innovation @ MOVIN
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint"
          >
            Digital Health
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-tint/90 max-w-3xl mx-auto"
          >
            Wir kombinieren therapeutische Exzellenz mit modernster Technologie, um deinen Heilungsprozess optimal zu unterstützen.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {digitalServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-primary/5"
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  <div className="absolute bottom-6 left-8 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-white">{service.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <p className="text-lg text-dark/80 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-10 flex-grow">
                    <h3 className="text-sm font-heading font-bold text-secondary uppercase tracking-wider">Was dich erwartet:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-dark/70">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to={`/digital/${service.slug}/`} 
                    className="btn-primary w-full justify-center group/btn"
                  >
                    Details entdecken
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digital Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-secondary mb-8 leading-tight">
                Warum <span className="text-gradient-teal-mint">Digital</span>?
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Kontinuität</h3>
                    <p className="text-dark/70">Deine Therapie endet nicht an der Praxistür. Mit digitalen Tools bleibst du auch zu Hause am Ball.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Präzision</h3>
                    <p className="text-dark/70">KI-gestützte Analysen liefern objektive Daten, die uns helfen, deine Therapie noch individueller zu gestalten.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Transparenz</h3>
                    <p className="text-dark/70">Verfolge deinen Fortschritt schwarz auf weiß und sieh genau, wie du dich von Woche zu Woche verbesserst.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform translate-x-6 translate-y-6" />
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000" 
                alt="Therapeut nutzt Tablet" 
                className="relative z-10 rounded-[3rem] shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-20 bg-secondary text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Bereit für die Zukunft?</h2>
          <p className="text-blue-tint/80 text-lg mb-10">
            Erlebe selbst, wie digitale Innovation deine Gesundheit fördern kann. Vereinbare jetzt deinen Termin in einem unserer modernen Zentren.
          </p>
          <Link to="/termin/" className="btn-primary text-lg px-10 py-4">
            Termin vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
