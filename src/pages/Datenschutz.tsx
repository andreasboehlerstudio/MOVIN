import { Link } from 'react-router';
import SEO from '../components/seo/SEO';
import { useCookieConsent } from '../components/gdpr/CookieContext';
import { Trash2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Datenschutz() {
  const { resetConsent } = useCookieConsent();

  return (
    <>
      <SEO 
        title="Datenschutzerklärung | MOVIN Physiotherapie"
        description="Datenschutzerklärung der MOVIN (Therapiezentrum Lorettoberg GmbH) in Freiburg."
      />

      <section className="pt-32 pb-20 bg-light min-h-[60vh]">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-12 text-gradient-teal-mint">Datenschutzerklärung</h1>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Datenerfassung auf dieser Website</h3>
            <p className="mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <p className="mb-4">
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
              <br />
              Therapiezentrum Lorettoberg GmbH<br />
              Mercystraße 14<br />
              79100 Freiburg im Breisgau<br />
              <br />
              Telefon: +49 761 707 33 66<br />
              E-Mail: info@movin-freiburg.de
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">3. Ihre Rechte als betroffene Person</h2>
            <p className="mb-4">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Recht auf Löschung („Recht auf Vergessenwerden“)</h3>
            <p className="mb-4">
              Sie können von uns verlangen, dass Ihre personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der gesetzlich vorgesehenen Gründe zutrifft und die Verarbeitung nicht erforderlich ist.
            </p>
            
            <div className="bg-white p-6 rounded-2xl border border-border my-8">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Trash2 className="w-6 h-6" />
                <h4 className="font-bold text-secondary">Datenlöschung anfordern</h4>
              </div>
              <p className="text-sm text-dark/70 mb-6">
                Möchten Sie, dass wir Ihre bei uns gespeicherten Daten (z.B. aus Kontaktanfragen) löschen? Bitte senden Sie uns eine kurze E-Mail mit dem Betreff "Datenlöschung" an:
              </p>
              <a 
                href="mailto:datenschutz@movin-freiburg.de?subject=Antrag%20auf%20Datenl%C3%B6schung" 
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-primary transition-colors"
              >
                Löschantrag per E-Mail stellen
              </a>
            </div>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Cookie-Einstellungen verwalten</h3>
            <p className="mb-4">
              Sie können Ihre hier getroffenen Cookie-Entscheidungen jederzeit widerrufen oder ändern.
            </p>
            
            <div className="bg-mint/10 p-6 rounded-2xl border border-mint/30 my-8">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <RefreshCw className="w-6 h-6" />
                <h4 className="font-bold text-secondary">Einwilligungen zurücksetzen</h4>
              </div>
              <p className="text-sm text-dark/70 mb-6">
                Durch Klicken auf den folgenden Button werden alle Ihre Cookie-Einstellungen gelöscht und das Auswahl-Banner wird beim nächsten Seitenaufruf erneut angezeigt.
              </p>
              <button 
                onClick={() => {
                  resetConsent();
                  window.location.reload();
                }}
                className="inline-flex items-center gap-2 bg-white border border-border text-secondary px-6 py-3 rounded-full font-bold hover:bg-light transition-colors"
              >
                Cookie-Einstellungen zurücksetzen
              </button>
            </div>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">4. Datenerfassung auf dieser Website</h2>
            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Kontaktformular</h3>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            
            {/* Add more privacy policy sections as needed */}
            <p className="mt-12 text-sm text-dark/60">
              Stand: [Datum einfügen]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
