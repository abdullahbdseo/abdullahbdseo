"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [editInvoice, setEditInvoice] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saveMsg, setSaveMsg] = useState("");

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`/api/admin/invoices?_t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.invoices) setInvoices(data.invoices);
      }
    } catch (e) {
      console.error("Error fetching invoices:", e);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const notify = (msg) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 3500);
  };

  const handleSaveInvoice = async (form) => {
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notify("Invoice & date updated successfully!");
        fetchInvoices();
        setEditInvoice(null);
      }
    } catch (e) {
      alert("Error saving invoice");
    }
  };

  const handleDeleteInvoice = async (id) => {
    try {
      setInvoices((prev) => prev.filter((inv) => inv.id !== id && inv.order_id !== id));
      const res = await fetch(`/api/admin/invoices?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        notify("Invoice deleted successfully.");
        setDeleteId(null);
        fetchInvoices();
      } else {
        alert("Failed to delete invoice");
        fetchInvoices();
      }
    } catch (e) {
      alert("Error deleting invoice");
      fetchInvoices();
    }
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
      inv.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      inv.client_email?.toLowerCase().includes(search.toLowerCase()) ||
      inv.order_number?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Billing & Invoices</h1>
          <p className="admin-page-desc">
            Downloadable, printable official invoices, billing records, date adjustments, and tax receipts
          </p>
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

      {/* SEARCH BAR */}
      <div
        style={{
          background: "#ffffff",
          padding: "14px 18px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
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
            placeholder="Search by invoice #, client or order ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        <span style={{ fontSize: "12.5px", color: "#64748b", fontWeight: 600 }}>
          {filtered.length} Invoices Found
        </span>
      </div>

      {/* INVOICES TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Invoice Records ({filtered.length})</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Official payment receipts and client tax records
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Invoice # & Issue Date</th>
                <th>Order Ref</th>
                <th>Client Info</th>
                <th>Service Deliverable</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                        {inv.invoice_number}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "2px" }}>
                        <i className="fa-regular fa-calendar" style={{ marginRight: "4px" }}></i>
                        {inv.issued_at ? new Date(inv.issued_at).toLocaleDateString() : "Recent"}
                      </div>
                    </td>

                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#2563eb", fontWeight: 600 }}>
                        {inv.order_number}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "13px" }}>{inv.client_name}</div>
                      <div style={{ fontSize: "11.5px", color: "#64748b" }}>{inv.client_email}</div>
                    </td>

                    <td>
                      <div style={{ color: "#0f172a", fontWeight: 600, fontSize: "13px" }}>{inv.service_title}</div>
                      <div style={{ fontSize: "11.5px", color: "#64748b" }}>{inv.package_name}</div>
                    </td>

                    <td>
                      <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "14.5px" }}>
                        ${inv.total}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge-status ${inv.status}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          background: inv.status === "paid" ? "#d1fae5" : "#fef3c7",
                          color: inv.status === "paid" ? "#065f46" : "#92400e",
                          border: `1px solid ${inv.status === "paid" ? "#a7f3d0" : "#fde68a"}`,
                        }}
                      >
                        <i className={`fa-solid ${inv.status === "paid" ? "fa-circle-check" : "fa-clock"}`}></i>
                        <span>{inv.status.toUpperCase()}</span>
                      </span>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end", alignItems: "center" }}>
                        <Link
                          href={`/admin/invoices/${inv.id}`}
                          target="_blank"
                          className="btn-admin btn-admin-outline btn-admin-sm"
                          title="Print / Download PDF"
                          style={{ padding: "5px 8px" }}
                        >
                          <i className="fa-solid fa-print"></i>
                        </Link>

                        <button
                          onClick={() => setEditInvoice(inv)}
                          className="btn-admin btn-admin-primary btn-admin-sm"
                          title="Edit Invoice & Date"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteId(inv.id)}
                          className="btn-admin btn-admin-danger btn-admin-sm"
                          title="Delete Invoice"
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

      {/* EDIT INVOICE MODAL */}
      {editInvoice && (
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
              maxWidth: "580px",
              width: "100%",
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
                <i className="fa-solid fa-file-invoice-dollar" style={{ color: "#2563eb", marginRight: "8px" }}></i>
                Edit Invoice & Issue Date
              </h3>
              <button
                onClick={() => setEditInvoice(null)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "18px" }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveInvoice(editInvoice);
              }}
              style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Invoice Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={editInvoice.invoice_number}
                    onChange={(e) => setEditInvoice({ ...editInvoice, invoice_number: e.target.value })}
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
                    Issue Date (Edit Date) *
                  </label>
                  <input
                    type="date"
                    required
                    value={editInvoice.issued_at ? editInvoice.issued_at.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setEditInvoice({ ...editInvoice, issued_at: e.target.value })}
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
                    value={editInvoice.client_name || ""}
                    onChange={(e) => setEditInvoice({ ...editInvoice, client_name: e.target.value })}
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
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={editInvoice.client_email || ""}
                    onChange={(e) => setEditInvoice({ ...editInvoice, client_email: e.target.value })}
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
                    Total Invoiced Amount ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editInvoice.total}
                    onChange={(e) => setEditInvoice({ ...editInvoice, total: Number(e.target.value) })}
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
                    Payment Status
                  </label>
                  <select
                    value={editInvoice.status || "pending"}
                    onChange={(e) => setEditInvoice({ ...editInvoice, status: e.target.value })}
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
                    <option value="pending">🟡 PENDING</option>
                    <option value="paid">🟢 PAID</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setEditInvoice(null)} className="btn-admin btn-admin-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-admin btn-admin-primary">
                  <i className="fa-solid fa-floppy-disk"></i>
                  <span>Save Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE INVOICE MODAL */}
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
                Delete Invoice?
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                This will delete this billing record from the system.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setDeleteId(null)} className="btn-admin btn-admin-outline" style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                onClick={() => handleDeleteInvoice(deleteId)}
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
