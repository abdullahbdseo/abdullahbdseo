import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Website SEO Analyzer & Page Health Checker | ${siteSettings.site_name}`,
  description: `Scan any webpage for title tags, meta descriptions, heading structure, images without ALT tags, canonical issues, and mobile responsiveness.`,
  alternates: {
    canonical: "/tools/website-seo-analyzer",
  },
  openGraph: {
    title: `Website SEO Analyzer | ${siteSettings.site_name}`,
    description: `Comprehensive on-page SEO scanner and technical health analyzer.`,
    url: "/tools/website-seo-analyzer",
    type: "website",
  },
};

export default function WebsiteSeoAnalyzerLayout({ children }) {
  return children;
}
