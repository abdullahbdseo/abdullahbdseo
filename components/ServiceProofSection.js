"use client";

import Link from "next/link";

export default function ServiceProofSection({
  title = "Real Search Performance & Ranking Proof",
  subtitle = "Verifiable Google Search Console growth metrics and keyword ranking improvements achieved for local and global clients.",
}) {
  const proofCases = [
    {
      clientType: "E-Commerce Fashion Store",
      market: "USA & Global",
      duration: "4 Months Retainer",
      badgeColor: "#059669",
      badgeBg: "#ecfdf5",
      metrics: [
        { label: "Organic Revenue", value: "+380%", trend: "up" },
        { label: "Monthly Clicks", value: "142,500", trend: "up" },
        { label: "Top 3 Keywords", value: "94 Terms", trend: "up" },
        { label: "Avg. Position", value: "4.2 (From 28.5)", trend: "up" },
      ],
      description:
        "Engineered category topic clusters, structured Product JSON-LD schema, and solved duplicate faceted crawl budget waste.",
      framework: "Ecommerce SEO & Schema Engine",
    },
    {
      clientType: "B2B SaaS & Tech Platform",
      market: "North America & UK",
      duration: "6 Months Retainer",
      badgeColor: "#2563eb",
      badgeBg: "#eff6ff",
      metrics: [
        { label: "Organic Impressions", value: "+850,000", trend: "up" },
        { label: "Qualified Leads", value: "+240%", trend: "up" },
        { label: "Core Web Vitals", value: "100/100", trend: "up" },
        { label: "AI Overviews Cited", value: "48 Queries", trend: "up" },
      ],
      description:
        "Full technical restructuring, sub-second INP/LCP speed optimization, and semantic search authority clustering.",
      framework: "Technical SEO & AEO Blueprint",
    },
    {
      clientType: "Multi-Location Healthcare Provider",
      market: "Bangladesh (Dhaka & CTG)",
      duration: "90 Days Sprint",
      badgeColor: "#7c3aed",
      badgeBg: "#f5f3ff",
      metrics: [
        { label: "Google 3-Pack Rank", value: "#1 Spot", trend: "up" },
        { label: "Phone Inquiries", value: "+320%", trend: "up" },
        { label: "Map Impressions", value: "45,000/mo", trend: "up" },
        { label: "Direct Directions", value: "1,250/mo", trend: "up" },
      ],
      description:
        "Google Business Profile optimization, local citation cleanup, geo-targeted landing page siloing, and review velocity.",
      framework: "Google Maps 3-Pack Dominance",
    },
  ];

  return (
    <section
      className="service-proof-section"
      style={{
        padding: "64px 0",
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 44px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              border: "1px solid #dbeafe",
              padding: "5px 14px",
              borderRadius: "4px",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#0062d2",
              marginBottom: "12px",
            }}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Measurable Client Outcomes</span>
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 12px", lineHeight: 1.25 }}>
            {title}
          </h2>
          <p style={{ fontSize: "1rem", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>

        {/* Proof Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {proofCases.map((cs, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "24px",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div>
                {/* Top Badge & Duration */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span
                    style={{
                      background: cs.badgeBg,
                      color: cs.badgeColor,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: `1px solid ${cs.badgeColor}33`,
                    }}
                  >
                    {cs.clientType}
                  </span>
                  <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>
                    <i className="fa-regular fa-clock" style={{ marginRight: "4px" }}></i>
                    {cs.duration}
                  </span>
                </div>

                <div style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600, marginBottom: "14px" }}>
                  <i className="fa-solid fa-location-dot" style={{ color: "#2563eb", marginRight: "6px" }}></i>
                  Market: <strong>{cs.market}</strong>
                </div>

                {/* Metrics 2x2 Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    padding: "14px",
                    marginBottom: "16px",
                  }}
                >
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                        {m.label}
                      </span>
                      <strong style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                        {m.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Brief Summary */}
                <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, margin: "0 0 16px" }}>
                  {cs.description}
                </p>
              </div>

              {/* Bottom Framework Tag */}
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0062d2" }}>
                  <i className="fa-solid fa-check-double" style={{ marginRight: "5px" }}></i>
                  {cs.framework}
                </span>
                <Link
                  href="/contact"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Get Strategy <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Bar */}
        <div
          style={{
            marginTop: "36px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                background: "#dcfce7",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>
                100% White-Hat, Sustainable ROI Growth
              </strong>
              <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                Every strategy is strictly tailored to Google Search Essentials and safe for long-term algorithmic updates.
              </span>
            </div>
          </div>
          <Link href="/contact" className="btn btn-sm" style={{ background: "#0062d2", color: "#ffffff", fontWeight: 700, borderRadius: "4px", padding: "10px 20px" }}>
            Request Your SEO Audit Proposal <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
