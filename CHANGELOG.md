# Changelog

Alle relevanten Aenderungen an der MOVIN Website werden in dieser Datei dokumentiert.

## [1.1.8] - 2026-07-03

### Release-Status
- Patch-Release fuer die aktuelle Kundenkorrekturrunde nach Version 1.1.7.

### Inhalte und Navigation
- FAQ-Seite erweitert und aktualisiert: Privatpatienten/Selbstzahler, Rezeptpflicht, Beschwerdebilder, Manuelle Lymphdrainage, Kinder/Jugendliche, Hausbesuche, Oeffnungszeiten und externe Patientinnen und Patienten in Rust.
- Oeffnungszeiten auf der FAQ-Seite je Standort klarer getrennt dargestellt.
- Knie-/Schulter-Leistung aus Hauptnavigation und Footer entfernt, da diese Leistung nicht mehr gefuehrt wird.
- WhatsApp-Floating-CTA auf die neue Nummer `+49 1523 8060473` umgestellt.

### MOVIN App und KI-Physiotherapie
- Neues MOVIN-App-iPhone-Mockup als optimiertes WebP abgelegt und auf Startseite sowie MOVIN-App-Unterseite eingebunden.
- MOVIN-App-Bild auf der Startseite mit dezenter Scroll- und Floating-Animation versehen.
- MOVIN-App-Stichpunkt im Hero von "Schmerztagebuch" auf "Kontextfaktoren" geaendert.
- KI-Physiotherapie-Abschnitt "Mensch und Technologie" textlich ueberarbeitet und Ueberschrift auf "Der Mensch bleibt im Mittelpunkt." geaendert.

### Leistungen und Training
- Personal-Training-Beschreibung bereinigt und Klammerzusatz entfernt.
- Manuelle Lymphdrainage: Checkpunkte auf "Hands On" und "Hands Off" umgestellt.
- Manuelle-Lymphdrainage-Beschreibung um den aktiven Ansatz durch gezielte Aktivitaet/Kontraktion ergaenzt.
- Training: Y-Balance-Test-Bild zu "Return to Work / Sport / Competition" verschoben.
- Skillcourt wieder mit dem passenden Skillcourt-Bild bebildert.
- Skillcourt-Bild als kraeftigere WebP-Variante mit mehr Kontrast, Farbe und Schaerfe neu abgelegt und eingebunden.

### Karriere
- "Studienleitung Physiotherapie" aus den Taetigkeitsfeldern entfernt und Grid wieder auf fuenf Felder angepasst.
- Bewerbungsformular mit neutralen Platzhaltern fuer Name und Telefonnummer versehen.

### Validierung
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.

## [1.1.7] - 2026-07-03

### Release-Status
- Patch-Release fuer Social Preview, Trainings-Hero und weitere GA4-Dashboard-Konfiguration.

### Social Preview und Training
- Globales Social-/WhatsApp-Previewbild auf das neue Mareike/MOVIN-Motiv umgestellt.
- Open-Graph-Bild weiterhin als optimiertes 1200x630 JPEG unter `/og-image.jpg` bereitgestellt.
- Alt-Text der Social-Metadaten auf "MOVIN Physiotherapie innovativ bewegt" angepasst.
- Dasselbe Motiv als eigenes optimiertes WebP fuer den Hero Header der Trainingsseite erzeugt.
- Trainingsseite auf das neue Hero-Bild umgestellt und als Preload-Bild hinterlegt.

### Analytics Dashboard
- GA4 Property ID `543894426` in README und `.env.example` dokumentiert.
- Service-Account-E-Mail `movin-550@movin-501211.iam.gserviceaccount.com` in README und `.env.example` dokumentiert.
- Hinweis ergaenzt, dass im Google-Cloud-Projekt `movin-501211` die Google Analytics Data API aktiviert sein muss.

### Validierung
- `npm run build` erfolgreich.

## [1.1.6] - 2026-07-02

### Release-Status
- Patch-Release fuer ein internes Google-Analytics-Dashboard.

### Analytics Dashboard
- Interne Unterseite `/intern/google-statistiken/` angelegt.
- Dashboard mit Zugriffscode-Feld, Zeitraum-Auswahl fuer 7, 30 und 90 Tage sowie Karten fuer Nutzer, Sitzungen, Seitenaufrufe, Sitzungsdauer und Engagement Rate ergaenzt.
- Visualisierungen fuer Tagesverlauf, Traffic-Quellen, Geraetetypen und Top-Seiten ergaenzt.
- Seite auf `noindex, nofollow` gesetzt, damit sie nicht in Suchmaschinen erscheint.

