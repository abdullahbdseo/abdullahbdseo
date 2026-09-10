"use client";
// components/ServiceOrderModal.js - Service Inquiry Modal (Contact-based)

import Link from "next/link";

export default function ServiceOrderModal({ isOpen, onClose, service, selectedPackage, initialPackage }) {
  const pkg = selectedPackage || initialPackage;

  if (!isOpen || !service || !pkg) return null;

  const whatsappMsg = encodeURIComponent(
    `Hi Abdullah, I'm interested in the "${pkg.name}" package for "${service.title}" ($${pkg.price}). Please get in touch.`
  );

  return (
    <div className="order-modal-backdrop active" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="order-modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="order-modal-header">
          <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "#4361ee", letterSpacing: "0.05em", marginBottom: "2px" }}>
            Get Started
          </div>
          <h3>{service.title}</h3>
          <div className="order-modal-pkg-summary">
            <i className="fa-solid fa-box-open"></i>
            <span>{pkg.name}</span> &bull;{" "}
            <span style={{ color: "#10b981" }}>${pkg.price}</span> &bull;{" "}
            <span style={{ color: "#64748b", fontWeight: 500 }}>{pkg.delivery_days} Days Delivery</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Ready to get started? Contact Abdullah directly to discuss your project requirements and receive a customized proposal.
          </p>

          <a
            href={`https://wa.me/8801670769816?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lg btn-blue-solid btn-block"
            style={{ borderRadius: "6px", fontSize: "1rem", textAlign: "center" }}
          >
            <i className="fa-brands fa-whatsapp" style={{ marginRight: "8px" }}></i>
            Chat on WhatsApp
          </a>

          <Link
            href="/contact"
            onClick={onClose}
            className="btn btn-lg btn-outline-blue btn-block"
            style={{ borderRadius: "6px", fontSize: "1rem", textAlign: "center" }}
          >
            <i className="fa-solid fa-envelope" style={{ marginRight: "8px" }}></i>
            Send a Message
          </Link>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
            <span><i className="fa-solid fa-clock" style={{ color: "#4361ee" }}></i> Fast Response</span>
            <span>&bull;</span>
            <span><i className="fa-solid fa-shield-halved" style={{ color: "#10b981" }}></i> Free Consultation</span>
            <span>&bull;</span>
            <span><i className="fa-solid fa-star" style={{ color: "#f59e0b" }}></i> 100% Satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
