import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const cs = caseStudies.find((c) => c.slug === unwrappedParams.slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.title} | SEO Case Study`,
    description: cs.summary
  };
}

export default async function SinglePortfolioPage({ params }) {
  const unwrappedParams = await params;
  const cs = caseStudies.find((c) => c.slug === unwrappedParams.slug);

  if (!cs) {
    notFound();
  }

  return (
    <div className="single-portfolio-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">{cs.industry} Case Study</div>
          <h1 className="page-title">{cs.title}</h1>
          <p className="page-subtitle max-w-3xl mx-auto">{cs.summary}</p>
          
          <div className="cs-hero-stats-row mt-8">
            <div className="hero-stat-card">
              <span className="hero-stat-val text-primary">{cs.traffic_growth}</span>
              <span className="hero-stat-lbl">Organic Traffic Lift</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val text-success">{cs.keyword_growth}</span>
              <span className="hero-stat-lbl">Top 3 Rankings</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val text-accent">{cs.revenue_impact}</span>
              <span className="hero-stat-lbl">Revenue Growth</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val text-warning">{cs.duration}</span>
              <span className="hero-stat-lbl">Timeline</span>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CASE STUDY BODY */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          {/* GSC SCREENSHOT PROOF */}
          <div className="gsc-proof-container mb-12">
            <h3 className="proof-heading"><i className="fa-brands fa-google text-primary"></i> Verified Google Search Console Performance Data</h3>
            <div className="gsc-proof-box">
              <Image 
                src={cs.gsc_screenshot || cs.featured_image} 
                alt={`${cs.title} Google Search Console Data`} 
                width={900} 
                height={500} 
                className="gsc-proof-image"
                priority
              />
            </div>
          </div>

          <div className="cs-narrative-card">
            <h2 className="narrative-section-title"><i className="fa-solid fa-triangle-exclamation text-danger"></i> The Initial Challenge</h2>
            <div className="narrative-text" dangerouslySetInnerHTML={{ __html: cs.challenge }} />
          </div>

          <div className="cs-narrative-card mt-8">
            <h2 className="narrative-section-title"><i className="fa-solid fa-chess-knight text-primary"></i> The Strategic SEO Framework</h2>
            <div className="narrative-text" dangerouslySetInnerHTML={{ __html: cs.strategy }} />
          </div>

          <div className="cs-narrative-card mt-8">
            <h2 className="narrative-section-title"><i className="fa-solid fa-chart-line text-success"></i> Key Outcomes & Results</h2>
            <div className="narrative-text" dangerouslySetInnerHTML={{ __html: cs.results }} />
          </div>

          {cs.testimonials_quote && (
            <div className="cs-testimonial-highlight mt-8">
              <i className="fa-solid fa-quote-left quote-icon"></i>
              <p className="highlight-quote">&ldquo;{cs.testimonials_quote}&rdquo;</p>
              <div className="highlight-author">— {cs.client_author || cs.client_name}</div>
            </div>
          )}

          <div className="cs-back-nav mt-12 text-center">
            <Link href="/portfolio" className="btn btn-outline mr-4">
              <i className="fa-solid fa-arrow-left"></i> All Case Studies
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Book Your Growth Strategy Call <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
