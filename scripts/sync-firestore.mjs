import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAch7gz1ScVM22HW13TnCBg66soOAoLVtk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "abdullah-seo-cms.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "abdullah-seo-cms",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "abdullah-seo-cms.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "20622347219",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:20622347219:web:a9d97636f447eeb23f3d26",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sync() {
  const cmsPath = path.join(process.cwd(), "lib", "cms-data.json");
  const raw = fs.readFileSync(cmsPath, "utf-8");
  const cmsData = JSON.parse(raw);

  console.log("Syncing caseStudies to Firebase Firestore...");
  const docRef = doc(db, "cms_content", "caseStudies");
  await setDoc(docRef, {
    value: cmsData.caseStudies,
    updatedAt: new Date().toISOString()
  });
  console.log(`Synced ${cmsData.caseStudies.length} case studies successfully!`);
  process.exit(0);
}

sync().catch(err => {
  console.error("Firestore sync error:", err);
  process.exit(1);
});
