import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const orders = await DB.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newOrder = await DB.createOrder(data);
    await DB.addAuditLog({
      action: "order_created",
      description: `New order ${newOrder.order_number} created manually by Admin`
    });
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const data = await req.json();
    const { id } = data;
    if (!id) {
      return NextResponse.json({ success: false, error: "Order ID required" }, { status: 400 });
    }
    const updated = await DB.updateOrder(id, data);
    await DB.addAuditLog({
      action: "order_updated",
      description: `Order #${id} (${updated?.order_number || ""}) was updated by Admin`
    });
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Order ID required" }, { status: 400 });
    }
    await DB.deleteOrder(id);
    await DB.addAuditLog({
      action: "order_deleted",
      description: `Order #${id} was deleted by Admin`
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
