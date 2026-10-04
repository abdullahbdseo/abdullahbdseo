import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `On-Page SEO Content Optimizer & Live Grader | Free SEO Tool`,
  description: `Scan your articles and blog posts for 20+ on-page SEO ranking factors in real-time. Check focus keyword placement in Title, Meta, Slug, H1, H2, H3, density, and readability.`,
  alternates: {
    canonical: "/tools/seo-content-optimizer",
  },
  openGraph: {
    title: `On-Page SEO Content Optimizer & Live Grader | Free SEO Tool`,
    description: `Audit your written content for focus keyword placement in H1-H3, meta tags, URL slug, keyword density, and readability with instant 0-100 SEO scoring.`,
    url: "/tools/seo-content-optimizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `On-Page SEO Content Optimizer & Live Grader | Free SEO Tool`,
    description: `Audit your written content for focus keyword placement in H1-H3, meta tags, URL slug, keyword density, and readability with instant 0-100 SEO scoring.`,
  },
};
export default function SeoContentOptimizerLayout({ children }) {
  return children;
}
