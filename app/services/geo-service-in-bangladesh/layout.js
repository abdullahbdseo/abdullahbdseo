import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `GEO Service in Bangladesh | Generative Engine Ranking`,
  description: `Get cited & recommended by AI engines. Enterprise GEO services in Bangladesh to optimize brand visibility across Google Gemini, ChatGPT, Claude & Perplexity.`,
  alternates: {
    canonical: "/services/geo-service-in-bangladesh",
  },
  openGraph: {
    title: `GEO Service in Bangladesh | Generative Engine Ranking`,
    description: `Get cited & recommended by AI engines. Enterprise GEO services in Bangladesh to optimize brand visibility across Google Gemini, ChatGPT, Claude & Perplexity.`,
    url: "/services/geo-service-in-bangladesh",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `GEO Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `GEO Service in Bangladesh | Generative Engine Ranking`,
    description: `Get cited & recommended by AI engines. Enterprise GEO services in Bangladesh to optimize brand visibility across Google Gemini, ChatGPT, Claude & Perplexity.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function GeoLayout({ children }) {
  return children;
}
