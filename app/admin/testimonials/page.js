"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

export default function AdminTestimonialsPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const emptyReview = {
    id: Date.now(),
    name: "",
    role: "",
    rating: 5,
    quote: "",
    avatar: "A",
    image: ""
  };

  useEffect(() => {
    if (data?.testimonials) setReviews(data.testimonials);
  }, [data]);

  const filtered = reviews.filter((r) => {
    const q = searchQ.toLowerCase();
    const text = (r.quote || r.content || "").toLowerCase();
    const matchesSearch =
      r.name?.toLowerCase().includes(q) ||
      r.role?.toLowerCase().includes(q) ||
      text.includes(q);
    const matchesRating = ratingFilter === "all" || String(r.rating) === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const handleSave = async (updated) => {
    setReviews(updated);
    await saveSection("testimonials", updated);
  };

  const handleAdd = async (form) => {
    const item = { ...form, id: Date.now(), avatar: form.avatar || form.name.charAt(0).toUpperCase() || "A" };
    await handleSave([...reviews, item]);
    setShowForm(false);
  };

  const handleUpdate = async (form) => {
    const updated = reviews.map((r) => (r.id === form.id ? form : r));
    await handleSave(updated);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    await handleSave(reviews.filter((r) => r.id !== id));
    setDeleteItem(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading client testimonials...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Reviews & Testimonials</h1>
          <p className="admin-page-desc">
            Manage verified client feedback, star ratings, quotes, and social proof displayed across your website
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Review</span>
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
            <span className="admin-stat-label">Total Testimonials</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-comments"></i>
            </div>
          </div>
          <div className="admin-stat-value">{reviews.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Published</span>
            <span>on Home & About pages</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Average Rating</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="admin-stat-value">
            {reviews.length > 0
              ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
              : "5.0"}
            /5.0
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>⭐ 100% Satisfaction</span>
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
            <span style={{ color: "#059669", fontWeight: 700 }}>Filtered Items</span>
          </div>
        </div>
      </div>

      {/* 3. ADD / EDIT FORM */}
      {(showForm || editItem) && (
        <TestimonialForm
          initial={editItem || emptyReview}
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
            placeholder="Search reviews by client name, company, or quote text..."
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
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
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
          <option value="all">All Star Ratings ({reviews.length})</option>
          <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
          <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
          <option value="3">⭐⭐⭐ (3 Stars)</option>
        </select>
      </div>

      {/* 5. REVIEWS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {filtered.map((r) => (
          <div
            key={r.id}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "14px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {r.avatar || r.name?.charAt(0) || "A"}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>{r.name}</h3>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{r.role}</div>
                  </div>
                </div>

                <div style={{ color: "#f59e0b", fontSize: "13px", display: "flex", gap: "2px" }}>
                  {[...Array(Number(r.rating) || 5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  color: "#334155",
                  lineHeight: "1.6",
                  fontStyle: "italic",
                }}
              >
                "{r.quote || r.content}"
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
              <button
                onClick={() => { setEditItem(r); setShowForm(false); }}
                className="btn-admin btn-admin-outline btn-admin-sm"
                style={{ flex: 1, justifyContent: "center", color: "#2563eb" }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteItem(r)}
                className="btn-admin btn-admin-outline btn-admin-sm"
                style={{ flex: 1, justifyContent: "center", color: "#ef4444" }}
              >
                <i className="fa-solid fa-trash"></i>
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              padding: "40px 20px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No reviews found matching current filter.
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
              Delete Client Review?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              Are you sure you want to remove the review from "{deleteItem.name}"?
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

function TestimonialForm({ initial, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({
    ...initial,
    quote: initial?.quote || initial?.content || "",
    avatar: initial?.avatar || (initial?.name ? initial.name.charAt(0).toUpperCase() : "A")
  });
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
          <i className="fa-solid fa-comments" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit Testimonial" : "Add New Testimonial"}</span>
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
              Client Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => {
                set("name", e.target.value);
                if (!form.avatar) set("avatar", e.target.value.charAt(0).toUpperCase());
              }}
              placeholder="e.g. Mia Collins"
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
              Role & Company *
            </label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              placeholder="e.g. Director, Northline Digital"
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
              Star Rating (1 - 5)
            </label>
            <select
              value={form.rating}
              onChange={(e) => set("rating", Number(e.target.value))}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                background: "#ffffff",
              }}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Exceptional)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
              <option value={3}>⭐⭐⭐ (3 Stars - Good)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Avatar Initial / Photo URL
            </label>
            <input
              type="text"
              value={form.avatar}
              onChange={(e) => set("avatar", e.target.value)}
              placeholder="M or https://example.com/photo.jpg"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
            Testimonial / Review Text *
          </label>
          <textarea
            rows={4}
            required
            value={form.quote}
            onChange={(e) => set("quote", e.target.value)}
            placeholder="Write the client's detailed feedback, ranking improvements, and revenue impact..."
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
            <span>{saving ? "Saving..." : isEdit ? "Update Review" : "Add Review"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
