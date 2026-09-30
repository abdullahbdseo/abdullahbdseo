"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

const TITLE_PX_LIMIT = 580;
const TITLE_MOBILE_PX_LIMIT = 460;
const TITLE_PX_PER_CHAR = 8.5;

export default function SerpSimulator() {
  // ─── Platform & Device ─────────────────────────────────────────────────────
  const [activePlatform, setActivePlatform] = useState("google");
  const [device, setDevice] = useState("desktop"); // desktop | mobile | ai

  // ─── Core Meta Fields ──────────────────────────────────────────────────────
  const [title, setTitle] = useState("Abdullah Saleh | Top SEO Expert & Organic Growth Consultant in Bangladesh");
  const [url, setUrl] = useState("https://abdullahbdseo.com/services/technical-seo-service-in-bangladesh");
  const [description, setDescription] = useState("Scale organic rankings with forensic technical SEO audits, high-DA backlink outreach, and entity topic clusters. 100% white-hat ROI campaigns.");
  const [siteName, setSiteName] = useState("Abdullahbdseo");
  const [imageUrl, setImageUrl] = useState("https://abdullahbdseo.vercel.app/images/seo_hero_analytics_dashboard.jpg");
  const [twitterHandle, setTwitterHandle] = useState("@abdullahbdseo");

  // ─── Rich Snippet Toggles ──────────────────────────────────────────────────
  const [showRating, setShowRating] = useState(true);
  const [ratingValue, setRatingValue] = useState("4.9");
  const [ratingCount, setRatingCount] = useState("128");
  const [showDate, setShowDate] = useState(false);
  const [showSitelinks, setShowSitelinks] = useState(false);
  const [showFeaturedSnippet, setShowFeaturedSnippet] = useState(false);
  const [showPAA, setShowPAA] = useState(false);
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const [priceValue, setPriceValue] = useState("$299");
  const [showFavicon, setShowFavicon] = useState(true);

  // ─── Copy state ────────────────────────────────────────────────────────────
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // preview | code

  // ─── Calculations ──────────────────────────────────────────────────────────
  const titleLength = title.length;
  const descLength = description.length;
  const titlePixelEst = Math.round(titleLength * TITLE_PX_PER_CHAR);
  const isTitleOver = device === "mobile"
    ? titlePixelEst > TITLE_MOBILE_PX_LIMIT
    : titlePixelEst > TITLE_PX_LIMIT;
  const isDescOver = descLength > 160;
  const titleScore = isTitleOver ? "Over" : titlePixelEst > (device === "mobile" ? 400 : 500) ? "Good" : "Optimal";
  const descScore = isDescOver ? "Over" : descLength > 140 ? "Good" : descLength > 50 ? "Optimal" : "Short";

  const domainOnly = url.replace(/^https?:\/\//, "").split("/")[0] || "example.com";
  const pathParts = url.replace(/^https?:\/\/[^/]+/, "").split("/").filter(Boolean);
  const breadcrumbStr = [domainOnly, ...pathParts].join(" › ");

  // ─── Presets ───────────────────────────────────────────────────────────────
  const presets = [
    {
      name: "SEO Consultant",
      title: "Abdullah Saleh | Top SEO Expert & Organic Growth Consultant in Bangladesh",
      url: "https://abdullahbdseo.com/services/technical-seo-service-in-bangladesh",
      desc: "Scale organic rankings with forensic technical SEO audits, high-DA backlink outreach, and entity topic clusters. 100% white-hat ROI campaigns.",
      siteName: "Abdullahbdseo",
      image: "https://abdullahbdseo.vercel.app/images/seo_hero_analytics_dashboard.jpg",
    },
    {
      name: "E-Commerce",
      title: "Custom Mechanical Keyboard – Wireless RGB 80hr Battery | KeyPro Tech",
      url: "https://keypro.tech/products/wireless-rgb-keyboard",
      desc: "Shop our hot-swappable mechanical keyboard with per-key RGB, 80-hour battery life, and silent tactile switches. Free worldwide shipping on orders $49+.",
      siteName: "KeyPro Tech",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    },
    {
      name: "Local Business",
      title: "Emergency Plumber Brooklyn NY – 24/7 Licensed | Brooklyn Plumbing Pro",
      url: "https://brooklynplumbingpro.com/emergency-service",
      desc: "Licensed & insured Brooklyn plumbers available 24/7. Burst pipes, leak detection, drain unblocking. Same-day service guaranteed. Call now!",
      siteName: "Brooklyn Plumbing Pro",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    },
    {
      name: "Blog / Article",
      title: "How to Rank #1 on Google in 2026: The Complete SEO Blueprint",
      url: "https://example.com/blog/how-to-rank-number-one-google-2026",
      desc: "A step-by-step guide to dominating Google search results in 2026 with entity SEO, topical authority clusters, and Core Web Vitals optimization.",
      siteName: "SEO Insider",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    },
  ];

  const applyPreset = (p) => {
    setTitle(p.title);
    setUrl(p.url);
    setDescription(p.desc);
    setSiteName(p.siteName || "");
    setImageUrl(p.image || "");
  };

  // ─── Meta HTML Generator ───────────────────────────────────────────────────
  const generateMetaHtml = useCallback(() => {
    const cleanUrl = url || "https://example.com";
    return `<!-- ══ Primary Meta Tags ══ -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<link rel="canonical" href="${cleanUrl}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

<!-- ══ Open Graph / Facebook / LinkedIn / WhatsApp ══ -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${cleanUrl}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="${siteName}" />

<!-- ══ Twitter / X Cards ══ -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${cleanUrl}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />
${twitterHandle ? `<meta name="twitter:site" content="${twitterHandle}" />\n<meta name="twitter:creator" content="${twitterHandle}" />` : ""}`;
  }, [title, url, description, imageUrl, siteName, twitterHandle]);

  const copyMetaTags = () => {
    navigator.clipboard.writeText(generateMetaHtml());
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2500);
  };

  // ─── Score color helper ────────────────────────────────────────────────────
  const scoreColor = (s) =>
    s === "Optimal" ? "#10b981" : s === "Good" ? "#f59e0b" : s === "Short" ? "#64748b" : "#ef4444";
  const scoreBg = (s) =>
    s === "Optimal" ? "#ecfdf5" : s === "Good" ? "#fffbeb" : s === "Short" ? "#f8fafc" : "#fef2f2";

  // ─── Sitelink examples ────────────────────────────────────────────────────
  const sitelinkExamples = [
    { name: "Services", url: domainOnly + "/services" },
    { name: "Pricing", url: domainOnly + "/pricing" },
    { name: "Portfolio", url: domainOnly + "/portfolio" },
    { name: "Contact", url: domainOnly + "/contact" },
    { name: "Blog", url: domainOnly + "/blog" },
    { name: "About", url: domainOnly + "/about" },
  ];

  const paaItems = [
    "What does an SEO expert do?",
    "How much does SEO cost in Bangladesh?",
    "How long does SEO take to show results?",
    "Is SEO better than Google Ads?",
  ];

  return (
    <div className="tool-single-page">

      {/* ════ HEADER ════ */}
      <section className="page-header-section" style={{ padding: "50px 0 28px", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontWeight: 700, fontSize: "0.83rem", textDecoration: "none", marginBottom: "14px" }}>
            <i className="fa-solid fa-arrow-left"></i> All Free SEO Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", color: "#2563eb", padding: "4px 14px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 auto 12px" }}>
            <i className="fa-brands fa-google"></i> Real-Time SERP & Social Preview
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.025em", lineHeight: 1.2 }}>
            Google SERP Simulator & Snippet Preview Tool
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "680px", margin: "0 auto 0", lineHeight: 1.65 }}>
            Pixel-accurate preview of your title, description, and URL on <strong>Google Desktop, Mobile & AI Overview</strong> — plus Facebook, Twitter/X, LinkedIn, and WhatsApp social cards with 1-click meta tag generator.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "28px", paddingBottom: "80px" }}>
        <div className="container" style={{ maxWidth: "1260px" }}>

          {/* ── Preset Bar ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "22px", background: "#ffffff", padding: "11px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}>
              <i className="fa-solid fa-wand-magic-sparkles" style={{ color: "#2563eb" }}></i> Quick Presets:
            </span>
            {presets.map((p, i) => (
              <button key={i} onClick={() => applyPreset(p)} style={{ fontSize: "0.77rem", fontWeight: 700, padding: "5px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", cursor: "pointer" }}>
                {p.name}
              </button>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "26px", alignItems: "start" }}>

            {/* ════ LEFT: INPUTS ════ */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                <i className="fa-solid fa-sliders" style={{ color: "#2563eb" }}></i> Meta & OpenGraph Controls
              </h2>

              {/* Title */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>Page Title (title / og:title)</label>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: scoreColor(titleScore), background: scoreBg(titleScore), padding: "1px 8px", borderRadius: "4px" }}>
                    {titleLength}ch / ~{titlePixelEst}px · {titleScore}
                  </span>
                </div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "100%", padding: "9px 11px", border: `1px solid ${isTitleOver ? "#fca5a5" : "#cbd5e1"}`, borderRadius: "4px", fontSize: "0.86rem", outline: "none" }}
                  placeholder="Enter your page title…" />
                <div style={{ height: "3px", background: "#e2e8f0", borderRadius: "2px", marginTop: "5px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (titlePixelEst / TITLE_PX_LIMIT) * 100)}%`, background: isTitleOver ? "#ef4444" : titlePixelEst > 500 ? "#f59e0b" : "#10b981", transition: "width 0.25s" }}></div>
                </div>
              </div>

              {/* URL */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Canonical URL</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  style={{ width: "100%", padding: "9px 11px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.86rem" }}
                  placeholder="https://example.com/page" />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>Meta Description</label>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: scoreColor(descScore), background: scoreBg(descScore), padding: "1px 8px", borderRadius: "4px" }}>
                    {descLength} / 160 · {descScore}
                  </span>
                </div>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "100%", padding: "9px 11px", border: `1px solid ${isDescOver ? "#fca5a5" : "#cbd5e1"}`, borderRadius: "4px", fontSize: "0.86rem", resize: "vertical" }}
                  placeholder="Enter a compelling meta description…" />
                <div style={{ height: "3px", background: "#e2e8f0", borderRadius: "2px", marginTop: "5px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (descLength / 160) * 100)}%`, background: isDescOver ? "#ef4444" : descLength > 140 ? "#f59e0b" : "#10b981", transition: "width 0.25s" }}></div>
                </div>
              </div>

              {/* Brand + Twitter */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "5px" }}>Brand / Site Name</label>
                  <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                    placeholder="My Brand" />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "5px" }}>Twitter / X Handle</label>
                  <input type="text" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                    placeholder="@handle" />
                </div>
              </div>

              {/* OG Image */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "5px" }}>OG Image URL <span style={{ color: "#94a3b8", fontWeight: 500 }}>(1200×630 recommended)</span></label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                  placeholder="https://example.com/og-image.jpg" />
                {imageUrl && (
                  <div style={{ marginTop: "8px", borderRadius: "4px", overflow: "hidden", height: "90px", background: "#f1f5f9" }}>
                    <img src={imageUrl} alt="OG Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                  </div>
                )}
              </div>

              {/* SERP Enrichment Toggles */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "10px" }}>
                  SERP Rich Snippet Elements
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {[
                    { label: "Favicon", state: showFavicon, set: setShowFavicon },
                    { label: "Breadcrumb URL", state: showBreadcrumb, set: setShowBreadcrumb },
                    { label: "Star Rating", state: showRating, set: setShowRating },
                    { label: "Published Date", state: showDate, set: setShowDate },
                    { label: "Sitelinks", state: showSitelinks, set: setShowSitelinks },
                    { label: "Price/Availability", state: showPrice, set: setShowPrice },
                    { label: "Featured Snippet", state: showFeaturedSnippet, set: setShowFeaturedSnippet },
                    { label: "People Also Ask", state: showPAA, set: setShowPAA },
                  ].map(({ label, state, set }) => (
                    <label key={label} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                      <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} style={{ accentColor: "#2563eb" }} />
                      {label}
                    </label>
                  ))}
                </div>

                {/* Inline rating/price inputs */}
                {showRating && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.74rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "3px" }}>Rating Value</label>
                      <input type="text" value={ratingValue} onChange={(e) => setRatingValue(e.target.value)} style={{ width: "100%", padding: "6px 9px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.8rem" }} placeholder="4.9" />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.74rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "3px" }}>Review Count</label>
                      <input type="text" value={ratingCount} onChange={(e) => setRatingCount(e.target.value)} style={{ width: "100%", padding: "6px 9px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.8rem" }} placeholder="128" />
                    </div>
                  </div>
                )}
                {showPrice && (
                  <div style={{ marginTop: "10px" }}>
                    <label style={{ fontSize: "0.74rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "3px" }}>Price</label>
                    <input type="text" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} style={{ width: "100%", padding: "6px 9px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.8rem" }} placeholder="$299" />
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "20px" }}>
                <button onClick={copyMetaTags}
                  style={{ padding: "10px 14px", borderRadius: "4px", background: copiedMeta ? "#059669" : "#0f172a", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", transition: "background 0.2s" }}>
                  <i className={`fa-solid ${copiedMeta ? "fa-check" : "fa-copy"}`}></i>
                  {copiedMeta ? "Copied!" : "Copy Meta HTML"}
                </button>
                <button onClick={() => setActiveTab(activeTab === "code" ? "preview" : "code")}
                  style={{ padding: "10px 14px", borderRadius: "4px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                  <i className={`fa-solid ${activeTab === "code" ? "fa-eye" : "fa-code"}`}></i>
                  {activeTab === "code" ? "View Preview" : "View Code"}
                </button>
              </div>
            </div>

            {/* ════ RIGHT: PREVIEW PANEL ════ */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>

              {/* Platform Tabs */}
              <div style={{ display: "flex", gap: "0", borderBottom: "2px solid #e2e8f0", overflowX: "auto" }}>
                {[
                  { id: "google", icon: "fa-brands fa-google", label: "Google SERP", color: "#2563eb" },
                  { id: "facebook", icon: "fa-brands fa-facebook", label: "Facebook", color: "#1877f2" },
                  { id: "twitter", icon: "fa-brands fa-x-twitter", label: "Twitter/X", color: "#0f172a" },
                  { id: "linkedin", icon: "fa-brands fa-linkedin", label: "LinkedIn", color: "#0a66c2" },
                  { id: "whatsapp", icon: "fa-brands fa-whatsapp", label: "WhatsApp", color: "#25d366" },
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActivePlatform(tab.id)}
                    style={{ padding: "11px 18px", border: "none", borderBottom: activePlatform === tab.id ? `2px solid ${tab.color}` : "2px solid transparent", background: "transparent", color: activePlatform === tab.id ? tab.color : "#64748b", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", marginBottom: "-2px", transition: "all 0.15s" }}>
                    <i className={tab.icon}></i> {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ padding: "22px" }}>

                {/* Code view */}
                {activeTab === "code" ? (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>Generated &lt;head&gt; Meta Tags</span>
                      <button onClick={copyMetaTags} style={{ background: copiedMeta ? "#059669" : "#2563eb", border: "none", color: "#fff", padding: "5px 12px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                        {copiedMeta ? "✓ Copied!" : "Copy Code"}
                      </button>
                    </div>
                    <pre style={{ background: "#0f172a", borderRadius: "4px", padding: "16px", color: "#a5f3fc", fontSize: "0.72rem", lineHeight: 1.6, overflow: "auto", maxHeight: "500px", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                      {generateMetaHtml()}
                    </pre>
                  </div>
                ) : (

                  /* ── GOOGLE SERP ── */
                  activePlatform === "google" ? (
                    <div>
                      {/* Device switcher */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>Google Search Preview</span>
                        <div style={{ display: "inline-flex", background: "#f1f5f9", borderRadius: "4px", padding: "2px", border: "1px solid #e2e8f0" }}>
                          {["desktop", "mobile", "ai"].map((d) => (
                            <button key={d} onClick={() => setDevice(d)}
                              style={{ padding: "5px 13px", border: "none", borderRadius: "4px", background: device === d ? "#2563eb" : "transparent", color: device === d ? "#fff" : "#475569", fontWeight: 700, fontSize: "0.74rem", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "5px" }}>
                              <i className={`fa-solid ${d === "desktop" ? "fa-desktop" : d === "mobile" ? "fa-mobile-alt" : "fa-robot"}`}></i>
                              {d === "ai" ? "AI Overview" : d.charAt(0).toUpperCase() + d.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ── Google Chrome bar ── */}
                      <div style={{ background: "#f1f5f9", borderRadius: "4px 4px 0 0", padding: "8px 12px", border: "1px solid #e2e8f0", borderBottom: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ display: "flex", gap: "5px" }}>
                          {["#ef4444", "#f59e0b", "#10b981"].map((c) => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}></div>)}
                        </div>
                        <div style={{ flex: 1, background: "#fff", borderRadius: "4px", padding: "4px 10px", fontSize: "0.72rem", color: "#475569", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "5px" }}>
                          <i className="fa-solid fa-lock" style={{ color: "#10b981", fontSize: "0.65rem" }}></i>
                          <span style={{ color: "#10b981", fontSize: "0.65rem", fontWeight: 700 }}>google.com</span>
                          <span style={{ color: "#94a3b8" }}>/search?q={title.split(" ").slice(0, 4).join("+")}</span>
                        </div>
                      </div>

                      {/* ── Google results area ── */}
                      <div style={{ border: "1px solid #e2e8f0", borderTop: "none", borderRadius: "0 0 4px 4px", padding: "16px 18px", background: "#ffffff", fontFamily: "arial, sans-serif", maxWidth: device === "mobile" ? "390px" : "100%" }}>

                        {/* AI Overview mode */}
                        {device === "ai" ? (
                          <div>
                            <div style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)", border: "1px solid #bfdbfe", borderRadius: "4px", padding: "14px 16px", marginBottom: "16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg, #4361ee, #00d2d3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <i className="fa-solid fa-robot" style={{ fontSize: "11px", color: "#fff" }}></i>
                                </div>
                                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1d4ed8" }}>AI Overview</span>
                                <span style={{ fontSize: "0.7rem", color: "#64748b", marginLeft: "auto" }}>Generated by Gemini</span>
                              </div>
                              <p style={{ fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.55, margin: "0 0 10px" }}>
                                {description || "Enter a meta description to see how it might appear in Google AI Overview..."} <span style={{ color: "#2563eb", cursor: "pointer" }}>Learn more</span>
                              </p>
                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {[siteName || domainOnly, "Google Support", "SEMrush"].map((src, i) => (
                                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "4px 9px", fontSize: "0.72rem", color: "#475569", fontWeight: 600 }}>
                                    <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#2563eb" }}><i className="fa-solid fa-globe"></i></div>
                                    {src}
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Then show normal snippet below */}
                          </div>
                        ) : null}

                        {/* Featured Snippet */}
                        {showFeaturedSnippet && (
                          <div style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px 14px", marginBottom: "14px", background: "#f8fafc" }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>Featured Snippet</div>
                            <p style={{ fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.5, margin: "0 0 8px" }}>{description}</p>
                            <div style={{ fontSize: "0.78rem", color: "#2563eb", fontWeight: 600 }}>{domainOnly}</div>
                          </div>
                        )}

                        {/* People Also Ask */}
                        {showPAA && (
                          <div style={{ border: "1px solid #e2e8f0", borderRadius: "4px", marginBottom: "14px", overflow: "hidden" }}>
                            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", padding: "10px 14px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                              <i className="fa-solid fa-circle-question" style={{ color: "#2563eb", marginRight: "6px" }}></i> People Also Ask
                            </div>
                            {paaItems.map((q, i) => (
                              <div key={i} style={{ padding: "9px 14px", borderBottom: i < paaItems.length - 1 ? "1px solid #f1f5f9" : "none", fontSize: "0.83rem", color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                                {q}
                                <i className="fa-solid fa-chevron-down" style={{ color: "#64748b", fontSize: "0.72rem" }}></i>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ── Main Snippet ── */}
                        <div style={{ marginBottom: "4px" }}>
                          {/* Favicon + Domain row */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            {showFavicon && (
                              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#2563eb" }}>
                                <i className="fa-solid fa-globe"></i>
                              </div>
                            )}
                            <div style={{ fontSize: device === "mobile" ? "0.78rem" : "0.82rem", lineHeight: 1.2 }}>
                              <strong style={{ color: "#1f1f1f", display: "block" }}>{siteName || domainOnly}</strong>
                              {showBreadcrumb && <span style={{ color: "#4d5156", fontSize: "0.73rem" }}>{breadcrumbStr}</span>}
                            </div>
                            {/* 3-dot menu */}
                            <div style={{ marginLeft: "auto", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4d5156", fontSize: "0.85rem" }}>⋮</div>
                          </div>

                          {/* Title */}
                          <div style={{ fontSize: device === "mobile" ? "1.05rem" : "1.2rem", color: "#1a0dab", fontWeight: 400, lineHeight: 1.3, marginBottom: "3px", cursor: "pointer" }}>
                            {isTitleOver
                              ? title.substring(0, Math.floor((device === "mobile" ? TITLE_MOBILE_PX_LIMIT : TITLE_PX_LIMIT) / TITLE_PX_PER_CHAR)) + "..."
                              : (title || "Enter a page title…")}
                          </div>

                          {/* Rich rows */}
                          {(showRating || showDate || showPrice) && (
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", fontSize: "0.76rem", color: "#4d5156", margin: "2px 0 4px" }}>
                              {showRating && (
                                <span>
                                  <span style={{ color: "#e37400", fontWeight: 700 }}>
                                    {"★".repeat(Math.round(parseFloat(ratingValue) || 5))}
                                  </span>{" "}
                                  <span style={{ color: "#e37400" }}>{ratingValue}</span>
                                  <span style={{ color: "#4d5156" }}> ({ratingCount} reviews)</span>
                                </span>
                              )}
                              {showDate && <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} —</span>}
                              {showPrice && <span style={{ color: "#0d7046", fontWeight: 700 }}>{priceValue} · In Stock</span>}
                            </div>
                          )}

                          {/* Description */}
                          <div style={{ fontSize: device === "mobile" ? "0.82rem" : "0.88rem", color: "#4d5156", lineHeight: 1.55 }}>
                            {isDescOver ? description.substring(0, 160) + "…" : (description || "Enter a meta description…")}
                          </div>

                          {/* Sitelinks */}
                          {showSitelinks && (
                            <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
                              {sitelinkExamples.map((sl, i) => (
                                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "6px 10px" }}>
                                  <div style={{ fontSize: "0.8rem", color: "#1a0dab", fontWeight: 600, cursor: "pointer" }}>{sl.name}</div>
                                  <div style={{ fontSize: "0.7rem", color: "#4d5156" }}>{sl.url}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pixel ruler legend */}
                      <div style={{ marginTop: "10px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                        {[["#10b981", "Optimal"], ["#f59e0b", "Good – near limit"], ["#ef4444", "Over limit – truncated"]].map(([c, l]) => (
                          <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>
                            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "inline-block" }}></span>{l}
                          </span>
                        ))}
                      </div>
                    </div>

                  /* ── FACEBOOK ── */
                  ) : activePlatform === "facebook" ? (
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>Facebook Feed Link Card</div>
                      <div style={{ border: "1px solid #ced0d4", borderRadius: "4px", overflow: "hidden", background: "#f0f2f5", maxWidth: "528px" }}>
                        <div style={{ height: "260px", background: "#dde1e7", overflow: "hidden", position: "relative" }}>
                          {imageUrl ? <img src={imageUrl} alt="OG" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                            : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", fontSize: "0.9rem" }}>No Image · 1200×630 Recommended</div>}
                        </div>
                        <div style={{ padding: "10px 14px", background: "#f0f2f5" }}>
                          <div style={{ fontSize: "0.73rem", textTransform: "uppercase", color: "#606770", letterSpacing: "0.5px" }}>{domainOnly}</div>
                          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1d2129", margin: "3px 0 3px", lineHeight: 1.3 }}>{title}</div>
                          <div style={{ fontSize: "0.82rem", color: "#606770", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{description}</div>
                        </div>
                      </div>
                    </div>

                  /* ── TWITTER / X ── */
                  ) : activePlatform === "twitter" ? (
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>Twitter / X Large Image Card</div>
                      <div style={{ border: "1px solid #cfd9de", borderRadius: "12px", overflow: "hidden", background: "#ffffff", maxWidth: "528px" }}>
                        <div style={{ height: "260px", background: "#1e293b", overflow: "hidden" }}>
                          {imageUrl ? <img src={imageUrl} alt="Twitter" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                            : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8" }}>1200 × 628 Recommended</div>}
                        </div>
                        <div style={{ padding: "12px 16px" }}>
                          <div style={{ fontSize: "0.76rem", color: "#536471" }}>{domainOnly}</div>
                          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1419", margin: "3px 0 4px", lineHeight: 1.3 }}>{title}</div>
                          <div style={{ fontSize: "0.82rem", color: "#536471", lineHeight: 1.4 }}>{description}</div>
                          {twitterHandle && <div style={{ fontSize: "0.75rem", color: "#536471", marginTop: "6px" }}>{twitterHandle}</div>}
                        </div>
                      </div>
                    </div>

                  /* ── LINKEDIN ── */
                  ) : activePlatform === "linkedin" ? (
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>LinkedIn Feed Link Card</div>
                      <div style={{ border: "1px solid #e0e0e0", borderRadius: "4px", overflow: "hidden", background: "#ffffff", maxWidth: "528px" }}>
                        <div style={{ height: "250px", background: "#1e293b", overflow: "hidden" }}>
                          {imageUrl && <img src={imageUrl} alt="LinkedIn" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />}
                        </div>
                        <div style={{ padding: "12px 14px", background: "#f3f2ef" }}>
                          <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "rgba(0,0,0,0.9)", lineHeight: 1.3 }}>{title}</div>
                          <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.6)", marginTop: "4px" }}>{domainOnly}</div>
                        </div>
                      </div>
                    </div>

                  /* ── WHATSAPP ── */
                  ) : activePlatform === "whatsapp" ? (
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>WhatsApp Chat Preview</div>
                      <div style={{ background: "#e5ddd5", padding: "16px", borderRadius: "4px", maxWidth: "420px" }}>
                        <div style={{ background: "#d9fdd3", border: "1px solid #c1e8bb", borderRadius: "4px", padding: "8px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                          <div style={{ border: "1px solid #b2d8ad", borderRadius: "4px", overflow: "hidden", background: "#ffffff", marginBottom: "6px" }}>
                            {imageUrl && <img src={imageUrl} alt="WA" style={{ width: "100%", height: "140px", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />}
                            <div style={{ padding: "8px 10px" }}>
                              <strong style={{ fontSize: "0.86rem", color: "#111b21", display: "block", lineHeight: 1.3 }}>{title}</strong>
                              <p style={{ fontSize: "0.76rem", color: "#667781", margin: "4px 0 2px", lineHeight: 1.35 }}>{description}</p>
                              <span style={{ fontSize: "0.7rem", color: "#8696a0" }}>{domainOnly}</span>
                            </div>
                          </div>
                          <a href={url} style={{ fontSize: "0.82rem", color: "#027eb5", wordBreak: "break-all" }}>{url}</a>
                        </div>
                        <div style={{ textAlign: "right", fontSize: "0.7rem", color: "#667781", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "3px" }}>
                          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                          <i className="fa-solid fa-check-double" style={{ color: "#53bdeb" }}></i>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>

          {/* ── SEO Score Summary Bar ── */}
          <div style={{ marginTop: "24px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px 20px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
              <i className="fa-solid fa-chart-bar" style={{ color: "#2563eb", marginRight: "6px" }}></i>Snippet Optimization Score
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
              {[
                { label: "Title Length", value: titleLength, max: 60, score: titleScore, unit: "chars" },
                { label: "Title Pixels", value: titlePixelEst, max: TITLE_PX_LIMIT, score: titleScore, unit: "px" },
                { label: "Description", value: descLength, max: 160, score: descScore, unit: "chars" },
                { label: "Schema Data", value: (showRating ? 1 : 0) + (showPrice ? 1 : 0) + (showDate ? 1 : 0) + (showSitelinks ? 1 : 0), max: 4, score: "Optimal", unit: "signals" },
              ].map(({ label, value, max, score, unit }) => (
                <div key={label} style={{ background: scoreBg(score), borderRadius: "4px", padding: "10px 12px", border: `1px solid ${scoreColor(score)}22` }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 900, color: scoreColor(score) }}>{value}<span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#64748b", marginLeft: "3px" }}>{unit}</span></div>
                  <div style={{ fontSize: "0.7rem", color: "#475569", marginTop: "1px" }}>Max: {max} {unit}</div>
                  <div style={{ height: "3px", background: "#e2e8f0", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(100, (value / max) * 100)}%`, background: scoreColor(score), transition: "width 0.3s" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Related Tools ── */}
          <div style={{ marginTop: "44px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Related SEO Tools</h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 18px" }}>Complement your SERP optimization with these powerful utilities.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { href: "/tools/schema-markup-generator", icon: "fa-solid fa-code", bg: "#dbeafe", color: "#1d4ed8", title: "Schema Markup Generator", desc: "Build JSON-LD structured data for rich snippets, FAQs, and Local Businesses." },
                { href: "/tools/keyword-density-checker", icon: "fa-solid fa-chart-simple", bg: "#dcfce7", color: "#15803d", title: "Keyword Density Checker", desc: "Analyze n-gram frequency, reading ease, and prevent keyword stuffing penalties." },
                { href: "/tools/deep-seo-audit", icon: "fa-solid fa-magnifying-glass-chart", bg: "#ecfdf5", color: "#059669", title: "Deep SEO Audit", desc: "Forensic 70-point technical and on-page SEO inspection with downloadable report." },
              ].map((t) => (
                <div key={t.href} className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "4px", background: t.bg, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                    <i className={t.icon}></i>
                  </div>
                  <h4 style={{ margin: "0 0 6px", fontSize: "1rem" }}><Link href={t.href} style={{ color: "#0f172a", textDecoration: "none" }}>{t.title}</Link></h4>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>{t.desc}</p>
                  <Link href={t.href} style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Open Tool <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <ToolFaqAccordion
            title="Google SERP Simulator FAQ"
            faqs={[
              { q: "What is a SERP Simulator?", a: "A SERP (Search Engine Results Page) Simulator shows you exactly how your page title, URL, and meta description will appear in Google search results before you publish. It helps catch truncation issues and ensures your snippet is optimized for clicks (CTR)." },
              { q: "What is the ideal title tag length for Google?", a: "Google renders title tags up to approximately 580px wide on desktop (~60 characters). On mobile, the limit is around 460px. Keeping titles within these ranges ensures the full headline is visible without an ellipsis (...)." },
              { q: "What is the recommended meta description length?", a: "Google typically displays up to 160 characters in desktop search results and ~120 characters on mobile. Descriptions beyond these limits are truncated. Always include your primary keyword and a clear call-to-action within this range." },
              { q: "What is an AI Overview in Google SERP?", a: "Google AI Overviews (formerly SGE) are AI-generated summaries that appear at the top of search results, citing multiple web sources. Optimizing for clear, fact-dense, and entity-rich content — along with structured data — increases your chances of being cited." },
              { q: "What is an Open Graph (OG) image?", a: "An Open Graph image is the visual thumbnail shown when a URL is shared on social media platforms like Facebook, LinkedIn, WhatsApp, and Twitter/X. The recommended size is 1200×630 pixels (1.91:1 ratio) for sharp rendering across all feeds." },
              { q: "How can I improve my Google CTR from search results?", a: "Use your primary keyword within the first 30 characters of the title, write benefit-driven descriptions that answer the searcher's intent, implement structured data (ratings, price, dates) for rich snippet eligibility, and ensure your URL is clean and readable." },
            ]}
          />

          {/* CTA */}
          <div style={{ background: "#0f172a", color: "#ffffff", borderRadius: "4px", padding: "40px 28px", textAlign: "center", marginTop: "44px" }}>
            <h4 style={{ fontSize: "1.7rem", fontWeight: 800, margin: "0 0 10px" }}>Need a Full Technical SEO Audit & Organic Strategy?</h4>
            <p style={{ color: "#94a3b8", maxWidth: "620px", margin: "0 auto 22px", fontSize: "0.98rem", lineHeight: 1.6 }}>Our campaigns combine high-authority digital PR, forensic technical audits, and entity content clusters to drive sustainable organic growth.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#2563eb", color: "#fff", padding: "11px 24px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-calendar-check"></i> Book Strategy Session
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" style={{ border: "1px solid #475569", color: "#fff", padding: "11px 24px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Technical SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
