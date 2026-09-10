"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebsiteCostCalculator() {
  const [pageCount, setPageCount] = useState("5-10");
  const [designType, setDesignType] = useState("custom");
  const [features, setFeatures] = useState({
    ecommerce: false,
    seoSetup: true,
    speedOpt: true,
    cmsBlog: true,
    clientPortal: false,
    customApi: false
  });

  const toggleFeature = (key) => {
    setFeatures({ ...features, [key]: !features[key] });
  };

  // Calculate price estimate
  let basePrice = 600;
  if (pageCount === "1-5") basePrice = 500;
  if (pageCount === "5-10") basePrice = 850;
  if (pageCount === "10-25") basePrice = 1400;
  if (pageCount === "25+") basePrice = 2400;

  let designMultiplier = 1.0;
  if (designType === "template") designMultiplier = 0.8;
  if (designType === "custom") designMultiplier = 1.2;
  if (designType === "enterprise") designMultiplier = 1.6;

  let featureAddons = 0;
  if (features.ecommerce) featureAddons += 450;
  if (features.seoSetup) featureAddons += 350;
  if (features.speedOpt) featureAddons += 250;
  if (features.cmsBlog) featureAddons += 200;
  if (features.clientPortal) featureAddons += 300;
  if (features.customApi) featureAddons += 400;

  const totalEstimate = Math.round(basePrice * designMultiplier + featureAddons);
  const minRange = Math.round(totalEstimate * 0.9);
  const maxRange = Math.round(totalEstimate * 1.15);

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All Growth Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-solid fa-calculator"></i> Project Scope &amp; Budgeting
          </div>
          <h1 className="page-title">Website &amp; SEO Investment Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Configure technical scope, CMS stack, page scale, and required modules to estimate development and optimization costs.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          <div className="calc-layout-grid">
            {/* CONFIGURATION COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* PAGE SCALE */}
              <div className="calc-inputs-card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-file-lines text-primary"></i> 1. Estimated Page Scale
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
                  {[
                    { id: "1-5", label: "1-5 Pages", sub: "Starter / MVP" },
                    { id: "5-10", label: "5-10 Pages", sub: "Standard Business" },
                    { id: "10-25", label: "10-25 Pages", sub: "Growth / Multi-service" },
                    { id: "25+", label: "25+ Pages", sub: "Enterprise / Directory" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPageCount(item.id)}
                      style={{
                        padding: "12px 10px",
                        border: pageCount === item.id ? "2px solid #2563eb" : "1px solid #e2e8f0",
                        borderRadius: "4px",
                        background: pageCount === item.id ? "#eff6ff" : "#ffffff",
                        color: pageCount === item.id ? "#1d4ed8" : "#334155",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>{item.label}</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* DESIGN FIDELITY */}
              <div className="calc-inputs-card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-palette text-accent" style={{ color: "#8b5cf6" }}></i> 2. Design &amp; UI/UX Fidelity
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
                  {[
                    { id: "template", label: "Clean Starter", sub: "Speedy template setup", mul: "0.8x" },
                    { id: "custom", label: "Custom UI/UX", sub: "Brand tailored & responsive", mul: "1.2x" },
                    { id: "enterprise", label: "Bespoke 3D UI", sub: "Micro-animations & custom brand", mul: "1.6x" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDesignType(item.id)}
                      style={{
                        padding: "14px 12px",
                        border: designType === item.id ? "2px solid #2563eb" : "1px solid #e2e8f0",
                        borderRadius: "4px",
                        background: designType === item.id ? "#eff6ff" : "#ffffff",
                        color: designType === item.id ? "#1d4ed8" : "#334155",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ fontSize: "0.92rem" }}>{item.label}</strong>
                        <span style={{ fontSize: "0.72rem", padding: "2px 6px", background: "#f1f5f9", borderRadius: "4px", color: "#64748b" }}>{item.mul}</span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ADD-ON MODULES */}
              <div className="calc-inputs-card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-puzzle-piece text-success"></i> 3. Add-on Features &amp; Optimization
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                  {[
                    { key: "seoSetup", title: "Full On-Page & Schema SEO", price: "+$350", desc: "Complete JSON-LD markup, meta, & sitemap" },
                    { key: "speedOpt", title: "Core Web Vitals 95+ Speed", price: "+$250", desc: "Sub-second load times & image optimization" },
                    { key: "ecommerce", title: "E-Commerce Catalog & Products", price: "+$450", desc: "Product filters, variations & cart systems" },
                    { key: "cmsBlog", title: "CMS Dynamic Blog Engine", price: "+$200", desc: "Author dashboard & article management" },
                    { key: "clientPortal", title: "Client Portal & Dashboard", price: "+$300", desc: "User accounts & authenticated access" },
                    { key: "customApi", title: "Custom API & Automation", price: "+$400", desc: "CRM sync, Zapier, or webhook pipelines" }
                  ].map((feat) => (
                    <label
                      key={feat.key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "12px 14px",
                        border: features[feat.key] ? "1.5px solid #2563eb" : "1px solid #e2e8f0",
                        borderRadius: "4px",
                        background: features[feat.key] ? "#eff6ff" : "#ffffff",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <input
                            type="checkbox"
                            checked={features[feat.key]}
                            onChange={() => toggleFeature(feat.key)}
                            style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
                          />
                          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a" }}>{feat.title}</span>
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563eb" }}>{feat.price}</span>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px", paddingLeft: "24px" }}>
                        {feat.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* ESTIMATE DISPLAY COLUMN */}
            <div className="calc-results-card">
              <span className="calc-results-badge">
                <i className="fa-solid fa-receipt"></i> Projected Investment Range
              </span>

              <div>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.04em" }}>
                  Estimated Project Total
                </span>
                <div className="calc-kpi-main" style={{ color: "#34d399" }}>
                  ${totalEstimate.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "-10px", marginBottom: "16px" }}>
                  Expected Range: ${minRange.toLocaleString()} – ${maxRange.toLocaleString()}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #334155", paddingTop: "14px", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, marginBottom: "10px" }}>
                  Scope Breakdown
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.84rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}>
                    <span>Base Website ({pageCount} pages):</span>
                    <strong>${Math.round(basePrice * designMultiplier)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}>
                    <span>Selected Add-on Modules:</span>
                    <strong style={{ color: "#38bdf8" }}>+${featureAddons}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}>
                    <span>Estimated Turnaround:</span>
                    <strong>2 – 3 Weeks</strong>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}>
                Book Project Scoping Call <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related Growth Calculators
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Model paid advertising return on ad spend and calculate AI operational savings.
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
                <div className="tool-ref-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                  <i className="fa-brands fa-meta"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/facebook-ads-roi-calculator">Facebook Ads ROI Calculator</Link></h4>
                <p className="tool-ref-desc">Model return on Meta advertising with custom CPM, CTR, and AOV.</p>
                <div className="tool-ref-footer"><Link href="/tools/facebook-ads-roi-calculator" className="tool-ref-link">Calculate Meta ROI <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Ready to Build a High-Performance, SEO-Engineered Website?</h4>
            <p>We craft Next.js web applications with sub-second page loads, schema markup, and high-conversion UX.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-calendar-check"></i> Book Technical Discovery Call
              </Link>
              <Link href="/services" className="btn btn-outline btn-sm">
                View All Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
