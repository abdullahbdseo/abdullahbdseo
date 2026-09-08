"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function AiSeoServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    aiTarget: "Google AI Overviews (SGE)"
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
      q: "What is AI SEO and why is it essential for businesses in Bangladesh?",
      a: "AI SEO (Artificial Intelligence Search Engine Optimization) is the specialized practice of optimizing your digital assets, website content, and entity data so they are prioritized, synthesized, and cited by AI-powered search engines—including Google AI Overviews (formerly SGE), Google Gemini, ChatGPT Search, Perplexity AI, and Microsoft Copilot. As search engines shift from classic blue links to synthesized AI answers, AI SEO ensures your brand is chosen as the authoritative primary source."
    },
    {
      q: "How is AI SEO different from traditional Organic SEO?",
      a: "Traditional SEO focuses primarily on keyword density, standard metadata, backlink quantity, and ranking on page one of Google SERPs. AI SEO focuses on Semantic Entity Graphs, Information Gain score, Natural Language Processing (NLP) context, brand co-citations across verified knowledge bases, and structured data ingestion by Large Language Models (LLMs). AI engines do not merely match keywords; they evaluate factual consistency and topical authority."
    },
    {
      q: "How do you get a website cited in Google AI Overviews and ChatGPT?",
      a: "Appearing in AI Overviews and LLM responses requires a multi-layered optimization strategy: (1) creating high Information-Gain content with original data, case studies, and proprietary insights; (2) structuring pages with concise 40-60 word direct-answer capsules; (3) implementing comprehensive Schema.org JSON-LD markup; (4) establishing brand entity validation across Knowledge Graphs (Wikidata, industry directories, author EEAT); and (5) earning contextual co-citations on authoritative domains."
    },
    {
      q: "How much does AI SEO service cost in Bangladesh?",
      a: "AI SEO service packages in Bangladesh range from ৳20,000 to ৳65,000+ per month depending on your industry vertical, entity complexity, content volume, and whether you need foundational AI readiness or multi-platform LLM domination. My Starter AI package begins at ৳20,000/month, while the comprehensive AI Search Growth package is ৳35,000/month."
    },
    {
      q: "How long does it take to see results from AI SEO optimization?",
      a: "Websites with established domain authority typically begin appearing in Google AI Overviews and Perplexity search answers within 30 to 60 days following entity alignment, structured schema rollout, and answer capsule deployment. Full generative search dominance across competitive industry topics usually matures within 3 to 5 months."
    },
    {
      q: "Will AI SEO also help my standard Google organic rankings?",
      a: "Yes. Google's core ranking algorithm and AI Overviews share the same foundational criteria: Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T), semantic depth, site speed, and structured data. Optimizing for AI search inherently strengthens your standard organic keyword rankings, featured snippets, and voice search visibility."
    },
    {
      q: "Can AI SEO protect my traffic from zero-click searches?",
      a: "Yes. In zero-click search environments where AI answers provide direct summaries on the search result page, having your brand featured as the cited source with clickable reference badges drives high-intent referral clicks. Users who click on AI source links are significantly more likely to convert into paying clients because the AI has already validated your credibility."
    },
    {
      q: "Do you offer a free AI SEO readiness audit?",
      a: "Yes. I provide a 100% free AI SEO & Generative Search Readiness audit. I analyze your brand's presence in Google AI Overviews, entity knowledge graph status, schema completeness, and content information gain score, sending you a clear diagnostic report within 24 hours via WhatsApp or email."
    }
  ];

  const benefits = [
    {
      icon: "fa-robot",
      title: "Google AI Overviews Dominance",
      desc: "Secure top placement in Google SGE and AI Overviews where synthesized summaries capture user attention before standard organic listings."
    },
    {
      icon: "fa-comments",
      title: "ChatGPT & Perplexity Citations",
      desc: "Position your brand as the go-to reference when potential buyers use ChatGPT Search, Claude, or Perplexity to compare services and products."
    },
    {
      icon: "fa-diagram-project",
      title: "Semantic Knowledge Graph Entity",
      desc: "Establish your business as a recognized entity in Google's Knowledge Graph, connecting your brand name, founder, and services to authoritative nodes."
    },
    {
      icon: "fa-chart-pie",
      title: "Higher Conversion from AI Traffic",
      desc: "Visitors referred from AI source cards convert at up to 3x higher rates because the AI algorithm has pre-validated your business as an industry authority."
    },
    {
      icon: "fa-shield-halved",
      title: "Future-Proof Search Strategy",
      desc: "Protect your organic traffic against future search engine algorithm updates and the ongoing shift toward conversational, multimodal search."
    },
    {
      icon: "fa-bolt",
      title: "Information Gain Advantage",
      desc: "Outrank generic AI-generated competitor content by infusing proprietary data, expert quotes, case studies, and distinct analytical viewpoints."
    },
    {
      icon: "fa-code",
      title: "Machine-Readable Schema Architecture",
      desc: "Deploy advanced JSON-LD structured data including Organization, Person, Service, FAQPage, and DefinedTerm schemas engineered for LLM ingestion."
    },
    {
      icon: "fa-trophy",
      title: "Outperform Market Competitors",
      desc: "While competitors rely solely on outdated 2018 keyword strategies, your website captures emerging high-intent conversational search queries."
    }
  ];

  const processSteps = [
    {
      num: "01",
      icon: "fa-magnifying-glass-chart",
      title: "AI Search Readiness & Entity Audit",
      desc: "We analyze your brand presence across Google AI Overviews, ChatGPT Search, and Perplexity, auditing entity clarity, schema coverage, and information gain gaps."
    },
    {
      num: "02",
      icon: "fa-network-wired",
      title: "Entity Graph & Schema Engineering",
      desc: "We structure your website with nested JSON-LD schema markup, interconnecting your business entity, author E-E-A-T credentials, and service hierarchies."
    },
    {
      num: "03",
      icon: "fa-file-lines",
      title: "Answer Capsule & Content Optimization",
      desc: "We restructure core service and informational content into precise 40-60 word answer capsules, comparison tables, and proprietary research datasets."
    },
    {
      num: "04",
      icon: "fa-chart-line",
      title: "LLM Citation Tracking & Scaling",
      desc: "We build authoritative co-citations across verified industry hubs, monitor AI search brand mentions, and expand topical authority across emerging queries."
    }
  ];

  const packages = [
    {
      name: "AI Starter Package",
      subtitle: "For small businesses & service providers starting AI search optimization",
      priceBdt: "৳20,000",
      priceUsd: "$200",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Up to 15 Target Core Search Entities & Queries",
        "AI Search Readiness & Entity Clarity Audit",
        "Google AI Overviews & SGE Optimization",
        "Direct Answer Capsule Formatting (10 Pages)",
        "Advanced JSON-LD Schema (Organization, FAQ, Service)",
        "E-E-A-T Author & Brand Credibility Optimization",
        "Monthly AI Search Visibility & Organic Report"
      ]
    },
    {
      name: "AI Search Growth",
      subtitle: "Complete generative engine optimization for growing brands & ecommerce",
      priceBdt: "৳35,000",
      priceUsd: "$350",
      duration: "Monthly Retainer",
      isPopular: true,
      features: [
        "Up to 35 Target Entities & Conversational Queries",
        "Google AI Overviews, Gemini & ChatGPT Optimization",
        "Direct Answer Capsules & Table Formatting (25 Pages)",
        "Comprehensive Knowledge Graph Entity Building",
        "High Information-Gain Content Creation (4 Articles/Mo)",
        "Semantic Co-Citations & Digital PR Mentions",
        "Full Core Web Vitals & Technical Speed Tuning",
        "Bi-Weekly Progress Debrief & Citation Tracking"
      ]
    },
    {
      name: "Enterprise AI Domination",
      subtitle: "Full-scale multi-platform generative search authority for market leaders",
      priceBdt: "৳65,000",
      priceUsd: "$650",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Unlimited Target Entities & Semantic Topic Clusters",
        "Multi-Platform LLM Domination (Google, ChatGPT, Perplexity, Claude)",
        "Complete Website Restructuring for AI Search Ingestion",
        "Proprietary Research & Primary Data Ingestion Strategy",
        "Wikidata, Knowledge Graph & Author Entity Network",
        "10 High-Authority Niche PR Co-Citations / Month",
        "Continuous AI Overviews Sentiment & Citation Monitoring",
        "Dedicated SEO Strategist & 24/7 Priority WhatsApp"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "B2B SaaS Platform in Bangladesh",
      challenge: "Lost 35% of organic impressions after Google AI Overviews launched for key transactional search queries.",
      solution: "Engineered entity-focused answer capsules, deployed nested SoftwareApplication & FAQPage schemas, and created proprietary benchmark data.",
      results: "+280% increase in Google AI Overviews source citations, +145% qualified demo signups in 90 days."
    },
    {
      title: "Leading Healthcare Diagnostic Center",
      challenge: "Did not appear in AI search queries or conversational medical questions in Dhaka.",
      solution: "Structured doctor profiles with MedicalWebPage schema, optimized service pages with medical E-E-A-T protocols, and built localized citation graphs.",
      results: "#1 cited clinic across ChatGPT and Google AI Overviews for 40+ medical specialties in Dhaka."
    },
    {
      title: "High-Ticket Ecommerce Retailer",
      challenge: "Competitors dominated generative AI comparisons and product recommendation prompts.",
      solution: "Deployed Product structured data with review sentiment nodes, optimized product comparison matrices, and published buyer guides.",
      results: "+190% organic revenue surge driven by AI Overviews and conversational search referrals."
    }
  ];

  const testimonials = [
    {
      name: "Tanvir Ahmed",
      role: "Founder, Apex Cloud Solutions",
      text: "Abdullah Saleh transformed our organic strategy. When Google AI Overviews rolled out, our competitors lost traffic while our brand became the #1 cited source in our niche. His deep grasp of semantic SEO and AI search algorithms is unmatched in Bangladesh."
    },
    {
      name: "Dr. Farzana Rahman",
      role: "Managing Director, CarePoint Health",
      text: "We wanted our diagnostic center to be recommended whenever patients ask AI assistants for medical specialists in Dhaka. Abdullah's AI SEO roadmap positioned our medical team as verified authorities across Google and ChatGPT."
    },
    {
      name: "Mahmudul Hasan",
      role: "Head of Marketing, BanglaTech Hub",
      text: "Abdullah's systematic approach to entity building and answer capsules delivered tangible results within 60 days. Our organic inbound inquiries have grown consistently month after month without paid ads."
    },
    {
      name: "Sabrina Chowdhury",
      role: "CEO, Artisan Living Bangladesh",
      text: "Working with Abdullah gave us a massive competitive advantage. His technical schema expertise and AI search optimization helped our boutique lifestyle brand get featured directly in conversational search results."
    }
  ];

  const servicePillars = [
    {
      icon: "fa-robot",
      title: "Google AI Overviews & SGE Optimization",
      desc: "Format website content into concise, authoritative answers specifically designed for Google's Generative Experience algorithms and AI summary carousels."
    },
    {
      icon: "fa-brain",
      title: "ChatGPT & Perplexity Citation Engineering",
      desc: "Optimize brand authority, unstructured text embeddings, and digital references so conversational AI engines recommend your business in direct chat prompts."
    },
    {
      icon: "fa-diagram-project",
      title: "Semantic Entity Graph Building",
      desc: "Map your brand, products, key personnel, and core services into Google Knowledge Graph nodes using unambiguous machine-readable entity definitions."
    },
    {
      icon: "fa-code",
      title: "Advanced JSON-LD Structured Data",
      desc: "Implement multi-layered schemas (Organization, Person, Service, FAQPage, ItemList, AboutPage) to provide explicit factual context to AI crawlers."
    },
    {
      icon: "fa-feather-pointed",
      title: "Information Gain Content Strategy",
      desc: "Create original, non-duplicative content with proprietary data, expert insights, and case studies that AI models prioritize over repetitive web copy."
    },
    {
      icon: "fa-award",
      title: "E-E-A-T Credibility & Author Signals",
      desc: "Reinforce Experience, Expertise, Authoritativeness, and Trustworthiness through verified author bios, press citations, and external trust badges."
    }
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI SEO Service in Bangladesh",
    "provider": {
      "@type": "Person",
      "name": "Abdullah Saleh",
      "url": "https://seoservice.local",
      "jobTitle": "Best SEO Expert in Bangladesh & AI Search Specialist",
      "telephone": siteSettings.whatsapp_number,
      "email": siteSettings.contact_email
    },
    "description": "Professional AI SEO services in Bangladesh by Abdullah Saleh. Optimize your website for Google AI Overviews, Gemini, ChatGPT Search, and Perplexity AI with semantic entity graphs and advanced schema.",
    "areaServed": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI SEO Packages",
      "itemListElement": packages.map((pkg, idx) => ({
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
            <span style={{ color: "#0f172a", fontWeight: 700 }}>AI SEO Service in Bangladesh</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            
            {/* Hero Left Content */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#059669", marginBottom: "16px" }}>
                <i className="fa-solid fa-microchip"></i>
                <span>AI-DRIVEN SEARCH &amp; SGE OPTIMIZATION</span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.02em" }}>
                AI SEO Service in Bangladesh: Dominate Google AI Overviews &amp; ChatGPT Search
              </h1>

              <p style={{ fontSize: "1.08rem", color: "#334155", lineHeight: 1.75, marginBottom: "24px" }}>
                Search is evolving from ten blue links to AI-synthesized answers. As an experienced SEO specialist in Bangladesh with 6+ years of track record, I help businesses optimize their entities, schema architecture, and content to get cited, recommended, and ranked across Google AI Overviews, Gemini, ChatGPT, and Perplexity.
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
                  <i className="fa-solid fa-layer-group"></i> View AI Packages
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
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>100% White-Hat E-E-A-T</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>LLM Citation Focused</span>
                </div>
              </div>

            </div>

            {/* Hero Right Quick Audit Card */}
            <div style={{ background: "#ffffff", border: "1px solid #dbeafe", borderRadius: "4px", padding: "30px", boxShadow: "0 10px 30px rgba(0, 98, 210, 0.08)" }}>
              <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Free Diagnostic
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>
                  Get Your Free AI SEO Readiness Audit
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "6px 0 0" }}>
                  Discover how your website appears in Google AI Overviews and ChatGPT.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px", padding: "20px", textAlign: "center", color: "#065f46" }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "2rem", color: "#059669", marginBottom: "10px" }}></i>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 6px" }}>Audit Request Received!</h4>
                  <p style={{ fontSize: "0.88rem", margin: 0, lineHeight: 1.6 }}>
                    Thank you, <strong>{formData.name}</strong>. I will review your website and send your AI SEO roadmap via WhatsApp/email within 24 hours.
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
                      placeholder="e.g. +880 1XXXXXXXXX"
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
                      Primary AI Search Goal
                    </label>
                    <select
                      name="aiTarget"
                      value={formData.aiTarget}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.92rem", background: "#ffffff" }}
                    >
                      <option value="Google AI Overviews (SGE)">Google AI Overviews (SGE)</option>
                      <option value="ChatGPT Search Citations">ChatGPT Search Citations</option>
                      <option value="Perplexity AI & Claude">Perplexity AI &amp; Claude</option>
                      <option value="Full Multi-Platform AI SEO">Full Multi-Platform AI SEO</option>
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
                    <i className="fa-solid fa-paper-plane"></i> Request Free AI Audit
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 2. WHAT IS AI SEO SECTION */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-lightbulb"></i>
              <span>THE FUTURE OF SEARCH</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Why AI SEO is Crucial for Your Business in 2025 and Beyond
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Search engine users no longer just browse links; they ask complex multi-part questions and receive instant AI answers. If your website is not structured for LLM ingestion, your competitors will capture all conversational search traffic.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-arrows-split-up-and-left"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                From Keywords to Semantic Entities
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Modern AI algorithms do not count keyword repetitions. They analyze semantic relationships between entities (People, Places, Concepts, Services) across Google’s Knowledge Graph. AI SEO establishes your business as a validated, authoritative entity.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Becoming the Cited Source in AI Answers
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                When Google SGE or ChatGPT generates a synthesized answer, it links directly to 2–4 primary references via source chips. Our AI SEO strategy formats your pages into high-clarity direct answer capsules that AI algorithms prioritize for citation.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-gem"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                High Information Gain Scoring
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Google’s Information Gain patent actively penalizes websites that repeat standard generic copy. We enrich your website with unique industry data, proprietary case benchmarks, expert author quotes, and structured comparison tables.
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
              Comprehensive AI SEO Service Pillars
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Every layer of your website is optimized for neural search crawlers, semantic comprehension, and LLM reference indexing.
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
              <span>EXECUTION METHODOLOGY</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Our 4-Step AI SEO Optimization Process
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              A battle-tested framework designed to transition your website into a recognized authority across generative search engines.
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
              <span>BUSINESS IMPACT</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Key Benefits of AI Search Engine Optimization
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Gain sustainable competitive advantages that safeguard your traffic and generate qualified leads in an AI-first world.
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
              AI SEO Service Packages in Bangladesh
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Fixed, transparent monthly retainers with zero hidden fees. Personalized service delivered directly by Abdullah Saleh.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "stretch" }}>
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: pkg.isPopular ? "2px solid #0062d2" : "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: pkg.isPopular ? "0 10px 30px rgba(0, 98, 210, 0.12)" : "none"
                }}
              >
                {pkg.isPopular && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#0062d2", color: "#ffffff", padding: "4px 16px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
                  href={`https://wa.me/8801670769816?text=${encodeURIComponent(`Hello Abdullah, I am interested in your ${pkg.name} (${pkg.priceBdt}/mo) for AI SEO service.`)}`}
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
              Real Client Success Stories
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              See how our AI SEO and semantic optimization strategies delivered measurable growth in competitive industries.
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
              <span>CLIENT FEEDBACK</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              What Clients Say About Working With Abdullah
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
              Frequently Asked Questions About AI SEO
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Clear answers on how AI search optimization works and how it drives revenue.
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
            Ready to Future-Proof Your Search Traffic with AI SEO?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#dbeafe", lineHeight: 1.7, maxWidth: "750px", margin: "0 auto 30px" }}>
            Do not wait for AI search engine updates to erode your traffic. Let us optimize your website for Google AI Overviews, Gemini, ChatGPT, and Perplexity today.
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
