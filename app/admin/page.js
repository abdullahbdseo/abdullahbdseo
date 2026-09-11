"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setOrders(DB.getOrders());
    setInquiries(DB.getInquiries());
    setInvoices(DB.getInvoices());
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === "in_progress" || o.status === "awaiting_payment").length;
  const completedOrdersCount = orders.filter(o => o.status === "completed").length;

  return (
    <div className="admin-dashboard-page" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* 1. HERO HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Platform & Operations Overview</h1>
          <p className="admin-page-desc">Real-time revenue metrics, client orders, and SEO fulfillment workflows</p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link href="/admin/orders" className="btn-admin btn-admin-primary">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Manage Orders</span>
          </Link>
          <Link href="/admin/blogs" className="btn-admin btn-admin-outline">
            <i className="fa-solid fa-pen-to-square"></i>
            <span>New Blog</span>
          </Link>
        </div>
      </div>

      {/* 2. STATS & KPI METRIC CARDS */}
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
            <span>Across all channels</span>
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
            <span style={{ color: "#60a5fa", fontWeight: 700 }}>{activeOrdersCount} Active</span>
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
            <span style={{ color: "#c084fc", fontWeight: 700 }}>100%</span>
            <span>On-time milestone delivery</span>
          </div>
        </div>

        {/* Inbound Inquiries */}
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Consultations</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
          </div>
          <div className="admin-stat-value">{inquiries.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#fbbf24", fontWeight: 700 }}>Active</span>
            <span>Contact & audit leads</span>
          </div>
        </div>
      </div>

      {/* 3. QUICK ACTIONS BAR */}
      <div>
        <div style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", marginBottom: "12px" }}>
          Quick CMS Operations
        </div>
        <div className="admin-quick-actions">
          <Link href="/admin/orders" className="admin-action-btn">
            <i className="fa-solid fa-list-check"></i>
            <div>
              <div>Client Orders</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Update delivery statuses</div>
            </div>
          </Link>

          <Link href="/admin/blogs" className="admin-action-btn">
            <i className="fa-solid fa-newspaper" style={{ color: "#a855f7" }}></i>
            <div>
              <div>Blog Articles</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Publish & edit SEO posts</div>
            </div>
          </Link>

          <Link href="/admin/services" className="admin-action-btn">
            <i className="fa-solid fa-layer-group" style={{ color: "#06b6d4" }}></i>
            <div>
              <div>Services & Packages</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Edit deliverables & tiers</div>
            </div>
          </Link>

          <Link href="/admin/settings" className="admin-action-btn">
            <i className="fa-solid fa-sliders" style={{ color: "#f59e0b" }}></i>
            <div>
              <div>Site & Meta Settings</div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>Branding, Contact & Schema</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. RECENT ORDERS TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">Recent Client Deliverables & Orders</h2>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
              Latest service purchases awaiting execution or completed
            </p>
          </div>
          <Link href="/admin/orders" className="btn-admin btn-admin-outline btn-admin-sm">
            <span>View All ({orders.length})</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Target Website</th>
                <th>Service Deliverable</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    No orders in database yet.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 8).map((order) => (
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
                      <span style={{ textTransform: "uppercase", fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>
                        {order.payment_method}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${order.status}`}>
                        {order.status === "completed" ? (
                          <><i className="fa-solid fa-circle-check"></i> Completed</>
                        ) : order.status === "in_progress" ? (
                          <><i className="fa-solid fa-spinner fa-spin"></i> In Progress</>
                        ) : (
                          <><i className="fa-solid fa-clock"></i> {order.status}</>
                        )}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/admin/invoices/${order.invoice_id || order.id}`}
                        className="btn-admin btn-admin-outline btn-admin-sm"
                        target="_blank"
                      >
                        <i className="fa-solid fa-file-invoice"></i>
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
