"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCMS } from "@/lib/useCMS";

const PRESET_IMAGES = [
  { label: "SEO & Growth 3D Hero", url: "/images/seo_hero_3d.png" },
  { label: "AEO & Voice Search", url: "/images/blog_aeo_voice_search.jpg" },
  { label: "AI & Technical SEO", url: "/images/blog_ai_technical_seo.jpg" },
  { label: "Keyword Strategy Silos", url: "/images/blog_keyword_strategy.jpg" },
  { label: "E-Commerce SEO Scale", url: "/images/blog_ecommerce_seo.jpg" },
  { label: "Entity & EEAT Strategy", url: "/images/blog_ai_content_eeat.jpg" },
  { label: "AI Search Dominance", url: "/images/blog_ai_search_dominance.jpg" },
  { label: "AI Overviews & GEO", url: "/images/blog_ai_overviews_geo.jpg" },
  { label: "Technical Audit Blueprint", url: "/images/blog_tech_seo.jpg" },
  { label: "General Blog Cover 1", url: "/images/blog1.jpg" },
  { label: "General Blog Cover 2", url: "/images/blog2.jpg" },
  { label: "General Blog Cover 3", url: "/images/blog3.jpg" },
];

export default function AdminBlogsPage() {
  const { data, loading, saving, error, saveMsg, saveSection, refetch } = useCMS();
  const [posts, setPosts] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const emptyPost = {
    id: Date.now(),
    title: "",
    slug: "",
    category: "Technical SEO",
    publish_date: new Date().toISOString().split("T")[0],
    date: new Date().toISOString().split("T")[0],
    read_time: "7 min read",
    featured_image: "/images/blog_tech_seo.jpg",
    image: "/images/blog_tech_seo.jpg",
    summary: "",
    excerpt: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    tags: ["Technical SEO", "Organic Growth", "Google Rankings"],
    author: {
      name: "Abdullah Saleh",
      role: "Lead SEO Strategist & AI Search Architect",
      bio: "Abdullah Saleh is an Organic Business Growth Specialist and Technical SEO Expert helping global brands achieve #1 Google rankings.",
      avatar: "/images/abdullah.jpg",
    },
    content: `<h2>Executive Overview</h2>
<p>Write your detailed executive summary and key insights here...</p>

<div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 18px 22px; margin: 24px 0; border-radius: 0 8px 8px 0;">
  <strong style="color: #1e40af; font-size: 1.05rem; display: block; margin-bottom: 6px;">💡 Strategic Key Insight:</strong>
  <p style="margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.6;">Key takeaway or core framework for search ranking success.</p>
</div>

<h2>1. Foundational Architecture & Analysis</h2>
<p>Explain the step-by-step strategy and optimization steps with actionable advice.</p>`,
  };

  useEffect(() => {
    if (data?.blogPosts) {
      setPosts(data.blogPosts);
    }
  }, [data]);

  const categories = ["all", ...new Set(posts.map((p) => p.category).filter(Boolean))];

  const filtered = posts.filter((p) => {
    const q = searchQ.toLowerCase();
    const matchesSearch =
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q)));

    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSavePosts = async (updated) => {
    setPosts(updated);
    await saveSection("blogPosts", updated);
  };

  const handleAdd = async (form) => {
    const newPost = {
      ...form,
      id: Date.now(),
      slug: form.slug || slugify(form.title),
      date: form.publish_date || form.date,
      publish_date: form.publish_date || form.date,
    };
    const updated = [newPost, ...posts];
    await handleSavePosts(updated);
    setShowAddForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = posts.map((p) =>
      p.id === form.id || p.slug === form.slug ? { ...form, date: form.publish_date, publish_date: form.publish_date } : p
    );
    await handleSavePosts(updated);
    setEditPost(null);
  };

  const handleDelete = async (idOrSlug) => {
    const updated = posts.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
    await handleSavePosts(updated);
    setDeleteId(null);
  };

  const handleDuplicate = async (post) => {
    const dupPost = {
      ...post,
      id: Date.now(),
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Math.random().toString(36).substring(2, 6)}`,
      publish_date: new Date().toISOString().split("T")[0],
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [dupPost, ...posts];
    await handleSavePosts(updated);
  };

  const [refreshing, setRefreshing] = useState(false);
  const handleAutoRefresh = async () => {
    if (!confirm("This will update all blog post modification timestamps to current date, signaling freshness to Googlebot. Continue?")) return;
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/blogs/refresh", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        alert(json.message);
        refetch();
      }
    } catch (e) {
      alert("Refresh failed");
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
        Loading blog posts...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header" style={{ marginBottom: "0" }}>
        <div>
          <h1 className="admin-page-title">Blog Articles & Content CMS</h1>
          <p className="admin-page-desc">
            {posts.length} live articles • Manage, publish, edit, and optimize SEO meta tags
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleAutoRefresh}
            disabled={refreshing}
            className="btn-admin btn-admin-outline"
            title="Update all modification timestamps for Google Freshness algorithm"
          >
            <i className={`fa-solid ${refreshing ? "fa-spinner fa-spin" : "fa-wand-magic-sparkles"}`} style={{ color: "#7c3aed" }}></i>
            <span>{refreshing ? "Refreshing..." : "Auto-Refresh Old Posts"}</span>
          </button>
          <button onClick={() => refetch()} className="btn-admin btn-admin-outline" title="Refresh from database">
            <i className="fa-solid fa-rotate"></i>
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditPost(null);
            }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Post</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveMsg && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#059669",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "13.5px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fa-solid fa-circle-check"></i>
          <span>{saveMsg}</span>
        </div>
      )}
      {error && (
        <div
          style={{
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            color: "#e11d48",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "13.5px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Form Editor Modal / View */}
      {(showAddForm || editPost) && (
        <BlogForm
          initial={editPost || emptyPost}
          onSave={editPost ? handleUpdate : handleAdd}
          onCancel={() => {
            setShowAddForm(false);
            setEditPost(null);
          }}
          saving={saving}
          isEdit={!!editPost}
        />
      )}

      {/* Search & Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "14px 18px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "14px",
            }}
          ></i>
          <input
            type="text"
            placeholder="Search articles by title, slug, tag, or category..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            style={{
              width: "100%",
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "9px 14px 9px 40px",
              color: "#0f172a",
              fontSize: "13.5px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#64748b" }}>Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontWeight: 600,
              background: "#ffffff",
              color: "#334155",
              outline: "none",
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="admin-table-card" style={{ marginBottom: "0" }}>
        <div className="admin-table-container">
          <table className="admin-data-table" style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "45%" }}>Article Title & URL</th>
                <th style={{ width: "20%" }}>Category & Tags</th>
                <th style={{ width: "15%" }}>Publish Date</th>
                <th style={{ width: "20%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.slug || post.id}>
                  {/* Title & Slug */}
                  <td style={{ verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "36px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "#e2e8f0",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={post.featured_image || post.image || "/images/blog1.jpg"}
                          alt={post.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                            fontSize: "13.5px",
                            lineHeight: "1.3",
                            marginBottom: "3px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={post.title}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            fontSize: "11.5px",
                            color: "#2563eb",
                            fontFamily: "monospace",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          /blog/{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ verticalAlign: "middle" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#eff6ff",
                        color: "#2563eb",
                        border: "1px solid #dbeafe",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "20px",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {post.category || "General"}
                    </span>
                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "3px" }}>
                        {post.tags.slice(0, 2).join(", ")}
                        {post.tags.length > 2 ? ` +${post.tags.length - 2}` : ""}
                      </div>
                    )}
                  </td>

                  {/* Date */}
                  <td style={{ verticalAlign: "middle", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>
                    <div>{post.publish_date || post.date || "Recent"}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{post.read_time || "5 min read"}</div>
                  </td>

                  {/* Actions */}
                  <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-admin btn-admin-outline btn-admin-sm"
                        title="View Live Article"
                        style={{ padding: "5px 8px" }}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "12px" }}></i>
                      </a>

                      <button
                        onClick={() => handleDuplicate(post)}
                        className="btn-admin btn-admin-outline btn-admin-sm"
                        title="Duplicate Post"
                        style={{ padding: "5px 8px" }}
                      >
                        <i className="fa-solid fa-copy" style={{ fontSize: "12px" }}></i>
                      </button>

                      <button
                        onClick={() => {
                          setEditPost(post);
                          setShowAddForm(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="btn-admin btn-admin-primary btn-admin-sm"
                        title="Edit Post & SEO"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteId(post.id || post.slug)}
                        className="btn-admin btn-admin-danger btn-admin-sm"
                        title="Delete Post"
                        style={{ padding: "5px 8px" }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    No blog posts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#fff1f2",
                  color: "#e11d48",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: "20px",
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                Delete Article?
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                This action cannot be undone and will permanently remove this blog post from your website and SEO archives.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setDeleteId(null)} className="btn-admin btn-admin-outline" style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={saving}
                className="btn-admin btn-admin-danger"
                style={{ flex: 1 }}
              >
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogForm({ initial, onSave, onCancel, saving, isEdit }) {
  const [activeView, setActiveView] = useState("edit"); // "edit" | "preview"
  const [form, setForm] = useState({
    ...initial,
    meta_description: initial.meta_description || initial.summary || initial.excerpt || "",
    meta_title: initial.meta_title || initial.title || "",
    meta_keywords: initial.meta_keywords || (Array.isArray(initial.tags) ? initial.tags.join(", ") : ""),
    tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : initial.tags || "",
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const metaDescLen = form.meta_description?.length || 0;
  const metaTitleLen = form.meta_title?.length || 0;

  const insertSnippet = (snippet) => {
    set("content", (prev) => prev + "\n\n" + snippet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      meta_description: form.meta_description || form.summary || form.excerpt,
      meta_title: form.meta_title || form.title,
      meta_keywords: form.meta_keywords || form.tags,
      tags: typeof form.tags === "string" ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : form.tags,
      excerpt: form.summary || form.meta_description,
      summary: form.summary || form.meta_description,
      featured_image: form.featured_image || form.image,
      image: form.featured_image || form.image,
    };
    onSave(payload);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px",
      }}
    >
      {/* Form Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 22px",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2
            style={{
              fontWeight: 800,
              color: "#0f172a",
              fontSize: "16px",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fa-solid fa-pen-nib" style={{ color: "#2563eb" }}></i>
            <span>{isEdit ? "Edit Article & Google SERP Meta" : "Create & Publish New SEO Guide"}</span>
          </h2>

          {/* Toggle Edit / Preview */}
          <div style={{ display: "flex", background: "#e2e8f0", borderRadius: "8px", padding: "3px" }}>
            <button
              type="button"
              onClick={() => setActiveView("edit")}
              style={{
                padding: "4px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                background: activeView === "edit" ? "#ffffff" : "transparent",
                color: activeView === "edit" ? "#2563eb" : "#64748b",
              }}
            >
              <i className="fa-solid fa-pen" style={{ marginRight: "5px" }}></i>
              Edit Mode
            </button>
            <button
              type="button"
              onClick={() => setActiveView("preview")}
              style={{
                padding: "4px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                background: activeView === "preview" ? "#ffffff" : "transparent",
                color: activeView === "preview" ? "#2563eb" : "#64748b",
              }}
            >
              <i className="fa-solid fa-eye" style={{ marginRight: "5px" }}></i>
              Live Preview
            </button>
          </div>
        </div>

        <button
          onClick={onCancel}
          style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "18px" }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {activeView === "preview" ? (
        /* LIVE PREVIEW VIEW */
        <div style={{ padding: "30px", background: "#ffffff" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {form.category}
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", margin: "14px 0" }}>
              {form.title || "Untitled Article"}
            </h1>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
              Published on {form.publish_date} • {form.read_time} • By Abdullah Saleh
            </div>
            {form.featured_image && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "360px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "24px",
                }}
              >
                <Image src={form.featured_image} alt={form.title} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <div
              style={{ lineHeight: "1.8", color: "#334155", fontSize: "15px" }}
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </div>
        </div>
      ) : (
        /* EDIT FORM */
        <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* SECTION 1: BASIC METRICS */}
          <div>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#475569",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-file-lines" style={{ color: "#2563eb" }}></i>
              <span>Article Overview & Details</span>
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => {
                    set("title", e.target.value);
                    if (!form.meta_title || form.meta_title === form.title) {
                      set("meta_title", e.target.value);
                    }
                    if (!form.slug || isEdit === false) {
                      set(
                        "slug",
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")
                      );
                    }
                  }}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "#0f172a",
                    fontWeight: 600,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="e.g. Masterclass on Entity SEO and Topic Clusters"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  URL Slug (/blog/[slug])
                </label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    color: "#2563eb",
                    fontWeight: 600,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13.5px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="e.g. Technical SEO, AI & Search Evolution"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Publish Date
                </label>
                <input
                  type="date"
                  value={form.publish_date || form.date}
                  onChange={(e) => {
                    set("publish_date", e.target.value);
                    set("date", e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13.5px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Read Time
                </label>
                <input
                  type="text"
                  value={form.read_time}
                  onChange={(e) => set("read_time", e.target.value)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13.5px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="8 min read"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: FEATURED IMAGE SELECTION */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "18px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#475569",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-image" style={{ color: "#7c3aed" }}></i>
              <span>Featured Media & Thumbnail</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Image Path / URL:
                </label>
                <input
                  type="text"
                  value={form.featured_image || form.image}
                  onChange={(e) => {
                    set("featured_image", e.target.value);
                    set("image", e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13px",
                    color: "#0f172a",
                    fontFamily: "monospace",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
                  Or pick from high-converting stock library:
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        set("featured_image", img.url);
                        set("image", img.url);
                      }}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "6px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        border:
                          form.featured_image === img.url
                            ? "2px solid #2563eb"
                            : "1px solid #cbd5e1",
                        background:
                          form.featured_image === img.url ? "#eff6ff" : "#ffffff",
                        color:
                          form.featured_image === img.url ? "#2563eb" : "#334155",
                        cursor: "pointer",
                      }}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: SEO & GOOGLE SERP PREVIEW */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "18px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#475569",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-magnifying-glass-chart" style={{ color: "#059669" }}></i>
              <span>Google SERP Preview & Meta Tags</span>
            </h3>

            {/* Live Google Search Snippet Box */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px 20px",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i>
                <span>Google Search Result Snippet Preview</span>
              </div>
              <div style={{ fontSize: "13px", color: "#202124", fontFamily: "arial, sans-serif" }}>
                <div style={{ fontSize: "12px", color: "#202124", marginBottom: "2px" }}>
                  https://abdullahbdseo.vercel.app &rsaquo; blog &rsaquo; {form.slug || "article-url"}
                </div>
                <div style={{ fontSize: "18px", color: "#1a0dab", fontWeight: 500, cursor: "pointer", lineHeight: "1.3" }}>
                  {form.meta_title || form.title || "Your Meta Title Displayed on Google"}
                </div>
                <div style={{ fontSize: "13px", color: "#4d5156", marginTop: "4px", lineHeight: "1.4" }}>
                  {form.meta_description || form.summary || "Your meta description summary will appear here in Google Search results..."}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155" }}>
                    SEO Meta Title (Title Tag)
                  </label>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: metaTitleLen > 60 ? "#e11d48" : "#059669",
                      fontWeight: 700,
                    }}
                  >
                    {metaTitleLen}/60 characters {metaTitleLen > 60 ? "(Too Long)" : "(Optimal)"}
                  </span>
                </div>
                <input
                  type="text"
                  value={form.meta_title}
                  onChange={(e) => set("meta_title", e.target.value)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13.5px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155" }}>
                    SEO Meta Description & Summary
                  </label>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: metaDescLen > 160 ? "#e11d48" : "#059669",
                      fontWeight: 700,
                    }}
                  >
                    {metaDescLen}/160 characters {metaDescLen > 160 ? "(Too Long)" : "(Optimal)"}
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={form.meta_description}
                  onChange={(e) => {
                    set("meta_description", e.target.value);
                    set("summary", e.target.value);
                    set("excerpt", e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13.5px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Tags / Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={typeof form.tags === "string" ? form.tags : Array.isArray(form.tags) ? form.tags.join(", ") : ""}
                  onChange={(e) => {
                    set("tags", e.target.value);
                    set("meta_keywords", e.target.value);
                  }}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    fontSize: "13px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="Technical SEO, AEO, Topic Silos, Google Rankings"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: RICH CONTENT & QUICK INSERTERS */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>
                Article HTML & Strategy Content *
              </label>

              {/* Quick Snippet Inserters */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => insertSnippet('<h2>Subheading Title</h2>\n<p>Your content paragraph...</p>')}
                  className="btn-admin btn-admin-outline btn-admin-sm"
                >
                  + H2 Heading
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(
                      '<div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 18px 22px; margin: 24px 0; border-radius: 0 8px 8px 0;">\n  <strong style="color: #1e40af; font-size: 1.05rem; display: block; margin-bottom: 6px;">💡 Strategic Key Insight:</strong>\n  <p style="margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.6;">Key insight here...</p>\n</div>'
                    )
                  }
                  className="btn-admin btn-admin-outline btn-admin-sm"
                >
                  + Key Insight Box
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(
                      '<div style="background: linear-gradient(135deg, #eef2ff 0%, #edf2fe 100%); border: 1px solid #c7d2fe; border-radius: 8px; padding: 24px; margin: 30px 0; text-align: center;">\n  <h3 style="margin: 0 0 10px; color: #1e3a8a;">Ready to Scale Your SEO Growth?</h3>\n  <p style="color: #475569; margin: 0 0 16px;">Schedule your comprehensive technical SEO audit today.</p>\n  <a href="/contact" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 10px 24px; border-radius: 6px; font-weight: 700; text-decoration: none;">Book Free Consultation</a>\n</div>'
                    )
                  }
                  className="btn-admin btn-admin-outline btn-admin-sm"
                >
                  + Conversion CTA Box
                </button>
              </div>
            </div>

            <textarea
              rows={14}
              required
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "13.5px",
                fontFamily: "monospace",
                color: "#0f172a",
                lineHeight: "1.6",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          {/* FORM BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "18px",
            }}
          >
            <button type="button" onClick={onCancel} className="btn-admin btn-admin-outline">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-admin btn-admin-primary">
              {saving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk"></i> {isEdit ? "Update Article" : "Publish Article Live"}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
