import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Brauche ich ein Rezept für die Behandlung?",
      answer: "Ja, für physiotherapeutische Behandlungen, die über die gesetzliche oder private Krankenkasse abgerechnet werden sollen, benötigst du eine ärztliche Verordnung (Rezept). Als Selbstzahler oder Privatpatient mit Heilpraktiker-Zusatzversicherung kannst du auch ohne Rezept im Rahmen des sektoralen Heilpraktikers zu uns kommen."
    },
    {
      question: "Wie lange ist mein Rezept gültig?",
      answer: "Ein Rezept der gesetzlichen Krankenkasse muss innerhalb von 28 Tagen nach Ausstellungsdatum begonnen werden, es sei denn, der Arzt hat einen dringlichen Behandlungsbedarf (innerhalb von 14 Tagen) vermerkt."
    },
    {
      question: "Was muss ich zum ersten Termin mitbringen?",
      answer: "Bitte bringe dein Rezept, deine Versichertenkarte, ein großes Handtuch, bequeme (sportliche) Kleidung sowie eventuell vorhandene Arztberichte oder Röntgen-/MRT-Bilder mit."
    },
    {
      question: "Muss ich eine Zuzahlung leisten?",
      answer: "Gesetzlich Versicherte müssen (sofern sie nicht befreit sind) eine gesetzliche Zuzahlung leisten. Diese beträgt 10 Euro pro Rezept plus 10% der Behandlungskosten. Die Zuzahlung wird beim ersten Termin fällig."
    },
    {
      question: "Wie kann ich einen Termin absagen?",
      answer: "Termine müssen mindestens 24 Stunden vorher abgesagt werden (telefonisch, per E-Mail oder über die MOVIN App). Bei kurzfristigeren Absagen oder Nichterscheinen behalten wir uns vor, eine Ausfallgebühr in Rechnung zu stellen."
    },
    {
      question: "Wie funktioniert die 48h Termingarantie?",
      answer: "Für Neupatienten mit akuten Schmerzen garantieren wir einen Ersttermin innerhalb von 48 Stunden an einem unserer drei Standorte. Bitte rufe uns hierfür direkt an."
    },
    {
      question: "Bietet ihr auch Hausbesuche an?",
      answer: "Ja, wenn dein Arzt auf dem Rezept 'Hausbesuch' angekreuzt hat, kommen unsere Therapeuten auch zu dir nach Hause (im Einzugsgebiet unserer Praxen)."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="FAQ | Häufige Fragen zur Physiotherapie | MOVIN"
        description="Antworten auf deine Fragen rund um Physiotherapie, Rezepte, Zuzahlungen und Termine bei MOVIN in Freiburg und Rust."
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <HelpCircle className="w-4 h-4" /> FAQ
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gradient-teal-mint">Häufig gestellte Fragen</h1>
          <p className="text-xl text-dark/80 leading-relaxed">
            Hier findest du Antworten auf die wichtigsten Fragen rund um deinen Besuch bei uns.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`card-base transition-all duration-300 ${openIndex === index ? 'border-primary/50 shadow-md' : 'hover:border-border/80'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-bold text-secondary pr-8">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-dark/40 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-dark/80 leading-relaxed border-t border-border/50 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-light p-8 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-secondary mb-4">Deine Frage war nicht dabei?</h3>
            <p className="text-dark/70 mb-6">
              Kein Problem! Kontaktiere uns einfach direkt. Unser Team hilft dir gerne weiter.
            </p>
            <div className="flex justify-center gap-4">
              <a href="tel:+497617073366" className="btn-primary">Anrufen</a>
              <a href="mailto:info@movin-freiburg.de" className="btn-outline">E-Mail schreiben</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
