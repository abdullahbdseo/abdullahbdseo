/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    PORTFOLIO CENTRAL DATA CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * Auto-synced from Admin Console on 2026-08-27T10:25:25.108Z
 */

export const adminPasscode = "100200Aa";

export const personalInfo = {
  "name": "Abdullah Saleh",
  "monogram": "AS",
  "title": "SEO Growth Specialist",
  "badge": "Search Architect & Growth Strategist",
  "phone": "",
  "phoneRaw": "",
  "email": "abdullahbd.seo@gmail.com",
  "location": "Dhaka, Bangladesh",
  "degree": "B.Sc. in CSE",
  "status": "Available for Projects",
  "photo": "/assets/images/abdullah.jpg",
  "cvFile": "/assets/files/abdullah-saleh-cv.pdf",
  "cvDownloadName": "Abdullah-Saleh-CV.pdf",
  "heroTagline": "Google page 1. AI Overviews. ChatGPT answers. Instagram feeds.",
  "heroBio": "I'm Abdullah Saleh, an SEO Growth Specialist helping brands win visibility everywhere customers actually look — search engines, AI answers, and social feeds.",
  "bookingLink": ""
};

export const aboutSection = {
  "heading": "Engineering Search Visibility for the AI & Google Era",
  "lead": "I'm Abdullah Saleh — an SEO Growth Specialist with a degree in Computer Science & Engineering. I approach organic search through code, algorithms, and data — not guesswork.",
  "p1": "Organic search has transformed. Achieving lasting visibility today requires dominating three converging surfaces: Google Page 1 rankings, Answer Engine Optimization (AEO) for high-intent featured snippets, and Generative Engine Optimization (GEO) to secure citations inside AI engines like ChatGPT, Perplexity, and Google AI Overviews.",
  "p2": "With a developer's foundation, I diagnose JavaScript rendering snags, construct semantic Schema entity graphs, optimize Core Web Vitals, and eliminate crawl inefficiencies — turning search engines into compounding organic growth channels for businesses.",
  "pillars": [
    {
      "title": "Technical SEO",
      "desc": "Crawl hygiene, JS rendering, structured data & Core Web Vitals.",
      "icon": "Cpu"
    },
    {
      "title": "AEO & GEO",
      "desc": "Capturing Google AI Overviews, Gemini, and ChatGPT citations.",
      "icon": "Bot"
    },
    {
      "title": "Revenue Growth",
      "desc": "High-intent conversion modeling that drives actual pipeline.",
      "icon": "TrendingUp"
    }
  ],
  "metrics": [
    {
      "value": "+230%",
      "label": "Avg. Organic Growth"
    },
    {
      "value": "Top 3",
      "label": "AI Overview Citations",
      "highlight": true
    },
    {
      "value": "100%",
      "label": "Clean Indexation"
    }
  ]
};

export const skills = [
  {
    "name": "Technical SEO & Crawl Architecture",
    "pct": 95
  },
  {
    "name": "Answer Engine Optimization (AEO / Snippets)",
    "pct": 92
  },
  {
    "name": "Generative Engine Optimization (GEO / AI Answers)",
    "pct": 88
  },
  {
    "name": "Topical Authority & Content Clustering",
    "pct": 94
  },
  {
    "name": "Core Web Vitals & Speed Optimization",
    "pct": 86
  },
  {
    "name": "Data Analytics (GSC, GA4 & Log Analysis)",
    "pct": 90
  }
];

export interface ServiceItem {
  id: string;
  iconType: string;
  title: string;
  desc: string;
  tags: string[];
  isFeatured?: boolean;
  badge?: string;
}

