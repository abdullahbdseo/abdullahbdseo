import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `High DA Backlinks Free List & Resource Guide | ${siteSettings.site_name}`,
  description: `Access free high DA/DR dofollow backlink sites, Web 2.0 list, profile backlinks, and guest posting opportunities to boost your Google authority.`,
  alternates: {
    canonical: "/high-da-backlinks",
  },
  openGraph: {
    title: `High DA Backlinks Free List & Resource Guide | ${siteSettings.site_name}`,
    description: `Access free high DA/DR dofollow backlink sites, Web 2.0 list, profile backlinks, and guest posting opportunities to boost your Google authority.`,
    url: "/high-da-backlinks",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `High DA Backlinks Free List & Resource Guide | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `High DA Backlinks Free List & Resource Guide | ${siteSettings.site_name}`,
    description: `Access free high DA/DR dofollow backlink sites, Web 2.0 list, profile backlinks, and guest posting opportunities to boost your Google authority.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function HighDaBacklinksLayout({ children }) {
  return children;
}
