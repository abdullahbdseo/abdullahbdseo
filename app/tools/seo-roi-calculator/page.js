"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";
import { siteSettings } from "@/lib/data";

export default function SeoRoiCalculatorPage() {
  const [currency, setCurrency] = useState("USD");
  const [currentTraffic, setCurrentTraffic] = useState(3500);
  const [targetTraffic, setTargetTraffic] = useState(25000);
  const [conversionRate, setConversionRate] = useState(2.2);
  const [avgDealValue, setAvgDealValue] = useState(150);
  const [cpcValue, setCpcValue] = useState(2.5);
  const [monthlySeoCost, setMonthlySeoCost] = useState(850);
  const [timeframeMonths, setTimeframeMonths] = useState(12);
  const [copied, setCopied] = useState(false);

  const currSymbol = currency === "USD" ? "$" : "৳";

  // Presets
  const applyPreset = (type) => {
    if (type === "ecommerce") {
      setCurrentTraffic(5000);
      setTargetTraffic(35000);
      setConversionRate(2.8);
      setAvgDealValue(currency === "USD" ? 85 : 9500);
      setCpcValue(currency === "USD" ? 1.8 : 220);
      setMonthlySeoCost(currency === "USD" ? 750 : 85000);
    } else if (type === "b2b") {
      setCurrentTraffic(1200);
      setTargetTraffic(8000);
      setConversionRate(1.5);
      setAvgDealValue(currency === "USD" ? 1800 : 220000);
      setCpcValue(currency === "USD" ? 8.5 : 950);
      setMonthlySeoCost(currency === "USD" ? 1200 : 140000);
    } else if (type === "local") {
      setCurrentTraffic(800);
      setTargetTraffic(4500);
      setConversionRate(4.0);
      setAvgDealValue(currency === "USD" ? 250 : 30000);
      setCpcValue(currency === "USD" ? 3.5 : 400);
      setMonthlySeoCost(currency === "USD" ? 500 : 60000);
    }
  };

  // Calculations
  const metrics = useMemo(() => {
    const incrementalTraffic = Math.max(0, targetTraffic - currentTraffic);
    const monthlyLeads = Math.round((targetTraffic * (conversionRate / 100)));
    const currentLeads = Math.round((currentTraffic * (conversionRate / 100)));
    const incrementalLeads = monthlyLeads - currentLeads;

    const monthlyOrganicRevenue = monthlyLeads * avgDealValue;
    const currentMonthlyRevenue = currentLeads * avgDealValue;
    const incrementalMonthlyRevenue = monthlyOrganicRevenue - currentMonthlyRevenue;

    const totalSeoInvestment = monthlySeoCost * timeframeMonths;
    // Compounding growth formula: cumulative incremental revenue ramp-up over the timeframe
    // Assume linear to exponential ramp from month 1 to target month
    let cumulativeRevenue = 0;
    const monthByMonth = [];

    for (let m = 1; m <= timeframeMonths; m++) {
      const progressRatio = Math.pow(m / timeframeMonths, 1.3);
      const mTraffic = Math.round(currentTraffic + incrementalTraffic * progressRatio);
      const mLeads = Math.round(mTraffic * (conversionRate / 100));
      const mRev = mLeads * avgDealValue;
      const mIncrementalRev = mRev - currentMonthlyRevenue;
      cumulativeRevenue += mRev;
      monthByMonth.push({
        month: m,
        traffic: mTraffic,
        leads: mLeads,
        revenue: mRev,
        incrementalRevenue: mIncrementalRev,
      });
    }

    const netProfit = cumulativeRevenue - totalSeoInvestment - (currentMonthlyRevenue * timeframeMonths);
    const roiPercentage = totalSeoInvestment > 0 ? Math.round((netProfit / totalSeoInvestment) * 100) : 0;

    // Equivalent PPC ad spend
    const equivalentPpcMonthly = Math.round(targetTraffic * cpcValue);
    const totalPpcEquivalent = Math.round(monthByMonth.reduce((acc, curr) => acc + (curr.traffic * cpcValue), 0));
    const ppcSavings = totalPpcEquivalent - totalSeoInvestment;

    const seoCpa = monthlyLeads > 0 ? (monthlySeoCost / monthlyLeads).toFixed(2) : 0;
    const ppcCpa = (cpcValue / (conversionRate / 100)).toFixed(2);

    return {
      monthlyLeads,
      incrementalLeads,
      monthlyOrganicRevenue,
      incrementalMonthlyRevenue,
      totalSeoInvestment,
      cumulativeRevenue,
      netProfit,
      roiPercentage,
      equivalentPpcMonthly,
      totalPpcEquivalent,
      ppcSavings,
      seoCpa,
      ppcCpa,
      monthByMonth,
    };
  }, [currentTraffic, targetTraffic, conversionRate, avgDealValue, cpcValue, monthlySeoCost, timeframeMonths]);

  const copySummary = () => {
    const summaryText = `📊 SEO ROI & Profit Forecast (${timeframeMonths} Months)
----------------------------------------
Target Monthly Traffic: ${targetTraffic.toLocaleString()} visits
Monthly Projected Revenue: ${currSymbol}${metrics.monthlyOrganicRevenue.toLocaleString()}
Total Cumulative Revenue: ${currSymbol}${metrics.cumulativeRevenue.toLocaleString()}
Total SEO Investment: ${currSymbol}${metrics.totalSeoInvestment.toLocaleString()}
Projected Net SEO Profit: ${currSymbol}${metrics.netProfit.toLocaleString()}
Estimated ROI: ${metrics.roiPercentage}%
Equivalent PPC Ad Spend Saved: ${currSymbol}${metrics.ppcSavings.toLocaleString()}
SEO Cost Per Acquisition (CPA): ${currSymbol}${metrics.seoCpa} vs PPC CPA: ${currSymbol}${metrics.ppcCpa}
Generated via Abdullahbdseo ROI Calculator (https://abdullahbdseo.vercel.app/tools/seo-roi-calculator)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const faqs = [
    {
      q: "How is SEO Return on Investment (ROI) calculated?",
      a: "SEO ROI is calculated by comparing the total cumulative profit generated from organic search traffic against the total cost of the SEO campaign: (Net Organic Profit - Total SEO Cost) / Total SEO Cost * 100%. Unlike paid ads, organic traffic compounds over time with zero per-click charges."
    },
    {
      q: "How does SEO Cost Per Acquisition (CPA) compare to Google Ads?",
      a: "With Google Ads, you pay for every single click regardless of conversion. With SEO, once your pages rank on Page 1, you receive 24/7 unlimited organic search clicks for free. Over a 12-month period, SEO CPA is typically 60% to 85% lower than Google Ads PPC."
    },
    {
      q: "How long before an SEO campaign produces positive ROI?",
      a: "Most commercial websites begin seeing traffic and lead momentum between Month 3 and Month 6. By Month 9 to 12, cumulative organic revenue typically surpasses total campaign investment, delivering exponential compounding returns."
    },
    {
      q: "What variables have the biggest impact on SEO revenue?",
      a: "The three highest-leverage variables are: 1) Targeting high-intent commercial keywords rather than broad vanity terms, 2) Conversion Rate Optimization (CRO) on landing pages, and 3) Average Order Value / Customer Lifetime Value (LTV)."
    }
  ];

  return (
    <div className="tool-page-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", color: "#2563eb", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, marginBottom: "12px", border: "1px solid #bfdbfe" }}>
          <i className="fa-solid fa-chart-line"></i> Organic Revenue &amp; PPC Comparison
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0f172a", marginBottom: "12px", lineHeight: 1.2 }}>
          SEO ROI &amp; <span style={{ color: "#2563eb" }}>Profit Calculator</span>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: "780px", margin: "0 auto", lineHeight: 1.6 }}>
          Model your projected organic search traffic growth, estimate net revenue returns, and calculate how much ad spend you save compared to Google Ads PPC.
        </p>

        {/* CURRENCY & PRESET TOGGLE */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
          <div style={{ display: "inline-flex", background: "#f1f5f9", padding: "4px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              style={{
                padding: "6px 16px",
                borderRadius: "4px",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                background: currency === "USD" ? "#2563eb" : "transparent",
                color: currency === "USD" ? "#ffffff" : "#475569",
                transition: "all 0.2s ease",
              }}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("BDT")}
              style={{
                padding: "6px 16px",
                borderRadius: "4px",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                background: currency === "BDT" ? "#2563eb" : "transparent",
                color: currency === "BDT" ? "#ffffff" : "#475569",
                transition: "all 0.2s ease",
              }}
            >
              BDT (৳)
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => applyPreset("ecommerce")}
              style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#ffffff", fontSize: "0.82rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
            >
              🛒 E-Commerce
            </button>
            <button
              type="button"
              onClick={() => applyPreset("b2b")}
              style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#ffffff", fontSize: "0.82rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
            >
              🏢 B2B / SaaS
            </button>
            <button
              type="button"
              onClick={() => applyPreset("local")}
              style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#ffffff", fontSize: "0.82rem", fontWeight: 600, color: "#334155", cursor: "pointer" }}
            >
              📍 Local Business
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px", alignItems: "start" }}>
        {/* INPUTS COLUMN */}
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <i className="fa-solid fa-sliders" style={{ color: "#2563eb" }}></i> Campaign Growth Inputs
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Current Traffic */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155" }}>Current Monthly Organic Traffic</label>
                <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#2563eb" }}>{currentTraffic.toLocaleString()} visits</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={currentTraffic}
                onChange={(e) => setCurrentTraffic(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#2563eb" }}
              />
            </div>

            {/* Target Traffic */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155" }}>Projected Target Organic Traffic</label>
                <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#059669" }}>{targetTraffic.toLocaleString()} visits</span>
              </div>
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={targetTraffic}
                onChange={(e) => setTargetTraffic(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#059669" }}
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155" }}>Lead / Sales Conversion Rate (%)</label>
                <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#7c3aed" }}>{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#7c3aed" }}
              />
            </div>

            {/* Avg Deal Value */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Average Order / Deal Value ({currSymbol})
              </label>
              <input
                type="number"
                min="1"
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Math.max(1, Number(e.target.value)))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.95rem", color: "#0f172a", outline: "none" }}
              />
            </div>

            {/* Industry CPC */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Estimated PPC Cost Per Click ({currSymbol})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={cpcValue}
                onChange={(e) => setCpcValue(Math.max(0.1, Number(e.target.value)))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.95rem", color: "#0f172a", outline: "none" }}
              />
            </div>

            {/* Monthly SEO Cost */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Monthly SEO Retainer / Investment ({currSymbol})
              </label>
              <input
                type="number"
                min="100"
                value={monthlySeoCost}
                onChange={(e) => setMonthlySeoCost(Math.max(0, Number(e.target.value)))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.95rem", color: "#0f172a", outline: "none" }}
              />
            </div>

            {/* Timeframe */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Forecast Horizon (Months)
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {[6, 12, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTimeframeMonths(m)}
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: timeframeMonths === m ? "1.5px solid #2563eb" : "1px solid #cbd5e1",
                      background: timeframeMonths === m ? "#eff6ff" : "#ffffff",
                      color: timeframeMonths === m ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS & KPI CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* TOP HIGHLIGHT CARD */}
          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "4px", padding: "28px", color: "#ffffff", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.05em" }}>
                  Estimated {timeframeMonths}-Month Net SEO Profit
                </span>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: metrics.netProfit >= 0 ? "#10b981" : "#f43f5e", marginTop: "4px" }}>
                  {currSymbol}{metrics.netProfit.toLocaleString()}
                </div>
              </div>
              <div style={{ background: metrics.roiPercentage >= 100 ? "#065f46" : "#1e3a8a", padding: "8px 16px", borderRadius: "4px", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "#cbd5e1", display: "block", textTransform: "uppercase", fontWeight: 700 }}>Projected ROI</span>
                <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#ffffff" }}>{metrics.roiPercentage}%</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #334155" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Monthly Organic Revenue</span>
                <strong style={{ fontSize: "1.2rem", color: "#38bdf8" }}>{currSymbol}{metrics.monthlyOrganicRevenue.toLocaleString()}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Cumulative Revenue</span>
                <strong style={{ fontSize: "1.2rem", color: "#ffffff" }}>{currSymbol}{metrics.cumulativeRevenue.toLocaleString()}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Total SEO Cost</span>
                <strong style={{ fontSize: "1.2rem", color: "#f87171" }}>{currSymbol}{metrics.totalSeoInvestment.toLocaleString()}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Monthly Leads / Sales</span>
                <strong style={{ fontSize: "1.2rem", color: "#a78bfa" }}>{metrics.monthlyLeads.toLocaleString()} / mo</strong>
              </div>
            </div>
          </div>

          {/* PPC VS SEO COMPARISON CARD */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-scale-balanced" style={{ color: "#d97706" }}></i> SEO vs. Google Ads PPC Value Comparison
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Equivalent PPC Cost</span>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#dc2626", margin: "4px 0" }}>
                  {currSymbol}{metrics.totalPpcEquivalent.toLocaleString()}
                </div>
                <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>To buy this same traffic from Google Ads</p>
              </div>

              <div style={{ background: "#ecfdf5", padding: "16px", borderRadius: "4px", border: "1px solid #a7f3d0" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#047857", textTransform: "uppercase" }}>PPC Ad Spend Saved</span>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#059669", margin: "4px 0" }}>
                  {currSymbol}{metrics.ppcSavings.toLocaleString()}
                </div>
                <p style={{ fontSize: "0.78rem", color: "#047857", margin: 0 }}>Net capital saved by investing in organic SEO</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", padding: "12px", background: "#eff6ff", borderRadius: "4px", border: "1px solid #bfdbfe", fontSize: "0.85rem" }}>
              <span><strong>SEO Cost Per Lead (CPA):</strong> <span style={{ color: "#2563eb", fontWeight: 800 }}>{currSymbol}{metrics.seoCpa}</span></span>
              <span><strong>PPC Cost Per Lead (CPA):</strong> <span style={{ color: "#dc2626", fontWeight: 800 }}>{currSymbol}{metrics.ppcCpa}</span></span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={copySummary}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: copied ? "#059669" : "#ffffff",
                color: copied ? "#ffffff" : "#1e293b",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`}></i>
              {copied ? "Forecast Summary Copied!" : "Copy ROI Summary"}
            </button>

            <Link
              href="/contact"
              style={{
                flex: 1,
                padding: "12px 20px",
                background: "#2563eb",
                color: "#ffffff",
                borderRadius: "4px",
                fontWeight: 800,
                fontSize: "0.9rem",
                textDecoration: "none",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-paper-plane"></i> Get Free Custom SEO Proposal
            </Link>
          </div>
        </div>
      </div>

      {/* MONTHLY BREAKDOWN TABLE */}
      <div style={{ marginTop: "48px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "28px", overflowX: "auto" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
          📈 Month-by-Month Compounding Organic Growth Projection
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "12px 14px", fontWeight: 700, color: "#334155" }}>Month</th>
              <th style={{ padding: "12px 14px", fontWeight: 700, color: "#334155" }}>Est. Organic Traffic</th>
              <th style={{ padding: "12px 14px", fontWeight: 700, color: "#334155" }}>Projected Leads / Orders</th>
              <th style={{ padding: "12px 14px", fontWeight: 700, color: "#334155" }}>Monthly Revenue</th>
              <th style={{ padding: "12px 14px", fontWeight: 700, color: "#334155" }}>Incremental Growth</th>
            </tr>
          </thead>
          <tbody>
            {metrics.monthByMonth.map((row) => (
              <tr key={row.month} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0f172a" }}>Month {row.month}</td>
                <td style={{ padding: "12px 14px", color: "#2563eb", fontWeight: 600 }}>{row.traffic.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", color: "#475569" }}>{row.leads.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", fontWeight: 700, color: "#059669" }}>{currSymbol}{row.revenue.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", color: "#7c3aed", fontWeight: 600 }}>+{currSymbol}{row.incrementalRevenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={faqs} title="SEO ROI &amp; Revenue Projection FAQ" />
    </div>
  );
}
