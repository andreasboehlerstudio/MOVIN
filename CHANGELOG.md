# Changelog

Alle relevanten Aenderungen an der MOVIN Website werden in dieser Datei dokumentiert.

## [1.1.43] - 2026-09-05

- Nachnamen von Heidrun Brinkmann auf "Ueber uns" und den Standortseiten Lorettoberg und Mooswald korrigiert.

## [1.1.42] - 2026-08-29

### EHC-Stadion-Spot und Sportphysiotherapie

- Neue EHC-Stadionfassung des MOVIN Spots lokal, responsiv und ohne externe YouTube-Cookies eingebunden.
- Video direkt unter "Unsere starken Partner" auf der Startseite mit Verlinkung zur Sportphysiotherapie platziert.
- Stadion-Spot ebenfalls auf der Sportphysiotherapie-Seite als Return-to-Sport-Inhalt integriert.
- Headline auf "Schmerzfreiheit ist der erste Schritt. Belastbarkeit ist das Ziel." praezisiert und den Kontrast auf dunkelblauem Hintergrund korrigiert.
- Kundentext auf "Unser Stadion-Spot bringt es auf den Punkt ..." korrigiert.
- Videodatei fuer die Website optimiert und mit eigenem Eishockey-Poster versehen.

### Qualitaetssicherung

- TypeScript-Pruefung, Production-Build und beide Video-Platzierungen auf Staging kontrolliert.

## [1.1.42-staging.3] - 2026-08-26

### Stadion-Spot Lesbarkeit

- Headline in "Schmerzfreiheit ist der erste Schritt. Belastbarkeit ist das Ziel." praezisiert.
- Ersten Headline-Teil auf dem dunkelblauen Hintergrund explizit weiss gesetzt und damit den fehlenden Kontrast korrigiert.
- Korrekte neue Stadionfassung zusaetzlich wieder auf der Sportphysiotherapie-Seite eingebunden und dort fachlich als Return-to-Sport-Inhalt eingeordnet.

## [1.1.42-staging.2] - 2026-08-26

### EHC-Stadion-Spot korrigiert

- Versehentlich verwendetes lokales Powerbreak-Video durch exakt die neue YouTube-Fassung `7cIPrwJDcP4` ersetzt.
- Stadion-Spot aus dem allgemeinen Sportphysiotherapie-Leistungsblock entfernt und direkt unter "Unsere starken Partner" auf der Startseite platziert.
- Inhalt und Verlinkung auf die Sportphysiotherapie sowie die Partnerschaft mit dem EHC Freiburg ausgerichtet.
- Neue YouTube-Fassung lokal, datenschutzfreundlich und responsiv als weboptimiertes MP4 mit eigenem Eishockey-Poster eingebunden.

## [1.1.42-staging.1] - 2026-08-26

### Sportphysiotherapie Video-Vorschlag

- Neuen 20-Sekunden-MOVIN-Spot als eigenstaendigen Bereich auf der Sportphysiotherapie-Seite integriert.
- Inhaltliche Dramaturgie auf den Return-to-Sport-Prozess ausgerichtet: Schmerzfreiheit als Ausgangspunkt, Belastbarkeit als Ziel.
- Video lokal und ohne externe Cookies eingebunden, inklusive Ton, Wiedergabesteuerung und responsivem 16:9-Format.
- Original-Master unangetastet gelassen und eine weboptimierte 720p-Fassung mit eigenem Posterbild erstellt.
- Strukturierte Videodaten und direkte Anfrage zur Sportphysiotherapie ergaenzt.

## [1.1.41] - 2026-08-24

### Spam-Schutz fuer Formulare

- Cloudflare Turnstile fuer Kontaktformular, Bewerbungsformular und digitalen Anamnesebogen integriert.
- Turnstile-Token werden vor jeder Zustellung serverseitig geprueft; Hostname und Formularaktion werden dabei validiert.
- Unsichtbare Honeypot-Felder und eine Mindest-Ausfuellzeit gegen einfache Formularbots ergaenzt.
- Bestehende IP-Ratenbegrenzung um Inhaltspruefung und zeitlich begrenzte Duplikaterkennung erweitert.
- Mehrfachsendungen gleicher Kontaktanfragen, Bewerbungen oder Anamneseboegen werden ohne dauerhafte Speicherung der Formulardaten abgefangen.
- Nutzerfreundliche Fehlermeldungen fuer Sicherheitspruefung, Mehrfachsendung und Ratenbegrenzung ergaenzt.

### Deployment und Datenschutz

- Staging- und Production-Workflows um getrennte Turnstile-Site- und Secret-Keys erweitert.
- Deployments brechen kontrolliert ab, wenn die erforderlichen Turnstile-Secrets fehlen.
- Datenschutzerklaerung und Formular-Backend-Dokumentation um Cloudflare Turnstile und die neuen Schutzmechanismen ergaenzt.

### Qualitaetssicherung

- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.
- Lokale Darstellung der Turnstile-Pruefung in allen drei Formularstrecken kontrolliert.

## [1.1.40] - 2026-08-04

### Google-Ads-Lead-Conversion

