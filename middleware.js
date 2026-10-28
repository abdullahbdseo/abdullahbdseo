// middleware.js - Server-Side Admin Route Protection (Edge Runtime Compliant)
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes from unauthorized direct browser visits
  if (pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get("admin_session")?.value;

    // If no admin session cookie exists, redirect immediately to login
    if (!sessionCookie || typeof sessionCookie !== "string" || sessionCookie.trim() === "") {
      const loginUrl = new URL("/100100", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


