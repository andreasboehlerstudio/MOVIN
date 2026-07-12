<?php

declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

rateLimit('contact');
$data = readJsonBody();
requireConsent($data);

$name = textValue($data, 'name', 160);
$email = emailValue($data, 'email');
$phone = textValue($data, 'phone', 80);
$message = textValue($data, 'message', 5000);
$standort = textValue($data, 'standort', 40, false);

$labels = [
    'lorettoberg' => 'Freiburg - Lorettoberg',
    'mooswald' => 'Freiburg - Mooswald',
    'rust' => 'Europa-Park - Rust',
    'egal' => 'Egal / Keine Präferenz',
];

$config = config();
$mail = mailer($config);
$mail->addAddress((string) $config['contact_receiver']);
$mail->addReplyTo($email, $name);
$mail->Subject = 'Neue Kontaktanfrage: ' . $name;
$mail->Body = implode("\n", [
    'Über das Kontaktformular wurde eine neue Anfrage eingereicht.',
    '',
    'Name: ' . $name,
    'E-Mail: ' . $email,
    'Telefon: ' . $phone,
    'Gewünschter Standort: ' . ($labels[$standort] ?? ($standort ?: 'Nicht angegeben')),
    '',
    'Nachricht:',
    $message,
]);

sendOrFail($mail);
respond(200, ['message' => 'Contact request sent']);
