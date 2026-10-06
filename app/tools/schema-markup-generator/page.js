"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

const SCHEMA_MODULES = [
  { id: "website", label: "WebSite & Sitelinks", icon: "fa-globe", badge: "Core", desc: "Site entity & SearchAction template" },
  { id: "organization", label: "Organization & Brand", icon: "fa-building", badge: "Knowledge Graph", desc: "Entity NAP, logo, sameAs Wikidata" },
  { id: "localBusiness", label: "Local Business / NAP", icon: "fa-shop", badge: "Google Maps", desc: "Geo coordinates, hours, review stars" },
  { id: "person", label: "Founder / E-E-A-T Author", icon: "fa-user-tie", badge: "Author Trust", desc: "Credentials, bio, knowsAbout skills" },
  { id: "services", label: "Services Catalog", icon: "fa-briefcase", badge: "Service Graph", desc: "Service offerings and pricing" },
  { id: "products", label: "Products & Offers", icon: "fa-box-open", badge: "Shopping", desc: "E-com items, SKUs, and stock" },
  { id: "faqs", label: "FAQ Page Accordion", icon: "fa-circle-question", badge: "SERP Drops", desc: "Interactive expandable Q&A pairs" },
  { id: "breadcrumbs", label: "Breadcrumbs Trail", icon: "fa-folder-tree", badge: "SERP Trail", desc: "Hierarchical site navigation levels" },
  { id: "webpage", label: "WebPage & Article", icon: "fa-newspaper", badge: "Content", desc: "Page headline, image, article data" }
];

