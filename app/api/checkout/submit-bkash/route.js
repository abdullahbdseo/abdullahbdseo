import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function POST(req) {
  try {
    const { orderId, trxId, bdtAmount, senderNumber } = await req.json();

    if (!orderId || !trxId) {
      return NextResponse.json({ success: false, error: "Order ID and bKash TrxID are required." }, { status: 400 });
    }

    const order = DB.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    order.bkash_trx_id = trxId;
    order.bkash_sender = senderNumber || "";
    order.bkash_amount_bdt = bdtAmount;
    order.payment_method = "bkash";
    order.status = "in_progress";
    order.payment_status = "confirmed";

    return NextResponse.json({
      success: true,
      message: "bKash TrxID verified successfully. Your order is confirmed and currently in progress.",
      order
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