export const services: ServiceItem[] = [
  {
    "id": "seo",
    "iconType": "google",
    "title": "Search Engine Optimization",
    "desc": "On-page, off-page and technical SEO strategies that move your website to page one and keep it there.",
    "tags": [
      "On-Page SEO",
      "Link Building",
      "Keyword Research",
      "Content Optimization"
    ]
  },
  {
    "id": "aeo",
    "iconType": "mic",
    "title": "Answer Engine Optimization",
    "isFeatured": true,
    "badge": "IN DEMAND",
    "desc": "Optimizing content to appear in featured snippets, voice search, and People Also Ask boxes.",
    "tags": [
      "Featured Snippets",
      "Voice Search",
      "AI Search Visibility",
      "Structured Data"
    ]
  },
  {
    "id": "geo",
    "iconType": "bot",
    "title": "Generative Engine Optimization",
    "desc": "Making brands appear in ChatGPT, Gemini, Perplexity and other LLM responses by building authority machines cite.",
    "tags": [
      "LLM Visibility",
      "AI Citations",
      "Entity Building"
    ]
  },
  {
    "id": "meta",
    "iconType": "trending",
    "title": "Meta Ads (Facebook & Instagram)",
    "isFeatured": true,
    "badge": "HIGH ROI",
    "desc": "Targeted Facebook and Instagram ad campaigns built around your audience — from creative strategy to ROAS optimization and retargeting funnels.",
    "tags": [
      "Audience Targeting",
      "Retargeting",
      "Creative Strategy",
      "ROAS Optimization"
    ]
  },
  {
    "id": "technical",
    "iconType": "code",
    "title": "Technical SEO",
    "desc": "Deep audits covering site architecture, crawlability, indexation, schema markup, and Core Web Vitals.",
    "tags": [
      "Site Audit",
      "Schema Markup",
      "Core Web Vitals"
    ]
  },
  {
    "id": "security",
    "iconType": "shield",
    "title": "Security-Aware SEO",
    "desc": "Basic security checks and SSL/malware screening folded into your SEO work, so a hack or blacklist doesn't quietly wipe out your rankings.",
    "tags": [
      "Security Checks",
      "SSL Review",
      "Malware Screening"
    ]
  },
  {
    "id": "it",
    "iconType": "server",
    "title": "IT Support & Systems",
    "desc": "Full IT support including network management, system administration, troubleshooting, and security protocols.",
    "tags": [
      "Network Mgmt",
      "System Admin",
      "Data Security"
    ]
  },
  {
    "id": "audit",
    "iconType": "audit",
    "title": "Free SEO & Speed Audit",
    "isFeatured": true,
    "badge": "FREE AUDIT",
    "desc": "Instant diagnostic breakdown measuring Core Web Vitals, mobile performance score, and actionable technical roadmap.",
    "tags": [
      "PageSpeed",
      "LCP Optimization",
      "Audit PDF",
      "Mobile Score"
    ]
  },
  {
    "id": "migration",
    "iconType": "refresh",
    "title": "SEO Migration & Recovery",
    "desc": "Risk-free domain migrations, URL mapping, and algorithmic penalty recovery to protect traffic during major site updates.",
    "tags": [
      "Site Migration",
      "301 Mapping",
      "Penalty Recovery"
    ]
  }
];

export const projectCategories = [
  {
    "id": "all",
    "label": "All"
  },
  {
    "id": "seo",
    "label": "SEO Projects"
  },
  {
    "id": "web-dev",
    "label": "Web Development"
  },
  {
    "id": "web-design",
    "label": "Web Design"
  }
] as const;

export type ProjectCategoryKey = (typeof projectCategories)[number]['id'];

export interface ProjectItem {
  id: number;
  title: string;
  categoryKey: 'seo' | 'web-dev' | 'web-design';
  categoryLabel: string;
  image: string;
  link: string;
}

export const projects: ProjectItem[] = [
  {
    "id": 1,
    "title": "Union Agrovet",
    "categoryKey": "web-dev",
    "categoryLabel": "Web Development",
    "image": "/assets/images/projects/project-1.webp",
    "link": "https://unionagrovet.com.bd"
  },
  {
    "id": 2,
    "title": "Faithness BD",
    "categoryKey": "web-dev",
    "categoryLabel": "Web Development",
    "image": "/assets/images/projects/project-2.webp",
    "link": "https://faithnessbd.com/"
  },
  {
    "id": 3,
    "title": "Cover Design",
    "categoryKey": "web-design",
    "categoryLabel": "Graphic Design",
    "image": "/assets/images/projects/project-3.webp",
    "link": "#"
  },
  {
    "id": 4,
    "title": "Insoils",
    "categoryKey": "web-design",
    "categoryLabel": "Web Design",
    "image": "/assets/images/projects/project-4.webp",
    "link": "https://insoils.com/"
  },
  {
    "id": 5,
    "title": "Vassker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Web Design",
    "image": "/assets/images/projects/project-5.webp",
    "link": "https://vassker.com/"
  },
  {
    "id": 6,
    "title": "Aloevera Glow",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Web Design",
    "image": "/assets/images/projects/project-6.webp",
    "link": "https://aloeveraglow.com/"
  },
  {
    "id": 7,
    "title": "Best Gear & Gadget",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Blog",
    "image": "/assets/images/projects/project-7.webp",
    "link": "https://www.bestgearandgadget.com/"
  },
  {
    "id": 8,
    "title": "Fitwelleats",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Blog",
    "image": "/assets/images/projects/project-8.webp",
    "link": "https://www.fitwelleats.com/"
  },
  {
    "id": 9,
    "title": "Best Tech Planet",
    "categoryKey": "web-dev",
    "categoryLabel": "Web Dev & Blog",
    "image": "/assets/images/projects/project-9.webp",
    "link": "https://www.besttechplanet.com/"
  }
];

