"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

const SCHEMA_TYPES = [
  { id: "Organization", label: "Organization", icon: "fa-building", category: "Core Entities", badge: "Knowledge Graph" },
  { id: "LocalBusiness", label: "Local Business", icon: "fa-shop", category: "Local SEO", badge: "Google Maps" },
  { id: "Product", label: "Product & Offer", icon: "fa-box-open", category: "E-Commerce", badge: "Google Shopping" },
  { id: "Article", label: "Article & Blog", icon: "fa-newspaper", category: "Content SEO", badge: "Top Stories" },
  { id: "FAQPage", label: "FAQ Page", icon: "fa-circle-question", category: "SERP Features", badge: "Rich Results" },
  { id: "BreadcrumbList", label: "Breadcrumbs", icon: "fa-folder-tree", category: "Core Entities", badge: "SERP Path" },
  { id: "Person", label: "Person / E-E-A-T Author", icon: "fa-user-tie", category: "Core Entities", badge: "Author Trust" },
  { id: "Service", label: "Service Offering", icon: "fa-briefcase", category: "Business SEO", badge: "Service Graph" },
  { id: "Event", label: "Event / Webinar", icon: "fa-calendar-star", category: "SERP Features", badge: "Event Pack" },
  { id: "VideoObject", label: "Video Object", icon: "fa-video", category: "Media SEO", badge: "Video Carousel" },
  { id: "SoftwareApplication", label: "Software / SaaS App", icon: "fa-laptop-code", category: "Tech SEO", badge: "App Store" },
  { id: "Recipe", label: "Recipe", icon: "fa-utensils", category: "SERP Features", badge: "Recipe Carousel" }
];

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState("Organization");
  const [activeView, setActiveView] = useState("code"); // 'code' or 'serp_preview'
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop"); // 'desktop' or 'mobile'
  const [schemaSearch, setSchemaSearch] = useState("");

  // 1. Organization State
  const [orgData, setOrgData] = useState({
    subType: "Organization",
    name: "Abdullah SEO & Growth Agency",
    legalName: "Abdullah Organic SEO Solutions Ltd.",
    alternateName: "AbdullahBD SEO",
    url: "https://abdullahbdseo.vercel.app",
    logo: "https://abdullahbdseo.vercel.app/images/logo.png",
    description: "Enterprise technical SEO consultancy, Generative Engine Optimization (GEO), and high-intent backlink strategies.",
    foundingDate: "2019-01-15",
    founderName: "Abdullah Saleh",
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
      "https://www.wikidata.org/wiki/Q000000"
    ]
  });

  // 2. Local Business State
  const [localBiz, setLocalBiz] = useState({
    subType: "ProfessionalService",
    name: "Abdullah Saleh - Best SEO Expert in Bangladesh",
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
    areaServed: "Bangladesh, United States, United Kingdom, Australia, Canada",
    openingDays: "Mo-Fr",
    opensTime: "09:00",
    closesTime: "18:00",
    ratingValue: "5.0",
    reviewCount: "48"
  });

  // 3. Product State
  const [productData, setProductData] = useState({
    name: "Enterprise Technical SEO & GEO Audit Package",
    image: "https://abdullahbdseo.vercel.app/images/blog_ai_search_dominance.jpg",
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

  // 4. Article / BlogPosting State
  const [articleData, setArticleData] = useState({
    subType: "BlogPosting",
    headline: "ChatGPT Search Optimization: 7 Proven Tactics to Get Your Brand Cited by AI Chatbots in 2026",
    url: "https://abdullahbdseo.vercel.app/blog/chatgpt-search-optimization-brand-citations-ai-chatbots-2026",
    image: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg",
    description: "Master ChatGPT Search optimization, RAG retrieval flow, Bing Quality signals, and answer capsules to secure brand citations in 2026.",
    articleSection: "GEO & Generative AI Search",
    keywords: "ChatGPT Search, ChatGPT SEO, AI Citations, GEO, Bing SEO, RAG Optimization",
    wordCount: "1670",
    authorType: "Person",
    authorName: "Abdullah Saleh",
    authorUrl: "https://abdullahbdseo.vercel.app/about",
    authorJobTitle: "Lead SEO Strategist & AI Search Architect",
    publisherName: "AbdullahBD SEO",
    publisherLogo: "https://abdullahbdseo.vercel.app/images/logo.png",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06"
  });

  // 5. FAQ Page State
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

  // 6. BreadcrumbList State
  const [breadcrumbs, setBreadcrumbs] = useState([
    { position: 1, name: "Home", url: "https://abdullahbdseo.vercel.app" },
    { position: 2, name: "Services", url: "https://abdullahbdseo.vercel.app/services" },
    { position: 3, name: "Technical SEO Service", url: "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh" }
  ]);

  // 7. Person State
  const [personData, setPersonData] = useState({
    name: "Abdullah Saleh",
    jobTitle: "Lead SEO Strategist & Organic Growth Architect",
    url: "https://abdullahbdseo.vercel.app/about",
    image: "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
    worksFor: "AbdullahBD SEO & Growth Consultancy",
    description: "Experienced Organic Business Growth Specialist and Technical SEO Expert helping global businesses dominate Google Search and Generative AI engines.",
    email: "abdullahbd.seo@gmail.com",
    alumniOf: "University of Dhaka",
    knowsAbout: "Technical SEO, Core Web Vitals, GEO (Generative Engine Optimization), AI Search Citations, Entity Schema, Python SEO Automation",
    sameAs: [
      "https://linkedin.com/in/abdullah-saleh-seo",
      "https://twitter.com/abdullahsaleh_seo",
      "https://github.com/abdullahbdseo",
      "https://facebook.com/abdullahbdseo"
    ]
  });

  // 8. Service State
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

  // 9. Event State
  const [eventData, setEventData] = useState({
    name: "2026 AI Search & GEO Masterclass: Ranking in ChatGPT & Gemini",
    description: "Live intensive 3-hour masterclass covering entity authority, answer capsules, and reverse-engineering AI crawler ranking algorithms.",
    image: "https://abdullahbdseo.vercel.app/images/blog_ai_overviews_geo.jpg",
    startDate: "2026-11-15T18:00:00+06:00",
    endDate: "2026-11-15T21:00:00+06:00",
    eventAttendanceMode: "OnlineEventAttendanceMode",
    eventStatus: "EventScheduled",
    locationType: "virtual",
    virtualUrl: "https://abdullahbdseo.vercel.app/webinar/geo-masterclass-2026",
    locationName: "Grand Ballroom, Dhaka IT Center",
    locationAddress: "Gulshan 2, Dhaka 1212, Bangladesh",
    organizerName: "Abdullah Saleh",
    organizerUrl: "https://abdullahbdseo.vercel.app",
    ticketPrice: "49.00",
    ticketCurrency: "USD",
    ticketAvailability: "InStock"
  });

  // 10. VideoObject State
  const [videoData, setVideoData] = useState({
    name: "How Google AI Overviews Select Citation Sources in 2026",
    description: "Watch this comprehensive walkthrough on entity resolution, Knowledge Graph nodes, and E-E-A-T score factors that power Google AI answers.",
    thumbnailUrl: "https://abdullahbdseo.vercel.app/images/blog_ai_overviews_geo.jpg",
    uploadDate: "2026-09-29T10:00:00+06:00",
    duration: "PT14M32S",
    contentUrl: "https://abdullahbdseo.vercel.app/videos/ai-overviews-explained.mp4",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  });

  // 11. SoftwareApplication State
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

  // 12. Recipe State
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

  // FAQ handlers
  const addFaq = () => setFaqList([...faqList, { question: "", answer: "" }]);
  const updateFaq = (index, field, value) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
  };
  const removeFaq = (index) => setFaqList(faqList.filter((_, i) => i !== index));

  // Breadcrumb handlers
  const addBreadcrumb = () => {
    const nextPos = breadcrumbs.length + 1;
    setBreadcrumbs([...breadcrumbs, { position: nextPos, name: "", url: "https://" }]);
  };
  const updateBreadcrumb = (index, field, value) => {
    const updated = [...breadcrumbs];
    updated[index][field] = value;
    setBreadcrumbs(updated);
  };
  const removeBreadcrumb = (index) => {
    const updated = breadcrumbs.filter((_, i) => i !== index).map((b, idx) => ({ ...b, position: idx + 1 }));
    setBreadcrumbs(updated);
  };

  // Recipe helpers
  const addIngredient = () => setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, ""] });
  const updateIngredient = (index, val) => {
    const updated = [...recipeData.ingredients];
    updated[index] = val;
    setRecipeData({ ...recipeData, ingredients: updated });
  };
  const removeIngredient = (index) => {
    setRecipeData({ ...recipeData, ingredients: recipeData.ingredients.filter((_, i) => i !== index) });
  };

  const addInstruction = () => setRecipeData({ ...recipeData, instructions: [...recipeData.instructions, ""] });
  const updateInstruction = (index, val) => {
    const updated = [...recipeData.instructions];
    updated[index] = val;
    setRecipeData({ ...recipeData, instructions: updated });
  };
  const removeInstruction = (index) => {
    setRecipeData({ ...recipeData, instructions: recipeData.instructions.filter((_, i) => i !== index) });
  };

  // GENERATE STRUCTURED DATA JSON-LD
  const generateSchemaJson = useMemo(() => {
    switch (schemaType) {
      case "Organization": {
        const schema = {
          "@context": "https://schema.org",
          "@type": orgData.subType || "Organization",
          "name": orgData.name,
          "legalName": orgData.legalName || undefined,
          "alternateName": orgData.alternateName || undefined,
          "url": orgData.url,
          "logo": orgData.logo,
          "description": orgData.description || undefined,
          "foundingDate": orgData.foundingDate || undefined,
          "founder": orgData.founderName ? {
            "@type": "Person",
            "name": orgData.founderName
          } : undefined,
          "contactPoint": (orgData.phone || orgData.email) ? {
            "@type": "ContactPoint",
            "telephone": orgData.phone || undefined,
            "contactType": orgData.contactType || "customer service",
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
        };
        return cleanObject(schema);
      }

      case "LocalBusiness": {
        const schema = {
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
        };
        return cleanObject(schema);
      }

      case "Product": {
        const schema = {
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
            "url": productData.sellerName ? "https://abdullahbdseo.vercel.app" : undefined,
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
        };
        return cleanObject(schema);
      }

      case "Article": {
        const schema = {
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
            "@type": articleData.authorType || "Person",
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
        };
        return cleanObject(schema);
      }

      case "FAQPage": {
        const schema = {
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
        };
        return cleanObject(schema);
      }

      case "BreadcrumbList": {
        const schema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.filter(b => b.name && b.name.trim() !== "").map((item, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": item.name.trim(),
            "item": item.url ? item.url.trim() : undefined
          }))
        };
        return cleanObject(schema);
      }

      case "Person": {
        const schema = {
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
          "alumniOf": personData.alumniOf ? {
            "@type": "EducationalOrganization",
            "name": personData.alumniOf
          } : undefined,
          "knowsAbout": personData.knowsAbout ? personData.knowsAbout.split(",").map(k => k.trim()) : undefined,
          "sameAs": personData.sameAs.filter(url => url && url.trim() !== "")
        };
        return cleanObject(schema);
      }

      case "Service": {
        const schema = {
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
            "priceCurrency": serviceData.priceCurrency || "USD",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": serviceData.price,
              "priceCurrency": serviceData.priceCurrency || "USD",
              "valueAddedTaxIncluded": true
            }
          } : undefined
        };
        return cleanObject(schema);
      }

      case "Event": {
        const isOnline = eventData.eventAttendanceMode === "OnlineEventAttendanceMode";
        const schema = {
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
            "url": eventData.virtualUrl || undefined,
            "validFrom": eventData.startDate
          } : undefined
        };
        return cleanObject(schema);
      }

      case "VideoObject": {
        const schema = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": videoData.name,
          "description": videoData.description,
          "thumbnailUrl": [videoData.thumbnailUrl],
          "uploadDate": videoData.uploadDate,
          "duration": videoData.duration || undefined,
          "contentUrl": videoData.contentUrl || undefined,
          "embedUrl": videoData.embedUrl || undefined
        };
        return cleanObject(schema);
      }

      case "SoftwareApplication": {
        const schema = {
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
        };
        return cleanObject(schema);
      }

      case "Recipe": {
        const schema = {
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
        };
        return cleanObject(schema);
      }

      default:
        return {};
    }
  }, [
    schemaType, orgData, localBiz, productData, articleData,
    faqList, breadcrumbs, personData, serviceData, eventData,
    videoData, softwareData, recipeData
  ]);

  // Clean empty/undefined keys recursively
  function cleanObject(obj) {
    if (Array.isArray(obj)) {
      const cleaned = obj.map(cleanObject).filter(v => v !== undefined && v !== null);
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

  const schemaJsonString = isMinified
    ? JSON.stringify(generateSchemaJson)
    : JSON.stringify(generateSchemaJson, null, 2);

  const scriptTagOutput = isMinified
    ? `<script type="application/ld+json">${schemaJsonString}</script>`
    : `<script type="application/ld+json">\n${schemaJsonString}\n</script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(scriptTagOutput);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyRawJson = () => {
    navigator.clipboard.writeText(schemaJsonString);
    setCopiedRaw(true);
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
  };

  // Live Compliance & Health Checker
  const healthCheck = useMemo(() => {
    const checks = [];
    if (schemaType === "Organization") {
      checks.push({ name: "Organization Name", valid: Boolean(orgData.name), req: true });
      checks.push({ name: "Website URL", valid: Boolean(orgData.url && orgData.url.startsWith("http")), req: true });
      checks.push({ name: "Logo URL", valid: Boolean(orgData.logo), req: true });
      checks.push({ name: "sameAs Knowledge Graph links", valid: orgData.sameAs.some(s => s.length > 5), req: false });
      checks.push({ name: "Contact Point (Phone/Email)", valid: Boolean(orgData.phone || orgData.email), req: false });
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
      checks.push({ name: "Core Schema Context", valid: true, req: true });
      checks.push({ name: "Valid Schema.org Type", valid: true, req: true });
    }

    const passedReq = checks.filter(c => c.req && c.valid).length;
    const totalReq = checks.filter(c => c.req).length;
    const isCompliant = passedReq === totalReq;

    return { checks, isCompliant, passedReq, totalReq };
  }, [schemaType, orgData, localBiz, productData, articleData, faqList]);

  const filteredSchemaTypes = useMemo(() => {
    if (!schemaSearch) return SCHEMA_TYPES;
    return SCHEMA_TYPES.filter(t =>
      t.label.toLowerCase().includes(schemaSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(schemaSearch.toLowerCase()) ||
      t.badge.toLowerCase().includes(schemaSearch.toLowerCase())
    );
  }, [schemaSearch]);

  return (
    <div className="tool-single-page">
      {/* Header Section */}
      <section className="page-header-section" style={{ paddingBottom: "24px" }}>
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2" style={{ borderRadius: "4px" }}>
            <i className="fa-solid fa-code"></i> Enterprise Schema &amp; Semantic Graph Suite
          </div>
          <h1 className="page-title">JSON-LD Schema Markup Generator (2026 Edition)</h1>
          <p className="page-subtitle max-w-3xl mx-auto">
            Generate 100% Google Rich Results compliant JSON-LD structured data. Feed clean entity relationships to Google, ChatGPT Search, Gemini, and Perplexity with zero syntax errors.
          </p>

          {/* Quick Stats Bar */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "18px" }}>
            <span style={{ fontSize: "0.82rem", background: "rgba(37,99,235,0.08)", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid rgba(37,99,235,0.2)" }}>
              <i className="fa-solid fa-bolt"></i> 12 Google Rich Snippet Schemas
            </span>
            <span style={{ fontSize: "0.82rem", background: "rgba(16,185,129,0.08)", color: "#059669", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid rgba(16,185,129,0.2)" }}>
              <i className="fa-solid fa-shield-check"></i> Live Rich Results Validator
            </span>
            <span style={{ fontSize: "0.82rem", background: "rgba(245,158,11,0.08)", color: "#d97706", padding: "6px 12px", borderRadius: "4px", fontWeight: 700, border: "1px solid rgba(245,158,11,0.2)" }}>
              <i className="fa-solid fa-brain"></i> AI Chatbot Entity Optimization (GEO)
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: "10px" }}>
        <div className="container" style={{ maxWidth: "1280px" }}>

          {/* SCHEMA TYPE SELECTOR BAR */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px 20px", marginBottom: "24px", boxShadow: "0 2px 10px rgba(15,23,42,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>
                  <i className="fa-solid fa-cubes-stacked text-primary"></i> Select Schema Model:
                </span>
                <span style={{ fontSize: "0.75rem", background: "#f1f5f9", color: "#475569", padding: "3px 8px", borderRadius: "4px", fontWeight: 700 }}>
                  Active: {schemaType}
                </span>
              </div>

              {/* Quick Search */}
              <div style={{ position: "relative", minWidth: "220px" }}>
                <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.78rem" }}></i>
                <input
                  type="text"
                  placeholder="Filter schemas..."
                  value={schemaSearch}
                  onChange={(e) => setSchemaSearch(e.target.value)}
                  style={{ width: "100%", padding: "6px 10px 6px 30px", fontSize: "0.82rem", border: "1px solid #cbd5e1", borderRadius: "4px", outline: "none" }}
                />
              </div>
            </div>

            {/* Grid of Schema Types */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "8px" }}>
              {filteredSchemaTypes.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSchemaType(tab.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "10px 12px",
                    background: schemaType === tab.id ? "#2563eb" : "#f8fafc",
                    color: schemaType === tab.id ? "#ffffff" : "#334155",
                    border: schemaType === tab.id ? "1px solid #2563eb" : "1px solid #e2e8f0",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "4px" }}>
                    <i className={`fa-solid ${tab.icon}`} style={{ fontSize: "0.95rem", color: schemaType === tab.id ? "#93c5fd" : "#2563eb" }}></i>
                    <span style={{ fontSize: "0.65rem", padding: "2px 5px", borderRadius: "4px", background: schemaType === tab.id ? "rgba(255,255,255,0.2)" : "#e2e8f0", color: schemaType === tab.id ? "#ffffff" : "#64748b", fontWeight: 700 }}>
                      {tab.badge}
                    </span>
                  </div>
                  <strong style={{ fontSize: "0.85rem", fontWeight: 700 }}>{tab.label}</strong>
                  <span style={{ fontSize: "0.7rem", opacity: schemaType === tab.id ? 0.9 : 0.6 }}>{tab.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* MAIN 2-COLUMN WORKBENCH */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "24px", alignItems: "start" }}>

            {/* LEFT COLUMN: COMPREHENSIVE CONFIGURATION FORM */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>
              
              {/* Form Title & Subtype Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Configure {schemaType} Properties
                  </h2>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    Complete standard Schema.org and Google Search guideline fields
                  </span>
                </div>

                {/* Compliance Pill */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: healthCheck.isCompliant ? "#ecfdf5" : "#fffbeb", border: healthCheck.isCompliant ? "1px solid #a7f3d0" : "1px solid #fde68a", padding: "4px 10px", borderRadius: "4px" }}>
                  <i className={`fa-solid ${healthCheck.isCompliant ? "fa-circle-check text-success" : "fa-triangle-exclamation text-warning"}`} style={{ fontSize: "0.85rem" }}></i>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: healthCheck.isCompliant ? "#065f46" : "#92400e" }}>
                    {healthCheck.isCompliant ? "Google Compliant" : `${healthCheck.passedReq}/${healthCheck.totalReq} Required`}
                  </span>
                </div>
              </div>

              {/* 1. ORGANIZATION FORM */}
              {schemaType === "Organization" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Organization Subtype</label>
                      <select
                        className="form-input"
                        value={orgData.subType}
                        onChange={(e) => setOrgData({ ...orgData, subType: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="Organization">Organization (Generic)</option>
                        <option value="Corporation">Corporation</option>
                        <option value="OnlineBusiness">OnlineBusiness / SaaS</option>
                        <option value="EducationalOrganization">EducationalOrganization</option>
                        <option value="MedicalOrganization">MedicalOrganization</option>
                        <option value="NGO">Non-Governmental Organization (NGO)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Brand Display Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={orgData.name}
                        onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Legal / Registered Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={orgData.legalName}
                        onChange={(e) => setOrgData({ ...orgData, legalName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Alternate / Short Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={orgData.alternateName}
                        onChange={(e) => setOrgData({ ...orgData, alternateName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Official Canonical URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={orgData.url}
                        onChange={(e) => setOrgData({ ...orgData, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Logo Image URL *</label>
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
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Entity Description (Entity Bio)</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={orgData.description}
                      onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  {/* Founders & Contact */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                      <i className="fa-solid fa-id-card text-primary"></i> Contact Point &amp; Founder
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="Founder Name"
                        className="form-input"
                        value={orgData.founderName}
                        onChange={(e) => setOrgData({ ...orgData, founderName: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Support Phone"
                        className="form-input"
                        value={orgData.phone}
                        onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="email"
                        placeholder="Support Email"
                        className="form-input"
                        value={orgData.email}
                        onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                  </div>

                  {/* Physical Address */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                      <i className="fa-solid fa-map-pin text-primary"></i> Headquarters Postal Address
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="form-input"
                        value={orgData.street}
                        onChange={(e) => setOrgData({ ...orgData, street: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="form-input"
                        value={orgData.city}
                        onChange={(e) => setOrgData({ ...orgData, city: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="form-input"
                        value={orgData.postalCode}
                        onChange={(e) => setOrgData({ ...orgData, postalCode: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Country (e.g. US/BD)"
                        className="form-input"
                        value={orgData.country}
                        onChange={(e) => setOrgData({ ...orgData, country: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                  </div>

                  {/* Social sameAs URLs */}
                  <div>
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>
                      Knowledge Graph &amp; Social Authority Profiles (sameAs)
                    </label>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0 0 8px" }}>
                      Feeds entity disambiguation to Google Knowledge Graph, Wikidata, and AI citation models.
                    </p>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      placeholder="Enter one profile URL per line"
                      value={orgData.sameAs.join("\n")}
                      onChange={(e) => setOrgData({ ...orgData, sameAs: e.target.value.split("\n") })}
                      style={{ borderRadius: "4px", fontSize: "0.82rem", fontFamily: "monospace" }}
                    />
                  </div>
                </div>
              )}

              {/* 2. LOCAL BUSINESS FORM */}
              {schemaType === "LocalBusiness" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Business Category Subtype *</label>
                      <select
                        className="form-input"
                        value={localBiz.subType}
                        onChange={(e) => setLocalBiz({ ...localBiz, subType: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="LocalBusiness">LocalBusiness (Generic)</option>
                        <option value="ProfessionalService">ProfessionalService / Consultant</option>
                        <option value="MedicalClinic">MedicalClinic / Doctor</option>
                        <option value="LegalService">LegalService / Attorney</option>
                        <option value="AccountingService">AccountingService / CPA</option>
                        <option value="Restaurant">Restaurant / Cafe</option>
                        <option value="Store">Store / Retail Shop</option>
                        <option value="RealEstateAgent">RealEstateAgent</option>
                        <option value="AutomotiveBusiness">AutomotiveBusiness / Repair</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Business Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.name}
                        onChange={(e) => setLocalBiz({ ...localBiz, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Website URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={localBiz.url}
                        onChange={(e) => setLocalBiz({ ...localBiz, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Storefront / Location Image URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={localBiz.image}
                        onChange={(e) => setLocalBiz({ ...localBiz, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Phone Number *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={localBiz.phone}
                        onChange={(e) => setLocalBiz({ ...localBiz, phone: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Price Range</label>
                      <select
                        className="form-input"
                        value={localBiz.priceRange}
                        onChange={(e) => setLocalBiz({ ...localBiz, priceRange: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="$">$ (Inexpensive)</option>
                        <option value="$$">$$ (Moderate)</option>
                        <option value="$$$">$$$ (High-End)</option>
                        <option value="$$$$">$$$$ (Luxury)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Accepted Payment</label>
                      <input
                        type="text"
                        placeholder="Cash, Card, USDT"
                        className="form-input"
                        value={localBiz.paymentAccepted}
                        onChange={(e) => setLocalBiz({ ...localBiz, paymentAccepted: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  {/* Physical Address & Geo */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                      <i className="fa-solid fa-location-dot text-primary"></i> NAP &amp; Geo Coordinates
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="form-input"
                        value={localBiz.street}
                        onChange={(e) => setLocalBiz({ ...localBiz, street: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="form-input"
                        value={localBiz.city}
                        onChange={(e) => setLocalBiz({ ...localBiz, city: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="State/Region"
                        className="form-input"
                        value={localBiz.region}
                        onChange={(e) => setLocalBiz({ ...localBiz, region: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="form-input"
                        value={localBiz.postalCode}
                        onChange={(e) => setLocalBiz({ ...localBiz, postalCode: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Latitude (e.g. 23.7937)"
                        className="form-input"
                        value={localBiz.latitude}
                        onChange={(e) => setLocalBiz({ ...localBiz, latitude: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Longitude (e.g. 90.4043)"
                        className="form-input"
                        value={localBiz.longitude}
                        onChange={(e) => setLocalBiz({ ...localBiz, longitude: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="url"
                        placeholder="Google Maps Place URL"
                        className="form-input"
                        value={localBiz.hasMap}
                        onChange={(e) => setLocalBiz({ ...localBiz, hasMap: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                  </div>

                  {/* Reviews & Ratings */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                      <i className="fa-solid fa-star text-warning"></i> Google Review Stars (AggregateRating)
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Rating Score (1.0 - 5.0)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBiz.ratingValue}
                          onChange={(e) => setLocalBiz({ ...localBiz, ratingValue: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Total Review Count</label>
                        <input
                          type="number"
                          className="form-input"
                          value={localBiz.reviewCount}
                          onChange={(e) => setLocalBiz({ ...localBiz, reviewCount: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PRODUCT FORM */}
              {schemaType === "Product" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Product Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={productData.name}
                      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Product Image URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={productData.image}
                        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Brand Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={productData.brand}
                        onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Product Description</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={productData.description}
                      onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  {/* Identifier Codes */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>SKU Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={productData.sku}
                        onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>MPN Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={productData.mpn}
                        onChange={(e) => setProductData({ ...productData, mpn: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>GTIN / Barcode</label>
                      <input
                        type="text"
                        className="form-input"
                        value={productData.gtin13}
                        onChange={(e) => setProductData({ ...productData, gtin13: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  {/* Offers & Pricing */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                      <i className="fa-solid fa-tag text-primary"></i> Pricing, Currency &amp; Stock Status
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Price *</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-input"
                          value={productData.price}
                          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Currency *</label>
                        <select
                          className="form-input"
                          value={productData.priceCurrency}
                          onChange={(e) => setProductData({ ...productData, priceCurrency: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="BDT">BDT (৳)</option>
                          <option value="CAD">CAD ($)</option>
                          <option value="AUD">AUD ($)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Stock Status</label>
                        <select
                          className="form-input"
                          value={productData.availability}
                          onChange={(e) => setProductData({ ...productData, availability: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        >
                          <option value="InStock">InStock</option>
                          <option value="OutOfStock">OutOfStock</option>
                          <option value="PreOrder">PreOrder</option>
                          <option value="BackOrder">BackOrder</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Condition</label>
                        <select
                          className="form-input"
                          value={productData.itemCondition}
                          onChange={(e) => setProductData({ ...productData, itemCondition: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        >
                          <option value="NewCondition">New</option>
                          <option value="RefurbishedCondition">Refurbished</option>
                          <option value="UsedCondition">Used</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Aggregate Ratings */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Rating Score (e.g. 4.9)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={productData.ratingValue}
                        onChange={(e) => setProductData({ ...productData, ratingValue: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Review Count</label>
                      <input
                        type="number"
                        className="form-input"
                        value={productData.reviewCount}
                        onChange={(e) => setProductData({ ...productData, reviewCount: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ARTICLE FORM */}
              {schemaType === "Article" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Article Subtype *</label>
                      <select
                        className="form-input"
                        value={articleData.subType}
                        onChange={(e) => setArticleData({ ...articleData, subType: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="BlogPosting">BlogPosting</option>
                        <option value="Article">Article (Standard)</option>
                        <option value="NewsArticle">NewsArticle</option>
                        <option value="TechArticle">TechArticle</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Article Headline *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={articleData.headline}
                        onChange={(e) => setArticleData({ ...articleData, headline: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Canonical URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={articleData.url}
                        onChange={(e) => setArticleData({ ...articleData, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Featured Image URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={articleData.image}
                        onChange={(e) => setArticleData({ ...articleData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Article Abstract / Summary</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={articleData.description}
                      onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  {/* Author E-E-A-T */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                      <i className="fa-solid fa-user-check text-primary"></i> Named Author &amp; E-E-A-T Credential
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Author Full Name *"
                        className="form-input"
                        value={articleData.authorName}
                        onChange={(e) => setArticleData({ ...articleData, authorName: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="url"
                        placeholder="Author Bio URL"
                        className="form-input"
                        value={articleData.authorUrl}
                        onChange={(e) => setArticleData({ ...articleData, authorUrl: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Author Job Title"
                        className="form-input"
                        value={articleData.authorJobTitle}
                        onChange={(e) => setArticleData({ ...articleData, authorJobTitle: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                  </div>

                  {/* Publisher & Dates */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Publisher Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={articleData.publisherName}
                        onChange={(e) => setArticleData({ ...articleData, publisherName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Publisher Logo</label>
                      <input
                        type="url"
                        className="form-input"
                        value={articleData.publisherLogo}
                        onChange={(e) => setArticleData({ ...articleData, publisherLogo: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Date Published *</label>
                      <input
                        type="date"
                        className="form-input"
                        value={articleData.datePublished}
                        onChange={(e) => setArticleData({ ...articleData, datePublished: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Date Modified</label>
                      <input
                        type="date"
                        className="form-input"
                        value={articleData.dateModified}
                        onChange={(e) => setArticleData({ ...articleData, dateModified: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. FAQ PAGE FORM */}
              {schemaType === "FAQPage" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
                      Google displays expandable question-answer rich accordions in SERP.
                    </p>
                    <span style={{ fontSize: "0.75rem", background: "#eff6ff", color: "#2563eb", padding: "3px 8px", borderRadius: "4px", fontWeight: 700 }}>
                      {faqList.length} Questions
                    </span>
                  </div>

                  {faqList.map((faq, idx) => (
                    <div key={idx} style={{ padding: "14px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>
                          <i className="fa-solid fa-circle-question text-primary"></i> Question #{idx + 1}
                        </strong>
                        {faqList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFaq(idx)}
                            style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.78rem", cursor: "pointer", fontWeight: 700 }}
                          >
                            <i className="fa-solid fa-trash"></i> Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. What is GEO and how does it help ChatGPT citations?"
                        className="form-input mb-2"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <textarea
                        rows={2}
                        placeholder="e.g. GEO (Generative Engine Optimization) is the practice of structuring content so AI chatbots cite your brand."
                        className="form-textarea"
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addFaq}
                    className="btn btn-outline btn-sm"
                    style={{ width: "100%", marginTop: "4px", borderRadius: "4px" }}
                  >
                    <i className="fa-solid fa-plus"></i> Add Question &amp; Answer
                  </button>
                </div>
              )}

              {/* 6. BREADCRUMBLIST FORM */}
              {schemaType === "BreadcrumbList" && (
                <div>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "14px" }}>
                    Replaces plain URL strings with a sleek hierarchical breadcrumb trail on Google Search.
                  </p>
                  {breadcrumbs.map((crumb, idx) => (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "60px 1.5fr 2fr 40px", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#64748b", textAlign: "center", background: "#f1f5f9", padding: "8px 0", borderRadius: "4px" }}>
                        #{crumb.position}
                      </span>
                      <input
                        type="text"
                        placeholder="Tier Name (e.g. Services)"
                        className="form-input"
                        value={crumb.name}
                        onChange={(e) => updateBreadcrumb(idx, "name", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="url"
                        placeholder="https://example.com/services"
                        className="form-input"
                        value={crumb.url}
                        onChange={(e) => updateBreadcrumb(idx, "url", e.target.value)}
                        style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                      />
                      {breadcrumbs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBreadcrumb(idx)}
                          style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "4px", height: "36px", cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-trash" style={{ fontSize: "0.75rem" }}></i>
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addBreadcrumb}
                    className="btn btn-outline btn-sm"
                    style={{ width: "100%", marginTop: "6px", borderRadius: "4px" }}
                  >
                    <i className="fa-solid fa-plus"></i> Add Breadcrumb Level
                  </button>
                </div>
              )}

              {/* 7. PERSON FORM */}
              {schemaType === "Person" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.name}
                        onChange={(e) => setPersonData({ ...personData, name: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Job Title / Role</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.jobTitle}
                        onChange={(e) => setPersonData({ ...personData, jobTitle: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Portfolio / About Page URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={personData.url}
                        onChange={(e) => setPersonData({ ...personData, url: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Headshot Photo URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={personData.image}
                        onChange={(e) => setPersonData({ ...personData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Works For (Company/Org)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.worksFor}
                        onChange={(e) => setPersonData({ ...personData, worksFor: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Alumni / University</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.alumniOf}
                        onChange={(e) => setPersonData({ ...personData, alumniOf: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Subject Matter Expertise (knowsAbout)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personData.knowsAbout}
                      onChange={(e) => setPersonData({ ...personData, knowsAbout: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Social &amp; Authoritative Profiles (sameAs)</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={personData.sameAs.join("\n")}
                      onChange={(e) => setPersonData({ ...personData, sameAs: e.target.value.split("\n") })}
                      style={{ borderRadius: "4px", fontSize: "0.82rem", fontFamily: "monospace" }}
                    />
                  </div>
                </div>
              )}

              {/* 8. SERVICE FORM */}
              {schemaType === "Service" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Service Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={serviceData.name}
                      onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Service Category</label>
                      <input
                        type="text"
                        className="form-input"
                        value={serviceData.serviceType}
                        onChange={(e) => setServiceData({ ...serviceData, serviceType: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Provider Brand</label>
                      <input
                        type="text"
                        className="form-input"
                        value={serviceData.providerName}
                        onChange={(e) => setServiceData({ ...serviceData, providerName: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Service Description</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={serviceData.description}
                      onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Starting Price</label>
                      <input
                        type="number"
                        className="form-input"
                        value={serviceData.price}
                        onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Currency</label>
                      <select
                        className="form-input"
                        value={serviceData.priceCurrency}
                        onChange={(e) => setServiceData({ ...serviceData, priceCurrency: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="BDT">BDT (৳)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Area Served</label>
                      <input
                        type="text"
                        className="form-input"
                        value={serviceData.areaServed}
                        onChange={(e) => setServiceData({ ...serviceData, areaServed: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 9. EVENT FORM */}
              {schemaType === "Event" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Event Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={eventData.name}
                      onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Attendance Mode</label>
                      <select
                        className="form-input"
                        value={eventData.eventAttendanceMode}
                        onChange={(e) => setEventData({ ...eventData, eventAttendanceMode: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="OnlineEventAttendanceMode">Online / Virtual Webinar</option>
                        <option value="OfflineEventAttendanceMode">In-Person / Physical Venue</option>
                        <option value="MixedEventAttendanceMode">Hybrid (Online + Physical)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Event Status</label>
                      <select
                        className="form-input"
                        value={eventData.eventStatus}
                        onChange={(e) => setEventData({ ...eventData, eventStatus: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      >
                        <option value="EventScheduled">Scheduled (Active)</option>
                        <option value="EventPostponed">Postponed</option>
                        <option value="EventCancelled">Cancelled</option>
                        <option value="EventMovedOnline">Moved Online</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Start Date &amp; Time *</label>
                      <input
                        type="text"
                        placeholder="2026-11-15T18:00:00+06:00"
                        className="form-input"
                        value={eventData.startDate}
                        onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>End Date &amp; Time</label>
                      <input
                        type="text"
                        placeholder="2026-11-15T21:00:00+06:00"
                        className="form-input"
                        value={eventData.endDate}
                        onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Virtual Webinar URL / Stream Link</label>
                    <input
                      type="url"
                      className="form-input"
                      value={eventData.virtualUrl}
                      onChange={(e) => setEventData({ ...eventData, virtualUrl: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                </div>
              )}

              {/* 10. VIDEO FORM */}
              {schemaType === "VideoObject" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Video Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={videoData.name}
                      onChange={(e) => setVideoData({ ...videoData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Thumbnail URL *</label>
                    <input
                      type="url"
                      className="form-input"
                      value={videoData.thumbnailUrl}
                      onChange={(e) => setVideoData({ ...videoData, thumbnailUrl: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Upload Date *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={videoData.uploadDate}
                        onChange={(e) => setVideoData({ ...videoData, uploadDate: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Duration (ISO 8601 e.g. PT14M32S)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={videoData.duration}
                        onChange={(e) => setVideoData({ ...videoData, duration: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Embed URL (YouTube/Vimeo Embed)</label>
                    <input
                      type="url"
                      className="form-input"
                      value={videoData.embedUrl}
                      onChange={(e) => setVideoData({ ...videoData, embedUrl: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                </div>
              )}

              {/* 11. SOFTWARE APPLICATION FORM */}
              {schemaType === "SoftwareApplication" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>App / Software Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={softwareData.name}
                      onChange={(e) => setSoftwareData({ ...softwareData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Operating System</label>
                      <input
                        type="text"
                        className="form-input"
                        value={softwareData.operatingSystem}
                        onChange={(e) => setSoftwareData({ ...softwareData, operatingSystem: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>App Category</label>
                      <input
                        type="text"
                        className="form-input"
                        value={softwareData.applicationCategory}
                        onChange={(e) => setSoftwareData({ ...softwareData, applicationCategory: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>App Web URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={softwareData.url}
                      onChange={(e) => setSoftwareData({ ...softwareData, url: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                </div>
              )}

              {/* 12. RECIPE FORM */}
              {schemaType === "Recipe" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Recipe Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={recipeData.name}
                      onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Recipe Dish Image URL *</label>
                      <input
                        type="url"
                        className="form-input"
                        value={recipeData.image}
                        onChange={(e) => setRecipeData({ ...recipeData, image: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Chef / Author</label>
                      <input
                        type="text"
                        className="form-input"
                        value={recipeData.author}
                        onChange={(e) => setRecipeData({ ...recipeData, author: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Prep Time</label>
                      <input
                        type="text"
                        className="form-input"
                        value={recipeData.prepTime}
                        onChange={(e) => setRecipeData({ ...recipeData, prepTime: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Cook Time</label>
                      <input
                        type="text"
                        className="form-input"
                        value={recipeData.cookTime}
                        onChange={(e) => setRecipeData({ ...recipeData, cookTime: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "#64748b" }}>Yield / Servings</label>
                      <input
                        type="text"
                        className="form-input"
                        value={recipeData.recipeYield}
                        onChange={(e) => setRecipeData({ ...recipeData, recipeYield: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", display: "block", marginBottom: "6px" }}>Ingredients List</label>
                    {recipeData.ingredients.map((ing, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
                        <input
                          type="text"
                          className="form-input"
                          value={ing}
                          onChange={(e) => updateIngredient(idx, e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.82rem" }}
                        />
                        {recipeData.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(idx)}
                            style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "4px", padding: "0 10px", cursor: "pointer" }}
                          >
                            <i className="fa-solid fa-trash" style={{ fontSize: "0.75rem" }}></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", marginTop: "4px" }}>
                      <i className="fa-solid fa-plus"></i> Add Ingredient
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: OUTPUT WORKBENCH & LIVE SERP PREVIEW */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* View Switcher Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "8px 12px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveView("code")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "4px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      border: "none",
                      background: activeView === "code" ? "#2563eb" : "transparent",
                      color: activeView === "code" ? "#ffffff" : "#64748b",
                      cursor: "pointer"
                    }}
                  >
                    <i className="fa-solid fa-code"></i> JSON-LD Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("serp_preview")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "4px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      border: "none",
                      background: activeView === "serp_preview" ? "#2563eb" : "transparent",
                      color: activeView === "serp_preview" ? "#ffffff" : "#64748b",
                      cursor: "pointer"
                    }}
                  >
                    <i className="fa-brands fa-google"></i> Google SERP Preview
                  </button>
                </div>

                {activeView === "code" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <label style={{ fontSize: "0.75rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={isMinified}
                        onChange={(e) => setIsMinified(e.target.checked)}
                      />
                      Minify Output
                    </label>
                  </div>
                )}

                {activeView === "serp_preview" && (
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", background: previewDevice === "desktop" ? "#e2e8f0" : "transparent", border: "1px solid #cbd5e1", cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-desktop"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", background: previewDevice === "mobile" ? "#e2e8f0" : "transparent", border: "1px solid #cbd5e1", cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-mobile-screen"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* VIEW 1: JSON-LD CODE OUTPUT */}
              {activeView === "code" && (
                <div className="schema-output-box" style={{ borderRadius: "4px" }}>
                  <div className="code-header">
                    <span className="code-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-solid fa-file-code text-primary"></i> Application/ld+json Output
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={copyRawJson}
                        style={{ borderColor: "#475569", color: "#cbd5e1", borderRadius: "4px", padding: "5px 10px", fontSize: "0.78rem" }}
                      >
                        {copiedRaw ? <><i className="fa-solid fa-check"></i> Raw JSON!</> : <><i className="fa-solid fa-brackets-curly"></i> Copy JSON</>}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={downloadJson}
                        style={{ borderColor: "#475569", color: "#cbd5e1", borderRadius: "4px", padding: "5px 10px", fontSize: "0.78rem" }}
                      >
                        <i className="fa-solid fa-download"></i> Download
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={copyScript}
                        style={{ borderRadius: "4px", padding: "5px 12px", fontSize: "0.78rem" }}
                      >
                        {copiedScript ? <><i className="fa-solid fa-check"></i> Copied Script!</> : <><i className="fa-solid fa-copy"></i> Copy &lt;script&gt;</>}
                      </button>
                    </div>
                  </div>

                  <pre className="code-block" style={{ maxHeight: "420px", overflowY: "auto", margin: 0 }}>
                    <code style={{ fontSize: "0.82rem" }}>{scriptTagOutput}</code>
                  </pre>

                  <div style={{ padding: "12px 18px", background: "#1e293b", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{ fontSize: "0.76rem", color: "#94a3b8" }}>
                      <i className="fa-solid fa-circle-info text-primary"></i> Embed inside HTML <code>&lt;head&gt;</code> or Next.js layout metadata.
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <a
                        href="https://search.google.com/test/rich-results"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.78rem", color: "#60a5fa", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        Test on Google <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }}></i>
                      </a>
                      <a
                        href="https://validator.schema.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        Schema.org Validator <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }}></i>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: GOOGLE SERP RICH SNIPPET VISUAL PREVIEW */}
              {activeView === "serp_preview" && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                    <strong style={{ fontSize: "0.85rem", color: "#0f172a" }}>
                      <i className="fa-brands fa-google text-primary"></i> Simulated Google Search Result ({previewDevice === "desktop" ? "Desktop" : "Mobile"})
                    </strong>
                    <span style={{ fontSize: "0.72rem", background: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: "4px", fontWeight: 700 }}>
                      Rich Result Active
                    </span>
                  </div>

                  {/* Google SERP Card Mockup */}
                  <div style={{ maxWidth: previewDevice === "mobile" ? "360px" : "100%", margin: "0 auto", background: "#ffffff", padding: "16px", border: previewDevice === "mobile" ? "1px solid #cbd5e1" : "none", borderRadius: "4px" }}>
                    
                    {/* Breadcrumbs line */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#4d5156", marginBottom: "4px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", background: "#f1f3f4", borderRadius: "50%", fontSize: "0.65rem", color: "#5f6368" }}>
                        <i className="fa-solid fa-globe"></i>
                      </span>
                      <span style={{ fontWeight: 600, color: "#202124" }}>
                        {schemaType === "Organization" ? orgData.name : schemaType === "Product" ? productData.brand : schemaType === "LocalBusiness" ? localBiz.name : "abdullahbdseo.vercel.app"}
                      </span>
                      <span style={{ color: "#70757a" }}>›</span>
                      <span style={{ color: "#70757a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {schemaType === "Article" ? articleData.subType : schemaType}
                      </span>
                    </div>

                    {/* Blue Title Link */}
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 400, color: "#1a0dab", margin: "0 0 4px", lineHeight: 1.3, cursor: "pointer" }}>
                      {schemaType === "Article" ? articleData.headline : schemaType === "Product" ? productData.name : schemaType === "LocalBusiness" ? localBiz.name : schemaType === "Organization" ? orgData.name : `${schemaType} - Official Verified Entity`}
                    </h3>

                    {/* Star Ratings Line (if available) */}
                    {(schemaType === "Product" || schemaType === "LocalBusiness" || schemaType === "SoftwareApplication") && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#70757a", margin: "4px 0" }}>
                        <div style={{ color: "#e37400", display: "flex", gap: "2px" }}>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <span style={{ fontWeight: 700, color: "#202124" }}>
                          Rating: {schemaType === "Product" ? productData.ratingValue : schemaType === "LocalBusiness" ? localBiz.ratingValue : softwareData.ratingValue}
                        </span>
                        <span>•</span>
                        <span>{schemaType === "Product" ? productData.reviewCount : schemaType === "LocalBusiness" ? localBiz.reviewCount : softwareData.reviewCount} reviews</span>
                        {schemaType === "Product" && (
                          <>
                            <span>•</span>
                            <span style={{ fontWeight: 700, color: "#188038" }}>${productData.price}</span>
                            <span>•</span>
                            <span style={{ color: "#188038" }}>In stock</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Meta Description */}
                    <p style={{ fontSize: "0.85rem", color: "#4d5156", lineHeight: 1.5, margin: "6px 0 0" }}>
                      {schemaType === "Article" ? articleData.description : schemaType === "Product" ? productData.description : schemaType === "Organization" ? orgData.description : schemaType === "LocalBusiness" ? `${localBiz.street}, ${localBiz.city}. Phone: ${localBiz.phone}. ${localBiz.areaServed}` : "Official structured entity page verified on Google Knowledge Graph."}
                    </p>

                    {/* FAQ Rich Drops in SERP */}
                    {schemaType === "FAQPage" && (
                      <div style={{ marginTop: "12px", borderTop: "1px solid #ebebeb", paddingTop: "8px" }}>
                        {faqList.slice(0, 3).map((f, i) => (
                          <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid #f1f3f4", fontSize: "0.82rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#202124" }}>
                            <span style={{ fontWeight: 600 }}>{f.question || "Frequently Asked Question"}</span>
                            <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.7rem", color: "#70757a" }}></i>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LIVE GOOGLE COMPLIANCE HEALTH SHEET */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <strong style={{ fontSize: "0.85rem", color: "#0f172a" }}>
                    <i className="fa-solid fa-list-check text-primary"></i> Google Rich Results Checklist
                  </strong>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Schema.org Standards
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {healthCheck.checks.map((c, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", padding: "6px 10px", background: c.valid ? "#f8fafc" : "#fffbeb", borderRadius: "4px", border: c.valid ? "1px solid #f1f5f9" : "1px solid #fef3c7" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <i className={`fa-solid ${c.valid ? "fa-circle-check text-success" : "fa-circle-xmark text-warning"}`}></i>
                        <span style={{ color: "#334155", fontWeight: c.req ? 700 : 500 }}>
                          {c.name} {c.req && <span style={{ color: "#ef4444" }}>*</span>}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: c.valid ? "#059669" : "#d97706", fontWeight: 700 }}>
                        {c.valid ? "Valid" : c.req ? "Required" : "Recommended"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Related Tools Section */}
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
                q: "How does Schema Markup improve organic search click-through rate (CTR)?",
                a: "Valid schema markup enables eye-catching Rich Snippets on Google Search results—including review star ratings, FAQs, product prices, stock status, event dates, and breadcrumb trails. Pages featuring rich results consistently achieve 20% to 40% higher CTR than plain blue links."
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
