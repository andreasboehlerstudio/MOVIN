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
  geo: {
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
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
    image: '/images/standorte/lorettoberg/lorettoberg-startseite-20260622.webp',
    gallery: [
      '/images/standorte/lorettoberg/lorettoberg-startseite-20260622.webp',
      '/images/standorte/lorettoberg/lorettoberg-training-20260622.webp',
      '/images/standorte/lorettoberg/lorettoberg-behandlungsraum-20260622.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-1.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-2.webp',
      '/images/standorte/lorettoberg/lorettoberg-gallery-6.webp'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2669.839841838618!2d7.838411315648831!3d47.98144997921199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b6c00000000%3A0x0!2sMercystra%C3%9Fe%2014%2C%2079100%20Freiburg%20im%20Breisgau!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    geo: {
      latitude: 47.98145,
      longitude: 7.83841
    },
    areaServed: ['Freiburg-Wiehre', 'Lorettoberg', 'Günterstal', 'Vauban', 'Freiburg Innenstadt'],
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
    video: {
      embedUrl: 'https://www.youtube-nocookie.com/embed/FaoaNoCfdto?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=FaoaNoCfdto',
      title: 'MOVIN Standort Lorettoberg Video',
      eyebrow: 'Einblick Lorettoberg',
      heading: 'MOVIN am Lorettoberg erleben',
      description: 'Das Video zeigt den Standort Lorettoberg mit Therapie, Training und der besonderen Lage direkt am Lorettoberg.'
    },
    team: [
      {
        name: 'Prof. Dr. med. Martin Klein',
        role: 'Inhaber',
        image: '/images/team-uniform/martin-klein.webp',
        spec: 'Studienleiter Physiotherapie'
      },
      {
        name: 'Daniel Klein',
        role: 'Geschäftsführer',
        image: '/images/team-uniform/daniel-klein.webp',
        spec: 'Schulter / Knie / OSG'
      },
      {
        name: 'Maik Forsbach',
        role: 'Geschäftsführer',
        image: '/images/team-uniform/maik-forsbach.webp',
        spec: 'Verwaltung / Rezeption'
      },
      {
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/mareike-klein.webp',
        spec: 'Wirbelsäule / Schulter / Knie'
      },
      {
        name: 'Jana Züge',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/jana-zuege.webp',
        spec: 'Elternzeit'
      },
      {
        name: 'Claudia Andrich',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/claudia-andrich.webp',
        spec: 'Kiefer / Rücken / Knie'
      },
      {
        name: 'Lina Haberstroh',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/lina-haberstroh.webp',
        spec: 'Anmeldung'
      },
      {
        name: 'Mareike Strittmatter',
        role: 'Physiotherapeutin B.Sc.',
        image: '/images/team-uniform/mareike-strittmatter.webp',
        spec: 'Leitung / Hüfte / Rücken / Knie'
      },
      {
        name: 'Jonas Wolfert',
        role: 'Physiotherapeut',
        image: '/images/team-uniform/jonas-wolfert.webp',
        spec: 'Stellv. Leitung / Knie / Schulter / Hüfte'
      },
      {
        name: 'Olga Schmidt',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/olga-schmidt.webp',
        spec: 'Verwaltung / Anmeldung'
      },
      {
        name: 'Senka Dizdarevic',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/senka-dizdarevic.webp',
        spec: 'Stationäre Versorgung'
      },
      {
        name: 'Ellen Heilmann',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/ellen-heilmann.webp',
        spec: 'Stationäre Versorgung'
      },
      {
        name: 'Maximilian Schmidt',
        role: 'Physiotherapeut',
        image: '/images/team-uniform/maximilian-schmidt.webp',
        spec: 'Hand / Knie / Hüfte'
      },
      {
        name: 'Heidrun Drinkmann',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/heidrun-brinkmann.webp',
        spec: 'Verwaltung / Abrechnung'
      },
      {
        name: 'Marco Rebstock',
        role: 'Physiotherapeut',
        image: '/images/team-uniform/marco-rebstock.webp',
        spec: 'Hüfte / Knie / Wirbelsäule'
      },
      {
        name: 'Bianca Kohler',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/bianca-kohler.webp',
        spec: 'Hüfte / Schulter / Knie'
      },
      {
        name: 'Heather Mitgorden-Keller',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/heather-mitgorden-keller.webp',
        spec: 'Stationäre Versorgung'
      },
      {
        name: 'Laura Walter',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/laura-walter.webp',
        spec: 'Hüfte / Schulter / Knie'
      },
      {
        name: 'Lea Ruf',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/lea-ruf.webp',
        spec: 'Hüfte / Knie / HWS'
      },
      {
        name: 'Mara Schöneck',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/mara-schoeneck.webp',
        spec: 'Knie / Hüfte / Wirbelsäule'
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
    image: '/images/standorte/mooswald/mooswald-training-raum-20260622.webp',
    gallery: [
      '/images/standorte/mooswald/mooswald-training-raum-20260622.webp',
      '/images/standorte/mooswald/mooswald-training-track-20260622.webp',
      '/images/standorte/mooswald/mooswald-skillcourt-20260622-enhanced-bold.webp',
      '/images/standorte/mooswald/mooswald-gallery-3.webp',
      '/images/standorte/mooswald/mooswald-praxisflur-20260622.webp',
      '/images/standorte/mooswald/mooswald-gallery-1.webp'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.5!2d7.8!3d48.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWirthstra%C3%9Fe%209%2C%2079110%20Freiburg!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    geo: {
      latitude: 48.01086,
      longitude: 7.80658
    },
    areaServed: ['Freiburg-Mooswald', 'Freiburg-West', 'Landwasser', 'Betzenhausen', 'Lehen'],
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
      embedUrl: 'https://www.youtube-nocookie.com/embed/pxoNNSfE8Zw?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=pxoNNSfE8Zw',
      title: 'MOVIN Standort Mooswald Video',
      eyebrow: 'Einblick Mooswald',
      heading: 'Boutique-Physiotherapie in Bewegung erleben',
      description: 'Das Video zeigt den Standort Mooswald als modernen Praxis- und Trainingsraum: hell, hochwertig und auf persönliche Betreuung ausgerichtet.'
    },
    team: [
      {
        name: 'Daniel Klein',
        role: 'Geschäftsführer',
        image: '/images/team-uniform/daniel-klein.webp',
        spec: 'Schulter / Knie / OSG'
      },
      {
        name: 'Maik Forsbach',
        role: 'Geschäftsführer',
        image: '/images/team-uniform/maik-forsbach.webp',
        spec: 'Verwaltung / Rezeption'
      },
      {
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/mareike-klein.webp',
        spec: 'Stellv. Leitung / Wirbelsäule / Schulter / Knie'
      },
      {
        name: 'Francisca Yanes Yanes',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/francisca-yanes-yanes.webp',
        spec: 'Leitung / Wirbelsäule / Schulter / Hüfte'
      },
      {
        name: 'Jana Züge',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/jana-zuege.webp',
        spec: 'Elternzeit'
      },
      {
        name: 'Lina Haberstroh',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/lina-haberstroh.webp',
        spec: 'Anmeldung'
      },
      {
        name: 'Olga Schmidt',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/olga-schmidt.webp',
        spec: 'Verwaltung / Anmeldung'
      },
      {
        name: 'Daniela Fichter',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/daniela-fichter.webp',
        spec: 'Knie / Hüfte / Sprunggelenk'
      },
      {
        name: 'Elina Kovacs',
        role: 'Physiotherapeutin & Osteopathin',
        image: '/images/team-uniform/elina-kovacs.webp',
        spec: 'HWS / Knie / Hüfte'
      },
      {
        name: 'Heidrun Drinkmann',
        role: 'Rezeptionistin',
        image: '/images/team-uniform/heidrun-brinkmann.webp',
        spec: 'Verwaltung / Abrechnung'
      },
      {
        name: 'Julius Leibold',
        role: 'Physiotherapeut',
        image: '/images/team-uniform/julius-leibold.webp',
        spec: 'Knie / Fuß / Schulter'
      },
      {
        name: 'Lea Ruf',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/lea-ruf.webp',
        spec: 'Hüfte / Knie / HWS'
      },
      {
        name: 'Lena Prell',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/lena-prell.webp',
        spec: 'Neu im Team'
      },
      {
        name: 'Lasse Nockemann',
        role: 'Physiotherapeut',
        spec: 'Ohne Bild'
      },
      {
        name: 'Theresa Maier',
        role: 'Physiotherapeutin',
        spec: 'Neu ab Juli'
      },
      {
        name: 'Miriam Ferré',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/miriam-ferre.webp',
        spec: 'Wirbelsäule / Hüfte / Knie'
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
    image: '/images/standorte/rust/rust-gallery-7.jpg',
    gallery: [
      '/images/standorte/rust/rust-gallery-7.jpg',
      '/images/standorte/rust/rust-gallery-8.jpg',
      '/images/standorte/rust/rust-main.webp',
      '/images/standorte/rust/rust-gallery-4.jpg',
      '/images/standorte/rust/rust-gallery-5.jpg',
      '/images/standorte/rust/rust-gallery-6.jpg',
      '/images/standorte/rust/rust-gallery-1.jpg'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d7.7!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPeter-Thumb-Str.%208%2C%2077977%20Rust!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    geo: {
      latitude: 48.26709,
      longitude: 7.72031
    },
    areaServed: ['Rust', 'Europa-Park', 'Ringsheim', 'Herbolzheim', 'Ettenheim', 'südliche Ortenau'],
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
    video: {
      embedUrl: 'https://www.youtube-nocookie.com/embed/Yy5iKJN60mY?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=Yy5iKJN60mY',
      title: 'MOVIN Standort Europa-Park Rust Video',
      eyebrow: 'Einblick Europa-Park Rust',
      heading: 'MOVIN am Europa-Park erleben',
      description: 'Das Video gibt einen Eindruck vom Standort am Europa-Park Rust und der physiotherapeutischen Betreuung in diesem besonderen Umfeld.'
    },
    team: [
      {
        name: 'Daniel Klein',
        role: 'Geschäftsführer',
        image: '/images/team-uniform/daniel-klein.webp',
        spec: 'Schulter / Knie / OSG'
      },
      {
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team-uniform/mareike-klein.webp',
        spec: 'Leitung / Wirbelsäule / Schulter / Knie'
      },
      {
        name: 'Jonas Wolfert',
        role: 'Physiotherapeut',
        image: '/images/team-uniform/jonas-wolfert.webp',
        spec: 'Knie / Schulter / Hüfte'
      },
      {
        name: 'Mareike Strittmatter',
        role: 'Physiotherapeutin B.Sc.',
        image: '/images/team-uniform/mareike-strittmatter.webp',
        spec: 'Hüfte / Rücken / Knie'
      },
      {
        name: 'Elina Kovacs',
        role: 'Physiotherapeutin & Osteopathin',
        image: '/images/team-uniform/elina-kovacs.webp',
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
