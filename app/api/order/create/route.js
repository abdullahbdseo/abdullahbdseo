import { NextResponse } from "next/server";
import { DB } from "@/lib/db";
import { sendOrderNotificationEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.client_name || !data.client_email || !data.website_url) {
      return NextResponse.json({ 
        success: false, 
        error: "Name, Email, and Website URL are required." 
      }, { status: 400 });
    }

    const newOrder = DB.createOrder({
      service_id: data.service_id || null,
      service_title: data.service_title || "Custom SEO Deliverable",
      package_name: data.package_name || "Custom Scope",
      website_url: data.website_url,
      target_country: data.target_country || "Global",
      target_keywords: data.target_keywords || "",
      client_notes: data.client_notes || "",
      client_name: data.client_name,
      client_email: data.client_email,
      client_phone: data.client_phone || data.phone || "",
      subtotal: parseFloat(data.total || data.price || 0),
      total: parseFloat(data.total || data.price || 0),
      currency: "USD",
      payment_method: "Direct Inquiry",
      status: "new"
    });

    // Also record in inquiries table for unified admin tracking
    DB.createInquiry({
      name: data.client_name,
      email: data.client_email,
      phone: data.client_phone || data.phone || "",
      website_url: data.website_url,
      budget: `$${data.total || data.price || 0}`,
      service_interested: `${data.service_title} (${data.package_name})`,
      message: `Target Keywords: ${data.target_keywords || "None specified"}\nNotes: ${data.client_notes || "None"}`
    });

    // Send automated email notification to admin with full client & package info
    await sendOrderNotificationEmail(newOrder);

    return NextResponse.json({
      success: true,
      message: "Your order inquiry has been received! Our team has been notified via email.",
      order: newOrder,
      orderId: newOrder.id
    });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
