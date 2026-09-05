<?php
// views/public/service_detail.php - Premium Service Detail & Package Selection in Digi Solution Theme

$packages = $service['packages'] ?? [];
$faqs = $service['faqs'] ?? [];
$isLoggedIn = Auth::check();
$currentUser = Auth::user();

// Service Type Flags
$slug = strtolower($service['slug'] ?? '');
$title = strtolower($service['title'] ?? '');

$isEcom = ($slug === 'ecommerce-seo-optimization' || $service['id'] == 3 || str_contains($title, 'e-commerce') || str_contains($title, 'ecommerce'));
$isLinkBuilding = ($slug === 'authority-link-building-strategy' || $service['id'] == 5 || str_contains($title, 'link building'));
$isOnPage = ($slug === 'on-page-seo-optimization' || $service['id'] == 4 || str_contains($title, 'on-page') || str_contains($title, 'content optimization'));
$isKeyword = ($slug === 'keyword-research-topic-clustering' || $service['id'] == 2 || str_contains($title, 'keyword'));
$isTechnical = ($slug === 'technical-seo-audit' || $service['id'] == 1 || str_contains($title, 'technical'));
$isLocal = ($slug === 'local-seo-gbp-optimization' || $service['id'] == 6 || str_contains($title, 'local'));
?>

<!-- =========================================================================
     1. HERO HEADER SECTION
     ========================================================================= -->
