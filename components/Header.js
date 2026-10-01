"use client";
// components/Header.js - Clean Minimal Navigation with 15 Growth Tools (No Down Caret)

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings, freeTools } from "@/lib/data";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  // 25 Tools distributed evenly across 2 balanced columns (13 on left, 12 on right)
  const col1Slugs = [
    "serp-simulator",
    "seo-content-optimizer",
    "open-graph-meta-generator",
    "canonical-hreflang-generator",
    "keyword-clustering-tool",
    "high-da-backlinks",
    "deep-seo-audit",
    "website-seo-analyzer",
    "seo-audit-report-generator",
    "schema-markup-generator",
    "keyword-density-checker",
    "word-counter-seo-analyzer",
    "url-slug-generator"
  ];

  const seoTools = freeTools.filter(t => col1Slugs.includes(t.slug));
  const roiTools = freeTools.filter(t => !col1Slugs.includes(t.slug));

  return (
    <header className="digi-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link href="/" className="digi-logo" aria-label={siteSettings.site_name}>
          <img src="/images/logo-icon.svg" alt={siteSettings.site_name} className="site-main-logo-icon" style={{ height: "36px", width: "auto" }} />
          <span className="site-main-logo-text">{siteSettings.site_name}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`digi-nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/" className={`digi-nav-link ${pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" className={`digi-nav-link ${pathname.startsWith("/services") ? "active" : ""}`}>
              Services
            </Link>
          </li>

          {/* Tools Dropdown */}
          <li 
            className={`digi-nav-item has-dropdown ${toolsDropdownOpen ? "open" : ""}`}
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <Link href="/tools" className={`digi-nav-link ${pathname.startsWith("/tools") ? "active" : ""}`}>
              Tools <i className="fa-solid fa-chevron-down nav-caret"></i>
            </Link>

            <div className={`digi-nav-dropdown ${toolsDropdownOpen ? "show" : ""}`} style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <div className="dropdown-header">
                <span className="dropdown-header-title">
                  <i className="fa-solid fa-toolbox" style={{ color: "#2563eb", marginRight: "6px" }}></i> Free SEO &amp; Growth Tools ({freeTools.length})
                </span>
                <Link href="/tools" className="dropdown-all-link">
                  View All {freeTools.length} Tools <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.72rem", marginLeft: "4px" }}></i>
                </Link>
              </div>

              <div className="dropdown-grid">
                {/* Column 1: SEO & Content Tools (13 items) */}
                <div className="dropdown-col">
                  <span className="dropdown-cat-title">
                    <i className="fa-solid fa-magnifying-glass-chart" style={{ color: "#2563eb", marginRight: "4px" }}></i> SEO &amp; Content Optimization
                  </span>
                  {seoTools.map((t) => (
                    <Link key={t.slug} href={t.customPath || `/tools/${t.slug}`} className="dropdown-item">
                      <div className="dropdown-item-icon" style={{ background: t.bg, color: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t.iconImg ? (
                          <img src={t.iconImg} alt={t.title} style={{ width: "18px", height: "18px", objectFit: "contain", display: "block" }} />
                        ) : (
                          <i className={t.icon.includes("fa-brands") || t.icon.includes("fa-solid") || t.icon.includes("fa-regular") ? t.icon : `fa-solid ${t.icon}`}></i>
                        )}
                      </div>
                      <div className="dropdown-item-text">
                        <strong>{t.title}</strong>
                        <span>{t.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Column 2: Technical, Server & ROI (12 items) */}
                <div className="dropdown-col">
                  <span className="dropdown-cat-title">
                    <i className="fa-solid fa-calculator" style={{ color: "#059669", marginRight: "4px" }}></i> Technical, Server &amp; ROI
                  </span>
                  {roiTools.map((t) => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="dropdown-item">
                      <div className="dropdown-item-icon" style={{ background: t.bg, color: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t.iconImg ? (
                          <img src={t.iconImg} alt={t.title} style={{ width: "18px", height: "18px", objectFit: "contain", display: "block" }} />
                        ) : (
                          <i className={t.icon.includes("fa-brands") || t.icon.includes("fa-solid") || t.icon.includes("fa-regular") ? t.icon : `fa-solid ${t.icon}`}></i>
                        )}
                      </div>
                      <div className="dropdown-item-text">
                        <strong>{t.title}</strong>
                        <span>{t.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link href="/portfolio" className={`digi-nav-link ${pathname.startsWith("/portfolio") ? "active" : ""}`}>
              <i className="fa-brands fa-google" style={{ color: "#4285F4", fontSize: "0.8rem", marginRight: "4px" }}></i> Results
            </Link>
          </li>
          <li>
            <Link href="/#steps" className="digi-nav-link">
              Steps
            </Link>
          </li>
          <li>
            <Link href="/pricing" className={`digi-nav-link ${pathname === "/pricing" ? "active" : ""}`}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`digi-nav-link ${pathname === "/contact" ? "active" : ""}`}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Header Actions (Mobile Toggle) */}
        <div className="digi-header-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button 
            className="mobile-toggle" 
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