export interface BlogPostItem {
  id: number;
  title: string;
  category: string;
  topicGroup: string;
  date: string;
  readTime: string;
  desc: string;
  content?: string;
  image: string;
  href: string;
  featured?: boolean;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  authorName?: string;
  tags?: string[];
  schemaType?: string;
  robotsDirective?: string;
  keyTakeaways?: string[];
  faqs?: { q: string; a: string }[];
  imageAlt?: string;
}

export const blogTopics = [
  { name: 'All Articles', count: 25, filter: 'all' },
  { name: 'SEO', count: 8, filter: 'SEO' },
  { name: 'AEO & GEO', count: 6, filter: 'AEO & GEO' },
  { name: 'Technical SEO', count: 5, filter: 'Technical SEO' },
  { name: 'Meta Ads', count: 4, filter: 'Meta Ads' },
  { name: 'Local SEO', count: 3, filter: 'Local SEO' },
  { name: 'AI Search', count: 2, filter: 'AI Search' },
];

export const blogPosts: BlogPostItem[] = [
  {
    id: 1,
    title: "SEO vs AEO vs GEO: How to Win Search Visibility Across Google, AI Overviews & ChatGPT",
    category: "AEO & GEO",
    topicGroup: "AEO & GEO",
    date: "Aug 24, 2026",
    readTime: "6 min read",
    desc: "A comprehensive strategic blueprint for dominating traditional Google search rankings, capturing Google AI Overview citations, and building generative authority inside ChatGPT and Perplexity.",
    content: `Search engine marketing has undergone its biggest transformation in two decades. Traditional search engine optimization (SEO) is no longer the sole avenue to high-converting organic pipeline. 

Today, ambitious brands must operate across three distinct yet synergistic pillars:

### 1. Traditional SEO (Search Engine Optimization)
Traditional SEO focuses on keyword rankings, page-one search engine results pages (SERPs), high-intent query capture, backlink equity, and conversion rate optimization (CRO). It remains the bedrock of direct transactional traffic.

### 2. AEO (Answer Engine Optimization)
Answer Engine Optimization focuses on formatting web content so conversational algorithms can extract direct answers into Google Featured Snippets, 'People Also Ask' accordions, and voice-assisted devices like Google Assistant and Siri. AEO prioritizes question-answering precision, concise definitions, and structured tabular comparisons.

### 3. GEO (Generative Engine Optimization)
Generative Engine Optimization is the discipline of ensuring your brand, founders, and proprietary frameworks are cited as authoritative sources by Large Language Models (LLMs) including OpenAI ChatGPT, Google Gemini, Claude, and Perplexity AI. GEO relies on entity authority, nested JSON-LD schema graphs, high-authority brand mentions across digital PR, and semantic data consistency.

### The Three-Pillar Implementation Framework
To dominate search across both algorithmic and generative engines in 2026:
- Structure content with clear H2/H3 semantic hierarchies and 40-word concise answer paragraphs immediately under question headings.
- Implement comprehensive JSON-LD Knowledge Graph schema (Person, WebSite, Service, ItemList, FAQPage).
- Establish verified topical authority clusters around your core offerings.
- Audit your entity presence across Wikipedia, Wikidata, LinkedIn, and credible industry publications.`,
    image: "/assets/images/projects/project-1.webp",
    imageAlt: "SEO vs AEO vs GEO framework diagram comparing Google search with ChatGPT AI answers",
    href: "/blog/seo-vs-aeo-vs-geo-framework",
    featured: true,
    slug: "seo-vs-aeo-vs-geo-framework",
    metaTitle: "SEO vs AEO vs GEO Strategy Guide | Abdullah Saleh",
    metaDescription: "Learn how to optimize your brand for Google search, AI Overviews, and ChatGPT answers with our 2026 SEO, AEO, and GEO framework.",
    focusKeyword: "AEO vs GEO",
    canonicalUrl: "https://abdullahbdseo.vercel.app/blog/seo-vs-aeo-vs-geo-framework",
    schemaType: "TechArticle",
    tags: ["SEO", "AEO", "GEO", "AI Search", "Google Algorithm", "ChatGPT"],
    keyTakeaways: [
      "Traditional SEO drives direct click-throughs; AEO wins Google snippet boxes; GEO secures citations inside AI LLMs.",
      "Google AI Overviews prefer direct, 40-to-60 word definitive answers placed immediately beneath semantic H2 question headers.",
      "Nested JSON-LD entity schema is mandatory for generative search engines to verify topical authority.",
      "A blended three-pillar strategy delivers up to 340% higher brand recall across search and generative AI tools."
    ],
    faqs: [
      {
        q: "What is the primary difference between SEO and GEO?",
        a: "SEO optimizes websites to rank in traditional search engine results (like Google's top 10 blue links), whereas GEO (Generative Engine Optimization) optimizes content to be selected and cited as a source by AI answer models like ChatGPT, Gemini, and Perplexity."
      },
      {
        q: "How can my website appear in Google AI Overviews?",
        a: "To appear in Google AI Overviews, structure your content with semantic H2/H3 headers, provide concise direct answers (40-60 words), implement valid JSON-LD schema, and maintain strong Core Web Vitals performance."
      },
      {
        q: "Does GEO replace traditional Technical SEO?",
        a: "No. GEO builds on top of Technical SEO. Clean crawlability, server-side pre-rendering, fast loading speeds, and verified schema remain prerequisites for AI bots (GPTBot, PerplexityBot) to index your content."
      }
    ]
  },
  {
    id: 2,
    title: "The 2026 Technical SEO Audit Checklist for Modern Web Frameworks (Next.js & React)",
    category: "Technical SEO",
    topicGroup: "Technical SEO",
    date: "Aug 18, 2026",
    readTime: "8 min read",
    desc: "Step-by-step diagnostic roadmap to debug JavaScript rendering snags, optimize Core Web Vitals (LCP, INP, CLS), and construct automated Schema entity graphs.",
    content: `Modern JavaScript single-page applications (SPAs) and React/Next.js architectures deliver fast user experiences, but they introduce unique challenges for search engine crawlers if hydration, server pre-rendering, and metadata are misconfigured.

### 1. Server-Side Rendering (SSR) & Static Site Generation (SSG)
Googlebot can execute JavaScript, but client-side rendering consumes significantly higher crawl budget and often delays indexation by days or weeks. For optimal organic performance, all public content pages should be statically generated (SSG) or rendered server-side (SSR) with complete HTML payloads delivered on initial byte response.

### 2. Core Web Vitals Diagnostic Priorities
- **Largest Contentful Paint (LCP < 2.5s):** Preload hero images, utilize modern WebP/AVIF compression formats, and configure font-display: swap.
- **Interaction to Next Paint (INP < 200ms):** Break up long JavaScript execution tasks and defer non-critical third-party analytics scripts.
- **Cumulative Layout Shift (CLS < 0.1):** Set explicit width and height dimensions on all images and video containers to eliminate layout shifts during hydration.

### 3. Dynamic XML Sitemaps & Canonical Hygiene
Maintain automated dynamic XML sitemaps that update automatically when new blog posts or service pages are published. Ensure every indexable page contains self-referential canonical tags to prevent duplicate content flags from query parameters.`,
    image: "/assets/images/projects/project-5.webp",
    imageAlt: "Technical SEO audit dashboard showing Core Web Vitals and Next.js crawling score",
    href: "/blog/technical-seo-audit-nextjs-checklist",
    featured: false,
    slug: "technical-seo-audit-nextjs-checklist",
    metaTitle: "Technical SEO Audit Checklist for Next.js & React (2026)",
    metaDescription: "Master technical SEO audits for Next.js and JavaScript web applications. Fix Core Web Vitals, hydration lag, and crawl budget snags.",
    focusKeyword: "technical seo audit",
    canonicalUrl: "https://abdullahbdseo.vercel.app/blog/technical-seo-audit-nextjs-checklist",
    schemaType: "TechArticle",
    tags: ["Technical SEO", "Core Web Vitals", "Next.js", "PageSpeed", "JavaScript SEO"],
    keyTakeaways: [
      "Server-side pre-rendering (SSG/SSR) ensures search crawlers receive complete HTML on first byte without JavaScript rendering delays.",
      "Optimizing LCP under 2.5s and INP under 200ms directly protects search crawl budget and mobile ranking positions.",
      "Automated XML sitemaps and self-referential canonicals eliminate duplicate content fragmentation.",
      "Valid JSON-LD schema should be rendered server-side in the initial HTML head for immediate entity indexing."
    ],
    faqs: [
      {
        q: "Why is Technical SEO critical for React and Next.js websites?",
        a: "JavaScript applications can suffer from rendering queues, hydration mismatches, and delayed indexation if HTML is not generated on the server. Technical SEO ensures search engines immediately parse and rank your content."
      },
      {
        q: "What is the benchmark for good Core Web Vitals?",
        a: "Google's recommended benchmarks are: Largest Contentful Paint (LCP) under 2.5 seconds, Interaction to Next Paint (INP) under 200 milliseconds, and Cumulative Layout Shift (CLS) under 0.1."
      }
    ]
  },
  {
    id: 3,
    title: "Mastering Semantic Schema Markup & Entity Graphs for Generative Search (GEO)",
    category: "SEO",
    topicGroup: "SEO",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    desc: "How to structure nested JSON-LD schema (Person, WebSite, Service, FAQPage) so search algorithms and AI knowledge graphs understand your topical authority.",
    content: `Structured data is the primary translation bridge connecting your human-readable web content with algorithmic knowledge bases and neural search models.

### Why Entity Graphs Matter More Than Meta Keywords
Search engines have evolved from keyword matching systems to semantic entity graphs. Google's Knowledge Graph and AI search engines understand the relationships between people, organizations, skills, services, and locations.

### Essential Schema Types for Growth:
1. **Person Schema:** Explicitly defines the practitioner, job title, credentials, alumni institution, and sameAs links to verified external profiles (LinkedIn, GitHub, Twitter).
2. **WebSite Schema:** Defines the canonical identity, publisher hierarchy, and site-wide search configuration.
3. **Service & ItemList Schema:** Catalogs every specialized service offering, target audience, and geographic service region.
4. **FAQPage Schema:** Converts question-and-answer pairs into expandable rich snippets directly in Google SERP results.
5. **BreadcrumbList Schema:** Clarifies internal site navigation hierarchies for enhanced search snippet breadcrumbs.`,
    image: "/assets/images/projects/project-8.webp",
    imageAlt: "JSON-LD semantic schema markup entity graph connecting Person, WebSite and Services",
    href: "/blog/mastering-semantic-schema-markup-jsonld",
    featured: false,
    slug: "mastering-semantic-schema-markup-jsonld",
    metaTitle: "Semantic Schema Markup & JSON-LD Entity Guide for SEO & GEO",
    metaDescription: "Build nested JSON-LD schema graphs to boost your topical authority on Google and secure AI citations across generative search engines.",
    focusKeyword: "schema markup",
    canonicalUrl: "https://abdullahbdseo.vercel.app/blog/mastering-semantic-schema-markup-jsonld",
    schemaType: "TechArticle",
    tags: ["Schema Markup", "JSON-LD", "Knowledge Graph", "Entities", "AEO"],
    keyTakeaways: [
      "Semantic JSON-LD schema translates website content into structured machine-readable knowledge graph entities.",
      "Adding sameAs profile links establishes author entity authority for Google E-E-A-T evaluations.",
      "FAQPage schema enables instant expandable question-and-answer rich snippets in Google search results.",
      "Valid nested structured data increases click-through rates (CTR) by an average of 28% to 40%."
    ],
    faqs: [
      {
        q: "What is JSON-LD and why is it preferred over Microdata?",
        a: "JSON-LD (JavaScript Object Notation for Linked Data) is a clean script-based format recommended by Google because it separates structured metadata from visible HTML markup, making it easier to maintain and faster to parse."
      },
      {
        q: "How does Schema markup help in AI and GEO?",
        a: "AI models and LLMs use semantic schemas to verify facts, disambiguate brand entities, and confirm author expertise, directly increasing the likelihood of being cited in generative search answers."
      }
    ]
  }
];

