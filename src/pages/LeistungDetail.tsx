import { useParams, Link, Navigate } from 'react-router';
import { Activity, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { leistungenData } from '../data/leistungen';

export default function LeistungDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !leistungenData[slug as keyof typeof leistungenData]) {
    return <Navigate to="/leistungen/" replace />;
  }

  const leistung = leistungenData[slug as keyof typeof leistungenData] as any;
  const baseUrl = 'https://movin-freiburg.de';
  const canonicalUrl = `${baseUrl}/leistungen/${slug}/`;
  const absoluteUrl = (url: string) => url.startsWith('http') ? url : `${baseUrl}${url}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      "name": leistung.title,
      "serviceType": leistung.title,
      "description": leistung.seoDesc,
      "url": canonicalUrl,
      "image": absoluteUrl(leistung.heroImage),
      "provider": {
        "@type": "MedicalBusiness",
        "name": "MOVIN Physiotherapie",
        "url": baseUrl,
        "telephone": "+49 761 707 33 66",
        "medicalSpecialty": "Physiotherapie",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mercystrasse 14",
          "postalCode": "79100",
          "addressLocality": "Freiburg im Breisgau",
          "addressRegion": "Baden-Württemberg",
          "addressCountry": "DE"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Freiburg im Breisgau" },
        { "@type": "City", "name": "Rust" },
        { "@type": "AdministrativeArea", "name": "Breisgau-Hochschwarzwald" },
        { "@type": "AdministrativeArea", "name": "Ortenaukreis" }
      ],
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": canonicalUrl,
        "servicePhone": "+49 761 707 33 66"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
          "item": `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Leistungen",
          "item": `${baseUrl}/leistungen/`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": leistung.title,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title={leistung.seoTitle.split(' | ')[0]}
        description={leistung.seoDesc}
        canonical={canonicalUrl}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={leistung.heroImage} 
            alt={leistung.title} 
            className="w-full h-full object-cover opacity-[0.48]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-secondary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/35 to-transparent" />
        </div>
        {leistung.heroImageCaption && (
          <div className="absolute right-4 bottom-4 z-10 rounded-full bg-secondary/60 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm border border-white/10">
            {leistung.heroImageCaption}
          </div>
        )}
        
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
                
                <h3 className="text-2xl font-bold text-secondary mb-6">Ihre Vorteile bei MOVIN</h3>
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
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  {leistung.isB2B ? 'Angebot für Ihr Unternehmen' : 'Bereit für den nächsten Schritt?'}
                </h3>
                <p className="text-dark/70 mb-8">
                  {leistung.isB2B 
                    ? 'Investieren Sie in die Gesundheit Ihrer Mitarbeiter. Kontaktieren Sie uns für ein unverbindliches Erstgespräch.'
                    : `Lassen Sie uns gemeinsam an Ihrer Gesundheit arbeiten. Buchen Sie jetzt Ihren Termin für ${leistung.title} bei MOVIN.`}
                </p>
                <Link 
                  to={leistung.isB2B ? "/kontakt/" : "/termin/"} 
                  className="btn-cta-cheetah w-full justify-center text-lg py-4 rounded-full shadow-lg mb-4"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {leistung.isB2B ? (
                      <>
                        <ArrowRight className="w-5 h-5 mr-2" />
                        Angebot anfragen
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 mr-2" />
                        Termin buchen
                      </>
                    )}
                  </span>
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
