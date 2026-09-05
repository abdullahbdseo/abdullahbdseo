<?php
// app/Models/Notification.php

require_once __DIR__ . '/../../core/Model.php';

class Notification extends Model {
    protected static string $table = 'notifications';

    public static function getUserNotifications(int $userId): array {
        return self::where('user_id', $userId, 'created_at DESC');
    }

    public static function markAllAsRead(int $userId): bool {
        $db = self::getDb();
        $stmt = $db->prepare("UPDATE `notifications` SET `read_at` = NOW() WHERE `user_id` = ? AND `read_at` IS NULL");
        return $stmt->execute([$userId]);
    }
}
