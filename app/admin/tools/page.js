"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";
import Link from "next/link";
import { freeTools as defaultFreeTools } from "@/lib/data";

const CATEGORIES = ["SEO & Technical", "SEO & Analysis", "Calculators & ROI", "Generators & Writers", "Checkers & Validators"];
const COLORS = ["#4361ee", "#06b6d4", "#059669", "#e11d48", "#f59e0b", "#8b5cf6", "#2563eb", "#dc2626"];

export default function AdminToolsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [tools, setTools] = useState(() => defaultFreeTools || []);
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
    category: "Calculators & ROI",
  };

  useEffect(() => {
    if (data?.freeTools && Array.isArray(data.freeTools)) {
      let currentList = [...data.freeTools];
      // Auto-merge any default tools (like backlink-package-calculator) if missing in user's remote or cached list
      if (Array.isArray(defaultFreeTools)) {
        const existingSlugs = new Set(currentList.map((t) => t.slug));
        let changed = false;
        defaultFreeTools.forEach((defTool) => {
          if (!existingSlugs.has(defTool.slug)) {
            currentList.push(defTool);
            changed = true;
          }
        });
        if (changed) {
          saveSection("freeTools", currentList);
        }
      }
      setTools(currentList);
    } else if (defaultFreeTools) {
      setTools(defaultFreeTools);
    }
  }, [data, saveSection]);

  const allCategories = ["all", ...new Set([...CATEGORIES, ...tools.map((t) => t.category)].filter(Boolean))];

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

  const handleResetToDefaults = async () => {
    if (confirm("Restore all default built-in SEO tools & calculators (including Backlink Package Calculator)?")) {
      await handleSave(defaultFreeTools);
    }
  };

  const [configTool, setConfigTool] = useState(null);

  const handleSaveConfig = async (toolSlug, updatedConfig) => {
    const updated = tools.map((t) =>
      t.slug === toolSlug ? { ...t, config: updatedConfig } : t
    );
    await handleSave(updated);
    setConfigTool(null);
  };

  const handleAdd = async (form) => {
    const updated = [...tools, form];
    await handleSave(updated);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const origSlug = editItem?.slug || form.slug;
    const updated = tools.map((t) => (t.slug === origSlug ? form : t));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDuplicate = async (tool) => {
    const dup = {
      ...tool,
      title: `${tool.title} (Copy)`,
      slug: `${tool.slug}-copy-${Math.random().toString(36).substring(2, 6)}`,
    };
    const updated = [...tools, dup];
    await handleSave(updated);
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
          <Link
            href="/admin/analytics"
            className="btn-admin"
            style={{
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#047857",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none"
            }}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Live Audit Telemetry</span>
          </Link>

          <Link
            href="/admin/backlink-calculator"
            className="btn-admin"
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none"
            }}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>Backlink Package Calculator</span>
          </Link>

          <button
            onClick={handleResetToDefaults}
            className="btn-admin btn-admin-outline"
            title="Sync and restore all built-in SEO tools"
            style={{ borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
            <span>Sync Default Tools</span>
          </button>

          <button
            onClick={() => { setShowForm(true); setEditItem(null); }}
            className="btn-admin btn-admin-primary"
            style={{ borderRadius: "4px" }}
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
            borderRadius: "4px",
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
            borderRadius: "4px",
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
        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Active Free Tools</span>
            <div className="admin-stat-icon-wrap icon-blue" style={{ borderRadius: "4px" }}>
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
          </div>
          <div className="admin-stat-value">{tools.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Published</span>
            <span>on website</span>
          </div>
        </div>

        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Tool Categories</span>
            <div className="admin-stat-icon-wrap icon-purple" style={{ borderRadius: "4px" }}>
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

        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Matching Query</span>
            <div className="admin-stat-icon-wrap icon-emerald" style={{ borderRadius: "4px" }}>
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
          categories={allCategories.filter(c => c !== "all")}
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
          borderRadius: "4px",
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
              borderRadius: "4px",
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
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            fontSize: "13px",
            outline: "none",
            background: "#ffffff",
            color: "#334155",
            fontWeight: 600,
          }}
        >
          <option value="all">All Tool Categories ({tools.length})</option>
          {allCategories.filter((c) => c !== "all").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 5. TOOLS TABLE */}
      <div className="admin-table-card" style={{ borderRadius: "4px" }}>
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Registered Free Tools</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Showing {filtered.length} free audit and calculator utilities (Configure, Edit, Duplicate, Delete)
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
                            borderRadius: "4px",
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
                          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>{tool.title}</span>
                            {tool.badge && (
                              <span style={{ fontSize: "10.5px", padding: "1px 6px", background: "#e0f2fe", color: "#0369a1", borderRadius: "4px", fontWeight: 700 }}>
                                {tool.badge}
                              </span>
                            )}
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
                          borderRadius: "4px",
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
                        {tool.slug === "backlink-package-calculator" ? (
                          <Link
                            href="/admin/backlink-calculator"
                            title="Configure Rates & Packages"
                            className="btn-admin btn-admin-primary btn-admin-sm"
                            style={{ padding: "5px 9px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px", borderRadius: "4px", textDecoration: "none" }}
                          >
                            <i className="fa-solid fa-sliders"></i>
                            <span>Configure</span>
                          </Link>
                        ) : (
                          <button
                            onClick={() => setConfigTool(tool)}
                            title={`Configure ${tool.title} Parameters & Settings`}
                            className="btn-admin btn-admin-primary btn-admin-sm"
                            style={{ padding: "5px 9px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px", borderRadius: "4px" }}
                          >
                            <i className="fa-solid fa-sliders"></i>
                            <span>Configure</span>
                          </button>
                        )}

                        <Link
                          href={`/tools/${tool.slug}`}
                          target="_blank"
                          title="Open Live Tool"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#475569", borderRadius: "4px" }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </Link>

                        <button
                          onClick={() => { setEditItem(tool); setShowForm(false); }}
                          title="Edit Tool Details"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#2563eb", borderRadius: "4px" }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                          onClick={() => handleDuplicate(tool)}
                          title="Duplicate Tool"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#059669", borderRadius: "4px" }}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>

                        <button
                          onClick={() => setDeleteSlug(tool.slug)}
                          title="Delete Tool"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#ef4444", borderRadius: "4px" }}
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

      {/* 6. TOOL CONFIGURATION MODAL */}
      {configTool && (
        <ToolConfigModal
          tool={configTool}
          onSave={(updatedConfig) => handleSaveConfig(configTool.slug, updatedConfig)}
          onClose={() => setConfigTool(null)}
          saving={saving}
        />
      )}

      {/* 7. DELETE MODAL */}
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
              borderRadius: "4px",
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
                borderRadius: "4px",
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
              This will remove the tool entry from the free tools directory and database.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => setDeleteSlug(null)}
                className="btn-admin btn-admin-outline"
                style={{ borderRadius: "4px" }}
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
                  borderRadius: "4px",
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
        borderRadius: "4px",
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
              value={form.title || ""}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Keyword Cannibalization Finder"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "4px",
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
              value={form.slug || ""}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="keyword-cannibalization-finder"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "4px",
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
              value={form.desc || ""}
              onChange={(e) => set("desc", e.target.value)}
              placeholder="Identify competing internal pages and optimize ranking equity"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "4px",
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
              value={form.category || categories[0]}
              onChange={(e) => set("category", e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "4px",
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
              Badge / Feature Tag (Optional)
            </label>
            <input
              type="text"
              value={form.badge || ""}
              onChange={(e) => set("badge", e.target.value)}
              placeholder="e.g. Live Pricing, 70+ Points, New"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              FontAwesome Icon Class
            </label>
            <input
              type="text"
              value={form.icon || ""}
              onChange={(e) => set("icon", e.target.value)}
              placeholder="fa-magnifying-glass"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "4px",
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
                value={form.color || "#2563eb"}
                onChange={(e) => set("color", e.target.value)}
                style={{ width: "38px", height: "38px", borderRadius: "4px", border: "1px solid #cbd5e1", cursor: "pointer" }}
              />
              <input
                type="text"
                value={form.color || ""}
                onChange={(e) => set("color", e.target.value)}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: "4px",
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
                value={form.bg || "#eff6ff"}
                onChange={(e) => set("bg", e.target.value)}
                style={{ width: "38px", height: "38px", borderRadius: "4px", border: "1px solid #cbd5e1", cursor: "pointer" }}
              />
              <input
                type="text"
                value={form.bg || ""}
                onChange={(e) => set("bg", e.target.value)}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: "4px",
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
            style={{ borderRadius: "4px" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-admin btn-admin-primary"
            style={{ borderRadius: "4px" }}
          >
            <i className="fa-solid fa-floppy-disk"></i>
            <span>{saving ? "Saving..." : isEdit ? "Update Tool" : "Add Tool"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function ToolConfigModal({ tool, onSave, onClose, saving }) {
  const [activeTab, setActiveTab] = useState("branding"); // "branding" | "params" | "faqs" | "json"
  const [cfg, setCfg] = useState(() => {
    const existing = tool.config || {};
    return {
      customHeading: existing.customHeading || "",
      customSubtitle: existing.customSubtitle || "",
      alertNotice: existing.alertNotice || "",
      whatsappNumber: existing.whatsappNumber || "+8801670769816",
      ctaLabel: existing.ctaLabel || "Book Free Consultation",
      ctaUrl: existing.ctaUrl || "/contact",
      basePrice: existing.basePrice ?? 500,
      rateMultiplier: existing.rateMultiplier ?? 1.0,
      currency: existing.currency || "USD",
      requireLeadCapture: !!existing.requireLeadCapture,
      dailyRateLimit: existing.dailyRateLimit || 50,
      faqs: Array.isArray(existing.faqs) ? existing.faqs : [],
      jsonConfigText: existing.jsonConfig ? JSON.stringify(existing.jsonConfig, null, 2) : "{\n  \"engineVersion\": \"2026.1\",\n  \"enableProCalculations\": true\n}"
    };
  });

  const [jsonError, setJsonError] = useState("");

  const updateField = (key, val) => {
    setCfg((prev) => ({ ...prev, [key]: val }));
  };

  const handleAddFaq = () => {
    setCfg((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }));
  };

  const handleUpdateFaq = (idx, field, val) => {
    const updatedFaqs = [...cfg.faqs];
    updatedFaqs[idx] = { ...updatedFaqs[idx], [field]: val };
    setCfg((prev) => ({ ...prev, faqs: updatedFaqs }));
  };

  const handleDeleteFaq = (idx) => {
    setCfg((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let parsedJson = null;
    if (cfg.jsonConfigText && cfg.jsonConfigText.trim()) {
      try {
        parsedJson = JSON.parse(cfg.jsonConfigText);
        setJsonError("");
      } catch (err) {
        setJsonError("Invalid JSON syntax: " + err.message);
        setActiveTab("json");
        return;
      }
    }

    const finalConfig = {
      customHeading: cfg.customHeading,
      customSubtitle: cfg.customSubtitle,
      alertNotice: cfg.alertNotice,
      whatsappNumber: cfg.whatsappNumber,
      ctaLabel: cfg.ctaLabel,
      ctaUrl: cfg.ctaUrl,
      basePrice: Number(cfg.basePrice) || 0,
      rateMultiplier: Number(cfg.rateMultiplier) || 1.0,
      currency: cfg.currency,
      requireLeadCapture: cfg.requireLeadCapture,
      dailyRateLimit: Number(cfg.dailyRateLimit) || 50,
      faqs: cfg.faqs.filter((f) => f.question && f.question.trim()),
      jsonConfig: parsedJson
    };

    onSave(finalConfig);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #cbd5e1",
          overflow: "hidden"
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "4px",
                background: tool.bg || "#eff6ff",
                color: tool.color || "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              <i className={`fa-solid ${tool.icon || "fa-sliders"}`}></i>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a" }}>
                Configure: {tool.title}
              </div>
              <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "monospace" }}>
                /tools/{tool.slug}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link
              href={`/tools/${tool.slug}`}
              target="_blank"
              className="btn-admin btn-admin-outline btn-admin-sm"
              style={{ padding: "4px 8px", fontSize: "11px", borderRadius: "4px", textDecoration: "none", color: "#475569" }}
            >
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginRight: "4px" }}></i>
              <span>Live Tool</span>
            </Link>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", fontSize: "18px", color: "#64748b", cursor: "pointer" }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #e2e8f0",
            background: "#ffffff",
            padding: "0 20px",
            gap: "8px",
            overflowX: "auto"
          }}
        >
          {[
            { id: "branding", label: "General & Branding", icon: "fa-sliders" },
            { id: "params", label: "Algorithm & Defaults", icon: "fa-calculator" },
            { id: "faqs", label: `Tool FAQs (${cfg.faqs.length})`, icon: "fa-circle-question" },
            { id: "json", label: "Engine JSON Config", icon: "fa-code" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "11px 14px",
                fontSize: "12.5px",
                fontWeight: 700,
                border: "none",
                background: "none",
                cursor: "pointer",
                borderBottom: activeTab === tab.id ? "2px solid #2563eb" : "2px solid transparent",
                color: activeTab === tab.id ? "#2563eb" : "#64748b",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap"
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <div style={{ padding: "20px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* TAB 1: BRANDING */}
            {activeTab === "branding" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Custom Headline / Page Title Override
                  </label>
                  <input
                    type="text"
                    value={cfg.customHeading}
                    onChange={(e) => updateField("customHeading", e.target.value)}
                    placeholder={tool.title}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Custom Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    value={cfg.customSubtitle}
                    onChange={(e) => updateField("customSubtitle", e.target.value)}
                    placeholder={tool.desc}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Notice Alert Banner (Optional message banner at top of tool)
                  </label>
                  <input
                    type="text"
                    value={cfg.alertNotice}
                    onChange={(e) => updateField("alertNotice", e.target.value)}
                    placeholder="e.g. 🚀 2026 Live Core Updates Algorithm Activated"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Direct WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={cfg.whatsappNumber}
                    onChange={(e) => updateField("whatsappNumber", e.target.value)}
                    placeholder="+8801670769816"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={cfg.ctaLabel}
                    onChange={(e) => updateField("ctaLabel", e.target.value)}
                    placeholder="Book Free Strategy Audit"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    CTA Target URL Destination
                  </label>
                  <input
                    type="text"
                    value={cfg.ctaUrl}
                    onChange={(e) => updateField("ctaUrl", e.target.value)}
                    placeholder="/contact"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: PARAMETERS & DEFAULTS */}
            {activeTab === "params" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Base Starting Value / Price
                  </label>
                  <input
                    type="number"
                    value={cfg.basePrice}
                    onChange={(e) => updateField("basePrice", e.target.value)}
                    placeholder="500"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Rate Multiplier / Ratio (e.g. 1.0 = standard, 1.2 = surge)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={cfg.rateMultiplier}
                    onChange={(e) => updateField("rateMultiplier", e.target.value)}
                    placeholder="1.0"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Currency Symbol / Unit
                  </label>
                  <select
                    value={cfg.currency}
                    onChange={(e) => updateField("currency", e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#fff" }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="BDT">BDT (৳)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                    Daily Calculation / Query Limit
                  </label>
                  <input
                    type="number"
                    value={cfg.dailyRateLimit}
                    onChange={(e) => updateField("dailyRateLimit", e.target.value)}
                    placeholder="50"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1", background: "#f8fafc", padding: "12px 16px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 700, fontSize: "13px", color: "#0f172a" }}>
                    <input
                      type="checkbox"
                      checked={cfg.requireLeadCapture}
                      onChange={(e) => updateField("requireLeadCapture", e.target.checked)}
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span>Require Email / Contact Lead Capture before showing Full Results</span>
                  </label>
                  <p style={{ margin: "4px 0 0 26px", fontSize: "11.5px", color: "#64748b" }}>
                    When enabled, users must provide their email/website before unlocking downloadable report or in-depth data.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: FAQS */}
            {activeTab === "faqs" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155" }}>
                    Specific FAQ items displayed on this tool's page
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="btn-admin btn-admin-primary btn-admin-sm"
                    style={{ borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>Add FAQ</span>
                  </button>
                </div>

                {cfg.faqs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px", border: "1px dashed #cbd5e1", borderRadius: "4px", color: "#64748b", fontSize: "13px" }}>
                    No tool-specific FAQs configured. Click "Add FAQ" above to add helpful Q&A items.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {cfg.faqs.map((faq, idx) => (
                      <div key={idx} style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#2563eb" }}>FAQ #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(idx)}
                            style={{ background: "none", border: "none", color: "#ef4444", fontSize: "13px", cursor: "pointer" }}
                            title="Remove FAQ"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                          placeholder="Question..."
                          style={{ width: "100%", padding: "7px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12.5px", marginBottom: "6px" }}
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                          placeholder="Answer explanation..."
                          style={{ width: "100%", padding: "7px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12.5px" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: JSON CONFIG */}
            {activeTab === "json" && (
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "5px" }}>
                  Advanced Tool Algorithm & Data Parameters (JSON)
                </label>
                <textarea
                  rows={9}
                  value={cfg.jsonConfigText}
                  onChange={(e) => {
                    updateField("jsonConfigText", e.target.value);
                    setJsonError("");
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "4px",
                    border: jsonError ? "1px solid #ef4444" : "1px solid #cbd5e1",
                    fontSize: "12.5px",
                    fontFamily: "monospace",
                    background: "#0f172a",
                    color: "#f8fafc"
                  }}
                />
                {jsonError && (
                  <div style={{ marginTop: "6px", color: "#ef4444", fontSize: "12px", fontWeight: 600 }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "4px" }}></i>
                    {jsonError}
                  </div>
                )}
                <p style={{ margin: "6px 0 0 0", fontSize: "11.5px", color: "#64748b" }}>
                  Directly customize any algorithmic coefficients, weightings, supported schemas, or data tables.
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid #e2e8f0",
              background: "#f8fafc",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-admin btn-admin-outline"
              style={{ borderRadius: "4px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-admin btn-admin-primary"
              style={{ borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>{saving ? "Saving Configuration..." : "Save Tool Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
