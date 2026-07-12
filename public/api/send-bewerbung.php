<?php

declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

rateLimit('career', 3, 900);
$data = readJsonBody();
requireConsent($data, 'agree');

$name = textValue($data, 'name', 160);
$email = emailValue($data, 'email');
$phone = textValue($data, 'phone', 80);
$anrede = textValue($data, 'anrede', 40, false);
$message = textValue($data, 'message', 5000, false);
$einstieg = textValue($data, 'einstieg', 120, false);
$job = textValue($data, 'selectedJobTitle', 240, false);
$files = is_array($data['files'] ?? null) ? $data['files'] : [];

if ($files === [] || count($files) > 8) {
    respond(400, ['error' => 'At least one and at most eight PDF files are required']);
}

$attachments = [];
$totalBytes = 0;
foreach ($files as $file) {
    if (!is_array($file)) {
        respond(400, ['error' => 'Invalid attachment']);
    }
    $content = decodePdf((string) ($file['fileBase64'] ?? ''));
    $totalBytes += strlen($content);
    if ($totalBytes > MAX_TOTAL_PDF_BYTES) {
        respond(413, ['error' => 'Attachments exceed the 24 MB total limit']);
    }
    $attachments[] = [safeFilename((string) ($file['fileName'] ?? 'bewerbung.pdf')), $content];
}

$config = config();
$mail = mailer($config);
$mail->addAddress((string) $config['career_receiver']);
$mail->addReplyTo($email, $name);
$mail->Subject = 'Neue Bewerbung: ' . $name;
$mail->Body = implode("\n", [
    'Über das Karriereformular wurde eine neue Bewerbung eingereicht.',
    '',
    'Anrede: ' . ($anrede ?: 'Nicht angegeben'),
    'Name: ' . $name,
    'E-Mail: ' . $email,
    'Telefon: ' . $phone,
    'Gewünschte Stelle: ' . ($job ?: 'Initiativbewerbung'),
    'Frühestmöglicher Einstieg: ' . ($einstieg ?: 'Nicht angegeben'),
    '',
    'Nachricht / Begleittext:',
    $message ?: 'Keine Nachricht angegeben.',
]);
foreach ($attachments as [$filename, $content]) {
    $mail->addStringAttachment($content, $filename, PHPMailer\PHPMailer\PHPMailer::ENCODING_BASE64, 'application/pdf');
}

sendOrFail($mail);
respond(200, ['message' => 'Application sent']);