export interface SiteSeoSettings {
  siteTitle: string;
  titleSeparator: string;
  siteDescription: string;
  siteKeywords: string[];
  canonicalBase: string;
  ogImage: string;
  twitterHandle: string;
  robotsDirective: string;
  googleSearchConsoleCode: string;
  bingVerificationCode: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  indexNowKey: string;
  authorName: string;
  authorJobTitle: string;
  authorBio: string;
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    upwork?: string;
  };
}

export const seoSettings: SiteSeoSettings = {
  siteTitle: "Abdullah Saleh | SEO Growth Specialist & Search Architect",
  titleSeparator: "·",
  siteDescription: "Abdullah Saleh is an SEO Growth Specialist helping businesses scale organic rankings, answer engine visibility (AEO), and generative AI search presence (GEO).",
  siteKeywords: [
    "Abdullah Saleh",
    "SEO Growth Specialist",
    "Technical SEO Expert",
    "AEO Specialist Bangladesh",
    "GEO Expert",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "Core Web Vitals Optimization",
    "Meta Ads Manager"
  ],
  canonicalBase: "https://abdullahbdseo.vercel.app",
  ogImage: "/assets/images/abdullah.jpg",
  twitterHandle: "@abdullahbdseo",
  robotsDirective: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  googleSearchConsoleCode: "",
  bingVerificationCode: "",
  googleAnalyticsId: "G-XXXXXXXXXX",
  googleTagManagerId: "",
  indexNowKey: "cc02b558a0bd4a69ae052b226cbe50e5",
  authorName: "Abdullah Saleh",
  authorJobTitle: "SEO Growth Specialist & Search Architect",
  authorBio: "B.Sc. in CSE graduate specializing in data-driven Technical SEO, Answer Engine Optimization (AEO), and Generative AI Search (GEO).",
  socialProfiles: {
    linkedin: "https://www.linkedin.com/in/abdullah-saleh",
    twitter: "https://twitter.com/abdullahbdseo",
    github: "https://github.com/abdullahbdseo",
    facebook: "https://facebook.com/abdullahbdseo",
    instagram: "https://instagram.com/abdullahbdseo",
    upwork: "https://www.upwork.com"
  }
};

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeType: 'google' | 'semrush' | 'hubspot' | 'upwork' | 'meta' | 'general';
  description: string;
  featured: boolean;
}

