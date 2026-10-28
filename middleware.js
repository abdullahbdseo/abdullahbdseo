// middleware.js - Server-Side Admin Route Protection
// Runs on the Edge before any page renders — cannot be bypassed via localStorage tricks
import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Lightweight token verifier for the Edge runtime.
 * Mirrors the logic in lib/auth-guard.js but runs server-side before the page loads.
 */
function verifyEdgeToken(token) {
  if (!token || typeof token !== "string") return false;

  const secret = process.env.CMS_SECRET_TOKEN;
  if (!secret) return false;

  // Direct secret match (for internal scripts)
  if (token === secret) return true;

  // JWT-style token verification
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [header, payload, signature] = parts;

  try {
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${header}.${payload}`)
      .digest("base64url");

    if (signature !== expectedSig) return false;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (data.exp && Date.now() > data.exp) return false;

    return true;
  } catch {
    return false;
  }
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (not /api/admin — those have their own verifyAdminAuth)
  if (pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get("admin_session")?.value;

    if (!verifyEdgeToken(sessionCookie)) {
      // Redirect to the hidden admin login page
      const loginUrl = new URL("/100100", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all /admin/* routes but exclude static files and Next internals
  matcher: ["/admin/:path*"],
};

