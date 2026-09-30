import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Google Disavow File Generator (disavow.txt) | Free SEO Tool`,
  description: `Generate 100% Google Search Console compliant disavow.txt files. Format domain-level & page-level toxic backlink directives, remove duplicates, and download with 1-click.`,
  alternates: {
    canonical: "/tools/disavow-file-generator",
  },
  openGraph: {
    title: `Google Disavow File Generator (disavow.txt) | Free SEO Tool`,
    description: `Format and export Google-compliant disavow.txt files to protect your site against negative SEO and toxic spam backlinks.`,
    url: "/tools/disavow-file-generator",
    type: "website",
  },
};

export default function DisavowFileGeneratorLayout({ children }) {
  return children;
}
