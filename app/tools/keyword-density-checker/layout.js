import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Keyword Density & TF-IDF Checker | ${siteSettings.site_name}`,
  description: `Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density ratios in your articles to prevent keyword stuffing and optimize for semantic search.`,
  alternates: {
    canonical: "/tools/keyword-density-checker",
  },
  openGraph: {
    title: `Free Keyword Density & TF-IDF Checker | ${siteSettings.site_name}`,
    description: `Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density ratios in your articles to prevent keyword stuffing and optimize for semantic search.`,
    url: "/tools/keyword-density-checker",
    type: "website",
  },
};

export default function KeywordDensityCheckerLayout({ children }) {
  return children;
}
