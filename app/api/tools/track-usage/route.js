import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

// Helper for country names & flags
function getGeoInfo(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "103.145.118.42";

  const countryCode =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "BD";

  const countryMap = {
    BD: { country: "Bangladesh", flag: "🇧🇩" },
    US: { country: "United States", flag: "🇺🇸" },
    GB: { country: "United Kingdom", flag: "🇬🇧" },
    CA: { country: "Canada", flag: "🇨🇦" },
    AU: { country: "Australia", flag: "🇦🇺" },
    AE: { country: "United Arab Emirates", flag: "🇦🇪" },
    IN: { country: "India", flag: "🇮🇳" },
    DE: { country: "Germany", flag: "🇩🇪" },
    SG: { country: "Singapore", flag: "🇸🇬" }
  };

  const geo = countryMap[countryCode] || { country: countryCode || "Unknown", flag: "🌐" };
  const city = req.headers.get("x-vercel-ip-city") || "";

  // User Agent Parsing
  const ua = req.headers.get("user-agent") || "";
  let device = "Desktop (Windows)";
  if (/android/i.test(ua)) device = "Mobile (Android)";
  else if (/iphone|ipad|ipod/i.test(ua)) device = "Mobile (iOS)";
  else if (/macintosh|mac os x/i.test(ua)) device = "Desktop (Mac OS)";
  else if (/linux/i.test(ua)) device = "Desktop (Linux)";

  let browser = "Chrome";
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";

  return { ip, country: geo.country, country_code: countryCode, flag: geo.flag, city, device, browser, user_agent: ua };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const geoInfo = getGeoInfo(req);

    const logEntry = await DB.addToolUsageLog({
      tool_name: body.tool_name || "SEO Tool",
      tool_slug: body.tool_slug || "tool",
      target_url: body.target_url || "",
      target_domain: body.target_domain || "",
      input_summary: body.input_summary || "",
      score: body.score !== undefined ? body.score : null,
      status: body.status || "completed",
      meta: body.meta || null,
      ...geoInfo
    });

    return NextResponse.json({ success: true, log: logEntry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const tool = searchParams.get("tool") || "";
    const limit = parseInt(searchParams.get("limit") || "200");

    const allLogs = await DB.getToolUsageLogs();

    let filtered = allLogs;
    if (tool && tool !== "all") {
      filtered = filtered.filter(l => l.tool_slug === tool || l.tool_name?.toLowerCase().includes(tool.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(l =>
        l.target_url?.toLowerCase().includes(q) ||
        l.target_domain?.toLowerCase().includes(q) ||
        l.tool_name?.toLowerCase().includes(q) ||
        l.input_summary?.toLowerCase().includes(q) ||
        l.ip?.includes(q) ||
        l.country?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      logs: filtered.slice(0, limit),
      total: allLogs.length,
      filtered_count: filtered.length
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      await DB.deleteToolUsageLog(id);
      return NextResponse.json({ success: true, message: "Log deleted" });
    } else {
      await DB.clearToolUsageLogs();
      return NextResponse.json({ success: true, message: "All logs cleared" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
