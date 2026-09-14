// lib/db.js - File-Backed Persistent Storage for Orders, Inquiries, Leads, and Audit Logs
import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "lib", "db-store.json");

const initialData = {
  orders: [],
  inquiries: [
    {
      id: 1,
      name: "Michael Chen",
      email: "m.chen@fintechflow.io",
      phone: "+1 (415) 890-1234",
      website_url: "https://fintechflow.io",
      budget: "$1,000 - $3,000",
      service_interested: "Technical SEO Audit & Ongoing Retainer",
      message: "We just migrated from WordPress to Next.js and noticed a drop in impressions. Looking for a comprehensive audit.",
      status: "new",
      created_at: new Date(Date.now() - 24 * 3600000).toISOString()
    }
  ],
  leads: [
    {
      id: 1,
      source_tool: "Deep SEO Audit Tool",
      website_url: "https://shopnest-bd.com",
      contact_email: "founder@shopnest-bd.com",
      contact_phone: "+880 1711-234567",
      seo_score: 64,
      status: "new",
      created_at: new Date(Date.now() - 6 * 3600000).toISOString()
    },
    {
      id: 2,
      source_tool: "Google Ads ROI Calculator",
      website_url: "https://luxuryspa-dhaka.com",
      contact_email: "marketing@luxuryspa-dhaka.com",
      contact_phone: "+880 1912-987654",
      estimated_revenue: "$4,500/mo",
      status: "contacted",
      created_at: new Date(Date.now() - 36 * 3600000).toISOString()
    },
    {
      id: 3,
      source_tool: "SERP & CTR Simulator",
      website_url: "https://techpulse-hub.io",
      contact_email: "tanvir@techpulse-hub.io",
      contact_phone: "+880 1819-332211",
      status: "converted",
      created_at: new Date(Date.now() - 72 * 3600000).toISOString()
    }
  ],
  auditLogs: [
    {
      id: 1,
      action: "system_init",
      description: "Next.js SEO Service platform initialized",
      user: "System",
      timestamp: new Date(Date.now() - 7 * 86400000).toISOString()
    }
  ]
};

function readData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading db-store.json:", e);
  }
  // Initialize file if not found
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
  } catch (e) {
    console.error("Error creating initial db-store.json:", e);
  }
  return JSON.parse(JSON.stringify(initialData));
}

function writeData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing db-store.json:", e);
  }
}