<section class="digi-hero-section" style="padding: 55px 0 50px; text-align: center; position: relative; overflow: hidden;">
    <div class="container" style="max-width: 1000px; position: relative; z-index: 2;">
        <!-- Breadcrumb -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 0.84rem; color: #64748b; margin-bottom: 16px;">
            <a href="<?= url('/') ?>" style="color: #64748b; text-decoration: none;">Home</a>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i>
            <a href="<?= url('/services') ?>" style="color: #64748b; text-decoration: none;">Services</a>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i>
            <span style="color: var(--digi-blue, #4361ee); font-weight: 600;"><?= e($service['title']) ?></span>
        </div>

        <!-- Pill Badge -->
        <span class="text-blue" style="font-weight: 700; font-size: 0.84rem; text-transform: uppercase; letter-spacing: 0.06em; background: var(--digi-blue-subtle, rgba(67, 97, 238, 0.08)); border: 1px solid rgba(67, 97, 238, 0.2); padding: 5px 16px; border-radius: 9999px; display: inline-flex; align-items: center; gap: 6px;">
            <?php if ($isKeyword): ?>
                <i class="fa-solid fa-magnifying-glass-chart"></i> Search Intent Architecture &amp; Topic Clusters
            <?php elseif ($isOnPage): ?>
                <i class="fa-solid fa-file-pen"></i> Semantic Entity &amp; Search Intent Optimization
            <?php elseif ($isLinkBuilding): ?>
                <i class="fa-solid fa-link"></i> High-Authority Editorial Backlinks &amp; Digital PR
            <?php elseif ($isEcom): ?>
                <i class="fa-solid fa-cart-shopping"></i> E-Commerce Store Rankings &amp; Revenue Scaling
            <?php else: ?>
                <i class="fa-solid fa-layer-group"></i> <?= e($service['category_name'] ?? 'Specialized SEO Service') ?>
            <?php endif; ?>
        </span>

        <h1 style="font-size: 2.9rem; font-weight: 850; color: #0f172a; margin: 16px 0 16px; letter-spacing: -0.03em; line-height: 1.2;">
            <?= e($service['title']) ?>
        </h1>

        <p style="font-size: 1.12rem; color: #475569; max-width: 760px; margin: 0 auto 24px; line-height: 1.65;">
            <?= e($service['short_description']) ?>
        </p>

        <!-- Stats Chips Bar -->
        <div class="service-hero-stats">
            <?php if ($isKeyword): ?>
                <div class="service-stat-item">
                    <i class="fa-solid fa-bullseye" style="color: #10b981;"></i>
                    <span><strong>100%</strong> Intent Classified (TOFU/BOFU)</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-sitemap" style="color: #4361ee;"></i>
                    <span><strong>Full</strong> Topic Cluster Silos</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-chart-pie" style="color: #f59e0b;"></i>
                    <span><strong>Ahrefs &amp; Semrush</strong> Enterprise Data</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-shield-halved" style="color: #3b82f6;"></i>
                    <span><strong>100%</strong> White-Hat Standard</span>
                </div>
            <?php elseif ($isOnPage): ?>
                <div class="service-stat-item">
                    <i class="fa-solid fa-arrow-trend-up" style="color: #10b981;"></i>
                    <span><strong>+240%</strong> Organic Click CTR</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-brain" style="color: #4361ee;"></i>
                    <span><strong>100%</strong> Google NLP Aligned</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-network-wired" style="color: #f59e0b;"></i>
                    <span><strong>Full</strong> Link Equity Flow</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-shield-halved" style="color: #3b82f6;"></i>
                    <span><strong>100%</strong> White-Hat Standard</span>
                </div>
            <?php elseif ($isLinkBuilding): ?>
                <div class="service-stat-item">
                    <i class="fa-solid fa-shield-halved" style="color: #10b981;"></i>
                    <span><strong>DR 40 - 80+</strong> Real Authority Sites</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-users" style="color: #4361ee;"></i>
                    <span><strong>5,000+</strong> Monthly Traffic Sites</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-rotate-left" style="color: #f59e0b;"></i>
                    <span><strong>12-Month</strong> Replacement Guarantee</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-circle-check" style="color: #3b82f6;"></i>
                    <span><strong>100%</strong> Manual Bespoke Outreach</span>
                </div>
            <?php elseif ($isEcom): ?>
                <div class="service-stat-item">
                    <i class="fa-solid fa-chart-line" style="color: #10b981;"></i>
                    <span><strong>+190%</strong> Non-Brand Revenue</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-filter-circle-xmark" style="color: #4361ee;"></i>
                    <span><strong>100%</strong> Faceted Filter Fix</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i>
                    <span><strong>&lt; 1.2s</strong> Core Web Vitals</span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-shield-halved" style="color: #3b82f6;"></i>
                    <span><strong>100%</strong> White-Hat Standard</span>
                </div>
            <?php else: ?>
                <div class="service-stat-item">
                    <i class="fa-solid fa-clock" style="color: #4361ee;"></i>
                    <span>Delivery: <strong><?= e($service['delivery_time'] ?? 'Fast Turnaround') ?></strong></span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-tag" style="color: #10b981;"></i>
                    <span>Starting at <strong>$<?= number_format($service['starting_price'] ?? 190, 0) ?></strong></span>
                </div>
                <div class="service-stat-item">
                    <i class="fa-solid fa-shield-halved" style="color: #3b82f6;"></i>
                    <span><strong>100%</strong> Google Compliant</span>
                </div>
            <?php endif; ?>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="#packages" class="btn btn-blue-solid" style="padding: 13px 30px; font-size: 0.98rem; border-radius: 10px; box-shadow: 0 4px 14px rgba(67, 97, 238, 0.3);">
                <i class="fa-solid fa-list-check" style="margin-right: 6px;"></i> View Packages &amp; Pricing
            </a>
            <a href="<?= url('/contact') ?>" class="btn btn-outline-blue" style="padding: 13px 26px; font-size: 0.98rem; border-radius: 10px; background: #ffffff;">
                <i class="fa-solid fa-comments" style="margin-right: 6px;"></i> <?= $isKeyword ? 'Request Custom Keyword Blueprint' : ($isOnPage ? 'Request On-Page Audit' : 'Request Consultation') ?>
            </a>
        </div>

        <!-- Quality Criteria / Toolstack Ribbon -->
        <?php if ($isKeyword): ?>
            <div class="ecom-platforms-bar">
                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-right: 6px;">
                    Data Stack &amp; Tools:
                </span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-magnifying-glass" style="color: #4361ee;"></i> Ahrefs Enterprise</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-fire" style="color: #f97316;"></i> Semrush Pro</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-cubes-stacked" style="color: #10b981;"></i> AlsoAsked &amp; People Also Ask</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-brain" style="color: #8b5cf6;"></i> NLP Semantic Clustering</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-file-excel" style="color: #059669;"></i> Prioritized Google Sheets</span>
            </div>
        <?php elseif ($isOnPage): ?>
            <div class="ecom-platforms-bar">
                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-right: 6px;">
                    Included Elements:
                </span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-heading" style="color: #4361ee;"></i> Header Hierarchy (H1-H4)</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-tag" style="color: #10b981;"></i> High-CTR Title &amp; Meta</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-brain" style="color: #8b5cf6;"></i> Semantic Entity Density</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-code" style="color: #f59e0b;"></i> Schema.org JSON-LD</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-image" style="color: #ec4899;"></i> Image Alt &amp; Compression</span>
            </div>
        <?php elseif ($isLinkBuilding): ?>
            <div class="ecom-platforms-bar">
                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-right: 6px;">
                    Our Standards:
                </span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-ban" style="color: #ef4444;"></i> Zero PBNs</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-chart-simple" style="color: #10b981;"></i> DR 40 - 80+ Real Traffic</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-pen-nib" style="color: #4361ee;"></i> 100% Original Content</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-lock" style="color: #f59e0b;"></i> Dofollow Permanent Links</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-rotate-left" style="color: #8b5cf6;"></i> 12-Month Guarantee</span>
            </div>
        <?php elseif ($isEcom): ?>
            <div class="ecom-platforms-bar">
                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-right: 6px;">
                    Optimized For:
                </span>
                <span class="ecom-platform-badge"><i class="fa-brands fa-shopify" style="color: #95BF47;"></i> Shopify</span>
                <span class="ecom-platform-badge"><i class="fa-brands fa-wordpress" style="color: #21759B;"></i> WooCommerce</span>
                <span class="ecom-platform-badge"><i class="fa-brands fa-magento" style="color: #F26322;"></i> Magento / Adobe Commerce</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-bag-shopping" style="color: #121118;"></i> BigCommerce</span>
                <span class="ecom-platform-badge"><i class="fa-solid fa-code" style="color: #0f172a;"></i> Headless / Next.js</span>
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- =========================================================================
     2. CORE VALUE PILLARS & ARCHITECTURE
     ========================================================================= -->
