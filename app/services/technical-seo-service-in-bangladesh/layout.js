import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Technical SEO Service in Bangladesh | Fix Index & Crawl Issues`,
  description: `Professional Technical SEO Service in Bangladesh by Abdullah Saleh. Resolve crawl errors, optimize Core Web Vitals, fix indexation, and build robust site architecture.`,
  alternates: {
    canonical: "/services/technical-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `Technical SEO Service in Bangladesh | Fix Index & Crawl Issues`,
    description: `Professional Technical SEO Service in Bangladesh by Abdullah Saleh. Resolve crawl errors, optimize Core Web Vitals, fix indexation, and build robust site architecture.`,
    url: "/services/technical-seo-service-in-bangladesh",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `Technical SEO Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Technical SEO Service in Bangladesh | Fix Index & Crawl Issues`,
    description: `Professional Technical SEO Service in Bangladesh by Abdullah Saleh. Resolve crawl errors, optimize Core Web Vitals, fix indexation, and build robust site architecture.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function TechnicalSeoLayout({ children }) {
  return children;
}
