<?php
// core/Helpers.php - Global helper functions

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';

/**
 * Escape HTML special characters
 */
function e(?string $string): string {
    return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Generate full URL
 */
function url(string $path = ''): string {
    $path = ltrim($path, '/');
    return rtrim(SITE_URL, '/') . ($path ? '/' . $path : '');
}

/**
 * Generate Asset URL
 */
function asset(string $path): string {
    $path = ltrim($path, '/');
    if (str_starts_with($path, 'assets/')) {
        $path = substr($path, 7);
    }
    return rtrim(ASSETS_URL, '/') . '/' . ltrim($path, '/');
}

/**
 * Generate Uploads URL
 */
function uploadUrl(?string $path): string {
    if (!$path) return '';
    if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
        return $path;
    }
    return rtrim(UPLOADS_URL, '/') . '/' . ltrim($path, '/');
}

/**
 * Fetch a global setting from database with static caching
 */
function setting(string $key, $default = null) {
    static $settingsCache = null;
    if ($settingsCache === null) {
        try {
            $db = Database::getInstance()->getConnection();
            $stmt = $db->query("SELECT `key`, `value` FROM `settings`");
            $settingsCache = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
        } catch (Exception $e) {
            $settingsCache = [];
        }
    }
    return $settingsCache[$key] ?? $default;
}

/**
 * Generate CSRF Token Field
 */
function csrf_field(): string {
    require_once __DIR__ . '/Session.php';
    $token = Session::csrfToken();
    return '<input type="hidden" name="_csrf_token" value="' . e($token) . '">';
}

/**
 * Get flash message
 */
function flash(string $key): ?string {
    require_once __DIR__ . '/Session.php';
    return Session::getFlash($key);
}

function getFlash(string $key): ?string {
    return flash($key);
}

/**
 * Format currency
 */
function formatCurrency(float $amount, string $currency = 'USD'): string {
    return '$' . number_format($amount, 2);
}

/**
 * Format date
 */
function formatDate(?string $date, string $format = 'M d, Y'): string {
    if (!$date) return 'N/A';
    return date($format, strtotime($date));
}

/**
 * Generate URL slug from title
 */
function slugify(string $text): string {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'n-a' : $text;
}

/**
 * Truncate text cleanly
 */
function str_limit(string $value, int $limit = 100, string $end = '...'): string {
    if (mb_strwidth($value, 'UTF-8') <= $limit) {
        return $value;
    }
    return rtrim(mb_strimwidth($value, 0, $limit, '', 'UTF-8')) . $end;
}

/**
 * Redirect to a given URL or relative path
 */
function redirect(string $path, int $statusCode = 302): void {
    if (!str_starts_with($path, 'http://') && !str_starts_with($path, 'https://')) {
        $path = url($path);
    }
    header("Location: {$path}", true, $statusCode);
    exit;
}

