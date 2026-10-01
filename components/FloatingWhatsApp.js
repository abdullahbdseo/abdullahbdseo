"use client";

import { useState } from "react";
import { siteSettings } from "@/lib/data";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const cleanNumber = (siteSettings.whatsapp_number || "+8801670769816").replace(/[^\d]/g, "");

  const quickTopics = [
    { label: "🚀 Free Website Audit Consultation", text: "Hi Abdullah, I would like to request a free SEO audit consultation for my website." },
    { label: "🔗 High DA Backlink Packages", text: "Hi Abdullah, I am interested in your High-DA Authority Backlink packages." },
    { label: "📈 Custom Monthly SEO Plan", text: "Hi Abdullah, I'd like to discuss a custom monthly SEO strategy for my business." },
  ];

  const handleOpenWhatsApp = (customText) => {
    const message = encodeURIComponent(customText || "Hi Abdullah, I am visiting your website and would like to discuss SEO services.");
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1050, fontFamily: "inherit" }}>
      {/* Expanded Quick Message Card */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            right: "0",
            width: "300px",
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
            padding: "16px",
            boxSizing: "border-box",
            animation: "fadeIn 0.2s ease-in-out"
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#25D366", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{siteSettings.site_name}</div>
                <div style={{ fontSize: "11px", color: "#16a34a", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block" }}></span> Online · Quick Response
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "14px" }}
              aria-label="Close WhatsApp card"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 12px 0", lineHeight: 1.4 }}>
            Direct message on WhatsApp for instant SEO audits, pricing inquiries, or technical consultation.
          </p>

          {/* Quick Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
            {quickTopics.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleOpenWhatsApp(item.text)}
                style={{
                  textAlign: "left",
                  fontSize: "12px",
                  padding: "8px 10px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  color: "#334155",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct Chat Button */}
          <button
            type="button"
            onClick={() => handleOpenWhatsApp()}
            style={{
              width: "100%",
              backgroundColor: "#25D366",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              padding: "9px 14px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
          >
            <i className="fa-brands fa-whatsapp"></i> Start WhatsApp Chat
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "4px",
          backgroundColor: "#25D366",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          transition: "transform 0.2s ease, background-color 0.2s"
        }}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-brands fa-whatsapp"}></i>
      </button>
    </div>
  );
}