<section class="section" style="padding: 40px 0 20px;">
    <div class="container" style="max-width: 1160px;">
        <div style="text-align: center; margin-bottom: 25px;">
            <span class="text-blue" style="font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">Technical Foundation</span>
            <h2 style="font-size: 2.1rem; font-weight: 800; color: #0f172a; margin-top: 6px;">
                <?php if ($isKeyword): ?>
                    The 4 Pillars of Strategic Keyword Clustering
                <?php elseif ($isOnPage): ?>
                    The 4 Pillars of High-Impact On-Page SEO
                <?php elseif ($isLinkBuilding): ?>
                    The 4 Pillars of White-Hat Link Building
                <?php elseif ($isEcom): ?>
                    The 4 Pillars of E-Commerce Search Dominance
                <?php else: ?>
                    Core Focus Areas &amp; Methodologies
                <?php endif; ?>
            </h2>
            <p style="color: #64748b; font-size: 1rem; max-width: 650px; margin: 0 auto;">
                <?php if ($isKeyword): ?>
                    How we map search volume, buyer intent stages, and topic authority silos into an actionable ranking blueprint.
                <?php elseif ($isOnPage): ?>
                    How we transform underperforming landing pages into search magnets with semantic entity optimization and UX refinement.
                <?php elseif ($isLinkBuilding): ?>
                    How we build genuine domain authority through contextual placements on real, high-traffic industry publications.
                <?php elseif ($isEcom): ?>
                    How we eliminate technical bottlenecks, capture high-margin buyer intent, and scale organic store conversions.
                <?php else: ?>
                    Rigorous, data-driven optimization engineered for maximum search visibility.
                <?php endif; ?>
            </p>
        </div>

        <div class="service-pillars-grid">
            <?php if ($isKeyword): ?>
                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #eff6ff; color: #3b82f6;">
                        <i class="fa-solid fa-bullseye"></i>
                    </div>
                    <span class="service-pillar-tag">Buyer Intent</span>
                    <h3>Funnel-Stage Intent Mapping</h3>
                    <p>Categorize keywords into Informational (TOFU), Commercial (MOFU), and Transactional (BOFU) search stages.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #ecfdf5; color: #10b981;">
                        <i class="fa-solid fa-sitemap"></i>
                    </div>
                    <span class="service-pillar-tag">Topic Authority</span>
                    <h3>Pillar-Cluster Silo Architecture</h3>
                    <p>Group semantic sub-topics around core pillar pages with defined internal linking blueprints to dominate topic authority.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fef2f2; color: #ef4444;">
                        <i class="fa-solid fa-chess-knight"></i>
                    </div>
                    <span class="service-pillar-tag">Competitor Intelligence</span>
                    <h3>Competitor Keyword Gap Extraction</h3>
                    <p>Discover high-margin revenue keywords your competitors rank for, highlighting low-difficulty opportunities.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fdf2f8; color: #ec4899;">
                        <i class="fa-solid fa-file-circle-check"></i>
                    </div>
                    <span class="service-pillar-tag">Execution Ready</span>
                    <h3>Writer-Ready Content Briefs</h3>
                    <p>Structured outlines with suggested H2/H3 headers, word count targets, search intent, and semantic LSI guidelines.</p>
                </div>
            <?php elseif ($isOnPage): ?>
                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #eff6ff; color: #3b82f6;">
                        <i class="fa-solid fa-brain"></i>
                    </div>
                    <span class="service-pillar-tag">NLP &amp; Entities</span>
                    <h3>Semantic Entity Coverage</h3>
                    <p>Enrich content with topical entities and TF-IDF terms that Google's Natural Language Processing algorithms require for top rankings.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #ecfdf5; color: #10b981;">
                        <i class="fa-solid fa-mouse-pointer"></i>
                    </div>
                    <span class="service-pillar-tag">CTR Optimization</span>
                    <h3>Click-Magnet Metadata</h3>
                    <p>Craft high-converting title tags and meta descriptions with emotional triggers and search intent modifiers to surge CTR.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fef2f2; color: #ef4444;">
                        <i class="fa-solid fa-network-wired"></i>
                    </div>
                    <span class="service-pillar-tag">PageRank Flow</span>
                    <h3>Internal Link Architecture</h3>
                    <p>Implement strategic contextual internal links to channel link equity toward high-margin commercial and revenue pages.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fdf2f8; color: #ec4899;">
                        <i class="fa-solid fa-file-code"></i>
                    </div>
                    <span class="service-pillar-tag">Rich Schema &amp; UX</span>
                    <h3>Schema Markup &amp; UX Scannability</h3>
                    <p>Deploy structured Schema.org JSON-LD (FAQ, Article, Breadcrumb) and optimize heading hierarchy for frictionless user reading.</p>
                </div>
            <?php elseif ($isLinkBuilding): ?>
                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #eff6ff; color: #3b82f6;">
                        <i class="fa-solid fa-newspaper"></i>
                    </div>
                    <span class="service-pillar-tag">Editorial Placements</span>
                    <h3>Contextual Guest Articles</h3>
                    <p>High-value, original 800–1,500+ word articles published on relevant authority blogs with natural in-content anchor links.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fef2f2; color: #ef4444;">
                        <i class="fa-solid fa-chart-pie"></i>
                    </div>
                    <span class="service-pillar-tag">Competitor Gaps</span>
                    <h3>Competitor Link Replication</h3>
                    <p>We analyze your top SERP competitors in Ahrefs to uncover their most valuable backlinks and replicate them for your site.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #ecfdf5; color: #10b981;">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <span class="service-pillar-tag">Penguin Protection</span>
                    <h3>Safe Anchor Text Ratio</h3>
                    <p>Maintain natural anchor diversity (brand, partial match, topical, generic) to safeguard your domain against Google over-optimization filters.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fdf2f8; color: #ec4899;">
                        <i class="fa-solid fa-rotate-left"></i>
                    </div>
                    <span class="service-pillar-tag">Peace of Mind</span>
                    <h3>12-Month Link Warranty</h3>
                    <p>Continuous monitoring of all acquired backlinks. If any link is removed or set to nofollow within 12 months, we replace it for free.</p>
                </div>
            <?php else: ?>
                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #eff6ff; color: #3b82f6;">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <span class="service-pillar-tag">Category Architecture</span>
                    <h3>Category Hubs &amp; Topic Silos</h3>
                    <p>Structure high-converting collection hubs with clear breadcrumbs, internal link equity, and bottom-of-funnel commercial keywords.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fef2f2; color: #ef4444;">
                        <i class="fa-solid fa-filter-circle-xmark"></i>
                    </div>
                    <span class="service-pillar-tag">Crawl Optimization</span>
                    <h3>Faceted Navigation Control</h3>
                    <p>Prevent infinite parameter loops (`?color=red&amp;size=xl`) from draining Google crawl budget while indexing high-demand filter terms.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #ecfdf5; color: #10b981;">
                        <i class="fa-solid fa-code-merge"></i>
                    </div>
                    <span class="service-pillar-tag">Rich Snippets</span>
                    <h3>Product &amp; Review Schema</h3>
                    <p>Inject complete JSON-LD structured data for `Product`, `AggregateOffer`, `InStock`, `Price`, and `Review` stars to boost search CTR.</p>
                </div>

                <div class="service-pillar-card">
                    <div class="service-pillar-icon" style="background: #fdf2f8; color: #ec4899;">
                        <i class="fa-solid fa-gauge-high"></i>
                    </div>
                    <span class="service-pillar-tag">Speed &amp; Checkout</span>
                    <h3>Core Web Vitals &amp; Mobile UX</h3>
                    <p>Compress mega catalog images, streamline JavaScript execution, and optimize LCP/INP scores for faster checkout conversion rates.</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- =========================================================================
     3. SERVICE SCOPE & WHAT'S INCLUDED
     ========================================================================= -->
