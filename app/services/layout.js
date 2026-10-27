import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Services in Bangladesh | Technical, Local & AI SEO`,
  description: `Professional SEO services in Bangladesh by ${siteSettings.expert_name}. Dominate Google with data-driven Technical SEO, Local Maps ranking, and E-Commerce growth.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `SEO Services in Bangladesh | ${siteSettings.site_name}`,
    description: `Professional SEO services in Bangladesh by ${siteSettings.expert_name}. Dominate Google with data-driven Technical SEO, Local Maps ranking, and E-Commerce growth.`,
    url: "/services",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `SEO Services in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO Services in Bangladesh | Technical, Local & AI SEO`,
    description: `Professional SEO services in Bangladesh by ${siteSettings.expert_name}. Dominate Google with data-driven Technical SEO, Local Maps ranking, and E-Commerce growth.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
