<?php
// views/public/tools/index.php - Free SEO, Marketing & ROI Tools Directory
?>

<div class="tool-page-wrapper" style="background: #ffffff; min-height: 100vh; padding-top: 30px; padding-bottom: 80px;">
    <div class="container" style="max-width: 1080px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Breadcrumb Pill -->
        <nav aria-label="Breadcrumb" style="margin-bottom: 24px; display: inline-flex;">
            <ol style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 6px; background: #f1f5f9; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 500; color: #64748b; list-style: none; margin: 0;">
                <li style="display: inline-flex; align-items: center; gap: 6px;">
                    <a href="<?= url('/') ?>" style="color: #475569; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-house" style="font-size: 0.78rem;"></i> Home
                    </a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li style="color: #0f172a; font-weight: 600;">Free SEO & Growth Tools</li>
            </ol>
        </nav>

        <!-- Page Introduction Header -->
        <div style="text-align: center; margin-bottom: 48px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 9999px; color: #2563eb; font-size: 0.82rem; font-weight: 600; margin-bottom: 12px;">
                <i class="fa-solid fa-toolbox"></i> 100% Free • No Sign-up Required
            </div>
            <h1 style="font-size: 2.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 14px; line-height: 1.15;">
                Free SEO & Marketing Tools Suite
            </h1>
            <p style="font-size: 1.1rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">
                Practical utilities and data-driven calculators designed for webmasters, marketing leaders, and business owners. Instant results with zero fluff.
            </p>
        </div>

        <!-- ================= SECTION 1: SEO & TECHNICAL OPTIMIZATION TOOLS ================= -->
        <div style="margin-bottom: 50px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">
                <span style="width: 32px; height: 32px; border-radius: 8px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">
                    <i class="fa-solid fa-magnifying-glass-chart"></i>
                </span>
                <div>
                    <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">SEO & Technical Optimization Tools</h2>
                    <span style="font-size: 0.82rem; color: #64748b;">Audit on-page SEO, generate structured data, simulate search snippets, and inspect server redirects.</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                
                <!-- Tool 1: Website SEO Analyzer -->
                <article class="tool-ref-card" style="border-color: #bfdbfe; box-shadow: 0 6px 24px rgba(37, 99, 235, 0.08);">
                    <div class="tool-ref-icon" style="background: #dbeafe; color: #1d4ed8;">
                        <i class="fa-solid fa-magnifying-glass-chart"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/website-seo-analyzer') ?>">Website SEO Analyzer</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Instantly audit your on-page SEO health score, Meta Title, Description, H1-H6 headings, OpenGraph social tags, and image alt attributes.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/website-seo-analyzer') ?>" class="tool-ref-link">
                            Audit Website <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Tool 2: Schema Markup (JSON-LD) Generator -->
                <article class="tool-ref-card" style="border-color: #cbd5e1;">
                    <div class="tool-ref-icon" style="background: #e0e7ff; color: #4338ca;">
                        <i class="fa-solid fa-code"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/schema-markup-generator') ?>">Schema Markup Generator</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Generate valid JSON-LD structured data for Local Business, Organization, Article, FAQ, Person, and Service with 1-click Google test.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/schema-markup-generator') ?>" class="tool-ref-link">
                            Generate Schema <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Tool 3: Google SERP Simulator & Meta Generator -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon" style="background: #fef3c7; color: #d97706;">
                        <i class="fa-brands fa-google"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/serp-simulator') ?>">SERP Simulator & Meta Tags</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Preview exactly how your web page appears on Google Desktop, Mobile, Facebook, and Twitter/X with live pixel length counters.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/serp-simulator') ?>" class="tool-ref-link">
                            Simulate SERP <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Tool 4: Robots.txt & XML Sitemap Generator -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon" style="background: #f1f5f9; color: #334155;">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/robots-sitemap-generator') ?>">Robots.txt & Sitemap Builder</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Create and test crawler directives, block aggressive AI scrapers, optimize crawl budget, and build compliant XML sitemaps.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/robots-sitemap-generator') ?>" class="tool-ref-link">
                            Build Robots & Sitemap <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Tool 5: Keyword Density & Readability Checker -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon" style="background: #dcfce7; color: #15803d;">
                        <i class="fa-solid fa-chart-simple"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/keyword-density-checker') ?>">Keyword Density & Readability</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Analyze 1-word, 2-word, and 3-word n-gram frequency, calculate Flesch reading ease score, and avoid Google keyword stuffing.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/keyword-density-checker') ?>" class="tool-ref-link">
                            Analyze Content <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Tool 6: HTTP Header & Redirect Checker -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon" style="background: #fae8ff; color: #a21caf;">
                        <i class="fa-solid fa-network-wired"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/http-header-checker') ?>">HTTP Header & Redirect Tracer</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Trace multi-hop 301/302 redirect chains, check response status codes, verify SSL encryption, and audit vital security headers.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/http-header-checker') ?>" class="tool-ref-link">
                            Trace Headers <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

            </div>
        </div>

        <!-- ================= SECTION 2: MARKETING & ROI CALCULATORS ================= -->
        <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">
                <span style="width: 32px; height: 32px; border-radius: 8px; background: #ecfdf5; color: #059669; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">
                    <i class="fa-solid fa-calculator"></i>
                </span>
                <div>
                    <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">Marketing & ROI Calculators</h2>
                    <span style="font-size: 0.82rem; color: #64748b;">Model paid advertising returns, estimate project development costs, and project AI labor savings.</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">

                <!-- Website Cost Calculator -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon">
                        <i class="fa-solid fa-calculator"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/website-cost-calculator') ?>">Website Cost Calculator</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Estimate the investment range for a new website or a redesign, based on the scope you actually need.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/website-cost-calculator') ?>" class="tool-ref-link">
                            Calculate Estimate <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Google Ads ROI Calculator -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon">
                        <i class="fa-brands fa-google"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/google-ads-roi-calculator') ?>">Google Ads ROI Calculator</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Model the return on a Google Ads budget using your own conversion rates and customer lifetime value.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/google-ads-roi-calculator') ?>" class="tool-ref-link">
                            Calculate ROI <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- Facebook Ads ROI Calculator -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon">
                        <i class="fa-brands fa-meta"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/facebook-ads-roi-calculator') ?>">Facebook Ads ROI Calculator</a>
                    </h3>
                    <p class="tool-ref-desc">
                        Model the return on a Facebook and Instagram Ads budget using your own conversion rates and customer value.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/facebook-ads-roi-calculator') ?>" class="tool-ref-link">
                            Calculate ROI <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <!-- AI Automation Savings Calculator -->
                <article class="tool-ref-card">
                    <div class="tool-ref-icon">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <h3 class="tool-ref-title">
                        <a href="<?= url('/tools/ai-automation-savings-calculator') ?>">AI Automation Savings Calculator</a>
                    </h3>
                    <p class="tool-ref-desc">
                        See how many hours and what portion of payroll your team can recover each month with AI-assisted workflows.
                    </p>
                    <div class="tool-ref-footer">
                        <a href="<?= url('/tools/ai-automation-savings-calculator') ?>" class="tool-ref-link">
                            Calculate Savings <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

            </div>
        </div>

        <!-- Custom Request Banner -->
        <div style="margin-top: 60px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 40px; text-align: center; color: #ffffff;">
            <h2 style="font-size: 1.8rem; font-weight: 800; margin: 0 0 12px;">Need a Custom Technical SEO Audit or Strategy?</h2>
            <p style="font-size: 1rem; color: #94a3b8; max-width: 600px; margin: 0 auto 24px; line-height: 1.6;">
                Automated tools are great, but human expertise finds deep architectural bottlenecks, indexation leaks, and untapped ranking opportunities.
            </p>
            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
                <a href="<?= url('/contact') ?>" style="background: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;">
                    <i class="fa-solid fa-comments"></i> Book Free Consultation
                </a>
                <a href="<?= url('/services') ?>" style="background: rgba(255,255,255,0.1); color: #ffffff; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); display: inline-flex; align-items: center; gap: 8px;">
                    View SEO Services <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>

    </div>
</div>

<style>
.tool-ref-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.tool-ref-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    border-color: #93c5fd;
}
.tool-ref-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #f1f5f9;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: 16px;
}
.tool-ref-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
    line-height: 1.3;
}
.tool-ref-title a {
    color: #0f172a;
    text-decoration: none;
    transition: color 0.2s;
}
.tool-ref-title a:hover {
    color: #2563eb;
}
.tool-ref-desc {
    font-size: 0.88rem;
    color: #475569;
    line-height: 1.55;
    margin: 0 0 20px;
    flex-grow: 1;
}
.tool-ref-footer {
    border-top: 1px solid #f1f5f9;
    padding-top: 14px;
}
.tool-ref-link {
    font-size: 0.85rem;
    font-weight: 700;
    color: #2563eb;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s;
}
.tool-ref-link:hover {
    gap: 10px;
}
</style>
