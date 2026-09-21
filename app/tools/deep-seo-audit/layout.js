import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Deep SEO Audit Tool (70+ Checks) | ${siteSettings.site_name}`,
  description: `Free 70+ point deep SEO audit: On-Page, Technical, Speed, Security, Schemas & Excel export. Inspect site health and get actionable fixes instantly.`,
  alternates: {
    canonical: "/tools/deep-seo-audit",
  },
  openGraph: {
    title: `Free Deep SEO Audit Tool (70+ Checks) | ${siteSettings.site_name}`,
    description: `Free 70+ point deep SEO audit: On-Page, Technical, Speed, Security, Schemas & Excel export. Inspect site health and get actionable fixes instantly.`,
    url: "/tools/deep-seo-audit",
    type: "website",
  },
};

export default function DeepSeoAuditLayout({ children }) {
  return children;
}
