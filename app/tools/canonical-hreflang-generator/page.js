"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

// Common Language & Country options for auto-completion
const POPULAR_LOCALES = [
  { code: "x-default", label: "x-default (Default / Fallback International)" },
  { code: "en", label: "en (English - Global)" },
  { code: "en-us", label: "en-us (English - United States)" },
  { code: "en-gb", label: "en-gb (English - United Kingdom)" },
  { code: "en-ca", label: "en-ca (English - Canada)" },
  { code: "en-au", label: "en-au (English - Australia)" },
  { code: "bn", label: "bn (Bengali - Global)" },
  { code: "bn-bd", label: "bn-bd (Bengali - Bangladesh)" },
  { code: "bn-in", label: "bn-in (Bengali - India)" },
  { code: "hi-in", label: "hi-in (Hindi - India)" },
  { code: "es", label: "es (Spanish - Global)" },
  { code: "es-es", label: "es-es (Spanish - Spain)" },
  { code: "es-mx", label: "es-mx (Spanish - Mexico)" },
  { code: "de-de", label: "de-de (German - Germany)" },
  { code: "fr-fr", label: "fr-fr (French - France)" },
  { code: "it-it", label: "it-it (Italian - Italy)" },
  { code: "pt-br", label: "pt-br (Portuguese - Brazil)" },
  { code: "ar", label: "ar (Arabic - Global)" },
  { code: "ja-jp", label: "ja-jp (Japanese - Japan)" },
  { code: "zh-cn", label: "zh-cn (Chinese - Simplified)" },
];

