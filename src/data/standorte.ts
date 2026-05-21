import { getYearsOfExperience } from './companyInfo';

const years = getYearsOfExperience();

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
}

export const standorteData: Record<string, Standort> = {
  'physiotherapie-freiburg-lorettoberg': {
    name: 'Lorettoberg',
    seoTitle: 'Physiotherapie Freiburg Lorettoberg | MOVIN',
    seoDesc: 'Ihre MOVIN Physiotherapiepraxis am Lorettoberg in Freiburg. Modernste Ausstattung, erfahrene Therapeuten und 48h Termingarantie.',
    address: 'Mercystrasse 14, 79100 Freiburg im Breisgau',
    phone: '+49 761 707 33 66',
    email: 'lorettoberg@movin-freiburg.de',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2669.839841838618!2d7.838411315648831!3d47.98144997921199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b6c00000000%3A0x0!2sMercystra%C3%9Fe%2014%2C%2079100%20Freiburg%20im%20Breisgau!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: `Seit über ${years} Jahren betreiben wir hier unseren Hauptstandort für Physiotherapie auf höchstem Niveau. Durch unsere Kooperation mit der Artemed Klinik stellen wir zudem die stationäre Versorgung sicher. Auf über 600 Quadratmetern bieten wir Ihnen modernste Therapie- und Trainingsmöglichkeiten.`,
    highlights: [
      'Im Herzen von Freiburg gelegen',
      'Große und vielfältige Trainingsbereiche',
      'Enge Zusammenarbeit mit den Ärzten der Artemed',
      'Wunderschöner Blick vom Lorettoberg',
      'Schnelle Terminfindungsmöglichkeiten'
    ]
  },
  'physiotherapie-freiburg-mooswald': {
    name: 'Mooswald',
    seoTitle: 'Boutique Physiotherapie Freiburg Mooswald | MOVIN',
    seoDesc: 'MOVIN Physiotherapie in Freiburg Mooswald. Exklusive Boutique-Praxis, KI-gestützte Therapie und individuelle Betreuung. Jetzt Termin vereinbaren!',
    address: 'Wirthstraße 9, 79110 Freiburg',
    phone: '+49 761 707 33 77',
    email: 'mooswald@movin-freiburg.de',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.5!2d7.8!3d48.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWirthstra%C3%9Fe%209%2C%2079110%20Freiburg!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: 'Willkommen in unserer hochmodernen Boutique-Praxis im Stadtteil Mooswald – der ersten Boutique-Praxis Deutschlands. Hier trifft exklusives Ambiente auf hochmoderne und qualitativ hochwertige Physiotherapie. In unserer Lounge und der entspannten Atmosphäre verbindet sich Wohlfühlatmosphäre mit modernster Physiotherapie.',
    highlights: [
      'Skillcourt Training',
      'Großer Trainingsbereich & Lounge',
      'Große, lichtdurchflutete Räume',
      'Gute Anbindung an den ÖPNV',
      'Klimatisierte Behandlungs- und Trainingsräume'
    ]
  },
  'physiotherapie-europa-park-rust': {
    name: 'Europa-Park Rust',
    seoTitle: 'Physiotherapie Europa-Park Rust | MOVIN',
    seoDesc: 'MOVIN Physiotherapie direkt am Europa-Park in Rust. Schnelle Hilfe bei Schmerzen, Sportverletzungen und Prävention. 48h Termingarantie!',
    address: 'Peter-Thumb-Str. 8, 77977 Rust',
    phone: '+49 761 707 33 77',
    email: 'rust@movin-freiburg.de',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200'
    ],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d7.7!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPeter-Thumb-Str.%208%2C%2077977%20Rust!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde',
    description: 'Unser Standort in Rust bietet erstklassige physiotherapeutische Versorgung direkt am Europa-Park und dem Hotel Bell Rock. In enger Zusammenarbeit mit dem Feelgood Center und dem Europa-Park betreuen wir dort die Mitarbeiterinnen und Mitarbeiter des Europa-Parks.',
    highlights: [
      'Zentrale Lage am Europa-Park',
      'Zügige Terminvergabe',
      'Kostenlose Parkplätze direkt vor der Tür',
      'Moderne Trainingsgeräte und Einrichtung',
      'Einfache und digitale Terminvergabe'
    ]
  }
};
