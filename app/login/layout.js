// app/login/layout.js - Noindex login page (no SEO value)

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

export default function LoginLayout({ children }) {
  return children;
}
