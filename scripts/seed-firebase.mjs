// scripts/seed-firebase.mjs
// One-click script to migrate all CMS data from lib/cms-data.json directly into Firebase Cloud Firestore

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cmsJsonPath = path.join(__dirname, "..", "lib", "cms-data.json");

// Read Firebase config from environment or .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function seedToFirestore() {
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    console.error("❌ Error: Firebase environment variables are missing!");
    console.log("Please make sure NEXT_PUBLIC_FIREBASE_PROJECT_ID and NEXT_PUBLIC_FIREBASE_API_KEY are set.");
    process.exit(1);
  }

  if (!fs.existsSync(cmsJsonPath)) {
    console.error("❌ cms-data.json not found!");
    process.exit(1);
  }

  const raw = fs.readFileSync(cmsJsonPath, "utf-8");
  const data = JSON.parse(raw);

  console.log(`🚀 Connecting to Firebase Project: ${firebaseConfig.projectId}...`);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const sections = Object.keys(data);
  console.log(`📦 Found ${sections.length} sections to seed: ${sections.join(", ")}`);

  for (const section of sections) {
    try {
      const sectionData = data[section];
      const docRef = doc(db, "cms_content", section);
      await setDoc(docRef, { value: sectionData, updatedAt: new Date().toISOString() });
      console.log(`✅ Uploaded section [${section}] to Firestore successfully.`);
    } catch (err) {
      console.error(`❌ Failed to upload section [${section}]:`, err.message);
    }
  }

  console.log("\n🎉 All CMS data migrated to Cloud Firestore successfully!");
  process.exit(0);
}

seedToFirestore();
