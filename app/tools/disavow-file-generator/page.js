"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function DisavowFileGenerator() {
  const [rawInput, setRawInput] = useState(
    `https://spamblog123.xyz/bad-link.html
http://www.toxic-pbn-network.com/post/seo
gambling-casino-links-spam.net
https://adult-directory-list.ru/category/1
http://cheap-pharmacy-rx-buy.com/viagra`
  );

  const [mode, setMode] = useState("domain"); // domain | exact | auto
  const [includeComments, setIncludeComments] = useState(true);
  const [auditorName, setAuditorName] = useState("Abdullah Saleh");
  const [disavowReason, setDisavowReason] = useState("Spam PBNs, automated scraper networks & toxic link injection");
  const [copied, setCopied] = useState(false);

  // Helper to extract clean domain from any string
  const cleanDomain = (str) => {
    let clean = str.trim();
    // remove comments
    clean = clean.replace(/#.*$/, "").trim();
    if (!clean) return "";
    // remove domain: prefix if already present
    clean = clean.replace(/^domain:/i, "");
    // strip protocol
    clean = clean.replace(/^https?:\/\//i, "");
    // strip www.
    clean = clean.replace(/^www\./i, "");
    // strip path and query
    clean = clean.split("/")[0].split("?")[0].split("#")[0].trim();
    return clean.toLowerCase();
  };

  // Helper to clean full URL
  const cleanUrl = (str) => {
    let clean = str.trim().replace(/#.*$/, "").trim();
    if (!clean) return "";
    clean = clean.replace(/^domain:/i, "");
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = "https://" + clean;
    }
    return clean;
  };

  // Parse lines and build Google Disavow content
  const { disavowContent, totalEntries, uniqueDomains, errors } = useMemo(() => {
    if (!rawInput.trim()) {
      return { disavowContent: "", totalEntries: 0, uniqueDomains: 0, errors: [] };
    }

    const lines = rawInput.split("\n");
    const domainSet = new Set();
    const urlSet = new Set();
    const errList = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      if (mode === "domain") {
        const d = cleanDomain(trimmed);
        if (d && d.includes(".")) {
          domainSet.add(`domain:${d}`);
        } else if (d) {
          errList.push(`Line ${idx + 1}: Invalid domain "${trimmed}"`);
        }
      } else if (mode === "exact") {
        const u = cleanUrl(trimmed);
        if (u) {
          urlSet.add(u);
        }
      } else {
        // Auto mode
        if (trimmed.includes("/") && trimmed.split("/").length > 3) {
          urlSet.add(cleanUrl(trimmed));
        } else {
          const d = cleanDomain(trimmed);
          if (d && d.includes(".")) {
            domainSet.add(`domain:${d}`);
          }
        }
      }
    });

    const entries = [...Array.from(domainSet), ...Array.from(urlSet)];

    // Build headers
    const headerLines = [];
    if (includeComments) {
      headerLines.push("# ════════════════════════════════════════════════════════════");
      headerLines.push("# Google Search Console Disavow Links File");
      headerLines.push(`# Generated: ${new Date().toISOString().split("T")[0]}`);
      if (auditorName) headerLines.push(`# Auditor: ${auditorName}`);
      if (disavowReason) headerLines.push(`# Reason: ${disavowReason}`);
      headerLines.push("# ════════════════════════════════════════════════════════════");
      headerLines.push("");
    }

    const finalContent = [...headerLines, ...entries].join("\n");

    return {
      disavowContent: finalContent,
      totalEntries: entries.length,
      uniqueDomains: domainSet.size,
      errors: errList
    };
  }, [rawInput, mode, includeComments, auditorName, disavowReason]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(disavowContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadDisavowFile = () => {
    const blob = new Blob([disavowContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "disavow.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadSampleData = (type) => {
    if (type === "pbns") {
      setRawInput(`spampbnnetwork-one.com
pbnlinkfarms-2026.xyz
cheap-backlink-seller-site.ru
toxic-link-generator-demo.net
article-directory-auto-spin.org`);
    } else if (type === "hacked") {
      setRawInput(`http://hacked-wordpress-site.org/wp-content/uploads/viagra.html
https://compromised-store.com/discount-pills-seo-spam
http://injected-hidden-links.net/buy-crypto-links.html`);
    }
  };

  const faqs = [
    {
      q: "What is a Google Disavow file?",
      a: "A disavow file is a plain text (.txt) file encoded in UTF-8 or 7-bit ASCII that you upload to Google Search Console to instruct Google crawlers to disregard low-quality, unnatural, or spammy backlinks pointing to your site."
    },
    {
      q: "Should I disavow at the domain level or URL level?",
      a: "Google officially recommends disavowing at the domain level (using `domain:example.com`). This ensures that all existing and future toxic links from that entire domain and its subdomains are automatically ignored."
    },
    {
      q: "How long does it take for Google to process a disavow file?",
      a: "Google processes disavow lists as it recrawls and re-indexes the web, which typically takes between 2 to 4 weeks depending on the crawl frequency of the linking websites."
    },
    {
      q: "Where do I upload the disavow.txt file?",
      a: "You upload the file through Google's official Disavow Links Tool located at: https://search.google.com/search-console/disavow-links"
    }
  ];

  return (
    <div className="tool-single-page">
      {/* Page Header */}
      <section className="page-header-section" style={{ padding: "48px 0 28px", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontWeight: 700, fontSize: "0.83rem", textDecoration: "none", marginBottom: "12px" }}>
            <i className="fa-solid fa-arrow-left"></i> All Free SEO Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fee2e2", color: "#dc2626", padding: "5px 14px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 auto 12px" }}>
            <i className="fa-solid fa-shield-virus"></i> Toxic Link Protection
          </div>
          <h1 style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            Google Search Console Disavow File Generator
          </h1>
          <p style={{ fontSize: "1.02rem", color: "#64748b", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Format, clean, and export 100% compliant <code>disavow.txt</code> files for Google Search Console to neutralize toxic spam links and manual penalties.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section style={{ paddingTop: "28px", paddingBottom: "70px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "26px", alignItems: "flex-start" }}>

            {/* Left Column: Input & Settings */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-link-slash" style={{ color: "#dc2626" }}></i> Toxic Links &amp; Domains
                </h3>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button onClick={() => loadSampleData("pbns")} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "3px 8px", fontSize: "0.72rem", color: "#475569", cursor: "pointer", fontWeight: 600 }}>
                    Sample PBNs
                  </button>
                  <button onClick={() => loadSampleData("hacked")} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "3px 8px", fontSize: "0.72rem", color: "#475569", cursor: "pointer", fontWeight: 600 }}>
                    Sample Hacked URLs
                  </button>
                </div>
              </div>

              <textarea
                rows={8}
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="Paste domains or URLs here (1 per line)..."
                style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", outline: "none", resize: "vertical", fontFamily: "monospace", marginBottom: "16px" }}
              />

              {/* Mode Selection */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Disavow Directive Mode</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <button
                    onClick={() => setMode("domain")}
                    style={{ padding: "8px 12px", border: `1px solid ${mode === "domain" ? "#2563eb" : "#cbd5e1"}`, background: mode === "domain" ? "#eff6ff" : "#fff", color: mode === "domain" ? "#1d4ed8" : "#475569", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}
                  >
                    <strong>domain:site.com</strong>
                    <span style={{ display: "block", fontSize: "0.7rem", color: "#64748b", fontWeight: 500 }}>Google Recommended</span>
                  </button>
                  <button
                    onClick={() => setMode("exact")}
                    style={{ padding: "8px 12px", border: `1px solid ${mode === "exact" ? "#2563eb" : "#cbd5e1"}`, background: mode === "exact" ? "#eff6ff" : "#fff", color: mode === "exact" ? "#1d4ed8" : "#475569", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}
                  >
                    <strong>Exact URLs</strong>
                    <span style={{ display: "block", fontSize: "0.7rem", color: "#64748b", fontWeight: 500 }}>Page-level only</span>
                  </button>
                </div>
              </div>

              {/* Metadata Headers */}
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#334155", fontWeight: 700, cursor: "pointer", marginBottom: "10px" }}>
                  <input type="checkbox" checked={includeComments} onChange={(e) => setIncludeComments(e.target.checked)} />
                  Include Disavow Audit Comments (#)
                </label>

                {includeComments && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, display: "block", marginBottom: "3px" }}>Auditor / Specialist Name</label>
                      <input
                        type="text"
                        value={auditorName}
                        onChange={(e) => setAuditorName(e.target.value)}
                        placeholder="Your Name / Agency"
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, display: "block", marginBottom: "3px" }}>Disavow Reason / Campaign Notes</label>
                      <input
                        type="text"
                        value={disavowReason}
                        onChange={(e) => setDisavowReason(e.target.value)}
                        placeholder="Reason for disavowing"
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Live Disavow.txt Preview & Export */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-file-code" style={{ color: "#2563eb" }}></i> disavow.txt Preview
                  </h3>
                  <span style={{ fontSize: "0.76rem", color: "#64748b" }}>
                    {totalEntries} directives · {uniqueDomains} unique domains
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={copyToClipboard}
                    style={{ background: copied ? "#059669" : "#2563eb", color: "#fff", border: "none", borderRadius: "4px", padding: "7px 14px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                  <button
                    onClick={downloadDisavowFile}
                    style={{ background: "#059669", color: "#fff", border: "none", borderRadius: "4px", padding: "7px 14px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-download"></i> Download .txt
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <pre style={{ background: "#0f172a", color: "#38bdf8", padding: "16px", borderRadius: "4px", fontSize: "0.78rem", lineHeight: 1.6, overflow: "auto", maxHeight: "360px", whiteSpace: "pre-wrap", wordBreak: "break-all", fontFamily: "monospace", margin: "0 0 16px" }}>
                {disavowContent || "# No directives generated yet"}
              </pre>

              {/* Validation Status */}
              <div style={{ padding: "12px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "4px", fontSize: "0.8rem", color: "#065f46", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-circle-check" style={{ color: "#10b981", fontSize: "1rem" }}></i>
                <span>100% Google Search Console compliant UTF-8 plain text format.</span>
              </div>

              {/* Google Search Console Step-by-Step */}
              <div style={{ marginTop: "20px", padding: "14px", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                  How to Upload to Google Search Console:
                </h4>
                <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "0.78rem", color: "#475569", lineHeight: 1.6 }}>
                  <li>Click <strong>Download .txt</strong> above to save your <code>disavow.txt</code> file.</li>
                  <li>Visit the official <a href="https://search.google.com/search-console/disavow-links" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700 }}>Google Disavow Tool</a>.</li>
                  <li>Select your verified domain property and click <strong>Upload disavow list</strong>.</li>
                  <li>Google will confirm upload with zero syntax errors.</li>
                </ol>
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
