import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export async function GET() {
  try {
    const invoices = DB.getInvoices();
    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const data = await req.json();
    const { id, issued_at, total, client_name, client_email, status, invoice_number } = data;
    if (!id) {
      return NextResponse.json({ success: false, error: "Invoice ID required" }, { status: 400 });
    }
    
    // Update underlying order
    const updateData = {};
    if (issued_at) updateData.created_at = issued_at;
    if (total !== undefined) updateData.total = Number(total);
    if (client_name) updateData.client_name = client_name;
    if (client_email) updateData.client_email = client_email;
    if (invoice_number) updateData.invoice_number = invoice_number;
    if (status) {
      updateData.payment_status = status === "paid" ? "confirmed" : "pending";
      if (status === "paid") updateData.status = "completed";
    }

    const updated = DB.updateOrder(id, updateData);
    DB.addAuditLog({
      action: "invoice_updated",
      description: `Invoice #${id} was updated by Admin`
    });

    return NextResponse.json({ success: true, invoice: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Invoice ID required" }, { status: 400 });
    }
    DB.deleteOrder(id);
    DB.addAuditLog({
      action: "invoice_deleted",
      description: `Invoice #${id} was deleted by Admin`
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
