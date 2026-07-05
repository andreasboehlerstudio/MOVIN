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

- Aktuelle Version: `1.1.9`
- Letzter Release-Tag: `v1.1.9`
- Branch: `main`
- Projektstatus: Pre-Live / fortlaufende Kundekorrekturen

## Changelog

Das vollstaendige Changelog liegt in [CHANGELOG.md](./CHANGELOG.md).

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
