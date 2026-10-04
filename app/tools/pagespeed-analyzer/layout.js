import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Core Web Vitals & PageSpeed Diagnostics | Free SEO Tool`,
  description: `Analyze Google Core Web Vitals (LCP, INP, CLS, TTFB) and PageSpeed performance score for Mobile & Desktop. Get actionable technical speed fixes and speed audit insights.`,
  alternates: {
    canonical: "/tools/pagespeed-analyzer",
  },
  openGraph: {
    title: `Core Web Vitals & PageSpeed Diagnostics | Free SEO Tool`,
    description: `Audit mobile & desktop Core Web Vitals (LCP, INP, CLS, FCP, TTFB) with actionable code fix recommendations.`,
    url: "/tools/pagespeed-analyzer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Core Web Vitals & PageSpeed Diagnostics | Free SEO Tool`,
    description: `Audit mobile & desktop Core Web Vitals (LCP, INP, CLS, FCP, TTFB) with actionable code fix recommendations.`,
  },
};
export default function PageSpeedAnalyzerLayout({ children }) {
  return children;
}
