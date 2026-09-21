import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `10,000+ High DA Backlinks List & Sites | ${siteSettings.site_name}`,
  description: `Access 10,000+ free high DA/DR dofollow backlink sites, Web 2.0 list, profile backlinks, and guest posting opportunities to boost your Google authority.`,
  alternates: {
    canonical: "/high-da-backlinks",
  },
  openGraph: {
    title: `10,000+ High DA Backlinks List & Sites | ${siteSettings.site_name}`,
    description: `Access 10,000+ free high DA/DR dofollow backlink sites, Web 2.0 list, profile backlinks, and guest posting opportunities to boost your Google authority.`,
    url: "/high-da-backlinks",
    type: "website",
  },
};

export default function HighDaBacklinksLayout({ children }) {
  return children;
}
