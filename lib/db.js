// lib/db.js - Firestore + File-Backed Persistent Storage for Orders, Inquiries, Leads, and Audit Logs
import fs from "fs";
import path from "path";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  ],
  tool_usage_logs: [
    {
      id: "LOG-k9z1-a1b2",
      timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
      tool_name: "Deep SEO Audit",
      tool_slug: "deep-seo-audit",
      target_url: "https://shopnest-bd.com",
      target_domain: "shopnest-bd.com",
      input_summary: "Comprehensive 180+ Point Technical SEO & CWV Inspection",
      score: 74,
      status: "completed",
      ip: "103.145.118.42",
      country: "Bangladesh",
      country_code: "BD",
      flag: "🇧🇩",
      device: "Desktop (Windows)",
      browser: "Chrome 128"
    },
    {
      id: "LOG-k9z2-c3d4",
      timestamp: new Date(Date.now() - 32 * 60000).toISOString(),
      tool_name: "JSON-LD Schema Generator",
      tool_slug: "schema-markup-generator",
      target_url: "https://fintechflow.io",
      target_domain: "fintechflow.io",
      input_summary: "Generated Organization + WebSite + FAQPage Master Graph",
      score: 100,
      status: "generated",
      ip: "157.240.22.35",
      country: "United States",
      country_code: "US",
      flag: "🇺🇸",
      device: "Desktop (Mac OS)",
      browser: "Safari 17"
    },
    {
      id: "LOG-k9z3-e5f6",
      timestamp: new Date(Date.now() - 95 * 60000).toISOString(),
      tool_name: "PageSpeed & Core Web Vitals",
      tool_slug: "pagespeed-analyzer",
      target_url: "https://luxuryspa-dhaka.com",
      target_domain: "luxuryspa-dhaka.com",
      input_summary: "Mobile & Desktop LCP (2.4s), FID (18ms), CLS (0.04) Audit",
      score: 88,
      status: "completed",
      ip: "103.205.71.18",
      country: "Bangladesh",
      country_code: "BD",
      flag: "🇧🇩",
      device: "Mobile (Android)",
      browser: "Chrome Mobile"
    },
    {
      id: "LOG-k9z4-g7h8",
      timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
      tool_name: "HTTP Header & Security Checker",
      tool_slug: "http-header-checker",
      target_url: "https://techpulse-hub.io",
      target_domain: "techpulse-hub.io",
      input_summary: "Status 200 OK, HSTS Enabled, X-Frame-Options SAMEORIGIN",
      score: 92,
      status: "completed",
      ip: "185.199.108.153",
      country: "United Kingdom",
      country_code: "GB",
      flag: "🇬🇧",
      device: "Desktop (Windows)",
      browser: "Edge 128"
    },
    {
      id: "LOG-k9z5-i9j0",
      timestamp: new Date(Date.now() - 320 * 60000).toISOString(),
      tool_name: "Backlink Package Calculator",
      tool_slug: "backlink-package-calculator",
      target_url: "https://daraz-seller-store.com",
      target_domain: "daraz-seller-store.com",
      input_summary: "Selected 15x DR70+ Contextual Editorial Links ($750)",
      score: null,
      status: "calculated",
      ip: "103.112.54.90",
      country: "Bangladesh",
      country_code: "BD",
      flag: "🇧🇩",
      device: "Desktop (Windows)",
      browser: "Chrome 128"
    },
    {
      id: "LOG-k9z6-k1l2",
      timestamp: new Date(Date.now() - 540 * 60000).toISOString(),
      tool_name: "Keyword Density & TF-IDF Analyzer",
      tool_slug: "keyword-density-checker",
      target_url: "https://sydneyplumbingpros.com.au",
      target_domain: "sydneyplumbingpros.com.au",
      input_summary: "Analyzed 1,480 words for keyword 'emergency plumber sydney' (2.1%)",
      score: 85,
      status: "completed",
      ip: "139.130.4.5",
      country: "Australia",
      country_code: "AU",
      flag: "🇦🇺",
      device: "Desktop (Mac OS)",
      browser: "Chrome 128"
    }
  ]
};

function readLocalData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading db-store.json:", e);
  }
  return JSON.parse(JSON.stringify(initialData));
}

function writeLocalData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // Read-only filesystem warning on serverless
  }
}