### Server und Deployment
- Server-Endpunkt `/api/analytics-summary` fuer die GA4 Data API vorbereitet.
- Zusaetzliche Vercel-kompatible API-Funktion unter `api/analytics-summary.ts` ergaenzt.
- `.env.example` und README um die benoetigten Server-Variablen erweitert.
- Dashboard zeigt einen Setup-Hinweis, solange GA4 Property ID, Service Account und Zugriffscode noch nicht hinterlegt sind.

### Validierung
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.

## [1.1.5] - 2026-07-02

### Release-Status
- Patch-Release fuer Social-Preview und Google Analytics.

### SEO und Social Preview
- Globales Open-Graph- und Twitter-Preview-Bild auf die neue MOVIN Bildmarke mit weissem Hintergrund umgestellt.
- Social-Preview-Metadaten fuer WhatsApp, LinkedIn, Facebook und weitere Link-Vorschauen ergaenzt.
- Preview-Bild als optimiertes 1200x630 JPEG abgelegt.

### Analytics und Datenschutz
- Google Analytics / GA4 Measurement-ID `G-ZS80MQPC9Z` eingebunden.
- Analytics laedt erst nach aktiver Zustimmung zur Kategorie "Analyse & Statistik".
- SPA-Seitenwechsel werden als Pageviews an GA4 gesendet.
- Bei Widerruf werden Analytics deaktiviert und vorhandene `_ga`-Cookies entfernt.
- Cookie-Banner und Datenschutzerklaerung auf die neue GA4-Einbindung angepasst.

### Validierung
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.

## [1.1.4] - 2026-07-02

### Release-Status
- Patch-Release fuer die neue Startseiten-Ladeanimation, weitere Asset-Optimierung und kleinere Korrekturen aus der laufenden Kundenabstimmung.

### Logo und Ladeanimation
- Neues MOVIN 2026 Logo aus der AI-/PDF-kompatiblen Quelldatei als echtes SVG extrahiert und im Projekt abgelegt.
- Startseiten-Loader auf SVG-Pfadanimation umgestellt.
- Animationsabfolge verfeinert: erst die vier linken Swipes der Bildmarke, danach Figur mit Kopf, danach Wortmarke und Claim.
- Loader-Intro neu gestaltet: heller Start, anschliessender Fade in den Mint-Teal-Verlauf der Page Transition, danach Logoaufbau.
- Alte harte Logo-Schnitte und die weisse Abschlusswelle im Loader entfernt.

### Inhalte und Datenschutz
- Cookie-/Datenschutzbereiche weiter nachgezogen, inklusive nachtraeglich erreichbarer Cookie-Einstellungen im Footer.
- Leistungs- und Standortinhalte aus den letzten Kundekorrekturen weiter gepflegt, unter anderem BGF-/Praeventionstexte, Standortbild und kleinere Label-/Textkorrekturen.
- Ueber-uns-Bereich um eine ruhigere, animierte MOVIN-Philosophie-Grafik erweitert.

### Medien und Performance
- Medienbestand weiter konsolidiert: optimierte WebP- und MP4-Dateien eingebunden, nicht mehr referenzierte grosse Altdateien entfernt.
- MOVIN App-Mockups und Logo-Assets fuer Startseite, App-Seite und Loader aktualisiert.
- Team-Freisteller und Light-Streak-Overlays als WebP-Assets nachgezogen.

### Validierung
- `npm run build` erfolgreich.

## [1.1.3] - 2026-07-01

### Release-Status
- Patch-Release fuer eine Bildkorrektur auf der Standortseite Mooswald.

### Standorte
- Mooswald-Galerie: leeres Trainingsraumbild durch ein aktiveres MAM-Motiv mit Betreuung am Trainingsgeraet ersetzt.
- Neues Bild aus dem Kundenordner optimiert als WebP abgelegt und in die Mooswald-Galerie eingebunden.

## [1.1.2] - 2026-07-01

### Release-Status
- Patch-Release fuer die aktualisierte MOVIN App Darstellung auf Startseite und App-Detailseite.

### Startseite und MOVIN App
- Neues iPhone-Mockup aus dem Kunden-Output in den Website-Asset-Ordner uebernommen.
- MOVIN App Bereich auf der Startseite auf das neue iPhone-Mockup umgestellt.
- Hero Header der MOVIN App Detailseite ebenfalls auf dasselbe neue Mockup umgestellt.
- Alt-Texte fuer die App-Mockups neutral und beschreibend angepasst.

