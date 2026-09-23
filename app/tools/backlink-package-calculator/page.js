"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";
import { siteSettings } from "@/lib/data";

const BACKLINK_SERVICES = [
  {
    id: "profile_creation",
    name: "Profile Creation Links",
    category: "Brand Entity",
    icon: "fa-solid fa-id-card",
    unitPrice: 0.35,
    da: "DA 85+",
    min: 0,
    max: 800,
    step: 10,
    presetSteps: [25, 50, 100, 200],
    accentColor: "#3b82f6",
    desc: "100% manual high DA profile backlinks with synced NAP, avatar, and canonical website anchors."
  },
  {
    id: "web20_blogs",
    name: "Web 2.0 Satellite Blogs",
    category: "Contextual In-Content",
    icon: "fa-solid fa-globe",
    unitPrice: 1.25,
    da: "DA 88+",
    min: 0,
    max: 300,
    step: 5,
    presetSteps: [10, 20, 50, 100],
    accentColor: "#10b981",
    desc: "Unique handwritten 800+ word niche blogs on Medium, WordPress, Substack with in-content contextual DoFollow anchors."
  },
  {
    id: "social_bookmarks",
    name: "Social Bookmarking & Signals",
    category: "Fast Indexing",
    icon: "fa-solid fa-bookmark",
    unitPrice: 0.25,
    da: "DA 85+",
    min: 0,
    max: 500,
    step: 10,
    presetSteps: [50, 100, 200, 300],
    accentColor: "#6366f1",
    desc: "High-velocity social bookmark discovery links on Reddit, Pinterest, Scoop.it to accelerate Googlebot crawl frequency."
  },
  {
    id: "pdf_sharing",
    name: "PDF & Document Sharing",
    category: "Document Embeds",
    icon: "fa-solid fa-file-pdf",
    unitPrice: 0.90,
    da: "DA 87+",
    min: 0,
    max: 200,
    step: 5,
    presetSteps: [10, 25, 50, 100],
    accentColor: "#ef4444",
    desc: "Custom branded PDF guides and whitepapers uploaded to SlideShare, Scribd, Issuu with live clickable links."
  },
  {
    id: "guest_posting",
    name: "Editorial Guest Posts",
    category: "High Authority",
    icon: "fa-solid fa-newspaper",
    unitPrice: 18.00,
    da: "DA 87+",
    min: 0,
    max: 35,
    step: 1,
    presetSteps: [1, 3, 5, 10],
    accentColor: "#f59e0b",
    desc: "Real traffic multi-niche & tech publication articles with contextual in-content DoFollow backlink outreach."
  },
  {
    id: "forum_posting",
    name: "Forum & Discussion Mentions",
    category: "Community Traffic",
    icon: "fa-solid fa-comments",
    unitPrice: 1.50,
    da: "DA 86+",
    min: 0,
    max: 50,
    step: 2,
    presetSteps: [5, 10, 20, 35],
    accentColor: "#8b5cf6",
    desc: "Participating in active industry threads (Quora, Reddit, Webmaster boards) with natural signature & mention links."
  },
  {
    id: "press_release",
    name: "Press Release Syndication",
    category: "Digital PR",
    icon: "fa-solid fa-bullhorn",
    unitPrice: 12.00,
    da: "DA 82+",
    min: 0,
    max: 15,
    step: 1,
    presetSteps: [1, 2, 5, 10],
    accentColor: "#0284c7",
    desc: "Syndicated business milestone and launch announcements distributed across top PR wires & Google News index."
  },
  {
    id: "edu_gov",
    name: "Edu & Gov Trust Backlinks",
    category: "Institutional Trust",
    icon: "fa-solid fa-graduation-cap",
    unitPrice: 4.50,
    da: "DA 90+",
    min: 0,
    max: 25,
    step: 1,
    presetSteps: [2, 5, 10, 20],
    accentColor: "#059669",
    desc: "Ultra-high trust Tier-1 backlinks on verified educational (.edu) and government (.gov) resource portals."
  },
  {
    id: "local_citations",
    name: "Local Citations (Google Maps)",
    category: "Local SEO & NAP",
    icon: "fa-solid fa-map-location-dot",
    unitPrice: 0.50,
    da: "DA 88+",
    min: 0,
    max: 150,
    step: 10,
    presetSteps: [20, 40, 80, 120],
    accentColor: "#ea580c",
    desc: "100% NAP consistent business directory citations with geo-tagged images to rank in Google Maps 3-Pack."
  }
];

