// lib/data.js - Central Data Store for Next.js (Services, Portfolio, Blogs, FAQs, Testimonials, Settings)

export const siteSettings = {
  site_name: "Abdullah Saleh",
  site_tagline: "SEO Specialist & Organic Growth Strategist",
  site_logo_text: "Abdullah Saleh",
  site_logo_image: "/images/logo.svg",
  site_favicon: "/images/favicon.svg",
  primary_color: "#4361ee",
  accent_color: "#06b6d4",
  expert_name: "Abdullah Saleh",
  expert_title: "Best SEO Expert in Bangladesh & Organic Growth Specialist",
  expert_bio: "Abdullah Saleh is an Organic Business Growth Specialist and SEO Expert in Bangladesh with 6+ years of experience helping 100+ businesses grow through search, technical SEO, content, and AI SEO.",
  profile_photo: "/images/abdullah.jpg",
  contact_email: "abdullahbd.seo@gmail.com",
  contact_phone: "+880 1670-769816",
  whatsapp_number: "+8801670769816",
  office_address: "Silicon Oasis Tech Park, Suite 402, New York, NY 10001",
  working_hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
  social_linkedin: "https://linkedin.com/in/abdullah-saleh-seo",
  social_twitter: "https://twitter.com/abdullahsaleh_seo",
  social_github: "https://github.com",
  social_youtube: "https://youtube.com",
  default_meta_title: "Best SEO Expert in Bangladesh – Abdullah Saleh | Organic Growth Specialist",
  default_meta_description: "Abdullah Saleh is an Organic Business Growth Specialist and Best SEO Expert in Bangladesh with 6+ years of experience helping 100+ businesses achieve #1 Google rankings through Technical SEO, Local SEO, Ecommerce SEO, and AI Search Optimization.",
  default_meta_keywords: "Best SEO Expert in Bangladesh, SEO Expert in Bangladesh, Abdullah Saleh, Organic Business Growth Specialist, Local SEO Bangladesh, Technical SEO, Ecommerce SEO, AI SEO, AEO, GEO, LLM SEO",
  crypto_payment_enabled: true,
  usdt_trc20_address: "TNowPaymentsDemoTrc20DepositAddress999",
  usdt_erc20_address: "0x71C...DemoEthereumWalletAddressForUSDT999",
  btc_address: "bc1qnowpaymentsdemobtcaddress777",
  eth_address: "0xNowPaymentsDemoEthAddress88888888",
  sol_address: "NowPaymentsDemoSolanaDepositAddress444",
  payment_expiry_minutes: 60,
  bkash_enabled: true,
  bkash_number: "01670769816",
  bkash_type: "Personal / Merchant",
  bkash_rate: 122.50,
  bkash_instructions: "1. Open bKash App or dial *247#\n2. Select Send Money (or Make Payment)\n3. Enter Account Number: 01670769816\n4. Enter total BDT amount\n5. Enter Reference: Your Name / Order ID\n6. Copy the TrxID and paste it below"
};

export const serviceCategories = [
  { id: 1, name: "Technical & Auditing", slug: "technical-auditing", description: "Core technical crawlability, Core Web Vitals, and structural site audits." },
  { id: 2, name: "On-Page & Content", slug: "on-page-content", description: "Content optimization, search intent alignment, and keyword clustering." },
  { id: 3, name: "E-Commerce & Specialized", slug: "ecommerce-specialized", description: "Shopify, WooCommerce, Local SEO and international multi-lingual SEO." },
  { id: 4, name: "Off-Page & Authority", slug: "off-page-authority", description: "High-authority backlink strategies, digital PR, and brand citations." }
];

