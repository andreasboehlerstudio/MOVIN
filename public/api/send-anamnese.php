<?php

declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

rateLimit('anamnese', 3, 900);
$data = readJsonBody();
requireConsent($data);

$name = textValue($data, 'name', 160);
$email = emailValue($data, 'email');
$sendPatientCopy = ($data['sendPatientCopy'] ?? false) === true;
$pdf = decodePdf((string) ($data['pdfBase64'] ?? ''));

$config = config();
$mail = mailer($config);
$mail->addAddress((string) $config['anamnese_receiver']);
$mail->addReplyTo($email, $name);
$mail->Subject = 'Neuer Anamnesebogen: ' . $name;
$mail->Body = "Ein neuer Anamnesebogen wurde von {$name} ({$email}) eingereicht. Sie finden das Dokument im Anhang.";
$mail->addStringAttachment(
    $pdf,
    safeFilename('Anamnesebogen_' . $name . '.pdf'),
    PHPMailer\PHPMailer\PHPMailer::ENCODING_BASE64,
    'application/pdf'
);

sendOrFail($mail);

// Send the patient copy separately so recipient addresses are never exposed.
$copySent = false;
if ($sendPatientCopy) {
    $patientMail = mailer($config);
    $patientMail->addAddress($email, $name);
    $patientMail->addReplyTo((string) $config['anamnese_receiver'], 'MOVIN Physiotherapie');
    $patientMail->Subject = 'Kopie Ihres digitalen Anamnesebogens';
    $patientMail->Body = "Guten Tag {$name},\n\n" .
        "anbei erhalten Sie die gewünschte Kopie Ihres digital übermittelten Anamnesebogens.\n\n" .
        "Bitte bewahren Sie das Dokument sicher auf. Bei Fragen wenden Sie sich an MOVIN Physiotherapie.\n\n" .
        "Freundliche Grüße\nIhr MOVIN Team";
    $patientMail->addStringAttachment(
        $pdf,
        safeFilename('Anamnesebogen_' . $name . '.pdf'),
        PHPMailer\PHPMailer\PHPMailer::ENCODING_BASE64,
        'application/pdf'
    );

    try {
        $patientMail->send();
        $copySent = true;
    } catch (Throwable $error) {
        error_log('MOVIN patient copy delivery failed: ' . $error->getMessage());
    }
}

respond(200, [
    'message' => 'Anamnese sent',
    'copyRequested' => $sendPatientCopy,
    'copySent' => $copySent,
]);