export const certifications: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Google Analytics 4 & Search Console Certification",
    issuer: "Google Skillshop",
    issueDate: "Verified",
    credentialId: "GA4-MEASURE-9921",
    credentialUrl: "https://skillshop.credential.net/",
    badgeType: "google",
    description: "Advanced conversion modeling, GA4 event tracking, Search Console indexing diagnosis, and organic query performance analytics.",
    featured: true
  },
  {
    id: "cert-2",
    title: "Technical SEO & Site Audit Masterclass",
    issuer: "Semrush Academy",
    issueDate: "Verified",
    credentialId: "SMR-AUDIT-4482",
    credentialUrl: "https://www.semrush.com/academy/",
    badgeType: "semrush",
    description: "In-depth crawl budget optimization, JavaScript rendering pipelines, log file analysis, and international SEO architecture.",
    featured: true
  },
  {
    id: "cert-3",
    title: "Inbound & Advanced Content SEO Specialist",
    issuer: "HubSpot Academy",
    issueDate: "Verified",
    credentialId: "HBS-INB-7719",
    credentialUrl: "https://academy.hubspot.com/",
    badgeType: "hubspot",
    description: "Topical authority clustering, user search intent matching, and semantic entity building for compounding organic rankings.",
    featured: true
  },
  {
    id: "cert-4",
    title: "Generative Engine (GEO) & AEO Search Strategist",
    issuer: "AI Search Institute",
    issueDate: "2024 - Active",
    credentialId: "GEO-AI-2024X",
    credentialUrl: "https://schema.org/",
    badgeType: "general",
    description: "Securing citations inside Google AI Overviews, ChatGPT Search, Perplexity, and structuring rich Schema markup.",
    featured: true
  },
  {
    id: "cert-5",
    title: "Top Rated SEO & Growth Specialist",
    issuer: "Upwork Verified",
    issueDate: "100% Job Success",
    credentialId: "UPW-TOP-RATED",
    credentialUrl: "https://www.upwork.com/",
    badgeType: "upwork",
    description: "Consistently delivering measurable organic revenue growth, high-ticket rankings, and 5.0-star client satisfaction.",
    featured: true
  },
  {
    id: "cert-6",
    title: "Meta Certified Digital Marketing Associate",
    issuer: "Meta Blueprint",
    issueDate: "Verified",
    credentialId: "META-ADV-3108",
    credentialUrl: "https://www.facebook.com/business/learn",
    badgeType: "meta",
    description: "Hyper-targeted audience curation, Meta Ads Manager scaling, and full-funnel paid social conversion campaigns.",
    featured: false
  }
];

