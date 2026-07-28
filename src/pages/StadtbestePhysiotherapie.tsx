import { Link } from 'react-router';
import { Award, ArrowRight, CheckCircle2, MapPin, Sparkles, Users } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/seo/SEO';

const canonicalUrl = 'https://movin-freiburg.de/stadtbeste-physiotherapie/';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${canonicalUrl}#webpage`,
    name: 'Stadtbeste Physiotherapie Freiburg – MOVIN',
    description:
      'MOVIN wurde 2016 und 2017 von Freiburgerinnen und Freiburgern zur besten Physiotherapie der Stadt gewählt.',
    url: canonicalUrl,
    dateModified: '2026-07-28',
    about: {
      '@type': 'MedicalBusiness',
      '@id': 'https://movin-freiburg.de/#organization',
      name: 'MOVIN Physiotherapie Freiburg',
      url: 'https://movin-freiburg.de/',
      award: [
        'Stadtbeste Physiotherapie Freiburg 2016',
        'Stadtbeste Physiotherapie Freiburg 2017',
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: 'https://movin-freiburg.de/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Über uns',
        item: 'https://movin-freiburg.de/ueber-uns/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Stadtbeste Physiotherapie',
        item: canonicalUrl,
      },
    ],
  },
];

const values = [
  {
    icon: CheckCircle2,
    title: 'Therapeutische Qualität',
    text: 'Persönliche Betreuung, fachliche Weiterentwicklung und ein klarer Blick auf nachhaltige Therapieergebnisse.',
  },
  {
    icon: Users,
    title: 'Vertrauen aus Freiburg',
    text: 'Die damalige Wahl durch Freiburgerinnen und Freiburger war für unser gesamtes Team eine besondere Anerkennung.',
  },
  {
    icon: Sparkles,
    title: 'Antrieb zur Weiterentwicklung',
    text: 'Die Auszeichnung bleibt für uns ein Meilenstein und ein Auftrag, Physiotherapie immer wieder neu zu denken.',
  },
];

const locations = [
  {
    name: 'Lorettoberg',
    address: 'Mercystrasse 14, 79100 Freiburg',
    href: '/standorte/physiotherapie-freiburg-lorettoberg/',
  },
  {
    name: 'Mooswald',
    address: 'Wirthstraße 9, 79110 Freiburg',
    href: '/standorte/physiotherapie-freiburg-mooswald/',
  },
  {
    name: 'Europa-Park Rust',
    address: 'Peter-Thumb-Straße 8, 77977 Rust',
    href: '/standorte/physiotherapie-europa-park-rust/',
  },
];

