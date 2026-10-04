import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Local SEO Service in Bangladesh | Google Maps & GMB Rank`,
  description: `Dominate local search in Dhaka, Chittagong, and across Bangladesh. Boost Google Business Profile ranking, local citations, and high-intent customer phone calls.`,
  alternates: {
    canonical: "/services/local-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `Local SEO Service in Bangladesh | Google Maps & GMB Rank`,
    description: `Dominate local search in Dhaka, Chittagong, and across Bangladesh. Boost Google Business Profile ranking, local citations, and high-intent customer phone calls.`,
    url: "/services/local-seo-service-in-bangladesh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Local SEO Service in Bangladesh | Google Maps & GMB Rank`,
    description: `Dominate local search in Dhaka, Chittagong, and across Bangladesh. Boost Google Business Profile ranking, local citations, and high-intent customer phone calls.`,
  },
};

export default function LocalSeoLayout({ children }) {
  return children;
}
