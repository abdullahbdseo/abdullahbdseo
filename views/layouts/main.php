<?php
// views/layouts/main.php - Master Layout matching Digi Solution Mockup
require_once __DIR__ . '/../../core/Helpers.php';
require_once __DIR__ . '/../../core/Auth.php';
require_once __DIR__ . '/../../app/Services/SeoService.php';

$siteName = setting('site_name', 'Abdullah Saleh');
$siteLogoText = setting('site_logo_text', 'Abdullah Saleh');
$primaryColor = setting('primary_color', '#4361ee');
$accentColor = setting('accent_color', '#06b6d4');
$rawUri = $_SERVER['REQUEST_URI'] ?? '/';
$cleanPath = parse_url($rawUri, PHP_URL_PATH) ?? '/';
if (defined('BASE_PATH') && BASE_PATH && str_starts_with($cleanPath, BASE_PATH)) {
    $cleanPath = substr($cleanPath, strlen(BASE_PATH));
}
$currentUri = rtrim($cleanPath, '/') ?: '/';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle ?? setting('default_meta_title', 'Abdullah Saleh | SEO Specialist & Organic Growth Strategist')) ?></title>
    <meta name="description" content="<?= e($metaDescription ?? setting('default_meta_description', 'Abdullah Saleh delivers data-driven Search Engine Optimization services to rank your website #1 on Google.')) ?>">
    <meta name="keywords" content="<?= e(setting('default_meta_keywords', 'SEO Services, Search Engine Optimization, Technical SEO, Keyword Research, Link Building, Abdullah Saleh')) ?>">
    
    <!-- Open Graph / Social Meta -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= e($pageTitle ?? setting('default_meta_title')) ?>">
    <meta property="og:description" content="<?= e($metaDescription ?? setting('default_meta_description')) ?>">
    <meta property="og:url" content="<?= e(url($currentUri)) ?>">
    <meta property="og:site_name" content="<?= e($siteName) ?>">
    
    <link rel="canonical" href="<?= e(url($currentUri)) ?>">
    
    <!-- Favicon & Icons -->
    <link rel="icon" type="image/svg+xml" href="<?= asset('images/favicon.svg') ?>">
    <link rel="alternate icon" href="<?= asset('images/favicon.svg') ?>">
    <link rel="apple-touch-icon" href="<?= asset('images/logo-icon.svg') ?>">

    <!-- Google Fonts & Font Awesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Main Style -->
    <link rel="stylesheet" href="<?= asset('css/style.css') ?>?v=<?= time() ?>">
    
    <!-- Schema.org JSON-LD -->
    <?= SeoService::getOrganizationSchema() ?>
    <?php if (isset($customSchema)): ?>
        <?= $customSchema ?>
    <?php endif; ?>
