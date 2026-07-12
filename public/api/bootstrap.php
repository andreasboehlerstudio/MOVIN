<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/vendor/phpmailer/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/SMTP.php';

const MAX_REQUEST_BYTES = 36 * 1024 * 1024;
const MAX_PDF_BYTES = 12 * 1024 * 1024;
const MAX_TOTAL_PDF_BYTES = 24 * 1024 * 1024;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requirePost(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        respond(405, ['error' => 'Method not allowed']);
    }
}

function requireAllowedOrigin(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return;
    }

    $allowed = [
        'https://movin-freiburg.de',
        'https://www.movin-freiburg.de',
        'https://staging.movin-freiburg.de',
    ];

    if (!in_array($origin, $allowed, true)) {
        respond(403, ['error' => 'Origin not allowed']);
    }
}

function readJsonBody(): array
{
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > MAX_REQUEST_BYTES) {
        respond(413, ['error' => 'Request is too large']);
    }

    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        respond(400, ['error' => 'Request body is missing']);
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        respond(400, ['error' => 'Invalid JSON']);
    }

    if (!empty($data['_website'])) {
        respond(200, ['message' => 'Request processed']);
    }

    return $data;
}

function requireConsent(array $data, string $field = 'privacyAccepted'): void
{
    if (($data[$field] ?? false) !== true) {
        respond(400, ['error' => 'Privacy consent is required']);
    }
}

function textValue(array $data, string $key, int $maxLength, bool $required = true): string
{
    $value = trim((string) ($data[$key] ?? ''));
    if ($required && $value === '') {
        respond(400, ['error' => "Missing field: {$key}"]);
    }

    $length = function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
    if ($length > $maxLength) {
        respond(400, ['error' => "Field is too long: {$key}"]);
    }

    return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
}

function emailValue(array $data, string $key): string
{
    $email = textValue($data, $key, 254);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(400, ['error' => 'Invalid email address']);
    }
    return $email;
}

function rateLimit(string $scope, int $limit = 5, int $windowSeconds = 600): void
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', $scope . '|' . $ip);
    $file = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'movin-rate-' . $key . '.json';
    $now = time();
    $attempts = [];

    if (is_file($file)) {
        $stored = json_decode((string) file_get_contents($file), true);
        if (is_array($stored)) {
            $attempts = array_values(array_filter($stored, static fn ($time) => is_int($time) && $time > $now - $windowSeconds));
        }
    }

    if (count($attempts) >= $limit) {
        respond(429, ['error' => 'Too many requests. Please try again later.']);
    }

    $attempts[] = $now;
    @file_put_contents($file, json_encode($attempts), LOCK_EX);
}

function config(): array
{
    $path = __DIR__ . '/.smtp-config.php';
    if (!is_file($path)) {
        respond(503, ['error' => 'Mail service is not configured']);
    }

    $config = require $path;
    if (!is_array($config) || empty($config['username']) || empty($config['password'])) {
        respond(503, ['error' => 'Mail service is not configured']);
    }
    return $config;
}

function mailer(array $config): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) ($config['host'] ?? 'smtp.ionos.de');
    $mail->Port = (int) ($config['port'] ?? 587);
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['username'];
    $mail->Password = (string) $config['password'];
    $mail->SMTPSecure = ($config['encryption'] ?? 'tls') === 'ssl'
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 20;
    $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
    return $mail;
}

function decodePdf(string $encoded): string
{
    if (str_contains($encoded, ',')) {
        [, $encoded] = explode(',', $encoded, 2);
    }

    $binary = base64_decode($encoded, true);
    if ($binary === false || !str_starts_with($binary, '%PDF-')) {
        respond(400, ['error' => 'Invalid PDF file']);
    }
    if (strlen($binary) > MAX_PDF_BYTES) {
        respond(413, ['error' => 'A PDF exceeds the 12 MB limit']);
    }
    return $binary;
}

function safeFilename(string $name): string
{
    $name = basename(str_replace('\\', '/', $name));
    $name = preg_replace('/[^A-Za-z0-9._-]+/', '-', $name) ?? 'document.pdf';
    $name = trim($name, '.-_');
    return ($name !== '' ? $name : 'document') . (str_ends_with(strtolower($name), '.pdf') ? '' : '.pdf');
}

function sendOrFail(PHPMailer $mail): void
{
    try {
        $mail->send();
    } catch (MailerException $error) {
        error_log('MOVIN mail delivery failed: ' . $error->getMessage());
        respond(502, ['error' => 'Mail delivery failed']);
    }
}

requirePost();
requireAllowedOrigin();
