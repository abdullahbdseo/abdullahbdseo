"use client";

import { useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/lib/data";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [enlargedImage, setEnlargedImage] = useState(null);

  const categories = [
    { name: "SaaS & B2B", slug: "saas" },
    { name: "E-Commerce", slug: "ecommerce" },
    { name: "Local SEO", slug: "local" }
  ];

  const filteredStudies = activeCategory === "all"
    ? caseStudies
    : caseStudies.filter(c => c.industry?.toLowerCase().includes(activeCategory) || c.slug.includes(activeCategory));

  return (
    <div className="portfolio-page-wrapper">
      {/* Hero Header */}
      <section className="digi-hero-section" style={{ padding: "60px 0 40px", textAlign: "center" }}>
        <div className="container">
          <span className="gsc-section-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eef2ff", color: "#4361ee", padding: "6px 16px", borderRadius: "9999px", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", border: "1px solid #dbeafe", marginBottom: "14px" }}>
            <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i> Verified Search Console Performance
          </span>
          <h1 style={{ fontSize: "3rem", margin: "12px 0 16px", fontWeight: 800 }}>
            SEO Case Studies &amp; Real Results
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--digi-text-body)", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
            Explore verifiable Google Search Console data, strategic blueprints, and organic growth trajectories from real client engagements.
          </p>
        </div>
      </section>

      {/* Aggregate Summary Numbers Banner */}
      <section style={{ marginTop: "-20px", paddingBottom: "20px" }}>
        <div className="container">
          <div className="gsc-summary-banner" style={{ marginTop: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "8px", padding: "30px", color: "#ffffff", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.3)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="gsc-summary-stat" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "8px 12px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(26, 115, 232, 0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <i className="fa-solid fa-arrow-pointer"></i>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#60a5fa" }}>2.0M+</div>
                <div style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 600 }}>Total Organic Clicks</div>
              </div>
            </div>

            <div className="gsc-summary-stat" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "8px 12px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(142, 36, 170, 0.15)", color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <i className="fa-solid fa-eye"></i>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#c084fc" }}>2.2M+</div>
                <div style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 600 }}>Search Impressions</div>
              </div>
            </div>

            <div className="gsc-summary-stat" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "8px 12px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(0, 137, 123, 0.15)", color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#34d399" }}>92.8%</div>
                <div style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 600 }}>Peak Click-Through Rate</div>
              </div>
            </div>

            <div className="gsc-summary-stat" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "8px 12px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(230, 81, 0, 0.15)", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fbbf24" }}>#1 Avg</div>
                <div style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 600 }}>Dominant Search Rank</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section" style={{ paddingTop: "10px" }}>
        <div className="container">
          {/* Category Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
            <button 
              type="button"
              className={`btn btn-sm ${activeCategory === "all" ? "btn-blue-solid" : "btn-outline-blue"}`}
              onClick={() => setActiveCategory("all")}
            >
              <i className="fa-solid fa-layer-group"></i> All Projects ({caseStudies.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`btn btn-sm ${activeCategory === cat.slug ? "btn-blue-solid" : "btn-outline-blue"}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "30px" }}>
            {filteredStudies.map((item) => (
              <div key={item.id} className="gsc-proof-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                {/* Image */}
                <div 
                  style={{ position: "relative", cursor: "pointer", height: "220px", overflow: "hidden", background: "#f1f5f9" }}
                  onClick={() => setEnlargedImage(item.gsc_screenshot || item.featured_image)}
                >
                  <span style={{ position: "absolute", top: "12px", left: "12px", zIndex: 2, background: "rgba(15, 23, 42, 0.85)", color: "#ffffff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i> GSC Verified
                  </span>
                  <span style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2, background: "rgba(67, 97, 238, 0.9)", color: "#ffffff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px" }}>
                    <i className="fa-regular fa-clock"></i> {item.duration}
                  </span>
                  <img 
                    src={item.gsc_screenshot || item.featured_image} 
                    alt={item.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>

                {/* Card Body */}
                <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                      {item.industry}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700, background: "#ecfdf5", padding: "2px 8px", borderRadius: "4px" }}>
                      <i className="fa-solid fa-shield-check"></i> Live Proof
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>
                    <Link href={`/portfolio/${item.slug}`} style={{ color: "#0f172a" }}>
                      {item.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, marginBottom: "16px" }}>
                    {item.summary}
                  </p>

                  {/* Metrics Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", marginTop: "auto", marginBottom: "16px", textAlign: "center" }}>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: "#2563eb" }}>{item.traffic_growth}</div>
                      <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "#64748b", fontWeight: 600 }}>Traffic</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: "#16a34a" }}>{item.keyword_growth}</div>
                      <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "#64748b", fontWeight: 600 }}>Keywords</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: "#d97706" }}>{item.revenue_impact}</div>
                      <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "#64748b", fontWeight: 600 }}>Revenue</div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-blue"
                      style={{ flex: 1 }}
                      onClick={() => setEnlargedImage(item.gsc_screenshot || item.featured_image)}
                    >
                      <i className="fa-solid fa-magnifying-glass-plus"></i> Inspect
                    </button>
                    <Link href={`/portfolio/${item.slug}`} className="btn btn-sm btn-blue-solid" style={{ flex: 1.2, textAlign: "center" }}>
                      Case Study <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div style={{ marginTop: "60px", background: "linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)", borderRadius: "8px", padding: "40px", color: "#ffffff", textAlign: "center" }}>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", marginBottom: "10px" }}>Ready to Experience Record Organic Traffic?</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 24px" }}>
              Request a comprehensive preliminary website audit. We&apos;ll diagnose your current search bottlenecks and craft a custom organic strategy roadmap.
            </p>
            <Link href="/contact" className="btn btn-lg btn-aqua-solid" style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              Get Your Free SEO Audit <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal Lightbox */}
      {enlargedImage && (
        <div 
          style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={() => setEnlargedImage(null)}
        >
          <div style={{ position: "relative", maxWidth: "900px", width: "100%", background: "#ffffff", borderRadius: "8px", overflow: "hidden", padding: "10px" }} onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              onClick={() => setEnlargedImage(null)} 
              style={{ position: "absolute", top: "16px", right: "16px", background: "#0f172a", color: "#ffffff", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img src={enlargedImage} alt="GSC Proof Full View" style={{ width: "100%", height: "auto", borderRadius: "4px" }} />
          </div>
        </div>
      )}
    </div>
  );
}
