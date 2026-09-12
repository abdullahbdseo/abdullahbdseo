import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Facebook & Meta Ads ROI Calculator | Meta Campaign Profitability | ${siteSettings.site_name}`,
  description: `Calculate return on investment, expected revenue, conversion rate, and ad spend efficiency for your Facebook and Instagram marketing campaigns.`,
  alternates: {
    canonical: "/tools/facebook-ads-roi-calculator",
  },
  openGraph: {
    title: `Facebook Ads ROI Calculator | ${siteSettings.site_name}`,
    description: `Evaluate Meta advertising profitability and return on ad spend.`,
    url: "/tools/facebook-ads-roi-calculator",
    type: "website",
  },
};

export default function FacebookAdsRoiCalculatorLayout({ children }) {
  return children;
}
