import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Generative Engine Optimization (GEO) Service in Bangladesh`,
  description: `Get cited and recommended by AI answer engines. Enterprise GEO services designed to optimize brand authority across Google Gemini, ChatGPT, Claude, and Perplexity.`,
  alternates: {
    canonical: "/services/geo-service-in-bangladesh",
  },
  openGraph: {
    title: `GEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Position your company as the authoritative answer across generative AI search platforms.`,
    url: "/services/geo-service-in-bangladesh",
    type: "website",
  },
};

export default function GeoLayout({ children }) {
  return children;
}