<section class="section" style="padding: 20px 0 50px;">
    <div class="container" style="max-width: 1050px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 36px; box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid #f1f5f9;">
                <div style="width: 42px; height: 42px; border-radius: 6px; background: rgba(67, 97, 238, 0.1); color: var(--digi-blue, #4361ee); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                    <i class="fa-solid fa-clipboard-check"></i>
                </div>
                <div>
                    <h2 style="font-size: 1.45rem; font-weight: 800; color: #0f172a; margin: 0;">Comprehensive Scope of Work &amp; Deliverables</h2>
                    <div style="font-size: 0.85rem; color: #64748b;">Exact technical roadmap and optimization deliverables included in this service</div>
                </div>
            </div>
            
            <div style="font-size: 1.02rem; color: #334155; line-height: 1.85;">
                <?= nl2br(e($service['description'])) ?>
            </div>
        </div>
    </div>
</section>

<!-- =========================================================================
     4. 4-PHASE EXECUTION BLUEPRINT
     ========================================================================= -->
<section class="section" style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 60px 0;">
    <div class="container" style="max-width: 1160px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <span class="text-blue" style="font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">Execution Workflow</span>
            <h2 style="font-size: 2.1rem; font-weight: 800; color: #0f172a; margin-top: 6px;">
                <?php if ($isKeyword): ?>
                    Our 4-Stage Keyword Architecture Blueprint
                <?php elseif ($isOnPage): ?>
                    Our 4-Stage On-Page Optimization Blueprint
                <?php elseif ($isLinkBuilding): ?>
                    Our 4-Stage Link Acquisition Blueprint
                <?php else: ?>
                    Our 4-Stage Optimization Blueprint
                <?php endif; ?>
            </h2>
            <p style="color: #64748b; font-size: 1rem; max-width: 620px; margin: 0 auto;">
                <?= $isKeyword ? 'A rigorous, data-backed process to uncover buyer intent queries and build topical authority.' : ($isOnPage ? 'A meticulous, entity-focused process to maximize topical relevance and click-through rates.' : ($isLinkBuilding ? 'A transparent, manual outreach process designed to secure legitimate authority citations.' : 'A proven, systematic methodology developed to transform websites into dominant organic search leaders.')) ?>
            </p>
        </div>

        <div class="service-process-grid">
            <?php if ($isKeyword): ?>
                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 01</span>
                    <div style="font-size: 1.5rem; color: #4361ee; margin-top: 8px;"><i class="fa-solid fa-magnifying-glass"></i></div>
                    <h4>Niche Seed Discovery</h4>
                    <p>We crawl competitor domains, Google suggest, and industry databases to aggregate thousands of raw candidate keywords.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 02</span>
                    <div style="font-size: 1.5rem; color: #10b981; margin-top: 8px;"><i class="fa-solid fa-filter-circle-dollar"></i></div>
                    <h4>Intent &amp; Difficulty Vetting</h4>
                    <p>Filter out zero-intent terms, calculate SERP difficulty scores, and categorize by informational, commercial, and transactional intent.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 03</span>
                    <div style="font-size: 1.5rem; color: #f59e0b; margin-top: 8px;"><i class="fa-solid fa-sitemap"></i></div>
                    <h4>Pillar-Cluster Siloing</h4>
                    <p>Group semantic terms into parent pillar pages and supporting cluster spokes to prevent keyword cannibalization.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 04</span>
                    <div style="font-size: 1.5rem; color: #ec4899; margin-top: 8px;"><i class="fa-solid fa-file-spreadsheet"></i></div>
                    <h4>Master Sheet &amp; Briefs</h4>
                    <p>Deliver an actionable Google Sheets workbook, publishing calendar, and detailed content briefs ready for writers.</p>
                </div>
            <?php elseif ($isOnPage): ?>
                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 01</span>
                    <div style="font-size: 1.5rem; color: #4361ee; margin-top: 8px;"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                    <h4>Intent &amp; Cannibalization Audit</h4>
                    <p>We audit existing target URLs, identify keyword cannibalization issues, and ensure target search intent alignment.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 02</span>
                    <div style="font-size: 1.5rem; color: #10b981; margin-top: 8px;"><i class="fa-solid fa-brain"></i></div>
                    <h4>Competitor NLP Gap Analysis</h4>
                    <p>Benchmark your content against top 3 SERP rankers using NLP tools to extract missing topical entities, questions, and LSI terms.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 03</span>
                    <div style="font-size: 1.5rem; color: #f59e0b; margin-top: 8px;"><i class="fa-solid fa-pen-ruler"></i></div>
                    <h4>On-Page &amp; Schema Refinement</h4>
                    <p>Rewrite high-CTR titles, optimize H1-H4 header hierarchy, integrate schema markup, and place conversion-driven CTA blocks.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 04</span>
                    <div style="font-size: 1.5rem; color: #ec4899; margin-top: 8px;"><i class="fa-solid fa-chart-line"></i></div>
                    <h4>CMS Publishing &amp; Tracking</h4>
                    <p>Provide direct CMS implementation (WordPress/Webflow/Shopify) or structured workbooks with 30-day ranking tracking.</p>
                </div>
            <?php elseif ($isLinkBuilding): ?>
                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 01</span>
                    <div style="font-size: 1.5rem; color: #4361ee; margin-top: 8px;"><i class="fa-solid fa-filter"></i></div>
                    <h4>Prospect Vetting</h4>
                    <p>We crawl competitor backlink profiles and vet candidate domains for real traffic, clean link velocity, and topical relevance.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 02</span>
                    <div style="font-size: 1.5rem; color: #10b981; margin-top: 8px;"><i class="fa-solid fa-paper-plane"></i></div>
                    <h4>Manual Outreach</h4>
                    <p>We pitch custom content angles and value propositions directly to webmasters, senior editors, and digital publishers.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 03</span>
                    <div style="font-size: 1.5rem; color: #f59e0b; margin-top: 8px;"><i class="fa-solid fa-feather-pointed"></i></div>
                    <h4>Editorial Content</h4>
                    <p>Our native writers create high-impact, original guest posts with your target URL integrated organically in the text body.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 04</span>
                    <div style="font-size: 1.5rem; color: #ec4899; margin-top: 8px;"><i class="fa-solid fa-square-check"></i></div>
                    <h4>Live Reporting &amp; Indexing</h4>
                    <p>Receive a live spreadsheet dashboard with exact published URLs, DR scores, anchor texts, and Google index verification.</p>
                </div>
            <?php else: ?>
                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 01</span>
                    <div style="font-size: 1.5rem; color: #4361ee; margin-top: 8px;"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                    <h4>Catalog &amp; Crawl Audit</h4>
                    <p>We crawl every SKU and category to detect orphaned products, canonical conflicts, duplicate variant URLs, and indexation leaks.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 02</span>
                    <div style="font-size: 1.5rem; color: #10b981; margin-top: 8px;"><i class="fa-solid fa-tags"></i></div>
                    <h4>Commercial Intent Mapping</h4>
                    <p>Cluster high-intent commercial keywords across buyer funnel stages and map them precisely to collection and product hubs.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 03</span>
                    <div style="font-size: 1.5rem; color: #f59e0b; margin-top: 8px;"><i class="fa-solid fa-sliders"></i></div>
                    <h4>Schema &amp; Facet Execution</h4>
                    <p>Implement rich product schemas, breadcrumbs, facet rules, canonical directives, and on-page content enhancements.</p>
                </div>

                <div class="service-process-card">
                    <span class="service-process-step-badge">Phase 04</span>
                    <div style="font-size: 1.5rem; color: #ec4899; margin-top: 8px;"><i class="fa-solid fa-chart-line"></i></div>
                    <h4>Authority &amp; Revenue Scale</h4>
                    <p>Execute digital PR brand mentions, monitor live Search Console performance, and optimize internal link distribution.</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- =========================================================================
     5. VERIFIED PROOF BANNER
     ========================================================================= -->
