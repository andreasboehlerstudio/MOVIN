import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';

export default function Impressum() {
  return (
    <>
      <SEO 
        title="Impressum | MOVIN Physiotherapie"
        description="Impressum der MOVIN (Therapiezentrum Lorettoberg GmbH) in Freiburg."
      />

      <section className="pt-32 pb-20 bg-light min-h-[60vh]">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-12 text-gradient-teal-mint">Impressum</h1>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="mb-4">
              <strong>Therapiezentrum Lorettoberg GmbH</strong><br />
              Mercystraße 14<br />
              79100 Freiburg im Breisgau
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Vertreten durch</h2>
            <p className="mb-4">
              Geschäftsführer: [Name des Geschäftsführers]
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Kontakt</h2>
            <p className="mb-4">
              Telefon: +49 761 707 33 66<br />
              E-Mail: info@movin-freiburg.de
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Registereintrag</h2>
            <p className="mb-4">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Freiburg<br />
              Registernummer: HRB [Nummer]
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Umsatzsteuer-ID</h2>
            <p className="mb-4">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE [Nummer]
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="mb-4">
              [Name des Verantwortlichen]<br />
              Mercystraße 14<br />
              79100 Freiburg im Breisgau
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Streitschlichtung</h2>
            <p className="mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mb-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
