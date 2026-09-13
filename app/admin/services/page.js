"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";
import Link from "next/link";

export default function AdminServicesPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const emptyService = {
    id: Date.now(),
    category_id: 1,
    title: "",
    slug: "",
    short_description: "",
    description: "",
    icon: "fa-star",
    is_featured: false,
    starting_price: 0,
    delivery_time: "5-7 Business Days",
    packages: [],
    faqs: [],
  };

  useEffect(() => {
    if (data?.services) setServices(data.services);
  }, [data]);

  const filtered = services.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchQ.toLowerCase()) ||
      s.short_description?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async (updated) => {
    setServices(updated);
    await saveSection("services", updated);
  };

  const handleAdd = async (form) => {
    const item = { ...form, id: Date.now(), slug: form.slug || slugify(form.title) };
    await handleSave([...services, item]);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = services.map((s) => (s.id === form.id ? form : s));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    await handleSave(services.filter((s) => s.id !== id));
    setDeleteItem(null);
  };

  const categoryLabel = (id) => {
    const map = { 1: "Technical & Auditing", 2: "On-Page & Content", 3: "E-Commerce", 4: "Off-Page & Authority" };
    return map[id] || `Category ${id}`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading services...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Service Catalog Management</h1>
          <p className="admin-page-desc">
            Manage your SEO service offerings, starting rates, delivery timelines, and packages
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Service</span>
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
            <span className="admin-stat-label">Total Services</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-briefcase"></i>
            </div>
          </div>
          <div className="admin-stat-value">{services.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Active</span>
            <span>in public catalog</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Featured Services</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="admin-stat-value">{services.filter((s) => s.is_featured).length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>Highlighted</span>
            <span>on home & hero</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Pricing Range</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
          </div>
          <div className="admin-stat-value">
            ${Math.min(...services.map((s) => s.starting_price || 0)) || 250} - $
            {Math.max(...services.map((s) => s.starting_price || 0)) || 1500}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>USD Starting Tier</span>
          </div>
        </div>
      </div>

      {/* 3. ADD / EDIT FORM MODAL / DRAWER */}
      {(showForm || editItem) && (
        <ServiceForm
          initial={editItem || emptyService}
          onSave={editItem ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          saving={saving}
          isEdit={!!editItem}
        />
      )}

      {/* 4. SEARCH BAR */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "380px" }}>
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
            placeholder="Search services by title or description..."
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
      </div>

      {/* 5. SERVICES TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Available SEO Services</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Showing {filtered.length} configured services
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Starting Price</th>
                <th>Delivery Time</th>
                <th>Packages</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No services found. Click "Add New Service" to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((svc) => (
                  <tr key={svc.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "15px",
                            flexShrink: 0,
                          }}
                        >
                          <i className={`fa-solid ${svc.icon || "fa-briefcase"}`}></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                            {svc.title}
                          </div>
                          {svc.is_featured && (
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#d97706",
                                background: "#fef3c7",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontWeight: 700,
                              }}
                            >
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: "12.5px", color: "#475569", fontWeight: 600 }}>
                        {categoryLabel(svc.category_id)}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontWeight: 800, color: "#059669", fontSize: "14px" }}>
                        ${svc.starting_price}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                        {svc.delivery_time || "5-7 Days"}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#2563eb",
                          background: "#eff6ff",
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        {(svc.packages || []).length} Packages
                      </span>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <a
                          href={`/services/${svc.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View Live Page"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#475569" }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>

                        <button
                          onClick={() => { setEditItem(svc); setShowForm(false); }}
                          title="Edit Service"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#2563eb" }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                          onClick={() => setDeleteItem(svc)}
                          title="Delete Service"
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
              Delete Service "{deleteItem.title}"?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              This will remove the service and its tier packages from the public catalog.
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

function ServiceForm({ initial, onSave, onCancel, saving, isEdit }) {
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
          <i className="fa-solid fa-briefcase" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit Service" : "Add New Service"}</span>
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
              Service Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
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
              URL Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="e.g. ecommerce-seo"
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
              Icon (FontAwesome Class)
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
              Category
            </label>
            <select
              value={form.category_id}
              onChange={(e) => set("category_id", Number(e.target.value))}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                background: "#ffffff",
              }}
            >
              <option value={1}>Technical & Auditing</option>
              <option value={2}>On-Page & Content</option>
              <option value={3}>E-Commerce & Specialized</option>
              <option value={4}>Off-Page & Authority</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Starting Price ($ USD)
            </label>
            <input
              type="number"
              min={0}
              value={form.starting_price}
              onChange={(e) => set("starting_price", Number(e.target.value))}
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
              Delivery Timeframe
            </label>
            <input
              type="text"
              value={form.delivery_time}
              onChange={(e) => set("delivery_time", e.target.value)}
              placeholder="5-7 Business Days"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "26px" }}>
            <input
              type="checkbox"
              id="featured"
              checked={!!form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
            <label htmlFor="featured" style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155", cursor: "pointer" }}>
              ⭐ Feature in Top Services
            </label>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
            Short Overview / Teaser *
          </label>
          <input
            type="text"
            required
            value={form.short_description}
            onChange={(e) => set("short_description", e.target.value)}
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
            Comprehensive Service Scope & Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "13.5px",
              resize: "vertical",
            }}
          />
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "14px",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#64748b" }}>
            <i className="fa-solid fa-circle-info" style={{ color: "#2563eb", marginRight: "6px" }}></i>
            Package tiers (Starter, Growth, Pro) configured as structured data:
          </p>
          <textarea
            rows={4}
            value={JSON.stringify(form.packages || [], null, 2)}
            onChange={(e) => {
              try {
                set("packages", JSON.parse(e.target.value));
              } catch {}
            }}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontFamily: "monospace",
              fontSize: "12px",
              background: "#ffffff",
            }}
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
            <span>{saving ? "Saving..." : isEdit ? "Update Service" : "Add Service"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