<section class="container" style="max-width: 1160px;">
    <div class="service-proof-banner">
        <div class="service-proof-content">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 4px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px;">
                <i class="fa-solid fa-circle-check"></i> Google Search Console Verified
            </div>
            <h3>
                <?php if ($isKeyword): ?>
                    Validated Topical Authority &amp; Search Visibility Expansion
                <?php elseif ($isOnPage): ?>
                    Proven On-Page CTR &amp; Ranking Accelerations
                <?php elseif ($isLinkBuilding): ?>
                    High-Impact Authority &amp; Ranking Surges
                <?php else: ?>
                    Proven E-Commerce Revenue Scaling
                <?php endif; ?>
            </h3>
            <p>
                <?php if ($isKeyword): ?>
                    Learn how our topic cluster architecture structured <strong>400+ targeted keywords</strong> to capture dominance across high-intent search queries.
                <?php elseif ($isOnPage): ?>
                    Discover how our semantic entity optimization and metadata CTR revamps unlocked <strong>+240% organic CTR growth</strong> and page 1 rankings.
                <?php elseif ($isLinkBuilding): ?>
                    See how high-DR contextual backlinks transformed domain authority and drove a <strong>320% surge in organic keywords</strong> across competitive commercial niches.
                <?php else: ?>
                    From resolving multi-faceted catalog crawl bloat to dominating competitive commercial category rankings. Read how we achieved a <strong>190% organic search revenue increase</strong> for Apex Commerce.
                <?php endif; ?>
            </p>
            <div style="margin-top: 18px;">
                <a href="<?= url('/portfolio') ?>" class="btn btn-sm btn-aqua-solid" style="border-radius: 8px;">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> View Verified Case Studies
                </a>
            </div>
        </div>

        <div class="service-proof-metrics">
            <?php if ($isKeyword): ?>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">400+</div>
                    <div class="service-proof-metric-lbl">Keywords Mapped</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">+380%</div>
                    <div class="service-proof-metric-lbl">Impression Surge</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">100%</div>
                    <div class="service-proof-metric-lbl">Topical Authority</div>
                </div>
            <?php elseif ($isOnPage): ?>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">+240%</div>
                    <div class="service-proof-metric-lbl">Organic CTR Boost</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">15+</div>
                    <div class="service-proof-metric-lbl">Page 1 Rankings</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">100%</div>
                    <div class="service-proof-metric-lbl">NLP Aligned</div>
                </div>
            <?php elseif ($isLinkBuilding): ?>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">DR 54+</div>
                    <div class="service-proof-metric-lbl">Authority Achieved</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">100%</div>
                    <div class="service-proof-metric-lbl">Dofollow Permanent</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">+320%</div>
                    <div class="service-proof-metric-lbl">Keyword Growth</div>
                </div>
            <?php else: ?>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">+190%</div>
                    <div class="service-proof-metric-lbl">Organic Revenue</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">1.18M</div>
                    <div class="service-proof-metric-lbl">Verified Clicks</div>
                </div>
                <div class="service-proof-metric-box">
                    <div class="service-proof-metric-val">#1 Rank</div>
                    <div class="service-proof-metric-lbl">Top Commercial SKUs</div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- =========================================================================
     6. SELECT SERVICE PACKAGE & PRICING
     ========================================================================= -->
