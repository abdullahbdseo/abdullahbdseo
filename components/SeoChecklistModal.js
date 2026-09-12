"use client";

import { useState } from "react";

export default function SeoChecklistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          service_interested: "Lead Magnet: 2026 SEO Checklist",
          message: `User downloaded 2026 Technical & AI SEO Checklist. Website: ${formData.website || "N/A"}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const checklistContent = `=====================================================
2026 MASTER TECHNICAL & AI SEO ACTION CHECKLIST
Compiled by Abdullah Saleh - SEO & Growth Specialist
Website: https://abdullahbdseo.vercel.app
=====================================================

PHASE 1: TECHNICAL SEO & CRAWL EFFICIENCY
[ ] 1. Verify Robots.txt allows search engine crawlers with clean Disallow directives.
[ ] 2. Generate and submit dynamic XML Sitemap to Google Search Console & Bing Webmaster.
[ ] 3. Ensure self-referential canonical tags exist on all indexable URLs.
[ ] 4. Fix 404 broken links and replace 302 redirects with permanent 301 redirects.
[ ] 5. Implement HTTPS with modern TLS 1.3 encryption and HSTS headers.
[ ] 6. Inspect HTTP response headers (X-Frame-Options, Content-Type, Cache-Control).
[ ] 7. Ensure mobile responsiveness and touch target sizes pass Google Mobile Usability.
[ ] 8. Minimize URL parameters to prevent duplicate crawl budget wastage.

PHASE 2: CORE WEB VITALS & SPEED OPTIMIZATION
[ ] 9. Optimize Largest Contentful Paint (LCP) under 2.5 seconds using priority hero images.
[ ] 10. Keep Interaction to Next Paint (INP) under 200ms by deferring unused JavaScript.
[ ] 11. Eliminate Cumulative Layout Shift (CLS) with fixed dimensions on all media.
[ ] 12. Convert all image assets to next-gen WebP / AVIF formats.
[ ] 13. Enable Brotli / Gzip server compression on HTML, CSS, and JS assets.
[ ] 14. Preconnect to critical third-party origins (Google Fonts, CDN stylesheets).

PHASE 3: STRUCTURED DATA & RICH SNIPPETS (SCHEMA.ORG)
[ ] 15. Deploy Organization & Person JSON-LD Schema with verified social sameAs links.
[ ] 16. Implement Article / BlogPosting Schema with author, datePublished, and publisher.
[ ] 17. Add FAQPage JSON-LD Schema on all service and tool landing pages.
[ ] 18. Configure BreadcrumbList Schema to enhance Google SERP breadcrumb hierarchy.
[ ] 19. Add Product & Review / AggregateRating Schema for e-commerce stores.
[ ] 20. Validate all schemas using Google Rich Results Test without critical errors.

PHASE 4: ON-PAGE SEO & SEMANTIC SEARCH INTENT
[ ] 21. Ensure single <h1> heading per page containing primary focus entity.
[ ] 22. Craft compelling meta titles (50-60 chars / ~580px) with high click-through hooks.
[ ] 23. Write intent-driven meta descriptions (130-155 chars / ~960px) with clear CTAs.
[ ] 24. Implement descriptive image Alt text containing semantic topical variations.
[ ] 25. Build internal contextual link architecture using keyword-descriptive anchor text.
[ ] 26. Group related articles into Topic Clusters linked to primary Pillar Pages.
[ ] 27. Maintain a healthy keyword density between 1.0% and 2.5% without stuffing.

PHASE 5: AI-DRIVEN SEARCH, AEO & GEO (GENERATIVE ENGINE OPTIMIZATION)
[ ] 28. Optimize direct-answer paragraph blocks (40-60 words) under H2/H3 for AI Overviews.
[ ] 29. Implement structured comparison tables and bulleted lists for LLM entity extraction.
[ ] 30. Build author E-E-A-T credentials, real case studies, and verified citations.
[ ] 31. Monitor brand presence across Perplexity, ChatGPT Search, and Google Gemini.
[ ] 32. Keep content updated every 6 months to maintain high freshness algorithmic scores.

=====================================================
Need professional execution or forensic technical audit?
Schedule a consultation: https://abdullahbdseo.vercel.app/contact
Email: abdullahbd.seo@gmail.com
=====================================================`;

    const blob = new Blob([checklistContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "2026-Master-SEO-Checklist-Abdullah-Saleh.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Left) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 998,
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "6px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(67, 97, 238, 0.3)",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontWeight: 700,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 14px 30px -5px rgba(67, 97, 238, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(15, 23, 42, 0.3)";
        }}
      >
        <span
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "4px",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.78rem",
          }}
        >
          <i className="fa-solid fa-file-shield"></i>
        </span>
        <span>Free 2026 SEO Checklist</span>
        <span
          style={{
            background: "#22c55e",
            color: "#ffffff",
            fontSize: "0.68rem",
            fontWeight: 800,
            padding: "2px 6px",
            borderRadius: "4px",
            textTransform: "uppercase",
          }}
        >
          Free
        </span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "8px",
              maxWidth: "520px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #e2e8f0",
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                padding: "24px",
                color: "#ffffff",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "#ffffff",
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(59, 130, 246, 0.2)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#93c5fd",
                  marginBottom: "10px",
                }}
              >
                <i className="fa-solid fa-sparkles"></i>
                <span>2026 Executive Resource</span>
              </div>

              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: "0 0 6px", color: "#ffffff" }}>
                Master Technical &amp; AI SEO Checklist
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                45+ battle-tested action items covering Core Web Vitals, JSON-LD Schema, Topic Clusters, and Generative AI Search.
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px" }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {errorMessage && (
                    <div
                      style={{
                        background: "#fee2e2",
                        border: "1px solid #fecaca",
                        color: "#dc2626",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "6px" }}></i>
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Saleh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        color: "#0f172a",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Work / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        color: "#0f172a",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourdomain.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        color: "#0f172a",
                        outline: "none",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: "6px",
                      background: "linear-gradient(135deg, #0062d2, #2563eb)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "12px 18px",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i> Processing...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-download"></i> Get Instant Access &amp; Download
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>
                    <i className="fa-solid fa-lock" style={{ marginRight: "4px" }}></i> 100% Free. No spam guarantee.
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#dcfce7",
                      color: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      margin: "0 auto 16px",
                    }}
                  >
                    <i className="fa-solid fa-circle-check"></i>
                  </div>

                  <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                    Access Granted!
                  </h4>
                  <p style={{ fontSize: "0.86rem", color: "#475569", margin: "0 0 20px" }}>
                    Thank you, <strong>{formData.name}</strong>. Your 2026 Master Technical &amp; AI SEO Checklist is ready.
                  </p>

                  <button
                    type="button"
                    onClick={handleDownload}
                    style={{
                      width: "100%",
                      background: "#059669",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "14px 20px",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 4px 14px rgba(5, 150, 105, 0.3)",
                      marginBottom: "12px",
                    }}
                  >
                    <i className="fa-solid fa-file-arrow-down"></i> Download Checklist (.txt)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: "transparent",
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
