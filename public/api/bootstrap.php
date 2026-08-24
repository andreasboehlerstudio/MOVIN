<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/vendor/phpmailer/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/SMTP.php';

const MAX_REQUEST_BYTES = 36 * 1024 * 1024;
const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_PDF_BYTES = 15 * 1024 * 1024;

@set_time_limit(60);

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

function requireHumanTiming(array $data, int $minimumMilliseconds = 2500): void
{
    $elapsed = $data['_formElapsedMs'] ?? null;
    if (!is_int($elapsed) && !is_float($elapsed) && !is_numeric($elapsed)) {
        respond(403, ['error' => 'Form verification failed']);
    }

    $elapsed = (int) $elapsed;
    if ($elapsed < $minimumMilliseconds || $elapsed > 6 * 60 * 60 * 1000) {
        respond(403, ['error' => 'Form verification failed']);
    }
}

function verifyTurnstile(array $data, array $config, string $expectedAction): void
{
    $secret = trim((string) ($config['turnstile_secret'] ?? ''));
    $token = trim((string) ($data['turnstileToken'] ?? ''));
    if ($secret === '' || $token === '' || strlen($token) > 2048) {
        respond($secret === '' ? 503 : 403, ['error' => 'Security verification unavailable']);
    }

    $payload = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    $endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $response = false;

    if (function_exists('curl_init')) {
        $curl = curl_init($endpoint);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        ]);
        $response = curl_exec($curl);
        curl_close($curl);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $payload,
                'timeout' => 8,
                'ignore_errors' => true,
            ],
        ]);
        $response = @file_get_contents($endpoint, false, $context);
    }

    if (!is_string($response) || $response === '') {
        error_log('MOVIN Turnstile validation request failed');
        respond(503, ['error' => 'Security verification unavailable']);
    }

    $result = json_decode($response, true);
    $isTestSecret = str_starts_with($secret, '1x0000000000000000000000000000000AA');
    $allowedHostnames = ['movin-freiburg.de', 'www.movin-freiburg.de', 'staging.movin-freiburg.de', 'localhost'];
    $hostname = (string) ($result['hostname'] ?? '');
    $action = (string) ($result['action'] ?? '');

    if (
        !is_array($result)
        || ($result['success'] ?? false) !== true
        || (!$isTestSecret && !in_array($hostname, $allowedHostnames, true))
        || (!$isTestSecret && $action !== $expectedAction)
    ) {
        error_log('MOVIN Turnstile rejected: ' . json_encode($result, JSON_UNESCAPED_SLASHES));
        respond(403, ['error' => 'Security verification failed']);
    }
}

function rejectObviousSpam(array $values, int $maximumUrls = 2): void
{
    $text = implode("\n", array_map(static fn ($value) => (string) $value, $values));
    preg_match_all('~(?:https?://|www\.)~iu', $text, $matches);
    if (count($matches[0]) > $maximumUrls || preg_match('/(.)\1{24,}/u', $text) === 1) {
        respond(422, ['error' => 'Submission rejected']);
    }
}

function duplicateFile(string $scope, array $values): string
{
    $normalized = array_map(static function ($value): string {
        $text = trim((string) $value);
        return function_exists('mb_strtolower') ? mb_strtolower($text) : strtolower($text);
    }, $values);
    $key = hash('sha256', $scope . '|' . json_encode($normalized, JSON_UNESCAPED_UNICODE));
    return rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'movin-duplicate-' . $key;
}

function rejectDuplicate(string $scope, array $values, int $windowSeconds = 900): void
{
    $file = duplicateFile($scope, $values);
    if (is_file($file) && (int) filemtime($file) > time() - $windowSeconds) {
        respond(409, ['error' => 'Duplicate submission']);
    }
}

function markSubmission(string $scope, array $values): void
{
    @file_put_contents(duplicateFile($scope, $values), (string) time(), LOCK_EX);
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
        respond(413, ['error' => 'A PDF exceeds the 10 MB limit']);
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