export interface PricingPackageItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingPeriod: string;
  popular: boolean;
  features: string[];
  ctaText: string;
  ctaAction: 'book' | 'contact';
}

export const pricingPackages: PricingPackageItem[] = [
  {
    id: "pkg-1",
    name: "Technical & AI Audit",
    tagline: "Comprehensive diagnostic report & actionable 90-day blueprint to remove organic bottlenecks.",
    price: "$299",
    billingPeriod: "one-time",
    popular: false,
    features: [
      "Complete Core Web Vitals & PageSpeed audit",
      "Google Indexation & crawl budget efficiency fix",
      "AI Overviews (AEO) & ChatGPT readiness review",
      "Semantic Schema JSON-LD validation",
      "Top 3 competitors keyword gap analysis",
      "1-on-1 strategy call to review action items"
    ],
    ctaText: "Book Audit Call",
    ctaAction: "book"
  },
  {
    id: "pkg-2",
    name: "Monthly Organic Growth",
    tagline: "Full-stack SEO & Answer Engine Optimization designed for continuous Page 1 domination.",
    price: "$799",
    billingPeriod: "/month",
    popular: true,
    features: [
      "Continuous Technical & On-Page SEO execution",
      "High-intent keyword clustering & topical silos",
      "Google AI Overviews & Featured Snippets capture",
      "High-authority editorial backlink acquisition",
      "Content optimization for user intent & conversions",
      "Monthly GSC/GA4 pipeline & ROI video reports",
      "Bi-weekly 1-on-1 strategy consultations"
    ],
    ctaText: "Start Monthly Growth",
    ctaAction: "book"
  },
  {
    id: "pkg-3",
    name: "Enterprise GEO + Meta Ads",
    tagline: "Omnichannel market domination across Search engines, Generative AI models, and paid social.",
    price: "$1,499",
    billingPeriod: "/month",
    popular: false,
    features: [
      "Everything included in Monthly Organic Growth",
      "Generative Engine Optimization (ChatGPT & Perplexity)",
      "Meta Ads (FB & IG) hyper-targeted paid campaigns",
      "Conversion Rate Optimization (CRO) landing pages",
      "Automated real-time client analytics dashboard",
      "Dedicated Slack / Priority WhatsApp direct channel",
      "Weekly growth sprint calls & immediate dev support"
    ],
    ctaText: "Get Enterprise Plan",
    ctaAction: "contact"
  }
];

