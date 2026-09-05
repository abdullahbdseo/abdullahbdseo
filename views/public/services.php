<?php
// views/public/services.php - Services & Subscription Packages in Digi Solution Theme
$isLoggedIn = Auth::check();
$currentUser = Auth::user();

// Separate subscription retainer service (ID 7 or slug 'monthly-seo-subscription-retainer') from specialized services
$specializedServices = array_filter($services, function($s) {
    return ($s['id'] ?? 0) != 7 && ($s['slug'] ?? '') !== 'monthly-seo-subscription-retainer';
});
?>

<!-- Hero Header Section -->
<section class="digi-hero-section" style="padding: 55px 0 40px; text-align: center;">
    <div class="container">
        <span class="text-blue" style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Comprehensive Capabilities</span>
        <h1 style="font-size: 2.8rem; margin: 10px 0 14px; font-weight: 800;">Professional SEO Services &amp; Subscriptions</h1>
        <p style="font-size: 1.1rem; color: var(--digi-text-body); max-width: 680px; margin: 0 auto; line-height: 1.6;">
            Choose from continuous monthly growth subscriptions or specialized consulting engagements tailored to your organic revenue targets.
        </p>
    </div>
</section>

<!-- 1. MONTHLY SUBSCRIPTION PACKAGES SECTION (Exact Mockup Match) -->
<section class="section digi-pricing-section" id="subscription-plans" style="padding-top: 10px; padding-bottom: 70px;">
    <div class="container">
        <div class="section-title text-center" style="margin-bottom: 45px;">
            <span class="text-blue" style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Continuous Growth Retainers</span>
            <h2 style="font-size: 2.3rem; font-weight: 800; color: #0f172a; margin-top: 6px;">Subscription Packages</h2>
            <p style="color: #64748b; font-size: 1.05rem; max-width: 680px; margin: 0 auto;">
                Predictable, compounding organic traffic expansion with dedicated hours each month for technical health, content clusters, and high-authority links.
            </p>
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
                    <button type="button" 
                            class="btn btn-aqua-solid btn-block"
                            onclick="openOrderModal(7, 'Monthly SEO Growth &amp; Ranking Retainers', 19, 'Starter Monthly Plan', 125, '30 Days Delivery', '2 Revisions')">
                        Get Started <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <!-- Plan 2: Standard (Featured) -->
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
                    <li><i class="fa-solid fa-check"></i> Full Technical &amp; Speed Audit</li>
                    <li><i class="fa-solid fa-check"></i> On-Page Optimization (15 Pages)</li>
                    <li><i class="fa-solid fa-check"></i> 10 High-DA Backlinks / Month</li>
                    <li><i class="fa-solid fa-check"></i> Bi-Weekly Progress Calls</li>
                </ul>
                <div class="pricing-card-footer">
                    <button type="button" 
                            class="btn btn-aqua-solid btn-block"
                            onclick="openOrderModal(7, 'Monthly SEO Growth &amp; Ranking Retainers', 20, 'Standard Monthly Plan', 350, '30 Days Delivery', '3 Revisions')">
                        Get Started <i class="fa-solid fa-arrow-right"></i>
                    </button>
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
                    <button type="button" 
                            class="btn btn-aqua-solid btn-block"
                            onclick="openOrderModal(7, 'Monthly SEO Growth &amp; Ranking Retainers', 21, 'Growth Monthly Plan', 550, '30 Days Delivery', '4 Revisions')">
                        Get Started <i class="fa-solid fa-arrow-right"></i>
                    </button>
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
                    <li><i class="fa-solid fa-check"></i> Full Website Overhaul &amp; Core Web Vitals</li>
                    <li><i class="fa-solid fa-check"></i> 50+ Premium Tier Backlinks / Month</li>
                    <li><i class="fa-solid fa-check"></i> Weekly Video Growth Review</li>
                    <li><i class="fa-solid fa-check"></i> 24/7 Priority Support</li>
                </ul>
                <div class="pricing-card-footer">
                    <button type="button" 
                            class="btn btn-aqua-solid btn-block"
                            onclick="openOrderModal(7, 'Monthly SEO Growth &amp; Ranking Retainers', 22, 'Enterprise Monthly Plan', 850, '30 Days Delivery', 'VIP Priority Support')">
                        Get Started <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 2. SPECIALIZED SEO SERVICE CAPABILITIES SECTION -->