- Conversion-Event `AW-702733253/4iA0CLfk5tscEMW3i88C` fuer erfolgreich gesendete allgemeine Kontaktanfragen integriert.
- Conversion wird erst nach erfolgreicher Serverantwort des Kontaktformulars ausgeloest.
- Ausloesung an die aktive Marketing-Einwilligung gekoppelt; ohne Zustimmung wird kein Google-Ads-Conversion-Event gesendet.
- Bewerbungen und Anamneseboegen bewusst nicht derselben Lead-Conversion zugeordnet, damit diese bei Bedarf separat ausgewertet werden koennen.

### Qualitaetssicherung

- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.39] - 2026-08-04

### Google Ads und Einwilligung

- Google-Ads-Basistag `AW-702733253` in die bestehende zentrale Google-Tag-Integration aufgenommen.
- Google Ads wird erst nach aktiver Zustimmung zu "Externe Medien & Marketing" geladen und konfiguriert.
- Google Consent Mode v2 fuer `ad_storage`, `ad_user_data`, `ad_personalization` und `analytics_storage` umgesetzt.
- Google Analytics und Google Ads lassen sich weiterhin getrennt ueber die Cookie-Einstellungen freigeben oder widerrufen.
- Bei Widerruf werden vorhandene Google-Ads-Cookies der Website entfernt und die weitere Werbedatennutzung deaktiviert.

### Datenschutz und Qualitaetssicherung

- Cookie-Banner und Datenschutzerklaerung um Google Ads, Conversion-Messung und die eingesetzte Ads-Kennung ergaenzt.
- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.38] - 2026-08-03

### Bewerbungsformular und Ausfallsicherheit

- Optionale zweite interne Zustellung jeder Bewerbung als nicht sichtbare BCC-Kopie ergaenzt.
- Backup-Adresse wird nur verwendet, wenn `CAREER_BACKUP_RECEIVER_EMAIL` gesetzt, gueltig und nicht mit dem Hauptempfaenger identisch ist.
- Keine zusaetzliche Speicherung personenbezogener Bewerbungsunterlagen auf dem Webserver eingefuehrt.
- Staging- und Production-Workflows um das geschuetzte Environment-Secret fuer das Backup-Postfach erweitert.

### Datenschutz und Dokumentation

- Datenschutzerklaerung um die optionale interne Sicherungszustellung an ein zugriffsgeschuetztes MOVIN-Bewerbungspostfach ergaenzt.
- Einrichtung und Verhalten des neuen Secrets in der Formular-Backend-Dokumentation beschrieben.

### Qualitaetssicherung

- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.37] - 2026-08-03

### FAQ und Sportphysiotherapie

- Neue Frage "Betreut MOVIN auch Sportler mit Sportphysiotherapie?" in die allgemeinen Fachfragen aufgenommen.
- Red Sparrows Freiburg als Handball-Partner in der 2. Bundesliga Frauen sowie EHC Freiburg als Eishockey-Partner in der DEL2 Maenner aufgefuehrt.
- Begleitung weiterer Leistungssportler im Return-to-Sport-Prozess von der Diagnostik bis zur Wiederherstellung der Belastbarkeit ergaenzt.
- FAQ-Antwortenzahl von einem festen Wert auf eine dynamische Berechnung umgestellt.
- Neue Frage wird automatisch in Volltextsuche, Kategorienfilter und strukturierten FAQPage-Daten ausgegeben.

### Qualitaetssicherung

- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.36] - 2026-07-29

### Standort Mooswald

- Das alte Standortportrait von Lena Prell durch ihr aktuelles Portrait ersetzt.
- Die Platzierung des Portraits von Theresa Maier korrigiert.
- Beide Bilder auf den Oberkoerper-Ausschnitt, Kopfraum, Personenmassstab und unteren Abschluss der bestehenden Mooswald-Teamserie abgestimmt.
- Einheitlichen neutralgrauen Hintergrund der vorhandenen Standortportraits verwendet.

### Qualitaetssicherung

- Beide Bilddateien im Staging einzeln sowie innerhalb der Mooswald-Teamdarstellung geprueft.
- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.36-staging.2] - 2026-07-28

### Standort Mooswald

- Die zu engen Headshots von Lena Prell und Theresa Maier verworfen.
- Beide Portraits auf den Oberkoerper-Ausschnitt der bestehenden Mooswald-Teamserie umgestellt.
- Sichtbaren Anteil von Kopf, Schulter, Shirt und verschraenkten Armen an den vorhandenen Standortbildern ausgerichtet.
- Teal-Hintergrund durch den ruhigen neutralgrauen Portraithintergrund der bestehenden Standortserie ersetzt.

## [1.1.36-staging.1] - 2026-07-28

### Standort Mooswald

- Fuer Lena Prell und Theresa Maier separate runde Standortportraits aus den aktuellen hochaufgeloesten Freistellern erstellt.
- Gesichtsgroesse, Augenlinie, Kopfabstand und Schulteranschnitt beider Bilder aufeinander abgestimmt.
- Einheitlichen ruhigen MOVIN-Hintergrund fuer beide Portraits verwendet.
- Alte Standortbildquelle von Lena Prell ersetzt und die unpassende Platzierung von Theresa Maier korrigiert.

## [1.1.35] - 2026-07-28

### Team

