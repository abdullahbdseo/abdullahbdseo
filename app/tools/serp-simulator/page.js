"use client";

import { useState } from "react";
import Link from "next/link";

export default function SerpSimulator() {
  const [title, setTitle] = useState("Enterprise SEO Services & Organic Growth Strategy | Digi Solution");
  const [url, setUrl] = useState("https://digisolution.com/services/technical-seo");
  const [description, setDescription] = useState("Scale your organic search revenue with forensic technical audits, semantic keyword clustering, and high-authority digital PR backlinks.");
  const [device, setDevice] = useState("desktop");

  const titleLength = title.length;
  const descLength = description.length;
  const titlePixelEst = Math.round(titleLength * 8.5); // Approx ~580px max for desktop

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">SERP Snippet Preview</div>
          <h1 className="page-title">Google SERP Simulator & Preview Tool</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Simulate how your meta title and description appear in Google Desktop and Mobile search results with pixel width limits.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="serp-simulator-grid">
            {/* INPUTS */}
            <div className="serp-inputs-card">
              <div className="form-group mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="form-label mb-0">Title Tag</label>
                  <span className={`text-xs ${titleLength > 60 ? "text-danger" : "text-muted"}`}>
                    {titleLength} / 60 chars (~{titlePixelEst}px / 580px)
                  </span>
                </div>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Destination URL</label>
                <input 
                  type="text" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="form-label mb-0">Meta Description</label>
                  <span className={`text-xs ${descLength > 155 ? "text-danger" : "text-muted"}`}>
                    {descLength} / 155 chars
                  </span>
                </div>
                <textarea 
                  rows={3} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="form-textarea" 
                />
              </div>

              <div className="device-toggle-wrap mt-6">
                <label className="form-label">Preview Device:</label>
                <div className="device-buttons">
                  <button 
                    className={`btn btn-sm ${device === "desktop" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setDevice("desktop")}
                  >
                    <i className="fa-solid fa-desktop"></i> Desktop SERP
                  </button>
                  <button 
                    className={`btn btn-sm ${device === "mobile" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setDevice("mobile")}
                  >
                    <i className="fa-solid fa-mobile-screen"></i> Mobile SERP
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div className="serp-preview-card">
              <h3 className="preview-heading">Google Search Result Preview</h3>

              <div className={`serp-snippet-box ${device}`}>
                <div className="serp-breadcrumb-row">
                  <div className="serp-favicon"><i className="fa-solid fa-globe"></i></div>
                  <div className="serp-url-text">{url}</div>
                </div>

                <div className="serp-title-link">
                  {title || "Enter a page title..."}
                </div>

                <div className="serp-desc-text">
                  {description || "Enter a meta description to see how it renders in Google..."}
                </div>
              </div>

              <div className="serp-tips-box mt-6">
                <h4><i className="fa-solid fa-circle-info text-primary"></i> Best Practice Guidelines:</h4>
                <ul>
                  <li>Keep title tags between 50-60 characters (under 580 pixels) to avoid truncation.</li>
                  <li>Include primary keyword near the beginning of the title.</li>
                  <li>Write compelling meta descriptions with a clear call-to-action (120-155 characters).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