<section class="section digi-services-section" style="background: #f8fafc; padding: 75px 0 90px; border-top: 1px solid #e2e8f0;">
    <div class="container">
        <div class="section-title text-center" style="margin-bottom: 40px;">
            <span class="text-blue" style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Specialized Engagements</span>
            <h2 style="font-size: 2.2rem; font-weight: 800; color: #0f172a; margin-top: 6px;">Targeted SEO Services</h2>
            <p style="color: #64748b; font-size: 1.05rem; max-width: 680px; margin: 0 auto;">
                Need a specific one-off overhaul or targeted campaign? Explore our specialized service packages with clear deliverables.
            </p>
        </div>

        <div class="digi-cards-grid">
            <?php foreach ($specializedServices as $service): ?>
                <div class="digi-service-card" style="margin-top: 30px;">
                    <div class="digi-card-icon-floating">
                        <i class="fa-solid <?= e($service['icon'] ?? 'fa-chart-line') ?>" style="color: var(--digi-blue);"></i>
                    </div>
                    <div class="digi-card-body">
                        <span style="display:inline-block; font-size: 0.72rem; font-weight: 700; color: var(--digi-blue); background: var(--digi-blue-subtle); padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; text-align: center; width: fit-content; margin-left: auto; margin-right: auto;">
                            <?= e($service['category_name'] ?? 'SEO') ?>
                        </span>
                        <h3><?= e($service['title']) ?></h3>
                        <p class="card-intro"><?= e($service['short_description']) ?></p>
                        
                        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: auto;">
                            <div>
                                <span style="font-size: 0.75rem; color: var(--digi-text-muted);">Starting at</span>
                                <div style="font-size: 1.25rem; font-weight: 800; color: var(--digi-text-main);">$<?= number_format($service['starting_price'], 0) ?></div>
                            </div>
                            <a href="<?= url('/services/' . $service['slug']) ?>" class="btn btn-sm btn-blue-solid">
                                View Packages <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- INTERACTIVE CHECKOUT & ORDER MODAL -->
