# MOVIN Website Redesign

Pre-Live-Website fuer MOVIN Physiotherapie Freiburg und Rust.

Die Website bildet die neue digitale MOVIN Markenwelt ab: Physiotherapie, Training, Standorte, Karriere, MOVIN App, KI-gestuetzte Physiotherapie, digitale Anamnese und Kontakt-/Bewerbungsprozesse.

## Website und App

Die Seite ist als moderne React/Vite-Anwendung aufgebaut und verbindet klassische Website-Inhalte mit digitalen Services von MOVIN:

- Leistungsseiten fuer Therapie, Training, Praevention, Sportphysiotherapie, KGG, MTT, SensoPro, Skillcourt und weitere Angebote.
- Standortseiten fuer Lorettoberg, Mooswald und Europa-Park Rust mit Team, Galerie, Kontakt und lokalen SEO-Daten.
- MOVIN App Bereich mit App-Screens, Feature-Videos und Download-Verweisen.
- Digitale Services wie Anamnesebogen, KI-gestuetzte Physiotherapie und Formularstrecken.
- Karrierebereich mit Stellenangeboten, PDF-Downloads und Bewerbungsupload.
- SEO-Grundlage mit Canonicals, strukturierten Daten, Sitemap-Logik und lokalen Landingpages.

## Aktueller Stand

- Aktuelle Version: `1.1.17-staging.2`
- Letzter Release-Tag: `v1.1.17-staging.2`
- Branch: `develop`
- Projektstatus: Pre-Live / fortlaufende Kundekorrekturen

## Changelog

Das vollstaendige Changelog liegt in [CHANGELOG.md](./CHANGELOG.md).

### [1.1.17-staging.2] - 2026-07-12

- Staging-Deployment nach Korrektur des relativen FTP-Zielverzeichnisses erneut ausgeloest.
- Upload verwendet weiterhin das isolierte GitHub-Environment `Staging`; die Ordnerstruktur wird nun vom dort gesetzten `FTP_TARGET_DIR` bestimmt.
- Keine inhaltlichen Website-Aenderungen gegenueber `1.1.17-staging.1`.

### [1.1.17-staging.1] - 2026-07-11

- Dauerhaften Branch `develop` fuer gepruefte Staging-Staende eingefuehrt.
- Eigenen GitHub-Actions-Workflow fuer automatische Deployments in das Environment `Staging` angelegt.
- Staging-Deployment verwendet ausschliesslich die im Environment `Staging` hinterlegten SFTP-/FTPS-Secrets.
- Production-Workflow bleibt auf `main` und das Environment `Production` begrenzt.

### [1.1.16] - 2026-07-11

- IONOS-Staging unter `staging.movin-freiburg.de` technisch geprueft: Startseite, HTTPS und Assets funktionieren.
- Apache-Rewrite um die von IONOS benoetigte `RewriteBase` ergaenzt, damit direkte React-Unterseiten nicht mehr mit Fehler 500 abbrechen.
- API-Pfade vom statischen React-Fallback ausgenommen.
- Staging-Subdomain per `X-Robots-Tag` auf `noindex, nofollow` gesetzt, ohne die spaetere Produktionsdomain zu blockieren.

### [1.1.15] - 2026-07-10

- Ersten GitHub-Actions-Deploymentlauf ausgewertet: Secrets, Installation, TypeScript-Pruefung und Build wurden erfolgreich bestaetigt.
- Pfaduebergabe an den SFTP-/FTPS-Client korrigiert, damit der erzeugte `dist`-Ordner ohne literal interpretierte Anfuehrungszeichen hochgeladen wird.

### [1.1.14] - 2026-07-10

