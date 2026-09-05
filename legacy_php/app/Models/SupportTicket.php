<?php
// app/Models/SupportTicket.php

require_once __DIR__ . '/../../core/Model.php';

class SupportTicket extends Model {
    protected static string $table = 'support_tickets';

    public static function getTicketWithMessages(int $ticketId): ?array {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT t.*, u.name AS user_name, u.email AS user_email, o.order_number 
            FROM `support_tickets` t 
            JOIN `users` u ON t.user_id = u.id 
            LEFT JOIN `orders` o ON t.order_id = o.id 
            WHERE t.id = ? LIMIT 1");
        $stmt->execute([$ticketId]);
        $ticket = $stmt->fetch();

        if ($ticket) {
            $msgStmt = $db->prepare("SELECT m.*, u.name AS author_name, r.slug AS role_slug 
                FROM `support_messages` m 
                JOIN `users` u ON m.user_id = u.id 
                LEFT JOIN `role_user` ru ON u.id = ru.user_id 
                LEFT JOIN `roles` r ON ru.role_id = r.id 
                WHERE m.ticket_id = ? 
                ORDER BY m.created_at ASC");
            $msgStmt->execute([$ticketId]);
            $ticket['messages'] = $msgStmt->fetchAll();
        }

        return $ticket ?: null;
    }
}
