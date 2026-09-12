"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function EcommerceSeoServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Ecommerce SEO?",
      a: "Ecommerce SEO is the specialized process of optimizing your online store so your product and category pages rank at the top of Google search results. It involves product keyword research, category page architecture, technical speed fixes, product structured data (Schema Markup), and conversion rate optimization (CRO) to turn organic visitors into paying customers."
    },
    {
      q: "How long does it take to see results from Ecommerce SEO?",
      a: "Most ecommerce websites start seeing measurable rank and traffic improvements within 3 to 6 months. Low-competition and niche product pages often rank within 6 to 8 weeks, while highly competitive categories achieve exponential revenue growth between 6 to 12 months."
    },
    {
      q: "Which ecommerce platforms do you work with?",
      a: "I work with all major global and local ecommerce platforms including Shopify, WooCommerce (WordPress), Magento, OpenCart, BigCommerce, PrestaShop, Laravel, and custom Next.js/PHP headless ecommerce stores. Every platform receives custom tailored optimization."
    },
    {
      q: "What makes Ecommerce SEO different from regular SEO?",
      a: "Ecommerce SEO is significantly more complex than standard SEO. It focuses on large catalogs with hundreds or thousands of products, faceted navigation filtering, duplicate content prevention, product Schema with prices and stock status, commercial buying-intent keywords, and conversion funnel optimization."
    },
    {
      q: "How much does Ecommerce SEO service cost in Bangladesh?",
      a: "Ecommerce SEO packages in Bangladesh typically range from ৳15,000 to ৳75,000+ per month depending on catalog size, platform complexity, competitive niche, and revenue targets. Custom packages are available based on your store's exact requirements."
    },
    {
      q: "Will Ecommerce SEO increase my online sales?",
      a: "Yes. By targeting high-intent buyer searches (e.g., 'buy men sneakers online bd') and optimizing your checkout and product page user experience, Ecommerce SEO delivers shoppers who are ready to purchase. Most clients see a 50% to 200% surge in qualified organic traffic and consistent daily sales without paying for ads."
    }
  ];

  const packages = [
    {
      name: "Starter Store",
      subtitle: "For new or small ecommerce stores starting organic growth",
      priceBdt: "৳15,000",
      priceUsd: "$150",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "Up to 25 Target Product/Category Keywords",
        "Full Technical & Crawl Blocker Audit",
        "Shopify / WooCommerce Core Setup",
        "Category & Top 15 Product Pages SEO",
        "Product Schema & Rich Snippets Setup",
        "Core Web Vitals & Speed Optimization",
        "Monthly Ranking & Google Search Console Report"
      ]
    },
    {
      name: "Growth Store",
      subtitle: "For growing ecommerce brands seeking market dominance",
      priceBdt: "৳35,000",
      priceUsd: "$350",
      duration: "Monthly Retainer",
      isPopular: true,
      features: [
        "Up to 60 High-Intent Commercial Keywords",
        "Comprehensive Architecture & Facet Optimization",
        "Full Product & Collection On-Page Optimization",
        "High-Authority Contextual Backlink Building",
        "Conversion Rate Optimization (CRO) Recommendations",
        "AI Search Optimization (ChatGPT, Google AI Overviews)",
        "Competitor Gap Analysis & Buying Guide Content",
        "Bi-Weekly Progress & Strategy Call"
      ]
    },
    {
      name: "Enterprise Scale",
      subtitle: "For large catalogs, multi-category & international stores",
      priceBdt: "৳75,000",
      priceUsd: "$750",
      duration: "Monthly Retainer",
      isPopular: false,
      features: [
        "150+ Target Keywords & Semantic Clusters",
        "Complete Technical, JS & Server Log Audit",
        "Unlimited Product & Category Template Optimization",
        "Custom Schema (Offer, AggregateRating, Review)",
        "Aggressive High-DA Digital PR & Link Strategy",
        "Full Conversion Funnel & Checkout Optimization",
        "AEO & GEO Generative Engine Optimization",
        "Dedicated SEO Specialist & Real-Time WhatsApp Support"
      ]
    }
  ];

  const ecommerceSeoServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ecommerce SEO Service in Bangladesh",
    "description": "Enterprise ecommerce SEO services, product page optimization, category structure, and revenue scaling for Shopify, WooCommerce, and custom platforms.",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteSettings.site_name,
      "url": "https://abdullahbdseo.vercel.app"
    },
    "offers": {
      "@type": "Offer",
      "price": "15000",
      "priceCurrency": "BDT"
    }
  };

  const ecommerceBreadcrumbSchema = {
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
        "name": "Ecommerce SEO Service in Bangladesh",
        "item": "https://abdullahbdseo.vercel.app/services/ecommerce-seo-service-in-bangladesh"
      }
    ]
  };

  const ecommerceFaqSchema = {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecommerceSeoServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecommerceBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecommerceFaqSchema) }}
      />
      
      {/* 1. HERO SECTION */}
      <section style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)", padding: "60px 0 50px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
            
            {/* Left Content */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "16px" }}>
                <i className="fa-solid fa-cart-shopping"></i>
                <span>BOOST YOUR STORE SALES</span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.015em" }}>
                Ecommerce SEO Service in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Boost Online Sales</span>
              </h1>

              <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.75, marginBottom: "24px" }}>
                Your eCommerce store in Bangladesh is losing daily sales because buyers cannot find you on Google. I offer the most results-driven eCommerce SEO service in Bangladesh, built to rank your product pages, category collections, and online store on Google’s first page. Stop burning money on ads&mdash;start getting consistent, qualified customers through organic search permanently.
              </p>

              {/* Key Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>6+ Years of Proven Ecommerce SEO Expertise</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>100+ Online Stores Ranked Across Bangladesh &amp; Internationally</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Shopify, WooCommerce, Magento &amp; Custom Store Specialist</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Data-Driven Strategy Focused on Revenue, Not Just Traffic</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-lg" style={{ background: "#0062d2", color: "#ffffff", fontWeight: 700, borderRadius: "4px", padding: "12px 26px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Get Free SEO Audit <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="https://wa.me/8801670769816" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "#059669", color: "#ffffff", fontWeight: 700, borderRadius: "4px", padding: "12px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.2rem" }}></i>
                  WhatsApp Now
                </a>
              </div>
            </div>

            {/* Right Visual Box */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 10px 30px rgba(0,98,210,0.08)", width: "100%", maxWidth: "480px" }}>
                <div style={{ background: "linear-gradient(135deg, #0062d2 0%, #004bb5 100%)", borderRadius: "6px", padding: "20px", color: "#ffffff", marginBottom: "20px" }}>
                  <div style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, opacity: 0.9 }}>Store Growth Diagnostic</div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: "4px" }}>Ecommerce Organic Growth Engine</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0062d2" }}>300%+</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Organic Traffic Growth</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#059669" }}>#1 Rank</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Commercial Keywords</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0062d2" }}>0 Ad Cost</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Recurring Free Sales</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#059669" }}>AI Ready</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>ChatGPT &amp; Google AI</div>
                  </div>
                </div>

                <div style={{ marginTop: "20px", padding: "14px", background: "#edf6ff", borderRadius: "4px", border: "1px solid #dbeafe", fontSize: "0.88rem", color: "#1e3a8a", lineHeight: 1.5 }}>
                  <i className="fa-solid fa-shield-halved" style={{ marginRight: "6px" }}></i>
                  <strong>Guaranteed White-Hat SEO:</strong> 100% compliant with Google Helpful Content &amp; Core updates.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE ME SECTION */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-trophy"></i>
              <span>WHY CHOOSE ME</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Why Choose Me As Your Ecommerce SEO Expert in Bangladesh
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              I understand both international search algorithms and local Bangladeshi shopping psychology to deliver predictable, revenue-driven search results.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Bangladesh Market Expertise
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                I understand local shopping behavior, payment gateways (bKash, Nagad), courier expectations (RedX, Steadfast, Pathao), and how Bangladeshi consumers search for products online in English and Banglish.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-microchip"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                AI Search &amp; GEO Optimization
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Your store will appear in ChatGPT recommendations, Google AI Overviews, Perplexity results, and Gemini shopping suggestions—ensuring your brand dominates both traditional and AI-driven search.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-brands fa-shopify"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Platform-Specific Technical Mastery
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Whether you run Shopify, WooCommerce, Magento, or a custom Next.js/PHP store, I optimize for your platform’s unique strengths, fixing URL hierarchies, liquid/PHP canonical tags, and script bloat.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                100% White-Hat SEO Methodology
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Strictly ethical SEO strategies that comply with Google search guidelines. This protects your store from algorithm penalties and ensures long-term compounding search visibility.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Transparent Monthly Reporting
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Monthly performance reports detailing keyword rank movements, organic impression gains, conversion path analysis, and revenue impact—no hidden metrics or vague promises.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "26px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "16px" }}>
                <i className="fa-solid fa-handshake"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Direct Expert Communication
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                You work directly with Abdullah Saleh, not an inexperienced junior account manager. Get direct WhatsApp and email communication with fast strategic turnaround.
              </p>
            </div>

          </div>

          {/* 4-Stat Metric Box */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "36px" }}>
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0062d2" }}>6+ Years</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Hands-On Experience</div>
            </div>
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0062d2" }}>100+ Stores</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Ranked &amp; Optimized</div>
            </div>
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0062d2" }}>3,000+</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Keywords Ranked Top 10</div>
            </div>
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#059669" }}>24/7</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Direct Client Support</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. COMPLETE SERVICE PILLARS (6 CORE PILLARS) */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-layer-group"></i>
              <span>COMPLETE SERVICES</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Complete Ecommerce SEO Services for Online Stores
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              Every store requires a targeted approach. My comprehensive eCommerce SEO framework covers everything needed to attract shoppers, rank on page 1, and scale online revenue.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                1. Product Page Optimization
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Every single product becomes an active ranking asset. I optimize product titles, rich descriptions, image ALT attributes, price and review schema markup, and metadata with commercial high-intent keywords that match what buyers actually search for.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                2. Category &amp; Collection Page SEO
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Category pages capture high-volume broad searches like &quot;men shoes online Bangladesh&quot; or &quot;organic skin care Dhaka&quot;. I structure your category taxonomy, breadcrumbs, internal links, and content blocks to rank for top-of-funnel shoppers.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                3. Conversion Rate Optimization (CRO)
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                SEO brings high-intent traffic, but CRO converts visitors into paying customers. I optimize product copy, checkout flow, mobile navigation, trust badges, and CTA button placement to maximize revenue per session.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                4. Shopify &amp; WooCommerce Platform SEO
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Platform-specific optimization for Shopify, WooCommerce, and Magento stores. From resolving duplicate collection URLs to optimizing theme code, apps, tags, and indexing rules, I make your store engine perform at peak level.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                5. Ecommerce Technical SEO &amp; Speed
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Fixing crawl errors, faceted navigation indexing traps, out-of-stock product handling, canonicalization, Core Web Vitals (LCP, INP, CLS), and XML sitemaps. Google rewards fast, clean stores with top-tier rankings.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                6. Ecommerce Content &amp; Buying Guides
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                Creating high-ranking buying guides, product comparisons, gift guides, and educational articles that build topical authority, answer buyer questions, and funnel shoppers directly into product checkouts.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. PROVEN 4-STEP PROCESS */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-list-check"></i>
              <span>MY PROCESS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              My Proven 4-Step Ecommerce SEO Framework
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              A systematic, transparent process that eliminates guesswork and delivers sustainable, compounding store revenue.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px", position: "relative" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#dbeafe", lineHeight: 1, marginBottom: "12px" }}>01</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Store Audit &amp; Discovery
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                Comprehensive technical audit to identify crawl blockers, indexation errors, speed bottlenecks, and high-intent keyword gaps.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px", position: "relative" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#dbeafe", lineHeight: 1, marginBottom: "12px" }}>02</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Strategy &amp; Roadmap
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                Customized growth blueprint outlining priority product optimizations, category restructuring, schema deployment, and link outreach.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px", position: "relative" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#dbeafe", lineHeight: 1, marginBottom: "12px" }}>03</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Execution &amp; Optimization
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                Technical fixes deployed, product and collection pages optimized, content created, and authoritative white-hat backlinks acquired.
              </p>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px", position: "relative" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#dbeafe", lineHeight: 1, marginBottom: "12px" }}>04</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Monitor, Track &amp; Scale
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                Keyword rankings and sales conversions tracked monthly. Winning product categories are scaled based on real performance data.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PACKAGES & PRICING MATRIX */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }} id="pricing">
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-tags"></i>
              <span>PRICING PLANS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Transparent Ecommerce SEO Packages
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              Flexible monthly packages engineered to fit stores at every stage of growth.
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
                    {pkg.priceBdt} <span style={{ fontSize: "1rem", color: "#64748b", fontWeight: 600 }}>/ month</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>({pkg.priceUsd} USD)</div>
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

      {/* 6. REAL PROVEN CASE STUDIES */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 45px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-chart-pie"></i>
              <span>CASE STUDIES</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Proven SEO Success Stories &amp; Case Studies
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              See how my data-driven eCommerce &amp; local SEO strategies transform business revenue across Bangladesh and global markets.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            {/* Case Study 1 */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", marginBottom: "6px" }}>
                Ecommerce Retail Store (Florida, USA)
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                Balloons Right Now
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, marginBottom: "18px" }}>
                An online balloon delivery store struggling with low product visibility and high ad costs. I deployed technical product SEO, structured data, and local commercial search signals.
              </p>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#059669" }}>+75%</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Organic Traffic</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0062d2" }}>+45%</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Online Orders</div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", marginBottom: "6px" }}>
                Tech &amp; Web Agency (Dhaka, Bangladesh)
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                We Misc
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, marginBottom: "18px" }}>
                A digital agency in Mirpur, Dhaka facing high competition. Executed full technical remediation, E-E-A-T service page content clustering, and localized search signals.
              </p>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#059669" }}>+70%</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Organic Traffic</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0062d2" }}>+45%</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Qualified Inquiries</div>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", marginBottom: "6px" }}>
                Legal Practice (New York, USA)
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                Shim Law Group
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.65, marginBottom: "18px" }}>
                Personal injury law firm in competitive NY market. Optimized service siloing, Google Business Profile signals, and technical Core Web Vitals to capture high-value clients.
              </p>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#059669" }}>+80%</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Search Traffic</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0062d2" }}>+40%</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Direct Case Leads</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS ACCORDION) */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "12px" }}>
              <i className="fa-solid fa-circle-question"></i>
              <span>FAQS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
              Frequently Asked Questions About Ecommerce SEO
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748b", marginTop: "8px" }}>
              Common questions answered clearly about ecommerce store ranking and revenue growth.
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
            Ready to Triple Your Online Store Sales?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: "28px" }}>
            Get a free comprehensive technical and keyword gap audit of your ecommerce store. Let’s build a sustainable organic growth engine for your brand.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-lg" style={{ background: "#ffffff", color: "#0062d2", fontWeight: 700, borderRadius: "4px", padding: "14px 30px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Request Free Store Audit <i className="fa-solid fa-arrow-right"></i>
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
