<?php
// views/public/tools/facebook_ads_calculator.php - Interactive Facebook & Instagram Ads ROI Calculator (exact ayeuburrahman.work design)
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
                <li style="color: #0f172a; font-weight: 600;">Facebook Ads ROI Calculator</li>
            </ol>
        </nav>

        <!-- Page Introduction Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 14px; line-height: 1.15;">
                Facebook Ads ROI Calculator
            </h1>
            <p style="font-size: 1.1rem; color: #475569; max-width: 680px; margin: 0 auto; line-height: 1.6;">
                Model the return on a Facebook and Instagram Ads budget using your own conversion rates and customer value.
            </p>
        </div>

        <!-- Calculator Form Card (Centered) -->
        <div style="max-width: 620px; margin: 0 auto 50px;">
            <div class="tool-main-card">
                <form id="fbAdsForm" onsubmit="event.preventDefault(); openGateModal();">
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="tool-form-group">
                            <label class="tool-form-label" for="monthly_budget">
                                Monthly ad budget <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(USD)</span>
                            </label>
                            <input id="monthly_budget" name="monthly_budget" type="number" inputmode="decimal" min="0" step="1" value="2000" class="tool-form-control">
                        </div>

                        <div class="tool-form-group">
                            <label class="tool-form-label" for="average_cpc">
                                Cost per link click <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(USD)</span>
                            </label>
                            <input id="average_cpc" name="average_cpc" type="number" inputmode="decimal" min="0" step="0.01" value="1.80" class="tool-form-control">
                        </div>
                    </div>
                    <p class="tool-field-hint" style="margin-top: -12px; margin-bottom: 18px;">
                        Meta reports cost per link click alongside CPM. Use your own account figure where you have one.
                    </p>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="tool-form-group">
                            <label class="tool-form-label" for="landing_conversion_rate">
                                Landing page conversion <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(%)</span>
                            </label>
                            <input id="landing_conversion_rate" name="landing_conversion_rate" type="number" inputmode="decimal" min="0" step="0.1" value="5" class="tool-form-control">
                            <p class="tool-field-hint">Of the people who click, how many become an enquiry.</p>
                        </div>

                        <div class="tool-form-group">
                            <label class="tool-form-label" for="lead_to_customer_rate">
                                Lead to customer rate <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(%)</span>
                            </label>
                            <input id="lead_to_customer_rate" name="lead_to_customer_rate" type="number" inputmode="decimal" min="0" step="0.1" value="20" class="tool-form-control">
                            <p class="tool-field-hint">Of the enquiries you receive, how many you close.</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
                        <div class="tool-form-group">
                            <label class="tool-form-label" for="average_customer_value">
                                Average customer value <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(USD)</span>
                            </label>
                            <input id="average_customer_value" name="average_customer_value" type="number" inputmode="decimal" min="0" step="1" value="1500" class="tool-form-control">
                        </div>

                        <div class="tool-form-group">
                            <label class="tool-form-label" for="profit_margin">
                                Gross profit margin <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(%)</span>
                            </label>
                            <input id="profit_margin" name="profit_margin" type="number" inputmode="decimal" min="0" step="0.1" value="40" class="tool-form-control">
                        </div>
                    </div>

                    <button type="submit" class="tool-submit-btn" style="margin-top: 10px;">
                        Calculate My ROI
                    </button>

                    <p style="font-size: 0.75rem; text-align: center; color: #64748b; margin-top: 14px; margin-bottom: 0;">
                        Modelled from the figures you enter. Not a forecast, and not a guarantee of results.
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
                            <span id="resRoas">4.17x</span> <span style="font-size: 1.1rem; font-weight: 600; opacity: 0.85;">ROAS</span>
                        </p>
                        <p style="font-size: 0.95rem; color: rgba(255,255,255,0.92); margin-top: 4px;">
                            Profit after ad spend: <strong id="resProfitAfterSpend">$4,667</strong>
                        </p>
                    </div>

                    <div style="padding: 24px 28px;">
                        <!-- 6-Metrics Grid -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Estimated Clicks</div>
                                <div class="stat-val" id="resClicks">1,111</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Leads</div>
                                <div class="stat-val" id="resLeads">56</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Customers</div>
                                <div class="stat-val" id="resCustomers">11</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Revenue</div>
                                <div class="stat-val" id="resRevenue">$16,500</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Gross Profit</div>
                                <div class="stat-val" id="resGrossProfit">$6,600</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Cost Per Sale (CPA)</div>
                                <div class="stat-val" id="resCpa">$182</div>
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
                                <a href="<?= url('/contact') ?>" class="tool-submit-btn" style="flex: 1; min-width: 220px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; text-align: center; gap: 8px; padding: 12px 20px; line-height: 1.35;">
                                    <span>Discuss these numbers with me</span> <i class="fa-solid fa-arrow-right"></i>
                                </a>
                                <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', setting('whatsapp_number', '+8801670769816')) ?>?text=Hello%20Abdullah%2C%20I%20used%20your%20Facebook%20Ads%20ROI%20Calculator%20and%20would%20like%20to%20discuss%20my%20numbers." target="_blank" rel="noopener" class="tool-wa-btn">
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

