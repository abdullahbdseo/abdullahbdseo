import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Local SEO Service in Bangladesh | Top Google Map Pack Rank`,
  description: `Expert Local SEO Service in Bangladesh. Dominate Google Maps 3-Pack, optimize Google Business Profile, and drive high-intent local customer calls and leads.`,
  alternates: {
    canonical: "/services/local-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `Local SEO Service in Bangladesh | Top Google Map Pack Rank`,
    description: `Expert Local SEO Service in Bangladesh. Dominate Google Maps 3-Pack, optimize Google Business Profile, and drive high-intent local customer calls and leads.`,
    url: "/services/local-seo-service-in-bangladesh",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `Local SEO Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Local SEO Service in Bangladesh | Top Google Map Pack Rank`,
    description: `Expert Local SEO Service in Bangladesh. Dominate Google Maps 3-Pack, optimize Google Business Profile, and drive high-intent local customer calls and leads.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function LocalSeoLayout({ children }) {
  return children;
}
