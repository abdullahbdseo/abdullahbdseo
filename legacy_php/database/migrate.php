<?php
// database/migrate.php - Run migrations and seed the database

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/seeder.php';

header('Content-Type: text/plain; charset=utf-8');

try {
    echo "========================================================\n";
    echo " ABDULLAH SALEH SEO SERVICE PLATFORM — DATABASE MIGRATION\n";
    echo "========================================================\n\n";

    // 1. Initial Connection to MySQL server (without selecting DB first)
    $host = DB_HOST;
    $user = DB_USER;
    $pass = DB_PASS;
    $dbname = DB_NAME;

    $pdoInit = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    echo "1. Checking / Creating Database `$dbname`...\n";
    $pdoInit->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    echo "   Database `$dbname` ready.\n\n";

    // 2. Connect to the target DB
    $db = Database::getInstance()->getConnection();

    // 3. Read and run schema.sql
    echo "2. Applying Schema (37 tables)...\n";
    $schemaFile = __DIR__ . '/schema.sql';
    if (!file_exists($schemaFile)) {
        throw new Exception("schema.sql not found at $schemaFile");
    }

    $schemaSql = file_get_contents($schemaFile);
    $db->exec($schemaSql);
    echo "   Schema applied successfully.\n\n";

    // 4. Run Seeder
    echo "3. Running Seeder (Admin, Client, Services, Content, Settings)...\n";
    runDatabaseSeeder();

    echo "\n========================================================\n";
    echo " SUCCESS: Database migration and seeding completed!\n";
    echo " Admin Login: admin@seoservice.local / Admin@123456\n";
    echo " Client Login: client@seoservice.local / Client@123456\n";
    echo " Site URL: " . SITE_URL . "\n";
    echo "========================================================\n";

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
    http_response_code(500);
}
