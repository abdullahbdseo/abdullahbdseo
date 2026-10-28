// scripts/publish-gsc-blog.mjs
// Publishes "Google Search Console Mastery: How to Fix Crawl Errors & Boost Impressions"
// Strictly adheres to content_writing_rules.md, blog_publishing_workflow.md, and AGENTS.md (4px border radius standard)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const dataJsPath = path.join(rootDir, "lib", "data.js");
const cmsJsonPath = path.join(rootDir, "lib", "cms-data.json");
const draftsDir = path.join(rootDir, "lib", "blog-drafts");

const firebaseConfig = {
  apiKey: "AIzaSyAch7gz1ScVM22HW13TnCBg66soOAoLVtk",
  authDomain: "abdullah-seo-cms.firebaseapp.com",
  projectId: "abdullah-seo-cms",
  storageBucket: "abdullah-seo-cms.firebasestorage.app",
  messagingSenderId: "20622347219",
  appId: "1:20622347219:web:a9d97636f447eeb23f3d26",
};

const blogPost = {
  id: Date.now(),
  title: "Google Search Console Mastery: How to Fix Crawl Errors & Boost Impressions",
  slug: "google-search-console-mastery-fix-crawl-errors-boost-impressions",
  category: "Technical SEO",
  publish_date: "2026-10-28",
  date: "2026-10-28",
  dateModified: "2026-10-28",
  meta_title: "Google Search Console Mastery: Fix Crawl Errors & Boost Impressions",
  meta_description: "Master Google Search Console in 2026. Step-by-step methods to fix crawl errors, resolve indexing issues, audit Core Web Vitals, and scale your organic impressions.",
  meta_keywords: "Google Search Console, Google Search Console Mastery, Fix Crawl Errors, Boost Impressions, Googlebot Indexing, Technical SEO Bangladesh, Page Indexing Report, Abdullah Saleh",
  read_time: "14 min read",
  featured_image: "/images/blog_gsc_crawl_errors_impressions.jpg",
  image: "/images/blog_gsc_crawl_errors_impressions.jpg",
  summary: "A practical, diagnostic guide to Google Search Console mastery. Learn how to isolate server errors, resolve soft 404s, unclog crawl bottlenecks, and scale your search impressions.",
  excerpt: "A practical, diagnostic guide to Google Search Console mastery. Learn how to isolate server errors, resolve soft 404s, unclog crawl bottlenecks, and scale your search impressions.",
  tags: [
    "Google Search Console",
    "Crawl Errors",
    "Technical SEO",
    "Page Indexing",
    "Search Impressions",
    "Crawl Budget",
    "Abdullah Saleh"
  ],
  author: {
    name: "Abdullah Saleh",
    role: "Lead SEO Strategist & AI Search Architect",
    bio: "Abdullah Saleh is an Organic Business Growth Specialist and Technical SEO Expert in Bangladesh helping 100+ global brands achieve #1 Google rankings and authoritative citations.",
    avatar: "/images/abdullah.jpg"
  },
  content: `
    <h2>Why Search Console Crawl Diagnostics Determine Impression Growth</h2>
    <p style="line-height:1.8;margin-bottom:14px;font-size:1.02rem;">Google Search Console provides the only direct window into how Googlebot discovers, renders, and evaluates your website. When URLs hit server timeouts, encounter redirect loops, or return soft 404 status codes, Googlebot conserves resources and slows its crawl frequency. Your newly published pages sit in queue, while existing pages lose search visibility because refreshed content never enters the index.</p>
    <p style="line-height:1.8;margin-bottom:14px;">Organic impressions represent the top of your search funnel. Before a user clicks your link, your snippet must render on the results page. If technical crawl anomalies block Googlebot from understanding your page depth, impressions drop across entire topic clusters. Resolving these crawl anomalies restores search engine confidence and creates immediate headroom for organic impressions to scale.</p>

    <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 20px 24px; margin: 28px 0; border-radius: 4px; border: 1px solid #dbeafe;">
      <strong style="color: #1e40af; font-size: 1.05rem; display: block; margin-bottom: 6px;">Strategic Technical Rule:</strong>
      <p style="margin: 0; color: #1e293b; font-size: 0.98rem; line-height: 1.65;">Googlebot does not browse like a human. It evaluates HTTP status headers, byte delivery speeds, and canonical declarations in fractions of a second. Diagnosing errors in Search Console requires checking live server headers rather than trusting browser renders.</p>
    </div>

    <h2>1. Decoding the Page Indexing Report: Server Errors, 404s, and Soft 404s</h2>
    <p style="line-height:1.8;margin-bottom:14px;">The Page Indexing report inside Search Console categorizes every known URL into two broad buckets: indexed and not indexed. The unindexed section contains reasons why pages remain out of search results. Each status requires a distinct remediation workflow.</p>
    
    <div style="margin: 28px 0; text-align: center;">
      <img src="/images/tech_seo_audit_workflow.jpg" alt="Technical SEO Audit and Crawl Error Diagnosis Workflow" style="width: 100%; max-width: 820px; border-radius: 4px; border: 1px solid #e2e8f0; display: block; margin: 0 auto;" />
      <p style="font-size: 0.85rem; color: #64748b; margin-top: 8px;">Figure 1: Systematic workflow for identifying and prioritizing server and crawl anomalies in Google Search Console.</p>
    </div>

    <p style="line-height:1.8;margin-bottom:14px;"><strong>Server Error (5xx):</strong> This indicates your web server failed to return the requested URL when Googlebot attempted a visit. Common causes include database query timeouts during high traffic, aggressive security firewalls blocking Googlebot IP ranges, or memory exhaustion on PHP-FPM workers. Fix this by reviewing server error logs, raising worker memory limits, and whitelisting official Googlebot reverse DNS hostnames.</p>
    <p style="line-height:1.8;margin-bottom:14px;"><strong>Not Found (404):</strong> A standard 404 response tells Googlebot that the page no longer exists. If the page was removed intentionally with no equivalent replacement, a 404 or 410 Gone status is healthy and expected. However, if valuable URLs with external backlinks return 404s, map them immediately with direct 301 redirects to the closest relevant category or service page. You can generate clean redirect directives using our <a href="/tools/redirect-htaccess-generator" style="color:#2563eb;font-weight:700;">Redirect & .htaccess Generator</a>.</p>
    <p style="line-height:1.8;margin-bottom:14px;"><strong>Soft 404:</strong> A soft 404 occurs when a page returns an HTTP 200 OK success header, yet displays an empty state, a "product out of stock" notice, or minimal content that looks like an error screen. Googlebot views this as deceptive because the header contradicts the rendered output. Resolve soft 404s by either serving true 404 status codes for deleted items or populating the page with substantial category copy, related products, and internal navigational links.</p>

    <h2>2. Fixing Discovered - Currently Not Indexed and Crawled - Currently Not Indexed</h2>
    <p style="line-height:1.8;margin-bottom:14px;">These two statuses create widespread confusion among website owners. They share similar names, but represent very different stages of the search indexing pipeline.</p>
    <p style="line-height:1.8;margin-bottom:14px;"><strong>Discovered - Currently Not Indexed:</strong> Google knows the URL exists, typically through your XML sitemap or an internal link, but has not yet crawled it. This is primarily a crawl budget and host load signal. Googlebot determined that crawling this URL right now might overload your server, or it prioritized other URLs on the domain with stronger internal PageRank. To clear this backlog, prune low-quality query parameters, speed up your time to first byte, and link directly to these URLs from high-traffic pillar content.</p>
    <p style="line-height:1.8;margin-bottom:14px;"><strong>Crawled - Currently Not Indexed:</strong> Googlebot fetched the URL, rendered the DOM, parsed the content, and made a conscious editorial decision not to index it. This is almost always a content quality or duplication issue. If your article rehashes generic information without original research, unique case data, or expert insight, Google leaves it out of the index. Compare the page against top-ranking competitors, expand thin sections with proprietary data, and verify that the content meets Google's helpful content guidelines.</p>

    <div style="margin: 28px 0; text-align: center;">
      <img src="/images/crawl_budget_10_techniques.jpg" alt="Crawl Budget and Googlebot Efficiency Techniques" style="width: 100%; max-width: 820px; border-radius: 4px; border: 1px solid #e2e8f0; display: block; margin: 0 auto;" />
      <p style="font-size: 0.85rem; color: #64748b; margin-top: 8px;">Figure 2: Core techniques for optimizing crawl allocation and eliminating waste on server resources.</p>
    </div>

    <h2>3. Robots.txt, Canonical Conflicts, and Redirect Chains</h2>
    <p style="line-height:1.8;margin-bottom:14px;">Technical directives can silently sabotage your organic impressions when configured incorrectly. Three specific areas generate frequent Search Console flags:</p>
    <ul style="line-height: 1.8; margin-left: 20px; color: #334155; margin-bottom: 20px;">
      <li><strong>Blocked by robots.txt:</strong> When a disallow rule matches a page URL, Googlebot cannot fetch the HTML to read meta tags. If the page already had incoming links, Google may still index the bare URL without a description. Ensure your robots.txt file permits crawling of primary content paths, CSS files, and JavaScript bundles. Validate rules with our <a href="/tools/robots-sitemap-generator" style="color:#2563eb;font-weight:700;">Robots.txt & Sitemap Suite</a>.</li>
      <li><strong>Duplicate Without User-Selected Canonical:</strong> Google found multiple versions of a page (such as HTTP vs HTTPS, trailing slash variants, or tracking parameters) with no self-referential canonical tag. Fix this by specifying an absolute canonical tag on every page using our <a href="/tools/canonical-hreflang-generator" style="color:#2563eb;font-weight:700;">Canonical & Hreflang Tool</a>.</li>
      <li><strong>Page With Redirect:</strong> This status flags URLs that redirect to another destination. It is normal during site migrations. However, watch for multi-hop redirect chains (A goes to B, B goes to C) which bleed crawl budget and slow down crawler processing. Flatten every chain into a single direct 301 hop. Check status hops using our <a href="/tools/http-header-checker" style="color:#2563eb;font-weight:700;">HTTP Header & 301 Checker</a>.</li>
    </ul>

    <h2>4. Optimizing Crawl Stats and Server Response Times</h2>
    <p style="line-height:1.8;margin-bottom:14px;">Hidden under the Settings tab in Search Console is the Crawl Stats report. This section displays your total crawl requests, total download size, and average response time over the last 90 days. It reveals how efficiently your infrastructure communicates with Google's distributed data centers.</p>
    <p style="line-height:1.8;margin-bottom:14px;">Watch the average response time line carefully. If your response time climbs above 500 milliseconds, Googlebot noticeably reduces its daily fetch limit to protect your server stability. When response times drop below 200 milliseconds, Googlebot accelerates crawling across deeper subdirectories.</p>
    <p style="line-height:1.8;margin-bottom:14px;">For custom web applications and content portals, partnering with a dedicated <a href="/services/technical-seo-service-in-bangladesh" style="color:#2563eb;font-weight:700;">Technical SEO Specialist</a> helps implement edge-caching on Cloudflare, eliminate unindexed taxonomy loops, and keep crawl throughput at peak efficiency.</p>

    <div style="margin: 28px 0; text-align: center;">
      <img src="/images/technical_seo_framework_infographic.jpg" alt="Technical SEO and Performance Optimization Framework" style="width: 100%; max-width: 820px; border-radius: 4px; border: 1px solid #e2e8f0; display: block; margin: 0 auto;" />
      <p style="font-size: 0.85rem; color: #64748b; margin-top: 8px;">Figure 3: Comprehensive framework connecting technical crawl health to organic visibility and impression growth.</p>
    </div>

    <h2>5. Turning Clean Indexation into Surging Search Impressions</h2>
    <p style="line-height:1.8;margin-bottom:14px;">Fixing technical crawl errors is half the battle; the second half is activating those indexed pages to capture search impressions. Here is the exact process we use across enterprise client websites:</p>
    <ol style="line-height: 1.8; margin-left: 20px; color: #334155; margin-bottom: 24px;">
      <li><strong>Verify Clean Indexation via URL Inspection:</strong> Run individual priority URLs through the URL Inspection tool. Confirm that Googlebot reads the canonical tag, loads all resources, and renders the structured data without syntax warnings.</li>
      <li><strong>Inject High-Intent FAQ & Article Schema:</strong> Search engines favor structured data to produce rich snippet carousels, expand review stars, and feed AI Overview answers. Deploy verified JSON-LD markup using our <a href="/tools/schema-markup-generator" style="color:#2563eb;font-weight:700;">Schema Markup Generator</a>.</li>
      <li><strong>Consolidate Internal Link Equity:</strong> Identify your top 10 highest-impression pages inside the Performance report. Add contextual, descriptive anchor text links from these power pages pointing directly to newly cleared URLs. Internal link equity tells Googlebot which pages carry business priority.</li>
      <li><strong>Optimize Underperforming Title Tags:</strong> Review queries in the Performance report that generate high impressions but low click-through rates. Test new emotional hooks, specific numbers, and intent modifiers to capture the clicks your impressions deserve. Test your title visibility with our <a href="/tools/serp-simulator" style="color:#2563eb;font-weight:700;">SERP Simulator</a>.</li>
    </ol>

    <h2>6. Crawl Error Remediation Matrix</h2>
    <div style="overflow-x: auto; margin: 26px 0;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.94rem;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
            <th style="padding: 14px 18px; color: #0f172a; font-weight: 800;">GSC Error Status</th>
            <th style="padding: 14px 18px; color: #ef4444; font-weight: 800;">Root Cause</th>
            <th style="padding: 14px 18px; color: #475569; font-weight: 800;">Googlebot Impact</th>
            <th style="padding: 14px 18px; color: #16a34a; font-weight: 800;">Actionable Fix</th>
          </tr>
        </thead>
        <tbody style="color: #334155;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 14px 18px; font-weight: 700;">Server Error (5xx)</td>
            <td style="padding: 14px 18px;">PHP worker timeouts, server crashes</td>
            <td style="padding: 14px 18px;">Crawl rate slows immediately</td>
            <td style="padding: 14px 18px; color: #16a34a; font-weight: 600;">Upgrade hosting, increase worker limits, review error logs</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 14px 18px; font-weight: 700;">Soft 404</td>
            <td style="padding: 14px 18px;">Empty page body returning HTTP 200</td>
            <td style="padding: 14px 18px;">Excluded from search results</td>
            <td style="padding: 14px 18px; color: #16a34a; font-weight: 600;">Return true 404 header or add meaningful content</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 14px 18px; font-weight: 700;">Redirect Error</td>
            <td style="padding: 14px 18px;">Redirect loop or broken destination</td>
            <td style="padding: 14px 18px;">Crawler abandons request</td>
            <td style="padding: 14px 18px; color: #16a34a; font-weight: 600;">Flatten chains to a single direct 301 hop</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 14px 18px; font-weight: 700;">Crawled - Not Indexed</td>
            <td style="padding: 14px 18px;">Thin content, low editorial depth</td>
            <td style="padding: 14px 18px;">Page evaluated and rejected</td>
            <td style="padding: 14px 18px; color: #16a34a; font-weight: 600;">Expand depth, add proprietary data, upgrade internal links</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 14px 18px; font-weight: 700;">Blocked by robots.txt</td>
            <td style="padding: 14px 18px;">Accidental disallow directive</td>
            <td style="padding: 14px 18px;">Page body cannot be fetched</td>
            <td style="padding: 14px 18px; color: #16a34a; font-weight: 600;">Remove conflicting rules and resubmit XML sitemap</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Frequently Asked Questions About Search Console Crawl Errors</h2>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 22px; border-radius: 4px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #0f172a; font-size: 1.15rem;">How quickly does Google update Search Console after I fix a crawl error?</h3>
      <p style="color: #475569; margin-bottom: 18px; line-height: 1.65;">When you click "Validate Fix" in Search Console, Google initiates a preliminary check on a sample of URLs. Full validation across thousands of pages generally takes between 7 to 28 days depending on your site crawl budget and server speed.</p>

      <h3 style="color: #0f172a; font-size: 1.15rem;">Do 404 errors hurt your overall website rankings?</h3>
      <p style="color: #475569; margin-bottom: 18px; line-height: 1.65;">Standard 404 status codes on legitimately deleted pages do not harm other pages on your domain. However, widespread 404s on core navigational links or URLs with authoritative external backlinks waste valuable link equity and degrade user experience.</p>

      <h3 style="color: #0f172a; font-size: 1.15rem;">What is the fastest way to request re-indexing for a corrected page?</h3>
      <p style="color: #475569; margin-bottom: 18px; line-height: 1.65;">Open the URL Inspection tool in Search Console, enter the exact URL, click "Test Live URL" to ensure clean rendering, and click "Request Indexing". For bulk updates, update the lastmod timestamp in your XML sitemap and resubmit the sitemap feed.</p>

      <h3 style="color: #0f172a; font-size: 1.15rem;">Why do my organic impressions drop suddenly without manual actions?</h3>
      <p style="color: #475569; margin-bottom: 18px; line-height: 1.65;">Sudden impression drops usually trace back to server latency spikes, accidental noindex deployments in header templates, broken canonical tags, or Googlebot encountering widespread 5xx errors during an update.</p>

      <h3 style="color: #0f172a; font-size: 1.15rem;">How does fixing crawl errors translate into higher organic revenue?</h3>
      <p style="color: #475569; margin: 0; line-height: 1.65;">Fixing crawl errors allows Googlebot to index your high-margin commercial landing pages, category archives, and product variants. As index coverage approaches 95%+, impressions expand across long-tail buyer queries, producing steady organic traffic and higher sales conversions.</p>
    </div>

    <!-- CONVERSION CALL TO ACTION -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #334155; border-radius: 4px; padding: 36px 30px; margin: 40px 0; text-align: center; color: #ffffff; box-shadow: 0 15px 35px -5px rgba(15, 23, 42, 0.3);">
      <div style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 4px 14px; border-radius: 4px; font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">
        Fix Your Technical SEO Bottlenecks
      </div>
      <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 1.6rem; font-weight: 800;">
        Ready to Eliminate Crawl Errors and Scale Search Impressions?
      </h3>
      <p style="color: #cbd5e1; margin: 0 auto 26px; font-size: 1.02rem; max-width: 640px; line-height: 1.7;">
        Do not let hidden server errors, soft 404s, or canonical loops suppress your search potential. Partner directly with <strong>Abdullah Saleh</strong> for a complete technical audit and enterprise-grade SEO implementation.
      </p>
      <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <a href="https://wa.me/8801670769816" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: #00B365; color: #ffffff; padding: 14px 28px; border-radius: 4px; font-weight: 800; font-size: 0.98rem; text-decoration: none; box-shadow: 0 6px 20px rgba(0, 179, 101, 0.35);">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Chat on WhatsApp</span>
        </a>
        <a href="/contact" style="display: inline-flex; align-items: center; gap: 8px; background: #00D2D3; color: #0f172a; padding: 14px 28px; border-radius: 4px; font-weight: 800; font-size: 0.98rem; text-decoration: none; box-shadow: 0 6px 20px rgba(0, 210, 211, 0.3);">
          <i class="fa-solid fa-calendar-check"></i>
          <span>Book Free Technical Audit</span>
        </a>
        <a href="/services/technical-seo-service-in-bangladesh" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); padding: 14px 24px; border-radius: 4px; font-weight: 700; font-size: 0.98rem; text-decoration: none; backdrop-filter: blur(8px);">
          <span>View Technical SEO Services</span>
        </a>
      </div>
    </div>
  `
};

