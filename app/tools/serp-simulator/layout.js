import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Google SERP Simulator & Snippet Preview Tool | ${siteSettings.site_name}`,
  description: `Preview exactly how your title tags, meta descriptions, and URL structures will look in Google desktop and mobile search results before publishing.`,
  alternates: {
    canonical: "/tools/serp-simulator",
  },
  openGraph: {
    title: `Google SERP Snippet Simulator | ${siteSettings.site_name}`,
    description: `Test and preview your title tag and meta description pixel lengths in Google search results.`,
    url: "/tools/serp-simulator",
    type: "website",
  },
};

export default function SerpSimulatorLayout({ children }) {
  return children;
}
