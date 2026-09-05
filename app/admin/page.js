"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    setOrders(DB.getOrders());
    setInquiries(DB.getInquiries());
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === "in_progress" || o.status === "awaiting_payment").length;
  const completedOrdersCount = orders.filter(o => o.status === "completed").length;

  return (
    <div className="admin-dashboard-page space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
          <p className="text-slate-400 text-sm">Real-time order statuses, inquiries, and revenue metrics</p>
        </div>

        <Link href="/admin/orders" className="btn btn-primary btn-sm">
          <i className="fa-solid fa-list-check"></i> Manage All Orders
        </Link>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-sm">
          <div className="text-xs uppercase font-bold text-slate-400">Total Invoiced Volume</div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">${totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Across all order channels</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-sm">
          <div className="text-xs uppercase font-bold text-slate-400">Total Client Orders</div>
          <div className="text-3xl font-bold text-white mt-2">{orders.length}</div>
          <div className="text-xs text-slate-400 mt-1">{activeOrdersCount} in active workflow</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-sm">
          <div className="text-xs uppercase font-bold text-slate-400">Delivered & Completed</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">{completedOrdersCount}</div>
          <div className="text-xs text-slate-400 mt-1">100% On-time delivery</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-sm">
          <div className="text-xs uppercase font-bold text-slate-400">Inbound Consultations</div>
          <div className="text-3xl font-bold text-amber-400 mt-2">{inquiries.length}</div>
          <div className="text-xs text-slate-400 mt-1">Contact & quote leads</div>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Recent Client Deliverables</h2>
          <Link href="/admin/orders" className="text-xs text-primary hover:underline">View All &rarr;</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Order Number</th>
                <th className="px-5 py-3.5">Target Website</th>
                <th className="px-5 py-3.5">Service Deliverable</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-700/30">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-white">{order.order_number}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-cyan-300">{order.website_url}</td>
                  <td className="px-5 py-3.5">{order.service_title}</td>
                  <td className="px-5 py-3.5 font-bold text-white">${order.total}</td>
                  <td className="px-5 py-3.5 uppercase text-xs font-semibold">{order.payment_method}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${order.status === "completed" ? "bg-emerald-500/20 text-emerald-300" : order.status === "in_progress" ? "bg-blue-500/20 text-blue-300" : "bg-amber-500/20 text-amber-300"}`}>
                      {order.status}
                    </span>
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
