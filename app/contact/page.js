"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    service_interest: "Technical SEO Audit",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          website: "",
          phone: "",
          service_interest: "Technical SEO Audit",
          message: ""
        });
      } else {
        setError(data.error || "Failed to submit message");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Hero Header */}
      <section className="digi-hero-section" style={{ padding: "50px 0 35px", textAlign: "center" }}>
        <div className="container">
          <span className="text-blue" style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Direct Access
          </span>
          <h1 style={{ fontSize: "2.8rem", margin: "10px 0 14px", fontWeight: 800 }}>
            Let&apos;s Build Your Search Growth
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--digi-text-body)", maxWidth: "620px", margin: "0 auto", lineHeight: 1.6 }}>
            Have a project in mind or need a custom technical roadmap? Send your domain details below for a forensic SEO diagnostic.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="contact-page-section" style={{ backgroundColor: "#f8fafc", padding: "50px 0 80px" }}>
        <div className="container">
          <div className="contact-layout-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.18fr", gap: "32px", maxWidth: "1120px", margin: "0 auto", alignItems: "start" }}>
            
            {/* Left Column: Contact Details & Perks */}
            <div className="contact-left-column" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              {/* Contact Details Box */}
              <div className="contact-details-box" style={{ background: "linear-gradient(180deg, #edf6ff 0%, #f4f9ff 100%)", border: "1px solid #dbeafe", borderRadius: "8px", padding: "28px 24px", boxShadow: "0 4px 20px -2px rgba(2, 132, 199, 0.06)" }}>
                <h2 className="contact-details-heading" style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: "0 0 24px 0", letterSpacing: "-0.01em" }}>
                  Contact Information
                </h2>

                <div className="contact-meta-group" style={{ marginBottom: "22px" }}>
                  <span className="contact-meta-label" style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.06em", marginBottom: "5px", display: "block" }}>
                    Expert &amp; Strategist
                  </span>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                    {siteSettings.expert_name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    {siteSettings.expert_title}
                  </div>
                </div>

                <div className="contact-meta-group" style={{ marginBottom: "22px" }}>
                  <span className="contact-meta-label" style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.06em", marginBottom: "5px", display: "block" }}>
                    Primary Email
                  </span>
                  <a href={`mailto:${siteSettings.contact_email}`} className="contact-meta-email" style={{ fontSize: "1.12rem", fontWeight: 700, color: "#0284c7", textDecoration: "none", wordBreak: "break-all" }}>
                    {siteSettings.contact_email}
                  </a>
                </div>

                <div className="contact-meta-group" style={{ marginBottom: "22px" }}>
                  <span className="contact-meta-label" style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.06em", marginBottom: "5px", display: "block" }}>
                    WhatsApp Direct
                  </span>
                  <a href={`https://wa.me/${siteSettings.whatsapp_number}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#16a34a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-brands fa-whatsapp"></i> {siteSettings.contact_phone}
                  </a>
                </div>

                <div className="contact-meta-group" style={{ marginBottom: "0" }}>
                  <span className="contact-meta-label" style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.06em", marginBottom: "5px", display: "block" }}>
                    Response Time
                  </span>
                  <span className="contact-meta-hours" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1e293b", display: "inline-block" }}>
                    {siteSettings.working_hours}
                  </span>
                </div>
              </div>

              {/* Perk 1 */}
              <div className="contact-perk-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "rgba(22, 163, 74, 0.1)", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>100% White-Hat Security</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b" }}>All optimizations strictly follow Google Search Essentials guidelines.</div>
                </div>
              </div>

              {/* Perk 2 */}
              <div className="contact-perk-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>24-Hour Forensic Turnaround</div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b" }}>We inspect your domain before our initial strategy response.</div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "32px", boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)" }}>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                  Request SEO Analysis
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b" }}>
                  Fill out the form below and we will get back to you promptly.
                </p>
              </div>

              {success && (
                <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", color: "#15803d", padding: "14px 18px", borderRadius: "6px", marginBottom: "20px", fontSize: "0.88rem" }}>
                  <strong><i className="fa-solid fa-circle-check"></i> Inquiry Received!</strong>
                  <p style={{ margin: "4px 0 0" }}>Thank you. We have received your request and will review your website within 24 hours.</p>
                </div>
              )}

              {error && (
                <div style={{ background: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", padding: "14px 18px", borderRadius: "6px", marginBottom: "20px", fontSize: "0.88rem" }}>
                  <strong><i className="fa-solid fa-triangle-exclamation"></i> Error:</strong> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                    Your Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    className="digi-input" 
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                    Email Address <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    className="digi-input" 
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Website URL
                    </label>
                    <input 
                      type="url" 
                      className="digi-input" 
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Phone / WhatsApp
                    </label>
                    <input 
                      type="tel" 
                      className="digi-input" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                    Service Interest
                  </label>
                  <select 
                    className="digi-input"
                    value={formData.service_interest}
                    onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                  >
                    <option value="Technical SEO Audit">Comprehensive Technical SEO Audit</option>
                    <option value="On-Page & Keyword Strategy">On-Page &amp; Keyword Strategy</option>
                    <option value="Monthly Growth Retainer">Monthly Growth Retainer</option>
                    <option value="E-Commerce Store Optimization">E-Commerce Store Optimization</option>
                    <option value="Link Building & Digital PR">High-Authority Link Building</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                    Project Goals &amp; Challenges
                  </label>
                  <textarea 
                    rows={4} 
                    className="digi-input" 
                    placeholder="Tell us about your target keywords, recent ranking drops, or revenue goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-lg btn-blue-solid btn-block"
                  style={{ marginTop: "8px" }}
                >
                  {loading ? (
                    <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
                  ) : (
                    <>Send Request <i className="fa-solid fa-paper-plane" style={{ marginLeft: "6px" }}></i></>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
