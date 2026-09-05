"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setOrders([...DB.getOrders()]);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (e) {
      alert("Error updating order status");
    }
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.website_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.service_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-orders-page space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders Management</h1>
          <p className="text-slate-400 text-sm">Track, inspect, and update deliverable fulfillment workflows</p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-sm px-4 py-2 rounded-lg focus:outline-none focus:border-primary w-full sm:w-64"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Statuses</option>
            <option value="awaiting_payment">Awaiting Payment</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Target Website</th>
                <th className="px-5 py-3.5">Service & Package</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment Ref</th>
                <th className="px-5 py-3.5">Update Status</th>
                <th className="px-5 py-3.5">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-700/30">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-white">
                    {order.order_number}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-cyan-300 break-all">
                    {order.website_url}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-white">{order.service_title}</div>
                    <div className="text-xs text-slate-400">{order.package_name}</div>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-white">
                    ${order.total}
                  </td>
                  <td className="px-5 py-3.5 text-xs">
                    <div className="uppercase font-semibold text-slate-300">{order.payment_method}</div>
                    {order.crypto_tx_hash && (
                      <div className="font-mono text-[10px] text-slate-500 truncate w-32" title={order.crypto_tx_hash}>
                        TX: {order.crypto_tx_hash}
                      </div>
                    )}
                    {order.bkash_trx_id && (
                      <div className="font-mono text-[10px] text-pink-400">
                        bKash: {order.bkash_trx_id}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-primary"
                    >
                      <option value="awaiting_payment">Awaiting Payment</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/invoices/${order.invoice_id || order.id}`}
                      className="btn btn-outline btn-xs text-xs"
                      target="_blank"
                    >
                      <i className="fa-solid fa-receipt"></i> Invoice
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
