"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";
import { siteSettings, backlinkCalculator as defaultBacklinkCalculator } from "@/lib/data";
import { useLiveCMS } from "@/lib/useLiveCMS";

export default function BacklinkPackageCalculatorPage() {
  const liveCMS = useLiveCMS("backlinkCalculator", defaultBacklinkCalculator);
  const currentData = liveCMS || defaultBacklinkCalculator;

  const services = useMemo(() => {
    return (currentData?.services && currentData.services.length > 0)
      ? currentData.services
      : (defaultBacklinkCalculator?.services || []);
  }, [currentData]);

  const presetBundles = useMemo(() => {
    return (currentData?.presetBundles && currentData.presetBundles.length > 0)
      ? currentData.presetBundles
      : (defaultBacklinkCalculator?.presetBundles || []);
  }, [currentData]);

  const faqs = useMemo(() => {
    return (currentData?.faqs && currentData.faqs.length > 0)
      ? currentData.faqs
      : (defaultBacklinkCalculator?.faqs || []);
  }, [currentData]);

  const bdtRate = currentData?.settings?.bdtRate || defaultBacklinkCalculator?.settings?.bdtRate || 122;
  const tier2Multiplier = currentData?.settings?.tier2Multiplier ?? defaultBacklinkCalculator?.settings?.tier2Multiplier ?? 0.15;
  const expressMultiplier = currentData?.settings?.expressMultiplier ?? defaultBacklinkCalculator?.settings?.expressMultiplier ?? 0.20;
  const standardTurnaround = currentData?.settings?.turnaroundStandard || "10–14 Days";
  const expressTurnaround = currentData?.settings?.turnaroundExpress || "3–5 Days (Express)";

  const [quantities, setQuantities] = useState({
    profile_creation: 100,
    web20_blogs: 10,
    social_bookmarks: 50,
    pdf_sharing: 10,
    guest_posting: 1,
    forum_posting: 5,
    press_release: 1,
    edu_gov: 3,
    local_citations: 20
  });

  const [activePreset, setActivePreset] = useState("surge");

  const [addons, setAddons] = useState({
    tier2Indexation: true,
    dripFeed: true,
    expressDelivery: false,
    liveTrackingSheet: true
  });

  const [currency, setCurrency] = useState("USD"); // USD or BDT
  const [copied, setCopied] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    websiteUrl: "",
    targetKeywords: "",
    notes: ""
  });

  // PDF Proposal & Lead Gate States
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfLead, setPdfLead] = useState({ name: "", email: "", phone: "", website: "" });
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  const handleGeneratePdf = async (e) => {
    e.preventDefault();
    if (!pdfLead.name || !pdfLead.email) {
      alert("Please provide your Name and Email to download proposal.");
      return;
    }
    setPdfGenerating(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pdfLead.name,
          email: pdfLead.email,
          phone: pdfLead.phone,
          website: pdfLead.website,
          service_interest: "Backlink Package Calculator PDF Proposal",
          budget: `$${finalTotalUSD}`,
          message: `Generated custom backlink package quotation for ${totalLinkCount} links. Estimated Investment: $${finalTotalUSD} (approx ৳${finalTotalBDT.toLocaleString()} BDT).`
        })
      });
    } catch (err) {
      console.warn("Lead dispatch warning:", err);
    }
    setPdfGenerating(false);
    setPdfReady(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleQtyChange = (id, val) => {
    setActivePreset(null);
    const num = Math.max(0, parseInt(val) || 0);
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setQuantities(preset.config || {});
  };

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  const { rawTotalUSD, totalLinkCount } = useMemo(() => {
    let raw = 0;
    let count = 0;
    services.forEach(item => {
      const qty = quantities[item.id] || 0;
      raw += qty * (item.unitPrice || 0);
      count += qty;
    });
    return { rawTotalUSD: raw, totalLinkCount: count };
  }, [services, quantities]);

  let addonMultiplier = 1.0;
  if (addons.tier2Indexation) addonMultiplier += tier2Multiplier;
  if (addons.expressDelivery) addonMultiplier += expressMultiplier;

  const finalTotalUSD = Math.round(rawTotalUSD * addonMultiplier * 100) / 100;
  const finalTotalBDT = Math.round(finalTotalUSD * bdtRate);

  // Turnaround estimate
  let turnaroundDays = standardTurnaround;
  if (totalLinkCount < 80) turnaroundDays = "5–7 Days";
  else if (totalLinkCount < 250) turnaroundDays = "7–10 Days";
  else if (totalLinkCount > 500) turnaroundDays = "14–21 Days";
  if (addons.expressDelivery) turnaroundDays = expressTurnaround;

  // Link Power Gauge (0 to 100)
  const powerScore = Math.min(100, Math.round((totalLinkCount / 500) * 80 + (addons.tier2Indexation ? 15 : 0) + (addons.dripFeed ? 5 : 0)));
  let powerLabel = "Moderate Impact";
  let powerColor = "#3b82f6";
  if (powerScore < 30) { powerLabel = "Foundation Tier"; powerColor = "#06b6d4"; }
  else if (powerScore < 60) { powerLabel = "Ranking Growth"; powerColor = "#3b82f6"; }
  else if (powerScore < 85) { powerLabel = "High Authority"; powerColor = "#10b981"; }
  else { powerLabel = "Domain Dominance 🔥"; powerColor = "#f59e0b"; }

  // Format package summary for WhatsApp and Clipboard
  const generateSummaryText = () => {
    let summary = `🚀 *CUSTOM BACKLINK PACKAGE ORDER*\n`;
    summary += `----------------------------------------\n`;
    services.forEach(item => {
      const qty = quantities[item.id] || 0;
      if (qty > 0) {
        summary += `• ${item.name}: ${qty} Links ($${(qty * (item.unitPrice || 0)).toFixed(2)})\n`;
      }
    });
    summary += `----------------------------------------\n`;
    summary += `📊 *Total Backlinks:* ${totalLinkCount} Links\n`;
    summary += `⚡ *Tier-2 Indexation:* ${addons.tier2Indexation ? `YES (+${Math.round(tier2Multiplier * 100)}% Booster)` : "NO"}\n`;
    summary += `⏱️ *Drip-Feed (Natural Velocity):* ${addons.dripFeed ? "YES (30 Days)" : "Standard"}\n`;
    summary += `🚀 *Delivery Speed:* ${addons.expressDelivery ? expressTurnaround : turnaroundDays}\n`;
    summary += `💰 *Total Estimated Price:* $${finalTotalUSD.toFixed(2)} USD / ৳${finalTotalBDT.toLocaleString()} BDT\n`;
    summary += `----------------------------------------\n`;
    summary += `Client Website: ${orderForm.websiteUrl || "To be provided"}\n`;
    summary += `Agency: Abdullah BD SEO (https://abdullahbdseo.com)`;
    return summary;
  };

  const copySummary = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(generateSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const rawWhatsappNum = currentData?.settings?.whatsappNumber || siteSettings?.whatsapp_number || "8801670769816";
  const whatsappNumber = rawWhatsappNum.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateSummaryText())}`;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          phone: "Not Provided",
          service_interest: `Custom Backlink Package ($${finalTotalUSD})`,
          message: `TARGET WEBSITE: ${orderForm.websiteUrl}\nKEYWORDS: ${orderForm.targetKeywords}\nNOTES: ${orderForm.notes}\n\nPACKAGE BREAKDOWN:\n${generateSummaryText()}`
        })
      });
      if (res.ok) {
        setOrderSuccess(true);
      } else {
        alert("Failed to send order inquiry. Please contact us directly via WhatsApp.");
      }
    } catch (err) {
      alert("Network error. Please message us directly on WhatsApp.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "90px" }}>
      
      {/* ================= HERO SECTION WITH ENTERPRISE PROFESSIONAL DESIGN ================= */}
      <section style={{
        position: "relative",
        background: "linear-gradient(180deg, #090e17 0%, #0f172a 45%, #1e293b 100%)",
        color: "#ffffff",
        padding: "50px 20px 85px",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        {/* Subtle decorative grid lines and gradient orbs */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none"
        }}></div>
        <div style={{ position: "absolute", top: "-120px", left: "15%", width: "550px", height: "550px", background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", top: "40px", right: "12%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }}></div>

        <div style={{ maxWidth: "1160px", margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "22px", display: "inline-flex" }}>
            <ol style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 700,
              listStyle: "none",
              margin: 0
            }}>
              <li style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <i className="fa-solid fa-house" style={{ fontSize: "11px" }}></i> Home
                </Link>
              </li>
              <li style={{ color: "rgba(255,255,255,0.3)" }}><i className="fa-solid fa-angle-right" style={{ fontSize: "10px" }}></i></li>
              <li>
                <Link href="/tools" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Tools Suite
                </Link>
              </li>
              <li style={{ color: "rgba(255,255,255,0.3)" }}><i className="fa-solid fa-angle-right" style={{ fontSize: "10px" }}></i></li>
              <li>
                <Link href="/high-da-backlinks" style={{ color: "#93c5fd", textDecoration: "none" }}>
                  Backlinks Hub
                </Link>
              </li>
              <li style={{ color: "rgba(255,255,255,0.3)" }}><i className="fa-solid fa-angle-right" style={{ fontSize: "10px" }}></i></li>
              <li style={{ color: "#facc15", fontWeight: 800 }}>Package Calculator</li>
            </ol>
          </nav>

          {/* Live Engine Badge */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(37, 99, 235, 0.15)",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              color: "#60a5fa",
              padding: "5px 14px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.5px"
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "inline-block" }}></span>
              <span>100% MANUAL HIGH-DA LINK BUILDING ENGINE</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: "clamp(28px, 4.2vw, 46px)",
            fontWeight: 900,
            letterSpacing: "-0.8px",
            lineHeight: 1.2,
            marginBottom: "16px",
            color: "#ffffff"
          }}>
            Custom Backlink Package &amp; <span style={{
              background: "linear-gradient(135deg, #38bdf8 0%, #60a5fa 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block"
            }}>Live Pricing Calculator</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "16px",
            color: "#cbd5e1",
            maxWidth: "760px",
            margin: "0 auto 30px",
            lineHeight: "1.65"
          }}>
            Configure exact backlink quantities across 9 verified high-authority categories (DA 80+). Select indexation boosters and get instant pricing in USD &amp; BDT with 1-click WhatsApp order fulfillment.
          </p>

          {/* Four Core Value Pillars */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            maxWidth: "960px",
            margin: "0 auto 36px"
          }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "4px", background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>100% Real Manual</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>No bots or automated PBNs</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "4px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Tier-2 Indexation</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Fast 7-14 day discovery</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "4px", background: "rgba(168, 85, 247, 0.15)", color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Natural Drip-Feed</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Safe velocity distribution</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "4px", background: "rgba(250, 204, 21, 0.15)", color: "#facc15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                <i className="fa-solid fa-file-excel"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Live Excel Sheet</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Full links + logins report</div>
              </div>
            </div>
          </div>

          {/* Steps Progress Bar */}
          <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(14px)",
            padding: "8px 20px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "36px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#38bdf8" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "2px", background: "#0284c7", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>1</span>
              <span>Set Link Quantities</span>
            </div>
            <i className="fa-solid fa-arrow-right" style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", alignSelf: "center" }}></i>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#a5b4fc" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "2px", background: "#4f46e5", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>2</span>
              <span>Select Add-Ons</span>
            </div>
            <i className="fa-solid fa-arrow-right" style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", alignSelf: "center" }}></i>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#4ade80" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "2px", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>3</span>
              <span>1-Click Order / Quote</span>
            </div>
          </div>

          {/* Pre-Configured Preset Packs */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "1px", color: "#94a3b8", marginBottom: "14px" }}>
              POPULAR PRE-CONFIGURED STRATEGY PACKS:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", maxWidth: "1020px", margin: "0 auto" }}>
              {presetBundles.map(preset => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    style={{
                      background: isSelected ? "rgba(37, 99, 235, 0.22)" : "rgba(255, 255, 255, 0.05)",
                      border: `1.5px solid ${isSelected ? "#60a5fa" : "rgba(255, 255, 255, 0.12)"}`,
                      boxShadow: isSelected ? "0 0 25px rgba(59, 130, 246, 0.35)" : "0 4px 15px rgba(0,0,0,0.2)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "4px",
                      padding: "16px 18px",
                      textAlign: "left",
                      color: "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <i className={`${preset.icon}`} style={{ fontSize: "17px", color: preset.badgeColor }}></i>
                        <strong style={{ fontSize: "15px", fontWeight: 800 }}>{preset.name}</strong>
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: 800, background: preset.badgeColor, color: "#0f172a", padding: "2px 8px", borderRadius: "4px" }}>
                        {preset.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#cbd5e1", margin: 0, lineHeight: 1.45 }}>
                      {preset.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ================= MAIN CALCULATOR LAYOUT ================= */}
      <div style={{ maxWidth: "1220px", margin: "-35px auto 0", padding: "0 20px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px", alignItems: "start" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 0.85fr)", gap: "30px", alignItems: "start" }}>
              
              {/* LEFT COLUMN: 9 BACKLINK CATEGORIES */}
              <div>
                <div style={{
                  background: "#ffffff",
                  borderRadius: "4px",
                  padding: "28px",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  border: "1px solid #e2e8f0"
                }}>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "18px", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                        <i className="fa-solid fa-sliders text-blue-600"></i> Configure Backlink Quantities
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                        Fine-tune exact backlink quantities with individual sliders or quick increment buttons.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActivePreset(null);
                        const zeroState = {};
                        services.forEach(s => { zeroState[s.id] = 0; });
                        setQuantities(zeroState);
                      }}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        color: "#475569",
                        padding: "6px 14px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s"
                      }}
                    >
                      <i className="fa-solid fa-rotate-left"></i> Reset All (0)
                    </button>
                  </div>

                  {/* Backlink Sliders Cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {services.map(item => {
                      const qty = quantities[item.id] || 0;
                      const itemSubtotal = (qty * item.unitPrice).toFixed(2);
                      const isHighlighted = qty > 0;

                      return (
                        <div
                          key={item.id}
                          style={{
                            background: isHighlighted ? "#ffffff" : "#f8fafc",
                            border: `1.5px solid ${isHighlighted ? item.accentColor : "#e2e8f0"}`,
                            borderRadius: "4px",
                            padding: "18px 20px",
                            boxShadow: isHighlighted ? `0 6px 20px ${item.accentColor}15` : "none",
                            transition: "all 0.25s ease"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "4px",
                                background: `${item.accentColor}15`,
                                color: item.accentColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                border: `1px solid ${item.accentColor}30`
                              }}>
                                <i className={item.icon}></i>
                              </div>
                              
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{item.name}</h3>
                                  <span style={{ fontSize: "10.5px", fontWeight: 800, background: "#dcfce7", color: "#166534", padding: "2px 6px", borderRadius: "4px" }}>
                                    {item.da}
                                  </span>
                                </div>
                                <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>
                                  ${item.unitPrice.toFixed(2)}/link • {item.category}
                                </span>
                              </div>
                            </div>

                            {/* Counter Input & Quick Presets */}
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, Math.max(0, qty - item.step))}
                                style={{ width: "30px", height: "30px", borderRadius: "4px", background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
                              >-</button>
                              
                              <input
                                type="number"
                                min="0"
                                max={item.max}
                                value={qty}
                                onChange={(e) => handleQtyChange(item.id, e.target.value)}
                                style={{ width: "65px", height: "32px", textAlign: "center", fontWeight: 900, fontSize: "15px", color: "#0f172a", border: `1.5px solid ${isHighlighted ? item.accentColor : "#cbd5e1"}`, borderRadius: "4px", outline: "none" }}
                              />

                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, Math.min(item.max, qty + item.step))}
                                style={{ width: "30px", height: "30px", borderRadius: "4px", background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
                              >+</button>
                            </div>

                          </div>

                          {/* Range Slider */}
                          <div style={{ position: "relative", marginBottom: "10px" }}>
                            <input
                              type="range"
                              min="0"
                              max={item.max}
                              step={item.step}
                              value={qty}
                              onChange={(e) => handleQtyChange(item.id, e.target.value)}
                              style={{
                                width: "100%",
                                accentColor: item.accentColor,
                                cursor: "pointer",
                                height: "6px",
                                borderRadius: "4px"
                              }}
                            />
                          </div>

                          {/* Preset Jump Pills */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>Quick:</span>
                              {item.presetSteps.map(pStep => (
                                <button
                                  key={pStep}
                                  type="button"
                                  onClick={() => handleQtyChange(item.id, pStep)}
                                  style={{
                                    background: qty === pStep ? item.accentColor : "#f1f5f9",
                                    color: qty === pStep ? "#ffffff" : "#475569",
                                    border: "none",
                                    padding: "2px 7px",
                                    borderRadius: "4px",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    cursor: "pointer"
                                  }}
                                >
                                  {pStep}
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, item.max)}
                                style={{
                                  background: "#fef3c7",
                                  color: "#92400e",
                                  border: "none",
                                  padding: "2px 7px",
                                  borderRadius: "4px",
                                  fontSize: "11px",
                                  fontWeight: 800,
                                  cursor: "pointer"
                                }}
                              >
                                Max ({item.max})
                              </button>
                            </div>

                            <div style={{ textAlign: "right" }}>
                              <span style={{ fontSize: "14px", fontWeight: 900, color: isHighlighted ? "#059669" : "#94a3b8" }}>
                                ${itemSubtotal} USD
                              </span>
                            </div>
                          </div>

                          <div style={{ marginTop: "8px", fontSize: "11.5px", color: "#64748b", lineHeight: 1.4, borderTop: "1px dashed #e2e8f0", paddingTop: "8px" }}>
                            {item.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* ================= STRATEGY & ADD-ONS ================= */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "4px",
                  padding: "28px",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  border: "1px solid #e2e8f0",
                  marginTop: "25px"
                }}>
                  <div style={{ marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "19px", fontWeight: 900, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                      <i className="fa-solid fa-shield-halved text-emerald-600"></i> Indexation &amp; Velocity Add-Ons
                    </h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                      Toggle automated performance boosters to maximize search crawl frequency and ranking impact.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
                    
                    {/* Tier 2 Indexing */}
                    <div
                      onClick={() => toggleAddon("tier2Indexation")}
                      style={{
                        background: addons.tier2Indexation ? "#ecfdf5" : "#f8fafc",
                        border: `1.5px solid ${addons.tier2Indexation ? "#10b981" : "#e2e8f0"}`,
                        borderRadius: "4px",
                        padding: "16px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>🚀 Tier-2 Indexation Pings</span>
                        <i className={`fa-solid ${addons.tier2Indexation ? "fa-circle-check text-emerald-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "18px" }}></i>
                      </div>
                      <p style={{ fontSize: "11.5px", color: "#64748b", margin: "0 0 8px", lineHeight: 1.4 }}>
                        Ping &amp; drip-feed backlinks into Google discovery networks for rapid 7-day indexation.
                      </p>
                      <span style={{ fontSize: "10.5px", fontWeight: 800, background: "#d1fae5", color: "#065f46", padding: "2px 7px", borderRadius: "4px" }}>
                        +15% Booster Fee
                      </span>
                    </div>

                    {/* Safe Drip Feed */}
                    <div
                      onClick={() => toggleAddon("dripFeed")}
                      style={{
                        background: addons.dripFeed ? "#eff6ff" : "#f8fafc",
                        border: `1.5px solid ${addons.dripFeed ? "#3b82f6" : "#e2e8f0"}`,
                        borderRadius: "4px",
                        padding: "16px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>⏱️ 30-Day Safe Drip-Feed</span>
                        <i className={`fa-solid ${addons.dripFeed ? "fa-circle-check text-blue-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "18px" }}></i>
                      </div>
                      <p style={{ fontSize: "11.5px", color: "#64748b", margin: "0 0 8px", lineHeight: 1.4 }}>
                        Spread link creation naturally over 30 days to mirror realistic organic velocity.
                      </p>
                      <span style={{ fontSize: "10.5px", fontWeight: 800, background: "#dbeafe", color: "#1e40af", padding: "2px 7px", borderRadius: "4px" }}>
                        100% FREE / INCLUDED
                      </span>
                    </div>

                    {/* Express Priority Delivery */}
                    <div
                      onClick={() => toggleAddon("expressDelivery")}
                      style={{
                        background: addons.expressDelivery ? "#fef3c7" : "#f8fafc",
                        border: `1.5px solid ${addons.expressDelivery ? "#f59e0b" : "#e2e8f0"}`,
                        borderRadius: "4px",
                        padding: "16px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>⚡ 7-Day Express Priority</span>
                        <i className={`fa-solid ${addons.expressDelivery ? "fa-circle-check text-amber-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "18px" }}></i>
                      </div>
                      <p style={{ fontSize: "11.5px", color: "#64748b", margin: "0 0 8px", lineHeight: 1.4 }}>
                        Dedicated team sprint for priority queue execution within 3 to 5 business days.
                      </p>
                      <span style={{ fontSize: "10.5px", fontWeight: 800, background: "#fef3c7", color: "#92400e", padding: "2px 7px", borderRadius: "4px" }}>
                        +20% Express Fee
                      </span>
                    </div>

                    {/* Live Tracking Report */}
                    <div
                      style={{
                        background: "#f8fafc",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "4px",
                        padding: "16px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>📊 Live Google Sheet Report</span>
                        <i className="fa-solid fa-circle-check text-emerald-600" style={{ fontSize: "18px" }}></i>
                      </div>
                      <p style={{ fontSize: "11.5px", color: "#64748b", margin: "0 0 8px", lineHeight: 1.4 }}>
                        Full transparent report with live link URLs, anchor distribution, and login credentials.
                      </p>
                      <span style={{ fontSize: "10.5px", fontWeight: 800, background: "#e2e8f0", color: "#334155", padding: "2px 7px", borderRadius: "4px" }}>
                        100% FREE / INCLUDED
                      </span>
                    </div>

                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: STICKY CHECKOUT & PRICING CARD */}
              <div style={{ position: "sticky", top: "30px" }}>
                
                <div style={{
                  background: "linear-gradient(180deg, #090e17 0%, #0f172a 100%)",
                  borderRadius: "4px",
                  padding: "28px",
                  color: "#ffffff",
                  boxShadow: "0 20px 50px -10px rgba(2, 6, 23, 0.7)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Subtle top neon accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)" }}></div>

                  {/* Header & Currency Toggle */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#94a3b8" }}>
                      ESTIMATED INVESTMENT
                    </span>

                    <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: "4px", padding: "2px" }}>
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        style={{
                          background: currency === "USD" ? "#2563eb" : "transparent",
                          color: "#ffffff",
                          border: "none",
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 800,
                          cursor: "pointer"
                        }}
                      >USD ($)</button>
                      <button
                        type="button"
                        onClick={() => setCurrency("BDT")}
                        style={{
                          background: currency === "BDT" ? "#2563eb" : "transparent",
                          color: "#ffffff",
                          border: "none",
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 800,
                          cursor: "pointer"
                        }}
                      >BDT (৳)</button>
                    </div>
                  </div>

                  {/* Big Price */}
                  <div style={{ marginBottom: "22px" }}>
                    <div style={{ fontSize: "clamp(34px, 3.5vw, 46px)", fontWeight: 900, color: "#38bdf8", lineHeight: 1, letterSpacing: "-1px" }}>
                      {currency === "USD" ? `$${finalTotalUSD.toFixed(2)}` : `৳${finalTotalBDT.toLocaleString()}`}
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>
                      {currency === "USD" ? `Approx. ৳${finalTotalBDT.toLocaleString()} BDT` : `Approx. $${finalTotalUSD.toFixed(2)} USD`} • Verified execution
                    </div>
                  </div>

                  {/* Link Power & Authority Gauge */}
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "4px", padding: "14px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", fontWeight: 800, marginBottom: "6px" }}>
                      <span style={{ color: "#cbd5e1" }}>SEO Ranking Impact:</span>
                      <span style={{ color: powerColor }}>{powerLabel} ({powerScore}%)</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${powerScore}%`, height: "100%", background: `linear-gradient(90deg, #38bdf8, ${powerColor})`, borderRadius: "2px", transition: "width 0.4s ease" }}></div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", padding: "14px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div>
                      <div style={{ fontSize: "10.5px", color: "#94a3b8", fontWeight: 700 }}>TOTAL LINKS</div>
                      <div style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", marginTop: "2px" }}>
                        <i className="fa-solid fa-link text-blue-400 mr-1" style={{ fontSize: "15px" }}></i> {totalLinkCount}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "10.5px", color: "#94a3b8", fontWeight: 700 }}>AVG DOMAIN TRUST</div>
                      <div style={{ fontSize: "20px", fontWeight: 900, color: "#34d399", marginTop: "2px" }}>
                        DA 88+
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "10.5px", color: "#94a3b8", fontWeight: 700 }}>EST. DELIVERY</div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#e2e8f0", marginTop: "3px" }}>
                        {turnaroundDays}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "10.5px", color: "#94a3b8", fontWeight: 700 }}>INDEX GUARANTEE</div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#facc15", marginTop: "3px" }}>
                        {addons.tier2Indexation ? "Fast (7-14d)" : "Standard"}
                      </div>
                    </div>
                  </div>

                  {/* Selected Breakdown List */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#cbd5e1", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                      <span>PACKAGE COMPOSITION:</span>
                      <span style={{ color: "#38bdf8" }}>{services.filter(item => (quantities[item.id] || 0) > 0).length} Types</span>
                    </div>

                    <div style={{ maxHeight: "140px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px", paddingRight: "4px" }}>
                      {services.filter(item => (quantities[item.id] || 0) > 0).map(item => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", borderBottom: "1px dashed rgba(255,255,255,0.06)", paddingBottom: "3px" }}>
                          <span>• {item.name}:</span>
                          <strong style={{ color: "#ffffff" }}>{quantities[item.id]} Links</strong>
                        </div>
                      ))}
                      {totalLinkCount === 0 && (
                        <div style={{ color: "#f87171", fontStyle: "italic", textAlign: "center", padding: "8px 0" }}>
                          No backlinks selected. Use sliders or select a preset bundle above.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    
                    {/* WhatsApp 1-Click Order */}
                    <a
                      href={totalLinkCount > 0 ? whatsappUrl : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { if (totalLinkCount === 0) { e.preventDefault(); alert("Please select at least 1 backlink quantity."); } }}
                      style={{
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#ffffff",
                        padding: "14px 18px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontWeight: 900,
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 8px 20px rgba(34, 197, 94, 0.4)",
                        transition: "all 0.2s"
                      }}
                    >
                      <i className="fa-brands fa-whatsapp text-xl"></i>
                      <span>Order via WhatsApp (1-Click)</span>
                    </a>

                    {/* Direct Project Order Modal Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (totalLinkCount === 0) { alert("Please select at least 1 backlink quantity."); return; }
                        setShowOrderModal(true);
                      }}
                      style={{
                        background: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        padding: "13px 18px",
                        borderRadius: "4px",
                        fontWeight: 800,
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)"
                      }}
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>Submit Custom Project Order</span>
                    </button>

                    {/* Download PDF Proposal Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (totalLinkCount === 0) { alert("Please select at least 1 backlink quantity."); return; }
                        setShowPdfModal(true);
                        setPdfReady(false);
                      }}
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "11px 16px",
                        borderRadius: "4px",
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s"
                      }}
                    >
                      <i className="fa-solid fa-file-pdf text-red-400"></i>
                      <span>Download PDF Proposal (1-Click)</span>
                    </button>

                    {/* Copy Quote Button */}
                    <button
                      type="button"
                      onClick={copySummary}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#cbd5e1",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "10px 14px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      <i className={copied ? "fa-solid fa-check text-emerald-400" : "fa-solid fa-copy"}></i>
                      <span>{copied ? "Package Summary Copied!" : "Copy Full Quote Breakdown"}</span>
                    </button>

                  </div>

                  {/* Trust Guarantees */}
                  <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "7px", fontSize: "11.5px", color: "#94a3b8" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-solid fa-shield-check text-emerald-400"></i>
                      <span>100% Real Manual Hand-Crafted Accounts</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-solid fa-arrows-rotate text-blue-400"></i>
                      <span>Free Replacement for Any Dropped Links</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-solid fa-file-excel text-emerald-400"></i>
                      <span>Live White-Label Excel Spreadsheet Delivery</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <section style={{ maxWidth: "1000px", margin: "70px auto 0", padding: "0 20px" }}>
        <ToolFaqAccordion faqs={faqs} title="Frequently Asked Questions (FAQ)" />
      </section>

      {/* ================= ORDER INQUIRY MODAL (HOMEPAGE DESIGN ALIGNED) ================= */}
      {showOrderModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(6px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", overflowY: "auto" }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "4px",
            maxWidth: "560px",
            width: "100%",
            padding: orderSuccess ? "32px 26px 26px" : "28px 26px",
            boxShadow: "0 20px 50px -10px rgba(67, 97, 238, 0.25)",
            position: "relative",
            border: "1.5px solid #e0e7ff",
            maxHeight: "92vh",
            overflowY: "auto"
          }}>
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "#f1f5f9",
                border: "none",
                width: "30px",
                height: "30px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#64748b"; }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {orderSuccess ? (
              <div style={{ textAlign: "center" }}>
                
                {/* Glowing Success Badge */}
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 14px" }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                {/* Status Pill */}
                <div style={{
                  display: "inline-block",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#047857",
                  background: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  letterSpacing: "0.04em",
                  marginBottom: "8px"
                }}>
                  ● INQUIRY RECEIVED &amp; QUEUED FOR AUDIT
                </div>

                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 8px" }}>
                  Order Inquiry Submitted!
                </h3>
                
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.55", marginBottom: "18px", maxWidth: "480px", margin: "0 auto 18px" }}>
                  Thank you, <strong>{orderForm.name || "Valued Client"}</strong>! Your custom backlink order details have been securely dispatched. Our lead strategist is reviewing your target domain metrics and anchor configuration.
                </p>

                {/* Order Summary Snapshot Card */}
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  color: "#334155"
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4361ee", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span>Selected Package Breakdown</span>
                    <span>Custom Order</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.84rem" }}>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", fontWeight: 600 }}>TARGET WEBSITE</span>
                      <strong style={{ color: "#0f172a", wordBreak: "break-all" }}>{orderForm.websiteUrl || "To be finalized"}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", fontWeight: 600 }}>TOTAL BACKLINKS</span>
                      <strong style={{ color: "#0f172a" }}>{totalLinkCount} High-DA Links</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", fontWeight: 600 }}>ESTIMATED TOTAL</span>
                      <strong style={{ color: "#16a34a", fontSize: "0.92rem" }}>
                        ${finalTotalUSD.toFixed(2)} USD <span style={{ fontSize: "0.78rem", color: "#64748b" }}>(৳{finalTotalBDT.toLocaleString()} BDT)</span>
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", fontWeight: 600 }}>TIMELINE</span>
                      <strong style={{ color: "#0f172a" }}>5 - 7 Business Days</strong>
                    </div>
                  </div>
                </div>

                {/* What Happens Next - 3 Step Roadmap */}
                <div style={{
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "4px",
                  padding: "12px 16px",
                  textAlign: "left",
                  marginBottom: "18px"
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1e40af", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-route"></i>
                    <span>What Happens Next?</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8rem", color: "#334155" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "16px", height: "16px", borderRadius: "2px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 800, flexShrink: 0 }}>1</span>
                      <span><strong>Niche &amp; Anchor Audit:</strong> We analyze domain metrics &amp; anchor ratios (Within 2 Hours).</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "16px", height: "16px", borderRadius: "2px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 800, flexShrink: 0 }}>2</span>
                      <span><strong>Direct Contact &amp; Invoice:</strong> We reach out via WhatsApp/Email with the confirmation invoice.</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "16px", height: "16px", borderRadius: "2px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 800, flexShrink: 0 }}>3</span>
                      <span><strong>Live Excel Delivery:</strong> 100% manual links creation with login sheet &amp; replacement guarantee.</span>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      color: "#ffffff",
                      padding: "11px 18px",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      textDecoration: "none",
                      boxShadow: "0 6px 16px rgba(37,211,102,0.25)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: "17px" }}></i>
                    <span>Instant Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.color = "#0f172a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
                  >
                    Done / Close Window
                  </button>
                </div>

                {/* Trust Seals Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #f1f5f9", fontSize: "0.75rem", color: "#64748b" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <i className="fa-solid fa-shield-halved" style={{ color: "#10b981" }}></i>
                    100% White-Hat Safe
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <i className="fa-solid fa-bolt" style={{ color: "#f59e0b" }}></i>
                    &lt; 2hr Response
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <i className="fa-solid fa-lock" style={{ color: "#3b82f6" }}></i>
                    NDA Protected
                  </span>
                </div>

              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "4px", background: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                    <i className="fa-solid fa-file-signature"></i>
                  </div>
                  <div>
                    <div style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#4361ee", background: "#eef2ff", padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.04em", marginBottom: "2px" }}>
                      Custom Link Building Order
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      Submit Backlink Order
                    </h3>
                  </div>
                </div>

                {/* Package Highlights Pill */}
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "12px 0 14px",
                  fontSize: "0.82rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-cubes-stacked text-blue-600"></i>
                    <span style={{ color: "#334155" }}>Package: <strong>{totalLinkCount} Links</strong></span>
                  </div>
                  <div style={{ fontWeight: 800, color: "#16a34a" }}>
                    ${finalTotalUSD.toFixed(2)} USD <span style={{ color: "#64748b", fontWeight: 600, fontSize: "0.75rem" }}>(৳{finalTotalBDT.toLocaleString()})</span>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "3px", textTransform: "uppercase" }}>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "3px", textTransform: "uppercase" }}>Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "3px", textTransform: "uppercase" }}>Target Website URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourwebsite.com"
                      value={orderForm.websiteUrl}
                      onChange={(e) => setOrderForm({ ...orderForm, websiteUrl: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "3px", textTransform: "uppercase" }}>Primary Keywords (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. ecommerce seo, local plumber, brand name"
                      value={orderForm.targetKeywords}
                      onChange={(e) => setOrderForm({ ...orderForm, targetKeywords: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "3px", textTransform: "uppercase" }}>Special Instructions / Anchor Notes</label>
                    <textarea
                      rows="2"
                      placeholder="Any specific anchor ratio, country targets, or notes..."
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem", resize: "none" }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#64748b", margin: "0" }}>
                    <i className="fa-solid fa-lock text-emerald-500"></i>
                    <span>Your domain details are 100% confidential and protected by NDA.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    style={{
                      background: "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      padding: "11px",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 6px 16px rgba(37,99,235,0.25)",
                      marginTop: "2px"
                    }}
                  >
                    {orderSubmitting ? (
                      <><i className="fa-solid fa-spinner fa-spin"></i> Submitting Order...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane"></i> Confirm &amp; Send Project Order</>
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= PDF PROPOSAL MODAL & LEAD CAPTURE GATE ================= */}
      {showPdfModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(6px)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", overflowY: "auto" }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "4px",
            maxWidth: pdfReady ? "780px" : "520px",
            width: "100%",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            position: "relative",
            border: "1px solid #cbd5e1",
            maxHeight: "92vh",
            overflowY: "auto"
          }}>
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowPdfModal(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "#f1f5f9",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: "15px"
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {!pdfReady ? (
              /* --- 1. LEAD CAPTURE GATE --- */
              <div>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "4px", background: "#fee2e2", color: "#ef4444", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "10px" }}>
                    <i className="fa-solid fa-file-pdf"></i>
                  </div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                    Download Official PDF Proposal
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                    Enter your business details below to generate a branded, printable A4 proposal for this <strong>{totalLinkCount} Backlink Campaign</strong>.
                  </p>
                </div>

                <form onSubmit={handleGeneratePdf} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Miller"
                      value={pdfLead.name}
                      onChange={(e) => setPdfLead({ ...pdfLead, name: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Business / Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. david@company.com"
                      value={pdfLead.email}
                      onChange={(e) => setPdfLead({ ...pdfLead, email: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Target Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={pdfLead.website}
                      onChange={(e) => setPdfLead({ ...pdfLead, website: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      WhatsApp / Phone (For instant proposal delivery)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={pdfLead.phone}
                      onChange={(e) => setPdfLead({ ...pdfLead, phone: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pdfGenerating}
                    style={{
                      background: "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px",
                      borderRadius: "4px",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 6px 18px rgba(239, 68, 68, 0.35)",
                      marginTop: "4px"
                    }}
                  >
                    {pdfGenerating ? (
                      <><i className="fa-solid fa-spinner fa-spin"></i> Generating Official PDF...</>
                    ) : (
                      <><i className="fa-solid fa-file-arrow-down"></i> Generate &amp; Download PDF Proposal</>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* --- 2. PRINTABLE PDF PROPOSAL VIEW --- */
              <div id="printable-proposal-area">
                {/* Proposal Letterhead Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0f172a", paddingBottom: "16px", marginBottom: "20px" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900, color: "#0f172a" }}>
                      ABDULLAH SALEH
                    </h2>
                    <div style={{ fontSize: "12px", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Organic Growth Specialist &amp; Technical SEO Architect
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                      🌐 abdullahseo.com • ✉️ contact@abdullahseo.com • 📱 +8801670769816
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10.5px", color: "#64748b", fontWeight: 700 }}>PROPOSAL REF</div>
                    <div style={{ fontSize: "14px", fontWeight: 900, color: "#2563eb", fontFamily: "monospace" }}>
                      PROP-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </div>
                  </div>
                </div>

                {/* Prepared For Client */}
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px 16px", marginBottom: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                  <div>
                    <span style={{ color: "#64748b", fontWeight: 700 }}>PREPARED FOR:</span>
                    <strong style={{ color: "#0f172a", display: "block", fontSize: "13.5px" }}>{pdfLead.name}</strong>
                    <span style={{ color: "#475569" }}>{pdfLead.email}</span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontWeight: 700 }}>TARGET DOMAIN:</span>
                    <strong style={{ color: "#2563eb", display: "block", wordBreak: "break-all" }}>{pdfLead.website || "Domain to be provided"}</strong>
                    <span style={{ color: "#475569" }}>Turnaround: {turnaroundDays}</span>
                  </div>
                </div>

                {/* Itemized Table */}
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase" }}>
                    Selected Link Building Allocation
                  </h4>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                        <th style={{ padding: "8px 10px", borderRadius: "4px 0 0 0" }}>Service Category</th>
                        <th style={{ padding: "8px 10px" }}>Quantity</th>
                        <th style={{ padding: "8px 10px" }}>Authority Metric</th>
                        <th style={{ padding: "8px 10px", textAlign: "right", borderRadius: "0 4px 0 0" }}>Subtotal (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.filter(item => (quantities[item.id] || 0) > 0).map((item, idx) => (
                        <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0", background: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                          <td style={{ padding: "8px 10px", fontWeight: 700, color: "#0f172a" }}>{item.name}</td>
                          <td style={{ padding: "8px 10px" }}>{quantities[item.id]} Links</td>
                          <td style={{ padding: "8px 10px", color: "#059669", fontWeight: 700 }}>DA 85+ / Real Traffic</td>
                          <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700, color: "#0f172a" }}>
                            ${((quantities[item.id] || 0) * (item.unitPrice || 0)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Investment Total Box */}
                <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: "4px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#1e40af", textTransform: "uppercase" }}>
                      TOTAL PROPOSED INVESTMENT
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      Includes {addons.tier2Indexation ? "Tier-2 Indexation, " : ""}30-Day Safe Drip Feed &amp; Live Google Sheet
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "24px", fontWeight: 900, color: "#1d4ed8" }}>
                      ${finalTotalUSD.toFixed(2)} USD
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b" }}>
                      Approx. ৳{finalTotalBDT.toLocaleString()} BDT
                    </div>
                  </div>
                </div>

                {/* Print and Actions Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <Link
                    href="/track-order"
                    target="_blank"
                    style={{ fontSize: "12px", color: "#2563eb", fontWeight: 700, textDecoration: "none" }}
                  >
                    <i className="fa-solid fa-satellite-dish" style={{ marginRight: "4px" }}></i>
                    Client Order Tracking Hub
                  </Link>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn-admin btn-admin-primary"
                      style={{ borderRadius: "4px", padding: "8px 16px", fontSize: "12.5px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <i className="fa-solid fa-print"></i>
                      <span>Print / Save PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPdfModal(false)}
                      className="btn-admin btn-admin-outline"
                      style={{ borderRadius: "4px", padding: "8px 14px", fontSize: "12.5px" }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Custom Link Building Package & Price Calculator",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "description": "Configure custom backlink packages across profile creation, web 2.0, bookmarks, PDF sharing, and guest posts with instant price calculations in USD and BDT.",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