export const services = [
  {
    id: 1,
    category_id: 1,
    title: "Comprehensive Technical SEO Audit",
    slug: "technical-seo-audit",
    short_description: "Uncover every crawl blocker, indexation issue, site architecture flaw, and Core Web Vitals bottleneck.",
    description: "A forensic deep-dive into your website architecture. We inspect over 230+ technical checkpoints including crawl depth, robots directives, JS rendering, canonicalization, broken internal links, structured data validation, server response times, and Core Web Vitals compliance. You receive a prioritized, developer-ready action roadmap.",
    icon: "fa-screwdriver-wrench",
    is_featured: true,
    starting_price: 350,
    delivery_time: "5-7 Business Days",
    packages: [
      {
        id: 101,
        name: "Essential Audit",
        slug: "essential",
        short_description: "For websites up to 500 pages needing a quick health check.",
        price: 350,
        delivery_days: 5,
        revisions: 1,
        features: [
          "Up to 500 pages crawled",
          "Robots.txt & Sitemap check",
          "Indexing & Canonical audit",
          "Speed & Core Web Vitals report",
          "Executive PDF summary report",
          "30-min strategy debrief call"
        ]
      },
      {
        id: 102,
        name: "Standard Audit (Most Popular)",
        slug: "standard",
        short_description: "Complete technical & architectural analysis for growing websites.",
        price: 650,
        delivery_days: 7,
        revisions: 2,
        is_popular: true,
        features: [
          "Up to 5,000 pages crawled",
          "JavaScript rendering inspection",
          "Full internal link equity mapping",
          "Schema / Structured data validation",
          "Competitor technical benchmark",
          "Prioritized developer task sheet",
          "60-min video walk-through"
        ]
      },
      {
        id: 103,
        name: "Enterprise Deep-Dive",
        slug: "enterprise",
        short_description: "For large e-commerce, SaaS, or multi-lingual websites.",
        price: 1200,
        delivery_days: 12,
        revisions: 3,
        features: [
          "Up to 50,000+ pages crawled",
          "Faceted navigation & parameter analysis",
          "Log file server crawl analysis",
          "Hreflang & international SEO audit",
          "Direct developer integration support",
          "14 days post-audit Q&A support"
        ]
      }
    ],
    faqs: [
      { q: "What access do you need to perform the audit?", a: "We will need read access to Google Search Console and Google Analytics, plus your website URL." },
      { q: "Do you fix the technical issues for us?", a: "The audit includes step-by-step developer tickets. If you need us to directly implement fixes, we can add implementation hours." },
      { q: "How long does it take?", a: "Typically between 5 to 10 business days depending on site size." }
    ]
  },
  {
    id: 2,
    category_id: 2,
    title: "Strategic Keyword Research & Topic Clustering",
    slug: "keyword-research-topic-clustering",
    short_description: "Discover high-intent, low-competition keywords grouped into topical authority clusters.",
    description: "Stop writing random blog posts that never rank. We build a comprehensive content blueprint based on search intent, buyer journey stages (Top of Funnel, Middle of Funnel, Bottom of Funnel), and search volume dynamics to establish topical authority in your niche.",
    icon: "fa-magnifying-glass-chart",
    is_featured: true,
    starting_price: 250,
    delivery_time: "4-6 Business Days",
    packages: [
      {
        id: 201,
        name: "Starter Cluster",
        slug: "starter",
        short_description: "Targeted keyword research for 1 core niche or product category.",
        price: 250,
        delivery_days: 4,
        revisions: 1,
        features: [
          "50+ vetted keyword targets",
          "Search intent classification",
          "Competitor keyword gap analysis",
          "Search volume & difficulty metrics",
          "Google Sheet deliverable"
        ]
      },
      {
        id: 202,
        name: "Growth Authority Blueprint",
        slug: "growth",
        short_description: "Full topic cluster blueprint for 3-5 core service/product pillars.",
        price: 500,
        delivery_days: 6,
        revisions: 2,
        is_popular: true,
        features: [
          "150+ categorized keywords",
          "Pillar-cluster content architecture",
          "Search intent & content angle mapping",
          "Internal linking roadmap",
          "Content brief templates (3 included)",
          "Competitor ranking benchmarks"
        ]
      },
      {
        id: 203,
        name: "Full Market Domination Plan",
        slug: "full-market",
        short_description: "Comprehensive 6-month content strategy and keyword architecture.",
        price: 950,
        delivery_days: 10,
        revisions: 3,
        features: [
          "400+ targeted keywords",
          "Full buyer stage matrix (TOFU, MOFU, BOFU)",
          "10 detailed content briefs ready for writers",
          "Cannibalization risk audit",
          "6-month publication calendar",
          "Consulting strategy call"
        ]
      }
    ],
    faqs: [
      { q: "What tools do you use for keyword data?", a: "We use professional subscriptions of Ahrefs, Semrush, Google Keyword Planner, AlsoAsked, and proprietary NLP clustering scripts." },
      { q: "Do you provide ready-to-write briefs?", a: "Yes, the Growth and Enterprise tiers include structured outlines and heading recommendations." }
    ]
  },
  {
    id: 3,
    category_id: 3,
    title: "E-Commerce SEO Overhaul (Shopify / WooCommerce)",
    slug: "ecommerce-seo-optimization",
    short_description: "Optimize category pages, product filters, structured data, and transactional search signals.",
    description: "Maximize high-margin organic revenue for your online store. We optimize your catalog taxonomy, resolve duplicate product variations and faceted navigation traps, write conversion-friendly schema markup (Product, AggregateOffer, Review), and optimize high-converting category hubs.",
    icon: "fa-bag-shopping",
    is_featured: true,
    starting_price: 490,
    delivery_time: "7-10 Business Days",
    packages: [
      {
        id: 301,
        name: "Store Foundation",
        slug: "foundation",
        short_description: "For stores with up to 100 products and 10 categories.",
        price: 490,
        delivery_days: 7,
        revisions: 1,
        features: [
          "10 Top category pages optimized",
          "Rich product snippet schema setup",
          "Shopify / WooCommerce URL audit",
          "Duplicate content cleanup",
          "Speed optimization recommendations"
        ]
      },
      {
        id: 302,
        name: "Scale & Dominate",
        slug: "scale",
        short_description: "Complete optimization for stores with up to 500 products.",
        price: 890,
        delivery_days: 10,
        revisions: 2,
        is_popular: true,
        features: [
          "25 Category hubs optimized",
          "Faceted search & filter SEO structure",
          "Product schema with reviews/stock status",
          "Internal linking & breadcrumbs overhaul",
          "Image SEO & compression strategy",
          "Competitor product gap report"
        ]
      },
      {
        id: 303,
        name: "Enterprise E-Commerce",
        slug: "enterprise",
        short_description: "For stores with thousands of SKUs and international markets.",
        price: 1600,
        delivery_days: 15,
        revisions: 3,
        features: [
          "Full catalog taxonomy architecture",
          "Multi-currency / Multi-region SEO",
          "Custom schema integration",
          "Dynamic metadata template design",
          "Full developer implementation support",
          "Monthly KPI tracking dashboard"
        ]
      }
    ],
    faqs: [
      { q: "Do you work directly on Shopify / WooCommerce?", a: "Yes, we can work directly inside your store backend with collaborator access or provide complete developer specifications." },
      { q: "How does this affect my store conversion rate?", a: "Our on-page optimizations are strictly designed for high readability and buyer trust, improving both search rankings and on-page checkout conversion." }
    ]
  },
  {
    id: 4,
    category_id: 1,
    title: "On-Page SEO & Content Optimization",
    slug: "on-page-seo-optimization",
    short_description: "Transform existing pages into search magnets with semantic entity optimization and UX refinement.",
    description: "Align your core landing pages with modern search intent and Google NLP ranking criteria. We optimize title tags, meta descriptions, heading structure (H1-H4), entity coverage, keyword placement, image ALT tags, and internal link equity.",
    icon: "fa-file-lines",
    is_featured: true,
    starting_price: 290,
    delivery_time: "5 Business Days",
    packages: [
      {
        id: 401,
        name: "5 Key Pages",
        slug: "5-pages",
        short_description: "Optimization for 5 high-priority landing or service pages.",
        price: 290,
        delivery_days: 5,
        revisions: 1,
        features: [
          "5 Important pages optimized",
          "Title tags & meta descriptions",
          "Header hierarchy & keyword optimization",
          "Image alt tags & file naming",
          "Internal linking suggestions"
        ]
      },
      {
        id: 402,
        name: "15 Key Pages (Best Value)",
        slug: "15-pages",
        short_description: "Comprehensive optimization for 15 core revenue pages.",
        price: 590,
        delivery_days: 8,
        revisions: 2,
        is_popular: true,
        features: [
          "15 Core pages optimized",
          "NLP entity and semantic keyword enrichment",
          "Conversion-focused CTA placement",
          "Custom Schema markup for each page",
          "Internal linking flow implementation",
          "Before / After tracking sheet"
        ]
      },
      {
        id: 403,
        name: "Full Site Overhaul (30+ Pages)",
        slug: "full-site",
        short_description: "Complete on-page transformation for up to 30 landing pages.",
        price: 1100,
        delivery_days: 14,
        revisions: 3,
        features: [
          "30+ Landing & blog pages optimized",
          "Full content refresh recommendations",
          "Cannibalization cleanup",
          "Custom JSON-LD schema suite",
          "Direct CMS implementation (WordPress/Webflow/Custom)",
          "30 days ranking monitoring"
        ]
      }
    ],
    faqs: [
      { q: "Will you write new copy or optimize existing copy?", a: "We enhance your existing copy with semantic keywords, optimized structure, and missing topical entities while preserving your brand voice." }
    ]
  },
  {
    id: 5,
    category_id: 4,
    title: "High-Authority Link Building & Digital PR",
    slug: "authority-link-building-strategy",
    short_description: "Secure contextual, high-DR editorial backlinks and brand mentions to boost domain trust.",
    description: "Build rock-solid domain authority with 100% white-hat, contextual links from real websites in your industry. No spam PBNs, no link farms, no automated spam. We specialize in manual outreach, digital PR assets, resource page link building, and broken link reclamation.",
    icon: "fa-link",
    is_featured: true,
    starting_price: 600,
    delivery_time: "14-21 Business Days",
    packages: [
      {
        id: 501,
        name: "Authority Starter",
        slug: "starter",
        short_description: "3 High-tier contextual editorial backlinks (DR 40-60+).",
        price: 600,
        delivery_days: 14,
        revisions: 1,
        features: [
          "3 Editorial backlinks (DR 40+)",
          "Real websites with 5,000+ monthly traffic",
          "Contextual anchor text strategy",
          "Original 800+ word guest articles",
          "Dofollow permanent links",
          "Full transparent live link report"
        ]
      },
      {
        id: 502,
        name: "Growth Accelerator",
        slug: "growth",
        short_description: "7 Premium contextual backlinks (DR 50-75+).",
        price: 1350,
        delivery_days: 20,
        revisions: 2,
        is_popular: true,
        features: [
          "7 Contextual editorial links (DR 50+)",
          "Niche-relevant real organic traffic sites",
          "Strategic anchor text ratio distribution",
          "100% manual bespoke outreach",
          "Natural indexing confirmation",
          "Competitor backlink gap analysis included"
        ]
      },
      {
        id: 503,
        name: "Authority Domination",
        slug: "domination",
        short_description: "15 Top-tier backlinks and digital PR brand mentions.",
        price: 2750,
        delivery_days: 30,
        revisions: 3,
        features: [
          "15 Premium links (DR 60-80+)",
          "Major industry publication placements",
          "Digital PR linkable asset creation",
          "Targeted tier-2 anchor equity boost",
          "Dedicated link strategist support",
          "Guaranteed link replacement warranty (12 months)"
        ]
      }
    ],
    faqs: [
      { q: "Are these links safe from Google penalties?", a: "Absolutely. We only acquire links on real websites that have genuine search traffic and clean backlink profiles. We never use PBNs." },
      { q: "What happens if a link is dropped?", a: "We provide a 12-month replacement guarantee for all acquired editorial links." }
    ]
  },
  {
    id: 6,
    category_id: 3,
    title: "Local SEO & Google Business Profile Optimization",
    slug: "local-seo-gbp-optimization",
    short_description: "Dominate the Google Map Pack and drive local customer calls, inquiries, and foot traffic.",
    description: "Capture high-intent local customers looking for your services in your city or region. We optimize your Google Business Profile, fix NAP (Name, Address, Phone) citation consistency across 50+ local directories, build localized service pages, and implement LocalBusiness schema.",
    icon: "fa-location-dot",
    is_featured: true,
    starting_price: 300,
    delivery_time: "7 Business Days",
    packages: [
      {
        id: 601,
        name: "Single Location Starter",
        slug: "single-location",
        short_description: "Complete GBP setup and audit for 1 business location.",
        price: 300,
        delivery_days: 7,
        revisions: 1,
        features: [
          "Google Business Profile complete overhaul",
          "Primary & secondary category audit",
          "Local keyword geo-tagging strategy",
          "LocalBusiness Schema markup",
          "Review generation strategy guide"
        ]
      },
      {
        id: 602,
        name: "Map Pack Booster",
        slug: "map-pack",
        short_description: "Full local optimization including citations and geo-landing pages.",
        price: 550,
        delivery_days: 10,
        revisions: 2,
        is_popular: true,
        features: [
          "Everything in Starter tier",
          "30 High-authority local citations (NAP)",
          "3 Optimized local landing pages",
          "Local competitor proximity analysis",
          "Google Posts & photo optimization schedule",
          "Local rank tracking grid setup"
        ]
      },
      {
        id: 603,
        name: "Multi-Location / Regional",
        slug: "multi-location",
        short_description: "For multi-location businesses or service-area businesses across cities.",
        price: 990,
        delivery_days: 15,
        revisions: 3,
        features: [
          "Up to 3 distinct locations/profiles",
          "75+ Local business citations cleaned",
          "10 Geo-targeted service area pages",
          "Multi-location schema hierarchy",
          "Localized link outreach",
          "Monthly local performance reporting"
        ]
      }
    ],
    faqs: [
      { q: "How fast do Local Map Pack rankings improve?", a: "Local optimization changes can show improvements in the Google Map Pack within 3 to 6 weeks as citations and reviews sync." }
    ]
  }
];

