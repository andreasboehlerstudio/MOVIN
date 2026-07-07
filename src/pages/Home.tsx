import { lazy, Suspense, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Activity, MapPin, Brain, Clock, ArrowRight, Star, Smartphone, PlayCircle, Calendar, ArrowDown, ClipboardList, HelpCircle, ChevronDown, ChevronUp, HeartPulse, Hand, Trophy, Dumbbell, ShieldCheck, ExternalLink } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';
import { GdprEmbed } from '../components/gdpr/GdprEmbed';
import { getYearsOfExperience } from '../data/companyInfo';
import PartnerLogos from '../components/common/PartnerLogos';

const SpotifyEmbeds = lazy(() => import('../components/social/SpotifyEmbeds').then((module) => ({ default: module.SpotifyEmbeds })));
const InstagramFeed = lazy(() => import('../components/social/InstagramFeed'));

const googleReviewProfiles = [
  {
    name: 'MOVIN Lorettoberg',
    rating: '4,9 / 5',
    reviewCount: '34 Google-Rezensionen',
    quote: 'Perfekte Betreuung von A bis Z.',
    author: 'Google-Rezension',
    href: 'https://www.google.com/search?q=MOVIN+Physiotherapie+Lorettoberg+Google+Bewertungen',
  },
  {
    name: 'MOVIN Mooswald',
    rating: '4,9 / 5',
    reviewCount: '73 Google-Rezensionen',
    quote: 'Top! Fühle mich dort jedes Mal aufs Neue wohl und besser.',
    author: 'Goran Salah',
    href: 'https://www.google.com/search?q=MOVIN+Physiotherapie+Mooswald+Google+Bewertungen',
  },
  {
    name: 'MOVIN Europa-Park Rust',
    rating: '4,8 / 5',
    reviewCount: '9 Google-Rezensionen',
    quote: 'Eine sehr angenehme Atmosphäre und äußerst nette Physiotherapeuten.',
    author: 'Google-Rezension',
    href: 'https://www.google.com/search?q=MOVIN+Physiotherapie+Europa-Park+Rust+Google+Bewertungen',
  },
];

