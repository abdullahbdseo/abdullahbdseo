import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Robots.txt & XML Sitemap Generator | ${siteSettings.site_name}`,
  description: `Quickly generate custom robots.txt files and XML sitemaps for Googlebot, Bingbot, and AI crawlers with custom allow and disallow crawl rules.`,
  alternates: {
    canonical: "/tools/robots-sitemap-generator",
  },
  openGraph: {
    title: `Robots.txt & XML Sitemap Generator | ${siteSettings.site_name}`,
    description: `Quickly generate custom robots.txt files and XML sitemaps for Googlebot, Bingbot, and AI crawlers with custom allow and disallow crawl rules.`,
    url: "/tools/robots-sitemap-generator",
    type: "website",
  },
};

export default function RobotsSitemapGeneratorLayout({ children }) {
  return children;
}
