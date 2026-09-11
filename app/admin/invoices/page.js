"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setInvoices(DB.getInvoices());
  }, []);

  const filtered = invoices.filter(inv =>
    inv.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    inv.client_name?.toLowerCase().includes(search.toLowerCase()) ||
    inv.client_email?.toLowerCase().includes(search.toLowerCase()) ||
    inv.order_number?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-invoices-page" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Billing & Invoices</h1>
          <p className="admin-page-desc">Downloadable, printable official tax & receipt invoices for all client services</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search invoice #, client or order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "#0b1120",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              minWidth: "260px"
            }}
          />
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Invoice Records ({filtered.length})</h2>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>PDF & Print Ready</span>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Order Ref</th>
                <th>Client Info</th>
                <th>Deliverable Service</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "36px", color: "#64748b" }}>
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#ffffff" }}>
                        {inv.invoice_number}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#94a3b8" }}>
                        {inv.order_number}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#f8fafc" }}>{inv.client_name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{inv.client_email}</div>
                    </td>
                    <td>
                      <div style={{ color: "#ffffff", fontWeight: 500 }}>{inv.service_title}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{inv.package_name}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "15px" }}>
                        ${inv.total}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${inv.status}`}>
                        <i className="fa-solid fa-circle-check"></i>
                        <span>{inv.status.toUpperCase()}</span>
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        target="_blank"
                        className="btn-admin btn-admin-primary btn-admin-sm"
                      >
                        <i className="fa-solid fa-print"></i>
                        <span>View / Print</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
