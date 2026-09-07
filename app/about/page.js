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
            <nav style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.04)" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                <li>
                  <a href="#about-expert" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#0062d2", background: "#eff6ff", textDecoration: "none" }}>
                    <i className="fa-regular fa-user" style={{ width: "16px" }}></i>
                    <span>SEO Expert Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#philosophy" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-regular fa-eye" style={{ width: "16px" }}></i>
                    <span>SEO Philosophy</span>
                  </a>
                </li>
                <li>
                  <a href="#expertise" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-layer-group" style={{ width: "16px" }}></i>
                    <span>Core Expertise</span>
                  </a>
                </li>
                <li>
                  <a href="#ai-search" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-microchip" style={{ width: "16px" }}></i>
                    <span>AI SEO &amp; Future</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-star" style={{ width: "16px", color: "#fbbf24" }}></i>
                    <span>Verified Reviews</span>
                  </a>
                </li>
                <li>
                  <a href="#why-choose" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-circle-check" style={{ width: "16px" }}></i>
                    <span>Why Work With Me?</span>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Right Column: Main Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

            {/* Page Hero Header */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-award"></i>
                <span>Organic Business Growth Specialist</span>
              </div>
              <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25, marginBottom: "16px", letterSpacing: "-0.015em" }}>
                Best SEO Expert in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Abdullah Saleh</span>
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.8, margin: 0 }}>
                I’m <strong>Abdullah Saleh</strong>, an Organic Business Growth Specialist and <strong>SEO Expert in Bangladesh</strong> with <strong>6+ years of hands-on experience</strong> in helping businesses grow through search. Over the years, I’ve worked with <strong>100+ local and international clients</strong>, helping them improve their online visibility, attract the right audience, generate qualified leads, and turn organic traffic into real business growth.
              </p>
            </div>

            {/* Section 1: Expert Profile & Leadership */}
            <section id="about-expert">
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px 32px", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <img
                    src="/images/abdullah.jpg"
                    alt="Abdullah Saleh - Best SEO Expert in Bangladesh"
                    style={{ width: "160px", height: "190px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: "260px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      Abdullah Saleh
                    </h2>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0062d2", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                      ORGANIC BUSINESS GROWTH SPECIALIST · SEO EXPERT IN BANGLADESH
                    </p>
                    <p style={{ fontSize: "0.98rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                      My approach combines technical SEO, content, user experience, authority building, and search intent to create strategies that are practical, sustainable, and focused on business results. I work with businesses across different industries and markets, which has given me a strong understanding of how search behavior, competition, and customer intent can vary from one audience to another.
                    </p>
                  </div>
                </div>

                {/* 4-Stat Metric Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0062d2" }}>6+ Years</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Hands-On Experience</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0062d2" }}>100+ Clients</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Local &amp; International</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0062d2" }}>100% White-Hat</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Google Compliant</div>
                  </div>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#059669" }}>AI &amp; GEO Ready</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>LLM &amp; AEO Optimization</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: SEO Philosophy */}
            <section id="philosophy">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-regular fa-eye"></i>
                <span>Search Philosophy</span>
              </div>

              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "28px 32px", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                  Rankings That Drive Revenue, Not Just Traffic
                </h3>
                <p style={{ color: "#334155", fontSize: "1rem", lineHeight: 1.8, margin: "0 0 16px" }}>
                  For me, SEO is not just about rankings or getting more visitors from Google. It’s about understanding what people are searching for, creating a website that genuinely helps them, and building a strong online presence that can grow consistently over time.
                </p>
                <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.75, margin: 0 }}>
                  My goal is simple: build SEO strategies that don’t just bring traffic, but help businesses become more visible, trusted, and successful online.
                </p>
              </div>
            </section>

            {/* Section 3: Core Areas of Expertise */}
            <section id="expertise">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-layer-group"></i>
                <span>Core Areas of Expertise</span>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0062d2", borderRadius: "6px", padding: "24px 28px" }}>
                <p style={{ fontSize: "1.02rem", color: "#334155", lineHeight: 1.8, margin: 0 }}>
                  My core areas of expertise include{" "}
                  <Link href="/services/local-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Local SEO</Link>,{" "}
                  <Link href="/services/technical-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Technical SEO</Link>,{" "}
                  <Link href="/services/ecommerce-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>Ecommerce SEO</Link>,{" "}
                  content optimization, keyword research, link building, and organic growth strategies.
                </p>
              </div>
            </section>

            {/* Section 4: AI SEO & Future of Search */}
            <section id="ai-search">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#059669", marginBottom: "14px" }}>
                <i className="fa-solid fa-microchip"></i>
                <span>AI-Driven Search &amp; Modern SEO</span>
              </div>

              <div style={{ background: "linear-gradient(180deg, #edf6ff 0%, #f4f9ff 100%)", border: "1px solid #dbeafe", borderLeft: "4px solid #059669", borderRadius: "6px", padding: "24px 28px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>
                  AI SEO, AEO, GEO &amp; LLM Optimization
                </h3>
                <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.8, margin: 0 }}>
                  As search continues to evolve, I also focus on the growing world of AI-driven search. Through modern{" "}
                  <Link href="/services/ai-seo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AI SEO</Link> strategies, including{" "}
                  <Link href="/services/aeo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>AEO</Link>,{" "}
                  <Link href="/services/geo-service-in-bangladesh" style={{ color: "#0062d2", fontWeight: 700, textDecoration: "underline" }}>GEO</Link>, E-E-A-T optimization, and LLM SEO, I help businesses prepare their websites for the way people are discovering information today&mdash;and the way search is changing for tomorrow.
                </p>
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

            {/* Section 6: Why Choose */}
            <section id="why-choose">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, color: "#0062d2", marginBottom: "14px" }}>
                <i className="fa-solid fa-circle-check"></i>
                <span>Why Work With Me?</span>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>6+ Years Proven Search Track Record</h4>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>Hands-on experience delivering measurable ranking gains and sustainable organic growth for 100+ businesses across competitive niches.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Business &amp; Revenue-Focused SEO</h4>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>Strategies tailored not just for impressions, but for search intent, qualified leads, high conversions, and measurable business growth.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#eff6ff", color: "#0062d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-microchip"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Prepared for AI &amp; The Future of Search</h4>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>Cutting-edge AEO, GEO, and LLM optimization to ensure your brand is cited and recommended by AI answer engines and search algorithms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Box */}
            <div style={{ background: "linear-gradient(135deg, #0062d2 0%, #004bb5 100%)", borderRadius: "6px", padding: "36px", color: "#ffffff", textAlign: "center" }}>
              <h2 style={{ color: "#ffffff", fontSize: "1.8rem", marginBottom: "8px", fontWeight: 800 }}>Ready to Grow Your Business Organically?</h2>
              <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.98rem", maxWidth: "560px", margin: "0 auto 20px", lineHeight: 1.6 }}>
                Connect with Abdullah Saleh for a comprehensive SEO audit and a customized organic growth roadmap.
              </p>
              <Link href="/contact" className="btn btn-lg" style={{ background: "#ffffff", color: "#0062d2", fontWeight: 700, border: "none", borderRadius: "4px", padding: "12px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Contact Abdullah Directly <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

