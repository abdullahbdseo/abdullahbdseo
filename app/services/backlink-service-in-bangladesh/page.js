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
      title: "Explosive Domain Authority Growth",
      desc: "Safely skyrocket your website's Moz Domain Authority (DA) and Ahrefs Domain Rating (DR) to outrank legacy competitors in ultra-competitive niches."
    },
    {
      icon: "fa-shield-halved",
      title: "100% White-Hat & Penalty-Proof",
      desc: "Zero PBNs, zero spam scripts, zero link farms. Every backlink is hand-placed on verified real-traffic websites following Google Webmaster Guidelines."
    },
    {
      icon: "fa-bullseye",
      title: "Targeted Contextual Relevance",
      desc: "Links are embedded organically inside high-quality, niche-relevant articles matching your specific business industry and buyer search intent."
    },
    {
      icon: "fa-brain",
      title: "AI Search & Knowledge Graph Trust",
      desc: "Brand entity mentions and high-authority co-citations train AI search models (Google AI Overviews, ChatGPT Search, Perplexity) to cite your website as an expert source."
    },
    {
      icon: "fa-users-viewfinder",
      title: "High-Converting Referral Traffic",
      desc: "Quality backlinks placed on high-traffic publisher sites deliver real prospective customers and qualified leads directly to your conversion pages."
    },
    {
      icon: "fa-file-lines",
      title: "Transparent Live Excel Reports",
      desc: "Full transparency with detailed reports including live URLs, DR/DA scores, anchor texts, organic traffic metrics, and indexation guarantees."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Backlink Audit & Competitor Gap Analysis",
      desc: "We analyze your existing link profile, identify toxic spam links to disavow, and reverse-engineer your top 3 ranking competitors' backlink profiles."
    },
    {
      step: "02",
      title: "Prospecting & High DR Site Vetting",
      desc: "We identify real-traffic, niche-relevant websites with DR 40–90+, zero algorithmic penalties, and spam scores strictly under 2%."
    },
    {
      step: "03",
      title: "High-Quality Content Creation",
      desc: "Our native SEO copywriters craft original 1,000+ word informative articles with naturally embedded contextual anchors and semantic keywords."
    },
    {
      step: "04",
      title: "Manual Pitching & Editorial Outreach",
      desc: "We conduct 100% personalized manual email outreach to verified webmasters and editors to secure permanent contextual backlinks."
    },
    {
      step: "05",
      title: "Tier-2 Indexation Acceleration",
      desc: "We ping and drip-feed all published live links through Google-compliant indexing networks to ensure fast indexing within 7 to 14 days."
    },
    {
      step: "06",
      title: "Live Reporting & Rank Tracking",
      desc: "You receive a complete live Google Sheet report with all verified URLs and monthly ranking progression tracking in Google Search Console."
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
      name: "Starter Authority",
      bdtPrice: "৳15,000",
      usdPrice: "$125",
      badge: "Foundation Pack",
      desc: "Perfect for new websites or local businesses needing foundational domain trust and clean brand entity links.",
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
      name: "Growth Accelerator",
      bdtPrice: "৳30,000",
      usdPrice: "$250",
      badge: "Most Popular 🔥",
      desc: "Engineered for growing businesses and e-commerce stores wanting to dominate page 1 for competitive keywords.",
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
      name: "Authority Domination",
      bdtPrice: "৳55,000",
      usdPrice: "$450",
      badge: "Market Leader",
      desc: "Comprehensive monthly link-building campaign for hyper-competitive niches, enterprise brands, and global markets.",
      features: [
        "50+ Tier-1 Multi-Platform Authority Links",
        "18 Premium Editorial Guest Posts (DR 60-85+)",
        "4 High-Trust .EDU / .GOV Resource Links",
        "Digital PR Journalist Outreach Campaign",
        "Infographic & Data Visual Syndication",
        "Full Toxic Link Audit & Disavow File Setup",
        "Dedicated Senior Link Building Strategist",
        "Weekly Strategy Debrief Calls via WhatsApp/Meet"
      ],
      isPopular: false
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

  return (
    <div className="service-landing-page">
      
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

      {/* HERO SECTION */}
      <section style={{
        background: "linear-gradient(135deg, #090e17 0%, #0f172a 50%, #1e1b4b 100%)",
        color: "#ffffff",
        padding: "90px 0 80px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Glow Effects */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(67, 97, 238, 0.18) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-10%",
          right: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(70px)",
          pointerEvents: "none"
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" style={{ marginBottom: "24px" }}>
            <ol style={{ display: "flex", gap: "8px", listStyle: "none", padding: 0, margin: 0, fontSize: "0.88rem", color: "#94a3b8" }}>
              <li><Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link></li>
              <li>/</li>
              <li><Link href="/services" style={{ color: "#94a3b8", textDecoration: "none" }}>Services</Link></li>
              <li>/</li>
              <li style={{ color: "#38bdf8", fontWeight: 600 }}>Backlink Service in Bangladesh</li>
            </ol>
          </nav>

          <div className="row align-items-center">
            <div className="col-lg-7">
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(67, 97, 238, 0.15)",
                border: "1px solid rgba(67, 97, 238, 0.35)",
                padding: "8px 16px",
                borderRadius: "30px",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "#60a5fa",
                marginBottom: "20px"
              }}>
                <i className="fa-solid fa-link"></i> #1 High DA Link Building Specialist in Bangladesh
              </div>

              <h1 style={{
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "20px"
              }}>
                High DA <span style={{
                  background: "linear-gradient(135deg, #38bdf8 0%, #4361ee 50%, #818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Backlink Service in Bangladesh</span> for #1 Google Rankings
              </h1>

              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#cbd5e1",
                marginBottom: "32px",
                maxWidth: "640px"
              }}>
                Safely skyrocket your website&apos;s Domain Authority (DA/DR) and organic search rankings with <strong>100% white-hat, manual editorial outreach</strong> on high-traffic, real authority websites. Zero spam, zero PBNs, permanent placement, and fast indexation.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "36px" }}>
                <a
                  href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Abdullah! I am interested in your High DA Backlink Service in Bangladesh. Please share packages and a free backlink audit.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#25D366",
                    color: "#ffffff",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 15px rgba(37, 211, 102, 0.35)",
                    transition: "transform 0.2s ease"
                  }}
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.2rem" }}></i>
                  WhatsApp Free Consultation
                </a>

                <a
                  href="#pricing-packages"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "14px 26px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <i className="fa-solid fa-tags"></i> View Backlink Packages
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#10b981" }}></i> 100% White-Hat Manual Links
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#10b981" }}></i> DR 50–90+ Real Traffic Sites
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#10b981" }}></i> Zero Spam & PBN-Free
                </div>
              </div>

            </div>

            {/* QUICK AUDIT LEAD FORM */}
            <div className="col-lg-5" style={{ marginTop: "30px" }}>
              <div style={{
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #4361ee 0%, #06b6d4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "1.1rem"
                  }}>
                    <i className="fa-solid fa-magnifying-glass-chart"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                      Get Free Backlink Audit
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
                      Discover competitor backlink gaps & toxic link score
                    </p>
                  </div>
                </div>

                {formSubmitted ? (
                  <div style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid #10b981",
                    borderRadius: "10px",
                    padding: "24px",
                    textAlign: "center"
                  }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: "2.5rem", color: "#10b981", marginBottom: "12px" }}></i>
                    <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "8px" }}>Audit Request Received!</h4>
                    <p style={{ color: "#cbd5e1", fontSize: "0.9rem", margin: 0 }}>
                      Abdullah will inspect your website and send a detailed backlink diagnostic report to your WhatsApp/Phone within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
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
                          padding: "12px 14px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.95rem"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
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
                          padding: "12px 14px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.95rem"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
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
                          padding: "12px 14px",
                          background: "rgba(30, 41, 59, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.95rem"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        Target Backlink Service Goal
                      </label>
                      <select
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          background: "#1e293b",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.95rem"
                        }}
                      >
                        <option value="Starter Brand Authority (৳15,000)">Starter Brand Authority (৳15,000)</option>
                        <option value="High DA Growth Accelerator (৳30,000)">High DA Growth Accelerator (৳30,000)</option>
                        <option value="Authority Domination (৳55,000)">Authority Domination (৳55,000)</option>
                        <option value="Custom High DR Guest Post Outreach">Custom High DR Guest Post Outreach</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "linear-gradient(135deg, #4361ee 0%, #06b6d4 100%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(67, 97, 238, 0.4)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <i className="fa-solid fa-paper-plane" style={{ marginRight: "8px" }}></i> Request Free Backlink Audit
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS HIGHLIGHT STRIP */}
      <section style={{ background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "30px 0" }}>
        <div className="container">
          <div className="row text-center text-white gy-4">
            <div className="col-6 col-md-3">
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8" }}>DA 85+</div>
              <div style={{ fontSize: "0.88rem", color: "#94a3b8" }}>Average Domain Authority</div>
            </div>
            <div className="col-6 col-md-3">
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981" }}>100%</div>
              <div style={{ fontSize: "0.88rem", color: "#94a3b8" }}>Manual White-Hat Outreach</div>
            </div>
            <div className="col-6 col-md-3">
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f59e0b" }}>0% Spam</div>
              <div style={{ fontSize: "0.88rem", color: "#94a3b8" }}>PBN & Bot-Free Guarantee</div>
            </div>
            <div className="col-6 col-md-3">
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#818cf8" }}>100+</div>
              <div style={{ fontSize: "0.88rem", color: "#94a3b8" }}>Satisfied Brands Ranked #1</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE OVERVIEW & WHY BACKLINKS MATTER */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                The Engine of Google Authority
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "12px 0 20px" }}>
                Why High DA Backlinks are Mandatory to Win in Bangladesh Search
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#475569", marginBottom: "16px" }}>
                In 2026, search algorithms do not merely look at keyword density or on-page tags. Google evaluates your <strong>Topical Entity Authority</strong> by measuring the number and quality of authoritative websites that endorse your content through contextual hyperlinks.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#475569", marginBottom: "24px" }}>
                Cheap automated backlinks from software tools and spam networks will trigger catastrophic algorithmic penalties. My bespoke <strong>Backlink Service in Bangladesh</strong> executes surgical, 100% manual outreach to real industry publishers with active human traffic—passing clean, compounding PageRank that transforms your website into an untouchable market leader.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "30px" }}>
                <div style={{ background: "#ffffff", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <i className="fa-solid fa-chart-line" style={{ color: "#4361ee", fontSize: "1.4rem", marginBottom: "8px", display: "block" }}></i>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>PageRank Passing</h4>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Direct ranking juice from high DR domains.</p>
                </div>
                <div style={{ background: "#ffffff", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <i className="fa-solid fa-robot" style={{ color: "#06b6d4", fontSize: "1.4rem", marginBottom: "8px", display: "block" }}></i>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>AI Citation Signals</h4>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Cited by ChatGPT Search & Google AI Overviews.</p>
                </div>
              </div>

              <Link
                href="/high-da-backlinks"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#4361ee",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "underline"
                }}
              >
                Explore Free 1,000+ High DA Backlink Lists <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="col-lg-6" style={{ marginTop: "30px" }}>
              <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "36px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px" }}>
                  <i className="fa-solid fa-shield-check" style={{ color: "#10b981", marginRight: "8px" }}></i>
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
                    <li key={idx} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                      <i className="fa-solid fa-check" style={{ color: "#10b981", marginTop: "4px", fontSize: "0.9rem" }}></i>
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

      {/* CORE BENEFITS */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 50px" }}>
            <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Measurable SEO Advantages
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "10px 0" }}>
              How High-Authority Backlinks Transform Your Organic Growth
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              Strategic link acquisition built to elevate search rankings, referral revenues, and brand authority simultaneously.
            </p>
          </div>

          <div className="row gy-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div style={{
                  background: "#f8fafc",
                  borderRadius: "14px",
                  padding: "32px",
                  height: "100%",
                  border: "1px solid #e2e8f0",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #4361ee 0%, #06b6d4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "1.3rem",
                    marginBottom: "20px"
                  }}>
                    <i className={`fa-solid ${b.icon}`}></i>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACKLINK TYPES INCLUDED */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Diverse Link Building Arsenal
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "10px 0" }}>
              Backlink Channels We Build For Your Website
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              A balanced, multi-tier backlink ecosystem engineered for natural velocity and total algorithm compliance.
            </p>
          </div>

          <div className="row gy-4">
            {backlinkTypesIncluded.map((t, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "30px",
                  height: "100%",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "rgba(67, 97, 238, 0.1)",
                      color: "#4361ee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem"
                    }}>
                      <i className={`fa-solid ${t.icon}`}></i>
                    </div>
                    <span style={{
                      background: "#e0e7ff",
                      color: "#3730a3",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "20px"
                    }}>
                      {t.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-STEP PROCESS BLUEPRINT */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Methodical Execution
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "10px 0" }}>
              Our 6-Stage White-Hat Link Building Blueprint
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              How we take your website from zero link authority to industry-dominating search rankings.
            </p>
          </div>

          <div className="row gy-4">
            {processSteps.map((s, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div style={{
                  background: "#f8fafc",
                  borderRadius: "14px",
                  padding: "32px",
                  height: "100%",
                  border: "1px solid #e2e8f0",
                  position: "relative"
                }}>
                  <div style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "rgba(67, 97, 238, 0.15)",
                    position: "absolute",
                    top: "20px",
                    right: "24px"
                  }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "12px", maxWidth: "80%" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING PACKAGES */}
      <section id="pricing-packages" style={{ padding: "80px 0", background: "#0f172a", color: "#ffffff" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ color: "#38bdf8", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Transparent Investment
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#ffffff", margin: "10px 0" }}>
              High DA Backlink Packages &amp; Pricing in Bangladesh
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
              100% white-hat manual outreach, transparent live reporting, and permanent link equity.
            </p>
          </div>

          <div className="row gy-4 align-items-center">
            {packages.map((pkg, idx) => (
              <div key={idx} className="col-lg-4">
                <div style={{
                  background: pkg.isPopular ? "linear-gradient(135deg, #1e293b 0%, #1e1b4b 100%)" : "#1e293b",
                  borderRadius: "16px",
                  padding: "36px 30px",
                  border: pkg.isPopular ? "2px solid #4361ee" : "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  transform: pkg.isPopular ? "scale(1.04)" : "none",
                  boxShadow: pkg.isPopular ? "0 20px 40px rgba(67, 97, 238, 0.25)" : "none"
                }}>
                  {pkg.isPopular && (
                    <div style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, #4361ee 0%, #06b6d4 100%)",
                      color: "#ffffff",
                      padding: "4px 16px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Most Recommended
                    </div>
                  )}

                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px" }}>
                    {pkg.desc}
                  </p>

                  <div style={{ marginBottom: "24px", display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ fontSize: "2.4rem", fontWeight: 900, color: "#ffffff" }}>
                      {pkg.bdtPrice}
                    </span>
                    <span style={{ fontSize: "1rem", color: "#38bdf8", fontWeight: 600 }}>
                      / {pkg.usdPrice} USD
                    </span>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px" }}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: "flex", gap: "10px", marginBottom: "12px", fontSize: "0.9rem", color: "#cbd5e1" }}>
                        <i className="fa-solid fa-check" style={{ color: "#10b981", marginTop: "3px" }}></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello Abdullah! I want to order the "${pkg.name}" (${pkg.bdtPrice}) backlink package. Please share payment instructions and onboarding details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      padding: "14px",
                      background: pkg.isPopular ? "linear-gradient(135deg, #4361ee 0%, #06b6d4 100%)" : "rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      border: pkg.isPopular ? "none" : "1px solid rgba(255,255,255,0.2)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <i className="fa-brands fa-whatsapp" style={{ marginRight: "8px" }}></i>
                    Order {pkg.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE: OUR SERVICE VS CHEAP SPAMMERS */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Quality Comparison
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "10px 0" }}>
              Manual White-Hat Outreach vs. Cheap Automated PBNs
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              Why cutting corners with cheap $10 backlink packages will destroy your website&apos;s organic rankings.
            </p>
          </div>

          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "18px 24px", fontWeight: 700, width: "30%" }}>Quality Dimension</th>
                    <th style={{ padding: "18px 24px", fontWeight: 700, background: "#4361ee", width: "35%" }}>
                      <i className="fa-solid fa-crown" style={{ marginRight: "6px" }}></i> Abdullah BD SEO White-Hat
                    </th>
                    <th style={{ padding: "18px 24px", fontWeight: 700, background: "#334155", width: "35%" }}>
                      Cheap Spam Agencies &amp; Bots
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", background: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                      <td style={{ padding: "16px 24px", fontWeight: 700, color: "#0f172a" }}>{row.feature}</td>
                      <td style={{ padding: "16px 24px", color: "#10b981", fontWeight: 600 }}>
                        <i className="fa-solid fa-circle-check" style={{ marginRight: "8px" }}></i>
                        {row.ourService}
                      </td>
                      <td style={{ padding: "16px 24px", color: "#ef4444" }}>
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

      {/* CLIENT TESTIMONIALS & CASE STUDIES */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Client Success
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "10px 0" }}>
              What Business Owners Say About Our Link Building
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              Real organic ranking growth delivered to businesses in Bangladesh and worldwide.
            </p>
          </div>

          <div className="row gy-4">
            {testimonials.slice(0, 3).map((t, idx) => (
              <div key={idx} className="col-lg-4">
                <div style={{
                  background: "#f8fafc",
                  borderRadius: "14px",
                  padding: "30px",
                  height: "100%",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ color: "#f59e0b", fontSize: "0.9rem", marginBottom: "16px" }}>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, fontStyle: "italic", marginBottom: "20px" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
                    <div style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "#4361ee",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                        {t.name}
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                        {t.role} - {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="text-center" style={{ marginBottom: "50px" }}>
            <span style={{ color: "#4361ee", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Common Questions
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "10px 0" }}>
              Frequently Asked Questions About Backlinks
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              Everything you need to know about our link building process, timelines, and guarantees.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: activeFaq === idx ? "#4361ee" : "#0f172a"
                  }}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`fa-solid ${activeFaq === idx ? "fa-minus" : "fa-plus"}`}
                    style={{ color: activeFaq === idx ? "#4361ee" : "#94a3b8", fontSize: "0.9rem", marginLeft: "12px" }}
                  ></i>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: "0 24px 20px", color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL HIGH IMPACT CTA BANNER */}
      <section style={{
        background: "linear-gradient(135deg, #090e17 0%, #1e1b4b 100%)",
        color: "#ffffff",
        padding: "80px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "760px" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(67, 97, 238, 0.2)",
            color: "#60a5fa",
            padding: "6px 16px",
            borderRadius: "30px",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "16px"
          }}>
            Ready to Dominate Google Page 1?
          </span>

          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "16px" }}>
            Start Building High DA Link Authority That Actually Drives Revenue
          </h2>

          <p style={{ fontSize: "1.1rem", color: "#cbd5e1", lineHeight: 1.7, marginBottom: "36px" }}>
            Get in touch with Abdullah today for a free backlink gap audit, custom publisher outreach list, and a tailored growth strategy for your business.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Abdullah! I want to start building High DA backlinks for my website. Let's discuss.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#25D366",
                color: "#ffffff",
                padding: "16px 36px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)"
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.3rem" }}></i>
              Chat on WhatsApp
            </a>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "16px 30px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "1.05rem",
                textDecoration: "none"
              }}
            >
              <i className="fa-solid fa-envelope"></i>
              Send Project Details
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
