<?php
// views/public/terms.php - Terms & Conditions of Service in Digi Solution Theme
?>

<!-- =========================================================================
     1. HERO HEADER SECTION
     ========================================================================= -->
<section class="legal-hero-section">
    <div class="container">
        <!-- Breadcrumb -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 0.82rem; color: #64748b; margin-bottom: 16px;">
            <a href="<?= url('/') ?>" style="color: #64748b; text-decoration: none;">Home</a>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i>
            <span>Legal</span>
            <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem;"></i>
            <span style="color: var(--digi-blue, #4361ee); font-weight: 600;">Terms &amp; Conditions</span>
        </div>

        <div class="legal-badge-pill">
            <i class="fa-solid fa-scale-balanced"></i> Official Service Agreement
        </div>

        <h1 class="legal-hero-title">Terms &amp; Conditions of Service</h1>

        <p class="legal-hero-desc">
            These terms and conditions govern all professional SEO audits, monthly retainer subscriptions, link building, and consulting engagements provided by <strong>Abdullah Saleh</strong>.
        </p>

        <div class="legal-meta-bar">
            <div class="legal-meta-item">
                <i class="fa-regular fa-calendar-check" style="color: #10b981;"></i>
                <span>Effective Date: <strong>January 1, 2026</strong></span>
            </div>
            <span>&bull;</span>
            <div class="legal-meta-item">
                <i class="fa-solid fa-clock-rotate-left" style="color: var(--digi-blue);"></i>
                <span>Last Updated: <strong>September 2026</strong></span>
            </div>
            <span>&bull;</span>
            <button type="button" onclick="window.print()" class="btn btn-sm" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.78rem; padding: 4px 10px; color: #475569; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                <i class="fa-solid fa-print"></i> Print Agreement
            </button>
        </div>

        <!-- Policy Switcher Tabs -->
        <div class="legal-nav-tabs">
            <a href="<?= url('/terms') ?>" class="legal-nav-link active">
                <i class="fa-solid fa-file-contract"></i> Terms of Service
            </a>
            <a href="<?= url('/privacy-policy') ?>" class="legal-nav-link">
                <i class="fa-solid fa-user-shield"></i> Privacy Policy
            </a>
            <a href="<?= url('/refund-policy') ?>" class="legal-nav-link">
                <i class="fa-solid fa-rotate-left"></i> Refund &amp; Cancellation
            </a>
        </div>
    </div>
</section>

<!-- =========================================================================
     2. EXECUTIVE SUMMARY HIGHLIGHTS GRID
     ========================================================================= -->
<section class="container" style="margin-top: 10px;">
    <div class="legal-highlights-grid">
        <div class="legal-highlight-card">
            <div class="legal-highlight-icon" style="background: #eff6ff; color: #3b82f6;">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h4>100% White-Hat Guarantee</h4>
            <p>Strict compliance with Google Search Essentials and Webmaster Quality guidelines. Zero black-hat tactics.</p>
        </div>

        <div class="legal-highlight-card">
            <div class="legal-highlight-icon" style="background: #ecfdf5; color: #10b981;">
                <i class="fa-solid fa-receipt"></i>
            </div>
            <h4>Transparent Invoicing &amp; Billing</h4>
            <p>Clear itemized billing, official digital receipts with unique Order IDs, and zero hidden management fees.</p>
        </div>

        <div class="legal-highlight-card">
            <div class="legal-highlight-icon" style="background: #fdf2f8; color: #ec4899;">
                <i class="fa-solid fa-chart-pie"></i>
            </div>
            <h4>Transparent Deliverables</h4>
            <p>Live progress tracking dashboards, Search Console verification, and scheduled milestone reporting.</p>
        </div>

        <div class="legal-highlight-card">
            <div class="legal-highlight-icon" style="background: #fefce8; color: #eab308;">
                <i class="fa-solid fa-lock"></i>
            </div>
            <h4>Full Client NDA</h4>
            <p>Non-disclosure protection for all proprietary keywords, conversion analytics, and private client data.</p>
        </div>
    </div>
