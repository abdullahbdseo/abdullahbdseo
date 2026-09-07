"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings, services } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
      {/* 1. HERO SECTION (Exact Digi Solution Mockup Match) */}
      <section className="digi-hero-section">
        <div className="container">
          <div className="digi-hero-grid">
            {/* Left Hero Content */}
            <div className="digi-hero-content">
              <h1>
                <span className="text-blue">Search</span> Engine <span className="text-blue">Optimization</span><br />
                <strong>SEO Services in Bangladesh</strong>
              </h1>

              <p className="digi-hero-desc">
                All-in-one SEO and digital marketing solutions engineered to rank your website #1 on Google search results. Drive high-intent buyer traffic, generate qualified leads, and scale conversions organically.
              </p>

              <div className="digi-hero-actions">
                <Link href="/contact" className="btn btn-lg btn-blue-solid">
                  Get Started <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#pricing" className="btn btn-lg btn-outline-blue">
                  View Pricing Plans
                </a>
              </div>
            </div>

            {/* Right Hero 3D Illustration */}
            <div className="digi-hero-visual">
              <div className="digi-3d-box">
                <img src="/images/seo_hero_3d.png" alt="SEO 3D Illustration" className="digi-3d-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <a href="https://abdullahseobd.com/services/local-seo-service-in-bangladesh/" target="_blank" rel="noopener noreferrer" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Local SEO</a>,{" "}
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
                  <a href="https://abdullahseobd.com/services/ai-seo-service-in-bangladesh/" target="_blank" rel="noopener noreferrer" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AI SEO</a> strategies, including{" "}
                  <a href="https://abdullahseobd.com/services/aeo-service-in-bangladesh/" target="_blank" rel="noopener noreferrer" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AEO</a>,{" "}
                  <a href="https://abdullahseobd.com/services/geo-service-in-bangladesh/" target="_blank" rel="noopener noreferrer" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>GEO</a>, E-E-A-T optimization, and LLM SEO, I help businesses prepare their websites for the way people are discovering information today&mdash;and the way search is changing for tomorrow.
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
                <div><i className="fa-solid fa-circle-check" style={{ color: "#4361ee", marginRight: "8px" }}></i> NOWPayments Crypto &amp; bKash Supported</div>
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

      {/* 6. NEWSLETTER / QUICK SUBSCRIPTION BANNER (Exact Mockup Match) */}
      <section className="digi-newsletter-ribbon">
        <div className="container">
          <div className="newsletter-flex-box">
            <div className="newsletter-text">
              <h3>Join Our Newsletter for Weekly SEO Trends and Algorithm Updates</h3>
            </div>
            <div className="newsletter-form-wrapper">
              <form className="newsletter-form-inline" onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }}>
                <input type="email" placeholder="Enter your email" required className="newsletter-input" />
                <button type="submit" className="btn btn-aqua-solid">Subscribe</button>
              </form>
            </div>
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
