<?php
// views/public/calculator.php - Interactive Website Cost Calculator (exact ayeuburrahman.work design)
?>

<div class="tool-page-wrapper" style="background: #ffffff; min-height: 100vh; padding-top: 30px; padding-bottom: 80px;">
    <div class="container" style="max-width: 980px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Breadcrumb Pill -->
        <nav aria-label="Breadcrumb" style="margin-bottom: 24px; display: inline-flex;">
            <ol style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 6px; background: #f1f5f9; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 500; color: #64748b; list-style: none; margin: 0;">
                <li style="display: inline-flex; align-items: center; gap: 6px;">
                    <a href="<?= url('/') ?>" style="color: #475569; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-house" style="font-size: 0.78rem;"></i> Home
                    </a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li>
                    <a href="<?= url('/tools') ?>" style="color: #475569; text-decoration: none;">Tools</a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li style="color: #0f172a; font-weight: 600;">Website Cost Calculator</li>
            </ol>
        </nav>

        <!-- Page Introduction Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 14px; line-height: 1.15;">
                Website Cost Calculator
            </h1>
            <p style="font-size: 1.1rem; color: #475569; max-width: 680px; margin: 0 auto; line-height: 1.6;">
                Estimate the investment range for a new website or a redesign, based on the scope you actually need.
            </p>
        </div>

        <!-- Calculator Form Card (Centered) -->
        <div style="max-width: 620px; margin: 0 auto 50px;">
            <div class="tool-main-card">
                <form id="websiteCalcForm" onsubmit="event.preventDefault(); openGateModal();">
                    
                    <div class="tool-form-group">
                        <label class="tool-form-label" for="tier">What do you need?</label>
                        <select id="tier" name="tier" class="tool-form-control">
                            <option value="basic">Basic Website — 5 pages included</option>
                            <option value="growth" selected>Growth Website — 10 pages included</option>
                            <option value="enterprise">Enterprise Website — 20 pages included</option>
                        </select>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="pages">Roughly how many pages?</label>
                        <input id="pages" name="pages" type="number" inputmode="numeric" min="1" max="500" value="10" class="tool-form-control">
                        <p class="tool-field-hint">Pages beyond the included count are charged individually ($40/page).</p>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="ecommerce">Online selling</label>
                        <select id="ecommerce" name="ecommerce" class="tool-form-control">
                            <option value="none">Not required</option>
                            <option value="basic">Basic store (up to 20 products)</option>
                            <option value="advanced">Advanced product system</option>
                            <option value="marketplace">Marketplace / Multi-vendor</option>
                        </select>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="crm">CRM integration</label>
                        <select id="crm" name="crm" class="tool-form-control">
                            <option value="none">Not required</option>
                            <option value="basic">Basic CRM / Webhook lead capture</option>
                            <option value="advanced">Advanced CRM workflow & pipelines</option>
                            <option value="custom">Custom CRM automation (GoHighLevel, HubSpot)</option>
                        </select>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="automation">Automation & AI</label>
                        <select id="automation" name="automation" class="tool-form-control">
                            <option value="none">Not required</option>
                            <option value="basic">Basic automation (Auto-reply & Notifications)</option>
                            <option value="ai_assisted">AI assisted (Smart chatbot & Lead qualification)</option>
                            <option value="advanced_ai">Advanced AI workflow (Custom RAG / GPT-4 Pipeline)</option>
                        </select>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="urgency">How soon do you need it?</label>
                        <select id="urgency" name="urgency" class="tool-form-control">
                            <option value="normal">Normal (3 – 5 weeks)</option>
                            <option value="fast">Fast (2 – 3 weeks)</option>
                            <option value="priority">Priority Sprint (Under 10 days)</option>
                        </select>
                    </div>

                    <button type="submit" class="tool-submit-btn">
                        Calculate My Estimate
                    </button>

                    <p style="font-size: 0.75rem; text-align: center; color: #64748b; margin-top: 14px; margin-bottom: 0;">
                        Every result is an estimate based on the options you select — never a fixed quotation.
                    </p>
                </form>
            </div>

            <!-- Instant Calculation Result Section (matching reference) -->
            <div id="toolResultSection" style="display: none; margin-top: 32px;" class="scroll-target">
                <div class="tool-result-card">
                    <!-- Top Blue Gradient Header -->
                    <div class="tool-result-header">
                        <p class="tool-result-eyebrow">YOUR ESTIMATE</p>
                        <p class="tool-result-amount">
                            <span id="resLow">$850</span> <span style="opacity: 0.7; font-weight: 600;">–</span> <span id="resHigh">$1,450</span>
                        </p>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.9); margin-top: 4px;" id="resBdtText">
                            ≈ 1,02,000 – 1,74,000 BDT
                        </p>
                    </div>

                    <div style="padding: 24px 28px;">
                        <!-- 3-Metrics Grid -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Recommended</div>
                                <div class="stat-val" id="resPkgName">Growth Website</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Estimated Timeline</div>
                                <div class="stat-val" id="resTimeline">3 – 5 weeks</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Extra Pages</div>
                                <div class="stat-val" id="resExtraPages">0</div>
                            </div>
                        </div>

                        <!-- Drivers Breakdown List -->
                        <div style="margin-bottom: 24px;">
                            <h3 style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 12px; letter-spacing: 0.05em;">
                                What drives this estimate
                            </h3>
                            <ul id="driversList" style="list-style: none; padding: 0; margin: 0;">
                                <!-- populated via JS -->
                            </ul>
                        </div>

                        <!-- Action Bar -->
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; display: flex; flex-direction: column; gap: 14px;">
                            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                <a href="<?= url('/contact') ?>" id="discussEstimateBtn" class="tool-submit-btn" style="flex: 1; min-width: 220px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; text-align: center; gap: 8px; padding: 12px 20px; line-height: 1.35;">
                                    <span>Discuss these numbers with me</span> <i class="fa-solid fa-arrow-right"></i>
                                </a>
                                <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', setting('whatsapp_number', '+8801670769816')) ?>?text=Hello%20Abdullah%2C%20I%20used%20your%20Website%20Cost%20Calculator%20and%20would%20like%20to%20discuss%20my%20estimate." target="_blank" rel="noopener" class="tool-wa-btn">
                                    <i class="fa-brands fa-whatsapp" style="color: #25d366; font-size: 1.1rem;"></i> WhatsApp
                                </a>
                            </div>
                            <p style="font-size: 0.78rem; color: #64748b; margin: 0; text-align: center;">
                                No obligation. A short call to sanity-check the assumptions behind this estimate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- "Why Choose Us" Value Box matching reference -->
        <div style="max-width: 760px; margin: 0 auto 40px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; background: linear-gradient(90deg, #eff6ff, #ffffff, #eff6ff); border: 1px solid #bfdbfe; border-radius: 6px; font-weight: 800; font-size: 1.15rem; color: #0f172a; box-shadow: 0 2px 8px rgba(37,99,235,0.06);">
                    <i class="fa-solid fa-circle-check" style="color: #2563eb;"></i> Why Choose Abdullah?
                </span>
            </div>

            <div style="background: #f8faff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 14px;">
                <div class="why-item-box">
                    <div class="why-item-icon"><i class="fa-solid fa-shield-halved"></i></div>
                    <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">One Owner Across the Journey</h3>
                        <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">You get one expert who understands the ad, the landing page, the conversion rate, SEO tracking, and the customer’s next step.</p>
                    </div>
                </div>

                <div class="why-item-box">
                    <div class="why-item-icon"><i class="fa-solid fa-chart-line"></i></div>
                    <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Cost-Efficient by Design</h3>
                        <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">We use the right level of technology for the problem. The aim is to reduce wasted spend, manual work, and expensive agency layers.</p>
                    </div>
                </div>

                <div class="why-item-box">
                    <div class="why-item-icon"><i class="fa-solid fa-rocket"></i></div>
                    <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">World-Class Tools, Practical Delivery</h3>
                        <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">We work with platforms used by growth-focused businesses worldwide: Meta, Google, GA4, GTM, WordPress, PHP, APIs, AI automations, and CRM workflows.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Modal Gate (Almost there — tell us where to send your result) matching reference -->
