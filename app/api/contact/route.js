import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.name || !data.email) {
      return NextResponse.json({ success: false, error: "Name and Email are required" }, { status: 400 });
    }

    const inquiry = DB.createInquiry({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      website_url: data.website || data.website_url || "",
      budget: data.budget || "Unspecified",
      service_interested: data.service_interest || data.service_interested || "General Consultation",
      message: data.message || ""
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
