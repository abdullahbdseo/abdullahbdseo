// app/100100/layout.js - Noindex secret login page (no SEO value)

export const metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SecretLoginLayout({ children }) {
  return children;
}
