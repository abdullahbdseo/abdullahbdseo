"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

// Common stop words for semantic tokenization
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "for", "from",
  "in", "into", "is", "it", "its", "of", "on", "or", "our", "the", "their", "this", "to", "with"
]);

// Intent classification dictionaries
const INTENT_RULES = {
  transactional: ["buy", "order", "price", "pricing", "cost", "cheap", "discount", "coupon", "hire", "service", "services", "agency", "provider", "package", "packages", "quote", "shop", "store", "sale"],
  commercial: ["best", "top", "review", "reviews", "comparison", "vs", "versus", "alternative", "alternatives", "recommended", "pros and cons", "rated", "software", "tool", "tools"],
  informational: ["how", "what", "why", "when", "where", "guide", "tutorial", "tips", "checklist", "ideas", "examples", "strategy", "techniques", "meaning", "definition", "learn", "course", "steps"],
  navigational: ["login", "sign in", "portal", "website", "app", "download", "contact", "support", "official", "dashboard"]
};

// Preset demo keyword lists
const PRESETS = {
  seo: `technical seo audit checklist
how to do technical seo audit
best technical seo tools 2026
technical seo services agency
ecommerce technical seo guide
hire technical seo expert
backlink building strategies
buy high authority backlinks
best guest posting service
how to get dofollow backlinks
local seo ranking factors
google my business local seo tips
hire local seo agency bangladesh
schema markup generator json ld
how to add faq schema to website
on page seo content optimization
best on page seo checklist
what is search intent in seo
keyword density vs semantic search
pagespeed optimization services`,
  saas: `project management software
best project management tools for small business
trello vs asana comparison
monday com alternative open source
free task management software
how to manage remote development team
agile sprint planning best practices
jira pricing plans explained
kanban board vs scrum workflow
collaborative whiteboard software
time tracking integration for developers`,
  ecommerce: `buy running shoes online
best marathon running shoes 2026
nike vs adidas running shoes
waterproof trail running shoes reviews
cheap running shoes under 50 dollars
how to choose running shoe size
cushioned shoes for flat feet
lightweight breathable sneakers sale
arch support walking shoes discount`
};

