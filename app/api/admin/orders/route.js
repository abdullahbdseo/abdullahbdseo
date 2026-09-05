import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function GET() {
  try {
    const orders = DB.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and Status required" }, { status: 400 });
    }
    const updated = DB.updateOrderStatus(id, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
