<?php
// app/Models/Testimonial.php

require_once __DIR__ . '/../../core/Model.php';

class Testimonial extends Model {
    protected static string $table = 'testimonials';

    public static function getActive(): array {
        return self::where('status', 'active', 'sort_order ASC, id DESC');
    }
}
