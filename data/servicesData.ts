export interface DetailedService {
  slug: string;
  id: string;
  badge: string;
  title: string;
  tagline: string;
  iconType: 'search' | 'mic' | 'bot' | 'code' | 'trending' | 'shield' | 'server' | 'route';
  heroBio: string;
  overview: string;
  whyItMatters: {
    title: string;
    desc: string;
  }[];
  deliverables: {
    title: string;
    desc: string;
    highlight?: string;
  }[];
  process: {
    step: string;
    title: string;
    desc: string;
  }[];
  kpis: {
    metric: string;
    label: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const detailedServices: Record<string, DetailedService> = {
  'seo': {
    slug: 'seo',
    id: 'seo',
    badge: 'Organic Search & Pipeline Architecture',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Build sustainable, compounding Google Page 1 search visibility that consistently converts organic visitors into paying customers.',
    iconType: 'search',
    heroBio: "Search algorithms don't reward guesswork. If your website is buried on page 3 or 4 of Google, it's rarely because your product or service is inferior. It's because search crawlers cannot parse your topical authority, your content doesn't match real search intent, or your technical setup is silently blocking crawl budget. I build semantic topic clusters, optimize on-page relevance, and earn real editorial links so your brand becomes the undisputed authority in your niche.",
    overview: "Modern SEO is an engineering discipline. It sits at the intersection of computer science, natural language processing, and consumer psychology. Many businesses waste thousands of dollars on cheap backlink packages or low-quality AI content mills, only to see their organic traffic wiped out during Google Core Algorithm updates. My approach is entirely white-hat, methodical, and tailored to high-ticket pipeline generation. We focus on search queries with genuine commercial intent, ensuring every increase in search ranking directly impacts your bottom line.",
    whyItMatters: [
      {
        title: "High-Intent Customer Acquisition",
        desc: "Unlike paid advertising where traffic vanishes the second you turn off your ad spend, organic search rankings continue driving qualified, ready-to-buy leads around the clock."
      },
      {
        title: "Immunity to Algorithm Penalties",
        desc: "By strictly following Google Search Essentials and semantic entity principles, your rankings are safeguarded against sudden core and helpful content updates."
      },
      {
        title: "Topical Authority That Compounds",
        desc: "Each piece of well-structured content strengthens the authority of your entire domain, making it progressively easier and faster to rank for competitive commercial keywords."
      },
      {
        title: "Lower Cost Per Acquisition (CPA)",
        desc: "Organic search delivers an exponentially lower long-term customer acquisition cost compared to rising CPCs on Google Ads and paid social platforms."
      }
    ],
    deliverables: [
      {
        title: "Commercial Intent Keyword Research & Mapping",
        desc: "Identification of high-converting, revenue-driving search queries mapped strategically to dedicated conversion landing pages.",
        highlight: "Revenue Focused"
      },
      {
        title: "Semantic Topic Clusters & Content Silos",
        desc: "Architecting interconnected content clusters with internal linking models that establish comprehensive topical dominance in Google's eyes.",
        highlight: "Entity Driven"
      },
      {
        title: "On-Page Optimization & Intent Alignment",
        desc: "Fine-tuning meta titles, heading hierarchies, semantic body copy, structured lists, and internal PR distribution for maximum search relevancy.",
        highlight: "Page-1 Relevance"
      },
      {
        title: "High-Authority Editorial Link Acquisition",
        desc: "Ethical, white-hat outreach to industry publications, relevant resource pages, and niche authorities to build enduring domain trust.",
        highlight: "100% White-Hat"
      },
      {
        title: "Monthly GSC & GA4 Pipeline Reporting",
        desc: "Transparent Looker Studio dashboards tracking non-brand impressions, top 10 keyword rankings, conversion rate metrics, and organic revenue.",
        highlight: "Live Data"
      }
    ],
    process: [
      {
        step: "01",
        title: "Full Organic & Competitor Audit",
        desc: "We analyze your current rankings, identify high-opportunity keyword gaps your competitors are exploiting, and benchmark baseline organic performance."
      },
      {
        step: "02",
        title: "Semantic Keyword & Content Roadmap",
        desc: "We cluster search queries into buyer-journey stages (Top-of-Funnel to Bottom-of-Funnel) and map them to high-converting URL structures."
      },
      {
        step: "03",
        title: "On-Page & Architecture Implementation",
        desc: "We rewrite underperforming metadata, structure content for maximum dwell time and engagement, and optimize internal anchor text distribution."
      },
      {
        step: "04",
        title: "Authority Building & Sprint Scaling",
        desc: "We build authoritative backlink equity, monitor Google Search Console indexing daily, and iterate on monthly content releases to expand market share."
      }
    ],
    kpis: [
      { metric: "+230%", label: "Average 6-Month Organic Traffic Growth" },
      { metric: "Page 1", label: "Target for Primary Commercial Keywords" },
      { metric: "3.4x", label: "Average Increase in Organic Inbound Leads" },
      { metric: "100%", label: "White-Hat Compliance with Google Policies" }
    ],
    faqs: [
      {
        question: "How long does it typically take to see tangible organic traffic results?",
        answer: "While some low-hanging fruit (like indexing fixes and on-page metadata improvements) can reflect within 3 to 6 weeks, lasting organic search growth typically requires 90 to 180 days. SEO is an asset-building exercise that compounds exponentially over time."
      },
      {
        question: "Do you guarantee #1 rankings on Google?",
        answer: "No ethical SEO specialist can guarantee a permanent #1 ranking, as Google's algorithm uses hundreds of dynamic ranking signals. What I guarantee is strict adherence to white-hat engineering standards, proven semantic strategies, and measurable increases in qualified traffic and leads."
      },
      {
        question: "How is your approach different from typical SEO agencies?",
        answer: "Most traditional agencies assign an inexperienced junior account manager and outsource content to cheap automated mills. With a Computer Science degree, I personally architect your technical framework, analyze server signals, and build data-backed topic clusters that actually convert visitors into revenue."
      }
    ]
  },

  'aeo': {
    slug: 'aeo',
    id: 'aeo',
    badge: 'Featured Snippets & Position Zero',
    title: 'Answer Engine Optimization (AEO)',
    tagline: 'Capture Google Position Zero, featured snippet cards, and conversational voice search responses before users even scroll.',
    iconType: 'mic',
    heroBio: "The modern search engine results page is no longer just ten blue links. Over 58% of all Google searches now end without a click to a third-party website because Google extracts and displays the direct answer right at the very top. If your content is not engineered for programmatic answer extraction, your competitors are capturing all the high-intent visibility. I structure your data with concise answer syntax, structured tables, and nested Schema markup so Google selects your website as the definitive source.",
    overview: "Answer Engine Optimization (AEO) is the science of preparing your content for modern answer engines—including Google Featured Snippets, 'People Also Ask' (PAA) accordions, Knowledge Graph entities, and voice assistants like Siri and Google Assistant. Rather than optimizing just for a single keyword, AEO targets natural language questions that real buyers ask when they are comparing solutions or seeking authoritative facts.",
    whyItMatters: [
      {
        title: "Dominate 'Position Zero'",
        desc: "Featured snippets occupy prime real estate above standard organic results, capturing the lion's share of user attention and establishing unmatched instant credibility."
      },
      {
        title: "Voice Search Supremacy",
        desc: "When users ask Google Assistant, Siri, or Alexa a spoken question, the assistant reads out only one single answer—which almost always originates from an AEO-optimized featured snippet."
      },
      {
        title: "Higher Click-Through Rates (CTR)",
        desc: "Pages that earn a featured snippet receive up to a 31% increase in click-through rate compared to standard organic rankings on the same page."
      },
      {
        title: "Defensive Search Moat",
        desc: "Once Google indexes your content as the canonical source for a question, competitors find it exceptionally difficult to displace your answer."
      }
    ],
    deliverables: [
      {
        title: "Question & PAA Query Harvesting",
        desc: "Mining thousands of conversational queries, 'People Also Ask' trees, and voice search patterns specific to your target audience.",
        highlight: "Zero-Click Capture"
      },
      {
        title: "Concise Answer Paragraph Syntax & Micro-Copy",
        desc: "Formatting definitions, step-by-step instructions, and comparative tables into the exact 40-60 word threshold preferred by Google's extraction parsers.",
        highlight: "NLP Optimized"
      },
      {
        title: "FAQPage & HowTo JSON-LD Structured Data",
        desc: "Writing custom, valid Schema.org markup that guarantees Google understands the exact semantic meaning of each question and answer on your site.",
        highlight: "Rich Snippets"
      },
      {
        title: "Table & Listicle Data Formatting",
        desc: "Converting complex comparisons and pricing tiers into semantic HTML tables and ordered lists that Google pulls directly into Position Zero.",
        highlight: "High CTR"
      }
    ],
    process: [
      {
        step: "01",
        title: "Extract High-Opportunity Questions",
        desc: "We analyze Search Console query data to pinpoint searches where your site already ranks in positions 2–8 and can leapfrog into Position Zero."
      },
      {
        step: "02",
        title: "Semantic Answer Formatting",
        desc: "We re-architect your content using clear H2/H3 question headers, followed immediately by crisp, authoritative, factual answers."
      },
      {
        step: "03",
        title: "Schema Entity Graph Implementation",
        desc: "We deploy nested FAQ, HowTo, and ItemList Schema markup verified through Google's Rich Results Test tool."
      },
      {
        step: "04",
        title: "Monitoring & Snippet Protection",
        desc: "We track featured snippet wins and snippet volatility, refining copy whenever Google updates its answer extraction models."
      }
    ],
    kpis: [
      { metric: "Top 3", label: "Average Position for Extracted Answer Snippets" },
      { metric: "+45%", label: "Average Boost in Zero-Click Brand Impressions" },
      { metric: "100%", label: "Google Rich Results Validated Schema Code" },
      { metric: "2x", label: "Voice Search Discovery for Local & Service Queries" }
    ],
    faqs: [
      {
        question: "What is the difference between SEO and AEO?",
        answer: "SEO focuses on improving your overall organic rankings and bringing users to your webpage. AEO is a specialized branch of SEO focused specifically on formatting content so that search engines can extract direct answers into featured snippets, voice search answers, and People Also Ask cards."
      },
      {
        question: "Will having featured snippets reduce clicks to my website?",
        answer: "While simple factual queries (like 'What time is it in Tokyo?') result in zero clicks, commercial and consultative queries in featured snippets actually increase CTR because users click through to read the complete context and hire the expert."
      }
    ]
  },

  'geo': {
    slug: 'geo',
    id: 'geo',
    badge: 'Generative AI & LLM Visibility',
    title: 'Generative Engine Optimization (GEO)',
    tagline: 'Position your brand to be cited, referenced, and recommended inside ChatGPT, Google AI Overviews, Perplexity, and Claude.',
    iconType: 'bot',
    heroBio: "Search is undergoing its biggest paradigm shift in 25 years. Millions of prospective buyers are turning to conversational AI engines like ChatGPT Search, Perplexity AI, Google Gemini, and Claude to ask: 'What is the best tool for my business?' or 'Who should I hire for X?'. Large Language Models do not rank websites using backlinks alone—they crawl for topical consensus, verified brand entities, authoritative author citations, and unassailable factual credibility. I build the digital entity footprint necessary for AI models to recognize, quote, and recommend your brand by name.",
    overview: "Generative Engine Optimization (GEO) is the next evolution of search visibility. When an AI generates a synthesized answer, it relies on Retrieval-Augmented Generation (RAG) to pull verified facts from trusted sources across the web. If your brand is not recognized as a distinct entity with consistent citations across authoritative nodes, you simply do not exist in AI-driven answers. My GEO strategy bridges the gap between semantic web architecture and LLM training data.",
    whyItMatters: [
      {
        title: "Be Recommended by ChatGPT & Perplexity",
        desc: "When high-net-worth buyers ask conversational AI for recommendations, your business appears directly in the synthesized bullet points with direct citations."
      },
      {
        title: "Google AI Overviews Dominance",
        desc: "Google is rolling out AI Overviews for over 80% of commercial queries. Securing a source citation inside the AI carousel drives exceptional buyer trust."
      },
      {
        title: "Verified Brand Entity Status",
        desc: "Establishing your company as a verified entity in Wikidata, Crunchbase, Google Knowledge Graph, and schema networks ensures AI models understand who you are."
      },
      {
        title: "Future-Proof Digital Marketing",
        desc: "As traditional search volume migrates toward generative conversational interfaces, your brand maintains its competitive lead while others scramble to adapt."
      }
    ],
    deliverables: [
      {
        title: "Brand Entity Architecture & Schema Graphs",
        desc: "Structuring organization, sameAs links, author credentials, and service hierarchies using advanced JSON-LD semantic graphs.",
        highlight: "Entity Status"
      },
      {
        title: "Digital PR & Consensus Citation Building",
        desc: "Placing your brand in the trusted third-party directories, comparison lists, and editorial publications that LLMs use as grounding sources.",
        highlight: "LLM Grounding"
      },
      {
        title: "Information Gain & Factual Data Publishing",
        desc: "Authoring original research, proprietary metrics, and unique case insights that AI models cannot synthesize from generic competitor content.",
        highlight: "Original Research"
      },
      {
        title: "Perplexity & AI Engine Reverse Engineering",
        desc: "Testing real-world conversational prompts and optimizing your web copy to trigger citation inclusion across all major generative engines.",
        highlight: "Prompt Engineering"
      }
    ],
    process: [
      {
        step: "01",
        title: "AI Engine Brand Audit",
        desc: "We audit how ChatGPT, Gemini, Perplexity, and Claude currently perceive your brand when queried for your core service offerings."
      },
      {
        step: "02",
        title: "Entity Disambiguation & Semantic Mapping",
        desc: "We link your brand profiles, founder credentials, and company data into an interconnected knowledge web recognized by AI crawlers."
      },
      {
        step: "03",
        title: "Information-Rich Content Publishing",
        desc: "We produce definitive guides containing proprietary frameworks, hard data, and distinct terminology that LLMs store in their knowledge vector indices."
      },
      {
        step: "04",
        title: "Continuous Prompt Tracking",
        desc: "We test target buyer queries bi-weekly across AI tools to verify citation consistency and refine brand positioning."
      }
    ],
    kpis: [
      { metric: "Top 3", label: "Inclusion in Google AI Overview Source Carousels" },
      { metric: "+80%", label: "Increase in Brand Mentions Across Perplexity & Claude" },
      { metric: "100%", label: "Schema.org Organization & Entity Disambiguation" },
      { metric: "Zero", label: "Risk of Being Overlooked by Generative Searchers" }
    ],
    faqs: [
      {
        question: "Is Generative Engine Optimization (GEO) replacing traditional SEO?",
        answer: "No, GEO does not replace SEO; it builds upon it. Search engines still crawl HTML, check technical page speed, and evaluate domain authority. GEO ensures that once your site is crawled, AI engines recognize your content as authoritative and choose to cite it in generative answers."
      },
      {
        question: "How do I know if my website is appearing in ChatGPT or Perplexity?",
        answer: "We run benchmark prompt suites simulating typical customer questions (e.g., 'What are the top SEO growth specialists for e-commerce brands?') and track source citations directly in tools like Perplexity and SearchGPT."
      }
    ]
  },

  'technical-seo': {
    slug: 'technical-seo',
    id: 'technical-seo',
    badge: 'Engineering, Crawlability & Speed',
    title: 'Technical SEO & Performance Engineering',
    tagline: 'Eliminate crawl traps, resolve JavaScript rendering snags, and pass Google Core Web Vitals with software engineering rigor.',
    iconType: 'code',
    heroBio: "Most SEO agencies run an automated scanner, export an 80-page generic PDF full of automated warnings, and drop it in your developers' lap without understanding how code executes. As a Computer Science & Engineering graduate, I bridge the gap between search strategy and production code. I analyze server response headers, DOM tree depth, JavaScript hydration delays, canonical hierarchies, and crawl budget wastage to ensure Googlebot and your users experience a lightning-fast, perfectly indexable website.",
    overview: "Technical SEO is the digital foundation upon which all content and backlink strategies stand. If Google's search crawlers encounter endless redirect loops, broken JavaScript bundles, slow TTFB (Time to First Byte), or unoptimized Core Web Vitals, your rankings will stall—regardless of how brilliant your written content is. My technical audits are hands-on, deeply pragmatic, and tailored directly to your engineering stack (Next.js, WordPress, Shopify, Laravel, or custom builds).",
    whyItMatters: [
      {
        title: "Efficient Crawl Budget Utilization",
        desc: "Search engines allocate limited resources to crawl your website. Eliminating parameter bloat and 404 dead ends ensures high-priority revenue pages get indexed instantly."
      },
      {
        title: "Passing Core Web Vitals (CWV)",
        desc: "Google uses Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) as direct mobile search ranking signals."
      },
      {
        title: "JavaScript Rendering Verification",
        desc: "Modern web frameworks (React, Vue, Next.js) can silently prevent Googlebot from rendering critical body text and internal links if hydration fails."
      },
      {
        title: "Bulletproof Indexing Architecture",
        desc: "Clean canonical tags, XML sitemaps, robots.txt directives, and server status codes prevent duplicate content confusion and indexing drops."
      }
    ],
    deliverables: [
      {
        title: "Complete Core Web Vitals & PageSpeed Optimization",
        desc: "Diagnosing render-blocking resources, uncompressed assets, third-party script bloat, and server latency to achieve 90+ mobile PageSpeed scores.",
        highlight: "Core Web Vitals"
      },
      {
        title: "JavaScript SEO & Hydration Inspection",
        desc: "Verifying that client-rendered content, links, and schema markup are fully visible in Googlebot's second-wave rendering pipeline.",
        highlight: "Full Rendering"
      },
      {
        title: "Crawl Budget & Architecture Cleanup",
        desc: "Eliminating internal redirect chains, orphan pages, parameter duplication, and optimizing robots.txt crawl directives.",
        highlight: "Zero Crawl Traps"
      },
      {
        title: "Custom Semantic Schema JSON-LD Graphs",
        desc: "Hand-coding valid, error-free structured data for Organization, Services, Articles, Products, Breadcrumbs, and FAQs.",
        highlight: "Rich Schema"
      },
      {
        title: "Direct Developer Implementation Guidance",
        desc: "Clear, concise tickets for your engineering team with exact code snippets, CSS optimizations, and configuration changes.",
        highlight: "Dev Ready"
      }
    ],
    process: [
      {
        step: "01",
        title: "Server & Log File Analysis",
        desc: "We examine how search crawlers currently navigate your domain, identifying crawl budget waste, 4xx/5xx errors, and server response times."
      },
      {
        step: "02",
        title: "DOM & Core Web Vitals Audit",
        desc: "We measure real-user mobile performance metrics (LCP, INP, CLS) using Chrome UX Report (CrUX) and Chrome DevTools."
      },
      {
        step: "03",
        title: "Actionable Technical Fix Sprint",
        desc: "We write clean code solutions or collaborate directly with your development team to deploy performance patches and schema graphs."
      },
      {
        step: "04",
        title: "Google Search Console Re-Validation",
        desc: "We request immediate re-crawls in GSC, monitor indexing updates, and verify that all technical errors are permanently marked as passed."
      }
    ],
    kpis: [
      { metric: "< 2.0s", label: "Target Largest Contentful Paint (LCP) on Mobile" },
      { metric: "100%", label: "Passing Score on Core Web Vitals Assessment" },
      { metric: "Zero", label: "Critical Indexing Errors or Canonical Conflicts" },
      { metric: "90+", label: "Target Google PageSpeed Insights Performance Score" }
    ],
    faqs: [
      {
        question: "Can you fix the code directly, or do you just give recommendations?",
        answer: "Because I have a Computer Science degree and experience building production web applications, I can either collaborate with your development team via Git/pull requests or implement the changes directly depending on your hosting setup."
      },
      {
        question: "What platforms and frameworks do you support?",
        answer: "I support Next.js, React, WordPress, Shopify, Webflow, Laravel, and custom Node/PHP backends. Every technical fix is customized to your specific technology stack."
      }
    ]
  },

  'meta-ads': {
    slug: 'meta-ads',
    id: 'meta-ads',
    badge: 'Paid Social & Conversion Funnels',
    title: 'Meta Ads Management (Facebook & Instagram)',
    tagline: 'Turn cold social scrollers into qualified, paying buyers with precision audience targeting and scalable ad account structures.',
    iconType: 'trending',
    heroBio: "Running profitable Meta Ads isn't about boosting random social posts or setting broad interests and crossing your fingers. It requires a disciplined, full-funnel psychological architecture: capturing cold attention with scroll-stopping video hooks, warming up prospective leads with social proof, and closing ready-to-buy customers with irresistible retargeting offers. I build data-driven ad account structures with strict CBO budgeting and server-side Conversions API (CAPI) tracking to ensure every marketing dollar spent delivers measurable return on ad spend (ROAS).",
    overview: "Meta Ads remains one of the most powerful demand-generation channels on Earth when executed with statistical discipline. The post-iOS14 landscape wiped out amateur media buyers who relied on simple pixel tracking. Today, winning on Facebook and Instagram requires advanced server-side tracking, algorithmic creative testing, high-converting landing page design, and relentless offer optimization. I manage your ad spend as if it were my own capital, focusing on bottom-line profit rather than vanity impressions.",
    whyItMatters: [
      {
        title: "Immediate Traffic & Revenue Injection",
        desc: "While SEO compounds over months, Meta Ads can test an offer, validate audience resonance, and generate customer revenue within 48 to 72 hours of launch."
      },
      {
        title: "High-Intent Retargeting Funnels",
        desc: "Over 95% of first-time website visitors don't buy immediately. Hyper-targeted retargeting campaigns re-engage interested shoppers and dramatically lift conversion rates."
      },
      {
        title: "Predictable Scaling Mechanism",
        desc: "Once a winning creative and audience combination is unlocked, budget can be scaled systematically using Advantage+ and Campaign Budget Optimization (CBO)."
      },
      {
        title: "Full Funnel Synergy with SEO",
        desc: "Paid social builds immediate brand search demand, which in turn lifts organic search volume and brand CTR in Google Search results."
      }
    ],
    deliverables: [
      {
        title: "Complete Meta Pixel & Conversions API (CAPI) Setup",
        desc: "Configuring server-side tracking and custom event parameters to bypass ad blockers and restore 100% conversion attribution accuracy.",
        highlight: "Server-Side CAPI"
      },
      {
        title: "Full-Funnel Campaign Architecture (TOF / MOF / BOF)",
        desc: "Structuring separate ad sets for cold prospecting, engaged warm audiences, and high-intent cart abandoners to prevent ad fatigue.",
        highlight: "Structured Funnel"
      },
      {
        title: "Creative Strategy & Angle Ideation",
        desc: "Writing persuasive, benefit-led direct response ad copy, scripting short-form video hooks, and designing click-optimized creative formats.",
        highlight: "High CTR Hooks"
      },
      {
        title: "Landing Page Conversion Rate Optimization (CRO)",
        desc: "Auditing and optimizing your post-click destination page to eliminate friction, improve load speed, and maximize checkout conversions.",
        highlight: "More Sales"
      },
      {
        title: "Weekly Budget Pacing & ROAS Optimization",
        desc: "Aggressively cutting non-performing ads, scaling winning creative variations, and providing clear weekly cost-per-acquisition (CPA) reports.",
        highlight: "Max Profit"
      }
    ],
    process: [
      {
        step: "01",
        title: "Account & Tracking Audit",
        desc: "We verify server-side CAPI event deduplication, review historical ad account data, and benchmark previous customer acquisition costs."
      },
      {
        step: "02",
        title: "Audience & Creative Sprint",
        desc: "We build tailored custom audiences, develop 3–5 distinct psychological creative angles, and write persuasive direct-response ad copy."
      },
      {
        step: "03",
        title: "Controlled Testing Phase",
        desc: "We launch dynamic creative testing with controlled micro-budgets to identify the highest-converting hooks, headlines, and visuals."
      },
      {
        step: "04",
        title: "Scaling & Funnel Optimization",
        desc: "We migrate validated winning creatives into high-budget scaling campaigns while simultaneously building automated retargeting sequences."
      }
    ],
    kpis: [
      { metric: "3.5x - 5.0x", label: "Target Return on Ad Spend (ROAS) on Scaling Campaigns" },
      { metric: "< 24h", label: "Average Response Time to Ad Performance Fluctuations" },
      { metric: "100%", label: "Server-Side CAPI Event Match Quality Compliance" },
      { metric: "-30%", label: "Target Reduction in Cost Per Acquisition (CPA)" }
    ],
    faqs: [
      {
        question: "What monthly ad spend budget do you recommend starting with?",
        answer: "For effective creative testing and algorithmic learning, I recommend a minimum monthly media spend of $1,000 to $3,000 (payable directly to Meta), separate from the management fee."
      },
      {
        question: "Do you design the creative visuals and write the copy?",
        answer: "Yes! I provide direct-response ad copy, creative briefs, static ad designs, and video hook scripts. If you have existing product photography or video assets, I edit and format them specifically for optimal mobile social engagement."
      }
    ]
  },

  'security-seo': {
    slug: 'security-seo',
    id: 'security-seo',
    badge: 'Search Defense & Site Integrity',
    title: 'Security-Aware SEO & Rank Defense',
    tagline: 'Shield your hard-won domain authority from malware injections, Japanese keyword hacks, and devastating Google search blacklists.',
    iconType: 'shield',
    heroBio: "It takes months or years of disciplined work to rank on Google Page 1—and less than 24 hours for a stealth malware injection, malicious redirect, or Japanese keyword hack to destroy your search presence. When Google detects security vulnerabilities, it slaps an alarming 'This site may be hacked' warning in the search results or delists your domain entirely. Combining my computer science background with SEO expertise, I monitor SSL protocols, HTTP security headers, backlink spam attacks, and crawl anomalies so your organic revenue is fortified against devastating disruptions.",
    overview: "Search engines hold websites to rigorous security standards. A single infected plugin or unprotected database endpoint can allow bad actors to inject thousands of spam URLs into your site's indexation graph, destroying your search crawl budget and triggering immediate algorithmic demotions. Security-Aware SEO integrates vulnerability prevention directly into your regular search maintenance, ensuring you never wake up to find your domain deindexed.",
    whyItMatters: [
      {
        title: "Prevent Devastating Google Blacklists",
        desc: "Google Search Console will instantly flag compromised sites with deceptive warnings, causing organic click-through rates to plummet by over 90% overnight."
      },
      {
        title: "Defend Against Spam Injections",
        desc: "Automated bots constantly attempt to inject hidden casino, pharmaceutical, and phishing links into legitimate websites to steal domain trust."
      },
      {
        title: "Protect User Trust & Customer Data",
        desc: "Enterprise and B2B buyers will immediately abandon a vendor whose website displays SSL certificate errors or suspicious browser warnings."
      },
      {
        title: "Preserve Clean Crawl Efficiency",
        desc: "Spam hacks can generate millions of fake Japanese/foreign language URLs that consume your entire search engine crawl budget, causing real pages to drop."
      }
    ],
    deliverables: [
      {
        title: "Comprehensive Security & Vulnerability Screening",
        desc: "Scanning server file directories, database tables, and plugin code for obfuscated PHP backdoors, injected scripts, and rogue admin accounts.",
        highlight: "Malware Clean"
      },
      {
        title: "SSL / TLS & HTTP Security Headers Hardening",
        desc: "Configuring HSTS, Content-Security-Policy (CSP), X-Frame-Options, and secure cookie attributes to prevent man-in-the-middle attacks.",
        highlight: "A+ SSL Score"
      },
      {
        title: "Google Search Console Security Monitoring",
        desc: "24/7 automated monitoring of GSC Security & Manual Actions tabs to catch and neutralize security alerts before they damage rankings.",
        highlight: "Instant Alerts"
      },
      {
        title: "Negative SEO & Spam Backlink Disavowal",
        desc: "Analyzing incoming link velocity to identify automated bot attacks and submitting targeted Google Disavow files to protect domain reputation.",
        highlight: "Spam Defense"
      },
      {
        title: "Emergency Hack Cleanup & Reconsideration Filing",
        desc: "Rapid quarantine of infected files, database sanitization, and filing formal Google reconsideration requests to restore lost rankings.",
        highlight: "Fast Recovery"
      }
    ],
    process: [
      {
        step: "01",
        title: "Deep Security & Vulnerability Scan",
        desc: "We examine your file integrity, check external blacklists (Google Safe Browsing, Norton, McAfee), and audit user permission levels."
      },
      {
        step: "02",
        title: "Server & Header Hardening",
        desc: "We enforce strict HTTPS protocols, deploy modern security headers, and disable directory browsing and XML-RPC attack surfaces."
      },
      {
        step: "03",
        title: "Indexation & Backlink Screening",
        desc: "We inspect your indexed URL counts in Google Search Console to detect foreign language spam URLs and disavow toxic link blasts."
      },
      {
        step: "04",
        title: "Continuous Automated Monitoring",
        desc: "We set up automated uptime and file alteration alerts so unauthorized modifications are caught and resolved in minutes."
      }
    ],
    kpis: [
      { metric: "100%", label: "Safe Browsing Status across Google & Major Antivirus Databases" },
      { metric: "< 24h", label: "Emergency Response Window for Compromised Domain Recovery" },
      { metric: "A+", label: "Target SSL Labs Security & Encryption Rating" },
      { metric: "Zero", label: "Unresolved Security Notifications in Google Search Console" }
    ],
    faqs: [
      {
        question: "My site was hacked and shows 'This site may be hacked' on Google. Can you fix it?",
        answer: "Yes. I specialize in emergency malware cleanups: stripping malicious code, removing injected spam URLs, repairing broken htaccess files, and filing an expedited review request with Google to restore your clean status."
      },
      {
        question: "Does site security really affect Google rankings?",
        answer: "Absolutely. Google prioritizes user safety above all else. HTTPS is a confirmed ranking signal, and any website hosting malware or phishing scripts will be aggressively downgraded or removed from search results."
      }
    ]
  },

  'it-support': {
    slug: 'it-support',
    id: 'it-support',
    badge: 'Infrastructure, DNS & Systems',
    title: 'IT Support & Systems Administration',
    tagline: 'Ensure reliable system administration, email authentication protocols, and enterprise infrastructure hygiene for seamless business operations.',
    iconType: 'server',
    heroBio: "Behind every high-ranking, dependable web property is a rock-solid IT infrastructure. When your DNS records are misconfigured, your corporate emails land in your clients' spam folders. When your web host suffers unmonitored downtime or database bottlenecks, you hemorrhage organic traffic and sales. With a Computer Science & Engineering degree, I handle your system administration, domain management, email deliverability authentication (SPF, DKIM, DMARC), and server hygiene so your operations run flawlessly without technical friction.",
    overview: "Digital growth requires a dependable technical foundation. Too many businesses suffer from fragmented IT: domains registered on one platform, hosting on another, broken email forwarding, and zero automated backup protocols. I act as your trusted technical partner, translating complex server environments into smooth, reliable operations that keep your team productive and your customer data protected.",
    whyItMatters: [
      {
        title: "100% Business Email Deliverability",
        desc: "Configuring strict SPF, DKIM, and DMARC records guarantees your invoices, proposals, and customer emails reach inboxes instead of spam folders."
      },
      {
        title: "Maximized Server Uptime & Reliability",
        desc: "Continuous server monitoring and resource optimization ensure your website never crashes during high-traffic marketing campaigns."
      },
      {
        title: "Automated Disaster Recovery",
        desc: "Daily off-site backups ensure that in the event of hardware failure, ransomware, or human error, your entire digital asset can be restored in minutes."
      },
      {
        title: "Centralized Technical Governance",
        desc: "Streamlined management of DNS records, SSL certificates, business email accounts, and staging environments under one roof."
      }
    ],
    deliverables: [
      {
        title: "DNS Management & Email Authentication (SPF, DKIM, DMARC)",
        desc: "Full setup and verification of Google Workspace, Microsoft 365, and transactional email deliverability protocols.",
        highlight: "Inbox Delivery"
      },
      {
        title: "Web Server & Hosting Environment Configuration",
        desc: "Optimizing Apache, Nginx, LiteSpeed, and cloud instances (AWS, DigitalOcean, Vercel) for maximum throughput and minimum latency.",
        highlight: "High Uptime"
      },
      {
        title: "Automated Off-Site Backup & Recovery Architecture",
        desc: "Implementing automated, encrypted daily backups stored securely off-server with one-click restoration testing.",
        highlight: "Disaster Proof"
      },
      {
        title: "Domain Migrations & Registrar Management",
        desc: "Safe transfers of domains, nameservers, and MX records with zero downtime or email interruption.",
        highlight: "Zero Downtime"
      },
      {
        title: "Workstation & Network Security Best Practices",
        desc: "Guiding your team on password managers, multi-factor authentication (MFA), and secure remote access protocols.",
        highlight: "Team Security"
      }
    ],
    process: [
      {
        step: "01",
        title: "IT Infrastructure Audit",
        desc: "We inventory all domain registrations, nameservers, hosting servers, and active MX/email routing configurations."
      },
      {
        step: "02",
        title: "Security & Deliverability Hardening",
        desc: "We publish strict DMARC enforcement policies, fix DNS misconfigurations, and test email inbox placement across Gmail and Outlook."
      },
      {
        step: "03",
        title: "Backup & Recovery Deployment",
        desc: "We deploy automated off-site snapshot backups and verify that disaster recovery protocols work smoothly."
      },
      {
        step: "04",
        title: "Ongoing System Monitoring",
        desc: "We maintain 24/7 uptime surveillance and handle DNS record adjustments whenever you adopt new marketing or SaaS tools."
      }
    ],
    kpis: [
      { metric: "99.9%", label: "Target Server & Infrastructure Uptime" },
      { metric: "100%", label: "SPF, DKIM, and DMARC Email Authentication Compliance" },
      { metric: "< 30m", label: "Emergency Disaster Recovery Restoration Time" },
      { metric: "Zero", label: "Business Email Deliverability Drops to Spam" }
    ],
    faqs: [
      {
        question: "Why are my business emails landing in my clients' spam folders?",
        answer: "In early 2024, Google and Yahoo introduced strict requirements mandating that bulk and commercial senders must have valid SPF, DKIM, and DMARC records configured on their custom domain. Without these, your emails are automatically flagged as suspicious."
      },
      {
        question: "Can you help migrate our site to a faster hosting server without downtime?",
        answer: "Yes. I execute zero-downtime server migrations by cloning your environment, testing on a private staging host, and synchronizing database records before updating DNS nameservers."
      }
    ]
  },

  'strategy': {
    slug: 'strategy',
    id: 'strategy',
    badge: 'Framework, Execution & ROI',
    title: 'End-to-End Search Growth Strategy',
    tagline: 'A systematic 90-day search roadmap built on computer science principles, commercial keyword intent, and compound revenue scaling.',
    iconType: 'route',
    heroBio: "Random marketing tactics produce random, inconsistent results. Sustainable search engine dominance requires a clear engineering blueprint. My end-to-end framework takes you from the initial diagnostic deep-dive to competitive gap analysis, technical execution, semantic topic clustering, and continuous monthly scaling. You will never be left wondering what was done this month or how it impacts your pipeline. Everything is tracked transparently against clear commercial milestones.",
    overview: "Many businesses abandon SEO because their previous agency delivered vague monthly reports filled with jargon and vanity impressions that generated zero actual revenue. My process is engineered for complete transparency. Every sprint is organized into distinct phases with defined deliverables, direct Slack communication, and live Google Search Console integration.",
    whyItMatters: [
      {
        title: "Total Clarity & Predictable Milestones",
        desc: "You always know what is being worked on this sprint, why it was prioritized, and the exact commercial outcome expected."
      },
      {
        title: "Prioritization Based on Commercial Impact",
        desc: "We tackle the highest-ROI opportunities first—fixing conversion bottlenecks and ranking high-intent buyer keywords before pursuing broad top-of-funnel terms."
      },
      {
        title: "Full Alignment with Business Goals",
        desc: "SEO is not executed in a vacuum; it is synchronized with your sales cycle, product launches, and commercial targets."
      },
      {
        title: "Agile Sprints with Continuous Iteration",
        desc: "Search algorithms and competitor strategies shift constantly. Our sprint framework adapts rapidly to new market opportunities."
      }
    ],
    deliverables: [
      {
        title: "90-Day Customized Growth Roadmap",
        desc: "A comprehensive, phased implementation plan detailing every technical fix, content release, and authority target for the quarter.",
        highlight: "Strategic Blueprint"
      },
      {
        title: "Bi-Weekly Video Sprint Check-Ins",
        desc: "Loom walkthroughs and live 1-on-1 strategy sessions reviewing sprint progress, ranking gains, and next sprint priorities.",
        highlight: "Direct Access"
      },
      {
        title: "Real-Time Looker Studio Executive Dashboard",
        desc: "A single live dashboard tracking impressions, organic clicks, top keyword positions, and lead conversions 24 hours a day.",
        highlight: "Live ROI"
      },
      {
        title: "Competitive Intelligence & Gap Monitoring",
        desc: "Continuous surveillance of top 3 competitors to reverse-engineer their newest backlink wins and content strategies.",
        highlight: "Market Edge"
      }
    ],
    process: [
      {
        step: "01",
        title: "Phase 1: Deep Diagnostic & Discovery (Weeks 1–2)",
        desc: "We audit your domain architecture, crawl health, Core Web Vitals, and past penalty history while establishing baseline KPI benchmarks."
      },
      {
        step: "02",
        title: "Phase 2: Technical Repair & Foundation (Weeks 3–5)",
        desc: "We eliminate indexing bottlenecks, fix canonical tags, deploy Schema entity graphs, and optimize mobile page speed."
      },
      {
        step: "03",
        title: "Phase 3: Semantic Content & Intent Execution (Weeks 6–9)",
        desc: "We launch targeted topic clusters, re-optimize high-potential legacy pages, and format content for featured snippets and AI Overviews."
      },
      {
        step: "04",
        title: "Phase 4: Authority Scaling & Compound Growth (Weeks 10–12+)",
        desc: "We execute high-tier editorial outreach, expand into secondary keyword markets, and review quarterly pipeline return on investment."
      }
    ],
    kpis: [
      { metric: "90 Days", label: "Standard Comprehensive Strategic Sprint Cycle" },
      { metric: "100%", label: "Transparency with Live Reporting & Direct Communication" },
      { metric: "2x - 4x", label: "Average Qualified Lead Expansion Within 6 Months" },
      { metric: "Zero", label: "Fluff, Vanity Metrics, or Incomprehensible Technical Jargon" }
    ],
    faqs: [
      {
        question: "How involved does my internal team need to be?",
        answer: "Minimal time is required from your side. We need approximately 30 minutes every two weeks for our sprint check-in call, plus initial access to Google Search Console and analytics."
      },
      {
        question: "What happens after the first 90-day sprint?",
        answer: "After 90 days, we review our quarterly ranking and pipeline gains, establish new commercial targets, and transition into monthly scaling sprints to defend your rankings and capture adjacent market share."
      }
    ]
  }
};
