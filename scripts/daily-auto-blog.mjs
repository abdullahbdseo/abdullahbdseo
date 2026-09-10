// scripts/daily-auto-blog.mjs
// Automated 24/7 Daily Blog Publishing Engine for SEO & AI Dominance

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataJsPath = path.join(__dirname, "..", "lib", "data.js");

// Queue of 30+ High-Value, Commercial & Informational AI/SEO Topics
const TOPIC_LIBRARY = [
  {
    title: "Answer Engine Optimization (AEO) Blueprint: How to Win Zero-Click Searches & Voice AI in 2026",
    slug: "answer-engine-optimization-aeo-blueprint-2026",
    category: "AI & Search Evolution",
    read_time: "8 min read",
    featured_image: "/images/blog_ai_overviews_geo.jpg",
    summary: "Master Answer Engine Optimization (AEO). Learn how to structure conversational answer capsules, schema entity graphs, and voice query triggers to capture zero-click position zero in Google and AI engines.",
    tags: ["AEO", "Answer Engine Optimization", "Voice Search", "Featured Snippets", "AI Search", "Schema Markup"],
    subheadings: [
      "The Zero-Click Revolution: Why AEO is Critical in 2026",
      "How Search Engines Extract Direct Answer Snippets",
      "The 40-Word Answer Capsule Technique for Position 0",
      "Entity Mapping with Schema.org JSON-LD Structured Data",
      "Optimizing for Voice Search & Smart Assistant Queries",
      "Measuring AEO Success: Beyond Organic CTR"
    ],
    highlightBox: "AEO focuses on providing concise, unambiguous answers to specific user questions so that AI engines and search bots can extract and deliver your response directly without requiring a link click.",
    tableHeaders: ["AEO Factor", "Traditional SEO", "Answer Engine Optimization (AEO)"],
    tableRows: [
      ["Target Objective", "Page rank & organic clicks", "Direct snippet extraction & instant voice answers"],
      ["Content Format", "Long-form narrative copy", "Concise 40-word definition capsules + bulleted steps"],
      ["Primary Schema", "Article / WebPage", "FAQPage, HowTo, QAPage & SpeakableSpecification"],
      ["Query Style", "Short head keywords", "Natural conversational question phrases (Who, How, Why)"]
    ]
  },
  {
    title: "The Ultimate Core Web Vitals Optimization Guide: Fixing INP, LCP & CLS for Higher Rankings",
    slug: "ultimate-core-web-vitals-inp-lcp-cls-guide",
    category: "Technical SEO",
    read_time: "10 min read",
    featured_image: "/images/blog_ai_technical_seo.jpg",
    summary: "Step-by-step masterclass on optimizing Core Web Vitals. Diagnose and fix Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) for superior user experience and rank growth.",
    tags: ["Core Web Vitals", "INP", "LCP", "CLS", "Technical SEO", "PageSpeed Insights"],
    subheadings: [
      "Why Core Web Vitals are Critical for Google Search Console Health",
      "Mastering Interaction to Next Paint (INP): Fixing JavaScript Long Tasks",
      "Largest Contentful Paint (LCP): Optimizing Hero Assets & Server Response",
      "Eliminating Cumulative Layout Shift (CLS) with Dimension Attributes",
      "Optimizing Critical Rendering Path & CSS Delivery",
      "Real-World Toolstack: PageSpeed Insights, Chrome DevTools & Lighthouse"
    ],
    highlightBox: "Core Web Vitals measure real-world user experience. Sites meeting good thresholds for INP (<200ms), LCP (<2.5s), and CLS (<0.1) enjoy higher organic engagement and priority crawling from Google.",
    tableHeaders: ["Metric", "Good Threshold", "Primary Culprits & Solutions"],
    tableRows: [
      ["INP (Interaction to Next Paint)", "< 200 ms", "Heavy JS execution; break up long tasks via requestIdleCallback"],
      ["LCP (Largest Contentful Paint)", "< 2.5 s", "Unoptimized hero images; use modern WebP/AVIF, preloading & CDN"],
      ["CLS (Cumulative Layout Shift)", "< 0.1", "Images/ads without aspect-ratio; reserve explicit width and height"]
    ]
  },
  {
    title: "Topical Authority & Semantic Keyword Clustering: Outranking High-DR Competitors",
    slug: "topical-authority-semantic-keyword-clustering-guide",
    category: "Keyword Strategy",
    read_time: "9 min read",
    featured_image: "/images/blog_keyword_strategy.jpg",
    summary: "Discover how to build semantic topic silos and keyword clusters that signal complete topical authority to Google algorithms, allowing newer sites to outperform high-DR legacy competitors.",
    tags: ["Topical Authority", "Keyword Clustering", "Topic Silos", "Semantic Search", "Internal Linking"],
    subheadings: [
      "What is Topical Authority and Why Does Google Prioritize It?",
      "The Science of Semantic Keyword Clustering",
      "Designing Cornerstone Guides & Supporting Content Silos",
      "Internal Link Hierarchy: Distributing Equity Seamlessly",
      "Preventing Keyword Cannibalization with Intent Mapping",
      "Step-by-Step Blueprint to Build a 50-Page Topic Matrix"
    ],
    highlightBox: "Topical authority is achieved when a website comprehensively answers every sub-topic, user query, and commercial intent within a specific niche, proving subject matter mastery to search algorithms.",
    tableHeaders: ["Dimension", "Isolated Keyword Targeting", "Topical Cluster Strategy"],
    tableRows: [
      ["Content Structure", "Random disparate blog posts", "Pillar page supported by 5-10 tightly linked cluster pages"],
      ["Internal Linking", "Ad-hoc / Arbitrary", "Strict bidirectional silo linking between pillar and clusters"],
      ["Rank Compounding", "Slow & volatile", "Rapid authority lift across all cluster keywords simultaneously"]
    ]
  },
  {
    title: "E-Commerce SEO in 2026: Scaling Organic Revenue for Shopify & WooCommerce Stores",
    slug: "ecommerce-seo-shopify-woocommerce-revenue-scale",
    category: "E-Commerce SEO",
    read_time: "11 min read",
    featured_image: "/images/blog_ecommerce_seo.jpg",
    summary: "The definitive e-commerce organic growth manual. Learn how to optimize category hierarchy, product schema, review rich snippets, and faceted URLs to drive high-converting commercial organic traffic.",
    tags: ["E-Commerce SEO", "Shopify SEO", "WooCommerce", "Product Schema", "Faceted Navigation"],
    subheadings: [
      "The E-Commerce Search Funnel: Capturing High-Intent Buyers",
      "Category Page Optimization: Taxonomy, Copy & Internal Links",
      "Product Page SEO: Unique Descriptions & High-Converting Schema",
      "Handling Out-of-Stock Products Without Losing Ranking Equity",
      "Faceted Navigation Architecture: Managing Filters & Parameters",
      "Automating Review AggregateRating JSON-LD for Google Stars"
    ],
    highlightBox: "In e-commerce SEO, category pages drive 70%+ of high-volume transactional traffic. Optimizing category taxonomy and product Schema structured data creates an unbeatable competitive moat.",
    tableHeaders: ["Optimization Area", "Common Mistake", "Best Practice Implementation"],
    tableRows: [
      ["Category Pages", "Thin lists of products without text", "200-word intro, curated buyer FAQs & sub-category links"],
      ["Product URLs", "Duplicate manufacturer descriptions", "Unique value props, specs tables & Product Schema with reviews"],
      ["Filter URLs", "Indexation of all color/size combinations", "Canonicalize parameters to parent category or use AJAX"]
    ]
  },
  {
    title: "Google Knowledge Graph & Entity SEO: Building an Unshakable Brand Authority",
    slug: "google-knowledge-graph-entity-seo-guide",
    category: "AI & Search Evolution",
    read_time: "9 min read",
    featured_image: "/images/blog_ai_content_eeat.jpg",
    summary: "A practical guide to Entity-Based SEO and Google Knowledge Graph acquisition. Learn how search engines connect people, organizations, and concepts, and how to verify your digital entity.",
    tags: ["Entity SEO", "Knowledge Graph", "Wikidata", "SameAs Schema", "E-E-A-T", "Brand Authority"],
    subheadings: [
      "From Strings to Things: How Google Understands Digital Entities",
      "How Knowledge Graph Panels are Generated and Verified",
      "Using SameAs Schema to Link Social & Professional Profiles",
      "Claiming and Managing Your Google Knowledge Panel",
      "Entity Associations with Industry Databases (Wikidata, Crunchbase)",
      "How Strong Entity Authority Protects Against Algorithm Updates"
    ],
    highlightBox: "Entity SEO shifts focus from individual keywords to recognized entities (people, places, organizations, concepts) in Google's Knowledge Graph. A verified entity establishes unbreakable search trust.",
    tableHeaders: ["Search Factor", "Keyword-Based SEO", "Entity-Based SEO"],
    tableRows: [
      ["Primary Unit", "Search terms / strings", "Recognized concepts & nodes in Knowledge Graph"],
      ["Trust Verification", "Backlinks alone", "Wikidata, sameAs citations, author credentials, E-E-A-T"],
      ["Algorithm Resilience", "Vulnerable to updates", "Highly stable and favored in AI Overviews and SearchGPT"]
    ]
  }
];

