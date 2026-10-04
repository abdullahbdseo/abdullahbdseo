import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Canonical & Hreflang Tag Generator for International SEO | ${siteSettings.site_name}`,
  description: `Generate Google-compliant rel=canonical and multi-language hreflang tags. Includes bulk CSV generation, x-default fallback, Next.js metadata, and XML sitemap alternate links.`,
  alternates: {
    canonical: "/tools/canonical-hreflang-generator",
  },
  openGraph: {
    title: `Canonical & Hreflang Tag Generator for International SEO | ${siteSettings.site_name}`,
    description: `Generate Google-compliant rel=canonical and multi-language hreflang tags. Includes bulk CSV generation, x-default fallback, Next.js metadata, and XML sitemap alternate links.`,
    url: "/tools/canonical-hreflang-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Canonical & Hreflang Tag Generator for International SEO | ${siteSettings.site_name}`,
    description: `Generate Google-compliant rel=canonical and multi-language hreflang tags. Includes bulk CSV generation, x-default fallback, Next.js metadata, and XML sitemap alternate links.`,
  },
};
export default function CanonicalHreflangLayout({ children }) {
  return children;
}
