"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service_interest: "General Project Inquiry"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
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

  const whatsappRaw = (siteSettings.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "");

  return (
    <div className="contact-page-wrapper" style={{ backgroundColor: "#f8fafc", minHeight: "calc(100vh - 120px)", padding: "50px 0 80px" }}>
      <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
        
        <div 
          className="contact-layout-grid" 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1.15fr", 
            gap: "32px", 
            alignItems: "start" 
          }}
        >
          
          {/* =========================================================
               LEFT COLUMN: Contact Details Card + 3 Assurance Cards
             ========================================================= */}
          <div className="contact-left-column" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            
            {/* Top Contact Details Card */}
            <div 
              className="contact-details-box" 
              style={{ 
                background: "linear-gradient(180deg, #edf6ff 0%, #f4f9ff 100%)", 
                border: "1px solid #dbeafe", 
                borderRadius: "6px", 
                padding: "26px 22px", 
                boxShadow: "0 4px 20px -2px rgba(2, 132, 199, 0.05)" 
              }}
            >
              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: "0 0 18px 0", letterSpacing: "-0.01em", fontFamily: "var(--font-heading, inherit)" }}>
                Contact Details
              </h2>

              {/* Email */}
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.06em", marginBottom: "4px", display: "block" }}>
                  EMAIL
                </span>
                <a 
                  href={`mailto:${siteSettings.contact_email}`} 
                  style={{ fontSize: "1.08rem", fontWeight: 700, color: "#0062d2", textDecoration: "none", wordBreak: "break-all" }}
                >
                  {siteSettings.contact_email}
                </a>
              </div>

              {/* Business Hours */}
              <div style={{ marginBottom: "18px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.06em", marginBottom: "4px", display: "block" }}>
                  BUSINESS HOURS
                </span>
                <div style={{ fontSize: "1.02rem", fontWeight: 600, color: "#1e293b" }}>
                  Global 12-Hour Service
                </div>
              </div>

              {/* Embedded WhatsApp Card */}
              <div 
                style={{ 
                  background: "#ffffff", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "6px", 
                  padding: "10px 14px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  gap: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div 
                    style={{ 
                      width: "34px", 
                      height: "34px", 
                      borderRadius: "4px", 
                      background: "#e8faf0", 
                      border: "1px solid #d1fae5", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      flexShrink: 0 
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C7.02944 3 3 6.80558 3 11.5C3 13.3444 3.63588 15.0538 4.72147 16.4442L3.65685 20.1716C3.49397 20.7417 4.02058 21.2464 4.58284 21.0589L8.71887 19.6802C9.74233 20.1384 10.849 20.3889 12 20.3889C16.9706 20.3889 21 16.5833 21 11.8889C21 7.19442 16.9706 3 12 3Z" fill="#10B981" />
                      <path d="M12 7.5V12M12 15V15.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap" }}>
                    Prefer WhatsApp?
                  </span>
                </div>

                <a 
                  href={`https://wa.me/${whatsappRaw}?text=Hello%20Abdullah%2C%20I%20would%20like%20to%20discuss%20an%20SEO%20project.`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    background: "#00b365", 
                    color: "#ffffff", 
                    padding: "8px 14px", 
                    borderRadius: "4px", 
                    fontWeight: 700, 
                    fontSize: "0.85rem", 
                    textDecoration: "none", 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "6px", 
                    boxShadow: "0 2px 8px rgba(0, 179, 101, 0.22)",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#009c58"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#00b365"}
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: "1rem" }}></i>
                  <span>Chat on WhatsApp</span>
                  <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>&rarr;</span>
                </a>
              </div>

            </div>

            {/* Assurance Card 1: Direct Response */}
            <div 
              style={{ 
                background: "#ffffff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "6px", 
                padding: "14px 18px", 
                display: "flex", 
                alignItems: "center", 
                gap: "14px", 
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)" 
              }}
            >
              <div 
                style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "4px", 
                  background: "#eff6ff", 
                  border: "1px solid #dbeafe",
                  color: "#0062d2", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "1rem", 
                  flexShrink: 0 
                }}
              >
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a", marginBottom: "2px" }}>
                  Direct Response
                </div>
                <div style={{ fontSize: "0.83rem", color: "#64748b", lineHeight: 1.4 }}>
                  A real reply from a real person &mdash; no automated queue.
                </div>
              </div>
            </div>

            {/* Assurance Card 2: Free Consultation */}
            <div 
              style={{ 
                background: "#ffffff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "6px", 
                padding: "14px 18px", 
                display: "flex", 
                alignItems: "center", 
                gap: "14px", 
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)" 
              }}
            >
              <div 
                style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "4px", 
                  background: "#eff6ff", 
                  border: "1px solid #dbeafe",
                  color: "#0062d2", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "1rem", 
                  flexShrink: 0 
                }}
              >
                <i className="fa-solid fa-circle-exclamation"></i>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a", marginBottom: "2px" }}>
                  Free Consultation
                </div>
                <div style={{ fontSize: "0.83rem", color: "#64748b", lineHeight: 1.4 }}>
                  Your first conversation with us costs nothing.
                </div>
              </div>
            </div>

            {/* Assurance Card 3: Clear Next Steps */}
            <div 
              style={{ 
                background: "#ffffff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "6px", 
                padding: "14px 18px", 
                display: "flex", 
                alignItems: "center", 
                gap: "14px", 
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)" 
              }}
            >
              <div 
                style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "4px", 
                  background: "#eff6ff", 
                  border: "1px solid #dbeafe",
                  color: "#0062d2", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "1rem", 
                  flexShrink: 0 
                }}
              >
                <i className="fa-solid fa-arrow-trend-up"></i>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a", marginBottom: "2px" }}>
                  Clear Next Steps
                </div>
                <div style={{ fontSize: "0.83rem", color: "#64748b", lineHeight: 1.4 }}>
                  You&apos;ll know exactly what happens after you reach out.
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================
               RIGHT COLUMN: "Ready to Start Your Project?" Form Card
             ========================================================= */}
          <div 
            className="contact-form-card" 
            style={{ 
              background: "#ffffff", 
              border: "1px solid #e2e8f0", 
              borderRadius: "6px", 
              padding: "32px 28px 24px", 
              boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)" 
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", letterSpacing: "-0.015em", fontFamily: "var(--font-heading, inherit)" }}>
                Ready to Start Your Project?
              </h1>
              <p style={{ fontSize: "0.92rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Tell me what you need help with. I usually reply within 24 hours.
              </p>
            </div>

            {success && (
              <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", color: "#15803d", padding: "12px 16px", borderRadius: "4px", marginBottom: "18px", fontSize: "0.88rem" }}>
                <strong><i className="fa-solid fa-circle-check"></i> Inquiry Received!</strong>
                <p style={{ margin: "4px 0 0" }}>Thank you. We have received your request and will review your website within 24 hours.</p>
              </div>
            )}

            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", padding: "12px 16px", borderRadius: "4px", marginBottom: "18px", fontSize: "0.88rem" }}>
                <strong><i className="fa-solid fa-triangle-exclamation"></i> Error:</strong> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              {/* Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "#1e293b", marginBottom: "5px" }}>
                  Full Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 13px",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0062d2";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 98, 210, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#cbd5e1";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "#1e293b", marginBottom: "5px" }}>
                  Email Address <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 13px",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0062d2";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 98, 210, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#cbd5e1";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* WhatsApp Number (Optional) */}
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "#1e293b", marginBottom: "5px" }}>
                  WhatsApp Number <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: "0.82rem" }}>(Optional)</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="+880 1XXX-XXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 13px",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0062d2";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 98, 210, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#cbd5e1";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "#1e293b", marginBottom: "5px" }}>
                  Message <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Tell me about your website, automation, or marketing project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 13px",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: 1.5
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0062d2";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 98, 210, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#cbd5e1";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  width: "100%",
                  padding: "12px 20px",
                  background: "#0062d2",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(0, 98, 210, 0.25)",
                  transition: "all 0.2s ease",
                  marginTop: "4px",
                  marginBottom: "6px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0050ab";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 98, 210, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0062d2";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 98, 210, 0.25)";
                }}
              >
                {loading ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
                ) : (
                  <>Submit your response &rarr;</>
                )}
              </button>

              {/* Trust Badges */}
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "18px", 
                  flexWrap: "wrap",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  color: "#334155"
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2" }}></i> Direct Response
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2" }}></i> Free Initial Consultation
                </span>
              </div>

              {/* Privacy Disclaimer */}
              <p style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center", margin: 0 }}>
                By submitting, you agree to our <Link href="/privacy-policy" style={{ color: "#1e293b", textDecoration: "underline", fontWeight: 500 }}>Privacy Policy</Link>.
              </p>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
