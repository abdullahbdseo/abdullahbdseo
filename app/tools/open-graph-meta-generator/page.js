"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function OpenGraphMetaGenerator() {
  // Main form states
  const [ogTitle, setOgTitle] = useState("Best Professional SEO Services & High Authority Link Building");
  const [ogDescription, setOgDescription] = useState("Boost your Google rankings, drive organic traffic, and outperform competitors with data-driven on-page SEO, technical audits, and premium high-DA backlink strategies.");
  const [canonicalUrl, setCanonicalUrl] = useState("https://abdullahbdseo.com/services");
  const [siteName, setSiteName] = useState("Abdullah BD SEO");
  const [ogType, setOgType] = useState("website");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop");
  const [imageAlt, setImageAlt] = useState("SEO Audit and Digital Marketing Analytics Dashboard");
  const [imageWidth, setImageWidth] = useState("1200");
  const [imageHeight, setImageHeight] = useState("630");
  const [imageType, setImageType] = useState("image/jpeg");
  
  // Twitter Card states
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterSite, setTwitterSite] = useState("@abdullahbdseo");
  const [twitterCreator, setTwitterCreator] = useState("@abdullahbdseo");
  
  // Advanced & Article states
  const [locale, setLocale] = useState("en_US");
  const [fbAppId, setFbAppId] = useState("");
  const [authorName, setAuthorName] = useState("Abdullah Al Mamun");
  const [publishedTime, setPublishedTime] = useState(new Date().toISOString().split("T")[0]);
  const [articleSection, setArticleSection] = useState("Search Engine Optimization");
  const [articleTags, setArticleTags] = useState("SEO, Backlinks, Digital Marketing, Google Ranking");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);

  // Active preview tab
  const [activePreview, setActivePreview] = useState("facebook"); // facebook | twitter | linkedin | whatsapp | discord
  const [activeCodeTab, setActiveCodeTab] = useState("html"); // html | nextjs | react

  // Copy feedback
  const [copiedCode, setCopiedCode] = useState(false);

  // Domain extractor
  const domain = useMemo(() => {
    try {
      if (!canonicalUrl) return "example.com";
      const u = new URL(canonicalUrl.startsWith("http") ? canonicalUrl : `https://${canonicalUrl}`);
      return u.hostname;
    } catch {
      return "example.com";
    }
  }, [canonicalUrl]);

  // Validation Score & Checks
  const auditChecks = useMemo(() => {
    const checks = [];
    
    // Title check
    const tLen = ogTitle.trim().length;
    if (tLen >= 30 && tLen <= 65) {
      checks.push({ status: "good", label: `Title length (${tLen} chars) is optimal for Facebook & Twitter (30-65 chars).` });
    } else if (tLen === 0) {
      checks.push({ status: "error", label: "Title is missing. Social cards will fallback to URL or blank." });
    } else if (tLen < 30) {
      checks.push({ status: "warning", label: `Title is short (${tLen} chars). Expand to 40-60 characters for higher CTR.` });
    } else {
      checks.push({ status: "warning", label: `Title is long (${tLen} chars). Mobile cards may truncate after 65 chars.` });
    }

    // Description check
    const dLen = ogDescription.trim().length;
    if (dLen >= 55 && dLen <= 160) {
      checks.push({ status: "good", label: `Description length (${dLen} chars) is well-balanced for all platforms.` });
    } else if (dLen === 0) {
      checks.push({ status: "warning", label: "Description is empty. Platforms will pull arbitrary body text." });
    } else if (dLen < 55) {
      checks.push({ status: "warning", label: `Description is short (${dLen} chars). Aim for 60-150 characters.` });
    } else {
      checks.push({ status: "warning", label: `Description is long (${dLen} chars). Will be truncated on Twitter & Facebook.` });
    }

    // Image check
    if (imageUrl.trim()) {
      if (imageUrl.startsWith("https://")) {
        checks.push({ status: "good", label: "Image uses secure HTTPS protocol (Required by Facebook & WhatsApp)." });
      } else {
        checks.push({ status: "error", label: "Image should use HTTPS. Some crawlers block non-SSL HTTP assets." });
      }

      if (imageWidth === "1200" && imageHeight === "630") {
        checks.push({ status: "good", label: "Dimensions match the standard 1200×630 (1.91:1 ratio) high-res standard." });
      } else {
        checks.push({ status: "info", label: `Current image dimension: ${imageWidth}×${imageHeight}px.` });
      }
    } else {
      checks.push({ status: "error", label: "OG Image is missing! Social cards will render as text-only." });
    }

    // URL Check
    if (canonicalUrl.startsWith("https://")) {
      checks.push({ status: "good", label: "Canonical URL is absolute and secure (HTTPS)." });
    } else {
      checks.push({ status: "warning", label: "Ensure URL starts with 'https://' for accurate social crawler fetching." });
    }

    return checks;
  }, [ogTitle, ogDescription, imageUrl, imageWidth, imageHeight, canonicalUrl]);

  const auditScore = useMemo(() => {
    let score = 100;
    auditChecks.forEach((c) => {
      if (c.status === "error") score -= 25;
      if (c.status === "warning") score -= 10;
    });
    return Math.max(0, Math.min(100, score));
  }, [auditChecks]);

  // Generated HTML Code
  const generatedHtmlCode = useMemo(() => {
    const lines = [
      `<!-- Primary Meta Tags -->`,
      `<title>${ogTitle}</title>`,
      `<meta name="title" content="${ogTitle}">`,
      `<meta name="description" content="${ogDescription}">`,
      `<link rel="canonical" href="${canonicalUrl}">`,
      `<meta name="robots" content="${robotsIndex ? "index" : "noindex"}, ${robotsFollow ? "follow" : "nofollow"}">`,
      ``,
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="${ogType}">`,
      `<meta property="og:url" content="${canonicalUrl}">`,
      `<meta property="og:title" content="${ogTitle}">`,
      `<meta property="og:description" content="${ogDescription}">`,
      imageUrl ? `<meta property="og:image" content="${imageUrl}">` : null,
      imageUrl && imageAlt ? `<meta property="og:image:alt" content="${imageAlt}">` : null,
      imageUrl && imageWidth ? `<meta property="og:image:width" content="${imageWidth}">` : null,
      imageUrl && imageHeight ? `<meta property="og:image:height" content="${imageHeight}">` : null,
      imageUrl && imageType ? `<meta property="og:image:type" content="${imageType}">` : null,
      siteName ? `<meta property="og:site_name" content="${siteName}">` : null,
      locale ? `<meta property="og:locale" content="${locale}">` : null,
      fbAppId ? `<meta property="fb:app_id" content="${fbAppId}">` : null,
      ``,
      `<!-- Twitter / X -->`,
      `<meta name="twitter:card" content="${twitterCard}">`,
      `<meta name="twitter:url" content="${canonicalUrl}">`,
      `<meta name="twitter:title" content="${ogTitle}">`,
      `<meta name="twitter:description" content="${ogDescription}">`,
      imageUrl ? `<meta name="twitter:image" content="${imageUrl}">` : null,
      imageUrl && imageAlt ? `<meta name="twitter:image:alt" content="${imageAlt}">` : null,
      twitterSite ? `<meta name="twitter:site" content="${twitterSite}">` : null,
      twitterCreator ? `<meta name="twitter:creator" content="${twitterCreator}">` : null,
    ];

    if (ogType === "article") {
      lines.push(``);
      lines.push(`<!-- Article Specific Metadata -->`);
      if (authorName) lines.push(`<meta property="article:author" content="${authorName}">`);
      if (publishedTime) lines.push(`<meta property="article:published_time" content="${publishedTime}T00:00:00Z">`);
      if (articleSection) lines.push(`<meta property="article:section" content="${articleSection}">`);
      if (articleTags) {
        articleTags.split(",").map(t => t.trim()).filter(Boolean).forEach(tag => {
          lines.push(`<meta property="article:tag" content="${tag}">`);
        });
      }
    }

    return lines.filter(l => l !== null).join("\n");
  }, [
    ogTitle, ogDescription, canonicalUrl, robotsIndex, robotsFollow, ogType,
    imageUrl, imageAlt, imageWidth, imageHeight, imageType, siteName, locale,
    fbAppId, twitterCard, twitterSite, twitterCreator, authorName, publishedTime,
    articleSection, articleTags
  ]);

  // Next.js Metadata Code
  const generatedNextJsCode = useMemo(() => {
    return `// app/page.js or app/layout.js (Next.js App Router)
export const metadata = {
  title: "${ogTitle}",
  description: "${ogDescription}",
  alternates: {
    canonical: "${canonicalUrl}",
  },
  robots: {
    index: ${robotsIndex},
    follow: ${robotsFollow},
  },
  openGraph: {
    title: "${ogTitle}",
    description: "${ogDescription}",
    url: "${canonicalUrl}",
    siteName: "${siteName}",
    images: [
      {
        url: "${imageUrl}",
        width: ${imageWidth || 1200},
        height: ${imageHeight || 630},
        alt: "${imageAlt}",
      },
    ],
    locale: "${locale}",
    type: "${ogType}",
  },
  twitter: {
    card: "${twitterCard}",
    title: "${ogTitle}",
    description: "${ogDescription}",
    site: "${twitterSite}",
    creator: "${twitterCreator}",
    images: ["${imageUrl}"],
  },
};`;
  }, [
    ogTitle, ogDescription, canonicalUrl, robotsIndex, robotsFollow, ogType,
    imageUrl, imageAlt, imageWidth, imageHeight, siteName, locale,
    twitterCard, twitterSite, twitterCreator
  ]);

  // React Helmet Code
  const generatedReactHelmetCode = useMemo(() => {
    return `import { Helmet } from "react-helmet-async";

export default function SeoTags() {
  return (
    <Helmet>
      <title>${ogTitle}</title>
      <meta name="description" content="${ogDescription}" />
      <link rel="canonical" href="${canonicalUrl}" />

      {/* Open Graph */}
      <meta property="og:title" content="${ogTitle}" />
      <meta property="og:description" content="${ogDescription}" />
      <meta property="og:type" content="${ogType}" />
      <meta property="og:url" content="${canonicalUrl}" />
      <meta property="og:image" content="${imageUrl}" />
      <meta property="og:site_name" content="${siteName}" />

      {/* Twitter */}
      <meta name="twitter:card" content="${twitterCard}" />
      <meta name="twitter:title" content="${ogTitle}" />
      <meta name="twitter:description" content="${ogDescription}" />
      <meta name="twitter:image" content="${imageUrl}" />
      <meta name="twitter:site" content="${twitterSite}" />
    </Helmet>
  );
}`;
  }, [ogTitle, ogDescription, canonicalUrl, ogType, imageUrl, siteName, twitterCard, twitterSite]);

  const activeCodeSnippet = useMemo(() => {
    if (activeCodeTab === "nextjs") return generatedNextJsCode;
    if (activeCodeTab === "react") return generatedReactHelmetCode;
    return generatedHtmlCode;
  }, [activeCodeTab, generatedHtmlCode, generatedNextJsCode, generatedReactHelmetCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeCodeSnippet], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeCodeTab === "html" ? "meta-tags.html" : activeCodeTab === "nextjs" ? "metadata.js" : "SeoTags.jsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Preset demo images
  const sampleImages = [
    { label: "SEO Dashboard", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop" },
    { label: "Modern Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop" },
    { label: "Analytics & Code", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop" },
  ];

  const faqs = [
    {
      q: "What is Open Graph (OG) and why is it critical for SEO and social sharing?",
      a: "The Open Graph protocol was created by Facebook and is now adopted by LinkedIn, Pinterest, WhatsApp, and Discord. It allows you to control how your URLs appear when shared on social media by defining custom rich titles, descriptions, and high-resolution thumbnail images instead of leaving it to platforms to guess."
    },
    {
      q: "What are the recommended dimensions for Open Graph and Twitter Card images in 2026?",
      a: "The industry standard size for Open Graph images (og:image) and Twitter Large Summary Cards (twitter:card=summary_large_image) is 1200 × 630 pixels (a 1.91:1 aspect ratio). The file size should be kept under 5MB (ideally under 1MB in WebP or JPG) to ensure rapid loading on mobile networks."
    },
    {
      q: "Why isn't Facebook or LinkedIn updating my updated social preview card?",
      a: "Social media platforms heavily cache Open Graph metadata for up to 30 days. To force Facebook to re-crawl your updated tags immediately, use the official Facebook Sharing Debugger (or LinkedIn Post Inspector) and click 'Scrape Again'."
    },
    {
      q: "What is the difference between og:image and twitter:image?",
      a: "og:image is part of the Open Graph standard used by Facebook, LinkedIn, WhatsApp, and Telegram. twitter:image is Twitter's proprietary tag. While Twitter will fall back to og:image if twitter:image is omitted, including both guarantees 100% cross-platform compatibility."
    },
    {
      q: "How do I implement these Open Graph tags in Next.js App Router?",
      a: "In Next.js 13+ and Next.js 14/15 App Router, you simply export a `metadata` object from your `layout.js` or `page.js` file. Click the 'Next.js App Router' tab above in the Code Output section to copy the clean, native JavaScript object directly."
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
            <span style={{ color: "#38bdf8", fontWeight: 600 }}>Open Graph Meta Tag Generator</span>
          </nav>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px" }}>
            <div style={{ maxWidth: "720px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "4px 12px", borderRadius: "4px", fontSize: "13px", color: "#38bdf8", marginBottom: "12px", fontWeight: 600 }}>
                <i className="fa-solid fa-share-nodes"></i> Pixel-Accurate Multi-Platform Previews
              </div>
              <h1 style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1.25, margin: "0 0 12px 0", color: "#ffffff" }}>
                Open Graph & Social Card Meta Tag Generator
              </h1>
              <p style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
                Generate pixel-accurate Open Graph, Twitter/X Cards, LinkedIn, and WhatsApp social previews. Preview live interactive cards and export production-ready HTML and Next.js metadata in 1-click.
              </p>
            </div>

            {/* Quick Audit Badge */}
            <div style={{ backgroundColor: "#1e293b", padding: "16px 20px", borderRadius: "4px", border: "1px solid #334155", minWidth: "220px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>OG Optimization Score</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: auditScore >= 80 ? "#22c55e" : auditScore >= 60 ? "#f59e0b" : "#ef4444" }}>
                {auditScore}<span style={{ fontSize: "20px", color: "#64748b" }}>/100</span>
              </div>
              <div style={{ fontSize: "12px", color: auditScore >= 80 ? "#86efac" : auditScore >= 60 ? "#fde047" : "#fca5a5" }}>
                {auditScore >= 80 ? "✨ Social Card Ready" : auditScore >= 60 ? "⚠️ Minor Improvements Needed" : "❌ Critical Tags Missing"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Grid */}
      <section style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px" }}>
          
          {/* Top Row: Form Editor (Left) & Live Social Preview Card (Right) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px", alignItems: "start" }}>
            
            {/* Input Form Column */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-sliders" style={{ color: "#2563eb" }}></i> Metadata Settings
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setOgTitle("Best Technical SEO Audit & Backlink Strategy in 2026");
                    setOgDescription("Forensic on-page analysis, 50+ technical audit checklist, Core Web Vitals optimization, and guaranteed Google ranking improvements.");
                    setCanonicalUrl("https://abdullahbdseo.com/services/technical-seo");
                    setImageUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop");
                  }}
                  style={{ fontSize: "12px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                >
                  <i className="fa-solid fa-rotate-left"></i> Reset Demo
                </button>
              </div>

              {/* Title Input */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                  <label htmlFor="og-title-input" style={{ fontWeight: 600, color: "#334155" }}>Page Title (og:title)</label>
                  <span style={{ color: ogTitle.length > 65 ? "#ef4444" : "#64748b" }}>{ogTitle.length} / 65 chars</span>
                </div>
                <input
                  id="og-title-input"
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Enter high-converting page title..."
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px", color: "#0f172a", boxSizing: "border-box" }}
                />
              </div>

              {/* Description Input */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                  <label htmlFor="og-desc-input" style={{ fontWeight: 600, color: "#334155" }}>Description (og:description)</label>
                  <span style={{ color: ogDescription.length > 160 ? "#ef4444" : "#64748b" }}>{ogDescription.length} / 160 chars</span>
                </div>
                <textarea
                  id="og-desc-input"
                  rows={3}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Enter compelling summary that boosts click-through rates..."
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px", color: "#0f172a", boxSizing: "border-box", resize: "vertical" }}
                />
              </div>

              {/* Canonical URL & Site Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label htmlFor="canonical-url-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Canonical URL (og:url)</label>
                  <input
                    id="canonical-url-input"
                    type="url"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://example.com/page"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label htmlFor="site-name-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Site Name (og:site_name)</label>
                  <input
                    id="site-name-input"
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Your Brand / Agency Name"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Image URL & Presets */}
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="image-url-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Image URL (og:image & twitter:image)</label>
                <input
                  id="image-url-input"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box", marginBottom: "8px" }}
                />
                
                {/* Sample Presets */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Quick Demo Images:</span>
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(s.url)}
                      style={{ fontSize: "11px", padding: "3px 8px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#334155", cursor: "pointer" }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Alt & Dimensions */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label htmlFor="image-alt-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Image Alt Text</label>
                  <input
                    id="image-alt-input"
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Descriptive image alt..."
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label htmlFor="image-width-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Width (px)</label>
                  <input
                    id="image-width-input"
                    type="number"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label htmlFor="image-height-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Height (px)</label>
                  <input
                    id="image-height-input"
                    type="number"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* OG Type & Twitter Card Format */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label htmlFor="og-type-select" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Open Graph Type (og:type)</label>
                  <select
                    id="og-type-select"
                    value={ogType}
                    onChange={(e) => setOgType(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", backgroundColor: "#ffffff" }}
                  >
                    <option value="website">website (Standard Homepage & Landing Pages)</option>
                    <option value="article">article (Blog Posts, News, Guides)</option>
                    <option value="product">product (E-commerce Products)</option>
                    <option value="profile">profile (Author / Personal Portfolio)</option>
                    <option value="video.movie">video (Video Content)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="twitter-card-select" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Twitter / X Card Type</label>
                  <select
                    id="twitter-card-select"
                    value={twitterCard}
                    onChange={(e) => setTwitterCard(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", backgroundColor: "#ffffff" }}
                  >
                    <option value="summary_large_image">summary_large_image (High CTR Full Banner)</option>
                    <option value="summary">summary (Compact Square Thumbnail)</option>
                  </select>
                </div>
              </div>

              {/* Social Handles */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label htmlFor="twitter-site-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Twitter Site Handle</label>
                  <input
                    id="twitter-site-input"
                    type="text"
                    value={twitterSite}
                    onChange={(e) => setTwitterSite(e.target.value)}
                    placeholder="@yourhandle"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label htmlFor="locale-input" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Locale (og:locale)</label>
                  <input
                    id="locale-input"
                    type="text"
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                    placeholder="en_US or bn_BD"
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Article Extra fields if ogType === 'article' */}
              {ogType === "article" && (
                <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "4px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>📰 Article Metadata Specifics</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <div>
                      <label htmlFor="author-name-input" style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "4px" }}>Author Name</label>
                      <input
                        id="author-name-input"
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="published-time-input" style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "4px" }}>Published Date</label>
                      <input
                        id="published-time-input"
                        type="date"
                        value={publishedTime}
                        onChange={(e) => setPublishedTime(e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="article-tags-input" style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "4px" }}>Article Tags (comma separated)</label>
                    <input
                      id="article-tags-input"
                      type="text"
                      value={articleTags}
                      onChange={(e) => setArticleTags(e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              )}

              {/* Robots indexing toggles */}
              <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#334155", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={robotsIndex}
                    onChange={(e) => setRobotsIndex(e.target.checked)}
                  />
                  Allow Indexing (robots: index)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#334155", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={robotsFollow}
                    onChange={(e) => setRobotsFollow(e.target.checked)}
                  />
                  Follow Links (robots: follow)
                </label>
              </div>

            </div>

            {/* Live Social Card Preview Column */}
            <div style={{ position: "sticky", top: "24px" }}>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: "24px" }}>
                
                {/* Preview Platform Tabs */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#0f172a" }}>
                    <i className="fa-solid fa-eye" style={{ color: "#0284c7" }}></i> Live Social Card Preview
                  </h2>
                  <div style={{ display: "flex", backgroundColor: "#f1f5f9", padding: "2px", borderRadius: "4px" }}>
                    {[
                      { id: "facebook", label: "Facebook", icon: "fa-brands fa-facebook" },
                      { id: "twitter", label: "Twitter / X", icon: "fa-brands fa-x-twitter" },
                      { id: "linkedin", label: "LinkedIn", icon: "fa-brands fa-linkedin" },
                      { id: "whatsapp", label: "WhatsApp", icon: "fa-brands fa-whatsapp" },
                      { id: "discord", label: "Discord", icon: "fa-brands fa-discord" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActivePreview(tab.id)}
                        style={{
                          padding: "6px 10px",
                          border: "none",
                          borderRadius: "4px",
                          backgroundColor: activePreview === tab.id ? "#ffffff" : "transparent",
                          color: activePreview === tab.id ? "#0f172a" : "#64748b",
                          fontWeight: activePreview === tab.id ? 700 : 500,
                          fontSize: "12px",
                          cursor: "pointer",
                          boxShadow: activePreview === tab.id ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px"
                        }}
                      >
                        <i className={tab.icon}></i> {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1. Facebook Preview */}
                {activePreview === "facebook" && (
                  <div style={{ border: "1px solid #dadde1", borderRadius: "4px", overflow: "hidden", backgroundColor: "#f0f2f5", fontFamily: "Helvetica, Arial, sans-serif" }}>
                    {/* FB Feed Header */}
                    <div style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#ffffff" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#1877f2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px" }}>
                        {siteName.charAt(0) || "A"}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#050505" }}>{siteName || "Page Name"}</div>
                        <div style={{ fontSize: "12px", color: "#65676b" }}>Just now · <i className="fa-solid fa-earth-americas"></i></div>
                      </div>
                    </div>
                    <div style={{ padding: "0 12px 10px 12px", fontSize: "14px", color: "#050505", backgroundColor: "#ffffff" }}>
                      Check out our latest update! 🔥
                    </div>
                    {/* FB Shared Link Card */}
                    <div style={{ borderTop: "1px solid #e4e6eb", backgroundColor: "#f0f2f5" }}>
                      {imageUrl ? (
                        <div style={{ width: "100%", height: "240px", backgroundColor: "#e2e8f0", overflow: "hidden" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imageUrl} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", backgroundColor: "#e2e8f0" }}>No Image Specified</div>
                      )}
                      <div style={{ padding: "10px 12px", backgroundColor: "#f0f2f5", borderTop: "1px solid #dadde1" }}>
                        <div style={{ fontSize: "12px", color: "#606770", textTransform: "uppercase", letterSpacing: "0.2px", marginBottom: "3px" }}>{domain}</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#1d2129", lineHeight: 1.3, marginBottom: "4px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {ogTitle || "Untitled Page"}
                        </div>
                        <div style={{ fontSize: "13px", color: "#606770", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {ogDescription || "No description provided."}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Twitter / X Preview */}
                {activePreview === "twitter" && (
                  <div style={{ border: "1px solid #cfd9de", borderRadius: "4px", overflow: "hidden", backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
                    {/* Tweet Header */}
                    <div style={{ padding: "12px", display: "flex", gap: "10px" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#000000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px" }}>
                        X
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <span style={{ fontWeight: 700, fontSize: "15px", color: "#0f1419" }}>{siteName}</span>
                          <span style={{ fontSize: "14px", color: "#536471" }}>{twitterSite} · 1m</span>
                        </div>
                        <div style={{ fontSize: "15px", color: "#0f1419", margin: "6px 0 10px 0" }}>
                          Excited to share this link with everyone! 👇
                        </div>

                        {/* Twitter Card Body */}
                        {twitterCard === "summary_large_image" ? (
                          <div style={{ border: "1px solid #cfd9de", borderRadius: "4px", overflow: "hidden" }}>
                            {imageUrl && (
                              <div style={{ width: "100%", height: "220px", overflow: "hidden", backgroundColor: "#e2e8f0" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imageUrl} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                            )}
                            <div style={{ padding: "10px 12px", backgroundColor: "#ffffff" }}>
                              <div style={{ fontSize: "13px", color: "#536471", marginBottom: "2px" }}>{domain}</div>
                              <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f1419", lineHeight: 1.3, marginBottom: "4px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {ogTitle}
                              </div>
                              <div style={{ fontSize: "14px", color: "#536471", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {ogDescription}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Compact Summary Card
                          <div style={{ display: "flex", border: "1px solid #cfd9de", borderRadius: "4px", overflow: "hidden" }}>
                            {imageUrl && (
                              <div style={{ width: "120px", height: "120px", flexShrink: 0, overflow: "hidden", backgroundColor: "#e2e8f0" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imageUrl} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                            )}
                            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                              <div style={{ fontSize: "12px", color: "#536471" }}>{domain}</div>
                              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f1419", margin: "2px 0 4px 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ogTitle}</div>
                              <div style={{ fontSize: "13px", color: "#536471", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ogDescription}</div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                )}

                {/* 3. LinkedIn Preview */}
                {activePreview === "linkedin" && (
                  <div style={{ border: "1px solid #e0e0e0", borderRadius: "4px", overflow: "hidden", backgroundColor: "#ffffff" }}>
                    <div style={{ padding: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "4px", backgroundColor: "#0a66c2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px" }}>
                        in
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "rgba(0,0,0,0.9)" }}>{siteName}</div>
                        <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)" }}>1,240 followers · 2h</div>
                      </div>
                    </div>
                    <div style={{ padding: "0 12px 10px 12px", fontSize: "14px", color: "rgba(0,0,0,0.9)" }}>
                      Super proud to share our newest insights with our network! 🚀
                    </div>
                    {/* LinkedIn Link Card */}
                    <div style={{ borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0" }}>
                      {imageUrl && (
                        <div style={{ width: "100%", height: "230px", overflow: "hidden", backgroundColor: "#f3f2ef" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imageUrl} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                      <div style={{ padding: "10px 12px", backgroundColor: "#f3f2ef" }}>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "rgba(0,0,0,0.9)", lineHeight: 1.3, marginBottom: "4px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {ogTitle}
                        </div>
                        <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)" }}>{domain}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. WhatsApp Preview */}
                {activePreview === "whatsapp" && (
                  <div style={{ backgroundColor: "#eae6df", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ maxWidth: "340px", marginLeft: "auto", backgroundColor: "#d9fdd3", borderRadius: "4px", padding: "6px", boxShadow: "0 1px 1px rgba(0,0,0,0.1)" }}>
                      <div style={{ borderRadius: "4px", overflow: "hidden", backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }}>
                        {imageUrl && (
                          <div style={{ width: "100%", height: "170px", overflow: "hidden" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageUrl} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        )}
                        <div style={{ padding: "8px 10px" }}>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#111b21", lineHeight: 1.3, marginBottom: "3px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {ogTitle}
                          </div>
                          <div style={{ fontSize: "12px", color: "#667781", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {ogDescription}
                          </div>
                          <div style={{ fontSize: "11px", color: "#8696a0", marginTop: "4px" }}>{domain}</div>
                        </div>
                      </div>
                      <div style={{ padding: "6px 4px 2px 4px", fontSize: "13px", color: "#111b21" }}>
                        {canonicalUrl}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Discord Embed */}
                {activePreview === "discord" && (
                  <div style={{ backgroundColor: "#313338", padding: "16px", borderRadius: "4px", color: "#dbdee1", fontFamily: "gg sans, 'Noto Sans', Helvetica, Arial, sans-serif" }}>
                    <div style={{ borderLeft: "4px solid #5865f2", backgroundColor: "#2b2d31", padding: "12px 14px", borderRadius: "4px", maxWidth: "420px" }}>
                      <div style={{ fontSize: "12px", color: "#949ba4", marginBottom: "4px" }}>{siteName}</div>
                      <a href={canonicalUrl} target="_blank" rel="noreferrer" style={{ fontSize: "15px", fontWeight: 700, color: "#00a8fc", textDecoration: "none", display: "block", marginBottom: "6px" }}>
                        {ogTitle}
                      </a>
                      <div style={{ fontSize: "13px", color: "#dbdee1", lineHeight: 1.4, marginBottom: "10px" }}>
                        {ogDescription}
                      </div>
                      {imageUrl && (
                        <div style={{ borderRadius: "4px", overflow: "hidden", maxHeight: "200px" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imageUrl} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Tag Quality Checklist */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 12px 0", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-list-check" style={{ color: "#10b981" }}></i> Social Tag Quality Checklist
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {auditChecks.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px" }}>
                      {item.status === "good" && <i className="fa-solid fa-circle-check" style={{ color: "#22c55e", marginTop: "2px" }}></i>}
                      {item.status === "warning" && <i className="fa-solid fa-triangle-exclamation" style={{ color: "#f59e0b", marginTop: "2px" }}></i>}
                      {item.status === "error" && <i className="fa-solid fa-circle-xmark" style={{ color: "#ef4444", marginTop: "2px" }}></i>}
                      {item.status === "info" && <i className="fa-solid fa-circle-info" style={{ color: "#3b82f6", marginTop: "2px" }}></i>}
                      <span style={{ color: "#334155", lineHeight: 1.4 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Full-Width Row: Generated Code Output Box */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a" }}>
                  <i className="fa-solid fa-code" style={{ color: "#6366f1" }}></i> Generated Code Snippets
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Copy or download standard HTML tags, Next.js metadata objects, or React Helmet components.
                </p>
              </div>

              {/* Code format selector */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ display: "flex", backgroundColor: "#f1f5f9", padding: "3px", borderRadius: "4px" }}>
                  {[
                    { id: "html", label: "Standard HTML <head>" },
                    { id: "nextjs", label: "Next.js App Router" },
                    { id: "react", label: "React Helmet" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCodeTab(tab.id)}
                      style={{
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: activeCodeTab === tab.id ? "#0f172a" : "transparent",
                        color: activeCodeTab === tab.id ? "#ffffff" : "#475569",
                        fontWeight: activeCodeTab === tab.id ? 700 : 500,
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

            {/* Code Block Container */}
            <div style={{ backgroundColor: "#0f172a", borderRadius: "4px", padding: "16px", overflowX: "auto", position: "relative" }}>
              <pre style={{ margin: 0, fontFamily: "Consolas, Monaco, 'Courier New', monospace", fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                <code>{activeCodeSnippet}</code>
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* Educational & Guide Section */}
      <section style={{ maxWidth: "1200px", margin: "48px auto", padding: "0 16px" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "4px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
            The Ultimate Guide to Open Graph & Social Meta Tags in 2026
          </h2>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, marginBottom: "20px" }}>
            When visitors share your website links on social media platforms like Facebook, Twitter/X, LinkedIn, WhatsApp, or Telegram, crawlers look for standardized <code>&lt;meta&gt;</code> tags inside your HTML <code>&lt;head&gt;</code> section. Having fully configured Open Graph and Twitter Card tags increases social Click-Through Rates (CTR) by up to <strong>300%</strong> compared to plain text links.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#2563eb", marginBottom: "8px" }}><i className="fa-solid fa-image"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>1200 × 630 Standard</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Use 1200px by 630px JPG or WebP images under 1MB. This exact 1.91:1 ratio renders crisp, edge-to-edge banners on both desktop and high-DPI smartphone screens.
              </p>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#10b981", marginBottom: "8px" }}><i className="fa-solid fa-lock"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Strict HTTPS Delivery</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Always use complete absolute URLs starting with <code>https://</code>. Both Facebook Graph API and WhatsApp crawler will reject relative paths or insecure HTTP links.
              </p>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", color: "#f59e0b", marginBottom: "8px" }}><i className="fa-solid fa-bolt"></i></div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>Cache Invalidation</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Social bots cache metadata aggressively. If your preview does not update after changing code, run your URL through Facebook&apos;s Sharing Debugger to clear server-side cache.
              </p>
            </div>
          </div>

          {/* Related Tools */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>Explore More Free SEO Tools</h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/tools/serp-simulator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                Google SERP Simulator →
              </Link>
              <Link href="/tools/schema-markup-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                JSON-LD Schema Generator →
              </Link>
              <Link href="/tools/seo-content-optimizer" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                On-Page SEO Optimizer →
              </Link>
              <Link href="/tools/url-slug-generator" style={{ padding: "8px 14px", backgroundColor: "#f1f5f9", color: "#2563eb", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                URL Slug Generator →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 64px auto", padding: "0 16px" }}>
        <ToolFaqAccordion faqs={faqs} title="Frequently Asked Questions: Open Graph & Social Sharing" />
      </section>
    </div>
  );
}