- Theresa Maiers hochaufgeloesten Freisteller separat als neue 1800-x-1800-WebP eingebunden.
- Kopfhoehe, Kopfgroesse, Schulterbreite, Shirtweiss, Hautton und Farbabstimmung an die bestehende Portraitserie angeglichen.
- Die zuvor verwendete Theresa-Datei als Rueckfalloption erhalten.
- Theresa Maier mit Portrait und den Fachgebieten "Ellenbogen / Kiefer / Hand" dem Standort Mooswald zugeordnet.
- Lena Prell am Standort Mooswald mit den Fachgebieten "Huefte / Knie / Schulter" aktualisiert.

### Qualitaetssicherung

- Darstellung auf der Staging-Seite "Ueber uns" und der Mooswald-Standortseite geprueft.
- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.35-staging.1] - 2026-07-28

### Team

- Theresa Maiers hochaufgeloesten Freisteller separat als neue 1800-x-1800-WebP angelegt.
- Kopfhoehe, Kopfgroesse, Schulterbreite und unterer Bildabschluss an die bestehenden Teamkarten angeglichen.
- Shirtweiss, Hautton, Saettigung und Kontrast behutsam an die restliche Portraitserie angepasst.
- Die zuvor verwendete Theresa-Datei nicht ueberschrieben und als Rueckfalloption erhalten.
- Theresa Maier mit Portrait dem Standort Mooswald zugeordnet.
- Fachgebiete von Theresa Maier auf "Ellenbogen / Kiefer / Hand" aktualisiert.
- Fachgebiete von Lena Prell auf "Huefte / Knie / Schulter" aktualisiert.

### Qualitaetssicherung

- TypeScript-Pruefung und Production-Build erfolgreich ausgefuehrt.

## [1.1.34] - 2026-07-28

### SEO und historische Inhalte

- Den weiterhin bei Google auffindbaren WordPress-Beitrag unter der exakten URL `/stadtbeste-physiotherapie/` als eigenstaendige Seite im aktuellen MOVIN Design rekonstruiert.
- Kernaussage der historischen Auszeichnungen aus 2016 und 2017 erhalten und transparent von einem aktuellen oder fortlaufenden Ranking abgegrenzt.
- Aktuelle MOVIN Leistungen und alle drei Standorte als weiterfuehrende Inhalte integriert.
- Canonical, AboutPage-/Organization- und Breadcrumb-Schema, Meta-Description, Sitemap-Eintrag und Apache-Routing ergaenzt.
- Auszeichnungsseite aus der Unternehmensgeschichte auf der Seite "Ueber uns" intern verlinkt.

### Team

- Theresa Maier im Bereich "Ueber uns" mit ihrem neuen Teambild aufgenommen.
- Bis zur Lieferung der fachlichen Detailangaben wird die neutrale Kennzeichnung "Weitere Angaben folgen" verwendet.
- Portrait separat als optimiertes WebP eingebunden; die hochaufgeloeste Originaldatei bleibt unveraendert.

### Startseite

- Den experimentellen, scrollbaren Video-Hero nach dem Staging-Test verworfen.
- Startseiten-Hero entspricht weiterhin der bisherigen Production-Variante.

### Qualitaetssicherung

- Desktop- und Mobile-Darstellung der Auszeichnungsseite im Browser geprueft.
- Kein horizontaler Ueberlauf bei 375 Pixel Breite.
- Build, TypeScript-Pruefung, Sitemap und Staging-Routing erfolgreich validiert.

## [1.1.34-staging.2] - 2026-07-28

### SEO und historische Inhalte

- Den noch bei Google auffindbaren WordPress-Beitrag unter der exakten URL `/stadtbeste-physiotherapie/` als eigenstaendige MOVIN Seite rekonstruiert.
- Kernaussage des alten Beitrags erhalten: MOVIN wurde 2016 und 2017 von Freiburgerinnen und Freiburgern zur besten Physiotherapie der Stadt gewaehlt.
- Die historische Auszeichnung klar von einem aktuellen oder fortlaufenden Ranking abgegrenzt.
- Aktuelle MOVIN Leistungen und alle drei Standorte als hilfreiche weiterfuehrende Inhalte integriert.
- Eindeutigen Canonical, AboutPage-/Organization- und Breadcrumb-Schema sowie eine suchmaschinenoptimierte Meta-Description ergaenzt.
- Alte URL in React-Routing, Apache-Routing und Sitemap aufgenommen.
- Auszeichnungsseite aus der Unternehmensgeschichte auf der Seite "Ueber uns" intern verlinkt.

### Qualitaetssicherung

- Desktop- und Mobile-Darstellung im Browser geprueft.
- Kein horizontaler Ueberlauf bei 375 Pixel Breite.
- Build und TypeScript-Pruefung erfolgreich abgeschlossen.

## [1.1.34-staging.1] - 2026-07-27

### Team

- Theresa Maier im Bereich "Ueber uns" mit ihrem neuen Teambild ergaenzt.
- Bis zur Lieferung der fachlichen Detailangaben wird die neutrale Kennzeichnung "Weitere Angaben folgen" verwendet.
- Das Portrait wurde als separates, transparentes WebP fuer die bestehende MOVIN Teamdarstellung aufbereitet; die Originaldatei bleibt unveraendert.

### Startseite

- Den experimentellen, scrollbaren Video-Hero vollstaendig aus dem Staging entfernt.
- Startseiten-Hero wieder auf den bisherigen statischen Live-Aufbau zurueckgesetzt.
- Nicht mehr benoetigte Video-, Poster- und Komponenten-Assets des Experiments entfernt.

