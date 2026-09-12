"use client";

import { useState } from "react";

export default function ToolFaqAccordion({ faqs = [], title = "Frequently Asked Questions (FAQ)" }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q || f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a || f.answer,
      },
    })),
  };

  return (
    <section className="tool-faq-section" style={{ margin: "48px 0 32px" }}>
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#4361ee", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", marginBottom: "6px" }}>
            <i className="fa-solid fa-circle-question" style={{ marginRight: "6px" }}></i> Expert Help &amp; Insights
          </span>
          <h3 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            {title}
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const q = faq.q || faq.question;
            const a = faq.a || faq.answer;

            return (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: isOpen ? "1.5px solid #4361ee" : "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  boxShadow: isOpen ? "0 4px 14px rgba(67, 97, 238, 0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: isOpen ? "#f8fafc" : "#ffffff",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "14px",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: isOpen ? "#4361ee" : "#0f172a" }}>
                    {q}
                  </span>
                  <i
                    className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
                    style={{ color: isOpen ? "#4361ee" : "#94a3b8", fontSize: "0.9rem", flexShrink: 0 }}
                  ></i>
                </button>

                {isOpen && (
                  <div style={{ padding: "16px 20px 20px", color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, borderTop: "1px solid #f1f5f9" }}>
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
