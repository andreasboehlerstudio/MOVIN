import React, { useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Activity, 
  ClipboardList, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Download,
  AlertCircle,
  LoaderCircle
} from 'lucide-react';
import SEO from '../components/seo/SEO';

const SUBMIT_TIMEOUT_MS = 60_000;

type FormData = {
  // Personal Info
  name: string;
  vorname: string;
  geburtsdatum: string;
  email: string;

  // I) Körperfunktionen
  schmerzenWo: string;
  hatSchmerzen: string;
  intensitaet: number;
  staendigSchmerzen: string;
  beschwerdenTrend: string;
  seitWann: string;
  glaubenHeilung: string;
  unfall: string;
  unfallWann: string;
  beweglichkeitVerschlechtert: string;
  beweglichkeitWo: string;
  gefuehlsstoerungen: string;
  gefuehlsstoerungenWo: string;
  
  // Symptoms
  symptome: {
    gleichgewicht: boolean;
    blase: boolean;
    schwindel: boolean;
    uebelkeit: boolean;
    ohnmacht: boolean;
    benommenheit: boolean;
    schlucken: boolean;
    doppelbilder: boolean;
  };

  kraftVerloren: string;
  kraftWo: string;
  gestuerzt: string;

  // II) Aktivitäten
  alltagEingeschraenkt: string;
  nachtruheGestoert: string;
  gehstreckeEingeschraenkt: string;
  treppensteigenNormal: string;

  // III) Teilhabe
  hilfeWohnung: string;
  versorgenSelbst: string;
  versorgenFamilie: string;
  einschraenkungBeruf: string;
  wasWiederKoennen: string;
  lebenssituationZufriedenheit: number;

  // IV) Umweltfaktoren
  stressFirma: string;
  stressFamilie: string;

  // V) Personenbezogen
  familienstand: string;
  kinder: string;
  kinderImHaus: string;
  beruf: string;
  hobbys: string;
  diagnosen: {
    asthma: boolean;
    diabetes: boolean;
    osteoporose: boolean;
  };
  medikamente: string;
  gewichtVerloren: string;
  krebs: string;
  krebsWelche: string;
  nachtschweiss: string;
  fruehereUnfaelle: string;
  fruehereOperationen: string;
  andereBeschwerden: string;
  painPoints: string[];
};

const BODY_PARTS = [
  // Front
  { id: 'head-f', label: 'Kopf (Vorderseite)', cx: 50, cy: 15, r: 8, view: 'front' },
  { id: 'neck-f', label: 'Hals (Vorderseite)', cx: 50, cy: 28, r: 5, view: 'front' },
  { id: 'chest', label: 'Brust (Vorderseite)', cx: 50, cy: 45, r: 10, view: 'front' },
  { id: 'shoulder-l-f', label: 'Linke Schulter (Vorderseite)', cx: 32, cy: 40, r: 6, view: 'front' },
  { id: 'shoulder-r-f', label: 'Rechte Schulter (Vorderseite)', cx: 68, cy: 40, r: 6, view: 'front' },
  { id: 'arm-l-f', label: 'Linker Arm (Vorderseite)', cx: 25, cy: 65, r: 5, view: 'front' },
  { id: 'arm-r-f', label: 'Rechter Arm (Vorderseite)', cx: 75, cy: 65, r: 5, view: 'front' },
  { id: 'abdomen', label: 'Bauch (Vorderseite)', cx: 50, cy: 65, r: 10, view: 'front' },
  { id: 'hip-l-f', label: 'Linke Hüfte (Vorderseite)', cx: 40, cy: 85, r: 7, view: 'front' },
  { id: 'hip-r-f', label: 'Rechte Hüfte (Vorderseite)', cx: 60, cy: 85, r: 7, view: 'front' },
  { id: 'knee-l-f', label: 'Linkes Knie (Vorderseite)', cx: 40, cy: 130, r: 6, view: 'front' },
  { id: 'knee-r-f', label: 'Rechtes Knie (Vorderseite)', cx: 60, cy: 130, r: 6, view: 'front' },
  { id: 'foot-l-f', label: 'Linker Fuß (Vorderseite)', cx: 40, cy: 180, r: 6, view: 'front' },
  { id: 'foot-r-f', label: 'Rechter Fuß (Vorderseite)', cx: 60, cy: 180, r: 6, view: 'front' },
  
  // Back
  { id: 'head-b', label: 'Hinterkopf (Rückseite)', cx: 50, cy: 15, r: 8, view: 'back' },
  { id: 'neck-b', label: 'Nacken (Rückseite)', cx: 50, cy: 28, r: 5, view: 'back' },
  { id: 'upper-back', label: 'Oberer Rücken', cx: 50, cy: 45, r: 10, view: 'back' },
  { id: 'lower-back', label: 'Lendenwirbelsäule / unterer Rücken', cx: 50, cy: 75, r: 10, view: 'back' },
  { id: 'shoulder-l-b', label: 'Linke Schulter (Rückseite)', cx: 32, cy: 40, r: 6, view: 'back' },
  { id: 'shoulder-r-b', label: 'Rechte Schulter (Rückseite)', cx: 68, cy: 40, r: 6, view: 'back' },
  { id: 'buttocks', label: 'Gesäß (Rückseite)', cx: 50, cy: 95, r: 12, view: 'back' },
  { id: 'thigh-l-b', label: 'Linker Oberschenkel (Rückseite)', cx: 40, cy: 115, r: 8, view: 'back' },
  { id: 'thigh-r-b', label: 'Rechter Oberschenkel (Rückseite)', cx: 60, cy: 115, r: 8, view: 'back' },
  { id: 'calf-l-b', label: 'Linke Wade (Rückseite)', cx: 40, cy: 155, r: 7, view: 'back' },
  { id: 'calf-r-b', label: 'Rechte Wade (Rückseite)', cx: 60, cy: 155, r: 7, view: 'back' },
];

const initialData: FormData = {
  name: '', vorname: '', geburtsdatum: '', email: '',
  schmerzenWo: '', hatSchmerzen: '', intensitaet: 5, staendigSchmerzen: '', beschwerdenTrend: '', seitWann: '', glaubenHeilung: '', unfall: '', unfallWann: '', beweglichkeitVerschlechtert: '', beweglichkeitWo: '', gefuehlsstoerungen: '', gefuehlsstoerungenWo: '',
  symptome: { gleichgewicht: false, blase: false, schwindel: false, uebelkeit: false, ohnmacht: false, benommenheit: false, schlucken: false, doppelbilder: false },
  kraftVerloren: '', kraftWo: '', gestuerzt: '',
  alltagEingeschraenkt: '', nachtruheGestoert: '', gehstreckeEingeschraenkt: '', treppensteigenNormal: '',
  hilfeWohnung: '', versorgenSelbst: '', versorgenFamilie: '', einschraenkungBeruf: '', wasWiederKoennen: '', lebenssituationZufriedenheit: 5,
  stressFirma: '', stressFamilie: '',
  familienstand: '', kinder: '', kinderImHaus: '', beruf: '', hobbys: '',
  diagnosen: { asthma: false, diabetes: false, osteoporose: false },
  medikamente: '', gewichtVerloren: '', krebs: '', krebsWelche: '', nachtschweiss: '', fruehereUnfaelle: '', fruehereOperationen: '', andereBeschwerden: '',
  painPoints: []
};

