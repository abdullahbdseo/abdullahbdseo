<?php
// views/public/contact.php - Contact Page matching exact reference layout
$contactEmail = setting('contact_email', 'abdullahbd.seo@gmail.com');
$businessHours = setting('business_hours', 'Global 12-Hour Service');
$whatsappNumber = preg_replace('/[^0-9]/', '', setting('whatsapp_number', '+8801670769816'));
?>

<style>
/* ==========================================================================
   CONTACT PAGE STYLES (Matching Reference Design with Reduced Rounded Shapes)
   ========================================================================== */
.contact-page-section {
    background-color: #f8fafc;
    padding: 50px 0 80px;
    min-height: calc(100vh - 200px);
}

.contact-layout-grid {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 32px;
    align-items: start;
    max-width: 1140px;
    margin: 0 auto;
}

/* LEFT COLUMN: Contact Details & Assurance Cards */
.contact-left-column {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

/* Contact Details Card */
.contact-details-box {
    background: linear-gradient(180deg, #edf6ff 0%, #f4f9ff 100%);
    border: 1px solid #dbeafe;
    border-radius: 6px;
    padding: 26px 22px;
    box-shadow: 0 4px 20px -2px rgba(2, 132, 199, 0.05);
}

.contact-details-heading {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 18px 0;
    font-family: var(--font-heading, 'Outfit', sans-serif);
    letter-spacing: -0.01em;
}

.contact-meta-group {
    margin-bottom: 16px;
}

.contact-meta-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.06em;
    margin-bottom: 4px;
    display: block;
}

.contact-meta-email {
    font-size: 1.08rem;
    font-weight: 700;
    color: #0062d2;
    text-decoration: none;
    transition: color 0.2s ease, text-decoration 0.2s ease;
    display: inline-block;
    word-break: break-all;
}

.contact-meta-email:hover {
    color: #0050ab;
    text-decoration: underline;
}

.contact-meta-hours {
    font-size: 1.02rem;
    font-weight: 600;
    color: #1e293b;
    display: inline-block;
}

/* WhatsApp Embedded Card */
.contact-wa-embed {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    margin-top: 18px;
}

.contact-wa-embed-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.contact-wa-badge {
    width: 34px;
    height: 34px;
    border-radius: 4px;
    background: #e8faf0;
    border: 1px solid #d1fae5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.contact-wa-embed-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: #1e293b;
    white-space: nowrap;
}

.contact-wa-embed-btn {
    background: #00b365;
    color: #ffffff !important;
    padding: 8px 14px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.85rem;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 8px rgba(0, 179, 101, 0.22);
    transition: background 0.2s ease, transform 0.2s ease;
    white-space: nowrap;
    font-family: var(--font-body, inherit);
}

.contact-wa-embed-btn:hover {
    background: #009c58;
    transform: translateY(-1px);
    color: #ffffff !important;
}

/* Guarantee / Value Proposition Cards */
.contact-perk-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.contact-perk-card:hover {
    transform: translateY(-2px);
    border-color: #cbd5e1;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
}

.contact-perk-icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    background: #eff6ff;
    border: 1px solid #dbeafe;
    color: #0062d2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
}

.contact-perk-info {
    flex: 1;
}

.contact-perk-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 2px 0;
    font-family: var(--font-heading, 'Outfit', sans-serif);
}

.contact-perk-desc {
    font-size: 0.83rem;
    color: #64748b;
    margin: 0;
    line-height: 1.4;
}

/* RIGHT COLUMN: Contact Form */
.contact-form-wrapper {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 32px 28px 24px;
    box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);
}

.contact-form-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    text-align: center;
    margin: 0 0 6px 0;
    font-family: var(--font-heading, 'Outfit', sans-serif);
    letter-spacing: -0.015em;
}

.contact-form-subtitle {
    font-size: 0.92rem;
    color: #64748b;
    text-align: center;
    margin: 0 auto 24px;
    line-height: 1.5;
    max-width: 440px;
}

.contact-form-group {
    margin-bottom: 16px;
}

.contact-label {
    display: block;
    font-size: 0.86rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 5px;
}

.contact-label .req-star {
    color: #ef4444;
    margin-left: 2px;
}

.contact-label .opt-text {
    color: #94a3b8;
    font-weight: 400;
    font-size: 0.82rem;
}

.contact-input-control {
    width: 100%;
    padding: 11px 13px;
    font-size: 0.95rem;
    color: #0f172a;
    background-color: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    font-family: var(--font-body, inherit);
    box-sizing: border-box;
}

