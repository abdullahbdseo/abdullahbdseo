<?php
// views/public/home.php - Pixel-Perfect Layout matching Digi Solution Mockup
?>

<!-- 1. HERO SECTION -->
<section class="digi-hero-section">
    <div class="container">
        <div class="digi-hero-grid">
            <!-- Left Hero Content -->
            <div class="digi-hero-content">
                <h1>
                    <span class="text-blue">Search</span> Engine <span class="text-blue">Optimization</span><br>
                    <strong>SEO Services in Bangladesh</strong>
                </h1>
                
                <p class="digi-hero-desc">
                    All-in-one SEO and digital marketing solutions engineered to rank your website #1 on Google search results. Drive high-intent buyer traffic, generate qualified leads, and scale conversions organically.
                </p>

                <div class="digi-hero-actions">
                    <a href="<?= url('/contact') ?>" class="btn btn-lg btn-blue-solid">
                        Get Started <i class="fa-solid fa-arrow-right"></i>
                    </a>
                    <a href="#pricing" class="btn btn-lg btn-outline-blue">
                        View Pricing Plans
                    </a>
                </div>
            </div>

            <!-- Right Hero 3D Illustration -->
            <div class="digi-hero-visual">
                <div class="digi-3d-box">
                    <img src="<?= asset('images/seo_hero_3d.png') ?>" alt="SEO 3D Illustration" class="digi-3d-img">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 2. GET DISCOVERED (SERVICES GRID) -->
