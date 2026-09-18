import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Backlink Service in Bangladesh | High DA White-Hat Link Building`,
  description: `Top-rated High DA Backlink Service in Bangladesh by ${siteSettings.expert_name}. 100% white-hat manual outreach, DR 50-90+ guest posting, zero spam, and permanent PageRank authority.`,
  alternates: {
    canonical: "/services/backlink-service-in-bangladesh",
  },
  openGraph: {
    title: `Backlink Service in Bangladesh | High DA Link Building | ${siteSettings.site_name}`,
    description: `Skyrocket your Google rankings with high DA white-hat backlinks from real traffic websites in Bangladesh and worldwide.`,
    url: "/services/backlink-service-in-bangladesh",
    type: "website",
  },
};

export default function BacklinkServiceLayout({ children }) {
  return children;
}