const PRESET_BUNDLES = [
  {
    id: "starter",
    name: "Starter Entity Launch",
    tag: "Best for New Sites",
    icon: "fa-solid fa-rocket",
    badgeColor: "#3b82f6",
    desc: "Foundational brand authority, NAP consistency & social discovery signals.",
    config: {
      profile_creation: 50,
      social_bookmarks: 50,
      local_citations: 20,
      web20_blogs: 5,
      pdf_sharing: 5,
      guest_posting: 0,
      forum_posting: 0,
      press_release: 0,
      edu_gov: 2
    }
  },
  {
    id: "surge",
    name: "Authority Surge Pack",
    tag: "Most Popular 🔥",
    icon: "fa-solid fa-bolt",
    badgeColor: "#f59e0b",
    desc: "High-impact contextual mix designed for ranking competitive organic keywords.",
    config: {
      profile_creation: 100,
      web20_blogs: 15,
      social_bookmarks: 100,
      pdf_sharing: 15,
      guest_posting: 2,
      forum_posting: 10,
      press_release: 1,
      edu_gov: 5,
      local_citations: 30
    }
  },
  {
    id: "enterprise",
    name: "Enterprise Domination",
    tag: "Maximum Link Juice",
    icon: "fa-solid fa-crown",
    badgeColor: "#8b5cf6",
    desc: "Aggressive multi-tier link structure for market leaders and high-volume keywords.",
    config: {
      profile_creation: 250,
      web20_blogs: 35,
      social_bookmarks: 250,
      pdf_sharing: 30,
      guest_posting: 5,
      forum_posting: 25,
      press_release: 3,
      edu_gov: 12,
      local_citations: 60
    }
  }
];

