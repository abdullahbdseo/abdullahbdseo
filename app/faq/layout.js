import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO FAQs & Answers | ${siteSettings.expert_name} SEO Consultant`,
  description: `Get answers to frequently asked questions about SEO services, technical audits, pricing, ranking timelines, and AI search optimization in Bangladesh.`,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `SEO FAQs & Answers | ${siteSettings.expert_name} SEO Consultant`,
    description: `Get answers to frequently asked questions about SEO services, technical audits, pricing, ranking timelines, and AI search optimization in Bangladesh.`,
    url: "/faq",
    type: "website",
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `SEO FAQs & Answers | ${siteSettings.expert_name} SEO Consultant`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO FAQs & Answers | ${siteSettings.expert_name} SEO Consultant`,
    description: `Get answers to frequently asked questions about SEO services, technical audits, pricing, ranking timelines, and AI search optimization in Bangladesh.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function FaqLayout({ children }) {
  return children;
}
