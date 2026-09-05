<?php
// views/admin/invoices/index.php - Admin Invoices List
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Invoices & Billing</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Review all generated client invoices and payment records.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Invoice #</th>
                    <th>Order #</th>
                    <th>Client</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Issued Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($invoices as $inv): ?>
                    <tr>
                        <td style="font-weight: 700; color: #1e40af;"><?= e($inv['invoice_number']) ?></td>
                        <td><a href="<?= url('/admin/orders/' . $inv['order_id']) ?>">#<?= e($inv['order_id']) ?></a></td>
                        <td><?= e($inv['client_name']) ?></td>
                        <td style="font-weight: 700;"><?= formatCurrency($inv['total']) ?></td>
                        <td><span class="status-pill <?= e($inv['status']) ?>"><?= e($inv['status']) ?></span></td>
                        <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($inv['issued_at']) ?></td>
                        <td>
                            <a href="<?= url('/admin/invoices/' . $inv['id']) ?>" class="btn btn-sm btn-outline">
                                <i class="fa-solid fa-file-invoice"></i> View / Print
                            </a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