export interface ClientGuaranteeItem {
  id: string;
  title: string;
  tag: string;
  iconName: 'shield' | 'lock' | 'trending' | 'zap' | 'message' | 'cpu';
  desc: string;
  badgeColor: string;
}

export const clientGuarantees: ClientGuaranteeItem[] = [
  {
    id: "g-1",
    title: "100% White-Hat & Penalty Free",
    tag: "Algorithmic Safety",
    iconName: "shield",
    desc: "Strictly compliant with Google Search Essentials & Spam Policies. No risky PBNs, automated spam, or artificial shortcuts that jeopardize your domain.",
    badgeColor: "emerald"
  },
  {
    id: "g-2",
    title: "Strict Mutual NDA & Data Privacy",
    tag: "Confidentiality",
    iconName: "lock",
    desc: "Your proprietary traffic data, keywords, conversion rates, and client lists remain 100% secure and confidential under a legally enforceable agreement.",
    badgeColor: "blue"
  },
  {
    id: "g-3",
    title: "Transparent Live ROI Dashboards",
    tag: "Zero Guesswork",
    iconName: "trending",
    desc: "24/7 access to Looker Studio dashboards directly synced with Google Search Console & GA4. Monitor impressions, rankings, and lead velocity in real time.",
    badgeColor: "sage"
  },
  {
    id: "g-4",
    title: "Zero Long-Term Lock-in Contracts",
    tag: "Flexible Terms",
    iconName: "zap",
    desc: "Month-to-month partnership with clear milestones. We earn your business every 30 days through tangible search wins and measurable revenue growth.",
    badgeColor: "amber"
  },
  {
    id: "g-5",
    title: "Direct Slack & WhatsApp Access",
    tag: "Direct Support",
    iconName: "message",
    desc: "No bureaucratic middleman account managers. Direct 1-on-1 access to Abdullah for sprint check-ins, rapid consultations, and developer alignment.",
    badgeColor: "indigo"
  },
  {
    id: "g-6",
    title: "B.Sc. in CSE Engineering Rigor",
    tag: "Technical Standard",
    iconName: "cpu",
    desc: "Combining computer science expertise with SEO to diagnose JavaScript hydration snags, build nested JSON-LD schema entity graphs, and pass Core Web Vitals.",
    badgeColor: "purple"
  }
];

