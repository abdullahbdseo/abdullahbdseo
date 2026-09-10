"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: "fa-chart-pie", exact: true },
    ],
  },
  {
    label: "Content Management",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: "fa-gear" },
      { href: "/admin/blogs", label: "Blog Posts", icon: "fa-newspaper" },
      { href: "/admin/services", label: "Services", icon: "fa-briefcase" },
      { href: "/admin/faqs", label: "FAQs", icon: "fa-circle-question" },
      { href: "/admin/pricing", label: "Pricing Plans", icon: "fa-tags" },
      { href: "/admin/tools", label: "Free Tools", icon: "fa-screwdriver-wrench" },
    ],
  },
  {
    label: "Orders & Finance",
    items: [
      { href: "/admin/orders", label: "Orders", icon: "fa-cart-shopping" },
      { href: "/admin/invoices", label: "Invoices", icon: "fa-file-invoice-dollar" },
    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
    }
    router.push("/login");
  };

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="admin-layout flex min-h-screen bg-slate-900 text-slate-100">
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 transition-all duration-300`}
        style={{ minHeight: "100vh" }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
            <i className="fa-solid fa-gauge-high text-sm"></i>
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="font-bold text-white text-sm truncate">SEO Service CMS</div>
              <div className="text-xs text-slate-400">Admin Panel</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-slate-500 hover:text-white transition text-xs"
          >
            <i className={`fa-solid ${sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"}`}></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex-1 overflow-y-auto space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              {sidebarOpen && (
                <div className="text-xs uppercase font-bold text-slate-600 px-3 mb-2 tracking-wider">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={!sidebarOpen ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive(item.href, item.exact)
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <i className={`fa-solid ${item.icon} w-4 shrink-0 text-sm`}></i>
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            title={!sidebarOpen ? "View Public Site" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <i className="fa-solid fa-arrow-up-right-from-square w-4 shrink-0"></i>
            {sidebarOpen && <span>View Public Website</span>}
          </Link>

          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Sign Out" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition text-left"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-4 shrink-0"></i>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
