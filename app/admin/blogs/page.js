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
      <div className="text-slate-400 py-20 text-center">
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading blog posts...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} posts published</p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditPost(null); }}
          className="btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm"
        >
          <i className="fa-solid fa-plus mr-2"></i>Add New Post
        </button>
      </div>

      {/* Status */}
      {saveMsg && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-check"></i> {saveMsg}
        </div>
      )}
      {error && (
        <div className="bg-amber-500/15 border border-amber-500/30 text-amber-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i> {error}
        </div>
      )}

      {/* Add / Edit Form */}
      {(showAddForm || editPost) && (
        <BlogForm
          initial={editPost || emptyPost}
          onSave={editPost ? handleUpdate : handleAdd}
          onCancel={() => { setShowAddForm(false); setEditPost(null); }}
          saving={saving}
          isEdit={!!editPost}
        />
      )}

      {/* Search */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        <input
          type="text"
          placeholder="Search posts by title or category..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Posts Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Slug</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-700/30 transition">
                  <td className="px-5 py-3.5 font-medium text-white max-w-xs">
                    <div className="truncate">{post.title}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="bg-primary/15 text-primary text-xs px-2.5 py-1 rounded-full font-semibold">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">{post.date || post.publish_date}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-cyan-400 max-w-xs">
                    <div className="truncate">/blog/{post.slug}</div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition"
                        title="View post"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                      <button
                        onClick={() => { setEditPost(post); setShowAddForm(false); }}
                        className="text-xs text-cyan-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition"
                      >
                        <i className="fa-solid fa-pen-to-square mr-1"></i>Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(post.id)}
                        className="text-xs text-rose-400 hover:text-white px-2 py-1 rounded hover:bg-rose-500/20 transition"
                      >
                        <i className="fa-solid fa-trash mr-1"></i>Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 className="text-white font-bold text-lg">Delete Post?</h3>
              <p className="text-slate-400 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 btn px-4 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={saving}
                className="flex-1 btn px-4 py-2.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 text-sm font-semibold"
              >
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogForm({ initial, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial, tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : "" });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setAuthor = (key, val) => setForm((p) => ({ ...p, author: { ...p.author, [key]: val } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      excerpt: form.summary,
    };
    onSave(payload);
  };

  return (
    <div className="bg-slate-800 border border-primary/40 rounded-xl overflow-hidden shadow-lg shadow-primary/10">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900/50">
        <h2 className="font-bold text-white text-sm">
          <i className="fa-solid fa-pen-nib mr-2 text-primary"></i>
          {isEdit ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white transition text-sm">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="field-label">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => set("title", e.target.value)}
              className="cms-input" placeholder="e.g. Complete Guide to Technical SEO in 2026" />
          </div>
          <div>
            <label className="field-label">Slug (URL)</label>
            <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)}
              className="cms-input font-mono text-xs" placeholder="auto-generated from title" />
          </div>
          <div>
            <label className="field-label">Category *</label>
            <input type="text" required value={form.category} onChange={(e) => set("category", e.target.value)}
              className="cms-input" placeholder="e.g. Technical SEO, AI & Search" />
          </div>
          <div>
            <label className="field-label">Publish Date</label>
            <input type="date" value={form.date || form.publish_date} onChange={(e) => { set("date", e.target.value); set("publish_date", e.target.value); }}
              className="cms-input" />
          </div>
          <div>
            <label className="field-label">Read Time</label>
            <input type="text" value={form.read_time} onChange={(e) => set("read_time", e.target.value)}
              className="cms-input" placeholder="5 min read" />
          </div>
          <div>
            <label className="field-label">Featured Image URL</label>
            <input type="text" value={form.featured_image} onChange={(e) => { set("featured_image", e.target.value); set("image", e.target.value); }}
              className="cms-input" placeholder="/images/blog1.jpg" />
          </div>
          <div>
            <label className="field-label">Tags (comma separated)</label>
            <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)}
              className="cms-input" placeholder="SEO, Technical, Google" />
          </div>
        </div>

        <div>
          <label className="field-label">Summary / Excerpt *</label>
          <textarea rows={2} required value={form.summary} onChange={(e) => { set("summary", e.target.value); set("excerpt", e.target.value); }}
            className="cms-input resize-none" placeholder="Short description shown on blog listing page" />
        </div>

        <div>
          <label className="field-label">Content (HTML) *</label>
          <textarea rows={12} required value={form.content} onChange={(e) => set("content", e.target.value)}
            className="cms-input font-mono text-xs resize-y" placeholder="<h2>Section Title</h2><p>Your content...</p>" />
          <p className="text-xs text-slate-500 mt-1">Write content in HTML format. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; tags.</p>
        </div>

        {/* Author */}
        <div className="border-t border-slate-700 pt-4">
          <p className="text-xs font-bold uppercase text-slate-400 mb-3">Author Info</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Author Name</label>
              <input type="text" value={form.author?.name || ""} onChange={(e) => setAuthor("name", e.target.value)} className="cms-input" />
            </div>
            <div>
              <label className="field-label">Author Role</label>
              <input type="text" value={form.author?.role || ""} onChange={(e) => setAuthor("role", e.target.value)} className="cms-input" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm transition">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
            {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i>{isEdit ? "Update Post" : "Publish Post"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
