import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `About ${siteSettings.expert_name} | Best SEO Expert in Bangladesh (6+ Yrs)`,
  description: `Learn about ${siteSettings.expert_name}, top-rated SEO Expert in Bangladesh & Organic Business Growth Specialist. 6+ years experience, 100+ brands ranked #1 on Google with Technical SEO, Local SEO, E-commerce, and AI/AEO search optimization.`,
  keywords: [
    "Abdullah Saleh",
    "About Abdullah Saleh",
    "Best SEO Expert in Bangladesh",
    "SEO Expert in Bangladesh",
    "Top SEO Specialist Bangladesh",
    "Organic Business Growth Specialist",
    "Technical SEO Expert Bangladesh",
    "Local SEO Specialist Bangladesh",
    "Ecommerce SEO Bangladesh",
    "AI SEO Consultant Bangladesh",
    "AEO GEO Expert Bangladesh"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteSettings.expert_name} | Best SEO Expert in Bangladesh`,
    description: `Learn about ${siteSettings.expert_name}, top SEO expert in Bangladesh with 6+ years experience helping 100+ brands scale organic traffic, Google #1 rankings, and revenue.`,
    url: "/about",
    type: "profile",
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
