import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Professional SEO Services in Bangladesh | Technical, Local, E-Commerce & AI SEO`,
  description: `Explore full-suite SEO services in Bangladesh by ${siteSettings.expert_name}. Guaranteed ROI-driven Technical SEO, Local Google Maps Optimization, E-Commerce Ranking, and AI Search Visibility.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `SEO Services in Bangladesh | ${siteSettings.site_name}`,
    description: `All-in-one organic SEO solutions engineered to rank your website #1 on Google and AI search engines.`,
    url: "/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
