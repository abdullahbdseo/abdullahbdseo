import Image from "next/image";
import Link from "next/link";
import { caseStudies, siteSettings } from "@/lib/data";

export const metadata = {
  title: `Case Studies & Verified Proof | ${siteSettings.site_name}`,
  description: `Real-world Google Search Console data, ranking lifts, and organic revenue scaling case studies.`
};

export default function PortfolioPage() {
  return (
    <div className="portfolio-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Proven Track Record</div>
          <h1 className="page-title">SEO Case Studies & GSC Ranking Proof</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Explore unedited Google Search Console analytics, traffic graphs, and revenue growth metrics achieved across diverse competitive verticals.
          </p>
        </div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="section-padding">
        <div className="container">
          <div className="portfolio-grid-detailed">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="case-study-showcase-card">
                <div className="cs-visual-col">
                  <div className="cs-image-frame">
                    <Image 
                      src={cs.gsc_screenshot || cs.featured_image} 
                      alt={cs.title} 
                      width={640} 
                      height={380} 
                      className="cs-proof-image"
                    />
                    <div className="cs-industry-badge">{cs.industry}</div>
                  </div>
                </div>

                <div className="cs-info-col">
                  <div className="cs-duration-tag">
                    <i className="fa-regular fa-calendar-check text-primary"></i> Campaign Duration: {cs.duration}
                  </div>
                  
                  <h2 className="cs-showcase-title">{cs.title}</h2>
                  <p className="cs-summary-text">{cs.summary}</p>

                  <div className="cs-metrics-banner">
                    <div className="cs-metric-cell">
                      <div className="metric-digit">{cs.traffic_growth}</div>
                      <div className="metric-caption">Organic Traffic Lift</div>
                    </div>
                    <div className="cs-metric-cell">
                      <div className="metric-digit">{cs.keyword_growth}</div>
                      <div className="metric-caption">Top 3 Rankings</div>
                    </div>
                    <div className="cs-metric-cell">
                      <div className="metric-digit">{cs.revenue_impact}</div>
                      <div className="metric-caption">Revenue Growth</div>
                    </div>
                  </div>

                  <div className="cs-card-actions">
                    <Link href={`/portfolio/${cs.slug}`} className="btn btn-primary">
                      Read Full Deep-Dive & Strategy <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="proof-banner-cta mt-16">
            <div className="proof-cta-content text-center">
              <h3>Want Similar Results For Your Business?</h3>
              <p>Let&apos;s run a free diagnostic audit on your domain to find your largest search traffic gaps.</p>
              <Link href="/contact" className="btn btn-light btn-lg mt-4">
                Schedule A Strategy Session <i className="fa-solid fa-calendar-days"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
