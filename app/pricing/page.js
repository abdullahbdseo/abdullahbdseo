"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings as staticSiteSettings, pricingRetainers as staticPricingRetainers } from "@/lib/data";
import { useLiveCMS } from "@/lib/useLiveCMS";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function PricingPage() {
  const siteSettings = useLiveCMS("siteSettings", staticSiteSettings) || staticSiteSettings;
  const livePlans = useLiveCMS("pricingRetainers", staticPricingRetainers) || staticPricingRetainers;
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fallbackPlans = [
    {
      id: 901,
      name: "Starter",
      price: 125,
      priceFormatted: "$125",
      period: "/month",
      delivery_days: 30,
      badges: ["Audit", "15 KW", "On-Page"],
      features: [
        "15 Target Keywords",
        "Full Technical SEO Audit",
        "On-Page Optimization (5 Pages)",
        "Monthly Performance Report",
        "Email Support",
      ],
      featured: false,
    },
    {
      id: 902,
      name: "Standard",
      price: 350,
      priceFormatted: "$350",
      period: "/month",
      delivery_days: 30,
      badges: ["30 KW", "Links", "Content"],
      features: [
        "30 Target Keywords",
        "Full Technical & Speed Audit",
        "On-Page Optimization (15 Pages)",
        "10 High-DA Backlinks / Month",
        "Bi-Weekly Progress Calls",
      ],
      featured: true,
    },
    {
      id: 903,
      name: "Growth",
      price: 550,
      priceFormatted: "$550",
      period: "/month",
      delivery_days: 30,
      badges: ["60 KW", "PR Links", "Scale"],
      features: [
        "60 Target Keywords",
        "Complete Site Optimization (30 Pages)",
        "25 High-DA Backlinks / Month",
        "Content Cluster Production",
        "Dedicated Account Strategist",
      ],
      featured: false,
    },
    {
      id: 904,
      name: "Enterprise",
      price: 850,
      priceFormatted: "$850",
      period: "/month",
      delivery_days: 30,
      badges: ["Unlimited", "Custom", "VIP"],
      features: [
        "Unlimited Keyword Targets",
        "Full Website Overhaul & Core Web Vitals",
        "50+ Premium Tier Backlinks / Month",
        "Weekly Video Growth Review",
        "24/7 Priority Support",
      ],
      featured: false,
    },
  ];

  const plans = (Array.isArray(livePlans) && livePlans.length > 0)
    ? livePlans.map((p, idx) => ({
        id: p.id || 900 + idx,
        name: p.name || `Plan ${idx + 1}`,
        price: p.price || 0,
        priceFormatted: `$${p.price || 0}`,
        period: p.period || p.billing_cycle || "/month",
        delivery_days: p.delivery_days || 30,
        badges: p.badges || (Array.isArray(p.features) ? p.features.slice(0, 3) : ["SEO", "Audit", "Rank"]),
        features: Array.isArray(p.features) ? p.features : [],
        featured: Boolean(p.isPopular || p.is_popular || p.featured),
      }))
    : fallbackPlans;

  const backlinkPackages = [
    {
      id: 911,
      name: "Starter",
      bdtPrice: "৳15,000",
      usdPrice: "$125",
      price: 125,
      period: "/month",
      delivery_days: 30,
      badges: ["Audit", "10 Links", "Profile DA 80+"],
      features: [
        "10 High DA Profile Creation Links (DA 80+)",
        "3 Contextual Editorial Guest Posts (DR 40+)",
        "5 High PR Web 2.0 Buffer Links",
        "Natural Anchor Text Ratio Strategy",
        "100% Manual Hand-Crafted Accounts",
        "Fast Indexation Acceleration (7-14 Days)",
        "Detailed Live Google Sheet Report"
      ],
      featured: false
    },
    {
      id: 912,
      name: "Standard",
      bdtPrice: "৳30,000",
      usdPrice: "$250",
      price: 250,
      period: "/month",
      delivery_days: 30,
      badges: ["25 Links", "Guest Post", "DR 60+"],
      features: [
        "25 High DA Brand Entity Profile Links (DA 85+)",
        "8 Contextual Editorial Guest Posts (DR 50-70+)",
        "10 High PR Web 2.0 Contextual Articles",
        "2 .EDU / Resource Authority Inclusions",
        "Comprehensive Competitor Link Gap Analysis",
        "Hand-Written 1,000+ Word Niche Content",
        "Tier-2 Indexation Pinging & Acceleration",
        "30-Day Rank Tracking & Live Support"
      ],
      featured: true
    },
    {
      id: 913,
      name: "Growth",
      bdtPrice: "৳55,000",
      usdPrice: "$450",
      price: 450,
      period: "/month",
      delivery_days: 30,
      badges: ["50+ Links", "PR Outreach", "Scale"],
      features: [
        "50+ Tier-1 Multi-Platform Authority Links",
        "18 Premium Editorial Guest Posts (DR 60-85+)",
        "4 High-Trust .EDU / .GOV Resource Links",
        "Digital PR Journalist Outreach Campaign",
        "Infographic & Data Visual Syndication",
        "Full Toxic Link Audit & Disavow File Setup",
        "Dedicated Senior Link Building Strategist",
        "Bi-Weekly Strategy Calls via WhatsApp/Meet"
      ],
      featured: false
    },
    {
      id: 914,
      name: "Enterprise",
      bdtPrice: "৳95,000",
      usdPrice: "$850",
      price: 850,
      period: "/month",
      delivery_days: 30,
      badges: ["Unlimited", "Custom PR", "VIP"],
      features: [
        "100+ High DR Tier-1 Authority Backlinks",
        "35+ Major Editorial Publications & Press Releases",
        "8+ High-Trust .EDU / .GOV Institutional Mentions",
        "Custom HARO & Digital PR Pitching Desk",
        "Competitor Link Intersect & Complete Moat Building",
        "Custom High-Impact Infographic & Video Distribution",
        "24/7 Priority WhatsApp & Direct Phone Support",
        "Dedicated Senior SEO Growth Director"
      ],
      featured: false
    }
  ];

  const handleOpenPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Abdullah Saleh Managed SEO Retainers & Subscriptions",
    "description": "Monthly managed SEO retainers, technical audits, content clusters, and high-impact link outreach.",
    "image": "https://abdullahbdseo.vercel.app/images/seo_hero_analytics_dashboard.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Abdullah Saleh SEO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "125",
      "highPrice": "850",
      "offerCount": "8",
      "offers": [
        ...plans.map((plan) => ({
          "@type": "Offer",
          "name": `${plan.name} SEO Plan`,
          "price": String(plan.price),
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": String(plan.price),
            "priceCurrency": "USD",
            "unitText": "MONTH"
          },
          "description": plan.features.join(". "),
          "url": "https://abdullahbdseo.vercel.app/pricing"
        })),
        ...backlinkPackages.map((pkg) => ({
          "@type": "Offer",
          "name": `${pkg.name} High DA Backlink Package`,
          "price": String(pkg.price),
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": String(pkg.price),
            "priceCurrency": "USD",
            "unitText": "MONTH"
          },
          "description": pkg.features.join(". "),
          "url": "https://abdullahbdseo.vercel.app/services/backlink-service-in-bangladesh"
        }))
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="pricing-page-wrapper">
      {/* Google Structured Data: Product, AggregateOffer & PriceSpecification */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      {/* Hero Header */}
      <section className="digi-hero-section" style={{ padding: "55px 0 40px", textAlign: "center" }}>
        <div className="container">
          <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Transparent Growth Plans
          </span>
          <h1 style={{ fontSize: "2.8rem", margin: "10px 0 14px", fontWeight: 800 }}>
            Monthly SEO Retainers &amp; Subscription Packages
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--digi-text-body)", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Predictable, compounding organic traffic expansion with dedicated hours each month for technical health, content clusters, and high-authority links.
          </p>
        </div>
      </section>

      {/* 1. Monthly SEO Subscription Pricing Grid */}
      <section className="section digi-pricing-section" style={{ paddingTop: "10px", paddingBottom: "60px" }}>
        <div className="container">
          <div className="digi-pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`digi-pricing-card${plan.featured ? " featured" : ""}`}>
                <div className="pricing-card-header">
                  <h4>{plan.name}</h4>
                  <div className="pricing-card-price">{plan.priceFormatted}<span>{plan.period}</span></div>
                </div>
                <div className="pricing-card-badges">
                  {plan.badges.map((b) => <span key={b}>{b}</span>)}
                </div>
                <ul className="pricing-card-features">
                  {plan.features.map((f) => (
                    <li key={f}><i className="fa-solid fa-check"></i> {f}</li>
                  ))}
                </ul>
                <div className="pricing-card-footer">
                  <button
                    type="button"
                    onClick={() => handleOpenPlan(plan)}
                    className="btn btn-aqua-solid btn-block"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      cursor: "pointer",
                      width: "100%",
                      padding: "13px 20px"
                    }}
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Inquire &amp; Get Started</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Dedicated High DA Backlink Packages Section */}
      <section style={{ padding: "65px 0 80px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 40px" }}>
            <span style={{
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              High-Authority Off-Page Power
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              High DA Backlink Packages &amp; Link Building Retainers
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.02rem", margin: "0 0 16px", lineHeight: 1.6 }}>
              100% white-hat manual editorial outreach, permanent high-DR links, transparent live Google Sheets tracking, and penalty-safe PageRank acceleration.
            </p>
            <Link
              href="/services/backlink-service-in-bangladesh"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#0062d2",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "underline"
              }}
            >
              Explore Complete Backlink Blueprint &amp; 7 Quality Filters <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="digi-pricing-grid">
            {backlinkPackages.map((pkg) => (
              <div key={pkg.name} className={`digi-pricing-card${pkg.featured ? " featured" : ""}`}>
                <div className="pricing-card-header">
                  <h4>{pkg.name}</h4>
                  <div className="pricing-card-price">{pkg.usdPrice}<span>{pkg.period}</span></div>
                </div>
                <div className="pricing-card-badges">
                  {pkg.badges.map((b) => <span key={b}>{b}</span>)}
                </div>
                <ul className="pricing-card-features">
                  {pkg.features.map((feat) => (
                    <li key={feat}><i className="fa-solid fa-check"></i> {feat}</li>
                  ))}
                </ul>
                <div className="pricing-card-footer">
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello Abdullah! I want to order the "${pkg.name}" (${pkg.usdPrice} / ${pkg.bdtPrice}) backlink package. Please share payment instructions and onboarding details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-aqua-solid btn-block"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      width: "100%",
                      padding: "13px 20px"
                    }}
                  >
                    <span>Get Started</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Order Modal (Email + Intake Form) */}
      <ServiceOrderModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        service={{
          id: 7,
          title: selectedPlan?.name ? `${selectedPlan.name} SEO Plan` : "Monthly SEO Subscription & Retainer",
          starting_price: selectedPlan?.price || 125
        }}
        initialPackage={selectedPlan}
      />
    </div>
  );
}
