import { NextResponse } from "next/server";

// ── Helper: extract all regex matches ──────────────────────────────────────
function matchAll(html, regex) {
  const results = [];
  let m;
  while ((m = regex.exec(html)) !== null) results.push(m);
  return results;
}

function stripTags(s) {
  return (s || "").replace(/<[^>]+>/g, "").trim();
}

function getAttr(tag, attr) {
  const r = new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, "i");
  const m = tag.match(r);
  return m ? m[1].trim() : "";
}

function countOccurrences(html, regex) {
  const m = html.match(regex);
  return m ? m.length : 0;
}

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

    let hostname = "";
    try {
      hostname = new URL(targetUrl).hostname;
    } catch (e) {}

    const origin = new URL(targetUrl).origin;

    // ─────────────────────────────────────────────────────────────────────────
    // 1. FETCH PAGE HTML with timing
    // ─────────────────────────────────────────────────────────────────────────
    let html = "";
    let statusCode = 0;
    let responseHeaders = {};
    let ttfbMs = 0;
    let htmlSizeBytes = 0;
    let redirected = false;
    let finalUrl = targetUrl;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const startTime = Date.now();

      const response = await fetch(targetUrl, {
        signal: controller.signal,
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "identity",
        },
      });

      ttfbMs = Date.now() - startTime;
      clearTimeout(timeoutId);
      statusCode = response.status;
      finalUrl = response.url || targetUrl;
      redirected = response.redirected || false;

      // Capture response headers
      response.headers.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
      });

      html = await response.text();
      htmlSizeBytes = new TextEncoder().encode(html).length;
    } catch (e) {
      return NextResponse.json(
        { success: false, error: `Could not fetch page: ${e.message}` },
        { status: 502 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. EXTRACT META TAGS
    // ─────────────────────────────────────────────────────────────────────────
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? stripTags(titleMatch[1]) : "";

    const metaDescMatch =
      html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
      );
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : "";

    const metaKeywordsMatch =
      html.match(
        /<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']*)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']keywords["']/i
      );
    const metaKeywords = metaKeywordsMatch ? metaKeywordsMatch[1].trim() : "";

    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i
    );
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : "";

    const robotsMatch = html.match(
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i
    );
    const robots = robotsMatch ? robotsMatch[1].trim() : "";

    const viewportMatch = html.match(
      /<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']*)["']/i
    );
    const viewport = viewportMatch ? viewportMatch[1].trim() : "";

    const charsetMatch = html.match(/<meta[^>]+charset=["']?([^"'\s>]+)/i);
    const charset = charsetMatch ? charsetMatch[1].trim().toUpperCase() : "";

    const langMatch = html.match(/<html[^>]+lang=["']([^"']*)["']/i);
    const htmlLang = langMatch ? langMatch[1].trim() : "";

    const themeColorMatch = html.match(
      /<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']*)["']/i
    );
    const themeColor = themeColorMatch ? themeColorMatch[1].trim() : "";

    // ─────────────────────────────────────────────────────────────────────────
    // 3. HEADINGS EXTRACTION
    // ─────────────────────────────────────────────────────────────────────────
    const h1s = matchAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((m) =>
      stripTags(m[1])
    );
    const h2s = matchAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi)
      .map((m) => stripTags(m[1]))
      .slice(0, 15);
    const h3s = matchAll(html, /<h3[^>]*>([\s\S]*?)<\/h3>/gi)
      .map((m) => stripTags(m[1]))
      .slice(0, 10);
    const h4s = matchAll(html, /<h4[^>]*>([\s\S]*?)<\/h4>/gi)
      .map((m) => stripTags(m[1]))
      .slice(0, 10);

    // ─────────────────────────────────────────────────────────────────────────
    // 4. OPEN GRAPH & SOCIAL TAGS
    // ─────────────────────────────────────────────────────────────────────────
    function getOG(prop) {
      const r =
        html.match(
          new RegExp(
            `<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']*)["']`,
            "i"
          )
        ) ||
        html.match(
          new RegExp(
            `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${prop}["']`,
            "i"
          )
        );
      return r ? r[1].trim() : "";
    }
    function getTwitter(name) {
      const r =
        html.match(
          new RegExp(
            `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`,
            "i"
          )
        ) ||
        html.match(
          new RegExp(
            `<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`,
            "i"
          )
        );
      return r ? r[1].trim() : "";
    }

    const og = {
      title: getOG("og:title"),
      description: getOG("og:description"),
      image: getOG("og:image"),
      type: getOG("og:type"),
      url: getOG("og:url"),
      siteName: getOG("og:site_name"),
      locale: getOG("og:locale"),
    };

    const twitter = {
      card: getTwitter("twitter:card"),
      title: getTwitter("twitter:title"),
      description: getTwitter("twitter:description"),
      image: getTwitter("twitter:image"),
      site: getTwitter("twitter:site"),
      creator: getTwitter("twitter:creator"),
    };

    // ─────────────────────────────────────────────────────────────────────────
    // 5. IMAGES
    // ─────────────────────────────────────────────────────────────────────────
    const imgTags = matchAll(html, /<img[^>]+>/gi);
    let missingAltCount = 0;
    let lazyLoadedImages = 0;
    const imageDetails = imgTags.slice(0, 30).map((m) => {
      const tag = m[0];
      const src = getAttr(tag, "src");
      const alt = getAttr(tag, "alt");
      const loading = getAttr(tag, "loading");
      const width = getAttr(tag, "width");
      const height = getAttr(tag, "height");
      if (!alt) missingAltCount++;
      if (loading === "lazy") lazyLoadedImages++;
      return { src, alt, loading, width, height, hasAlt: !!alt };
    });
    // Count total missing alt from all images
    imgTags.forEach((m) => {
      // already counted in slice(0,30), need full count
    });
    let totalMissingAlt = 0;
    imgTags.forEach((m) => {
      const alt = getAttr(m[0], "alt");
      if (!alt) totalMissingAlt++;
    });
    let totalLazyImages = 0;
    imgTags.forEach((m) => {
      if (getAttr(m[0], "loading") === "lazy") totalLazyImages++;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 6. LINKS
    // ─────────────────────────────────────────────────────────────────────────
    const allAnchorTags = matchAll(html, /<a\s[^>]*href=["']([^"']*)["'][^>]*>/gi);
    let internalLinks = 0;
    let externalLinks = 0;
    let nofollowLinks = 0;
    let emptyLinks = 0;
    let hashLinks = 0;

    allAnchorTags.forEach((m) => {
      const href = m[1] || "";
      const tag = m[0];
      const rel = getAttr(tag, "rel");
      if (rel.includes("nofollow")) nofollowLinks++;
      if (!href || href === "#") {
        emptyLinks++;
        hashLinks++;
      } else if (href.startsWith("/") || href.includes(hostname)) {
        internalLinks++;
      } else if (href.startsWith("http")) {
        externalLinks++;
      }
    });
    const totalLinks = allAnchorTags.length;

    // ─────────────────────────────────────────────────────────────────────────
    // 7. SCHEMA / STRUCTURED DATA
    // ─────────────────────────────────────────────────────────────────────────
    const schemaScripts = matchAll(
      html,
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    );
    const schemaBlocks = schemaScripts.map((m) => {
      const raw = m[1].trim();
      try {
        const parsed = JSON.parse(raw);
        return {
          type: parsed["@type"] || (Array.isArray(parsed["@graph"]) ? "Graph (" + parsed["@graph"].map(g => g["@type"]).join(", ") + ")" : "Unknown"),
          raw: raw.substring(0, 400),
        };
      } catch (e) {
        return { type: "Invalid JSON", raw: raw.substring(0, 200) };
      }
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 8. HREFLANG TAGS
    // ─────────────────────────────────────────────────────────────────────────
    const hreflangTags = matchAll(
      html,
      /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']*)["'][^>]+href=["']([^"']*)["']/gi
    ).map((m) => ({ lang: m[1], href: m[2] }));

    // ─────────────────────────────────────────────────────────────────────────
    // 9. SECURITY HEADERS
    // ─────────────────────────────────────────────────────────────────────────
    const securityHeaders = {
      https: targetUrl.startsWith("https://") || finalUrl.startsWith("https://"),
      hsts: !!responseHeaders["strict-transport-security"],
      hstsValue: responseHeaders["strict-transport-security"] || "",
      xContentType: !!responseHeaders["x-content-type-options"],
      xFrameOptions: responseHeaders["x-frame-options"] || "",
      csp: !!responseHeaders["content-security-policy"],
      permissionsPolicy: !!responseHeaders["permissions-policy"],
      xssProtection: responseHeaders["x-xss-protection"] || "",
      referrerPolicy: responseHeaders["referrer-policy"] || "",
    };

    // ─────────────────────────────────────────────────────────────────────────
    // 10. RESOURCE COUNTS
    // ─────────────────────────────────────────────────────────────────────────
    const cssLinks = countOccurrences(
      html,
      /<link[^>]+rel=["']stylesheet["'][^>]*>/gi
    );
    const jsScripts = countOccurrences(
      html,
      /<script[^>]+src=["'][^"']+["'][^>]*>/gi
    );
    const inlineStyles = countOccurrences(html, /<style[^>]*>/gi);
    const inlineScripts = countOccurrences(
      html,
      /<script(?![^>]*src=)(?![^>]*type=["']application\/ld\+json["'])[^>]*>/gi
    );

    // ─────────────────────────────────────────────────────────────────────────
    // 11. TECHNOLOGY / CMS DETECTION
    // ─────────────────────────────────────────────────────────────────────────
    const generatorMatch = html.match(
      /<meta[^>]+name=["']generator["'][^>]+content=["']([^"']*)["']/i
    );
    const generator = generatorMatch ? generatorMatch[1].trim() : "";

    function detectCMS() {
      const signals = [];
      if (generator) signals.push(generator);
      if (/wp-content|wp-includes/i.test(html)) signals.push("WordPress");
      if (/Shopify\.theme/i.test(html) || /cdn\.shopify/i.test(html)) signals.push("Shopify");
      if (/wix\.com|wixsite/i.test(html)) signals.push("Wix");
      if (/squarespace/i.test(html)) signals.push("Squarespace");
      if (/__next/i.test(html) || /_next\/static/i.test(html)) signals.push("Next.js");
      if (/gatsby/i.test(html)) signals.push("Gatsby");
      if (/nuxt/i.test(html)) signals.push("Nuxt.js");
      if (/webflow/i.test(html)) signals.push("Webflow");
      if (/ghost/i.test(html) && /ghost-/i.test(html)) signals.push("Ghost");
      if (/drupal/i.test(html) && /sites\/default/i.test(html)) signals.push("Drupal");
      if (/joomla/i.test(html)) signals.push("Joomla");
      if (/react/i.test(html) && /__react/i.test(html)) signals.push("React");
      if (/angular/i.test(html) && /ng-/i.test(html)) signals.push("Angular");
      if (/vue/i.test(html) && /data-v-/i.test(html)) signals.push("Vue.js");
      if (/laravel/i.test(html)) signals.push("Laravel");
      // analytics
      if (/gtag|google-analytics|googletagmanager/i.test(html)) signals.push("Google Analytics/GTM");
      if (/facebook\.net\/en_US\/fbevents/i.test(html) || /fbq\(/i.test(html)) signals.push("Facebook Pixel");
      if (/hotjar/i.test(html)) signals.push("Hotjar");
      if (/clarity\.ms/i.test(html)) signals.push("Microsoft Clarity");
      return [...new Set(signals)];
    }

    const detectedTech = detectCMS();

    // ─────────────────────────────────────────────────────────────────────────
    // 12. CONTENT METRICS
    // ─────────────────────────────────────────────────────────────────────────
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyHtml = bodyMatch ? bodyMatch[1] : html;
    const bodyText = stripTags(bodyHtml);
    const words = bodyText
      .split(/\s+/)
      .filter((w) => w.length > 1);
    const wordCount = words.length;

    // Text-to-HTML ratio
    const textSize = new TextEncoder().encode(bodyText).length;
    const textToHtmlRatio = htmlSizeBytes > 0 ? Math.round((textSize / htmlSizeBytes) * 100) : 0;

    // ─────────────────────────────────────────────────────────────────────────
    // 13. ACCESSIBILITY BASICS
    // ─────────────────────────────────────────────────────────────────────────
    const hasLangAttr = !!htmlLang;
    const hasSkipNav =
      /<a[^>]+href=["']#(main|content|skip)[^"']*["']/i.test(html);
    const ariaLandmarks = countOccurrences(
      html,
      /role=["'](banner|navigation|main|contentinfo|complementary|search)["']/gi
    );
    const formInputs = countOccurrences(html, /<input[^>]+>/gi);
    const formLabels = countOccurrences(html, /<label[^>]*>/gi);
    const ariaLabels = countOccurrences(html, /aria-label(ledby)?=/gi);

    // ─────────────────────────────────────────────────────────────────────────
    // 14. MISCELLANEOUS
    // ─────────────────────────────────────────────────────────────────────────
    const hasFavicon =
      /<link[^>]+rel=["'](icon|shortcut icon|apple-touch-icon)["']/i.test(html);
    const hasManifest =
      /<link[^>]+rel=["']manifest["']/i.test(html);
    const hasAmpVersion = /<html[^>]+amp/i.test(html) || /<link[^>]+rel=["']amphtml["']/i.test(html);
    const iframes = countOccurrences(html, /<iframe[^>]*>/gi);
    const deprecated = countOccurrences(
      html,
      /<(font|center|marquee|blink|big|strike|tt|frame|frameset|applet)\b/gi
    );

    // Detect if HTML looks minified (rough check)
    const newlineCount = (html.match(/\n/g) || []).length;
    const isMinified = htmlSizeBytes > 5000 && newlineCount < (htmlSizeBytes / 500);

    // ─────────────────────────────────────────────────────────────────────────
    // 15. FETCH robots.txt & sitemap.xml
    // ─────────────────────────────────────────────────────────────────────────
    let robotsTxt = { exists: false, content: "", size: 0 };
    let sitemapXml = { exists: false, url: "", size: 0 };

    try {
      const rResp = await fetch(`${origin}/robots.txt`, {
        signal: AbortSignal.timeout(5000),
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (rResp.ok) {
        const rText = await rResp.text();
        if (rText && !rText.includes("<html") && rText.length < 50000) {
          robotsTxt = {
            exists: true,
            content: rText.substring(0, 2000),
            size: rText.length,
          };
          // Try to find sitemap URL in robots.txt
          const smMatch = rText.match(/Sitemap:\s*(\S+)/i);
          if (smMatch) sitemapXml.url = smMatch[1].trim();
        }
      }
    } catch (e) {}

    // Try sitemap
    const sitemapUrl = sitemapXml.url || `${origin}/sitemap.xml`;
    try {
      const smResp = await fetch(sitemapUrl, {
        signal: AbortSignal.timeout(5000),
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (smResp.ok) {
        const smText = await smResp.text();
        if (smText && (smText.includes("<urlset") || smText.includes("<sitemapindex"))) {
          const urlCount = (smText.match(/<url>/gi) || []).length;
          const sitemapCount = (smText.match(/<sitemap>/gi) || []).length;
          sitemapXml = {
            exists: true,
            url: sitemapUrl,
            size: smText.length,
            urlCount,
            sitemapCount,
          };
        }
      }
    } catch (e) {}

    // ─────────────────────────────────────────────────────────────────────────
    // RETURN COMPREHENSIVE DATA
    // ─────────────────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      url: targetUrl,
      finalUrl,
      hostname,
      statusCode,
      redirected,
      ttfbMs,
      htmlSizeBytes,
      htmlSizeKB: Math.round(htmlSizeBytes / 1024),
      isMinified,

      // Meta
      title,
      titleLength: title.length,
      metaDescription,
      metaDescLength: metaDescription.length,
      metaKeywords,
      canonical,
      robots,
      viewport,
      charset,
      htmlLang,
      themeColor,

      // Headings
      h1s,
      h2s,
      h3s,
      h4s,

      // Content
      wordCount,
      textToHtmlRatio,

      // Images
      totalImages: imgTags.length,
      missingAltCount: totalMissingAlt,
      lazyLoadedImages: totalLazyImages,
      imageDetails,

      // Links
      totalLinks,
      internalLinks,
      externalLinks,
      nofollowLinks,
      emptyLinks,
      hashLinks,

      // Schema
      schemaCount: schemaScripts.length,
      schemaBlocks,

      // Hreflang
      hreflangTags,

      // Social
      og,
      twitter,

      // Security
      security: securityHeaders,

      // Resources
      resources: {
        cssFiles: cssLinks,
        jsFiles: jsScripts,
        inlineStyles,
        inlineScripts,
      },

      // Technology
      generator,
      detectedTech,

      // Accessibility
      accessibility: {
        hasLangAttr,
        langValue: htmlLang,
        hasSkipNav,
        ariaLandmarks,
        formInputs,
        formLabels,
        ariaLabels,
      },

      // Misc
      hasFavicon,
      hasManifest,
      hasAmpVersion,
      iframes,
      deprecatedTags: deprecated,

      // robots.txt & sitemap
      robotsTxt: {
        exists: robotsTxt.exists,
        size: robotsTxt.size,
        snippet: robotsTxt.content.substring(0, 500),
      },
      sitemap: sitemapXml,

      // Raw HTML for client-side DOMParser fallback analysis
      html,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
