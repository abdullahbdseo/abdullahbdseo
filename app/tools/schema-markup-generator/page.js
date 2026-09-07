"use client";

import { useState } from "react";
import Link from "next/link";

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState("Organization");
  const [copied, setCopied] = useState(false);

  // Form states
  const [orgData, setOrgData] = useState({
    name: "Digi Solution",
    url: "https://digisolution.com",
    logo: "https://digisolution.com/images/logo.png",
    email: "contact@digisolution.com",
    phone: "+1-800-555-0199",
    facebook: "https://facebook.com/digisolution",
    twitter: "https://twitter.com/digisolution",
    linkedin: "https://linkedin.com/company/digisolution"
  });

  const [localBiz, setLocalBiz] = useState({
    name: "Premier SEO Clinic",
    url: "https://example.com",
    image: "https://example.com/store.jpg",
    phone: "+1-800-555-0199",
    street: "123 Growth Ave, Suite 100",
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
    priceRange: "$$"
  });

  const [faqList, setFaqList] = useState([
    { question: "How long does a technical SEO audit take?", answer: "Our standard technical audit takes 5 to 7 business days for full diagnostic reporting." },
    { question: "Do you offer white-hat link building?", answer: "Yes, 100% manual digital PR and high-authority editorial outreach to relevant industry publications." }
  ]);

  const [articleData, setArticleData] = useState({
    headline: "The Ultimate Guide to Programmatic SEO in 2026",
    url: "https://example.com/blog/programmatic-seo-guide",
    image: "https://example.com/images/seo-guide.jpg",
    author: "Abdullah",
    publisher: "Digi Solution",
    datePublished: "2026-03-01",
    description: "Learn how to build and scale thousands of intent-targeted landing pages with semantic indexing."
  });

  const addFaq = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };

  const updateFaq = (index, field, value) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
  };

  const removeFaq = (index) => {
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  const generateSchemaJson = () => {
    if (schemaType === "Organization") {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": orgData.name,
        "url": orgData.url,
        "logo": orgData.logo,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": orgData.phone,
          "contactType": "customer service",
          "email": orgData.email
        },
        "sameAs": [orgData.facebook, orgData.twitter, orgData.linkedin].filter(Boolean)
      };
    }

    if (schemaType === "LocalBusiness") {
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": localBiz.name,
        "image": localBiz.image,
        "url": localBiz.url,
        "telephone": localBiz.phone,
        "priceRange": localBiz.priceRange,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localBiz.street,
          "addressLocality": localBiz.city,
          "addressRegion": localBiz.region,
          "postalCode": localBiz.postalCode,
          "addressCountry": localBiz.country
        }
      };
    }

    if (schemaType === "FAQPage") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.filter(f => f.question.trim()).map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      };
    }

    if (schemaType === "Article") {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.headline,
        "url": articleData.url,
        "image": [articleData.image].filter(Boolean),
        "datePublished": articleData.datePublished,
        "description": articleData.description,
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": articleData.publisher
        }
      };
    }

    return {};
  };

  const schemaJsonString = JSON.stringify(generateSchemaJson(), null, 2);
  const scriptTagOutput = `<script type="application/ld+json">\n${schemaJsonString}\n</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptTagOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([scriptTagOutput], { type: "text/html" });
    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${schemaType.toLowerCase()}-schema.html`;
    a.click();
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2">
            <i className="fa-solid fa-code"></i> Structured Data Generator
          </div>
          <h1 className="page-title">JSON-LD Schema Markup Generator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Generate Google-compliant JSON-LD structured data for rich snippet eligibility, FAQs, Local Businesses, Articles, and Organizations.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          
          {/* SCHEMA TYPE TABS */}
          <div className="schema-type-tabs">
            {[
              { id: "Organization", label: "Organization", icon: "fa-building" },
              { id: "LocalBusiness", label: "Local Business", icon: "fa-shop" },
              { id: "FAQPage", label: "FAQ Page", icon: "fa-circle-question" },
              { id: "Article", label: "Article / Blog", icon: "fa-newspaper" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`schema-tab-btn ${schemaType === tab.id ? "active" : ""}`}
                onClick={() => setSchemaType(tab.id)}
              >
                <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
              </button>
            ))}
          </div>

          <div className="schema-generator-grid">
            {/* FORM INPUTS */}
            <div className="schema-form-box">
              <h2 className="form-box-title">
                Configure {schemaType} Properties
              </h2>

              {/* ORGANIZATION SCHEMA */}
              {schemaType === "Organization" && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Organization Legal Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={orgData.name}
                      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website Official URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={orgData.url}
                      onChange={(e) => setOrgData({ ...orgData, url: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Logo Image URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={orgData.logo}
                      onChange={(e) => setOrgData({ ...orgData, logo: e.target.value })}
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Contact Phone</label>
                      <input
                        type="text"
                        className="form-input"
                        value={orgData.phone}
                        onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Support Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={orgData.email}
                        onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Social Profile URLs (SameAs)</label>
                    <input
                      type="url"
                      placeholder="Facebook Page URL"
                      className="form-input mb-2"
                      value={orgData.facebook}
                      onChange={(e) => setOrgData({ ...orgData, facebook: e.target.value })}
                    />
                    <input
                      type="url"
                      placeholder="Twitter / X Profile URL"
                      className="form-input mb-2"
                      value={orgData.twitter}
                      onChange={(e) => setOrgData({ ...orgData, twitter: e.target.value })}
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn Company URL"
                      className="form-input"
                      value={orgData.linkedin}
                      onChange={(e) => setOrgData({ ...orgData, linkedin: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* LOCAL BUSINESS SCHEMA */}
              {schemaType === "LocalBusiness" && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={localBiz.name}
                      onChange={(e) => setLocalBiz({ ...localBiz, name: e.target.value })}
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Website URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={localBiz.url}
                        onChange={(e) => setLocalBiz({ ...localBiz, url: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.phone}
                        onChange={(e) => setLocalBiz({ ...localBiz, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={localBiz.street}
                      onChange={(e) => setLocalBiz({ ...localBiz, street: e.target.value })}
                    />
                  </div>
                  <div className="form-row-3">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.city}
                        onChange={(e) => setLocalBiz({ ...localBiz, city: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State / Region</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.region}
                        onChange={(e) => setLocalBiz({ ...localBiz, region: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.postalCode}
                        onChange={(e) => setLocalBiz({ ...localBiz, postalCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ SCHEMA */}
              {schemaType === "FAQPage" && (
                <div>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 16px" }}>
                    Add FAQs to trigger interactive expandable dropdowns in Google Search results.
                  </p>
                  {faqList.map((faq, idx) => (
                    <div key={idx} style={{ padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#f8fafc", marginBottom: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <strong style={{ fontSize: "0.85rem", color: "#0f172a" }}>FAQ #{idx + 1}</strong>
                        {faqList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFaq(idx)}
                            style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
                          >
                            <i className="fa-solid fa-trash"></i> Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. What is your average ranking turnaround time?"
                        className="form-input mb-2"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                      />
                      <textarea
                        rows={2}
                        placeholder="e.g. Most competitive terms see initial movement within 60 to 90 days."
                        className="form-textarea"
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFaq}
                    className="btn btn-outline btn-sm"
                    style={{ width: "100%", marginTop: "4px" }}
                  >
                    <i className="fa-solid fa-plus"></i> Add Another Question
                  </button>
                </div>
              )}

              {/* ARTICLE SCHEMA */}
              {schemaType === "Article" && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Article Headline</label>
                    <input
                      type="text"
                      className="form-input"
                      value={articleData.headline}
                      onChange={(e) => setArticleData({ ...articleData, headline: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Article Full URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={articleData.url}
                      onChange={(e) => setArticleData({ ...articleData, url: e.target.value })}
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Author Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={articleData.author}
                        onChange={(e) => setArticleData({ ...articleData, author: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Publication Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={articleData.datePublished}
                        onChange={(e) => setArticleData({ ...articleData, datePublished: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Summary Description</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={articleData.description}
                      onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* LIVE CODE OUTPUT */}
            <div className="schema-output-box">
              <div className="code-header">
                <span className="code-title">
                  <i className="fa-solid fa-code"></i> JSON-LD Structured Output
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={downloadJson}
                    style={{ borderColor: "#475569", color: "#e2e8f0" }}
                  >
                    <i className="fa-solid fa-download"></i> Download
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <>
                        <i className="fa-solid fa-check"></i> Copied!
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-copy"></i> Copy Script
                      </>
                    )}
                  </button>
                </div>
              </div>

              <pre className="code-block">
                <code>{scriptTagOutput}</code>
              </pre>

              <div style={{ padding: "14px 18px", background: "#1e293b", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                  <i className="fa-solid fa-shield-check text-success"></i> Paste into your HTML <code>&lt;head&gt;</code> section.
                </span>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.8rem", color: "#60a5fa", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  Test on Google <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.72rem" }}></i>
                </a>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="tool-related-section">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related SEO Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Verify crawler directives, simulate snippets, and check server response headers.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/serp-simulator">Google SERP Simulator</Link></h4>
                <p className="tool-ref-desc">Preview meta title and description snippets with live pixel length limits.</p>
                <div className="tool-ref-footer"><Link href="/tools/serp-simulator" className="tool-ref-link">Simulate SERP <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/robots-sitemap-generator">Robots.txt Builder</Link></h4>
                <p className="tool-ref-desc">Generate bot crawler directives and compliant XML sitemaps.</p>
                <div className="tool-ref-footer"><Link href="/tools/robots-sitemap-generator" className="tool-ref-link">Build Robots.txt <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card">
                <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/website-seo-analyzer">Website SEO Analyzer</Link></h4>
                <p className="tool-ref-desc">Audit on-page SEO score, tags, headings, and canonicals.</p>
                <div className="tool-ref-footer"><Link href="/tools/website-seo-analyzer" className="tool-ref-link">Audit Website <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box">
            <h4>Need Bespoke Schema &amp; Semantic Knowledge Graph SEO?</h4>
            <p>We build connected entity graphs, product rich data, and automated schema pipelines.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-comments"></i> Book Schema Consultation
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm">
                Explore Technical SEO <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
