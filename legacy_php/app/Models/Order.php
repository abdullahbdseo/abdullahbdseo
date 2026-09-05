<?php
// app/Models/Order.php

require_once __DIR__ . '/../../core/Model.php';

class Order extends Model {
    protected static string $table = 'orders';

    public static function getWithDetails(int $orderId): ?array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT o.*, 
            s.title AS service_title, s.slug AS service_slug, s.icon AS service_icon,
            sp.name AS package_name, sp.delivery_days, sp.features_json,
            u.name AS client_name, u.email AS client_email, u.phone AS client_phone, u.country AS client_country,
            p.payment_ref, p.cryptocurrency, p.network, p.crypto_amount, p.wallet_address, p.transaction_hash, p.status AS payment_status,
            inv.invoice_number, inv.id AS invoice_id
            FROM `orders` o
            JOIN `services` s ON o.service_id = s.id
            JOIN `service_packages` sp ON o.package_id = sp.id
            JOIN `users` u ON o.user_id = u.id
            LEFT JOIN `payments` p ON o.id = p.order_id
            LEFT JOIN `invoices` inv ON o.id = inv.order_id
            WHERE o.id = ? LIMIT 1");
        $stmt->execute([$orderId]);
        $order = $stmt->fetch();

        if ($order) {
            // Fetch deliverables / files
            $fileStmt = $db->prepare("SELECT * FROM `order_files` WHERE `order_id` = ? ORDER BY `created_at` DESC");
            $fileStmt->execute([$orderId]);
            $order['files'] = $fileStmt->fetchAll();
        }

        return $order ?: null;
    }

    public static function getClientOrders(int $userId): array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT o.*, s.title AS service_title, sp.name AS package_name, 
            p.status AS payment_status, p.cryptocurrency 
            FROM `orders` o 
            JOIN `services` s ON o.service_id = s.id 
            JOIN `service_packages` sp ON o.package_id = sp.id 
            LEFT JOIN `payments` p ON o.id = p.order_id 
            WHERE o.user_id = ? 
            ORDER BY o.id DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public static function getAllAdminOrders(?string $status = null): array {
        $db = self::getDb();
        $sql = "SELECT o.*, s.title AS service_title, sp.name AS package_name, u.name AS client_name, u.email AS client_email,
            p.status AS payment_status, p.cryptocurrency 
            FROM `orders` o 
            JOIN `services` s ON o.service_id = s.id 
            JOIN `service_packages` sp ON o.package_id = sp.id 
            JOIN `users` u ON o.user_id = u.id 
            LEFT JOIN `payments` p ON o.id = p.order_id";
        
        $params = [];
        if ($status && $status !== 'all') {
            $sql .= " WHERE o.status = ?";
            $params[] = $status;
        }

        $sql .= " ORDER BY o.id DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}
