"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";

export default function AdminPricingPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  const [plans, setPlans] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);

  const emptyPlan = {
    id: Date.now(),
    name: "",
    tagline: "",
    price: 0,
    billing_cycle: "/month",
    is_popular: false,
    features: [""],
  };

  useEffect(() => {
    if (data?.pricingPlans) setPlans(data.pricingPlans);
  }, [data]);

  const handleSave = async (updated) => {
    setPlans(updated);
    await saveSection("pricingPlans", updated);
  };

  const handleAdd = async (form) => {
    const updated = [...plans, { ...form, id: Date.now() }];
    await handleSave(updated);
    setShowAdd(false);
  };

  const handleUpdate = async (form, idx) => {
    const updated = plans.map((p, i) => (i === idx ? form : p));
    await handleSave(updated);
    setEditIdx(null);
  };

  const handleDelete = async (idx) => {
    const updated = plans.filter((_, i) => i !== idx);
    await handleSave(updated);
    setDeleteIdx(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading pricing plans...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pricing & Retainer Packages</h1>
          <p className="admin-page-desc">
            Manage your monthly SEO retainer tiers, pricing levels, and package feature checklists
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowAdd(true); setEditIdx(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add Pricing Plan</span>
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
            <span className="admin-stat-label">Configured Plans</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-tags"></i>
            </div>
          </div>
          <div className="admin-stat-value">{plans.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Retainer Tiers</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Most Popular Tier</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-crown"></i>
            </div>
          </div>
          <div className="admin-stat-value" style={{ fontSize: "20px" }}>
            {plans.find((p) => p.is_popular)?.name || "None"}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>Highlighted Package</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Monthly Range</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-money-bill-wave"></i>
            </div>
          </div>
          <div className="admin-stat-value">
            ${Math.min(...plans.map((p) => p.price || 0)) || 299} - $
            {Math.max(...plans.map((p) => p.price || 0)) || 1499}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>Active price range</span>
          </div>
        </div>
      </div>

      {/* 3. ADD PLAN FORM */}
      {showAdd && (
        <PlanForm
          initial={emptyPlan}
          onSave={handleAdd}
          onCancel={() => setShowAdd(false)}
          saving={saving}
          isEdit={false}
        />
      )}

      {/* 4. PLANS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {plans.map((plan, idx) => (
          editIdx === idx ? (
            <div key={plan.id || idx} style={{ gridColumn: "1 / -1" }}>
              <PlanForm
                initial={plan}
                onSave={(form) => handleUpdate(form, idx)}
                onCancel={() => setEditIdx(null)}
                saving={saving}
                isEdit={true}
              />
            </div>
          ) : (
            <div
              key={plan.id || idx}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: plan.is_popular ? "2px solid #2563eb" : "1px solid #e2e8f0",
                boxShadow: plan.is_popular ? "0 10px 25px -5px rgba(37, 99, 235, 0.15)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
              }}
            >
              {plan.is_popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "20px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  ⭐ Most Popular
                </div>
              )}

              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>{plan.name}</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>{plan.tagline}</p>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a" }}>${plan.price}</span>
                <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>{plan.billing_cycle}</span>
              </div>

              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>
                  Included Features ({plan.features?.length || 0})
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(plan.features || []).map((f, i) => (
                    <li key={i} style={{ fontSize: "13px", color: "#334155", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <i className="fa-solid fa-circle-check" style={{ color: "#10b981", marginTop: "3px", fontSize: "12px", flexShrink: 0 }}></i>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <button
                  onClick={() => { setEditIdx(idx); setShowAdd(false); }}
                  className="btn-admin btn-admin-outline"
                  style={{ flex: 1, justifyContent: "center", color: "#2563eb" }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit Plan</span>
                </button>
                <button
                  onClick={() => setDeleteIdx(idx)}
                  className="btn-admin btn-admin-outline"
                  style={{ flex: 1, justifyContent: "center", color: "#ef4444" }}
                >
                  <i className="fa-solid fa-trash"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* 5. DELETE MODAL */}
      {deleteIdx !== null && (
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
              Delete Pricing Plan "{plans[deleteIdx]?.name}"?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              This will remove this retainer package from your pricing tables.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => setDeleteIdx(null)}
                className="btn-admin btn-admin-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteIdx)}
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

function PlanForm({ initial, onSave, onCancel, saving, isEdit }) {
  const [form, setForm] = useState({ ...initial, features: [...(initial.features || [])] });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const updateFeature = (i, val) => {
    const updated = [...form.features];
    updated[i] = val;
    set("features", updated);
  };
  const addFeature = () => set("features", [...form.features, ""]);
  const removeFeature = (i) => set("features", form.features.filter((_, idx) => idx !== i));

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
          <i className="fa-solid fa-tags" style={{ color: "#2563eb" }}></i>
          <span>{isEdit ? "Edit Pricing Plan" : "Add New Pricing Plan"}</span>
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
              Plan Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Growth SEO"
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
              Price ($ USD) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="Ideal for growing businesses looking for full-funnel organic search dominance"
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
              Billing Cycle
            </label>
            <input
              type="text"
              value={form.billing_cycle}
              onChange={(e) => set("billing_cycle", e.target.value)}
              placeholder="/month or one-time"
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
              id="popular"
              checked={!!form.is_popular}
              onChange={(e) => set("is_popular", e.target.checked)}
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
            <label htmlFor="popular" style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155", cursor: "pointer" }}>
              ⭐ Mark as Most Popular Tier
            </label>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155", margin: 0 }}>
              Included Features ({form.features.length})
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="btn-admin btn-admin-outline btn-admin-sm"
              style={{ color: "#2563eb" }}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Feature</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {form.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={f}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  placeholder={`Feature bullet item #${i + 1}`}
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
                  onClick={() => removeFeature(i)}
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
            <span>{saving ? "Saving..." : isEdit ? "Update Plan" : "Add Plan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
