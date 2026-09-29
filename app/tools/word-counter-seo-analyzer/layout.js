import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Word Counter & SEO Content Analyzer | Real-Time Readability`,
  description: `Free online word counter, character counter, SEO meta title & description length checker, keyword density analyzer, and Flesch reading ease calculator.`,
  alternates: {
    canonical: "/tools/word-counter-seo-analyzer",
  },
  openGraph: {
    title: `Word Counter & SEO Content Analyzer | Real-Time Readability`,
    description: `Free online word counter, character counter, SEO meta title & description length checker, keyword density analyzer, and Flesch reading ease calculator.`,
    url: "/tools/word-counter-seo-analyzer",
    type: "website",
  },
};

export default function WordCounterSeoAnalyzerLayout({ children }) {
  return children;
}
