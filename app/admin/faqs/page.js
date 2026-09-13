"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

const CATEGORIES = [
  "Overview & Expertise",
  "Services & Solutions",
  "AI & GEO Search",
  "Timelines & ROI",
  "Guarantees & Methodology",
  "Tech Stack & CMS",
  "Technical Audits",
  "Pricing & Invoicing",
  "Backlinks & PR",
  "Consultation & Onboarding",
  "General",
];

export default function AdminFaqsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const emptyFaq = { id: Date.now(), category: "General", question: "", answer: "" };

  useEffect(() => {
    if (data?.faqs) setFaqs(data.faqs);
  }, [data]);

  const filtered = faqs.filter((f) => {
    const q = searchQ.toLowerCase();
    const matchesSearch =
      f.question?.toLowerCase().includes(q) ||
      f.answer?.toLowerCase().includes(q) ||
      f.category?.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === "all" || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSave = async (updated) => {
    setFaqs(updated);
    await saveSection("faqs", updated);
  };

  const handleAdd = async (form) => {
    const updated = [...faqs, { ...form, id: Date.now() }];
    await handleSave(updated);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = faqs.map((f) => (f.id === form.id ? form : f));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    const updated = faqs.filter((f) => f.id !== id);
    await handleSave(updated);
    setDeleteItem(null);
  };

  const moveUp = async (idx) => {
    if (idx === 0) return;
    const updated = [...faqs];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    await handleSave(updated);
  };

  const moveDown = async (idx) => {
    if (idx === faqs.length - 1) return;
    const updated = [...faqs];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    await handleSave(updated);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading FAQs...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">FAQ Management</h1>
          <p className="admin-page-desc">
            Organize knowledge base questions, SEO explanations, and client onboarding answers
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New FAQ</span>
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
            <span className="admin-stat-label">Total Questions</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-circle-question"></i>
            </div>
          </div>
          <div className="admin-stat-value">{faqs.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Active</span>
            <span>in FAQ accordion</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Categories</span>
            <div className="admin-stat-icon-wrap icon-purple">
              <i className="fa-solid fa-layer-group"></i>
            </div>
          </div>
          <div className="admin-stat-value">
            {new Set(faqs.map((f) => f.category)).size}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>Topic Groups</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Filtered Results</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-filter"></i>
            </div>
          </div>
          <div className="admin-stat-value">{filtered.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>Matching search</span>
          </div>
        </div>
      </div>

      {/* 3. ADD / EDIT FORM */}
      {(showForm || editItem) && (
        <FaqForm
          initial={editItem || emptyFaq}
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
            placeholder="Search FAQs by question or answer keywords..."
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
          <option value="all">All Categories ({faqs.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 5. FAQS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((faq) => {
          const originalIdx = faqs.indexOf(faq);
          return (
            <div
              key={faq.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                padding: "20px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      fontSize: "11.5px",
                      fontWeight: 700,
                      padding: "3px 9px",
                      borderRadius: "6px",
                    }}
                  >
                    {faq.category || "General"}
                  </span>
                  <span style={{ fontSize: "11.5px", color: "#94a3b8", fontWeight: 600 }}>
                    #{originalIdx + 1}
                  </span>
                </div>

                <h3 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                  {faq.question}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "1.6",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {faq.answer}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end", flexShrink: 0 }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => moveUp(originalIdx)}
                    disabled={originalIdx === 0}
                    title="Move Up"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      color: originalIdx === 0 ? "#cbd5e1" : "#475569",
                      cursor: originalIdx === 0 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                    }}
                  >
                    <i className="fa-solid fa-chevron-up"></i>
                  </button>
                  <button
                    onClick={() => moveDown(originalIdx)}
                    disabled={originalIdx === faqs.length - 1}
                    title="Move Down"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      color: originalIdx === faqs.length - 1 ? "#cbd5e1" : "#475569",
                      cursor: originalIdx === faqs.length - 1 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                    }}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => { setEditItem(faq); setShowForm(false); }}
                    className="btn-admin btn-admin-outline btn-admin-sm"
                    style={{ color: "#2563eb", padding: "5px 10px" }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteItem(faq)}
                    className="btn-admin btn-admin-outline btn-admin-sm"
                    style={{ color: "#ef4444", padding: "5px 10px" }}
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              padding: "40px 20px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No FAQs found matching search criteria.
          </div>
        )}
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
              Delete FAQ Question?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              "{deleteItem.question}"
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

function FaqForm({ initial, categories, onSave, onCancel, saving, isEdit }) {
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
          <i className="fa-solid fa-circle-question" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit FAQ" : "Add New FAQ"}</span>
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
            Question *
          </label>
          <input
            type="text"
            required
            value={form.question}
            onChange={(e) => set("question", e.target.value)}
            placeholder="e.g. How long does technical SEO optimization take to reflect in Google rankings?"
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
            Answer *
          </label>
          <textarea
            rows={5}
            required
            value={form.answer}
            onChange={(e) => set("answer", e.target.value)}
            placeholder="Write a clear, authoritative answer explaining the process..."
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
            <span>{saving ? "Saving..." : isEdit ? "Update FAQ" : "Add FAQ"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
