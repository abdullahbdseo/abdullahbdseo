<?php
// views/public/errors/404.php - High-Performance Creative 404 Page
$pageTitle = '404 - Page Not Found | ' . setting('site_name', 'Abdullah Saleh');
?>

<section class="creative-404-section">
    <!-- Ambient Background Glows -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>

    <div class="container creative-404-container">
        
        <!-- Interactive Visual / Illustration Zone -->
        <div class="creative-404-hero">
            <div class="radar-scanner-wrapper">
                <div class="radar-pulse"></div>
                <div class="radar-sweep"></div>
                <div class="radar-grid"></div>

                <!-- Floating SEO Tech Chips -->
                <div class="floating-chip chip-1">
                    <i class="fa-solid fa-robot"></i> Googlebot: 404 Lost
                </div>
                <div class="floating-chip chip-2">
                    <i class="fa-solid fa-link-slash text-danger"></i> Broken Anchor
                </div>
                <div class="floating-chip chip-3">
                    <i class="fa-solid fa-shield-halved text-warning"></i> Disallow: /lost-path
                </div>
                <div class="floating-chip chip-4">
                    <i class="fa-solid fa-bolt text-info"></i> Re-index Suggestion
                </div>

                <!-- Giant Stylized 404 -->
                <div class="hero-404-number">
                    <span class="num-digit digit-4-left">4</span>
                    <div class="radar-core-planet">
                        <div class="planet-ring"></div>
                        <i class="fa-solid fa-satellite-dish planet-icon"></i>
                        <span class="satellite-orbit"><i class="fa-solid fa-satellite"></i></span>
                    </div>
                    <span class="num-digit digit-4-right">4</span>
                </div>
            </div>

            <!-- SEO Badge & Headline -->
            <div class="hero-badge">
                <span class="badge-dot"></span>
                <span><i class="fa-solid fa-compass"></i> HTTP 404 — Crawl Error: URL Unindexed</span>
            </div>

            <h1 class="creative-404-title">Oops! Even Our <span class="gradient-text">SEO Crawlers</span> Couldn't Find This Page</h1>
            <p class="creative-404-desc">
                The URL you are trying to reach might have been moved to a higher-ranking slug, renamed, or is temporarily unindexed. Don't worry, your organic journey doesn't have to stop here!
            </p>

            <!-- Quick Action Search & Recovery -->
            <div class="error-search-box">
                <div class="search-input-group">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" id="errorQuickSearch" placeholder="Search services, SEO tools, case studies, or blogs..." autocomplete="off">
                    <button type="button" id="btnQuickSearch" class="btn btn-search">
                        <span>Search</span> <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <!-- Dynamic Quick Result Dropdown -->
                <div id="quickSearchResults" class="quick-search-dropdown" style="display: none;"></div>
            </div>

            <!-- Primary Action Buttons -->
            <div class="hero-actions">
                <a href="<?= url('/') ?>" class="btn-404 btn-404-primary">
                    <i class="fa-solid fa-house"></i>
                    <span>Return to Homepage</span>
                </a>
                <a href="<?= url('/tools') ?>" class="btn-404 btn-404-accent">
                    <i class="fa-solid fa-toolbox"></i>
                    <span>Free SEO Tools Hub</span>
                </a>
                <a href="<?= url('/contact') ?>" class="btn-404 btn-404-outline">
                    <i class="fa-solid fa-headset"></i>
                    <span>Report Broken Link</span>
                </a>
            </div>
        </div>

        <!-- Helpful Recovery Hub -->
        <div class="recovery-hub">
            <div class="hub-header">
                <h3><i class="fa-solid fa-compass-drafting text-blue"></i> Popular Destinations to Get You Back on Track</h3>
                <p>Explore our most visited tools and revenue-driving SEO solutions</p>
            </div>

            <div class="hub-grid">
                <!-- Card 1: Free SEO Tools -->
                <a href="<?= url('/tools') ?>" class="hub-card">
                    <div class="hub-card-icon icon-tools">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                    <div class="hub-card-content">
                        <h4>Free SEO Tools Suite</h4>
                        <p>Analyze domain metrics, calculate ROI, generate Schema markup & SERP simulations.</p>
                        <span class="card-link-arrow">Explore Tools <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </a>

                <!-- Card 2: SEO Services -->
                <a href="<?= url('/services') ?>" class="hub-card">
                    <div class="hub-card-icon icon-services">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div class="hub-card-content">
                        <h4>Rank #1 SEO Services</h4>
                        <p>Technical audits, high-DA backlinks, on-page optimization & organic revenue strategy.</p>
                        <span class="card-link-arrow">View Services <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </a>

                <!-- Card 3: SEO Audit / Calculator -->
                <a href="<?= url('/website-cost-calculator') ?>" class="hub-card">
                    <div class="hub-card-icon icon-calc">
                        <i class="fa-solid fa-calculator"></i>
                    </div>
                    <div class="hub-card-content">
                        <h4>SEO & Growth Calculator</h4>
                        <p>Instant pricing estimator and projected organic revenue return for your website.</p>
                        <span class="card-link-arrow">Calculate Now <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </a>

                <!-- Card 4: Case Studies / Portfolio -->
                <a href="<?= url('/portfolio') ?>" class="hub-card">
                    <div class="hub-card-icon icon-results">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <div class="hub-card-content">
                        <h4>Verified Case Studies</h4>
                        <p>Real-world client ranking proofs, traffic surges, and Google Search Console data.</p>
                        <span class="card-link-arrow">See Proof <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </a>
            </div>
        </div>

        <!-- Interactive SEO Crawler Mini-Widget -->
        <div class="crawler-mini-widget">
            <div class="crawler-widget-left">
                <div class="crawler-avatar">
                    <i class="fa-solid fa-satellite-dish pulse-anim"></i>
                </div>
                <div>
                    <h4>Need an Emergency Technical SEO Fix?</h4>
                    <p>If you arrived from an external broken backlink, let us know and we'll map a 301 redirect.</p>
                </div>
            </div>
            <div class="crawler-widget-right">
                <a href="<?= url('/contact') ?>?subject=Broken+Link+Report" class="btn btn-sm btn-outline-dark">
                    <i class="fa-solid fa-paper-plane"></i> Contact Abdullah
                </a>
            </div>
        </div>

    </div>
