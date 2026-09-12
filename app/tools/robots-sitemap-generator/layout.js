import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Robots.txt & XML Sitemap Generator | Search Bot Directives | ${siteSettings.site_name}`,
  description: `Quickly generate custom robots.txt files and XML sitemaps for Googlebot, Bingbot, and AI crawlers with custom allow and disallow crawl rules.`,
  alternates: {
    canonical: "/tools/robots-sitemap-generator",
  },
  openGraph: {
    title: `Robots.txt & Sitemap Generator | ${siteSettings.site_name}`,
    description: `Build clean, valid robots.txt and XML sitemaps for optimal website indexing.`,
    url: "/tools/robots-sitemap-generator",
    type: "website",
  },
};

export default function RobotsSitemapGeneratorLayout({ children }) {
  return children;
}
