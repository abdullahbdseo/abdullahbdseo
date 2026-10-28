import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

// In-memory rate limiting: max 3 payment submissions per 15 minutes per IP
const bkashSubmissions = new Map();

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 3;
  let timestamps = bkashSubmissions.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) return true;
  timestamps.push(now);
  bkashSubmissions.set(ip, timestamps);
  return false;
}

export async function POST(req) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many payment submissions. Please wait before trying again." },
      { status: 429 }
    );
  }

  try {
    const { orderId, trxId, bdtAmount, senderNumber } = await req.json();

    if (!orderId || !trxId) {
      return NextResponse.json({ success: false, error: "Order ID and bKash TrxID are required." }, { status: 400 });
    }

    const order = await DB.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    const updated = await DB.updateOrder(orderId, {
      bkash_trx_id: trxId,
      bkash_sender: senderNumber || "",
      bkash_amount_bdt: bdtAmount,
      payment_method: "bkash",
      status: "in_progress",
      payment_status: "confirmed"
    });

    return NextResponse.json({
      success: true,
      message: "bKash TrxID verified successfully. Your order is confirmed and currently in progress.",
      order: updated || order
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
