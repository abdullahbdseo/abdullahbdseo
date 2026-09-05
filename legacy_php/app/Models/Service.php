<?php
// app/Models/Service.php

require_once __DIR__ . '/../../core/Model.php';

class Service extends Model {
    protected static string $table = 'services';

    public static function getActiveWithCategory(): array {
        $db = self::getDb();
        $stmt = $db->query("SELECT s.*, c.name AS category_name, c.slug AS category_slug 
            FROM `services` s 
            LEFT JOIN `service_categories` c ON s.category_id = c.id 
            WHERE s.status = 'active' 
            ORDER BY s.sort_order ASC, s.id ASC");
        return $stmt->fetchAll();
    }

    public static function findBySlug(string $slug): ?array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT s.*, c.name AS category_name, c.slug AS category_slug 
            FROM `services` s 
            LEFT JOIN `service_categories` c ON s.category_id = c.id 
            WHERE s.slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $res = $stmt->fetch();
        if ($res) {
            // Fetch packages
            $pkgStmt = $db->prepare("SELECT * FROM `service_packages` WHERE `service_id` = ? AND `status` = 'active' ORDER BY `sort_order` ASC");
            $pkgStmt->execute([$res['id']]);
            $res['packages'] = $pkgStmt->fetchAll();

            // Fetch FAQs
            $faqStmt = $db->prepare("SELECT * FROM `service_faqs` WHERE `service_id` = ? AND `status` = 'active' ORDER BY `sort_order` ASC");
            $faqStmt->execute([$res['id']]);
            $res['faqs'] = $faqStmt->fetchAll();
        }
        return $res ?: null;
    }
}