## [1.1.1] - 2026-06-30

### Release-Status
- Patch-Release fuer weitere Kundekorrekturen, Navigation, Terminseite, Karriere-Video und GitHub-Dokumentation.
- Schwerpunkt: sauberere Seitenwechsel, Terminbuchungslogik ohne Doctolib, aktualisierte Karriere- und Standortinhalte sowie dokumentierte Versionierung.

### Kundekorrekturen
- Standort Lorettoberg: Prof. Dr. med. Martin Klein auf "Studienleiter Physiotherapie" angepasst.
- Ellen Heilmann auf "Stationaere Versorgung" reduziert.
- Training-Seite: Ueberschrift auf "Warum lohnt sich ein Training bei MOVIN Freiburg?" geaendert.
- Weitere Kundenfeedbackpunkte aus der Runde vom 30.06. eingearbeitet, unter anderem Team-/Rollenbezeichnungen, Mooswald-Bild und Skillcourt-Medien.

### Navigation und Seitenwechsel
- Globale Page-Transition fuer interne Seitenwechsel erweitert, sodass die bisherige Karriere-/CTA-Transition nun websiteweit greift.
- Externe Links, Downloads, PDFs, Medien, Telefon-/Mail-Links und reine Ankerlinks bleiben von der Transition ausgenommen.

### Termin und Karriere
- Terminseite bereinigt: Doctolib-Verweise entfernt.
- Alle drei Standortkarten in der klassischen Terminvereinbarung fuehren jetzt per "App downloaden" zur MOVIN App Download-Box.
- Karriere-Video auf datenschutzfreundliche `youtube-nocookie`-Einbindung umgestellt.
- Alter YouTube-Fehlerhinweis durch neutralen Fallbacktext ersetzt.

### Dokumentation und Versionierung
- README fuer GitHub neu aufgebaut: Website-/App-Beschreibung, aktueller Stand, Changelog-Auszug, lokale Startanleitung und Livegang-Hinweise.
- Versionierungsvorgehen dokumentiert: kuenftig werden Changelog, README, Version, Commit, Tag und Push gemeinsam gepflegt.

## [1.1.0] - 2026-06-29

### Release-Status
- Fortlaufender Pre-Live-Stand nach weiterer Kundekorrekturrunde und visueller Feinabstimmung.
- Schwerpunkt: neue App-Screens, Teamdarstellung, Standortbilder, Leistungsbilder und finale Formular-/Download-Details.

### Startseite und MOVIN App
- MOVIN App-Bereich auf der Startseite mit groesserem, perspektivischem Smartphone-Mockup aus den neuen App-Screens aktualisiert.
- App-Mockup aus PSD-Vorlage abgeleitet, neutraler in Graphit/Dunkelgrau eingefaerbt und ohne starken Bodenschatten eingebunden.
- MOVIN App-Seite mit scharfem Hero-Mockup, dunklem MOVIN-Verlauf und aktualisierten Feature-Screens ueberarbeitet.
- App-Funktionselemente und Icons an die neuen Redesign-Screens angepasst.
- App-Videos und Poster geprueft und wieder sauber eingebunden.

### Team und Ueber uns
- Ueber-uns-Team mit Standortdaten abgeglichen und fehlende Personen ergaenzt.
- Neue Teamkachel-Optik als Designvorschlag eingefuehrt: reduzierte MOVIN-Farbraeume, Freisteller und Light-Trail-Overlay.
- Portrait-Ausschnitte fuer Kopfhoehe, Zentrierung und Oberkoerperwirkung weiter angeglichen.
- Lena Pall und Miriam Ferre ergaenzt bzw. korrigiert.

### Standorte
- Neue Standortbilder aus dem Kundenupload fuer Lorettoberg und Mooswald eingebunden.
- Mooswald-Bildduplung reduziert und Video auf der Standortseite ergaenzt.
- Rust-Galerie angepasst, damit weniger Stuhlansichten dominieren und Hochformate besser wirken.
- Standorte-Hub mit neuem KI-generiertem Hero-Motiv inklusive Kennzeichnung aktualisiert.

### Leistungen und Training
- Hero-Bilder der Leistungsseiten nochmals geprueft und fuer BGF sowie Lymphdrainage neu generiert/ersetzt.
- Trainingsseite mit optimiertem Startbild und aktualisiertem Bildmaterial weiter angepasst.
- Overlays und CTA-Kontraste nachjustiert, damit Texte und Bilder besser lesbar bleiben.
- Preisliste, Abokarten und PDF-Buttons weiter vereinfacht bzw. konsistenter eingebunden.

