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
  },
  twitter: {
    card: "summary_large_image",
    title: `High DA Backlinks Free List & Resource Guide | ${siteSettings.site_name}`,
    description: `Access free high DA/DR dofollow backlink sites, Web 2.0 list, profile backlinks, and guest posting opportunities to boost your Google authority.`,
  },
};

export default function HighDaBacklinksLayout({ children }) {
  return children;
}
