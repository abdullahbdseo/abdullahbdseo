"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

export default function SchemaMarkupGenerator() {
  const [activeTab, setActiveTab] = useState("code"); // 'code', 'serp_preview', 'graph_tree', 'health'
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  // MODULE INCLUSION TOGGLES (User can enable/disable any module into the single complete master graph)
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

  const toggleModule = (key) => {
    setEnabledModules((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const scrollToSection = (key) => {
    if (sectionRefs[key]?.current) {
      sectionRefs[key].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. WEBSITE & SITELINKS SEARCH STATE
  const [websiteData, setWebsiteData] = useState({
    name: "Abdullah Saleh - Best SEO Expert in Bangladesh",
    alternateName: "AbdullahBD SEO & Growth Solutions",
    url: "https://abdullahbdseo.vercel.app",
    searchTarget: "https://abdullahbdseo.vercel.app/blog?q={search_term_string}",
    description: "Enterprise technical SEO consultancy, Generative Engine Optimization (GEO), and high-intent organic growth frameworks.",
    inLanguage: "en-US"
  });

  // 2. ORGANIZATION & KNOWLEDGE GRAPH STATE
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
      "https://www.wikidata.org/wiki/Q000000",
      "https://crunchbase.com/organization/abdullah-seo"
    ]
  });

  // 3. LOCAL BUSINESS & NAP STATE
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

  // 4. PERSON / AUTHOR E-E-A-T STATE
  const [personData, setPersonData] = useState({
    name: "Abdullah Saleh",
    jobTitle: "Lead SEO Strategist & AI Search Architect",
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

  // 5. CORE SERVICES STATE
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

  // 6. PRODUCTS & PRICING PACKAGES STATE
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

  // 7. FAQS STATE
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

  // 8. BREADCRUMBS STATE
  const [breadcrumbsList, setBreadcrumbsList] = useState([
    { position: 1, name: "Home", url: "https://abdullahbdseo.vercel.app" },
    { position: 2, name: "Services", url: "https://abdullahbdseo.vercel.app/services" },
    { position: 3, name: "Technical SEO Service", url: "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh" }
  ]);

  // 9. CURRENT WEBPAGE & ARTICLE STATE
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
  const addService = () => {
    setServicesList([...servicesList, { name: "", serviceType: "", description: "", url: "", price: "", currency: "USD", areaServed: "Global" }]);
  };
  const updateService = (idx, field, val) => {
    const updated = [...servicesList];
    updated[idx][field] = val;
    setServicesList(updated);
  };
  const removeService = (idx) => setServicesList(servicesList.filter((_, i) => i !== idx));

  const addProduct = () => {
    setProductsList([...productsList, { name: "", image: "", description: "", sku: "", gtin13: "", price: "", currency: "USD", availability: "InStock", ratingValue: "5.0", reviewCount: "10" }]);
  };
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

  const addBreadcrumb = () => {
    setBreadcrumbsList([...breadcrumbsList, { position: breadcrumbsList.length + 1, name: "", url: "https://" }]);
  };
  const updateBreadcrumb = (idx, field, val) => {
    const updated = [...breadcrumbsList];
    updated[idx][field] = val;
    setBreadcrumbsList(updated);
  };
  const removeBreadcrumb = (idx) => {
    setBreadcrumbsList(breadcrumbsList.filter((_, i) => i !== idx).map((b, i) => ({ ...b, position: i + 1 })));
  };

  // Helper to clean empty/undefined keys recursively
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

  // Preset Configurations
  const applyPreset = (presetName) => {
    if (presetName === "agency") {
      setEnabledModules({ website: true, organization: true, localBusiness: true, person: true, services: true, products: false, faqs: true, breadcrumbs: true, webpage: true });
      showToast("Loaded 'Full Agency / Professional Business' Preset!");
    } else if (presetName === "ecommerce") {
      setEnabledModules({ website: true, organization: true, localBusiness: false, person: false, services: false, products: true, faqs: true, breadcrumbs: true, webpage: true });
      showToast("Loaded 'E-Commerce Online Store' Preset!");
    } else if (presetName === "localClinic") {
      setEnabledModules({ website: true, organization: true, localBusiness: true, person: true, services: true, products: false, faqs: true, breadcrumbs: true, webpage: true });
      showToast("Loaded 'Local Clinic / Practice' Preset!");
    } else if (presetName === "editorial") {
      setEnabledModules({ website: true, organization: true, localBusiness: false, person: true, services: false, products: false, faqs: true, breadcrumbs: true, webpage: true });
      showToast("Loaded 'News & Blog Publisher' Preset!");
    }
  };

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

    // 6. Products Catalog & Offers
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

    // 7. BreadcrumbList
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

    // 8. FAQPage Entity
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

    // 9. WebPage & Article / BlogPosting Entity
    if (enabledModules.webpage && webpageData.url) {
      // Primary image object
      if (webpageData.primaryImage) {
        graph.push({
          "@type": "ImageObject",
          "@id": primaryImageId,
          "url": webpageData.primaryImage,
          "caption": webpageData.title
        });
      }

      // WebPage Node
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

      // If marked as Article / Blog post
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
    showToast("Master <script> code copied! Paste in HTML <head>");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyRawJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedRaw(true);
    showToast("Master JSON-LD copied to clipboard!");
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
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#0f172a", color: "#ffffff", padding: "12px 20px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, boxShadow: "0 10px 25px rgba(0,0,0,0.25)", zIndex: 9999, display: "flex", alignItems: "center", gap: "10px", border: "1px solid #334155" }}>
          <i className="fa-solid fa-circle-check text-success"></i> {toastMessage}
        </div>
      )}

      {/* HEADER HERO */}
      <section className="page-header-section" style={{ paddingBottom: "22px", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link">
            <i className="fa-solid fa-arrow-left"></i> All SEO Tools
          </Link>
          <div className="sub-badge mt-2" style={{ borderRadius: "4px" }}>
            <i className="fa-solid fa-diagram-project"></i> Complete Website Knowledge Graph Builder
          </div>
          <h1 className="page-title">All-in-One Master Schema Markup Generator</h1>
          <p className="page-subtitle max-w-3xl mx-auto">
            Build ONE complete, interconnected JSON-LD schema for your entire website. Connect WebSite, Organization, Author, Local Business, Services, Products, FAQs, and Breadcrumbs in a single master <code>@graph</code> snippet.
          </p>

          {/* Quick Presets Bar */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop: "18px" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>
              <i className="fa-solid fa-wand-magic-sparkles text-primary"></i> 1-Click Complete Presets:
            </span>
            <button type="button" onClick={() => applyPreset("agency")} style={{ padding: "6px 12px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
              🏢 SEO &amp; Digital Agency
            </button>
            <button type="button" onClick={() => applyPreset("ecommerce")} style={{ padding: "6px 12px", background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
              🛒 E-Commerce Store
            </button>
            <button type="button" onClick={() => applyPreset("localClinic")} style={{ padding: "6px 12px", background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
              📍 Local Practice / Clinic
            </button>
            <button type="button" onClick={() => applyPreset("editorial")} style={{ padding: "6px 12px", background: "#faf5ff", color: "#7e22ce", border: "1px solid #e9d5ff", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
              📰 Blog &amp; Publisher
            </button>
          </div>
        </div>
      </section>

      {/* MAIN WORKSPACE */}
      <section className="section-padding" style={{ paddingTop: "20px" }}>
        <div className="container" style={{ maxWidth: "1420px" }}>

          {/* QUICK MODULE JUMP BAR */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a", marginRight: "4px" }}>
                <i className="fa-solid fa-layer-group text-primary"></i> Master Schema Modules ({activeModuleCount}/9 Active):
              </span>
              {[
                { key: "website", label: "WebSite", icon: "fa-globe" },
                { key: "organization", label: "Organization", icon: "fa-building" },
                { key: "localBusiness", label: "Local Business", icon: "fa-shop" },
                { key: "person", label: "Author / Person", icon: "fa-user-tie" },
                { key: "services", label: "Services", icon: "fa-briefcase" },
                { key: "products", label: "Products", icon: "fa-box-open" },
                { key: "faqs", label: "FAQ Page", icon: "fa-circle-question" },
                { key: "breadcrumbs", label: "Breadcrumbs", icon: "fa-folder-tree" },
                { key: "webpage", label: "Page & Article", icon: "fa-newspaper" }
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => scrollToSection(m.key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    border: enabledModules[m.key] ? "1px solid #2563eb" : "1px solid #cbd5e1",
                    background: enabledModules[m.key] ? "#eff6ff" : "#f1f5f9",
                    color: enabledModules[m.key] ? "#2563eb" : "#64748b",
                    cursor: "pointer"
                  }}
                >
                  <i className={`fa-solid ${m.icon}`} style={{ fontSize: "0.7rem" }}></i>
                  {m.label}
                  <span style={{ fontSize: "0.65rem", padding: "1px 4px", borderRadius: "4px", background: enabledModules[m.key] ? "#2563eb" : "#94a3b8", color: "#ffffff" }}>
                    {enabledModules[m.key] ? "ON" : "OFF"}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={copyRawJson}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: "4px", fontSize: "0.76rem", padding: "5px 10px" }}
              >
                <i className="fa-solid fa-brackets-curly"></i> Copy JSON
              </button>
              <button
                type="button"
                onClick={copyScript}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: "4px", fontSize: "0.76rem", padding: "5px 12px" }}
              >
                {copiedScript ? <><i className="fa-solid fa-check"></i> Copied!</> : <><i className="fa-solid fa-copy"></i> Copy Full &lt;script&gt;</>}
              </button>
            </div>
          </div>

          {/* 2-COLUMN MASTER WORKBENCH */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", alignItems: "start" }}>

            {/* LEFT COLUMN: ALL-IN-ONE SINGLE PAGE FORM SECTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* 1. WEBSITE & SEARCHACTION SECTION */}
              <div ref={sectionRefs.website} style={{ background: "#ffffff", border: enabledModules.website ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        1. WebSite &amp; Sitelinks Searchbox
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Root domain entity with Google SearchAction template</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.website ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.website} onChange={() => toggleModule("website")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.website && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>WebSite Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={websiteData.name}
                          onChange={(e) => setWebsiteData({ ...websiteData, name: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Canonical Root URL *</label>
                        <input
                          type="url"
                          className="form-input"
                          value={websiteData.url}
                          onChange={(e) => setWebsiteData({ ...websiteData, url: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Sitelinks Search Query URL Template</label>
                      <input
                        type="text"
                        className="form-input"
                        value={websiteData.searchTarget}
                        onChange={(e) => setWebsiteData({ ...websiteData, searchTarget: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. ORGANIZATION & KNOWLEDGE GRAPH SECTION */}
              <div ref={sectionRefs.organization} style={{ background: "#ffffff", border: enabledModules.organization ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-building"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        2. Organization &amp; Brand Knowledge Graph
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Entity name, logo, contact points, and Wikidata / Social sameAs</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.organization ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.organization} onChange={() => toggleModule("organization")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.organization && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Organization Brand Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={orgData.name}
                          onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Brand Logo Image URL *</label>
                        <input
                          type="url"
                          className="form-input"
                          value={orgData.logo}
                          onChange={(e) => setOrgData({ ...orgData, logo: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
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
                        placeholder="Phone Number"
                        className="form-input"
                        value={orgData.phone}
                        onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="email"
                        placeholder="Support Email"
                        className="form-input"
                        value={orgData.email}
                        onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Wikidata &amp; Social Authority Profiles (sameAs)</label>
                      <textarea
                        rows={2}
                        className="form-textarea"
                        value={orgData.sameAs.join("\n")}
                        onChange={(e) => setOrgData({ ...orgData, sameAs: e.target.value.split("\n") })}
                        style={{ borderRadius: "4px", fontSize: "0.78rem", fontFamily: "monospace" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3. LOCAL BUSINESS & PHYSICAL NAP */}
              <div ref={sectionRefs.localBusiness} style={{ background: "#ffffff", border: enabledModules.localBusiness ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-shop"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        3. Local Business &amp; Physical Office NAP
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Geo coordinates, street address, opening hours, review stars</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.localBusiness ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.localBusiness} onChange={() => toggleModule("localBusiness")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.localBusiness && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Business Display Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.name}
                          onChange={(e) => setLocalBizData({ ...localBizData, name: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Phone Number *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.phone}
                          onChange={(e) => setLocalBizData({ ...localBizData, phone: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "6px" }}>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="form-input"
                        value={localBizData.street}
                        onChange={(e) => setLocalBizData({ ...localBizData, street: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="form-input"
                        value={localBizData.city}
                        onChange={(e) => setLocalBizData({ ...localBizData, city: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="form-input"
                        value={localBizData.postalCode}
                        onChange={(e) => setLocalBizData({ ...localBizData, postalCode: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Country (BD)"
                        className="form-input"
                        value={localBizData.country}
                        onChange={(e) => setLocalBizData({ ...localBizData, country: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Latitude (23.7937)"
                        className="form-input"
                        value={localBizData.latitude}
                        onChange={(e) => setLocalBizData({ ...localBizData, latitude: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Longitude (90.4043)"
                        className="form-input"
                        value={localBizData.longitude}
                        onChange={(e) => setLocalBizData({ ...localBizData, longitude: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Rating (5.0 / 48 reviews)"
                        className="form-input"
                        value={`${localBizData.ratingValue} (${localBizData.reviewCount} reviews)`}
                        readOnly
                        style={{ borderRadius: "4px", fontSize: "0.8rem", background: "#f8fafc" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. PERSON / FOUNDER E-E-A-T SECTION */}
              <div ref={sectionRefs.person} style={{ background: "#ffffff", border: enabledModules.person ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        4. Founder &amp; Author E-E-A-T Profile
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Expert credentials, job role, alumni, and knowsAbout skills</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.person ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.person} onChange={() => toggleModule("person")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.person && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Author Full Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={personData.name}
                          onChange={(e) => setPersonData({ ...personData, name: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Job Title / Professional Role</label>
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
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Bio / Portfolio URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={personData.url}
                          onChange={(e) => setPersonData({ ...personData, url: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Photo URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={personData.image}
                          onChange={(e) => setPersonData({ ...personData, image: e.target.value })}
                          style={{ borderRadius: "4px" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. SERVICES CATALOG SECTION */}
              <div ref={sectionRefs.services} style={{ background: "#ffffff", border: enabledModules.services ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-briefcase"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        5. Core Services Catalog ({servicesList.length} Offerings)
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Direct service packages linked to your Organization provider node</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.services ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.services} onChange={() => toggleModule("services")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.services && (
                  <div>
                    {servicesList.map((srv, idx) => (
                      <div key={idx} style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <strong style={{ fontSize: "0.8rem", color: "#0f172a" }}>Service #{idx + 1}</strong>
                          {servicesList.length > 1 && (
                            <button type="button" onClick={() => removeService(idx)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.75rem", cursor: "pointer" }}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "8px", marginBottom: "6px" }}>
                          <input
                            type="text"
                            placeholder="Service Name *"
                            className="form-input"
                            value={srv.name}
                            onChange={(e) => updateService(idx, "name", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                          />
                          <input
                            type="text"
                            placeholder="Service Category"
                            className="form-input"
                            value={srv.serviceType}
                            onChange={(e) => updateService(idx, "serviceType", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                          />
                          <input
                            type="text"
                            placeholder="Price ($750.00)"
                            className="form-input"
                            value={srv.price}
                            onChange={(e) => updateService(idx, "price", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                          />
                        </div>
                        <input
                          type="url"
                          placeholder="Service Landing Page URL"
                          className="form-input"
                          value={srv.url}
                          onChange={(e) => updateService(idx, "url", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                        />
                      </div>
                    ))}
                    <button type="button" onClick={addService} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px" }}>
                      <i className="fa-solid fa-plus"></i> Add Another Service Offering
                    </button>
                  </div>
                )}
              </div>

              {/* 6. PRODUCTS & PRICING PACKAGES SECTION */}
              <div ref={sectionRefs.products} style={{ background: "#ffffff", border: enabledModules.products ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-box-open"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        6. Products &amp; Pricing Packages
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Google Shopping eligible offers, SKUs, and aggregate reviews</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.products ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.products} onChange={() => toggleModule("products")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.products && (
                  <div>
                    {productsList.map((prod, idx) => (
                      <div key={idx} style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <strong style={{ fontSize: "0.8rem", color: "#0f172a" }}>Product #{idx + 1}</strong>
                          {productsList.length > 1 && (
                            <button type="button" onClick={() => removeProduct(idx)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.75rem", cursor: "pointer" }}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "8px", marginBottom: "6px" }}>
                          <input
                            type="text"
                            placeholder="Product Title *"
                            className="form-input"
                            value={prod.name}
                            onChange={(e) => updateProduct(idx, "name", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                          />
                          <input
                            type="text"
                            placeholder="Price (499.00)"
                            className="form-input"
                            value={prod.price}
                            onChange={(e) => updateProduct(idx, "price", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                          />
                          <input
                            type="text"
                            placeholder="SKU"
                            className="form-input"
                            value={prod.sku}
                            onChange={(e) => updateProduct(idx, "sku", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                          />
                        </div>
                        <input
                          type="url"
                          placeholder="Product Image URL"
                          className="form-input"
                          value={prod.image}
                          onChange={(e) => updateProduct(idx, "image", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                        />
                      </div>
                    ))}
                    <button type="button" onClick={addProduct} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px" }}>
                      <i className="fa-solid fa-plus"></i> Add Product
                    </button>
                  </div>
                )}
              </div>

              {/* 7. FAQS SECTION */}
              <div ref={sectionRefs.faqs} style={{ background: "#ffffff", border: enabledModules.faqs ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-circle-question"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        7. Frequently Asked Questions (FAQPage)
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Expandable dropdown accordions in Google SERP results</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.faqs ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.faqs} onChange={() => toggleModule("faqs")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.faqs && (
                  <div>
                    {faqList.map((faq, idx) => (
                      <div key={idx} style={{ padding: "10px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#f8fafc", marginBottom: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <strong style={{ fontSize: "0.78rem", color: "#0f172a" }}>Q#{idx + 1}</strong>
                          {faqList.length > 1 && (
                            <button type="button" onClick={() => removeFaq(idx)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.72rem", cursor: "pointer" }}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Question *"
                          className="form-input mb-1"
                          value={faq.question}
                          onChange={(e) => updateFaq(idx, "question", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Answer text *"
                          className="form-textarea"
                          value={faq.answer}
                          onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                        />
                      </div>
                    ))}
                    <button type="button" onClick={addFaq} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px" }}>
                      <i className="fa-solid fa-plus"></i> Add Question &amp; Answer
                    </button>
                  </div>
                )}
              </div>

              {/* 8. BREADCRUMBS SECTION */}
              <div ref={sectionRefs.breadcrumbs} style={{ background: "#ffffff", border: enabledModules.breadcrumbs ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-folder-tree"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        8. Breadcrumb Navigation Trail
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Hierarchical navigation levels replacing ugly URLs on SERPs</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.breadcrumbs ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.breadcrumbs} onChange={() => toggleModule("breadcrumbs")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.breadcrumbs && (
                  <div>
                    {breadcrumbsList.map((crumb, idx) => (
                      <div key={idx} style={{ display: "grid", gridTemplateColumns: "40px 1.5fr 2fr 30px", gap: "6px", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, textAlign: "center", background: "#f1f5f9", padding: "6px 0", borderRadius: "4px" }}>#{crumb.position}</span>
                        <input
                          type="text"
                          placeholder="Tier Name"
                          className="form-input"
                          value={crumb.name}
                          onChange={(e) => updateBreadcrumb(idx, "name", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          className="form-input"
                          value={crumb.url}
                          onChange={(e) => updateBreadcrumb(idx, "url", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem" }}
                        />
                        {breadcrumbsList.length > 1 && (
                          <button type="button" onClick={() => removeBreadcrumb(idx)} style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "4px", height: "30px", cursor: "pointer" }}>
                            <i className="fa-solid fa-trash" style={{ fontSize: "0.65rem" }}></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addBreadcrumb} className="btn btn-outline btn-sm" style={{ width: "100%", borderRadius: "4px", marginTop: "4px" }}>
                      <i className="fa-solid fa-plus"></i> Add Breadcrumb Level
                    </button>
                  </div>
                )}
              </div>

              {/* 9. WEBPAGE & BLOGPOSTING SECTION */}
              <div ref={sectionRefs.webpage} style={{ background: "#ffffff", border: enabledModules.webpage ? "1px solid #2563eb" : "1px solid #e2e8f0", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-newspaper"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        9. Current WebPage &amp; BlogPosting Content
                      </h3>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Article headline, featured image, and author linking</span>
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, color: enabledModules.webpage ? "#2563eb" : "#64748b", cursor: "pointer" }}>
                    <input type="checkbox" checked={enabledModules.webpage} onChange={() => toggleModule("webpage")} />
                    Include in Master Graph
                  </label>
                </div>

                {enabledModules.webpage && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.78rem" }}>Page Title / Headline *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={webpageData.title}
                        onChange={(e) => setWebpageData({ ...webpageData, title: e.target.value })}
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "8px" }}>
                      <input
                        type="url"
                        placeholder="Page Canonical URL *"
                        className="form-input"
                        value={webpageData.url}
                        onChange={(e) => setWebpageData({ ...webpageData, url: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                      <input
                        type="url"
                        placeholder="Primary Featured Image URL"
                        className="form-input"
                        value={webpageData.primaryImage}
                        onChange={(e) => setWebpageData({ ...webpageData, primaryImage: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem" }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: LIVE WORKBENCH (OUTPUT CODE & PREVIEWS) */}
            <div style={{ position: "sticky", top: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* View Switcher Tabs */}
              <div style={{ display: "flex", gap: "4px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "4px" }}>
                {[
                  { id: "code", label: "Master JSON-LD", icon: "fa-code" },
                  { id: "serp_preview", label: "SERP Preview", icon: "fa-eye" },
                  { id: "graph_tree", label: "Entity Graph", icon: "fa-diagram-project" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1,
                      padding: "7px 10px",
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

              {/* TAB 1: MASTER JSON-LD CODE OUTPUT */}
              {activeTab === "code" && (
                <div className="schema-output-box" style={{ borderRadius: "4px" }}>
                  <div className="code-header" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="code-title" style={{ fontSize: "0.8rem" }}>
                        <i className="fa-solid fa-file-code text-primary"></i> Master @graph Array ({activeModuleCount} Nodes)
                      </span>
                    </div>
                    <label style={{ fontSize: "0.72rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                      <input type="checkbox" checked={isMinified} onChange={(e) => setIsMinified(e.target.checked)} /> Minify
                    </label>
                  </div>

                  <pre className="code-block" style={{ maxHeight: "540px", overflowY: "auto", margin: 0, padding: "14px" }}>
                    <code style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{scriptTagOutput}</code>
                  </pre>

                  <div style={{ padding: "10px 14px", background: "#1e293b", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                      Payload: ~{(scriptTagOutput.length / 1024).toFixed(2)} KB
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: 700 }}>
                        Google Rich Results <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.68rem" }}></i>
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
                      <span style={{ fontWeight: 600, color: "#202124" }}>{orgData.name || "abdullahbdseo.vercel.app"}</span>
                      {enabledModules.breadcrumbs && (
                        <>
                          <span>›</span>
                          <span>Services</span>
                        </>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: 400, color: "#1a0dab", margin: "0 0 4px", lineHeight: 1.3 }}>
                      {webpageData.title || websiteData.name}
                    </h3>

                    {enabledModules.localBusiness && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#70757a", margin: "4px 0" }}>
                        <div style={{ color: "#e37400", display: "flex", gap: "2px" }}>
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <span style={{ fontWeight: 700, color: "#202124" }}>5.0</span>
                        <span>•</span>
                        <span>48 client reviews</span>
                        <span>•</span>
                        <span style={{ color: "#188038", fontWeight: 700 }}>Open Now (09:00 - 18:00)</span>
                      </div>
                    )}

                    <p style={{ fontSize: "0.82rem", color: "#4d5156", lineHeight: 1.45, margin: "4px 0 0" }}>
                      {webpageData.description || orgData.description}
                    </p>

                    {enabledModules.faqs && faqList.length > 0 && (
                      <div style={{ marginTop: "10px", borderTop: "1px solid #f1f3f4", paddingTop: "6px" }}>
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

              {/* TAB 3: ENTITY GRAPH TREE */}
              {activeTab === "graph_tree" && (
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <strong style={{ fontSize: "0.85rem", color: "#0f172a", display: "block", marginBottom: "12px" }}>
                    <i className="fa-solid fa-diagram-project text-primary"></i> Master Entity Relationship Graph
                  </strong>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.78rem" }}>
                    <div style={{ padding: "8px 10px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "4px", color: "#1e40af", fontWeight: 700 }}>
                      🌐 WebSite Node: <code>/#website</code>
                    </div>
                    <div style={{ paddingLeft: "16px", borderLeft: "2px solid #cbd5e1", marginLeft: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ padding: "6px 8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                        🏢 Publisher: <code>/#organization</code>
                      </div>
                      <div style={{ padding: "6px 8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                        👤 Founder / Author: <code>/#/schema/person/author</code>
                      </div>
                      <div style={{ padding: "6px 8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                        📍 Physical Office: <code>/#localbusiness</code>
                      </div>
                      <div style={{ padding: "6px 8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                        💼 Service &amp; Product Catalogs: <code>/#service-1</code>, <code>/#product-1</code>
                      </div>
                      <div style={{ padding: "6px 8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                        📄 WebPage &amp; FAQ Accordion: <code>/#webpage</code>, <code>/#faq</code>
                      </div>
                    </div>
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
                a: "Yes! Every module has an 'Include in Master Graph' toggle checkbox. If your site does not sell products or does not have physical local business hours, simply uncheck those modules and the generator will clean and adjust the master @graph code in real time."
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
