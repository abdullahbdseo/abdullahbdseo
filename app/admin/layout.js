"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteSettings } from "@/lib/data";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
    }
    router.push("/login");
  };

  return (
    <div className="admin-layout flex min-h-screen bg-slate-900 text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            <div>
              <div className="font-bold text-white text-sm">SEO Service CMS</div>
              <div className="text-xs text-slate-400">Admin Control</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 flex-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${pathname === "/admin" ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
          >
            <i className="fa-solid fa-chart-pie w-5"></i>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/orders"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${pathname.startsWith("/admin/orders") ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
          >
            <i className="fa-solid fa-cart-shopping w-5"></i>
            <span>Orders Management</span>
          </Link>

          <Link
            href="/admin/invoices"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${pathname.startsWith("/admin/invoices") ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
          >
            <i className="fa-solid fa-file-invoice-dollar w-5"></i>
            <span>Invoices</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <i className="fa-solid fa-arrow-up-right-from-square w-4"></i>
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition text-left"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-4"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
