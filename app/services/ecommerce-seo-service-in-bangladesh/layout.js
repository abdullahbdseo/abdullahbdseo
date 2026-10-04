import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `E-Commerce SEO Service in Bangladesh | Scale Online Sales`,
  description: `Scale organic sales for Shopify & WooCommerce stores in Bangladesh. Expert product page SEO, category optimization, and commercial keyword rankings.`,
  alternates: {
    canonical: "/services/ecommerce-seo-service-in-bangladesh",
  },
  openGraph: {
    title: `E-Commerce SEO Service in Bangladesh | Scale Online Sales`,
    description: `Scale organic sales for Shopify & WooCommerce stores in Bangladesh. Expert product page SEO, category optimization, and commercial keyword rankings.`,
    url: "/services/ecommerce-seo-service-in-bangladesh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `E-Commerce SEO Service in Bangladesh | Scale Online Sales`,
    description: `Scale organic sales for Shopify & WooCommerce stores in Bangladesh. Expert product page SEO, category optimization, and commercial keyword rankings.`,
  },
};

export default function EcommerceSeoLayout({ children }) {
  return children;
}
