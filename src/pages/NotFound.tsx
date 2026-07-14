import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/seo/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Seite nicht gefunden"
        description="Die aufgerufene Seite konnte nicht gefunden werden. Zurück zur MOVIN Startseite oder direkt Kontakt aufnehmen."
        canonical="https://movin-freiburg.de/404.html"
        noindex
      />

      <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-[#f4f8f9] py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#a9dfc0] via-[#11b7bd] to-[#183b78]" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#148f9b]">Fehler 404</p>
            <h1 className="mb-6 text-4xl font-black leading-tight text-primary md:text-6xl">
              Diese Seite wurde nicht gefunden.
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-dark/75 md:text-xl">
              Vielleicht wurde die Adresse geändert oder der Link ist nicht mehr aktuell. Über die Startseite oder den Kontakt finden Sie schnell weiter.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                Zur Startseite
              </Link>
              <Link to="/kontakt/" className="btn-outline inline-flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" aria-hidden="true" />
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 bottom-[-7rem] select-none text-[18rem] font-black leading-none text-[#11b7bd]/[0.07] md:right-8 md:text-[28rem]" aria-hidden="true">
          404
        </div>
      </section>
    </>
  );
}
