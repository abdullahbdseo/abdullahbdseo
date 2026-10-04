import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Open Graph & Social Card Meta Tag Generator | ${siteSettings.site_name}`,
  description: `Generate pixel-accurate Open Graph, Twitter Card, Facebook, LinkedIn, WhatsApp, and Discord social preview meta tags with live card previews. Free 1-click HTML & Next.js metadata export.`,
  alternates: {
    canonical: "/tools/open-graph-meta-generator",
  },
  openGraph: {
    title: `Open Graph & Social Card Meta Tag Generator | ${siteSettings.site_name}`,
    description: `Generate pixel-accurate Open Graph, Twitter Card, Facebook, LinkedIn, WhatsApp, and Discord social preview meta tags with live card previews. Free 1-click HTML & Next.js metadata export.`,
    url: "/tools/open-graph-meta-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Open Graph & Social Card Meta Tag Generator | ${siteSettings.site_name}`,
    description: `Generate pixel-accurate Open Graph, Twitter Card, Facebook, LinkedIn, WhatsApp, and Discord social preview meta tags with live card previews. Free 1-click HTML & Next.js metadata export.`,
  },
};
export default function OpenGraphGeneratorLayout({ children }) {
  return children;
}