## [1.1.33] - 2026-07-21

### Google Analytics

- Kostenlosen PHP-Endpunkt fuer das interne GA4-Dashboard auf dem bestehenden IONOS-Webhosting ergaenzt.
- Service-Account-Authentifizierung und Google Analytics Data API serverseitig ohne zusaetzlichen Hostingdienst umgesetzt.
- Analytics-Konfiguration wird beim Deployment aus geschuetzten GitHub-Environment-Secrets erzeugt und nicht im Repository gespeichert.
- Dashboard-Endpunkt mit internem Zugriffscode, sicheren Antwort-Headern und geschuetzter Konfigurationsdatei abgesichert.
- Korrekte GA4-Property `391939422` und das Servicekonto fest mit dem Deployment abgeglichen.

### 404-Seite

- Farbige Wortmarke auf der verlaufenden 404-Seite durch die kontrastreiche weisse MOVIN-Wortmarke ersetzt.

## [1.1.32] - 2026-07-21

### Google Analytics

- GA4-Konto, Property `391939422`, Webstream und Mess-ID `G-V6PKV5XVJL` direkt in Google Analytics abgeglichen.
- Befehlsuebergabe an `dataLayer` auf das von Googles Standardsnippet verwendete native `Arguments`-Format vereinheitlicht.
- Consent-gesteuertes Laden bleibt erhalten; Analytics wird weiterhin erst nach ausdruecklicher Einwilligung aktiviert.
- Optimierte Analysen sind aktiv und der interne Traffic-Filter bleibt im Testmodus, sodass er regulaere Zugriffe nicht ausschliesst.

## [1.1.31] - 2026-07-17

### Team

- Status "Mutterschutz" bei Jana Zuege und Francisca Yanes Yanes konsistent in "Elternzeit" geaendert.
- Standortdaten und zentrale Teamdarstellung auf denselben Status abgeglichen.

### Digitaler Anamnesebogen

- PDF-Ausgabe im neuen MOVIN Branding als natives A4-Dokument neu aufgebaut.
- Formulartexte bleiben im PDF auswaehlbar und durchsuchbar; Linien, Flaechen, Koerperkarte und Logo werden vektorbasiert ausgegeben.
- Plus Jakarta Sans und Outfit direkt in das PDF eingebettet und Textabstaende gegen Font-Clipping optimiert.
- Skala zur Zufriedenheit eindeutig mit "0 = ueberhaupt nicht zufrieden" und "10 = vollstaendig zufrieden" beschriftet.
- Farbige MOVIN Bild-/Wortmarke aus der originalen RGB-Verlaufsdatei als echtes SVG integriert.
- Druckformat auf exakte 210 x 297 mm mit sicheren Seitenraendern und dynamischen Folgeseiten ausgelegt.

## [1.1.30] - 2026-07-15

### Digitaler Anamnesebogen

- Koerperregionen mit ausgeschriebenen Seiten- und Ansichtsangaben versehen, damit Markierungen eindeutig zugeordnet werden koennen.
- Ausgewaehlte Koerperregionen direkt unter der Koerperkarte als laufend aktualisierte Textliste sichtbar gemacht.
- Freiwillige, nicht vorausgewaehlte Option fuer eine persoenliche PDF-Kopie an die eingetragene E-Mail-Adresse ergaenzt.
- Patienten-Kopie technisch als separate E-Mail umgesetzt, sodass Praxis- und Patientenadresse nicht gegenseitig offengelegt werden.
- Erfolg und Fehler der Patienten-Kopie getrennt von der erfolgreichen internen Uebermittlung behandelt, um doppelte Einreichungen zu vermeiden.
- Einwilligungstext und Datenschutzerklaerung um Zweck und Risiko der E-Mail-Kopie mit Gesundheitsdaten ergaenzt.

## [1.1.29] - 2026-07-14

### Digitaler Anamnesebogen

- Absturz der PDF-Erstellung bei automatisch grossgeschriebenen Texten mit `ß`, beispielsweise "Nachtschweiß", behoben.
- Beide PDF-Seiten dynamisch und vollstaendig in das A4-Format eingepasst, sodass Footer und untere Formularinhalte nicht mehr abgeschnitten werden.
- PDF-Rendering beschleunigt und mit sichtbarer Ladeanzeige fuer Download und Versand versehen.
- Versand mit einem 60-Sekunden-Timeout sowie eindeutigen Hinweisen fuer Rate-Limit, Dateigroesse und Mailserverfehler abgesichert.
- Alle sechs Formularschritte mobil auf Text- und Feldueberlaeufe geprueft; Production-Mailversand inklusive PDF-Anhang erfolgreich bestaetigt.

## [1.1.28] - 2026-07-14

### 404-Seite

- React-404 und eigenstaendige Server-404 im einheitlichen MOVIN-Design neu gestaltet.
- Vollflaechigen Teal-to-Mint-Markenverlauf und kontrastreiche marineblaue Typografie integriert.
- Sichtbare MOVIN-Verlaufswortmarke eingebunden und Outfit sowie Plus Jakarta Sans aus den lokal gehosteten Markenschriften verwendet.
- Navigation zur Startseite und zum Kontakt fuer Desktop und Mobilgeraete optimiert.

