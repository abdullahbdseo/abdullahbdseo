import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Free HTTP Header & Status Code Checker (200, 301, 404, 500) | ${siteSettings.site_name}`,
  description: `Inspect live server response HTTP headers, redirect chains (301, 302), canonical headers, SSL status, and caching headers for any URL.`,
  alternates: {
    canonical: "/tools/http-header-checker",
  },
  openGraph: {
    title: `HTTP Header & Status Code Checker | ${siteSettings.site_name}`,
    description: `Check server response headers, redirect status codes, and security policies.`,
    url: "/tools/http-header-checker",
    type: "website",
  },
};

export default function HttpHeaderCheckerLayout({ children }) {
  return children;
}
