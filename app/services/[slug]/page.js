"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, siteSettings } from "@/lib/data";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function SingleServicePage({ params }) {
  const unwrappedParams = use(params);
  const service = services.find((s) => s.slug === unwrappedParams.slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  if (!service) {
    notFound();
  }

  const handleOrder = (pkg) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="single-service-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">
            <i className={`fa-solid ${service.icon}`}></i> {service.category_name || "Specialized SEO"}
          </div>
          <h1 className="page-title">{service.title}</h1>
          <p className="page-subtitle max-w-3xl mx-auto">
            {service.description}
          </p>
          <div className="header-meta-row mt-6">
            <span className="meta-badge"><i className="fa-solid fa-tag"></i> Starting from ${service.starting_price}</span>
            <span className="meta-badge"><i className="fa-regular fa-clock"></i> Delivery: {service.delivery_time}</span>
            <span className="meta-badge"><i className="fa-solid fa-shield-halved"></i> 100% Quality Guaranteed</span>
          </div>
        </div>
      </section>

      {/* PACKAGES PRICING MATRIX */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Choose Your Plan</div>
            <h2 className="section-title">Select The Package That Fits Your Scale</h2>
            <p className="section-subtitle">
              Transparent, one-time investment with complete deliverable documentation and support.
            </p>
          </div>

          <div className="packages-comparison-grid">
            {service.packages?.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`package-card ${pkg.is_popular ? "featured-package" : ""}`}
              >
                {pkg.is_popular && <div className="package-ribbon">Most Popular Choice</div>}

                <div className="pkg-header">
                  <h3 className="pkg-title">{pkg.name}</h3>
                  <p className="pkg-desc-text">{pkg.short_description}</p>
                  
                  <div className="pkg-price-tag">
                    <span className="pkg-curr">$</span>
                    <span className="pkg-num">{pkg.price}</span>
                    <span className="pkg-type">USD (One-time)</span>
                  </div>
                </div>

                <div className="pkg-meta-info">
                  <div className="pkg-meta-item">
                    <i className="fa-regular fa-clock text-primary"></i>
                    <span><strong>{pkg.delivery_days} Days</strong> Delivery</span>
                  </div>
                  <div className="pkg-meta-item">
                    <i className="fa-solid fa-rotate-left text-success"></i>
                    <span><strong>{pkg.revisions}</strong> Revisions</span>
                  </div>
                </div>

                <div className="pkg-features-divider">Included Deliverables</div>

                <ul className="pkg-checklist">
                  {pkg.features?.map((feat, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-circle-check text-primary"></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pkg-action-wrap">
                  <button 
                    className={`btn w-full btn-lg ${pkg.is_popular ? "btn-primary" : "btn-outline"}`}
                    onClick={() => handleOrder(pkg)}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Order {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DELIVERABLE PROCESS WALKTHROUGH */}
          <div className="service-details-body mt-16">
            <div className="details-card">
              <h3 className="details-card-title"><i className="fa-solid fa-list-check text-primary"></i> How We Execute This Service</h3>
              <div className="execution-steps-grid mt-6">
                <div className="step-item">
                  <span className="step-count">01</span>
                  <h4>Requirement & Domain Intake</h4>
                  <p>We review your website URL, competitor domains, target market, and search performance benchmarks.</p>
                </div>
                <div className="step-item">
                  <span className="step-count">02</span>
                  <h4>Forensic Data Collection</h4>
                  <p>Full crawl using custom configurations, Google Search Console API pull, and log file audit.</p>
                </div>
                <div className="step-item">
                  <span className="step-count">03</span>
                  <h4>Strategic Deliverable Creation</h4>
                  <p>We build your prioritized action sheets, developer-ready implementation guides, and content briefs.</p>
                </div>
                <div className="step-item">
                  <span className="step-count">04</span>
                  <h4>Debrief & Post-Delivery Support</h4>
                  <p>Walkthrough video or live consultation call to guide your engineering and editorial teams on implementation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE ORDER MODAL */}
      <ServiceOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        service={service}
        initialPackage={selectedPackage}
      />
    </div>
  );
}
