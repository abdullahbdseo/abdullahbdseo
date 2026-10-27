import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Pricing Packages in Bangladesh | ${siteSettings.site_name}`,
  description: `Transparent SEO pricing packages in Bangladesh. Choose Starter, Growth, or Enterprise monthly SEO retainers with clear deliverables and verified ROI.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `SEO Pricing Packages in Bangladesh | ${siteSettings.site_name}`,
    description: `Transparent SEO pricing packages in Bangladesh. Choose Starter, Growth, or Enterprise monthly SEO retainers with clear deliverables and verified ROI.`,
    url: "/pricing",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `SEO Pricing Packages in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO Pricing Packages in Bangladesh | ${siteSettings.site_name}`,
    description: `Transparent SEO pricing packages in Bangladesh. Choose Starter, Growth, or Enterprise monthly SEO retainers with clear deliverables and verified ROI.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function PricingLayout({ children }) {
  return children;
}