</section>

<!-- Scoped Styles for Creative 404 -->
<style>
.creative-404-section {
    position: relative;
    padding: 80px 0 100px;
    background: radial-gradient(120% 100% at 50% 10%, #f8faff 0%, #ffffff 70%);
    overflow: hidden;
    min-height: 85vh;
    display: flex;
    align-items: center;
}

/* Ambient Orbs */
.glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
    pointer-events: none;
    z-index: 0;
}
.orb-1 {
    width: 450px;
    height: 450px;
    top: 5%;
    left: -100px;
    background: rgba(67, 97, 238, 0.25);
}
.orb-2 {
    width: 400px;
    height: 400px;
    bottom: 5%;
    right: -100px;
    background: rgba(0, 210, 211, 0.2);
}
.orb-3 {
    width: 300px;
    height: 300px;
    top: 40%;
    right: 20%;
    background: rgba(255, 159, 67, 0.15);
}

.creative-404-container {
    position: relative;
    z-index: 2;
    max-width: 1040px;
    margin: 0 auto;
}

/* Hero Zone */
.creative-404-hero {
    text-align: center;
    max-width: 820px;
    margin: 0 auto 50px;
}

/* Radar & Planet 404 */
.radar-scanner-wrapper {
    position: relative;
    width: 320px;
    height: 200px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.radar-pulse {
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 1px dashed rgba(67, 97, 238, 0.3);
    animation: radarPulse 3s infinite linear;
}

.radar-sweep {
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    border: 1px solid rgba(67, 97, 238, 0.12);
    animation: radarRotate 8s infinite linear;
}

@keyframes radarPulse {
    0% { transform: scale(0.85); opacity: 0.8; }
    50% { transform: scale(1.15); opacity: 0.2; }
    100% { transform: scale(0.85); opacity: 0.8; }
}

@keyframes radarRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.hero-404-number {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    z-index: 2;
}

.num-digit {
    font-family: var(--font-heading, 'Outfit', sans-serif);
    font-size: 8.5rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, #1e293b 0%, #4361ee 60%, #00d2d3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 10px 30px rgba(67, 97, 238, 0.15);
    user-select: none;
}

.radar-core-planet {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(145deg, #4361ee, #0f172a);
    box-shadow: 0 10px 35px rgba(67, 97, 238, 0.4), inset 0 2px 10px rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    animation: floatPlanet 4s ease-in-out infinite alternate;
}

.planet-icon {
    font-size: 2.2rem;
    color: #ffffff;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}

.planet-ring {
    position: absolute;
    width: 130px;
    height: 40px;
    border: 3px solid rgba(0, 210, 211, 0.7);
    border-radius: 50%;
    transform: rotate(-25deg);
    pointer-events: none;
}

.satellite-orbit {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    animation: orbitSpin 6s infinite linear;
}

.satellite-orbit i {
    position: absolute;
    top: 0;
    left: 50%;
    color: #ff9f43;
    font-size: 1rem;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0 0 6px #ff9f43);
}

@keyframes floatPlanet {
    0% { transform: translateY(0px) rotate(0deg); }
    100% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes orbitSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Floating Chips */
.floating-chip {
    position: absolute;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.78rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(67, 97, 238, 0.15);
    color: #1e293b;
    white-space: nowrap;
    z-index: 3;
    pointer-events: none;
    animation: chipFloat 5s ease-in-out infinite alternate;
}

.chip-1 { top: -10px; left: -25px; animation-delay: 0s; }
.chip-2 { top: 20px; right: -30px; animation-delay: 1.2s; }
.chip-3 { bottom: 0px; left: -20px; animation-delay: 2.1s; }
.chip-4 { bottom: -10px; right: -20px; animation-delay: 0.7s; }

@keyframes chipFloat {
    0% { transform: translateY(0); }
    100% { transform: translateY(-8px); }
}

/* Badge */
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: #eef2ff;
    border: 1px solid rgba(67, 97, 238, 0.2);
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #4361ee;
    margin-bottom: 20px;
}

.badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff4757;
    animation: blink 1.2s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
}

/* Titles */
.creative-404-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.25;
    margin-bottom: 16px;
}

.gradient-text {
    background: linear-gradient(135deg, #4361ee 0%, #00d2d3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.creative-404-desc {
    font-size: 1.1rem;
    color: #64748b;
    max-width: 680px;
    margin: 0 auto 30px;
    line-height: 1.6;
}

/* Quick Search Box */
.error-search-box {
    position: relative;
    max-width: 580px;
    margin: 0 auto 35px;
}

.search-input-group {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 50px;
    padding: 6px 8px 6px 20px;
    box-shadow: 0 10px 30px rgba(67, 97, 238, 0.08);
    transition: all 0.25s ease;
}

.search-input-group:focus-within {
    border-color: #4361ee;
    box-shadow: 0 12px 35px rgba(67, 97, 238, 0.18);
}

.search-icon {
    color: #94a3b8;
    font-size: 1.1rem;
    margin-right: 12px;
}

.search-input-group input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.98rem;
    font-family: inherit;
    color: #1e293b;
    background: transparent;
}

.btn-search {
    background: #4361ee;
    color: #ffffff;
    border: none;
    padding: 10px 22px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.92rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}

.btn-search:hover {
    background: #364fc7;
    transform: translateY(-1px);
}

.quick-search-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.12);
    z-index: 100;
    max-height: 320px;
    overflow-y: auto;
    text-align: left;
    padding: 8px;
}

