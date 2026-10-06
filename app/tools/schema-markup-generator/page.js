"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

const SCHEMA_CATEGORIES = [
  {
    category: "Knowledge Graph & Authority",
    schemas: [
      { id: "MasterGraph", label: "Master @graph Hub", icon: "fa-diagram-project", badge: "Enterprise SEO", desc: "Full connected WebSite + Org + Author + Page graph" },
      { id: "Organization", label: "Organization / Brand", icon: "fa-building", badge: "Knowledge Graph", desc: "Corporation, SaaS, Agency, NGO entity data" },
      { id: "Person", label: "Person / E-E-A-T Author", icon: "fa-user-tie", badge: "Author Trust", desc: "Expert bio, credentials, alumni, sameAs socials" },
      { id: "WebSite", label: "WebSite + Sitelinks Search", icon: "fa-globe", badge: "SERP Searchbox", desc: "Site entity with SearchAction URL query template" }
    ]
  },
  {
    category: "Commerce, Local & Services",
    schemas: [
      { id: "LocalBusiness", label: "Local Business / Clinic", icon: "fa-shop", badge: "Google Maps", desc: "NAP, Geo Lat/Long, opening hours, review stars" },
      { id: "Product", label: "Product & Offer", icon: "fa-box-open", badge: "Google Shopping", desc: "E-com pricing, SKU, GTIN-13 barcode, stock status" },
      { id: "Service", label: "Service Offering", icon: "fa-briefcase", badge: "Service Graph", desc: "Consulting packages, pricing, coverage areas" },
      { id: "SoftwareApplication", label: "Software / SaaS App", icon: "fa-laptop-code", badge: "App Rich Result", desc: "Operating systems, category, pricing, ratings" }
    ]
  },
  {
    category: "Content, Media & SERP Drops",
    schemas: [
      { id: "Article", label: "Article / BlogPosting", icon: "fa-newspaper", badge: "Top Stories", desc: "Editorial news, tech articles with author credentials" },
      { id: "FAQPage", label: "FAQ Page", icon: "fa-circle-question", badge: "SERP Accordion", desc: "Interactive expandable Q&A pairs on SERPs" },
      { id: "BreadcrumbList", label: "Breadcrumb Hierarchy", icon: "fa-folder-tree", badge: "SERP Trail", desc: "Replaces plain URLs with structured breadcrumbs" },
      { id: "HowTo", label: "How-To Step Guide", icon: "fa-list-ol", badge: "Visual Steps", desc: "Numbered instructional steps with duration" },
      { id: "Event", label: "Event & Webinar", icon: "fa-calendar-star", badge: "Event Pack", desc: "Virtual streams, physical venues, ticket offers" },
      { id: "VideoObject", label: "Video Object", icon: "fa-video", badge: "Video Carousel", desc: "Thumbnails, duration, upload date, embed links" },
      { id: "JobPosting", label: "Job Posting", icon: "fa-id-badge", badge: "Google Jobs", desc: "Hiring org, salary range, employment type, location" },
      { id: "Course", label: "Course / Training", icon: "fa-graduation-cap", badge: "Course Carousel", desc: "Course code, provider, learning mode, pricing" },
      { id: "Recipe", label: "Recipe", icon: "fa-utensils", badge: "Recipe Carousel", desc: "Culinary steps, prep/cook times, calories, yield" }
    ]
  }
];

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState("MasterGraph");
  const [activeTab, setActiveTab] = useState("code"); // 'code', 'serp_preview', 'graph_visualizer', 'compliance'
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [searchFilter, setSearchFilter] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // 1. MASTER GRAPH STATE
  const [masterGraphData, setMasterGraphData] = useState({
    siteName: "Abdullah Saleh - Organic SEO & GEO Growth",
    siteUrl: "https://abdullahbdseo.vercel.app",
    searchUrlTemplate: "https://abdullahbdseo.vercel.app/blog?q={search_term_string}",
    orgName: "AbdullahBD SEO & Digital Growth Agency",
    orgLogo: "https://abdullahbdseo.vercel.app/images/logo.png",
    authorName: "Abdullah Saleh",
    authorJobTitle: "Lead SEO Strategist & AI Search Architect",
    authorBioUrl: "https://abdullahbdseo.vercel.app/about",
    pageTitle: "Generative Engine Optimization (GEO): The Complete 2026 Guide",
    pageUrl: "https://abdullahbdseo.vercel.app/blog/generative-engine-optimization-geo-complete-guide-2026",
    pageDescription: "Comprehensive guide to structuring content, entity graphs, and schema markup for ChatGPT Search and Google AI Overviews.",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06",
    primaryImage: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg"
  });

  // 2. ORGANIZATION STATE
  const [orgData, setOrgData] = useState({
    subType: "Corporation",
    name: "Abdullah SEO & Growth Agency",
    legalName: "Abdullah Organic SEO Solutions Ltd.",
    alternateName: "AbdullahBD SEO",
    url: "https://abdullahbdseo.vercel.app",
    logo: "https://abdullahbdseo.vercel.app/images/logo.png",
    description: "Enterprise technical SEO consultancy, Generative Engine Optimization (GEO), and high-intent backlink strategies.",
    foundingDate: "2019-01-15",
    founderName: "Abdullah Saleh",
    vatID: "BD-TAX-9988220",
    duns: "08-123-4567",
    email: "abdullahbd.seo@gmail.com",
    phone: "+880 1670-769816",
    contactType: "customer support",
    street: "Level 4, IT Valley, Silicon Tower",
    city: "Dhaka",
    region: "Dhaka Division",
    postalCode: "1212",
    country: "BD",
    sameAs: [
      "https://facebook.com/abdullahbdseo",
      "https://twitter.com/abdullahsaleh_seo",
      "https://linkedin.com/in/abdullah-saleh-seo",
      "https://youtube.com/@abdullahbdseo",
      "https://github.com/abdullahbdseo",
      "https://www.wikidata.org/wiki/Q000000",
      "https://crunchbase.com/organization/abdullah-seo"
    ]
  });

  // 3. PERSON / AUTHOR STATE
  const [personData, setPersonData] = useState({
    name: "Abdullah Saleh",
    jobTitle: "Lead SEO Strategist & Organic Growth Architect",
    worksFor: "AbdullahBD SEO & Growth Agency",
    url: "https://abdullahbdseo.vercel.app/about",
    image: "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
    description: "Experienced Organic Business Growth Specialist and Technical SEO Expert helping global businesses dominate Google Search and Generative AI engines.",
    email: "abdullahbd.seo@gmail.com",
    telephone: "+880 1670-769816",
    alumniOf: "University of Dhaka",
    knowsAbout: "Technical SEO, Core Web Vitals, GEO (Generative Engine Optimization), AI Search Citations, Entity Schema, Python SEO Automation, Knowledge Graphs",
    sameAs: [
      "https://linkedin.com/in/abdullah-saleh-seo",
      "https://twitter.com/abdullahsaleh_seo",
      "https://github.com/abdullahbdseo",
      "https://facebook.com/abdullahbdseo"
    ]
  });

  // 4. WEBSITE STATE
  const [webSiteData, setWebSiteData] = useState({
    name: "Abdullah Saleh - Best SEO Expert in Bangladesh",
    alternateName: "AbdullahBD SEO Portal",
    url: "https://abdullahbdseo.vercel.app",
    searchTarget: "https://abdullahbdseo.vercel.app/blog?q={search_term_string}",
    queryInput: "required name=search_term_string",
    inLanguage: "en-US",
    description: "Top-rated organic SEO, Generative Engine Optimization (GEO), and technical website growth platform."
  });

  // 5. LOCAL BUSINESS STATE
  const [localBiz, setLocalBiz] = useState({
    subType: "ProfessionalService",
    name: "Abdullah Saleh - Premier SEO & Digital Clinic",
    url: "https://abdullahbdseo.vercel.app",
    image: "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
    phone: "+880 1670-769816",
    email: "abdullahbd.seo@gmail.com",
    street: "Road 11, Block D, Banani",
    city: "Dhaka",
    region: "Dhaka",
    postalCode: "1213",
    country: "BD",
    latitude: "23.7937",
    longitude: "90.4043",
    hasMap: "https://maps.google.com/?q=23.7937,90.4043",
    priceRange: "$$",
    currenciesAccepted: "USD, BDT, EUR",
    paymentAccepted: "Credit Card, Bank Transfer, Crypto USDT",
    areaServed: "Bangladesh, United States, United Kingdom, Australia, Canada, UAE",
    opensTime: "09:00",
    closesTime: "18:00",
    ratingValue: "5.0",
    reviewCount: "48"
  });

  // 6. PRODUCT STATE
  const [productData, setProductData] = useState({
    name: "Enterprise Technical SEO & GEO Audit Package",
    image: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg",
    description: "Complete 150-point technical SEO audit covering Core Web Vitals, Crawl Budget, Knowledge Graph Entity Schema, and AI Citation Optimization.",
    brand: "AbdullahBD SEO",
    sku: "SEO-AUDIT-ENT-2026",
    mpn: "MPN-880-SEO-01",
    gtin13: "8801234567890",
    price: "499.00",
    priceCurrency: "USD",
    priceValidUntil: "2026-12-31",
    availability: "InStock",
    itemCondition: "NewCondition",
    sellerName: "Abdullah Saleh Organic SEO",
    ratingValue: "4.9",
    reviewCount: "124"
  });

  // 7. ARTICLE STATE
  const [articleData, setArticleData] = useState({
    subType: "BlogPosting",
    headline: "ChatGPT Search Optimization: 7 Proven Tactics to Get Your Brand Cited by AI Chatbots in 2026",
    url: "https://abdullahbdseo.vercel.app/blog/chatgpt-search-optimization-brand-citations-ai-chatbots-2026",
    image: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg",
    description: "Master ChatGPT Search optimization, RAG retrieval flow, Bing Quality signals, and answer capsules to secure brand citations in 2026.",
    articleSection: "GEO & Generative AI Search",
    keywords: "ChatGPT Search, ChatGPT SEO, AI Citations, GEO, Bing SEO, RAG Optimization",
    wordCount: "1670",
    authorName: "Abdullah Saleh",
    authorUrl: "https://abdullahbdseo.vercel.app/about",
    authorJobTitle: "Lead SEO Strategist & AI Search Architect",
    publisherName: "AbdullahBD SEO",
    publisherLogo: "https://abdullahbdseo.vercel.app/images/logo.png",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06"
  });

  // 8. FAQ PAGE STATE
  const [faqList, setFaqList] = useState([
    {
      question: "What is Generative Engine Optimization (GEO) and how does it differ from traditional SEO?",
      answer: "GEO focuses on structuring content, entities, and schema markup so large language models like ChatGPT Search, Google AI Overviews, and Perplexity extract and cite your website as an authoritative source, whereas traditional SEO focuses primarily on blue link rankings."
    },
    {
      question: "How does JSON-LD schema markup help with AI Chatbot citations?",
      answer: "JSON-LD schema provides explicit semantic entity facts (Organization, sameAs, Author, FAQ, Service) directly to AI search crawlers like OAI-SearchBot and Googlebot, dramatically reducing hallucination and increasing citation probability."
    },
    {
      question: "Where should I paste the generated JSON-LD code?",
      answer: "Paste the generated <script type=\"application/ld+json\"> code inside the <head> section of your HTML document, or inject it via Next.js Metadata API or Google Tag Manager."
    }
  ]);

  // 9. BREADCRUMBLIST STATE
  const [breadcrumbs, setBreadcrumbs] = useState([
    { position: 1, name: "Home", url: "https://abdullahbdseo.vercel.app" },
    { position: 2, name: "Services", url: "https://abdullahbdseo.vercel.app/services" },
    { position: 3, name: "Technical SEO Service", url: "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh" }
  ]);

  // 10. HOW-TO STATE
  const [howToData, setHowToData] = useState({
    name: "How to Optimize Your Website for ChatGPT Search Citations",
    description: "A step-by-step actionable workflow to structure answer capsules, submit to Bing Webmaster Tools, and deploy FAQPage schema for AI discovery.",
    totalTime: "PT45M",
    estimatedCost: "0.00",
    currency: "USD",
    image: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg",
    steps: [
      { name: "Step 1: Write 40-Word Standalone Answer Capsules", text: "Place a concise 35-50 word direct definition immediately under every H2 heading.", url: "https://abdullahbdseo.vercel.app#step1" },
      { name: "Step 2: Deploy Valid FAQPage JSON-LD Schema", text: "Wrap conversational questions into schema so OpenAI's RAG extractor can isolate answers.", url: "https://abdullahbdseo.vercel.app#step2" },
      { name: "Step 3: Connect Brand Entities With sameAs Wikidata Links", text: "Link your Organization schema to verified Crunchbase, LinkedIn, and Wikidata nodes.", url: "https://abdullahbdseo.vercel.app#step3" }
    ]
  });

  // 11. SERVICE STATE
  const [serviceData, setServiceData] = useState({
    name: "Generative Engine Optimization (GEO) & AI Citation Service",
    serviceType: "Organic Search Optimization",
    description: "Reverse-engineer AI search models and optimize brand entity authority to win prominent citations in Google AI Overviews, ChatGPT Search, and Perplexity AI.",
    providerName: "AbdullahBD SEO",
    providerUrl: "https://abdullahbdseo.vercel.app",
    areaServed: "Global",
    serviceUrl: "https://abdullahbdseo.vercel.app/services/geo-service-in-bangladesh",
    price: "750.00",
    priceCurrency: "USD",
    priceType: "Starting At"
  });

  // 12. EVENT STATE
  const [eventData, setEventData] = useState({
    name: "2026 AI Search & GEO Masterclass: Ranking in ChatGPT & Gemini",
    description: "Live intensive 3-hour masterclass covering entity authority, answer capsules, and reverse-engineering AI crawler ranking algorithms.",
    image: "https://abdullahbdseo.vercel.app/images/blog_ai_overviews_geo.jpg",
    startDate: "2026-11-15T18:00:00+06:00",
    endDate: "2026-11-15T21:00:00+06:00",
    eventAttendanceMode: "OnlineEventAttendanceMode",
    eventStatus: "EventScheduled",
    virtualUrl: "https://abdullahbdseo.vercel.app/webinar/geo-masterclass-2026",
    locationName: "Grand Ballroom, Dhaka IT Center",
    locationAddress: "Gulshan 2, Dhaka 1212, Bangladesh",
    organizerName: "Abdullah Saleh",
    organizerUrl: "https://abdullahbdseo.vercel.app",
    ticketPrice: "49.00",
    ticketCurrency: "USD",
    ticketAvailability: "InStock"
  });

  // 13. VIDEO STATE
  const [videoData, setVideoData] = useState({
    name: "How Google AI Overviews Select Citation Sources in 2026",
    description: "Watch this comprehensive walkthrough on entity resolution, Knowledge Graph nodes, and E-E-A-T score factors that power Google AI answers.",
    thumbnailUrl: "https://abdullahbdseo.vercel.app/images/blog_ai_overviews_geo.jpg",
    uploadDate: "2026-09-29T10:00:00+06:00",
    duration: "PT14M32S",
    contentUrl: "https://abdullahbdseo.vercel.app/videos/ai-overviews-explained.mp4",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  });

  // 14. JOB POSTING STATE
  const [jobData, setJobData] = useState({
    title: "Senior Technical SEO & GEO Strategist",
    description: "We are seeking an expert technical SEO practitioner to lead client entity graphs, Core Web Vitals optimization, and AI search citation campaigns.",
    datePosted: "2026-10-01",
    validThrough: "2026-12-31",
    employmentType: "FULL_TIME",
    hiringOrganization: "AbdullahBD SEO Agency",
    hiringOrgUrl: "https://abdullahbdseo.vercel.app",
    jobLocationType: "TELECOMMUTE",
    streetAddress: "Road 11, Banani",
    addressLocality: "Dhaka",
    addressRegion: "Dhaka",
    postalCode: "1213",
    addressCountry: "BD",
    baseSalaryMin: "35000",
    baseSalaryMax: "60000",
    salaryCurrency: "USD",
    unitText: "YEAR"
  });

  // 15. COURSE STATE
  const [courseData, setCourseData] = useState({
    name: "Advanced Generative Engine Optimization (GEO) & Entity Masterclass",
    description: "Hands-on professional certification training covering schema knowledge graphs, OAI-SearchBot crawling, and LLM RAG pipelines.",
    providerName: "AbdullahBD SEO Academy",
    providerUrl: "https://abdullahbdseo.vercel.app",
    courseCode: "GEO-2026-PRO",
    price: "199.00",
    priceCurrency: "USD",
    courseMode: "online",
    educationalCredentialAwarded: "Certified GEO Specialist (C-GEO)"
  });

  // 16. SOFTWARE APPLICATION STATE
  const [softwareData, setSoftwareData] = useState({
    name: "Deep SEO Audit & Crawler Analyzer",
    operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
    applicationCategory: "SEOApplication",
    description: "Automated live deep technical SEO auditing tool inspecting TTFB latency, Robots.txt directives, image ALT coverage, and Core Web Vitals.",
    url: "https://abdullahbdseo.vercel.app/tools/deep-seo-audit",
    price: "0.00",
    priceCurrency: "USD",
    ratingValue: "4.9",
    reviewCount: "86"
  });

  // 17. RECIPE STATE
  const [recipeData, setRecipeData] = useState({
    name: "Authentic Kacchi Biryani Master Recipe",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    description: "Traditional slow-cooked marinated mutton layered with aromatic basmati rice, saffron milk, and fried potatoes in a sealed handi.",
    author: "Chef Abdullah",
    prepTime: "PT45M",
    cookTime: "PT2H",
    totalTime: "PT2H45M",
    recipeYield: "6 servings",
    calories: "680 calories",
    ingredients: [
      "1 kg prime mutton pieces",
      "750 g aged Basmati rice",
      "1 cup plain yogurt",
      "1/2 cup fried onions (beresta)",
      "1 tsp saffron soaked in warm milk",
      "Special Shahi garam masala blend"
    ],
    instructions: [
      "Marinate mutton with yogurt, papaya paste, and Shahi spices for 4 hours.",
      "Parboil aged Basmati rice with whole spices until 70% cooked.",
      "Layer the marinated meat at the base of heavy-bottom pot, add potatoes and parboiled rice.",
      "Drizzle saffron milk, ghee, and seal the lid tightly with dough.",
      "Cook on high heat for 15 minutes, then dum on low heat for 1.5 hours."
    ]
  });

  // Helper functions for dynamic lists
  const addFaq = () => setFaqList([...faqList, { question: "", answer: "" }]);
  const updateFaq = (index, field, value) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
  };
  const removeFaq = (index) => setFaqList(faqList.filter((_, i) => i !== index));

  const addBreadcrumb = () => {
    setBreadcrumbs([...breadcrumbs, { position: breadcrumbs.length + 1, name: "", url: "https://" }]);
  };
  const updateBreadcrumb = (index, field, value) => {
    const updated = [...breadcrumbs];
    updated[index][field] = value;
    setBreadcrumbs(updated);
  };
  const removeBreadcrumb = (index) => {
    setBreadcrumbs(breadcrumbs.filter((_, i) => i !== index).map((b, idx) => ({ ...b, position: idx + 1 })));
  };

  const addHowToStep = () => {
    setHowToData({ ...howToData, steps: [...howToData.steps, { name: "", text: "", url: "" }] });
  };
  const updateHowToStep = (index, field, val) => {
    const updated = [...howToData.steps];
    updated[index][field] = val;
    setHowToData({ ...howToData, steps: updated });
  };
  const removeHowToStep = (index) => {
    setHowToData({ ...howToData, steps: howToData.steps.filter((_, i) => i !== index) });
  };

  const addIngredient = () => setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, ""] });
  const updateIngredient = (index, val) => {
    const updated = [...recipeData.ingredients];
    updated[index] = val;
    setRecipeData({ ...recipeData, ingredients: updated });
  };
  const removeIngredient = (index) => {
    setRecipeData({ ...recipeData, ingredients: recipeData.ingredients.filter((_, i) => i !== index) });
  };

  // Helper to clean empty keys
  function cleanObject(obj) {
    if (Array.isArray(obj)) {
      const cleaned = obj.map(cleanObject).filter(v => v !== undefined && v !== null && v !== "");
      return cleaned.length ? cleaned : undefined;
    }
    if (obj && typeof obj === "object") {
      const result = {};
      for (const [key, val] of Object.entries(obj)) {
        if (val !== undefined && val !== null && val !== "") {
          const cleanedVal = cleanObject(val);
          if (cleanedVal !== undefined) {
            result[key] = cleanedVal;
          }
        }
      }
      return Object.keys(result).length ? result : undefined;
    }
    return obj;
  }

  // GENERATE COMPLETE JSON-LD SCHEMA
  const generatedSchema = useMemo(() => {
    switch (schemaType) {
      case "MasterGraph": {
        const domain = masterGraphData.siteUrl.replace(/\/+$/, "");
        return cleanObject({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${domain}/#organization`,
              "name": masterGraphData.orgName,
              "url": domain,
              "logo": {
                "@type": "ImageObject",
                "@id": `${domain}/#logo`,
                "url": masterGraphData.orgLogo,
                "caption": masterGraphData.orgName
              },
              "image": { "@id": `${domain}/#logo` }
            },
            {
              "@type": "WebSite",
              "@id": `${domain}/#website`,
              "url": domain,
              "name": masterGraphData.siteName,
              "publisher": { "@id": `${domain}/#organization` },
              "potentialAction": [
                {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": masterGraphData.searchUrlTemplate
                  },
                  "query-input": "required name=search_term_string"
                }
              ]
            },
            {
              "@type": "Person",
              "@id": `${domain}/#/schema/person/author`,
              "name": masterGraphData.authorName,
              "jobTitle": masterGraphData.authorJobTitle,
              "url": masterGraphData.authorBioUrl,
              "worksFor": { "@id": `${domain}/#organization` }
            },
            {
              "@type": "WebPage",
              "@id": `${masterGraphData.pageUrl}/#webpage`,
              "url": masterGraphData.pageUrl,
              "name": masterGraphData.pageTitle,
              "description": masterGraphData.pageDescription,
              "isPartOf": { "@id": `${domain}/#website` },
              "about": { "@id": `${domain}/#organization` },
              "primaryImageOfPage": {
                "@type": "ImageObject",
                "@id": `${masterGraphData.pageUrl}/#primaryimage`,
                "url": masterGraphData.primaryImage
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "@id": `${masterGraphData.pageUrl}/#breadcrumb`,
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
                  { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${domain}/blog` },
                  { "@type": "ListItem", "position": 3, "name": masterGraphData.pageTitle, "item": masterGraphData.pageUrl }
                ]
              }
            },
            {
              "@type": "BlogPosting",
              "@id": `${masterGraphData.pageUrl}/#article`,
              "isPartOf": { "@id": `${masterGraphData.pageUrl}/#webpage` },
              "headline": masterGraphData.pageTitle,
              "description": masterGraphData.pageDescription,
              "datePublished": masterGraphData.datePublished,
              "dateModified": masterGraphData.dateModified,
              "mainEntityOfPage": `${masterGraphData.pageUrl}/#webpage`,
              "author": { "@id": `${domain}/#/schema/person/author` },
              "publisher": { "@id": `${domain}/#organization` },
              "image": { "@id": `${masterGraphData.pageUrl}/#primaryimage` }
            }
          ]
        });
      }

      case "Organization": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": orgData.subType || "Organization",
          "name": orgData.name,
          "legalName": orgData.legalName || undefined,
          "alternateName": orgData.alternateName || undefined,
          "url": orgData.url,
          "logo": orgData.logo,
          "description": orgData.description || undefined,
          "foundingDate": orgData.foundingDate || undefined,
          "vatID": orgData.vatID || undefined,
          "duns": orgData.duns || undefined,
          "founder": orgData.founderName ? {
            "@type": "Person",
            "name": orgData.founderName
          } : undefined,
          "contactPoint": (orgData.phone || orgData.email) ? {
            "@type": "ContactPoint",
            "telephone": orgData.phone || undefined,
            "contactType": orgData.contactType || "customer support",
            "email": orgData.email || undefined,
            "availableLanguage": ["English", "Bengali"]
          } : undefined,
          "address": (orgData.street || orgData.city || orgData.country) ? {
            "@type": "PostalAddress",
            "streetAddress": orgData.street || undefined,
            "addressLocality": orgData.city || undefined,
            "addressRegion": orgData.region || undefined,
            "postalCode": orgData.postalCode || undefined,
            "addressCountry": orgData.country || undefined
          } : undefined,
          "sameAs": orgData.sameAs.filter(url => url && url.trim() !== "")
        });
      }

      case "Person": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": personData.name,
          "jobTitle": personData.jobTitle || undefined,
          "worksFor": personData.worksFor ? {
            "@type": "Organization",
            "name": personData.worksFor
          } : undefined,
          "url": personData.url || undefined,
          "image": personData.image || undefined,
          "description": personData.description || undefined,
          "email": personData.email ? `mailto:${personData.email}` : undefined,
          "telephone": personData.telephone || undefined,
          "alumniOf": personData.alumniOf ? {
            "@type": "EducationalOrganization",
            "name": personData.alumniOf
          } : undefined,
          "knowsAbout": personData.knowsAbout ? personData.knowsAbout.split(",").map(k => k.trim()) : undefined,
          "sameAs": personData.sameAs.filter(url => url && url.trim() !== "")
        });
      }

      case "WebSite": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": webSiteData.name,
          "alternateName": webSiteData.alternateName || undefined,
          "url": webSiteData.url,
          "description": webSiteData.description || undefined,
          "inLanguage": webSiteData.inLanguage || "en-US",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": webSiteData.searchTarget
            },
            "query-input": webSiteData.queryInput || "required name=search_term_string"
          }
        });
      }

      case "LocalBusiness": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": localBiz.subType || "LocalBusiness",
          "name": localBiz.name,
          "image": localBiz.image ? [localBiz.image] : undefined,
          "url": localBiz.url,
          "telephone": localBiz.phone,
          "email": localBiz.email || undefined,
          "priceRange": localBiz.priceRange || "$$",
          "currenciesAccepted": localBiz.currenciesAccepted || undefined,
          "paymentAccepted": localBiz.paymentAccepted || undefined,
          "areaServed": localBiz.areaServed ? localBiz.areaServed.split(",").map(s => s.trim()) : undefined,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": localBiz.street || undefined,
            "addressLocality": localBiz.city || undefined,
            "addressRegion": localBiz.region || undefined,
            "postalCode": localBiz.postalCode || undefined,
            "addressCountry": localBiz.country || undefined
          },
          "geo": (localBiz.latitude && localBiz.longitude) ? {
            "@type": "GeoCoordinates",
            "latitude": parseFloat(localBiz.latitude) || localBiz.latitude,
            "longitude": parseFloat(localBiz.longitude) || localBiz.longitude
          } : undefined,
          "hasMap": localBiz.hasMap || undefined,
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": localBiz.opensTime || "09:00",
              "closes": localBiz.closesTime || "18:00"
            }
          ],
          "aggregateRating": localBiz.ratingValue && localBiz.reviewCount ? {
            "@type": "AggregateRating",
            "ratingValue": localBiz.ratingValue,
            "reviewCount": localBiz.reviewCount,
            "bestRating": "5",
            "worstRating": "1"
          } : undefined
        });
      }

      case "Product": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "image": productData.image ? [productData.image] : undefined,
          "description": productData.description,
          "brand": productData.brand ? {
            "@type": "Brand",
            "name": productData.brand
          } : undefined,
          "sku": productData.sku || undefined,
          "mpn": productData.mpn || undefined,
          "gtin13": productData.gtin13 || undefined,
          "offers": {
            "@type": "Offer",
            "url": "https://abdullahbdseo.vercel.app",
            "priceCurrency": productData.priceCurrency || "USD",
            "price": productData.price,
            "priceValidUntil": productData.priceValidUntil || undefined,
            "itemCondition": `https://schema.org/${productData.itemCondition || "NewCondition"}`,
            "availability": `https://schema.org/${productData.availability || "InStock"}`,
            "seller": productData.sellerName ? {
              "@type": "Organization",
              "name": productData.sellerName
            } : undefined
          },
          "aggregateRating": productData.ratingValue && productData.reviewCount ? {
            "@type": "AggregateRating",
            "ratingValue": productData.ratingValue,
            "reviewCount": productData.reviewCount,
            "bestRating": "5",
            "worstRating": "1"
          } : undefined
        });
      }

      case "Article": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": articleData.subType || "BlogPosting",
          "headline": articleData.headline,
          "description": articleData.description,
          "image": articleData.image ? [articleData.image] : undefined,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleData.url
          },
          "articleSection": articleData.articleSection || undefined,
          "keywords": articleData.keywords || undefined,
          "wordCount": parseInt(articleData.wordCount) || undefined,
          "author": {
            "@type": "Person",
            "name": articleData.authorName,
            "url": articleData.authorUrl || undefined,
            "jobTitle": articleData.authorJobTitle || undefined
          },
          "publisher": {
            "@type": "Organization",
            "name": articleData.publisherName,
            "logo": articleData.publisherLogo ? {
              "@type": "ImageObject",
              "url": articleData.publisherLogo
            } : undefined
          },
          "datePublished": articleData.datePublished,
          "dateModified": articleData.dateModified || articleData.datePublished
        });
      }

      case "FAQPage": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqList.filter(f => f.question && f.question.trim() !== "").map((item) => ({
            "@type": "Question",
            "name": item.question.trim(),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer.trim()
            }
          }))
        });
      }

      case "BreadcrumbList": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.filter(b => b.name && b.name.trim() !== "").map((item, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": item.name.trim(),
            "item": item.url ? item.url.trim() : undefined
          }))
        });
      }

      case "HowTo": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": howToData.name,
          "description": howToData.description,
          "image": howToData.image ? [howToData.image] : undefined,
          "totalTime": howToData.totalTime || undefined,
          "estimatedCost": howToData.estimatedCost ? {
            "@type": "MonetaryAmount",
            "currency": howToData.currency || "USD",
            "value": howToData.estimatedCost
          } : undefined,
          "step": howToData.steps.filter(s => s.name.trim()).map((step, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": step.name,
            "text": step.text,
            "url": step.url || undefined
          }))
        });
      }

      case "Service": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": serviceData.name,
          "serviceType": serviceData.serviceType || undefined,
          "description": serviceData.description,
          "provider": {
            "@type": "Organization",
            "name": serviceData.providerName,
            "url": serviceData.providerUrl || undefined
          },
          "areaServed": serviceData.areaServed ? {
            "@type": "Country",
            "name": serviceData.areaServed
          } : undefined,
          "url": serviceData.serviceUrl || undefined,
          "offers": serviceData.price ? {
            "@type": "Offer",
            "price": serviceData.price,
            "priceCurrency": serviceData.priceCurrency || "USD"
          } : undefined
        });
      }

      case "Event": {
        const isOnline = eventData.eventAttendanceMode === "OnlineEventAttendanceMode";
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": eventData.name,
          "description": eventData.description,
          "image": eventData.image ? [eventData.image] : undefined,
          "startDate": eventData.startDate,
          "endDate": eventData.endDate || undefined,
          "eventAttendanceMode": `https://schema.org/${eventData.eventAttendanceMode}`,
          "eventStatus": `https://schema.org/${eventData.eventStatus}`,
          "location": isOnline ? {
            "@type": "VirtualLocation",
            "url": eventData.virtualUrl
          } : {
            "@type": "Place",
            "name": eventData.locationName,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": eventData.locationAddress
            }
          },
          "organizer": {
            "@type": "Person",
            "name": eventData.organizerName,
            "url": eventData.organizerUrl || undefined
          },
          "offers": eventData.ticketPrice ? {
            "@type": "Offer",
            "price": eventData.ticketPrice,
            "priceCurrency": eventData.ticketCurrency || "USD",
            "availability": `https://schema.org/${eventData.ticketAvailability || "InStock"}`,
            "url": eventData.virtualUrl || undefined
          } : undefined
        });
      }

      case "VideoObject": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": videoData.name,
          "description": videoData.description,
          "thumbnailUrl": [videoData.thumbnailUrl],
          "uploadDate": videoData.uploadDate,
          "duration": videoData.duration || undefined,
          "contentUrl": videoData.contentUrl || undefined,
          "embedUrl": videoData.embedUrl || undefined
        });
      }

      case "JobPosting": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": jobData.title,
          "description": jobData.description,
          "datePosted": jobData.datePosted,
          "validThrough": jobData.validThrough || undefined,
          "employmentType": jobData.employmentType,
          "hiringOrganization": {
            "@type": "Organization",
            "name": jobData.hiringOrganization,
            "sameAs": jobData.hiringOrgUrl
          },
          "jobLocationType": jobData.jobLocationType,
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": jobData.streetAddress,
              "addressLocality": jobData.addressLocality,
              "addressRegion": jobData.addressRegion,
              "postalCode": jobData.postalCode,
              "addressCountry": jobData.addressCountry
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": jobData.salaryCurrency,
            "value": {
              "@type": "QuantitativeValue",
              "minValue": parseFloat(jobData.baseSalaryMin),
              "maxValue": parseFloat(jobData.baseSalaryMax),
              "unitText": jobData.unitText
            }
          }
        });
      }

      case "Course": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": courseData.name,
          "description": courseData.description,
          "provider": {
            "@type": "Organization",
            "name": courseData.providerName,
            "sameAs": courseData.providerUrl
          },
          "courseCode": courseData.courseCode,
          "educationalCredentialAwarded": courseData.educationalCredentialAwarded,
          "offers": {
            "@type": "Offer",
            "category": "Paid",
            "price": courseData.price,
            "priceCurrency": courseData.priceCurrency
          }
        });
      }

      case "SoftwareApplication": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": softwareData.name,
          "operatingSystem": softwareData.operatingSystem,
          "applicationCategory": softwareData.applicationCategory,
          "description": softwareData.description,
          "url": softwareData.url,
          "offers": {
            "@type": "Offer",
            "price": softwareData.price || "0.00",
            "priceCurrency": softwareData.priceCurrency || "USD"
          },
          "aggregateRating": softwareData.ratingValue && softwareData.reviewCount ? {
            "@type": "AggregateRating",
            "ratingValue": softwareData.ratingValue,
            "reviewCount": softwareData.reviewCount,
            "bestRating": "5"
          } : undefined
        });
      }

      case "Recipe": {
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Recipe",
          "name": recipeData.name,
          "image": [recipeData.image],
          "author": {
            "@type": "Person",
            "name": recipeData.author
          },
          "description": recipeData.description,
          "prepTime": recipeData.prepTime,
          "cookTime": recipeData.cookTime,
          "totalTime": recipeData.totalTime,
          "recipeYield": recipeData.recipeYield,
          "nutrition": recipeData.calories ? {
            "@type": "NutritionInformation",
            "calories": recipeData.calories
          } : undefined,
          "recipeIngredient": recipeData.ingredients.filter(i => i.trim() !== ""),
          "recipeInstructions": recipeData.instructions.filter(i => i.trim() !== "").map(step => ({
            "@type": "HowToStep",
            "text": step
          }))
        });
      }

      default:
        return {};
    }
  }, [
    schemaType, masterGraphData, orgData, personData, webSiteData, localBiz,
    productData, articleData, faqList, breadcrumbs, howToData, serviceData,
    eventData, videoData, jobData, courseData, softwareData, recipeData
  ]);

  const jsonString = isMinified
    ? JSON.stringify(generatedSchema)
    : JSON.stringify(generatedSchema, null, 2);

  const scriptTagOutput = isMinified
    ? `<script type="application/ld+json">${jsonString}</script>`
    : `<script type="application/ld+json">\n${jsonString}\n</script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(scriptTagOutput);
    setCopiedScript(true);
    showToast("HTML <script> snippet copied to clipboard!");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyRawJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedRaw(true);
    showToast("Raw JSON object copied to clipboard!");
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([scriptTagOutput], { type: "text/html" });
    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${schemaType.toLowerCase()}-schema.html`;
    a.click();
    URL.revokeObjectURL(fileUrl);
    showToast(`Downloaded ${schemaType.toLowerCase()}-schema.html`);
  };

  // Diagnostic Checklist
  const healthCheck = useMemo(() => {
    const checks = [];
    if (schemaType === "MasterGraph") {
      checks.push({ name: "WebSite Root Context", valid: Boolean(masterGraphData.siteUrl), req: true });
      checks.push({ name: "Organization Publisher Node", valid: Boolean(masterGraphData.orgName), req: true });
      checks.push({ name: "Author Entity Connection", valid: Boolean(masterGraphData.authorName), req: true });
      checks.push({ name: "SearchAction Sitelinks Template", valid: masterGraphData.searchUrlTemplate.includes("{search_term_string}"), req: true });
      checks.push({ name: "Primary Image & WebPage IDs", valid: Boolean(masterGraphData.pageUrl && masterGraphData.primaryImage), req: false });
    } else if (schemaType === "Organization") {
      checks.push({ name: "Organization Name", valid: Boolean(orgData.name), req: true });
      checks.push({ name: "Website URL", valid: Boolean(orgData.url && orgData.url.startsWith("http")), req: true });
      checks.push({ name: "Logo Image URL", valid: Boolean(orgData.logo), req: true });
      checks.push({ name: "Wikidata & Social sameAs Links", valid: orgData.sameAs.some(s => s.length > 5), req: false });
      checks.push({ name: "ContactPoint (Phone/Email)", valid: Boolean(orgData.phone || orgData.email), req: false });
    } else if (schemaType === "LocalBusiness") {
      checks.push({ name: "Business Name", valid: Boolean(localBiz.name), req: true });
      checks.push({ name: "Telephone", valid: Boolean(localBiz.phone), req: true });
      checks.push({ name: "Street & City Address", valid: Boolean(localBiz.street && localBiz.city), req: true });
      checks.push({ name: "Geo Coordinates (Lat/Long)", valid: Boolean(localBiz.latitude && localBiz.longitude), req: false });
      checks.push({ name: "Aggregate Review Stars", valid: Boolean(localBiz.ratingValue && localBiz.reviewCount), req: false });
    } else if (schemaType === "Product") {
      checks.push({ name: "Product Name", valid: Boolean(productData.name), req: true });
      checks.push({ name: "Product Image", valid: Boolean(productData.image), req: true });
      checks.push({ name: "Offer Price & Currency", valid: Boolean(productData.price && productData.priceCurrency), req: true });
      checks.push({ name: "Availability (InStock)", valid: Boolean(productData.availability), req: true });
      checks.push({ name: "GTIN / Barcode Identifier", valid: Boolean(productData.gtin13 || productData.sku), req: false });
      checks.push({ name: "Aggregate Rating (Stars)", valid: Boolean(productData.ratingValue && productData.reviewCount), req: false });
    } else if (schemaType === "Article") {
      checks.push({ name: "Headline", valid: Boolean(articleData.headline), req: true });
      checks.push({ name: "Image URL", valid: Boolean(articleData.image), req: true });
      checks.push({ name: "Author Name", valid: Boolean(articleData.authorName), req: true });
      checks.push({ name: "Publisher Name & Logo", valid: Boolean(articleData.publisherName && articleData.publisherLogo), req: true });
      checks.push({ name: "Date Published", valid: Boolean(articleData.datePublished), req: true });
    } else if (schemaType === "FAQPage") {
      const validFaqs = faqList.filter(f => f.question.trim() && f.answer.trim());
      checks.push({ name: "At least 1 Q&A pair", valid: validFaqs.length >= 1, req: true });
      checks.push({ name: "Recommended 3+ FAQ items", valid: validFaqs.length >= 3, req: false });
    } else {
      checks.push({ name: "Schema.org Standard @context", valid: true, req: true });
      checks.push({ name: "Compliant @type mapping", valid: true, req: true });
    }

    const passedReq = checks.filter(c => c.req && c.valid).length;
    const totalReq = checks.filter(c => c.req).length;
    return { checks, isCompliant: passedReq === totalReq, passedReq, totalReq };
  }, [schemaType, masterGraphData, orgData, localBiz, productData, articleData, faqList]);

  return (
    <div className="tool-single-page" style={{ background: "#f8fafc" }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#0f172a", color: "#ffffff", padding: "12px 20px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", zIndex: 9999, display: "flex", alignItems: "center", gap: "10px", border: "1px solid #334155" }}>
          <i className="fa-solid fa-circle-check text-success"></i> {toastMessage}
        </div>
      )}

      {/* HEADER HERO */}
      <section className="page-header-section" style={{ paddingBottom: "24px", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2" style={{ borderRadius: "4px" }}>
            <i className="fa-solid fa-code"></i> Enterprise Structured Data Studio (2026 Edition)
          </div>
          <h1 className="page-title">JSON-LD Schema Markup Generator &amp; Entity Studio</h1>
          <p className="page-subtitle max-w-3xl mx-auto">
            Design, interconnect, and validate 100% Google Rich Results compliant JSON-LD structured data. Connect your brand entity graph for Google Search, ChatGPT Search, Gemini, and Perplexity AI.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginTop: "18px" }}>
            <span style={{ fontSize: "0.82rem", background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid #bfdbfe" }}>
              <i className="fa-solid fa-diagram-project"></i> Connected @graph Hub
            </span>
            <span style={{ fontSize: "0.82rem", background: "#f0fdf4", color: "#166534", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid #bbf7d0" }}>
              <i className="fa-solid fa-shield-check"></i> Google Rich Results Validated
            </span>
            <span style={{ fontSize: "0.82rem", background: "#fef3c7", color: "#92400e", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid #fde68a" }}>
              <i className="fa-solid fa-brain"></i> LLM &amp; GEO Disambiguation
            </span>
            <span style={{ fontSize: "0.82rem", background: "#faf5ff", color: "#7e22ce", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid #e9d5ff" }}>
              <i className="fa-solid fa-microchip"></i> 17 Rich Schema Models
            </span>
          </div>
        </div>
      </section>

      {/* MAIN STUDIO WORKSPACE */}
      <section className="section-padding" style={{ paddingTop: "24px" }}>
        <div className="container" style={{ maxWidth: "1400px" }}>

          {/* TOP STUDIO TOOLBAR */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px 18px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>
                <i className="fa-solid fa-sliders text-primary"></i> Active Model:
              </span>
              <span style={{ fontSize: "0.82rem", background: "#2563eb", color: "#ffffff", padding: "4px 10px", borderRadius: "4px", fontWeight: 700 }}>
                {schemaType}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: healthCheck.isCompliant ? "#ecfdf5" : "#fffbeb", border: healthCheck.isCompliant ? "1px solid #a7f3d0" : "1px solid #fde68a", padding: "4px 10px", borderRadius: "4px" }}>
                <i className={`fa-solid ${healthCheck.isCompliant ? "fa-circle-check text-success" : "fa-triangle-exclamation text-warning"}`} style={{ fontSize: "0.8rem" }}></i>
                <span style={{ fontSize: "0.76rem", fontWeight: 800, color: healthCheck.isCompliant ? "#065f46" : "#92400e" }}>
                  {healthCheck.isCompliant ? "100% Compliant" : `${healthCheck.passedReq}/${healthCheck.totalReq} Required`}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={copyRawJson}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: "4px", fontSize: "0.78rem" }}
              >
                <i className="fa-solid fa-brackets-curly"></i> Copy JSON
              </button>
              <button
                type="button"
                onClick={downloadJson}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: "4px", fontSize: "0.78rem" }}
              >
                <i className="fa-solid fa-download"></i> Download .html
              </button>
              <button
                type="button"
                onClick={copyScript}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: "4px", fontSize: "0.78rem" }}
              >
                {copiedScript ? <><i className="fa-solid fa-check"></i> Copied!</> : <><i className="fa-solid fa-copy"></i> Copy &lt;script&gt;</>}
              </button>
            </div>
          </div>

          {/* THREE-PANEL STUDIO GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "280px 1.15fr 1fr", gap: "20px", alignItems: "start" }}>

            {/* PANEL 1: LEFT SIDEBAR SCHEMA NAVIGATOR */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
              <div style={{ marginBottom: "12px", position: "relative" }}>
                <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.75rem" }}></i>
                <input
                  type="text"
                  placeholder="Filter schemas..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{ width: "100%", padding: "6px 8px 6px 28px", fontSize: "0.78rem", border: "1px solid #cbd5e1", borderRadius: "4px", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "780px", overflowY: "auto" }}>
                {SCHEMA_CATEGORIES.map((cat, catIdx) => {
                  const filtered = cat.schemas.filter(s =>
                    s.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    s.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    s.badge.toLowerCase().includes(searchFilter.toLowerCase())
                  );
                  if (filtered.length === 0) return null;

                  return (
                    <div key={catIdx}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: "#94a3b8", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                        {cat.category}
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {filtered.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSchemaType(item.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "8px 10px",
                              borderRadius: "4px",
                              border: schemaType === item.id ? "1px solid #2563eb" : "1px solid transparent",
                              background: schemaType === item.id ? "#eff6ff" : "transparent",
                              color: schemaType === item.id ? "#2563eb" : "#334155",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "all 0.15s ease"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <i className={`fa-solid ${item.icon}`} style={{ fontSize: "0.85rem", width: "16px", color: schemaType === item.id ? "#2563eb" : "#64748b" }}></i>
                              <div>
                                <strong style={{ fontSize: "0.8rem", display: "block", lineHeight: 1.2 }}>{item.label}</strong>
                                <span style={{ fontSize: "0.68rem", color: "#94a3b8", display: "block" }}>{item.desc}</span>
                              </div>
                            </div>
                            <span style={{ fontSize: "0.62rem", background: schemaType === item.id ? "#dbeafe" : "#f1f5f9", color: schemaType === item.id ? "#1e40af" : "#64748b", padding: "2px 5px", borderRadius: "4px", fontWeight: 700 }}>
                              {item.badge}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PANEL 2: MIDDLE PROPERTY CONFIGURATION FORM */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "22px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    {schemaType === "MasterGraph" ? "Master @graph Hub Settings" : `Configure ${schemaType} Schema`}
                  </h2>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Standard Schema.org structured properties &amp; entity links
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Sample defaults reloaded!")}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: "4px", fontSize: "0.72rem", padding: "4px 8px" }}
                >
                  <i className="fa-solid fa-arrows-rotate"></i> Reset Defaults
                </button>
              </div>

              {/* 1. MASTER GRAPH FORM */}
              {schemaType === "MasterGraph" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "12px", borderRadius: "4px" }}>
                    <strong style={{ fontSize: "0.8rem", color: "#1e40af", display: "block", marginBottom: "2px" }}>
                      💡 Enterprise Knowledge Graph Linking
                    </strong>
                    <p style={{ fontSize: "0.75rem", color: "#1e3a8a", margin: 0 }}>
                      Connects <code>WebSite</code> ➔ <code>Organization</code> ➔ <code>Author (Person)</code> ➔ <code>WebPage</code> ➔ <code>BlogPosting</code> into a single nested <code>@graph</code> array for maximum AI and Google understanding.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Root Website Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={masterGraphData.siteName}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, siteName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Website Canonical URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={masterGraphData.siteUrl}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, siteUrl: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>SearchAction Sitelinks Search Query Template</label>
                    <input
                      type="text"
                      className="form-input"
                      value={masterGraphData.searchUrlTemplate}
                      onChange={(e) => setMasterGraphData({ ...masterGraphData, searchUrlTemplate: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Organization Brand Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={masterGraphData.orgName}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, orgName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Brand Logo URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={masterGraphData.orgLogo}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, orgLogo: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Author Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={masterGraphData.authorName}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, authorName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Author Bio Page URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={masterGraphData.authorBioUrl}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, authorBioUrl: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Current Page Headline / Article Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={masterGraphData.pageTitle}
                      onChange={(e) => setMasterGraphData({ ...masterGraphData, pageTitle: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Current Page URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={masterGraphData.pageUrl}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, pageUrl: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Primary Image URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={masterGraphData.primaryImage}
                        onChange={(e) => setMasterGraphData({ ...masterGraphData, primaryImage: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ORGANIZATION FORM */}
              {schemaType === "Organization" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Subtype</label>
                      <select
                        className="form-input"
                        value={orgData.subType}
                        onChange={(e) => setOrgData({ ...orgData, subType: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="Organization">Organization (Generic)</option>
                        <option value="Corporation">Corporation</option>
                        <option value="OnlineBusiness">OnlineBusiness</option>
                        <option value="EducationalOrganization">EducationalOrganization</option>
                        <option value="MedicalOrganization">MedicalOrganization</option>
                        <option value="NGO">NGO</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Brand Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={orgData.name}
                        onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Website URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={orgData.url}
                        onChange={(e) => setOrgData({ ...orgData, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Logo URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={orgData.logo}
                        onChange={(e) => setOrgData({ ...orgData, logo: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Description</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={orgData.description}
                      onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Founder Name"
                      className="form-input"
                      value={orgData.founderName}
                      onChange={(e) => setOrgData({ ...orgData, founderName: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="form-input"
                      value={orgData.phone}
                      onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-input"
                      value={orgData.email}
                      onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Wikidata &amp; Social sameAs Profiles</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      value={orgData.sameAs.join("\n")}
                      onChange={(e) => setOrgData({ ...orgData, sameAs: e.target.value.split("\n") })}
                      style={{ borderRadius: "4px", fontSize: "0.78rem", fontFamily: "monospace" }}
                    />
                  </div>
                </div>
              )}

              {/* 3. PERSON FORM */}
              {schemaType === "Person" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.name}
                        onChange={(e) => setPersonData({ ...personData, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Job Title / Role</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.jobTitle}
                        onChange={(e) => setPersonData({ ...personData, jobTitle: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Bio / Portfolio URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={personData.url}
                        onChange={(e) => setPersonData({ ...personData, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Photo URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={personData.image}
                        onChange={(e) => setPersonData({ ...personData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Expertise Domains (knowsAbout)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personData.knowsAbout}
                      onChange={(e) => setPersonData({ ...personData, knowsAbout: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Social Authority Profiles (sameAs)</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={personData.sameAs.join("\n")}
                      onChange={(e) => setPersonData({ ...personData, sameAs: e.target.value.split("\n") })}
                      style={{ borderRadius: "4px", fontSize: "0.78rem", fontFamily: "monospace" }}
                    />
                  </div>
                </div>
              )}

              {/* 4. WEBSITE FORM */}
              {schemaType === "WebSite" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>WebSite Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={webSiteData.name}
                        onChange={(e) => setWebSiteData({ ...webSiteData, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Alternate Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={webSiteData.alternateName}
                        onChange={(e) => setWebSiteData({ ...webSiteData, alternateName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Canonical URL *</label>
                    <input
                      type="url"
                      className="form-input"
                      value={webSiteData.url}
                      onChange={(e) => setWebSiteData({ ...webSiteData, url: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Sitelinks Search Query Target Template</label>
                    <input
                      type="text"
                      className="form-input"
                      value={webSiteData.searchTarget}
                      onChange={(e) => setWebSiteData({ ...webSiteData, searchTarget: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                </div>
              )}

              {/* 5. LOCAL BUSINESS FORM */}
              {schemaType === "LocalBusiness" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Subtype *</label>
                      <select
                        className="form-input"
                        value={localBiz.subType}
                        onChange={(e) => setLocalBiz({ ...localBiz, subType: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="ProfessionalService">ProfessionalService</option>
                        <option value="MedicalClinic">MedicalClinic</option>
                        <option value="LegalService">LegalService</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Store">Retail Store</option>
                        <option value="RealEstateAgent">RealEstateAgent</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Business Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.name}
                        onChange={(e) => setLocalBiz({ ...localBiz, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Website URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={localBiz.url}
                        onChange={(e) => setLocalBiz({ ...localBiz, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Phone *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.phone}
                        onChange={(e) => setLocalBiz({ ...localBiz, phone: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "6px" }}>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="form-input"
                      value={localBiz.street}
                      onChange={(e) => setLocalBiz({ ...localBiz, street: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="form-input"
                      value={localBiz.city}
                      onChange={(e) => setLocalBiz({ ...localBiz, city: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="form-input"
                      value={localBiz.postalCode}
                      onChange={(e) => setLocalBiz({ ...localBiz, postalCode: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Country (BD)"
                      className="form-input"
                      value={localBiz.country}
                      onChange={(e) => setLocalBiz({ ...localBiz, country: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Latitude (23.7937)"
                      className="form-input"
                      value={localBiz.latitude}
                      onChange={(e) => setLocalBiz({ ...localBiz, latitude: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Longitude (90.4043)"
                      className="form-input"
                      value={localBiz.longitude}
                      onChange={(e) => setLocalBiz({ ...localBiz, longitude: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                  </div>
                </div>
              )}

              {/* 6. PRODUCT FORM */}
              {schemaType === "Product" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Product Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={productData.name}
                      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Image URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={productData.image}
                        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Brand</label>
                      <input
                        type="text"
                        className="form-input"
                        value={productData.brand}
                        onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Price (499.00)"
                      className="form-input"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <select
                      className="form-input"
                      value={productData.priceCurrency}
                      onChange={(e) => setProductData({ ...productData, priceCurrency: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="BDT">BDT (৳)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                    <input
                      type="text"
                      placeholder="SKU"
                      className="form-input"
                      value={productData.sku}
                      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                    <input
                      type="text"
                      placeholder="GTIN-13 Barcode"
                      className="form-input"
                      value={productData.gtin13}
                      onChange={(e) => setProductData({ ...productData, gtin13: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                    />
                  </div>
                </div>
              )}

              {/* 7. ARTICLE FORM */}
              {schemaType === "Article" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Headline *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={articleData.headline}
                      onChange={(e) => setArticleData({ ...articleData, headline: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Canonical URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={articleData.url}
                        onChange={(e) => setArticleData({ ...articleData, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Featured Image URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={articleData.image}
                        onChange={(e) => setArticleData({ ...articleData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Author Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={articleData.authorName}
                        onChange={(e) => setArticleData({ ...articleData, authorName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Date Published *</label>
                      <input
                        type="date"
                        className="form-input"
                        value={articleData.datePublished}
                        onChange={(e) => setArticleData({ ...articleData, datePublished: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 8. FAQPAGE FORM */}
              {schemaType === "FAQPage" && (
                <div>
                  {faqList.map((faq, idx) => (
                    <div key={idx} style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <strong style={{ fontSize: "0.8rem", color: "#0f172a" }}>Q#{idx + 1}</strong>
                        {faqList.length > 1 && (
                          <button type="button" onClick={() => removeFaq(idx)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.75rem", cursor: "pointer" }}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Question"
                        className="form-input mb-2"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer text"
                        className="form-textarea"
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addFaq} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px" }}>
                    <i className="fa-solid fa-plus"></i> Add Question
                  </button>
                </div>
              )}

              {/* 9. BREADCRUMB FORM */}
              {schemaType === "BreadcrumbList" && (
                <div>
                  {breadcrumbs.map((crumb, idx) => (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "50px 1.5fr 2fr 36px", gap: "6px", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 800, textAlign: "center", background: "#f1f5f9", padding: "6px 0", borderRadius: "4px" }}>#{crumb.position}</span>
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-input"
                        value={crumb.name}
                        onChange={(e) => updateBreadcrumb(idx, "name", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="url"
                        placeholder="URL"
                        className="form-input"
                        value={crumb.url}
                        onChange={(e) => updateBreadcrumb(idx, "url", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      {breadcrumbs.length > 1 && (
                        <button type="button" onClick={() => removeBreadcrumb(idx)} style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "4px", height: "32px", cursor: "pointer" }}>
                          <i className="fa-solid fa-trash" style={{ fontSize: "0.7rem" }}></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addBreadcrumb} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", marginTop: "4px" }}>
                    <i className="fa-solid fa-plus"></i> Add Level
                  </button>
                </div>
              )}

              {/* 10. HOW-TO FORM */}
              {schemaType === "HowTo" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.8rem" }}>How-To Guide Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={howToData.name}
                      onChange={(e) => setHowToData({ ...howToData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                  {howToData.steps.map((step, idx) => (
                    <div key={idx} style={{ padding: "10px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <strong style={{ fontSize: "0.78rem" }}>Step #{idx + 1}</strong>
                        {howToData.steps.length > 1 && (
                          <button type="button" onClick={() => removeHowToStep(idx)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.72rem", cursor: "pointer" }}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Step Title"
                        className="form-input mb-1"
                        value={step.name}
                        onChange={(e) => updateHowToStep(idx, "name", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <textarea
                        rows={2}
                        placeholder="Step detail text"
                        className="form-textarea"
                        value={step.text}
                        onChange={(e) => updateHowToStep(idx, "text", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addHowToStep} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px" }}>
                    <i className="fa-solid fa-plus"></i> Add Step
                  </button>
                </div>
              )}

              {/* OTHER SCHEMAS (Generic Clean Input Fallback) */}
              {["Service", "Event", "VideoObject", "JobPosting", "Course", "SoftwareApplication", "Recipe"].includes(schemaType) && (
                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <p style={{ fontSize: "0.8rem", color: "#475569", margin: "0 0 10px" }}>
                    Standard configuration active for <strong>{schemaType}</strong>. All properties are validated against official Google and Schema.org 2026 specifications.
                  </p>
                  <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: 700 }}>
                    ✓ Pre-populated with optimized industry sample data.
                  </span>
                </div>
              )}

            </div>

            {/* PANEL 3: RIGHT WORKBENCH (CODE, VISUAL SERP, GRAPH & AUDIT) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* TAB SWITCHER */}
              <div style={{ display: "flex", gap: "4px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "4px" }}>
                {[
                  { id: "code", label: "JSON-LD Code", icon: "fa-code" },
                  { id: "serp_preview", label: "SERP Preview", icon: "fa-eye" },
                  { id: "compliance", label: "Audit Health", icon: "fa-list-check" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: "4px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      border: "none",
                      background: activeTab === t.id ? "#2563eb" : "transparent",
                      color: activeTab === t.id ? "#ffffff" : "#64748b",
                      cursor: "pointer"
                    }}
                  >
                    <i className={`fa-solid ${t.icon}`}></i> {t.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: CODE OUTPUT */}
              {activeTab === "code" && (
                <div className="schema-output-box" style={{ borderRadius: "4px" }}>
                  <div className="code-header" style={{ padding: "10px 14px" }}>
                    <span className="code-title" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-solid fa-file-code text-primary"></i> Application/ld+json
                    </span>
                    <label style={{ fontSize: "0.72rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                      <input type="checkbox" checked={isMinified} onChange={(e) => setIsMinified(e.target.checked)} /> Minify
                    </label>
                  </div>

                  <pre className="code-block" style={{ maxHeight: "460px", overflowY: "auto", margin: 0, padding: "14px" }}>
                    <code style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{scriptTagOutput}</code>
                  </pre>

                  <div style={{ padding: "10px 14px", background: "#1e293b", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                      Size: ~{(scriptTagOutput.length / 1024).toFixed(2)} KB
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: 700 }}>
                        Test on Google <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.68rem" }}></i>
                      </a>
                      <a href="https://validator.schema.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 700 }}>
                        Schema.org <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.68rem" }}></i>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SERP PREVIEW */}
              {activeTab === "serp_preview" && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>
                      <i className="fa-brands fa-google text-primary"></i> Simulated Google Rich Result
                    </strong>
                    <div style={{ display: "flex", gap: "3px" }}>
                      <button type="button" onClick={() => setPreviewDevice("desktop")} style={{ padding: "3px 6px", borderRadius: "4px", fontSize: "0.72rem", background: previewDevice === "desktop" ? "#e2e8f0" : "transparent", border: "1px solid #cbd5e1", cursor: "pointer" }}><i className="fa-solid fa-desktop"></i></button>
                      <button type="button" onClick={() => setPreviewDevice("mobile")} style={{ padding: "3px 6px", borderRadius: "4px", fontSize: "0.72rem", background: previewDevice === "mobile" ? "#e2e8f0" : "transparent", border: "1px solid #cbd5e1", cursor: "pointer" }}><i className="fa-solid fa-mobile-screen"></i></button>
                    </div>
                  </div>

                  <div style={{ maxWidth: previewDevice === "mobile" ? "320px" : "100%", margin: "0 auto", background: "#ffffff", padding: "12px", border: previewDevice === "mobile" ? "1px solid #cbd5e1" : "none", borderRadius: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#4d5156", marginBottom: "4px" }}>
                      <span style={{ width: "16px", height: "16px", background: "#f1f3f4", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>
                        <i className="fa-solid fa-globe"></i>
                      </span>
                      <span style={{ fontWeight: 600, color: "#202124" }}>abdullahbdseo.vercel.app</span>
                      <span>›</span>
                      <span>{schemaType}</span>
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: 400, color: "#1a0dab", margin: "0 0 4px", lineHeight: 1.3 }}>
                      {schemaType === "MasterGraph" ? masterGraphData.pageTitle : schemaType === "Article" ? articleData.headline : schemaType === "Product" ? productData.name : schemaType === "LocalBusiness" ? localBiz.name : "Verified Knowledge Graph Entity"}
                    </h3>

                    {(schemaType === "Product" || schemaType === "LocalBusiness" || schemaType === "SoftwareApplication") && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#70757a", margin: "4px 0" }}>
                        <div style={{ color: "#e37400", display: "flex", gap: "2px" }}>
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <span style={{ fontWeight: 700, color: "#202124" }}>5.0</span>
                        <span>•</span>
                        <span>{productData.reviewCount || "48"} reviews</span>
                        {schemaType === "Product" && (
                          <><span>•</span><span style={{ fontWeight: 700, color: "#188038" }}>${productData.price}</span><span>•</span><span style={{ color: "#188038" }}>In stock</span></>
                        )}
                      </div>
                    )}

                    <p style={{ fontSize: "0.82rem", color: "#4d5156", lineHeight: 1.45, margin: "4px 0 0" }}>
                      {schemaType === "MasterGraph" ? masterGraphData.pageDescription : schemaType === "Article" ? articleData.description : schemaType === "Product" ? productData.description : "Official Google verified knowledge graph node with direct answer authority."}
                    </p>

                    {schemaType === "FAQPage" && (
                      <div style={{ marginTop: "8px", borderTop: "1px solid #f1f3f4", paddingTop: "6px" }}>
                        {faqList.slice(0, 3).map((f, i) => (
                          <div key={i} style={{ padding: "4px 0", fontSize: "0.78rem", display: "flex", justifyContent: "space-between", color: "#202124" }}>
                            <span>{f.question || "Frequently Asked Question"}</span>
                            <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.65rem", color: "#70757a" }}></i>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: AUDIT & HEALTH */}
              {activeTab === "compliance" && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>
                      <i className="fa-solid fa-shield-halved text-primary"></i> Rich Results Checklist
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>2026 Standards</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {healthCheck.checks.map((c, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", padding: "6px 8px", background: c.valid ? "#f8fafc" : "#fffbeb", borderRadius: "4px", border: c.valid ? "1px solid #f1f5f9" : "1px solid #fef3c7" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <i className={`fa-solid ${c.valid ? "fa-circle-check text-success" : "fa-circle-xmark text-warning"}`}></i>
                          <span style={{ color: "#334155", fontWeight: c.req ? 700 : 500 }}>{c.name}</span>
                        </div>
                        <span style={{ fontSize: "0.7rem", color: c.valid ? "#059669" : "#d97706", fontWeight: 700 }}>
                          {c.valid ? "Valid" : c.req ? "Required" : "Recommended"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* RELATED TOOLS */}
          <div className="tool-related-section" style={{ marginTop: "40px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Explore Related SEO Tools
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              Verify crawler directives, simulate snippets, and check server response headers.
            </p>
            <div className="related-tools-grid">
              <div className="tool-ref-card" style={{ borderRadius: "4px" }}>
                <div className="tool-ref-icon" style={{ background: "#fef3c7", color: "#d97706", borderRadius: "4px" }}>
                  <i className="fa-brands fa-google"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/serp-simulator">Google SERP Simulator</Link></h4>
                <p className="tool-ref-desc">Preview meta title and description snippets with live pixel length limits.</p>
                <div className="tool-ref-footer"><Link href="/tools/serp-simulator" className="tool-ref-link">Simulate SERP <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card" style={{ borderRadius: "4px" }}>
                <div className="tool-ref-icon" style={{ background: "#f1f5f9", color: "#334155", borderRadius: "4px" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/robots-sitemap-generator">Robots.txt Builder</Link></h4>
                <p className="tool-ref-desc">Generate bot crawler directives and compliant XML sitemaps.</p>
                <div className="tool-ref-footer"><Link href="/tools/robots-sitemap-generator" className="tool-ref-link">Build Robots.txt <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>

              <div className="tool-ref-card" style={{ borderRadius: "4px" }}>
                <div className="tool-ref-icon" style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: "4px" }}>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4 className="tool-ref-title"><Link href="/tools/deep-seo-audit">Deep SEO Audit Tool</Link></h4>
                <p className="tool-ref-desc">Audit on-page SEO score, tags, headings, canonicals, and Core Web Vitals.</p>
                <div className="tool-ref-footer"><Link href="/tools/deep-seo-audit" className="tool-ref-link">Run Audit <i className="fa-solid fa-arrow-right"></i></Link></div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <ToolFaqAccordion
            title="Schema.org & JSON-LD Rich Snippets FAQ"
            faqs={[
              {
                q: "What is Schema Markup and why is JSON-LD recommended by Google?",
                a: "Schema markup is a standardized vocabulary of structured data tags added to your HTML to help search engines understand page content and entity relationships. Google explicitly recommends JSON-LD (JavaScript Object Notation for Linked Data) format because it can be placed cleanly inside the document head without altering visible page styling."
              },
              {
                q: "What is the Master @graph approach and why is it superior?",
                a: "The @graph array allows you to nest multiple interconnected entities (WebSite, Organization, Author, WebPage, BlogPosting) in a single script block using '@id' URI nodes. This eliminates duplicate declarations and provides AI bots with a clean, connected knowledge graph."
              },
              {
                q: "Where should I paste the generated JSON-LD code?",
                a: "Paste the generated <script type=\"application/ld+json\"> snippet into the <head> or <body> section of your page HTML. In Next.js App Router, inject it using next/script or a standard script tag with dangerouslySetInnerHTML."
              },
              {
                q: "How do I validate if my Schema Markup has any errors?",
                a: "Test your structured data code using Google's official Rich Results Test tool (search.google.com/test/rich-results) and Schema.org Validator (validator.schema.org) to ensure zero warnings or critical syntax errors before publishing."
              },
              {
                q: "Does Schema Markup directly help with AI Search engines like Perplexity and ChatGPT?",
                a: "Yes! LLMs and RAG systems rely heavily on structured knowledge graphs to resolve brand, author, and service entities. Clear schema markup ensures AI models quote and cite your brand accurately."
              }
            ]}
          />

          {/* Consultation CTA Banner */}
          <div className="tool-cta-box" style={{ borderRadius: "4px" }}>
            <h4>Need Bespoke Schema &amp; Semantic Knowledge Graph SEO?</h4>
            <p>We build connected entity graphs, product rich data, and automated schema pipelines.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-sm" style={{ borderRadius: "4px" }}>
                <i className="fa-solid fa-comments"></i> Book Schema Consultation
              </Link>
              <Link href="/services/technical-seo-service-in-bangladesh" className="btn btn-outline btn-sm" style={{ borderRadius: "4px" }}>
                Explore Technical SEO <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
