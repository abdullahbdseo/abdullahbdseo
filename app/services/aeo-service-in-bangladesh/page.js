"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function AeoServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    aeoTarget: "Featured Snippets (Position Zero)"
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
      q: "What is AEO (Answer Engine Optimization) and how does it work in Bangladesh?",
      a: "AEO (Answer Engine Optimization) is the specialized discipline of optimizing website content, headings, and data structure so that search engines and AI assistants can extract direct, immediate answers from your pages. Rather than just ranking among traditional search links, AEO places your content in Google Featured Snippets ('Position Zero'), People Also Ask (PAA) accordions, Google Assistant voice answers, Siri, and AI answer capsules."
    },
    {
      q: "How does AEO differ from traditional SEO?",
      a: "Traditional SEO focuses on driving visitors to click through broad keyword rankings across standard SERP listings. AEO focuses on providing the single most concise, accurate, and authoritative answer to a specific user question (What, Why, How, Best, Price, Comparison). AEO leverages 40-60 word answer capsules, structured HTML tables, ordered lists, and Q&A schema to become the definitive chosen answer."
    },
    {
      q: "What is Google Position Zero (Featured Snippet)?",
      a: "Google Position Zero is the highlighted answer box displayed above the #1 organic ranking on Google's search results page. Featured Snippets capture the majority of clicks and are used as the primary source for voice search queries on mobile devices and smart speakers. Ranking at Position Zero establishes immediate market leadership and massive organic trust."
    },
    {
      q: "How much does AEO service cost in Bangladesh?",
      a: "AEO service packages in Bangladesh typically range from ৳18,000 to ৳55,000+ per month depending on the number of target question clusters, content volume, schema complexity, and competitor competition. My Starter AEO package is ৳18,000/month, while the Featured Snippet Sprint is ৳30,000/month."
    },
    {
      q: "How quickly can my pages win Google Featured Snippets with AEO?",
      a: "Pages already ranking on Page 1 of Google (positions 1-10) can often win Featured Snippets within 2 to 4 weeks once re-engineered with concise answer capsules, correct H2/H3 syntax, and valid Q&A schema. New question-targeted content typically achieves Position Zero within 60 to 90 days."
    },
    {
      q: "Will AEO improve voice search rankings on Siri, Alexa, and Google Assistant?",
      a: "Yes. Voice assistants read out single, authoritative answers pulled directly from Featured Snippets and Speakable Schema. By formatting your website for AEO, your business becomes the spoken recommendation when voice search users make conversational inquiries."
    },
    {
      q: "What types of Featured Snippets can AEO capture?",
      a: "Our AEO frameworks capture all four major Featured Snippet formats: (1) Paragraph Snippets (40-60 word direct definitions), (2) Numbered/Bulleted List Snippets (step-by-step processes and rankings), (3) Table Snippets (pricing comparisons and specs), and (4) Video Snippets (timestamped how-to guides)."
    },
    {
      q: "Do you offer a free AEO and Featured Snippet audit?",
      a: "Yes. I provide a 100% free AEO diagnostic audit. I identify existing Position Zero opportunities your website is missing, evaluate your Question-Answer content structure, analyze People Also Ask (PAA) gaps, and deliver an actionable implementation plan within 24 hours."
    }
  ];

  const benefits = [
    {
      icon: "fa-crown",
      title: "Dominate Google Position Zero",
      desc: "Capture the premier Featured Snippet box positioned above all organic results, establishing instant brand authority."
    },
    {
      icon: "fa-microphone-lines",
      title: "Voice Search Supremacy",
      desc: "Become the single spoken answer when users search via Google Assistant, Apple Siri, Amazon Alexa, or in-car voice systems."
    },
    {
      icon: "fa-bullseye",
      title: "Win People Also Ask (PAA) Boxes",
      desc: "Occupy multiple expandable PAA question cards across high-volume industry queries to dominate total SERP screen real estate."
    },
    {
      icon: "fa-magnifying-glass-chart",
      title: "Direct Answer Capsule Authority",
      desc: "Structure your core insights into high-clarity 40-60 word summaries that search engines and AI models prefer over bloated text."
    },
    {
      icon: "fa-chart-pie",
      title: "Higher Click-Through Rates (CTR)",
      desc: "Featured Snippet listings achieve up to 35% higher organic click-through rates compared to standard blue organic links."
    },
    {
      icon: "fa-shield-halved",
      title: "Protect Against Zero-Click Loss",
      desc: "Ensure your brand name and verified website link are prominently displayed even when search engines display direct answers."
    },
    {
      icon: "fa-code",
      title: "Rich Q&A and FAQ Schema Markup",
      desc: "Deploy validated JSON-LD schema (FAQPage, QAPage, HowTo, SpeakableSpecification) to provide unmistakable context to answer bots."
    },
    {
      icon: "fa-trophy",
      title: "Outrank High-DA Competitors",
      desc: "AEO allows smaller, agile websites with precise answer architecture to leapfrog high-authority legacy competitors for targeted queries."
    }
  ];

  const processSteps = [
    {
      num: "01",
      icon: "fa-magnifying-glass-plus",
      title: "Question & Snippet Opportunity Audit",
      desc: "We analyze high-intent questions across your vertical, mapping competitor Featured Snippets, PAA matrices, and conversational queries."
    },
    {
      num: "02",
      icon: "fa-pen-ruler",
      title: "Answer Capsule Formatting & Layout",
      desc: "We rewrite headings and target paragraphs using proven 40-60 word direct-answer formulas, structured comparison tables, and ordered lists."
    },
    {
      num: "03",
      icon: "fa-code-branch",
      title: "Schema Engineering & Validation",
      desc: "We implement nested FAQPage, QAPage, HowTo, and Speakable structured data to ensure search engines parse your answers with 100% precision."
    },
    {
      num: "04",
      icon: "fa-chart-line",
      title: "Position Zero Tracking & Expansion",
      desc: "We monitor snippet retention, optimize for voice search capture, and continuously scale answer capsules across new question clusters."
    }
  ];

  const packages = [
    {
      name: "AEO Quick Launch",
      subtitle: "For small websites and professionals looking to win high-intent question snippets",
      priceBdt: "৳18,000",
      priceUsd: "$180",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Up to 20 Target Question & PAA Clusters",
        "Comprehensive Featured Snippet Opportunity Audit",
        "Direct Answer Capsule Formatting (10 Target URLs)",
        "FAQPage & QAPage Schema Markup Deployment",
        "People Also Ask (PAA) Answer Optimization",
        "Google Search Console & Snippet Performance Tracking",
        "Monthly AEO & Position Zero Report"
      ]
    },
    {
      name: "Featured Snippet Sprint",
      subtitle: "Aggressive answer optimization for growing businesses, clinics & agencies",
      priceBdt: "৳30,000",
      priceUsd: "$300",
      duration: "Monthly Retainer",
      isPopular: true,
      features: [
        "Up to 45 Target Question & Informational Clusters",
        "Full Position Zero & Voice Search Optimization",
        "Paragraph, List & Table Snippet Formatting (25 URLs)",
        "Advanced Nested Schema (FAQ, QAPage, HowTo, Speakable)",
        "Competitor Snippet Hijack & Replacement Strategy",
        "Voice Search Optimization for Siri & Google Assistant",
        "Core Web Vitals & Answer Loading Speed Audit",
        "Bi-Weekly Progress Debrief & WhatsApp Support"
      ]
    },
    {
      name: "Complete AEO & Voice Authority",
      subtitle: "Enterprise-grade Answer Engine & Multi-Modal Question Dominance",
      priceBdt: "৳55,000",
      priceUsd: "$550",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Unlimited Question Clusters & Conversational Targets",
        "Complete Site-Wide Answer Capsule Restructuring",
        "Full Multi-Format Snippet Engineering (Paragraph, List, Table, Video)",
        "High-Authority Supporting Content Hubs (4 Hubs/Month)",
        "Speakable Schema & Smart Speaker Optimization",
        "Continuous Snippet Defense & Algorithm Volatility Shield",
        "Dedicated Account Strategist & 24/7 Priority WhatsApp",
        "Real-Time Snippet Tracking Dashboard"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Online Legal Advisory Service",
      challenge: "Struggled to compete against large law firms for broad commercial legal terms in Bangladesh.",
      solution: "Engineered 50+ question-answer capsules targeting high-intent legal procedures and deployed FAQPage & QAPage schema.",
      results: "Captured 38 Featured Snippets within 60 days, generating +210% increase in consultation calls."
    },
    {
      title: "EdTech & Career Training Platform",
      challenge: "Lost course inquiry traffic to zero-click Google answers.",
      solution: "Restructured course syllabus pages with step-by-step ordered lists, HowTo schema, and direct answer capsules.",
      results: "Won Position Zero for 45+ career queries, driving +160% organic student enrollments."
    },
    {
      title: "FinTech & Currency Comparison Portal",
      challenge: "Competitors owned the top Google Table Snippets for exchange rates and remittance guides.",
      solution: "Built clean HTML comparison tables with schema validation, fast server caching, and updated data feeds.",
      results: "Replaced competitor in Google Table Snippets, lifting daily organic impressions by +340%."
    }
  ];

  const testimonials = [
    {
      name: "Advocate Kamrul Islam",
      role: "Lead Counsel, LegalPoint BD",
      text: "Abdullah Saleh's AEO framework is pure genius. He identified the exact questions our clients ask and optimized our answers so effectively that Google put us at Position Zero for dozens of competitive legal queries."
    },
    {
      name: "Nayeem Chowdhury",
      role: "Founder, EduSkill Academy",
      text: "Our course pages were ranking on page 2 until Abdullah restructured them for Answer Engine Optimization. Within three weeks, we were featured in top snippets and our student leads doubled."
    },
    {
      name: "Syed Rafiq",
      role: "Operations Director, PayQuick Bangladesh",
      text: "Abdullah is the most technical and data-driven SEO professional I have worked with. His schema architecture and table snippet optimization delivered top Google placements faster than any agency."
    },
    {
      name: "Fariha Sultana",
      role: "Marketing Head, MediCare Diagnostic",
      text: "Winning Google Position Zero gave our diagnostic center immense credibility. Abdullah personally guided the entire implementation with absolute precision."
    }
  ];

  const servicePillars = [
    {
      icon: "fa-bullhorn",
      title: "Featured Snippet Capture (Position Zero)",
      desc: "Craft and structure content specifically to capture Google's top highlighted box across paragraph, list, and table formats."
    },
    {
      icon: "fa-layer-group",
      title: "People Also Ask (PAA) Expansion",
      desc: "Identify and conquer every related question accordion in Google SERPs, expanding your brand's total search landscape footprint."
    },
    {
      icon: "fa-microphone",
      title: "Voice Search & Conversational Optimization",
      desc: "Format natural language answers and deploy Speakable Schema so Google Assistant, Siri, and Alexa choose your business as the spoken answer."
    },
    {
      icon: "fa-file-code",
      title: "Advanced Q&A & HowTo Schema",
      desc: "Engineer validated JSON-LD schema (FAQPage, QAPage, HowTo, DefinedTerm) to explicitly signal answer structure to search engine bots."
    },
    {
      icon: "fa-table-cells",
      title: "Data Table & Comparison Matrix Structuring",
      desc: "Design clean semantic HTML tables that search engines can easily scrape for price comparisons, specifications, and data overviews."
    },
    {
      icon: "fa-spell-check",
      title: "Direct Answer Capsule Formulation",
      desc: "Implement the proven 40-60 word inverted pyramid answer format immediately below targeted H2/H3 question headers."
    }
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AEO Service in Bangladesh (Answer Engine Optimization)",
    "provider": {
      "@type": "Person",
      "name": "Abdullah Saleh",
      "url": "https://seoservice.local",
      "jobTitle": "Best SEO Expert in Bangladesh & AEO Specialist",
      "telephone": siteSettings.whatsapp_number,
      "email": siteSettings.contact_email
    },
    "description": "Professional AEO (Answer Engine Optimization) services in Bangladesh by Abdullah Saleh. Win Google Featured Snippets, Position Zero, and Voice Search recommendations.",
    "areaServed": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AEO Packages",
      "itemListElement": packages.map((pkg) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "description": pkg.subtitle
        },
        "price": pkg.priceBdt.replace(/[^0-9]/g, ""),
        "priceCurrency": "BDT"
      }))
    }
  };

  const faqSchema = {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)", padding: "60px 0 50px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#64748b", marginBottom: "20px" }}>
            <Link href="/" style={{ color: "#0062d2", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: "#0062d2", textDecoration: "none", fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span style={{ color: "#0f172a", fontWeight: 700 }}>AEO Service in Bangladesh</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            
            {/* Hero Left Content */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#059669", marginBottom: "16px" }}>
                <i className="fa-solid fa-crown"></i>
                <span>ANSWER ENGINE OPTIMIZATION &amp; POSITION ZERO</span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.02em" }}>
                AEO Service in Bangladesh: Win Google Featured Snippets &amp; Voice Search
              </h1>

              <p style={{ fontSize: "1.08rem", color: "#334155", lineHeight: 1.75, marginBottom: "24px" }}>
                Over 50% of Google searches now result in direct answers or zero clicks. With 6+ years of specialized search optimization expertise, I help businesses capture Google Featured Snippets (Position Zero), People Also Ask accordions, and Voice Search answers through precision answer engineering.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
                <a
                  href="https://wa.me/8801670769816"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#059669",
                    color: "#ffffff",
                    padding: "14px 28px",
                    borderRadius: "6px",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)"
                  }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                </a>
                <a
                  href="#pricing-section"
                  style={{
                    background: "#0062d2",
                    color: "#ffffff",
                    padding: "14px 28px",
                    borderRadius: "6px",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <i className="fa-solid fa-layer-group"></i> View AEO Packages
                </a>
              </div>

              {/* Trust Badges Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>6+ Years Experience</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>100+ Brands Optimized</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>Position Zero Focus</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>Voice Search Ready</span>
                </div>
              </div>

            </div>

            {/* Hero Right Quick Audit Card */}
            <div style={{ background: "#ffffff", border: "1px solid #dbeafe", borderRadius: "8px", padding: "30px", boxShadow: "0 10px 30px rgba(0, 98, 210, 0.08)" }}>
              <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Free Snippet Audit
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>
                  Get Your Free AEO &amp; Snippet Audit
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "6px 0 0" }}>
                  Discover missed Position Zero and Featured Snippet opportunities.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px", padding: "20px", textAlign: "center", color: "#065f46" }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "2rem", color: "#059669", marginBottom: "10px" }}></i>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 6px" }}>Audit Request Received!</h4>
                  <p style={{ fontSize: "0.88rem", margin: 0, lineHeight: 1.6 }}>
                    Thank you, <strong>{formData.name}</strong>. I will analyze your snippet potential and send your AEO roadmap via WhatsApp/email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Abdullah Saleh"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.92rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      WhatsApp Number / Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+880 1670-769816"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.92rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Website URL *
                    </label>
                    <input
                      type="url"
                      name="website"
                      required
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.92rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Primary AEO Goal
                    </label>
                    <select
                      name="aeoTarget"
                      value={formData.aeoTarget}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.92rem", background: "#ffffff" }}
                    >
                      <option value="Featured Snippets (Position Zero)">Featured Snippets (Position Zero)</option>
                      <option value="People Also Ask (PAA) Dominance">People Also Ask (PAA) Dominance</option>
                      <option value="Voice Search (Siri & Google Assistant)">Voice Search (Siri &amp; Google Assistant)</option>
                      <option value="Full Comprehensive AEO">Full Comprehensive AEO</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#0062d2",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px",
                      borderRadius: "6px",
                      fontSize: "0.98rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginTop: "6px"
                    }}
                  >
                    <i className="fa-solid fa-paper-plane"></i> Request Free AEO Audit
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 2. WHAT IS AEO SECTION */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-lightbulb"></i>
              <span>ANSWER ENGINE ESSENTIALS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Why AEO is the Key to Dominating Modern Search Results
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Search engines are transforming from index directories into answering machines. AEO ensures your website delivers the exact direct answers that Google, Siri, and voice devices choose to present.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-crown"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Google Position Zero Supremacy
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Featured Snippets sit above standard #1 rankings, commanding peak visual focus and capturing over 35% of all organic clicks. We reformat your content to satisfy Google’s strict snippet extraction algorithms.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-comment-dots"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Direct Answer Capsule Architecture
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Modern users want immediate, fluff-free answers. By structuring answers in 40–60 word target blocks with unambiguous terminology, your content becomes the optimal candidate for algorithmic extraction.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-microphone"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Conversational Voice Search Ingestion
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Smart speakers and mobile voice assistants read out only one answer per query. AEO optimizes for natural spoken phrases, ensuring your brand is the sole voice recommendation for your target services.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CORE SERVICE PILLARS */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-cubes"></i>
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Comprehensive AEO Service Pillars
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Tailored optimization frameworks built to capture every question format across search engine result pages.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
            {servicePillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ width: "46px", height: "46px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", marginBottom: "16px" }}>
                  <i className={`fa-solid ${pillar.icon}`}></i>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. STRATEGIC 4-STEP PROCESS */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#059669", marginBottom: "12px" }}>
              <i className="fa-solid fa-list-check"></i>
              <span>STEP-BY-STEP METHODOLOGY</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Our 4-Step AEO Execution Framework
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              How we transform existing web pages into top-ranking, snippet-winning answer destinations.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "24px",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "6px", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#cbd5e1" }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. BENEFITS GRID */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-chart-line"></i>
              <span>MEASURABLE ADVANTAGES</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Key Benefits of Answer Engine Optimization
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Gain high-CTR visibility, leapfrog competitor rankings, and protect your business against zero-click traffic drop-offs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {benefits.map((b, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "22px"
                }}
              >
                <div style={{ color: "#0062d2", fontSize: "1.3rem", marginBottom: "12px" }}>
                  <i className={`fa-solid ${b.icon}`}></i>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PRICING PACKAGES */}
      <section id="pricing-section" style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#059669", marginBottom: "12px" }}>
              <i className="fa-solid fa-tags"></i>
              <span>TRANSPARENT PRICING</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              AEO Service Packages in Bangladesh
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Fixed monthly retainers with clear deliverables. Direct execution by Abdullah Saleh with transparent snippet tracking.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "stretch" }}>
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: pkg.isPopular ? "2px solid #0062d2" : "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: pkg.isPopular ? "0 10px 30px rgba(0, 98, 210, 0.12)" : "none"
                }}
              >
                {pkg.isPopular && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#0062d2", color: "#ffffff", padding: "4px 16px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Most Popular
                  </div>
                )}

                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 16px", minHeight: "36px" }}>
                    {pkg.subtitle}
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                    <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0062d2" }}>{pkg.priceBdt}</span>
                    <span style={{ fontSize: "1rem", color: "#64748b", fontWeight: 600 }}>/ month ({pkg.priceUsd})</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, marginTop: "4px" }}>
                    {pkg.duration} &bull; Direct WhatsApp Support
                  </div>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#334155" }}>
                      <i className="fa-solid fa-check" style={{ color: "#059669", marginTop: "3px", flexShrink: 0 }}></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/8801670769816?text=${encodeURIComponent(`Hello Abdullah, I am interested in your ${pkg.name} (${pkg.priceBdt}/mo) for AEO service.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: pkg.isPopular ? "#0062d2" : "#f1f5f9",
                    color: pkg.isPopular ? "#ffffff" : "#0f172a",
                    textAlign: "center",
                    padding: "12px",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "block",
                    border: pkg.isPopular ? "none" : "1px solid #cbd5e1"
                  }}
                >
                  Choose {pkg.name} <i className="fa-solid fa-arrow-right" style={{ marginLeft: "4px" }}></i>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CASE STUDIES SECTION */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-trophy"></i>
              <span>PROVEN RESULTS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              AEO &amp; Snippet Case Studies
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Real examples of websites capturing Position Zero and dominating zero-click search environments.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", marginBottom: "6px" }}>
                  Case Study {idx + 1}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
                  {cs.title}
                </h3>
                
                <div style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "0.88rem", color: "#dc2626", display: "block", marginBottom: "3px" }}>Challenge:</strong>
                  <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{cs.challenge}</p>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <strong style={{ fontSize: "0.88rem", color: "#0062d2", display: "block", marginBottom: "3px" }}>Strategy Applied:</strong>
                  <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{cs.solution}</p>
                </div>

                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "4px", padding: "12px", marginTop: "auto" }}>
                  <strong style={{ fontSize: "0.88rem", color: "#059669", display: "block", marginBottom: "2px" }}>Key Milestone:</strong>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#065f46" }}>{cs.results}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-star"></i>
              <span>CLIENT TESTIMONIALS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Trusted by Ambitious Brands in Bangladesh
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ color: "#eab308", fontSize: "0.9rem", marginBottom: "12px" }}>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>{t.name}</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-circle-question"></i>
              <span>COMMON QUESTIONS</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              Frequently Asked Questions About AEO
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Straightforward answers about capturing Google Featured Snippets and Answer Engine Optimization.
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
                  overflow: "hidden"
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 20px",
                    background: activeFaq === idx ? "#f8fafc" : "#ffffff",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                    {faq.q}
                  </span>
                  <i
                    className={`fa-solid ${activeFaq === idx ? "fa-chevron-up" : "fa-chevron-down"}`}
                    style={{ color: "#0062d2", fontSize: "0.9rem", marginLeft: "14px", flexShrink: 0 }}
                  ></i>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: "0 20px 20px", color: "#475569", fontSize: "0.92rem", lineHeight: 1.7, borderTop: "1px solid #f1f5f9" }}>
                    <p style={{ margin: "14px 0 0" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. BOTTOM CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg, #0062d2 0%, #004bb5 100%)", padding: "60px 0", color: "#ffffff" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.01em" }}>
            Ready to Capture Google Position Zero &amp; Featured Snippets?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#dbeafe", lineHeight: 1.7, maxWidth: "750px", margin: "0 auto 30px" }}>
            Do not let your competitors claim the top direct answer for high-converting customer searches. Get your free AEO audit and start winning Featured Snippets today.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/8801670769816"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#059669",
                color: "#ffffff",
                padding: "14px 30px",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp Now
            </a>
            <Link
              href="/contact"
              style={{
                background: "#ffffff",
                color: "#0062d2",
                padding: "14px 30px",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fa-solid fa-calendar-check"></i> Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
