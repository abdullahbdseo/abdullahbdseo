<?php
// app/Controllers/Admin/AdminDashboardController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Order.php';
require_once __DIR__ . '/../../Models/User.php';
require_once __DIR__ . '/../../Models/ContactInquiry.php';
require_once __DIR__ . '/../../Models/Payment.php';

class AdminDashboardController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $db = Database::getInstance()->getConnection();

        // Calculate KPIs
        $totalRevenue = (float)$db->query("SELECT SUM(total) FROM `orders` WHERE `status` IN ('payment_confirmed', 'in_progress', 'completed')")->fetchColumn();
        $totalOrders = (int)$db->query("SELECT COUNT(*) FROM `orders`")->fetchColumn();
        $totalClients = (int)$db->query("SELECT COUNT(*) FROM `users` u JOIN `role_user` ru ON u.id = ru.user_id WHERE ru.role_id = 2")->fetchColumn();
        $totalInquiries = (int)$db->query("SELECT COUNT(*) FROM `contact_inquiries`")->fetchColumn();

        $recentOrders = Order::getAllAdminOrders();
        $recentOrders = array_slice($recentOrders, 0, 5);

        $recentInquiries = ContactInquiry::all('id DESC LIMIT 5');

        $this->render('admin/dashboard', [
            'pageTitle' => 'Admin Overview Dashboard',
            'stats' => [
                'total_revenue' => $totalRevenue,
                'total_orders' => $totalOrders,
                'total_clients' => $totalClients,
                'total_inquiries' => $totalInquiries
            ],
            'recentOrders' => $recentOrders,
            'recentInquiries' => $recentInquiries
        ], 'admin');
    }
}
