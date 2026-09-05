<?php
// app/Controllers/Admin/AdminPaymentController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Payment.php';
require_once __DIR__ . '/../../Services/CryptoPaymentService.php';

class AdminPaymentController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $db = Database::getInstance()->getConnection();
        $payments = $db->query("SELECT p.*, u.name AS user_name, u.email AS user_email 
            FROM `payments` p 
            JOIN `users` u ON p.user_id = u.id 
            ORDER BY p.id DESC")->fetchAll();

        $this->render('admin/payments/index', [
            'pageTitle' => 'Crypto Payments & Gateway',
            'payments' => $payments
        ], 'admin');
    }

    public function confirm(int $paymentId): void {
        $this->validateCsrf();
        CryptoPaymentService::confirmPayment($paymentId);
        Auth::logAudit('payment_verify', 'Payment', $paymentId, "Admin verified crypto payment ID: {$paymentId}");
        $this->redirect('/admin/payments', 'success', 'Crypto payment verified and marked as paid.');
    }
}