- Automatisches Production-Deployment zu IONOS ueber GitHub Actions vorbereitet.
- Deployment unterstuetzt SFTP auf Port 22 sowie FTPS auf Port 21 und nutzt ausschliesslich geschuetzte Environment-Secrets.
- Build, TypeScript-Pruefung und Vollstaendigkeitspruefung der Deployment-Konfiguration laufen vor jedem Upload.
- Apache-Fallback fuer direkte Aufrufe der React-Unterseiten sowie die bestehende Knie-/Schulter-Weiterleitung ergaenzt.
- Erster Upload arbeitet ohne Remote-Loeschungen, damit der vorhandene Webspace kontrolliert getestet werden kann.

### [1.1.13] - 2026-07-07

- Sprachkonsistenz weiter bereinigt: Startseiten-FAQ und Digital-Anamnesebogen-Kachel auf einheitliche Sie-Ansprache korrigiert.
- Performance-Bundling optimiert: schwere Unterseiten wie Karriere, Anamnesebogen, Training, MOVIN App, KI und Ueber uns werden in eigene Chunks getrennt.
- Podcast- und Instagram-Bereich auf der Startseite werden lazy geladen.
- Build-Warnung zu uebergrossen Haupt-Chunks beseitigt; Haupt-JavaScript deutlich reduziert.
- Datenschutz gegen den digitalen Anamnesebogen geprueft: eigener Abschnitt zu Gesundheitsdaten, PDF-Erzeugung, Empfaenger, Zweck, Dienstleistern und Aufbewahrung ist vorhanden.
- Karriereseite auf Kundenwunsch wieder mit der Bezeichnung "Schueler-/Studenten-Aushilfe (m/w/d)" gefuehrt.

### [1.1.12] - 2026-07-06

- SEO/GEO-Runde umgesetzt: alte Knie-/Schulter-Leistungsseite entfernt, Sitemap aktualisiert und 301-Weiterleitung auf die Leistungsuebersicht vorbereitet.
- Doppelte Meta-Description im serverseitigen Rendering bereinigt.
- Standortseiten mit erweiterten LocalBusiness-Daten fuer Geo-Koordinaten und standortspezifische Einzugsgebiete gestaerkt.
- Leistungsdetailseiten um sichtbare Kurz-FAQ-Bloecke und FAQPage-JSON-LD erweitert.
- Karriereseite alters- und DEI-sensibler formuliert: Aushilfe-Titel neutralisiert, "junges Team" ersetzt, Sie-Ansprache bereinigt und Gleichbehandlungssatz ergaenzt.

### [1.1.11] - 2026-07-06

- MOVIN-App-Videos im Bereich "Die App in Aktion" als reine Autoplay-Darstellung gesetzt, damit Touch-Scrolling auf Mobile nicht mehr am Handyvideo haengen bleibt.

### [1.1.10] - 2026-07-06

- MOVIN-App-Feature-Videos responsiv geprueft und die Videodarstellung so angepasst, dass Videos und Fallbacks auf Mobile, Tablet und Desktop proportional bleiben und nicht aus der sichtbaren Hoehe laufen.
- Ueber-uns-Grafik "Der Mensch im Mittelpunkt" responsiv nachjustiert: mehr Abstand um das Zentrum, keine Bubble-Ueberlappungen und ruhigere Typografie im Zentrum.

### [1.1.9] - 2026-07-05

- Neue Standortvideos fuer Lorettoberg, Mooswald und Europa-Park Rust DSGVO-konform eingebunden.
- Mobile Darstellung im MOVIN-App-Bereich "Die App in Aktion" korrigiert, damit das Handyvideo nicht mehr abgeschnitten wird.
- Skillcourt-Bild auf der Trainingsseite auf das originale Kundenmotiv umgestellt und als optimiertes WebP eingebunden.

### [1.1.8] - 2026-07-03

