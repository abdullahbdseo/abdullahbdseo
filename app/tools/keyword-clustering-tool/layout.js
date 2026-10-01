import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Keyword Clustering & Grouping Tool | ${siteSettings.site_name}`,
  description: `Group and cluster hundreds of keywords into semantic content topic clusters and search intent silos. Export cluster outlines to CSV, Markdown, and Content Briefs.`,
  alternates: {
    canonical: "/tools/keyword-clustering-tool",
  },
  openGraph: {
    title: `SEO Keyword Clustering & Grouping Tool | ${siteSettings.site_name}`,
    description: `Group and cluster hundreds of keywords into semantic content topic clusters and search intent silos. Export cluster outlines to CSV, Markdown, and Content Briefs.`,
    url: "/tools/keyword-clustering-tool",
    type: "website",
  },
};

export default function KeywordClusteringLayout({ children }) {
  return children;
}
