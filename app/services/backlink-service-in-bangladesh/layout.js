import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Backlink Service in Bangladesh | High DA Link Building`,
  description: `Top High DA Backlink Service in Bangladesh by ${siteSettings.expert_name}. 100% white-hat manual outreach, DR 50-90+ guest posts, and permanent PageRank authority.`,
  alternates: {
    canonical: "/services/backlink-service-in-bangladesh",
  },
  openGraph: {
    title: `Backlink Service in Bangladesh | High DA Link Building`,
    description: `Top High DA Backlink Service in Bangladesh by ${siteSettings.expert_name}. 100% white-hat manual outreach, DR 50-90+ guest posts, and permanent PageRank authority.`,
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
    title: `Backlink Service in Bangladesh | High DA Link Building`,
    description: `Top High DA Backlink Service in Bangladesh by ${siteSettings.expert_name}. 100% white-hat manual outreach, DR 50-90+ guest posts, and permanent PageRank authority.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function BacklinkServiceLayout({ children }) {
  return children;
}
