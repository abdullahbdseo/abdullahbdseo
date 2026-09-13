// lib/indexnow.js - Instant IndexNow Ping for Bing, Yandex, Seznam & Google Webhook

export const INDEXNOW_KEY = "abdullahseobd2026indexnowkey";
export const SITE_HOST = "abdullahbdseo.vercel.app";

export async function submitToIndexNow(urls = []) {
  if (!urls || urls.length === 0) return { success: false, message: "No URLs provided" };

  const formattedUrls = urls.map(u => u.startsWith("http") ? u : `https://${SITE_HOST}${u.startsWith("/") ? "" : "/"}${u}`);

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: formattedUrls
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return {
        success: true,
        status: response.status,
        submittedCount: formattedUrls.length,
        message: `Successfully submitted ${formattedUrls.length} URL(s) to IndexNow search engine crawler network.`
      };
    } else {
      return {
        success: false,
        status: response.status,
        message: `IndexNow responded with status code ${response.status}`
      };
    }
  } catch (error) {
    console.error("IndexNow submission error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}
