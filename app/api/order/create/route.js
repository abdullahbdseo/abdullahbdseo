import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.website_url || !data.total) {
      return NextResponse.json({ success: false, error: "Website URL and Amount are required." }, { status: 400 });
    }

    const newOrder = DB.createOrder({
      service_id: data.service_id || null,
      service_title: data.service_title || "Custom SEO Deliverable",
      package_name: data.package_name || "Custom Scope",
      website_url: data.website_url,
      target_country: data.target_country || "Global",
      target_keywords: data.target_keywords || "",
      client_notes: data.client_notes || "",
      client_name: data.client_name || "Valued Client",
      client_email: data.client_email || "client@example.com",
      subtotal: parseFloat(data.total),
      total: parseFloat(data.total),
      currency: "USD",
      payment_method: data.payment_method || "NOWPAYMENTS-USDT"
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
      orderId: newOrder.id,
      redirectUrl: `/checkout/${newOrder.id}`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
