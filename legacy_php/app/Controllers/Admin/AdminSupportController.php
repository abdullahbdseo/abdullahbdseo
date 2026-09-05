<?php
// app/Controllers/Admin/AdminSupportController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/SupportTicket.php';
require_once __DIR__ . '/../../Models/Notification.php';

class AdminSupportController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $db = Database::getInstance()->getConnection();
        $tickets = $db->query("SELECT t.*, u.name AS user_name 
            FROM `support_tickets` t 
            JOIN `users` u ON t.user_id = u.id 
            ORDER BY t.id DESC")->fetchAll();

        $this->render('admin/support/index', [
            'pageTitle' => 'Manage Support Tickets',
            'tickets' => $tickets
        ], 'admin');
    }

    public function show(int $id): void {
        $ticket = SupportTicket::getTicketWithMessages($id);
        if (!$ticket) {
            $this->redirect('/admin/support', 'error', 'Ticket not found.');
            return;
        }

        $this->render('admin/support/show', [
            'pageTitle' => 'Ticket #' . $ticket['ticket_number'],
            'ticket' => $ticket
        ], 'admin');
    }

    public function reply(int $id): void {
        $this->validateCsrf();
        $ticket = SupportTicket::find($id);

        if (!$ticket) {
            $this->redirect('/admin/support', 'error', 'Ticket not found.');
            return;
        }

        $message = Security::sanitizeString($_POST['message'] ?? '');
        if (!empty($message)) {
            $db = Database::getInstance()->getConnection();
            $db->prepare("INSERT INTO `support_messages` (`ticket_id`, `user_id`, `message`) VALUES (?, ?, ?)")
                ->execute([$id, Auth::id(), $message]);

            SupportTicket::update($id, ['status' => 'waiting_client']);

            Notification::create([
                'user_id' => $ticket['user_id'],
                'type' => 'support',
                'title' => 'New Reply on Ticket #' . $ticket['ticket_number'],
                'message' => 'Abdullah Saleh replied to your support ticket: ' . $ticket['subject'],
                'link' => '/admin/support/' . $id
            ]);
        }

        $this->redirect('/admin/support/' . $id, 'success', 'Reply recorded successfully.');
    }

    public function updateStatus(int $id): void {
        $this->validateCsrf();
        $status = Security::sanitizeString($_POST['status'] ?? 'open');
        SupportTicket::update($id, ['status' => $status]);
        $this->redirect('/admin/support/' . $id, 'success', 'Ticket status updated.');
    }
}
