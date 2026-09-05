<?php
// views/public/legal.php - Legal Policies (Privacy, Refund) in Digi Solution Theme
$policyKey = strtolower(str_replace(' ', '-', $policyTitle ?? ''));
?>

<section class="legal-hero-section">
    <div class="container">
        <!-- Breadcrumb -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 0.82rem; color: #64748b; margin-bottom: 16px;">
            <a href="<?= url('/') ?>" style="color: #64748b; text-decoration: none;">Home</a>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i>
            <span>Legal</span>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i>
            <span style="color: var(--digi-blue, #4361ee); font-weight: 600;"><?= e($policyTitle ?? 'Legal Policy') ?></span>
        </div>

        <div class="legal-badge-pill">
            <i class="fa-solid fa-shield-halved"></i> Official Policy &amp; Compliance
        </div>

        <h1 class="legal-hero-title"><?= e($policyTitle ?? 'Legal Policy') ?></h1>

        <p class="legal-hero-desc">
            Please review our official policies regarding data security, transactions, and service commitments at <strong><?= e(setting('site_name', 'Abdullah Saleh SEO Platform')) ?></strong>.
        </p>

        <div class="legal-meta-bar">
            <div class="legal-meta-item">
                <i class="fa-regular fa-calendar-check" style="color: #10b981;"></i>
                <span>Effective: <strong>January 2026</strong></span>
            </div>
            <span>&bull;</span>
            <div class="legal-meta-item">
                <i class="fa-solid fa-clock-rotate-left" style="color: var(--digi-blue);"></i>
                <span>Last Updated: <strong>September 2026</strong></span>
            </div>
            <span>&bull;</span>
            <button type="button" onclick="window.print()" class="btn btn-sm" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.78rem; padding: 4px 10px; color: #475569; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                <i class="fa-solid fa-print"></i> Print
            </button>
        </div>

        <!-- Policy Switcher Tabs -->
        <div class="legal-nav-tabs">
            <a href="<?= url('/terms') ?>" class="legal-nav-link <?= str_contains($policyKey, 'term') ? 'active' : '' ?>">
                <i class="fa-solid fa-file-contract"></i> Terms of Service
            </a>
            <a href="<?= url('/privacy-policy') ?>" class="legal-nav-link <?= str_contains($policyKey, 'privacy') ? 'active' : '' ?>">
                <i class="fa-solid fa-user-shield"></i> Privacy Policy
            </a>
            <a href="<?= url('/refund-policy') ?>" class="legal-nav-link <?= str_contains($policyKey, 'refund') ? 'active' : '' ?>">
                <i class="fa-solid fa-rotate-left"></i> Refund &amp; Cancellation
            </a>
        </div>
    </div>
</section>

<section class="section" style="padding: 50px 0 80px;">
    <div class="container" style="max-width: 860px;">
        <div class="legal-content-card" style="padding: 40px 45px; line-height: 1.8;">
            <?= $policyContent ?? '<p>Policy content.</p>' ?>

            <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                <div style="font-size: 0.85rem; color: #64748b;">
                    Need further clarification? <a href="<?= url('/contact') ?>" style="color: var(--digi-blue); font-weight: 600;">Contact our team</a>.
                </div>
                <a href="<?= url('/terms') ?>" class="btn btn-sm btn-blue-solid" style="border-radius: 8px;">
                    View Terms of Service <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>
</section>
