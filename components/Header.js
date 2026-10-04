"use client";
// components/Header.js - Enhanced Tools Mega Menu / Popup with Search & Category Filters

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings, freeTools } from "@/lib/data";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsExpanded, setMobileToolsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setMobileToolsExpanded(false);
    setSearchQuery("");
  }, [pathname]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setToolsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const seoSlugs = [
    "serp-simulator",
    "url-slug-duplicate-checker",
    "seo-content-optimizer",
    "open-graph-meta-generator",
    "canonical-hreflang-generator",
    "keyword-clustering-tool",
    "high-da-backlinks",
    "keyword-density-checker",
    "word-counter-seo-analyzer",
    "url-slug-generator"
  ];

  const techSlugs = [
    "deep-seo-audit",
    "website-seo-analyzer",
    "seo-audit-report-generator",
    "schema-markup-generator",
    "robots-sitemap-generator",
    "pagespeed-analyzer",
    "http-header-checker",
    "redirect-htaccess-generator",
    "disavow-file-generator"
  ];

  const calcSlugs = [
    "seo-roi-calculator",
    "backlink-package-calculator",
    "website-cost-calculator",
    "google-ads-roi-calculator",
    "facebook-ads-roi-calculator",
    "ai-automation-savings-calculator",
    "love-calculator"
  ];

  const categories = [
    { id: "all", label: "All Tools", count: freeTools.length, icon: "fa-solid fa-grid-2" },
    { id: "seo", label: "SEO & Content", count: seoSlugs.length, icon: "fa-solid fa-magnifying-glass-chart" },
    { id: "tech", label: "Technical & Audit", count: techSlugs.length, icon: "fa-solid fa-screwdriver-wrench" },
    { id: "calc", label: "Calculators & ROI", count: calcSlugs.length, icon: "fa-solid fa-calculator" }
  ];

  // Filtered tools based on search and active category
  const filteredTools = useMemo(() => {
    let list = freeTools;

    if (activeCategory === "seo") {
      list = list.filter((t) => seoSlugs.includes(t.slug));
    } else if (activeCategory === "tech") {
      list = list.filter((t) => techSlugs.includes(t.slug));
    } else if (activeCategory === "calc") {
      list = list.filter((t) => calcSlugs.includes(t.slug));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, activeCategory]);

  const seoList = useMemo(() => freeTools.filter((t) => seoSlugs.includes(t.slug)), []);
  const techList = useMemo(() => freeTools.filter((t) => techSlugs.includes(t.slug)), []);
  const calcList = useMemo(() => freeTools.filter((t) => calcSlugs.includes(t.slug)), []);

  const renderToolItem = (t) => {
    const isNew = t.badge === "New" || t.slug === "url-slug-duplicate-checker";
    const isPopular = t.badge === "Popular" || t.slug === "serp-simulator" || t.slug === "seo-content-optimizer" || t.slug === "high-da-backlinks";

    return (
      <Link
        key={t.slug}
        href={t.customPath || `/tools/${t.slug}`}
        className="dropdown-item"
        onClick={() => setToolsDropdownOpen(false)}
      >
        <div
          className="dropdown-item-icon"
          style={{
            background: t.bg || "#f1f5f9",
            color: t.color || "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          {t.iconImg ? (
            <img
              src={t.iconImg}
              alt={t.title}
              style={{ width: "18px", height: "18px", objectFit: "contain", display: "block" }}
            />
          ) : (
            <i className={t.icon && (t.icon.includes("fa-brands") || t.icon.includes("fa-solid") || t.icon.includes("fa-regular")) ? t.icon : `fa-solid ${t.icon || "fa-wrench"}`}></i>
          )}
        </div>
        <div className="dropdown-item-text">
          <div className="dropdown-item-title-row">
            <strong>{t.title}</strong>
            {isNew && <span className="tool-tag-badge new-badge">NEW</span>}
            {isPopular && !isNew && <span className="tool-tag-badge hot-badge">POPULAR</span>}
          </div>
          <span>{t.desc}</span>
        </div>
        <i className="fa-solid fa-chevron-right dropdown-item-arrow"></i>
      </Link>
    );
  };

  return (
    <header className="digi-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link href="/" className="digi-logo" aria-label={siteSettings.site_name}>
          <img
            src="/images/logo-icon.svg"
            alt={siteSettings.site_name}
            className="site-main-logo-icon"
            style={{ height: "36px", width: "auto" }}
          />
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

          {/* Tools Mega Menu Dropdown */}
          <li
            className={`digi-nav-item has-dropdown ${toolsDropdownOpen ? "open" : ""}`}
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
            ref={dropdownRef}
          >
            <Link href="/tools" className={`digi-nav-link ${pathname.startsWith("/tools") ? "active" : ""}`}>
              Tools <span className="nav-tools-count-pill">{freeTools.length}</span> <i className="fa-solid fa-chevron-down nav-caret"></i>
            </Link>

            {/* Desktop Mega Menu Popup */}
            <div className={`digi-nav-dropdown ${toolsDropdownOpen ? "show" : ""}`}>
              {/* Dropdown Header */}
              <div className="dropdown-header">
                <div className="dropdown-header-left">
                  <div className="dropdown-header-title">
                    <span className="dropdown-title-icon">
                      <i className="fa-solid fa-toolbox"></i>
                    </span>
                    <span>Free SEO &amp; Growth Toolbox</span>
                    <span className="dropdown-badge-counter">{freeTools.length} Tools</span>
                  </div>
                </div>

                <div className="dropdown-header-right">
                  <Link href="/tools" className="dropdown-all-link" onClick={() => setToolsDropdownOpen(false)}>
                    View All Hub <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Search & Category Filter Bar */}
              <div className="dropdown-filter-bar">
                <div className="dropdown-search-box">
                  <i className="fa-solid fa-magnifying-glass dropdown-search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search 26+ SEO tools by name or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="dropdown-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="dropdown-search-clear"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="dropdown-cat-pills">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`dropdown-cat-pill ${activeCategory === cat.id ? "active" : ""}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Tools Content Body */}
              <div className="dropdown-body-scroll">
                {searchQuery.trim() || activeCategory !== "all" ? (
                  /* Filtered / Search View */
                  <div className="dropdown-filtered-section">
                    <div className="dropdown-section-header">
                      <span className="dropdown-cat-title">
                        <i className="fa-solid fa-list-check" style={{ color: "#2563eb", marginRight: "6px" }}></i>
                        {searchQuery ? `Search Results for "${searchQuery}"` : categories.find((c) => c.id === activeCategory)?.label}
                        <span className="dropdown-sub-count">({filteredTools.length})</span>
                      </span>
                      {searchQuery && (
                        <button
                          type="button"
                          className="dropdown-reset-btn"
                          onClick={() => {
                            setSearchQuery("");
                            setActiveCategory("all");
                          }}
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>

                    {filteredTools.length > 0 ? (
                      <div className="dropdown-grid-dynamic">
                        {filteredTools.map(renderToolItem)}
                      </div>
                    ) : (
                      <div className="dropdown-empty-state">
                        <i className="fa-solid fa-magnifying-glass dropdown-empty-icon"></i>
                        <p>No tools found matching &ldquo;{searchQuery}&rdquo;</p>
                        <button
                          type="button"
                          className="dropdown-empty-reset"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Standard 3-Section / 2-Column Mega View */
                  <div className="dropdown-grid-columns">
                    {/* Column 1: SEO & Content Tools */}
                    <div className="dropdown-col">
                      <span className="dropdown-cat-title">
                        <i className="fa-solid fa-magnifying-glass-chart" style={{ color: "#2563eb", marginRight: "6px" }}></i>
                        SEO &amp; Content Optimization ({seoList.length})
                      </span>
                      <div className="dropdown-col-items">
                        {seoList.map(renderToolItem)}
                      </div>
                    </div>

                    {/* Column 2: Technical & Server Audits */}
                    <div className="dropdown-col">
                      <span className="dropdown-cat-title">
                        <i className="fa-solid fa-screwdriver-wrench" style={{ color: "#7c3aed", marginRight: "6px" }}></i>
                        Technical, Server &amp; Audit ({techList.length})
                      </span>
                      <div className="dropdown-col-items">
                        {techList.map(renderToolItem)}
                      </div>

                      {/* Sub-Section in Col 2: Calculators */}
                      <span className="dropdown-cat-title" style={{ marginTop: "12px" }}>
                        <i className="fa-solid fa-calculator" style={{ color: "#059669", marginRight: "6px" }}></i>
                        Calculators &amp; ROI ({calcList.length})
                      </span>
                      <div className="dropdown-col-items">
                        {calcList.map(renderToolItem)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Footer */}
              <div className="dropdown-footer">
                <div className="dropdown-footer-badge">
                  <i className="fa-solid fa-bolt" style={{ color: "#f59e0b", marginRight: "6px" }}></i>
                  <span>100% Free • No Login Required • Instant In-Browser Tools</span>
                </div>
                <Link
                  href="/tools"
                  className="dropdown-footer-btn"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  Browse All {freeTools.length} Tools <i className="fa-solid fa-arrow-right" style={{ marginLeft: "4px" }}></i>
                </Link>
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
