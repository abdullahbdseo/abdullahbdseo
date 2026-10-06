import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Contact ${siteSettings.expert_name} | Free SEO Consultation & Audit`,
  description: `Contact ${siteSettings.expert_name}, top SEO specialist in Bangladesh. Book a free 30-minute SEO audit & consultation to discuss your business growth strategy today.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${siteSettings.expert_name} | Free SEO Consultation & Audit`,
    description: `Contact ${siteSettings.expert_name}, top SEO specialist in Bangladesh. Book a free 30-minute SEO audit & consultation to discuss your business growth strategy today.`,
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `Contact ${siteSettings.expert_name} - SEO Consultation & Audit`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteSettings.expert_name} | Free SEO Consultation & Audit`,
    description: `Contact ${siteSettings.expert_name}, top SEO specialist in Bangladesh. Book a free 30-minute SEO audit & consultation to discuss your business growth strategy today.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
