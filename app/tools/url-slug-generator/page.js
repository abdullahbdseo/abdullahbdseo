"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

// Common SEO Stopwords
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "could", "did", "do", "does", "doing", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how",
  "i", "if", "in", "into", "is", "it", "its", "itself",
  "just", "me", "more", "most", "my", "myself",
  "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own",
  "same", "she", "should", "so", "some", "such",
  "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too",
  "under", "until", "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would",
  "you", "your", "yours", "yourself", "yourselves"
]);

export default function UrlSlugGenerator() {
  const [inputText, setInputText] = useState("Best Technical SEO Strategies for E-Commerce Websites in 2026!");
  const [mode, setMode] = useState("single"); // single | bulk
  const [separator, setSeparator] = useState("-");
  const [letterCase, setLetterCase] = useState("lower"); // lower | upper | title
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [maxLength, setMaxLength] = useState(60);
  const [copied, setCopied] = useState(false);

  // Bulk input
  const [bulkInput, setBulkInput] = useState(
    `How to Rank #1 on Google in 2026: A Step-by-Step Guide
10 Local SEO Tips for Small Business Owners in Bangladesh
Technical SEO Audit Checklist: 50 Crucial Factors
What is Answer Engine Optimization (AEO) and How to Optimize for Perplexity?`
  );

  // Convert a single string to SEO slug
  const generateSlug = (text) => {
    if (!text) return "";
    let str = text.trim();

    // 1. Normalize unicode accents (é -> e, etc.)
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 2. Remove special characters except alphanumeric, whitespace, and hyphens
    str = str.replace(/[^\w\s-]/g, " ");

    // 3. Split into words
    let words = str.split(/\s+/).filter(Boolean);

    // 4. Remove stop words if enabled
    if (removeStopWords) {
      words = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));
    }

    // 5. Remove numbers if enabled
    if (removeNumbers) {
      words = words.filter((w) => !/^\d+$/.test(w));
    }

    // 6. Apply case
    words = words.map((w) => {
      if (letterCase === "lower") return w.toLowerCase();
      if (letterCase === "upper") return w.toUpperCase();
      if (letterCase === "title") return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      return w;
    });

    let slug = words.join(separator);

    // 7. Apply max length limit without breaking trailing separator
    if (maxLength && slug.length > maxLength) {
      slug = slug.substring(0, maxLength);
      // Remove trailing separator if trimmed mid-word
      if (slug.endsWith(separator)) {
        slug = slug.substring(0, slug.length - separator.length);
      }
    }

    // 8. Add prefix & suffix
    let finalSlug = slug;
    if (prefix) finalSlug = prefix.trim() + finalSlug;
    if (suffix) finalSlug = finalSlug + suffix.trim();

    return finalSlug;
  };

  // Memoized single slug
  const outputSlug = useMemo(() => generateSlug(inputText), [inputText, separator, letterCase, removeStopWords, removeNumbers, prefix, suffix, maxLength]);

  // Memoized bulk slugs
  const bulkOutput = useMemo(() => {
    if (!bulkInput.trim()) return [];
    const lines = bulkInput.split("\n").filter((l) => l.trim().length > 0);
    return lines.map((original) => ({
      original,
      slug: generateSlug(original)
    }));
  }, [bulkInput, separator, letterCase, removeStopWords, removeNumbers, prefix, suffix, maxLength]);

  const copySingle = () => {
    navigator.clipboard.writeText(outputSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAllBulk = () => {
    const text = bulkOutput.map((item) => item.slug).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const rows = [["Original Title", "Generated SEO Slug"]];
    bulkOutput.forEach((item) => {
      rows.push([`"${item.original.replace(/"/g, '""')}"`, `"${item.slug}"`]);
    });
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "seo-url-slugs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const presets = [
    { label: "Blog Article", text: "15 Best On-Page SEO Checklist Items for Faster Google Rankings in 2026", prefix: "/blog/" },
    { label: "Service Page", text: "Professional Local SEO Service in Bangladesh & Google Map Optimization", prefix: "/services/" },
    { label: "E-Commerce Product", text: "Men's Slim Fit Waterproof Leather Jacket - Free Shipping", prefix: "/products/" }
  ];

  const faqs = [
    {
      q: "What is an SEO friendly URL slug?",
      a: "An SEO friendly URL slug is a concise, easy-to-read, lowercase string separated by hyphens that describes the content of a webpage. Clean URLs make it easy for both Google crawlers and human visitors to understand page context."
    },
    {
      q: "Why should I use hyphens instead of underscores in URLs?",
      a: "Google officially treats hyphens (-) as word separators, whereas underscores (_) are treated as joiners. For example, 'best-seo-service' is indexed as 3 distinct words, while 'best_seo_service' is treated as one continuous string."
    },
    {
      q: "Should I remove stop words from URL slugs?",
      a: "Removing unnecessary stop words (a, an, the, in, for, and) keeps your URLs concise and focused on high-intent target keywords, which improves click-through rate (CTR) on Google search result pages."
    },
    {
      q: "What is the recommended maximum URL slug length?",
      a: "Google recommends keeping URLs concise and descriptive. A slug length between 3 to 6 words (roughly 40 to 60 characters) is optimal for high rankings and social sharing."
    }
  ];

  return (
    <div className="tool-single-page">
      {/* Header */}
      <section className="page-header-section" style={{ padding: "48px 0 28px", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontWeight: 700, fontSize: "0.83rem", textDecoration: "none", marginBottom: "12px" }}>
            <i className="fa-solid fa-arrow-left"></i> All Free SEO Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ede9fe", color: "#7c3aed", padding: "5px 14px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 auto 12px" }}>
            <i className="fa-solid fa-link"></i> Clean Permalink Builder
          </div>
          <h1 style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            SEO Friendly URL Slug &amp; Permalink Generator
          </h1>
          <p style={{ fontSize: "1.02rem", color: "#64748b", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Convert titles and headlines into clean, lowercase, stop-word free URL permalinks optimized for Google ranking &amp; click-through rate.
          </p>
        </div>
      </section>

      {/* Main Controls Section */}
      <section style={{ paddingTop: "28px", paddingBottom: "70px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>

          {/* Mode Switcher */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "inline-flex", background: "#f1f5f9", borderRadius: "4px", padding: "3px", border: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setMode("single")}
                style={{ padding: "8px 18px", border: "none", borderRadius: "4px", background: mode === "single" ? "#2563eb" : "transparent", color: mode === "single" ? "#fff" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <i className="fa-solid fa-i-cursor"></i> Single Title Mode
              </button>
              <button
                onClick={() => setMode("bulk")}
                style={{ padding: "8px 18px", border: "none", borderRadius: "4px", background: mode === "bulk" ? "#2563eb" : "transparent", color: mode === "bulk" ? "#fff" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <i className="fa-solid fa-list-check"></i> Bulk Converter (Multi-Line)
              </button>
            </div>

            {/* Quick Presets */}
            {mode === "single" && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#64748b" }}>
                <span style={{ fontWeight: 700 }}>Examples:</span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(p.text);
                      setPrefix(p.prefix);
                    }}
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "3px 9px", fontSize: "0.76rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "26px", alignItems: "flex-start" }}>

            {/* Left Column: Input & Options */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-sliders" style={{ color: "#2563eb" }}></i> Slug Settings &amp; Rules
              </h3>

              {/* Input Area */}
              {mode === "single" ? (
                <div style={{ marginBottom: "18px" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Page Title / Headline</label>
                  <textarea
                    rows={3}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your article or product title…"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.9rem", outline: "none", resize: "vertical" }}
                  />
                </div>
              ) : (
                <div style={{ marginBottom: "18px" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                    Bulk Titles (1 title per line)
                  </label>
                  <textarea
                    rows={6}
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder="Paste 10+ titles here..."
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", outline: "none", resize: "vertical" }}
                  />
                </div>
              )}

              {/* Separator & Case Options */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Word Separator</label>
                  <select
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", background: "#fff" }}
                  >
                    <option value="-">Hyphen (-) (Recommended)</option>
                    <option value="_">Underscore (_)</option>
                    <option value=".">Dot (.)</option>
                    <option value="">None (No space)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Letter Case</label>
                  <select
                    value={letterCase}
                    onChange={(e) => setLetterCase(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", background: "#fff" }}
                  >
                    <option value="lower">lowercase (Standard)</option>
                    <option value="upper">UPPERCASE</option>
                    <option value="title">Title-Case</option>
                  </select>
                </div>
              </div>

              {/* Prefix & Suffix */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Folder Prefix</label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="/blog/"
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Extension Suffix</label>
                  <input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    placeholder=".html"
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              {/* Toggle Switches */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "12px", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                  <input type="checkbox" checked={removeStopWords} onChange={(e) => setRemoveStopWords(e.target.checked)} />
                  Strip Stop Words (a, the, in, of, for, etc.)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                  <input type="checkbox" checked={removeNumbers} onChange={(e) => setRemoveNumbers(e.target.checked)} />
                  Remove standalone numbers &amp; years
                </label>
              </div>

              {/* Max Length Slider */}
              <div style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>Max Character Length</label>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2563eb" }}>{maxLength} Chars</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#2563eb" }}
                />
              </div>

            </div>

            {/* Right Column: Output & Live Preview */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-square-check" style={{ color: "#10b981" }}></i> SEO URL Slug Preview
                </h3>
                {mode === "single" ? (
                  <button
                    onClick={copySingle}
                    style={{ background: copied ? "#059669" : "#2563eb", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 14px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                  >
                    {copied ? "✓ Copied!" : "Copy Slug"}
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={copyAllBulk}
                      style={{ background: copied ? "#059669" : "#2563eb", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                    >
                      {copied ? "✓ Copied All" : "Copy All"}
                    </button>
                    <button
                      onClick={downloadCsv}
                      style={{ background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "6px 12px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-file-csv"></i> CSV
                    </button>
                  </div>
                )}
              </div>

              {/* Single Output Box */}
              {mode === "single" ? (
                <div>
                  <div style={{ padding: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", wordBreak: "break-all", fontFamily: "monospace", fontSize: "0.95rem", color: "#0f172a", fontWeight: 700, marginBottom: "16px" }}>
                    {outputSlug || <span style={{ color: "#94a3b8" }}>Generated slug will appear here...</span>}
                  </div>

                  {/* Character stats */}
                  <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ padding: "10px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "4px", flex: 1, textAlign: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "#065f46", fontWeight: 700, display: "block" }}>Character Count</span>
                      <strong style={{ fontSize: "1.2rem", color: "#059669" }}>{outputSlug.length}</strong>
                    </div>
                    <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "4px", flex: 1, textAlign: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "#1e40af", fontWeight: 700, display: "block" }}>Word Count</span>
                      <strong style={{ fontSize: "1.2rem", color: "#2563eb" }}>{outputSlug ? outputSlug.split(/[-_.]/).filter(Boolean).length : 0}</strong>
                    </div>
                  </div>

                  {/* Google Search Result Mockup */}
                  <div style={{ padding: "16px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                      Live Google Search Snippet Simulation
                    </span>
                    <div style={{ fontSize: "0.78rem", color: "#202124", display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                      <img src="/images/favicon.svg" alt="Icon" style={{ width: "14px", height: "14px" }} />
                      <span>https://abdullahbdseo.com {outputSlug ? `› ${outputSlug.replace(/\//g, " › ")}` : ""}</span>
                    </div>
                    <div style={{ fontSize: "1.05rem", color: "#1a0dab", fontWeight: 600, lineHeight: 1.3 }}>
                      {inputText || "Your Page Title"}
                    </div>
                  </div>
                </div>
              ) : (
                /* Bulk Output List */
                <div style={{ maxHeight: "400px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {bulkOutput.map((item, idx) => (
                    <div key={idx} style={{ padding: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                      <div style={{ fontSize: "0.76rem", color: "#64748b", marginBottom: "3px" }}>{item.original}</div>
                      <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#0f172a", fontWeight: 700 }}>{item.slug}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* SEO Tip Note */}
              <div style={{ marginTop: "20px", padding: "12px 14px", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "4px", fontSize: "0.8rem", color: "#92400e" }}>
                <i className="fa-solid fa-lightbulb" style={{ marginRight: "6px" }}></i>
                <strong>Pro Tip:</strong> Keep URL slugs under 5 words. Avoid changing existing published URLs without setting up proper <strong>301 Redirects</strong>.
              </div>

            </div>

          </div>

          {/* FAQs */}
          <div style={{ marginTop: "40px" }}>
            <ToolFaqAccordion faqs={faqs} />
          </div>

        </div>
      </section>
    </div>
  );
}
