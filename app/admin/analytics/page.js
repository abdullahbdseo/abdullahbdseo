"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedToolFilter, setSelectedToolFilter] = useState("all");
  const [selectedScoreFilter, setSelectedScoreFilter] = useState("all");
  const [selectedLogDetail, setSelectedLogDetail] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      if (data.success) {
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // Auto-refresh every 30 seconds for live audit stream
    const interval = setInterval(() => {
      fetch("/api/admin/analytics")
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setAnalyticsData(d);
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteLog = async (id, e) => {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to remove this audit log?")) return;
    try {
      setActionLoading(true);
      const res = await fetch(`/api/tools/track-usage?id=${id}`, { method: "DELETE" });
      const d = await res.json();
      if (d.success) {
        showToast("Audit log deleted successfully");
        fetchAnalytics();
        if (selectedLogDetail?.id === id) setSelectedLogDetail(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearAllLogs = async () => {
    if (!confirm("Are you sure you want to clear ALL live tool audit logs?")) return;
    try {
      setActionLoading(true);
      const res = await fetch("/api/tools/track-usage?clearAll=true", { method: "DELETE" });
      const d = await res.json();
      if (d.success) {
        showToast("All tool audit logs cleared");
        fetchAnalytics();
        setSelectedLogDetail(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const exportCSV = () => {
    const logs = analyticsData?.toolUsageLogs || [];
    if (!logs.length) {
      alert("No logs available to export.");
      return;
    }
    const headers = ["Timestamp", "Tool Name", "Target URL", "Domain", "Score", "Visitor IP", "Country", "Device", "Input Summary"];
    const rows = logs.map(l => [
      `"${l.timestamp || ""}"`,
      `"${(l.tool_name || l.toolName || "").replace(/"/g, '""')}"`,
      `"${(l.target_url || l.targetUrl || "").replace(/"/g, '""')}"`,
      `"${(l.target_domain || l.targetDomain || "").replace(/"/g, '""')}"`,
      `"${l.score !== null && l.score !== undefined ? l.score : ""}"`,
      `"${l.ip || ""}"`,
      `"${l.country || ""}"`,
      `"${l.device || ""}"`,
      `"${(l.input_summary || l.inputSummary || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `website_audits_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit logs exported to CSV");
  };

  const toolStats = analyticsData?.toolStats || [];
  const geoTraffic = analyticsData?.geoTraffic || [];
  const toolUsageLogs = analyticsData?.toolUsageLogs || [];
  const topAuditedWebsites = analyticsData?.topAuditedWebsites || [];
  const totalToolRuns = analyticsData?.totalToolRuns || 0;
  const todayToolRuns = analyticsData?.todayToolRuns || 0;
  const uniqueWebsitesCount = analyticsData?.uniqueWebsitesCount || 0;

  // Filtered Tool Logs
  const filteredLogs = useMemo(() => {
    return toolUsageLogs.filter((log) => {
      const toolName = (log.tool_name || log.toolName || "").toLowerCase();
      const targetUrl = (log.target_url || log.targetUrl || "").toLowerCase();
      const domain = (log.target_domain || log.targetDomain || "").toLowerCase();
      const ip = (log.ip || "").toLowerCase();
      const summary = (log.input_summary || log.inputSummary || "").toLowerCase();
      const country = (log.country || "").toLowerCase();

      // Tool Filter
      if (selectedToolFilter !== "all") {
        if (!toolName.includes(selectedToolFilter.toLowerCase())) {
          return false;
        }
      }

      // Score Filter
      if (selectedScoreFilter === "high" && (log.score === null || log.score < 80)) return false;
      if (selectedScoreFilter === "medium" && (log.score === null || log.score < 50 || log.score >= 80)) return false;
      if (selectedScoreFilter === "low" && (log.score === null || log.score >= 50)) return false;

      // Search Term
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        toolName.includes(q) ||
        targetUrl.includes(q) ||
        domain.includes(q) ||
        ip.includes(q) ||
        summary.includes(q) ||
        country.includes(q)
      );
    });
  }, [toolUsageLogs, searchTerm, selectedToolFilter, selectedScoreFilter]);

  const getToolBadgeColor = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("deep") || n.includes("audit")) return { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" };
    if (n.includes("schema")) return { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" };
    if (n.includes("speed") || n.includes("vitals")) return { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" };
    if (n.includes("http") || n.includes("header") || n.includes("ssl")) return { bg: "#fffbeb", text: "#b45309", border: "#fde68a" };
    return { bg: "#f1f5f9", text: "#334155", border: "#cbd5e1" };
  };

  const getCountryFlag = (countryCode = "") => {
    const code = countryCode.toUpperCase();
    const flags = {
      BD: "🇧🇩", US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪",
      IN: "🇮🇳", SG: "🇸🇬", AE: "🇦🇪", SA: "🇸🇦", MY: "🇲🇾", FR: "🇫🇷"
    };
    return flags[code] || "🌐";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#0f172a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "4px",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
            fontSize: "13.5px",
            fontWeight: 600,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #334155"
          }}
        >
          <i className="fa-solid fa-circle-check" style={{ color: "#10b981" }}></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER */}
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h1 className="admin-page-title" style={{ margin: 0, fontSize: "22px", fontWeight: 800 }}>
              Live Website Audits & Tool Intelligence
            </h1>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 8px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 700,
                background: "#ecfdf5",
                color: "#047857",
                border: "1px solid #a7f3d0",
                textTransform: "uppercase"
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}></span>
              Live Tracking Active
            </span>
          </div>
          <p className="admin-page-desc" style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
            Real-time telemetry showing which visitors are auditing which websites, target URLs, and tool usage metrics.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={exportCSV}
            className="btn-admin btn-admin-outline"
            style={{ borderRadius: "4px", fontSize: "13px" }}
            title="Export all audit logs to CSV"
          >
            <i className="fa-solid fa-file-csv" style={{ color: "#059669" }}></i>
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="btn-admin btn-admin-primary"
            style={{ borderRadius: "4px", fontSize: "13px" }}
          >
            <i className={`fa-solid fa-arrows-rotate ${loading ? "fa-spin" : ""}`}></i>
            <span>{loading ? "Refreshing..." : "Refresh Live Feed"}</span>
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS ROW */}
      <div className="admin-stats-row">
        {/* Total Tool Runs */}
        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Tool Executions</span>
            <div className="admin-stat-icon-wrap icon-purple" style={{ borderRadius: "4px" }}>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
          </div>
          <div className="admin-stat-value">{totalToolRuns.toLocaleString()}</div>
          <div className="admin-stat-footer">
            <span className="trend-up"><i className="fa-solid fa-arrow-trend-up"></i> Live</span>
            <span>Recorded client audits</span>
          </div>
        </div>

        {/* Today's Audits */}
        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Today's Audits</span>
            <div className="admin-stat-icon-wrap icon-emerald" style={{ borderRadius: "4px" }}>
              <i className="fa-solid fa-bolt"></i>
            </div>
          </div>
          <div className="admin-stat-value">{todayToolRuns.toLocaleString()}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>24h Activity</span>
            <span>Active prospect scans</span>
          </div>
        </div>

        {/* Unique Websites Checked */}
        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Unique Websites Audited</span>
            <div className="admin-stat-icon-wrap icon-blue" style={{ borderRadius: "4px" }}>
              <i className="fa-solid fa-globe"></i>
            </div>
          </div>
          <div className="admin-stat-value">{uniqueWebsitesCount.toLocaleString()}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Client Leads</span>
            <span>Distinct target domains</span>
          </div>
        </div>

        {/* Top Performed Tool */}
        <div className="admin-stat-glass-card" style={{ borderRadius: "4px" }}>
          <div className="admin-stat-top">
            <span className="admin-stat-label">Top SEO Tool</span>
            <div className="admin-stat-icon-wrap icon-amber" style={{ borderRadius: "4px" }}>
              <i className="fa-solid fa-trophy"></i>
            </div>
          </div>
          <div className="admin-stat-value" style={{ fontSize: "18px", lineHeight: "1.3", paddingTop: "4px" }}>
            {toolStats[0]?.name || "Deep SEO Audit"}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>{toolStats[0]?.runs || 0} Runs</span>
            <span>Highest conversion tool</span>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE ROW: TOP AUDITED WEBSITES & TOOL BREAKDOWN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
        {/* Top Audited Domains Ranking */}
        <div className="admin-table-card" style={{ padding: "20px", borderRadius: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-crosshairs" style={{ color: "#2563eb" }}></i>
                Top Audited Client / Competitor Websites
              </h3>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                Most frequently analyzed domains by visitors
              </p>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", background: "#f1f5f9", padding: "3px 8px", borderRadius: "4px" }}>
              {topAuditedWebsites.length} Active Targets
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {topAuditedWebsites.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "13px" }}>
                No audited target websites recorded yet.
              </div>
            ) : (
              topAuditedWebsites.slice(0, 6).map((site, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    background: idx === 0 ? "#f8fafc" : "#ffffff",
                    borderRadius: "4px",
                    border: "1px solid #e2e8f0",
                    transition: "border-color 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "4px",
                        background: idx === 0 ? "#2563eb" : idx === 1 ? "#0284c7" : "#e2e8f0",
                        color: idx < 2 ? "#ffffff" : "#475569",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 800,
                        flexShrink: 0
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <a
                        href={site.targetUrl || `https://${site.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontWeight: 700,
                          fontSize: "13px",
                          color: "#0f172a",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {site.domain}
                        <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "10px", color: "#94a3b8" }}></i>
                      </a>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>
                        Last: {site.lastAudited ? new Date(site.lastAudited).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent"}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    {site.avgScore !== null && site.avgScore !== undefined && (
                      <span
                        style={{
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 800,
                          background: site.avgScore >= 80 ? "#ecfdf5" : site.avgScore >= 50 ? "#fffbeb" : "#fef2f2",
                          color: site.avgScore >= 80 ? "#047857" : site.avgScore >= 50 ? "#b45309" : "#b91c1c",
                          border: `1px solid ${site.avgScore >= 80 ? "#a7f3d0" : site.avgScore >= 50 ? "#fde68a" : "#fecaca"}`
                        }}
                      >
                        {site.avgScore}/100
                      </span>
                    )}
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "11.5px",
                        fontWeight: 800,
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        border: "1px solid #bfdbfe"
                      }}
                    >
                      {site.auditCount} {site.auditCount === 1 ? "audit" : "audits"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tool Popularity Distribution */}
        <div className="admin-table-card" style={{ padding: "20px", borderRadius: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-chart-pie" style={{ color: "#7c3aed" }}></i>
                SEO Tools Usage Breakdown
              </h3>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                Distribution of user executions across each free utility
              </p>
            </div>
            <Link href="/tools" target="_blank" className="btn-admin btn-admin-outline btn-admin-sm" style={{ borderRadius: "4px", fontSize: "11.5px" }}>
              <span>View Tools</span>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {toolStats.map((tool, idx) => {
              const colors = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#475569"];
              const color = colors[idx % colors.length];
              return (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", fontWeight: 700, marginBottom: "5px" }}>
                    <span style={{ color: "#0f172a" }}>{tool.name}</span>
                    <span style={{ color: color }}>
                      {tool.runs} runs ({tool.percentage}%)
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "7px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(tool.percentage * 2.2, 100)}%`,
                        background: color,
                        borderRadius: "4px",
                        transition: "width 0.6s ease"
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. REAL-TIME AUDIT LOGS & VISITOR TELEMETRY TABLE */}
      <div className="admin-table-card" style={{ borderRadius: "4px" }}>
        {/* Table Header with Filters */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 className="admin-table-title" style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>
                Live Visitor & Website Audit Intelligence
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
                Detailed activity stream of all users executing SEO audits, generating schema, and inspecting client URLs.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={handleClearAllLogs}
                disabled={actionLoading || toolUsageLogs.length === 0}
                className="btn-admin btn-admin-outline btn-admin-sm"
                style={{ borderRadius: "4px", color: "#dc2626", borderColor: "#fecaca", fontSize: "12px" }}
              >
                <i className="fa-regular fa-trash-can"></i>
                <span>Clear All Logs</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Search Input */}
            <div style={{ position: "relative", flex: "1 1 240px" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "13px" }}></i>
              <input
                type="text"
                placeholder="Search by target website, domain, tool name, IP or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 34px",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  background: "#ffffff"
                }}
              />
            </div>

            {/* Filter by Tool */}
            <select
              value={selectedToolFilter}
              onChange={(e) => setSelectedToolFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#334155",
                background: "#ffffff",
                outline: "none"
              }}
            >
              <option value="all">All Tools ({toolUsageLogs.length})</option>
              <option value="deep seo">Deep SEO Audit</option>
              <option value="schema">Schema Markup Generator</option>
              <option value="pagespeed">PageSpeed & Core Web Vitals</option>
              <option value="http">HTTP & SSL Checker</option>
              <option value="keyword">Keyword Density</option>
            </select>

            {/* Filter by Score */}
            <select
              value={selectedScoreFilter}
              onChange={(e) => setSelectedScoreFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#334155",
                background: "#ffffff",
                outline: "none"
              }}
            >
              <option value="all">All Scores</option>
              <option value="high">High Score (80-100)</option>
              <option value="medium">Average (50-79)</option>
              <option value="low">Needs Work (&lt;50)</option>
            </select>

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  padding: "8px 12px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  color: "#475569",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th style={{ width: "140px" }}>Date & Time</th>
                <th style={{ width: "170px" }}>Visitor & Device</th>
                <th style={{ width: "180px" }}>SEO Tool Used</th>
                <th>Target Website Audited</th>
                <th>Result / Summary</th>
                <th style={{ width: "90px", textAlign: "center" }}>Score</th>
                <th style={{ width: "90px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <i className="fa-solid fa-radar" style={{ fontSize: "28px", color: "#cbd5e1" }}></i>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>No matching audit logs found.</span>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>When visitors run audits on the site, their activity will instantly appear here.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const toolName = log.tool_name || log.toolName || "SEO Tool";
                  const targetUrl = log.target_url || log.targetUrl || "";
                  const domain = log.target_domain || log.targetDomain || (targetUrl ? targetUrl.replace(/https?:\/\//, "").split("/")[0] : "—");
                  const summary = log.input_summary || log.inputSummary || "Audit completed";
                  const badge = getToolBadgeColor(toolName);
                  const isMobile = log.device === "Mobile";

                  return (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLogDetail(log)}
                      style={{ cursor: "pointer" }}
                      className="hover-row"
                    >
                      {/* 1. Date & Time */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>
                            {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Just now"}
                          </span>
                          <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {log.timestamp ? new Date(log.timestamp).toLocaleDateString() : ""}
                          </span>
                        </div>
                      </td>

                      {/* 2. Visitor & Device */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "16px" }} title={`Country: ${log.country || 'Unknown'}`}>
                            {getCountryFlag(log.country)}
                          </span>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", fontFamily: "monospace" }}>
                              {log.ip || "127.0.0.1"}
                            </span>
                            <span style={{ fontSize: "11px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                              <i className={`fa-solid ${isMobile ? "fa-mobile-screen" : "fa-laptop"}`} style={{ fontSize: "10px" }}></i>
                              {log.device || "Desktop"} ({log.country || "BD"})
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 3. Tool Badge */}
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.text,
                            border: `1px solid ${badge.border}`
                          }}
                        >
                          {toolName}
                        </span>
                      </td>

                      {/* 4. Target Website Audited */}
                      <td>
                        {targetUrl ? (
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <a
                              href={targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                fontWeight: 700,
                                fontSize: "13px",
                                color: "#2563eb",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px"
                              }}
                            >
                              <i className="fa-solid fa-globe" style={{ fontSize: "12px", color: "#60a5fa" }}></i>
                              {domain}
                              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "9px", opacity: 0.7 }}></i>
                            </a>
                            <span style={{ fontSize: "11px", color: "#94a3b8", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {targetUrl}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: "12.5px", color: "#64748b", fontStyle: "italic" }}>
                            Custom Input Payload
                          </span>
                        )}
                      </td>

                      {/* 5. Summary / Result */}
                      <td>
                        <span
                          style={{
                            fontSize: "12.5px",
                            color: "#334155",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          {summary}
                        </span>
                      </td>

                      {/* 6. Score */}
                      <td style={{ textAlign: "center" }}>
                        {log.score !== null && log.score !== undefined ? (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "11.5px",
                              fontWeight: 800,
                              background: log.score >= 80 ? "#ecfdf5" : log.score >= 50 ? "#fffbeb" : "#fef2f2",
                              color: log.score >= 80 ? "#047857" : log.score >= 50 ? "#b45309" : "#b91c1c",
                              border: `1px solid ${log.score >= 80 ? "#a7f3d0" : log.score >= 50 ? "#fde68a" : "#fecaca"}`
                            }}
                          >
                            {log.score}/100
                          </span>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>—</span>
                        )}
                      </td>

                      {/* 7. Actions */}
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLogDetail(log);
                            }}
                            title="Inspect Audit Report"
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              border: "1px solid #cbd5e1",
                              background: "#ffffff",
                              color: "#2563eb",
                              cursor: "pointer",
                              fontSize: "11.5px"
                            }}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button
                            onClick={(e) => handleDeleteLog(log.id, e)}
                            title="Delete Log"
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              border: "1px solid #fecaca",
                              background: "#ffffff",
                              color: "#dc2626",
                              cursor: "pointer",
                              fontSize: "11.5px"
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12.5px", color: "#64748b" }}>
          <span>Showing <strong>{filteredLogs.length}</strong> of <strong>{toolUsageLogs.length}</strong> total live audit events</span>
          <span>Auto-refreshes every 30 seconds</span>
        </div>
      </div>

      {/* 5. AUDIT DETAIL MODAL */}
      {selectedLogDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 10000
          }}
          onClick={() => setSelectedLogDetail(null)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "4px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              border: "1px solid #e2e8f0"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                  Website Audit & Tool Event Details
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                  Telemetry payload captured from visitor interaction
                </p>
              </div>
              <button
                onClick={() => setSelectedLogDetail(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  color: "#94a3b8",
                  cursor: "pointer"
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Grid Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Tool Executed</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                    {selectedLogDetail.tool_name || selectedLogDetail.toolName}
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Timestamp</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                    {selectedLogDetail.timestamp ? new Date(selectedLogDetail.timestamp).toLocaleString() : "Recent"}
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Visitor IP & Origin</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                    {getCountryFlag(selectedLogDetail.country)} {selectedLogDetail.ip || "127.0.0.1"} ({selectedLogDetail.country || "BD"})
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Device & Platform</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                    {selectedLogDetail.device || "Desktop"}
                  </div>
                </div>
              </div>

              {/* Target Website */}
              {selectedLogDetail.target_url || selectedLogDetail.targetUrl ? (
                <div style={{ background: "#eff6ff", padding: "12px 14px", borderRadius: "4px", border: "1px solid #bfdbfe" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase" }}>Target Website Under Audit</div>
                  <a
                    href={selectedLogDetail.target_url || selectedLogDetail.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#1d4ed8",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "4px",
                      wordBreak: "break-all"
                    }}
                  >
                    {selectedLogDetail.target_url || selectedLogDetail.targetUrl}
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px" }}></i>
                  </a>
                </div>
              ) : null}

              {/* Input Summary */}
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                  Execution Summary / Status
                </div>
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                  {selectedLogDetail.input_summary || selectedLogDetail.inputSummary || "No summary notes recorded."}
                </div>
              </div>

              {/* Full Meta Payload */}
              {selectedLogDetail.meta && Object.keys(selectedLogDetail.meta).length > 0 && (
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                    Audit Meta Attributes (JSON)
                  </div>
                  <pre
                    style={{
                      background: "#0f172a",
                      color: "#38bdf8",
                      padding: "12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      overflowX: "auto",
                      fontFamily: "monospace",
                      margin: 0
                    }}
                  >
                    {JSON.stringify(selectedLogDetail.meta, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => handleDeleteLog(selectedLogDetail.id)}
                className="btn-admin btn-admin-outline"
                style={{ borderRadius: "4px", color: "#dc2626", borderColor: "#fecaca", fontSize: "12.5px" }}
              >
                <i className="fa-solid fa-trash-can"></i>
                <span>Delete This Record</span>
              </button>
              <button
                onClick={() => setSelectedLogDetail(null)}
                className="btn-admin btn-admin-primary"
                style={{ borderRadius: "4px", fontSize: "12.5px" }}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
