<?php
// views/admin/support/index.php - Support Tickets Management
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Support Tickets</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Respond to client tickets, technical questions, and order inquiries.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Ticket #</th>
                    <th>User</th>
                    <th>Subject</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($tickets)): ?>
                    <tr><td colspan="7" style="text-align: center; color: #64748b; padding: 20px;">No support tickets recorded.</td></tr>
                <?php else: ?>
                    <?php foreach ($tickets as $t): ?>
                        <tr>
                            <td style="font-weight: 700; color: #1e40af;"><?= e($t['ticket_number']) ?></td>
                            <td><?= e($t['user_name'] ?? 'Client') ?></td>
                            <td style="font-weight: 600; color: #0f172a;"><?= e($t['subject']) ?></td>
                            <td><span class="status-pill <?= e($t['priority']) ?>"><?= ucfirst(e($t['priority'])) ?></span></td>
                            <td><span class="status-pill <?= e($t['status']) ?>"><?= str_replace('_', ' ', ucfirst(e($t['status']))) ?></span></td>
                            <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($t['created_at']) ?></td>
                            <td>
                                <a href="<?= url('/admin/support/' . $t['id']) ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-comments"></i> Manage</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
