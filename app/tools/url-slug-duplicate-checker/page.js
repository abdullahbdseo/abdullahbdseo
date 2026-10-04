"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

// ─── Stop Words ───────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","could","should","may","might",
  "this","that","these","those","it","its","how","what","when","where",
  "why","who","which","your","my","our","their","vs","via","per"
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseUrl(raw, opts = {}) {
  const { ignoreProtocol = true, ignoreWww = true, ignoreTrailingSlash = true, ignoreQueryParams = true } = opts;
  const trimmed = raw.trim();
  try {
    const u = new URL(trimmed);
    let hostname = u.hostname.toLowerCase();
    if (ignoreWww) hostname = hostname.replace(/^www\./, "");
    const protocol = ignoreProtocol ? "" : u.protocol + "//";
    let pathname = u.pathname;
    if (ignoreTrailingSlash) pathname = pathname.replace(/\/+$/, "") || "/";
    const search = ignoreQueryParams ? "" : u.search;
    return { full: (protocol + hostname + pathname + search).toLowerCase(), hostname, pathname, search };
  } catch {
    let path = trimmed;
    if (ignoreTrailingSlash) path = path.replace(/\/+$/, "");
    return { full: path.toLowerCase(), hostname: "—", pathname: path, search: "" };
  }
}

function extractSlug(raw) {
  const trimmed = raw.trim();
  try {
    const u = new URL(trimmed);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return trimmed.replace(/\/+$/, "").split("/").filter(Boolean).pop() || trimmed.toLowerCase();
  }
}

function normalizeSlug(raw, opts = {}) {
  const { removeStopWords = false, stemming = false } = opts;
  let slug = extractSlug(raw).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (removeStopWords) {
    const parts = slug.split("-").filter(w => !STOP_WORDS.has(w));
    slug = parts.join("-");
  }
  if (stemming) {
    // basic suffix stemming: -ing, -ed, -ly, -es, -s
    slug = slug.replace(/-ing\b/g, "").replace(/-ed\b/g, "").replace(/-ly\b/g, "").replace(/-ies\b/g, "-y").replace(/-es\b/g, "").replace(/-s\b/g, "");
    slug = slug.replace(/-+/g, "-").replace(/^-|-$/g, "");
  }
  return slug;
}

function extractDomain(raw) {
  try { return new URL(raw.trim()).hostname.toLowerCase().replace(/^www\./, ""); }
  catch { return "—"; }
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

const STORAGE_KEY = "url_dup_checker_db_v2";

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "How does the duplicate check work?",
    answer: "The tool normalizes both the new URL and all saved URLs based on your Professional Options, then compares slugs (or full paths) using exact match and Levenshtein similarity. You control what gets ignored (www, protocol, query params, stop words)."
  },
  {
    question: "What does 'Ignore www / non-www' do?",
    answer: "It treats 'www.example.com' and 'example.com' as the same domain, so both are stored under the same normalized key. This prevents false negatives when your database mixes www and non-www URLs."
  },
  {
    question: "What does 'Remove Stop Words from slug' do?",
    answer: "It strips common filler words (a, the, and, for, in, etc.) from the slug before comparison. So 'guide-to-seo' and 'seo-guide' would be compared as 'guide-seo' vs 'seo-guide' — catching topic duplicates that differ only in stop-word phrasing."
  },
  {
    question: "What is Basic Stemming?",
    answer: "Stemming reduces words to their root form by removing common suffixes (-ing, -ed, -es, -s). So 'ranking-guide' and 'rankings-guide' would both reduce to 'ranking-guide' and be flagged as duplicates."
  },
  {
    question: "What does 'Compare Full Path' mode do?",
    answer: "Instead of comparing only the last slug segment (e.g., 'seo-guide'), it compares the full URL path (e.g., '/blog/2024/seo-guide'). Use this if your site has pages with identical slugs in different directories."
  },
  {
    question: "Where is my URL database stored?",
    answer: "All URLs are stored exclusively in your browser's localStorage. Nothing is ever sent to any server. Data persists between sessions on the same browser/device."
  }
];

