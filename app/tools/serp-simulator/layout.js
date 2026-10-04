import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Google SERP Simulator & Snippet Preview Tool | ${siteSettings.site_name}`,
  description: `Pixel-accurate Google SERP simulator. Preview your title tags, meta descriptions, and URL on Google Desktop, Mobile & AI Overview — plus Facebook, Twitter/X, LinkedIn, and WhatsApp social cards. Free with 1-click meta tag generator.`,
  alternates: {
    canonical: "/tools/serp-simulator",
  },
  openGraph: {
    title: `Google SERP Simulator & Snippet Preview Tool | ${siteSettings.site_name}`,
    description: `Pixel-accurate Google SERP simulator. Preview your title tags, meta descriptions, and URL on Google Desktop, Mobile & AI Overview — plus Facebook, Twitter/X, LinkedIn, and WhatsApp social cards. Free with 1-click meta tag generator.`,
    url: "/tools/serp-simulator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Google SERP Simulator & Snippet Preview Tool | ${siteSettings.site_name}`,
    description: `Pixel-accurate Google SERP simulator. Preview your title tags, meta descriptions, and URL on Google Desktop, Mobile & AI Overview — plus Facebook, Twitter/X, LinkedIn, and WhatsApp social cards. Free with 1-click meta tag generator.`,
  },
};
export default function SerpSimulatorLayout({ children }) {
  return children;
}
