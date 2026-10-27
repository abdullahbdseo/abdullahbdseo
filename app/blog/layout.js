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
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `SEO & AI Search Optimization Blog | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO & AI Search Optimization Blog | ${siteSettings.site_name}`,
    description: `Actionable SEO guides, AI search algorithm updates, and technical ranking strategies by ${siteSettings.expert_name}, leading SEO expert in Bangladesh.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function BlogLayout({ children }) {
  return children;
}
