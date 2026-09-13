"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saveMsg, setSaveMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refreshData = () => {
    setOrders([...DB.getOrders()]);
    setInquiries([...DB.getInquiries()]);
    setInvoices([...DB.getInvoices()]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const notify = (msg) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 3500);
  };

  const handleQuickStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        notify("Order status updated successfully.");
        refreshData();
      }
    } catch (e) {
      alert("Error updating order status");
    }
  };

  const handleSaveOrder = async (form) => {
    setSubmitting(true);
    try {
      const isNew = !form.id || showAddModal;
      const res = await fetch("/api/admin/orders", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notify(isNew ? "New order logged successfully!" : "Order & date updated successfully!");
        refreshData();
        setEditOrder(null);
        setShowAddModal(false);
      } else {
        alert("Failed to save order");
      }
    } catch (e) {
      alert("Error saving order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        notify("Order deleted successfully.");
        refreshData();
        setDeleteId(null);
      } else {
        alert("Failed to delete order");
      }
    } catch (e) {
      alert("Error deleting order");
    } finally {
      setSubmitting(false);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === "in_progress" || o.status === "awaiting_payment").length;
  const completedOrdersCount = orders.filter(o => o.status === "completed").length;

  return (
    <div className="admin-dashboard-page" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HERO HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Platform & Operations Overview</h1>
          <p className="admin-page-desc">Real-time revenue metrics, client orders, date editing, and SEO fulfillment</p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowAddModal(true); setEditOrder(null); }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Log New Order</span>
          </button>
          <Link href="/admin/leads" className="btn-admin btn-admin-outline">
            <i className="fa-solid fa-envelope-open-text"></i>
            <span>Inbound Leads ({inquiries.length})</span>
          </Link>
          <Link href="/admin/orders" className="btn-admin btn-admin-outline">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>All Orders ({orders.length})</span>
          </Link>
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

      {/* 2. STATS & KPI METRIC CARDS (DAY / LIGHT MODE) */}
      <div className="admin-stats-row">
        {/* Total Invoiced Volume */}
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Invoiced</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
          </div>
          <div className="admin-stat-value">${totalRevenue.toLocaleString()}</div>
          <div className="admin-stat-footer">
            <span className="trend-up"><i className="fa-solid fa-arrow-trend-up"></i> +18.4%</span>
            <span>Across all client channels</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Client Orders</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
          <div className="admin-stat-value">{orders.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>{activeOrdersCount} Active</span>
            <span>in fulfillment queue</span>
          </div>
        </div>

        {/* Delivered / Completed */}
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Delivered Projects</span>
            <div className="admin-stat-icon-wrap icon-purple">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div className="admin-stat-value">{completedOrdersCount}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>100%</span>
            <span>On-time milestone delivery</span>
          </div>
        </div>

        {/* Inbound Inquiries */}
        <Link href="/admin/leads" className="admin-stat-glass-card" style={{ textDecoration: "none" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Consultations & Leads</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
          </div>
          <div className="admin-stat-value">{inquiries.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>Active</span>
            <span>Click to manage leads &rarr;</span>
          </div>
        </Link>
      </div>

      {/* 3. QUICK ACTIONS BAR */}
      <div>
        <div style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", marginBottom: "10px" }}>
          Quick Navigation & Management
        </div>
        <div className="admin-quick-actions">
          <Link href="/admin/leads" className="admin-action-btn">
            <i className="fa-solid fa-envelope-open-text" style={{ color: "#2563eb" }}></i>
            <div>
              <div>Leads & Inquiries</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>WhatsApp, follow-ups & CSV</div>
            </div>
          </Link>

          <Link href="/admin/orders" className="admin-action-btn">
            <i className="fa-solid fa-list-check"></i>
            <div>
              <div>Client Orders</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Update delivery & dates</div>
            </div>
          </Link>

          <Link href="/admin/portfolio" className="admin-action-btn">
            <i className="fa-solid fa-trophy" style={{ color: "#d97706" }}></i>
            <div>
              <div>Portfolio & Proof</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>GSC clicks & case studies</div>
            </div>
          </Link>

          <Link href="/admin/testimonials" className="admin-action-btn">
            <i className="fa-solid fa-comments" style={{ color: "#059669" }}></i>
            <div>
              <div>Client Reviews</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>5-Star feedback & ratings</div>
            </div>
          </Link>

          <Link href="/admin/blogs" className="admin-action-btn">
            <i className="fa-solid fa-newspaper" style={{ color: "#7c3aed" }}></i>
            <div>
              <div>Blog Articles</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Publish & edit SEO posts</div>
            </div>
          </Link>

          <Link href="/admin/services" className="admin-action-btn">
            <i className="fa-solid fa-layer-group" style={{ color: "#0284c7" }}></i>
            <div>
              <div>Services & Pricing</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Rates, packages & retainers</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. RECENT ORDERS TABLE WITH EDIT AND DELETE OPTIONS */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Recent Client Deliverables & Orders</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Latest service purchases — edit details, customize dates, or delete test records
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => { setShowAddModal(true); setEditOrder(null); }}
              className="btn-admin btn-admin-primary btn-admin-sm"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Order</span>
            </button>
            <Link href="/admin/orders" className="btn-admin btn-admin-outline btn-admin-sm">
              <span>View All ({orders.length})</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Target Website</th>
                <th>Service Deliverable</th>
                <th>Amount</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    No orders in database yet. Click "Log New Order" to create one.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 8).map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#0f172a" }}>
                        {order.order_number}
                      </span>
                      {order.client_name && (
                        <div style={{ fontSize: "11.5px", color: "#64748b" }}>{order.client_name}</div>
                      )}
                    </td>

                    <td>
                      {order.website_url ? (
                        <span style={{ fontFamily: "monospace", color: "#2563eb", fontSize: "13px" }}>
                          {order.website_url}
                        </span>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>N/A</span>
                      )}
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{order.service_title}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{order.package_name || "Custom Package"}</div>
                    </td>

                    <td>
                      <span style={{ fontWeight: 800, color: "#059669", fontSize: "14px" }}>
                        ${order.total}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                        <i className="fa-regular fa-calendar" style={{ fontSize: "11px", color: "#94a3b8" }}></i>
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Recent"}
                      </span>
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          border: "1px solid #cbd5e1",
                          background:
                            order.status === "completed"
                              ? "#d1fae5"
                              : order.status === "in_progress"
                              ? "#dbeafe"
                              : order.status === "awaiting_payment"
                              ? "#fef3c7"
                              : "#f1f5f9",
                          color:
                            order.status === "completed"
                              ? "#065f46"
                              : order.status === "in_progress"
                              ? "#1e40af"
                              : order.status === "awaiting_payment"
                              ? "#92400e"
                              : "#475569",
                          cursor: "pointer",
                        }}
                      >
                        <option value="awaiting_payment">🟡 Awaiting Payment</option>
                        <option value="in_progress">🔵 In Progress</option>
                        <option value="completed">🟢 Completed</option>
                        <option value="cancelled">⚪ Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <button
                          onClick={() => { setEditOrder(order); setShowAddModal(false); }}
                          title="Edit Order & Date"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          style={{ padding: "5px 9px", color: "#2563eb" }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <Link
                          href={`/admin/invoices/${order.invoice_id || order.id}`}
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          target="_blank"
                          title="View Official Invoice"
                          style={{ padding: "5px 9px", color: "#475569" }}
                        >
                          <i className="fa-solid fa-file-invoice"></i>
                        </Link>

                        <button
                          onClick={() => setDeleteId(order.id)}
                          title="Delete Order"
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

      {/* 5. EDIT / CREATE ORDER MODAL */}
      {(editOrder || showAddModal) && (
        <OrderEditModal
          initial={
            editOrder || {
              order_number: `ORD-${Date.now().toString().slice(-6)}`,
              client_name: "",
              client_email: "",
              website_url: "",
              service_title: "Technical SEO Audit",
              package_name: "Standard Package",
              total: 650,
              payment_method: "crypto",
              status: "in_progress",
              created_at: new Date().toISOString().slice(0, 16),
            }
          }
          isNew={showAddModal}
          onSave={handleSaveOrder}
          onClose={() => { setEditOrder(null); setShowAddModal(false); }}
          submitting={submitting}
        />
      )}

      {/* 6. DELETE CONFIRMATION MODAL */}
      {deleteId && (
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
              Delete Order #{deleteId}?
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              This will remove the order record and invoice from your database permanently.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => setDeleteId(null)}
                className="btn-admin btn-admin-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOrder(deleteId)}
                disabled={submitting}
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
                {submitting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderEditModal({ initial, isNew, onSave, onClose, submitting }) {
  let dateFormatted = "";
  if (initial.created_at) {
    const d = new Date(initial.created_at);
    if (!isNaN(d.getTime())) {
      dateFormatted = d.toISOString().slice(0, 16);
    }
  }

  const [form, setForm] = useState({
    ...initial,
    created_at: dateFormatted || new Date().toISOString().slice(0, 16),
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
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
          padding: "28px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #e2e8f0",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: 800 }}>
              {isNew ? "Log New Client Order" : `Edit Order #${initial.order_number || initial.id}`}
            </h3>
            <p style={{ margin: "3px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Update deliverables, customer details, custom date, and status
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
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
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Order Number
              </label>
              <input
                type="text"
                required
                value={form.order_number}
                onChange={(e) => set("order_number", e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontFamily: "monospace" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Order / Purchase Date 📅
              </label>
              <input
                type="datetime-local"
                required
                value={form.created_at}
                onChange={(e) => set("created_at", e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#f8fafc" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Client Name
              </label>
              <input
                type="text"
                value={form.client_name}
                onChange={(e) => set("client_name", e.target.value)}
                placeholder="e.g. John Doe"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Client Email
              </label>
              <input
                type="email"
                value={form.client_email}
                onChange={(e) => set("client_email", e.target.value)}
                placeholder="john@example.com"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Target Website URL
            </label>
            <input
              type="text"
              value={form.website_url}
              onChange={(e) => set("website_url", e.target.value)}
              placeholder="https://clientwebsite.com"
              style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Service Title
              </label>
              <input
                type="text"
                required
                value={form.service_title}
                onChange={(e) => set("service_title", e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Package Tier
              </label>
              <input
                type="text"
                value={form.package_name}
                onChange={(e) => set("package_name", e.target.value)}
                placeholder="Standard Package"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Total Amount ($ USD)
              </label>
              <input
                type="number"
                min={0}
                required
                value={form.total}
                onChange={(e) => set("total", Number(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Payment Method
              </label>
              <select
                value={form.payment_method}
                onChange={(e) => set("payment_method", e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#ffffff" }}
              >
                <option value="crypto">Crypto (USDT/BTC)</option>
                <option value="bkash">bKash Mobile Banking</option>
                <option value="bank_transfer">Direct Bank Wire</option>
                <option value="card">Credit Card</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#ffffff" }}
              >
                <option value="awaiting_payment">🟡 Awaiting Payment</option>
                <option value="in_progress">🔵 In Progress</option>
                <option value="completed">🟢 Completed</option>
                <option value="cancelled">⚪ Cancelled</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-admin btn-admin-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-admin btn-admin-primary"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>{submitting ? "Saving..." : isNew ? "Create Order" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
