<?php
// views/admin/invoices/show.php - Official Printable Invoice View in Admin Panel
?>

<div style="max-width: 860px; margin: 0 auto;">
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <a href="<?= url('/admin/invoices') ?>" style="color: #64748b; font-size: 0.88rem; font-weight: 600; text-decoration: none;"><i class="fa-solid fa-arrow-left"></i> Back to Invoices</a>
        <button onclick="window.print()" class="btn btn-primary btn-sm"><i class="fa-solid fa-print"></i> Print / Download PDF</button>
    </div>

    <div class="admin-card" style="padding: 36px;">
        <!-- Invoice Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 28px;">
            <div>
                <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 4px;">
                    <?= e(setting('site_name', 'Abdullah Saleh')) ?>
                </div>
                <div style="font-size: 0.85rem; color: #64748b;"><?= e(setting('expert_name', 'Abdullah Saleh')) ?> — SEO Consultancy</div>
                <div style="font-size: 0.82rem; color: #64748b;"><?= e(setting('contact_email', 'abdullahbd.seo@gmail.com')) ?></div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.4rem; font-weight: 800; color: #4338ca; font-family: 'Plus Jakarta Sans', sans-serif;">INVOICE</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-top: 2px;"><?= e($invoice['invoice_number']) ?></div>
                <div style="font-size: 0.82rem; color: #64748b; margin-top: 2px;">Date: <?= formatDate($invoice['issued_at']) ?></div>
                <div style="margin-top: 6px;"><span class="status-pill paid">PAID &amp; VERIFIED</span></div>
            </div>
        </div>

        <!-- Bill To -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;">
            <div>
                <div style="font-size: 0.76rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Billed To:</div>
                <div style="font-size: 1rem; font-weight: 700; color: #0f172a;"><?= e($invoice['client_name']) ?></div>
                <div style="font-size: 0.85rem; color: #64748b;"><?= e($invoice['client_email']) ?></div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 0.76rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Payment Method:</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;"><?= e($invoice['payment_method'] ?? 'Cryptocurrency') ?></div>
                <div style="font-size: 0.82rem; color: #64748b;">Order Ref: #<?= e($invoice['order_number'] ?? $invoice['order_id']) ?></div>
            </div>
        </div>

        <!-- Items Table -->
        <table class="admin-table" style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 4px; width: 100%;">
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th>Package Tier</th>
                    <th style="text-align: right;">Amount (USD)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-weight: 700; color: #0f172a;"><?= e($invoice['service_title'] ?? 'SEO Consulting Package') ?></td>
                    <td><span class="badge badge-cyan"><?= e($invoice['package_name'] ?? 'Standard') ?></span></td>
                    <td style="text-align: right; font-weight: 700;"><?= formatCurrency($invoice['subtotal']) ?></td>
                </tr>
            </tbody>
        </table>

        <!-- Totals Calculation -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 32px;">
            <div style="width: 260px;">
                <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.88rem; color: #64748b;">
                    <span>Subtotal:</span>
                    <span><?= formatCurrency($invoice['subtotal']) ?></span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.88rem; color: #64748b;">
                    <span>Tax (0%):</span>
                    <span>$0.00</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 2px solid #e2e8f0; font-size: 1.15rem; font-weight: 800; color: #0f172a;">
                    <span>Total Paid:</span>
                    <span style="color: #4338ca;"><?= formatCurrency($invoice['total']) ?></span>
                </div>
            </div>
        </div>

        <!-- Terms Footer -->
        <div style="border-top: 1px dashed #cbd5e1; padding-top: 20px; font-size: 0.8rem; color: #94a3b8; text-align: center;">
            Thank you for choosing <?= e(setting('site_name', 'Abdullah Saleh')) ?>. For technical questions or deliverables support, contact us directly.
        </div>
    </div>
</div>
