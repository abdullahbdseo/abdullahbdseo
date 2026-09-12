import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free SEO Audit Report Generator (PDF Ready) | ${siteSettings.site_name}`,
  description: `Generate professional, client-ready, downloadable SEO audit reports with actionable technical fixes, prioritized recommendations, and score breakdowns.`,
  alternates: {
    canonical: "/tools/seo-audit-report-generator",
  },
  openGraph: {
    title: `SEO Audit Report Generator | ${siteSettings.site_name}`,
    description: `Generate printable, executive-ready SEO audit reports for any website.`,
    url: "/tools/seo-audit-report-generator",
    type: "website",
  },
};

export default function SeoAuditReportGeneratorLayout({ children }) {
  return children;
}
