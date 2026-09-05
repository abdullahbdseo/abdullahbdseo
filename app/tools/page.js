import Link from "next/link";
import { freeTools, siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free SEO & Growth Tools Suite | ${siteSettings.site_name}`,
  description: `Access 10 free in-house utilities for technical SEO auditing, schema markup generation, SERP preview, HTTP headers, and ROI calculation.`
};

export default function ToolsHubPage() {
  const seoTools = freeTools.filter(t => t.category === "SEO & Technical");
  const roiTools = freeTools.filter(t => t.category === "Calculators & ROI");

  return (
    <div className="tools-hub-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Free Developer & Marketer Utilities</div>
          <h1 className="page-title">In-House SEO & ROI Tools Suite</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            100% free web utilities built to audit technical elements, generate structured data, simulate search snippets, and calculate marketing returns.
          </p>
        </div>
      </section>

      {/* TOOLS CATEGORIES */}
      <section className="section-padding">
        <div className="container">
          {/* SEO & TECHNICAL TOOLS */}
          <div className="tools-group mb-16">
            <div className="group-header mb-8">
              <h2 className="group-title"><i className="fa-solid fa-code text-primary"></i> SEO & Technical Utilities</h2>
              <p className="group-desc text-muted">Diagnose on-page issues, generate code snippets, and validate server response codes.</p>
            </div>

            <div className="tools-full-grid">
              {seoTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-feature-card">
                  <div className="tool-card-top">
                    <div className="tool-icon-box" style={{ color: tool.color, backgroundColor: tool.bg }}>
                      <i className={tool.icon}></i>
                    </div>
                    <span className="tool-status-badge">Free & Instant</span>
                  </div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-desc">{tool.desc}</p>
                  <div className="tool-link-action">
                    Launch Tool <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CALCULATORS & ROI TOOLS */}
          <div className="tools-group">
            <div className="group-header mb-8">
              <h2 className="group-title"><i className="fa-solid fa-calculator text-success"></i> ROI & Budget Calculators</h2>
              <p className="group-desc text-muted">Estimate campaign returns, website build costs, and AI automation savings.</p>
            </div>

            <div className="tools-full-grid">
              {roiTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-feature-card">
                  <div className="tool-card-top">
                    <div className="tool-icon-box" style={{ color: tool.color, backgroundColor: tool.bg }}>
                      <i className={tool.icon}></i>
                    </div>
                    <span className="tool-status-badge">Free Simulator</span>
                  </div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-desc">{tool.desc}</p>
                  <div className="tool-link-action">
                    Launch Tool <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
