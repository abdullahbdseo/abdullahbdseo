"use client";
// components/ServiceOrderModal.js - Interactive Package Order Modal

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function ServiceOrderModal({ isOpen, onClose, service, selectedPackage }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website_url: "",
    target_country: "Global",
    target_keywords: "",
    client_notes: ""
  });

  if (!isOpen || !service || !selectedPackage) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: service.id,
          service_title: service.title,
          package_id: selectedPackage.id,
          package_name: selectedPackage.name,
          subtotal: selectedPackage.price,
          total: selectedPackage.price,
          ...formData
        })
      });

      const data = await res.json();
      if (data.success && data.order) {
        onClose();
        router.push(`/checkout/${data.order.id}`);
      } else {
        alert(data.message || "Failed to create order. Please try again.");
      }
    } catch (err) {
      alert("Error creating order. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-modal-backdrop active" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="order-modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="order-modal-header">
          <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#4361ee", letterSpacing: "0.05em", marginBottom: "2px" }}>
            Checkout Configuration
          </div>
          <h3>{service.title}</h3>
          <div className="order-modal-pkg-summary">
            <i className="fa-solid fa-box-open"></i>
            <span>{selectedPackage.name}</span> &bull; 
            <span style={{ color: "#10b981" }}>{formatCurrency(selectedPackage.price)}</span> &bull; 
            <span style={{ color: "#64748b", fontWeight: 500 }}>{selectedPackage.delivery_days} Days Delivery</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Website URL */}
            <div>
              <label className="order-form-label">Target Website / Domain URL <span style={{ color: "#ef4444" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                  <i className="fa-solid fa-globe"></i>
                </span>
                <input 
                  type="url" 
                  className="digi-input" 
                  style={{ paddingLeft: "40px" }} 
                  placeholder="https://yourwebsite.com" 
                  required
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                />
              </div>
            </div>

            {/* Target Country & Keywords */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label className="order-form-label">Target Market / Country</label>
                <select 
                  className="digi-input"
                  value={formData.target_country}
                  onChange={(e) => setFormData({ ...formData, target_country: e.target.value })}
                >
                  <option value="Global">Global / International</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="European Union">European Union</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
              </div>

              <div>
                <label className="order-form-label">Target Keywords / Focus Area</label>
                <input 
                  type="text" 
                  className="digi-input" 
                  placeholder="e.g. saas, ecommerce, law firm"
                  value={formData.target_keywords}
                  onChange={(e) => setFormData({ ...formData, target_keywords: e.target.value })}
                />
              </div>
            </div>

            {/* Client Notes */}
            <div>
              <label className="order-form-label">Special Notes / Competitors</label>
              <textarea 
                className="digi-input" 
                rows={2} 
                placeholder="List top competitors or specific requirements..."
                value={formData.client_notes}
                onChange={(e) => setFormData({ ...formData, client_notes: e.target.value })}
              />
            </div>

            {/* Contact Details (No Password Required) */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "16px", marginTop: "4px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-user" style={{ color: "#4361ee" }}></i> Contact Information
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="order-form-label">Your Name <span style={{ color: "#ef4444" }}>*</span></label>
                  <input 
                    type="text" 
                    className="digi-input" 
                    placeholder="Full Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="order-form-label">Email Address <span style={{ color: "#ef4444" }}>*</span></label>
                  <input 
                    type="email" 
                    className="digi-input" 
                    placeholder="name@company.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-lg btn-blue-solid btn-block" 
              style={{ marginTop: "8px", borderRadius: "6px", fontSize: "1rem" }}
              disabled={loading}
            >
              {loading ? (
                <span><i className="fa-solid fa-spinner fa-spin"></i> Initializing Order...</span>
              ) : (
                <span><i className="fa-solid fa-lock" style={{ marginRight: "6px" }}></i> Proceed to Secure Checkout <i className="fa-solid fa-arrow-right"></i></span>
              )}
            </button>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
              <span><i className="fa-brands fa-bitcoin" style={{ color: "#f59e0b" }}></i> USDT &amp; Crypto</span>
              <span>&bull;</span>
              <span><i className="fa-solid fa-mobile-screen-button" style={{ color: "#e11d48" }}></i> bKash Instant</span>
              <span>&bull;</span>
              <span><i className="fa-solid fa-shield-halved" style={{ color: "#10b981" }}></i> 256-bit Encrypted</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