export const pricingRetainers = [
  {
    name: "Starter Retainer",
    price: 125,
    period: "/month",
    description: "Essential monthly SEO support for small websites.",
    features: [
      "15 Target Keywords",
      "Full Technical SEO Audit",
      "On-Page Optimization (5 Pages)",
      "Monthly Performance Report",
      "Email Support"
    ],
    isPopular: false
  },
  {
    name: "Standard Retainer",
    price: 350,
    period: "/month",
    description: "Continuous organic growth engine for growing businesses.",
    features: [
      "30 Target Keywords",
      "Full Technical & Speed Audit",
      "On-Page Optimization (15 Pages)",
      "10 High-DA Backlinks / Month",
      "Bi-Weekly Progress Calls"
    ],
    isPopular: true
  },
  {
    name: "Growth Retainer",
    price: 550,
    period: "/month",
    description: "Aggressive keyword scaling and topic authority expansion.",
    features: [
      "60 Target Keywords",
      "Complete Site Optimization (30 Pages)",
      "25 High-DA Backlinks / Month",
      "Content Cluster Production",
      "Dedicated Account Strategist"
    ],
    isPopular: false
  },
  {
    name: "Enterprise Retainer",
    price: 850,
    period: "/month",
    description: "Full-scale SEO department dedicated to your enterprise brand.",
    features: [
      "Unlimited Keyword Targets",
      "Full Website Overhaul & Core Web Vitals",
      "50+ Premium Tier Backlinks / Month",
      "Weekly Video Growth Review",
      "24/7 Priority Support"
    ],
    isPopular: false
  }
];