.contact-input-control::placeholder {
    color: #94a3b8;
    font-weight: 400;
}

.contact-input-control:focus {
    outline: none;
    border-color: #0062d2;
    box-shadow: 0 0 0 3px rgba(0, 98, 210, 0.12);
}

textarea.contact-input-control {
    min-height: 120px;
    resize: vertical;
    line-height: 1.5;
}

/* Submit Button */
.contact-btn-submit {
    width: 100%;
    padding: 12px 20px;
    background: #0062d2;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 14px rgba(0, 98, 210, 0.25);
    margin-top: 4px;
    margin-bottom: 12px;
    font-family: var(--font-body, inherit);
}

.contact-btn-submit:hover {
    background: #0050ab;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 98, 210, 0.35);
}

.contact-btn-submit:active {
    transform: translateY(0);
}

/* Badges / Guarantees Under Submit */
.contact-guarantee-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-bottom: 12px;
}

.contact-guarantee-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.84rem;
    font-weight: 600;
    color: #334155;
}

.contact-guarantee-badge i {
    color: #0062d2;
    font-size: 0.88rem;
}

/* Privacy Note */
.contact-privacy-disclaimer {
    font-size: 0.8rem;
    color: #64748b;
    text-align: center;
    margin: 0;
}

.contact-privacy-disclaimer a {
    color: #1e293b;
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s ease;
}

.contact-privacy-disclaimer a:hover {
    color: #0062d2;
}

