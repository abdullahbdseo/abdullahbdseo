import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Frequently Asked Questions (FAQ) | SEO & AI Search Services | ${siteSettings.site_name}`,
  description: `Comprehensive answers to top questions regarding technical SEO audits, Generative Engine Optimization (GEO), AI search visibility (ChatGPT, Perplexity, Gemini), pricing plans, and organic ranking timelines by Abdullah.`,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `Frequently Asked Questions | ${siteSettings.site_name}`,
    description: `Everything you need to know about technical SEO audits, AI search optimization (GEO/AEO), deliverables, and pricing with SEO specialist Abdullah.`,
    url: "/faq",
    type: "website",
  },
};

export default function FaqLayout({ children }) {
  return children;
}
