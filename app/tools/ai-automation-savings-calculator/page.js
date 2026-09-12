"use client";

import { useState } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function AiAutomationSavingsCalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyWage, setHourlyWage] = useState(35);
  const [hoursPerWeekRepetitive, setHoursPerWeekRepetitive] = useState(12);
  const [automationPercent, setAutomationPercent] = useState(65);
  const [aiToolCostMonthly, setAiToolCostMonthly] = useState(250);

  // Calculations
  const weeklyRepetitiveHoursTeam = teamSize * hoursPerWeekRepetitive;
  const weeklyHoursSaved = weeklyRepetitiveHoursTeam * (automationPercent / 100);
  const annualHoursSaved = Math.round(weeklyHoursSaved * 50);
  
  const annualLaborSavings = annualHoursSaved * hourlyWage;
  const annualToolCost = aiToolCostMonthly * 12;
  const netAnnualSavings = annualLaborSavings - annualToolCost;
  const roiMultiplier = annualToolCost > 0 ? (annualLaborSavings / annualToolCost).toFixed(1) : 0;
  const monthlyLaborSaved = Math.round(annualLaborSavings / 12);

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All Growth Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-solid fa-robot"></i> Efficiency &amp; Cost Reduction
          </div>
          <h1 className="page-title">AI Automation Savings Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Calculate how automating repetitive marketing, reporting, and operational workflows with AI and programmatic SEO reduces labor overhead.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          <div className="calc-layout-grid">
            {/* INPUTS COLUMN */}
            <div className="calc-inputs-card">
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-calculator text-primary"></i> Team &amp; Workflow Parameters
              </h2>

              {/* Team Size & Hourly Wage */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Team Members Handling Tasks</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Hourly Wage ($/hr)</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(Math.max(1, Number(e.target.value)))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Repetitive Hours Slider */}
              <div className="form-group">
                <div className="form-label">
                  <span>Repetitive Hours / Person / Week</span>
                  <span style={{ fontSize: "0.95rem", color: "#2563eb", fontWeight: 800 }}>
                    {hoursPerWeekRepetitive} hrs / week
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="1"
                  value={hoursPerWeekRepetitive}
                  onChange={(e) => setHoursPerWeekRepetitive(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Automation Percentage Slider */}
              <div className="form-group">
                <div className="form-label">
                  <span>Estimated Task Automation Rate (%)</span>
                  <span style={{ fontSize: "0.95rem", color: "#10b981", fontWeight: 800 }}>
                    {automationPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="5"
                  value={automationPercent}
                  onChange={(e) => setAutomationPercent(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Monthly AI Tool Cost */}
              <div className="form-group">
                <div className="form-label">
                  <span>Monthly AI &amp; Software Tool Budget ($/mo)</span>
                  <span style={{ fontSize: "0.85rem", color: "#475569" }}>${aiToolCostMonthly}/mo</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="25"
                  value={aiToolCostMonthly}
                  onChange={(e) => setAiToolCostMonthly(Math.max(0, Number(e.target.value)))}
                  className="form-input"
                />
              </div>

              {/* Automation Insight Note */}
              <div style={{ marginTop: "14px", padding: "14px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "0.84rem", color: "#475569", lineHeight: 1.5 }}>
                <i className="fa-solid fa-microchip text-primary" style={{ marginRight: "6px" }}></i>
                <strong>Where AI Automation Excels:</strong> Programmatic content generation, technical SEO log analysis, automated SERP ranking tracking, and internal linking graph updates.
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="calc-results-card">
              <span className="calc-results-badge" style={{ color: "#34d399" }}>
                <i className="fa-solid fa-award"></i> Projected Annual Value Created
              </span>

              <div>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                  Net Labor Cost Savings / Year
                </span>
                <div className="calc-kpi-main" style={{ color: "#34d399" }}>
                  ${netAnnualSavings.toLocaleString()}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #334155", paddingTop: "14px" }}>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                  Total Team Hours Reclaimed
                </span>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "2px", color: "#38bdf8" }}>
                  {annualHoursSaved.toLocaleString()} Hours / Year
                </div>
              </div>

              <div className="calc-metric-grid">
                <div className="calc-metric-item">
                  <span>Software ROI:</span>
                  <strong style={{ color: "#34d399" }}>{roiMultiplier}x ROI</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Monthly Savings:</span>
                  <strong>${monthlyLaborSaved.toLocaleString()}/mo</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Weekly Saved Hours:</span>
                  <strong>{Math.round(weeklyHoursSaved)} hrs/wk</strong>
                </div>
                <div className="calc-metric-item">
                  <span>Annual Software Cost:</span>
                  <strong>${annualToolCost.toLocaleString()}</strong>
                </div>
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}>
                Request Custom AI Workflow Strategy <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related Growth Calculators
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Model paid advertising returns and estimate website development investments.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#475569" }}>
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/website-cost-calculator">Website Cost Calculator</Link></h4>
                <p className="tool-ref-desc">Configure project scope, CMS requirements, and estimate investment costs.</p>
                <div className="tool-ref-footer"><Link href="/tools/website-cost-calculator" className="tool-ref-link">Estimate Website <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/google-ads-roi-calculator">Google Ads ROI Calculator</Link></h4>
                <p className="tool-ref-desc">Model search click volume, customer LTV, and lead conversion ROI.</p>
                <div className="tool-ref-footer"><Link href="/tools/google-ads-roi-calculator" className="tool-ref-link">Calculate Google ROI <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                  <i className="fa-brands fa-meta"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/facebook-ads-roi-calculator">Facebook Ads ROI Calculator</Link></h4>
                <p className="tool-ref-desc">Model return on Meta advertising with custom CPM, CTR, and AOV.</p>
                <div className="tool-ref-footer"><Link href="/tools/facebook-ads-roi-calculator" className="tool-ref-link">Calculate Meta ROI <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion with FAQPage Schema */}
          <ToolFaqAccordion
            title="Frequently Asked Questions: AI Automation & Payroll Efficiency"
            faqs={[
              {
                q: "How does AI automation reduce business operational costs?",
                a: "AI automation streamlines repetitive manual workflows such as lead data entry, customer support triage, programmatic content generation, SEO report compilation, and email follow-ups. This saves dozens of employee payroll hours weekly while reducing human error."
              },
              {
                q: "What business processes deliver the highest ROI from AI integration?",
                a: "High-ROI AI automation areas include automated SEO data audits, customer service AI chatbots, programmatic internal link equity routing, automated invoicing, CRM lead enrichment, and automated social & email marketing sequences."
              },
              {
                q: "What is the typical payback period for implementing custom AI automation?",
                a: "Most small to mid-sized businesses recover their initial AI implementation investment within 2 to 4 months through immediate payroll hours saved and increased lead response velocity."
              },
              {
                q: "Will AI workflows require expensive ongoing software subscriptions?",
                a: "Modern AI workflows leverage cost-effective LLM APIs (like OpenAI, Gemini, or Claude) along with lightweight webhook platforms. Monthly operational API costs for typical business automations are often under $50 to $150 per month."
              }
            ]}
          />

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Ready to Deploy Custom AI Automation for Your SEO &amp; Marketing?</h4>
            <p>We build automated programmatic SEO pipelines, AI content verification systems, and custom internal workflow tools.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-calendar-check"></i> Book Automation Discovery
              </Link>
              <Link href="/services/ai-seo-service-in-bangladesh" className="btn btn-outline btn-sm">
                AI SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