export const caseStudies = [
  {
    id: 7,
    title: "Enterprise SEO Domination: Scaling to 1.18M Organic Clicks & 92.4% CTR",
    slug: "enterprise-seo-1-18m-clicks-gsc",
    client_name: "Global Digital Solutions",
    website_url: "https://example-globaldigital.com",
    industry: "Enterprise Technology / SaaS",
    category_name: "SaaS & Enterprise SEO",
    featured_image: "/images/portfolio/proof_gsc_1_18m_scale.jpg",
    summary: "Engineered high-intent search structure and technical optimization delivering 1.18 Million organic clicks with an unprecedented 92.4% click-through rate and #1 average position on Google Search Console.",
    challenge: "The client had significant traffic potential but was held back by deep site architecture flaws, internal link cannibalization, and suboptimal snippet CTR across major commercial keywords.",
    strategy: "Conducted an exhaustive 230-point technical crawl audit, rebuilt the internal silo hierarchy, deployed custom Product and FAQ JSON-LD schemas, and rewrote title/meta hooks to maximize search snippet click appeal.",
    implementation: [
      "Resolved 450+ canonical anomalies and duplicate URL parameters.",
      "Implemented automated breadcrumb and FAQ rich snippets.",
      "Built 40+ topic cluster pillar pages linking to core commercial hubs.",
      "Scaled high-tier contextual backlinks from DA 60+ industry portals."
    ],
    results: "Achieved 1.18 Million organic clicks and 1.28 Million impressions over a 3-month performance window with a remarkable 92.4% CTR and sustained #1 average position.",
    metrics: { total_clicks: "1.18M", total_impressions: "1.28M", avg_ctr: "92.4%", avg_position: "1.0" },
    duration: "3 Months"
  },
  {
    id: 8,
    title: "High-CTR Authority Portal: 809K Organic Clicks with Rank #1 Stability",
    slug: "authority-portal-809k-clicks-gsc",
    client_name: "Authority Web Services",
    website_url: "https://example-authorityportal.com",
    industry: "High-Traffic Web Platform",
    category_name: "SaaS & Enterprise SEO",
    featured_image: "/images/portfolio/proof_gsc_809k_clicks.jpg",
    summary: "Comprehensive technical SEO overhaul and rich snippets strategy generating 809,000+ organic clicks and 872,000 impressions with 92.8% CTR and #1 average ranking.",
    challenge: "High bounce rates and cannibalization between multiple overlapping service offerings prevented the domain from achieving peak rankings.",
    strategy: "Consolidated competing URLs with clean 301 redirects, rebuilt topic clusters around exact intent queries, and optimized above-the-fold content hierarchy.",
    implementation: [
      "Deployed comprehensive Schema.org structured data.",
      "Overhauled internal linking anchor equity distribution.",
      "Pruned low-quality legacy URLs to concentrate crawl budget.",
      "Optimized Core Web Vitals (LCP < 1.2s, INP < 100ms)."
    ],
    results: "Delivered 809K total clicks, 872K impressions, 92.8% average CTR, and rock-solid #1 average position across primary target queries.",
    metrics: { total_clicks: "809K", total_impressions: "872K", avg_ctr: "92.8%", avg_position: "1.0" },
    duration: "3 Months"
  },
  {
    id: 9,
    title: "Australian E-Commerce Brand: 85.1K Impressions Growth Surge",
    slug: "australia-ecommerce-organic-boost",
    client_name: "Australian National Brand (.com.au)",
    website_url: "https://example-australia-store.com.au",
    industry: "E-Commerce / Australia Retail",
    category_name: "E-Commerce SEO",
    featured_image: "/images/portfolio/proof_gsc_australia_growth.jpg",
    summary: "Rapid organic impressions surge to 85.1K impressions and 1.14K clicks across national Australian buyer search queries, moving rankings from page 2 directly into Top Tier.",
    challenge: "Stagnant rankings stuck on pages 2-3 of Google Australia with low search visibility against entrenched legacy retailers.",
    strategy: "Targeted high-converting Australian geo-intent keywords, resolved collection page crawl bloat, and earned high-tier AU domain backlinks.",
    implementation: [
      "Optimized 60+ collection and product category pages.",
      "Deployed Merchant and Offer schema for Google Shopping and organic rich badges.",
      "Improved mobile page speed by 58% and fixed layout shifts.",
      "Acquired 15+ Australian niche-relevant editorial links."
    ],
    results: "Organic impressions surged to 85.1K with 1,140+ targeted buyer clicks, climbing steadily up the ranks to average position 15.1 with multiple Page 1 breakouts.",
    metrics: { total_impressions: "85.1K", total_clicks: "1.14K", avg_ctr: "1.3%", avg_position: "15.1 -> Page 1" },
    duration: "3 Months"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "The Complete Technical SEO Audit Checklist for 2026",
    slug: "complete-technical-seo-audit-checklist",
    category: "Technical SEO",
    date: "2026-08-28",
    image: "/images/blog1.jpg",
    excerpt: "A step-by-step master checklist to diagnose crawl waste, indexation issues, JavaScript rendering hurdles, and Core Web Vitals bottlenecks.",
    content: `
      <h2>Why Technical SEO is the Foundation of Organic Growth</h2>
      <p>Without a sound technical foundation, even the most exceptional content will struggle to rank. Search engines must be able to crawl, render, and index your pages seamlessly before ranking algorithms evaluate quality.</p>
      
      <h3>1. Crawlability & Indexation Checkpoints</h3>
      <ul>
        <li><strong>Robots.txt Directives:</strong> Ensure crucial CSS, JS, and high-value content URLs are not accidentally blocked.</li>
        <li><strong>XML Sitemap Integrity:</strong> Verify that only 200 OK canonical URLs are included. Exclude redirects, 404s, and noindex pages.</li>
        <li><strong>Crawl Depth Analysis:</strong> Keep high-priority pages within 3 clicks from the homepage.</li>
      </ul>
      
      <h3>2. Core Web Vitals & Page Experience</h3>
      <p>Google's emphasis on Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) means page performance directly impacts search user experience and rankings.</p>
      
      <h3>3. Canonicalization & Internal Linking</h3>
      <p>Consolidate link equity by eliminating redirect chains, updating internal broken links, and using self-referential canonical tags correctly.</p>
    `
  },
  {
    id: 2,
    title: "Search Intent Mastery: How to Rank for High-Converting Commercial Keywords",
    slug: "search-intent-mastery-commercial-keywords",
    category: "Keyword Research",
    date: "2026-08-25",
    image: "/images/blog2.jpg",
    excerpt: "Understand the four core types of search intent and how to structure your landing pages to satisfy what Google and buyers are actually looking for.",
    content: `
      <h2>Understanding Search Intent in Modern Google Algorithms</h2>
      <p>Keywords alone are no longer enough. Google's modern semantic models look for alignment between user search intent and the format, depth, and utility of your page.</p>
      
      <h3>The 4 Pillars of Search Intent:</h3>
      <ul>
        <li><strong>Informational:</strong> The user wants answers or tutorials (e.g., 'what is technical SEO').</li>
        <li><strong>Commercial Investigation:</strong> The user is comparing options (e.g., 'best SEO audit tools 2026').</li>
        <li><strong>Transactional:</strong> The user is ready to purchase or hire (e.g., 'hire technical SEO consultant').</li>
        <li><strong>Navigational:</strong> The user seeks a specific brand or login page.</li>
      </ul>
      
      <h3>Aligning Content Architecture with Buyer Journeys</h3>
      <p>Map informational queries to top-of-funnel guide hubs and use strategic internal links to funnel users toward commercial service pages.</p>
    `
  },
  {
    id: 3,
    title: "E-Commerce Faceted Navigation SEO: How to Prevent Crawl Waste & Cannibalization",
    slug: "ecommerce-faceted-navigation-seo-guide",
    category: "E-Commerce SEO",
    date: "2026-08-20",
    image: "/images/blog3.jpg",
    excerpt: "Learn how to configure filter URLs, canonical tags, and AJAX pagination to avoid creating millions of duplicate thin search pages.",
    content: `
      <h2>The Faceted Navigation Dilemma</h2>
      <p>Online stores with color, size, price, and brand filters can inadvertently generate millions of URL parameter combinations. If search bots crawl these thin combinations, crawl budget is rapidly depleted and link equity gets diluted.</p>
      
      <h3>Best Practices for Facet Management:</h3>
      <ul>
        <li><strong>Canonicalization:</strong> Point parameterized filter URLs back to the clean parent category root.</li>
        <li><strong>Robots Noindex vs. Disallow:</strong> Evaluate whether parameter URLs should be disallowed in robots.txt or rendered client-side via AJAX.</li>
        <li><strong>Index Only High-Volume Combinations:</strong> Create dedicated, unique static landing pages only for high-demand sub-categories.</li>
      </ul>
    `
  }
];

