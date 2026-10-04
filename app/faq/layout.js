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
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO FAQs & Answers | ${siteSettings.expert_name} SEO Consultant`,
    description: `Get answers to frequently asked questions about SEO services, technical audits, pricing, ranking timelines, and AI search optimization in Bangladesh.`,
  },
};

export default function FaqLayout({ children }) {
  return children;
}
