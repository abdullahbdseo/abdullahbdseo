import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free HTTP Header & Status Code Checker | ${siteSettings.site_name}`,
  description: `Inspect live server response HTTP headers, 301/302 redirect chains, canonical tags, SSL security, and response headers for any webpage.`,
  alternates: {
    canonical: "/tools/http-header-checker",
  },
  openGraph: {
    title: `Free HTTP Header & Status Code Checker | ${siteSettings.site_name}`,
    description: `Inspect live server response HTTP headers, 301/302 redirect chains, canonical tags, SSL security, and response headers for any webpage.`,
    url: "/tools/http-header-checker",
    type: "website",
  },
};

export default function HttpHeaderCheckerLayout({ children }) {
  return children;
}
