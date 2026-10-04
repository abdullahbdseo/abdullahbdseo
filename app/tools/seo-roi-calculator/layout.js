import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO ROI & Profit Calculator | Estimate Organic Search Return`,
  description: `Calculate your projected SEO Return on Investment (ROI), compare organic revenue vs. Google Ads PPC spend, and estimate monthly customer acquisition value.`,
  alternates: {
    canonical: "/tools/seo-roi-calculator",
  },
  openGraph: {
    title: `SEO ROI & Profit Calculator | Estimate Organic Search Return`,
    description: `Calculate your projected SEO Return on Investment (ROI), compare organic revenue vs. Google Ads PPC spend, and estimate monthly customer acquisition value.`,
    url: "/tools/seo-roi-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO ROI & Profit Calculator | Estimate Organic Search Return`,
    description: `Calculate your projected SEO Return on Investment (ROI), compare organic revenue vs. Google Ads PPC spend, and estimate monthly customer acquisition value.`,
  },
};
export default function SeoRoiCalculatorLayout({ children }) {
  return children;
}