export const globalFaqs = [
  {
    q: "How long does it take to see tangible results from SEO?",
    a: "SEO is a compounding organic growth strategy. Technical improvements, crawl fixations, and on-page adjustments often reflect in Google Search Console within 3 to 6 weeks. Core commercial keyword rank improvements and organic revenue acceleration typically compound significantly between months 3 and 6."
  },
  {
    q: "Do you guarantee #1 rankings on Google?",
    a: "No ethical SEO specialist can guarantee a specific #1 rank because Google controls search algorithm updates. What we guarantee is a rigorous, data-driven methodology, 100% white-hat execution, transparent weekly progress reporting, and search strategies proven to outperform competitors over time."
  },
  {
    q: "What industries and CMS platforms do you specialize in?",
    a: "We have deep expertise across E-Commerce (Shopify, WooCommerce, Magento), B2B SaaS, Professional Services, Healthcare, Real Estate, Local Businesses, and Custom Web Applications built on Next.js, WordPress, or Laravel."
  },
  {
    q: "How do you choose target keywords for our campaign?",
    a: "We analyze search volume, keyword difficulty (KD), search intent (informational vs commercial), business profitability, and competitor ranking gaps using Ahrefs and Semrush to create structured keyword clusters and high-converting topic silos."
  },
  {
    q: "Can you fix Google indexing errors and Core Web Vitals issues?",
    a: "Yes! Our technical SEO audits systematically resolve crawl budget bloat, orphaned URLs, canonical conflicts, redirect loops, slow LCP/INP/CLS metrics, JavaScript hydration delays, and missing Schema.org JSON-LD structured data."
  },
  {
    q: "What tools and software do you use for audits and analysis?",
    a: "We utilize industry-leading enterprise toolstacks including Ahrefs, Semrush, Google Search Console, Google Analytics 4, Screaming Frog SEO Spider, Sitebulb, PageSpeed Insights, and custom Python scrapers for deep technical analysis."
  },
  {
    q: "What payment methods do you support and will I receive an invoice?",
    a: "We accept all major verified digital payment options including crypto (USDT, BTC, ETH, SOL) via NOWPayments with automated confirmation, alongside verified bKash mobile payments. An official downloadable digital invoice with a unique Order ID is generated immediately upon confirmation."
  }
];

