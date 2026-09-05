<?php
// views/admin/clients/index.php - Admin Client Accounts List
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Registered Clients</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Manage client user accounts, order histories, and account status.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($clients as $client): ?>
                    <tr>
                        <td style="font-weight: 700; color: #0f172a;"><?= e($client['name']) ?></td>
                        <td><?= e($client['email']) ?></td>
                        <td><?= e($client['country'] ?? 'N/A') ?></td>
                        <td style="font-weight: 700;"><?= $client['orders_count'] ?? 0 ?></td>
                        <td style="font-weight: 700; color: #10b981;"><?= formatCurrency($client['total_spent'] ?? 0) ?></td>
                        <td><span class="status-pill <?= e($client['status']) ?>"><?= e($client['status']) ?></span></td>
                        <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($client['created_at']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
