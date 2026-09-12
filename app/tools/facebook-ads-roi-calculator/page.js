"use client";

import { useState } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function FacebookAdsRoiCalculator() {
  const [adSpend, setAdSpend] = useState(2000);
  const [cpm, setCpm] = useState(18.50);
  const [ctr, setCtr] = useState(1.8);
  const [conversionRate, setConversionRate] = useState(2.8);
  const [aov, setAov] = useState(75);

  // Calculations
  const impressions = Math.round((adSpend / (cpm || 0.01)) * 1000);
  const linkClicks = Math.round(impressions * (ctr / 100));
  const cpc = linkClicks > 0 ? (adSpend / linkClicks).toFixed(2) : 0;
  const purchases = Math.round(linkClicks * (conversionRate / 100));
  const grossRevenue = purchases * aov;
  const netProfit = grossRevenue - adSpend;
  const roas = adSpend > 0 ? ((grossRevenue / adSpend) * 100).toFixed(0) : 0;
  const cpa = purchases > 0 ? (adSpend / purchases).toFixed(2) : 0;

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO &amp; Growth Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-brands fa-meta"></i> Paid Social Simulator
          </div>
          <h1 className="page-title">Facebook &amp; Meta Ads ROI Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Forecast impressions, click-through rates, e-commerce purchases, and blended return on ad spend (ROAS).
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          <div className="calc-layout-grid">
            {/* INPUTS COLUMN */}
            <div className="calc-inputs-card">
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-calculator text-primary"></i> Meta Campaign Inputs
              </h2>

              {/* Ad Spend */}
              <div className="form-group">
                <div className="form-label">
                  <span>Monthly Meta Budget ($)</span>
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
                  max="20000"
                  step="250"
                  value={Math.min(20000, adSpend)}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* CPM & CTR */}
              <div className="form-row-2">
                <div className="form-group">
                  <div className="form-label">
                    <span>Estimated CPM ($)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>${cpm.toFixed(2)}</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={cpm}
                    onChange={(e) => setCpm(Math.max(0.1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Click-Through Rate (%)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>{ctr}%</span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={ctr}
                    onChange={(e) => setCtr(Math.max(0.1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Store Conv Rate & AOV */}
              <div className="form-row-2">
                <div className="form-group">
                  <div className="form-label">
                    <span>Store Conv. Rate (%)</span>
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

                <div className="form-group">
                  <div className="form-label">
                    <span>Average Order Value ($)</span>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>${aov}</span>
                  </div>
                  <input
                    type="number"
                    step="5"
                    min="1"
                    value={aov}
                    onChange={(e) => setAov(Math.max(1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Strategic Insights */}
              <div style={{ marginTop: "14px", padding: "14px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "0.84rem", color: "#475569", lineHeight: 1.5 }}>
                <i className="fa-solid fa-chart-pie text-primary" style={{ marginRight: "6px" }}></i>
                <strong>E-Commerce Tip:</strong> Diversify paid customer acquisition with <strong>Category Page SEO &amp; Schema</strong> to build compounding zero-CAC organic revenue.
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="calc-results-card">
              <span className="calc-results-badge">
                <i className="fa-brands fa-meta"></i> Meta Campaign Projections
              </span>

              <div>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                  Total Projected Revenue
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
                  <span>Blended ROAS:</span>
                  <strong style={{ color: "#38bdf8" }}>{roas}% ROAS</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Store Purchases:</span>
                  <strong>{purchases.toLocaleString()}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Est. Impressions:</span>
                  <strong>{impressions.toLocaleString()}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Est. Link Clicks:</span>
                  <strong>{linkClicks.toLocaleString()}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Est. CPC:</span>
                  <strong>${cpc}</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Cost Per Purchase:</span>
                  <strong>${cpa}</strong>
                </div>
              </div>

              <Link href="/services/ecommerce-seo-service-in-bangladesh" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}>
                Boost E-Commerce Organically <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related Growth Calculators
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Model search ads, project website costs, and calculate AI automation payroll savings.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/google-ads-roi-calculator">Google Ads ROI Calculator</Link></h4>
                <p className="tool-ref-desc">Model search click volume, customer LTV, and lead conversion ROI.</p>
                <div className="tool-ref-footer"><Link href="/tools/google-ads-roi-calculator" className="tool-ref-link">Calculate Google ROI <i className="fa-solid fa-arrow-right"></i></Link></div>
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

          {/* FAQ Accordion with FAQPage Schema */}
          <ToolFaqAccordion
            title="Frequently Asked Questions: Facebook Ads ROI & E-Commerce ROAS"
            faqs={[
              {
                q: "What is a good ROAS (Return on Ad Spend) for Facebook Ads?",
                a: "A good ROAS typically ranges between 300% (3x) and 500% (5x) for e-commerce brands, depending on profit margins and average order value (AOV). If your product gross margins are high (e.g. 70%+), a 2.5x ROAS can still generate healthy net profits."
              },
              {
                q: "How does Cost Per Click (CPC) and Click-Through Rate (CTR) affect ROAS?",
                a: "Higher CTR decreases your effective Cost Per Click because Meta rewards engaging ad creatives with higher relevancy scores. Lower CPC means more prospective buyers land on your site for the same ad budget, directly improving your return on investment."
              },
              {
                q: "Why should e-commerce businesses combine Facebook Ads with Organic SEO?",
                a: "Paid ads provide immediate traffic but stop generating revenue the moment the budget pauses. Organic SEO builds a long-term search moat and brings zero-cost organic buyers, lowering your blended customer acquisition cost (CAC) and protecting business profit margins."
              },
              {
                q: "How do I improve my Meta advertising conversion rate?",
                a: "Optimize page speed (Core Web Vitals), implement frictionless 1-click checkout, display authentic customer reviews and trust badges, and ensure the landing page headline directly matches the hook used in your ad creative."
              }
            ]}
          />

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Scaling Paid Social &amp; High-Converting E-Commerce SEO?</h4>
            <p>We build organic search moats that protect margins when social ad CPMs fluctuate.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-comments"></i> Book Growth Consultation
              </Link>
              <Link href="/services/ecommerce-seo-service-in-bangladesh" className="btn btn-outline btn-sm">
                E-Commerce SEO <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
