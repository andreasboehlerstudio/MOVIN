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
  AlertCircle
} from 'lucide-react';
import SEO from '../components/seo/SEO';

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
  { id: 'head-f', label: 'Kopf (V)', cx: 50, cy: 15, r: 8, view: 'front' },
  { id: 'neck-f', label: 'Hals (V)', cx: 50, cy: 28, r: 5, view: 'front' },
  { id: 'chest', label: 'Brust', cx: 50, cy: 45, r: 10, view: 'front' },
  { id: 'shoulder-l-f', label: 'Schulter L (V)', cx: 32, cy: 40, r: 6, view: 'front' },
  { id: 'shoulder-r-f', label: 'Schulter R (V)', cx: 68, cy: 40, r: 6, view: 'front' },
  { id: 'arm-l-f', label: 'Arm L (V)', cx: 25, cy: 65, r: 5, view: 'front' },
  { id: 'arm-r-f', label: 'Arm R (V)', cx: 75, cy: 65, r: 5, view: 'front' },
  { id: 'abdomen', label: 'Bauch', cx: 50, cy: 65, r: 10, view: 'front' },
  { id: 'hip-l-f', label: 'Hüfte L (V)', cx: 40, cy: 85, r: 7, view: 'front' },
  { id: 'hip-r-f', label: 'Hüfte R (V)', cx: 60, cy: 85, r: 7, view: 'front' },
  { id: 'knee-l-f', label: 'Knie L (V)', cx: 40, cy: 130, r: 6, view: 'front' },
  { id: 'knee-r-f', label: 'Knie R (V)', cx: 60, cy: 130, r: 6, view: 'front' },
  { id: 'foot-l-f', label: 'Fuß L (V)', cx: 40, cy: 180, r: 6, view: 'front' },
  { id: 'foot-r-f', label: 'Fuß R (V)', cx: 60, cy: 180, r: 6, view: 'front' },
  
  // Back
  { id: 'head-b', label: 'Hinterkopf', cx: 50, cy: 15, r: 8, view: 'back' },
  { id: 'neck-b', label: 'Nacken', cx: 50, cy: 28, r: 5, view: 'back' },
  { id: 'upper-back', label: 'Oberer Rücken', cx: 50, cy: 45, r: 10, view: 'back' },
  { id: 'lower-back', label: 'Lendenwirbelsäule', cx: 50, cy: 75, r: 10, view: 'back' },
  { id: 'shoulder-l-b', label: 'Schulter L (R)', cx: 32, cy: 40, r: 6, view: 'back' },
  { id: 'shoulder-r-b', label: 'Schulter R (R)', cx: 68, cy: 40, r: 6, view: 'back' },
  { id: 'buttocks', label: 'Gesäß', cx: 50, cy: 95, r: 12, view: 'back' },
  { id: 'thigh-l-b', label: 'Oberschenkel L (R)', cx: 40, cy: 115, r: 8, view: 'back' },
  { id: 'thigh-r-b', label: 'Oberschenkel R (R)', cx: 60, cy: 115, r: 8, view: 'back' },
  { id: 'calf-l-b', label: 'Wade L', cx: 40, cy: 155, r: 7, view: 'back' },
  { id: 'calf-r-b', label: 'Wade R', cx: 60, cy: 155, r: 7, view: 'back' },
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

export default function Anamnesebogen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const totalSteps = 6;

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
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    console.log("Starting PDF generation...");
    if (!pdfRef.current) {
      console.error("PDF Ref is null");
      return null;
    }
    
    try {
      // Ensure the template is "visible" to html2canvas but not to the user
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pages = pdfRef.current.querySelectorAll('.pdf-page');
      
      console.log(`Found ${pages.length} pages to render`);
      if (pages.length === 0) {
        console.error("No .pdf-page elements found");
        return null;
      }
      
      for (let i = 0; i < pages.length; i++) {
        console.log(`Rendering page ${i + 1}...`);
        const page = pages[i] as HTMLElement;
        
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: true,
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
        const imgData = canvas.toDataURL('image/png');
        if (imgData === 'data:,') {
          console.error(`Page ${i + 1} canvas is empty`);
          throw new Error(`Empty canvas for page ${i + 1}`);
        }

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      console.log("PDF generation complete");
      return pdf;
    } catch (err) {
      console.error("Error in generatePDF:", err);
      return null;
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

    try {
      const pdf = await generatePDF();
      if (!pdf) throw new Error("PDF generation failed");
      
      const pdfBase64 = pdf.output('datauristring');

      const response = await fetch('/api/send-anamnese', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          name: `${formData.vorname} ${formData.name}`,
          email: formData.email,
          privacyAccepted,
          _website: ''
        })
      });

      if (!response.ok) throw new Error("Failed to send email");

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es später erneut oder laden Sie das PDF manuell herunter.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadManualPDF = async () => {
    const pdf = await generatePDF();
    if (pdf) {
      pdf.save(`Anamnesebogen_${formData.name}.pdf`);
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
                      className="btn-outline flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" /> PDF herunterladen
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary flex items-center gap-2"
                    >
                      {isSubmitting ? "Wird gesendet..." : "Absenden"} <Send className="w-5 h-5" />
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
              <div className="pt-8">
                <button 
                  onClick={() => { setIsSuccess(false); setStep(1); setFormData(initialData); setPrivacyAccepted(false); setError(null); }}
                  className="btn-outline"
                >
                  Neues Formular ausfüllen
                </button>
              </div>
            </div>
          )}

          {/* Hidden PDF Template for generation */}
          <div 
            className="absolute opacity-0 pointer-events-none overflow-hidden" 
            style={{ top: 0, left: 0, width: '210mm', zIndex: -100 }}
          >
            <div ref={pdfRef} className="fixed left-[-9999px] top-0 z-[-1] w-[210mm] bg-[#f8fafc] pointer-events-none" aria-hidden="true">
              {/* PAGE 1: Personal Info & Body Map & Section I */}
              <div className="pdf-page w-[210mm] h-[297mm] bg-[#ffffff] p-[15mm] text-[#0f172a] font-sans flex flex-col relative overflow-hidden">
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
              <div className="pdf-page w-[210mm] h-[297mm] bg-[#ffffff] p-[15mm] text-[#0f172a] font-sans flex flex-col relative overflow-hidden">
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
