import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Privacy Policy | ${siteSettings.site_name}`,
  description: `Privacy Policy and data protection terms for ${siteSettings.site_name}.`
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <section className="page-header-section">
        <div className="container text-center">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: January 2025</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl legal-content">
          <h2>1. Introduction</h2>
          <p>
            {siteSettings.site_name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our search engine optimization (SEO) consulting and marketing services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Request a free website SEO audit or quote.</li>
            <li>Submit an order for an SEO deliverable or monthly retainer.</li>
            <li>Fill out our contact or inquiry forms.</li>
            <li>Use our free in-house SEO tools suite.</li>
          </ul>
          <p>This information may include your name, email address, phone number, website URL, and project requirements.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide, operate, and maintain our SEO services and deliverables.</li>
            <li>To communicate with you regarding your project, invoices, or audit reports.</li>
            <li>To diagnose website crawlability and technical performance on requested URLs.</li>
            <li>To process secure cryptocurrency and local payment transactions.</li>
          </ul>

          <h2>4. Data Confidentiality & Non-Disclosure</h2>
          <p>
            We respect client confidentiality. Any Google Search Console data, Google Analytics credentials, or internal site structures shared during an engagement are treated with strict confidentiality and never shared with third parties.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <strong>{siteSettings.contact_email}</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