<section class="section digi-services-section" id="services">
    <div class="container">
        <div class="digi-section-head">
            <h2>Get Discovered</h2>
        </div>

        <div class="digi-cards-grid">
            <!-- Card 1: Keyword Research -->
            <div class="digi-service-card">
                <div class="digi-card-icon-floating">
                    <i class="fa-solid fa-desktop" style="color: #f59e0b;"></i>
                </div>
                <div class="digi-card-body">
                    <h3>Keyword Research</h3>
                    <p class="card-intro">Identify high-converting, high-volume search queries for your target market.</p>
                    <ul class="digi-card-checklist">
                        <li><i class="fa-solid fa-check"></i> High Commercial Intent Mapping</li>
                        <li><i class="fa-solid fa-check"></i> Competitor Keyword Gap Analysis</li>
                        <li><i class="fa-solid fa-check"></i> Search Volume & CPC Forecasting</li>
                        <li><i class="fa-solid fa-check"></i> Long-Tail Traffic Opportunities</li>
                    </ul>
                </div>
            </div>

            <!-- Card 2: On-Page SEO -->
            <div class="digi-service-card">
                <div class="digi-card-icon-floating">
                    <i class="fa-solid fa-lightbulb" style="color: #06b6d4;"></i>
                </div>
                <div class="digi-card-body">
                    <h3>On-Page SEO</h3>
                    <p class="card-intro">Optimize website structure, content relevance, and technical signals.</p>
                    <ul class="digi-card-checklist">
                        <li><i class="fa-solid fa-check"></i> Title & Meta Descriptions Tuning</li>
                        <li><i class="fa-solid fa-check"></i> Semantic Content Structure (H1-H6)</li>
                        <li><i class="fa-solid fa-check"></i> Internal Link & Silo Restructuring</li>
                        <li><i class="fa-solid fa-check"></i> Schema Structured Data Markup</li>
                    </ul>
                </div>
            </div>

            <!-- Card 3: Off-Page SEO -->
            <div class="digi-service-card">
                <div class="digi-card-icon-floating">
                    <i class="fa-solid fa-laptop-code" style="color: #4361ee;"></i>
                </div>
                <div class="digi-card-body">
                    <h3>Off-Page SEO</h3>
                    <p class="card-intro">Build domain authority with 100% white-hat contextual backlink equity.</p>
                    <ul class="digi-card-checklist">
                        <li><i class="fa-solid fa-check"></i> High-DA Editorial Backlinks</li>
                        <li><i class="fa-solid fa-check"></i> Relevant Niche Guest Posting</li>
                        <li><i class="fa-solid fa-check"></i> Brand Mentions & Digital PR</li>
                        <li><i class="fa-solid fa-check"></i> Toxic Backlink Disavowal</li>
                    </ul>
                </div>
            </div>

            <!-- Card 4: Local SEO -->
            <div class="digi-service-card">
                <div class="digi-card-icon-floating">
                    <i class="fa-solid fa-location-dot" style="color: #ef4444;"></i>
                </div>
                <div class="digi-card-body">
                    <h3>Local SEO</h3>
                    <p class="card-intro">Dominate Google Maps and local search results in your city or region.</p>
                    <ul class="digi-card-checklist">
                        <li><i class="fa-solid fa-check"></i> Google Business Profile Setup</li>
                        <li><i class="fa-solid fa-check"></i> Local NAP Citation Consistency</li>
                        <li><i class="fa-solid fa-check"></i> Google Maps Pack 3-Pack Ranking</li>
                        <li><i class="fa-solid fa-check"></i> Local Review & Rating Strategy</li>
                    </ul>
                </div>
            </div>

            <!-- Card 5: Link Building -->
            <div class="digi-service-card">
                <div class="digi-card-icon-floating">
                    <i class="fa-solid fa-link" style="color: #8b5cf6;"></i>
                </div>
                <div class="digi-card-body">
                    <h3>Link Building</h3>
                    <p class="card-intro">Sustainable link acquisition strategies that boost domain trust safety.</p>
                    <ul class="digi-card-checklist">
                        <li><i class="fa-solid fa-check"></i> High Authority Link Placements</li>
                        <li><i class="fa-solid fa-check"></i> Broken Link Reclamation</li>
                        <li><i class="fa-solid fa-check"></i> Resource Page Link Building</li>
                        <li><i class="fa-solid fa-check"></i> 100% Manual Outreach</li>
                    </ul>
                </div>
            </div>

            <!-- Card 6: E-Commerce SEO -->
            <div class="digi-service-card">
                <div class="digi-card-icon-floating">
                    <i class="fa-solid fa-cart-shopping" style="color: #10b981;"></i>
                </div>
                <div class="digi-card-body">
                    <h3>E-Commerce SEO</h3>
                    <p class="card-intro">Optimize product listings, category pages, and transactional buyer funnels.</p>
                    <ul class="digi-card-checklist">
                        <li><i class="fa-solid fa-check"></i> Product Page Rich Snippets</li>
                        <li><i class="fa-solid fa-check"></i> Category Hierarchy Optimization</li>
                        <li><i class="fa-solid fa-check"></i> Faceted Navigation Indexing</li>
                        <li><i class="fa-solid fa-check"></i> Checkout Funnel Optimization</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 3. WORKING STEPS (6 DARK CARDS ON SOFT BLUE BACKGROUND) -->
<section class="section digi-steps-section" id="steps">
    <div class="container">
        <div class="digi-section-head">
            <h2>Working Steps</h2>
        </div>

        <div class="digi-steps-grid">
            <!-- Step 1 -->
            <div class="digi-step-card">
                <div class="step-badge-num">1</div>
                <div class="step-card-content">
                    <h3>SEO Audit</h3>
                    <p>Comprehensive forensic audit of site crawlability, indexing errors, Core Web Vitals, and technical health bottlenecks.</p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="digi-step-card">
                <div class="step-badge-num">2</div>
                <div class="step-card-content">
                    <h3>Competitor Analysis</h3>
                    <p>Reverse engineering your top competitors' high-traffic keywords, link profiles, and market share opportunities.</p>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="digi-step-card">
                <div class="step-badge-num">3</div>
                <div class="step-card-content">
                    <h3>Keyword Research and Opportunity</h3>
                    <p>Identifying high-volume commercial intent keywords with high conversion value and favorable ranking difficulty.</p>
                </div>
            </div>

            <!-- Step 4 -->
            <div class="digi-step-card">
                <div class="step-badge-num">4</div>
                <div class="step-card-content">
                    <h3>Strategy Formulation</h3>
                    <p>Designing a customized 6-month execution roadmap tailored specifically to your revenue targets and industry niche.</p>
                </div>
            </div>

            <!-- Step 5 -->
            <div class="digi-step-card">
                <div class="step-badge-num">5</div>
                <div class="step-card-content">
                    <h3>Strategy Execution</h3>
                    <p>Implementing on-page optimization, content production clusters, technical fixes, and high-impact outreach.</p>
                </div>
            </div>

            <!-- Step 6 -->
            <div class="digi-step-card">
                <div class="step-badge-num">6</div>
                <div class="step-card-content">
                    <h3>Continuous Optimization</h3>
                    <p>Weekly rank tracking, Google Search Console analytics review, conversion rate tuning, and compounding ROI growth.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. GET IN TOUCH (CONTACT SECTION) -->