export default function StadtbestePhysiotherapie() {
  return (
    <>
      <SEO
        title="Stadtbeste Physiotherapie Freiburg – Auszeichnung"
        description="MOVIN wurde 2016 und 2017 von Freiburgerinnen und Freiburgern zur besten Physiotherapie der Stadt gewählt. Erfahren Sie mehr über die Auszeichnung."
        canonical={canonicalUrl}
        schema={schema}
        preloadImage="/images/standorte/lorettoberg/lorettoberg-startseite-20260622.webp"
      />

      <main>
        <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-secondary pb-20 pt-32 text-white">
          <img
            src="/images/standorte/lorettoberg/lorettoberg-startseite-20260622.webp"
            alt="MOVIN Physiotherapie am Lorettoberg in Freiburg"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(10,15,77,0.97)_8%,rgba(10,15,77,0.88)_52%,rgba(0,178,186,0.62)_100%)]" />

          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-4xl"
            >
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-heading text-sm font-bold uppercase text-white backdrop-blur-sm">
                <Award className="h-5 w-5 text-primary-light" aria-hidden="true" />
                Ausgezeichnet 2016 &amp; 2017
              </div>
              <h1 className="mb-7 max-w-4xl text-4xl font-black leading-[1.06] text-white sm:text-5xl md:text-7xl">
                Stadtbeste Physiotherapie{' '}
                <span className="text-gradient-teal-mint">Freiburg</span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-white/90 md:text-2xl">
                Zweimal von Freiburgerinnen und Freiburgern gewählt: Die Auszeichnungen
                sind ein besonderer Teil unserer Geschichte und bis heute Ansporn für
                moderne, persönliche Physiotherapie.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#0a0f4d] via-[#12356e] to-[#00a8af] p-8 text-center shadow-2xl">
                <div className="absolute inset-5 rounded-lg border border-white/15" aria-hidden="true" />
                <div className="relative">
                  <Award className="mx-auto mb-7 h-24 w-24 text-[#b4dfbb]" strokeWidth={1.35} aria-hidden="true" />
                  <p className="mb-2 font-heading text-sm font-bold uppercase text-white/70">
                    Historische Auszeichnung
                  </p>
                  <p className="font-heading text-6xl font-black text-white">2016</p>
                  <div className="mx-auto my-3 h-px w-20 bg-primary-light/60" />
                  <p className="font-heading text-6xl font-black text-white">2017</p>
                </div>
              </div>

              <div>
                <p className="mb-4 font-heading text-sm font-bold uppercase text-primary">
                  Ein Meilenstein unserer Geschichte
                </p>
                <h2 className="mb-7 text-3xl font-black text-secondary md:text-5xl">
                  Zweimal zur besten Physiotherapie der Stadt gewählt
                </h2>
                <div className="space-y-5 text-lg leading-relaxed text-dark/80">
                  <p>
                    2016 wurde MOVIN erstmals von Freiburgerinnen und Freiburgern zur
                    besten Physiotherapie der Stadt gewählt. 2017 konnten wir die
                    Auszeichnung erneut entgegennehmen.
                  </p>
                  <p>
                    Wir danken allen Menschen, die uns damals ihre Stimme und ihr
                    Vertrauen geschenkt haben. Für unser Team war und ist diese
                    Anerkennung ein Grund zur Freude – und zugleich Motivation, unsere
                    therapeutische Arbeit kontinuierlich weiterzuentwickeln.
                  </p>
                </div>

                <aside className="mt-8 border-l-4 border-primary bg-mint/70 p-6">
                  <p className="text-base leading-relaxed text-secondary/80">
                    <strong>Transparenzhinweis:</strong> Die Bezeichnung bezieht sich auf
                    die Auszeichnungen aus den Jahren 2016 und 2017. Sie stellt kein
                    aktuelles oder fortlaufendes Ranking dar.
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-light">
          <div className="container-custom">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-3 font-heading text-sm font-bold uppercase text-primary">
                Was uns bis heute bewegt
              </p>
              <h2 className="text-3xl font-black text-secondary md:text-5xl">
                Anerkennung wird zum Anspruch
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map(({ icon: Icon, title, text }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-lg border border-border bg-white p-8 shadow-sm"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-mint text-primary">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-secondary">{title}</h3>
                  <p className="text-base leading-relaxed text-dark/70">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="mb-3 font-heading text-sm font-bold uppercase text-primary">
                  MOVIN heute
                </p>
                <h2 className="mb-6 text-3xl font-black text-secondary md:text-5xl">
                  Physiotherapie in Freiburg und Rust
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-dark/75">
                  Heute verbindet MOVIN langjährige Erfahrung mit evidenzorientierter
                  Therapie, medizinischem Training und digitalen Angeboten – an drei
                  Standorten in der Region.
                </p>
                <Link to="/leistungen/" className="btn-primary gap-2">
                  Unsere Leistungen
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid gap-4">
                {locations.map((location) => (
                  <Link
                    key={location.name}
                    to={location.href}
                    className="group flex min-h-28 items-center justify-between gap-5 rounded-lg border border-border bg-light px-6 py-5 transition-colors hover:border-primary"
                  >
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <h3 className="mb-1 text-xl font-bold text-secondary">
                          MOVIN {location.name}
                        </h3>
                        <p className="text-sm text-dark/65">{location.address}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-secondary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-footer-gradient py-20 text-center text-white">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-black text-white md:text-5xl">
                Lernen Sie MOVIN persönlich kennen
              </h2>
              <p className="mb-9 text-lg text-white/85 md:text-xl">
                Finden Sie den passenden Standort oder vereinbaren Sie direkt einen
                Termin für Ihre Physiotherapie.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/termin/" className="btn-cta-cheetah rounded-full px-9 py-4">
                  <span>Termin vereinbaren</span>
                </Link>
                <Link
                  to="/standorte/"
                  className="inline-flex items-center justify-center rounded-full border border-white/45 px-9 py-4 font-heading font-bold text-white transition-colors hover:bg-white/10"
                >
                  Standorte ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
