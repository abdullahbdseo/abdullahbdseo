// lib/toolTracker.js - Client-Side Non-blocking Tool Usage & Audit Logger

export async function logToolUsage(toolName, targetUrl = "", inputSummary = "", score = null, meta = {}) {
  try {
    if (typeof window === "undefined") return;

    fetch("/api/tools/track-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool_name: toolName,
        target_url: targetUrl,
        input_summary: inputSummary,
        score: score,
        meta: meta,
        client_timestamp: new Date().toISOString()
      }),
      keepalive: true
    }).catch(() => {});
  } catch (e) {
    // Non-blocking catch
  }
}
