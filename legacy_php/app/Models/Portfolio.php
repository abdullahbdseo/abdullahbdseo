<?php
// app/Models/Portfolio.php

require_once __DIR__ . '/../../core/Model.php';

class Portfolio extends Model {
    protected static string $table = 'portfolios';

    public static function getActiveWithCategory(?string $categorySlug = null): array {
        $db = self::getDb();
        $sql = "SELECT p.*, pc.name AS category_name, pc.slug AS category_slug 
            FROM `portfolios` p 
            LEFT JOIN `portfolio_categories` pc ON p.category_id = pc.id 
            WHERE p.status = 'published'";
        $params = [];

        if ($categorySlug && $categorySlug !== 'all') {
            $sql .= " AND pc.slug = ?";
            $params[] = $categorySlug;
        }

        $sql .= " ORDER BY p.sort_order ASC, p.id DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function findBySlug(string $slug): ?array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT p.*, pc.name AS category_name, pc.slug AS category_slug 
            FROM `portfolios` p 
            LEFT JOIN `portfolio_categories` pc ON p.category_id = pc.id 
            WHERE p.slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $res = $stmt->fetch();
        return $res ?: null;
    }
}