export const testimonials = [
  {
    name: "Marcus Vance",
    role: "Founder, CloudFlow SaaS",
    content: "Abdullah took our SaaS platform from 4,000 monthly impressions to over 800K clicks in under 5 months. The depth of his technical audits and topic clusters is unmatched.",
    rating: 5,
    source: "Verified Client"
  },
  {
    name: "Sarah Jenkins",
    role: "E-Commerce Director, Apex Retail",
    content: "Our Shopify store's organic revenue grew by 320% after implementing Abdullah's e-commerce category taxonomy and schema strategies. Highly recommended!",
    rating: 5,
    source: "BlackHatWorld Review"
  },
  {
    name: "David Kim",
    role: "CEO, Nexus Digital Agency",
    content: "Hands down the best SEO specialist we have partnered with. Transparent reporting, no fluff, and real Google Search Console ranking proof every single month.",
    rating: 5,
    source: "Verified Partner"
  }
];

export const freeTools = [
  {
    slug: "website-seo-analyzer",
    title: "Website SEO Analyzer",
    desc: "Instant on-page audit & health score",
    icon: "fa-magnifying-glass-chart",
    color: "#1d4ed8",
    bg: "#dbeafe",
    category: "SEO & Technical"
  },
  {
    slug: "schema-markup-generator",
    title: "Schema Markup Generator",
    desc: "JSON-LD rich snippets builder",
    icon: "fa-code",
    color: "#4338ca",
    bg: "#e0e7ff",
    category: "SEO & Technical"
  },
  {
    slug: "serp-simulator",
    title: "Google SERP Simulator",
    desc: "Google & social card preview",
    icon: "fa-brands fa-google",
    color: "#d97706",
    bg: "#fef3c7",
    category: "SEO & Technical"
  },
  {
    slug: "robots-sitemap-generator",
    title: "Robots.txt & Sitemap Builder",
    desc: "Crawler rules & XML maps generator",
    icon: "fa-robot",
    color: "#334155",
    bg: "#f1f5f9",
    category: "SEO & Technical"
  },
  {
    slug: "keyword-density-checker",
    title: "Keyword Density Analyzer",
    desc: "Frequency & readability metrics",
    icon: "fa-chart-simple",
    color: "#15803d",
    bg: "#dcfce7",
    category: "SEO & Technical"
  },
  {
    slug: "http-header-checker",
    title: "HTTP 301 & SSL Checker",
    desc: "Redirect tracer & response codes",
    icon: "fa-network-wired",
    color: "#a21caf",
    bg: "#fae8ff",
    category: "SEO & Technical"
  },
  {
    slug: "website-cost-calculator",
    title: "Website Cost Calculator",
    desc: "Estimate project investment",
    icon: "fa-calculator",
    color: "#475569",
    bg: "#f1f5f9",
    category: "Calculators & ROI"
  },
  {
    slug: "google-ads-roi-calculator",
    title: "Google Ads ROI Calculator",
    desc: "Model ROAS & net profit",
    icon: "fa-brands fa-google",
    color: "#dc2626",
    bg: "#fee2e8",
    category: "Calculators & ROI"
  },
  {
    slug: "facebook-ads-roi-calculator",
    title: "Facebook Ads ROI Calculator",
    desc: "Meta ad budget simulator",
    icon: "fa-brands fa-meta",
    color: "#2563eb",
    bg: "#eff6ff",
    category: "Calculators & ROI"
  },
  {
    slug: "ai-automation-savings-calculator",
    title: "AI Savings Calculator",
    desc: "Project labor cost savings",
    icon: "fa-robot",
    color: "#059669",
    bg: "#ecfdf5",
    category: "Calculators & ROI"
  }
];

