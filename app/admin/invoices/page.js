"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInvoices(DB.getInvoices());
  }, []);

  return (
    <div className="admin-invoices-page space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Invoices</h1>
          <p className="text-slate-400 text-sm">Downloadable & printable receipts for all completed payments</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Order Ref</th>
                <th className="px-5 py-3.5">Client Info</th>
                <th className="px-5 py-3.5">Deliverable Service</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-700/30">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-white">
                    {inv.invoice_number}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                    {inv.order_number}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-white">{inv.client_name}</div>
                    <div className="text-xs text-slate-400">{inv.client_email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-white">{inv.service_title}</div>
                    <div className="text-xs text-slate-400">{inv.package_name}</div>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-white">
                    ${inv.total}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${inv.status === "paid" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                      {inv.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/invoices/${inv.id}`}
                      target="_blank"
                      className="btn btn-primary btn-xs text-xs"
                    >
                      <i className="fa-solid fa-print"></i> Print / View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
