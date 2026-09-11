import { services, caseStudies, blogPosts } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://abdullahbdseo.vercel.app";
  const now = new Date().toISOString();

  // Static Pages
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
    "/services/technical-seo-service-in-bangladesh",
    "/services/local-seo-service-in-bangladesh",
    "/services/ecommerce-seo-service-in-bangladesh",
    "/services/ai-seo-service-in-bangladesh",
    "/services/geo-service-in-bangladesh",
    "/services/aeo-service-in-bangladesh",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : route.startsWith("/services") || route.startsWith("/tools") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : route.startsWith("/tools") ? 0.85 : 0.7,
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
    lastModified: post.date || post.publish_date || now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
