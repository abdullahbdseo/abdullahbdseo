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
  },
};

export default function PricingLayout({ children }) {
  return children;
}
