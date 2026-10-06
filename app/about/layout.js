import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `About ${siteSettings.expert_name} | Best SEO Expert in Bangladesh`,
  description: `Meet ${siteSettings.expert_name}, top SEO expert in Bangladesh with 6+ years of experience helping 100+ brands scale organic traffic, Google #1 rankings, and revenue.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteSettings.expert_name} | Best SEO Expert in Bangladesh`,
    description: `Meet ${siteSettings.expert_name}, top SEO expert in Bangladesh with 6+ years of experience helping 100+ brands scale organic traffic, Google #1 rankings, and revenue.`,
    url: "/about",
    type: "website",
    images: [
      {
        url: "/images/abdullah.jpg",
        width: 1200,
        height: 630,
        alt: `About ${siteSettings.expert_name} - SEO Expert in Bangladesh`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteSettings.expert_name} | Best SEO Expert in Bangladesh`,
    description: `Meet ${siteSettings.expert_name}, top SEO expert in Bangladesh with 6+ years of experience helping 100+ brands scale organic traffic, Google #1 rankings, and revenue.`,
    images: ["/images/abdullah.jpg"],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