</head>
<body>

    <!-- Site Header -->
    <header class="digi-header">
        <div class="container header-container">
            <a href="<?= url('/') ?>" class="digi-logo" aria-label="<?= e($siteName) ?>">
                <img src="<?= asset('images/logo-icon.svg') ?>" alt="<?= e($siteName) ?>" class="site-main-logo-icon">
                <span class="site-main-logo-text"><?= e($siteName) ?></span>
            </a>

            <ul class="digi-nav-links">
                <li><a href="<?= url('/') ?>" class="digi-nav-link <?= ($currentUri === '/' || $currentUri === '') ? 'active' : '' ?>">Home</a></li>
                <li><a href="<?= url('/services') ?>" class="digi-nav-link <?= str_contains($currentUri, '/services') ? 'active' : '' ?>">Services</a></li>
                
                <!-- Free Tools Dropdown Menu -->
                <li class="digi-nav-item has-dropdown">
                    <a href="<?= url('/tools') ?>" class="digi-nav-link <?= str_contains($currentUri, '/tools') ? 'active' : '' ?>">
                        Tools <i class="fa-solid fa-chevron-down nav-caret"></i>
                    </a>
                    <div class="digi-nav-dropdown">
                        <div class="dropdown-header">
                            <span class="dropdown-header-title"><i class="fa-solid fa-toolbox" style="color: #2563eb;"></i> Free SEO & Growth Tools</span>
                            <a href="<?= url('/tools') ?>" class="dropdown-all-link">View All Tools <i class="fa-solid fa-arrow-right" style="font-size: 0.72rem;"></i></a>
                        </div>
                        <div class="dropdown-grid">
                            <!-- Column 1: SEO Tools -->
                            <div class="dropdown-col">
                                <span class="dropdown-cat-title"><i class="fa-solid fa-magnifying-glass-chart" style="color: #2563eb;"></i> SEO & Technical</span>
                                <a href="<?= url('/tools/schema-markup-generator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#e0e7ff; color:#4338ca;"><i class="fa-solid fa-code"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>Schema Generator</strong>
                                        <span>JSON-LD rich snippets</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/serp-simulator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#fef3c7; color:#d97706;"><i class="fa-brands fa-google"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>SERP Simulator</strong>
                                        <span>Google & social card preview</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/robots-sitemap-generator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#f1f5f9; color:#334155;"><i class="fa-solid fa-robot"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>Robots & Sitemap</strong>
                                        <span>Crawler rules & XML maps</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/keyword-density-checker') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#dcfce7; color:#15803d;"><i class="fa-solid fa-chart-simple"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>Keyword Density</strong>
                                        <span>Frequency & readability</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/http-header-checker') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#fae8ff; color:#a21caf;"><i class="fa-solid fa-network-wired"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>HTTP & Redirects</strong>
                                        <span>301 tracer & SSL audit</span>
                                    </div>
                                </a>
                            </div>

                            <!-- Column 2: Calculators & ROI -->
                            <div class="dropdown-col">
                                <span class="dropdown-cat-title"><i class="fa-solid fa-calculator" style="color: #059669;"></i> Calculators & ROI</span>
                                <a href="<?= url('/tools/website-cost-calculator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#f1f5f9; color:#475569;"><i class="fa-solid fa-calculator"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>Website Cost Calculator</strong>
                                        <span>Estimate project investment</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/google-ads-roi-calculator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#fee2e2; color:#dc2626;"><i class="fa-brands fa-google"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>Google Ads ROI</strong>
                                        <span>Model ROAS & net profit</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/facebook-ads-roi-calculator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#eff6ff; color:#2563eb;"><i class="fa-brands fa-meta"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>Facebook Ads ROI</strong>
                                        <span>Meta ad budget simulator</span>
                                    </div>
                                </a>
                                <a href="<?= url('/tools/ai-automation-savings-calculator') ?>" class="dropdown-item">
                                    <div class="dropdown-item-icon" style="background:#ecfdf5; color:#059669;"><i class="fa-solid fa-robot"></i></div>
                                    <div class="dropdown-item-text">
                                        <strong>AI Savings Calculator</strong>
                                        <span>Project labor cost savings</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>

                <li><a href="<?= url('/portfolio') ?>" class="digi-nav-link <?= str_contains($currentUri, '/portfolio') ? 'active' : '' ?>"><i class="fa-brands fa-google" style="color:#4285F4; font-size:0.8rem; margin-right:3px;"></i> Results</a></li>
                <li><a href="<?= url('/#steps') ?>" class="digi-nav-link">Steps</a></li>
                <li><a href="<?= url('/#pricing') ?>" class="digi-nav-link">Pricing</a></li>
                <li><a href="<?= url('/contact') ?>" class="digi-nav-link <?= str_contains($currentUri, '/contact') ? 'active' : '' ?>">Contact</a></li>
            </ul>

            <div class="digi-header-actions">
                <button class="mobile-toggle" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></button>
            </div>
        </div>
    </header>

    <!-- Global Flash Alerts -->
    <?php if ($successMsg = flash('success')): ?>
        <div class="container" style="margin-top: 20px;">
            <div style="background: #eef2ff; color: #3730a3; padding: 14px 20px; border-radius: 8px; border: 1px solid #c7d2fe; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                <i class="fa-solid fa-circle-check"></i>
                <span><?= e($successMsg) ?></span>
            </div>
        </div>
    <?php endif; ?>

    <?php if ($errorMsg = flash('error')): ?>
        <div class="container" style="margin-top: 20px;">
            <div style="background: #fef2f2; color: #991b1b; padding: 14px 20px; border-radius: 8px; border: 1px solid #fecaca; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span><?= e($errorMsg) ?></span>
            </div>
        </div>
    <?php endif; ?>

    <!-- Main Content Body -->
    <main>
        <?= $content ?>
    </main>

    <!-- 1. NEWSLETTER / QUICK SUBSCRIPTION BANNER -->
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

    <!-- Modern 4-Column Footer matching exact reference -->
    <footer class="digi-footer">
        <div class="container">
            <div class="digi-footer-grid">
                <!-- Col 1: Brand, Bio & CTA -->
                <div class="digi-footer-col digi-footer-brand">
                    <div class="digi-footer-logo">
                        <a href="<?= url('/') ?>" aria-label="<?= e(setting('site_name', 'Abdullah Saleh')) ?>" style="text-decoration: none; display: inline-flex; align-items: center; gap: 10px; color: #ffffff;">
                            <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(255,255,255,0.22); border: 1px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; color: #ffffff;">
                                <?= strtoupper(substr(setting('expert_name', 'Abdullah Saleh'), 0, 2)) ?>
                            </div>
                            <span style="font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;"><?= e(setting('expert_name', setting('site_name', 'Abdullah Saleh'))) ?></span>
                        </a>
                    </div>
                    <p style="margin-top: 12px; margin-bottom: 20px; font-size: 0.92rem; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
                        <?= e(setting('expert_bio', 'Abdullah Saleh is an Organic Business Growth Specialist and SEO Expert in Bangladesh with 6+ years of experience helping 100+ businesses grow through search, technical SEO, content, and AI SEO.')) ?>
                    </p>
                    <div>
                        <a href="<?= url('/contact') ?>" class="btn-footer-cta" style="border-radius: 8px; padding: 10px 22px; font-weight: 700; background: #ffffff; color: #1e40af; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.12);">
                            Contact Now <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>

                <!-- Col 2: Connect -->
                <div class="digi-footer-col">
                    <h4>Connect</h4>
                    <ul class="digi-footer-links">
                        <li><a href="<?= url('/contact') ?>">Contact</a></li>
                        <li><a href="<?= url('/about') ?>">About Me</a></li>
                        <li><a href="<?= url('/services') ?>">Services</a></li>
                        <li><a href="<?= url('/portfolio') ?>">Case Studies</a></li>
                        <li><a href="<?= url('/blog') ?>">Blog</a></li>
                    </ul>
                </div>

                <!-- Col 3: Tools (Interactive Suite) -->
                <div class="digi-footer-col">
                    <h4>Free SEO Tools</h4>
                    <ul class="digi-footer-links">
                        <li><a href="<?= url('/tools/schema-markup-generator') ?>">Schema Markup Generator</a></li>
                        <li><a href="<?= url('/tools/serp-simulator') ?>">SERP Simulator & Previewer</a></li>
                        <li><a href="<?= url('/tools/robots-sitemap-generator') ?>">Robots.txt & Sitemap Builder</a></li>
                        <li><a href="<?= url('/tools/keyword-density-checker') ?>">Keyword Density Analyzer</a></li>
                        <li><a href="<?= url('/tools/http-header-checker') ?>">HTTP 301 & SSL Checker</a></li>
                        <li><a href="<?= url('/tools') ?>" style="color: #60a5fa; font-weight: 700;">View All 10 Free Tools &rarr;</a></li>
                    </ul>
                </div>

                <!-- Col 4: Legal -->
                <div class="digi-footer-col">
                    <h4>Legal</h4>
                    <ul class="digi-footer-links">
                        <li><a href="<?= url('/privacy-policy') ?>">Privacy Policy</a></li>
                        <li><a href="<?= url('/terms') ?>">Terms of Service</a></li>
                        <li><a href="javascript:void(0)" onclick="openCookieModal()">Cookie preferences</a></li>
                    </ul>
                </div>
            </div>

            <!-- Footer Bottom Bar -->
            <div class="digi-footer-bottom">
                <div>&copy; <?= date('Y') ?> <strong><?= e(setting('expert_name', setting('site_name', 'Abdullah Saleh'))) ?></strong>. All rights reserved.</div>
                <div class="digi-footer-legal">
                    <a href="<?= url('/tools') ?>">All Free Tools</a>
                    <span>&bull;</span>
                    <a href="<?= url('/privacy-policy') ?>">Privacy Policy</a>
                    <span>&bull;</span>
                    <a href="<?= url('/terms') ?>">Terms of Service</a>
                    <span>&bull;</span>
                    <a href="<?= url('/faq') ?>">FAQ</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- =========================================================================
         THANK YOU POP-UP MODAL (BEAUTIFUL HIGH-CONVERSION POPUP)
         ========================================================================= -->
    <div id="thankYouModal" class="digi-thankyou-modal-overlay">
        <div class="digi-thankyou-modal-card">
            <!-- Close X Button -->
            <button type="button" class="thankyou-close-btn" onclick="closeThankYouModal()" aria-label="Close">&times;</button>
            
            <!-- Animated Icon -->
            <div class="thankyou-icon-circle">
                <div class="thankyou-icon-inner">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="sparkle sparkle-left"><i class="fa-solid fa-sparkles"></i></div>
                <div class="sparkle sparkle-right"><i class="fa-solid fa-star"></i></div>
            </div>

            <h2 class="thankyou-title">Thank You!</h2>
            <div class="thankyou-subtitle">Your Project Inquiry Has Been Received Successfully</div>
            
            <p class="thankyou-desc">
                Hello <span id="thankYouClientName" style="font-weight: 700; color: #4361ee;"><?= e(flash('thank_you_name') ?: 'there') ?></span>, we appreciate you reaching out to <strong>Abdullah Saleh</strong>. Abdullah Saleh and the SEO team are currently reviewing your website details.
            </p>

            <!-- Steps Info Box -->
            <div class="thankyou-steps-box">
                <div class="thankyou-step-item">
                    <div class="step-check-icon"><i class="fa-solid fa-circle-check"></i></div>
                    <div><strong>Free Initial Audit:</strong> We analyze your domain crawlability & keywords.</div>
                </div>
                <div class="thankyou-step-item">
                    <div class="step-check-icon"><i class="fa-solid fa-circle-check"></i></div>
                    <div><strong>Response Within 24h:</strong> Tailored growth proposal sent to your email.</div>
                </div>
            </div>

            <div class="thankyou-btn-row">
                <button type="button" class="btn btn-lg btn-blue-solid btn-block" onclick="closeThankYouModal()">
                    <i class="fa-solid fa-thumbs-up"></i> Got It, Thanks!
                </button>
            </div>
        </div>
    </div>

    <!-- Cookie Preferences Modal -->
    <div id="cookiePreferencesModal" class="digi-thankyou-modal-overlay">
        <div class="digi-thankyou-modal-card" style="max-width: 520px; text-align: left;">
            <button type="button" class="thankyou-close-btn" onclick="closeCookieModal()" aria-label="Close">&times;</button>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
                <div style="width: 44px; height: 44px; border-radius: 10px; background: #eef2ff; color: #4361ee; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                    <i class="fa-solid fa-cookie-bite"></i>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 1.3rem; color: #0f172a;">Cookie Preferences</h3>
                    <span style="font-size: 0.85rem; color: #64748b;">Manage privacy and tracking settings</span>
                </div>
            </div>
            <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin-bottom: 18px;">
                We use essential cookies to ensure smooth application performance, secure payment checkouts, and anonymized analytics.
            </p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 0.92rem; color: #1e293b;">Strictly Necessary Cookies</strong>
                        <div style="font-size: 0.78rem; color: #64748b;">Essential for security, authentication and cart sessions.</div>
                    </div>
                    <span style="font-size: 0.75rem; background: #e2e8f0; color: #475569; font-weight: 700; padding: 3px 8px; border-radius: 4px;">Always Active</span>
                </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 0.92rem; color: #1e293b;">Analytics & Performance</strong>
                        <div style="font-size: 0.78rem; color: #64748b;">Help us measure anonymous traffic and improve tools.</div>
                    </div>
                    <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #4361ee; cursor: pointer;">
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button type="button" class="btn btn-blue-solid btn-block" onclick="closeCookieModal()" style="padding: 12px;">Save Preferences</button>
            </div>
        </div>
    </div>

    <!-- Interactive Script for Modal & AJAX Submissions -->
    <script>
        function openCookieModal() {
            const modal = document.getElementById('cookiePreferencesModal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeCookieModal() {
            const modal = document.getElementById('cookiePreferencesModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        function openThankYouModal(name) {
            const modal = document.getElementById('thankYouModal');
            if (name) {
                const nameEl = document.getElementById('thankYouClientName');
                if (nameEl) nameEl.textContent = name;
            }
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeThankYouModal() {
            const modal = document.getElementById('thankYouModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeThankYouModal();
        });

        // Close on clicking backdrop
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('thankYouModal');
            if (e.target === modal) closeThankYouModal();
        });

        // Check if server set flash for thank you modal
        <?php if (flash('thank_you_modal')): ?>
            document.addEventListener('DOMContentLoaded', function() {
                openThankYouModal('<?= e(flash('thank_you_name') ?: '') ?>');
            });
        <?php endif; ?>

        // Intercept all contact forms with AJAX for instant smooth popup
        document.addEventListener('DOMContentLoaded', function() {
            const contactForms = document.querySelectorAll('form[action*="/contact/submit"]');
            contactForms.forEach(function(form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
                    
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
                    }

                    const formData = new FormData(form);

                    fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                        }
                        if (data.success) {
                            form.reset();
                            openThankYouModal(data.name || '');
                        } else {
                            alert(data.message || 'There was an error submitting your form. Please try again.');
                        }
                    })
                    .catch(err => {
                        console.error('Contact Form Error:', err);
                        // Fallback to normal form submission if network error
                        form.submit();
                    });
                });
            });
        });
    </script>

    <!-- =========================================================================
         GOOGLE SEARCH CONSOLE PROOF LIGHTBOX MODAL
         ========================================================================= -->
    <div id="gscProofLightbox" class="gsc-lightbox-backdrop" role="dialog" aria-modal="true" aria-labelledby="gscLightboxTitle">
        <div class="gsc-lightbox-container">
            <div class="gsc-lightbox-header">
                <div id="gscLightboxTitle" class="gsc-lightbox-title">
                    <i class="fa-brands fa-google" style="color: #4285F4;"></i> Google Search Console Verified Performance
                </div>
                <button type="button" class="gsc-lightbox-close" onclick="closeGscProofModal()" aria-label="Close modal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="gsc-lightbox-image-wrap">
                <img id="gscLightboxImage" src="" alt="Google Search Console Proof">
            </div>
            <div class="gsc-lightbox-footer">
                <span id="gscLightboxFooter"><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> 100% Authentic Google Search Console Verified Performance Report</span>
                <span style="font-size: 0.78rem; opacity: 0.8;">Press <kbd style="background: rgba(255,255,255,0.15); padding: 2px 6px; border-radius: 4px;">Esc</kbd> or click outside to close</span>
            </div>
        </div>
    </div>

    <!-- Main JavaScript Asset -->
    <script src="<?= asset('js/main.js') ?>?v=<?= time() ?>"></script>
</body>
</html>
