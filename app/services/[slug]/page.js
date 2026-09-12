"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, siteSettings } from "@/lib/data";
import ServiceOrderModal from "@/components/ServiceOrderModal";
import ServiceProofSection from "@/components/ServiceProofSection";

export default function SingleServicePage({ params }) {
  const unwrappedParams = use(params);
  const service = services.find((s) => s.slug === unwrappedParams.slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  if (!service) {
    notFound();
  }

  const handleOrder = (pkg) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description || service.short_description,
    "provider": {
      "@type": "ProfessionalService",
      "name": siteSettings.site_name,
      "url": "https://abdullahbdseo.vercel.app"
    },
    "offers": {
      "@type": "Offer",
      "price": service.starting_price,
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbSchema = {
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
        "name": service.title,
        "item": `https://abdullahbdseo.vercel.app/services/${service.slug}`
      }
    ]
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question || f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer || f.a
      }
    }))
  } : null;

  return (
    <div className="single-service-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* 1. HERO HEADER SECTION */}
      <section className="digi-hero-section" style={{ padding: "60px 0 45px", textAlign: "center" }}>
        <div className="container">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(67, 97, 238, 0.08)", border: "1px solid rgba(67, 97, 238, 0.2)", borderRadius: "9999px", padding: "6px 18px", marginBottom: "14px" }}>
            <i className={`fa-solid ${service.icon || "fa-chart-line"}`} style={{ color: "#4361ee" }}></i>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#4361ee" }}>
              {service.category_name || "Professional SEO Capability"}
            </span>
          </div>

          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, margin: "8px 0 16px", color: "#0f172a", lineHeight: 1.2 }}>
            {service.title}
          </h1>

          <p style={{ fontSize: "1.1rem", color: "var(--digi-text-body)", maxWidth: "760px", margin: "0 auto 24px", lineHeight: 1.6 }}>
            {service.description}
          </p>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "18px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
              <i className="fa-solid fa-tag" style={{ color: "#4361ee" }}></i> Starting from ${service.starting_price}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
              <i className="fa-regular fa-clock" style={{ color: "#10b981" }}></i> Turnaround: {service.delivery_time}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
              <i className="fa-solid fa-shield-halved" style={{ color: "#f59e0b" }}></i> 100% White-Hat Verified
            </span>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES PRICING MATRIX */}
      <section className="section digi-pricing-section" id="packages" style={{ paddingTop: "20px", paddingBottom: "80px" }}>
        <div className="container">
          <div className="digi-section-head" style={{ marginBottom: "45px" }}>
            <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Tailored Investment
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#0f172a", marginTop: "6px" }}>
              Select Your Scope &amp; Deliverables
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
              Transparent one-time deliverable packages. Click any plan to send your project details and get started directly.
            </p>
          </div>

          <div 
            className="digi-pricing-grid" 
            style={{ 
              gridTemplateColumns: `repeat(${Math.min(service.packages?.length || 3, 3)}, 1fr)`,
              maxWidth: (service.packages?.length || 3) <= 2 ? "780px" : "1180px",
              margin: "0 auto"
            }}
          >
            {service.packages?.map((pkg) => {
              const isPop = pkg.is_popular;
              return (
                <div 
                  key={pkg.id} 
                  className={`digi-pricing-card ${isPop ? "featured" : ""}`}
                  style={{ position: "relative" }}
                >
                  {isPop && (
                    <div style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "var(--digi-orange, #ff9f43)",
                      color: "#ffffff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderBottomLeftRadius: "6px",
                      zIndex: 2,
                      letterSpacing: "0.05em"
                    }}>
                      Recommended Choice
                    </div>
                  )}

                  <div className="pricing-card-header">
                    <h4>{pkg.name}</h4>
                    <div className="pricing-card-price">
                      ${pkg.price}<span>/one-time</span>
                    </div>
                    {pkg.short_description && (
                      <div style={{ fontSize: "0.82rem", opacity: 0.9, marginTop: "6px" }}>
                        {pkg.short_description}
                      </div>
                    )}
                  </div>

                  <div className="pricing-card-badges">
                    <span><i className="fa-regular fa-clock"></i> {pkg.delivery_days} Days</span>
                    <span><i className="fa-solid fa-rotate-left"></i> {pkg.revisions} Revisions</span>
                  </div>

                  <ul className="pricing-card-features">
                    {pkg.features?.map((feat, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-circle-check"></i> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="pricing-card-footer">
                    <button
                      type="button"
                      className="btn btn-aqua-solid btn-block"
                      onClick={() => handleOrder(pkg)}
                      style={{ fontSize: "0.92rem", padding: "12px 18px", borderRadius: "4px" }}
                    >
                      <i className="fa-solid fa-paper-plane"></i> Inquire &amp; Order Plan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EXECUTION PROCESS / METHODOLOGY */}
      <section className="section digi-steps-section" style={{ background: "#eef2ff", padding: "80px 0" }}>
        <div className="container">
          <div className="digi-section-head" style={{ marginBottom: "45px" }}>
            <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Standardized Methodology
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#0f172a", marginTop: "6px" }}>
              How We Deliver Results
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
              Every deliverable goes through a 4-phase technical audit and engineering review.
            </p>
          </div>

          <div className="digi-steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            <div className="digi-step-card">
              <div className="step-badge-num">01</div>
              <div className="step-card-content">
                <h3>Intake &amp; Scope Alignment</h3>
                <p>We review your target URL, competitors, primary keywords, and Google Search Console access.</p>
              </div>
            </div>

            <div className="digi-step-card">
              <div className="step-badge-num">02</div>
              <div className="step-card-content">
                <h3>Diagnostic Data Crawl</h3>
                <p>Deep-crawl using Screaming Frog, Ahrefs, and Google Search Console API for granular data extraction.</p>
              </div>
            </div>

            <div className="digi-step-card">
              <div className="step-badge-num">03</div>
              <div className="step-card-content">
                <h3>Execution &amp; Action Plan</h3>
                <p>We compile your prioritized action sheets, developer-ready instructions, and metadata roadmaps.</p>
              </div>
            </div>

            <div className="digi-step-card">
              <div className="step-badge-num">04</div>
              <div className="step-card-content">
                <h3>Debrief &amp; Ongoing Support</h3>
                <p>Video walkthrough and live strategy review to ensure seamless execution by your team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIABLE CLIENT PROOF & CASE STUDIES */}
      <ServiceProofSection />

      {/* 5. SERVICE FAQ SECTION */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: "860px" }}>
            <div className="digi-section-head" style={{ marginBottom: "35px" }}>
              <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Got Questions?
              </span>
              <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0f172a", marginTop: "6px" }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {service.faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: activeFaq === idx ? "#eff6ff" : "#ffffff",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: activeFaq === idx ? "#1e40af" : "#0f172a"
                    }}
                  >
                    <span>{faq.question || faq.q}</span>
                    <i className={`fa-solid ${activeFaq === idx ? "fa-minus" : "fa-plus"}`} style={{ fontSize: "0.85rem", color: "#64748b" }}></i>
                  </button>

                  {activeFaq === idx && (
                    <div style={{ padding: "16px 20px", borderTop: "1px solid #e2e8f0", background: "#ffffff", fontSize: "0.92rem", lineHeight: 1.6, color: "#475569" }}>
                      {faq.answer || faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. BOTTOM DIRECT ACTION CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)", color: "#ffffff", padding: "60px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "#ffffff", fontSize: "2.2rem", fontWeight: 800, marginBottom: "12px" }}>
            Ready to Accelerate Your Organic Traffic?
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            Speak directly with Abdullah Saleh to customize an SEO sprint tailored to your revenue goals.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/8801670769816?text=${encodeURIComponent(`Hi Abdullah, I'm interested in your ${service.title} service. Can we discuss?`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-aqua-solid"
              style={{ padding: "12px 28px", fontSize: "1rem" }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="btn"
              style={{ background: "rgba(255,255,255,0.18)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.4)", padding: "12px 28px", fontSize: "1rem" }}
            >
              <i className="fa-solid fa-envelope"></i> Send General Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE ORDER MODAL (EMAIL + CLIENT INFO FORM) */}
      <ServiceOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        service={service}
        initialPackage={selectedPackage}
      />
    </div>
  );
}
