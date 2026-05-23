import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot, Calendar, ArrowLeft, MessageCircle, MapPin, Sparkles, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isInteractive?: boolean;
}

interface QuestionOption {
  id: string;
  text: string;
  answer: string;
}

interface Topic {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  questions: QuestionOption[];
}

const TOPICS: Topic[] = [
  {
    id: 'termine',
    title: 'Termine & Organisation',
    icon: Calendar,
    color: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 't1',
        text: 'Wie funktioniert die 48h-Termingarantie?',
        answer: 'Für akute Fälle (z.B. Hexenschuss, frische Sportverletzungen oder direkt nach einer Operation) haben wir an unseren Standortern spezielle Akut-Slots reserviert. Wenn du als Neupatient mit dringendem Bedarf zu uns kommst, garantieren wir dir einen Behandlungstermin innerhalb von 48 Stunden.\n\nBitte melde dich dafür am besten telefonisch bei uns oder reiche dein Rezept direkt online mit dem Hinweis „Akutfall“ ein.'
      },
      {
        id: 't2',
        text: 'Bis wann muss ich einen Termin absagen unter 24h?',
        answer: 'Wir arbeiten nach einem reinen Bestellsystem, um dir lange Wartezeiten zu ersparen und volle Behandlungszeit zu garantieren. Solltest du einen Termin nicht wahrnehmen können, sage diesen bitte mindestens 24 Stunden vorher ab.\n\nDies geht telefonisch, per E-Mail oder ganz unkompliziert direkt im Chat unserer MOVIN App. Nicht oder zu spät abgesagte Termine müssen wir andernfalls leider privat als Ausfallgebühr in Rechnung stellen.'
      },
      {
        id: 't3',
        text: 'Was muss ich zum ersten Termin mitbringen?',
        answer: 'Für deinen ersten Termin bei MOVIN bringst du bitte Folgendes mit:\n\n1. Deine ärztliche Verordnung (Rezept)\n2. Deine Krankenkassenkarte\n3. Eventuell relevante medizinische Berichte, OP-Berichte oder MRT-Bilder\n4. Ein großes Liegetuch oder Sportkleidung\n\nDu kannst Zeit sparen, indem du unseren Anamnesebogen bereits vorab bequem digital von zu Hause ausfüllst!'
      },
      {
        id: 't4',
        text: 'Wie stimme ich am besten Folgetermine ab?',
        answer: 'Um therapeutische Kontinuität und somit den besten Heilungserfolg zu garantieren, vereinbaren wir bevorzugt schon beim ersten Termin die gesamte Behandlungsserie.\n\nDu kannst deine Termine direkt vor Ort am Empfang, digital über unsere App im Chat mit unserem Team oder per Telefon reservieren.'
      }
    ]
  },
  {
    id: 'praxen',
    title: 'Therapien & Standorte',
    icon: MapPin,
    color: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'p1',
        text: 'Wo finde ich die MOVIN Praxen?',
        answer: 'Wir sind an drei hochmodernen Standorten für dich da:\n\n📍 Freiburg Lorettoberg (Mercystraße) - Direkt neben der Klinik am Lorettoberg.\n📍 Freiburg Herdern (Hauptstraße) - Im Herzen von Herdern.\n📍 Rust beim Europa-Park - Perfekt erreichbar mit ausreichend Parkplätzen.\n\nAlle unsere Praxen sind voll klimatisiert, barrierefrei und verfügen über modernste Trainings- und Therapieräume.'
      },
      {
        id: 'p2',
        text: 'Welche Leistungen bietet ihr an?',
        answer: 'Unsere Praxen bieten ein breites Spektrum an:\n\n• Klassische Physiotherapie / Krankengymnastik (KG)\n• Manuelle Therapie (MT) & Lymphdrainage (MLD)\n• Krankengymnastik am Gerät (KGG)\n• Sportphysiotherapie & Rehabilitatives Training (z.B. T-RENA)\n• Massagen & Wellness-Therapien\n\nKombiniert wird dies bei uns immer mit unserem digitalen Therapie-Ansatz!'
      },
      {
        id: 'p3',
        text: 'Bietet ihr medizinisches Gerätetraining an?',
        answer: 'Ja! An all unseren Standorten bieten wir medizinische Trainingstherapie an modernsten cloud-vernetzten Geräten an. Dies kann über ein KGG-Rezept deines Arztes, im Rahmen einer Reha-Nachsorge (T-RENA) oder über private Monatsabos genutzt werden.\n\nUnsere Therapeuten erstellen deinen individuellen Trainingsplan direkt in der MOVIN App.'
      }
    ]
  },
  {
    id: 'app',
    title: 'MOVIN App & Digitales',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'a1',
        text: 'Was kann die MOVIN App eigentlich?',
        answer: 'Die MOVIN App ist dein digitaler Therapiebegleiter für die Hosentasche:\n\n• Termine rund um die Uhr verwalten, buchen & verschieben\n• Rezepte unkompliziert per Webcam/Kamera hochladen und prüfen lassen\n• Individuelle Video-Trainingsprogramme für zu Hause\n• Direkt-Chat mit deinem Therapeuten bei Fragen\n• Integrierte Schmerz- und Fortschrittsmessung'
      },
      {
        id: 'a2',
        text: 'Wie erhalte ich die Zugangsdaten zur App?',
        answer: 'Nach deiner ersten Anmeldung oder Rezeptprüfung bei uns schalten wir dein Profil frei. Du erhältst deine persönlichen Zugangsdaten ganz unkompliziert per E-Mail oder direkt von deinem Therapeuten beim ersten Termin vor Ort in der Praxis.'
      },
      {
        id: 'a3',
        text: 'Wie funktioniert das Rezept-Hochladen?',
        answer: 'Ganz einfach: Klicke in der App (oder auf unserer Website) auf "Rezept einreichen". Fotografiere dein Rezept mit dem Smartphone. Unser Patientenservice prüft das Rezept sofort auf Richtigkeit, klärt die Zuweisung und schickt dir direkt freie Terminvorschläge passend zu deinen Wunschzeiten!'
      }
    ]
  },
  {
    id: 'kosten',
    title: 'Rezepte & Kosten',
    icon: FileText,
    color: 'from-purple-500 to-pink-600',
    questions: [
      {
        id: 'k1',
        text: 'Muss ich eine Zuzahlung leisten?',
        answer: 'Gesetzlich Versicherte sind verpflichtet, eine gesetzliche Zuzahlung pro Rezept zu leisten (es sei denn, es liegt eine Befreiungsbescheinigung vor). Diese setzt sich aus 10,00 € Gebühr pro Verordnung plus 10 % des Behandlungswertes zusammen. Diese Gebühr ziehen wir im Namen der Krankenkasse beim ersten Termin ein.'
      },
      {
        id: 'k2',
        text: 'Behandelt ihr auch Privatversicherte?',
        answer: 'Selbstverständlich! Wir behandeln gesetzlich Versicherte aller Kassen, Privatversicherte sowie Beihilfeberechtigte und Selbstzahler.\n\nPrivatpatienten erhalten nach Abschluss der Behandlungsserie eine detaillierte Rechnung zur Einreichung bei der privaten Krankenversicherung oder Beihilfestelle.'
      },
      {
        id: 'k3',
        text: 'Gerätetraining auf Rezept (KGG)?',
        answer: 'Ja, Krankengymnastik am Gerät (KGG) ist eine standardisierte Heilmittelverordnung, die von Hausärzten, Orthopäden oder Chirurgen ausgestellt werden kann. Sie beinhaltet meist 6 Einheiten à 60 Minuten Gerätetraining unter ständiger therapeutischer Aufsicht.'
      }
    ]
  }
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hallo! Willkommen beim MOVIN Informations-Assistenten. 🌟\n\nIch liefere dir blitzschnell und datenschutzkonform alle Antworten zu unseren Praxen, Leistungen und Abläufen. Wähle einfach ein Thema aus:',
      isInteractive: true
    }
  ]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, selectedTopic]);

  const selectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const selectQuestion = (q: QuestionOption) => {
    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: q.text
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate short human-like reading delay with easing
    setTimeout(() => {
      setIsTyping(false);
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: q.answer
      };
      setMessages(prev => [...prev, modelMsg]);
    }, 750);
  };

  const resetToMainTopics = () => {
    setSelectedTopic(null);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome_again',
        role: 'model',
        text: 'Brauchst du weitere Informationen? Wähle einfach eine Kategorie oder eine Frage aus:',
        isInteractive: true
      }
    ]);
    setSelectedTopic(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-24 z-50 flex flex-col gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group"
          aria-label="FAQ Hilfe öffnen"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          {/* Subtle Tooltip */}
          <span className="absolute right-16 bg-[#0a0f4d] text-white text-xs px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
            Fragen? Hilfe hier!
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[420px] h-[580px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B4DFBB] to-[#00b2ba] p-1 px-1">
              <div className="bg-[#0a0f4d] text-white p-4 px-5 rounded-t-[1.4rem] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B4DFBB] to-[#00b2ba] flex items-center justify-center text-[#0a0f4d] shadow-sm">
                    <Bot className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm tracking-tight">MOVIN Info-Guide</h3>
                    <p className="text-[10px] text-[#B4DFBB] font-medium uppercase tracking-wider">Blitzschnelle Antworten</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-white/85 hover:text-white transition-colors text-xs font-semibold mr-1"
                    title="Chat zurücksetzen"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Body & Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#00b2ba] text-white rounded-tr-sm font-medium shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-[#0a0f4d] dark:text-slate-100 shadow-md border border-slate-100 dark:border-slate-800 rounded-tl-sm text-sm leading-relaxed'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Simulator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-slate-800 text-slate-500 shadow-md border border-slate-100 dark:border-slate-800 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00b2ba] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#00b2ba] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#00b2ba] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 ml-1">Lese Antwort vor...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Interactive Selection Panel */}
            <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 shrink-0 flex flex-col gap-3">
              <AnimatePresence mode="wait">
                {!selectedTopic ? (
                  /* Topics Overviews */
                  <motion.div
                    key="topics-grid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2.5"
                  >
                    <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-1">
                      Themenbereiche auswählen
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {TOPICS.map((topic) => {
                        const IconComponent = topic.icon;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => selectTopic(topic)}
                            className="flex flex-col items-start p-3 text-left rounded-2xl border border-slate-150 dark:border-slate-800 bg-slate-50/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 group"
                          >
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${topic.color} flex items-center justify-center text-white mb-2 shadow-sm`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs text-[#0a0f4d] dark:text-white line-clamp-1 group-hover:text-[#00b2ba] transition-colors">
                              {topic.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  /* Questions options in selected Topic */
                  <motion.div
                    key="questions-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center justify-between px-1">
                      <button
                        onClick={resetToMainTopics}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#00b2ba] hover:underline"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Zurück zu Themen
                      </button>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary-hover uppercase tracking-wider">
                        {selectedTopic.title}
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {selectedTopic.questions.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => selectQuestion(q)}
                          className="w-full flex items-center justify-between text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-[#00b2ba]/50 hover:bg-[#00b2ba]/5 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 group"
                        >
                          <span className="line-clamp-1 pr-2 group-hover:text-primary-hover">{q.text}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fast-access Bottom Action Elements */}
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 w-full" />
              <div className="flex items-center justify-between gap-2 pt-1">
                <p className="text-[10px] text-slate-400 font-medium">
                  Keine Tokens, 100% datenschutzkonform
                </p>
                <Link
                  to="/termin/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-[#B4DFBB] to-[#00b2ba] text-[#0a0f4d] font-bold text-xs px-4 py-2 rounded-full hover:opacity-95 transition-opacity shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" /> Termin buchen
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
