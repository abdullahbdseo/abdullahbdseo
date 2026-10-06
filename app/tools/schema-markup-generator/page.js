"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

const SCHEMA_TYPES = [
  { id: "website", label: "WebSite & Sitelinks", icon: "fa-globe", badge: "Core", desc: "Site entity & SearchAction" },
  { id: "organization", label: "Organization & Brand", icon: "fa-building", badge: "Knowledge Graph", desc: "Entity NAP, logo, sameAs" },
  { id: "localBusiness", label: "Local Business / NAP", icon: "fa-shop", badge: "Google Maps", desc: "Geo coordinates, hours, reviews" },
  { id: "person", label: "Founder / Author (E-E-A-T)", icon: "fa-user-tie", badge: "Author Trust", desc: "Credentials, bio, knowsAbout" },
  { id: "services", label: "Services Catalog", icon: "fa-briefcase", badge: "Service Graph", desc: "Offerings, pricing & area" },
  { id: "products", label: "Product & Offers", icon: "fa-box-open", badge: "Shopping", desc: "E-com items, SKUs, stock" },
  { id: "faqs", label: "FAQ Page Accordion", icon: "fa-circle-question", badge: "Rich Snippet", desc: "Expandable Q&A pairs" },
  { id: "breadcrumbs", label: "Breadcrumbs Trail", icon: "fa-folder-tree", badge: "SERP Trail", desc: "Navigation hierarchy levels" },
  { id: "webpage", label: "Article / WebPage", icon: "fa-newspaper", badge: "Content", desc: "Headline, author, publisher" },
  { id: "masterGraph", label: "All-in-One Master Graph", icon: "fa-diagram-project", badge: "Complete @graph", desc: "Full connected website schema" }
];

