import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';

export default function GenericPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageName = pathParts[pathParts.length - 1] || 'Seite';
  const formattedName = pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>
      <SEO 
        title={`${formattedName} | MOVIN Physiotherapie Freiburg`}
        description={`Informationen zu ${formattedName} bei MOVIN Physiotherapie in Freiburg und Rust.`}
      />

      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gradient-teal-mint">{formattedName}</h1>
          <p className="text-xl text-dark/80 leading-relaxed mb-8">
            Diese Seite befindet sich aktuell im Aufbau.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="btn-primary">Zur Startseite</Link>
            <Link to="/kontakt/" className="btn-outline">Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white min-h-[40vh]">
        <div className="container-custom text-center">
          <p className="text-dark/60">
            Wir arbeiten daran, dir hier bald ausführliche Informationen zu <strong>{formattedName}</strong> zur Verfügung zu stellen.
          </p>
        </div>
      </section>
    </>
  );
}