<section class="section digi-contact-section" id="contact">
    <div class="container">
        <div class="digi-section-head">
            <h2>Get In Touch</h2>
        </div>

        <div class="digi-contact-grid">
            <!-- Left Info -->
            <div class="digi-contact-left">
                <h3>
                    <span class="text-blue">Understand</span> user search intent and get noticed by quality organic users.
                </h3>
                <p>
                    Ready to dominate Google search results? Contact our SEO experts today for a free website analysis and tailored proposal.
                </p>
                <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; color: #475569;">
                    <div><i class="fa-solid fa-circle-check" style="color:#4361ee; margin-right: 8px;"></i> 100% White-Hat Google Compliance</div>
                    <div><i class="fa-solid fa-circle-check" style="color:#4361ee; margin-right: 8px;"></i> NOWPayments Crypto & bKash Supported</div>
                    <div><i class="fa-solid fa-circle-check" style="color:#4361ee; margin-right: 8px;"></i> Bi-Weekly Progress & KPI Reporting</div>
                </div>
            </div>

            <!-- Right Form Box (Light Periwinkle Box) -->
            <div class="digi-contact-form-box">
                <form action="<?= url('/contact/submit') ?>" method="POST">
                    <?= csrf_field() ?>
                    <div class="form-group-clean">
                        <input type="text" name="name" class="digi-input" placeholder="Full Name" required>
                    </div>
                    <div class="form-group-clean">
                        <input type="email" name="email" class="digi-input" placeholder="Email Address" required>
                    </div>
                    <div class="form-group-clean">
                        <input type="url" name="website" class="digi-input" placeholder="Website URL">
                    </div>
                    <div class="form-group-clean">
                        <input type="tel" name="phone" class="digi-input" placeholder="Phone Number">
                    </div>
                    <button type="submit" class="btn btn-lg btn-blue-solid btn-block">
                        Get Free SEO Audit <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- 5. SUBSCRIPTION (4 BLUE TOP-FOLDED PRICING CARDS) -->
