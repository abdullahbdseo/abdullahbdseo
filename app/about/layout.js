import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `About ${siteSettings.expert_name} | Best SEO Expert in Bangladesh & Organic Growth Specialist`,
  description: `Learn about ${siteSettings.expert_name}, a seasoned SEO specialist in Bangladesh with 6+ years experience driving organic growth, technical audits, and revenue for 100+ global brands.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteSettings.expert_name} | SEO Specialist Bangladesh`,
    description: `Discover the story, ranking methodology, and client success track record of ${siteSettings.expert_name}.`,
    url: "/about",
    type: "profile",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