## [1.1.27] - 2026-07-14

### Impressum

- Vom Kunden bestaetigte Umsatzsteuer-ID `DE-0646142019` in das Impressum aufgenommen.

## [1.1.26] - 2026-07-14

### Impressum

- Verlinkten Credit auf "Andreas Boehler - Movie-/Art-Director/Fotograf" erweitert.
- Bestehende Verlinkung auf `https://www.andreasboehler.com` beibehalten.

## [1.1.25] - 2026-07-14

### MOVIN App

- Telemedizin- und Videotherapie-Coming-Soon-Inhalte auf Kundenwunsch wieder vollstaendig eingebunden.
- Statisches Telemedizin-Vorschaubild in der interaktiven Feature-Uebersicht wiederhergestellt.
- Bisherigen Hinweis "Video folgt" fuer fehlende oder technisch ausgefallene App-Videos wieder aktiviert.

## [1.1.24] - 2026-07-14

### Platzhalter-Bereinigung

- Alle oeffentlichen Sitemap-Seiten sowie Impressum, Datenschutz, Cookie-Seite und 404 im Browser auf sichtbare Platzhalter geprueft.
- Unvollstaendigen Umsatzsteuer-ID-Platzhalter aus dem Impressum entfernt; der Abschnitt bleibt bis zur Bestaetigung einer echten Nummer ausgeblendet.
- Oeffentliche Telemedizin- und Videotherapie-Coming-Soon-Inhalte von der MOVIN-App-Seite entfernt.
- Ungenutzte generische Seite mit dem Hinweis "Diese Seite befindet sich aktuell im Aufbau" aus dem Projekt entfernt.
- Unechte Beispielnamen, Telefonnummern und E-Mail-Adressen in Kontakt- und Bewerbungsformularen durch neutrale Eingabehinweise ersetzt.
- Technischen App-Video-Fallback so angepasst, dass bei einem Medienfehler kein sichtbarer "Video folgt"-Platzhalter erscheint.

## [1.1.23] - 2026-07-14

### Impressum und Kontakt

- Handelsregisternummer `HRB 5786` eingetragen.
- Daniel Klein als Geschaeftsfuehrer und als Verantwortlicher fuer den Inhalt ergaenzt.
- Gestaltung und technische Administration mit Verlinkung auf `https://www.andreasboehler.com` aufgenommen.
- Nicht existente Adresse `info@movin-freiburg.de` im Impressum, Datenschutz und FAQ durch `kontakt@movin-freiburg.de` ersetzt.
- Gesamte Codebasis auf weitere Vorkommen der alten Adresse geprueft.

### Favicon und Branding

- Bisheriges generisches Favicon durch die offizielle MOVIN-Bildmarke mit Markenverlauf ersetzt.
- Favicon als skalierbares SVG, PNG in 16 und 32 Pixeln, Mehrformat-ICO und Apple-Touch-Icon in 180 Pixeln bereitgestellt.
- Passenden Innenabstand fuer eine klare Darstellung in Browser-Tabs und auf Mobilgeraeten ergaenzt.
- Neues Favicon-Paket sowohl in der Hauptanwendung als auch auf der eigenstaendigen 404-Seite eingebunden.

## [1.1.22] - 2026-07-14

### 404 und SEO

- Eigene responsive MOVIN-404-Seite mit den beiden Wegen zur Startseite und zum Kontakt umgesetzt.
- Catch-all-Platzhalter durch eine nicht indexierbare React-404 ersetzt.
- Apache-Routing auf bekannte Seiten begrenzt und unbekannte Adressen mit einem echten HTTP-404 versehen, um Soft-404-Signale zu vermeiden.

### FAQ

- Sticky-Verhalten des Bereichs "Haeufige Themen" auf grosse Bildschirmbreiten begrenzt, damit der Block auf Mobilgeraeten normal aus dem sichtbaren Bereich scrollt.
- Zuzahlungsinformation ab 2027 korrigiert: weiterhin 10 % des Rezeptwertes, die Pauschale steigt von 10 auf 15 Euro pro Verordnung.
- Ergaenzt, dass sich die pauschale Verordnungsgebuehr damit um 50 % erhoeht.

## [1.1.21] - 2026-07-13

### Google Analytics

- Website-Tracking von der neuen GA4-Mess-ID auf die bestehende Mess-ID `G-V6PKV5XVJL` der bisherigen WordPress-Seite umgestellt.
- Property-ID fuer das interne Analytics-Dashboard und die Environment-Dokumentation auf `391939422` aktualisiert.
- Bestehende Cookie-Einwilligung bleibt Voraussetzung fuer das Laden und Senden von Analytics-Daten.

## [1.1.20] - 2026-07-13

### Production

- Production-Deployment nach Aktualisierung der Secrets im GitHub-Environment `Production` erneut angestossen.
- Der Build enthaelt unveraendert die in `1.1.19` ergaenzten 301-Weiterleitungen und das PHP-Formular-Backend.

## [1.1.19] - 2026-07-13

### SEO und Weiterleitungen