export default function KeywordClusteringTool() {
  const [rawKeywords, setRawKeywords] = useState(PRESETS.seo);
  const [similarityLevel, setSimilarityLevel] = useState("moderate"); // strict | moderate | broad
  const [filterStopWords, setFilterStopWords] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntentFilter, setSelectedIntentFilter] = useState("all");
  const [exportFormat, setExportFormat] = useState("markdown"); // markdown | csv | json
  const [copied, setCopied] = useState(false);

  // Helper: detect search intent for a keyword
  const detectIntent = (kw) => {
    const lower = kw.toLowerCase();
    const words = lower.split(/\s+/);

    for (const token of INTENT_RULES.transactional) {
      if (lower.includes(token)) return "Transactional";
    }
    for (const token of INTENT_RULES.commercial) {
      if (lower.includes(token)) return "Commercial";
    }
    for (const token of INTENT_RULES.informational) {
      if (words.includes(token) || lower.startsWith(token)) return "Informational";
    }
    for (const token of INTENT_RULES.navigational) {
      if (lower.includes(token)) return "Navigational";
    }
    return "Informational";
  };

  // Helper: extract semantic tokens
  const getTokens = (kw) => {
    return kw
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2 && (!filterStopWords || !STOP_WORDS.has(w)));
  };

  // Clustering Algorithm
  const clusters = useMemo(() => {
    const lines = rawKeywords
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) return [];

    const items = lines.map((kw) => ({
      keyword: kw,
      intent: detectIntent(kw),
      tokens: getTokens(kw),
    }));

    // Cluster grouping container
    const clusterMap = [];

    items.forEach((item) => {
      let matchedCluster = null;

      for (const c of clusterMap) {
        // Calculate token overlap
        const sharedTokens = item.tokens.filter((t) => c.commonTokens.has(t));
        const overlapCount = sharedTokens.length;

        let isMatch = false;
        if (similarityLevel === "strict") {
          // Requires 2+ shared core tokens and same intent
          isMatch = overlapCount >= 2 && c.intent === item.intent;
        } else if (similarityLevel === "moderate") {
          // Requires at least 2 shared tokens OR (1 shared token + same intent if short)
          isMatch = overlapCount >= 2 || (overlapCount >= 1 && c.intent === item.intent && (item.tokens.length <= 3 || c.seedTokens.length <= 3));
        } else {
          // Broad: 1 shared key token
          isMatch = overlapCount >= 1;
        }

        if (isMatch) {
          matchedCluster = c;
          break;
        }
      }

      if (matchedCluster) {
        matchedCluster.keywords.push(item);
        item.tokens.forEach((t) => matchedCluster.commonTokens.add(t));
      } else {
        // Create new cluster
        clusterMap.push({
          id: `cluster-${clusterMap.length + 1}`,
          pillarName: item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1),
          seedKeyword: item.keyword,
          seedTokens: item.tokens,
          intent: item.intent,
          commonTokens: new Set(item.tokens),
          keywords: [item],
        });
      }
    });

    // Format and rank clusters by keyword count
    return clusterMap.sort((a, b) => b.keywords.length - a.keywords.length);
  }, [rawKeywords, similarityLevel, filterStopWords]);

  // Search and Filtered Clusters
  const filteredClusters = useMemo(() => {
    return clusters.filter((c) => {
      const matchesIntent = selectedIntentFilter === "all" || c.intent.toLowerCase() === selectedIntentFilter.toLowerCase();
      const matchesSearch = searchTerm === "" || 
        c.pillarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.keywords.some((k) => k.keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesIntent && matchesSearch;
    });
  }, [clusters, selectedIntentFilter, searchTerm]);

  // Overall Statistics
  const stats = useMemo(() => {
    const totalKws = clusters.reduce((sum, c) => sum + c.keywords.length, 0);
    const intentCounts = { Informational: 0, Commercial: 0, Transactional: 0, Navigational: 0 };
    clusters.forEach((c) => {
      c.keywords.forEach((k) => {
        intentCounts[k.intent] = (intentCounts[k.intent] || 0) + 1;
      });
    });

    return {
      totalKeywords: totalKws,
      totalClusters: clusters.length,
      intentCounts,
    };
  }, [clusters]);

  // Export string generator
  const exportData = useMemo(() => {
    if (exportFormat === "csv") {
      const rows = [["Cluster ID", "Pillar Topic", "Search Intent", "Keyword", "Keyword Type"]];
      clusters.forEach((c, cIdx) => {
        c.keywords.forEach((k, kIdx) => {
          rows.push([
            `Cluster #${cIdx + 1}`,
            `"${c.pillarName.replace(/"/g, '""')}"`,
            k.intent,
            `"${k.keyword.replace(/"/g, '""')}"`,
            kIdx === 0 ? "Primary Pillar" : "Secondary Cluster Keyword"
          ]);
        });
      });
      return rows.map((r) => r.join(",")).join("\n");
    }

    if (exportFormat === "json") {
      const data = clusters.map((c) => ({
        pillar_topic: c.pillarName,
        search_intent: c.intent,
        total_keywords: c.keywords.length,
        keywords: c.keywords.map((k) => ({ keyword: k.keyword, intent: k.intent })),
      }));
      return JSON.stringify(data, null, 2);
    }

    // Default: Markdown Content Brief / Silo Outline
    const lines = [`# Content Silo & Keyword Cluster Architecture\n`];
    clusters.forEach((c, idx) => {
      lines.push(`## Topic Hub ${idx + 1}: ${c.pillarName} [${c.intent}]`);
      lines.push(`- **Target Primary Focus:** \`${c.seedKeyword}\``);
      lines.push(`- **Supporting Sub-Topics (${c.keywords.length}):**`);
      c.keywords.forEach((k) => {
        lines.push(`  - ${k.keyword} *(${k.intent})*`);
      });
      lines.push(``);
    });
    return lines.join("\n");
  }, [exportFormat, clusters]);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportFormat === "csv" ? "keyword-clusters.csv" : exportFormat === "json" ? "keyword-clusters.json" : "content-silo-brief.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: "What is Keyword Clustering and why is it essential for modern SEO?",
      a: "Keyword clustering is the practice of grouping related search queries into distinct semantic topics. Instead of writing 50 separate thin articles targeting slight keyword variations (which causes keyword cannibalization), clustering allows you to create one comprehensive, authoritative 'Pillar Page' or content silo that ranks for dozens of related keywords simultaneously."
    },
    {
      q: "How does Search Intent classification help content ranking?",
      a: "Search intent reveals why a user performed a search (Informational: learning how to do something, Commercial: comparing best tools, Transactional: ready to purchase or hire). Matching your page format (e.g. guide vs pricing page) with the user's intent is Google's #1 on-page ranking criteria."
    },
    {
      q: "What is the difference between Strict, Moderate, and Broad clustering?",
      a: "Strict clustering requires multiple overlapping stem words and matching intent to form tight sub-clusters. Moderate clustering groups broader thematic synonyms suitable for a single pillar article. Broad clustering creates overarching multi-chapter content hubs."
    },
    {
      q: "How many keywords should be in a single cluster?",
      a: "A standard content cluster typically contains 1 primary focus keyword (highest volume seed) and 4 to 15 long-tail secondary keyword variations integrated seamlessly across H2/H3 headings, FAQs, and body copy."
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
            <span style={{ color: "#38bdf8", fontWeight: 600 }}>SEO Keyword Clustering & Grouping Tool</span>
          </nav>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px" }}>
            <div style={{ maxWidth: "760px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "4px 12px", borderRadius: "4px", fontSize: "13px", color: "#38bdf8", marginBottom: "12px", fontWeight: 600 }}>
                <i className="fa-solid fa-diagram-project"></i> Semantic Content Hub & Silo Architecture
              </div>
              <h1 style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1.25, margin: "0 0 12px 0", color: "#ffffff" }}>
                SEO Keyword Clustering & Grouping Tool
              </h1>
              <p style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
                Group hundreds of keywords into semantic topic clusters, classify search intent, prevent keyword cannibalization, and export structured content briefs in 1-click.
              </p>
            </div>

            {/* Live Stats Summary Card */}
            <div style={{ backgroundColor: "#1e293b", padding: "16px 20px", borderRadius: "4px", border: "1px solid #334155", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minWidth: "260px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase" }}>Keywords</div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#38bdf8" }}>{stats.totalKeywords}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase" }}>Pillar Clusters</div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#22c55e" }}>{stats.totalClusters}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <section style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px" }}>

          {/* Top Row: Input Editor & Clustering Settings */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-list-check" style={{ color: "#2563eb" }}></i> Input Keyword List (One per line)
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Paste up to 500+ keywords or try our pre-built industry dataset demos below.
                </p>
              </div>

              {/* Demo presets */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Load Sample:</span>
                <button
                  type="button"
                  onClick={() => setRawKeywords(PRESETS.seo)}
                  style={{ fontSize: "12px", padding: "4px 10px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#334155", cursor: "pointer", fontWeight: 600 }}
                >
                  SEO & Backlinks
                </button>
                <button
                  type="button"
                  onClick={() => setRawKeywords(PRESETS.saas)}
                  style={{ fontSize: "12px", padding: "4px 10px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#334155", cursor: "pointer", fontWeight: 600 }}
                >
                  SaaS Software
                </button>
                <button
                  type="button"
                  onClick={() => setRawKeywords(PRESETS.ecommerce)}
                  style={{ fontSize: "12px", padding: "4px 10px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#334155", cursor: "pointer", fontWeight: 600 }}
                >
                  E-Commerce
                </button>
                <button
                  type="button"
                  onClick={() => setRawKeywords("")}
                  style={{ fontSize: "12px", padding: "4px 10px", backgroundColor: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "4px", color: "#991b1b", cursor: "pointer", fontWeight: 600 }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Keyword Textarea */}
            <textarea
              rows={8}
              value={rawKeywords}
              onChange={(e) => setRawKeywords(e.target.value)}
              placeholder="Enter search queries (one per line)..."
              style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", fontFamily: "Consolas, monospace", color: "#0f172a", boxSizing: "border-box", resize: "vertical", marginBottom: "16px" }}
            />

            {/* Clustering Settings Bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div>
                <label htmlFor="cluster-algorithm-select" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Clustering Sensitivity
                </label>
                <select
                  id="cluster-algorithm-select"
                  value={similarityLevel}
                  onChange={(e) => setSimilarityLevel(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", backgroundColor: "#ffffff" }}
                >
                  <option value="strict">Strict (Tighter Overlaps & Exact Intent)</option>
                  <option value="moderate">Moderate (Standard Pillar-Cluster Silos)</option>
                  <option value="broad">Broad (Wide Content Hub Overviews)</option>
                </select>
              </div>

              <div>
                <label htmlFor="search-intent-filter-select" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Filter by Search Intent
                </label>
                <select
                  id="search-intent-filter-select"
                  value={selectedIntentFilter}
                  onChange={(e) => setSelectedIntentFilter(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", backgroundColor: "#ffffff" }}
                >
                  <option value="all">All Intents ({stats.totalKeywords})</option>
                  <option value="informational">Informational ({stats.intentCounts.Informational || 0})</option>
                  <option value="commercial">Commercial ({stats.intentCounts.Commercial || 0})</option>
                  <option value="transactional">Transactional ({stats.intentCounts.Transactional || 0})</option>
                  <option value="navigational">Navigational ({stats.intentCounts.Navigational || 0})</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={filterStopWords}
                    onChange={(e) => setFilterStopWords(e.target.checked)}
                  />
                  <span>Ignore Grammatical Stop Words</span>
                </label>
              </div>
            </div>
          </div>

          {/* Search Intent Distribution Bar */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
              <i className="fa-solid fa-chart-pie" style={{ color: "#2563eb" }}></i> Search Intent Distribution
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
              <div style={{ backgroundColor: "#eff6ff", padding: "10px 14px", borderRadius: "4px", border: "1px solid #bfdbfe" }}>
                <div style={{ fontSize: "11px", color: "#1e40af", fontWeight: 700, textTransform: "uppercase" }}>Informational</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#1d4ed8" }}>{stats.intentCounts.Informational || 0}</div>
                <div style={{ fontSize: "11px", color: "#3b82f6" }}>Guides, &apos;How-to&apos;, Tips</div>
              </div>
              <div style={{ backgroundColor: "#fdf4ff", padding: "10px 14px", borderRadius: "4px", border: "1px solid #f5d0fe" }}>
                <div style={{ fontSize: "11px", color: "#86198f", fontWeight: 700, textTransform: "uppercase" }}>Commercial</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#a21caf" }}>{stats.intentCounts.Commercial || 0}</div>
                <div style={{ fontSize: "11px", color: "#c026d3" }}>Reviews, Comparisons, Best</div>
              </div>
              <div style={{ backgroundColor: "#f0fdf4", padding: "10px 14px", borderRadius: "4px", border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: "11px", color: "#166534", fontWeight: 700, textTransform: "uppercase" }}>Transactional</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#15803d" }}>{stats.intentCounts.Transactional || 0}</div>
                <div style={{ fontSize: "11px", color: "#16a34a" }}>Buy, Hire, Pricing, Services</div>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "10px 14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "11px", color: "#475569", fontWeight: 700, textTransform: "uppercase" }}>Navigational</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#334155" }}>{stats.intentCounts.Navigational || 0}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Brand, Login, Portal</div>
              </div>
            </div>
          </div>

          {/* Generated Clusters Grid */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-cubes-stacked" style={{ color: "#2563eb" }}></i> Content Clusters ({filteredClusters.length} Topic Hubs)
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Each cluster represents one high-ranking Pillar Page or Content Silo.
                </p>
              </div>

              {/* Quick Search */}
              <div style={{ position: "relative", minWidth: "240px" }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter clusters or keywords..."
                  style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", boxSizing: "border-box" }}
                />
                <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "10px", top: "10px", color: "#94a3b8", fontSize: "13px" }}></i>
              </div>
            </div>

            {/* Cluster Cards List */}
            {filteredClusters.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 16px", color: "#64748b" }}>
                <i className="fa-solid fa-inbox" style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "12px", display: "block" }}></i>
                No matching clusters found. Try entering keywords or adjusting your filters.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
                {filteredClusters.map((cluster, cIdx) => (
                  <div key={cluster.id} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", backgroundColor: "#f8fafc", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      {/* Cluster Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                        <div>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Topic Hub #{cIdx + 1}
                          </span>
                          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0 0", lineHeight: 1.3 }}>
                            {cluster.pillarName}
                          </h3>
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "4px",
                            backgroundColor:
                              cluster.intent === "Transactional" ? "#dcfce7" :
                              cluster.intent === "Commercial" ? "#f3e8ff" :
                              cluster.intent === "Informational" ? "#dbeafe" : "#f1f5f9",
                            color:
                              cluster.intent === "Transactional" ? "#166534" :
                              cluster.intent === "Commercial" ? "#6b21a8" :
                              cluster.intent === "Informational" ? "#1e40af" : "#334155",
                          }}
                        >
                          {cluster.intent}
                        </span>
                      </div>

                      {/* Primary Seed */}
                      <div style={{ backgroundColor: "#ffffff", padding: "8px 10px", borderRadius: "4px", border: "1px solid #e2e8f0", fontSize: "12px", marginBottom: "12px" }}>
                        <span style={{ color: "#64748b" }}>Primary Pillar Keyword: </span>
                        <strong style={{ color: "#2563eb" }}>{cluster.seedKeyword}</strong>
                      </div>

                      {/* Supporting Keyword Chips */}
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                        Sub-Keywords ({cluster.keywords.length}):
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px", maxHeight: "180px", overflowY: "auto" }}>
                        {cluster.keywords.map((kwItem, kIdx) => (
                          <span
                            key={kIdx}
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#ffffff",
                              border: "1px solid #cbd5e1",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              color: "#334155",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            {kwItem.keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>
                        {cluster.keywords.length} query variations
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const kwList = cluster.keywords.map(k => k.keyword).join("\n");
                          navigator.clipboard.writeText(kwList);
                          alert(`Copied ${cluster.keywords.length} keywords from this cluster!`);
                        }}
                        style={{ fontSize: "12px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                      >
                        <i className="fa-solid fa-copy"></i> Copy Cluster
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export & Content Brief Box */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-file-export" style={{ color: "#6366f1" }}></i> Export Clustered Architecture
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Export as Markdown Content Brief for writers, CSV spreadsheet for spreadsheets, or JSON for API integration.
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", backgroundColor: "#f1f5f9", padding: "3px", borderRadius: "4px" }}>
                  {[
                    { id: "markdown", label: "Markdown Brief" },
                    { id: "csv", label: "CSV Spreadsheet" },
                    { id: "json", label: "JSON Data" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setExportFormat(tab.id)}
                      style={{
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: exportFormat === tab.id ? "#0f172a" : "transparent",
                        color: exportFormat === tab.id ? "#ffffff" : "#475569",
                        fontWeight: exportFormat === tab.id ? 700 : 500,
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
                    backgroundColor: copied ? "#16a34a" : "#2563eb",
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
                  <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                  {copied ? "Copied!" : "Copy Output"}
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
                  <i className="fa-solid fa-download"></i> Download File
                </button>
              </div>
            </div>

            {/* Code Output preview */}
            <div style={{ backgroundColor: "#0f172a", borderRadius: "4px", padding: "16px", overflowX: "auto", maxHeight: "300px" }}>
              <pre style={{ margin: 0, fontFamily: "Consolas, Monaco, 'Courier New', monospace", fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                <code>{exportData}</code>
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* Guide & Strategy */}
      <section style={{ maxWidth: "1200px", margin: "48px auto", padding: "0 16px" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
            How to Build Authority with Topic Clusters and Pillar Content
          </h2>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, marginBottom: "20px" }}>
            Google algorithms rank websites based on <strong>Topical Authority</strong>. Instead of publishing disconnected articles, the Pillar-Cluster model connects a high-level pillar page to in-depth cluster pages with bidirectional internal links.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#2563eb", marginBottom: "8px" }}><i className="fa-solid fa-sitemap"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Zero Cannibalization</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Clustering ensures each page has a single primary focus keyword, stopping your own pages from competing against each other on Google SERPs.
              </p>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#10b981", marginBottom: "8px" }}><i className="fa-solid fa-bullseye"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Search Intent Precision</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Match transactional keywords with product or service landing pages and informational queries with guides and how-to articles.
              </p>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#f59e0b", marginBottom: "8px" }}><i className="fa-solid fa-link"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Internal Linking Flywheel</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Link cluster pages up to the pillar page, passing PageRank and establishing domain topical expertise across your niche.
              </p>
            </div>
          </div>

          {/* Related Tools */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>Explore More Free SEO Tools</h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/tools/keyword-density-checker" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                Keyword Density Checker →
              </Link>
              <Link href="/tools/seo-content-optimizer" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                SEO Content Optimizer →
              </Link>
              <Link href="/tools/serp-simulator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                Google SERP Simulator →
              </Link>
              <Link href="/tools/open-graph-meta-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                Open Graph Generator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 64px auto", padding: "0 16px" }}>
        <ToolFaqAccordion faqs={faqs} title="Frequently Asked Questions: Keyword Clustering" />
      </section>
    </div>
  );
}
