import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Technical SEO Service in Bangladesh | Core Web Vitals & Audit Expert`,
  description: `Fix crawling bottlenecks, slow site speed, indexing errors, and structured data schemas with Bangladesh's premier Technical SEO Specialist, ${siteSettings.expert_name}.`,
  alternates: {
    canonical: "/services/technical-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `Technical SEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Expert Core Web Vitals, speed optimization, and forensic technical SEO audits for top rankings.`,
    url: "/services/technical-seo-service-in-bangladesh",
    type: "website",
  },
};

export default function TechnicalSeoLayout({ children }) {
  return children;
}
