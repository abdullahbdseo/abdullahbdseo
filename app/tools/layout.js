import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `24 Free SEO & Growth Marketing Tools | ${siteSettings.site_name}`,
  description: `Access 24 free in-house utilities for deep SEO auditing, Open Graph previews, keyword clustering, canonical & hreflang generation, schema markup, and technical SEO analysis.`,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: `24 Free SEO & Growth Marketing Tools | ${siteSettings.site_name}`,
    description: `Access 24 free in-house utilities for deep SEO auditing, Open Graph previews, keyword clustering, canonical & hreflang generation, schema markup, and technical SEO analysis.`,
    url: "/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `24 Free SEO & Growth Marketing Tools | ${siteSettings.site_name}`,
    description: `Access 24 free in-house utilities for deep SEO auditing, Open Graph previews, keyword clustering, canonical & hreflang generation, schema markup, and technical SEO analysis.`,
  },
};

export default function ToolsHubLayout({ children }) {
  return children;
}
