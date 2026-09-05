<?php
// views/admin/payments/index.php - Admin Payments & Crypto Logs
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Crypto Payment Transactions</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Review blockchain deposits, verify transaction hashes, and inspect exchange rates.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Payment Ref</th>
                    <th>Order #</th>
                    <th>User</th>
                    <th>Crypto / Network</th>
                    <th>Amount (USD / Crypto)</th>
                    <th>TX Hash</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($payments)): ?>
                    <tr><td colspan="9" style="text-align: center; color: #64748b; padding: 20px;">No payments recorded yet.</td></tr>
                <?php else: ?>
                    <?php foreach ($payments as $p): ?>
                        <tr>
                            <td style="font-weight: 700; color: #1e40af;"><?= e($p['payment_ref']) ?></td>
                            <td><a href="<?= url('/admin/orders/' . $p['order_id']) ?>">#<?= e($p['order_id']) ?></a></td>
                            <td><?= e($p['user_name'] ?? 'Client') ?></td>
                            <td>
                                <strong><?= e($p['cryptocurrency']) ?></strong>
                                <div style="font-size: 0.75rem; color: #64748b;"><?= e($p['network']) ?></div>
                            </td>
                            <td>
                                <strong><?= formatCurrency($p['fiat_amount']) ?></strong>
                                <div style="font-size: 0.78rem; color: #64748b;"><?= number_format($p['crypto_amount'], 6) ?></div>
                            </td>
                            <td>
                                <?php if (!empty($p['transaction_hash'])): ?>
                                    <span style="font-family: monospace; font-size: 0.78rem;" title="<?= e($p['transaction_hash']) ?>">
                                        <?= substr($p['transaction_hash'], 0, 10) ?>...<?= substr($p['transaction_hash'], -8) ?>
                                    </span>
                                <?php else: ?>
                                    <span style="color: #94a3b8; font-size: 0.8rem;">Waiting for TX</span>
                                <?php endif; ?>
                            </td>
                            <td><span class="status-pill <?= e($p['status']) ?>"><?= e($p['status']) ?></span></td>
                            <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($p['created_at']) ?></td>
                            <td>
                                <?php if ($p['status'] !== 'paid'): ?>
                                    <form action="<?= url('/admin/payments/' . $p['id'] . '/confirm') ?>" method="POST">
                                        <?= csrf_field() ?>
                                        <button type="submit" class="btn btn-sm btn-primary" style="background: #10b981; border-color: #10b981;" title="Confirm & Verify Payment">
                                            <i class="fa-solid fa-check"></i> Verify
                                        </button>
                                    </form>
                                <?php else: ?>
                                    <span style="color: #10b981; font-weight: 700; font-size: 0.85rem;"><i class="fa-solid fa-check-double"></i> Verified</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
