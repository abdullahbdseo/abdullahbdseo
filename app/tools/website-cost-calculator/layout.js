import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Website Development & SEO Cost Calculator Bangladesh | ${siteSettings.site_name}`,
  description: `Calculate the estimated budget for custom website development, e-commerce stores, and monthly SEO campaigns in Bangladesh with our interactive cost estimator.`,
  alternates: {
    canonical: "/tools/website-cost-calculator",
  },
  openGraph: {
    title: `Website & SEO Cost Calculator | ${siteSettings.site_name}`,
    description: `Estimate project budgets for custom websites and organic SEO packages in Bangladesh.`,
    url: "/tools/website-cost-calculator",
    type: "website",
  },
};

export default function WebsiteCostCalculatorLayout({ children }) {
  return children;
}
