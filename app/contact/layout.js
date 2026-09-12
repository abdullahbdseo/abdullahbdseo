import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Contact ${siteSettings.expert_name} | Book a Free SEO Audit & Consultation`,
  description: `Get in touch with Bangladesh's top SEO specialist. Request a comprehensive forensic SEO audit, discuss custom monthly retainer plans, or schedule a strategy call today.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${siteSettings.expert_name} | SEO Consultant`,
    description: `Request a free 30-minute SEO growth consultation and website audit.`,
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