<div id="gateModal" class="digi-thankyou-modal-overlay">
    <div class="digi-thankyou-modal-card" style="max-width: 480px; text-align: left; padding: 28px;">
        <button type="button" class="thankyou-close-btn" onclick="closeGateModal()" aria-label="Close">&times;</button>
        
        <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">Almost there</h2>
            <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Tell us where to send your result.</p>
        </div>

        <form action="<?= url('/contact/submit') ?>" method="POST" id="leadGateForm" onsubmit="handleGateSubmit(event)">
            <?= csrf_field() ?>
            <input type="hidden" name="calculated_specs" id="hiddenGateSpecs" value="">
            
            <div class="tool-form-group" style="margin-bottom: 12px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateName">Name <span style="color: #ef4444;">*</span></label>
                <input type="text" id="gateName" name="name" class="tool-form-control" placeholder="Your Full Name" required>
            </div>

            <div class="tool-form-group" style="margin-bottom: 12px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateEmail">Business Email <span style="color: #ef4444;">*</span></label>
                <input type="email" id="gateEmail" name="email" class="tool-form-control" placeholder="you@company.com" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                <div class="tool-form-group" style="margin-bottom: 0;">
                    <label class="tool-form-label" style="font-size: 0.82rem;" for="gateCountry">Country <span style="color: #ef4444;">*</span></label>
                    <select id="gateCountry" name="country" class="tool-form-control" required>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="BD" selected>Bangladesh</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="DE">Germany</option>
                        <option value="SG">Singapore</option>
                        <option value="OTHER">Other Country</option>
                    </select>
                </div>
                <div class="tool-form-group" style="margin-bottom: 0;">
                    <label class="tool-form-label" style="font-size: 0.82rem;" for="gateCity">City <span style="color: #94a3b8; font-weight: normal;">(Optional)</span></label>
                    <input type="text" id="gateCity" name="city" class="tool-form-control" placeholder="New York / Dhaka">
                </div>
            </div>

            <div class="tool-form-group" style="margin-bottom: 16px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateWhatsapp">WhatsApp <span style="color: #94a3b8; font-weight: normal;">(Optional)</span></label>
                <input type="tel" id="gateWhatsapp" name="phone" class="tool-form-control" placeholder="+880 1670-769816">
            </div>

            <button type="submit" class="tool-submit-btn">
                Calculate My Estimate
            </button>

            <p style="font-size: 0.72rem; text-align: center; color: #64748b; margin-top: 10px; margin-bottom: 0;">
                Your result appears immediately on this page.
            </p>
        </form>
    </div>
