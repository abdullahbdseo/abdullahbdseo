import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Google SERP Simulator & Snippet Preview | ${siteSettings.site_name}`,
  description: `Preview exactly how your title tags, meta descriptions, and URL structures will look in Google desktop and mobile search results before publishing.`,
  alternates: {
    canonical: "/tools/serp-simulator",
  },
  openGraph: {
    title: `Google SERP Simulator & Snippet Preview | ${siteSettings.site_name}`,
    description: `Preview exactly how your title tags, meta descriptions, and URL structures will look in Google desktop and mobile search results before publishing.`,
    url: "/tools/serp-simulator",
    type: "website",
  },
};

export default function SerpSimulatorLayout({ children }) {
  return children;
}