<!-- Modal Gate -->
<div id="gateModal" class="digi-thankyou-modal-overlay">
    <div class="digi-thankyou-modal-card" style="max-width: 480px; text-align: left; padding: 28px;">
        <button type="button" class="thankyou-close-btn" onclick="closeGateModal()" aria-label="Close">&times;</button>
        
        <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">Almost there</h2>
            <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Tell us where to send your result.</p>
        </div>

        <form action="<?= url('/contact/submit') ?>" method="POST" id="fbLeadGateForm" onsubmit="handleGateSubmit(event)">
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
                    <input type="text" id="gateCity" name="city" class="tool-form-control" placeholder="New York / Dubai">
                </div>
            </div>

            <div class="tool-form-group" style="margin-bottom: 16px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateWhatsapp">WhatsApp <span style="color: #94a3b8; font-weight: normal;">(Optional)</span></label>
                <input type="tel" id="gateWhatsapp" name="phone" class="tool-form-control" placeholder="+880 1XXXXXXXXX">
            </div>

            <button type="submit" class="tool-submit-btn">
                Calculate My ROI
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
    font-size: 1.1rem;
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
let currentFbCalc = null;

function computeFbEstimate() {
    const budget = parseFloat(document.getElementById('monthly_budget').value) || 0;
    const cpc = parseFloat(document.getElementById('average_cpc').value) || 0.01;
    const convRate = parseFloat(document.getElementById('landing_conversion_rate').value) || 0;
    const closeRate = parseFloat(document.getElementById('lead_to_customer_rate').value) || 0;
    const aov = parseFloat(document.getElementById('average_customer_value').value) || 0;
    const margin = parseFloat(document.getElementById('profit_margin').value) || 0;

    const clicks = Math.round(budget / cpc);
    const leads = Math.round(clicks * (convRate / 100));
    const customers = Math.round(leads * (closeRate / 100));
    const revenue = Math.round(customers * aov);
    const grossProfit = Math.round(revenue * (margin / 100));
    const profitAfterSpend = Math.round(grossProfit - budget);
    const roas = budget > 0 ? (revenue / budget) : 0;
    const cpa = customers > 0 ? Math.round(budget / customers) : 0;

    const drivers = [
        { label: 'Monthly Meta Ad Spend', amount: '$' + budget.toLocaleString('en-US') },
        { label: 'Cost Per Link Click', amount: '$' + cpc.toFixed(2) },
        { label: 'Funnel Conversion Rate', amount: convRate.toFixed(1) + '%' },
        { label: 'Lead-to-Customer Close Rate', amount: closeRate.toFixed(1) + '%' },
        { label: 'Average Customer Value', amount: '$' + aov.toLocaleString('en-US') },
        { label: 'Gross Profit Margin', amount: margin.toFixed(1) + '%' }
    ];

    currentFbCalc = {
        budget, cpc, clicks, leads, customers, revenue, grossProfit, profitAfterSpend, roas, cpa, drivers
    };

    return currentFbCalc;
}

function openGateModal() {
    computeFbEstimate();
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

function renderFbResults() {
    const c = currentFbCalc || computeFbEstimate();

    document.getElementById('resRoas').textContent = c.roas.toFixed(2) + 'x';
    document.getElementById('resProfitAfterSpend').textContent = (c.profitAfterSpend >= 0 ? '+' : '-') + '$' + Math.abs(c.profitAfterSpend).toLocaleString('en-US');

    document.getElementById('resClicks').textContent = c.clicks.toLocaleString('en-US');
    document.getElementById('resLeads').textContent = c.leads.toLocaleString('en-US');
    document.getElementById('resCustomers').textContent = c.customers.toLocaleString('en-US');
    document.getElementById('resRevenue').textContent = '$' + c.revenue.toLocaleString('en-US');
    document.getElementById('resGrossProfit').textContent = '$' + c.grossProfit.toLocaleString('en-US');
    document.getElementById('resCpa').textContent = '$' + c.cpa.toLocaleString('en-US');

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
    
    const c = currentFbCalc || computeFbEstimate();
    const specs = `FACEBOOK ADS CALCULATOR ESTIMATE: ${c.roas.toFixed(2)}x ROAS, Budget: $${c.budget}, Clicks: ${c.clicks}, Leads: ${c.leads}, Customers: ${c.customers}, Revenue: $${c.revenue}, Profit: $${c.profitAfterSpend}`;
    document.getElementById('hiddenGateSpecs').value = specs;

    closeGateModal();
    renderFbResults();

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).catch(() => {});
}
</script>