- FAQ-Seite mit neuen und aktualisierten Antworten zu Rezeptpflicht, Selbstzahlern, Beschwerdebildern, MLD, Kindern/Jugendlichen, Hausbesuchen, Oeffnungszeiten und Rust ergaenzt.
- MOVIN-App-Mockup aktualisiert und auf der Startseite mit Scroll-/Floating-Animation versehen.
- KI-Physiotherapie-Abschnitt "Mensch und Technologie" ueberarbeitet.
- Leistungsseite bereinigt: Knie-/Schulter-Verweise entfernt, Lymphdrainage-Texte und Checkpunkte aktualisiert, Personal-Training-Text bereinigt.
- Training korrigiert: Y-Balance-Test-Bild zu Return to Work/Sport/Competition verschoben, Skillcourt-Bild wiederhergestellt und optisch kraeftiger bearbeitet.
- Karriereseite bereinigt: Taetigkeitsfelder wieder auf fuenf reduziert und Bewerbungsformular-Platzhalter neutralisiert.
- WhatsApp-CTA auf die neue Mobilnummer umgestellt.

### [1.1.7] - 2026-07-03

- Social-/WhatsApp-Previewbild auf das neue Mareike/MOVIN-Motiv umgestellt.
- Preview-Bild als optimiertes 1200x630 JPEG unter `/og-image.jpg` bereitgestellt.
- Trainingsseite nutzt dasselbe Motiv als optimiertes Hero-WebP.
- GA4 Property ID `543894426` und Service-Account-E-Mail fuer das interne Analytics-Dashboard dokumentiert.
- Hinweis zur Aktivierung der Google Analytics Data API im Google-Cloud-Projekt `movin-501211` ergaenzt.

### [1.1.6] - 2026-07-02

- Interne Unterseite `/intern/google-statistiken/` fuer Google-Analytics-Kennzahlen angelegt.
- Server-API fuer echte GA4 Data API Werte vorbereitet.
- Dashboard mit Zugriffscode, Zeitraum-Auswahl, Kennzahlenkarten, Tagesverlauf, Quellen, Geraeten und Top-Seiten umgesetzt.
- Dashboard auf `noindex, nofollow` gesetzt.
- `.env.example` und README um die benoetigten GA4-/Service-Account-Variablen erweitert.

### [1.1.5] - 2026-07-02

- Social-Preview-Bild fuer geteilte Links auf die MOVIN Bildmarke mit weissem Hintergrund umgestellt.
- Open-Graph- und Twitter-Metadaten fuer WhatsApp, LinkedIn, Facebook und weitere Link-Vorschauen ergaenzt.
- Google Analytics / GA4 Tag `G-ZS80MQPC9Z` eingebunden.
- GA4 wird erst nach aktiver Zustimmung zur Kategorie "Analyse & Statistik" geladen.
- Datenschutzseite und Cookie-Banner entsprechend aktualisiert.

### [1.1.4] - 2026-07-02

- Startseiten-Loader mit neuem MOVIN SVG-Logo aufgebaut.
- Logoanimation verfeinert: erst die vier linken Swipes der Bildmarke, danach Figur, Wortmarke und Claim.
- Loader-Intro ruhiger gestaltet: Page-Transition-Farbverlauf blendet ein, danach animiert das Logo.
- Medienbestand weiter optimiert und WebP-/MP4-Assets fuer bessere Ladezeiten nachgezogen.
- Datenschutz-/Cookie- und Inhaltskorrekturen aus der laufenden Kundenabstimmung weiter gepflegt.

### [1.1.3] - 2026-07-01

- Mooswald-Galerie: leeres Trainingsraumbild durch ein aktiveres MAM-Bild mit Betreuung am Trainingsgeraet ersetzt.
- Neues Mooswald-Bild als optimiertes WebP im Website-Asset-Ordner abgelegt.

### [1.1.2] - 2026-07-01

- Neues iPhone-Mockup fuer den MOVIN App Bereich auf der Startseite eingebunden.
- Dasselbe Mockup im Hero Header der MOVIN App Detailseite verwendet.
- App-Mockup-Asset in den Website-Bilderordner uebernommen und Alt-Texte angepasst.

### [1.1.1] - 2026-06-30

