// lib/mailer.js - Automated Email Notification for Client Orders & Inquiries
import { siteSettings } from "./data";

export async function sendOrderNotificationEmail(order) {
  const recipient = siteSettings.contact_email || "abdullahbdseo@gmail.com";
  const subject = `[New SEO Order] ${order.service_title} - ${order.package_name} from ${order.client_name}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #4361ee 0%, #3a56d4 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
        .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 24px; }
        .badge { display: inline-block; background: #e0e7ff; color: #3730a3; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 16px; }
        .section-title { font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin: 20px 0 12px; }
        .info-grid { width: 100%; border-collapse: collapse; }
        .info-grid td { padding: 8px 0; font-size: 14px; vertical-align: top; }
        .info-grid td.label { width: 38%; color: #64748b; font-weight: 600; }
        .info-grid td.val { width: 62%; color: #0f172a; font-weight: 500; }
        .highlight-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; line-height: 1.5; color: #334155; }
        .price-tag { font-size: 20px; font-weight: 800; color: #16a34a; }
        .footer { background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Service Order Inquiry</h1>
          <p>A client has submitted an order inquiry on your website.</p>
        </div>
        <div class="content">
          <div class="badge">Order ID: ${order.order_number || `ORD-${order.id}`}</div>

          <div class="section-title">Client Information</div>
          <table class="info-grid">
            <tr>
              <td class="label">Client Name:</td>
              <td class="val"><strong>${order.client_name || "N/A"}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address:</td>
              <td class="val"><a href="mailto:${order.client_email}">${order.client_email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone / WhatsApp:</td>
              <td class="val"><strong>${order.client_phone || "Not provided"}</strong></td>
            </tr>
            <tr>
              <td class="label">Website URL:</td>
              <td class="val"><a href="${order.website_url}" target="_blank">${order.website_url}</a></td>
            </tr>
          </table>

          <div class="section-title">Package &amp; Service Details</div>
          <table class="info-grid">
            <tr>
              <td class="label">Selected Service:</td>
              <td class="val"><strong>${order.service_title}</strong></td>
            </tr>
            <tr>
              <td class="label">Selected Package:</td>
              <td class="val"><strong>${order.package_name}</strong></td>
            </tr>
            <tr>
              <td class="label">Package Price:</td>
              <td class="val"><span class="price-tag">$${order.total} USD</span></td>
            </tr>
            ${order.target_keywords ? `
            <tr>
              <td class="label">Target Keywords:</td>
              <td class="val">${order.target_keywords}</td>
            </tr>` : ''}
          </table>

          ${order.client_notes ? `
          <div class="section-title">Client Project Notes</div>
          <div class="highlight-box">
            ${order.client_notes.replace(/\n/g, '<br/>')}
          </div>` : ''}
        </div>
        <div class="footer">
          Received on ${new Date().toLocaleString()} &bull; Automated notification from ${siteSettings.site_name}
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Attempt nodemailer if configured with SMTP
    const nodemailer = await import("nodemailer").catch(() => null);
    if (nodemailer && process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${siteSettings.site_name}" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: order.client_email,
        subject: subject,
        html: htmlContent,
      });

      console.log(`[Mailer] Order email sent to ${recipient}`);
      return { success: true, method: "smtp" };
    }
  } catch (err) {
    console.warn("[Mailer] SMTP delivery failed:", err.message);
  }

  // Fallback log for dev/local environments
  console.log(`[Mailer-Log] New Order received from ${order.client_name} (${order.client_email}) for ${order.service_title} - ${order.package_name} ($${order.total})`);
  return { success: true, method: "logged" };
}
