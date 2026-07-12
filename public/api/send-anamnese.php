<?php

declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

rateLimit('anamnese', 3, 900);
$data = readJsonBody();
requireConsent($data);

$name = textValue($data, 'name', 160);
$email = emailValue($data, 'email');
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
respond(200, ['message' => 'Anamnese sent']);
