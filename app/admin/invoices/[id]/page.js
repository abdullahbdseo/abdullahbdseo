"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { DB } from "@/lib/db";
import { siteSettings } from "@/lib/data";

export default function SingleInvoicePage({ params }) {
  const unwrappedParams = use(params);
  const invoiceId = unwrappedParams.id;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const inv = DB.getInvoices().find(i => String(i.id) === String(invoiceId) || i.invoice_number === invoiceId);
    if (inv) {
      setInvoice(inv);
    } else {
      // Fallback demo invoice
      setInvoice({
        id: invoiceId,
        invoice_number: `INV-20260905-${String(invoiceId).padStart(3, '0')}`,
        order_number: `ORD-20260905-${invoiceId}`,
        client_name: "Valued Enterprise Client",
        client_email: "billing@clientcompany.com",
        service_title: "Technical SEO Audit & Growth Strategy",
        package_name: "Standard Audit Package",
        total: 650.00,
        subtotal: 650.00,
        payment_method: "NOWPAYMENTS-USDT",
        status: "paid",
        created_at: new Date().toISOString()
      });
    }
  }, [invoiceId]);

  if (!invoice) return null;

  return (
    <div className="printable-invoice-wrapper bg-slate-900 min-h-screen py-10 px-4 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline text-white border-slate-700 hover:bg-slate-800 btn-sm"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <button
          onClick={() => window.print()}
          className="btn btn-primary btn-sm"
        >
          <i className="fa-solid fa-print"></i> Print / Save as PDF
        </button>
      </div>

      <div className="invoice-paper bg-white text-slate-900 max-w-3xl mx-auto p-10 rounded-2xl shadow-2xl border print:border-none print:shadow-none print:rounded-none">
        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-8">
          <div>
            <div className="text-2xl font-bold text-primary flex items-center gap-2">
              <i className="fa-solid fa-bolt"></i> {siteSettings.site_name}
            </div>
            <p className="text-xs text-slate-500 mt-1">{siteSettings.site_tagline}</p>
            <p className="text-xs text-slate-500">{siteSettings.office_address}</p>
            <p className="text-xs text-slate-500">{siteSettings.contact_email}</p>
          </div>

          <div className="text-right">
            <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">INVOICE</h1>
            <div className="font-mono text-sm font-bold text-primary mt-1">{invoice.invoice_number}</div>
            <div className="text-xs text-slate-500 mt-1">Date: {new Date(invoice.created_at || Date.now()).toLocaleDateString()}</div>
            <div className="text-xs text-slate-500">Order: {invoice.order_number}</div>
          </div>
        </div>

        {/* BILL TO */}
        <div className="grid grid-cols-2 gap-8 my-8 text-sm">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Billed To</span>
            <div className="font-bold text-slate-800">{invoice.client_name}</div>
            <div className="text-slate-600">{invoice.client_email}</div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Payment Details</span>
            <div className="font-semibold text-slate-800 uppercase">{invoice.payment_method}</div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${invoice.status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              {invoice.status === "paid" ? "PAID IN FULL" : "PAYMENT PENDING"}
            </span>
          </div>
        </div>

        {/* LINE ITEMS TABLE */}
        <table className="w-full text-left text-sm my-8 border-t border-b">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase">
              <th className="py-3 px-4">Item & Deliverable Description</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-right">Unit Price</th>
              <th className="py-3 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-4 px-4">
                <div className="font-bold text-slate-800">{invoice.service_title}</div>
                <div className="text-xs text-slate-500">{invoice.package_name}</div>
              </td>
              <td className="py-4 px-4 text-center">1</td>
              <td className="py-4 px-4 text-right font-mono">${invoice.subtotal || invoice.total}</td>
              <td className="py-4 px-4 text-right font-mono font-bold">${invoice.total}</td>
            </tr>
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="flex justify-end my-6">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">${invoice.total}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (0% Digital Export):</span>
              <span className="font-mono">$0.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-base text-slate-900">
              <span>Total Paid:</span>
              <span className="font-mono text-primary">${invoice.total} USD</span>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="border-t pt-8 text-center text-xs text-slate-400 mt-12">
          <p>Thank you for partnering with {siteSettings.site_name}. Deliverables and progress notes are shared directly with your team.</p>
        </div>
      </div>
    </div>
  );
}
