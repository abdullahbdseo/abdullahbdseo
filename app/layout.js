// app/layout.js - Master Application Layout

import "@/styles/globals.css";
import ClientLayout from "@/components/ClientLayout";
import { siteSettings } from "@/lib/data";

export const metadata = {
  metadataBase: new URL("https://abdullahbdseo.vercel.app"),
  title: `${siteSettings.site_name} | ${siteSettings.site_tagline}`,
  description: siteSettings.default_meta_description,
  keywords: siteSettings.default_meta_keywords,
  verification: {
    google: "4925bdb84133c801",
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
  }
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteSettings.site_name,
    "url": "https://seoservice.local",
    "logo": "https://seoservice.local/images/logo.svg",
    "image": "https://seoservice.local/images/abdullah.jpg",
    "description": siteSettings.default_meta_description,
    "telephone": siteSettings.contact_phone,
    "email": siteSettings.contact_email,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Silicon Oasis Tech Park, Suite 402",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    }
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