</section>

<!-- =========================================================================
     3. MAIN LEGAL CONTENT & STICKY TABLE OF CONTENTS
     ========================================================================= -->
<section class="container">
    <div class="legal-main-wrap">
        <!-- Sticky Sidebar Table of Contents -->
        <aside class="legal-sidebar-sticky">
            <div class="legal-toc-card">
                <div class="legal-toc-title">
                    <i class="fa-solid fa-list-ol" style="color: var(--digi-blue);"></i> Table of Contents
                </div>
                <nav class="legal-toc-list" id="legalTocList">
                    <a href="#intro" class="legal-toc-link active"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 1. Acceptance of Terms</a>
                    <a href="#scope" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 2. Scope of Services &amp; Retainers</a>
                    <a href="#client-obligations" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 3. Client Responsibilities</a>
                    <a href="#payments" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 4. Payments &amp; Invoicing</a>
                    <a href="#disclaimer" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 5. Search Algorithm Disclaimer</a>
                    <a href="#deliverables" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 6. Deliverables &amp; Turnaround</a>
                    <a href="#intellectual-property" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 7. Intellectual Property</a>
                    <a href="#confidentiality" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 8. Confidentiality (NDA)</a>
                    <a href="#liability" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 9. Limitation of Liability</a>
                    <a href="#cancellation" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 10. Cancellation &amp; Refunds</a>
                    <a href="#governing-law" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 11. Governing Law</a>
                    <a href="#contact-legal" class="legal-toc-link"><i class="fa-solid fa-angle-right" style="font-size: 0.75rem;"></i> 12. Legal Inquiries</a>
                </nav>
            </div>

            <!-- Custom MSA / NDA Box -->
            <div class="legal-sidebar-cta">
                <h4><i class="fa-solid fa-briefcase" style="color: #60a5fa; margin-right: 6px;"></i> Enterprise Contract?</h4>
                <p>Need a bilateral NDA, custom Master Services Agreement (MSA), or customized billing workflow for your company?</p>
                <a href="<?= url('/contact') ?>" class="btn btn-sm btn-aqua-solid btn-block" style="border-radius: 8px; font-size: 0.85rem; text-decoration: none; justify-content: center;">
                    <i class="fa-solid fa-envelope"></i> Request Custom Contract
                </a>
            </div>
        </aside>

        <!-- Main Articles Body -->
        <main class="legal-content-card">
            <!-- Article 1 -->
            <article class="legal-article-section" id="intro">
                <div class="legal-section-header">
                    <span class="legal-section-num">01</span>
                    <h3>Acceptance of Terms &amp; Conditions</h3>
                </div>
                <p>
                    By accessing, registering an account on, or ordering SEO services through <strong><?= e(setting('site_name', 'Abdullah Saleh SEO Platform')) ?></strong> (referred to herein as the "Platform", "Service", "we", "us", or "Provider"), you (the "Client", "User", or "Customer") agree to be legally bound by these Terms and Conditions.
                </p>
                <p>
                    If you are entering into this Agreement on behalf of a company, organization, or other legal entity, you represent that you have the requisite corporate authority to bind such entity to these Terms. If you do not agree to all terms and conditions, you must refrain from ordering or using our services.
                </p>
            </article>

            <!-- Article 2 -->
            <article class="legal-article-section" id="scope">
                <div class="legal-section-header">
                    <span class="legal-section-num">02</span>
                    <h3>Scope of SEO Services &amp; Retainers</h3>
                </div>
                <p>
                    We provide professional search engine optimization services encompassing, but not limited to:
                </p>
                <ul>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Technical SEO Audits:</strong> In-depth crawlability analysis, indexing diagnostics, Core Web Vitals profiling, JavaScript rendering fixes, and structured schema implementation.</li>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Keyword Research &amp; Topic Clustering:</strong> Search intent mapping, semantic topic blueprinting, competitor gap intelligence, and content roadmap formulation.</li>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>On-Page Optimization:</strong> Title tags, meta descriptions, header hierarchy, internal linking architecture, and content relevance tuning.</li>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Authority Link Building &amp; Digital PR:</strong> Contextual high-DA editorial placements, broken link outreach, resource mentions, and digital PR.</li>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Monthly SEO Subscriptions:</strong> Dedicated recurring hours allocated to continuous on-page sprints, technical maintenance, and backlink growth.</li>
                </ul>
                <div class="legal-callout-box info">
                    <i class="fa-solid fa-circle-info legal-callout-icon"></i>
                    <div class="legal-callout-content">
                        <strong>Tiered Deliverable Specifications</strong>
                        Each package tier contains clearly enumerated deliverables, target keyword limits, and turnaround days as displayed on the respective service and pricing pages.
                    </div>
                </div>
            </article>

            <!-- Article 3 -->
            <article class="legal-article-section" id="client-obligations">
                <div class="legal-section-header">
                    <span class="legal-section-num">03</span>
                    <h3>Client Responsibilities &amp; Technical Access</h3>
                </div>
                <p>
                    To ensure timely and effective execution of search engine optimization campaigns, the Client agrees to:
                </p>
                <ul>
                    <li><i class="fa-solid fa-key"></i> <strong>Provide Delegated Technical Access:</strong> Grant appropriate read/write access to Google Search Console, Google Analytics 4, Tag Manager, or CMS/FTP environments when on-site implementation is included in the package.</li>
                    <li><i class="fa-solid fa-bullhorn"></i> <strong>Accurate Information:</strong> Supply accurate domain URLs, target geo-locations, target keywords, and notes during order checkout.</li>
                    <li><i class="fa-solid fa-comments"></i> <strong>Timely Approvals:</strong> Review submitted drafts, content clusters, and technical recommendations within reasonable turnaround windows (typically 3–5 business days).</li>
                    <li><i class="fa-solid fa-triangle-exclamation"></i> <strong>Notify of Major Site Changes:</strong> Inform the Provider before making major URL migrations, redesigns, robots.txt modifications, or domain routing adjustments.</li>
                </ul>
            </article>

            <!-- Article 4 -->
            <article class="legal-article-section" id="payments">
                <div class="legal-section-header">
                    <span class="legal-section-num">04</span>
                    <h3>Payments, Invoicing &amp; Billing Terms</h3>
                </div>
                <p>
                    All service package prices, subscription retainers, and consulting engagements are quoted in United States Dollars (USD).
                </p>
                <ul>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Secure Digital Payment Gateways:</strong> Transactions are processed through verified payment channels and secure checkout protocols.</li>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Prepayment Requirement:</strong> All standard service packages require full prepayment prior to the initiation of strategic analysis, audits, or link acquisition sprints.</li>
                    <li><i class="fa-solid fa-circle-check"></i> <strong>Enterprise Billing:</strong> Custom milestone invoicing schedules may be established for enterprise clients under a signed Master Services Agreement (MSA).</li>
                </ul>
                <div class="legal-callout-box success">
                    <i class="fa-solid fa-receipt legal-callout-icon"></i>
                    <div class="legal-callout-content">
                        <strong>Official Invoices &amp; Order Confirmation</strong>
                        An official digital invoice and deliverable tracking receipt with a unique Order ID (e.g. `ORD-YYYYMMDD-XXXXX`) is issued immediately upon order confirmation.
                    </div>
                </div>
                <p>
                    There are zero hidden fees or automatic surcharges. Any additional requested scope outside the purchased package tier will be quoted and approved prior to billing.
                </p>
            </article>

            <!-- Article 5 -->
            <article class="legal-article-section" id="disclaimer">
                <div class="legal-section-header">
                    <span class="legal-section-num">05</span>
                    <h3>Search Engine Rankings &amp; Algorithm Disclaimer</h3>
                </div>
                <p>
                    Search engine optimization is inherently subject to third-party search engine algorithms (e.g., Google Core, Helpful Content, Spam Updates) and competitor activity.
                </p>
                <div class="legal-callout-box warning">
                    <i class="fa-solid fa-triangle-exclamation legal-callout-icon"></i>
                    <div class="legal-callout-content">
                        <strong>No Guarantees of Specific #1 Rankings</strong>
                        In accordance with Google's official SEO guidelines, no ethical SEO professional can guarantee specific #1 rankings or overnight indexing. We guarantee 100% white-hat, industry-leading methodology, rigorous technical standards, and data-driven execution designed to maximize compounding organic growth.
                    </div>
                </div>
                <p>
                    We are not liable for ranking fluctuations caused by past black-hat link building, algorithmic penalties incurred prior to our engagement, or concurrent unauthorized third-party changes to your website.
                </p>
            </article>

            <!-- Article 6 -->
            <article class="legal-article-section" id="deliverables">
                <div class="legal-section-header">
                    <span class="legal-section-num">06</span>
                    <h3>Milestone Deliverables &amp; Turnaround Times</h3>
                </div>
                <p>
                    Each package features defined delivery schedules (ranging from 4 to 30 days depending on complexity). Deliverables are provided via:
                </p>
                <ul>
                    <li><i class="fa-solid fa-file-excel"></i> Comprehensive Google Sheets / Excel audit workbooks with prioritized action matrices.</li>
                    <li><i class="fa-solid fa-file-pdf"></i> Actionable PDF executive strategy summaries and implementation blueprints.</li>
                    <li><i class="fa-solid fa-chart-line"></i> Live Google Search Console &amp; Google Analytics 4 performance verification benchmarks.</li>
                </ul>
                <p>
                    Each package includes specified revision rounds. Revision requests must be submitted through your Client Portal within 14 days of deliverable transmission.
                </p>
            </article>

            <!-- Article 7 -->
            <article class="legal-article-section" id="intellectual-property">
                <div class="legal-section-header">
                    <span class="legal-section-num">07</span>
                    <h3>Intellectual Property &amp; Ownership</h3>
                </div>
                <p>
                    <strong>Client Ownership:</strong> Upon full payment, the Client retains 100% intellectual property ownership of all custom audits, on-page content, metadata, and custom copy created specifically for the Client's website.
                </p>
                <p>
                    <strong>Provider IP:</strong> The Provider retains all proprietary rights to internal operating frameworks, proprietary crawler scripts, benchmark databases, and agency analytical methodologies utilized during service execution.
                </p>
            </article>

            <!-- Article 8 -->
            <article class="legal-article-section" id="confidentiality">
                <div class="legal-section-header">
                    <span class="legal-section-num">08</span>
                    <h3>Non-Disclosure &amp; Confidentiality (NDA)</h3>
                </div>
                <p>
                    We treat all client data with the utmost confidentiality. Under this binding agreement:
                </p>
                <ul>
                    <li><i class="fa-solid fa-user-lock"></i> We will never sell, lease, or disclose your website traffic, target keywords, conversion metrics, or financial data to any competitor or third party.</li>
                    <li><i class="fa-solid fa-shield-halved"></i> All server passwords, credentials, and API tokens provided for technical access are encrypted with industry-standard protocols and deleted upon project completion.</li>
                    <li><i class="fa-solid fa-camera"></i> Anonymized performance graphs (e.g. Google Search Console click charts) may only be utilized as portfolio case study proof with proprietary identifying domain names blurred, unless explicit written permission is granted by the Client.</li>
                </ul>
            </article>

            <!-- Article 9 -->
            <article class="legal-article-section" id="liability">
                <div class="legal-section-header">
                    <span class="legal-section-num">09</span>
                    <h3>Limitation of Liability</h3>
                </div>
                <p>
                    To the maximum extent permitted by applicable law, in no event shall <strong>Abdullah Saleh</strong> or his associates be liable for any indirect, incidental, punitive, special, or consequential damages, including loss of profits, business interruption, or loss of digital data resulting from search engine algorithmic changes, web hosting downtime, or client-initiated technical errors.
                </p>
                <p>
                    Our total aggregate liability for any claims arising out of this Agreement shall not exceed the total fees paid by the Client to the Provider for the specific service package giving rise to the claim in the three (3) months preceding the incident.
                </p>
            </article>

            <!-- Article 10 -->
            <article class="legal-article-section" id="cancellation">
                <div class="legal-section-header">
                    <span class="legal-section-num">10</span>
                    <h3>Service Cancellation, Pausing &amp; Refunds</h3>
                </div>
                <p>
                    <strong>Monthly Subscriptions:</strong> You may cancel or pause your monthly SEO retainer at any time with zero cancellation penalties. Written notice or portal cancellation should be submitted at least 5 business days prior to the next billing cycle.
                </p>
                <p>
                    <strong>Refunds:</strong> Full refunds are available if requested within 48 hours of order creation provided technical audit or outreach work has not commenced. For complete terms, please refer to our <a href="<?= url('/refund-policy') ?>" style="color: var(--digi-blue); font-weight: 600;">Refund &amp; Cancellation Policy</a>.
                </p>
            </article>

            <!-- Article 11 -->
            <article class="legal-article-section" id="governing-law">
                <div class="legal-section-header">
                    <span class="legal-section-num">11</span>
                    <h3>Governing Law &amp; Dispute Resolution</h3>
                </div>
                <p>
                    These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with standard international commercial law principles.
                </p>
                <p>
                    In the event of any disagreement, the parties agree to first attempt to resolve the matter amicably through good-faith direct consultation and informal negotiation before initiating formal legal proceedings.
                </p>
            </article>

            <!-- Article 12 -->
            <article class="legal-article-section" id="contact-legal">
                <div class="legal-section-header">
                    <span class="legal-section-num">12</span>
                    <h3>Legal Inquiries &amp; Official Notice</h3>
                </div>
                <p>
                    If you have any questions, clarifications, or formal notices regarding these Terms &amp; Conditions, please reach out through our official channels:
                </p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 14px;">
                    <div>
                        <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Email Contact</div>
                        <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">
                            <a href="mailto:<?= e(setting('contact_email', 'abdullahbd.seo@gmail.com')) ?>" style="color: var(--digi-blue); text-decoration: none;">
                                <i class="fa-solid fa-envelope" style="margin-right: 6px;"></i> <?= e(setting('contact_email', 'abdullahbd.seo@gmail.com')) ?>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Direct Help Desk</div>
                        <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">
                            <a href="<?= url('/contact') ?>" style="color: var(--digi-blue); text-decoration: none;">
                                <i class="fa-solid fa-headset" style="margin-right: 6px;"></i> Official Contact Desk
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    </div>
</section>

