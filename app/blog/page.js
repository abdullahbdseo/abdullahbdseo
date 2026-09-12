"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, siteSettings } from "@/lib/data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "AI & Search Evolution", name: "AI & Search Evolution" },
    { id: "Technical SEO", name: "Technical SEO" },
    { id: "Keyword Research", name: "Keyword Research" },
    { id: "E-Commerce SEO", name: "E-Commerce SEO" }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const featuredPost = blogPosts[0]; // Featured spotlight post
  const displayPosts = selectedCategory === "all" && searchQuery === "" 
    ? filteredPosts.slice(1) 
    : filteredPosts;

  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero-section">
        <div className="container text-center">
          <span className="blog-badge">
            <i className="fa-solid fa-graduation-cap"></i> SEO Knowledge Center
          </span>
          <h1 className="blog-hero-title">Actionable SEO &amp; Organic Growth Guides</h1>
          <p className="blog-hero-subtitle">
            Battle-tested technical frameworks, generative AI search playbooks, and conversion architectures written by experienced organic practitioners.
          </p>

          {/* Search Bar */}
          <div className="blog-search-bar">
            <i className="fa-solid fa-magnifying-glass blog-search-icon"></i>
            <input 
              type="text" 
              placeholder="Search by keyword, topic, or schema..." 
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
          {/* FEATURED SPOTLIGHT ARTICLE (Only on default view) */}
          {selectedCategory === "all" && searchQuery === "" && featuredPost && (
            <div className="blog-featured-card">
              <div className="blog-featured-media">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Image 
                    src={featuredPost.featured_image || featuredPost.image} 
                    alt={featuredPost.title} 
                    width={700} 
                    height={400} 
                    className="blog-featured-img"
                    priority
                  />
                </Link>
              </div>

              <div className="blog-featured-body">
                <div className="blog-featured-tag">
                  <i className="fa-solid fa-bolt"></i> Featured Guide • {featuredPost.category}
                </div>

                <h2 className="blog-featured-title">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>

                <p className="blog-featured-excerpt">{featuredPost.summary}</p>

                <div className="blog-card-footer" style={{ borderTop: "none", paddingTop: 0 }}>
                  <div className="blog-author-info">
                    <Image 
                      src={featuredPost.author?.avatar || siteSettings.profile_photo} 
                      alt={featuredPost.author?.name || siteSettings.expert_name} 
                      width={32} 
                      height={32} 
                      className="author-mini-avatar"
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="author-mini-name">{featuredPost.author?.name || siteSettings.expert_name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{featuredPost.publish_date} • {featuredPost.read_time}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="read-more-link" style={{ fontSize: "0.95rem" }}>
                    Read Masterclass <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* GRID HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "26px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              {selectedCategory === "all" && searchQuery === "" ? "Latest Strategy Guides" : `Found ${filteredPosts.length} Guides`}
            </h2>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
              Showing {selectedCategory === "all" && searchQuery === "" ? displayPosts.length + 1 : filteredPosts.length} Articles
            </span>
          </div>

          {/* BLOG GRID */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#ffffff", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <i className="fa-solid fa-book-open" style={{ fontSize: "2.5rem", color: "#94a3b8", marginBottom: "14px" }}></i>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>No guides found</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "16px" }}>Try searching with a different term or clear the category filter.</p>
              <button onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }} className="btn btn-primary btn-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blog-posts-grid">
              {displayPosts.map((post) => (
                <article key={post.slug || post.id} className="blog-card">
                  <div className="blog-card-image-wrap">
                    <Link href={`/blog/${post.slug}`}>
                      <Image 
                        src={post.featured_image || post.image} 
                        alt={post.title} 
                        width={500} 
                        height={280} 
                        className="blog-card-img"
                      />
                    </Link>
                    <span className="blog-category-badge">{post.category}</span>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-meta-line">
                      <span><i className="fa-regular fa-calendar" style={{ color: "#4361ee" }}></i> {post.publish_date}</span>
                      <span><i className="fa-regular fa-clock" style={{ color: "#10b981" }}></i> {post.read_time}</span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="blog-card-excerpt">{post.summary}</p>

                    <div className="blog-card-footer">
                      <div className="blog-author-info">
                        <Image 
                          src={post.author?.avatar || siteSettings.profile_photo} 
                          alt={post.author?.name || siteSettings.expert_name} 
                          width={28} 
                          height={28} 
                          className="author-mini-avatar"
                        />
                        <span className="author-mini-name">{post.author?.name || siteSettings.expert_name}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="read-more-link">
                        Read Guide <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
