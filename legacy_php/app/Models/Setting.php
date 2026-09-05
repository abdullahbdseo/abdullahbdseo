<?php
// app/Models/Setting.php

require_once __DIR__ . '/../../core/Model.php';

class Setting extends Model {
    protected static string $table = 'settings';

    public static function getAllGrouped(): array {
        $db = self::getDb();
        $stmt = $db->query("SELECT * FROM `settings` ORDER BY `group` ASC, `id` ASC");
        $grouped = [];
        while ($row = $stmt->fetch()) {
            $grouped[$row['group']][] = $row;
        }
        return $grouped;
    }

    public static function set(string $key, $value, string $type = 'text', string $group = 'general'): bool {
        $db = self::getDb();
        $stmt = $db->prepare("INSERT INTO `settings` (`key`, `value`, `type`, `group`) 
            VALUES (?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `type` = VALUES(`type`), `group` = VALUES(`group`)");
        return $stmt->execute([$key, $value, $type, $group]);
    }
}
