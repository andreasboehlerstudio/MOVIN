import { Link } from 'react-router';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/seo/SEO';
import { standorteData } from '../data/standorte';

export default function StandorteHub() {
  const standorte = Object.entries(standorteData).map(([slug, data]) => ({
    slug,
    ...data
  }));

  return (
    <>
      <SEO 
        title="Unsere Standorte | MOVIN Physiotherapie Freiburg & Rust"
        description="Finde die MOVIN Physiotherapie Praxis in deiner Nähe. Wir sind an drei Standorten in Freiburg (Lorettoberg, Mooswald) und Rust (Europa-Park) für dich da."
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="MOVIN Standorte" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint"
          >
            Unsere Standorte
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-tint/90 max-w-3xl mx-auto"
          >
            Boutique Physiotherapie in Wohlfühlatmosphäre. Entdecke unsere drei modernen Praxen in Freiburg und Rust.
          </motion.p>
        </div>
      </section>

      {/* Locations List */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="flex flex-col gap-16 md:gap-24">
            {standorte.map((standort, index) => (
              <motion.div 
                key={standort.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <Link to={`/standorte/${standort.slug}/`} className="block group relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]">
                    <img 
                      src={standort.image} 
                      alt={`MOVIN Praxis ${standort.name}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                      <span className="text-white font-bold flex items-center gap-2">
                        Details ansehen <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-widest text-sm mb-4">
                    <MapPin className="w-4 h-4" /> {standort.name === 'Europa-Park Rust' ? 'Rust' : 'Freiburg'}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6 leading-tight">
                    MOVIN <span className="text-gradient-teal-mint">{standort.name}</span>
                  </h2>
                  <p className="text-lg text-dark/80 mb-8 leading-relaxed">
                    {standort.description}
                  </p>
                  
                  <div className="mb-10">
                    <h3 className="text-sm font-heading font-bold text-secondary uppercase tracking-wider mb-4">Was dich erwartet:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {standort.highlights.slice(0, 6).map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3 text-dark/70">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link to={`/standorte/${standort.slug}/`} className="btn-primary">
                      Mehr erfahren
                    </Link>
                    <Link to="/termin/" className="btn-outline">
                      Termin buchen
                    </Link>
                  </div>

                  <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-6 text-sm text-dark/60">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      {standort.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      {standort.email}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-secondary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">Noch unsicher, welcher Standort der richtige ist?</h2>
              <p className="text-xl text-blue-tint/80 mb-10 max-w-2xl mx-auto">
                Egal für welchen Standort du dich entscheidest: Bei MOVIN erwartet dich überall die gleiche hohe Qualität und modernste Therapie.
              </p>
              <Link to="/kontakt/" className="btn-cta-cheetah text-lg px-10 py-4 rounded-full">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Kontaktiere uns
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
