<?php

declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

rateLimit('career', 3, 900);
$data = readJsonBody();
$config = config();
verifyTurnstile($data, $config, 'career');
requireHumanTiming($data);
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
        respond(413, ['error' => 'Attachments exceed the 15 MB total limit']);
    }
    $attachments[] = [safeFilename((string) ($file['fileName'] ?? 'bewerbung.pdf')), $content];
}

$fingerprint = [$name, $email, $phone, $job, ...array_map(static fn ($attachment) => hash('sha256', $attachment[1]), $attachments)];
rejectDuplicate('career', $fingerprint, 1800);

$mail = mailer($config);
$careerReceiver = (string) $config['career_receiver'];
$mail->addAddress($careerReceiver);

$careerBackupReceiver = trim((string) ($config['career_backup_receiver'] ?? ''));
if (
    $careerBackupReceiver !== ''
    && filter_var($careerBackupReceiver, FILTER_VALIDATE_EMAIL)
    && strcasecmp($careerBackupReceiver, $careerReceiver) !== 0
) {
    $mail->addBCC($careerBackupReceiver);
}
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
markSubmission('career', $fingerprint);
respond(200, ['message' => 'Application sent']);
