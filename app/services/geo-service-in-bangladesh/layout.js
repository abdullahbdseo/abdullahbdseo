import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `GEO Service in Bangladesh | Generative Engine Optimization`,
  description: `Leading Generative Engine Optimization (GEO) service in Bangladesh. Rank your brand in Google AI Overviews, Gemini, ChatGPT Search, and Perplexity answers.`,
  alternates: {
    canonical: "/services/geo-service-in-bangladesh",
  },
  openGraph: {
    title: `GEO Service in Bangladesh | Generative Engine Optimization`,
    description: `Leading Generative Engine Optimization (GEO) service in Bangladesh. Rank your brand in Google AI Overviews, Gemini, ChatGPT Search, and Perplexity answers.`,
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
    title: `GEO Service in Bangladesh | Generative Engine Optimization`,
    description: `Leading Generative Engine Optimization (GEO) service in Bangladesh. Rank your brand in Google AI Overviews, Gemini, ChatGPT Search, and Perplexity answers.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function GeoLayout({ children }) {
  return children;
}