async function publish() {
  console.log("=== PUBLISHING BLOG POST ===");
  console.log("Title:", blogPost.title);
  console.log("Slug:", blogPost.slug);

  // 1. Save draft json & md in lib/blog-drafts
  if (!fs.existsSync(draftsDir)) {
    fs.mkdirSync(draftsDir, { recursive: true });
  }
  const draftJsonPath = path.join(draftsDir, `${blogPost.slug}.json`);
  const draftMdPath = path.join(draftsDir, `${blogPost.slug}.md`);

  fs.writeFileSync(draftJsonPath, JSON.stringify(blogPost, null, 2), "utf-8");
  console.log("Saved draft JSON:", draftJsonPath);

  const mdContent = `# ${blogPost.title}\n\n**Published:** ${blogPost.publish_date}\n**Category:** ${blogPost.category}\n**Featured Image:** ${blogPost.featured_image}\n\n${blogPost.summary}\n\n${blogPost.content}`;
  fs.writeFileSync(draftMdPath, mdContent, "utf-8");
  console.log("Saved draft MD:", draftMdPath);

  // 2. Insert into lib/data.js at top of blogPosts array
  let dataJs = fs.readFileSync(dataJsPath, "utf-8");
  if (dataJs.includes(`slug: "${blogPost.slug}"`) || dataJs.includes(`"slug": "${blogPost.slug}"`)) {
    console.log("Post already exists in lib/data.js, skipping injection.");
  } else {
    const target = "export const blogPosts = [";
    const postCode = `  ${JSON.stringify(blogPost, null, 2)},`;
    dataJs = dataJs.replace(target, `${target}\n${postCode}`);
    fs.writeFileSync(dataJsPath, dataJs, "utf-8");
    console.log("Successfully injected into lib/data.js!");
  }

  // 3. Insert into lib/cms-data.json
  if (fs.existsSync(cmsJsonPath)) {
    const cmsData = JSON.parse(fs.readFileSync(cmsJsonPath, "utf-8"));
    if (Array.isArray(cmsData.blogPosts)) {
      const existingIdx = cmsData.blogPosts.findIndex((p) => p.slug === blogPost.slug);
      if (existingIdx >= 0) {
        cmsData.blogPosts[existingIdx] = blogPost;
      } else {
        cmsData.blogPosts.unshift(blogPost);
      }
      fs.writeFileSync(cmsJsonPath, JSON.stringify(cmsData, null, 2), "utf-8");
      console.log("Successfully synced with lib/cms-data.json! Total posts:", cmsData.blogPosts.length);
    }
  }

  // 4. Sync to Firestore
  console.log("Syncing to Firestore cms_content/blogPosts...");
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const cmsRaw = JSON.parse(fs.readFileSync(cmsJsonPath, "utf-8"));
    const posts = cmsRaw.blogPosts || [];
    const docRef = doc(db, "cms_content", "blogPosts");
    await setDoc(docRef, { value: posts, updatedAt: new Date().toISOString() });
    console.log("FIRESTORE SYNC SUCCESS! " + posts.length + " posts synced to Firestore.");
  } catch (err) {
    console.error("Firestore sync error:", err.message);
  }

  console.log("=== BLOG PUBLISH COMPLETED SUCCESSFULLY ===");
}

publish().catch((err) => {
  console.error("Fatal error during publish:", err);
  process.exit(1);
});
