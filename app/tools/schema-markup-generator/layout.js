import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free JSON-LD Schema Markup Generator | ${siteSettings.site_name}`,
  description: `Easily generate Google-compliant JSON-LD structured data for Organization, LocalBusiness, FAQPage, Article, Person, and Product schemas to earn Rich Snippets.`,
  alternates: {
    canonical: "/tools/schema-markup-generator",
  },
  openGraph: {
    title: `Free JSON-LD Schema Markup Generator | ${siteSettings.site_name}`,
    description: `Easily generate Google-compliant JSON-LD structured data for Organization, LocalBusiness, FAQPage, Article, Person, and Product schemas to earn Rich Snippets.`,
    url: "/tools/schema-markup-generator",
    type: "website",
  },
};

export default function SchemaMarkupGeneratorLayout({ children }) {
  return children;
}
