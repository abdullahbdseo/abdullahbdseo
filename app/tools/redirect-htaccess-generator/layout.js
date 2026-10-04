import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `301 Redirect & .htaccess / Nginx Generator | Free SEO Tool`,
  description: `Generate error-free Apache .htaccess, Nginx, and Cloudflare 301/302 redirects, HTTPS SSL enforcement, WWW canonicalization, and trailing slash rewrite rules.`,
  alternates: {
    canonical: "/tools/redirect-htaccess-generator",
  },
  openGraph: {
    title: `301 Redirect & .htaccess / Nginx Generator | Free SEO Tool`,
    description: `Generate error-free Apache .htaccess, Nginx, and Cloudflare 301/302 redirects, HTTPS SSL enforcement, WWW canonicalization, and trailing slash rewrite rules.`,
    url: "/tools/redirect-htaccess-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `301 Redirect & .htaccess / Nginx Generator | Free SEO Tool`,
    description: `Generate error-free Apache .htaccess, Nginx, and Cloudflare 301/302 redirects, HTTPS SSL enforcement, WWW canonicalization, and trailing slash rewrite rules.`,
  },
};
export default function RedirectHtaccessGeneratorLayout({ children }) {
  return children;
}
