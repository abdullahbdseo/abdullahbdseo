<?php
// app/Models/Faq.php

require_once __DIR__ . '/../../core/Model.php';

class Faq extends Model {
    protected static string $table = 'faqs';

    public static function getActive(): array {
        return self::where('status', 'active', 'sort_order ASC, id ASC');
    }
}
