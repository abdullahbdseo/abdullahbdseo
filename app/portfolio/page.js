"use client";

import { useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/lib/data";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' | 'grid'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [enlargedItem, setEnlargedItem] = useState(null);

  const categories = [
    { name: "SaaS & Enterprise SEO", slug: "saas" },
    { name: "E-Commerce SEO", slug: "ecommerce" }
  ];

  const filteredStudies = activeCategory === "all"
    ? caseStudies
    : caseStudies.filter(c => 
        (c.category_name && c.category_name.toLowerCase().includes(activeCategory)) ||
        (c.industry && c.industry.toLowerCase().includes(activeCategory)) ||
        c.slug.includes(activeCategory)
      );

  const maxSlides = Math.max(0, filteredStudies.length - 1);

  const handlePrev = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(maxSlides, prev + 1));
  };

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setCurrentSlide(0);
  };

  return (
    <div className="portfolio-page-wrapper">
      {/* Hero Header Section */}
      <section className="digi-hero-section" style={{ padding: "60px 0 40px", textAlign: "center" }}>
        <div className="container">
          <span className="gsc-section-badge">
            <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i> Verified Search Console Performance
          </span>
          <h1 style={{ fontSize: "3rem", margin: "12px 0 16px", fontWeight: 800, color: "var(--digi-text-main)" }}>
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
          <div className="gsc-summary-banner" style={{ marginTop: 0 }}>
            <div className="gsc-summary-stat">
              <div className="gsc-stat-icon-wrap" style={{ background: "rgba(26, 115, 232, 0.15)", color: "#38bdf8" }}>
                <i className="fa-solid fa-arrow-pointer"></i>
              </div>
              <div>
                <div className="gsc-stat-val color-clicks" style={{ color: "#60a5fa" }}>2.0M+</div>
                <div className="gsc-stat-lbl">Total Organic Clicks</div>
              </div>
            </div>

            <div className="gsc-summary-stat">
              <div className="gsc-stat-icon-wrap" style={{ background: "rgba(142, 36, 170, 0.15)", color: "#c084fc" }}>
                <i className="fa-solid fa-eye"></i>
              </div>
              <div>
                <div className="gsc-stat-val color-impressions" style={{ color: "#c084fc" }}>2.2M+</div>
                <div className="gsc-stat-lbl">Search Impressions</div>
              </div>
            </div>

            <div className="gsc-summary-stat">
              <div className="gsc-stat-icon-wrap" style={{ background: "rgba(0, 137, 123, 0.15)", color: "#34d399" }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <div className="gsc-stat-val color-ctr" style={{ color: "#34d399" }}>92.8%</div>
                <div className="gsc-stat-lbl">Peak Click-Through Rate</div>
              </div>
            </div>

            <div className="gsc-summary-stat">
              <div className="gsc-stat-icon-wrap" style={{ background: "rgba(230, 81, 0, 0.15)", color: "#fbbf24" }}>
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <div className="gsc-stat-val color-position" style={{ color: "#fbbf24" }}>#1 Avg</div>
                <div className="gsc-stat-lbl">Dominant Search Rank</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section" style={{ paddingTop: "10px" }}>
        <div className="container">
          {/* Category Filter Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
            <button 
              type="button" 
              className={`btn btn-sm ${activeCategory === "all" ? "btn-blue-solid" : "btn-outline-blue"}`}
              onClick={() => handleCategoryChange("all")}
            >
              <i className="fa-solid fa-layer-group"></i> All Projects ({caseStudies.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`btn btn-sm ${activeCategory === cat.slug ? "btn-blue-solid" : "btn-outline-blue"}`}
                onClick={() => handleCategoryChange(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Portfolios Showcase Carousel / Grid */}
          <div className={`gsc-carousel-wrapper ${viewMode === "grid" ? "view-grid" : ""}`} id="portfolioCarousel">
            <div className="gsc-carousel-header">
              <div className="gsc-carousel-meta">
                <span className="gsc-carousel-live-pill">
                  <span className="gsc-live-dot"></span> Verified Results
                </span>
                <span className="gsc-carousel-counter">
                  Showing <strong>{filteredStudies.length > 0 ? "1 - " + filteredStudies.length : "0"}</strong> of <strong>{filteredStudies.length}</strong> Results
                </span>
              </div>
              <div className="gsc-carousel-controls">
                <div className="gsc-view-toggle">
                  <button 
                    type="button" 
                    className={`gsc-view-btn ${viewMode === "carousel" ? "active" : ""}`} 
                    onClick={() => setViewMode("carousel")}
                    title="Carousel Slider View"
                  >
                    <i className="fa-solid fa-sliders"></i> Slider
                  </button>
                  <button 
                    type="button" 
                    className={`gsc-view-btn ${viewMode === "grid" ? "active" : ""}`} 
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <i className="fa-solid fa-border-all"></i> Grid
                  </button>
                </div>
                {viewMode === "carousel" && (
                  <div className="gsc-carousel-nav">
                    <button 
                      type="button" 
                      className="gsc-nav-btn gsc-prev-btn" 
                      onClick={handlePrev} 
                      disabled={currentSlide === 0}
                      aria-label="Previous Slide" 
                      title="Previous Slide"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button 
                      type="button" 
                      className="gsc-nav-btn gsc-next-btn" 
                      onClick={handleNext} 
                      disabled={currentSlide >= maxSlides}
                      aria-label="Next Slide" 
                      title="Next Slide"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Carousel Viewport & Track */}
            <div className="gsc-carousel-viewport">
              <div 
                className="gsc-carousel-track" 
                style={viewMode === "carousel" ? { transform: `translateX(-${currentSlide * 33.333}%)` } : {}}
              >
                {filteredStudies.map((item) => {
                  const metrics = item.metrics || {};
                  const imgSrc = item.featured_image || item.gsc_screenshot;
                  const modalTitle = item.title;
                  const modalStats = (item.industry || "SEO Client") + " • " + (item.duration || "3 Months") + " • GSC Verified Report";

                  return (
                    <div key={item.id} className="gsc-carousel-slide">
                      <div className="gsc-proof-card">
                        {/* Image with interactive zoom trigger */}
                        <div 
                          className="gsc-proof-media gsc-trigger" 
                          onClick={() => setEnlargedItem({ src: imgSrc, title: modalTitle, stats: modalStats })}
                          role="button" 
                          tabIndex={0} 
                          title="Click to enlarge Google Search Console report"
                        >
                          <span className="gsc-verified-badge">
                            <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i> GSC Verified
                          </span>
                          <span className="gsc-time-badge">
                            <i className="fa-regular fa-clock"></i> {item.duration || "3 Months"}
                          </span>
                          <img src={imgSrc} alt={item.title} className="gsc-proof-img" loading="lazy" />
                          <div className="gsc-proof-overlay">
                            <i className="fa-solid fa-magnifying-glass-plus"></i> Click to Enlarge Report
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="gsc-proof-body">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <span className="gsc-proof-industry">{item.industry || "E-Commerce / Tech"}</span>
                            <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700, background: "#ecfdf5", padding: "2px 8px", borderRadius: "4px" }}>
                              <i className="fa-solid fa-shield-check"></i> Live Proof
                            </span>
                          </div>

                          <h3 className="gsc-proof-title">
                            <Link href={`/portfolio/${item.slug}`} style={{ color: "inherit" }}>
                              {item.title}
                            </Link>
                          </h3>
                          <p className="gsc-proof-desc">
                            {item.summary && item.summary.length > 120 ? item.summary.slice(0, 120) + "..." : item.summary}
                          </p>

                          {/* Color-coded GSC metrics row */}
                          <div className="gsc-metrics-strip">
                            {metrics.total_clicks && (
                              <div className="gsc-metric-cell">
                                <span className="gsc-metric-num color-clicks">{metrics.total_clicks}</span>
                                <span className="gsc-metric-tag">Clicks</span>
                              </div>
                            )}

                            {metrics.total_impressions && (
                              <div className="gsc-metric-cell">
                                <span className="gsc-metric-num color-impressions">{metrics.total_impressions}</span>
                                <span className="gsc-metric-tag">Impr.</span>
                              </div>
                            )}

                            {metrics.avg_ctr && (
                              <div className="gsc-metric-cell">
                                <span className="gsc-metric-num color-ctr">{metrics.avg_ctr}</span>
                                <span className="gsc-metric-tag">Avg CTR</span>
                              </div>
                            )}

                            {metrics.avg_position && (
                              <div className="gsc-metric-cell">
                                <span className="gsc-metric-num color-position">{metrics.avg_position}</span>
                                <span className="gsc-metric-tag">Avg Pos</span>
                              </div>
                            )}
                          </div>

                          {/* Action Footer */}
                          <div className="gsc-proof-footer">
                            <button 
                              type="button" 
                              className="btn-gsc-zoom" 
                              onClick={() => setEnlargedItem({ src: imgSrc, title: modalTitle, stats: modalStats })}
                            >
                              <i className="fa-solid fa-magnifying-glass-plus"></i> Inspect
                            </button>
                            <Link href={`/portfolio/${item.slug}`} className="btn btn-sm btn-blue-solid">
                              Full Case Study <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Pagination Dots for Carousel Mode */}
            {viewMode === "carousel" && filteredStudies.length > 1 && (
              <div className="gsc-carousel-bottom-bar">
                <div className="gsc-carousel-dots">
                  {filteredStudies.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gsc-carousel-dot ${currentSlide === idx ? "active" : ""}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Contact Ribbon */}
          <div style={{ marginTop: "60px", background: "linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)", borderRadius: "var(--radius-lg)", padding: "40px", color: "#ffffff", textAlign: "center" }}>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", marginBottom: "10px", fontWeight: 800 }}>Ready to Experience Record Organic Traffic?</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 24px" }}>
              Request a comprehensive preliminary website audit. We&apos;ll diagnose your current search bottlenecks and craft a custom organic strategy roadmap.
            </p>
            <Link href="/contact" className="btn btn-lg btn-aqua-solid" style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              Get Your Free SEO Audit <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {enlargedItem && (
        <div 
          className="gsc-lightbox-backdrop active" 
          onClick={() => setEnlargedItem(null)}
        >
          <div className="gsc-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <div className="gsc-lightbox-header">
              <div className="gsc-lightbox-title">
                <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i>
                <span>{enlargedItem.title}</span>
              </div>
              <button 
                type="button" 
                className="gsc-lightbox-close" 
                onClick={() => setEnlargedItem(null)}
                aria-label="Close Preview"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="gsc-lightbox-image-wrap">
              <img src={enlargedItem.src} alt={enlargedItem.title} />
            </div>
            <div className="gsc-lightbox-footer">
              <span>{enlargedItem.stats}</span>
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
