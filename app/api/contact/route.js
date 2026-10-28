import { NextResponse } from "next/server";
import { DB } from "@/lib/db";
import { sendTelegramNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

// In-memory rate limiting: max 5 submissions per 10 minutes per IP
const contactSubmissions = new Map();

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  let timestamps = contactSubmissions.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return true;
  }

  timestamps.push(now);
  contactSubmissions.set(ip, timestamps);
  return false;
}

export async function POST(req) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a few minutes before submitting again, or contact us directly on WhatsApp." },
      { status: 429 }
    );
  }

  try {
    const data = await req.json();

    if (!data.name || !data.email) {
      return NextResponse.json({ success: false, error: "Name and Email are required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address" }, { status: 400 });
    }

    const inquiry = await DB.createInquiry({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: (data.phone || "").trim(),
      website_url: (data.website || data.website_url || "").trim(),
      budget: data.budget || "Unspecified",
      service_interested: data.service_interest || data.service_interested || "General Consultation",
      message: (data.message || "").trim()
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
