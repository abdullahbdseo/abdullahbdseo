import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Facebook & Meta Ads ROI Calculator | ${siteSettings.site_name}`,
  description: `Calculate return on investment, expected revenue, conversion rate, and ad spend efficiency for your Facebook and Instagram marketing campaigns.`,
  alternates: {
    canonical: "/tools/facebook-ads-roi-calculator",
  },
  openGraph: {
    title: `Facebook & Meta Ads ROI Calculator | ${siteSettings.site_name}`,
    description: `Calculate return on investment, expected revenue, conversion rate, and ad spend efficiency for your Facebook and Instagram marketing campaigns.`,
    url: "/tools/facebook-ads-roi-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Facebook & Meta Ads ROI Calculator | ${siteSettings.site_name}`,
    description: `Calculate return on investment, expected revenue, conversion rate, and ad spend efficiency for your Facebook and Instagram marketing campaigns.`,
  },
};
export default function FacebookAdsRoiCalculatorLayout({ children }) {
  return children;
}
