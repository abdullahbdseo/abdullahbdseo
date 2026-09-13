"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      if (data.success) {
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const stats = analyticsData?.stats || {
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    totalLeads: 0,
    conversionRate: "0%",
    avgOrderValue: "$0",
  };

  const toolStats = analyticsData?.toolStats || [];
  const geoTraffic = analyticsData?.geoTraffic || [];
  const auditLogs = analyticsData?.auditLogs || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SEO Tools Usage & Platform Analytics</h1>
          <p className="admin-page-desc">
            Monitor client traffic demographics, free SEO tool performance, and real-time audit logs
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={fetchAnalytics} className="btn-admin btn-admin-primary">
            <i className="fa-solid fa-arrows-rotate"></i>
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="admin-stats-row">
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Tool Runs</span>
            <div className="admin-stat-icon-wrap icon-purple">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
          </div>
          <div className="admin-stat-value">1,047+</div>
          <div className="admin-stat-footer">
            <span className="trend-up"><i className="fa-solid fa-arrow-trend-up"></i> +32.4%</span>
            <span>This month</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Lead Conversion Rate</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-chart-line"></i>
            </div>
          </div>
          <div className="admin-stat-value">{stats.conversionRate}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>High intent</span>
            <span>From audit tools</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Average Order Value</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-hand-holding-dollar"></i>
            </div>
          </div>
          <div className="admin-stat-value">{stats.avgOrderValue}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Per client</span>
            <span>Service retainers</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Leads Captured</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-bullseye"></i>
            </div>
          </div>
          <div className="admin-stat-value">{stats.totalLeads}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>Organic</span>
            <span>SEO pipeline</span>
          </div>
        </div>
      </div>

      {/* 3. TOOL USAGE & CONVERSION BREAKDOWN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {/* Tool Popularity Bar Widget */}
        <div className="admin-table-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                Free SEO Tools Popularity
              </h3>
              <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
                Total executions and lead capture percentage
              </p>
            </div>
            <Link href="/admin/tools" className="btn-admin btn-admin-outline btn-admin-sm">
              <span>Manage Tools</span>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {toolStats.map((tool, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                  <span style={{ color: "#0f172a" }}>{tool.name}</span>
                  <span style={{ color: "#2563eb" }}>{tool.runs} runs ({tool.leadsGenerated} leads)</span>
                </div>
                <div style={{ width: "100%", height: "9px", background: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${tool.percentage * 2.5}%`,
                      background: idx === 0 ? "#2563eb" : idx === 1 ? "#7c3aed" : idx === 2 ? "#0891b2" : "#d97706",
                      borderRadius: "9999px",
                      transition: "width 0.8s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Traffic Share */}
        <div className="admin-table-card" style={{ padding: "24px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
              Target Market & Visitor Demographics
            </h3>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Audience share across domestic & international markets
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {geoTraffic.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{item.flag}</span>
                  <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>{item.country}</span>
                </div>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#2563eb" }}>{item.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECENT SYSTEM & AUDIT LOGS */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">System Activity & Audit Trail</h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Immutable activity logs for order status changes, CMS edits, and lead captures
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Event Time</th>
                <th>Action Type</th>
                <th>Description</th>
                <th>Triggered By</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    No audit logs available.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : "Recent"}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "13px" }}>
                        {log.description}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}>
                        <i className="fa-solid fa-user-gear" style={{ marginRight: "6px", color: "#94a3b8" }}></i>
                        {log.user || "Admin"}
                      </span>
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