- Globale Page-Transition fuer interne Seitenwechsel erweitert.
- Terminseite bereinigt: Doctolib-Verweise entfernt, Standortbuttons fuehren jetzt zur MOVIN App Download-Box.
- Karriere-Video auf datenschutzfreundliche `youtube-nocookie`-Einbindung umgestellt.
- YouTube-Fallbacktext auf der Karriereseite neutralisiert.
- README fuer GitHub mit Website-/App-Beschreibung, Changelog-Auszug und Versionierungsregeln neu aufgebaut.

### [1.1.0] - 2026-06-29

- MOVIN App-Bereich mit neuen App-Screens, perspektivischem Smartphone-Mockup und aktualisierten Feature-Medien ueberarbeitet.
- Teamdarstellung auf der Ueber-uns-Seite mit Standortdaten abgeglichen und als bewegter Designvorschlag mit Freistellern und Light-Trails weiterentwickelt.
- Standortbilder fuer Lorettoberg, Mooswald und Rust aktualisiert.
- Leistungs- und Trainingsseiten visuell ueberarbeitet, inklusive neuer Hero-Bilder, besserer Kontraste und vereinfachter PDF-/Download-Logik.
- Karrierebereich mit PDF-Downloads, Formularhinweisen, Stellenangeboten und einheitlicher Ansprache weiter finalisiert.
- Reviews, SEO-Grundlagen, strukturierte Daten, Medienoptimierungen und Formularziele weiter gepflegt.

### [1.0.0] - 2026-06-19

- Erster versionierter Pre-Live-Stand nach umfangreicher Umsetzung der Kundekorrekturen.
- KI-Physiotherapie, Training, Karriere, MOVIN App, Ueber uns, Leistungen und Standorte in das neue Design uebertragen.
- Medien, PDFs, App-Videos, SEO-Struktur, Formularziele und Datenschutzgrundlagen ergaenzt.
- Build-, Lint- und lokale Seitenpruefungen erfolgreich abgeschlossen.

## Versionierung

Bei jedem Push auf GitHub wird kuenftig mitgepflegt:

1. `CHANGELOG.md` aktualisieren.
2. README-Changelog-Auszug aktualisieren.
3. Version in `package.json` hochsetzen.
4. Commit erstellen.
5. Git-Tag setzen, zum Beispiel `v1.1.1`.
6. Branch und Tag pushen.

Kleine Korrekturen werden als Patch-Versionen gefuehrt, zum Beispiel `1.1.1`. Groessere neue Seiten oder Funktionsbloecke werden als Minor-Versionen gefuehrt, zum Beispiel `1.2.0`.

## Lokal starten

**Voraussetzung:** Node.js

```bash
npm install
npm run dev
```

Lokale URL:

```text
http://localhost:3000/
```

## Internes Analytics-Dashboard

Die interne Unterseite fuer Google Analytics Kennzahlen ist erreichbar unter:

```text
/intern/google-statistiken/
```

Damit echte GA4-Daten angezeigt werden, muessen serverseitig folgende Variablen gesetzt sein:

```text
GA4_PROPERTY_ID=543894426
GOOGLE_SERVICE_ACCOUNT_EMAIL=movin-550@movin-501211.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
ANALYTICS_DASHBOARD_TOKEN=
```

Der Google Service Account muss in der GA4 Property Leserechte erhalten. Zusaetzlich muss im Google-Cloud-Projekt `movin-501211` die Google Analytics Data API aktiviert sein. `ANALYTICS_DASHBOARD_TOKEN` ist der interne Zugriffscode fuer die Dashboard-Seite.

## Qualitaetschecks

Vor Releases oder groesseren Pushes ausfuehren:

```bash
npm run lint
npm run build
```

## Hinweise zum Livegang

- Bestehende Google-URLs sollten erhalten bleiben oder per dauerhaftem `301`/`308` Redirect sauber weitergeleitet werden.
- Besonders wichtig ist die bestehende KI-Physiotherapie-URL, damit vorhandene Rankings nicht verloren gehen.
- Nach dem Deployment sollten Sitemap, Canonicals, Redirects, Kontaktformulare, Uploads und externe Medien live getestet werden.
