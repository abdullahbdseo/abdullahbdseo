import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Love Calculator & Compatibility Test | ${siteSettings.site_name}`,
  description: `Free online Love Calculator & Compatibility Tester. Calculate relationship percentage, name matching scores, and love horoscope compatibility instantly.`,
  alternates: {
    canonical: "/tools/love-calculator",
  },
  openGraph: {
    title: `Love Calculator & Compatibility Test | ${siteSettings.site_name}`,
    description: `Free online Love Calculator & Compatibility Tester. Calculate relationship percentage, name matching scores, and love horoscope compatibility instantly.`,
    url: "/tools/love-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Love Calculator & Compatibility Test | ${siteSettings.site_name}`,
    description: `Free online Love Calculator & Compatibility Tester. Calculate relationship percentage, name matching scores, and love horoscope compatibility instantly.`,
  },
};
export default function LoveCalculatorLayout({ children }) {
  return children;
}
