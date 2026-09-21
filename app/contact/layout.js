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
  },
};

export default function ContactLayout({ children }) {
  return children;
}
