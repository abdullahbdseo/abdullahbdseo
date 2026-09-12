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
    icon: "/images/favicon.svg",
    apple: "/images/logo-icon.svg"
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
        "@type": "ProfessionalService",
        "@id": "https://abdullahbdseo.vercel.app/#organization",
        "name": siteSettings.site_name,
        "url": "https://abdullahbdseo.vercel.app",
        "logo": "https://abdullahbdseo.vercel.app/images/logo.svg",
        "image": "https://abdullahbdseo.vercel.app/images/abdullah.jpg",
        "description": siteSettings.default_meta_description,
        "telephone": siteSettings.contact_phone,
        "email": siteSettings.contact_email,
        "priceRange": "$$$",
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
        "sameAs": [
          siteSettings.social_linkedin,
          siteSettings.social_twitter
        ].filter(Boolean)
      },
      {
        "@type": "WebSite",
        "@id": "https://abdullahbdseo.vercel.app/#website",
        "url": "https://abdullahbdseo.vercel.app",
        "name": siteSettings.site_name,
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
