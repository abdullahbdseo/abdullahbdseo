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

export const blogPosts: BlogPostItem[] = [];
