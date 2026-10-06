import { services, caseStudies, blogPosts } from "@/lib/data";
import { backlinkPosts } from "@/lib/backlinks-data";

export default function sitemap() {
  const baseUrl = "https://abdullahbdseo.vercel.app";
  const now = new Date().toISOString();

  // Safely parse any date string — returns ISO string or falls back to now
  const safeDate = (dateStr) => {
    if (!dateStr) return now;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? now : parsed.toISOString();
  };

  // Static Pages (non-data-driven routes only)
  // NOTE: /services/* are NOT listed here — they are generated dynamically below from data.js
  // to avoid duplicate sitemap entries and ensure all service pages are always included.
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/portfolio",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/refund-policy",
    "/terms",
    "/tools",
    "/high-da-backlinks",
    "/tools/deep-seo-audit",
    "/tools/website-seo-analyzer",
    "/tools/seo-audit-report-generator",
    "/tools/website-cost-calculator",
    "/tools/google-ads-roi-calculator",
    "/tools/facebook-ads-roi-calculator",
    "/tools/ai-automation-savings-calculator",
    "/tools/schema-markup-generator",
    "/tools/serp-simulator",
    "/tools/robots-sitemap-generator",
    "/tools/keyword-density-checker",
    "/tools/http-header-checker",
    "/tools/love-calculator",
    "/tools/backlink-package-calculator",
    "/tools/seo-roi-calculator",
    "/tools/redirect-htaccess-generator",
    "/tools/word-counter-seo-analyzer",
    "/tools/pagespeed-analyzer",
    "/tools/url-slug-generator",
    "/tools/disavow-file-generator",
    "/tools/seo-content-optimizer",
    "/tools/open-graph-meta-generator",
    "/tools/canonical-hreflang-generator",
    "/tools/keyword-clustering-tool",
    "/tools/url-slug-duplicate-checker",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === "" || route === "/blog"
        ? "daily"
        : route.startsWith("/tools") || route === "/services"
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1.0
        : route === "/services"
        ? 0.9
        : ["/about", "/contact", "/pricing", "/portfolio", "/blog", "/tools"].includes(route)
        ? 0.85
        : route.startsWith("/tools")
        ? 0.85
        : 0.7,
  }));


  // Dynamic Service Pages
  const serviceRoutes = (services || []).map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Case Studies / Portfolio
  const portfolioRoutes = (caseStudies || []).map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic Blog Posts
  const blogRoutes = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: safeDate(post.date || post.publish_date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic High DA Backlink Resource Guides
  const backlinkRoutes = (backlinkPosts || []).map((post) => ({
    url: `${baseUrl}/high-da-backlinks/${post.slug}`,
    lastModified: safeDate(post.date || post.lastModified),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
    ...backlinkRoutes,
  ];
}

