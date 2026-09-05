import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `About ${siteSettings.expert_name} | SEO Specialist & Strategist`,
  description: `Learn more about ${siteSettings.expert_name}, a veteran SEO Specialist and growth consultant with 10+ years of technical search experience.`
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Strategic & Technical Background</div>
          <h1 className="page-title">Meet {siteSettings.expert_name}</h1>
          <p className="page-subtitle">
            Senior SEO Consultant & Organic Growth Architect helping brands achieve dominant search rankings and compounding revenue.
          </p>
        </div>
      </section>

      {/* BIO SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-col">
              <div className="about-image-card">
                <Image 
                  src={siteSettings.profile_photo} 
                  alt={siteSettings.expert_name} 
                  width={500} 
                  height={550} 
                  className="about-profile-img"
                  priority
                />
                <div className="about-badge">
                  <span className="badge-years">10+</span>
                  <span className="badge-text">Years of Proven Search Consulting</span>
                </div>
              </div>

              <div className="about-sidebar-card mt-6">
                <h4 className="sidebar-card-title"><i className="fa-solid fa-address-card text-primary"></i> Direct Connect</h4>
                <ul className="sidebar-contact-list">
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <a href={`mailto:${siteSettings.contact_email}`}>{siteSettings.contact_email}</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    <a href={`tel:${siteSettings.contact_phone}`}>{siteSettings.contact_phone}</a>
                  </li>
                  <li>
                    <i className="fa-brands fa-whatsapp"></i>
                    <a href={`https://wa.me/${siteSettings.whatsapp_number}`} target="_blank" rel="noopener noreferrer">WhatsApp Direct</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{siteSettings.office_address}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="about-content-col">
              <h2 className="section-title">Turning Search Algorithms Into Your Biggest Competitive Advantage</h2>
              
              <p className="lead-text">
                For the past decade, I have dedicated myself to understanding the mathematical, architectural, and behavioral mechanics of Google search algorithms.
              </p>

              <p className="text-muted mb-4">
                Unlike generic marketing agencies that rely on outsourced templated audits or vanity metrics, my methodology is built on <strong>forensic technical audits</strong>, <strong>semantic entity clustering</strong>, and <strong>sustainable high-authority digital PR</strong>.
              </p>

              <div className="values-grid my-8">
                <div className="value-card">
                  <div className="value-icon"><i className="fa-solid fa-microscope text-primary"></i></div>
                  <h4 className="value-title">Data-Driven Precision</h4>
                  <p className="value-desc">Every recommendation is backed by log file analysis, crawl data, and real search intent metrics.</p>
                </div>

                <div className="value-card">
                  <div className="value-icon"><i className="fa-solid fa-shield-halved text-success"></i></div>
                  <h4 className="value-title">100% White-Hat Safety</h4>
                  <p className="value-desc">Zero risky shortcuts. Strategies built to survive and thrive during core algorithm updates.</p>
                </div>

                <div className="value-card">
                  <div className="value-icon"><i className="fa-solid fa-chart-line text-warning"></i></div>
                  <h4 className="value-title">Revenue Focus</h4>
                  <p className="value-desc">Search traffic is meaningless without conversion. We target high-intent commercial keywords.</p>
                </div>

                <div className="value-card">
                  <div className="value-icon"><i className="fa-solid fa-code text-info"></i></div>
                  <h4 className="value-title">Developer-Ready Specs</h4>
                  <p className="value-desc">Deliverables with clear code snippets and instructions your engineering team can immediately ship.</p>
                </div>
              </div>

              <h3 className="subheading mb-4">Core Competencies & Stack</h3>
              <div className="skills-tags-wrap mb-8">
                <span className="skill-tag">Technical SEO Auditing</span>
                <span className="skill-tag">Log File Analysis</span>
                <span className="skill-tag">Next.js & React SEO</span>
                <span className="skill-tag">E-Commerce Architecture</span>
                <span className="skill-tag">Core Web Vitals & CWV Optimization</span>
                <span className="skill-tag">Schema & JSON-LD Entity Graph</span>
                <span className="skill-tag">International Multi-Lingual hreflang</span>
                <span className="skill-tag">Screaming Frog & Sitebulb</span>
                <span className="skill-tag">Google Search Console API</span>
                <span className="skill-tag">Ahrefs & Semrush Advanced Clustering</span>
              </div>

              <div className="cta-box-inline">
                <div className="cta-inline-text">
                  <h4>Want to discuss your website&apos;s growth bottlenecks?</h4>
                  <p>Book a strategic consultation or request a custom diagnostic audit.</p>
                </div>
                <Link href="/contact" className="btn btn-primary">
                  Get in Touch <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
