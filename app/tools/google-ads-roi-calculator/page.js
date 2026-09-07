"use client";

import { useState } from "react";
import Link from "next/link";

export default function GoogleAdsRoiCalculator() {
  const [adSpend, setAdSpend] = useState(2500);
  const [cpc, setCpc] = useState(2.50);
  const [conversionRate, setConversionRate] = useState(3.5);
  const [closeRate, setCloseRate] = useState(20);
  const [customerValue, setCustomerValue] = useState(850);

  // Calculations
  const clicks = Math.round(adSpend / (cpc || 0.01));
  const leads = Math.round(clicks * (conversionRate / 100));
  const customers = Math.round(leads * (closeRate / 100));
  const grossRevenue = customers * customerValue;
  const netProfit = grossRevenue - adSpend;
  const roas = adSpend > 0 ? ((grossRevenue / adSpend) * 100).toFixed(0) : 0;
  const costPerLead = leads > 0 ? (adSpend / leads).toFixed(2) : 0;
  const costPerAcquisition = customers > 0 ? (adSpend / customers).toFixed(2) : 0;

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO &amp; Growth Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-brands fa-google"></i> Paid Search Simulator
          </div>
          <h1 className="page-title">Google Ads ROI &amp; ROAS Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Model click volumes, lead generation rates, customer lifetime value, and project your return on ad spend (ROAS).
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          <div className="calc-layout-grid">
            {/* INPUTS COLUMN */}
            <div className="calc-inputs-card">
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-calculator text-primary"></i> Campaign Budget &amp; Funnel Assumptions
              </h2>

              {/* Monthly Ad Spend */}
              <div className="form-group">
                <div className="form-label">
                  <span>Monthly Google Ad Spend ($)</span>
                  <span style={{ fontSize: "0.95rem", color: "#2563eb", fontWeight: 800 }}>
                    ${adSpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="number"
                  min="100"
                  max="100000"
                  step="100"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Math.max(0, Number(e.target.value)))}
                  className="form-input"
                />
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={Math.min(25000, adSpend)}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* CPC & Conversion Rate */}
              <div className="form-row-2">
                <div className="form-group">
                  <div className="form-label">
                    <span>Average CPC ($)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>${cpc.toFixed(2)}</span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={cpc}
                    onChange={(e) => setCpc(Math.max(0.01, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Landing Conv. Rate (%)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>{conversionRate}%</span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Math.max(0.1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Sales Close Rate & Customer LTV */}
              <div className="form-row-2">
                <div className="form-group">
                  <div className="form-label">
                    <span>Sales Close Rate (%)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>{closeRate}%</span>
                  </div>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="100"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Math.max(1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Customer Value / LTV ($)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>${customerValue}</span>
                  </div>
                  <input
                    type="number"
                    step="25"
                    min="1"
                    value={customerValue}
                    onChange={(e) => setCustomerValue(Math.max(1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Strategic Insights */}
              <div style={{ marginTop: "14px", padding: "14px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.84rem", color: "#475569", lineHeight: 1.5 }}>
                <i className="fa-solid fa-lightbulb text-warning" style={{ marginRight: "6px" }}></i>
                <strong>Pro-Tip:</strong> High CPCs? Pair Google Ads with <strong>Technical SEO &amp; Organic Ranking</strong> to capture non-brand search traffic at zero incremental marginal cost.
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="calc-results-card">
              <span className="calc-results-badge">
                <i className="fa-solid fa-chart-line"></i> Projected Monthly Performance
              </span>

              <div>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                  Estimated Gross Revenue
                </span>
                <div className="calc-kpi-main" style={{ color: "#34d399" }}>
                  ${grossRevenue.toLocaleString()}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #334155", paddingTop: "14px" }}>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                  Net Profit (After Ad Spend)
                </span>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "2px", color: netProfit >= 0 ? "#ffffff" : "#fb7185" }}>
                  ${netProfit.toLocaleString()}
                </div>
              </div>

              <div className="calc-metric-grid">
                <div className="calc-metric-item">
                  <span>Return on Ad Spend:</span>
                  <strong style={{ color: "#38bdf8" }}>{roas}% ROAS</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Estimated Clicks:</span>
                  <strong>{clicks.toLocaleString()}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Generated Leads:</span>
                  <strong>{leads.toLocaleString()}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Paying Customers:</span>
                  <strong>{customers.toLocaleString()}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Cost Per Lead (CPL):</span>
                  <strong>${costPerLead}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Acquisition Cost (CPA):</span>
                  <strong>${costPerAcquisition}</strong>
                </div>
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}>
                Scale with Organic SEO &amp; Ads <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related Growth Calculators
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Model social ad performance, estimate website build costs, and calculate AI workflow savings.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                  <i className="fa-brands fa-meta"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/facebook-ads-roi-calculator">Facebook Ads ROI Calculator</Link></h4>
                <p className="tool-ref-desc">Model return on Meta advertising with custom CPM, CTR, and AOV.</p>
                <div className="tool-ref-footer"><Link href="/tools/facebook-ads-roi-calculator" className="tool-ref-link">Calculate Meta ROI <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#ecfdf5", color: "#059669" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/ai-automation-savings-calculator">AI Automation Savings</Link></h4>
                <p className="tool-ref-desc">Calculate payroll hours recovered through AI workflows and automated SEO.</p>
                <div className="tool-ref-footer"><Link href="/tools/ai-automation-savings-calculator" className="tool-ref-link">Calculate Savings <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#475569" }}>
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/website-cost-calculator">Website Cost Calculator</Link></h4>
                <p className="tool-ref-desc">Configure project scope, CMS requirements, and estimate investment costs.</p>
                <div className="tool-ref-footer"><Link href="/tools/website-cost-calculator" className="tool-ref-link">Estimate Website <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Ready to Maximize Your Organic Search ROI?</h4>
            <p>Our search growth retainers build compound ranking assets that drive pipeline revenue month after month.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-calendar-check"></i> Book Growth Consultation
              </Link>
              <Link href="/services" className="btn btn-outline btn-sm">
                View All SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
