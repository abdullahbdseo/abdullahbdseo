"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeUrl(raw) {
  try {
    const u = new URL(raw.trim());
    // strip trailing slash, lowercase host, sort query params
    u.hostname = u.hostname.toLowerCase();
    u.pathname = u.pathname.replace(/\/+$/, "") || "/";
    const params = [...u.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
    u.search = "";
    params.forEach(([k, v]) => u.searchParams.append(k, v));
    u.hash = "";
    return u.toString().toLowerCase();
  } catch {
    return raw.trim().toLowerCase().replace(/\/+$/, "");
  }
}

function extractSlug(raw) {
  try {
    const u = new URL(raw.trim());
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || u.hostname.toLowerCase();
  } catch {
    // treat raw text as slug directly
    return raw.trim().toLowerCase().replace(/\/+$/, "").split("/").filter(Boolean).pop() || raw.trim().toLowerCase();
  }
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function similarityScore(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 100;
  return Math.round((1 - levenshtein(a, b) / maxLen) * 100);
}

const NEAR_DUPE_THRESHOLD = 80; // % similarity to flag as near-duplicate

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What is a duplicate URL or slug, and why does it harm SEO?",
    answer: "Duplicate URLs occur when multiple pages are accessible via different addresses (e.g., with/without trailing slash, HTTP vs HTTPS, www vs non-www). Search engines may split link equity across them, diluting rankings. Duplicate slugs within a CMS can also cause canonical confusion and indexation waste."
  },
  {
    question: "What is the difference between an exact duplicate and a near-duplicate?",
    answer: "An exact duplicate means two or more URLs are identical after normalization (removing trailing slashes, lowercasing, sorting query parameters). A near-duplicate means the URLs or slugs are highly similar (≥80% character similarity by Levenshtein distance) but not identical — often caused by typos, plural/singular variants, or minor formatting differences."
  },
  {
    question: "How are URLs normalized before comparison?",
    answer: "The tool normalizes each URL by: (1) lowercasing the entire URL, (2) removing trailing slashes, (3) stripping URL fragments (#hash), (4) alphabetically sorting query parameters so ?b=1&a=2 equals ?a=2&b=1. This catches the most common canonicalization issues."
  },
  {
    question: "Can I check slugs without full URLs?",
    answer: "Yes. You can paste plain slugs (e.g., seo-audit-guide, seo-guide, technical-seo-audit) one per line. The tool will detect exact and near-duplicate slugs directly without needing full URLs."
  },
  {
    question: "How do I fix duplicate URL issues once detected?",
    answer: "Common fixes include: (1) Add a rel=canonical tag pointing to the preferred URL, (2) Set up a 301 redirect from the duplicate to the canonical, (3) Update internal links to always use the canonical version, (4) Configure your server to enforce www/non-www and HTTP/HTTPS consistently."
  },
  {
    question: "What does the Slug Conflict column mean?",
    answer: "The slug is the last path segment of a URL (e.g., 'technical-seo-guide' from '/blog/technical-seo-guide'). Two URLs with the same slug but different paths may represent accidentally duplicated content topics, which can confuse search engines about which page to rank."
  }
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function UrlSlugDuplicateChecker() {
  const PLACEHOLDER = `https://abdullahbdseo.com/blog/technical-seo-guide
https://abdullahbdseo.com/blog/technical-seo-guide/
https://abdullahbdseo.com/blog/Technical-SEO-Guide
https://abdullahbdseo.com/blog/technical-seo-tips
https://abdullahbdseo.com/services/seo-audit
https://abdullahbdseo.com/services/seo-audits
https://abdullahbdseo.com/blog/seo-audit-checklist
https://abdullahbdseo.com/blog/seo-audit-guide`;

  const [input, setInput] = useState(PLACEHOLDER);
  const [nearDupeThreshold, setNearDupeThreshold] = useState(NEAR_DUPE_THRESHOLD);
  const [mode, setMode] = useState("url"); // "url" | "slug"
  const [analysed, setAnalysed] = useState(false);
  const [copied, setCopied] = useState(false);

  // ─── Analysis Logic ───────────────────────────────────────────────────────
  const results = useMemo(() => {
    if (!analysed) return null;

    const rawLines = input.split("\n").map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return null;

    // Build entry list
    const entries = rawLines.map((raw, idx) => ({
      idx,
      raw,
      normalized: mode === "url" ? normalizeUrl(raw) : raw.trim().toLowerCase().replace(/\/+$/, ""),
      slug: mode === "url" ? extractSlug(raw) : raw.trim().toLowerCase().replace(/\/+$/, ""),
    }));

    // Exact duplicate groups (by normalized)
    const exactGroups = {};
    entries.forEach(e => {
      if (!exactGroups[e.normalized]) exactGroups[e.normalized] = [];
      exactGroups[e.normalized].push(e);
    });

    // Slug conflict groups (by slug, across different normalized URLs)
    const slugGroups = {};
    entries.forEach(e => {
      if (!slugGroups[e.slug]) slugGroups[e.slug] = [];
      slugGroups[e.slug].push(e);
    });

    // Near-duplicate pairs (by slug similarity)
    const nearDupePairs = [];
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i], b = entries[j];
        if (a.normalized === b.normalized) continue; // already exact
        const score = similarityScore(a.slug, b.slug);
        if (score >= nearDupeThreshold) {
          nearDupePairs.push({ a, b, score });
        }
      }
    }

    // Annotate each entry
    const annotated = entries.map(e => {
      const exactGroup = exactGroups[e.normalized];
      const isExactDupe = exactGroup.length > 1 && exactGroup[0].idx !== e.idx;
      const isExactFirst = exactGroup.length > 1 && exactGroup[0].idx === e.idx;

      const slugGroup = slugGroups[e.slug];
      const hasSlugConflict = slugGroup.length > 1 && slugGroup.some(s => s.normalized !== e.normalized);

      const nearPairs = nearDupePairs.filter(p => p.a.idx === e.idx || p.b.idx === e.idx);

      return { ...e, isExactDupe, isExactFirst, hasSlugConflict, nearPairs, exactGroup };
    });

    const totalExact = Object.values(exactGroups).filter(g => g.length > 1).reduce((acc, g) => acc + g.length, 0);
    const totalNear = nearDupePairs.length;
    const totalSlugConflict = annotated.filter(e => e.hasSlugConflict).length;
    const totalClean = entries.length - new Set([
      ...annotated.filter(e => e.isExactDupe || e.isExactFirst).map(e => e.idx),
      ...annotated.filter(e => e.hasSlugConflict).map(e => e.idx),
    ]).size;

    return { annotated, exactGroups, nearDupePairs, totalExact, totalNear, totalSlugConflict, totalClean, count: entries.length };
  }, [analysed, input, nearDupeThreshold, mode]);

  const handleCheck = useCallback(() => {
    setAnalysed(false);
    setTimeout(() => setAnalysed(true), 0);
  }, []);

  const handleReset = () => {
    setInput(PLACEHOLDER);
    setAnalysed(false);
    setCopied(false);
  };

  const handleCopyReport = () => {
    if (!results) return;
    const lines = ["URL & Slug Duplicate Check Report", "=" .repeat(40), ""];
    results.annotated.forEach(e => {
      const flags = [];
      if (e.isExactFirst) flags.push("⚠ EXACT DUPLICATE (canonical)");
      if (e.isExactDupe) flags.push("⛔ EXACT DUPLICATE");
      if (e.hasSlugConflict) flags.push("⚠ SLUG CONFLICT");
      if (e.nearPairs.length > 0) flags.push(`~ NEAR-DUPLICATE (${e.nearPairs.map(p => p.score + "%").join(", ")} similarity)`);
      lines.push(`[${e.idx + 1}] ${e.raw}`);
      if (flags.length) lines.push(`     → ${flags.join(" | ")}`);
      else lines.push("     → ✓ Clean");
    });
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Status badge helper ───────────────────────────────────────────────────
  const getStatus = (entry) => {
    if (entry.isExactDupe) return { label: "Exact Duplicate", color: "#dc2626", bg: "#fef2f2", icon: "fa-solid fa-circle-xmark" };
    if (entry.isExactFirst && !entry.isExactDupe) {
      const isDupe = entry.exactGroup.length > 1;
      if (isDupe) return { label: "Duplicate Found", color: "#d97706", bg: "#fffbeb", icon: "fa-solid fa-triangle-exclamation" };
    }
    if (entry.hasSlugConflict) return { label: "Slug Conflict", color: "#7c3aed", bg: "#f5f3ff", icon: "fa-solid fa-code-fork" };
    if (entry.nearPairs.length > 0) return { label: "Near-Duplicate", color: "#0284c7", bg: "#f0f9ff", icon: "fa-solid fa-circle-half-stroke" };
    return { label: "Clean", color: "#059669", bg: "#ecfdf5", icon: "fa-solid fa-circle-check" };
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="tool-page-wrapper">
      {/* Header */}
      <section className="page-header-section">
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", display: "inline-flex" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "4px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", listStyle: "none", margin: 0 }}>
              <li style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <i className="fa-solid fa-house" style={{ fontSize: "0.78rem" }}></i> Home
                </Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
              <li>
                <Link href="/tools" style={{ color: "#475569", textDecoration: "none" }}>Free SEO Tools</Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
              <li style={{ color: "#0f172a", fontWeight: 700 }}>URL & Slug Duplicate Checker</li>
            </ol>
          </nav>

          {/* Title block */}
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
            <div className="sub-badge" style={{ marginBottom: "14px" }}>
              <i className="fa-solid fa-copy"></i> Instant Duplicate Detection · Exact + Near-Duplicate · Slug Conflicts
            </div>
            <h1 className="page-title" style={{ fontSize: "2.6rem" }}>
              URL & Slug Duplicate Checker
            </h1>
            <p className="page-subtitle">
              Paste URLs or slugs (one per line) to instantly detect exact duplicates, near-duplicate permalinks, and slug conflicts that cause canonicalization issues and rank dilution.
            </p>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
            {[
              { icon: "fa-solid fa-bolt", color: "#2563eb", label: "Instant Client-Side Analysis" },
              { icon: "fa-solid fa-shield-halved", color: "#8b5cf6", label: "100% Private – No Data Sent" },
              { icon: "fa-solid fa-circle-check", color: "#059669", label: "Google Canonicalization Logic" },
            ].map(b => (
              <div key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
                <i className={b.icon} style={{ color: b.color }}></i> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tool */}
      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>

            {/* Input Panel */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "28px", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                    <i className="fa-solid fa-paste" style={{ color: "#2563eb", marginRight: "8px" }}></i>
                    Input URLs / Slugs
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                    One URL or slug per line · Max 500 entries
                  </p>
                </div>

                {/* Mode Toggle */}
                <div style={{ display: "flex", gap: "0", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                  {[
                    { id: "url", label: "Full URLs", icon: "fa-solid fa-link" },
                    { id: "slug", label: "Slugs Only", icon: "fa-solid fa-tag" },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setMode(m.id); setAnalysed(false); }}
                      style={{
                        padding: "7px 14px",
                        border: "none",
                        background: mode === m.id ? "#2563eb" : "#f8fafc",
                        color: mode === m.id ? "#ffffff" : "#64748b",
                        fontWeight: 700,
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.15s"
                      }}
                    >
                      <i className={m.icon}></i> {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={input}
                onChange={e => { setInput(e.target.value); setAnalysed(false); }}
                rows={10}
                placeholder={mode === "url"
                  ? "Paste full URLs here, one per line:\nhttps://example.com/blog/seo-guide\nhttps://example.com/blog/seo-guide/"
                  : "Paste slugs here, one per line:\nseo-guide\ntechnical-seo-guide\nseo-tips"}
                style={{
                  width: "100%",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  padding: "14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  resize: "vertical",
                  color: "#0f172a",
                  background: "#f8fafc",
                  boxSizing: "border-box",
                  outline: "none"
                }}
              />

              {/* Options Row */}
              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", whiteSpace: "nowrap" }}>
                    Near-Duplicate Threshold:
                  </label>
                  <input
                    type="range"
                    min={60}
                    max={99}
                    value={nearDupeThreshold}
                    onChange={e => { setNearDupeThreshold(Number(e.target.value)); setAnalysed(false); }}
                    style={{ width: "110px", accentColor: "#2563eb" }}
                  />
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#2563eb", minWidth: "38px" }}>
                    {nearDupeThreshold}%
                  </span>
                </div>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                  {input.split("\n").filter(l => l.trim()).length} line(s) entered
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
                <button
                  onClick={handleCheck}
                  disabled={!input.trim()}
                  style={{
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "11px 26px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: !input.trim() ? 0.5 : 1
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i> Check for Duplicates
                </button>
                {results && (
                  <button
                    onClick={handleCopyReport}
                    style={{
                      background: copied ? "#059669" : "#f1f5f9",
                      color: copied ? "#ffffff" : "#334155",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                      padding: "11px 20px",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s"
                    }}
                  >
                    <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                    {copied ? "Copied!" : "Copy Report"}
                  </button>
                )}
                <button
                  onClick={handleReset}
                  style={{
                    background: "transparent",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    padding: "11px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <i className="fa-solid fa-rotate-left"></i> Reset
                </button>
              </div>
            </div>

            {/* Results */}
            {results && (
              <>
                {/* Summary Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px" }}>
                  {[
                    { label: "Total Checked", value: results.count, icon: "fa-solid fa-list-check", iconColor: "#2563eb", iconBg: "#eff6ff" },
                    { label: "Exact Duplicates", value: results.totalExact, icon: "fa-solid fa-circle-xmark", iconColor: "#dc2626", iconBg: "#fef2f2" },
                    { label: "Near-Duplicates", value: results.totalNear + " pairs", icon: "fa-solid fa-circle-half-stroke", iconColor: "#0284c7", iconBg: "#f0f9ff" },
                    { label: "Slug Conflicts", value: results.totalSlugConflict, icon: "fa-solid fa-code-fork", iconColor: "#7c3aed", iconBg: "#f5f3ff" },
                    { label: "Clean URLs", value: results.count - results.totalExact, icon: "fa-solid fa-circle-check", iconColor: "#059669", iconBg: "#ecfdf5" },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "4px", background: stat.iconBg, color: stat.iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                        <i className={stat.icon}></i>
                      </div>
                      <div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{stat.value}</div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Near-Duplicate Pairs Section */}
                {results.nearDupePairs.length > 0 && (
                  <div style={{ background: "#ffffff", border: "1px solid #bae6fd", borderRadius: "4px", padding: "24px", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="fa-solid fa-circle-half-stroke" style={{ color: "#0284c7" }}></i>
                      Near-Duplicate Pairs ({results.nearDupePairs.length})
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", marginLeft: "4px" }}>≥{nearDupeThreshold}% slug similarity</span>
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {results.nearDupePairs.map((pair, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "4px" }}>
                          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>
                            <span style={{ fontSize: "10px", color: "#64748b", display: "block", marginBottom: "2px" }}>#{pair.a.idx + 1}</span>
                            {pair.a.raw}
                          </div>
                          <div style={{ textAlign: "center", flexShrink: 0 }}>
                            <span style={{ background: "#0284c7", color: "#fff", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>
                              {pair.score}% similar
                            </span>
                          </div>
                          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>
                            <span style={{ fontSize: "10px", color: "#64748b", display: "block", marginBottom: "2px" }}>#{pair.b.idx + 1}</span>
                            {pair.b.raw}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full Detailed Results Table */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
                  <div style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      <i className="fa-solid fa-table-list" style={{ color: "#2563eb", marginRight: "8px" }}></i>
                      Full Analysis Results ({results.count} entries)
                    </h3>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[
                        { label: "⛔ Exact Dup.", bg: "#fef2f2", color: "#dc2626" },
                        { label: "⚠ Slug Conflict", bg: "#f5f3ff", color: "#7c3aed" },
                        { label: "~ Near-Dup.", bg: "#f0f9ff", color: "#0284c7" },
                        { label: "✓ Clean", bg: "#ecfdf5", color: "#059669" },
                      ].map(leg => (
                        <span key={leg.label} style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: leg.bg, color: leg.color }}>
                          {leg.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                          <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", width: "40px" }}>#</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>URL / Slug</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", whiteSpace: "nowrap" }}>Extracted Slug</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Status</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Issue Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.annotated.map((entry, i) => {
                          const status = getStatus(entry);
                          const isEvenRow = i % 2 === 0;
                          return (
                            <tr key={entry.idx} style={{ background: isEvenRow ? "#ffffff" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "10px 16px", color: "#94a3b8", fontWeight: 700, fontSize: "12px" }}>
                                {entry.idx + 1}
                              </td>
                              <td style={{ padding: "10px 16px", maxWidth: "340px" }}>
                                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all", display: "block" }}>
                                  {entry.raw}
                                </span>
                              </td>
                              <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#475569", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", display: "inline-block" }}>
                                  {entry.slug}
                                </span>
                              </td>
                              <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: status.bg, color: status.color }}>
                                  <i className={status.icon}></i> {status.label}
                                </span>
                              </td>
                              <td style={{ padding: "10px 16px", fontSize: "12px", color: "#475569", maxWidth: "260px" }}>
                                {entry.isExactDupe && (
                                  <span>Duplicate of <strong>#{entry.exactGroup[0].idx + 1}</strong>. Set rel=canonical or 301 redirect to the original.</span>
                                )}
                                {!entry.isExactDupe && entry.isExactFirst && entry.exactGroup.length > 1 && (
                                  <span>This is the canonical. {entry.exactGroup.length - 1} duplicate(s) found.</span>
                                )}
                                {entry.hasSlugConflict && !entry.isExactDupe && (
                                  <span>Slug "<strong>{entry.slug}</strong>" shared with another URL — potential topic duplication.</span>
                                )}
                                {entry.nearPairs.length > 0 && !entry.isExactDupe && !entry.hasSlugConflict && (
                                  <span>
                                    Similar to: {entry.nearPairs.slice(0, 2).map(p => {
                                      const other = p.a.idx === entry.idx ? p.b : p.a;
                                      return <span key={other.idx}>#{other.idx + 1} ({p.score}%)</span>;
                                    }).reduce((prev, curr) => [prev, ", ", curr])}
                                  </span>
                                )}
                                {!entry.isExactDupe && !(entry.isExactFirst && entry.exactGroup.length > 1) && !entry.hasSlugConflict && entry.nearPairs.length === 0 && (
                                  <span style={{ color: "#059669" }}>No duplicate issues detected.</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recommendations */}
                {(results.totalExact > 0 || results.totalNear > 0 || results.totalSlugConflict > 0) && (
                  <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "4px", padding: "22px 24px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#92400e", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="fa-solid fa-lightbulb" style={{ color: "#d97706" }}></i>
                      Fix Recommendations
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#78350f", lineHeight: 1.9 }}>
                      {results.totalExact > 0 && (
                        <li><strong>Exact Duplicates:</strong> Add a <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: "4px" }}>rel=canonical</code> pointing to the preferred URL, or configure a <strong>301 redirect</strong> from duplicates to the canonical.</li>
                      )}
                      {results.totalSlugConflict > 0 && (
                        <li><strong>Slug Conflicts:</strong> Rename one of the conflicting URLs so each slug uniquely identifies a distinct page topic. Update internal links accordingly.</li>
                      )}
                      {results.totalNear > 0 && (
                        <li><strong>Near-Duplicates:</strong> Review content overlap between flagged pages. Consider merging thin content into one authoritative page and setting up a 301 from the weaker URL.</li>
                      )}
                      <li><strong>Consistency:</strong> Enforce a single canonical base URL (e.g., always HTTPS + non-www + no trailing slash) via server-level 301 redirects and your CMS permalink settings.</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* FAQ */}
          <div style={{ marginTop: "56px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#64748b", fontSize: "1rem" }}>
                Everything you need to know about duplicate URL detection and canonicalization.
              </p>
            </div>
            <ToolFaqAccordion faqs={FAQ_ITEMS} />
          </div>

          {/* CTA Banner */}
          <div style={{ marginTop: "50px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "4px", padding: "44px 36px", textAlign: "center", color: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.2)" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 12px", color: "#ffffff" }}>
              Need a Full Technical SEO Audit?
            </h2>
            <p style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: "640px", margin: "0 auto 26px", lineHeight: 1.6 }}>
              Duplicate content is just one of 70+ signals we audit. Get a forensic SEO report covering crawl budget, indexation leaks, Core Web Vitals, and schema markup.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/tools/deep-seo-audit" style={{ background: "#2563eb", color: "#ffffff", padding: "12px 28px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-magnifying-glass-chart"></i> Run Deep SEO Audit
              </Link>
              <Link href="/tools/canonical-hreflang-generator" style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", padding: "12px 28px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Generate Canonical Tags <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