export const faqs = [
  {
    id: 1,
    question: "How long does it take to see tangible results from SEO?",
    answer: "SEO is a compounding organic growth strategy. Technical improvements, crawl fixations, and on-page adjustments often reflect in Google Search Console within 3 to 6 weeks. Core commercial keyword rank improvements and organic revenue acceleration typically compound significantly between months 3 and 6."
  },
  {
    id: 2,
    question: "Do you guarantee #1 rankings on Google?",
    answer: "No ethical SEO specialist can guarantee a specific #1 rank because Google controls search algorithm updates. What we guarantee is a rigorous, data-backed methodology, 100% white-hat execution, transparent weekly progress reporting, and search strategies proven to outperform competitors over time."
  },
  {
    id: 3,
    question: "What industries and CMS platforms do you specialize in?",
    answer: "We have deep expertise across E-Commerce (Shopify, WooCommerce, Magento), B2B SaaS, Professional Services, Healthcare, Real Estate, Local Businesses, and Custom Web Applications built on Next.js, WordPress, or Laravel."
  },
  {
    id: 4,
    question: "How do you choose target keywords for our campaign?",
    answer: "We analyze search volume, keyword difficulty (KD), search intent (informational vs commercial), business profitability, and competitor ranking gaps using Ahrefs and Semrush to create structured keyword clusters and high-converting topic silos."
  },
  {
    id: 5,
    question: "Can you fix Google indexing errors and Core Web Vitals issues?",
    answer: "Yes! Our technical SEO audits systematically resolve crawl budget bloat, orphaned URLs, canonical conflicts, redirect loops, slow LCP/INP/CLS metrics, JavaScript hydration delays, and missing Schema.org JSON-LD structured data."
  },
  {
    id: 6,
    question: "What payment methods do you support and will I receive an invoice?",
    answer: "We accept all major verified digital payment options including crypto (USDT, BTC, ETH, SOL) via NOWPayments with automated confirmation, alongside verified bKash mobile payments. An official downloadable digital invoice with a unique Order ID is generated immediately upon confirmation."
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Forensic Technical Audit",
    desc: "Crawl inspection of 230+ checkpoints including robots, canonicals, log files, JS rendering, and CWV speed.",
    icon: "fa-magnifying-glass-chart"
  },
  {
    step: "02",
    title: "Entity & Keyword Clustering",
    desc: "Advanced search intent classification, parent topic silos, and keyword gap opportunities mapped to commercial pages.",
    icon: "fa-cubes-stacked"
  },
  {
    step: "03",
    title: "On-Page & Schema Optimization",
    desc: "Refining semantic heading hierarchies, entity associations, JSON-LD structured data, and high-converting meta tags.",
    icon: "fa-code"
  },
  {
    step: "04",
    title: "Editorial Content Briefs",
    desc: "Comprehensive content outlines crafted to answer searcher intent with superior depth, authority, and UX.",
    icon: "fa-file-lines"
  },
  {
    step: "05",
    title: "Digital PR & Authority Building",
    desc: "100% white-hat editorial outreach, unlinked brand mention reclamation, and high-DR niche contextual backlinks.",
    icon: "fa-shield-halved"
  },
  {
    step: "06",
    title: "Analytics & Revenue Compounding",
    desc: "Iterative log monitoring, Search Console indexation health tracking, and conversion rate optimization debriefs.",
    icon: "fa-chart-line"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Growth Foundations",
    tagline: "Essential technical fixes & focused search visibility for emerging brands.",
    price: 850,
    billing_cycle: "/month",
    is_popular: false,
    features: [
      "Up to 2,500 Pages Monitored",
      "Full Technical SEO Audit & Ongoing Fixes",
      "2 Core Keyword Topic Clusters (20 Keywords)",
      "2 Long-Form Authority Articles / Month",
      "Monthly GSC & Keyword Ranking Reports",
      "Monthly 45-Min Strategy Review Call"
    ]
  },
  {
    id: 2,
    name: "Scale & Dominate",
    tagline: "Our flagship comprehensive organic growth accelerator for scaling businesses.",
    price: 1650,
    billing_cycle: "/month",
    is_popular: true,
    features: [
      "Up to 15,000 Pages Monitored",
      "Continuous Technical & Core Web Vitals Sprints",
      "5 Commercial Keyword Clusters (50 Keywords)",
      "4 High-Intent SEO Content Pieces / Month",
      "2 High-Authority Editorial Digital PR Links",
      "Competitor Movement & Content Gap Tracking",
      "Bi-Weekly Strategy Video Calls & Slack Support"
    ]
  },
  {
    id: 3,
    name: "Enterprise Authority",
    tagline: "Full-stack organic search domination, custom schema graphs & programmatic SEO.",
    price: 3200,
    billing_cycle: "/month",
    is_popular: false,
    features: [
      "Unlimited Page Crawling & Log File Monitoring",
      "Full Engineering & Development Implementation Support",
      "Comprehensive Topic Silos (150+ Target Keywords)",
      "8 Comprehensive Articles & Programmatic Landing Briefs",
      "4 Tier-1 Digital PR Placements / Month",
      "Custom Knowledge Graph & Schema Integration",
      "Dedicated Slack Channel & Weekly Growth Calls"
    ]
  }
];

