<?php
// app/Controllers/Admin/AdminInvoiceController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Invoice.php';

class AdminInvoiceController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $db = Database::getInstance()->getConnection();
        $invoices = $db->query("SELECT inv.*, u.name AS client_name 
            FROM `invoices` inv 
            JOIN `users` u ON inv.user_id = u.id 
            ORDER BY inv.id DESC")->fetchAll();

        $this->render('admin/invoices/index', [
            'pageTitle' => 'Manage Invoices',
            'invoices' => $invoices
        ], 'admin');
    }

    public function show(int $id): void {
        $invoice = Invoice::getWithDetails($id);
        if (!$invoice) {
            $this->redirect('/admin/invoices', 'error', 'Invoice not found.');
            return;
        }

        $this->render('admin/invoices/show', [
            'pageTitle' => 'Invoice ' . $invoice['invoice_number'],
            'invoice' => $invoice
        ], 'admin');
    }
}
