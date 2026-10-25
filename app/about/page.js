"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteSettings as staticSiteSettings, testimonials as staticTestimonials } from "@/lib/data";
import { useLiveCMS } from "@/lib/useLiveCMS";

const fallbackReviews = [
  {
    name: "Mia Collins",
    role: "Director, Northline Digital",
    rating: 5,
    quote: "He rebuilt our service funnel around conversions, not vanity metrics. More qualified enquiries and far less manual follow-up.",
    avatar: "M",
  },
  {
    name: "Ryan Patel",
    role: "Co-Founder, ClickPilot Studio",
    rating: 5,
    quote: "Fast communication and a practical automation setup. Our lead handling is now smoother and much easier to track.",
    avatar: "R",
  },
  {
    name: "Sophie Turner",
    role: "Marketing Lead, BrightPath Solutions",
    rating: 5,
    quote: "The website improvements gave us a cleaner offer, stronger CTA flow, and noticeably better lead quality.",
    avatar: "S",
  },
  {
    name: "Alex Morgan",
    role: "Owner, ScaleForge Agency",
    rating: 5,
    quote: "Delivered exactly what was promised: technical precision, conversion-focused pages, and reporting that shows what is actually working.",
    avatar: "A",
  },
  {
    name: "Daniel Reed",
    role: "GrowthStack Media",
    rating: 5,
    quote: "Clear strategy, clean delivery, and better-quality leads within weeks. The KPI reporting made every business decision easier.",
    avatar: "D",
  },
];

const aboutFaqs = [
  {
    question: "Who is Abdullah Saleh and what makes him one of the top SEO experts in Bangladesh?",
    answer: "Abdullah Saleh is an Organic Business Growth Specialist and Technical SEO Architect with 6+ years of hands-on experience. Having scaled 100+ local and global businesses, his distinction lies in combining deep full-stack technical SEO, semantic topical authority, entity-based search optimization, and modern AI/LLM readiness (AEO & GEO). Rather than chasing vanity traffic, he focuses strictly on commercial intent and compounding business revenue."
  },
  {
    question: "What specific SEO services does Abdullah Saleh provide?",
    answer: "Abdullah provides end-to-end organic growth solutions including Technical SEO Audits & Core Web Vitals optimization, Local SEO & Google Business Profile ranking, E-commerce SEO (Shopify & WooCommerce), High-Authority White-Hat Link Building, Content Strategy & Topical Mapping, and cutting-edge AI Search Optimization (AEO, GEO, and Perplexity/ChatGPT citation building)."
  },
  {
    question: "How long does it typically take to see measurable SEO results?",
    answer: "While timeline varies based on domain authority, technical debt, and competition level, clients typically experience technical indexation improvements and early keyword movement within 30 to 60 days. Meaningful commercial organic traffic, Google top-3 rankings, and inbound lead generation generally mature significantly between months 3 and 6."
  },
  {
    question: "Does Abdullah Saleh only use 100% White-Hat, Google-compliant SEO?",
    answer: "Yes, absolutely. Abdullah strictly adheres to Google Search Essentials (formerly Webmaster Guidelines). He uses ethical, sustainable white-hat methodologies—semantic content architecture, authoritative editorial link building, genuine user-first UX, and clean technical foundations—ensuring your website never faces algorithmic or manual search penalties."
  },
  {
    question: "What is AI SEO, AEO, and GEO, and why does Abdullah specialize in them?",
    answer: "AI Search Optimization (AEO / Answer Engine Optimization & GEO / Generative Engine Optimization) optimizes your digital presence for generative search platforms like Google AI Overviews, ChatGPT Search, Perplexity AI, and Claude. Abdullah structures your brand entities, semantic schema data, and factual content capsules so that AI models cite your business as the premier verified answer."
  },
  {
    question: "How does Abdullah Saleh work with international clients outside of Bangladesh?",
    answer: "Over 70% of Abdullah's client portfolio consists of international brands across the United States, United Kingdom, Canada, Australia, and Europe. Working with global businesses is seamless through transparent weekly reporting dashboards, scheduled video consultations, Slack/WhatsApp channels, and timezone-aligned project delivery."
  }
];

