"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function GeoServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    geoTarget: "ChatGPT & Perplexity LLM Citations"
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
      q: "What is GEO (Generative Engine Optimization) and why is it crucial in Bangladesh?",
      a: "GEO (Generative Engine Optimization) is the next-generation search discipline focused on optimizing websites, digital brand footprint, and content data so that generative AI models—such as ChatGPT Search, Perplexity AI, Google Gemini, Anthropic Claude, and Microsoft Copilot—naturally retrieve, synthesize, and cite your business as the recommended authoritative solution when users prompt AI for advice, comparisons, or recommendations."
    },
    {
      q: "How is GEO different from traditional SEO and AEO?",
      a: "Traditional SEO optimizes for keyword matches and organic SERP links. AEO optimizes for short, direct answers in Google's Featured Snippets. GEO (Generative Engine Optimization) optimizes for Retrieval-Augmented Generation (RAG) workflows in Large Language Models (LLMs). GEO focuses on semantic vector embeddings, high Information Gain, brand co-occurrences across authoritative training datasets, and multi-turn conversational relevance."
    },
    {
      q: "How do Large Language Models (LLMs) decide which brands to cite?",
      a: "LLMs prioritize brands that possess: (1) high factual consistency across multiple verified external sources (Wikidata, trusted news, industry hubs); (2) unique statistical data and primary research that cannot be found elsewhere; (3) clear entity relationships defined in structured JSON-LD schema; and (4) strong contextual co-citations linking the brand name with positive sentiment and relevant problem-solving attributes."
    },
    {
      q: "How much does GEO service cost in Bangladesh?",
      a: "GEO service packages in Bangladesh range from ৳22,000 to ৳70,000+ per month depending on catalog size, entity complexity, digital PR co-citation targets, and industry competition. My Starter GEO package begins at ৳22,000/month, while the Generative Authority Sprint is ৳38,000/month."
    },
    {
      q: "How long does it take for ChatGPT or Perplexity to cite my website?",
      a: "Perplexity AI and ChatGPT Search (which pull real-time web data) often start citing newly optimized entity pages and high Information-Gain assets within 3 to 6 weeks. Core base model pre-training updates and persistent knowledge retrieval across Claude and Gemini typically consolidate over 3 to 6 months of consistent entity building."
    },
    {
      q: "Can GEO protect my business from AI search hallucinations?",
      a: "Yes. When an LLM lacks clear, structured, and factual data about your business, it may produce inaccurate or hallucinated details about your pricing, services, or location. GEO establishes clear, machine-readable factual grounding through Schema.org markup, entity validation, and unambiguous brand documentation that AI engines ingest verbatim."
    },
    {
      q: "Why is Information Gain the most important metric in GEO?",
      a: "Generative AI engines despise repetitive 'me-too' content because LLM compression algorithms filter out redundant data. Information Gain measures the unique delta of new knowledge your page contributes. By publishing proprietary case studies, survey results, unique methodologies, and expert data tables, your website achieves the highest priority for LLM citation."
    },
    {
      q: "Do you offer a free GEO and LLM citation audit?",
      a: "Yes. I provide a 100% free GEO diagnostic audit. I test how your brand is currently represented across ChatGPT Search, Perplexity, and Gemini, evaluate your entity clarity and semantic co-citations, and provide a clear LLM optimization roadmap within 24 hours via WhatsApp or email."
    }
  ];

  const benefits = [
    {
      icon: "fa-brain",
      title: "Direct Recommendations in ChatGPT",
      desc: "Get suggested and cited by name when potential clients ask ChatGPT Search for the best providers in your vertical."
    },
    {
      icon: "fa-asterisk",
      title: "Perplexity AI Source Ingestion",
      desc: "Secure prominent clickable source cards in Perplexity AI research answers, capturing hyper-qualified commercial traffic."
    },
    {
      icon: "fa-network-wired",
      title: "Semantic Vector Alignment",
      desc: "Align your website content with multi-dimensional vector embeddings so neural retrieval models map your brand to customer intents."
    },
    {
      icon: "fa-database",
      title: "RAG Pipeline Priority",
      desc: "Structure your web architecture so real-time Retrieval-Augmented Generation systems index and extract your content effortlessly."
    },
    {
      icon: "fa-shield-halved",
      title: "Brand Grounding & Accuracy",
      desc: "Eliminate AI hallucinations and ensure AI models provide 100% accurate information regarding your pricing, offerings, and credentials."
    },
    {
      icon: "fa-chart-pie",
      title: "Highest Converting Traffic Tier",
      desc: "Users referred by conversational AI engines have already been convinced by the AI's reasoning, leading to 3x higher conversion rates."
    },
    {
      icon: "fa-newspaper",
      title: "Digital PR & Co-Citation Authority",
      desc: "Build strategic brand co-mentions across authoritative industry sources that LLMs use as trusted consensus benchmarks."
    },
    {
      icon: "fa-trophy",
      title: "Category Dominance Over Competitors",
      desc: "While competitors cling to old keyword lists, your business establishes itself as the definitive category leader in AI-generated answers."
    }
  ];

  const processSteps = [
    {
      num: "01",
      icon: "fa-magnifying-glass-chart",
      title: "LLM Citation & Retrieval Audit",
      desc: "We test your brand footprint across ChatGPT Search, Perplexity, Claude, and Gemini to map current citation frequency, sentiment, and factual gaps."
    },
    {
      num: "02",
      icon: "fa-diagram-project",
      title: "Entity Disambiguation & Schema Modeling",
      desc: "We deploy nested JSON-LD schema linking your brand to authoritative Knowledge Graph nodes, establishing undisputed factual grounding."
    },
    {
      num: "03",
      icon: "fa-feather-pointed",
      title: "High Information-Gain Content Engineering",
      desc: "We create proprietary research, benchmark data, and expert comparison frameworks engineered for neural vector search ingestion."
    },
    {
      num: "04",
      icon: "fa-share-nodes",
      title: "Digital PR & Semantic Co-Citation Distribution",
      desc: "We seed brand co-citations across verified industry directories, press releases, and reputable niche portals to reinforce LLM consensus."
    }
  ];

  const packages = [
    {
      name: "GEO Foundation",
      subtitle: "For boutique brands and specialized services seeking initial LLM visibility",
      priceBdt: "৳22,000",
      priceUsd: "$220",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Up to 20 Core Entity & Conversational Targets",
        "Full LLM Citation & Brand Hallucination Audit",
        "ChatGPT Search & Perplexity AI Optimization",
        "Information Gain Content Structuring (10 Pages)",
        "Advanced Organization & Entity Schema Deployment",
        "Google Knowledge Graph & Wikidata Alignment",
        "Monthly Generative Engine Visibility Report"
      ]
    },
    {
      name: "Generative Authority Sprint",
      subtitle: "Aggressive multi-platform LLM dominance for scaling businesses & agencies",
      priceBdt: "৳38,000",
      priceUsd: "$380",
      duration: "Monthly Retainer",
      isPopular: true,
      features: [
        "Up to 45 Entity & Multi-Turn Conversational Clusters",
        "Multi-Platform Optimization (ChatGPT, Perplexity, Gemini, Claude)",
        "Proprietary Benchmark & Research Hub Creation (2 Deep Hubs/Mo)",
        "Semantic Co-Citation Building (6 Authority Digital PR Mentions)",
        "Full Vector Search & RAG Architecture Optimization",
        "Brand Fact Grounding & Sentiment Reputation Defense",
        "Technical Speed & Clean Data Scrape Optimization",
        "Bi-Weekly Progress Debrief & Priority WhatsApp Support"
      ]
    },
    {
      name: "Enterprise LLM Domination",
      subtitle: "Full-scale generative AI category leadership for enterprise brands",
      priceBdt: "৳70,000",
      priceUsd: "$700",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Unlimited Entity Targets & Semantic Ontologies",
        "End-to-End Enterprise Knowledge Graph & Entity Matrix",
        "Original Proprietary Survey & Dataset Ingestion Strategy",
        "15 High-DA Digital PR Co-Citations & Authority Mentions / Month",
        "Complete Web RAG Ingestion Pipeline Optimization",
        "Continuous Automated LLM Prompt Tracking & Sentiment Monitoring",
        "Dedicated Account Strategist & 24/7 Priority WhatsApp",
        "Quarterly Executive AI Search Roadmap"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "B2B Supply Chain Software",
      challenge: "When prospects asked ChatGPT for top warehouse software in Southeast Asia, only legacy competitors were recommended.",
      solution: "Engineered proprietary logistics efficiency benchmarks, structured software schema, and generated digital PR co-citations.",
      results: "Became the #1 recommended solution across ChatGPT Search and Perplexity, driving +240% increase in inbound enterprise demos."
    },
    {
      title: "Premium Education & Study Abroad Consultancy",
      challenge: "LLMs gave outdated, hallucinated visa fee details and failed to recommend the agency in Dhaka.",
      solution: "Grounding optimization with structured tables, university partnership schemas, and verified alumni case studies.",
      results: "Eliminated AI hallucinations and secured consistent top recommendations across Gemini and ChatGPT."
    },
    {
      title: "FinTech Merchant Payment Gateway",
      challenge: "Did not appear in conversational AI comparisons for merchant fee rates and API integrations.",
      solution: "Deployed developer documentation schema, published live fee comparison matrices, and built high-authority FinTech co-citations.",
      results: "+310% surge in qualified developer and business merchant registrations originating from AI searches."
    }
  ];

  const testimonials = [
    {
      name: "Zubair Al-Mamun",
      role: "CTO, LogiTrack Global",
      text: "Abdullah Saleh is truly ahead of the curve. While other agencies are still doing basic 2015 keyword stuffing, Abdullah restructured our brand for Generative Engine Optimization. We are now cited in ChatGPT and Perplexity for all our core B2B solutions."
    },
    {
      name: "Nusrat Jahan",
      role: "Director, Global Visa Pathway",
      text: "Abdullah fixed our AI search footprint completely. When students ask AI tools for study abroad advisors in Bangladesh, our consultancy is now consistently highlighted as the top trusted brand."
    },
    {
      name: "Saadman Sakib",
      role: "Founder, FinPay BD",
      text: "The ROI from Abdullah's GEO strategy has been incredible. High-intent decision makers researching on ChatGPT are discovering our gateway and converting into active merchant accounts."
    },
    {
      name: "Mehedi Hasan",
      role: "Managing Partner, Prime Digital Consulting",
      text: "Abdullah's deep technical knowledge of Knowledge Graphs, schema, and LLM retrieval pipelines is unmatched. Working with him gave us a massive unfair advantage in our industry."
    }
  ];

  const servicePillars = [
    {
      icon: "fa-brain",
      title: "LLM Citation & Retrieval Engineering",
      desc: "Optimize website architecture and unstructured text so Retrieval-Augmented Generation (RAG) models cite your brand in live AI queries."
    },
    {
      icon: "fa-network-wired",
      title: "Semantic Vector Space Alignment",
      desc: "Structure content terminology and thematic context to align with high-dimensional vector embeddings utilized by modern search models."
    },
    {
      icon: "fa-newspaper",
      title: "Digital PR & Brand Co-Citations",
      desc: "Earn high-authority contextual brand mentions alongside respected industry keywords across trusted third-party consensus sources."
    },
    {
      icon: "fa-chart-column",
      title: "Information Gain & Proprietary Data",
      desc: "Publish original industry research, unique statistics, and proprietary case benchmarks that LLMs prioritize over duplicate web text."
    },
    {
      icon: "fa-shield-halved",
      title: "AI Grounding & Hallucination Defense",
      desc: "Provide clear, unambiguous machine-readable facts and schemas to prevent generative models from hallucinating false business data."
    },
    {
      icon: "fa-diagram-project",
      title: "Knowledge Graph Entity Disambiguation",
      desc: "Connect your company, founders, and services to authoritative nodes on Wikidata, Google Knowledge Graph, and industry taxonomies."
    }
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GEO Service in Bangladesh (Generative Engine Optimization)",
    "provider": {
      "@type": "Person",
      "name": "Abdullah Saleh",
      "url": "https://seoservice.local",
      "jobTitle": "Best SEO Expert in Bangladesh & Generative Search Specialist",
      "telephone": siteSettings.whatsapp_number,
      "email": siteSettings.contact_email
    },
    "description": "Professional GEO (Generative Engine Optimization) services in Bangladesh by Abdullah Saleh. Get your brand cited and recommended in ChatGPT, Perplexity, Gemini, and Claude.",
    "areaServed": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "GEO Packages",
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
            <span style={{ color: "#0f172a", fontWeight: 700 }}>GEO Service in Bangladesh</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            
            {/* Hero Left Content */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#059669", marginBottom: "16px" }}>
                <i className="fa-solid fa-brain"></i>
                <span>GENERATIVE ENGINE OPTIMIZATION (GEO)</span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.02em" }}>
                GEO Service in Bangladesh: Get Recommended in ChatGPT, Gemini &amp; Perplexity
              </h1>

              <p style={{ fontSize: "1.08rem", color: "#334155", lineHeight: 1.75, marginBottom: "24px" }}>
                Generative AI models are the new search gatekeepers. With 6+ years of specialized search optimization expertise, I help businesses engineer their brand entities, digital PR co-citations, and information gain to become the primary cited authority across ChatGPT Search, Perplexity, Google Gemini, and Claude.
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
                  <i className="fa-solid fa-layer-group"></i> View GEO Packages
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
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>LLM Citation Focused</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>RAG Pipeline Ready</span>
                </div>
              </div>

            </div>

            {/* Hero Right Quick Audit Card */}
            <div style={{ background: "#ffffff", border: "1px solid #dbeafe", borderRadius: "8px", padding: "30px", boxShadow: "0 10px 30px rgba(0, 98, 210, 0.08)" }}>
              <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Free LLM Audit
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>
                  Get Your Free GEO &amp; LLM Citation Audit
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "6px 0 0" }}>
                  See how ChatGPT, Perplexity, and Gemini currently evaluate your brand.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px", padding: "20px", textAlign: "center", color: "#065f46" }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "2rem", color: "#059669", marginBottom: "10px" }}></i>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 6px" }}>Audit Request Received!</h4>
                  <p style={{ fontSize: "0.88rem", margin: 0, lineHeight: 1.6 }}>
                    Thank you, <strong>{formData.name}</strong>. I will run your brand LLM citation analysis and send your GEO roadmap via WhatsApp/email within 24 hours.
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
                      Primary GEO Target
                    </label>
                    <select
                      name="geoTarget"
                      value={formData.geoTarget}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "0.92rem", background: "#ffffff" }}
                    >
                      <option value="ChatGPT & Perplexity LLM Citations">ChatGPT &amp; Perplexity LLM Citations</option>
                      <option value="Google Gemini & SGE Ingestion">Google Gemini &amp; SGE Ingestion</option>
                      <option value="Digital PR & Brand Co-Citations">Digital PR &amp; Brand Co-Citations</option>
                      <option value="Full Multi-Platform GEO Dominance">Full Multi-Platform GEO Dominance</option>
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
                    <i className="fa-solid fa-paper-plane"></i> Request Free GEO Audit
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 2. WHAT IS GEO SECTION */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-lightbulb"></i>
              <span>THE REVOLUTION IN SEARCH</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              Why Generative Engine Optimization is the Future of Organic Growth
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Millions of consumers now bypass search engines completely, asking ChatGPT and Perplexity for product comparisons, service recommendations, and expert advice. GEO ensures your brand is the synthesized solution.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-brain"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Retrieval-Augmented Generation (RAG)
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                When users prompt an AI search engine, the RAG engine performs real-time semantic vector retrieval. We optimize your website architecture and content embeddings so RAG pipelines prioritize your pages.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-share-nodes"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Brand Co-Occurrences &amp; Consensus
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                LLMs establish trust through multi-source consensus. By seeding contextual brand mentions across verified directories, publications, and niche platforms, we train AI models to recognize your authority.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "6px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Factual Grounding &amp; Brand Truth
              </h3>
              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Unstructured websites cause AI models to hallucinate false information. Our structured schema frameworks and entity documentation provide unambiguous machine-readable facts that LLMs quote directly.
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
              Comprehensive GEO Service Pillars
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Engineered specifically for neural search engines, vector databases, and Large Language Model architectures.
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
              Our 4-Step GEO Implementation Framework
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              A proven scientific process designed to establish brand authority across generative AI systems.
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
              Key Advantages of Generative Engine Optimization
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Position your business where modern high-intent buyers conduct conversational research.
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
              GEO Service Packages in Bangladesh
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              Transparent monthly packages designed for ambitious businesses seeking category leadership across AI search models.
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
                  href={`https://wa.me/8801670769816?text=${encodeURIComponent(`Hello Abdullah, I am interested in your ${pkg.name} (${pkg.priceBdt}/mo) for GEO service.`)}`}
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
              <span>PROVEN SUCCESS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              GEO Client Case Studies
            </h2>
            <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>
              How structured entity optimization and Information Gain transformed brands into recognized AI authorities.
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
              <span>CLIENT REVIEWS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              What Industry Leaders Say
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
              Frequently Asked Questions About GEO
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Understand how Generative Engine Optimization gets your brand cited by AI assistants.
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
            Ready to Dominate Conversational Search with GEO?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#dbeafe", lineHeight: 1.7, maxWidth: "750px", margin: "0 auto 30px" }}>
            Ensure your brand is the definitive recommendation when customers ask ChatGPT, Perplexity, Gemini, and Claude for services in your industry.
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