</div>

<style>
.tool-main-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 28px 30px;
    box-shadow: 0 4px 20px rgba(0, 89, 181, 0.04);
}

.tool-form-group {
    margin-bottom: 20px;
}
.tool-form-label {
    display: block;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
}
.tool-form-control {
    width: 100%;
    border-radius: 6px;
    background: #f0f4fe;
    border: 1px solid #dbeafe;
    padding: 11px 14px;
    font-size: 0.92rem;
    color: #0f172a;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
}
.tool-form-control:focus {
    background: #ffffff;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
.tool-field-hint {
    margin: 6px 0 0;
    font-size: 0.74rem;
    color: #64748b;
}

.tool-submit-btn {
    width: 100%;
    min-height: 44px;
    border-radius: 6px;
    background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%);
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.2);
    transition: all 0.2s ease;
}
.tool-submit-btn:hover {
    background: linear-gradient(90deg, #1e40af 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}

.tool-wa-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 18px;
    border-radius: 6px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}
.tool-wa-btn:hover {
    background: #dcfce7;
}

.tool-result-card {
    background: #ffffff;
    border: 1px solid #dbeafe;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.06);
}
.tool-result-header {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
    padding: 22px 24px;
    color: #ffffff;
}
.tool-result-eyebrow {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 6px;
}
.tool-result-amount {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
}

.tool-stat-pill {
    background: #f0f4fe;
    border: 1px solid #dbeafe;
    border-radius: 6px;
    padding: 10px 12px;
    text-align: center;
}
.stat-lbl {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 2px;
}
.stat-val {
    font-size: 0.95rem;
    font-weight: 800;
    color: #0f172a;
}

.driver-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.88rem;
    color: #334155;
}
.driver-item:last-child {
    border-bottom: none;
}
.driver-item .val {
    font-weight: 700;
    color: #0f172a;
}
</style>

<script>
let currentCalculation = null;