.search-result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 10px;
    color: #1e293b;
    text-decoration: none;
    transition: background 0.15s ease;
}

.search-result-item:hover {
    background: #f1f5f9;
}

.search-result-item i {
    color: #4361ee;
    font-size: 1.1rem;
    width: 20px;
    text-align: center;
}

.search-result-info strong {
    display: block;
    font-size: 0.92rem;
    color: #0f172a;
}

.search-result-info span {
    font-size: 0.78rem;
    color: #64748b;
}

/* Action Buttons */
.hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
}

.btn-404 {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 26px;
    border-radius: 12px;
    font-size: 0.96rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.btn-404-primary {
    background: #4361ee;
    color: #ffffff;
}

.btn-404-primary:hover {
    background: #364fc7;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(67, 97, 238, 0.35);
}

.btn-404-accent {
    background: #0f172a;
    color: #ffffff;
}

.btn-404-accent:hover {
    background: #1e293b;
    color: #00d2d3;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
}

.btn-404-outline {
    background: #ffffff;
    color: #475569;
    border: 1px solid #cbd5e1;
}

.btn-404-outline:hover {
    background: #f8fafc;
    color: #4361ee;
    border-color: #4361ee;
    transform: translateY(-2px);
}

/* Recovery Hub Cards */
.recovery-hub {
    margin-top: 50px;
    padding-top: 40px;
    border-top: 1px solid #e2e8f0;
}

.hub-header {
    text-align: center;
    margin-bottom: 30px;
}

.hub-header h3 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 6px;
}