export default function CanonicalHreflangGenerator() {
  // Mode selection: 'canonical' | 'hreflang' | 'bulk'
  const [activeMode, setActiveMode] = useState("hreflang");

  // --- Canonical Single State ---
  const [rawCanonicalUrl, setRawCanonicalUrl] = useState("https://abdullahbdseo.com/services/technical-seo?utm_source=facebook&session_id=98372&sort=desc");
  const [cleanQueryParameters, setCleanQueryParameters] = useState(true);
  const [forceHttps, setForceHttps] = useState(true);
  const [trailingSlashOption, setTrailingSlashOption] = useState("preserve"); // preserve | add | remove
  const [crossDomainCanonical, setCrossDomainCanonical] = useState(false);
  const [originalSourceUrl, setOriginalSourceUrl] = useState("https://medium.com/@abdullah/technical-seo-guide");

  // --- Hreflang Multi-Language State ---
  const [canonicalPageUrl, setCanonicalPageUrl] = useState("https://abdullahbdseo.com/seo-audit");
  const [hreflangRows, setHreflangRows] = useState([
    { lang: "x-default", url: "https://abdullahbdseo.com/seo-audit" },
    { lang: "en-us", url: "https://abdullahbdseo.com/en-us/seo-audit" },
    { lang: "en-gb", url: "https://abdullahbdseo.com/en-gb/seo-audit" },
    { lang: "bn-bd", url: "https://abdullahbdseo.com/bn-bd/seo-audit" },
    { lang: "es-es", url: "https://abdullahbdseo.com/es/seo-audit" },
  ]);

  // --- Bulk CSV Mode State ---
  const [bulkCsvInput, setBulkCsvInput] = useState(
    `https://abdullahbdseo.com/pricing, x-default
https://abdullahbdseo.com/en-us/pricing, en-us
https://abdullahbdseo.com/en-gb/pricing, en-gb
https://abdullahbdseo.com/bn/pricing, bn-bd
https://abdullahbdseo.com/es/pricing, es-es`
  );

  // Output export tab: 'html' | 'nextjs' | 'sitemap' | 'headers'
  const [activeOutputTab, setActiveOutputTab] = useState("html");
  const [copiedCode, setCopiedCode] = useState(false);

  // Clean and normalize canonical URL
  const processedCanonicalUrl = useMemo(() => {
    if (crossDomainCanonical && originalSourceUrl.trim()) {
      return originalSourceUrl.trim();
    }
    if (!rawCanonicalUrl.trim()) return "";
    try {
      let str = rawCanonicalUrl.trim();
      if (!str.startsWith("http://") && !str.startsWith("https://")) {
        str = "https://" + str;
      }
      const urlObj = new URL(str);

      if (forceHttps) {
        urlObj.protocol = "https:";
      }

      if (cleanQueryParameters) {
        // Strip common tracking and session parameters
        const trackingParams = [
          "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
          "fbclid", "gclid", "msclkid", "dclid", "twclid", "session_id", "sort", "ref"
        ];
        trackingParams.forEach((param) => urlObj.searchParams.delete(param));
      }

      let pathname = urlObj.pathname;
      if (trailingSlashOption === "add" && !pathname.endsWith("/") && !pathname.includes(".")) {
        pathname += "/";
      } else if (trailingSlashOption === "remove" && pathname.endsWith("/") && pathname.length > 1) {
        pathname = pathname.slice(0, -1);
      }
      urlObj.pathname = pathname;

      return urlObj.toString();
    } catch {
      return rawCanonicalUrl.trim();
    }
  }, [rawCanonicalUrl, cleanQueryParameters, forceHttps, trailingSlashOption, crossDomainCanonical, originalSourceUrl]);

  // Hreflang Row Handlers
  const handleAddHreflangRow = () => {
    setHreflangRows([...hreflangRows, { lang: "en", url: "" }]);
  };

  const handleUpdateHreflangRow = (index, field, value) => {
    const updated = [...hreflangRows];
    updated[index][field] = value;
    setHreflangRows(updated);
  };

  const handleRemoveHreflangRow = (index) => {
    if (hreflangRows.length <= 1) return;
    setHreflangRows(hreflangRows.filter((_, i) => i !== index));
  };

  // Bulk parsed rows
  const parsedBulkRows = useMemo(() => {
    if (!bulkCsvInput.trim()) return [];
    return bulkCsvInput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(/[,\t|]/).map((p) => p.trim());
        if (parts.length >= 2) {
          return { url: parts[0], lang: parts[1].toLowerCase() };
        }
        return null;
      })
      .filter(Boolean);
  }, [bulkCsvInput]);

  // Determine active rows for generation based on mode
  const activeRows = useMemo(() => {
    if (activeMode === "bulk") return parsedBulkRows;
    return hreflangRows.filter((r) => r.url.trim().length > 0 && r.lang.trim().length > 0);
  }, [activeMode, parsedBulkRows, hreflangRows]);

  // Audit Validation Checks
  const hreflangValidation = useMemo(() => {
    const checks = [];
    const langs = activeRows.map((r) => r.lang.toLowerCase().trim());

    // 1. Check for x-default
    if (langs.includes("x-default")) {
      checks.push({ status: "good", label: "x-default fallback tag is properly defined for unmatched geographies." });
    } else {
      checks.push({ status: "warning", label: "Missing 'x-default' fallback tag. Highly recommended by Google." });
    }

    // 2. Check for duplicate language codes
    const duplicates = langs.filter((item, index) => langs.indexOf(item) !== index);
    if (duplicates.length > 0) {
      checks.push({ status: "error", label: `Duplicate language codes detected: ${duplicates.join(", ")}. Each locale must be unique.` });
    } else if (langs.length > 1) {
      checks.push({ status: "good", label: "All locale codes are distinct and properly partitioned." });
    }

    // 3. Check for valid protocol
    const insecureUrls = activeRows.filter((r) => !r.url.startsWith("https://"));
    if (insecureUrls.length > 0) {
      checks.push({ status: "warning", label: `${insecureUrls.length} URL(s) are not using secure HTTPS.` });
    } else if (activeRows.length > 0) {
      checks.push({ status: "good", label: "All target alternate URLs are secure HTTPS endpoints." });
    }

    // 4. Canonical self-reference check
    if (canonicalPageUrl.trim()) {
      const hasSelf = activeRows.some((r) => r.url.trim() === canonicalPageUrl.trim());
      if (hasSelf) {
        checks.push({ status: "good", label: "Self-referential hreflang tag is present (Mandatory Google Requirement)." });
      } else {
        checks.push({ status: "warning", label: "Current page canonical is not found in the hreflang list. Hreflang cluster must be bidirectional and include itself." });
      }
    }

    return checks;
  }, [activeRows, canonicalPageUrl]);

  // Code Generation Output
  const generatedHtmlCode = useMemo(() => {
    if (activeMode === "canonical") {
      return `<!-- Primary Canonical Link -->\n<link rel="canonical" href="${processedCanonicalUrl}">`;
    }

    const lines = [
      `<!-- Canonical URL for this specific variant -->`,
      `<link rel="canonical" href="${canonicalPageUrl}">`,
      ``,
      `<!-- Multi-Language & International Hreflang Tags -->`
    ];

    activeRows.forEach((row) => {
      lines.push(`<link rel="alternate" hreflang="${row.lang}" href="${row.url}">`);
    });

    return lines.join("\n");
  }, [activeMode, processedCanonicalUrl, canonicalPageUrl, activeRows]);

  const generatedNextJsCode = useMemo(() => {
    if (activeMode === "canonical") {
      return `// Next.js App Router (app/layout.js or app/page.js)
export const metadata = {
  alternates: {
    canonical: "${processedCanonicalUrl}",
  },
};`;
    }

    const languagesObj = {};
    activeRows.forEach((r) => {
      languagesObj[r.lang] = r.url;
    });

    return `// Next.js App Router (app/layout.js or app/page.js)
export const metadata = {
  alternates: {
    canonical: "${canonicalPageUrl}",
    languages: ${JSON.stringify(languagesObj, null, 6).replace(/"([^"]+)":/g, "$1:")},
  },
};`;
  }, [activeMode, processedCanonicalUrl, canonicalPageUrl, activeRows]);

  const generatedSitemapCode = useMemo(() => {
    const lines = [
      `<!-- Add inside your XML sitemap <url> block -->`,
      `<url>`,
      `  <loc>${canonicalPageUrl}</loc>`
    ];

    activeRows.forEach((row) => {
      lines.push(`  <xhtml:link rel="alternate" hreflang="${row.lang}" href="${row.url}"/>`);
    });

    lines.push(`</url>`);
    return lines.join("\n");
  }, [canonicalPageUrl, activeRows]);

  const generatedHeadersCode = useMemo(() => {
    if (activeMode === "canonical") {
      return `Link: <${processedCanonicalUrl}>; rel="canonical"`;
    }

    const headerParts = [`<${canonicalPageUrl}>; rel="canonical"`];
    activeRows.forEach((row) => {
      headerParts.push(`<${row.url}>; rel="alternate"; hreflang="${row.lang}"`);
    });

    return `Link: ${headerParts.join(", ")}`;
  }, [activeMode, processedCanonicalUrl, canonicalPageUrl, activeRows]);

  const activeSnippet = useMemo(() => {
    if (activeOutputTab === "nextjs") return generatedNextJsCode;
    if (activeOutputTab === "sitemap") return generatedSitemapCode;
    if (activeOutputTab === "headers") return generatedHeadersCode;
    return generatedHtmlCode;
  }, [activeOutputTab, generatedHtmlCode, generatedNextJsCode, generatedSitemapCode, generatedHeadersCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeSnippet], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeOutputTab === "sitemap" ? "sitemap-hreflang.xml" : "canonical-hreflang-tags.txt";
    a.click;
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: "What is rel='canonical' and why is it essential for SEO?",
      a: "A canonical tag (rel=canonical) tells search engines which URL represents the master, authoritative copy of a page. It prevents duplicate content penalties caused by URL parameters (UTMs, tracking IDs, sort orders), HTTP vs HTTPS, www vs non-www, or syndication on external platforms like Medium or LinkedIn."
    },
    {
      q: "What is hreflang and when should I use it?",
      a: "The `hreflang` attribute is an HTML tag used by Google and Yandex to understand the language and geographical targeting of a webpage. If you have the same content in English (US), English (UK), and Bengali (BD), hreflang ensures searchers in London get the UK page while searchers in Dhaka get the Bengali page."
    },
    {
      q: "What is the purpose of the 'x-default' hreflang value?",
      a: "The `x-default` hreflang tag acts as the universal fallback for users whose language or location does not match any of your specific localized versions. It is typically set to your global homepage or international selector page."
    },
    {
      q: "Why must hreflang links be bidirectional (reciprocal)?",
      a: "Google requires all hreflang tags to be reciprocal. If Page A points to Page B as its Spanish alternate, Page B must also point back to Page A as its English alternate. Without bidirectional confirmation, Google ignores the hreflang annotations to prevent third-party hijacking."
    },
    {
      q: "Should I place hreflang tags in HTML, XML Sitemaps, or HTTP Headers?",
      a: "For smaller sites (under 500 URLs), placing tags directly in the HTML `<head>` is easiest. For massive enterprise sites or non-HTML files (like PDFs), placing hreflang links in XML Sitemaps or HTTP Headers is vastly superior because it avoids HTML code bloat."
    }
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero Header */}
      <section style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "48px 16px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#94a3b8", marginBottom: "16px", alignItems: "center" }}>
            <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: "#94a3b8", textDecoration: "none" }}>Free SEO Tools</Link>
            <span>/</span>
            <span style={{ color: "#38bdf8", fontWeight: 600 }}>Canonical & Hreflang Tag Generator</span>
          </nav>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px" }}>
            <div style={{ maxWidth: "760px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "4px 12px", borderRadius: "4px", fontSize: "13px", color: "#38bdf8", marginBottom: "12px", fontWeight: 600 }}>
                <i className="fa-solid fa-earth-americas"></i> International & Duplicate Content SEO Suite
              </div>
              <h1 style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1.25, margin: "0 0 12px 0", color: "#ffffff" }}>
                Canonical & Hreflang Tag Generator
              </h1>
              <p style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
                Eliminate duplicate content penalties and configure international multi-language SEO. Generate verified rel=canonical, bidirectional hreflang tags, Next.js metadata, and XML sitemap alternate links.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div style={{ backgroundColor: "#1e293b", padding: "6px", borderRadius: "4px", border: "1px solid #334155", display: "flex", gap: "6px" }}>
              {[
                { id: "hreflang", label: "Multi-Language Hreflang", icon: "fa-solid fa-language" },
                { id: "canonical", label: "Canonical URL Cleaner", icon: "fa-solid fa-link" },
                { id: "bulk", label: "Bulk CSV Importer", icon: "fa-solid fa-table-list" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMode(m.id)}
                  style={{
                    padding: "10px 14px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: activeMode === m.id ? "#2563eb" : "transparent",
                    color: activeMode === m.id ? "#ffffff" : "#94a3b8",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease"
                  }}
                >
                  <i className={m.icon}></i> {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <section style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px" }}>

          {/* Mode 1: Multi-Language Hreflang Matrix Builder */}
          {activeMode === "hreflang" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                    <i className="fa-solid fa-language" style={{ color: "#2563eb" }}></i> Multi-Language Alternate URLs Configuration
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                    Define each language/regional variant with its matching ISO language-country code.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddHreflangRow}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-solid fa-plus"></i> Add Language Variant
                </button>
              </div>

              {/* Master Canonical Page URL */}
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="canonical-page-url" style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Current Page Canonical URL (Self-Referential Anchor)
                </label>
                <input
                  id="canonical-page-url"
                  type="url"
                  value={canonicalPageUrl}
                  onChange={(e) => setCanonicalPageUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px", color: "#0f172a", boxSizing: "border-box" }}
                />
              </div>

              {/* Hreflang Rows List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {hreflangRows.map((row, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "180px 1fr 40px", gap: "10px", alignItems: "center", backgroundColor: "#f8fafc", padding: "10px 12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <input
                        list="popular-locales"
                        type="text"
                        value={row.lang}
                        onChange={(e) => handleUpdateHreflangRow(idx, "lang", e.target.value)}
                        placeholder="e.g., en-us, bn-bd"
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box", fontWeight: 600 }}
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={row.url}
                        onChange={(e) => handleUpdateHreflangRow(idx, "url", e.target.value)}
                        placeholder="https://example.com/localized-url"
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleRemoveHreflangRow(idx)}
                        disabled={hreflangRows.length <= 1}
                        style={{
                          width: "36px",
                          height: "36px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          backgroundColor: "#ffffff",
                          color: hreflangRows.length <= 1 ? "#cbd5e1" : "#ef4444",
                          cursor: hreflangRows.length <= 1 ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <datalist id="popular-locales">
                  {POPULAR_LOCALES.map((loc, i) => (
                    <option key={i} value={loc.code}>{loc.label}</option>
                  ))}
                </datalist>
              </div>

              {/* Validation Feedback */}
              <div style={{ backgroundColor: "#f8fafc", borderRadius: "4px", padding: "16px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                  <i className="fa-solid fa-shield-halved" style={{ color: "#2563eb" }}></i> Google Hreflang Validation Rules
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {hreflangValidation.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px" }}>
                      {c.status === "good" && <i className="fa-solid fa-circle-check" style={{ color: "#22c55e" }}></i>}
                      {c.status === "warning" && <i className="fa-solid fa-triangle-exclamation" style={{ color: "#f59e0b" }}></i>}
                      {c.status === "error" && <i className="fa-solid fa-circle-xmark" style={{ color: "#ef4444" }}></i>}
                      <span style={{ color: "#334155" }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Canonical URL Cleaner */}
          {activeMode === "canonical" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-link" style={{ color: "#2563eb" }}></i> Canonical URL Normalizer & Parameter Stripper
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Paste any messy URL with query tracking parameters, sort filters, or session IDs to extract the clean master canonical version.
                </p>
              </div>

              {/* Raw URL Input */}
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="raw-canonical-input" style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Target Webpage URL to Standardize
                </label>
                <input
                  id="raw-canonical-input"
                  type="text"
                  value={rawCanonicalUrl}
                  onChange={(e) => setRawCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/shop/shoes?utm_source=facebook&sort=asc&session=3829"
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px", color: "#0f172a", boxSizing: "border-box" }}
                />
              </div>

              {/* Options */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155", cursor: "pointer", backgroundColor: "#f8fafc", padding: "10px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <input
                    type="checkbox"
                    checked={cleanQueryParameters}
                    onChange={(e) => setCleanQueryParameters(e.target.checked)}
                  />
                  <span>Strip UTM & Session Tracking Params</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155", cursor: "pointer", backgroundColor: "#f8fafc", padding: "10px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <input
                    type="checkbox"
                    checked={forceHttps}
                    onChange={(e) => setForceHttps(e.target.checked)}
                  />
                  <span>Force Secure HTTPS Protocol</span>
                </label>

                <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <label htmlFor="trailing-slash-select" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Trailing Slash Policy</label>
                  <select
                    id="trailing-slash-select"
                    value={trailingSlashOption}
                    onChange={(e) => setTrailingSlashOption(e.target.value)}
                    style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", color: "#0f172a", backgroundColor: "#ffffff" }}
                  >
                    <option value="preserve">Preserve Original Slash</option>
                    <option value="add">Always Force Trailing Slash (/)</option>
                    <option value="remove">Always Remove Trailing Slash</option>
                  </select>
                </div>
              </div>

              {/* Cross Domain Canonical */}
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "4px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#0f172a", cursor: "pointer", marginBottom: "8px" }}>
                  <input
                    type="checkbox"
                    checked={crossDomainCanonical}
                    onChange={(e) => setCrossDomainCanonical(e.target.checked)}
                  />
                  <span>Cross-Domain Syndication (Syndicated / Republished Content)</span>
                </label>
                {crossDomainCanonical && (
                  <div>
                    <label htmlFor="original-source-url" style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Original Origin Source URL</label>
                    <input
                      id="original-source-url"
                      type="url"
                      value={originalSourceUrl}
                      onChange={(e) => setOriginalSourceUrl(e.target.value)}
                      placeholder="https://original-publisher.com/article-slug"
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px" }}
                    />
                  </div>
                )}
              </div>

              {/* Cleaned Result Box */}
              <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "14px", borderRadius: "4px" }}>
                <div style={{ fontSize: "12px", color: "#1e40af", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>Cleaned Master Canonical URL:</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#1e3a8a", wordBreak: "break-all" }}>
                  {processedCanonicalUrl}
                </div>
              </div>
            </div>
          )}

          {/* Mode 3: Bulk CSV Mode */}
          {activeMode === "bulk" && (
            <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-table-list" style={{ color: "#2563eb" }}></i> Bulk Hreflang CSV Importer
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Paste a list of URLs with comma-separated language codes (Format: <code>URL, language-code</code>) to generate batch hreflang code instantly.
                </p>
              </div>

              <textarea
                rows={6}
                value={bulkCsvInput}
                onChange={(e) => setBulkCsvInput(e.target.value)}
                placeholder={`https://example.com/page, x-default\nhttps://example.com/es/page, es-es\nhttps://example.com/de/page, de-de`}
                style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", fontFamily: "Consolas, monospace", color: "#0f172a", boxSizing: "border-box", resize: "vertical" }}
              />

              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
                ✨ Detected <strong>{parsedBulkRows.length}</strong> valid localized URL pair(s).
              </div>
            </div>
          )}

          {/* Code Export Box */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-code" style={{ color: "#6366f1" }}></i> Production Code Export
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Choose your implementation method: HTML header tags, Next.js metadata, XML Sitemap, or HTTP Headers.
                </p>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", backgroundColor: "#f1f5f9", padding: "3px", borderRadius: "4px" }}>
                  {[
                    { id: "html", label: "HTML <head>" },
                    { id: "nextjs", label: "Next.js App Router" },
                    { id: "sitemap", label: "XML Sitemap Block" },
                    { id: "headers", label: "HTTP Header" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveOutputTab(tab.id)}
                      style={{
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: activeOutputTab === tab.id ? "#0f172a" : "transparent",
                        color: activeOutputTab === tab.id ? "#ffffff" : "#475569",
                        fontWeight: activeOutputTab === tab.id ? 700 : 500,
                        fontSize: "12px",
                        cursor: "pointer"
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    backgroundColor: copiedCode ? "#16a34a" : "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className={copiedCode ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                  {copiedCode ? "Copied!" : "Copy Code"}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  style={{
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <i className="fa-solid fa-download"></i> Download
                </button>
              </div>
            </div>

            {/* Code container */}
            <div style={{ backgroundColor: "#0f172a", borderRadius: "4px", padding: "16px", overflowX: "auto" }}>
              <pre style={{ margin: 0, fontFamily: "Consolas, Monaco, 'Courier New', monospace", fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                <code>{activeSnippet}</code>
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* Guide & Best Practices */}
      <section style={{ maxWidth: "1200px", margin: "48px auto", padding: "0 16px" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
            The Definitive Guide to Canonicalization & Hreflang SEO
          </h2>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, marginBottom: "20px" }}>
            Search engines treat identical content accessible through multiple URLs as duplicate content, which splits ranking equity (PageRank) and leads to indexation waste. Applying proper canonical tags concentrates all link juice into a single master URL.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#2563eb", marginBottom: "8px" }}><i className="fa-solid fa-arrows-split-up-and-left"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Bidirectional Confirmation</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Every hreflang cluster must be mutually linked. If URL A points to URL B, URL B must contain a reciprocal hreflang pointing back to URL A.
              </p>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#10b981", marginBottom: "8px" }}><i className="fa-solid fa-globe"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>ISO 639-1 & ISO 3166-1</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Always use standard 2-letter language codes and optional 2-letter country codes (e.g. <code>en-gb</code> for UK English, <code>bn-bd</code> for Bangladesh).
              </p>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#f59e0b", marginBottom: "8px" }}><i className="fa-solid fa-file-code"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Self-Referential Canonical</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Each localized version should point its rel=canonical to its own URL, never across different language variants.
              </p>
            </div>
          </div>

          {/* Related Tools */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>Explore More Free SEO Tools</h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/tools/open-graph-meta-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                Open Graph Generator →
              </Link>
              <Link href="/tools/redirect-htaccess-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                301 Redirect & .htaccess Suite →
              </Link>
              <Link href="/tools/robots-sitemap-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                Robots.txt & Sitemap Generator →
              </Link>
              <Link href="/tools/url-slug-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                URL Slug Generator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 64px auto", padding: "0 16px" }}>
        <ToolFaqAccordion faqs={faqs} title="Frequently Asked Questions: Canonicals & Hreflang" />
      </section>
    </div>
  );
}
