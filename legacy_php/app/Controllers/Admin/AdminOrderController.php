<?php
// app/Controllers/Admin/AdminOrderController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Order.php';
require_once __DIR__ . '/../../Models/Notification.php';

class AdminOrderController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $orders = Order::getAllAdminOrders();
        $this->render('admin/orders/index', [
            'pageTitle' => 'Manage Orders',
            'orders' => $orders
        ], 'admin');
    }

    public function show(int $id): void {
        $order = Order::getWithDetails($id);
        if (!$order) {
            $this->redirect('/admin/orders', 'error', 'Order not found.');
            return;
        }

        $this->render('admin/orders/show', [
            'pageTitle' => 'Order #' . $order['order_number'],
            'order' => $order
        ], 'admin');
    }

    public function updateStatus(int $id): void {
        $this->validateCsrf();

        $status = Security::sanitizeString($_POST['status'] ?? 'pending');
        $adminNotes = Security::sanitizeString($_POST['admin_notes'] ?? '');

        Order::update($id, [
            'status' => $status,
            'admin_notes' => $adminNotes
        ]);

        $order = Order::find($id);
        Notification::create([
            'user_id' => $order['user_id'],
            'type' => 'order',
            'title' => 'Order #' . $order['order_number'] . ' Status Updated',
            'message' => 'Project status is now: ' . ucfirst(str_replace('_', ' ', $status)),
            'link' => '/admin/orders/' . $id
        ]);

        Auth::logAudit('order_status_update', 'Order', $id, "Updated order #{$order['order_number']} to {$status}");
        $this->redirect('/admin/orders/' . $id, 'success', 'Order status updated.');
    }

    public function uploadDeliverable(int $id): void {
        $this->validateCsrf();
        $order = Order::find($id);

        if (!$order || empty($_FILES['deliverable_file'])) {
            $this->redirect('/admin/orders/' . $id, 'error', 'No file selected.');
            return;
        }

        $validation = Security::validateFileUpload($_FILES['deliverable_file'], ['pdf', 'zip', 'xlsx', 'docx', 'csv', 'png', 'jpg']);
        if (!$validation['valid']) {
            $this->redirect('/admin/orders/' . $id, 'error', $validation['error']);
            return;
        }

        $file = $_FILES['deliverable_file'];
        $cleanName = slugify(pathinfo($file['name'], PATHINFO_FILENAME)) . '-' . time() . '.' . $validation['extension'];
        $destPath = UPLOAD_PATH . '/deliverables/' . $cleanName;

        if (move_uploaded_file($file['tmp_name'], $destPath)) {
            $notes = Security::sanitizeString($_POST['notes'] ?? 'Completed Deliverable');
            $db = Database::getInstance()->getConnection();
            $stmt = $db->prepare("INSERT INTO `order_files` (`order_id`, `uploaded_by`, `filename`, `path`, `mime_type`, `size`, `type`, `notes`) 
                VALUES (?, ?, ?, ?, ?, ?, 'admin_deliverable', ?)");
            $stmt->execute([
                $id,
                Auth::id(),
                $file['name'],
                'deliverables/' . $cleanName,
                $validation['mime'],
                $file['size'],
                $notes
            ]);

            // Create Notification
            Notification::create([
                'user_id' => $order['user_id'],
                'type' => 'deliverable',
                'title' => 'New Deliverable Available for Order #' . $order['order_number'],
                'message' => "Uploaded a new deliverable file: {$file['name']}",
                'link' => '/admin/orders/' . $id
            ]);

            Auth::logAudit('deliverable_upload', 'Order', $id, "Uploaded deliverable {$file['name']} for order #{$order['order_number']}");
            $this->redirect('/admin/orders/' . $id, 'success', 'Deliverable uploaded successfully.');
        } else {
            $this->redirect('/admin/orders/' . $id, 'error', 'Failed to move uploaded file.');
        }
    }
}