/* Flash Messages */
.contact-alert {
    padding: 12px 16px;
    border-radius: 4px;
    margin-bottom: 18px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.contact-alert-success {
    background-color: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.contact-alert-error {
    background-color: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

/* Responsive adjustments */
@media (max-width: 991px) {
    .contact-layout-grid {
        grid-template-columns: 1fr;
        gap: 28px;
    }
    
    .contact-page-section {
        padding: 35px 0 60px;
    }

    .contact-form-wrapper {
        padding: 24px 18px 20px;
    }

    .contact-details-box {
        padding: 22px 18px;
    }
}

@media (max-width: 576px) {
    .contact-wa-embed {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
        gap: 10px;
    }

    .contact-wa-embed-left {
        justify-content: center;
    }

    .contact-wa-embed-btn {
        justify-content: center;
        width: 100%;
    }

    .contact-guarantee-row {
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }

    .contact-form-title {
        font-size: 1.45rem;
    }
}
</style>

<section class="contact-page-section">
    <div class="container">
        <div class="contact-layout-grid">
            
            <!-- =========================================================
                 LEFT COLUMN: Contact Details & 3 Assurance Cards
                 ========================================================= -->
            <div class="contact-left-column">
                
                <!-- Contact Details Box -->
                <div class="contact-details-box">
                    <h2 class="contact-details-heading">Contact Details</h2>

                    <div class="contact-meta-group">
                        <span class="contact-meta-label">EMAIL</span>
                        <a href="mailto:<?= e($contactEmail) ?>" class="contact-meta-email">
                            <?= e($contactEmail) ?>
                        </a>
                    </div>

                    <div class="contact-meta-group" style="margin-bottom: 18px;">
                        <span class="contact-meta-label">BUSINESS HOURS</span>
                        <div class="contact-meta-hours">
                            <?= e($businessHours) ?>
                        </div>
                    </div>

                    <!-- WhatsApp Embedded Card -->
                    <div class="contact-wa-embed">
                        <div class="contact-wa-embed-left">
                            <div class="contact-wa-badge">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3C7.02944 3 3 6.80558 3 11.5C3 13.3444 3.63588 15.0538 4.72147 16.4442L3.65685 20.1716C3.49397 20.7417 4.02058 21.2464 4.58284 21.0589L8.71887 19.6802C9.74233 20.1384 10.849 20.3889 12 20.3889C16.9706 20.3889 21 16.5833 21 11.8889C21 7.19442 16.9706 3 12 3Z" fill="#10B981" />
                                    <path d="M12 7.5V12M12 15V15.5" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <span class="contact-wa-embed-title">Prefer WhatsApp?</span>
                        </div>
                        <a href="https://wa.me/<?= e($whatsappNumber) ?>?text=Hello%20Abdullah%2C%20I%20would%20like%20to%20discuss%20an%20SEO%20project." target="_blank" rel="noopener noreferrer" class="contact-wa-embed-btn">
                            <i class="fa-brands fa-whatsapp" style="font-size: 1rem;"></i>
                            <span>Chat on WhatsApp</span>
                            <span style="font-size: 0.9rem; line-height: 1;">&rarr;</span>
                        </a>
                    </div>
                </div>

                <!-- 3 Assurance Cards -->
                <!-- 1. Direct Response -->
                <div class="contact-perk-card">
                    <div class="contact-perk-icon-wrap">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <div class="contact-perk-info">
                        <h3 class="contact-perk-title">Direct Response</h3>
                        <p class="contact-perk-desc">A real reply from a real person &mdash; no automated queue.</p>
                    </div>
                </div>

                <!-- 2. Free Consultation -->
                <div class="contact-perk-card">
                    <div class="contact-perk-icon-wrap">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div class="contact-perk-info">
                        <h3 class="contact-perk-title">Free Consultation</h3>
                        <p class="contact-perk-desc">Your first conversation with us costs nothing.</p>
                    </div>
                </div>

                <!-- 3. Clear Next Steps -->
                <div class="contact-perk-card">
                    <div class="contact-perk-icon-wrap">
                        <i class="fa-solid fa-arrow-trend-up"></i>
                    </div>
                    <div class="contact-perk-info">
                        <h3 class="contact-perk-title">Clear Next Steps</h3>
                        <p class="contact-perk-desc">You'll know exactly what happens after you reach out.</p>
                    </div>
                </div>

            </div>

            <!-- =========================================================
                 RIGHT COLUMN: Contact Form Card
                 ========================================================= -->
            <div class="contact-right-column">
                <div class="contact-form-wrapper">
                    
                    <h1 class="contact-form-title">Ready to Start Your Project?</h1>
                    <p class="contact-form-subtitle">Tell me what you need help with. I usually reply within 24 hours.</p>

                    <?php if (flash('success')): ?>
                        <div class="contact-alert contact-alert-success">
                            <i class="fa-solid fa-circle-check"></i>
                            <span><?= e(flash('success')) ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if (flash('error')): ?>
                        <div class="contact-alert contact-alert-error">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span><?= e(flash('error')) ?></span>
                        </div>
                    <?php endif; ?>

                    <form action="<?= url('/contact/submit') ?>" method="POST" id="contactInquiryForm">
                        <?= csrf_field() ?>

                        <!-- Full Name -->
                        <div class="contact-form-group">
                            <label for="contact_name" class="contact-label">
                                Full Name <span class="req-star">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="contact_name" 
                                name="name" 
                                class="contact-input-control" 
                                placeholder="Jane Doe" 
                                required
                                autocomplete="name"
                            >
                        </div>

                        <!-- Email Address -->
                        <div class="contact-form-group">
                            <label for="contact_email" class="contact-label">
                                Email Address <span class="req-star">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="contact_email" 
                                name="email" 
                                class="contact-input-control" 
                                placeholder="you@company.com" 
                                required
                                autocomplete="email"
                            >
                        </div>

                        <!-- WhatsApp Number (Optional) -->
                        <div class="contact-form-group">
                            <label for="contact_phone" class="contact-label">
                                WhatsApp Number <span class="opt-text">(Optional)</span>
                            </label>
                            <input 
                                type="tel" 
                                id="contact_phone" 
                                name="phone" 
                                class="contact-input-control" 
                                placeholder="+880 1XXX-XXXXXX"
                                autocomplete="tel"
                            >
                        </div>

                        <!-- Message -->
                        <div class="contact-form-group">
                            <label for="contact_message" class="contact-label">
                                Message <span class="req-star">*</span>
                            </label>
                            <textarea 
                                id="contact_message" 
                                name="message" 
                                class="contact-input-control" 
                                rows="4" 
                                placeholder="Tell me about your website, automation, or marketing project..." 
                                required
                            ></textarea>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="contact-btn-submit" id="contactSubmitBtn">
                            Submit your response &rarr;
                        </button>

                        <!-- Trust Badges Under Button -->
                        <div class="contact-guarantee-row">
                            <span class="contact-guarantee-badge">
                                <i class="fa-solid fa-circle-check"></i> Direct Response
                            </span>
                            <span class="contact-guarantee-badge">
                                <i class="fa-solid fa-circle-check"></i> Free Initial Consultation
                            </span>
                        </div>

                        <!-- Privacy Policy Disclaimer -->
                        <p class="contact-privacy-disclaimer">
                            By submitting, you agree to our <a href="<?= url('/privacy-policy') ?>">Privacy Policy</a>.
                        </p>
                    </form>

                </div>
            </div>

        </div>
    </div>
</section>