const BodyMap = ({ selectedPoints, onToggle, sizeClassName = "w-32 h-64 md:w-40 md:h-80", className }: { selectedPoints: string[], onToggle: (id: string) => void, sizeClassName?: string, className?: string }) => {
  const renderView = (view: 'front' | 'back') => (
    <div className="relative group">
      <p className="text-[10px] font-bold text-[#10182866] uppercase text-center mb-2">{view === 'front' ? 'Vorderansicht' : 'Rückansicht'}</p>
      <svg viewBox="0 0 100 200" className={sizeClassName}>
        {/* Detailed Body Shape */}
        <path 
          d="M50,2 C53,2 56,3 58,5 C61,8 62,12 62,16 C62,21 60,25 57,28 C59,30 61,32 63,35 C68,38 78,40 82,45 C86,50 88,60 88,75 C88,85 86,95 84,105 C83,110 80,115 75,115 C72,115 70,113 68,110 L72,185 C73,192 70,198 63,198 C58,198 54,195 52,190 L50,140 L48,190 C46,195 42,198 37,198 C30,198 27,192 28,185 L32,110 C30,113 28,115 25,115 C20,115 17,110 16,105 C14,95 12,85 12,75 C12,60 14,50 18,45 C22,40 32,38 37,35 C39,32 41,30 43,28 C40,25 38,21 38,16 C38,12 39,8 42,5 C44,3 47,2 50,2 Z" 
          fill="#f3f4f6" 
          stroke="#e5e7eb" 
          strokeWidth="1"
        />
        
        {/* Interactive Points */}
        {BODY_PARTS.filter(p => p.view === view).map(part => (
          <circle
            key={part.id}
            cx={part.cx}
            cy={part.cy}
            r={part.r}
            className={`cursor-pointer transition-all duration-200 ${
              selectedPoints.includes(part.id) 
                ? 'fill-[#00c2cb] stroke-[#00c2cb] stroke-2' 
                : 'fill-[#f3f4f6] hover:fill-[#e5e7eb] stroke-[#e5e7eb]'
            }`}
            onClick={() => onToggle(part.id)}
          >
            <title>{part.label}</title>
          </circle>
        ))}
      </svg>
    </div>
  );

  return (
    <div className={className || "flex gap-8 justify-center items-center bg-[#ffffff] p-6 rounded-3xl border border-[#eaecf0] shadow-sm"}>
      {renderView('front')}
      <div className="w-px h-40 bg-[#eaecf0] hidden md:block" />
      {renderView('back')}
    </div>
  );
};

const PdfSectionTitle = ({ number, children }: { number: string; children: React.ReactNode }) => (
  <div className="mb-3 flex items-center gap-2 border-b border-[#c9eef0] pb-2">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0a0f4d] font-heading text-[11px] font-bold text-white">{number}</span>
    <h2 className="font-heading text-[15px] font-bold text-[#0a0f4d]">{children}</h2>
  </div>
);

const PdfAnswerRow = ({ number, label, value, compact = false }: { number?: string; label: string; value?: React.ReactNode; compact?: boolean }) => (
  <div className={`grid grid-cols-[auto_minmax(0,1fr)] items-start gap-2 border-b border-[#d9e2e8] ${compact ? 'py-1' : 'py-1.5'}`}>
    {number ? <span className="min-w-5 font-heading text-[10px] font-bold text-[#12aeb5]">{number}</span> : <span className="w-1" />}
    <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3">
      <span className="text-[9.5px] leading-[1.35] text-[#536170]">{label}</span>
      <span className="min-w-0 break-words font-semibold leading-[1.35] text-[#0a0f4d]">{value || 'Keine Angabe'}</span>
    </div>
  </div>
);

const PdfFooter = ({ page, name }: { page: number; name: string }) => (
  <div className="mt-auto flex items-end justify-between border-t border-[#c9eef0] pt-3 text-[8px] text-[#6c7a86]">
    <div>
      <p className="font-bold text-[#0a0f4d]">MOVIN Physiotherapie | Digitaler Anamnesebogen</p>
      <p>Patient*in: {name || 'Keine Angabe'} | Erstellt am {new Date().toLocaleDateString('de-DE')}</p>
    </div>
    <p className="font-heading text-[15px] font-bold text-[#12aeb5]">{page}/2</p>
  </div>
);

