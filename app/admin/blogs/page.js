"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCMS } from "@/lib/useCMS";

export default function AdminBlogsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [posts, setPosts] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const emptyPost = {
    id: Date.now(),
    title: "",
    slug: "",
    category: "",
    publish_date: new Date().toISOString().split("T")[0],
    date: new Date().toISOString().split("T")[0],
    read_time: "5 min read",
    featured_image: "/images/blog1.jpg",
    image: "/images/blog1.jpg",
    summary: "",
    excerpt: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    tags: [],
    author: {
      name: "Abdullah Saleh",
      role: "SEO Specialist & Growth Strategist",
      bio: "Abdullah Saleh is an Organic Business Growth Specialist and SEO Expert.",
      avatar: "/images/abdullah.jpg",
    },
    content: "<h2>Introduction</h2><p>Write your blog content here...</p>",
  };

  useEffect(() => {
    if (data?.blogPosts) setPosts(data.blogPosts);
  }, [data]);

  const filtered = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSavePosts = async (updated) => {
    setPosts(updated);
    await saveSection("blogPosts", updated);
  };

  const handleAdd = async (form) => {
    const newPost = { ...form, id: Date.now(), slug: form.slug || slugify(form.title) };
    const updated = [newPost, ...posts];
    await handleSavePosts(updated);
    setShowAddForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = posts.map((p) => (p.id === form.id ? form : p));
    await handleSavePosts(updated);
    setEditPost(null);
  };

  const handleDelete = async (id) => {
    const updated = posts.filter((p) => p.id !== id);
    await handleSavePosts(updated);
    setDeleteId(null);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading blog posts...
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
      <div className="admin-page-header" style={{ marginBottom: "0" }}>
        <div>
          <h1 className="admin-page-title">Blog Articles Management</h1>
          <p className="admin-page-desc">{posts.length} published articles and ranking assets</p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditPost(null); }}
          className="btn-admin btn-admin-primary"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Add New Post</span>
        </button>
      </div>

      {/* Status Notifications */}
      {saveMsg && (
        <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#059669", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-circle-check"></i>
          <span>{saveMsg}</span>
        </div>
      )}
      {error && (
        <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#e11d48", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Add / Edit Form Modal or Card */}
      {(showAddForm || editPost) && (
        <BlogForm
          initial={editPost || emptyPost}
          onSave={editPost ? handleUpdate : handleAdd}
          onCancel={() => { setShowAddForm(false); setEditPost(null); }}
          saving={saving}
          isEdit={!!editPost}
        />
      )}

      {/* Search Bar */}
      <div style={{ position: "relative", width: "100%" }}>
        <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "14px" }}></i>
        <input
          type="text"
          placeholder="Search articles by title or category..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          style={{
            width: "100%",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            padding: "10px 14px 10px 40px",
            color: "#0f172a",
            fontSize: "13.5px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

      {/* Posts Table - Compact, 100% visible without horizontal scroll */}
      <div className="admin-table-card" style={{ marginBottom: "0" }}>
        <div className="admin-table-container">
          <table className="admin-data-table" style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "45%" }}>Article Title & URL</th>
                <th style={{ width: "20%" }}>Category</th>
                <th style={{ width: "15%" }}>Publish Date</th>
                <th style={{ width: "20%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id}>
                  {/* Title & Slug */}
                  <td style={{ verticalAlign: "middle" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px", lineHeight: "1.3", marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={post.title}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      /blog/{post.slug}
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ verticalAlign: "middle" }}>
                    <span style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", border: "1px solid #dbeafe", fontSize: "11.5px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {post.category || "General"}
                    </span>
                  </td>

                  {/* Date */}
                  <td style={{ verticalAlign: "middle", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>
                    {post.date || post.publish_date || "2026-09-10"}
                  </td>

                  {/* Direct Actions in full view without scroll */}
                  <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                      {/* View Link */}
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-admin btn-admin-outline btn-admin-sm"
                        title="View Live Post"
                        style={{ padding: "5px 8px" }}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "12px" }}></i>
                      </a>

                      {/* Edit Button */}
                      <button
                        onClick={() => { setEditPost(post); setShowAddForm(false); }}
                        className="btn-admin btn-admin-primary btn-admin-sm"
                        title="Edit Post"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Edit</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setDeleteId(post.id)}
                        className="btn-admin btn-admin-danger btn-admin-sm"
                        title="Delete Post"
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
                    No blog posts found. Click "+ Add New Post" to publish one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", maxWidth: "400px", width: "100%", boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ width: "48px", height: "48px", background: "#fff1f2", color: "#e11d48", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "20px" }}>
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>Delete Blog Post?</h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>This action cannot be undone and will remove the post.</p>
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
  const [form, setForm] = useState({ 
    ...initial, 
    meta_description: initial.meta_description || initial.summary || initial.excerpt || "",
    meta_title: initial.meta_title || initial.title || "",
    meta_keywords: initial.meta_keywords || (Array.isArray(initial.tags) ? initial.tags.join(", ") : ""),
    tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : initial.tags || ""
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setAuthor = (key, val) => setForm((p) => ({ ...p, author: { ...p.author, [key]: val } }));

  const metaDescLen = form.meta_description?.length || 0;
  const metaTitleLen = form.meta_title?.length || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      meta_description: form.meta_description || form.summary || form.excerpt,
      meta_title: form.meta_title || form.title,
      meta_keywords: form.meta_keywords || form.tags,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      excerpt: form.summary || form.meta_description,
      summary: form.summary || form.meta_description
    };
    onSave(payload);
  };

  return (
    <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
        <h2 style={{ fontWeight: 800, color: "#0f172a", fontSize: "15px", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-pen-nib" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit Blog Post & SEO" : "Add New Blog Post & SEO"}</span>
        </h2>
        <button onClick={onCancel} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "16px" }}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Basic Info */}
        <div>
          <h3 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <i className="fa-solid fa-file-lines" style={{ color: "#2563eb" }}></i>
            <span>Article General Information</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>Post Title *</label>
              <input 
                type="text" 
                required 
                value={form.title} 
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!form.meta_title || form.meta_title === form.title) {
                    set("meta_title", e.target.value);
                  }
                }}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                placeholder="e.g. Complete Guide to Technical SEO in 2026" 
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>Slug (URL)</label>
              <input 
                type="text" 
                value={form.slug} 
                onChange={(e) => set("slug", e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "12.5px", fontFamily: "monospace", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                placeholder="auto-generated from title" 
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>Category *</label>
              <input 
                type="text" 
                required 
                value={form.category} 
                onChange={(e) => set("category", e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                placeholder="e.g. Technical SEO, AI & Search" 
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>Publish Date</label>
              <input 
                type="date" 
                value={form.date || form.publish_date} 
                onChange={(e) => { set("date", e.target.value); set("publish_date", e.target.value); }}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>Read Time</label>
              <input 
                type="text" 
                value={form.read_time} 
                onChange={(e) => set("read_time", e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                placeholder="5 min read" 
              />
            </div>
          </div>
        </div>

        {/* SEO & Meta */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <i className="fa-solid fa-magnifying-glass-chart" style={{ color: "#059669" }}></i>
            <span>Google Search & Meta Tags</span>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>Meta Title</label>
                <span style={{ fontSize: "11px", color: metaTitleLen > 60 ? "#e11d48" : "#059669", fontWeight: 700 }}>{metaTitleLen}/60 chars</span>
              </div>
              <input 
                type="text" 
                value={form.meta_title} 
                onChange={(e) => set("meta_title", e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                placeholder="Meta title displayed on Google SERP" 
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>Meta Description</label>
                <span style={{ fontSize: "11px", color: metaDescLen > 160 ? "#e11d48" : "#059669", fontWeight: 700 }}>{metaDescLen}/160 chars</span>
              </div>
              <textarea 
                rows={2}
                value={form.meta_description} 
                onChange={(e) => set("meta_description", e.target.value)}
                style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "#0f172a", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                placeholder="Meta description for search results" 
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>Article HTML Content *</label>
          <textarea 
            rows={8}
            required
            value={form.content} 
            onChange={(e) => set("content", e.target.value)}
            style={{ width: "100%", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px", fontSize: "13px", fontFamily: "monospace", color: "#0f172a", outline: "none", boxSizing: "border-box", resize: "vertical" }}
            placeholder="<h2>Section Heading</h2><p>Write your article...</p>" 
          />
        </div>

        {/* Form Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
          <button type="button" onClick={onCancel} className="btn-admin btn-admin-outline">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-admin btn-admin-primary">
            {saving ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Saving Article...</>
            ) : (
              <><i className="fa-solid fa-floppy-disk"></i> {isEdit ? "Update Article" : "Publish Article"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
