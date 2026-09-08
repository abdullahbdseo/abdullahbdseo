"use client";

import { useState } from "react";
import Link from "next/link";

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("technical seo");
  const [activeNGramTab, setActiveNGramTab] = useState("single");

  const sampleContent = `Technical SEO is the foundation of any successful search engine marketing strategy. Without a solid technical SEO architecture, your high-quality content may never be crawled or indexed properly by Google. A forensic technical SEO audit inspects server response headers, page speed, core web vitals, mobile usability, and XML sitemaps. 

When conducting technical SEO optimization, search engine bots prioritize sites with clean canonical tags, structured JSON-LD schema markup, and optimized robots.txt directives. Ensuring internal link equity flows effectively throughout your category pages boosts semantic relevance and organic traffic growth. Investing in technical SEO delivers sustainable, long-term ROI for high-growth businesses.`;

  const loadSample = () => {
    setText(sampleContent);
    setTargetKeyword("technical seo");
  };

  const clearAll = () => {
    setText("");
    setTargetKeyword("");
  };

  // Text analysis
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  const totalWords = words.length;
  const readingTimeMin = Math.ceil(totalWords / 200) || (totalWords > 0 ? 1 : 0);
  const uniqueWordsCount = new Set(words).size;

  const stopWords = new Set([
    "the", "and", "for", "with", "this", "that", "from", "are", "was", "will", "have", "you", "your", "can", "our", "all", "which", "about", "what", "more", "when", "their", "into", "some", "than", "them", "then", "also", "these", "only"
  ]);

  // 1-Word Frequency
  const singleFreq = {};
  words.forEach(w => {
    if (!stopWords.has(w)) {
      singleFreq[w] = (singleFreq[w] || 0) + 1;
    }
  });

  const topSingleWords = Object.entries(singleFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / (totalWords || 1)) * 100).toFixed(1)
    }));

  // 2-Word Frequency (Bigrams)
  const biFreq = {};
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (!stopWords.has(w1) || !stopWords.has(w2)) {
      const phrase = `${w1} ${w2}`;
      biFreq[phrase] = (biFreq[phrase] || 0) + 1;
    }
  }

  const topBiWords = Object.entries(biFreq)
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([phrase, count]) => ({
      phrase,
      count,
      density: ((count / (totalWords || 1)) * 100).toFixed(1)
    }));

  // Target keyword density
  let targetDensity = "0.0";
  let targetCount = 0;
  if (targetKeyword.trim() && totalWords > 0) {
    const cleanTarget = targetKeyword.toLowerCase().trim();
    const regex = new RegExp(`\\b${cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = text.match(regex);
    targetCount = matches ? matches.length : 0;
    targetDensity = ((targetCount / totalWords) * 100).toFixed(1);
  }

  const isDensityHigh = parseFloat(targetDensity) > 3.0;
  const isDensityHealthy = parseFloat(targetDensity) >= 1.0 && parseFloat(targetDensity) <= 2.8;

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-solid fa-chart-simple"></i> Content &amp; Readability
          </div>
          <h1 className="page-title">Keyword Density &amp; Frequency Analyzer</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Analyze keyword occurrences, prevent over-optimization search penalties, calculate readability, and inspect semantic n-gram terms.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1040px" }}>
          
          <div className="tool-card-container">
            {/* Quick Actions Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                <i className="fa-solid fa-align-left text-primary"></i> Content Input
              </h2>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={loadSample}
                  style={{ padding: "5px 12px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i> Load Sample Text
                </button>
                {text && (
                  <button
                    type="button"
                    onClick={clearAll}
                    style={{ padding: "5px 12px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#64748b", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-trash-can"></i> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Target Keyword Input */}
            <div className="form-group">
              <label className="form-label">
                <span>Target Focus Keyword (Optional)</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "none", fontWeight: 500 }}>
                  Checks exact match frequency against total words
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. technical seo or programmatic marketing"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Main Textarea */}
            <div className="form-group">
              <label className="form-label">
                <span>Paste Webpage Copy, Article, or Meta Content</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "none", fontWeight: 500 }}>
                  {totalWords} words · {text.length} characters
                </span>
              </label>
              <textarea
                rows={8}
                placeholder="Paste your content here or click 'Load Sample Text' above to test instant frequency calculation..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="form-textarea"
                style={{ fontSize: "0.92rem", lineHeight: 1.6 }}
              />
            </div>

            {/* STATS OVERVIEW BAR */}
            <div className="density-stats-bar my-6">
              <div className="density-stat-item">
                <span className="stat-value text-primary">{totalWords}</span>
                <span className="stat-label">Total Words</span>
              </div>
              <div className="density-stat-item">
                <span className="stat-value text-success">{readingTimeMin} min</span>
                <span className="stat-label">Estimated Read Time</span>
              </div>
              <div className="density-stat-item">
                <span className="stat-value text-purple" style={{ color: "#8b5cf6" }}>{uniqueWordsCount}</span>
                <span className="stat-label">Unique Terms</span>
              </div>
              <div className="density-stat-item">
                <span
                  className="stat-value"
                  style={{ color: isDensityHigh ? "#ef4444" : isDensityHealthy ? "#10b981" : "#0284c7" }}
                >
                  {targetKeyword ? `${targetDensity}%` : "—"}
                </span>
                <span className="stat-label">
                  {targetKeyword ? `"${targetKeyword}" Density` : "Focus Density"}
                </span>
              </div>
            </div>

            {/* DENSITY ALERTS */}
            {targetKeyword && totalWords > 0 && (
              <>
                {isDensityHigh ? (
                  <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px", color: "#991b1b", marginBottom: "20px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ marginTop: "2px" }}></i>
                    <div>
                      <strong style={{ fontSize: "0.9rem" }}>Over-Optimization Risk Detected ({targetDensity}%)</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "0.84rem", lineHeight: 1.5 }}>
                        Your focus keyword appears {targetCount} times. Search engines flag density above 3.0% as keyword stuffing. We recommend dialing back to between 1.0% and 2.5%.
                      </p>
                    </div>
                  </div>
                ) : isDensityHealthy ? (
                  <div style={{ padding: "14px 18px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px", color: "#166534", marginBottom: "20px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <i className="fa-solid fa-circle-check" style={{ marginTop: "2px" }}></i>
                    <div>
                      <strong style={{ fontSize: "0.9rem" }}>Optimal Keyword Density ({targetDensity}%)</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "0.84rem", lineHeight: 1.5 }}>
                        Target phrase appears {targetCount} times in natural balance. This satisfies algorithmic semantic intent without triggering stuffing filters.
                      </p>
                    </div>
                  </div>
                ) : null}
              </>
            )}

            {/* N-GRAM FREQUENCY TABLES */}
            {totalWords > 0 && (
              <div style={{ marginTop: "30px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #f1f5f9", paddingBottom: "12px", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Semantic Keyword Frequency Analysis
                  </h3>
                  <div style={{ display: "inline-flex", background: "#f1f5f9", padding: "3px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <button
                      type="button"
                      onClick={() => setActiveNGramTab("single")}
                      style={{ padding: "5px 12px", border: "none", borderRadius: "6px", background: activeNGramTab === "single" ? "#2563eb" : "transparent", color: activeNGramTab === "single" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Single Words
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveNGramTab("bi")}
                      style={{ padding: "5px 12px", border: "none", borderRadius: "6px", background: activeNGramTab === "bi" ? "#2563eb" : "transparent", color: activeNGramTab === "bi" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      2-Word Phrases
                    </button>
                  </div>
                </div>

                {activeNGramTab === "single" && (
                  <table className="data-table-modern">
                    <thead>
                      <tr>
                        <th>Keyword Term</th>
                        <th>Occurrences</th>
                        <th>Density</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSingleWords.map((item, idx) => (
                        <tr key={idx}>
                          <td><strong>{item.word}</strong></td>
                          <td>{item.count}x</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ width: "42px", fontWeight: 600 }}>{item.density}%</span>
                              <div style={{ flexGrow: 1, height: "6px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden", maxWidth: "120px" }}>
                                <div style={{ height: "100%", width: `${Math.min(100, parseFloat(item.density) * 20)}%`, background: parseFloat(item.density) > 3.5 ? "#ef4444" : "#2563eb" }}></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {parseFloat(item.density) > 3.5 ? (
                              <span style={{ fontSize: "0.75rem", padding: "3px 8px", background: "#fef2f2", color: "#dc2626", borderRadius: "4px", fontWeight: 700 }}>
                                High Density
                              </span>
                            ) : (
                              <span style={{ fontSize: "0.75rem", padding: "3px 8px", background: "#f0fdf4", color: "#166534", borderRadius: "4px", fontWeight: 700 }}>
                                Natural
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeNGramTab === "bi" && (
                  <table className="data-table-modern">
                    <thead>
                      <tr>
                        <th>2-Word Phrase</th>
                        <th>Occurrences</th>
                        <th>Density</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topBiWords.length > 0 ? (
                        topBiWords.map((item, idx) => (
                          <tr key={idx}>
                            <td><strong>{item.phrase}</strong></td>
                            <td>{item.count}x</td>
                            <td>{item.density}%</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>
                            No repeating 2-word phrases detected.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
              Audit full on-page SEO health and preview SERP snippet lengths.
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
            <h4>Need Intent-Driven Content Strategy &amp; Programmatic Keyword Scaling?</h4>
            <p>We build high-intent semantic topic clusters that capture buyers across the search journey.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-comments"></i> Request Content Strategy
              </Link>
              <Link href="/services" className="btn btn-outline btn-sm">
                All SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
