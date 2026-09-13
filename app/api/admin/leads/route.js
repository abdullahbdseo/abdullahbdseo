import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const inquiries = DB.getInquiries();
    const leads = DB.getLeads();
    return NextResponse.json({
      success: true,
      inquiries,
      leads
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { type, id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    if (type === "lead") {
      const updated = DB.updateLead(id, updateData);
      DB.addAuditLog({
        action: "lead_updated",
        description: `Lead #${id} was updated`
      });
      return NextResponse.json({ success: true, item: updated });
    } else {
      const updated = DB.updateInquiry(id, updateData);
      DB.addAuditLog({
        action: "inquiry_updated",
        description: `Inquiry #${id} was updated`
      });
      return NextResponse.json({ success: true, item: updated });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    if (type === "lead") {
      DB.deleteLead(id);
      DB.addAuditLog({
        action: "lead_deleted",
        description: `Lead #${id} was deleted`
      });
    } else {
      DB.deleteInquiry(id);
      DB.addAuditLog({
        action: "inquiry_deleted",
        description: `Inquiry #${id} was deleted`
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
