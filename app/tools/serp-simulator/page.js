"use client";

import { useState } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function SerpSimulator() {
  const [activePlatform, setActivePlatform] = useState("google"); // google, facebook, twitter, linkedin, whatsapp
  const [device, setDevice] = useState("desktop"); // desktop, mobile

  const [title, setTitle] = useState("Abdullah Saleh | Top SEO Expert & Organic Growth Consultant in Bangladesh");
  const [url, setUrl] = useState("https://abdullahbdseo.com/services/technical-seo-service-in-bangladesh");
  const [description, setDescription] = useState("Scale organic rankings with forensic technical SEO audits, high-DA backlink outreach, and entity topic clusters. 100% white-hat ROI campaigns.");
  const [siteName, setSiteName] = useState("Abdullah Saleh SEO");
  const [imageUrl, setImageUrl] = useState("https://abdullahbdseo.vercel.app/images/seo_hero_analytics_dashboard.jpg");
  const [twitterHandle, setTwitterHandle] = useState("@abdullahbdseo");

  const [showRating, setShowRating] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);

  // Calculations & limits
  const titleLength = title.length;
  const descLength = description.length;
  const titlePixelEst = Math.round(titleLength * 8.5); // Approx 580px desktop cutoff
  const isTitleOver = titleLength > 60 || titlePixelEst > 580;
  const isDescOver = descLength > 160;

  const presets = [
    {
      name: "SEO Agency / Consultant",
      title: "Abdullah Saleh | Top SEO Expert & Organic Growth Consultant in Bangladesh",
      url: "https://abdullahbdseo.com/services/technical-seo-service-in-bangladesh",
      desc: "Scale organic rankings with forensic technical SEO audits, high-DA backlink outreach, and entity topic clusters. 100% white-hat ROI campaigns.",
      siteName: "Abdullah Saleh SEO",
      image: "https://abdullahbdseo.vercel.app/images/seo_hero_analytics_dashboard.jpg"
    },
    {
      name: "E-Commerce Product",
      title: "Custom Mechanical Keyboard - Wireless RGB | KeyPro Tech",
      url: "https://example.com/products/wireless-keyboard",
      desc: "Shop our custom mechanical keyboard with hot-swappable tactile switches, per-key RGB lighting, and 80-hour battery life. Fast worldwide shipping.",
      siteName: "KeyPro Tech",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"
    },
    {
      name: "Local Service Business",
      title: "Top Rated Emergency Plumber in Brooklyn, NY | 24/7 Fast Response",
      url: "https://brooklynplumbingpro.com/emergency-service",
      desc: "Licensed & insured local plumbers available 24/7 across Brooklyn and NYC. Burst pipes, leak detection, drain cleaning. Call now for same-day service!",
      siteName: "Brooklyn Plumbing Pro",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
    }
  ];

  const applyPreset = (p) => {
    setTitle(p.title);
    setUrl(p.url);
    setDescription(p.desc);
    if (p.siteName) setSiteName(p.siteName);
    if (p.image) setImageUrl(p.image);
  };

  const generateFullMetaHtml = () => {
    const cleanUrl = url || "https://example.com";
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<link rel="canonical" href="${cleanUrl}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

<!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${cleanUrl}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${cleanUrl}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />
${twitterHandle ? `<meta name="twitter:site" content="${twitterHandle}" />\n<meta name="twitter:creator" content="${twitterHandle}" />` : ""}`;
  };

  const copyMetaTags = () => {
    navigator.clipboard.writeText(generateFullMetaHtml());
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2200);
  };

  const domainOnly = url.replace(/^https?:\/\//, '').split('/')[0] || "example.com";

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section" style={{ padding: "50px 0 30px", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", marginBottom: "12px" }}>
            <i className="fa-solid fa-arrow-left"></i> All Free SEO Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", color: "#2563eb", padding: "4px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 auto 10px" }}>
            <i className="fa-solid fa-share-nodes"></i> Real-Time Meta &amp; Social Card Simulator
          </div>
          <h1 className="page-title" style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
            Meta Tag &amp; Open Graph (OG) Previewer
          </h1>
          <p className="page-subtitle max-w-2xl mx-auto" style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Preview exactly how your website links appear on <strong>Google SERP, Facebook, Twitter (X), LinkedIn, and WhatsApp</strong> with pixel limits and 1-click meta tag generator.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "25px", paddingBottom: "70px" }}>
        <div className="container" style={{ maxWidth: "1180px" }}>
          
          {/* Quick Presets Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "24px", background: "#ffffff", padding: "12px 18px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
              <i className="fa-solid fa-wand-magic-sparkles text-primary"></i> Quick Presets:
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  style={{ fontSize: "0.78rem", fontWeight: 700, padding: "5px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", cursor: "pointer", transition: "all 0.2s" }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="serp-simulator-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "28px", alignItems: "start" }}>
            
            {/* INPUTS COLUMN */}
            <div className="serp-inputs-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                <i className="fa-solid fa-sliders text-primary"></i> Meta &amp; OpenGraph Controls
              </h2>

              {/* Title Input */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <div className="form-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                  <span style={{ color: "#334155" }}>Page Title (og:title)</span>
                  <span style={{ fontSize: "0.76rem", color: isTitleOver ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                    {titleLength} / 60 chars (~{titlePixelEst}px / 580px)
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                  placeholder="Enter high-ranking page title..."
                />
                <div style={{ height: "4px", width: "100%", background: "#e2e8f0", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (titlePixelEst / 580) * 100)}%`, background: isTitleOver ? "#ef4444" : titlePixelEst > 500 ? "#f59e0b" : "#10b981", transition: "width 0.2s ease" }}></div>
                </div>
              </div>

              {/* URL Input */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <div className="form-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                  <span style={{ color: "#334155" }}>Canonical URL (og:url)</span>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 500 }}>Full Target Link</span>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-input"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                  placeholder="https://example.com/page-slug"
                />
              </div>

              {/* Meta Description Input */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <div className="form-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                  <span style={{ color: "#334155" }}>Meta Description (og:description)</span>
                  <span style={{ fontSize: "0.76rem", color: isDescOver ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                    {descLength} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem", resize: "vertical" }}
                  placeholder="Enter compelling description with call to action..."
                />
                <div style={{ height: "4px", width: "100%", background: "#e2e8f0", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (descLength / 160) * 100)}%`, background: isDescOver ? "#ef4444" : descLength > 140 ? "#f59e0b" : "#10b981", transition: "width 0.2s ease" }}></div>
                </div>
              </div>

              {/* Social OG Image & Brand Settings */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "5px" }}>Brand / Site Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                    placeholder="e.g. Abdullah SEO"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "5px" }}>Twitter / X Handle</label>
                  <input
                    type="text"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                    placeholder="e.g. @abdullahbdseo"
                  />
                </div>
              </div>

              {/* OG Image URL */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "5px" }}>
                  Open Graph Image URL (1200x630px Recommended)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                  placeholder="https://example.com/images/og-image.jpg"
                />
              </div>

              {/* Rich Snippets Toggles */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", marginTop: "16px" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.04em" }}>
                  Google SERP Snippet Elements
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={showRating}
                      onChange={(e) => setShowRating(e.target.checked)}
                      style={{ width: "15px", height: "15px", accentColor: "#2563eb" }}
                    />
                    Star Rating (4.9 ★)
                  </label>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={showDate}
                      onChange={(e) => setShowDate(e.target.checked)}
                      style={{ width: "15px", height: "15px", accentColor: "#2563eb" }}
                    />
                    Published Date
                  </label>
                </div>
              </div>

              {/* Copy HTML Button */}
              <div style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={copyMetaTags}
                  style={{ width: "100%", padding: "11px 16px", borderRadius: "4px", background: copiedMeta ? "#059669" : "#0f172a", color: "#ffffff", border: "none", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}
                >
                  <i className={`fa-solid ${copiedMeta ? "fa-check" : "fa-code"}`}></i>
                  {copiedMeta ? "Full Meta HTML Tags Copied!" : "Generate & Copy Meta HTML Code"}
                </button>
              </div>
            </div>

            {/* LIVE PREVIEW COLUMN */}
            <div className="serp-preview-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              
              {/* Platform Tabs */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", borderBottom: "2px solid #f1f5f9", paddingBottom: "12px", marginBottom: "20px" }}>
                <button
                  type="button"
                  onClick={() => setActivePlatform("google")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "4px",
                    border: "none",
                    background: activePlatform === "google" ? "#2563eb" : "#f1f5f9",
                    color: activePlatform === "google" ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-brands fa-google"></i> Google SERP
                </button>

                <button
                  type="button"
                  onClick={() => setActivePlatform("facebook")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "4px",
                    border: "none",
                    background: activePlatform === "facebook" ? "#1877f2" : "#f1f5f9",
                    color: activePlatform === "facebook" ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-brands fa-facebook"></i> Facebook
                </button>

                <button
                  type="button"
                  onClick={() => setActivePlatform("twitter")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "4px",
                    border: "none",
                    background: activePlatform === "twitter" ? "#0f172a" : "#f1f5f9",
                    color: activePlatform === "twitter" ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-brands fa-x-twitter"></i> Twitter / X
                </button>

                <button
                  type="button"
                  onClick={() => setActivePlatform("linkedin")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "4px",
                    border: "none",
                    background: activePlatform === "linkedin" ? "#0a66c2" : "#f1f5f9",
                    color: activePlatform === "linkedin" ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-brands fa-linkedin"></i> LinkedIn
                </button>

                <button
                  type="button"
                  onClick={() => setActivePlatform("whatsapp")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "4px",
                    border: "none",
                    background: activePlatform === "whatsapp" ? "#25d366" : "#f1f5f9",
                    color: activePlatform === "whatsapp" ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </button>
              </div>

              {/* 1. GOOGLE SERP PREVIEW */}
              {activePlatform === "google" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>Google Search Snippet</span>
                    <div style={{ display: "inline-flex", background: "#f1f5f9", padding: "2px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                      <button
                        type="button"
                        onClick={() => setDevice("desktop")}
                        style={{ padding: "4px 10px", border: "none", borderRadius: "4px", background: device === "desktop" ? "#2563eb" : "transparent", color: device === "desktop" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer" }}
                      >Desktop</button>
                      <button
                        type="button"
                        onClick={() => setDevice("mobile")}
                        style={{ padding: "4px 10px", border: "none", borderRadius: "4px", background: device === "mobile" ? "#2563eb" : "transparent", color: device === "mobile" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer" }}
                      >Mobile</button>
                    </div>
                  </div>

                  <div className={`serp-snippet-box ${device}`} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", background: "#ffffff", fontFamily: "arial, sans-serif" }}>
                    <div className="serp-breadcrumb-row" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                      <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#2563eb" }}>
                        <i className="fa-solid fa-globe"></i>
                      </div>
                      <div style={{ fontSize: "0.82rem", lineHeight: 1.2 }}>
                        <strong style={{ color: "#202124", display: "block" }}>{siteName || domainOnly}</strong>
                        <span style={{ color: "#4d5156", fontSize: "0.75rem" }}>{url}</span>
                      </div>
                    </div>

                    <div className="serp-title-link" style={{ fontSize: "1.25rem", color: "#1a0dab", fontWeight: 400, textDecoration: "none", cursor: "pointer", lineHeight: 1.3, marginBottom: "4px" }}>
                      {title || "Enter a page title..."}
                    </div>

                    {(showRating || showDate) && (
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.78rem", color: "#4d5156", margin: "2px 0 6px" }}>
                        {showRating && <span style={{ color: "#e37400", fontWeight: 700 }}>★★★★★ <span style={{ color: "#4d5156", fontWeight: 400 }}>4.9 (128 Reviews)</span></span>}
                        {showDate && <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} —</span>}
                      </div>
                    )}

                    <div className="serp-desc-text" style={{ fontSize: "0.88rem", color: "#4d5156", lineHeight: 1.5 }}>
                      {description || "Enter a meta description to see how it renders on Google search results..."}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. FACEBOOK OPEN GRAPH PREVIEW */}
              {activePlatform === "facebook" && (
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>Facebook Feed Share Card</div>
                  <div style={{ border: "1px solid #ced0d4", borderRadius: "4px", overflow: "hidden", background: "#f0f2f5", maxWidth: "520px" }}>
                    <div style={{ height: "240px", background: "#0f172a", overflow: "hidden", position: "relative" }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt="OG Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", fontSize: "0.9rem" }}>No Image Provided</div>
                      )}
                    </div>
                    <div style={{ padding: "12px 16px", background: "#f0f2f5" }}>
                      <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#606770", letterSpacing: "0.5px" }}>{domainOnly}</div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1d2129", margin: "4px 0", lineHeight: 1.3 }}>{title}</div>
                      <div style={{ fontSize: "0.82rem", color: "#606770", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{description}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. TWITTER / X CARD PREVIEW */}
              {activePlatform === "twitter" && (
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>Twitter / X Large Image Card</div>
                  <div style={{ border: "1px solid #cfd9de", borderRadius: "4px", overflow: "hidden", background: "#ffffff", maxWidth: "520px" }}>
                    <div style={{ height: "240px", background: "#0f172a", overflow: "hidden" }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt="Twitter Card" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8" }}>1200 x 628 Image</div>
                      )}
                    </div>
                    <div style={{ padding: "12px 16px" }}>
                      <div style={{ fontSize: "0.78rem", color: "#536471" }}>{domainOnly}</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1419", margin: "3px 0 5px" }}>{title}</div>
                      <div style={{ fontSize: "0.82rem", color: "#536471", lineHeight: 1.4 }}>{description}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. LINKEDIN PREVIEW */}
              {activePlatform === "linkedin" && (
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>LinkedIn Feed Link Card</div>
                  <div style={{ border: "1px solid #e0e0e0", borderRadius: "4px", overflow: "hidden", background: "#ffffff", maxWidth: "520px" }}>
                    <div style={{ height: "230px", background: "#0f172a", overflow: "hidden" }}>
                      {imageUrl && <img src={imageUrl} alt="LinkedIn" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />}
                    </div>
                    <div style={{ padding: "12px 14px", background: "#f3f2ef" }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "rgba(0,0,0,0.9)", lineHeight: 1.3 }}>{title}</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.6)", marginTop: "4px" }}>{domainOnly}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. WHATSAPP PREVIEW */}
              {activePlatform === "whatsapp" && (
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>WhatsApp Chat Bubble Preview</div>
                  <div style={{ background: "#d9fdd3", border: "1px solid #c1e8bb", borderRadius: "4px", padding: "10px 14px", maxWidth: "420px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                    <div style={{ border: "1px solid #b2d8ad", borderRadius: "4px", overflow: "hidden", background: "#e7f8e3", marginBottom: "8px" }}>
                      {imageUrl && <img src={imageUrl} alt="WhatsApp" style={{ width: "100%", height: "160px", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />}
                      <div style={{ padding: "8px 10px" }}>
                        <strong style={{ fontSize: "0.88rem", color: "#111b21", display: "block", lineHeight: 1.3 }}>{title}</strong>
                        <p style={{ fontSize: "0.78rem", color: "#667781", margin: "4px 0 2px", lineHeight: 1.3 }}>{description}</p>
                        <span style={{ fontSize: "0.72rem", color: "#8696a0" }}>{domainOnly}</span>
                      </div>
                    </div>
                    <a href={url} style={{ fontSize: "0.85rem", color: "#027eb5", wordBreak: "break-all" }}>{url}</a>
                  </div>
                </div>
              )}

              {/* HTML Snippet Code Box */}
              <div style={{ marginTop: "24px", background: "#0f172a", borderRadius: "4px", padding: "16px", color: "#e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Generated &lt;head&gt; Meta Snippet
                  </span>
                  <button
                    type="button"
                    onClick={copyMetaTags}
                    style={{ background: "#2563eb", border: "none", color: "#ffffff", padding: "4px 10px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    {copiedMeta ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre style={{ margin: 0, fontSize: "0.75rem", lineHeight: 1.5, maxHeight: "160px", overflowY: "auto", color: "#a5f3fc", fontFamily: "monospace" }}>
                  {generateFullMetaHtml()}
                </pre>
              </div>

            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section" style={{ marginTop: "40px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related SEO Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Complement your SERP snippet optimization with deep auditing, structured markup, and crawler rules.
            </p>
            <div className="related-tools-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "18px" }}>
              <div className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8", width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <i className="fa-solid fa-code"></i>
                </div>
                <h4 className="tool-ref-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}><Link href="/tools/schema-markup-generator" style={{ color: "#0f172a", textDecoration: "none" }}>Schema Markup Generator</Link></h4>
                <p className="tool-ref-desc" style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>Build Google-compliant JSON-LD structured data for rich snippets, FAQs, and entities.</p>
                <Link href="/tools/schema-markup-generator" className="tool-ref-link" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Generate Schema <i className="fa-solid fa-arrow-right"></i></Link>
              </div>

              <div className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#334155", width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h4 className="tool-ref-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}><Link href="/tools/robots-sitemap-generator" style={{ color: "#0f172a", textDecoration: "none" }}>Robots.txt &amp; Sitemap Builder</Link></h4>
                <p className="tool-ref-desc" style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>Generate clean crawler directives, AI bot blocks, and XML sitemaps.</p>
                <Link href="/tools/robots-sitemap-generator" className="tool-ref-link" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Build Robots.txt <i className="fa-solid fa-arrow-right"></i></Link>
              </div>

              <div className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                <div className="tool-ref-icon" style={{ background: "#eff6ff", color: "#2563eb", width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <i className="fa-solid fa-sliders"></i>
                </div>
                <h4 className="tool-ref-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}><Link href="/tools/backlink-package-calculator" style={{ color: "#0f172a", textDecoration: "none" }}>Backlink Package Calculator</Link></h4>
                <p className="tool-ref-desc" style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>Configure high-DA backlink quantities and calculate live pricing in USD and BDT.</p>
                <Link href="/tools/backlink-package-calculator" className="tool-ref-link" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Calculate Packages <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <ToolFaqAccordion
            title="Meta Tag &amp; Open Graph (OG) Optimization FAQ"
            faqs={[
              {
                q: "What is an Open Graph (OG) meta tag and why is it important?",
                a: "Open Graph (OG) tags are HTML snippets that control how URLs are displayed when shared across social networks like Facebook, LinkedIn, Twitter/X, and WhatsApp. Correct OG tags ensure your shared links display high-resolution images, accurate titles, and clear descriptions instead of broken previews."
              },
              {
                q: "What is the recommended Open Graph image size?",
                a: "The industry standard recommended Open Graph image dimension is 1200 x 630 pixels (1.91:1 aspect ratio). Images of this size render sharply across high-density desktop and mobile feeds without distortion or awkward cropping."
              },
              {
                q: "What is the recommended title tag length for Google SERP?",
                a: "Google displays title tags up to approximately 580 to 600 pixels in width on desktop (~50-60 characters). Keeping your title within this range ensures the entire headline is visible without being truncated by an ellipsis (...)."
              },
              {
                q: "How do Twitter / X Cards differ from Open Graph tags?",
                a: "Twitter supports its own card markup (e.g. twitter:card, twitter:image, twitter:site). While Twitter can fall back to standard Open Graph tags if Twitter tags are missing, implementing both guarantees pixel-perfect rendering across all social media and messaging channels."
              }
            ]}
          />

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box" style={{ background: "#0f172a", color: "#ffffff", borderRadius: "4px", padding: "36px 24px", textAlign: "center", marginTop: "40px" }}>
            <h4 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0 0 10px" }}>Need Enterprise-Grade Technical SEO &amp; Organic Ranking?</h4>
            <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 20px", fontSize: "0.95rem" }}>Our tailored campaigns combine high-authority digital PR, forensic technical audits, and entity content clusters.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm" style={{ background: "#2563eb", color: "#ffffff", padding: "10px 20px", borderRadius: "4px", fontWeight: 700, textDecoration: "none" }}>
                <i className="fa-solid fa-calendar-check mr-1"></i> Book Strategy Session
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm" style={{ border: "1px solid #475569", color: "#ffffff", padding: "10px 20px", borderRadius: "4px", fontWeight: 700, textDecoration: "none" }}>
                Technical SEO Services <i className="fa-solid fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
