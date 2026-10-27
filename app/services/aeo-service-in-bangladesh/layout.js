import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `AEO Service in Bangladesh | Answer Engine Optimization`,
  description: `Capture Google Featured Snippets, voice search answers, and Zero-Click searches with structured Answer Engine Optimization (AEO) services in Bangladesh.`,
  alternates: {
    canonical: "/services/aeo-service-in-bangladesh",
  },
  openGraph: {
    title: `AEO Service in Bangladesh | Answer Engine Optimization`,
    description: `Capture Google Featured Snippets, voice search answers, and Zero-Click searches with structured Answer Engine Optimization (AEO) services in Bangladesh.`,
    url: "/services/aeo-service-in-bangladesh",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `AEO Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `AEO Service in Bangladesh | Answer Engine Optimization`,
    description: `Capture Google Featured Snippets, voice search answers, and Zero-Click searches with structured Answer Engine Optimization (AEO) services in Bangladesh.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function AeoLayout({ children }) {
  return children;
}
