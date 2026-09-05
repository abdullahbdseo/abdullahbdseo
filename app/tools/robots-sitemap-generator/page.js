"use client";

import { useState } from "react";
import Link from "next/link";

export default function RobotsSitemapGenerator() {
  const [activeTab, setActiveTab] = useState("robots");
  const [copied, setCopied] = useState(false);

  // Robots states
  const [defaultAccess, setDefaultAccess] = useState("allow");
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/wp-admin/\n/cart/\n/checkout/");
  const [crawlDelay, setCrawlDelay] = useState("0");

  // Sitemap states
  const [domain, setDomain] = useState("https://example.com");
  const [urls, setUrls] = useState("/\n/about\n/services\n/portfolio\n/contact");
  const [changeFreq, setChangeFreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");

  // Generate Robots.txt
  const generateRobotsTxt = () => {
    let output = "User-agent: *\n";
    if (defaultAccess === "disallow") {
      output += "Disallow: /\n";
    } else {
      const paths = disallowPaths.split("\n").map(p => p.trim()).filter(Boolean);
      paths.forEach(p => {
        output += `Disallow: ${p}\n`;
      });
    }

    if (parseInt(crawlDelay, 10) > 0) {
      output += `Crawl-delay: ${crawlDelay}\n`;
    }

    if (sitemapUrl.trim()) {
      output += `\nSitemap: ${sitemapUrl.trim()}\n`;
    }

    return output;
  };

  // Generate XML Sitemap
  const generateXmlSitemap = () => {
    const cleanDomain = domain.replace(/\/+$/, '');
    const pathList = urls.split("\n").map(u => u.trim()).filter(Boolean);
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    pathList.forEach(p => {
      const fullUrl = p.startsWith("http") ? p : `${cleanDomain}/${p.replace(/^\/+/, '')}`;
      xml += `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changeFreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  };

  const currentCode = activeTab === "robots" ? generateRobotsTxt() : generateXmlSitemap();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: "text/plain" });
    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = activeTab === "robots" ? "robots.txt" : "sitemap.xml";
    a.click();
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Crawler Directives</div>
          <h1 className="page-title">Robots.txt & XML Sitemap Generator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Build syntax-valid robots.txt crawler rules and Google XML sitemaps ready for immediate deployment.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="schema-type-tabs mb-8 text-center">
            <button 
              className={`schema-tab-btn ${activeTab === "robots" ? "active" : ""}`}
              onClick={() => setActiveTab("robots")}
            >
              <i className="fa-solid fa-robot"></i> Robots.txt Generator
            </button>
            <button 
              className={`schema-tab-btn ${activeTab === "sitemap" ? "active" : ""}`}
              onClick={() => setActiveTab("sitemap")}
            >
              <i className="fa-solid fa-sitemap"></i> XML Sitemap Generator
            </button>
          </div>

          <div className="schema-generator-grid">
            {/* CONFIG FORM */}
            <div className="schema-form-box">
              <h3 className="form-box-title">
                {activeTab === "robots" ? "Robots.txt Directives" : "XML Sitemap URLs & Settings"}
              </h3>

              {activeTab === "robots" ? (
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Default Search Engine Access</label>
                    <select 
                      value={defaultAccess} 
                      onChange={(e) => setDefaultAccess(e.target.value)} 
                      className="form-select"
                    >
                      <option value="allow">Allow all bots (Default)</option>
                      <option value="disallow">Disallow everything (Staging / Private)</option>
                    </select>
                  </div>

                  {defaultAccess === "allow" && (
                    <div className="form-group">
                      <label className="form-label">Disallowed Directories (1 per line)</label>
                      <textarea 
                        rows={4} 
                        value={disallowPaths} 
                        onChange={(e) => setDisallowPaths(e.target.value)} 
                        className="form-textarea"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">XML Sitemap Full URL</label>
                    <input 
                      type="url" 
                      value={sitemapUrl} 
                      onChange={(e) => setSitemapUrl(e.target.value)} 
                      className="form-input" 
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Website Domain Root</label>
                    <input 
                      type="url" 
                      value={domain} 
                      onChange={(e) => setDomain(e.target.value)} 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Page Paths / URLs (1 per line)</label>
                    <textarea 
                      rows={5} 
                      value={urls} 
                      onChange={(e) => setUrls(e.target.value)} 
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Change Frequency</label>
                      <select value={changeFreq} onChange={(e) => setChangeFreq(e.target.value)} className="form-select">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Priority</label>
                      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-select">
                        <option value="1.0">1.0 (Highest)</option>
                        <option value="0.8">0.8 (Standard High)</option>
                        <option value="0.5">0.5 (Normal)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* LIVE CODE PREVIEW */}
            <div className="schema-output-box">
              <div className="code-header">
                <span className="code-title">
                  <i className="fa-solid fa-file-code"></i> {activeTab === "robots" ? "robots.txt" : "sitemap.xml"} Output
                </span>
                <div className="code-actions flex gap-2">
                  <button className="btn btn-outline btn-sm" onClick={handleDownload}>
                    <i className="fa-solid fa-download"></i> Download
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handleCopy}>
                    {copied ? <><i className="fa-solid fa-check"></i> Copied!</> : <><i className="fa-solid fa-copy"></i> Copy</>}
                  </button>
                </div>
              </div>

              <pre className="code-block">
                <code>{currentCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
