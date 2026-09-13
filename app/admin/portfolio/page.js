"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";
import Link from "next/link";

const CATEGORIES = ["SaaS & Enterprise SEO", "E-Commerce SEO", "Local SEO & Map Pack", "Technical & Global SEO"];

export default function AdminPortfolioPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [studies, setStudies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const emptyStudy = {
    id: Date.now(),
    title: "",
    slug: "",
    client_name: "",
    website_url: "",
    industry: "",
    category_name: "SaaS & Enterprise SEO",
    featured_image: "/images/portfolio/proof_gsc_1_18m_scale.jpg",
    summary: "",
    challenge: "",
    strategy: "",
    implementation: [
      "Resolved canonical anomalies and crawl blockers.",
      "Implemented automated JSON-LD schemas.",
      "Built targeted topic cluster silos."
    ],
    results: "",
    metrics: {
      total_clicks: "500K+",
      total_impressions: "1.0M+",
      avg_ctr: "85.0%",
      avg_position: "1.2"
    },
    duration: "3 Months"
  };

  useEffect(() => {
    if (data?.caseStudies) setStudies(data.caseStudies);
  }, [data]);

  const filtered = studies.filter((s) => {
    const q = searchQ.toLowerCase();
    const matchesSearch =
      s.title?.toLowerCase().includes(q) ||
      s.client_name?.toLowerCase().includes(q) ||
      s.industry?.toLowerCase().includes(q) ||
      s.category_name?.toLowerCase().includes(q) ||
      s.slug?.toLowerCase().includes(q);
    const matchesCat = categoryFilter === "all" || s.category_name === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async (updated) => {
    setStudies(updated);
    await saveSection("caseStudies", updated);
  };

  const handleAdd = async (form) => {
    const item = { ...form, id: Date.now(), slug: form.slug || slugify(form.title) };
    await handleSave([...studies, item]);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = studies.map((s) => (s.id === form.id ? form : s));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    await handleSave(studies.filter((s) => s.id !== id));
    setDeleteItem(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading case studies...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Portfolio & Case Studies</h1>
          <p className="admin-page-desc">
            Manage your verified Google Search Console proof, growth trajectories, and client success stories
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Case Study</span>
          </button>
        </div>
      </div>

      {saveMsg && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #6ee7b7",
            color: "#065f46",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="fa-solid fa-circle-check"></i>
          <span>{saveMsg}</span>
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* 2. STATS ROW */}
      <div className="admin-stats-row">
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Published Case Studies</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-trophy"></i>
            </div>
          </div>
          <div className="admin-stat-value">{studies.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Live</span>
            <span>on Portfolio page</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Verified Clicks</span>
            <div className="admin-stat-icon-wrap icon-purple">
              <i className="fa-solid fa-arrow-pointer"></i>
            </div>
          </div>
          <div className="admin-stat-value">2.0M+</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>Combined GSC Traffic</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Peak CTR Record</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-chart-line"></i>
            </div>
          </div>
          <div className="admin-stat-value">92.8%</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>Top Snippet Rank #1</span>
          </div>
        </div>
      </div>

      {/* 3. ADD / EDIT FORM */}
      {(showForm || editItem) && (
        <CaseStudyForm
          initial={editItem || emptyStudy}
          categories={CATEGORIES}
          onSave={editItem ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          saving={saving}
          isEdit={!!editItem}
        />
      )}

      {/* 4. SEARCH & FILTER BAR */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          ></i>
          <input
            type="text"
            placeholder="Search by title, client name, industry..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 34px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "13px",
            outline: "none",
            background: "#ffffff",
            color: "#334155",
            fontWeight: 600,
          }}
        >
          <option value="all">All Industries ({studies.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 5. CASE STUDIES TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Client Case Studies Catalog</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Showing {filtered.length} total case study records
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Case Study / Client</th>
                <th>Category / Industry</th>
                <th>GSC Metrics</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No case studies found. Click "Add New Case Study" to publish one.
                  </td>
                </tr>
              ) : (
                filtered.map((study) => (
                  <tr key={study.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            flexShrink: 0,
                          }}
                        >
                          <i className="fa-solid fa-chart-pie"></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                            {study.title}
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>
                            Client: <span style={{ fontWeight: 600, color: "#334155" }}>{study.client_name || "Confidential"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: "#2563eb", fontSize: "12.5px" }}>
                        {study.category_name}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#64748b" }}>
                        {study.industry}
                      </div>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, background: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: "4px" }}>
                          Clicks: {study.metrics?.total_clicks || "N/A"}
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: 700, background: "#d1fae5", color: "#065f46", padding: "2px 6px", borderRadius: "4px" }}>
                          CTR: {study.metrics?.avg_ctr || "N/A"}
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: 700, background: "#fef3c7", color: "#92400e", padding: "2px 6px", borderRadius: "4px" }}>
                          Pos: {study.metrics?.avg_position || "1.0"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: "12.5px", color: "#475569", fontWeight: 600 }}>
                        {study.duration || "3 Months"}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <Link
                          href={`/portfolio/${study.slug}`}
                          target="_blank"
                          title="View Live Case Study"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#475569" }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </Link>

                        <button
                          onClick={() => { setEditItem(study); setShowForm(false); }}
                          title="Edit Case Study"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#2563eb" }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                          onClick={() => setDeleteItem(study)}
                          title="Delete Case Study"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#ef4444" }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. DELETE MODAL */}
      {deleteItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#fef2f2",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                margin: "0 auto 16px auto",
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "17px", color: "#0f172a", fontWeight: 800 }}>
              Delete Case Study?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              "{deleteItem.title}"
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => setDeleteItem(null)}
                className="btn-admin btn-admin-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteItem.id)}
                disabled={saving}
                style={{
                  background: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  padding: "9px 18px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  cursor: "pointer",
                }}
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CaseStudyForm({ initial, categories, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({
    ...initial,
    metrics: { ...(initial.metrics || {}) },
    implementation: [...(initial.implementation || [])]
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setMetric = (k, v) => setForm((p) => ({ ...p, metrics: { ...p.metrics, [k]: v } }));

  const updateImpl = (i, val) => {
    const arr = [...form.implementation];
    arr[i] = val;
    set("implementation", arr);
  };
  const addImpl = () => set("implementation", [...form.implementation, ""]);
  const removeImpl = (i) => set("implementation", form.implementation.filter((_, idx) => idx !== i));

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #cbd5e1",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-trophy" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit Case Study" : "Add New Case Study"}</span>
        </h2>
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Case Study Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Enterprise SEO Domination: Scaling to 1.18M Organic Clicks"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="enterprise-seo-1-18m-clicks"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontFamily: "monospace",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Client / Brand Name
            </label>
            <input
              type="text"
              value={form.client_name}
              onChange={(e) => set("client_name", e.target.value)}
              placeholder="e.g. Global Digital Solutions"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Industry Category
            </label>
            <select
              value={form.category_name}
              onChange={(e) => set("category_name", e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                background: "#ffffff",
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Industry Tag
            </label>
            <input
              type="text"
              value={form.industry}
              onChange={(e) => set("industry", e.target.value)}
              placeholder="e.g. SaaS / Enterprise Tech"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Duration / Performance Window
            </label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
              placeholder="e.g. 3 Months"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Featured Image / GSC Proof URL
            </label>
            <input
              type="text"
              value={form.featured_image}
              onChange={(e) => set("featured_image", e.target.value)}
              placeholder="/images/portfolio/proof_gsc_1_18m_scale.jpg"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontFamily: "monospace",
              }}
            />
          </div>
        </div>

        {/* GSC METRICS BLOCK */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <i className="fa-brands fa-google" style={{ color: "#4285F4" }}></i>
            <span>Google Search Console Key Performance Indicators</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                Total Clicks
              </label>
              <input
                type="text"
                value={form.metrics.total_clicks || ""}
                onChange={(e) => setMetric("total_clicks", e.target.value)}
                placeholder="1.18M"
                style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                Total Impressions
              </label>
              <input
                type="text"
                value={form.metrics.total_impressions || ""}
                onChange={(e) => setMetric("total_impressions", e.target.value)}
                placeholder="1.28M"
                style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                Average CTR
              </label>
              <input
                type="text"
                value={form.metrics.avg_ctr || ""}
                onChange={(e) => setMetric("avg_ctr", e.target.value)}
                placeholder="92.4%"
                style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                Average Position
              </label>
              <input
                type="text"
                value={form.metrics.avg_position || ""}
                onChange={(e) => setMetric("avg_position", e.target.value)}
                placeholder="1.0"
                style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
            Summary Overview *
          </label>
          <textarea
            rows={3}
            required
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13.5px", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Initial Challenge & Bottlenecks
            </label>
            <textarea
              rows={3}
              value={form.challenge}
              onChange={(e) => set("challenge", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13.5px", resize: "vertical" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Strategic Solution & Execution
            </label>
            <textarea
              rows={3}
              value={form.strategy}
              onChange={(e) => set("strategy", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13.5px", resize: "vertical" }}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155", margin: 0 }}>
              Implementation Action Items ({form.implementation.length})
            </label>
            <button
              type="button"
              onClick={addImpl}
              className="btn-admin btn-admin-outline btn-admin-sm"
              style={{ color: "#2563eb" }}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Action Item</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {form.implementation.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateImpl(i, e.target.value)}
                  placeholder={`Action step #${i + 1}`}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImpl(i)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid #fecaca",
                    background: "#fef2f2",
                    color: "#ef4444",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
            Final Tangible Results
          </label>
          <textarea
            rows={2}
            value={form.results}
            onChange={(e) => set("results", e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13.5px", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn-admin btn-admin-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-floppy-disk"></i>
            <span>{saving ? "Saving..." : isEdit ? "Update Case Study" : "Publish Case Study"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
