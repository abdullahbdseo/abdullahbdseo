"use client";

import { useState } from "react";

export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? (url || window.location.href) : "https://abdullahbdseo.vercel.app";
  const shareTitle = title || "SEO & AI Growth Strategies by Abdullah";

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      color: "#25D366",
      bg: "#dcfce7",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " - " + fullUrl)}`
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      color: "#0A66C2",
      bg: "#e0f2fe",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
    },
    {
      name: "Twitter / X",
      icon: "fa-brands fa-x-twitter",
      color: "#0f172a",
      bg: "#f1f5f9",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: "Facebook",
      icon: "fa-brands fa-facebook-f",
      color: "#1877F2",
      bg: "#dbeafe",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    }
  ];

  return (
    <div className="social-share-widget" style={{
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "16px 20px",
      margin: "24px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "14px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2563eb",
          fontSize: "0.95rem"
        }}>
          <i className="fa-solid fa-share-nodes"></i>
        </div>
        <div>
          <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a", display: "block" }}>
            Share this Guide / Tool
          </span>
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
            Help colleagues & business owners scale their organic rankings
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${item.name}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: item.bg,
              color: item.color,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <i className={item.icon}></i>
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopy}
          title="Copy Link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            height: "36px",
            padding: "0 14px",
            borderRadius: "8px",
            background: copied ? "#dcfce7" : "#ffffff",
            color: copied ? "#166534" : "#334155",
            border: copied ? "1px solid #86efac" : "1px solid #cbd5e1",
            fontSize: "0.84rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          <i className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
          <span>{copied ? "Link Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}
