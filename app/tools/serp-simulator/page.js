"use client";

import { useState } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function SerpSimulator() {
  const [title, setTitle] = useState("Enterprise SEO Services & Organic Growth Strategy | Digi Solution");
  const [url, setUrl] = useState("https://digisolution.com/services/technical-seo");
  const [description, setDescription] = useState("Scale your organic search revenue with forensic technical audits, semantic keyword clustering, and high-authority digital PR backlinks. Free consultation.");
  const [device, setDevice] = useState("desktop");
  const [showRating, setShowRating] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);

  // Calculations & limits
  const titleLength = title.length;
  const descLength = description.length;
  const titlePixelEst = Math.round(titleLength * 8.5); // Approx 580px desktop pixel cutoff
  const isTitleOver = titleLength > 60 || titlePixelEst > 580;
  const isDescOver = descLength > 160;

  const presets = [
    {
      name: "Agency Service",
      title: "Enterprise SEO Services & Organic Growth Strategy | Digi Solution",
      url: "https://digisolution.com/services/technical-seo",
      desc: "Scale your organic search revenue with forensic technical audits, semantic keyword clustering, and high-authority digital PR backlinks. Free consultation."
    },
    {
      name: "E-Commerce Product",
      title: "Ergonomic Mechanical Keyboard - Wireless RGB | KeyPro Tech",
      url: "https://example.com/products/wireless-keyboard",
      desc: "Shop our custom mechanical keyboard with hot-swappable tactile switches, per-key RGB lighting, and 80-hour battery life. Fast worldwide shipping."
    },
    {
      name: "Local Service",
      title: "Top Rated Emergency Plumber in Brooklyn, NY | 24/7 Fast Response",
      url: "https://brooklynplumbingpro.com/emergency-service",
      desc: "Licensed & insured local plumbers available 24/7 across Brooklyn and NYC. Burst pipes, leak detection, drain cleaning. Call now for same-day service!"
    }
  ];

  const applyPreset = (p) => {
    setTitle(p.title);
    setUrl(p.url);
    setDescription(p.desc);
  };

  const copyMetaTags = () => {
    const metaCode = `<title>${title}</title>\n<meta name="description" content="${description}" />\n<link rel="canonical" href="${url}" />`;
    navigator.clipboard.writeText(metaCode);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-brands fa-google"></i> SERP Snippet Previewer
          </div>
          <h1 className="page-title">Google SERP Simulator & Meta Preview Tool</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Simulate how your meta title and description appear in Google Desktop and Mobile search results with real-time character &amp; pixel width limits.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          {/* Quick Presets Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "24px", background: "#ffffff", padding: "14px 20px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>
              <i className="fa-solid fa-wand-magic-sparkles text-primary"></i> Quick Presets:
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  style={{ fontSize: "0.8rem", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", cursor: "pointer", transition: "all 0.2s" }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="serp-simulator-grid">
            {/* INPUTS COLUMN */}
            <div className="serp-inputs-card">
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 18px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-sliders text-primary"></i> Meta Tag Controls
              </h2>

              {/* Title Input */}
              <div className="form-group">
                <div className="form-label">
                  <span>Page Title Tag</span>
                  <span style={{ fontSize: "0.78rem", color: isTitleOver ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                    {titleLength} / 60 chars (~{titlePixelEst}px / 580px)
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  placeholder="Enter high-ranking page title..."
                />
                <div style={{ height: "4px", width: "100%", background: "#e2e8f0", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (titlePixelEst / 580) * 100)}%`, background: isTitleOver ? "#ef4444" : titlePixelEst > 500 ? "#f59e0b" : "#10b981", transition: "width 0.2s ease" }}></div>
                </div>
              </div>

              {/* URL Input */}
              <div className="form-group">
                <div className="form-label">
                  <span>Destination URL</span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>Canonical Web Address</span>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-input"
                  placeholder="https://example.com/page-slug"
                />
              </div>

              {/* Meta Description Input */}
              <div className="form-group">
                <div className="form-label">
                  <span>Meta Description</span>
                  <span style={{ fontSize: "0.78rem", color: isDescOver ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                    {descLength} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea"
                  placeholder="Enter compelling meta description with call to action..."
                />
                <div style={{ height: "4px", width: "100%", background: "#e2e8f0", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (descLength / 160) * 100)}%`, background: isDescOver ? "#ef4444" : descLength > 140 ? "#f59e0b" : "#10b981", transition: "width 0.2s ease" }}></div>
                </div>
              </div>

              {/* Rich Snippets Toggles */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", marginTop: "16px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.04em" }}>
                  Rich SERP Enhancements
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={showRating}
                      onChange={(e) => setShowRating(e.target.checked)}
                      style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
                    />
                    Star Rating (4.9 ★)
                  </label>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={showDate}
                      onChange={(e) => setShowDate(e.target.checked)}
                      style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
                    />
                    Published Date
                  </label>
                </div>
              </div>

              {/* Copy HTML Button */}
              <div style={{ marginTop: "22px" }}>
                <button
                  type="button"
                  onClick={copyMetaTags}
                  style={{ width: "100%", padding: "10px 16px", borderRadius: "4px", background: copiedMeta ? "#059669" : "#0f172a", color: "#ffffff", border: "none", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}
                >
                  <i className={`fa-solid ${copiedMeta ? "fa-check" : "fa-code"}`}></i>
                  {copiedMeta ? "HTML Meta Tags Copied!" : "Copy Meta Tags HTML Code"}
                </button>
              </div>
            </div>

            {/* LIVE PREVIEW COLUMN */}
            <div className="serp-preview-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <h3 className="preview-heading" style={{ margin: 0 }}>
                  <i className="fa-brands fa-google text-primary"></i> Live Google SERP Preview
                </h3>

                {/* Device Selector */}
                <div style={{ display: "inline-flex", background: "#f1f5f9", padding: "3px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <button
                    type="button"
                    onClick={() => setDevice("desktop")}
                    style={{ padding: "6px 14px", border: "none", borderRadius: "6px", background: device === "desktop" ? "#2563eb" : "transparent", color: device === "desktop" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.15s" }}
                  >
                    <i className="fa-solid fa-desktop"></i> Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevice("mobile")}
                    style={{ padding: "6px 14px", border: "none", borderRadius: "6px", background: device === "mobile" ? "#2563eb" : "transparent", color: device === "mobile" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.15s" }}
                  >
                    <i className="fa-solid fa-mobile-screen"></i> Mobile
                  </button>
                </div>
              </div>

              {/* GOOGLE SNIPPET DISPLAY */}
              <div className={`serp-snippet-box ${device}`}>
                {/* Breadcrumb & Favicon Row */}
                <div className="serp-breadcrumb-row">
                  <div className="serp-favicon">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div className="serp-url-text">
                    <span style={{ fontWeight: 600, color: "#202124" }}>
                      {url.replace(/^https?:\/\//, '').split('/')[0] || "example.com"}
                    </span>
                    <span style={{ color: "#5f6368", fontSize: "0.78rem" }}>
                      {url.includes('/') && url.split('/').slice(3).filter(Boolean).length > 0
                        ? ` › ${url.split('/').slice(3).filter(Boolean).join(' › ')}`
                        : ''}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="serp-title-link">
                  {title || "Enter a page title..."}
                </div>

                {/* Rich Snippet Details */}
                {(showRating || showDate) && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8rem", color: "#5f6368", margin: "3px 0 6px" }}>
                    {showRating && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#e37400", fontWeight: 600 }}>
                        <span>★★★★★</span>
                        <span style={{ color: "#5f6368", fontWeight: 400 }}>4.9 (128) · $499.00 · In stock</span>
                      </span>
                    )}
                    {showDate && (
                      <span style={{ color: "#70757a" }}>
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} —
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="serp-desc-text">
                  {description || "Enter a meta description to see how it renders on Google search results..."}
                </div>
              </div>

              {/* Guidelines Box */}
              <div className="serp-tips-box">
                <h4>
                  <i className="fa-solid fa-circle-check text-success"></i> Search Engine Guidelines:
                </h4>
                <ul>
                  <li><strong>Title Limit:</strong> Under 580 pixels (~55-60 characters) avoids truncation with "...".</li>
                  <li><strong>Target Keywords:</strong> Place high-intent keyword phrases close to the front of the title.</li>
                  <li><strong>Meta Description:</strong> Keep between 120-155 characters with a compelling value proposition and clear CTA.</li>
                  <li><strong>Brand Inclusion:</strong> Append <code>| Brand Name</code> at the end for recognized brand credibility.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related SEO Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Complement your SERP snippet optimization with deep auditing, structured markup, and crawler rules.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/website-seo-analyzer">Website SEO Analyzer</Link></h4>
                <p className="tool-ref-desc">Audit real-time on-page metadata, canonicals, H1-H6 tags, and images.</p>
                <div className="tool-ref-footer"><Link href="/tools/website-seo-analyzer" className="tool-ref-link">Audit Website <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#e0e7ff", color: "#4338ca" }}>
                  <i className="fa-solid fa-code"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/schema-markup-generator">Schema Markup Generator</Link></h4>
                <p className="tool-ref-desc">Build Google-compliant JSON-LD structured data for rich snippets and FAQs.</p>
                <div className="tool-ref-footer"><Link href="/tools/schema-markup-generator" className="tool-ref-link">Generate Schema <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <i className="fa-solid fa-chart-simple"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/keyword-density-checker">Keyword Density Checker</Link></h4>
                <p className="tool-ref-desc">Analyze n-gram frequency, readability ease, and prevent keyword stuffing.</p>
                <div className="tool-ref-footer"><Link href="/tools/keyword-density-checker" className="tool-ref-link">Check Density <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <ToolFaqAccordion
            title="Google SERP Snippet &amp; CTR Optimization FAQ"
            faqs={[
              {
                q: "What is the recommended title tag length in characters and pixels for Google?",
                a: "Google displays title tags up to approximately 580 to 600 pixels in width on desktop and about 500 to 550 pixels on mobile. This generally translates to 50 to 60 characters. Titles exceeding this limit will be truncated with an ellipsis (...)."
              },
              {
                q: "How long should a meta description be for maximum click-through rate?",
                a: "The ideal meta description length is 120 to 155 characters (up to ~960 pixels on desktop and ~680 pixels on mobile). A compelling meta description should include your primary keyword, clear value proposition, and an active call-to-action (CTA)."
              },
              {
                q: "Why does Google sometimes rewrite my title or meta description in search results?",
                a: "Google dynamically generates snippet titles and descriptions if it determines the existing tags do not accurately reflect the page content or directly answer the user's specific query. Writing query-relevant, concise tags minimizes the chance of Google rewriting them."
              },
              {
                q: "How does SERP snippet optimization impact organic search rankings?",
                a: "While meta descriptions are not a direct ranking factor, a high Click-Through Rate (CTR) signals to Google that your result satisfies user intent. Higher CTR drives more organic traffic and improves conversion volume without requiring higher raw positions."
              }
            ]}
          />

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Need Enterprise-Grade Technical SEO &amp; Organic Ranking?</h4>
            <p>Our tailored campaigns combine high-authority digital PR, technical audits, and content clusters.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-calendar-check"></i> Book Strategy Session
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm">
                Technical SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
