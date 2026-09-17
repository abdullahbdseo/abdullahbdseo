"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { backlinkPosts } from "@/lib/backlinks-data";
import { siteSettings } from "@/lib/data";

export default function SingleBacklinkPage() {
  const params = useParams();
  const slug = params?.slug;

  const post = useMemo(() => {
    return backlinkPosts.find((p) => p.slug === slug || p.id === slug);
  }, [slug]);

  const [tableSearch, setTableSearch] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  if (!post) {
    // If not found in memory, try fallback or return notFound
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>Guide Not Found</h1>
        <p style={{ color: "#64748b", margin: "16px 0 24px" }}>The requested backlink resource guide could not be found.</p>
        <Link href="/high-da-backlinks" className="btn btn-primary" style={{ padding: "10px 24px", borderRadius: "6px" }}>
          Back to High DA Backlinks Hub
        </Link>
      </div>
    );
  }

  const filteredSites = useMemo(() => {
    return post.sites.filter(
      (s) =>
        tableSearch.trim() === "" ||
        s.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
        s.url.toLowerCase().includes(tableSearch.toLowerCase()) ||
        (s.country && s.country.toLowerCase().includes(tableSearch.toLowerCase()))
    );
  }, [post.sites, tableSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredSites.length / pageSize));
  
  // Safe current page clamp
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedSites = useMemo(() => {
    if (pageSize >= 9999) return filteredSites;
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredSites.slice(start, start + pageSize);
  }, [filteredSites, safeCurrentPage, pageSize]);

  const handleSearchChange = (e) => {
    setTableSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleCopy = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  const otherPosts = backlinkPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="blog-page" style={{ background: "#ffffff", minHeight: "100vh" }}>
      
      {/* HERO SECTION */}
      <section style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        borderBottom: "1px solid #e2e8f0",
        padding: "45px 0 35px"
      }}>
        <div className="container">
          
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#64748b", marginBottom: "20px" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/high-da-backlinks" style={{ color: "#4361ee", fontWeight: 600, textDecoration: "none" }}>High DA Backlinks</Link>
            <span>/</span>
            <span style={{ color: "#0f172a", fontWeight: 700 }}>{post.category}</span>
          </nav>

          {/* Badge & Title */}
          <div style={{ maxWidth: "900px" }}>
            <span className="blog-badge" style={{ marginBottom: "14px" }}>
              <i className={post.icon} style={{ color: "#4361ee" }}></i> {post.category} Strategy Guide
            </span>

            <h1 style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.22,
              marginBottom: "16px",
              fontFamily: "var(--font-heading)"
            }}>
              {post.title}
            </h1>

            {/* Meta bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              fontSize: "0.88rem",
              color: "#64748b",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "14px"
            }}>
              <span><i className="fa-regular fa-calendar" style={{ color: "#4361ee", marginRight: "6px" }}></i> {post.date}</span>
              <span><i className="fa-regular fa-clock" style={{ color: "#10b981", marginRight: "6px" }}></i> {post.readTime}</span>
              <span><i className="fa-solid fa-user-check" style={{ color: "#0284c7", marginRight: "6px" }}></i> Verified by {siteSettings.expert_name}</span>
              <span style={{
                background: "#eff6ff",
                color: "#1e40af",
                padding: "2px 10px",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "0.8rem",
                border: "1px solid #dbeafe"
              }}>
                {post.keyMetrics.avgDa}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN ARTICLE & SITES SECTION */}
      <section style={{ padding: "45px 0 70px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", maxWidth: "980px", margin: "0 auto" }}>
            
            {/* Visual Header Banner */}
            <div style={{
              height: "220px",
              background: post.gradient,
              borderRadius: "8px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#ffffff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(6px)",
                  color: "#38bdf8",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}>
                  {post.badge}
                </span>
                <i className={post.icon} style={{ fontSize: "2rem", opacity: 0.9 }}></i>
              </div>

              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0", textShadow: "0 2px 6px rgba(0,0,0,0.35)" }}>
                  {post.title.split(":")[0]}
                </h2>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.8rem", background: "rgba(255,255,255,0.22)", padding: "4px 12px", borderRadius: "4px", fontWeight: 700 }}>
                    {post.keyMetrics.sitesCount} Verified Platforms
                  </span>
                  <span style={{ fontSize: "0.8rem", background: "rgba(255,255,255,0.22)", padding: "4px 12px", borderRadius: "4px", fontWeight: 700 }}>
                    {post.keyMetrics.linkType}
                  </span>
                </div>
              </div>
            </div>

            {/* Business Highlight Box */}
            <div style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              padding: "26px 30px",
              boxShadow: "0 4px 20px -2px rgba(67, 97, 238, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px"
            }}>
              <div style={{ flex: "1 1 500px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#4361ee", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>
                  ⭐ Managed Link Building Service
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                  Need Abdullah BD SEO to Build &amp; Index These Backlinks For You?
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  Save dozens of hours of manual work. Our link building team creates 100% hand-crafted profiles, synchronizes your NAP entity signals, and accelerates indexing safely.
                </p>
              </div>

              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(67, 97, 238, 0.35)",
                  textDecoration: "none"
                }}
              >
                <span>Get Done-For-You Links</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* In-depth Article Body */}
            <div
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.8,
                color: "#334155"
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* VERIFIED SITES DIRECTORY TABLE */}
            <div style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 20px -2px rgba(67, 97, 238, 0.06)",
              overflow: "hidden",
              marginTop: "10px"
            }}>
              {/* Table Top Bar */}
              <div style={{
                padding: "20px 24px",
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px"
              }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                    Verified {post.category} Submissions Directory (2026)
                  </h3>
                  <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    Showing {filteredSites.length} of {post.sites.length} high-authority platforms
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#64748b" }}>
                    <span>Show:</span>
                    <select
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        color: "#0f172a",
                        background: "#ffffff",
                        outline: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value={25}>25 per page</option>
                      <option value={50}>50 per page</option>
                      <option value={100}>100 per page</option>
                      <option value={99999}>Show All</option>
                    </select>
                  </div>

                  <div style={{ position: "relative", minWidth: "240px" }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}></i>
                    <input
                      type="text"
                      placeholder="Search platform name or URL..."
                      value={tableSearch}
                      onChange={handleSearchChange}
                      style={{
                        width: "100%",
                        padding: "8px 14px 8px 34px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.88rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Table View */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", color: "#475569" }}>
                      <th style={{ padding: "14px 14px", fontWeight: 700, width: "60px", textAlign: "center" }}>#</th>
                      <th style={{ padding: "14px 18px", fontWeight: 700 }}>Platform / Site</th>
                      <th style={{ padding: "14px 12px", fontWeight: 700, textAlign: "center" }}>DA Score</th>
                      <th style={{ padding: "14px 12px", fontWeight: 700, textAlign: "center" }}>Link Type</th>
                      <th style={{ padding: "14px 18px", fontWeight: 700, textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSites.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: "40px 20px", textAlign: "center", color: "#64748b" }}>
                          <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "1.5rem", marginBottom: "8px", display: "block", color: "#cbd5e1" }}></i>
                          No platforms found matching "<strong>{tableSearch}</strong>".
                        </td>
                      </tr>
                    ) : (
                      paginatedSites.map((site, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "14px 14px", textAlign: "center", fontWeight: 700, color: "#64748b", fontSize: "0.85rem" }}>
                            {(safeCurrentPage - 1) * (pageSize >= 99999 ? 0 : pageSize) + idx + 1}
                          </td>
                          <td style={{ padding: "14px 18px" }}>
                            <strong style={{ color: "#0f172a", display: "block" }}>{site.name}</strong>
                            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{site.url.replace("https://", "")}</span>
                          </td>
                          <td style={{ padding: "14px 12px", textAlign: "center" }}>
                            <span style={{
                              display: "inline-block",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              background: site.da >= 90 ? "#ecfdf5" : "#eff6ff",
                              color: site.da >= 90 ? "#059669" : "#4361ee",
                              fontWeight: 800,
                              fontSize: "0.85rem"
                            }}>
                              DA {site.da}
                            </span>
                          </td>
                          <td style={{ padding: "14px 12px", textAlign: "center" }}>
                            <span style={{
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              background: site.type.includes("DoFollow") ? "#dcfce7" : "#f1f5f9",
                              color: site.type.includes("DoFollow") ? "#15803d" : "#475569"
                            }}>
                              {site.type}
                            </span>
                          </td>
                          <td style={{ padding: "14px 18px", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "6px" }}>
                              <button
                                type="button"
                                onClick={() => handleCopy(site.url)}
                                title="Copy URL"
                                style={{
                                  padding: "6px 9px",
                                  background: copiedUrl === site.url ? "#ecfdf5" : "#f1f5f9",
                                  border: "1px solid #cbd5e1",
                                  borderRadius: "4px",
                                  color: copiedUrl === site.url ? "#059669" : "#475569",
                                  cursor: "pointer",
                                  fontSize: "0.8rem"
                                }}
                              >
                                <i className={`fa-solid ${copiedUrl === site.url ? "fa-check" : "fa-copy"}`}></i>
                              </button>
                              <a
                                href={site.url}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                style={{
                                  padding: "6px 12px",
                                  background: "#eff6ff",
                                  border: "1px solid #bfdbfe",
                                  borderRadius: "4px",
                                  color: "#4361ee",
                                  textDecoration: "none",
                                  fontSize: "0.82rem",
                                  fontWeight: 700,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                              >
                                <span>Visit</span>
                                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }}></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Bar */}
              {totalPages > 1 && pageSize < 99999 && (
                <div style={{
                  padding: "16px 24px",
                  background: "#f8fafc",
                  borderTop: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Showing Page <strong>{safeCurrentPage}</strong> of <strong>{totalPages}</strong> ({filteredSites.length} items)
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      type="button"
                      disabled={safeCurrentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: safeCurrentPage <= 1 ? "#f1f5f9" : "#ffffff",
                        color: safeCurrentPage <= 1 ? "#94a3b8" : "#0f172a",
                        cursor: safeCurrentPage <= 1 ? "not-allowed" : "pointer",
                        fontSize: "0.84rem",
                        fontWeight: 600
                      }}
                    >
                      <i className="fa-solid fa-chevron-left" style={{ marginRight: "4px" }}></i> Prev
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (safeCurrentPage <= 3) {
                        pageNum = i + 1;
                      } else if (safeCurrentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = safeCurrentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "4px",
                            border: pageNum === safeCurrentPage ? "1px solid #4361ee" : "1px solid #cbd5e1",
                            background: pageNum === safeCurrentPage ? "#4361ee" : "#ffffff",
                            color: pageNum === safeCurrentPage ? "#ffffff" : "#0f172a",
                            cursor: "pointer",
                            fontSize: "0.84rem",
                            fontWeight: pageNum === safeCurrentPage ? 700 : 500
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={safeCurrentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: safeCurrentPage >= totalPages ? "#f1f5f9" : "#ffffff",
                        color: safeCurrentPage >= totalPages ? "#94a3b8" : "#0f172a",
                        cursor: safeCurrentPage >= totalPages ? "not-allowed" : "pointer",
                        fontSize: "0.84rem",
                        fontWeight: 600
                      }}
                    >
                      Next <i className="fa-solid fa-chevron-right" style={{ marginLeft: "4px" }}></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RELATED GUIDES */}
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", marginBottom: "20px" }}>
                Explore More High DA Link Building Guides
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {otherPosts.map((op) => (
                  <Link
                    key={op.id}
                    href={`/high-da-backlinks/${op.slug}`}
                    target="_blank"
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      padding: "20px",
                      textDecoration: "none",
                      color: "inherit",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      transition: "all 0.25s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#4361ee", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {op.category}
                      </span>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "6px 0 10px", lineHeight: 1.35 }}>
                        {op.title}
                      </h4>
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#4361ee", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <span>Read Guide</span>
                      <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.75rem" }}></i>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA SECTION */}
            <div style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #4361ee 100%)",
              borderRadius: "8px",
              padding: "40px",
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              boxShadow: "0 20px 40px rgba(67, 97, 238, 0.25)"
            }}>
              <div style={{ maxWidth: "600px" }}>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#ffffff", marginBottom: "10px", lineHeight: 1.3 }}>
                  Scale Your Organic Keyword Rankings With Premium Links
                </h3>
                <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6, margin: 0 }}>
                  Get custom-curated editorial outreach, local citations, and entity brand links managed by {siteSettings.expert_name}.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  style={{
                    padding: "12px 26px",
                    background: "#ffffff",
                    color: "#1e40af",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    borderRadius: "4px",
                    textDecoration: "none",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>Contact Abdullah BD SEO</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
