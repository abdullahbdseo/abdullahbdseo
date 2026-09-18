import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Deep SEO Audit Tool — 70+ Real Checks & 12-Sheet Report | ${siteSettings.site_name}`,
  description: `Forensic 70+ checkpoint SEO audit: On-Page, Technical, Performance, Security Headers, Social/OG Tags, Accessibility, robots.txt, sitemap.xml, CMS detection, and prioritized action roadmap with instant Excel export.`,
  alternates: {
    canonical: "/tools/deep-seo-audit",
  },
  openGraph: {
    title: `Free Deep SEO Audit Tool | ${siteSettings.site_name}`,
    description: `Instant forensic technical audit for your website.`,
    url: "/tools/deep-seo-audit",
    type: "website",
  },
};

export default function DeepSeoAuditLayout({ children }) {
  return children;
}
