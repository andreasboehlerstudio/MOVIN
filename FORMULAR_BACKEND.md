# Formular-Backend

Die Formulare werden auf IONOS durch PHP-Endpunkte unter `/api/` verarbeitet:

- `/api/send-contact.php`
- `/api/send-bewerbung.php`
- `/api/send-anamnese.php`

PHPMailer wird fest aus `public/api/vendor/phpmailer` eingebunden. GitHub Actions erzeugt beim Deployment die nicht versionierte Datei `dist/api/.smtp-config.php` aus den Secrets des jeweils gewaehlten GitHub-Environments.

## GitHub Environment Secrets

Diese Werte werden getrennt unter `Settings > Environments > Staging` und `Settings > Environments > Production` hinterlegt:

| Secret | Beispiel / Bedeutung |
| --- | --- |
| `SMTP_HOST` | `smtp.ionos.de` |
| `SMTP_PORT` | `587` |
| `SMTP_ENCRYPTION` | `tls` |
| `SMTP_USER` | Vollstaendige Adresse des sendenden IONOS-Postfachs |
| `SMTP_PASS` | Passwort dieses IONOS-Postfachs |
| `SMTP_FROM_EMAIL` | Absenderadresse, vorzugsweise identisch mit `SMTP_USER` |
| `SMTP_FROM_NAME` | `MOVIN Website` |
| `CONTACT_RECEIVER_EMAIL` | `kontakt@movin-freiburg.de` |
| `CAREER_RECEIVER_EMAIL` | `daniel.klein@movin-freiburg.de` |
| `CAREER_BACKUP_RECEIVER_EMAIL` | Optionales internes Bewerbungs-Postfach, z. B. `bewerbung@movin-freiburg.de` |
| `ANAMNESE_RECEIVER_EMAIL` | `anamnesebogen@movin-freiburg.de` |

Ohne `SMTP_USER` oder `SMTP_PASS` antwortet das Backend kontrolliert mit HTTP 503 und behauptet keinen erfolgreichen Versand.

Ist `CAREER_BACKUP_RECEIVER_EMAIL` gesetzt, wird jede Bewerbung zusaetzlich als nicht sichtbare BCC-Kopie an dieses interne Postfach gesendet. Die Adresse muss ein tatsaechlich eingerichtetes, zugriffsgeschuetztes MOVIN-Postfach sein. Sie darf nicht mit `CAREER_RECEIVER_EMAIL` identisch sein. Ohne Secret bleibt der bisherige Versand ausschliesslich an Daniel Klein aktiv.

## Sicherheitsumfang

- ausschliesslich POST und JSON
- Origin-Pruefung fuer Live, www und Staging
- serverseitige Pflichtfeld-, E-Mail- und Einwilligungspruefung
- Rate-Limit pro IP und Formular
- Honeypot-Feld fuer einfache Bots
- PDF-Signatur-, Einzelgroessen- und Gesamtgroessenpruefung
- maximal 10 MB pro PDF und 15 MB pro Bewerbung
- SMTP-Zugangsdaten werden nicht ins Repository geschrieben
- optionale zweite interne Zustellung fuer Bewerbungen ohne dauerhafte Webserver-Ablage
- direkte Webzugriffe auf Bootstrap und SMTP-Konfiguration werden per `.htaccess` gesperrt

## Funktionstest

Nach einem Deployment werden zuerst Status und Validierung der drei Endpunkte geprueft. Ein echter Versandtest wird anschliessend mit klar gekennzeichneten Testdaten durchgefuehrt und muss in den drei Zielpostfaechern bestaetigt werden.
