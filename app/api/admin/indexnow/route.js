import { NextResponse } from "next/server";
import { submitToIndexNow, SITE_HOST } from "@/lib/indexnow";
import { services, caseStudies, blogPosts } from "@/lib/data";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    let urlsToSubmit = [];

    if (body.urls && Array.isArray(body.urls) && body.urls.length > 0) {
      urlsToSubmit = body.urls;
    } else if (body.url) {
      urlsToSubmit = [body.url];
    } else {
      // Default: Submit ALL website URLs across static, services, portfolio, and blogs
      const staticUrls = [
        `https://${SITE_HOST}`,
        `https://${SITE_HOST}/about`,
        `https://${SITE_HOST}/services`,
        `https://${SITE_HOST}/pricing`,
        `https://${SITE_HOST}/portfolio`,
        `https://${SITE_HOST}/blog`,
        `https://${SITE_HOST}/faq`,
        `https://${SITE_HOST}/contact`,
        `https://${SITE_HOST}/tools`,
        `https://${SITE_HOST}/tools/deep-seo-audit`,
        `https://${SITE_HOST}/tools/schema-markup-generator`,
        `https://${SITE_HOST}/tools/serp-simulator`,
        `https://${SITE_HOST}/tools/keyword-density-checker`,
        `https://${SITE_HOST}/tools/robots-sitemap-generator`,
        `https://${SITE_HOST}/tools/http-header-checker`,
        `https://${SITE_HOST}/services/technical-seo-service-in-bangladesh`,
        `https://${SITE_HOST}/services/local-seo-service-in-bangladesh`,
        `https://${SITE_HOST}/services/ecommerce-seo-service-in-bangladesh`,
        `https://${SITE_HOST}/services/ai-seo-service-in-bangladesh`,
        `https://${SITE_HOST}/services/geo-service-in-bangladesh`,
        `https://${SITE_HOST}/services/aeo-service-in-bangladesh`
      ];

      const dynamicServices = (services || []).map(s => `https://${SITE_HOST}/services/${s.slug}`);
      const dynamicPortfolio = (caseStudies || []).map(c => `https://${SITE_HOST}/portfolio/${c.slug}`);
      const dynamicBlogs = (blogPosts || []).map(b => `https://${SITE_HOST}/blog/${b.slug}`);

      urlsToSubmit = Array.from(new Set([
        ...staticUrls,
        ...dynamicServices,
        ...dynamicPortfolio,
        ...dynamicBlogs
      ]));
    }

    const result = await submitToIndexNow(urlsToSubmit);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