### Karriere, PDFs und Formulare
- Job-PDF-Preview entfernt und durch direkten PDF-Oeffnen-/Download-Button ersetzt.
- PDF-Routen korrigiert, damit Stellenangebote direkt im neuen Fenster bzw. Browser-PDF-Viewer erreichbar sind.
- Formularziele und Datenschutzhinweise fuer Kontakt, Bewerbung und Anamnesebogen weiter vorbereitet.
- Ansprache auf "Sie" vereinheitlicht.

### Reviews, SEO und Technik
- Hinweistext bei den Google-Bewertungen entfernt; Bewertungsbereich bleibt manuell kuratiert.
- Canonicals, Sitemap-/SEO-Struktur und lokale Datenbasis weiter gepflegt.
- Neue Medien als WebP/optimierte Assets abgelegt, Originale bleiben getrennt erhalten.
- Light-Streak-Asset fuer visuelle Branding-Overlays ergaenzt.

## [1.0.0] - 2026-06-19

### Release-Status
- Pre-Live-Stand fuer die MOVIN Website nach Umsetzung der Kundekorrekturen.
- Git-Referenz: Commit `3661311` als inhaltlicher Website-Stand vor der Versionierung.

### Inhalte und Seiten
- KI-gestuetzte Physiotherapie ueberarbeitet und Inhalte der bisherigen Website in das neue Design uebertragen.
- Training-Seite mit aktualisierten Bereichen fuer Medizinische Trainingstherapie, SensoPro, Skillcourt, Return to Work/Sport/Competition und T-RENA erweitert.
- Karriere-Seite mit Informationen, Stellenangeboten und PDF-Bezug aus der alten Website nachgezogen.
- MOVIN App-Seite mit passenden Feature-Videos und neuen App-Bildern ergaenzt.
- Ueber-uns-Seite um Salutogenese-Bild und korrigierte Standortzuordnung der Mitarbeiter*innen angepasst.
- Leistungsseiten visuell ueberprueft und Hero-Bilder passend zum MOVIN Stil aktualisiert.

### Medien und Downloads
- Optimierte MP4-Dateien fuer App-, KI- und Startseitenvideos hinzugefuegt.
- WebP-Bilder fuer Standort-, Trainings- und Hero-Bereiche ergaenzt bzw. optimiert.
- KI-Datenschutz-PDFs und aktuelle Trainings-Preisliste eingebunden.
- Europa-Park-Logo und Deutsche-Rentenversicherung-Logo als Partner-/Kontextmaterial ergaenzt.

### Formulare und Datenschutz
- Kontakt-, Karriere- und Anamnesebogen-Formulare auf die vorgesehenen Empfaengeradressen vorbereitet.
- Datenschutzhinweise fuer aktive Formulare, Upload-Verarbeitung und Einwilligung ergaenzt.
- SMTP-Konfiguration ueber Umgebungsvariablen dokumentiert.

### SEO und Technik
- Sitemap, Canonicals und strukturierte Daten fuer Standorte und Leistungen aktualisiert.
- Lokale SEO-Texte fuer Standortseiten ergaenzt.
- Info-Guide/Chatbot auf Lorettoberg, Mooswald und Europa-Park Rust aktualisiert.
- Mobile Hero-Performance verbessert: Startseite nutzt auf Mobile ein leichtes Posterbild statt sofortigem Video.
- Rust-Standortbild auf WebP umgestellt.
- Favicon ergaenzt.
- Produktions-SSR und Helmet-Integration robuster gemacht.
- Vite-Build in manuelle Chunks fuer React, Motion, Icons, PDF und Canvas strukturiert.

### Validierung
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.
- Lokale Erreichbarkeit der wichtigsten Seiten und Medien geprueft.
- Lighthouse nach Optimierung: SEO 100, Best Practices 100; Performance lokal verbessert, naechster Hebel ist weiteres Route-Splitting.

### Hinweise fuer den Livegang
- Wichtige bestehende Google-URLs sollten moeglichst erhalten bleiben oder per dauerhaftem 301/308 Redirect auf die neue Zielseite zeigen.
- Besonders relevant: die alte KI-URL `/ki-gestuetzte-physiotherapie/` sollte zur Vermeidung von Rankingverlust entweder weiterverwendet oder sauber auf die finale neue URL weitergeleitet werden.
- Redirects, Canonicals und Sitemap sollten nach dem Deployment nochmals live kontrolliert werden.
