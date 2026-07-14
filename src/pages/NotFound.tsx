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

      <section className="relative isolate flex min-h-[76svh] items-center overflow-hidden bg-gradient-to-br from-[#08b7bf] via-[#62d3c8] to-[#b2ead6] py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(10,15,77,0.10)_0%,transparent_42%,rgba(255,255,255,0.16)_100%)]" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <img
              src="/images/logos/movin-logo-2026-horizontal-rgb-gradient.png"
              alt="MOVIN – innovativ bewegt"
              className="mb-12 h-auto w-[min(280px,72vw)]"
            />
            <p className="mb-5 font-heading text-sm font-bold uppercase text-secondary/70">Fehler 404</p>
            <h1 className="mb-6 font-heading text-4xl font-black leading-tight text-secondary md:text-6xl">
              Diese Seite wurde nicht gefunden.
            </h1>
            <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-secondary/80 md:text-xl">
              Vielleicht wurde die Adresse geändert oder der Link ist nicht mehr aktuell. Über die Startseite oder den Kontakt finden Sie schnell weiter.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-secondary px-8 py-3.5 font-heading text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#151b63] hover:shadow-xl">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                Zur Startseite
              </Link>
              <Link to="/kontakt/" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-secondary bg-white/25 px-8 py-3.5 font-heading text-base font-bold text-secondary backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/55">
                <Mail className="h-5 w-5" aria-hidden="true" />
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 bottom-[-6rem] select-none font-heading text-[18rem] font-black leading-none text-secondary/[0.08] md:right-8 md:text-[28rem]" aria-hidden="true">
          404
        </div>
      </section>
    </>
  );
}
