import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

// In-memory rate limiting: max 3 crypto TX submissions per 15 minutes per IP
const txSubmissions = new Map();

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
  let timestamps = txSubmissions.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) return true;
  timestamps.push(now);
  txSubmissions.set(ip, timestamps);
  return false;
}

export async function POST(req) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many transaction submissions. Please wait before trying again." },
      { status: 429 }
    );
  }

  try {
    const { orderId, txHash, coin } = await req.json();

    if (!orderId || !txHash) {
      return NextResponse.json({ success: false, error: "Order ID and Transaction Hash are required." }, { status: 400 });
    }

    const order = await DB.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    const updated = await DB.updateOrder(orderId, {
      crypto_tx_hash: txHash,
      crypto_coin: coin || "USDT",
      payment_method: `CRYPTO-${coin || "USDT"}`,
      status: "in_progress",
      payment_status: "confirmed"
    });

    return NextResponse.json({
      success: true,
      message: "Transaction hash submitted successfully. Your payment is confirmed and order is now in progress.",
      order: updated || order
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
