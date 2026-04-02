import { Link } from 'react-router-dom';
import { Dumbbell, Target, Activity, CheckCircle2 } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';

export default function Training() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Medizinisches Training bei MOVIN",
    "description": "Medizinische Trainingstherapie (MTT) und Krankengymnastik am Gerät (KGG) in Freiburg. Individuelle Trainingspläne für nachhaltige Gesundheit.",
    "url": "https://movin-freiburg.de/training/"
  };

  return (
    <>
      <SEO 
        title="Medizinisches Training | MTT & KGG Freiburg | MOVIN"
        description="Medizinische Trainingstherapie (MTT) und Krankengymnastik am Gerät (KGG) in Freiburg. Individuelle Trainingspläne für nachhaltige Gesundheit. Jetzt informieren!"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
            alt="Patient beim medizinischen Training" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Dumbbell className="w-4 h-4" /> Aktiv werden
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">Medizinisches Training</h1>
          <p className="text-xl text-blue-tint/90">
            Von der Rehabilitation zur Prävention. Wir machen dich fit für den Alltag und den Sport.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Hilfe zur Selbsthilfe</h2>
            <p className="text-lg text-dark/80 leading-relaxed">
              Passive Behandlungen lindern akute Beschwerden. Aktives Training sorgt für nachhaltige Gesundheit. In unseren modern ausgestatteten Trainingsbereichen bieten wir dir die Möglichkeit, unter therapeutischer Anleitung an deinen Zielen zu arbeiten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-base p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Krankengymnastik am Gerät (KGG)</h3>
              <p className="text-dark/80 mb-6">
                KGG ist eine aktive Trainingstherapie, die von deinem Arzt verschrieben werden kann. Unter Anleitung unserer Therapeuten trainierst du an medizinischen Geräten, um Muskulatur aufzubauen und die Funktion deines Bewegungsapparates wiederherzustellen.
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm text-dark/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Auf Rezept (Kasse & Privat)</li>
                <li className="flex items-center gap-2 text-sm text-dark/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Kleingruppen (max. 3 Personen)</li>
                <li className="flex items-center gap-2 text-sm text-dark/70"><CheckCircle2 className="w-4 h-4 text-primary" /> 60 Minuten pro Einheit</li>
              </ul>
            </div>

            <div className="card-base p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Medizinische Trainingstherapie (MTT)</h3>
              <p className="text-dark/80 mb-6">
                Die MTT ist ideal für die Zeit nach der Rehabilitation oder als präventives Training. Wir erstellen dir einen individuellen Trainingsplan, den du selbstständig in unseren Räumlichkeiten umsetzt. Ein Therapeut ist bei Fragen immer ansprechbar.
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm text-dark/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Selbstzahlerleistung / Abos</li>
                <li className="flex items-center gap-2 text-sm text-dark/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Individueller Trainingsplan</li>
                <li className="flex items-center gap-2 text-sm text-dark/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Flexible Trainingszeiten</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="section-padding bg-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-secondary mb-12">Unsere Trainingspartner</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {/* Replace with actual logos */}
            <div className="text-2xl font-bold text-dark">Urban Sports Club</div>
            <div className="text-2xl font-bold text-dark">Hansefit</div>
            <div className="text-2xl font-bold text-dark">Wellhub</div>
          </div>
          <p className="mt-8 text-dark/70">
            Du bist Mitglied bei einem unserer Partner? Dann kannst du unser freies Training (MTT) im Rahmen deiner Mitgliedschaft nutzen.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="h-12 w-auto" variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Starte jetzt dein Training</h2>
          <p className="text-white/90 text-lg mb-10">
            Egal ob mit Rezept oder als Selbstzahler – wir finden das passende Trainingskonzept für dich.
          </p>
          <Link to="/termin/" className="btn-secondary text-lg px-8 py-4">
            Beratungstermin vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
