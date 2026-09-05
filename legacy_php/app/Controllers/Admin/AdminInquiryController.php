<?php
// app/Controllers/Admin/AdminInquiryController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/ContactInquiry.php';

class AdminInquiryController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $inquiries = ContactInquiry::all('id DESC');
        $this->render('admin/inquiries/index', [
            'pageTitle' => 'Contact Inquiries',
            'inquiries' => $inquiries
        ], 'admin');
    }

    public function show(int $id): void {
        $inquiry = ContactInquiry::find($id);
        if (!$inquiry) {
            $this->redirect('/admin/inquiries', 'error', 'Inquiry not found.');
            return;
        }

        if ($inquiry['status'] === 'new') {
            ContactInquiry::update($id, ['status' => 'read']);
        }

        $this->render('admin/inquiries/show', [
            'pageTitle' => 'Inquiry from ' . $inquiry['name'],
            'inquiry' => $inquiry
        ], 'admin');
    }

    public function markReplied(int $id): void {
        $this->validateCsrf();
        ContactInquiry::update($id, [
            'status' => 'replied',
            'replied_at' => date('Y-m-d H:i:s')
        ]);
        $this->redirect('/admin/inquiries/' . $id, 'success', 'Marked as replied.');
    }
}
