import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `E-Commerce SEO Service in Bangladesh | Scale Product Rankings & Organic Sales`,
  description: `Drive high-margin organic sales for Shopify, WooCommerce, and custom e-commerce stores. Specialized product page optimization, category SEO, and commercial keyword ranking.`,
  alternates: {
    canonical: "/services/ecommerce-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `E-Commerce SEO Service in Bangladesh | ${siteSettings.site_name}`,
    description: `Turn your online store into an organic revenue engine with proven e-commerce SEO strategies.`,
    url: "/services/ecommerce-seo-service-in-bangladesh",
    type: "website",
  },
};

export default function EcommerceSeoLayout({ children }) {
  return children;
}
