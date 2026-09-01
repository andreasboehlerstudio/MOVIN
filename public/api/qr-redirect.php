<?php

declare(strict_types=1);

header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Referrer-Policy: no-referrer');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    exit;
}

$campaigns = [
    'ehc-container' => [
        'destination' => '/',
        'utm_source' => 'qr',
        'utm_medium' => 'offline',
        'utm_campaign' => 'ehc_container',
        'utm_content' => 'container_startseite',
    ],
    'red-sparrows-bande' => [
        'destination' => '/',
        'utm_source' => 'qr',
        'utm_medium' => 'offline',
        'utm_campaign' => 'red_sparrows_bande',
        'utm_content' => 'bande_startseite',
    ],
];

$campaign = strtolower(trim((string) ($_GET['campaign'] ?? '')));
if (!isset($campaigns[$campaign])) {
    http_response_code(404);
    exit;
}

/**
 * Zaehlt ausschliesslich aggregierte Aufrufe pro Kampagne und Kalendertag.
 * IP-Adresse, User-Agent und andere Besuchermerkmale werden nicht gespeichert.
 */
function recordQrRedirect(string $campaign): void
{
    $statsPath = __DIR__ . '/.qr-stats.json';
    $handle = @fopen($statsPath, 'c+');
    if ($handle === false) {
        error_log('MOVIN QR counter could not open its stats file.');
        return;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            error_log('MOVIN QR counter could not lock its stats file.');
            return;
        }

        rewind($handle);
        $contents = stream_get_contents($handle);
        $stats = is_string($contents) && trim($contents) !== ''
            ? json_decode($contents, true)
            : [];
        if (!is_array($stats)) {
            $stats = [];
        }

        $today = gmdate('Y-m-d');
        $now = gmdate('c');
        $entry = is_array($stats[$campaign] ?? null) ? $stats[$campaign] : [];
        $days = is_array($entry['days'] ?? null) ? $entry['days'] : [];
        $days[$today] = max(0, (int) ($days[$today] ?? 0)) + 1;

        $stats[$campaign] = [
            'total' => max(0, (int) ($entry['total'] ?? 0)) + 1,
            'lastAccess' => $now,
            'days' => $days,
        ];

        $encoded = json_encode($stats, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        if ($encoded === false) {
            error_log('MOVIN QR counter could not encode its stats.');
            return;
        }

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, $encoded . "\n");
        fflush($handle);
    } catch (Throwable $error) {
        error_log('MOVIN QR counter failed: ' . $error->getMessage());
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

recordQrRedirect($campaign);

$config = $campaigns[$campaign];
$query = http_build_query([
    'utm_source' => $config['utm_source'],
    'utm_medium' => $config['utm_medium'],
    'utm_campaign' => $config['utm_campaign'],
    'utm_content' => $config['utm_content'],
], '', '&', PHP_QUERY_RFC3986);

header('Location: ' . $config['destination'] . '?' . $query, true, 302);
exit;
