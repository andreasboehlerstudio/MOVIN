import { motion } from 'framer-motion';
import { Smartphone, Brain, Activity, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/seo/SEO';

const digitalServices = [
  {
    title: 'MOVIN App',
    description: 'Ihre Therapie für die Hosentasche. Trainingspläne, Fortschritts-Tracking und direkter Chat mit Ihrem Therapeuten.',
    path: '/digital/movin-app',
    icon: Smartphone,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'KI Physiotherapie',
    description: 'Erleben Sie die Zukunft der Bewegung. Intelligente Analyse und KI-gestützte Therapieansätze für maximale Effizienz.',
    path: '/digital/ki-physiotherapie',
    icon: Brain,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Digitaler Anamnesebogen',
    description: 'Bereite Sie optimal auf Ihren Termin vor. Fülle Ihren Anamnesebogen bequem und sicher von zu Hause aus.',
    path: '/digital/anamnesebogen',
    icon: FileText,
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?auto=format&fit=crop&q=80&w=800'
  }
];

export default function DigitalHub() {
  return (
    <>
      <SEO 
        title="Digital | MOVIN Physiotherapie Freiburg"
        description="Entdecken Sie unsere digitalen Services: Von der MOVIN App über KI-gestützte Physiotherapie bis hin zum digitalen Anamnesebogen."
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
            alt="Digital" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-heading font-bold uppercase tracking-widest text-sm mb-4 block">
              Zukunft der Bewegung
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-teal-mint">
              Digital
            </h1>
            <p className="text-xl text-blue-tint/90 leading-relaxed">
              Wir verbinden erstklassige Physiotherapie mit modernster Technologie. Entdecken Sie unsere digitalen Lösungen für einen schnelleren und nachhaltigen Therapieerfolg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={service.path}
                  className="group block bg-white rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-2`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-dark/70 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                      Mehr erfahren <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Quote */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="absolute -top-12 -left-12 text-primary/10">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 3C14.017 1.89543 14.9124 1 16.017 1H19.017C21.2261 1 23.017 2.79086 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V3L1.017 3C1.017 1.89543 1.91243 1 3.017 1H6.017C8.22614 1 10.017 2.79086 10.017 5V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight italic relative z-10">
              "Die Digitalisierung ist für uns kein Selbstzweck, sondern ein Werkzeug, um die Qualität Ihrer Therapie messbar zu steigern und Sie noch individueller zu begleiten."
            </h2>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-16 h-1 bg-primary mb-4" />
              <p className="font-bold text-secondary uppercase tracking-widest text-sm">Das MOVIN Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary to-teal-600 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Haben Sie Fragen zu unseren digitalen Services?</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Unser Team berät Sie gerne dazu, wie Sie die MOVIN App und unsere anderen digitalen Angebote optimal für Ihren Therapieerfolg nutzen können.
              </p>
              <Link to="/kontakt" className="btn-cta-cheetah px-10 py-4 text-lg rounded-full">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Jetzt Kontakt aufnehmen
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