export default function SchemaMarkupGenerator() {
  const [activeTab, setActiveTab] = useState("code"); // 'code', 'serp_preview', 'graph_tree'
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [toastMessage, setToastMessage] = useState("");
  const [activeSection, setActiveSection] = useState("website");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  // MODULE INCLUSION TOGGLES (Checking a module adds its data to the unified master schema)
  const [enabledModules, setEnabledModules] = useState({
    website: true,
    organization: true,
    localBusiness: true,
    person: true,
    services: true,
    products: true,
    faqs: true,
    breadcrumbs: true,
    webpage: true
  });

  const toggleModule = (id) => {
    setEnabledModules((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveSection(id);
  };

  const selectAll = () => {
    setEnabledModules({
      website: true,
      organization: true,
      localBusiness: true,
      person: true,
      services: true,
      products: true,
      faqs: true,
      breadcrumbs: true,
      webpage: true
    });
    showToast("Selected all schema sections!");
  };

  const deselectAll = () => {
    setEnabledModules({
      website: true,
      organization: true,
      localBusiness: false,
      person: false,
      services: false,
      products: false,
      faqs: false,
      breadcrumbs: false,
      webpage: false
    });
    showToast("Minimal Core selected!");
  };

  // Section Refs for smooth scrolling
  const sectionRefs = {
    website: useRef(null),
    organization: useRef(null),
    localBusiness: useRef(null),
    person: useRef(null),
    services: useRef(null),
    products: useRef(null),
    faqs: useRef(null),
    breadcrumbs: useRef(null),
    webpage: useRef(null)
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    if (sectionRefs[id]?.current) {
      sectionRefs[id].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. WEBSITE DATA
  const [websiteData, setWebsiteData] = useState({
    name: "Abdullah Saleh - Best SEO Expert in Bangladesh",
    alternateName: "AbdullahBD SEO & Growth Solutions",
    url: "https://abdullahbdseo.vercel.app",
    searchTarget: "https://abdullahbdseo.vercel.app/blog?q={search_term_string}",
    description: "Enterprise technical SEO consultancy, Generative Engine Optimization (GEO), and high-intent organic growth frameworks.",
    inLanguage: "en-US"
  });

  // 2. ORGANIZATION DATA
  const [orgData, setOrgData] = useState({
    subType: "Corporation",
    name: "Abdullah SEO & Growth Agency",
    legalName: "Abdullah Organic Growth Solutions Ltd.",
    alternateName: "AbdullahBD SEO",
    url: "https://abdullahbdseo.vercel.app",
    logo: "https://abdullahbdseo.vercel.app/images/logo.png",
    description: "Enterprise technical SEO consultancy, Generative Engine Optimization (GEO), and high-intent backlink strategies.",
    foundingDate: "2019-01-15",
    founderName: "Abdullah Saleh",
    email: "abdullahbd.seo@gmail.com",
    phone: "+880 1670-769816",
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

  // 3. LOCAL BUSINESS DATA
  const [localBizData, setLocalBizData] = useState({
    subType: "ProfessionalService",
    name: "Abdullah Saleh - Premier SEO Clinic & Office",
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
    areaServed: "Bangladesh, United States, United Kingdom, Australia, Canada, UAE",
    opensTime: "09:00",
    closesTime: "18:00",
    ratingValue: "5.0",
    reviewCount: "48"
  });

  // 4. PERSON DATA
  const [personData, setPersonData] = useState({
    name: "Abdullah Saleh",
    jobTitle: "Lead SEO Strategist & AI Search Architect",
    url: "https://abdullahbdseo.vercel.app/about",
    image: "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
    description: "Experienced Organic Business Growth Specialist and Technical SEO Expert helping global businesses dominate Google Search and Generative AI engines.",
    email: "abdullahbd.seo@gmail.com",
    telephone: "+880 1670-769816",
    alumniOf: "University of Dhaka",
    knowsAbout: "Technical SEO, Core Web Vitals, GEO (Generative Engine Optimization), AI Search Citations, Entity Schema, Python SEO Automation",
    sameAs: [
      "https://linkedin.com/in/abdullah-saleh-seo",
      "https://twitter.com/abdullahsaleh_seo",
      "https://github.com/abdullahbdseo",
      "https://facebook.com/abdullahbdseo"
    ]
  });

  // 5. SERVICES DATA
  const [servicesList, setServicesList] = useState([
    {
      name: "Generative Engine Optimization (GEO) & AI Citation Service",
      serviceType: "AI Search Optimization",
      description: "Reverse-engineer AI search models and optimize brand entity authority to win prominent citations in Google AI Overviews, ChatGPT Search, and Perplexity AI.",
      url: "https://abdullahbdseo.vercel.app/services/geo-service-in-bangladesh",
      price: "750.00",
      currency: "USD",
      areaServed: "Global"
    },
    {
      name: "Enterprise Technical SEO & Core Web Vitals Audit",
      serviceType: "Technical SEO Auditing",
      description: "Comprehensive 150-point technical audit eliminating indexation barriers, JavaScript rendering blockers, and crawl budget bottlenecks.",
      url: "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh",
      price: "499.00",
      currency: "USD",
      areaServed: "Global"
    }
  ]);

  // 6. PRODUCTS DATA
  const [productsList, setProductsList] = useState([
    {
      name: "Complete Technical SEO & AI Audit Report Package",
      image: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg",
      description: "In-depth diagnostic audit delivered in 7 business days with prioritized developer task sheet and 1-on-1 strategy walkthrough call.",
      sku: "SEO-AUDIT-2026",
      gtin13: "8801234567890",
      price: "499.00",
      currency: "USD",
      availability: "InStock",
      ratingValue: "4.9",
      reviewCount: "124"
    }
  ]);

  // 7. FAQS DATA
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

  // 8. BREADCRUMBS DATA
  const [breadcrumbsList, setBreadcrumbsList] = useState([
    { position: 1, name: "Home", url: "https://abdullahbdseo.vercel.app" },
    { position: 2, name: "Services", url: "https://abdullahbdseo.vercel.app/services" },
    { position: 3, name: "Technical SEO Service", url: "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh" }
  ]);

  // 9. WEBPAGE & ARTICLE DATA
  const [webpageData, setWebpageData] = useState({
    title: "Best SEO Expert in Bangladesh & Organic Business Growth Specialist",
    url: "https://abdullahbdseo.vercel.app",
    description: "Top-rated SEO expert in Bangladesh with 6+ years experience. Drive organic traffic, #1 Google rankings, and sales with data-driven Technical & Local SEO.",
    primaryImage: "https://abdullahbdseo.vercel.app/images/blog_chatgpt_search_opt.jpg",
    datePublished: "2024-01-01",
    dateModified: "2026-10-06",
    isArticle: true,
    articleSection: "SEO & Growth",
    keywords: "SEO Expert Bangladesh, GEO Optimization, Technical SEO, AI SEO, Abdullah Saleh"
  });

  // Dynamic Item Handlers
  const addService = () => setServicesList([...servicesList, { name: "", serviceType: "", description: "", url: "", price: "", currency: "USD", areaServed: "Global" }]);
  const updateService = (idx, field, val) => {
    const updated = [...servicesList];
    updated[idx][field] = val;
    setServicesList(updated);
  };
  const removeService = (idx) => setServicesList(servicesList.filter((_, i) => i !== idx));

  const addProduct = () => setProductsList([...productsList, { name: "", image: "", description: "", sku: "", gtin13: "", price: "", currency: "USD", availability: "InStock", ratingValue: "5.0", reviewCount: "10" }]);
  const updateProduct = (idx, field, val) => {
    const updated = [...productsList];
    updated[idx][field] = val;
    setProductsList(updated);
  };
  const removeProduct = (idx) => setProductsList(productsList.filter((_, i) => i !== idx));

  const addFaq = () => setFaqList([...faqList, { question: "", answer: "" }]);
  const updateFaq = (idx, field, val) => {
    const updated = [...faqList];
    updated[idx][field] = val;
    setFaqList(updated);
  };
  const removeFaq = (idx) => setFaqList(faqList.filter((_, i) => i !== idx));

  const addBreadcrumb = () => setBreadcrumbsList([...breadcrumbsList, { position: breadcrumbsList.length + 1, name: "", url: "https://" }]);
  const updateBreadcrumb = (idx, field, val) => {
    const updated = [...breadcrumbsList];
    updated[idx][field] = val;
    setBreadcrumbsList(updated);
  };
  const removeBreadcrumb = (idx) => {
    setBreadcrumbsList(breadcrumbsList.filter((_, i) => i !== idx).map((b, i) => ({ ...b, position: i + 1 })));
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

  // GENERATE COMPLETE UNIFIED MASTER @GRAPH JSON-LD
  const completeUnifiedSchema = useMemo(() => {
    const domain = websiteData.url.replace(/\/+$/, "");
    const orgId = `${domain}/#organization`;
    const websiteId = `${domain}/#website`;
    const authorId = `${domain}/#/schema/person/author`;
    const webpageId = `${webpageData.url}/#webpage`;
    const primaryImageId = `${webpageData.url}/#primaryimage`;
    const breadcrumbId = `${webpageData.url}/#breadcrumb`;

    const graph = [];

    // 1. WebSite Entity
    if (enabledModules.website && websiteData.url) {
      graph.push({
        "@type": "WebSite",
        "@id": websiteId,
        "url": domain,
        "name": websiteData.name,
        "alternateName": websiteData.alternateName || undefined,
        "description": websiteData.description || undefined,
        "inLanguage": websiteData.inLanguage || "en-US",
        "publisher": enabledModules.organization ? { "@id": orgId } : undefined,
        "potentialAction": websiteData.searchTarget ? [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": websiteData.searchTarget
            },
            "query-input": "required name=search_term_string"
          }
        ] : undefined
      });
    }

    // 2. Organization Entity
    if (enabledModules.organization && orgData.name) {
      graph.push({
        "@type": orgData.subType || "Organization",
        "@id": orgId,
        "name": orgData.name,
        "legalName": orgData.legalName || undefined,
        "alternateName": orgData.alternateName || undefined,
        "url": domain,
        "logo": orgData.logo ? {
          "@type": "ImageObject",
          "@id": `${domain}/#logo`,
          "url": orgData.logo,
          "caption": orgData.name
        } : undefined,
        "image": orgData.logo ? { "@id": `${domain}/#logo` } : undefined,
        "description": orgData.description || undefined,
        "foundingDate": orgData.foundingDate || undefined,
        "founder": (enabledModules.person && personData.name) ? { "@id": authorId } : (orgData.founderName ? { "@type": "Person", "name": orgData.founderName } : undefined),
        "contactPoint": (orgData.phone || orgData.email) ? {
          "@type": "ContactPoint",
          "telephone": orgData.phone || undefined,
          "contactType": "customer service",
          "email": orgData.email || undefined,
          "availableLanguage": ["English", "Bengali"]
        } : undefined,
        "address": (orgData.street || orgData.city) ? {
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

    // 3. Local Business Entity
    if (enabledModules.localBusiness && localBizData.name) {
      graph.push({
        "@type": localBizData.subType || "LocalBusiness",
        "@id": `${domain}/#localbusiness`,
        "name": localBizData.name,
        "image": localBizData.image ? [localBizData.image] : undefined,
        "url": domain,
        "telephone": localBizData.phone,
        "email": localBizData.email || undefined,
        "priceRange": localBizData.priceRange || "$$",
        "parentOrganization": enabledModules.organization ? { "@id": orgId } : undefined,
        "areaServed": localBizData.areaServed ? localBizData.areaServed.split(",").map(s => s.trim()) : undefined,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localBizData.street || undefined,
          "addressLocality": localBizData.city || undefined,
          "addressRegion": localBizData.region || undefined,
          "postalCode": localBizData.postalCode || undefined,
          "addressCountry": localBizData.country || undefined
        },
        "geo": (localBizData.latitude && localBizData.longitude) ? {
          "@type": "GeoCoordinates",
          "latitude": parseFloat(localBizData.latitude) || localBizData.latitude,
          "longitude": parseFloat(localBizData.longitude) || localBizData.longitude
        } : undefined,
        "hasMap": localBizData.hasMap || undefined,
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": localBizData.opensTime || "09:00",
            "closes": localBizData.closesTime || "18:00"
          }
        ],
        "aggregateRating": (localBizData.ratingValue && localBizData.reviewCount) ? {
          "@type": "AggregateRating",
          "ratingValue": localBizData.ratingValue,
          "reviewCount": localBizData.reviewCount,
          "bestRating": "5",
          "worstRating": "1"
        } : undefined
      });
    }

    // 4. Person / Author E-E-A-T Entity
    if (enabledModules.person && personData.name) {
      graph.push({
        "@type": "Person",
        "@id": authorId,
        "name": personData.name,
        "jobTitle": personData.jobTitle || undefined,
        "worksFor": enabledModules.organization ? { "@id": orgId } : undefined,
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

    // 5. Services Catalog
    if (enabledModules.services && servicesList.length > 0) {
      servicesList.filter(s => s.name && s.name.trim() !== "").forEach((service, idx) => {
        graph.push({
          "@type": "Service",
          "@id": `${service.url || domain}/#service-${idx + 1}`,
          "name": service.name,
          "serviceType": service.serviceType || undefined,
          "description": service.description || undefined,
          "provider": enabledModules.organization ? { "@id": orgId } : undefined,
          "url": service.url || undefined,
          "areaServed": service.areaServed ? { "@type": "Country", "name": service.areaServed } : undefined,
          "offers": service.price ? {
            "@type": "Offer",
            "price": service.price,
            "priceCurrency": service.currency || "USD"
          } : undefined
        });
      });
    }

    // 6. Products Catalog
    if (enabledModules.products && productsList.length > 0) {
      productsList.filter(p => p.name && p.name.trim() !== "").forEach((prod, idx) => {
        graph.push({
          "@type": "Product",
          "@id": `${domain}/#product-${idx + 1}`,
          "name": prod.name,
          "image": prod.image ? [prod.image] : undefined,
          "description": prod.description || undefined,
          "brand": enabledModules.organization ? { "@id": orgId } : undefined,
          "sku": prod.sku || undefined,
          "gtin13": prod.gtin13 || undefined,
          "offers": {
            "@type": "Offer",
            "url": domain,
            "price": prod.price || "0.00",
            "priceCurrency": prod.currency || "USD",
            "availability": `https://schema.org/${prod.availability || "InStock"}`,
            "seller": enabledModules.organization ? { "@id": orgId } : undefined
          },
          "aggregateRating": (prod.ratingValue && prod.reviewCount) ? {
            "@type": "AggregateRating",
            "ratingValue": prod.ratingValue,
            "reviewCount": prod.reviewCount,
            "bestRating": "5"
          } : undefined
        });
      });
    }

    // 7. Breadcrumbs
    if (enabledModules.breadcrumbs && breadcrumbsList.length > 0) {
      graph.push({
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        "itemListElement": breadcrumbsList.filter(b => b.name && b.name.trim() !== "").map((b, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": b.name.trim(),
          "item": b.url ? b.url.trim() : undefined
        }))
      });
    }

    // 8. FAQPage
    if (enabledModules.faqs && faqList.length > 0) {
      const validFaqs = faqList.filter(f => f.question && f.question.trim() !== "");
      if (validFaqs.length > 0) {
        graph.push({
          "@type": "FAQPage",
          "@id": `${webpageData.url}/#faq`,
          "isPartOf": enabledModules.webpage ? { "@id": webpageId } : undefined,
          "mainEntity": validFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question.trim(),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer.trim()
            }
          }))
        });
      }
    }

    // 9. WebPage & Article
    if (enabledModules.webpage && webpageData.url) {
      if (webpageData.primaryImage) {
        graph.push({
          "@type": "ImageObject",
          "@id": primaryImageId,
          "url": webpageData.primaryImage,
          "caption": webpageData.title
        });
      }

      graph.push({
        "@type": "WebPage",
        "@id": webpageId,
        "url": webpageData.url,
        "name": webpageData.title,
        "description": webpageData.description || undefined,
        "isPartOf": enabledModules.website ? { "@id": websiteId } : undefined,
        "about": enabledModules.organization ? { "@id": orgId } : undefined,
        "primaryImageOfPage": webpageData.primaryImage ? { "@id": primaryImageId } : undefined,
        "breadcrumb": enabledModules.breadcrumbs ? { "@id": breadcrumbId } : undefined
      });

      if (webpageData.isArticle) {
        graph.push({
          "@type": "BlogPosting",
          "@id": `${webpageData.url}/#article`,
          "isPartOf": { "@id": webpageId },
          "headline": webpageData.title,
          "description": webpageData.description || undefined,
          "datePublished": webpageData.datePublished || undefined,
          "dateModified": webpageData.dateModified || webpageData.datePublished || undefined,
          "mainEntityOfPage": webpageId,
          "articleSection": webpageData.articleSection || undefined,
          "keywords": webpageData.keywords || undefined,
          "author": enabledModules.person ? { "@id": authorId } : undefined,
          "publisher": enabledModules.organization ? { "@id": orgId } : undefined,
          "image": webpageData.primaryImage ? { "@id": primaryImageId } : undefined
        });
      }
    }

    return cleanObject({
      "@context": "https://schema.org",
      "@graph": graph
    });
  }, [
    enabledModules, websiteData, orgData, localBizData, personData,
    servicesList, productsList, faqList, breadcrumbsList, webpageData
  ]);

  const jsonString = isMinified
    ? JSON.stringify(completeUnifiedSchema)
    : JSON.stringify(completeUnifiedSchema, null, 2);

  const scriptTagOutput = isMinified
    ? `<script type="application/ld+json">${jsonString}</script>`
    : `<script type="application/ld+json">\n${jsonString}\n</script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(scriptTagOutput);
    setCopiedScript(true);
    showToast("Master <script> snippet copied!");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyRawJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedRaw(true);
    showToast("Master JSON-LD object copied!");
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([scriptTagOutput], { type: "text/html" });
    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "complete-website-master-schema.html";
    a.click();
    URL.revokeObjectURL(fileUrl);
    showToast("Downloaded complete-website-master-schema.html");
  };

  const activeModuleCount = Object.values(enabledModules).filter(Boolean).length;

  return (
    <div className="tool-single-page" style={{ background: "#f8fafc" }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#0f172a", color: "#ffffff", padding: "10px 18px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, boxShadow: "0 10px 25px rgba(0,0,0,0.25)", zIndex: 9999, display: "flex", alignItems: "center", gap: "8px", border: "1px solid #334155" }}>
          <i className="fa-solid fa-circle-check text-success"></i> {toastMessage}
        </div>
      )}

      {/* HEADER HERO */}
      <section className="page-header-section" style={{ paddingBottom: "20px", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2" style={{ borderRadius: "4px" }}>
            <i className="fa-solid fa-diagram-project"></i> Complete Website Master Schema Generator
          </div>
          <h1 className="page-title">All-in-One Master Schema Markup Generator</h1>
          <p className="page-subtitle max-w-3xl mx-auto">
            Select the options you need from the left sidebar — all inputs stay on one unified page, and generate <strong>one complete connected master schema</strong> for your entire website.
          </p>
        </div>
      </section>

      {/* WORKSPACE */}
      <section className="section-padding" style={{ paddingTop: "20px" }}>
        <div className="container" style={{ maxWidth: "1440px" }}>

          {/* THREE-COLUMN WORKSPACE: LEFT SELECTOR, MIDDLE FORMS, RIGHT COMPACT OUTPUT */}
          <div style={{ display: "grid", gridTemplateColumns: "240px 1.25fr 0.85fr", gap: "18px", alignItems: "start" }}>

            {/* 1. LEFT SIDEBAR: INTERACTIVE SCHEMA SELECTOR WITH CHECKBOXES */}
            <div style={{ position: "sticky", top: "18px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>
                  <i className="fa-solid fa-list-check text-primary"></i> Include Modules ({activeModuleCount}/9):
                </strong>
              </div>

              {/* Select / Deselect All */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                <button type="button" onClick={selectAll} style={{ flex: 1, padding: "4px 0", fontSize: "0.7rem", fontWeight: 700, background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", cursor: "pointer" }}>
                  Select All
                </button>
                <button type="button" onClick={deselectAll} style={{ flex: 1, padding: "4px 0", fontSize: "0.7rem", fontWeight: 700, background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "4px", cursor: "pointer" }}>
                  Core Only
                </button>
              </div>

              {/* Module List with Checkboxes and Click to Jump */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {SCHEMA_MODULES.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 8px",
                      borderRadius: "4px",
                      background: enabledModules[item.id] ? (activeSection === item.id ? "#eff6ff" : "#f8fafc") : "transparent",
                      border: activeSection === item.id ? "1px solid #2563eb" : (enabledModules[item.id] ? "1px solid #e2e8f0" : "1px solid transparent"),
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <label style={{ display: "flex", alignItems: "center", gap: "7px", cursor: "pointer", flexGrow: 1 }}>
                      <input
                        type="checkbox"
                        checked={enabledModules[item.id]}
                        onChange={() => toggleModule(item.id)}
                        style={{ cursor: "pointer", width: "14px", height: "14px" }}
                      />
                      <span
                        onClick={() => scrollToSection(item.id)}
                        style={{ fontSize: "0.78rem", fontWeight: enabledModules[item.id] ? 700 : 500, color: enabledModules[item.id] ? "#0f172a" : "#94a3b8" }}
                      >
                        <i className={`fa-solid ${item.icon}`} style={{ width: "14px", marginRight: "4px", color: enabledModules[item.id] ? "#2563eb" : "#cbd5e1" }}></i>
                        {item.label}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      title="Jump to form section"
                      style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "2px 4px", fontSize: "0.7rem" }}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. MIDDLE COLUMN: ALL FORM SECTIONS TOGETHER ON ONE PAGE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* 1. WEBSITE SECTION */}
              <div ref={sectionRefs.website} style={{ background: "#ffffff", border: enabledModules.website ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>1. WebSite &amp; Sitelinks Searchbox</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.website ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.website} onChange={() => toggleModule("website")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.website && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>WebSite Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={websiteData.name}
                          onChange={(e) => setWebsiteData({ ...websiteData, name: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Canonical Root URL *</label>
                        <input
                          type="url"
                          className="form-input"
                          value={websiteData.url}
                          onChange={(e) => setWebsiteData({ ...websiteData, url: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Sitelinks Search Query Template</label>
                      <input
                        type="text"
                        className="form-input"
                        value={websiteData.searchTarget}
                        onChange={(e) => setWebsiteData({ ...websiteData, searchTarget: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. ORGANIZATION SECTION */}
              <div ref={sectionRefs.organization} style={{ background: "#ffffff", border: enabledModules.organization ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-building"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>2. Organization &amp; Brand Entity</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.organization ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.organization} onChange={() => toggleModule("organization")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.organization && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Brand Display Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={orgData.name}
                          onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Brand Logo Image URL *</label>
                        <input
                          type="url"
                          className="form-input"
                          value={orgData.logo}
                          onChange={(e) => setOrgData({ ...orgData, logo: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="Founder Name"
                        className="form-input"
                        value={orgData.founderName}
                        onChange={(e) => setOrgData({ ...orgData, founderName: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "6px 8px" }}
                      />
                      <input
                        type="text"
                        placeholder="Support Phone"
                        className="form-input"
                        value={orgData.phone}
                        onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "6px 8px" }}
                      />
                      <input
                        type="email"
                        placeholder="Support Email"
                        className="form-input"
                        value={orgData.email}
                        onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "6px 8px" }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Wikidata &amp; Social Authority Profiles (sameAs)</label>
                      <textarea
                        rows={2}
                        className="form-textarea"
                        value={orgData.sameAs.join("\n")}
                        onChange={(e) => setOrgData({ ...orgData, sameAs: e.target.value.split("\n") })}
                        style={{ borderRadius: "4px", fontSize: "0.75rem", fontFamily: "monospace" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3. LOCAL BUSINESS SECTION */}
              <div ref={sectionRefs.localBusiness} style={{ background: "#ffffff", border: enabledModules.localBusiness ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-shop"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>3. Local Business &amp; Office NAP</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.localBusiness ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.localBusiness} onChange={() => toggleModule("localBusiness")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.localBusiness && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Business Name *"
                        className="form-input"
                        value={localBizData.name}
                        onChange={(e) => setLocalBizData({ ...localBizData, name: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      />
                      <input
                        type="text"
                        placeholder="Phone *"
                        className="form-input"
                        value={localBizData.phone}
                        onChange={(e) => setLocalBizData({ ...localBizData, phone: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="form-input"
                        value={localBizData.street}
                        onChange={(e) => setLocalBizData({ ...localBizData, street: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="form-input"
                        value={localBizData.city}
                        onChange={(e) => setLocalBizData({ ...localBizData, city: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="form-input"
                        value={localBizData.postalCode}
                        onChange={(e) => setLocalBizData({ ...localBizData, postalCode: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        className="form-input"
                        value={localBizData.country}
                        onChange={(e) => setLocalBizData({ ...localBizData, country: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="Lat (23.7937)"
                        className="form-input"
                        value={localBizData.latitude}
                        onChange={(e) => setLocalBizData({ ...localBizData, latitude: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Long (90.4043)"
                        className="form-input"
                        value={localBizData.longitude}
                        onChange={(e) => setLocalBizData({ ...localBizData, longitude: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Rating (5.0 / 48 reviews)"
                        className="form-input"
                        value={`${localBizData.ratingValue} (${localBizData.reviewCount} reviews)`}
                        readOnly
                        style={{ borderRadius: "4px", fontSize: "0.78rem", background: "#f8fafc" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. PERSON SECTION */}
              <div ref={sectionRefs.person} style={{ background: "#ffffff", border: enabledModules.person ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>4. Founder / Author E-E-A-T</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.person ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.person} onChange={() => toggleModule("person")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.person && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Author Full Name *"
                      className="form-input"
                      value={personData.name}
                      onChange={(e) => setPersonData({ ...personData, name: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="form-input"
                      value={personData.jobTitle}
                      onChange={(e) => setPersonData({ ...personData, jobTitle: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                    />
                    <input
                      type="url"
                      placeholder="Bio Page URL"
                      className="form-input"
                      value={personData.url}
                      onChange={(e) => setPersonData({ ...personData, url: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                    />
                    <input
                      type="url"
                      placeholder="Headshot Photo URL"
                      className="form-input"
                      value={personData.image}
                      onChange={(e) => setPersonData({ ...personData, image: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                    />
                  </div>
                )}
              </div>

              {/* 5. SERVICES SECTION */}
              <div ref={sectionRefs.services} style={{ background: "#ffffff", border: enabledModules.services ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-briefcase"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>5. Services Catalog ({servicesList.length})</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.services ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.services} onChange={() => toggleModule("services")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.services && (
                  <div>
                    {servicesList.map((srv, idx) => (
                      <div key={idx} style={{ padding: "10px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "8px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 24px", gap: "6px", alignItems: "center" }}>
                          <input
                            type="text"
                            placeholder="Service Name *"
                            className="form-input"
                            value={srv.name}
                            onChange={(e) => updateService(idx, "name", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="text"
                            placeholder="Category"
                            className="form-input"
                            value={srv.serviceType}
                            onChange={(e) => updateService(idx, "serviceType", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="text"
                            placeholder="Price ($750.00)"
                            className="form-input"
                            value={srv.price}
                            onChange={(e) => updateService(idx, "price", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          {servicesList.length > 1 && (
                            <button type="button" onClick={() => removeService(idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: 0 }}>
                              <i className="fa-solid fa-trash" style={{ fontSize: "0.7rem" }}></i>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addService} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", fontSize: "0.75rem", padding: "5px" }}>
                      <i className="fa-solid fa-plus"></i> Add Service
                    </button>
                  </div>
                )}
              </div>

              {/* 6. PRODUCTS SECTION */}
              <div ref={sectionRefs.products} style={{ background: "#ffffff", border: enabledModules.products ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-box-open"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>6. Products &amp; Offers</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.products ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.products} onChange={() => toggleModule("products")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.products && (
                  <div>
                    {productsList.map((prod, idx) => (
                      <div key={idx} style={{ padding: "10px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "8px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "6px" }}>
                          <input
                            type="text"
                            placeholder="Product Title *"
                            className="form-input"
                            value={prod.name}
                            onChange={(e) => updateProduct(idx, "name", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="text"
                            placeholder="Price (499.00)"
                            className="form-input"
                            value={prod.price}
                            onChange={(e) => updateProduct(idx, "price", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="text"
                            placeholder="SKU Code"
                            className="form-input"
                            value={prod.sku}
                            onChange={(e) => updateProduct(idx, "sku", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addProduct} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", fontSize: "0.75rem", padding: "5px" }}>
                      <i className="fa-solid fa-plus"></i> Add Product
                    </button>
                  </div>
                )}
              </div>

              {/* 7. FAQS SECTION */}
              <div ref={sectionRefs.faqs} style={{ background: "#ffffff", border: enabledModules.faqs ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-circle-question"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>7. Frequently Asked Questions</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.faqs ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.faqs} onChange={() => toggleModule("faqs")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.faqs && (
                  <div>
                    {faqList.map((faq, idx) => (
                      <div key={idx} style={{ padding: "8px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                          <strong style={{ fontSize: "0.75rem" }}>Q#{idx + 1}</strong>
                          {faqList.length > 1 && (
                            <button type="button" onClick={() => removeFaq(idx)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.7rem", cursor: "pointer" }}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Question"
                          className="form-input mb-1"
                          value={faq.question}
                          onChange={(e) => updateFaq(idx, "question", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "4px 6px" }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Answer"
                          className="form-textarea"
                          value={faq.answer}
                          onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "4px 6px" }}
                        />
                      </div>
                    ))}
                    <button type="button" onClick={addFaq} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", fontSize: "0.75rem", padding: "5px" }}>
                      <i className="fa-solid fa-plus"></i> Add Question
                    </button>
                  </div>
                )}
              </div>

              {/* 8. BREADCRUMBS SECTION */}
              <div ref={sectionRefs.breadcrumbs} style={{ background: "#ffffff", border: enabledModules.breadcrumbs ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-folder-tree"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>8. Breadcrumbs Hierarchy</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.breadcrumbs ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.breadcrumbs} onChange={() => toggleModule("breadcrumbs")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.breadcrumbs && (
                  <div>
                    {breadcrumbsList.map((crumb, idx) => (
                      <div key={idx} style={{ display: "grid", gridTemplateColumns: "35px 1.5fr 2fr 24px", gap: "5px", alignItems: "center", marginBottom: "5px" }}>
                        <span style={{ fontSize: "0.72rem", fontWeight: 800, textAlign: "center", background: "#f1f5f9", padding: "5px 0", borderRadius: "4px" }}>#{crumb.position}</span>
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-input"
                          value={crumb.name}
                          onChange={(e) => updateBreadcrumb(idx, "name", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "4px 6px" }}
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          className="form-input"
                          value={crumb.url}
                          onChange={(e) => updateBreadcrumb(idx, "url", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "4px 6px" }}
                        />
                        {breadcrumbsList.length > 1 && (
                          <button type="button" onClick={() => removeBreadcrumb(idx)} style={{ background: "none", border: "none", color: "#b91c1c", cursor: "pointer" }}>
                            <i className="fa-solid fa-trash" style={{ fontSize: "0.65rem" }}></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addBreadcrumb} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", fontSize: "0.75rem", padding: "5px", marginTop: "3px" }}>
                      <i className="fa-solid fa-plus"></i> Add Level
                    </button>
                  </div>
                )}
              </div>

              {/* 9. WEBPAGE & ARTICLE SECTION */}
              <div ref={sectionRefs.webpage} style={{ background: "#ffffff", border: enabledModules.webpage ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>
                      <i className="fa-solid fa-newspaper"></i>
                    </div>
                    <strong style={{ fontSize: "0.92rem", color: "#0f172a" }}>9. WebPage &amp; Article Content</strong>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", fontWeight: 700, color: enabledModules.webpage ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.webpage} onChange={() => toggleModule("webpage")} />
                    Include in Schema
                  </label>
                </div>

                {enabledModules.webpage && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Page Headline / Title *"
                      className="form-input"
                      value={webpageData.title}
                      onChange={(e) => setWebpageData({ ...webpageData, title: e.target.value })}
                      style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "6px" }}>
                      <input
                        type="url"
                        placeholder="Canonical Page URL *"
                        className="form-input"
                        value={webpageData.url}
                        onChange={(e) => setWebpageData({ ...webpageData, url: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                      />
                      <input
                        type="url"
                        placeholder="Featured Image URL"
                        className="form-input"
                        value={webpageData.primaryImage}
                        onChange={(e) => setWebpageData({ ...webpageData, primaryImage: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* 3. RIGHT COLUMN: COMPACT LIVE CODE OUTPUT & SERP PREVIEW */}
            <div style={{ position: "sticky", top: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* View Switcher Tabs */}
              <div style={{ display: "flex", gap: "3px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "3px" }}>
                {[
                  { id: "code", label: "Master JSON-LD", icon: "fa-code" },
                  { id: "serp_preview", label: "SERP Preview", icon: "fa-eye" },
                  { id: "graph_tree", label: "Entity Tree", icon: "fa-diagram-project" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1,
                      padding: "5px 6px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
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

              {/* COMPACT CODE OUTPUT BOX */}
              {activeTab === "code" && (
                <div className="schema-output-box" style={{ borderRadius: "4px", boxShadow: "0 2px 10px rgba(15,23,42,0.06)" }}>
                  <div className="code-header" style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="code-title" style={{ fontSize: "0.75rem" }}>
                      <i className="fa-solid fa-file-code text-primary"></i> Master @graph ({activeModuleCount} Nodes)
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <label style={{ fontSize: "0.7rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                        <input type="checkbox" checked={isMinified} onChange={(e) => setIsMinified(e.target.checked)} /> Minify
                      </label>
                      <button
                        type="button"
                        onClick={copyRawJson}
                        style={{ padding: "3px 6px", fontSize: "0.7rem", fontWeight: 700, background: "#334155", color: "#e2e8f0", border: "1px solid #475569", borderRadius: "4px", cursor: "pointer" }}
                      >
                        {copiedRaw ? "✓" : "Copy JSON"}
                      </button>
                      <button
                        type="button"
                        onClick={copyScript}
                        style={{ padding: "3px 8px", fontSize: "0.7rem", fontWeight: 700, background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        {copiedScript ? "✓ Copied!" : "Copy <script>"}
                      </button>
                    </div>
                  </div>

                  <pre className="code-block" style={{ maxHeight: "380px", overflowY: "auto", margin: 0, padding: "10px 12px" }}>
                    <code style={{ fontSize: "0.75rem", lineHeight: 1.45 }}>{scriptTagOutput}</code>
                  </pre>

                  <div style={{ padding: "8px 12px", background: "#1e293b", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                      Size: ~{(scriptTagOutput.length / 1024).toFixed(2)} KB
                    </span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button type="button" onClick={downloadJson} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "0.72rem", cursor: "pointer", padding: 0 }}>
                        <i className="fa-solid fa-download"></i> Save .html
                      </button>
                      <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", color: "#60a5fa", fontWeight: 700 }}>
                        Google Test <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.62rem" }}></i>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* SERP PREVIEW BOX */}
              {activeTab === "serp_preview" && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", paddingBottom: "6px", borderBottom: "1px solid #f1f5f9" }}>
                    <strong style={{ fontSize: "0.78rem", color: "#0f172a" }}>Google SERP Simulation</strong>
                    <div style={{ display: "flex", gap: "3px" }}>
                      <button type="button" onClick={() => setPreviewDevice("desktop")} style={{ padding: "2px 5px", borderRadius: "4px", fontSize: "0.68rem", background: previewDevice === "desktop" ? "#e2e8f0" : "transparent", border: "1px solid #cbd5e1" }}><i className="fa-solid fa-desktop"></i></button>
                      <button type="button" onClick={() => setPreviewDevice("mobile")} style={{ padding: "2px 5px", borderRadius: "4px", fontSize: "0.68rem", background: previewDevice === "mobile" ? "#e2e8f0" : "transparent", border: "1px solid #cbd5e1" }}><i className="fa-solid fa-mobile-screen"></i></button>
                    </div>
                  </div>

                  <div style={{ padding: "8px", background: "#ffffff", border: previewDevice === "mobile" ? "1px solid #cbd5e1" : "none", borderRadius: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: "#4d5156", marginBottom: "2px" }}>
                      <span style={{ width: "14px", height: "14px", background: "#f1f3f4", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem" }}><i className="fa-solid fa-globe"></i></span>
                      <span style={{ fontWeight: 600, color: "#202124" }}>{orgData.name || "abdullahbdseo.vercel.app"}</span>
                      {enabledModules.breadcrumbs && <><span>›</span><span>Services</span></>}
                    </div>

                    <h4 style={{ fontSize: "0.95rem", fontWeight: 400, color: "#1a0dab", margin: "0 0 3px", lineHeight: 1.25 }}>
                      {webpageData.title || websiteData.name}
                    </h4>

                    {enabledModules.localBusiness && (
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#70757a", margin: "2px 0" }}>
                        <div style={{ color: "#e37400", display: "flex", gap: "1px" }}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                        <span style={{ fontWeight: 700, color: "#202124" }}>5.0 (48)</span>
                        <span>•</span>
                        <span style={{ color: "#188038", fontWeight: 700 }}>Open</span>
                      </div>
                    )}

                    <p style={{ fontSize: "0.75rem", color: "#4d5156", lineHeight: 1.4, margin: "3px 0 0" }}>
                      {webpageData.description || orgData.description}
                    </p>
                  </div>
                </div>
              )}

              {/* ENTITY TREE BOX */}
              {activeTab === "graph_tree" && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <strong style={{ fontSize: "0.78rem", color: "#0f172a", display: "block", marginBottom: "8px" }}>
                    Connected Master Graph Nodes ({activeModuleCount} Active)
                  </strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.72rem" }}>
                    {enabledModules.website && <div style={{ padding: "4px 6px", background: "#eff6ff", borderRadius: "4px", color: "#1e40af" }}>🌐 <strong>WebSite:</strong> <code>/#website</code></div>}
                    {enabledModules.organization && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>🏢 <strong>Organization:</strong> <code>/#organization</code></div>}
                    {enabledModules.person && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>👤 <strong>Author / Founder:</strong> <code>/#/schema/person/author</code></div>}
                    {enabledModules.localBusiness && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>📍 <strong>Local Office:</strong> <code>/#localbusiness</code></div>}
                    {enabledModules.services && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>💼 <strong>Services:</strong> <code>/#service-1</code>, <code>/#service-2</code></div>}
                    {enabledModules.products && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>🛍️ <strong>Products:</strong> <code>/#product-1</code></div>}
                    {enabledModules.faqs && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>❓ <strong>FAQPage:</strong> <code>/#faq</code></div>}
                    {enabledModules.breadcrumbs && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>🧭 <strong>Breadcrumbs:</strong> <code>/#breadcrumb</code></div>}
                    {enabledModules.webpage && <div style={{ padding: "4px 6px", background: "#f8fafc", borderRadius: "4px" }}>📄 <strong>WebPage:</strong> <code>/#webpage</code></div>}
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
                q: "What is the All-in-One Master @graph Schema approach and why is it superior?",
                a: "Instead of injecting multiple fragmented, isolated scripts across your site, the @graph master array links your WebSite, Organization, Author, Services, Products, FAQs, and Breadcrumbs together into one single connected Knowledge Graph. Search engines and AI models (ChatGPT, Gemini) can instantly resolve all entity relationships with 100% accuracy."
              },
              {
                q: "Can I selectively include or exclude certain modules from the complete schema?",
                a: "Yes! Every module has an 'Include in Master Graph' toggle checkbox on the left and on the section header. If your site does not sell products or does not have physical local business hours, simply uncheck those modules and the generator will clean and adjust the master @graph code in real time."
              },
              {
                q: "Where should I paste the generated master schema code?",
                a: "Paste the generated <script type=\"application/ld+json\"> snippet into the <head> section of your website layout. In Next.js, add it to your root layout.js or page metadata using dangerouslySetInnerHTML or next/script."
              },
              {
                q: "How do I validate the master schema for Google Rich Results?",
                a: "Click 'Google Rich Results' or 'Schema.org' in the code output box to test the payload directly on Google's official validator with zero errors."
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
