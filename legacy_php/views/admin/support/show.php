<?php
// views/admin/support/show.php - Admin Support Ticket Reply & Status
?>

<div style="max-width: 800px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
            <a href="<?= url('/admin/support') ?>" style="color: #64748b; font-size: 0.9rem;"><i class="fa-solid fa-arrow-left"></i> Back to Tickets</a>
            <h2 style="font-size: 1.5rem; color: #0f172a; margin-top: 6px;">[<?= e($ticket['ticket_number']) ?>] <?= e($ticket['subject']) ?></h2>
            <div style="font-size: 0.85rem; color: #64748b;">Client: <?= e($ticket['user_name']) ?> (<?= e($ticket['user_email']) ?>)</div>
        </div>

        <form action="<?= url('/admin/support/' . $ticket['id'] . '/status') ?>" method="POST" style="display: flex; gap: 8px;">
            <?= csrf_field() ?>
            <select name="status" class="form-control" style="width: auto;" onchange="this.form.submit()">
                <option value="open" <?= $ticket['status'] === 'open' ? 'selected' : '' ?>>Open</option>
                <option value="in_progress" <?= $ticket['status'] === 'in_progress' ? 'selected' : '' ?>>In Progress</option>
                <option value="waiting_client" <?= $ticket['status'] === 'waiting_client' ? 'selected' : '' ?>>Waiting for Client</option>
                <option value="resolved" <?= $ticket['status'] === 'resolved' ? 'selected' : '' ?>>Resolved</option>
                <option value="closed" <?= $ticket['status'] === 'closed' ? 'selected' : '' ?>>Closed</option>
            </select>
        </form>
    </div>

    <!-- Messages -->
    <div style="margin-bottom: 30px;">
        <?php foreach ($ticket['messages'] as $msg): ?>
            <?php $isAdminMsg = in_array($msg['role_slug'] ?? '', ['super_admin', 'admin']); ?>
            <div style="background: <?= $isAdminMsg ? '#eff6ff' : '#ffffff' ?>; border: 1px solid <?= $isAdminMsg ? '#bfdbfe' : '#e2e8f0' ?>; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <div style="font-weight: 700; color: <?= $isAdminMsg ? '#1e40af' : '#0f172a' ?>;">
                        <?= e($msg['author_name']) ?> <?= $isAdminMsg ? '<span class="badge badge-primary" style="font-size:0.7rem; margin-left:6px;">Abdullah Saleh (Admin)</span>' : '' ?>
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;"><?= formatDate($msg['created_at'], 'M d, Y h:i A') ?></div>
                </div>
                <div style="font-size: 0.95rem; color: #334155; line-height: 1.6;">
                    <?= nl2br(e($msg['message'])) ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Reply Form -->
    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Admin Reply to Client</h3>
        </div>
        <div class="admin-card-body">
            <form action="<?= url('/admin/support/' . $ticket['id'] . '/reply') ?>" method="POST">
                <?= csrf_field() ?>
                <div class="form-group">
                    <textarea name="message" class="form-control" style="min-height: 120px;" required placeholder="Write your reply to the client..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Send Admin Reply</button>
            </form>
        </div>
    </div>
</div>
