// lib/db.js - Memory & File-Backed Storage for Orders, Inquiries, Leads and Audit Logs

// Seed initial demo orders
let ordersStore = [
  {
    id: 1,
    order_number: "ORD-20260829-001",
    user_id: 2,
    service_id: 1,
    service_title: "Comprehensive Technical SEO Audit",
    package_name: "Standard Audit (Most Popular)",
    website_url: "https://example-globaldigital.com",
    target_country: "United States",
    target_keywords: "saas billing, technical seo, enterprise software",
    client_notes: "Focus primarily on our /solutions subfolder and check crawl depth.",
    subtotal: 650.00,
    total: 650.00,
    currency: "USD",
    status: "in_progress",
    payment_status: "confirmed",
    payment_method: "NOWPAYMENTS-USDT",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    invoice_id: 1,
    invoice_number: "INV-20260829-001",
    client_name: "Alex Harrison",
    client_email: "client@seoservice.local"
  },
  {
    id: 2,
    order_number: "ORD-20260830-4F2A",
    user_id: 3,
    service_id: 2,
    service_title: "Strategic Keyword Research & Topic Clustering",
    package_name: "Growth Authority Blueprint",
    website_url: "https://apex-store-au.com",
    target_country: "Australia",
    target_keywords: "ergonomic chairs, standing desks melbourne",
    client_notes: "Targeting high commercial intent keywords in AU market.",
    subtotal: 500.00,
    total: 500.00,
    currency: "USD",
    status: "completed",
    payment_status: "confirmed",
    payment_method: "bkash",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    invoice_id: 2,
    invoice_number: "INV-20260830-002",
    client_name: "Liam O'Connor",
    client_email: "liam@apex-store-au.com"
  }
];

let inquiriesStore = [
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
];

let leadsStore = [];
let auditLogsStore = [
  {
    id: 1,
    action: "system_init",
    description: "Next.js SEO Service platform initialized",
    timestamp: new Date().toISOString()
  }
];

export const DB = {
  // Orders
  getOrders: () => ordersStore,
  getOrderById: (id) => ordersStore.find(o => o.id === parseInt(id) || o.order_number === id),
  createOrder: (orderData) => {
    const newId = ordersStore.length > 0 ? Math.max(...ordersStore.map(o => o.id)) + 1 : 1;
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
    ordersStore.unshift(newOrder);
    return newOrder;
  },
  updateOrderStatus: (id, status) => {
    const order = ordersStore.find(o => o.id === parseInt(id));
    if (order) {
      order.status = status;
      if (status === "in_progress" || status === "completed") {
        order.payment_status = "confirmed";
      }
      return order;
    }
    return null;
  },

  // Inquiries
  getInquiries: () => inquiriesStore,
  createInquiry: (inquiryData) => {
    const newId = inquiriesStore.length > 0 ? Math.max(...inquiriesStore.map(i => i.id)) + 1 : 1;
    const newInquiry = {
      id: newId,
      status: "new",
      created_at: new Date().toISOString(),
      ...inquiryData
    };
    inquiriesStore.unshift(newInquiry);
    return newInquiry;
  },

  // Leads
  createLead: (leadData) => {
    const newLead = {
      id: leadsStore.length + 1,
      created_at: new Date().toISOString(),
      ...leadData
    };
    leadsStore.unshift(newLead);
    return newLead;
  },

  // Invoices
  getInvoices: () => ordersStore.map(o => ({
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
  })),
  getInvoiceById: (id) => {
    const order = ordersStore.find(o => o.id === parseInt(id) || o.invoice_id === parseInt(id));
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
