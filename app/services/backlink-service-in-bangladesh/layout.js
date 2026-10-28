import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Backlink Service in Bangladesh | High DA White-Hat Link Building`,
  description: `Premium White-Hat Backlink Service in Bangladesh. Build high-authority dofollow contextual links, manual outreach guest posts, and scale domain authority safely.`,
  alternates: {
    canonical: "/services/backlink-service-in-bangladesh",
  },
  openGraph: {
    title: `Backlink Service in Bangladesh | High DA White-Hat Link Building`,
    description: `Premium White-Hat Backlink Service in Bangladesh. Build high-authority dofollow contextual links, manual outreach guest posts, and scale domain authority safely.`,
    url: "/services/backlink-service-in-bangladesh",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `Backlink Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Backlink Service in Bangladesh | High DA White-Hat Link Building`,
    description: `Premium White-Hat Backlink Service in Bangladesh. Build high-authority dofollow contextual links, manual outreach guest posts, and scale domain authority safely.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function BacklinkLayout({ children }) {
  return children;
}
