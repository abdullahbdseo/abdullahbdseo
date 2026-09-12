import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO, AI Search & Growth Engineering Blog | ${siteSettings.site_name}`,
  description: `Actionable SEO guides, AI search algorithm updates, technical ranking strategies, and case studies published by SEO specialist ${siteSettings.expert_name}.`,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `SEO & AI Growth Blog | ${siteSettings.site_name}`,
    description: `Expert insights, latest Google algorithm changes, and advanced SEO blueprints.`,
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }) {
  return children;
}
