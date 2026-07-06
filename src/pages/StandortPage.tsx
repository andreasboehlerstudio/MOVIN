import { useParams, Link, Navigate } from 'react-router';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, ExternalLink, PlayCircle } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { standorteData, Standort } from '../data/standorte';
import { GdprEmbed } from '../components/gdpr/GdprEmbed';

export default function StandortPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !standorteData[slug]) {
    return <Navigate to="/" replace />;
  }

  const standort: Standort = standorteData[slug];
  const baseUrl = 'https://movin-freiburg.de';
  const canonicalUrl = `${baseUrl}/standorte/${slug}/`;
  const absoluteUrl = (url: string) => url.startsWith('http') ? url : `${baseUrl}${url}`;
  const [streetAddress, localityPart = ''] = standort.address.split(',').map(part => part.trim());
  const [postalCode = '', ...localityParts] = localityPart.split(/\s+/);
  const addressLocality = localityParts.join(' ') || localityPart;
  const openingHours = standort.openingHours?.flatMap(section =>
    section.hours.map(item => `${item.days}: ${item.range}`)
  );
  const getInitials = (name: string) => name
    .replace(/\([^)]*\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const getGalleryItemClass = (img: string, index: number) => {
    const isRustLocation = slug === 'physiotherapie-europa-park-rust';
    const isRustPortraitImage = isRustLocation && img.includes('/images/standorte/rust/rust-gallery-');

    if (isRustPortraitImage) {
      return 'h-[34rem] sm:h-[38rem] md:h-[42rem]';
    }

    if (isRustLocation && img.includes('/images/standorte/rust/')) {
      return 'sm:col-span-2 h-72 md:h-80';
    }

    return index === 0 ? 'sm:col-span-2 h-80' : 'h-60';
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${canonicalUrl}#location`,
      "name": `MOVIN Physiotherapie ${standort.name}`,
      "description": standort.seoDesc,
      "url": canonicalUrl,
      "image": [absoluteUrl(standort.image), ...(standort.gallery || []).map(absoluteUrl)],
      "telephone": standort.phone,
      "email": standort.email,
      "priceRange": "€€",
      "medicalSpecialty": "Physiotherapie",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": streetAddress,
        "postalCode": postalCode,
        "addressLocality": addressLocality,
        "addressRegion": "Baden-Württemberg",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": standort.geo.latitude,
        "longitude": standort.geo.longitude
      },
      "areaServed": standort.areaServed.map((name) => ({
        "@type": "Place",
        "name": name
      })),
      "openingHours": openingHours,
      "hasMap": standort.mapUrl,
      "parentOrganization": {
        "@type": "Organization",
        "name": "MOVIN Physiotherapie",
        "url": baseUrl
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
          "name": "Standorte",
          "item": `${baseUrl}/standorte/`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": standort.name,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title={standort.seoTitle.split(' | ')[0]}
        description={standort.seoDesc}
        canonical={canonicalUrl}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={standort.image} 
            alt={`Praxis ${standort.name}`} 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
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
                
                <h3 className="text-xl font-bold text-secondary mb-4">Was Sie erwartet:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {standort.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark/70">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {standort.localSeoText && (
                <div className="bg-light border border-border/70 rounded-3xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">Physiotherapie vor Ort</h3>
                  <p className="text-dark/75 leading-relaxed">
                    {standort.localSeoText}
                  </p>
                </div>
              )}

              {standort.video && (
                <div className="rounded-[2rem] border border-border/80 bg-light p-5 md:p-6 shadow-sm">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">
                        {standort.video.eyebrow}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-secondary">
                        {standort.video.heading}
                      </h3>
                    </div>
                    <a
                      href={standort.video.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-primary"
                    >
                      Auf YouTube ansehen <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-secondary shadow-xl">
                    <GdprEmbed category="marketing" provider="YouTube">
                      <iframe
                        src={standort.video.embedUrl}
                        title={standort.video.title}
                        className="w-full aspect-video border-0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </GdprEmbed>
                  </div>

                  <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-dark/70">
                    <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {standort.video.description}
                  </p>
                </div>
              )}

              {/* Certificate & Trust Badges */}
              {standort.badges && standort.badges.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                  {standort.badges.map((badge, idx) => (
                    <div key={idx} className="bg-light/60 border border-border/50 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-border/30">
                        <img 
                          src={badge.image} 
                          alt={badge.title} 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Prüfung &amp; Auszeichnung</span>
                        <h4 className="text-xl font-bold text-secondary mt-1">{badge.title}</h4>
                        <p className="text-dark/70 mt-2 text-sm leading-relaxed text-sm">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery */}
              {standort.gallery && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary mb-8">Einblicke in unsere Praxis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {standort.gallery.map((img, i) => (
                      <div key={i} className={`relative overflow-hidden rounded-2xl shadow-lg ${getGalleryItemClass(img, i)}`}>
                        <img 
                          src={img} 
                          alt={`${standort.name} Impression ${i + 1}`} 
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Preview */}
              {standort.team && standort.team.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-secondary mb-8">Ihr Team vor Ort</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                    {standort.team.map((member, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-light border border-border/50 hover:border-primary/20 transition-all duration-300">
                        <div className="w-24 h-24 rounded-full bg-border overflow-hidden mb-4 border-2 border-primary/20 shadow-sm relative shrink-0">
                          {member.image ? (
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full bg-mint text-primary flex items-center justify-center text-xl font-black">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>
                        <h4 className="font-bold text-secondary text-base leading-snug">{member.name}</h4>
                        <p className="text-xs font-semibold text-primary mt-1">{member.role}</p>
                        {member.spec && (
                          <span className="text-[10px] font-mono leading-none text-dark/50 mt-1.5 px-2 py-1 bg-white border border-border/40 rounded-full">
                            {member.spec}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                    <div className="min-w-0">
                      <h4 className="font-bold text-secondary mb-1">Adresse</h4>
                      <p className="text-dark/70">{standort.address.split(',')[0]}<br/>{standort.address.split(',')[1]}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
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
                      <a href={`mailto:${standort.email}`} className="text-primary hover:underline break-all">{standort.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
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
                {slug !== 'physiotherapie-europa-park-rust' && (
                  <p className="text-center text-sm text-dark/50 mt-4">48 Stunden Termingarantie</p>
                )}
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
