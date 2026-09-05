"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/lib/data";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
    <div className="services-page-wrapper">
      {/* Hero Header Section */}
      <section className="digi-hero-section" style={{ padding: "55px 0 40px", textAlign: "center" }}>
        <div className="container">
          <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Comprehensive Capabilities
          </span>
          <h1 style={{ fontSize: "2.8rem", margin: "10px 0 14px", fontWeight: 800 }}>
            Professional SEO Services &amp; Subscriptions
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--digi-text-body)", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Choose from continuous monthly growth subscriptions or specialized consulting engagements tailored to your organic revenue targets.
          </p>
        </div>
      </section>

      {/* 1. MONTHLY SUBSCRIPTION PACKAGES SECTION */}
      <section className="section digi-pricing-section" id="subscription-plans" style={{ paddingTop: "10px", paddingBottom: "70px" }}>
        <div className="container">
          <div className="digi-section-head" style={{ marginBottom: "45px" }}>
            <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Continuous Growth Retainers
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#0f172a", marginTop: "6px" }}>
              Subscription Packages
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
              Predictable, compounding organic traffic expansion with dedicated hours each month for technical health, content clusters, and high-authority links.
            </p>
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
                  Get Started <i className="fa-solid fa-arrow-right"></i>
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
                  Get Started <i className="fa-solid fa-arrow-right"></i>
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
                  Get Started <i className="fa-solid fa-arrow-right"></i>
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
                  Get Started <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIALIZED SEO SERVICE CAPABILITIES SECTION */}
      <section className="section digi-services-section" style={{ background: "#f8fafc", padding: "75px 0 90px", borderTop: "1px solid #e2e8f0" }}>
        <div className="container">
          <div className="digi-section-head" style={{ marginBottom: "40px" }}>
            <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Specialized Engagements
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginTop: "6px" }}>
              Targeted SEO Services
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
              Need a specific one-off overhaul or targeted campaign? Explore our specialized service packages with clear deliverables.
            </p>
          </div>

          <div className="digi-cards-grid">
            {services.map((service) => (
              <div key={service.id} className="digi-service-card" style={{ marginTop: "30px" }}>
                <div className="digi-card-icon-floating">
                  <i className={`fa-solid ${service.icon || "fa-chart-line"}`} style={{ color: "var(--digi-blue)" }}></i>
                </div>
                <div className="digi-card-body">
                  <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, color: "var(--digi-blue)", background: "var(--digi-blue-subtle)", padding: "2px 8px", borderRadius: "4px", marginBottom: "8px", textAlign: "center", width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                    {service.category_name || "Specialized SEO"}
                  </span>
                  <h3>{service.title}</h3>
                  <p className="card-intro">{service.short_description}</p>
                  
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "16px", marginTop: "auto" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--digi-text-muted)" }}>Starting at</span>
                      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--digi-text-main)" }}>${service.starting_price}</div>
                    </div>
                    <Link href={`/services/${service.slug}`} className="btn btn-sm btn-blue-solid">
                      View Packages <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Order Modal */}
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
