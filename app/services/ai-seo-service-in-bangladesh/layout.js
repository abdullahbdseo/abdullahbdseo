import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `AI SEO Service in Bangladesh | Next-Gen AI Search & LLM Optimization`,
  description: `Future-proof your brand for AI search engines (ChatGPT, Google AI Overviews, Perplexity). Semantic entity optimization and AI answer engine rankings by ${siteSettings.expert_name}.`,
  alternates: {
    canonical: "/services/ai-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `AI SEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Optimize your brand presence for LLMs and generative search engines with cutting-edge AI SEO.`,
    url: "/services/ai-seo-service-in-bangladesh",
    type: "website",
  },
};

export default function AiSeoLayout({ children }) {
  return children;
}
