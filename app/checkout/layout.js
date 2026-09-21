// app/checkout/layout.js - Noindex checkout page (no SEO value)

export const metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CheckoutLayout({ children }) {
  return children;
}
