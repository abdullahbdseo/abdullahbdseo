import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";

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
    caseStudies: [],
    testimonials: [],
    blogPosts: [],
    faqs: [],
    processSteps: [],
    pricingPlans: [],
    pricingRetainers: [],
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
    ["pricingRetainers", data.pricingRetainers || data.pricingPlans],
    ["caseStudies", data.caseStudies],
    ["testimonials", data.testimonials],
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

// GET: Return CMS data from Firestore (if configured) or local file
export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let localData = readCMSData();

    // Check Cloud Firestore if configured
    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, "cms_content"));
        if (!querySnapshot.empty) {
          const cloudData = { ...localData };
          querySnapshot.forEach((docSnap) => {
            const docData = docSnap.data();
            if (docData && docData.value !== undefined) {
              cloudData[docSnap.id] = docData.value;
            }
          });
          return NextResponse.json({ success: true, data: cloudData, source: "firestore" });
        }
      } catch (fbErr) {
        console.warn("Firestore fetch error, falling back to local:", fbErr.message);
      }
    }

    return NextResponse.json({ success: true, data: localData, source: "local" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Update a section in CMS data (Cloud Firestore + local files)
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

    // 1. Write to Firebase Cloud Firestore if configured
    let savedToCloud = false;
    if (isFirebaseConfigured() && db) {
      try {
        if (section && value !== undefined) {
          const docRef = doc(db, "cms_content", section);
          await setDoc(docRef, { value, updatedAt: new Date().toISOString() });
          savedToCloud = true;
        } else if (body.data) {
          for (const key of Object.keys(body.data)) {
            const docRef = doc(db, "cms_content", key);
            await setDoc(docRef, { value: body.data[key], updatedAt: new Date().toISOString() });
          }
          savedToCloud = true;
        }
      } catch (fbErr) {
        console.warn("Firestore save error:", fbErr.message);
      }
    }

    // 2. Write JSON file (local disk)
    try {
      writeCMSData(currentData);
    } catch (fsErr) {
      console.warn("Could not update cms-data.json on disk (e.g. read-only serverless):", fsErr.message);
    }

    // 3. Rebuild data.js (best effort)
    try {
      const newDataJs = rebuildDataJs(currentData);
      fs.writeFileSync(DATA_JS_FILE, newDataJs, "utf-8");
    } catch (writeErr) {
      console.warn("Could not update data.js:", writeErr.message);
    }

    return NextResponse.json({
      success: true,
      message: `${section || "Data"} updated and saved successfully!${savedToCloud ? " (Synced to Firestore)" : ""}`,
      cloudSynced: savedToCloud,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
