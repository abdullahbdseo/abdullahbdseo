"use client";

import Link from "next/link";
import { siteSettings } from "@/lib/data";

const verifiedReviews = [
  {
    name: "Mia Collins",
    role: "Director, Northline Digital",
    rating: 4,
    quote: "He rebuilt our service funnel around conversions, not vanity metrics. More qualified enquiries and far less manual follow-up.",
    avatar: "M",
  },
  {
    name: "Ryan Patel",
    role: "Co-Founder, ClickPilot Studio",
    rating: 4,
    quote: "Fast communication and a practical automation setup. Our lead handling is now smoother and much easier to track.",
    avatar: "R",
  },
  {
    name: "Sophie Turner",
    role: "Marketing Lead, BrightPath Solutions",
    rating: 5,
    quote: "The website improvements gave us a cleaner offer, stronger CTA flow, and noticeably better lead quality.",
    avatar: "S",
  },
  {
    name: "Alex Morgan",
    role: "Owner, ScaleForge Agency",
    rating: 5,
    quote: "Delivered exactly what was promised automation, conversion focused pages, and reporting that shows what is actually working.",
    avatar: "A",
  },
  {
    name: "Daniel Reed",
    role: "GrowthStack Media",
    rating: 5,
    quote: "Clear strategy, clean delivery, and better-quality leads within weeks. The KPI reporting made every decision easier.",
    avatar: "D",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "40px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>

        {/* Main 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }}>

          {/* Left Sticky Sidebar: Table of Contents */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <nav style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                <li>
                  <a href="#vision" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none", transition: "all 0.2s ease" }}>
                    <i className="fa-regular fa-eye" style={{ width: "16px", color: "#0062d2" }}></i>
                    <span>Vision</span>
                  </a>
                </li>
                <li>
                  <a href="#methodology" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none", transition: "all 0.2s ease" }}>
                    <i className="fa-solid fa-diagram-project" style={{ width: "16px", color: "#0062d2" }}></i>
                    <span>Methodology</span>
                  </a>
                </li>
                <li>
                  <a href="#leadership" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none", transition: "all 0.2s ease" }}>
                    <i className="fa-regular fa-user" style={{ width: "16px", color: "#0062d2" }}></i>
                    <span>Leadership</span>
                  </a>
                </li>
                <li>
                  <a href="#why-us" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none", transition: "all 0.2s ease" }}>
                    <i className="fa-solid fa-circle-check" style={{ width: "16px", color: "#0062d2" }}></i>
                    <span>Why Me?</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none", transition: "all 0.2s ease" }}>
                    <i className="fa-solid fa-star" style={{ width: "16px", color: "#fbbf24" }}></i>
                    <span>Testimonials</span>
                  </a>
                </li>
                <li>
                  <a href="#services" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none", transition: "all 0.2s ease" }}>
                    <i className="fa-solid fa-layer-group" style={{ width: "16px", color: "#0062d2" }}></i>
                    <span>Service Expertise</span>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Right Column: Main Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

            {/* Page Hero Header */}
            <div style={{ textAlign: "center" }}>
              <h1 className="about-hero-badge">
                I Build Search &amp; Revenue Systems for Businesses That Need to Grow
              </h1>
              <p style={{ maxWidth: "680px", margin: "16px auto 0", fontSize: "0.98rem", color: "#475569", lineHeight: 1.7 }}>
                The market is getting harder: ad costs rise, attention drops, and algorithms evolve. I help businesses turn search visibility, technical architecture, content, and conversion flows into connected revenue systems.
              </p>
            </div>

            {/* Section 1: Vision */}
            <section id="vision" style={{ scrollMarginTop: "100px" }}>
              <div className="about-section-header">
                <h2 className="about-section-badge-title">
                  <i className="fa-regular fa-eye" style={{ color: "#0062d2" }}></i>
                  <span>One Business System, Not Five Disconnected Tools</span>
                </h2>
              </div>
              <div className="about-card-rounded" style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#475569", lineHeight: 1.75 }}>
                  Most businesses do not need another isolated website, ad campaign, chatbot, or dashboard. They need the full customer journey to work seamlessly together. I connect organic search acquisition, high-converting service funnels, technical health, schema architecture, and follow-up workflows so that every visitor has a clear path to become a customer or booked enquiry.
                </p>
              </div>
            </section>

            {/* Section 2: Methodology */}
            <section id="methodology" style={{ scrollMarginTop: "100px" }}>
              <div className="about-section-header">
                <h2 className="about-section-badge-title">
                  <i className="fa-solid fa-diagram-project" style={{ color: "#0062d2" }}></i>
                  <span>Build the System Around the Bottleneck</span>
                </h2>
              </div>
              <div className="methodology-grid">
                <div className="methodology-card">
                  <div style={{ color: "#0062d2", fontSize: "1.2rem", marginBottom: "10px" }}>
                    <i className="fa-solid fa-chart-pie"></i>
                  </div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Measure Before Making Noise
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    I review traffic sources, keyword intent, crawl health, conversion points, operational delays, and competitor gaps before recommending a tailored solution.
                  </p>
                </div>

                <div className="methodology-card">
                  <div style={{ color: "#0062d2", fontSize: "1.2rem", marginBottom: "10px" }}>
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Build for Real Customer Behaviour
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    An SEO strategy only delivers value when searchers take action. Every page, meta description, and CTA is crafted around real buyer intent and decision-making patterns.
                  </p>
                </div>

                <div className="methodology-card">
                  <div style={{ color: "#0062d2", fontSize: "1.2rem", marginBottom: "10px" }}>
                    <i className="fa-solid fa-robot"></i>
                  </div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Automate Repetitive Work &amp; Technicals
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    I leverage automated schema generation, technical health monitoring, and AI answer engine optimizations (AEO &amp; GEO) to streamline operations and scale results.
                  </p>
                </div>

                <div className="methodology-card">
                  <div style={{ color: "#0062d2", fontSize: "1.2rem", marginBottom: "10px" }}>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Improve From Evidence
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    I use Search Console signals, user engagement data, organic conversion rates, and revenue impact metrics to continuously refine and compound organic growth.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Leadership */}
            <section id="leadership" style={{ scrollMarginTop: "100px" }}>
              <div className="about-section-header">
                <h2 className="about-section-badge-title">
                  <i className="fa-regular fa-user" style={{ color: "#0062d2" }}></i>
                  <span>Leadership</span>
                </h2>
              </div>
              <div className="about-card-rounded">
                <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <img
                    src="/images/abdullah.jpg"
                    alt="Abdullah Saleh - Best SEO Expert in Bangladesh"
                    style={{ width: "160px", height: "190px", objectFit: "cover", borderRadius: "14px", border: "1px solid #e2e8f0", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                  />
                  <div style={{ flex: 1, minWidth: "260px" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      Abdullah Saleh
                    </h3>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                      ORGANIC BUSINESS GROWTH SPECIALIST · SEO EXPERT IN BANGLADESH
                    </p>
                    <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                      With <strong>6+ years of hands-on experience</strong> across international and local markets, I combine digital marketing, technical search engine optimization, content architecture, and AI search workflows to build systems that support sustainable revenue growth. I have helped 100+ businesses improve their search visibility, achieve top Google rankings, and convert searchers into long-term clients.
                    </p>
                  </div>
                </div>

                {/* 4-Stat Metric Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0062d2" }}>6+ Years</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Hands-On Experience</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0062d2" }}>100+ Clients</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Local &amp; International</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0062d2" }}>100% White-Hat</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Google Compliant</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#059669" }}>AI &amp; GEO Ready</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>LLM &amp; AEO Optimization</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Why Me? */}
            <section id="why-us" style={{ scrollMarginTop: "100px" }}>
              <div className="about-section-header">
                <h2 className="about-section-badge-title">
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2" }}></i>
                  <span>Why Me?</span>
                </h2>
              </div>
              <div className="why-me-container">
                <div className="why-me-list">
                  <div className="why-me-item">
                    <div className="why-me-icon-box">
                      <i className="fa-solid fa-user-shield"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "3px" }}>
                        One Owner Across the Search Journey
                      </h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>
                        You get one dedicated specialist who understands keyword research, landing page optimization, technical SEO health, schema markup, and customer conversion paths.
                      </p>
                    </div>
                  </div>

                  <div className="why-me-item">
                    <div className="why-me-icon-box">
                      <i className="fa-solid fa-hand-holding-dollar"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "3px" }}>
                        Cost-Efficient by Design
                      </h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>
                        I use the right level of strategy for your growth stage. The aim is to eliminate wasted spend, reduce manual busywork, and deliver high ROI without unnecessary agency markups.
                      </p>
                    </div>
                  </div>

                  <div className="why-me-item">
                    <div className="why-me-icon-box">
                      <i className="fa-solid fa-toolbox"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "3px" }}>
                        World-Class Tools &amp; White-Hat Methods
                      </h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>
                        I work with modern search platforms: Google Search Console, GA4, GTM, Ahrefs, SEMrush, Screaming Frog, Schema markup, and AI engine citation tools.
                      </p>
                    </div>
                  </div>

                  <div className="why-me-item">
                    <div className="why-me-icon-box">
                      <i className="fa-solid fa-bolt"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "3px" }}>
                        Built for 2026 and Beyond (AI SEO &amp; AEO)
                      </h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>
                        As search expands to AI answer engines (ChatGPT, Google Gemini, Perplexity), I optimize your brand for LLM entity citations and multimodal search discovery.
                      </p>
                    </div>
                  </div>

                  <div className="why-me-item">
                    <div className="why-me-icon-box">
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "3px" }}>
                        Performance, Not Busywork
                      </h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>
                        I focus on measurable organic business metrics: higher ranking intent, lower customer acquisition cost, stronger technical health, and clearer revenue pipeline visibility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: What Internet Finds About Me (Verified Reviews Marquee) */}
            <section id="testimonials" style={{ scrollMarginTop: "100px" }}>
              <div className="testimonial-marquee-container">
                {/* Verified Reviews Pill */}
                <div className="verified-pill-badge">
                  <span className="pill-stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className="pill-divider"></span>
                  <span className="pill-text">Verified Reviews</span>
                </div>

                <h2 className="marquee-section-title">What Internet Finds About Me</h2>
                <p className="marquee-section-subtitle">
                  Real feedback and client reviews from BlackHatWorld forum as a developer and marketer.
                </p>

                {/* Marquee Viewport */}
                <div className="marquee-viewport-mask">
                  <div className="marquee-track">
                    {[...verifiedReviews, ...verifiedReviews].map((rev, idx) => (
                      <div key={idx} className="marquee-review-card">
                        <div>
                          <div className="card-stars-row" aria-label={`${rev.rating} out of 5 stars`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className="fa-solid fa-star"
                                style={{
                                  color: star <= rev.rating ? "#fbbf24" : "#e2e8f0",
                                  fontSize: "0.85rem",
                                }}
                              ></i>
                            ))}
                          </div>
                          <p className="card-quote-body">
                            &ldquo;“{rev.quote}”&rdquo;
                          </p>
                        </div>
                        <div className="card-bottom-row">
                          <div>
                            <h3 className="card-author-name">{rev.name}</h3>
                            <p className="card-author-title">{rev.role}</p>
                          </div>
                          <div className="card-avatar-badge">{rev.avatar}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Check My Service Expertise */}
            <section id="services" style={{ scrollMarginTop: "100px" }}>
              <div className="about-section-header">
                <h2 className="about-section-badge-title">
                  <i className="fa-solid fa-layer-group" style={{ color: "#0062d2" }}></i>
                  <span>Check My Service Expertise</span>
                </h2>
              </div>
              <div className="service-expertise-grid">
                <Link href="/services/local-seo-service-in-bangladesh" className="service-expertise-card">
                  <div>
                    <span className="service-pill-tag">Local SEO</span>
                    <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                      Local SEO Service in Bangladesh
                    </h3>
                    <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px" }}>
                      Dominate Google Map 3-Pack, local business queries, and geo-targeted organic searches to attract high-intent local buyers.
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>Explore Local SEO</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>

                <Link href="/services/technical-seo-service-in-bangladesh" className="service-expertise-card">
                  <div>
                    <span className="service-pill-tag">Technical SEO</span>
                    <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                      Technical SEO Service in Bangladesh
                    </h3>
                    <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px" }}>
                      Advanced site crawlability, Core Web Vitals optimization, JSON-LD Schema markup, and indexing architecture fixes.
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>Explore Technical SEO</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>

                <Link href="/services/ecommerce-seo-service-in-bangladesh" className="service-expertise-card">
                  <div>
                    <span className="service-pill-tag">Ecommerce SEO</span>
                    <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                      Ecommerce SEO Service in Bangladesh
                    </h3>
                    <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px" }}>
                      Scale organic sales for online stores with product taxonomy, high-converting category SEO, and faceted navigation setup.
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>Explore Ecommerce SEO</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>

                <Link href="/services/ai-seo-service-in-bangladesh" className="service-expertise-card">
                  <div>
                    <span className="service-pill-tag" style={{ background: "#ecfdf5", color: "#059669" }}>AI &amp; GEO Build</span>
                    <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                      AI SEO, AEO &amp; GEO Optimization
                    </h3>
                    <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px" }}>
                      Position your business to be cited and recommended by generative AI engines, ChatGPT, Perplexity, and Google Gemini.
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "#059669", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>Explore AI SEO</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>
              </div>
            </section>

            {/* CTA Box */}
            <div style={{ background: "linear-gradient(135deg, #0059b3 0%, #003d80 100%)", borderRadius: "16px", padding: "38px 24px", color: "#ffffff", textAlign: "center", boxShadow: "0 10px 30px rgba(0, 89, 179, 0.15)" }}>
              <h2 style={{ color: "#ffffff", fontSize: "1.8rem", marginBottom: "8px", fontWeight: 800 }}>Ready to Grow Your Business Organically?</h2>
              <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.95rem", maxWidth: "560px", margin: "0 auto 20px", lineHeight: 1.6 }}>
                Connect with Abdullah Saleh for a comprehensive SEO audit and a customized organic growth roadmap.
              </p>
              <Link href="/contact" className="btn btn-lg" style={{ background: "#ffffff", color: "#0059b3", fontWeight: 700, border: "none", borderRadius: "8px", padding: "12px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                Contact Abdullah Directly <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

