"use client";

import { useState } from "react";
import Link from "next/link";

export default function RobotsSitemapGenerator() {
  const [activeTab, setActiveTab] = useState("robots");
  const [copied, setCopied] = useState(false);

  // Robots states
  const [defaultAccess, setDefaultAccess] = useState("allow");
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/wp-admin/\n/cart/\n/checkout/\n/account/");
  const [crawlDelay, setCrawlDelay] = useState("0");
  const [blockAiBots, setBlockAiBots] = useState(false);

  // Sitemap states
  const [domain, setDomain] = useState("https://example.com");
  const [urls, setUrls] = useState("/\n/about\n/services\n/services/technical-seo\n/blog\n/contact");
  const [changeFreq, setChangeFreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");

  // Presets
  const applyRobotsPreset = (type) => {
    if (type === "standard") {
      setDefaultAccess("allow");
      setDisallowPaths("/admin/\n/wp-admin/\n/cart/\n/checkout/");
      setBlockAiBots(false);
    } else if (type === "staging") {
      setDefaultAccess("disallow");
      setDisallowPaths("/");
      setBlockAiBots(false);
    } else if (type === "block-ai") {
      setDefaultAccess("allow");
      setDisallowPaths("/admin/\n/wp-admin/\n/cart/\n/checkout/");
      setBlockAiBots(true);
    } else if (type === "ecommerce") {
      setDefaultAccess("allow");
      setDisallowPaths("/cart/\n/checkout/\n/my-account/\n/search/\n/api/\n/*?*sort=*");
      setBlockAiBots(false);
    }
  };

  // Generate Robots.txt
  const generateRobotsTxt = () => {
    let output = "# Robots.txt Generated via Digi Solution Suite\n";
    output += "User-agent: *\n";
    if (defaultAccess === "disallow") {
      output += "Disallow: /\n";
    } else {
      const paths = disallowPaths.split("\n").map(p => p.trim()).filter(Boolean);
      paths.forEach(p => {
        output += `Disallow: ${p}\n`;
      });
      output += "Allow: /\n";
    }

    if (parseInt(crawlDelay, 10) > 0) {
      output += `Crawl-delay: ${crawlDelay}\n`;
    }

    if (blockAiBots) {
      output += "\n# Block Aggressive AI Data Scrapers\n";
      output += "User-agent: GPTBot\nDisallow: /\n";
      output += "User-agent: CCBot\nDisallow: /\n";
      output += "User-agent: ClaudeBot\nDisallow: /\n";
      output += "User-agent: Bytespider\nDisallow: /\n";
      output += "User-agent: PerplexityBot\nDisallow: /\n";
    }

    if (sitemapUrl.trim()) {
      output += `\nSitemap: ${sitemapUrl.trim()}\n`;
    }

    return output;
  };

  // Generate XML Sitemap
  const generateXmlSitemap = () => {
    const cleanDomain = domain.replace(/\/+$/, '');
    const pathList = urls.split("\n").map(u => u.trim()).filter(Boolean);
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    pathList.forEach(p => {
      const fullUrl = p.startsWith("http") ? p : `${cleanDomain}/${p.replace(/^\/+/, '')}`;
      xml += `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changeFreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  };

  const currentCode = activeTab === "robots" ? generateRobotsTxt() : generateXmlSitemap();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: "text/plain" });
    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = activeTab === "robots" ? "robots.txt" : "sitemap.xml";
    a.click();
    URL.revokeObjectURL(fileUrl);
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
            <i className="fa-solid fa-robot"></i> Crawler Directives
          </div>
          <h1 className="page-title">Robots.txt &amp; XML Sitemap Generator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Build syntax-valid robots.txt crawler rules and Google-compliant XML sitemaps ready for immediate production deployment.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          {/* TAB SWITCHER */}
          <div className="schema-type-tabs">
            <button
              type="button"
              className={`schema-tab-btn ${activeTab === "robots" ? "active" : ""}`}
              onClick={() => setActiveTab("robots")}
            >
              <i className="fa-solid fa-robot"></i> Robots.txt Directives
            </button>
            <button
              type="button"
              className={`schema-tab-btn ${activeTab === "sitemap" ? "active" : ""}`}
              onClick={() => setActiveTab("sitemap")}
            >
              <i className="fa-solid fa-sitemap"></i> XML Sitemap Builder
            </button>
          </div>

          <div className="schema-generator-grid">
            {/* CONFIG FORM */}
            <div className="schema-form-box">
              <h2 className="form-box-title">
                {activeTab === "robots" ? "Robots.txt Configuration" : "XML Sitemap Parameters"}
              </h2>

              {activeTab === "robots" ? (
                <div>
                  {/* Preset Chips */}
                  <div style={{ marginBottom: "18px" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                      Quick Setup Presets
                    </span>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("standard")}
                        style={{ padding: "4px 10px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}
                      >
                        Standard SEO
                      </button>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("block-ai")}
                        style={{ padding: "4px 10px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", borderRadius: "6px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 700 }}
                      >
                        Block AI Bots
                      </button>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("ecommerce")}
                        style={{ padding: "4px 10px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}
                      >
                        E-Commerce
                      </button>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("staging")}
                        style={{ padding: "4px 10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: "6px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}
                      >
                        Block All (Staging)
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Default Bot Crawler Permission</label>
                    <select
                      value={defaultAccess}
                      onChange={(e) => setDefaultAccess(e.target.value)}
                      className="form-select"
                    >
                      <option value="allow">Allow All Search Crawlers (Standard Production)</option>
                      <option value="disallow">Disallow All (Private / Staging Environments)</option>
                    </select>
                  </div>

                  {defaultAccess === "allow" && (
                    <div className="form-group">
                      <label className="form-label">
                        <span>Disallowed Directory Paths</span>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>1 rule per line</span>
                      </label>
                      <textarea
                        rows={4}
                        value={disallowPaths}
                        onChange={(e) => setDisallowPaths(e.target.value)}
                        className="form-textarea"
                        placeholder="/admin/&#10;/cart/&#10;/checkout/"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">XML Sitemap URL Location</label>
                    <input
                      type="url"
                      value={sitemapUrl}
                      onChange={(e) => setSitemapUrl(e.target.value)}
                      className="form-input"
                      placeholder="https://example.com/sitemap.xml"
                    />
                  </div>

                  {/* AI Bot Toggle */}
                  <div style={{ padding: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", marginTop: "14px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#0f172a", fontWeight: 600, cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={blockAiBots}
                        onChange={(e) => setBlockAiBots(e.target.checked)}
                        style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
                      />
                      <span>Block AI Scrapers (GPTBot, ClaudeBot, CCBot, Perplexity)</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label className="form-label">Website Domain Root</label>
                    <input
                      type="url"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="form-input"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>URL Paths to Include</span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>1 per line</span>
                    </label>
                    <textarea
                      rows={6}
                      value={urls}
                      onChange={(e) => setUrls(e.target.value)}
                      className="form-textarea"
                      placeholder="/&#10;/about&#10;/services&#10;/contact"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Change Frequency</label>
                      <select
                        value={changeFreq}
                        onChange={(e) => setChangeFreq(e.target.value)}
                        className="form-select"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly (Recommended)</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Priority Weight</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="form-select"
                      >
                        <option value="1.0">1.0 (Home / Cornerstone)</option>
                        <option value="0.8">0.8 (Main Services &amp; Hubs)</option>
                        <option value="0.5">0.5 (Standard Articles)</option>
                        <option value="0.3">0.3 (Utility Pages)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CODE OUTPUT BOX */}
            <div className="schema-output-box">
              <div className="code-header">
                <span className="code-title">
                  <i className={`fa-solid ${activeTab === "robots" ? "fa-file-lines" : "fa-code"}`}></i>
                  {activeTab === "robots" ? "robots.txt Live Output" : "sitemap.xml Live Output"}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleDownload}
                    style={{ borderColor: "#475569", color: "#e2e8f0" }}
                  >
                    <i className="fa-solid fa-download"></i> Download
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <i className="fa-solid fa-check"></i> Copied!
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-copy"></i> Copy File
                      </>
                    )}
                  </button>
                </div>
              </div>

              <pre className="code-block">
                <code>{currentCode}</code>
              </pre>

              <div style={{ padding: "14px 18px", background: "#1e293b", borderTop: "1px solid #334155", fontSize: "0.78rem", color: "#94a3b8" }}>
                <i className="fa-solid fa-circle-info text-primary"></i> Deploy to the root directory of your website domain (e.g. <code>https://example.com/{activeTab === "robots" ? "robots.txt" : "sitemap.xml"}</code>).
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related Technical Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Verify status codes, structured schema, and check full page SEO health.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fae8ff", color: "#a21caf" }}>
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/http-header-checker">HTTP Header Checker</Link></h4>
                <p className="tool-ref-desc">Inspect status codes, 301 redirects, SSL, and security headers.</p>
                <div className="tool-ref-footer"><Link href="/tools/http-header-checker" className="tool-ref-link">Check Headers <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/website-seo-analyzer">Website SEO Analyzer</Link></h4>
                <p className="tool-ref-desc">Audit on-page SEO score, tags, headings, and canonicals.</p>
                <div className="tool-ref-footer"><Link href="/tools/website-seo-analyzer" className="tool-ref-link">Audit Website <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#e0e7ff", color: "#4338ca" }}>
                  <i className="fa-solid fa-code"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/schema-markup-generator">Schema Markup Generator</Link></h4>
                <p className="tool-ref-desc">Build Google-compliant JSON-LD structured data for rich snippets.</p>
                <div className="tool-ref-footer"><Link href="/tools/schema-markup-generator" className="tool-ref-link">Generate Schema <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Need Enterprise Crawl Budget Optimization &amp; Indexation Strategy?</h4>
            <p>We solve deep JavaScript rendering bottlenecks, orphaned page loops, and faceted navigation index bloat.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-comments"></i> Consult Technical Team
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm">
                Technical SEO Audits <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
