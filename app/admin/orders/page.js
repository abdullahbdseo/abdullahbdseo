"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setOrders([...DB.getOrders()]);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (e) {
      alert("Error updating order status");
    }
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.website_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.service_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-orders-page" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* HEADER & FILTERS */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Orders & Deliverables</h1>
          <p className="admin-page-desc">Track client purchases, crypto/bKash references, and workflow statuses</p>
        </div>

        {/* SEARCH & FILTERS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input 
            type="text" 
            placeholder="Search order #, site or service..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "#0b1120",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              minWidth: "240px"
            }}
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              background: "#0b1120",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none"
            }}
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="awaiting_payment">Awaiting Payment</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Order Records ({filtered.length})</h2>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Real-time database sync</span>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Target Website</th>
                <th>Service & Package</th>
                <th>Amount</th>
                <th>Payment Info</th>
                <th>Update Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "36px", color: "#64748b" }}>
                    No orders match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#ffffff" }}>
                        {order.order_number}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: "monospace", color: "#38bdf8", fontSize: "13px" }}>
                        {order.website_url}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#f8fafc" }}>{order.service_title}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{order.package_name}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "15px" }}>
                        ${order.total}
                      </span>
                    </td>
                    <td>
                      <div style={{ textTransform: "uppercase", fontSize: "11px", fontWeight: 700, color: "#cbd5e1" }}>
                        {order.payment_method}
                      </div>
                      {order.crypto_tx_hash && (
                        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#64748b", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis" }} title={order.crypto_tx_hash}>
                          TX: {order.crypto_tx_hash}
                        </div>
                      )}
                      {order.bkash_trx_id && (
                        <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#f472b6" }}>
                          bKash: {order.bkash_trx_id}
                        </div>
                      )}
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          background: "#0b1120",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          color: "#ffffff",
                          fontSize: "12px",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          outline: "none"
                        }}
                      >
                        <option value="awaiting_payment">Awaiting Payment</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <Link
                        href={`/admin/invoices/${order.invoice_id || order.id}`}
                        className="btn-admin btn-admin-outline btn-admin-sm"
                        target="_blank"
                      >
                        <i className="fa-solid fa-receipt"></i>
                        <span>Invoice</span>
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
