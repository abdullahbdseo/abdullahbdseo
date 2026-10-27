import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `AI SEO Service in Bangladesh | Next-Gen LLM Search Rank`,
  description: `Future-proof your brand for AI search engines (ChatGPT, Perplexity, Google AI Overviews). Semantic entity optimization & AI search rankings in Bangladesh.`,
  alternates: {
    canonical: "/services/ai-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `AI SEO Service in Bangladesh | Next-Gen LLM Search Rank`,
    description: `Future-proof your brand for AI search engines (ChatGPT, Perplexity, Google AI Overviews). Semantic entity optimization & AI search rankings in Bangladesh.`,
    url: "/services/ai-seo-service-in-bangladesh",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `AI SEO Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `AI SEO Service in Bangladesh | Next-Gen LLM Search Rank`,
    description: `Future-proof your brand for AI search engines (ChatGPT, Perplexity, Google AI Overviews). Semantic entity optimization & AI search rankings in Bangladesh.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function AiSeoLayout({ children }) {
  return children;
}
