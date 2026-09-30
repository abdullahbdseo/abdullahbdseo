import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Friendly URL Slug & Permalink Generator | Free SEO Tool`,
  description: `Convert titles, headlines, and text into clean, Google-optimized URL slugs and permalinks. Strip stop words, customize separators, and bulk convert in 1-click.`,
  alternates: {
    canonical: "/tools/url-slug-generator",
  },
  openGraph: {
    title: `SEO Friendly URL Slug & Permalink Generator | Free SEO Tool`,
    description: `Convert titles, headlines, and keywords into clean, lowercase, stopword-free URL slugs and permalinks.`,
    url: "/tools/url-slug-generator",
    type: "website",
  },
};

export default function UrlSlugGeneratorLayout({ children }) {
  return children;
}
