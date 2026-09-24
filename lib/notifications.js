// lib/notifications.js - Instant Telegram & WhatsApp Notification Dispatcher
import { siteSettings } from "@/lib/data";

/**
 * Send an instant notification to Telegram Bot
 * @param {Object} payload - { title, details, leadType, contactName, contactEmail, contactPhone, websiteUrl, amount }
 */
export async function sendTelegramNotification(payload) {
  try {
    const botToken =
      payload.botToken ||
      process.env.TELEGRAM_BOT_TOKEN ||
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
      siteSettings?.telegram_bot_token;
    const chatId =
      payload.chatId ||
      process.env.TELEGRAM_CHAT_ID ||
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
      siteSettings?.telegram_chat_id;

    const {
      title = "🚀 New Website Activity Alert",
      leadType = "Inbound Lead",
      contactName = "Anonymous Visitor",
      contactEmail = "N/A",
      contactPhone = "N/A",
      websiteUrl = "N/A",
      amount = null,
      serviceName = null,
      details = ""
    } = payload;

    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

    // Format Markdown / HTML message for Telegram
    let message = `🔥 <b>${escapeHtml(title)}</b>\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📂 <b>Type:</b> ${escapeHtml(leadType)}\n`;
    message += `👤 <b>Name:</b> ${escapeHtml(contactName)}\n`;
    if (contactEmail && contactEmail !== "N/A") message += `✉️ <b>Email:</b> ${escapeHtml(contactEmail)}\n`;
    if (contactPhone && contactPhone !== "N/A") message += `📱 <b>Phone/WA:</b> ${escapeHtml(contactPhone)}\n`;
    if (websiteUrl && websiteUrl !== "N/A") message += `🌐 <b>Website:</b> ${escapeHtml(websiteUrl)}\n`;
    if (serviceName) message += `💼 <b>Service:</b> ${escapeHtml(serviceName)}\n`;
    if (amount) message += `💰 <b>Amount:</b> $${amount}\n`;
    if (details) message += `📝 <b>Details:</b>\n${escapeHtml(details.slice(0, 500))}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🕒 <i>Time (BDT): ${now}</i>\n`;

    // Direct WhatsApp Deep link for admin to reply with 1 click
    if (contactPhone && contactPhone !== "N/A") {
      const cleanPhone = contactPhone.replace(/[^0-9]/g, "");
      if (cleanPhone.length >= 8) {
        const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${contactName}, thank you for reaching out to Abdullah Saleh SEO Services!`)}`;
        message += `👉 <a href="${waLink}"><b>Reply on WhatsApp Directly</b></a>`;
      }
    }

    if (!botToken || !chatId) {
      console.log("[Notification Dispatcher] (Simulation - Telegram Bot Token/ChatID not set in env):", message);
      return { success: true, simulated: true };
    }

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });

    const json = await res.json();
    return { success: json.ok, data: json };
  } catch (err) {
    console.error("Telegram notification error:", err.message);
    return { success: false, error: err.message };
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
