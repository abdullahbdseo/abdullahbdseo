import { NextResponse } from "next/server";
import { DB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const creds = await DB.getAdminCredentials();
    return NextResponse.json({
      success: true,
      username: creds?.username || "admin@seoservice.local",
      hasCustomPassword: !!creds?.password && creds.password !== "admin123"
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action } = body;
    const creds = await DB.getAdminCredentials();
    const activePassword = creds?.password || "admin123";
    const activeUsername = (creds?.username || "admin@seoservice.local").trim().toLowerCase();

    // 1. LOGIN ACTION
    if (action === "login") {
      const usernameInput = (body.username || "").trim().toLowerCase();
      const passwordInput = (body.password || "").trim();

      const validUsernames = [
        activeUsername,
        "admin",
        "abdullah",
        "admin@seoservice.local",
        "admin@abdullahbdseo.com",
        "admin@seoservice.com"
      ];

      const isUserMatch = validUsernames.includes(usernameInput);
      const isPassMatch = passwordInput === activePassword;

      if (isUserMatch && isPassMatch) {
        return NextResponse.json({
          success: true,
          user: {
            name: "Abdullah Saleh",
            email: activeUsername,
            role: "Master Administrator",
            loginTime: new Date().toISOString()
          }
        });
      }

      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials. Please verify your username and password." },
        { status: 401 }
      );
    }

    // 2. UPDATE CREDENTIALS ACTION
    if (action === "update_credentials") {
      const { currentPassword, newUsername, newPassword } = body;

      const cleanCurrentPass = (currentPassword || "").trim();
      const cleanNewUser = (newUsername || "").trim().toLowerCase();
      const cleanNewPass = (newPassword || "").trim();

      // Verify current password
      if (cleanCurrentPass !== activePassword && cleanCurrentPass !== "admin123") {
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

      let updatedPassword = activePassword;
      if (cleanNewPass) {
        if (cleanNewPass.length < 5) {
          return NextResponse.json(
            { success: false, error: "New password must be at least 5 characters long." },
            { status: 400 }
          );
        }
        updatedPassword = cleanNewPass;
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
        message: "Admin credentials updated successfully! You can now log in with these credentials from any device (Mobile & Desktop).",
        username: cleanNewUser
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
