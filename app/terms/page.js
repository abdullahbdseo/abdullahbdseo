import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Terms of Service | ${siteSettings.site_name}`,
  description: `Terms and conditions governing consulting engagements and deliverables by ${siteSettings.site_name}.`
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <section className="page-header-section">
        <div className="container text-center">
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">Last updated: January 2025</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl legal-content">
          <h2>1. Engagement & Services</h2>
          <p>
            By purchasing an SEO package, deliverable, or retainer from {siteSettings.site_name}, you agree to these Terms of Service. All audits, strategy roadmaps, and technical specifications are provided according to the deliverable descriptions outlined on each respective service page.
          </p>

          <h2>2. Deliverables & Timelines</h2>
          <p>
            Delivery timelines commence upon receipt of all necessary onboarding requirements (such as target domain URLs, competitor lists, and access permissions where applicable). We strive to meet all estimated turnaround dates and provide proactive updates during the engagement.
          </p>

          <h2>3. Algorithmic Realities & Search Guarantees</h2>
          <p>
            While we apply 100% white-hat, industry-leading methodologies and battle-tested technical frameworks, search engine algorithms (such as Google Core updates) are owned and operated by third parties. No ethical SEO consultant can guarantee specific #1 keyword positions. We guarantee meticulous execution of all contracted deliverables, diagnostic accuracy, and industry best practices.
          </p>

          <h2>4. Invoicing & Engagement Terms</h2>
          <p>
            Consulting agreements and custom project deliverables are established directly between {siteSettings.site_name} and the client upon project onboarding. Invoices and agreements are provided directly upon custom service engagement.
          </p>

          <h2>5. Contact</h2>
          <p>
            For questions regarding these Terms, contact us directly at: <strong>{siteSettings.contact_email}</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