- 29 relevante alte WordPress-URLs mit permanenten 301-Weiterleitungen auf ihre fachlich passenden neuen Zielseiten abgebildet.
- Darunter befinden sich die alten Standortseiten, MOVIN-App- und KI-Seiten, Anamnesebogen, Gesundheitsfoerderung, Sportphysiotherapie, SensoPro, Skillcourt, T-RENA, stationaere Versorgung, Terminseiten, Karriere und Datenschutz.
- Die bestehende Weiterleitung von `/leistungen/knie-schulter-therapie/` auf die Leistungsuebersicht bleibt erhalten.
- Fuer Altseiten ohne fachlich passenden Nachfolger wurde bewusst keine pauschale Startseiten-Weiterleitung angelegt, um Soft-404-Signale und Rankingverluste zu vermeiden.

## [1.1.18] - 2026-07-12

### Production
- Den unter `1.1.18-staging.1` getesteten Bewerbungs-PDF-Fix auf `main` uebernommen.
- Browser- und PHP-Laufzeit auf maximal 60 Sekunden begrenzt, damit kein endloser Ladezustand bestehen bleibt.
- Versandgrenzen auf 10 MB pro Datei und 15 MB insgesamt synchronisiert.
- Verstaendliche Rueckmeldungen fuer zu grosse Dateien, Zeitueberschreitung und zu viele Versuche aktiviert.

## [1.1.18-staging.1] - 2026-07-12

### Bewerbungsformular
- Endlosen Ladezustand durch einen clientseitigen 60-Sekunden-Timeout verhindert.
- Eigene Hinweise fuer Zeitueberschreitung, zu grosse Unterlagen und Rate-Limits ergaenzt.
- Statusanzeige beschreibt nun PDF-Vorbereitung und SMTP-Uebertragung korrekt.

### PDF-Versand
- Maximale Einzeldatei von 12 MB auf 10 MB reduziert.
- Maximale Gesamtgroesse von 24 MB auf 15 MB reduziert, um Base64- und MIME-Aufschlag beim E-Mail-Versand zu beruecksichtigen.
- Client- und PHP-Limits synchronisiert und PHP-Ausfuehrung auf 60 Sekunden begrenzt.

## [1.1.17] - 2026-07-12

### Production
- Den auf `develop` und `staging.movin-freiburg.de` geprueften Stand auf `main` uebernommen.
- Production-Deployment verwendet ausschliesslich das GitHub-Environment `Production` und dessen eigene FTP- und SMTP-Secrets.

### Formulare
- Kontaktformular, Bewerbung mit mehreren PDF-Anhaengen und digitaler Anamnesebogen produktionsreif als PHP-Endpunkte bereitgestellt.
- Authentifizierter Versand ueber IONOS-SMTP mit getrennten Zielpostfaechern aktiviert.
- Erfolgreiche Staging-End-to-End-Tests fuer alle drei Formularwege abgeschlossen.

### Sicherheit
- Serverseitige Pflichtfeld-, E-Mail-, Einwilligungs- und PDF-Pruefung aktiviert.
- Origin-Schutz, Rate-Limit, Honeypot, Request-Limits und geschuetzte SMTP-Konfiguration eingesetzt.
- PHP-Syntax wird vor jedem Deployment in GitHub Actions validiert.

## [1.1.17-staging.5] - 2026-07-12

### Staging-Test
- Neu-Deployment zur Uebernahme der im GitHub-Environment `Staging` hinterlegten IONOS-SMTP-Secrets.
- End-to-End-Pruefung aller drei Formularwege inklusive PDF-Anhaengen vorgesehen.

## [1.1.17-staging.4] - 2026-07-12

### Formular-Routing
- Frontend verwendet auf IONOS die eindeutigen PHP-Pfade fuer Kontakt, Bewerbung und Anamnese.
- Extensionlose API-Pfade wurden vom Apache-SPA-Fallback als React-Seite beantwortet und deshalb nicht weiterverwendet.
- Direkte PHP-Ausfuehrung, JSON-Fehlerantworten und 403-Schutz der internen Konfiguration auf Staging verifiziert.

## [1.1.17-staging.3] - 2026-07-12

### Formulare und E-Mail
- PHP-Endpunkte fuer Kontakt, Bewerbung und digitalen Anamnesebogen hinzugefuegt.
- PHPMailer `v7.1.1` fuer authentifizierten IONOS-SMTP-Versand eingebunden.
- Empfaenger bleiben getrennt: Kontakt, Karriere und Anamnese werden an ihre jeweiligen Postfaecher zugestellt.

### Sicherheit
- Serverseitige E-Mail-, Pflichtfeld- und Einwilligungspruefung eingefuehrt.
- Bewerbungs- und Anamnese-PDFs werden auf Signatur und Dateigroesse kontrolliert.
- Rate-Limit, Origin-Pruefung, Honeypot und geschuetzte SMTP-Konfiguration ergaenzt.
- Fehlende SMTP-Zugangsdaten liefern HTTP 503 statt einer falschen Erfolgsmeldung.

### Deployment
- Staging- und Production-Workflow erzeugen die SMTP-Konfiguration nur aus Environment-Secrets.
- PHP-Syntaxpruefung ist verpflichtender Bestandteil vor dem FTP-Upload.
- Technische Einrichtung in `FORMULAR_BACKEND.md` dokumentiert.

## [1.1.17-staging.2] - 2026-07-12

### Release-Status
- Kontrollierter Staging-Neulauf nach Korrektur des FTP-Zielverzeichnisses im GitHub-Environment `Staging`.

