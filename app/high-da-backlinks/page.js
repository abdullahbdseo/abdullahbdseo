"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { backlinkPosts } from "@/lib/backlinks-data";
import { siteSettings } from "@/lib/data";

export default function HighDaBacklinksPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = [
    { id: "all", name: "All Topics" },
    ...Array.from(new Set(backlinkPosts.map((p) => p.category))).map((cat) => ({
      id: cat,
      name: cat,
    }))
  ];

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return backlinkPosts.filter((post) => {
      const matchCat = selectedCategory === "all" || post.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.sites && post.sites.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="blog-page">
      
      {/* HERO SECTION - Matching Site Theme */}
      <section className="blog-hero-section">
        <div className="container text-center">
          <span className="blog-badge">
            <i className="fa-solid fa-link" style={{ color: "var(--digi-blue, #4361ee)" }}></i> High Authority Link Building Hub
          </span>
          <h1 className="blog-hero-title">
            High DA <span className="text-blue" style={{ background: "linear-gradient(135deg, #4361ee 0%, #00d2d3 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Backlinks &amp; Resource Guides</span>
          </h1>
          <p className="blog-hero-subtitle">
            Curated directories, profile creation sources, Web 2.0 assets, local citations, and publishing hubs with live Domain Authority ratings and direct submission links.
          </p>

          {/* Search Bar */}
          <div className="blog-search-bar">
            <i className="fa-solid fa-magnifying-glass blog-search-icon"></i>
            <input
              type="text"
              placeholder="Search by directory type, platform or niche (e.g. GitHub, Profile Creation, Local Citation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="blog-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`blog-filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section style={{ padding: "50px 0 80px" }}>
        <div className="container">
          
          {/* Header Bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0, fontFamily: "var(--font-heading)" }}>
                {selectedCategory === "all" ? "Latest Strategy & Backlink Guides" : `${selectedCategory} Guides`}
              </h2>
              <span style={{ fontSize: "0.88rem", color: "var(--digi-text-muted, #64748b)" }}>
                Showing {filteredPosts.length} verified strategy modules
              </span>
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              border: "1px solid #dbeafe",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#1e40af"
            }}>
              <i className="fa-solid fa-circle-check" style={{ color: "#10b981" }}></i>
              <span>100% Verified DA 80+ Sources</span>
            </div>
          </div>

          {/* BLOG-STYLE CARDS GRID - ONLY THUMBNAIL IMAGE & TITLE */}
          <div className="blog-posts-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-card" style={{ display: "flex", flexDirection: "column" }}>
                
                {/* Visual Thumbnail Image - Clickable (Opens in new window) */}
                <div className="blog-card-image-wrap" style={{ height: "220px", position: "relative" }}>
                  <Link
                    href={`/high-da-backlinks/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={500}
                      height={280}
                      className="blog-card-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </Link>
                </div>

                {/* Card Title - Clickable (Opens in new window) */}
                <div className="blog-card-body" style={{ padding: "20px 22px", flexGrow: 1, display: "flex", alignItems: "center" }}>
                  <h3 className="blog-card-title" style={{ margin: 0, fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.45 }}>
                    <Link
                      href={`/high-da-backlinks/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0f172a", textDecoration: "none" }}
                    >
                      {post.title}
                    </Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH-CONVERTING CTA BANNER */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, #1e40af 0%, #4361ee 50%, #06b6d4 100%)",
            borderRadius: "6px",
            padding: "44px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 20px 40px rgba(67, 97, 238, 0.25)"
          }}>
            <div style={{ maxWidth: "680px" }}>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginBottom: "10px", lineHeight: "1.3" }}>
                Need High-Tier Editorial Backlinks &amp; Digital PR?
              </h3>
              <p style={{ fontSize: "1.05rem", color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6", margin: 0 }}>
                Don&apos;t have time for manual submissions? Let {siteSettings.expert_name}&apos;s link building team secure high-authority contextual backlinks that drive real keyword rank jumps.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/services/backlink-service-in-bangladesh"
                style={{
                  padding: "14px 28px",
                  background: "#ffffff",
                  color: "#1e40af",
                  fontWeight: 800,
                  fontSize: "1rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>Hire Backlink Expert</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link
                href="/services/backlink-service-in-bangladesh#pricing-packages"
                style={{
                  padding: "14px 24px",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                View Backlink Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
