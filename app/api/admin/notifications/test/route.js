import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/notifications";

export async function POST(req) {
  try {
    const body = await req.json();
    const { botToken, chatId } = body;

    const result = await sendTelegramNotification({
      title: "🧪 Test Notification from Admin Panel",
      leadType: "System Diagnostic",
      contactName: "Admin User",
      contactEmail: "admin@abdullahbdseo.com",
      contactPhone: "+8801700000000",
      websiteUrl: "https://abdullahbdseo.vercel.app",
      details: "Telegram instant alert webhook integration is functioning perfectly!",
      botToken,
      chatId,
    });

    if (result.simulated) {
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Simulation mode: Token/ChatID not configured yet in .env.local or settings. When you enter valid credentials, live messages will be sent to your Telegram channel/bot!",
      });
    }

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || "Failed to send message to Telegram API. Please check your Bot Token and Chat ID.",
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "✅ Test notification sent successfully to Telegram!",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
