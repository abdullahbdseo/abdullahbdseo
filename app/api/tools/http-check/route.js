import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    const startTime = Date.now();
    let response;
    try {
      response = await fetch(targetUrl, {
        method: "GET",
        redirect: "manual",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (DigiSolution-Bot)"
        }
      });
    } catch (fetchErr) {
      return NextResponse.json({
        success: false,
        error: `Could not reach ${targetUrl}. ${fetchErr.message}`
      }, { status: 502 });
    }

    const responseTime = Date.now() - startTime;
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const isSecure = targetUrl.startsWith("https://");
    const securityHeaders = {
      "strict-transport-security": headers["strict-transport-security"] || null,
      "x-frame-options": headers["x-frame-options"] || null,
      "x-content-type-options": headers["x-content-type-options"] || null,
      "content-security-policy": headers["content-security-policy"] || null,
      "referrer-policy": headers["referrer-policy"] || null
    };

    return NextResponse.json({
      success: true,
      url: targetUrl,
      status: response.status,
      statusText: response.statusText,
      responseTimeMs: responseTime,
      isSecure,
      server: headers["server"] || "Hidden",
      contentType: headers["content-type"] || "Unknown",
      location: headers["location"] || null,
      securityHeaders,
      allHeaders: headers
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
