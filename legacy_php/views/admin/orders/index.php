<?php
// views/admin/orders/index.php - Admin Orders Management
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Orders & Projects</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Track incoming client orders, update project workflows, and upload deliverables.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Order #</th>
                    <th>Client</th>
                    <th>Service & Package</th>
                    <th>Amount</th>
                    <th>Order Status</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($orders)): ?>
                    <tr><td colspan="8" style="text-align: center; color: #64748b; padding: 20px;">No orders found.</td></tr>
                <?php else: ?>
                    <?php foreach ($orders as $order): ?>
                        <tr>
                            <td style="font-weight: 700; color: #1e40af;">#<?= e($order['order_number']) ?></td>
                            <td>
                                <div style="font-weight: 600; color: #0f172a;"><?= e($order['client_name']) ?></div>
                                <div style="font-size: 0.78rem; color: #64748b;"><?= e($order['client_email']) ?></div>
                            </td>
                            <td>
                                <div style="font-weight: 600;"><?= e($order['service_title']) ?></div>
                                <div style="font-size: 0.8rem; color: #64748b;"><?= e($order['package_name']) ?></div>
                            </td>
                            <td style="font-weight: 700;"><?= formatCurrency($order['total']) ?></td>
                            <td><span class="status-pill <?= e($order['status']) ?>"><?= str_replace('_', ' ', e($order['status'])) ?></span></td>
                            <td><span class="status-pill <?= e($order['payment_status'] ?? 'waiting') ?>"><?= e($order['payment_status'] ?? 'waiting') ?></span></td>
                            <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($order['created_at']) ?></td>
                            <td>
                                <a href="<?= url('/admin/orders/' . $order['id']) ?>" class="btn btn-sm btn-outline">
                                    <i class="fa-solid fa-gear"></i> Manage
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
