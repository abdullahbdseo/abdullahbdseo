"use client";

import { useState, useId } from "react";
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
    desc: "100% NAP consistent business directory citations with geo-tagged images to rank in Google Maps 3-Pack."
  }
];

const PRESET_BUNDLES = [
  {
    name: "Starter Entity Launch",
    tag: "Best for New Sites",
    icon: "fa-solid fa-rocket",
    desc: "Establish foundational brand entity and trust signals across major platforms.",
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
    name: "Authority Surge Pack",
    tag: "Most Popular 🔥",
    icon: "fa-solid fa-bolt",
    desc: "Balanced contextual link building designed for ranking competitive organic keywords.",
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
    name: "Enterprise Domination",
    tag: "Maximum Link Juice",
    icon: "fa-solid fa-crown",
    desc: "Heavy-hitting multi-tier link structure for high-volume organic search dominance.",
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
    const num = Math.max(0, parseInt(val) || 0);
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const applyPreset = (presetConfig) => {
    setQuantities(presetConfig);
  };

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  let rawTotalUSD = 0;
  let totalLinkCount = 0;

  BACKLINK_SERVICES.forEach(item => {
    const qty = quantities[item.id] || 0;
    rawTotalUSD += qty * item.unitPrice;
    totalLinkCount += qty;
  });

  let addonMultiplier = 1.0;
  if (addons.tier2Indexation) addonMultiplier += 0.15; // +15% for automated Tier-2 indexing pings
  if (addons.expressDelivery) addonMultiplier += 0.20; // +20% for 7-day express turnaround

  const finalTotalUSD = Math.round(rawTotalUSD * addonMultiplier * 100) / 100;
  const finalTotalBDT = Math.round(finalTotalUSD * bdtRate);

  // Turnaround estimate
  let turnaroundDays = "10–14 Days";
  if (totalLinkCount < 80) turnaroundDays = "5–7 Days";
  else if (totalLinkCount < 250) turnaroundDays = "7–10 Days";
  else if (totalLinkCount > 500) turnaroundDays = "14–21 Days";
  if (addons.expressDelivery) turnaroundDays = "3–5 Days (Express)";

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
    summary += `⚡ *Tier-2 Indexation:* ${addons.tier2Indexation ? "YES (Included)" : "NO"}\n`;
    summary += `⏱️ *Drip-Feed (Natural Velocity):* ${addons.dripFeed ? "YES (30 Days)" : "Standard"}\n`;
    summary += `🚀 *Delivery Speed:* ${addons.expressDelivery ? "Express (3-5 Days)" : turnaroundDays}\n`;
    summary += `💰 *Total Estimated Price:* $${finalTotalUSD.toFixed(2)} USD / ৳${finalTotalBDT.toLocaleString()} BDT\n`;
    summary += `----------------------------------------\n`;
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
    <div className="tool-single-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* HEADER SECTION */}
      <section className="page-header-section" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)", color: "white", padding: "60px 20px 70px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
          <Link href="/high-da-backlinks" className="tool-back-link" style={{ color: "#93c5fd", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "14px", marginBottom: "16px" }}>
            <i className="fa-solid fa-arrow-left"></i> Explore Backlink Resource Hub
          </Link>
          
          <div style={{ display: "inline-block", background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)", padding: "6px 18px", borderRadius: "30px", fontSize: "13px", fontWeight: 800, color: "#facc15", letterSpacing: "0.5px", marginBottom: "14px" }}>
            <i className="fa-solid fa-sliders mr-2"></i> INTERACTIVE LINK BUILDING CONFIGURATOR
          </div>

          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Custom Backlink Package &amp; Investment Calculator
          </h1>
          <p style={{ fontSize: "16px", color: "#cbd5e1", maxWidth: "750px", margin: "0 auto 25px", lineHeight: "1.6" }}>
            Tailor your link velocity, choose specific high-DA tiers, toggle indexation boosters, and receive transparent instant pricing in USD and BDT with 1-click order fulfillment.
          </p>

          {/* Quick Presets Bar */}
          <div style={{ background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(12px)", padding: "16px 20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.1)", display: "inline-flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#94a3b8" }}><i className="fa-solid fa-wand-magic-sparkles mr-1 text-amber-400"></i> QUICK PRESET BUNDLES:</span>
            {PRESET_BUNDLES.map(bundle => (
              <button
                key={bundle.name}
                type="button"
                onClick={() => applyPreset(bundle.config)}
                style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff", padding: "8px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
                onMouseOver={(e) => { e.currentTarget.style.background = "#3b82f6"; e.currentTarget.style.borderColor = "#60a5fa"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"; }}
              >
                <i className={bundle.icon}></i>
                <span>{bundle.name}</span>
                <span style={{ fontSize: "10px", background: "#facc15", color: "#0f172a", padding: "2px 6px", borderRadius: "12px", fontWeight: 800 }}>{bundle.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CALCULATOR SECTION */}
      <div className="container" style={{ maxWidth: "1200px", margin: "-30px auto 0", padding: "0 20px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", alignItems: "start" }}>
          
          {/* LEFT: CONFIGURATOR SLIDERS */}
          <div style={{ flex: 1.4 }}>
            <div style={{ background: "#ffffff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", marginBottom: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "18px", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fa-solid fa-sliders text-blue-600"></i> Configure Backlink Quantities
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>Adjust sliders or type desired number of backlinks for each category.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantities({
                    profile_creation: 0,
                    web20_blogs: 0,
                    social_bookmarks: 0,
                    pdf_sharing: 0,
                    guest_posting: 0,
                    forum_posting: 0,
                    press_release: 0,
                    edu_gov: 0,
                    local_citations: 0
                  })}
                  style={{ background: "#f1f5f9", border: "none", color: "#64748b", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                >
                  <i className="fa-solid fa-rotate-left mr-1"></i> Reset
                </button>
              </div>

              {/* Backlink Sliders List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {BACKLINK_SERVICES.map(item => {
                  const qty = quantities[item.id] || 0;
                  const itemSubtotal = (qty * item.unitPrice).toFixed(2);
                  return (
                    <div key={item.id} style={{ background: "#f8fafc", padding: "18px 20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                            <i className={item.icon}></i>
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{item.name}</h3>
                              <span style={{ fontSize: "10px", fontWeight: 800, background: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: "6px" }}>{item.da}</span>
                            </div>
                            <span style={{ fontSize: "12px", color: "#64748b" }}>${item.unitPrice.toFixed(2)}/link • {item.category}</span>
                          </div>
                        </div>

                        {/* Quantity Counter Box */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, Math.max(0, qty - item.step))}
                            style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >-</button>
                          <input
                            type="number"
                            min="0"
                            max={item.max}
                            value={qty}
                            onChange={(e) => handleQtyChange(item.id, e.target.value)}
                            style={{ width: "65px", height: "32px", textAlign: "center", fontWeight: 800, fontSize: "15px", color: "#0f172a", border: "1.5px solid #3b82f6", borderRadius: "6px", outline: "none" }}
                          />
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, Math.min(item.max, qty + item.step))}
                            style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >+</button>
                        </div>
                      </div>

                      {/* Range Slider */}
                      <input
                        type="range"
                        min="0"
                        max={item.max}
                        step={item.step}
                        value={qty}
                        onChange={(e) => handleQtyChange(item.id, e.target.value)}
                        style={{ width: "100%", accentColor: "#2563eb", cursor: "pointer", height: "6px", margin: "6px 0 10px" }}
                      />

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                        <span style={{ color: "#64748b", fontStyle: "italic", maxWidth: "75%" }}>{item.desc}</span>
                        <span style={{ fontWeight: 800, color: qty > 0 ? "#059669" : "#94a3b8", fontSize: "14px" }}>
                          ${itemSubtotal} USD
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STRATEGY & ADD-ONS CARD */}
            <div style={{ background: "#ffffff", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", marginBottom: "6px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-shield-halved text-emerald-600"></i> Indexation, Velocity &amp; Strategy Add-Ons
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>Optional performance enhancements to maximize ranking boost and link juice.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px" }}>
                {/* Tier 2 Indexing */}
                <div
                  onClick={() => toggleAddon("tier2Indexation")}
                  style={{ background: addons.tier2Indexation ? "#ecfdf5" : "#f8fafc", border: `1.5px solid ${addons.tier2Indexation ? "#10b981" : "#e2e8f0"}`, borderRadius: "12px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>🚀 Tier-2 Indexation Pings</span>
                    <i className={`fa-solid ${addons.tier2Indexation ? "fa-circle-check text-emerald-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "18px" }}></i>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px" }}>Ping &amp; drip-feed backlinks into Google discovery networks for rapid 7-day crawl.</p>
                  <span style={{ fontSize: "11px", fontWeight: 800, background: "#d1fae5", color: "#065f46", padding: "2px 8px", borderRadius: "6px" }}>+15% Link Juice Booster</span>
                </div>

                {/* Natural Drip Feed */}
                <div
                  onClick={() => toggleAddon("dripFeed")}
                  style={{ background: addons.dripFeed ? "#eff6ff" : "#f8fafc", border: `1.5px solid ${addons.dripFeed ? "#3b82f6" : "#e2e8f0"}`, borderRadius: "12px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>⏱️ 30-Day Safe Drip-Feed</span>
                    <i className={`fa-solid ${addons.dripFeed ? "fa-circle-check text-blue-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "18px" }}></i>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px" }}>Spread link creation naturally over 30 days to avoid algorithmic spike penalties.</p>
                  <span style={{ fontSize: "11px", fontWeight: 800, background: "#dbeafe", color: "#1e40af", padding: "2px 8px", borderRadius: "6px" }}>100% FREE / INCLUDED</span>
                </div>

                {/* Express Turnaround */}
                <div
                  onClick={() => toggleAddon("expressDelivery")}
                  style={{ background: addons.expressDelivery ? "#fef3c7" : "#f8fafc", border: `1.5px solid ${addons.expressDelivery ? "#f59e0b" : "#e2e8f0"}`, borderRadius: "12px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>⚡ 7-Day Express Priority</span>
                    <i className={`fa-solid ${addons.expressDelivery ? "fa-circle-check text-amber-600" : "fa-circle text-slate-300"}`} style={{ fontSize: "18px" }}></i>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px" }}>Dedicated team sprint for priority queue execution within 3 to 5 business days.</p>
                  <span style={{ fontSize: "11px", fontWeight: 800, background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "6px" }}>+20% Express Fee</span>
                </div>

                {/* Detailed Live Sheet */}
                <div
                  style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 800, fontSize: "14px", color: "#0f172a" }}>📊 Live Google Sheet Report</span>
                    <i className="fa-solid fa-circle-check text-emerald-600" style={{ fontSize: "18px" }}></i>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px" }}>Complete transparent live report with live links, anchor distribution, and login credentials.</p>
                  <span style={{ fontSize: "11px", fontWeight: 800, background: "#e2e8f0", color: "#334155", padding: "2px 8px", borderRadius: "6px" }}>100% FREE / INCLUDED</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY ORDER SUMMARY & CHECKOUT CARD */}
          <div style={{ position: "sticky", top: "20px" }}>
            <div style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)", color: "white", borderRadius: "24px", padding: "30px", boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.4)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              
              {/* Currency Selector */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px", marginBottom: "20px" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#94a3b8" }}>ESTIMATED TOTAL</span>
                <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "3px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    style={{ background: currency === "USD" ? "#3b82f6" : "transparent", border: "none", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 800, cursor: "pointer" }}
                  >USD ($)</button>
                  <button
                    type="button"
                    onClick={() => setCurrency("BDT")}
                    style={{ background: currency === "BDT" ? "#3b82f6" : "transparent", border: "none", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 800, cursor: "pointer" }}
                  >BDT (৳)</button>
                </div>
              </div>

              {/* Price Display */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 900, color: "#38bdf8", lineHeight: 1 }}>
                  {currency === "USD" ? `$${finalTotalUSD.toFixed(2)}` : `৳${finalTotalBDT.toLocaleString()}`}
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>
                  {currency === "USD" ? `Approx. ৳${finalTotalBDT.toLocaleString()} BDT` : `Approx. $${finalTotalUSD.toFixed(2)} USD`} • One-time investment
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "14px", padding: "16px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>TOTAL LINKS</div>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", marginTop: "2px" }}>
                    <i className="fa-solid fa-link text-blue-400 mr-1"></i> {totalLinkCount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>AVG AUTHORITY</div>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "#10b981", marginTop: "2px" }}>
                    DA 88+
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>EST. DELIVERY</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#cbd5e1", marginTop: "4px" }}>
                    {turnaroundDays}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700 }}>LINK JUICE RATING</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#facc15", marginTop: "4px" }}>
                    ⭐ 9.8 / 10
                  </div>
                </div>
              </div>

              {/* Selected Breakdown Snippet */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginBottom: "24px" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#cbd5e1", marginBottom: "10px" }}>PACKAGE COMPOSITION:</div>
                <div style={{ maxHeight: "150px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                  {BACKLINK_SERVICES.filter(item => (quantities[item.id] || 0) > 0).map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                      <span>• {item.name}:</span>
                      <strong style={{ color: "#ffffff" }}>{quantities[item.id]} Links</strong>
                    </div>
                  ))}
                  {totalLinkCount === 0 && (
                    <div style={{ color: "#f87171", fontStyle: "italic" }}>No backlinks selected yet. Adjust the sliders to configure your bundle.</div>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Instant WhatsApp Order */}
                <a
                  href={totalLinkCount > 0 ? whatsappUrl : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { if (totalLinkCount === 0) { e.preventDefault(); alert("Please select at least 1 backlink quantity."); } }}
                  style={{ background: "#22c55e", color: "#ffffff", padding: "16px 20px", borderRadius: "14px", textDecoration: "none", fontWeight: 900, fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)", transition: "all 0.2s" }}
                >
                  <i className="fa-brands fa-whatsapp text-2xl"></i>
                  <span>Order via WhatsApp (1-Click)</span>
                </a>

                {/* Direct Project Inquiry Modal Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (totalLinkCount === 0) { alert("Please select at least 1 backlink quantity."); return; }
                    setShowOrderModal(true);
                  }}
                  style={{ background: "#3b82f6", color: "#ffffff", border: "none", padding: "14px 20px", borderRadius: "14px", fontWeight: 800, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Submit Custom Project Order</span>
                </button>

                {/* Copy Quote Button */}
                <button
                  type="button"
                  onClick={copySummary}
                  style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", padding: "11px 16px", borderRadius: "12px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  <i className={copied ? "fa-solid fa-check text-emerald-400" : "fa-solid fa-copy"}></i>
                  <span>{copied ? "Package Summary Copied!" : "Copy Full Quote Breakdown"}</span>
                </button>
              </div>

              {/* Guarantees List */}
              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#94a3b8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-shield-check text-emerald-400"></i>
                  <span>100% Real &amp; Manual Hand-Crafted Backlinks</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-rotate-left text-blue-400"></i>
                  <span>Full Replacement Guarantee for Dropped Links</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-file-excel text-emerald-400"></i>
                  <span>White-Label Excel Spreadsheet Delivery</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FAQ & STRATEGY GUIDE SECTION */}
      <section style={{ maxWidth: "1000px", margin: "70px auto 0", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", background: "#e0e7ff", color: "#4338ca", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 800, marginBottom: "10px" }}>
            TRANSPARENCY &amp; GUARANTEE
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#0f172a" }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: "15px", color: "#64748b" }}>Everything you need to know about our custom link building execution.</p>
        </div>

        <ToolFaqAccordion items={faqItems} />
      </section>

      {/* ORDER INQUIRY MODAL */}
      {showOrderModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(6px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#ffffff", borderRadius: "20px", maxWidth: "550px", width: "100%", padding: "30px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", position: "relative" }}>
            
            <button
              type="button"
              onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
              style={{ position: "absolute", top: "20px", right: "20px", background: "#f1f5f9", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {orderSuccess ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 16px" }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", marginBottom: "8px" }}>Order Inquiry Submitted!</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", marginBottom: "20px" }}>
                  Thank you! Our lead SEO strategist will review your target URLs and keyword configuration, and reach out via email/WhatsApp within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => { setShowOrderModal(false); setOrderSuccess(false); }}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", padding: "10px 24px", borderRadius: "10px", fontWeight: 800, cursor: "pointer" }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", marginBottom: "4px" }}>
                  Submit Custom Backlink Order
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
                  Package: <strong>{totalLinkCount} Links</strong> • Estimated Total: <strong>${finalTotalUSD.toFixed(2)} USD</strong>
                </p>

                <form onSubmit={handleOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
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
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
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
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Primary Keywords (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. ecommerce seo, local plumber, brand name"
                      value={orderForm.targetKeywords}
                      onChange={(e) => setOrderForm({ ...orderForm, targetKeywords: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "#334155", display: "block", marginBottom: "4px" }}>Special Instructions / Notes</label>
                    <textarea
                      rows="2"
                      placeholder="Any specific anchor ratio, country targets, or notes..."
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", resize: "none" }}
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
