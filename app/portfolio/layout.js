import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Case Studies & Client Results Portfolio | ${siteSettings.site_name}`,
  description: `Explore verified Google Search Console ranking proofs, traffic growth screenshots, and detailed SEO case studies across e-commerce, local businesses, and global brands.`,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: `SEO Case Studies & Results | ${siteSettings.site_name}`,
    description: `Transparent proof of #1 rankings and exponential organic revenue growth.`,
    url: "/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({ children }) {
  return children;
}
