"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NotFound from "@/app/not-found";
import "@/styles/admin.css";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: "fa-chart-pie", exact: true },
      { href: "/admin/analytics", label: "Analytics & Logs", icon: "fa-chart-line" },
    ],
  },
  {
    label: "Leads & Orders",
    items: [
      { href: "/admin/leads", label: "Leads & Inquiries", icon: "fa-envelope-open-text" },
      { href: "/admin/orders", label: "Client Orders", icon: "fa-cart-shopping" },
      { href: "/admin/invoices", label: "Invoices & Billing", icon: "fa-file-invoice-dollar" },
    ],
  },
  {
    label: "Content Management",
    items: [
      { href: "/admin/blogs", label: "Blog Posts", icon: "fa-newspaper" },
      { href: "/admin/services", label: "Services & Packages", icon: "fa-layer-group" },
      { href: "/admin/portfolio", label: "Portfolio & Proof", icon: "fa-trophy" },
      { href: "/admin/testimonials", label: "Client Reviews", icon: "fa-comments" },
      { href: "/admin/pricing", label: "Pricing Tables", icon: "fa-tags" },
      { href: "/admin/faqs", label: "FAQs Manager", icon: "fa-circle-question" },
      { href: "/admin/tools", label: "Free SEO Tools", icon: "fa-screwdriver-wrench" },
      { href: "/admin/backlink-calculator", label: "Backlink Calculator", icon: "fa-calculator" },
    ],
  },
  {
    label: "System & Config",
    items: [
      { href: "/admin/settings", label: "Settings & Password", icon: "fa-user-shield" },
    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState({
    name: "Abdullah Saleh",
    email: "admin@seoservice.local",
    role: "Master Administrator"
  });

  // Strict Password/Auth Guard - Hidden 404 for unauthenticated visitors
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (auth === "true") {
        const storedUser = localStorage.getItem("admin_user");
        if (storedUser) {
          try {
            setAdminUser(JSON.parse(storedUser));
          } catch (e) {
            // fallback to default
          }
        }
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
      localStorage.removeItem("admin_user");
    }
    setIsAuthenticated(false);
    router.push("/100100");
  };

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // Find active label for breadcrumb
  const getCurrentPageTitle = () => {
    for (const group of navGroups) {
      for (const item of group.items) {
        if (item.exact ? pathname === item.href : pathname.startsWith(item.href)) {
          return item.label;
        }
      }
    }
    return "Admin Portal";
  };

  if (!authChecked) {
    return null;
  }

  // Show standard 404 Not Found if visitor is not logged in as admin
  if (!isAuthenticated) {
    return <NotFound />;
  }

  return (
    <div className="admin-layout-wrapper">
      {/* 1. SIDEBAR (DAY / LIGHT MODE) */}
      <aside className={`admin-sidebar-shell ${sidebarOpen ? "expanded" : "collapsed"}`}>
        {/* Brand Header */}
        <div className="admin-brand-header">
          <Link href="/admin" className="admin-brand-logo-area">
            <div className="admin-brand-icon">
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            {sidebarOpen && (
              <div className="admin-brand-titles">
                <div className="admin-brand-name">SEO Service CMS</div>
                <div className="admin-brand-badge">Control Panel</div>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-collapse-toggle"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <i className={`fa-solid ${sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"}`}></i>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="admin-sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.label} className="admin-nav-section">
              {sidebarOpen && (
                <div className="admin-nav-section-title">{group.label}</div>
              )}
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={!sidebarOpen ? item.label : undefined}
                    className={`admin-nav-item-link ${active ? "active" : ""}`}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer User Info & Logout */}
        <div className="admin-sidebar-footer">
          {sidebarOpen ? (
            <>
              <div className="admin-user-card">
                <img
                  src="/images/abdullah.jpg"
                  alt="Admin"
                  className="admin-user-avatar"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="admin-user-info">
                  <div className="admin-user-name">{adminUser.name}</div>
                  <div className="admin-user-role" title={adminUser.email} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {adminUser.email || "admin@seoservice.local"}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="admin-logout-btn">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="admin-collapse-toggle"
              title="Sign Out"
              style={{ width: "100%", height: "36px", color: "#e11d48", background: "#fff1f2", borderColor: "#fecdd3" }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          )}
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT & TOPBAR */}
      <div className="admin-viewport">
        {/* TOPBAR */}
        <header className="admin-topbar-shell">
          <div className="admin-topbar-left">
            <div className="admin-breadcrumb">
              <Link href="/admin" style={{ color: "#64748b", textDecoration: "none" }}>
                <i className="fa-solid fa-house" style={{ fontSize: "12px" }}></i>
              </Link>
              <span>/</span>
              <span className="admin-breadcrumb-active">{getCurrentPageTitle()}</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-status-pill">
              <span>System Live</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="admin-site-btn"
              title="Open public website in new tab"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span>View Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="btn-admin btn-admin-danger btn-admin-sm"
              title="Sign Out"
            >
              <i className="fa-solid fa-power-off"></i>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* 3. CONTENT AREA */}
        <main className="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
