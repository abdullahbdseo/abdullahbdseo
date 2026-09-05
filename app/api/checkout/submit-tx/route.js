import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function POST(req) {
  try {
    const { orderId, txHash, coin } = await req.json();

    if (!orderId || !txHash) {
      return NextResponse.json({ success: false, error: "Order ID and Transaction Hash are required." }, { status: 400 });
    }

    const order = DB.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    order.crypto_tx_hash = txHash;
    order.crypto_coin = coin || "USDT";
    order.payment_method = `CRYPTO-${coin || "USDT"}`;
    order.status = "in_progress";
    order.payment_status = "confirmed";

    return NextResponse.json({
      success: true,
      message: "Transaction hash submitted successfully. Your payment is confirmed and order is now in progress.",
      order
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
