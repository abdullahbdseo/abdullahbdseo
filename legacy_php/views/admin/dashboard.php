<?php
// views/admin/dashboard.php - Admin Dashboard Overview
?>

<div style="margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;">
    <div>
        <h2 style="font-size: 1.7rem; color: #0f172a; margin-bottom: 4px;">Executive Dashboard</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Real-time business performance, revenue, orders, and inquiries.</p>
    </div>
    <div>
        <a href="<?= url('/admin/services/create') ?>" class="btn btn-sm btn-primary"><i class="fa-solid fa-plus"></i> Add New Service</a>
    </div>
</div>

<!-- KPI Cards -->
<div class="admin-stats-grid">
    <div class="admin-stat-card">
        <div class="admin-stat-icon green"><i class="fa-solid fa-dollar-sign"></i></div>
        <div class="admin-stat-info">
            <h4>Total Revenue</h4>
            <div class="admin-stat-val"><?= formatCurrency($stats['total_revenue'] ?? 0) ?></div>
        </div>
    </div>
    <div class="admin-stat-card">
        <div class="admin-stat-icon blue"><i class="fa-solid fa-cart-shopping"></i></div>
        <div class="admin-stat-info">
            <h4>Total Orders</h4>
            <div class="admin-stat-val"><?= $stats['total_orders'] ?? 0 ?></div>
        </div>
    </div>
    <div class="admin-stat-card">
        <div class="admin-stat-icon purple"><i class="fa-solid fa-users"></i></div>
        <div class="admin-stat-info">
            <h4>Total Clients</h4>
            <div class="admin-stat-val"><?= $stats['total_clients'] ?? 0 ?></div>
        </div>
    </div>
    <div class="admin-stat-card">
        <div class="admin-stat-icon amber"><i class="fa-solid fa-envelope-open-text"></i></div>
        <div class="admin-stat-info">
            <h4>Contact Inquiries</h4>
            <div class="admin-stat-val"><?= $stats['total_inquiries'] ?? 0 ?></div>
        </div>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
    <!-- Recent Orders -->
    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Recent Orders</h3>
            <a href="<?= url('/admin/orders') ?>" style="font-size: 0.85rem; font-weight: 600;">View All</a>
        </div>
        <div class="table-responsive">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recentOrders)): ?>
                        <tr><td colspan="6" style="text-align: center; color: #64748b; padding: 20px;">No orders recorded yet.</td></tr>
                    <?php else: ?>
                        <?php foreach ($recentOrders as $ro): ?>
                            <tr>
                                <td style="font-weight: 700; color: #1e40af;">#<?= e($ro['order_number']) ?></td>
                                <td><?= e($ro['client_name']) ?></td>
                                <td><?= e($ro['service_title']) ?></td>
                                <td style="font-weight: 700;"><?= formatCurrency($ro['total']) ?></td>
                                <td><span class="status-pill <?= e($ro['status']) ?>"><?= str_replace('_', ' ', e($ro['status'])) ?></span></td>
                                <td><a href="<?= url('/admin/orders/' . $ro['id']) ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-gear"></i> Manage</a></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Recent Contact Inquiries -->
    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Recent Inquiries</h3>
            <a href="<?= url('/admin/inquiries') ?>" style="font-size: 0.85rem; font-weight: 600;">View All</a>
        </div>
        <div class="table-responsive">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Website</th>
                        <th>Budget</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recentInquiries)): ?>
                        <tr><td colspan="4" style="text-align: center; color: #64748b; padding: 20px;">No inquiries recorded yet.</td></tr>
                    <?php else: ?>
                        <?php foreach ($recentInquiries as $inq): ?>
                            <tr>
                                <td>
                                    <div style="font-weight: 600;"><?= e($inq['name']) ?></div>
                                    <div style="font-size: 0.78rem; color: #64748b;"><?= e($inq['email']) ?></div>
                                </td>
                                <td style="font-size: 0.85rem;"><?= e(str_limit($inq['website'] ?? '', 20)) ?></td>
                                <td><span class="badge badge-cyan" style="font-size: 0.72rem;"><?= e($inq['budget']) ?></span></td>
                                <td><a href="<?= url('/admin/inquiries/' . $inq['id']) ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-eye"></i></a></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