export default function Home() {
  const years = getYearsOfExperience();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const appVisualRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: appScrollProgress } = useScroll({
    target: appVisualRef,
    offset: ['start end', 'end start'],
  });
  const appVisualY = useTransform(appScrollProgress, [0, 1], [42, -42]);
  const appVisualRotate = useTransform(appScrollProgress, [0, 1], [-1.5, 1.5]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "MOVIN Physiotherapie Freiburg",
    "image": "https://movin-freiburg.de/images/standorte/lorettoberg/lorettoberg-startseite-20260622.webp",
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
        description={`MOVIN Physiotherapie in Freiburg & Europa-Park Rust. ${years} Jahre Erfahrung, KI-gestützte Therapie, 48h Termingarantie. Jetzt Termin buchen!`}
        schema={schema}
        preloadImage="/images/MOVIN_Header_Home_V3-poster.webp"
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] lg:h-screen min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/MOVIN_Header_Home_V3-poster.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
            poster="/images/MOVIN_Header_Home_V3-poster.webp"
          >
            <source src="/images/MOVIN_Header_Home_V3-optimized.mp4" type="video/mp4" media="(min-width: 768px)" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f4d]/90 via-[#0a0f4d]/80 to-[#00b2ba]/80" />
        </div>
        
        <div className="container-custom relative z-10 text-white w-full">
          <div className="max-w-3xl -ml-2 sm:ml-0">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base text-white/90 font-heading font-medium tracking-[0.15em] uppercase mb-4"
            >
              Physiotherapie in Freiburg und Rust
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-[5rem] font-bold mb-6 leading-[1.1] text-white tracking-tight uppercase break-words hyphens-auto [overflow-wrap:anywhere]"
            >
              Evidenzbasierte<br />
              <span className="text-gradient-teal-mint">Physiotherapie</span><br />
              für nachhaltige Erfolge.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl font-light leading-relaxed"
            >
              Innovativ · Bewegt · Auf Basis aktueller Evidenz durch unser spezialisiertes<br className="hidden md:inline" /> Hands-Off Konzept an drei Standorten von Freiburg bis Rust.
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
        className="bg-white py-12 border-b border-border relative z-20 -mt-12 mx-4 md:mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] rounded-2xl shadow-2xl"
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center text-primary">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-secondary">{years}+ Jahre</h3>
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
              <h3 className="font-bold text-secondary">KI-Integration</h3>
              <p className="text-sm text-dark/70">Next Level</p>
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
              <p className="text-lg text-dark/80">Individueller Charme trifft auf gewohnte Qualität. Erleben Sie an jedem Standort unser volles großes Leistungsangebot mit der Kompetenz unseres gesamten Teams.</p>
            </div>
            <Link to="/standorte/" className="btn-outline shrink-0">Alle Standorte</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Lorettoberg', 
                address: 'Mercystrasse 14, 79100 Freiburg', 
                img: '/images/standorte/lorettoberg/lorettoberg-startseite-20260622.webp',
                path: '/standorte/physiotherapie-freiburg-lorettoberg/',
                badges: [
                  { img: '/images/partner-logos/zertifikate/badge_lorettoberg.png', title: 'Ausgezeichnete Patientenzufriedenheit' },
                  { img: '/images/partner-logos/zertifikate/ppcertificate.png', title: 'Zertifizierter Praxis-Standard' }
                ]
              },
              { 
                name: 'Mooswald', 
                address: 'Wirthstraße 9, 79110 Freiburg', 
                img: '/images/standorte/mooswald/mooswald-main.webp',
                path: '/standorte/physiotherapie-freiburg-mooswald/',
                badges: [
                  { img: '/images/partner-logos/zertifikate/badge_mooswald.png', title: 'Ausgezeichnete Patientenzufriedenheit' },
                  { img: '/images/partner-logos/zertifikate/ppcertificate.png', title: 'Zertifizierter Praxis-Standard' }
                ]
              },
              { 
                name: 'Europa-Park', 
                address: 'Peter-Thumb-Str. 8, 77977 Rust', 
                img: '/images/standorte/rust/rust-main.webp', 
                path: '/standorte/physiotherapie-europa-park-rust/',
                badges: [
                  { img: '/images/partner-logos/zertifikate/ppcertificate.png', title: 'Zertifizierter Praxis-Standard' }
                ]
              },
            ].map((standort) => (
              <Link to={standort.path} key={standort.name} className="card-base group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={standort.img} 
                    alt={`MOVIN Praxis ${standort.name}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{standort.name}</h3>
                  {standort.badges && (
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      {standort.badges.map((b, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-lg border border-white/20 hover:scale-110 hover:rotate-3 transition-all duration-300 w-11 h-11 flex items-center justify-center" 
                          title={b.title}
                        >
                          <img 
                            src={b.img} 
                            alt={b.title} 
                            className="max-w-full max-h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
              <p className="text-lg text-dark/80">Von klassischer Krankengymnastik bis zur innovativen Sportphysiotherapie – wir bieten ein umfassendes Spektrum für Ihre Gesundheit.</p>
            </div>
            <Link to="/leistungen/" className="btn-outline shrink-0">Alle Leistungen</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Krankengymnastik', desc: 'Individuelle Bewegungstherapie zur Wiederherstellung der Mobilität.', path: '/leistungen/krankengymnastik/', icon: HeartPulse },
              { title: 'Manuelle Therapie', desc: 'Spezielle Handgrifftechniken zur Schmerzlinderung und Mobilisation.', path: '/leistungen/manuelle-therapie/', icon: Hand },
              { title: 'Sportphysiotherapie', desc: 'Zielgerichtete Betreuung von Sportler*innen zur Leistungsoptimierung, Verletzungsprävention und spezifischen Rehabilitation.', path: '/leistungen/sportphysiotherapie/', icon: Trophy },
              { title: 'MTT Training', desc: 'Zielgerichtetes, gerätegestütztes Training zur Rehabilitation und Prävention.', path: '/leistungen/mtt-training/', icon: Dumbbell },
              { title: 'Krankengymnastik am Gerät', desc: 'Medizinisches Aufbautraining mit therapeutischer Begleitung.', path: '/leistungen/krankengymnastik-am-geraet/', icon: Activity },
              { title: 'EAP Physiotherapie', desc: 'Intensive Komplexleistung für Privatversicherte.', path: '/leistungen/eap-privat/', icon: ShieldCheck },
            ].map((leistung) => (
              <Link to={leistung.path} key={leistung.title} className="p-8 rounded-2xl bg-light border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <leistung.icon className="w-6 h-6" />
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
            <div className="lg:w-[44%]">
              <span className="text-gradient-teal-mint font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Digital</span>
              <h2 className="text-4xl md:text-5xl mb-6 text-white tracking-tight">
                Die <span className="text-gradient-teal-mint">MOVIN App</span>:<br/> Ihre Therapie für die Hosentasche
              </h2>
              <p className="text-blue-tint/80 text-lg mb-8">
                Mit unserer hauseigenen App begleiten wir Sie auch außerhalb der Praxis. Greifen Sie auf individuelle Trainingspläne zu, verfolgen Sie Ihren Fortschritt und bleiben Sie in Kontakt mit Ihrem Therapeuten.
              </p>
              <ul className="flex flex-col gap-4 mb-10">
                {['Trainingspläne', 'Rezepte & Service', 'Schmerztagebuch', 'Anamnesebogen & Ergebnisbogen', 'Fallmanager'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-blue-tint/90">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Smartphone className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/digital/" className="btn-primary">Die App entdecken</Link>
            </div>
            <motion.div ref={appVisualRef} className="lg:w-[56%] relative flex justify-center">
              <div className="absolute inset-[8%] bg-[radial-gradient(circle_at_55%_45%,rgba(96,195,205,0.30),rgba(178,234,214,0.13)_36%,transparent_70%)] blur-3xl rounded-full" />
              <div className="absolute left-1/2 top-1/2 h-40 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[-11deg] rounded-full bg-primary/10 blur-2xl" />
              <motion.div
                className="relative z-10 w-full max-w-[760px]"
                style={{
                  y: shouldReduceMotion ? 0 : appVisualY,
                  rotate: shouldReduceMotion ? 0 : appVisualRotate,
                }}
              >
                <motion.img
                  src="/images/movin-app/iphone-mockup-home-20260703.webp"
                  alt="MOVIN App Screens auf iPhone Mockups"
                  className="w-full drop-shadow-[0_28px_90px_rgba(0,0,0,0.38)] transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                  animate={shouldReduceMotion ? undefined : {
                    y: [0, -18, -4, 10, 0],
                    x: [0, 7, 0, -6, 0],
                    rotate: [0, 0.7, 0.15, -0.55, 0],
                    scale: [1, 1.01, 1.004, 1.012, 1],
                  }}
                  transition={shouldReduceMotion ? undefined : {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Booking Highlight */}
      <section className="py-12 bg-mint/20 border-b border-mint/40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 text-center lg:text-left">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Calendar className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
                  Termine bequem per App buchen
                </h3>
                <p className="text-dark/70 text-lg max-w-2xl">
                  Keine Warteschleifen mehr am Telefon: Buchen, verschieben oder stornieren Sie Ihre Physiotherapie-Termine rund um die Uhr direkt über Ihr Smartphone in der MOVIN App.
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 shrink-0 w-full lg:w-auto">
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-light p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 text-center lg:text-left">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ClipboardList className="w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary">
                    Digitaler Anamnesebogen
                  </h3>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">Jederzeit</span>
                </div>
                <p className="text-dark/70 text-lg max-w-2xl">
                  Wenn Sie unsere App nicht nutzen, können Sie den Anamnesebogen auch hier online ausfüllen und uns die wichtigsten Informationen vor Ihrem Termin übermitteln.
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <Link to="/digital/anamnesebogen/" className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
                <ClipboardList className="w-5 h-5" />
                Anamnesebogen öffnen
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
              Das sagen unsere <span className="text-gradient-teal-mint">Patient:innen</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
            </div>
            <p className="text-lg font-bold text-secondary">
              Aktuelle Bewertungen direkt bei Google ansehen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {googleReviewProfiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-8 flex flex-col justify-between gap-8 hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-primary text-primary" />)}
                    </div>
                    <span className="text-sm font-bold text-secondary">{profile.rating}</span>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">{profile.reviewCount}</p>
                  <h3 className="text-xl font-bold text-secondary mb-4">{profile.name}</h3>
                  <p className="text-dark/80 italic text-lg leading-relaxed">
                    "{profile.quote}"
                  </p>
                  <p className="text-sm font-semibold text-dark/55 mt-5">{profile.author}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-bold">
                  Google-Bewertungen öffnen <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container-custom">
          <p className="text-center text-sm font-heading font-bold text-dark/50 uppercase tracking-widest mb-12">Unsere starken Partner</p>
          <PartnerLogos />
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
              <Suspense fallback={<div className="h-48 rounded-3xl bg-light border border-border animate-pulse" aria-hidden="true" />}>
                <SpotifyEmbeds />
              </Suspense>
            </div>

            {/* Instagram Feed */}
            <div className="lg:col-span-2">
              <GdprEmbed category="marketing" provider="Instagram">
                <Suspense fallback={<div className="h-56 rounded-3xl bg-light border border-border animate-pulse" aria-hidden="true" />}>
                  <InstagramFeed />
                </Suspense>
              </GdprEmbed>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Kurz-Bereich */}
      <section className="section-padding bg-light border-y border-border">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              <HelpCircle className="w-5 h-5" /> FAQ
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
              Häufig gestellte <span className="text-gradient-teal-mint">Fragen</span>
            </h2>
            <p className="text-lg text-dark/70">
              Die wichtigsten Antworten rund um Ihren Besuch bei MOVIN kurz und verständlich auf den Punkt gebracht.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                question: "Brauche ich ein Rezept für die Behandlung?",
                answer: "Für physiotherapeutische Behandlungen, die über die Krankenkasse abgerechnet werden sollen, benötigen Sie eine ärztliche Verordnung (Rezept)."
              },
              {
                question: "Wie lange ist mein Rezept gültig?",
                answer: "Ein Rezept der gesetzlichen Krankenkasse muss innerhalb von 28 Tagen nach Ausstellungsdatum begonnen werden, es sei denn, der Arzt hat einen dringlichen Behandlungsbedarf (innerhalb von 14 Tagen) vermerkt."
              },
              {
                question: "Was muss ich zum ersten Termin mitbringen?",
                answer: "Bitte bringen Sie Ihr Rezept, Ihre Versichertenkarte, ein großes Handtuch, bequeme (sportliche) Kleidung sowie eventuell vorhandene Arztberichte oder Röntgen-/MRT-Bilder mit."
              },
              {
                question: "Wie funktioniert die 48h Termingarantie?",
                answer: "Für Neupatienten mit akuten Schmerzen garantieren wir einen Ersttermin innerhalb von 48 Stunden an einem unserer drei Standorte. Bitte rufen Sie uns hierfür direkt an."
              },
              {
                question: "Wie kann ich einen Termin absagen?",
                answer: "Termine müssen mindestens 24 Stunden vorher abgesagt werden (telefonisch, per E-Mail oder über die MOVIN App). Bei kurzfristigeren Absagen oder Nichterscheinen behalten wir uns vor, eine Ausfallgebühr in Rechnung zu stellen."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`card-base bg-white transition-all duration-300 ${openFaqIndex === index ? 'border-primary/50 shadow-md' : 'hover:border-border/80'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <h3 className="text-lg font-bold text-secondary pr-8">{faq.question}</h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-dark/40 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-dark/80 leading-relaxed border-t border-border/50 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/faq/" className="btn-outline inline-flex items-center gap-2">
              Alle Fragen ansehen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#4ade80]/40 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Bereit für <span className="bg-gradient-to-r from-secondary via-[#25366f] to-[#008895] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.16)]">kraftvolle und schmerzfreie</span> Bewegung?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Nutzen Sie unsere 48h Termingarantie und starten Sie Ihren Weg zur Besserung noch diese Woche.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/termin/" className="btn-cta-cheetah text-lg px-8 py-4 rounded-full">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Jetzt Termin buchen
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