<section id="packages" class="service-pkg-section">
    <div class="container" style="max-width: 1160px;">
        <div class="service-pkg-header">
            <div class="pkg-header-badge">
                <i class="fa-solid fa-gem"></i> Transparent Tiered Pricing
            </div>
            <h2 class="service-pkg-title">
                <?= $isKeyword ? 'Select Your Keyword Strategy Package' : ($isOnPage ? 'Select Your On-Page Package' : ($isLinkBuilding ? 'Select Your Link Building Package' : 'Select Your Service Package')) ?>
            </h2>
            <p class="service-pkg-subtitle">
                <?= $isKeyword ? 'Choose the ideal tier based on your keyword volume, number of core product/service silos, and content roadmap goals.' : ($isOnPage ? 'Choose the package tailored to the number of core revenue landing pages, service silos, or blog articles you need optimized.' : ($isLinkBuilding ? 'Choose the ideal tier based on your domain authority goals, competitive keyword difficulty, and link velocity.' : 'Choose the ideal service tier tailored for your domain authority, product volume, and organic ranking goals.')) ?>
            </p>
        </div>

        <!-- Package Cards Grid -->
        <div class="service-pkg-grid">
            <?php 
            $totalPkgs = count($packages);
            $index = 0;
            ?>
            <?php foreach ($packages as $pkg): ?>
                <?php 
                $index++;
                $features = json_decode($pkg['features_json'] ?? '[]', true); 
                $isPop = (bool)($pkg['is_popular'] ?? false) || ($totalPkgs === 3 && $index === 2);
                $tierNames = $isKeyword
                    ? ['Starter Cluster', 'Growth Authority (Best Value)', 'Full Market Domination', 'Custom Tier']
                    : ($isOnPage 
                        ? ['Essential Plan', 'Growth Tier (Best Value)', 'Full Site Overhaul', 'Custom Tier']
                        : ($isLinkBuilding 
                            ? ['Authority Starter', 'Growth Accelerator', 'Authority Domination', 'Custom Tier'] 
                            : ['Starter Tier', 'Growth & Scale', 'Enterprise Tier', 'Custom Tier']));
                $tierLabel = $tierNames[min($index - 1, 3)];
                ?>
                <div class="service-pkg-card <?= $isPop ? 'popular' : '' ?>">
                    <?php if ($isPop): ?>
                        <div class="pkg-popular-banner">
                            <i class="fa-solid fa-fire"></i> Most Popular &amp; Recommended
                        </div>
                    <?php endif; ?>

                    <div class="pkg-card-inner">
                        <div class="pkg-card-top">
                            <div class="pkg-tier-label">
                                <i class="fa-solid fa-bolt"></i> <?= e($tierLabel) ?>
                            </div>
                            <h3 class="pkg-tier-name"><?= e($pkg['name']) ?></h3>

                            <div class="pkg-price-wrap">
                                <span class="pkg-price-currency">$</span>
                                <span class="pkg-price-amount"><?= number_format($pkg['price'], 0) ?></span>
                                <span class="pkg-price-period">/ one-time</span>
                            </div>
                            <div style="font-size: 0.8rem; color: #10b981; font-weight: 600;">
                                <i class="fa-solid fa-circle-check"></i> Complete Turnkey Deliverables
                            </div>

                            <div class="pkg-chips-row">
                                <span class="pkg-chip">
                                    <i class="fa-regular fa-clock"></i> <?= e($pkg['delivery_days']) ?> Days Delivery
                                </span>
                                <span class="pkg-chip">
                                    <i class="fa-solid fa-rotate-left"></i> <?= e($pkg['revisions']) ?> Revisions Included
                                </span>
                            </div>
                        </div>

                        <div class="pkg-features-title">
                            <i class="fa-solid fa-shield-halved" style="color: #4361ee; margin-right: 4px;"></i> What's Included:
                        </div>

                        <ul class="pkg-features-list">
                            <?php foreach ($features as $f): ?>
                                <li class="pkg-feature-item">
                                    <div class="pkg-feature-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    <span><?= e($f) ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                        <div class="pkg-btn-wrap">
                            <button type="button" 
                                    class="btn-pkg-order" 
                                    onclick="openOrderModal(<?= e($pkg['id']) ?>, '<?= addslashes($pkg['name']) ?>', <?= (float)$pkg['price'] ?>, '<?= e($pkg['delivery_days']) ?> Days', '<?= e($pkg['revisions']) ?> Revisions')">
                                <i class="fa-solid fa-cart-shopping"></i> Order <?= e($pkg['name']) ?> <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Trust & Value Guarantee Banner -->
        <div class="pkg-trust-banner">
            <div class="pkg-trust-item">
                <div class="pkg-trust-icon">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                    <div class="pkg-trust-title">100% White-Hat Standard</div>
                    <div class="pkg-trust-desc">Strict compliance with Google Core Algorithms to guarantee safe, long-term organic growth.</div>
                </div>
            </div>

            <div class="pkg-trust-item">
                <div class="pkg-trust-icon">
                    <i class="fa-solid fa-file-waveform"></i>
                </div>
                <div>
                    <div class="pkg-trust-title">Actionable Workbooks</div>
                    <div class="pkg-trust-desc">Receive complete spreadsheet audits, category briefs, schema files, and video walkthroughs.</div>
                </div>
            </div>

            <div class="pkg-trust-item">
                <div class="pkg-trust-icon">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div>
                    <div class="pkg-trust-title">Official Invoicing &amp; Security</div>
                    <div class="pkg-trust-desc">Instant digital invoicing with unique Order IDs, itemized receipts, and secure checkout.</div>
                </div>
            </div>
        </div>

        <!-- FAQs for this service -->
        <?php if (!empty($faqs)): ?>
            <div style="margin-top: 60px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <span class="text-blue" style="font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">Clarifications &amp; Details</span>
                    <h3 style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-top: 6px;">Frequently Asked Questions</h3>
                </div>

                <div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px;">
                    <?php foreach ($faqs as $f): ?>
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px 24px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);">
                            <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; display: flex; align-items: center; gap: 10px;">
                                <i class="fa-solid fa-circle-question" style="color: var(--digi-blue); font-size: 1.1rem;"></i>
                                <?= e($f['question']) ?>
                            </h4>
                            <p style="font-size: 0.94rem; color: #475569; line-height: 1.65; margin: 0; padding-left: 28px;">
                                <?= e($f['answer']) ?>
                            </p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- =========================================================================
     7. BOTTOM CALL TO ACTION
     ========================================================================= -->
