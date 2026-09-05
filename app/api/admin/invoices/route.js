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
