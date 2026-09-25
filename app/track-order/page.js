"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || searchParams.get("order") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchTrack = async (searchVal) => {
    const q = (searchVal || query).trim();
    if (!q) {
      setError("Please enter your Order ID, Email, or Phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/orders/track?q=${encodeURIComponent(q)}&_t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError(data.error || "Order not found. Please verify your Order Number.");
      }
    } catch (err) {
      setError("Failed to connect to tracking server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchTrack(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTrack(query);
  };

  const getStatusBadgeColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("completed") || s.includes("delivered")) return { bg: "#ecfdf5", color: "#065f46", border: "#a7f3d0" };
    if (s.includes("progress") || s.includes("processing")) return { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe" };
    if (s.includes("review")) return { bg: "#fef3c7", color: "#92400e", border: "#fde68a" };
    return { bg: "#f1f5f9", color: "#475569", border: "#cbd5e1" };
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        
        {/* Header Box */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #bfdbfe",
              padding: "5px 14px",
              borderRadius: "4px",
              fontSize: "12.5px",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            <i className="fa-solid fa-satellite-dish"></i>
            <span>Live Project & Campaign Tracker</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(26px, 4vw, 36px)",
              fontWeight: 900,
              color: "#0f172a",
              marginBottom: "10px",
              letterSpacing: "-0.02em",
            }}
          >
            Track Your SEO & Backlink Campaign
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Enter your Order Number (e.g. <code>ORD-9821</code>), Billing Email, or Phone to inspect live execution progress, milestones, and deliverables.
          </p>
        </div>

        {/* Search Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
            marginBottom: "30px",
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 300px" }}>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-1024), Email, or Phone..."
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 40px",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-admin btn-admin-primary"
              style={{
                borderRadius: "4px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-location-crosshairs"></i>
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div
              style={{
                marginTop: "16px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#991b1b",
                padding: "12px 16px",
                borderRadius: "4px",
                fontSize: "13.5px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Tracking Details View */}
        {order && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Top Order Summary Card */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                padding: "24px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "14px",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: "18px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                    Order Number
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", fontFamily: "monospace" }}>
                    {order.order_number}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {(() => {
                    const badge = getStatusBadgeColor(order.status);
                    return (
                      <span
                        style={{
                          background: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          padding: "6px 14px",
                          borderRadius: "4px",
                          fontWeight: 800,
                          fontSize: "13px",
                          textTransform: "capitalize",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="fa-solid fa-circle-dot" style={{ fontSize: "10px" }}></i>
                        <span>{order.status}</span>
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Order Info Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Client Name</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{order.client_name}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Service Offering</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{order.service_name}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Package / Tier</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{order.package_name}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Estimated Delivery</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#2563eb" }}>
                    <i className="fa-regular fa-clock" style={{ marginRight: "4px" }}></i>
                    {order.estimated_delivery}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>
                  <span style={{ color: "#334155" }}>Overall Campaign Execution Progress</span>
                  <span style={{ color: "#2563eb" }}>{order.progress_percent}%</span>
                </div>
                <div style={{ width: "100%", height: "10px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${order.progress_percent}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                      borderRadius: "4px",
                      transition: "width 0.8s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>

              {/* Deliverables & Work Report Section */}
              {(order.delivery_link || order.report_url || order.status?.toLowerCase().includes("complete") || order.status?.toLowerCase().includes("deliver")) && (
                <div
                  style={{
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    borderRadius: "4px",
                    padding: "18px 20px",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#059669", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                        <i className="fa-solid fa-file-shield"></i>
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 800, color: "#065f46" }}>Live Campaign Deliverables &amp; Backlink Report</div>
                        <div style={{ fontSize: "12px", color: "#047857" }}>Real-time live Google Sheets with verified indexed URLs, anchor texts &amp; DA metrics</div>
                      </div>
                    </div>

                    {order.delivery_link || order.report_url ? (
                      <a
                        href={order.delivery_link || order.report_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#059669",
                          color: "#ffffff",
                          fontWeight: 700,
                          padding: "8px 16px",
                          borderRadius: "4px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          boxShadow: "0 2px 5px rgba(5,150,105,0.2)"
                        }}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        <span>Open Live Google Sheet</span>
                      </a>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#047857", fontWeight: 700, background: "#d1fae5", padding: "4px 10px", borderRadius: "4px" }}>
                        Compiling Final Report...
                      </span>
                    )}
                  </div>

                  {order.delivery_notes && (
                    <div style={{ background: "#ffffff", border: "1px solid #d1fae5", borderRadius: "4px", padding: "10px 14px", fontSize: "13px", color: "#1e293b", lineHeight: 1.5 }}>
                      <strong style={{ color: "#059669" }}>Fulfillment Note: </strong>
                      {order.delivery_notes}
                    </div>
                  )}
                </div>
              )}

              {/* Action Links */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
                <Link
                  href={`/invoices/${order.invoice_id || order.order_number}`}
                  className="btn-admin"
                  style={{
                    background: "#2563eb",
                    color: "#ffffff",
                    fontWeight: 700,
                    padding: "8px 16px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                  }}
                >
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                  <span>View &amp; Download Invoice</span>
                </Link>

                <a
                  href={`https://wa.me/8801670769816?text=${encodeURIComponent(`Hello Abdullah, I am tracking my order ${order.order_number}. Could you share an update?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-admin"
                  style={{
                    background: "#25D366",
                    color: "#ffffff",
                    fontWeight: 700,
                    padding: "8px 16px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                  }}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>WhatsApp Live Support</span>
                </a>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                padding: "24px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "20px" }}>
                Campaign Milestones & Execution Stages
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {order.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      position: "relative",
                    }}
                  >
                    {/* Circle Icon Indicator */}
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        background: step.completed ? "#ecfdf5" : step.active ? "#eff6ff" : "#f8fafc",
                        border: step.completed ? "2px solid #10b981" : step.active ? "2px solid #2563eb" : "2px solid #e2e8f0",
                        color: step.completed ? "#059669" : step.active ? "#2563eb" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "13px",
                        flexShrink: 0,
                      }}
                    >
                      {step.completed ? (
                        <i className="fa-solid fa-check"></i>
                      ) : step.active ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "14px", color: step.completed || step.active ? "#0f172a" : "#64748b" }}>
                          {step.title}
                        </span>
                        {step.active && (
                          <span style={{ fontSize: "11px", fontWeight: 700, background: "#dbeafe", color: "#1e40af", padding: "1px 6px", borderRadius: "4px" }}>
                            In Progress
                          </span>
                        )}
                        {step.completed && (
                          <span style={{ fontSize: "11px", fontWeight: 700, background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: "4px" }}>
                            Completed
                          </span>
                        )}
                      </div>
                      <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "#64748b", lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Back Link */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link
            href="/"
            style={{ color: "#64748b", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
          >
            <i className="fa-solid fa-arrow-left" style={{ marginRight: "6px" }}></i>
            Back to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "80px" }}>Loading order tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
