import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const inquiries = await DB.getInquiries();
    const leads = await DB.getLeads();
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
      const updated = await DB.updateLead(id, updateData);
      await DB.addAuditLog({
        action: "lead_updated",
        description: `Lead #${id} was updated`
      });
      return NextResponse.json({ success: true, item: updated });
    } else {
      const updated = await DB.updateInquiry(id, updateData);
      await DB.addAuditLog({
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
      await DB.deleteLead(id);
      await DB.addAuditLog({
        action: "lead_deleted",
        description: `Lead #${id} was deleted`
      });
    } else {
      await DB.deleteInquiry(id);
      await DB.addAuditLog({
        action: "inquiry_deleted",
        description: `Inquiry #${id} was deleted`
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
