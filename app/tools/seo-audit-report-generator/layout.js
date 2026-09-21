import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Audit Report Generator (Download PDF) | ${siteSettings.site_name}`,
  description: `Generate professional, client-ready, downloadable SEO audit reports with actionable technical fixes, prioritized recommendations, and score breakdowns.`,
  alternates: {
    canonical: "/tools/seo-audit-report-generator",
  },
  openGraph: {
    title: `SEO Audit Report Generator (Download PDF) | ${siteSettings.site_name}`,
    description: `Generate professional, client-ready, downloadable SEO audit reports with actionable technical fixes, prioritized recommendations, and score breakdowns.`,
    url: "/tools/seo-audit-report-generator",
    type: "website",
  },
};

export default function SeoAuditReportGeneratorLayout({ children }) {
  return children;
}
