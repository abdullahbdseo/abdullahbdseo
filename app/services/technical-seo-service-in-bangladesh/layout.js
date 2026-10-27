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
    title: `Technical SEO Service in Bangladesh | ${siteSettings.expert_name}`,
    description: `Fix crawling bottlenecks, slow site speed, indexing errors, and structured data schemas with Bangladesh's premier Technical SEO Specialist, ${siteSettings.expert_name}.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function TechnicalSeoLayout({ children }) {
  return children;
}
