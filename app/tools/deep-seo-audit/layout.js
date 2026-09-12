import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Deep SEO Audit Tool | Instant Forensic Technical Audit | ${siteSettings.site_name}`,
  description: `Analyze your website's on-page SEO, technical health, Core Web Vitals, metadata, and indexability in real-time with our free deep SEO audit tool.`,
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
