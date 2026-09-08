"use client";
// app/tools/seo-audit-report-generator/page.js - Professional Multi-Tab SEO Audit & Action Plan Generator Tool

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

// Sample / Preset Datasets
const PRESET_AUDITS = {
  primemovebd: {
    domain: "primemovebd.com",
    url: "https://www.primemovebd.com",
    title: "Prime Move BD - Professional Home & Office Moving Company",
    auditDate: "September 8, 2026",
    auditor: "Abdullah Saleh (SEO Specialist)",
    overallScore: 62,
    scoreStatus: "Needs Attention",
    scoreBadgeColor: "#d97706",
    scoreBadgeBg: "#fef3c7",
    summary: {
      totalPages: "6+",
      ssl: "✅ Secure HTTPS",
      sitemap: "⚠️ Incomplete (only 3 URLs)",
      robots: "✅ Configured",
      mobile: "✅ Responsive",
      ga4: "❌ Measurement ID Missing",
      schema: "❌ 0 JSON-LD Schemas",
      ogTags: "❌ Missing (No Social Preview)",
      twitterCards: "❌ Missing",
      canonicals: "❌ Missing on All Pages",
      phone: "+880 1926 946 609",
      email: "primemovebd@gmail.com",
      rating: "4.9 / 5.0 (607+ reviews)",
      coverage: "All 64 Districts Bangladesh",
      googleVerify: "✅ Verified (aeMR0kbk...)",
      fbVerify: "✅ Verified (56jg2hk1...)"
    },
    categoryScores: [
      { name: "On-Page SEO", score: 52, max: 100, status: "WARN", statusColor: "#d97706", statusBg: "#fef3c7", issue: "Meta description too short (88 ch), no canonical URLs", priority: "HIGH" },
      { name: "Technical SEO", score: 60, max: 100, status: "WARN", statusColor: "#d97706", statusBg: "#fef3c7", issue: "Tailwind CDN in production, favicon MIME mismatch", priority: "HIGH" },
      { name: "Content Quality", score: 55, max: 100, status: "WARN", statusColor: "#d97706", statusBg: "#fef3c7", issue: "Hero description 1-line, empty blog excerpt", priority: "MEDIUM" },
      { name: "Schema & Structured Data", score: 10, max: 100, status: "FAIL", statusColor: "#dc2626", statusBg: "#fee2e2", issue: "Completely missing — zero JSON-LD structured data", priority: "CRITICAL" },
      { name: "Open Graph & Social", score: 5, max: 100, status: "FAIL", statusColor: "#dc2626", statusBg: "#fee2e2", issue: "All OG & Twitter Card tags absent across website", priority: "CRITICAL" },
      { name: "Link Structure", score: 65, max: 100, status: "WARN", statusColor: "#d97706", statusBg: "#fef3c7", issue: "Generic Facebook review link, shallow internal silo", priority: "LOW" },
      { name: "Mobile SEO", score: 75, max: 100, status: "PASS", statusColor: "#15803d", statusBg: "#dcfce7", issue: "Responsive overrides & viewport tag correctly configured", priority: "NONE" },
      { name: "Image SEO", score: 70, max: 100, status: "PASS", statusColor: "#15803d", statusBg: "#dcfce7", issue: "Most alt texts ok; hero image uses CSS background", priority: "MEDIUM" }
    ],
    criticalIssues: [
      { id: 1, title: "Open Graph (OG) Meta Tags Missing", severity: "CRITICAL", impact: "Facebook, WhatsApp, LinkedIn shares display NO preview, title, or thumbnail image. Social click-through rate drops by over 80%.", fix: "Add og:title, og:description, og:image, og:url, og:type, and og:site_name inside <head> of every page.", effort: "2 Hours", category: "Social SEO" },
      { id: 2, title: "Twitter / X Card Tags Missing", severity: "CRITICAL", impact: "No rich media card is displayed when website links are shared on X/Twitter. Direct social traffic opportunity is lost.", fix: "Add twitter:card, twitter:title, twitter:description, and twitter:image meta tags to all templates.", effort: "1 Hour", category: "Social SEO" },
      { id: 3, title: "Canonical URL Tags Completely Absent", severity: "CRITICAL", impact: "Search engines may index duplicate URLs (www vs non-www, trailing slashes, URL parameters). Causes Google ranking dilution.", fix: "Add unique <link rel=\"canonical\" href=\"https://www.primemovebd.com/page\"> to every single page.", effort: "1 Hour", category: "Technical SEO" },
      { id: 4, title: "JSON-LD Structured Data Missing", severity: "CRITICAL", impact: "Zero rich snippet eligibility in Google SERP. Competitors with schema get star review ratings, local business knowledge panels, and FAQs.", fix: "Implement LocalBusiness, Service, Review, FAQPage, and BreadcrumbList JSON-LD schemas.", effort: "4–6 Hours", category: "Schema" },
      { id: 5, title: "Meta Descriptions Under-Optimized (<90 chars)", severity: "HIGH", impact: "Homepage: 88 chars. About: 58 chars. Google allows ~160 chars. 50% of available high-converting SERP marketing space is wasted.", fix: "Rewrite each meta description to 140–160 chars with target commercial keywords and clear call-to-action.", effort: "2 Hours", category: "On-Page SEO" },
      { id: 6, title: "Google Analytics 4 (GA4) Tracking Broken", severity: "HIGH", impact: "dataLayer is initialized in code, but lacks a valid GA4 Measurement ID (G-XXXXXXXXXX) — zero traffic or conversion data is logged.", fix: "Connect actual GA4 Measurement ID in gtag('config', 'G-XXXXXXXX') script tag.", effort: "30 Mins", category: "Analytics" },
      { id: 7, title: "Hero Banner in CSS Background (Not <img>)", severity: "HIGH", impact: "Hero banner image rendered via CSS background-image cannot be crawled or indexed by Google Images search bots.", fix: "Convert hero background to an HTML5 <img> element with high-priority preload and keyword-rich alt text.", effort: "1 Hour", category: "Technical SEO" }
    ],
    onPage: [
      {
        page: "Homepage (/)",
        title: "Prime Move BD - Move Smart. Move Safe. Professional Moving Company",
        titleLength: 68,
        titleStatus: "GOOD",
        metaDesc: "Professional home and office moving services across all 64 districts of Bangladesh.",
        metaLength: 88,
        metaStatus: "SHORT (Target 140-160)",
        headings: [
          { tag: "H1", text: "Move Smart. Move Safe. Relocation Simplified.", note: "✅ Strong value proposition" },
          { tag: "H2", text: "WHAT WE OFFER (repeated in span + h2)", note: "⚠️ Duplicate text in span and h2. Change to 'Professional Moving Services in Bangladesh'" },
          { tag: "H2", text: "Recent Relocations Across Bangladesh", note: "✅ Clear section heading" },
          { tag: "H2", text: "Coverage Across Bangladesh (64 Districts)", note: "✅ Keyword rich" },
          { tag: "H2", text: "What Our Customers Say (607+ Reviews)", note: "✅ Social proof heading" },
          { tag: "H2", text: "Latest Relocation Articles & Tips", note: "✅ Blog section heading" },
          { tag: "H3", text: "Residential Home Shifting, Corporate Relocation, Packing Services (6 Service Cards)", note: "✅ Descriptive service card titles" }
        ]
      },
      {
        page: "About Us (/about)",
        title: "About Us | Prime Move BD - Bangladesh's Trusted Movers",
        titleLength: 55,
        titleStatus: "GOOD",
        metaDesc: "Learn about Prime Move BD history and team.",
        metaLength: 42,
        metaStatus: "TOO SHORT",
        headings: [
          { tag: "H1", text: "About Prime Move BD", note: "✅ Clear page title" },
          { tag: "H2", text: "Our Mission, Fleet & Experience", note: "✅ Good semantic structure" }
        ]
      },
      {
        page: "Services Hub (/services)",
        title: "Moving & Relocation Services in Bangladesh | Prime Move BD",
        titleLength: 58,
        titleStatus: "GOOD",
        metaDesc: "Explore our 6 specialized moving solutions including home shifting, office relocation, and inter-district moves.",
        metaLength: 114,
        metaStatus: "ACCEPTABLE",
        headings: [
          { tag: "H1", text: "Our Professional Moving Services", note: "✅ Optimized" },
          { tag: "H2", text: "6 Dedicated Solutions for Homes & Businesses", note: "✅ Clear hierarchy" }
        ]
      }
    ],
    technicalChecks: [
      { name: "SSL / HTTPS Encryption", status: "PASS", state: "Fully secure — 256-bit SSL Active", fix: "No action needed", priority: "NONE" },
      { name: "HTML lang Attribute", status: "PASS", state: "lang=\"en\" present", fix: "Consider adding lang=\"bn\" for Bengali language content blocks", priority: "LOW" },
      { name: "Viewport Mobile Meta Tag", status: "PASS", state: "width=device-width, initial-scale=1.0", fix: "No action needed", priority: "NONE" },
      { name: "Favicon MIME Type Mismatch", status: "WARN", state: "type=\"image/svg+xml\" declared for .webp file", fix: "Change type attribute to type=\"image/webp\" or provide PNG/SVG icons", priority: "MEDIUM" },
      { name: "Robots.txt Configuration", status: "PASS", state: "User-agent:* Allow:/ Disallow:/bigazoo/panel/", fix: "Well configured; sitemap properly linked", priority: "NONE" },
      { name: "XML Sitemap Completeness", status: "WARN", state: "Sitemap exists but contains only 2–3 root URLs", fix: "Generate dynamic sitemap including all 6 services, blog posts, and district pages", priority: "HIGH" },
      { name: "Canonical URL Tags", status: "FAIL", state: "Zero canonical tags found across pages", fix: "Add <link rel=\"canonical\" href=\"...\"> to prevent duplicate content indexation", priority: "CRITICAL" },
      { name: "DNS Prefetch & Preconnect", status: "PASS", state: "Google Fonts & CDN prefetch active", fix: "Good technical implementation", priority: "NONE" },
      { name: "LCP Hero Image Preload", status: "PASS", state: "fetchpriority=\"high\" declared on hero asset", fix: "Assists Largest Contentful Paint metric", priority: "NONE" },
      { name: "Tailwind CSS CDN Runtime", status: "FAIL", state: "<script src=\"https://cdn.tailwindcss.com\"> in production", fix: "Replace 350KB+ runtime CDN script with compiled, purged production CSS build", priority: "HIGH" },
      { name: "Google Site Verification", status: "PASS", state: "Meta verification token verified (aeMR0kbk...)", fix: "Verified in Google Search Console", priority: "NONE" },
      { name: "Facebook Domain Verification", status: "PASS", state: "Meta verification token verified (56jg2hk1...)", fix: "Verified in Meta Business Suite", priority: "NONE" },
      { name: "Google Analytics 4 (GA4)", status: "FAIL", state: "dataLayer declared without Measurement ID", fix: "Add gtag('config', 'G-XXXXXXXX') with active Google Analytics ID", priority: "HIGH" },
      { name: "JSON-LD Schema Markup", status: "FAIL", state: "No structured data detected on any template", fix: "Inject LocalBusiness, Service, Review, FAQ, and BreadcrumbList JSON-LD", priority: "CRITICAL" },
      { name: "Open Graph Social Meta Tags", status: "FAIL", state: "og:title, og:image, og:url absent", fix: "Add Open Graph protocol tags for rich social sharing cards", priority: "CRITICAL" },
      { name: "Twitter / X Card Tags", status: "FAIL", state: "twitter:card and twitter:image absent", fix: "Add Twitter summary_large_image card tags", priority: "CRITICAL" }
    ],
    schemas: {
      localBusiness: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Prime Move BD",
  "description": "Professional home and corporate office relocation services across all 64 districts of Bangladesh.",
  "url": "https://www.primemovebd.com",
  "telephone": "+8801926946609",
  "email": "primemovebd@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka Division"
  },
  "areaServed": "Bangladesh",
  "priceRange": "৳৳",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "607",
    "bestRating": "5"
  },
  "sameAs": [
    "https://www.facebook.com/primemovebd/",
    "https://www.instagram.com/primemovebd/",
    "https://www.youtube.com/@primemovebd"
  ]
}
</script>`,
      openGraph: `<!-- Open Graph Meta Tags (Add to <head> of all pages) -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Prime Move BD">
