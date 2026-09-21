import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO & AI Search Optimization Blog | ${siteSettings.site_name}`,
  description: `Actionable SEO guides, AI search algorithm updates, and technical ranking strategies by ${siteSettings.expert_name}, leading SEO expert in Bangladesh.`,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `SEO & AI Search Optimization Blog | ${siteSettings.site_name}`,
    description: `Actionable SEO guides, AI search algorithm updates, and technical ranking strategies by ${siteSettings.expert_name}, leading SEO expert in Bangladesh.`,
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }) {
  return children;
}
