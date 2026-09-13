import { NextResponse } from "next/server";
import { refreshOldBlogs } from "@/scripts/refresh-old-blogs.mjs";

export async function POST() {
  try {
    const result = refreshOldBlogs();
    return NextResponse.json({
      success: true,
      message: `Successfully refreshed and updated ${result.count || "all"} blog articles with fresh Google E-E-A-T timestamps!`,
      result,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