// ─── Option Toggle Component ──────────────────────────────────────────────────
function OptionToggle({ label, desc, checked, onChange, icon }) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", padding: "10px 12px", borderRadius: "4px", border: `1px solid ${checked ? "#c7d2fe" : "#e2e8f0"}`, background: checked ? "#eef2ff" : "#f8fafc", transition: "all 0.15s" }}>
      <div style={{ position: "relative", flexShrink: 0, marginTop: "2px" }}>
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: "none" }} />
        <div style={{ width: "36px", height: "20px", borderRadius: "4px", background: checked ? "#4f46e5" : "#cbd5e1", transition: "background 0.2s", position: "relative" }}>
          <div style={{ position: "absolute", top: "3px", left: checked ? "19px" : "3px", width: "14px", height: "14px", borderRadius: "2px", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}></div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: checked ? "#3730a3" : "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
          {icon && <i className={icon} style={{ fontSize: "12px", color: checked ? "#4f46e5" : "#94a3b8" }}></i>}
          {label}
        </div>
        {desc && <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "2px", lineHeight: 1.5 }}>{desc}</div>}
      </div>
    </label>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UrlSlugDuplicateChecker() {

  // ── Professional Options ──────────────────────────────────────────────────
  const [opts, setOpts] = useState({
    ignoreProtocol: true,
    ignoreWww: true,
    ignoreTrailingSlash: true,
    ignoreQueryParams: true,
    removeStopWords: false,
    stemming: false,
    compareFullPath: false,
    domainFilter: "",
    batchMode: false,
  });
  const [showOptions, setShowOptions] = useState(false);

  const setOpt = (key, val) => setOpts(prev => ({ ...prev, [key]: val }));

  // ── Saved URL DB (localStorage) ──────────────────────────────────────────
  const [savedUrls, setSavedUrls] = useState([]);

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

  // ── Derived slug for an entry based on current options ───────────────────
  const computeKey = useCallback((raw) => {
    if (opts.compareFullPath) {
      return parseUrl(raw, opts).full;
    }
    return normalizeSlug(raw, opts);
  }, [opts]);

  // ── Left Panel – Add Existing URLs ───────────────────────────────────────
  const [inputText, setInputText] = useState(
    "https://example.com/blog/local-seo-guide\nhttps://example.com/blog/technical-seo\n/blog/ecommerce-seo"
  );
  const [addMsg, setAddMsg] = useState(null);

  const handleAddUrls = () => {
    const lines = inputText.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    const existingKeys = new Set(savedUrls.map(u => u.key));
    const newEntries = [];
    let dupeCount = 0;
    lines.forEach(raw => {
      const key = computeKey(raw);
      const slug = normalizeSlug(raw, opts);
      if (!key) return;
      if (existingKeys.has(key)) { dupeCount++; return; }
      existingKeys.add(key);
      newEntries.push({
        id: Date.now() + Math.random(),
        raw,
        key,
        slug,
        fullPath: parseUrl(raw, opts).full,
        domain: extractDomain(raw),
        addedAt: new Date().toISOString()
      });
    });
    persistSave([...savedUrls, ...newEntries]);
    setInputText("");
    setAddMsg(
      newEntries.length
        ? `✅ ${newEntries.length} URL(s) added.${dupeCount ? ` ${dupeCount} duplicate(s) skipped.` : ""}`
        : `⚠️ All ${dupeCount} entries already exist in the database.`
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
      const existingKeys = new Set(savedUrls.map(u => u.key));
      const newEntries = [];
      matches.forEach(raw => {
        const key = computeKey(raw);
        const slug = normalizeSlug(raw, opts);
        if (!key || existingKeys.has(key)) return;
        existingKeys.add(key);
        newEntries.push({ id: Date.now() + Math.random(), raw, key, slug, fullPath: parseUrl(raw, opts).full, domain: extractDomain(raw), addedAt: new Date().toISOString() });
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

  const handleDeleteOne = (id) => persistSave(savedUrls.filter(u => u.id !== id));

  // ── Right Panel – Check New URL ───────────────────────────────────────────
  const [newUrl, setNewUrl] = useState("/blog/local-seo-bangladesh-guide");
  const [batchInput, setBatchInput] = useState("/blog/local-seo-bangladesh-guide\n/blog/technical-seo-tips\n/blog/ecommerce-seo-guide");
  const [threshold, setThreshold] = useState(70);
  const [checkResult, setCheckResult] = useState(null);

  // Domain filter applied to database
  const filteredDb = useMemo(() => {
    const df = opts.domainFilter.trim().toLowerCase().replace(/^www\./, "");
    if (!df) return savedUrls;
    return savedUrls.filter(u => u.domain.replace(/^www\./, "") === df);
  }, [savedUrls, opts.domainFilter]);

  const runCheck = (urlsToCheck) => {
    const results = urlsToCheck.map(rawNew => {
      const newKey = computeKey(rawNew);
      const newSlug = normalizeSlug(rawNew, opts);
      const exactMatches = [];
      const nearMatches = [];

      filteredDb.forEach(entry => {
        if (entry.key === newKey) {
          exactMatches.push({ ...entry, score: 100 });
        } else {
          const score = similarityPct(newSlug, entry.slug);
          if (score >= threshold) nearMatches.push({ ...entry, score });
        }
      });
      nearMatches.sort((a, b) => b.score - a.score);
      return {
        rawNew,
        newKey,
        newSlug,
        exactMatches,
        nearMatches,
        isClean: exactMatches.length === 0 && nearMatches.length === 0,
      };
    });
    return results;
  };

  const handleCheck = () => {
    if (opts.batchMode) {
      const urls = batchInput.split("\n").map(l => l.trim()).filter(Boolean);
      if (!urls.length) return;
      setCheckResult({ batch: true, results: runCheck(urls), checkedAt: new Date().toLocaleTimeString() });
    } else {
      if (!newUrl.trim()) return;
      const [r] = runCheck([newUrl.trim()]);
      setCheckResult({ batch: false, single: r, checkedAt: new Date().toLocaleTimeString() });
    }
  };

  // ── DB Search ─────────────────────────────────────────────────────────────
  const [dbSearch, setDbSearch] = useState("");

  const displayedDb = useMemo(() => {
    const q = dbSearch.toLowerCase().trim();
    const base = filteredDb;
    if (!q) return base;
    return base.filter(u => u.raw.toLowerCase().includes(q) || u.slug.toLowerCase().includes(q));
  }, [filteredDb, dbSearch]);

  const uniqueDomains = useMemo(() => new Set(savedUrls.map(u => u.domain).filter(d => d !== "—")).size, [savedUrls]);
  const uniqueSlugs = useMemo(() => new Set(savedUrls.map(u => u.slug)).size, [savedUrls]);

  const handleExportCsv = () => {
    if (!savedUrls.length) return;
    const rows = ["#,URL / Slug,Normalized Slug,Full Path Key,Domain,Added At",
      ...savedUrls.map((u, i) => `${i + 1},"${u.raw}","${u.slug}","${u.key}","${u.domain}","${u.addedAt}"`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "url-database.csv";
    a.click();
  };

  // ─── Styles helpers ───────────────────────────────────────────────────────
  const card = { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="tool-page-wrapper">

      {/* Header */}
      <section className="page-header-section">
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", display: "inline-flex" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "4px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", listStyle: "none", margin: 0 }}>
              <li><Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}><i className="fa-solid fa-house" style={{ fontSize: "0.78rem" }}></i> Home</Link></li>
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
            <h1 className="page-title" style={{ fontSize: "2.6rem" }}>URL & Slug Duplicate Checker</h1>
            <p className="page-subtitle">
              Build your existing URL database, then instantly check if a new URL or slug already exists — with near-duplicate detection, stop-word stripping, stemming, and full-path comparison.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
            {[
              { icon: "fa-solid fa-database", color: "#4f46e5", label: "Browser localStorage Database" },
              { icon: "fa-solid fa-shield-halved", color: "#8b5cf6", label: "100% Private — No Server" },
              { icon: "fa-solid fa-sliders", color: "#059669", label: "8 Professional Options" },
            ].map(b => (
              <div key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
                <i className={b.icon} style={{ color: b.color }}></i> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>

          {/* ── Professional Options Panel ── */}
          <div style={{ marginBottom: "20px", ...card }}>
            <button
              onClick={() => setShowOptions(v => !v)}
              style={{
                width: "100%", background: "none", border: "none", padding: "16px 22px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", borderRadius: "4px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "4px", background: "#ede9fe", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="fa-solid fa-sliders"></i>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>
                    Professional Options
                    <span style={{ marginLeft: "10px", fontSize: "11px", fontWeight: 700, background: "#ede9fe", color: "#7c3aed", padding: "2px 8px", borderRadius: "4px" }}>
                      {[opts.ignoreProtocol, opts.ignoreWww, opts.ignoreTrailingSlash, opts.ignoreQueryParams, opts.removeStopWords, opts.stemming, opts.compareFullPath, !!opts.domainFilter.trim(), opts.batchMode].filter(Boolean).length} active
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>URL normalization, stop words, stemming, domain filter, batch mode</div>
                </div>
              </div>
              <i className={`fa-solid fa-chevron-${showOptions ? "up" : "down"}`} style={{ color: "#94a3b8", fontSize: "14px" }}></i>
            </button>

            {showOptions && (
              <div style={{ padding: "0 22px 22px" }}>
                <div style={{ height: "1px", background: "#e2e8f0", marginBottom: "18px" }}></div>

                {/* Section 1: URL Normalization */}
                <div style={{ marginBottom: "18px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-link" style={{ color: "#4f46e5" }}></i> URL Normalization
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "8px" }}>
                    <OptionToggle
                      label="Ignore HTTP / HTTPS Protocol"
                      desc="Treat http:// and https:// as identical"
                      icon="fa-solid fa-lock"
                      checked={opts.ignoreProtocol}
                      onChange={v => setOpt("ignoreProtocol", v)}
                    />
                    <OptionToggle
                      label="Ignore www / non-www"
                      desc="Treat www.example.com = example.com"
                      icon="fa-solid fa-globe"
                      checked={opts.ignoreWww}
                      onChange={v => setOpt("ignoreWww", v)}
                    />
                    <OptionToggle
                      label="Ignore Trailing Slash"
                      desc="Treat /page/ and /page as identical"
                      icon="fa-solid fa-slash"
                      checked={opts.ignoreTrailingSlash}
                      onChange={v => setOpt("ignoreTrailingSlash", v)}
                    />
                    <OptionToggle
                      label="Ignore Query Parameters"
                      desc="Strip ?utm_source=… before comparing"
                      icon="fa-solid fa-filter"
                      checked={opts.ignoreQueryParams}
                      onChange={v => setOpt("ignoreQueryParams", v)}
                    />
                  </div>
                </div>

                {/* Section 2: Slug Intelligence */}
                <div style={{ marginBottom: "18px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-brain" style={{ color: "#7c3aed" }}></i> Slug Intelligence
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "8px" }}>
                    <OptionToggle
                      label="Remove Stop Words from Slug"
                      desc='Strip "a, the, for, in, and…" before comparing'
                      icon="fa-solid fa-strikethrough"
                      checked={opts.removeStopWords}
                      onChange={v => setOpt("removeStopWords", v)}
                    />
                    <OptionToggle
                      label="Basic Suffix Stemming"
                      desc="Reduce -ing, -ed, -es, -s to root form"
                      icon="fa-solid fa-scissors"
                      checked={opts.stemming}
                      onChange={v => setOpt("stemming", v)}
                    />
                    <OptionToggle
                      label="Compare Full URL Path"
                      desc="Use entire path, not just last slug segment"
                      icon="fa-solid fa-route"
                      checked={opts.compareFullPath}
                      onChange={v => setOpt("compareFullPath", v)}
                    />
                    <OptionToggle
                      label="Batch Check Mode"
                      desc="Check multiple new URLs at once"
                      icon="fa-solid fa-layer-group"
                      checked={opts.batchMode}
                      onChange={v => setOpt("batchMode", v)}
                    />
                  </div>
                </div>

                {/* Section 3: Domain Filter */}
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-filter-circle-dollar" style={{ color: "#059669" }}></i> Database Scope
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: "220px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                        <i className="fa-solid fa-globe" style={{ marginRight: "5px", color: "#0284c7" }}></i>
                        Domain Filter <span style={{ color: "#94a3b8", fontWeight: 500 }}>(leave empty to check all)</span>
                      </label>
                      <input
                        type="text"
                        value={opts.domainFilter}
                        onChange={e => setOpt("domainFilter", e.target.value)}
                        placeholder="e.g. abdullahbdseo.com"
                        style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "13px", outline: "none", color: "#0f172a", background: "#f8fafc", boxSizing: "border-box" }}
                      />
                    </div>
                    <div style={{ paddingTop: "22px" }}>
                      <div style={{ padding: "9px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px", fontSize: "12px", fontWeight: 600, color: "#15803d" }}>
                        <i className="fa-solid fa-circle-check" style={{ marginRight: "5px" }}></i>
                        Checking against <strong>{filteredDb.length}</strong> of {savedUrls.length} saved URL(s)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Two-Panel Row ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

            {/* LEFT: Add Existing URLs */}
            <div style={{ ...card, padding: "26px" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
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
                style={{ width: "100%", fontFamily: "'Courier New', monospace", fontSize: "12.5px", lineHeight: 1.75, padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "4px", resize: "vertical", color: "#0f172a", background: "#f8fafc", boxSizing: "border-box", outline: "none" }}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
                <button onClick={handleAddUrls}
                  style={{ background: "#4f46e5", color: "#fff", border: "none", borderRadius: "4px", padding: "9px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}>
                  <i className="fa-solid fa-plus"></i> Add URLs
                </button>
                <label style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "9px 18px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}>
                  <i className="fa-solid fa-file-csv"></i> Import CSV
                  <input type="file" accept=".csv,.txt" style={{ display: "none" }} onChange={handleImportCsv} />
                </label>
                <button onClick={handleClearAll}
                  style={{ background: "#fff0f0", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", padding: "9px 18px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}>
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
            <div style={{ ...card, padding: "26px" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                2. Check New {opts.batchMode ? "URLs (Batch)" : "URL / Slug"}
              </h2>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 14px", fontWeight: 600 }}>
                {opts.batchMode ? "Paste multiple new URLs — one per line" : "New blog URL or slug"}
              </p>

              {opts.batchMode ? (
                <textarea
                  value={batchInput}
                  onChange={e => { setBatchInput(e.target.value); setCheckResult(null); }}
                  rows={5}
                  placeholder={"/blog/new-post-1\n/blog/new-post-2\nhttps://example.com/blog/new-post-3"}
                  style={{ width: "100%", fontFamily: "'Courier New', monospace", fontSize: "12.5px", lineHeight: 1.75, padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "4px", resize: "vertical", color: "#0f172a", background: "#f8fafc", boxSizing: "border-box", outline: "none", marginBottom: "14px" }}
                />
              ) : (
                <input
                  type="text"
                  value={newUrl}
                  onChange={e => { setNewUrl(e.target.value); setCheckResult(null); }}
                  placeholder="/blog/your-new-post-slug"
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "13.5px", color: "#0f172a", background: "#f8fafc", boxSizing: "border-box", outline: "none", marginBottom: "16px" }}
                />
              )}

              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>Similarity threshold:</label>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#4f46e5" }}>{threshold}%</span>
                </div>
                <input type="range" min={40} max={99} value={threshold} onChange={e => { setThreshold(Number(e.target.value)); setCheckResult(null); }} style={{ width: "100%", accentColor: "#4f46e5" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  <span>40% (broad)</span><span>70% (recommended)</span><span>99% (strict)</span>
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={(!newUrl.trim() && !opts.batchMode) || (opts.batchMode && !batchInput.trim()) || savedUrls.length === 0}
                style={{
                  width: "100%", background: savedUrls.length === 0 ? "#a5b4fc" : "#4f46e5",
                  color: "#fff", border: "none", borderRadius: "4px", padding: "12px",
                  fontWeight: 800, fontSize: "14px", cursor: savedUrls.length === 0 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                {savedUrls.length === 0 ? "Add URLs first to check" : opts.batchMode ? "Check All URLs" : "Check Duplicate"}
              </button>

              {!opts.batchMode && newUrl.trim() && (
                <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "12px", color: "#64748b" }}>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700 }}>Normalized slug: </span>
                    <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "1px 7px", borderRadius: "4px", fontWeight: 700 }}>{normalizeSlug(newUrl, opts) || "—"}</code>
                  </div>
                  {opts.compareFullPath && (
                    <div>
                      <span style={{ fontWeight: 700 }}>Full path key: </span>
                      <code style={{ background: "#dcfce7", color: "#15803d", padding: "1px 7px", borderRadius: "4px", fontWeight: 700 }}>{parseUrl(newUrl, opts).full || "—"}</code>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Check Result ── */}
          {checkResult && !checkResult.batch && checkResult.single && (() => {
            const r = checkResult.single;
            return (
              <div style={{ marginBottom: "20px", background: r.isClean ? "#f0fdf4" : "#fef2f2", border: `2px solid ${r.isClean ? "#bbf7d0" : "#fecaca"}`, borderRadius: "4px", padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: (r.exactMatches.length + r.nearMatches.length) > 0 ? "18px" : 0 }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "4px", background: r.isClean ? "#dcfce7" : "#fee2e2", color: r.isClean ? "#15803d" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                    <i className={r.isClean ? "fa-solid fa-circle-check" : "fa-solid fa-triangle-exclamation"}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: r.isClean ? "#15803d" : "#991b1b" }}>
                      {r.isClean ? "✅ No Duplicate Found — Safe to Publish!" : `⚠️ Duplicate Risk: ${r.exactMatches.length} exact, ${r.nearMatches.length} near-duplicate`}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                      Checked: <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "1px 6px", borderRadius: "4px" }}>{r.newSlug}</code> against {filteredDb.length} URL(s) · {checkResult.checkedAt}
                    </div>
                  </div>
                </div>
                {r.exactMatches.map(m => (
                  <div key={m.id} style={{ padding: "10px 14px", background: "#fff", border: "1px solid #fecaca", borderRadius: "4px", marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>{m.raw}</span>
                    <span style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", padding: "2px 10px", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>⛔ 100% Exact</span>
                  </div>
                ))}
                {r.nearMatches.map(m => (
                  <div key={m.id} style={{ padding: "10px 14px", background: "#fff", border: "1px solid #fde68a", borderRadius: "4px", marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>{m.raw}</span>
                    <span style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a", borderRadius: "4px", padding: "2px 10px", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>~ {m.score}% Similar</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Batch Results */}
          {checkResult && checkResult.batch && (
            <div style={{ marginBottom: "20px", ...card, overflow: "hidden" }}>
              <div style={{ padding: "16px 22px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  <i className="fa-solid fa-layer-group" style={{ color: "#4f46e5", marginRight: "8px" }}></i>
                  Batch Check Results — {checkResult.results.length} URL(s) · {checkResult.checkedAt}
                </h3>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>✅ Clean: {checkResult.results.filter(r => r.isClean).length}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "#fef2f2", color: "#dc2626" }}>⛔ Dup: {checkResult.results.filter(r => !r.isClean).length}</span>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", width: "36px" }}>#</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>URL / Slug</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Normalized Slug</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Status</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Matches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkResult.results.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                        <td style={{ padding: "10px 16px", color: "#94a3b8", fontWeight: 700 }}>{i + 1}</td>
                        <td style={{ padding: "10px 16px", maxWidth: "280px" }}>
                          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>{r.rawNew}</span>
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "2px 8px", borderRadius: "4px", fontSize: "12px" }}>{r.newSlug}</code>
                        </td>
                        <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                          {r.isClean
                            ? <span style={{ background: "#dcfce7", color: "#15803d", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}><i className="fa-solid fa-circle-check"></i> Clean</span>
                            : r.exactMatches.length > 0
                              ? <span style={{ background: "#fef2f2", color: "#dc2626", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}><i className="fa-solid fa-circle-xmark"></i> Exact Dup</span>
                              : <span style={{ background: "#fffbeb", color: "#d97706", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}><i className="fa-solid fa-triangle-exclamation"></i> Near-Dup</span>
                          }
                        </td>
                        <td style={{ padding: "10px 16px", fontSize: "12px", color: "#475569" }}>
                          {r.exactMatches.length > 0 && <div>Exact: {r.exactMatches.map(m => <code key={m.id} style={{ background: "#fef2f2", color: "#dc2626", padding: "1px 6px", borderRadius: "4px", marginRight: "4px" }}>{m.slug}</code>)}</div>}
                          {r.nearMatches.length > 0 && <div style={{ marginTop: r.exactMatches.length ? "4px" : 0 }}>Near: {r.nearMatches.slice(0, 2).map(m => <span key={m.id} style={{ marginRight: "6px" }}><code style={{ background: "#fffbeb", color: "#d97706", padding: "1px 6px", borderRadius: "4px" }}>{m.slug}</code> ({m.score}%)</span>)}</div>}
                          {r.isClean && <span style={{ color: "#94a3b8" }}>—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Saved URL Database ── */}
          <div style={{ ...card, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 3px" }}>
                    <i className="fa-solid fa-database" style={{ color: "#4f46e5", marginRight: "8px" }}></i>
                    Saved URL Database
                    {opts.domainFilter.trim() && (
                      <span style={{ marginLeft: "8px", fontSize: "11px", background: "#e0f2fe", color: "#0284c7", padding: "2px 8px", borderRadius: "4px", fontWeight: 700 }}>
                        Filtered: {opts.domainFilter.trim()}
                      </span>
                    )}
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, fontWeight: 500 }}>Stored locally in this browser.</p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ position: "relative" }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "13px" }}></i>
                    <input type="text" value={dbSearch} onChange={e => setDbSearch(e.target.value)} placeholder="Search URLs..." style={{ padding: "8px 12px 8px 32px", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "13px", outline: "none", width: "200px", color: "#0f172a", background: "#f8fafc" }} />
                  </div>
                  <button onClick={handleExportCsv} disabled={!savedUrls.length}
                    style={{ background: savedUrls.length ? "#0f172a" : "#e2e8f0", color: savedUrls.length ? "#fff" : "#94a3b8", border: "none", borderRadius: "4px", padding: "8px 18px", fontWeight: 700, fontSize: "13px", cursor: savedUrls.length ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "7px" }}>
                    <i className="fa-solid fa-download"></i> Export CSV
                  </button>
                </div>
              </div>

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

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", width: "44px" }}>#</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>URL / Slug</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b", whiteSpace: "nowrap" }}>Normalized Slug</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Domain</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 800, color: "#64748b" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedDb.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: "32px 16px", textAlign: "center", color: "#94a3b8", fontSize: "13px", fontStyle: "italic" }}>
                      {savedUrls.length === 0 ? "No URLs saved yet." : "No results match your search."}
                    </td></tr>
                  ) : (
                    displayedDb.map((entry, i) => (
                      <tr key={entry.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                        <td style={{ padding: "10px 16px", color: "#94a3b8", fontWeight: 700 }}>{i + 1}</td>
                        <td style={{ padding: "10px 16px", maxWidth: "360px" }}>
                          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#0f172a", wordBreak: "break-all" }}>{entry.raw}</span>
                        </td>
                        <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                          <code style={{ background: "#e0e7ff", color: "#4338ca", padding: "2px 9px", borderRadius: "4px", fontSize: "12px", fontWeight: 700 }}>{entry.slug}</code>
                        </td>
                        <td style={{ padding: "10px 16px", fontSize: "12px", color: "#64748b" }}>{entry.domain}</td>
                        <td style={{ padding: "10px 16px" }}>
                          <button onClick={() => handleDeleteOne(entry.id)}
                            style={{ background: "#fff0f0", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "4px", padding: "4px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
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
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Frequently Asked Questions</h2>
              <p style={{ color: "#64748b", fontSize: "1rem" }}>Everything about duplicate slug detection and canonicalization.</p>
            </div>
            <ToolFaqAccordion faqs={FAQ_ITEMS} />
          </div>

          {/* CTA Banner */}
          <div style={{ marginTop: "50px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "4px", padding: "44px 36px", textAlign: "center", color: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.2)" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 12px", color: "#ffffff" }}>Need a Full Technical SEO Audit?</h2>
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
