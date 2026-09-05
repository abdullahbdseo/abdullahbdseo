<?php
// views/public/tools/ai_savings_calculator.php - Interactive AI Automation Savings Calculator (exact ayeuburrahman.work design)
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
                <li style="color: #0f172a; font-weight: 600;">AI Automation Savings Calculator</li>
            </ol>
        </nav>

        <!-- Page Introduction Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 14px; line-height: 1.15;">
                AI Automation Savings Calculator
            </h1>
            <p style="font-size: 1.1rem; color: #475569; max-width: 680px; margin: 0 auto; line-height: 1.6;">
                See what automating a recurring manual task is worth: hours returned each month, the money that time represents, and how long the build takes to pay for itself.
            </p>
        </div>

        <!-- Calculator Form Card (Centered) -->
        <div style="max-width: 620px; margin: 0 auto 50px;">
            <div class="tool-main-card">
                <form id="aiSavingsForm" onsubmit="event.preventDefault(); openGateModal();">
                    
                    <p style="font-size: 0.82rem; color: #64748b; margin-top: 0; margin-bottom: 18px; line-height: 1.5;">
                        Enter how many people do this task and how long it takes each of them. The calculator works out the team total for you.
                    </p>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="tool-form-group">
                            <label class="tool-form-label" for="people_count">
                                Number of people <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(doing task)</span>
                            </label>
                            <input id="people_count" name="people_count" type="number" inputmode="decimal" min="1" step="1" value="4" class="tool-form-control">
                        </div>

                        <div class="tool-form-group">
                            <label class="tool-form-label" for="hours_per_week">
                                Hours each person <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(hrs/week)</span>
                            </label>
                            <input id="hours_per_week" name="hours_per_week" type="number" inputmode="decimal" min="0.5" step="0.5" value="5" class="tool-form-control">
                        </div>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="hourly_cost">
                            Hourly cost of that time <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(USD)</span>
                        </label>
                        <input id="hourly_cost" name="hourly_cost" type="number" inputmode="decimal" min="1" step="1" value="25" class="tool-form-control">
                        <p class="tool-field-hint">What the hour costs the business — salary plus overheads, or contractor rate.</p>
                    </div>

                    <div class="tool-form-group">
                        <label class="tool-form-label" for="automatable_percent">
                            Realistically automatable <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(%)</span>
                        </label>
                        <input id="automatable_percent" name="automatable_percent" type="number" inputmode="decimal" min="10" max="100" step="1" value="60" class="tool-form-control">
                        <p class="tool-field-hint">Most processes keep a human step for exceptions. A figure below 100% is typical.</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
                        <div class="tool-form-group">
                            <label class="tool-form-label" for="setup_investment">
                                One-time setup <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(USD)</span>
                            </label>
                            <input id="setup_investment" name="setup_investment" type="number" inputmode="decimal" min="0" step="50" value="2500" class="tool-form-control">
                        </div>

                        <div class="tool-form-group">
                            <label class="tool-form-label" for="monthly_running_cost">
                                Monthly running cost <span style="font-size: 0.75rem; color: #64748b; font-weight: normal;">(USD)</span>
                            </label>
                            <input id="monthly_running_cost" name="monthly_running_cost" type="number" inputmode="decimal" min="0" step="10" value="100" class="tool-form-control">
                        </div>
                    </div>

                    <button type="submit" class="tool-submit-btn" style="margin-top: 10px;">
                        Calculate My Savings
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
                            <span id="resNetAnnual">$14,400</span> <span style="font-size: 1.1rem; font-weight: 600; opacity: 0.85;">/ Year Net Savings</span>
                        </p>
                        <p style="font-size: 0.95rem; color: rgba(255,255,255,0.92); margin-top: 4px;">
                            Break-even payback in <strong id="resPayback">2.1 months</strong>
                        </p>
                    </div>

                    <div style="padding: 24px 28px;">
                        <!-- 6-Metrics Grid -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Monthly Hours Saved</div>
                                <div class="stat-val" id="resHoursSaved">52 hrs</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Monthly Gross Savings</div>
                                <div class="stat-val" id="resMonthlyGross">$1,300</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Monthly Net Profit</div>
                                <div class="stat-val" id="resMonthlyNet">$1,200</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Annual Labor Freed</div>
                                <div class="stat-val" id="resAnnualLabor">$15,600</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">3-Year Net ROI</div>
                                <div class="stat-val" id="resThreeYearRoi">540%</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Payback Period</div>
                                <div class="stat-val" id="resPaybackPill">2.1 Mo</div>
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
                                <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', setting('whatsapp_number', '+8801670769816')) ?>?text=Hello%20Abdullah%2C%20I%20used%20your%20AI%20Automation%20Savings%20Calculator%20and%20would%20like%20to%20discuss%20my%20numbers." target="_blank" rel="noopener" class="tool-wa-btn">
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

        <form action="<?= url('/contact/submit') ?>" method="POST" id="aiLeadGateForm" onsubmit="handleGateSubmit(event)">
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
                    <input type="text" id="gateCity" name="city" class="tool-form-control" placeholder="London / Dhaka">
                </div>
            </div>

            <div class="tool-form-group" style="margin-bottom: 16px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateWhatsapp">WhatsApp <span style="color: #94a3b8; font-weight: normal;">(Optional)</span></label>
                <input type="tel" id="gateWhatsapp" name="phone" class="tool-form-control" placeholder="+880 1670-769816">
            </div>

            <button type="submit" class="tool-submit-btn">
                Calculate My Savings
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
let currentAiCalc = null;