export default function BacklinkPackageCalculatorPage() {
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

  const bdtRate = 122; // 1 USD = 122 BDT

  const handleQtyChange = (id, val) => {
    setActivePreset(null);
    const num = Math.max(0, parseInt(val) || 0);
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setQuantities(preset.config);
  };

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  const { rawTotalUSD, totalLinkCount } = useMemo(() => {
    let raw = 0;
    let count = 0;
    BACKLINK_SERVICES.forEach(item => {
      const qty = quantities[item.id] || 0;
      raw += qty * item.unitPrice;
      count += qty;
    });
    return { rawTotalUSD: raw, totalLinkCount: count };
  }, [quantities]);

  let addonMultiplier = 1.0;
  if (addons.tier2Indexation) addonMultiplier += 0.15; // +15%
  if (addons.expressDelivery) addonMultiplier += 0.20; // +20%

  const finalTotalUSD = Math.round(rawTotalUSD * addonMultiplier * 100) / 100;
  const finalTotalBDT = Math.round(finalTotalUSD * bdtRate);

  // Turnaround estimate
  let turnaroundDays = "10–14 Days";
  if (totalLinkCount < 80) turnaroundDays = "5–7 Days";
  else if (totalLinkCount < 250) turnaroundDays = "7–10 Days";
  else if (totalLinkCount > 500) turnaroundDays = "14–21 Days";
  if (addons.expressDelivery) turnaroundDays = "3–5 Days (Express)";

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
    BACKLINK_SERVICES.forEach(item => {
      const qty = quantities[item.id] || 0;
      if (qty > 0) {
        summary += `• ${item.name}: ${qty} Links ($${(qty * item.unitPrice).toFixed(2)})\n`;
      }
    });
    summary += `----------------------------------------\n`;
    summary += `📊 *Total Backlinks:* ${totalLinkCount} Links\n`;
    summary += `⚡ *Tier-2 Indexation:* ${addons.tier2Indexation ? "YES (+15% Booster)" : "NO"}\n`;
    summary += `⏱️ *Drip-Feed (Natural Velocity):* ${addons.dripFeed ? "YES (30 Days)" : "Standard"}\n`;
    summary += `🚀 *Delivery Speed:* ${addons.expressDelivery ? "Express (3-5 Days)" : turnaroundDays}\n`;
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

  const whatsappNumber = (siteSettings?.whatsapp_number || "8801670769816").replace(/[^0-9]/g, "");
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

  const faqItems = [
    {
      q: "How does the custom backlink pricing work?",
      a: "Each backlink type has an individual per-link rate based on the authority, domain rating (DA 80+), manual creation labor, and whether it requires unique written content (e.g. Web 2.0 and Guest Posts). You only pay for the exact quantity you select."
    },
    {
      q: "Are all backlinks 100% Google algorithm penalty safe?",
      a: "Yes. Every backlink created by Abdullah BD SEO is built 100% manually on high DA/DR platforms with natural anchor text distribution (branded, naked URL, and topical anchors) and optional natural 30-day drip-feeding to safeguard against algorithmic over-optimization."
    },
    {
      q: "How fast do the backlinks get indexed by Google?",
      a: "When you select our Tier-2 Indexation Booster, all profile URLs and articles are pinged and distributed through Google-compliant indexing acceleration networks, resulting in indexation within 7 to 14 days."
    },
    {
      q: "Will I receive a detailed live spreadsheet report?",
      a: "Yes! Every order includes a complete live Google Sheet or Excel report containing live link URLs, target anchor texts, DA/DR metrics, and verified account login credentials."
    },
    {
      q: "What payment methods are supported?",
      a: "We support international payments via Credit Card, Debit Card, Stripe, PayPal, Wise, and Payoneer, as well as local Bangladesh payments via bKash, Nagad, Rocket, and Bank Transfer."
    }
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "90px" }}>
      
      {/* ================= HERO SECTION WITH GLASSMORPHISM ================= */}
      <section style={{
        position: "relative",
        background: "radial-gradient(circle at 50% 20%, #1e3a8a 0%, #0f172a 60%, #020617 100%)",
        color: "#ffffff",
        padding: "60px 20px 80px",
        overflow: "hidden"
      }}>
        {/* Subtle decorative glow spots */}
        <div style={{ position: "absolute", top: "-150px", left: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "-100px", right: "10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }}></div>

        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
          
          {/* Top Breadcrumb Nav */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(255, 255, 255, 0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "6px 18px", borderRadius: "30px", fontSize: "13px", fontWeight: 700, marginBottom: "20px" }}>
            <Link href="/tools" style={{ color: "#93c5fd", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <i className="fa-solid fa-toolbox"></i> Tools Suite
            </Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
            <Link href="/high-da-backlinks" style={{ color: "#93c5fd", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <i className="fa-solid fa-link"></i> Backlink Hub
            </Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
            <span style={{ color: "#facc15" }}>Package Calculator</span>
          </div>

          <h1 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "16px", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            Custom Backlink Package &amp; <span style={{ background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Live Pricing Calculator</span>
          </h1>

          <p style={{ fontSize: "17px", color: "#cbd5e1", maxWidth: "780px", margin: "0 auto 35px", lineHeight: 1.6 }}>
            Customize your link velocity across 9 high-DA categories, toggle algorithmic safety &amp; indexation boosters, and view real-time estimates with 1-click WhatsApp order fulfillment.
          </p>

          {/* Interactive Steps Indicators */}
          <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(14px)", padding: "10px 24px", borderRadius: "40px", border: "1px solid rgba(255, 255, 255, 0.12)", marginBottom: "35px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#38bdf8" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0284c7", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>1</span>
              <span>Select Quantities</span>
            </div>
            <i className="fa-solid fa-arrow-right" style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", alignSelf: "center" }}></i>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#a5b4fc" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#4f46e5", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>2</span>
              <span>Choose Add-Ons</span>
            </div>
            <i className="fa-solid fa-arrow-right" style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", alignSelf: "center" }}></i>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#4ade80" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>3</span>
              <span>1-Click Order / Quote</span>
            </div>
          </div>

          {/* PRESET BUNDLES BAR */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "1px", color: "#94a3b8", marginBottom: "12px" }}>
              OR LOAD A PRE-CONFIGURED STRATEGY PACK:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px", maxWidth: "980px", margin: "0 auto" }}>
              {PRESET_BUNDLES.map(preset => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    style={{
                      background: isSelected ? "rgba(37, 99, 235, 0.25)" : "rgba(255, 255, 255, 0.06)",
                      border: `1.5px solid ${isSelected ? "#60a5fa" : "rgba(255, 255, 255, 0.15)"}`,
                      boxShadow: isSelected ? "0 0 25px rgba(59, 130, 246, 0.4)" : "none",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      padding: "16px 20px",
                      textAlign: "left",
                      color: "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <i className={`${preset.icon}`} style={{ fontSize: "16px", color: preset.badgeColor }}></i>
                        <strong style={{ fontSize: "15px", fontWeight: 800 }}>{preset.name}</strong>
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: 800, background: preset.badgeColor, color: "#0f172a", padding: "2px 8px", borderRadius: "12px" }}>
                        {preset.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#cbd5e1", margin: 0, lineHeight: 1.4 }}>
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
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  border: "1px solid #e2e8f0"
                }}>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "20px", marginBottom: "26px", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
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
                        setQuantities({
                          profile_creation: 0,
                          web20_blogs: 0,
                          social_bookmarks: 0,
                          pdf_sharing: 0,
                          guest_posting: 0,
                          forum_posting: 0,
                          press_release: 0,
                          edu_gov: 0,
                          local_citations: 0
                        });
                      }}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        color: "#475569",
                        padding: "7px 16px",
                        borderRadius: "8px",
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {BACKLINK_SERVICES.map(item => {
                      const qty = quantities[item.id] || 0;
                      const itemSubtotal = (qty * item.unitPrice).toFixed(2);
                      const isHighlighted = qty > 0;

                      return (
                        <div
                          key={item.id}
                          style={{
                            background: isHighlighted ? "#ffffff" : "#f8fafc",
                            border: `1.5px solid ${isHighlighted ? item.accentColor : "#e2e8f0"}`,
                            borderRadius: "18px",
                            padding: "20px 24px",
                            boxShadow: isHighlighted ? `0 8px 25px ${item.accentColor}18` : "none",
                            transition: "all 0.25s ease"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                              <div style={{
                                width: "46px",
                                height: "46px",
                                borderRadius: "12px",
                                background: `${item.accentColor}15`,
                                color: item.accentColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                border: `1px solid ${item.accentColor}30`
                              }}>
                                <i className={item.icon}></i>
                              </div>
                              
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{item.name}</h3>
                                  <span style={{ fontSize: "11px", fontWeight: 800, background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: "6px" }}>
                                    {item.da}
                                  </span>
                                </div>
                                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
                                  ${item.unitPrice.toFixed(2)}/link • {item.category}
                                </span>
                              </div>
                            </div>

                            {/* Counter Input & Quick Presets */}
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, Math.max(0, qty - item.step))}
                                style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}
                              >-</button>
                              
                              <input
                                type="number"
                                min="0"
                                max={item.max}
                                value={qty}
                                onChange={(e) => handleQtyChange(item.id, e.target.value)}
                                style={{ width: "70px", height: "36px", textAlign: "center", fontWeight: 900, fontSize: "16px", color: "#0f172a", border: `2px solid ${isHighlighted ? item.accentColor : "#cbd5e1"}`, borderRadius: "8px", outline: "none" }}
                              />

                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, Math.min(item.max, qty + item.step))}
                                style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}
                              >+</button>
                            </div>

                          </div>

                          {/* Range Slider */}
                          <div style={{ position: "relative", marginBottom: "12px" }}>
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
                                height: "8px",
                                borderRadius: "4px"
                              }}
                            />
                          </div>

                          {/* Preset Jump Pills */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>Quick Add:</span>
                              {item.presetSteps.map(pStep => (
                                <button
                                  key={pStep}
                                  type="button"
                                  onClick={() => handleQtyChange(item.id, pStep)}
                                  style={{
                                    background: qty === pStep ? item.accentColor : "#f1f5f9",
                                    color: qty === pStep ? "#ffffff" : "#475569",
                                    border: "none",
                                    padding: "2px 8px",
                                    borderRadius: "6px",
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
                                  padding: "2px 8px",
                                  borderRadius: "6px",
                                  fontSize: "11px",
                                  fontWeight: 800,
                                  cursor: "pointer"
                                }}
                              >
                                Max ({item.max})
                              </button>
                            </div>

                            <div style={{ textAlign: "right" }}>
                              <span style={{ fontSize: "15px", fontWeight: 900, color: isHighlighted ? "#059669" : "#94a3b8" }}>
                                ${itemSubtotal} USD
                              </span>
                            </div>
                          </div>

                          <div style={{ marginTop: "8px", fontSize: "12px", color: "#64748b", lineHeight: 1.4, borderTop: "1px dashed #e2e8f0", paddingTop: "8px" }}>
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
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  border: "1px solid #e2e8f0",
                  marginTop: "25px"
                }}>
                  <div style={{ marginBottom: "22px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                      <i className="fa-solid fa-shield-halved text-emerald-600"></i> Indexation &amp; Velocity Add-Ons
                    </h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                      Toggle automated performance boosters to maximize search crawl frequency and ranking impact.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                    
                    {/* Tier 2 Indexing */}
                    <div
                      onClick={() => toggleAddon("tier2Indexation")}
                      style={{
                        background: addons.tier2Indexation ? "#ecfdf5" : "#f8fafc",
                        border: `2px solid ${addons.tier2Indexation ? "#10b981" : "#e2e8f0"}`,
                        borderRadius: "16px",
                        padding: "18px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a" }}>🚀 Tier-2 Indexation Pings</span>
                        <i className={`fa-solid ${addons.tier2Indexation ? "fa-circle-check text-emerald-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "20px" }}></i>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px", lineHeight: 1.4 }}>
                        Ping &amp; drip-feed backlinks into Google discovery networks for rapid 7-day indexation.
                      </p>
                      <span style={{ fontSize: "11px", fontWeight: 800, background: "#d1fae5", color: "#065f46", padding: "3px 8px", borderRadius: "6px" }}>
                        +15% Booster Fee
                      </span>
                    </div>

                    {/* Safe Drip Feed */}
                    <div
                      onClick={() => toggleAddon("dripFeed")}
                      style={{
                        background: addons.dripFeed ? "#eff6ff" : "#f8fafc",
                        border: `2px solid ${addons.dripFeed ? "#3b82f6" : "#e2e8f0"}`,
                        borderRadius: "16px",
                        padding: "18px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a" }}>⏱️ 30-Day Safe Drip-Feed</span>
                        <i className={`fa-solid ${addons.dripFeed ? "fa-circle-check text-blue-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "20px" }}></i>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px", lineHeight: 1.4 }}>
                        Spread link creation naturally over 30 days to mirror realistic organic velocity.
                      </p>
                      <span style={{ fontSize: "11px", fontWeight: 800, background: "#dbeafe", color: "#1e40af", padding: "3px 8px", borderRadius: "6px" }}>
                        100% FREE / INCLUDED
                      </span>
                    </div>

                    {/* Express Priority Delivery */}
                    <div
                      onClick={() => toggleAddon("expressDelivery")}
                      style={{
                        background: addons.expressDelivery ? "#fef3c7" : "#f8fafc",
                        border: `2px solid ${addons.expressDelivery ? "#f59e0b" : "#e2e8f0"}`,
                        borderRadius: "16px",
                        padding: "18px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a" }}>⚡ 7-Day Express Priority</span>
                        <i className={`fa-solid ${addons.expressDelivery ? "fa-circle-check text-amber-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "20px" }}></i>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px", lineHeight: 1.4 }}>
                        Dedicated team sprint for priority queue execution within 3 to 5 business days.
                      </p>
                      <span style={{ fontSize: "11px", fontWeight: 800, background: "#fef3c7", color: "#92400e", padding: "3px 8px", borderRadius: "6px" }}>
                        +20% Express Fee
                      </span>
                    </div>

                    {/* Live Tracking Report */}
                    <div
                      style={{
                        background: "#f8fafc",
                        border: "2px solid #e2e8f0",
                        borderRadius: "16px",
                        padding: "18px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a" }}>📊 Live Google Sheet Report</span>
                        <i className="fa-solid fa-circle-check text-emerald-600" style={{ fontSize: "20px" }}></i>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px", lineHeight: 1.4 }}>
                        Full transparent report with live link URLs, anchor distribution, and login credentials.
                      </p>
                      <span style={{ fontSize: "11px", fontWeight: 800, background: "#e2e8f0", color: "#334155", padding: "3px 8px", borderRadius: "6px" }}>
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
                  borderRadius: "28px",
                  padding: "32px",
                  color: "#ffffff",
                  boxShadow: "0 25px 60px -15px rgba(2, 6, 23, 0.7)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Subtle top neon accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)" }}></div>

                  {/* Header & Currency Toggle */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "18px", marginBottom: "22px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "1px", color: "#94a3b8" }}>
                      ESTIMATED INVESTMENT
                    </span>

                    <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "3px" }}>
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        style={{
                          background: currency === "USD" ? "#2563eb" : "transparent",
                          color: "#ffffff",
                          border: "none",
                          padding: "5px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
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
                          padding: "5px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor: "pointer"
                        }}
                      >BDT (৳)</button>
                    </div>
                  </div>

                  {/* Big Glowing Price */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ fontSize: "clamp(38px, 4vw, 52px)", fontWeight: 900, color: "#38bdf8", lineHeight: 1, letterSpacing: "-1px", textShadow: "0 0 25px rgba(56, 189, 248, 0.4)" }}>
                      {currency === "USD" ? `$${finalTotalUSD.toFixed(2)}` : `৳${finalTotalBDT.toLocaleString()}`}
                    </div>
                    <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "8px" }}>
                      {currency === "USD" ? `Approx. ৳${finalTotalBDT.toLocaleString()} BDT` : `Approx. $${finalTotalUSD.toFixed(2)} USD`} • One-time verified execution
                    </div>
                  </div>

                  {/* Link Power & Authority Gauge */}
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px", marginBottom: "22px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>
                      <span style={{ color: "#cbd5e1" }}>SEO Authority &amp; Ranking Impact:</span>
                      <span style={{ color: powerColor }}>{powerLabel} ({powerScore}%)</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${powerScore}%`, height: "100%", background: `linear-gradient(90deg, #38bdf8, ${powerColor})`, borderRadius: "4px", transition: "width 0.4s ease" }}></div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "16px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>TOTAL LINKS</div>
                      <div style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", marginTop: "2px" }}>
                        <i className="fa-solid fa-link text-blue-400 mr-1" style={{ fontSize: "16px" }}></i> {totalLinkCount}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>AVG DOMAIN TRUST</div>
                      <div style={{ fontSize: "22px", fontWeight: 900, color: "#34d399", marginTop: "2px" }}>
                        DA 88+
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>EST. DELIVERY</div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#e2e8f0", marginTop: "4px" }}>
                        {turnaroundDays}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>INDEX GUARANTEE</div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#facc15", marginTop: "4px" }}>
                        {addons.tier2Indexation ? "Fast (7-14d)" : "Standard"}
                      </div>
                    </div>
                  </div>

                  {/* Selected Breakdown List */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px", marginBottom: "24px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#cbd5e1", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                      <span>SELECTED PACKAGE COMPOSITION:</span>
                      <span style={{ color: "#38bdf8" }}>{BACKLINK_SERVICES.filter(item => (quantities[item.id] || 0) > 0).length} Types</span>
                    </div>

                    <div style={{ maxHeight: "150px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", paddingRight: "4px" }}>
                      {BACKLINK_SERVICES.filter(item => (quantities[item.id] || 0) > 0).map(item => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", borderBottom: "1px dashed rgba(255,255,255,0.06)", paddingBottom: "4px" }}>
                          <span>• {item.name}:</span>
                          <strong style={{ color: "#ffffff" }}>{quantities[item.id]} Links</strong>
                        </div>
                      ))}
                      {totalLinkCount === 0 && (
                        <div style={{ color: "#f87171", fontStyle: "italic", textAlign: "center", padding: "10px 0" }}>
                          No backlinks selected. Use sliders or select a preset bundle above.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    
                    {/* WhatsApp 1-Click Order */}
                    <a
                      href={totalLinkCount > 0 ? whatsappUrl : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { if (totalLinkCount === 0) { e.preventDefault(); alert("Please select at least 1 backlink quantity."); } }}
                      style={{
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#ffffff",
                        padding: "16px 20px",
                        borderRadius: "14px",
                        textDecoration: "none",
                        fontWeight: 900,
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        boxShadow: "0 10px 25px rgba(34, 197, 94, 0.45)",
                        transition: "all 0.2s"
                      }}
                    >
                      <i className="fa-brands fa-whatsapp text-2xl"></i>
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
                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        color: "#ffffff",
                        border: "none",
                        padding: "15px 20px",
                        borderRadius: "14px",
                        fontWeight: 800,
                        fontSize: "15px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)"
                      }}
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>Submit Custom Project Order</span>
                    </button>

                    {/* Copy Quote Button */}
                    <button
                      type="button"
                      onClick={copySummary}
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#cbd5e1",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "11px 16px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                      }}
                    >
                      <i className={copied ? "fa-solid fa-check text-emerald-400" : "fa-solid fa-copy"}></i>
                      <span>{copied ? "Package Summary Copied!" : "Copy Full Quote Breakdown"}</span>
                    </button>

                  </div>

                  {/* Trust Guarantees */}
                  <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#94a3b8" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="fa-solid fa-shield-check text-emerald-400"></i>
                      <span>100% Real Manual Hand-Crafted Accounts</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="fa-solid fa-arrows-rotate text-blue-400"></i>
                      <span>Free Replacement for Any Dropped Links</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
      <section style={{ maxWidth: "1000px", margin: "80px auto 0", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", background: "#e0e7ff", color: "#4338ca", padding: "5px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: 800, marginBottom: "12px" }}>
            TRANSPARENCY &amp; METHODOLOGY
          </div>
          <h2 style={{ fontSize: "30px", fontWeight: 900, color: "#0f172a" }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: "15px", color: "#64748b" }}>Everything you need to know about custom link building execution.</p>
        </div>

        <ToolFaqAccordion items={faqItems} />
      </section>

      {/* ================= ORDER INQUIRY MODAL ================= */}
      {showOrderModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#ffffff", borderRadius: "24px", maxWidth: "560px", width: "100%", padding: "34px", boxShadow: "0 25px 60px rgba(0,0,0,0.35)", position: "relative" }}>
            
            <button
              type="button"
              onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
              style={{ position: "absolute", top: "22px", right: "22px", background: "#f1f5f9", border: "none", width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {orderSuccess ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 18px" }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#0f172a", marginBottom: "8px" }}>Order Inquiry Submitted!</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", marginBottom: "24px" }}>
                  Thank you! Our lead SEO strategist will review your target website and custom package configuration, and contact you via email/WhatsApp within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", padding: "12px 28px", borderRadius: "10px", fontWeight: 800, cursor: "pointer" }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", marginBottom: "4px" }}>
                  Submit Custom Backlink Order
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "22px" }}>
                  Package: <strong>{totalLinkCount} Links</strong> • Estimated Total: <strong>${finalTotalUSD.toFixed(2)} USD (৳{finalTotalBDT.toLocaleString()} BDT)</strong>
                </p>

                <form onSubmit={handleOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Target Website URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourwebsite.com"
                      value={orderForm.websiteUrl}
                      onChange={(e) => setOrderForm({ ...orderForm, websiteUrl: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Primary Keywords (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. ecommerce seo, local plumber, brand name"
                      value={orderForm.targetKeywords}
                      onChange={(e) => setOrderForm({ ...orderForm, targetKeywords: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Special Instructions / Notes</label>
                    <textarea
                      rows="2"
                      placeholder="Any specific anchor ratio, country targets, or notes..."
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", resize: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    style={{ background: "#2563eb", color: "#ffffff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: 800, fontSize: "15px", cursor: "pointer", marginTop: "6px" }}
                  >
                    {orderSubmitting ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Submitting Order...</> : "Confirm & Send Project Order"}
                  </button>
                </form>
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