### Deployment
- Website ohne inhaltliche Aenderungen neu gebaut und in das korrigierte relative Staging-Ziel uebertragen.
- Getrennte Environment-Konfiguration fuer Staging und Production bleibt erhalten.

## [1.1.17-staging.1] - 2026-07-11

### Release-Status
- Erster klar getrennter Staging-Pre-Release auf dem neuen Branch `develop`.

### GitHub und Deployment
- Eigenen Workflow `Deploy Staging to IONOS` fuer Pushes auf `develop` und manuelle Testlaeufe angelegt.
- Workflow referenziert das GitHub-Environment `Staging` und dessen isolierte Secrets.
- GitHub-Deployment verweist direkt auf `https://staging.movin-freiburg.de`.
- Staging und Production verwenden getrennte Concurrency-Gruppen und koennen sich nicht gegenseitig abbrechen.
- Production-Workflow bleibt unveraendert an `main` und das Environment `Production` gebunden.

## [1.1.16] - 2026-07-11

### Release-Status
- Patch-Release fuer die erste technische Staging-Pruefung auf dem IONOS-Webspace.

### Staging und Routing
- `https://staging.movin-freiburg.de/` auf HTTPS, Seitenausgabe, Assets und Browserfehler geprueft.
- IONOS-spezifische `RewriteBase /` ergaenzt und SPA-Fallback auf `/index.html` praezisiert.
- Direkte Unterseiten hatten zuvor wegen der unvollstaendigen Rewrite-Konfiguration HTTP 500 geliefert.
- `/api/` wird nicht mehr auf die React-Startdatei umgeschrieben, damit fehlende Node-Endpunkte eindeutig erkennbar bleiben.

### SEO-Schutz
- Ausschliesslich fuer den Host `staging.movin-freiburg.de` wird der HTTP-Header `X-Robots-Tag: noindex, nofollow` gesetzt.
- Canonicals bleiben auf der spaeteren Produktionsdomain `https://movin-freiburg.de/` ausgerichtet.

## [1.1.15] - 2026-07-10

### Release-Status
- Patch-Release fuer den zweiten kontrollierten IONOS-Deployment-Test.

### Deployment
- Erster GitHub-Actions-Lauf vollstaendig ausgewertet.
- Alle fuenf GitHub-Environment-Secrets wurden erfolgreich erkannt.
- Installation, TypeScript-Pruefung und Vite-Produktionsbuild liefen erfolgreich durch.
- Lokale Pfaduebergabe an `lftp` korrigiert; der erste Lauf war vor der Serververbindung an literal interpretierten Anfuehrungszeichen um `dist/` gescheitert.

## [1.1.14] - 2026-07-10

### Release-Status
- Patch-Release fuer das erste automatisierte Production-Deployment zu IONOS.

