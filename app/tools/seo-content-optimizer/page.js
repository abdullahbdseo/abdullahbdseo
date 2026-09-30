"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function SeoContentOptimizer() {
  // Core Inputs
  const [focusKeyword, setFocusKeyword] = useState("technical seo audit");
  const [secondaryKeywords, setSecondaryKeywords] = useState("core web vitals, crawl budget, schema markup");
  const [seoTitle, setSeoTitle] = useState("Technical SEO Audit Checklist: 25 Critical Steps for 2026 Rankings");
  const [metaDesc, setMetaDesc] = useState("Perform a complete technical SEO audit for your website. Fix crawl errors, optimize Core Web Vitals, and scale your organic Google traffic with this actionable guide.");
  const [urlSlug, setUrlSlug] = useState("technical-seo-audit-checklist");
  
  const [contentBody, setContentBody] = useState(`<h1>Complete Technical SEO Audit Guide for 2026</h1>

<p>Executing a comprehensive technical seo audit is the foundational first step for any high-performing organic growth campaign. If search engine crawlers cannot efficiently discover, render, and index your web pages, your content strategy will struggle to achieve top-tier Google rankings.</p>

<h2>Why Every Business Needs a Technical SEO Audit</h2>
<p>Modern search algorithms prioritize user experience, fast server response times, and structured data hierarchy. A regular audit identifies toxic bottlenecks like broken 404 links, duplicate content tags, and unoptimized JavaScript bundles before they hurt your organic revenue.</p>

<h2>Key Focus Areas in a Technical Audit</h2>
<p>When conducting an in-depth audit, you must systematically inspect server response headers, XML sitemaps, robots.txt directives, and canonical tags. Ensure your Core Web Vitals pass Google's strict mobile thresholds (LCP under 2.5s and CLS under 0.1).</p>

<p><img src="/images/seo_hero_analytics_dashboard.jpg" alt="Technical SEO audit dashboard and performance report" /></p>

<h3>1. Crawlability & Indexation Architecture</h3>
<p>Inspect your Google Search Console coverage report. Ensure all non-canonical parameter URLs and faceted search filters are appropriately handled through noindex directives.</p>

<h3>2. Structured Data & Schema Markup</h3>
<p>Implement valid JSON-LD schema markup for Articles, FAQs, and Breadcrumbs to capture rich snippet real estate on search engine result pages. For more details, explore our <a href="/services/technical-seo-service-in-bangladesh">dedicated technical SEO services</a>.</p>

<h2>Conclusion: Scaling Your Search Visibility</h2>
<p>In summary, conducting a rigorous technical seo audit guarantees that your website remains resilient against core algorithm updates while delivering frictionless user experiences to prospective buyers.</p>`);

  const [activeTab, setActiveTab] = useState("analysis"); // analysis | preview | report
  const [copiedReport, setCopiedReport] = useState(false);

  // ─── Real-time Content Analysis Engine ──────────────────────────────────────
  const analysis = useMemo(() => {
    const kw = focusKeyword.trim().toLowerCase();
    const secKws = secondaryKeywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    
    // Clean text representations
    const cleanText = contentBody.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    // Sentence count
    const sentences = cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = Math.max(1, sentences.length);
    const avgWordsPerSentence = wordCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;

    // Paragraphs
    const paragraphs = contentBody.split(/<\/(?:p|div|section|article)>/i).map((p) => p.replace(/<[^>]*>/g, " ").trim()).filter(Boolean);
    const longParagraphs = paragraphs.filter((p) => p.split(/\s+/).length > 120);

    // Headings Extraction
    const h1Matches = contentBody.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = contentBody.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const h3Matches = contentBody.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
    
    const h1Texts = h1Matches.map((h) => h.replace(/<[^>]*>/g, "").toLowerCase());
    const h2h3Texts = [...h2Matches, ...h3Matches].map((h) => h.replace(/<[^>]*>/g, "").toLowerCase());

    // Images Extraction
    const imgMatches = contentBody.match(/<img[^>]+>/gi) || [];
    const imagesWithAlt = imgMatches.filter((img) => /alt=["'][^"']+["']/i.test(img));
    const imagesWithKwAlt = imgMatches.filter((img) => {
      const altMatch = img.match(/alt=["']([^"']+)["']/i);
      return altMatch && kw && altMatch[1].toLowerCase().includes(kw);
    });

    // Links Extraction
    const internalLinks = (contentBody.match(/href=["'](?:\/[^"']*|https?:\/\/(?:abdullahbdseo|example)[^"']*)["']/gi) || []).length;
    const externalLinks = (contentBody.match(/href=["']https?:\/\/(?!(?:abdullahbdseo|example))[^"']+["']/gi) || []).length;

    // Keyword Occurrences in Body
    let keywordCount = 0;
    if (kw && cleanText) {
      const escapedKw = kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedKw}\\b`, "gi");
      const matches = cleanText.match(regex);
      keywordCount = matches ? matches.length : 0;
    }

    const kwWords = kw ? kw.split(/\s+/).length : 1;
    const density = wordCount > 0 ? ((keywordCount * kwWords) / wordCount) * 100 : 0;

    // First & Last Paragraph Check
    const firstPara = paragraphs[0] ? paragraphs[0].toLowerCase() : "";
    const lastPara = paragraphs.length > 0 ? paragraphs[paragraphs.length - 1].toLowerCase() : "";
    const kwInFirstPara = kw ? firstPara.includes(kw) : false;
    const kwInLastPara = kw ? lastPara.includes(kw) : false;

    // Title & Meta & Slug checks
    const titleLower = seoTitle.toLowerCase();
    const descLower = metaDesc.toLowerCase();
    const slugLower = urlSlug.toLowerCase().replace(/[^a-z0-9-]/g, "");

    const kwInTitle = kw ? titleLower.includes(kw) : false;
    const kwAtTitleStart = kw ? titleLower.startsWith(kw) || titleLower.indexOf(kw) < 15 : false;
    const titleLength = seoTitle.length;
    const isTitleOptimal = titleLength >= 45 && titleLength <= 65;

    const kwInDesc = kw ? descLower.includes(kw) : false;
    const descLength = metaDesc.length;
    const isDescOptimal = descLength >= 120 && descLength <= 165;

    const slugCleanKw = kw.replace(/\s+/g, "-");
    const kwInSlug = slugCleanKw ? slugLower.includes(slugCleanKw) : false;

    // H1 Checks
    const hasSingleH1 = h1Matches.length === 1;
    const kwInH1 = kw && h1Texts.some((t) => t.includes(kw));
    const kwInSubheadings = kw && h2h3Texts.some((t) => t.includes(kw));

    // Secondary Keywords Presence
    const secondaryHits = secKws.map((sk) => ({
      kw: sk,
      found: cleanText.toLowerCase().includes(sk)
    }));

    // ─── Diagnostic Checks Calculation ───────────────────────────────────────
    const checks = [
      // 1. Focus Keyword in Title
      {
        id: "title_kw",
        category: "Basic SEO",
        title: "Focus Keyword in SEO Meta Title",
        passed: kwInTitle,
        type: kwInTitle ? "pass" : "critical",
        points: 8,
        desc: kwInTitle ? `Focus keyword "${focusKeyword}" is present in your title tag.` : `Add your exact focus keyword "${focusKeyword}" to the SEO Meta Title.`
      },
      // 2. Keyword at start of Title
      {
        id: "title_start",
        category: "Basic SEO",
        title: "Keyword placed near beginning of Title",
        passed: kwAtTitleStart,
        type: kwAtTitleStart ? "pass" : "warning",
        points: 4,
        desc: kwAtTitleStart ? "Focus keyword is prominently placed near the beginning of the title tag." : "Move your focus keyword closer to the beginning of the SEO title for higher CTR."
      },
      // 3. Title Length
      {
        id: "title_len",
        category: "Basic SEO",
        title: "Optimal Title Tag Length (45-65 chars)",
        passed: isTitleOptimal,
        type: isTitleOptimal ? "pass" : "warning",
        points: 4,
        desc: isTitleOptimal ? `Title is ${titleLength} characters (within the optimal 45-65 character range).` : `Title is currently ${titleLength} characters. Optimal is 45-65 characters to prevent SERP truncation.`
      },
      // 4. Focus Keyword in Meta Description
      {
        id: "desc_kw",
        category: "Basic SEO",
        title: "Focus Keyword in Meta Description",
        passed: kwInDesc,
        type: kwInDesc ? "pass" : "critical",
        points: 7,
        desc: kwInDesc ? "Focus keyword is included in the meta description." : `Add your focus keyword "${focusKeyword}" into the meta description to improve organic search CTR.`
      },
      // 5. Meta Description Length
      {
        id: "desc_len",
        category: "Basic SEO",
        title: "Optimal Meta Description Length (120-165 chars)",
        passed: isDescOptimal,
        type: isDescOptimal ? "pass" : "warning",
        points: 4,
        desc: isDescOptimal ? `Meta description is ${descLength} characters (Google optimal).` : `Current length: ${descLength} characters. Recommended length is 120-165 characters.`
      },
      // 6. Keyword in URL Slug
      {
        id: "slug_kw",
        category: "Basic SEO",
        title: "Focus Keyword in URL Slug / Permalink",
        passed: kwInSlug,
        type: kwInSlug ? "pass" : "critical",
        points: 6,
        desc: kwInSlug ? "URL permalink contains the exact focus keyword." : `Include your keyword slug (e.g. "${slugCleanKw}") in the URL.`
      },
      // 7. Exactly One H1 Tag
      {
        id: "single_h1",
        category: "Content Structure",
        title: "Single H1 Tag Structure",
        passed: hasSingleH1,
        type: hasSingleH1 ? "pass" : "critical",
        points: 6,
        desc: hasSingleH1 ? "Your content has exactly 1 main H1 tag." : `Found ${h1Matches.length} H1 tags. A page must have exactly ONE <h1> tag.`
      },
      // 8. Keyword in H1 Tag
      {
        id: "h1_kw",
        category: "Content Structure",
        title: "Focus Keyword in H1 Heading",
        passed: kwInH1,
        type: kwInH1 ? "pass" : "critical",
        points: 7,
        desc: kwInH1 ? "Focus keyword is present in the main H1 tag." : `Include your focus keyword "${focusKeyword}" inside your main H1 title.`
      },
      // 9. Keyword in H2/H3 Subheadings
      {
        id: "h2_kw",
        category: "Content Structure",
        title: "Focus Keyword in H2/H3 Subheadings",
        passed: kwInSubheadings,
        type: kwInSubheadings ? "pass" : "warning",
        points: 6,
        desc: kwInSubheadings ? "Focus keyword or variations found in H2/H3 subheadings." : `Use your keyword "${focusKeyword}" in at least one <h2> or <h3> subheading.`
      },
      // 10. Keyword in First Paragraph
      {
        id: "first_para",
        category: "Keyword Optimization",
        title: "Keyword in First 10% / Intro Paragraph",
        passed: kwInFirstPara,
        type: kwInFirstPara ? "pass" : "critical",
        points: 7,
        desc: kwInFirstPara ? "Focus keyword appears early in the introductory paragraph." : `Mention your focus keyword "${focusKeyword}" in the first 100 words of your article.`
      },
      // 11. Keyword in Conclusion
      {
        id: "last_para",
        category: "Keyword Optimization",
        title: "Keyword in Conclusion / Final Paragraph",
        passed: kwInLastPara,
        type: kwInLastPara ? "pass" : "warning",
        points: 4,
        desc: kwInLastPara ? "Focus keyword is reinforced in the concluding paragraph." : `Include your focus keyword in the final summary/conclusion paragraph.`
      },
      // 12. Keyword Density
      {
        id: "kw_density",
        category: "Keyword Optimization",
        title: "Optimal Keyword Density (0.6% - 2.5%)",
        passed: density >= 0.6 && density <= 2.5,
        type: density >= 0.6 && density <= 2.5 ? "pass" : density > 2.5 ? "critical" : "warning",
        points: 7,
        desc: density >= 0.6 && density <= 2.5
          ? `Density is ${density.toFixed(2)}% (${keywordCount} occurrences) — perfectly balanced.`
          : density > 2.5
          ? `Density is ${density.toFixed(2)}% (${keywordCount} times). High risk of Google keyword stuffing penalty! Reduce usage.`
          : `Density is ${density.toFixed(2)}% (${keywordCount} times). Low keyword prominence. Add 1-2 more natural mentions.`
      },
      // 13. Word Count Depth
      {
        id: "word_count",
        category: "Content Quality",
        title: "Content Length & Depth (600+ words)",
        passed: wordCount >= 600,
        type: wordCount >= 600 ? "pass" : wordCount < 300 ? "critical" : "warning",
        points: 8,
        desc: wordCount >= 1000
          ? `Comprehensive depth: ${wordCount} words (Ideal for ranking high on competitive queries).`
          : wordCount >= 600
          ? `Good length: ${wordCount} words.`
          : `Thin content: ${wordCount} words. Google prefers 800+ words for informational topics.`
      },
      // 14. Paragraph Length & Readability
      {
        id: "para_len",
        category: "Readability",
        title: "Bite-Sized Paragraphs (< 120 words)",
        passed: longParagraphs.length === 0,
        type: longParagraphs.length === 0 ? "pass" : "warning",
        points: 4,
        desc: longParagraphs.length === 0 ? "All paragraphs are easy to skim on mobile devices." : `Found ${longParagraphs.length} long paragraph(s). Break them down into 2-3 sentence chunks.`
      },
      // 15. Sentence Complexity
      {
        id: "sentence_len",
        category: "Readability",
        title: "Concise Sentences (< 22 words avg)",
        passed: avgWordsPerSentence <= 22,
        type: avgWordsPerSentence <= 22 ? "pass" : "warning",
        points: 4,
        desc: avgWordsPerSentence <= 22 ? `Average sentence length: ${avgWordsPerSentence} words (Excellent flow).` : `Average sentence length: ${avgWordsPerSentence} words. Shorten sentences to boost readability.`
      },
      // 16. Internal Links
      {
        id: "int_links",
        category: "Link Equity",
        title: "Internal Link Integration",
        passed: internalLinks > 0,
        type: internalLinks > 0 ? "pass" : "warning",
        points: 4,
        desc: internalLinks > 0 ? `Found ${internalLinks} internal link(s) to distribute link equity.` : "Add at least 1 internal link to your related services or articles."
      },
      // 17. External Authority Links
      {
        id: "ext_links",
        category: "Link Equity",
        title: "External Authority Links",
        passed: externalLinks > 0,
        type: externalLinks > 0 ? "pass" : "warning",
        points: 3,
        desc: externalLinks > 0 ? `Found ${externalLinks} external reference link(s).` : "Add an outbound link to an authoritative source or research study to reinforce trust."
      },
      // 18. Image Count & ALT Tags
      {
        id: "img_alt",
        category: "Media SEO",
        title: "Images with Keyword in ALT Text",
        passed: imagesWithKwAlt.length > 0 || imgMatches.length > 0,
        type: imagesWithKwAlt.length > 0 ? "pass" : imgMatches.length > 0 ? "warning" : "warning",
        points: 4,
        desc: imagesWithKwAlt.length > 0
          ? `Found ${imgMatches.length} image(s), including ${imagesWithKwAlt.length} with focus keyword in ALT text.`
          : imgMatches.length > 0
          ? `Found ${imgMatches.length} image(s), but none contain the focus keyword in their alt tag.`
          : "Add at least one relevant diagram, infographic, or screenshot with keyword in the ALT tag."
      }
    ];

    // Calculate Overall Score (0-100)
    const earnedPoints = checks.filter((c) => c.passed).reduce((acc, c) => acc + c.points, 0);
    const totalPossiblePoints = checks.reduce((acc, c) => acc + c.points, 0);
    const score = Math.min(100, Math.round((earnedPoints / totalPossiblePoints) * 100));

    const criticalErrors = checks.filter((c) => !c.passed && c.type === "critical");
    const warnings = checks.filter((c) => !c.passed && c.type === "warning");
    const passedChecks = checks.filter((c) => c.passed);

    return {
      wordCount,
      keywordCount,
      density: density.toFixed(2),
      avgWordsPerSentence,
      score,
      criticalErrors,
      warnings,
      passedChecks,
      checks,
      secondaryHits
    };
  }, [focusKeyword, secondaryKeywords, seoTitle, metaDesc, urlSlug, contentBody]);

  const getScoreColor = (sc) => {
    if (sc >= 80) return "#10b981"; // Green
    if (sc >= 55) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const getScoreLabel = (sc) => {
    if (sc >= 80) return "Rank-Ready (Excellent)";
    if (sc >= 55) return "Moderate (Needs Optimization)";
    return "Poor (Not SEO-Friendly)";
  };

  // 1-Click Sample Previews
  const loadDemo = (type) => {
    if (type === "perfect") {
      setFocusKeyword("technical seo audit");
      setSecondaryKeywords("core web vitals, crawl budget, schema markup");
      setSeoTitle("Technical SEO Audit Checklist: 25 Critical Steps for 2026 Rankings");
      setMetaDesc("Perform a complete technical SEO audit for your website. Fix crawl errors, optimize Core Web Vitals, and scale your organic Google traffic with this actionable guide.");
      setUrlSlug("technical-seo-audit-checklist");
      setContentBody(`<h1>Complete Technical SEO Audit Guide for 2026</h1>

<p>Executing a comprehensive technical seo audit is the foundational first step for any high-performing organic growth campaign. If search engine crawlers cannot efficiently discover, render, and index your web pages, your content strategy will struggle to achieve top-tier Google rankings.</p>

<h2>Why Every Business Needs a Technical SEO Audit</h2>
<p>Modern search algorithms prioritize user experience, fast server response times, and structured data hierarchy. A regular audit identifies toxic bottlenecks like broken 404 links, duplicate content tags, and unoptimized JavaScript bundles before they hurt your organic revenue.</p>

<h2>Key Focus Areas in a Technical Audit</h2>
<p>When conducting an in-depth audit, you must systematically inspect server response headers, XML sitemaps, robots.txt directives, and canonical tags. Ensure your Core Web Vitals pass Google's strict mobile thresholds (LCP under 2.5s and CLS under 0.1).</p>

<p><img src="/images/seo_hero_analytics_dashboard.jpg" alt="Technical SEO audit dashboard and performance report" /></p>

<h3>1. Crawlability & Indexation Architecture</h3>
<p>Inspect your Google Search Console coverage report. Ensure all non-canonical parameter URLs and faceted search filters are appropriately handled through noindex directives.</p>

<h3>2. Structured Data & Schema Markup</h3>
<p>Implement valid JSON-LD schema markup for Articles, FAQs, and Breadcrumbs to capture rich snippet real estate on search engine result pages. For more details, explore our <a href="/services/technical-seo-service-in-bangladesh">dedicated technical SEO services</a>.</p>

<h2>Conclusion: Scaling Your Search Visibility</h2>
<p>In summary, conducting a rigorous technical seo audit guarantees that your website remains resilient against core algorithm updates while delivering frictionless user experiences to prospective buyers.</p>`);
    } else if (type === "poor") {
      setFocusKeyword("best coffee maker");
      setSecondaryKeywords("espresso, coffee beans");
      setSeoTitle("My Personal Review of Kitchen Gadgets");
      setMetaDesc("I love drinking coffee in the morning and here is my review.");
      setUrlSlug("random-review-post");
      setContentBody(`<h1>Kitchen Appliances I Bought Recently</h1>
<p>I bought a lot of items last week. They work pretty well in my kitchen. You can prepare hot drinks quickly.</p>
<p>The build quality is made of plastic and steel. It was shipped within two days from the warehouse.</p>`);
    }
  };

  const copyFullReport = () => {
    const reportText = `On-Page SEO Content Audit Report
Focus Keyword: ${focusKeyword}
SEO Score: ${analysis.score}/100 (${getScoreLabel(analysis.score)})
Word Count: ${analysis.wordCount} words | Keyword Density: ${analysis.density}% (${analysis.keywordCount} times)

CRITICAL MISTAKES (${analysis.criticalErrors.length}):
${analysis.criticalErrors.map((c, i) => `${i + 1}. [${c.category}] ${c.title}: ${c.desc}`).join("\n")}

RECOMMENDED IMPROVEMENTS (${analysis.warnings.length}):
${analysis.warnings.map((c, i) => `${i + 1}. [${c.category}] ${c.title}: ${c.desc}`).join("\n")}

PASSED CHECKS (${analysis.passedChecks.length}):
${analysis.passedChecks.map((c, i) => `✓ ${c.title}`).join("\n")}

Audited with Abdullah Saleh SEO Tools (https://abdullahbdseo.com/tools/seo-content-optimizer)`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const faqs = [
    {
      q: "What is On-Page SEO Content Optimization?",
      a: "On-page SEO content optimization is the practice of aligning written text, HTML structure, headings (H1-H3), keyword frequency, URL slug, and meta tags with Google's search algorithms and user search intent to achieve #1 rankings."
    },
    {
      q: "What is the ideal keyword density in 2026?",
      a: "The recommended keyword density is between 0.8% and 2.0%. Anything above 2.5% triggers Google's algorithmic keyword stuffing filter, while under 0.5% may fail to signal strong topical relevance."
    },
    {
      q: "Why is keyword placement in the first paragraph important?",
      a: "Google crawlers and human readers prioritize the beginning of a document. Having your primary keyword within the first 100 words immediately establishes content context and reduces bounce rates."
    },
    {
      q: "How many H1 tags should a blog post have?",
      a: "A webpage should have exactly ONE <h1> tag representing the core topic of the page. Sub-points should be structured hierarchically using <h2>, <h3>, and <h4> tags."
    }
  ];

  return (
    <div className="tool-single-page">
      {/* ════ HEADER ════ */}
      <section className="page-header-section" style={{ padding: "48px 0 28px", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontWeight: 700, fontSize: "0.83rem", textDecoration: "none", marginBottom: "12px" }}>
            <i className="fa-solid fa-arrow-left"></i> All Free SEO Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ede9fe", color: "#7c3aed", padding: "5px 14px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 auto 12px" }}>
            <i className="fa-solid fa-file-circle-check"></i> Real-Time Content Grader
          </div>
          <h1 style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            On-Page SEO Content Optimizer &amp; Live Grader
          </h1>
          <p style={{ fontSize: "1.02rem", color: "#64748b", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
            Scan your articles for 20+ on-page SEO ranking factors in real-time. Check focus keyword placement in Title, Meta, Slug, H1-H3 headings, density, and readability with instant actionable fix suggestions.
          </p>
        </div>
      </section>

      {/* ════ MAIN WORKSPACE ════ */}
      <section style={{ paddingTop: "28px", paddingBottom: "70px" }}>
        <div className="container" style={{ maxWidth: "1260px" }}>

          {/* Quick Demos bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#64748b" }}>
              <span style={{ fontWeight: 700 }}>Quick Test Demos:</span>
              <button
                onClick={() => loadDemo("perfect")}
                style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", borderRadius: "4px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
              >
                ★ Load 95+ Score Article (Optimized)
              </button>
              <button
                onClick={() => loadDemo("poor")}
                style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", borderRadius: "4px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
              >
                ⚠ Load Low Score Article (Needs Fixes)
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={copyFullReport}
                style={{ background: copiedReport ? "#059669" : "#2563eb", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 14px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
              >
                {copiedReport ? "✓ Report Copied!" : "📋 Copy Audit Report"}
              </button>
              <button
                onClick={() => window.print()}
                style={{ background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "6px 12px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
              >
                <i className="fa-solid fa-print"></i> Print
              </button>
            </div>
          </div>

          {/* ════ 2-COLUMN LAYOUT: LEFT EDITOR, RIGHT AUDIT SCORECARD ════ */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "24px", alignItems: "flex-start" }}>

            {/* ────── LEFT COLUMN: CONTENT & META INPUTS ────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* 1. Target Keywords Box */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-bullseye" style={{ color: "#2563eb" }}></i> Target Focus Keywords
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Primary Focus Keyword <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. technical seo audit"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem", outline: "none", fontWeight: 600 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Secondary Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={secondaryKeywords}
                      onChange={(e) => setSecondaryKeywords(e.target.value)}
                      placeholder="e.g. core web vitals, schema"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.88rem" }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. SEO Snippet & Meta Tags Box */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-magnifying-glass" style={{ color: "#2563eb" }}></i> SERP Snippet &amp; Meta Directives
                </h3>

                {/* SEO Title */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>SEO Meta Title</label>
                    <span style={{ fontSize: "0.74rem", fontWeight: 700, color: seoTitle.length >= 45 && seoTitle.length <= 65 ? "#10b981" : "#d97706" }}>
                      {seoTitle.length} / 65 Chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    style={{ width: "100%", padding: "8px 11px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem" }}
                  />
                </div>

                {/* Meta Description */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>Meta Description</label>
                    <span style={{ fontSize: "0.74rem", fontWeight: 700, color: metaDesc.length >= 120 && metaDesc.length <= 165 ? "#10b981" : "#d97706" }}>
                      {metaDesc.length} / 165 Chars
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    style={{ width: "100%", padding: "8px 11px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", resize: "vertical" }}
                  />
                </div>

                {/* URL Slug */}
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>URL Slug / Permalink</label>
                  <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "0 10px" }}>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>https://abdullahbdseo.com/</span>
                    <input
                      type="text"
                      value={urlSlug}
                      onChange={(e) => setUrlSlug(e.target.value)}
                      style={{ border: "none", background: "transparent", padding: "8px 4px", fontSize: "0.85rem", outline: "none", flex: 1, fontWeight: 600 }}
                    />
                  </div>
                </div>

                {/* Google Snippet Simulation */}
                <div style={{ marginTop: "16px", padding: "12px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Google Search Preview</span>
                  <div style={{ fontSize: "0.75rem", color: "#202124", display: "flex", alignItems: "center", gap: "6px" }}>
                    <img src="/images/favicon.svg" alt="icon" style={{ width: "12px", height: "12px" }} />
                    <span>https://abdullahbdseo.com › {urlSlug}</span>
                  </div>
                  <div style={{ fontSize: "1rem", color: "#1a0dab", fontWeight: 600, lineHeight: 1.3, margin: "3px 0 2px" }}>
                    {seoTitle || "Your Page Title"}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#4d5156", lineHeight: 1.4 }}>
                    {metaDesc || "Your meta description preview..."}
                  </div>
                </div>
              </div>

              {/* 3. Main Content Editor Box */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-pen-nib" style={{ color: "#2563eb" }}></i> Article Content Body (HTML / Text)
                  </h3>
                  <div style={{ display: "flex", gap: "12px", fontSize: "0.78rem", color: "#64748b" }}>
                    <span><strong>{analysis.wordCount}</strong> Words</span>
                    <span><strong>{analysis.keywordCount}</strong> Kw mentions ({analysis.density}%)</span>
                  </div>
                </div>

                {/* Quick HTML Insertion tags */}
                <div style={{ display: "flex", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
                  {[
                    { label: "H1", code: "<h1>Main Title</h1>\n" },
                    { label: "H2", code: "<h2>Subheading Topic</h2>\n" },
                    { label: "H3", code: "<h3>Sub-section Detail</h3>\n" },
                    { label: "P", code: "<p>Write your paragraph text here...</p>\n" },
                    { label: "Link", code: '<a href="/services/technical-seo-service-in-bangladesh">anchor text</a>' },
                    { label: "Image", code: '<img src="/images/seo_hero_analytics_dashboard.jpg" alt="descriptive focus keyword alt text" />\n' },
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => setContentBody((prev) => prev + "\n" + btn.code)}
                      style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "3px 8px", fontSize: "0.74rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}
                    >
                      +{btn.label}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={14}
                  value={contentBody}
                  onChange={(e) => setContentBody(e.target.value)}
                  placeholder="Paste or write your full article content here with HTML headings (<h1>, <h2>, <p>, <img>, <a>)..."
                  style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.85rem", outline: "none", resize: "vertical", fontFamily: "monospace", lineHeight: 1.6 }}
                />
              </div>

            </div>

            {/* ────── RIGHT COLUMN: LIVE SEO SCORE & DIAGNOSTIC GRADES ────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "80px" }}>

              {/* 1. Master SEO Score Card */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Overall SEO Grade</span>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {getScoreLabel(analysis.score)}
                    </h2>
                  </div>

                  {/* Circular / Badge Score */}
                  <div style={{ width: "68px", height: "68px", borderRadius: "4px", background: getScoreColor(analysis.score), color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 900, boxShadow: `0 4px 12px ${getScoreColor(analysis.score)}40` }}>
                    <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{analysis.score}</span>
                    <span style={{ fontSize: "0.62rem", textTransform: "uppercase", opacity: 0.9 }}>/100</span>
                  </div>
                </div>

                {/* Metric Bars */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", textAlign: "center", padding: "12px", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, display: "block" }}>Words</span>
                    <strong style={{ fontSize: "1.1rem", color: analysis.wordCount >= 600 ? "#10b981" : "#ef4444" }}>{analysis.wordCount}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, display: "block" }}>Density</span>
                    <strong style={{ fontSize: "1.1rem", color: analysis.density >= 0.6 && analysis.density <= 2.5 ? "#10b981" : "#ef4444" }}>{analysis.density}%</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, display: "block" }}>Kw Count</span>
                    <strong style={{ fontSize: "1.1rem", color: analysis.keywordCount > 0 ? "#10b981" : "#ef4444" }}>{analysis.keywordCount}x</strong>
                  </div>
                </div>

                {/* Score breakdown counters */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px", fontSize: "0.78rem", fontWeight: 700 }}>
                  <span style={{ color: "#ef4444" }}>
                    🔴 {analysis.criticalErrors.length} Critical Issues
                  </span>
                  <span style={{ color: "#d97706" }}>
                    🟡 {analysis.warnings.length} Warnings
                  </span>
                  <span style={{ color: "#10b981" }}>
                    🟢 {analysis.passedChecks.length} Passed
                  </span>
                </div>
              </div>

              {/* 2. Diagnostic Action List */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <i className="fa-solid fa-list-check" style={{ color: "#2563eb" }}></i> Actionable Checklist &amp; Error Diagnosis
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "540px", overflowY: "auto", paddingRight: "4px" }}>
                  
                  {/* Critical Errors */}
                  {analysis.criticalErrors.map((c) => (
                    <div key={c.id} style={{ padding: "10px 12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <i className="fa-solid fa-circle-xmark" style={{ color: "#dc2626", fontSize: "0.9rem" }}></i>
                        <strong style={{ fontSize: "0.82rem", color: "#991b1b" }}>{c.title}</strong>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#7f1d1d", margin: 0, lineHeight: 1.4 }}>
                        {c.desc}
                      </p>
                    </div>
                  ))}

                  {/* Warnings */}
                  {analysis.warnings.map((c) => (
                    <div key={c.id} style={{ padding: "10px 12px", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: "#d97706", fontSize: "0.9rem" }}></i>
                        <strong style={{ fontSize: "0.82rem", color: "#92400e" }}>{c.title}</strong>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#78350f", margin: 0, lineHeight: 1.4 }}>
                        {c.desc}
                      </p>
                    </div>
                  ))}

                  {/* Passed Checks */}
                  {analysis.passedChecks.map((c) => (
                    <div key={c.id} style={{ padding: "8px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="fa-solid fa-circle-check" style={{ color: "#16a34a", fontSize: "0.85rem" }}></i>
                        <strong style={{ fontSize: "0.8rem", color: "#166534" }}>{c.title}</strong>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* 3. Secondary Keywords Tracker */}
              {analysis.secondaryHits.length > 0 && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
                    Secondary Keywords Coverage:
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {analysis.secondaryHits.map((sh, idx) => (
                      <span
                        key={idx}
                        style={{ fontSize: "0.75rem", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, background: sh.found ? "#ecfdf5" : "#f1f5f9", color: sh.found ? "#059669" : "#64748b", border: `1px solid ${sh.found ? "#a7f3d0" : "#cbd5e1"}` }}
                      >
                        {sh.found ? "✓" : "×"} {sh.kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Hire Expert CTA */}
              <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "4px", padding: "18px 20px", color: "#ffffff", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.2)" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
                  Need Professional On-Page Optimization?
                </h4>
                <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "0 0 12px", lineHeight: 1.4 }}>
                  Let Abdullah Saleh optimize your content with NLP entity clustering, schema markup, and high-converting CTAs.
                </p>
                <Link
                  href="/services/on-page-seo-optimization"
                  style={{ display: "inline-block", width: "100%", textAlign: "center", background: "#2563eb", color: "#fff", padding: "8px 12px", borderRadius: "4px", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}
                >
                  Explore On-Page SEO Services &rarr;
                </Link>
              </div>

            </div>

          </div>

          {/* ════ SEO CONTENT BEST PRACTICES GUIDE ════ */}
          <div style={{ marginTop: "40px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "28px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              2026 On-Page SEO Content Checklist Guidelines
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
              <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: "0.92rem", color: "#2563eb" }}>1. Search Intent &amp; Structure</h4>
                <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0, lineHeight: 1.5 }}>
                  Always match search intent (informational, commercial, transactional). Structure your content logically with a single H1 and sequential H2-H3 subheadings.
                </p>
              </div>

              <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: "0.92rem", color: "#059669" }}>2. Keyword Density (0.8% - 2%)</h4>
                <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0, lineHeight: 1.5 }}>
                  Avoid old-school keyword stuffing. Use your primary phrase naturally in the title, URL, intro, and conclusion, and enrich with semantic LSI synonyms.
                </p>
              </div>

              <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: "0.92rem", color: "#7c3aed" }}>3. E-E-A-T &amp; Internal Linking</h4>
                <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0, lineHeight: 1.5 }}>
                  Demonstrate experience and authority. Link out to authoritative research studies and connect 2-3 contextual internal links to related topic clusters.
                </p>
              </div>
            </div>
          </div>

          {/* ════ FAQ ACCORDION ════ */}
          <div style={{ marginTop: "40px" }}>
            <ToolFaqAccordion faqs={faqs} />
          </div>

        </div>
      </section>
    </div>
  );
}
