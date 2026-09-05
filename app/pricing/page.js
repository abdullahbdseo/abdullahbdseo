"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingPlans, siteSettings } from "@/lib/data";
import ServiceOrderModal from "@/components/ServiceOrderModal";
import QuoteModal from "@/components/QuoteModal";

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedService({
      id: 999,
      title: `${plan.name} Retainer`,
      slug: "monthly-retainer",
      starting_price: plan.price
    });
    setSelectedPackage({
      id: 9990 + plan.id,
      name: plan.name,
      price: plan.price,
      delivery_days: 30,
      features: plan.features
    });
  };

  return (
    <div className="pricing-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Predictable Growth</div>
          <h1 className="page-title">Monthly SEO Retainers & Plans</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Choose a dedicated monthly partnership tier for continuous technical execution, content scaling, and high-impact authority building.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="section-padding">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.is_popular ? "popular" : ""}`}>
                {plan.is_popular && <div className="popular-badge">Most Popular Partnership</div>}

                <div className="pricing-head">
                  <h2 className="plan-name">{plan.name}</h2>
                  <p className="plan-tagline">{plan.tagline}</p>
                  <div className="plan-price-wrap">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">{plan.billing_cycle}</span>
                  </div>
                </div>

                <div className="plan-divider"></div>

                <ul className="plan-features">
                  {plan.features.map((feat, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check text-primary"></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pricing-action">
                  <button 
                    className={`btn w-full ${plan.is_popular ? "btn-primary" : "btn-outline"}`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Select {plan.name} Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CUSTOM ENTERPRISE CALLOUT */}
          <div className="custom-plan-card mt-16">
            <div className="custom-plan-body">
              <div>
                <h3 className="custom-plan-title">Need a Custom Scope or Multi-Domain Audit?</h3>
                <p className="custom-plan-desc">
                  For large-scale marketplaces, SaaS with 50,000+ programmatic pages, or international multi-language domains.
                </p>
              </div>
              <div>
                <button 
                  className="btn btn-secondary btn-lg"
                  onClick={() => setIsQuoteOpen(true)}
                >
                  Request Custom Proposal
                </button>
              </div>
            </div>
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

      {/* QUOTE MODAL */}
      <QuoteModal 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}
