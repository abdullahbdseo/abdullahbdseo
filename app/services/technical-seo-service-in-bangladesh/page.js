"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function TechnicalSeoServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    issueType: "Indexing & Crawling Issues"
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: "Who is the best technical SEO expert in Bangladesh?",
      a: "Abdullah Saleh is one of the leading technical SEO experts in Bangladesh with 6+ years of hands-on experience fixing site speed, Core Web Vitals, crawling bottlenecks, and indexation errors for 100+ local and international websites. He handles all technical fixes personally with transparent before-and-after diagnostic data."
    },
    {
      q: "How much does technical SEO service cost in Bangladesh?",
      a: "Technical SEO services in Bangladesh typically range from ৳15,000 to ৳30,000 for a comprehensive one-time forensic audit and roadmap, or ৳25,000 to ৳60,000 per month for ongoing technical maintenance, Core Web Vitals remediation, and schema engineering."
    },
    {
      q: "How long does technical SEO take to show results?",
      a: "Technical improvements produce rapid early wins. Crawl error resolution and site speed boosts occur within 1 to 2 weeks. Rank improvements and organic impression growth typically become visible within 3 to 6 weeks as Google recrawls and re-evaluates the cleaned technical foundation."
    },
    {
      q: "Do I really need technical SEO for my website?",
      a: "Yes. Technical SEO is the foundation of organic ranking. If your website has crawl blocks, slow server response, broken canonicals, or rendering errors, search engines cannot index your content properly. Without solid technical SEO, even top-quality content and backlinks fail to rank."
    },
    {
      q: "Do you offer a free technical SEO audit?",
      a: "Yes. I review your website's crawlability, indexing status, Core Web Vitals speed, and technical architecture at no cost, and send you a prioritized summary of the biggest blockers hurting your rankings within 24 hours via WhatsApp or email."
    },
    {
      q: "Can technical SEO help my site appear in Google AI Overviews and ChatGPT?",
      a: "Yes. AI answer engines (ChatGPT, Google AI Overviews, Gemini, Perplexity) prioritize lightning-fast websites with clean semantic HTML, error-free structured data (Schema Markup), and direct answers. Clean technical SEO makes your content easily ingestible by LLMs and answer engines."
    },
    {
      q: "Do you work with WordPress, Shopify, WooCommerce, and custom platforms?",
      a: "Yes. I work across all CMS platforms and frameworks including WordPress, WooCommerce, Shopify, Magento, Laravel, and custom Next.js/React headless architectures. Each platform receives platform-specific optimization."
    },
    {
      q: "What is the difference between technical SEO and on-page SEO?",
      a: "Technical SEO focuses on how search engine bots crawl, render, index, and interpret your website (site speed, mobile responsiveness, XML sitemaps, robots.txt, schema). On-page SEO optimizes the content, keywords, headings, and search intent on the page. Technical SEO provides the indispensable base that allows on-page SEO to succeed."
    }
  ];

  const packages = [
    {
      name: "Forensic Technical Audit",
      subtitle: "Full deep-dive diagnostic for websites struggling to rank or index",
      priceBdt: "৳15,000",
      priceUsd: "$150",
      duration: "One-Time Delivery (5-7 Days)",
      isPopular: false,
      features: [
        "Complete 230+ Point Technical Crawl Audit",
        "Google Search Console & Indexation Error Analysis",
        "Core Web Vitals & Speed Bottleneck Report",
        "Robots.txt, Sitemaps & Canonical Audit",
        "Schema & Structured Data Validation",
        "Prioritized Developer-Ready Fix Roadmap",
        "1-Hour Strategic Strategy Call"
      ]
    },
    {
      name: "Core Web Vitals & Fixes",
      subtitle: "Hands-on implementation and speed remediation for business sites",
      priceBdt: "৳30,000",
      priceUsd: "$300",
      duration: "Full Remediation (10-14 Days)",
      isPopular: true,
      features: [
        "Everything in Forensic Technical Audit",
        "Direct Hands-On Fix of All High & Medium Errors",
        "Core Web Vitals Pass (LCP, INP, CLS Optimization)",
        "Image Compression & Next-Gen Format Setup",
        "JS & CSS Minification & Render-Blocking Fixes",
        "Custom Schema (Organization, Service, FAQ, Review)",
        "30 Days Post-Implementation Monitoring & Support"
      ]
    },
    {
      name: "Enterprise Technical Retainer",
      subtitle: "Continuous technical maintenance for large eCommerce & portals",
      priceBdt: "৳60,000",
      priceUsd: "$600",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Continuous Crawl Budget & Log File Analysis",
        "Faceted Navigation & Duplicate Content Architecture",
        "Dynamic XML Sitemap & Indexing Automation",
        "Advanced LLM & AI Search Schema Deployment",
        "Server Response Time & CDN Fine-Tuning",
        "Dedicated Developer Collaboration & Ticket Filing",
        "Real-Time WhatsApp Support & Bi-Weekly Meetings"
      ]
    }
  ];

  const technicalSeoServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Technical SEO Service in Bangladesh",
    "description": "Comprehensive technical SEO audits, Core Web Vitals remediation, crawl bottleneck fixes, and structured data engineering by Abdullah Saleh.",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteSettings.site_name,
      "url": "https://abdullahbdseo.vercel.app"
    },
    "offers": {
      "@type": "Offer",
      "price": "15000",
      "priceCurrency": "BDT"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "89",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const technicalBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://abdullahbdseo.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://abdullahbdseo.vercel.app/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Technical SEO Service in Bangladesh",
        "item": "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh"
      }
    ]
  };

  const technicalFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div style={{ background: "#ffffff", color: "#0f172a", fontFamily: "var(--font-sans, inherit)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(technicalSeoServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(technicalBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(technicalFaqSchema) }}
      />
      
      {/* 1. HERO SECTION WITH LEAD AUDIT FORM */}
      <section style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)", padding: "60px 0 50px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "40px", alignItems: "center" }}>
            
            {/* Left Content */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "16px" }}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <span>TECHNICAL SEO SPECIALIST BANGLADESH</span>
              </div>

              <h1 style={{ fontSize: "2.55rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.015em" }}>
                Best Technical SEO Service in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Fixes &amp; Ranks Your Site</span>
              </h1>

              <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.75, marginBottom: "24px" }}>
                Is your website slow, full of crawl errors, or missing from Google? Those hidden technical problems quietly block your rankings and revenue. My Technical SEO Service in Bangladesh fixes site speed, indexation, mobile responsiveness, and schema issues so Google and AI search engines can crawl, trust, and rank your pages.
              </p>

              {/* Key Bullet Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>6+ Years of Proven Technical SEO Expertise in Bangladesh</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>100+ Websites Audited, Fixed &amp; Ranked Across Dhaka &amp; Globally</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Core Web Vitals, JavaScript Rendering &amp; PageSpeed Specialist</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Google Certified, AI-Search &amp; LLM-Ready Strategies</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href="#audit-form" className="btn btn-lg" style={{ background: "#0062d2", color: "#ffffff", fontWeight: 700, borderRadius: "4px", padding: "12px 26px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Request Free Technical Audit <i className="fa-solid fa-arrow-down"></i>
                </a>
                <a href="https://wa.me/8801670769816" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "#059669", color: "#ffffff", fontWeight: 700, borderRadius: "4px", padding: "12px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.2rem" }}></i>
                  WhatsApp Now
                </a>
              </div>
            </div>

            {/* Right Lead Capture Box */}
            <div id="audit-form" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "28px", boxShadow: "0 10px 30px rgba(0,98,210,0.08)" }}>
              <div style={{ background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "4px", padding: "12px 16px", marginBottom: "18px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0062d2", margin: "0 0 4px" }}>
                  Free Website Technical Audit
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#475569", margin: 0 }}>
                  Discover the exact crawl blockers &amp; speed fixes holding your site back.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ padding: "30px 20px", textAlign: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px" }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "2.5rem", color: "#16a34a", marginBottom: "12px" }}></i>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#15803d", marginBottom: "6px" }}>Audit Request Received!</h4>
                  <p style={{ fontSize: "0.9rem", color: "#166534", margin: 0, lineHeight: 1.6 }}>
                    Thank you, <strong>{formData.name}</strong>. Abdullah Saleh will analyze your domain and send your custom audit report to your WhatsApp within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Type your name" 
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.95rem" }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Phone / WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="+880 1XXXXXXXXX" 
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.95rem" }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Website URL (Optional)
                    </label>
                    <input 
                      type="url" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleInputChange} 
                      placeholder="https://yourwebsite.com" 
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.95rem" }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Primary Concern
                    </label>
                    <select 
                      name="issueType" 
                      value={formData.issueType} 
                      onChange={handleInputChange} 
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.95rem", background: "#ffffff" }}
                    >
                      <option value="Indexing & Crawling Issues">Indexing &amp; Crawling Issues</option>
                      <option value="Slow Speed & Core Web Vitals">Slow Speed &amp; Core Web Vitals</option>
                      <option value="Rankings Dropped Suddenly">Rankings Dropped Suddenly</option>
                      <option value="Full Website Architecture Audit">Full Website Architecture Audit</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="btn" 
                    style={{ background: "#0062d2", color: "#ffffff", fontWeight: 700, padding: "12px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "1rem", marginTop: "4px" }}
                  >
                    Get Free Audit Report
                  </button>

                  <div style={{ fontSize: "0.78rem", color: "#64748b", textAlign: "center", lineHeight: 1.4 }}>
                    <i className="fa-solid fa-lock" style={{ marginRight: "4px" }}></i>
                    Detailed ranking and speed analysis sent within 24 hours.
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHAT IS TECHNICAL SEO? */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "30px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-lightbulb"></i>
                <span>THE STOREFRONT ANALOGY</span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                Why Technical SEO is Your Digital Foundation
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: "0 0 14px" }}>
                Think of your website like a physical store. Your content is the product on the shelves. Technical SEO is the front door, the lighting, the electrical wiring, and the cash register.
              </p>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                If the front door is locked (crawl blocker) or the lights are off (slow rendering), shoppers cannot buy—even if your products are world-class. When technical SEO is clean, Google walks in easily and puts your pages in front of ready buyers.
              </p>
            </div>

            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
                <i className="fa-solid fa-book-open"></i>
                <span>DEFINITION &amp; SCOPE</span>
              </div>
              <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25, marginBottom: "16px" }}>
                What Is Technical SEO?
              </h2>
              <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.75, marginBottom: "16px" }}>
                Technical SEO is the discipline of optimizing your website’s backend architecture so search engine spiders can crawl, render, index, and understand your pages efficiently.
              </p>
              
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <i className="fa-solid fa-gauge-high" style={{ color: "#0062d2", width: "16px" }}></i>
                  <span><strong>Site Speed &amp; CWV:</strong> How fast and smoothly pages load for users.</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <i className="fa-solid fa-spider" style={{ color: "#0062d2", width: "16px" }}></i>
                  <span><strong>Crawlability:</strong> Ensuring Googlebot and Bingbot can read pages without traps.</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <i className="fa-solid fa-list-check" style={{ color: "#0062d2", width: "16px" }}></i>
                  <span><strong>Indexation Control:</strong> Ensuring valuable pages are in Google’s index.</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <i className="fa-solid fa-code" style={{ color: "#0062d2", width: "16px" }}></i>
                  <span><strong>Schema &amp; Structured Data:</strong> Code helping Google &amp; AI understand context.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 6 CORE TECHNICAL SEO SERVICES I OFFER */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-cubes"></i>
              <span>CORE SERVICES</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              My Technical SEO Services in Bangladesh
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              Search engines cannot rank what they cannot crawl or trust. I fix hidden technical errors, building a fast, future-proof foundation that ranks today and stays AI search ready.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                1. Full Website SEO Audit
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                A forensic crawl audit of your entire site using Google Search Console, Screaming Frog, and PageSpeed Insights. I find broken links, 404/500 errors, redirect loops, duplicate content, and orphaned URLs with a prioritized fix list.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                2. Site Speed &amp; Core Web Vitals
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Slow sites lose visitors and Google ranks. I remediate LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift) by optimizing image payloads, deferring unused JS, and fixing render-blocking CSS.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-compass"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                3. Indexing &amp; Crawl Budget Control
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                If Google cannot index your pages, they cannot rank. I configure robots.txt directives, XML sitemaps, canonical tags, and pagination to eliminate crawl budget waste and ensure your high-value commercial pages index rapidly.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-sitemap"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                4. Site Architecture &amp; Internal Links
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                A disorganized site confuses users and bots. I restructure your URL hierarchy, navigation menus, and semantic internal linking to pass PageRank efficiently to your most important revenue-generating landing pages.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                5. Schema &amp; Structured Data Implementation
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Schema markup explains what your pages mean, not just what they say. I implement custom JSON-LD Schema (Organization, Service, FAQ, Product, Review, LocalBusiness) to earn rich snippets and AI answer citations.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-mobile-screen"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                6. Mobile-First &amp; Responsive Optimization
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Over 80% of Bangladeshi traffic is mobile, and Google uses mobile-first indexing exclusively. I fix viewport sizing, tap target spacing, mobile script execution, and responsive layout shifts across all devices.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE ABDULLAH SALEH */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-circle-check"></i>
              <span>WHY WORK WITH ME</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Why Choose Me As Your Technical SEO Expert in Bangladesh
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              Most agencies hand your site to junior interns and hide behind automated tool reports. I personally diagnose and implement every technical fix myself.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-hand-holding-hand" style={{ color: "#0062d2" }}></i>
                Hand-Crafted Fixes, Never Automated Shortcuts
              </h4>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                I don’t just run a tool and send an unreadable 50-page PDF. I inspect server headers, DOM rendering, schema validation, and real Google Search Console logs to fix root causes by hand.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-chart-line" style={{ color: "#0062d2" }}></i>
                Transparent Before-and-After Evidence
              </h4>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Every fix is verified with before-and-after Core Web Vitals lab data, GSC indexing verification, and ranking movements so you see the measurable return on your investment.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-shield-halved" style={{ color: "#0062d2" }}></i>
                Google Core &amp; Helpful Content Safe
              </h4>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Ethical technical optimization designed around Google’s official search guidelines. Your site stays protected from algorithm penalties and Core update volatility.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-code-branch" style={{ color: "#0062d2" }}></i>
                Direct Developer Collaboration
              </h4>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Whether you have an in-house developer or need me to apply the code changes directly to your WordPress, Shopify, or Next.js repository, I make execution seamless.
              </p>
            </div>

          </div>

          {/* 4-Stat Metric Box */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "36px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0062d2" }}>6+ Years</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Technical SEO Experience</div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0062d2" }}>100+ Sites</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Audited &amp; Recovered</div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0062d2" }}>90+ Score</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Average Health Score</div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#059669" }}>24 Hours</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Free Audit Turnaround</div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PRICING & PACKAGES MATRIX */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }} id="pricing">
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-tags"></i>
              <span>TRANSPARENT PRICING</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Technical SEO Packages &amp; Plans
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              Transparent pricing with clear deliverables, developer tickets, and post-fix validation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "stretch" }}>
            {packages.map((pkg, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: "#ffffff", 
                  border: pkg.isPopular ? "2px solid #0062d2" : "1px solid #e2e8f0", 
                  borderRadius: "6px", 
                  padding: "32px", 
                  display: "flex", 
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: pkg.isPopular ? "0 10px 30px rgba(0,98,210,0.12)" : "0 4px 15px rgba(0,0,0,0.03)"
                }}
              >
                {pkg.isPopular && (
                  <div style={{ position: "absolute", top: "-12px", right: "20px", background: "#0062d2", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, padding: "4px 12px", borderRadius: "4px", textTransform: "uppercase" }}>
                    Most Popular Choice
                  </div>
                )}

                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>{pkg.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "18px", minHeight: "36px" }}>{pkg.subtitle}</p>

                <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0062d2" }}>
                    {pkg.priceBdt}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>({pkg.priceUsd} USD &middot; {pkg.duration})</div>
                </div>

                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                  Included In This Plan:
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#334155", lineHeight: 1.5 }}>
                      <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", marginTop: "3px", flexShrink: 0 }}></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact" 
                  className="btn btn-lg" 
                  style={{ 
                    background: pkg.isPopular ? "#0062d2" : "#f1f5f9", 
                    color: pkg.isPopular ? "#ffffff" : "#0f172a", 
                    fontWeight: 700, 
                    borderRadius: "4px", 
                    padding: "12px 20px", 
                    textAlign: "center", 
                    textDecoration: "none",
                    border: pkg.isPopular ? "none" : "1px solid #cbd5e1"
                  }}
                >
                  Choose {pkg.name}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. VERIFIED GOOGLE CLIENT REVIEWS */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-star"></i>
              <span>GOOGLE REVIEWS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Client Reviews of My Technical SEO Service
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              Honest feedback from business owners whose websites I helped speed up, fix, and rank.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ display: "flex", gap: "4px", color: "#eab308", marginBottom: "12px" }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.65, fontStyle: "italic", marginBottom: "16px" }}>
                &ldquo;When I found some critical technical SEO issues on my website, I contacted Abdullah Saleh. He solved all our crawl and Core Web Vitals issues within just 7 days. Our site health score reached 93 and traffic increased significantly.&rdquo;
              </p>
              <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>Amdadul Islam</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Business Owner, Dhaka</div>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ display: "flex", gap: "4px", color: "#eab308", marginBottom: "12px" }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.65, fontStyle: "italic", marginBottom: "16px" }}>
                &ldquo;My website was invisible on Google after a major core update. Abdullah restructured our technical architecture, fixed indexing errors, and implemented schema markup. Within 3 months, rankings and inbound leads rebounded strongly.&rdquo;
              </p>
              <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>Sayed Mobarak Ali</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Managing Director, E-Commerce Brand</div>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ display: "flex", gap: "4px", color: "#eab308", marginBottom: "12px" }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.65, fontStyle: "italic", marginBottom: "16px" }}>
                &ldquo;As a law firm based in NY, we needed flawless technical SEO and fast mobile load times to stay competitive. Abdullah Saleh provided prompt, detailed fixes that improved our search visibility and client case inquiries.&rdquo;
              </p>
              <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>Shim Law Group</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Legal Practice, New York</div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-circle-question"></i>
              <span>FAQS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Frequently Asked Questions About Technical SEO
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748b", marginTop: "8px" }}>
              Clear answers to common questions about technical crawlability, speed, and indexing.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: "#ffffff", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "6px", 
                  overflow: "hidden",
                  transition: "all 0.2s ease"
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: activeFaq === idx ? "#0062d2" : "#0f172a"
                  }}
                >
                  <span>{faq.q}</span>
                  <i 
                    className={`fa-solid ${activeFaq === idx ? "fa-chevron-up" : "fa-chevron-down"}`}
                    style={{ color: activeFaq === idx ? "#0062d2" : "#94a3b8", fontSize: "0.9rem" }}
                  ></i>
                </button>

                {activeFaq === idx && (
                  <div style={{ padding: "0 22px 20px", fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section style={{ padding: "70px 0", background: "linear-gradient(135deg, #0062d2 0%, #004bb5 100%)", color: "#ffffff", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#ffffff", marginBottom: "14px", lineHeight: 1.25 }}>
            Ready to Fix Your Technical SEO Bottlenecks?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: "28px" }}>
            Get a free forensic technical crawl audit of your website. I will identify the exact errors blocking your rankings and share a clear action roadmap.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-lg" style={{ background: "#ffffff", color: "#0062d2", fontWeight: 700, borderRadius: "4px", padding: "14px 30px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Request Free Technical Audit <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <a href="https://wa.me/8801670769816" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "#059669", color: "#ffffff", fontWeight: 700, borderRadius: "4px", padding: "14px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.2rem" }}></i>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
