import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `Answer Engine Optimization (AEO) Service in Bangladesh`,
  description: `Capture Google Featured Snippets, Zero-Click searches, and Voice Search answers with structured Answer Engine Optimization (AEO) frameworks.`,
  alternates: {
    canonical: "/services/aeo-service-in-bangladesh",
  },
  openGraph: {
    title: `AEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Win position #0 on Google and become the default voice search response for your target market.`,
    url: "/services/aeo-service-in-bangladesh",
    type: "website",
  },
};

export default function AeoLayout({ children }) {
  return children;
}
