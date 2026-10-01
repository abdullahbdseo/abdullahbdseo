import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free SEO & Growth Marketing Tools Suite (25+ Tools) | ${siteSettings.site_name}`,
  description: `Access 25 free in-house utilities for deep SEO auditing, Open Graph previews, keyword clustering, canonical & hreflang generation, schema markup, and technical SEO analysis.`,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: `Free SEO & Growth Marketing Tools Suite (25+ Tools) | ${siteSettings.site_name}`,
    description: `Access 25 free in-house utilities for deep SEO auditing, Open Graph previews, keyword clustering, canonical & hreflang generation, schema markup, and technical SEO analysis.`,
    url: "/tools",
    type: "website",
  },
};

export default function ToolsHubLayout({ children }) {
  return children;
}
