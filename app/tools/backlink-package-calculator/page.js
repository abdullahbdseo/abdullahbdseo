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
          
          {/* Breadcrumb Capsule Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "22px", display: "inline-flex" }}>
            <ol style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "6px 18px",
              borderRadius: "30px",
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

          {/* Glowing Live Engine Badge */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(37, 99, 235, 0.15)",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              color: "#60a5fa",
              padding: "6px 18px",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.5px"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e", display: "inline-block" }}></span>
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
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>100% Real Manual</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>No bots or automated PBNs</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Tier-2 Indexation</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Fast 7-14 day discovery</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(168, 85, 247, 0.15)", color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Natural Drip-Feed</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Safe velocity distribution</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(250, 204, 21, 0.15)", color: "#facc15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                <i className="fa-solid fa-file-excel"></i>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff" }}>Live Excel Sheet</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Full links + logins report</div>
              </div>
            </div>
          </div>

          {/* Interactive Steps Progress */}
          <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(14px)",
            padding: "10px 26px",
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "36px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#38bdf8" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#0284c7", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>1</span>
              <span>Set Link Quantities</span>
            </div>
            <i className="fa-solid fa-arrow-right" style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", alignSelf: "center" }}></i>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#a5b4fc" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#4f46e5", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>2</span>
              <span>Select Add-Ons</span>
            </div>
            <i className="fa-solid fa-arrow-right" style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", alignSelf: "center" }}></i>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#4ade80" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>3</span>
              <span>1-Click Order / Quote</span>
            </div>
          </div>

          {/* Pre-Configured Preset Packs */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "1px", color: "#94a3b8", marginBottom: "14px" }}>
              POPULAR PRE-CONFIGURED STRATEGY PACKS:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", maxWidth: "1020px", margin: "0 auto" }}>
              {PRESET_BUNDLES.map(preset => {
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
                      borderRadius: "18px",
                      padding: "18px 20px",
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
                      <span style={{ fontSize: "10px", fontWeight: 800, background: preset.badgeColor, color: "#0f172a", padding: "3px 9px", borderRadius: "12px" }}>
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", overflowY: "auto" }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "12px",
            maxWidth: "580px",
            width: "100%",
            padding: orderSuccess ? "32px 28px 28px" : "28px",
            boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.4)",
            position: "relative",
            border: "1px solid rgba(226, 232, 240, 0.9)",
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
                top: "16px",
                right: "16px",
                background: "#f1f5f9",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.color = "#0f172a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#64748b"; }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {orderSuccess ? (
              <div style={{ textAlign: "center" }}>
                
                {/* Glowing Success Badge */}
                <div style={{ position: "relative", width: "70px", height: "70px", margin: "0 auto 14px" }}>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0) 70%)",
                    animation: "pulse 2s infinite"
                  }}></div>
                  <div style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    boxShadow: "0 8px 20px rgba(16,185,129,0.3)",
                    position: "relative",
                    zIndex: 2
                  }}>
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>

                {/* Status Pill */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#047857",
                  marginBottom: "10px"
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }}></span>
                  INQUIRY RECEIVED &amp; QUEUED FOR AUDIT
                </div>

                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", marginBottom: "6px", letterSpacing: "-0.4px" }}>
                  Order Inquiry Submitted Successfully!
                </h3>
                
                <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: "1.55", marginBottom: "18px", maxWidth: "480px", margin: "0 auto 18px" }}>
                  Thank you, <strong>{orderForm.name || "Valued Client"}</strong>! Our lead SEO strategist is now reviewing your target website metrics, anchor distribution, and custom package configuration.
                </p>

                {/* Order Summary Snapshot Card */}
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "14px 18px",
                  textAlign: "left",
                  marginBottom: "18px"
                }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                    <span>Selected Package Details</span>
                    <span style={{ color: "#2563eb" }}>Custom Order</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12.5px" }}>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10.5px", fontWeight: 600 }}>TARGET WEBSITE</span>
                      <strong style={{ color: "#0f172a", wordBreak: "break-all" }}>{orderForm.websiteUrl || "To be finalized"}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10.5px", fontWeight: 600 }}>TOTAL BACKLINKS</span>
                      <strong style={{ color: "#0f172a" }}>{totalLinkCount} High-DA Links</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10.5px", fontWeight: 600 }}>ESTIMATED TOTAL</span>
                      <strong style={{ color: "#16a34a", fontSize: "13.5px" }}>
                        ${finalTotalUSD.toFixed(2)} USD <span style={{ fontSize: "11.5px", color: "#64748b" }}>(৳{finalTotalBDT.toLocaleString()} BDT)</span>
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "10.5px", fontWeight: 600 }}>ESTIMATED TIMELINE</span>
                      <strong style={{ color: "#0f172a" }}>5 - 7 Business Days</strong>
                    </div>
                  </div>
                </div>

                {/* What Happens Next - 3 Step Roadmap */}
                <div style={{
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "14px",
                  textAlign: "left",
                  marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#1e40af", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-route"></i>
                    <span>WHAT HAPPENS NEXT?</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "12px", color: "#334155" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0 }}>1</span>
                      <span><strong>Niche &amp; Anchor Audit:</strong> We analyze your domain and verify optimal anchor ratios (Within 2 Hours).</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0 }}>2</span>
                      <span><strong>Direct Contact &amp; Invoice:</strong> We reach out via WhatsApp/Email to confirm anchor text &amp; payment.</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0 }}>3</span>
                      <span><strong>Live Excel Sheet Delivery:</strong> 100% manual links creation with login details &amp; replacement guarantee.</span>
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
                      padding: "12px 18px",
                      borderRadius: "8px",
                      fontWeight: 800,
                      fontSize: "14px",
                      textDecoration: "none",
                      boxShadow: "0 8px 18px rgba(37,211,102,0.25)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: "18px" }}></i>
                    <span>Connect Instantly on WhatsApp for Fast-Track</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      border: "none",
                      padding: "11px 18px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "13.5px",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.color = "#0f172a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
                  >
                    Close &amp; Continue Browsing
                  </button>
                </div>

                {/* Trust Seals Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #f1f5f9", fontSize: "11px", color: "#64748b" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <i className="fa-solid fa-shield-halved" style={{ color: "#10b981" }}></i>
                    100% White-Hat Safe
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <i className="fa-solid fa-bolt" style={{ color: "#f59e0b" }}></i>
                    &lt; 2hr Response Time
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "19px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.3px" }}>
                      Submit Custom Backlink Order
                    </h3>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                      Directly submit your requirements for strategist review
                    </p>
                  </div>
                </div>

                {/* Package Highlights Pill */}
                <div style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "9px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "14px 0 16px",
                  fontSize: "12.5px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-cubes-stacked text-blue-600"></i>
                    <span style={{ color: "#334155" }}>Package: <strong>{totalLinkCount} Custom Links</strong></span>
                  </div>
                  <div style={{ fontWeight: 800, color: "#16a34a" }}>
                    ${finalTotalUSD.toFixed(2)} USD <span style={{ color: "#64748b", fontWeight: 600, fontSize: "11px" }}>(৳{finalTotalBDT.toLocaleString()})</span>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "13px" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "13px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Target Website URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourwebsite.com"
                      value={orderForm.websiteUrl}
                      onChange={(e) => setOrderForm({ ...orderForm, websiteUrl: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "13px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Primary Keywords (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. ecommerce seo, local plumber, brand name"
                      value={orderForm.targetKeywords}
                      onChange={(e) => setOrderForm({ ...orderForm, targetKeywords: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "13px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Special Instructions / Anchor Notes</label>
                    <textarea
                      rows="2"
                      placeholder="Any specific anchor ratio, country targets, or notes..."
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "13px", resize: "none" }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#64748b", margin: "1px 0 2px" }}>
                    <i className="fa-solid fa-lock text-emerald-500"></i>
                    <span>Your domain details are 100% confidential and protected by NDA.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    style={{
                      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px",
                      borderRadius: "8px",
                      fontWeight: 800,
                      fontSize: "13.5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 8px 18px rgba(37,99,235,0.25)"
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
