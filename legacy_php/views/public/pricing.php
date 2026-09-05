<?php
// views/public/pricing.php - Pricing in Digi Solution Theme
?>

<section class="digi-hero-section" style="padding: 50px 0 40px; text-align: center;">
    <div class="container">
        <span class="text-blue" style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Transparent Investment</span>
        <h1 style="font-size: 2.8rem; margin: 10px 0 14px;">SEO Service Pricing Plans</h1>
        <p style="font-size: 1.1rem; color: var(--digi-text-body); max-width: 680px; margin: 0 auto;">
            Clear deliverables, no hidden fees, with instant NOWPayments Crypto and bKash checkout.
        </p>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php foreach ($services as $service): ?>
            <div style="margin-bottom: 60px;">
                <div style="margin-bottom: 24px;">
                    <span style="display:inline-block; font-size: 0.72rem; font-weight: 700; color: var(--digi-blue); background: var(--digi-blue-subtle); padding: 3px 10px; border-radius: 4px; margin-bottom: 6px;">
                        <?= e($service['category_name'] ?? 'SEO') ?>
                    </span>
                    <h2 style="font-size: 1.8rem; margin-top: 4px;"><?= e($service['title']) ?></h2>
                    <p style="color: var(--digi-text-body);"><?= e($service['short_description']) ?></p>
                </div>

                <div class="digi-pricing-grid" style="grid-template-columns: repeat(<?= max(1, count($service['packages'])) ?>, 1fr);">
                    <?php foreach ($service['packages'] as $pkg): ?>
                        <?php 
                        $features = json_decode($pkg['features_json'] ?? '[]', true); 
                        $isPop = (bool)($pkg['is_popular'] ?? false);
                        ?>
                        <div class="digi-pricing-card <?= $isPop ? 'featured' : '' ?>">
                            <div class="pricing-card-header">
                                <h4><?= e($pkg['name']) ?></h4>
                                <div class="pricing-card-price">$<?= number_format($pkg['price'], 0) ?><span>/ one-time</span></div>
                            </div>

                            <div class="pricing-card-badges">
                                <span><?= e($pkg['delivery_days']) ?> Days</span>
                                <span><?= e($pkg['revisions']) ?> Revisions</span>
                            </div>

                            <ul class="pricing-card-features">
                                <?php foreach ($features as $f): ?>
                                    <li><i class="fa-solid fa-check"></i> <?= e($f) ?></li>
                                <?php endforeach; ?>
                            </ul>

                            <div class="pricing-card-footer">
                                <a href="<?= url('/services/' . $service['slug'] . '#packages') ?>" class="btn btn-aqua-solid btn-block" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
                                    <i class="fa-solid fa-cart-plus"></i> Order <?= e($pkg['name']) ?>
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