export default function AboutPage() {
  const siteSettings = useLiveCMS("siteSettings", staticSiteSettings) || staticSiteSettings;
  const testimonials = useLiveCMS("testimonials", staticTestimonials) || staticTestimonials;
  const [activeSection, setActiveSection] = useState("about-expert");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about-expert",
        "philosophy",
        "expertise",
        "methodology",
        "ai-search",
        "tech-stack",
        "testimonials",
        "why-choose",
        "faq"
      ];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteSettings.expert_name || "Abdullah Saleh",
    "jobTitle": "Organic Business Growth Specialist & SEO Expert in Bangladesh",
    "image": "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
    "url": "https://abdullahbdseo.vercel.app/about",
    "email": siteSettings.contact_email || "abdullahbd.seo@gmail.com",
    "telephone": siteSettings.contact_phone || "+8801670769816",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka Division",
      "addressCountry": "Bangladesh"
    },
    "sameAs": [
      siteSettings.social_linkedin || "https://www.linkedin.com/in/abdullahbdseo/",
      siteSettings.social_twitter || "https://twitter.com/abdullahbdseo",
      siteSettings.social_facebook || "https://facebook.com/abdullahbdseo",
      siteSettings.social_github || "https://github.com/abdullahbdseo",
      siteSettings.social_youtube || "https://youtube.com/@abdullahbdseo"
    ],
    "description": "Abdullah Saleh is an Organic Business Growth Specialist and Technical SEO Architect in Bangladesh with 6+ years of experience helping 100+ businesses achieve sustainable Google #1 rankings, commercial traffic, and revenue growth.",
    "knowsAbout": [
      "Search Engine Optimization (SEO)",
      "Technical SEO",
      "Local SEO",
      "Ecommerce SEO",
      "AI SEO & Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Link Building",
      "Core Web Vitals",
      "Conversion Rate Optimization (CRO)",
      "Entity & Topical Authority"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="about-page-wrapper">
      {/* Structured Data Scripts for Google Rich Snippets & E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>

        {/* Main 2-Column Responsive Layout */}
        <div className="about-layout-grid">

          {/* Left Sticky Sidebar: Table of Contents */}
          <aside className="about-sidebar-toc">
            <nav className="about-sidebar-toc-nav" style={{ borderRadius: "4px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", padding: "4px 12px 10px", borderBottom: "1px solid #f1f5f9", marginBottom: "8px" }}>
                Table of Contents
              </div>
              <ul className="about-sidebar-toc-list">
                <li>
                  <a href="#about-expert" className={`about-toc-link ${activeSection === "about-expert" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-regular fa-user" style={{ width: "16px" }}></i>
                    <span>Expert Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#philosophy" className={`about-toc-link ${activeSection === "philosophy" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-regular fa-eye" style={{ width: "16px" }}></i>
                    <span>SEO Philosophy</span>
                  </a>
                </li>
                <li>
                  <a href="#expertise" className={`about-toc-link ${activeSection === "expertise" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-layer-group" style={{ width: "16px" }}></i>
                    <span>Core Expertise</span>
                  </a>
                </li>
                <li>
                  <a href="#methodology" className={`about-toc-link ${activeSection === "methodology" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-route" style={{ width: "16px" }}></i>
                    <span>5-Phase Blueprint</span>
                  </a>
                </li>
                <li>
                  <a href="#ai-search" className={`about-toc-link ${activeSection === "ai-search" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-microchip" style={{ width: "16px" }}></i>
                    <span>AI SEO &amp; GEO</span>
                  </a>
                </li>
                <li>
                  <a href="#tech-stack" className={`about-toc-link ${activeSection === "tech-stack" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-screwdriver-wrench" style={{ width: "16px" }}></i>
                    <span>Tools &amp; Tech Stack</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className={`about-toc-link ${activeSection === "testimonials" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-star" style={{ width: "16px", color: "#fbbf24" }}></i>
                    <span>Verified Reviews</span>
                  </a>
                </li>
                <li>
                  <a href="#why-choose" className={`about-toc-link ${activeSection === "why-choose" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-circle-check" style={{ width: "16px" }}></i>
                    <span>Why Choose Me</span>
                  </a>
                </li>
                <li>
                  <a href="#faq" className={`about-toc-link ${activeSection === "faq" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-circle-question" style={{ width: "16px" }}></i>
                    <span>FAQs</span>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Right Column: Main Content Area */}
          <div className="about-content-area">

            {/* Page Hero Header */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-award"></i>
                <span>Organic Business Growth Specialist &amp; Technical SEO Architect</span>
              </div>
              <h1 className="about-hero-title">
                Best SEO Expert in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Abdullah Saleh</span>
              </h1>
              <p className="about-hero-lead">
                I’m <strong>Abdullah Saleh</strong>, an Organic Business Growth Specialist and <strong>SEO Expert in Bangladesh</strong> with <strong>6+ years of hands-on experience</strong> in helping businesses scale search visibility and revenue. Over the years, I’ve partnered with <strong>100+ local and global companies</strong>, helping them dominate Google Search, capture commercial-intent keywords, build authoritative entity profiles, and turn organic visitors into paying customers.
              </p>
            </div>

            {/* Section 1: Expert Profile & Leadership */}
            <section id="about-expert" style={{ scrollMarginTop: "100px" }}>
              <div className="about-profile-card" style={{ borderRadius: "4px" }}>
                <div className="about-profile-flex">
                  <img
                    src="/images/abdullah.jpg"
                    alt="Abdullah Saleh - Best SEO Expert in Bangladesh"
                    className="about-profile-img"
                    style={{ borderRadius: "4px" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.55rem)", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      Abdullah Saleh
                    </h2>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                      ORGANIC BUSINESS GROWTH SPECIALIST · TECHNICAL SEO ARCHITECT
                    </p>
                    <p style={{ fontSize: "0.98rem", color: "#475569", lineHeight: 1.75, marginBottom: "12px" }}>
                      My journey in search began over 6 years ago when algorithmic shifts began demanding deeper technical execution, genuine search intent, and user experience. Rather than viewing SEO as simple keyword placement, I approach search as a comprehensive business discipline that connects <strong>crawl infrastructure</strong>, <strong>semantic topical mapping</strong>, <strong>editorial authority</strong>, and <strong>conversion funnel design</strong>.
                    </p>
                    <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                      Based in Dhaka, Bangladesh, I work closely with founders, agency owners, and marketing directors worldwide. Having engineered growth campaigns across SaaS, E-commerce, local enterprise, and B2B services, I understand how search intent and competition vary across different geographic markets.
                    </p>
                  </div>
                </div>

                {/* 6-Stat Metric Grid */}
                <div className="about-stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
                  <div className="about-stat-box" style={{ borderRadius: "4px" }}>
                    <div className="about-stat-number">6+ Years</div>
                    <div className="about-stat-label">Hands-On Experience</div>
                  </div>
                  <div className="about-stat-box" style={{ borderRadius: "4px" }}>
                    <div className="about-stat-number">100+ Brands</div>
                    <div className="about-stat-label">Scaled Worldwide</div>
                  </div>
                  <div className="about-stat-box" style={{ borderRadius: "4px" }}>
                    <div className="about-stat-number">$2M+</div>
                    <div className="about-stat-label">Organic Revenue Impact</div>
                  </div>
                  <div className="about-stat-box" style={{ borderRadius: "4px" }}>
                    <div className="about-stat-number">100%</div>
                    <div className="about-stat-label">White-Hat &amp; Safe</div>
                  </div>
                  <div className="about-stat-box" style={{ borderRadius: "4px" }}>
                    <div className="about-stat-number" style={{ color: "#059669" }}>AI &amp; GEO</div>
                    <div className="about-stat-label">LLM Engine Ready</div>
                  </div>
                  <div className="about-stat-box" style={{ borderRadius: "4px" }}>
                    <div className="about-stat-number">98%</div>
                    <div className="about-stat-label">Client Retention</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: SEO Philosophy */}
            <section id="philosophy" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-regular fa-eye"></i>
                <span>Search Philosophy</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                  Rankings That Drive Revenue, Not Just Vanity Traffic
                </h2>
                <p style={{ color: "#334155", fontSize: "1rem", lineHeight: 1.8, marginBottom: "18px" }}>
                  In the modern search landscape, high impression numbers and generic visitor spikes are meaningless if they don’t convert into real inquiries, sales, and long-term customer relationships. My philosophy centers on four fundamental pillars:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "20px" }}>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "#dbeafe", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800 }}>1</div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Intent Over Volume</h3>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                      Targeting high-intent, bottom-of-funnel keywords that attract ready-to-buy prospects rather than broad, unqualified traffic.
                    </p>
                  </div>

                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "#dbeafe", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800 }}>2</div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Topical Authority &amp; Entities</h3>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                      Building comprehensive semantic content hubs that establish your website as the definitive source in your industry niche.
                    </p>
                  </div>

                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "#dbeafe", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800 }}>3</div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Technical Cleanliness</h3>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                      Ensuring search engines can crawl, render, index, and understand every page effortlessly without crawl waste or speed bottlenecks.
                    </p>
                  </div>

                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "#dbeafe", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800 }}>4</div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Genuine White-Hat Equity</h3>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                      Earning legitimate editorial backlinks and brand citations that protect your domain against future algorithmic penalties.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Core Areas of Expertise */}
            <section id="expertise" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-layer-group"></i>
                <span>Core Areas of Expertise</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                  Comprehensive Search Optimization Capabilities
                </h2>
                <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "22px" }}>
                  Every client engagement receives a customized strategic execution across these core specialized domains:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                  {/* Service 1 */}
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0062d2", borderRadius: "4px", padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        <Link href="/services/technical-seo-service-in-bangladesh" style={{ color: "#0f172a", textDecoration: "none" }}>
                          Technical SEO &amp; Core Web Vitals Optimization
                        </Link>
                      </h3>
                      <Link href="/services/technical-seo-service-in-bangladesh" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        View Service <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                      Resolving complex crawlability issues, JavaScript rendering hurdles, pagination, canonicalization anomalies, XML sitemap hierarchies, and schema markup (JSON-LD). I optimize Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) to guarantee lightning-fast performance.
                    </p>
                  </div>

                  {/* Service 2 */}
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0062d2", borderRadius: "4px", padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        <Link href="/services/local-seo-service-in-bangladesh" style={{ color: "#0f172a", textDecoration: "none" }}>
                          Local SEO &amp; Google Business Profile Mastery
                        </Link>
                      </h3>
                      <Link href="/services/local-seo-service-in-bangladesh" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        View Service <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                      Dominating Google Maps Local 3-Pack rankings for local service businesses and multi-location franchises. Structured NAP consistency, localized geo-landing pages, high-relevance local citations, and proactive review generation systems.
                    </p>
                  </div>

                  {/* Service 3 */}
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0062d2", borderRadius: "4px", padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        <Link href="/services/ecommerce-seo-service-in-bangladesh" style={{ color: "#0f172a", textDecoration: "none" }}>
                          E-Commerce SEO (Shopify &amp; WooCommerce)
                        </Link>
                      </h3>
                      <Link href="/services/ecommerce-seo-service-in-bangladesh" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        View Service <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                      Architecting scalable product taxonomy, controlling faceted navigation bloat, building Product Schema with Merchant Center attributes, and capturing high-intent category search terms to scale direct online store revenue.
                    </p>
                  </div>

                  {/* Service 4 */}
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0062d2", borderRadius: "4px", padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        <Link href="/services/backlink-service-in-bangladesh" style={{ color: "#0f172a", textDecoration: "none" }}>
                          High-Impact White-Hat Link Building &amp; Digital PR
                        </Link>
                      </h3>
                      <Link href="/services/backlink-service-in-bangladesh" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        View Service <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                      Building authoritative, contextual editorial links from trusted high-DA publications. Clean anchor text ratio engineering, broken backlink reclamation, digital PR assets, and high-trust document sharing syndication that Google loves.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: The 5-Phase Blueprint */}
            <section id="methodology" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-route"></i>
                <span>Proven Methodology</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                  The 5-Phase Organic Growth Blueprint
                </h2>
                <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "20px" }}>
                  Predictable SEO success requires a disciplined, step-by-step engineering process. Here is how I manage campaigns from onboarding to top-tier rankings:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>01</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Deep Forensic Technical &amp; Content Audit</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Over 200+ checkpoints analyzed across log files, crawl paths, JavaScript execution, canonical tags, and existing content cannibalization to clear all ranking blockers.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>02</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Commercial Intent &amp; Entity Keyword Architecture</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Reverse engineering competitor keyword moats and structuring semantic content clusters around high-intent buyer queries that yield high conversion value.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>03</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>On-Page Optimization &amp; E-E-A-T Fortification</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Restructuring heading hierarchies, internal linking flows, author credential schema, and user-first answer capsules to demonstrate undeniable expertise to search algorithms.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>04</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>High-Authority Editorial Link Acquisition</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Executing targeted outreach to real, authoritative industry publications to earn natural contextual backlinks that safely build domain authority and trust signals.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>05</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Conversion Rate Optimization (CRO) &amp; Continuous Scaling</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Monitoring live behavioral heatmaps, click-through rates (CTR), and lead capture flows to turn newly acquired search traffic into compounding monthly revenue.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: AI SEO & Future of Search */}
            <section id="ai-search" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#059669", marginBottom: "14px" }}>
                <i className="fa-solid fa-microchip"></i>
                <span>AI-Driven Search &amp; Modern SEO</span>
              </div>

              <div style={{ background: "linear-gradient(180deg, #edf6ff 0%, #f4f9ff 100%)", border: "1px solid #dbeafe", borderLeft: "4px solid #059669", borderRadius: "4px", padding: "clamp(20px, 3vw, 28px)" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>
                  AI SEO, AEO, GEO &amp; LLM Citation Engineering
                </h2>
                <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.8, marginBottom: "14px" }}>
                  Search is currently undergoing its most transformative shift in two decades. Millions of consumers now discover answers directly through <strong>Google AI Overviews</strong>, <strong>ChatGPT Search</strong>, <strong>Perplexity AI</strong>, and <strong>Claude</strong>.
                </p>
                <p style={{ fontSize: "0.96rem", color: "#475569", lineHeight: 1.75, marginBottom: "16px" }}>
                  Traditional SEO alone is no longer sufficient. Through specialized{" "}
                  <Link href="/services/ai-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AI SEO</Link>,{" "}
                  <Link href="/services/aeo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AEO (Answer Engine Optimization)</Link>, and{" "}
                  <Link href="/services/geo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>GEO (Generative Engine Optimization)</Link>, I structure your web pages so that AI models recognize your brand as the definitive, verified authority and cite your content inside their answers.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "16px" }}>
                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>🤖 LLM Knowledge Extraction</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Direct entity data markup for AI crawlers.</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>⚡ Concise Answer Capsules</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Zero-click answer formatting for SGE &amp; AEO.</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>🌐 Brand Citation Authority</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Multi-channel validation across trusted nodes.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Tools & Technology Stack */}
            <section id="tech-stack" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <span>Data &amp; Technology Stack</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                  Industry-Leading Analytics &amp; Auditing Toolset
                </h2>
                <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "18px" }}>
                  Modern search strategy is purely data-driven. I leverage enterprise-grade intelligence platforms and developer frameworks to extract precise insights:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "4px" }}>
                    <div style={{ fontWeight: 800, color: "#0062d2", fontSize: "0.92rem", marginBottom: "4px" }}>Crawl &amp; Architecture</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155" }}>Screaming Frog SEO Spider, Sitebulb, Google Search Console, Log Analyzer.</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "4px" }}>
                    <div style={{ fontWeight: 800, color: "#0062d2", fontSize: "0.92rem", marginBottom: "4px" }}>Competitive &amp; Keyword Intel</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155" }}>Ahrefs Enterprise, SEMrush, Moz Pro, Keyword Insights, Google Trends.</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "4px" }}>
                    <div style={{ fontWeight: 800, color: "#0062d2", fontSize: "0.92rem", marginBottom: "4px" }}>Content &amp; Semantic NLP</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155" }}>SurferSEO, Clearscope, Schema Pro, Google Cloud Natural Language API.</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "4px" }}>
                    <div style={{ fontWeight: 800, color: "#0062d2", fontSize: "0.92rem", marginBottom: "4px" }}>Development &amp; Analytics</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155" }}>Google Analytics 4, Looker Studio, Next.js, Node.js, Python automation.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Verified Reviews (Marquee) */}
            <section id="testimonials" style={{ scrollMarginTop: "100px" }}>
              <div className="testimonial-marquee-container" style={{ borderRadius: "4px" }}>
                {/* Verified Reviews Pill */}
                <div className="verified-pill-badge" style={{ borderRadius: "4px" }}>
                  <span className="pill-stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className="pill-divider"></span>
                  <span className="pill-text">Verified Reviews</span>
                </div>

                <h2 className="marquee-section-title">What the Internet Finds About Me</h2>
                <p className="marquee-section-subtitle">
                  Real feedback and verified client reviews from international businesses, agency partners, and BlackHatWorld forum.
                </p>

                {/* Marquee Viewport */}
                <div className="marquee-viewport-mask">
                  <div className="marquee-track">
                    {(() => {
                      const reviewsList = (testimonials && testimonials.length > 0) ? testimonials : fallbackReviews;
                      return [...reviewsList, ...reviewsList].map((rev, idx) => {
                        const reviewQuote = rev.content || rev.quote || rev.text || "";
                        const authorAvatar = rev.avatar || (rev.name ? rev.name.charAt(0) : "★");
                        return (
                          <div key={idx} className="marquee-review-card" style={{ borderRadius: "4px" }}>
                            <div>
                              <div className="card-stars-row" aria-label={`${rev.rating || 5} out of 5 stars`}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <i
                                    key={star}
                                    className="fa-solid fa-star"
                                    style={{
                                      color: star <= (rev.rating || 5) ? "#fbbf24" : "#e2e8f0",
                                      fontSize: "0.85rem",
                                    }}
                                  ></i>
                                ))}
                              </div>
                              <p className="card-quote-body">
                                &ldquo;{reviewQuote}&rdquo;
                              </p>
                            </div>
                            <div className="card-bottom-row">
                              <div>
                                <h3 className="card-author-name">{rev.name}</h3>
                                <p className="card-author-title">{rev.role}</p>
                              </div>
                              <div className="card-avatar-badge" style={{ borderRadius: "4px" }}>{authorAvatar}</div>
                            </div>
                          </div>
                        );
                      });
                  })()}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Why Work With Me */}
            <section id="why-choose" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-circle-check"></i>
                <span>Competitive Advantage</span>
              </div>

              <div className="about-why-card" style={{ borderRadius: "4px" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "18px" }}>
                  Why Businesses Partner With Abdullah Saleh
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Direct Strategist Access &ndash; No Account Managers</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>You work directly with the senior SEO strategist engineering your campaign. No junior staff handoffs, no bureaucratic delays, and immediate tactical answers.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Commercial ROI &amp; Revenue-Focused Optimization</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Every keyword target, content piece, and backlink is selected based on commercial conversion potential, helping your business lower customer acquisition cost (CAC).</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>100% Transparent Weekly Dashboards</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>No ambiguous monthly PDF summaries. You receive live Google Looker Studio dashboards tracking keyword trajectories, organic conversions, and exact backlink URLs.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Future-Proofed for AI Answer Engines</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>While traditional agencies scramble to adapt to AI Overviews, my campaigns are natively structured for LLM citation extraction and conversational search engines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Frequently Asked Questions (FAQ) with Accordion */}
            <section id="faq" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-circle-question"></i>
                <span>Common Questions</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                  Frequently Asked Questions About Abdullah Saleh
                </h2>
                <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "20px" }}>
                  Everything you need to know about partnering with Abdullah Saleh for your organic growth campaign:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {aboutFaqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        style={{
                          border: "1px solid #e2e8f0",
                          borderRadius: "4px",
                          overflow: "hidden",
                          background: isOpen ? "#f8fafc" : "#ffffff",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : index)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "16px 18px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "14px"
                          }}
                        >
                          <span style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a" }}>
                            {faq.question}
                          </span>
                          <i
                            className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"}`}
                            style={{ color: "#0062d2", fontSize: "0.9rem", flexShrink: 0 }}
                          ></i>
                        </button>
                        {isOpen && (
                          <div style={{ padding: "0 18px 18px", color: "#475569", fontSize: "0.92rem", lineHeight: 1.75 }}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* CTA Box */}
            <div className="about-cta-container" style={{ borderRadius: "4px" }}>
              <h2 style={{ color: "#ffffff", fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)", marginBottom: "10px", fontWeight: 800 }}>
                Ready to Dominate Search and Scale Organic Revenue?
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.92)", fontSize: "0.98rem", maxWidth: "620px", margin: "0 auto 22px", lineHeight: 1.7 }}>
                Book a confidential 1-on-1 organic growth strategy session with Abdullah Saleh. Get a comprehensive diagnostic review of your website's search performance and a customized ranking roadmap.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  className="btn btn-lg"
                  style={{
                    background: "#ffffff",
                    color: "#0062d2",
                    fontWeight: 700,
                    border: "none",
                    borderRadius: "4px",
                    padding: "12px 28px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  Schedule Growth Consultation <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a
                  href={`https://wa.me/${(siteSettings.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontWeight: 700,
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "4px",
                    padding: "12px 24px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
