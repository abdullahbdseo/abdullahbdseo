<?php
// views/public/portfolio_detail.php - Case Study Detail View with Google Search Console Proof

$metrics = json_decode($portfolio['metrics_json'] ?? '[]', true);
$imgSrc = asset($portfolio['featured_image'] ?? 'images/portfolio/proof_gsc_1_18m_scale.jpg');
$modalTitle = addslashes($portfolio['title']);
$modalStats = addslashes(($portfolio['industry'] ?? 'SEO Client') . ' • ' . ($portfolio['duration'] ?? '3 Months') . ' • GSC Performance Report');
?>

<section class="digi-hero-section" style="padding: 50px 0 35px;">
    <div class="container" style="max-width: 1000px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
            <a href="<?= url('/portfolio') ?>" class="btn btn-sm btn-outline-blue" style="padding: 4px 12px; font-size: 0.8rem;">
                <i class="fa-solid fa-arrow-left"></i> All Case Studies
            </a>
            <span class="gsc-section-badge" style="margin-bottom: 0;">
                <i class="fa-brands fa-google" style="color: #4285F4;"></i> <?= e($portfolio['category_name'] ?? 'Case Study') ?>
            </span>
        </div>

        <h1 style="font-size: 2.5rem; line-height: 1.25; margin-bottom: 18px;"><?= e($portfolio['title']) ?></h1>
        
        <div style="display: flex; gap: 24px; font-size: 0.92rem; color: var(--digi-text-body); flex-wrap: wrap; background: #f8fafc; padding: 14px 20px; border-radius: var(--radius-sm); border: 1px solid var(--digi-border);">
            <div><i class="fa-solid fa-building" style="color: var(--digi-blue);"></i> <strong>Client:</strong> <?= e($portfolio['client_name']) ?></div>
            <div><i class="fa-solid fa-tag" style="color: var(--digi-blue);"></i> <strong>Industry:</strong> <?= e($portfolio['industry']) ?></div>
            <div><i class="fa-regular fa-clock" style="color: var(--digi-blue);"></i> <strong>Timeline:</strong> <?= e($portfolio['duration']) ?></div>
            <div><i class="fa-solid fa-shield-check" style="color: #10b981;"></i> <strong>Verification:</strong> Google Search Console</div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 30px;">
    <div class="container" style="max-width: 1000px;">

        <!-- 1. GOOGLE SEARCH CONSOLE VERIFIED PROOF VIEWER -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-bottom: 40px;">
            <div style="background: #0f172a; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; color: #ffffff; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 0.95rem;">
                    <i class="fa-brands fa-google" style="color: #4285F4; font-size: 1.1rem;"></i>
                    <span>Official Google Search Console Performance Data</span>
                </div>
                <button type="button" class="btn btn-sm btn-aqua-solid gsc-trigger" data-gsc-img="<?= $imgSrc ?>" data-gsc-title="<?= e($portfolio['title']) ?>" data-gsc-stats="<?= e(($portfolio['industry'] ?? 'SEO Client') . ' • ' . ($portfolio['duration'] ?? '3 Months')) ?>" style="padding: 6px 14px; font-size: 0.8rem;">
                    <i class="fa-solid fa-magnifying-glass-plus"></i> Enlarge Full Report
                </button>
            </div>

            <!-- Screenshot Viewport -->
            <div class="gsc-trigger" data-gsc-img="<?= $imgSrc ?>" data-gsc-title="<?= e($portfolio['title']) ?>" data-gsc-stats="<?= e(($portfolio['industry'] ?? 'SEO Client') . ' • ' . ($portfolio['duration'] ?? '3 Months')) ?>" style="position: relative; background: #090d16; cursor: pointer; text-align: center;" role="button" tabindex="0" title="Click to zoom Search Console screenshot">
                <img src="<?= $imgSrc ?>" alt="<?= e($portfolio['title']) ?>" style="width: 100%; max-height: 520px; object-fit: contain; display: block; margin: 0 auto;">
                <div class="gsc-proof-overlay">
                    <i class="fa-solid fa-magnifying-glass-plus"></i> Click to Zoom and Inspect Original High-Resolution Screenshot
                </div>
            </div>

            <!-- Metrics Highlight Grid -->
            <?php if (!empty($metrics)): ?>
                <div class="gsc-detail-metrics-grid">
                    <?php foreach ($metrics as $lbl => $val): ?>
                        <div class="gsc-detail-metric-cell">
                            <div class="gsc-detail-metric-val"><?= e($val) ?></div>
                            <div class="gsc-detail-metric-lbl"><?= e(ucwords(str_replace('_', ' ', $lbl))) ?></div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <!-- 2. CASE STUDY BREAKDOWN NARRATIVE -->
        <div style="background: #ffffff; border: 1px solid var(--digi-border); border-radius: var(--radius-lg); padding: 40px; box-shadow: var(--shadow-soft); line-height: 1.8;">
            
            <!-- Summary Callout -->
            <div style="background: #f8fafc; border-left: 4px solid var(--digi-blue); padding: 20px 24px; border-radius: 0 8px 8px 0; margin-bottom: 36px;">
                <h3 style="font-size: 1.1rem; color: var(--digi-blue); margin-bottom: 6px;"><i class="fa-solid fa-bullseye"></i> Executive Summary</h3>
                <p style="margin: 0; color: var(--digi-text-main); font-size: 0.95rem;"><?= e($portfolio['summary']) ?></p>
            </div>

            <h2 style="font-size: 1.45rem; color: var(--digi-text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i> The Challenge & Baseline Bottlenecks
            </h2>
            <p style="color: var(--digi-text-body); margin-bottom: 36px; font-size: 0.98rem;"><?= nl2br(e($portfolio['challenge'])) ?></p>

            <h2 style="font-size: 1.45rem; color: var(--digi-text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-lightbulb" style="color: var(--digi-blue);"></i> Strategic Organic Blueprint
            </h2>
            <p style="color: var(--digi-text-body); margin-bottom: 36px; font-size: 0.98rem;"><?= nl2br(e($portfolio['strategy'])) ?></p>

            <h2 style="font-size: 1.45rem; color: var(--digi-text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-gears" style="color: #06b6d4;"></i> Technical Execution & Optimization
            </h2>
            <p style="color: var(--digi-text-body); margin-bottom: 36px; font-size: 0.98rem;"><?= nl2br(e($portfolio['implementation'])) ?></p>

            <h2 style="font-size: 1.45rem; color: var(--digi-text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Compounding Results & Revenue Impact
            </h2>
            <p style="color: var(--digi-text-body); margin-bottom: 36px; font-size: 0.98rem;"><?= nl2br(e($portfolio['results'])) ?></p>

            <!-- Bottom CTA Box -->
            <div style="margin-top: 40px; padding: 36px 30px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: var(--radius-md); text-align: center; color: #ffffff;">
                <h3 style="color: #ffffff; font-size: 1.6rem; margin-bottom: 8px;">Want Similar Organic Results for Your Business?</h3>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 600px; margin: 0 auto 20px;">
                    Let's analyze your website search performance and identify high-value keyword opportunities with an actionable audit.
                </p>
                <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
                    <a href="<?= url('/contact') ?>" class="btn btn-lg btn-aqua-solid">
                        <i class="fa-solid fa-rocket"></i> Request Free Proposal
                    </a>
                    <a href="<?= url('/portfolio') ?>" class="btn btn-lg btn-outline-blue" style="color: #ffffff; border-color: rgba(255,255,255,0.3);">
                        View Other Proofs
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

