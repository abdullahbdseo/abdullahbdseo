<?php
// app/Models/User.php

require_once __DIR__ . '/../../core/Model.php';

class User extends Model {
    protected static string $table = 'users';

    public static function getClients(): array {
        $db = self::getDb();
        $stmt = $db->query("SELECT u.*, 
            (SELECT COUNT(*) FROM `orders` o WHERE o.user_id = u.id) AS orders_count,
            (SELECT SUM(total) FROM `orders` o WHERE o.user_id = u.id AND o.status IN ('payment_confirmed', 'in_progress', 'completed')) AS total_spent
            FROM `users` u 
            JOIN `role_user` ru ON u.id = ru.user_id 
            JOIN `roles` r ON ru.role_id = r.id 
            WHERE r.slug = 'client'
            ORDER BY u.id DESC");
        return $stmt->fetchAll();
    }
}
