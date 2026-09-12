"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoChecklistModal from "@/components/SeoChecklistModal";
import BackToTop from "@/components/BackToTop";

// Routes where Header and Footer should NOT appear
const NO_CHROME_PATHS = ["/admin", "/login"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideChrome = NO_CHROME_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

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
