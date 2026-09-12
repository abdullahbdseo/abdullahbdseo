"use client";

import { useState, useEffect } from "react";

export default function StickyTableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      let currentActive = headings[0]?.id || "";

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          currentActive = headings[i].id;
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="article-toc-box" style={{
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
      position: "sticky",
      top: "90px"
    }}>
      <div className="article-toc-header" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.92rem",
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: "14px",
        paddingBottom: "10px",
        borderBottom: "1px solid #f1f5f9"
      }}>
        <i className="fa-solid fa-list-ul" style={{ color: "#2563eb" }}></i>
        <span>Table of Contents</span>
      </div>

      <ul className="article-toc-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <li key={i} style={{ paddingLeft: h.level === 3 ? "14px" : "0" }}>
              <a
                href={`#${h.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: h.level === 3 ? "0.82rem" : "0.86rem",
                  color: isActive ? "#2563eb" : "#475569",
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: "none",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: isActive ? "#eff6ff" : "transparent",
                  transition: "all 0.2s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(h.id);
                  if (target) {
                    const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                <i
                  className={h.level === 3 ? "fa-solid fa-angle-right" : "fa-solid fa-hashtag"}
                  style={{
                    fontSize: "0.75rem",
                    color: isActive ? "#2563eb" : "#94a3b8",
                    opacity: isActive ? 1 : 0.6
                  }}
                ></i>
                <span style={{ lineHeight: 1.4 }}>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
