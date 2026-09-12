"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 997,
        width: "44px",
        height: "44px",
        borderRadius: "6px",
        background: "linear-gradient(135deg, #0062d2, #2563eb)",
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0, 98, 210, 0.35)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        animation: "fadeIn 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 98, 210, 0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 98, 210, 0.35)";
      }}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
