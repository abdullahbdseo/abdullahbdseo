<?php
// app/Models/BlogPost.php

require_once __DIR__ . '/../../core/Model.php';

class BlogPost extends Model {
    protected static string $table = 'blog_posts';

    public static function getPublished(?string $categorySlug = null, ?string $search = null, int $limit = 10, int $offset = 0): array {
        $db = self::getDb();
        $sql = "SELECT b.*, c.name AS category_name, c.slug AS category_slug, u.name AS author_name 
            FROM `blog_posts` b 
            LEFT JOIN `blog_categories` c ON b.category_id = c.id 
            LEFT JOIN `users` u ON b.author_id = u.id 
            WHERE b.status = 'published'";
        $params = [];

        if ($categorySlug) {
            $sql .= " AND c.slug = ?";
            $params[] = $categorySlug;
        }

        if ($search) {
            $sql .= " AND (b.title LIKE ? OR b.excerpt LIKE ? OR b.content LIKE ?)";
            $searchTerm = "%{$search}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $sql .= " ORDER BY b.published_at DESC LIMIT {$limit} OFFSET {$offset}";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function findBySlug(string $slug): ?array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT b.*, c.name AS category_name, c.slug AS category_slug, u.name AS author_name 
            FROM `blog_posts` b 
            LEFT JOIN `blog_categories` c ON b.category_id = c.id 
            LEFT JOIN `users` u ON b.author_id = u.id 
            WHERE b.slug = ? AND b.status = 'published' LIMIT 1");
        $stmt->execute([$slug]);
        $res = $stmt->fetch();
        if ($res) {
            // Increment view count
            $db->prepare("UPDATE `blog_posts` SET `views` = `views` + 1 WHERE `id` = ?")->execute([$res['id']]);
        }
        return $res ?: null;
    }
}