<section class="section" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 65px 0; margin-top: 50px;">
    <div class="container" style="text-align: center;">
        <span style="display: inline-block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #60a5fa; background: rgba(96, 165, 250, 0.12); padding: 4px 14px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid rgba(96, 165, 250, 0.2);">
            Turnkey Growth Strategy
        </span>
        <h2 style="font-size: 2.2rem; font-weight: 800; color: #ffffff; margin-bottom: 12px;">
            <?= $isKeyword ? 'Ready to Uncover Your Most Profitable Keywords?' : ($isOnPage ? 'Ready to Transform Your Pages into Ranking Magnets?' : ($isLinkBuilding ? 'Ready to Build Unstoppable Domain Authority?' : 'Ready to Dominate Search Rankings & Revenue?')) ?>
        </h2>
        <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto 28px; line-height: 1.6;">
            <?= $isKeyword ? 'Get a full-funnel keyword cluster architecture and master content roadmap to dominate your niche.' : ($isOnPage ? 'Get an in-depth semantic entity analysis and high-converting on-page roadmap for your high-priority landing pages.' : ($isLinkBuilding ? 'Secure high-impact contextual links from real authority publications that permanently move the needle.' : 'Get a tailored audit and high-converting optimization roadmap for your website.')) ?>
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="#packages" class="btn btn-aqua-solid" style="padding: 12px 28px; font-size: 0.95rem;">
                <i class="fa-solid fa-magnifying-glass-chart"></i> Choose a Package
            </a>
            <a href="<?= url('/contact') ?>" class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.25); padding: 12px 26px; font-size: 0.95rem;">
                Request Custom Proposal <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- =========================================================================
     8. INTERACTIVE ORDER CONFIGURATION MODAL
     ========================================================================= -->
