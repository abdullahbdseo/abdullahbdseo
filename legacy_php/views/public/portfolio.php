<?php
// views/public/portfolio.php - Filterable Google Search Console Proof & Case Studies
?>

<section class="digi-hero-section" style="padding: 60px 0 40px; text-align: center;">
    <div class="container">
        <span class="gsc-section-badge">
            <i class="fa-brands fa-google" style="color: #4285F4;"></i> Verified Search Console Performance
        </span>
        <h1 style="font-size: 3rem; margin: 12px 0 16px;">SEO Case Studies & Real Results</h1>
        <p style="font-size: 1.15rem; color: var(--digi-text-body); max-width: 720px; margin: 0 auto; line-height: 1.6;">
            Explore verifiable Google Search Console data, strategic blueprints, and organic growth trajectories from real client engagements.
        </p>
    </div>
</section>

<!-- Aggregate Summary Numbers -->
<section style="margin-top: -20px; padding-bottom: 20px;">
    <div class="container">
        <div class="gsc-summary-banner" style="margin-top: 0;">
            <div class="gsc-summary-stat">
                <div class="gsc-stat-icon-wrap" style="background: rgba(26, 115, 232, 0.15); color: #38bdf8;">
                    <i class="fa-solid fa-arrow-pointer"></i>
                </div>
                <div>
                    <div class="gsc-stat-val color-clicks" style="color: #60a5fa;">2.0M+</div>
                    <div class="gsc-stat-lbl">Total Organic Clicks</div>
                </div>
            </div>

            <div class="gsc-summary-stat">
                <div class="gsc-stat-icon-wrap" style="background: rgba(142, 36, 170, 0.15); color: #c084fc;">
                    <i class="fa-solid fa-eye"></i>
                </div>
                <div>
                    <div class="gsc-stat-val color-impressions" style="color: #c084fc;">2.2M+</div>
                    <div class="gsc-stat-lbl">Search Impressions</div>
                </div>
            </div>

            <div class="gsc-summary-stat">
                <div class="gsc-stat-icon-wrap" style="background: rgba(0, 137, 123, 0.15); color: #34d399;">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div>
                    <div class="gsc-stat-val color-ctr" style="color: #34d399;">92.8%</div>
                    <div class="gsc-stat-lbl">Peak Click-Through Rate</div>
                </div>
            </div>

            <div class="gsc-summary-stat">
                <div class="gsc-stat-icon-wrap" style="background: rgba(230, 81, 0, 0.15); color: #fbbf24;">
                    <i class="fa-solid fa-trophy"></i>
                </div>
                <div>
                    <div class="gsc-stat-val color-position" style="color: #fbbf24;">#1 Avg</div>
                    <div class="gsc-stat-lbl">Dominant Search Rank</div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 10px;">
    <div class="container">
        <!-- Category Filter Tabs -->
        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 40px;">
            <a href="<?= url('/portfolio') ?>" class="btn btn-sm <?= empty($currentCategory) ? 'btn-blue-solid' : 'btn-outline-blue' ?>">
                <i class="fa-solid fa-layer-group"></i> All Projects (<?= count($portfolios) ?>)
            </a>
            <?php foreach ($categories as $cat): ?>
                <a href="<?= url('/portfolio?category=' . $cat['slug']) ?>" class="btn btn-sm <?= ($currentCategory ?? '') === $cat['slug'] ? 'btn-blue-solid' : 'btn-outline-blue' ?>">
                    <?= e($cat['name']) ?>
                </a>
            <?php endforeach; ?>
        </div>

        <!-- Portfolios Showcase Carousel -->
        <div class="gsc-carousel-wrapper" id="portfolioCarousel">
            <div class="gsc-carousel-header">
                <div class="gsc-carousel-meta">
                    <span class="gsc-carousel-live-pill">
                        <span class="gsc-live-dot"></span> Verified Results
                    </span>
                    <span class="gsc-carousel-counter" id="gscSlideCounter">
                        Showing <strong id="gscCurrentRange">1 - <?= min(3, count($portfolios)) ?></strong> of <strong><?= count($portfolios) ?></strong> Results
                    </span>
                </div>
                <div class="gsc-carousel-controls">
                    <div class="gsc-view-toggle" id="gscViewToggle">
                        <button type="button" class="gsc-view-btn active" data-view="carousel" title="Carousel Slider View">
                            <i class="fa-solid fa-sliders"></i> Slider
                        </button>
                        <button type="button" class="gsc-view-btn" data-view="grid" title="Grid View">
                            <i class="fa-solid fa-border-all"></i> Grid
                        </button>
                    </div>
                    <div class="gsc-carousel-nav">
                        <button type="button" class="gsc-nav-btn gsc-prev-btn" id="gscPrevBtn" aria-label="Previous Slide" title="Previous Slide">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button type="button" class="gsc-nav-btn gsc-next-btn" id="gscNextBtn" aria-label="Next Slide" title="Next Slide">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Carousel Viewport & Track -->
            <div class="gsc-carousel-viewport" id="gscCarouselViewport">
                <div class="gsc-carousel-track" id="gscCarouselTrack">
                    <?php foreach ($portfolios as $item): ?>
                        <?php 
                            $metrics = json_decode($item['metrics_json'] ?? '[]', true); 
                            $imgSrc = asset($item['featured_image'] ?? 'images/portfolio/proof_gsc_1_18m_scale.jpg');
                            $modalTitle = $item['title'] ?? 'Google Search Console Performance';
                            $modalStats = ($item['industry'] ?? 'SEO Client') . ' • ' . ($item['duration'] ?? '3 Months') . ' • GSC Verified Report';
                        ?>
                        <div class="gsc-carousel-slide">
                            <div class="gsc-proof-card">
                                <!-- Image with interactive zoom trigger -->
                                <div class="gsc-proof-media gsc-trigger" data-gsc-img="<?= $imgSrc ?>" data-gsc-title="<?= e($modalTitle) ?>" data-gsc-stats="<?= e($modalStats) ?>" role="button" tabindex="0" title="Click to enlarge Google Search Console report">
                                    <span class="gsc-verified-badge">
                                        <i class="fa-brands fa-google" style="color: #4285F4;"></i> GSC Verified
                                    </span>
                                    <span class="gsc-time-badge">
                                        <i class="fa-regular fa-clock"></i> <?= e($item['duration'] ?? '3 Months') ?>
                                    </span>
                                    <img src="<?= $imgSrc ?>" alt="<?= e($item['title']) ?>" class="gsc-proof-img" loading="lazy">
                                    <div class="gsc-proof-overlay">
                                        <i class="fa-solid fa-magnifying-glass-plus"></i> Click to Enlarge Report
                                    </div>
                                </div>

                                <!-- Card Body -->
                                <div class="gsc-proof-body">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <span class="gsc-proof-industry"><?= e($item['industry'] ?? 'E-Commerce / Tech') ?></span>
                                        <span style="font-size: 0.72rem; color: #10b981; font-weight: 700; background: #ecfdf5; padding: 2px 8px; border-radius: 4px;">
                                            <i class="fa-solid fa-shield-check"></i> Live Proof
                                        </span>
                                    </div>

                                    <h3 class="gsc-proof-title">
                                        <a href="<?= url('/portfolio/' . $item['slug']) ?>" style="color: inherit;">
                                            <?= e($item['title']) ?>
                                        </a>
                                    </h3>
                                    <p class="gsc-proof-desc"><?= e(str_limit($item['summary'] ?? '', 120)) ?></p>

                                    <!-- Color-coded GSC metrics row -->
                                    <?php if (!empty($metrics)): ?>
                                        <div class="gsc-metrics-strip">
                                            <?php if (isset($metrics['total_clicks']) || isset($metrics['clicks_28d'])): ?>
                                                <div class="gsc-metric-cell">
                                                    <span class="gsc-metric-num color-clicks"><?= e($metrics['total_clicks'] ?? $metrics['clicks_28d']) ?></span>
                                                    <span class="gsc-metric-tag">Clicks</span>
                                                </div>
                                            <?php endif; ?>

                                            <?php if (isset($metrics['total_impressions']) || isset($metrics['impressions_28d'])): ?>
                                                <div class="gsc-metric-cell">
                                                    <span class="gsc-metric-num color-impressions"><?= e($metrics['total_impressions'] ?? $metrics['impressions_28d']) ?></span>
                                                    <span class="gsc-metric-tag">Impr.</span>
                                                </div>
                                            <?php endif; ?>

                                            <?php if (isset($metrics['avg_ctr'])): ?>
                                                <div class="gsc-metric-cell">
                                                    <span class="gsc-metric-num color-ctr"><?= e($metrics['avg_ctr']) ?></span>
                                                    <span class="gsc-metric-tag">Avg CTR</span>
                                                </div>
                                            <?php endif; ?>

                                            <?php if (isset($metrics['avg_position']) || isset($metrics['rank_status']) || isset($metrics['peak_daily_impr'])): ?>
                                                <div class="gsc-metric-cell">
                                                    <span class="gsc-metric-num color-position"><?= e($metrics['avg_position'] ?? $metrics['rank_status'] ?? $metrics['peak_daily_impr']) ?></span>
                                                    <span class="gsc-metric-tag"><?= isset($metrics['avg_position']) ? 'Avg Pos' : 'Status' ?></span>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    <?php endif; ?>

                                    <!-- Action Footer -->
                                    <div class="gsc-proof-footer">
                                        <button type="button" class="btn-gsc-zoom gsc-trigger" data-gsc-img="<?= $imgSrc ?>" data-gsc-title="<?= e($modalTitle) ?>" data-gsc-stats="<?= e($modalStats) ?>">
                                            <i class="fa-solid fa-magnifying-glass-plus"></i> Inspect
                                        </button>
                                        <a href="<?= url('/portfolio/' . $item['slug']) ?>" class="btn btn-sm btn-blue-solid">
                                            Full Case Study <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Bottom Pagination Dots -->
            <div class="gsc-carousel-bottom-bar">
                <div class="gsc-carousel-dots" id="gscCarouselDots"></div>
            </div>
        </div>

        <!-- Bottom Contact Ribbon -->
        <div style="margin-top: 60px; background: linear-gradient(135deg, #4361ee 0%, #3a56d4 100%); border-radius: var(--radius-lg); padding: 40px; color: #ffffff; text-align: center;">
            <h2 style="color: #ffffff; font-size: 2rem; margin-bottom: 10px;">Ready to Experience Record Organic Traffic?</h2>
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 1.05rem; max-width: 600px; margin: 0 auto 24px;">
                Request a comprehensive preliminary website audit. We'll diagnose your current search bottlenecks and craft a custom organic strategy roadmap.
            </p>
            <a href="<?= url('/contact') ?>" class="btn btn-lg btn-aqua-solid" style="box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                Get Your Free SEO Audit <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

