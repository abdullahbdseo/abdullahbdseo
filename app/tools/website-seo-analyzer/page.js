"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebsiteSeoAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tools/seo-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to analyze website");
      }
    } catch (err) {
      setError("Network error while inspecting website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Free Instant Diagnostic</div>
          <h1 className="page-title">Website SEO Health Analyzer</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Audit meta titles, descriptions, heading structure, canonicals, robots directives, and image alt tags in seconds.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="tool-card-container">
            <form onSubmit={handleAnalyze} className="tool-input-row">
              <input 
                type="text" 
                placeholder="Enter URL (e.g., https://example.com)" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required 
                className="form-input tool-main-input"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary btn-lg"
              >
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Auditing...</> : <><i className="fa-solid fa-bolt"></i> Run Audit</>}
              </button>
            </form>

            {error && (
              <div className="alert-box alert-danger mt-6">
                <i className="fa-solid fa-circle-exclamation"></i>
                <div>
                  <strong>Analysis Error</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="tool-results-wrapper mt-8">
                {/* SCORE CARD */}
                <div className="tool-score-banner">
                  <div className="score-circle-wrap">
                    <div className={`score-badge ${result.score >= 80 ? "score-good" : result.score >= 50 ? "score-avg" : "score-bad"}`}>
                      {result.score}/100
                    </div>
                  </div>
                  <div className="score-details">
                    <h3>Overall On-Page SEO Score</h3>
                    <p>Scanned URL: <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a> (HTTP {result.statusCode})</p>
                  </div>
                </div>

                {/* PASSED & ISSUES */}
                <div className="tool-findings-grid mt-6">
                  <div className="findings-col">
                    <h4 className="findings-title text-success"><i className="fa-solid fa-circle-check"></i> Passed Checks ({result.passed.length})</h4>
                    <ul className="findings-list">
                      {result.passed.map((item, idx) => (
                        <li key={idx}><i className="fa-solid fa-check text-success"></i> {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="findings-col">
                    <h4 className="findings-title text-danger"><i className="fa-solid fa-triangle-exclamation"></i> Identified Issues ({result.issues.length})</h4>
                    <ul className="findings-list">
                      {result.issues.map((item, idx) => (
                        <li key={idx}><i className="fa-solid fa-xmark text-danger"></i> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* DETAILED TAG VALUES */}
                <div className="tool-data-table mt-8">
                  <h4 className="table-heading">Inspected Metadata & Headings</h4>
                  <div className="data-row">
                    <span className="data-key">Title Tag:</span>
                    <span className="data-val">{result.title || <em className="text-danger">Not specified</em>}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">Meta Description:</span>
                    <span className="data-val">{result.metaDescription || <em className="text-danger">Not specified</em>}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">Canonical URL:</span>
                    <span className="data-val">{result.canonical || <em className="text-warning">Missing canonical</em>}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">Robots Meta:</span>
                    <span className="data-val">{result.robots}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">H1 Headings ({result.h1Count}):</span>
                    <span className="data-val">
                      {result.h1s?.length > 0 ? (
                        result.h1s.map((h, i) => <div key={i} className="h1-item">• {h}</div>)
                      ) : (
                        <em className="text-danger">None</em>
                      )}
                    </span>
                  </div>
                </div>

                {/* AUDIT CTA */}
                <div className="tool-cta-box mt-8">
                  <h4>Want a comprehensive 230+ point forensic audit?</h4>
                  <p>Our manual deep-dive audits cover log files, JavaScript rendering, and internal link graph equity.</p>
                  <Link href="/services/technical-seo-audit" className="btn btn-primary btn-sm mt-3">
                    Order Complete Technical Audit
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
