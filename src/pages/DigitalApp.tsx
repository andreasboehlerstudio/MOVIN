import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { 
  Smartphone, 
  CheckCircle2, 
  PlayCircle, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Activity, 
  Pill, 
  Video, 
  QrCode, 
  ClipboardList, 
  Brain, 
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  UploadCloud,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

interface AppFeature {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<any>;
  videoUrl?: string;
  videoKeywords?: string[];
  poster: string;
  tag: string;
}

const appFeatures: AppFeature[] = [
  {
    id: "rezepte",
    title: "Meine Rezepte",
    subtitle: "Schneller Rezept-Upload",
    desc: "Um Ihnen die Kontaktaufnahme und Terminfindung zu erleichtern, können Sie hier Ihr Rezept hochladen und Ihre Terminwünsche eintragen. Beides wird von uns bearbeitet und Sie erhalten alle Infos und Zeiten digital zurück. Zudem können Zuzahlungen zum Rezept direkt mit PayPal beglichen werden. Mögliche Fehler im Rezept werden mit Änderungswunsch hinzugefügt.",
    icon: FileText,
    videoUrl: "/videos/app/rezepte-optimized.mp4",
    videoKeywords: ["rezepte"],
    poster: "/images/movin-app/menu.png",
    tag: "#rezepte"
  },
  {
    id: "physiotherapie",
    title: "Meine Trainingspläne",
    subtitle: "Detaillierte Übungsvideos",
    desc: "Keine Übung gerät jemals mehr in Vergessenheit und kein Plan geht mehr verloren. Unsere Trainingsgeräte finden Sie hier als digitale Version. Zudem erstellen wir mit Ihnen auf Basis der Physiotherapie Ihre individuellen Übungen per Video. Dies auch im Bereich „Hausaufgaben“, mit der Möglichkeit, an die Übungszeit erinnert zu werden.",
    icon: Activity,
    videoUrl: "/videos/app/Video Meine Physiotherapie-optimized.mp4",
    videoKeywords: ["meine physiotherapie", "physiotherapie"],
    poster: "/images/movin-app/Mockup_movin_app.png",
    tag: "#coaching"
  },
  {
    id: "schmerztagebuch",
    title: "Schmerztagebuch",
    subtitle: "Verlauf & Symptome tracken",
    desc: "Bitte teilen Sie uns wichtige Informationen über Ihre Schmerzen und Befinden mit. Je mehr wir über Ihre Beschwerden und deren Verlauf wissen, desto besser können wir Sie in der Therapie unterstützen.",
    icon: ClipboardList,
    videoUrl: "/videos/app/Video Schmerztagebuch-optimized.mp4",
    videoKeywords: ["schmerztagebuch", "schmerz"],
    poster: "/images/movin-app/menu.png",
    tag: "#tracking"
  },
  {
    id: "anamnese",
    title: "Anamnesebogen & Ergebnisbogen",
    subtitle: "Optimale Erstvorbereitung",
    desc: "Um uns optimal auf Ihren ersten Termin vorzubereiten, benötigen wir einige Informationen über Ihre Beschwerden. Dafür haben wir einen Anamnesebogen auf ICF-Basis erstellt. Am Ende Ihrer Therapie möchten wir diese Informationen mit dem Beginn vergleichen. Passend dazu finden Sie einen Outcomes-Bogen.",
    icon: CheckCircle2,
    videoUrl: "/videos/app/Video Anamnesebogen-optimized.mp4",
    videoKeywords: ["anamnesebogen", "ergebnis"],
    poster: "/images/movin-app/h-main-parallax-2.png",
    tag: "#anamnese"
  },
  {
    id: "fragen-arzt",
    title: "Fragen an den Arzt",
    subtitle: "Therapiebegleitende Klärungen",
    desc: "Wichtige Fragen können schnell vergessen werden oder im Alltag untergehen. Mit dieser Funktion kann dies nicht mehr passieren. Wir formulieren hier Fragen für Sie an die Ärztinnen, die diese direkt beantworten können. So gehen therapie-relevante Fragen nicht mehr verloren.",
    icon: MessageCircle,
    videoKeywords: ["fragen", "arzt"],
    poster: "/images/movin-app/movin-menu.png",
    tag: "#arzt"
  },
  {
    id: "wissenswertes",
    title: "Wissenswertes",
    subtitle: "Praxis-Infos & Gesundheitstipps",
    desc: "Wir freuen uns, Ihnen Informationen über unsere Praxen und spannende Einblicke in die Welt der Physiotherapie zu bieten. Entdecken Sie hier mehr oder werfen Sie einen Blick über den Tellerrand der klassischen Therapie.",
    icon: Brain,
    videoUrl: "/videos/app/Video Wissenswertes-optimized.mp4",
    videoKeywords: ["wissenswertes", "wissen"],
    poster: "/images/movin-app/menu.png",
    tag: "#wissen"
  },
  {
    id: "shop",
    title: "Shop vor Ort",
    subtitle: "Hilfsmittel & Abokarten",
    desc: "Benötigen Sie ein Hilfsmittel für Ihre Therapie? Dann können Sie aus unserem Angebot das passende Produkt reservieren oder bestellen. Auch unsere Abokarten für das Training stehen Ihnen zur Verfügung. Die Bezahlung erfolgt bequem per PayPal!",
    icon: QrCode,
    videoUrl: "/videos/app/_Video App Shop-optimized.mp4",
    videoKeywords: ["_video app shop", "app shop", "shop"],
    poster: "/images/movin-app/Mockup_2_Phones.png",
    tag: "#shop"
  },
  {
    id: "telemedizin",
    title: "Telemedizin (Coming Soon)",
    subtitle: "Sichere Video-Therapie",
    desc: "Die Krankenkassen ermöglichen es Ihnen und uns, die Therapie per Telemedizin durchzuführen. Nutzen Sie dafür unsere App, die DSGVO-konform, verschlüsselt und absolut sicher ist.",
    icon: Video,
    videoKeywords: ["telemedizin"],
    poster: "/images/movin-app/h-main-parallax-2.png",
    tag: "#telemedizin"
  },
  {
    id: "dokumente",
    title: "Meine Dokumente",
    subtitle: "Befunde & Berichte hochladen",
    desc: "Bitte laden Sie hier alle wichtigen Unterlagen zu Ihrer Therapie hoch. Dies können Arztberichte, MRT-Berichte oder auch Nachbehandlungsschemata sein. Von uns bereitgestellt werden der Behandlungsvertrag und unsere DSGVO, die Sie unterscheiben oder akzeptieren können.",
    icon: FileText,
    videoUrl: "/videos/app/Video Dokumente-optimized.mp4",
    videoKeywords: ["dokumente"],
    poster: "/images/movin-app/movin-menu.png",
    tag: "#dokumente"
  },
  {
    id: "medikamente",
    title: "Meine Medikamente",
    subtitle: "Integrierte Medikationsliste",
    desc: "Keine zusätzliche App für Ihre aktuellen Medikamente nötig! Pflegen Sie Ihre Medikation einfach in unserer App ein. Das kann auch für uns therapierelevant sein und sichert Sie perfekt ab.",
    icon: Pill,
    videoUrl: "/videos/app/Video Medikamente-optimized.mp4",
    videoKeywords: ["medikamente"],
    poster: "/images/movin-app/menu.png",
    tag: "#medikamente"
  }
];

const getFeatureVideoSrc = (feature: AppFeature, index: number, detected: string[] = []) => {
  if (feature.videoUrl) return feature.videoUrl;

  const keywords = [
    ...(feature.videoKeywords || []),
    feature.id,
    feature.id.replace('-', '_')
  ].map(keyword => keyword.toLowerCase());

  const exactMatch = detected.find(v => {
    const filename = v.toLowerCase();
    return keywords.some(keyword => filename.includes(keyword));
  });
  if (exactMatch) return exactMatch;

  const sequentialMatch = detected.find(v => {
    const filename = v.toLowerCase();
    const basename = filename.split('/').pop() || '';
    if (basename.startsWith('video')) {
      const numberPart = basename.replace(/\D/g, ''); // Extract digits
      if (numberPart) {
        return parseInt(numberPart, 10) === index + 1;
      }
    }
    return false;
  });
  if (sequentialMatch) return sequentialMatch;

  return "";
};

export default function DigitalApp() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeId, setActiveId] = useState<string>("rezepte");
  const [detectedVideos, setDetectedVideos] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetch("/api/list-videos")
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.videos)) {
          setDetectedVideos(data.videos);
        }
      })
      .catch(err => {
        console.error("Failed to list dynamic videos:", err);
      });
  }, []);

  const iosUrl = "https://apps.apple.com/de/app/movin/id6503604248";
  const androidUrl = "https://play.google.com/store/apps/details?id=de.hybric.therapiezentrum_app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MOVIN App",
    "operatingSystem": "iOS, Android",
    "applicationCategory": "HealthAndFitnessApplication",
    "description": "Die MOVIN App begleitet Sie durch Ihre Physiotherapie. Trainingspläne, Fortschritts-Tracking und direkter Chat mit Ihrem Therapeuten.",
    "url": "https://movin-freiburg.de/digital/movin-app/"
  };

  const activeFeature = appFeatures.find(f => f.id === activeId) || appFeatures[0];

  return (
    <>
      <SEO 
        title="MOVIN App | Ihre Physiotherapie für die Hosentasche"
        description="Mit der MOVIN App begleiten wir Sie auch außerhalb der Praxis. Personalisierte Übungsvideos, Fortschritts-Tracking und direkter Chat mit Ihrem Therapeuten."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[480px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/movin-app/h-main-parallax-2.png" 
            alt="MOVIN App Screens und Funktionen" 
            className="w-full h-full object-cover opacity-35 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/40" />
        </div>
        
        <div className="container-custom relative z-10 text-white text-center max-w-4xl mx-auto px-4 mt-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-primary font-heading font-semibold uppercase tracking-wider text-sm mb-4"
          >
            <Smartphone className="w-5 h-5 text-primary" /> Digital
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint"
          >
            Die MOVIN App
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-blue-tint/90 max-w-2xl mx-auto leading-relaxed"
          >
            Ihre Physiotherapie für die Hosentasche. Wir begleiten Sie auch außerhalb unserer Behandlungsräume optimal auf Ihrem Weg zur Genesung.
          </motion.p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative order-2 lg:order-1 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative max-w-md w-full"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform -translate-x-4 translate-y-4" />
                <img 
                  src="/images/movin-app/GIF_Main_auf_einenblick_2_iteration_3.gif" 
                  alt="MOVIN App Hauptmenü im Überblick" 
                  className="relative z-10 rounded-[2.5rem] shadow-2xl w-full max-w-[300px] mx-auto h-auto bg-white"
                />
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="px-3 py-1 bg-mint text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
                Fortschrittlich & Intuitiv
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">Ihre Therapie, digital begleitet</h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-8">
                Mit der MOVIN App heben wir Ihre Physiotherapie auf das nächste Level. Sie vereinfacht nicht nur viele administrative Prozesse, sondern schafft auch eine spürbare Qualitätsverbesserung für Ihren persönlichen Therapieerfolg.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: PlayCircle, title: 'Übungsvideos', desc: 'Individuelle Pläne mit glasklaren Videoanleitungen.' },
                  { icon: ClipboardList, title: 'Anamnesebögen', desc: 'Fragebögen bequem und stressfrei vorab erledigen.' },
                  { icon: Activity, title: 'Schmerztagebuch', desc: 'Lückenloses Tracking von Training & Schmerzverlauf.' },
                  { icon: Brain, title: 'KI mit Pia', desc: 'Intelligente Symptomanalyse & sofortige Beratung.' },
                  { icon: CheckCircle2, title: 'Praxisbegleiter', desc: 'Ihr verlässlicher und aktiver Begleiter durch die Therapie.' },
                  { icon: Calendar, title: 'Termine', desc: 'Sämtliche Termine rund um die Uhr digital im Blick.' },
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-light border border-border/50 hover:border-primary/20 hover:bg-white hover:shadow-sm transition-all"
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

      {/* Interactive Video & Feature Showcase (Die App in Aktion) */}
      <section id="applet-aktion-showcase" className="section-padding bg-light border-y border-border/40 relative overflow-hidden">
        {/* Ambient Blur Background Design */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none -mr-40" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none -ml-40" />

        <div className="container-custom relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-mint text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
              Die App in Aktion
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 tracking-tight">
              Erleben Sie alle Features im Einsatz
            </h2>
            <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
              Wählen Sie ein Feature aus der Liste, um zu sehen, wie einfach und effektiv die MOVIN App Sie durch Ihren Alltag begleitet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Features Navigation List & Details (Desktop Column / Mobile Stack) */}
            <div className="lg:col-span-7 flex flex-col gap-3 max-h-[720px] lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {appFeatures.map((feature) => {
                const isSelected = activeId === feature.id;
                const IconComponent = feature.icon;

                return (
                  <motion.div
                    key={feature.id}
                    onClick={() => setActiveId(feature.id)}
                    className={`cursor-pointer group flex flex-col p-6 rounded-2xl border transition-all ${
                      isSelected 
                        ? 'bg-white border-primary/40 shadow-md ring-1 ring-primary/10' 
                        : 'bg-white/60 border-border/60 hover:bg-white hover:border-primary/20 hover:shadow-sm'
                    }`}
                    whileHover={{ x: isSelected ? 0 : 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Active highlighted Icon container */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-primary text-white' 
                          : 'bg-mint text-primary group-hover:bg-primary group-hover:text-white'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-secondary">{feature.title}</h3>
                          <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">{feature.tag}</span>
                        </div>
                        <p className="text-xs text-dark/50 mt-0.5">{feature.subtitle}</p>
                      </div>
                      
                      <span className="lg:hidden shrink-0 text-slate-400">
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`} />
                      </span>
                    </div>

                    {/* Feature Description & Mobile Inline Video Mockup */}
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border/60">
                            <p className="text-sm md:text-base text-dark/85 leading-relaxed">
                              {feature.desc}
                            </p>

                            {/* Mobile-Only Video Player inside the accordion */}
                            <div className="mt-8 block lg:hidden w-full max-w-[320px] sm:max-w-[360px] mx-auto">
                              <AppVideoPlayer 
                                feature={feature} 
                                resolvedVideoUrl={getFeatureVideoSrc(feature, appFeatures.indexOf(feature), detectedVideos)}
                                detectedVideos={detectedVideos}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Sticky Video Player on the right (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5 sticky top-28 flex justify-center">
              <AppVideoPlayer 
                feature={activeFeature} 
                resolvedVideoUrl={getFeatureVideoSrc(activeFeature, appFeatures.indexOf(activeFeature), detectedVideos)}
                detectedVideos={detectedVideos}
              />
            </div>

          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">So einfach geht's</h2>
            <p className="text-lg text-dark/70">In nur drei Schritten starten Sie mit der App durch.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0" />
            
            {[
              { step: "01", title: "App herunterladen", desc: "Laden Sie die kostenfreie MOVIN App im App Store oder Google Play Store herunter." },
              { step: "02", title: "Rezepte hochladen", desc: "Fotografieren Sie Ihre ärztliche Verordnung einfach per App ab oder laden Sie das PDF direkt hoch." },
              { step: "03", title: "Termine erhalten", desc: "Unser Service-Team sendet Ihnen passende Optionen, die Sie direkt in der App bestätigen können, sowie die Informationen zur gesetzlichen Zuzahlung." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative z-10 bg-light p-8 rounded-2xl shadow-sm border border-primary/5 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-secondary mb-4">{item.title}</h4>
                <p className="text-dark/70 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Telemedizin - Coming soon */}
      <section className="section-padding bg-white border-t border-border/40">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary p-12 md:p-16 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-xl"
          >
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-medium mb-4">
                <Video className="w-4 h-4 text-primary animate-pulse" /> Coming Soon
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Telemedizin – Coming soon</h3>
              <p className="text-blue-tint/80 leading-relaxed text-base">
                Bald können Sie Ihre Therapieberatungen und Feedback-Gespräche auch bequem per verschlüsseltem Video-Call führen. Flexibel, ortsunabhängig und in gewohnter erstklassiger MOVIN Qualität.
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 self-center md:self-auto shadow-inner">
              <Video className="w-8 h-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="container-custom max-w-3xl relative z-10">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">Bereit für die Physiotherapie von morgen?</h2>
          <p className="text-blue-tint/80 text-lg mb-10 max-w-2xl mx-auto">
            Laden Sie die MOVIN App kostenlos im App Store oder bei Google Play herunter. Die Zugangsdaten erhalten Sie ganz bequem bei Ihrem ersten Termin in einer unserer Praxen.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
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

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-12 border-t border-white/10">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-lg">
                {isMounted && <QRCodeSVG value={iosUrl} size={120} level="H" includeMargin={true} />}
              </div>
              <p className="text-xs font-heading font-bold text-blue-tint/60 uppercase tracking-widest flex items-center gap-2">
                <QrCode className="w-4 h-4" /> iOS App Store
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-lg">
                {isMounted && <QRCodeSVG value={androidUrl} size={120} level="H" includeMargin={true} />}
              </div>
              <p className="text-xs font-heading font-bold text-blue-tint/60 uppercase tracking-widest flex items-center gap-2">
                <QrCode className="w-4 h-4" /> Google Play Store
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Elegant and Larger Responsive Vertical Video Player Component */
interface AppVideoPlayerProps {
  feature: AppFeature;
  resolvedVideoUrl: string;
  detectedVideos?: string[];
}

function AppVideoPlayer({ feature, resolvedVideoUrl, detectedVideos = [] }: AppVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  const isStaticImage = feature.id === 'telemedizin';

  // Derive custom playlist for specific multi-part features
  const playlist = React.useMemo(() => {
    if (feature.id === 'anamnese') {
      const preferOptimized = (matches: string[]) =>
        matches.find(v => v.toLowerCase().includes('optimized')) || matches[0];
      const anamnesisMatches = detectedVideos.filter(v => v.toLowerCase().includes('anamnesebogen'));
      const resultMatches = detectedVideos.filter(v => v.toLowerCase().includes('ergebnisb') || v.toLowerCase().includes('ergebnisbögen'));
      const match1 = preferOptimized(anamnesisMatches) || resolvedVideoUrl;
      const match2 = preferOptimized(resultMatches) || '/videos/app/Video Ergebnisbögen-optimized.mp4';
      return [match1, match2].filter(Boolean);
    }
    return resolvedVideoUrl ? [resolvedVideoUrl] : [];
  }, [feature.id, resolvedVideoUrl, detectedVideos]);

  // Reset playlist selection index whenever the playlist changes
  useEffect(() => {
    setCurrentPlaylistIndex(0);
    setVideoFailed(false);
  }, [playlist]);

  const currentVideoSrc = playlist[currentPlaylistIndex] || "";

  // React strictly to current source updates
  useEffect(() => {
    if (!isStaticImage && currentVideoSrc && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoSrc, isStaticImage]);

  const handleEnded = () => {
    if (playlist.length > 1) {
      setCurrentPlaylistIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  const handleVideoError = () => {
    console.log(`Video fail on ${currentVideoSrc}.`);
    setVideoFailed(true);
  };

  const shouldLoop = playlist.length <= 1;

  if (isStaticImage) {
    return (
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] select-none">
        <img
          src="/images/telemedizin_soon-1.png"
          alt="Telemedizin Coming Soon"
          className="w-full h-auto rounded-[2.5rem] bg-transparent z-0 block shadow-md border border-neutral-100"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (!currentVideoSrc || videoFailed) {
    return (
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[9/16] select-none overflow-hidden rounded-[2.5rem] bg-secondary shadow-sm">
        <img
          src={feature.poster}
          alt={feature.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/20" />
        <div className="absolute inset-x-6 bottom-8 text-center">
          <p className="text-white text-lg font-bold mb-2">{feature.title}</p>
          <p className="text-blue-tint/80 text-sm">Video folgt</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-[440px] select-none">
      <video
        ref={videoRef}
        src={encodeURI(currentVideoSrc)}
        autoPlay
        loop={shouldLoop}
        onEnded={handleEnded}
        muted
        playsInline
        preload="metadata"
        onError={handleVideoError}
        className="w-full h-auto bg-transparent z-0 block"
      />
      {playlist.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
          {playlist.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentPlaylistIndex ? 'w-5 bg-primary/90' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
