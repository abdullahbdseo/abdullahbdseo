<?php
// views/admin/audit_logs/index.php - Audit Trail Logs
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Security & Activity Audit Trail</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Track administrative actions, logins, status changes, and settings modifications.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>Description</th>
                    <th>IP Address</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($logs)): ?>
                    <tr><td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">No audit records found.</td></tr>
                <?php else: ?>
                    <?php foreach ($logs as $log): ?>
                        <tr>
                            <td><span class="badge badge-primary"><?= e($log['action']) ?></span></td>
                            <td><?= e($log['user_name'] ?? 'System') ?></td>
                            <td><?= e($log['description']) ?></td>
                            <td style="font-family: monospace; font-size: 0.82rem; color: #64748b;"><?= e($log['ip_address']) ?></td>
                            <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($log['created_at'], 'M d, Y H:i:s') ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
