import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Google Ads ROI & ROAS Calculator | ${siteSettings.site_name}`,
  description: `Calculate your Google Ads Return on Investment (ROI), Return on Ad Spend (ROAS), Cost Per Acquisition (CPA), and compare paid vs. organic SEO profitability.`,
  alternates: {
    canonical: "/tools/google-ads-roi-calculator",
  },
  openGraph: {
    title: `Google Ads ROI & ROAS Calculator | ${siteSettings.site_name}`,
    description: `Calculate your Google Ads Return on Investment (ROI), Return on Ad Spend (ROAS), Cost Per Acquisition (CPA), and compare paid vs. organic SEO profitability.`,
    url: "/tools/google-ads-roi-calculator",
    type: "website",
  },
};

export default function GoogleAdsRoiCalculatorLayout({ children }) {
  return children;
}
