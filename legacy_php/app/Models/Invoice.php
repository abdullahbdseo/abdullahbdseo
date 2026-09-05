<?php
// app/Models/Invoice.php

require_once __DIR__ . '/../../core/Model.php';

class Invoice extends Model {
    protected static string $table = 'invoices';

    public static function getWithDetails(int $invoiceId): ?array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT inv.*, 
            o.order_number, o.created_at AS order_date, o.website_url,
            s.title AS service_title, sp.name AS package_name,
            u.name AS client_name, u.email AS client_email, u.phone AS client_phone, u.country AS client_country,
            p.payment_ref, p.cryptocurrency, p.network, p.crypto_amount, p.wallet_address, p.transaction_hash
            FROM `invoices` inv
            JOIN `orders` o ON inv.order_id = o.id
            JOIN `services` s ON o.service_id = s.id
            JOIN `service_packages` sp ON o.package_id = sp.id
            JOIN `users` u ON inv.user_id = u.id
            LEFT JOIN `payments` p ON o.id = p.order_id
            WHERE inv.id = ? LIMIT 1");
        $stmt->execute([$invoiceId]);
        $inv = $stmt->fetch();
        return $inv ?: null;
    }
}