export default function SchemaMarkupGenerator() {
  const [selectedType, setSelectedType] = useState("website");
  const [activeOutputTab, setActiveOutputTab] = useState("code"); // 'code', 'serp_preview', 'graph_tree'
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
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
    phone: "+8801700000000",
    email: "contact@abdullahbdseo.com",
    street: "Level 4, House 12, Road 4, Sector 3, Uttara",
    city: "Dhaka",
    region: "Dhaka Division",
    postalCode: "1230",
    country: "BD",
    sameAs: [
      "https://facebook.com/abdullahbdseo",
      "https://twitter.com/abdullahbdseo",
      "https://linkedin.com/in/abdullahbdseo",
      "https://youtube.com/@abdullahbdseo",
      "https://github.com/abdullahbdseo",
      "https://www.wikidata.org/wiki/Q00000000"
    ]
  });

  // 3. LOCAL BUSINESS DATA
  const [localBizData, setLocalBizData] = useState({
    subType: "ProfessionalService",
    name: "Abdullah Saleh - SEO Agency Dhaka",
    url: "https://abdullahbdseo.vercel.app",
    phone: "+8801700000000",
    email: "contact@abdullahbdseo.com",
    priceRange: "$$$",
    image: "https://abdullahbdseo.vercel.app/images/office.jpg",
    street: "Sector 3, Uttara",
    city: "Dhaka",
    region: "Dhaka",
    postalCode: "1230",
    country: "BD",
    latitude: "23.8759",
    longitude: "90.3795",
    hasMap: "https://maps.google.com/?cid=1234567890",
    opensTime: "09:00",
    closesTime: "18:00",
    ratingValue: "4.9",
    reviewCount: "127",
    areaServed: "Bangladesh, USA, UK, Canada, Australia, UAE"
  });

  // 4. PERSON / AUTHOR DATA (E-E-A-T)
  const [personData, setPersonData] = useState({
    name: "Abdullah Saleh",
    jobTitle: "Founder & Principal Technical SEO Consultant",
    url: "https://abdullahbdseo.vercel.app",
    image: "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
    description: "Top-rated SEO consultant in Bangladesh specializing in Enterprise Technical SEO, GEO & AI Overviews Citations, and algorithmic penalty recoveries.",
    email: "abdullah@abdullahbdseo.com",
    telephone: "+8801700000000",
    alumniOf: "University of Dhaka",
    knowsAbout: "Technical SEO, Generative Engine Optimization, Backlink Strategy, Schema Markup, Core Web Vitals",
    sameAs: [
      "https://linkedin.com/in/abdullahbdseo",
      "https://twitter.com/abdullahbdseo",
      "https://facebook.com/abdullahbdseo",
      "https://github.com/abdullahbdseo"
    ]
  });

  // 5. SERVICES DATA
  const [servicesList, setServicesList] = useState([
    {
      name: "Enterprise Technical SEO & Core Web Vitals Audit",
      serviceType: "ProfessionalService",
      description: "Complete 180+ point technical audit resolving indexation, crawl budget, render pipeline, and schema gaps.",
      url: "https://abdullahbdseo.vercel.app/services/technical-seo-service-in-bangladesh",
      price: "499",
      currency: "USD",
      areaServed: "Worldwide"
    },
    {
      name: "Generative Engine Optimization (GEO & AI Search)",
      serviceType: "ConsultingService",
      description: "Structured citation modeling and schema engineering for Google Gemini, SearchGPT, and Claude AI Overviews.",
      url: "https://abdullahbdseo.vercel.app/services/geo-service-in-bangladesh",
      price: "799",
      currency: "USD",
      areaServed: "Worldwide"
    },
    {
      name: "High DA Contextual Backlink Outreach",
      serviceType: "MarketingService",
      description: "Hand-curated, DR 70+ editorial backlinks on real niche authority publications with natural anchor distributions.",
      url: "https://abdullahbdseo.vercel.app/services/backlink-service-in-bangladesh",
      price: "350",
      currency: "USD",
      areaServed: "Worldwide"
    }
  ]);

  // 6. PRODUCTS DATA
  const [productsList, setProductsList] = useState([
    {
      name: "Ultimate Technical SEO Checklist & Audit Template 2026",
      image: "https://abdullahbdseo.vercel.app/images/products/seo-checklist.jpg",
      description: "Interactive Notion & Google Sheets checklist covering crawl budgets, indexation traps, and GEO AI citation blueprints.",
      sku: "SEO-CHK-2026",
      gtin13: "9781234567897",
      price: "49.00",
      currency: "USD",
      availability: "InStock",
      ratingValue: "5.0",
      reviewCount: "48"
    }
  ]);

  // 7. FAQS DATA
  const [faqList, setFaqList] = useState([
    {
      question: "Why is JSON-LD schema markup essential for 2026 SEO & AI Search?",
      answer: "JSON-LD schema gives search engine crawlers and LLM models (Google Gemini, SearchGPT, Claude) explicit semantic facts about your entity, author credentials, services, and content hierarchy without relying on ambiguous HTML scraping."
    },
    {
      question: "How does this schema generator connect entities into one cohesive graph?",
      answer: "It creates unique URI identifiers (@id nodes) for your WebSite, Organization, Author, Services, and Articles, linking them together in a single structured @graph array so search engines recognize them as one unified Knowledge Graph entity."
    },
    {
      question: "Where should I place the generated schema code in my website?",
      answer: "Place the generated <script type='application/ld+json'> snippet inside the <head> section or right before the closing </body> tag of your HTML or in your Next.js/WordPress header template."
    }
  ]);

  // 8. BREADCRUMBS DATA
  const [breadcrumbsList, setBreadcrumbsList] = useState([
    { position: 1, name: "Home", url: "https://abdullahbdseo.vercel.app" },
    { position: 2, name: "Free SEO Tools", url: "https://abdullahbdseo.vercel.app/tools" },
    { position: 3, name: "JSON-LD Schema Markup Generator", url: "https://abdullahbdseo.vercel.app/tools/schema-markup-generator" }
  ]);

  // 9. WEBPAGE & ARTICLE DATA
  const [webpageData, setWebpageData] = useState({
    title: "Complete JSON-LD Schema Markup Generator for Modern SEO & AI Search",
    description: "Generate validated JSON-LD schema markup for WebSite, Local Business, Organization, Person, Services, Products, FAQs, and Articles in one click.",
    url: "https://abdullahbdseo.vercel.app/tools/schema-markup-generator",
    primaryImage: "https://abdullahbdseo.vercel.app/images/schema-generator-banner.jpg",
    datePublished: "2026-01-10T08:00:00+06:00",
    dateModified: "2026-10-06T12:00:00+06:00",
    isArticle: true,
    articleSection: "SEO & Growth",
    keywords: "SEO Expert Bangladesh, GEO Optimization, Technical SEO, AI SEO, Abdullah Saleh"
  });

  // Dynamic Item Handlers
  const addService = () => setServicesList([...servicesList, { name: "", serviceType: "ProfessionalService", description: "", url: "", price: "", currency: "USD", areaServed: "Worldwide" }]);
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

  // GENERATE SCHEMA OUTPUT BASED ON SELECTED TYPE
  const generatedSchema = useMemo(() => {
    const domain = (websiteData.url || "https://example.com").replace(/\/+$/, "");
    const orgId = `${domain}/#organization`;
    const websiteId = `${domain}/#website`;
    const authorId = `${domain}/#/schema/person/author`;
    const webpageId = `${webpageData.url || domain}/#webpage`;
    const primaryImageId = `${webpageData.url || domain}/#primaryimage`;
    const breadcrumbId = `${webpageData.url || domain}/#breadcrumb`;

    switch (selectedType) {
      case "website":
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": websiteId,
          "url": domain,
          "name": websiteData.name,
          "alternateName": websiteData.alternateName || undefined,
          "description": websiteData.description || undefined,
          "inLanguage": websiteData.inLanguage || "en-US",
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

      case "organization":
        return cleanObject({
          "@context": "https://schema.org",
          "@type": orgData.subType || "Organization",
          "@id": orgId,
          "name": orgData.name,
          "legalName": orgData.legalName || undefined,
          "alternateName": orgData.alternateName || undefined,
          "url": orgData.url || domain,
          "logo": orgData.logo ? {
            "@type": "ImageObject",
            "@id": `${domain}/#logo`,
            "url": orgData.logo,
            "caption": orgData.name
          } : undefined,
          "description": orgData.description || undefined,
          "foundingDate": orgData.foundingDate || undefined,
          "founder": orgData.founderName ? { "@type": "Person", "name": orgData.founderName } : undefined,
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

      case "localBusiness":
        return cleanObject({
          "@context": "https://schema.org",
          "@type": localBizData.subType || "LocalBusiness",
          "@id": `${domain}/#localbusiness`,
          "name": localBizData.name,
          "image": localBizData.image ? [localBizData.image] : undefined,
          "url": localBizData.url || domain,
          "telephone": localBizData.phone,
          "email": localBizData.email || undefined,
          "priceRange": localBizData.priceRange || "$$",
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

      case "person":
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": authorId,
          "name": personData.name,
          "jobTitle": personData.jobTitle || undefined,
          "url": personData.url || domain,
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

      case "services":
        if (servicesList.length === 1) {
          const s = servicesList[0];
          return cleanObject({
            "@context": "https://schema.org",
            "@type": s.serviceType || "Service",
            "name": s.name,
            "description": s.description || undefined,
            "url": s.url || domain,
            "areaServed": s.areaServed ? { "@type": "AdministrativeArea", "name": s.areaServed } : undefined,
            "offers": s.price ? {
              "@type": "Offer",
              "price": s.price,
              "priceCurrency": s.currency || "USD"
            } : undefined
          });
        }
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": servicesList.filter(s => s.name).map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": s.serviceType || "Service",
              "name": s.name,
              "description": s.description || undefined,
              "url": s.url || domain,
              "areaServed": s.areaServed ? { "@type": "AdministrativeArea", "name": s.areaServed } : undefined,
              "offers": s.price ? {
                "@type": "Offer",
                "price": s.price,
                "priceCurrency": s.currency || "USD"
              } : undefined
            }
          }))
        });

      case "products":
        if (productsList.length === 1) {
          const p = productsList[0];
          return cleanObject({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": p.name,
            "image": p.image ? [p.image] : undefined,
            "description": p.description || undefined,
            "sku": p.sku || undefined,
            "gtin13": p.gtin13 || undefined,
            "offers": {
              "@type": "Offer",
              "price": p.price || "0.00",
              "priceCurrency": p.currency || "USD",
              "availability": p.availability ? `https://schema.org/${p.availability}` : "https://schema.org/InStock"
            },
            "aggregateRating": (p.ratingValue && p.reviewCount) ? {
              "@type": "AggregateRating",
              "ratingValue": p.ratingValue,
              "reviewCount": p.reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            } : undefined
          });
        }
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": productsList.filter(p => p.name).map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Product",
              "name": p.name,
              "image": p.image ? [p.image] : undefined,
              "description": p.description || undefined,
              "sku": p.sku || undefined,
              "offers": {
                "@type": "Offer",
                "price": p.price || "0.00",
                "priceCurrency": p.currency || "USD",
                "availability": p.availability ? `https://schema.org/${p.availability}` : "https://schema.org/InStock"
              }
            }
          }))
        });

      case "faqs": {
        const validFaqs = faqList.filter(f => f.question && f.question.trim() !== "");
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": validFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question.trim(),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer.trim()
            }
          }))
        });
      }

      case "breadcrumbs":
        return cleanObject({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbsList.filter(b => b.name && b.name.trim() !== "").map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name.trim(),
            "item": b.url ? b.url.trim() : undefined
          }))
        });

      case "webpage":
        return cleanObject({
          "@context": "https://schema.org",
          "@type": webpageData.isArticle ? "Article" : "WebPage",
          "headline": webpageData.title,
          "name": webpageData.title,
          "url": webpageData.url,
          "description": webpageData.description || undefined,
          "image": webpageData.primaryImage || undefined,
          "datePublished": webpageData.datePublished || undefined,
          "dateModified": webpageData.dateModified || webpageData.datePublished || undefined,
          "articleSection": webpageData.articleSection || undefined,
          "keywords": webpageData.keywords || undefined,
          "author": personData.name ? {
            "@type": "Person",
            "name": personData.name,
            "url": personData.url || undefined
          } : undefined,
          "publisher": orgData.name ? {
            "@type": "Organization",
            "name": orgData.name,
            "logo": orgData.logo ? { "@type": "ImageObject", "url": orgData.logo } : undefined
          } : undefined
        });

      case "masterGraph":
      default: {
        const graph = [];

        // 1. WebSite
        if (websiteData.url) {
          graph.push({
            "@type": "WebSite",
            "@id": websiteId,
            "url": domain,
            "name": websiteData.name,
            "alternateName": websiteData.alternateName || undefined,
            "description": websiteData.description || undefined,
            "inLanguage": websiteData.inLanguage || "en-US",
            "publisher": { "@id": orgId },
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

        // 2. Organization
        if (orgData.name) {
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
            "founder": personData.name ? { "@id": authorId } : undefined,
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

        // 3. Local Business
        if (localBizData.name) {
          graph.push({
            "@type": localBizData.subType || "LocalBusiness",
            "@id": `${domain}/#localbusiness`,
            "name": localBizData.name,
            "image": localBizData.image ? [localBizData.image] : undefined,
            "url": domain,
            "telephone": localBizData.phone,
            "email": localBizData.email || undefined,
            "priceRange": localBizData.priceRange || "$$",
            "parentOrganization": { "@id": orgId },
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

        // 4. Person
        if (personData.name) {
          graph.push({
            "@type": "Person",
            "@id": authorId,
            "name": personData.name,
            "jobTitle": personData.jobTitle || undefined,
            "worksFor": { "@id": orgId },
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

        // 5. Services
        servicesList.forEach((s, idx) => {
          if (s.name && s.name.trim() !== "") {
            graph.push({
              "@type": s.serviceType || "Service",
              "@id": `${domain}/#service-${idx + 1}`,
              "name": s.name,
              "description": s.description || undefined,
              "provider": { "@id": orgId },
              "serviceType": s.serviceType || undefined,
              "url": s.url || domain,
              "areaServed": s.areaServed ? { "@type": "AdministrativeArea", "name": s.areaServed } : undefined,
              "offers": s.price ? {
                "@type": "Offer",
                "price": s.price,
                "priceCurrency": s.currency || "USD",
                "availability": "https://schema.org/InStock"
              } : undefined
            });
          }
        });

        // 6. Products
        productsList.forEach((p, idx) => {
          if (p.name && p.name.trim() !== "") {
            graph.push({
              "@type": "Product",
              "@id": `${domain}/#product-${idx + 1}`,
              "name": p.name,
              "image": p.image ? [p.image] : undefined,
              "description": p.description || undefined,
              "sku": p.sku || undefined,
              "gtin13": p.gtin13 || undefined,
              "brand": { "@id": orgId },
              "offers": {
                "@type": "Offer",
                "price": p.price || "0.00",
                "priceCurrency": p.currency || "USD",
                "availability": p.availability ? `https://schema.org/${p.availability}` : "https://schema.org/InStock",
                "url": domain,
                "seller": { "@id": orgId }
              },
              "aggregateRating": (p.ratingValue && p.reviewCount) ? {
                "@type": "AggregateRating",
                "ratingValue": p.ratingValue,
                "reviewCount": p.reviewCount,
                "bestRating": "5",
                "worstRating": "1"
              } : undefined
            });
          }
        });

        // 7. Breadcrumbs
        if (breadcrumbsList.length > 0) {
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
        const validFaqs = faqList.filter(f => f.question && f.question.trim() !== "");
        if (validFaqs.length > 0) {
          graph.push({
            "@type": "FAQPage",
            "@id": `${webpageData.url}/#faq`,
            "isPartOf": { "@id": webpageId },
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

        // 9. WebPage & Article
        if (webpageData.url) {
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
            "isPartOf": { "@id": websiteId },
            "about": { "@id": orgId },
            "primaryImageOfPage": webpageData.primaryImage ? { "@id": primaryImageId } : undefined,
            "breadcrumb": { "@id": breadcrumbId }
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
              "author": personData.name ? { "@id": authorId } : undefined,
              "publisher": { "@id": orgId },
              "image": webpageData.primaryImage ? { "@id": primaryImageId } : undefined
            });
          }
        }

        return cleanObject({
          "@context": "https://schema.org",
          "@graph": graph
        });
      }
    }
  }, [
    selectedType, websiteData, orgData, localBizData, personData,
    servicesList, productsList, faqList, breadcrumbsList, webpageData
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
    showToast("Copied <script> tag to clipboard!");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyRawJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedRaw(true);
    showToast("Copied JSON-LD object to clipboard!");
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([scriptTagOutput], { type: "text/html" });
    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${selectedType}-schema.html`;
    a.click();
    URL.revokeObjectURL(fileUrl);
    showToast(`Downloaded ${selectedType}-schema.html`);
  };

  const jsonByteSize = new Blob([scriptTagOutput]).size;
  const currentItem = SCHEMA_TYPES.find(t => t.id === selectedType) || SCHEMA_TYPES[0];

  const faqItems = [
    {
      q: "How does selecting a Schema Type on the left update the code?",
      a: "Selecting any Schema Type on the left instantly swaps the editor form and simultaneously generates the exact, validated JSON-LD schema code on the right code section without needing to reload the page."
    },
    {
      q: "Can I generate a single schema or a full interconnected website schema?",
      a: "Yes! You can choose individual schema types (like LocalBusiness, Article, FAQ, or WebSite) to get standalone schema markup, or select 'All-in-One Master Graph' to get a complete interconnected @graph schema for your entire website."
    },
    {
      q: "Is the generated schema compliant with Google's Rich Results and AI search engines?",
      a: "Yes. All schema output adheres strictly to Schema.org standards and Google's Rich Results Guidelines for 2026, making it fully optimized for Google Gemini, SearchGPT, and traditional SERPs."
    }
  ];

  return (
    <>
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          background: "#0f172a",
          color: "#ffffff",
          padding: "10px 18px",
          borderRadius: "4px",
          fontSize: "0.85rem",
          fontWeight: 600,
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
          border: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <i className="fa-solid fa-circle-check text-success"></i>
          {toastMessage}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="tool-hero-section">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <span className="badge badge-primary mb-3">
              <i className="fa-solid fa-code me-1"></i> Schema.org &amp; AI Search Engine Ready
            </span>
            <h1 className="hero-title" style={{ fontSize: "2.1rem", marginBottom: "12px", lineHeight: "1.25" }}>
              JSON-LD Schema Markup Generator
            </h1>
            <p className="hero-desc" style={{ fontSize: "0.95rem", color: "#64748b", margin: "0 auto" }}>
              Select a schema type from the left option list to instantly configure and generate clean, validated JSON-LD code for your website in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* WORKSPACE SECTION */}
      <section className="section-padding" style={{ paddingTop: "20px" }}>
        <div className="container" style={{ maxWidth: "1440px" }}>

          {/* THREE-COLUMN WORKSPACE: LEFT SELECTOR, MIDDLE FORM, RIGHT COMPACT OUTPUT */}
          <div style={{ display: "grid", gridTemplateColumns: "240px 1.25fr 0.85fr", gap: "18px", alignItems: "start" }}>

            {/* 1. LEFT SIDEBAR: SINGLE-SELECT SCHEMA OPTION MENU */}
            <div style={{ position: "sticky", top: "18px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
              <div style={{ marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                <strong style={{ fontSize: "0.82rem", color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
                  <i className="fa-solid fa-list-ul text-primary"></i> Schema Type:
                </strong>
                <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Click an option to switch</span>
              </div>

              {/* Single Select Option List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {SCHEMA_TYPES.map((item) => {
                  const isSelected = selectedType === item.id;
                  const isMaster = item.id === "masterGraph";
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedType(item.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "7px 9px",
                        borderRadius: "4px",
                        background: isSelected ? (isMaster ? "#fef3c7" : "#eff6ff") : (isMaster ? "#fffbeb" : "transparent"),
                        border: isSelected ? (isMaster ? "1px solid #d97706" : "1px solid #2563eb") : (isMaster ? "1px dashed #f59e0b" : "1px solid transparent"),
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <i
                          className={`fa-solid ${item.icon}`}
                          style={{
                            width: "14px",
                            color: isSelected ? (isMaster ? "#b45309" : "#2563eb") : (isMaster ? "#d97706" : "#64748b"),
                            fontSize: "0.82rem"
                          }}
                        ></i>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? (isMaster ? "#92400e" : "#1e40af") : "#334155"
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      {isSelected ? (
                        <i className={`fa-solid fa-circle-check ${isMaster ? "text-warning" : "text-primary"}`} style={{ fontSize: "0.75rem" }}></i>
                      ) : (
                        <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.65rem", color: "#cbd5e1" }}></i>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. MIDDLE COLUMN: ACTIVE SCHEMA FORM */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* 1. WEBSITE FORM */}
              {selectedType === "website" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>WebSite &amp; Sitelinks Searchbox</strong>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Declares the main site entity and search action endpoint</span>
                    </div>
                  </div>

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
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Alternate / Short Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={websiteData.alternateName}
                          onChange={(e) => setWebsiteData({ ...websiteData, alternateName: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Canonical URL *</label>
                        <input
                          type="url"
                          className="form-input"
                          value={websiteData.url}
                          onChange={(e) => setWebsiteData({ ...websiteData, url: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Language</label>
                        <input
                          type="text"
                          className="form-input"
                          value={websiteData.inLanguage}
                          onChange={(e) => setWebsiteData({ ...websiteData, inLanguage: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Sitelinks SearchBox Target URL</label>
                      <input
                        type="text"
                        className="form-input"
                        value={websiteData.searchTarget}
                        onChange={(e) => setWebsiteData({ ...websiteData, searchTarget: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      />
                      <small style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Use <code>&#123;search_term_string&#125;</code> as query placeholder.</small>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Site Description</label>
                      <textarea
                        className="form-input"
                        rows="2"
                        value={websiteData.description}
                        onChange={(e) => setWebsiteData({ ...websiteData, description: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ORGANIZATION FORM */}
              {selectedType === "organization" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-building"></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Organization &amp; Brand Entity</strong>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Builds Google Knowledge Graph and brand authority</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Organization Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={orgData.name}
                          onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Schema Sub-Type</label>
                        <select
                          className="form-input"
                          value={orgData.subType}
                          onChange={(e) => setOrgData({ ...orgData, subType: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        >
                          <option value="Organization">Organization</option>
                          <option value="Corporation">Corporation</option>
                          <option value="EducationalOrganization">Educational Organization</option>
                          <option value="NGO">NGO / Non-Profit</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Official Logo URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={orgData.logo}
                          onChange={(e) => setOrgData({ ...orgData, logo: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Founding Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={orgData.foundingDate}
                          onChange={(e) => setOrgData({ ...orgData, foundingDate: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Founder Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={orgData.founderName}
                          onChange={(e) => setOrgData({ ...orgData, founderName: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Contact Phone</label>
                        <input
                          type="text"
                          className="form-input"
                          value={orgData.phone}
                          onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Street Address</label>
                        <input
                          type="text"
                          className="form-input"
                          value={orgData.street}
                          onChange={(e) => setOrgData({ ...orgData, street: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>City &amp; Country</label>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="City"
                            value={orgData.city}
                            onChange={(e) => setOrgData({ ...orgData, city: e.target.value })}
                            style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                          />
                          <input
                            type="text"
                            className="form-input"
                            placeholder="BD"
                            value={orgData.country}
                            onChange={(e) => setOrgData({ ...orgData, country: e.target.value })}
                            style={{ width: "60px", borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>SameAs Social Profiles &amp; Wikidata</label>
                      <textarea
                        className="form-input"
                        rows="3"
                        value={orgData.sameAs.join("\n")}
                        onChange={(e) => setOrgData({ ...orgData, sameAs: e.target.value.split("\n") })}
                        placeholder="One URL per line (Wikipedia, Wikidata, LinkedIn, Twitter...)"
                        style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "6px 8px" }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. LOCAL BUSINESS FORM */}
              {selectedType === "localBusiness" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-shop"></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Local Business / NAP Entity</strong>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Rank in Google 3-Pack Maps and local searches</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Business Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.name}
                          onChange={(e) => setLocalBizData({ ...localBizData, name: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Business Sub-Type</label>
                        <select
                          className="form-input"
                          value={localBizData.subType}
                          onChange={(e) => setLocalBizData({ ...localBizData, subType: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        >
                          <option value="LocalBusiness">LocalBusiness (General)</option>
                          <option value="ProfessionalService">ProfessionalService</option>
                          <option value="MedicalBusiness">MedicalBusiness / Clinic</option>
                          <option value="Restaurant">Restaurant / Food</option>
                          <option value="LegalService">LegalService / Law Firm</option>
                          <option value="RealEstateAgent">RealEstateAgent</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Phone Number *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.phone}
                          onChange={(e) => setLocalBizData({ ...localBizData, phone: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Price Range ($ / $$ / $$$)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.priceRange}
                          onChange={(e) => setLocalBizData({ ...localBizData, priceRange: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Latitude</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.latitude}
                          onChange={(e) => setLocalBizData({ ...localBizData, latitude: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Longitude</label>
                        <input
                          type="text"
                          className="form-input"
                          value={localBizData.longitude}
                          onChange={(e) => setLocalBizData({ ...localBizData, longitude: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Review Rating / Count</label>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <input
                            type="text"
                            className="form-input"
                            value={localBizData.ratingValue}
                            placeholder="4.9"
                            onChange={(e) => setLocalBizData({ ...localBizData, ratingValue: e.target.value })}
                            style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                          />
                          <input
                            type="text"
                            className="form-input"
                            value={localBizData.reviewCount}
                            placeholder="120"
                            onChange={(e) => setLocalBizData({ ...localBizData, reviewCount: e.target.value })}
                            style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PERSON / AUTHOR FORM */}
              {selectedType === "person" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Founder / Author Entity (E-E-A-T)</strong>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Anchor individual author trustworthiness for Google quality raters</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Person Full Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={personData.name}
                          onChange={(e) => setPersonData({ ...personData, name: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Job Title / Role</label>
                        <input
                          type="text"
                          className="form-input"
                          value={personData.jobTitle}
                          onChange={(e) => setPersonData({ ...personData, jobTitle: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Author Bio / Profile Page URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={personData.url}
                          onChange={(e) => setPersonData({ ...personData, url: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Alumni / Education</label>
                        <input
                          type="text"
                          className="form-input"
                          value={personData.alumniOf}
                          onChange={(e) => setPersonData({ ...personData, alumniOf: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>KnowsAbout (Skills / Topics comma-separated)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={personData.knowsAbout}
                        onChange={(e) => setPersonData({ ...personData, knowsAbout: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SERVICES FORM */}
              {selectedType === "services" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                        <i className="fa-solid fa-briefcase"></i>
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Services Catalog</strong>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Define commercial offerings and pricing</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addService}
                      style={{ padding: "4px 8px", fontSize: "0.72rem", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", cursor: "pointer", fontWeight: 700 }}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Add Service
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {servicesList.map((srv, sIdx) => (
                      <div key={sIdx} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb" }}>Service #{sIdx + 1}</span>
                          {servicesList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(sIdx)}
                              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.72rem" }}
                            >
                              <i className="fa-solid fa-trash me-1"></i> Remove
                            </button>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px", marginBottom: "6px" }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Service Name *"
                            value={srv.name}
                            onChange={(e) => updateService(sIdx, "name", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Starting Price ($499)"
                            value={srv.price}
                            onChange={(e) => updateService(sIdx, "price", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                        </div>
                        <textarea
                          className="form-input"
                          rows="2"
                          placeholder="Service description..."
                          value={srv.description}
                          onChange={(e) => updateService(sIdx, "description", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. PRODUCTS FORM */}
              {selectedType === "products" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                        <i className="fa-solid fa-box-open"></i>
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Products &amp; Offers</strong>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>E-commerce products, SKUs, and stock</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addProduct}
                      style={{ padding: "4px 8px", fontSize: "0.72rem", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", cursor: "pointer", fontWeight: 700 }}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Add Product
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {productsList.map((prd, pIdx) => (
                      <div key={pIdx} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb" }}>Product #{pIdx + 1}</span>
                          {productsList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeProduct(pIdx)}
                              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.72rem" }}
                            >
                              <i className="fa-solid fa-trash me-1"></i> Remove
                            </button>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px", marginBottom: "6px" }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Product Title *"
                            value={prd.name}
                            onChange={(e) => updateProduct(pIdx, "name", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Price ($49.00)"
                            value={prd.price}
                            onChange={(e) => updateProduct(pIdx, "price", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "6px" }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="SKU"
                            value={prd.sku}
                            onChange={(e) => updateProduct(pIdx, "sku", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                          <input
                            type="url"
                            className="form-input"
                            placeholder="Image URL"
                            value={prd.image}
                            onChange={(e) => updateProduct(pIdx, "image", e.target.value)}
                            style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. FAQS FORM */}
              {selectedType === "faqs" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                        <i className="fa-solid fa-circle-question"></i>
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>FAQ Page Accordion</strong>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Interactive Q&amp;A rich snippets in search results</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addFaq}
                      style={{ padding: "4px 8px", fontSize: "0.72rem", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", cursor: "pointer", fontWeight: 700 }}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Add Question
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {faqList.map((faq, fIdx) => (
                      <div key={fIdx} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb" }}>Question #{fIdx + 1}</span>
                          {faqList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFaq(fIdx)}
                              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.72rem" }}
                            >
                              <i className="fa-solid fa-trash me-1"></i> Remove
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className="form-input mb-2"
                          placeholder="What is your question? *"
                          value={faq.question}
                          onChange={(e) => updateFaq(fIdx, "question", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                        />
                        <textarea
                          className="form-input"
                          rows="2"
                          placeholder="Comprehensive factual answer..."
                          value={faq.answer}
                          onChange={(e) => updateFaq(fIdx, "answer", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px" }}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. BREADCRUMBS FORM */}
              {selectedType === "breadcrumbs" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                        <i className="fa-solid fa-folder-tree"></i>
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Breadcrumbs Trail</strong>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Hierarchical site navigation breadcrumb snippets</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addBreadcrumb}
                      style={{ padding: "4px 8px", fontSize: "0.72rem", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", cursor: "pointer", fontWeight: 700 }}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Add Level
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {breadcrumbsList.map((bc, bIdx) => (
                      <div key={bIdx} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", padding: "8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", minWidth: "20px" }}>#{bc.position}</span>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Page Name"
                          value={bc.name}
                          onChange={(e) => updateBreadcrumb(bIdx, "name", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px", flex: "1" }}
                        />
                        <input
                          type="url"
                          className="form-input"
                          placeholder="https://example.com/url"
                          value={bc.url}
                          onChange={(e) => updateBreadcrumb(bIdx, "url", e.target.value)}
                          style={{ borderRadius: "4px", fontSize: "0.78rem", padding: "5px 7px", flex: "1.5" }}
                        />
                        {breadcrumbsList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBreadcrumb(bIdx)}
                            style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.72rem" }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. ARTICLE / WEBPAGE FORM */}
              {selectedType === "webpage" && (
                <div style={{ background: "#ffffff", border: "1px solid #2563eb", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "26px", height: "26px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-newspaper"></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#0f172a", display: "block" }}>Article / WebPage Entity</strong>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Optimize blog posts, news, and editorial content</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Article Headline / Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={webpageData.title}
                        onChange={(e) => setWebpageData({ ...webpageData, title: e.target.value })}
                        style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Article URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={webpageData.url}
                          onChange={(e) => setWebpageData({ ...webpageData, url: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Featured Image URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={webpageData.primaryImage}
                          onChange={(e) => setWebpageData({ ...webpageData, primaryImage: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Date Published</label>
                        <input
                          type="text"
                          className="form-input"
                          value={webpageData.datePublished}
                          onChange={(e) => setWebpageData({ ...webpageData, datePublished: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: "0.76rem" }}>Category / Section</label>
                        <input
                          type="text"
                          className="form-input"
                          value={webpageData.articleSection}
                          onChange={(e) => setWebpageData({ ...webpageData, articleSection: e.target.value })}
                          style={{ borderRadius: "4px", fontSize: "0.8rem", padding: "6px 8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 10. ALL-IN-ONE MASTER GRAPH OVERVIEW */}
              {selectedType === "masterGraph" && (
                <div style={{ background: "#ffffff", border: "1px solid #d97706", borderRadius: "4px", padding: "18px", boxShadow: "0 2px 8px rgba(217,119,6,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #fef3c7" }}>
                    <div style={{ width: "26px", height: "26px", background: "#fef3c7", color: "#d97706", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-diagram-project"></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#92400e", display: "block" }}>All-in-One Master Website Graph</strong>
                      <span style={{ fontSize: "0.72rem", color: "#b45309" }}>Combines all entity nodes into a single interconnected schema</span>
                    </div>
                  </div>

                  <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "4px", padding: "12px", marginBottom: "14px" }}>
                    <p style={{ fontSize: "0.78rem", color: "#92400e", margin: 0, lineHeight: "1.5" }}>
                      <strong>Active Master Graph Mode:</strong> This generates a complete single <code>@graph</code> array linking your <strong>WebSite, Organization, LocalBusiness, Author, Services, Products, FAQs, Breadcrumbs, and Article</strong> together using <code>@id</code> URI nodes. Edit any individual schema on the left and the master graph updates automatically!
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {SCHEMA_TYPES.filter(t => t.id !== "masterGraph").map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedType(item.id)}
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "4px",
                          padding: "8px 10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <i className={`fa-solid ${item.icon} text-primary`} style={{ fontSize: "0.75rem" }}></i>
                        <span style={{ fontSize: "0.74rem", fontWeight: 600, color: "#0f172a" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* 3. RIGHT COLUMN: COMPACT OUTPUT & COPY SECTION */}
            <div style={{ position: "sticky", top: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>

              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "14px", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>

                {/* Compact Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", paddingBottom: "6px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>
                      <i className={`fa-solid ${currentItem.icon} text-primary`}></i> {currentItem.label}
                    </span>
                    <span style={{ fontSize: "0.68rem", background: "#f1f5f9", padding: "1px 5px", borderRadius: "4px", color: "#64748b" }}>
                      {(jsonByteSize / 1024).toFixed(1)} KB
                    </span>
                  </div>

                  {/* Minify Toggle */}
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#64748b", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isMinified}
                      onChange={() => setIsMinified(!isMinified)}
                      style={{ cursor: "pointer", width: "12px", height: "12px" }}
                    />
                    Minify
                  </label>
                </div>

                {/* Sub Tabs: Code, SERP Preview, Graph Visual */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab("code")}
                    style={{
                      flex: 1,
                      padding: "4px 0",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      background: activeOutputTab === "code" ? "#0f172a" : "#f8fafc",
                      color: activeOutputTab === "code" ? "#ffffff" : "#64748b",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    JSON-LD Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab("serp_preview")}
                    style={{
                      flex: 1,
                      padding: "4px 0",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      background: activeOutputTab === "serp_preview" ? "#0f172a" : "#f8fafc",
                      color: activeOutputTab === "serp_preview" ? "#ffffff" : "#64748b",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Google SERP
                  </button>
                </div>

                {/* TAB 1: CODE CONTAINER (COMPACT HEIGHT) */}
                {activeOutputTab === "code" && (
                  <div>
                    <pre
                      style={{
                        background: "#090d16",
                        color: "#38bdf8",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "0.72rem",
                        lineHeight: "1.4",
                        maxHeight: "360px",
                        overflowY: "auto",
                        fontFamily: "monospace",
                        margin: "0 0 10px 0",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        border: "1px solid #1e293b"
                      }}
                    >
                      {scriptTagOutput}
                    </pre>

                    {/* Copy & Action Buttons */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "6px" }}>
                      <button
                        type="button"
                        onClick={copyScript}
                        style={{
                          padding: "6px 0",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          background: copiedScript ? "#10b981" : "#2563eb",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <i className={`fa-solid ${copiedScript ? "fa-check" : "fa-copy"}`}></i>
                        {copiedScript ? "Copied Snippet!" : "Copy <script>"}
                      </button>

                      <button
                        type="button"
                        onClick={copyRawJson}
                        style={{
                          padding: "6px 0",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          background: copiedRaw ? "#10b981" : "#0f172a",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <i className={`fa-solid ${copiedRaw ? "fa-check" : "fa-code"}`}></i>
                        {copiedRaw ? "Copied JSON!" : "Copy JSON"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={downloadJson}
                      style={{
                        width: "100%",
                        padding: "6px 0",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        background: "#f8fafc",
                        color: "#334155",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px"
                      }}
                    >
                      <i className="fa-solid fa-download"></i>
                      Download HTML Snippet
                    </button>
                  </div>
                )}

                {/* TAB 2: SERP PREVIEW */}
                {activeOutputTab === "serp_preview" && (
                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Google Search Preview</span>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => setPreviewDevice("desktop")}
                          style={{
                            padding: "2px 6px",
                            fontSize: "0.68rem",
                            borderRadius: "4px",
                            border: "1px solid #cbd5e1",
                            background: previewDevice === "desktop" ? "#0f172a" : "#ffffff",
                            color: previewDevice === "desktop" ? "#ffffff" : "#64748b",
                            cursor: "pointer"
                          }}
                        >
                          Desktop
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewDevice("mobile")}
                          style={{
                            padding: "2px 6px",
                            fontSize: "0.68rem",
                            borderRadius: "4px",
                            border: "1px solid #cbd5e1",
                            background: previewDevice === "mobile" ? "#0f172a" : "#ffffff",
                            color: previewDevice === "mobile" ? "#ffffff" : "#64748b",
                            cursor: "pointer"
                          }}
                        >
                          Mobile
                        </button>
                      </div>
                    </div>

                    {/* Google SERP Snippet Box */}
                    <div style={{ padding: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <div style={{ width: "16px", height: "16px", background: "#2563eb", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.55rem" }}>
                          A
                        </div>
                        <span style={{ fontSize: "0.72rem", color: "#202124" }}>{websiteData.name.split("-")[0]}</span>
                        <span style={{ fontSize: "0.68rem", color: "#5f6368" }}>{websiteData.url}</span>
                      </div>

                      <h3 style={{ fontSize: "0.95rem", color: "#1a0dab", margin: "0 0 4px 0", cursor: "pointer", textDecoration: "underline", fontWeight: 500, lineHeight: "1.3" }}>
                        {webpageData.title}
                      </h3>

                      <p style={{ fontSize: "0.75rem", color: "#4d5156", margin: "0 0 6px 0", lineHeight: "1.4" }}>
                        {webpageData.description}
                      </p>

                      {/* SERP Sitelinks or FAQs */}
                      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "6px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ fontSize: "0.68rem", color: "#0f172a", fontWeight: 600 }}>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          Rating: {localBizData.ratingValue} - {localBizData.reviewCount} reviews - Price: {localBizData.priceRange}
                        </div>
                        {faqList.slice(0, 2).map((faq, i) => (
                          <div key={i} style={{ fontSize: "0.68rem", color: "#1a0dab", paddingLeft: "8px", borderLeft: "2px solid #2563eb" }}>
                            <strong>Q: {faq.question}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Rich Results & Validator Links */}
                <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
                  <a
                    href="https://validator.schema.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "5px 0",
                      fontSize: "0.7rem",
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: 600
                    }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square me-1"></i> Schema.org Validator
                  </a>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "5px 0",
                      fontSize: "0.7rem",
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: 600
                    }}
                  >
                    <i className="fa-solid fa-google me-1"></i> Google Rich Results
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* EDUCATIONAL FAQ ACCORDION SECTION */}
      <section className="section-padding" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="text-center mb-4">
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Everything you need to know about JSON-LD structured data and AI search optimization.</p>
          </div>
          <ToolFaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
