"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";


export default function ClientInvoicePage({ params }) {
  const unwrappedParams = use(params);
  const invoiceId = unwrappedParams.id;
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const formatPrice = (amount) => `$${amount}`;

  useEffect(() => {
    async function loadInvoice() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/invoices");
        if (res.ok) {
          const data = await res.json();
          const inv = (data.invoices || []).find(
            (i) => String(i.id) === String(invoiceId) || i.invoice_number === invoiceId || String(i.order_number) === String(invoiceId)
          );
          if (inv) {
            setInvoice(inv);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Error loading invoice:", e);
      }

      // Fallback preview
      setInvoice({
        id: invoiceId,
        invoice_number: `INV-2026-${String(invoiceId).padStart(4, "0")}`,
        order_number: `ORD-2026-${invoiceId}`,
        client_name: "Valued Client",
        client_email: "client@example.com",
        service_title: "Custom High-DA SEO & Backlinks Campaign",
        package_name: "Authority Booster Package",
        total: 350.0,
        subtotal: 350.0,
        payment_method: "Direct Agreement / bKash",
        status: "paid",
        created_at: new Date().toISOString(),
      });
      setLoading(false);
    }

    loadInvoice();
  }, [invoiceId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrintPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#64748b" }}>
          <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: "2rem", color: "#2563eb", marginBottom: "12px" }}></i>
          <p>Loading official invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) return null;

  return (
    <div className="printable-invoice-wrapper" style={{ minHeight: "100vh", background: "#f1f5f9", padding: "40px 15px" }}>
      {/* Top Action Bar (Hidden when printing) */}
      <div className="invoice-action-bar" style={{ maxWidth: "800px", margin: "0 auto 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <Link
          href="/track-order"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            color: "#334155",
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none"
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Track Order
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleCopyLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              color: "#334155",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <i className={`fa-solid ${copied ? "fa-check" : "fa-link"}`} style={{ color: copied ? "#10b981" : "#64748b" }}></i>
            <span>{copied ? "Link Copied!" : "Share Invoice"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPdf}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              background: "#2563eb",
              border: "1px solid #1d4ed8",
              borderRadius: "4px",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(37,99,235,0.2)"
            }}
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Card */}
      <div
        className="invoice-paper"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "4px",
          padding: "40px 35px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}
      >
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #e2e8f0", paddingBottom: "25px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/images/logo-icon.svg" alt={siteSettings.site_name} style={{ height: "32px", width: "auto" }} />
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a" }}>{siteSettings.site_name}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "0.82rem", color: "#64748b" }}>{siteSettings.site_tagline}</p>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>{siteSettings.office_address || "Dhaka, Bangladesh"}</p>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>Email: {siteSettings.contact_email || "abdullahbd.seo@gmail.com"}</p>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>WhatsApp: {siteSettings.contact_phone || "+8801670769816"}</p>
          </div>

          <div style={{ textAlign: "right" }}>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", letterSpacing: "1px" }}>INVOICE</h1>
            <div style={{ margin: "4px 0", fontSize: "0.95rem", fontWeight: 700, color: "#2563eb", fontFamily: "monospace" }}>
              {invoice.invoice_number}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
              <strong>Issue Date:</strong> {new Date(invoice.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
              <strong>Order ID:</strong> {invoice.order_number || invoice.id}
            </div>
          </div>
        </div>

        {/* Bill To & Status Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", margin: "25px 0", padding: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          <div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }}>
              Billed To:
            </span>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>{invoice.client_name}</div>
            <div style={{ fontSize: "0.85rem", color: "#475569" }}>{invoice.client_email}</div>
            {invoice.client_phone && <div style={{ fontSize: "0.85rem", color: "#475569" }}>{invoice.client_phone}</div>}
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }}>
              Payment Status:
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "4px",
                fontSize: "0.82rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                background: invoice.status === "paid" ? "#ecfdf5" : "#fef3c7",
                color: invoice.status === "paid" ? "#065f46" : "#92400e",
                border: `1px solid ${invoice.status === "paid" ? "#a7f3d0" : "#fde68a"}`
              }}
            >
              {invoice.status === "paid" ? "✓ PAID IN FULL" : "⏳ PAYMENT PENDING"}
            </span>
            <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "6px" }}>
              Method: <strong>{invoice.payment_method || "Direct Project"}</strong>
            </div>
          </div>
        </div>

        {/* Deliverables Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "25px 0" }}>
          <thead>
            <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Description</th>
              <th style={{ padding: "10px 14px", textAlign: "center", fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Qty</th>
              <th style={{ padding: "10px 14px", textAlign: "right", fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Unit Price</th>
              <th style={{ padding: "10px 14px", textAlign: "right", fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "14px", verticalAlign: "top" }}>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>{invoice.service_title}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>{invoice.package_name}</div>
              </td>
              <td style={{ padding: "14px", textAlign: "center", color: "#334155", fontSize: "0.9rem" }}>1</td>
              <td style={{ padding: "14px", textAlign: "right", color: "#334155", fontSize: "0.9rem", fontFamily: "monospace" }}>
                {formatPrice(invoice.subtotal || invoice.total)}
              </td>
              <td style={{ padding: "14px", textAlign: "right", fontWeight: 700, color: "#0f172a", fontSize: "0.95rem", fontFamily: "monospace" }}>
                {formatPrice(invoice.total)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals Calculation Box */}
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px 0" }}>
          <div style={{ width: "280px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b", marginBottom: "6px" }}>
              <span>Subtotal:</span>
              <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{formatPrice(invoice.subtotal || invoice.total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b", marginBottom: "8px" }}>
              <span>Tax (0% Digital Service):</span>
              <span style={{ fontFamily: "monospace", fontWeight: 600 }}>$0.00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", borderTop: "1px solid #cbd5e1", paddingTop: "8px" }}>
              <span>Total Amount:</span>
              <span style={{ color: "#2563eb", fontFamily: "monospace" }}>{formatPrice(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Verification / Official Receipt Notice */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginTop: "30px", fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, textAlign: "center" }}>
          <p style={{ margin: "0 0 6px" }}>
            Official electronic receipt generated by <strong>{siteSettings.site_name}</strong>. Work deliverables and live Google Sheet reports are accessible directly in your <Link href="/track-order" style={{ color: "#2563eb", fontWeight: 600 }}>Track Order Portal</Link>.
          </p>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>
            Need support or custom deliverables? Contact {siteSettings.contact_email} or WhatsApp {siteSettings.contact_phone}.
          </p>
        </div>
      </div>
    </div>
  );
}
