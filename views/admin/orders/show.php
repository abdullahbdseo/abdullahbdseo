<?php
// views/admin/orders/show.php - Admin Order Control Center
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <a href="<?= url('/admin/orders') ?>" style="color: #64748b; font-size: 0.9rem;"><i class="fa-solid fa-arrow-left"></i> Back to Orders</a>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-top: 6px;">Manage Order #<?= e($order['order_number']) ?></h2>
    </div>

    <div>
        <?php if (!empty($order['invoice_id'])): ?>
            <a href="<?= url('/admin/invoices/' . $order['invoice_id']) ?>" target="_blank" class="btn btn-outline">
                <i class="fa-solid fa-file-invoice"></i> View Invoice
            </a>
        <?php endif; ?>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 24px;">
    <div>
        <!-- Order Requirements & Deliverables -->
        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Client Requirements</h3>
            </div>
            <div class="admin-card-body">
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Website URL</div>
                    <div style="font-weight: 600; font-size: 1rem;"><a href="<?= e($order['website_url']) ?>" target="_blank"><?= e($order['website_url']) ?></a></div>
                </div>

                <div style="margin-bottom: 16px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Target Region</div>
                    <div><?= e($order['target_country'] ?? 'Global') ?></div>
                </div>

                <div style="margin-bottom: 16px;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Target Keywords</div>
                    <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                        <?= nl2br(e($order['target_keywords'] ?? 'None')) ?>
                    </div>
                </div>

                <div>
                    <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Client Notes</div>
                    <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                        <?= nl2br(e($order['client_notes'] ?? 'None')) ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Deliverable Upload Center -->
        <div class="admin-card">
            <div class="admin-card-header">
                <h3><i class="fa-solid fa-cloud-arrow-up" style="color: #2563eb;"></i> Deliverables & Completed Reports</h3>
            </div>
            <div class="admin-card-body">
                <?php if (!empty($order['files'])): ?>
                    <ul style="list-style: none; margin-bottom: 24px;">
                        <?php foreach ($order['files'] as $f): ?>
                            <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px;">
                                <div>
                                    <div style="font-weight: 700; color: #0f172a;"><?= e($f['filename']) ?></div>
                                    <div style="font-size: 0.78rem; color: #64748b;"><?= e($f['notes'] ?? 'Deliverable') ?> • <?= formatDate($f['created_at']) ?></div>
                                </div>
                                <a href="<?= uploadUrl($f['path']) ?>" download class="btn btn-sm btn-outline"><i class="fa-solid fa-download"></i></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>

                <form action="<?= url('/admin/orders/' . $order['id'] . '/upload-deliverable') ?>" method="POST" enctype="multipart/form-data">
                    <?= csrf_field() ?>
                    <div class="form-group">
                        <label class="form-label">Upload New Deliverable File (PDF, XLSX, ZIP, DOCX)</label>
                        <input type="file" name="deliverable_file" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Deliverable Label / Note</label>
                        <input type="text" name="notes" class="form-control" placeholder="e.g. Final Technical Audit Roadmap PDF">
                    </div>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-upload"></i> Upload Deliverable to Client</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Status & Admin Actions -->
    <div>
        <!-- Order Status Updater -->
        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Order Status Control</h3>
            </div>
            <div class="admin-card-body">
                <form action="<?= url('/admin/orders/' . $order['id'] . '/update-status') ?>" method="POST">
                    <?= csrf_field() ?>

                    <div class="form-group">
                        <label class="form-label">Project Status</label>
                        <select name="status" class="form-control">
                            <option value="pending" <?= $order['status'] === 'pending' ? 'selected' : '' ?>>Pending</option>
                            <option value="awaiting_payment" <?= $order['status'] === 'awaiting_payment' ? 'selected' : '' ?>>Awaiting Payment</option>
                            <option value="payment_submitted" <?= $order['status'] === 'payment_submitted' ? 'selected' : '' ?>>Payment Submitted</option>
                            <option value="payment_confirmed" <?= $order['status'] === 'payment_confirmed' ? 'selected' : '' ?>>Payment Confirmed</option>
                            <option value="in_progress" <?= $order['status'] === 'in_progress' ? 'selected' : '' ?>>In Progress</option>
                            <option value="waiting_client" <?= $order['status'] === 'waiting_client' ? 'selected' : '' ?>>Waiting for Client</option>
                            <option value="completed" <?= $order['status'] === 'completed' ? 'selected' : '' ?>>Completed</option>
                            <option value="cancelled" <?= $order['status'] === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Internal Admin Notes</label>
                        <textarea name="admin_notes" class="form-control" style="min-height: 100px;"><?= e($order['admin_notes'] ?? '') ?></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">Update Status</button>
                </form>
            </div>
        </div>

        <!-- Payment Details -->
        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Payment Details</h3>
            </div>
            <div class="admin-card-body">
                <div style="font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Amount:</strong> <?= formatCurrency($order['total']) ?>
                </div>
                <div style="font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Method:</strong> <?= e($order['cryptocurrency'] ?? 'Crypto') ?>
                </div>
                <div style="font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Status:</strong> <span class="status-pill <?= e($order['payment_status'] ?? 'waiting') ?>"><?= e($order['payment_status'] ?? 'waiting') ?></span>
                </div>
                <?php if (!empty($order['transaction_hash'])): ?>
                    <div style="font-size: 0.82rem; color: #475569; word-break: break-all; margin-top: 10px; background: #f8fafc; padding: 8px; border-radius: 6px;">
                        <strong>TX Hash:</strong> <?= e($order['transaction_hash']) ?>
                    </div>
                <?php endif; ?>

                <?php if ($order['payment_status'] !== 'paid'): ?>
                    <form action="<?= url('/admin/payments/' . ($order['id']) . '/confirm') ?>" method="POST" style="margin-top: 16px;">
                        <?= csrf_field() ?>
                        <button type="submit" class="btn btn-sm btn-primary btn-block" style="background: #10b981; border-color: #10b981;">
                            <i class="fa-solid fa-check-double"></i> Mark Payment as Verified
                        </button>
                    </form>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
