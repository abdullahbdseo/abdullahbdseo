<?php
// app/Models/HomepageSection.php

require_once __DIR__ . '/../../core/Model.php';

class HomepageSection extends Model {
    protected static string $table = 'homepage_sections';

    public static function getActiveSections(): array {
        $db = self::getDb();
        $stmt = $db->query("SELECT * FROM `homepage_sections` WHERE `is_active` = 1 ORDER BY `sort_order` ASC");
        $sections = [];
        while ($row = $stmt->fetch()) {
            $row['settings'] = !empty($row['settings_json']) ? json_decode($row['settings_json'], true) : [];
            $sections[$row['section_key']] = $row;
        }
        return $sections;
    }
}