### Deployment
- GitHub-Actions-Workflow fuer Pushes auf `main` und manuelle Testlaeufe angelegt.
- GitHub Environment `Production` mit den Secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PORT` und `FTP_TARGET_DIR` angebunden.
- Port 22 wird als SFTP, andere konfigurierte Ports werden als zertifikatsgeprueftes FTPS behandelt.
- Vor dem Upload laufen `npm ci`, TypeScript-Pruefung und der produktive Vite-Build.
- Fehlende Deployment-Secrets brechen den Lauf mit einer klaren Meldung ab, ohne Werte auszugeben.
- Der erste Upload synchronisiert Dateien ohne Remote-Loeschungen.

### Hosting
- `.htaccess` fuer React-Unterseiten auf Apache-Webspace ergaenzt.
- Dauerhafte Weiterleitung der alten Knie-/Schulter-URL auch fuer den IONOS-Webspace uebernommen.

### Sicherheit
- FTP-Zugangsdaten bleiben ausschliesslich in den geschuetzten GitHub-Environment-Secrets.
- GitHub-Workflow besitzt nur Leserechte auf Repository-Inhalte.

## [1.1.13] - 2026-07-07

### Release-Status
- Patch-Release fuer Sprachkonsistenz, Performance-Bundling und Dokumentation der aktuellen Datenschutzpruefung.

### Sprache und Inhalte
- Startseiten-FAQ im Bereich 48h-Termingarantie auf einheitliche Sie-Ansprache korrigiert.
- Digital-Uebersicht beim Anamnesebogen auf einheitliche Sie-Ansprache korrigiert.
- Unbenutztes Icon-Import im Digital-Hub entfernt.
- Karriereseite auf Kundenwunsch wieder mit der Bezeichnung "Schueler-/Studenten-Aushilfe (m/w/d)" und entsprechendem Beschreibungstext gefuehrt.

### Performance
- Podcast- und Instagram-Komponenten auf der Startseite per Lazy Loading ausgelagert.
- Vite-Bundling erweitert: grosse Unterseiten wie Karriere, Anamnesebogen, MOVIN App, KI-Physiotherapie, Training, Ueber uns und Google-Statistiken werden in eigene Chunks getrennt.
- Haupt-JavaScript-Chunk deutlich reduziert und die vorherige Vite-Warnung zu uebergrossen Chunks beseitigt.

### Datenschutz
- Datenschutzerklaerung gegen den digitalen Anamnesebogen geprueft.
- Eigener Abschnitt zu Gesundheitsdaten, PDF-Erzeugung, Empfaengeradresse, Zweck, Dienstleistern und Aufbewahrungs-/Loeschlogik ist vorhanden.
- Hinweis fuer Live-Betrieb bleibt: SMTP-Zugangsdaten muessen gesetzt sein, damit der Anamnesebogen nicht nur simuliert, sondern tatsaechlich per E-Mail versendet wird.

### Validierung
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.

## [1.1.12] - 2026-07-06

### Release-Status
- Patch-Release fuer SEO/GEO-Optimierung, strukturierte Daten und DEI-/Ansprache-Korrekturen.

### SEO und GEO
- Alte Knie-/Schulter-Leistungsseite aus den aktiven Leistungsdaten entfernt.
- Alte Knie-/Schulter-URL aus der Sitemap entfernt und per 301-Weiterleitung auf die Leistungsuebersicht gelegt.
- Sitemap-`lastmod` auf den aktuellen Korrekturstand aktualisiert.
- Doppelte Meta-Description im serverseitigen Rendering bereinigt, indem statische Fallback-Metas vor dem Einsetzen der dynamischen SEO-Tags entfernt werden.
- Vercel-Redirects fuer die alte Knie-/Schulter-URL ergaenzt.

### Strukturierte Daten
- LocalBusiness-Schema der Standortseiten um `GeoCoordinates` erweitert.
- Standortspezifische `areaServed`-Angaben fuer Lorettoberg, Mooswald und Europa-Park Rust ergaenzt.
- Leistungsdetailseiten um FAQPage-JSON-LD ergaenzt.

### Inhalte und DEI
- Leistungsdetailseiten um sichtbare "Kurz erklaert"-FAQ-Bloecke erweitert.
- Karriereseite altersneutraler formuliert: Aushilfe-Titel neutralisiert, Hinweise auf "junges Team" entfernt und Bewerbungstext fuer verschiedene Lebensphasen geoeffnet.
- Sie-Ansprache auf Karriere-, Termin- und FAQ-Seite bereinigt.
- Gleichbehandlungssatz auf der Karriereseite ergaenzt.

### Validierung
- `npm run build` erfolgreich.
- `npm run lint` erfolgreich.

## [1.1.11] - 2026-07-06

### Release-Status
- Patch-Release fuer die mobile Bedienbarkeit der MOVIN-App-Videosektion.

### MOVIN App
- Videos und Fallback-Bilder im Bereich "Die App in Aktion" als nicht-interaktive Medien gesetzt.
- Touch- und Mausereignisse auf den Autoplay-Videos deaktiviert, damit Nutzerinnen und Nutzer auf Mobile wieder fluessig ueber aufgeklappte Handyvideos scrollen koennen.
- Videowiedergabe bleibt unveraendert automatisch, stumm und ohne Bedienoberflaeche.

### Validierung
- `npm run lint` erfolgreich.

## [1.1.10] - 2026-07-06

### Release-Status
- Patch-Release fuer responsive Detailkorrekturen an der MOVIN-App-Seite und der Ueber-uns-Philosophie-Grafik.

### MOVIN App
- Alle Feature-Videos der MOVIN-App-Seite technisch und responsiv gegen Mobile, Tablet und Desktop geprueft.
- Videoplayer auf proportionale Darstellung mit Hoehenbegrenzung umgestellt, damit Hochformat- und Querformat-Videos nicht mehr aus dem sichtbaren Bereich laufen.
- Coming-Soon- und Fallback-Darstellungen im App-Feature-Bereich ebenfalls responsiv angeglichen.

### Ueber uns
- Bubble-Grafik "Der Mensch im Mittelpunkt" fuer Mobile, Tablet und Desktop geprueft.
- Haupt-Bubbles und Zentrum leicht entzerrt, damit keine Ueberlappungen mehr entstehen.
- Zentrumstypografie reduziert, damit "Mensch" im Kreis ruhiger und weniger dominant wirkt.

### Validierung
- Responsive Chrome-Pruefung fuer die MOVIN-App-Videos erfolgreich.
- Responsive Chrome-Pruefung der Ueber-uns-Bubble-Grafik erfolgreich.
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.

## [1.1.9] - 2026-07-05

### Release-Status
- Patch-Release fuer Standortvideos, mobile App-Darstellung und Skillcourt-Bildauswahl.

### Standorte
- Neue YouTube-Videos fuer Lorettoberg, Mooswald und Europa-Park Rust in die Standortseiten eingebunden.
- Mooswald-Video durch den neuen Kundenlink ersetzt.
- Lorettoberg und Europa-Park Rust um denselben DSGVO-konformen Video-Block erweitert.

### MOVIN App
- Mobile Darstellung im Bereich "Die App in Aktion" korrigiert.
- Desktop-Hoehenbegrenzung der Feature-Liste nur noch ab Desktop-Breakpoint aktiv, damit das Handyvideo auf Mobile nicht mehr abgeschnitten wird.

### Training
- Skillcourt-Bild auf der Trainingsseite auf das originale Kundenmotiv "dual-task-mann" umgestellt.
- Neues optimiertes WebP fuer das Skillcourt-Originalbild erzeugt und auch als Skillcourt-Video-Poster verwendet.

### Validierung
- `npm run lint` erfolgreich.
- `npm run build` erfolgreich.

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
