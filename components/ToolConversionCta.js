"use client";

import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function ToolConversionCta({
  title = "Ready for a Complete Hands-On Technical SEO Overhaul?",
  description = "Automated audit tools find symptoms — our dedicated SEO specialists fix root-cause architectural bottlenecks, build elite high-DR backlinks, and scale organic search revenue.",
  primaryButtonText = "Book Free Strategy Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore All SEO Services",
  secondaryButtonHref = "/services",
  badge = "🚀 Take Action On Your Audit"
}) {
  const cleanNumber = (siteSettings.whatsapp_number || "+8801670769816").replace(/[^\d]/g, "");

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderRadius: "4px",
        padding: "36px 32px",
        color: "#ffffff",
        border: "1px solid #334155",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
        margin: "40px 0"
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            padding: "4px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#38bdf8",
            marginBottom: "14px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}
        >
          {badge}
        </div>

        <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", margin: "0 0 12px 0", lineHeight: 1.3 }}>
          {title}
        </h3>

        <p style={{ fontSize: "15px", color: "#cbd5e1", lineHeight: 1.6, margin: "0 0 24px 0" }}>
          {description}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href={primaryButtonHref}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
              transition: "transform 0.15s ease"
            }}
          >
            <i className="fa-solid fa-calendar-check"></i> {primaryButtonText}
          </Link>

          <a
            href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hi Abdullah, I ran a check on your SEO tool and would like to discuss professional SEO implementation.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              padding: "12px 22px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(34, 197, 94, 0.3)"
            }}
          >
            <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
          </a>

          <Link
            href={secondaryButtonHref}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            {secondaryButtonText} <i className="fa-solid fa-arrow-right" style={{ fontSize: "12px" }}></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
