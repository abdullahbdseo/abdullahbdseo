"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";
import Link from "next/link";

const CATEGORIES = ["SEO & Analysis", "Calculators & ROI", "Generators & Writers", "Checkers & Validators"];
const COLORS = ["#4361ee", "#06b6d4", "#059669", "#e11d48", "#f59e0b", "#8b5cf6", "#2563eb", "#dc2626"];

export default function AdminToolsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [tools, setTools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteSlug, setDeleteSlug] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const emptyTool = {
    slug: "",
    title: "",
    desc: "",
    icon: "fa-wrench",
    color: "#2563eb",
    bg: "#eff6ff",
    category: "SEO & Analysis",
  };

  useEffect(() => {
    if (data?.freeTools) setTools(data.freeTools);
  }, [data]);

  const filtered = tools.filter((t) => {
    const q = searchQ.toLowerCase();
    const matchesSearch =
      t.title?.toLowerCase().includes(q) ||
      t.desc?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t.slug?.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSave = async (updated) => {
    setTools(updated);
    await saveSection("freeTools", updated);
  };

  const handleAdd = async (form) => {
    const updated = [...tools, form];
    await handleSave(updated);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = tools.map((t) => (t.slug === form.slug ? form : t));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (slug) => {
    const updated = tools.filter((t) => t.slug !== slug);
    await handleSave(updated);
    setDeleteSlug(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading tools catalog...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Free Tools & Lead Generators</h1>
          <p className="admin-page-desc">
            Manage interactive SEO calculators, audit widgets, and inbound lead generator tools
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Tool</span>
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
            <span className="admin-stat-label">Active Free Tools</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
          </div>
          <div className="admin-stat-value">{tools.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Published</span>
            <span>on website</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Tool Categories</span>
            <div className="admin-stat-icon-wrap icon-purple">
              <i className="fa-solid fa-table-cells-large"></i>
            </div>
          </div>
          <div className="admin-stat-value">
            {new Set(tools.map((t) => t.category)).size}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>Interactive Suites</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Matching Query</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-filter"></i>
            </div>
          </div>
          <div className="admin-stat-value">{filtered.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>Filtered Count</span>
          </div>
        </div>
      </div>

      {/* 3. ADD / EDIT FORM */}
      {(showForm || editItem) && (
        <ToolForm
          initial={editItem || emptyTool}
          categories={CATEGORIES}
          colors={COLORS}
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
            placeholder="Search tools by title or slug..."
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
          <option value="all">All Tool Categories ({tools.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 5. TOOLS TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Registered Free Tools</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Showing {filtered.length} free audit and calculator utilities
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Tool Title & Info</th>
                <th>Category</th>
                <th>Slug / Route</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No tools found matching current query.
                  </td>
                </tr>
              ) : (
                filtered.map((tool) => (
                  <tr key={tool.slug}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            background: tool.bg || "#eff6ff",
                            color: tool.color || "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "15px",
                            flexShrink: 0,
                          }}
                        >
                          <i className={`fa-solid ${tool.icon || "fa-wrench"}`}></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                            {tool.title}
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>
                            {tool.desc}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#475569",
                          background: "#f1f5f9",
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        {tool.category}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#2563eb" }}>
                        /tools/{tool.slug}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          target="_blank"
                          title="Open Live Tool"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#475569" }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </Link>

                        <button
                          onClick={() => { setEditItem(tool); setShowForm(false); }}
                          title="Edit Tool"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#2563eb" }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                          onClick={() => setDeleteSlug(tool.slug)}
                          title="Delete Tool"
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
      {deleteSlug && (
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
              Delete Tool "/tools/{deleteSlug}"?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              This will remove the tool entry from the free tools directory.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => setDeleteSlug(null)}
                className="btn-admin btn-admin-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteSlug)}
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

function ToolForm({ initial, categories, colors, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

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
          <i className="fa-solid fa-screwdriver-wrench" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit Tool" : "Add New Tool"}</span>
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
          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Tool Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Keyword Cannibalization Finder"
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
              Slug (URL path) *
            </label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="keyword-cannibalization-finder"
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

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Short Description
            </label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              placeholder="Identify competing internal pages and optimize ranking equity"
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
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
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
              FontAwesome Icon Class
            </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => set("icon", e.target.value)}
              placeholder="fa-magnifying-glass"
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
              Icon Color (Hex)
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
                style={{ width: "38px", height: "38px", borderRadius: "8px", border: "1px solid #cbd5e1", cursor: "pointer" }}
              />
              <input
                type="text"
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontFamily: "monospace",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Background Color (Hex)
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={form.bg}
                onChange={(e) => set("bg", e.target.value)}
                style={{ width: "38px", height: "38px", borderRadius: "8px", border: "1px solid #cbd5e1", cursor: "pointer" }}
              />
              <input
                type="text"
                value={form.bg}
                onChange={(e) => set("bg", e.target.value)}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontFamily: "monospace",
                }}
              />
            </div>
          </div>
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
            <span>{saving ? "Saving..." : isEdit ? "Update Tool" : "Add Tool"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
