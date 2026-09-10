"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
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

  const handleOpenPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="pricing-page-wrapper">
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

      {/* Subscription Pricing Grid */}
      <section className="section digi-pricing-section" style={{ paddingTop: "10px", paddingBottom: "70px" }}>
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
                  >
                    <i className="fa-solid fa-paper-plane"></i> Inquire &amp; Get Started
                  </button>
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
          title: "Monthly SEO Subscription & Retainer",
          starting_price: selectedPlan?.price || 125
        }}
        initialPackage={selectedPlan}
      />
    </div>
  );
}