// Cloud Firestore helpers
async function getCloudStore(key, fallbackDefault) {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "cms_content", key);
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data()?.value !== undefined) {
        return snap.data().value;
      }
    } catch (err) {
      console.warn(`Firestore read failed for [${key}]:`, err.message);
    }
  }
  const local = readLocalData();
  return local[key] !== undefined ? local[key] : fallbackDefault;
}

async function saveCloudStore(key, value) {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "cms_content", key);
      await setDoc(docRef, { value, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.warn(`Firestore save failed for [${key}]:`, err.message);
    }
  }
  const local = readLocalData();
  local[key] = value;
  writeLocalData(local);
}

export const DB = {
  // Orders
  getOrders: async () => {
    return await getCloudStore("orders", []);
  },
  getOrderById: async (id) => {
    const orders = await getCloudStore("orders", []);
    return orders.find(o => o.id === parseInt(id) || o.order_number === id);
  },
  createOrder: async (orderData) => {
    const orders = await getCloudStore("orders", []);
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id || 0)) + 1 : 1;
    const orderNumber = "ORD-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const invoiceNumber = "INV-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + String(newId).padStart(3, "0");
    
    const newOrder = {
      id: newId,
      order_number: orderNumber,
      invoice_id: newId,
      invoice_number: invoiceNumber,
      status: "new",
      payment_status: "pending",
      created_at: new Date().toISOString(),
      ...orderData
    };
    orders.unshift(newOrder);
    await saveCloudStore("orders", orders);
    return newOrder;
  },
  updateOrder: async (id, updateFields) => {
    const orders = await getCloudStore("orders", []);
    const idx = orders.findIndex(o => o.id === parseInt(id) || o.order_number === id);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], ...updateFields };
      if (updateFields.status === "in_progress" || updateFields.status === "completed") {
        orders[idx].payment_status = "confirmed";
      }
      await saveCloudStore("orders", orders);
      return orders[idx];
    }
    return null;
  },
  updateOrderStatus: async (id, status) => {
    const orders = await getCloudStore("orders", []);
    const order = orders.find(o => o.id === parseInt(id) || o.order_number === id);
    if (order) {
      order.status = status;
      if (status === "in_progress" || status === "completed") {
        order.payment_status = "confirmed";
      }
      await saveCloudStore("orders", orders);
      return order;
    }
    return null;
  },
  deleteOrder: async (id) => {
    const orders = await getCloudStore("orders", []);
    const filtered = orders.filter(o => o.id !== parseInt(id) && o.order_number !== id);
    if (filtered.length !== orders.length) {
      await saveCloudStore("orders", filtered);
      return true;
    }
    return false;
  },

  // Inquiries
  getInquiries: async () => {
    return await getCloudStore("inquiries", initialData.inquiries);
  },
  getInquiryById: async (id) => {
    const inquiries = await getCloudStore("inquiries", initialData.inquiries);
    return inquiries.find(i => i.id === parseInt(id));
  },
  createInquiry: async (inquiryData) => {
    const inquiries = await getCloudStore("inquiries", initialData.inquiries);
    const newId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id || 0)) + 1 : 1;
    const newInquiry = {
      id: newId,
      status: "new",
      created_at: new Date().toISOString(),
      ...inquiryData
    };
    inquiries.unshift(newInquiry);
    await saveCloudStore("inquiries", inquiries);
    return newInquiry;
  },
  updateInquiry: async (id, updateFields) => {
    const inquiries = await getCloudStore("inquiries", initialData.inquiries);
    const idx = inquiries.findIndex(i => i.id === parseInt(id));
    if (idx !== -1) {
      inquiries[idx] = { ...inquiries[idx], ...updateFields };
      await saveCloudStore("inquiries", inquiries);
      return inquiries[idx];
    }
    return null;
  },
  updateInquiryStatus: async (id, status) => {
    const inquiries = await getCloudStore("inquiries", initialData.inquiries);
    const inquiry = inquiries.find(i => i.id === parseInt(id));
    if (inquiry) {
      inquiry.status = status;
      await saveCloudStore("inquiries", inquiries);
      return inquiry;
    }
    return null;
  },
  deleteInquiry: async (id) => {
    const inquiries = await getCloudStore("inquiries", initialData.inquiries);
    const filtered = inquiries.filter(i => i.id !== parseInt(id));
    if (filtered.length !== inquiries.length) {
      await saveCloudStore("inquiries", filtered);
      return true;
    }
    return false;
  },

  // Leads
  getLeads: async () => {
    return await getCloudStore("leads", initialData.leads);
  },
  createLead: async (leadData) => {
    const leads = await getCloudStore("leads", initialData.leads);
    const newId = leads.length > 0 ? Math.max(...leads.map(l => l.id || 0)) + 1 : 1;
    const newLead = {
      id: newId,
      status: "new",
      created_at: new Date().toISOString(),
      ...leadData
    };
    leads.unshift(newLead);
    await saveCloudStore("leads", leads);
    return newLead;
  },
  updateLead: async (id, updateFields) => {
    const leads = await getCloudStore("leads", initialData.leads);
    const idx = leads.findIndex(l => l.id === parseInt(id));
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...updateFields };
      await saveCloudStore("leads", leads);
      return leads[idx];
    }
    return null;
  },
  updateLeadStatus: async (id, status) => {
    const leads = await getCloudStore("leads", initialData.leads);
    const lead = leads.find(l => l.id === parseInt(id));
    if (lead) {
      lead.status = status;
      await saveCloudStore("leads", leads);
      return lead;
    }
    return null;
  },
  deleteLead: async (id) => {
    const leads = await getCloudStore("leads", initialData.leads);
    const filtered = leads.filter(l => l.id !== parseInt(id));
    if (filtered.length !== leads.length) {
      await saveCloudStore("leads", filtered);
      return true;
    }
    return false;
  },

  // Audit Logs & Activity
  getAuditLogs: async () => {
    return await getCloudStore("auditLogs", initialData.auditLogs);
  },
  addAuditLog: async (logData) => {
    const logs = await getCloudStore("auditLogs", initialData.auditLogs);
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toISOString(),
      user: "Admin",
      ...logData
    };
    logs.unshift(newLog);
    await saveCloudStore("auditLogs", logs);
    return newLog;
  },

  // Tool Usage & Real-time Website Audits
  getToolUsageLogs: async () => {
    return await getCloudStore("tool_usage_logs", initialData.tool_usage_logs);
  },
  addToolUsageLog: async (logData) => {
    const logs = await getCloudStore("tool_usage_logs", initialData.tool_usage_logs);
    const newId = "LOG-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 6);
    
    let domain = logData.target_domain || "";
    if (!domain && logData.target_url) {
      try {
        let u = logData.target_url.trim();
        if (!u.startsWith("http://") && !u.startsWith("https://")) u = "https://" + u;
        domain = new URL(u).hostname.replace(/^www\./, "");
      } catch (e) {
        domain = logData.target_url.slice(0, 40);
      }
    }

    const newLog = {
      id: newId,
      timestamp: new Date().toISOString(),
      tool_name: logData.tool_name || "SEO Tool",
      tool_slug: logData.tool_slug || "tool",
      target_url: logData.target_url || "",
      target_domain: domain,
      input_summary: logData.input_summary || "",
      score: logData.score !== undefined ? logData.score : null,
      status: logData.status || "completed",
      ip: logData.ip || "127.0.0.1",
      country: logData.country || "Bangladesh",
      country_code: logData.country_code || "BD",
      flag: logData.flag || "🇧🇩",
      device: logData.device || "Desktop",
      browser: logData.browser || "Browser",
      user_agent: logData.user_agent || ""
    };
    logs.unshift(newLog);
    const trimmed = logs.slice(0, 1000);
    await saveCloudStore("tool_usage_logs", trimmed);
    return newLog;
  },
  deleteToolUsageLog: async (id) => {
    const logs = await getCloudStore("tool_usage_logs", initialData.tool_usage_logs);
    const filtered = logs.filter(l => l.id !== id);
    await saveCloudStore("tool_usage_logs", filtered);
    return true;
  },
  clearToolUsageLogs: async () => {
    await saveCloudStore("tool_usage_logs", []);
    return true;
  },

  // Invoices
  getInvoices: async () => {
    const orders = await getCloudStore("orders", []);
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
  getInvoiceById: async (id) => {
    const orders = await getCloudStore("orders", []);
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
  },

  // Admin Authentication Credentials (Syncs across devices)
  getAdminCredentials: async () => {
    return await getCloudStore("admin_credentials", {
      username: "admin@seoservice.local",
      password: "admin123",
      updatedAt: new Date().toISOString()
    });
  },
  updateAdminCredentials: async (credentials) => {
    await saveCloudStore("admin_credentials", credentials);
    return credentials;
  }
};