<div id="orderModalBackdrop" class="order-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalServiceTitle">
    <div class="order-modal-content">
        <button type="button" class="order-modal-close" onclick="closeOrderModal()" aria-label="Close modal">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="order-modal-header">
            <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #4361ee; letter-spacing: 0.05em; margin-bottom: 2px;">
                Checkout Configuration
            </div>
            <h3 id="modalServiceTitle" style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Subscription Package</h3>
            <div id="modalPkgSummary" class="order-modal-pkg-summary">
                <i class="fa-solid fa-box-open" style="color: #4361ee;"></i>
                <span id="modalPkgName" style="font-weight: 700;">Package</span> &bull; 
                <span id="modalPkgPrice" style="color: #10b981; font-weight: 800;">$0</span> &bull; 
                <span id="modalPkgDelivery" style="color: #64748b; font-weight: 500;">0 Days</span>
            </div>
        </div>

        <form action="<?= url('/order/create') ?>" method="POST" id="servicesOrderForm">
            <?= csrf_field() ?>
            <input type="hidden" name="service_id" id="formServiceId" value="7">
            <input type="hidden" name="package_id" id="formPackageId" value="">

            <div style="display: flex; flex-direction: column; gap: 16px;">
                <!-- Website URL -->
                <div>
                    <label class="order-form-label">Website URL <span style="color: #ef4444;">*</span></label>
                    <div style="position: relative;">
                        <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"><i class="fa-solid fa-globe"></i></span>
                        <input type="url" name="website_url" id="servicesWebsiteUrl" class="digi-input" style="padding-left: 40px;" placeholder="https://yourwebsite.com" required>
                    </div>
                </div>

                <!-- Target Country & Keywords -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                    <div>
                        <label class="order-form-label">Target Geo / Country</label>
                        <select name="target_country" class="digi-input">
                            <option value="Global">Global / International</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="European Union">European Union</option>
                        </select>
                    </div>

                    <div>
                        <label class="order-form-label">Target Keywords (Optional)</label>
                        <input type="text" name="target_keywords" class="digi-input" placeholder="e.g. ecommerce seo, local audit">
                    </div>
                </div>

                <!-- Client Notes -->
                <div>
                    <label class="order-form-label">Specific Instructions / Competitors (Optional)</label>
                    <textarea name="client_notes" class="digi-input" rows="2" placeholder="Share specific competitors, current bottlenecks, or instructions..."></textarea>
                </div>

                <!-- Account section if not logged in -->
                <?php if (!$isLoggedIn): ?>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 4px;">
                        <div style="font-size: 0.82rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-user-lock" style="color: #4361ee;"></i> Client Account Setup (Instant)
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                            <div>
                                <label class="order-form-label">Your Name <span style="color: #ef4444;">*</span></label>
                                <input type="text" name="name" class="digi-input" placeholder="Full Name" required>
                            </div>
                            <div>
                                <label class="order-form-label">Email Address <span style="color: #ef4444;">*</span></label>
                                <input type="email" name="email" class="digi-input" placeholder="name@company.com" required>
                            </div>
                        </div>

                        <div>
                            <label class="order-form-label">Set Account Password <span style="color: #ef4444;">*</span></label>
                            <input type="password" name="password" class="digi-input" placeholder="Min. 8 characters" minlength="6" required>
                            <div style="font-size: 0.74rem; color: #64748b; margin-top: 4px;">
                                A secure client workspace will be automatically provisioned for tracking deliverables.
                            </div>
                        </div>
                    </div>
                <?php else: ?>
                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 10px 14px; font-size: 0.84rem; color: #065f46; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-user-check"></i>
                        <span>Ordering as <strong><?= e($currentUser['name']) ?></strong> (<?= e($currentUser['email']) ?>)</span>
                    </div>
                <?php endif; ?>

                <button type="submit" id="servicesOrderSubmitBtn" class="btn btn-lg btn-blue-solid btn-block" style="margin-top: 8px; border-radius: 12px; font-size: 1rem; padding: 14px;">
                    <i class="fa-solid fa-lock" style="margin-right: 6px;"></i> Proceed to Secure Payment <i class="fa-solid fa-arrow-right"></i>
                </button>

                <div style="display: flex; justify-content: center; align-items: center; gap: 16px; font-size: 0.75rem; color: #64748b; margin-top: 4px; flex-wrap: wrap;">
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
function openOrderModal(serviceId, serviceTitle, packageId, packageName, price, delivery, revisions) {
    document.getElementById('formServiceId').value = serviceId || 7;
    document.getElementById('formPackageId').value = packageId || 19;
    document.getElementById('modalServiceTitle').textContent = serviceTitle || 'Subscription Package';
    document.getElementById('modalPkgName').textContent = packageName || 'Package';
    document.getElementById('modalPkgPrice').textContent = '$' + Number(price || 0).toLocaleString();
    document.getElementById('modalPkgDelivery').textContent = (delivery || '30 Days Delivery') + (revisions ? ' • ' + revisions : '');
    
    var modal = document.getElementById('orderModalBackdrop');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        var urlInput = document.getElementById('servicesWebsiteUrl');
        if (urlInput) setTimeout(function() { urlInput.focus(); }, 150);
    }
}

function closeOrderModal() {
    var modal = document.getElementById('orderModalBackdrop');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close on backdrop click
var modalBackdrop = document.getElementById('orderModalBackdrop');
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function(e) {
        if (e.target === this) {
            closeOrderModal();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});

var servicesOrderForm = document.getElementById('servicesOrderForm');
if (servicesOrderForm) {
    servicesOrderForm.addEventListener('submit', function() {
        var btn = document.getElementById('servicesOrderSubmitBtn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Order...';
        }
    });
}
</script>
