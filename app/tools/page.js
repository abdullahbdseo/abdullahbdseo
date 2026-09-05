import Link from "next/link";
import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free SEO & Marketing Tools Suite | ${siteSettings.site_name}`,
  description: `Access 10 free in-house utilities for technical SEO auditing, schema markup generation, SERP preview, robots & sitemap building, HTTP headers, and ROI calculation.`
};

export default function ToolsHubPage() {
  return (
    <div className="tool-page-wrapper">
      <div className="container" style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Breadcrumb Pill */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "24px", display: "inline-flex" }}>
          <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "6px", background: "#f1f5f9", border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 500, color: "#64748b", listStyle: "none", margin: 0 }}>
            <li style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <i className="fa-solid fa-house" style={{ fontSize: "0.78rem" }}></i> Home
              </Link>
            </li>
            <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
            <li style={{ color: "#0f172a", fontWeight: 600 }}>Free SEO &amp; Growth Tools</li>
          </ol>
        </nav>

        {/* Page Introduction Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "9999px", color: "#2563eb", fontSize: "0.82rem", fontWeight: 600, marginBottom: "12px" }}>
            <i className="fa-solid fa-toolbox"></i> 100% Free • No Sign-up Required
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.15 }}>
            Free SEO &amp; Marketing Tools Suite
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#475569", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
            Practical utilities and data-driven calculators designed for webmasters, marketing leaders, and business owners. Instant results with zero fluff.
          </p>
        </div>

        {/* ================= SECTION 1: SEO & TECHNICAL OPTIMIZATION TOOLS ================= */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "12px", borderBottom: "2px solid #f1f5f9" }}>
            <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem" }}>
              <i className="fa-solid fa-magnifying-glass-chart"></i>
            </span>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>SEO &amp; Technical Optimization Tools</h2>
              <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Audit on-page SEO, generate structured data, simulate search snippets, and inspect server redirects.</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            {/* Tool 1: Website SEO Analyzer */}
            <article className="tool-ref-card" style={{ borderColor: "#bfdbfe", boxShadow: "0 6px 24px rgba(37, 99, 235, 0.08)" }}>
              <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/website-seo-analyzer">Website SEO Analyzer</Link>
              </h3>
              <p className="tool-ref-desc">
                Instantly audit your on-page SEO health score, Meta Title, Description, H1-H6 headings, OpenGraph social tags, and image alt attributes.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/website-seo-analyzer" className="tool-ref-link">
                  Audit Website <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Tool 2: Schema Markup Generator */}
            <article className="tool-ref-card" style={{ borderColor: "#cbd5e1" }}>
              <div className="tool-ref-icon" style={{ background: "#e0e7ff", color: "#4338ca" }}>
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/schema-markup-generator">Schema Markup Generator</Link>
              </h3>
              <p className="tool-ref-desc">
                Generate valid JSON-LD structured data for Local Business, Organization, Article, FAQ, Person, and Service with 1-click Google test.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/schema-markup-generator" className="tool-ref-link">
                  Generate Schema <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Tool 3: Google SERP Simulator */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                <i className="fa-brands fa-google"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/serp-simulator">SERP Simulator &amp; Meta Tags</Link>
              </h3>
              <p className="tool-ref-desc">
                Preview exactly how your web page appears on Google Desktop, Mobile, Facebook, and Twitter/X with live pixel length counters.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/serp-simulator" className="tool-ref-link">
                  Simulate SERP <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Tool 4: Robots.txt & Sitemap Builder */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#334155" }}>
                <i className="fa-solid fa-robot"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/robots-sitemap-generator">Robots.txt &amp; Sitemap Builder</Link>
              </h3>
              <p className="tool-ref-desc">
                Create and test crawler directives, block aggressive AI scrapers, optimize crawl budget, and build compliant XML sitemaps.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/robots-sitemap-generator" className="tool-ref-link">
                  Build Robots &amp; Sitemap <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Tool 5: Keyword Density & Readability */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#dcfce7", color: "#15803d" }}>
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/keyword-density-checker">Keyword Density &amp; Readability</Link>
              </h3>
              <p className="tool-ref-desc">
                Analyze 1-word, 2-word, and 3-word n-gram frequency, calculate Flesch reading ease score, and avoid Google keyword stuffing.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/keyword-density-checker" className="tool-ref-link">
                  Analyze Content <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Tool 6: HTTP Header & Redirect Tracer */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#fae8ff", color: "#a21caf" }}>
                <i className="fa-solid fa-network-wired"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/http-header-checker">HTTP Header &amp; Redirect Tracer</Link>
              </h3>
              <p className="tool-ref-desc">
                Trace multi-hop 301/302 redirect chains, check response status codes, verify SSL encryption, and audit vital security headers.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/http-header-checker" className="tool-ref-link">
                  Trace Headers <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

          </div>
        </div>

        {/* ================= SECTION 2: MARKETING & ROI CALCULATORS ================= */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "12px", borderBottom: "2px solid #f1f5f9" }}>
            <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem" }}>
              <i className="fa-solid fa-calculator"></i>
            </span>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Marketing &amp; ROI Calculators</h2>
              <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Model paid advertising returns, estimate project development costs, and project AI labor savings.</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>

            {/* Website Cost Calculator */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#475569" }}>
                <i className="fa-solid fa-calculator"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/website-cost-calculator">Website Cost Calculator</Link>
              </h3>
              <p className="tool-ref-desc">
                Estimate the investment range for a new website or a redesign, based on the scope you actually need.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/website-cost-calculator" className="tool-ref-link">
                  Calculate Estimate <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Google Ads ROI Calculator */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>
                <i className="fa-brands fa-google"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/google-ads-roi-calculator">Google Ads ROI Calculator</Link>
              </h3>
              <p className="tool-ref-desc">
                Model the return on a Google Ads budget using your own conversion rates and customer lifetime value.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/google-ads-roi-calculator" className="tool-ref-link">
                  Calculate ROI <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* Facebook Ads ROI Calculator */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                <i className="fa-brands fa-meta"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/facebook-ads-roi-calculator">Facebook Ads ROI Calculator</Link>
              </h3>
              <p className="tool-ref-desc">
                Model the return on a Facebook and Instagram Ads budget using your own conversion rates and customer value.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/facebook-ads-roi-calculator" className="tool-ref-link">
                  Calculate ROI <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            {/* AI Automation Savings Calculator */}
            <article className="tool-ref-card">
              <div className="tool-ref-icon" style={{ background: "#ecfdf5", color: "#059669" }}>
                <i className="fa-solid fa-robot"></i>
              </div>
              <h3 className="tool-ref-title">
                <Link href="/tools/ai-automation-savings-calculator">AI Automation Savings Calculator</Link>
              </h3>
              <p className="tool-ref-desc">
                See how many hours and what portion of payroll your team can recover each month with AI-assisted workflows.
              </p>
              <div className="tool-ref-footer">
                <Link href="/tools/ai-automation-savings-calculator" className="tool-ref-link">
                  Calculate Savings <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

          </div>
        </div>

        {/* Custom Request Banner */}
        <div style={{ marginTop: "60px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "16px", padding: "40px", textAlign: "center", color: "#ffffff" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 12px", color: "#ffffff" }}>Need a Custom Technical SEO Audit or Strategy?</h2>
          <p style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 24px", lineHeight: 1.6 }}>
            Automated tools are great, but human expertise finds deep architectural bottlenecks, indexation leaks, and untapped ranking opportunities.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ background: "#2563eb", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}>
              <i className="fa-solid fa-comments"></i> Book Free Consultation
            </Link>
            <Link href="/services" style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              View SEO Services <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
