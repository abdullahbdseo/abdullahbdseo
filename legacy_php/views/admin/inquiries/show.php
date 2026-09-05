<?php
// views/admin/inquiries/show.php - Contact Inquiry Details
?>

<div style="max-width: 700px; margin: 0 auto;">
    <div style="margin-bottom: 20px;">
        <a href="<?= url('/admin/inquiries') ?>" style="color: #64748b; font-size: 0.9rem;"><i class="fa-solid fa-arrow-left"></i> Back to Inquiries</a>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-top: 6px;">Inquiry from <?= e($inquiry['name']) ?></h2>
    </div>

    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Lead Information</h3>
            <span class="status-pill <?= e($inquiry['status']) ?>"><?= e($inquiry['status']) ?></span>
        </div>
        <div class="admin-card-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Email</div>
                    <div style="font-weight: 700;"><a href="mailto:<?= e($inquiry['email']) ?>"><?= e($inquiry['email']) ?></a></div>
                </div>
                <div>
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Phone</div>
                    <div style="font-weight: 600;"><?= e($inquiry['phone'] ?? 'N/A') ?></div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Target Website</div>
                    <div style="font-weight: 600;"><a href="<?= e($inquiry['website']) ?>" target="_blank"><?= e($inquiry['website']) ?></a></div>
                </div>
                <div>
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Declared Budget</div>
                    <div style="font-weight: 700; color: #1e40af;"><?= e($inquiry['budget']) ?></div>
                </div>
            </div>

            <div style="margin-bottom: 24px;">
                <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Client Message</div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; line-height: 1.6;">
                    <?= nl2br(e($inquiry['message'])) ?>
                </div>
            </div>

            <div style="display: flex; gap: 12px;">
                <a href="mailto:<?= e($inquiry['email']) ?>?subject=Re: SEO Strategy Proposal for <?= urlencode($inquiry['website'] ?? '') ?>" class="btn btn-primary">
                    <i class="fa-solid fa-reply"></i> Reply via Email
                </a>
                <?php if ($inquiry['status'] !== 'replied'): ?>
                    <form action="<?= url('/admin/inquiries/' . $inquiry['id'] . '/mark-replied') ?>" method="POST">
                        <?= csrf_field() ?>
                        <button type="submit" class="btn btn-outline"><i class="fa-solid fa-check"></i> Mark as Replied</button>
                    </form>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
