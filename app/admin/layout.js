// app/admin/layout.js - Server wrapper that injects noindex metadata for all admin/* pages
// The actual UI layout lives in AdminClientLayout.js (client component)

import AdminClientLayout from "./AdminClientLayout";

export const metadata = {
  title: "Admin Panel",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
