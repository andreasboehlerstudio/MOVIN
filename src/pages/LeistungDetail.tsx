import { useParams, Link, Navigate } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { leistungenData } from '../data/leistungen';

export default function LeistungDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !leistungenData[slug as keyof typeof leistungenData]) {
    return <Navigate to="/leistungen/" replace />;
  }

  const leistung = leistungenData[slug as keyof typeof leistungenData];

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": leistung.title,
    "description": leistung.seoDesc,
    "url": `https://movin-freiburg.de/leistungen/${slug}/`
  };

  return (
    <>
      <SEO 
        title={leistung.seoTitle.split(' | ')[0]}
        description={leistung.seoDesc}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={leistung.heroImage} 
            alt={leistung.title} 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16">
          <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Activity className="w-4 h-4" /> Leistung
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">{leistung.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col: Info */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">Was ist {leistung.title}?</h2>
                <p className="text-lg text-dark/80 leading-relaxed mb-8">
                  {leistung.description}
                </p>
                
                <h3 className="text-2xl font-bold text-secondary mb-6">Deine Vorteile bei MOVIN</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {leistung.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-dark/80 bg-light p-4 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col: Sidebar */}
            <div className="lg:col-span-4">
              <div className="card-base p-8 sticky top-32 border-t-4 border-t-primary shadow-2xl bg-light">
                <h3 className="text-2xl font-bold text-secondary mb-4">Bereit für den nächsten Schritt?</h3>
                <p className="text-dark/70 mb-8">
                  Lass uns gemeinsam an deiner Gesundheit arbeiten. Buche jetzt deinen Termin für {leistung.title} bei MOVIN.
                </p>
                <Link to="/termin/" className="btn-primary w-full justify-center text-lg py-4 shadow-lg shadow-primary/20 mb-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  Termin buchen
                </Link>
                <Link to="/leistungen/" className="flex items-center justify-center gap-2 text-primary font-medium hover:underline">
                  <ArrowRight className="w-4 h-4" /> Alle Leistungen ansehen
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
