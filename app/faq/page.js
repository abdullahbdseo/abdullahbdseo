"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs, siteSettings } from "@/lib/data";

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
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
    <div className="faq-page">
      {/* Schema.org FAQPage Structured Data for Google Rich Snippets & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Knowledge & FAQs</div>
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Everything you need to know about our technical auditing processes, pricing structures, deliverables, and timelines.
          </p>

          {/* SEARCH BAR */}
          <div className="faq-search-box max-w-xl mx-auto mt-8">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              placeholder="Search topics (e.g., audit time, payments, backlinks, crawl depth)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="faq-search-input"
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm("")}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQS ACCORDION LIST */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          {filteredFaqs.length === 0 ? (
            <div className="empty-faq-state text-center py-12">
              <i className="fa-solid fa-circle-question text-muted text-4xl mb-4"></i>
              <h3>No matching questions found</h3>
              <p className="text-muted">Try searching with different keywords or send us a direct message.</p>
              <button className="btn btn-outline mt-4" onClick={() => setSearchTerm("")}>
                Clear Search
              </button>
            </div>
          ) : (
            <div className="faq-accordion-list">
              {filteredFaqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`faq-card-item ${activeFaq === faq.id ? "expanded" : ""}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <button className="faq-card-header" aria-expanded={activeFaq === faq.id}>
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-toggle-icon">
                      <i className={`fa-solid ${activeFaq === faq.id ? "fa-minus" : "fa-plus"}`}></i>
                    </span>
                  </button>

                  {activeFaq === faq.id && (
                    <div className="faq-card-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* NEED MORE HELP CARD */}
          <div className="faq-help-card mt-16 text-center">
            <div className="help-card-icon">
              <i className="fa-solid fa-comments text-primary"></i>
            </div>
            <h3>Still have questions?</h3>
            <p className="text-muted max-w-md mx-auto mb-6">
              Can&apos;t find the answer you&apos;re looking for? Reach out directly and we&apos;ll get back to you within 24 hours.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Abdullah Directly <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
