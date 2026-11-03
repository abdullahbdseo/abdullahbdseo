// middleware.js - Server-Side Admin Route Protection (Edge Runtime Compliant)
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes - return 404 to hide admin existence
  if (pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get("admin_session")?.value;

    // If no valid admin session, return 404 (do NOT redirect to login)
    if (!sessionCookie || typeof sessionCookie !== "string" || sessionCookie.trim() === "") {
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


