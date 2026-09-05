"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";

export default function SinglePortfolioPage({ params }) {
  const unwrappedParams = use(params);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const portfolio = caseStudies.find((c) => c.slug === unwrappedParams.slug);

  if (!portfolio) {
    notFound();
  }

  const metrics = portfolio.metrics || {};
  const imgSrc = portfolio.featured_image || portfolio.gsc_screenshot;
  const modalStats = (portfolio.industry || "SEO Client") + " • " + (portfolio.duration || "3 Months") + " • GSC Performance Report";

  return (
    <div className="portfolio-detail-wrapper" style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      {/* 1. HERO SECTION */}
      <section className="digi-hero-section" style={{ padding: "50px 0 35px" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
            <Link href="/portfolio" className="btn btn-sm btn-outline-blue" style={{ padding: "4px 12px", fontSize: "0.8rem" }}>
              <i className="fa-solid fa-arrow-left"></i> All Case Studies
            </Link>
            <span className="gsc-section-badge" style={{ marginBottom: 0 }}>
              <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i> {portfolio.category_name || "Case Study"}
            </span>
          </div>

          <h1 style={{ fontSize: "2.5rem", lineHeight: 1.25, marginBottom: "18px", fontWeight: 800, color: "var(--digi-text-main)" }}>
            {portfolio.title}
          </h1>
          
          <div style={{ display: "flex", gap: "24px", fontSize: "0.92rem", color: "var(--digi-text-body)", flexWrap: "wrap", background: "#f8fafc", padding: "14px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--digi-border)" }}>
            <div><i className="fa-solid fa-building" style={{ color: "var(--digi-blue)" }}></i> <strong>Client:</strong> {portfolio.client_name}</div>
            <div><i className="fa-solid fa-tag" style={{ color: "var(--digi-blue)" }}></i> <strong>Industry:</strong> {portfolio.industry}</div>
            <div><i className="fa-regular fa-clock" style={{ color: "var(--digi-blue)" }}></i> <strong>Timeline:</strong> {portfolio.duration}</div>
            <div><i className="fa-solid fa-shield-check" style={{ color: "#10b981" }}></i> <strong>Verification:</strong> Google Search Console</div>
          </div>
        </div>
      </section>

      {/* 2. CASE STUDY CONTENT */}
      <section className="section" style={{ paddingTop: "30px" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>

          {/* GOOGLE SEARCH CONSOLE VERIFIED PROOF VIEWER */}
          <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "40px" }}>
            <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#ffffff", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, fontSize: "0.95rem" }}>
                <i className="fa-brands fa-google" style={{ color: "#4285F4", fontSize: "1.1rem" }}></i>
                <span>Official Google Search Console Performance Data</span>
              </div>
              <button 
                type="button" 
                className="btn btn-sm btn-aqua-solid" 
                onClick={() => setLightboxOpen(true)}
                style={{ padding: "6px 14px", fontSize: "0.8rem" }}
              >
                <i className="fa-solid fa-magnifying-glass-plus"></i> Enlarge Full Report
              </button>
            </div>

            {/* Screenshot Viewport */}
            <div 
              className="gsc-trigger" 
              onClick={() => setLightboxOpen(true)} 
              style={{ position: "relative", background: "#090d16", cursor: "pointer", textAlign: "center" }} 
              role="button" 
              tabIndex={0} 
              title="Click to zoom Search Console screenshot"
            >
              <img 
                src={imgSrc} 
                alt={portfolio.title} 
                style={{ width: "100%", maxHeight: "520px", objectFit: "contain", display: "block", margin: "0 auto" }} 
              />
              <div className="gsc-proof-overlay">
                <i className="fa-solid fa-magnifying-glass-plus"></i> Click to Zoom and Inspect Original High-Resolution Screenshot
              </div>
            </div>

            {/* Metrics Highlight Grid */}
            {metrics && Object.keys(metrics).length > 0 && (
              <div className="gsc-detail-metrics-grid">
                {Object.entries(metrics).map(([key, val]) => (
                  <div key={key} className="gsc-detail-metric-cell">
                    <div className="gsc-detail-metric-val">{val}</div>
                    <div className="gsc-detail-metric-lbl">{key.replace(/_/g, " ")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CASE STUDY BREAKDOWN NARRATIVE */}
          <div style={{ background: "#ffffff", border: "1px solid var(--digi-border)", borderRadius: "var(--radius-lg)", padding: "40px", boxShadow: "var(--shadow-soft)", lineHeight: 1.8 }}>
            
            {/* Summary Callout */}
            <div style={{ background: "#f8fafc", borderLeft: "4px solid var(--digi-blue)", padding: "20px 24px", borderRadius: "0 8px 8px 0", marginBottom: "36px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--digi-blue)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-bullseye"></i> Executive Summary
              </h3>
              <p style={{ margin: 0, color: "var(--digi-text-main)", fontSize: "0.95rem" }}>{portfolio.summary}</p>
            </div>

            {/* Challenge */}
            <h2 style={{ fontSize: "1.45rem", color: "var(--digi-text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#f59e0b" }}></i> The Challenge &amp; Baseline Bottlenecks
            </h2>
            <p style={{ color: "var(--digi-text-body)", marginBottom: "36px", fontSize: "0.98rem" }}>
              {portfolio.challenge}
            </p>

            {/* Strategy */}
            <h2 style={{ fontSize: "1.45rem", color: "var(--digi-text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fa-solid fa-lightbulb" style={{ color: "var(--digi-blue)" }}></i> Strategic Organic Blueprint
            </h2>
            <p style={{ color: "var(--digi-text-body)", marginBottom: "36px", fontSize: "0.98rem" }}>
              {portfolio.strategy}
            </p>

            {/* Implementation */}
            <h2 style={{ fontSize: "1.45rem", color: "var(--digi-text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fa-solid fa-gears" style={{ color: "#06b6d4" }}></i> Technical Execution &amp; Optimization
            </h2>
            {Array.isArray(portfolio.implementation) ? (
              <ul style={{ color: "var(--digi-text-body)", marginBottom: "36px", fontSize: "0.98rem", paddingLeft: "20px" }}>
                {portfolio.implementation.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "var(--digi-text-body)", marginBottom: "36px", fontSize: "0.98rem" }}>
                {portfolio.implementation}
              </p>
            )}

            {/* Results */}
            <h2 style={{ fontSize: "1.45rem", color: "var(--digi-text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fa-solid fa-circle-check" style={{ color: "#10b981" }}></i> Compounding Results &amp; Revenue Impact
            </h2>
            <p style={{ color: "var(--digi-text-body)", marginBottom: "36px", fontSize: "0.98rem" }}>
              {portfolio.results}
            </p>

            {/* Testimonial Quote if present */}
            {portfolio.testimonials_quote && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "24px", borderRadius: "8px", marginBottom: "36px" }}>
                <p style={{ fontStyle: "italic", color: "#166534", marginBottom: "8px", fontSize: "1rem" }}>
                  &ldquo;{portfolio.testimonials_quote}&rdquo;
                </p>
                <span style={{ fontWeight: 700, color: "#15803d", fontSize: "0.88rem" }}>
                  — {portfolio.client_author || portfolio.client_name}
                </span>
              </div>
            )}

            {/* Bottom CTA Box */}
            <div style={{ marginTop: "40px", padding: "36px 30px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "var(--radius-md)", textAlign: "center", color: "#ffffff" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.6rem", marginBottom: "8px", fontWeight: 800 }}>
                Want Similar Organic Results for Your Business?
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto 20px" }}>
                Let&apos;s analyze your website search performance and identify high-value keyword opportunities with an actionable audit.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-lg btn-aqua-solid">
                  <i className="fa-solid fa-rocket"></i> Request Free Proposal
                </Link>
                <Link href="/portfolio" className="btn btn-lg btn-outline-blue" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}>
                  View Other Proofs
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="gsc-lightbox-backdrop active" 
          onClick={() => setLightboxOpen(false)}
        >
          <div className="gsc-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <div className="gsc-lightbox-header">
              <div className="gsc-lightbox-title">
                <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i>
                <span>{portfolio.title}</span>
              </div>
              <button 
                type="button" 
                className="gsc-lightbox-close" 
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Preview"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="gsc-lightbox-image-wrap">
              <img src={imgSrc} alt={portfolio.title} />
            </div>
            <div className="gsc-lightbox-footer">
              <span>{modalStats}</span>
              <span style={{ color: "#10b981", fontWeight: 600 }}>
                <i className="fa-solid fa-shield-check"></i> Google Search Console Data
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
