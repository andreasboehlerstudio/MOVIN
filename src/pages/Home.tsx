import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Activity, MapPin, Brain, Clock, ArrowRight, Star, Smartphone, PlayCircle, Calendar, ArrowDown, ClipboardList } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';
import InstagramFeed from '../components/social/InstagramFeed';
import { SpotifyEmbeds } from '../components/social/SpotifyEmbeds';
import { GdprEmbed } from '../components/gdpr/GdprEmbed';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "MOVIN Physiotherapie Freiburg",
    "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
    "@id": "https://movin-freiburg.de",
    "url": "https://movin-freiburg.de",
    "telephone": "+497617073366",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mercystrasse 14",
      "addressLocality": "Freiburg",
      "postalCode": "79100",
      "addressCountry": "DE"
    }
  };

  return (
    <>
      <SEO 
        title="Physiotherapie Freiburg – Innovativ. Bewegt. Wirksam."
        description="MOVIN Physiotherapie in Freiburg & Europa-Park Rust. 20 Jahre Erfahrung, KI-gestützte Therapie, 48h Termingarantie. Jetzt Termin buchen!"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Physiotherapie Behandlung" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f4d]/90 via-[#0a0f4d]/80 to-[#00b2ba]/80" />
        </div>
        
        <div className="container-custom relative z-10 text-white w-full">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base text-white/90 font-heading font-medium tracking-[0.15em] uppercase mb-4"
            >
              Physiotherapie in Freiburg
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-6xl md:text-[5.5rem] font-bold mb-6 leading-[1.1] text-white tracking-tight uppercase"
            >
              Bewegung.<br />
              <span className="text-gradient-teal-mint">Innovation.</span><br />
              Heilung.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed"
            >
              Evidenzbasierte Physiotherapie für ein aktives Leben.<br />
              Innovativ · bewegt — an drei Standorten in Freiburg und Rust.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Link to="/standorte/" className="bg-primary text-white hover:bg-primary-hover transition-colors rounded-full text-base font-medium px-8 py-3 text-center block">
                  Unsere Standorte
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Link to="/leistungen/" className="bg-transparent border border-white/50 text-white hover:bg-white/10 transition-colors rounded-full text-base font-medium px-8 py-3 backdrop-blur-sm text-center block">
                  Leistungen entdecken
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
        >
          <ArrowDown className="w-5 h-5 text-white/70" />
        </motion.div>
      </section>

      {/* USP Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1 }}
        className="bg-white py-12 border-b border-border relative z-20 -mt-12 mx-4 md:mx-auto max-w-7xl rounded-2xl shadow-2xl"
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center text-primary">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-secondary">20+ Jahre</h3>
              <p className="text-sm text-dark/70">Erfahrung in Therapie</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center text-primary">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-secondary">3 Standorte</h3>
              <p className="text-sm text-dark/70">Freiburg & Europa-Park</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center text-primary">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-secondary">KI-Therapie</h3>
              <p className="text-sm text-dark/70">Modernste Diagnostik</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center text-primary">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-secondary">48h Garantie</h3>
              <p className="text-sm text-dark/70">Schnelle Terminvergabe</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Standorte */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
                Unsere <span className="text-gradient-teal-mint">Standorte</span>
              </h2>
              <p className="text-lg text-dark/80">Boutique Physiotherapie in Wohlfühlatmosphäre. Finde die MOVIN Praxis in deiner Nähe.</p>
            </div>
            <Link to="/standorte/" className="btn-outline shrink-0">Alle Standorte</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Lorettoberg', address: 'Mercystrasse 14, 79100 Freiburg', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', path: '/standorte/physiotherapie-freiburg-lorettoberg/' },
              { name: 'Mooswald', address: 'Wirthstraße 9, 79110 Freiburg', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', path: '/standorte/physiotherapie-freiburg-mooswald/' },
              { name: 'Europa-Park', address: 'Peter-Thumb-Str. 8, 77977 Rust', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800', path: '/standorte/physiotherapie-europa-park-rust/' },
            ].map((standort) => (
              <Link to={standort.path} key={standort.name} className="card-base group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img src={standort.img} alt={`MOVIN Praxis ${standort.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{standort.name}</h3>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-dark/70 mb-6 flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    {standort.address}
                  </p>
                  <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Details ansehen <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
                Unsere <span className="text-gradient-teal-mint">Leistungen</span>
              </h2>
              <p className="text-lg text-dark/80">Von klassischer Krankengymnastik bis zur innovativen Sportphysiotherapie – wir bieten ein umfassendes Spektrum für deine Gesundheit.</p>
            </div>
            <Link to="/leistungen/" className="btn-outline shrink-0">Alle Leistungen</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Krankengymnastik', desc: 'Individuelle Bewegungstherapie zur Wiederherstellung der Mobilität.', path: '/leistungen/krankengymnastik/' },
              { title: 'Manuelle Therapie', desc: 'Spezielle Handgrifftechniken zur Schmerzlinderung und Mobilisation.', path: '/leistungen/manuelle-therapie/' },
              { title: 'Sportphysiotherapie', desc: 'Betreuung von Athleten für optimale Leistung und schnelle Reha.', path: '/leistungen/sportphysiotherapie/' },
              { title: 'Rücken-Therapie', desc: 'Gezielte Behandlung von Wirbelsäulenbeschwerden und Bandscheiben.', path: '/leistungen/ruecken-therapie/' },
              { title: 'Knie- & Schulter', desc: 'Spezialisierte Reha nach Verletzungen oder Operationen an Gelenken.', path: '/leistungen/knie-schulter-therapie/' },
              { title: 'Lymphdrainage', desc: 'Sanfte Massage zur Entstauung von geschwollenem Gewebe.', path: '/leistungen/lymphdrainage/' },
            ].map((leistung) => (
              <Link to={leistung.path} key={leistung.title} className="p-8 rounded-2xl bg-light border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary">{leistung.title}</h3>
                <p className="text-dark/70 mb-6">{leistung.desc}</p>
                <span className="text-primary font-medium flex items-center gap-2 text-sm">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MOVIN App */}
      <section className="section-padding bg-secondary text-white overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-gradient-teal-mint font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Digital Health</span>
              <h2 className="text-4xl md:text-5xl mb-6 text-white tracking-tight">
                Die <span className="text-gradient-teal-mint">MOVIN App</span>:<br/> Deine Therapie für die Hosentasche
              </h2>
              <p className="text-blue-tint/80 text-lg mb-8">
                Mit unserer hauseigenen App begleiten wir dich auch außerhalb der Praxis. Greife auf individuelle Trainingspläne zu, verfolge deinen Fortschritt und bleibe in Kontakt mit deinem Therapeuten.
              </p>
              <ul className="flex flex-col gap-4 mb-10">
                {['Personalisierte Übungsvideos', 'Fortschritts-Tracking', 'Direkter Chat mit dem Therapeuten', 'Terminverwaltung'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-blue-tint/90">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Smartphone className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/digital/" className="btn-primary">Digital Health entdecken</Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800" 
                alt="MOVIN App auf Smartphone" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* App Booking Highlight */}
      <section className="py-12 bg-mint/20 border-b border-mint/40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Calendar className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
                  Termine bequem per App buchen
                </h3>
                <p className="text-dark/70 text-lg max-w-2xl">
                  Keine Warteschleifen mehr am Telefon: Buche, verschiebe oder storniere deine Physiotherapie-Termine rund um die Uhr direkt über dein Smartphone in der MOVIN App.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link to="/digital/movin-app/" className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
                <Smartphone className="w-5 h-5" />
                App herunterladen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Anamnesebogen Highlight */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-light p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ClipboardList className="w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary">
                    Digitaler Anamnesebogen
                  </h3>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">Jederzeit</span>
                </div>
                <p className="text-dark/70 text-lg max-w-2xl">
                  Sparen Sie Zeit bei Ihrem ersten Termin und füllen Sie unseren Anamnesebogen bereits vorab digital aus – ganz bequem von zu Hause und zu jeder Zeit.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link to="/digital/anamnesebogen/" className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
                <ClipboardList className="w-5 h-5" />
                Bogen ausfüllen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
              Das sagen unsere <span className="text-gradient-teal-mint">Patienten</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
            </div>
            <p className="text-lg font-bold text-secondary">4.9 / 5 Sternen auf Google</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', text: 'Nach meiner Knie-OP war ich bei MOVIN am Lorettoberg. Die Betreuung war erstklassig, die Therapeuten extrem kompetent. Dank der App konnte ich auch zuhause optimal trainieren.' },
              { name: 'Thomas K.', text: 'Endlich eine Praxis, die nicht nur Symptome behandelt, sondern die Ursache sucht. Die 48h Termingarantie hat mir bei akuten Rückenschmerzen sehr geholfen.' },
              { name: 'Julia R.', text: 'Modernes Ambiente, super freundliches Team und die Kombination aus klassischer Physio und gerätegestütztem Training ist perfekt. Sehr zu empfehlen!' },
            ].map((review, i) => (
              <div key={i} className="card-base p-8 relative">
                <div className="absolute top-8 right-8 text-primary/20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-dark/80 italic mb-6 relative z-10">"{review.text}"</p>
                <p className="font-bold text-secondary">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container-custom">
          <p className="text-center text-sm font-heading font-bold text-dark/50 uppercase tracking-widest mb-8">Unsere starken Partner</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['EHC Wölfe Freiburg', 'Urban Sports Club', 'Hansefit', 'Wellhub', 'Loretto Krankenhaus'].map((partner) => (
              <div key={partner} className="text-xl font-heading font-black text-secondary">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts & Blog */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Podcasts */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl mb-8 tracking-tight">
                Unsere <span className="text-gradient-teal-mint">Podcasts</span>
              </h2>
              <SpotifyEmbeds />
            </div>

            {/* Instagram Feed */}
            <div className="lg:col-span-2">
              <GdprEmbed category="marketing" provider="Instagram">
                <InstagramFeed />
              </GdprEmbed>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#4ade80]/40 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Bereit für <span className="bg-gradient-to-r from-secondary to-mint bg-clip-text text-transparent">schmerzfreie</span> Bewegung?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Nutze unsere 48h Termingarantie und starte deinen Weg zur Besserung noch diese Woche.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/termin/" className="btn-secondary text-lg px-8 py-4 bg-secondary text-white hover:bg-white hover:text-secondary">
              <Calendar className="w-5 h-5 mr-2" />
              Jetzt Termin buchen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
