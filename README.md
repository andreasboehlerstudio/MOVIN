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

- Aktuelle Version: `1.1.1`
- Letzter Release-Tag: `v1.1.1`
- Branch: `main`
- Projektstatus: Pre-Live / fortlaufende Kundekorrekturen

## Changelog

Das vollstaendige Changelog liegt in [CHANGELOG.md](./CHANGELOG.md).

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
