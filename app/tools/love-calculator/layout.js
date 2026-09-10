import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Love Calculator – True Love & Compatibility Test | ${siteSettings.site_name}`,
  description: `Free online Love Calculator and Romance Compatibility Tester. Calculate couple love percentage, name matching score, zodiac chemistry, and relationship harmony insights.`,
  alternates: {
    canonical: "/tools/love-calculator",
  },
  openGraph: {
    title: `Love Compatibility Calculator | ${siteSettings.site_name}`,
    description: `Calculate your true love match percentage, couple compatibility, and romantic chemistry with our free interactive love calculator.`,
    url: "/tools/love-calculator",
    type: "website",
  },
};

export default function LoveCalculatorLayout({ children }) {
  return children;
}
