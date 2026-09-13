// app/layout.js - Master Application Layout

import "@/styles/globals.css";
import ClientLayout from "@/components/ClientLayout";
import { siteSettings } from "@/lib/data";

export const metadata = {
  metadataBase: new URL("https://abdullahbdseo.vercel.app"),
  title: `${siteSettings.site_name} | ${siteSettings.site_tagline}`,
  description: siteSettings.default_meta_description,
  keywords: siteSettings.default_meta_keywords,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "4925bdb84133c801",
    other: {
      "msvalidate.01": "54462B6F7851B1AB224B911E4919792C",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/images/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/logo-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: `${siteSettings.site_name} | ${siteSettings.site_tagline}`,
    description: siteSettings.default_meta_description,
    url: "https://abdullahbdseo.vercel.app",
    siteName: siteSettings.site_name,
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: siteSettings.site_name
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.site_name} | ${siteSettings.site_tagline}`,
    description: siteSettings.default_meta_description,
    images: ["/images/seo_hero_3d.png"],
    creator: "@abdullahsaleh_seo",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "Organization", "LocalBusiness"],
        "@id": "https://abdullahbdseo.vercel.app/#organization",
        "name": siteSettings.site_name,
        "alternateName": ["Abdullah BD SEO", "Best SEO Expert in Bangladesh", "Abdullah Saleh SEO"],
        "url": "https://abdullahbdseo.vercel.app",
        "logo": "https://abdullahbdseo.vercel.app/images/logo.svg",
        "image": "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
        "description": siteSettings.default_meta_description,
        "telephone": siteSettings.contact_phone || "+8801670769816",
        "email": siteSettings.contact_email || "abdullahbd.seo@gmail.com",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mirpur DOHS / Gulshan",
          "addressLocality": "Dhaka",
          "addressRegion": "Dhaka Division",
          "postalCode": "1216",
          "addressCountry": "BD"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 23.8103,
          "longitude": 90.4125
        },
        "areaServed": [
          { "@type": "Country", "name": "Bangladesh" },
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "Australia" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "knowsAbout": [
          "Search Engine Optimization (SEO)",
          "Technical SEO Auditing",
          "Generative Engine Optimization (GEO)",
          "Answer Engine Optimization (AEO)",
          "Core Web Vitals Optimization",
          "Local Map Pack SEO",
          "Ecommerce SEO & Shopify Strategy",
          "Semantic Keyword Clustering & Topic Silos"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": [
          siteSettings.social_linkedin,
          siteSettings.social_twitter,
          siteSettings.social_github,
          siteSettings.social_youtube
        ].filter(Boolean)
      },
      {
        "@type": "Person",
        "@id": "https://abdullahbdseo.vercel.app/#person",
        "name": siteSettings.expert_name,
        "jobTitle": siteSettings.expert_title,
        "description": siteSettings.expert_bio,
        "url": "https://abdullahbdseo.vercel.app",
        "image": "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
        "gender": "Male",
        "nationality": "Bangladeshi",
        "worksFor": {
          "@id": "https://abdullahbdseo.vercel.app/#organization"
        },
        "knowsAbout": [
          "Search Engine Optimization",
          "AI Search & LLM Retrieval",
          "Technical SEO Engineering",
          "Google Search Console & Analytics",
          "E-Commerce Organic Scaling"
        ],
        "sameAs": [
          siteSettings.social_linkedin,
          siteSettings.social_twitter,
          siteSettings.social_github,
          siteSettings.social_youtube
        ].filter(Boolean)
      },
      {
        "@type": "WebSite",
        "@id": "https://abdullahbdseo.vercel.app/#website",
        "url": "https://abdullahbdseo.vercel.app",
        "name": siteSettings.site_name,
        "alternateName": ["Abdullah BD SEO", "Abdullah Saleh SEO", "abdullahbdseo"],
        "description": siteSettings.default_meta_description,
        "publisher": {
          "@id": "https://abdullahbdseo.vercel.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://abdullahbdseo.vercel.app/blog?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://abdullahbdseo.vercel.app/#siteNavigation",
        "name": "Site Navigation",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "SEO Services",
            "description": "Enterprise and Local SEO Solutions in Bangladesh",
            "url": "https://abdullahbdseo.vercel.app/services"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Free SEO Tools",
            "description": "Free Technical SEO, Auditing, and ROI Calculators",
            "url": "https://abdullahbdseo.vercel.app/tools"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Pricing & Packages",
            "description": "Monthly SEO Retainers and Growth Subscriptions",
            "url": "https://abdullahbdseo.vercel.app/pricing"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "About Abdullah Saleh",
            "description": "Background, Experience, and Verified Client Reviews",
            "url": "https://abdullahbdseo.vercel.app/about"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "SEO Insights Blog",
            "description": "Actionable Guides on Technical SEO, AEO, and AI Search",
            "url": "https://abdullahbdseo.vercel.app/blog"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": "Contact & Audit Proposal",
            "description": "Get in Touch for a Customized Website SEO Audit",
            "url": "https://abdullahbdseo.vercel.app/contact"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/images/logo-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
