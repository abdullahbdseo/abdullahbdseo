<?php
// app/Models/Payment.php

require_once __DIR__ . '/../../core/Model.php';

class Payment extends Model {
    protected static string $table = 'payments';

    public static function getByOrderId(int $orderId): ?array {
        return self::findBy('order_id', $orderId);
    }
}