<section class="section digi-pricing-section" id="pricing">
    <div class="container">
        <div class="digi-section-head">
            <h2>Subscription</h2>
        </div>

        <div class="digi-pricing-grid">
            <!-- Plan 1: Starter -->
            <div class="digi-pricing-card">
                <div class="pricing-card-header">
                    <h4>Starter</h4>
                    <div class="pricing-card-price">$125<span>/month</span></div>
                </div>
                <div class="pricing-card-badges">
                    <span>Audit</span>
                    <span>15 KW</span>
                    <span>On-Page</span>
                </div>
                <ul class="pricing-card-features">
                    <li><i class="fa-solid fa-check"></i> 15 Target Keywords</li>
                    <li><i class="fa-solid fa-check"></i> Full Technical SEO Audit</li>
                    <li><i class="fa-solid fa-check"></i> On-Page Optimization (5 Pages)</li>
                    <li><i class="fa-solid fa-check"></i> Monthly Performance Report</li>
                    <li><i class="fa-solid fa-check"></i> Email Support</li>
                </ul>
                <div class="pricing-card-footer">
                    <a href="<?= url('/services') ?>#subscription-plans" class="btn btn-aqua-solid btn-block" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Get Started</span> <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;"></i>
                    </a>
                </div>
            </div>

            <!-- Plan 2: Standard -->
            <div class="digi-pricing-card featured">
                <div class="pricing-card-header">
                    <h4>Standard</h4>
                    <div class="pricing-card-price">$350<span>/month</span></div>
                </div>
                <div class="pricing-card-badges">
                    <span>30 KW</span>
                    <span>Links</span>
                    <span>Content</span>
                </div>
                <ul class="pricing-card-features">
                    <li><i class="fa-solid fa-check"></i> 30 Target Keywords</li>
                    <li><i class="fa-solid fa-check"></i> Full Technical & Speed Audit</li>
                    <li><i class="fa-solid fa-check"></i> On-Page Optimization (15 Pages)</li>
                    <li><i class="fa-solid fa-check"></i> 10 High-DA Backlinks / Month</li>
                    <li><i class="fa-solid fa-check"></i> Bi-Weekly Progress Calls</li>
                </ul>
                <div class="pricing-card-footer">
                    <a href="<?= url('/services') ?>#subscription-plans" class="btn btn-aqua-solid btn-block" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Get Started</span> <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;"></i>
                    </a>
                </div>
            </div>

            <!-- Plan 3: Growth -->
            <div class="digi-pricing-card">
                <div class="pricing-card-header">
                    <h4>Growth</h4>
                    <div class="pricing-card-price">$550<span>/month</span></div>
                </div>
                <div class="pricing-card-badges">
                    <span>60 KW</span>
                    <span>PR Links</span>
                    <span>Scale</span>
                </div>
                <ul class="pricing-card-features">
                    <li><i class="fa-solid fa-check"></i> 60 Target Keywords</li>
                    <li><i class="fa-solid fa-check"></i> Complete Site Optimization (30 Pages)</li>
                    <li><i class="fa-solid fa-check"></i> 25 High-DA Backlinks / Month</li>
                    <li><i class="fa-solid fa-check"></i> Content Cluster Production</li>
                    <li><i class="fa-solid fa-check"></i> Dedicated Account Strategist</li>
                </ul>
                <div class="pricing-card-footer">
                    <a href="<?= url('/services') ?>#subscription-plans" class="btn btn-aqua-solid btn-block" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Get Started</span> <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;"></i>
                    </a>
                </div>
            </div>

            <!-- Plan 4: Enterprise -->
            <div class="digi-pricing-card">
                <div class="pricing-card-header">
                    <h4>Enterprise</h4>
                    <div class="pricing-card-price">$850<span>/month</span></div>
                </div>
                <div class="pricing-card-badges">
                    <span>Unlimited</span>
                    <span>Custom</span>
                    <span>VIP</span>
                </div>
                <ul class="pricing-card-features">
                    <li><i class="fa-solid fa-check"></i> Unlimited Keyword Targets</li>
                    <li><i class="fa-solid fa-check"></i> Full Website Overhaul & Core Web Vitals</li>
                    <li><i class="fa-solid fa-check"></i> 50+ Premium Tier Backlinks / Month</li>
                    <li><i class="fa-solid fa-check"></i> Weekly Video Growth Review</li>
                    <li><i class="fa-solid fa-check"></i> 24/7 Priority Support</li>
                </ul>
                <div class="pricing-card-footer">
                    <a href="<?= url('/services') ?>#subscription-plans" class="btn btn-aqua-solid btn-block" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Get Started</span> <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 6. NEWSLETTER / QUICK SUBSCRIPTION BANNER -->
<section class="digi-newsletter-ribbon">
    <div class="container">
        <div class="newsletter-flex-box">
            <div class="newsletter-text">
                <h3>Join Our Newsletter for Weekly SEO Trends and Algorithm Updates</h3>
            </div>
            <div class="newsletter-form-wrapper">
                <form class="newsletter-form-inline" onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
                    <input type="email" placeholder="Enter your email" required class="newsletter-input">
                    <button type="submit" class="btn btn-aqua-solid">Subscribe</button>
                </form>
            </div>
        </div>
    </div>
</section>
