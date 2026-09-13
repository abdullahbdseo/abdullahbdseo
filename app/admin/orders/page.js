"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editOrder, setEditOrder] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saveMsg, setSaveMsg] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        if (data.orders) setOrders(data.orders);
      }
    } catch (e) {
      console.error("Error fetching orders:", e);
    }
  };

  useEffect(() => {
    fetchOrders();
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
        fetchOrders();
      }
    } catch (e) {
      alert("Error updating order status");
    }
  };

  const handleSaveOrder = async (form) => {
    try {
      const isNew = !form.id || showAddModal;
      const res = await fetch("/api/admin/orders", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notify(isNew ? "New order created successfully!" : "Order & date updated successfully!");
        fetchOrders();
        setEditOrder(null);
        setShowAddModal(false);
      }
    } catch (e) {
      alert("Error saving order");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      setOrders((prev) => prev.filter((o) => o.id !== id && o.order_number !== id));
      setDeleteId(null);
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        notify("Order deleted successfully.");
        fetchOrders();
      } else {
        alert("Failed to delete order");
        fetchOrders();
      }
    } catch (e) {
      alert("Error deleting order");
      fetchOrders();
    }
  };

  const filtered = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      (o.order_number && o.order_number.toLowerCase().includes(q)) ||
      (o.website_url && o.website_url.toLowerCase().includes(q)) ||
      (o.service_title && o.service_title.toLowerCase().includes(q)) ||
      (o.client_name && o.client_name.toLowerCase().includes(q)) ||
      (o.client_email && o.client_email.toLowerCase().includes(q));
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Orders & Fulfillment</h1>
          <p className="admin-page-desc">
            Track client purchases, manage deliverables, edit dates, and control payment statuses
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              setShowAddModal(true);
              setEditOrder(null);
            }}
            className="btn-admin btn-admin-primary"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Create New Order</span>
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

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "14px 18px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "14px",
            }}
          ></i>
          <input
            type="text"
            placeholder="Search by order #, client, website or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "9px 14px 9px 40px",
              color: "#0f172a",
              fontSize: "13.5px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#64748b" }}>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontWeight: 600,
              background: "#ffffff",
              color: "#334155",
              outline: "none",
            }}
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="awaiting_payment">🟡 Awaiting Payment</option>
            <option value="in_progress">🔵 In Progress</option>
            <option value="completed">🟢 Completed</option>
            <option value="cancelled">🔴 Cancelled</option>
          </select>
        </div>
      </div>

      {/* 3. ORDERS TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Order Records ({filtered.length})</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Active customer deliverable orders and execution queue
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order Number & Date</th>
                <th>Target Website</th>
                <th>Service & Package</th>
                <th>Client Info</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No orders match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                        {order.order_number}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "2px" }}>
                        <i className="fa-regular fa-calendar" style={{ marginRight: "4px" }}></i>
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Recent"}
                      </div>
                    </td>

                    <td>
                      <a
                        href={order.website_url.startsWith("http") ? order.website_url : `https://${order.website_url}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontFamily: "monospace", color: "#2563eb", fontSize: "13px", fontWeight: 600 }}
                      >
                        {order.website_url}
                      </a>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{order.service_title}</div>
                      <div style={{ fontSize: "11.5px", color: "#64748b" }}>{order.package_name}</div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "13px" }}>
                        {order.client_name || "Valued Client"}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#64748b" }}>{order.client_email}</div>
                    </td>

                    <td>
                      <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "14.5px" }}>
                        ${order.total}
                      </span>
                      <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "#059669" }}>
                        {order.payment_method}
                      </div>
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 700,
                          border: "1px solid #cbd5e1",
                          background:
                            order.status === "completed"
                              ? "#d1fae5"
                              : order.status === "in_progress"
                              ? "#dbeafe"
                              : "#fef3c7",
                          color:
                            order.status === "completed"
                              ? "#065f46"
                              : order.status === "in_progress"
                              ? "#1e40af"
                              : "#92400e",
                          outline: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="awaiting_payment">🟡 Awaiting Payment</option>
                        <option value="in_progress">🔵 In Progress</option>
                        <option value="completed">🟢 Completed</option>
                        <option value="cancelled">🔴 Cancelled</option>
                      </select>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end", alignItems: "center" }}>
                        <Link
                          href={`/admin/invoices/${order.invoice_id || order.id}`}
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          target="_blank"
                          title="View Invoice"
                          style={{ padding: "5px 8px" }}
                        >
                          <i className="fa-solid fa-file-invoice"></i>
                        </Link>

                        <button
                          onClick={() => setEditOrder(order)}
                          className="btn-admin btn-admin-primary btn-admin-sm"
                          title="Edit Order & Date"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteId(order.id)}
                          className="btn-admin btn-admin-danger btn-admin-sm"
                          title="Delete Order"
                          style={{ padding: "5px 8px" }}
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

      {/* 4. EDIT / CREATE ORDER MODAL */}
      {(editOrder || showAddModal) && (
        <OrderFormModal
          initial={
            editOrder || {
              order_number: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
              website_url: "",
              service_title: "Technical SEO Audit",
              package_name: "Standard Package",
              client_name: "",
              client_email: "",
              total: 500,
              status: "in_progress",
              payment_method: "bkash",
              created_at: new Date().toISOString().slice(0, 10),
              client_notes: "",
            }
          }
          onSave={handleSaveOrder}
          onCancel={() => {
            setEditOrder(null);
            setShowAddModal(false);
          }}
          isNew={showAddModal}
        />
      )}

      {/* 5. DELETE CONFIRMATION MODAL */}
      {deleteId !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#fff1f2",
                  color: "#e11d48",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: "20px",
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                Delete Order Record?
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                This action will permanently delete this client order from the database.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setDeleteId(null)} className="btn-admin btn-admin-outline" style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOrder(deleteId)}
                className="btn-admin btn-admin-danger"
                style={{ flex: 1 }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderFormModal({ initial, onSave, onCancel, isNew }) {
  const [form, setForm] = useState({
    ...initial,
    created_at: initial.created_at ? initial.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #cbd5e1",
          maxWidth: "640px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            borderBottom: "1px solid #e2e8f0",
            background: "#f8fafc",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
            <i className="fa-solid fa-cart-shopping" style={{ color: "#2563eb", marginRight: "8px" }}></i>
            {isNew ? "Create New Client Order" : "Edit Order & Date"}
          </h3>
          <button
            onClick={onCancel}
            style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "18px" }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Order Number *
              </label>
              <input
                type="text"
                required
                value={form.order_number}
                onChange={(e) => set("order_number", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Order Date (Edit Date) *
              </label>
              <input
                type="date"
                required
                value={form.created_at}
                onChange={(e) => set("created_at", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Client Name
              </label>
              <input
                type="text"
                value={form.client_name || ""}
                onChange={(e) => set("client_name", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="e.g. Alex Harrison"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Client Email
              </label>
              <input
                type="email"
                value={form.client_email || ""}
                onChange={(e) => set("client_email", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="client@company.com"
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
              Target Website URL *
            </label>
            <input
              type="text"
              required
              value={form.website_url}
              onChange={(e) => set("website_url", e.target.value)}
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "13px",
                fontFamily: "monospace",
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="https://example.com"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Service Deliverable *
              </label>
              <input
                type="text"
                required
                value={form.service_title}
                onChange={(e) => set("service_title", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Package Tier
              </label>
              <input
                type="text"
                value={form.package_name || ""}
                onChange={(e) => set("package_name", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Total Amount ($) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={form.total}
                onChange={(e) => set("total", Number(e.target.value))}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Payment Method
              </label>
              <select
                value={form.payment_method || "bkash"}
                onChange={(e) => set("payment_method", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
                <option value="bkash">bKash Manual</option>
                <option value="crypto-usdt">Crypto USDT</option>
                <option value="crypto-btc">Crypto BTC</option>
                <option value="stripe">Stripe / Card</option>
                <option value="bank_transfer">Bank Wire</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
                <option value="awaiting_payment">🟡 Awaiting Payment</option>
                <option value="in_progress">🔵 In Progress</option>
                <option value="completed">🟢 Completed</option>
                <option value="cancelled">🔴 Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
              Client Notes & Instructions
            </label>
            <textarea
              rows={3}
              value={form.client_notes || ""}
              onChange={(e) => set("client_notes", e.target.value)}
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
              }}
              placeholder="Any specific instructions or keywords..."
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button type="button" onClick={onCancel} className="btn-admin btn-admin-outline">
              Cancel
            </button>
            <button type="submit" className="btn-admin btn-admin-primary">
              <i className="fa-solid fa-floppy-disk"></i>
              <span>{isNew ? "Create Order" : "Save Order"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
