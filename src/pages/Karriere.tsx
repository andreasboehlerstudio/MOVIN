import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  Euro, 
  Cpu, 
  GraduationCap, 
  Heart, 
  Calendar, 
  Users, 
  Upload, 
  Trash2, 
  Paperclip, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Check, 
  Phone, 
  Mail, 
  User, 
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/seo/SEO';

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  salary: string;
  description: string;
  requirements: string[];
  tasks: string[];
}

export default function Karriere() {
  const [selectedJob, setSelectedJob] = useState<string>('physio-freiburg');
  const [formData, setFormData] = useState({
    anrede: 'Frau',
    name: '',
    email: '',
    phone: '',
    message: '',
    einstieg: '',
    agree: false
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const jobs: Job[] = [
    {
      id: 'physio-freiburg',
      title: 'Physiotherapeut (m/w/d)',
      type: 'Vollzeit / Teilzeit',
      location: 'Freiburg (Lorettoberg / Mooswald)',
      department: 'Physiotherapie',
      salary: 'Ab 3.800 € bis 4.600 € (je nach Qualifikation)',
      description: 'Verstärke unser Team an den Standorten Freiburg. Du behandelst ein breites Spektrum an orthopädischen und neurologischen Patienten in einer modernen, digitalgestützten Praxis.',
      requirements: [
        'Abgeschlossene Ausbildung oder Studium der Physiotherapie',
        'Zertifikat in Manueller Lymphdrainage (MLD) von Vorteil',
        'Interesse an fortschrittlicher Therapie und digitaler Befundung',
        'Teamgeist, Zuverlässigkeit und empathischer Umgang mit Menschen'
      ],
      tasks: [
        'Durchführung von physiotherapeutischen Befunden und Therapien',
        'Betreuung von Patienten an modernsten Trainingsgeräten',
        'Dokumentation und Behandlungsplanung über die MOVIN App/Software',
        'Interdisziplinärer Austausch im motivierten Therapeutenteam'
      ]
    },
    {
      id: 'sportphysio-rust',
      title: 'Sportphysiotherapeut (m/w/d)',
      type: 'Vollzeit',
      location: 'Europa-Park Rust & Freiburg',
      department: 'Sportphysiotherapie',
      salary: 'Kompetitives Gehalt + Europa-Park-Zusatzleistungen',
      description: 'In Rust betreuen wir exklusiv die Mitarbeiter und Darsteller des weltberühmten Europa-Parks sowie ambulante Privatpatienten. Ein abwechslungsreiches Sport- und Akutbehandlungsumfeld erwartet dich.',
      requirements: [
        'Abgeschlossene Ausbildung als Physiotherapeut/in',
        'Zusatzqualifikation / Zertifikat in Sportphysiotherapie',
        'Erfahrung in der Akutversorgung und Trainingslehre wünschenswert',
        'Kommunikationsstärke und Flexibilität'
      ],
      tasks: [
        'Akutbehandlung und Rehabilitation von Sportbegeisterten und Artisten',
        'Medizinische Trainingsbehandlung und Prävention',
        'Entwicklung zielgerichteter Return-to-Sport-Programme',
        'Präsenz bei spannenden Shows und artistischen Meisterleistungen'
      ]
    },
    {
      id: 'masseur-freiburg',
      title: 'Masseur & Med. Bademeister (m/w/d)',
      type: 'Teilzeit (15-25 Std./Woche)',
      location: 'Freiburg (Lorettoberg / Mooswald)',
      department: 'Massage & Physikalische Therapie',
      salary: 'Attraktiver Stundenlohn + betriebliche Zusatzleistungen',
      description: 'Bringe Wohlbefinden und gezielte myofasziale Entspannung zu unseren Patienten. Du arbeitest eng mit unseren Physiotherapeuten zusammen, um Behandlungen ideal zu flankieren.',
      requirements: [
        'Staatliche Anerkennung als Masseur/in und medizinische/r Bademeister/in',
        'Erfahrung in klassischer Massage, Bindegewebsmassage und Wellnessanwendungen',
        'Freundliches und zuvorkommendes Auftreten',
        'Eigenständige, strukturierte Arbeitsweise'
      ],
      tasks: [
        'Klassische Massagetherapie, Lymphdrainage und Entspannungsverfahren',
        'Durchführung von physikalischen Therapien (Wärme, Kälte etc.)',
        'Beratung von Patienten zu Wohlbefinden und Regeneration',
        'Koordination von Behandlungsterminen im Team'
      ]
    }
  ];

  // Dynamic compliant PDF generator for specific jobs
  const generateJobPDF = (job: Job) => {
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.275 841.89] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length 1300 >>
stream
BT
/F1 18 Tf
50 780 Td
(STELLENANGEBOT: ${job.title.toUpperCase()}) Tj
ET
BT
/F1 11 Tf
50 750 Td
(Standort: ${job.location}) Tj
ET
BT
/F1 11 Tf
50 735 Td
(Arbeitszeit: ${job.type} | Bereich: ${job.department}) Tj
ET
BT
/F1 11 Tf
50 720 Td
(Vergutung: ${job.salary}) Tj
ET
BT
/F1 12 Tf
50 680 Td
(I. UBER MOVIN) Tj
ET
BT
/F1 10 Tf
50 660 Td
(MOVIN steht fur modernste Physiotherapie, ganzheitliche Konzepte und wegweisende) Tj
ET
BT
/F1 10 Tf
50 648 Td
(digitale Losungen. Wir vereinen menschliche Empathie mit KI-gestutzten Systemen) Tj
ET
BT
/F1 10 Tf
50 636 Td
(und unserer eigenen MOVIN-App fur die beste Patientenversorgung.) Tj
ET
BT
/F1 12 Tf
50 595 Td
(II. DEINE AUFGABEN) Tj
ET
${job.tasks.map((task, idx) => `BT
/F1 9.5 Tf
50 ${575 - idx * 15} Td
(- ${task.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')}) Tj
ET`).join('\n')}
BT
/F1 12 Tf
50 500 Td
(III. DEINE QUALIFIKATIONEN) Tj
ET
${job.requirements.map((req, idx) => `BT
/F1 9.5 Tf
50 ${480 - idx * 15} Td
(- ${req.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')}) Tj
ET`).join('\n')}
BT
/F1 12 Tf
50 390 Td
(IV. UNSERE BEST-OF BENEFIT FLATRATE) Tj
ET
BT
/F1 9.5 Tf
50 370 Td
(- Uberdurchschnittliches Gehalt und zukunftssicherer Arbeitsplatz) Tj
ET
BT
/F1 9.5 Tf
50 355 Td
(- Unbegrenztes Fortbildungsbudget & freigestellte Lerntage) Tj
ET
BT
/F1 9.5 Tf
50 340 Td
(- Kostenfreier Urban Sports Club Zugang & JobRad Leasing-Modelle) Tj
ET
BT
/F1 9.5 Tf
50 325 Td
(- Flexible Work-Life-Balance und Mitgestaltung deines Dienstplans) Tj
ET
BT
/F1 11 Tf
50 280 Td
(So einfach bewirbst du dich:) Tj
ET
BT
/F1 10 Tf
50 260 Td
(Nutze unser eigens eingerichtetes Express-Bewerbungsportal direkt auf:) Tj
ET
BT
/F1 10 Tf
50 248 Td
(https://movin-freiburg.de/karriere/ oder sende deine PDF-Bewerbung an:) Tj
ET
BT
/F1 10 Tf
50 236 Td
(bewerbung@movin-freiburg.de) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000219 00000 n 
0000000293 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1780
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MOVIN_Stellenangebot_${job.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const scrollToFormAndSelect = (jobId: string) => {
    setSelectedJob(jobId);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Drag and Drop files
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      } else {
        alert("Bitte lade nur PDF-Dateien hoch.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      } else {
        alert("Bitte lade nur PDF-Dateien hoch.");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Simulated multi-step secure submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Bitte fülle alle Pflichtfelder (*) aus.");
      return;
    }
    if (!uploadedFile) {
      alert("Bitte lade deinen Lebenslauf (PDF) hoch.");
      return;
    }
    if (!formData.agree) {
      alert("Bitte bestätige die Datenschutzerklärung.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1);

    // Multi-step submitting animation sequence
    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          // Auto scroll to success
          if (formSectionRef.current) {
            formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      anrede: 'Frau',
      name: '',
      email: '',
      phone: '',
      message: '',
      einstieg: '',
      agree: false
    });
    setUploadedFile(null);
    setIsSuccess(false);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Physiotherapeut (m/w/d)",
    "description": "Wir suchen engagierte Physiotherapeuten für unsere Standorte in Freiburg und Rust. Werde Teil eines innovativen Teams!",
    "identifier": {
      "@type": "PropertyValue",
      "name": "MOVIN",
      "value": "physio-2026"
    },
    "datePosted": "2026-03-01",
    "validThrough": "2026-12-31",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "MOVIN Physiotherapie",
      "sameAs": "https://movin-freiburg.de",
      "logo": "https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_RGB_gradient.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mercystrasse 14",
        "addressLocality": "Freiburg",
        "postalCode": "79100",
        "addressCountry": "DE"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Physiotherapeut Jobs Freiburg | Karriere bei MOVIN"
        description="Werde Teil des MOVIN Teams in Freiburg oder Rust. Wir bieten Top-Gehalt, modernste Ausstattung (KI-Therapie) und ein tolles Arbeitsklima. Jetzt bewerben!"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="MOVIN Modern Rehabilitation Culture" 
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/35" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-12 text-center max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Briefcase className="w-3.5 h-3.5" /> DEINE REISE STARTET HIER
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-none text-gradient-teal-mint"
          >
            Zukunft gestalten.<br/>Menschen bewegen.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-blue-tint/90 font-medium max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Physiotherapie von morgen braucht Teamgeister von heute. Arbeite in einem hochmodernen, digitalen Umfeld mit Raum für deine Entfaltung.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a 
              href="#offene-stellen" 
              className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold shadow-xl shadow-primary/20 text-center"
            >
              Offene Stellen ansehen
            </a>
            <button 
              onClick={() => scrollToFormAndSelect('physio-freiburg')}
              className="btn-outline border-white/30 text-white hover:bg-white/10 w-full sm:w-auto px-8 py-4 text-base font-bold text-center"
            >
              Direkt bewerben
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="bg-white py-16 md:py-24 border-b border-border/50">
        <div className="container-custom max-w-5xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">UNSER IMAGEFILM</span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight mb-4">Lerne uns im Video kennen</h2>
            <div className="h-1 bg-primary w-16 mx-auto rounded-full mb-6" />
            <p className="text-dark/70 text-sm md:text-base leading-relaxed">
              Arbeiten bei MOVIN bedeutet: Modernste Ansätze, erstklassige Förderung und ein Team, das zusammenhält. Klicke auf Play und erhalte einen echten Einblick in unsere Philosophie!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-black aspect-video mb-6"
          >
            <iframe
              src="https://www.youtube.com/embed/UYP4_OR9A9M?autoplay=0&rel=0"
              title="MOVIN Karriere & Philosophie"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="flex flex-col items-center justify-center text-center mt-6 p-4 rounded-2xl bg-light border border-border/60 max-w-xl mx-auto">
            <span className="text-xs text-dark/50 font-semibold mb-2">
              ⚠️ Hinweis: YouTube blockiert Abfragen aus geschlossenen Testumgebungen mit dem Fehler 153/150 (Domain-Sicherheitsregel der Originalseite).
            </span>
            <a
              href="https://www.youtube.com/watch?v=UYP4_OR9A9M"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center gap-2 border-border text-secondary hover:bg-neutral-100 text-xs font-bold tracking-wider py-2 px-4 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" /> Auf YouTube ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Video & Vibe Gallery */}
      <section className="section-padding bg-light relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight mb-4">Erlebe den MOVIN-Vibe</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-dark/70 leading-relaxed">
              Bei uns herrscht kein anonymer Praxisalltag, sondern ein echtes, herzliches Miteinander auf Augenhöhe. Schau dir unsere Live-Insights direkt von Instagram an und lerne uns kennen!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto">
            {/* Reel 1 Container */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-base overflow-hidden p-4 md:p-6 flex flex-col justify-between border border-border/60 shadow-xl bg-white"
            >
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-primary font-bold bg-mint px-2.5 py-1 rounded-full">#teamlife</span>
                <h3 className="text-xl font-bold text-secondary mt-3">Persönliches Miteinander & Spaß</h3>
                <p className="text-dark/60 text-sm mt-1">Hier ist ein kleiner Einblick in das, was uns verbindet.</p>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-neutral-100 h-[480px] bg-neutral-900 flex items-center justify-center">
                <iframe 
                  src="https://www.instagram.com/reel/DUNI1TzCG0z/embed" 
                  className="w-full h-full border-0 absolute inset-0" 
                  scrolling="no" 
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Reel 2 Container */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-base overflow-hidden p-4 md:p-6 flex flex-col justify-between border border-border/60 shadow-xl bg-white"
            >
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-primary font-bold bg-mint px-2.5 py-1 rounded-full">#bewegwas</span>
                <h3 className="text-xl font-bold text-secondary mt-3">Die MOVIN App & Digitaler Spirit</h3>
                <p className="text-dark/60 text-sm mt-1">Wie wir Gesundheit im 21. Jahrhundert ganzheitlich neu erfinden.</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md border border-neutral-100 h-[480px] bg-neutral-900 flex items-center justify-center">
                <iframe 
                  src="https://www.instagram.com/reel/DUKiuNWCNG6/embed" 
                  className="w-full h-full border-0 absolute inset-0" 
                  scrolling="no" 
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best-of Vorteile & Benefits */}
      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-950/20 via-transparent to-transparent z-0" />
        
        <div className="container-custom relative z-10-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">BEST-OF MOVIN FLATRATE</span>
            <h2 className="text-3xl md:text-5xl font-black text-gradient-teal-mint mb-6">Deine unschlagbaren Vorteile bei uns</h2>
            <p className="text-lg text-blue-tint/80 max-w-2xl mx-auto">
              Wir versprechen nicht nur - wir liefern das beste Gesamtpaket, damit du dich entfalten, gesund bleiben und sorgenfrei arbeiten kannst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                num: '01',
                icon: <Euro className="w-8 h-8 text-primary" />,
                title: 'Top-Vergütung & Boni', 
                desc: 'Hervorragendes Grundgehalt (bis zu 4.600 €) mit lohnenden Qualifikations-Zulagen, betrieblicher Altersvorsorge und bezahlter Überstunden-Regelung.' 
              },
              { 
                num: '02',
                icon: <Cpu className="w-8 h-8 text-primary" />,
                title: 'Zukunftsweisende KI & Digitalisierung', 
                desc: 'Arbeite mit der intuitiven MOVIN App, digitaler Befundung und modernsten KI-gestützten Trainingssystemen zur maximalen Entlastung deiner Administrationszeit.' 
              },
              { 
                num: '03',
                icon: <GraduationCap className="w-8 h-8 text-primary" />,
                title: 'Fortbildungs-Budgetflatrate', 
                desc: 'Erhalte ein unbegrenztes Fortbildungsbudget für anerkannte zusätzliche Berufsbezeichnungen sowie voll bezahlte, freigestellte Lerntage pro Jahr.' 
              },
              { 
                num: '04',
                icon: <Heart className="w-8 h-8 text-primary" />,
                title: 'Fitness & Vitality Benefits', 
                desc: 'Kostenlose Premium Urban Sports Club Partnerschaft, attraktives JobRad-Fahrradleasing und Behandlungen im eigenen Team als Priorität.' 
              },
              { 
                num: '05',
                icon: <Calendar className="w-8 h-8 text-primary" />,
                title: 'Flexibel gestaltetes Leben', 
                desc: 'Wähle deinen Dienstplan mit echten flexiblen Arbeitszeiten (Vollzeit, Teilzeit, 4-Tage-Woche möglich) und profitiere von einer fairen Urlaubsplanung.' 
              },
              { 
                num: '06',
                icon: <Users className="w-8 h-8 text-primary" />,
                title: 'Einzigartige Teampower', 
                desc: 'Legendäre Team-Events im Schwarzwald, regelmäßige Intervision auf Augenhöhe und ein kollegiales Umfeld ohne steife Hierarchien.' 
              },
            ].map((benefit, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-neutral-900/45 border border-white/10 p-8 rounded-2xl flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                      {benefit.icon}
                    </div>
                    <span className="font-mono text-3xl font-black text-white/5 tracking-wider group-hover:text-primary/15 transition-colors">{benefit.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-blue-tint/70 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Jobs List (Offene Stellen) */}
      <section id="offene-stellen" className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">AKTUELLE VAKANZEN</span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight mb-4">Wähle deinen Karriereweg</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-dark/70 leading-relaxed">
              Finde die perfekte Stelle, die zu deinen Kompetenzen und Lebensvorstellungen passt. Lade dir detaillierte Stellenangebote direkt als PDF herunter oder bewirb dich online.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            {jobs.map((job, i) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-base p-6 md:p-8 flex flex-col gap-6 hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
              >
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/60 pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-primary bg-mint px-2.5 py-1 rounded-full">{job.department}</span>
                      <span className="text-xs font-bold text-dark/60 bg-light px-2.5 py-1 rounded-full">{job.type}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-secondary mb-3 mt-1">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-dark/60 font-medium">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4.5 h-4.5 text-primary" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Euro className="w-4.5 h-4.5 text-primary" /> {job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    <button 
                      onClick={() => generateJobPDF(job)}
                      className="btn-outline flex items-center justify-center gap-2 border-border text-secondary hover:bg-light w-full py-2.5 px-4 text-xs font-bold tracking-wider"
                    >
                      <Download className="w-4 h-4" /> PDF herunterladen
                    </button>
                    <button 
                      onClick={() => scrollToFormAndSelect(job.id)}
                      className="btn-primary w-full py-2.5 px-5 text-xs font-bold tracking-wider text-center"
                    >
                      Jetzt bewerben
                    </button>
                  </div>
                </div>

                {/* Sub-Details inside */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold text-secondary text-base mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-primary rounded-full block" /> Was dich auszeichnet
                    </h4>
                    <ul className="space-y-2.5">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-dark/80 font-medium">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-secondary text-base mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-primary rounded-full block" /> Deine Hauptaufgaben
                    </h4>
                    <ul className="space-y-2.5">
                      {job.tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-dark/80 font-medium">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto bg-light p-8 rounded-3xl border border-border/80 shadow-md">
            <h3 className="text-xl font-bold text-secondary mb-3">Keine passende Rolle gefunden?</h3>
            <p className="text-dark/70 text-sm mb-6 max-w-xl mx-auto">
              Du hast eigene Ideen, brings außergewöhnliche Stärken ein oder suchst ein duales Studium im Bereich Physiotherapie? Sende uns gerne deine Initiativbewerbung!
            </p>
            <button 
              onClick={() => scrollToFormAndSelect('initiativ')}
              className="flex items-center justify-center gap-2 text-primary font-bold hover:underline mx-auto transition-all"
            >
              Initiativbewerbung absenden <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Specialised PDF Application Form Section */}
      <section ref={formSectionRef} className="section-padding bg-light border-y border-border">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">SECURE EXPRESS PORTAL</span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight mb-4">Hier direkt bewerben</h2>
            <p className="text-dark/70 text-sm max-w-xl mx-auto">
              Deine Schnellbewerbung nimmt weniger als 2 Minuten in Anspruch. Lebenslauf hochladen (PDF), Pflichtfelder ausfüllen und abschicken.
            </p>
          </div>

          <div className="card-base p-6 md:p-10 shadow-2xl bg-white border border-border">
            
            {/* 1. Success Message Panel */}
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-lg shadow-primary/10">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-secondary mb-4">Bewerbung eingegangen!</h3>
                <p className="text-dark/70 max-w-lg mx-auto mb-8 font-medium">
                  Vielen Dank für dein Vertrauen in MOVIN! Deine Unterlagen wurden erfolgreich hochgeladen und an unser Karriere-Auswahlkomitee übermittelt.
                </p>

                {/* Simulated PDF / Job Confirmation receipt details */}
                <div className="bg-light p-6 rounded-2xl text-left border border-border max-w-lg mx-auto mb-8 text-sm">
                  <div className="font-bold text-secondary text-base border-b pb-2 mb-4">Zusammenfassung Empfangsbestätigung</div>
                  <div className="space-y-2 text-dark/80">
                    <p><strong>Bewerber:</strong> {formData.name}</p>
                    <p><strong>E-Mail:</strong> {formData.email}</p>
                    <p><strong>Angestrebte Stelle:</strong> {jobs.find(j => j.id === selectedJob)?.title || 'Initiativbewerbung'}</p>
                    <p><strong>Übertragene Datei:</strong> {uploadedFile?.name} ({Math.round((uploadedFile?.size || 0) / 1024)} KB)</p>
                    <p><strong>Verschlüsselungs-ID:</strong> MOV-{Math.floor(100000 + Math.random() * 900000)}</p>
                    <p><strong>Empfänger:</strong> bewerbung@movin-freiburg.de</p>
                  </div>
                </div>

                <p className="text-xs text-dark/50 mb-6">
                  Wir prüfen deine Unterlagen schnellstmöglich und rufen dich in der Regel innerhalb von 48 Stunden zurück.
                </p>

                <button 
                  onClick={resetForm}
                  className="btn-outline border-border text-secondary hover:bg-light font-bold"
                >
                  Weitere Bewerbung senden
                </button>
              </motion.div>
            ) : isSubmitting ? (
              
              /* 2. Step-by-Step Submitting Loading screen */
              <div className="py-16 text-center">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                </div>
                
                <AnimatePresence mode="wait">
                  {submitStep === 1 && (
                    <motion.div 
                      key="step-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2"
                    >
                      <h4 className="text-xl font-bold text-secondary">Datei wird verschlüsselt...</h4>
                      <p className="text-dark/50 text-sm">Prüfe PDF-Struktur und formatiere Upload für de.movin.career</p>
                    </motion.div>
                  )}
                  {submitStep === 2 && (
                    <motion.div 
                      key="step-2"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2"
                    >
                      <h4 className="text-xl font-bold text-secondary">Bewerberprofil wird generiert...</h4>
                      <p className="text-dark/50 text-sm">Abgleich für bewerbung@movin-freiburg.de</p>
                    </motion.div>
                  )}
                  {submitStep === 3 && (
                    <motion.div 
                      key="step-3"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2"
                    >
                      <h4 className="text-xl font-bold text-primary flex items-center justify-center gap-1.5 animate-pulse">
                        <Sparkles className="w-5 h-5" /> Datei sicher übertragen!
                      </h4>
                      <p className="text-dark/50 text-sm">Schließe Übertragung an das Auswahlkomitee ab...</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-48 bg-border h-1.5 rounded-full mx-auto mt-6 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: submitStep === 1 ? '33%' : submitStep === 2 ? '66%' : '100%' }}
                  />
                </div>
              </div>
            ) : (
              
              /* 3. The Interactive Application Form Details */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Form Of Address & Job Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="selectedJob" className="text-sm font-bold text-secondary">Gewünschte Stelle *</label>
                    <select 
                      id="selectedJob"
                      name="selectedJob"
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-light text-sm font-semibold text-secondary"
                    >
                      {jobs.map(j => (
                        <option key={j.id} value={j.id}>{j.title} ({j.type})</option>
                      ))}
                      <option value="initiativ">Initiativbewerbung (m/w/d)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="anrede" className="text-sm font-bold text-secondary">Anrede *</label>
                    <div className="grid grid-cols-3 gap-2 h-11">
                      {['Frau', 'Herr', 'Divers'].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, anrede: val }))}
                          className={`rounded-xl border font-bold text-xs uppercase tracking-wider transition-colors ${
                            formData.anrede === val 
                              ? 'bg-primary border-primary text-secondary' 
                              : 'bg-light border-border text-dark/70 hover:bg-neutral-100'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name & Mail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-bold text-secondary">Vollständiger Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-light text-sm font-semibold"
                        placeholder="z.B. Mara Schöneck"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold text-secondary">E-Mail-Adresse *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-light text-sm font-semibold"
                        placeholder="name@beispiel.de"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & Entry Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-bold text-secondary">Telefonnummer (für schnellen Rückruf) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-light text-sm font-semibold"
                        placeholder="z.B. +49 176 12345678"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="einstieg" className="text-sm font-bold text-secondary">Frühestmögliches Einstiegsdatum</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        id="einstieg" 
                        name="einstieg" 
                        value={formData.einstieg}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-light text-sm font-semibold"
                        placeholder="z.B. ab sofort / in 3 Monaten"
                      />
                    </div>
                  </div>
                </div>

                {/* Message / Motivation */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-secondary">Deine Nachricht oder Begleittext (optional)</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-light text-sm font-semibold"
                    placeholder="Erzähle uns kurz von dir oder füge Notizen hinzu..."
                  />
                </div>

                {/* Dragg & Drop File Upload Area */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-secondary">Lebenslauf / Qualifikationsnachweis (PDF) *</span>
                  
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                      isDragActive 
                        ? 'border-primary bg-mint/40 scale-[1.01]' 
                        : 'border-border hover:border-primary/50 hover:bg-light'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="pdf-upload"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden" 
                      accept=".pdf"
                    />

                    {uploadedFile ? (
                      <div className="w-full flex items-center justify-between bg-white border border-border/80 rounded-xl p-3 shadow-sm" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center text-rose-500">
                            <Paperclip className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-secondary max-w-[200px] sm:max-w-xs truncate">{uploadedFile.name}</p>
                            <p className="text-xs text-dark/50 font-semibold">{(uploadedFile.size / 1024).toFixed(1)} KB | PDF Dokument</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={removeFile}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-primary shadow-sm">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-secondary">Klicke zum Auswählen oder ziehe die PDF hierher</p>
                          <p className="text-xs text-dark/40 font-semibold mt-1">Nur PDF-Dateien bis maximal 12 MB erlaubt</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Datasafety Checkbox */}
                <div className="flex items-start gap-3 mt-2">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    name="agree" 
                    required 
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-border cursor-pointer mt-0.5"
                  />
                  <label htmlFor="agree" className="text-xs text-dark/70 font-medium leading-relaxed cursor-pointer select-none">
                    Ich stimme zu, dass meine hochgeladenen Bewerbungsunterlagen und eingegebenen Daten gesichert verarbeitet und zwecks Personalentscheidungen durch die Praxen der MOVIN-Gruppe gespeichert werden dürfen. Diese Einwilligung kann ich jederzeit bezüglich <Link to="/datenschutz/" className="text-primary hover:underline">Datenschutz</Link> widerrufen. *
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-xl mt-4"
                >
                  <Briefcase className="w-5 h-5" /> Bewerbungsunterlagen sicher abschicken
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