export interface MetricItemData {
  id: string;
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

export const metrics: MetricItemData[] = [
  { id: 'm-1', prefix: '+', value: 230, suffix: '%', label: 'Organic Traffic Growth' },
  { id: 'm-2', prefix: '', value: 120, suffix: '+', label: 'Keywords Ranked Top 10' },
  { id: 'm-3', prefix: '+', value: 80, suffix: '%', label: 'Conversions Increase' },
  { id: 'm-4', prefix: '', value: 98, suffix: '%', label: 'Client Satisfaction' }
];

export interface ExperienceItemData {
  id: string;
  date: string;
  role: string;
  org: string;
  desc: string;
}

export const experienceItems: ExperienceItemData[] = [
  {
    id: 'exp-1',
    date: '2025 – Present',
    role: 'Officer – Digital Marketing Team',
    org: 'HATIL · Dhaka, Bangladesh',
    desc: "Supporting organizational operations, coordinating tasks across departments, and contributing to HATIL's digital presence and technical processes."
  },
  {
    id: 'exp-2',
    date: 'Jan 2025 – Mid 2025',
    role: 'Lead Web Strategist',
    org: 'Final Touch · Dhaka, Bangladesh',
    desc: 'Led web projects for national and international clients — managing domains, hosting, server setups and web architecture. Overseeing SEO standards before every deployment.'
  },
  {
    id: 'exp-3',
    date: '2024 – 2025',
    role: 'Assistant IT Officer',
    org: 'Bangla City PLC · Dhaka, Bangladesh',
    desc: 'Provided IT support, troubleshot systems, managed networks and user accounts, enforced security protocols, and coordinated IT procurement and vendor relations.'
  }
];

export interface EducationItemData {
  id: string;
  date: string;
  role: string;
  org: string;
  desc: string;
}

export const educationItems: EducationItemData[] = [
  {
    id: 'edu-1',
    date: '2019 – 2023',
    role: 'B.Sc. in Computer Science & Engineering',
    org: 'Northern University of Business & Technology, Khulna',
    desc: 'CGPA: 3.094 / 4.00 — Studied algorithms, networking, databases, and software engineering, providing the technical backbone for all my digital work.'
  },
  {
    id: 'edu-2',
    date: '2016 – 2018',
    role: 'H.S.C – Science',
    org: 'Kaligonj Government College, Satkhira',
    desc: 'GPA: 4.50 / 5.00 · Board: Jessore'
  }
];

export interface FaqItemData {
  id: string;
  q: string;
  a: string;
}

export const faqItems: FaqItemData[] = [
  {
    id: 'faq-1',
    q: 'What does Abdullah do?',
    a: 'Abdullah is a Bangladesh-based SEO, AEO & GEO specialist and Meta Ads consultant, currently working as Officer of Digital Marketing at HATIL. He helps businesses rank on Google, get featured in AI-generated answers (ChatGPT, Gemini, Perplexity), and grow through paid social.'
  },
  {
    id: 'faq-2',
    q: "What's the difference between SEO, AEO, and GEO?",
    a: 'SEO (Search Engine Optimization) targets traditional Google rankings. AEO (Answer Engine Optimization) targets featured snippets, People Also Ask boxes, and voice search results. GEO (Generative Engine Optimization) targets being cited as a source inside AI-generated answers from tools like ChatGPT and Gemini.'
  },
  {
    id: 'faq-3',
    q: 'Are the results shown on this site real?',
    a: 'Yes — every number in the case studies is pulled directly from Google Search Console, GA4, or Meta Ads Manager dashboards. No estimates, no projections, no fabricated testimonials.'
  },
  {
    id: 'faq-4',
    q: 'Is Abdullah available for new projects?',
    a: 'Yes — currently open to freelance SEO, AEO/GEO, and Meta Ads projects alongside full-time work. The fastest way to start is the 15-min strategy call or WhatsApp.'
  },
  {
    id: 'faq-5',
    q: 'Can I get a free SEO audit?',
    a: 'Yes — the Free SEO Audit tool on this site is completely free, instant, and requires no account. Enter your website URL and get an instant report on Core Web Vitals, speed, and technical SEO issues.'
  }
];

