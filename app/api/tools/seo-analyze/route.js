import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    let html = "";
    let statusCode = 200;
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
        }
      });
      statusCode = response.status;
      html = await response.text();
    } catch (e) {
      return NextResponse.json({
        success: false,
        error: `Could not fetch page HTML: ${e.message}`
      }, { status: 502 });
    }

    // Extract Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";

    // Extract Meta Description
    const metaDescMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                          html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : "";

    // Extract Canonical
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : "";

    // Extract Robots Meta
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
    const robots = robotsMatch ? robotsMatch[1].trim() : "index, follow";

    // Extract H1, H2 tags
    const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2Matches = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 10);

    // Extract OpenGraph
    const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
    const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);

    // Images count and alt tags
    const imgTags = Array.from(html.matchAll(/<img[^>]+>/gi));
    let missingAltCount = 0;
    imgTags.forEach(img => {
      if (!/alt=["'][^"']+["']/i.test(img[0])) {
        missingAltCount++;
      }
    });

    // Score calculation
    let score = 100;
    const issues = [];
    const passed = [];

    if (!title) {
      score -= 20;
      issues.push("Missing <title> tag");
    } else if (title.length < 30 || title.length > 65) {
      score -= 5;
      issues.push(`Title tag length (${title.length} chars) is outside optimal 40-60 character range`);
    } else {
      passed.push(`Title tag is well-optimized (${title.length} chars)`);
    }

    if (!metaDescription) {
      score -= 15;
      issues.push("Missing meta description");
    } else if (metaDescription.length < 70 || metaDescription.length > 160) {
      score -= 5;
      issues.push(`Meta description length (${metaDescription.length} chars) is outside optimal 120-155 range`);
    } else {
      passed.push(`Meta description is present (${metaDescription.length} chars)`);
    }

    if (h1Matches.length === 0) {
      score -= 15;
      issues.push("No <h1> heading found on the page");
    } else if (h1Matches.length > 1) {
      score -= 5;
      issues.push(`Multiple <h1> tags detected (${h1Matches.length} found). Best practice is 1 primary <h1>.`);
    } else {
      passed.push("Single <h1> heading correctly present");
    }

    if (!canonical) {
      score -= 10;
      issues.push("No rel='canonical' tag found");
    } else {
      passed.push("Canonical URL tag configured properly");
    }

    if (missingAltCount > 0) {
      score -= Math.min(15, missingAltCount * 2);
      issues.push(`${missingAltCount} image(s) missing alt text`);
    } else if (imgTags.length > 0) {
      passed.push(`All ${imgTags.length} images have alt attributes`);
    }

    if (ogTitleMatch && ogImageMatch) {
      passed.push("OpenGraph social meta tags configured");
    } else {
      issues.push("OpenGraph social tags (og:title / og:image) are incomplete");
    }

    return NextResponse.json({
      success: true,
      url: targetUrl,
      statusCode,
      score: Math.max(10, Math.min(100, score)),
      title,
      metaDescription,
      canonical,
      robots,
      h1Count: h1Matches.length,
      h1s: h1Matches,
      h2s: h2Matches,
      totalImages: imgTags.length,
      missingAltCount,
      og: {
        title: ogTitleMatch ? ogTitleMatch[1] : null,
        description: ogDescMatch ? ogDescMatch[1] : null,
        image: ogImageMatch ? ogImageMatch[1] : null
      },
      issues,
      passed
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
