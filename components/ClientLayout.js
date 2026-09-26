"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoChecklistModal from "@/components/SeoChecklistModal";
import BackToTop from "@/components/BackToTop";



export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdminAuth(localStorage.getItem("admin_auth") === "true");
    }
  }, [pathname]);

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isSecretLoginRoute = pathname === "/100100" || pathname.startsWith("/100100/");

  // Hide header/footer on secret login page OR on admin routes only when authenticated
  const hideChrome = isSecretLoginRoute || (isAdminRoute && isAdminAuth);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <SeoChecklistModal />
      <BackToTop />
    </>
  );
}
