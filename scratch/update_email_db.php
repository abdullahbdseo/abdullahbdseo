<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';

try {
    $db = Database::getInstance()->getConnection();
    
    // Update or Insert contact_email
    $stmt = $db->prepare("INSERT INTO settings (`key`, value, type, `group`, is_public, created_at, updated_at) 
        VALUES ('contact_email', 'abdullahbd.seo@gmail.com', 'text', 'contact', 1, NOW(), NOW())
        ON DUPLICATE KEY UPDATE value = 'abdullahbd.seo@gmail.com', updated_at = NOW()");
    $stmt->execute();
    
    echo "Database contact_email updated successfully to abdullahbd.seo@gmail.com\n";
    
    // Check current value
    $stmt = $db->prepare("SELECT * FROM settings WHERE `key` = 'contact_email'");
    $stmt->execute();
    $row = $stmt->fetch();
    print_r($row);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
