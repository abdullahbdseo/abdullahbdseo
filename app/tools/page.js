"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function ToolsHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' | 'seo' | 'calc' | 'popular'

  const seoTools = [
    {
      title: "Google SERP Simulator & Snippet Preview",
      href: "/tools/serp-simulator",
      icon: "fa-brands fa-google",
      iconImg: "/images/google-icon.svg",
      iconBg: "#ffffff",
      iconColor: "#2563eb",
      badge: "🔥 #1 Most Popular",
      isPopular: true,
      desc: "Pixel-accurate preview of your title, description & URL on Google Desktop, Mobile & AI Overview — plus Facebook, Twitter/X, LinkedIn & WhatsApp social cards with 1-click meta tag generator."
    },
    {
      title: "On-Page SEO Content Optimizer & Live Grader",
      href: "/tools/seo-content-optimizer",
      icon: "fa-solid fa-file-circle-check",
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      badge: "✨ Live Content Grader",
      isPopular: true,
      desc: "Real-time content scanner checking 20+ ranking factors: Focus keyword placement in Title, Meta, Slug, H1-H3 headings, keyword density, and readability with instant 0-100 SEO score."
    },
    {
      title: "Open Graph & Social Card Meta Generator",
      href: "/tools/open-graph-meta-generator",
      icon: "fa-solid fa-share-nodes",
      iconBg: "#e0f2fe",
      iconColor: "#0284c7",
      badge: "✨ Social Preview",
      isPopular: true,
      desc: "Generate pixel-accurate Open Graph, Twitter/X, Facebook, LinkedIn, WhatsApp & Discord preview tags with live cards and 1-click HTML/Next.js export."
    },
    {
      title: "Canonical & Hreflang Tag Generator",
      href: "/tools/canonical-hreflang-generator",
      icon: "fa-solid fa-earth-americas",
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      badge: "🌍 Multi-Language SEO",
      desc: "Prevent duplicate content issues and generate Google-compliant rel=canonical and multi-language hreflang tags with bulk CSV import and XML sitemaps."
    },
    {
      title: "SEO Keyword Clustering & Grouping Tool",
      href: "/tools/keyword-clustering-tool",
      icon: "fa-solid fa-diagram-project",
      iconBg: "#dcfce7",
      iconColor: "#15803d",
      badge: "🎯 Topic Hubs & Silos",
      isPopular: true,
      desc: "Cluster 100s of keywords into semantic topic clusters and search intent silos. Export structured content briefs to CSV, Markdown, and JSON."
    },
    {
      title: "High DA Backlinks Database",
      href: "/high-da-backlinks",
      icon: "fa-solid fa-link",
      iconBg: "#e0f2fe",
      iconColor: "#0284c7",
      badge: "150+ Authority Sites",
      desc: "Access a curated list of 150+ free high-DA/DR platforms across Web 2.0, profile creation, business directories, and bookmarking sites."
    },
    {
      title: "Deep SEO Audit & Report",
      href: "/tools/deep-seo-audit",
      icon: "fa-solid fa-magnifying-glass-chart",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      badge: "70+ Point Audit",
      isPopular: true,
      desc: "Perform a forensic 70+ point technical & on-page SEO inspection. Get instant grades, critical issue diagnosis, and a downloadable 12-sheet Excel audit report."
    },
    {
      title: "Website SEO Analyzer",
      href: "/tools/website-seo-analyzer",
      icon: "fa-solid fa-chart-pie",
      iconBg: "#dbeafe",
      iconColor: "#1d4ed8",
      badge: "Live Page Audit",
      desc: "Audit real-time on-page SEO tags, headings hierarchy, canonicals, image alt attributes, and technical indexation signals."
    },
    {
      title: "SEO Audit Proposal Generator",
      href: "/tools/seo-audit-report-generator",
      icon: "fa-solid fa-file-invoice",
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      badge: "PDF Proposals",
      desc: "Generate professional branded client SEO audit proposals and deliverables roadmap with 1-click printable PDF export."
    },
    {
      title: "JSON-LD Schema Generator",
      href: "/tools/schema-markup-generator",
      icon: "fa-solid fa-code",
      iconBg: "#e0e7ff",
      iconColor: "#4338ca",
      badge: "Structured Data",
      desc: "Generate Google-compliant JSON-LD structured data for rich snippets, FAQs, Local Businesses, Articles, and Organizations with 1-click test."
    },
    {
      title: "Keyword Density Checker",
      href: "/tools/keyword-density-checker",
      icon: "fa-solid fa-chart-simple",
      iconBg: "#dcfce7",
      iconColor: "#15803d",
      badge: "Content Analysis",
      desc: "Analyze 1-word and 2-word semantic n-gram frequency, calculate reading ease, and prevent algorithmic keyword stuffing search penalties."
    },
    {
      title: "Word Counter & SEO Analyzer",
      href: "/tools/word-counter-seo-analyzer",
      icon: "fa-solid fa-feather-pointed",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      badge: "Real-Time Readability",
      desc: "Analyze word count, character density, reading level, keyword frequency, and Google SERP length limits in real time."
    },
    {
      title: "301 Redirect & .htaccess Suite",
      href: "/tools/redirect-htaccess-generator",
      icon: "fa-solid fa-arrow-right-arrow-left",
      iconBg: "#fef3c7",
      iconColor: "#d97706",
      badge: "Server & Rewrite Rules",
      desc: "Generate error-free Apache .htaccess, Nginx, and Cloudflare 301/302 redirects, HTTPS SSL enforcement, and WWW rewrite rules."
    },
    {
      title: "Robots.txt & Sitemap Suite",
      href: "/tools/robots-sitemap-generator",
      icon: "fa-solid fa-robot",
      iconBg: "#f1f5f9",
      iconColor: "#334155",
      badge: "Crawl Directives & Linter",
      desc: "Build crawler directives, block aggressive AI scrapers, validate sitemap syntax, and generate compliant XML sitemaps for Google indexation."
    },
    {
      title: "HTTP Header & Redirect Tracer",
      href: "/tools/http-header-checker",
      icon: "fa-solid fa-network-wired",
      iconBg: "#fae8ff",
      iconColor: "#a21caf",
      badge: "Server Diagnostic",
      desc: "Inspect live HTTP response codes (200, 301, 302, 404, 500), server latency TTFB, SSL certificates, and critical security headers."
    },
    {
      title: "Core Web Vitals & PageSpeed Diagnostics",
      href: "/tools/pagespeed-analyzer",
      icon: "fa-solid fa-gauge-high",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      badge: "⚡ PageSpeed & Vitals",
      desc: "Test mobile & desktop performance against official Google Core Web Vitals criteria (LCP, INP, CLS, TTFB) with actionable code fix suggestions."
    },
    {
      title: "SEO Friendly URL Slug & Permalink Generator",
      href: "/tools/url-slug-generator",
      icon: "fa-solid fa-link",
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      badge: "Clean Permalinks",
      desc: "Convert titles and keywords into clean, lowercase, stop-word stripped URL slugs with bulk multi-line conversion and CSV export."
    },
    {
      title: "Google Search Console Disavow File Generator",
      href: "/tools/disavow-file-generator",
      icon: "fa-solid fa-shield-virus",
      iconBg: "#fee2e2",
      iconColor: "#dc2626",
      badge: "🛡️ Spam Protection",
      desc: "Format, clean, and export 100% compliant disavow.txt files to neutralize toxic backlink penalties in Google Search Console."
    }
  ];

  const calcTools = [
    {
      title: "SEO ROI & Profit Calculator",
      href: "/tools/seo-roi-calculator",
      icon: "fa-solid fa-chart-line",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
      badge: "🔥 Client ROI",
      isPopular: true,
      desc: "Model your projected organic search traffic growth, estimate net revenue returns, and calculate how much ad spend you save vs. Google Ads PPC."
    },
    {
      title: "Custom Backlink Package Calculator",
      href: "/tools/backlink-package-calculator",
      icon: "fa-solid fa-sliders",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
      badge: "🔥 Live Pricing",
      isPopular: true,
      desc: "Configure custom link velocity across Profile Creation, Web 2.0, Bookmarks, and Guest Posts with real-time pricing and 1-click order fulfillment."
    },
    {
      title: "Google Ads ROI Calculator",
      href: "/tools/google-ads-roi-calculator",
      icon: "fa-brands fa-google",
      iconBg: "#fee2e2",
      iconColor: "#dc2626",
      badge: "Paid Search",
      desc: "Model click volume, lead conversion rates, customer lifetime value (LTV), and project your return on ad spend (ROAS) and CPA."
    },
    {
      title: "Facebook Ads ROI Calculator",
      href: "/tools/facebook-ads-roi-calculator",
      icon: "fa-brands fa-meta",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
      badge: "Paid Social",
      desc: "Forecast impressions, click-through rates, e-commerce purchases, and blended return on ad spend for Meta campaigns."
    },
    {
      title: "Website Cost Calculator",
      href: "/tools/website-cost-calculator",
      icon: "fa-solid fa-calculator",
      iconBg: "#f1f5f9",
      iconColor: "#475569",
      badge: "Scope Estimator",
      desc: "Configure technical scope, CMS requirements, page scale, and add-on modules to estimate development and optimization investments."
    },
    {
      title: "AI Automation Savings",
      href: "/tools/ai-automation-savings-calculator",
      icon: "fa-solid fa-microchip",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      badge: "Labor Efficiency",
      desc: "Calculate how automating repetitive marketing and operational workflows with AI and programmatic SEO reduces payroll overhead."
    },
    {
      title: "Love Compatibility Calculator",
      href: "/tools/love-calculator",
      icon: "fa-solid fa-heart",
      iconBg: "#ffe4e6",
      iconColor: "#e11d48",
      badge: "Fun & Romance",
      desc: "Calculate couple name matching score, romantic chemistry, love percentage algorithm, and relationship compatibility insights."
    }
  ];

  // Assign stable sequential numbers (#01 to #25)
  const allIndexedTools = useMemo(() => {
    const list = [];
    seoTools.forEach((t, i) => {
      list.push({ ...t, number: i + 1, category: "seo" });
    });
    calcTools.forEach((t, i) => {
      list.push({ ...t, number: seoTools.length + i + 1, category: "calc" });
    });
    return list;
  }, []);

  // Filtered tools based on search & category
  const filteredTools = useMemo(() => {
    return allIndexedTools.filter((tool) => {
      // Category filter
      if (activeCategory === "seo" && tool.category !== "seo") return false;
      if (activeCategory === "calc" && tool.category !== "calc") return false;
      if (activeCategory === "popular" && !tool.isPopular) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = tool.title.toLowerCase().includes(query);
        const matchesDesc = tool.desc.toLowerCase().includes(query);
        const matchesBadge = tool.badge.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesBadge;
      }

      return true;
    });
  }, [allIndexedTools, activeCategory, searchQuery]);

  const seoFiltered = useMemo(() => filteredTools.filter(t => t.category === "seo"), [filteredTools]);
  const calcFiltered = useMemo(() => filteredTools.filter(t => t.category === "calc"), [filteredTools]);

  return (
    <div className="tool-page-wrapper">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", display: "inline-flex" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "4px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", listStyle: "none", margin: 0 }}>
              <li style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <i className="fa-solid fa-house" style={{ fontSize: "0.78rem" }}></i> Home
                </Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
              <li style={{ color: "#0f172a", fontWeight: 700 }}>Free SEO &amp; Growth Tools ({allIndexedTools.length})</li>
            </ol>
          </nav>

          {/* Title & Subtitle */}
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
            <div className="sub-badge" style={{ marginBottom: "14px" }}>
              <i className="fa-solid fa-toolbox"></i> 100% Free · No Sign-up Required · 25 Production Utilities
            </div>
            <h1 className="page-title" style={{ fontSize: "2.8rem" }}>
              Free SEO &amp; Growth Marketing Tools Suite
            </h1>
            <p className="page-subtitle">
              Professional diagnostic utilities, technical SEO generators, and data-driven ROI calculators designed for founders, marketers, and webmasters.
            </p>
          </div>

          {/* Interactive Live Search & Category Filter Bar */}
          <div style={{ maxWidth: "860px", margin: "32px auto 0 auto", backgroundColor: "#ffffff", padding: "16px 20px", borderRadius: "4px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px", position: "relative" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "14px", top: "14px", color: "#94a3b8", fontSize: "15px" }}></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 25 free tools (e.g., SERP, Schema, Hreflang, Backlink, ROI, Cluster)..."
                style={{
                  width: "100%",
                  padding: "12px 38px 12px 42px",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  color: "#0f172a",
                  boxSizing: "border-box",
                  outline: "none"
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  title="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Filter Chips */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { id: "all", label: `All Tools (${allIndexedTools.length})`, icon: "fa-solid fa-border-all" },
                  { id: "seo", label: `Technical SEO (${seoTools.length})`, icon: "fa-solid fa-magnifying-glass-chart" },
                  { id: "calc", label: `Calculators & ROI (${calcTools.length})`, icon: "fa-solid fa-calculator" },
                  { id: "popular", label: `🔥 Most Popular (7)`, icon: "fa-solid fa-fire" },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActiveCategory(chip.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "1px solid",
                      borderColor: activeCategory === chip.id ? "#2563eb" : "#e2e8f0",
                      backgroundColor: activeCategory === chip.id ? "#2563eb" : "#f8fafc",
                      color: activeCategory === chip.id ? "#ffffff" : "#475569",
                      fontWeight: activeCategory === chip.id ? 700 : 600,
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <i className={chip.icon}></i> {chip.label}
                  </button>
                ))}
              </div>

              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
                Showing <strong>{filteredTools.length}</strong> of {allIndexedTools.length}
              </span>
            </div>
          </div>

          {/* Trust Value Badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
              <i className="fa-solid fa-circle-check text-success"></i> Google Guideline Compliant
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
              <i className="fa-solid fa-bolt text-primary"></i> Real-time Instant Calculations
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
              <i className="fa-solid fa-shield-halved" style={{ color: "#8b5cf6" }}></i> 100% Privacy &amp; Data Safe
            </div>
          </div>

        </div>
      </section>

      {/* Main Tools Sections */}
      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* No results empty state */}
          {filteredTools.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 20px", backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", margin: "20px 0" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "40px", color: "#cbd5e1", marginBottom: "16px", display: "block" }}></i>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                No tools matched your search query &ldquo;{searchQuery}&rdquo;
              </h3>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "18px" }}>
                Try searching for a different keyword or reset filters to see all 25 tools.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* ================= SECTION 1: SEO & TECHNICAL OPTIMIZATION TOOLS ================= */}
          {seoFiltered.length > 0 && (
            <div style={{ marginBottom: "56px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px", paddingBottom: "14px", borderBottom: "2px solid #e2e8f0" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </span>
                <div>
                  <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Technical SEO &amp; Optimization Utilities ({seoFiltered.length})
                  </h2>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Audit on-page SEO health, generate JSON-LD schema, simulate Google SERP snippets, and verify crawler directives.
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {seoFiltered.map((tool) => (
                  <article key={tool.slug} className="tool-ref-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="tool-ref-icon" style={{ background: tool.iconBg, color: tool.iconColor, margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {tool.iconImg ? (
                            <img src={tool.iconImg} alt={tool.title} style={{ width: "22px", height: "22px", objectFit: "contain", display: "block" }} />
                          ) : (
                            <i className={tool.icon}></i>
                          )}
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563eb", background: "#eff6ff", border: "1px solid #dbeafe", padding: "2px 8px", borderRadius: "4px" }}>
                          #{String(tool.number).padStart(2, "0")}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.75rem", padding: "3px 10px", background: "#f1f5f9", borderRadius: "4px", color: "#475569", fontWeight: 700 }}>
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="tool-ref-title">
                      <Link href={tool.href}>{tool.title}</Link>
                    </h3>
                    <p className="tool-ref-desc">
                      {tool.desc}
                    </p>
                    <div className="tool-ref-footer">
                      <Link href={tool.href} className="tool-ref-link">
                        Launch Free Tool <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ================= SECTION 2: MARKETING & ROI CALCULATORS ================= */}
          {calcFiltered.length > 0 && (
            <div style={{ marginBottom: "50px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px", paddingBottom: "14px", borderBottom: "2px solid #e2e8f0" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                  <i className="fa-solid fa-calculator"></i>
                </span>
                <div>
                  <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Marketing ROI &amp; Investment Calculators ({calcFiltered.length})
                  </h2>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Model paid search &amp; social advertising returns, estimate development budgets, and project AI labor savings.
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {calcFiltered.map((tool) => (
                  <article key={tool.slug} className="tool-ref-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="tool-ref-icon" style={{ background: tool.iconBg, color: tool.iconColor, margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className={tool.icon}></i>
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "2px 8px", borderRadius: "4px" }}>
                          #{String(tool.number).padStart(2, "0")}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.75rem", padding: "3px 10px", background: "#f1f5f9", borderRadius: "4px", color: "#475569", fontWeight: 700 }}>
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="tool-ref-title">
                      <Link href={tool.href}>{tool.title}</Link>
                    </h3>
                    <p className="tool-ref-desc">
                      {tool.desc}
                    </p>
                    <div className="tool-ref-footer">
                      <Link href={tool.href} className="tool-ref-link">
                        Launch Free Calculator <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Custom SEO & Consultation Banner */}
          <div style={{ marginTop: "40px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "4px", padding: "44px 36px", textAlign: "center", color: "#ffffff", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.2)" }}>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 800, margin: "0 0 12px", color: "#ffffff" }}>
              Need a Custom Technical SEO Audit or Dedicated Organic Strategy?
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", maxWidth: "680px", margin: "0 auto 26px", lineHeight: 1.6 }}>
              Automated tools are great for initial diagnostics, but human expertise discovers deep architectural bottlenecks, indexation leaks, and untapped keyword ranking opportunities.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#2563eb", color: "#ffffff", padding: "12px 28px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}>
                <i className="fa-solid fa-comments"></i> Book Free Growth Consultation
              </Link>
              <Link href="/services" style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", padding: "12px 28px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                View All SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
