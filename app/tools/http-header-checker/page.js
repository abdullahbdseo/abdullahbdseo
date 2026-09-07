"use client";

import { useState } from "react";
import Link from "next/link";

export default function HttpHeaderChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedHeaders, setCopiedHeaders] = useState(false);

  const handleCheck = async (e) => {
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
      const res = await fetch("/api/tools/http-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to inspect server headers. Please verify the URL and try again.");
      }
    } catch (err) {
      setError("Network error while inspecting server headers.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sampleUrl) => {
    setUrl(sampleUrl);
  };

  const copyRawHeaders = () => {
    if (!result?.allHeaders) return;
    const headerText = Object.entries(result.allHeaders)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    navigator.clipboard.writeText(headerText);
    setCopiedHeaders(true);
    setTimeout(() => setCopiedHeaders(false), 2000);
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
            <i className="fa-solid fa-network-wired"></i> Server Response Diagnostics
          </div>
          <h1 className="page-title">HTTP Header &amp; 301 Redirect Checker</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Inspect live HTTP status codes (200, 301, 302, 404, 500), server latency TTFB, SSL certificates, and critical security headers.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1040px" }}>
          
          <div className="tool-card-container">
            {/* Input Bar */}
            <form onSubmit={handleCheck} className="tool-input-row">
              <input
                type="text"
                placeholder="Enter URL to trace (e.g. https://example.com/old-page)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="form-input tool-main-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ minWidth: "170px", whiteSpace: "nowrap" }}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Inspecting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt"></i> Trace Headers
                  </>
                )}
              </button>
            </form>

            {/* Quick Samples */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontSize: "0.82rem", color: "#64748b", flexWrap: "wrap" }}>
              <span>Try sample:</span>
              <button
                type="button"
                onClick={() => loadSample("https://cloudflare.com")}
                style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", color: "#334155" }}
              >
                cloudflare.com
              </button>
              <button
                type="button"
                onClick={() => loadSample("https://httpbin.org/status/301")}
                style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", color: "#334155" }}
              >
                301 Redirect Test
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ marginTop: "24px", padding: "16px 20px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", color: "#991b1b", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "1.2rem", marginTop: "2px" }}></i>
                <div>
                  <strong style={{ display: "block", marginBottom: "2px" }}>Inspection Error</strong>
                  <p style={{ margin: 0, fontSize: "0.88rem" }}>{error}</p>
                </div>
              </div>
            )}

            {/* RESULTS */}
            {result && (
              <div style={{ marginTop: "32px" }}>
                {/* 3 Stat Cards */}
                <div className="http-summary-cards">
                  <div className="http-stat-card">
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#64748b", letterSpacing: "0.04em" }}>
                      HTTP Status Code
                    </span>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        marginTop: "4px",
                        color: result.status >= 200 && result.status < 300 ? "#10b981" : result.status >= 300 && result.status < 400 ? "#f59e0b" : "#ef4444"
                      }}
                    >
                      {result.status} {result.statusText}
                    </div>
                  </div>

                  <div className="http-stat-card">
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#64748b", letterSpacing: "0.04em" }}>
                      Response Latency (TTFB)
                    </span>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "4px", color: "#2563eb" }}>
                      {result.responseTimeMs} ms
                    </div>
                  </div>

                  <div className="http-stat-card">
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#64748b", letterSpacing: "0.04em" }}>
                      SSL Encryption Status
                    </span>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "4px", color: result.isSecure ? "#10b981" : "#ef4444" }}>
                      <i className={`fa-solid ${result.isSecure ? "fa-lock" : "fa-lock-open"}`} style={{ marginRight: "6px" }}></i>
                      {result.isSecure ? "HTTPS (Encrypted)" : "Insecure HTTP"}
                    </div>
                  </div>
                </div>

                {/* REDIRECT BANNER IF 301/302 */}
                {result.location && (
                  <div style={{ padding: "16px 20px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", color: "#92400e", marginBottom: "24px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <i className="fa-solid fa-arrow-right-arrow-left" style={{ fontSize: "1.2rem", marginTop: "3px" }}></i>
                    <div>
                      <strong style={{ fontSize: "0.95rem" }}>Redirect Target Destination (HTTP {result.status})</strong>
                      <p style={{ margin: "4px 0 0", fontSize: "0.88rem", wordBreak: "break-all", fontFamily: "monospace" }}>
                        {result.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* SECURITY HEADERS AUDIT */}
                <div style={{ marginBottom: "28px" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-shield-halved text-primary"></i> Critical Security Headers Audit
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                    {Object.entries(result.securityHeaders || {}).map(([secKey, secVal]) => (
                      <div
                        key={secKey}
                        style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                      >
                        <span style={{ fontSize: "0.82rem", fontFamily: "monospace", color: "#334155", fontWeight: 600 }}>
                          {secKey}
                        </span>
                        {secVal ? (
                          <span style={{ fontSize: "0.75rem", padding: "3px 8px", background: "#f0fdf4", color: "#166534", borderRadius: "9999px", fontWeight: 700 }}>
                            <i className="fa-solid fa-check"></i> Enabled
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", padding: "3px 8px", background: "#fef2f2", color: "#b91c1c", borderRadius: "9999px", fontWeight: 700 }}>
                            <i className="fa-solid fa-xmark"></i> Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RAW HEADERS */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="fa-solid fa-list-check text-primary"></i> Complete Response Headers
                    </h3>
                    <button
                      type="button"
                      onClick={copyRawHeaders}
                      style={{ padding: "5px 12px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <i className={`fa-solid ${copiedHeaders ? "fa-check" : "fa-copy"}`}></i>
                      {copiedHeaders ? "Copied!" : "Copy Headers"}
                    </button>
                  </div>
                  <div style={{ background: "#0f172a", color: "#93c5fd", padding: "20px", borderRadius: "10px", fontFamily: "monospace", fontSize: "0.84rem", lineHeight: 1.6, overflowX: "auto", maxHeight: "360px" }}>
                    {Object.entries(result.allHeaders || {}).map(([k, v]) => (
                      <div key={k} style={{ padding: "2px 0" }}>
                        <span style={{ color: "#38bdf8", fontWeight: 700 }}>{k}:</span>{" "}
                        <span style={{ color: "#cbd5e1" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related Technical Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Verify on-page metadata, robots crawl directives, and schema markup.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/website-seo-analyzer">Website SEO Analyzer</Link></h4>
                <p className="tool-ref-desc">Audit on-page SEO score, tags, headings, and canonicals.</p>
                <div className="tool-ref-footer"><Link href="/tools/website-seo-analyzer" className="tool-ref-link">Audit Website <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/robots-sitemap-generator">Robots.txt Builder</Link></h4>
                <p className="tool-ref-desc">Generate bot crawler directives and compliant XML sitemaps.</p>
                <div className="tool-ref-footer"><Link href="/tools/robots-sitemap-generator" className="tool-ref-link">Build Robots.txt <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/serp-simulator">Google SERP Simulator</Link></h4>
                <p className="tool-ref-desc">Preview meta title and description snippets with live pixel length limits.</p>
                <div className="tool-ref-footer"><Link href="/tools/serp-simulator" className="tool-ref-link">Simulate SERP <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Fixing 301 Chains, Core Web Vitals, or Server SSL Errors?</h4>
            <p>Our server-side SEO engineers configure edge caching, Cloudflare workers, and clean redirect maps.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-comments"></i> Consult Infrastructure Specialist
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
