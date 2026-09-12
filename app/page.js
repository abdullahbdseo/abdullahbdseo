"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteSettings, services, globalFaqs } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import ServiceOrderModal from "@/components/ServiceOrderModal";

const verifiedReviews = [
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
    quote: "Delivered exactly what was promised automation, conversion focused pages, and reporting that shows what is actually working.",
    avatar: "A",
  },
  {
    name: "Daniel Reed",
    role: "GrowthStack Media",
    rating: 5,
    quote: "Clear strategy, clean delivery, and better-quality leads within weeks. The KPI reporting made every decision easier.",
    avatar: "D",
  },
  {
    name: "Marcus Vance",
    role: "Founder, CloudFlow SaaS",
    rating: 5,
    quote: "Abdullah took our SaaS platform from 4,000 monthly impressions to over 800K clicks in under 5 months. The depth of his technical audits and topic clusters is unmatched.",
    avatar: "M",
  },
  {
    name: "Sarah Jenkins",
    role: "E-Commerce Director, Apex Retail",
    rating: 5,
    quote: "Our Shopify store's organic revenue grew by 320% after implementing Abdullah's e-commerce category taxonomy and schema strategies. Highly recommended!",
    avatar: "S",
  },
  {
    name: "David Kim",
    role: "CEO, Nexus Digital Agency",
    rating: 5,
    quote: "Hands down the best SEO specialist we have partnered with. Transparent reporting, no fluff, and real Google Search Console ranking proof every single month.",
    avatar: "D",
  }
];

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    website: "",
    phone: ""
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          website: contactForm.website,
          phone: contactForm.phone,
          service_interest: "Free Website SEO Audit Request",
          message: "Free SEO Audit requested from Homepage form."
        })
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: "", email: "", website: "", phone: "" });
      }
    } catch (err) {
      alert("Error submitting request. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  const handleOpenPlan = (name, price, kwCount, backlinks, pages) => {
    setSelectedService({
      id: 7,
      title: "Monthly SEO Growth & Ranking Retainers",
      slug: "monthly-seo-subscription-retainer",
      starting_price: price
    });
    setSelectedPackage({
      id: 990 + price,
      name: `${name} Monthly Plan`,
      price: price,
      delivery_days: 30,
      features: [
        `${kwCount} Target Keywords`,
        "Full Technical & Speed Audit",
        `On-Page Optimization (${pages} Pages)`,
        `${backlinks} High-DA Backlinks / Month`,
        "Monthly Performance & GSC Report"
      ]
    });
  };

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION (Ultra-Professional & High-Converting) */}
      <section className="digi-hero-section">
        <div className="container">
          <div className="digi-hero-grid">
            {/* Left Hero Content */}
            <div className="digi-hero-content">
              {/* Top Eyebrow Badge */}
              <div className="hero-top-badge">
                <span className="hero-badge-dot"></span>
                <span className="hero-badge-text">
                  <i className="fa-solid fa-bolt" style={{ color: "#0284c7" }}></i> Top-Rated SEO Specialist in Bangladesh &bull; 6+ Years Experience
                </span>
                <span className="hero-badge-pill">ROI-Driven</span>
              </div>

              <h1>
                <span className="text-blue">Search</span> Engine <span className="text-blue">Optimization</span><br />
                <strong>SEO Services in Bangladesh</strong>
              </h1>

              <p className="digi-hero-desc">
                All-in-one SEO and digital marketing solutions engineered to rank your website #1 on Google search results. Drive high-intent buyer traffic, generate qualified leads, and scale conversions organically.
              </p>

              {/* Key Trust Highlights Strip */}
              <div className="hero-highlights-strip">
                <div className="hero-highlight-item">
                  <i className="fa-solid fa-circle-check"></i> 100% White-Hat SEO
                </div>
                <div className="hero-highlight-item">
                  <i className="fa-solid fa-circle-check"></i> Google Rank #1 Strategy
                </div>
                <div className="hero-highlight-item">
                  <i className="fa-solid fa-circle-check"></i> Verified ROI &amp; Reports
                </div>
              </div>

              {/* Call to Actions */}
              <div className="digi-hero-actions">
                <Link href="/contact" className="btn btn-lg btn-blue-solid">
                  Get Started <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#pricing" className="btn btn-lg btn-outline-blue">
                  View Pricing Plans
                </a>
              </div>

              {/* Social Proof Review Rating */}
              <div className="hero-trust-proof">
                <div className="hero-rating-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span className="rating-score">4.9/5</span>
                </div>
                <span className="trust-divider">|</span>
                <span className="trust-stat-text">
                  <i className="fa-solid fa-shield-check" style={{ color: "#10b981" }}></i> Trusted by <strong>100+ Brands</strong> &amp; Clients Globally
                </span>
              </div>
            </div>

            {/* Right Hero 3D Illustration with Floating Stat Badges */}
            <div className="digi-hero-visual">
              <div className="digi-3d-box">
                {/* Ambient Radial Glow */}
                <div className="hero-glow-aura"></div>

                {/* Floating Badge 1: Top Left */}
                <div className="hero-floating-card float-card-top">
                  <div className="float-card-icon growth-icon">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                  <div className="float-card-info">
                    <span className="float-card-num">+340%</span>
                    <span className="float-card-lbl">Organic Traffic</span>
                  </div>
                </div>

                {/* 3D Dashboard Main Image */}
                <Image
                  src="/images/seo_hero_analytics_dashboard.jpg"
                  alt="SEO Growth Analytics Dashboard"
                  width={924}
                  height={690}
                  priority
                  className="digi-3d-img"
                  style={{ width: "100%", height: "auto" }}
                />

                {/* Floating Badge 2: Bottom Right */}
                <div className="hero-floating-card float-card-bottom">
                  <div className="float-card-icon rank-icon">
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <div className="float-card-info">
                    <span className="float-card-num">Rank #1</span>
                    <span className="float-card-lbl">Google Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Authority & Tool Platform Strip */}
      <div className="hero-authority-strip">
        <div className="container">
          <div className="authority-strip-inner">
            <span className="authority-strip-label">
              <i className="fa-solid fa-circle-nodes" style={{ color: "#0062d2" }}></i> Trusted SEO Framework &amp; Data:
            </span>
            <div className="authority-strip-logos">
              <div className="authority-badge">
                <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i> Search Console
              </div>
              <div className="authority-badge">
                <i className="fa-solid fa-chart-pie" style={{ color: "#EA4335" }}></i> Google Analytics 4
              </div>
              <div className="authority-badge">
                <i className="fa-solid fa-magnifying-glass-chart" style={{ color: "#FF642D" }}></i> Semrush
              </div>
              <div className="authority-badge">
                <i className="fa-solid fa-bolt" style={{ color: "#0062FF" }}></i> Ahrefs
              </div>
              <div className="authority-badge">
                <i className="fa-brands fa-shopify" style={{ color: "#95BF47" }}></i> Shopify &amp; WP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO AUTHORITY SECTION - Best SEO Expert in Bangladesh */}
      <section className="section digi-seo-expert-section" style={{ backgroundColor: "#ffffff", padding: "65px 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            
            {/* Eyebrow badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
              <i className="fa-solid fa-award"></i>
              <span>Organic Business Growth Specialist</span>
            </div>

            {/* Main H2 Heading */}
            <h2 style={{ fontSize: "2.35rem", fontWeight: 800, color: "#0f172a", marginBottom: "22px", lineHeight: 1.25, letterSpacing: "-0.015em", fontFamily: "var(--font-heading, inherit)" }}>
              Best SEO Expert in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Abdullah Saleh</span>
            </h2>

            {/* Content Body */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              
              <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.8, margin: 0 }}>
                I’m <strong>Abdullah Saleh</strong>, an Organic Business Growth Specialist and <strong>SEO Expert in Bangladesh</strong> with <strong>6+ years of hands-on experience</strong> in helping businesses grow through search. Over the years, I’ve worked with <strong>100+ local and international clients</strong>, helping them improve their online visibility, attract the right audience, generate qualified leads, and turn organic traffic into real business growth.
              </p>

              <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.8, margin: 0 }}>
                For me, SEO is not just about rankings or getting more visitors from Google. It’s about understanding what people are searching for, creating a website that genuinely helps them, and building a strong online presence that can grow consistently over time.
              </p>

              <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.8, margin: 0 }}>
                My approach combines technical SEO, content, user experience, authority building, and search intent to create strategies that are practical, sustainable, and focused on business results. I work with businesses across different industries and markets, which has given me a strong understanding of how search behavior, competition, and customer intent can vary from one audience to another.
              </p>

              {/* Core Expertise Callout Box */}
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0062d2", borderRadius: "6px", padding: "20px 24px", margin: "6px 0" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", fontFamily: "var(--font-heading, inherit)" }}>
                  Core Areas of Expertise
                </h3>
                <p style={{ fontSize: "0.98rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                  My core areas of expertise include{" "}
                  <Link href="/services/local-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Local SEO</Link>,{" "}
                  <Link href="/services/technical-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Technical SEO</Link>,{" "}
                  <Link href="/services/ecommerce-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Ecommerce SEO</Link>,{" "}
                  content optimization, keyword research, link building, and organic growth strategies.
                </p>
              </div>

              {/* AI SEO & Future of Search Callout */}
              <div style={{ background: "linear-gradient(180deg, #edf6ff 0%, #f4f9ff 100%)", border: "1px solid #dbeafe", borderLeft: "4px solid #059669", borderRadius: "6px", padding: "20px 24px", margin: "6px 0" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-heading, inherit)" }}>
                  <i className="fa-solid fa-microchip" style={{ color: "#059669" }}></i>
                  AI-Driven Search, AEO, GEO &amp; LLM SEO
                </h3>
                <p style={{ fontSize: "0.98rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                  As search continues to evolve, I also focus on the growing world of AI-driven search. Through modern{" "}
                  <Link href="/services/ai-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AI SEO</Link> strategies, including{" "}
                  <Link href="/services/aeo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AEO</Link>,{" "}
                  <Link href="/services/geo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>GEO</Link>, E-E-A-T optimization, and LLM SEO, I help businesses prepare their websites for the way people are discovering information today&mdash;and the way search is changing for tomorrow.
                </p>
              </div>

              <p style={{ fontSize: "1.05rem", color: "#1e293b", fontWeight: 600, lineHeight: 1.75, margin: "4px 0 0" }}>
                My goal is simple: build SEO strategies that don’t just bring traffic, but help businesses become more visible, trusted, and successful online.
              </p>

              {/* Quick Highlights / Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "10px" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0062d2" }}>6+ Years</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Hands-On Experience</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0062d2" }}>100+ Clients</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Local &amp; International</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0062d2" }}>100% White-Hat</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Google Search Compliant</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#059669" }}>AI &amp; GEO Ready</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>LLM &amp; AEO Optimization</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. GET DISCOVERED (6 SERVICES GRID - Exact Mockup Match) */}
      <section className="section digi-services-section" id="services">
        <div className="container">
          <div className="digi-section-head">
            <h2>Get Discovered</h2>
          </div>

          <div className="digi-cards-grid">
            {/* Card 1: Keyword Research */}
            <div className="digi-service-card">
              <div className="digi-card-icon-floating">
                <i className="fa-solid fa-desktop" style={{ color: "#f59e0b" }}></i>
              </div>
              <div className="digi-card-body">
                <h3>Keyword Research</h3>
                <p className="card-intro">Identify high-converting, high-volume search queries for your target market.</p>
                <ul className="digi-card-checklist">
                  <li><i className="fa-solid fa-check"></i> High Commercial Intent Mapping</li>
                  <li><i className="fa-solid fa-check"></i> Competitor Keyword Gap Analysis</li>
                  <li><i className="fa-solid fa-check"></i> Search Volume &amp; CPC Forecasting</li>
                  <li><i className="fa-solid fa-check"></i> Long-Tail Traffic Opportunities</li>
                </ul>
              </div>
            </div>

            {/* Card 2: On-Page SEO */}
            <div className="digi-service-card">
              <div className="digi-card-icon-floating">
                <i className="fa-solid fa-lightbulb" style={{ color: "#06b6d4" }}></i>
              </div>
              <div className="digi-card-body">
                <h3>On-Page SEO</h3>
                <p className="card-intro">Optimize website structure, content relevance, and technical signals.</p>
                <ul className="digi-card-checklist">
                  <li><i className="fa-solid fa-check"></i> Title &amp; Meta Descriptions Tuning</li>
                  <li><i className="fa-solid fa-check"></i> Semantic Content Structure (H1-H6)</li>
                  <li><i className="fa-solid fa-check"></i> Internal Link &amp; Silo Restructuring</li>
                  <li><i className="fa-solid fa-check"></i> Schema Structured Data Markup</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Off-Page SEO */}
            <div className="digi-service-card">
              <div className="digi-card-icon-floating">
                <i className="fa-solid fa-laptop-code" style={{ color: "#4361ee" }}></i>
              </div>
              <div className="digi-card-body">
                <h3>Off-Page SEO</h3>
                <p className="card-intro">Build domain authority with 100% white-hat contextual backlink equity.</p>
                <ul className="digi-card-checklist">
                  <li><i className="fa-solid fa-check"></i> High-DA Editorial Backlinks</li>
                  <li><i className="fa-solid fa-check"></i> Relevant Niche Guest Posting</li>
                  <li><i className="fa-solid fa-check"></i> Brand Mentions &amp; Digital PR</li>
                  <li><i className="fa-solid fa-check"></i> Toxic Backlink Disavowal</li>
                </ul>
              </div>
            </div>

            {/* Card 4: Local SEO */}
            <div className="digi-service-card">
              <div className="digi-card-icon-floating">
                <i className="fa-solid fa-location-dot" style={{ color: "#ef4444" }}></i>
              </div>
              <div className="digi-card-body">
                <h3>Local SEO</h3>
                <p className="card-intro">Dominate Google Maps and local search results in your city or region.</p>
                <ul className="digi-card-checklist">
                  <li><i className="fa-solid fa-check"></i> Google Business Profile Setup</li>
                  <li><i className="fa-solid fa-check"></i> Local NAP Citation Consistency</li>
                  <li><i className="fa-solid fa-check"></i> Google Maps Pack 3-Pack Ranking</li>
                  <li><i className="fa-solid fa-check"></i> Local Review &amp; Rating Strategy</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Link Building */}
            <div className="digi-service-card">
              <div className="digi-card-icon-floating">
                <i className="fa-solid fa-link" style={{ color: "#8b5cf6" }}></i>
              </div>
              <div className="digi-card-body">
                <h3>Link Building</h3>
                <p className="card-intro">Sustainable link acquisition strategies that boost domain trust safety.</p>
                <ul className="digi-card-checklist">
                  <li><i className="fa-solid fa-check"></i> High Authority Link Placements</li>
                  <li><i className="fa-solid fa-check"></i> Broken Link Reclamation</li>
                  <li><i className="fa-solid fa-check"></i> Resource Page Link Building</li>
                  <li><i className="fa-solid fa-check"></i> 100% Manual Outreach</li>
                </ul>
              </div>
            </div>

            {/* Card 6: E-Commerce SEO */}
            <div className="digi-service-card">
              <div className="digi-card-icon-floating">
                <i className="fa-solid fa-cart-shopping" style={{ color: "#10b981" }}></i>
              </div>
              <div className="digi-card-body">
                <h3>E-Commerce SEO</h3>
                <p className="card-intro">Optimize product listings, category pages, and transactional buyer funnels.</p>
                <ul className="digi-card-checklist">
                  <li><i className="fa-solid fa-check"></i> Product Page Rich Snippets</li>
                  <li><i className="fa-solid fa-check"></i> Category Hierarchy Optimization</li>
                  <li><i className="fa-solid fa-check"></i> Faceted Navigation Indexing</li>
                  <li><i className="fa-solid fa-check"></i> Checkout Funnel Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKING STEPS (6 DARK CARDS ON LIGHT BLUE - Exact Mockup Match) */}
      <section className="section digi-steps-section" id="steps">
        <div className="container">
          <div className="digi-section-head">
            <h2>Working Steps</h2>
          </div>

          <div className="digi-steps-grid">
            {/* Step 1 */}
            <div className="digi-step-card">
              <div className="step-badge-num">1</div>
              <div className="step-card-content">
                <h3>SEO Audit</h3>
                <p>Comprehensive forensic audit of site crawlability, indexing errors, Core Web Vitals, and technical health bottlenecks.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="digi-step-card">
              <div className="step-badge-num">2</div>
              <div className="step-card-content">
                <h3>Competitor Analysis</h3>
                <p>Reverse engineering your top competitors&apos; high-traffic keywords, link profiles, and market share opportunities.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="digi-step-card">
              <div className="step-badge-num">3</div>
              <div className="step-card-content">
                <h3>Keyword Research and Opportunity</h3>
                <p>Identifying high-volume commercial intent keywords with high conversion value and favorable ranking difficulty.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="digi-step-card">
              <div className="step-badge-num">4</div>
              <div className="step-card-content">
                <h3>Strategy Formulation</h3>
                <p>Designing a customized 6-month execution roadmap tailored specifically to your revenue targets and industry niche.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="digi-step-card">
              <div className="step-badge-num">5</div>
              <div className="step-card-content">
                <h3>Strategy Execution</h3>
                <p>Implementing on-page optimization, content production clusters, technical fixes, and high-impact outreach.</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="digi-step-card">
              <div className="step-badge-num">6</div>
              <div className="step-card-content">
                <h3>Continuous Optimization</h3>
                <p>Weekly rank tracking, Google Search Console analytics review, conversion rate tuning, and compounding ROI growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GET IN TOUCH (CONTACT SECTION - Exact Mockup Match) */}
      <section className="section digi-contact-section" id="contact">
        <div className="container">
          <div className="digi-section-head">
            <h2>Get In Touch</h2>
          </div>

          <div className="digi-contact-grid">
            {/* Left Info */}
            <div className="digi-contact-left">
              <h3>
                <span className="text-blue">Understand</span> user search intent and get noticed by quality organic users.
              </h3>
              <p>
                Ready to dominate Google search results? Contact our SEO experts today for a free website analysis and tailored proposal.
              </p>
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem", color: "#475569" }}>
                <div><i className="fa-solid fa-circle-check" style={{ color: "#4361ee", marginRight: "8px" }}></i> 100% White-Hat Google Compliance</div>
                <div><i className="fa-solid fa-circle-check" style={{ color: "#4361ee", marginRight: "8px" }}></i> Dedicated Account Strategy &amp; Growth Support</div>
                <div><i className="fa-solid fa-circle-check" style={{ color: "#4361ee", marginRight: "8px" }}></i> Bi-Weekly Progress &amp; KPI Reporting</div>
              </div>
            </div>

            {/* Right Form Box (Light Periwinkle Box) */}
            <div className="digi-contact-form-box">
              {contactSuccess && (
                <div style={{ background: "#dcfce7", color: "#15803d", padding: "12px 16px", borderRadius: "6px", marginBottom: "16px", fontSize: "0.88rem", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: "6px" }}></i>
                  Thank you! We will inspect your domain and get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group-clean">
                  <input 
                    type="text" 
                    name="name" 
                    className="digi-input" 
                    placeholder="Full Name" 
                    required 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group-clean">
                  <input 
                    type="email" 
                    name="email" 
                    className="digi-input" 
                    placeholder="Email Address" 
                    required 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group-clean">
                  <input 
                    type="url" 
                    name="website" 
                    className="digi-input" 
                    placeholder="Website URL" 
                    value={contactForm.website}
                    onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
                  />
                </div>
                <div className="form-group-clean">
                  <input 
                    type="tel" 
                    name="phone" 
                    className="digi-input" 
                    placeholder="Phone Number" 
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>
                <button type="submit" disabled={contactLoading} className="btn btn-lg btn-blue-solid btn-block">
                  {contactLoading ? (
                    <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
                  ) : (
                    <>Get Free SEO Audit <i className="fa-solid fa-arrow-right"></i></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBSCRIPTION (4 BLUE TOP-FOLDED PRICING CARDS - Exact Mockup Match) */}
      <section className="section digi-pricing-section" id="pricing">
        <div className="container">
          <div className="digi-section-head">
            <h2>Subscription</h2>
          </div>

          <div className="digi-pricing-grid">
            {/* Plan 1: Starter */}
            <div className="digi-pricing-card">
              <div className="pricing-card-header">
                <h4>Starter</h4>
                <div className="pricing-card-price">$125<span>/month</span></div>
              </div>
              <div className="pricing-card-badges">
                <span>Audit</span>
                <span>15 KW</span>
                <span>On-Page</span>
              </div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-check"></i> 15 Target Keywords</li>
                <li><i className="fa-solid fa-check"></i> Full Technical SEO Audit</li>
                <li><i className="fa-solid fa-check"></i> On-Page Optimization (5 Pages)</li>
                <li><i className="fa-solid fa-check"></i> Monthly Performance Report</li>
                <li><i className="fa-solid fa-check"></i> Email Support</li>
              </ul>
              <div className="pricing-card-footer">
                <button 
                  type="button"
                  className="btn btn-aqua-solid btn-block"
                  onClick={() => handleOpenPlan("Starter", 125, 15, 0, 5)}
                >
                  <span>Get Started</span> <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.85rem" }}></i>
                </button>
              </div>
            </div>

            {/* Plan 2: Standard (Featured) */}
            <div className="digi-pricing-card featured">
              <div className="pricing-card-header">
                <h4>Standard</h4>
                <div className="pricing-card-price">$350<span>/month</span></div>
              </div>
              <div className="pricing-card-badges">
                <span>30 KW</span>
                <span>Links</span>
                <span>Content</span>
              </div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-check"></i> 30 Target Keywords</li>
                <li><i className="fa-solid fa-check"></i> Full Technical &amp; Speed Audit</li>
                <li><i className="fa-solid fa-check"></i> On-Page Optimization (15 Pages)</li>
                <li><i className="fa-solid fa-check"></i> 10 High-DA Backlinks / Month</li>
                <li><i className="fa-solid fa-check"></i> Bi-Weekly Progress Calls</li>
              </ul>
              <div className="pricing-card-footer">
                <button 
                  type="button"
                  className="btn btn-aqua-solid btn-block"
                  onClick={() => handleOpenPlan("Standard", 350, 30, 10, 15)}
                >
                  <span>Get Started</span> <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.85rem" }}></i>
                </button>
              </div>
            </div>

            {/* Plan 3: Growth */}
            <div className="digi-pricing-card">
              <div className="pricing-card-header">
                <h4>Growth</h4>
                <div className="pricing-card-price">$550<span>/month</span></div>
              </div>
              <div className="pricing-card-badges">
                <span>60 KW</span>
                <span>PR Links</span>
                <span>Scale</span>
              </div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-check"></i> 60 Target Keywords</li>
                <li><i className="fa-solid fa-check"></i> Complete Site Optimization (30 Pages)</li>
                <li><i className="fa-solid fa-check"></i> 25 High-DA Backlinks / Month</li>
                <li><i className="fa-solid fa-check"></i> Content Cluster Production</li>
                <li><i className="fa-solid fa-check"></i> Dedicated Account Strategist</li>
              </ul>
              <div className="pricing-card-footer">
                <button 
                  type="button"
                  className="btn btn-aqua-solid btn-block"
                  onClick={() => handleOpenPlan("Growth", 550, 60, 25, 30)}
                >
                  <span>Get Started</span> <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.85rem" }}></i>
                </button>
              </div>
            </div>

            {/* Plan 4: Enterprise */}
            <div className="digi-pricing-card">
              <div className="pricing-card-header">
                <h4>Enterprise</h4>
                <div className="pricing-card-price">$850<span>/month</span></div>
              </div>
              <div className="pricing-card-badges">
                <span>Unlimited</span>
                <span>Custom</span>
                <span>VIP</span>
              </div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-check"></i> Unlimited Keyword Targets</li>
                <li><i className="fa-solid fa-check"></i> Full Website Overhaul &amp; Core Web Vitals</li>
                <li><i className="fa-solid fa-check"></i> 50+ Premium Tier Backlinks / Month</li>
                <li><i className="fa-solid fa-check"></i> Weekly Video Growth Review</li>
                <li><i className="fa-solid fa-check"></i> 24/7 Priority Support</li>
              </ul>
              <div className="pricing-card-footer">
                <button 
                  type="button"
                  className="btn btn-aqua-solid btn-block"
                  onClick={() => handleOpenPlan("Enterprise", 850, "Unlimited", 50, "All")}
                >
                  <span>Get Started</span> <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.85rem" }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 6. TRUST BADGES & VERIFIED CLIENT TESTIMONIALS */}
      <section className="section digi-testimonials-section" style={{ background: "#f8fafc", padding: "80px 0", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          
          {/* Trust Highlights Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "60px" }}>
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem" }}>100% White-Hat</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Zero Penalty Guarantee</div>
              </div>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#fefce8", color: "#ca8a04", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                <i className="fa-solid fa-star"></i>
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem" }}>4.9 / 5.0 Rating</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>128+ Verified Reviews</div>
              </div>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem" }}>100+ Brands Scaled</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>USA, UK, AU &amp; Global</div>
              </div>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#faf5ff", color: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                <i className="fa-solid fa-headset"></i>
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem" }}>24/7 Support</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Dedicated Growth Lead</div>
              </div>
            </div>
          </div>

          {/* Section: What Internet Finds About Me (Verified Reviews Marquee) */}
          <div className="testimonial-marquee-container" style={{ textAlign: "center" }}>
            {/* Verified Reviews Pill */}
            <div className="verified-pill-badge">
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

            <h2 className="marquee-section-title">What Internet Finds About Me</h2>
            <p className="marquee-section-subtitle">
              Real feedback and client reviews from BlackHatWorld forum as a developer and marketer.
            </p>

            {/* Marquee Viewport */}
            <div className="marquee-viewport-mask">
              <div className="marquee-track">
                {[...verifiedReviews, ...verifiedReviews].map((rev, idx) => (
                  <div key={idx} className="marquee-review-card">
                    <div>
                      <div className="card-stars-row" aria-label={`${rev.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className="fa-solid fa-star"
                            style={{
                              color: star <= rev.rating ? "#fbbf24" : "#e2e8f0",
                              fontSize: "0.85rem",
                            }}
                          ></i>
                        ))}
                      </div>
                      <p className="card-quote-body">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>
                    <div className="card-bottom-row">
                      <div>
                        <h3 className="card-author-name">{rev.name}</h3>
                        <p className="card-author-title">{rev.role}</p>
                      </div>
                      <div className="card-avatar-badge">{rev.avatar}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. HOMEPAGE GLOBAL FAQ ACCORDION (WITH FAQPAGE SCHEMA) */}
      <section className="section digi-faq-section" style={{ background: "#ffffff", padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="digi-section-head" style={{ marginBottom: "40px", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4361ee", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", marginBottom: "8px" }}>
              <i className="fa-solid fa-circle-question" style={{ marginRight: "6px" }}></i> Common Questions
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a" }}>Frequently Asked Questions</h2>
            <p style={{ color: "#64748b", maxWidth: "600px", margin: "10px auto 0", fontSize: "1rem" }}>
              Clear answers to the most common questions about our technical audits, AI search frameworks, pricing, and timelines.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {globalFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    border: isOpen ? "1.5px solid #4361ee" : "1px solid #e2e8f0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    boxShadow: isOpen ? "0 4px 14px rgba(67, 97, 238, 0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: "100%",
                      padding: "18px 22px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: isOpen ? "#f8fafc" : "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "14px",
                    }}
                  >
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: isOpen ? "#4361ee" : "#0f172a" }}>
                      {faq.q}
                    </span>
                    <i
                      className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
                      style={{ color: isOpen ? "#4361ee" : "#94a3b8", fontSize: "0.9rem", flexShrink: 0 }}
                    ></i>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "18px 22px 22px", color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, borderTop: "1px solid #f1f5f9" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Help CTA */}
          <div style={{ marginTop: "40px", textAlign: "center", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "24px" }}>
            <h4 style={{ margin: "0 0 8px", color: "#1e3a8a", fontSize: "1.15rem" }}>Have a specific question about your website?</h4>
            <p style={{ margin: "0 0 16px", color: "#475569", fontSize: "0.92rem" }}>
              Reach out directly for a personalized 1-on-1 discussion regarding your organic search goals.
            </p>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Contact Abdullah Directly <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      <ServiceOrderModal 
        isOpen={!!selectedService}
        onClose={() => {
          setSelectedService(null);
          setSelectedPackage(null);
        }}
        service={selectedService}
        initialPackage={selectedPackage}
      />
    </div>
  );
}
