"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  siteSettings, 
  services, 
  caseStudies, 
  pricingPlans, 
  testimonials, 
  faqs, 
  processSteps,
  freeTools 
} from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import ServiceOrderModal from "@/components/ServiceOrderModal";

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleOrder = (service, pkg = null) => {
    setSelectedService(service);
    setSelectedPackage(pkg || service.packages?.[1] || service.packages?.[0]);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Available for Q1/Q2 Strategy Engagements</span>
            </div>

            <h1 className="hero-title">
              Data-Backed SEO That Drives <span className="text-gradient">Predictable Organic Revenue</span>
            </h1>

            <p className="hero-subtitle">
              Hi, I&apos;m <strong>{siteSettings.expert_name}</strong>. I help B2B SaaS, enterprise brands, and e-commerce stores scale qualified search traffic, dominate competitive keywords, and build bulletproof search moats.
            </p>

            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-lg" 
                onClick={() => setIsQuoteOpen(true)}
              >
                <i className="fa-solid fa-bolt"></i>
                Request Free SEO Audit
              </button>
              <Link href="/services" className="btn btn-outline btn-lg">
                <i className="fa-solid fa-layer-group"></i>
                Explore Services
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-number">10+</span>
                <span className="trust-label">Years Experience</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">550+</span>
                <span className="trust-label">Rankings Scaled</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">380%</span>
                <span className="trust-label">Avg. Traffic Growth</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">100%</span>
                <span className="trust-label">White-Hat Strategy</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-glow"></div>
            <div className="hero-image-wrapper">
              <Image 
                src="/images/seo_hero_3d.png" 
                alt="SEO Strategy Analytics" 
                width={560} 
                height={520} 
                className="hero-image"
                priority
              />
              
              {/* Floating Metric 1 */}
              <div className="floating-badge badge-top-left">
                <div className="badge-icon bg-success-light">
                  <i className="fa-solid fa-arrow-trend-up text-success"></i>
                </div>
                <div>
                  <div className="floating-title">+485% Organic ROI</div>
                  <div className="floating-sub">Verified GSC Data</div>
                </div>
              </div>

              {/* Floating Metric 2 */}
              <div className="floating-badge badge-bottom-right">
                <div className="badge-icon bg-primary-light">
                  <i className="fa-solid fa-crown text-primary"></i>
                </div>
                <div>
                  <div className="floating-title">#1 Position Secured</div>
                  <div className="floating-sub">High-Intent B2B Keywords</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST LOGOS / INDUSTRY BADGES */}
      <section className="brands-section">
        <div className="container">
          <p className="brands-title">PROVEN AUDIT FRAMEWORK APPLIED ACROSS MODERN TECH STACKS & PLATFORMS</p>
          <div className="brands-grid">
            <div className="brand-logo"><i className="fa-brands fa-shopify"></i> Shopify Plus</div>
            <div className="brand-logo"><i className="fa-brands fa-wordpress"></i> WordPress & Woo</div>
            <div className="brand-logo"><i className="fa-brands fa-react"></i> Next.js & React</div>
            <div className="brand-logo"><i className="fa-brands fa-magento"></i> Magento 2</div>
            <div className="brand-logo"><i className="fa-brands fa-google"></i> Google Search Console</div>
            <div className="brand-logo"><i className="fa-solid fa-chart-line"></i> Ahrefs & Semrush</div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section className="services-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Specialized Expertise</div>
            <h2 className="section-title">Engineered For Measurable Business Growth</h2>
            <p className="section-subtitle">
              Every package is tailored to solve root technical blockages, outrank entrenched competitors, and compound high-converting buyer traffic.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className={`service-card ${service.is_featured ? "featured" : ""}`}>
                {service.is_featured && <div className="card-ribbon">Top Performer</div>}
                <div className="service-icon-box">
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.short_description}</p>
                
                <div className="service-card-meta">
                  <div className="service-price">
                    <span className="price-label">Starting from</span>
                    <span className="price-value">${service.starting_price}</span>
                  </div>
                  <div className="service-delivery">
                    <i className="fa-regular fa-clock"></i> {service.delivery_time}
                  </div>
                </div>

                <div className="service-card-actions">
                  <Link href={`/services/${service.slug}`} className="btn btn-outline btn-sm">
                    View Packages
                  </Link>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOrder(service)}
                  >
                    Quick Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-secondary btn-lg">
              View All 6 Core Solutions & Deliverables <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF & CASE STUDIES */}
      <section className="case-studies-section section-padding bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Real Results</div>
            <h2 className="section-title">Verified Search Growth Case Studies</h2>
            <p className="section-subtitle">
              Take a look at real Google Search Console metrics and ranking breakthroughs achieved for client campaigns.
            </p>
          </div>

          <div className="case-grid">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="case-card">
                <div className="case-image-wrapper">
                  <Image 
                    src={cs.featured_image} 
                    alt={cs.title} 
                    width={600} 
                    height={340} 
                    className="case-image"
                  />
                  <div className="case-category">{cs.industry}</div>
                </div>

                <div className="case-content">
                  <h3 className="case-title">{cs.title}</h3>
                  <p className="case-desc">{cs.summary}</p>

                  <div className="case-stats-grid">
                    <div className="case-stat-box">
                      <span className="stat-num">{cs.traffic_growth}</span>
                      <span className="stat-text">Traffic Lift</span>
                    </div>
                    <div className="case-stat-box">
                      <span className="stat-num">{cs.keyword_growth}</span>
                      <span className="stat-text">Top 3 Keywords</span>
                    </div>
                    <div className="case-stat-box">
                      <span className="stat-num">{cs.revenue_impact}</span>
                      <span className="stat-text">Revenue Growth</span>
                    </div>
                  </div>

                  <div className="case-footer">
                    <Link href={`/portfolio/${cs.slug}`} className="btn btn-link">
                      Read Full GSC Case Study <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn btn-primary btn-lg">
              Explore All Case Studies & Proof <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 6-STEP PROCESS SECTION */}
      <section className="process-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Methodology</div>
            <h2 className="section-title">A Scientific, Step-by-Step SEO Framework</h2>
            <p className="section-subtitle">
              No guesswork or outdated tactics. Every campaign follows an iterative, data-driven framework built to withstand core algorithm updates.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.step} className="process-card">
                <div className="process-step-num">{step.step}</div>
                <div className="process-icon">
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE TOOLS HIGHLIGHT */}
      <section className="tools-highlight-section section-padding bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Self-Service Utilities</div>
            <h2 className="section-title">Free In-House SEO & ROI Tools Suite</h2>
            <p className="section-subtitle">
              Access 10 free utilities designed for marketers, developers, and founders to audit, optimize, and forecast returns.
            </p>
          </div>

          <div className="tools-grid-mini">
            {freeTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-card-mini">
                <div className="tool-mini-icon" style={{ color: tool.color, backgroundColor: tool.bg }}>
                  <i className={tool.icon}></i>
                </div>
                <div className="tool-mini-content">
                  <h4 className="tool-mini-title">{tool.title}</h4>
                  <p className="tool-mini-desc">{tool.desc}</p>
                </div>
                <div className="tool-mini-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/tools" className="btn btn-outline btn-lg">
              Browse All 10 Free Tools <i className="fa-solid fa-toolbox"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* MONTHLY PRICING RETAINERS */}
      <section className="pricing-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Monthly Growth Retainers</div>
            <h2 className="section-title">Predictable Pricing for Dedicated Execution</h2>
            <p className="section-subtitle">
              Transparent retainers with dedicated technical resources, monthly deliverables, and ongoing performance reporting.
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.is_popular ? "popular" : ""}`}>
                {plan.is_popular && <div className="popular-badge">Most Popular Choice</div>}
                
                <div className="pricing-head">
                  <h3 className="plan-name">{plan.name}</h3>
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
                    onClick={() => {
                      setSelectedService({
                        id: 999,
                        title: `${plan.name} Retainer`,
                        slug: "retainer",
                        starting_price: plan.price
                      });
                      setSelectedPackage({
                        id: 9990 + plan.id,
                        name: plan.name,
                        price: plan.price,
                        delivery_days: 30,
                        features: plan.features
                      });
                    }}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section section-padding bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <div className="sub-badge">Client Endorsements</div>
            <h2 className="section-title">What Founders & Marketing Leaders Say</h2>
            <p className="section-subtitle">
              Feedback from B2B founders, e-commerce managers, and agency partners.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((test) => (
              <div key={test.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(test.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-warning"></i>
                  ))}
                </div>
                <p className="testimonial-quote">&ldquo;{test.review}&rdquo;</p>

                <div className="testimonial-author">
                  <Image 
                    src={test.avatar} 
                    alt={test.name} 
                    width={50} 
                    height={50} 
                    className="author-avatar"
                  />
                  <div>
                    <h4 className="author-name">{test.name}</h4>
                    <span className="author-role">{test.role}, {test.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section section-padding">
        <div className="container max-w-4xl">
          <div className="section-header text-center">
            <div className="sub-badge">Frequently Asked Questions</div>
            <h2 className="section-title">Everything You Need to Know Before Starting</h2>
            <p className="section-subtitle">
              Clear answers on timelines, methodology, billing, and deliverables.
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, idx) => (
              <div 
                key={faq.id} 
                className={`faq-item ${activeFaq === idx ? "open" : ""}`}
                onClick={() => toggleFaq(idx)}
              >
                <button className="faq-question" aria-expanded={activeFaq === idx}>
                  <span>{faq.question}</span>
                  <i className={`fa-solid ${activeFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-box">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Turn Search Into Your #1 Acquisition Channel?</h2>
              <p className="cta-desc">
                Let&apos;s analyze your domain, diagnose crawl bottlenecks, and uncover untapped keyword clusters.
              </p>
              <div className="cta-actions">
                <button 
                  className="btn btn-light btn-lg" 
                  onClick={() => setIsQuoteOpen(true)}
                >
                  <i className="fa-solid fa-comments"></i>
                  Request Free Audit & Proposal
                </button>
                <Link href="/contact" className="btn btn-outline-light btn-lg">
                  <i className="fa-solid fa-envelope"></i>
                  Direct Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
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
