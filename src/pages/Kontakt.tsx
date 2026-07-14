import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    standort: 'lorettoberg',
    privacyAccepted: false,
    _website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/send-contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Kontaktanfrage konnte nicht gesendet werden.');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', standort: 'lorettoberg', privacyAccepted: false, _website: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitError('Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an kontakt@movin-freiburg.de.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Kontakt | MOVIN Physiotherapie Freiburg & Rust"
        description="Kontaktieren Sie MOVIN Physiotherapie in Freiburg oder Rust. Nutzen Sie unser Formular, rufen Sie an oder schreiben Sie eine E-Mail. Wir melden uns schnellstmöglich!"
      />

      {/* Hero */}
      <section className="bg-light py-20 md:py-32 border-b border-border">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gradient-teal-mint">Kontakt</h1>
          <p className="text-xl text-dark/80 leading-relaxed">
            Haben Sie Fragen zu unseren Therapien, möchten Sie einen Termin vereinbaren oder benötigen Sie Hilfe? Wir sind für Sie da.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col: Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8">Unsere Standorte</h2>
                
                <div className="flex flex-col gap-8">
                  {/* Lorettoberg */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-secondary text-lg mb-1">Lorettoberg (Freiburg)</h4>
                      <p className="text-dark/70 mb-2">Mercystrasse 14, 79100 Freiburg</p>
                      <a href="tel:+497617073366" className="flex items-center gap-2 text-primary hover:underline mb-1">
                        <Phone className="w-4 h-4 shrink-0" /> +49 761 707 33 66
                      </a>
                      <a href="mailto:kontakt@movin-freiburg.de" className="flex items-center gap-2 text-primary hover:underline min-w-0">
                        <Mail className="w-4 h-4 shrink-0" /> <span className="min-w-0 break-all">kontakt@movin-freiburg.de</span>
                      </a>
                    </div>
                  </div>

                  {/* Mooswald */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-secondary text-lg mb-1">Mooswald (Freiburg)</h4>
                      <p className="text-dark/70 mb-2">Wirthstraße 9, 79110 Freiburg</p>
                      <a href="tel:+497617073377" className="flex items-center gap-2 text-primary hover:underline mb-1">
                        <Phone className="w-4 h-4 shrink-0" /> +49 761 707 33 77
                      </a>
                      <a href="mailto:physiotherapie.mooswald@movin-freiburg.de" className="flex items-center gap-2 text-primary hover:underline min-w-0">
                        <Mail className="w-4 h-4 shrink-0" /> <span className="min-w-0 break-all">physiotherapie.mooswald@movin-freiburg.de</span>
                      </a>
                    </div>
                  </div>

                  {/* Rust */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-secondary text-lg mb-1">Europa-Park (Rust)</h4>
                      <p className="text-dark/70 mb-2">Peter-Thumb-Str. 8, 77977 Rust</p>
                      <a href="tel:+497617073366" className="flex items-center gap-2 text-primary hover:underline mb-1">
                        <Phone className="w-4 h-4 shrink-0" /> +49 761 707 33 66
                      </a>
                      <a href="mailto:europapark.physio@movin-freiburg.de" className="flex items-center gap-2 text-primary hover:underline min-w-0">
                        <Mail className="w-4 h-4 shrink-0" /> <span className="min-w-0 break-all">europapark.physio@movin-freiburg.de</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-light p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-secondary">Zentrale Öffnungszeiten</h3>
                </div>
                <p className="text-dark/80 mb-2"><strong>Montag - Freitag:</strong> 08:00 - 19:00 Uhr</p>
                <p className="text-dark/80"><strong>Wochenende:</strong> Nach Vereinbarung</p>
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="lg:col-span-7">
              <div className="card-base p-8 md:p-10 shadow-xl">
                <h3 className="text-2xl font-bold text-secondary mb-6">Schreiben Sie uns eine Nachricht</h3>
                
                {isSuccess ? (
                  <div className="bg-mint text-primary p-6 rounded-xl flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Send className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold">Vielen Dank!</h4>
                    <p>Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-secondary">Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          value={formData.name}
                          onChange={handleChange}
                          className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors bg-light"
                          placeholder="Ihr Name"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-secondary">Telefon *</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          required 
                          value={formData.phone}
                          onChange={handleChange}
                          className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors bg-light"
                          placeholder="Ihre Telefonnummer"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-semibold text-secondary">E-Mail *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors bg-light"
                        placeholder="Ihre E-Mail-Adresse"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="standort" className="text-sm font-semibold text-secondary">Gewünschter Standort</label>
                      <select 
                        id="standort" 
                        name="standort" 
                        value={formData.standort}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors bg-light appearance-none"
                      >
                        <option value="lorettoberg">Freiburg - Lorettoberg</option>
                        <option value="mooswald">Freiburg - Mooswald</option>
                        <option value="rust">Europa-Park - Rust</option>
                        <option value="egal">Egal / Keine Präferenz</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-semibold text-secondary">Ihre Nachricht *</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        required 
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors bg-light resize-none"
                        placeholder="Wie können wir Ihnen helfen?"
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3 mt-2">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        checked={formData.privacyAccepted}
                        onChange={(event) => setFormData({ ...formData, privacyAccepted: event.target.checked })}
                        className="mt-1"
                      />
                      <label htmlFor="privacy" className="text-sm text-dark/70">
                        Ich willige ein, dass meine Angaben aus dem Kontaktformular zur Bearbeitung meiner Anfrage an kontakt@movin-freiburg.de übermittelt und verarbeitet werden. Hinweise zu Zweck, Empfängern, Speicherdauer, Widerruf und Löschung finden Sie in unserer <a href="/datenschutz/" className="text-primary hover:underline">Datenschutzerklärung</a>.
                      </label>
                    </div>

                    {submitError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {submitError}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center text-lg py-4 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
