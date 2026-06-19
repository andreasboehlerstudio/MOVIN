import { Link } from 'react-router';
import SEO from '../components/seo/SEO';
import { useCookieConsent } from '../components/gdpr/CookieContext';
import { RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';

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
            <div className="bg-white p-6 rounded-2xl border border-border mb-10">
              <div className="flex items-center gap-3 mb-3 text-primary">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-xl font-bold text-secondary m-0">Datenschutz auf einen Blick</h2>
              </div>
              <p className="mb-0 text-dark/75">
                Wir verarbeiten personenbezogene Daten nur, wenn dies für den Besuch der Website, die Bearbeitung Ihrer Anfrage, Ihre Bewerbung oder die Vorbereitung Ihrer Behandlung erforderlich ist. Bei Formularen informieren wir zusätzlich direkt am Formular über Zweck, Empfänger und Widerruf.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">1. Verantwortliche Stelle</h2>
            <p className="mb-4">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mb-4">
              Therapiezentrum Lorettoberg GmbH<br />
              Mercystraße 14<br />
              79100 Freiburg im Breisgau<br />
              Telefon: +49 761 707 33 66<br />
              E-Mail: info@movin-freiburg.de
            </p>
            <p className="mb-4">
              Weitere Angaben finden Sie im <Link to="/impressum/" className="text-primary hover:underline">Impressum</Link>.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">2. Allgemeine Datenverarbeitung beim Websitebesuch</h2>
            <p className="mb-4">
              Beim Aufruf der Website können technische Zugriffsdaten verarbeitet werden, zum Beispiel Browsertyp, Betriebssystem, Uhrzeit des Seitenaufrufs, IP-Adresse und aufgerufene Seiten. Diese Daten sind erforderlich, um die Website technisch bereitzustellen, stabil zu betreiben und Missbrauch zu erkennen.
            </p>
            <p className="mb-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb der Website.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">3. Cookies und Einwilligungen</h2>
            <p className="mb-4">
              Unsere Internetseiten verwenden Cookies. Technisch notwendige Cookies dienen dem Betrieb der Website. Weitere Dienste werden nur nach Ihrer Einwilligung aktiviert, soweit eine Einwilligung erforderlich ist. Sie können Ihre Cookie-Entscheidung jederzeit widerrufen oder ändern.
            </p>

            <div className="bg-mint/10 p-6 rounded-2xl border border-mint/30 my-8">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <RefreshCw className="w-6 h-6" />
                <h3 className="font-bold text-secondary m-0">Einwilligungen zurücksetzen</h3>
              </div>
              <p className="text-sm text-dark/70 mb-6">
                Durch Klicken auf den folgenden Button werden Ihre Cookie-Einstellungen gelöscht und das Auswahl-Banner wird beim nächsten Seitenaufruf erneut angezeigt.
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

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">4. Kontaktformular und allgemeine Anfragen</h2>
            <p className="mb-4">
              Wenn Sie das Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten, insbesondere Name, E-Mail-Adresse, Telefonnummer, gewünschter Standort und Nachricht.
            </p>
            <p className="mb-4">
              Zweck der Verarbeitung ist die Bearbeitung Ihrer Anfrage, die Termin- oder Leistungsabstimmung und die Beantwortung möglicher Rückfragen. Die Anfrage wird an kontakt@movin-freiburg.de übermittelt. Zugriff erhalten nur die zuständigen Personen bei MOVIN sowie eingesetzte technische Dienstleister, zum Beispiel Hosting- oder E-Mail-Dienstleister.
            </p>
            <p className="mb-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Termin oder eine Behandlung gerichtet ist, sowie Art. 6 Abs. 1 lit. f DSGVO für die allgemeine Kommunikation. Wenn am Formular eine Einwilligung abgefragt wird, erfolgt die Verarbeitung zusätzlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p className="mb-4">
              Kontaktanfragen werden gelöscht, sobald sie abschließend bearbeitet wurden und keine gesetzlichen Aufbewahrungsfristen oder berechtigten Nachweise mehr entgegenstehen. In der Regel erfolgt dies spätestens nach sechs Monaten, sofern kein Vertrags- oder Behandlungsverhältnis entsteht.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">5. Karriereformular und Bewerbungsupload</h2>
            <p className="mb-4">
              Wenn Sie sich über das Karriereformular bewerben, verarbeiten wir Ihre Angaben aus dem Formular sowie den hochgeladenen PDF-Lebenslauf. Dazu können Name, Kontaktdaten, gewünschte Stelle, Einstiegstermin, Nachricht, Qualifikationen, beruflicher Werdegang, Dateiname, Dateigröße und technische Upload-Informationen gehören.
            </p>
            <p className="mb-4">
              Zweck der Verarbeitung ist die Durchführung des Bewerbungsverfahrens und die Entscheidung über eine mögliche Beschäftigung. Die Bewerbung wird an daniel.klein@movin-freiburg.de übermittelt und intern nur den Personen zugänglich gemacht, die am Bewerbungsprozess beteiligt sind. Technische Dienstleister können im Rahmen von Hosting, Formularverarbeitung und E-Mail-Versand eingebunden sein.
            </p>
            <p className="mb-4">
              Rechtsgrundlage ist § 26 BDSG in Verbindung mit Art. 6 Abs. 1 lit. b DSGVO. Soweit Sie freiwillig besondere Kategorien personenbezogener Daten übermitteln, zum Beispiel Gesundheitsdaten, bitten wir Sie, nur erforderliche Informationen einzureichen. Eine Verarbeitung erfolgt dann nur im Rahmen des Bewerbungsverfahrens und nach Maßgabe der gesetzlichen Grundlagen.
            </p>
            <p className="mb-4">
              Bewerbungsunterlagen werden bei einer Absage in der Regel spätestens sechs Monate nach Abschluss des Bewerbungsverfahrens gelöscht, sofern keine längere Aufbewahrung mit Ihrer Einwilligung vereinbart wurde oder gesetzliche Gründe entgegenstehen. Kommt ein Beschäftigungsverhältnis zustande, werden erforderliche Daten in die Personalakte übernommen.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">6. Digitaler Anamnesebogen und Gesundheitsdaten</h2>
            <p className="mb-4">
              Wenn Sie den digitalen Anamnesebogen nutzen, verarbeiten wir Ihre Angaben zu Person, Kontakt, Beschwerden, Symptomen, Diagnosen, Medikamenten, Körpermarkierungen, Lebenssituation und Therapiezielen. Aus Ihren Angaben wird ein PDF erzeugt und an anamnesebogen@movin-freiburg.de übermittelt.
            </p>
            <p className="mb-4">
              Zweck der Verarbeitung ist die Vorbereitung, Durchführung und Dokumentation Ihrer physiotherapeutischen Behandlung. Zugriff erhalten die zuständigen Mitarbeiterinnen und Mitarbeiter von MOVIN, die an Terminvorbereitung, Behandlung oder Praxisorganisation beteiligt sind. Technische Dienstleister können im Rahmen von Hosting, Formularverarbeitung und E-Mail-Versand eingebunden sein.
            </p>
            <p className="mb-4">
              Gesundheitsdaten sind besonders geschützt. Die Verarbeitung erfolgt, soweit sie für die Gesundheitsversorgung und Behandlung erforderlich ist, auf Grundlage von Art. 9 Abs. 2 lit. h DSGVO in Verbindung mit den einschlägigen berufs- und sozialrechtlichen Vorgaben. Soweit für die digitale Übermittlung eine Einwilligung eingeholt wird, erfolgt diese zusätzlich auf Grundlage von Art. 6 Abs. 1 lit. a und Art. 9 Abs. 2 lit. a DSGVO.
            </p>
            <p className="mb-4">
              Wird der Anamnesebogen Teil Ihrer Patientendokumentation, gelten die gesetzlichen und berufsrechtlichen Aufbewahrungsfristen, regelmäßig bis zu zehn Jahre. Kommt kein Behandlungsverhältnis zustande, werden die Daten gelöscht, sobald sie für die Anfrage oder Terminvorbereitung nicht mehr erforderlich sind und keine gesetzlichen Gründe entgegenstehen.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">7. E-Mail-Versand, Empfänger und Auftragsverarbeitung</h2>
            <p className="mb-4">
              Formulardaten werden technisch über den Website-Server verarbeitet und anschließend per E-Mail an die jeweils zuständige MOVIN-Adresse weitergeleitet. Je nach technischer Einrichtung können Hosting-, Server-, E-Mail- und Wartungsdienstleister Daten im Rahmen einer Auftragsverarbeitung verarbeiten. Mit solchen Dienstleistern werden, soweit erforderlich, Verträge zur Auftragsverarbeitung geschlossen.
            </p>
            <p className="mb-4">
              Die Übermittlung erfolgt zweckgebunden. Eine Weitergabe an Dritte zu Werbezwecken findet nicht statt.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">8. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt.
            </p>
            <p className="mb-4">
              Bei Gesundheits- oder Behandlungsdaten kann eine sofortige Löschung eingeschränkt sein, wenn gesetzliche Dokumentations- oder Aufbewahrungspflichten bestehen.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-border my-8">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Trash2 className="w-6 h-6" />
                <h3 className="font-bold text-secondary m-0">Datenlöschung anfordern</h3>
              </div>
              <p className="text-sm text-dark/70 mb-6">
                Möchten Sie eine Auskunft oder Löschung Ihrer gespeicherten Daten anfragen, senden Sie uns bitte eine kurze E-Mail mit dem Betreff "Datenschutzanfrage".
              </p>
              <a
                href="mailto:datenschutz@movin-freiburg.de?subject=Datenschutzanfrage"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-primary transition-colors"
              >
                Datenschutzanfrage per E-Mail stellen
              </a>
            </div>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">9. Beschwerderecht</h2>
            <p className="mb-4">
              Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt.
            </p>

            <p className="mt-12 text-sm text-dark/60">
              Stand: 18. Juni 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
