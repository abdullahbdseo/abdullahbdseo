import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function POST(req) {
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
