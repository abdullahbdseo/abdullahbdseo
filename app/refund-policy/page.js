import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Refund Policy | ${siteSettings.site_name}`,
  description: `Refund and cancellation terms for SEO deliverables and consulting services.`
};

export default function RefundPolicyPage() {
  return (
    <div className="legal-page">
      <section className="page-header-section">
        <div className="container text-center">
          <h1 className="page-title">Refund & Cancellation Policy</h1>
          <p className="page-subtitle">Last updated: January 2025</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl legal-content">
          <h2>1. Custom Professional Consulting Deliverables</h2>
          <p>
            Because SEO audits, keyword research sheets, and strategic roadmaps involve extensive manual technical analysis, engineering time, and custom research tailored specifically to your domain, once work has commenced on a deliverable, payments are generally non-refundable.
          </p>

          <h2>2. Cancellations Before Work Commences</h2>
          <p>
            If you submit an order and wish to cancel before our team has begun data collection and crawling (within 12 hours of order placement), you may request a full refund by contacting us immediately.
          </p>

          <h2>3. Monthly Retainer Cancellations</h2>
          <p>
            Monthly SEO retainers operate on a month-to-month basis with no long-term lock-in contracts. You may cancel your monthly retainer at any time with 7 days&apos; notice before your next billing cycle begins.
          </p>

          <h2>4. Deliverable Satisfaction & Revisions</h2>
          <p>
            Every package includes designated revision rounds. If you believe any deliverable checkpoint was missed according to the scope of work, we will promptly revise and clarify the documentation at no additional cost.
          </p>

          <h2>5. Inquiries</h2>
          <p>
            For billing inquiries or questions, reach out to: <strong>{siteSettings.contact_email}</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
