import { Link } from 'react-router';
import { Users, Target, Heart, ShieldCheck, Lightbulb, Award, Calendar, MapPin, Activity } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Logo from '../components/common/Logo';
import { getYearsOfExperience } from '../data/companyInfo';

export default function UeberUns() {
  const years = getYearsOfExperience();
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "MOVIN Physiotherapie",
      "description": `Innovatives Therapiezentrum in Freiburg und Rust mit über ${years} Jahren Erfahrung.`,
      "url": "https://movin-freiburg.de/ueber-uns/"
    }
  };

  return (
    <>
      <SEO 
        title="Über uns | Das Team von MOVIN Physiotherapie Freiburg"
        description="Erfahre mehr über die Philosophie, das Team und die Geschichte von MOVIN. Dein innovatives Therapiezentrum in Freiburg und am Europa-Park."
        schema={schema}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-light overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Link to="/" className="text-sm font-medium text-dark/60 hover:text-primary mb-6 inline-block transition-colors">
                &larr; Zurück zur Startseite
              </Link>
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">
                Über movin
              </h1>
              <p className="text-xl text-dark/80 leading-relaxed mb-8">
                Seit über {years} Jahren bewegen wir Menschen – innovativ, einfühlsam und mit höchstem therapeutischen Anspruch. An drei Standorten in der Region Freiburg vereinen wir modernste Behandlungsmethoden mit persönlicher Betreuung.
              </p>
              <div className="flex flex-wrap gap-6 text-sm font-medium text-dark/70">
                <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Seit 1998</div>
                <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> 3 Standorte</div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> 30+ Expert:innen</div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <img 
                src="https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_RGB_gradient.png" 
                alt="MOVIN Team" 
                className="rounded-3xl shadow-2xl w-full object-contain bg-white p-12 h-[400px] dark:hidden"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_1C_pos.png" 
                alt="MOVIN Team" 
                className="rounded-3xl shadow-2xl w-full object-contain bg-white p-12 h-[400px] hidden dark:block"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Werte */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Unsere Werte</h2>
            <p className="text-lg text-dark/70">Was uns antreibt und was uns besonders macht.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Leidenschaft', desc: 'Wir lieben, was wir tun - und das spüren unsere Patient:innen.' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Moderne Therapiekonzepte und digitale Lösungen für bestmögliche Ergebnisse.' },
              { icon: Users, title: 'Teamgeist', desc: 'Interdisziplinäre Zusammenarbeit für ganzheitliche Behandlung.' },
              { icon: Award, title: 'Qualität', desc: 'Kontinuierliche Fortbildung und höchste therapeutische Standards.' }
            ].map((wert, i) => (
              <div key={i} className="bg-light rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-transparent hover:border-primary/10">
                <div className="w-14 h-14 mx-auto bg-mint rounded-2xl flex items-center justify-center text-primary mb-6">
                  <wert.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{wert.title}</h3>
                <p className="text-dark/70">{wert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophie (Kept from original because it adds value) */}
      <section className="section-padding bg-light border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Unsere Philosophie: Salutogenese</h2>
              <p className="text-lg text-dark/80 leading-relaxed mb-6">
                Wir behandeln nicht nur Symptome, wir suchen nach der Ursache. Unser Leitbild "Salutogenese – Hilfe zur Selbsthilfe" bedeutet für uns, dass wir dich aktiv in den Heilungsprozess einbinden.
              </p>
              <p className="text-lg text-dark/80 leading-relaxed mb-8">
                Mit modernster Diagnostik, KI-gestützter Therapie und unserer hauseigenen MOVIN App geben wir dir die Werkzeuge an die Hand, um langfristig gesund und schmerzfrei zu bleiben.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Ganzheitlich</h4>
                    <p className="text-sm text-dark/70">Körper und Geist im Einklang.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Evidenzbasiert</h4>
                    <p className="text-sm text-dark/70">Wissenschaftlich fundierte Methoden.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4" />
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" 
                alt="Physiotherapeut bei der Arbeit" 
                className="relative z-10 rounded-3xl shadow-xl object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Geschichte */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Unsere Geschichte</h2>
            <p className="text-lg text-dark/70">Von einer Vision zu drei Standorten - unser Weg seit der Gründung.</p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-[20px] md:left-[50%] top-2 bottom-2 w-px bg-primary/20 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {[
                { year: '1998', title: 'Gründung', desc: 'Gründung der ersten Praxis mit der Vision, Physiotherapie moderner zu gestalten.', align: 'right' },
                { year: '2003', title: 'Lorettoberg', desc: 'Umzug in die heutigen Haupträume am Lorettoberg – unser Herzstück in Freiburg.', align: 'left' },
                { year: '2008', title: 'Wachstum', desc: 'Deutliche Teamerweiterung und Wachstum, um der steigenden Nachfrage gerecht zu werden.', align: 'right' },
                { year: '2019', title: 'Movin am Mooswald', desc: 'Eröffnung des Standorts Movin am Mooswald im Westen Freiburgs.', align: 'left' },
                { year: '2024', title: 'Europa-Park Standort', desc: 'Eröffnung des Standorts am Europa-Park in Rust für spezialisierte Sportphysiotherapie.', align: 'right' },
                { year: '2025', title: 'MOVIN Digital', desc: 'Launch von MOVIN Digital und der neuen MOVIN App für eine hybride Patientenversorgung.', align: 'left' },
                { year: '2026', title: 'Zukunft', desc: 'Umfassende Modernisierung und Rebranding für die Physiotherapie von morgen.', align: 'right' }
              ].map((item, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-[20px] md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 mt-2 md:mt-0 border-4 border-white box-content z-10"></div>
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${item.align === 'left' ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className={`text-left ${item.align === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-primary font-bold text-sm mb-1 block">{item.year}</span>
                      <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                      <p className="text-dark/70">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-light border-t border-border">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Unser Team</h2>
            <p className="text-lg text-dark/70">Erfahrene Therapeut:innen und Spezialist:innen für Ihre Gesundheit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Prof. Dr. Martin Klein', 
                category: 'Gründer & Wissenschaftliche Leitung', 
                role: 'Facharzt für Orthopädie und Unfallchirurgie, Chirurgie, Sportmedizin, Rehabilitationswesen', 
                spec: 'Beratung und Behandlung von Privatpatienten, Dozent, Studienleitung ISBA', 
                image: '/images/team/martin-klein.jpg' 
              },
              { 
                name: 'Daniel Klein', 
                category: 'Geschäftsleitung', 
                role: 'Physiotherapeut / Fachkraft betriebliches Gesundheitsmanagement', 
                spec: 'Schulter / Knie / Kiefer', 
                image: '/images/team/daniel-klein.jpg' 
              },
              { 
                name: 'Maik Forsbach', 
                category: 'Anmeldung / Verwaltung', 
                role: 'Bürokaufmann / Wirtschaftsfachwirt (IHK)', 
                spec: 'Verwaltung / Rezeption', 
                image: '/images/team/maik-forsbach.jpg' 
              },
              { 
                name: 'Mareike Klein', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Knie / Sprunggelenk / Kiefer', 
                image: '/images/team/mareike-klein.jpg' 
              },
              { 
                name: 'Francisca Yanes Yanes', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Wirbelsäule / Schulter / Hüfte', 
                status: 'Mutterschutz', 
                image: '/images/team/francisca-yanes-yanes.jpg' 
              },
              { 
                name: 'Desiree Wiegel', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin B.A.', 
                spec: 'Schulter / Fuß / Knie', 
                image: '/images/team/desiree-wiegel.jpg' 
              },
              { 
                name: 'Jana Züge', 
                category: 'Anmeldung / Verwaltung', 
                role: 'Hotelkauffrau', 
                spec: 'Verwaltung / Anmeldung', 
                image: '/images/team/jana-zuege.jpg' 
              },
              { 
                name: 'Claudia Andrich', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Kiefer / Rücken / Knie', 
                image: '/images/team/claudia-andrich.jpg' 
              },
              { 
                name: 'Lina Haberstroh', 
                category: 'Anmeldung / Verwaltung', 
                role: 'Rezeptionistin', 
                spec: 'Anmeldung', 
                image: '/images/team/lina-haberstroh.jpg' 
              },
              { 
                name: 'Mareike Strittmatter', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin B.Sc.', 
                spec: 'Hüfte / Rücken / Knie', 
                image: '/images/team/mareike-strittmatter.jpg' 
              },
              { 
                name: 'Jonas Wolfert', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeut', 
                spec: 'Knie / Schulter / Hüfte', 
                image: '/images/team/jonas-wolfert.jpg' 
              },
              { 
                name: 'Olga Schmidt', 
                category: 'Anmeldung / Verwaltung', 
                role: 'Kauffrau', 
                spec: 'Verwaltung / Anmeldung', 
                image: '/images/team/olga-schmidt.jpg' 
              },
              { 
                name: 'Senka Dizdarevic', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Stationäre Versorgung', 
                image: '/images/team/senka-dizdarevic.jpg' 
              },
              { 
                name: 'Ellen Heilmann', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Orthopädie / Station / Intensiv', 
                image: '/images/team/ellen-heilmann.jpg' 
              },
              { 
                name: 'Maximilian Schmidt', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeut', 
                spec: 'Hand / Knie / Hüfte', 
                image: '/images/team/maximilian-schmidt.jpg' 
              },
              { 
                name: 'Daniela Fichter', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Knie / Hüfte / Sprunggelenk', 
                image: '/images/team/daniela-fichter.jpg' 
              },
              { 
                name: 'Elina Kovacs', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin & Osteopathin', 
                spec: 'Hws / Knie / Hüfte', 
                image: '/images/team/elina-kovacs.jpg' 
              },
              { 
                name: 'Heidrun Brinkmann', 
                category: 'Anmeldung / Verwaltung', 
                role: 'Bankkauffrau', 
                spec: 'Verwaltung / Abrechnung / Terminierung', 
                image: '/images/team/heidrun-brinkmann.jpg' 
              },
              { 
                name: 'Max Stöhr', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeut', 
                spec: 'Knie / Hüfte / Sprunggelenk', 
                image: '/images/team/max-stoehr.jpg' 
              },
              { 
                name: 'Julius Leibold', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeut', 
                spec: 'Knie / Fuss / Schulter', 
                image: '/images/team/julius-leibold.jpg' 
              },
              { 
                name: 'Marco Rebstock', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeut', 
                spec: 'Hüfte / Knie / Wirbelsäule', 
                image: '/images/team/marco-rebstock.jpg' 
              },
              { 
                name: 'Bianca Kohler', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Hüfte / Schulter / Knie', 
                image: '/images/team/bianca-kohler.jpg' 
              },
              { 
                name: 'Heather Mitgorden-Keller', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Station', 
                image: '/images/team/heather-mitgorden-keller.jpg' 
              },
              { 
                name: 'Laura Walter', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Hüfte / Schulter / Knie', 
                image: '/images/team/laura-walter.jpg' 
              },
              { 
                name: 'Lea Ruf', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Hüfte / Knie / HWS', 
                image: '/images/team/lea-ruf.jpg' 
              },
              { 
                name: 'Mara Schöneck', 
                category: 'Physiotherapie', 
                role: 'Physiotherapeutin', 
                spec: 'Knie / Hüfte / Wirbelsäule', 
                image: '/images/team/mara-schoeneck.jpg' 
              }
            ].map((member, i) => (
              <div key={i} className="card-base group">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Real Live-Website Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/85 to-secondary/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left border-b-4 border-primary">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-primary font-bold block mb-0.5">Berufsbezeichnung</span>
                        <p className="text-white text-xs font-semibold leading-snug">{member.role}</p>
                      </div>
                      {member.spec && (
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-primary font-bold block mb-0.5">Fachgebiet</span>
                          <p className="text-slate-200 text-xs leading-normal font-medium">{member.spec}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-secondary text-xl mb-1">{member.name}</h4>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-primary font-semibold text-sm">{member.category}</p>
                    {('status' in member) && (member as any).status && (
                      <span className="inline-block self-start px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 text-[11px] font-bold rounded-full uppercase tracking-wider">
                        {(member as any).status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-dark/60 italic text-lg">...und viele weitere engagierte Kolleg:innen an unseren Standorten.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-8">
            <Logo className="h-10 w-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Werden Sie Teil unserer Erfolgsgeschichte</h2>
          <p className="text-lg text-dark/70 mb-10">Ob als Patient:in oder als Teil unseres Teams - wir freuen uns auf Sie.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/termin/" className="btn-cta-cheetah text-base font-medium px-8 py-3 rounded-full">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Termin vereinbaren
              </span>
            </Link>
            <Link to="/" className="bg-white text-secondary border border-border hover:border-dark/30 transition-colors rounded-full text-base font-medium px-8 py-3 text-center shadow-sm">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
