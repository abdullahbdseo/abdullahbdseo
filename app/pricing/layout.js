import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Pricing Packages & Monthly Retainers | ${siteSettings.site_name}`,
  description: `Transparent SEO pricing plans in Bangladesh. Choose from Starter, Growth, and Enterprise monthly SEO retainer packages with clear deliverables, no hidden fees, and verified ROI.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `SEO Pricing Plans & Packages | ${siteSettings.site_name}`,
    description: `Transparent, performance-oriented monthly SEO retainer plans engineered to grow your search traffic and sales.`,
    url: "/pricing",
    type: "website",
  },
};

export default function PricingLayout({ children }) {
  return children;
}
