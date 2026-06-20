import { getYearsOfExperience } from './companyInfo';

const years = getYearsOfExperience();

export interface OpeningHoursSection {
  title: string;
  hours: { days: string; range: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  spec?: string;
}

export interface StandortBadge {
  image: string;
  title: string;
  description: string;
}

export interface StandortVideo {
  embedUrl: string;
  watchUrl: string;
  title: string;
  eyebrow: string;
  heading: string;
  description: string;
}

export interface Standort {
  name: string;
  seoTitle: string;
  seoDesc: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  gallery?: string[];
  mapUrl: string;
  description: string;
  localSeoText?: string;
  highlights: string[];
  openingHours?: OpeningHoursSection[];
  team: TeamMember[];
  badges?: StandortBadge[];
  video?: StandortVideo;
}

export const standorteData: Record<string, Standort> = {
  'physiotherapie-freiburg-lorettoberg': {
    name: 'Lorettoberg',
    seoTitle: 'Physiotherapie Freiburg Lorettoberg | MOVIN',
    seoDesc: 'Ihre MOVIN Physiotherapiepraxis am Lorettoberg in Freiburg. Modernste Ausstattung, erfahrene Therapeuten und 48h Termingarantie.',
    address: 'Mercystrasse 14, 79100 Freiburg im Breisgau',
    phone: '+49 761 707 33 66',
    email: 'kontakt@movin-freiburg.de',
    image: '/images/standorte/lorettoberg/lorettoberg-gallery-1.webp',
    gallery: [
      '/images/standorte/lorettoberg/lorettoberg-gallery-1.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-2.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-6.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-7.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-8.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-9.webp'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2669.839841838618!2d7.838411315648831!3d47.98144997921199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b6c00000000%3A0x0!2sMercystra%C3%9Fe%2014%2C%2079100%20Freiburg%20im%20Breisgau!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: `Seit über ${years} Jahren betreiben wir hier unseren Hauptstandort für Physiotherapie auf höchstem Niveau. Durch unsere Kooperation mit der Artemed Klinik stellen wir zudem die stationäre Versorgung sicher. Auf über 600 Quadratmetern bieten wir Ihnen modernste Therapie- und Trainingsmöglichkeiten.`,
    localSeoText: 'MOVIN am Lorettoberg ist besonders für Patientinnen und Patienten aus Freiburg-Wiehre, Günterstal, Vauban und der Freiburger Innenstadt gut erreichbar. Durch die Nähe zur Klinik am Lorettoberg eignet sich der Standort für ambulante Physiotherapie, Nachbehandlung nach Operationen, medizinisches Training und eine nahtlose Fortführung der Therapie nach stationären Aufenthalten.',
    highlights: [
      'Im Herzen von Freiburg gelegen',
      'Große und vielfältige Trainingsbereiche',
      'Enge Zusammenarbeit mit den Ärzten der Artemed',
      'Wunderschöner Blick vom Lorettoberg',
      'Schnelle Terminfindungsmöglichkeiten'
    ],
    openingHours: [
      {
        title: 'Öffnungszeiten der Anmeldung',
        hours: [
          { days: 'Mo - Fr', range: '08:00 – 16:00 Uhr' }
        ]
      },
      {
        title: 'Öffnungszeiten des Therapiebereichs',
        hours: [
          { days: 'Mo - Do', range: '07:30 – 20:00 Uhr' },
          { days: 'Freitag', range: '07:30 – 16:00 Uhr' }
        ]
      }
    ],
    team: [
      {
        name: 'Prof. Dr. Martin Klein',
        role: 'Facharzt für Orthopädie',
        image: '/images/team/martin-klein.jpg',
        spec: 'Privatpatienten'
      },
      {
        name: 'Daniel Klein',
        role: 'Physiotherapeut / Fachkraft BGM',
        image: '/images/team/daniel-klein.jpg',
        spec: 'Schulter / Knie / Kiefer'
      },
      {
        name: 'Maik Forsbach',
        role: 'Bürokaufmann / Wirtschaftsfachwirt (IHK)',
        image: '/images/team/maik-forsbach.jpg',
        spec: 'Verwaltung / Rezeption'
      },
      {
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team/mareike-klein.jpg',
        spec: 'Knie / Sprunggelenk'
      },
      {
        name: 'Jana Züge',
        role: 'Hotelkauffrau',
        image: '/images/team/jana-zuege.jpg',
        spec: 'Mutterschutz / Anmeldung'
      },
      {
        name: 'Claudia Andrich',
        role: 'Physiotherapeutin',
        image: '/images/team/claudia-andrich.jpg',
        spec: 'Kiefer / Rücken / Knie'
      },
      {
        name: 'Lina Haberstroh',
        role: 'Rezeptionistin',
        image: '/images/team/lina-haberstroh.jpg',
        spec: 'Anmeldung'
      },
      {
        name: 'Mareike Strittmatter',
        role: 'Physiotherapeutin B.Sc.',
        image: '/images/team/mareike-strittmatter.jpg',
        spec: 'Leitung / Hüfte / Rücken / Knie'
      },
      {
        name: 'Jonas Wolfert',
        role: 'Physiotherapeut',
        image: '/images/team/jonas-wolfert.jpg',
        spec: 'Stellv. Leitung / Knie / Schulter / Hüfte'
      },
      {
        name: 'Olga Schmidt',
        role: 'Kauffrau',
        image: '/images/team/olga-schmidt.jpg',
        spec: 'Verwaltung / Anmeldung'
      },
      {
        name: 'Senka Dizdarevic',
        role: 'Physiotherapeutin',
        image: '/images/team/senka-dizdarevic.jpg',
        spec: 'Stationäre Versorgung'
      },
      {
        name: 'Ellen Heilmann',
        role: 'Physiotherapeutin',
        image: '/images/team/ellen-heilmann.jpg',
        spec: 'Orthopädie / Station'
      },
      {
        name: 'Maximilian Schmidt',
        role: 'Physiotherapeut',
        image: '/images/team/maximilian-schmidt.jpg',
        spec: 'Hand / Knie / Hüfte'
      },
      {
        name: 'Heidrun Brinkmann',
        role: 'Bankkauffrau',
        image: '/images/team/heidrun-brinkmann.jpg',
        spec: 'Verwaltung / Abrechnung'
      },
      {
        name: 'Marco Rebstock',
        role: 'Physiotherapeut',
        image: '/images/team/marco-rebstock.jpg',
        spec: 'Hüfte / Knie / Wirbelsäule'
      },
      {
        name: 'Bianca Kohler',
        role: 'Physiotherapeutin',
        image: '/images/team/bianca-kohler.jpg',
        spec: 'Hüfte / Schulter / Knie'
      },
      {
        name: 'Heather Mitgorden-Keller',
        role: 'Physiotherapeutin',
        image: '/images/team/heather-mitgorden-keller.jpg',
        spec: 'Station'
      },
      {
        name: 'Laura Walter',
        role: 'Physiotherapeutin',
        image: '/images/team/laura-walter.jpg',
        spec: 'Hüfte / Schulter / Knie'
      },
      {
        name: 'Lea Ruf',
        role: 'Physiotherapeutin',
        image: '/images/team/lea-ruf.jpg',
        spec: 'Hüfte / Knie / HWS'
      },
      {
        name: 'Mara Schöneck',
        role: 'Physiotherapeutin',
        image: '/images/team/mara-schoeneck.jpg',
        spec: 'Knie / Hüfte / Wirbelsäule'
      },
      {
        name: 'Theuerkauf',
        role: 'Teammitglied',
        spec: 'Lorettoberg'
      },
      {
        name: 'Aushilfen',
        role: 'Aushilfe',
        spec: 'Wechselnd'
      }
    ],
    badges: [
      {
        image: '/images/partner-logos/zertifikate/badge_lorettoberg.png',
        title: 'Ausgezeichnete Patientenzufriedenheit',
        description: 'Zertifiziert durch "Quality Proofed by Consumers" für exzellente Kundenbewertungen und Behandlungsqualität.'
      },
      {
        image: '/images/partner-logos/zertifikate/ppcertificate.png',
        title: 'Zertifizierter Praxis-Standard',
        description: 'Zertifizierte Dokumentation & Datenerhebung für lückenlose Therapieerfassung und höchste Qualitätsmaßstäbe.'
      }
    ]
  },
  'physiotherapie-freiburg-mooswald': {
    name: 'Mooswald',
    seoTitle: 'Boutique Physiotherapie Freiburg Mooswald | MOVIN',
    seoDesc: 'MOVIN Physiotherapie in Freiburg Mooswald. Exklusive Boutique-Praxis, KI-gestützte Therapie und individuelle Betreuung. Jetzt Termin vereinbaren!',
    address: 'Wirthstraße 9, 79110 Freiburg',
    phone: '+49 761 707 33 77',
    email: 'physiotherapie.mooswald@movin-freiburg.de',
    image: '/images/standorte/mooswald/mooswald-main.webp',
    gallery: [
      '/images/standorte/mooswald/mooswald-gallery-1.webp',
      '/images/standorte/mooswald/mooswald-gallery-2.webp',
      '/images/standorte/mooswald/mooswald-gallery-3.webp',
      '/images/standorte/mooswald/mooswald-gallery-4.webp',
      '/images/standorte/mooswald/mooswald-gallery-5.webp',
      '/images/standorte/mooswald/mooswald-gallery-6.webp'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.5!2d7.8!3d48.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWirthstra%C3%9Fe%209%2C%2079110%20Freiburg!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: 'Willkommen in unserer hochmodernen Boutique-Praxis im Stadtteil Mooswald – der ersten Boutique-Praxis Deutschlands. Hier trifft exklusives Ambiente auf hochmoderne und qualitativ hochwertige Physiotherapie. In unserer Lounge und der entspannten Atmosphäre verbindet sich Wohlfühlatmosphäre mit modernster Therapie.',
    localSeoText: 'Der Standort MOVIN Mooswald richtet sich an Patientinnen und Patienten aus Freiburg-West, Mooswald, Landwasser, Betzenhausen und Lehen. Die moderne Boutique-Praxis verbindet Physiotherapie, medizinisches Training und digitale Trainingssysteme wie Skillcourt in einer ruhigen, hochwertigen Praxisumgebung.',
    highlights: [
      'Skillcourt Training',
      'Großer Trainingsbereich & Lounge',
      'Große, lichtdurchflutete Räume',
      'Gute Anbindung an den ÖPNV',
      'Klimatisierte Behandlungs- und Trainingsräume'
    ],
    openingHours: [
      {
        title: 'Öffnungszeiten der Anmeldung',
        hours: [
          { days: 'Mo & Do', range: '08:00 – 18:00 Uhr' },
          { days: 'Di, Mi, Fr', range: '08:00 – 16:00 Uhr' }
        ]
      },
      {
        title: 'Öffnungszeiten des Therapiebereichs',
        hours: [
          { days: 'Mo - Do', range: '08:00 – 20:00 Uhr' },
          { days: 'Freitag', range: '08:00 – 16:00 Uhr' }
        ]
      }
    ],
    video: {
      embedUrl: 'https://www.youtube-nocookie.com/embed/p0XnVjgkomQ?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=p0XnVjgkomQ',
      title: 'MOVIN Standort Mooswald Video',
      eyebrow: 'Einblick Mooswald',
      heading: 'Boutique-Physiotherapie in Bewegung erleben',
      description: 'Das Video zeigt den Standort Mooswald als modernen Praxis- und Trainingsraum: hell, hochwertig und auf persönliche Betreuung ausgerichtet.'
    },
    team: [
      {
        name: 'Daniel Klein',
        role: 'Physiotherapeut / Fachkraft BGM',
        image: '/images/team/daniel-klein.jpg',
        spec: 'Schulter / Knie / Kiefer'
      },
      {
        name: 'Maik Forsbach',
        role: 'Bürokaufmann / Wirtschaftsfachwirt (IHK)',
        image: '/images/team/maik-forsbach.jpg',
        spec: 'Verwaltung / Rezeption'
      },
      {
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team/mareike-klein.jpg',
        spec: 'Stellv. Leitung / Knie / Sprunggelenk'
      },
      {
        name: 'Francisca Yanes Yanes',
        role: 'Physiotherapeutin',
        image: '/images/team/francisca-yanes-yanes.jpg',
        spec: 'Leitung / Wirbelsäule / Schulter / Hüfte'
      },
      {
        name: 'Jana Züge',
        role: 'Hotelkauffrau',
        image: '/images/team/jana-zuege.jpg',
        spec: 'Mutterschutz / Anmeldung'
      },
      {
        name: 'Lina Haberstroh',
        role: 'Rezeptionistin',
        image: '/images/team/lina-haberstroh.jpg',
        spec: 'Anmeldung'
      },
      {
        name: 'Olga Schmidt',
        role: 'Kauffrau',
        image: '/images/team/olga-schmidt.jpg',
        spec: 'Verwaltung / Anmeldung'
      },
      {
        name: 'Daniela Fichter',
        role: 'Physiotherapeutin',
        image: '/images/team/daniela-fichter.jpg',
        spec: 'Knie / Hüfte / Sprunggelenk'
      },
      {
        name: 'Elina Kovacs',
        role: 'Physiotherapeutin & Osteopathin',
        image: '/images/team/elina-kovacs.jpg',
        spec: 'HWS / Knie / Hüfte'
      },
      {
        name: 'Heidrun Brinkmann',
        role: 'Bankkauffrau',
        image: '/images/team/heidrun-brinkmann.jpg',
        spec: 'Verwaltung / Abrechnung'
      },
      {
        name: 'Julius Leibold',
        role: 'Physiotherapeut',
        image: '/images/team/julius-leibold.jpg',
        spec: 'Knie / Fuß / Schulter'
      },
      {
        name: 'Lea Ruf',
        role: 'Physiotherapeutin',
        image: '/images/team/lea-ruf.jpg',
        spec: 'Hüfte / Knie / HWS'
      },
      {
        name: 'Prell',
        role: 'Teammitglied',
        spec: 'Neu'
      },
      {
        name: 'Nochemann',
        role: 'Teammitglied',
        spec: 'Neu'
      },
      {
        name: 'Theresa Maier',
        role: 'Teammitglied',
        spec: 'Neu'
      },
      {
        name: 'Lara',
        role: 'Kasse',
        spec: 'Mooswald'
      },
      {
        name: 'Miriam Ferne',
        role: 'Teammitglied',
        spec: 'Mooswald'
      }
    ],
    badges: [
      {
        image: '/images/partner-logos/zertifikate/badge_mooswald.png',
        title: 'Ausgezeichnete Patientenzufriedenheit',
        description: 'Zertifiziert durch "Quality Proofed by Consumers" für exzellente Kundenbewertungen und Behandlungsqualität.'
      },
      {
        image: '/images/partner-logos/zertifikate/ppcertificate.png',
        title: 'Zertifizierter Praxis-Standard',
        description: 'Zertifizierte Dokumentation & Datenerhebung für lückenlose Therapieerfassung und höchste Qualitätsmaßstäbe.'
      }
    ]
  },
  'physiotherapie-europa-park-rust': {
    name: 'Europa-Park Rust',
    seoTitle: 'Physiotherapie Europa-Park Rust | MOVIN',
    seoDesc: 'MOVIN Physiotherapie direkt am Europa-Park in Rust. Schnelle Hilfe bei Schmerzen, Sportverletzungen und Prävention.',
    address: 'Peter-Thumb-Str. 8, 77977 Rust',
    phone: '+49 761 707 33 66',
    email: 'europapark.physio@movin-freiburg.de',
    image: '/images/standorte/rust/rust-main.webp',
    gallery: [
      '/images/standorte/rust/rust-gallery-1.jpg',
      '/images/standorte/rust/rust-gallery-4.jpg',
      '/images/standorte/rust/rust-gallery-5.jpg',
      '/images/standorte/rust/rust-gallery-6.jpg',
      '/images/standorte/rust/rust-gallery-7.jpg'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d7.7!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPeter-Thumb-Str.%208%2C%2077977%20Rust!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: 'Unser Standort in Rust bietet erstklassige physiotherapeutische Versorgung direkt am Europa-Park und dem Hotel Bell Rock. In enger Zusammenarbeit mit dem Feelgood Center und dem Europa-Park betreuen wir dort die Mitarbeiterinnen und Mitarbeiter des Europa-Parks.',
    localSeoText: 'MOVIN Europa-Park Rust bietet Physiotherapie direkt am Europa-Park und ist für Menschen aus Rust, Ringsheim, Herbolzheim, Ettenheim und der südlichen Ortenau gut erreichbar. Der Standort unterstützt schnelle Hilfe bei Beschwerden, Prävention, Training und die physiotherapeutische Betreuung im Umfeld des Europa-Parks.',
    highlights: [
      'Zentrale Lage am Europa-Park',
      'Zügige Terminvergabe',
      'Kostenlose Parkplätze direkt vor der Tür',
      'Moderne Trainingsgeräte und Einrichtung',
      'Einfache und digitale Terminvergabe'
    ],
    openingHours: [
      {
        title: 'Öffnungszeiten',
        hours: [
          { days: 'Dienstag', range: 'nach Rücksprache' },
          { days: 'Mittwoch', range: '08:00 – 16:30 Uhr' },
          { days: 'Donnerstag', range: '10:00 – 18:30 Uhr' },
          { days: 'Freitag', range: '08:00 – 16:00 Uhr' }
        ]
      }
    ],
    team: [
      {
        name: 'Daniel Klein',
        role: 'Physiotherapeut / Fachkraft BGM',
        image: '/images/team/daniel-klein.jpg',
        spec: 'Schulter / Knie / Kiefer'
      },
      {
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team/mareike-klein.jpg',
        spec: 'Leitung / Knie / Sprunggelenk'
      },
      {
        name: 'Jonas Wolfert',
        role: 'Physiotherapeut',
        image: '/images/team/jonas-wolfert.jpg',
        spec: 'Knie / Schulter / Hüfte'
      },
      {
        name: 'Mareike Strittmatter',
        role: 'Physiotherapeutin B.Sc.',
        image: '/images/team/mareike-strittmatter.jpg',
        spec: 'Hüfte / Rücken / Knie'
      },
      {
        name: 'Elina Kovacs',
        role: 'Physiotherapeutin & Osteopathin',
        image: '/images/team/elina-kovacs.jpg',
        spec: 'HWS / Knie / Hüfte'
      }
    ],
    badges: [
      {
        image: '/images/partner-logos/zertifikate/ppcertificate.png',
        title: 'Zertifizierter Praxis-Standard',
        description: 'Zertifizierte Dokumentation & Datenerhebung für lückenlose Therapieerfassung und höchste Qualitätsmaßstäbe.'
      }
    ]
  }
};
