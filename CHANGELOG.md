# Changelog

Alle relevanten Aenderungen an der MOVIN Website werden in dieser Datei dokumentiert.

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
