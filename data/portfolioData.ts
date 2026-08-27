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