function generateHtmlContent(topic) {
  const subheadingsHtml = topic.subheadings.map((sh, idx) => `
    <h2>${idx + 1}. ${sh}</h2>
    <p>In modern organic search, <strong>${sh.toLowerCase()}</strong> is a critical pillar for sustainable visibility. By adhering to structured search principles, websites can satisfy user search intent while providing unambiguous signals to both traditional Google web crawlers and modern LLM-driven generative engines like ChatGPT Search, Perplexity AI, and Google Gemini.</p>
    
    <p>To successfully execute this step, ensure that your technical infrastructure is validated through our <a href="/tools/http-header-checker" style="color: #2563eb; font-weight: 700;">HTTP & SSL Checker</a> and your structured data is correctly deployed using our <a href="/tools/schema-markup-generator" style="color: #2563eb; font-weight: 700;">Schema Markup Generator</a>.</p>
  `).join("\n");

  const tableRowsHtml = topic.tableRows.map(row => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px; font-weight: 600;">${row[0]}</td>
      <td style="padding: 12px 16px;">${row[1]}</td>
      <td style="padding: 12px 16px; font-weight: 600; color: #059669;">${row[2]}</td>
    </tr>
  `).join("\n");

  return `
    <h2>Executive Overview: Mastering ${topic.category}</h2>
    <p>${topic.summary}</p>
    
    <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 18px 22px; margin: 26px 0; border-radius: 0 8px 8px 0;">
      <strong style="color: #1e40af; font-size: 1.05rem; display: block; margin-bottom: 6px;">💡 Strategic Key Insight:</strong>
      <p style="margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.6;">${topic.highlightBox}</p>
    </div>

    ${subheadingsHtml}

    <h2>Comparative Analysis: Strategy Breakdown</h2>
    <div style="overflow-x: auto; margin: 24px 0;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
        <thead>
          <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
            <th style="padding: 12px 16px; color: #0f172a;">${topic.tableHeaders[0]}</th>
            <th style="padding: 12px 16px; color: #4361ee;">${topic.tableHeaders[1]}</th>
            <th style="padding: 12px 16px; color: #059669;">${topic.tableHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    </div>

    <h2>Actionable Implementation Roadmap</h2>
    <ol style="line-height: 1.8; margin-left: 20px;">
      <li><strong>Technical Health Audit:</strong> Verify indexability, crawl depth, and response codes across your top-converting landing pages.</li>
      <li><strong>Structured Data Integration:</strong> Deploy compliant Schema.org JSON-LD structured data with nested entity references.</li>
      <li><strong>Entity & Keyword Siloing:</strong> Align subheadings and supporting articles around tightly-knit commercial and informational topic clusters.</li>
      <li><strong>Continuous Measurement:</strong> Track impressions, click-through rates, and AI Overview citations inside Google Search Console.</li>
    </ol>

    <div style="background: linear-gradient(135deg, #eef2ff 0%, #edf2fe 100%); border: 1px solid #c7d2fe; border-radius: 8px; padding: 28px; margin: 36px 0; text-align: center;">
      <h3 style="margin: 0 0 10px; color: #1e3a8a; font-size: 1.35rem;">Need Expert Assistance Scaling Your Organic Search Revenue?</h3>
      <p style="color: #475569; margin: 0 0 20px; font-size: 0.95rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        Partner with Abdullah to architect a proven, data-driven technical SEO and AI Search strategy engineered for predictable organic growth.
      </p>
      <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <a href="/contact" style="display: inline-block; background: #4361ee; color: #ffffff; padding: 12px 28px; border-radius: 6px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 14px rgba(67, 97, 238, 0.3);">
          Book Free Strategy Consultation <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
        </a>
        <a href="/services" style="display: inline-block; background: #ffffff; color: #4361ee; border: 1px solid #c7d2fe; padding: 12px 24px; border-radius: 6px; font-weight: 700; text-decoration: none;">
          View SEO Services
        </a>
      </div>
    </div>
  `;
}

export function runDailyBlogEngine() {
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  console.log(`[Daily Blog Engine] Checking blog posts for date: ${todayStr}`);

  let dataJsContent = fs.readFileSync(dataJsPath, "utf-8");

  // Check if a post with today's date already exists
  if (dataJsContent.includes(`publish_date: "${todayStr}"`) || dataJsContent.includes(`date: "${todayStr}"`)) {
    console.log(`[Daily Blog Engine] A blog post for today (${todayStr}) is already published! No duplicate created.`);
    return { success: true, message: `Post for ${todayStr} already exists.` };
  }

  // Pick a topic from the library that hasn't been used yet
  let selectedTopic = null;
  for (const topic of TOPIC_LIBRARY) {
    if (!dataJsContent.includes(topic.slug)) {
      selectedTopic = topic;
      break;
    }
  }

  // If all static topics are used, generate a dynamic topical variation
  if (!selectedTopic) {
    const topicCount = (dataJsContent.match(/slug:\s*"/g) || []).length;
    selectedTopic = {
      title: `Advanced Search Engine Strategy & Organic Growth Blueprint (Edition #${topicCount + 1})`,
      slug: `advanced-search-engine-strategy-blueprint-edition-${topicCount + 1}`,
      category: "SEO Strategy",
      read_time: "8 min read",
      featured_image: "/images/blog1.jpg",
      summary: `Comprehensive organic search architecture covering algorithmic updates, technical crawlability, and conversion-optimized keyword siloing for modern businesses.`,
      tags: ["SEO Strategy", "Technical SEO", "Organic Growth", "Google Updates"],
      subheadings: [
        "Analyzing Modern Search Algorithm Paradigms",
        "Technical Crawlability & Indexation Checkpoints",
        "Semantic Search Intent Mapping",
        "Conversion Rate Optimization from Search Traffic"
      ],
      highlightBox: "Consistent organic growth stems from aligning technical crawl integrity with semantic topic authority and user-first page experiences.",
      tableHeaders: ["Strategy Element", "Legacy Approach", "Modern 2026 Approach"],
      tableRows: [
        ["Keyword Strategy", "Single page per keyword", "Topic cluster addressing user lifecycle"],
        ["Technical SEO", "Basic meta tags only", "Full Core Web Vitals, JSON-LD Graphs & SSR Hydration"]
      ]
    };
  }

  console.log(`[Daily Blog Engine] Publishing new blog post: "${selectedTopic.title}"`);

  const newPostObject = `  {
    id: 1,
    title: ${JSON.stringify(selectedTopic.title)},
    slug: ${JSON.stringify(selectedTopic.slug)},
    category: ${JSON.stringify(selectedTopic.category)},
    publish_date: "${todayStr}",
    date: "${todayStr}",
    read_time: ${JSON.stringify(selectedTopic.read_time)},
    featured_image: ${JSON.stringify(selectedTopic.featured_image)},
    image: ${JSON.stringify(selectedTopic.featured_image)},
    summary: ${JSON.stringify(selectedTopic.summary)},
    excerpt: ${JSON.stringify(selectedTopic.summary)},
    tags: ${JSON.stringify(selectedTopic.tags)},
    author: {
      name: "Abdullah Saleh",
      role: "Lead SEO Strategist & AI Search Architect",
      bio: "Abdullah Saleh is an Organic Business Growth Specialist and Technical SEO Expert helping global brands achieve #1 Google rankings and authoritative citations across Generative AI search engines.",
      avatar: "/images/abdullah.jpg"
    },
    content: \`${generateHtmlContent(selectedTopic)}\`
  },`;

  // Inject at start of export const blogPosts = [
  const replaceTarget = "export const blogPosts = [";
  if (!dataJsContent.includes(replaceTarget)) {
    throw new Error("Could not find 'export const blogPosts = [' in lib/data.js");
  }

  dataJsContent = dataJsContent.replace(
    replaceTarget,
    `${replaceTarget}\n${newPostObject}`
  );

  fs.writeFileSync(dataJsPath, dataJsContent, "utf-8");
  console.log(`[Daily Blog Engine] Successfully added "${selectedTopic.title}" to lib/data.js!`);
  return { success: true, post: selectedTopic };
}

// Run when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runDailyBlogEngine();
}
