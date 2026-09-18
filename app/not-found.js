"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { services, blogPosts, seoToolsList } from "@/lib/data";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  // Search results combining services, tools, and blogs
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results = [];

    // Search tools
    const tools = [
      { title: "Website Cost & SEO ROI Calculator", url: "/tools/website-cost-calculator", type: "Tool", icon: "fa-calculator" },
      { title: "Deep Website SEO Analyzer", url: "/tools/website-seo-analyzer", type: "Tool", icon: "fa-magnifying-glass-chart" },
      { title: "Facebook Ads ROI Calculator", url: "/tools/facebook-ads-roi-calculator", type: "Tool", icon: "fa-chart-pie" },
      { title: "SERP Simulator & Snippet Optimizer", url: "/tools/serp-simulator", type: "Tool", icon: "fa-desktop" },
      { title: "Schema Markup JSON-LD Generator", url: "/tools/schema-markup-generator", type: "Tool", icon: "fa-code" },
      { title: "Robots.txt & XML Sitemap Builder", url: "/tools/robots-sitemap-generator", type: "Tool", icon: "fa-robot" },
      { title: "HTTP & SSL Header Status Checker", url: "/tools/http-header-checker", type: "Tool", icon: "fa-shield-halved" },
      { title: "Free SEO Audit Tool", url: "/tools/deep-seo-audit", type: "Tool", icon: "fa-gauge-high" },
    ];

    tools.forEach((t) => {
      if (t.title.toLowerCase().includes(q)) {
        results.push(t);
      }
    });

    // Search services
    if (Array.isArray(services)) {
      services.forEach((s) => {
        if (
          s.title?.toLowerCase().includes(q) ||
          s.short_description?.toLowerCase().includes(q)
        ) {
          results.push({
            title: s.title,
            url: `/services/${s.slug}`,
            type: "Service",
            icon: s.icon || "fa-chart-line",
          });
        }
      });
    }

    // Search blogs
    if (Array.isArray(blogPosts)) {
      blogPosts.forEach((b) => {
        if (
          b.title?.toLowerCase().includes(q) ||
          b.summary?.toLowerCase().includes(q)
        ) {
          results.push({
            title: b.title,
            url: `/blog/${b.slug}`,
            type: "Article",
            icon: "fa-newspaper",
          });
        }
      });
    }

    return results.slice(0, 6);
  }, [searchQuery]);

  return (
    <div className="not-found-page">
      {/* Ambient background glows */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <div className="not-found-container">
        {/* Radar & 404 Visual Showcase */}
        <div className="hero-404-visual">
          <div className="radar-circle">
            <div className="radar-sweep"></div>
            <div className="radar-grid-rings"></div>

            {/* Tech Chips */}
            <div className="radar-chip chip-top-left">
              <i className="fa-solid fa-robot"></i> Googlebot: 404 Not Found
            </div>
            <div className="radar-chip chip-top-right">
              <i className="fa-solid fa-link-slash"></i> Broken Link
            </div>
            <div className="radar-chip chip-bottom-left">
              <i className="fa-solid fa-compass"></i> HTTP 404
            </div>
            <div className="radar-chip chip-bottom-right">
              <i className="fa-solid fa-bolt"></i> Re-index Signal
            </div>

            {/* 404 Digits */}
            <div className="digits-display">
              <span className="digit">4</span>
              <div className="planet-core">
                <i className="fa-solid fa-satellite-dish planet-icon"></i>
                <div className="orbit-track">
                  <span className="orbit-satellite">
                    <i className="fa-solid fa-satellite"></i>
                  </span>
                </div>
              </div>
              <span className="digit">4</span>
            </div>
          </div>
        </div>

        {/* Badge & Headings */}
        <div className="not-found-content">
          <div className="not-found-badge">
            <span className="badge-pulse-dot"></span>
            <span>Crawl Error: URL Unindexed</span>
          </div>

          <h1 className="not-found-title">
            Oops! Even Our <span className="text-gradient">SEO Crawlers</span> Couldn&apos;t Find This Page
          </h1>

          <p className="not-found-desc">
            The page you requested may have been relocated, renamed, or is temporarily unindexed. 
            Use the search box below or explore our popular tools and services to get back on track.
          </p>

          {/* Quick Search Bar */}
          <div className="search-recovery-box">
            <div className="search-field-wrap">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SEO tools, services, guides, or calculators..."
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Dropdown Live Results */}
            {searchQuery && (
              <div className="search-dropdown-menu">
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <Link
                      key={idx}
                      href={res.url}
                      className="dropdown-item"
                    >
                      <div className="item-icon">
                        <i className={`fa-solid ${res.icon}`}></i>
                      </div>
                      <div className="item-text">
                        <span className="item-title">{res.title}</span>
                        <span className="item-badge">{res.type}</span>
                      </div>
                      <i className="fa-solid fa-arrow-right item-arrow"></i>
                    </Link>
                  ))
                ) : (
                  <div className="dropdown-empty">
                    <i className="fa-solid fa-circle-exclamation"></i> No matching tools or services found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <Link href="/" className="btn-action btn-primary">
              <i className="fa-solid fa-house"></i>
              <span>Back to Homepage</span>
            </Link>

            <Link href="/tools" className="btn-action btn-accent">
              <i className="fa-solid fa-toolbox"></i>
              <span>Free SEO Tools Hub</span>
            </Link>

            <Link href="/contact" className="btn-action btn-outline">
              <i className="fa-solid fa-headset"></i>
              <span>Contact Support</span>
            </Link>
          </div>
        </div>

        {/* Popular Destinations Hub */}
        <div className="recovery-destinations">
          <div className="destinations-header">
            <h3>
              <i className="fa-solid fa-compass-drafting text-primary"></i> Popular Destinations to Explore
            </h3>
            <p>Direct links to our most visited high-value resources</p>
          </div>

          <div className="destinations-grid">
            <Link href="/tools" className="dest-card">
              <div className="dest-icon icon-blue">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </div>
              <div className="dest-info">
                <h4>Free SEO Tools Suite</h4>
                <p>12+ professional calculators, audit tools, schema builders, and SERP preview tools.</p>
                <span className="dest-link">Explore Tools <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>

            <Link href="/services" className="dest-card">
              <div className="dest-icon icon-indigo">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div className="dest-info">
                <h4>Rank #1 SEO Services</h4>
                <p>Forensic technical audits, high-DA backlinks, on-page SEO, and organic business growth.</p>
                <span className="dest-link">View Services <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>

            <Link href="/tools/website-cost-calculator" className="dest-card">
              <div className="dest-icon icon-cyan">
                <i className="fa-solid fa-calculator"></i>
              </div>
              <div className="dest-info">
                <h4>Website Cost & ROI Calculator</h4>
                <p>Estimate full project costs and forecast projected organic traffic ROI instantly.</p>
                <span className="dest-link">Calculate Now <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>

            <Link href="/portfolio" className="dest-card">
              <div className="dest-icon icon-emerald">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div className="dest-info">
                <h4>Verified Case Studies</h4>
                <p>Real-world client ranking proofs, traffic growth screenshots, and Search Console stats.</p>
                <span className="dest-link">View Case Studies <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>
          </div>
        </div>

        {/* Broken Link Report Banner */}
        <div className="broken-link-banner">
          <div className="banner-left">
            <div className="banner-icon-bubble">
              <i className="fa-solid fa-satellite-dish"></i>
            </div>
            <div>
              <h4>Found a Broken Link or Technical Issue?</h4>
              <p>Report the broken URL so our technical team can set up a 301 redirect immediately.</p>
            </div>
          </div>
          <div className="banner-right">
            <Link
              href="/contact?subject=Broken+Link+Report"
              className="btn-report"
            >
              <i className="fa-solid fa-paper-plane"></i> Report Broken Link
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          min-height: 85vh;
          padding: 60px 20px 80px;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.25;
          pointer-events: none;
          z-index: 0;
        }

        .orb-1 {
          width: 450px;
          height: 450px;
          background: #4361ee;
          top: -100px;
          left: -100px;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #06b6d4;
          bottom: -50px;
          right: -50px;
        }

        .not-found-container {
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Radar & Visual */
        .hero-404-visual {
          margin-bottom: 24px;
        }

        .radar-circle {
          position: relative;
          width: 260px;
          height: 260px;
          margin: 0 auto;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(67, 97, 238, 0.08) 0%, rgba(241, 245, 249, 0.6) 100%);
          border: 1px solid rgba(67, 97, 238, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px -5px rgba(67, 97, 238, 0.15);
        }

        .radar-grid-rings {
          position: absolute;
          inset: 15px;
          border-radius: 50%;
          border: 1px dashed rgba(67, 97, 238, 0.25);
        }

        .radar-sweep {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(67, 97, 238, 0.2) 60deg, transparent 65deg);
          animation: sweep 4s linear infinite;
        }

        @keyframes sweep {
          100% {
            transform: rotate(360deg);
          }
        }

        /* Tech Chips */
        .radar-chip {
          position: absolute;
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #334155;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          z-index: 2;
          animation: floatSlow 3s ease-in-out infinite alternate;
        }

        .chip-top-left {
          top: -10px;
          left: -35px;
          animation-delay: 0s;
        }

        .chip-top-right {
          top: -5px;
          right: -30px;
          color: #ef4444;
          animation-delay: 0.7s;
        }

        .chip-bottom-left {
          bottom: 0px;
          left: -25px;
          color: #2563eb;
          animation-delay: 1.2s;
        }

        .chip-bottom-right {
          bottom: -8px;
          right: -30px;
          color: #10b981;
          animation-delay: 1.8s;
        }

        @keyframes floatSlow {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-6px);
          }
        }

        /* 404 Digits & Core Planet */
        .digits-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          z-index: 3;
        }

        .digit {
          font-size: 4.8rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
          letter-spacing: -2px;
          text-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
        }

        .planet-core {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4361ee 0%, #3a56d4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(67, 97, 238, 0.4);
        }

        .planet-icon {
          color: #ffffff;
          font-size: 1.8rem;
        }

        .orbit-track {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 1.5px dashed rgba(67, 97, 238, 0.45);
          animation: orbitRotate 6s linear infinite;
        }

        .orbit-satellite {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          color: #06b6d4;
          font-size: 0.9rem;
        }

        @keyframes orbitRotate {
          100% {
            transform: rotate(360deg);
          }
        }

        /* Badge & Text */
        .not-found-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .badge-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        .not-found-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 14px;
          line-height: 1.25;
          max-width: 720px;
        }

        .text-gradient {
          background: linear-gradient(135deg, #4361ee 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .not-found-desc {
          font-size: 1.05rem;
          color: #475569;
          max-width: 620px;
          margin: 0 auto 28px;
          line-height: 1.65;
        }

        /* Search Box */
        .search-recovery-box {
          position: relative;
          max-width: 580px;
          width: 100%;
          margin: 0 auto 30px;
        }

        .search-field-wrap {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 6px 14px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .search-field-wrap:focus-within {
          border-color: #4361ee;
          box-shadow: 0 6px 20px rgba(67, 97, 238, 0.15);
        }

        .search-icon {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-right: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #0f172a;
          background: transparent;
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .clear-search-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          font-size: 0.95rem;
        }

        .clear-search-btn:hover {
          color: #334155;
        }

        /* Search Dropdown */
        .search-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 50;
          text-align: left;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          text-decoration: none;
          color: inherit;
          transition: background 0.15s ease;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: #f8fafc;
        }

        .item-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .item-text {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: #0f172a;
        }

        .item-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }

        .item-arrow {
          color: #94a3b8;
          font-size: 0.85rem;
        }

        .dropdown-empty {
          padding: 16px;
          color: #64748b;
          font-size: 0.9rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Action Buttons */
        .hero-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #4361ee;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(67, 97, 238, 0.3);
        }

        .btn-primary:hover {
          background: #3a56d4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
        }

        .btn-accent {
          background: #0f172a;
          color: #ffffff;
        }

        .btn-accent:hover {
          background: #1e293b;
          transform: translateY(-2px);
        }

        .btn-outline {
          background: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
        }

        .btn-outline:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
          transform: translateY(-2px);
        }

        /* Recovery Destinations */
        .recovery-destinations {
          width: 100%;
          margin-bottom: 40px;
        }

        .destinations-header {
          margin-bottom: 24px;
        }

        .destinations-header h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .destinations-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          text-align: left;
        }

        @media (max-width: 768px) {
          .destinations-grid {
            grid-template-columns: 1fr;
          }
        }

        .dest-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
        }

        .dest-card:hover {
          transform: translateY(-3px);
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
        }

        .dest-icon {
          width: 46px;
          height: 46px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .icon-blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .icon-indigo {
          background: #eef2ff;
          color: #4f46e5;
        }

        .icon-cyan {
          background: #ecfeff;
          color: #0891b2;
        }

        .icon-emerald {
          background: #ecfdf5;
          color: #059669;
        }

        .dest-info h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .dest-info p {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .dest-link {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .dest-card:hover .dest-link {
          gap: 10px;
          transition: gap 0.2s ease;
        }

        /* Broken Link Report Banner */
        .broken-link-banner {
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          border-radius: 12px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 20px;
          flex-wrap: wrap;
        }

        .banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 280px;
        }

        .banner-icon-bubble {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #38bdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .banner-left h4 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .banner-left p {
          font-size: 0.88rem;
          color: #94a3b8;
          margin: 0;
        }

        .btn-report {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2563eb;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .btn-report:hover {
          background: #1d4ed8;
        }

        @media (max-width: 640px) {
          .not-found-title {
            font-size: 1.7rem;
          }

          .radar-chip {
            display: none;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn-action {
            width: 100%;
            justify-content: center;
          }

          .broken-link-banner {
            flex-direction: column;
            text-align: center;
          }

          .banner-left {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
