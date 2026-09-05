"use client";

import Link from "next/link";
import { siteSettings, testimonials, services } from "@/lib/data";

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "40px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Main 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }}>
          
          {/* Left Sticky Sidebar: Table of Contents */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <nav style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.04)" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                <li>
                  <a href="#vision" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", background: "#eff6ff", textDecoration: "none" }}>
                    <i className="fa-regular fa-eye" style={{ width: "16px" }}></i>
                    <span>One Business System</span>
                  </a>
                </li>
                <li>
                  <a href="#methodology" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-diagram-project" style={{ width: "16px" }}></i>
                    <span>Methodology</span>
                  </a>
                </li>
                <li>
                  <a href="#leadership" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-regular fa-user" style={{ width: "16px" }}></i>
                    <span>Leadership</span>
                  </a>
                </li>
                <li>
                  <a href="#why-us" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-circle-check" style={{ width: "16px" }}></i>
                    <span>Why Me?</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-regular fa-star" style={{ width: "16px" }}></i>
                    <span>Testimonials</span>
                  </a>
                </li>
                <li>
                  <a href="#services" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
                    <i className="fa-solid fa-layer-group" style={{ width: "16px" }}></i>
                    <span>Service Expertise</span>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Right Column: Main Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            
            {/* Page Hero Header */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.25, marginBottom: "16px" }}>
                I Build Revenue Systems for Businesses That Need to Move Faster
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.65, maxWidth: "780px", margin: "0 auto" }}>
                The market is getting harder: ad costs rise, attention drops, customers expect fast answers, and manual work slows good businesses down.
                <br /><br />
                I help businesses turn marketing, websites, lead capture, sales follow-up, and operations into connected systems. My work combines advanced technical SEO, web development, AI automation, paid acquisition, and conversion optimization built around the numbers that matter.
              </p>
            </div>

            {/* Section 1: Vision */}
            <section id="vision">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "9999px", fontSize: "0.88rem", fontWeight: 700, color: "#1e40af", marginBottom: "16px" }}>
                <i className="fa-regular fa-eye" style={{ color: "#2563eb" }}></i>
                One Business System, Not Five Disconnected Tools
              </div>

              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "28px 32px", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.04)" }}>
                <p style={{ color: "#334155", fontSize: "0.98rem", lineHeight: 1.7, margin: 0 }}>
                  Most businesses do not need another isolated website, ad campaign, chatbot, or dashboard. They need the full customer journey to work together.
                  <br /><br />
                  I connect organic acquisition, high-converting pages, CRM workflows, AI automation, tracking, and follow-up so that every visitor has a clear path to become a lead, client, or booked consultation.
                </p>
              </div>
            </section>

            {/* Section 2: Methodology */}
            <section id="methodology">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "9999px", fontSize: "0.88rem", fontWeight: 700, color: "#1e40af", marginBottom: "16px" }}>
                <i className="fa-solid fa-diagram-project" style={{ color: "#2563eb" }}></i>
                Build the System Around the Bottleneck
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eef2ff", color: "#4361ee", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-rocket"></i>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Measure Before Making Noise</h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    I review search traffic sources, crawl performance, lead flow, website behavior, conversion points, operational delays, and existing analytics before recommending a solution.
                  </p>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eef2ff", color: "#4361ee", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Build for Real Customer Behaviour</h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    A system only works when customers understand what to do next. Every page, ad, form, message, booking flow, and automation is designed around real buyer intent and behavior.
                  </p>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eef2ff", color: "#4361ee", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Automate Repetitive Work</h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    I use AI and automation to handle lead capture, source tagging, routing, reminders, follow-up, task creation, support responses, and reporting without removing human control.
                  </p>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eef2ff", color: "#4361ee", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Improve From Evidence</h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    I use real Search Console data, user activity, lead data, workflow enrolment, cost per result, and conversion signals to continuously improve what is already working.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Leadership */}
            <section id="leadership">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "9999px", fontSize: "0.88rem", fontWeight: 700, color: "#1e40af", marginBottom: "16px" }}>
                <i className="fa-regular fa-user" style={{ color: "#2563eb" }}></i>
                Leadership
              </div>

              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "28px 32px", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>
                  <img 
                    src="/images/abdullah.jpg" 
                    alt={siteSettings.expert_name} 
                    style={{ width: "160px", height: "190px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0", flexShrink: 0 }} 
                  />
                  <div>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      {siteSettings.expert_name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "14px" }}>
                      REVENUE SYSTEMS BUILDER · TECHNICAL SEO · DIGITAL MARKETING
                    </p>
                    <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                      With 10+ years of experience across international markets, I combine digital marketing, web development, and AI automation to build systems that support scalable revenue growth. I have delivered everything from enterprise SEO recoveries to custom AI workflows and conversion-led web applications.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Why Me? */}
            <section id="why-us">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #dbeafe", padding: "6px 14px", borderRadius: "9999px", fontSize: "0.88rem", fontWeight: 700, color: "#1e40af", marginBottom: "16px" }}>
                <i className="fa-solid fa-circle-check" style={{ color: "#2563eb" }}></i>
                Why Me?
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>One Owner Across the Journey</h4>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>You get one person who understands the ad, the landing page, the form, the CRM, the automation, the tracking, and the customer&apos;s next step.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Cost-Efficient by Design</h4>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>I use the right level of technology for the problem to reduce wasted spend, manual work, and duplicated agency layers.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <i className="fa-solid fa-rocket"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>World-Class Tools, Practical Delivery</h4>
                      <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>I work with platforms and technologies used by growth-focused businesses worldwide: Meta, Google, GA4, GTM, Next.js, APIs, AI automations, and cloud systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Box */}
            <div style={{ background: "linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)", borderRadius: "8px", padding: "36px", color: "#ffffff", textAlign: "center" }}>
              <h2 style={{ color: "#ffffff", fontSize: "1.8rem", marginBottom: "8px" }}>Ready to Build Your Growth System?</h2>
              <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.98rem", maxWidth: "560px", margin: "0 auto 20px" }}>
                Send your domain details for a complimentary diagnostic audit and clear strategic recommendations.
              </p>
              <Link href="/contact" className="btn btn-lg btn-aqua-solid">
                Contact Abdullah Directly <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
