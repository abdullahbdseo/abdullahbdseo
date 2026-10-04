import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Website SEO Analyzer & Page Health Check | ${siteSettings.site_name}`,
  description: `Scan any webpage for title tags, meta descriptions, heading structure, images without ALT tags, canonical issues, and mobile responsiveness.`,
  alternates: {
    canonical: "/tools/website-seo-analyzer",
  },
  openGraph: {
    title: `Website SEO Analyzer & Page Health Check | ${siteSettings.site_name}`,
    description: `Scan any webpage for title tags, meta descriptions, heading structure, images without ALT tags, canonical issues, and mobile responsiveness.`,
    url: "/tools/website-seo-analyzer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website SEO Analyzer & Page Health Check | ${siteSettings.site_name}`,
    description: `Scan any webpage for title tags, meta descriptions, heading structure, images without ALT tags, canonical issues, and mobile responsiveness.`,
  },
};
export default function WebsiteSeoAnalyzerLayout({ children }) {
  return children;
}
