import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Technical SEO Service in Bangladesh | ${siteSettings.expert_name}`,
  description: `Fix crawling bottlenecks, slow site speed, indexing errors, and structured data schemas with Bangladesh's premier Technical SEO Specialist, ${siteSettings.expert_name}.`,
  alternates: {
    canonical: "/services/technical-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `Technical SEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Fix crawling bottlenecks, slow site speed, indexing errors, and structured data schemas with Bangladesh's premier Technical SEO Specialist, ${siteSettings.expert_name}.`,
    url: "/services/technical-seo-service-in-bangladesh",
    type: "website",
  },
};

export default function TechnicalSeoLayout({ children }) {
  return children;
}