function computeAiEstimate() {
    const people = parseFloat(document.getElementById('people_count').value) || 1;
    const hours = parseFloat(document.getElementById('hours_per_week').value) || 0;
    const rate = parseFloat(document.getElementById('hourly_cost').value) || 0;
    const autoPercent = parseFloat(document.getElementById('automatable_percent').value) || 0;
    const setup = parseFloat(document.getElementById('setup_investment').value) || 0;
    const monthlyMaint = parseFloat(document.getElementById('monthly_running_cost').value) || 0;

    const totalWeeklyHours = people * hours;
    const monthlyHours = totalWeeklyHours * 4.33;
    const monthlyHoursSaved = Math.round(monthlyHours * (autoPercent / 100));

    const grossMonthlySavings = Math.round(monthlyHoursSaved * rate);
    const netMonthlySavings = Math.max(0, grossMonthlySavings - monthlyMaint);
    const netAnnualSavings = netMonthlySavings * 12;
    const annualLaborFreed = grossMonthlySavings * 12;

    const paybackMonths = netMonthlySavings > 0 ? (setup / netMonthlySavings).toFixed(1) : 'N/A';
    const threeYearNetProfit = (netMonthlySavings * 36) - setup;
    const threeYearRoi = setup > 0 ? Math.round((threeYearNetProfit / setup) * 100) : 0;

    const drivers = [
        { label: `Team Task Volume (${people} people × ${hours} hrs/wk)`, amount: `${Math.round(totalWeeklyHours)} hrs / week` },
        { label: 'Realistically Automatable Share', amount: `${autoPercent}%` },
        { label: 'Effective Hourly Cost Basis', amount: `$${rate}/hr` },
        { label: 'One-Time Setup & Build', amount: `$${setup.toLocaleString('en-US')}` },
        { label: 'Monthly Maintenance & Tool Costs', amount: `$${monthlyMaint}/mo` }
    ];

    currentAiCalc = {
        people, hours, rate, autoPercent, setup, monthlyMaint,
        monthlyHoursSaved, grossMonthlySavings, netMonthlySavings, netAnnualSavings,
        annualLaborFreed, paybackMonths, threeYearRoi, drivers
    };

    return currentAiCalc;
}

function openGateModal() {
    computeAiEstimate();
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

function renderAiResults() {
    const c = currentAiCalc || computeAiEstimate();

    document.getElementById('resNetAnnual').textContent = '$' + c.netAnnualSavings.toLocaleString('en-US');
    document.getElementById('resPayback').textContent = c.paybackMonths + (c.paybackMonths !== 'N/A' ? ' months' : '');

    document.getElementById('resHoursSaved').textContent = c.monthlyHoursSaved + ' hrs';
    document.getElementById('resMonthlyGross').textContent = '$' + c.grossMonthlySavings.toLocaleString('en-US');
    document.getElementById('resMonthlyNet').textContent = '$' + c.netMonthlySavings.toLocaleString('en-US');
    document.getElementById('resAnnualLabor').textContent = '$' + c.annualLaborFreed.toLocaleString('en-US');
    document.getElementById('resThreeYearRoi').textContent = c.threeYearRoi + '%';
    document.getElementById('resPaybackPill').textContent = c.paybackMonths + (c.paybackMonths !== 'N/A' ? ' Mo' : '');

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
    
    const c = currentAiCalc || computeAiEstimate();
    const specs = `AI AUTOMATION CALCULATOR ESTIMATE: $${c.netAnnualSavings}/yr Net Savings, ${c.monthlyHoursSaved} hrs/mo saved, Payback: ${c.paybackMonths} Mo, Setup: $${c.setup}, 3-Yr ROI: ${c.threeYearRoi}%`;
    document.getElementById('hiddenGateSpecs').value = specs;

    closeGateModal();
    renderAiResults();

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).catch(() => {});
}
</script>