<!-- =========================================================================
     4. BOTTOM SUPPORT / LEGAL CONSULTATION CTA
     ========================================================================= -->
<section class="section" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 65px 0; margin-top: 40px;">
    <div class="container" style="text-align: center;">
        <span style="display: inline-block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #60a5fa; background: rgba(96, 165, 250, 0.12); padding: 4px 14px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid rgba(96, 165, 250, 0.2);">
            Transparent Collaboration
        </span>
        <h2 style="font-size: 2.2rem; font-weight: 800; color: #ffffff; margin-bottom: 12px;">Have Specific Legal or Contract Requirements?</h2>
        <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto 28px; line-height: 1.6;">
            We regularly collaborate with enterprise marketing directors, venture-backed startups, and agencies under custom billing and tailored Master Services Agreements.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="<?= url('/contact') ?>" class="btn btn-aqua-solid" style="padding: 12px 28px; font-size: 0.95rem;">
                <i class="fa-solid fa-paper-plane"></i> Contact Legal Desk
            </a>
            <a href="<?= url('/services') ?>" class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.25); padding: 12px 26px; font-size: 0.95rem;">
                Explore SEO Services <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- Script for Smooth Scrolling & Active Table of Contents highlighting -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    var tocLinks = document.querySelectorAll('.legal-toc-link');
    var sections = document.querySelectorAll('.legal-article-section');

    function updateActiveToc() {
        var scrollPos = window.scrollY + 140;
        
        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                tocLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveToc);

    // Smooth scroll on link click
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                var targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetEl.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
</script>
