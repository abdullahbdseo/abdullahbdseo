"use client";

import { useState } from "react";
import Link from "next/link";

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState("Organization");
  const [copied, setCopied] = useState(false);

  // Form states
  const [orgData, setOrgData] = useState({
    name: "Digi Solution",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    email: "contact@example.com",
    phone: "+1-800-555-0199",
    facebook: "https://facebook.com/example",
    twitter: "https://twitter.com/example",
    linkedin: "https://linkedin.com/company/example"
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
    { question: "How long does an SEO audit take?", answer: "Our standard technical audit takes 5 to 7 business days." },
    { question: "Do you offer white-hat link building?", answer: "Yes, 100% manual digital PR and high-authority editorial outreach." }
  ]);

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
        "mainEntity": faqList.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
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

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Structured Data Generator</div>
          <h1 className="page-title">JSON-LD Schema Markup Generator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Generate Google-compliant JSON-LD structured data for rich snippets, FAQs, Local Business, and Organizations.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* SCHEMA TYPE TABS */}
          <div className="schema-type-tabs mb-8 text-center">
            {["Organization", "LocalBusiness", "FAQPage"].map((type) => (
              <button 
                key={type}
                className={`schema-tab-btn ${schemaType === type ? "active" : ""}`}
                onClick={() => setSchemaType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="schema-generator-grid">
            {/* FORM INPUTS */}
            <div className="schema-form-box">
              <h3 className="form-box-title">Configure {schemaType} Fields</h3>

              {schemaType === "Organization" && (
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Organization Name</label>
                    <input type="text" className="form-input" value={orgData.name} onChange={(e) => setOrgData({ ...orgData, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website URL</label>
                    <input type="url" className="form-input" value={orgData.url} onChange={(e) => setOrgData({ ...orgData, url: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Logo Image URL</label>
                    <input type="url" className="form-input" value={orgData.logo} onChange={(e) => setOrgData({ ...orgData, logo: e.target.value })} />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Contact Phone</label>
                      <input type="text" className="form-input" value={orgData.phone} onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Email</label>
                      <input type="email" className="form-input" value={orgData.email} onChange={(e) => setOrgData({ ...orgData, email: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {schemaType === "LocalBusiness" && (
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input type="text" className="form-input" value={localBiz.name} onChange={(e) => setLocalBiz({ ...localBiz, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Street Address</label>
                    <input type="text" className="form-input" value={localBiz.street} onChange={(e) => setLocalBiz({ ...localBiz, street: e.target.value })} />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input type="text" className="form-input" value={localBiz.city} onChange={(e) => setLocalBiz({ ...localBiz, city: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State / Region</label>
                      <input type="text" className="form-input" value={localBiz.region} onChange={(e) => setLocalBiz({ ...localBiz, region: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {schemaType === "FAQPage" && (
                <div className="space-y-4">
                  {faqList.map((faq, idx) => (
                    <div key={idx} className="faq-schema-row p-4 border rounded bg-slate-50 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <strong>Question #{idx + 1}</strong>
                        {faqList.length > 1 && (
                          <button type="button" onClick={() => removeFaq(idx)} className="text-danger text-sm">
                            <i className="fa-solid fa-trash"></i> Remove
                          </button>
                        )}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Question text..." 
                        className="form-input mb-2" 
                        value={faq.question} 
                        onChange={(e) => updateFaq(idx, "question", e.target.value)} 
                      />
                      <textarea 
                        rows={2} 
                        placeholder="Answer text..." 
                        className="form-textarea" 
                        value={faq.answer} 
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)} 
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addFaq} className="btn btn-outline btn-sm">
                    <i className="fa-solid fa-plus"></i> Add Another Question
                  </button>
                </div>
              )}
            </div>

            {/* LIVE CODE OUTPUT */}
            <div className="schema-output-box">
              <div className="code-header">
                <span className="code-title"><i className="fa-solid fa-code"></i> Generated JSON-LD</span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={copyToClipboard}
                >
                  {copied ? <><i className="fa-solid fa-check"></i> Copied!</> : <><i className="fa-solid fa-copy"></i> Copy Script</>}
                </button>
              </div>

              <pre className="code-block">
                <code>{scriptTagOutput}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
