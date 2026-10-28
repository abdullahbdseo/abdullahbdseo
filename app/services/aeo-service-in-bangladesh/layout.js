import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `AEO Service in Bangladesh | Answer Engine Optimization & Voice Search`,
  description: `Specialized Answer Engine Optimization (AEO) service in Bangladesh. Capture Google featured snippets, voice search results, and conversational AI citation boxes.`,
  alternates: {
    canonical: "/services/aeo-service-in-bangladesh",
  },
  openGraph: {
    title: `AEO Service in Bangladesh | Answer Engine Optimization & Voice Search`,
    description: `Specialized Answer Engine Optimization (AEO) service in Bangladesh. Capture Google featured snippets, voice search results, and conversational AI citation boxes.`,
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
    title: `AEO Service in Bangladesh | Answer Engine Optimization & Voice Search`,
    description: `Specialized Answer Engine Optimization (AEO) service in Bangladesh. Capture Google featured snippets, voice search results, and conversational AI citation boxes.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function AeoLayout({ children }) {
  return children;
}
