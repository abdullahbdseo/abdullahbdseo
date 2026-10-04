import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Case Studies & Client Results | ${siteSettings.site_name}`,
  description: `Explore verified SEO case studies, Google #1 ranking proofs, and organic traffic growth results across local, e-commerce, and enterprise businesses.`,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: `SEO Case Studies & Client Results | ${siteSettings.site_name}`,
    description: `Explore verified SEO case studies, Google #1 ranking proofs, and organic traffic growth results across local, e-commerce, and enterprise businesses.`,
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO Case Studies & Client Results | ${siteSettings.site_name}`,
    description: `Explore verified SEO case studies, Google #1 ranking proofs, and organic traffic growth results across local, e-commerce, and enterprise businesses.`,
  },
};

export default function PortfolioLayout({ children }) {
  return children;
}
