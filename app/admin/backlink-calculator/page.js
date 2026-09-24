"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/useCMS";
import Link from "next/link";
import { backlinkCalculator as defaultBacklinkCalculator } from "@/lib/data";

const CATEGORIES = [
  "Brand Entity",
  "Contextual In-Content",
  "Fast Indexing",
  "Document Embeds",
  "High Authority",
  "Community Traffic",
  "Digital PR",
  "Institutional Trust",
  "Local SEO & NAP",
  "Audio & Podcast",
  "Visual & Infographics",
  "Video & Streaming",
  "Classifieds & Local"
];

const PRESET_COLORS = [
  "#3b82f6",
  "#10b981",
  "#6366f1",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#0284c7",
  "#059669",
  "#ea580c",
  "#ec4899",
  "#14b8a6",
  "#64748b"
];

export default function AdminBacklinkCalculatorPage() {
  const { data, loading, saving, error, saveMsg, saveSection } = useCMS();
  
  const [activeTab, setActiveTab] = useState("services"); // "services" | "bundles" | "settings" | "faqs"
  
  const [calcData, setCalcData] = useState(() => defaultBacklinkCalculator || {
    settings: {
      bdtRate: 122,
      tier2Multiplier: 0.15,
      expressMultiplier: 0.20,
      turnaroundStandard: "10–14 Days",
      turnaroundExpress: "3–5 Days (Express)",
      whatsappNumber: "+8801670769816"
    },
    services: [],
    presetBundles: [],
    faqs: []
  });

  // Modal / Editing states for Services
  const [editingService, setEditingService] = useState(null);
  const [isNewService, setIsNewService] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  // Modal / Editing states for Bundles
  const [editingBundle, setEditingBundle] = useState(null);
  const [isNewBundle, setIsNewBundle] = useState(false);
  const [deleteBundleId, setDeleteBundleId] = useState(null);

  // Modal / Editing states for FAQs
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqIndex, setFaqIndex] = useState(null);
  const [isNewFaq, setIsNewFaq] = useState(false);
  const [deleteFaqIdx, setDeleteFaqIdx] = useState(null);

  useEffect(() => {
    if (data?.backlinkCalculator) {
      setCalcData(data.backlinkCalculator);
    } else if (defaultBacklinkCalculator) {
      setCalcData(defaultBacklinkCalculator);
    }
  }, [data]);

  const handleSaveAll = async (updated) => {
    const toSave = updated || calcData;
    setCalcData(toSave);
    await saveSection("backlinkCalculator", toSave);
  };

  // --- SERVICE ACTIONS ---
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    let updatedServices = [...(calcData.services || [])];
    if (isNewService) {
      // Validate unique ID
      let serviceId = editingService.id?.trim() || editingService.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
      if (updatedServices.some(s => s.id === serviceId)) {
        serviceId = `${serviceId}_${Date.now()}`;
      }
      updatedServices.push({ ...editingService, id: serviceId });
    } else {
      updatedServices = updatedServices.map(s => s.id === editingService.id ? editingService : s);
    }

    const updated = { ...calcData, services: updatedServices };
    setCalcData(updated);
    await handleSaveAll(updated);
    setEditingService(null);
  };

  const handleDeleteService = async (id) => {
    const updatedServices = (calcData.services || []).filter(s => s.id !== id);
    const updated = { ...calcData, services: updatedServices };
    setCalcData(updated);
    await handleSaveAll(updated);
    setDeleteServiceId(null);
  };

  // --- BUNDLE ACTIONS ---
  const handleSaveBundle = async (e) => {
    e.preventDefault();
    if (!editingBundle) return;

    let updatedBundles = [...(calcData.presetBundles || [])];
    if (isNewBundle) {
      let bundleId = editingBundle.id?.trim() || editingBundle.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
      if (updatedBundles.some(b => b.id === bundleId)) {
        bundleId = `${bundleId}_${Date.now()}`;
      }
      updatedBundles.push({ ...editingBundle, id: bundleId });
    } else {
      updatedBundles = updatedBundles.map(b => b.id === editingBundle.id ? editingBundle : b);
    }

    const updated = { ...calcData, presetBundles: updatedBundles };
    setCalcData(updated);
    await handleSaveAll(updated);
    setEditingBundle(null);
  };

  const handleDeleteBundle = async (id) => {
    const updatedBundles = (calcData.presetBundles || []).filter(b => b.id !== id);
    const updated = { ...calcData, presetBundles: updatedBundles };
    setCalcData(updated);
    await handleSaveAll(updated);
    setDeleteBundleId(null);
  };

  // --- FAQ ACTIONS ---
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    if (!editingFaq) return;

    let updatedFaqs = [...(calcData.faqs || [])];
    if (isNewFaq) {
      updatedFaqs.push(editingFaq);
    } else if (faqIndex !== null) {
      updatedFaqs[faqIndex] = editingFaq;
    }

    const updated = { ...calcData, faqs: updatedFaqs };
    setCalcData(updated);
    await handleSaveAll(updated);
    setEditingFaq(null);
    setFaqIndex(null);
  };

  const handleDeleteFaq = async (idx) => {
    const updatedFaqs = (calcData.faqs || []).filter((_, i) => i !== idx);
    const updated = { ...calcData, faqs: updatedFaqs };
    setCalcData(updated);
    await handleSaveAll(updated);
    setDeleteFaqIdx(null);
  };

  // --- SETTINGS CHANGE ---
  const handleSettingsChange = (field, val) => {
    const updated = {
      ...calcData,
      settings: {
        ...(calcData.settings || {}),
        [field]: val
      }
    };
    setCalcData(updated);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await handleSaveAll(calcData);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "10px", fontSize: "24px" }}></i>
        <span>Loading Backlink Calculator Configuration...</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* 1. PAGE HEADER */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span style={{
              background: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.5px"
            }}>
              LIVE TOOL ENGINE
            </span>
          </div>
          <h1 className="admin-page-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <i className="fa-solid fa-calculator" style={{ color: "#2563eb" }}></i>
            Backlink Package Calculator Manager
          </h1>
          <p className="admin-page-desc">
            Edit backlink services, unit pricing rates, DA scores, preset package bundles, indexation multipliers, and FAQs.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href="/tools/backlink-package-calculator"
            target="_blank"
            className="btn-admin"
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#334155",
              borderRadius: "4px",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none"
            }}
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>View Public Tool</span>
          </Link>

          <button
            type="button"
            onClick={() => handleSaveAll(calcData)}
            disabled={saving}
            className="btn-admin btn-admin-primary"
            style={{
              borderRadius: "4px",
              padding: "8px 18px",
              fontSize: "13px",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {saving ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Saving to Cloud...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-floppy-disk"></i>
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SUCCESS / ERROR ALERTS */}
      {saveMsg && (
        <div style={{
          background: "#ecfdf5",
          border: "1px solid #6ee7b7",
          color: "#065f46",
          padding: "12px 18px",
          borderRadius: "4px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px"
        }}>
          <i className="fa-solid fa-circle-check"></i>
          <span>{saveMsg}</span>
        </div>
      )}

      {error && (
        <div style={{
          background: "#fef2f2",
          border: "1px solid #fca5a5",
          color: "#991b1b",
          padding: "12px 18px",
          borderRadius: "4px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px"
        }}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* 2. NAVIGATION TABS */}
      <div style={{
        display: "flex",
        gap: "6px",
        borderBottom: "1.5px solid #e2e8f0",
        paddingBottom: "2px",
        overflowX: "auto"
      }}>
        {[
          { id: "services", label: `Services & Pricing (${calcData.services?.length || 0})`, icon: "fa-sliders" },
          { id: "bundles", label: `Preset Packages (${calcData.presetBundles?.length || 0})`, icon: "fa-cubes" },
          { id: "settings", label: "Currency & Multipliers", icon: "fa-gear" },
          { id: "faqs", label: `Tool FAQs (${calcData.faqs?.length || 0})`, icon: "fa-circle-question" }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#ffffff" : "#475569",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap"
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: SERVICES & PRICING
          ========================================================================= */}
      {activeTab === "services" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Active Backlink Services &amp; Unit Rates
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "3px 0 0" }}>
                Each service appears as a configurable slider card on the calculator tool.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingService({
                  id: "",
                  name: "",
                  category: "Brand Entity",
                  icon: "fa-solid fa-link",
                  unitPrice: 1.00,
                  da: "DA 85+",
                  min: 0,
                  max: 200,
                  step: 5,
                  presetSteps: [10, 25, 50, 100],
                  accentColor: "#3b82f6",
                  desc: ""
                });
                setIsNewService(true);
              }}
              style={{
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New Service</span>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
            {(calcData.services || []).map((service, idx) => (
              <div
                key={service.id || idx}
                style={{
                  background: "#ffffff",
                  border: `1.5px solid ${service.accentColor || "#e2e8f0"}`,
                  borderRadius: "4px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "4px",
                        background: `${service.accentColor || "#2563eb"}15`,
                        color: service.accentColor || "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                      }}>
                        <i className={service.icon || "fa-solid fa-link"}></i>
                      </div>
                      <div>
                        <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                          {service.name}
                        </h3>
                        <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
                          ID: <code style={{ color: "#2563eb" }}>{service.id}</code>
                        </span>
                      </div>
                    </div>

                    <span style={{
                      background: "#dcfce7",
                      color: "#166534",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: "4px"
                    }}>
                      {service.da || "DA 80+"}
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "#475569", margin: "0 0 14px", lineHeight: "1.45" }}>
                    {service.desc || "No description provided."}
                  </p>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    background: "#f8fafc",
                    padding: "10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginBottom: "14px",
                    border: "1px solid #e2e8f0"
                  }}>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Unit Price</span>
                      <strong style={{ color: "#0f172a", fontSize: "14px" }}>${Number(service.unitPrice || 0).toFixed(2)}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Category</span>
                      <strong style={{ color: "#0f172a" }}>{service.category}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Range (Min - Max)</span>
                      <strong style={{ color: "#0f172a" }}>{service.min} – {service.max} (step: {service.step})</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Preset Steps</span>
                      <strong style={{ color: "#0f172a" }}>{(service.presetSteps || []).join(", ")}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingService({ ...service });
                      setIsNewService(false);
                    }}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      color: "#334155",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteServiceId(service.id)}
                    style={{
                      background: "#fee2e2",
                      border: "1px solid #fca5a5",
                      color: "#991b1b",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: PRESET PACKAGES (BUNDLES)
          ========================================================================= */}
      {activeTab === "bundles" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Pre-Configured Strategy Packs
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "3px 0 0" }}>
                Visitors can click these preset cards to automatically populate all slider values at once.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const initialConfig = {};
                (calcData.services || []).forEach(s => { initialConfig[s.id] = 0; });
                setEditingBundle({
                  id: "",
                  name: "",
                  tag: "Popular Pack",
                  icon: "fa-solid fa-rocket",
                  badgeColor: "#3b82f6",
                  desc: "",
                  config: initialConfig
                });
                setIsNewBundle(true);
              }}
              style={{
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New Bundle</span>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "18px" }}>
            {(calcData.presetBundles || []).map((bundle, idx) => {
              // Calculate total links and estimated price for this bundle
              let totalLinks = 0;
              let estUSD = 0;
              Object.entries(bundle.config || {}).forEach(([sId, qty]) => {
                totalLinks += Number(qty || 0);
                const sObj = (calcData.services || []).find(s => s.id === sId);
                if (sObj) {
                  estUSD += Number(qty || 0) * (sObj.unitPrice || 0);
                }
              });

              return (
                <div
                  key={bundle.id || idx}
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "4px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "4px",
                          background: `${bundle.badgeColor || "#2563eb"}15`,
                          color: bundle.badgeColor || "#2563eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px"
                        }}>
                          <i className={bundle.icon || "fa-solid fa-rocket"}></i>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                            {bundle.name}
                          </h3>
                          <span style={{ fontSize: "11px", color: "#64748b" }}>
                            ID: <code style={{ color: "#2563eb" }}>{bundle.id}</code>
                          </span>
                        </div>
                      </div>

                      <span style={{
                        background: bundle.badgeColor || "#2563eb",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "4px"
                      }}>
                        {bundle.tag}
                      </span>
                    </div>

                    <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 14px", lineHeight: "1.45" }}>
                      {bundle.desc}
                    </p>

                    <div style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                      padding: "12px",
                      marginBottom: "14px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Included Service Quantities</span>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb" }}>{totalLinks} Total Links (~${estUSD.toFixed(2)})</span>
                      </div>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "12px" }}>
                        {Object.entries(bundle.config || {}).map(([sId, qty]) => {
                          if (qty <= 0) return null;
                          const sObj = (calcData.services || []).find(s => s.id === sId);
                          return (
                            <div key={sId} style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
                              <span style={{ color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "6px" }}>
                                {sObj ? sObj.name : sId}:
                              </span>
                              <strong style={{ color: "#0f172a" }}>{qty}</strong>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBundle({ ...bundle, config: { ...(bundle.config || {}) } });
                        setIsNewBundle(false);
                      }}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        color: "#334155",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteBundleId(bundle.id)}
                      style={{
                        background: "#fee2e2",
                        border: "1px solid #fca5a5",
                        color: "#991b1b",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CURRENCY & MULTIPLIERS SETTINGS
          ========================================================================= */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} style={{
          background: "#ffffff",
          border: "1.5px solid #e2e8f0",
          borderRadius: "4px",
          padding: "24px",
          maxWidth: "800px"
        }}>
          <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
            Currency, Add-on Surcharges &amp; WhatsApp Settings
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 24px" }}>
            Fine-tune automatic conversion rates, add-on price multipliers, and delivery turnaround estimations.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            
            {/* BDT Rate */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                USD to BDT Exchange Rate (1 USD = ? BDT)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={calcData.settings?.bdtRate || 122}
                onChange={(e) => handleSettingsChange("bdtRate", parseFloat(e.target.value) || 0)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "4px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "14px",
                  fontWeight: 700,
                  outline: "none"
                }}
              />
              <span style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", display: "block" }}>
                Current: 1 USD = ৳{calcData.settings?.bdtRate || 122} BDT
              </span>
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Order WhatsApp Number
              </label>
              <input
                type="text"
                required
                value={calcData.settings?.whatsappNumber || "+8801670769816"}
                onChange={(e) => handleSettingsChange("whatsappNumber", e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "4px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "14px",
                  fontWeight: 700,
                  outline: "none"
                }}
              />
              <span style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", display: "block" }}>
                International format with country code (e.g. +8801670769816)
              </span>
            </div>

            {/* Tier-2 Indexation Multiplier */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Tier-2 Indexation Booster Surcharge (%)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={Math.round((calcData.settings?.tier2Multiplier || 0.15) * 100)}
                  onChange={(e) => handleSettingsChange("tier2Multiplier", (parseFloat(e.target.value) || 0) / 100)}
                  style={{
                    width: "100px",
                    padding: "9px 12px",
                    borderRadius: "4px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    fontWeight: 700,
                    outline: "none"
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#475569" }}>% (+{(calcData.settings?.tier2Multiplier || 0.15) * 100}%)</span>
              </div>
            </div>

            {/* Express Delivery Multiplier */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Express Delivery Speed Surcharge (%)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={Math.round((calcData.settings?.expressMultiplier || 0.20) * 100)}
                  onChange={(e) => handleSettingsChange("expressMultiplier", (parseFloat(e.target.value) || 0) / 100)}
                  style={{
                    width: "100px",
                    padding: "9px 12px",
                    borderRadius: "4px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    fontWeight: 700,
                    outline: "none"
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#475569" }}>% (+{(calcData.settings?.expressMultiplier || 0.20) * 100}%)</span>
              </div>
            </div>

            {/* Turnaround Standard Text */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Standard Turnaround Display Text
              </label>
              <input
                type="text"
                value={calcData.settings?.turnaroundStandard || "10–14 Days"}
                onChange={(e) => handleSettingsChange("turnaroundStandard", e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "4px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            {/* Turnaround Express Text */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Express Turnaround Display Text
              </label>
              <input
                type="text"
                value={calcData.settings?.turnaroundExpress || "3–5 Days (Express)"}
                onChange={(e) => handleSettingsChange("turnaroundExpress", e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "4px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

          </div>

          <div style={{ borderTop: "1.5px solid #f1f5f9", paddingTop: "18px", display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 22px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================================
          TAB 4: FAQS
          ========================================================================= */}
      {activeTab === "faqs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Calculator Frequently Asked Questions
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "3px 0 0" }}>
                These questions and answers appear in the accordion at the bottom of the calculator tool.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingFaq({ q: "", a: "" });
                setFaqIndex(null);
                setIsNewFaq(true);
              }}
              style={{
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New FAQ</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {(calcData.faqs || []).map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "18px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "4px", background: "#eff6ff", color: "#2563eb", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900 }}>
                      Q{idx + 1}
                    </span>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {faq.q}
                    </h3>
                  </div>
                  <p style={{ fontSize: "13px", color: "#475569", margin: 0, lineHeight: "1.55" }}>
                    {faq.a}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFaq({ ...faq });
                      setFaqIndex(idx);
                      setIsNewFaq(false);
                    }}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      color: "#334155",
                      borderRadius: "4px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteFaqIdx(idx)}
                    style={{
                      background: "#fee2e2",
                      border: "1px solid #fca5a5",
                      color: "#991b1b",
                      borderRadius: "4px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT SERVICE
          ========================================================================= */}
      {editingService && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid #cbd5e1"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "12px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {isNewService ? "Add New Backlink Service" : `Edit Service: ${editingService.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                style={{ background: "none", border: "none", fontSize: "18px", color: "#64748b", cursor: "pointer" }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveService}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name || ""}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    placeholder="e.g. Profile Creation Links"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>

                {isNewService && (
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Unique Identifier (Slug / ID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.id || ""}
                      onChange={(e) => setEditingService({ ...editingService, id: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })}
                      placeholder="e.g. profile_creation"
                      style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontFamily: "monospace" }}
                    />
                  </div>
                )}

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Unit Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={editingService.unitPrice ?? 1}
                    onChange={(e) => setEditingService({ ...editingService, unitPrice: parseFloat(e.target.value) || 0 })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Domain Authority Badge *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.da || "DA 85+"}
                    onChange={(e) => setEditingService({ ...editingService, da: e.target.value })}
                    placeholder="e.g. DA 85+ or DA 90+"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={editingService.category || "Brand Entity"}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px" }}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    FontAwesome Icon Class
                  </label>
                  <input
                    type="text"
                    value={editingService.icon || "fa-solid fa-id-card"}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    placeholder="e.g. fa-solid fa-globe"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontFamily: "monospace" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Slider Limits (Min / Max / Step)
                  </label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={editingService.min ?? 0}
                      onChange={(e) => setEditingService({ ...editingService, min: parseInt(e.target.value) || 0 })}
                      style={{ width: "33%", padding: "8px 6px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "12px", textAlign: "center" }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={editingService.max ?? 500}
                      onChange={(e) => setEditingService({ ...editingService, max: parseInt(e.target.value) || 0 })}
                      style={{ width: "33%", padding: "8px 6px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "12px", textAlign: "center" }}
                    />
                    <input
                      type="number"
                      placeholder="Step"
                      value={editingService.step ?? 10}
                      onChange={(e) => setEditingService({ ...editingService, step: parseInt(e.target.value) || 1 })}
                      style={{ width: "33%", padding: "8px 6px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "12px", textAlign: "center" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Accent Color
                  </label>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                      type="color"
                      value={editingService.accentColor || "#3b82f6"}
                      onChange={(e) => setEditingService({ ...editingService, accentColor: e.target.value })}
                      style={{ width: "40px", height: "36px", padding: 0, borderRadius: "4px", border: "1.5px solid #cbd5e1", cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      value={editingService.accentColor || "#3b82f6"}
                      onChange={(e) => setEditingService({ ...editingService, accentColor: e.target.value })}
                      style={{ flex: 1, padding: "8px 10px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontFamily: "monospace" }}
                    />
                  </div>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Quick Preset Jump Steps (comma-separated numbers)
                  </label>
                  <input
                    type="text"
                    value={(editingService.presetSteps || []).join(", ")}
                    onChange={(e) => {
                      const steps = e.target.value.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                      setEditingService({ ...editingService, presetSteps: steps });
                    }}
                    placeholder="e.g. 25, 50, 100, 200"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Short Description / Value Pitch
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.desc || ""}
                    onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                    placeholder="Brief 1-2 sentence description explaining link placement and authority benefits..."
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", resize: "vertical" }}
                  />
                </div>

              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1.5px solid #f1f5f9", paddingTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#475569", borderRadius: "4px", padding: "8px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "4px", padding: "8px 20px", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT BUNDLE
          ========================================================================= */}
      {editingBundle && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "680px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid #cbd5e1"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "12px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {isNewBundle ? "Add New Preset Package" : `Edit Bundle: ${editingBundle.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingBundle(null)}
                style={{ background: "none", border: "none", fontSize: "18px", color: "#64748b", cursor: "pointer" }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveBundle}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Bundle Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBundle.name || ""}
                    onChange={(e) => setEditingBundle({ ...editingBundle, name: e.target.value })}
                    placeholder="e.g. Authority Surge Pack"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Tag Badge *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBundle.tag || "Most Popular 🔥"}
                    onChange={(e) => setEditingBundle({ ...editingBundle, tag: e.target.value })}
                    placeholder="e.g. Best for New Sites"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    FontAwesome Icon
                  </label>
                  <input
                    type="text"
                    value={editingBundle.icon || "fa-solid fa-rocket"}
                    onChange={(e) => setEditingBundle({ ...editingBundle, icon: e.target.value })}
                    placeholder="e.g. fa-solid fa-bolt"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontFamily: "monospace" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Badge Color
                  </label>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                      type="color"
                      value={editingBundle.badgeColor || "#3b82f6"}
                      onChange={(e) => setEditingBundle({ ...editingBundle, badgeColor: e.target.value })}
                      style={{ width: "40px", height: "36px", padding: 0, borderRadius: "4px", border: "1.5px solid #cbd5e1", cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      value={editingBundle.badgeColor || "#3b82f6"}
                      onChange={(e) => setEditingBundle({ ...editingBundle, badgeColor: e.target.value })}
                      style={{ flex: 1, padding: "8px 10px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontFamily: "monospace" }}
                    />
                  </div>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Bundle Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingBundle.desc || ""}
                    onChange={(e) => setEditingBundle({ ...editingBundle, desc: e.target.value })}
                    placeholder="Brief description of this strategy package..."
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

              </div>

              {/* Service Quantities for this bundle */}
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "16px",
                marginBottom: "20px"
              }}>
                <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
                  Set Default Link Quantities for each Service:
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {(calcData.services || []).map(s => {
                    const currentQty = editingBundle.config?.[s.id] ?? 0;
                    return (
                      <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", padding: "8px 12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                          {s.name}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max={s.max || 9999}
                          value={currentQty}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setEditingBundle({
                              ...editingBundle,
                              config: {
                                ...(editingBundle.config || {}),
                                [s.id]: val
                              }
                            });
                          }}
                          style={{
                            width: "70px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            border: "1.5px solid #cbd5e1",
                            textAlign: "center",
                            fontWeight: 800,
                            fontSize: "13px"
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1.5px solid #f1f5f9", paddingTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingBundle(null)}
                  style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#475569", borderRadius: "4px", padding: "8px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "4px", padding: "8px 20px", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}
                >
                  Save Bundle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT FAQ
          ========================================================================= */}
      {editingFaq && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "550px",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid #cbd5e1"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "10px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {isNewFaq ? "Add New Tool FAQ" : "Edit FAQ Item"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                style={{ background: "none", border: "none", fontSize: "18px", color: "#64748b", cursor: "pointer" }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveFaq}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.q || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                  placeholder="e.g. Are these backlinks safe from algorithm penalties?"
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", fontWeight: 700 }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.a || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                  placeholder="Detailed answer explaining safety, timelines, or reports..."
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1.5px solid #cbd5e1", fontSize: "13px", resize: "vertical", lineHeight: "1.5" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1.5px solid #f1f5f9", paddingTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#475569", borderRadius: "4px", padding: "8px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "4px", padding: "8px 20px", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONFIRM DELETE MODAL
          ========================================================================= */}
      {(deleteServiceId || deleteBundleId || deleteFaqIdx !== null) && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "400px",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "4px", background: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", margin: "0 auto 14px" }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Confirm Deletion
            </h3>
            
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 20px" }}>
              Are you sure you want to delete this item? This action will take effect immediately.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  setDeleteServiceId(null);
                  setDeleteBundleId(null);
                  setDeleteFaqIdx(null);
                }}
                style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#475569", borderRadius: "4px", padding: "8px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (deleteServiceId) handleDeleteService(deleteServiceId);
                  else if (deleteBundleId) handleDeleteBundle(deleteBundleId);
                  else if (deleteFaqIdx !== null) handleDeleteFaq(deleteFaqIdx);
                }}
                style={{ background: "#dc2626", color: "#ffffff", border: "none", borderRadius: "4px", padding: "8px 20px", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
