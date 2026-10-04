"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractSlug(raw) {
  const trimmed = raw.trim();
  try {
    const u = new URL(trimmed);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || u.hostname.toLowerCase();
  } catch {
    return trimmed.replace(/\/+$/, "").split("/").filter(Boolean).pop() || trimmed.toLowerCase();
  }
}

function normalizeSlug(raw) {
  return extractSlug(raw).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function extractDomain(raw) {
  try {
    return new URL(raw.trim()).hostname.toLowerCase();
  } catch {
    return "—";
  }
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function similarityPct(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 100;
  return Math.round((1 - levenshtein(a, b) / maxLen) * 100);
}

const STORAGE_KEY = "url_dup_checker_db";

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "How does the duplicate check work?",
    answer: "The tool compares your new URL's normalized slug against all saved URLs in your database. It flags exact slug matches as duplicates, and near-duplicates based on your chosen similarity threshold (Levenshtein distance)."
  },
  {
    question: "Where is my URL database stored?",
    answer: "All URLs are stored in your browser's localStorage — nothing is sent to any server. Data persists between sessions on the same browser/device."
  },
  {
    question: "What is a normalized slug?",
    answer: "The slug is the last path segment of a URL (e.g., 'seo-guide' from '/blog/seo-guide'). Normalization lowercases it and replaces special characters with hyphens for accurate comparison."
  },
  {
    question: "How do I import URLs from a CSV?",
    answer: "Your CSV should have one URL per row (or a column containing URLs). The tool extracts all URL-like values and adds them to your database."
  },
  {
    question: "What similarity threshold should I use?",
    answer: "70% is a good default. Higher (e.g., 90%) means only very close matches are flagged. Lower (e.g., 50%) catches broader near-duplicates but may produce more false positives."
  },
  {
    question: "Why does duplicate content hurt SEO?",
    answer: "When multiple URLs contain the same or very similar content, search engines split link equity and ranking signals across them. This dilutes your authority and can prevent any single page from ranking well."
  }
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UrlSlugDuplicateChecker() {
  // ── Saved URL DB (localStorage) ──────────────────────────────────────────
  const [savedUrls, setSavedUrls] = useState([]); // [{id, raw, slug, domain, addedAt}]

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedUrls(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const persistSave = useCallback((list) => {
    setSavedUrls(list);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* ignore */ }
  }, []);

  // ── Left Panel – Add Existing URLs ───────────────────────────────────────
  const [inputText, setInputText] = useState(
    "https://example.com/blog/local-seo-guide\nhttps://example.com/blog/technical-seo\n/blog/ecommerce-seo"
  );
  const [addMsg, setAddMsg] = useState(null);

  const handleAddUrls = () => {
    const lines = inputText.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    const existingSlugs = new Set(savedUrls.map(u => u.slug));
    const newEntries = [];
    let dupeCount = 0;
    lines.forEach(raw => {
      const slug = normalizeSlug(raw);
      if (!slug) return;
      if (existingSlugs.has(slug)) { dupeCount++; return; }
      existingSlugs.add(slug);
      newEntries.push({ id: Date.now() + Math.random(), raw, slug, domain: extractDomain(raw), addedAt: new Date().toISOString() });
    });
    const merged = [...savedUrls, ...newEntries];
    persistSave(merged);
    setInputText("");
    setAddMsg(
      newEntries.length
        ? `✅ ${newEntries.length} URL(s) added.${dupeCount ? ` ${dupeCount} duplicate(s) skipped.` : ""}`
        : `⚠️ All ${dupeCount} entries already exist in database.`
    );
    setTimeout(() => setAddMsg(null), 3500);
  };

  const handleImportCsv = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const urlPattern = /(https?:\/\/[^\s,"']+|\/[^\s,"']+)/g;
      const matches = [...(text.match(urlPattern) || [])];
      if (!matches.length) { setAddMsg("⚠️ No URLs found in CSV."); setTimeout(() => setAddMsg(null), 3000); return; }
      const existingSlugs = new Set(savedUrls.map(u => u.slug));
      const newEntries = [];
      matches.forEach(raw => {
        const slug = normalizeSlug(raw);
        if (!slug || existingSlugs.has(slug)) return;
        existingSlugs.add(slug);
        newEntries.push({ id: Date.now() + Math.random(), raw, slug, domain: extractDomain(raw), addedAt: new Date().toISOString() });
      });
      persistSave([...savedUrls, ...newEntries]);
      setAddMsg(`✅ ${newEntries.length} URL(s) imported from CSV.`);
      setTimeout(() => setAddMsg(null), 3500);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all saved URLs from the database?")) {
      persistSave([]);
      setCheckResult(null);
    }
  };

  const handleDeleteOne = (id) => {
    persistSave(savedUrls.filter(u => u.id !== id));
  };

  // ── Right Panel – Check New URL ───────────────────────────────────────────
  const [newUrl, setNewUrl] = useState("/blog/local-seo-bangladesh-guide");
  const [threshold, setThreshold] = useState(70);
  const [checkResult, setCheckResult] = useState(null);

  const handleCheck = () => {
    if (!newUrl.trim()) return;
    const newSlug = normalizeSlug(newUrl);

    const exactMatches = [];
    const nearMatches = [];

    savedUrls.forEach(entry => {
      if (entry.slug === newSlug) {
        exactMatches.push({ ...entry, score: 100 });
      } else {
        const score = similarityPct(newSlug, entry.slug);
        if (score >= threshold) {
          nearMatches.push({ ...entry, score });
        }
      }
    });

    nearMatches.sort((a, b) => b.score - a.score);

    setCheckResult({
      newUrl: newUrl.trim(),
      newSlug,
      exactMatches,
      nearMatches,
      isClean: exactMatches.length === 0 && nearMatches.length === 0,
      checkedAt: new Date().toLocaleTimeString()
    });
  };

  // ── Bottom – Saved URL Database ───────────────────────────────────────────
  const [dbSearch, setDbSearch] = useState("");

  const filteredDb = useMemo(() => {
    const q = dbSearch.toLowerCase().trim();
    if (!q) return savedUrls;
    return savedUrls.filter(u => u.raw.toLowerCase().includes(q) || u.slug.toLowerCase().includes(q));
  }, [savedUrls, dbSearch]);

  const uniqueDomains = useMemo(() => new Set(savedUrls.map(u => u.domain).filter(d => d !== "—")).size, [savedUrls]);
  const uniqueSlugs = useMemo(() => new Set(savedUrls.map(u => u.slug)).size, [savedUrls]);

  const handleExportCsv = () => {
    if (!savedUrls.length) return;
    const rows = ["#,URL / Slug,Normalized Slug,Domain,Added At", ...savedUrls.map((u, i) => `${i + 1},"${u.raw}","${u.slug}","${u.domain}","${u.addedAt}"`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "url-database.csv";
    a.click();
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="tool-page-wrapper">

      {/* ── Header ── */}
      <section className="page-header-section">
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>

          <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", display: "inline-flex" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "4px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", listStyle: "none", margin: 0 }}>
              <li style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <i className="fa-solid fa-house" style={{ fontSize: "0.78rem" }}></i> Home
                </Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
              <li><Link href="/tools" style={{ color: "#475569", textDecoration: "none" }}>Free SEO Tools</Link></li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
              <li style={{ color: "#0f172a", fontWeight: 700 }}>URL & Slug Duplicate Checker</li>
            </ol>
          </nav>

          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
            <div className="sub-badge" style={{ marginBottom: "14px" }}>
              <i className="fa-solid fa-copy"></i> Check exact duplicates, normalized URL conflicts, and similar blog slugs before publishing.
            </div>
            <h1 className="page-title" style={{ fontSize: "2.6rem" }}>
              URL & Slug Duplicate Checker
            </h1>
            <p className="page-subtitle">
              Build your existing URL database, then instantly check if a new URL or slug already exists — with near-duplicate detection and slug conflict analysis.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px", flexWrap: "wrap" }}>
            {[
              { icon: "fa-solid fa-database", color: "#2563eb", label: "Browser localStorage Database" },
              { icon: "fa-solid fa-shield-halved", color: "#8b5cf6", label: "100% Private — No Server" },
              { icon: "fa-solid fa-bolt", color: "#059669", label: "Instant Slug Comparison" },
            ].map(b => (
              <div key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
                <i className={b.icon} style={{ color: b.color }}></i> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Tool ── */}
      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>

          {/* ── Row 1: Two-panel layout ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

            {/* LEFT: Add Existing URLs */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "26px", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                1. Add Existing URLs
              </h2>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 14px", fontWeight: 600 }}>
                Paste existing URLs / slugs
              </p>

              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={8}
                placeholder={"https://example.com/blog/local-seo-guide\nhttps://example.com/blog/technical-seo\n/blog/ecommerce-seo"}
                style={{
                  width: "100%",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "12.5px",
                  lineHeight: 1.75,
                  padding: "12px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  resize: "vertical",
                  color: "#0f172a",
                  background: "#f8fafc",
                  boxSizing: "border-box",
                  outline: "none"
                }}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={handleAddUrls}
                  style={{ background: "#4f46e5", color: "#fff", border: "none", borderRadius: "4px", padding: "9px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}
                >
                  <i className="fa-solid fa-plus"></i> Add URLs
                </button>

                <label style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "9px 18px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}>
                  <i className="fa-solid fa-file-csv"></i> Import CSV
                  <input type="file" accept=".csv,.txt" style={{ display: "none" }} onChange={handleImportCsv} />
                </label>

                <button
                  onClick={handleClearAll}
                  style={{ background: "#fff0f0", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", padding: "9px 18px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}
                >
                  <i className="fa-solid fa-trash-can"></i> Clear All
                </button>
              </div>

              {addMsg && (
                <div style={{ marginTop: "12px", padding: "9px 14px", background: addMsg.startsWith("✅") ? "#f0fdf4" : "#fffbeb", border: `1px solid ${addMsg.startsWith("✅") ? "#bbf7d0" : "#fde68a"}`, borderRadius: "4px", fontSize: "12.5px", fontWeight: 600, color: addMsg.startsWith("✅") ? "#15803d" : "#92400e" }}>
                  {addMsg}
                </div>
              )}

              <p style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "12px", marginBottom: 0, fontWeight: 500 }}>
                One URL or slug per line. Duplicate entries are automatically ignored.
              </p>
            </div>

            {/* RIGHT: Check New URL */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "26px", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                2. Check New URL / Slug
              </h2>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 16px", fontWeight: 600 }}>
                New blog URL or slug
              </p>

              <input
                type="text"
                value={newUrl}
                onChange={e => { setNewUrl(e.target.value); setCheckResult(null); }}
                placeholder="/blog/your-new-post-slug"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  fontSize: "13.5px",
                  color: "#0f172a",
                  background: "#f8fafc",
                  boxSizing: "border-box",
                  outline: "none",
                  marginBottom: "18px"
                }}
              />

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                    Similarity threshold:
                  </label>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#4f46e5" }}>{threshold}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={99}
                  value={threshold}
                  onChange={e => { setThreshold(Number(e.target.value)); setCheckResult(null); }}
                  style={{ width: "100%", accentColor: "#4f46e5" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  <span>40% (broad)</span>
                  <span>99% (strict)</span>
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={!newUrl.trim() || savedUrls.length === 0}
                style={{
                  width: "100%",
                  background: !newUrl.trim() || savedUrls.length === 0 ? "#a5b4fc" : "#4f46e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: !newUrl.trim() || savedUrls.length === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background 0.15s"
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                {savedUrls.length === 0 ? "Add URLs first to check" : "Check Duplicate"}
              </button>

              {newUrl.trim() && (
                <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "12px", color: "#64748b" }}>
                  <span style={{ fontWeight: 700 }}>Normalized slug: </span>
                  <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "1px 7px", borderRadius: "4px", fontWeight: 700 }}>
                    {normalizeSlug(newUrl) || "—"}
                  </code>
                </div>
              )}
            </div>
          </div>

          {/* ── Check Result ── */}
          {checkResult && (
            <div style={{
              marginBottom: "20px",
              background: checkResult.isClean ? "#f0fdf4" : "#fef2f2",
              border: `2px solid ${checkResult.isClean ? "#bbf7d0" : "#fecaca"}`,
              borderRadius: "4px",
              padding: "24px 28px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: checkResult.isClean ? 0 : "18px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "4px",
                  background: checkResult.isClean ? "#dcfce7" : "#fee2e2",
                  color: checkResult.isClean ? "#15803d" : "#dc2626",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0
                }}>
                  <i className={checkResult.isClean ? "fa-solid fa-circle-check" : "fa-solid fa-triangle-exclamation"}></i>
                </div>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: checkResult.isClean ? "#15803d" : "#991b1b" }}>
                    {checkResult.isClean
                      ? "✅ No Duplicate Found — Safe to Publish!"
                      : `⚠️ Duplicate Risk Detected (${checkResult.exactMatches.length} exact, ${checkResult.nearMatches.length} near-duplicate)`}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                    Checked: <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "1px 7px", borderRadius: "4px" }}>{checkResult.newSlug}</code>
                    &nbsp;against {savedUrls.length} saved URL(s) · {checkResult.checkedAt}
                  </div>
                </div>
              </div>

              {/* Exact matches */}
              {checkResult.exactMatches.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#991b1b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <i className="fa-solid fa-circle-xmark"></i> Exact Slug Matches
                  </div>
                  {checkResult.exactMatches.map(m => (
                    <div key={m.id} style={{ padding: "10px 14px", background: "#fff", border: "1px solid #fecaca", borderRadius: "4px", marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>{m.raw}</span>
                      <span style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", padding: "2px 10px", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>
                        100% Match
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Near-duplicate matches */}
              {checkResult.nearMatches.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#92400e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <i className="fa-solid fa-circle-half-stroke"></i> Near-Duplicate Matches (≥{threshold}% similar)
                  </div>
                  {checkResult.nearMatches.map(m => (
                    <div key={m.id} style={{ padding: "10px 14px", background: "#fff", border: "1px solid #fde68a", borderRadius: "4px", marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>{m.raw}</span>
                      <span style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a", borderRadius: "4px", padding: "2px 10px", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>
                        {m.score}% Similar
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Saved URL Database ── */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 3px" }}>
                    <i className="fa-solid fa-database" style={{ color: "#4f46e5", marginRight: "8px" }}></i>
                    Saved URL Database
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, fontWeight: 500 }}>
                    Stored locally in this browser.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ position: "relative" }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "13px" }}></i>
                    <input
                      type="text"
                      value={dbSearch}
                      onChange={e => setDbSearch(e.target.value)}
                      placeholder="Search URLs..."
                      style={{ padding: "8px 12px 8px 34px", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "13px", outline: "none", width: "200px", color: "#0f172a", background: "#f8fafc" }}
                    />
                  </div>
                  <button
                    onClick={handleExportCsv}
                    disabled={!savedUrls.length}
                    style={{ background: savedUrls.length ? "#0f172a" : "#e2e8f0", color: savedUrls.length ? "#fff" : "#94a3b8", border: "none", borderRadius: "4px", padding: "8px 18px", fontWeight: 700, fontSize: "13px", cursor: savedUrls.length ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "7px" }}
                  >
                    <i className="fa-solid fa-download"></i> Export CSV
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "Total URLs", value: savedUrls.length, icon: "fa-solid fa-link", color: "#4f46e5", bg: "#ede9fe" },
                  { label: "Domains", value: uniqueDomains, icon: "fa-solid fa-globe", color: "#0284c7", bg: "#e0f2fe" },
                  { label: "Unique Slugs", value: uniqueSlugs, icon: "fa-solid fa-tag", color: "#059669", bg: "#dcfce7" },
                ].map(stat => (
                  <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: stat.bg, color: stat.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className={stat.icon}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{stat.value}</div>
                      <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", width: "44px" }}>#</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>URL / Slug</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", whiteSpace: "nowrap" }}>Normalized Slug</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDb.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: "32px 16px", textAlign: "center", color: "#94a3b8", fontSize: "13px", fontStyle: "italic" }}>
                        {savedUrls.length === 0 ? "No URLs saved yet." : "No results match your search."}
                      </td>
                    </tr>
                  ) : (
                    filteredDb.map((entry, i) => (
                      <tr key={entry.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                        <td style={{ padding: "10px 16px", color: "#94a3b8", fontWeight: 700, fontSize: "12px" }}>{i + 1}</td>
                        <td style={{ padding: "10px 16px", maxWidth: "380px" }}>
                          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>
                            {entry.raw}
                          </span>
                        </td>
                        <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                          <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "2px 9px", borderRadius: "4px", fontSize: "12px", fontWeight: 700 }}>
                            {entry.slug}
                          </code>
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <button
                            onClick={() => handleDeleteOne(entry.id)}
                            style={{ background: "#fff0f0", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", padding: "4px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                            title="Remove from database"
                          >
                            <i className="fa-solid fa-trash-can"></i> Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: "56px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#64748b", fontSize: "1rem" }}>
                Everything about duplicate slug detection and canonicalization.
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
              Duplicate content is just one of 70+ signals we audit. Get a forensic SEO report covering crawl budget, Core Web Vitals, and schema markup.
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
