import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "lib", "data.js");
const CMS_TOKEN = process.env.CMS_SECRET_TOKEN || "cms_admin_secret_2026";

function checkAuth(request) {
  const token = request.headers.get("x-cms-token");
  return token === CMS_TOKEN;
}

// Helper: parse data.js exports into a JSON object
function parseDataFile(content) {
  // Extract each named export as JSON
  const result = {};

  const exportNames = [
    "siteSettings",
    "serviceCategories",
    "services",
    "blogPosts",
    "faqs",
    "processSteps",
    "pricingPlans",
    "freeTools",
  ];

  for (const name of exportNames) {
    // Match: export const NAME = VALUE;
    const regex = new RegExp(
      `export const ${name}\\s*=\\s*([\\s\\S]*?)(?=\\nexport const |\\n\\n\\n|$)`,
      "m"
    );
    const match = content.match(regex);
    if (match) {
      try {
        // Use Function constructor to evaluate the JS literal safely
        const evalFn = new Function(`return (${match[1].trim().replace(/;$/, "")})`);
        result[name] = evalFn();
      } catch (e) {
        result[name] = null;
      }
    }
  }

  return result;
}

// Helper: serialize a JS value back to formatted JS source
function serializeValue(val, indent = 0) {
  const pad = "  ".repeat(indent);
  const pad1 = "  ".repeat(indent + 1);

  if (val === null || val === undefined) return "null";
  if (typeof val === "boolean") return String(val);
  if (typeof val === "number") return String(val);
  if (typeof val === "string") {
    // Use backtick template literals for strings with HTML/newlines
    if (val.includes("\n") || val.includes("<") || val.includes("`")) {
      const escaped = val.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
      return `\`${escaped}\``;
    }
    return JSON.stringify(val);
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map((item) => `${pad1}${serializeValue(item, indent + 1)}`).join(",\n");
    return `[\n${items}\n${pad}]`;
  }
  if (typeof val === "object") {
    const entries = Object.entries(val)
      .map(([k, v]) => `${pad1}${k}: ${serializeValue(v, indent + 1)}`)
      .join(",\n");
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(val);
}

// Helper: rebuild data.js from JSON object
function buildDataFile(data) {
  const exports = [
    "siteSettings",
    "serviceCategories",
    "services",
    "blogPosts",
    "faqs",
    "processSteps",
    "pricingPlans",
    "freeTools",
  ];

  let content = `// lib/data.js - Central Data Store for Next.js (Services, Portfolio, Blogs, FAQs, Testimonials, Settings)\n`;
  content += `// Last updated by CMS Admin: ${new Date().toISOString()}\n\n`;

  for (const name of exports) {
    if (data[name] !== undefined && data[name] !== null) {
      content += `export const ${name} = ${serializeValue(data[name], 0)};\n\n`;
    }
  }

  return content;
}

// GET: Return current data.js parsed as JSON
export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const data = parseDataFile(content);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Update data.js with new content
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { section, value } = body;

    // Read current file
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const currentData = parseDataFile(content);

    // Merge update
    if (section && value !== undefined) {
      currentData[section] = value;
    } else if (body.data) {
      Object.assign(currentData, body.data);
    }

    // Write back
    const newContent = buildDataFile(currentData);
    fs.writeFileSync(DATA_FILE, newContent, "utf-8");

    return NextResponse.json({ success: true, message: `${section || "data"} updated successfully` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
