"use client";

import { useState } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function RobotsSitemapGenerator() {
  const [activeTab, setActiveTab] = useState("robots"); // robots, sitemap, validator
  const [copied, setCopied] = useState(false);

  // Robots states
  const [defaultAccess, setDefaultAccess] = useState("allow");
  const [sitemapUrl, setSitemapUrl] = useState("https://abdullahbdseo.com/sitemap.xml");
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/wp-admin/\n/cart/\n/checkout/\n/account/\n/api/");
  const [crawlDelay, setCrawlDelay] = useState("0");
  const [blockAiBots, setBlockAiBots] = useState(false);

  // Sitemap states
  const [domain, setDomain] = useState("https://abdullahbdseo.com");
  const [urls, setUrls] = useState("/\n/services\n/services/technical-seo-service-in-bangladesh\n/services/backlink-service-in-bangladesh\n/services/local-seo-service-in-bangladesh\n/services/ecommerce-seo-service-in-bangladesh\n/services/aeo-service-in-bangladesh\n/services/geo-service-in-bangladesh\n/services/ai-seo-service-in-bangladesh\n/pricing\n/tools\n/tools/backlink-package-calculator\n/contact");
  const [changeFreq, setChangeFreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");

  // Validator states
  const [validatorInput, setValidatorInput] = useState(`User-agent: *
Disallow: /admin/
Disallow: /checkout/
Allow: /

# Block AI scrapers
User-agent: GPTBot
Disallow: /

Sitemap: https://abdullahbdseo.com/sitemap.xml`);

  // Presets
  const applyRobotsPreset = (type) => {
    if (type === "standard") {
      setDefaultAccess("allow");
      setDisallowPaths("/admin/\n/wp-admin/\n/cart/\n/checkout/\n/api/");
      setBlockAiBots(false);
    } else if (type === "staging") {
      setDefaultAccess("disallow");
      setDisallowPaths("/");
      setBlockAiBots(false);
    } else if (type === "block-ai") {
      setDefaultAccess("allow");
      setDisallowPaths("/admin/\n/wp-admin/\n/cart/\n/checkout/\n/api/");
      setBlockAiBots(true);
    } else if (type === "ecommerce") {
      setDefaultAccess("allow");
      setDisallowPaths("/cart/\n/checkout/\n/my-account/\n/search/\n/api/\n/*?*sort=*");
      setBlockAiBots(false);
    }
  };

  // Generate Robots.txt
  const generateRobotsTxt = () => {
    let output = "# Robots.txt Generated via Abdullah Saleh SEO Suite\n";
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
      output += "\n# Block Aggressive AI Data Scrapers & Training Crawlers\n";
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

  // Validator Engine
  const validateCode = (input) => {
    const lines = input.split("\n").map(l => l.trim()).filter(Boolean);
    const issues = [];
    let isXml = input.includes("<?xml") || input.includes("<urlset");

    if (isXml) {
      if (!input.includes("<urlset")) issues.push({ type: "error", msg: "Missing root <urlset> tag." });
      if (!input.includes("<loc>")) issues.push({ type: "error", msg: "No <loc> URLs found in sitemap." });
      if (!input.includes("http://") && !input.includes("https://")) issues.push({ type: "error", msg: "URLs must be fully qualified absolute addresses (starting with https://)." });
      if (!issues.length) issues.push({ type: "success", msg: "XML Sitemap structure is valid and adheres to sitemaps.org 0.9 schema." });
    } else {
      const hasUserAgent = lines.some(l => l.toLowerCase().startsWith("user-agent:"));
      const hasSitemap = lines.some(l => l.toLowerCase().startsWith("sitemap:"));
      const hasDisallowAll = lines.some(l => l.toLowerCase() === "disallow: /" || l.toLowerCase() === "disallow:/");

      if (!hasUserAgent) {
        issues.push({ type: "error", msg: "Missing 'User-agent:' directive. Every robots.txt must declare at least one User-agent." });
      }
      if (hasDisallowAll) {
        issues.push({ type: "warning", msg: "Warning: 'Disallow: /' will block search engines from crawling the entire website." });
      }
      if (!hasSitemap) {
        issues.push({ type: "warning", msg: "Notice: No 'Sitemap:' directive declared. Adding your XML sitemap URL helps bots discover all pages faster." });
      } else {
        issues.push({ type: "success", msg: "Sitemap directive is properly defined." });
      }
      if (hasUserAgent && !hasDisallowAll) {
        issues.push({ type: "success", msg: "Robots.txt syntax is clean and ready for search engine crawler indexing." });
      }
    }
    return issues;
  };

  const validationResults = validateCode(validatorInput);

  const currentCode = activeTab === "robots" 
    ? generateRobotsTxt() 
    : activeTab === "sitemap" 
      ? generateXmlSitemap() 
      : validatorInput;

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
      <section className="page-header-section" style={{ padding: "50px 0 30px", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", marginBottom: "12px" }}>
            <i className="fa-solid fa-arrow-left"></i> All Free SEO Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f1f5f9", color: "#334155", padding: "4px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 auto 10px" }}>
            <i className="fa-solid fa-robot"></i> Crawler Rules &amp; Indexation
          </div>
          <h1 className="page-title" style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
            Robots.txt &amp; XML Sitemap Generator &amp; Validator
          </h1>
          <p className="page-subtitle max-w-2xl mx-auto" style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Build and validate production-ready <strong>robots.txt crawler rules, AI bot blockers, and Google XML sitemaps</strong> with live syntax error detection.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "25px", paddingBottom: "70px" }}>
        <div className="container" style={{ maxWidth: "1180px" }}>
          
          {/* TAB SWITCHER */}
          <div className="schema-type-tabs" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            <button
              type="button"
              className={`schema-tab-btn ${activeTab === "robots" ? "active" : ""}`}
              onClick={() => setActiveTab("robots")}
              style={{
                padding: "9px 18px",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: activeTab === "robots" ? "#2563eb" : "#cbd5e1",
                background: activeTab === "robots" ? "#2563eb" : "#ffffff",
                color: activeTab === "robots" ? "#ffffff" : "#334155",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fa-solid fa-robot"></i> Robots.txt Directives
            </button>
            <button
              type="button"
              className={`schema-tab-btn ${activeTab === "sitemap" ? "active" : ""}`}
              onClick={() => setActiveTab("sitemap")}
              style={{
                padding: "9px 18px",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: activeTab === "sitemap" ? "#2563eb" : "#cbd5e1",
                background: activeTab === "sitemap" ? "#2563eb" : "#ffffff",
                color: activeTab === "sitemap" ? "#ffffff" : "#334155",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fa-solid fa-sitemap"></i> XML Sitemap Builder
            </button>
            <button
              type="button"
              className={`schema-tab-btn ${activeTab === "validator" ? "active" : ""}`}
              onClick={() => setActiveTab("validator")}
              style={{
                padding: "9px 18px",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: activeTab === "validator" ? "#2563eb" : "#cbd5e1",
                background: activeTab === "validator" ? "#2563eb" : "#ffffff",
                color: activeTab === "validator" ? "#ffffff" : "#334155",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fa-solid fa-spell-check"></i> Syntax Validator &amp; Linter
            </button>
          </div>

          <div className="schema-generator-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "28px", alignItems: "start" }}>
            
            {/* CONFIG FORM */}
            <div className="schema-form-box" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <h2 className="form-box-title" style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: "0 0 16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                {activeTab === "robots" && "Robots.txt Directives Configuration"}
                {activeTab === "sitemap" && "XML Sitemap Parameters & URLs"}
                {activeTab === "validator" && "Robots.txt & Sitemap Syntax Validator"}
              </h2>

              {/* 1. ROBOTS TAB */}
              {activeTab === "robots" && (
                <div>
                  {/* Preset Chips */}
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                      Quick Setup Presets
                    </span>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("standard")}
                        style={{ padding: "5px 12px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 700 }}
                      >
                        Standard SEO
                      </button>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("block-ai")}
                        style={{ padding: "5px 12px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 700 }}
                      >
                        Block AI Bots
                      </button>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("ecommerce")}
                        style={{ padding: "5px 12px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 700 }}
                      >
                        E-Commerce
                      </button>
                      <button
                        type="button"
                        onClick={() => applyRobotsPreset("staging")}
                        style={{ padding: "5px 12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 700 }}
                      >
                        Block All (Staging)
                      </button>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label className="form-label" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Default Bot Crawler Permission</label>
                    <select
                      value={defaultAccess}
                      onChange={(e) => setDefaultAccess(e.target.value)}
                      className="form-select"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                    >
                      <option value="allow">Allow All Search Crawlers (Standard Production)</option>
                      <option value="disallow">Disallow All (Private / Staging Environments)</option>
                    </select>
                  </div>

                  {defaultAccess === "allow" && (
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label className="form-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                        <span style={{ color: "#334155" }}>Disallowed Directory Paths</span>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>1 rule per line</span>
                      </label>
                      <textarea
                        rows={4}
                        value={disallowPaths}
                        onChange={(e) => setDisallowPaths(e.target.value)}
                        className="form-textarea"
                        style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem", fontFamily: "monospace" }}
                        placeholder="/admin/&#10;/cart/&#10;/checkout/"
                      />
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label className="form-label" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>XML Sitemap URL Reference</label>
                    <input
                      type="url"
                      value={sitemapUrl}
                      onChange={(e) => setSitemapUrl(e.target.value)}
                      className="form-input"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                      placeholder="https://example.com/sitemap.xml"
                    />
                  </div>

                  {/* AI Bot Toggle */}
                  <div style={{ padding: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", marginTop: "14px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "#0f172a", fontWeight: 700, cursor: "pointer" }}>
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
              )}

              {/* 2. SITEMAP TAB */}
              {activeTab === "sitemap" && (
                <div>
                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label className="form-label" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Website Domain Root</label>
                    <input
                      type="url"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="form-input"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label className="form-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                      <span style={{ color: "#334155" }}>URL Paths to Include in XML</span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>1 per line</span>
                    </label>
                    <textarea
                      rows={6}
                      value={urls}
                      onChange={(e) => setUrls(e.target.value)}
                      className="form-textarea"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem", fontFamily: "monospace" }}
                      placeholder="/&#10;/about&#10;/services&#10;/contact"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Change Frequency</label>
                      <select
                        value={changeFreq}
                        onChange={(e) => setChangeFreq(e.target.value)}
                        className="form-select"
                        style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly (Recommended)</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Priority Weight</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="form-select"
                        style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
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

              {/* 3. VALIDATOR TAB */}
              {activeTab === "validator" && (
                <div>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 12px" }}>
                    Paste your robots.txt or XML sitemap below to run a real-time syntax and directive audit.
                  </p>
                  <textarea
                    rows={8}
                    value={validatorInput}
                    onChange={(e) => setValidatorInput(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", fontFamily: "monospace" }}
                    placeholder="User-agent: *&#10;Disallow: /admin/&#10;Sitemap: https://..."
                  />

                  {/* Diagnostic Results */}
                  <div style={{ marginTop: "16px" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                      Diagnostic Audit Findings ({validationResults.length}):
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {validationResults.map((res, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: res.type === "success" ? "#f0fdf4" : res.type === "warning" ? "#fefce8" : "#fef2f2",
                            border: `1px solid ${res.type === "success" ? "#bbf7d0" : res.type === "warning" ? "#fef08a" : "#fecaca"}`,
                            color: res.type === "success" ? "#15803d" : res.type === "warning" ? "#854d0e" : "#b91c1c"
                          }}
                        >
                          <i className={`fa-solid ${res.type === "success" ? "fa-circle-check" : res.type === "warning" ? "fa-triangle-exclamation" : "fa-circle-xmark"}`}></i>
                          <span>{res.msg}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CODE OUTPUT BOX */}
            <div className="schema-output-box" style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "4px", overflow: "hidden", color: "#ffffff" }}>
              <div className="code-header" style={{ padding: "14px 18px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b" }}>
                <span className="code-title" style={{ fontSize: "0.85rem", fontWeight: 800, color: "#e2e8f0", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <i className={`fa-solid ${activeTab === "robots" ? "fa-file-lines text-blue-400" : activeTab === "sitemap" ? "fa-code text-green-400" : "fa-spell-check text-yellow-400"}`}></i>
                  {activeTab === "robots" && "robots.txt Live Directives"}
                  {activeTab === "sitemap" && "sitemap.xml Live Output"}
                  {activeTab === "validator" && "Validated Clean File"}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleDownload}
                    style={{ padding: "5px 12px", border: "1px solid #475569", background: "transparent", color: "#e2e8f0", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-download mr-1"></i> Download
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleCopy}
                    style={{ padding: "5px 14px", border: "none", background: "#2563eb", color: "#ffffff", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    {copied ? <><i className="fa-solid fa-check mr-1"></i> Copied!</> : <><i className="fa-solid fa-copy mr-1"></i> Copy Code</>}
                  </button>
                </div>
              </div>

              <pre className="code-block" style={{ margin: 0, padding: "18px", fontSize: "0.82rem", lineHeight: 1.6, maxHeight: "380px", overflowY: "auto", fontFamily: "monospace", color: "#a5f3fc" }}>
                <code>{currentCode}</code>
              </pre>

              <div style={{ padding: "12px 18px", background: "#1e293b", borderTop: "1px solid #334155", fontSize: "0.78rem", color: "#94a3b8" }}>
                <i className="fa-solid fa-circle-info text-primary mr-1"></i> Deploy to the root folder of your website domain (e.g. <code>https://yourdomain.com/{activeTab === "sitemap" ? "sitemap.xml" : "robots.txt"}</code>).
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section" style={{ marginTop: "40px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related SEO Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Verify crawler directives, simulate snippets, and check server response headers.
            </p>
            <div className="related-tools-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "18px" }}>
              <div className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                <div className="tool-ref-icon" style={{ background: "#fef3c7", color: "#d97706", width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}><Link href="/tools/serp-simulator" style={{ color: "#0f172a", textDecoration: "none" }}>Meta Tag &amp; Open Graph Previewer</Link></h4>
                <p className="tool-ref-desc" style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>Preview Google, Facebook, Twitter, and WhatsApp social cards.</p>
                <Link href="/tools/serp-simulator" className="tool-ref-link" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Simulate SERP <i className="fa-solid fa-arrow-right"></i></Link>
              </div>

              <div className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                <div className="tool-ref-icon" style={{ background: "#e0e7ff", color: "#4338ca", width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <i className="fa-solid fa-code"></i>
                </div>
                <h4 className="tool-ref-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}><Link href="/tools/schema-markup-generator" style={{ color: "#0f172a", textDecoration: "none" }}>Schema Markup Generator</Link></h4>
                <p className="tool-ref-desc" style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>Generate rich JSON-LD structured data for Google rich snippets.</p>
                <Link href="/tools/schema-markup-generator" className="tool-ref-link" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Build Schema <i className="fa-solid fa-arrow-right"></i></Link>
              </div>

              <div className="tool-ref-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                <div className="tool-ref-icon" style={{ background: "#eff6ff", color: "#2563eb", width: "40px", height: "40px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <i className="fa-solid fa-sliders"></i>
                </div>
                <h4 className="tool-ref-title" style={{ margin: "0 0 6px", fontSize: "1.05rem" }}><Link href="/tools/backlink-package-calculator" style={{ color: "#0f172a", textDecoration: "none" }}>Backlink Package Calculator</Link></h4>
                <p className="tool-ref-desc" style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 10px" }}>Configure custom high-DA link packages with instant USD/BDT pricing.</p>
                <Link href="/tools/backlink-package-calculator" className="tool-ref-link" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>Calculate Packages <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <ToolFaqAccordion
            title="Robots.txt &amp; XML Sitemap Indexation FAQ"
            faqs={[
              {
                q: "What is the primary difference between Robots.txt and XML Sitemap?",
                a: "A robots.txt file provides crawling directives—telling search engine spiders and AI scrapers which URLs they are allowed or forbidden from accessing. An XML sitemap, on the other hand, acts as a master roadmap of all indexable pages to ensure search engines discover and crawl every critical URL on your domain."
              },
              {
                q: "Why is blocking AI bots (GPTBot, ClaudeBot, CCBot) useful?",
                a: "Blocking AI scrapers in robots.txt prevents automated LLM training bots from scraping your proprietary content without permission, and saves server bandwidth and CPU resources from high-frequency crawling overhead."
              },
              {
                q: "Where should robots.txt and sitemap.xml be hosted?",
                a: "Both files must reside at the root level of your website domain: https://yourdomain.com/robots.txt and https://yourdomain.com/sitemap.xml. In Next.js, place static files in /public or generate them dynamically in /app/robots.js and /app/sitemap.js."
              },
              {
                q: "Does Disallow in robots.txt prevent a URL from appearing in Google Search?",
                a: "Not necessarily. Disallow prevents search engines from crawling the page content, but if external backlinks point to that URL, Google may still index the URL without a snippet. To completely prevent indexation, use a 'noindex' meta tag on an accessible page."
              }
            ]}
          />

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box" style={{ background: "#0f172a", color: "#ffffff", borderRadius: "4px", padding: "36px 24px", textAlign: "center", marginTop: "40px" }}>
            <h4 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0 0 10px" }}>Need Forensic Technical Crawl &amp; Indexation Audits?</h4>
            <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 20px", fontSize: "0.95rem" }}>We diagnose crawl budget bottlenecks, indexation drops, redirect loops, and server errors.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm" style={{ background: "#2563eb", color: "#ffffff", padding: "10px 20px", borderRadius: "4px", fontWeight: 700, textDecoration: "none" }}>
                <i className="fa-solid fa-calendar-check mr-1"></i> Book Technical Consultation
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm" style={{ border: "1px solid #475569", color: "#ffffff", padding: "10px 20px", borderRadius: "4px", fontWeight: 700, textDecoration: "none" }}>
                Explore Technical SEO <i className="fa-solid fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
