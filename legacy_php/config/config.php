<?php
// config/config.php - Global configuration & application constants

if (!defined('ROOT_PATH')) {
    define('ROOT_PATH', dirname(__DIR__));
}
if (!defined('APP_PATH')) {
    define('APP_PATH', ROOT_PATH . '/app');
}
if (!defined('VIEWS_PATH')) {
    define('VIEWS_PATH', ROOT_PATH . '/views');
}
if (!defined('ASSETS_PATH')) {
    define('ASSETS_PATH', ROOT_PATH . '/assets');
}
if (!defined('UPLOAD_PATH')) {
    define('UPLOAD_PATH', ROOT_PATH . '/uploads');
}

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'seoservice_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

// Application & URL Configuration
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost';

if (php_sapi_name() === 'cli') {
    $basePath = '/seoservice';
} else {
    $scriptDir = isset($_SERVER['SCRIPT_NAME']) ? dirname($_SERVER['SCRIPT_NAME']) : '/seoservice';
    $scriptDir = str_replace('\\', '/', $scriptDir);
    $basePath = ($scriptDir === '/' || $scriptDir === '.') ? '' : rtrim($scriptDir, '/');
    $basePath = preg_replace('#/(database|app|core|views)$#', '', $basePath);
}

define('BASE_PATH', $basePath);
define('SITE_URL', $protocol . $host . $basePath);
define('ASSETS_URL', SITE_URL . '/assets');
define('UPLOADS_URL', SITE_URL . '/uploads');

define('APP_NAME', 'Abdullah Saleh | SEO Specialist & Organic Growth Strategist');
define('APP_ENV', 'development');

// Session Setup
if (session_status() === PHP_SESSION_NONE && php_sapi_name() !== 'cli') {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_secure', 0);
    session_start();
}

// Error reporting
if (APP_ENV === 'development') {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    error_reporting(0);
}

// Create uploads directory if not exists
if (!is_dir(UPLOAD_PATH)) {
    @mkdir(UPLOAD_PATH, 0777, true);
    @mkdir(UPLOAD_PATH . '/deliverables', 0777, true);
    @mkdir(UPLOAD_PATH . '/images', 0777, true);
    @mkdir(UPLOAD_PATH . '/tickets', 0777, true);
}

// Auto-include Core Helpers & DB Singleton
require_once ROOT_PATH . '/core/Helpers.php';
require_once ROOT_PATH . '/core/Security.php';
require_once ROOT_PATH . '/core/Session.php';
require_once ROOT_PATH . '/config/database.php';