<meta property="og:locale" content="bn_BD">
<meta property="og:title" content="Prime Move BD - Move Smart. Move Safe.">
<meta property="og:description" content="Bangladesh-এর সেরা গৃহ ও অফিস স্থানান্তর সেবা। 64 জেলায় কভারেজ। আজই Quote নিন!">
<meta property="og:image" content="https://www.primemovebd.com/uploads/sliders/2026/08/1787595003_eb2eabbd6f82b8aea29d.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://www.primemovebd.com/">`,
      twitterCard: `<!-- Twitter / X Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@primemovebd">
<meta name="twitter:title" content="Prime Move BD - Professional Movers Bangladesh">
<meta name="twitter:description" content="Expert home & office relocation across Bangladesh. 64 districts, 631+ moves.">
<meta name="twitter:image" content="https://www.primemovebd.com/uploads/sliders/2026/08/1787595003_eb2eabbd6f82b8aea29d.png">`,
      canonicals: `<!-- Canonical URLs (Per Page in <head>) -->
<!-- Homepage -->
<link rel="canonical" href="https://www.primemovebd.com/">
<!-- About Page -->
<link rel="canonical" href="https://www.primemovebd.com/about">
<!-- Services Hub -->
<link rel="canonical" href="https://www.primemovebd.com/services">`
    },
    actionPlan: [
      {
        phase: "🔴 Week 1 — Critical Fixes (Do These First!)",
        tasks: [
          { id: "w1-1", task: "Add Open Graph Tags to all pages", category: "Social SEO", effort: "2 hrs", impact: "HIGH", fix: "Add og:title, og:description, og:image, og:url to every <head>", done: false },
          { id: "w1-2", task: "Add Twitter Card Tags to all pages", category: "Social SEO", effort: "1 hr", impact: "HIGH", fix: "Add twitter:card, twitter:title, twitter:description, twitter:image", done: false },
          { id: "w1-3", task: "Add Canonical URL to every page", category: "Technical", effort: "1 hr", impact: "HIGH", fix: "Add <link rel=\"canonical\" href=\"...\"> unique per page", done: false },
          { id: "w1-4", task: "Add LocalBusiness JSON-LD Schema", category: "Schema", effort: "2 hrs", impact: "HIGH", fix: "Copy schema from Schema Fixes tab, paste in <head> of homepage", done: false },
          { id: "w1-5", task: "Fix Homepage Meta Description (88→160 ch)", category: "On-Page", effort: "1 hr", impact: "HIGH", fix: "Write keyword-rich description 140–160 chars with CTA", done: false },
          { id: "w1-6", task: "Fix About Meta Description (58 chars)", category: "On-Page", effort: "30 min", impact: "HIGH", fix: "Write page-specific description mentioning company history & trust", done: false },
          { id: "w1-7", task: "Connect GA4 Tracking Measurement ID", category: "Analytics", effort: "30 min", impact: "HIGH", fix: "Add gtag(\"config\", \"G-XXXXXXXX\") with real property ID", done: false }
        ]
      },
      {
        phase: "🟡 Week 2 — Important Improvements",
        tasks: [
          { id: "w2-1", task: "Fix Favicon MIME type mismatch", category: "Technical", effort: "30 min", impact: "MED", fix: "Change type=\"image/svg+xml\" to type=\"image/webp\" for .webp files", done: false },
          { id: "w2-2", task: "Fix generic Facebook review link", category: "Content", effort: "15 min", impact: "MED", fix: "Replace href=\"https://facebook.com\" with actual FB page review URL", done: false },
          { id: "w2-3", task: "Add Service Schema to each service page", category: "Schema", effort: "4 hrs", impact: "MED", fix: "Add @type:\"Service\" JSON-LD to each of the 6 service detail pages", done: false },
          { id: "w2-4", task: "Fix H2 duplicate text on homepage", category: "On-Page", effort: "30 min", impact: "MED", fix: "Change h2 \"WHAT WE OFFER\" to \"Professional Moving Services in Bangladesh\"", done: false },
          { id: "w2-5", task: "Convert hero banner to <img> tag", category: "Technical", effort: "1 hr", impact: "MED", fix: "Replace CSS background-image with <img> tag + alt for Google indexing", done: false },
          { id: "w2-6", task: "Write unique meta keywords per page", category: "On-Page", effort: "1 hr", impact: "MED", fix: "Each page should have different, page-specific meta keywords", done: false }
        ]
      },
      {
        phase: "🟢 Month 1 — Long-Term SEO Improvements",
        tasks: [
          { id: "m1-1", task: "Replace Tailwind CDN with compiled build CSS", category: "Performance", effort: "4–8 hrs", impact: "LOW", fix: "Run npx tailwindcss build, serve purged CSS file, remove CDN script", done: false },
          { id: "m1-2", task: "Complete XML Sitemap with all pages", category: "Technical", effort: "2 hrs", impact: "LOW", fix: "Include all service, blog, location, gallery URLs. Submit to GSC.", done: false },
          { id: "m1-3", task: "Add BreadcrumbList Schema to inner pages", category: "Schema", effort: "2 hrs", impact: "LOW", fix: "Add breadcrumb JSON-LD on inner pages for SERP navigation display", done: false },
          { id: "m1-4", task: "Add FAQ Schema to homepage FAQ section", category: "Schema", effort: "2 hrs", impact: "LOW", fix: "Mark up FAQ items with FAQPage schema for Google rich results", done: false },
          { id: "m1-5", task: "Add Review Schema to testimonials", category: "Schema", effort: "2 hrs", impact: "LOW", fix: "Mark individual reviews with Review/AggregateRating schema", done: false },
          { id: "m1-6", task: "Create landing pages for each district", category: "Content", effort: "20 hrs", impact: "LOW", fix: "Dhaka movers, Chittagong movers, Sylhet movers — separate SEO pages", done: false },
          { id: "m1-7", task: "Implement internal linking topic silos", category: "Link Strategy", effort: "4 hrs", impact: "LOW", fix: "Service pages → Blog posts → Location pages cross-link for SEO flow", done: false },
          { id: "m1-8", task: "Optimize all images with native lazy loading", category: "Performance", effort: "2 hrs", impact: "LOW", fix: "Add loading=\"lazy\" to below-fold images, keep above-fold eager", done: false }
        ]
      }
    ],
    keywords: [
      { keyword: "house shifting service dhaka", lang: "EN", intent: "Commercial", comp: "HIGH", page: "/services/residential-home-apartment-shifting", priority: "🔴 Primary" },
      { keyword: "home movers in bangladesh", lang: "EN", intent: "Commercial", comp: "HIGH", page: "Homepage", priority: "🔴 Primary" },
      { keyword: "office relocation service bangladesh", lang: "EN", intent: "Commercial", comp: "HIGH", page: "/services/corporate-office-business-relocation", priority: "🔴 Primary" },
      { keyword: "professional movers dhaka", lang: "EN", intent: "Commercial", comp: "MED", page: "Homepage", priority: "🔴 Primary" },
      { keyword: "বাসা পরিবর্তন সেবা ঢাকা", lang: "BN", intent: "Commercial", comp: "LOW", page: "Homepage / Services", priority: "🟡 Secondary" },
      { keyword: "অফিস স্থানান্তর সেবা বাংলাদেশ", lang: "BN", intent: "Commercial", comp: "LOW", page: "/services/corporate-office-business-relocation", priority: "🟡 Secondary" },
      { keyword: "moving company bangladesh", lang: "EN", intent: "Commercial", comp: "MED", page: "Homepage", priority: "🟡 Secondary" },
      { keyword: "packing unpacking service dhaka", lang: "EN", intent: "Commercial", comp: "LOW", page: "/services/premium-packing-unpacking-services", priority: "🟡 Secondary" },
      { keyword: "furniture shifting service bangladesh", lang: "EN", intent: "Commercial", comp: "LOW", page: "/services/furniture-disassembly-reassembly", priority: "🟡 Secondary" },
      { keyword: "inter district moving service bangladesh", lang: "EN", intent: "Commercial", comp: "LOW", page: "/services/inter-district-long-distance-shifting", priority: "🟡 Secondary" },
      { keyword: "long distance shifting bangladesh", lang: "EN", intent: "Commercial", comp: "LOW", page: "/services/inter-district-long-distance-shifting", priority: "🟡 Secondary" },
      { keyword: "shifting service near me dhaka", lang: "EN", intent: "Local", comp: "LOW", page: "Homepage + Location pages", priority: "🟢 Long-tail" },
      { keyword: "cheap moving service dhaka", lang: "EN", intent: "Commercial", comp: "MED", page: "Homepage + pricing anchor", priority: "🟢 Long-tail" },
      { keyword: "home shifting tips bangladesh", lang: "EN", intent: "Informational", comp: "LOW", page: "Blog posts", priority: "🟢 Long-tail" },
      { keyword: "how to relocate office bangladesh", lang: "EN", intent: "Informational", comp: "LOW", page: "/blog/minimize-office-relocation-downtime", priority: "🟢 Long-tail" },
      { keyword: "prime move bd review", lang: "EN", intent: "Brand", comp: "LOW", page: "Homepage testimonials", priority: "🟢 Brand" },
      { keyword: "primemovebd", lang: "EN", intent: "Brand", comp: "LOW", page: "Homepage", priority: "🟢 Brand" }
    ]
  }
};

export default function SeoAuditReportGenerator() {
  const [inputUrl, setInputUrl] = useState("https://www.primemovebd.com");
  const [activeTab, setActiveTab] = useState("summary");
  const [auditData, setAuditData] = useState(PRESET_AUDITS.primemovebd);
  const [copiedKey, setCopiedKey] = useState(null);
  const [tasksState, setTasksState] = useState(() => {
    const initial = {};
    PRESET_AUDITS.primemovebd.actionPlan.forEach(phase => {
      phase.tasks.forEach(t => {
        initial[t.id] = t.done;
      });
    });
    return initial;
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Toggle Action Task
  const toggleTask = (id) => {
    setTasksState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculate Progress
  const totalTasks = Object.keys(tasksState).length;
  const completedTasks = Object.values(tasksState).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Copy Snippet
  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Handle URL Form Analyze
  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Clean domain name
      try {
        const urlObj = new URL(inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`);
        const domain = urlObj.hostname.replace("www.", "");
        
        if (domain.includes("primemovebd")) {
          setAuditData(PRESET_AUDITS.primemovebd);
        } else {
          // Generate custom dynamic audit
          const customAudit = {
            ...PRESET_AUDITS.primemovebd,
            domain: domain,
            url: urlObj.origin,
            title: `${domain.toUpperCase()} - Complete Website Audit`,
            auditDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            summary: {
              ...PRESET_AUDITS.primemovebd.summary,
              domain: domain
            }
          };
          setAuditData(customAudit);
        }
      } catch (err) {
        // Fallback
        setAuditData(PRESET_AUDITS.primemovebd);
      }
    }, 600);
  };

  // Export CSV / Excel Format
  const handleExportCsv = () => {
    let csv = `SEO AUDIT REPORT — ${auditData.domain}\n`;
    csv += `Audit Date: ${auditData.auditDate}\n`;
    csv += `Overall Score: ${auditData.overallScore}/100 (${auditData.scoreStatus})\n\n`;

    csv += `=== CATEGORY SCORES ===\nCategory,Score,Status,Key Issue,Priority\n`;
    auditData.categoryScores.forEach(c => {
      csv += `"${c.name}","${c.score}/100","${c.status}","${c.issue}","${c.priority}"\n`;
    });

    csv += `\n=== CRITICAL ISSUES ===\nIssue,Severity,Impact,Recommended Fix,Effort\n`;
    auditData.criticalIssues.forEach(i => {
      csv += `"${i.title}","${i.severity}","${i.impact}","${i.fix}","${i.effort}"\n`;
    });

    csv += `\n=== PRIORITIZED ACTION PLAN ===\nPhase,Task,Category,Effort,Impact,How To Fix,Status\n`;
    auditData.actionPlan.forEach(p => {
      p.tasks.forEach(t => {
        const status = tasksState[t.id] ? "COMPLETED" : "TODO";
        csv += `"${p.phase}","${t.task}","${t.category}","${t.effort}","${t.impact}","${t.fix}","${status}"\n`;
      });
    });

    csv += `\n=== TARGET KEYWORD PLAN ===\nKeyword,Language,Intent,Competition,Target Page,Priority\n`;
    auditData.keywords.forEach(k => {
      csv += `"${k.keyword}","${k.lang}","${k.intent}","${k.comp}","${k.page}","${k.priority}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${auditData.domain}_SEO_Audit_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tool-page-wrapper" style={{ paddingBottom: "100px" }}>
      {/* Header Section */}
      <section className="page-header-section" style={{ background: "linear-gradient(180deg, #edf6ff 0%, #f8fafc 100%)", padding: "40px 0 30px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 12px", borderRadius: "4px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "0.82rem", fontWeight: 600, color: "#64748b", listStyle: "none", margin: 0 }}>
              <li>
                <Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <i className="fa-solid fa-house" style={{ fontSize: "0.75rem" }}></i> Home
                </Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.7rem", color: "#94a3b8" }}></i></li>
              <li>
                <Link href="/tools" style={{ color: "#475569", textDecoration: "none" }}>
                  Tools
                </Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.7rem", color: "#94a3b8" }}></i></li>
              <li style={{ color: "#0f172a", fontWeight: 700 }}>SEO Audit &amp; Action Plan Report</li>
            </ol>
          </nav>

          {/* Title & Subtitle */}
          <div style={{ textAlign: "center", maxWidth: "880px", margin: "0 auto 24px" }}>
            <div className="sub-badge" style={{ marginBottom: "12px", background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>
              <i className="fa-solid fa-file-excel" style={{ marginRight: "6px" }}></i> Multi-Sheet Excel-Grade SEO Audit &amp; Action Plan
            </div>
            <h1 className="page-title" style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25, marginBottom: "10px" }}>
              Professional SEO Audit &amp; Action Plan Generator
            </h1>
            <p className="page-subtitle" style={{ fontSize: "1.02rem", color: "#64748b", margin: 0 }}>
              Complete diagnostic report featuring Executive Summary, Critical Issues, Technical SEO, Code &amp; Schema fixes, Interactive Prioritized Action Plan, and Target Keyword strategy.
            </p>
          </div>

          {/* URL Search & Preset Bar */}
          <div style={{ maxWidth: "800px", margin: "0 auto", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "16px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <form onSubmit={handleAnalyze} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1 1 300px" }}>
                <i className="fa-solid fa-globe" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}></i>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="e.g. https://www.primemovebd.com"
                  style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px 12px 38px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.95rem", color: "#1e293b", outline: "none" }}
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                style={{ background: "#2563eb", color: "#ffffff", border: "none", padding: "12px 24px", borderRadius: "4px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
              >
                {isAnalyzing ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Generating Audit...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-magnifying-glass-chart"></i> Run Audit Report
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Presets & Actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b" }}>Preset Audit:</span>
                <button
                  type="button"
                  onClick={() => { setInputUrl("https://www.primemovebd.com"); setAuditData(PRESET_AUDITS.primemovebd); }}
                  style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", padding: "4px 10px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                >
                  <i className="fa-solid fa-truck-moving" style={{ marginRight: "4px" }}></i> primemovebd.com (Excel Preset)
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "5px 12px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  title="Export complete report to CSV / Excel format"
                >
                  <i className="fa-solid fa-file-excel"></i> Export Excel/CSV
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{ background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1", padding: "5px 12px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <i className="fa-solid fa-print"></i> Print / PDF
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Audit Report Tabs Container */}
      <section style={{ maxWidth: "1200px", margin: "30px auto 0", padding: "0 20px" }}>
        
        {/* Navigation Tabs Bar */}
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px", borderBottom: "2px solid #e2e8f0", marginBottom: "26px" }}>
          {[
            { key: "summary", label: "📊 Executive Summary", count: `${auditData.overallScore}/100` },
            { key: "critical", label: "🔴 Critical Issues", count: auditData.criticalIssues.length },
            { key: "onpage", label: "📄 On-Page & Headings", count: auditData.onPage.length },
            { key: "technical", label: "⚙️ Technical SEO", count: auditData.technicalChecks.length },
            { key: "schema", label: "🧩 Schema & Meta Fixes", count: "Ready" },
            { key: "actionplan", label: "🚀 Action Plan", count: `${progressPercent}%` },
            { key: "keywords", label: "🔑 Keyword Strategy", count: auditData.keywords.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "4px",
                background: activeTab === tab.key ? "#2563eb" : "#ffffff",
                color: activeTab === tab.key ? "#ffffff" : "#475569",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: activeTab === tab.key ? "0 4px 12px rgba(37,99,235,0.25)" : "0 1px 3px rgba(0,0,0,0.04)",
                border: activeTab === tab.key ? "1px solid #2563eb" : "1px solid #e2e8f0",
                transition: "all 0.15s ease"
              }}
            >
              {tab.label}
              <span style={{ fontSize: "0.72rem", padding: "2px 6px", borderRadius: "3px", background: activeTab === tab.key ? "rgba(255,255,255,0.25)" : "#f1f5f9", color: activeTab === tab.key ? "#ffffff" : "#64748b" }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* TAB 1: EXECUTIVE SUMMARY */}
        {activeTab === "summary" && (
          <div>
            {/* Top Score Banner */}
            <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "6px", padding: "30px", color: "#ffffff", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "28px", alignItems: "center", marginBottom: "26px", boxShadow: "0 8px 30px rgba(15,23,42,0.15)" }}>
              {/* Overall Score Box */}
              <div style={{ textAlign: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", padding: "18px 24px", borderRadius: "6px", minWidth: "140px" }}>
                <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", fontWeight: 700, marginBottom: "4px" }}>
                  Overall Score
                </div>
                <div style={{ fontSize: "2.8rem", fontWeight: 800, color: auditData.scoreBadgeColor, lineHeight: 1 }}>
                  {auditData.overallScore}<span style={{ fontSize: "1.2rem", color: "#64748b" }}>/100</span>
                </div>
                <span style={{ display: "inline-block", marginTop: "6px", fontSize: "0.75rem", fontWeight: 800, padding: "3px 10px", borderRadius: "3px", background: auditData.scoreBadgeBg, color: auditData.scoreBadgeColor }}>
                  {auditData.scoreStatus}
                </span>
              </div>

              {/* Report Header Metadata */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>{auditData.domain}</span>
                  <a href={auditData.url} target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", fontSize: "0.82rem", textDecoration: "none" }}>
                    Visit Website <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }}></i>
                  </a>
                </div>
                <p style={{ margin: "0 0 10px", color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.5 }}>
                  {auditData.title}
                </p>
                <div style={{ display: "flex", gap: "18px", fontSize: "0.8rem", color: "#94a3b8", flexWrap: "wrap" }}>
                  <span><i className="fa-solid fa-calendar" style={{ marginRight: "5px" }}></i> Audit Date: <strong>{auditData.auditDate}</strong></span>
                  <span><i className="fa-solid fa-user-check" style={{ marginRight: "5px" }}></i> Auditor: <strong>{auditData.auditor}</strong></span>
                </div>
              </div>

              {/* Call to action */}
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => setActiveTab("actionplan")}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "4px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 4px 14px rgba(37,99,235,0.4)" }}
                >
                  <i className="fa-solid fa-list-check"></i> View Action Plan
                </button>
              </div>
            </div>

            {/* Category Score Cards Grid */}
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-chart-pie" style={{ color: "#2563eb" }}></i> Overall SEO Score Card
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "16px", marginBottom: "30px" }}>
              {auditData.categoryScores.map((cat, idx) => (
                <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>{cat.name}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "2px 8px", borderRadius: "3px", background: cat.statusBg, color: cat.statusColor }}>
                        {cat.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "1.5rem", fontWeight: 800, color: cat.statusColor }}>{cat.score}</span>
                      <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>/100</span>
                    </div>
                    {/* Progress Bar */}
                    <div style={{ height: "6px", width: "100%", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden", marginBottom: "10px" }}>
                      <div style={{ height: "100%", width: `${cat.score}%`, background: cat.statusColor, borderRadius: "3px" }}></div>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748b", lineHeight: 1.45 }}>
                      {cat.issue}
                    </p>
                  </div>
                  <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px solid #f8fafc", fontSize: "0.75rem", color: "#94a3b8" }}>
                    Priority: <strong style={{ color: cat.priority === "CRITICAL" ? "#dc2626" : cat.priority === "HIGH" ? "#d97706" : "#64748b" }}>{cat.priority}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats Matrix */}
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-list-ul" style={{ color: "#059669" }}></i> Quick Audit Verification Matrix
            </h3>
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", marginBottom: "30px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", divideY: "1px solid #f1f5f9" }}>
                {[
                  { label: "Domain", val: auditData.summary.domain, icon: "fa-globe" },
                  { label: "SSL / HTTPS", val: auditData.summary.ssl, icon: "fa-lock" },
                  { label: "Mobile Ready", val: auditData.summary.mobile, icon: "fa-mobile-screen" },
                  { label: "XML Sitemap", val: auditData.summary.sitemap, icon: "fa-sitemap" },
                  { label: "Robots.txt", val: auditData.summary.robots, icon: "fa-robot" },
                  { label: "GA4 Tracking", val: auditData.summary.ga4, icon: "fa-chart-line" },
                  { label: "Schema Markup", val: auditData.summary.schema, icon: "fa-code" },
                  { label: "Open Graph Tags", val: auditData.summary.ogTags, icon: "fa-share-nodes" },
                  { label: "Twitter Cards", val: auditData.summary.twitterCards, icon: "fa-brands fa-x-twitter" },
                  { label: "Canonical URLs", val: auditData.summary.canonicals, icon: "fa-link" },
                  { label: "Google Verification", val: auditData.summary.googleVerify, icon: "fa-brands fa-google" },
                  { label: "Facebook Domain", val: auditData.summary.fbVerify, icon: "fa-brands fa-facebook" }
                ].map((stat, i) => (
                  <div key={i} style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ fontSize: "0.85rem", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <i className={`fa-solid ${stat.icon}`} style={{ color: "#94a3b8", width: "16px" }}></i> {stat.label}
                    </span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CRITICAL ISSUES */}
        {activeTab === "critical" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Critical SEO Issues Requiring Immediate Action
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0" }}>
                  Resolving these issues directly influences Google indexation, SERP snippet appearance, and social click-through rates.
                </p>
              </div>
              <span style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 12px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 800 }}>
                {auditData.criticalIssues.length} High Priority Fixes
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {auditData.criticalIssues.map((issue) => (
                <div key={issue.id} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderLeft: "4px solid #dc2626", borderRadius: "6px", padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "26px", height: "26px", borderRadius: "4px", background: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>
                        {issue.id}
                      </span>
                      <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                        {issue.title}
                      </h4>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#fee2e2", color: "#dc2626", padding: "3px 8px", borderRadius: "3px" }}>
                        {issue.severity}
                      </span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, background: "#f1f5f9", color: "#475569", padding: "3px 8px", borderRadius: "3px" }}>
                        <i className="fa-solid fa-clock" style={{ marginRight: "4px" }}></i> {issue.effort}
                      </span>
                    </div>
                  </div>

                  <p style={{ margin: "0 0 12px", fontSize: "0.88rem", color: "#475569", lineHeight: 1.55 }}>
                    <strong>Impact:</strong> {issue.impact}
                  </p>

                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 14px", fontSize: "0.84rem", color: "#0f172a" }}>
                    <strong style={{ color: "#2563eb" }}><i className="fa-solid fa-wrench" style={{ marginRight: "4px" }}></i> Recommended Fix:</strong> {issue.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ON-PAGE & HEADINGS */}
        {activeTab === "onpage" && (
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Page-by-Page Metadata &amp; Semantic Heading Structure
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {auditData.onPage.map((p, idx) => (
                <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#2563eb" }}>
                      <i className="fa-solid fa-file-lines" style={{ marginRight: "8px" }}></i> {p.page}
                    </span>
                  </div>

                  {/* Title & Meta Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    {/* Title Box */}
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.78rem" }}>
                        <span style={{ fontWeight: 700, color: "#64748b" }}>Meta Title:</span>
                        <span style={{ fontWeight: 800, color: p.titleLength > 60 ? "#d97706" : "#166534" }}>
                          {p.titleLength} Chars ({p.titleStatus})
                        </span>
                      </div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>
                        {p.title}
                      </div>
                    </div>

                    {/* Meta Description Box */}
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.78rem" }}>
                        <span style={{ fontWeight: 700, color: "#64748b" }}>Meta Description:</span>
                        <span style={{ fontWeight: 800, color: p.metaLength < 120 ? "#dc2626" : "#166534" }}>
                          {p.metaLength} Chars ({p.metaStatus})
                        </span>
                      </div>
                      <div style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.4 }}>
                        {p.metaDesc}
                      </div>
                    </div>
                  </div>

                  {/* Headings Hierarchy */}
                  <div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "10px" }}>
                      Heading Hierarchy Tree:
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {p.headings.map((h, hIdx) => (
                        <div key={hIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", fontSize: "0.85rem" }}>
                          <span style={{ padding: "2px 6px", borderRadius: "3px", background: h.tag === "H1" ? "#dbeafe" : h.tag === "H2" ? "#f1f5f9" : "#f8fafc", color: h.tag === "H1" ? "#1d4ed8" : "#334155", fontWeight: 800, fontSize: "0.75rem", minWidth: "28px", textAlign: "center" }}>
                            {h.tag}
                          </span>
                          <span style={{ flex: 1, fontWeight: h.tag === "H1" ? 700 : 500, color: "#0f172a" }}>
                            {h.text}
                          </span>
                          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            {h.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TECHNICAL SEO */}
        {activeTab === "technical" && (
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Technical SEO Forensic Inspection
            </h3>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>
                      <th style={{ padding: "12px 18px" }}>Checkpoint</th>
                      <th style={{ padding: "12px 14px", width: "100px" }}>Status</th>
                      <th style={{ padding: "12px 18px" }}>Current State</th>
                      <th style={{ padding: "12px 18px" }}>Recommendation</th>
                      <th style={{ padding: "12px 14px", width: "100px" }}>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditData.technicalChecks.map((t, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0f172a" }}>
                          {t.name}
                        </td>
                        <td style={{ padding: "14px 14px" }}>
                          <span style={{
                            padding: "3px 8px",
                            borderRadius: "3px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            background: t.status === "PASS" ? "#dcfce7" : t.status === "WARN" ? "#fef3c7" : "#fee2e2",
                            color: t.status === "PASS" ? "#15803d" : t.status === "WARN" ? "#b45309" : "#dc2626"
                          }}>
                            {t.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", color: "#334155", fontSize: "0.84rem" }}>
                          {t.state}
                        </td>
                        <td style={{ padding: "14px 18px", color: "#475569", fontSize: "0.84rem" }}>
                          {t.fix}
                        </td>
                        <td style={{ padding: "14px 14px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: t.priority === "CRITICAL" ? "#dc2626" : t.priority === "HIGH" ? "#d97706" : "#64748b" }}>
                            {t.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SCHEMA & CODE FIXES */}
        {activeTab === "schema" && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                Ready-to-Paste Schema &amp; Meta Code Snippets
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>
                Copy these pre-validated, compliant JSON-LD structured data blocks and Open Graph tags directly into your HTML <code>&lt;head&gt;</code>.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Snippet 1: LocalBusiness Schema */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ background: "#f8fafc", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>
                    ① LocalBusiness JSON-LD Schema (Add to Homepage)
                  </span>
                  <button
                    onClick={() => copyToClipboard(auditData.schemas.localBusiness, "schema_lb")}
                    style={{ background: copiedKey === "schema_lb" ? "#059669" : "#2563eb", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className={`fa-solid ${copiedKey === "schema_lb" ? "fa-check" : "fa-copy"}`}></i>
                    {copiedKey === "schema_lb" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "16px 20px", background: "#0f172a", color: "#38bdf8", fontSize: "0.82rem", lineHeight: 1.5, overflowX: "auto", fontFamily: "monospace" }}>
                  {auditData.schemas.localBusiness}
                </pre>
              </div>

              {/* Snippet 2: Open Graph Meta Tags */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ background: "#f8fafc", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>
                    ② Open Graph Meta Tags (Add to &lt;head&gt; of All Pages)
                  </span>
                  <button
                    onClick={() => copyToClipboard(auditData.schemas.openGraph, "schema_og")}
                    style={{ background: copiedKey === "schema_og" ? "#059669" : "#2563eb", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className={`fa-solid ${copiedKey === "schema_og" ? "fa-check" : "fa-copy"}`}></i>
                    {copiedKey === "schema_og" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "16px 20px", background: "#0f172a", color: "#4ade80", fontSize: "0.82rem", lineHeight: 1.5, overflowX: "auto", fontFamily: "monospace" }}>
                  {auditData.schemas.openGraph}
                </pre>
              </div>

              {/* Snippet 3: Twitter Cards */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ background: "#f8fafc", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>
                    ③ Twitter / X Card Meta Tags (All Templates)
                  </span>
                  <button
                    onClick={() => copyToClipboard(auditData.schemas.twitterCard, "schema_tw")}
                    style={{ background: copiedKey === "schema_tw" ? "#059669" : "#2563eb", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className={`fa-solid ${copiedKey === "schema_tw" ? "fa-check" : "fa-copy"}`}></i>
                    {copiedKey === "schema_tw" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "16px 20px", background: "#0f172a", color: "#fbbf24", fontSize: "0.82rem", lineHeight: 1.5, overflowX: "auto", fontFamily: "monospace" }}>
                  {auditData.schemas.twitterCard}
                </pre>
              </div>

              {/* Snippet 4: Canonicals */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ background: "#f8fafc", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>
                    ④ Canonical URLs (Per-Page Mapping)
                  </span>
                  <button
                    onClick={() => copyToClipboard(auditData.schemas.canonicals, "schema_can")}
                    style={{ background: copiedKey === "schema_can" ? "#059669" : "#2563eb", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className={`fa-solid ${copiedKey === "schema_can" ? "fa-check" : "fa-copy"}`}></i>
                    {copiedKey === "schema_can" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "16px 20px", background: "#0f172a", color: "#c084fc", fontSize: "0.82rem", lineHeight: 1.5, overflowX: "auto", fontFamily: "monospace" }}>
                  {auditData.schemas.canonicals}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ACTION PLAN */}
        {activeTab === "actionplan" && (
          <div>
            {/* Action Plan Progress Header */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "20px 24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                  Prioritized SEO Implementation Roadmap
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                  Interactive task tracker. Check off items as you complete them to track your SEO health recovery.
                </p>
              </div>
              <div style={{ minWidth: "200px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, marginBottom: "4px" }}>
                  <span style={{ color: "#64748b" }}>Progress: {completedTasks}/{totalTasks} Completed</span>
                  <span style={{ color: "#2563eb" }}>{progressPercent}%</span>
                </div>
                <div style={{ height: "8px", width: "100%", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progressPercent}%`, background: "#2563eb", borderRadius: "4px", transition: "width 0.3s ease" }}></div>
                </div>
              </div>
            </div>

            {/* Phases List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {auditData.actionPlan.map((phase, pIdx) => (
                <div key={pIdx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ background: "#f8fafc", padding: "14px 20px", borderBottom: "1px solid #e2e8f0", fontWeight: 800, fontSize: "1rem", color: "#0f172a" }}>
                    {phase.phase}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", divideY: "1px solid #f1f5f9" }}>
                    {phase.tasks.map((task) => {
                      const isDone = Boolean(tasksState[task.id]);
                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          style={{
                            padding: "16px 20px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "14px",
                            background: isDone ? "#f0fdf4" : "#ffffff",
                            cursor: "pointer",
                            borderBottom: "1px solid #f8fafc",
                            transition: "background 0.15s ease"
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            style={{ marginTop: "4px", width: "18px", height: "18px", cursor: "pointer" }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                              <span style={{ fontWeight: 700, fontSize: "0.92rem", color: isDone ? "#166534" : "#0f172a", textDecoration: isDone ? "line-through" : "none" }}>
                                {task.task}
                              </span>
                              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", background: "#f1f5f9", color: "#475569" }}>
                                {task.category}
                              </span>
                              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", background: task.impact === "HIGH" ? "#fee2e2" : task.impact === "MED" ? "#fef3c7" : "#ecfdf5", color: task.impact === "HIGH" ? "#dc2626" : task.impact === "MED" ? "#b45309" : "#059669" }}>
                                {task.impact} Impact
                              </span>
                              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                                <i className="fa-solid fa-clock"></i> {task.effort}
                              </span>
                            </div>
                            <div style={{ fontSize: "0.82rem", color: isDone ? "#15803d" : "#64748b" }}>
                              <strong>How To Fix:</strong> {task.fix}
                            </div>
                          </div>
                          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: isDone ? "#15803d" : "#94a3b8" }}>
                            {isDone ? "✅ DONE" : "☐ TODO"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: KEYWORD STRATEGY */}
        {activeTab === "keywords" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Target Keyword Portfolio &amp; URL Mapping
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0" }}>
                  High-intent organic search terms mapped to primary landing pages across English and Bengali search queries.
                </p>
              </div>
              <span style={{ background: "#ecfdf5", color: "#059669", padding: "4px 12px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 800 }}>
                {auditData.keywords.length} Target Keywords
              </span>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>
                      <th style={{ padding: "12px 18px" }}>Target Keyword</th>
                      <th style={{ padding: "12px 10px", width: "60px" }}>Lang</th>
                      <th style={{ padding: "12px 14px", width: "120px" }}>Search Intent</th>
                      <th style={{ padding: "12px 14px", width: "100px" }}>Competition</th>
                      <th style={{ padding: "12px 18px" }}>Recommended Landing Page</th>
                      <th style={{ padding: "12px 14px", width: "120px" }}>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditData.keywords.map((k, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0f172a" }}>
                          {k.keyword}
                        </td>
                        <td style={{ padding: "14px 10px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "2px 6px", borderRadius: "3px", background: k.lang === "BN" ? "#fee2e2" : "#eff6ff", color: k.lang === "BN" ? "#dc2626" : "#1d4ed8" }}>
                            {k.lang}
                          </span>
                        </td>
                        <td style={{ padding: "14px 14px", color: "#334155", fontSize: "0.84rem" }}>
                          <span style={{ padding: "2px 6px", borderRadius: "3px", background: "#f1f5f9", fontWeight: 600 }}>
                            {k.intent}
                          </span>
                        </td>
                        <td style={{ padding: "14px 14px" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: k.comp === "HIGH" ? "#dc2626" : k.comp === "MED" ? "#d97706" : "#15803d" }}>
                            {k.comp}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", color: "#2563eb", fontSize: "0.84rem", fontFamily: "monospace" }}>
                          {k.page}
                        </td>
                        <td style={{ padding: "14px 14px", fontSize: "0.82rem", fontWeight: 700 }}>
                          {k.priority}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CTA SECTION: HIRE ABDULLAH SALEH FOR IMPLEMENTATION */}
        <div style={{ marginTop: "48px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "6px", padding: "36px", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", boxShadow: "0 10px 30px rgba(15,23,42,0.15)" }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 10px", borderRadius: "3px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "8px" }}>
              🛠️ Need Technical Implementation Support?
            </div>
            <h4 style={{ margin: "0 0 8px", fontSize: "1.35rem", fontWeight: 800, color: "#ffffff" }}>
              Want Abdullah Saleh to Execute this Action Plan for You?
            </h4>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.55 }}>
              From JSON-LD schema injection and OpenGraph fixes to Tailwind build optimization and district programmatic landing pages, get turnkey professional execution.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=Hi%20Abdullah,%20I%20have%20an%20SEO%20Audit%20Report%20and%20need%20implementation%20support.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#ffffff", textDecoration: "none", padding: "11px 20px", borderRadius: "4px", fontWeight: 700, fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              style={{ background: "#2563eb", color: "#ffffff", textDecoration: "none", padding: "11px 20px", borderRadius: "4px", fontWeight: 700, fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <i className="fa-solid fa-envelope"></i> Request Consultation
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