export default function Anamnesebogen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [patientCopySent, setPatientCopySent] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [sendPatientCopy, setSendPatientCopy] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const totalSteps = 6;
  const selectedPainLabels = formData.painPoints
    .map(id => BODY_PARTS.find(part => part.id === id)?.label)
    .filter((label): label is string => Boolean(label));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const [parent, child] = name.split('.');
      if (child) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof FormData] as any),
            [child]: checkbox.checked
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const togglePainPoint = (id: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(id)
        ? prev.painPoints.filter(p => p !== id)
        : [...prev.painPoints, id]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const generatePDF = async () => {
    const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
      document.fonts.ready,
    ]);

    console.log("Starting PDF generation...");
    if (!pdfRef.current) {
      throw new Error('PDF template is not available');
    }
    
    try {
      // Ensure the template is "visible" to html2canvas but not to the user
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pages = pdfRef.current.querySelectorAll('.pdf-page');
      
      console.log(`Found ${pages.length} pages to render`);
      if (pages.length === 0) {
        throw new Error('No PDF pages found');
      }
      
      for (let i = 0; i < pages.length; i++) {
        console.log(`Rendering page ${i + 1}...`);
        const page = pages[i] as HTMLElement;
        
        const canvas = await html2canvas(page, {
          scale: 1.25,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            // Ensure the cloned document has the necessary styles
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              .pdf-page {
                visibility: visible !important;
                position: static !important;
                display: flex !important;
                height: auto !important;
                min-height: 297mm !important;
                overflow: visible !important;
              }
              :where(.pdf-page) p {
                font-size: inherit;
                line-height: inherit;
              }
              :where(.pdf-page) * {
                text-transform: none !important;
                letter-spacing: normal !important;
              }
              * { 
                color-scheme: light !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });
        
        console.log(`Page ${i + 1} rendered to canvas`);
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        if (imgData === 'data:,') {
          console.error(`Page ${i + 1} canvas is empty`);
          throw new Error(`Empty canvas for page ${i + 1}`);
        }

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        const fitRatio = Math.min(pdfWidth / canvas.width, pdfPageHeight / canvas.height);
        const pdfImageWidth = canvas.width * fitRatio;
        const pdfImageHeight = canvas.height * fitRatio;
        const pdfImageX = (pdfWidth - pdfImageWidth) / 2;
        const pdfImageY = (pdfPageHeight - pdfImageHeight) / 2;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', pdfImageX, pdfImageY, pdfImageWidth, pdfImageHeight, undefined, 'FAST');

        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      }
      
      console.log("PDF generation complete");
      return pdf;
    } catch (err) {
      console.error("Error in generatePDF:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      setError("Bitte bestätigen Sie den Datenschutzhinweis, bevor Sie den Anamnesebogen absenden.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setPatientCopySent(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    let pdfCreated = false;

    try {
      const pdf = await generatePDF();
      if (!pdf) throw new Error("PDF generation failed");
      pdfCreated = true;
      
      const pdfBase64 = pdf.output('datauristring');

      const response = await fetch('/api/send-anamnese.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          pdfBase64,
          name: `${formData.vorname} ${formData.name}`,
          email: formData.email,
          privacyAccepted,
          sendPatientCopy,
          _website: ''
        })
      });

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('Das erzeugte PDF ist für den E-Mail-Versand zu groß. Bitte laden Sie es herunter und senden Sie es direkt an anamnesebogen@movin-freiburg.de.');
        }
        if (response.status === 429) {
          throw new Error('Es wurden zu viele Übertragungen gestartet. Bitte warten Sie etwa 15 Minuten und versuchen Sie es erneut.');
        }
        if (response.status === 502 || response.status === 503) {
          throw new Error('Der Mailversand ist momentan nicht verfügbar. Bitte laden Sie das PDF herunter und senden Sie es direkt an anamnesebogen@movin-freiburg.de.');
        }
        throw new Error('Der Anamnesebogen konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.');
      }

      const result = await response.json().catch(() => null) as { copySent?: boolean } | null;
      setPatientCopySent(result?.copySent === true);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Die Übertragung hat länger als 60 Sekunden gedauert und wurde beendet. Bitte laden Sie das PDF herunter und senden Sie es direkt an anamnesebogen@movin-freiburg.de.');
      } else if (!pdfCreated) {
        setError('Das PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.');
      } else {
        setError(err instanceof Error
          ? err.message
          : 'Der Anamnesebogen konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut.');
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const downloadManualPDF = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setError(null);

    try {
      const pdf = await generatePDF();
      if (!pdf) throw new Error('PDF generation failed');
      pdf.save(`Anamnesebogen_${formData.name || 'MOVIN'}.pdf`);
    } catch (err) {
      console.error(err);
      setError('Das PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-light pt-24 pb-12">
      <SEO 
        title="Digitaler Anamnesebogen | MOVIN Physiotherapie"
        description="Füllen Sie Ihren Anamnesebogen bequem online aus und senden Sie ihn direkt an uns."
      />

      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-secondary p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00c2cb33] flex items-center justify-center text-primary">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Digitaler Anamnesebogen</h1>
                <p className="text-[#f0f9ffcc] text-xs mt-0.5">Jederzeit bequem von zu Hause ausfüllen</p>
                <p className="text-[#f0f9ff99] text-sm mt-1">Schritt {step} von {totalSteps}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-[#ffffff1a] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> Persönliche Daten
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Name</label>
                        <input 
                          type="text" name="name" value={formData.name} onChange={handleInputChange} required
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-[#00c2cb33] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Vorname</label>
                        <input 
                          type="text" name="vorname" value={formData.vorname} onChange={handleInputChange} required
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-[#00c2cb33] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Geburtsdatum</label>
                        <input 
                          type="date" name="geburtsdatum" value={formData.geburtsdatum} onChange={handleInputChange} required
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-[#00c2cb33] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">E-Mail Adresse</label>
                        <input 
                          type="email" name="email" value={formData.email} onChange={handleInputChange} required
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-[#00c2cb33] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" /> Körperfunktionen & Strukturen
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-[#101828B3]">Wo haben Sie Probleme bzw. Schmerzen?</label>
                            <p className="text-xs text-[#10182880] mb-2">Bitte beschreiben Sie die Stelle(n) so genau wie möglich oder markieren Sie diese rechts auf der Körperkarte.</p>
                            <textarea 
                              name="schmerzenWo" value={formData.schmerzenWo} onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-[#00c2cb33] outline-none transition-all h-32"
                              placeholder="z.B. unterer Rücken, linke Schulter..."
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-[#101828B3]">Haben Sie Schmerzen?</label>
                              <select name="hatSchmerzen" value={formData.hatSchmerzen} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                                <option value="">Bitte wählen...</option>
                                <option value="ja">Ja</option>
                                <option value="nein">Nein</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-[#101828B3]">Intensität (0-10)</label>
                              <input 
                                type="range" name="intensitaet" min="0" max="10" value={formData.intensitaet} onChange={handleInputChange}
                                className="w-full accent-primary"
                              />
                              <div className="flex justify-between text-xs text-[#10182880]">
                                <span>0 (kein Schmerz)</span>
                                <span className="font-bold text-primary">{formData.intensitaet}</span>
                                <span>10 (extrem)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-[#101828B3]">Körperkarte (Anklicken zum Markieren)</label>
                            <button 
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, painPoints: [] }))}
                              className="text-[10px] text-primary font-bold hover:underline uppercase tracking-wider"
                            >
                              Zurücksetzen
                            </button>
                          </div>
                          <BodyMap selectedPoints={formData.painPoints} onToggle={togglePainPoint} />
                          <p className="rounded-xl bg-mint/50 px-4 py-3 text-sm leading-relaxed text-dark/70" role="status" aria-live="polite">
                            <span className="font-bold text-secondary">Markiert: </span>
                            {selectedPainLabels.length > 0
                              ? selectedPainLabels.join(', ')
                              : 'Noch keine Körperregion ausgewählt.'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Ständig Schmerzen?</label>
                          <select name="staendigSchmerzen" value={formData.staendigSchmerzen} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Trend der Beschwerden</label>
                          <select name="beschwerdenTrend" value={formData.beschwerdenTrend} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="besser">Besser werdend</option>
                            <option value="gleich">Gleichbleibend</option>
                            <option value="schlechter">Werden schlimmer</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" /> Symptome & Kraft
                    </h2>
                    
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-[#101828B3] block mb-2">Haben Sie folgende Symptome bemerkt?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'gleichgewicht', label: 'Gleichgewichtsstörungen' },
                          { id: 'blase', label: 'Blasenschwäche' },
                          { id: 'schwindel', label: 'Schwindel' },
                          { id: 'uebelkeit', label: 'Übelkeit' },
                          { id: 'ohnmacht', label: 'Ohnmachtsanfälle' },
                          { id: 'benommenheit', label: 'Benommenheit' },
                          { id: 'schlucken', label: 'Schluckbeschwerden' },
                          { id: 'doppelbilder', label: 'Doppelbilder' },
                        ].map((symp) => (
                          <label key={symp.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-light cursor-pointer transition-colors">
                            <input 
                              type="checkbox" 
                              name={`symptome.${symp.id}`} 
                              checked={formData.symptome[symp.id as keyof typeof formData.symptome]} 
                              onChange={handleInputChange}
                              className="w-5 h-5 accent-primary"
                            />
                            <span className="text-sm text-[#101828CC]">{symp.label}</span>
                          </label>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">An Kraft verloren?</label>
                          <select name="kraftVerloren" value={formData.kraftVerloren} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Ungewollt gestürzt?</label>
                          <select name="gestuerzt" value={formData.gestuerzt} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" /> Aktivitäten & Teilhabe
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Wobei sind Sie im Alltag eingeschränkt?</label>
                        <textarea 
                          name="alltagEingeschraenkt" value={formData.alltagEingeschraenkt} onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-border outline-none h-20"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Ist Ihre Nachtruhe gestört?</label>
                          <select name="nachtruheGestoert" value={formData.nachtruheGestoert} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Einschränkung Gehstrecke (Wandern)?</label>
                          <select name="gehstreckeEingeschraenkt" value={formData.gehstreckeEingeschraenkt} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Normal Treppensteigen möglich?</label>
                          <select name="treppensteigenNormal" value={formData.treppensteigenNormal} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Hilfe in der Wohnung nötig?</label>
                          <select name="hilfeWohnung" value={formData.hilfeWohnung} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Versorgen Sie sich selbst?</label>
                          <select name="versorgenSelbst" value={formData.versorgenSelbst} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Einschränkung im Beruf?</label>
                          <select name="einschraenkungBeruf" value={formData.einschraenkungBeruf} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Was würden Sie gerne wieder können?</label>
                        <input 
                          type="text" name="wasWiederKoennen" value={formData.wasWiederKoennen} onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-border outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" /> Umweltfaktoren & Lebenssituation
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Stress in der Firma?</label>
                          <select name="stressFirma" value={formData.stressFirma} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Stress in der Familie?</label>
                          <select name="stressFamilie" value={formData.stressFamilie} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Wie zufrieden sind Sie aktuell? (0-10)</label>
                        <input 
                          type="range" name="lebenssituationZufriedenheit" min="0" max="10" value={formData.lebenssituationZufriedenheit} onChange={handleInputChange}
                          className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-[#10182880]">
                          <span>0 (sehr zufrieden)</span>
                          <span className="font-bold text-primary">{formData.lebenssituationZufriedenheit}</span>
                          <span>10 (unzufrieden)</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div 
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-primary" /> Allgemeine Anamnese
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Familienstand</label>
                          <select name="familienstand" value={formData.familienstand} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ledig">Ledig</option>
                            <option value="verheiratet">Verheiratet / Partnerschaft</option>
                            <option value="verwitwet">Verwitwet</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Kinder</label>
                          <input type="text" name="kinder" value={formData.kinder} onChange={handleInputChange} placeholder="Anzahl / Alter" className="w-full px-4 py-3 rounded-xl border border-border outline-none" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Beruf</label>
                          <input type="text" name="beruf" value={formData.beruf} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Hobbys</label>
                          <input type="text" name="hobbys" value={formData.hobbys} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3] block mb-2">Diagnosen</label>
                        <div className="flex gap-4">
                          {['asthma', 'diabetes', 'osteoporose'].map(diag => (
                            <label key={diag} className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" name={`diagnosen.${diag}`} 
                                checked={formData.diagnosen[diag as keyof typeof formData.diagnosen]} 
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-primary"
                              />
                              <span className="text-sm capitalize">{diag}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Gewicht verloren?</label>
                          <select name="gewichtVerloren" value={formData.gewichtVerloren} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#101828B3]">Krebserkrankung?</label>
                          <select name="krebs" value={formData.krebs} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none">
                            <option value="">Bitte wählen...</option>
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Aktuelle Medikamente</label>
                        <textarea name="medikamente" value={formData.medikamente} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none h-20" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#101828B3]">Frühere Operationen / Unfälle</label>
                        <textarea name="fruehereOperationen" value={formData.fruehereOperationen} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border outline-none h-20" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              {step === totalSteps && (
                <div className="mt-8 rounded-2xl border border-border bg-light p-4">
                  <label htmlFor="anamnese-privacy" className="flex items-start gap-3 text-sm text-dark/70 leading-relaxed cursor-pointer">
                    <input
                      id="anamnese-privacy"
                      type="checkbox"
                      required
                      checked={privacyAccepted}
                      onChange={(event) => setPrivacyAccepted(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span>
                      Ich willige ein, dass meine Angaben aus dem digitalen Anamnesebogen, einschließlich Gesundheitsdaten und generiertem PDF, zur Vorbereitung und Durchführung meiner Behandlung verarbeitet und an anamnesebogen@movin-freiburg.de übermittelt werden. Hinweise zu Zweck, Empfängern, Speicherdauer, Widerruf und Löschung finden Sie in der <Link to="/datenschutz/" className="text-primary hover:underline">Datenschutzerklärung</Link>.
                    </span>
                  </label>
                  <label htmlFor="anamnese-patient-copy" className="mt-4 flex items-start gap-3 border-t border-border pt-4 text-sm text-dark/70 leading-relaxed cursor-pointer">
                    <input
                      id="anamnese-patient-copy"
                      type="checkbox"
                      checked={sendPatientCopy}
                      onChange={(event) => setSendPatientCopy(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span>
                      Ich möchte eine Kopie des Anamnesebogens als PDF an <strong>{formData.email || 'meine angegebene E-Mail-Adresse'}</strong> erhalten. Mir ist bewusst, dass die E-Mail sensible Gesundheitsdaten enthalten kann.
                    </span>
                  </label>
                </div>
              )}

              <div className="mt-12 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-secondary font-bold disabled:opacity-30 transition-opacity"
                >
                  <ArrowLeft className="w-5 h-5" /> Zurück
                </button>

                {step < totalSteps ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="btn-primary flex items-center gap-2"
                  >
                    Weiter <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={downloadManualPDF}
                      disabled={isGeneratingPdf || isSubmitting}
                      className="btn-outline flex items-center gap-2 disabled:cursor-wait disabled:opacity-60"
                    >
                      {isGeneratingPdf ? (
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="h-5 w-5" />
                      )}
                      {isGeneratingPdf ? 'PDF wird erstellt...' : 'PDF herunterladen'}
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting || isGeneratingPdf}
                      className="btn-primary flex items-center gap-2 disabled:cursor-wait disabled:opacity-60"
                    >
                      {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      {isSubmitting ? 'PDF wird erstellt und gesendet...' : 'Absenden'}
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="p-16 text-center space-y-6">
              <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-secondary">Vielen Dank!</h2>
              <p className="text-[#101828B3] text-lg max-w-md mx-auto">
                Ihr Anamnesebogen wurde erfolgreich übermittelt. Wir freuen uns auf Ihren Besuch in unserer Praxis.
              </p>
              {sendPatientCopy && (patientCopySent ? (
                <p className="text-sm text-dark/70">Eine Kopie des PDFs wurde an <strong>{formData.email}</strong> gesendet.</p>
              ) : (
                <p className="text-sm text-dark/70">Die Übermittlung an MOVIN war erfolgreich. Die persönliche PDF-Kopie konnte jedoch nicht an <strong>{formData.email}</strong> gesendet werden.</p>
              ))}
              <div className="pt-8">
                <button 
                  onClick={() => { setIsSuccess(false); setStep(1); setFormData(initialData); setPrivacyAccepted(false); setSendPatientCopy(false); setPatientCopySent(null); setError(null); }}
                  className="btn-outline"
                >
                  Neues Formular ausfüllen
                </button>
              </div>
            </div>
          )}

          {/* Hidden PDF Template for generation */}
          <div 
            className="fixed left-[-10000px] top-0 w-[210mm] pointer-events-none"
            style={{ zIndex: -100 }}
            aria-hidden="true"
          >
            <style>{`
              .pdf-page {
                font-size: 11px;
                line-height: 1.3;
              }
              :where(.pdf-page) p {
                font-size: inherit;
                line-height: inherit;
              }
              :where(.pdf-page) * {
                text-transform: none !important;
                letter-spacing: normal !important;
              }
            `}</style>
            <div ref={pdfRef} className="w-[210mm] bg-[#f8fafc] pointer-events-none">
              {/* PRINT TEMPLATE: close to the approved two-page ICF form, translated into the 2026 MOVIN brand. */}
              <div className="pdf-page w-[210mm] min-h-[297mm] bg-white p-[13mm] text-[9.5px] leading-[1.35] text-[#334155] font-sans flex flex-col relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0a0f4d] via-[#12aeb5] to-[#b8efd0]" />

                <header className="mb-5 flex items-start justify-between pt-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#e8f8f7] text-[#12aeb5]">
                      <ClipboardList className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-heading text-[10px] font-bold text-[#12aeb5]">DIGITALER ANAMNESEBOGEN</p>
                      <p className="text-[8px] text-[#6c7a86]">Biopsychosoziale Erhebung nach ICF</p>
                    </div>
                  </div>
                  <img src="/images/logos/movin-logo-2026-horizontal-rgb-gradient.png" alt="MOVIN" className="h-auto w-[145px] object-contain" />
                </header>

                <div className="mb-4">
                  <h1 className="font-heading text-[30px] font-bold leading-none text-[#0a0f4d]">Anamnesebogen</h1>
                  <p className="mt-2 max-w-[560px] text-[9px] text-[#6c7a86]">Ihre Angaben unterstützen die Vorbereitung der physiotherapeutischen Behandlung und werden vertraulich verarbeitet.</p>
                </div>

                <div className="mb-5 grid grid-cols-[1fr_1fr_0.7fr] gap-5 rounded-[10px] bg-[#f5fbfb] px-4 py-3">
                  <div><p className="text-[8px] font-bold text-[#12aeb5]">NAME</p><p className="border-b border-[#9fb4bd] pb-1 font-semibold text-[#0a0f4d]">{formData.name || 'Keine Angabe'}</p></div>
                  <div><p className="text-[8px] font-bold text-[#12aeb5]">VORNAME</p><p className="border-b border-[#9fb4bd] pb-1 font-semibold text-[#0a0f4d]">{formData.vorname || 'Keine Angabe'}</p></div>
                  <div><p className="text-[8px] font-bold text-[#12aeb5]">GEBURTSDATUM</p><p className="border-b border-[#9fb4bd] pb-1 font-semibold text-[#0a0f4d]">{formData.geburtsdatum || 'Keine Angabe'}</p></div>
                </div>

                <PdfSectionTitle number="I">Körperfunktionen und Körperstrukturen</PdfSectionTitle>

                <div className="mb-3 grid grid-cols-[1.25fr_0.75fr] gap-5">
                  <div className="space-y-3">
                    <div className="rounded-[8px] border border-[#c9eef0] bg-[#f7fdfd] p-3">
                      <p className="mb-1 text-[8px] font-bold text-[#12aeb5]">1. PROBLEME UND SCHMERZREGIONEN</p>
                      <p className="font-semibold text-[#0a0f4d]">{formData.schmerzenWo || 'Keine freie Beschreibung'}</p>
                      <p className="mt-2 text-[8px] font-bold text-[#6c7a86]">MARKIERTE KÖRPERSTELLEN</p>
                      <p className="text-[9px] text-[#334155]">{selectedPainLabels.length ? selectedPainLabels.join(', ') : 'Keine Markierungen'}</p>
                    </div>

                    <div>
                      <div className="mb-1 flex items-end justify-between">
                        <p className="text-[8.5px] text-[#536170]">2.1 Intensität der Schmerzen</p>
                        <p className="font-heading text-[15px] font-bold text-[#12aeb5]">{formData.intensitaet}/10</p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#e6eef0]">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#b8efd0] via-[#12aeb5] to-[#0a0f4d]" style={{ width: `${formData.intensitaet * 10}%` }} />
                      </div>
                      <div className="mt-1 flex justify-between text-[7px] text-[#7b8994]"><span>0 - keine Schmerzen</span><span>10 - stärkste Schmerzen</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-[8px] bg-[#fafcfc] px-2 py-2">
                    <p className="mb-1 text-[8px] font-bold text-[#12aeb5]">SCHMERZLOKALISATION</p>
                    <BodyMap selectedPoints={formData.painPoints} onToggle={() => {}} sizeClassName="w-16 h-32" className="flex items-center justify-center gap-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-5">
                  <PdfAnswerRow number="2." label="Haben Sie Schmerzen?" value={formData.hatSchmerzen} compact />
                  <PdfAnswerRow number="2.2" label="Ständig Schmerzen?" value={formData.staendigSchmerzen} compact />
                  <PdfAnswerRow number="2.3" label="Entwicklung der Beschwerden" value={formData.beschwerdenTrend} compact />
                  <PdfAnswerRow number="2.4" label="Seit wann bestehen die Schmerzen?" value={formData.seitWann} compact />
                  <PdfAnswerRow number="2.5" label="Können die Schmerzen wieder weggehen?" value={formData.glaubenHeilung} compact />
                  <PdfAnswerRow number="2.6" label="Unfall als Auslöser?" value={`${formData.unfall || 'Keine Angabe'}${formData.unfallWann ? ` - ${formData.unfallWann}` : ''}`} compact />
                  <PdfAnswerRow number="3." label="Beweglichkeit verschlechtert?" value={`${formData.beweglichkeitVerschlechtert || 'Keine Angabe'}${formData.beweglichkeitWo ? ` - ${formData.beweglichkeitWo}` : ''}`} compact />
                  <PdfAnswerRow number="4." label="Gefühlsstörungen?" value={`${formData.gefuehlsstoerungen || 'Keine Angabe'}${formData.gefuehlsstoerungenWo ? ` - ${formData.gefuehlsstoerungenWo}` : ''}`} compact />
                  <PdfAnswerRow number="6." label="Kraftverlust?" value={`${formData.kraftVerloren || 'Keine Angabe'}${formData.kraftWo ? ` - ${formData.kraftWo}` : ''}`} compact />
                  <PdfAnswerRow number="6.2" label="Ungewollt gestürzt?" value={formData.gestuerzt} compact />
                </div>

                <div className="mt-4 rounded-[8px] border border-[#d9e2e8] p-3">
                  <p className="mb-2 text-[8px] font-bold text-[#12aeb5]">5. BEGLEITSYMPTOME</p>
                  <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                    {Object.entries(formData.symptome).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${value ? 'border-[#12aeb5] bg-[#12aeb5] text-white' : 'border-[#aebcc4] bg-white'}`}>{value ? '✓' : ''}</span>
                        <span className={value ? 'font-semibold text-[#0a0f4d]' : 'text-[#7b8994]'}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <PdfFooter page={1} name={`${formData.vorname} ${formData.name}`.trim()} />
              </div>

              <div className="pdf-page w-[210mm] min-h-[297mm] bg-white p-[13mm] text-[9.5px] leading-[1.35] text-[#334155] font-sans flex flex-col relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0a0f4d] via-[#12aeb5] to-[#b8efd0]" />

                <header className="mb-5 flex items-center justify-between pt-3">
                  <div>
                    <p className="font-heading text-[16px] font-bold text-[#0a0f4d]">Anamnesebogen</p>
                    <p className="text-[8px] text-[#6c7a86]">{formData.vorname} {formData.name}</p>
                  </div>
                  <img src="/images/logos/movin-logo-2026-horizontal-rgb-gradient.png" alt="MOVIN" className="h-auto w-[135px] object-contain" />
                </header>

                <div className="space-y-4">
                  <section>
                    <PdfSectionTitle number="II">Aktivitäten</PdfSectionTitle>
                    <PdfAnswerRow number="1." label="Wobei sind Sie im Alltag eingeschränkt?" value={formData.alltagEingeschraenkt} compact />
                    <div className="grid grid-cols-2 gap-x-5">
                      <PdfAnswerRow number="2." label="Ist Ihre Nachtruhe gestört?" value={formData.nachtruheGestoert} compact />
                      <PdfAnswerRow number="3." label="Ist Ihre Gehstrecke eingeschränkt?" value={formData.gehstreckeEingeschraenkt} compact />
                      <PdfAnswerRow number="4." label="Können Sie normal Treppen steigen?" value={formData.treppensteigenNormal} compact />
                    </div>
                  </section>

                  <section>
                    <PdfSectionTitle number="III">Teilhabe (Partizipation)</PdfSectionTitle>
                    <div className="grid grid-cols-2 gap-x-5">
                      <PdfAnswerRow number="1." label="Benötigen Sie Hilfe in der Wohnung?" value={formData.hilfeWohnung} compact />
                      <PdfAnswerRow number="2." label="Versorgen Sie sich selbst?" value={formData.versorgenSelbst} compact />
                      <PdfAnswerRow number="3." label="Versorgen Sie Ihre Familie?" value={formData.versorgenFamilie} compact />
                      <PdfAnswerRow number="4." label="Einschränkungen im Beruf?" value={formData.einschraenkungBeruf} compact />
                    </div>
                    <PdfAnswerRow number="5." label="Was möchten Sie gerne wieder können?" value={formData.wasWiederKoennen} compact />
                    <div className="mt-2 rounded-[8px] bg-[#f5fbfb] px-3 py-2">
                      <div className="flex items-center justify-between"><span className="text-[8.5px] text-[#536170]">6. Zufriedenheit mit der aktuellen Lebenssituation</span><span className="font-heading text-[14px] font-bold text-[#12aeb5]">{formData.lebenssituationZufriedenheit}/10</span></div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#dce9eb]"><div className="h-full bg-gradient-to-r from-[#b8efd0] to-[#12aeb5]" style={{ width: `${formData.lebenssituationZufriedenheit * 10}%` }} /></div>
                    </div>
                  </section>

                  <section>
                    <PdfSectionTitle number="IV">Umweltfaktoren</PdfSectionTitle>
                    <div className="grid grid-cols-2 gap-x-5">
                      <PdfAnswerRow number="1." label="Stress im beruflichen Umfeld?" value={formData.stressFirma} compact />
                      <PdfAnswerRow number="2." label="Stress im familiären Umfeld?" value={formData.stressFamilie} compact />
                    </div>
                  </section>

                  <section>
                    <PdfSectionTitle number="V">Personenbezogene Faktoren und allgemeine Anamnese</PdfSectionTitle>
                    <div className="grid grid-cols-2 gap-x-5">
                      <PdfAnswerRow number="1." label="Familienstand" value={formData.familienstand} compact />
                      <PdfAnswerRow number="2." label="Kinder / im Haushalt" value={`${formData.kinder || 'Keine Angabe'}${formData.kinderImHaus ? ` / ${formData.kinderImHaus}` : ''}`} compact />
                      <PdfAnswerRow number="3." label="Beruf" value={formData.beruf} compact />
                      <PdfAnswerRow number="4." label="Hobbys" value={formData.hobbys} compact />
                    </div>

                    <div className="my-2 rounded-[8px] border border-[#c9eef0] bg-[#f7fdfd] px-3 py-2">
                      <p className="mb-2 text-[8px] font-bold text-[#12aeb5]">5. DIAGNOSEN</p>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(formData.diagnosen).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${value ? 'border-[#0a0f4d] bg-[#0a0f4d] text-white' : 'border-[#aebcc4] bg-white'}`}>{value ? '✓' : ''}</span>
                            <span className={value ? 'font-semibold text-[#0a0f4d]' : 'text-[#7b8994]'}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <PdfAnswerRow number="6." label="Aktuelle Medikamente" value={formData.medikamente} compact />
                    <div className="grid grid-cols-2 gap-x-5">
                      <PdfAnswerRow number="7." label="Ungewollter Gewichtsverlust?" value={formData.gewichtVerloren} compact />
                      <PdfAnswerRow number="8." label="Frühere Krebserkrankung?" value={`${formData.krebs || 'Keine Angabe'}${formData.krebsWelche ? ` - ${formData.krebsWelche}` : ''}`} compact />
                      <PdfAnswerRow number="9." label="Nachtschweiß oder Fieberschübe?" value={formData.nachtschweiss} compact />
                      <PdfAnswerRow number="10." label="Frühere Unfälle" value={formData.fruehereUnfaelle} compact />
                      <PdfAnswerRow number="11." label="Frühere Operationen" value={formData.fruehereOperationen} compact />
                    </div>
                    <PdfAnswerRow number="12." label="Weitere Beschwerden oder Besonderheiten" value={formData.andereBeschwerden} compact />
                  </section>
                </div>

                <PdfFooter page={2} name={`${formData.vorname} ${formData.name}`.trim()} />
              </div>

              {/* PAGE 1: Personal Info & Body Map & Section I */}
              <div className="pdf-page-legacy hidden w-[210mm] h-[297mm] bg-[#ffffff] p-[15mm] text-[#0f172a] font-sans flex-col relative overflow-hidden">
                {/* Header with Logo-like styling */}
                <div className="flex justify-between items-start border-b-4 border-[#00c2cb] pb-6 mb-8">
                  <div>
                    <h1 className="text-4xl font-black text-[#0a0f4d] uppercase tracking-tighter mb-1">Anamnesebogen</h1>
                    <p className="text-[#00c2cb] font-bold text-lg">MOVIN Physiotherapie</p>
                    <p className="text-[#64748b] text-sm font-medium">Innovativ & Bewegt</p>
                  </div>
                  <div className="text-right text-[11px] text-[#475569] leading-relaxed bg-[#f1f5f9] p-4 rounded-2xl border border-[#e2e8f0]">
                    <p className="font-bold text-[#0a0f4d] text-xs mb-1 uppercase tracking-wider">Praxis Freiburg</p>
                    <p>Mercystrasse 14, 79100 Freiburg</p>
                    <p>Tel: 0761 7073366</p>
                    <p className="text-[#00c2cb] font-bold">movin-freiburg.de</p>
                  </div>
                </div>

                {/* Patient Info Card */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="col-span-2 bg-[#f8fafc] p-6 rounded-3xl border border-[#e2e8f0] shadow-sm">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase mb-1 tracking-widest">Patient / Name, Vorname</p>
                        <p className="text-3xl font-black text-[#0a0f4d] leading-none">{formData.vorname} {formData.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase mb-1 tracking-widest">Geburtsdatum</p>
                        <p className="text-xl font-bold text-[#1e293b]">{formData.geburtsdatum || '---'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase mb-1 tracking-widest">E-Mail Adresse</p>
                        <p className="text-lg font-semibold text-[#1e293b]">{formData.email || '---'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-3xl p-4 flex flex-col items-center justify-center border border-[#e2e8f0] shadow-sm">
                    <p className="text-[9px] font-bold text-[#94a3b8] uppercase mb-2 tracking-widest">Schmerzlokalisation</p>
                    <BodyMap selectedPoints={formData.painPoints} onToggle={() => {}} sizeClassName="w-20 h-40" className="flex gap-2 justify-center items-center" />
                  </div>
                </div>

                {/* Section I: Körperfunktionen & Strukturen */}
                <section className="flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[#0a0f4d] flex items-center justify-center text-white font-bold">I</div>
                    <h2 className="text-xl font-black text-[#0a0f4d] uppercase tracking-wider">Körperfunktionen & Strukturen</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-[#bae6fd]">
                      <span className="font-bold text-[#0369a1] uppercase text-[10px] block mb-2 tracking-widest">Markierte Körperstellen:</span>
                      <span className="text-[#0c4a6e] font-bold text-lg">
                        {formData.painPoints.length > 0 
                          ? formData.painPoints.map(id => BODY_PARTS.find(p => p.id === id)?.label).join(', ') 
                          : 'Keine Markierungen'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-[13px]">
                      <div className="col-span-2">
                        <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Detaillierte Schmerzbeschreibung:</span>
                        <p className="text-[#1e293b] text-base leading-relaxed bg-[#f8fafc] p-3 rounded-xl border border-[#f1f5f9]">{formData.schmerzenWo || 'Keine Angabe'}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 col-span-2 gap-6 p-4 bg-[#f8fafc] rounded-2xl border border-[#f1f5f9]">
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Aktuell Schmerzen?</span>
                          <p className="font-bold text-[#0a0f4d]">{formData.hatSchmerzen || '---'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Intensität (VAS)</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-grow bg-[#e2e8f0] rounded-full overflow-hidden">
                              <div className="h-full bg-[#00c2cb]" style={{ width: `${formData.intensitaet * 10}%` }}></div>
                            </div>
                            <span className="font-black text-lg text-[#00c2cb]">{formData.intensitaet}/10</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Ständige Schmerzen?</span>
                          <p className="font-bold text-[#0a0f4d]">{formData.staendigSchmerzen || '---'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Beschwerden-Trend</span>
                          <p className="font-bold text-[#0a0f4d]">{formData.beschwerdenTrend || '---'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Seit wann?</span>
                          <p className="font-bold text-[#0a0f4d]">{formData.seitWann || '---'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Heilungserwartung</span>
                          <p className="font-bold text-[#0a0f4d]">{formData.glaubenHeilung || '---'}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-[#f1f5f9]">
                        <div className="space-y-3">
                          <div>
                            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Unfallereignis?</span>
                            <p className="text-[#1e293b] font-semibold">{formData.unfall || 'nein'} {formData.unfallWann && <span className="text-[#64748b] font-normal">({formData.unfallWann})</span>}</p>
                          </div>
                          <div>
                            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Beweglichkeitseinschränkung?</span>
                            <p className="text-[#1e293b] font-semibold">{formData.beweglichkeitVerschlechtert || 'nein'} {formData.beweglichkeitWo && <span className="text-[#64748b] font-normal">({formData.beweglichkeitWo})</span>}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Gefühlsstörungen?</span>
                            <p className="text-[#1e293b] font-semibold">{formData.gefuehlsstoerungen || 'nein'} {formData.gefuehlsstoerungenWo && <span className="text-[#64748b] font-normal">({formData.gefuehlsstoerungenWo})</span>}</p>
                          </div>
                          <div>
                            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Kraftverlust?</span>
                            <p className="text-[#1e293b] font-semibold">{formData.kraftVerloren || 'nein'} {formData.kraftWo && <span className="text-[#64748b] font-normal">({formData.kraftWo})</span>}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f8fafc] p-5 rounded-2xl border border-[#f1f5f9]">
                      <span className="font-bold text-[#64748b] uppercase text-[10px] block mb-3 tracking-widest">Begleitsymptome:</span>
                      <div className="grid grid-cols-4 gap-y-3 text-[11px]">
                        {Object.entries(formData.symptome).map(([k, v]) => (
                          <div key={k} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${v ? 'bg-[#0a0f4d] border-[#0a0f4d]' : 'bg-white border-[#cbd5e1]'}`}>
                              {v && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={v ? 'font-bold text-[#0a0f4d]' : 'text-[#94a3b8]'}>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer Page 1 */}
                <div className="mt-auto pt-6 border-t border-[#e2e8f0] text-[10px] text-[#94a3b8] flex justify-between items-end">
                  <div>
                    <p className="font-bold text-[#64748b] uppercase tracking-widest mb-1">MOVIN Physiotherapie | Digitaler Anamnesebogen</p>
                    <p>Patient: <span className="font-bold text-[#0a0f4d]">{formData.vorname} {formData.name}</span> • Seite 1 von 2</p>
                  </div>
                  <div className="text-right">
                    <p>Generiert am {new Date().toLocaleDateString('de-DE')} • {new Date().toLocaleTimeString('de-DE')}</p>
                  </div>
                </div>
              </div>

              {/* PAGE 2: Sections II, III & IV */}
              <div className="pdf-page-legacy hidden w-[210mm] h-[297mm] bg-[#ffffff] p-[15mm] text-[#0f172a] font-sans flex-col relative overflow-hidden">
                {/* Mini Header Page 2 */}
                <div className="flex justify-between items-center border-b-2 border-[#0a0f4d] pb-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#0a0f4d] flex items-center justify-center text-white text-xs font-bold">II</div>
                    <p className="text-sm font-black text-[#0a0f4d] uppercase tracking-widest">Aktivitäten & Teilhabe</p>
                  </div>
                  <p className="text-[10px] text-[#64748b]">Patient: <span className="font-bold text-[#0a0f4d]">{formData.vorname} {formData.name}</span></p>
                </div>

                <div className="space-y-8 flex-grow">
                  {/* Section II: Aktivitäten & Teilhabe */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-[#f8fafc] p-5 rounded-2xl border border-[#f1f5f9]">
                      <span className="font-bold text-[#64748b] uppercase text-[10px] block mb-2 tracking-widest">Einschränkungen im Alltag:</span>
                      <p className="text-[#1e293b] text-base leading-relaxed italic">"{formData.alltagEingeschraenkt || 'Keine Angabe'}"</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-[13px] p-4 bg-[#f8fafc] rounded-2xl border border-[#f1f5f9]">
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Nachtruhe gestört?</span> <p className="font-semibold text-[#0a0f4d]">{formData.nachtruheGestoert || '---'}</p></div>
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Treppensteigen normal?</span> <p className="font-semibold text-[#0a0f4d]">{formData.treppensteigenNormal || '---'}</p></div>
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Gehstrecke eingeschränkt?</span> <p className="font-semibold text-[#0a0f4d]">{formData.gehstreckeEingeschraenkt || '---'}</p></div>
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Hilfe in der Wohnung?</span> <p className="font-semibold text-[#0a0f4d]">{formData.hilfeWohnung || '---'}</p></div>
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Selbstversorgung möglich?</span> <p className="font-semibold text-[#0a0f4d]">{formData.versorgenSelbst || '---'}</p></div>
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Versorgung der Familie?</span> <p className="font-semibold text-[#0a0f4d]">{formData.versorgenFamilie || '---'}</p></div>
                      <div className="col-span-2"><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-0.5">Einschränkung im Beruf?</span> <p className="font-semibold text-[#0a0f4d]">{formData.einschraenkungBeruf || '---'}</p></div>
                    </div>

                    <div className="bg-[#f0fdfa] p-5 rounded-2xl border border-[#ccfbf1]">
                      <span className="font-bold text-[#0d9488] uppercase text-[10px] block mb-2 tracking-widest">Therapieziele (Was möchten Sie wieder können?):</span>
                      <p className="text-[#134e4a] text-lg font-black italic">"{formData.wasWiederKoennen || 'Keine Angabe'}"</p>
                    </div>
                  </div>

                  {/* Section III: Lebenssituation */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 rounded bg-[#0a0f4d] flex items-center justify-center text-white text-xs font-bold">III</div>
                      <h2 className="text-sm font-black text-[#0a0f4d] uppercase tracking-widest">Lebenssituation</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-[13px] bg-[#f8fafc] p-5 rounded-2xl border border-[#f1f5f9]">
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Stress (Beruflich):</span><p className="text-[#1e293b]">{formData.stressFirma || '---'}</p></div>
                      <div><span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Stress (Privat):</span><p className="text-[#1e293b]">{formData.stressFamilie || '---'}</p></div>
                      <div>
                        <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Zufriedenheit mit Lebenssituation</span>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-32 bg-[#e2e8f0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0d9488]" style={{ width: `${formData.lebenssituationZufriedenheit * 10}%` }}></div>
                          </div>
                          <span className="font-black text-lg text-[#0d9488]">{formData.lebenssituationZufriedenheit}/10</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Familienstand & Kinder</span>
                        <p className="text-[#1e293b] font-semibold">{formData.familienstand || '---'} • {formData.kinder || '0'} Kinder {formData.kinderImHaus && <span className="text-[#64748b] font-normal">({formData.kinderImHaus} im Haus)</span>}</p>
                      </div>
                    </div>
                  </section>

                  {/* Section IV: Allgemeine Anamnese */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 rounded bg-[#0a0f4d] flex items-center justify-center text-white text-xs font-bold">IV</div>
                      <h2 className="text-sm font-black text-[#0a0f4d] uppercase tracking-widest">Allgemeine Anamnese</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-[13px]">
                      <div className="bg-[#f8fafc] p-4 rounded-2xl border border-[#f1f5f9]">
                        <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Beruf:</span>
                        <p className="text-[#1e293b] font-bold">{formData.beruf || '---'}</p>
                      </div>
                      <div className="bg-[#f8fafc] p-4 rounded-2xl border border-[#f1f5f9]">
                        <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Hobbys:</span>
                        <p className="text-[#1e293b] font-bold">{formData.hobbys || '---'}</p>
                      </div>
                      
                      <div className="col-span-2 bg-[#fff7ed] p-4 rounded-2xl border border-[#ffedd5]">
                        <span className="font-bold text-[#9a3412] uppercase text-[10px] block mb-3 tracking-widest text-center">Bestehende Diagnosen:</span>
                        <div className="flex justify-around">
                          {Object.entries(formData.diagnosen).map(([k, v]) => (
                            <div key={k} className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${v ? 'bg-[#9a3412] border-[#9a3412]' : 'bg-white border-[#fdba74]'}`}>
                                {v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className={v ? 'font-bold text-[#9a3412]' : 'text-[#fdba74]'}>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-2 space-y-4 bg-[#f8fafc] p-5 rounded-2xl border border-[#f1f5f9]">
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Aktuelle Medikamente:</span>
                          <p className="text-[#1e293b] leading-relaxed">{formData.medikamente || 'Keine Angabe'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Frühere Operationen:</span>
                            <p className="text-[#1e293b] leading-relaxed">{formData.fruehereOperationen || 'Keine'}</p>
                          </div>
                          <div>
                            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Frühere Unfälle:</span>
                            <p className="text-[#1e293b] leading-relaxed">{formData.fruehereUnfaelle || 'Keine'}</p>
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-widest block mb-1">Sonstige Beschwerden:</span>
                          <p className="text-[#1e293b] leading-relaxed">{formData.andereBeschwerden || 'Keine'}</p>
                        </div>
                      </div>

                      <div className="col-span-2 grid grid-cols-3 gap-6 p-4 bg-[#fef2f2] rounded-2xl border border-[#fee2e2]">
                        <div>
                          <span className="font-bold text-[#b91c1c] uppercase text-[9px] tracking-widest block mb-1">Gewichtsverlust?</span>
                          <p className="font-bold text-[#991b1b]">{formData.gewichtVerloren || 'nein'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#b91c1c] uppercase text-[9px] tracking-widest block mb-1">Nachtschweiß?</span>
                          <p className="font-bold text-[#991b1b]">{formData.nachtschweiss || 'nein'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#b91c1c] uppercase text-[9px] tracking-widest block mb-1">Krebserkrankung?</span>
                          <p className="font-bold text-[#991b1b]">{formData.krebs || 'nein'} {formData.krebsWelche && <span className="text-xs font-normal">({formData.krebsWelche})</span>}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer Page 2 */}
                <div className="mt-auto pt-6 border-t border-[#e2e8f0] text-[10px] text-[#94a3b8] flex justify-between items-end">
                  <div>
                    <p className="font-bold text-[#64748b] uppercase tracking-widest mb-1">MOVIN Physiotherapie | Digitaler Anamnesebogen</p>
                    <p>Patient: <span className="font-bold text-[#0a0f4d]">{formData.vorname} {formData.name}</span> • Seite 2 von 2</p>
                  </div>
                  <div className="text-right">
                    <p>Generiert am {new Date().toLocaleDateString('de-DE')} • {new Date().toLocaleTimeString('de-DE')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>
</div>
</div>
);
}