function computeWebsiteEstimate() {
    const tier = document.getElementById('tier').value;
    const pages = parseInt(document.getElementById('pages').value, 10) || 5;
    const ecommerce = document.getElementById('ecommerce').value;
    const crm = document.getElementById('crm').value;
    const automation = document.getElementById('automation').value;
    const urgency = document.getElementById('urgency').value;

    let baseLow = 350;
    let baseHigh = 600;
    let includedPages = 5;
    let pkgTitle = 'Basic Website';
    let timeline = '2 – 3 weeks';

    if (tier === 'growth') {
        baseLow = 750;
        baseHigh = 1200;
        includedPages = 10;
        pkgTitle = 'Growth Website';
        timeline = '3 – 5 weeks';
    } else if (tier === 'enterprise') {
        baseLow = 1500;
        baseHigh = 2800;
        includedPages = 20;
        pkgTitle = 'Enterprise Website';
        timeline = '5 – 8 weeks';
    }

    const extraPagesCount = Math.max(0, pages - includedPages);
    const extraPagesLow = extraPagesCount * 35;
    const extraPagesHigh = extraPagesCount * 50;

    let ecomLow = 0, ecomHigh = 0, ecomLabel = 'Not required';
    if (ecommerce === 'basic') { ecomLow = 200; ecomHigh = 350; ecomLabel = 'Basic Store (up to 20 products)'; }
    else if (ecommerce === 'advanced') { ecomLow = 450; ecomHigh = 800; ecomLabel = 'Advanced Product System'; }
    else if (ecommerce === 'marketplace') { ecomLow = 900; ecomHigh = 1600; ecomLabel = 'Marketplace Platform'; }

    let crmLow = 0, crmHigh = 0, crmLabel = 'Not required';
    if (crm === 'basic') { crmLow = 100; crmHigh = 180; crmLabel = 'Basic CRM Lead Capture'; }
    else if (crm === 'advanced') { crmLow = 250; crmHigh = 450; crmLabel = 'Advanced CRM Pipelines'; }
    else if (crm === 'custom') { crmLow = 500; crmHigh = 900; crmLabel = 'Custom CRM Automation'; }

    let autoLow = 0, autoHigh = 0, autoLabel = 'Not required';
    if (automation === 'basic') { autoLow = 80; autoHigh = 150; autoLabel = 'Basic Notifications'; }
    else if (automation === 'ai_assisted') { autoLow = 220; autoHigh = 400; autoLabel = 'AI Assistant & Qualification'; }
    else if (automation === 'advanced_ai') { autoLow = 600; autoHigh = 1100; autoLabel = 'Advanced AI Automation Workflow'; }

    let urgencyMult = 1.0;
    let urgencyLabel = 'Normal';
    if (urgency === 'fast') { urgencyMult = 1.15; urgencyLabel = 'Fast Turnaround (+15%)'; }
    else if (urgency === 'priority') { urgencyMult = 1.30; urgencyLabel = 'Priority Sprint (+30%)'; }

    const subtotalLow = baseLow + extraPagesLow + ecomLow + crmLow + autoLow;
    const subtotalHigh = baseHigh + extraPagesHigh + ecomHigh + crmHigh + autoHigh;

    const totalLow = Math.round(subtotalLow * urgencyMult);
    const totalHigh = Math.round(subtotalHigh * urgencyMult);

    const bdtLow = (totalLow * 120).toLocaleString('en-US');
    const bdtHigh = (totalHigh * 120).toLocaleString('en-US');

    const drivers = [
        { label: `Base Website (${pkgTitle})`, amount: `$${baseLow} – $${baseHigh}` },
        { label: `Extra Pages (${extraPagesCount} beyond ${includedPages})`, amount: extraPagesCount > 0 ? `$${extraPagesLow} – $${extraPagesHigh}` : '$0' },
        { label: `Online Selling (${ecomLabel})`, amount: ecomLow > 0 ? `$${ecomLow} – $${ecomHigh}` : '$0' },
        { label: `CRM Integration (${crmLabel})`, amount: crmLow > 0 ? `$${crmLow} – $${crmHigh}` : '$0' },
        { label: `Automation (${autoLabel})`, amount: autoLow > 0 ? `$${autoLow} – $${autoHigh}` : '$0' },
        { label: `Delivery Speed (${urgencyLabel})`, amount: urgencyMult > 1.0 ? `+${Math.round((urgencyMult-1)*100)}%` : 'Standard' }
    ];

    currentCalculation = {
        totalLow, totalHigh, bdtLow, bdtHigh, pkgTitle, timeline, extraPagesCount, drivers
    };

    return currentCalculation;
}

function openGateModal() {
    computeWebsiteEstimate();
    const modal = document.getElementById('gateModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGateModal() {
    const modal = document.getElementById('gateModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderResults() {
    if (!currentCalculation) computeWebsiteEstimate();
    const c = currentCalculation;

    document.getElementById('resLow').textContent = '$' + c.totalLow.toLocaleString('en-US');
    document.getElementById('resHigh').textContent = '$' + c.totalHigh.toLocaleString('en-US');
    document.getElementById('resBdtText').textContent = `≈ ${c.bdtLow} – ${c.bdtHigh} BDT`;

    document.getElementById('resPkgName').textContent = c.pkgTitle;
    document.getElementById('resTimeline').textContent = c.timeline;
    document.getElementById('resExtraPages').textContent = c.extraPagesCount;

    const list = document.getElementById('driversList');
    list.innerHTML = '';
    c.drivers.forEach(d => {
        const li = document.createElement('li');
        li.className = 'driver-item';
        li.innerHTML = `<span>${d.label}</span><span class="val">${d.amount}</span>`;
        list.appendChild(li);
    });

    const resultSection = document.getElementById('toolResultSection');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleGateSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Attach specs
    const c = currentCalculation || computeWebsiteEstimate();
    const specs = `WEBSITE COST CALCULATOR ESTIMATE: $${c.totalLow} - $${c.totalHigh} USD (${c.pkgTitle}, ${document.getElementById('pages').value} Pages, Ecom: ${document.getElementById('ecommerce').value}, CRM: ${document.getElementById('crm').value}, AI: ${document.getElementById('automation').value})`;
    document.getElementById('hiddenGateSpecs').value = specs;

    closeGateModal();
    renderResults();

    // Submit asynchronously in background to contact route
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).catch(() => {});
}
</script>
