import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Local SEO Service in Bangladesh | Google Maps 3-Pack & GMB Ranking`,
  description: `Dominate local search in Dhaka, Chittagong, and across Bangladesh. Boost Google Business Profile ranking, local citations, and high-intent customer phone calls.`,
  alternates: {
    canonical: "/services/local-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `Local SEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Rank in Google Maps top 3 pack and capture local customers searching for your services in Bangladesh.`,
    url: "/services/local-seo-service-in-bangladesh",
    type: "website",
  },
};

export default function LocalSeoLayout({ children }) {
  return children;
}
