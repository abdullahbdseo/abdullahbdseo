import { NextResponse } from "next/server";
import { DB } from "@/lib/db";
import { sendTelegramNotification } from "@/lib/notifications";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.name || !data.email) {
      return NextResponse.json({ success: false, error: "Name and Email are required" }, { status: 400 });
    }

    const inquiry = await DB.createInquiry({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      website_url: data.website || data.website_url || "",
      budget: data.budget || "Unspecified",
      service_interested: data.service_interest || data.service_interested || "General Consultation",
      message: data.message || ""
    });

    // Send instant notification
    await sendTelegramNotification({
      title: "📥 New Consultation / Strategy Inquiry",
      leadType: "Inquiry Form",
      contactName: data.name,
      contactEmail: data.email,
      contactPhone: data.phone,
      websiteUrl: data.website || data.website_url,
      serviceName: data.service_interest || data.service_interested,
      details: data.message
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully submitted.",
      inquiryId: inquiry.id
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
