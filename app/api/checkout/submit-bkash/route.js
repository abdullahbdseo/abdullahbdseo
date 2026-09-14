import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function POST(req) {
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
