"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { faqs, siteSettings } from "@/lib/data";

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState(1); // open first FAQ by default for great UX
  const [copiedId, setCopiedId] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(faqs.map((f) => f.category || "General"))];
    return cats;
  }, []);

  // Filtered FAQs based on category and search
  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCategory = activeCategory === "All" || f.category === activeCategory;
      const matchesSearch =
        searchTerm.trim() === "" ||
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.category && f.category.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const copyFaqAnswer = (faq, e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${faq.question}\n\n${faq.answer}`);
      setCopiedId(faq.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="faq-page-wrapper">
      {/* Schema.org FAQPage Structured Data for Google Rich Snippets & AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION */}
      <section className="faq-hero-section">
        <div className="container text-center">
          <div className="faq-hero-badge">
            <i className="fa-solid fa-sparkles"></i>
            <span>Google Search &amp; AI Knowledge Base</span>
          </div>
          <h1 className="faq-hero-title">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="faq-hero-subtitle">
            Comprehensive answers on our 100% white-hat SEO methodology, Generative Engine Optimization (GEO), Core Web Vitals audits, and revenue compounding frameworks.
          </p>

          {/* SEARCH BOX */}
          <div className="faq-search-wrapper">
            <div className="faq-search-box">
              <i className="fa-solid fa-magnifying-glass faq-search-icon"></i>
              <input
                type="text"
                placeholder="Search any query (e.g., AI search, ChatGPT, audit depth, pricing, backlinks)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="faq-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="faq-search-clear"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <div className="faq-results-counter">
              Showing <strong>{filteredFaqs.length}</strong> of <strong>{faqs.length}</strong> verified questions
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="faq-main-section">
        <div className="container">
          {/* CATEGORY FILTER PILLS */}
          <div className="faq-category-bar">
            {categories.map((cat) => {
              const count = cat === "All" ? faqs.length : faqs.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`faq-cat-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="faq-cat-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* FAQS ACCORDION LIST */}
          <div className="faq-accordion-container">
            {filteredFaqs.length === 0 ? (
              <div className="faq-empty-state">
                <div className="faq-empty-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <h3>No Matching Questions Found</h3>
                <p>We could not find answers matching &ldquo;{searchTerm}&rdquo;. Try different keywords or reach out directly.</p>
                <div className="faq-empty-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All");
                    }}
                  >
                    Reset Filters
                  </button>
                  <Link href="/contact" className="btn btn-primary">
                    Ask Abdullah Directly
                  </Link>
                </div>
              </div>
            ) : (
              <div className="faq-accordion-grid">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = activeFaq === faq.id;
                  const itemNumber = String(index + 1).padStart(2, "0");
                  return (
                    <div
                      key={faq.id}
                      className={`faq-item-card ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq-item-header"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="faq-item-meta">
                          <span className="faq-item-num">{itemNumber}</span>
                          {faq.category && (
                            <span className="faq-item-category-tag">{faq.category}</span>
                          )}
                        </div>

                        <div className="faq-item-title-wrapper">
                          <h3 className="faq-item-question">{faq.question}</h3>
                        </div>

                        <div className="faq-item-toggle">
                          <i className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"}`}></i>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="faq-item-body">
                          <div className="faq-answer-content">
                            <p>{faq.answer}</p>
                          </div>

                          <div className="faq-item-footer">
                            <button
                              type="button"
                              className="faq-copy-btn"
                              onClick={(e) => copyFaqAnswer(faq, e)}
                            >
                              <i className={`fa-solid ${copiedId === faq.id ? "fa-check text-green" : "fa-copy"}`}></i>
                              <span>{copiedId === faq.id ? "Copied!" : "Copy Answer"}</span>
                            </button>

                            <Link href="/contact" className="faq-inquire-link">
                              Need customized guidance? <strong>Get in touch &rarr;</strong>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* BOTTOM CONSULTATION BANNER */}
          <div className="faq-cta-banner">
            <div className="faq-cta-glow"></div>
            <div className="faq-cta-content">
              <div className="faq-cta-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="faq-cta-text">
                <h3>Have a specific technical question about your site?</h3>
                <p>
                  Get direct answers and a complimentary 15-minute forensic crawl audit review tailored to your industry niche.
                </p>
              </div>
              <div className="faq-cta-actions">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Book Free 1-on-1 Discovery <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <Link href="/services" className="btn btn-outline btn-lg">
                  Explore SEO Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
