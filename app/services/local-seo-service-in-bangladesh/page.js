"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function LocalSeoServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    serviceType: "Google 3-Pack Ranking"
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
      q: "What is Local SEO and how does it work for businesses in Bangladesh?",
      a: "Local SEO is the specialized search optimization process that helps your business appear at the top of Google Search and Google Maps when customers search for products or services near them (e.g., 'dentist in Dhanmondi', 'SEO expert in Dhaka', 'best restaurant in Gulshan'). It works by optimizing your Google Business Profile (GBP), standardizing your NAP (Name, Address, Phone) consistency across local citations, creating geo-targeted service pages, and generating high-authority local reviews."
    },
    {
      q: "How much does Local SEO service cost in Bangladesh?",
      a: "Local SEO service packages in Bangladesh typically range from ৳12,000 to ৳50,000+ per month depending on your business type, competition level, target area, and number of branch locations. My Starter package begins at ৳12,000/month for small single-location businesses, while the comprehensive Google 3-Pack Dominance package is ৳25,000/month."
    },
    {
      q: "How long does it take to rank in Google Maps 3-Pack?",
      a: "Most local businesses see noticeable improvements in Google Business Profile visibility, map views, and phone inquiries within 30 to 60 days. Dominating the competitive top-3 Map Pack for high-competition keywords in Dhaka or Chittagong typically takes 3 to 5 months of consistent citation building, geo-content siloing, and review velocity."
    },
    {
      q: "How is Local SEO different from traditional Organic SEO?",
      a: "Traditional SEO focuses on ranking broad informational keywords nationally or globally. Local SEO targets high-intent, location-specific buyer searches within a defined geographical radius. Local SEO prioritizes Google Maps pack rankings, NAP citation distribution, localized schema markup, and Google Business Profile engagement rather than just national backlink volume."
    },
    {
      q: "Do I need a website to benefit from Local SEO?",
      a: "While a verified and optimized Google Business Profile can generate calls and direction requests on its own, having a fast, well-structured website with dedicated city and service landing pages multiplies your ranking power by up to 300%. A website allows search engines to associate your brand with surrounding geographical entities, giving you an unbeatable edge over competitors without sites."
    },
    {
      q: "What is the Google Local 3-Pack and why is it important?",
      a: "The Google Local 3-Pack is the prominent map container displaying the top 3 local business listings at the very top of Google's search results page. Studies show that over 70% of local search clicks and direct phone calls go to these top 3 listings. If your business is not in the top 3, you are losing the vast majority of local customers to competitors."
    },
    {
      q: "Why is my business not showing up on Google Maps?",
      a: "Common reasons include unverified or suspended Google Business Profiles, incorrect primary business categories, inconsistent NAP details across online directories, lack of local reviews, weak proximity signals, or hidden algorithmic spam filters. My free local SEO audit diagnoses the exact roadblocks holding your listing back."
    },
    {
      q: "Can Local SEO help my business appear in ChatGPT, Gemini, and Google AI Overviews?",
      a: "Yes. Generative AI engines (ChatGPT, Google AI Overviews, Gemini, Perplexity) extract local business recommendations from structured Google Business Profile data, verified customer review sentiments, and accurate Schema.org LocalBusiness markup. My local SEO strategy formats your data specifically for AI recommendation models."
    },
    {
      q: "Is Local SEO better than running paid Facebook or Google Ads?",
      a: "Paid ads stop producing traffic the second your daily ad budget ends. Local SEO builds permanent organic real estate on Google Maps. Furthermore, organic local map rankings convert up to 5x higher than paid ads because buyers inherently trust Google's organic recommendations over sponsored badges."
    },
    {
      q: "Do you offer a free Local SEO audit for Bangladeshi businesses?",
      a: "Yes. I provide a 100% free, no-obligation Local SEO & Google Maps diagnostic. I analyze your current GBP health score, map radius rank grid, competitor gaps, citation status, and review profile, delivering an actionable roadmap within 24 hours via WhatsApp or email."
    }
  ];

  const benefits = [
    {
      icon: "fa-phone-volume",
      title: "More Direct Phone Calls & Walk-Ins",
      desc: "Ranking in Google's Local 3-Pack places your direct call button and store directions right in front of active buyers. Top-3 listings capture over 70% of all local mobile clicks."
    },
    {
      icon: "fa-bullseye",
      title: "High Purchase-Intent 'Near Me' Traffic",
      desc: "Users searching 'dentist near me' or 'lawyer in Dhaka' are not casual readers—they are ready to hire immediately. Local SEO connects your brand at the exact moment of decision."
    },
    {
      icon: "fa-chart-pie",
      title: "5x Higher Conversion Than Paid Ads",
      desc: "Organic map pack rankings convert at 5x the rate of paid search ads because local customers trust earned credibility over paid sponsor tags."
    },
    {
      icon: "fa-brain",
      title: "Appear in AI-Generated Search Answers",
      desc: "AI answer engines like Google AI Overviews, ChatGPT, and Gemini pull local recommendations from structured GBP listings and entity-rich local content."
    },
    {
      icon: "fa-chart-line",
      title: "Measurable ROI & Transparent Tracking",
      desc: "Track every milestone with transparent monthly reports showing map grid rank improvements, Google call metrics, direction requests, and website visits."
    },
    {
      icon: "fa-shield-halved",
      title: "Enhanced Trust & 5-Star Reputation",
      desc: "Systematic review generation and accurate NAP citation consistency establish your brand as the definitive, reputable community authority."
    },
    {
      icon: "fa-seedling",
      title: "Long-Term Compounding Ranking Equity",
      desc: "Unlike ads that vanish when the budget runs out, local SEO builds permanent topical and geographical authority that continues to deliver customers month after month."
    },
    {
      icon: "fa-trophy",
      title: "Outrank Competitors Across Your City",
      desc: "Local SEO levels the playing field. A well-optimized local business in Mirpur, Dhanmondi, or Uttara can easily outrank massive corporate brands across target zones."
    }
  ];

  const processSteps = [
    {
      num: "01",
      icon: "fa-magnifying-glass-chart",
      title: "Local Audit & Geo-Competitor Discovery",
      desc: "We perform an in-depth audit of your Google Business Profile, map radius ranking grid, NAP consistency across 50+ directories, and analyze top local competitors in your zone."
    },
    {
      num: "02",
      icon: "fa-map-location-dot",
      title: "Google Business Profile & Geo-Silo Setup",
      desc: "We fully optimize your GBP categories, service menus, attributes, geotagged imagery, and build localized on-page service silos with LocalBusiness Schema markup."
    },
    {
      num: "03",
      icon: "fa-link",
      title: "Local Citations & Authority Link Building",
      desc: "We build clean, consistent citations on high-authority Bangladeshi and international business directories, local news portals, and niche-specific industry hubs."
    },
    {
      num: "04",
      icon: "fa-arrows-rotate",
      title: "Review Velocity, AI Optimization & Scaling",
      desc: "We deploy automated review generation workflows, optimize GBP weekly updates, format data for AI search engines (ChatGPT/Gemini), and expand your local map ranking radius."
    }
  ];

  const packages = [
    {
      name: "Local Starter Package",
      subtitle: "Ideal for single-location small businesses and retail shops",
      priceBdt: "৳12,000",
      priceUsd: "$120",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "1 Google Business Profile (GBP) Optimization",
        "Targeting Up to 10 High-Intent Local Keywords",
        "Complete NAP Consistency & Audit",
        "20+ High-Authority Local Business Citations",
        "Basic LocalBusiness Schema Markup",
        "Bi-Weekly GBP Posts & Geotagged Image Uploads",
        "Monthly Ranking & Call Tracking Report"
      ]
    },
    {
      name: "Google 3-Pack Dominance",
      subtitle: "Full-scale local search domination for growing service businesses",
      priceBdt: "৳25,000",
      priceUsd: "$250",
      duration: "Monthly Retainer",
      isPopular: true,
      features: [
        "Complete Google 3-Pack Domination Strategy",
        "Targeting Up to 25 Competitive Local Keywords",
        "Advanced GBP Optimization & Spam Fighting",
        "50+ Tier-1 Citations & Local Directory Listings",
        "On-Page Geo-Silo Architecture & Local Landing Pages",
        "Advanced Schema.org (LocalBusiness, Geo, FAQ, Review)",
        "Automated 5-Star Review Generation Strategy",
        "Weekly Geotagged Visuals & Optimized GBP Updates",
        "AI Search Engine (ChatGPT / Gemini) Local Optimization",
        "Bi-Weekly Strategy Call & Custom Real-Time Dashboard"
      ]
    },
    {
      name: "Multi-Location / Enterprise",
      subtitle: "For multi-branch brands, medical centers, and high-ticket service firms",
      priceBdt: "৳50,000",
      priceUsd: "$500",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Everything in Google 3-Pack Dominance",
        "Multi-Location & City-Wide GBP Management (Up to 3 Branches)",
        "Targeting 50+ High-Value Commercial Local Queries",
        "100+ Custom Local Citations & Digital PR Mentions",
        "Dedicated Multi-City Geo Landing Page Architecture",
        "Competitor Map Spam Reporting & Algorithmic Reclamation",
        "Review Management & Automated Customer Sentiment Tracking",
        "Priority 24/7 WhatsApp & Direct Phone Support",
        "Dedicated SEO Growth Specialist"
      ]
    }
  ];

  const caseStudies = [
    {
      brand: "We Misc",
      location: "Mirpur-10, Dhaka",
      industry: "Web Design & IT Solutions",
      results: [
        "+70% Increase in Website Search Visibility",
        "+50% Growth in High-Ticket Business Inquiries",
        "Ranked #1 for 'Web Design Company in Mirpur' in 4 Months"
      ],
      summary: "We Misc faced low local visibility and inconsistent inbound leads. I deployed a comprehensive Local SEO strategy, fixing technical roadblocks, standardizing NAP data, building local citations, and optimizing their GBP. Within 4 months, inbound customer inquiries increased by 50%."
    },
    {
      brand: "Balloons Right Now",
      location: "Boca Raton, Florida, USA",
      industry: "eCommerce & Event Decor",
      results: [
        "+75% Surge in Local Organic Impressions",
        "+45% Growth in Qualified Local Leads",
        "Top 3 Map Pack Domination Across Target Suburbs"
      ],
      summary: "Balloons Right Now struggled with low local map visibility. I executed targeted GBP optimization, structured product local schema, and intent-focused practice content, driving a 75% increase in organic performance and consistent event bookings."
    },
    {
      brand: "Shim Law Group",
      location: "New York, NY, USA",
      industry: "Personal Injury Law Practice",
      results: [
        "+267% Surge in Local Search Impressions",
        "45+ Commercial Keywords in Google Map Pack",
        "+35% Increase in Direct Legal Consultations"
      ],
      summary: "Operating in one of the most competitive legal markets in the world, Shim Law Group needed decisive local search visibility. I revamped their GBP architecture, built authoritative legal citations, and optimized their mobile Core Web Vitals, yielding a 267% impression increase."
    }
  ];

  const reviews = [
    {
      name: "Al Mumin",
      role: "Business Owner, Dhaka",
      text: "I was getting visitors but no real inquiries from my website. Abdullah Saleh improved my local content and SEO structure, and the quality of traffic changed dramatically. Now I am getting real phone calls and local customer inquiries every week. His clear strategy and honest approach make him the top local SEO expert in Bangladesh."
    },
    {
      name: "HRIDOY SHEIKH",
      role: "Managing Director, Retail Brand",
      text: "Abdullah Saleh did an exceptional job improving our Google Maps ranking. His local SEO roadmap was crystal clear, and within just 60 days our shop started appearing in the Google 3-Pack for our primary keywords. Highly recommended for genuine business growth."
    },
    {
      name: "Shimun A. Ilyayev, Esq.",
      role: "Managing Attorney, Shim Law Group NY",
      text: "As a personal injury law firm in New York, local search visibility is vital to our practice. Abdullah Saleh optimized our Google Business Profile, built rock-solid citations, and fixed our technical signals. Within months, we saw 45+ keywords reach the Map Pack. Truly an exceptional local SEO specialist."
    },
    {
      name: "Mashiuzzaman Samir",
      role: "CEO, We Misc",
      text: "Abdullah helped We Misc dominate local search with modern SEO, AEO, and GEO tactics. His deep understanding of search intent and Google Maps algorithms resulted in a 50% increase in qualified client leads within 4 months. He is dependable, transparent, and results-driven."
    }
  ];

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://abdullahseo.com/services/local-seo-service-in-bangladesh/#service",
                "serviceType": "Local SEO Service",
                "name": "Local SEO Service in Bangladesh",
                "description": "Professional Local SEO service in Bangladesh by Abdullah Saleh. Rank #1 on Google Maps 3-Pack, optimize Google Business Profile (GBP), build local citations, and drive high-intent local customer calls.",
                "provider": {
                  "@type": "Person",
                  "name": "Abdullah Saleh",
                  "jobTitle": "Organic Business Growth Specialist & SEO Expert",
                  "url": "https://abdullahseo.com"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Bangladesh"
                },
                "url": "https://abdullahseo.com/services/local-seo-service-in-bangladesh",
                "offers": {
                  "@type": "Offer",
                  "price": "12000",
                  "priceCurrency": "BDT",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "12000",
                    "priceCurrency": "BDT",
                    "minPrice": "12000",
                    "maxPrice": "50000",
                    "referenceQuantity": {
                      "@type": "QuantitativeValue",
                      "value": "1",
                      "unitCode": "MON"
                    }
                  }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "reviewCount": "97",
                  "bestRating": "5",
                  "worstRating": "4"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://abdullahseo.com/services/local-seo-service-in-bangladesh/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://abdullahseo.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Services",
                    "item": "https://abdullahseo.com/services"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Local SEO Service in Bangladesh",
                    "item": "https://abdullahseo.com/services/local-seo-service-in-bangladesh"
                  }
                ]
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://abdullahseo.com/#localbusiness",
                "name": "Abdullah Saleh - SEO Expert in Bangladesh",
                "url": "https://abdullahseo.com",
                "telephone": "+8801670769816",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "House No: 8, Road No: 4, Senpara, Parbata, Mirpur-10",
                  "addressLocality": "Dhaka",
                  "postalCode": "1216",
                  "addressCountry": "BD"
                },
                "openingHours": "Mo-Su 00:00-23:59",
                "priceRange": "$$"
              },
              {
                "@type": "FAQPage",
                "@id": "https://abdullahseo.com/services/local-seo-service-in-bangladesh/#faq",
                "mainEntity": faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* 1. HERO SECTION */}
      <section style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)", padding: "60px 0 50px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "40px", alignItems: "start" }}>
            
            {/* Left Column: Value Proposition & Details */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "16px" }}>
                <i className="fa-solid fa-location-dot"></i>
                <span>LOCAL SEO SPECIALIST BANGLADESH</span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.015em" }}>
                Local SEO Service in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Rank #1 on Google Maps</span>
              </h1>

              <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.75, marginBottom: "24px" }}>
                When customers in your city search for your services, are they finding your business or your competitors? I provide the most results-focused Local SEO service in Bangladesh to rank your business in Google&rsquo;s Local 3-Pack and Google Maps. Stop losing high-intent local buyers&mdash;generate consistent phone calls, shop visits, and high-margin revenue through proven search optimization.
              </p>

              {/* Key Bullet Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>6+ Years of Proven Local SEO &amp; Google Maps Ranking Experience</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>100+ Local Businesses Ranked in Google 3-Pack Across Dhaka &amp; Internationally</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Google Business Profile (GBP) &amp; Local Citation Authority Specialist</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Data-Driven Strategy Focused on Phone Calls &amp; Revenue, Not Just Views</span>
                </div>
              </div>

              {/* Problem vs Solution Comparison Box */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "20px" }}>
                <div style={{ borderRight: "1px solid #e2e8f0", paddingRight: "16px" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#dc2626", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-circle-xmark"></i> The Problem Without Local SEO
                  </h4>
                  <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    Your business remains invisible on Google Maps. Nearby customers looking to buy today call your competitors who hold the top 3 spots.
                  </p>
                </div>
                <div style={{ paddingLeft: "8px" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#059669", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-circle-check"></i> The Solution With My Service
                  </h4>
                  <p style={{ fontSize: "0.86rem", color: "#334155", lineHeight: 1.55, margin: 0 }}>
                    I rank your business in Google&rsquo;s 3-Pack and build 50+ local citations so your phone rings with ready-to-buy local customers daily.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Audit Form */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "32px 28px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                  <i className="fa-solid fa-map-location-dot"></i>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Free Local SEO Audit
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
                    Get your Google Maps rank diagnostic within 24 hours
                  </p>
                </div>
              </div>

              {formSubmitted ? (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "20px", textAlign: "center" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#16a34a", fontSize: "2rem", marginBottom: "10px" }}></i>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#166534", marginBottom: "6px" }}>Audit Request Received</h4>
                  <p style={{ fontSize: "0.9rem", color: "#15803d", margin: "0 0 16px" }}>
                    Thank you! I will analyze your Google Business Profile and local rankings and contact you shortly.
                  </p>
                  <a
                    href="https://wa.me/8801670769816"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Abdullah Saleh"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.92rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +880 1XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.92rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Website or Google Business Profile Name *
                    </label>
                    <input
                      type="text"
                      name="website"
                      required
                      placeholder="e.g. myshop.com or My Dental Clinic"
                      value={formData.website}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.92rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Primary Goal
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.92rem", background: "#ffffff" }}
                    >
                      <option value="Google 3-Pack Ranking">Rank in Google Maps Top 3</option>
                      <option value="Google Business Profile Setup">New GBP Setup &amp; Verification</option>
                      <option value="Local Citations & Fixes">Fix Duplicate Listings &amp; NAP</option>
                      <option value="Multi-Location SEO">Multi-Branch Local SEO Strategy</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "12px", fontSize: "0.95rem", fontWeight: 700, borderRadius: "6px", marginTop: "6px" }}
                  >
                    Request Free Local Audit
                  </button>

                  <div style={{ textAlign: "center", marginTop: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "4px" }}>
                      <a href="https://wa.me/8801670769816" target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp Directly
                      </a>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "6px" }}>
                      <i className="fa-solid fa-lock" style={{ marginRight: "4px" }}></i>
                      Your information is strictly confidential. Audit sent within 24h.
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE 8 REAL BENEFITS SECTION */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-award"></i>
              <span>MEASURABLE BUSINESS IMPACT</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              8 Real Benefits Local SEO Delivers for Your Business
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Local search engine optimization is the highest ROI marketing channel for businesses serving specific cities, districts, or neighborhoods across Bangladesh and international markets.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "22px" }}>
            {benefits.map((b, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "24px 20px",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div style={{ width: "42px", height: "42px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem", marginBottom: "16px" }}>
                  <i className={`fa-solid ${b.icon}`}></i>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px", lineHeight: 1.35 }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MY PROVEN 4-STEP PROCESS */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#059669", marginBottom: "12px" }}>
              <i className="fa-solid fa-list-check"></i>
              <span>STRUCTURED EXECUTION ROADMAP</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              My Proven 4-Step Local SEO Process
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              A systematic, white-hat methodology refined over 100+ projects that eliminates guesswork and drives consistent Google Maps rankings.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "22px" }}>
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "26px 20px",
                  position: "relative"
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#e2e8f0", position: "absolute", top: "14px", right: "16px" }}>
                  {step.num}
                </div>
                <div style={{ width: "42px", height: "42px", borderRadius: "6px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem", marginBottom: "16px" }}>
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px", lineHeight: 1.35 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. REAL CASE STUDIES SECTION */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-chart-simple"></i>
              <span>PROVEN CLIENT RESULTS</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              Real SEO Case Studies from Local &amp; Global Clients
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Over 100+ businesses have scaled organic traffic and local customer leads with my data-backed SEO strategies.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0062d2", background: "#eff6ff", padding: "3px 10px", borderRadius: "4px" }}>
                      {cs.industry}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      <i className="fa-solid fa-location-dot" style={{ marginRight: "4px" }}></i>{cs.location}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                    {cs.brand}
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, marginBottom: "18px" }}>
                    {cs.summary}
                  </p>

                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "14px", marginBottom: "18px" }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      Key Results Achieved:
                    </div>
                    {cs.results.map((r, rIdx) => (
                      <div key={rIdx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.86rem", color: "#166534", fontWeight: 600, marginBottom: "4px" }}>
                        <i className="fa-solid fa-circle-check" style={{ color: "#16a34a" }}></i>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/case-study"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#0062d2",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "underline"
                  }}
                >
                  View Case Study Breakdown <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.8rem" }}></i>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TRANSPARENT PRICING PACKAGES */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-tags"></i>
              <span>TRANSPARENT PRICING</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              Local SEO Packages &amp; Plans in Bangladesh
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              No hidden fees, no lock-in contracts. 100% white-hat local search optimization designed to scale with your business revenue.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", alignItems: "stretch" }}>
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: pkg.isPopular ? "2px solid #0062d2" : "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "32px 26px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: pkg.isPopular ? "0 10px 25px -5px rgba(0, 98, 210, 0.12)" : "none"
                }}
              >
                {pkg.isPopular && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#0062d2", color: "#ffffff", padding: "4px 14px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5, marginBottom: "20px", minHeight: "40px" }}>
                    {pkg.subtitle}
                  </p>

                  <div style={{ marginBottom: "22px", paddingBottom: "18px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0f172a" }}>{pkg.priceBdt}</span>
                      <span style={{ fontSize: "0.9rem", color: "#64748b" }}>/ {pkg.priceUsd}</span>
                    </div>
                    <span style={{ fontSize: "0.82rem", color: "#059669", fontWeight: 600 }}>{pkg.duration}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", alignItems: "start", gap: "8px", fontSize: "0.88rem", color: "#334155" }}>
                        <i className="fa-solid fa-check" style={{ color: "#0062d2", marginTop: "3px", fontSize: "0.85rem" }}></i>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://wa.me/8801670769816"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pkg.isPopular ? "btn btn-primary" : "btn btn-outline"}
                  style={{ width: "100%", textAlign: "center", padding: "12px", borderRadius: "6px", fontWeight: 700 }}
                >
                  Choose {pkg.name.split(" ")[0]} Plan
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. VERIFIED CLIENT REVIEWS */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fef3c7", border: "1px solid #fde68a", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#d97706", marginBottom: "12px" }}>
              <i className="fa-solid fa-star"></i>
              <span>5.0 GOOGLE VERIFIED REVIEWS</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              Real Client Reviews &amp; Success Feedback
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Read authentic feedback from business founders in Bangladesh, the United States, and international markets.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "3px", color: "#f59e0b", marginBottom: "14px", fontSize: "0.95rem" }}>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p style={{ fontSize: "0.94rem", color: "#334155", lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0062d2", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem" }}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>{rev.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>{rev.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "4px 12px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-circle-question"></i>
              <span>COMMON QUESTIONS ANSWERED</span>
            </div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "14px" }}>
              Frequently Asked Questions About Local SEO
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              Got questions about ranking on Google Maps in Bangladesh? Find clear, straightforward answers below.
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

      {/* 8. BOTTOM CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg, #0062d2 0%, #004bb5 100%)", padding: "60px 0", color: "#ffffff" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.01em" }}>
            Ready to Dominate Google Maps in Your Area?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#dbeafe", lineHeight: 1.7, maxWidth: "750px", margin: "0 auto 30px" }}>
            Stop letting nearby competitors take your customers. Get a free Local SEO audit and discover how we can rank your business in the Google 3-Pack within 60 to 90 days.
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
