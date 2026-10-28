import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { DB } from "@/lib/db";
import { createSessionToken, verifyAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BANNED_IPS_FILE = path.join(process.cwd(), "lib", "banned-ips.json");
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function readBannedIPs() {
  try {
    if (fs.existsSync(BANNED_IPS_FILE)) {
      const content = fs.readFileSync(BANNED_IPS_FILE, "utf-8");
      return JSON.parse(content || "{}");
    }
  } catch (e) {
    // ignore
  }
  return {};
}

function writeBannedIPs(data) {
  try {
    fs.writeFileSync(BANNED_IPS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // ignore
  }
}

function checkIpBan(ip) {
  const bans = readBannedIPs();
  const record = bans[ip];
  if (record && record.bannedUntil) {
    const now = Date.now();
    if (now < record.bannedUntil) {
      const remainingMs = record.bannedUntil - now;
      const daysLeft = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
      return {
        isBanned: true,
        error: `নিরাপত্তা সতর্কতা: ভুল পাসওয়ার্ড দেওয়ার কারণে এই আইপি অ্যাড্রেসটি ৩০ দিনের জন্য ব্যান করা হয়েছে। বাকি সময়: ${daysLeft} দিন। (Security Alert: This IP is banned for 30 days due to incorrect password attempt. ${daysLeft} day(s) remaining).`
      };
    } else {
      // Ban period expired, remove
      delete bans[ip];
      writeBannedIPs(bans);
    }
  }
  return { isBanned: false };
}

function banIpAddress(ip, usernameAttempted) {
  const bans = readBannedIPs();
  const now = Date.now();
  bans[ip] = {
    bannedAt: new Date(now).toISOString(),
    bannedUntil: now + THIRTY_DAYS_MS,
    attemptedUser: usernameAttempted || "unknown",
    reason: "Failed administrative login (1 wrong password attempt - 30 days ban enforced)"
  };
  writeBannedIPs(bans);
}

function unbanIpAddress(ip) {
  const bans = readBannedIPs();
  if (bans[ip]) {
    delete bans[ip];
    writeBannedIPs(bans);
    return true;
  }
  return false;
}

// PBKDF2 Password Hashing with Salt
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `pbkdf2$${salt}$${hash}`;
}

// Verify Password (handles both PBKDF2 hashed and legacy plaintext with auto-upgrade)
function verifyPassword(inputPassword, storedPassword) {
  if (!storedPassword) return false;

  if (storedPassword.startsWith("pbkdf2$")) {
    const parts = storedPassword.split("$");
    if (parts.length === 3) {
      const salt = parts[1];
      const originalHash = parts[2];
      const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 100000, 64, "sha512").toString("hex");
      return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(originalHash));
    }
  }

  // Fallback for legacy plaintext password
  return inputPassword === storedPassword;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // Optional admin check for banned IPs list
    if (action === "banned_list" && verifyAdminAuth(req)) {
      return NextResponse.json({ success: true, bannedIps: readBannedIPs() });
    }

    const creds = await DB.getAdminCredentials();
    const storedPass = creds?.password || "admin123";
    const isCustom = storedPass.startsWith("pbkdf2$") || storedPass !== "admin123";

    return NextResponse.json({
      success: true,
      username: creds?.username || "admin@seoservice.local",
      hasCustomPassword: isCustom
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const ip = getClientIp(req);

  try {
    const body = await req.json();
    const { action } = body;
    const creds = await DB.getAdminCredentials();
    const storedPassword = creds?.password || "admin123";
    const activeUsername = (creds?.username || "admin@seoservice.local").trim().toLowerCase();

    // 1. LOGOUT ACTION
    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Logged out successfully" });
      response.cookies.set({
        name: "admin_session",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0
      });
      return response;
    }

    // 2. UNBAN IP ACTION (Admin only)
    if (action === "unban_ip") {
      if (!verifyAdminAuth(req)) {
        return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
      }
      const { targetIp } = body;
      if (!targetIp) {
        return NextResponse.json({ success: false, error: "Target IP is required" }, { status: 400 });
      }
      unbanIpAddress(targetIp);
      await DB.addAuditLog({
        action: "ip_unbanned",
        description: `IP ${targetIp} was unbanned by administrator`
      });
      return NextResponse.json({ success: true, message: `IP ${targetIp} has been unbanned successfully.` });
    }

    // 3. LOGIN ACTION (1 wrong attempt = 30 days ban)
    if (action === "login") {
      // Check if this IP is already banned
      const banCheck = checkIpBan(ip);
      if (banCheck.isBanned) {
        return NextResponse.json({ success: false, error: banCheck.error }, { status: 403 });
      }

      const usernameInput = (body.username || "").trim().toLowerCase();
      const passwordInput = (body.password || "").trim();

      const isUserMatch = usernameInput === activeUsername;
      const isPassMatch = verifyPassword(passwordInput, storedPassword);

      // Successful login
      if (isUserMatch && isPassMatch) {
        // Auto-upgrade legacy plaintext password to secure PBKDF2 hash
        if (!storedPassword.startsWith("pbkdf2$")) {
          try {
            await DB.updateAdminCredentials({
              username: activeUsername,
              password: hashPassword(passwordInput),
              updatedAt: new Date().toISOString()
            });
          } catch (upgradeErr) {
            console.warn("Notice: Password auto-upgrade warning:", upgradeErr.message);
          }
        }

        const sessionToken = createSessionToken(activeUsername);

        const response = NextResponse.json({
          success: true,
          token: sessionToken,
          user: {
            name: "Abdullah Saleh",
            email: activeUsername,
            role: "Master Administrator",
            loginTime: new Date().toISOString()
          }
        });

        // Set HTTP-Only, SameSite=Lax Secure session cookie
        response.cookies.set({
          name: "admin_session",
          value: sessionToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;
      }

      // STRICT POLICY: 1 single wrong attempt immediately triggers a 30-day ban!
      banIpAddress(ip, usernameInput);

      await DB.addAuditLog({
        action: "ip_banned_30_days",
        description: `IP ${ip} was banned for 30 days after 1 failed login attempt (Username entered: "${usernameInput}")`
      });

      return NextResponse.json(
        {
          success: false,
          error: "নিরাপত্তা সতর্কতা: ভুল ক্রেডেনশিয়াল দেওয়ার কারণে আপনার আইপি (IP) পরবর্তী ৩০ দিনের জন্য ব্যান করা হয়েছে।"
        },
        { status: 403 }
      );
    }

    // 4. UPDATE CREDENTIALS ACTION
    if (action === "update_credentials") {
      const { currentPassword, newUsername, newPassword } = body;

      const cleanCurrentPass = (currentPassword || "").trim();
      const cleanNewUser = (newUsername || "").trim().toLowerCase();
      const cleanNewPass = (newPassword || "").trim();

      // Verify current password with secure verification
      if (!verifyPassword(cleanCurrentPass, storedPassword)) {
        return NextResponse.json(
          { success: false, error: "Current password does not match." },
          { status: 400 }
        );
      }

      if (!cleanNewUser || cleanNewUser.length < 3) {
        return NextResponse.json(
          { success: false, error: "Username or email must be at least 3 characters long." },
          { status: 400 }
        );
      }

      let updatedPassword = storedPassword;
      if (cleanNewPass) {
        if (cleanNewPass.length < 5) {
          return NextResponse.json(
            { success: false, error: "New password must be at least 5 characters long." },
            { status: 400 }
          );
        }
        // Always hash newly set passwords with salt
        updatedPassword = hashPassword(cleanNewPass);
      }

      const updatedCreds = {
        username: cleanNewUser,
        password: updatedPassword,
        updatedAt: new Date().toISOString()
      };

      await DB.updateAdminCredentials(updatedCreds);

      await DB.addAuditLog({
        action: "admin_credentials_updated",
        description: `Admin username/password updated for ID: ${cleanNewUser}`
      });

      return NextResponse.json({
        success: true,
        message: "Admin credentials updated and securely hashed! You can now log in with these credentials.",
        username: cleanNewUser
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
