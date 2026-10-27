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
    images: [
      {
        url: "/images/seo_hero_3d.png",
        width: 1200,
        height: 630,
        alt: `E-Commerce SEO Service in Bangladesh | ${siteSettings.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `E-Commerce SEO Service in Bangladesh | Scale Online Sales`,
    description: `Scale organic sales for Shopify & WooCommerce stores in Bangladesh. Expert product page SEO, category optimization, and commercial keyword rankings.`,
    images: ["/images/seo_hero_3d.png"],
  },
};

export default function EcommerceSeoLayout({ children }) {
  return children;
}