export const DB = {
  // Orders
  getOrders: () => {
    const data = readData();
    return data.orders || [];
  },
  getOrderById: (id) => {
    const data = readData();
    return (data.orders || []).find(o => o.id === parseInt(id) || o.order_number === id);
  },
  createOrder: (orderData) => {
    const data = readData();
    const orders = data.orders || [];
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const orderNumber = "ORD-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const invoiceNumber = "INV-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + String(newId).padStart(3, "0");
    
    const newOrder = {
      id: newId,
      order_number: orderNumber,
      invoice_id: newId,
      invoice_number: invoiceNumber,
      status: "awaiting_payment",
      payment_status: "pending",
      created_at: new Date().toISOString(),
      ...orderData
    };
    orders.unshift(newOrder);
    data.orders = orders;
    writeData(data);
    return newOrder;
  },
  updateOrder: (id, updateFields) => {
    const data = readData();
    const orders = data.orders || [];
    const idx = orders.findIndex(o => o.id === parseInt(id) || o.order_number === id);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], ...updateFields };
      if (updateFields.status === "in_progress" || updateFields.status === "completed") {
        orders[idx].payment_status = "confirmed";
      }
      data.orders = orders;
      writeData(data);
      return orders[idx];
    }
    return null;
  },
  updateOrderStatus: (id, status) => {
    const data = readData();
    const orders = data.orders || [];
    const order = orders.find(o => o.id === parseInt(id) || o.order_number === id);
    if (order) {
      order.status = status;
      if (status === "in_progress" || status === "completed") {
        order.payment_status = "confirmed";
      }
      data.orders = orders;
      writeData(data);
      return order;
    }
    return null;
  },
  deleteOrder: (id) => {
    const data = readData();
    const orders = data.orders || [];
    const initialLen = orders.length;
    data.orders = orders.filter(o => o.id !== parseInt(id) && o.order_number !== id);
    if (data.orders.length !== initialLen) {
      writeData(data);
      return true;
    }
    return false;
  },

  // Inquiries
  getInquiries: () => {
    const data = readData();
    return data.inquiries || [];
  },
  getInquiryById: (id) => {
    const data = readData();
    return (data.inquiries || []).find(i => i.id === parseInt(id));
  },
  createInquiry: (inquiryData) => {
    const data = readData();
    const inquiries = data.inquiries || [];
    const newId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1;
    const newInquiry = {
      id: newId,
      status: "new",
      created_at: new Date().toISOString(),
      ...inquiryData
    };
    inquiries.unshift(newInquiry);
    data.inquiries = inquiries;
    writeData(data);
    return newInquiry;
  },
  updateInquiry: (id, updateFields) => {
    const data = readData();
    const inquiries = data.inquiries || [];
    const idx = inquiries.findIndex(i => i.id === parseInt(id));
    if (idx !== -1) {
      inquiries[idx] = { ...inquiries[idx], ...updateFields };
      data.inquiries = inquiries;
      writeData(data);
      return inquiries[idx];
    }
    return null;
  },
  updateInquiryStatus: (id, status) => {
    const data = readData();
    const inquiries = data.inquiries || [];
    const inquiry = inquiries.find(i => i.id === parseInt(id));
    if (inquiry) {
      inquiry.status = status;
      data.inquiries = inquiries;
      writeData(data);
      return inquiry;
    }
    return null;
  },
  deleteInquiry: (id) => {
    const data = readData();
    const inquiries = data.inquiries || [];
    const initialLen = inquiries.length;
    data.inquiries = inquiries.filter(i => i.id !== parseInt(id));
    if (data.inquiries.length !== initialLen) {
      writeData(data);
      return true;
    }
    return false;
  },

  // Leads
  getLeads: () => {
    const data = readData();
    return data.leads || [];
  },
  createLead: (leadData) => {
    const data = readData();
    const leads = data.leads || [];
    const newLead = {
      id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1,
      status: "new",
      created_at: new Date().toISOString(),
      ...leadData
    };
    leads.unshift(newLead);
    data.leads = leads;
    writeData(data);
    return newLead;
  },
  updateLead: (id, updateFields) => {
    const data = readData();
    const leads = data.leads || [];
    const idx = leads.findIndex(l => l.id === parseInt(id));
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...updateFields };
      data.leads = leads;
      writeData(data);
      return leads[idx];
    }
    return null;
  },
  updateLeadStatus: (id, status) => {
    const data = readData();
    const leads = data.leads || [];
    const lead = leads.find(l => l.id === parseInt(id));
    if (lead) {
      lead.status = status;
      data.leads = leads;
      writeData(data);
      return lead;
    }
    return null;
  },
  deleteLead: (id) => {
    const data = readData();
    const leads = data.leads || [];
    const initialLen = leads.length;
    data.leads = leads.filter(l => l.id !== parseInt(id));
    if (data.leads.length !== initialLen) {
      writeData(data);
      return true;
    }
    return false;
  },

  // Audit Logs & Activity
  getAuditLogs: () => {
    const data = readData();
    return data.auditLogs || [];
  },
  addAuditLog: (logData) => {
    const data = readData();
    const logs = data.auditLogs || [];
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toISOString(),
      user: "Admin",
      ...logData
    };
    logs.unshift(newLog);
    data.auditLogs = logs;
    writeData(data);
    return newLog;
  },

  // Invoices
  getInvoices: () => {
    const data = readData();
    const orders = data.orders || [];
    return orders.map(o => ({
      id: o.invoice_id || o.id,
      invoice_number: o.invoice_number || `INV-${o.id}`,
      order_id: o.id,
      order_number: o.order_number,
      client_name: o.client_name || "Valued Client",
      client_email: o.client_email || "client@example.com",
      service_title: o.service_title,
      package_name: o.package_name,
      subtotal: o.subtotal,
      total: o.total,
      payment_method: o.payment_method,
      status: o.payment_status === "confirmed" ? "paid" : "pending",
      issued_at: o.created_at
    }));
  },
  getInvoiceById: (id) => {
    const data = readData();
    const orders = data.orders || [];
    const order = orders.find(o => o.id === parseInt(id) || o.invoice_id === parseInt(id));
    if (!order) return null;
    return {
      id: order.invoice_id || order.id,
      invoice_number: order.invoice_number || `INV-${order.id}`,
      order_id: order.id,
      order_number: order.order_number,
      client_name: order.client_name || "Valued Client",
      client_email: order.client_email || "client@example.com",
      service_title: order.service_title,
      package_name: order.package_name,
      subtotal: order.subtotal,
      total: order.total,
      payment_method: order.payment_method,
      status: order.payment_status === "confirmed" ? "paid" : "pending",
      issued_at: order.created_at
    };
  }
};

