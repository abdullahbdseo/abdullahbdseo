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

  // Quick SEO Audit Lead Magnet State (Recommendation #4)
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditPhone, setAuditPhone] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);
  const [auditError, setAuditError] = useState(null);

  // Recommendation #5: Executive Capability Deck Modal State
  const [showDeckModal, setShowDeckModal] = useState(false);

  // Recommendation #6: 1-Click Strategy Meeting Scheduler State
  const [meetingType, setMeetingType] = useState("15-Min Quick Search Diagnostic & Q&A");
  const [meetingDate, setMeetingDate] = useState("Tomorrow (Recommended)");
  const [meetingTime, setMeetingTime] = useState("04:00 PM BST (10:00 AM EST)");
  const [meetingName, setMeetingName] = useState("");
  const [meetingEmail, setMeetingEmail] = useState("");
  const [meetingWebsite, setMeetingWebsite] = useState("");
  const [meetingNote, setMeetingNote] = useState("");
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [meetingSuccess, setMeetingSuccess] = useState(false);
  const [meetingError, setMeetingError] = useState(null);

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    if (!meetingName.trim() || !meetingEmail.trim() || !meetingWebsite.trim()) {
      setMeetingError("Please provide your Name, Business Email, and Website URL.");
      return;
    }
    setMeetingLoading(true);
    setMeetingError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: meetingName.trim(),
          email: meetingEmail.trim(),
          website: meetingWebsite.trim(),
          service_interest: "1-Click Strategy Meeting",
          message: `Booked Strategy Session with Abdullah Saleh:\n- Focus: ${meetingType}\n- Date: ${meetingDate}\n- Time: ${meetingTime}\n- Website: ${meetingWebsite.trim()}\n- Client Note: ${meetingNote.trim() || "None specified"}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMeetingSuccess(true);
        setMeetingError(null);
      } else {
        setMeetingError(data.error || "Booking failed. Please connect directly on WhatsApp.");
      }
    } catch (err) {
      setMeetingError("Network error. Please try again or connect via WhatsApp.");
    } finally {
      setMeetingLoading(false);
    }
  };

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    if (!auditUrl.trim() || !auditEmail.trim()) {
      setAuditError("Please enter both your Website URL and Business Email.");
      return;
    }
    setAuditLoading(true);
    setAuditError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: auditEmail.split("@")[0] || "Audit Lead",
          email: auditEmail.trim(),
          phone: auditPhone.trim(),
          website: auditUrl.trim(),
          service_interest: "Free 120-Point SEO Audit",
          message: `Requested Free 120-Point SEO Audit from About page for website: ${auditUrl.trim()}${auditPhone ? ` | WhatsApp/Phone: ${auditPhone.trim()}` : ""}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuditSuccess(true);
        setAuditError(null);
      } else {
        setAuditError(data.error || "Submission failed. Please message directly on WhatsApp.");
      }
    } catch (err) {
      setAuditError("Network error. Please try again or reach out on WhatsApp.");
    } finally {
      setAuditLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about-expert",
        "case-studies",
        "philosophy",
        "expertise",
        "methodology",
        "ai-search",
        "tech-stack",
        "testimonials",
        "why-choose",
        "book-meeting",
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
      "streetAddress": "Mirpur DOHS",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka Division",
      "postalCode": "1216",
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
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google Analytics 4 (GA4) Certification",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Google Skillshop"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Semrush Technical SEO Accreditation",
        "credentialCategory": "Professional Accreditation",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Semrush Academy"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "HubSpot Inbound SEO Certification",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "HubSpot Academy"
        }
      }
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
                  <a href="#case-studies" className={`about-toc-link ${activeSection === "case-studies" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-solid fa-chart-line" style={{ width: "16px" }}></i>
                    <span>Proven Results</span>
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
                    <span>6-Phase Blueprint</span>
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
                  <a href="#book-meeting" className={`about-toc-link ${activeSection === "book-meeting" ? "active" : ""}`} style={{ borderRadius: "4px" }}>
                    <i className="fa-regular fa-calendar-check" style={{ width: "16px" }}></i>
                    <span>Book Strategy Call</span>
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
                <div className="about-stats-grid">
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

                {/* Official Industry Certifications & Accreditations (2x2 Grid) */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-certificate" style={{ color: "#0062d2" }}></i>
                    <span>Official Industry Certifications &amp; Accreditations</span>
                  </div>

                  <div className="about-two-col-grid">
                    {/* Badge 1: Google Analytics 4 */}
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px 16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>
                        <i className="fa-solid fa-chart-pie"></i>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Google Analytics 4 (GA4)</h4>
                          <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "0.68rem", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>VERIFIED</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 4px", lineHeight: 1.5 }}>
                          Advanced Web Analytics, Conversion Tracking &amp; Event Attribution
                        </p>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0062d2" }}>
                          Google Skillshop Certified
                        </span>
                      </div>
                    </div>

                    {/* Badge 2: Semrush Technical SEO */}
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px 16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#ffedd5", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Semrush Technical SEO</h4>
                          <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "0.68rem", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>ACCREDITED</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 4px", lineHeight: 1.5 }}>
                          Core Web Vitals, Crawl Budget &amp; Server Log File Auditing
                        </p>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ea580c" }}>
                          Semrush Academy Certified
                        </span>
                      </div>
                    </div>

                    {/* Badge 3: HubSpot Inbound Marketing */}
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px 16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>
                        <i className="fa-solid fa-bullseye"></i>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>HubSpot Inbound SEO</h4>
                          <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "0.68rem", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>CERTIFIED</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 4px", lineHeight: 1.5 }}>
                          Search Intent Architecture, Content Hubs &amp; Lead Conversion
                        </p>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#dc2626" }}>
                          HubSpot Academy Certified
                        </span>
                      </div>
                    </div>

                    {/* Badge 4: BlackHatWorld Verified Provider */}
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px 16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>
                        <i className="fa-solid fa-shield-halved"></i>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Verified BHW Provider</h4>
                          <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "0.68rem", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>VETTED</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 4px", lineHeight: 1.5 }}>
                          Vetted SEO Practitioner &amp; Search Automation Tool Developer
                        </p>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0062d2" }}>
                          BlackHatWorld Community Provider
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Executive Action Toolbar (Recommendations #5 & #6) */}
                  <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={() => setShowDeckModal(true)}
                      style={{
                        background: "#ffffff",
                        color: "#0062d2",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        padding: "10px 16px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <i className="fa-solid fa-file-pdf" style={{ color: "#ef4444" }}></i>
                      Download Executive Deck (PDF)
                    </button>

                    <a
                      href="#book-meeting"
                      style={{
                        background: "#0062d2",
                        color: "#ffffff",
                        borderRadius: "4px",
                        padding: "10px 16px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <i className="fa-regular fa-calendar-check"></i>
                      Book 15-Min Strategy Call
                    </a>

                    <a
                      href={`https://wa.me/${(siteSettings.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "")}?text=Hi%20Abdullah,%20I'd%20like%20to%20discuss%20an%20SEO%20project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#ecfdf5",
                        color: "#059669",
                        border: "1px solid #bbf7d0",
                        borderRadius: "4px",
                        padding: "10px 14px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <i className="fa-brands fa-whatsapp"></i> Quick WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Recommendation #3: Global Platform Authority Bar */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 20px", margin: "20px 0 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-earth-americas"></i> Global Authority &amp; Ecosystem Footprint
                  </span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 0" }}>
                    Active Across Premier Search Platforms &amp; Enterprise Communities
                  </h3>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700, background: "#ecfdf5", border: "1px solid #bbf7d0", padding: "3px 10px", borderRadius: "4px" }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: "4px" }}></i> 100+ Verified Accounts Scaled
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", color: "#4285f4", marginBottom: "4px" }}>
                    <i className="fa-brands fa-google"></i>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>Google Ecosystem</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>GSC &amp; GA4 Certified</div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", color: "#0f172a", marginBottom: "4px" }}>
                    <i className="fa-solid fa-hat-cowboy"></i>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>BlackHatWorld</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>Vetted Marketplace</div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", color: "#14a800", marginBottom: "4px" }}>
                    <i className="fa-brands fa-upwork"></i>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>Upwork Global</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>100% Success Score</div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", color: "#0077b5", marginBottom: "4px" }}>
                    <i className="fa-brands fa-slideshare"></i>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>SlideShare</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>SEO System Guides</div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", color: "#e44d26", marginBottom: "4px" }}>
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>Scribd Docs</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>Methodology Papers</div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", color: "#475569", marginBottom: "4px" }}>
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>Academia.edu</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>Entity Search Research</div>
                </div>
              </div>
            </div>

            {/* Section: Proven Results & Case Study Highlights */}
            <section id="case-studies" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#15803d", marginBottom: "14px" }}>
                <i className="fa-solid fa-chart-line"></i>
                <span>Real Business Impact &amp; Growth Proof</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      Proven Results &amp; Client Growth Highlights
                    </h2>
                    <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                      Real performance turnarounds and measurable revenue delivered for local and international brands.
                    </p>
                  </div>
                  <Link href="/portfolio" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                    View Full Portfolio <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>

                <div className="about-two-col-grid" style={{ marginTop: "18px" }}>
                  {/* Case Study 1 */}
                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                        <span style={{ background: "#eff6ff", color: "#0062d2", fontSize: "0.75rem", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          E-Commerce &amp; Retail
                        </span>
                        <span style={{ background: "#ecfdf5", color: "#059669", fontSize: "0.75rem", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>
                          <i className="fa-solid fa-clock" style={{ marginRight: "4px" }}></i> 7 Months
                        </span>
                      </div>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.4, marginBottom: "14px" }}>
                        Scaling Organic Traffic from 12k to 145k Monthly Visitors
                      </h3>

                      {/* 3 Metric Stats */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px 8px", textAlign: "center", marginBottom: "16px" }}>
                        <div>
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#059669" }}>+1,108%</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>Traffic Growth</div>
                        </div>
                        <div style={{ borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0" }}>
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0062d2" }}>85+</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>Page 1 Keywords</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>3.4x</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>Store Revenue</div>
                        </div>
                      </div>

                      {/* Strategy Bullets */}
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <li style={{ fontSize: "0.86rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.5 }}>
                          <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", fontSize: "0.8rem", flexShrink: 0 }}></i>
                          <span>Resolved faceted navigation bloat &amp; fixed 4,200+ canonical anomalies</span>
                        </li>
                        <li style={{ fontSize: "0.86rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.5 }}>
                          <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", fontSize: "0.8rem", flexShrink: 0 }}></i>
                          <span>Built high-converting commercial collection clusters &amp; schema markup</span>
                        </li>
                        <li style={{ fontSize: "0.86rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.5 }}>
                          <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", fontSize: "0.8rem", flexShrink: 0 }}></i>
                          <span>Secured tier-1 contextual editorial backlinks in lifestyle publications</span>
                        </li>
                      </ul>
                    </div>

                    <Link href="/services/ecommerce-seo-service-in-bangladesh" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "4px" }}>
                      Explore E-Commerce SEO Service <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>

                  {/* Case Study 2 */}
                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                        <span style={{ background: "#f5f3ff", color: "#7c3aed", fontSize: "0.75rem", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          B2B SaaS &amp; Tech
                        </span>
                        <span style={{ background: "#ecfdf5", color: "#059669", fontSize: "0.75rem", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>
                          <i className="fa-solid fa-clock" style={{ marginRight: "4px" }}></i> 5 Months
                        </span>
                      </div>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.4, marginBottom: "14px" }}>
                        Capturing #1 Google Rankings &amp; 72% AI Overview Citations
                      </h3>

                      {/* 3 Metric Stats */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px 8px", textAlign: "center", marginBottom: "16px" }}>
                        <div>
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#059669" }}>+480%</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>Demo Inquiries</div>
                        </div>
                        <div style={{ borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0" }}>
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0062d2" }}>72%</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>AI Citations</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>-$12.5k</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>Monthly Ad Spend</div>
                        </div>
                      </div>

                      {/* Strategy Bullets */}
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <li style={{ fontSize: "0.86rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.5 }}>
                          <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", fontSize: "0.8rem", flexShrink: 0 }}></i>
                          <span>Entity-first topic clustering replacing thin keyword articles</span>
                        </li>
                        <li style={{ fontSize: "0.86rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.5 }}>
                          <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", fontSize: "0.8rem", flexShrink: 0 }}></i>
                          <span>Engineered concise factual answer capsules cited by ChatGPT &amp; Perplexity</span>
                        </li>
                        <li style={{ fontSize: "0.86rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.5 }}>
                          <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", fontSize: "0.8rem", flexShrink: 0 }}></i>
                          <span>Targeted digital PR brand mentions across authoritative software directories</span>
                        </li>
                      </ul>
                    </div>

                    <Link href="/services/ai-seo-service-in-bangladesh" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "4px" }}>
                      Explore AI &amp; GEO Service <i className="fa-solid fa-arrow-right"></i>
                    </Link>
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

                <div className="about-two-col-grid" style={{ marginTop: "20px" }}>
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

                <div className="about-two-col-grid" style={{ marginTop: "16px" }}>
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
                  The 6-Phase Organic Growth Blueprint
                </h2>
                <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "20px" }}>
                  Predictable SEO success requires a disciplined, step-by-step engineering process. Here is how I manage campaigns from onboarding to top-tier rankings:
                </p>

                <div className="about-two-col-grid" style={{ marginTop: "16px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>01</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Deep Forensic Audit</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>200+ checkpoints analyzed across log files, crawl paths, JavaScript execution, canonical tags, and content cannibalization.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>02</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Commercial Intent Architecture</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Reverse engineering competitor keyword moats and structuring semantic content clusters around high-intent buyer queries.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>03</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>On-Page &amp; E-E-A-T Fortification</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Restructuring heading hierarchies, internal linking flows, author credential schema, and user-first answer capsules.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>04</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>High-Authority Editorial Links</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Targeted outreach to real, authoritative publications to earn natural contextual backlinks that safely build domain authority.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>05</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Conversion Rate Optimization (CRO)</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Monitoring live behavioral heatmaps, CTR, and lead capture funnels to convert newly acquired search traffic into revenue.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>06</div>
                    <div>
                      <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>AI Search &amp; Compounding Scale</h3>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Fortifying brand entities across AI Overviews and answer engines to ensure compounding organic market share and search dominance.</p>
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

                <div className="about-two-col-grid" style={{ marginTop: "18px" }}>
                  <div style={{ background: "#ffffff", padding: "14px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>🤖 LLM Knowledge Extraction</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Direct entity data markup for AI crawlers.</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "14px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>⚡ Concise Answer Capsules</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Zero-click answer formatting for SGE &amp; AEO.</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "14px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>🌐 Brand Citation Authority</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Multi-channel validation across trusted nodes.</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "14px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", marginBottom: "2px" }}>🔍 Structured AI Schema Engine</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Advanced JSON-LD entity validation for search engines.</div>
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

                <div className="about-two-col-grid" style={{ marginTop: "18px" }}>
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

                <div className="about-two-col-grid" style={{ marginTop: "18px" }}>
                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Direct Strategist Access</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>You work directly with the senior SEO strategist engineering your campaign. No junior staff handoffs and immediate tactical answers.</p>
                    </div>
                  </div>

                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Commercial ROI &amp; Revenue</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Every keyword target and backlink is selected based on commercial conversion potential, helping your business lower CAC.</p>
                    </div>
                  </div>

                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>100% Live Dashboards</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>No ambiguous monthly PDF summaries. You receive live Looker Studio dashboards tracking keyword trajectories and conversions.</p>
                    </div>
                  </div>

                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Future-Proofed for AI</h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Campaigns are natively structured for LLM citation extraction, AI Overviews, and conversational search engines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recommendation #6: 1-Click Meeting Calendar & Strategy Consultation */}
            <section id="book-meeting" style={{ scrollMarginTop: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#15803d", marginBottom: "14px" }}>
                <i className="fa-regular fa-calendar-check"></i>
                <span>Direct Executive Strategy Consultation</span>
              </div>

              <div className="about-section-card" style={{ borderRadius: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      Schedule a 1-on-1 Growth &amp; SEO Strategy Call
                    </h2>
                    <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                      Select your preferred session and timeslot below to discuss your domain’s ranking bottlenecks and revenue roadmap directly with Abdullah Saleh.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDeckModal(true)}
                    style={{ background: "#eff6ff", color: "#0062d2", border: "1px solid #bfdbfe", padding: "8px 14px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className="fa-solid fa-file-pdf" style={{ color: "#ef4444" }}></i> Executive Deck (PDF)
                  </button>
                </div>

                {meetingSuccess ? (
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px", padding: "24px 20px", textAlign: "center" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dcfce7", color: "#15803d", fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                      <i className="fa-solid fa-calendar-check"></i>
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#166534", margin: "0 0 6px" }}>
                      Strategy Consultation Reserved!
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 auto 16px", maxWidth: "560px", lineHeight: 1.65 }}>
                      Thank you, <strong>{meetingName}</strong>. Your <strong>{meetingType}</strong> is booked for <strong>{meetingDate}</strong> at <strong>{meetingTime}</strong>. Abdullah Saleh will send your Google Meet invite and strategic briefing to <strong>{meetingEmail}</strong>.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                      <a
                        href={`https://wa.me/${(siteSettings.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "")}?text=Hi%20Abdullah,%20I%20just%20scheduled%20a%20strategy%20session%20for%20${encodeURIComponent(meetingDate)}%20(${encodeURIComponent(meetingTime)}).%20My%20website:%20${encodeURIComponent(meetingWebsite)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: "#25D366", color: "#ffffff", padding: "10px 18px", borderRadius: "4px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      >
                        <i className="fa-brands fa-whatsapp"></i> Confirm via WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setMeetingSuccess(false);
                          setMeetingName("");
                          setMeetingEmail("");
                          setMeetingWebsite("");
                          setMeetingNote("");
                        }}
                        style={{ background: "#ffffff", color: "#475569", border: "1px solid #cbd5e1", padding: "10px 16px", borderRadius: "4px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
                      >
                        Book Another Session
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleMeetingSubmit} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 20px" }}>
                    {/* Step 1: Session Type */}
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: "8px" }}>
                        1. Select Session Focus
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                        {[
                          { title: "15-Min Quick Search Diagnostic & Q&A", icon: "fa-bolt", desc: "Rapid review of crawl issues & quick wins" },
                          { title: "30-Min Full-Funnel Growth Strategy", icon: "fa-chart-line", desc: "Topical mapping, revenue roadmap & links" },
                          { title: "30-Min Technical Architecture Review", icon: "fa-server", desc: "Core Web Vitals, Schema & indexation" }
                        ].map((item, idx) => {
                          const isSelected = meetingType === item.title;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setMeetingType(item.title)}
                              style={{
                                textAlign: "left",
                                padding: "12px 14px",
                                borderRadius: "4px",
                                border: isSelected ? "2px solid #0062d2" : "1px solid #e2e8f0",
                                background: isSelected ? "#eff6ff" : "#ffffff",
                                cursor: "pointer"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.86rem", color: isSelected ? "#0062d2" : "#0f172a", marginBottom: "3px" }}>
                                <i className={`fa-solid ${item.icon}`} style={{ color: isSelected ? "#0062d2" : "#64748b" }}></i>
                                <span>{item.title}</span>
                              </div>
                              <div style={{ fontSize: "0.74rem", color: "#64748b" }}>{item.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Date & Timeslot */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: "8px" }}>
                          2. Preferred Day
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
                          {[
                            "Today (Urgent Slot)",
                            "Tomorrow (Recommended)",
                            "In 2 Business Days",
                            "In 3 Business Days"
                          ].map((d, idx) => {
                            const isSelected = meetingDate === d;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setMeetingDate(d)}
                                style={{
                                  padding: "8px 10px",
                                  fontSize: "0.78rem",
                                  fontWeight: isSelected ? 700 : 600,
                                  borderRadius: "4px",
                                  border: isSelected ? "2px solid #0062d2" : "1px solid #cbd5e1",
                                  background: isSelected ? "#eff6ff" : "#ffffff",
                                  color: isSelected ? "#0062d2" : "#334155",
                                  cursor: "pointer"
                                }}
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: "8px" }}>
                          3. Preferred Time Slot (GMT+6 / BST)
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
                          {[
                            "03:00 PM BST (09:00 AM EST)",
                            "05:30 PM BST (11:30 AM EST)",
                            "08:00 PM BST (02:00 PM EST)",
                            "10:30 PM BST (04:30 PM EST)"
                          ].map((t, idx) => {
                            const isSelected = meetingTime === t;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setMeetingTime(t)}
                                style={{
                                  padding: "8px 10px",
                                  fontSize: "0.78rem",
                                  fontWeight: isSelected ? 700 : 600,
                                  borderRadius: "4px",
                                  border: isSelected ? "2px solid #0062d2" : "1px solid #cbd5e1",
                                  background: isSelected ? "#eff6ff" : "#ffffff",
                                  color: isSelected ? "#0062d2" : "#334155",
                                  cursor: "pointer"
                                }}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Contact Details */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: "8px" }}>
                        4. Your Contact &amp; Domain Details
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "10px" }}>
                        <input
                          type="text"
                          required
                          placeholder="Your Name (e.g. Alex Morgan)"
                          value={meetingName}
                          onChange={(e) => setMeetingName(e.target.value)}
                          style={{ padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.88rem", color: "#0f172a", outline: "none", background: "#ffffff" }}
                        />
                        <input
                          type="email"
                          required
                          placeholder="Work Email (e.g. alex@brand.com)"
                          value={meetingEmail}
                          onChange={(e) => setMeetingEmail(e.target.value)}
                          style={{ padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.88rem", color: "#0f172a", outline: "none", background: "#ffffff" }}
                        />
                        <input
                          type="url"
                          required
                          placeholder="Website URL (e.g. https://brand.com)"
                          value={meetingWebsite}
                          onChange={(e) => setMeetingWebsite(e.target.value)}
                          style={{ padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.88rem", color: "#0f172a", outline: "none", background: "#ffffff" }}
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Primary Growth Goal or Issue (e.g. Traffic drop after core update, scale ecommerce sales)"
                        value={meetingNote}
                        onChange={(e) => setMeetingNote(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.88rem", color: "#0f172a", outline: "none", background: "#ffffff", marginBottom: "12px" }}
                      />

                      {meetingError && (
                        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "8px 12px", borderRadius: "4px", fontSize: "0.82rem", marginBottom: "10px" }}>
                          <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "6px" }}></i>
                          {meetingError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={meetingLoading}
                        style={{
                          width: "100%",
                          background: "#0062d2",
                          color: "#ffffff",
                          fontWeight: 800,
                          border: "none",
                          borderRadius: "4px",
                          padding: "12px 24px",
                          fontSize: "0.92rem",
                          cursor: meetingLoading ? "not-allowed" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 2px 8px rgba(0,98,210,0.25)"
                        }}
                      >
                        {meetingLoading ? (
                          <>
                            <i className="fa-solid fa-spinner fa-spin"></i> Reserving Strategy Session...
                          </>
                        ) : (
                          <>
                            <i className="fa-regular fa-calendar-check"></i> Confirm &amp; Reserve Strategy Session
                          </>
                        )}
                      </button>
                      <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#64748b", textAlign: "center" }}>
                        Conducted via Google Meet. 100% Free &amp; Confidential with Abdullah Saleh.
                      </div>
                    </div>
                  </form>
                )}
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

            {/* Recommendation #4: Interactive Quick SEO Audit Lead Magnet & CTA Box */}
            <div className="about-cta-container" style={{ borderRadius: "4px", padding: "32px 24px" }}>
              <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <span style={{ display: "inline-block", background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.78rem", fontWeight: 800, padding: "4px 12px", borderRadius: "4px", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px" }}>
                  <i className="fa-solid fa-bolt" style={{ color: "#facc15", marginRight: "6px" }}></i>
                  Complimentary Search Performance Diagnostic
                </span>
                <h2 style={{ color: "#ffffff", fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)", marginBottom: "10px", fontWeight: 800, lineHeight: 1.3 }}>
                  Get Your Free 120-Point Technical &amp; Semantic SEO Audit
                </h2>
                <p style={{ color: "rgba(255, 255, 255, 0.92)", fontSize: "0.95rem", lineHeight: 1.65, margin: "0 auto 24px" }}>
                  Enter your domain below. Abdullah Saleh will personally audit your technical indexation, Core Web Vitals, entity authority, and competitor search gaps—delivering actionable findings within 24 hours.
                </p>

                {auditSuccess ? (
                  <div style={{ background: "#ffffff", borderRadius: "4px", padding: "24px 20px", color: "#0f172a", textAlign: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", marginBottom: "20px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#065f46", margin: "0 0 6px" }}>
                      Audit Request Received Successfully!
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0 0 16px", lineHeight: 1.6 }}>
                      Abdullah is preparing your website’s 120-point diagnostic roadmap. Expect your analysis report via email within 24 business hours.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                      <a
                        href={`https://wa.me/${(siteSettings.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "")}?text=Hi%20Abdullah,%20I%20just%20requested%20a%20free%20120-point%20SEO%20audit%20on%20your%20About%20page.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: "#25D366", color: "#ffffff", padding: "10px 18px", borderRadius: "4px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      >
                        <i className="fa-brands fa-whatsapp"></i> Expedite via WhatsApp
                      </a>
                      <button
                        onClick={() => setAuditSuccess(false)}
                        style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px 16px", borderRadius: "4px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
                      >
                        Submit Another Website
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAuditSubmit} style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.25)", borderRadius: "4px", padding: "18px 20px", marginBottom: "24px", backdropFilter: "blur(6px)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "10px" }}>
                      <input
                        type="url"
                        required
                        placeholder="https://yourwebsite.com"
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: "4px", border: "1px solid #ffffff", fontSize: "0.9rem", color: "#0f172a", outline: "none", background: "#ffffff" }}
                      />
                      <input
                        type="email"
                        required
                        placeholder="Work Email (e.g. founder@brand.com)"
                        value={auditEmail}
                        onChange={(e) => setAuditEmail(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: "4px", border: "1px solid #ffffff", fontSize: "0.9rem", color: "#0f172a", outline: "none", background: "#ffffff" }}
                      />
                      <input
                        type="text"
                        placeholder="WhatsApp / Phone (Optional)"
                        value={auditPhone}
                        onChange={(e) => setAuditPhone(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: "4px", border: "1px solid #ffffff", fontSize: "0.9rem", color: "#0f172a", outline: "none", background: "#ffffff" }}
                      />
                    </div>

                    {auditError && (
                      <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "8px 12px", borderRadius: "4px", fontSize: "0.82rem", marginBottom: "10px", textAlign: "left" }}>
                        <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "6px" }}></i>
                        {auditError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={auditLoading}
                      style={{
                        width: "100%",
                        background: "#facc15",
                        color: "#0f172a",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "4px",
                        padding: "13px 24px",
                        fontSize: "0.95rem",
                        cursor: auditLoading ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {auditLoading ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i> Submitting Audit Request...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-bolt"></i> Claim Free 120-Point SEO Audit
                        </>
                      )}
                    </button>
                    <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "rgba(255,255,255,0.8)" }}>
                      100% Confidential. Zero spam. Prepared manually with Ahrefs, Semrush &amp; Screaming Frog.
                    </div>
                  </form>
                )}

                <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <Link
                    href="/contact"
                    className="btn btn-lg"
                    style={{
                      background: "#ffffff",
                      color: "#0062d2",
                      fontWeight: 700,
                      border: "none",
                      borderRadius: "4px",
                      padding: "11px 22px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.9rem"
                    }}
                  >
                    Schedule 1-on-1 Consultation <i className="fa-solid fa-arrow-right"></i>
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
                      padding: "11px 20px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.9rem"
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                  </a>
                  <Link
                    href="/tools/deep-seo-audit"
                    style={{
                      color: "#f8fafc",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      textDecoration: "underline",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 8px"
                    }}
                  >
                    Or try our automated Deep SEO Audit Tool <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.75rem" }}></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Recommendation #5: Executive Capability Deck Modal */}
      {showDeckModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(15, 23, 42, 0.72)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)"
          }}
          onClick={() => setShowDeckModal(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "4px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              border: "1px solid #cbd5e1",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: "#ef4444" }}></i>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                    Executive SEO &amp; Growth Capability Deck
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    2026 Edition · Prepared by Abdullah Saleh
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeckModal(false)}
                style={{ background: "none", border: "none", fontSize: "1.3rem", color: "#64748b", cursor: "pointer", padding: "4px 8px" }}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "20px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Executive Profile Overview
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", background: "#ecfdf5", padding: "2px 8px", borderRadius: "4px" }}>
                    Verified E-E-A-T Track Record
                  </span>
                </div>
                <h4 style={{ margin: "0 0 6px", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                  Abdullah Saleh — Organic Business Growth Specialist &amp; Technical SEO Architect
                </h4>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                  Dhaka, Bangladesh · Partnering with 100+ global brands across USA, UK, Canada, Australia, and Europe. Focused strictly on revenue-driven organic growth, crawl optimization, and AI/LLM search engine readiness.
                </p>
              </div>

              {/* 4 Highlights */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0062d2" }}>6+ Years</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Search Engineering</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0062d2" }}>$2,000,000+</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Organic Revenue Impact</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0062d2" }}>100+ Brands</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Scaled Globally</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#059669" }}>100% White-Hat</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Google Compliant</div>
                </div>
              </div>

              {/* Growth Disciplines */}
              <div style={{ marginBottom: "16px" }}>
                <h5 style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", margin: "0 0 10px" }}>
                  Core Growth Disciplines &amp; Deliverables
                </h5>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px", fontSize: "0.85rem", color: "#334155" }}>
                  <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: "4px", border: "1px solid #f1f5f9" }}>
                    <i className="fa-solid fa-check" style={{ color: "#059669", marginRight: "6px" }}></i>
                    <strong>Technical Audits:</strong> 230+ Checkpoints &amp; Core Web Vitals
                  </div>
                  <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: "4px", border: "1px solid #f1f5f9" }}>
                    <i className="fa-solid fa-check" style={{ color: "#059669", marginRight: "6px" }}></i>
                    <strong>Semantic Mapping:</strong> Topical Authority &amp; Content Hubs
                  </div>
                  <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: "4px", border: "1px solid #f1f5f9" }}>
                    <i className="fa-solid fa-check" style={{ color: "#059669", marginRight: "6px" }}></i>
                    <strong>Link Acquisition:</strong> Editorial White-Hat PR Backlinks
                  </div>
                  <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: "4px", border: "1px solid #f1f5f9" }}>
                    <i className="fa-solid fa-check" style={{ color: "#059669", marginRight: "6px" }}></i>
                    <strong>AEO &amp; GEO:</strong> Google AI Overviews &amp; Perplexity
                  </div>
                </div>
              </div>

              {/* Engagement Models */}
              <div style={{ background: "#f1f5f9", borderRadius: "4px", padding: "12px 14px", marginBottom: "18px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a", display: "block", marginBottom: "4px" }}>
                  Enterprise Engagement Models:
                </span>
                <span style={{ fontSize: "0.82rem", color: "#475569" }}>
                  1. Monthly Dedicated Growth Retainer · 2. Technical Audit &amp; Architecture Sprint · 3. Fractional Executive Search Advisory
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <a
                  href="/documents/abdullah-saleh-seo-capability-deck.pdf"
                  download="Abdullah-Saleh-SEO-Capability-Deck.pdf"
                  style={{
                    background: "#0062d2",
                    color: "#ffffff",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <i className="fa-solid fa-download"></i> Download PDF Deck
                </a>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    style={{
                      background: "#ffffff",
                      color: "#334155",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "10px 14px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <i className="fa-solid fa-print"></i> Print / Save
                  </button>

                  <a
                    href={`https://wa.me/${(siteSettings.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "")}?text=Hi%20Abdullah,%20I%20reviewed%20your%20SEO%20Capability%20Deck%20and%20would%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#25D366",
                      color: "#ffffff",
                      borderRadius: "4px",
                      padding: "10px 14px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp Abdullah
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
