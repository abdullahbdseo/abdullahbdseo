"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebsiteSeoAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = `https://${targetUrl}`;
      setUrl(targetUrl);
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tools/seo-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to analyze website. Please verify the URL and try again.");
      }
    } catch (err) {
      setError("Network error while connecting to server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sampleUrl) => {
    setUrl(sampleUrl);
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
            <i className="fa-solid fa-magnifying-glass-chart"></i> Instant Diagnostics
          </div>
          <h1 className="page-title">Website SEO Health Analyzer</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Audit meta titles, descriptions, heading structure, canonicals, robots directives, and image alt tags in seconds.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1040px" }}>
          
          {/* Main Search Card */}
          <div className="tool-card-container">
            <form onSubmit={handleAnalyze} className="tool-input-row">
              <input
                type="text"
                placeholder="Enter URL to audit (e.g. https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="form-input tool-main-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ minWidth: "160px", whiteSpace: "nowrap" }}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Auditing...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt"></i> Run SEO Audit
                  </>
                )}
              </button>
            </form>

            {/* Sample URLs */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontSize: "0.82rem", color: "#64748b", flexWrap: "wrap" }}>
              <span>Try sample:</span>
              <button
                type="button"
                onClick={() => loadSample("https://google.com")}
                style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", color: "#334155" }}
              >
                google.com
              </button>
              <button
                type="button"
                onClick={() => loadSample("https://github.com")}
                style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", color: "#334155" }}
              >
                github.com
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ marginTop: "24px", padding: "16px 20px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px", color: "#991b1b", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "1.2rem", marginTop: "2px" }}></i>
                <div>
                  <strong style={{ display: "block", marginBottom: "2px" }}>Analysis Error</strong>
                  <p style={{ margin: 0, fontSize: "0.88rem" }}>{error}</p>
                </div>
              </div>
            )}

            {/* Audit Results */}
            {result && (
              <div style={{ marginTop: "32px" }}>
                {/* Score Banner */}
                <div className="tool-score-banner">
                  <div className={`score-badge ${result.score >= 80 ? "score-good" : result.score >= 50 ? "score-avg" : "score-bad"}`}>
                    {result.score}
                  </div>
                  <div className="score-details" style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                      <h3>
                        {result.score >= 80 ? "Strong SEO Health" : result.score >= 50 ? "Moderate SEO Health - Improvements Needed" : "Critical SEO Issues Detected"}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            color: "#ffffff",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          <i className="fa-solid fa-print"></i> Print / PDF Report
                        </button>
                        <Link
                          href={`/tools/seo-audit-report-generator?url=${encodeURIComponent(result.url)}`}
                          style={{
                            background: "#22c55e",
                            border: "none",
                            color: "#ffffff",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            textDecoration: "none"
                          }}
                        >
                          <i className="fa-solid fa-file-invoice"></i> Full PDF Report
                        </Link>
                        <span style={{ fontSize: "0.8rem", padding: "4px 10px", borderRadius: "4px", background: "rgba(255,255,255,0.15)", color: "#ffffff", fontWeight: 700 }}>
                          HTTP {result.statusCode}
                        </span>
                      </div>
                    </div>
                    <p style={{ marginTop: "6px" }}>
                      Audited URL: <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a>
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "8px", borderBottom: "2px solid #e2e8f0", margin: "24px 0 20px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    style={{ padding: "10px 18px", border: "none", background: "transparent", borderBottom: activeTab === "overview" ? "2px solid #2563eb" : "2px solid transparent", color: activeTab === "overview" ? "#2563eb" : "#64748b", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", marginBottom: "-2px" }}
                  >
                    <i className="fa-solid fa-chart-pie"></i> Passed &amp; Issues
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("tags")}
                    style={{ padding: "10px 18px", border: "none", background: "transparent", borderBottom: activeTab === "tags" ? "2px solid #2563eb" : "2px solid transparent", color: activeTab === "tags" ? "#2563eb" : "#64748b", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", marginBottom: "-2px" }}
                  >
                    <i className="fa-solid fa-code"></i> Metadata Inspector
                  </button>
                </div>

                {/* TAB 1: OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="tool-findings-grid">
                    {/* Passed Checks */}
                    <div className="findings-col" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
                      <h4 className="findings-title" style={{ color: "#166534" }}>
                        <i className="fa-solid fa-circle-check text-success"></i> Passed Audits ({result.passed?.length || 0})
                      </h4>
                      <ul className="findings-list">
                        {result.passed?.map((item, idx) => (
                          <li key={idx}>
                            <i className="fa-solid fa-check text-success" style={{ marginTop: "4px" }}></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Identified Issues */}
                    <div className="findings-col" style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
                      <h4 className="findings-title" style={{ color: "#991b1b" }}>
                        <i className="fa-solid fa-triangle-exclamation text-danger"></i> Identified Issues ({result.issues?.length || 0})
                      </h4>
                      <ul className="findings-list">
                        {result.issues?.length > 0 ? (
                          result.issues.map((item, idx) => (
                            <li key={idx}>
                              <i className="fa-solid fa-xmark text-danger" style={{ marginTop: "4px" }}></i>
                              <span>{item}</span>
                            </li>
                          ))
                        ) : (
                          <li style={{ color: "#166534", fontWeight: 600 }}>
                            <i className="fa-solid fa-shield-check"></i> Great job! No critical on-page issues detected.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 2: METADATA DETAILS */}
                {activeTab === "tags" && (
                  <div className="tool-data-table">
                    <h4 className="table-heading">
                      <i className="fa-solid fa-tag text-primary"></i> Extracted HTML Metadata &amp; Headers
                    </h4>
                    <div className="data-row">
                      <span className="data-key">Page Title:</span>
                      <span className="data-val">
                        {result.title ? <strong>{result.title}</strong> : <em style={{ color: "#dc2626" }}>Not specified</em>}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="data-key">Meta Description:</span>
                      <span className="data-val">
                        {result.metaDescription || <em style={{ color: "#dc2626" }}>Not specified</em>}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="data-key">Canonical Link:</span>
                      <span className="data-val">
                        {result.canonical ? <code>{result.canonical}</code> : <em style={{ color: "#d97706" }}>Missing canonical tag</em>}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="data-key">Robots Meta:</span>
                      <span className="data-val">
                        <code>{result.robots || "index, follow (default)"}</code>
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="data-key">H1 Headings ({result.h1Count || 0}):</span>
                      <span className="data-val">
                        {result.h1s?.length > 0 ? (
                          result.h1s.map((h, i) => (
                            <div key={i} style={{ padding: "3px 0", color: "#0f172a" }}>
                              • {h}
                            </div>
                          ))
                        ) : (
                          <em style={{ color: "#dc2626" }}>No H1 heading found</em>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related SEO Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Audit crawler accessibility, verify 301 redirects, and generate structured schema markup.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/serp-simulator">Google SERP Simulator</Link></h4>
                <p className="tool-ref-desc">Preview meta title and description snippets with live pixel length limits.</p>
                <div className="tool-ref-footer"><Link href="/tools/serp-simulator" className="tool-ref-link">Simulate SERP <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fae8ff", color: "#a21caf" }}>
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/http-header-checker">HTTP Header Checker</Link></h4>
                <p className="tool-ref-desc">Inspect status codes, 301/302 redirects, SSL status, and security headers.</p>
                <div className="tool-ref-footer"><Link href="/tools/http-header-checker" className="tool-ref-link">Check Headers <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/robots-sitemap-generator">Robots.txt Builder</Link></h4>
                <p className="tool-ref-desc">Generate bot crawler directives and compliant XML sitemaps.</p>
                <div className="tool-ref-footer"><Link href="/tools/robots-sitemap-generator" className="tool-ref-link">Build Robots.txt <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Want a Comprehensive 230+ Point Forensic Technical Audit?</h4>
            <p>Our manual audits inspect JavaScript rendering, internal PageRank equity, log file crawl patterns, and indexation leaks.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-comments"></i> Request Forensic Audit
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm">
                View Audit Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
