import React, { useState, useMemo } from 'react';
import { Brain, Activity, CheckCircle2, AlertTriangle, Loader2, Send, ArrowRight, ArrowLeft, Info, Zap, Calendar, ClipboardList, Thermometer, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import SEO from '../components/seo/SEO';

// Initialize Gemini API (now handled inside handleCheck for SSR compatibility)

type Step = 'intro' | 'location' | 'details' | 'history' | 'functional' | 'summary' | 'analysis';

interface Region {
  id: string;
  label: string;
  x: number; // percentage from left
  y: number; // percentage from top
  side: 'front' | 'back';
}

const BodySilhouette = ({ side }: { side: 'front' | 'back' }) => (
  <svg viewBox="0 0 100 220" className="h-full w-auto text-secondary/5 fill-current transition-all duration-500 drop-shadow-sm">
    {/* Head & Neck */}
    <path d="M50 5 C56 5 61 10 61 17 C61 24 56 29 50 29 C44 29 39 24 39 17 C39 10 44 5 50 5 M46 29 L54 29 L54 35 L46 35 Z" />
    
    {/* Torso & Arms */}
    <path d="M30 45 C25 45 20 50 18 60 L12 100 C11 110 16 115 22 110 L28 70 L30 45 H70 L72 70 L78 110 C84 115 89 110 88 100 L82 60 C80 50 75 45 70 45 Z" />
    <path d="M30 45 L35 115 C35 125 65 125 65 115 L70 45 Z" />
    
    {/* Hips & Legs */}
    <path d="M35 115 C35 130 65 130 65 115 L62 140 C62 145 38 145 38 140 Z" />
    <path d="M38 140 L32 210 C31 220 44 220 45 210 L50 145 Z" />
    <path d="M62 140 L68 210 C69 220 56 220 55 210 L50 145 Z" />
    
    {/* Feet */}
    <path d="M32 210 Q32 218 42 218 L42 210 Z" />
    <path d="M68 210 Q68 218 58 218 L58 210 Z" />
    
    {/* Back specific details (spine hint) */}
    {side === 'back' && (
      <path d="M50 45 V115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-secondary/10" />
    )}
  </svg>
);

const REGIONS: Region[] = [
  { id: 'kopf', label: 'Kopf', x: 50, y: 7, side: 'front' },
  { id: 'nacken', label: 'Nacken', x: 50, y: 14, side: 'back' },
  { id: 'schulter-links', label: 'Schulter links', x: 72, y: 21, side: 'front' },
  { id: 'schulter-rechts', label: 'Schulter rechts', x: 28, y: 21, side: 'front' },
  { id: 'oberarm-links', label: 'Oberarm links', x: 82, y: 38, side: 'front' },
  { id: 'oberarm-rechts', label: 'Oberarm rechts', x: 18, y: 38, side: 'front' },
  { id: 'ruecken-oben', label: 'Rücken oben', x: 50, y: 28, side: 'back' },
  { id: 'ruecken-unten', label: 'Rücken unten', x: 50, y: 48, side: 'back' },
  { id: 'huefte-links', label: 'Hüfte links', x: 62, y: 58, side: 'front' },
  { id: 'huefte-rechts', label: 'Hüfte rechts', x: 38, y: 58, side: 'front' },
  { id: 'knie-links', label: 'Knie links', x: 64, y: 82, side: 'front' },
  { id: 'knie-rechts', label: 'Knie rechts', x: 36, y: 82, side: 'front' },
  { id: 'fuss-links', label: 'Fuß links', x: 66, y: 96, side: 'front' },
  { id: 'fuss-rechts', label: 'Fuß rechts', x: 34, y: 96, side: 'front' },
];

interface FormData {
  regions: string[];
  durationValue: string;
  durationUnit: 'Tage' | 'Wochen' | 'Monate' | 'Jahre';
  intensity: number;
  character: string[];
  medicalCourse: string;
  previousTreatments: string;
  preExistingConditions: string;
  functionalTests: { question: string; answer: 'ja' | 'nein' | null }[];
  redFlags: string[];
}

const initialFormData: FormData = {
  regions: [],
  durationValue: '',
  durationUnit: 'Wochen',
  intensity: 5,
  character: [],
  medicalCourse: '',
  previousTreatments: '',
  preExistingConditions: '',
  functionalTests: [
    { question: 'Können Sie den betroffenen Bereich ohne starke Schmerzen bewegen?', answer: null },
    { question: 'Sind die Schmerzen nachts schlimmer?', answer: null },
    { question: 'Haben Sie eine Schwellung oder Rötung bemerkt?', answer: null },
  ],
  redFlags: [],
};

const PAIN_CHARACTERS = ['Stechend', 'Ziehend', 'Dumpf', 'Brennend', 'Pochen', 'Elektrisierend', 'Druckgefühl'];
const RED_FLAGS = [
  { id: 'taubheit', label: 'Taubheitsgefühle', desc: 'Gliedmaßen fühlen sich gefühllos an' },
  { id: 'kribbeln', label: 'Kribbeln', desc: '"Ameisenlaufen" in den Extremitäten' },
  { id: 'schwellung', label: 'Schwellungen', desc: 'Sichtbare Flüssigkeitseinlagerung' },
  { id: 'fieber', label: 'Fieber', desc: 'Körpertemperatur über 38.5°C' },
  { id: 'kraftverlust', label: 'Kraftverlust', desc: 'Plötzliche Schwäche in Armen oder Beinen' },
];

export default function KISymptomcheck() {
  const [step, setStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');

  const steps: Step[] = ['intro', 'location', 'details', 'history', 'functional', 'summary', 'analysis'];
  const currentStepIndex = steps.indexOf(step);
  
  const progress = useMemo(() => {
    return (currentStepIndex / (steps.length - 1)) * 100;
  }, [currentStepIndex]);

  const handleRegionToggle = (region: string) => {
    setFormData(prev => ({
      ...prev,
      regions: prev.regions.includes(region) 
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  const handleCharacterToggle = (char: string) => {
    setFormData(prev => ({
      ...prev,
      character: prev.character.includes(char)
        ? prev.character.filter(c => c !== char)
        : [...prev.character, char]
    }));
  };

  const handleFunctionalAnswer = (index: number, answer: 'ja' | 'nein') => {
    const newTests = [...formData.functionalTests];
    newTests[index].answer = answer;
    setFormData(prev => ({ ...prev, functionalTests: newTests }));
  };

  const handleRedFlagToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      redFlags: prev.redFlags.includes(id)
        ? prev.redFlags.filter(f => f !== id)
        : [...prev.redFlags, id]
    }));
  };

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    setStep('analysis');

    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = "gemini-3-flash-preview";
      const prompt = `
        Du bist ein erfahrener Physiotherapeut und medizinischer Berater. 
        
        Patientendaten für die Anamnese:
        - Schmerzregionen: ${formData.regions.join(', ')}
        - Dauer der Symptome: ${formData.durationValue} ${formData.durationUnit}
        - Schmerzintensität: ${formData.intensity}/10
        - Schmerzcharakter: ${formData.character.join(', ')}
        - Medizinischer Verlauf: ${formData.medicalCourse}
        - Frühere Behandlungen: ${formData.previousTreatments}
        - Vorerkrankungen/Operationen: ${formData.preExistingConditions}
        - Funktionstests: ${formData.functionalTests.map(t => `${t.question}: ${t.answer}`).join('; ')}
        - Zusätzliche Warnsignale (Red Flags): ${formData.redFlags.join(', ')}
        
        Bitte analysiere diese detaillierten Angaben und gib eine strukturierte Antwort in Markdown-Format (Deutsch) mit folgenden Abschnitten:
        1. **Zusammenfassung der Situation**: Kurze Einordnung der Beschwerden basierend auf den Angaben.
        2. **Mögliche Ursachen**: Nenne 2-3 wahrscheinliche physiotherapeutische oder medizinische Ursachen.
        3. **Empfohlene nächste Schritte**: Was sollte der Patient als nächstes tun? (z.B. Arztbesuch, spezifische Schonung, Physiotherapie).
        4. **Wichtige Warnsignale (Red Flags)**: Spezifische Hinweise basierend auf den gemeldeten Warnsignalen.
        
        WICHTIG: Beginne die Antwort IMMER mit einem deutlichen Hinweis, dass dies keine ärztliche Diagnose ersetzt und im Zweifel immer ein Fachmann konsultiert werden muss.
        Halte dich professionell, empathisch und präzise.
      `;

      const response = await genAI.models.generateContent({
        model: model,
        contents: prompt,
      });

      if (response.text) {
        setResult(response.text);
      } else {
        throw new Error("Keine Antwort von der KI erhalten.");
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("Es gab ein Problem bei der Analyse. Bitte versuche es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  const renderProgress = () => {
    if (step === 'intro' || step === 'analysis') return null;

    return (
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4">
              {step === 'location' && "Wo haben Sie Schmerzen?"}
              {step === 'details' && "Schmerzcharakteristik"}
              {step === 'history' && "Medizinischer Verlauf"}
              {step === 'functional' && "Funktionstests"}
              {step === 'summary' && "Zusammenfassung"}
            </h2>
            <p className="text-dark/60 text-lg">
              {step === 'location' && "Wählen Sie eine oder mehrere Regionen auf der anatomischen Karte aus."}
              {step === 'details' && "Geben Sie uns mehr Details über die Art Ihrer Beschwerden."}
              {step === 'history' && "Beschreiben Sie uns Ihre medizinische Vorgeschichte."}
              {step === 'functional' && "Beantworten Sie kurze Fragen zu Ihrer Beweglichkeit."}
              {step === 'summary' && "Bitte überprüfen Sie Ihre Angaben vor der Analyse."}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-dark/30 uppercase tracking-[0.2em] block mb-1">Fortschritt</span>
            <span className="text-2xl font-black text-secondary">Schritt {currentStepIndex + 1} von {steps.length}</span>
          </div>
        </div>
        <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary shadow-[0_0_10px_rgba(0,194,203,0.3)]"
          />
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-black text-secondary mb-6">Willkommen zum digitalen Check-up</h2>
            <p className="text-lg text-dark/70 mb-10 leading-relaxed">
              In den nächsten Minuten führen wir Sie durch einen strukturierten Anamnesebogen. 
              Ihre Angaben helfen unserer KI, eine präzise Einschätzung Ihrer Beschwerden vorzunehmen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
              <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                <Activity className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-secondary mb-2">Präzise</h3>
                <p className="text-xs text-dark/60">Detaillierte Erfassung Ihrer Symptome.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-secondary mb-2">Schnell</h3>
                <p className="text-xs text-dark/60">Analyse in weniger als 2 Minuten.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-secondary mb-2">Sicher</h3>
                <p className="text-xs text-dark/60">Ihre Daten werden vertraulich behandelt.</p>
              </div>
            </div>
            <button 
              onClick={() => setStep('location')}
              className="btn-primary px-12 py-4 text-lg"
            >
              Check starten <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        );

      case 'location':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Map Area - First on mobile, Right on desktop */}
              <div className="lg:col-span-9 order-1 lg:order-2">
                <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] border border-border shadow-2xl relative overflow-hidden flex flex-col h-[500px] md:h-[750px]">
                  {/* Map Header: Toggle */}
                  <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-20 w-full px-4 flex justify-center">
                    <div className="bg-light/80 backdrop-blur-md p-1 rounded-full flex items-center border border-border shadow-lg">
                      <button 
                        onClick={() => setViewSide('front')}
                        className={`px-4 md:px-8 py-2 rounded-full text-xs md:text-sm font-black transition-all ${viewSide === 'front' ? 'bg-secondary text-white shadow-lg' : 'text-dark/40 hover:text-secondary'}`}
                      >
                        Vorderseite
                      </button>
                      <button 
                        onClick={() => setViewSide('back')}
                        className={`px-4 md:px-8 py-2 rounded-full text-xs md:text-sm font-black transition-all ${viewSide === 'back' ? 'bg-secondary text-white shadow-lg' : 'text-dark/40 hover:text-secondary'}`}
                      >
                        Rückseite
                      </button>
                    </div>
                  </div>

                  {/* The Map */}
                  <div className="relative flex-1 bg-[#fcfdfe] flex items-center justify-center p-8 md:p-16">
                    <div className="relative h-full aspect-[1/2.2] flex items-center justify-center">
                      {/* Custom SVG Silhouette */}
                      <BodySilhouette side={viewSide} />

                      {/* Markers */}
                      {REGIONS.filter(r => r.side === viewSide).map(region => (
                        <button
                          key={region.id}
                          onClick={() => handleRegionToggle(region.id)}
                          style={{ left: `${region.x}%`, top: `${region.y}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center shadow-xl backdrop-blur-[2px] ${
                            formData.regions.includes(region.id)
                              ? 'bg-primary/90 border-white scale-110 z-10'
                              : 'bg-primary/10 border-primary/40 hover:bg-primary/20 hover:border-primary hover:scale-110'
                          }`}
                        >
                          {formData.regions.includes(region.id) ? (
                            <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
                          ) : (
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/60" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Zoom Controls (Visual) */}
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col gap-2 md:gap-3">
                      <button className="w-10 h-10 md:w-12 md:h-12 bg-white border border-border rounded-xl md:rounded-2xl flex items-center justify-center text-dark/30 hover:text-secondary hover:shadow-xl transition-all">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                      </button>
                      <button className="w-10 h-10 md:w-12 md:h-12 bg-white border border-border rounded-xl md:rounded-2xl flex items-center justify-center text-dark/30 hover:text-secondary hover:shadow-xl transition-all">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-border shadow-lg flex items-center gap-2 md:gap-3">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[8px] md:text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Interaktive Karte aktiv</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar: Selected Regions - Second on mobile, Left on desktop */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="flex flex-col h-full">
                  <h3 className="text-[10px] font-black text-dark/40 uppercase tracking-[0.2em] mb-6">Ausgewählte Regionen</h3>
                  
                  <div className="space-y-3 mb-8">
                    {formData.regions.map(regionId => {
                      const region = REGIONS.find(r => r.id === regionId);
                      return (
                        <motion.div 
                          key={regionId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-4 bg-white border border-primary/30 rounded-2xl shadow-sm group hover:border-primary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                              <User className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-secondary text-sm">{region?.label}</span>
                          </div>
                          <button 
                            onClick={() => handleRegionToggle(regionId)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-dark/20 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </motion.div>
                      );
                    })}

                    {formData.regions.length === 0 && (
                      <div className="p-8 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center bg-light/20">
                        <p className="text-xs font-bold text-dark/30">Noch keine Region ausgewählt</p>
                      </div>
                    )}

                    {formData.regions.length > 0 && formData.regions.length < 6 && (
                      <div className="p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center bg-light/10">
                        <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.15em]">Weitere Regionen hinzufügen</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto space-y-4">
                    <button 
                      onClick={() => setStep('details')} 
                      disabled={formData.regions.length === 0}
                      className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 group"
                    >
                      Bestätigen & Weiter 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => {setStep('intro'); setFormData(initialFormData);}}
                      className="w-full py-2 text-sm font-bold text-dark/40 hover:text-secondary transition-colors text-center"
                    >
                      Vorgang abbrechen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'details':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-black text-secondary mb-8 text-center">Schmerzcharakteristik</h2>
            
            <div className="space-y-10">
              {/* Duration */}
              <div className="card-base p-8">
                <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Seit wann bestehen die Beschwerden?
                </h3>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    placeholder="Dauer"
                    className="flex-1 px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/50"
                    value={formData.durationValue}
                    onChange={(e) => setFormData({...formData, durationValue: e.target.value})}
                  />
                  <select 
                    className="w-32 px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    value={formData.durationUnit}
                    onChange={(e) => setFormData({...formData, durationUnit: e.target.value as any})}
                  >
                    <option>Tage</option>
                    <option>Wochen</option>
                    <option>Monate</option>
                    <option>Jahre</option>
                  </select>
                </div>
              </div>

              {/* Intensity */}
              <div className="card-base p-8">
                <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  Wie stark ist der Schmerz? (1-10)
                </h3>
                <input 
                  type="range" min="1" max="10" step="1"
                  className="w-full h-2 bg-light rounded-lg appearance-none cursor-pointer accent-primary"
                  value={formData.intensity}
                  onChange={(e) => setFormData({...formData, intensity: parseInt(e.target.value)})}
                />
                <div className="flex justify-between mt-4 text-xs font-bold text-dark/40 uppercase tracking-widest">
                  <span>Kaum spürbar</span>
                  <span className="text-primary text-lg">{formData.intensity}</span>
                  <span>Unerträglich</span>
                </div>
              </div>

              {/* Character */}
              <div className="card-base p-8">
                <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Wie fühlt sich der Schmerz an?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {PAIN_CHARACTERS.map(char => (
                    <button
                      key={char}
                      onClick={() => handleCharacterToggle(char)}
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                        formData.character.includes(char)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-dark/60 border-border hover:border-primary/30'
                      }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep('location')} className="btn-outline flex-1">Zurück</button>
                <button 
                  onClick={() => setStep('history')} 
                  disabled={!formData.durationValue || formData.character.length === 0}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Weiter
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'history':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-black text-secondary mb-8 text-center">Medizinischer Verlauf</h2>
            
            <div className="space-y-8">
              <div className="card-base p-8">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  Verlauf der Beschwerden
                </h3>
                <p className="text-sm text-dark/50 mb-4">
                  Beschreiben Sie detailliert, wie die Schmerzen begonnen haben und wie sie sich im Zeitverlauf verändert haben (z.B. morgens schlimmer, Besserung durch Wärme).
                </p>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Ihr Text hier..."
                  value={formData.medicalCourse}
                  onChange={(e) => setFormData({...formData, medicalCourse: e.target.value})}
                />
              </div>

              <div className="card-base p-8">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Bisherige Behandlungen
                </h3>
                <p className="text-sm text-dark/50 mb-4">
                  Welche Therapien haben Sie bereits versucht? (z.B. Physiotherapie, Medikamente, Spritzen, Operationen). Waren diese erfolgreich?
                </p>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="z.B. 6x Physiotherapie vor 2 Monaten, Ibuprofen bei Bedarf..."
                  value={formData.previousTreatments}
                  onChange={(e) => setFormData({...formData, previousTreatments: e.target.value})}
                />
              </div>

              <div className="card-base p-8">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Vorerkrankungen
                </h3>
                <textarea 
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="z.B. Bandscheibenvorfall 2018, Diabetes..."
                  value={formData.preExistingConditions}
                  onChange={(e) => setFormData({...formData, preExistingConditions: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep('details')} className="btn-outline flex-1">Zurück</button>
                <button 
                  onClick={() => setStep('functional')} 
                  disabled={!formData.medicalCourse}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Weiter
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'functional':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-black text-secondary mb-8 text-center">Funktionstest & Symptome</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-primary">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary">Bewegungstests</h3>
                </div>

                {formData.functionalTests.map((test, i) => (
                  <div key={i} className="card-base p-6 bg-white">
                    <p className="font-bold text-secondary mb-6">{test.question}</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleFunctionalAnswer(i, 'ja')}
                        className={`flex-1 py-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                          test.answer === 'ja' ? 'bg-primary text-white border-primary' : 'bg-white text-dark/60 border-border'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" /> Ja
                      </button>
                      <button 
                        onClick={() => handleFunctionalAnswer(i, 'nein')}
                        className={`flex-1 py-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                          test.answer === 'nein' ? 'bg-secondary text-white border-secondary' : 'bg-white text-dark/60 border-border'
                        }`}
                      >
                        <AlertTriangle className="w-5 h-5" /> Nein
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary">Zusätzliche Warnzeichen</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {RED_FLAGS.map(flag => (
                    <button
                      key={flag.id}
                      onClick={() => handleRedFlagToggle(flag.id)}
                      className={`p-6 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                        formData.redFlags.includes(flag.id)
                          ? 'bg-red-50 border-red-200 ring-2 ring-red-500/20'
                          : 'bg-white border-border hover:border-red-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.redFlags.includes(flag.id) ? 'bg-red-500 text-white' : 'bg-light text-dark/40'
                      }`}>
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">{flag.label}</h4>
                        <p className="text-xs text-dark/50">{flag.desc}</p>
                      </div>
                      <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.redFlags.includes(flag.id) ? 'bg-red-500 border-red-500' : 'border-border'
                      }`}>
                        {formData.redFlags.includes(flag.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-mint/20 rounded-2xl flex gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-dark/70 leading-relaxed">
                    Ihre Angaben helfen unserer KI, potenzielle Kontraindikationen auszuschließen und Ihren Therapieplan sicher zu gestalten.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-12 max-w-md mx-auto">
              <button onClick={() => setStep('history')} className="btn-outline flex-1">Zurück</button>
                <button 
                  onClick={() => setStep('summary')} 
                  className="btn-primary flex-1"
                >
                  Weiter zur Zusammenfassung <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </div>
          </motion.div>
        );

      case 'summary':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-black text-secondary mb-8 text-center">Zusammenfassung Ihrer Angaben</h2>
            
            <div className="space-y-6">
              <div className="card-base p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Betroffene Regionen</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.regions.map(r => (
                      <span key={r} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                        {REGIONS.find(reg => reg.id === r)?.label || r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Dauer</h4>
                    <p className="font-bold text-secondary">{formData.durationValue} {formData.durationUnit}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Intensität</h4>
                    <p className="font-bold text-secondary">{formData.intensity}/10</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Schmerzcharakter</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.character.map(c => (
                      <span key={c} className="px-3 py-1 bg-secondary/5 text-secondary rounded-full text-xs font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {formData.redFlags.length > 0 && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">Warnsignale</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.redFlags.map(f => (
                        <span key={f} className="text-xs font-bold text-red-800">
                          • {RED_FLAGS.find(rf => rf.id === f)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep('functional')} className="btn-outline flex-1">Zurück</button>
                <button 
                  onClick={handleCheck} 
                  className="btn-primary flex-1"
                >
                  Analyse starten <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'analysis':
        return (
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-[3rem] border border-border shadow-xl"
                >
                  <div className="relative w-32 h-32 mb-12">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute inset-4 rounded-full border-4 border-primary/10 border-b-primary animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="w-12 h-12 text-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-secondary mb-4">KI analysiert Ihre Daten...</h3>
                  <p className="text-dark/60 max-w-sm">
                    Wir gleichen Ihre Angaben mit medizinischen Datenbanken ab, um Ihnen eine fundierte Einschätzung zu geben.
                  </p>
                </motion.div>
              ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 bg-red-50 border border-red-100 rounded-[3rem] text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-black text-red-900 mb-4">Ein Fehler ist aufgetreten</h3>
                  <p className="text-red-800 mb-8 text-lg">{error}</p>
                  <button 
                    onClick={handleCheck}
                    className="btn-primary bg-red-600 hover:bg-red-700 border-none px-10"
                  >
                    Erneut versuchen
                  </button>
                </motion.div>
              ) : result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3rem] border border-border shadow-2xl overflow-hidden"
                >
                  <div className="bg-secondary p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">Ihre Analyse</h3>
                        <p className="text-sm text-blue-tint/60">Basierend auf Ihren detaillierten Angaben</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {setStep('intro'); setFormData(initialFormData); setResult(null);}}
                      className="btn-outline border-white/20 text-white hover:bg-white/10"
                    >
                      Neuer Check
                    </button>
                  </div>
                  
                  <div className="p-10 prose prose-slate max-w-none">
                    <div className="space-y-8 text-dark/80 leading-relaxed">
                      {result.split('\n').map((line, i) => {
                        if (line.startsWith('**')) {
                          return <h4 key={i} className="text-xl font-black text-secondary mt-10 mb-4 border-l-4 border-primary pl-4">{line.replace(/\*\*/g, '')}</h4>;
                        }
                        if (line.trim().startsWith('-')) {
                          return (
                            <div key={i} className="flex gap-4 items-start ml-4 bg-light/50 p-4 rounded-xl">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                              <p className="m-0 font-medium">{line.replace('-', '').trim()}</p>
                            </div>
                          );
                        }
                        return <p key={i} className="m-0 text-lg">{line}</p>;
                      })}
                    </div>

                    <div className="mt-16 pt-10 border-t border-border">
                      <div className="bg-secondary rounded-[2rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                          <h4 className="text-2xl font-black mb-4 text-white">Wie geht es weiter?</h4>
                          <p className="text-blue-tint/80 mb-8 text-lg">
                            Diese Analyse ist der erste Schritt. Unsere Experten in Freiburg helfen Ihnen gerne persönlich weiter, um einen individuellen Therapieplan zu erstellen.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/termin/" className="btn-primary flex-1 text-lg py-4">
                              Termin in Freiburg buchen
                            </a>
                            <a href="/kontakt/" className="btn-outline border-white/20 text-white hover:bg-white/10 flex-1 text-lg py-4">
                              Rückruf anfordern
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-light pt-24 pb-16">
      <SEO 
        title="KI Symptomcheck | MOVIN Physiotherapie Freiburg"
        description="Nutze unseren detaillierten KI-gestützten Anamnesebogen für eine professionelle Einschätzung deiner Beschwerden."
      />

      <div className="container-custom">
        {renderProgress()}

        {renderStep()}

        {/* Disclaimer Footer */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-medium">
            <AlertTriangle className="w-4 h-4" />
            Keine ärztliche Diagnose • Im Notfall 112 wählen
          </div>
        </div>
      </div>
    </div>
  );
}
