import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, Clock, MapPin, ArrowRight, ClipboardList, Smartphone, Download, Upload, CalendarCheck, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/seo/SEO';

export default function Termin() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Termin buchen | MOVIN Physiotherapie",
    "description": "Buchen Sie jetzt Ihren Termin bei MOVIN Physiotherapie in Freiburg oder Rust. 48h Termingarantie für Neupatienten mit akuten Schmerzen.",
    "url": "https://movin-freiburg.de/termin/"
  };

  return (
    <>
      <SEO 
        title="Termin buchen | MOVIN Physiotherapie Freiburg & Rust"
        description="Buchen Sie jetzt Ihren Termin bei MOVIN Physiotherapie in Freiburg oder Rust. Nutzen Sie unsere 48h Termingarantie für Neupatienten mit akuten Schmerzen."
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            <Calendar className="w-4 h-4" /> Terminvereinbarung
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gradient-teal-mint">Buchen Sie Ihren Termin</h1>
          <p className="text-xl text-dark/80 leading-relaxed">
            Wählen Sie den modernsten Buchungsweg über unsere App oder kontaktieren Sie klassisch telefonisch einen unserer Standorte.
          </p>
        </div>
      </section>

      {/* Booking Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          {/* FIRST & PRINCIPLE OPTION: App Booking & 3-Step Guide */}
          <div className="max-w-5xl mx-auto mb-20 bg-gradient-to-br from-[#0a0f4d] to-secondary rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-20 -translate-y-20 shrink-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00b2ba]/5 rounded-full -translate-x-20 translate-y-20 shrink-0 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                {/* Left text column */}
                <div className="w-full lg:w-1/2">
                  <span className="bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4">
                    Empfohlen & am schnellsten
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-gradient-teal-mint">
                    Termine bequem per MOVIN App buchen
                  </h2>
                  <p className="text-blue-tint/90 text-sm leading-relaxed mb-6">
                    Keine Warteschleifen mehr am Telefon und volle Kontrolle: Verwalten, buchen, verschieben oder stornieren Sie Ihre Physiotherapie-Termine rund um die Uhr direkt über Ihr Smartphone.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/digital/movin-app" className="btn-primary flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Alles über die MOVIN App
                    </Link>
                  </div>
                </div>

                {/* Right app download badges & Scan */}
                <div id="app-download-box" className="w-full lg:w-1/2 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-center">
                  <div id="qr-code-containers" className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 w-full justify-between items-center">
                    
                    {/* iOS Download Section */}
                    <div id="ios-download" className="flex flex-col items-center bg-white/5 rounded-2xl p-4 border border-white/10 w-full sm:w-1/2 lg:w-full xl:w-1/2 transition-colors hover:bg-white/10">
                      <div className="bg-[#ffffff] p-2 rounded-xl shadow-lg shrink-0 flex items-center justify-center mb-3">
                        {isMounted ? (
                          <QRCodeSVG 
                            value="https://apps.apple.com/de/app/movin/id6503604248" 
                            size={120} 
                            level="H" 
                            includeMargin={true}
                            bgColor="#ffffff"
                            fgColor="#0a0f4d"
                          />
                        ) : (
                          <div className="w-[120px] h-[120px] bg-white/10 animate-pulse rounded-lg" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider mb-2">iOS / iPhone</span>
                      <a 
                        href="https://apps.apple.com/de/app/movin/id6503604248" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full py-2 bg-primary hover:bg-primary-hover text-secondary font-heading font-extrabold rounded-xl text-[11px] uppercase tracking-wider text-center transition-all hover:scale-105"
                      >
                        App Store
                      </a>
                    </div>

                    {/* Google Play Section */}
                    <div id="android-download" className="flex flex-col items-center bg-white/5 rounded-2xl p-4 border border-white/10 w-full sm:w-1/2 lg:w-full xl:w-1/2 transition-colors hover:bg-white/10">
                      <div className="bg-[#ffffff] p-2 rounded-xl shadow-lg shrink-0 flex items-center justify-center mb-3">
                        {isMounted ? (
                          <QRCodeSVG 
                            value="https://play.google.com/store/apps/details?id=de.hybric.therapiezentrum_app" 
                            size={120} 
                            level="H" 
                            includeMargin={true}
                            bgColor="#ffffff"
                            fgColor="#0a0f4d"
                          />
                        ) : (
                          <div className="w-[120px] h-[120px] bg-white/10 animate-pulse rounded-lg" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider mb-2">Android / Google</span>
                      <a 
                        href="https://play.google.com/store/apps/details?id=de.hybric.therapiezentrum_app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full py-2 bg-primary hover:bg-primary-hover text-secondary font-heading font-extrabold rounded-xl text-[11px] uppercase tracking-wider text-center transition-all hover:scale-105"
                      >
                        Play Store
                      </a>
                    </div>

                  </div>
                </div>
              </div>

              {/* 3 Steps Section */}
              <div className="mt-12 border-t border-white/10 pt-10">
                <h3 className="text-lg md:text-xl font-bold mb-8 text-center text-white">In 3 Schritten zu Ihrem Wunschtermin</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  
                  {/* Verbindungslinie für Desktops */}
                  <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-[1px] bg-white/15 z-0" />
                  
                  {[
                    {
                      step: '1',
                      title: 'App herunterladen',
                      desc: 'Installieren Sie die kostenfreie MOVIN App auf Ihrem Smartphone aus dem Store.',
                      icon: Download
                    },
                    {
                      step: '2',
                      title: 'Rezept hochladen',
                      desc: 'Fotografieren Sie Ihre Verordnung einfach per App ab oder laden Sie das PDF direkt hoch.',
                      icon: Upload
                    },
                    {
                      step: '3',
                      title: 'Termine erhalten',
                      desc: 'Unser Service-Team schickt Ihnen freie Terminoptionen, die Sie sofort bestätigen können, sowie die Informationen zur gesetzlichen Zuzahlung.',
                      icon: CalendarCheck
                    }
                  ].map((item, index) => {
                    const StepIcon = item.icon;
                    return (
                      <div key={index} className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-secondary-dark border border-primary shadow-inner flex items-center justify-center text-primary-light mb-4 transform hover:scale-110 transition-transform duration-300">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl w-full text-center">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Schritt {item.step}</span>
                          <h4 className="font-bold text-sm text-white mb-1">{item.title}</h4>
                          <p className="text-xs text-blue-tint/75 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 48h Guarantee Banner */}
          <div className="max-w-4xl mx-auto bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-2">48h Termingarantie</h3>
              <p className="text-dark/80">
                Sie haben akute Schmerzen? Wir garantieren Neupatienten einen Ersttermin innerhalb von 48 Stunden an einem unserer drei Standorte. Bitte rufen Sie uns hierfür direkt an!
              </p>
            </div>
            <a href="tel:+497617073366" className="btn-primary shrink-0 md:ml-auto">
              Jetzt anrufen
            </a>
          </div>

          {/* Anamnesebogen Highlight */}
          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/10">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-secondary">Digitaler Anamnesebogen</h3>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">Jederzeit</span>
              </div>
              <p className="text-dark/80">
                Wenn Sie unsere App nicht nutzen, können Sie den Anamnesebogen auch hier online ausfüllen und uns die wichtigsten Informationen vor Ihrem Termin übermitteln.
              </p>
            </div>
            <Link to="/digital/anamnesebogen" className="btn-primary shrink-0 md:ml-auto">
              Anamnesebogen öffnen
            </Link>
          </div>

          {/* Standorte Grid */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-secondary">Klassische Terminvereinbarung</h2>
            <p className="text-dark/70 text-sm mt-3">Sie möchten einen Termin für einen bestimmten Standort vereinbaren? Nutzen Sie die MOVIN App oder rufen Sie direkt am passenden Standort an.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lorettoberg */}
            <div className="card-base p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Lorettoberg</h3>
              <p className="text-dark/60 mb-6">Mercystrasse 14, 79100 Freiburg</p>
              
              <div className="mt-auto flex flex-col gap-4">
                <a href="#app-download-box" className="btn-primary w-full justify-center">
                  App downloaden
                </a>
                <a href="tel:+497617073366" className="btn-outline w-full justify-center">
                  +49 761 707 33 66
                </a>
              </div>
            </div>

            {/* Mooswald */}
            <div className="card-base p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Mooswald</h3>
              <p className="text-dark/60 mb-6">Wirthstraße 9, 79110 Freiburg</p>
              
              <div className="mt-auto flex flex-col gap-4">
                <a href="#app-download-box" className="btn-primary w-full justify-center">
                  App downloaden
                </a>
                <a href="tel:+497617073377" className="btn-outline w-full justify-center">
                  +49 761 707 33 77
                </a>
              </div>
            </div>

            {/* Rust */}
            <div className="card-base p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center text-primary mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Europa-Park</h3>
              <p className="text-dark/60 mb-6">Peter-Thumb-Str. 8, 77977 Rust</p>
              
              <div className="mt-auto flex flex-col gap-4">
                <a href="#app-download-box" className="btn-primary w-full justify-center">
                  App downloaden
                </a>
                <a href="tel:+497617073366" className="btn-outline w-full justify-center">
                  +49 761 707 33 66
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-dark/70 mb-4">
              Sind Sie unsicher, welche Behandlung die richtige für Sie ist?
            </p>
            <Link to="/kontakt" className="flex items-center justify-center gap-2 text-primary font-medium hover:underline">
              Schreiben Sie uns eine Nachricht <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
