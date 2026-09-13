"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState("inquiries"); // "inquiries" | "tools"
  const [inquiries, setInquiries] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  const handleStatusChange = async (type, id, newStatus) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Status updated to "${newStatus}" successfully.`);
        fetchData();
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem({ ...selectedItem, status: newStatus });
        }
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}&type=${type}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Lead deleted successfully.");
        fetchData();
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem(null);
        }
      }
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  const exportToCSV = () => {
    const dataToExport = activeTab === "inquiries" ? inquiries : leads;
    if (dataToExport.length === 0) return alert("No data to export");

    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === "inquiries") {
      csvContent += "ID,Name,Email,Phone,Website,Budget,Service,Status,Date\n";
      dataToExport.forEach((item) => {
        csvContent += `"${item.id}","${item.name}","${item.email}","${item.phone || ""}","${item.website_url || ""}","${item.budget || ""}","${item.service_interested || ""}","${item.status}","${item.created_at}"\n`;
      });
    } else {
      csvContent += "ID,Source Tool,Website,Email,Phone,Status,Date\n";
      dataToExport.forEach((item) => {
        csvContent += `"${item.id}","${item.source_tool}","${item.website_url || ""}","${item.contact_email || ""}","${item.contact_phone || ""}","${item.status}","${item.created_at}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter items
  const currentList = activeTab === "inquiries" ? inquiries : leads;
  const filteredList = currentList.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.contact_email && item.contact_email.toLowerCase().includes(q)) ||
      (item.website_url && item.website_url.toLowerCase().includes(q)) ||
      (item.source_tool && item.source_tool.toLowerCase().includes(q));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalNew = [...inquiries, ...leads].filter((i) => i.status === "new").length;
  const totalConverted = [...inquiries, ...leads].filter((i) => i.status === "converted").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inbound Leads & Client Inquiries</h1>
          <p className="admin-page-desc">
            Manage prospective client leads, free SEO audit inquiries, and consultation requests
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={exportToCSV} className="btn-admin btn-admin-outline">
            <i className="fa-solid fa-file-csv"></i>
            <span>Export CSV</span>
          </button>
          <button onClick={fetchData} className="btn-admin btn-admin-primary">
            <i className="fa-solid fa-rotate"></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
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
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* 2. STATS OVERVIEW */}
      <div className="admin-stats-row">
        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Leads & Inquiries</span>
            <div className="admin-stat-icon-wrap icon-blue">
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
          <div className="admin-stat-value">{inquiries.length + leads.length}</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Inbound</span>
            <span>from forms & free tools</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">New & Unread</span>
            <div className="admin-stat-icon-wrap icon-amber">
              <i className="fa-solid fa-bell"></i>
            </div>
          </div>
          <div className="admin-stat-value" style={{ color: totalNew > 0 ? "#d97706" : "#0f172a" }}>
            {totalNew}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#d97706", fontWeight: 700 }}>Requires Follow-up</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Converted Clients</span>
            <div className="admin-stat-icon-wrap icon-emerald">
              <i className="fa-solid fa-handshake"></i>
            </div>
          </div>
          <div className="admin-stat-value" style={{ color: "#059669" }}>
            {totalConverted}
          </div>
          <div className="admin-stat-footer">
            <span style={{ color: "#059669", fontWeight: 700 }}>
              {inquiries.length + leads.length > 0
                ? `${Math.round((totalConverted / (inquiries.length + leads.length)) * 100)}%`
                : "0%"}
            </span>
            <span>Conversion rate</span>
          </div>
        </div>

        <div className="admin-stat-glass-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Estimated Pipeline</span>
            <div className="admin-stat-icon-wrap icon-purple">
              <i className="fa-solid fa-sack-dollar"></i>
            </div>
          </div>
          <div className="admin-stat-value">$8,200+</div>
          <div className="admin-stat-footer">
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>Active potential</span>
          </div>
        </div>
      </div>

      {/* 3. TABS & CONTROLS */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              setActiveTab("inquiries");
              setSelectedItem(null);
            }}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              border: "none",
              background: activeTab === "inquiries" ? "#2563eb" : "#f1f5f9",
              color: activeTab === "inquiries" ? "#ffffff" : "#475569",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
          >
            <i className="fa-solid fa-envelope-open-text"></i>
            <span>Consultation Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("tools");
              setSelectedItem(null);
            }}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              border: "none",
              background: activeTab === "tools" ? "#2563eb" : "#f1f5f9",
              color: activeTab === "tools" ? "#ffffff" : "#475569",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
          >
            <i className="fa-solid fa-screwdriver-wrench"></i>
            <span>Tool Free Audit Leads ({leads.length})</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
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
              placeholder="Search by name, email, URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "8px 12px 8px 34px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                outline: "none",
                minWidth: "220px",
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
            <option value="all">All Statuses</option>
            <option value="new">New / Unread</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* 4. MAIN LEADS TABLE */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2 className="admin-table-title">
              {activeTab === "inquiries" ? "Consultation & Proposal Requests" : "Free SEO Audit & Tool Submissions"}
            </h2>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Showing {filteredList.length} total entries
            </p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              {activeTab === "inquiries" ? (
                <tr>
                  <th>Client / Sender</th>
                  <th>Website / Domain</th>
                  <th>Service & Budget</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              ) : (
                <tr>
                  <th>Source Tool</th>
                  <th>Website URL</th>
                  <th>Contact Info</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              )}
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                    Loading inbound leads...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No leads found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => {
                  const itemType = activeTab === "inquiries" ? "inquiry" : "lead";
                  const email = item.email || item.contact_email;
                  const phone = item.phone || item.contact_phone;
                  const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

                  return (
                    <tr key={item.id} style={{ background: item.status === "new" ? "#f8faff" : "inherit" }}>
                      {activeTab === "inquiries" ? (
                        <td>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{item.name}</div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>{item.email}</div>
                          {item.phone && (
                            <div style={{ fontSize: "11.5px", color: "#0891b2", fontWeight: 600 }}>{item.phone}</div>
                          )}
                        </td>
                      ) : (
                        <td>
                          <div style={{ fontWeight: 700, color: "#2563eb", display: "flex", alignItems: "center", gap: "6px" }}>
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            {item.source_tool}
                          </div>
                          {item.seo_score && (
                            <div style={{ fontSize: "11.5px", color: "#059669", fontWeight: 700 }}>
                              SEO Score: {item.seo_score}/100
                            </div>
                          )}
                        </td>
                      )}

                      <td>
                        {item.website_url ? (
                          <a
                            href={item.website_url.startsWith("http") ? item.website_url : `https://${item.website_url}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontFamily: "monospace", color: "#2563eb", fontSize: "13px", textDecoration: "underline" }}
                          >
                            {item.website_url}
                          </a>
                        ) : (
                          <span style={{ color: "#94a3b8" }}>N/A</span>
                        )}
                      </td>

                      {activeTab === "inquiries" ? (
                        <td>
                          <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "13px" }}>
                            {item.service_interested || "General Inquiry"}
                          </div>
                          {item.budget && (
                            <div style={{ fontSize: "11.5px", color: "#059669", fontWeight: 700 }}>
                              Budget: {item.budget}
                            </div>
                          )}
                        </td>
                      ) : (
                        <td>
                          <div style={{ fontSize: "12.5px", color: "#0f172a", fontWeight: 600 }}>{email || "N/A"}</div>
                          {phone && <div style={{ fontSize: "11.5px", color: "#64748b" }}>{phone}</div>}
                        </td>
                      )}

                      <td>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                        </span>
                      </td>

                      <td>
                        <select
                          value={item.status || "new"}
                          onChange={(e) => handleStatusChange(itemType, item.id, e.target.value)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            border: "1px solid #cbd5e1",
                            background:
                              item.status === "new"
                                ? "#fef3c7"
                                : item.status === "converted"
                                ? "#d1fae5"
                                : item.status === "contacted"
                                ? "#dbeafe"
                                : "#f1f5f9",
                            color:
                              item.status === "new"
                                ? "#92400e"
                                : item.status === "converted"
                                ? "#065f46"
                                : item.status === "contacted"
                                ? "#1e40af"
                                : "#475569",
                            cursor: "pointer",
                          }}
                        >
                          <option value="new">🟡 New</option>
                          <option value="contacted">🔵 Contacted</option>
                          <option value="converted">🟢 Converted</option>
                          <option value="archived">⚪ Archived</option>
                        </select>
                      </td>

                      <td>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <button
                            onClick={() => setSelectedItem(item)}
                            title="View Full Message"
                            className="btn-admin btn-admin-outline btn-admin-sm"
                            style={{ padding: "5px 9px" }}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>

                          {email && (
                            <a
                              href={`mailto:${email}?subject=SEO%20Proposal%20Follow-up%20-%20Abdullah%20Saleh`}
                              title="Send Email"
                              className="btn-admin btn-admin-outline btn-admin-sm"
                              style={{ padding: "5px 9px", color: "#2563eb" }}
                            >
                              <i className="fa-solid fa-envelope"></i>
                            </a>
                          )}

                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="btn-admin btn-admin-outline btn-admin-sm"
                              style={{ padding: "5px 9px", color: "#16a34a" }}
                            >
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                          )}

                          <button
                            onClick={() => handleDelete(itemType, item.id)}
                            title="Delete Record"
                            className="btn-admin btn-admin-outline btn-admin-sm"
                            style={{ padding: "5px 9px", color: "#ef4444" }}
                          >
                            <i className="fa-solid fa-trash"></i>
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
      </div>

      {/* 5. MODAL POPUP FOR DETAILS VIEW */}
      {selectedItem && (
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
              animation: "modalFadeIn 0.2s ease-out",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: 800 }}>
                Lead & Inquiry Details
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
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

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
              {selectedItem.name && (
                <div>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Name: </span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{selectedItem.name}</span>
                </div>
              )}

              <div>
                <span style={{ color: "#64748b", fontWeight: 600 }}>Email: </span>
                <a href={`mailto:${selectedItem.email || selectedItem.contact_email}`} style={{ color: "#2563eb", fontWeight: 600 }}>
                  {selectedItem.email || selectedItem.contact_email || "N/A"}
                </a>
              </div>

              {(selectedItem.phone || selectedItem.contact_phone) && (
                <div>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Phone / WhatsApp: </span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedItem.phone || selectedItem.contact_phone}
                  </span>
                </div>
              )}

              {selectedItem.website_url && (
                <div>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Target Website: </span>
                  <a
                    href={selectedItem.website_url.startsWith("http") ? selectedItem.website_url : `https://${selectedItem.website_url}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2563eb", fontFamily: "monospace" }}
                  >
                    {selectedItem.website_url}
                  </a>
                </div>
              )}

              {selectedItem.service_interested && (
                <div>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Service of Interest: </span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{selectedItem.service_interested}</span>
                </div>
              )}

              {selectedItem.budget && (
                <div>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Client Budget: </span>
                  <span style={{ fontWeight: 700, color: "#059669" }}>{selectedItem.budget}</span>
                </div>
              )}

              {selectedItem.message && (
                <div style={{ marginTop: "6px" }}>
                  <div style={{ color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>Message / Request Note:</div>
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      lineHeight: "1.6",
                      color: "#334155",
                    }}
                  >
                    {selectedItem.message}
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setSelectedItem(null)} className="btn-admin btn-admin-outline">
                Close
              </button>
              {(selectedItem.email || selectedItem.contact_email) && (
                <a
                  href={`mailto:${selectedItem.email || selectedItem.contact_email}`}
                  className="btn-admin btn-admin-primary"
                >
                  <i className="fa-solid fa-reply"></i>
                  <span>Reply via Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
