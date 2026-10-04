import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Custom Link Building Package Calculator & Instant Pricing | ${siteSettings.site_name}`,
  description: `Build your custom SEO backlink bundle across Profile Creation, Web 2.0, Bookmarks, PDF Embeds, and Guest Posts. Instant pricing in USD & BDT with 1-click order fulfillment.`,
  alternates: {
    canonical: "/tools/backlink-package-calculator"
  },
  openGraph: {
    title: `Custom Link Building Package Calculator | ${siteSettings.site_name}`,
    description: `Configure custom backlink quantities, select Tier-2 indexation boosters, and calculate real-time pricing for your SEO campaign.`,
    url: "/tools/backlink-package-calculator"
  }
  twitter: {
    card: "summary_large_image",
    title: `Custom Link Building Package Calculator | ${siteSettings.site_name}`,
    description: `Configure custom backlink quantities, select Tier-2 indexation boosters, and calculate real-time pricing for your SEO campaign.`,
  },
};
export default function BacklinkCalculatorLayout({ children }) {
  return <>{children}</>;
}
