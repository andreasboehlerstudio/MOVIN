import { useParams, Link, Navigate } from 'react-router';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { standorteData, Standort } from '../data/standorte';
import { GdprEmbed } from '../components/gdpr/GdprEmbed';

export default function StandortPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !standorteData[slug]) {
    return <Navigate to="/" replace />;
  }

  const standort: Standort = standorteData[slug];

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": `MOVIN Physiotherapie ${standort.name}`,
    "image": standort.image,
    "@id": `https://movin-freiburg.de/standorte/${slug}/`,
    "url": `https://movin-freiburg.de/standorte/${slug}/`,
    "telephone": standort.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": standort.address.split(',')[0],
      "addressLocality": standort.address.split(',')[1].trim().split(' ')[1],
      "postalCode": standort.address.split(',')[1].trim().split(' ')[0],
      "addressCountry": "DE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ]
  };

  return (
    <>
      <SEO 
        title={standort.seoTitle.split(' | ')[0]}
        description={standort.seoDesc}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={standort.image} 
            alt={`Praxis ${standort.name}`} 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16">
          <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <MapPin className="w-4 h-4" /> Standort
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">Physiotherapie {standort.name}</h1>
          <p className="text-xl text-blue-tint/90 max-w-2xl">
            {standort.description.split('.')[0]}.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col: Info */}
            <div className="lg:col-span-7 flex flex-col gap-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">Willkommen in {standort.name}</h2>
                <p className="text-lg text-dark/80 leading-relaxed mb-8">
                  {standort.description}
                </p>
                
                <h3 className="text-xl font-bold text-secondary mb-4">Was dich erwartet:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {standort.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark/70">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {standort.gallery && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary mb-8">Einblicke in unsere Praxis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {standort.gallery.map((img, i) => (
                      <div key={i} className={`relative overflow-hidden rounded-2xl shadow-lg ${i === 0 ? 'sm:col-span-2 h-80' : 'h-60'}`}>
                        <img 
                          src={img} 
                          alt={`${standort.name} Impression ${i + 1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Preview */}
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8">Dein Team vor Ort</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-light overflow-hidden mb-4 border-2 border-primary/20">
                        <img src={`https://i.pravatar.cc/150?img=${i+20}`} alt="Therapeut" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-secondary">Therapeut {i}</h4>
                      <p className="text-sm text-dark/60">Physiotherapeut</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Contact Card */}
            <div className="lg:col-span-5">
              <div className="card-base p-8 sticky top-32 border-t-4 border-t-primary shadow-2xl">
                <h3 className="text-2xl font-bold text-secondary mb-8">Kontakt & Termin</h3>
                
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Adresse</h4>
                      <p className="text-dark/70">{standort.address.split(',')[0]}<br/>{standort.address.split(',')[1]}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Telefon</h4>
                      <a href={`tel:${standort.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{standort.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">E-Mail</h4>
                      <a href={`mailto:${standort.email}`} className="text-primary hover:underline">{standort.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-secondary mb-2">Öffnungszeiten</h4>
                      {standort.openingHours ? (
                        <div className="flex flex-col gap-4">
                          {standort.openingHours.map((section, idx) => (
                            <div key={idx}>
                              <h5 className="font-semibold text-secondary text-sm mb-1">{section.title}</h5>
                              <table className="text-sm text-dark/70 w-full">
                                <tbody>
                                  {section.hours.map((h, hIdx) => (
                                    <tr key={hIdx}>
                                      <td className="py-0.5 pr-4 align-top font-medium">{h.days}</td>
                                      <td className="py-0.5 align-top">{h.range}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <table className="text-sm text-dark/70 w-full">
                          <tbody>
                            <tr><td className="py-1 pr-4">Mo - Fr</td><td className="py-1">08:00 - 19:00 Uhr</td></tr>
                            <tr><td className="py-1 pr-4">Samstag</td><td className="py-1">Nach Vereinbarung</td></tr>
                            <tr><td className="py-1 pr-4">Sonntag</td><td className="py-1">Geschlossen</td></tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>

                <Link to="/termin/" className="btn-cta-cheetah w-full justify-center text-lg py-4 rounded-full shadow-lg">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Termin online buchen
                  </span>
                </Link>
                <p className="text-center text-sm text-dark/50 mt-4">48h Termingarantie für Neupatienten</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] w-full bg-light relative">
        <GdprEmbed category="marketing" provider="Google Maps">
          <iframe 
            src={standort.mapUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={`Google Maps MOVIN ${standort.name}`}
            className="absolute inset-0"
          ></iframe>
        </GdprEmbed>
      </section>
    </>
  );
}