<div id="orderModalBackdrop" class="order-modal-backdrop">
    <div class="order-modal-content">
        <button type="button" class="order-modal-close" onclick="closeOrderModal()" aria-label="Close modal">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="order-modal-header">
            <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #4361ee; letter-spacing: 0.05em; margin-bottom: 2px;">
                Checkout Configuration
            </div>
            <h3 id="modalServiceTitle"><?= e($service['title']) ?></h3>
            <div id="modalPkgSummary" class="order-modal-pkg-summary">
                <i class="fa-solid fa-box-open"></i>
                <span id="modalPkgName">Package</span> &bull; 
                <span id="modalPkgPrice" style="color: #10b981;">$0</span> &bull; 
                <span id="modalPkgDelivery" style="color: #64748b; font-weight: 500;">0 Days</span>
            </div>
        </div>

        <form action="<?= url('/order/create') ?>" method="POST" id="serviceOrderForm">
            <?= csrf_field() ?>
            <input type="hidden" name="service_id" value="<?= e($service['id']) ?>">
            <input type="hidden" name="package_id" id="formPackageId" value="">

            <div style="display: flex; flex-direction: column; gap: 16px;">
                <!-- Website URL -->
                <div>
                    <label class="order-form-label">Website / Target Domain URL <span style="color: #ef4444;">*</span></label>
                    <div style="position: relative;">
                        <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"><i class="fa-solid fa-globe"></i></span>
                        <input type="url" name="website_url" class="digi-input" style="padding-left: 40px;" placeholder="https://yourwebsite.com" required>
                    </div>
                </div>

                <!-- Target Country & Niche -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                    <div>
                        <label class="order-form-label">Target Market / Country</label>
                        <select name="target_country" class="digi-input">
                            <option value="Global">Global / International</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="European Union">European Union</option>
                            <option value="Bangladesh">Bangladesh</option>
                        </select>
                    </div>

                    <div>
                        <label class="order-form-label"><?= $isKeyword ? 'Seed Keywords / Core Topics' : 'Target Keywords' ?></label>
                        <input type="text" name="target_keywords" class="digi-input" placeholder="e.g. saas billing, digital marketing, shoes">
                    </div>
                </div>

                <!-- Client Notes -->
                <div>
                    <label class="order-form-label">Top Competitors &amp; Target Audience</label>
                    <textarea name="client_notes" class="digi-input" rows="2" placeholder="List 2-3 top competitors or mention your primary target buyer persona..."></textarea>
                </div>

                <!-- Contact info section if not logged in -->
                <?php if (!$isLoggedIn): ?>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 4px;">
                        <div style="font-size: 0.82rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-user" style="color: #4361ee;"></i> Contact Information
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <label class="order-form-label">Your Name <span style="color: #ef4444;">*</span></label>
                                <input type="text" name="name" class="digi-input" placeholder="Full Name" required>
                            </div>
                            <div>
                                <label class="order-form-label">Email Address <span style="color: #ef4444;">*</span></label>
                                <input type="email" name="email" class="digi-input" placeholder="name@company.com" required>
                            </div>
                        </div>
                    </div>
                <?php else: ?>
                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 10px 14px; font-size: 0.84rem; color: #065f46; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-user-check"></i>
                        <span>Ordering as <strong><?= e($currentUser['name']) ?></strong> (<?= e($currentUser['email']) ?>)</span>
                    </div>
                <?php endif; ?>

                <button type="submit" class="btn btn-lg btn-blue-solid btn-block" style="margin-top: 8px; border-radius: 12px; font-size: 1rem;">
                    <i class="fa-solid fa-lock" style="margin-right: 6px;"></i> Proceed to Secure Checkout <i class="fa-solid fa-arrow-right"></i>
                </button>

                <div style="display: flex; justify-content: center; align-items: center; gap: 16px; font-size: 0.75rem; color: #64748b; margin-top: 4px;">
                    <span><i class="fa-brands fa-bitcoin" style="color: #f59e0b;"></i> USDT &amp; Crypto</span>
                    <span>&bull;</span>
                    <span><i class="fa-solid fa-mobile-screen-button" style="color: #e11d48;"></i> bKash Manual</span>
                    <span>&bull;</span>
                    <span><i class="fa-solid fa-shield-halved" style="color: #10b981;"></i> 256-bit Encrypted</span>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
function openOrderModal(packageId, packageName, price, delivery, revisions) {
    document.getElementById('formPackageId').value = packageId;
    document.getElementById('modalPkgName').textContent = packageName;
    document.getElementById('modalPkgPrice').textContent = '$' + Number(price).toLocaleString();
    document.getElementById('modalPkgDelivery').textContent = delivery + ' • ' + revisions;
    
    var modal = document.getElementById('orderModalBackdrop');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    var modal = document.getElementById('orderModalBackdrop');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close on backdrop click
document.getElementById('orderModalBackdrop').addEventListener('click', function(e) {
    if (e.target === this) {
        closeOrderModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});
</script>
