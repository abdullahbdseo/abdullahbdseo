import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free Schema Markup Generator (JSON-LD) | LocalBusiness, Article, FAQ | ${siteSettings.site_name}`,
  description: `Easily generate Google-compliant JSON-LD structured data for Organization, LocalBusiness, FAQPage, Article, Person, and Product schemas to earn Rich Snippets.`,
  alternates: {
    canonical: "/tools/schema-markup-generator",
  },
  openGraph: {
    title: `Schema Markup Generator (JSON-LD) | ${siteSettings.site_name}`,
    description: `Create validated JSON-LD schema markup for Google Rich Results.`,
    url: "/tools/schema-markup-generator",
    type: "website",
  },
};

export default function SchemaMarkupGeneratorLayout({ children }) {
  return children;
}
