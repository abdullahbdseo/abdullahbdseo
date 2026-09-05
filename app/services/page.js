"use client";

import { useState } from "react";
import Link from "next/link";
import { services, serviceCategories, siteSettings } from "@/lib/data";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => {
        const cat = serviceCategories.find(c => c.slug === activeCategory);
        return cat && s.category_id === cat.id;
      });

  const handleOrder = (service, pkg = null) => {
    setSelectedService(service);
    setSelectedPackage(pkg || service.packages?.[1] || service.packages?.[0]);
  };

  return (
    <div className="services-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Specialized Solutions</div>
          <h1 className="page-title">Enterprise SEO & Growth Services</h1>
          <p className="page-subtitle">
            Engineered to resolve deep technical roadblocks, capture competitive search market share, and compound revenue.
          </p>

          {/* CATEGORY FILTER TABS */}
          <div className="category-filter-bar">
            <button 
              className={`filter-tab ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Services ({services.length})
            </button>
            {serviceCategories.map((cat) => (
              <button 
                key={cat.slug}
                className={`filter-tab ${activeCategory === cat.slug ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="section-padding">
        <div className="container">
          <div className="services-detailed-list">
            {filteredServices.map((service, index) => (
              <div key={service.id} className="service-detail-card" id={service.slug}>
                <div className="service-detail-header">
                  <div className="service-detail-icon-wrap">
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <div className="service-detail-title-wrap">
                    <div className="service-tag">Deliverable Roadmap</div>
                    <h2 className="service-detail-title">{service.title}</h2>
                    <p className="service-detail-desc">{service.description}</p>
                  </div>
                </div>

                {/* PACKAGES COMPARISON TABLE / CARDS */}
                <div className="service-packages-grid">
                  {service.packages?.map((pkg) => (
                    <div key={pkg.id} className={`pkg-mini-card ${pkg.is_popular ? "highlighted" : ""}`}>
                      {pkg.is_popular && <div className="pkg-ribbon">Most Recommended</div>}
                      <h3 className="pkg-name">{pkg.name}</h3>
                      <p className="pkg-desc">{pkg.short_description}</p>
                      
                      <div className="pkg-price-row">
                        <span className="pkg-amount">${pkg.price}</span>
                        <span className="pkg-duration"><i className="fa-regular fa-clock"></i> {pkg.delivery_days} Days</span>
                      </div>

                      <ul className="pkg-features-list">
                        {pkg.features?.map((feat, fidx) => (
                          <li key={fidx}>
                            <i className="fa-solid fa-check text-primary"></i>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pkg-actions">
                        <button 
                          className={`btn w-full ${pkg.is_popular ? "btn-primary" : "btn-outline"}`}
                          onClick={() => handleOrder(service, pkg)}
                        >
                          Order {pkg.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="service-card-footer">
                  <Link href={`/services/${service.slug}`} className="btn btn-link">
                    View Complete Package Breakdown & Deliverable Details <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE ORDER MODAL */}
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
