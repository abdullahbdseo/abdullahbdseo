// lib/auth-guard.js - Centralized Server-Side Security Guard for Administrative Endpoints
import crypto from "crypto";

if (!process.env.CMS_SECRET_TOKEN) {
  // In development, warn loudly. In production, throw to prevent insecure startup.
  if (process.env.NODE_ENV === "production") {
    throw new Error("[SECURITY] CMS_SECRET_TOKEN environment variable is not set. Server startup aborted.");
  } else {
    console.warn("[SECURITY WARNING] CMS_SECRET_TOKEN is not set in .env.local. Using a temporary development secret.");
  }
}
const SERVER_SECRET = process.env.CMS_SECRET_TOKEN || "dev_only_temp_secret_not_for_production";

/**
 * Sign an admin session payload
 */
export function createSessionToken(username) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      user: username,
      role: "admin",
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days validity
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify a session token or secret header
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;

  // Direct secret token match (for internal scripts or cron jobs)
  if (process.env.CMS_SECRET_TOKEN && token === process.env.CMS_SECRET_TOKEN) {
    return true;
  }

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [header, payload, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (signature !== expectedSig) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (data.exp && Date.now() > data.exp) {
      return false; // Expired
    }
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Verify administrative request from Request object
 * Checks HTTP-only cookie, Authorization Bearer, x-admin-token, or x-cms-token header
 */
export function verifyAdminAuth(request) {
  if (!request) return false;

  // 1. Check HTTP-Only Cookie
  let cookieToken = null;
  if (typeof request.cookies?.get === "function") {
    cookieToken = request.cookies.get("admin_session")?.value;
  } else {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/admin_session=([^;]+)/);
    if (match) cookieToken = match[1];
  }

  if (cookieToken && verifySessionToken(cookieToken)) {
    return true;
  }

  // 2. Check Custom Headers (API / CMS hooks)
  const xAdminToken = request.headers.get("x-admin-token");
  if (xAdminToken && verifySessionToken(xAdminToken)) {
    return true;
  }

  const xCmsToken = request.headers.get("x-cms-token");
  if (xCmsToken && verifySessionToken(xCmsToken)) {
    return true;
  }

  // 3. Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.slice(7).trim();
    if (verifySessionToken(bearerToken)) {
      return true;
    }
  }

  return false;
}
