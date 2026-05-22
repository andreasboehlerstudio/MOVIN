import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Smartphone, CheckCircle2, PlayCircle, MessageCircle, Calendar, FileText, Activity, Pill, Video, QrCode, ClipboardList, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';
import { GdprEmbed } from '../components/gdpr/GdprEmbed';

export default function DigitalApp() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const iosUrl = "https://apps.apple.com/de/app/movin/id6503604248";
  const androidUrl = "https://play.google.com/store/apps/details?id=de.hybric.therapiezentrum_app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MOVIN App",
    "operatingSystem": "iOS, Android",
    "applicationCategory": "HealthAndFitnessApplication",
    "description": "Die MOVIN App begleitet dich durch deine Physiotherapie. Trainingspläne, Fortschritts-Tracking und direkter Chat mit deinem Therapeuten.",
    "url": "https://movin-freiburg.de/digital/movin-app/"
  };

  return (
    <>
      <SEO 
        title="MOVIN App | Deine Physiotherapie für die Hosentasche"
        description="Mit der MOVIN App begleiten wir dich auch außerhalb der Praxis. Personalisierte Übungsvideos, Fortschritts-Tracking und direkter Chat mit deinem Therapeuten."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=2000" 
            alt="MOVIN App auf Smartphone" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-heading font-semibold uppercase tracking-wider text-sm mb-4">
            <Smartphone className="w-4 h-4" /> Digital Health
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">Die MOVIN App</h1>
          <p className="text-xl text-blue-tint/90">
            Deine Therapie für die Hosentasche. Wir begleiten dich auch außerhalb der Praxis auf deinem Weg zur Besserung.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform -translate-x-4 translate-y-4" />
                <img 
                  src="https://movin-freiburg.de/wp-content/uploads/2024/01/Movin-App-Screenshots.png" 
                  alt="MOVIN App Screenshots" 
                  className="relative z-10 rounded-[3rem] shadow-2xl w-full h-auto"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Deine Therapie, digital begleitet</h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-8">
                Mit der MOVIN App heben wir deine Physiotherapie auf das nächste Level. Sie vereinfacht nicht nur viele Prozesse, sondern schafft auch eine weitere Qualitätsverbesserung für deinen Therapieerfolg.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: PlayCircle, title: 'Übungsvideos', desc: 'Individuelle Pläne mit Videoanleitungen.' },
                  { icon: ClipboardList, title: 'Anamnesebögen', desc: 'Fragebögen bequem vorab ausfüllen.' },
                  { icon: Activity, title: 'Schmerztagebuch', desc: 'Tracking von Training & Schmerz.' },
                  { icon: Brain, title: 'KI mit Pia', desc: 'Intelligente Symptomanalyse & Beratung.' },
                  { icon: CheckCircle2, title: 'Praxisbegleiter', desc: 'Dein aktiver Begleiter durch die Therapie.' },
                  { icon: Calendar, title: 'Termine', desc: 'Alle Termine digital im Blick.' },
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-light border border-transparent hover:border-primary/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-dark/70">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">So einfach geht's</h2>
            <p className="text-lg text-dark/70">In drei Schritten zu deinem Wunschtermin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0" />
            
            {[
              { step: "01", title: "App herunterladen", desc: "Lade die kostenfreie MOVIN App im App Store oder Google Play Store herunter." },
              { step: "02", title: "Rezepte hochladen", desc: "Fotografiere deine ärztliche Verordnung einfach per App ab oder lade das PDF direkt hoch." },
              { step: "03", title: "Termine erhalten", desc: "Unser Service-Team sendet dir passende Optionen, die du direkt in der App bestätigen kannst." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-primary/5 text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-secondary mb-4">{item.title}</h4>
                <p className="text-dark/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-secondary mb-6"
            >
              Die App in Aktion
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-dark/70"
            >
              Erlebe die MOVIN App hautnah. Hier zeigen wir dir, wie einfach und effektiv die digitale Unterstützung in deinem Therapiealltag funktioniert.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "MOVIN App @ Mooswald",
                subtitle: "Physiotherapie & Training",
                videoUrl: "https://www.instagram.com/reel/DUNI1TzCG0z/embed",
                tag: "#physio"
              },
              {
                title: "Digitaler Begleiter",
                subtitle: "Fortschritt im Blick",
                videoUrl: "https://www.instagram.com/reel/DUKiuNWCNG6/embed",
                tag: "#fortschritt"
              },
              {
                title: "Einfache Handhabung",
                subtitle: "Therapie überall",
                videoUrl: "https://www.instagram.com/reel/DUJTodYiMFx/embed",
                tag: "#einfach"
              }
            ].map((video, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col h-full"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-light border border-primary/10">
                  <GdprEmbed category="marketing" provider="Instagram">
                    <iframe
                      src={video.videoUrl}
                      className="w-full h-full border-0"
                      allow="encrypted-media"
                      scrolling="no"
                    ></iframe>
                  </GdprEmbed>
                </div>
                <div className="mt-6">
                  <span className="px-3 py-1 bg-mint text-primary text-xs font-heading font-bold rounded-full uppercase tracking-wider mb-3 inline-block">
                    {video.tag}
                  </span>
                  <p className="text-xs font-heading font-medium text-primary mb-1 uppercase tracking-widest">{video.subtitle}</p>
                  <h4 className="text-xl font-bold text-secondary">{video.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-secondary mb-6">Dein digitaler Therapie-Hub</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Meine Rezepte", desc: "Verwalte deine Verordnungen digital." },
                  { title: "Fragen an den Arzt", desc: "Bereite dich optimal auf Arztgespräche vor." },
                  { title: "Wissenswertes", desc: "Wertvolle Tipps rund um deine Gesundheit." },
                  { title: "Meine Medikamente", desc: "Dokumentiere deine Medikation." },
                  { title: "Schmerztagebuch", desc: "Verfolge deine Schmerzintensität." },
                  { title: "Shop vor Ort", desc: "Entdecke Produkte direkt in unseren Zentren." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary text-sm">{item.title}</h4>
                      <p className="text-xs text-dark/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-secondary p-8 rounded-[2.5rem] text-white"
            >
              <h4 className="text-xl font-bold mb-4 text-white">Telemedizin</h4>
              <p className="text-blue-tint/80 mb-6">
                Bald kannst du deine Therapiegespräche auch bequem per Video-Call führen – egal wo du bist.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                <Video className="w-4 h-4" /> Coming Soon
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Bereit für die Physiotherapie von morgen?</h2>
          <p className="text-blue-tint/80 text-lg mb-10">
            Lade dir die MOVIN App kostenlos im App Store oder bei Google Play herunter. (Zugangsdaten erhältst du bei deinem ersten Termin).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a href={iosUrl} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-105">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on App Store" 
                className="h-14 w-auto"
              />
            </a>
            <a href={androidUrl} target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-105">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-14 w-auto"
              />
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-lg">
                {isMounted && <QRCodeSVG value={iosUrl} size={120} level="H" includeMargin={true} />}
              </div>
              <p className="text-sm font-heading font-bold text-blue-tint/60 uppercase tracking-widest flex items-center gap-2">
                <QrCode className="w-4 h-4" /> iOS App Store
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-lg">
                {isMounted && <QRCodeSVG value={androidUrl} size={120} level="H" includeMargin={true} />}
              </div>
              <p className="text-sm font-heading font-bold text-blue-tint/60 uppercase tracking-widest flex items-center gap-2">
                <QrCode className="w-4 h-4" /> Google Play Store
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