.hub-header p {
    font-size: 0.95rem;
    color: #64748b;
}

.hub-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.hub-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 24px 20px;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.hub-card:hover {
    transform: translateY(-5px);
    border-color: #4361ee;
    box-shadow: 0 15px 35px rgba(67, 97, 238, 0.12);
}

.hub-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-bottom: 16px;
    transition: transform 0.3s ease;
}

.hub-card:hover .hub-card-icon {
    transform: scale(1.1);
}

.icon-tools { background: #eef2ff; color: #4361ee; }
.icon-services { background: #e0fbfb; color: #00b4b6; }
.icon-calc { background: #fff4e6; color: #ff9f43; }
.icon-results { background: #fdf2f8; color: #ec4899; }

.hub-card-content h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
}

.hub-card-content p {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 16px;
    flex-grow: 1;
}

.card-link-arrow {
    font-size: 0.84rem;
    font-weight: 700;
    color: #4361ee;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s ease;
}

.hub-card:hover .card-link-arrow {
    gap: 10px;
}

/* Crawler Mini Widget */
.crawler-mini-widget {
    margin-top: 35px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 16px;
    padding: 20px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    color: #ffffff;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
}

.crawler-widget-left {
    display: flex;
    align-items: center;
    gap: 18px;
}

.crawler-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(67, 97, 238, 0.2);
    border: 1px solid rgba(67, 97, 238, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00d2d3;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.pulse-anim {
    animation: pulseIcon 2s infinite;
}

@keyframes pulseIcon {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); color: #ff9f43; }
}

.crawler-widget-left h4 {
    color: #ffffff;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.crawler-widget-left p {
    color: #94a3b8;
    font-size: 0.85rem;
    margin: 0;
}

.crawler-widget-right .btn-outline-dark {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}

.crawler-widget-right .btn-outline-dark:hover {
    background: #4361ee;
    border-color: #4361ee;
    color: #ffffff;
}

/* Responsive Breakpoints */
@media (max-width: 992px) {
    .hub-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .num-digit {
        font-size: 6.5rem;
    }
    .creative-404-title {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .creative-404-section {
        padding: 50px 0 70px;
    }
    .hub-grid {
        grid-template-columns: 1fr;
    }
    .num-digit {
        font-size: 5rem;
    }
    .radar-scanner-wrapper {
        transform: scale(0.9);
        height: 170px;
    }
    .creative-404-title {
        font-size: 1.6rem;
    }
    .hero-actions {
        flex-direction: column;
        width: 100%;
    }
    .btn-404 {
        width: 100%;
        justify-content: center;
    }
    .crawler-mini-widget {
        flex-direction: column;
        text-align: center;
        padding: 20px;
    }
    .crawler-widget-left {
        flex-direction: column;
    }
    .floating-chip {
        display: none; /* Hide floating chips on mobile to prevent overflow */
    }
}
</style>

<!-- Dynamic Quick Search Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('errorQuickSearch');
    const searchBtn = document.getElementById('btnQuickSearch');
    const resultsContainer = document.getElementById('quickSearchResults');

    // Searchable Site Index
    const searchIndex = [
        { title: 'Free SEO Tools Hub', category: 'Tools', url: '<?= url('/tools') ?>', icon: 'fa-toolbox' },
        { title: 'Website Cost Calculator', category: 'Tool', url: '<?= url('/website-cost-calculator') ?>', icon: 'fa-calculator' },
        { title: 'Google Ads ROI Calculator', category: 'Tool', url: '<?= url('/google-ads-roi-calculator') ?>', icon: 'fa-chart-pie' },
        { title: 'Website SEO Analyzer', category: 'Tool', url: '<?= url('/website-seo-analyzer') ?>', icon: 'fa-magnifying-glass-chart' },
        { title: 'Schema Markup Generator', category: 'Tool', url: '<?= url('/schema-generator') ?>', icon: 'fa-code' },
        { title: 'SERP Simulator & Meta Tags', category: 'Tool', url: '<?= url('/serp-simulator') ?>', icon: 'fa-desktop' },
        { title: 'Robots.txt & Sitemap Generator', category: 'Tool', url: '<?= url('/robots-generator') ?>', icon: 'fa-file-code' },
        { title: 'All SEO Services', category: 'Services', url: '<?= url('/services') ?>', icon: 'fa-rocket' },
        { title: 'Technical SEO Audit', category: 'Service', url: '<?= url('/services') ?>', icon: 'fa-gears' },
        { title: 'High DA Backlinks & Link Building', category: 'Service', url: '<?= url('/high-da-backlinks') ?>', icon: 'fa-link' },
        { title: 'Case Studies & Results', category: 'Portfolio', url: '<?= url('/portfolio') ?>', icon: 'fa-trophy' },
        { title: 'SEO Blog & Guides', category: 'Blog', url: '<?= url('/blog') ?>', icon: 'fa-newspaper' },
        { title: 'Pricing & SEO Packages', category: 'Pricing', url: '<?= url('/pricing') ?>', icon: 'fa-tags' },
        { title: 'Contact Abdullah / Free Consultation', category: 'Contact', url: '<?= url('/contact') ?>', icon: 'fa-envelope' }
    ];

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            return;
        }

        const matches = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div style="padding: 14px; text-align: center; color: #64748b; font-size: 0.9rem;">
                    <i class="fa-solid fa-circle-question" style="font-size: 1.5rem; color: #ff9f43; margin-bottom: 6px; display: block;"></i>
                    No matches found for "${query}". <br>
                    <a href="<?= url('/services') ?>" style="color: #4361ee; font-weight: 600; text-decoration: underline;">Browse all services</a> or <a href="<?= url('/contact') ?>" style="color: #4361ee; font-weight: 600; text-decoration: underline;">Contact us</a>.
                </div>
            `;
            resultsContainer.style.display = 'block';
            return;
        }

        let html = '';
        matches.slice(0, 6).forEach(item => {
            html += `
                <a href="${item.url}" class="search-result-item">
                    <i class="fa-solid ${item.icon}"></i>
                    <div class="search-result-info">
                        <strong>${item.title}</strong>
                        <span>${item.category} • Click to visit</span>
                    </div>
                </a>
            `;
        });

        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';
    }

    searchInput.addEventListener('input', performSearch);
    
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim()) {
            const firstResult = resultsContainer.querySelector('.search-result-item');
            if (firstResult) {
                window.location.href = firstResult.getAttribute('href');
            } else {
                performSearch();
            }
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstResult = resultsContainer.querySelector('.search-result-item');
            if (firstResult) {
                window.location.href = firstResult.getAttribute('href');
            }
        }
    });

    // Close dropdown on click outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});
</script>
