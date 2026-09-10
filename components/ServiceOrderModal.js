"use client";
// components/ServiceOrderModal.js - Interactive Client Order & Inquiry Modal with Email Dispatch

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function ServiceOrderModal({ isOpen, onClose, service, selectedPackage, initialPackage }) {
  const pkg = selectedPackage || initialPackage;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website_url: "",
    target_keywords: "",
    client_notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !service || !pkg) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          website_url: formData.website_url,
          target_keywords: formData.target_keywords,
          client_notes: formData.client_notes,
          service_id: service.id,
          service_title: service.title,
          package_name: pkg.name,
          price: pkg.price || service.starting_price || 0,
          total: pkg.price || service.starting_price || 0
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error occurred. Please try again or message on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setSubmitted(false);
    setErrorMsg("");
    onClose();
  };

  const whatsappMsg = encodeURIComponent(
    `Hi Abdullah, I just submitted an order inquiry for the "${pkg.name}" package on "${service.title}" ($${pkg.price}) for my website: ${formData.website_url || "my website"}. My name is ${formData.name || "a client"}.`
  );

  return (
    <div className="order-modal-backdrop active" onClick={handleModalClose} style={{ zIndex: 9999 }}>
      <div 
        className="order-modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: "560px", 
          maxHeight: "90vh", 
          overflowY: "auto", 
          borderRadius: "12px", 
          padding: "30px 28px",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.25)"
        }}
      >
        <button 
          type="button" 
          className="order-modal-close" 
          onClick={handleModalClose} 
          aria-label="Close modal"
          style={{ position: "absolute", top: "18px", right: "20px", background: "none", border: "none", fontSize: "1.2rem", color: "#64748b", cursor: "pointer" }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* MODAL HEADER WITH PACKAGE BADGE */}
        <div className="order-modal-header" style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "16px", marginBottom: "20px" }}>
          <div style={{ display: "inline-block", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", color: "#4361ee", background: "#eef2ff", padding: "3px 10px", borderRadius: "4px", letterSpacing: "0.04em", marginBottom: "6px" }}>
            Service Inquiry &amp; Order
          </div>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 6px" }}>{service.title}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#475569", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{pkg.name}</span> &bull;{" "}
            <span style={{ color: "#16a34a", fontWeight: 800, fontSize: "1.05rem" }}>${pkg.price}</span>
            {pkg.delivery_days && (
              <> &bull; <span style={{ color: "#64748b" }}><i className="fa-regular fa-clock" style={{ marginRight: "4px" }}></i>{pkg.delivery_days} Days Delivery</span></>
            )}
          </div>
        </div>

        {/* SUCCESS CONFIRMATION VIEW */}
        {submitted ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Order Inquiry Received!</h4>
            <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Thank you, <strong>{formData.name}</strong>! Your order details for <strong>{pkg.name}</strong> have been emailed directly to Abdullah Saleh. We will review your domain and respond within 24 hours.
            </p>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px 18px", textAlign: "left", fontSize: "0.85rem", marginBottom: "24px", color: "#334155" }}>
              <div><strong>Website:</strong> {formData.website_url}</div>
              <div style={{ marginTop: "4px" }}><strong>Email:</strong> {formData.email}</div>
              <div style={{ marginTop: "4px" }}><strong>Phone / WhatsApp:</strong> {formData.phone || "N/A"}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`https://wa.me/8801670769816?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-lg btn-blue-solid btn-block"
                style={{ borderRadius: "6px", fontSize: "0.95rem" }}
              >
                <i className="fa-brands fa-whatsapp" style={{ marginRight: "8px" }}></i>
                Instant Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={handleModalClose}
                className="btn btn-outline-blue btn-block"
                style={{ borderRadius: "6px", fontSize: "0.9rem" }}
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          /* ORDER INTAKE FORM */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem" }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "6px" }}></i>
                {errorMsg}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group-clean">
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px", textTransform: "uppercase" }}>
                  Your Full Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="digi-input"
                  style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                />
              </div>

              <div className="form-group-clean">
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px", textTransform: "uppercase" }}>
                  Email Address <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="digi-input"
                  style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group-clean">
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px", textTransform: "uppercase" }}>
                  Phone / WhatsApp <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+880 17XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="digi-input"
                  style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                />
              </div>

              <div className="form-group-clean">
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px", textTransform: "uppercase" }}>
                  Target Website URL <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="url"
                  name="website_url"
                  required
                  placeholder="https://yourwebsite.com"
                  value={formData.website_url}
                  onChange={handleChange}
                  className="digi-input"
                  style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                />
              </div>
            </div>

            <div className="form-group-clean">
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px", textTransform: "uppercase" }}>
                Target Keywords / Main Objective (Optional)
              </label>
              <input
                type="text"
                name="target_keywords"
                placeholder="e.g. ecommerce seo, local plumber, keyword rankings"
                value={formData.target_keywords}
                onChange={handleChange}
                className="digi-input"
                style={{ padding: "10px 14px", fontSize: "0.88rem" }}
              />
            </div>

            <div className="form-group-clean">
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: "4px", textTransform: "uppercase" }}>
                Project Notes / Specific Needs (Optional)
              </label>
              <textarea
                name="client_notes"
                rows={2}
                placeholder="Share any details about your website, previous penalties, or target deadlines..."
                value={formData.client_notes}
                onChange={handleChange}
                className="digi-input"
                style={{ padding: "10px 14px", fontSize: "0.88rem", resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-lg btn-blue-solid btn-block"
              style={{ borderRadius: "6px", fontSize: "1rem", marginTop: "6px", padding: "12px" }}
            >
              {submitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                  Sending Inquiry &amp; Email...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" style={{ marginRight: "8px" }}></i>
                  Submit Order Inquiry
                </>
              )}
            </button>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
              <span><i className="fa-solid fa-lock" style={{ color: "#10b981" }}></i> 100% Confidential</span>
              <span>&bull;</span>
              <span><i className="fa-solid fa-envelope-circle-check" style={{ color: "#4361ee" }}></i> Direct Email to Expert</span>
              <span>&bull;</span>
              <span><i className="fa-solid fa-bolt" style={{ color: "#f59e0b" }}></i> Fast Response</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
