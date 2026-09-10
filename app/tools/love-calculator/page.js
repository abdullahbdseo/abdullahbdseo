"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

const ZODIAC_SIGNS = [
  "Aries (Mar 21 - Apr 19)",
  "Taurus (Apr 20 - May 20)",
  "Gemini (May 21 - Jun 20)",
  "Cancer (Jun 21 - Jul 22)",
  "Leo (Jul 23 - Aug 22)",
  "Virgo (Aug 23 - Sep 22)",
  "Libra (Sep 23 - Oct 22)",
  "Scorpio (Oct 23 - Nov 21)",
  "Sagittarius (Nov 22 - Dec 21)",
  "Capricorn (Dec 22 - Jan 19)",
  "Aquarius (Jan 20 - Feb 18)",
  "Pisces (Feb 19 - Mar 20)"
];

const RELATIONSHIP_STAGES = [
  { id: "crush", label: "Secret Crush", icon: "fa-heart-pulse" },
  { id: "dating", label: "Dating / Relationship", icon: "fa-heart" },
  { id: "engaged", label: "Engaged / Married", icon: "fa-ring" },
  { id: "friends", label: "Best Friends", icon: "fa-user-group" }
];

export default function LoveCalculatorPage() {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [yourZodiac, setYourZodiac] = useState("");
  const [partnerZodiac, setPartnerZodiac] = useState("");
  const [relationshipStage, setRelationshipStage] = useState("dating");
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Deterministic love score algorithm based on character frequencies and string hash
  const calculateLove = (e) => {
    e.preventDefault();
    if (!yourName.trim() || !partnerName.trim()) return;

    setCalculating(true);
    setResult(null);

    setTimeout(() => {
      const combined = (yourName.trim().toLowerCase() + partnerName.trim().toLowerCase()).replace(/[^a-z]/g, "");
      
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash * 31 + combined.charCodeAt(i)) % 1000000;
      }

      // Base score consistently between 75 and 99 for a wonderful positive experience
      const baseScore = 75 + (Math.abs(hash) % 24);
      
      // Bonus based on relationship stage
      let stageBonus = 0;
      if (relationshipStage === "engaged") stageBonus = 2;
      if (relationshipStage === "crush") stageBonus = 1;

      const finalScore = Math.min(99, Math.max(68, baseScore + stageBonus));

      // Detailed metrics
      const emotional = Math.min(99, 70 + ((hash * 7) % 29));
      const trust = Math.min(99, 72 + ((hash * 13) % 27));
      const passion = Math.min(99, 68 + ((hash * 19) % 31));
      const communication = Math.min(99, 70 + ((hash * 23) % 29));

      // Verdict determination
      let statusTitle = "Soulmate Connection ❤️";
      let statusDescription = "An extraordinary romantic synergy! You two share deep emotional resonance, mutual trust, and magnetic chemistry.";
      let advice = "Keep nurturing your deep talks and celebrating each other's wins—your bond has tremendous staying power!";

      if (finalScore >= 95) {
        statusTitle = "Flames of True Destiny 🔥";
        statusDescription = "Rare and legendary cosmic compatibility! Your personalities, values, and hearts align in near-perfect harmony.";
        advice = "Plan frequent romantic getaways and continue giving each other genuine appreciation every day.";
      } else if (finalScore >= 90) {
        statusTitle = "Soulmate Connection ❤️";
        statusDescription = "Exceptional chemistry and enduring warmth! You bring out the absolute best in each other.";
        advice = "Continue expressing affection openly and make quality time together your highest priority.";
      } else if (finalScore >= 80) {
        statusTitle = "Sweet Romantic Harmony 💖";
        statusDescription = "A vibrant and joyful match filled with laughter, supportive teamwork, and loving energy.";
        advice = "Focus on active listening and shared hobbies to turn good chemistry into an unbreakable foundation.";
      } else {
        statusTitle = "Spark of Potential ✨";
        statusDescription = "A charming and unique bond with exciting dynamics and great room for passionate growth.";
        advice = "Open conversations and spontaneous dates will ignite even deeper emotional intimacy.";
      }

      setResult({
        score: finalScore,
        emotional,
        trust,
        passion,
        communication,
        statusTitle,
        statusDescription,
        advice,
        calculatedAt: new Date().toLocaleDateString()
      });

      setCalculating(false);
    }, 850);
  };

  const handleCopyResult = () => {
    if (!result) return;
    const text = `❤️ Love Compatibility Score for ${yourName} & ${partnerName}: ${result.score}% (${result.statusTitle})\nEmotional Harmony: ${result.emotional}%\nTrust & Loyalty: ${result.trust}%\nTested on ${siteSettings.site_name} Love Calculator!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setResult(null);
    setYourName("");
    setPartnerName("");
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Love Compatibility Calculator",
    "applicationCategory": "EntertainmentApplication",
    "operatingSystem": "All",
    "description": "Calculate love matching score, couple romance percentage, and relationship chemistry with instant insights.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="tool-single-page" style={{ backgroundColor: "#fff5f5", minHeight: "100vh", paddingBottom: "70px" }}>
      {/* Schema.org WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      {/* Header Section */}
      <section className="page-header-section" style={{ background: "linear-gradient(180deg, #ffe4e6 0%, #fff5f5 100%)", padding: "50px 20px 30px" }}>
        <div className="container text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/tools" className="tool-back-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#e11d48", fontWeight: 700, fontSize: "0.88rem", marginBottom: "14px" }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Tools
          </Link>
          <div className="sub-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#ffffff", color: "#e11d48", border: "1px solid #fecdd3", padding: "5px 14px", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "12px" }}>
            <i className="fa-solid fa-heart"></i> Romance &amp; Relationship Test
          </div>
          <h1 className="page-title" style={{ fontSize: "2.5rem", fontWeight: 800, color: "#881337", marginBottom: "10px" }}>
            True Love Compatibility <span style={{ color: "#e11d48" }}>Calculator</span>
          </h1>
          <p className="page-subtitle" style={{ fontSize: "1rem", color: "#64748b", margin: "0 auto", lineHeight: 1.6 }}>
            Enter your name and your partner&apos;s or crush&apos;s name to test your romance chemistry score, emotional connection, and love match percentage.
          </p>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="section-padding" style={{ paddingTop: "15px" }}>
        <div className="container" style={{ maxWidth: "920px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 1fr" : "1fr", gap: "28px", alignItems: "start" }}>
            
            {/* INPUT FORM CARD */}
            <div style={{ background: "#ffffff", border: "1px solid #fecdd3", borderRadius: "16px", padding: "28px", boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.08)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#881337", margin: "0 0 20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-wand-magic-sparkles" style={{ color: "#e11d48" }}></i> Enter Couple Details
              </h2>

              <form onSubmit={calculateLove}>
                {/* Names Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
                  <div className="form-group">
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                      Your Name <span style={{ color: "#e11d48" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e2e8f0", fontSize: "0.95rem", color: "#0f172a", outline: "none" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
                      Partner / Crush Name <span style={{ color: "#e11d48" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Taylor"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e2e8f0", fontSize: "0.95rem", color: "#0f172a", outline: "none" }}
                    />
                  </div>
                </div>

                {/* Zodiac Signs (Optional) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
                  <div className="form-group">
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#64748b", marginBottom: "6px" }}>
                      Your Zodiac (Optional)
                    </label>
                    <select
                      value={yourZodiac}
                      onChange={(e) => setYourZodiac(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e2e8f0", fontSize: "0.88rem", color: "#334155", background: "#f8fafc" }}
                    >
                      <option value="">Select Zodiac</option>
                      {ZODIAC_SIGNS.map((z) => (
                        <option key={z} value={z}>{z}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#64748b", marginBottom: "6px" }}>
                      Partner Zodiac (Optional)
                    </label>
                    <select
                      value={partnerZodiac}
                      onChange={(e) => setPartnerZodiac(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e2e8f0", fontSize: "0.88rem", color: "#334155", background: "#f8fafc" }}
                    >
                      <option value="">Select Zodiac</option>
                      {ZODIAC_SIGNS.map((z) => (
                        <option key={z} value={z}>{z}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Relationship Stage */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginBottom: "8px" }}>
                    Relationship Status
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {RELATIONSHIP_STAGES.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setRelationshipStage(st.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: relationshipStage === st.id ? "2px solid #e11d48" : "1px solid #e2e8f0",
                          background: relationshipStage === st.id ? "#fff1f2" : "#ffffff",
                          color: relationshipStage === st.id ? "#be123c" : "#475569",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                      >
                        <i className={`fa-solid ${st.icon}`} style={{ color: relationshipStage === st.id ? "#e11d48" : "#94a3b8" }}></i>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={calculating || !yourName.trim() || !partnerName.trim()}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: 800,
                    cursor: calculating ? "wait" : "pointer",
                    boxShadow: "0 4px 14px rgba(225, 29, 72, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    transition: "all 0.2s ease"
                  }}
                >
                  {calculating ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Matching Heartbeats...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-heart"></i>
                      <span>Calculate True Love Score &rarr;</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RESULTS CARD */}
            {result && (
              <div style={{ background: "#ffffff", border: "2px solid #fecdd3", borderRadius: "16px", padding: "28px", boxShadow: "0 14px 30px -5px rgba(225, 29, 72, 0.12)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", background: "rgba(225, 29, 72, 0.06)", borderRadius: "50%", pointerEvents: "none" }}></div>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#e11d48", background: "#ffe4e6", padding: "4px 12px", borderRadius: "9999px", display: "inline-block", marginBottom: "8px" }}>
                    Compatibility Result
                  </span>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#881337", margin: "0 0 4px" }}>
                    {yourName} &amp; {partnerName}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                    {result.statusTitle}
                  </p>
                </div>

                {/* Big Animated Score Badge */}
                <div style={{ textAlign: "center", margin: "20px 0 24px" }}>
                  <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)", border: "4px solid #f43f5e", display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(244, 63, 94, 0.25)" }}>
                    <span style={{ fontSize: "2.3rem", fontWeight: 900, color: "#be123c", lineHeight: 1 }}>
                      {result.score}%
                    </span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Match Score
                    </span>
                  </div>
                </div>

                {/* Description Paragraph */}
                <div style={{ background: "#fff1f2", borderLeft: "4px solid #e11d48", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px" }}>
                  <p style={{ fontSize: "0.88rem", color: "#4c0519", lineHeight: 1.55, margin: 0 }}>
                    {result.statusDescription}
                  </p>
                </div>

                {/* Breakdown Metrics */}
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Compatibility Breakdown
                  </h4>
                  
                  {[
                    { label: "Emotional Harmony", value: result.emotional, color: "#e11d48" },
                    { label: "Trust & Loyalty", value: result.trust, color: "#059669" },
                    { label: "Chemistry & Spark", value: result.passion, color: "#ea580c" },
                    { label: "Communication Synergy", value: result.communication, color: "#2563eb" }
                  ].map((m) => (
                    <div key={m.label} style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, color: "#475569", marginBottom: "3px" }}>
                        <span>{m.label}</span>
                        <span>{m.value}%</span>
                      </div>
                      <div style={{ width: "100%", height: "7px", background: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                        <div style={{ width: `${m.value}%`, height: "100%", background: m.color, borderRadius: "9999px", transition: "width 0.8s ease" }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Relationship Advice */}
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "12px 14px", borderRadius: "8px", marginBottom: "20px" }}>
                  <strong style={{ fontSize: "0.82rem", color: "#0f172a", display: "block", marginBottom: "4px" }}>
                    💡 Relationship Tip for You Two:
                  </strong>
                  <p style={{ fontSize: "0.84rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                    {result.advice}
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    style={{ flex: 1, padding: "10px 14px", background: "#ffffff", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, color: copied ? "#059669" : "#475569", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`}></i>
                    <span>{copied ? "Copied!" : "Share Result"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{ padding: "10px 14px", background: "#f1f5f9", border: "none", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, color: "#475569", cursor: "pointer" }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* EDUCATIONAL FAQ SECTION */}
          <div style={{ marginTop: "60px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "36px 30px" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-circle-question" style={{ color: "#e11d48" }}></i> Frequently Asked Questions About Love Calculators
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                  How does the Love Compatibility Calculator work?
                </h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Our love calculator uses a character frequency and numerical harmony algorithm that processes names, relationship stage dynamics, and compatibility metrics to output a balanced, positive romance score.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                  Is this love calculator confidential?
                </h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Yes! All calculations are processed locally in your browser. We never store or transmit the names or scores you test.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                  Can love calculators predict real relationship success?
                </h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  While love calculators provide fun, romantic, and encouraging insights, real love is nurtured through mutual respect, open communication, shared values, and quality time.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                  Can I test friends or celebrity crushes?
                </h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Absolutely! You can test crush names, favorite fictional couples, or celebrity pairs to see their fun compatibility score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
