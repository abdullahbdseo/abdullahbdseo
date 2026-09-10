import Link from "next/link";
import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free SEO & Marketing Tools Suite | ${siteSettings.site_name}`,
  description: `Access 12 free in-house utilities for deep SEO auditing, technical analysis, schema markup, SERP preview, robots & sitemap building, and ROI calculation.`
};

export default function ToolsHubPage() {
  const seoTools = [
    {
      title: "Deep SEO Audit & Report",
      href: "/tools/deep-seo-audit",
      icon: "fa-solid fa-magnifying-glass-chart",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      badge: "26+ Point Audit",
      desc: "Perform a full 26+ point technical & on-page SEO inspection. Get instant grades, critical issue diagnosis, and a downloadable CSV audit report."
    },
    {
      title: "Google SERP Simulator",
      href: "/tools/serp-simulator",
      icon: "fa-brands fa-google",
      iconBg: "#fef3c7",
      iconColor: "#d97706",
      badge: "SERP Preview",
      desc: "Simulate how your meta title and description appear in Google Desktop and Mobile search results with real-time character & pixel width limits."
    },
    {
      title: "JSON-LD Schema Generator",
      href: "/tools/schema-markup-generator",
      icon: "fa-solid fa-code",
      iconBg: "#e0e7ff",
      iconColor: "#4338ca",
      badge: "Structured Data",
      desc: "Generate Google-compliant JSON-LD structured data for rich snippets, FAQs, Local Businesses, Articles, and Organizations with 1-click test."
    },
    {
      title: "Keyword Density Checker",
      href: "/tools/keyword-density-checker",
      icon: "fa-solid fa-chart-simple",
      iconBg: "#dcfce7",
      iconColor: "#15803d",
      badge: "Content Analysis",
      desc: "Analyze 1-word and 2-word semantic n-gram frequency, calculate reading ease, and prevent algorithmic keyword stuffing search penalties."
    },
    {
      title: "Robots.txt & Sitemap Builder",
      href: "/tools/robots-sitemap-generator",
      icon: "fa-solid fa-robot",
      iconBg: "#f1f5f9",
      iconColor: "#334155",
      badge: "Crawl Directives",
      desc: "Build crawler directives, block aggressive AI scrapers, optimize crawl budgets, and generate compliant XML sitemaps for Google indexation."
    },
    {
      title: "HTTP Header & Redirect Tracer",
      href: "/tools/http-header-checker",
      icon: "fa-solid fa-network-wired",
      iconBg: "#fae8ff",
      iconColor: "#a21caf",
      badge: "Server Diagnostic",
      desc: "Inspect live HTTP response codes (200, 301, 302, 404, 500), server latency TTFB, SSL certificates, and critical security headers."
    }
  ];

  const calcTools = [
    {
      title: "Google Ads ROI Calculator",
      href: "/tools/google-ads-roi-calculator",
      icon: "fa-brands fa-google",
      iconBg: "#fee2e2",
      iconColor: "#dc2626",
      badge: "Paid Search",
      desc: "Model click volume, lead conversion rates, customer lifetime value (LTV), and project your return on ad spend (ROAS) and CPA."
    },
    {
      title: "Facebook Ads ROI Calculator",
      href: "/tools/facebook-ads-roi-calculator",
      icon: "fa-brands fa-meta",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
      badge: "Paid Social",
      desc: "Forecast impressions, click-through rates, e-commerce purchases, and blended return on ad spend for Meta campaigns."
    },
    {
      title: "Website Cost Calculator",
      href: "/tools/website-cost-calculator",
      icon: "fa-solid fa-calculator",
      iconBg: "#f1f5f9",
      iconColor: "#475569",
      badge: "Scope Estimator",
      desc: "Configure technical scope, CMS requirements, page scale, and add-on modules to estimate development and optimization investments."
    },
    {
      title: "AI Automation Savings",
      href: "/tools/ai-automation-savings-calculator",
      icon: "fa-solid fa-microchip",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      badge: "Labor Efficiency",
      desc: "Calculate how automating repetitive marketing and operational workflows with AI and programmatic SEO reduces payroll overhead."
    }
  ];

  return (
    <div className="tool-page-wrapper">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", display: "inline-flex" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "6px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", listStyle: "none", margin: 0 }}>
              <li style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Link href="/" style={{ color: "#475569", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <i className="fa-solid fa-house" style={{ fontSize: "0.78rem" }}></i> Home
                </Link>
              </li>
              <li><i className="fa-solid fa-angle-right" style={{ fontSize: "0.72rem", color: "#94a3b8" }}></i></li>
              <li style={{ color: "#0f172a", fontWeight: 700 }}>Free SEO &amp; Growth Tools</li>
            </ol>
          </nav>

          {/* Title & Subtitle */}
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <div className="sub-badge" style={{ marginBottom: "14px" }}>
              <i className="fa-solid fa-toolbox"></i> 100% Free · No Sign-up Required · Client-Side Fast
            </div>
            <h1 className="page-title" style={{ fontSize: "2.8rem" }}>
              Free SEO &amp; Growth Marketing Tools Suite
            </h1>
            <p className="page-subtitle">
              Professional diagnostic utilities and data-driven ROI calculators designed for founders, technical marketers, and SEO specialists. Instant results with zero fluff.
            </p>
          </div>

          {/* Trust Value Badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "28px", flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
              <i className="fa-solid fa-circle-check text-success"></i> Google Guideline Compliant
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
              <i className="fa-solid fa-bolt text-primary"></i> Real-time Instant Calculations
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155", fontWeight: 600 }}>
              <i className="fa-solid fa-shield-halved" style={{ color: "#8b5cf6" }}></i> 100% Privacy &amp; Data Safe
            </div>
          </div>

        </div>
      </section>

      {/* Main Tools Sections */}
      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* ================= SECTION 1: SEO & TECHNICAL OPTIMIZATION TOOLS ================= */}
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px", paddingBottom: "14px", borderBottom: "2px solid #e2e8f0" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </span>
              <div>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Technical SEO &amp; Optimization Utilities
                </h2>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Audit on-page SEO health, generate JSON-LD schema, simulate Google SERP snippets, and verify crawler directives.
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {seoTools.map((tool, idx) => (
                <article key={idx} className="tool-ref-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div className="tool-ref-icon" style={{ background: tool.iconBg, color: tool.iconColor, margin: 0 }}>
                      <i className={tool.icon}></i>
                    </div>
                    <span style={{ fontSize: "0.75rem", padding: "3px 10px", background: "#f1f5f9", borderRadius: "4px", color: "#475569", fontWeight: 700 }}>
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="tool-ref-title">
                    <Link href={tool.href}>{tool.title}</Link>
                  </h3>
                  <p className="tool-ref-desc">
                    {tool.desc}
                  </p>
                  <div className="tool-ref-footer">
                    <Link href={tool.href} className="tool-ref-link">
                      Launch Free Tool <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ================= SECTION 2: MARKETING & ROI CALCULATORS ================= */}
          <div style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px", paddingBottom: "14px", borderBottom: "2px solid #e2e8f0" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                <i className="fa-solid fa-calculator"></i>
              </span>
              <div>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Marketing ROI &amp; Investment Calculators
                </h2>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Model paid search &amp; social advertising returns, estimate development budgets, and project AI labor savings.
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {calcTools.map((tool, idx) => (
                <article key={idx} className="tool-ref-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div className="tool-ref-icon" style={{ background: tool.iconBg, color: tool.iconColor, margin: 0 }}>
                      <i className={tool.icon}></i>
                    </div>
                    <span style={{ fontSize: "0.75rem", padding: "3px 10px", background: "#f1f5f9", borderRadius: "4px", color: "#475569", fontWeight: 700 }}>
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="tool-ref-title">
                    <Link href={tool.href}>{tool.title}</Link>
                  </h3>
                  <p className="tool-ref-desc">
                    {tool.desc}
                  </p>
                  <div className="tool-ref-footer">
                    <Link href={tool.href} className="tool-ref-link">
                      Launch Free Calculator <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Custom SEO & Consultation Banner */}
          <div style={{ marginTop: "40px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "6px", padding: "44px 36px", textAlign: "center", color: "#ffffff", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.2)" }}>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 800, margin: "0 0 12px", color: "#ffffff" }}>
              Need a Custom Technical SEO Audit or Dedicated Organic Strategy?
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", maxWidth: "680px", margin: "0 auto 26px", lineHeight: 1.6 }}>
              Automated tools are great for initial diagnostics, but human expertise discovers deep architectural bottlenecks, indexation leaks, and untapped keyword ranking opportunities.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#2563eb", color: "#ffffff", padding: "12px 28px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}>
                <i className="fa-solid fa-comments"></i> Book Free Growth Consultation
              </Link>
              <Link href="/services" style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", padding: "12px 28px", borderRadius: "4px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                View All SEO Services <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
