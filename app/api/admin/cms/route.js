import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CMS_JSON_FILE = path.join(process.cwd(), "lib", "cms-data.json");
const DATA_JS_FILE = path.join(process.cwd(), "lib", "data.js");
const CMS_TOKEN = process.env.CMS_SECRET_TOKEN || "cms_admin_secret_2026";

function checkAuth(request) {
  const token = request.headers.get("x-cms-token");
  return token === CMS_TOKEN;
}

function readCMSData() {
  if (fs.existsSync(CMS_JSON_FILE)) {
    const raw = fs.readFileSync(CMS_JSON_FILE, "utf-8");
    return JSON.parse(raw);
  }
  // Fallback: return empty structure
  return {
    siteSettings: {},
    serviceCategories: [],
    services: [],
    blogPosts: [],
    faqs: [],
    processSteps: [],
    pricingPlans: [],
    freeTools: [],
  };
}

function writeCMSData(data) {
  fs.writeFileSync(CMS_JSON_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Rebuild lib/data.js from the JSON data
function rebuildDataJs(data) {
  const lines = [];
  lines.push(`// lib/data.js - Central Data Store`);
  lines.push(`// Last updated by CMS Admin: ${new Date().toISOString()}`);
  lines.push(``);

  const sections = [
    ["siteSettings", data.siteSettings],
    ["serviceCategories", data.serviceCategories],
    ["services", data.services],
    ["blogPosts", data.blogPosts],
    ["faqs", data.faqs],
    ["processSteps", data.processSteps],
    ["pricingPlans", data.pricingPlans],
    ["freeTools", data.freeTools],
  ];

  for (const [name, value] of sections) {
    if (value !== undefined && value !== null) {
      lines.push(`export const ${name} = ${serializeJS(value, 0)};`);
      lines.push(``);
    }
  }

  return lines.join("\n");
}

function serializeJS(val, depth) {
  const indent = "  ".repeat(depth);
  const childIndent = "  ".repeat(depth + 1);

  if (val === null || val === undefined) return "null";
  if (typeof val === "boolean") return String(val);
  if (typeof val === "number") return String(val);

  if (typeof val === "string") {
    // Use template literal for strings with newlines or HTML tags
    if (val.includes("\n") || val.includes("<") || val.includes(">") || val.includes('"')) {
      const escaped = val.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
      return `\`${escaped}\``;
    }
    return JSON.stringify(val);
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map(item => `${childIndent}${serializeJS(item, depth + 1)}`).join(",\n");
    return `[\n${items}\n${indent}]`;
  }

  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) return "{}";
    const entries = keys.map(k => `${childIndent}${k}: ${serializeJS(val[k], depth + 1)}`).join(",\n");
    return `{\n${entries}\n${indent}}`;
  }

  return JSON.stringify(val);
}

// GET: Return CMS data as JSON
export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = readCMSData();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Update a section in CMS data and write back to both JSON + data.js
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { section, value } = body;

    const currentData = readCMSData();

    if (section && value !== undefined) {
      currentData[section] = value;
    } else if (body.data) {
      Object.assign(currentData, body.data);
    }

    // Write JSON file (primary store)
    writeCMSData(currentData);

    // Also try to rebuild data.js (best effort)
    try {
      const newDataJs = rebuildDataJs(currentData);
      fs.writeFileSync(DATA_JS_FILE, newDataJs, "utf-8");
    } catch (writeErr) {
      console.warn("Could not update data.js:", writeErr.message);
    }

    return NextResponse.json({
      success: true,
      message: `${section || "Data"} updated and saved successfully!`,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
