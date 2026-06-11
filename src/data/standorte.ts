import { getYearsOfExperience } from './companyInfo';

const years = getYearsOfExperience();

export interface OpeningHoursSection {
  title: string;
  hours: { days: string; range: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  spec?: string;
}

export interface StandortBadge {
  image: string;
  title: string;
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
  highlights: string[];
  openingHours?: OpeningHoursSection[];
  team: TeamMember[];
  badges?: StandortBadge[];
}

export const standorteData: Record<string, Standort> = {
  'physiotherapie-freiburg-lorettoberg': {
    name: 'Lorettoberg',
    seoTitle: 'Physiotherapie Freiburg Lorettoberg | MOVIN',
    seoDesc: 'Ihre MOVIN Physiotherapiepraxis am Lorettoberg in Freiburg. Modernste Ausstattung, erfahrene Therapeuten und 48h Termingarantie.',
    address: 'Mercystrasse 14, 79100 Freiburg im Breisgau',
    phone: '+49 761 707 33 66',
    email: 'kontakt@movin-freiburg.de',
    image: '/images/standorte/lorettoberg/lorettoberg-main.png',
    gallery: [
      '/images/standorte/lorettoberg/lorettoberg-gallery-1.png',
      '/images/standorte/lorettoberg/lorettoberg-gallery-2.png',
      '/images/standorte/lorettoberg/lorettoberg-gallery-3.png'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2669.839841838618!2d7.838411315648831!3d47.98144997921199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b6c00000000%3A0x0!2sMercystra%C3%9Fe%2014%2C%2079100%20Freiburg%20im%20Breisgau!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: `Seit über ${years} Jahren betreiben wir hier unseren Hauptstandort für Physiotherapie auf höchstem Niveau. Durch unsere Kooperation mit der Artemed Klinik stellen wir zudem die stationäre Versorgung sicher. Auf über 600 Quadratmetern bieten wir Ihnen modernste Therapie- und Trainingsmöglichkeiten.`,
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
        name: 'Daniel Klein',
        role: 'Physiotherapeut / Fachkraft BGM',
        image: '/images/team/daniel-klein.jpg',
        spec: 'Schulter / Knie / Kiefer'
      },
      {
        name: 'Prof. Dr. Martin Klein',
        role: 'Facharzt für Orthopädie',
        image: '/images/team/martin-klein.jpg',
        spec: 'Privatpatienten'
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
        name: 'Mareike Klein',
        role: 'Physiotherapeutin',
        image: '/images/team/mareike-klein.jpg',
        spec: 'Knie / Sprunggelenk'
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
    image: '/images/standorte/mooswald/mooswald-main.jpg',
    gallery: [
      '/images/standorte/mooswald/mooswald-gallery-1.jpg',
      '/images/standorte/mooswald/mooswald-gallery-2.jpg',
      '/images/standorte/mooswald/mooswald-gallery-3.jpg'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.5!2d7.8!3d48.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWirthstra%C3%9Fe%209%2C%2079110%20Freiburg!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: 'Willkommen in unserer hochmodernen Boutique-Praxis im Stadtteil Mooswald – der ersten Boutique-Praxis Deutschlands. Hier trifft exklusives Ambiente auf hochmoderne und qualitativ hochwertige Physiotherapie. In unserer Lounge und der entspannten Atmosphäre verbindet sich Wohlfühlatmosphäre mit modernster Physiotherapie.',
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
    team: [
      {
        name: 'Daniel Klein',
        role: 'Physiotherapeut / Fachkraft BGM',
        image: '/images/team/daniel-klein.jpg',
        spec: 'Schulter / Knie / Kiefer'
      },
      {
        name: 'Desiree Wiegel',
        role: 'Physiotherapeutin B.A.',
        image: '/images/team/desiree-wiegel.jpg',
        spec: 'Schulter / Fuß / Knie'
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
        name: 'Max Stöhr',
        role: 'Physiotherapeut',
        image: '/images/team/max-stoehr.jpg',
        spec: 'Knie / Hüfte / Sprunggelenk'
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
    image: '/images/standorte/rust/rust-main.jpg',
    gallery: [
      '/images/standorte/rust/rust-gallery-1.jpg',
      '/images/standorte/rust/rust-gallery-2.jpg',
      '/images/standorte/rust/rust-gallery-3.jpg'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d7.7!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPeter-Thumb-Str.%208%2C%2077977%20Rust!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: 'Unser Standort in Rust bietet erstklassige physiotherapeutische Versorgung direkt am Europa-Park und dem Hotel Bell Rock. In enger Zusammenarbeit mit dem Feelgood Center und dem Europa-Park betreuen wir dort die Mitarbeiterinnen und Mitarbeiter des Europa-Parks.',
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
        name: 'Claudia Andrich',
        role: 'Physiotherapeutin',
        image: '/images/team/claudia-andrich.jpg',
        spec: 'Kiefer / Rücken / Knie'
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
        name: 'Laura Walter',
        role: 'Physiotherapeutin',
        image: '/images/team/laura-walter.jpg',
        spec: 'Hüfte / Schulter / Knie'
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
