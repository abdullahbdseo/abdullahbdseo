import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || searchParams.get("order") || "").trim().toLowerCase();

    if (!query) {
      return NextResponse.json({ success: false, error: "Please enter your Order ID, Email, or Phone number." }, { status: 400 });
    }

    const allOrders = await DB.getOrders();
    
    // Find matching order
    const match = allOrders.find((ord) => {
      const ordNum = (ord.order_number || "").toLowerCase();
      const ordId = String(ord.id || "").toLowerCase();
      const email = (ord.client_email || "").toLowerCase();
      const phone = (ord.client_phone || "").replace(/[^0-9]/g, "");
      const cleanQ = query.replace(/[^0-9]/g, "");

      return (
        ordNum === query ||
        ordNum.includes(query) ||
        ordId === query ||
        email === query ||
        (cleanQ.length >= 6 && phone.includes(cleanQ))
      );
    });

    if (!match) {
      return NextResponse.json({
        success: false,
        error: "No matching order found. Please check your Order ID or contact us on WhatsApp."
      }, { status: 404 });
    }

    // Determine progress & steps
    let progress = match.progress_percent;
    if (progress === undefined || progress === null) {
      const statusMap = {
        pending: 20,
        processing: 45,
        in_progress: 65,
        review: 85,
        completed: 100,
        delivered: 100,
        cancelled: 0,
      };
      progress = statusMap[match.status?.toLowerCase()] ?? 30;
    }

    const steps = [
      {
        id: 1,
        title: "Order Placed & Confirmed",
        desc: "Requirements and payment verified. Project queued for execution.",
        completed: progress >= 20,
        active: progress < 45 && progress >= 20,
      },
      {
        id: 2,
        title: "Niche & Target Strategy Mapping",
        desc: "Target URLs, anchor texts, and competitive search gap analyzed.",
        completed: progress >= 45,
        active: progress < 65 && progress >= 45,
      },
      {
        id: 3,
        title: "Active Execution & Link Velocity",
        desc: "Live backlink generation and high-DR contextual publication in progress.",
        completed: progress >= 65,
        active: progress < 85 && progress >= 65,
      },
      {
        id: 4,
        title: "Quality Inspection & Indexation Check",
        desc: "Indexing ping, DOFOLLOW verification, and anchor audit completed.",
        completed: progress >= 85,
        active: progress < 100 && progress >= 85,
      },
      {
        id: 5,
        title: "Final Delivery & Report Ready",
        desc: "Live Google Sheet work report compiled and delivered to client.",
        completed: progress >= 100,
        active: progress >= 100,
      },
    ];

    // Sanitized response for public view
    const safeOrder = {
      order_number: match.order_number || `ORD-${match.id}`,
      client_name: match.client_name || "Valued Client",
      service_name: match.service_name || match.service_title || "SEO & Authority Campaign",
      package_name: match.package_name || "Custom Package",
      amount: match.amount || match.total_price || 0,
      currency: match.currency || "USD",
      status: match.status || "In Progress",
      progress_percent: progress,
      created_at: match.created_at || match.date || new Date().toISOString(),
      estimated_delivery: match.estimated_delivery || match.delivery_date || "Within 5-7 Business Days",
      report_url: match.report_url || match.sheet_url || match.delivery_link || null,
      delivery_link: match.delivery_link || match.report_url || match.sheet_url || null,
      delivery_notes: match.delivery_notes || null,
      invoice_id: match.invoice_id || match.id,
      invoice_number: match.invoice_number || `INV-2026-${match.id}`,
      website_url: match.website_url || null,
      target_keywords: match.target_keywords || null,
      steps,
    };

    return NextResponse.json({ success: true, order: safeOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
