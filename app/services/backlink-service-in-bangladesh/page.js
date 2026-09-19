"use client";

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function BacklinkServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    website: "",
    packageType: "High DA Growth Accelerator"
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: "What is a Backlink Service in Bangladesh and why is it crucial for Google ranking?",
      a: "A Backlink Service in Bangladesh is an authoritative link-building process where high-trust, contextual inbound hyperlinks are acquired from reputable, high-DA/DR websites pointing back to your target URLs. In Google's ranking algorithms, backlinks act as trusted editorial votes of confidence. Without high-authority backlinks, even a technically perfect website will struggle to outrank established competitors in competitive search landscapes."
    },
    {
      q: "How much does high-quality backlink service cost in Bangladesh?",
      a: "Backlink service pricing in Bangladesh varies based on Domain Authority (DA/DR), organic traffic of publisher sites, and outreach methodology. My Starter Brand Authority package starts at ৳15,000 (~$125), the High DA Growth Accelerator package is ৳30,000 (~$250), and custom Enterprise Digital PR campaigns range from ৳55,000+ per month. We never use automated bot links or spammy link farms."
    },
    {
      q: "Are all backlinks built 100% white-hat and safe from Google algorithm penalties?",
      a: "Yes. 100% of our link building adheres strictly to Google Search Essentials and Webmaster Guidelines. We focus exclusively on manual editorial outreach, real traffic websites (5,000+ monthly visits), organic guest posting, brand entity profiles, and un-spammed resource directories with spam scores below 2%. We never use Private Blog Networks (PBNs), automated GSA software, or link rental farms."
    },
    {
      q: "How long does it take for backlinks to show ranking improvements in Google SERPs?",
      a: "High DA backlinks are crawled and indexed by Googlebot within 7 to 21 days. Noticeable rank jumps, organic keyword impression increases, and domain rating improvements typically begin appearing in Google Search Console within 30 to 60 days as link equity propagates through your site architecture."
    },
    {
      q: "What metrics do you use to evaluate backlink quality before placement?",
      a: "We evaluate every target website across 7 strict quality filters: (1) Domain Rating (DR 40-90+ via Ahrefs), (2) Real Organic Monthly Traffic (minimum 2,000–50,000+ visits), (3) Organic Traffic Trend (growing, not penalized), (4) Spam Score (under 2% via Moz), (5) Niche Relevance, (6) Natural Outbound Link Ratio, and (7) Indexed Status in Google Cache."
    },
    {
      q: "What is the difference between DoFollow and NoFollow backlinks?",
      a: "DoFollow links pass PageRank and direct ranking equity ('link juice') to your website, directly boosting domain authority and keyword positions. NoFollow/UGC/Sponsored links tell search engines not to pass PageRank directly, but they drive valuable referral traffic, brand recognition, and are essential for maintaining a natural, penalty-safe backlink profile ratio."
    },
    {
      q: "Can high-authority backlinks help my site get cited in ChatGPT and Google AI Overviews?",
      a: "Absolutely. Large Language Models (LLMs) and Google AI Overviews prioritize brands with strong entity co-occurrences and authority mentions across reputable web ecosystems. Earning high-trust backlinks from authoritative publications signals factual trustworthiness and topical authority, directly increasing your odds of being cited in AI search answers."
    },
    {
      q: "Do you provide transparent live reporting for all built backlinks?",
      a: "Yes. Every client receives a detailed, live Google Sheet report containing: Published Live URL, Target Landing Page URL, Anchor Text Used, Domain Authority (DA/DR), Monthly Traffic, Link Type (DoFollow/NoFollow), and Indexation Status. You have 100% lifetime ownership of every link built."
    },
    {
      q: "What anchor text strategy do you use to prevent over-optimization penalties?",
      a: "We implement a natural, algorithm-safe anchor text distribution: 40% Branded Anchors (Brand Name, Founder Name), 25% URL/Generic Anchors (Website URL, Click Here, Visit Source), 20% Topical/Partial Match Anchors (e.g., 'SEO Specialist in Dhaka', 'Ecommerce growth strategies'), and 15% Exact Match Anchors. This natural blend guarantees safety through all Google Core updates."
    },
    {
      q: "Do you offer a free Backlink Audit & Competitor Link Gap analysis?",
      a: "Yes! I provide a 100% free backlink audit. I will analyze your current backlink profile, identify toxic/spammy links holding your rankings down, and perform a competitor backlink gap analysis to reveal the exact high-DR links your top 3 competitors have that you are missing. Delivered within 24 hours."
    }
  ];

  const benefits = [
    {
      icon: "fa-arrow-trend-up",
      badge: "+150% DR Lift",
      title: "Explosive Domain Authority",
      desc: "Safely skyrocket your website's Moz DA and Ahrefs DR to outrank legacy competitors in competitive niches.",
      tag: "Compounding PageRank Equity"
    },
    {
      icon: "fa-shield-halved",
      badge: "0% Penalty Risk",
      title: "100% White-Hat & Safe",
      desc: "Zero PBNs or link farms. Every link is hand-placed on verified real-traffic sites following Google Webmaster guidelines.",
      tag: "Manual Editorial Outreach"
    },
    {
      icon: "fa-bullseye",
      badge: "100% Niche Match",
      title: "Contextual Relevance",
      desc: "Links are embedded organically inside high-quality, niche-relevant articles matching your buyer search intent.",
      tag: "Natural Anchor Distribution"
    },
    {
      icon: "fa-brain",
      badge: "AI Overview Ready",
      title: "AI Search & Entity Trust",
      desc: "Brand entity mentions and authority co-citations train AI models (ChatGPT, Gemini, Perplexity) to cite your website.",
      tag: "Knowledge Graph Integration"
    },
    {
      icon: "fa-users-viewfinder",
      badge: "Buyer-Ready Leads",
      title: "Targeted Referral Traffic",
      desc: "Quality backlinks placed on high-traffic publisher sites deliver real prospective customers directly to your money pages.",
      tag: "Qualified Inbound Clicks"
    },
    {
      icon: "fa-file-lines",
      badge: "100% Verified",
      title: "Live Transparent Reports",
      desc: "Full transparency with detailed Google Sheets including live URLs, DR/DA metrics, anchor texts, and indexation status.",
      tag: "Permanent DoFollow Links"
    }
  ];

  const processSteps = [
    {
      step: "01",
      icon: "fa-magnifying-glass-chart",
      title: "Backlink Audit & Competitor Gap",
      desc: "Comprehensive profile audit to identify toxic links, disavow spam, and pinpoint high-DR gaps from top 3 ranking competitors.",
      tag: "Audit & Gap Matrix"
    },
    {
      step: "02",
      icon: "fa-filter",
      title: "Prospecting & High-DR Vetting",
      desc: "Screening publisher sites across 7 strict quality filters: DR 40–90+, verified organic human traffic, and <2% spam score.",
      tag: "DR 40-90+ Whitelist"
    },
    {
      step: "03",
      icon: "fa-pen-nib",
      title: "Handwritten Editorial Content",
      desc: "Our native SEO copywriters craft 1,000+ word original articles with naturally embedded contextual anchors and semantic keywords.",
      tag: "1,000+ Word Editorial"
    },
    {
      step: "04",
      icon: "fa-paper-plane",
      title: "Manual Webmaster Outreach",
      desc: "100% personalized manual email outreach to verified webmasters and chief editors for permanent, authentic contextual link placement.",
      tag: "Real Editorial Inclusions"
    },
    {
      step: "05",
      icon: "fa-bolt",
      title: "Tier-2 Indexation Pings",
      desc: "Drip-feeding and pinging all live published URLs through Google-compliant indexing networks for fast indexation within 7 to 14 days.",
      tag: "Fast Indexation"
    },
    {
      step: "06",
      icon: "fa-chart-line",
      title: "Live Reporting & Rank Tracking",
      desc: "Transparent live Google Sheet with all URLs, DR metrics, and live ranking progress tracking in Google Search Console.",
      tag: "Live Google Sheet"
    }
  ];

  const backlinkTypesIncluded = [
    {
      title: "Contextual Editorial Guest Posts",
      badge: "DR 50–90+ • Highest PageRank",
      desc: "In-content hyperlinks placed inside well-researched, original articles on high-authority blogs and news publication websites with real organic traffic.",
      icon: "fa-newspaper"
    },
    {
      title: "Tier-1 Brand Profile Creation Links",
      badge: "DA 85+ • Knowledge Graph",
      desc: "Manual hand-crafted brand profiles on global high-trust platforms (GitHub, Behance, TED, Gravatar, Crunchbase) to establish unbreakable entity authority.",
      icon: "fa-id-card"
    },
    {
      title: "Digital PR & Editorial Outreach (HARO / Qwoted)",
      badge: "DR 80–95+ • World Class",
      desc: "Pitching your brand as an expert source to journalists at top-tier international publications for authoritative editorial citations and brand mentions.",
      icon: "fa-bullhorn"
    },
    {
      title: ".EDU & .GOV Institutional Resource Links",
      badge: "DA 90+ • Ultimate Trust",
      desc: "High-trust academic and government portal backlinks acquired through legitimate scholarship initiatives, open research datasets, and resource directory outreach.",
      icon: "fa-graduation-cap"
    },
    {
      title: "Authority Web 2.0 Buffer Properties",
      badge: "DA 80+ • Tiered Link Equity",
      desc: "Hand-crafted satellite blogs on WordPress, Blogger, and Substack with multi-media embeds and structured contextual links to pass safe equity.",
      icon: "fa-globe"
    },
    {
      title: "Visual Assets & Infographic Syndication",
      badge: "Visual Rank • Direct Referral",
      desc: "Data visual distribution across Pinterest, Canva, Visual.ly, and SlideShare with live HTML attribution embed codes capturing Google Image rankings.",
      icon: "fa-chart-pie"
    }
  ];

  const packages = [
    {
      name: "Starter",
      bdtPrice: "৳15,000",
      usdPrice: "$125",
      period: "/month",
      badges: ["Audit", "10 Links", "Profile DA 80+"],
      features: [
        "10 High DA Profile Creation Links (DA 80+)",
        "3 Contextual Editorial Guest Posts (DR 40+)",
        "5 High PR Web 2.0 Buffer Links",
        "Natural Anchor Text Ratio Strategy",
        "100% Manual Hand-Crafted Accounts",
        "Fast Indexation Acceleration (7-14 Days)",
        "Detailed Live Google Sheet Report"
      ],
      isPopular: false
    },
    {
      name: "Standard",
      bdtPrice: "৳30,000",
      usdPrice: "$250",
      period: "/month",
      badges: ["25 Links", "Guest Post", "DR 60+"],
      features: [
        "25 High DA Brand Entity Profile Links (DA 85+)",
        "8 Contextual Editorial Guest Posts (DR 50-70+)",
        "10 High PR Web 2.0 Contextual Articles",
        "2 .EDU / Resource Authority Inclusions",
        "Comprehensive Competitor Link Gap Analysis",
        "Hand-Written 1,000+ Word Niche Content",
        "Tier-2 Indexation Pinging & Acceleration",
        "30-Day Rank Tracking & Live Support"
      ],
      isPopular: true
    },
    {
      name: "Growth",
      bdtPrice: "৳55,000",
      usdPrice: "$450",
      period: "/month",
      badges: ["50+ Links", "PR Outreach", "Scale"],
      features: [
        "50+ Tier-1 Multi-Platform Authority Links",
        "18 Premium Editorial Guest Posts (DR 60-85+)",
        "4 High-Trust .EDU / .GOV Resource Links",
        "Digital PR Journalist Outreach Campaign",
        "Infographic & Data Visual Syndication",
        "Full Toxic Link Audit & Disavow File Setup",
        "Dedicated Senior Link Building Strategist",
        "Bi-Weekly Strategy Calls via WhatsApp/Meet"
      ],
      isPopular: false
    },
    {
      name: "Enterprise",
      bdtPrice: "৳95,000",
      usdPrice: "$850",
      period: "/month",
      badges: ["Unlimited", "Custom PR", "VIP"],
      features: [
        "100+ High DR Tier-1 Authority Backlinks",
        "35+ Major Editorial Publications & Press Releases",
        "8+ High-Trust .EDU / .GOV Institutional Mentions",
        "Custom HARO & Digital PR Pitching Desk",
        "Competitor Link Intersect & Complete Moat Building",
        "Custom High-Impact Infographic & Video Distribution",
        "24/7 Priority WhatsApp & Direct Phone Support",
        "Dedicated Senior SEO Growth Director"
      ],
      isPopular: false
    }
  ];

  const caseStudies = [
    {
      brand: "We Misc",
      location: "Mirpur-10, Dhaka",
      industry: "Web Development & IT Services",
      results: [
        "+180% Increase in Domain Rating (DR 12 -> DR 48)",
        "+220% Growth in Commercial Search Inquiries",
        "Ranked #1 for 15+ Core Development Keywords"
      ],
      summary: "We Misc had strong technical foundations but lacked off-page link authority against legacy agencies. We built 25+ niche-relevant contextual guest posts and established tier-1 brand entity profiles. Within 4 months, organic leads grew by 220%."
    },
    {
      brand: "Balloons Right Now",
      location: "Florida, USA",
      industry: "eCommerce & Custom Event Decor",
      results: [
        "+75% Surge in Local Organic Impressions",
        "DR Increased from 18 to 52 in 5 Months",
        "Dominating High-Volume Buyer Keywords"
      ],
      summary: "Balloons Right Now operated in a competitive eCommerce market. Through high-DA visual infographic syndication and manual editorial guest posts, we passed massive contextual link juice, securing top 3 rankings across competitive target keywords."
    },
    {
      brand: "Shim Law Group",
      location: "New York, NY, USA",
      industry: "Legal Practice & Personal Injury",
      results: [
        "+267% Surge in Organic Search Impressions",
        "Acquired 12+ High-Trust .EDU & Legal PR Links",
        "+35% Direct Client Retainer Growth"
      ],
      summary: "Compromised by old toxic spam backlinks, Shim Law Group needed a complete link reclamation. We disavowed harmful spam, executed high-DR digital PR outreach, and placed contextual editorial anchors, generating a 267% organic impression surge."
    }
  ];

  const testimonials = [
    {
      name: "Tanvir Ahmed",
      role: "Founder",
      company: "Apex Cloud Solutions",
      quote: "Abdullah's backlink outreach completely changed our organic trajectory. Within 90 days of building DR 60+ editorial links, our primary commercial keywords moved from page 4 straight to the top 3 on Google."
    },
    {
      name: "Dr. Farzana Rahman",
      role: "Managing Director",
      company: "CarePoint Health Dhaka",
      quote: "We struggled to rank against legacy healthcare websites in Dhaka. Abdullah's high-DA local citations and niche guest posts gave our domain the authority boost needed to dominate high-intent patient searches."
    },
    {
      name: "Mahmudul Hasan",
      role: "Head of Growth",
      company: "BanglaTech Hub",
      quote: "100% transparent and reliable link building. The live Google Sheets report showed every single live URL, DR score, and indexed status. Zero spam, high referral traffic, and incredible ranking gains."
    }
  ];

  const comparisonData = [
    {
      feature: "Outreach & Placement Methodology",
      ourService: "100% Manual bespoke outreach to real websites",
      cheapSpam: "Automated software (GSA, Scrapebox, bot scripts)"
    },
    {
      feature: "Publisher Website Traffic",
      ourService: "Real sites with 2,000 – 50,000+ organic monthly visits",
      cheapSpam: "Zero organic traffic (Dead domains, PBNs, link farms)"
    },
    {
      feature: "Google Penalty Safety",
      ourService: "100% White-Hat, immune to Core and Spam updates",
      cheapSpam: "High risk of manual actions & algorithmic de-indexing"
    },
    {
      feature: "Content Quality",
      ourService: "Handwritten 1,000+ word unique, well-researched articles",
      cheapSpam: "Spun, AI-scraped garbage content or empty anchor blasts"
    },
    {
      feature: "Anchor Text Natural Diversity",
      ourService: "Natural branded, generic, topical and partial match blend",
      cheapSpam: "Over-optimized 100% exact match keywords (penalty trap)"
    },
    {
      feature: "Link Permanence & Reporting",
      ourService: "Permanent live links with transparent Google Sheets report",
      cheapSpam: "Temporary rented links deleted after 30-60 days"
    }
  ];

  return (
    <div className="service-landing-page" style={{ background: "#ffffff", color: "#0f172a" }}>
      
      {/* STRUCTURED DATA FOR SEO & RICH SNIPPETS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://abdullahbdseo.vercel.app/services/backlink-service-in-bangladesh#service",
                "name": "High DA Backlink Service in Bangladesh – White Hat Link Building Expert",
                "serviceType": "Search Engine Optimization Link Building",
                "provider": {
                  "@type": "Person",
                  "name": "Abdullah Saleh",
                  "url": "https://abdullahbdseo.vercel.app",
                  "jobTitle": "Best SEO Expert in Bangladesh"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Bangladesh"
                },
                "description": "High DA white-hat backlink building service in Bangladesh by Abdullah Saleh. Manual outreach, editorial guest posting, DR 50-90+ authority links, zero spam, and fast Google indexation.",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BDT",
                  "lowPrice": "15000",
                  "highPrice": "55000",
                  "offerCount": "3"
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://abdullahbdseo.vercel.app/services/backlink-service-in-bangladesh#faq",
                "mainEntity": faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://abdullahbdseo.vercel.app"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Services",
                    "item": "https://abdullahbdseo.vercel.app/services"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Backlink Service in Bangladesh",
                    "item": "https://abdullahbdseo.vercel.app/services/backlink-service-in-bangladesh"
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* 1. HERO SECTION - Clean Light Theme with Signature Blue Palette */}
      <section style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)",
        padding: "60px 0 50px",
        borderBottom: "1px solid #e2e8f0"
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
            <ol style={{ display: "flex", gap: "8px", listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              <li><Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link></li>
              <li>/</li>
              <li><Link href="/services" style={{ color: "#64748b", textDecoration: "none" }}>Services</Link></li>
              <li>/</li>
              <li style={{ color: "#0062d2", fontWeight: 700 }}>Backlink Service in Bangladesh</li>
            </ol>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "40px", alignItems: "start" }}>
            
            {/* Left Column: Core Value Proposition */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#eff6ff",
                border: "1px solid #dbeafe",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#0062d2",
                marginBottom: "16px"
              }}>
                <i className="fa-solid fa-link"></i>
                <span>HIGH DA LINK BUILDING SPECIALIST BANGLADESH</span>
              </div>

              <h1 style={{
                fontSize: "2.6rem",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
                marginBottom: "18px",
                letterSpacing: "-0.015em"
              }}>
                High DA Backlink Service in Bangladesh &ndash; <span style={{ color: "#0062d2" }}>Rank #1 on Google Safely</span>
              </h1>

              <p style={{
                fontSize: "1.05rem",
                color: "#334155",
                lineHeight: 1.75,
                marginBottom: "24px"
              }}>
                Safely skyrocket your website&apos;s Domain Authority (DA/DR) and organic search rankings with <strong>100% white-hat, manual editorial outreach</strong> on real traffic websites. Backlinks act as authoritative votes of confidence in Google algorithms. Stop losing search market share&mdash;build unbreakable link equity that drives continuous high-margin organic revenue.
              </p>

              {/* Key Bullet Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>100% Manual Editorial Outreach &amp; High-DR Niche Guest Posts</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Real Publisher Domains with 2,000 – 50,000+ Monthly Organic Visitors</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Zero PBNs, Zero Spam Software &amp; 100% Google Core Update Penalty-Safe</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.96rem", color: "#1e293b", fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#0062d2", fontSize: "1.1rem" }}></i>
                  <span>Transparent Live Google Sheet Tracking with Fast Indexation Pings</span>
                </div>
              </div>

              {/* Problem vs Solution Comparison Box */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "20px",
                marginBottom: "30px"
              }}>
                <div style={{ borderRight: "1px solid #e2e8f0", paddingRight: "16px" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#dc2626", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-circle-xmark"></i> The Problem Without Backlinks
                  </h4>
                  <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    Even with good content, your site gets stuck on Page 3-5 because Google lacks the domain trust signals to rank you above established competitors.
                  </p>
                </div>
                <div style={{ paddingLeft: "8px" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#059669", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-circle-check"></i> The Solution With My Service
                  </h4>
                  <p style={{ fontSize: "0.86rem", color: "#334155", lineHeight: 1.55, margin: 0 }}>
                    I place contextual, high-DR editorial backlinks and brand entity signals that compound your PageRank and propel you to Google Page 1.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Abdullah! I am interested in your High DA Backlink Service in Bangladesh. Please share packages and a free backlink audit.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glossy-green"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none"
                  }}
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.2rem" }}></i>
                  <span>WhatsApp Free Consultation</span>
                </a>

                <a
                  href="#pricing-packages"
                  className="btn btn-outline"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#ffffff",
                    color: "#0062d2",
                    border: "1px solid #0062d2",
                    padding: "14px 24px",
                    borderRadius: "4px",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    textDecoration: "none"
                  }}
                >
                  <i className="fa-solid fa-tags"></i>
                  <span>View Backlink Packages</span>
                </a>
              </div>

            </div>

            {/* Right Column: Quick Audit Lead Capture Card */}
            <div>
              <div style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "32px 28px",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "6px",
                    background: "#eff6ff",
                    color: "#0062d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem"
                  }}>
                    <i className="fa-solid fa-magnifying-glass-chart"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                      Get Free Backlink Audit
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                      Discover competitor backlink gaps & toxic link score
                    </p>
                  </div>
                </div>

                {formSubmitted ? (
                  <div style={{
                    background: "#ecfdf5",
                    border: "1px solid #10b981",
                    borderRadius: "6px",
                    padding: "24px",
                    textAlign: "center"
                  }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: "2.4rem", color: "#10b981", marginBottom: "12px" }}></i>
                    <h4 style={{ color: "#065f46", fontWeight: 800, marginBottom: "8px" }}>Audit Request Received!</h4>
                    <p style={{ color: "#047857", fontSize: "0.9rem", margin: 0 }}>
                      Abdullah will inspect your website and send a detailed backlink diagnostic report to your WhatsApp/Phone within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Tanvir Ahmed"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          color: "#0f172a",
                          fontSize: "0.95rem"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        WhatsApp or Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +880 1700-000000"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          color: "#0f172a",
                          fontSize: "0.95rem"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Website URL *
                      </label>
                      <input
                        type="url"
                        name="website"
                        required
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="e.g. https://yourwebsite.com"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          color: "#0f172a",
                          fontSize: "0.95rem"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Target Backlink Goal
                      </label>
                      <select
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          background: "#ffffff",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          color: "#0f172a",
                          fontSize: "0.95rem"
                        }}
                      >
                        <option value="Starter Brand Authority (৳15,000)">Starter Brand Authority (৳15,000)</option>
                        <option value="High DA Growth Accelerator (৳30,000)">High DA Growth Accelerator (৳30,000)</option>
                        <option value="Authority Domination (৳55,000)">Authority Domination (৳55,000)</option>
                        <option value="Custom High DR Editorial Outreach">Custom High DR Editorial Outreach</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#0062d2",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: 700,
                        fontSize: "0.98rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0, 98, 210, 0.25)"
                      }}
                    >
                      <i className="fa-solid fa-paper-plane" style={{ marginRight: "8px" }}></i>
                      Request Free Backlink Audit
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS HIGHLIGHT STRIP */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "28px 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0062d2" }}>DA 85+</div>
              <div style={{ fontSize: "0.86rem", color: "#64748b", fontWeight: 600 }}>Average Domain Authority</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#059669" }}>100%</div>
              <div style={{ fontSize: "0.86rem", color: "#64748b", fontWeight: 600 }}>Manual White-Hat Outreach</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#d97706" }}>0% Spam</div>
              <div style={{ fontSize: "0.86rem", color: "#64748b", fontWeight: 600 }}>PBN &amp; Bot-Free Guarantee</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0062d2" }}>100+</div>
              <div style={{ fontSize: "0.86rem", color: "#64748b", fontWeight: 600 }}>Satisfied Brands Ranked #1</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPREHENSIVE OVERVIEW & 7 QUALITY FILTERS */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span style={{ 
                display: "inline-block",
                background: "#eff6ff",
                color: "#0062d2",
                padding: "4px 14px",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                border: "1px solid #dbeafe",
                marginBottom: "10px"
              }}>
                Search Authority Engine
              </span>
              <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 16px", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                Why High DA Backlinks are Mandatory to Win in Bangladesh Search
              </h2>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#334155", marginBottom: "16px" }}>
                In modern semantic search, Google evaluates your <strong>Topical Entity Authority</strong> by measuring the number and caliber of authoritative web publications that endorse your content through contextual hyperlinks.
              </p>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#334155", marginBottom: "24px" }}>
                Cheap automated backlinks from software tools and spam networks will trigger catastrophic algorithmic penalties. My bespoke <strong>Backlink Service in Bangladesh</strong> executes surgical, 100% manual outreach to real industry publishers with active human traffic—passing clean, compounding PageRank that transforms your website into an untouchable market leader.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "26px" }}>
                <div style={{ background: "#ffffff", padding: "18px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <i className="fa-solid fa-chart-line" style={{ color: "#0062d2", fontSize: "1.4rem", marginBottom: "8px", display: "block" }}></i>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>PageRank Passing</h4>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Direct ranking juice from high DR domains.</p>
                </div>
                <div style={{ background: "#ffffff", padding: "18px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <i className="fa-solid fa-robot" style={{ color: "#0062d2", fontSize: "1.4rem", marginBottom: "8px", display: "block" }}></i>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>AI Citation Signals</h4>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Cited by ChatGPT Search &amp; Google AI Overviews.</p>
                </div>
              </div>

              <Link
                href="/high-da-backlinks"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#0062d2",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  textDecoration: "underline"
                }}
              >
                Explore Free 1,000+ High DA Backlink Lists <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="col-lg-6" style={{ marginTop: "24px" }}>
              <div style={{
                background: "#ffffff",
                borderRadius: "8px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "18px" }}>
                  <i className="fa-solid fa-shield-check" style={{ color: "#059669", marginRight: "8px" }}></i>
                  The 7 Quality Filters Every Link Must Pass
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    { title: "Domain Rating (DR 40-90+)", desc: "Vetted through live Ahrefs and Moz authority databases." },
                    { title: "Real Organic Traffic (5,000+ Visits)", desc: "Publisher domains must have verified monthly organic visitors." },
                    { title: "Topical Niche Relevance", desc: "Placements match your exact industry or related commercial verticals." },
                    { title: "Spam Score Below 2%", desc: "Guaranteed free from link farm networks and toxic link histories." },
                    { title: "Natural In-Content Context", desc: "Anchors placed inside informative, handwritten 1,000+ word guides." },
                    { title: "Clean Outbound Link Profile", desc: "Sites that do not participate in link selling schemes or casino spam." },
                    { title: "Google Cache & Fast Indexing", desc: "Verified active crawlability and indexation in Google SERPs." }
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                      <i className="fa-solid fa-check" style={{ color: "#0062d2", marginTop: "4px", fontSize: "0.9rem" }}></i>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{item.title}: </strong>
                        <span style={{ color: "#64748b", fontSize: "0.9rem" }}>{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE BENEFITS (Small Box Design) */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Measurable SEO Advantages
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              How High-Authority Backlinks Transform Your Organic Growth
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              Strategic link acquisition built to elevate search rankings, referral revenues, and brand authority simultaneously.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {benefits.map((b, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "22px 20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      color: "#0062d2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.05rem",
                      border: "1px solid #dbeafe"
                    }}>
                      <i className={`fa-solid ${b.icon}`}></i>
                    </div>
                    <span style={{
                      background: "#f1f5f9",
                      color: "#0062d2",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      border: "1px solid #e2e8f0"
                    }}>
                      {b.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
                <div style={{
                  marginTop: "14px",
                  paddingTop: "12px",
                  borderTop: "1px dashed #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  color: "#059669"
                }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "0.82rem", color: "#059669" }}></i>
                  <span>{b.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BACKLINK CHANNELS ARSENAL (Minimal Box Card Design) */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Link Ecosystem
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              Backlink Channels We Build For Your Website
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              A balanced, multi-tier backlink arsenal engineered for natural link velocity and absolute algorithm safety.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {backlinkTypesIncluded.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "22px 20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      color: "#0062d2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.05rem",
                      border: "1px solid #dbeafe"
                    }}>
                      <i className={`fa-solid ${t.icon}`}></i>
                    </div>
                    <span style={{
                      background: "#f1f5f9",
                      color: "#0062d2",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      border: "1px solid #e2e8f0"
                    }}>
                      {t.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 6-STAGE EXECUTION BLUEPRINT (Minimal Box Card Design) */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Execution Process
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              Our 6-Stage White-Hat Link Building Blueprint
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              A systematic, manual workflow engineered to turn zero link authority into sustainable top-tier Google rankings.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {processSteps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "22px 20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      color: "#0062d2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.05rem",
                      border: "1px solid #dbeafe"
                    }}>
                      <i className={`fa-solid ${s.icon}`}></i>
                    </div>
                    <span style={{
                      background: "#f1f5f9",
                      color: "#0062d2",
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      border: "1px solid #e2e8f0",
                      letterSpacing: "0.02em"
                    }}>
                      STAGE {s.step}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
                <div style={{
                  marginTop: "14px",
                  paddingTop: "12px",
                  borderTop: "1px dashed #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  color: "#059669"
                }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "0.82rem", color: "#059669" }}></i>
                  <span>{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENT PRICING PACKAGES */}
      <section id="pricing-packages" className="section digi-pricing-section" style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Transparent Investment
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              High DA Backlink Packages &amp; Pricing in Bangladesh
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              100% white-hat manual outreach, transparent live reporting, and permanent link equity.
            </p>
          </div>

          <div className="digi-pricing-grid">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`digi-pricing-card${pkg.isPopular ? " featured" : ""}`}>
                <div className="pricing-card-header">
                  <h4>{pkg.name}</h4>
                  <div className="pricing-card-price">{pkg.usdPrice}<span>{pkg.period}</span></div>
                </div>
                <div className="pricing-card-badges">
                  {pkg.badges.map((b) => <span key={b}>{b}</span>)}
                </div>
                <ul className="pricing-card-features">
                  {pkg.features.map((feat) => (
                    <li key={feat}><i className="fa-solid fa-check"></i> {feat}</li>
                  ))}
                </ul>
                <div className="pricing-card-footer">
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello Abdullah! I want to order the "${pkg.name}" (${pkg.usdPrice} / ${pkg.bdtPrice}) backlink package. Please share payment instructions and onboarding details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${pkg.isPopular ? "btn-royal" : "btn-aqua-solid"} btn-block`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      width: "100%"
                    }}
                  >
                    <span>Get Started</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMPARISON TABLE */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Quality Comparison
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              Manual White-Hat Outreach vs. Cheap Automated PBNs
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              Why cutting corners with cheap backlink packages will destroy your website&apos;s organic rankings.
            </p>
          </div>

          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "14px 18px", fontWeight: 800, color: "#0f172a", width: "30%" }}>Quality Dimension</th>
                    <th style={{ padding: "14px 18px", fontWeight: 800, color: "#0062d2", background: "#eff6ff", width: "35%" }}>
                      <i className="fa-solid fa-crown" style={{ marginRight: "6px" }}></i> Abdullah BD SEO White-Hat
                    </th>
                    <th style={{ padding: "14px 18px", fontWeight: 800, color: "#64748b", width: "35%" }}>
                      Cheap Spam Agencies &amp; Bots
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9", background: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                      <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0f172a" }}>{row.feature}</td>
                      <td style={{ padding: "14px 18px", color: "#059669", fontWeight: 600, background: idx % 2 === 0 ? "#f0fdf4" : "#ecfdf5" }}>
                        <i className="fa-solid fa-circle-check" style={{ marginRight: "8px" }}></i>
                        {row.ourService}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#dc2626" }}>
                        <i className="fa-solid fa-circle-xmark" style={{ marginRight: "8px" }}></i>
                        {row.cheapSpam}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 9. REAL CLIENT CASE STUDIES */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Proven Track Record
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              Real Organic Authority &amp; Revenue Results
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              Explore how our link building strategy helped businesses rank #1 and scale commercial leads.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "22px 20px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h3 style={{ fontSize: "1.12rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {cs.brand}
                    </h3>
                    <span style={{ fontSize: "0.74rem", background: "#eff6ff", color: "#0062d2", fontWeight: 700, padding: "3px 8px", borderRadius: "4px", border: "1px solid #dbeafe" }}>
                      {cs.location}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginBottom: "14px" }}>
                    {cs.industry}
                  </div>

                  <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "6px", marginBottom: "14px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#0062d2", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.03em" }}>
                      Key Results:
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {cs.results.map((r, rIdx) => (
                        <li key={rIdx} style={{ fontSize: "0.83rem", fontWeight: 700, color: "#059669", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <i className="fa-solid fa-arrow-trend-up" style={{ fontSize: "0.78rem" }}></i>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p style={{ fontSize: "0.865rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    {cs.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CLIENT TESTIMONIALS */}
      <section style={{ padding: "70px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Client Feedback
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              What Business Owners Say About Our Link Building
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              Real organic ranking growth delivered to businesses in Bangladesh and worldwide.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "22px 20px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)"
                }}
              >
                <div>
                  <div style={{ color: "#f59e0b", fontSize: "0.82rem", marginBottom: "12px" }}>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, fontStyle: "italic", marginBottom: "16px" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px dashed #e2e8f0", paddingTop: "12px" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#0062d2",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.88rem"
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {t.name}
                    </h4>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>
                      {t.role} &bull; {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 20px" }}>
          <div className="text-center" style={{ marginBottom: "40px" }}>
            <span style={{ 
              display: "inline-block",
              background: "#eff6ff",
              color: "#0062d2",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid #dbeafe",
              marginBottom: "10px"
            }}>
              Common Questions
            </span>
            <h2 style={{ fontSize: "2.15rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 10px", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions About Backlinks
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", margin: 0 }}>
              Everything you need to know about our link building process, timelines, and guarantees.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(15, 23, 42, 0.02)"
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    color: activeFaq === idx ? "#0062d2" : "#0f172a"
                  }}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`fa-solid ${activeFaq === idx ? "fa-minus" : "fa-plus"}`}
                    style={{ color: activeFaq === idx ? "#0062d2" : "#94a3b8", fontSize: "0.82rem", marginLeft: "12px" }}
                  ></i>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: "0 20px 16px", color: "#475569", fontSize: "0.9rem", lineHeight: 1.65, borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. HIGH IMPACT BOTTOM CTA BANNER */}
      <section style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #e0f2fe 100%)",
        padding: "70px 0",
        textAlign: "center"
      }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>
          <span style={{
            display: "inline-block",
            background: "#eff6ff",
            border: "1px solid #dbeafe",
            color: "#0062d2",
            padding: "5px 14px",
            borderRadius: "4px",
            fontSize: "0.82rem",
            fontWeight: 700,
            marginBottom: "14px"
          }}>
            Ready to Dominate Google Page 1?
          </span>

          <h2 style={{ fontSize: "2.3rem", fontWeight: 800, lineHeight: 1.25, color: "#0f172a", marginBottom: "14px" }}>
            Start Building High DA Link Authority That Drives Real Revenue
          </h2>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.7, marginBottom: "30px" }}>
            Get in touch with Abdullah today for a free backlink gap audit, custom publisher outreach list, and a tailored growth strategy for your business.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Abdullah! I want to start building High DA backlinks for my website. Let's discuss.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glossy-green"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                padding: "14px 32px",
                fontSize: "1rem"
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.2rem" }}></i>
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="btn btn-outline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: "#0062d2",
                border: "1px solid #0062d2",
                padding: "14px 28px",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none"
              }}
            >
              <i className="fa-solid fa-envelope"></i>
              <span>Send Project Details</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
