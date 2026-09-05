"use client";
// components/QuoteModal.js - Interactive Quotation & Consultation Modal

import { useState } from "react";
import { siteSettings } from "@/lib/data";

export default function QuoteModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website_url: "",
    service_interested: "Comprehensive Technical SEO Audit",
    budget: "$500 - $1,500",
    message: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      alert("Error submitting proposal request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="digi-thankyou-modal-overlay active" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="digi-thankyou-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
        <button type="button" className="thankyou-close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div className="thankyou-icon-circle" style={{ margin: "0 auto 12px" }}>
                <div className="thankyou-icon-inner" style={{ background: "#4361ee" }}>
                  <i className="fa-solid fa-file-signature"></i>
                </div>
              </div>
              <h2 className="thankyou-title" style={{ fontSize: "1.6rem" }}>Request Custom Proposal</h2>
              <div className="thankyou-subtitle" style={{ fontSize: "0.88rem" }}>
                Direct consultation with <strong>{siteSettings.expert_name}</strong>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="order-form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="digi-input" 
                    required 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="order-form-label">Work Email *</label>
                  <input 
                    type="email" 
                    className="digi-input" 
                    required 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="order-form-label">Website URL *</label>
                <input 
                  type="url" 
                  className="digi-input" 
                  required 
                  placeholder="https://yourwebsite.com"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="order-form-label">Primary Service</label>
                  <select 
                    className="digi-input"
                    value={formData.service_interested}
                    onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                  >
                    <option>Technical SEO Audit</option>
                    <option>Keyword Topic Clustering</option>
                    <option>E-Commerce SEO</option>
                    <option>On-Page Optimization</option>
                    <option>Authority Link Building</option>
                    <option>Monthly SEO Retainer</option>
                  </select>
                </div>
                <div>
                  <label className="order-form-label">Estimated Budget</label>
                  <select 
                    className="digi-input"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option>$350 - $1,000</option>
                    <option>$1,000 - $3,000</option>
                    <option>$3,000 - $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="order-form-label">Project Objectives / Goals</label>
                <textarea 
                  className="digi-input" 
                  rows={2} 
                  placeholder="Tell us about your organic growth targets..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-blue-solid btn-block btn-lg" 
                style={{ borderRadius: "8px", marginTop: "4px" }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Send Proposal Request"}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div className="thankyou-icon-circle" style={{ margin: "0 auto 16px" }}>
              <div className="thankyou-icon-inner">
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
            <h2 className="thankyou-title">Thank You, {formData.name || "there"}!</h2>
            <div className="thankyou-subtitle">Inquiry Received Successfully</div>
            <p className="thankyou-desc" style={{ marginTop: "12px", color: "#475569" }}>
              <strong>{siteSettings.expert_name}</strong> and the technical team are reviewing your website details. You will receive a personalized growth roadmap within <strong>2–4 business hours</strong>.
            </p>
            <button type="button" className="btn btn-blue-solid" onClick={onClose} style={{ marginTop: "18px", borderRadius: "8px", padding: "10px 24px" }}>
              Got It
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
